'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const commandManager_1 = require("../../../../../client/common/application/commandManager");
const debugConfigurationService_1 = require("../../../../../client/debugger/extension/configuration/debugConfigurationService");
const updaterService_1 = require("../../../../../client/debugger/extension/configuration/launch.json/updaterService");
const updaterServiceHelper_1 = require("../../../../../client/debugger/extension/configuration/launch.json/updaterServiceHelper");
suite('Debugging - launch.json Updater Service', () => {
    let helper;
    let commandManager;
    let debugConfigService;
    setup(() => {
        commandManager = (0, ts_mockito_1.mock)(commandManager_1.CommandManager);
        debugConfigService = (0, ts_mockito_1.mock)(debugConfigurationService_1.PythonDebugConfigurationService);
        helper = new updaterServiceHelper_1.LaunchJsonUpdaterServiceHelper((0, ts_mockito_1.instance)(debugConfigService));
    });
    test('Activation will register the required commands', async () => {
        const service = new updaterService_1.LaunchJsonUpdaterService([], (0, ts_mockito_1.instance)(debugConfigService));
        await service.activate();
        (0, ts_mockito_1.verify)(commandManager.registerCommand('python.SelectAndInsertDebugConfiguration', helper.selectAndInsertDebugConfig, helper));
    });
});
//# sourceMappingURL=updaterServer.unit.test.js.map