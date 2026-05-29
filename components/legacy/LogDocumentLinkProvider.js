"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDocumentLinkProvider = exports.CustomDocumentLink = void 0;
const path = require("path");
const rokuDeploy = require("roku-deploy");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const BrightScriptFileUtils_1 = require("./BrightScriptFileUtils");
class CustomDocumentLink {
    constructor(outputLine, startChar, length, pkgPath, lineNumber, filename) {
        this.outputLine = outputLine;
        this.startChar = startChar;
        this.length = length;
        this.pkgPath = pkgPath;
        this.lineNumber = lineNumber;
        this.filename = filename;
    }
}
exports.CustomDocumentLink = CustomDocumentLink;
/**
 * Provides file links in any output window that has the pkg:/ format.
 * This only works after a debug session has started,  because the file mappings are provided in the debug launch arguments
 */
class LogDocumentLinkProvider {
    constructor() {
        //add import as property so it can be mocked in tests
        this.rokuDeploy = rokuDeploy;
        this.customLinks = [];
        this.fileUtils = new BrightScriptFileUtils_1.default();
    }
    async setLaunchConfig(launchConfig) {
        this.fileMaps = {};
        let sourceRootDir = launchConfig.sourceDirs ? launchConfig.sourceDirs : [launchConfig.rootDir];
        let paths = [];
        for (const rootDir of sourceRootDir) {
            let pathsFromRoot = await this.rokuDeploy.getFilePaths(launchConfig.files, rootDir);
            paths = paths.concat(pathsFromRoot);
        }
        //get every file used in this project
        let outDir = path.normalize(launchConfig.outDir);
        //convert every path into a pkg link, which maps back to the source location of the file
        for (let fileMap of paths) {
            //make the dest path relative. (fileMap.dest IS already relative to pkg path, but this line doesn't hurt anything so leave it here)
            let pkgPath = 'pkg:/' + path.normalize(fileMap.dest).replace(outDir, '');
            //replace windows slashes with 'nix ones
            pkgPath = pkgPath.replace(/\\/g, '/');
            //replace double slashes with single ones
            pkgPath = pkgPath.replace(/\/\//g, '/');
            this.fileMaps[pkgPath] = {
                pkgPath: pkgPath,
                ...fileMap
            };
        }
    }
    provideDocumentLinks(doc, token) {
        return this.customLinks;
    }
    getFileMap(pkgPath) {
        return this.fileMaps[pkgPath];
    }
    addCustomFileLink(customLink) {
        let range = new vscode_1.Range(new vscode_1.Position(customLink.outputLine, customLink.startChar), new vscode_1.Position(customLink.outputLine, customLink.startChar + customLink.length));
        let uri = vscode.Uri.parse(`vscode://rokucommunity.brightscript/openFile/${customLink.pkgPath}#${customLink.lineNumber}`);
        this.customLinks.push(new vscode_1.DocumentLink(range, uri));
    }
    addCustomPkgLink(customLink) {
        let fileMap = this.getFileMap(customLink.pkgPath);
        if (fileMap) {
            let range = new vscode_1.Range(new vscode_1.Position(customLink.outputLine, customLink.startChar), new vscode_1.Position(customLink.outputLine, customLink.startChar + customLink.length));
            let uri = vscode.Uri.parse(`vscode://rokucommunity.brightscript/openFile/${customLink.pkgPath}#${customLink.lineNumber}`);
            this.customLinks.push(new vscode_1.DocumentLink(range, uri));
        }
        else {
            console.log('could not find matching file for link with path ' + customLink.pkgPath);
        }
    }
    resetCustomLinks() {
        this.customLinks = [];
    }
    convertPkgPathToFsPath(pkgPath) {
        let mappedPath = this.getFileMap(pkgPath);
        if (!mappedPath) {
            //if a .brs file gets in here, that comes from a .brs file, but no sourcemap is present, then try to find the alternate source file.
            //this issue can arise when sourcemaps are nto present
            mappedPath = this.getFileMap(this.fileUtils.getAlternateBrsFileName(pkgPath));
        }
        return mappedPath ? mappedPath.src : undefined;
    }
}
exports.LogDocumentLinkProvider = LogDocumentLinkProvider;
//# sourceMappingURL=LogDocumentLinkProvider.js.map