"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExcludeGlob = exports.DeclarationProvider = exports.DeclarationDeleteEvent = exports.DeclarationChangeEvent = exports.WorkspaceEncoding = exports.iterlines = void 0;
const fs = require("fs-extra");
const iconv = require("iconv-lite");
const vscode = require("vscode");
const path = require("path");
const vscode_1 = require("vscode");
const BrightScriptDeclaration_1 = require("./BrightScriptDeclaration");
const util_1 = require("./util");
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREDIT WHERE CREDIT IS DUE
// georgejecook: I lifted most of the declaration and symbol work from sasami's era basic implementation
// at https://github.com/sasami/vscode-erabasic and hacked it in with some basic changes
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function* iterlines(input) {
    const lines = input.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        const text = lines[i];
        if (/^\s*(?:$|;(?![!#];))/.test(text)) {
            continue;
        }
        yield [i, text];
    }
}
exports.iterlines = iterlines;
class WorkspaceEncoding {
    constructor() {
        this.reset();
    }
    find(path) {
        return this.encoding.find((v) => path.startsWith(v[0]))[1];
    }
    reset() {
        var _a;
        this.encoding = [];
        for (const folder of (_a = vscode.workspace.workspaceFolders) !== null && _a !== void 0 ? _a : []) {
            this.encoding.push([folder.uri.fsPath, this.getConfiguration(folder.uri)]);
        }
    }
    getConfiguration(uri) {
        const encoding = util_1.util.getConfiguration('files', uri).get('encoding', 'utf8');
        if (encoding === 'utf8bom') {
            return 'utf8'; // iconv-lite removes bom by default when decoding, so this is fine
        }
        return encoding;
    }
}
exports.WorkspaceEncoding = WorkspaceEncoding;
class DeclarationChangeEvent {
    constructor(uri, decls) {
        this.uri = uri;
        this.decls = decls;
    }
}
exports.DeclarationChangeEvent = DeclarationChangeEvent;
class DeclarationDeleteEvent {
    constructor(uri) {
        this.uri = uri;
    }
}
exports.DeclarationDeleteEvent = DeclarationDeleteEvent;
class DeclarationProvider {
    constructor() {
        this.cache = new Map();
        this.fullscan = true;
        this.dirty = new Map();
        this.fileNamespaces = new Map();
        this.fileInterfaces = new Map();
        this.fileEnums = new Map();
        this.fileClasses = new Map();
        this.allNamespaces = new Map();
        this.allClasses = new Map();
        this.allEnums = new Map();
        this.allInterfaces = new Map();
        this.encoding = new WorkspaceEncoding();
        this.onDidChangeEmitter = new vscode_1.EventEmitter();
        this.onDidDeleteEmitter = new vscode_1.EventEmitter();
        this.onDidResetEmitter = new vscode_1.EventEmitter();
        const subscriptions = [];
        const watcher = vscode.workspace.createFileSystemWatcher('**/*.{brs,bs}');
        watcher.onDidCreate(this.onDidChangeFile, this);
        watcher.onDidChange(this.onDidChangeFile, this);
        watcher.onDidDelete(this.onDidDeleteFile, this);
        subscriptions.push(watcher);
        vscode.workspace.onDidChangeConfiguration(this.onDidChangeWorkspace, this, subscriptions);
        vscode.workspace.onDidChangeWorkspaceFolders(this.onDidChangeWorkspace, this, subscriptions);
        this.disposable = vscode_1.Disposable.from(...subscriptions);
        void this.flush();
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    get onDidDelete() {
        return this.onDidDeleteEmitter.event;
    }
    get onDidReset() {
        return this.onDidResetEmitter.event;
    }
    async sync() {
        if (this.syncing === undefined) {
            this.syncing = this.flush().then(() => {
                this.syncing = undefined;
            });
        }
        return this.syncing;
    }
    dispose() {
        this.disposable.dispose();
    }
    onDidChangeFile(uri) {
        this.dirty.set(uri.fsPath, uri);
    }
    onDidDeleteFile(uri) {
        this.dirty.delete(uri.fsPath);
        this.onDidDeleteEmitter.fire(new DeclarationDeleteEvent(uri));
    }
    onDidChangeWorkspace() {
        this.fullscan = true;
        this.dirty.clear();
        this.encoding.reset();
        this.onDidResetEmitter.fire();
    }
    async flush() {
        const excludes = getExcludeGlob();
        if (this.fullscan) {
            this.fullscan = false;
            for (const uri of await vscode.workspace.findFiles('**/*.{brs,bs}', excludes)) {
                this.dirty.set(uri.fsPath, uri);
            }
        }
        if (this.dirty.size === 0) {
            return;
        }
        for (const [path, uri] of Array.from(this.dirty)) {
            const input = await new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        if (typeof err === 'object' && err.code === 'ENOENT') {
                            resolve(null);
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        resolve(iconv.decode(data, this.encoding.find(path)));
                    }
                });
            });
            if (input === undefined) {
                this.dirty.delete(path);
                this.onDidDeleteEmitter.fire(new DeclarationDeleteEvent(uri));
                continue;
            }
            if (this.dirty.delete(path)) {
                this.onDidChangeEmitter.fire(new DeclarationChangeEvent(uri, this.readDeclarations(uri, input)));
            }
        }
    }
    readDeclarations(uri, input) {
        const uriPath = util_1.util.normalizeFileScheme(uri.toString());
        const outDir = util_1.util.normalizeFileScheme(path.join(vscode.workspace.getWorkspaceFolder(uri).uri.toString(), 'out'));
        // Prevents results in the out directory from being returned
        if (uriPath.startsWith(outDir)) {
            return [];
        }
        const container = BrightScriptDeclaration_1.BrightScriptDeclaration.fromUri(uri);
        const symbols = [];
        let currentFunction;
        let funcEndLine;
        let funcEndChar;
        let mDefs = {};
        let oldNamespaces = this.fileNamespaces.get(uri);
        if (oldNamespaces) {
            for (let key of oldNamespaces.keys()) {
                let ns = this.allNamespaces.get(key);
                if (ns && ns.uri === uri) {
                    this.allNamespaces.delete(key);
                }
            }
        }
        this.fileNamespaces.delete(uri);
        let oldEnums = this.fileEnums.get(uri);
        if (oldEnums) {
            for (let key of oldEnums.keys()) {
                let ns = this.allEnums.get(key);
                if (ns && ns.uri === uri) {
                    this.allEnums.delete(key);
                }
            }
        }
        this.fileEnums.delete(uri);
        let oldInterfaces = this.fileInterfaces.get(uri);
        if (oldInterfaces) {
            for (let key of oldInterfaces.keys()) {
                let ns = this.allInterfaces.get(key);
                if (ns && ns.uri === uri) {
                    this.allInterfaces.delete(key);
                }
            }
        }
        this.fileInterfaces.delete(uri);
        let oldClasses = this.fileClasses.get(uri);
        if (oldClasses) {
            for (let key of oldClasses.keys()) {
                let clazz = this.allClasses.get(key);
                if (clazz && clazz.uri === uri) {
                    this.allClasses.delete(key);
                }
            }
        }
        this.fileClasses.delete(uri);
        let namespaces = new Set();
        let classes = new Set();
        let namespaceSymbol;
        let classSymbol;
        let enums = new Set();
        let interfaces = new Set();
        let interfaceSymbol;
        let enumSymbol;
        for (const [line, text] of iterlines(input)) {
            // console.log("" + line + ": " + text);
            funcEndLine = line;
            funcEndChar = text.length;
            //FUNCTION START
            let match = /^\s*(?:public|protected|private)*\s*(?:override)*\s*(?:function|sub)\s+(.*[^\(])\s*\((.*)\)/i.exec(text);
            // console.log("match " + match);
            if (match !== null) {
                // function has started
                if (currentFunction !== undefined) {
                    currentFunction.bodyRange = currentFunction.bodyRange.with({ end: new vscode_1.Position(funcEndLine, funcEndChar) });
                }
                currentFunction = new BrightScriptDeclaration_1.BrightScriptDeclaration(match[1].trim(), match[1].trim().toLowerCase() === 'new' ? vscode_1.SymbolKind.Constructor : vscode_1.SymbolKind.Function, container, match[2].split(','), new vscode_1.Range(line, match[0].length - match[1].length - match[2].length - 2, line, match[0].length - 1), new vscode_1.Range(line, 0, line, text.length));
                symbols.push(currentFunction);
                if (classSymbol) {
                    currentFunction.container = classSymbol;
                }
                else if (namespaceSymbol) {
                    currentFunction.container = namespaceSymbol;
                }
                continue;
            }
            //FUNCTION END
            match = /^\s*(end)\s*(function|sub)/i.exec(text);
            if (match !== null) {
                // console.log("function END");
                if (currentFunction !== undefined) {
                    currentFunction.bodyRange = currentFunction.bodyRange.with({ end: new vscode_1.Position(funcEndLine, funcEndChar) });
                }
                continue;
            }
            // //FIELD
            match = /^(?!.*\()(?: |\t)*(public|private|protected)(?: |\t)*([a-z|\.|_]*).*((?: |\t)*=(?: |\t)*.*)*$/i.exec(text);
            if (match !== null) {
                // console.log("FOUND VAR " + match);
                const name = match[2].trim();
                if (mDefs[name] !== true) {
                    mDefs[name] = true;
                    let varSymbol = new BrightScriptDeclaration_1.BrightScriptDeclaration(name, vscode_1.SymbolKind.Field, container, undefined, new vscode_1.Range(line, match[0].length - match[1].length, line, match[0].length), new vscode_1.Range(line, 0, line, text.length));
                    // console.log('FOUND VAR ' + varSymbol.name);
                    symbols.push(varSymbol);
                    if (classSymbol) {
                        varSymbol.container = classSymbol;
                    }
                    else if (namespaceSymbol) {
                        varSymbol.container = namespaceSymbol;
                    }
                }
                continue;
            }
            //start namespace declaration
            match = /^(?: |\t)*namespace(?: |\t)*([a-z|\.|_]*).*$/i.exec(text);
            if (match !== null) {
                const name = match[1].trim();
                if (name) {
                    namespaceSymbol = new BrightScriptDeclaration_1.BrightScriptDeclaration(name, vscode_1.SymbolKind.Namespace, container, undefined, new vscode_1.Range(line, match[0].length - match[1].length, line, match[0].length), new vscode_1.Range(line, 0, line, text.length));
                    // console.log('FOUND NAMESPACES ' + namespaceSymbol.name);
                    symbols.push(namespaceSymbol);
                    namespaces.add(name.toLowerCase());
                }
            }
            //end namespace declaration
            match = /^(?: |\t)*end namespace.*$/i.exec(text);
            if (match !== null && namespaceSymbol) {
                namespaceSymbol = null;
            }
            //start enum declaration
            match = /^(?: |\t)*enum(?: |\t)*([a-z|\.|_]*).*$/i.exec(text);
            if (match !== null) {
                const name = match[1].trim();
                if (name) {
                    enumSymbol = new BrightScriptDeclaration_1.BrightScriptDeclaration(name, vscode_1.SymbolKind.Enum, container, undefined, new vscode_1.Range(line, match[0].length - match[1].length, line, match[0].length), new vscode_1.Range(line, 0, line, text.length));
                    // console.log('FOUND enumS ' + enumSymbol.name);
                    symbols.push(enumSymbol);
                    enums.add(name.toLowerCase());
                }
            }
            //end enum declaration
            match = /^(?: |\t)*end enum.*$/i.exec(text);
            if (match !== null && enumSymbol) {
                enumSymbol = null;
            }
            //start class declaration
            match = /(?:(class)\s+([a-z_][a-z0-9_]*))\s*(?:extends\s*([a-z_][a-z0-9_]+))*$/i.exec(text);
            if (match !== null) {
                const name = match[2].trim();
                if (name) {
                    classSymbol = new BrightScriptDeclaration_1.BrightScriptDeclaration(name, vscode_1.SymbolKind.Class, container, undefined, new vscode_1.Range(line, match[0].length - match[2].length, line, match[0].length), new vscode_1.Range(line, 0, line, text.length));
                    // console.log('FOUND CLASS ' + classSymbol.name);
                    symbols.push(classSymbol);
                    classes.add(name.toLowerCase());
                }
            }
            //start interface declaration
            match = /(?:(interface)\s+([a-z_][a-z0-9_]*))\s*(?:extends\s*([a-z_][a-z0-9_]+))*$/i.exec(text);
            if (match !== null) {
                const name = match[2].trim();
                if (name) {
                    interfaceSymbol = new BrightScriptDeclaration_1.BrightScriptDeclaration(name, vscode_1.SymbolKind.Interface, container, undefined, new vscode_1.Range(line, match[0].length - match[2].length, line, match[0].length), new vscode_1.Range(line, 0, line, text.length));
                    // console.log('FOUND interface ' + interfaceSymbol.name);
                    symbols.push(interfaceSymbol);
                    interfaces.add(name.toLowerCase());
                }
            }
        }
        this.fileNamespaces.set(uri, namespaces);
        this.fileClasses.set(uri, classes);
        this.cache.set(uri.fsPath, symbols);
        return symbols;
    }
    declToSymbolInformation(uri, decl) {
        return new vscode_1.SymbolInformation(decl.name, decl.kind, decl.containerName ? decl.containerName : decl.name, new vscode_1.Location(uri, decl.bodyRange));
    }
    getFunctionBeforeLine(filePath, lineNumber) {
        let symbols = this.cache.get(filePath);
        if (!symbols) {
            try {
                let uri = vscode.Uri.file(filePath);
                let decls = this.readDeclarations(uri, fs.readFileSync(filePath, 'utf8'));
                this.cache.set(filePath, decls);
                // if there was no match, then get the declarations now
                symbols = this.cache.get(filePath);
            }
            catch (e) {
                console.error(`error loading symbols for file ${filePath}: ${e.message}`);
            }
        }
        //try to load it now
        if (symbols) {
            const matchingMethods = symbols
                .filter((symbol) => symbol.kind === vscode_1.SymbolKind.Function && symbol.nameRange.start.line < lineNumber);
            return matchingMethods.length > 0 ? matchingMethods[matchingMethods.length - 1] : null;
        }
        return null;
    }
}
exports.DeclarationProvider = DeclarationProvider;
function getExcludeGlob() {
    const exclude = [
        ...Object.keys(util_1.util.getConfiguration('search').get('exclude') || {}),
        ...Object.keys(util_1.util.getConfiguration('files').get('exclude') || {})
    ].join(',');
    return `{${exclude}}`;
}
exports.getExcludeGlob = getExcludeGlob;
//# sourceMappingURL=DeclarationProvider.js.map