
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e6cff67d-afad-5139-a909-7be5de15dad2")}catch(e){}}();
(function(){"use strict";const{ipcRenderer:o,contextBridge:a,webFrame:i}=require("electron"),s=[".okta.com",".okta-emea.com",".oktapreview.com",".duosecurity.com",".duo.com",".login.microsoftonline.com",".onelogin.com",".auth0.com",".pingidentity.com",".pingone.com",".rippling.com"];function l(){try{const e=window.location.hostname.toLowerCase();if(!s.some(n=>e===n.slice(1)||e.endsWith(n)))return;i.executeJavaScript(`
				(function() {
					if (typeof navigator === 'undefined' || !navigator.permissions || !navigator.permissions.query) {
						return;
					}
					// Avoid double-patching
					if (navigator.permissions.__localNetworkPolyfillApplied) {
						return;
					}
					navigator.permissions.__localNetworkPolyfillApplied = true;

					const originalQuery = navigator.permissions.query.bind(navigator.permissions);
					navigator.permissions.query = async function(descriptor) {
						if (descriptor && (descriptor.name === 'local-network-access' || descriptor.name === 'local-network')) {
							return {
								state: 'granted',
								name: descriptor.name,
								onchange: null,
								addEventListener: function() {},
								removeEventListener: function() {},
								dispatchEvent: function() { return true; }
							};
						}
						return originalQuery(descriptor);
					};
				})();
			`)}catch(e){console.error("[BrowserView Preload] Failed to inject local network access polyfill:",e)}}function c(){try{i.executeJavaScript(`
				(function() {
					if (typeof navigator === 'undefined' || !navigator.credentials) {
						return;
					}
					if (navigator.credentials.__webAuthnPolyfillApplied) {
						return;
					}
					navigator.credentials.__webAuthnPolyfillApplied = true;

					var WEBAUTHN_NOTIFY_DELAY_MS = 10000;
					var WEBAUTHN_ABORT_DELAY_MS = 45000;
					var lastNotifiedPasskeyAt = 0;
					function notify() {
						var now = Date.now();
						if (now - lastNotifiedPasskeyAt < WEBAUTHN_NOTIFY_DELAY_MS) {
							return;
						}
						lastNotifiedPasskeyAt = now;
						try {
							if (window.cursorBrowser && window.cursorBrowser.send) {
								window.cursorBrowser.send('passkey-request-stalled');
							}
						} catch (error) {
							console.debug('[BrowserView Preload] Failed to notify passkey support status:', error);
						}
					}

					function createNotSupportedError() {
						return new DOMException(
							'WebAuthn is not supported in the Cursor browser.',
							'NotSupportedError'
						);
					}

					function createAbortError() {
						return new DOMException('The operation was aborted.', 'AbortError');
					}

					function createTimeoutError() {
						return new DOMException(
							'The WebAuthn request timed out in the Cursor browser.',
							'TimeoutError'
						);
					}

					var origCreate = navigator.credentials.create;
					var origGet = navigator.credentials.get;

					function wrapWebAuthnRequest(originalMethod, options, args) {
						if (!originalMethod) {
							return Promise.reject(createNotSupportedError());
						}

						var callerSignal = options && options.signal;
						if (callerSignal && callerSignal.aborted) {
							return Promise.reject(callerSignal.reason || createAbortError());
						}

						var abortController = typeof AbortController === 'function'
							? new AbortController()
							: undefined;
						var abortListener;
						var requestArgs = Array.prototype.slice.call(args);
						if (abortController) {
							requestArgs[0] = Object.assign({}, options, { signal: abortController.signal });
						}

						var notifyTimeout;
						var abortTimeout;
						var didFinish = false;
						var didNotify = false;
						function notifyIfNeeded() {
							if (didNotify) {
								return;
							}
							didNotify = true;
							notify();
						}
						function cleanup() {
							clearTimeout(notifyTimeout);
							clearTimeout(abortTimeout);
							if (callerSignal && abortListener) {
								callerSignal.removeEventListener('abort', abortListener);
							}
						}

						return new Promise(function(resolve, reject) {
							function resolveIfActive(value) {
								if (didFinish) {
									return;
								}
								didFinish = true;
								cleanup();
								resolve(value);
							}

							function rejectIfActive(error) {
								if (didFinish) {
									return;
								}
								didFinish = true;
								cleanup();
								reject(error);
							}

							if (callerSignal && callerSignal.addEventListener) {
								abortListener = function() {
									if (abortController) {
										abortController.abort();
									}
									rejectIfActive(callerSignal.reason || createAbortError());
								};
								callerSignal.addEventListener('abort', abortListener, { once: true });
							}

							notifyTimeout = setTimeout(function() {
								if (!didFinish) {
									notifyIfNeeded();
								}
							}, WEBAUTHN_NOTIFY_DELAY_MS);

							abortTimeout = setTimeout(function() {
								if (didFinish) {
									return;
								}
								notifyIfNeeded();
								if (abortController) {
									abortController.abort();
								}
								rejectIfActive(createTimeoutError());
							}, WEBAUTHN_ABORT_DELAY_MS);

							Promise.resolve().then(function() {
								return originalMethod.apply(navigator.credentials, requestArgs);
							}).then(
								resolveIfActive,
								rejectIfActive
							);
						});
					}

					navigator.credentials.create = function(options) {
						if (options && options.publicKey) {
							return wrapWebAuthnRequest(origCreate, options, arguments);
						}
						return origCreate ? origCreate.apply(navigator.credentials, arguments) : Promise.reject(createNotSupportedError());
					};

					navigator.credentials.get = function(options) {
						if (options && options.publicKey) {
							return wrapWebAuthnRequest(origGet, options, arguments);
						}
						return origGet ? origGet.apply(navigator.credentials, arguments) : Promise.reject(createNotSupportedError());
					};

					if (typeof PublicKeyCredential !== 'undefined') {
						PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable = function() {
							return Promise.resolve(false);
						};
						if (typeof PublicKeyCredential.isConditionalMediationAvailable === 'function') {
							PublicKeyCredential.isConditionalMediationAvailable = function() {
								return Promise.resolve(false);
							};
						}
					}
				})();
			`)}catch(e){console.error("[BrowserView Preload] Failed to inject WebAuthn polyfill:",e)}}l(),c();const u={send:(e,...r)=>{(e==="focus-url-bar"||e==="element-selected"||e==="element-updated"||e==="element-picked"||e==="keyboard-shortcut"||e==="area-screenshot-selected"||e==="style-changes-confirmed"||e==="css-inspector-style-change"||e==="passkey-request-stalled")&&o.send("vscode:browser-view-message",e,...r)}};try{a.exposeInMainWorld("cursorBrowser",u)}catch(e){console.error("[BrowserView Preload] Failed to expose bridge:",e)}window.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",e=>{if(!e.altKey)return;const r=e.target.closest("a[href]");if(!r)return;const t=r.href;!t||t.startsWith("javascript:")||(e.preventDefault(),e.stopPropagation(),o.send("vscode:browser-view-message","open-url-side-group",{url:t}))},!0)})})();

//# sourceMappingURL=http://go/sourcemap/sourcemaps/3e548838cf824b70851dd3ef27d0c6aae371b3f0/core/vs/platform/browserView/electron-main/preload-browser.js.map

//# debugId=e6cff67d-afad-5139-a909-7be5de15dad2
