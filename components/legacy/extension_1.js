'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.compareSourceTestFilesAndReplace = exports.getContext = exports.readEnvVariablesFromFile = exports.doActivateExtension = exports.activate = exports.extensionContext = void 0;
if (Reflect.metadata === undefined) {
    require('reflect-metadata');
}
const sourceMapSupport_1 = require("./sourceMapSupport");
(0, sourceMapSupport_1.initialize)(require('vscode'));
const durations = {};
const stopWatch_1 = require("./common/utils/stopWatch");
const stopWatch = new stopWatch_1.StopWatch();
const logging_1 = require("./logging");
const logDispose = [];
(0, logging_1.initializeFileLogging)(logDispose);
const vscode_1 = require("vscode");
const api_1 = require("./api");
const types_1 = require("./common/application/types");
const types_2 = require("./common/types");
const async_1 = require("./common/utils/async");
const localize_1 = require("./common/utils/localize");
const extensionActivation_1 = require("./extensionActivation");
const extensionInit_1 = require("./extensionInit");
const startupTelemetry_1 = require("./startupTelemetry");
const runAfterActivation_1 = require("./common/utils/runAfterActivation");
const contracts_1 = require("./interpreter/contracts");
const workspace_1 = require("./common/application/workspace");
const resourceLifecycle_1 = require("./common/utils/resourceLifecycle");
const proposedApi_1 = require("./proposedApi");
const vscode = require("vscode");
const app_constants_1 = require("./revpro/constant/app-constants");
const intern_constants_1 = require("./revpro/constant/intern-constants");
const rest_constants_1 = require("./revpro/constant/rest-constants");
const auto_reader_mode_1 = require("./revpro/feature-register/auto-reader-mode");
const file_system_1 = require("./revpro/feature-register/file-system");
const http_service_1 = require("./revpro/service/http-service");
const metrics_details_1 = require("./revpro/service/metrics-details");
const vscode_events_1 = require("./revpro/service/vscode-events");
const app_util_1 = require("./revpro/util/app-util");
const local_storage_1 = require("./revpro/util/local-storage");
durations.codeLoadingTime = stopWatch.elapsedTime;
let activatedServiceContainer;
const axios = require('axios');
const fs = require('fs');
let vscodeExtensionContext;
let metricsDetails = new metrics_details_1.MetricsDetails();
let vscodeEvents = new vscode_events_1.VscodeEvents();
async function activate(context) {
    exports.extensionContext = context;
    vscodeExtensionContext = context;
    await readEnvVariablesFromFile();
    let workspaceStorageManager = new local_storage_1.LocalStorageService(vscodeExtensionContext.workspaceState);
    if (workspaceStorageManager.getValue(app_constants_1.AppConstants.IS_GITPOD)) {
        doBackUpSourceTestFiles();
        doDisableTestCaseManipulation();
    }
    await axios
        .get(rest_constants_1.RestConstants.DECRYPT_CLOUDLAB_TOKEN, {
        params: { token: rest_constants_1.RestConstants.getAccessToken() },
    })
        .then(initiateWorkspaceTrackingResponse, (error) => {
        app_util_1.AppUtil.logError(exports.extensionContext, error, app_constants_1.AppConstants.ERROR_IN_FETCHING_ACCESS_KEY);
    });
}
exports.activate = activate;
async function doActivateExtension() {
    let api;
    let ready;
    let serviceContainer;
    try {
        const workspaceService = new workspace_1.WorkspaceService();
        exports.extensionContext.subscriptions.push(workspaceService.onDidGrantWorkspaceTrust(async () => {
            await deactivate();
            await activate(exports.extensionContext);
        }));
        [api, ready, serviceContainer] = await activateUnsafe(exports.extensionContext, stopWatch, durations);
    }
    catch (ex) {
        await handleError(ex, durations);
        throw ex;
    }
    (0, startupTelemetry_1.sendStartupTelemetry)(ready, durations, stopWatch, serviceContainer)
        .ignoreErrors();
    return api;
}
exports.doActivateExtension = doActivateExtension;
async function readEnvVariablesFromFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let projectPath = '';
    let workspaceStorageManager = new local_storage_1.LocalStorageService(vscodeExtensionContext.workspaceState);
    if (workspaceFolders !== undefined && (workspaceFolders === null || workspaceFolders === void 0 ? void 0 : workspaceFolders.length) > 0) {
        projectPath = workspaceFolders[0].uri.fsPath;
        projectPath = projectPath.replace(/\\/g, '/');
        workspaceStorageManager.setValue("projectPath", projectPath);
    }
    let filepath = projectPath + app_constants_1.AppConstants.ENV_FILE;
    workspaceStorageManager.setValue(app_constants_1.AppConstants.IS_GITPOD, true);
    if (fs.existsSync(filepath)) {
        workspaceStorageManager.setValue(app_constants_1.AppConstants.IS_GITPOD, false);
        let envFileContent = fs.readFileSync(filepath, { encoding: "utf8", flag: "r" });
        const jsonData = JSON.parse(envFileContent);
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const value = jsonData[key];
                workspaceStorageManager.setValue(key, value);
            }
        }
    }
}
exports.readEnvVariablesFromFile = readEnvVariablesFromFile;
function getContext() {
    return vscodeExtensionContext;
}
exports.getContext = getContext;
function doBackUpSourceTestFiles() {
    if (fs.existsSync(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE) && !fs.existsSync(app_constants_1.AppConstants.WORKSPACE_BACKUP)) {
        fs.mkdirSync(app_constants_1.AppConstants.WORKSPACE_BACKUP);
        fs.readdir(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE, (_err, testFiles) => {
            if (testFiles === null || testFiles === void 0 ? void 0 : testFiles.length) {
                testFiles.forEach((file) => {
                    if (file.endsWith(".py") && fs.existsSync(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE + "/" + file)) {
                        let testFile = fs.readFileSync(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE + "/" + file, { encoding: "utf8", flag: "r" });
                        fs.writeFile(app_constants_1.AppConstants.WORKSPACE_BACKUP + file, testFile, function (error) {
                            if (error) {
                                app_util_1.AppUtil.logError(exports.extensionContext, error, app_constants_1.AppConstants.ERROR_IN_WRITING_BACKUP_TEST_FILES);
                            }
                        });
                    }
                });
            }
        });
    }
}
function compareSourceTestFilesAndReplace(context) {
    if (fs.existsSync(app_constants_1.AppConstants.WORKSPACE_BACKUP)) {
        fs.readdir(app_constants_1.AppConstants.WORKSPACE_BACKUP, (_err, testFiles) => {
            if (testFiles === null || testFiles === void 0 ? void 0 : testFiles.length) {
                testFiles.forEach((file) => {
                    if (fs.existsSync(app_constants_1.AppConstants.WORKSPACE_BACKUP + file)) {
                        let sourceTestFile = fs.readFileSync(app_constants_1.AppConstants.WORKSPACE_BACKUP + file, { encoding: "utf8", flag: "r" });
                        if (fs.existsSync(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE + "/" + file)) {
                            let currentTestFile = fs.readFileSync(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE + "/" + file, { encoding: "utf8", flag: "r" });
                            if (currentTestFile !== sourceTestFile) {
                                replaceSourceTestFile(sourceTestFile, context, file);
                            }
                        }
                        else {
                            replaceSourceTestFile(sourceTestFile, context, file);
                        }
                    }
                });
            }
        });
    }
}
exports.compareSourceTestFilesAndReplace = compareSourceTestFilesAndReplace;
function replaceSourceTestFile(sourceTestFile, context, file) {
    fs.writeFile(intern_constants_1.InternConstants.getGitRepoRoots() + app_constants_1.AppConstants.TEST_FOLDER_PACKAGE + "/" + file, sourceTestFile, function (error) {
        if (error) {
            app_util_1.AppUtil.logError(context, error, app_constants_1.AppConstants.ERROR_IN_REPLACING_SOURCE_TEST_FILES);
        }
    });
    vscode.window.showInformationMessage(app_constants_1.AppConstants.NOTIFY_ASSOCIATE_NOT_TO_MANIPULATE_TEST_FILES);
}
function doDisableTestCaseManipulation() {
    var _a;
    const fileSystemRegister = new file_system_1.FileSystemRegister(exports.extensionContext);
    const autoReaderModeRegister = new auto_reader_mode_1.AutoReaderModeRegister(exports.extensionContext);
    if ((_a = vscode.window.tabGroups.activeTabGroup.activeTab) === null || _a === void 0 ? void 0 : _a.label.toLowerCase().includes(app_constants_1.AppConstants.PYTHON_TEST)) {
        vscode.window.tabGroups.close(vscode.window.tabGroups.activeTabGroup.activeTab);
    }
    fileSystemRegister.register();
    autoReaderModeRegister.register();
}
async function initiateWorkspaceTrackingResponse(response) {
    let httpResponse = response.data;
    let cloudLabTokenDTO = httpResponse.data;
    if (cloudLabTokenDTO) {
        http_service_1.HttpService.accessKey = cloudLabTokenDTO.cloudLabUnsecureApiAccessKey;
        intern_constants_1.InternConstants.setInternId(cloudLabTokenDTO.internId);
    }
    if (http_service_1.HttpService.accessKey) {
        await metricsDetails.fetchEnvVariablesforWorkspace(vscodeExtensionContext);
        metricsDetails.saveWorkspaceDetails(vscodeExtensionContext);
    }
    else {
        vscode.window.showInformationMessage(app_constants_1.AppConstants.CONTACT_REVATURE);
    }
}
async function deactivate() {
    if (activatedServiceContainer) {
        const disposables = activatedServiceContainer.get(types_2.IDisposableRegistry);
        await (0, resourceLifecycle_1.disposeAll)(disposables);
        while (disposables.pop())
            ;
    }
    await metricsDetails.sendSessionStartOrEndEvent(exports.extensionContext, app_constants_1.AppConstants.SESSION_END);
    vscodeEvents.clearInterval();
}
exports.deactivate = deactivate;
async function activateUnsafe(context, startupStopWatch, startupDurations) {
    context.subscriptions.push(...logDispose);
    const activationDeferred = (0, async_1.createDeferred)();
    displayProgress(activationDeferred.promise);
    startupDurations.startActivateTime = startupStopWatch.elapsedTime;
    const ext = (0, extensionInit_1.initializeGlobals)(context);
    activatedServiceContainer = ext.legacyIOC.serviceContainer;
    (0, extensionInit_1.initializeStandard)(ext);
    const experimentService = activatedServiceContainer.get(types_2.IExperimentService);
    await experimentService.activate();
    const components = await (0, extensionInit_1.initializeComponents)(ext);
    const componentsActivated = await (0, extensionActivation_1.activateComponents)(ext, components);
    (0, extensionActivation_1.activateFeatures)(ext, components);
    const nonBlocking = componentsActivated.map((r) => r.fullyReady);
    const activationPromise = (async () => {
        await Promise.all(nonBlocking);
    })();
    startupDurations.totalActivateTime = startupStopWatch.elapsedTime - startupDurations.startActivateTime;
    activationDeferred.resolve();
    setTimeout(async () => {
        var _a;
        if (activatedServiceContainer) {
            const workspaceService = activatedServiceContainer.get(types_1.IWorkspaceService);
            if (workspaceService.isTrusted) {
                const interpreterManager = activatedServiceContainer.get(contracts_1.IInterpreterService);
                const workspaces = (_a = workspaceService.workspaceFolders) !== null && _a !== void 0 ? _a : [];
                await interpreterManager
                    .refresh(workspaces.length > 0 ? workspaces[0].uri : undefined)
                    .catch((ex) => (0, logging_1.traceError)('Python Extension: interpreterManager.refresh', ex));
            }
        }
        (0, runAfterActivation_1.runAfterActivation)();
    });
    const api = (0, api_1.buildApi)(activationPromise, ext.legacyIOC.serviceManager, ext.legacyIOC.serviceContainer, components.pythonEnvs);
    const proposedApi = (0, proposedApi_1.buildProposedApi)(components.pythonEnvs, ext.legacyIOC.serviceContainer);
    return [{ ...api, ...proposedApi }, activationPromise, ext.legacyIOC.serviceContainer];
}
function displayProgress(promise) {
    const progressOptions = { location: vscode_1.ProgressLocation.Window, title: localize_1.Common.loadingExtension };
    vscode_1.window.withProgress(progressOptions, () => promise);
}
async function handleError(ex, startupDurations) {
    notifyUser("Extension activation failed, run the 'Developer: Toggle Developer Tools' command for more information.");
    (0, logging_1.traceError)('extension activation failed', ex);
    await (0, startupTelemetry_1.sendErrorTelemetry)(ex, startupDurations, activatedServiceContainer);
}
function notifyUser(msg) {
    try {
        let appShell = vscode_1.window;
        if (activatedServiceContainer) {
            appShell = activatedServiceContainer.get(types_1.IApplicationShell);
        }
        appShell.showErrorMessage(msg).ignoreErrors();
    }
    catch (ex) {
        (0, logging_1.traceError)('Failed to Notify User', ex);
    }
}
//# sourceMappingURL=extension.js.map