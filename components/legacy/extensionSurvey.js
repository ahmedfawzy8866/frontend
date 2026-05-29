'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionSurveyPrompt = exports.extensionSurveyStateKeys = void 0;
const inversify_1 = require("inversify");
const querystring = require("querystring");
const vscode_1 = require("vscode");
const types_1 = require("../common/application/types");
const groups_1 = require("../common/experiments/groups");
require("../common/extensions");
const types_2 = require("../common/platform/types");
const types_3 = require("../common/types");
const localize_1 = require("../common/utils/localize");
const logging_1 = require("../logging");
const telemetry_1 = require("../telemetry");
const constants_1 = require("../telemetry/constants");
var extensionSurveyStateKeys;
(function (extensionSurveyStateKeys) {
    extensionSurveyStateKeys["doNotShowAgain"] = "doNotShowExtensionSurveyAgain";
    extensionSurveyStateKeys["disableSurveyForTime"] = "doNotShowExtensionSurveyUntilTime";
})(extensionSurveyStateKeys = exports.extensionSurveyStateKeys || (exports.extensionSurveyStateKeys = {}));
const timeToDisableSurveyFor = 1000 * 60 * 60 * 24 * 7 * 12;
const WAIT_TIME_TO_SHOW_SURVEY = 1000 * 60 * 60 * 3;
let ExtensionSurveyPrompt = class ExtensionSurveyPrompt {
    constructor(appShell, browserService, persistentState, random, experiments, appEnvironment, platformService, sampleSizePerOneHundredUsers = 10, waitTimeToShowSurvey = WAIT_TIME_TO_SHOW_SURVEY) {
        this.appShell = appShell;
        this.browserService = browserService;
        this.persistentState = persistentState;
        this.random = random;
        this.experiments = experiments;
        this.appEnvironment = appEnvironment;
        this.platformService = platformService;
        this.sampleSizePerOneHundredUsers = sampleSizePerOneHundredUsers;
        this.waitTimeToShowSurvey = waitTimeToShowSurvey;
        this.supportedWorkspaceTypes = { untrustedWorkspace: false, virtualWorkspace: true };
    }
    async activate() {
        if (!(await this.experiments.inExperiment(groups_1.ShowExtensionSurveyPrompt.experiment))) {
            return;
        }
        const show = this.shouldShowBanner();
        if (!show) {
            return;
        }
        setTimeout(() => this.showSurvey().ignoreErrors(), this.waitTimeToShowSurvey);
    }
    shouldShowBanner() {
        if (vscode_1.env.uiKind === (vscode_1.UIKind === null || vscode_1.UIKind === void 0 ? void 0 : vscode_1.UIKind.Web)) {
            return false;
        }
        const doNotShowSurveyAgain = this.persistentState.createGlobalPersistentState(extensionSurveyStateKeys.doNotShowAgain, false);
        if (doNotShowSurveyAgain.value) {
            return false;
        }
        const isSurveyDisabledForTimeState = this.persistentState.createGlobalPersistentState(extensionSurveyStateKeys.disableSurveyForTime, false, timeToDisableSurveyFor);
        if (isSurveyDisabledForTimeState.value) {
            return false;
        }
        const randomSample = this.random.getRandomInt(0, 100);
        if (randomSample >= this.sampleSizePerOneHundredUsers) {
            return false;
        }
        return true;
    }
    async showSurvey() {
        const prompts = [localize_1.ExtensionSurveyBanner.bannerLabelYes, localize_1.ExtensionSurveyBanner.maybeLater, localize_1.Common.doNotShowAgain];
        const telemetrySelections = [
            'Yes',
            'Maybe later',
            "Don't show again",
        ];
        const selection = await this.appShell.showInformationMessage(localize_1.ExtensionSurveyBanner.bannerMessage, ...prompts);
        (0, telemetry_1.sendTelemetryEvent)(constants_1.EventName.EXTENSION_SURVEY_PROMPT, undefined, {
            selection: selection ? telemetrySelections[prompts.indexOf(selection)] : undefined,
        });
        if (!selection) {
            return;
        }
        if (selection === localize_1.ExtensionSurveyBanner.bannerLabelYes) {
            this.launchSurvey();
            await this.persistentState
                .createGlobalPersistentState(extensionSurveyStateKeys.disableSurveyForTime, false, timeToDisableSurveyFor)
                .updateValue(true);
        }
        else if (selection === localize_1.Common.doNotShowAgain) {
            await this.persistentState
                .createGlobalPersistentState(extensionSurveyStateKeys.doNotShowAgain, false)
                .updateValue(true);
        }
    }
    launchSurvey() {
        const query = querystring.stringify({
            o: encodeURIComponent(this.platformService.osType),
            v: encodeURIComponent(this.appEnvironment.vscodeVersion),
            e: encodeURIComponent(this.appEnvironment.packageJson.version),
            m: encodeURIComponent(this.appEnvironment.sessionId),
        });
        const url = `https://aka.ms/AA5rjx5?${query}`;
        this.browserService.launch(url);
    }
};
__decorate([
    (0, logging_1.traceDecoratorError)('Failed to check whether to display prompt for extension survey')
], ExtensionSurveyPrompt.prototype, "shouldShowBanner", null);
__decorate([
    (0, logging_1.traceDecoratorError)('Failed to display prompt for extension survey')
], ExtensionSurveyPrompt.prototype, "showSurvey", null);
ExtensionSurveyPrompt = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.IApplicationShell)),
    __param(1, (0, inversify_1.inject)(types_3.IBrowserService)),
    __param(2, (0, inversify_1.inject)(types_3.IPersistentStateFactory)),
    __param(3, (0, inversify_1.inject)(types_3.IRandom)),
    __param(4, (0, inversify_1.inject)(types_3.IExperimentService)),
    __param(5, (0, inversify_1.inject)(types_1.IApplicationEnvironment)),
    __param(6, (0, inversify_1.inject)(types_2.IPlatformService)),
    __param(7, (0, inversify_1.optional)()),
    __param(8, (0, inversify_1.optional)())
], ExtensionSurveyPrompt);
exports.ExtensionSurveyPrompt = ExtensionSurveyPrompt;
//# sourceMappingURL=extensionSurvey.js.map