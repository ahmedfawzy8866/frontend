"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlUtils = exports.XmlWordType = void 0;
const vscode_1 = require("vscode");
var XmlWordType;
(function (XmlWordType) {
    XmlWordType[XmlWordType["Illegal"] = -1] = "Illegal";
    XmlWordType[XmlWordType["Tag"] = 0] = "Tag";
    XmlWordType[XmlWordType["AttributeValue"] = 1] = "AttributeValue";
    XmlWordType[XmlWordType["Attribute"] = 2] = "Attribute";
})(XmlWordType = exports.XmlWordType || (exports.XmlWordType = {}));
class XmlUtils {
    getXmlWordType(document, position, token) {
        if (this.isTagName(document, position) || this.isClosingTagName(document, position)) {
            return XmlWordType.Tag;
        }
        else if (this.isAttributeValue(document, position)) {
            return XmlWordType.AttributeValue;
        }
        else if (this.isAttribute(document, position)) {
            return XmlWordType.Attribute;
        }
        return XmlWordType.Illegal;
    }
    getWord(document, position, xmlWordType) {
        switch (xmlWordType) {
            case XmlWordType.Tag:
                //TODO end offset!
                if (this.isTagName(document, position)) {
                    return this.getTextWithOffsets(document, position);
                }
                else {
                    return this.getTextWithOffsets(document, position);
                }
                break;
            case XmlWordType.Attribute:
                return this.getTextWithOffsets(document, position);
                break;
            case XmlWordType.AttributeValue:
                return this.getTextWithOffsets(document, position, /[^\s\"]+/);
                break;
            default:
                break;
        }
    }
    isTagName(document, position) {
        return this.textBeforeWordEquals(document, position, '<');
    }
    isClosingTagName(document, position) {
        return this.textBeforeWordEquals(document, position, '</');
    }
    // Check if the cursor is about complete the value of an attribute.
    isAttributeValue(document, position) {
        let wordRange = document.getWordRangeAtPosition(position, /[^\s\"\']+/);
        let wordStart = wordRange ? wordRange.start : position;
        let wordEnd = wordRange ? wordRange.end : position;
        if (wordStart.character === 0 || wordEnd.character > document.lineAt(wordEnd.line).text.length - 1) {
            return false;
        }
        // TODO: This detection is very limited, only if the char before the word is ' or "
        let rangeBefore = new vscode_1.Range(wordStart.line, wordStart.character - 1, wordStart.line, wordStart.character);
        if (/'|"/.exec(document.getText(rangeBefore))) {
            return true;
        }
        return false;
    }
    isAttribute(document, position) {
        let wordRange = document.getWordRangeAtPosition(position);
        let wordStart = wordRange ? wordRange.start : position;
        let text = document.getText();
        return text.lastIndexOf('<', document.offsetAt(wordStart)) > text.lastIndexOf('>', document.offsetAt(wordStart));
    }
    textBeforeWordEquals(document, position, textToMatch) {
        let wordRange = document.getWordRangeAtPosition(position);
        let wordStart = wordRange ? wordRange.start : position;
        if (wordStart.character < textToMatch.length) {
            // Not enough room to match
            return false;
        }
        let charBeforeWord = document.getText(new vscode_1.Range(new vscode_1.Position(wordStart.line, wordStart.character - textToMatch.length), wordStart));
        return charBeforeWord === textToMatch;
    }
    getAttributeNameAtPosition(document, position) {
        const wordRange = document.getWordRangeAtPosition(position, /[^\s\"\']+/);
        if (!wordRange) {
            return undefined;
        }
        const offset = document.offsetAt(wordRange.start);
        const textBefore = document.getText().substring(0, offset);
        const match = /([\w.-]+)\s*=\s*["']$/.exec(textBefore);
        return match === null || match === void 0 ? void 0 : match[1];
    }
    getTextWithOffsets(document, position, wordRegex) {
        var _a, _b;
        let wordRange = document.getWordRangeAtPosition(position, wordRegex);
        let wordStart = wordRange ? wordRange.start : position;
        return document.getText(new vscode_1.Range(new vscode_1.Position(wordStart.line, wordStart.character), new vscode_1.Position((_a = wordRange === null || wordRange === void 0 ? void 0 : wordRange.end) === null || _a === void 0 ? void 0 : _a.line, (_b = wordRange === null || wordRange === void 0 ? void 0 : wordRange.end) === null || _b === void 0 ? void 0 : _b.character)));
    }
}
exports.XmlUtils = XmlUtils;
//# sourceMappingURL=XmlUtils.js.map