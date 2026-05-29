"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryManager = void 0;
const extension_telemetry_1 = require("@vscode/extension-telemetry");
const vscode = require("vscode");
const APP_INSIGHTS_KEY = '8618f206-4732-4729-88ed-d07dcf17f199';
class TelemetryManager {
    constructor(options) {
        var _a;
        this.options = options;
        this.reporter = new extension_telemetry_1.default(this.options.extensionId, this.options.extensionVersion, (_a = this.options.applicationInsightsKey) !== null && _a !== void 0 ? _a : APP_INSIGHTS_KEY);
    }
    dispose() {
        return this.reporter.dispose();
    }
    /**
     * The extension has first started up
     */
    sendStartupEvent() {
        this.reporter.sendTelemetryEvent('startup');
    }
    /**
     * Track when a debug session has been started
     */
    sendStartDebugSessionEvent(initialConfig, finalConfig, deviceInfo) {
        var _a, _b;
        let debugConnectionType;
        let enableDebugProtocol = (_a = finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.enableDebugProtocol) !== null && _a !== void 0 ? _a : initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.enableDebugProtocol;
        if (enableDebugProtocol === true) {
            debugConnectionType = 'debugProtocol';
        }
        else if (enableDebugProtocol === false) {
            debugConnectionType = 'telnet';
        }
        else {
            debugConnectionType = undefined;
        }
        this.reporter.sendTelemetryEvent('startDebugSession', {
            enableDebugProtocol: boolToString(initialConfig.enableDebugProtocol),
            enableVariablesPanel: boolToString(initialConfig.enableVariablesPanel),
            deferScopeLoading: boolToString(initialConfig.deferScopeLoading),
            autoResolveVirtualVariables: boolToString(initialConfig.autoResolveVirtualVariables),
            enhanceREPLCompletions: boolToString(initialConfig.enhanceREPLCompletions),
            rewriteDevicePathsInLogs: boolToString(initialConfig.rewriteDevicePathsInLogs),
            showHiddenVariables: boolToString(initialConfig.showHiddenVariables),
            debugConnectionType: debugConnectionType === null || debugConnectionType === void 0 ? void 0 : debugConnectionType.toString(),
            retainDeploymentArchive: boolToString(initialConfig.retainDeploymentArchive),
            retainStagingFolder: boolToString(initialConfig.retainStagingFolder),
            injectRaleTrackerTask: boolToString(initialConfig.injectRaleTrackerTask),
            isFilesDefined: isDefined(initialConfig.files),
            isPreLaunchTaskDefined: isDefined(initialConfig.preLaunchTask),
            isComponentLibrariesDefined: isDefined(initialConfig.componentLibraries),
            isDeepLinkUrlDefined: isDefined(initialConfig.deepLinkUrl),
            isStagingFolderPathDefined: isDefined(initialConfig.stagingFolderPath),
            isLogfilePathDefined: isDefined(initialConfig.logfilePath),
            isBsConstDefined: isDefined(initialConfig.bsConst),
            isExtensionLogfilePathDefined: isDefined(vscode.workspace.getConfiguration('brightscript').get('extensionLogfilePath')),
            // include some deviceInfo data
            deviceInfoSoftwareVersion: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.softwareVersion,
            deviceInfoSoftwareBuild: (_b = deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.softwareBuild) === null || _b === void 0 ? void 0 : _b.toString(),
            deviceInfoBrightscriptDebuggerVersion: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.brightscriptDebuggerVersion,
            deviceInfoCountry: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.country,
            deviceInfoLocale: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.locale,
            deviceInfoUiResolution: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.uiResolution
        });
    }
    /**
     * Track when remoteControlMode has been enabled or disabled (we don't track WHAT users send, only that they're enabling/disabling the feature)
     * @param enabled is the remoteControlMode being enabled or disabled
     * @param initiator who triggered this event. 'statusbar' is when the user clicks the "toggle remote mode" in the statusbar.
     *                  "command" is when it's triggered directly from a vscode command
     */
    sendSetRemoteControlModeEvent(isEnabled, initiator) {
        this.reporter.sendTelemetryEvent('setRemoteControlMode', {
            isEnabled: boolToString(isEnabled),
            initiator: initiator
        });
    }
}
exports.TelemetryManager = TelemetryManager;
function boolToString(value) {
    var _a;
    return (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : 'undefined';
}
function isDefined(value) {
    return value ? 'true' : 'false';
}
//# sourceMappingURL=TelemetryManager.js.map