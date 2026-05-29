"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RokuReplViewProvider = void 0;
const BaseRdbViewProvider_1 = require("./BaseRdbViewProvider");
const ViewProviderCommand_1 = require("./ViewProviderCommand");
const ViewProviderId_1 = require("./ViewProviderId");
const JSZip = require("jszip");
const fsExtra = require("fs-extra");
const undent_1 = require("undent");
const roku_test_automation_1 = require("roku-test-automation");
const roku_debug_1 = require("roku-debug");
const getPort = require("get-port");
const path = require("path");
const os = require("os");
const brighterscript_1 = require("brighterscript");
class RokuReplViewProvider extends BaseRdbViewProvider_1.BaseRdbViewProvider {
    constructor(context, dependencies) {
        super(context, dependencies);
        this.id = ViewProviderId_1.ViewProviderId.rokuReplView;
        this.componentLibraryIncrementor = 0;
        this.componentLibraryFolder = path.join(os.tmpdir(), 'replComponentLibraryServer');
        this.componentLibraryFileName = 'repl.zip';
        this.componentLibraryHost = '';
        this.componentLibraryPort = 0;
        this.addMessageCommandCallback(ViewProviderCommand_1.ViewProviderCommand.sendReplRequest, async (message) => {
            try {
                // Verify the code is valid first
                const replBrsContents = this.getREPLBrs(message.context.replCode);
                const parser = brighterscript_1.Parser.parse(replBrsContents);
                if (parser.diagnostics.length > 0) {
                    this.postOrQueueMessage(this.createResponseMessage(message, {
                        replOutput: {
                            error: parser.diagnostics[0]
                        }
                    }));
                    return true;
                }
                if (!this.componentLibraryServer) {
                    this.componentLibraryServer = new roku_debug_1.ComponentLibraryServer();
                    this.componentLibraryPort = await getPort();
                    await fsExtra.ensureDir(this.componentLibraryFolder);
                    await this.componentLibraryServer.startStaticFileHosting(this.componentLibraryFolder, this.componentLibraryPort, console.log);
                }
                const zip = new JSZip();
                zip.file('manifest', this.getManifestContents());
                zip.file('components/REPL.xml', this.getREPLXml());
                zip.file('components/REPL.brs', replBrsContents);
                const content = await zip.generateAsync({ type: 'nodebuffer', compressionOptions: { level: 2 } });
                await fsExtra.outputFile(`${this.componentLibraryFolder}/${this.componentLibraryFileName}`, content);
                // Check if we already added the component library
                const { value } = await roku_test_automation_1.odc.getValue({
                    keyPath: '#replContainer.id'
                });
                if (!value) {
                    // We use the fact that the container doesn't exist to know we need to do our initial setup
                    // If it doesn't exist then add it
                    await roku_test_automation_1.odc.createChild({
                        subtype: 'Group',
                        fields: {
                            id: 'replContainer'
                        }
                    });
                    await roku_test_automation_1.odc.createChild({
                        keyPath: '#replContainer',
                        subtype: 'ComponentLibrary',
                        fields: {
                            id: 'replComponentLibrary'
                        }
                    });
                    // Figure out what network interface the Roku device is accessing us from
                    const { host } = await roku_test_automation_1.odc.getServerHost();
                    this.componentLibraryHost = host;
                }
                const url = `http://${this.componentLibraryHost}:${this.componentLibraryPort}/${this.componentLibraryFileName}?i=${this.componentLibraryIncrementor++}&rokuForce=.zip`;
                await roku_test_automation_1.odc.setValue({
                    keyPath: '#replContainer.#replComponentLibrary.uri',
                    value: url
                });
                await roku_test_automation_1.odc.onFieldChangeOnce({
                    keyPath: '#replContainer.#replComponentLibrary.loadStatus',
                    match: 'ready'
                });
                const replInstanceId = `replInstance${this.componentLibraryIncrementor}`;
                await roku_test_automation_1.odc.createChild({
                    keyPath: '#replContainer',
                    subtype: 'BrightScriptREPL:REPL',
                    fields: {
                        id: replInstanceId
                    }
                }, {
                    timeout: 60000 // All of the repl code will run during this operation
                });
                const replInstanceKeypath = `#replContainer.#${replInstanceId}`;
                const { value: replOutput } = await roku_test_automation_1.odc.onFieldChangeOnce({
                    keyPath: `${replInstanceKeypath}.output`,
                    match: {
                        keyPath: `${replInstanceKeypath}.output.finished`,
                        value: true
                    }
                });
                await roku_test_automation_1.odc.removeNode({
                    keyPath: replInstanceKeypath
                });
                this.postOrQueueMessage(this.createResponseMessage(message, {
                    replOutput: replOutput
                }));
            }
            catch (e) {
                this.postOrQueueMessage(this.createResponseMessage(message, {
                    replOutput: {
                        error: {
                            message: e.message
                        }
                    }
                }));
            }
            return true;
        });
    }
    getManifestContents() {
        const contents = (0, undent_1.undent) `
            title=BrightScript REPL
            sg_component_libs_provided=BrightScriptREPL
            hidden=1
            rsg_version=1.2
            major_version=1
            minor_version=0
            build_version=0
        `;
        return contents;
    }
    getREPLXml() {
        const contents = (0, undent_1.undent) `
            <?xml version="1.0" encoding="utf-8" ?>
            <component name="REPL" extends="Task" >
                <script type="text/brightscript" uri="REPL.brs" />
                <interface>
                    <field id="output" type="assocarray"/>
                </interface>
            </component>`;
        return contents;
    }
    getREPLBrs(replCode) {
        const contents = (0, undent_1.undent) `
            function init()
                replWrapper()
            end function

            function repl()
                ${replCode}
            end function

            function replWrapper()
                output = {}
                t = createObject("roTimespan")
                try
                    output.response = repl()
                catch e
                    output.error = e
                end try
                output["timeTaken"] = t.totalMilliseconds()
                output.finished = true
                m.top.output = output
            end function
            `;
        return contents;
    }
}
exports.RokuReplViewProvider = RokuReplViewProvider;
//# sourceMappingURL=RokuReplViewProvider.js.map