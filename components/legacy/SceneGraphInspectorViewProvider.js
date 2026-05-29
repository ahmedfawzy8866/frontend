"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneGraphInspectorViewProvider = void 0;
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderId_1 = require("./ViewProviderId");
const VscodeCommand_1 = require("../commands/VscodeCommand");
class SceneGraphInspectorViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.sceneGraphInspectorView;
        this.registerCommand(VscodeCommand_1.VscodeCommand.openSceneGraphInspectorInPanel, async () => {
            await this.createOrRevealWebviewPanel();
        });
    }
}
exports.SceneGraphInspectorViewProvider = SceneGraphInspectorViewProvider;
//# sourceMappingURL=SceneGraphInspectorViewProvider.js.map