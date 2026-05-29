"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesViewProvider = void 0;
const vscode = require("vscode");
const semver = require("semver");
const icons_1 = require("../icons");
const util_1 = require("../util");
const ViewProviderId_1 = require("./ViewProviderId");
/**
 * A sequence used to generate unique IDs for tree items that don't care about having a key
 */
let treeItemKeySequence = 0;
/**
 * URI scheme used for device tree items to enable FileDecorationProvider
 */
const DEVICE_URI_SCHEME = 'roku-device';
class DevicesViewProvider {
    constructor(deviceManager) {
        this.deviceManager = deviceManager;
        this.id = ViewProviderId_1.ViewProviderId.devicesView;
        this.visible = false;
        this.scanProgressResolver = null;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.decorationProvider = new DeviceDecorationProvider();
        vscode.window.registerFileDecorationProvider(this.decorationProvider);
        // Pre-populate devices and decorations so they're ready before first render
        this.devices = this.deviceManager.getAllDevices();
        this.decorationProvider.updateDevices(this.devices);
        this.deviceManager.on('devices-changed', () => {
            this.devices = this.deviceManager.getAllDevices();
            this.decorationProvider.updateDevices(this.devices);
            this._onDidChangeTreeData.fire(null);
        });
        this.deviceManager.on('scanNeeded-changed', () => {
            if (!this.visible) {
                return;
            }
            this.deviceManager.refresh();
        });
    }
    setTreeView(treeView) {
        treeView.onDidChangeVisibility(e => {
            this.visible = e.visible;
            if (!this.visible) {
                return;
            }
            this.deviceManager.refresh();
        });
        this.deviceManager.on('scan-started', () => {
            this.showScanProgress();
        });
        this.deviceManager.on('scan-ended', () => {
            this.endScanProgress();
        });
    }
    showScanProgress() {
        // If already showing progress, don't start another
        if (this.scanProgressResolver) {
            return;
        }
        void vscode.window.withProgress({
            location: { viewId: this.id }
        }, () => {
            return new Promise((resolve) => {
                this.scanProgressResolver = resolve;
            });
        });
    }
    endScanProgress() {
        if (this.scanProgressResolver) {
            this.scanProgressResolver();
            this.scanProgressResolver = null;
        }
    }
    /**
     * Should the unique info about a device be obfuscated (i.e. randomly modified to protect the data)?
     */
    get isConcealDeviceInfoEnabled() {
        return util_1.util.getConfiguration('brightscript.deviceDiscovery').get('concealDeviceInfo') === true;
    }
    makeName(device) {
        // Use configuredName if available, otherwise fall back to user-device-name
        const displayName = device.configuredName || device.deviceInfo['user-device-name'] || device.ip;
        const softwareVersion = device.deviceInfo['software-version'];
        const parts = [
            device.deviceInfo['model-number'],
            displayName,
            softwareVersion ? `OS ${softwareVersion}` : undefined
        ].filter(Boolean);
        return parts.join(' – ') || device.ip;
    }
    getChildren(element) {
        var _a, _b, _c, _d, _e;
        if (!element) {
            // Fetch directly if devices haven't been populated yet (avoids debounce delay on initial load)
            if (this.devices.length === 0) {
                this.devices = this.deviceManager.getAllDevices();
                this.decorationProvider.updateDevices(this.devices);
            }
            if (this.devices) {
                let items = [];
                for (const device of this.devices) {
                    // Make a rook item for each device
                    let treeItem = new DeviceTreeItem(this.makeName(device), vscode.TreeItemCollapsibleState.Collapsed, device.key, device.deviceInfo);
                    treeItem.tooltip = `${device.ip} | ${device.deviceInfo['friendly-model-name'] || ''} - ${this.concealString(((_a = device.deviceInfo['serial-number']) === null || _a === void 0 ? void 0 : _a.toString()) || '')} | ${device.deviceInfo['user-device-location'] || ''}`;
                    // Set resourceUri to enable FileDecorationProvider for text coloring
                    // Use the device key which is serial-based when available, IP-based as fallback
                    treeItem.resourceUri = vscode.Uri.parse(`${DEVICE_URI_SCHEME}:/${device.key}`);
                    // Set icon based on device state
                    if (device.deviceState === 'offline') {
                        // For offline devices, check cache to distinguish:
                        // - warning icon: never successfully contacted (no cache)
                        // - disconnect icon: was online before (has cache)
                        const hasCache = device.serialNumber && this.deviceManager.hasDeviceCache(device.serialNumber);
                        if (hasCache) {
                            treeItem.iconPath = new vscode.ThemeIcon('debug-disconnect', new vscode.ThemeColor('disabledForeground'));
                        }
                        else {
                            treeItem.iconPath = new vscode.ThemeIcon('warning', new vscode.ThemeColor('disabledForeground'));
                        }
                    }
                    else if (device.deviceState === 'pending') {
                        treeItem.iconPath = new vscode.ThemeIcon('circle-small', new vscode.ThemeColor('disabledForeground'));
                    }
                    else {
                        treeItem.iconPath = icons_1.icons.getDeviceType(device.deviceInfo);
                    }
                    // Set contextValue for context menu actions
                    // Values: device, device-user, device-workspace, device-user-workspace
                    const inUser = (_b = device.configuredIn) === null || _b === void 0 ? void 0 : _b.includes('user');
                    const inWorkspace = (_c = device.configuredIn) === null || _c === void 0 ? void 0 : _c.includes('workspace');
                    let contextValue = 'device';
                    if (inUser && inWorkspace) {
                        contextValue = 'device-user-workspace';
                    }
                    else if (inUser) {
                        contextValue = 'device-user';
                    }
                    else if (inWorkspace) {
                        contextValue = 'device-workspace';
                    }
                    treeItem.contextValue = contextValue;
                    items.push(treeItem);
                }
                // Return the created root items
                return items;
            }
            else {
                // No devices
                return [];
            }
        }
        else if (element instanceof DeviceTreeItem) {
            // Process the details of a device
            let result = [];
            //conceal all of these unique keys
            const details = this.concealObject(element.details, ['udn', 'device-id', 'advertising-id', 'wifi-mac', 'ethernet-mac', 'serial-number', 'keyed-developer-id']);
            for (let [key, values] of details) {
                result.push(this.createDeviceInfoTreeItem({
                    label: key,
                    parent: element,
                    collapsibleState: vscode.TreeItemCollapsibleState.None,
                    key: key,
                    //if this is one of the properties that need concealed
                    description: (_d = values.value) === null || _d === void 0 ? void 0 : _d.toString(),
                    tooltip: 'Copy to clipboard',
                    // Prepare the copy to clipboard command
                    command: {
                        command: 'extension.brightscript.copyToClipboard',
                        title: 'Copy To Clipboard',
                        arguments: [values.originalValue]
                    }
                }));
            }
            const device = this.deviceManager.getDevice(element.key);
            if (!device) {
                return;
            }
            this.deviceManager.checkDeviceHealth(device).catch(() => { });
            if (((_e = device.deviceInfo) === null || _e === void 0 ? void 0 : _e['is-tv']) === 'true') {
                result.unshift(this.createDeviceInfoTreeItem({
                    label: '📺 Switch TV Input',
                    parent: element,
                    collapsibleState: vscode.TreeItemCollapsibleState.None,
                    description: 'click to change',
                    tooltip: 'Change the current TV input',
                    command: {
                        command: 'extension.brightscript.changeTvInput',
                        title: 'Switch TV Input',
                        arguments: [device.ip]
                    }
                }));
            }
            result.unshift(this.createDeviceInfoTreeItem({
                label: '📷 Capture Screenshot',
                parent: element,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                tooltip: 'Capture a screenshot',
                command: {
                    command: 'extension.brightscript.captureScreenshot',
                    title: 'Capture Screenshot',
                    arguments: [device.ip]
                }
            }));
            result.unshift(this.createDeviceInfoTreeItem({
                label: '⭐ Set as Active Device',
                parent: element,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                tooltip: 'Set as active device',
                command: {
                    command: 'extension.brightscript.setActiveDevice',
                    title: 'Set Active Device',
                    arguments: [device.ip]
                }
            }));
            result.unshift(this.createDeviceInfoTreeItem({
                label: '🔑 Set Device Password',
                parent: element,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                tooltip: 'Set password for this device',
                command: {
                    command: 'extension.brightscript.setDevicePassword',
                    title: 'Set Device Password',
                    arguments: [device.ip]
                }
            }));
            if (semver.satisfies(element.details['software-version'], '>=11')) {
                // TODO: add ECP system hooks here in the future (like registry call, etc...)
                result.unshift(this.createDeviceInfoTreeItem({
                    label: '📋 View Registry',
                    parent: element,
                    collapsibleState: vscode.TreeItemCollapsibleState.None,
                    tooltip: 'View the ECP Registry',
                    description: device.ip,
                    command: {
                        command: 'extension.brightscript.openRegistryInBrowser',
                        title: 'Open',
                        arguments: [device.ip]
                    }
                }));
            }
            result.unshift(this.createDeviceInfoTreeItem({
                label: '🔗 Open device web portal',
                parent: element,
                collapsibleState: vscode.TreeItemCollapsibleState.None,
                tooltip: 'Open the web portal for this device',
                description: device.ip,
                command: {
                    command: 'extension.brightscript.openUrl',
                    title: 'Open',
                    arguments: [`http://${device.ip}`]
                }
            }));
            // Return the device details
            return result;
        }
    }
    createDeviceInfoTreeItem(options) {
        var _a, _b, _c;
        const item = new DeviceInfoTreeItem(options.label, options.parent, options.collapsibleState, (_a = options.key) !== null && _a !== void 0 ? _a : `tree-item-${treeItemKeySequence++}`, (_b = options.description) !== null && _b !== void 0 ? _b : '', (_c = options.details) !== null && _c !== void 0 ? _c : '', options.command);
        // Prepare the open url command
        item.tooltip = options.tooltip;
        return item;
    }
    /**
     * Called by VS Code to get a given element.
     * Currently we don't modify this element so it is just returned back.
     * @param element the requested element
     */
    getParent(element) {
        return element === null || element === void 0 ? void 0 : element.parent;
    }
    /**
     * Called by VS Code to get a tree item for a given element.
     * Currently we don't modify this element so it is just returned back.
     * @param element the requested element
     */
    getTreeItem(element) {
        return element;
    }
    /**
     * Called by VS Code to resolve tool tips when not populated.
     * Currently we don't modify this element so it is just returned back.
     * @param element the requested element
     */
    resolveTreeItem(item, element) {
        return element;
    }
    concealObject(object, secretKeys) {
        return util_1.util.concealObject(object, this.isConcealDeviceInfoEnabled ? secretKeys : []);
    }
    /**
     * Given a string, return a new string with random numbers and letters of the same size.
     * Returns the same value for every input for the lifetime of the current extension uptime
     */
    concealString(value) {
        if (this.isConcealDeviceInfoEnabled) {
            return util_1.util.concealString(value);
        }
        else {
            return value;
        }
    }
}
exports.DevicesViewProvider = DevicesViewProvider;
class DeviceTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, key, details, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.key = key;
        this.details = details;
        this.command = command;
        this.parent = null;
    }
}
class DeviceInfoTreeItem extends vscode.TreeItem {
    constructor(label, parent, collapsibleState, key, description, details, command) {
        super(label, collapsibleState);
        this.label = label;
        this.parent = parent;
        this.collapsibleState = collapsibleState;
        this.key = key;
        this.description = description;
        this.details = details;
        this.command = command;
    }
}
/**
 * Provides file decorations for device tree items to color text based on device state
 */
class DeviceDecorationProvider {
    constructor() {
        this._onDidChangeFileDecorations = new vscode.EventEmitter();
        this.onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;
        this.deviceStates = new Map();
    }
    updateDevices(devices) {
        const changedUris = [];
        for (const device of devices) {
            const oldState = this.deviceStates.get(device.key);
            if (oldState !== device.deviceState) {
                this.deviceStates.set(device.key, device.deviceState);
                changedUris.push(vscode.Uri.parse(`${DEVICE_URI_SCHEME}:/${device.key}`));
            }
        }
        if (changedUris.length > 0) {
            this._onDidChangeFileDecorations.fire(changedUris);
        }
    }
    provideFileDecoration(uri) {
        if (uri.scheme !== DEVICE_URI_SCHEME) {
            return undefined;
        }
        const deviceKey = uri.path.slice(1); // Remove leading slash (key is "s:..." or "i:...")
        const state = this.deviceStates.get(deviceKey);
        if (state === 'pending' || state === 'offline') {
            return {
                color: new vscode.ThemeColor('disabledForeground')
            };
        }
        return undefined;
    }
}
//# sourceMappingURL=DevicesViewProvider.js.map