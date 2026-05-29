"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsNewManager = void 0;
const vscode_1 = require("vscode");
const semver_1 = require("semver");
const vscode = require("vscode");
const FILE_SCHEME = 'bs-whatsNew';
class WhatsNewManager {
    constructor(globalStateManager, currentVersion) {
        this.globalStateManager = globalStateManager;
        this.currentVersion = currentVersion;
        /**
         * List of version numbers that should prompt the ReleaseNotes page.
         * these should be in highest-to-lowest order, because we will launch the highest version
         */
        this.notableReleaseVersions = [
            '2.31.0',
            '2.0.0'
        ];
        this.previousExtensionVersion = this.globalStateManager.lastRunExtensionVersion;
        vscode.workspace.registerTextDocumentContentProvider(FILE_SCHEME, {
            provideTextDocumentContent: async (uri) => {
                let doc = await vscode.workspace.openTextDocument(uri.with({ scheme: 'file' }));
                let contents = doc.getText();
                contents += [
                    `\n\n## Past notable releases`,
                    `For past releases please see our [Release Notes](https://rokucommunity.github.io/vscode-brightscript-language/release-notes/index.html) page on our documentation website. For a comprehensive list`,
                    `of all changes for each version see [CHANGELOG.md](https://github.com/rokucommunity/vscode-brightscript-language/blob/master/CHANGELOG.md).\n`
                ].join('\n');
                return contents;
            }
        });
    }
    async showWelcomeOrWhatsNewIfRequired() {
        let config = vscode.workspace.getConfiguration('brightscript');
        let isReleaseNotificationsEnabled = config.get('enableReleaseNotifications') === false ? false : true;
        //this is the first launch of the extension
        if (this.previousExtensionVersion === undefined) {
            //if release notifications are enabled
            //TODO once we have the welcome page content prepared, remove the `&& false` from the condition below
            if (isReleaseNotificationsEnabled && false) {
                let viewText = 'View the get started guide';
                let response = await vscode_1.window.showInformationMessage('Thank you for installing the BrightScript VSCode extension. Click the button below to read some tips on how to get the most out of this extension.', viewText);
                if (response === viewText) {
                    void vscode_1.env.openExternal(vscode.Uri.parse('https://github.com/rokucommunity/vscode-brightscript-language/blob/master/Welcome.md'));
                }
            }
            this.globalStateManager.lastSeenReleaseNotesVersion = this.currentVersion;
            return;
        }
        //uncomment the following line to test the WhatsNew popup
        // this.globalStateManager.lastSeenReleaseNotesVersion = '0.0.0';
        for (let releaseVersion of this.notableReleaseVersions) {
            if (
            //if the current version is larger than the whitelist version
            (0, semver_1.gte)(releaseVersion, this.previousExtensionVersion) &&
                //if the user hasn't seen this popup before
                this.globalStateManager.lastSeenReleaseNotesVersion !== releaseVersion &&
                //if ReleaseNote popups are enabled
                isReleaseNotificationsEnabled) {
                //mark this version as viewed
                this.globalStateManager.lastSeenReleaseNotesVersion = releaseVersion;
                let viewText = 'Release Notes';
                let viewOnWebText = 'View On Github';
                let response = await vscode_1.window.showInformationMessage(`BrightScript Language v${releaseVersion} includes significant changes from previous versions. Please take a moment to review the release notes.`, viewText, viewOnWebText);
                if (response === viewText) {
                    this.showReleaseNotes(releaseVersion);
                }
                else if (response === viewOnWebText) {
                    void vscode_1.env.openExternal(vscode.Uri.parse(`https://github.com/rokucommunity/vscode-brightscript-language/blob/master/release-notes/v${releaseVersion}.md`));
                }
                this.globalStateManager.lastSeenReleaseNotesVersion = this.currentVersion;
            }
        }
    }
    showReleaseNotes(version = this.notableReleaseVersions[0]) {
        if (this.notableReleaseVersions.includes(version)) {
            let uri = vscode.Uri.file(`${__dirname}/../../docs/release-notes/v${version}.md`);
            uri = uri.with({ scheme: FILE_SCHEME });
            void vscode.commands.executeCommand('markdown.showPreview', uri, { sideBySide: false });
        }
        else {
            console.error(`WhatsNewManager.showReleaseNotes: Unknown version: ${version}`);
        }
    }
}
exports.WhatsNewManager = WhatsNewManager;
//# sourceMappingURL=WhatsNewManager.js.map