"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticManager = void 0;
const vscode = require("vscode");
class DiagnosticManager {
    constructor() {
        this.collection = vscode.languages.createDiagnosticCollection('BrightScript');
    }
    clear() {
        this.collection.clear();
    }
    dispose() {
        var _a, _b;
        (_b = (_a = this.collection) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    async addDiagnosticForError(path, diagnostics) {
        let documentUri;
        let uri = vscode.Uri.file(path);
        let doc = await vscode.workspace.openTextDocument(uri);
        if (doc !== undefined) {
            documentUri = doc.uri;
        }
        if (documentUri !== undefined) {
            let result = [];
            for (const diagnostic of diagnostics) {
                result.push({
                    code: diagnostic.code,
                    message: diagnostic.message,
                    source: diagnostic.source,
                    //the DiagnosticSeverity.Error from vscode-languageserver-types starts at 1, but vscode.DiagnosticSeverity.Error starts at 0. So subtract 1 to make them compatible
                    severity: diagnostic.severity - 1,
                    tags: diagnostic.tags,
                    range: new vscode.Range(new vscode.Position(diagnostic.range.start.line, diagnostic.range.start.character), new vscode.Position(diagnostic.range.end.line, diagnostic.range.end.character))
                });
            }
            this.collection.set(documentUri, result);
        }
    }
}
exports.DiagnosticManager = DiagnosticManager;
//# sourceMappingURL=DiagnosticManager.js.map