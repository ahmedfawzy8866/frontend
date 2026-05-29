"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.icons = void 0;
const vscode = require("vscode");
exports.icons = {
    streamingStick: {
        light: vscode.Uri.file(`${__dirname}/../images/icons/streaming-stick-light.svg`),
        dark: vscode.Uri.file(`${__dirname}/../images/icons/streaming-stick-dark.svg`)
    },
    tv: {
        light: vscode.Uri.file(`${__dirname}/../images/icons/tv-light.svg`),
        dark: vscode.Uri.file(`${__dirname}/../images/icons/tv-dark.svg`)
    },
    setTopBox: {
        light: vscode.Uri.file(`${__dirname}/../images/icons/set-top-box-light.svg`),
        dark: vscode.Uri.file(`${__dirname}/../images/icons/set-top-box-dark.svg`)
    },
    radioTower: {
        light: vscode.Uri.file(`${__dirname}/../images/icons/radio-tower-light.svg`),
        dark: vscode.Uri.file(`${__dirname}/../images/icons/radio-tower-dark.svg`)
    },
    radioTowerOff: {
        light: vscode.Uri.file(`${__dirname}/../images/icons/radio-tower-off-light.svg`),
        dark: vscode.Uri.file(`${__dirname}/../images/icons/radio-tower-off-dark.svg`)
    },
    /**
     * Get the correct icon for the device type
     */
    getDeviceType: (deviceInfo) => {
        if ((deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo['is-stick']) === 'true') {
            return exports.icons.streamingStick;
        }
        else if ((deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo['is-tv']) === 'true') {
            return exports.icons.tv;
            //fall back to settop box in all other cases
        }
        else {
            return exports.icons.setTopBox;
        }
    }
};
//# sourceMappingURL=icons.js.map