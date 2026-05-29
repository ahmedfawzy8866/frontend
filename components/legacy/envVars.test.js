"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chaiAsPromised = require("chai-as-promised");
const path = require("path");
const shortid = require("shortid");
const types_1 = require("../../client/common/types");
const types_2 = require("../../client/common/variables/types");
const helper_1 = require("../../client/debugger/extension/configuration/resolvers/helper");
const common_1 = require("../common");
const initialize_1 = require("../initialize");
const serviceRegistry_1 = require("../testing/serviceRegistry");
const fs_paths_1 = require("../../client/common/platform/fs-paths");
(0, chai_1.use)(chaiAsPromised);
suite('Resolving Environment Variables when Debugging', () => {
    let ioc;
    let debugEnvParser;
    let pathVariableName;
    let mockProcess;
    suiteSetup(async function () {
        if (!initialize_1.IS_MULTI_ROOT_TEST || !initialize_1.TEST_DEBUGGER) {
            return this.skip();
        }
        await (0, initialize_1.initialize)();
    });
    setup(async () => {
        await initializeDI();
        await (0, initialize_1.initializeTest)();
        const envParser = ioc.serviceContainer.get(types_2.IEnvironmentVariablesService);
        const pathUtils = ioc.serviceContainer.get(types_1.IPathUtils);
        mockProcess = ioc.serviceContainer.get(types_1.ICurrentProcess);
        debugEnvParser = new helper_1.DebugEnvironmentVariablesHelper(envParser, mockProcess);
        pathVariableName = pathUtils.getPathVariableName();
    });
    suiteTeardown(initialize_1.closeActiveWindows);
    teardown(async () => {
        await ioc.dispose();
        await (0, initialize_1.closeActiveWindows)();
    });
    async function initializeDI() {
        ioc = new serviceRegistry_1.UnitTestIocContainer();
        ioc.registerProcessTypes();
        ioc.registerFileSystemTypes();
        ioc.registerVariableTypes();
        ioc.registerMockProcess();
    }
    async function testBasicProperties(console, expectedNumberOfVariables) {
        const args = {
            program: '',
            pythonPath: '',
            args: [],
            envFile: '',
            console,
        };
        const envVars = await debugEnvParser.getEnvironmentVariables(args);
        (0, chai_1.expect)(envVars).not.be.undefined;
        (0, chai_1.expect)(Object.keys(envVars)).lengthOf(expectedNumberOfVariables, 'Incorrect number of variables');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONUNBUFFERED', '1', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONIOENCODING', 'UTF-8', 'Property not found');
    }
    test('Confirm basic environment variables exist when launched in external terminal', () => testBasicProperties('externalTerminal', 2));
    test('Confirm basic environment variables exist when launched in intergrated terminal', () => testBasicProperties('integratedTerminal', 2));
    test('Confirm base environment variables are merged without overwriting when provided', async () => {
        const env = { DO_NOT_OVERWRITE: '1' };
        const args = {
            program: '',
            pythonPath: '',
            args: [],
            envFile: '',
            console,
            env,
        };
        const baseEnvVars = { CONDA_PREFIX: 'path/to/conda/env', DO_NOT_OVERWRITE: '0' };
        const envVars = await debugEnvParser.getEnvironmentVariables(args, baseEnvVars);
        (0, chai_1.expect)(envVars).not.be.undefined;
        (0, chai_1.expect)(Object.keys(envVars)).lengthOf(4, 'Incorrect number of variables');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONUNBUFFERED', '1', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONIOENCODING', 'UTF-8', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('CONDA_PREFIX', 'path/to/conda/env', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('DO_NOT_OVERWRITE', '1', 'Property not found');
    });
    test('Confirm basic environment variables exist when launched in debug console', async () => {
        let expectedNumberOfVariables = Object.keys(mockProcess.env).length;
        if (mockProcess.env['PYTHONUNBUFFERED'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        if (mockProcess.env['PYTHONIOENCODING'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        await testBasicProperties('internalConsole', expectedNumberOfVariables);
    });
    async function testJsonEnvVariables(console, expectedNumberOfVariables) {
        const prop1 = (0, fs_paths_1.normCase)(shortid.generate());
        const prop2 = (0, fs_paths_1.normCase)(shortid.generate());
        const prop3 = (0, fs_paths_1.normCase)(shortid.generate());
        const env = {};
        env[prop1] = prop1;
        env[prop2] = prop2;
        mockProcess.env[prop3] = prop3;
        const args = {
            program: '',
            pythonPath: '',
            args: [],
            envFile: '',
            console,
            env,
        };
        const envVars = await debugEnvParser.getEnvironmentVariables(args);
        (0, chai_1.expect)(envVars).not.be.undefined;
        (0, chai_1.expect)(Object.keys(envVars)).lengthOf(expectedNumberOfVariables, 'Incorrect number of variables');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONUNBUFFERED', '1', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONIOENCODING', 'UTF-8', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property(prop1, prop1, 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property(prop2, prop2, 'Property not found');
        if (console === 'internalConsole') {
            (0, chai_1.expect)(envVars).to.have.property(prop3, prop3, 'Property not found');
        }
        else {
            (0, chai_1.expect)(envVars).not.to.have.property(prop3, prop3, 'Property not found');
        }
    }
    test('Confirm json environment variables exist when launched in external terminal', () => testJsonEnvVariables('externalTerminal', 2 + 2));
    test('Confirm json environment variables exist when launched in intergrated terminal', () => testJsonEnvVariables('integratedTerminal', 2 + 2));
    test('Confirm json environment variables exist when launched in debug console', async () => {
        let expectedNumberOfVariables = Object.keys(mockProcess.env).length + 3;
        if (mockProcess.env['PYTHONUNBUFFERED'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        if (mockProcess.env['PYTHONIOENCODING'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        await testJsonEnvVariables('internalConsole', expectedNumberOfVariables);
    });
    async function testAppendingOfPaths(console, expectedNumberOfVariables, removePythonPath) {
        if (removePythonPath && mockProcess.env.PYTHONPATH !== undefined) {
            delete mockProcess.env.PYTHONPATH;
        }
        const customPathToAppend = shortid.generate();
        const customPythonPathToAppend = shortid.generate();
        const prop1 = shortid.generate();
        const prop2 = shortid.generate();
        const prop3 = shortid.generate();
        const env = {};
        env[pathVariableName] = customPathToAppend;
        env['PYTHONPATH'] = customPythonPathToAppend;
        env[prop1] = prop1;
        env[prop2] = prop2;
        mockProcess.env[prop3] = prop3;
        const args = {
            program: '',
            pythonPath: '',
            args: [],
            envFile: '',
            console,
            env,
        };
        const envVars = await debugEnvParser.getEnvironmentVariables(args);
        (0, chai_1.expect)(envVars).not.be.undefined;
        (0, chai_1.expect)(Object.keys(envVars)).lengthOf(expectedNumberOfVariables, 'Incorrect number of variables');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONPATH');
        (0, chai_1.expect)(envVars).to.have.property(pathVariableName);
        (0, chai_1.expect)(envVars).to.have.property('PYTHONUNBUFFERED', '1', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property('PYTHONIOENCODING', 'UTF-8', 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property(prop1, prop1, 'Property not found');
        (0, chai_1.expect)(envVars).to.have.property(prop2, prop2, 'Property not found');
        if (console === 'internalConsole') {
            (0, chai_1.expect)(envVars).to.have.property(prop3, prop3, 'Property not found');
        }
        else {
            (0, chai_1.expect)(envVars).not.to.have.property(prop3, prop3, 'Property not found');
        }
        const expectedPath = `${customPathToAppend}${path.delimiter}${mockProcess.env[pathVariableName]}`;
        (0, chai_1.expect)(envVars).to.have.property(pathVariableName, expectedPath, 'PATH is not correct');
        let expectedPythonPath = customPythonPathToAppend;
        if (typeof mockProcess.env.PYTHONPATH === 'string' && mockProcess.env.PYTHONPATH.length > 0) {
            expectedPythonPath = customPythonPathToAppend + path.delimiter + mockProcess.env.PYTHONPATH;
        }
        (0, chai_1.expect)(envVars).to.have.property('PYTHONPATH', expectedPythonPath, 'PYTHONPATH is not correct');
        if (console === 'internalConsole') {
            (0, chai_1.expect)(Object.keys(envVars).length).greaterThan(Object.keys(mockProcess.env).length, 'Variables is not a subset');
            Object.keys(mockProcess.env).forEach((key) => {
                if (key === pathVariableName || key === 'PYTHONPATH') {
                    return;
                }
                (0, chai_1.expect)(mockProcess.env[key]).equal(envVars[key], `Value for the environment variable '${key}' is incorrect.`);
            });
        }
    }
    test('Confirm paths get appended correctly when using json variables and launched in external terminal', async function () {
        if ((0, common_1.isOs)(common_1.OSType.Windows)) {
            return this.skip();
        }
        await testAppendingOfPaths('externalTerminal', 6, false);
    });
    test('Confirm paths get appended correctly when using json variables and launched in integrated terminal', async function () {
        if ((0, common_1.isOs)(common_1.OSType.Windows)) {
            return this.skip();
        }
        await testAppendingOfPaths('integratedTerminal', 6, false);
    });
    test('Confirm paths get appended correctly when using json variables and launched in debug console', async function () {
        if ((0, common_1.isOs)(common_1.OSType.Windows)) {
            return this.skip();
        }
        let expectedNumberOfVariables = Object.keys(mockProcess.env).length + 3;
        if (mockProcess.env['PYTHONUNBUFFERED'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        if (mockProcess.env['PYTHONPATH'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        if (mockProcess.env['PYTHONIOENCODING'] === undefined) {
            expectedNumberOfVariables += 1;
        }
        await testAppendingOfPaths('internalConsole', expectedNumberOfVariables, false);
    });
});
//# sourceMappingURL=envVars.test.js.map