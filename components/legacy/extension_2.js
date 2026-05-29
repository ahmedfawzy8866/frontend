"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const browser_1 = require("vscode-languageclient/browser");
const languageClientMiddlewareBase_1 = require("../activation/languageClientMiddlewareBase");
const types_1 = require("../activation/types");
const constants_1 = require("../common/constants");
const constants_2 = require("../telemetry/constants");
const intellisenseStatus_1 = require("./intellisenseStatus");
const api_1 = require("./api");
let languageClient;
let pylanceApi;
function activate(context) {
    const reporter = getTelemetryReporter();
    const activationPromise = Promise.resolve((0, api_1.buildApi)(reporter));
    const pylanceExtension = vscode.extensions.getExtension(constants_1.PYLANCE_EXTENSION_ID);
    if (pylanceExtension) {
        activationPromise.then(() => runPylance(context, pylanceExtension));
        return activationPromise;
    }
    const changeDisposable = vscode.extensions.onDidChange(async () => {
        const newPylanceExtension = vscode.extensions.getExtension(constants_1.PYLANCE_EXTENSION_ID);
        if (newPylanceExtension) {
            changeDisposable.dispose();
            await runPylance(context, newPylanceExtension);
        }
    });
    return activationPromise;
}
exports.activate = activate;
async function deactivate() {
    if (pylanceApi) {
        const api = pylanceApi;
        pylanceApi = undefined;
        await api.client.stop();
    }
    if (languageClient) {
        const client = languageClient;
        languageClient = undefined;
        await client.stop();
        await client.dispose();
    }
}
exports.deactivate = deactivate;
async function runPylance(context, pylanceExtension) {
    context.subscriptions.push((0, intellisenseStatus_1.createStatusItem)());
    pylanceExtension = await getActivatedExtension(pylanceExtension);
    const api = pylanceExtension.exports;
    if (api.client && api.client.isEnabled()) {
        pylanceApi = api;
        await api.client.start();
        return;
    }
    const { extensionUri, packageJSON } = pylanceExtension;
    const distUrl = vscode.Uri.joinPath(extensionUri, 'dist');
    try {
        const worker = new Worker(vscode.Uri.joinPath(distUrl, 'browser.server.bundle.js').toString());
        const config = { distUrl: distUrl.toString() };
        worker.postMessage(config);
        const middleware = new languageClientMiddlewareBase_1.LanguageClientMiddlewareBase(undefined, types_1.LanguageServerType.Node, sendTelemetryEventBrowser, packageJSON.version);
        middleware.connect();
        const clientOptions = {
            documentSelector: [
                {
                    language: 'python',
                },
            ],
            synchronize: {
                configurationSection: ['python', 'jupyter.runStartupCommands'],
            },
            middleware,
        };
        const client = new browser_1.LanguageClient('python', 'Python Language Server', clientOptions, worker);
        languageClient = client;
        context.subscriptions.push(vscode.commands.registerCommand('python.viewLanguageServerOutput', () => client.outputChannel.show()));
        client.onTelemetry((telemetryEvent) => {
            var _a;
            const eventName = telemetryEvent.EventName || constants_2.EventName.LANGUAGE_SERVER_TELEMETRY;
            const formattedProperties = {
                ...telemetryEvent.Properties,
                method: (_a = telemetryEvent.Properties.method) === null || _a === void 0 ? void 0 : _a.replace(/\//g, '.'),
            };
            sendTelemetryEventBrowser(eventName, telemetryEvent.Measurements, formattedProperties, telemetryEvent.Exception);
        });
        await client.start();
    }
    catch (e) {
        console.log(e);
    }
}
let telemetryReporter;
function getTelemetryReporter() {
    if (telemetryReporter) {
        return telemetryReporter;
    }
    const Reporter = require('@vscode/extension-telemetry').default;
    telemetryReporter = new Reporter(constants_1.AppinsightsKey, [
        {
            lookup: /(errorName|errorMessage|errorStack)/g,
        },
    ]);
    return telemetryReporter;
}
function sendTelemetryEventBrowser(eventName, measuresOrDurationMs, properties, ex) {
    var _a;
    const reporter = getTelemetryReporter();
    const measures = typeof measuresOrDurationMs === 'number'
        ? { duration: measuresOrDurationMs }
        : measuresOrDurationMs || undefined;
    const customProperties = {};
    const eventNameSent = eventName;
    if (properties) {
        const data = properties;
        Object.getOwnPropertyNames(data).forEach((prop) => {
            if (data[prop] === undefined || data[prop] === null) {
                return;
            }
            try {
                switch (typeof data[prop]) {
                    case 'string':
                        customProperties[prop] = data[prop];
                        break;
                    case 'object':
                        customProperties[prop] = 'object';
                        break;
                    default:
                        customProperties[prop] = data[prop].toString();
                        break;
                }
            }
            catch (exception) {
                console.error(`Failed to serialize ${prop} for ${eventName}`, exception);
            }
        });
    }
    if (ex) {
        const errorProps = {
            errorName: ex.name,
            errorStack: (_a = ex.stack) !== null && _a !== void 0 ? _a : '',
        };
        Object.assign(customProperties, errorProps);
        reporter.sendTelemetryErrorEvent(eventNameSent, customProperties, measures);
    }
    else {
        reporter.sendTelemetryEvent(eventNameSent, customProperties, measures);
    }
}
async function getActivatedExtension(extension) {
    if (!extension.isActive) {
        await extension.activate();
    }
    return extension;
}
//# sourceMappingURL=extension.js.map