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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarManager = void 0;
const vscode = __importStar(require("vscode"));
class StatusBarManager {
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    }
    initialize() {
        this.statusBarItem.command = 'autoboot.serverStatus';
        this.statusBarItem.tooltip = 'Click to check server status';
        this.updateStatus('idle', 'AutoBoot Ready');
        this.statusBarItem.show();
    }
    updateStatus(status, text) {
        const icons = {
            idle: '$(circle-outline)',
            running: '$(play-circle)',
            stopped: '$(stop-circle)',
            error: '$(error)'
        };
        const colors = {
            idle: undefined,
            running: '#00ff00',
            stopped: '#ffaa00',
            error: '#ff0000'
        };
        this.statusBarItem.text = `${icons[status]} ${text}`;
        this.statusBarItem.color = colors[status];
    }
    updateServerStatus(isRunning, framework, port) {
        if (isRunning) {
            const text = framework && port ?
                `${framework} (${port})` :
                'Server Running';
            this.updateStatus('running', text);
        }
        else {
            this.updateStatus('stopped', 'Server Stopped');
        }
    }
    showProgress(message) {
        this.statusBarItem.text = `$(sync~spin) ${message}`;
        this.statusBarItem.color = '#ffaa00';
    }
    dispose() {
        this.statusBarItem.dispose();
    }
}
exports.StatusBarManager = StatusBarManager;
//# sourceMappingURL=statusBarManager.js.map