"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTENSION_ID = exports.ROKU_DEBUG_VERSION = void 0;
const fsExtra = require("fs-extra");
try {
    exports.ROKU_DEBUG_VERSION = fsExtra.readJsonSync(__dirname + '/../node_modules/roku-debug/package.json').version;
}
catch (e) { }
exports.EXTENSION_ID = 'RokuCommunity.brightscript';
//# sourceMappingURL=constants.js.map