"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightScriptReferenceProvider = void 0;
const fs = require("fs");
const iconv = require("iconv-lite");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const DeclarationProvider_1 = require("./DeclarationProvider");
class BrightScriptReferenceProvider {
    constructor() {
        this.encoding = new DeclarationProvider_1.WorkspaceEncoding();
    }
    async provideReferences(document, position, options, token) {
        return this.find(document, position);
    }
    async find(document, position) {
        const excludes = (0, DeclarationProvider_1.getExcludeGlob)();
        const word = this.getWord(document, position).toLowerCase();
        let locations = [];
        for (const uri of await vscode.workspace.findFiles('**/*.brs', excludes)) {
            const input = await new Promise((resolve, reject) => {
                fs.readFile(uri.fsPath, (err, data) => {
                    if (err) {
                        if (typeof err === 'object' && err.code === 'ENOENT') {
                            resolve(undefined);
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        resolve(iconv.decode(data, this.encoding.find(uri.fsPath)));
                    }
                });
            });
            if (input !== undefined) {
                locations = locations.concat(this.findWordInFile(uri, input, word));
            }
        }
        return locations;
    }
    findWordInFile(uri, input, word) {
        let locations = [];
        let searchTerm = word;
        let regex = new RegExp(searchTerm, 'ig');
        for (const [line, text] of (0, DeclarationProvider_1.iterlines)(input)) {
            let result;
            while ((result = regex.exec(text))) {
                locations.push(new vscode_1.Location(uri, new vscode_1.Position(line, result.index)));
            }
        }
        return locations;
    }
    getIndicesOf(searchStr, str, caseSensitive) {
        let searchStrLen = searchStr.length;
        if (searchStrLen === 0) {
            return [];
        }
        let startIndex = 0;
        let index = 0;
        let indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }
    getWord(document, position) {
        const range = document.getWordRangeAtPosition(position, /[^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+/);
        if (range !== undefined) {
            return document.getText(range);
        }
    }
}
exports.BrightScriptReferenceProvider = BrightScriptReferenceProvider;
//# sourceMappingURL=BrightScriptReferenceProvider.js.map