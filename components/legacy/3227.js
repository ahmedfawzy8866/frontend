"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9789f1cf-0cdf-5e36-a473-562f72b529d4")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[3227,5381],{62720:(e,t,r)=>{r.d(t,{JW:()=>o,d7:()=>s});var n=r(16335);let i=n.object({type:n.constant("ApiError"),message:n.string,code:n.string,extra:n.unknown,status:n.number,headers:n.dict(n.string),module:n.string,operation:n.string,rawBody:n.optional(n.string)});function s(e){return i.decode(e).ok}let a=n.object({type:n.constant("PayloadError"),module:n.nonEmptyString,resourceKind:n.string,error:n.string,payload:n.unknown});function o(e){return a.decode(e).ok}},36213:(e,t,r)=>{r.d(t,{Al:()=>_,Dc:()=>C,F_:()=>H,KA:()=>U,sF:()=>T});var n=r(38792),i=r.n(n),s=r(62720),a=r(45281),o=r(24656),l=r(91159),c=r(39629),u=r(3460),d=r(93964),p=r(10732),g=r(51555),f=r(93480);let m=/['":#\[\(\{\d]/;function h(e){return{type:u.Ww.v2.generic,cause:void 0,name:e.clientErrorCode,message:e.message,details:e.clientErrorHistory,fingerprint:e.fingerprint,trackError:e.trackError,userHint:e.userHint,stack:e.stack,statusCode:void 0}}function y(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=$({fingerprint:[],trackError:"default"},e),n=i()(e.details,{})?void 0:e.details;return{cause:t?x(e.cause):void 0,details:n,message:e.message,name:e.name,stack:e.stack,statusCode:e.statusCode,type:e.type,trackError:r.trackError,troubleshootingUrl:e.troubleshootingUrl,userHint:e.userHint,fingerprint:r.fingerprint}}function b(e){let{fp:t,nameTemplate:r}=e;return r+"/"+t.trim().split(/\s+/).map(e=>(e[0]??"").toUpperCase()+e.slice(1)).join("")}function v(e,t){let r=Object(t);for(let t of Object.keys(r)){let n=RegExp("\\{"+t+"\\}+","g"),i=function e(t){return null==t?"n/a":Array.isArray(t)?t.map(e).join(", "):"object"==typeof t?JSON.stringify(t):String(t)}(r[t]);e=e.replace(n,i)}return e=e.replace(/{+(\w+)}+/g,"(missing: $1)")}let E=(0,o.n)((e,t)=>{if(t instanceof Date)return t.toISOString();if(null===t)return null;switch(typeof t){case"bigint":case"symbol":return t.toString();case"number":case"boolean":case"string":case"undefined":return t;case"object":if(Array.isArray(t))return t.map((e,t)=>E(t.toString(10),e));let r=(0,p.H)(e,t);if(r)return r;try{let e={};for(let r of Object.getOwnPropertyNames(t))"trackError"!==r&&"cause"!==r&&"fingerprint"!==r&&"fingerprintValue"!==r&&"troubleshootingUrl"!==r&&"userHint"!==r&&(e[r]=E(r,t[r]));return"name"in t&&(e.name=E("name",t.name)),e}catch(e){return`${t?.toString()} (${e})`}case"function":return}},"[Recursion]");function w(e){return e instanceof Error&&"MongoServerError"===e.name}function x(e){switch(typeof e){case"string":return{name:"Error",message:e};case"boolean":case"bigint":case"number":case"symbol":return x({name:"Generic"+(0,l.ZH)(typeof e),[typeof e]:e});case"function":case"undefined":return;case"object":{if(null==e)return;if(e instanceof H)return{cause:x(e.cause),details:e.details,message:e.message,name:e.name,stack:e.stack,statusCode:e.statusCode,type:e.type};if(k(e))return e;if((0,g.f8)(e))return{message:"The operation failed after too many attempts",name:"TooManyTriesError",details:{lastResult:e.getLastResult()},stack:e.stack};if((0,s.d7)(e)){let t=`${e.module} ${e.operation}: ${e.code} (${e.status})`;return{message:e.message,name:t,details:e,fingerprint:[t]}}if(e instanceof Error&&"Decoding error"===e.name)return{name:"DecodingError",details:e.message,message:"Failed to decode data",stack:e.stack};if(e instanceof AggregateError)return e.errors.map(e=>x(e)).filter(c.zz).flat();if(Array.isArray(e))return e.map(e=>x(e)).filter(c.zz).flat();if(e instanceof Error){let{name:t,stack:r,message:n,...i}=e;return{cause:x(e.cause),name:t,message:n,stack:r,details:i}}if((0,d.V)(e))return h(e);if((0,s.JW)(e)){let t=`${e.module} ${e.resourceKind}`;return{message:`${e.module} failed to parse ${e.resourceKind}`,name:t,details:E("PayloadError",e),fingerprint:[t]}}if(e instanceof AggregateError)return{message:"error occurred",name:"AggregateError",details:E("unknownObject",e)};if(w(e)&&e.codeName){let{message:t,name:r,stack:n,...i}=Object(E("MongoServerError",e));return{message:e.message,name:`MongoServerError:${e.codeName}`,stack:n,details:i,cause:x(e.cause)}}let{message:t,name:r,stack:n,...i}=Object(E("unknownObject",e));return{message:t||"Unspecified error cause",name:r||"GenericObject",stack:n,details:i,cause:x(Object(e).cause)}}}}function k(e){return u.qf.decode(e).ok}function $(e,t){var r,n;let i=Object(t);if(e.trackError=(r=e.trackError,n=Object(t).trackError,"default"!==r?r:void 0!==n?n:r),_(t))switch(t.type){case u.Ww.v2.generic:if(t instanceof z)return(0,a.tM)(e.fingerprint,t.fingerprint),e;case u.Ww.v2.known:case u.Ww.v2.api:if(e.fingerprint.push("General:AssertionError"===t.name?O:t.name),i.cause)return $(e,i.cause);return e}else if((0,s.d7)(t)){let r=`${t.module} ${t.operation}: ${t.code} (${t.status})`;return e.fingerprint.push(r),e}else if((0,s.JW)(t)){let r=`${t.module} ${t.resourceKind}`;return e.fingerprint.push(r),e}else{if((0,d.V)(t))return(0,a.tM)(e.fingerprint,t.fingerprint??[t.clientErrorCode??"unknown"]),e;if(t instanceof AggregateError||Array.isArray(t))return e.fingerprint.push("AggregateError"),e;if(w(t)&&t.codeName)return e.fingerprint.push(`MongoServerError:${t.codeName}`),e;let r=function(e){if("object"==typeof e&&null!==e){let t=Object(e).name??"GenericObject",r=function(e){if(!e)return;if(e.startsWith("Cannot read propert"))return e;let t=e.search(m);return -1===t?e:e.substring(0,t).trim()}(String(Object(e).message||""));return e instanceof TypeError||e instanceof RangeError||e instanceof ReferenceError||e instanceof SyntaxError||e instanceof EvalError?O:("Error"===t||"GenericObject"===t)&&r?`${t}: ${r}`:t}return"string"==typeof e?e:"Generic"+(0,l.ZH)(typeof e)}(t);return r&&e.fingerprint.push(r),e}}function*S(e){let t=e;for(;_(t);)yield t,t=t.cause}function A(e,t){let r=RegExp("^"+t+"(?:\\/.*)?$");for(let t of S(e))if(r.test(t.name))return!0;return!1}function j(e,t){return!!_(e)&&RegExp("^"+t+"(?:\\/.*)?$").test(e.name)}let O="{{ default }}";function _(e){return"object"==typeof e&&null!==e&&"type"in e&&u.Ww.v2.all.includes(e.type)}function C(e){return"object"==typeof e&&null!==e&&!("cause"in e)&&!("stack"in e)&&!("details"in e)&&!("statusCode"in e)&&!("attachments"in e)&&"message"in e&&"trackError"in e&&"type"in e&&"fingerprint"in e&&u.Ww.v2.all.includes(e.type)}class H extends Error{static #e=this.applyCustomFootprint=b;static #t=this.renderMessage=v;static #r=this.is=A;static #n=this.isExact=j;constructor(e,t,r,n){let i=r.cause instanceof Error?r.cause:Array.isArray(r.cause)?AggregateError(r.cause):r.cause?T.from(r.cause):void 0;super(e,{cause:i}),this.name=e,this.message=t,this.type=u.Ww.v2.known,n&&(this.stack=n),this.message=t,this.details=E("details",r);let s=(0,f.Bh)({name:e,cause:i},r??{});this.trackError=s.trackError??"default",this.troubleshootingUrl=s.troubleshootingUrl,this.userHint=s.userHint}addAttachment(e){this.attachments||(this.attachments=[]),this.attachments.push(e)}toJSON(){return y(this)}toString(){return this.stack??this.name+": "+this.message}toLightweightError(){let{stack:e,trackError:t,fingerprint:r}=y(this,!1);return{name:this.name,message:this.message,userHint:this.userHint&&v(this.userHint,this.details),fingerprint:r,troubleshootingUrl:this.troubleshootingUrl,trackError:t,type:this.type}}}class T extends H{static #e=this.errorChain=S;static from(e,t){if(e instanceof H)return e;if("object"==typeof e&&null!==e&&"tag"in e&&"error.bardeen.ai/server"===e.tag)return z.fromServer({bardeenErrorCode:e.code,...e});if((0,s.d7)(e))return new U(e);if(k(e))return z.fromSerialized(e);if(u.N7.decode(e).ok)return z.fromServer(e);if((0,d.V)(e)){let t=h(e);return z.from({cause:t})}return z.from({cause:e,...t})}static withFallback(e,t){return _(e)?T.from(e):t()}constructor(...e){super(...e),this.type=u.Ww.v2.known}}class z extends H{static fromSerialized(e){return new z(e)}static fromServer(e){let t="object"==typeof e.errorDetails?Object(e.errorDetails):{};return new z({message:e.message||e.bardeenErrorCode,name:e.bardeenErrorCode,fingerprint:[e.bardeenErrorCode],userHint:e.userHint,troubleshootingUrl:e.troubleshootingUrl,trackError:"default",type:u.Ww.v2.generic,details:{...t,reqId:e.reqId,sessionId:e.sessionId}})}static from(e){let{cause:t,trackError:r,troubleshootingUrl:n,userHint:i,statusCode:s}=e;if(t instanceof H)return t;let a=x(t);a?Array.isArray(a)&&(a={cause:a,message:"Unspecified error",name:"AggregateError"}):a={cause:void 0,message:"Unspecified error",name:"GenericError"};let o=$({fingerprint:[],trackError:r??"default"},t);return new z({...a,fingerprint:o.fingerprint,trackError:o.trackError,troubleshootingUrl:n,userHint:i,statusCode:s,type:u.Ww.v2.generic})}constructor(e){super(e.name,e.message,{...e.details||{},trackError:e.trackError,troubleshootingUrl:e.troubleshootingUrl,userHint:e.userHint,cause:e.cause},e.stack),this.type=e.type,e.stack||(e={...e,stack:this.stack}),this.serialized=e}toJSON(){return this.serialized}get fingerprint(){return this.serialized.fingerprint}}class U extends H{static is(e){return e instanceof U}constructor(e,t){let{module:r,operation:n,code:i,status:s,headers:a,message:o,type:l,...c}=e,d=`${e.module} ${e.operation}: ${e.code} (${e.status})`;super(d,e.message,{}),this.type=u.Ww.v2.api,this.code=e.code,this.headers=e.headers,this.module=e.module,this.operation=e.operation,this.status=e.status;let p=(0,f.Bh)({name:d,type:u.Ww.v2.api},t??{});this.trackError=p.trackError??"default",this.troubleshootingUrl=p.troubleshootingUrl,this.userHint=p.userHint,this.details=E("details",{status:e.status,headers:e.headers,url:t?.url,extra:t?.extra,...c}),this.attachments=e.rawBody?[{filename:(0,g.Hr)(e.module+" "+e.operation+".txt"),data:e.rawBody,contentType:"text/plain"}]:[]}toJSON(){return{cause:void 0,details:this.details,fingerprint:[this.name],message:this.message,name:this.name,stack:this.stack,trackError:this.trackError,troubleshootingUrl:this.troubleshootingUrl,userHint:this.userHint,type:this.type}}}},3460:(e,t,r)=>{r.d(t,{N7:()=>o,Ww:()=>n,qf:()=>a});var n,i=r(16335);r(36213),function(e){var t;(t=e.v2||(e.v2={})).known="error.bardeen.ai/v2",t.api="error.bardeen.ai/v2-api",t.generic="error.bardeen.ai/v2-generic",t.all=[t.known,t.api,t.generic]}(n||(n={})),i.object({name:i.optional(i.string),message:i.string,fingerprint:i.optional(i.array(i.string)),userHint:i.optional(i.string),troubleshootingUrl:i.optional(i.string),trackError:i.optional(i.oneOf([!0,!1,"default"])),type:i.optional(i.oneOf(n.v2.all))}).transform(e=>({name:e.name??"Error",message:e.message,fingerprint:e.fingerprint??[e.name??e.message],userHint:e.userHint,troubleshootingUrl:e.troubleshootingUrl,trackError:e.trackError??"default",type:e.type??"error.bardeen.ai/v2-generic"}));let s=i.object({cause:i.optional(i.lazy(()=>s)),message:i.string,name:i.nonEmptyString,stack:i.optional(i.nonEmptyString)}),a=i.object({cause:i.optional(i.either(i.array(s),s)),details:i.optional(i.unknown),fingerprint:i.array(i.nonEmptyString),fingerprintValue:i.optional(i.nonEmptyString),message:i.string,name:i.nonEmptyString,stack:i.optional(i.string),statusCode:i.optional(i.positiveInteger),troubleshootingUrl:i.optional(i.string),userHint:i.optional(i.string),trackError:i.oneOf([!0,!1,"default"]),type:i.oneOf(n.v2.all)}),o=i.object({bardeenErrorCode:i.nonEmptyString,message:i.optional(i.string),userHint:i.optional(i.string),troubleshootingUrl:i.optional(i.string),errorDetails:i.optional(i.unknown),reqId:i.optional(i.either(i.string,i.number)),sessionId:i.optional(i.string)});i.inexact({clientErrorCode:i.optional(i.nonEmptyString),type:i.optional(i.oneOf(n.v2.all))}).pipe(e=>e.clientErrorCode?i.object({clientErrorCode:i.string,clientErrorDetails:i.optional(i.record(i.unknown),e),message:i.string,stack:i.optional(i.string),userHint:i.optional(i.string),fingerprint:i.array(i.string)}):a)},93964:(e,t,r)=>{r.d(t,{V:()=>o});var n=r(16335);let i=n.record(n.unknown),s=n.object({clientErrorCode:n.string,clientErrorDetails:n.optional(i),message:n.string,stack:n.optional(n.string),userHint:n.optional(n.string),fingerprint:n.array(n.string)}),a=n.object({trackError:n.oneOf([!0,!1,"default"]),clientErrorCode:n.nonEmptyString,clientErrorDetails:n.optional(i),message:n.nonEmptyString,stack:n.optional(n.nonEmptyString),userHint:n.optional(n.nonEmptyString),fingerprint:n.array(n.nonEmptyString),clientErrorHistory:n.array(s)});function o(e){return a.decode(e).ok}},10732:(e,t,r)=>{r.d(t,{H:()=>n});function n(e,t){let r;if("object"!=typeof t||null===t)return null;try{r=t.constructor.name}catch(e){r=String(e)}return r.includes("Response")||r.includes("Request")||r.includes("IncomingMessage")||r.includes("OutgoingMessage")||r.includes("HttpResponse")||"statusCode"in t&&"headers"in t||"$response"===e||"$request"===e?{status:Object(t).status,statusCode:Object(t).statusCode,statusMessage:Object(t).statusMessage,statusText:Object(t).statusText,type:r,url:Object(t).url}:null}},51555:(e,t,r)=>{function n(e){return e.replace(/[#%&{}\/\\<>*?$!'":@+`|=]/g,"_").replace(/[\x00-\x1f\x80-\x9f]/g,"_").replace(/^\.+$/,"_").replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,"_").replace(/[. ]+$/,"").trim().replace(/\s+/g,"_")}function i(e){return"object"==typeof e&&null!==e&&"tooManyTries"in e&&!0===e.tooManyTries}r.d(t,{Hr:()=>n,f8:()=>i})},93480:(e,t,r)=>{r.d(t,{Bh:()=>l});var n=r(16335),i=r(69182),s=r.n(i);n.record(n.object({url:n.optional(n.string),userHint:n.optional(n.string),trackError:n.optional(n.boolean)}));let a={};function o(e){return s()(e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_:\/]+/g,"-"),{strict:!0}).toLowerCase()}function l(e,t){let r={trackError:t.trackError??"default"};t.troubleshootingUrl&&(r.troubleshootingUrl=t.troubleshootingUrl),t.userHint&&(r.userHint=t.userHint);let n=!1,i=!1,s=!1;for(let t of function*(e){let t=[],r=e;for(;r;){var n;if("object"==typeof(n=r)&&null!==n&&"name"in n&&"string"==typeof n.name){let e="error.bardeen.ai/v2-api"===r.type,n=r.name.indexOf("/");if(e||-1===n)t.push(o(r.name));else{let[e,n]=r.name.split("/");t.push(o(e)),t.push(o(n))}r=r.cause}else break}for(;t.length>0;)yield t.join("-"),t.pop()}(e)){let e=a[t];if(e&&(e.url&&!n&&(r.troubleshootingUrl=e.url,n=!0),e.userHint&&!i&&(r.userHint=e.userHint,i=!0),void 0===e.trackError||s||(r.trackError=e.trackError,s=!0),n&&i&&s))break}return r}},37217:(e,t,r)=>{r.d(t,{I:()=>u});var n=r(64632),i=r(36266),s=r(50798),a=r(70919),o=r(10);let l=null;function c(e){return l||(l=function(e){let t="undefined"!=typeof window||"undefined"!=typeof ServiceWorkerGlobalScope&&self instanceof ServiceWorkerGlobalScope?new s.V:new o.L;return new i.V({module:"browser",filters:[n.o],transports:[t,new a.I],bindings:e})}(e)),l}let u={getLogger:(e,t)=>{let{log:r}=c();return r.child(e,t)},getLogProviderSingleton:c}},88559:(e,t,r)=>{r.d(t,{L:()=>i});var n=r(36213);class i extends n.F_{static #e=this.nameTemplate="Log:TransportFailed";static #t=this.is=e=>n.F_.is(e,i.nameTemplate);static #r=this.isExact=e=>n.F_.isExact(e,i.nameTemplate);constructor(e){super(n.F_.applyCustomFootprint({fp:e.transport,nameTemplate:i.nameTemplate}),"a log Transport failed to handle a log message",e)}}},64632:(e,t,r)=>{r.d(t,{o:()=>s});var n=r(52849),i=r(86659);let s=(e,t)=>{let r=i.US.get(),s=r.enforceLogLevel??t??r.defaultLevel;return n.$[e.level]>=s}},11519:(e,t,r)=>{r.d(t,{X:()=>c});var n=r(36213),i=r(45281),s=r(39629),a=r(72219),o=r(34696);let l="(no message)";class c{constructor(e="root",t,r,n){this.module=e,this.processor=t,this.bindings=r,this.level=n}silly(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("silly",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}debug(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("debug",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}info(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("info",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}warn(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("warn",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}error(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("error",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}fatal(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let n=u("fatal",this.module,this.bindings,...t);n&&this.processor.handle(n,this.level)}child(e,t){e=(0,o.k)(e);let r=this.module;this.module&&""!==e?r=`${this.module}.${e}`:""===this.module&&(r=e);let n=this.bindings&&t?(0,a.v)(this.bindings,t):t??this.bindings;return new c(r,this.processor,n)}setLevel(e){this.level=e}}function u(e,t,r){for(var a=arguments.length,o=Array(a>3?a-3:0),c=3;c<a;c++)o[c-3]=arguments[c];if(o.some(e=>(0,s.O9)(e))){let a,c,u;let d=new Date().getTime(),[p,g,...f]=o;if("string"==typeof p)a=p.trim()||l,c=g,u=f;else if((0,n.Al)(p)){a=p.message;let e={error:p};g&&(e.data=g),c=e,u=f}else if("object"==typeof p&&null!==p){a=o.find(e=>"string"==typeof e)?.trim()||l,c=p;let e=[];g&&e.push(g),f&&(0,i.tM)(e,f),u=e}else a=l,u=o;let m={timestamp:d,level:e,module:t,message:a};return r&&(m.bindings=r),(0,s.O9)(c)&&(m.data=c),(0,s.O9)(u)&&(Array.isArray(u)?u.length>0&&(m.rest=u):m.rest=u),m}return null}},99084:(e,t,r)=>{r.d(t,{r:()=>a});var n=r(37168),i=r(88559),s=r(15993);class a{constructor(e){this.cfg=e}handle(e,t){for(let r of this.cfg.filters)if(!r(e,t))return;for(let t of this.cfg.transports)try{t.handle(e)}catch(a){let r=new i.L({transport:t.id,message:(0,s.J)(e)});n.Cp(r)}}}},36266:(e,t,r)=>{r.d(t,{V:()=>l});var n=r(11519),i=r(99084),s=r(324),a=r(63538),o=r(34696);class l{constructor(e){this.cfg=e,this.transports=e.transports.slice();let t=new i.r({filters:e.filters.slice(),transports:this.transports}),r=(0,o.k)(e.module);this.log=new n.X(r,t,e.bindings)}enableSentryLogs(e){this.transports.some(e=>e instanceof a.l)||this.transports.push(new a.l(e))}enableArtifactsLogs(e){this.transports.some(e=>e instanceof s.j)||this.transports.push(new s.j(e))}}},324:(e,t,r)=>{r.d(t,{j:()=>n});class n{constructor(e){this.logArtifactsManager=e,this.id="artifacts"}handle(e){this.logArtifactsManager.log(e)}}},50798:(e,t,r)=>{r.d(t,{V:()=>n});class n{handle(e){let t=function(e){switch(e){case"silly":default:return i.log;case"debug":return i.debug;case"info":return i.info;case"warn":return i.warn;case"error":case"fatal":return i.error}}(e.level);if(!t)return;let r=[e.message?`[${e.module}] ${e.message}`:`[${e.module}]`];e.bindings&&r.push(e.bindings),e.data&&r.push(e.data),e.rest&&r.push(e.rest),t(...r)}constructor(){this.id="console"}}let i=console},70919:(e,t,r)=>{r.d(t,{I:()=>i});var n=r(82549);class i{handle(e){let t=s[e.level],r="string"==typeof e.message?e.message:void 0,i="object"==typeof e.message?e.message:void 0;null!==t&&n.Z({level:t,category:e.module,message:r??"[no message]",data:{message:i,bindings:e.bindings,data:e.data,rest:e.rest}})}constructor(){this.id="sentry-breadcrumbs"}}let s={silly:null,debug:"debug",info:"info",warn:"warning",error:"error",fatal:"fatal"}},63538:(e,t,r)=>{r.d(t,{l:()=>i});var n=r(46865);class i{constructor(e){this.logger=e,this.id="sentry-logs"}handle(e){if("silly"===e.level||"BrowserTabSession"===e.module)return;let t=e.message??"[no message]",r=(0,n.q)({bindings:e.bindings,module:e.module,data:e.data,rest:e.rest});(0,this.logger[e.level])(t,r)}}},10:(e,t,r)=>{r.d(t,{L:()=>s});var n=r(16958),i=r(39907);class s{constructor(){this.id="stdout",this.fmt=new n.K(this)}handle(e){let t=this.fmt.format(e);t&&("error"===e.level?i.stderr.write(t+"\n"):i.stdout.write(t+"\n"))}}},52849:(e,t,r)=>{r.d(t,{$:()=>n});let n={silly:0,debug:1,info:2,warn:3,error:4,fatal:5}},86659:(e,t,r)=>{r.d(t,{US:()=>c,V:()=>a,zO:()=>o});var n=r(16335),i=r(52849),s=r(39907);function a(){return n.optional(n.oneOf(["json","pretty","hidden"]),"pretty").verify("pretty")}function o(){switch(s.env.LOG_ISO_TS?.toLowerCase()){case"1":case"true":return!0;default:return!1}}let l={defaultBindings:{},defaultLevel:function(){switch("info".toLowerCase()){case"silly":return i.$.silly;case"debug":default:return i.$.debug;case"info":return i.$.info;case"warn":return i.$.warn;case"error":return i.$.error;case"fatal":return i.$.fatal}}(),enforceLogLevel:void 0},c={get:()=>l,set:e=>{Object.assign(l,e)}}},16958:(e,t,r)=>{r.d(t,{K:()=>l});var n=r(37168),i=r(88559),s=r(86659),a=r(15993),o=r(39907);class l{constructor(e){this.transport=e,this.style=(0,s.V)(),this.isoTs=(0,s.zO)()}pretty(e){let t=[this.isoTs?new Date(e.timestamp).toString():e.timestamp.toString(),e.level.toUpperCase(),`[${e.module}]`,e.message];if(e.bindings){let r=Object.entries(e.bindings).map(e=>{let[t,r]=e;return`${t}: ${r}`});t.push(`(${r.join(", ")})`)}return e.data&&t.push(JSON.stringify(e.data)),e.rest&&t.push(JSON.stringify(e.rest)),t.length,t.join(" ")}json(e){let t={level:e.level,time:this.isoTs?new Date(e.timestamp).toISOString():e.timestamp,...e.bindings,name:e.module,msg:e.message,data:e.data,rest:e.rest};try{return(0,a.J)(t)}catch(r){let t=new i.L({transport:this.transport.id,message:"Failed to stringify log message",cause:r});return o.stderr.write(t.toJSON()+"\n"),n.Cp(t),String(e)}}format(e){switch(this.style){case"hidden":return null;case"pretty":return this.pretty(e);case"json":return this.json(e)}}}},72219:(e,t,r)=>{r.d(t,{v:()=>n});function n(e,t){let r={...e};for(let e in t)r[e]&&t[e]&&""!=t[e]?r[e]=`${r[e]}.${t[e]}`:r[e]=t[e]??"";return r}},15993:(e,t,r)=>{r.d(t,{J:()=>n});function n(e){let t=new WeakSet;return JSON.stringify(e,(e,r)=>{if("object"==typeof r&&null!==r){if(t.has(r))return"[circular reference]";t.add(r)}return r})}},34696:(e,t,r)=>{r.d(t,{k:()=>n});function n(e){return e.replace(/[^(\w)]/g,"_")}},38133:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(36213);class i extends n.F_{static #e=this.nameTemplate="RpcMux:Disconnected";static #t=this.is=e=>n.F_.is(e,i.nameTemplate);static #r=this.isExact=e=>n.F_.isExact(e,i.nameTemplate);constructor(e={}){super(i.nameTemplate,"RPC disconnected during operation",{trackError:!1,userHint:"It looks like the browser has put Bardeen to sleep while an operation was still in progress",...e})}}},62879:(e,t,r)=>{r.d(t,{s:()=>i});var n=r(36213);class i extends n.F_{static #e=this.nameTemplate="RpcMux:ExtensionContextInvalidated";static #t=this.is=e=>n.F_.is(e,i.nameTemplate);static #r=this.isExact=e=>n.F_.isExact(e,i.nameTemplate);constructor(e={}){super(i.nameTemplate,"Extension context invalidated",{trackError:!1,userHint:"The extension was reloaded. Please refresh the current window.",...e})}}},45281:(e,t,r)=>{function n(e,t){if(e.size!==t.size)return!1;for(let r of e)if(!t.has(r))return!1;return!0}function i(e,t){for(let r of t)e.push(r)}r.d(t,{tM:()=>i,yZ:()=>n})},91159:(e,t,r)=>{function n(e){let[t,...r]=e;return t?t.toUpperCase()+r.join(""):""}function i(e){return e=(e=(e=(e=e.replace(/[_\s]+/g," ").trim()).replace(/([a-z])([A-Z])/g,"$1 $2")).split(" ").map(e=>e?e[0].toUpperCase()+e.slice(1):e).join(" ")).replace(/\bhub\s?spot\b/gi,"HubSpot")}r.d(t,{ZH:()=>n,xJ:()=>i})},39629:(e,t,r)=>{r.d(t,{MY:()=>o,O9:()=>c,zz:()=>l});var n=r(16335);let i=n.lazy(()=>n.dict(o)),s=n.lazy(()=>n.array(o)),a=n.either(n.undefined_,n.null_,n.string,n.number,n.boolean).describe("Must be valid PrimitiveScalar"),o=n.either(a,i,s).describe("Must be valid Primitive");function l(e){return!!e}function c(e){return null!=e}},46865:(e,t,r)=>{r.d(t,{q:()=>function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{prefix:"",delimiter:".",flatLevels:3,currentLevel:1};if(null==t)return;switch(typeof t){case"string":case"number":case"boolean":case"bigint":return{value:t};case"function":case"symbol":return;case"object":if(Array.isArray(t))return{array:t};if(t instanceof Date)return{timestamp:t.toISOString()};if(t instanceof Error)return{error:JSON.stringify(n.sF.from(t).toLightweightError())};if(t instanceof Map&&(t=Object.fromEntries(t.entries())),t instanceof Set)return{set:Array.from(t)}}let{prefix:i="",delimiter:s=".",flatLevels:a=3,currentLevel:o=1}=r,l={};for(let[r,n]of Object.entries(Object(t))){let t=i?`${i}${s}${r}`:r;null===n||"object"!=typeof n||Array.isArray(n)?l[t]=n:o<a?Object.assign(l,e(n,{prefix:t,delimiter:s,flatLevels:a,currentLevel:o+1})):l[t]=n}return l}});var n=r(36213)},24656:(e,t,r)=>{r.d(t,{n:()=>i});let n=new Set;function i(e,t){return(r,i)=>{if(n.has(i))return e(r,t);n.add(i);try{return e(r,i)}finally{n.delete(i)}}}},99530:(e,t,r)=>{r.d(t,{$n:()=>n.$n,Kf:()=>i.K,dN:()=>n.dN,z9:()=>n.z9}),r(2822);var n=r(28926);r(85415),r(84857),r(86244),r(29103),r(21139);var i=r(64185);r(69236),r(13693),r(94741),r(61994),r(54439)},81:(e,t,r)=>{r.d(t,{$n:()=>n.$n,Kf:()=>n.Kf,dN:()=>n.dN,oB:()=>i.o,z9:()=>n.z9});var n=r(99530);r(96326),r(86439);var i=r(58756);r(88645),r(11778),r(48143),r(14166),r(19585),r(21799),r(21714),r(36674)},45381:(e,t,r)=>{r.d(t,{PromptGmailWindow:()=>g,bootstrap:()=>x}),r(48545);var n=r(14041),i=r(25873),s=r(81),a=r(69670),o=r(39716);new BroadcastChannel("ui debugger"),o.Ay.div`
  background: ${a.ONy};
  white-space: pre;
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 100%;
  width: 100%;
  position: relative;
  ${e=>e.$dropActive&&`
    outline: 2px dashed ${a.wB3};
    outline-offset: -10px;
  `}
`,o.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`,o.Ay.div`
  font-size: 16px;
  font-weight: 500;
  color: ${a.KxS};
  padding: 20px;
  border: 2px dashed ${a.wB3};
  border-radius: 8px;
  background: ${a.Q_2};
`,o.Ay.button`
  background: ${a.ONy};
  border: none;
  padding: 0;
  margin: 0;

  display: inline-block;
  border-radius: 4px;
  transition: 0.3s all;
  &:hover {
    background: ${a.Q_2};
  }
  &:focus {
    background: ${a.NcT};
  }
`,o.Ay.span`
  margin-left: 8px;
  background: ${a.eJU};
  padding: 0 2px;
`,o.Ay.pre`
  max-height: 50vh;
  font-size: 12px;
  overflow: auto;
  line-height: 18px;
`,o.Ay.span`
  cursor: pointer;
  margin-left: 4px;
  font-size: 12px;
  color: ${a.ydb};
  &:hover {
    color: ${a.ui$};
  }
`,o.Ay.span`
  color: #000000;
  font-family: monospace;
`,o.Ay.pre`
  overflow: auto;
  height: 50vh;
`;r(18140);var l=r(16335),c=r(36213);class u extends c.F_{static #e=this.nameTemplate="PreviewTable:BlobRefExpired";static #t=this.is=e=>c.F_.is(e,u.nameTemplate);static #r=this.isExact=e=>c.F_.isExact(e,u.nameTemplate);constructor(e={}){super(u.nameTemplate,"The table was deleted by the browser. Please close this tab and reopen the table again from the Bardeen app.",e)}}l.object({columns:l.array(l.string),rows:l.array(l.array(l.string))});var d=r(67331);let p=()=>{let e=new URLSearchParams(window.location.search.substring(1)).get("state");return e?JSON.parse(atob(e)):null},g=()=>{let[e,t]=n.useState(!1),[r,i]=n.useState({client_id:"",client_secret:""}),{normal:a,proxy:o}=n.useMemo(()=>JSON.parse(atob(String(window.location.hash).substring(1))),[]);return n.createElement(f,null,n.createElement(m,null,n.createElement(s.z9,{icon:"IntegrationGoogleMail",size:"l",rect:!0,tooltipText:""}),n.createElement(h,null,"Connect Google Mail with Bardeen"),n.createElement(s.$n,{text:"Authenticate with Google",size:"xl",round:!0,variant:"primary",onClick:()=>{window.location.href=o}}),e?n.createElement(y,null,n.createElement(d.P,null,"Please enter your Client ID & Secret.",n.createElement("br",null),n.createElement(b,{href:"https://bardeen.ai/lessons/integrating-gmail",target:"_blank"},"Learn more about how to setup and find your Client-ID & Secret")),n.createElement(w,{onSubmit:e=>{e.preventDefault();let t={...p(),client_id:r.client_id.trim(),client_secret:r.client_secret.trim()},n=encodeURIComponent(a.replace("{{client_id}}",t.client_id)),i=btoa(JSON.stringify(t));window.location.href=`${n}&state=${i}`}},n.createElement(v,null,n.createElement(s.dN.Outline,{placeholder:"Client ID: ",onChange:e=>i(t=>({...t,client_id:e})),value:r.client_id,size:"xl"}),n.createElement(s.dN.Outline,{placeholder:"Client Secret: ",onChange:e=>i(t=>({...t,client_secret:e})),value:r.client_secret,size:"xl"})),n.createElement(E,{text:"Submit",size:"xl",round:!0,variant:"primary",type:"submit"}))):n.createElement(d.P,{style:{textDecoration:"underline",cursor:"pointer"},onClick:()=>t(!0)},"I need to login with Client Secret & ID.")))},f=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,m=o.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,h=(0,o.Ay)(d.H2)`
  color: ${a.t14};
`,y=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000000f;
  outline: 1px solid ${a.Tc2};
  transition: all 0.2s ease-in-out;
  width: 100%;
`,b=o.Ay.a`
  font-size: 16px;
  color: ${a.t14};
  text-decoration: underline;
`,v=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,E=(0,o.Ay)(s.$n)`
  margin-top: 40px;
`,w=o.Ay.form`
  margin-bottom: 16px;
`;function x(e,t,r){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=document.querySelector(a.target??"#main");if(!o)return console.error("Could not find #main");let l={api:t.api,documentHost:void 0,documentRoot:document.documentElement,portalInsertionPoint:document.querySelector("#bardeen-popup")??document.body,styleInsertionPoint:document.head};(0,i.createRoot)(o).render(n.createElement(s.oB.Provider,{value:l},n.createElement(s.Kf,null,n.createElement(e,{...r,...t}))))}o.Ay.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  font-size: 16px;
  color: ${a.t14};
  text-decoration: underline;
`,o.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`,o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
`,(0,o.Ay)(d.P)`
  padding-inline: 19px;
  font-size: 16px;
  color: ${a.CP};
  margin-bottom: 8px;
  font-weight: 600;
`,(0,o.Ay)(d.P)`
  padding-inline: 19px;
  color: ${a.CCs};
  text-align: start;
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,o.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,(0,o.Ay)(d.H2)`
  color: ${a.t14};
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,o.Ay.div`
  color: ${a.ui$};
  white-space: pre-wrap;
  font-size: 16px;
  width: 100%;
  text-align: center;
`}}]);
//# debugId=9789f1cf-0cdf-5e36-a473-562f72b529d4
