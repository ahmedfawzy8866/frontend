"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrightScriptFileUtils {
    getAlternateFileName(fileName) {
        if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.brs')) {
            return fileName.substring(0, fileName.length - 4) + '.xml';
        }
        else if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.bs')) {
            return fileName.substring(0, fileName.length - 3) + '.xml';
        }
        else if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.xml')) {
            return fileName.substring(0, fileName.length - 4) + '.brs';
        }
        else {
            return undefined;
        }
    }
    getAlternateBrsFileName(fileName) {
        if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.bs')) {
            return fileName.substring(0, fileName.length - 2) + 'brs';
        }
        else if (fileName.toLowerCase().endsWith('.brs')) {
            return fileName.substring(0, fileName.length - 3) + 'bs';
        }
        else {
            return fileName;
        }
    }
    getBrsFileName(fileName) {
        if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.bs')) {
            return fileName.substring(0, fileName.length - 2) + 'brs';
        }
        else if (fileName.toLowerCase().endsWith('.brs')) {
            return fileName;
        }
    }
    getBsFileName(fileName) {
        if (fileName === null || fileName === void 0 ? void 0 : fileName.toLowerCase().endsWith('.brs')) {
            return fileName.substring(0, fileName.length - 3) + 'bs';
        }
        else if (fileName.toLowerCase().endsWith('.bs')) {
            return fileName;
        }
        else {
            return undefined;
        }
    }
    getParentComponentName(xmlContent) {
        const match = /<component[^>]+extends\s*=\s*["']([^"']+)["']/i.exec(xmlContent);
        return match === null || match === void 0 ? void 0 : match[1];
    }
}
exports.default = BrightScriptFileUtils;
//# sourceMappingURL=BrightScriptFileUtils.js.map