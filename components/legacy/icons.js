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
    /**
     * Get the correct icon for the device type
     */
    getDeviceType: (device) => {
        var _a, _b;
        if (((_a = device.deviceInfo) === null || _a === void 0 ? void 0 : _a['is-stick']) === 'true') {
            return exports.icons.streamingStick;
        }
        else if (((_b = device.deviceInfo) === null || _b === void 0 ? void 0 : _b['is-tv']) === 'true') {
            return exports.icons.tv;
            //fall back to settop box in all other cases
        }
        else {
            return exports.icons.setTopBox;
        }
    }
};
//# sourceMappingURL=icons.js.map