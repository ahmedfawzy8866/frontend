"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamelJBangTaskProvider = void 0;
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
const glob_1 = require("glob");
const vscode_1 = require("vscode");
class CamelJBangTaskProvider {
    static labelProvidedRunWithDebugActivatedTask = "Start Opened Camel application with debug enabled with JBang";
    static labelProvidedRunTask = "Run with JBang Opened Camel Application";
    static labelProvidedRunAllWithDebugActivatedTask = "Start All Camel applications with debug enabled with JBang";
    static labelProvidedRunAllTask = "Run with JBang All Camel Applications";
    static labelProvidedRunAllFromContainingFolderWithDebugActivatedTask = "Start All Camel applications from containing folder with debug enabled with JBang";
    static labelProvidedRunAllFromContainingFolderTask = "Run with JBang All Camel Applications from containing folder";
    static labelProvidedDeployTask = "Deploy Integration with Apache Camel Kubernetes Run";
    static labelAddKubernetesPluginTask = "Camel JBang add Kubernetes plugin";
    provideTasks(_token) {
        const tasks = [];
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunAllWithDebugActivatedTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunAllTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderWithDebugActivatedTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelProvidedDeployTask));
        tasks.push(this.createTask(CamelJBangTaskProvider.labelAddKubernetesPluginTask));
        return tasks;
    }
    createTask(taskLabel) {
        switch (taskLabel) {
            case CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask:
                return this.createRunWithDebugTask(CamelJBangTaskProvider.labelProvidedRunWithDebugActivatedTask, '${fileBasename}', '${fileDirname}');
            case CamelJBangTaskProvider.labelProvidedRunTask:
                return this.createRunTask(CamelJBangTaskProvider.labelProvidedRunTask, '${fileBasename}', '${fileDirname}');
            case CamelJBangTaskProvider.labelProvidedRunAllWithDebugActivatedTask:
                return this.createRunWithDebugTask(CamelJBangTaskProvider.labelProvidedRunAllWithDebugActivatedTask, '*', undefined);
            case CamelJBangTaskProvider.labelProvidedRunAllTask:
                return this.createRunTask(CamelJBangTaskProvider.labelProvidedRunAllTask, '*', undefined);
            case CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderWithDebugActivatedTask:
                return this.createRunWithDebugTask(CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderWithDebugActivatedTask, '*', '${fileDirname}');
            case CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderTask:
                return this.createRunTask(CamelJBangTaskProvider.labelProvidedRunAllFromContainingFolderTask, '*', '${fileDirname}');
            case CamelJBangTaskProvider.labelProvidedDeployTask:
                return this.createDeployTask(CamelJBangTaskProvider.labelProvidedDeployTask, '${fileBasename}', '${fileDirname}');
            case CamelJBangTaskProvider.labelAddKubernetesPluginTask:
                return this.createAddKubernetesPluginTask('kubernetes', CamelJBangTaskProvider.labelAddKubernetesPluginTask);
            default:
                break;
        }
        throw new Error('Method not implemented.');
    }
    createDeployTask(taskLabel, patternForCamelFiles, cwd) {
        const shellExecOptions = {
            cwd: cwd
        };
        const deployTask = new vscode_1.Task({
            "label": taskLabel,
            "type": "shell"
        }, vscode_1.TaskScope.Workspace, taskLabel, 'camel', new vscode_1.ShellExecution('jbang', [
            {
                "value": `-Dcamel.jbang.version=${this.getCamelJBangCLIVersion()}`,
                "quoting": vscode_1.ShellQuoting.Strong
            },
            'camel@apache/camel',
            'kubernetes',
            'run',
            patternForCamelFiles,
            this.getCamelVersion(),
            ...this.getKubernetesExtraParameters()
        ].filter(function (arg) { return arg; }), // remove ALL empty values ("", null, undefined and 0)
        shellExecOptions));
        deployTask.isBackground = true;
        return deployTask;
    }
    createAddKubernetesPluginTask(plugin, taskLabel) {
        const addPluginTask = new vscode_1.Task({
            "label": taskLabel,
            "type": "shell"
        }, vscode_1.TaskScope.Workspace, taskLabel, 'camel', new vscode_1.ShellExecution('jbang', [
            {
                "value": `-Dcamel.jbang.version=${this.getCamelJBangCLIVersion()}`,
                "quoting": vscode_1.ShellQuoting.Strong
            },
            'camel@apache/camel',
            'plugin',
            'add',
            plugin
        ]));
        return addPluginTask;
    }
    async waitForTaskEnd(label) {
        await new Promise(resolve => {
            const disposable = vscode_1.tasks.onDidEndTask((e) => {
                if (e.execution.task.name === label) {
                    disposable.dispose();
                    resolve();
                }
            });
        });
    }
    createRunTask(taskLabel, patternForCamelFiles, cwd) {
        const shellExecOptions = {
            cwd: cwd
        };
        const runTask = new vscode_1.Task({
            "label": taskLabel,
            "type": "shell"
        }, vscode_1.TaskScope.Workspace, taskLabel, 'camel', new vscode_1.ShellExecution('jbang', [
            {
                "value": `-Dcamel.jbang.version=${this.getCamelJBangCLIVersion()}`,
                "quoting": vscode_1.ShellQuoting.Strong
            },
            'camel@apache/camel',
            'run',
            patternForCamelFiles,
            '--dev',
            '--logging-level=info',
            this.getCamelVersion(),
            this.getRedHatMavenRepository(),
            ...this.getExtraLaunchParameter()
        ].filter(function (arg) { return arg; }), // remove ALL empty values ("", null, undefined and 0)
        shellExecOptions));
        runTask.isBackground = true;
        return runTask;
    }
    createRunWithDebugTask(taskLabel, patternForCamelFiles, cwd) {
        const taskDefinition = {
            "label": taskLabel,
            "type": "shell"
        };
        const shellExecOptions = {
            // see https://issues.apache.org/jira/browse/CAMEL-20431
            env: {
                'CAMEL_DEBUGGER_SUSPEND': 'true'
            },
            cwd: cwd
        };
        const runWithDebugActivatedTask = new vscode_1.Task(taskDefinition, vscode_1.TaskScope.Workspace, taskLabel, 'camel', new vscode_1.ShellExecution('jbang', [
            {
                "value": `-Dcamel.jbang.version=${this.getCamelJBangCLIVersion()}`,
                "quoting": vscode_1.ShellQuoting.Strong
            },
            {
                "value": '-Dorg.apache.camel.debugger.suspend=true',
                "quoting": vscode_1.ShellQuoting.Strong
            },
            'camel@apache/camel',
            'run',
            patternForCamelFiles,
            '--dev',
            '--logging-level=info',
            {
                "value": '--dep=org.apache.camel:camel-debug',
                "quoting": vscode_1.ShellQuoting.Strong
            },
            this.getCamelVersion(),
            this.getRedHatMavenRepository(),
            ...this.getExtraLaunchParameter()
        ].filter(function (arg) { return arg; }), // remove ALL empty values ("", null, undefined and 0)
        shellExecOptions), '$camel.debug.problemMatcher');
        runWithDebugActivatedTask.isBackground = true;
        runWithDebugActivatedTask.presentationOptions.reveal = vscode_1.TaskRevealKind.Always;
        return runWithDebugActivatedTask;
    }
    resolveTask(_task, _token) {
        return undefined;
    }
    getCamelJBangCLIVersion() {
        return vscode_1.workspace.getConfiguration().get('camel.debugAdapter.JBangVersion');
    }
    getCamelVersion() {
        const camelVersion = vscode_1.workspace.getConfiguration().get('camel.debugAdapter.CamelVersion');
        if (camelVersion) {
            return `--camel-version=${camelVersion}`;
        }
        else {
            return '';
        }
    }
    getCamelGlobalRepos() {
        const globalRepos = vscode_1.workspace.getConfiguration().get('camel.debugAdapter.redHatMavenRepository.global');
        if (globalRepos) {
            return '#repos,';
        }
        else {
            return '';
        }
    }
    getRedHatMavenRepository() {
        if (this.getCamelVersion().includes('redhat')) {
            const url = vscode_1.workspace.getConfiguration().get('camel.debugAdapter.RedHatMavenRepository');
            const reposPlaceholder = this.getCamelGlobalRepos();
            return url ? `--repos=${reposPlaceholder}${url}` : '';
        }
        else {
            return '';
        }
    }
    getExtraLaunchParameter() {
        const extraLaunchParameter = vscode_1.workspace.getConfiguration().get('camel.debugAdapter.ExtraLaunchParameter');
        if (extraLaunchParameter) {
            return this.handleMissingXslFiles(extraLaunchParameter);
        }
        else {
            return [];
        }
    }
    /**
     * Mainly in ZSH shell there is problem when camel jbang is executed with non existing files added using '*.xsl' file pattern
     * it is caused by ZSH null glob option disabled by default for ZSH shell
     */
    handleMissingXslFiles(extraLaunchParameters) {
        const workspaceFolders = vscode_1.workspace.workspaceFolders;
        if (workspaceFolders !== undefined && workspaceFolders.length !== 0) {
            const xsls = (0, glob_1.globSync)(`${workspaceFolders[0].uri.path}/**/*.xsl`).length > 0;
            if (xsls) {
                return extraLaunchParameters; // don't modify default extra launch parameters specified via settings which should by default contain *.xsl
            }
            else {
                return extraLaunchParameters.filter(parameter => parameter !== '*.xsl');
            }
        }
        else {
            return extraLaunchParameters.filter(parameter => parameter !== '*.xsl');
        }
    }
    getKubernetesExtraParameters() {
        const extraParameters = vscode_1.workspace.getConfiguration().get('camel.debugAdapter.KubernetesRunParameters');
        if (extraParameters) {
            return extraParameters;
        }
        else {
            return [];
        }
    }
}
exports.CamelJBangTaskProvider = CamelJBangTaskProvider;
//# sourceMappingURL=CamelJBangTaskProvider.js.map