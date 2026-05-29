"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORKSPACE_WARNING_MESSAGE = exports.CAMEL_JBANG_KUBERNETES_DEPLOY_COMMAND_ID = exports.CAMEL_RUN_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID = exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID = exports.CAMEL_RUN_WITH_JBANG_ROOT_COMMAND_ID = exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_ROOT_COMMAND_ID = exports.CAMEL_RUN_WITH_JBANG_COMMAND_ID = exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License", destination); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vscode = __importStar(require("vscode"));
const CamelDebugAdapterDescriptorFactory_1 = require("./CamelDebugAdapterDescriptorFactory");
const vscode_redhat_telemetry_1 = require("@redhat-developer/vscode-redhat-telemetry");
const CamelApplicationLauncherTasksCompletionItemProvider_1 = require("./completion/CamelApplicationLauncherTasksCompletionItemProvider");
const CamelJBangTaskProvider_1 = require("./task/CamelJBangTaskProvider");
const CamelJBangCodelens_1 = require("./codelenses/CamelJBangCodelens");
const child_process_1 = require("child_process");
let telemetryService;
const CAMEL_DEBUG_ADAPTER_ID = 'apache.camel';
exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID = 'apache.camel.debug.jbang';
exports.CAMEL_RUN_WITH_JBANG_COMMAND_ID = 'apache.camel.run.jbang';
exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_ROOT_COMMAND_ID = 'apache.camel.debug.jbang.all.root';
exports.CAMEL_RUN_WITH_JBANG_ROOT_COMMAND_ID = 'apache.camel.run.jbang.all.root';
exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID = 'apache.camel.debug.jbang.all.containingfolder';
exports.CAMEL_RUN_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID = 'apache.camel.run.jbang.all.containingfolder';
exports.CAMEL_JBANG_KUBERNETES_DEPLOY_COMMAND_ID = 'apache.camel.kubernetes.deploy';
exports.WORKSPACE_WARNING_MESSAGE = `The action requires an opened folder/workspace to complete successfully.`;
async function activate(context) {
    vscode.debug.registerDebugAdapterDescriptorFactory(CAMEL_DEBUG_ADAPTER_ID, new CamelDebugAdapterDescriptorFactory_1.CamelDebugAdapterDescriptorFactory(context));
    const tasksJson = { scheme: 'file', language: 'jsonc', pattern: '**/tasks.json' };
    vscode.languages.registerCompletionItemProvider(tasksJson, new CamelApplicationLauncherTasksCompletionItemProvider_1.CamelApplicationLauncherTasksCompletionItemProvider());
    const taskProvider = new CamelJBangTaskProvider_1.CamelJBangTaskProvider();
    vscode.tasks.registerTaskProvider('camel.jbang', taskProvider);
    const redhatService = await (0, vscode_redhat_telemetry_1.getRedHatService)(context);
    telemetryService = await redhatService.getTelemetryService();
    await telemetryService.sendStartupEvent();
    registerDebugCommand(exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask);
    registerDebugCommand(exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_ROOT_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunAllWithDebugActivatedTask);
    registerDebugCommand(exports.CAMEL_RUN_AND_DEBUG_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderWithDebugActivatedTask);
    registerRunCommand(exports.CAMEL_RUN_WITH_JBANG_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunTask, taskProvider);
    registerRunCommand(exports.CAMEL_RUN_WITH_JBANG_ROOT_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunAllTask, taskProvider);
    registerRunCommand(exports.CAMEL_RUN_WITH_JBANG_CONTAININGFOLDER_COMMAND_ID, CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderTask, taskProvider);
    vscode.commands.registerCommand(exports.CAMEL_JBANG_KUBERNETES_DEPLOY_COMMAND_ID, async function () {
        const camelAddKubernetesPluginTask = taskProvider.createTask(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelAddKubernetesPluginTask);
        if (camelAddKubernetesPluginTask && !(await isCamelPluginInstalled('kubernetes'))) {
            await vscode.tasks.executeTask(camelAddKubernetesPluginTask);
            await taskProvider.waitForTaskEnd(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelAddKubernetesPluginTask);
        }
        const camelDeployTask = taskProvider.createTask(CamelJBangTaskProvider_1.CamelJBangTaskProvider.labelProvidedDeployTask);
        if (camelDeployTask) {
            await vscode.tasks.executeTask(camelDeployTask);
            await sendCommandTrackingEvent(telemetryService, exports.CAMEL_JBANG_KUBERNETES_DEPLOY_COMMAND_ID);
        }
    });
    vscode.debug.registerDebugAdapterTrackerFactory(CAMEL_DEBUG_ADAPTER_ID, {
        createDebugAdapterTracker(_session) {
            return {
                onDidSendMessage: async (m) => {
                    if (m.type === 'event'
                        && m.event === 'output'
                        && m.body?.category === 'telemetry'
                        && m.body?.data?.name !== undefined) {
                        await telemetryService.send(m.body?.data);
                    }
                }
            };
        }
    });
    const docSelector = [{
            language: 'java',
            scheme: 'file'
        }, {
            language: 'xml',
            scheme: 'file'
        }, {
            language: 'yaml',
            scheme: 'file'
        }];
    vscode.languages.registerCodeLensProvider(docSelector, new CamelJBangCodelens_1.CamelJBangCodelens());
}
function registerDebugCommand(commandId, taskLabel) {
    vscode.commands.registerCommand(commandId, async (uri) => {
        if (!vscode.workspace.workspaceFolders) {
            await vscode.window.showWarningMessage(exports.WORKSPACE_WARNING_MESSAGE);
            return;
        }
        if (uri !== undefined) {
            await vscode.window.showTextDocument(uri);
        }
        const debugConfiguration = {
            name: `Debug Camel JBang`,
            type: 'apache.camel',
            request: 'attach',
            preLaunchTask: `camel: ${taskLabel}`,
        };
        await vscode.debug.startDebugging(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined, debugConfiguration);
        await sendCommandTrackingEvent(telemetryService, commandId);
    });
}
function registerRunCommand(commandId, taskLabel, taskProvider) {
    vscode.commands.registerCommand(commandId, async function () {
        if (!vscode.workspace.workspaceFolders) {
            await vscode.window.showWarningMessage(exports.WORKSPACE_WARNING_MESSAGE);
            return;
        }
        const camelRunTask = taskProvider.createTask(taskLabel);
        if (camelRunTask) {
            await sendCommandTrackingEvent(telemetryService, commandId);
            await vscode.tasks.executeTask(camelRunTask);
        }
    });
}
async function deactivate() {
    await telemetryService.sendShutdownEvent();
}
async function sendCommandTrackingEvent(telemetryService, commandId) {
    const telemetryEvent = {
        type: 'track',
        name: 'command',
        properties: {
            identifier: commandId
        }
    };
    await telemetryService.send(telemetryEvent);
}
async function isCamelPluginInstalled(plugin) {
    let output = '';
    // it takes always few seconds to compute after click on deploy button
    //  - can be confusing for user without any UI feedback, it looks like nothing is happening after click on a button..
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Checking Camel JBang Kubernetes plugin...'
    }, async (progress) => {
        progress.report({ increment: 0 });
        output = (0, child_process_1.execSync)('jbang camel@apache/camel plugin get', { stdio: 'pipe' }).toString();
        progress.report({ increment: 100 });
    });
    return output.includes(plugin);
}
//# sourceMappingURL=extension.js.map