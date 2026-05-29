"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertSameEnvs = exports.sortedEnvs = exports.getEnvsWithUpdates = exports.getEnvs = exports.SimpleLocator = exports.createNamedEnv = exports.createBasicEnv = exports.createLocatedEnv = void 0;
const chai_1 = require("chai");
const path = require("path");
const async_1 = require("../../../client/common/utils/async");
const platform_1 = require("../../../client/common/utils/platform");
const version_1 = require("../../../client/common/utils/version");
const info_1 = require("../../../client/pythonEnvironments/base/info");
const env_1 = require("../../../client/pythonEnvironments/base/info/env");
const pythonVersion_1 = require("../../../client/pythonEnvironments/base/info/pythonVersion");
const locator_1 = require("../../../client/pythonEnvironments/base/locator");
const core_1 = require("../../core");
function createLocatedEnv(locationStr, versionStr, kind = info_1.PythonEnvKind.Unknown, exec = 'python', distro = { org: '' }, searchLocation) {
    const location = locationStr === ''
        ? ''
        : path.normalize(locationStr);
    let executable;
    if (typeof exec === 'string') {
        const normalizedExecutable = path.normalize(exec);
        executable =
            location === '' || path.isAbsolute(normalizedExecutable)
                ? normalizedExecutable
                : path.join(location, 'bin', normalizedExecutable);
    }
    const version = versionStr === ''
        ? (0, pythonVersion_1.getEmptyVersion)()
        : (0, pythonVersion_1.parseVersion)(versionStr);
    const env = (0, env_1.buildEnvInfo)({
        kind,
        executable,
        location,
        version,
        searchLocation,
    });
    env.arch = (0, platform_1.getArchitecture)();
    env.distro = distro;
    if (typeof exec !== 'string') {
        env.executable = exec;
    }
    return env;
}
exports.createLocatedEnv = createLocatedEnv;
function createBasicEnv(kind, executablePath, source, envPath) {
    const basicEnv = { executablePath, kind, source, envPath };
    if (!source) {
        delete basicEnv.source;
    }
    if (!envPath) {
        delete basicEnv.envPath;
    }
    return basicEnv;
}
exports.createBasicEnv = createBasicEnv;
function createNamedEnv(name, versionStr, kind, exec = 'python', distro) {
    const env = createLocatedEnv('', versionStr, kind, exec, distro);
    env.name = name;
    return env;
}
exports.createNamedEnv = createNamedEnv;
class SimpleLocator extends locator_1.Locator {
    constructor(envs, callbacks = {}, options) {
        super();
        this.envs = envs;
        this.callbacks = callbacks;
        this.options = options;
        this.providerId = 'SimpleLocator';
        this.deferred = (0, async_1.createDeferred)();
    }
    get done() {
        return this.deferred.promise;
    }
    fire(event) {
        this.emitter.fire(event);
    }
    iterEnvs(query) {
        var _a;
        const { deferred } = this;
        const { callbacks } = this;
        let { envs } = this;
        const iterator = (async function* () {
            if ((callbacks === null || callbacks === void 0 ? void 0 : callbacks.onQuery) !== undefined) {
                envs = await callbacks.onQuery(query, envs);
            }
            if (callbacks.before !== undefined) {
                await callbacks.before();
            }
            if (callbacks.beforeEach !== undefined) {
                const mapped = (0, async_1.mapToIterator)(envs, async (env) => {
                    await callbacks.beforeEach(env);
                    return env;
                });
                for await (const env of (0, async_1.iterable)(mapped)) {
                    yield env;
                    if (callbacks.afterEach !== undefined) {
                        await callbacks.afterEach(env);
                    }
                }
            }
            else {
                for (const env of envs) {
                    yield env;
                    if (callbacks.afterEach !== undefined) {
                        await callbacks.afterEach(env);
                    }
                }
            }
            if ((callbacks === null || callbacks === void 0 ? void 0 : callbacks.after) !== undefined) {
                await callbacks.after();
            }
            deferred.resolve();
        })();
        iterator.onUpdated = (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onUpdated;
        return iterator;
    }
    async resolveEnv(env) {
        var _a, _b;
        const envInfo = createLocatedEnv('', '', undefined, env);
        if (this.callbacks.resolve === undefined) {
            return envInfo;
        }
        if (((_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.resolve) === null) {
            return undefined;
        }
        return this.callbacks.resolve(((_b = this.options) === null || _b === void 0 ? void 0 : _b.resolveAsString) ? env : envInfo);
    }
}
exports.SimpleLocator = SimpleLocator;
async function getEnvs(iterator) {
    return (0, async_1.flattenIterator)(iterator);
}
exports.getEnvs = getEnvs;
async function getEnvsWithUpdates(iterator, iteratorUpdateCallback = core_1.noop) {
    const envs = [];
    const updatesDone = (0, async_1.createDeferred)();
    if (iterator.onUpdated === undefined) {
        updatesDone.resolve();
    }
    else {
        const listener = iterator.onUpdated((event) => {
            if ((0, locator_1.isProgressEvent)(event)) {
                if (event.stage !== locator_1.ProgressReportStage.discoveryFinished) {
                    return;
                }
                updatesDone.resolve();
                listener.dispose();
            }
            else {
                const { index, update } = event;
                envs[index] = update;
            }
        });
    }
    let itemIndex = 0;
    for await (const env of iterator) {
        if (envs[itemIndex] === undefined) {
            envs[itemIndex] = env;
        }
        itemIndex += 1;
    }
    iteratorUpdateCallback();
    await updatesDone.promise;
    return envs.filter((e) => e !== undefined).map((e) => e);
}
exports.getEnvsWithUpdates = getEnvsWithUpdates;
function sortedEnvs(envs) {
    return envs.sort((env1, env2) => {
        const env1str = `${env1.kind}-${env1.executable.filename}-${(0, version_1.getVersionString)(env1.version)}`;
        const env2str = `${env2.kind}-${env2.executable.filename}-${(0, version_1.getVersionString)(env2.version)}`;
        return env1str.localeCompare(env2str);
    });
}
exports.sortedEnvs = sortedEnvs;
function assertSameEnvs(envs, expected) {
    (0, chai_1.expect)(sortedEnvs(envs)).to.deep.equal(sortedEnvs(expected));
}
exports.assertSameEnvs = assertSameEnvs;
//# sourceMappingURL=common.js.map