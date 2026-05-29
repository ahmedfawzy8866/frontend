"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const platform_1 = require("../../../../client/common/utils/platform");
const info_1 = require("../../../../client/pythonEnvironments/base/info");
const windowsKnownPathsLocator_1 = require("../../../../client/pythonEnvironments/base/locators/lowLevel/windowsKnownPathsLocator");
const fs_1 = require("../../../utils/fs");
const envTestUtils_1 = require("../../base/locators/envTestUtils");
const common_1 = require("../../base/common");
const IS_WINDOWS = (0, platform_1.getOSType)() === platform_1.OSType.Windows;
suite('Python envs locator - WindowsPathEnvVarLocator', async () => {
    let cleanUps;
    const ENV_VAR = 'Path';
    const datadir = path.join(__dirname, '.data');
    const ROOT1 = path.join(datadir, 'root1');
    const ROOT2 = path.join(datadir, 'parent', 'root2');
    const ROOT3 = path.join(datadir, 'root3');
    const ROOT4 = path.join(datadir, 'root4');
    const ROOT5 = path.join(datadir, 'root5');
    const ROOT6 = path.join(datadir, 'root6');
    const DOES_NOT_EXIST = path.join(datadir, '.does-not-exist');
    const dataTree = `
        ./.data/
           root1/
              python2.exe  # matches on Windows (not actually executable though)
              <python.exe>
              <python2.7.exe>
              <python3.exe>
              <python3.8.exe>
              <python3.8>
              <python3.8.1rc1.10213.exe>  # should match but doesn't
              #<python27.exe>
              #<python38.exe>
              <python.3.8.exe>  # should match but doesn't
              python.txt
              <my-python.exe>  # should match but doesn't
              <spam.exe>
              spam.txt
           parent/
              root2/
                 <python2.exe>
                 <python2>
           root3/  # empty
           root4/  # no executables
              subdir/
              spam.txt
              python2
              #python.exe  # matches on Windows (not actually executable though)
           root5/  # executables only in subdir
              subdir/
                 <python2.exe>
                 <python2>
              python2
              #python2.exe  # matches on Windows (not actually executable though)
           root6/  # no matching executables
              <spam.exe>
              spam.txt
              <py>
              <py.exe>
    `.trimEnd();
    suiteSetup(async function () {
        if (!IS_WINDOWS) {
            if (!process.env.PVSC_TEST_FORCE) {
                this.skip();
            }
            const sinon = require('sinon');
            const platformAPI = require('../../../../../client/common/utils/platform');
            const stub = sinon.stub(platformAPI, 'getOSType');
            stub.returns(platform_1.OSType.Windows);
        }
        await (0, fs_1.ensureFSTree)(dataTree, __dirname);
    });
    setup(() => {
        cleanUps = [];
        const oldSearchPath = process.env[ENV_VAR];
        cleanUps.push(() => {
            process.env[ENV_VAR] = oldSearchPath;
        });
    });
    teardown(() => {
        cleanUps.forEach((run) => {
            try {
                run();
            }
            catch (err) {
                console.log(err);
            }
        });
    });
    function getActiveLocator(...roots) {
        process.env[ENV_VAR] = roots.join(path.delimiter);
        const locator = new windowsKnownPathsLocator_1.WindowsPathEnvVarLocator();
        cleanUps.push(() => locator.dispose());
        return locator;
    }
    suite('iterEnvs()', () => {
        test('no executables found', async () => {
            const expected = [];
            const locator = getActiveLocator(ROOT3, ROOT4, DOES_NOT_EXIST, ROOT5);
            const query = undefined;
            const iterator = locator.iterEnvs(query);
            const envs = await (0, common_1.getEnvs)(iterator);
            chai_1.assert.deepEqual(envs, expected);
        });
        test('no executables match', async () => {
            const expected = [];
            const locator = getActiveLocator(ROOT6, DOES_NOT_EXIST);
            const query = undefined;
            const iterator = locator.iterEnvs(query);
            const envs = await (0, common_1.getEnvs)(iterator);
            chai_1.assert.deepEqual(envs, expected);
        });
        test('some executables match', async () => {
            const expected = [
                (0, common_1.createBasicEnv)(info_1.PythonEnvKind.System, path.join(ROOT1, 'python.exe'), [info_1.PythonEnvSource.PathEnvVar]),
            ];
            const locator = getActiveLocator(ROOT2, ROOT6, ROOT1);
            const query = undefined;
            const iterator = locator.iterEnvs(query);
            const envs = await (0, common_1.getEnvs)(iterator);
            (0, envTestUtils_1.assertBasicEnvsEqual)(envs, expected);
        });
    });
});
//# sourceMappingURL=windowsKnownPathsLocator.functional.test.js.map