"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolInformationRepository = exports.BrightScriptWorkspaceSymbolProvider = void 0;
const vscode = require("vscode");
class BrightScriptWorkspaceSymbolProvider {
    constructor(symbolInformationRepository) {
        this.repo = symbolInformationRepository;
    }
    provideWorkspaceSymbols(query, token) {
        return this.repo.sync().then(() => Array.from(this.repo.find(query)));
    }
}
exports.BrightScriptWorkspaceSymbolProvider = BrightScriptWorkspaceSymbolProvider;
class SymbolInformationRepository {
    constructor(provider) {
        this.provider = provider;
        this.cache = new Map();
        this.declarationProvider = provider;
        provider.onDidChange((e) => {
            this.cache.set(e.uri.fsPath, e.decls
                .map((d) => this.declarationProvider.declToSymbolInformation(e.uri, d)));
        });
        provider.onDidDelete((e) => {
            this.cache.delete(e.uri.fsPath);
        });
        provider.onDidReset((e) => {
            this.cache.clear();
        });
    }
    sync() {
        return this.provider.sync();
    }
    *find(query) {
        const pattern = this.compileQuery(query);
        if (pattern === undefined) {
            return;
        }
        const fresh = new Set();
        for (const doc of vscode.workspace.textDocuments) {
            if (!doc.isDirty) {
                continue;
            }
            if (!this.cache.has(doc.uri.fsPath)) {
                continue;
            }
            fresh.add(doc.uri.fsPath);
            yield* this.findInDocument(doc, pattern);
        }
        for (const [path, symbols] of this.cache.entries()) {
            if (fresh.has(path)) {
                continue;
            }
            yield* symbols.filter((s) => pattern.test(s.name));
        }
    }
    compileQuery(query) {
        if (query.length === 0) {
            return;
        }
        const chars = Array.from(query).map((c) => {
            const uc = c.toUpperCase();
            const lc = c.toLowerCase();
            return uc === lc ? c : `[${uc}${lc}]`;
        });
        return new RegExp(chars.join('.*'));
    }
    findInDocument(document, pattern) {
        return this.declarationProvider.readDeclarations(document.uri, document.getText())
            .filter((d) => pattern.test(d.name))
            .map((d) => this.declarationProvider.declToSymbolInformation(document.uri, d));
    }
}
exports.SymbolInformationRepository = SymbolInformationRepository;
//# sourceMappingURL=SymbolInformationRepository.js.map