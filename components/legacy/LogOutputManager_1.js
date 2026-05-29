"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOutputManager = exports.LogLine = void 0;
const vscode = require("vscode");
const roku_debug_1 = require("roku-debug");
const LogDocumentLinkProvider_1 = require("./LogDocumentLinkProvider");
const util_1 = require("./util");
const fsExtra = require("fs-extra");
const strip_ansi_1 = require("strip-ansi");
class LogLine {
    constructor(text, isMustInclude) {
        this.text = text;
        this.isMustInclude = isMustInclude;
    }
}
exports.LogLine = LogLine;
class LogOutputManager {
    constructor(outputChannel, context, docLinkProvider, declarationProvider) {
        this.declarationProvider = declarationProvider;
        this.isNextBreakpointSkipped = false;
        this.outputChannel = outputChannel;
        this.docLinkProvider = docLinkProvider;
        this.loadConfigSettings();
        vscode.workspace.onDidChangeConfiguration((e) => {
            this.loadConfigSettings();
        });
        let subscriptions = context.subscriptions;
        this.includeRegex = null;
        this.logLevelRegex = null;
        this.excludeRegex = null;
        /**
         * we want to catch a few different link formats here:
         *  - pkg:/path/file.brs(LINE:COL)
         *  - file://path/file.bs:LINE
         *  - at line LINE of file pkg:/path/file.brs - this case can arise when the device reports various scenegraph errors such as fields not present, or texture size issues, etc
         */
        this.pkgRegex = /(?:\s*at line (\d*) of file )*(?:(pkg:\/|file:\/\/)(.*\.(bs|brs|xml)))[ \t]*(?:(?:(?:\()(\d+)(?:\:(\d+))?\)?)|(?:\:(\d+)?))*/;
        this.debugStartRegex = /BrightScript Micro Debugger\./ig;
        this.debugEndRegex = /Brightscript Debugger>/ig;
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.markLogOutput', () => {
            this.markOutput();
        }));
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.clearLogOutput', () => {
            this.clearOutput();
        }));
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.setOutputIncludeFilter', async () => {
            let entryText = await vscode.window.showInputBox({
                placeHolder: 'Enter log include regex',
                value: this.includeRegex ? this.includeRegex.source : ''
            });
            if (entryText || entryText === '') {
                this.setIncludeFilter(entryText);
            }
        }));
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.setOutputLogLevelFilter', async () => {
            let entryText = await vscode.window.showInputBox({
                placeHolder: 'Enter log level regex',
                value: this.logLevelRegex ? this.logLevelRegex.source : ''
            });
            if (entryText || entryText === '') {
                this.setLevelFilter(entryText);
            }
        }));
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.setOutputExcludeFilter', async () => {
            let entryText = await vscode.window.showInputBox({
                placeHolder: 'Enter log exclude regex',
                value: this.excludeRegex ? this.excludeRegex.source : ''
            });
            if (entryText || entryText === '') {
                this.setExcludeFilter(entryText);
            }
        }));
        this.clearOutput();
    }
    onDidStartDebugSession() {
        this.isInMicroDebugger = false;
        this.isNextBreakpointSkipped = false;
        if (this.isClearingConsoleOnChannelStart) {
            this.clearOutput();
        }
    }
    loadConfigSettings() {
        var _a, _b, _c, _d, _e;
        let config = util_1.util.getConfiguration('brightscript') || {};
        this.includeStackTraces = (_a = config.output) === null || _a === void 0 ? void 0 : _a.includeStackTraces;
        this.isFocusingOutputOnLaunch = ((_b = config === null || config === void 0 ? void 0 : config.output) === null || _b === void 0 ? void 0 : _b.focusOnLaunch) === false ? false : true;
        this.isClearingOutputOnLaunch = ((_c = config === null || config === void 0 ? void 0 : config.output) === null || _c === void 0 ? void 0 : _c.clearOnLaunch) === false ? false : true;
        this.isClearingConsoleOnChannelStart = ((_d = config === null || config === void 0 ? void 0 : config.output) === null || _d === void 0 ? void 0 : _d.clearConsoleOnChannelStart) === false ? false : true;
        this.hyperlinkFormat = (_e = config.output) === null || _e === void 0 ? void 0 : _e.hyperlinkFormat;
    }
    setLaunchConfig(launchConfig) {
        this.launchConfig = launchConfig;
    }
    async onDidReceiveDebugSessionCustomEvent(e) {
        if ((0, roku_debug_1.isRendezvousEvent)(e) || (0, roku_debug_1.isChanperfEvent)(e)) {
            // No need to handle rendezvous type events
            return;
        }
        if ((0, roku_debug_1.isLogOutputEvent)(e)) {
            const errorCodes = new Map([
                ['&h00', '(ERR_NF: next without for)'],
                ['&h02', '(ERR_SYNTAX): syntax error'],
                ['&h04', '(ERR_RG: return without gosub)'],
                ['&h06', '(ERR_OD: out of data (READ))'],
                ['&h08', '(ERR_FC: invalid parameter passed to function/array (e.g neg matrix dim or square root))'],
                ['&h0C', '(ERR_OUTOFMEM: out of memory)'],
                ['&h0E', '(ERR_MISSING_LN: missing line)'],
                ['&h10', '(ERR_BS: array subscript out of bounds)'],
                ['&h12', '(ERR_DD: attempted to redimension an array)'],
                ['&h14', '(ERR_DIV_ZERO: divide by zero error)'],
                ['&h18', '(ERR_TM: type mismatch (string / numeric operation mismatch))'],
                ['&h1A', '(ERR_OS: out of string space)'],
                ['&h1C', '(ERR_STRINGTOLONG: error parsing string to long)'],
                ['&h20', '(ERR_CN: continue not allowed)'],
                ['&h9F', '(ERR_INVALID_CONST_NAME: invalid constant name)'],
                ['&hA0', '(ERR_VAR_CANNOT_BE_SUBNAME: invalid subroutine name)'],
                ['&hA1', '(ERR_TOO_MANY_LABELS)'],
                ['&hA2', '(ERR_RO_NOT_FOUND:)'],
                ['&hA3', '(ERR_IF_TOO_LARGE:)'],
                ['&hA4', '(ERR_MISSING_INITILIZER:)'],
                ['&hA5', '(ERR_EXIT_FOR_NOT_IN_FOR: exit for statement found when not in for loop)'],
                ['&hA6', '(ERR_NOLONGER: no longer supported)'],
                ['&hA7', '(ERR_INVALID_TYPE: invalid typhe)'],
                ['&hA8', '(ERR_FUN_MUST_HAVE_RET_TYPE: function must have a return type)'],
                ['&hA9', '(ERR_RET_MUST_HAVE_VALUE: return statement must have a value)'],
                ['&hAA', '(ERR_RET_CANNOT_HAVE_VALUE: return statement cannot have a value)'],
                ['&hAB', '(ERR_FOREACH_INDEX_TM)'],
                ['&hAC', '(ERR_NOMAIN: no main function present)'],
                ['&hAD', '(ERR_SUB_DEFINED_TWICE: sub defined twice)'],
                ['&hAE', '(ERR_INTERNAL_LIMIT_EXCEDED: internal limit exceeded)'],
                ['&hAF', '(ERR_EXIT_WHILE_NOT_IN_WHILE: exit while statement found when not in while loop)'],
                ['&hB0', '(ERR_TOO_MANY_VAR: too many variables)'],
                ['&hB1', '(ERR_TOO_MANY_CONST: too many constants)'],
                ['&hB2', '(ERR_FUN_NOT_EXPECTED: function not expected)'],
                ['&hB3', '(ERR_UNTERMED_STRING: literal string does not have ending quote)'],
                ['&hB4', '(ERR_LABELTWICE: label defined more than once)'],
                ['&hB5', '(ERR_NO_BLOCK_END: no end to block)'],
                ['&hB6', '(ERR_FOR_NEXT_MISMATCH: variable on a NEXT does not match that for the FOR)'],
                ['&hB7', '(ERR_UNEXPECTED_EOF: end of string being compiled encountered when not expected (missing end of block usually))'],
                ['&hB8', '(ERR_NOMATCH: "match" statement did not match)'],
                ['&hB9', '(ERR_LOADFILE: error loading a file)'],
                ['&hBA', '(ERR_LNSEQ: line number sequence error)'],
                ['&hBB', '(ERR_NOLN: no line number found)'],
                ['&hBC', '(ERR_MISSING_ENDIF: end of code reached without finding ENDIF)'],
                ['&hBE', '(ERR_MISSING_ENDWHILE: while statement is missing a matching endwhile)'],
                ['&hBF', '(ERR_NW: endwhile with no while)'],
                ['&hDF', '(ERR_STACK_OVERFLOW): stack overflow error'],
                ['&hE0', '(ERR_NOTFUNOPABLE)'],
                ['&hE1', '(ERR_UNICODE_NOT_SUPPORTED: unicode character not supported)'],
                ['&hE2', '(ERR_VALUE_RETURN: return executed, and a value returned on the stack)'],
                ['&hE3', '(ERR_INVALID_NUM_ARRAY_IDX: invalid number of array indexes)'],
                ['&hE4', '(ERR_INVALID_LVALUE: invalid left side of expression)'],
                ['&hE5', '(ERR_MUST_HAVE_RETURN: function must have return value)'],
                ['&hE6', '(ERR_USE_OF_UNINIT_BRSUBREF: used a reference to SUB that is not initialized)'],
                ['&hE7', '(ERR_ARRAYNOTDIMMED: array has not been dimensioned)'],
                ['&hE8', '(ERR_TM2: non-numeric index to array)'],
                ['&hE9', '(ERR_USE_OF_UNINIT_VAR: illegal use of uninitialized var)'],
                ['&hEB', '(ERR_NOTYPEOP: operation on two typeless operands attempted)'],
                ['&hEC', '(ERR_RO4: . (dot) operator used on a variable that does not contain a legal object or interface reference)'],
                ['&hED', '(ERR_MUST_BE_STATIC: interface calls from type rotINTERFACE must be static)'],
                ['&hEE', '(ERR_NOTWAITABLE: tried to wait on a function that does not have MessagePort interface)'],
                ['&hEF', '(ERR_NOTPRINTABLE: non-printable value)'],
                ['&hF0', '(ERR_RVIG: function returns a value, but is ignored)'],
                ['&hF1', '(ERR_WRONG_NUM_PARAM: incorect number of function parameters)'],
                ['&hF2', '(ERR_TOO_MANY_PARAM: too many function parameters to handle)'],
                ['&hF3', '(ERR_RO3: interface not a member of object)'],
                ['&hF4', '(ERR_RO2: member function not found in object or interface)'],
                ['&hF5', '(ERR_RO1: function call does not have the right number of parameters)'],
                ['&hF6', '(ERR_RO0: bscNewComponent failed because object class not found)'],
                ['&hF7', '(ERR_STOP: stop statement executed)'],
                ['&hF8', '(ERR_BREAK: scriptBreak() called)'],
                ['&hF9', '(ERR_STACK_UNDER: nothing on stack to pop)'],
                ['&hFA', '(ERR_MISSING_PARN)'],
                ['&hFB', '(ERR_UNDEFINED_OP: an expression operator that we do not handle)'],
                ['&hFC', '(ERR_NORMAL_END: normal, but terminate execution.  END, shell "exit", window closed, etc'],
                ['&hFD', '(ERR_UNDEFINED_OPCD: an opcode that we do not handle )'],
                ['&hFE', '(ERR_INTERNAL: a condition that should not occur did)'],
                ['&hFF', '(ERR_OKAY)']
            ]);
            // need to upgrade this includes statement to include a full hex regex
            if (e.body.line.includes('&h')) {
                const regexGlobal = /&h[0-9A-F][0-9A-F]/g;
                let regexMatches;
                while ((regexMatches = regexGlobal.exec(e.body.line)) !== null) {
                    const regexMatch = regexMatches[0];
                    if (errorCodes.has(regexMatch)) {
                        const errorDescription = errorCodes.get(regexMatch);
                        e.body.line = e.body.line.replace(regexMatch, regexMatch + ' ' + errorDescription + ' ');
                    }
                }
            }
            this.appendLine(e.body.line);
        }
        else if ((0, roku_debug_1.isLaunchStartEvent)(e)) {
            this.isInMicroDebugger = false;
            this.isNextBreakpointSkipped = false;
            if (this.isFocusingOutputOnLaunch) {
                await vscode.commands.executeCommand('workbench.action.focusPanel');
                this.outputChannel.show();
            }
            if (this.isClearingOutputOnLaunch) {
                this.clearOutput();
            }
        }
    }
    /**
     * Log output methods
     */
    appendLine(lineText, mustInclude = false) {
        let lines = lineText.split(/\r?\n/g);
        // Remove the last line if it's empty as a result of a trailing newline
        if (lines[lines.length - 1] === '') {
            lines.pop();
        }
        for (let line of lines) {
            if (line !== '') {
                if (!this.includeStackTraces) {
                    // filter out debugger noise
                    if (this.debugStartRegex.exec(line)) {
                        console.log('start MicroDebugger block');
                        this.isInMicroDebugger = true;
                        this.isNextBreakpointSkipped = false;
                        line = 'Pausing for a breakpoint...';
                    }
                    else if (this.isInMicroDebugger && (this.debugEndRegex.exec(line))) {
                        console.log('ended MicroDebugger block');
                        this.isInMicroDebugger = false;
                        if (this.isNextBreakpointSkipped) {
                            line = '\n**Was a bogus breakpoint** Skipping!\n';
                        }
                        else {
                            line = null;
                        }
                    }
                    else if (this.isInMicroDebugger) {
                        if (this.launchConfig.enableDebuggerAutoRecovery && line.startsWith('Break in ')) {
                            console.log('this block is a break: skipping it');
                            this.isNextBreakpointSkipped = true;
                        }
                        line = null;
                    }
                }
            }
            if (typeof line === 'string') {
                // Strip ANSI color codes
                line = (0, strip_ansi_1.default)(line);
                const logLine = new LogLine(line, mustInclude);
                this.allLogLines.push(logLine);
                if (this.shouldLineBeShown(logLine)) {
                    this.allLogLines.push(logLine);
                    this.addLogLineToOutput(logLine);
                    this.writeLogLineToLogfile(logLine.text);
                }
            }
        }
    }
    writeLogLineToLogfile(text) {
        var _a;
        if ((_a = this.launchConfig) === null || _a === void 0 ? void 0 : _a.logfilePath) {
            fsExtra.appendFileSync(this.launchConfig.logfilePath, text + '\n');
        }
    }
    addLogLineToOutput(logLine) {
        const logLineNumber = this.displayedLogLines.length;
        if (this.shouldLineBeShown(logLine)) {
            this.displayedLogLines.push(logLine);
            let match = this.pkgRegex.exec(logLine.text);
            if (match) {
                const isFilePath = match[2] === 'file://';
                const path = isFilePath ? match[3] : 'pkg:/' + match[3];
                let lineNumber = match[1] ? Number(match[1]) : undefined;
                if (!lineNumber) {
                    if (isFilePath) {
                        lineNumber = Number(match[7]);
                        if (isNaN(lineNumber)) {
                            lineNumber = Number(match[5]);
                        }
                    }
                    else {
                        lineNumber = Number(match[5]);
                    }
                }
                const filename = this.getFilename(path);
                const ext = `.${match[4]}`.toLowerCase();
                let customText = this.getCustomLogText(path, filename, ext, Number(lineNumber), logLineNumber, isFilePath);
                const customLink = new LogDocumentLinkProvider_1.CustomDocumentLink(logLineNumber, match.index, customText.length, path, lineNumber, filename);
                if (isFilePath) {
                    this.docLinkProvider.addCustomFileLink(customLink);
                }
                else {
                    this.docLinkProvider.addCustomPkgLink(customLink);
                }
                let logText = logLine.text.substring(0, match.index) + customText + logLine.text.substring(match.index + match[0].length);
                this.outputChannel.appendLine(logText);
            }
            else {
                this.outputChannel.appendLine(logLine.text);
            }
        }
    }
    getFilename(pkgPath) {
        const parts = pkgPath.split('/');
        let name = parts.length > 0 ? parts[parts.length - 1] : pkgPath;
        if (name.toLowerCase().endsWith('.xml') || name.toLowerCase().endsWith('.brs')) {
            name = name.substring(0, name.length - 4);
        }
        else if (name.toLowerCase().endsWith('.bs')) {
            name = name.substring(0, name.length - 3);
        }
        return name;
    }
    getCustomLogText(pkgPath, filename, extension, lineNumber, logLineNumber, isFilePath) {
        switch (this.hyperlinkFormat) {
            case 'Full':
                return pkgPath + `(${lineNumber})`;
                break;
            case 'Short':
                return `#${logLineNumber}`;
                break;
            case 'Hidden':
                return ' ';
                break;
            case 'Filename':
                return `${filename}${extension}(${lineNumber})`;
                break;
            default:
                if (extension === '.brs' || extension === '.bs') {
                    const methodName = this.getMethodName(pkgPath, lineNumber, isFilePath);
                    if (methodName) {
                        return `${filename}.${methodName}(${lineNumber})`;
                    }
                }
                return pkgPath + `(${lineNumber})`;
                break;
        }
    }
    getMethodName(path, lineNumber, isFilePath) {
        let fsPath = isFilePath ? path : this.docLinkProvider.convertPkgPathToFsPath(path);
        const method = fsPath ? this.declarationProvider.getFunctionBeforeLine(fsPath, lineNumber) : null;
        return method ? method.name : null;
    }
    shouldLineBeShown(logLine) {
        var _a;
        //filter excluded lines
        if ((_a = this.excludeRegex) === null || _a === void 0 ? void 0 : _a.test(logLine.text)) {
            return false;
        }
        //once past the exclude filter, always keep "mustInclude" lines
        if (logLine.isMustInclude) {
            return true;
        }
        //throw out lines that don't match the logLevelRegex (if we have one)
        if (this.logLevelRegex && !this.logLevelRegex.test(logLine.text)) {
            return false;
        }
        //throw out lines that don't match the includeRegex (if we have one)
        if (this.includeRegex && !this.includeRegex.test(logLine.text)) {
            return false;
        }
        //all other log entries should be kept
        return true;
    }
    clearOutput() {
        this.markCount = 0;
        this.allLogLines = [];
        this.displayedLogLines = [];
        this.outputChannel.clear();
        this.docLinkProvider.resetCustomLinks();
    }
    setIncludeFilter(text) {
        this.includeRegex = text && text.trim() !== '' ? new RegExp(text, 'i') : null;
        this.reFilterOutput();
    }
    setExcludeFilter(text) {
        this.excludeRegex = text && text.trim() !== '' ? new RegExp(text, 'i') : null;
        this.reFilterOutput();
    }
    setLevelFilter(text) {
        this.logLevelRegex = text && text.trim() !== '' ? new RegExp(text, 'i') : null;
        this.reFilterOutput();
    }
    reFilterOutput() {
        this.outputChannel.clear();
        this.docLinkProvider.resetCustomLinks();
        for (let i = 0; i < this.allLogLines.length - 1; i++) {
            let logLine = this.allLogLines[i];
            if (this.shouldLineBeShown(logLine)) {
                this.addLogLineToOutput(logLine);
            }
        }
    }
    markOutput() {
        this.appendLine(`---------------------- MARK ${this.markCount} ----------------------`, true);
        this.markCount++;
    }
}
exports.LogOutputManager = LogOutputManager;
//# sourceMappingURL=LogOutputManager.js.map