"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightScriptDocumentSymbolProvider = void 0;
class BrightScriptDocumentSymbolProvider {
    constructor(declarationProvider) {
        this.declarationProvider = declarationProvider;
    }
    provideDocumentSymbols(document, token) {
        return this.readSymbolInformations(document.uri, document.getText());
    }
    readSymbolInformations(uri, input) {
        return this.declarationProvider.readDeclarations(uri, input).map((d) => this.declarationProvider.declToSymbolInformation(uri, d));
    }
}
exports.BrightScriptDocumentSymbolProvider = BrightScriptDocumentSymbolProvider;
//# sourceMappingURL=BrightScriptDocumentSymbolProvider.js.map