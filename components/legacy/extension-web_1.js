"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.extension = exports.Extension = void 0;
class Extension {
    async activate(context) {
    }
}
exports.Extension = Extension;
exports.extension = new Extension();
async function activate(context) {
    await exports.extension.activate(context);
}
exports.activate = activate;
//# sourceMappingURL=extension-web.js.map