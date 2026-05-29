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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamelJBangCodelens = void 0;
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
const vscode = __importStar(require("vscode"));
const extension = __importStar(require("../extension"));
const CODELENS_TITLE_DEBUG_INTEGRATION = 'Camel Debug with JBang';
const CODELENS_TITLE_RUN_INTEGRATION = 'Camel Run with JBang';
const JBANG_TOOLTIP = 'Take care that the integration file is in supported scope of Camel JBang and that jbang CLI is available on system path.';
class CamelJBangCodelens {
    onDidChangeCodeLenses;
    provideCodeLenses(document) {
        const fulltext = document.getText();
        if (fulltext.includes('from')
            && (fulltext.includes('to') || fulltext.includes('log'))) {
            const topOfDocument = new vscode.Range(0, 0, 0, 0);
            const debugCamelCommand = {
                command: extension.CAMEL_RUN_AND_DEBUG_WITH_JBANG_COMMAND_ID,
                title: CODELENS_TITLE_DEBUG_INTEGRATION,
                tooltip: 'Run integration file with Camel JBang and attach the Camel Debugger.\n'
                    + JBANG_TOOLTIP,
                arguments: [document.uri]
            };
            const runCamelCommand = {
                command: extension.CAMEL_RUN_WITH_JBANG_COMMAND_ID,
                title: CODELENS_TITLE_RUN_INTEGRATION,
                tooltip: 'Run integration file with Camel JBang.\n'
                    + JBANG_TOOLTIP,
                arguments: [document.uri]
            };
            return [new vscode.CodeLens(topOfDocument, debugCamelCommand), new vscode.CodeLens(topOfDocument, runCamelCommand)];
        }
        return [];
    }
}
exports.CamelJBangCodelens = CamelJBangCodelens;
//# sourceMappingURL=CamelJBangCodelens.js.map