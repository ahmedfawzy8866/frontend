"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezvousViewProvider = void 0;
const arraySort = require("array-sort");
const vscode = require("vscode");
const roku_debug_1 = require("roku-debug");
const ViewProviderId_1 = require("./ViewProviderId");
class RendezvousViewProvider {
    constructor(context) {
        this.id = ViewProviderId_1.ViewProviderId.rendezvousView;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.sortAscending = false;
        /**
         * Handled sorting the TreeItems by totalTime
         */
        this.rendezvousTotalTimeSort = (itemOne, itemTwo) => {
            if (itemOne.details.totalTime > itemTwo.details.totalTime) {
                return this.handleReverseSort(-1);
            }
            else if (itemOne.details.totalTime < itemTwo.details.totalTime) {
                return this.handleReverseSort(1);
            }
            return 0;
        };
        /**
         * Handled sorting the TreeItems by averageTime. Does not use zero cost rendezvous' in the average calculation
         */
        this.rendezvousAverageTimeSort = (itemOne, itemTwo) => {
            let zeroCostOffsetOne = itemOne.details.zeroCostHitCount ? itemOne.details.zeroCostHitCount : 0;
            let zeroCostOffsetTwo = itemTwo.details.zeroCostHitCount ? itemTwo.details.zeroCostHitCount : 0;
            if (itemOne.details.totalTime / (itemOne.details.hitCount - zeroCostOffsetOne) > itemTwo.details.totalTime / (itemTwo.details.hitCount - zeroCostOffsetTwo)) {
                return this.handleReverseSort(-1);
            }
            else if (itemOne.details.totalTime / (itemOne.details.hitCount - zeroCostOffsetOne) < itemTwo.details.totalTime / (itemTwo.details.hitCount - zeroCostOffsetTwo)) {
                return this.handleReverseSort(1);
            }
            return 0;
        };
        /**
         * Handled sorting the TreeItems by hitCount. Does not count zero cost rendezvous' in the hitCount calculation
         */
        this.rendezvousHitCountSort = (itemOne, itemTwo) => {
            let zeroCostOffsetOne = itemOne.details.zeroCostHitCount ? itemOne.details.zeroCostHitCount : 0;
            let zeroCostOffsetTwo = itemTwo.details.zeroCostHitCount ? itemTwo.details.zeroCostHitCount : 0;
            if ((itemOne.details.hitCount - zeroCostOffsetOne) > (itemTwo.details.hitCount - zeroCostOffsetTwo)) {
                return this.handleReverseSort(-1);
            }
            else if ((itemOne.details.hitCount - zeroCostOffsetOne) < (itemTwo.details.hitCount - zeroCostOffsetTwo)) {
                return this.handleReverseSort(1);
            }
            return 0;
        };
        /**
         * Prepares a generic simple sort
         * @param propertyName The field name to compare
         */
        this.compare = (propertyName) => {
            return (itemOne, itemTwo) => {
                if (itemOne[propertyName] > itemTwo[propertyName]) {
                    return this.handleReverseSort(-1);
                }
                else if (itemOne[propertyName] < itemTwo[propertyName]) {
                    return this.handleReverseSort(1);
                }
                return 0;
            };
        };
        this.toggleSmartSorting();
        // #region Register sorting commands
        let subscriptions = context.subscriptions;
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.rendezvous.toggleSortMethod', () => {
            this.toggleSmartSorting();
            this._onDidChangeTreeData.fire(null);
        }));
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.rendezvous.toggleSortDirection', () => {
            this.sortAscending = !this.sortAscending;
            this._onDidChangeTreeData.fire(null);
        }));
        // #endregion
        vscode.commands.registerCommand('RendezvousViewProvider.openFile', (resource) => this.openResource(resource));
    }
    /**
     * Toggles between smart and simple sorting
     */
    toggleSmartSorting() {
        if (!this.isUsingSmartSorting) {
            // Update the sorting logic to be totalTime > averageTime > hitCount > label text
            this.isUsingSmartSorting = true;
            this.activeFilter = [
                this.rendezvousTotalTimeSort,
                this.rendezvousAverageTimeSort,
                this.rendezvousHitCountSort,
                this.compare('label')
            ];
        }
        else {
            // Sorting is simply based on the label text
            this.isUsingSmartSorting = false;
            this.activeFilter = [this.compare('label')];
        }
    }
    /**
     * Clears the local copy of the rendezvous data. The debug session sends all data, so this call won't clear that. if you need to clear that,
     * call the `rendezvous.clearHistory` command
     */
    clear() {
        this.rendezvousHistory = undefined;
        this._onDidChangeTreeData.fire(null);
    }
    /**
     * Handles the custom events
     */
    onDidReceiveDebugSessionCustomEvent(e) {
        console.log('received event ' + e.event);
        if ((0, roku_debug_1.isRendezvousEvent)(e)) {
            // What changed?
            // let diff = this.objectDiff(e.body, this.viewedData);
            this.rendezvousHistory = e.body;
            this._onDidChangeTreeData.fire(null);
        }
    }
    /**
     * Called by VS Code to get the children tree items for a give tree view item
     * @param element whose children are needed
     */
    getChildren(element) {
        if (!element) {
            if (this.rendezvousHistory) {
                // There are no tree view items so we should be creating file tree items
                return arraySort(Object.keys(this.rendezvousHistory.occurrences).map((key) => {
                    let fileTreeItem = new RendezvousFileTreeItem(key, vscode.TreeItemCollapsibleState.Collapsed, null, this.rendezvousHistory.occurrences[key]);
                    fileTreeItem.tooltip = fileTreeItem.key;
                    fileTreeItem.description = `hitCount: ${fileTreeItem.details.hitCount} | totalTime: ${fileTreeItem.details.totalTime.toFixed(3)} s`;
                    return fileTreeItem;
                }), this.activeFilter);
            }
            else {
                return [];
            }
        }
        else {
            // VS code is asking for the children of the supplied tree item
            let treeElement = this.getTreeElementHistoryData(element);
            let result;
            if (treeElement.type === 'fileInfo') {
                result = arraySort(Object.keys(treeElement.occurrences).map((key) => {
                    let { hitCount, totalTime, clientPath, clientLineNumber } = treeElement.occurrences[key];
                    let label = `line: ${key} | hitCount: ${hitCount} | totalTime: ${totalTime.toFixed(3)} s | average: ${(totalTime / hitCount).toFixed(3)} s`;
                    // create the command used to open the file
                    let command = {
                        command: 'RendezvousViewProvider.openFile',
                        title: 'Open File',
                        arguments: [{
                                path: clientPath,
                                lineNumber: clientLineNumber,
                                devicePath: element.key
                            }]
                    };
                    return new RendezvousTreeItem(label, vscode.TreeItemCollapsibleState.None, element, key, treeElement.occurrences[key], command);
                }), this.activeFilter);
            }
            return result;
        }
    }
    /**
     * Called by VS Code to get a given element.
     * Currently we don't modify this element so it is just returned back.
     * @param element the requested element
     */
    getTreeItem(element) {
        return element;
    }
    /**
     * Used to get the data for a give TreeItem from the tree of RendezvousHistory
     * @param element for which the data was requested
     */
    getTreeElementHistoryData(element) {
        if (element.details.type === 'lineInfo') {
            // return the line item info
            return this.rendezvousHistory.occurrences[element.parent.key].occurrences[element.key];
        }
        else if (element.details.type === 'fileInfo') {
            // return the file item info
            return this.rendezvousHistory.occurrences[element.key];
        }
    }
    /**
     * attempts to open the file at the given line
     */
    async openResource(fileArgs) {
        if (fileArgs.path && fileArgs.lineNumber) {
            let uri = vscode.Uri.file(fileArgs.path);
            let doc = await vscode.workspace.openTextDocument(uri);
            let range = new vscode.Range(new vscode.Position(fileArgs.lineNumber - 1, 0), new vscode.Position(fileArgs.lineNumber - 1, 0));
            await vscode.window.showTextDocument(doc, { preview: false, selection: range });
        }
        else {
            await vscode.window.showErrorMessage(`Unable to open file for: ${fileArgs.devicePath}`);
        }
    }
    /**
     * Will invert the sortResult based on wether we are doing ascending or descending sorting
     * @param sortResult the integer value from a sort function
     */
    handleReverseSort(sortResult) {
        if (this.sortAscending) {
            if (sortResult === 1) {
                return -1;
            }
            else {
                if (sortResult === -1) {
                    return 1;
                }
                else {
                    return sortResult;
                }
            }
        }
        else {
            return sortResult;
        }
    }
}
exports.RendezvousViewProvider = RendezvousViewProvider;
class RendezvousTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, parent, key, details, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.parent = parent;
        this.key = key;
        this.details = details;
        this.command = command;
        this.tooltip = `Click To Open File`;
    }
}
class RendezvousFileTreeItem extends vscode.TreeItem {
    constructor(key, collapsibleState, parent, details) {
        super(key.split('/').pop(), collapsibleState);
        this.key = key;
        this.collapsibleState = collapsibleState;
        this.parent = parent;
        this.details = details;
    }
}
//# sourceMappingURL=RendezvousViewProvider.js.map