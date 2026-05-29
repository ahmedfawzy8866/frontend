import * as vscode from 'vscode';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Left,
            100
        );
    }

    initialize() {
        this.statusBarItem.command = 'autoboot.serverStatus';
        this.statusBarItem.tooltip = 'Click to check server status';
        this.updateStatus('idle', 'AutoBoot Ready');
        this.statusBarItem.show();
    }

    updateStatus(status: 'idle' | 'running' | 'stopped' | 'error', text: string) {
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

    updateServerStatus(isRunning: boolean, framework?: string, port?: number) {
        if (isRunning) {
            const text = framework && port ? 
                `${framework} (${port})` : 
                'Server Running';
            this.updateStatus('running', text);
        } else {
            this.updateStatus('stopped', 'Server Stopped');
        }
    }

    showProgress(message: string) {
        this.statusBarItem.text = `$(sync~spin) ${message}`;
        this.statusBarItem.color = '#ffaa00';
    }

    dispose() {
        this.statusBarItem.dispose();
    }
}
