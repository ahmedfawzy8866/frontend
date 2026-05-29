'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = exports.getHashString = exports.FileSystemUtils = exports.RawFileSystem = exports.convertStat = void 0;
const crypto_1 = require("crypto");
const fs = require("fs-extra");
const glob = require("glob");
const inversify_1 = require("inversify");
const util_1 = require("util");
const vscode = require("vscode");
const logging_1 = require("../../logging");
require("../extensions");
const filesystem_1 = require("../utils/filesystem");
const errors_1 = require("./errors");
const fs_paths_1 = require("./fs-paths");
const fs_temp_1 = require("./fs-temp");
const types_1 = require("./types");
const ENCODING = 'utf8';
function convertStat(old, filetype) {
    return {
        type: filetype,
        size: old.size,
        ctime: Math.round(old.ctimeMs),
        mtime: Math.round(old.mtimeMs),
    };
}
exports.convertStat = convertStat;
function filterByFileType(files, fileType) {
    if (fileType === types_1.FileType.Unknown) {
        return files.filter(([_file, ft]) => ft === types_1.FileType.Unknown || ft === (types_1.FileType.SymbolicLink & types_1.FileType.Unknown));
    }
    return files.filter(([_file, ft]) => (ft & fileType) > 0);
}
class RawFileSystem {
    constructor(paths, vscfs, fsExtra) {
        this.paths = paths;
        this.vscfs = vscfs;
        this.fsExtra = fsExtra;
    }
    static withDefaults(paths, vscfs, fsExtra) {
        return new RawFileSystem(paths || fs_paths_1.FileSystemPaths.withDefaults(), vscfs || vscode.workspace.fs, fsExtra || fs);
    }
    async pathExists(filename) {
        return this.fsExtra.pathExists(filename);
    }
    async stat(filename) {
        const uri = vscode.Uri.file(filename);
        return this.vscfs.stat(uri);
    }
    async lstat(filename) {
        const stat = await this.fsExtra.lstat(filename);
        const fileType = (0, filesystem_1.convertFileType)(stat);
        return convertStat(stat, fileType);
    }
    async chmod(filename, mode) {
        return this.fsExtra.chmod(filename, mode);
    }
    async move(src, tgt) {
        const srcUri = vscode.Uri.file(src);
        const tgtUri = vscode.Uri.file(tgt);
        await this.vscfs.stat(vscode.Uri.file(this.paths.dirname(tgt)));
        const options = { overwrite: false };
        try {
            await this.vscfs.rename(srcUri, tgtUri, options);
        }
        catch (err) {
            if (!(0, errors_1.isFileExistsError)(err)) {
                throw err;
            }
            const stat = await this.vscfs.stat(tgtUri);
            if (stat.type === types_1.FileType.Directory) {
                throw err;
            }
            options.overwrite = true;
            await this.vscfs.rename(srcUri, tgtUri, options);
        }
    }
    async readData(filename) {
        const uri = vscode.Uri.file(filename);
        const data = await this.vscfs.readFile(uri);
        return Buffer.from(data);
    }
    async readText(filename) {
        const uri = vscode.Uri.file(filename);
        const result = await this.vscfs.readFile(uri);
        const data = Buffer.from(result);
        return data.toString(ENCODING);
    }
    async writeText(filename, text) {
        const uri = vscode.Uri.file(filename);
        const data = Buffer.from(text);
        await this.vscfs.writeFile(uri, data);
    }
    async appendText(filename, text) {
        return this.fsExtra.appendFile(filename, text);
    }
    async copyFile(src, dest) {
        const srcURI = vscode.Uri.file(src);
        const destURI = vscode.Uri.file(dest);
        await this.vscfs.stat(vscode.Uri.file(this.paths.dirname(dest)));
        await this.vscfs.copy(srcURI, destURI, {
            overwrite: true,
        });
    }
    async rmfile(filename) {
        const uri = vscode.Uri.file(filename);
        return this.vscfs.delete(uri, {
            recursive: false,
            useTrash: false,
        });
    }
    async rmdir(dirname) {
        const uri = vscode.Uri.file(dirname);
        const files = await this.vscfs.readDirectory(uri);
        if (files && files.length > 0) {
            throw (0, errors_1.createDirNotEmptyError)(dirname);
        }
        return this.vscfs.delete(uri, {
            recursive: true,
            useTrash: false,
        });
    }
    async rmtree(dirname) {
        const uri = vscode.Uri.file(dirname);
        await this.vscfs.stat(uri);
        return this.vscfs.delete(uri, {
            recursive: true,
            useTrash: false,
        });
    }
    async mkdirp(dirname) {
        const uri = vscode.Uri.file(dirname);
        await this.vscfs.createDirectory(uri);
    }
    async listdir(dirname) {
        const uri = vscode.Uri.file(dirname);
        const files = await this.vscfs.readDirectory(uri);
        return files.map(([basename, filetype]) => {
            const filename = this.paths.join(dirname, basename);
            return [filename, filetype];
        });
    }
    statSync(filename) {
        let stat = this.fsExtra.lstatSync(filename);
        let filetype = types_1.FileType.Unknown;
        if (stat.isSymbolicLink()) {
            filetype = types_1.FileType.SymbolicLink;
            stat = this.fsExtra.statSync(filename);
        }
        filetype |= (0, filesystem_1.convertFileType)(stat);
        return convertStat(stat, filetype);
    }
    readTextSync(filename) {
        return this.fsExtra.readFileSync(filename, ENCODING);
    }
    createReadStream(filename) {
        return this.fsExtra.createReadStream(filename);
    }
    createWriteStream(filename) {
        return this.fsExtra.createWriteStream(filename);
    }
}
exports.RawFileSystem = RawFileSystem;
class FileSystemUtils {
    constructor(raw, pathUtils, paths, tmp, getHash, globFiles) {
        this.raw = raw;
        this.pathUtils = pathUtils;
        this.paths = paths;
        this.tmp = tmp;
        this.getHash = getHash;
        this.globFiles = globFiles;
    }
    static withDefaults(raw, pathUtils, tmp, getHash, globFiles) {
        pathUtils = pathUtils || fs_paths_1.FileSystemPathUtils.withDefaults();
        return new FileSystemUtils(raw || RawFileSystem.withDefaults(pathUtils.paths), pathUtils, pathUtils.paths, tmp || fs_temp_1.TemporaryFileSystem.withDefaults(), getHash || getHashString, globFiles || (0, util_1.promisify)(glob));
    }
    async createDirectory(directoryPath) {
        return this.raw.mkdirp(directoryPath);
    }
    async deleteDirectory(directoryPath) {
        return this.raw.rmdir(directoryPath);
    }
    async deleteFile(filename) {
        return this.raw.rmfile(filename);
    }
    async pathExists(filename, fileType) {
        if (fileType === undefined) {
            return this.raw.pathExists(filename);
        }
        let stat;
        try {
            stat = await this.raw.stat(filename);
        }
        catch (err) {
            if ((0, errors_1.isFileNotFoundError)(err)) {
                return false;
            }
            (0, logging_1.traceError)(`stat() failed for "${filename}"`, err);
            return false;
        }
        if (fileType === types_1.FileType.Unknown) {
            return stat.type === types_1.FileType.Unknown;
        }
        return (stat.type & fileType) === fileType;
    }
    async fileExists(filename) {
        return this.pathExists(filename, types_1.FileType.File);
    }
    async directoryExists(dirname) {
        return this.pathExists(dirname, types_1.FileType.Directory);
    }
    async listdir(dirname) {
        try {
            return await this.raw.listdir(dirname);
        }
        catch (err) {
            if (!(await this.pathExists(dirname))) {
                return [];
            }
            throw err;
        }
    }
    async getSubDirectories(dirname) {
        const files = await this.listdir(dirname);
        const filtered = filterByFileType(files, types_1.FileType.Directory);
        return filtered.map(([filename, _fileType]) => filename);
    }
    async getFiles(dirname) {
        const files = await this.listdir(dirname);
        const filtered = filterByFileType(files, types_1.FileType.File);
        return filtered.map(([filename, _fileType]) => filename);
    }
    async isDirReadonly(dirname) {
        const filePath = `${dirname}${this.paths.sep}___vscpTest___`;
        try {
            await this.raw.stat(dirname);
            await this.raw.writeText(filePath, '');
        }
        catch (err) {
            if ((0, errors_1.isNoPermissionsError)(err)) {
                return true;
            }
            throw err;
        }
        this.raw
            .rmfile(filePath)
            .ignoreErrors();
        return false;
    }
    async getFileHash(filename) {
        const stat = await this.raw.lstat(filename);
        const data = `${stat.ctime}-${stat.mtime}`;
        return this.getHash(data);
    }
    async search(globPattern, cwd, dot) {
        let options;
        if (cwd) {
            options = { ...options, cwd };
        }
        if (dot) {
            options = { ...options, dot };
        }
        const found = await this.globFiles(globPattern, options);
        return Array.isArray(found) ? found : [];
    }
    fileExistsSync(filePath) {
        try {
            this.raw.statSync(filePath);
        }
        catch (err) {
            if ((0, errors_1.isFileNotFoundError)(err)) {
                return false;
            }
            throw err;
        }
        return true;
    }
}
exports.FileSystemUtils = FileSystemUtils;
function getHashString(data) {
    const hash = (0, crypto_1.createHash)('sha512');
    hash.update(data);
    return hash.digest('hex');
}
exports.getHashString = getHashString;
let FileSystem = class FileSystem {
    constructor() {
        this.utils = FileSystemUtils.withDefaults();
    }
    get directorySeparatorChar() {
        return this.utils.paths.sep;
    }
    arePathsSame(path1, path2) {
        return this.utils.pathUtils.arePathsSame(path1, path2);
    }
    getDisplayName(path) {
        return this.utils.pathUtils.getDisplayName(path);
    }
    async stat(filename) {
        return this.utils.raw.stat(filename);
    }
    async createDirectory(dirname) {
        return this.utils.createDirectory(dirname);
    }
    async deleteDirectory(dirname) {
        return this.utils.deleteDirectory(dirname);
    }
    async listdir(dirname) {
        return this.utils.listdir(dirname);
    }
    async readFile(filePath) {
        return this.utils.raw.readText(filePath);
    }
    async readData(filePath) {
        return this.utils.raw.readData(filePath);
    }
    async writeFile(filename, data) {
        return this.utils.raw.writeText(filename, data);
    }
    async appendFile(filename, text) {
        return this.utils.raw.appendText(filename, text);
    }
    async copyFile(src, dest) {
        return this.utils.raw.copyFile(src, dest);
    }
    async deleteFile(filename) {
        return this.utils.deleteFile(filename);
    }
    async chmod(filename, mode) {
        return this.utils.raw.chmod(filename, mode);
    }
    async move(src, tgt) {
        await this.utils.raw.move(src, tgt);
    }
    readFileSync(filePath) {
        return this.utils.raw.readTextSync(filePath);
    }
    createReadStream(filePath) {
        return this.utils.raw.createReadStream(filePath);
    }
    createWriteStream(filePath) {
        return this.utils.raw.createWriteStream(filePath);
    }
    async fileExists(filename) {
        return this.utils.fileExists(filename);
    }
    pathExists(filename) {
        return this.utils.pathExists(filename);
    }
    fileExistsSync(filename) {
        return this.utils.fileExistsSync(filename);
    }
    async directoryExists(dirname) {
        return this.utils.directoryExists(dirname);
    }
    async getSubDirectories(dirname) {
        return this.utils.getSubDirectories(dirname);
    }
    async getFiles(dirname) {
        return this.utils.getFiles(dirname);
    }
    async getFileHash(filename) {
        return this.utils.getFileHash(filename);
    }
    async search(globPattern, cwd, dot) {
        return this.utils.search(globPattern, cwd, dot);
    }
    async createTemporaryFile(suffix, mode) {
        return this.utils.tmp.createFile(suffix, mode);
    }
    async isDirReadonly(dirname) {
        return this.utils.isDirReadonly(dirname);
    }
};
FileSystem = __decorate([
    (0, inversify_1.injectable)()
], FileSystem);
exports.FileSystem = FileSystem;
//# sourceMappingURL=fileSystem.js.map