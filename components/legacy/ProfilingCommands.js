"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilingCommands = exports.ProfilingCommands = void 0;
const vscode = require("vscode");
const VscodeContextManager_1 = require("../managers/VscodeContextManager");
const roku_debug_1 = require("roku-debug");
class ProfilingCommands {
    register(context) {
        context.subscriptions.push(vscode.debug.onDidReceiveDebugSessionCustomEvent(async (event) => {
            //set various context keys based on profiling events to control visibility and state of UI elements (buttons, status bar items, etc.)
            if ((0, roku_debug_1.isProfilingEnabledEvent)(event)) {
                if (event.body.types.includes('trace')) {
                    void VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingEnabled', true);
                }
                if (event.body.types.includes('heapSnapshot')) {
                    void VscodeContextManager_1.vscodeContextManager.set('brightscript.heapSnapshotEnabled', true);
                }
            }
            else if ((0, roku_debug_1.isProfilingStartEvent)(event)) {
                if (event.body.type === 'trace') {
                    await VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingActive', true);
                }
                else if (event.body.type === 'heapSnapshot') {
                    await VscodeContextManager_1.vscodeContextManager.set('brightscript.heapSnapshotActive', true);
                }
            }
            else if ((0, roku_debug_1.isProfilingStopEvent)(event)) {
                if (event.body.type === 'trace') {
                    await VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingActive', false);
                }
                else if (event.body.type === 'heapSnapshot') {
                    void VscodeContextManager_1.vscodeContextManager.set('brightscript.heapSnapshotActive', false);
                }
                //open the profile in an editor
                if (event.body.result) {
                    void vscode.commands.executeCommand('vscode.open', vscode.Uri.file(event.body.result));
                }
            }
            else if ((0, roku_debug_1.isProfilingErrorEvent)(event)) {
                void vscode.window.showErrorMessage(`Profiling error: ${event.body.error.message}`);
            }
        }));
        function cleanContext(session) {
            if (session.type === 'brightscript') {
                void VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingEnabled', false);
                void VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingActive', false);
                void VscodeContextManager_1.vscodeContextManager.set('brightscript.heapSnapshotActive', false);
            }
        }
        //hide profiling-related buttons at the start and end of the session
        context.subscriptions.push(vscode.debug.onDidStartDebugSession(cleanContext));
        context.subscriptions.push(vscode.debug.onDidTerminateDebugSession(cleanContext));
        // Start tracing
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.startTracing', async () => {
            const session = vscode.debug.activeDebugSession;
            if (!session) {
                void vscode.window.showErrorMessage(`Cannot start tracing: there's no active debug session`);
                return;
            }
            try {
                await session.customRequest('startPerfettoTracing');
                await VscodeContextManager_1.vscodeContextManager.set('brightscript.tracingActive', true);
            }
            catch (e) {
                console.error(`Failed to start tracing`, e);
            }
        }));
        // Stop tracing
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.stopTracing', async () => {
            const session = vscode.debug.activeDebugSession;
            if (!session) {
                return;
            }
            try {
                await session.customRequest('stopPerfettoTracing');
            }
            catch (e) {
                console.error(`Failed to stop tracing:`, e);
            }
        }));
        async function captureHeapSnapshot() {
            const session = vscode.debug.activeDebugSession;
            if (!session) {
                void vscode.window.showErrorMessage(`Cannot capture heap snapshot: there's no active debug session`);
                return;
            }
            try {
                await session.customRequest('captureHeapSnapshot');
            }
            catch (e) {
                console.error(`Failed to capture snapshot:`, e);
            }
        }
        // Start capturing snapshot
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.captureHeapSnapshot', captureHeapSnapshot));
        // Register capturing snapshot button (disabled, shows "Capturing snapshot..." tooltip when clicked)
        context.subscriptions.push(vscode.commands.registerCommand('extension.brightscript.heapSnapshotActive', captureHeapSnapshot));
    }
}
exports.ProfilingCommands = ProfilingCommands;
exports.profilingCommands = new ProfilingCommands();
//# sourceMappingURL=ProfilingCommands.js.map