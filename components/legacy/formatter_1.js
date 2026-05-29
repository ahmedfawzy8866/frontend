"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const brighterscript_formatter_1 = require("brighterscript-formatter");
const util_1 = require("./util");
const vscode_1 = require("vscode");
class Formatter {
    async provideDocumentRangeFormattingEdits(document, range, options) {
        //TODO is there anything we can to do to better detect when the same file is used in multiple workspaces?
        //vscode seems to pick the lowest workspace (or perhaps the last workspace?)
        const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(document.uri);
        try {
            let userSettingsOptions = util_1.util.getConfiguration('brightscript.format', document.uri);
            let bsfmtPath = userSettingsOptions.get('bsfmtPath');
            let bsfmtOptions = new brighterscript_formatter_1.Runner().getBsfmtOptions({
                cwd: workspaceFolder.uri.fsPath,
                //we just want bsfmt options...but files is mandatory. Don't worry, we won't actually use it.
                files: [],
                //if the user specified a custom config file path, use it
                bsfmtPath: bsfmtPath
            });
            let text = document.getText();
            let formatter = new brighterscript_formatter_1.Formatter();
            let formattedText = formatter.format(text, {
                //if we found bsfmt.json options, use ONLY those. Otherwise, use any options found from user/workspace settings
                ...(bsfmtOptions !== null && bsfmtOptions !== void 0 ? bsfmtOptions : userSettingsOptions),
                indentSpaceCount: options.tabSize,
                indentStyle: options.insertSpaces ? 'spaces' : 'tabs',
                formatMultiLineObjectsAndArrays: false
            });
            let edits = this.getEditChunks(document, formattedText, range);
            return edits;
        }
        catch (e) {
            await vscode_1.window.showErrorMessage(e.message, e.stack.split('\n')[0]);
        }
    }
    getEditChunks(document, formattedText, range) {
        let lines = formattedText === null || formattedText === void 0 ? void 0 : formattedText.split(/\r?\n/g);
        //make an edit per line of the doc
        let edits = [];
        for (let lineNumber = range.start.line; lineNumber <= range.end.line; lineNumber++) {
            let formattedLine = lines[lineNumber];
            let docLine = document.lineAt(lineNumber);
            let range = new vscode_1.Range(new vscode_1.Position(lineNumber, 0), new vscode_1.Position(lineNumber, docLine.text.length));
            range = document.validateRange(range);
            let edit = vscode_1.TextEdit.replace(range, formattedLine);
            edits.push(edit);
        }
        return edits;
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map