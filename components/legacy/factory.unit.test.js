"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const TypeMoq = require("typemoq");
const vscode_1 = require("vscode");
const types_1 = require("../../../client/common/application/types");
const factory_1 = require("../../../client/common/terminal/factory");
const service_1 = require("../../../client/common/terminal/service");
const syncTerminalService_1 = require("../../../client/common/terminal/syncTerminalService");
const types_2 = require("../../../client/common/terminal/types");
const types_3 = require("../../../client/common/types");
const contracts_1 = require("../../../client/interpreter/contracts");
suite('Terminal Service Factory', () => {
    let factory;
    let disposables = [];
    let workspaceService;
    let fs;
    setup(() => {
        const serviceContainer = TypeMoq.Mock.ofType();
        const interpreterService = TypeMoq.Mock.ofType();
        fs = TypeMoq.Mock.ofType();
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(contracts_1.IInterpreterService), TypeMoq.It.isAny()))
            .returns(() => interpreterService.object);
        disposables = [];
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_3.IDisposableRegistry), TypeMoq.It.isAny()))
            .returns(() => disposables);
        const terminalHelper = TypeMoq.Mock.ofType();
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_2.ITerminalHelper), TypeMoq.It.isAny()))
            .returns(() => terminalHelper.object);
        const terminalManager = TypeMoq.Mock.ofType();
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_1.ITerminalManager), TypeMoq.It.isAny()))
            .returns(() => terminalManager.object);
        factory = new factory_1.TerminalServiceFactory(serviceContainer.object, fs.object, interpreterService.object);
        workspaceService = TypeMoq.Mock.ofType();
        serviceContainer
            .setup((c) => c.get(TypeMoq.It.isValue(types_1.IWorkspaceService), TypeMoq.It.isAny()))
            .returns(() => workspaceService.object);
    });
    teardown(() => {
        disposables.forEach((disposable) => {
            if (disposable) {
                disposable.dispose();
            }
        });
    });
    test('Ensure same instance of terminal service is returned', () => {
        const instance = factory.getTerminalService({});
        const sameInstance = factory.getTerminalService({}).terminalService === instance.terminalService;
        (0, chai_1.expect)(sameInstance).to.equal(true, 'Instances are not the same');
        const differentInstance = factory.getTerminalService({ resource: undefined, title: 'New Title' });
        const notTheSameInstance = differentInstance === instance;
        (0, chai_1.expect)(notTheSameInstance).not.to.equal(true, 'Instances are the same');
    });
    test('Ensure different instance of terminal service is returned when title is provided', () => {
        const defaultInstance = factory.getTerminalService({});
        (0, chai_1.expect)(defaultInstance instanceof syncTerminalService_1.SynchronousTerminalService).to.equal(true, 'Not an instance of Terminal service');
        const notSameAsDefaultInstance = factory.getTerminalService({ resource: undefined, title: 'New Title' }) === defaultInstance;
        (0, chai_1.expect)(notSameAsDefaultInstance).to.not.equal(true, 'Instances are the same as default instance');
        const instance = factory.getTerminalService({
            resource: undefined,
            title: 'New Title',
        });
        const sameInstance = factory.getTerminalService({ resource: undefined, title: 'New Title' })
            .terminalService === instance.terminalService;
        (0, chai_1.expect)(sameInstance).to.equal(true, 'Instances are not the same');
        const differentInstance = factory.getTerminalService({ resource: undefined, title: 'Another New Title' });
        const notTheSameInstance = differentInstance === instance;
        (0, chai_1.expect)(notTheSameInstance).not.to.equal(true, 'Instances are the same');
    });
    test('Ensure different instance of terminal services are created', () => {
        const instance1 = factory.createTerminalService();
        (0, chai_1.expect)(instance1 instanceof service_1.TerminalService).to.equal(true, 'Not an instance of Terminal service');
        const notSameAsFirstInstance = factory.createTerminalService() === instance1;
        (0, chai_1.expect)(notSameAsFirstInstance).to.not.equal(true, 'Instances are the same');
        const instance2 = factory.createTerminalService(vscode_1.Uri.file('a'), 'Title');
        const notSameAsSecondInstance = instance1 === instance2;
        (0, chai_1.expect)(notSameAsSecondInstance).to.not.equal(true, 'Instances are the same');
        const instance3 = factory.createTerminalService(vscode_1.Uri.file('a'), 'Title');
        const notSameAsThirdInstance = instance2 === instance3;
        (0, chai_1.expect)(notSameAsThirdInstance).to.not.equal(true, 'Instances are the same');
    });
    test('Ensure same terminal is returned when using different resources from the same workspace', () => {
        const file1A = vscode_1.Uri.file('1a');
        const file2A = vscode_1.Uri.file('2a');
        const fileB = vscode_1.Uri.file('b');
        const workspaceUriA = vscode_1.Uri.file('A');
        const workspaceUriB = vscode_1.Uri.file('B');
        const workspaceFolderA = TypeMoq.Mock.ofType();
        workspaceFolderA.setup((w) => w.uri).returns(() => workspaceUriA);
        const workspaceFolderB = TypeMoq.Mock.ofType();
        workspaceFolderB.setup((w) => w.uri).returns(() => workspaceUriB);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(file1A)))
            .returns(() => workspaceFolderA.object);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(file2A)))
            .returns(() => workspaceFolderA.object);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(fileB)))
            .returns(() => workspaceFolderB.object);
        const terminalForFile1A = factory.getTerminalService({ resource: file1A });
        const terminalForFile2A = factory.getTerminalService({ resource: file2A });
        const terminalForFileB = factory.getTerminalService({ resource: fileB });
        const terminalsAreSameForWorkspaceA = terminalForFile1A.terminalService === terminalForFile2A.terminalService;
        (0, chai_1.expect)(terminalsAreSameForWorkspaceA).to.equal(true, 'Instances are not the same for Workspace A');
        const terminalsForWorkspaceABAreDifferent = terminalForFile1A.terminalService === terminalForFileB.terminalService;
        (0, chai_1.expect)(terminalsForWorkspaceABAreDifferent).to.equal(false, 'Instances should be different for different workspaces');
    });
    test('When `newTerminalPerFile` is true, ensure different terminal is returned when using different resources from the same workspace', () => {
        const file1A = vscode_1.Uri.file('1a');
        const file2A = vscode_1.Uri.file('2a');
        const fileB = vscode_1.Uri.file('b');
        const workspaceUriA = vscode_1.Uri.file('A');
        const workspaceUriB = vscode_1.Uri.file('B');
        const workspaceFolderA = TypeMoq.Mock.ofType();
        workspaceFolderA.setup((w) => w.uri).returns(() => workspaceUriA);
        const workspaceFolderB = TypeMoq.Mock.ofType();
        workspaceFolderB.setup((w) => w.uri).returns(() => workspaceUriB);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(file1A)))
            .returns(() => workspaceFolderA.object);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(file2A)))
            .returns(() => workspaceFolderA.object);
        workspaceService
            .setup((w) => w.getWorkspaceFolder(TypeMoq.It.isValue(fileB)))
            .returns(() => workspaceFolderB.object);
        const terminalForFile1A = factory.getTerminalService({
            resource: file1A,
            newTerminalPerFile: true,
        });
        const terminalForFile2A = factory.getTerminalService({
            resource: file2A,
            newTerminalPerFile: true,
        });
        const terminalForFileB = factory.getTerminalService({
            resource: fileB,
            newTerminalPerFile: true,
        });
        const terminalsAreSameForWorkspaceA = terminalForFile1A.terminalService === terminalForFile2A.terminalService;
        (0, chai_1.expect)(terminalsAreSameForWorkspaceA).to.equal(false, 'Instances are the same for Workspace A');
        const terminalsForWorkspaceABAreDifferent = terminalForFile1A.terminalService === terminalForFileB.terminalService;
        (0, chai_1.expect)(terminalsForWorkspaceABAreDifferent).to.equal(false, 'Instances should be different for different workspaces');
    });
});
//# sourceMappingURL=factory.unit.test.js.map