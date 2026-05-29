"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const test_electron_1 = require("@vscode/test-electron");
const constants_1 = require("./constants");
const testLogger_1 = require("./testLogger");
const vscode_1 = require("./utils/vscode");
const workspacePath = path.join(__dirname, '..', '..', 'src', 'testMultiRootWkspc', 'multi.code-workspace');
process.env.IS_CI_SERVER_TEST_DEBUGGER = '';
process.env.VSC_PYTHON_CI_TEST = '1';
(0, testLogger_1.initializeLogger)();
function start() {
    console.log('*'.repeat(100));
    console.log('Start Multiroot tests');
    (0, test_electron_1.runTests)({
        extensionDevelopmentPath: constants_1.EXTENSION_ROOT_DIR_FOR_TESTS,
        extensionTestsPath: path.join(constants_1.EXTENSION_ROOT_DIR_FOR_TESTS, 'out', 'test', 'index'),
        launchArgs: [workspacePath],
        version: (0, vscode_1.getChannel)(),
        extensionTestsEnv: { ...process.env, UITEST_DISABLE_INSIDERS: '1' },
    }).catch((ex) => {
        console.error('End Multiroot tests (with errors)', ex);
        process.exit(1);
    });
}
start();
//# sourceMappingURL=multiRootTest.js.map