"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPackageManager = void 0;
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
const fsExtra = require("fs-extra");
const brighterscript_1 = require("brighterscript");
const util_1 = require("../util");
const lodash = require("lodash");
const md5 = require("md5");
const semver = require("semver");
const path = require("path");
const USAGE_KEY = 'local-package-usage';
/**
 * Manages all node_module packages that are installed by this extension
 */
class LocalPackageManager {
    constructor(storageLocation, context) {
        this.storageLocation = storageLocation;
        this.context = context;
        this.catalogPath = (0, brighterscript_1.standardizePath) `${this.storageLocation}/catalog.json`;
    }
    /**
     * Load the catalog object from disk
     */
    getCatalog() {
        var _a;
        //load from disk
        return (_a = fsExtra.readJsonSync(this.catalogPath, { throws: false })) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * Write the catalog object to disk
     */
    setCatalog(catalog) {
        fsExtra.outputJsonSync(this.catalogPath, catalog);
    }
    setCatalogPackageInfo(packageName, version, info) {
        const catalog = this.getCatalog();
        lodash.set(catalog, ['packages', packageName, version], info);
        this.setCatalog(catalog);
    }
    /**
     * Is the given package installed
     * @param packageName name of the package
     * @param versionInfo versionInfo of the package
     * @returns true if the package is installed, false if not
     */
    isInstalled(packageName, versionInfo) {
        return this.getPackageInfo(packageName, versionInfo).isInstalled;
    }
    /**
     * Install a package with the given name and version information
     * @param packageName the name of the package
     * @param versionInfo the versionInfo of the package. See {versionInfo} for more details
     * @returns the absolute path to the installed package
     */
    async install(packageName, versionInfo) {
        const packageInfo = this.getPackageInfo(packageName, versionInfo);
        //if this package is already installed, skip the install
        if (packageInfo.isInstalled) {
            return packageInfo;
        }
        fsExtra.ensureDirSync(packageInfo.rootDir);
        //write a simple package.json file referencing the version of brighterscript we want
        await fsExtra.outputJson(`${packageInfo.rootDir}/package.json`, {
            name: 'vscode-brighterscript-host',
            private: true,
            version: '1.0.0',
            dependencies: {
                [packageName]: versionInfo
            }
        });
        //install the package
        await util_1.util.spawnNpmAsync(['install'], {
            cwd: packageInfo.rootDir
        });
        //update the catalog
        this.setCatalogPackageInfo(packageName, versionInfo, {
            versionDirName: packageInfo.versionDirName,
            installDate: Date.now()
        });
        return this.getPackageInfo(packageName, versionInfo);
    }
    /**
     * Remove a specific version of a package
     * @param packageName name of the package
     * @param version version of the package to remove
     */
    async uninstall(packageName, version, catalog) {
        await this.withCatalog(async (catalog) => {
            var _a, _b;
            const info = this.getPackageInfo(packageName, version, catalog);
            await fsExtra.remove(info.rootDir);
            (_b = (_a = catalog.packages) === null || _a === void 0 ? void 0 : _a[packageName]) === null || _b === void 0 ? true : delete _b[version];
        }, catalog);
    }
    /**
     * Run an action with a given catalog object. If no catalog is provided, the catalog will be loaded from disk and saved back to disk after the action is complete.
     * If a catalog is provided, it's assumed the outside caller will handle saving the catalog to disk
     */
    async withCatalog(callback, catalog) {
        let hasExternalCatalog = !!catalog;
        catalog !== null && catalog !== void 0 ? catalog : (catalog = this.getCatalog());
        const result = await Promise.resolve(callback(catalog));
        if (!hasExternalCatalog) {
            this.setCatalog(catalog);
        }
        return result;
    }
    /**
     * Remove all packages with the given name
     * @param packageName the name of the package that will have all versions removed
     */
    async removePackage(packageName) {
        var _a;
        //delete the package folder
        await fsExtra.remove((0, brighterscript_1.standardizePath) `${this.storageLocation}/${packageName}`);
        const catalog = this.getCatalog();
        (_a = catalog.packages) === null || _a === void 0 ? true : delete _a[packageName];
        this.setCatalog(catalog);
    }
    /**
     * Remove all packages and their versions
     */
    async removeAll() {
        await fsExtra.emptyDir(this.storageLocation);
    }
    /**
     * Create a filesystem-safe name for the given version. This will be used as the directory name for the package version.
     * Will also handle collisions with existing directories by appending a number to the end of the directory name if we already have
     * a directory with the same name for this package
     * @param version
     * @returns
     */
    getVersionDirName(packageName, version, catalog = this.getCatalog()) {
        var _a, _b, _c, _d, _e;
        const existingVersionDirName = (_c = (_b = (_a = catalog.packages) === null || _a === void 0 ? void 0 : _a[packageName]) === null || _b === void 0 ? void 0 : _b[version]) === null || _c === void 0 ? void 0 : _c.versionDirName;
        //if there's already a directory for this package, return it
        if (existingVersionDirName) {
            return existingVersionDirName;
        }
        //this is a valid semver number, so we can use it as the directory name
        if (semver.valid(version)) {
            return version;
        }
        else {
            //hash the string to create a unique folder name. There is next to zero possibility these will clash, but we'll handle collisions anyway
            const hash = md5(version.trim());
            const existingHashes = Object.values((_e = (_d = catalog.packages) === null || _d === void 0 ? void 0 : _d[packageName]) !== null && _e !== void 0 ? _e : {}).map(x => x.versionDirName);
            let newHash = hash;
            let i = 1;
            while (existingHashes.includes(newHash)) {
                newHash = `${hash}-${i++}`;
            }
            return newHash;
        }
    }
    /**
     * Get info about this package (regardless of whether it's installed or not).
     * If the package is not installed, all
     * @param packageName name of the package
     * @param versionInfo versionInfo of the package
     * @param catalog the catalog object. If not provided, it will be loaded from disk
     * @returns
     */
    getPackageInfo(packageName, versionInfo, catalog = this.getCatalog()) {
        var _a, _b, _c, _d, _e;
        //TODO derive a better name for some edge cases (like urls or tags)
        const versionDirName = this.getVersionDirName(packageName, versionInfo, catalog);
        const rootDir = (0, brighterscript_1.standardizePath) `${this.storageLocation}/${packageName}/${versionDirName}`;
        const packageDir = (0, brighterscript_1.standardizePath) `${rootDir}/node_modules/${packageName}`;
        const packageInfo = ((_c = (_b = (_a = catalog.packages) === null || _a === void 0 ? void 0 : _a[packageName]) === null || _b === void 0 ? void 0 : _b[versionInfo]) !== null && _c !== void 0 ? _c : {});
        const lastUseDate = (_d = this.context.globalState.get(USAGE_KEY, {})[packageName]) === null || _d === void 0 ? void 0 : _d[versionInfo];
        return {
            packageName: packageName,
            versionInfo: versionInfo,
            rootDir: rootDir,
            packageDir: packageDir,
            versionDirName: versionDirName,
            version: (_e = fsExtra.readJsonSync((0, brighterscript_1.standardizePath) `${packageDir}/package.json`, { throws: false })) === null || _e === void 0 ? void 0 : _e.version,
            isInstalled: fsExtra.pathExistsSync(packageDir),
            lastUsedDate: lastUseDate ? new Date(lastUseDate) : undefined,
            installDate: packageInfo.installDate ? new Date(packageInfo.installDate) : undefined
        };
    }
    /**
     * Mark a package as being used by the user right now. This can help with determining which packages are safe to remove after a period of time.
     * @param packageName the name of the package
     * @param version the version of the package
     */
    async setUsage(packageName, version, dateUsed = new Date()) {
        const usage = this.context.globalState.get(USAGE_KEY, {});
        lodash.set(usage, [packageName, version], dateUsed.getTime());
        await this.context.globalState.update(USAGE_KEY, usage);
    }
    /**
     * Delete packages that havent been used since the given cutoff date
     * @param cutoffDate any package not used since this date will be deleted
     */
    async deletePackagesNotUsedSince(cutoffDate) {
        //get the list of directories from the storage folder (these are our package names)
        const packageNames = (await fsExtra.readdir(this.storageLocation))
            .filter(x => x !== 'catalog.json');
        let onDiskPackages = {};
        //get every version folder for each package
        await Promise.all(packageNames.map(async (packageName) => {
            onDiskPackages[packageName] = {};
            for (const versionDirName of await fsExtra.readdir((0, brighterscript_1.standardizePath) `${this.storageLocation}/${packageName}`)) {
                //set to the oldest date possible
                onDiskPackages[packageName][versionDirName] = 0;
            }
        }));
        const catalog = this.getCatalog();
        //now get the actual usage dates
        const usage = this.context.globalState.get(USAGE_KEY, {});
        for (const [packageName, versions] of Object.entries(usage)) {
            for (const [version, dateUsed] of Object.entries(versions)) {
                const packageInfo = this.getPackageInfo(packageName, version, catalog);
                onDiskPackages[packageName][packageInfo.versionDirName] = dateUsed;
            }
        }
        let cutoffDateMs = cutoffDate.getTime();
        //now delete every directory that's older than our date
        for (const [packageName, versions] of Object.entries(onDiskPackages)) {
            for (const [versionDirName, lastUsedDate] of Object.entries(versions)) {
                if (lastUsedDate < cutoffDateMs) {
                    await this.uninstall(packageName, versionDirName);
                }
            }
        }
        this.setCatalog(catalog);
    }
    /**
     * Parse the versionInfo string into a ParsedVersionInfo object which gives us more details about how to handle it
     * @param versionInfo the string to evaluate
     * @param cwd a current working directory to use when resolving relative paths
     * @returns an object with parsed information about the versionInfo
     */
    parseVersionInfo(versionInfo, cwd) {
        //is empty string or undefined, return undefined
        if (!util_1.util.isNonEmptyString(versionInfo)) {
            return undefined;
            //is an exact semver value
        }
        else if (semver.valid(versionInfo)) {
            return {
                type: 'semver-exact',
                value: versionInfo
            };
            //is a semver range
        }
        else if (semver.validRange(versionInfo)) {
            return {
                type: 'semver-range',
                value: versionInfo
            };
            //is a dist tag (like @next, @latest, etc...)
        }
        else if (/^@[a-z0-9-_]*$/i.test(versionInfo)) {
            return {
                type: 'dist-tag',
                value: versionInfo
            };
            //is a url, return as-is
        }
        else if (/^(http|https):\/\//.test(versionInfo)) {
            return {
                type: 'url',
                value: versionInfo
            };
            //path to a tgz
        }
        else if (/\.tgz$/i.test(versionInfo)) {
            return {
                type: 'tgz-path',
                value: versionInfo
            };
            //an absolute path
        }
        else if (path.isAbsolute(versionInfo)) {
            return {
                type: 'dir',
                value: versionInfo
            };
            //assume relative path, resolve it to the cwd
        }
        else {
            return {
                type: 'dir',
                value: path.resolve(cwd, versionInfo)
            };
        }
    }
    dispose() {
    }
}
exports.LocalPackageManager = LocalPackageManager;
//# sourceMappingURL=LocalPackageManager.js.map