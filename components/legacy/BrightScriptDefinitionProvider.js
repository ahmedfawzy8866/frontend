"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrightScriptDefinitionProvider {
    constructor(repo) {
        this.repo = repo;
    }
    async provideDefinition(document, position, token) {
        await this.repo.sync();
        return Array.from(this.repo.find(document, position));
    }
}
exports.default = BrightScriptDefinitionProvider;
//# sourceMappingURL=BrightScriptDefinitionProvider.js.map