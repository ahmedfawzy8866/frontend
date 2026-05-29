"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightScriptDeclaration = void 0;
const vscode_1 = require("vscode");
const vscode = require("vscode");
class BrightScriptDeclaration {
    constructor(name, kind, container, params, nameRange, bodyRange, uri) {
        this.name = name;
        this.kind = kind;
        this.container = container;
        this.params = params;
        this.nameRange = nameRange;
        this.bodyRange = bodyRange;
        this.uri = uri;
        this.isGlobal = true;
    }
    static fromUri(uri) {
        let documentName = uri.path;
        return new BrightScriptDeclaration(documentName, vscode.SymbolKind.File, undefined, [], new vscode.Range(0, 0, 0, 0), new vscode.Range(0, 0, 0, 0), uri);
    }
    get containerName() {
        var _a;
        return (_a = this.container) === null || _a === void 0 ? void 0 : _a.name;
    }
    visible(position) {
        return true;
        // return this.container === undefined || this.container.bodyRange.contains(position);
    }
    getDocumentUri() {
        if (this.kind === vscode_1.SymbolKind.File) {
            return this.uri;
        }
        else if (this.container) {
            return this.container.getDocumentUri();
        }
        else {
            console.log('getDocumentUri: ERROR could not find container for symbol' + this);
        }
    }
    getLocation() {
        return new vscode_1.Location(this.getDocumentUri(), this.nameRange);
    }
}
exports.BrightScriptDeclaration = BrightScriptDeclaration;
//# sourceMappingURL=BrightScriptDeclaration.js.map