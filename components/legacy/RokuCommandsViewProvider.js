"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuCommandsViewProvider = void 0;
const path = require("path");
const rta = require("roku-test-automation");
const fs = require("fs");
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
class RokuCommandsViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor() {
        super(...arguments);
        this.id = ViewProviderId_1.ViewProviderId.rokuCommandsView;
    }
    additionalScriptContents() {
        const requestArgsPath = path.join(rta.utils.getClientFilesPath(), 'requestArgs.schema.json');
        return [
            `const requestArgsSchema = ${fs.readFileSync(requestArgsPath, 'utf8')};`,
            `const odcCommands = ['${this.odcCommands.join(`','`)}'];`
        ];
    }
}
exports.RokuCommandsViewProvider = RokuCommandsViewProvider;
//# sourceMappingURL=RokuCommandsViewProvider.js.map