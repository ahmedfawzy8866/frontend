"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const ts_mockito_1 = require("ts-mockito");
const vscode_1 = require("vscode");
const cancellation_1 = require("../../../client/common/cancellation");
const fileSystem_1 = require("../../../client/common/platform/fileSystem");
const service_1 = require("../../../client/common/terminal/service");
const syncTerminalService_1 = require("../../../client/common/terminal/syncTerminalService");
const async_1 = require("../../../client/common/utils/async");
const constants_1 = require("../../../client/constants");
const interpreterService_1 = require("../../../client/interpreter/interpreterService");
const core_1 = require("../../core");
suite('Terminal Service (synchronous)', () => {
    let service;
    let fs;
    let interpreterService;
    let terminalService;
    setup(() => {
        fs = (0, ts_mockito_1.mock)(fileSystem_1.FileSystem);
        interpreterService = (0, ts_mockito_1.mock)(interpreterService_1.InterpreterService);
        terminalService = (0, ts_mockito_1.mock)(service_1.TerminalService);
        service = new syncTerminalService_1.SynchronousTerminalService((0, ts_mockito_1.instance)(fs), (0, ts_mockito_1.instance)(interpreterService), (0, ts_mockito_1.instance)(terminalService));
    });
    suite('Show, sendText and dispose should invoke corresponding methods in wrapped TerminalService', () => {
        test('Show should invoke show in terminal', async () => {
            (0, ts_mockito_1.when)(terminalService.show((0, ts_mockito_1.anything)())).thenResolve();
            await service.show();
            (0, ts_mockito_1.verify)(terminalService.show(undefined)).once();
        });
        test('Show should invoke show in terminal (without chaning focus)', async () => {
            (0, ts_mockito_1.when)(terminalService.show((0, ts_mockito_1.anything)())).thenResolve();
            await service.show(false);
            (0, ts_mockito_1.verify)(terminalService.show(false)).once();
        });
        test('Show should invoke show in terminal (without chaning focus)', async () => {
            (0, ts_mockito_1.when)(terminalService.show((0, ts_mockito_1.anything)())).thenResolve();
            await service.show(false);
            (0, ts_mockito_1.verify)(terminalService.show(false)).once();
        });
        test('Show should invoke show in terminal (without chaning focus)', async () => {
            (0, ts_mockito_1.when)(terminalService.show((0, ts_mockito_1.anything)())).thenResolve();
            await service.show(false);
            (0, ts_mockito_1.verify)(terminalService.show(false)).once();
        });
        test('Dispose should dipose the wrapped TerminalService', async () => {
            service.dispose();
            (0, ts_mockito_1.verify)(terminalService.dispose()).once();
        });
        test('sendText should invokeSendText in wrapped TerminalService', async () => {
            (0, ts_mockito_1.when)(terminalService.sendText('Blah')).thenResolve();
            await service.sendText('Blah');
            (0, ts_mockito_1.verify)(terminalService.sendText('Blah')).once();
        });
        test('sendText should invokeSendText in wrapped TerminalService (errors should be bubbled up)', async () => {
            (0, ts_mockito_1.when)(terminalService.sendText('Blah')).thenReject(new Error('kaboom'));
            const promise = service.sendText('Blah');
            await chai_1.assert.isRejected(promise, 'kaboom');
            (0, ts_mockito_1.verify)(terminalService.sendText('Blah')).once();
        });
    });
    suite('sendCommand', () => {
        const shellExecFile = path.join(constants_1.EXTENSION_ROOT_DIR, 'pythonFiles', 'shell_exec.py');
        test('run sendCommand in terminalService if there is no cancellation token', async () => {
            (0, ts_mockito_1.when)(terminalService.sendCommand('cmd', (0, ts_mockito_1.deepEqual)(['1', '2']))).thenResolve();
            await service.sendCommand('cmd', ['1', '2']);
            (0, ts_mockito_1.verify)(terminalService.sendCommand('cmd', (0, ts_mockito_1.deepEqual)(['1', '2']))).once();
        });
        test('run sendCommand in terminalService should be cancelled', async () => {
            const cancel = new vscode_1.CancellationTokenSource();
            const tmpFile = { filePath: 'tmp with spaces', dispose: core_1.noop };
            (0, ts_mockito_1.when)(terminalService.sendCommand((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).thenResolve();
            (0, ts_mockito_1.when)(interpreterService.getActiveInterpreter(undefined)).thenResolve(undefined);
            (0, ts_mockito_1.when)(fs.createTemporaryFile('.log')).thenResolve(tmpFile);
            (0, ts_mockito_1.when)(fs.readFile((0, ts_mockito_1.anything)())).thenResolve('');
            const promise = service.sendCommand('cmd', ['1', '2'], cancel.token).catch((ex) => Promise.reject(ex));
            const deferred = (0, async_1.createDeferredFrom)(promise);
            deferred.promise.ignoreErrors();
            chai_1.assert.isFalse(deferred.completed);
            await (0, core_1.sleep)(500);
            chai_1.assert.isFalse(deferred.completed);
            cancel.cancel();
            await chai_1.assert.isRejected(promise, new cancellation_1.CancellationError().message);
            (0, ts_mockito_1.verify)(fs.createTemporaryFile('.log')).once();
            (0, ts_mockito_1.verify)(fs.readFile(tmpFile.filePath)).atLeast(1);
            (0, ts_mockito_1.verify)(terminalService.sendCommand('python', (0, ts_mockito_1.deepEqual)([shellExecFile, 'cmd', '1', '2', tmpFile.filePath.fileToCommandArgumentForPythonExt()]))).once();
        }).timeout(1000);
        test('run sendCommand in terminalService should complete when command completes', async () => {
            const cancel = new vscode_1.CancellationTokenSource();
            const tmpFile = { filePath: 'tmp with spaces', dispose: core_1.noop };
            (0, ts_mockito_1.when)(terminalService.sendCommand((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).thenResolve();
            (0, ts_mockito_1.when)(interpreterService.getActiveInterpreter(undefined)).thenResolve(undefined);
            (0, ts_mockito_1.when)(fs.createTemporaryFile('.log')).thenResolve(tmpFile);
            (0, ts_mockito_1.when)(fs.readFile((0, ts_mockito_1.anything)())).thenResolve('');
            const promise = service.sendCommand('cmd', ['1', '2'], cancel.token).catch((ex) => Promise.reject(ex));
            const deferred = (0, async_1.createDeferredFrom)(promise);
            deferred.promise.ignoreErrors();
            chai_1.assert.isFalse(deferred.completed);
            await (0, core_1.sleep)(500);
            chai_1.assert.isFalse(deferred.completed);
            (0, ts_mockito_1.when)(fs.readFile((0, ts_mockito_1.anything)())).thenResolve('END');
            await promise;
            (0, ts_mockito_1.verify)(fs.createTemporaryFile('.log')).once();
            (0, ts_mockito_1.verify)(fs.readFile(tmpFile.filePath)).atLeast(1);
            (0, ts_mockito_1.verify)(terminalService.sendCommand('python', (0, ts_mockito_1.deepEqual)([shellExecFile, 'cmd', '1', '2', tmpFile.filePath.fileToCommandArgumentForPythonExt()]))).once();
        }).timeout(2000);
    });
});
//# sourceMappingURL=synchronousTerminalService.unit.test.js.map