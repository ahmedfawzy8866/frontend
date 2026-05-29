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
exports.LaunchJsonUpdaterService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../../common/types");
const commandApis_1 = require("../../../../common/vscodeApis/commandApis");
const types_2 = require("../../types");
const updaterServiceHelper_1 = require("./updaterServiceHelper");
let LaunchJsonUpdaterService = class LaunchJsonUpdaterService {
    constructor(disposableRegistry, configurationProvider) {
        this.disposableRegistry = disposableRegistry;
        this.configurationProvider = configurationProvider;
        this.supportedWorkspaceTypes = { untrustedWorkspace: false, virtualWorkspace: false };
    }
    async activate() {
        const handler = new updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper(this.configurationProvider);
        this.disposableRegistry.push((0, commandApis_1.registerCommand)('python.SelectAndInsertDebugConfiguration', handler.selectAndInsertDebugConfig, handler));
    }
};
LaunchJsonUpdaterService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.IDisposableRegistry)),
    __param(1, (0, inversify_1.inject)(types_2.IDebugConfigurationService))
], LaunchJsonUpdaterService);
exports.LaunchJsonUpdaterService = LaunchJsonUpdaterService;
//# sourceMappingURL=updaterService.js.map