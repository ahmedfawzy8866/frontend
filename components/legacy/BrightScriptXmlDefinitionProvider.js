"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const BrightScriptDeclaration_1 = require("./BrightScriptDeclaration");
const BrightScriptFileUtils_1 = require("./BrightScriptFileUtils");
const DeclarationProvider_1 = require("./DeclarationProvider");
const XmlUtils_1 = require("./XmlUtils");
class BrightScriptXmlDefinitionProvider {
    constructor(repo) {
        this.repo = repo;
        this.fileUtils = new BrightScriptFileUtils_1.default();
        this.xmlUtils = new XmlUtils_1.XmlUtils();
    }
    async provideDefinition(document, position, token) {
        //1. if it's not an xml doc, return empty
        if (!document.fileName.toLowerCase().endsWith('.xml') || !document.getText()) {
            return [];
        }
        let definitions = [];
        //2. if it's an xml element, jump to matching doc
        let xmlWordType = this.xmlUtils.getXmlWordType(document, position, token);
        let word = this.xmlUtils.getWord(document, position, xmlWordType).toLowerCase();
        await this.repo.sync();
        switch (xmlWordType) {
            case XmlUtils_1.XmlWordType.Tag:
                definitions = await this.getXmlFileMatchingWord(word);
                break;
            case XmlUtils_1.XmlWordType.AttributeValue: {
                const attrName = this.xmlUtils.getAttributeNameAtPosition(document, position);
                if ((attrName === null || attrName === void 0 ? void 0 : attrName.toLowerCase()) === 'extends') {
                    //jump to the parent component's XML file
                    definitions = await this.getXmlFileMatchingWord(word);
                }
                else if (word.endsWith('.brs')) {
                    //assume it's a document
                    definitions = await this.getSymbolForBrsFile(word);
                }
                else {
                    //assume it's a symbol in our codebehind file
                    definitions = await this.getBrsSymbolsMatchingWord(document, position, word);
                }
                break;
            }
            default:
                break;
        }
        return definitions;
    }
    async getXmlFileMatchingWord(word) {
        let definitions = [];
        const excludes = (0, DeclarationProvider_1.getExcludeGlob)();
        for (const uri of await vscode.workspace.findFiles('**/*.xml', excludes)) {
            let path = uri.path.toLowerCase();
            if (path.includes(word) && path.endsWith('.xml')) {
                let definition = BrightScriptDeclaration_1.BrightScriptDeclaration.fromUri(uri);
                definitions.push(definition.getLocation());
                if (path.endsWith(word + '.xml')) {
                    definitions = [definition.getLocation()];
                    break;
                }
            }
        }
        return definitions;
    }
    async getBrsSymbolsMatchingWord(document, position, word) {
        let alternateFilename = this.fileUtils.getAlternateFileName(document.fileName);
        let definitions = [];
        if (alternateFilename) {
            let uri = vscode.Uri.file(alternateFilename);
            let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
            if (doc) {
                for (const d of this.repo.findDefinitionInDocument(doc, word)) {
                    definitions.push(d.getLocation());
                }
            }
        }
        return definitions;
    }
    async getSymbolForBrsFile(word) {
        let definitions = [];
        for (const def of await this.repo.findDefinitionForBrsDocument(word)) {
            definitions.push(def.getLocation());
        }
        return definitions;
    }
}
exports.default = BrightScriptXmlDefinitionProvider;
//# sourceMappingURL=BrightScriptXmlDefinitionProvider.js.map