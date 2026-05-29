"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brighterScriptPreviewCommand = exports.BrighterScriptPreviewCommand = exports.FILE_SCHEME = void 0;
const vscode_1 = require("vscode");
const vscode = require("vscode");
const util_1 = require("../util");
const path = require("path");
const querystring = require("querystring");
const source_map_1 = require("source-map");
const LanguageServerManager_1 = require("../LanguageServerManager");
exports.FILE_SCHEME = 'bs-preview';
class BrighterScriptPreviewCommand {
    constructor() {
        this.activePreviews = {};
        // emitter and its event
        this.onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    register(context) {
        context.subscriptions.push(vscode.commands.registerCommand('brighterscript.showPreview', async (uri) => {
            uri !== null && uri !== void 0 ? uri : (uri = vscode.window.activeTextEditor.document.uri);
            await this.openPreview(uri, vscode.window.activeTextEditor, false);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('brighterscript.showPreviewToSide', async (uri) => {
            uri !== null && uri !== void 0 ? uri : (uri = vscode.window.activeTextEditor.document.uri);
            await this.openPreview(uri, vscode.window.activeTextEditor, true);
        }));
        //register BrighterScript transpile preview handler
        vscode.workspace.registerTextDocumentContentProvider(exports.FILE_SCHEME, this);
        //anytime the underlying file changed, tell vscode the preview needs to be regenerated
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (this.isWatchingUri(e.document.uri)) {
                let uri = this.getBsPreviewUri(e.document.uri);
                util_1.util.keyedDebounce(`'textdoc-change:${uri.fsPath}`, () => {
                    this.onDidChangeEmitter.fire(uri);
                }, 500);
            }
        });
        // sync the preview and the source doc on mouse click
        vscode.window.onDidChangeTextEditorSelection((e) => {
            let uri = e.textEditor.document.uri;
            //if this is one of our source files
            if (this.activePreviews[uri.fsPath]) {
                util_1.util.keyedDebounce(`sync-preview:${uri.fsPath}`, async () => {
                    await this.syncPreviewLocation(uri);
                }, BrighterScriptPreviewCommand.SELECTION_SYNC_DELAY);
                //this is the preview file
            }
            else if (this.getSourcePathFromPreviewUri(uri)) {
                //TODO enable this once we figure out the bugs
                // util.keyedDebounce(`sync-source:${uri.fsPath}`, async () => {
                //     this.syncSourceLocation(uri);
                // }, BrighterScriptPreviewCommand.SELECTION_SYNC_DELAY);
            }
        });
        //whenever the source file is closed, dispose of our preview
        vscode.workspace.onDidCloseTextDocument(async (e) => {
            var _a, _b, _c, _d;
            let activePreview = this.activePreviews[(_a = e === null || e === void 0 ? void 0 : e.uri) === null || _a === void 0 ? void 0 : _a.fsPath];
            if ((_c = (_b = activePreview === null || activePreview === void 0 ? void 0 : activePreview.previewEditor) === null || _b === void 0 ? void 0 : _b.document) === null || _c === void 0 ? void 0 : _c.uri) {
                //close the preview by showing it and then closing the active editor
                await vscode.window.showTextDocument(activePreview.previewEditor.document.uri, { preview: true, preserveFocus: false });
                await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
            }
            delete this.activePreviews[(_d = e === null || e === void 0 ? void 0 : e.uri) === null || _d === void 0 ? void 0 : _d.fsPath];
        });
    }
    /**
     * Synce a preview editor to the selected range in the source editor
     */
    async syncPreviewLocation(uri) {
        var _a;
        let activePreview = this.activePreviews[uri.fsPath];
        let sourceMap = activePreview === null || activePreview === void 0 ? void 0 : activePreview.sourceMap;
        let sourceSelection = (_a = activePreview === null || activePreview === void 0 ? void 0 : activePreview.sourceEditor) === null || _a === void 0 ? void 0 : _a.selection;
        if (sourceMap && sourceSelection) {
            try {
                let mappedRange = await source_map_1.SourceMapConsumer.with(sourceMap, null, (consumer) => {
                    let start = consumer.generatedPositionFor({
                        source: uri.fsPath,
                        line: sourceSelection.start.line + 1,
                        column: sourceSelection.start.character,
                        bias: source_map_1.SourceMapConsumer.LEAST_UPPER_BOUND
                    });
                    //if no location found, snap to the closest token
                    if (start.line === null || start.column === null) {
                        start = consumer.generatedPositionFor({
                            source: uri.fsPath,
                            line: sourceSelection.start.line + 1,
                            column: sourceSelection.start.character,
                            bias: source_map_1.SourceMapConsumer.GREATEST_LOWER_BOUND
                        });
                    }
                    let end = consumer.generatedPositionFor({
                        source: uri.fsPath,
                        line: sourceSelection.end.line + 1,
                        column: sourceSelection.end.character,
                        bias: source_map_1.SourceMapConsumer.LEAST_UPPER_BOUND
                    });
                    //if no location found, snap to the closest token
                    if (end.line === null || end.column === null) {
                        end = consumer.generatedPositionFor({
                            source: uri.fsPath,
                            line: sourceSelection.end.line + 1,
                            column: sourceSelection.end.character,
                            bias: source_map_1.SourceMapConsumer.GREATEST_LOWER_BOUND
                        });
                    }
                    return new vscode_1.Range(start.line - 1, start.column, end.line - 1, end.column);
                });
                //scroll the preview editor to the source's clicked location
                activePreview.previewEditor.revealRange(mappedRange, vscode.TextEditorRevealType.InCenter);
                activePreview.previewEditor.selection = new vscode.Selection(mappedRange.start, mappedRange.end);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    /**
     * Sync a source editor to the selection in the preview editor
     */
    async syncSourceLocation(uri) {
        var _a;
        let sourceFsPath = this.getSourcePathFromPreviewUri(uri);
        let activePreview = this.activePreviews[sourceFsPath];
        let previewSelection = (_a = activePreview === null || activePreview === void 0 ? void 0 : activePreview.previewEditor) === null || _a === void 0 ? void 0 : _a.selection;
        if ((activePreview === null || activePreview === void 0 ? void 0 : activePreview.sourceMap) && previewSelection) {
            try {
                let mappedRange = await source_map_1.SourceMapConsumer.with(activePreview.sourceMap, null, (consumer) => {
                    let start = consumer.originalPositionFor({
                        line: previewSelection.start.line + 1,
                        column: previewSelection.start.character,
                        bias: source_map_1.SourceMapConsumer.LEAST_UPPER_BOUND
                    });
                    if (start.line === null || start.column === null) {
                        start = consumer.originalPositionFor({
                            line: previewSelection.start.line + 1,
                            column: previewSelection.start.character,
                            bias: source_map_1.SourceMapConsumer.GREATEST_LOWER_BOUND
                        });
                    }
                    let end = consumer.originalPositionFor({
                        line: previewSelection.end.line + 1,
                        column: previewSelection.end.character,
                        bias: source_map_1.SourceMapConsumer.LEAST_UPPER_BOUND
                    });
                    if (end.line === null || end.column === null) {
                        end = consumer.originalPositionFor({
                            line: previewSelection.end.line + 1,
                            column: previewSelection.end.character,
                            bias: source_map_1.SourceMapConsumer.GREATEST_LOWER_BOUND
                        });
                    }
                    return new vscode_1.Range(start.line - 1, start.column, end.line - 1, end.column);
                });
                //scroll the preview editor to the source's clicked location
                activePreview.sourceEditor.revealRange(mappedRange, vscode.TextEditorRevealType.InCenter);
                activePreview.sourceEditor.selection = new vscode.Selection(mappedRange.start, mappedRange.end);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    isWatchingUri(uri) {
        if (
        //we are watching this file
        this.activePreviews[uri.fsPath] &&
            //the file is not our preview scheme (this prevents an infinite loop)
            uri.scheme !== exports.FILE_SCHEME) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * The handler for the command. Creates a custom URI so we can open it
     * with our TextDocumentContentProvider to show the transpiled code
     */
    async openPreview(uri, sourceEditor, showToSide) {
        let activePreview;
        let previewDoc;
        if (!this.activePreviews[uri.fsPath]) {
            activePreview = (this.activePreviews[uri.fsPath] = {});
            let customUri = this.getBsPreviewUri(uri);
            previewDoc = await vscode.workspace.openTextDocument(customUri);
        }
        else {
            activePreview = this.activePreviews[uri.fsPath];
            previewDoc = activePreview.previewEditor.document;
        }
        activePreview.sourceEditor = sourceEditor;
        activePreview.previewEditor = await vscode.window.showTextDocument(previewDoc, {
            preview: true,
            preserveFocus: true,
            viewColumn: showToSide ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active
        });
    }
    async provideTextDocumentContent(uri) {
        let fsPath = this.getSourcePathFromPreviewUri(uri);
        let result = await LanguageServerManager_1.languageServerManager.getTranspiledFileContents(fsPath);
        this.activePreviews[fsPath].sourceMap = result.map;
        return result.code;
    }
    /**
     * Get the fsPath from the uri. this handles both `file` and `bs-preview` schemes
     */
    getSourcePathFromPreviewUri(uri) {
        if (uri.scheme === 'file') {
            return uri.fsPath;
        }
        else if (uri.scheme === exports.FILE_SCHEME) {
            let parts = querystring.parse(uri.query);
            return parts.fsPath;
        }
        else {
            throw new Error('Cannot determine fsPath for uri: ' + uri.toString());
        }
    }
    /**
     * Given a uri, compute the bs-preview URI
     */
    getBsPreviewUri(uri) {
        let fsPath = uri.fsPath;
        return vscode_1.Uri.parse(`${exports.FILE_SCHEME}:(Transpiled) ${path.basename(fsPath)}?fsPath=${fsPath}`);
    }
}
exports.BrighterScriptPreviewCommand = BrighterScriptPreviewCommand;
BrighterScriptPreviewCommand.SELECTION_SYNC_DELAY = 300;
exports.brighterScriptPreviewCommand = new BrighterScriptPreviewCommand();
//# sourceMappingURL=BrighterScriptPreviewCommand.js.map