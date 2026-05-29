"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class BrightScriptSignatureHelpProvider {
    constructor(provider) {
        this.definitionRepo = provider;
    }
    provideSignatureHelp(document, position, token) {
        //TODO - use AST/Parse tree to get the position of a symbol to our left
        //1. get first bracket to our left, - then get the symbol before that..
        //really crude crappy parser..
        //TODO this is whack - it's not even LTR ugh..
        let bracketCounts = { normal: 0, square: 0, curly: 0 };
        let commaCount = 0;
        let index = position.character;
        let line = document.getText(new vscode_1.Range(position.line, 0, position.line, position.character));
        let isArgStartFound = false;
        while (index >= 0) {
            if (isArgStartFound) {
                if (line.charAt(index) !== ' ') {
                    break;
                }
            }
            else {
                if (line.charAt(index) === ')') {
                    bracketCounts.normal++;
                }
                if (line.charAt(index) === ']') {
                    bracketCounts.square++;
                }
                if (line.charAt(index) === '}') {
                    bracketCounts.curly++;
                }
                if (line.charAt(index) === ',' && bracketCounts.normal <= 0 && bracketCounts.curly <= 0 && bracketCounts.square <= 0) {
                    commaCount++;
                }
                if (line.charAt(index) === '(') {
                    if (bracketCounts.normal === 0) {
                        isArgStartFound = true;
                    }
                    else {
                        bracketCounts.normal--;
                    }
                }
                if (line.charAt(index) === '[') {
                    bracketCounts.square--;
                }
                if (line.charAt(index) === '{') {
                    bracketCounts.curly--;
                }
            }
            index--;
        }
        if (index === 0) {
            return undefined;
        }
        //count number of commas from defintion start, to current pos
        const adjustedPosition = new vscode_1.Position(position.line, index - 1);
        let definition = this.definitionRepo.findDefinition(document, adjustedPosition).next();
        if (definition) {
            let signatureHelp = new vscode_1.SignatureHelp();
            let params = [];
            let paramNames = [];
            for (const param of definition.value.params) {
                let paramName = param.trim();
                let infoText = '';
                let infoIndex = param.indexOf('=');
                let hasDefault = infoIndex !== -1;
                if (infoIndex === -1) {
                    infoIndex = param.indexOf(' as');
                }
                if (infoIndex !== -1) {
                    paramName = param.substring(0, infoIndex).trim();
                    infoText = param.substring(infoIndex).trim();
                    if (hasDefault) {
                        infoText = infoText.replace('=', 'default:');
                    }
                }
                paramNames.push(paramName);
                params.push(new vscode_1.ParameterInformation(paramName, infoText));
            }
            let signatureInfo = new vscode_1.SignatureInformation(definition.value.name + '(' + paramNames.join(', ') + ')');
            signatureInfo.parameters = params;
            signatureHelp.signatures.push(signatureInfo);
            signatureHelp.activeParameter = commaCount;
            signatureHelp.activeSignature = 0;
            return signatureHelp;
        }
        return undefined;
    }
}
exports.default = BrightScriptSignatureHelpProvider;
//# sourceMappingURL=BrightScriptSignatureHelpProvider.js.map