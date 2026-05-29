let e,t,r,o,i,s,a,c,h;var p,u,f,b,g,m,v,w,x,_,$,C={379(e){function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function r(e,t){for(var r,o="",i=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)r=e.charCodeAt(c);else if(47===r)break;else r=47;if(47===r){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(o.length<2||2!==i||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",i=0):i=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),s=c,a=0;continue}}else if(2===o.length||1===o.length){o="",i=0,s=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",i=2)}else o.length>0?o+="/"+e.slice(s+1,c):o=e.slice(s+1,c),i=c-s-1;s=c,a=0}else 46===r&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,i="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?o=arguments[a]:(void 0===e&&(e=process.cwd()),o=e),t(o),0!==o.length&&(i=o+"/"+i,s=47===o.charCodeAt(0));if(i=r(i,!s),s)if(i.length>0)return"/"+i;else return"/";return i.length>0?i:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),i=47===e.charCodeAt(e.length-1);return(0!==(e=r(e,!o)).length||o||(e="."),e.length>0&&i&&(e+="/"),o)?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];t(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":o.normalize(e)},relative:function(e,r){if(t(e),t(r),e===r||(e=o.resolve(e))===(r=o.resolve(r)))return"";for(var i=1;i<e.length&&47===e.charCodeAt(i);++i);for(var s=e.length,a=s-i,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,u=-1,f=0;f<=p;++f){if(f===p){if(h>p){if(47===r.charCodeAt(c+f))return r.slice(c+f+1);else if(0===f)return r.slice(c+f)}else a>p&&(47===e.charCodeAt(i+f)?u=f:0===f&&(u=0));break}var b=e.charCodeAt(i+f);if(b!==r.charCodeAt(c+f))break;47===b&&(u=f)}var g="";for(f=i+u+1;f<=s;++f)(f===s||47===e.charCodeAt(f))&&(0===g.length?g+="..":g+="/..");return g.length>0?g+r.slice(c+u):(c+=u,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var r=e.charCodeAt(0),o=47===r,i=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(r=e.charCodeAt(a))){if(!s){i=a;break}}else s=!1;return -1===i?o?"/":".":o&&1===i?"//":e.slice(0,i)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');t(e);var o,i=0,s=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var c=r.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){i=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(s=o):(c=-1,s=h))}return i===s?s=h:-1===s&&(s=e.length),e.slice(i,s)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){i=o+1;break}}else -1===s&&(a=!1,s=o+1);return -1===s?"":e.slice(i,s)},extname:function(e){t(e);for(var r=-1,o=0,i=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47===h){if(!s){o=c+1;break}continue}-1===i&&(s=!1,i=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1)}return -1===r||-1===i||0===a||1===a&&r===i-1&&r===o+1?"":e.slice(r,i)},format:function(e){var t,r;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+r:t+"/"+r:r},parse:function(e){t(e);var r,o={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return o;var i=e.charCodeAt(0),s=47===i;s?(o.root="/",r=1):r=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,f=0;u>=r;--u){if(47===(i=e.charCodeAt(u))){if(!p){c=u+1;break}continue}-1===h&&(p=!1,h=u+1),46===i?-1===a?a=u:1!==f&&(f=1):-1!==a&&(f=-1)}return -1===a||-1===h||0===f||1===f&&a===h-1&&a===c+1?-1!==h&&(0===c&&s?o.base=o.name=e.slice(1,h):o.base=o.name=e.slice(c,h)):(0===c&&s?(o.name=e.slice(1,a),o.base=e.slice(1,h)):(o.name=e.slice(c,a),o.base=e.slice(c,h)),o.ext=e.slice(a,h)),c>0?o.dir=e.slice(0,c-1):s&&(o.dir="/"),o},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}},S={};function P(e){var t=S[e];if(void 0!==t)return t.exports;var r=S[e]={exports:{}};return C[e](r,r.exports,P),r.exports}P.m=C,P.d=(e,t)=>{for(var r in t)P.o(t,r)&&!P.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},P.f={},P.e=e=>Promise.all(Object.keys(P.f).reduce((t,r)=>(P.f[r](e,t),t),[])),P.u=e=>"lib-billboard.js",P.miniCssF=e=>{},P.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch{if("object"==typeof window)return window}}(),P.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),P.p="#{root}/dist/webviews/",Object.defineProperty(P,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}}),p={122:0},u=e=>{var t,r,{__webpack_esm_ids__:o,__webpack_esm_modules__:i,__webpack_esm_runtime__:s}=e,a=0;for(t in i)P.o(i,t)&&(P.m[t]=i[t]);for(s&&s(P);a<o.length;a++)r=o[a],P.o(p,r)&&p[r]&&p[r][0](),p[o[a]]=0},P.f.j=(e,t)=>{var r=P.o(p,e)?p[e]:void 0;if(0!==r)if(r)t.push(r[1]);else{var o=import(P.p+P.u(e)).then(u,t=>{throw 0!==p[e]&&(p[e]=void 0),t}),o=Promise.race([o,new Promise(t=>r=p[e]=[t])]);t.push(r[1]=o)}};let A=globalThis,E=A.ShadowRoot&&(void 0===A.ShadyCSS||A.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O=Symbol(),T=new WeakMap;let n=class n{constructor(e,t,r){if(this._$cssResult$=!0,r!==O)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(E&&void 0===e){let r=void 0!==t&&1===t.length;r&&(e=T.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&T.set(t,e))}return e}toString(){return this.cssText}};let D=e=>new n("string"==typeof e?e:e+"",void 0,O),M=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,r,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1],e[0]),e,O),N=E?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return D(t)})(e):e,{is:B,defineProperty:F,getOwnPropertyDescriptor:j,getOwnPropertyNames:U,getOwnPropertySymbols:q,getPrototypeOf:W}=Object,V=globalThis,G=V.trustedTypes,K=G?G.emptyScript:"",Y=V.reactiveElementPolyfillSupport,X={toAttribute(e,t){switch(t){case Boolean:e=e?K:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},J=(e,t)=>!B(e,t),Q={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(e,r,t);void 0!==o&&F(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){let{get:o,set:i}=j(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){let s=o?.call(this);i?.call(this,t),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Q}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=W(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...U(e),...q(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,r]of t)this.elementProperties.set(e,r)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let r of new Set(e.flat(1/0).reverse()))t.unshift(N(r));else void 0!==e&&t.push(N(e));return t}static _$Eu(e,t){let r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(E)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement("style"),o=A.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=r.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(void 0!==o&&!0===r.reflect){let i=(void 0!==r.converter?.toAttribute?r.converter:X).toAttribute(t,r.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,o=r._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=r.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:X;this._$Em=o;let s=i.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,r,o=!1,i){if(void 0!==e){let s=this.constructor;if(!1===o&&(i=this[e]),!(((r??=s.getPropertyOptions(e)).hasChanged??J)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:i},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,r]of e){let{wrapped:e}=r,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,r,o)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,Y?.({ReactiveElement:y}),(V.reactiveElementVersions??=[]).push("2.1.2");let ee=globalThis,et=e=>e,er=ee.trustedTypes,eo=er?er.createPolicy("lit-html",{createHTML:e=>e}):void 0,ei="$lit$",es=`lit$${Math.random().toFixed(9).slice(2)}$`,en="?"+es,ea=`<${en}>`,el=document,ec=()=>el.createComment(""),eh=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ed=Array.isArray,ep=e=>ed(e)||"function"==typeof e?.[Symbol.iterator],eu=`[ 	
\x0c\r]`,ef=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,eb=/-->/g,eg=/>/g,em=RegExp(`>|${eu}(?:([^\\s"'>=/]+)(${eu}*=${eu}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ev=/'/g,ey=/"/g,ew=/^(?:script|style|textarea|title)$/i,ex=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),ek=ex(1),e_=ex(2),e$=(ex(3),Symbol.for("lit-noChange")),eC=Symbol.for("lit-nothing"),eS=new WeakMap,eP=el.createTreeWalker(el,129);function eA(e,t){if(!ed(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==eo?eo.createHTML(t):t}let eE=(e,t)=>{let r=e.length-1,o=[],i,s=2===t?"<svg>":3===t?"<math>":"",a=ef;for(let t=0;t<r;t++){let r=e[t],c,h,p=-1,u=0;for(;u<r.length&&(a.lastIndex=u,null!==(h=a.exec(r)));)u=a.lastIndex,a===ef?"!--"===h[1]?a=eb:void 0!==h[1]?a=eg:void 0!==h[2]?(ew.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=em):void 0!==h[3]&&(a=em):a===em?">"===h[0]?(a=i??ef,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?em:'"'===h[3]?ey:ev):a===ey||a===ev?a=em:a===eb||a===eg?a=ef:(a=em,i=void 0);let f=a===em&&e[t+1].startsWith("/>")?" ":"";s+=a===ef?r+ea:p>=0?(o.push(c),r.slice(0,p)+ei+r.slice(p)+es+f):r+es+(-2===p?t:f)}return[eA(e,s+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let i=0,s=0,a=e.length-1,c=this.parts,[h,p]=eE(e,t);if(this.el=lit_html_S.createElement(h,r),eP.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=eP.nextNode())&&c.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(ei)){let t=p[s++],r=o.getAttribute(e).split(es),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:i,name:a[2],strings:r,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),o.removeAttribute(e)}else e.startsWith(es)&&(c.push({type:6,index:i}),o.removeAttribute(e));if(ew.test(o.tagName)){let e=o.textContent.split(es),t=e.length-1;if(t>0){o.textContent=er?er.emptyScript:"";for(let r=0;r<t;r++)o.append(e[r],ec()),eP.nextNode(),c.push({type:2,index:++i});o.append(e[t],ec())}}}else if(8===o.nodeType)if(o.data===en)c.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(es,e+1));)c.push({type:7,index:i}),e+=es.length-1}i++}}static createElement(e,t){let r=el.createElement("template");return r.innerHTML=e,r}};function eO(e,t,r=e,o){if(t===e$)return t;let i=void 0!==o?r._$Co?.[o]:r._$Cl,s=eh(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e))._$AT(e,r,o),void 0!==o?(r._$Co??=[])[o]=i:r._$Cl=i),void 0!==i&&(t=eO(e,i._$AS(e,t.values),i,o)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??el).importNode(t,!0);eP.currentNode=o;let i=eP.nextNode(),s=0,a=0,c=r[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(i,i.nextSibling,this,e):1===c.type?t=new c.ctor(i,c.name,c.strings,this,e):6===c.type&&(t=new Z(i,this,e)),this._$AV.push(t),c=r[++a]}s!==c?.index&&(i=eP.nextNode(),s++)}return eP.currentNode=el,o}p(e){let t=0;for(let r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=eC,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){eh(e=eO(this,e,t))?e===eC||null==e||""===e?(this._$AH!==eC&&this._$AR(),this._$AH=eC):e!==this._$AH&&e!==e$&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):ep(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==eC&&eh(this._$AH)?this._$AA.nextSibling.data=e:this.T(el.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,o="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=lit_html_S.createElement(eA(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new R(o,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=eS.get(e.strings);return void 0===t&&eS.set(e.strings,t=new lit_html_S(e)),t}k(e){ed(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,o=0;for(let i of e)o===t.length?t.push(r=new k(this.O(ec()),this.O(ec()),this,this.options)):r=t[o],r._$AI(i),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=et(e).nextSibling;et(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,i){this.type=1,this._$AH=eC,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=eC}_$AI(e,t=this,r,o){let i=this.strings,s=!1;if(void 0===i)(s=!eh(e=eO(this,e,t,0))||e!==this._$AH&&e!==e$)&&(this._$AH=e);else{let o,a,c=e;for(e=i[0],o=0;o<i.length-1;o++)(a=eO(this,c[r+o],t,o))===e$&&(a=this._$AH[o]),s||=!eh(a)||a!==this._$AH[o],a===eC?e=eC:e!==eC&&(e+=(a??"")+i[o+1]),this._$AH[o]=a}s&&!o&&this.j(e)}j(e){e===eC?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===eC?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==eC)}};let z=class z extends H{constructor(e,t,r,o,i){super(e,t,r,o,i),this.type=5}_$AI(e,t=this){if((e=eO(this,e,t,0)??eC)===e$)return;let r=this._$AH,o=e===eC&&r!==eC||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==eC&&(r===eC||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){eO(this,e)}};let eT=ee.litHtmlPolyfillSupport;eT?.(lit_html_S,k),(ee.litHtmlVersions??=[]).push("3.3.2");let ez=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{let o=r?.renderBefore??t,i=o._$litPart$;if(void 0===i){let e=r?.renderBefore??null;o._$litPart$=i=new k(t.insertBefore(ec(),e),e,void 0,r??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return e$}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ez.litElementHydrateSupport?.({LitElement:lit_element_i});let eR=ez.litElementPolyfillSupport;eR?.({LitElement:lit_element_i}),(ez.litElementVersions??=[]).push("4.2.2");let eD=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eI={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:J};function eL(e){return(t,r)=>{let o;return"object"==typeof r?((e=eI,t,r)=>{let{kind:o,metadata:i}=r,s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(r.name,e),"accessor"===o){let{name:o}=r;return{set(r){let i=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,i,e,!0,r)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=r;return function(r){let i=this[o];t.call(this,r),this.requestUpdate(o,i,e,!0,r)}}throw Error("Unsupported decorator location: "+o)})(e,t,r):(o=t.hasOwnProperty(r),t.constructor.createProperty(r,e),o?Object.getOwnPropertyDescriptor(t,r):void 0)}}function eM(e){return eL({...e,state:!0,attribute:!1})}let eN=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,r),r);function eB(e,t){return(r,o,i)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof o?r:i??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eN(r,o,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return eN(r,o,{get(){return s(this)}})}}let eF="0000000000000000000000000000000000000000:",ej=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,eU=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,eq=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,eW=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,eH=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,eV=/^(.*?)([\^@~:].*)?$/,eG=/^[0]{40}(?:[\^@~:]\S*)?:?$/,eK=/^[0]{40}([\^@~]\S*)?:$/;function eZ(e,t){return!!t&&e.test(t)}function eY(e,t=!1){return"0000000000000000000000000000000000000000"===e||e===eF||!t&&eZ(eG,e)}let eX=7;function eJ(e,t){if("0000000000000000000000000000000000000000-"===e)return"(deleted)";if(!e)return t?.strings?.working??"";if(eY(e))return!function(e,t=!1){return e===eF||!t&&eZ(eK,e)}(e)?t?.strings?.uncommitted??"Working Tree":t?.strings?.uncommittedStaged??"Index";if(function(e,t="any"){if(null==e)return!1;switch(t){case"qualified":return eU.test(e);case"qualified-double-dot":return eq.test(e);case"qualified-triple-dot":return eW.test(e);default:return ej.test(e)}}(e)||!eZ(eH,e))return e;let r=Math.max(5,eX),o=eV.exec(e);if(null!=o){let[,e,t]=o;if(null!=t)return`${e.substring(0,r)}${t}`}return e.substring(0,r)}function eQ(e,t,r){let o,i,s,a,c,h,p,u,f,b,g=0;null!=r&&({edges:h,maxWait:p,cancellation:u,aggregator:f}=r);let m="leading"===(h??="trailing")||"both"===h,v="trailing"===h||"both"===h;function w(){if(null!=o){g=Date.now();let t=o,r=b;return b=void 0,o=void 0,s=e.apply(r,t)}}function x(){null!=a&&(clearTimeout(a),a=void 0)}function _(){null!=c&&(clearTimeout(c),c=void 0)}function $(){x(),_(),b=void 0,o=void 0,i=void 0,g=0}function C(...e){if(u?.aborted)return;let r=Date.now();null!=f&&null!=o?o=f(o,e):(b=this,o=e);let h=null==a&&null==c;i=r,x();let _=Date.now();if(i=_,a=setTimeout(()=>{a=void 0,function e(){let r,o,s=Date.now();if(r=s-(i??0),o=s-g,null==i||r>=t||r<0||null!=p&&o>=p){v&&w(),$();return}a=setTimeout(()=>{a=void 0,e()},t-(s-(i??0)))}()},t),null!=p&&!c){0===g&&(g=_);let e=p-(_-g);e>0?c=setTimeout(()=>{c=void 0,v&&null!=o&&w(),g=Date.now()},e):(v&&null!=o&&w(),$())}return m&&h?w():s}return C.cancel=$,C.flush=function(){return x(),_(),w()},C.pending=function(){return null!=a||null!=c},u?.addEventListener("abort",$,{once:!0}),C}var e0=P(379);let e1=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,e2=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,e5=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],e4=new Map,e6=new Map;function e3(e,t){let r=new Date(e.getTime());for(let[e,o]of Object.entries(t))if(o)switch(e){case"years":r.setFullYear(r.getFullYear()+o);break;case"months":r.setMonth(r.getMonth()+o);break;case"days":r.setDate(r.getDate()+o);break;case"hours":r.setHours(r.getHours()+o);break;case"minutes":r.setMinutes(r.getMinutes()+o);break;case"seconds":r.setSeconds(r.getSeconds()+o)}return r}function e8(t,r,o,i=!0){r=r??void 0;let s=`${o??""}:${r}`,a=e4.get(s);if(null==a){let t=function(e){if(null==e)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let t=e2.exec(e);if(t?.groups!=null){let{dateStyle:e,timeStyle:r}=t.groups;return{localeMatcher:"best fit",dateStyle:e||"full",timeStyle:r||void 0}}let r={localeMatcher:"best fit"};for(let{groups:t}of e.matchAll(e1))if(null!=t){for(let[e,o]of Object.entries(t))if(null!=o)switch(e){case"year":r.year=4===o.length?"numeric":"2-digit";break;case"month":switch(o.length){case 4:r.month="long";break;case 3:r.month="short";break;case 2:r.month="2-digit";break;case 1:r.month="numeric"}break;case"day":"DD"===o?r.day="2-digit":r.day="numeric";break;case"weekday":switch(o.length){case 4:r.weekday="long";break;case 3:r.weekday="short";break;case 2:r.weekday="narrow"}break;case"hour":r.hour=2===o.length?"2-digit":"numeric",r.hour12="hh"===o||"h"===o;break;case"minute":r.minute=2===o.length?"2-digit":"numeric";break;case"second":r.second=2===o.length?"2-digit":"numeric";break;case"fractionalSecond":r.fractionalSecondDigits=3;break;case"dayPeriod":r.dayPeriod="narrow",r.hour12=!0,r.hourCycle="h12";break;case"timeZoneName":r.timeZoneName=2===o.length?"long":"short"}}return r}(r);a=new Intl.DateTimeFormat(null==o?e:"system"===o?void 0:[o],t),i&&e4.set(s,a)}if(null==r||e2.test(r))return a.format(t);let c=a.formatToParts(t);return r.replace(e1,(r,s,a,h,p,u,f,b,g,m,v,w,x,_,$)=>{if(null!=s)return s.substring(1,s.length-1);for(let[r,s]of Object.entries($)){if(null==s)continue;let a=c.find(e=>e.type===r);if("Do"===s&&a?.type==="day")return function(e){let t=e%100;return`${e}${e7[(t-20)%10]??e7[t]??e7[0]}`}(Number(a.value));if("a"===s&&a?.type==="dayPeriod"){let r=(function(t){let r=`${o??""}:time:${t}`,s=e4.get(r);if(null==s){let a;a=null==o?e:"system"===o?void 0:[o],s=new Intl.DateTimeFormat(a,{localeMatcher:"best fit",timeStyle:t}),i&&e4.set(r,s)}return s})("short").formatToParts(t).find(e=>"dayPeriod"===e.type);return` ${(r??a)?.value??""}`}return a?.value??""}return""})}let e7=["th","st","nd","rd"];function e9(t,r){t??="decimal";let o=`${r??""}:${t}`,i=e6.get(o);if(null==i){let s={localeMatcher:"best fit",style:t};i=new Intl.NumberFormat(null==r?e:"system"===r?void 0:[r],s),e6.set(o,i)}return i.format}var te=((f=te||{})[f.VerificationRequired=-1]="VerificationRequired",f[f.Community=0]="Community",f[f.DeprecatedPreview=1]="DeprecatedPreview",f[f.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",f[f.Trial=3]="Trial",f[f.TrialExpired=4]="TrialExpired",f[f.TrialReactivationEligible=5]="TrialReactivationEligible",f[f.Paid=6]="Paid",f);let tt=["student","pro","advanced","teams","enterprise"];function tr(e){var t;return t=e.plan.actual.id,tt.includes(t)}let IpcCall=class IpcCall{constructor(e,t,r=!1){this.scope=e,this.reset=r,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,r){super(e,t,r),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let to="timeline",ti=new IpcRequest(to,"ref/choose"),ts=new IpcRequest(to,"path/choose"),tn=new IpcCommand(to,"point/open"),ta=new IpcCommand(to,"config/update"),tl=new IpcCommand(to,"scope/update"),tc=new IpcNotification(to,"didChange");let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,r,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=r,this.subscribe=o??!1}};let context_consumer_s=class context_consumer_s{constructor(e,t,r,o){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,void 0!==t.context)?(this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1):(this.context=t,this.callback=r,this.subscribe=o??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let r=t||!Object.is(e,this.o);this.o=e,r&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,r){if(!r)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:o}=this.subscriptions.get(e);e(this.value,o)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,r){super(void 0!==t.context?t.initialValue:r),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:r}]of this.subscriptions)t.has(e)||(t.add(e),r.dispatchEvent(new context_request_event_s(this.context,r,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function th({context:e}){return(t,r)=>{let o=new WeakMap;if("object"==typeof r)return{get(){return t.get.call(this)},set(e){return o.get(this).setValue(e),t.set.call(this,e)},init(t){return o.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let i;t.constructor.addInitializer(t=>{o.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,r);if(void 0===s){let e=new WeakMap;i={get(){return e.get(this)},set(t){o.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;i={...s,set(t){o.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,r,i)}}}function td({context:e,subscribe:t}){return(r,o)=>{"object"==typeof o?o.addInitializer(function(){new context_consumer_s(this,{context:e,callback:e=>{r.set.call(this,e)},subscribe:t})}):r.constructor.addInitializer(r=>{new context_consumer_s(r,{context:e,callback:e=>{r[o]=e},subscribe:t})})}}var tp=Object.defineProperty,tu=(e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?tp(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r,r},tf=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},tb=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},tg=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot access private method");return r};function tm(e,t){return Object.is(e,t)}let tv=null,ty=!1,tw=1,tx=Symbol("SIGNAL");function tk(e){let t=tv;return tv=e,t}let t_={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function t$(e){if(ty)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===tv)return;tv.consumerOnSignalRead(e);let t=tv.nextProducerIndex++;tP(tv),t<tv.producerNode.length&&tv.producerNode[t]!==e&&tS(tv)&&tC(tv.producerNode[t],tv.producerIndexOfThis[t]),tv.producerNode[t]!==e&&(tv.producerNode[t]=e,tv.producerIndexOfThis[t]=tS(tv)?function e(t,r,o){var i;if(tA(t),tP(t),0===t.liveConsumerNode.length){null==(i=t.watched)||i.call(t.wrapper);for(let r=0;r<t.producerNode.length;r++)t.producerIndexOfThis[r]=e(t.producerNode[r],t,r)}return t.liveConsumerIndexOfThis.push(o),t.liveConsumerNode.push(r)-1}(e,tv,t):0),tv.producerLastReadVersion[t]=e.version}function tC(e,t){var r;if(tA(e),tP(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(r=e.unwatched)||r.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)tC(e.producerNode[t],e.producerIndexOfThis[t])}let o=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[o],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[o],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];tP(o),o.producerIndexOfThis[r]=t}}function tS(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function tP(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function tA(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function tE(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==tw){if(!t.producerMustRecompute(t)&&!function(t){tP(t);for(let r=0;r<t.producerNode.length;r++){let o=t.producerNode[r],i=t.producerLastReadVersion[r];if(i!==o.version||(e(o),i!==o.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=tw;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=tw}}(e),t$(e),e.value===tz)throw e.error;return e.value}let tO=Symbol("UNSET"),tT=Symbol("COMPUTING"),tz=Symbol("ERRORED"),tR={...t_,value:tO,dirty:!0,error:null,equal:tm,producerMustRecompute:e=>e.value===tO||e.value===tT,producerRecomputeValue(e){let t;if(e.value===tT)throw Error("Detected cycle in computations.");let r=e.value;e.value=tT;let o=(e&&(e.nextProducerIndex=0),tk(e)),i=!1;try{t=e.computation.call(e.wrapper),i=r!==tO&&r!==tz&&e.equal.call(e.wrapper,r,t)}catch(r){t=tz,e.error=r}finally{if(tk(o),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(tS(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)tC(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(i){e.value=r;return}e.value=t,e.version++}},tD=function(){throw Error()};function tI(){return t$(this),this.value}let tL={...t_,equal:tm,value:void 0},tM=Symbol("node");(e=>{var t,r,o,i;let State=class State{constructor(o,i={}){let s,a;tb(this,r),tu(this,t);let c=((s=Object.create(tL)).value=o,(a=()=>(t$(s),s.value))[tx]=s,a)[tx];if(this[tM]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return tI.call(this[tM])}set(t){var r,o;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(ty)throw Error("Writes to signals not permitted during Watcher callback");r=this[tM],(null==tv?void 0:tv.consumerAllowSignalWrites)===!1&&tD(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,o=r,o.version++,tw++,function e(t){if(void 0===t.liveConsumerNode)return;let r=ty;ty=!0;try{for(let r of t.liveConsumerNode)r.dirty||function(t){var r;t.dirty=!0,e(t),null==(r=t.consumerMarkedDirty)||r.call(t.wrapper??t)}(r)}finally{ty=r}}(o))}};t=tM,r=new WeakSet,e.isState=e=>"object"==typeof e&&tf(r,e),e.State=State;let Computed=class Computed{constructor(t,r){let s,a;tb(this,i),tu(this,o);let c=((s=Object.create(tR)).computation=t,(a=()=>tE(s))[tx]=s,a)[tx];if(c.consumerAllowSignalWrites=!0,this[tM]=c,c.wrapper=this,r){let t=r.equals;t&&(c.equal=t),c.watched=r[e.subtle.watched],c.unwatched=r[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return tE(this[tM])}};o=tM,i=new WeakSet,e.isComputed=e=>"object"==typeof e&&tf(i,e),e.Computed=Computed,(t=>{var r,o,i,s;t.untrack=function(e){let t,r=null;try{r=tk(null),t=e()}finally{tk(r)}return t},t.introspectSources=function(t){var r;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(r=t[tM].producerNode)?void 0:r.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var r;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(r=t[tM].liveConsumerNode)?void 0:r.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let r=t[tM].liveConsumerNode;return!!r&&r.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let r=t[tM].producerNode;return!!r&&r.length>0};let Watcher=class Watcher{constructor(e){tb(this,o),tb(this,i),tu(this,r);let t=Object.create(t_);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[tM]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");tg(this,i,s).call(this,t);let r=this[tM];r.dirty=!1;let o=tk(r);for(let e of t)t$(e[tM]);tk(o)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");tg(this,i,s).call(this,t);let r=this[tM];tP(r);for(let e=r.producerNode.length-1;e>=0;e--)if(t.includes(r.producerNode[e].wrapper)){tC(r.producerNode[e],r.producerIndexOfThis[e]);let t=r.producerNode.length-1;if(r.producerNode[e]=r.producerNode[t],r.producerIndexOfThis[e]=r.producerIndexOfThis[t],r.producerNode.length--,r.producerIndexOfThis.length--,r.nextProducerIndex--,e<r.producerNode.length){let t=r.producerIndexOfThis[e],o=r.producerNode[e];tA(o),o.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tM].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};r=tM,o=new WeakSet,i=new WeakSet,s=function(t){for(let r of t)if(!(0,e.isComputed)(r)&&!(0,e.isState)(r))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>tf(o,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=tv)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(w||(w={}));let tN=!1,tB=new w.subtle.Watcher(()=>{tN||(tN=!0,queueMicrotask(()=>{for(let e of(tN=!1,tB.getPending()))e.get();tB.watch()}))}),tF=Symbol("SignalWatcherBrand"),tj=(new FinalizationRegistry(e=>{e.unwatch(...w.subtle.introspectSources(e))}),new WeakMap,e=>(...t)=>({_$litDirective$:e,values:t}));let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:tU}={M:ei,P:es,A:en,C:1,L:eE,R,D:ep,V:eO,I:k,H,N:L,U:z,B:I,F:Z},tq={},tW=(e,t)=>{let r=e._$AN;if(void 0===r)return!1;for(let e of r)e._$AO?.(t,!1),tW(e,t);return!0},tH=e=>{let t,r;do{if(void 0===(t=e._$AM))break;(r=t._$AN).delete(e),e=t}while(0===r?.size)},tV=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),tZ(t)}};function tG(e){void 0!==this._$AN?(tH(this),this._$AM=e,tV(this)):this._$AM=e}function tK(e,t=!1,r=0){let o=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(t)if(Array.isArray(o))for(let e=r;e<o.length;e++)tW(o[e],!1),tH(o[e]);else null!=o&&(tW(o,!1),tH(o));else tW(this,e)}let tZ=e=>{2==e.type&&(e._$AP??=tK,e._$AQ??=tG)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),tV(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tW(this,e),tH(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tY=!1,tX=new w.subtle.Watcher(async()=>{tY||(tY=!0,queueMicrotask(()=>{for(let e of(tY=!1,tX.getPending()))e.get();tX.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new w.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tX,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return w.subtle.untrack(()=>e.get())}update(e,[t]){var r;return null!=this._$Sk||(this._$Sk=null==(r=e.options)?void 0:r.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tJ=tj(watch_r),tQ=e=>(t,...r)=>e(t,...r.map(e=>e instanceof w.State||e instanceof w.Computed?tJ(e):e));tQ(ek),tQ(e_),w.State,w.Computed;let{fromCharCode:t0}=String;new TextEncoder;let t1=new TextDecoder;function t2(e){return t1.decode(function(e){let t=globalThis.atob(e),r=t.length,o=new Uint8Array(r),i=0,s=r-r%8;for(;i<s;i+=8)o[i]=t.charCodeAt(i),o[i+1]=t.charCodeAt(i+1),o[i+2]=t.charCodeAt(i+2),o[i+3]=t.charCodeAt(i+3),o[i+4]=t.charCodeAt(i+4),o[i+5]=t.charCodeAt(i+5),o[i+6]=t.charCodeAt(i+6),o[i+7]=t.charCodeAt(i+7);for(;i<r;i++)o[i]=t.charCodeAt(i);return o}(e))}let t5=new IpcRequest("core","webview/ready"),t4=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let t6=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let t3=new IpcCommand("core","telemetry/sendEvent"),t8=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let t7=new IpcCommand("core","webview/focus/didChange"),t9=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let re=new WeakMap;function rt(e,t){return function(r,o,i){let s=re.get(r.constructor);null==s&&re.set(r.constructor,s=[]),s.push({method:i.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,r){let o=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...r,detail:t});return this.dispatchEvent(o),o}update(e){let t=re.get(this.constructor);if(null!=t)for(let{keys:r,method:o,afterFirstUpdate:i}of t){if(i&&!this.hasUpdated)continue;let t=r.filter(t=>e.has(t));t.length&&o.call(this,t)}super.update(e)}};let rr=(h=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,e=>{let t=0;for(h.lastIndex=0;h.test(e);)t+=1;return e.length-t}),ro=e=>12288===e||e>=65281&&e<=65376||e>=65504&&e<=65510,ri=e=>8987===e||9001===e||e>=12272&&e<=12287||e>=12289&&e<=12350||e>=12441&&e<=12543||e>=12549&&e<=12591||e>=12593&&e<=12686||e>=12688&&e<=12771||e>=12783&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=19903||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=127488&&e<=127490||e>=127504&&e<=127547||e>=127552&&e<=127560||e>=131072&&e<=196605||e>=196608&&e<=262141,rs=/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y,rn=/[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y,ra=/(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu,rl=/\t{1,1000}/y,rc=/[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu,rh=/(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y,rd=/\p{M}+/gu,rp={limit:1/0,ellipsis:""},ru=(e,t={},r={})=>{let o=t.limit??1/0,i=t.ellipsis??"",s=t?.ellipsisWidth??(i?ru(i,rp,r).width:0),a=r.controlWidth??0,c=r.tabWidth??8,h=r.emojiWidth??2,p=r.regularWidth??1,u=r.wideWidth??2,f=[[rh,p],[rs,0],[rn,a],[rl,c],[rc,h],[ra,u]],b=0,g=0,m=e.length,v=0,w=!1,x=m,_=Math.max(0,o-s),$=0,C=0,S=0,P=0;e:for(;;){if(C>$||g>=m&&g>b){for(let t of(v=0,(e.slice($,C)||e.slice(b,g)).replaceAll(rd,""))){let e=t.codePointAt(0)||0;if(S+(P=ro(e)?2:ri(e)?u:p)>_&&(x=Math.min(x,Math.max($,b)+v)),S+P>o){w=!0;break e}v+=t.length,S+=P}$=C=0}if(g>=m)break;for(let t=0,r=f.length;t<r;t++){let[r,i]=f[t];if(r.lastIndex=g,r.test(e)){if(S+(P=(v=r===ra?rr(e.slice(g,r.lastIndex)):r===rc?1:r.lastIndex-g)*i)>_&&(x=Math.min(x,g+Math.floor((_-S)/i))),S+P>o){w=!0;break e}S+=P,$=b,C=g,g=b=r.lastIndex;continue e}}g+=1}return{width:w?_:S,index:w?x:m,truncated:w,ellipsed:w&&o>=s}},rf={ellipsisWidth:0,limit:0x40000000-1},rb={controlWidth:0,emojiWidth:2,regularWidth:1,wideWidth:2};function rg(e,t,o){let i;if(null==o)return r??=e9(),`${r(t)} ${e}${1===t?"":"s"}`;let s=1===t?e:o.plural??`${e}s`;return o.only?s:(0===t?i=o.zero??t:!1===o.format?i=t:null!=o.format?i=o.format(t):(r??=e9(),i=r(t)),`${i}${o.infix??" "}${s}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let rm=/T/,rv=/.*\s*?at\s(.+?)\s/,ry=/^_+/,rw=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...rw,...e.sanitizeKeys??[]])},this.#r=t,this.#e=e.createChannel(e.name),this.#o=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#o=e})}enabled(e){return!!this.isDebugging||0!==this.#o&&(null==e||this.#o<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#r=!1;get isDebugging(){return this.#r}#o=0;get logLevel(){var e=this.#o;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(rm," ").slice(0,-1)}]`}trace(e,...t){let r;(0!==this.#o&&!(this.#o>1)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.trace(`  ${r??""}${this.#i(!0,t)}`))}debug(e,...t){let r;(0!==this.#o&&!(this.#o>2)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.debug(`  ${r??""}${this.#i(!1,t)}`))}info(e,...t){let r;(0!==this.#o&&!(this.#o>3)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.info(`   ${r??""}${this.#i(!1,t)}`))}warn(e,...t){let r;(0!==this.#o&&!(this.#o>4)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.warn(`${r??""}${this.#i(!1,t)}`))}error(e,t,...r){let o;if((0===this.#o||this.#o>5)&&!this.isDebugging)return;if(null==(o=null==t||"string"==typeof t?t:`${t.prefix} ${r.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=rv.exec(t);null!=e&&(o=e[1])}}this.isDebugging;let i=`  ${o??""}${this.#i(!1,r)}`;null!=e?this.#e?.error(String(e),i):this.#e?.error(i)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let r=this.sanitize(t,e);if(null!=r)return r}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,r=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${r}]`}let r=this.#t?.toLoggable,o=r?.(e);if(null!=o)return o;let i=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return i?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):r?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let r=e.replace(ry,"")||e;if(this.#t?.sanitizeKeys?.has(r))return null!=this.#t.hash?`<${r}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${r}>`}#i(e,t){if(0===t.length||e&&(0===this.#o||this.#o>2)&&!this.isDebugging)return"";let r=t.map(e=>this.toLoggable(e)).join(", ");return 0!==r.length?` \u2014 ${r}`:""}};let rx=new Logger,rk=new WeakMap,r_={enabled:e=>rx.enabled(e),log:(e,t,r,...o)=>{switch(e){case"error":rx.error(void 0,t,r,...o);break;case"warn":t?.warn(r,...o);break;case"info":t?.info(r,...o);break;case"debug":default:t?.debug(r,...o);break;case"trace":t?.trace(r,...o)}}},r$=0x40000000-1;function rC(){let e=0;return{get current(){return e},next:function(){return e===r$&&(e=0),++e},reset:function(){e=0}}}function rS(e){let t=.001*performance.now(),r=Math.floor(t),o=Math.floor(t%1*1e9);return void 0!==e&&(r-=e[0],(o-=e[1])<0&&(r--,o+=1e9)),[r,o]}function rP(e){let[t,r]=rS(e);return 1e3*t+Math.floor(r/1e6)}let rA=new Map;function rE(e,t){let r=o;o=e.scopeId,rA.set(e.scopeId,e);try{return t()}finally{o=r,rA.delete(e.scopeId)}}function rO(){return null!=o?rA.get(o):void 0}let rT=rC();function rz(e,t,r){var o;let i,s,a={scopeId:e,prevScopeId:t,prefix:r,enabled:e=>rx.enabled(e),addExitInfo:function(...e){(i??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:i?.length?` \u2022 ${i.join(", ")}`:void 0,failed:s}}};return rR(a,"trace",rx.trace),rR(a,"debug",rx.debug),rR(a,"info",rx.info),rR(a,"warn",rx.warn),Object.defineProperty(o=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...r)=>rx.error(e,o,t,...r);return Object.defineProperty(o,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function rR(e,t,r){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let o=r.bind(rx,e);return Object.defineProperty(e,t,{value:o,writable:!1,enumerable:!0}),o}})}function rD(e,t,r){if(null!=r){let o=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==o?`[${r.padEnd(13)}]`:`[${r}${o.padStart(13-r.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function rI(){let e=rO();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function rL(e,t,r){if(null!=t&&"boolean"!=typeof t)return rz(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let o=t?rO()?.scopeId:void 0,i=rT.next();return rz(i,o,`${rD(i,o,r)} ${e}`)}function rM(e,t,r,...o){switch(t){case"trace":rx.trace(e,r,...o);break;case"info":rx.info(e,r,...o);break;default:rx.debug(e,r,...o)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=rL(e,void 0),rx.configure({name:e,createChannel:function(e){let t=rx.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?rx.trace(this.scope,e,...t):rx.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?rx.debug(this.scope,e,...t):rx.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?rx.info(this.scope,e,...t):rx.info(e,t.shift(),...t)}};let rN=new IpcNotification("home","subscription/didChange"),rB="graph";new IpcCommand(rB,"chooseRepository"),new IpcCommand(rB,"dblclick"),new IpcCommand(rB,"avatars/get"),new IpcCommand(rB,"refs/metadata/get"),new IpcCommand(rB,"rows/get"),new IpcCommand(rB,"pullRequest/openDetails"),new IpcCommand(rB,"row/action"),new IpcCommand(rB,"search/openInView"),new IpcCommand(rB,"search/cancel"),new IpcCommand(rB,"columns/update"),new IpcCommand(rB,"refs/update/visibility"),new IpcCommand(rB,"filters/update/excludeTypes"),new IpcCommand(rB,"configuration/update"),new IpcCommand(rB,"search/update/mode"),new IpcCommand(rB,"filters/update/includedRefs"),new IpcCommand(rB,"selection/update"),new IpcRequest(rB,"jumpToHead"),new IpcRequest(rB,"chooseRef"),new IpcRequest(rB,"chooseComparison"),new IpcRequest(rB,"chooseAuthor"),new IpcRequest(rB,"chooseFile"),new IpcRequest(rB,"rows/ensure"),new IpcRequest(rB,"search/history/get"),new IpcRequest(rB,"search/history/store"),new IpcRequest(rB,"search/history/delete"),new IpcRequest(rB,"counts"),new IpcRequest(rB,"row/hover/get"),new IpcRequest(rB,"search"),new IpcNotification(rB,"repositories/integration/didChange"),new IpcNotification(rB,"didChange",!0),new IpcNotification(rB,"configuration/didChange");let rF=new IpcNotification(rB,"subscription/didChange");new IpcNotification(rB,"org/settings/didChange"),new IpcNotification(rB,"avatars/didChange"),new IpcNotification(rB,"mcp/didChange"),new IpcNotification(rB,"branchState/didChange"),new IpcNotification(rB,"refs/didChangeMetadata"),new IpcNotification(rB,"columns/didChange"),new IpcNotification(rB,"scrollMarkers/didChange"),new IpcNotification(rB,"refs/didChangeVisibility"),new IpcNotification(rB,"rows/didChange"),new IpcNotification(rB,"rows/stats/didChange"),new IpcNotification(rB,"selection/didChange"),new IpcNotification(rB,"workingTree/didChange"),new IpcNotification(rB,"didSearch"),new IpcNotification(rB,"didFetch"),new IpcNotification(rB,"featurePreview/didStart");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(rN.is(e)||rF.is(e)||tc.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let r=`${e}|${t}`,o=this._promos.get(r);return null==o&&(o=this.ipc.sendRequest(t6,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(r,o)),await o}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(t3,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function rj(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function rU(e,t){return new Promise(r=>{e.addEventListener(t,function o(i){i.target===e&&(e.removeEventListener(t,o),r())})})}(x||(x={})).on=function(e,t,r,o){let i=!1;if("string"==typeof e){let s=function(t){let o=t?.target?.closest(e);null!=o&&r(t,o)};return document.addEventListener(t,s,o??!0),{dispose:()=>{i||(i=!0,document.removeEventListener(t,s,o??!0))}}}let s=function(e){r(e,this)};return e.addEventListener(t,s,o??!1),{dispose:()=>{i||(i=!0,e.removeEventListener(t,s,o??!1))}}};var rq=Uint8Array,rW=Uint16Array,rH=Int32Array,rV=new rq([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),rG=new rq([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),rK=new rq([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),rZ=function(e,t){for(var r=new rW(31),o=0;o<31;++o)r[o]=t+=1<<e[o-1];for(var i=new rH(r[30]),o=1;o<30;++o)for(var s=r[o];s<r[o+1];++s)i[s]=s-r[o]<<5|o;return{b:r,r:i}},rY=rZ(rV,2),rX=rY.b,rJ=rY.r;rX[28]=258,rJ[258]=28;var rQ=rZ(rG,0),r0=rQ.b;rQ.r;for(var r1=new rW(32768),r2=0;r2<32768;++r2){var r5=(43690&r2)>>1|(21845&r2)<<1;r5=(61680&(r5=(52428&r5)>>2|(13107&r5)<<2))>>4|(3855&r5)<<4,r1[r2]=((65280&r5)>>8|(255&r5)<<8)>>1}for(var r4=function(e,t,r){for(var o,i=e.length,s=0,a=new rW(t);s<i;++s)e[s]&&++a[e[s]-1];var c=new rW(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(r){o=new rW(1<<t);var h=15-t;for(s=0;s<i;++s)if(e[s])for(var p=s<<4|e[s],u=t-e[s],f=c[e[s]-1]++<<u,b=f|(1<<u)-1;f<=b;++f)o[r1[f]>>h]=p}else for(s=0,o=new rW(i);s<i;++s)e[s]&&(o[s]=r1[c[e[s]-1]++]>>15-e[s]);return o},r6=new rq(288),r2=0;r2<144;++r2)r6[r2]=8;for(var r2=144;r2<256;++r2)r6[r2]=9;for(var r2=256;r2<280;++r2)r6[r2]=7;for(var r2=280;r2<288;++r2)r6[r2]=8;for(var r3=new rq(32),r2=0;r2<32;++r2)r3[r2]=5;var r8=r4(r6,9,1),r7=r4(r3,5,1),r9=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},oe=function(e,t,r){var o=t/8|0;return(e[o]|e[o+1]<<8)>>(7&t)&r},ot=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(7&t)},or=function(e,t,r){return(null==t||t<0)&&(t=0),(null==r||r>e.length)&&(r=e.length),new rq(e.subarray(t,r))},oo=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],oi=function(e,t,r){var o=Error(t||oo[e]);if(o.code=e,Error.captureStackTrace&&Error.captureStackTrace(o,oi),!r)throw o;return o},os=function(e,t,r,o){var i=e.length,s=o?o.length:0;if(!i||t.f&&!t.l)return r||new rq(0);var a=!r,c=a||2!=t.i,h=t.i;a&&(r=new rq(3*i));var p=function(e){var t=r.length;if(e>t){var o=new rq(Math.max(2*t,e));o.set(r),r=o}},u=t.f||0,f=t.p||0,b=t.b||0,g=t.l,m=t.d,v=t.m,w=t.n,x=8*i;do{if(!g){u=oe(e,f,1);var _=oe(e,f+1,3);if(f+=3,_)if(1==_)g=r8,m=r7,v=9,w=5;else if(2==_){var $=oe(e,f,31)+257,C=oe(e,f+10,15)+4,S=$+oe(e,f+5,31)+1;f+=14;for(var P=new rq(S),A=new rq(19),E=0;E<C;++E)A[rK[E]]=oe(e,f+3*E,7);f+=3*C;for(var O=r9(A),T=(1<<O)-1,D=r4(A,O,1),E=0;E<S;){var M=D[oe(e,f,T)];f+=15&M;var N=M>>4;if(N<16)P[E++]=N;else{var B=0,F=0;for(16==N?(F=3+oe(e,f,3),f+=2,B=P[E-1]):17==N?(F=3+oe(e,f,7),f+=3):18==N&&(F=11+oe(e,f,127),f+=7);F--;)P[E++]=B}}var j=P.subarray(0,$),U=P.subarray($);v=r9(j),w=r9(U),g=r4(j,v,1),m=r4(U,w,1)}else oi(1);else{var N=((f+7)/8|0)+4,q=e[N-4]|e[N-3]<<8,W=N+q;if(W>i){h&&oi(0);break}c&&p(b+q),r.set(e.subarray(N,W),b),t.b=b+=q,t.p=f=8*W,t.f=u;continue}if(f>x){h&&oi(0);break}}c&&p(b+131072);for(var V=(1<<v)-1,G=(1<<w)-1,K=f;;K=f){var B=g[ot(e,f)&V],Y=B>>4;if((f+=15&B)>x){h&&oi(0);break}if(B||oi(2),Y<256)r[b++]=Y;else if(256==Y){K=f,g=null;break}else{var X=Y-254;if(Y>264){var E=Y-257,J=rV[E];X=oe(e,f,(1<<J)-1)+rX[E],f+=J}var Q=m[ot(e,f)&G],ee=Q>>4;Q||oi(3),f+=15&Q;var U=r0[ee];if(ee>3){var J=rG[ee];U+=ot(e,f)&(1<<J)-1,f+=J}if(f>x){h&&oi(0);break}c&&p(b+131072);var et=b+X;if(b<U){var er=s-U,eo=Math.min(U,et);for(er+b<0&&oi(3);b<eo;++b)r[b]=o[er+b]}for(;b<et;++b)r[b]=r[b-U]}}t.l=g,t.p=K,t.b=b,t.f=u,g&&(u=1,t.m=v,t.d=m,t.n=w)}while(!u)return b!=r.length&&a?or(r,0,b):r.subarray(0,b)},on=new rq(0),oa="u">typeof TextDecoder&&new TextDecoder;try{oa.decode(on,{stream:!0})}catch{}var ol=function(e){for(var t="",r=0;;){var o=e[r++],i=(o>127)+(o>223)+(o>239);if(r+i>e.length)return{s:t,r:or(e,r-1)};i?3==i?t+=String.fromCharCode(55296|(o=((15&o)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536)>>10,56320|1023&o):1&i?t+=String.fromCharCode((31&o)<<6|63&e[r++]):t+=String.fromCharCode((15&o)<<12|(63&e[r++])<<6|63&e[r++]):t+=String.fromCharCode(o)}};function oc(e,t){if(t){for(var r="",o=0;o<e.length;o+=16384)r+=String.fromCharCode.apply(null,e.subarray(o,o+16384));return r}if(oa)return oa.decode(e);var i=ol(e),s=i.s,r=i.r;return r.length&&oi(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let oh=/\(([\s\S]*)\)/,od=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,op=/\s?=.*$/;function ou(e){return null!=e&&(e instanceof Promise||"function"==typeof e?.then)}function of(e){var t,r;let o,i,s,a,c,h,p,u,f;return t="debug",c=!1,h=!0,null!=(r=e)&&({args:o,when:i,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=r),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,f="trace"===t?rx.trace:"debug"===t?rx.debug:rx.info,(e,r,h)=>{let b,g;if("function"==typeof h.value?(b=h.value,g="value"):"function"==typeof h.get&&(b=h.get,g="get"),null==b||null==g)throw Error("Not supported");let m=null==o?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),r=(t=(t=t.replace(od,"")||t).slice(0,t.indexOf("{"))).indexOf("("),o=t.indexOf(")");r=r>=0?r+1:0,o=o>0?o:t.indexOf("="),t=t.slice(r,o),t=`(${t})`;let i=oh.exec(t);return null!=i?i[1].split(",").map(e=>e.trim().replace(op,"")):[]}(b):[];h[g]=function(...e){let h;if(!rx.enabled()||null!=i&&!i.apply(this,e))return b.apply(this,e);let g=rx.enabled(t),v=rI(),w=v?.scopeId,x=rT.next(),_=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let r=t?.name??"",o=r.indexOf("_");-1!==o&&(r=r.substring(o+1));let i=t;for(;null!=i;){let t=rk.get(i);if(null!=t)return t(e,r);i=Object.getPrototypeOf(i)}return r}(this):void 0,$=_?`${rD(x,w)} ${_}.${r}`:`${rD(x,w)} ${r}`;null!=a&&($=a({id:x,instance:this,instanceName:_??"",name:r,prefix:$},...e));let C=rz(x,w,$),S=!1,P=()=>(S||(S=!0,h=function(e,t,r){if(!1===e||!t.length)return;if("function"==typeof e){let r=e(...t);if(!1===r)return;let o="";for(let[e,t]of Object.entries(r))o.length&&(o+=", "),o+=`${e}=${rx.toLoggable(t,e)}`;return o||void 0}let o="",i=-1;for(let e of t){let t=r[++i];o.length&&(o+=", "),o+=t?`${t}=${rx.toLoggable(e,t)}`:rx.toLoggable(e)}return o||void 0}(o,e,m)),h);if(!c&&g){let e=P();f.call(rx,e?`${$}(${e})`:$)}if(c||u||null!=s){let t=u?rS():void 0,r=e=>{let r=void 0!==t?` [${rP(t)}ms]`:"",o=C.getExitInfo();if(c){let t=P();rx.error(e,t?`${$}(${t})`:$,o?.details?`failed${o.details}${r}`:`failed${r}`)}else rx.error(e,$,o?.details?`failed${o.details}${r}`:`failed${r}`)},o=e=>{let r,o,i,a;null!=t?(r=rP(t))>p?(o=rx.warn,i=` [*${r}ms] (slow)`):(o=f,i=` [${r}ms]`):(i="",o=f);let h=C.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${rx.toLoggable(e)}`);else h?.failed?(a=h.failed,o=(e,...t)=>rx.error(null,e,...t)):a="completed";if(g||o!==f){let e=P();c?(!0===c||0===c.after||r>c.after)&&o.call(rx,e?`${$}(${e}) ${a}${h?.details||""}${i}`:`${$} ${a}${h?.details||""}${i}`):o.call(rx,e?`${$}(${e}) ${a}${h?.details||""}${i}`:`${$} ${a}${h?.details||""}${i}`)}};return rE(C,()=>{let t;try{t=b.apply(this,e)}catch(e){throw r(e),e}return null!=t&&ou(t)?t.then(o,r):o(t),t})}return rE(C,()=>b.apply(this,e))}}}Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...r){let o;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:rL(e??"",!1,t?.scopeLabel);let i=t?.log;if(o=null==i||!0===i?{}:!1===i||i.onlyExit?void 0:i,this.logLevel=("object"==typeof i?i.level:void 0)??"debug",this.logProvider=t?.provider??r_,this._time=rS(),null!=o){if(!this.logProvider.enabled(this.logLevel))return;r.length?this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`,...r):this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return rP(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=rS(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let r=rP(this._time),o=e?.message??"";this.logProvider.log(r>250?"warn":this.logLevel,this.logScope,`${o?`${o} `:""}[${r}ms]${e?.suffix??""}`)}};(()=>{let e;var t,r,o={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function r(e,t){for(var r,o="",i=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)r=e.charCodeAt(c);else{if(47===r)break;r=47}if(47===r){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(o.length<2||2!==i||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",i=0):i=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),s=c,a=0;continue}}else if(2===o.length||1===o.length){o="",i=0,s=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",i=2)}else o.length>0?o+="/"+e.slice(s+1,c):o=e.slice(s+1,c),i=c-s-1;s=c,a=0}else 46===r&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,i="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===o&&(o=process.cwd()),e=o),t(e),0!==e.length&&(i=e+"/"+i,s=47===e.charCodeAt(0));return i=r(i,!s),s?i.length>0?"/"+i:"/":i.length>0?i:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),i=47===e.charCodeAt(e.length-1);return 0!==(e=r(e,!o)).length||o||(e="."),e.length>0&&i&&(e+="/"),o?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];t(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":o.normalize(e)},relative:function(e,r){if(t(e),t(r),e===r||(e=o.resolve(e))===(r=o.resolve(r)))return"";for(var i=1;i<e.length&&47===e.charCodeAt(i);++i);for(var s=e.length,a=s-i,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,u=-1,f=0;f<=p;++f){if(f===p){if(h>p){if(47===r.charCodeAt(c+f))return r.slice(c+f+1);if(0===f)return r.slice(c+f)}else a>p&&(47===e.charCodeAt(i+f)?u=f:0===f&&(u=0));break}var b=e.charCodeAt(i+f);if(b!==r.charCodeAt(c+f))break;47===b&&(u=f)}var g="";for(f=i+u+1;f<=s;++f)f!==s&&47!==e.charCodeAt(f)||(0===g.length?g+="..":g+="/..");return g.length>0?g+r.slice(c+u):(c+=u,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var r=e.charCodeAt(0),o=47===r,i=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(r=e.charCodeAt(a))){if(!s){i=a;break}}else s=!1;return -1===i?o?"/":".":o&&1===i?"//":e.slice(0,i)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');t(e);var o,i=0,s=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var c=r.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){i=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(s=o):(c=-1,s=h))}return i===s?s=h:-1===s&&(s=e.length),e.slice(i,s)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){i=o+1;break}}else -1===s&&(a=!1,s=o+1);return -1===s?"":e.slice(i,s)},extname:function(e){t(e);for(var r=-1,o=0,i=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===i&&(s=!1,i=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1);else if(!s){o=c+1;break}}return -1===r||-1===i||0===a||1===a&&r===i-1&&r===o+1?"":e.slice(r,i)},format:function(e){var t,r;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+r:t+"/"+r:r},parse:function(e){t(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var o,i=e.charCodeAt(0),s=47===i;s?(r.root="/",o=1):o=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,f=0;u>=o;--u)if(47!==(i=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===i?-1===a?a=u:1!==f&&(f=1):-1!==a&&(f=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===f||1===f&&a===h-1&&a===c+1?-1!==h&&(r.base=r.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(r.name=e.slice(1,a),r.base=e.slice(1,h)):(r.name=e.slice(c,a),r.base=e.slice(c,h)),r.ext=e.slice(a,h)),c>0?r.dir=e.slice(0,c-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return o[e](r,r.exports,s),r.exports}s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>r}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,r,o,i,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,r||""),this.query=o||"",this.fragment=i||"",u(this,s))}get fsPath(){return w(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:r,path:o,query:i,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===r?r=this.authority:null===r&&(r=""),void 0===o?o=this.path:null===o&&(o=""),void 0===i?i=this.query:null===i&&(i=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&r===this.authority&&o===this.path&&i===this.query&&s===this.fragment?this:new d(t,r,o,i,s)}static parse(e,t=!1){let r=f.exec(e);return r?new d(r[2]||"",C(r[4]||""),C(r[5]||""),C(r[7]||""),C(r[9]||""),t):new d("","","","","")}static file(t){let r="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(r=t.substring(2),t="/"):(r=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",r,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return x(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===b?e.fsPath:null,t}}return e}};let b=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=w(this,!1)),this._fsPath}toString(e=!1){return e?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=b),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let g={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function m(e,t,r){let o,i=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||r&&91===a||r&&93===a||r&&58===a)-1!==i&&(o+=encodeURIComponent(e.substring(i,s)),i=-1),void 0!==o&&(o+=e.charAt(s));else{void 0===o&&(o=e.substr(0,s));let t=g[a];void 0!==t?(-1!==i&&(o+=encodeURIComponent(e.substring(i,s)),i=-1),o+=t):-1===i&&(i=s)}}return -1!==i&&(o+=encodeURIComponent(e.substring(i))),void 0!==o?o:e}function v(e){let t;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);35===o||63===o?(void 0===t&&(t=e.substr(0,r)),t+=g[o]):void 0!==t&&(t+=e[r])}return void 0!==t?t:e}function w(t,r){let o;return o=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?r?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(o=o.replace(/\//g,"\\")),o}function x(e,t){let r=t?v:m,o="",{scheme:i,authority:s,path:a,query:c,fragment:h}=e;if(i&&(o+=i,o+=":"),(s||"file"===i)&&(o+="/",o+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?o+=r(t,!1,!1):(o+=r(t.substr(0,e),!1,!1),o+=":",o+=r(t.substr(e+1),!1,!0)),o+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?o+=r(s,!1,!0):(o+=r(s.substr(0,e),!1,!0),o+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}o+=r(a,!0,!1)}return c&&(o+="?",o+=r(c,!1,!1)),h&&(o+="#",o+=t?h:m(h,!1,!1)),o}let $=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function C(e){return e.match($)?e.replace($,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var S=s(975);let P=S.posix||S;(t=r||(r={})).joinPath=function(e,...t){return e.with({path:P.join(e.path,...t)})},t.resolvePath=function(e,...t){let r=e.path,o=!1;"/"!==r[0]&&(r="/"+r,o=!0);let i=P.resolve(r,...t);return o&&"/"===i[0]&&!e.authority&&(i=i.substring(1)),e.with({path:i})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=P.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return P.basename(e.path)},t.extname=function(e){return P.extname(e.path)},_=a})();let{URI:ob,Utils:og}=_;function om(e,t){return JSON.parse(e,(e,r)=>(function(e,t){let r=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==r)return e;switch(r.__ipc){case"date":return new Date(r.value);case"promise":return t(r.value);case"uri":return ob.revive(r.value)}})(r,t))}let ov="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(e,t,r)=>{this.listeners??=new LinkedList;let o=this.listeners.push(null==t?e:[e,t]),i={dispose:()=>{i.dispose=Emitter._noop,this._disposed||o()}};return Array.isArray(r)&&r.push(i),i},this._event}fire(e){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let t=this.listeners.iterator(),r=t.next();!r.done;r=t.next())this._deliveryQueue.push([r.value,e]);for(;this._deliveryQueue.size>0;){let[e,t]=this._deliveryQueue.shift();try{"function"==typeof e?e(t):e[0].call(e[1],t)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let oy={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(e){this.element=e,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let r=new events_Node(e);if(this._first===events_Node.Undefined)this._first=r,this._last=r;else if(t){let e=this._last;this._last=r,r.prev=e,e.next=r}else{let e=this._first;this._first=r,r.next=e,e.prev=r}this._size+=1;let o=!1;return()=>{o||(o=!0,this._remove(r))}}shift(){if(this._first===events_Node.Undefined)return;let e=this._first.element;return this._remove(this._first),e}pop(){if(this._last===events_Node.Undefined)return;let e=this._last.element;return this._remove(this._last),e}_remove(e){if(e.prev!==events_Node.Undefined&&e.next!==events_Node.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===events_Node.Undefined&&e.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):e.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):e.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let e,t=this._first;return{next:function(){return t===events_Node.Undefined?oy:(null==e?e={done:!1,value:t.element}:e.value=t.element,t=t.next,e)}}}toArray(){let e=[];for(let t=this._first;t!==events_Node.Undefined;t=t.next)e.push(t.element);return e}};var ow=Object.defineProperty,ox=Object.getOwnPropertyDescriptor,ok=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),o_=e=>{throw TypeError(e)},o$=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ox(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&ow(t,r,s),s};function oC(){return i??=null!=s?s():acquireVsCodeApi()}let oS=rC();function oP(){return`webview:${oS.next()}`}let oA=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=oC(),this._disposable=x.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,r,i,s,a,c,h,p,u,f=[];try{if(i=e.data,"object"==typeof i&&null!==i&&ov in i&&!0===i[ov])return;let a=e.data,c=((e,t,r)=>{if(null!=t){var o,i;"object"!=typeof t&&"function"!=typeof t&&o_("Object expected"),r&&(o=t[ok("asyncDispose")]),void 0===o&&(o=t[ok("dispose")],r&&(i=o)),"function"!=typeof o&&o_("Object not disposable"),i&&(o=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.push([r,o,t])}else r&&e.push([r]);return t})(f,function(e,t,r){var i,s;let a,c,h;if(!rx.enabled())return;let p=(i=r?.scope??!0,s=r?.scopeLabel,c=rO(),o=(h=rL(e,i,s)).scopeId,rA.set(h.scopeId,h),h[Symbol.dispose]=()=>{let e;e=h?.scopeId??o,null!=e&&rA.delete(e),o=c?.scopeId},h);if(!t)return p;let u="debug",f=!1;"object"==typeof t&&(u=t.level??u,a=t.message,f=!0===t.onlyExit);let b=rS();f||rM(p,u,a??"");let g=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=rP(b),t=` [${e}ms]`,r=p.getExitInfo(),o=r.failed??"completed";null!=r.failed?rx.error(null,p,`${o}${r.details??""}${t}`):rM(p,u,`${o}${r.details??""}${t}`),g()},p}(`(e=${a.id}|${a.method})`,void 0,{scope:rI()})),h=function(e,t,...r){let o=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??r_).enabled(o)?new Stopwatch(e,t,...r):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(a.compressed&&a.params instanceof Uint8Array){if("deflate"===a.compressed)try{a.params=oc((s=a.params,os(s,{i:2},void 0,void 0)))}catch(e){a.params=oc(a.params)}else a.params=oc(a.params);h?.restart({message:`\u2022 decompressed (${a.compressed}) serialized params`})}if("string"==typeof a.params?(a.params=om(a.params,e=>this.getResponsePromise(e.method,e.id)),h?.stop({message:"• deserialized params"})):null==a.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-a.timestamp}ms`),null!=a.completionId){let e=(t=a.method,r=a.completionId,`${t}|${r}`);this._pendingHandlers.get(e)?.(a);return}this._onReceiveMessage.fire(a)}catch(e){var b=e,g=!0}finally{a=b,c=g,h="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},p=e=>a=c?new h(e,a,"An error was suppressed during disposal"):(c=!0,e),(u=e=>{for(;e=f.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(u,e=>(p(e),u()))}catch(e){p(e)}if(c)throw a})()}}deserializeIpcData(e){return om(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let r=oP();this.postMessage({id:r,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let r=oP(),o=this.getResponsePromise(e.response.method,r);return this.postMessage({id:r,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:r}),o}getResponsePromise(e,t){return new Promise((r,o)=>{var i,s;let a,c=(i=e,s=t,`${i}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),o(Error(`Timed out waiting for completion of ${c}`))},(rx.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===t8.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>o(Error(t.reason))):queueMicrotask(()=>r(t.value))}else queueMicrotask(()=>r(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function oE(e,t){let r=Math.pow(10,t);return Math.round(e*r)/r}o$([of({args:e=>({e:`${e.data.id}|${e.data.method}`})})],oA.prototype,"onMessageReceived",1),o$([of({args:e=>({commandType:e.method})})],oA.prototype,"sendCommand",1),o$([of({args:e=>({requestType:e.method})})],oA.prototype,"sendRequest",1),o$([of({args:e=>({e:`${e.id}, method=${e.method}`})})],oA.prototype,"postMessage",1),oA=o$([(b=e=>`${e.appName}(HostIpc)`,e=>void rk.set(e,b))],oA);let RGBA=class RGBA{constructor(e,t,r,o=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,r)),this.a=oE(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,r,o){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=oE(Math.max(Math.min(1,t),0),3),this.l=oE(Math.max(Math.min(1,r),0),3),this.a=oE(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,r=e.g/255,o=e.b/255,i=e.a,s=Math.max(t,r,o),a=Math.min(t,r,o),c=0,h=0,p=(a+s)/2,u=s-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),s){case t:c=(r-o)/u+6*(r<o);break;case r:c=(o-t)/u+2;break;case o:c=(t-r)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,i)}static _hue2rgb(e,t,r){return(r<0&&(r+=1),r>1&&(r-=1),r<1/6)?e+(t-e)*6*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}static toRGBA(e){let t,r,o,i=e.h/360,{s,l:a,a:c}=e;if(0===s)t=r=o=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,i+1/3),r=HSLA._hue2rgb(c,e,i),o=HSLA._hue2rgb(c,e,i-1/3)}return new RGBA(Math.round(255*t),Math.round(255*r),Math.round(255*o),c)}};let HSVA=class HSVA{constructor(e,t,r,o){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=oE(Math.max(Math.min(1,t),0),3),this.v=oE(Math.max(Math.min(1,r),0),3),this.a=oE(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,r=e.g/255,o=e.b/255,i=Math.max(t,r,o),s=i-Math.min(t,r,o);return new HSVA(Math.round(60*(0===s?0:i===t?((r-o)/s%6+6)%6:i===r?(o-t)/s+2:(t-r)/s+4)),0===i?0:s/i,i,e.a)}static toRGBA(e){let{h:t,s:r,v:o,a:i}=e,s=o*r,a=s*(1-Math.abs(t/60%2-1)),c=o-s,[h,p,u]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,u=a):t<240?(p=a,u=s):t<300?(h=a,u=s):t<=360&&(h=s,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),i)}};function oO(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(oO(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return oE(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),r=e.getRelativeLuminance();return t>r?(t+.05)/(r+.05):(r+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:r,b:o,a:i}=this.rgba;return new Color(new RGBA(t,r,o,i*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,r=this.rgba.a,o=t.a,i=r+o*(1-r);return i<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*r/i+t.r*o*(1-r)/i,this.rgba.g*r/i+t.g*o*(1-r)/i,this.rgba.b*r/i+t.b*o*(1-r)/i,i))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:r,b:o,a:i}=this.rgba;return new Color(new RGBA(e.rgba.r-i*(e.rgba.r-t),e.rgba.g-i*(e.rgba.g-r),e.rgba.b-i*(e.rgba.b-o),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let r=1-e.rgba.a;return new Color(new RGBA(r*t.rgba.r+e.rgba.a*e.rgba.r,r*t.rgba.g+e.rgba.a*e.rgba.g,r*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${oT(e.rgba.r)}${oT(e.rgba.g)}${oT(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,r){if(e.isLighterThan(t))return e;r=r||.5;let o=e.getRelativeLuminance(),i=t.getRelativeLuminance();return r=r*(i-o)/i,e.lighten(r)}static getDarkerColor(e,t,r){if(e.isDarkerThan(t))return e;r=r||.5;let o=e.getRelativeLuminance(),i=t.getRelativeLuminance();return r=r*(o-i)/o,e.darken(r)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function oT(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let oz=new Emitter,oR=oz.event;function oD(e){let t=document.documentElement,r=window.getComputedStyle(t),o=document.body.classList,i=o.contains("vscode-light")||o.contains("vscode-high-contrast-light"),s=o.contains("vscode-high-contrast")||o.contains("vscode-high-contrast-light"),a=oO("--vscode-editor-background",r),c=oO("--vscode-editor-foreground",r);return c||(c=oO("--vscode-foreground",r)),{colors:{background:a,foreground:c},computedStyle:r,isLightTheme:i,isHighContrastTheme:s,isInitializing:null==e}}var oI=Object.defineProperty,oL=Object.getOwnPropertyDescriptor,oM=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?oL(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&oI(t,r,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(t2(e)),r=t.webviewId,o=t.webviewInstanceId;this._webview={webviewId:r,webviewInstanceId:o,createCommandLink:(e,t)=>{var i;return e.endsWith(":")&&(e=`${e}${r.split(".").at(-1)}`),i=e,`command:${i}?${encodeURIComponent(JSON.stringify({webview:r,webviewInstance:o,...t}))}`}}}connectedCallback(){let e,t,r,o;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new oA(this.name);let i=oD();if(null!=this.onThemeUpdated){let e;this.onThemeUpdated(i),this.disposables.push(((e=new MutationObserver(e=>{oz.fire(oD(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),this.disposables.push(oR(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case t7.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case t9.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(r=0,o=eQ(e=>{let t=`webview:${++r}`;oC().postMessage({id:t,scope:t4.scope,method:t4.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:r=>{let i=r.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==i)&&(e=!0,t=i,o({focused:!0,inputFocused:i}))},onFocusOut:r=>{(!1!==e||!1!==t)&&(e=!1,t=!1,o({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return ek`<slot></slot>`}};oM([eL({type:String})],GlWebviewApp.prototype,"name",2),oM([eL({type:String})],GlWebviewApp.prototype,"placement",2),oM([th({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),oM([th({context:"logger"})],GlWebviewApp.prototype,"_logger",2),oM([th({context:"promos"})],GlWebviewApp.prototype,"_promos",2),oM([th({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),oM([th({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[tF];var oN=Object.defineProperty,oB=Object.getOwnPropertyDescriptor;let GlAppHost=class GlAppHost extends GlWebviewApp{get state(){return this._stateProvider.state}connectedCallback(){super.connectedCallback();let e=this.bootstrap;this.bootstrap=void 0,this._stateProvider=this.createStateProvider(e,this._ipc,this._logger),this.initWebviewContext(e),this.disposables.push(this._stateProvider)}};((e,t,r,o)=>{for(var i,s=o>1?void 0:o?oB(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&oN(t,r,s)})([eL({type:String,noAccessor:!0})],GlAppHost.prototype,"bootstrap",2);let oF=M`
	a {
		border: 0;
		color: var(--link-foreground);
		font-weight: 400;
		outline: none;
		text-decoration: var(--link-decoration-default, none);
	}

	a:focus-visible {
		outline: 1px solid var(--color-focus-border);
		border-radius: 0.2rem;
	}

	a:hover {
		color: var(--link-foreground-active);
		text-decoration: underline;
	}
`,oj=M`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;let StateProviderBase=class StateProviderBase{constructor(e,t,r,o){this.host=e,this.ipc=r,this.logger=o,this._state=this.ipc.deserializeIpcData(t2(t)),this.logger?.debug(`bootstrap duration=${Date.now()-this._state.timestamp}ms`),this.provider=this.createContextProvider(this._state),this.onPersistState?.(this._state),this.disposable=this.ipc.onReceiveMessage(this.onMessageReceived.bind(this)),this.initializeState()}get state(){return this._state}get webviewId(){return this._state.webviewId}get webviewInstanceId(){return this._state.webviewInstanceId}get timestamp(){return this._state.timestamp}dispose(){this.disposable.dispose()}get deferBootstrap(){return!1}async initializeState(){if(this.deferBootstrap){let e=await this.ipc.sendRequest(t5,{bootstrap:!0});if(null!=e.state){let t=ou(e.state)?await e.state:e.state;this.onDeferredBootstrapStateReceived(t)}}else this.ipc.sendRequest(t5,{bootstrap:!1})}onDeferredBootstrapStateReceived(e){this._state={...e,timestamp:Date.now()},this.provider.setValue(this._state,!0),this.host.requestUpdate()}};let TimelineStateProvider=class TimelineStateProvider extends StateProviderBase{createContextProvider(e){return new context_provider_i(this.host,{context:"state",initialValue:e})}onMessageReceived(e){!0===tc.is(e)&&(this._state={...e.params.state,timestamp:Date.now()},this.provider.setValue(this._state,!0),this.host.requestUpdate())}onPersistState(e){this.ipc.setPersistedState({config:e.config,scope:e.scope})}};let oU=M`
	* {
		box-sizing: border-box;
	}

	:not(:defined) {
		visibility: hidden;
	}

	[hidden] {
		display: none !important;
	}

	/* roll into shared focus style */
	:focus-visible {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	b {
		font-weight: 600;
	}

	p {
		margin-top: 0;
	}

	ul {
		margin-top: 0;
		padding-left: 1.2em;
	}

	section,
	header {
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	h2 {
		font-weight: 400;
	}

	h3 {
		border: none;
		color: var(--color-view-header-foreground);
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0;
		white-space: nowrap;
	}

	h4 {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0.5rem 0 1rem 0;
	}
`,oq=M`
	:host {
		display: block;
		color: var(--color-view-foreground);
		font-family: var(--font-family);
		font-size: var(--font-size);
		margin: 0;
		padding: 0;
		height: 100vh;
		overflow: hidden;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		flex: none;
		display: grid;
		grid-template-columns: 1fr min-content;
		align-items: center;
		grid-template-areas: 'details toolbox';
		margin: 0.5rem 1rem;
	}

	:host-context(body[data-placement='editor']) .header {
		margin-top: 1rem;
		margin-right: 1.5rem;
	}

	.details {
		grid-area: details;
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: var(--font-size);
		min-width: 0;
		margin-right: 1rem;
	}

	.details gl-breadcrumbs {
		flex: 1;
		min-width: 0;
		padding: 0.1rem 0;
		overflow: hidden;
	}

	.details .details__ref,
	.details .details__timeframe {
		min-width: 0;
		margin: 0;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.details .details__ref {
		flex: 0 100000000 auto;
		color: var(--color-foreground--75);
		font-size: 1.2rem;
		margin-left: auto;
	}

	.details .details__ref .ref {
		margin-left: 0.25rem;
	}

	.details .details__timeframe {
		flex: 0 0 auto;
		color: var(--color-foreground--75);
		margin-right: 0.6rem;
		user-select: none;
		white-space: nowrap;
		font-size: 1.2rem;
		margin-left: auto;
	}

	.toolbox {
		grid-area: toolbox;
		align-items: center;
		display: flex;
		gap: 0.3rem;
	}

	.toolbox gl-feature-badge {
		padding-bottom: 0.4rem;
	}

	:host-context(body[data-placement='editor']) .toolbox gl-feature-badge {
		padding-left: 0.4rem;
	}

	.select-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 100% 0 1;
		position: relative;
	}

	.select-container label {
		margin: 0 1rem 0 0;
		font-size: var(--font-size);
		user-select: none;
	}

	.select-container::after {
		font-family: codicon;
		content: '\\eab4';
		font-size: 1.4rem;
		pointer-events: none;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		position: absolute;
		color: var(--vscode-foreground);
	}

	.select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border: 1px solid var(--vscode-dropdown-border);
		cursor: pointer;
		font-family: inherit;
		min-height: 100%;
		padding: 2px 26px 2px 8px;
		background-color: var(--vscode-dropdown-background);
		border-radius: 0.3rem;
		box-sizing: border-box;
		color: var(--vscode-foreground);
		font-family: var(--font-family);
		height: 26px;
		user-select: none;
	}

	.timeline {
		flex: 1;
		min-height: 0;
	}

	.timeline__empty {
		padding: 0.4rem 2rem 1.3rem 2rem;
		font-size: var(--font-size);
	}

	.timeline__empty p {
		margin-top: 0;
	}

	:host-context(body[data-placement='view']) gl-feature-gate {
		background-color: var(--vscode-sideBar-background);
	}

	gl-feature-gate gl-feature-badge {
		vertical-align: super;
		margin-left: 0.4rem;
		margin-right: 0.4rem;
	}

	label {
		min-width: fit-content;
	}

	label[disabled] {
		opacity: 0.5;
	}

	.config__content {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		max-width: 30rem;
		min-width: 20rem;

		margin-bottom: 0.4rem;
	}

	.config__content menu-label {
		padding: 0;
		margin-bottom: -0.4rem;
	}

	.config__content section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.breadcrumb-item-children {
		display: flex;
	}

	.breadcrumb-folder {
		cursor: pointer;
	}
`,oW=M`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;

		--scroller-track-top: unset;
		--scroller-track-left: 0;
		--scroller-track-width: 100%;
		--scroller-thumb-height: 0.6rem;
		--scroller-track-height: 1.2rem;
	}

	gl-chart-scroller {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		min-height: 0;
	}

	gl-chart-scroller::part(track) {
		--track-top: var(--scroller-track-top);
		--track-left: var(--scroller-track-left);
		--track-width: var(--scroller-track-width);
		--track-height: var(--scroller-track-height);
		--thumb-height: var(--scroller-thumb-height);
	}

	#chart {
		flex: 1;
		width: 100%;
		height: 100%;
		min-height: 0;
	}

	footer {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		margin: 0 1rem 0.4rem 1rem;
		gap: 0.8rem;
	}

	gl-chart-slider {
		flex: 1 0 auto;
		margin-left: 1.4rem;
	}

	gl-commit-sha {
		color: var(--color-foreground--75);
		text-align: right;
		min-width: 7.5rem; /* Ugly but stops the text from jumping around */
	}

	.bb svg {
		font: 10px var(--font-family);
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.bb path,
	.bb line {
		fill: none;
	}

	:host-context(.vscode-dark) .bb path.domain,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb path.domain {
		stroke: var(--color-background--lighten-15);
	}

	:host-context(.vscode-light) .bb path.domain,
	:host-context(.vscode-high-contrast-light) .bb path.domain {
		stroke: var(--color-background--darken-15);
	}

	.bb text,
	.bb .bb-button {
		user-select: none;
		fill: var(--color-view-foreground);
	}

	.bb .bb-event-rects,
	.bb .bb-event-rect {
		cursor: pointer !important;
	}

	.bb .bb-event-rects:active,
	.bb .bb-event-rect:active {
		cursor: ew-resize !important;
	}

	.bb .bb-xgrid-focus,
	.bb .bb-ygrid-focus,
	.bb .bb-ygrid,
	.bb .bb-event-rect,
	.bb .bb-bars path {
		shape-rendering: crispEdges;
	}

	.bb .bb-legend-item text {
		fill: var(--color-foreground--85);
	}

	.bb .bb-legend-item-tile {
		stroke-width: 2px;
		transform: translate(0, 1px);
	}

	.bb .bb-chart-arc .bb-gauge-value {
		fill: #000;
	}

	.bb .bb-chart-arc path {
		stroke: #fff;
	}

	.bb .bb-chart-arc rect {
		stroke: #fff;
		stroke-width: 1;
	}

	.bb .bb-chart-arc text {
		fill: #fff;
		font-size: 13px;
	}

	.bb .bb-axis {
		shape-rendering: crispEdges;
	}

	.bb .bb-grid {
		pointer-events: none;
	}

	:host-context(.vscode-dark) .bb .bb-grid line,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-grid line {
		stroke: var(--color-background--lighten-05);
	}

	:host-context(.vscode-dark) .bb .bb-grid line.bb-ygrid,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-grid line.bb-ygrid {
		stroke: var(--color-background--lighten-05);
	}

	:host-context(.vscode-light) .bb .bb-grid line,
	:host-context(.vscode-high-contrast-light) .bb .bb-grid line {
		stroke: var(--color-background--darken-05);
	}

	:host-context(.vscode-light) .bb .bb-grid line.bb-ygrid,
	:host-context(.vscode-high-contrast-light) .bb .bb-grid line.bb-ygrid {
		stroke: var(--color-background--darken-05);
	}

	.bb .bb-grid text {
		fill: var(--color-view-foreground);
	}

	:host-context(.vscode-dark) .bb .bb-xgrid-focus line,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-xgrid-focus line {
		stroke: var(--color-background--lighten-30);
	}

	:host-context(.vscode-light) .bb .bb-xgrid-focus line,
	:host-context(.vscode-high-contrast-light) .bb .bb-xgrid-focus line {
		stroke: var(--color-background--darken-30);
	}

	.bb .bb-text.bb-empty {
		fill: #808080;
		font-size: 2em;
	}

	.bb .bb-line {
		stroke-width: 1px;
	}

	.bb .bb-circle._expanded_ {
		opacity: 1 !important;
		fill-opacity: 1 !important;
		stroke-opacity: 1 !important;
		stroke-width: 3px;
	}

	.bb .bb-selected-circle {
		opacity: 1 !important;
		fill-opacity: 1 !important;
		stroke-opacity: 1 !important;
		stroke-width: 3px;
	}

	.bb .bb-bar {
		stroke-width: 0;
		opacity: 0.9 !important;
		fill-opacity: 0.9 !important;
	}

	.bb .bb-bar._expanded_ {
		opacity: 1 !important;
		fill-opacity: 1 !important;
	}

	.bb .bb-candlestick {
		stroke-width: 1px;
	}

	.bb .bb-candlestick._expanded_ {
		fill-opacity: 0.75;
	}

	.bb .bb-target.bb-focused,
	.bb .bb-circles.bb-focused {
		opacity: 1;
	}

	.bb .bb-target.bb-focused path.bb-line,
	.bb .bb-target.bb-focused path.bb-step,
	.bb .bb-circles.bb-focused path.bb-line,
	.bb .bb-circles.bb-focused path.bb-step {
		stroke-width: 2px;
	}

	.bb .bb-target.bb-defocused,
	.bb .bb-circles.bb-defocused {
		opacity: 0.2 !important;
	}

	.bb .bb-target.bb-defocused .text-overlapping,
	.bb .bb-circles.bb-defocused .text-overlapping {
		opacity: 0.05 !important;
	}

	.bb .bb-region {
		fill: steelblue;
		fill-opacity: 0.1;
	}

	:host-context(.vscode-dark) .bb .bb-zoom-brush,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .bb .bb-zoom-brush {
		fill: white;
		fill-opacity: 0.2;
	}

	:host-context(.vscode-light) .bb .bb-zoom-brush,
	:host-context(.vscode-high-contrast-light) .bb .bb-zoom-brush {
		fill: black;
		fill-opacity: 0.1;
	}

	.bb .bb-brush .extent {
		fill-opacity: 0.1;
	}

	.bb .bb-legend-item {
		font-size: 12px;
		user-select: none;
	}

	.bb .bb-legend-item-hidden {
		opacity: 0.15;
	}

	.bb .bb-legend-background {
		opacity: 0.75;
		fill: white;
		stroke: lightgray;
		stroke-width: 1;
	}

	.bb .bb-title {
		font: 14px var(--font-family);
	}

	.bb .bb-tooltip-container {
		z-index: 10;
		user-select: none;
	}

	.bb .bb-area {
		stroke-width: 0;
		opacity: 0.2;
	}

	.bb .bb-chart-arcs-title {
		dominant-baseline: middle;
		font-size: 1.3em;
	}

	.bb text.bb-chart-arcs-gauge-title {
		dominant-baseline: middle;
		font-size: 2.7em;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-background {
		fill: #e0e0e0;
		stroke: #fff;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-unit {
		fill: #000;
		font-size: 16px;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-max {
		fill: #777;
	}

	.bb .bb-chart-arcs .bb-chart-arcs-gauge-min {
		fill: #777;
	}

	.bb .bb-chart-radars .bb-levels polygon {
		fill: none;
		stroke: #848282;
		stroke-width: 0.5px;
	}

	.bb .bb-chart-radars .bb-levels text {
		fill: #848282;
	}

	.bb .bb-chart-radars .bb-axis line {
		stroke: #848282;
		stroke-width: 0.5px;
	}

	.bb .bb-chart-radars .bb-axis text {
		font-size: 1.15em;
		cursor: default;
	}

	.bb .bb-chart-radars .bb-shapes polygon {
		fill-opacity: 0.2;
		stroke-width: 1px;
	}

	.bb .bb-button {
		position: absolute;
		top: 0.4rem;
		right: -1.4rem;
		background-color: var(--color-button-background);
		color: var(--color-button-foreground);
		font-size: var(--font-size);
		font-family: var(--font-family);
	}

	:host-context([data-placement='view']) .bb .bb-button {
		margin-right: 2.8rem;
	}

	.bb .bb-zoom-reset {
		display: inline-block;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.notice {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10% 2rem 30% 2rem;
		font-size: var(--font-size);

		z-index: 1;
	}

	.notice--blur {
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);

		animation: fadeIn 0.2s ease-in;
		animation-fill-mode: forwards;
		opacity: 0;
	}

	:host-context([data-placement='view']) .notice--blur {
		animation-delay: 0.5s;
	}

	.notice p {
		margin: 0;
	}

	.bb-tooltip {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-hover-background);
		color: var(--color-hover-foreground);
		border: 1px solid var(--color-hover-border);
		box-shadow: 0 2px 8px var(--vscode-widget-shadow);
		font-size: var(--font-size);
		opacity: 1;
		white-space: nowrap;
		min-width: 0;
		max-width: 360px;
		overflow: hidden;
	}

	.bb-tooltip .author {
		font-weight: 600;
	}

	.bb-tooltip .icon {
		font-family: codicon;
	}

	.bb-tooltip .branches {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* font-family: var(--vscode-editor-font-family); */
	}

	.bb-tooltip .sha {
		/* background: var(--vscode-textCodeBlock-background);
		border-radius: 0.3rem; */
		/* padding: 0.1rem 0.4rem 0.2rem 0.4rem; */
		font-family: var(--vscode-editor-font-family);
		margin-right: 0.4rem;
	}

	.bb-tooltip .additions {
		color: var(--vscode-gitDecoration-addedResourceForeground);
	}

	.bb-tooltip .deletions {
		color: var(--vscode-gitDecoration-deletedResourceForeground);
	}

	.bb-tooltip .date {
		flex: 1 1 auto;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		font-weight: normal;
		gap: 0.5rem;
		min-width: 0;
	}

	.bb-tooltip .date--relative {
		flex: 0 1 auto;
	}

	.bb-tooltip .date--absolute {
		flex: 0 100000 auto;
		font-style: italic;
	}

	.bb-tooltip .message {
		margin-left: 0rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		max-height: 50vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.bb-tooltip .message__content {
		white-space: pre-line;
	}

	:host-context([data-placement='editor']) .bb-axis-y .tick text {
		fill: var(--color-foreground--85);
	}

	:host-context([data-placement='view']) .bb-axis-y .tick text {
		transform: translate(0, 0.4rem);
		font-family: codicon;
		font-size: 1.5rem;
	}

	@media (max-height: 275px) {
		:host-context([data-placement='view']) .bb-axis-y .tick text {
			transform: none;
			font-size: 1rem;
		}
	}

	@media (max-height: 225px) {
		:host-context([data-placement='view']) .bb-axis-y .tick text {
			display: none;
		}
	}
`;var oH=M`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,oV=M`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,oG=Object.defineProperty,oK=Object.defineProperties,oZ=Object.getOwnPropertyDescriptor,oY=Object.getOwnPropertyDescriptors,oX=Object.getOwnPropertySymbols,oJ=Object.prototype.hasOwnProperty,oQ=Object.prototype.propertyIsEnumerable,o0=e=>{throw TypeError(e)},o1=(e,t,r)=>t in e?oG(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,o2=(e,t)=>{for(var r in t||(t={}))oJ.call(t,r)&&o1(e,r,t[r]);if(oX)for(var r of oX(t))oQ.call(t,r)&&o1(e,r,t[r]);return e},o5=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?oZ(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&oG(t,r,s),s},o4=(e,t,r)=>t.has(e)||o0("Cannot "+r),o6=new WeakMap,o3=new WeakMap,o8=new WeakMap,o7=new WeakSet,o9=new WeakMap,ie=class{constructor(e,t){this.handleFormData=e=>{let t=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host),i="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!t&&!i&&"string"==typeof r&&r.length>0&&void 0!==o&&(Array.isArray(o)?o.forEach(t=>{e.formData.append(r,t.toString())}):e.formData.append(r,o.toString()))},this.handleFormSubmit=e=>{var t;let r=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(t=o6.get(this.form))||t.forEach(e=>{this.setUserInteracted(e,!0)})),!this.form||this.form.noValidate||r||o(this.host)||(e.preventDefault(),e.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),o9.set(this.host,[])},this.handleInteraction=e=>{let t=o9.get(this.host);t.includes(e.type)||t.push(e.type),t.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let e of this.form.querySelectorAll("*"))if("function"==typeof e.checkValidity&&!e.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let e of this.form.querySelectorAll("*"))if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=o2({form:e=>{let t=e.form;if(t){let r=e.getRootNode().querySelector(`#${t}`);if(r)return r}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var t;return null!=(t=e.disabled)&&t},reportValidity:e=>"function"!=typeof e.reportValidity||e.reportValidity(),checkValidity:e=>"function"!=typeof e.checkValidity||e.checkValidity(),setValue:(e,t)=>e.value=t,assumeInteractionOn:["sl-input"]},t)}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),o9.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),o9.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,o6.has(this.form)?o6.get(this.form).add(this.host):o6.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),o3.has(this.form)||(o3.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),o8.has(this.form)||(o8.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let e=o6.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),o3.has(this.form)&&(this.form.reportValidity=o3.get(this.form),o3.delete(this.form)),o8.has(this.form)&&(this.form.checkValidity=o8.get(this.form),o8.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?o7.add(e):o7.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){let r=document.createElement("button");r.type=e,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",t&&(r.name=t.name,r.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{t.hasAttribute(e)&&r.setAttribute(e,t.getAttribute(e))})),this.form.append(r),r.click(),r.remove()}}getForm(){var e;return null!=(e=this.form)?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){let t=this.host,r=!!o7.has(t),o=!!t.required;t.toggleAttribute("data-required",o),t.toggleAttribute("data-optional",!o),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&r),t.toggleAttribute("data-user-valid",e&&r)}updateValidity(){let e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){let t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||null==e||e.preventDefault()}},it=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(oK(o2({},it),oY({valid:!1,valueMissing:!0}))),Object.freeze(oK(o2({},it),oY({valid:!1,customError:!0})));var ir=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&""!==e.textContent.trim())return!0;if(e.nodeType===e.ELEMENT_NODE){if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};let io=new Set,ii=new Map,is="ltr",ia="en",il="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(il){let e=new MutationObserver(ih);is=document.documentElement.dir||"ltr",ia=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function ic(...e){e.map(e=>{let t=e.$code.toLowerCase();ii.has(t)?ii.set(t,Object.assign(Object.assign({},ii.get(t)),e)):ii.set(t,e),a||(a=e)}),ih()}function ih(){il&&(is=document.documentElement.dir||"ltr",ia=document.documentElement.lang||navigator.language),[...io.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){io.add(this.host)}hostDisconnected(){io.delete(this.host)}dir(){return`${this.host.dir||is}`.toLowerCase()}lang(){return`${this.host.lang||ia}`.toLowerCase()}getTranslationData(e){var t,r;let o=new Intl.Locale(e.replace(/_/g,"-")),i=null==o?void 0:o.language.toLowerCase(),s=null!=(r=null==(t=null==o?void 0:o.region)?void 0:t.toLowerCase())?r:"",a=ii.get(`${i}-${s}`),c=ii.get(i);return{locale:o,language:i,region:s,primary:a,secondary:c}}exists(e,t){var r;let{primary:o,secondary:i}=this.getTranslationData(null!=(r=t.lang)?r:this.lang());return t=Object.assign({includeFallback:!1},t),!!o&&!!o[e]||!!i&&!!i[e]||!!t.includeFallback&&!!a&&!!a[e]}term(e,...t){let r,{primary:o,secondary:i}=this.getTranslationData(this.lang());if(o&&o[e])r=o[e];else if(i&&i[e])r=i[e];else{if(!a||!a[e])return String(e);r=a[e]}return"function"==typeof r?r(...t):r}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,t)}};var id={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};ic(id);var ip=class extends LocalizeController{};function iu(e,t){let r=o2({waitUntilFirstUpdate:!1},t);return(t,o)=>{let{update:i}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{if(e.has(t)){let i=e.get(t),s=this[t];i!==s&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[o](i,s)}}),i.call(this,e)}}}ic(id);var ib=M`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,ig=class extends lit_element_i{constructor(){let e;super(),(e=$).has(this)?o0("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){let r=new CustomEvent(e,o2({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(r),r}static define(e,t=this,r={}){let o=customElements.get(e);if(!o){try{customElements.define(e,t,r)}catch(o){customElements.define(e,class extends t{},r)}return}let i=" (unknown version)";"version"in t&&t.version&&(i=" v"+t.version),"version"in o&&o.version&&o.version}attributeChangedCallback(e,t,r){let o,i;if(o4(this,o=$,"read from private field"),i?!i.call(this):!o.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),o4(this,e=$,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,r)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,r)=>{e.has(r)&&null==this[r]&&(this[r]=t)})}};$=new WeakMap,ig.version="2.20.1",ig.dependencies={},o5([eL()],ig.prototype,"dir",2),o5([eL()],ig.prototype,"lang",2);let im=tj(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let r in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let r=e.element.classList;for(let e of this.st)e in t||(r.remove(e),this.st.delete(e));for(let e in t){let o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return e$}}),iv=tj(class extends directive_i{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===e$||t===eC)return t;let r=e.element,o=e.name;if(3===e.type){if(t===r[o])return e$}else if(4===e.type){if(!!t===r.hasAttribute(o))return e$}else if(1===e.type&&r.getAttribute(o)===t+"")return e$;return((e,t=tq)=>e._$AH=t)(e),t}});var iy=class extends ig{constructor(){super(...arguments),this.formControlController=new ie(this),this.hasSlotController=new ir(this,"help-text","label"),this.localize=new ip(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=e=>e.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.resizeObserver)||e.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(e){this.input.style.setProperty("--percent",`${100*e}%`)}syncTooltip(e){if(null!==this.output){let t=this.input.offsetWidth,r=this.output.offsetWidth,o=getComputedStyle(this.input).getPropertyValue("--thumb-size"),i="rtl"===this.localize.dir(),s=t*e;if(i){let i=`${t-s}px + ${e} * ${o}`;this.output.style.translate=`calc((${i} - ${r/2}px - ${o} / 2))`}else{let t=`${s}px - ${e} * ${o}`;this.output.style.translate=`calc(${t} - ${r/2}px + ${o} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){let e=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(e),"none"!==this.tooltip&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(e))}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}focus(e){this.input.focus(e)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){let e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),r=!!this.label||!!e,o=!!this.helpText||!!t;return ek`
      <div
        part="form-control"
        class=${im({"form-control":!0,"form-control--medium":!0,"form-control--has-label":r,"form-control--has-help-text":o})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${im({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":"rtl"===this.localize.dir(),"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":"top"===this.tooltip,"range--tooltip-bottom":"bottom"===this.tooltip})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${this.name??eC}
              ?disabled=${this.disabled}
              min=${this.min??eC}
              max=${this.max??eC}
              step=${this.step??eC}
              .value=${iv(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${"none"!==this.tooltip&&!this.disabled?ek`
                  <output part="tooltip" class="range__tooltip">
                    ${"function"==typeof this.tooltipFormatter?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};iy.styles=[ib,oV,oH],o5([eB(".range__control")],iy.prototype,"input",2),o5([eB(".range__tooltip")],iy.prototype,"output",2),o5([eM()],iy.prototype,"hasFocus",2),o5([eM()],iy.prototype,"hasTooltip",2),o5([eL()],iy.prototype,"title",2),o5([eL()],iy.prototype,"name",2),o5([eL({type:Number})],iy.prototype,"value",2),o5([eL()],iy.prototype,"label",2),o5([eL({attribute:"help-text"})],iy.prototype,"helpText",2),o5([eL({type:Boolean,reflect:!0})],iy.prototype,"disabled",2),o5([eL({type:Number})],iy.prototype,"min",2),o5([eL({type:Number})],iy.prototype,"max",2),o5([eL({type:Number})],iy.prototype,"step",2),o5([eL()],iy.prototype,"tooltip",2),o5([eL({attribute:!1})],iy.prototype,"tooltipFormatter",2),o5([eL({reflect:!0})],iy.prototype,"form",2),o5([((e="value")=>(t,r)=>{let o=t.constructor,i=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(t,s,a){var c;let h=o.getPropertyOptions(e);if(t===("string"==typeof h.attribute?h.attribute:e)){let t=h.converter||X,o=("function"==typeof t?t:null!=(c=null==t?void 0:t.fromAttribute)?c:X.fromAttribute)(a,h.type);this[e]!==o&&(this[r]=o)}i.call(this,t,s,a)}})()],iy.prototype,"defaultValue",2),o5([(g={passive:!0},(e,t)=>{Object.assign("function"==typeof e?e:e[t],g)})],iy.prototype,"handleThumbDragStart",1),o5([iu("value",{waitUntilFirstUpdate:!0})],iy.prototype,"handleValueChange",1),o5([iu("disabled",{waitUntilFirstUpdate:!0})],iy.prototype,"handleDisabledChange",1),o5([iu("hasTooltip",{waitUntilFirstUpdate:!0})],iy.prototype,"syncRange",1),iy.define("sl-range");var iw=Object.defineProperty,ix=Object.getOwnPropertyDescriptor,ik=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ix(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&iw(t,r,s),s};let i_="gl-chart-slider",i$=class extends GlElement{constructor(){super(...arguments),this._value=0,this._max=0,this._min=0,this._shift=!1}get data(){return this._data}set data(e){this._data!==e&&(this._data=e,this._min=0,this._max=(e?.length??1)-1)}get shift(){return this._shift}set shift(e){this._shift=e,e?this.style.setProperty("--gl-track-color-active","var(--sl-color-primary-600"):this.style.removeProperty("--gl-track-color-active")}get value(){return this.data?.[this._value]}render(){return ek`<div class="slider-container">
			<sl-range
				id="slider"
				.min=${this._min}
				.max=${this._max}
				.value=${this._value}
				.tooltip="top"
				.tooltipFormatter=${e=>"Hold shift to compare with working tree"}
				@sl-change=${this.handleSliderInput}
				@sl-input=${this.handleSliderInput}
				@click=${this.handleSliderInput}
			></sl-range>
		</div>`}select(e){let t;if("string"==typeof e)t=this.data?.findIndex(t=>t.sha===e);else{let r=e.toISOString();t=this.data?.findIndex(e=>e.date===r)}null!=t&&-1!==t&&(this._value=t)}handleSliderInput(e){if(!this.data?.length)return;let t=parseInt(e.target.value),r=new Date(this.data[t].date);this.emit("gl-slider-change",{date:r,shift:this.shift})}};i$.tagName=i_,i$.styles=M`
		:host {
			display: block;
		}

		.slider-container {
			width: 100%;
			position: relative;
			padding-bottom: 0.4rem;
		}

		sl-range::part(input) {
			--track-height: 3px;
			--thumb-size: 16px;
			--track-active-offset: 100%;
			--track-color-active: var(--gl-track-color-active, var(--sl-color-neutral-200));
		}

		sl-range::part(thumb) {
			cursor: pointer;
		}
	`,ik([eM()],i$.prototype,"_value",2),ik([eL({type:Array})],i$.prototype,"data",1),ik([eL({type:Boolean})],i$.prototype,"shift",1),i$=ik([eD(i_)],i$);var iC=M`
  :host {
    display: contents;
  }
`,iS=class extends ig{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let e=this.shadowRoot.querySelector("slot");if(null!==e){let t=e.assignedElements({flatten:!0});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],t.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return ek` <slot @slotchange=${this.handleSlotChange}></slot> `}};iS.styles=[ib,iC],o5([eL({type:Boolean,reflect:!0})],iS.prototype,"disabled",2),o5([iu("disabled",{waitUntilFirstUpdate:!0})],iS.prototype,"handleDisabledChange",1),iS.define("sl-resize-observer");var iP=Object.defineProperty,iA=Object.getOwnPropertyDescriptor,iE=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?iA(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&iP(t,r,s),s};let iO="gl-chart-scroller",iT=class extends GlElement{constructor(){super(...arguments),this.position=0,this.size=100,this.onDragStart=e=>{if(!this.isScrollable())return;e.preventDefault(),e.stopPropagation();let t=e.currentTarget,r=t.parentElement;if(!r)return;t.setPointerCapture(e.pointerId);let[o,i]=this.range,s=this.visibleRange[1]-this.visibleRange[0];this._dragInfo={startX:e.clientX,startPosition:this.position,trackWidth:r.offsetWidth,viewRange:i-o,zoomRange:s,viewStart:o,maxPosition:100-this.size,pointerId:e.pointerId},this.emit("gl-scroll-start")},this.onDragMove=e=>{if(e.pointerId!==this._dragInfo?.pointerId)return;e.preventDefault(),e.stopPropagation();let t=(e.clientX-this._dragInfo.startX)/this._dragInfo.trackWidth*100,r=Math.max(0,Math.min(this._dragInfo.maxPosition,this._dragInfo.startPosition+t))/(100-this.size)*(this._dragInfo.viewRange-this._dragInfo.zoomRange),o=this._dragInfo.viewStart+r,i=o+this._dragInfo.zoomRange;this.emitScrollEvent(o,i)},this.onDragEnd=e=>{if(!this._dragInfo||e&&e.pointerId!==this._dragInfo.pointerId)return;let t=this.renderRoot.querySelector(".thumb");t&&this._dragInfo.pointerId&&t.releasePointerCapture(this._dragInfo.pointerId),this._dragInfo=void 0,this.requestUpdate(),this.emit("gl-scroll-end")},this.onTrackClick=e=>{if(!this.isScrollable()||e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect(),r=(e.clientX-t.left)/t.width,[o,i]=this.range,s=this.visibleRange[1]-this.visibleRange[0],a=i-o,c=o+a*r,h=Math.max(o,Math.min(i-s,c-s/2));this.emitScrollEvent(h,h+s)},this.onWheel=e=>{if(e.ctrlKey)return void Object.defineProperty(e,"ctrlKey",{value:!1});if(e.stopPropagation(),e.stopImmediatePropagation(),!this.isScrollable())return;let t=null!=this._wheelTimer;t&&clearTimeout(this._wheelTimer),this._wheelTimer=setTimeout(()=>{this._wheelTimer=void 0,this.emit("gl-scroll-end")},150),t||this.emit("gl-scroll-start");let[r,o]=this.range,[i,s]=this.visibleRange,a=s-i,c=e.deltaY*a*.001,h=Math.max(r,Math.min(o-a,i+c));this.emitScrollEvent(h,h+a)}}isScrollable(){return null!=this.range&&null!=this.visibleRange&&this.size<100}connectedCallback(){super.connectedCallback?.(),this.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0})}disconnectedCallback(){this.onDragEnd(),this.removeEventListener("wheel",this.onWheel),super.disconnectedCallback?.()}willUpdate(e){({size:this.size,position:this.position}=this.calculateScrollState()),this.style.setProperty("--thumb-width",`${this.size}%`),this.style.setProperty("--thumb-left",`${this.position}%`)}render(){return ek`<slot></slot>
			<div class="track" part="track" ?scrollable="${this.isScrollable()}" @pointerdown="${this.onTrackClick}">
				<div
					class="thumb"
					@pointerdown="${this.onDragStart}"
					@pointermove="${this.onDragMove}"
					@pointerup="${this.onDragEnd}"
					@pointercancel="${this.onDragEnd}"
					@lostpointercapture="${this.onDragEnd}"
				></div>
			</div>`}calculateScrollState(){if(null==this.range||null==this.visibleRange)return{position:0,size:100};let[e,t]=this.range,[r,o]=this.visibleRange,i=t-e,s=o-r;if(i<=1||s<=1)return{position:0,size:100};let a=Math.max(20,Math.min(100,s/i*100)),c=i-s;return c<=0?{position:0,size:a}:{position:Math.max(0,Math.min(100-a,(r-e)/c*(100-a))),size:a}}emitScrollEvent(e,t){(e!==this.visibleRange?.[0]||t!==this.visibleRange[1])&&this.emit("gl-scroll",{range:[e,t]})}};iT.tagName=iO,iT.styles=M`
		:host {
			--track-top: unset;
			--track-left: 0;
			--track-width: 100%;
			--track-height: 1.2rem;

			--thumb-height: 0.6rem;
			--thumb-width: 2rem;
			--thumb-left: 0;
		}

		.track {
			visibility: hidden;
			position: absolute;
			background: transparent;
			top: var(--track-top);
			left: var(--track-left);
			width: var(--track-width, 100%);
			height: var(--track-height, 1rem);
			z-index: 1;
		}

		.track[scrollable] {
			visibility: visible;
		}

		.thumb {
			position: absolute;
			top: 0;
			left: var(--thumb-left);
			height: var(--thumb-height);
			width: var(--thumb-width);
			min-width: 2rem;
			background: transparent;
			transition: background 1s linear;
			cursor: default;
		}

		/* :host(:focus-within) .thumb, */
		:host(:hover) .thumb {
			background: var(--vscode-scrollbarSlider-background);
			transition: none;
		}

		.thumb:hover {
			background: var(--vscode-scrollbarSlider-hoverBackground) !important;
		}

		.thumb:active {
			background: var(--vscode-scrollbarSlider-activeBackground) !important;
		}
	`,iE([eL({type:Array})],iT.prototype,"range",2),iE([eL({type:Array})],iT.prototype,"visibleRange",2),iE([eM()],iT.prototype,"position",2),iE([eM()],iT.prototype,"size",2),iT=iE([eD(iO)],iT);let iz=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a"}),iR=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147"});var iD=Object.defineProperty,iI=Object.getOwnPropertyDescriptor,iL=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?iI(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&iD(t,r,s),s};function iM(e,t=""){return D(Object.entries(e).map(([e,r])=>(function(e,t,r=""){return`:host([icon='${r}${e}'])::before { content: '${t}'; }`})(e,r,t)).join(""))}let iN=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};iN.styles=M`
		:host {
			font: normal normal normal var(--code-icon-size, 16px) / 1 codicon;
			display: inline-block;
			text-decoration: none;
			text-rendering: auto;
			text-align: center;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			color: inherit;
			vertical-align: var(--code-icon-v-align, text-bottom);
			letter-spacing: normal;
		}

		:host([icon^='gl-']) {
			font-family: 'glicons';
		}

		${iM(iz)}
		${iM(iR,"gl-")}

		:host([icon='custom-start-work']) {
			position: relative;
		}
		:host([icon='custom-start-work'])::before {
			content: '\\ea68';
		}
		:host([icon='custom-start-work'])::after {
			content: '\\ea60';
			position: absolute;
			right: -0.2em;
			bottom: -0.2em;
			font-size: 0.6em;
			line-height: normal;
		}

		:host([icon='gl-pinned-filled']):before {
			/* TODO: see relative positioning needed in every use-case */
			position: relative;
			left: 1px;
		}

		@keyframes codicon-spin {
			100% {
				transform: rotate(360deg);
			}
		}

		:host([modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;
		}
		:host([icon='loading'][modifier='spin']) {
			/* Use steps to throttle FPS to reduce CPU usage */
			animation: codicon-spin 1.5s steps(30) infinite;

			/* custom speed & easing for loading icon */
			animation-duration: 1s !important;
			animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67) !important;
		}

		:host([flip='inline']) {
			transform: rotateY(180deg);
		}

		:host([flip='block']) {
			transform: rotateX(180deg);
		}

		:host([rotate='45']) {
			transform: rotateZ(45deg);
		}
	`,iL([eL({reflect:!0})],iN.prototype,"icon",2),iL([eL({reflect:!0})],iN.prototype,"modifier",2),iL([eL({type:Number})],iN.prototype,"size",2),iL([eL({reflect:!0})],iN.prototype,"flip",2),iL([eL({reflect:!0})],iN.prototype,"rotate",2),iN=iL([eD("code-icon")],iN);var iB=new Map,iF=new WeakMap;function ij(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function iU(e,t){iB.set(e,null!=t?t:{keyframes:[],options:{duration:0}})}function iq(e,t,r){let o=iF.get(e);if(null==o?void 0:o[t])return ij(o[t],r.dir);let i=iB.get(t);return i?ij(i,r.dir):{keyframes:[],options:{duration:0}}}let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=eC,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===eC||null==e)return this._t=void 0,this.it=e;if(e===e$)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let iW=tj(unsafe_html_e);var iH=M`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,iV=M`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;let iG=Math.min,iK=Math.max,iZ=Math.round,iY=Math.floor,iX=e=>({x:e,y:e}),iJ={left:"right",right:"left",bottom:"top",top:"bottom"};function iQ(e,t){return"function"==typeof e?e(t):e}function i0(e){return e.split("-")[0]}function i1(e){return e.split("-")[1]}function i2(e){return"x"===e?"y":"x"}function i5(e){return"y"===e?"height":"width"}function i4(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function i6(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let i3=["left","right"],i8=["right","left"],i7=["top","bottom"],i9=["bottom","top"];function se(e){let t=i0(e);return iJ[t]+e.slice(t.length)}function st(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function sr(e){let{x:t,y:r,width:o,height:i}=e;return{width:o,height:i,top:r,left:t,right:t+o,bottom:r+i,x:t,y:r}}function so(e,t,r){let o,{reference:i,floating:s}=e,a=i4(t),c=i2(i4(t)),h=i5(c),p=i0(t),u="y"===a,f=i.x+i.width/2-s.width/2,b=i.y+i.height/2-s.height/2,g=i[h]/2-s[h]/2;switch(p){case"top":o={x:f,y:i.y-s.height};break;case"bottom":o={x:f,y:i.y+i.height};break;case"right":o={x:i.x+i.width,y:b};break;case"left":o={x:i.x-s.width,y:b};break;default:o={x:i.x,y:i.y}}switch(i1(t)){case"start":o[c]-=g*(r&&u?-1:1);break;case"end":o[c]+=g*(r&&u?-1:1)}return o}async function si(e,t){var r;void 0===t&&(t={});let{x:o,y:i,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:f="floating",altBoundary:b=!1,padding:g=0}=iQ(t,e),m=st(g),v=c[b?"floating"===f?"reference":"floating":f],w=sr(await s.getClippingRect({element:null==(r=await (null==s.isElement?void 0:s.isElement(v)))||r?v:v.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),x="floating"===f?{x:o,y:i,width:a.floating.width,height:a.floating.height}:a.reference,_=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),$=await (null==s.isElement?void 0:s.isElement(_))&&await (null==s.getScale?void 0:s.getScale(_))||{x:1,y:1},C=sr(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:_,strategy:h}):x);return{top:(w.top-C.top+m.top)/$.y,bottom:(C.bottom-w.bottom+m.bottom)/$.y,left:(w.left-C.left+m.left)/$.x,right:(C.right-w.right+m.right)/$.x}}let ss=async(e,t,r)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:a}=r,c=a.detectOverflow?a:{...a,detectOverflow:si},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:f}=so(p,o,h),b=o,g=0,m={};for(let r=0;r<s.length;r++){let v=s[r];if(!v)continue;let{name:w,fn:x}=v,{x:_,y:$,data:C,reset:S}=await x({x:u,y:f,initialPlacement:o,placement:b,strategy:i,middlewareData:m,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=_?_:u,f=null!=$?$:f,m[w]={...m[w],...C},S&&g<50&&(g++,"object"==typeof S&&(S.placement&&(b=S.placement),S.rects&&(p=!0===S.rects?await a.getElementRects({reference:e,floating:t,strategy:i}):S.rects),{x:u,y:f}=so(p,b,h)),r=-1)}return{x:u,y:f,placement:b,strategy:i,middlewareData:m}},sn=new Set(["left","top"]);async function sa(e,t){let{placement:r,platform:o,elements:i}=e,s=await (null==o.isRTL?void 0:o.isRTL(i.floating)),a=i0(r),c=i1(r),h="y"===i4(r),p=sn.has(a)?-1:1,u=s&&h?-1:1,f=iQ(t,e),{mainAxis:b,crossAxis:g,alignmentAxis:m}="number"==typeof f?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return c&&"number"==typeof m&&(g="end"===c?-1*m:m),h?{x:g*u,y:b*p}:{x:b*p,y:g*u}}function sl(){return"u">typeof window}function sc(e){return sp(e)?(e.nodeName||"").toLowerCase():"#document"}function sh(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function sd(e){var t;return null==(t=(sp(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function sp(e){return!!sl()&&(e instanceof Node||e instanceof sh(e).Node)}function su(e){return!!sl()&&(e instanceof Element||e instanceof sh(e).Element)}function sf(e){return!!sl()&&(e instanceof HTMLElement||e instanceof sh(e).HTMLElement)}function sb(e){return!(!sl()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof sh(e).ShadowRoot)}function sg(e){let{overflow:t,overflowX:r,overflowY:o,display:i}=s$(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+r)&&"inline"!==i&&"contents"!==i}function sm(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let sv=/transform|translate|scale|rotate|perspective|filter/,sy=/paint|layout|strict|content/,sw=e=>!!e&&"none"!==e;function sx(e){let t=su(e)?s$(e):e;return sw(t.transform)||sw(t.translate)||sw(t.scale)||sw(t.rotate)||sw(t.perspective)||!sk()&&(sw(t.backdropFilter)||sw(t.filter))||sv.test(t.willChange||"")||sy.test(t.contain||"")}function sk(){return null==c&&(c="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),c}function s_(e){return/^(html|body|#document)$/.test(sc(e))}function s$(e){return sh(e).getComputedStyle(e)}function sC(e){return su(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sS(e){if("html"===sc(e))return e;let t=e.assignedSlot||e.parentNode||sb(e)&&e.host||sd(e);return sb(t)?t.host:t}function sP(e,t,r){var o;void 0===t&&(t=[]),void 0===r&&(r=!0);let i=function e(t){let r=sS(t);return s_(r)?t.ownerDocument?t.ownerDocument.body:t.body:sf(r)&&sg(r)?r:e(r)}(e),s=i===(null==(o=e.ownerDocument)?void 0:o.body),a=sh(i);if(!s)return t.concat(i,sP(i,[],r));{let e=sA(a);return t.concat(a,a.visualViewport||[],sg(i)?i:[],e&&r?sP(e):[])}}function sA(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function sE(e){let t=s$(e),r=parseFloat(t.width)||0,o=parseFloat(t.height)||0,i=sf(e),s=i?e.offsetWidth:r,a=i?e.offsetHeight:o,c=iZ(r)!==s||iZ(o)!==a;return c&&(r=s,o=a),{width:r,height:o,$:c}}function sO(e){return su(e)?e:e.contextElement}function sT(e){let t=sO(e);if(!sf(t))return iX(1);let r=t.getBoundingClientRect(),{width:o,height:i,$:s}=sE(t),a=(s?iZ(r.width):r.width)/o,c=(s?iZ(r.height):r.height)/i;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let sz=iX(0);function sR(e){let t=sh(e);return sk()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:sz}function sD(e,t,r,o){var i;void 0===t&&(t=!1),void 0===r&&(r=!1);let s=e.getBoundingClientRect(),a=sO(e),c=iX(1);t&&(o?su(o)&&(c=sT(o)):c=sT(e));let h=(void 0===(i=r)&&(i=!1),o&&(!i||o===sh(a))&&i)?sR(a):iX(0),p=(s.left+h.x)/c.x,u=(s.top+h.y)/c.y,f=s.width/c.x,b=s.height/c.y;if(a){let e=sh(a),t=o&&su(o)?sh(o):o,r=e,i=sA(r);for(;i&&o&&t!==r;){let e=sT(i),t=i.getBoundingClientRect(),o=s$(i),s=t.left+(i.clientLeft+parseFloat(o.paddingLeft))*e.x,a=t.top+(i.clientTop+parseFloat(o.paddingTop))*e.y;p*=e.x,u*=e.y,f*=e.x,b*=e.y,p+=s,u+=a,i=sA(r=sh(i))}}return sr({width:f,height:b,x:p,y:u})}function sI(e,t){let r=sC(e).scrollLeft;return t?t.left+r:sD(sd(e)).left+r}function sL(e,t){let r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-sI(e,r),y:r.top+t.scrollTop}}function sM(e,t,r){var o;let i;if("viewport"===t)i=function(e,t){let r=sh(e),o=sd(e),i=r.visualViewport,s=o.clientWidth,a=o.clientHeight,c=0,h=0;if(i){s=i.width,a=i.height;let e=sk();(!e||e&&"fixed"===t)&&(c=i.offsetLeft,h=i.offsetTop)}let p=sI(o);if(p<=0){let e=o.ownerDocument,t=e.body,r=getComputedStyle(t),i="CSS1Compat"===e.compatMode&&parseFloat(r.marginLeft)+parseFloat(r.marginRight)||0,a=Math.abs(o.clientWidth-t.clientWidth-i);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,r);else if("document"===t){let t,r,s,a,c,h,p;o=sd(e),t=sd(o),r=sC(o),s=o.ownerDocument.body,a=iK(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=iK(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-r.scrollLeft+sI(o),p=-r.scrollTop,"rtl"===s$(s).direction&&(h+=iK(t.clientWidth,s.clientWidth)-a),i={width:a,height:c,x:h,y:p}}else if(su(t)){let e,o,s,a,c,h;o=(e=sD(t,!0,"fixed"===r)).top+t.clientTop,s=e.left+t.clientLeft,a=sf(t)?sT(t):iX(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,i={width:c,height:h,x:s*a.x,y:o*a.y}}else{let r=sR(e);i={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return sr(i)}function sN(e){return"static"===s$(e).position}function sB(e,t){if(!sf(e)||"fixed"===s$(e).position)return null;if(t)return t(e);let r=e.offsetParent;return sd(e)===r&&(r=r.ownerDocument.body),r}function sF(e,t){var r;let o=sh(e);if(sm(e))return o;if(!sf(e)){let t=sS(e);for(;t&&!s_(t);){if(su(t)&&!sN(t))return t;t=sS(t)}return o}let i=sB(e,t);for(;i&&(r=i,/^(table|td|th)$/.test(sc(r)))&&sN(i);)i=sB(i,t);return i&&s_(i)&&sN(i)&&!sx(i)?o:i||function(e){let t=sS(e);for(;sf(t)&&!s_(t);){if(sx(t))return t;if(sm(t))break;t=sS(t)}return null}(e)||o}let sj=async function(e){let t=this.getOffsetParent||sF,r=this.getDimensions,o=await r(e.floating);return{reference:function(e,t,r){let o=sf(t),i=sd(t),s="fixed"===r,a=sD(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=iX(0);if(o||!o&&!s)if(("body"!==sc(t)||sg(i))&&(c=sC(t)),o){let e=sD(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else i&&(h.x=sI(i));s&&!o&&i&&(h.x=sI(i));let p=!i||o||s?iX(0):sL(i,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},sU={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:r,offsetParent:o,strategy:i}=e,s="fixed"===i,a=sd(o),c=!!t&&sm(t.floating);if(o===a||c&&s)return r;let h={scrollLeft:0,scrollTop:0},p=iX(1),u=iX(0),f=sf(o);if((f||!f&&!s)&&(("body"!==sc(o)||sg(a))&&(h=sC(o)),f)){let e=sD(o);p=sT(o),u.x=e.x+o.clientLeft,u.y=e.y+o.clientTop}let b=!a||f||s?iX(0):sL(a,h);return{width:r.width*p.x,height:r.height*p.y,x:r.x*p.x-h.scrollLeft*p.x+u.x+b.x,y:r.y*p.y-h.scrollTop*p.y+u.y+b.y}},getDocumentElement:sd,getClippingRect:function(e){let{element:t,boundary:r,rootBoundary:o,strategy:i}=e,s=[..."clippingAncestors"===r?sm(t)?[]:function(e,t){let r=t.get(e);if(r)return r;let o=sP(e,[],!1).filter(e=>su(e)&&"body"!==sc(e)),i=null,s="fixed"===s$(e).position,a=s?sS(e):e;for(;su(a)&&!s_(a);){let t=s$(a),r=sx(a);r||"fixed"!==t.position||(i=null),(s?r||i:!(!r&&"static"===t.position&&i&&("absolute"===i.position||"fixed"===i.position)||sg(a)&&!r&&function e(t,r){let o=sS(t);return!(o===r||!su(o)||s_(o))&&("fixed"===s$(o).position||e(o,r))}(e,a)))?i=t:o=o.filter(e=>e!==a),a=sS(a)}return t.set(e,o),o}(t,this._c):[].concat(r),o],a=sM(t,s[0],i),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<s.length;e++){let r=sM(t,s[e],i);c=iK(r.top,c),h=iG(r.right,h),p=iG(r.bottom,p),u=iK(r.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:sF,getElementRects:sj,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:r}=sE(e);return{width:t,height:r}},getScale:sT,isElement:su,isRTL:function(e){return"rtl"===s$(e).direction}};function sq(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let sW=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var r,o;let i,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...f}=iQ(e,t),b=await h.detectOverflow(t,f),g=i0(a),m=i1(a),v="y"===i4(a),{width:w,height:x}=c.floating;"top"===g||"bottom"===g?(i=g,s=m===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=g,i="end"===m?"top":"bottom");let _=x-b.top-b.bottom,$=w-b.left-b.right,C=iG(x-b[i],_),S=iG(w-b[s],$),P=!t.middlewareData.shift,A=C,E=S;if(null!=(r=t.middlewareData.shift)&&r.enabled.x&&(E=$),null!=(o=t.middlewareData.shift)&&o.enabled.y&&(A=_),P&&!m){let e=iK(b.left,0),t=iK(b.right,0),r=iK(b.top,0),o=iK(b.bottom,0);v?E=w-2*(0!==e||0!==t?e+t:iK(b.left,b.right)):A=x-2*(0!==r||0!==o?r+o:iK(b.top,b.bottom))}await u({...t,availableWidth:E,availableHeight:A});let O=await h.getDimensions(p.floating);return w!==O.width||x!==O.height?{reset:{rects:!0}}:{}}}};function sH(e){var t=e;for(let e=t;e;e=sV(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=sV(t);e;e=sV(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||sx(t)||"BODY"===e.tagName))return e}return null}function sV(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}var sG=class extends ig{constructor(){super(...arguments),this.localize=new ip(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,a=0,c=0,h=0,p=0,u=0;r?e.top<t.top?(o=e.left,i=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(o=t.left,i=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(o=e.right,i=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(o=t.right,i=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else{var e;this.anchor instanceof Element||null!==(e=this.anchor)&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(e,t,r,o){let i;void 0===o&&(o={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=o,u=sO(e),f=s||a?[...u?sP(u):[],...t?sP(t):[]]:[];f.forEach(e=>{s&&e.addEventListener("scroll",r,{passive:!0}),a&&e.addEventListener("resize",r)});let b=u&&h?function(e,t){let r,o=null,i=sd(e);function s(){var e;clearTimeout(r),null==(e=o)||e.disconnect(),o=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:u,top:f,width:b,height:g}=p;if(c||t(),!b||!g)return;let m={rootMargin:-iY(f)+"px "+-iY(i.clientWidth-(u+b))+"px "+-iY(i.clientHeight-(f+g))+"px "+-iY(u)+"px",threshold:iK(0,iG(1,h))||1},v=!0;function w(t){let o=t[0].intersectionRatio;if(o!==h){if(!v)return a();o?a(!1,o):r=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==o||sq(p,e.getBoundingClientRect())||a(),v=!1}try{o=new IntersectionObserver(w,{...m,root:i.ownerDocument})}catch{o=new IntersectionObserver(w,m)}o.observe(e)}(!0),s}(u,r):null,g=-1,m=null;c&&(m=new ResizeObserver(e=>{let[o]=e;o&&o.target===u&&m&&t&&(m.unobserve(t),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var e;null==(e=m)||e.observe(t)})),r()}),u&&!p&&m.observe(u),t&&m.observe(t));let v=p?sD(e):null;return p&&function t(){let o=sD(e);v&&!sq(v,o)&&r(),v=o,i=requestAnimationFrame(t)}(),r(),()=>{var e;f.forEach(e=>{s&&e.removeEventListener("scroll",r),a&&e.removeEventListener("resize",r)}),null==b||b(),null==(e=m)||e.disconnect(),m=null,p&&cancelAnimationFrame(i)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,r,o,i,s;let a,c,h,p;if(!this.active||!this.anchorEl)return;let u=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var r,o;let{x:i,y:s,placement:a,middlewareData:c}=t,h=await sa(t,e);return a===(null==(r=c.offset)?void 0:r.placement)&&null!=(o=c.arrow)&&o.alignmentOffset?{}:{x:i+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?u.push(sW({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,r="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=r?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&u.push({name:"flip",options:t={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var r,o,i,s,a,c,h,p;let u,f,b,{placement:g,middlewareData:m,rects:v,initialPlacement:w,platform:x,elements:_}=e,{mainAxis:$=!0,crossAxis:C=!0,fallbackPlacements:S,fallbackStrategy:P="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:E=!0,...O}=iQ(t,e);if(null!=(r=m.arrow)&&r.alignmentOffset)return{};let T=i0(g),D=i4(w),M=i0(w)===w,N=await (null==x.isRTL?void 0:x.isRTL(_.floating)),B=S||(M||!E?[se(w)]:(u=se(w),[i6(w),u,i6(u)])),F="none"!==A;!S&&F&&B.push(...(f=i1(w),b=function(e,t,r){switch(e){case"top":case"bottom":if(r)return t?i8:i3;return t?i3:i8;case"left":case"right":return t?i7:i9;default:return[]}}(i0(w),"start"===A,N),f&&(b=b.map(e=>e+"-"+f),E&&(b=b.concat(b.map(i6)))),b));let j=[w,...B],U=await x.detectOverflow(e,O),q=[],W=(null==(o=m.flip)?void 0:o.overflows)||[];if($&&q.push(U[T]),C){let e,t,r,o,i=(c=g,h=v,void 0===(p=N)&&(p=!1),e=i1(c),r=i5(t=i2(i4(c))),o="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[r]>h.floating[r]&&(o=se(o)),[o,se(o)]);q.push(U[i[0]],U[i[1]])}if(W=[...W,{placement:g,overflows:q}],!q.every(e=>e<=0)){let e=((null==(i=m.flip)?void 0:i.index)||0)+1,t=j[e];if(t&&("alignment"!==C||D===i4(t)||W.every(e=>i4(e.placement)!==D||e.overflows[0]>0)))return{data:{index:e,overflows:W},reset:{placement:t}};let r=null==(s=W.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!r)switch(P){case"bestFit":{let e=null==(a=W.filter(e=>{if(F){let t=i4(e.placement);return t===D||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(r=e);break}case"initialPlacement":r=w}if(g!==r)return{reset:{placement:r}}}return{}}}),this.shift&&u.push({name:"shift",options:r={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(e){let{x:t,y:o,placement:i,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:r}=e;return{x:t,y:r}}},...p}=iQ(r,e),u={x:t,y:o},f=await s.detectOverflow(e,p),b=i4(i0(i)),g=i2(b),m=u[g],v=u[b];if(a){let e="y"===g?"top":"left",t="y"===g?"bottom":"right",r=m+f[e],o=m-f[t];m=iK(r,iG(m,o))}if(c){let e="y"===b?"top":"left",t="y"===b?"bottom":"right",r=v+f[e],o=v-f[t];v=iK(r,iG(v,o))}let w=h.fn({...e,[g]:m,[b]:v});return{...w,data:{x:w.x-t,y:w.y-o,enabled:{[g]:a,[b]:c}}}}}),this.autoSize?u.push(sW({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&u.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:r,placement:o,rects:i,platform:s,elements:c,middlewareData:h}=e,{element:p,padding:u=0}=iQ(a,e)||{};if(null==p)return{};let f=st(u),b={x:t,y:r},g=i2(i4(o)),m=i5(g),v=await s.getDimensions(p),w="y"===g,x=w?"clientHeight":"clientWidth",_=i.reference[m]+i.reference[g]-b[g]-i.floating[m],$=b[g]-i.reference[g],C=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),S=C?C[x]:0;S&&await (null==s.isElement?void 0:s.isElement(C))||(S=c.floating[x]||i.floating[m]);let P=S/2-v[m]/2-1,A=iG(f[w?"top":"left"],P),E=iG(f[w?"bottom":"right"],P),O=S-v[m]-E,T=S/2-v[m]/2+(_/2-$/2),D=iK(A,iG(T,O)),M=!h.arrow&&null!=i1(o)&&T!==D&&i.reference[m]/2-(T<A?A:E)-v[m]/2<0,N=M?T<A?T-A:T-O:0;return{[g]:b[g]+N,data:{[g]:D,centerOffset:T-D-N,...M&&{alignmentOffset:N}},reset:M}}});let f="absolute"===this.strategy?e=>sU.getOffsetParent(e,sH):sU.getOffsetParent;(o=this.anchorEl,i=this.popup,s={placement:this.placement,middleware:u,strategy:this.strategy,platform:oK(o2({},sU),oY({getOffsetParent:f}))},c=new Map,p={...(h={platform:sU,...s}).platform,_c:c},ss(o,i,{...h,platform:p})).then(({x:e,y:t,middlewareData:r,placement:o})=>{let i="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=r.arrow.x,t=r.arrow.y,o="",a="",c="",h="";if("start"===this.arrowPlacement){let r="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=i?r:"",h=i?"":r}else if("end"===this.arrowPlacement){let r="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=i?"":r,h=i?r:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",o="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:o,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return ek`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${im({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${im({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ek`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};function sK(e,t){return new Promise(r=>{e.addEventListener(t,function o(i){i.target===e&&(e.removeEventListener(t,o),r())})})}function sZ(e,t,r){return new Promise(o=>{if((null==r?void 0:r.duration)===1/0)throw Error("Promise-based animations must be finite.");let i=e.animate(t,oK(o2({},r),oY({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:r.duration})));i.addEventListener("cancel",o,{once:!0}),i.addEventListener("finish",o,{once:!0})})}function sY(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?1e3*parseFloat(e):parseFloat(e)}function sX(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}sG.styles=[ib,iV],o5([eB(".popup")],sG.prototype,"popup",2),o5([eB(".popup__arrow")],sG.prototype,"arrowEl",2),o5([eL()],sG.prototype,"anchor",2),o5([eL({type:Boolean,reflect:!0})],sG.prototype,"active",2),o5([eL({reflect:!0})],sG.prototype,"placement",2),o5([eL({reflect:!0})],sG.prototype,"strategy",2),o5([eL({type:Number})],sG.prototype,"distance",2),o5([eL({type:Number})],sG.prototype,"skidding",2),o5([eL({type:Boolean})],sG.prototype,"arrow",2),o5([eL({attribute:"arrow-placement"})],sG.prototype,"arrowPlacement",2),o5([eL({attribute:"arrow-padding",type:Number})],sG.prototype,"arrowPadding",2),o5([eL({type:Boolean})],sG.prototype,"flip",2),o5([eL({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sG.prototype,"flipFallbackPlacements",2),o5([eL({attribute:"flip-fallback-strategy"})],sG.prototype,"flipFallbackStrategy",2),o5([eL({type:Object})],sG.prototype,"flipBoundary",2),o5([eL({attribute:"flip-padding",type:Number})],sG.prototype,"flipPadding",2),o5([eL({type:Boolean})],sG.prototype,"shift",2),o5([eL({type:Object})],sG.prototype,"shiftBoundary",2),o5([eL({attribute:"shift-padding",type:Number})],sG.prototype,"shiftPadding",2),o5([eL({attribute:"auto-size"})],sG.prototype,"autoSize",2),o5([eL()],sG.prototype,"sync",2),o5([eL({type:Object})],sG.prototype,"autoSizeBoundary",2),o5([eL({attribute:"auto-size-padding",type:Number})],sG.prototype,"autoSizePadding",2),o5([eL({attribute:"hover-bridge",type:Boolean})],sG.prototype,"hoverBridge",2);var sJ=class extends ig{constructor(){super(),this.localize=new ip(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let e=sY(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=sY(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await sX(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:t,options:r}=iq(this,"tooltip.show",{dir:this.localize.dir()});await sZ(this.popup.popup,t,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await sX(this.body);let{keyframes:e,options:r}=iq(this,"tooltip.hide",{dir:this.localize.dir()});await sZ(this.popup.popup,e,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,sK(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,sK(this,"sl-after-hide")}render(){return ek`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${im({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};sJ.styles=[ib,iH],sJ.dependencies={"sl-popup":sG},o5([eB("slot:not([name])")],sJ.prototype,"defaultSlot",2),o5([eB(".tooltip__body")],sJ.prototype,"body",2),o5([eB("sl-popup")],sJ.prototype,"popup",2),o5([eL()],sJ.prototype,"content",2),o5([eL()],sJ.prototype,"placement",2),o5([eL({type:Boolean,reflect:!0})],sJ.prototype,"disabled",2),o5([eL({type:Number})],sJ.prototype,"distance",2),o5([eL({type:Boolean,reflect:!0})],sJ.prototype,"open",2),o5([eL({type:Number})],sJ.prototype,"skidding",2),o5([eL()],sJ.prototype,"trigger",2),o5([eL({type:Boolean})],sJ.prototype,"hoist",2),o5([iu("open",{waitUntilFirstUpdate:!0})],sJ.prototype,"handleOpenChange",1),o5([iu(["content","distance","hoist","placement","skidding"])],sJ.prototype,"handleOptionsChange",1),o5([iu("disabled")],sJ.prototype,"handleDisabledChange",1),iU("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),iU("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),sJ.define("sl-tooltip");var sQ=Object.defineProperty,s0=Object.getOwnPropertyDescriptor,s1=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?s0(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&sQ(t,r,s),s};iU("tooltip.show",null),iU("tooltip.hide",null);let s2=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.suppressed=!1,this.onMouseDown=e=>{this.suppressed=!0,this.hide()},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.hide()},this.onDragEnd=e=>{this.suppressed=!1}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("dragstart",this.onDragStart,{capture:!0}),window.addEventListener("dragend",this.onDragEnd,{capture:!0})}firstUpdated(){this.observer=new MutationObserver(e=>{for(let t of e)if("attributes"===t.type&&"data-current-placement"===t.attributeName){let e=t.target.getAttribute("data-current-placement");e?this.setAttribute("data-current-placement",e):this.removeAttribute("data-current-placement")}});let e=this.shadowRoot?.querySelector("sl-tooltip")?.shadowRoot;e&&this.observer.observe(e,{attributes:!0,attributeFilter:["data-current-placement"],subtree:!0})}disconnectedCallback(){this.observer?.disconnect(),this.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("dragstart",this.onDragStart,{capture:!0}),window.removeEventListener("dragend",this.onDragEnd,{capture:!0}),super.disconnectedCallback?.()}async hide(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.hide()}async show(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.show()}render(){var e;return ek`<sl-tooltip
			.placement=${this.placement}
			?disabled=${this.disabled||this.suppressed}
			.distance=${this.distance??eC}
			hoist
		>
			<slot></slot>
			<div slot="content">
				<slot name="content">${e=this.content,e?.includes(`
`)?iW(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}</slot>
			</div>
		</sl-tooltip>`}};s2.styles=M`
		sl-tooltip {
			--max-width: var(--gl-tooltip-max-width, 320px);
			--hide-delay: 0ms;
			--show-delay: var(--gl-tooltip-show-delay, 500ms);
		}

		sl-tooltip::part(base__popup) {
			pointer-events: none;
		}

		sl-tooltip::part(body) {
			border: 1px solid var(--gl-tooltip-border-color);
			box-shadow: 0 2px 8px var(--gl-tooltip-shadow);
		}

		sl-tooltip::part(base__arrow) {
			border: 1px solid var(--gl-tooltip-border-color);
			z-index: 1;
		}

		:host {
			max-width: inherit;
			overflow: inherit;
			text-transform: var(--gl-tooltip-text-transform, inherit);
		}

		:host([data-current-placement^='top']) sl-tooltip::part(base__arrow) {
			border-top-width: 0;
			border-left-width: 0;
		}

		:host([data-current-placement^='bottom']) sl-tooltip::part(base__arrow) {
			border-bottom-width: 0;
			border-right-width: 0;
		}

		:host([data-current-placement^='left']) sl-tooltip::part(base__arrow) {
			border-bottom-width: 0;
			border-left-width: 0;
		}

		:host([data-current-placement^='right']) sl-tooltip::part(base__arrow) {
			border-top-width: 0;
			border-right-width: 0;
		}

		[slot='content'] hr {
			border: none;
			border-top: 1px solid var(--color-foreground--25);
		}
	`,s1([eL()],s2.prototype,"content",2),s1([eL({reflect:!0})],s2.prototype,"placement",2),s1([eL({type:Boolean})],s2.prototype,"disabled",2),s1([eL({type:Number})],s2.prototype,"distance",2),s1([eL({type:Boolean,attribute:"hide-on-click"})],s2.prototype,"hideOnClick",2),s1([eL({type:Boolean})],s2.prototype,"hoist",2),s1([eM()],s2.prototype,"suppressed",2),s2=s1([eD("gl-tooltip")],s2);var s5=Object.defineProperty,s4=Object.getOwnPropertyDescriptor,s6=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?s4(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&s5(t,r,s),s};let s3="gl-copy-container",s8=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(e){e.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?ek`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eC}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eC}async onClick(e){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.onClick(e))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};s8.tagName=s3,s8.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},s8.styles=M`
		:host {
			display: inline-block;
		}

		gl-tooltip {
			cursor: pointer;
		}

		gl-tooltip:focus-visible {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		/* Hide focus outline on slotted copy icon - we show it on the host instead */
		::slotted(.copy-icon) {
			outline: none !important;
		}

		:host([appearance='toolbar']) {
			--copy-background: transparent;
			--copy-foreground: var(--vscode-foreground);
			--copy-hover-background: var(--vscode-toolbar-hoverBackground);
			--copy-border: transparent;
			--copy-border-radius: var(--gk-action-radius, 0.3rem);
			--copy-padding: 0.4rem;

			border: 1px solid var(--copy-border);
			border-radius: var(--copy-border-radius);
			background: var(--copy-background);
			color: var(--copy-foreground);
		}

		:host([appearance='toolbar']:hover) {
			background: var(--copy-hover-background);
		}

		:host([appearance='toolbar']:focus-within) {
			outline: 1px solid var(--color-focus-border);
			outline-offset: -1px;
		}

		:host([appearance='toolbar']) gl-tooltip {
			padding: var(--copy-padding);
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 1.8rem;
			box-sizing: border-box;
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}
	`,s6([eL({reflect:!0})],s8.prototype,"appearance",2),s6([eL({reflect:!1})],s8.prototype,"content",2),s6([eL()],s8.prototype,"copyLabel",2),s6([eL()],s8.prototype,"copiedLabel",2),s6([eL({type:Boolean,reflect:!0})],s8.prototype,"disabled",2),s6([eL()],s8.prototype,"placement",2),s6([eL({type:Number})],s8.prototype,"timeout",2),s6([eM()],s8.prototype,"label",2),s6([eB("gl-tooltip")],s8.prototype,"tooltip",2),s8=s6([eD(s3)],s8);var s7=Object.defineProperty,s9=Object.getOwnPropertyDescriptor,ne=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?s9(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&s7(t,r,s),s};let nt=M`
	:host {
		display: inline-flex;
		align-items: baseline;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-inline-end: 0.2rem;
	}

	:host(:focus) {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	.label--uncommitted {
		cursor: default;
	}

	.icon {
		margin-right: 0.3rem;
		align-self: center;
	}
`,nr=class extends lit_element_i{constructor(){super(...arguments),this.size=12}get label(){return eJ(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){return null==this.sha?eC:!this.sha||eY(this.sha)?ek`<span part="label" class="label--uncommitted">${this.label}</span>`:ek`<code-icon part="icon" class="icon" icon="git-commit" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};nr.styles=nt,ne([eL({type:String})],nr.prototype,"sha",2),ne([eL({type:Number})],nr.prototype,"size",2),nr=ne([eD("gl-commit-sha")],nr);let no=class extends lit_element_i{constructor(){super(...arguments),this.size=12}render(){return null==this.sha?eC:ek`<gl-copy-container .content=${this.sha} placement="top">
			<gl-commit-sha exportparts="icon, label" .sha=${this.sha} .size=${this.size}></gl-commit-sha>
		</gl-copy-container>`}};no.styles=nt,ne([eL({type:String})],no.prototype,"sha",2),ne([eL({type:Number})],no.prototype,"size",2),no=ne([eD("gl-commit-sha-copy")],no);let ni=M`
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
		position: absolute;
		top: 5%;
		bottom: 45%;
		left: 0;
		right: 0;
	}

	::slotted(p) {
		padding-top: 1rem;
		color: var(--color-foreground--75);
		font-size: 1.4rem;
	}

	.watermark {
		width: 12rem;
		height: 12rem;
		fill: color-mix(in srgb, var(--color-foreground) 15%, var(--color-background));
		transform-origin: center;
	}
`,ns=M`
	@keyframes pulse {
		0% {
			transform: scale(0.9);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(0.9);
		}
	}

	.watermark--pulse .watermark-path {
		transform: scale(0.9);
		animation: pulse 1.8s ease-in-out infinite;
		transform-origin: center;
	}

	/* Stagger the pulse animation for a wave effect on all paths */
	/* Targeting all paths using their order within the SVG */
	.watermark-path:nth-of-type(1) {
		/* Target the outer circle path */
		animation-delay: 0.2s;
	}

	.watermark-path:nth-of-type(2) {
		/* Target the connection path */
		animation-delay: 0.4s;
	}

	.watermark-path:nth-of-type(3) {
		/* Target the first dot path */
		animation-delay: 0.1s;
	}

	.watermark-path:nth-of-type(4) {
		/* Target the second dot path */
		animation-delay: 0.1s;
	}

	.watermark-path:nth-of-type(5) {
		/* Target the third dot path */
		animation-delay: 0.1s;
	}
`;var nn=Object.defineProperty,na=Object.getOwnPropertyDescriptor,nl=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?na(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nn(t,r,s),s};let nc=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return ek`<div class="container">
			<svg
				class="watermark${this.pulse?" watermark--pulse":""}"
				viewBox="0 0 28 28"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="watermark-path"
					d="M14 3.25C12.5883 3.25 11.1904 3.52806 9.88615 4.0683C8.5819 4.60853 7.39683 5.40037 6.3986 6.3986C5.40037 7.39683 4.60853 8.5819 4.06829 9.88615C3.52806 11.1904 3.25 12.5883 3.25 14C3.25 15.4117 3.52806 16.8096 4.06829 18.1138C4.60853 19.4181 5.40037 20.6032 6.3986 21.6014C7.39683 22.5996 8.5819 23.3915 9.88615 23.9317C11.1904 24.4719 12.5883 24.75 14 24.75C16.8511 24.75 19.5854 23.6174 21.6014 21.6014C23.6174 19.5854 24.75 16.8511 24.75 14C24.75 11.1489 23.6174 8.41462 21.6014 6.3986C19.5854 4.38259 16.8511 3.25 14 3.25ZM2 14C2 10.8174 3.26428 7.76516 5.51472 5.51472C7.76516 3.26428 10.8174 2 14 2C17.1826 2 20.2348 3.26428 22.4853 5.51472C24.7357 7.76516 26 10.8174 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26C10.8174 26 7.76516 24.7357 5.51472 22.4853C3.26428 20.2348 2 17.1826 2 14Z"
				/>
				<path class="watermark-path" d="M18 15L11.5 8.5L12.5 7.5L19 14L18 15ZM11.5 20V8H13V20H11.5Z" />
				<path
					class="watermark-path"
					d="M12.25 10.5C12.8467 10.5 13.419 10.2629 13.841 9.84099C14.2629 9.41903 14.5 8.84674 14.5 8.25C14.5 7.65326 14.2629 7.08097 13.841 6.65901C13.419 6.23705 12.8467 6 12.25 6C11.6533 6 11.081 6.23705 10.659 6.65901C10.2371 7.08097 10 7.65326 10 8.25C10 8.84674 10.2371 9.41903 10.659 9.84099C11.081 10.2629 11.6533 10.5 12.25 10.5Z"
				/>
				<path
					class="watermark-path"
					d="M18.25 16.5C18.5455 16.5 18.8381 16.4418 19.111 16.3287C19.384 16.2157 19.6321 16.0499 19.841 15.841C20.0499 15.6321 20.2157 15.384 20.3287 15.111C20.4418 14.8381 20.5 14.5455 20.5 14.25C20.5 13.9545 20.4418 13.6619 20.3287 13.389C20.2157 13.116 20.0499 12.8679 19.841 12.659C19.6321 12.4501 19.384 12.2843 19.111 12.1713C18.8381 12.0582 18.5455 12 18.25 12C17.6533 12 17.081 12.2371 16.659 12.659C16.2371 13.081 16 13.6533 16 14.25C16 14.8467 16.2371 15.419 16.659 15.841C17.081 16.2629 17.6533 16.5 18.25 16.5Z"
				/>
				<path
					class="watermark-path"
					d="M12.25 22C12.8467 22 13.419 21.7629 13.841 21.341C14.2629 20.919 14.5 20.3467 14.5 19.75C14.5 19.1533 14.2629 18.581 13.841 18.159C13.419 17.7371 12.8467 17.5 12.25 17.5C11.6533 17.5 11.081 17.7371 10.659 18.159C10.2371 18.581 10 19.1533 10 19.75C10 20.3467 10.2371 20.919 10.659 21.341C11.081 21.7629 11.6533 22 12.25 22Z"
				/>
			</svg>
			<slot></slot>
		</div>`}};nc.styles=[ni,ns],nl([eL({type:Boolean})],nc.prototype,"pulse",2),nc=nl([eD("gl-watermark-loader")],nc);var nh=Object.defineProperty,nd=Object.getOwnPropertyDescriptor,np=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nd(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nh(t,r,s),s};let nu="gl-timeline-chart",nf=class extends GlElement{constructor(){super(...arguments),this._slices=new Map,this._slicesByIndex=new Map,this._commitsByTimestamp=new Map,this.placement="editor",this.sliceBy="author",this._data=null,this._shiftKeyPressed=!1,this.onDataPointClicked=eQ((e,t)=>{let r=e.x,o=r instanceof Date?r:new Date(r),i=this._commitsByTimestamp.get(o.getTime())?.sha;null!=i&&(this._shaHovered=void 0,this._shaSelected=i,this.slider?.select(i),this.emit("gl-commit-select",{id:i,shift:this._shiftKeyPressed}))},50),this.onDataPointHovered=(e,t)=>{let r=e.x,o=r instanceof Date?r:new Date(r),i=this._commitsByTimestamp.get(o.getTime())?.sha;this._shaHovered=i},this.onDataPointUnhovered=(e,t)=>{if(this._shaHovered=void 0,this._shaSelected){let e=this._data?.find(e=>e.sha===this._shaSelected)?.date;null!=e&&this.selectDataPoint(new Date(e))}},this.onDocumentKeyDown=e=>{this._shiftKeyPressed=e.shiftKey,("Escape"===e.key||"Esc"===e.key)&&this.resetZoom()},this.onDocumentKeyUp=e=>{this._shiftKeyPressed=e.shiftKey},this.onResize=e=>{this._chart&&this.updateChartSize(e.detail.entries[0].contentRect)},this.onZoom=e=>{this.zoomedRange=e[0]<=this.range[0]&&e[1]>=this.range[1]?void 0:e}}get compact(){return"editor"!==this.placement}get data(){return this._data}get dataPromise(){return this._dataPromise}set dataPromise(e){this._dataPromise!==e&&(this._dataPromise=e,this._dataPromise?.then(e=>{this._data=e,this._dataReversed=e.toReversed()},()=>this._data=void 0))}get range(){return this._range}set range(e){this._range=e,this._rangeScrollable=[e[0].getTime()-144e5,e[1].getTime()+432e5],this.resetZoom()}get zoomedRange(){return this._zoomedRange}set zoomedRange(e){this._zoomedRange=e,this._zoomedRangeScrollable=e?[e[0].getTime(),e[1].getTime()]:void 0}get zoomed(){return null!=this._zoomedRange}connectedCallback(){super.connectedCallback?.(),document.addEventListener("keydown",this.onDocumentKeyDown),document.addEventListener("keyup",this.onDocumentKeyUp)}disconnectedCallback(){document.removeEventListener("keydown",this.onDocumentKeyDown),document.removeEventListener("keyup",this.onDocumentKeyUp),this._loading?.cancel(),this._chart?.destroy(),this._chart=void 0,super.disconnectedCallback?.()}update(e){(e.has("dataPromise")||null==this.dataPromise)&&this.updateChart(),super.update(e)}updateChart(){if(!this._loading?.pending){let e;this._loading=((e={pending:!0,promise:void 0,fulfill:void 0,cancel:void 0}).promise=new Promise((t,r)=>{e.fulfill=function(r){e.pending=!1,t(r)},e.cancel=function(t){e.pending=!1,null!=t?r(t):r()}}),e),this._loading.promise.finally(()=>this._loading=void 0),this.emit("gl-loading",this._loading.promise)}null!=this.dataPromise&&(this._chartAborter?.abort(),this._chartAborter=new AbortController,this.renderChart(this.dataPromise,this._loading,this._chartAborter.signal))}render(){return ek`${this.renderNotice()}
			<gl-chart-scroller
				.range=${this._rangeScrollable}
				.visibleRange=${this._zoomedRangeScrollable}
				@gl-scroll=${this.onScroll}
				@gl-scroll-start=${this.onScrollStart}
				@gl-scroll-end=${this.onScrollEnd}
			>
				<sl-resize-observer @sl-resize=${this.onResize}>
					<div id="chart" tabindex="-1"></div>
				</sl-resize-observer>
				${this.data?.length?this.renderFooter():eC}
			</gl-chart-scroller>`}renderNotice(){return this._loading?.pending||null==this.data?ek`<div class="notice notice--blur">
				<gl-watermark-loader pulse><p>Loading...</p></gl-watermark-loader>
			</div>`:this.data.length?eC:ek`<div class="notice">
				<gl-watermark-loader><slot name="empty"></slot></gl-watermark-loader>
			</div>`}renderFooter(){let e=this._shaHovered??this._shaSelected;return ek`<footer>
			<gl-chart-slider
				.data=${this._dataReversed}
				?shift=${this._shiftKeyPressed}
				@gl-slider-change=${this.onSliderChanged}
				@mouseover=${this.onSliderMouseOver}
				@mouseout=${this.onSliderMouseOut}
			></gl-chart-slider>
			<span @mouseover=${this.onFooterShaMouseOver} @mouseout=${this.onFooterShaMouseOut}
				><gl-commit-sha-copy .sha=${e} .size=${16}></gl-commit-sha-copy
			></span>
			${this.renderActions()}
		</footer>`}renderActions(){return ek`<div class="actions">
			${this.zoomed?ek`<gl-button
						appearance="toolbar"
						@click=${e=>e.shiftKey||e.altKey?this.resetZoom():this.zoom(-1)}
						aria-label="Zoom Out"
					>
						<code-icon icon="zoom-out"></code-icon>
						<span slot="tooltip">Zoom Out<br />[Alt] Reset Zoom</span>
					</gl-button>`:eC}
			<gl-button appearance="toolbar" @click=${()=>this.zoom(.5)} tooltip="Zoom In" aria-label="Zoom In">
				<code-icon icon="zoom-in"></code-icon>
			</gl-button>
		</div>`}onFooterShaMouseOver(){this._shaSelected&&this.showTooltip(this._data?.find(e=>e.sha===this._shaSelected))}onFooterShaMouseOut(){this.hideTooltip()}onScrollStart(){this._chart&&this.zoomed&&(this._transitionDuration=this._chart?.config("transition.duration"),this._chart?.config("transition.duration",0))}onScrollEnd(){this._chart&&this.zoomed&&this._chart?.config("transition.duration",this._transitionDuration)}onScroll(e){if(!this._chart||!this.zoomed)return;let t=[new Date(e.detail.range[0]),new Date(e.detail.range[1])];this._chart.zoom(t)}onSliderChanged(e){this.revealDate(e.detail.date,{focus:!0,select:!0});let t=this._commitsByTimestamp.get(e.detail.date.getTime()),r=t?.sha;this._shaHovered=void 0,this._shaSelected=r,this.showTooltip(t),null!=r&&this.emit("gl-commit-select",{id:r,shift:e.detail.shift})}onSliderMouseOver(e){this.showTooltip(this.slider?.value)}onSliderMouseOut(e){this.hideTooltip()}resetZoom(){this.zoomedRange=void 0,this._chart?.unzoom()}revealDate(e,t){let r,o;if(!this._chart||(this.selectDataPoint(e,t),!this.zoomedRange))return;let i=this.zoomedRange,s=i[1].getTime()-i[0].getTime();if(e<i[0])o=new Date((r=new Date(e.getTime()-.2*s)).getTime()+s),r<=this.range[0]&&(o=new Date((r=e3(this.range[0],{hours:-12})).getTime()+s));else{if(!(e>i[1]))return;r=new Date((o=new Date(e.getTime()+.2*s)).getTime()-s),o>=this.range[1]&&(r=new Date((o=e3(this.range[1],{hours:12})).getTime()-s))}this._chart.zoom([r,o])}selectDataPoint(e,t){let r=this.getInternalChart();if(null==r)return;let o=this.getDataPoint(e);if(null==o)return;t?.focus&&r.showGridFocus([o]);let{index:i}=o;if(null!=i&&(this._chart?.$.main.selectAll(`.bb-chart-circles .bb-shape-${i}`).each(()=>r.setExpand?.(i,null,!0)),t?.select)){let t=this._commitsByTimestamp.get(e.getTime())?.sha;this._shaHovered=void 0,this._shaSelected=t,null!=t&&this.slider?.select(t)}}showTooltip(e){null!=e&&this._chart?.tooltip.show({x:new Date(e.date)})}hideTooltip(){this._chart?.tooltip.hide()}zoom(e){if(0===e)return void this.resetZoom();if(!this._chart)return;let t=this._chart.zoom(),r=[t[0].getTime(),t[1].getTime()],o=r[1]-r[0],i=new Date((r[1]+r[0])/2),s=i.getTime()-o*(1-e)/2,a=i.getTime()+o*(1-e)/2;if(a-s<(this.range[1].getTime()-this.range[0].getTime())/40)return;let c=this._chart.zoom([new Date(s),new Date(a)]);e<0&&c[0].getTime()===r[0]&&c[1].getTime()===r[1]&&this.resetZoom()}calculateBubbleSize(e,{minRadius:t,maxRadius:r,q1:o,q3:i,maxChanges:s}){let a;return 0===e?t:(a=e<=o?t+e/o*10:e<=i?t+10+(e-o)/(i-o)*15:t+25+Math.log(e-i+1)/Math.log(s-i+1)*15,Math.max(t,Math.min(r,a)))}calculateChangeMetrics(e){let t=e.map(e=>(e.additions??0)+(e.deletions??0)).sort((e,t)=>e-t);return{maxChanges:t.at(-1),q1:t[Math.floor(.25*t.length)],q3:t[Math.floor(.75*t.length)]}}getDataPoint(e){let t=e instanceof Date?e.getTime():new Date(e).getTime();return this._chart?.data()[0]?.values.find(e=>("number"==typeof e.x?e.x:e.x.getTime())===t)}getInternalChart(){try{let e=this._chart?.internal;return this._chart,e}catch{return}}getOnRenderedCallback(e){return function(){let t=this;null!=t&&t.$.main.selectAll(".bb-axis-y .tick text tspan").each(function(r){if(this==null)return;let o=e._slicesByIndex.get(-r.index),i=t.color(o);e.compact&&this.setAttribute("fill",i);let s=document.createElementNS("http://www.w3.org/2000/svg","title");s.textContent=o,this.appendChild(s)})}}prepareChartData(e,t){let r=e.length+1,o=Array(r);o[0]="time";let i=Array(r);i[0]="additions";let s=Array(r);s[0]="deletions";let a={time:"x",additions:"y2",deletions:"y2"},c={additions:"bar",deletions:"bar"},h={additions:"time",deletions:"time"};this._slices.clear(),this._slicesByIndex.clear();let p=0,u=(e,t,r)=>{let o=this._slices.get(e);null==o?(o={x:[`time.${e}`,t],y:p,z:new Map([[t,r]])},this._slices.set(e,o),this._slicesByIndex.set(p,e),a[e]="y",c[e]="scatter",h[e]=`time.${e}`,p--):(o.x.push(t),o.z.set(t,r))},f=0;for(let r of e){let{author:e,date:a,additions:c=0,deletions:h=0,branches:p}=r;this._commitsByTimestamp.set(new Date(a).getTime(),r),o[++f]=a,i[f]=c,s[f]=h;let b=this.calculateBubbleSize(c+h,t);if("branch"===this.sliceBy)for(let e of p?.length?p:[this.head??"HEAD"])u(e,a,b);else u(e,a,b)}let b=[o,i,s];for(let[e,t]of this._slices){b.push(t.x);let r=Array(t.x.length).fill(t.y);r[0]=e,b.push(r)}return{axes:a,columns:b,names:{additions:"Additions",deletions:"Deletions"},types:c,xs:h}}async renderChart(r,o,i){let s=await r;if(i.aborted)return void o?.cancel();this._slices.clear(),this._slicesByIndex.clear(),this._commitsByTimestamp.clear();let a={minRadius:6,maxRadius:50,...this.calculateChangeMetrics(s)},{bb:c,bar:h,scatter:p,selection:u,zoom:f}=await P.e(162).then(P.bind(P,973));if(i.aborted)return void o?.cancel();this.range=s.length?[new Date(s.at(-1).date),new Date(s[0].date)]:[new Date,new Date],h(),p();let b=this.prepareChartData(s,a);try{let r=-(this._slices.size+1),i=[...this._slicesByIndex.keys()];if(null==this._chart){let a={bindto:this.chartContainer,onafterinit:()=>{this.updateChartSize(),setTimeout(()=>o?.fulfill(),0)},onrendered:this.getOnRenderedCallback(this),clipPath:!0,data:{...b,colors:{additions:"rgba(73, 190, 71, 1)",deletions:"rgba(195, 32, 45, 1)"},groups:[["additions","deletions"]],selection:{enabled:u(),draggable:!1,grouped:!0,multiple:!1,isselectable:()=>!1},onclick:this.onDataPointClicked,onover:this.onDataPointHovered,onout:this.onDataPointUnhovered},axis:{x:{type:"timeseries",localtime:!0,height:this.compact?28:void 0,forceAsSingle:!0,tick:{fit:!1,format:e=>"number"==typeof e?e:e8(e,this.shortDateFormat??"short"),outer:!0}},y:{max:0,min:r,padding:{top:75,bottom:75},tick:{format:e=>this.compact?"branch"===this.sliceBy?"":"":function(e,t="…"){if(!e)return e;let r=null==e||0===e.length?0:ru(e,rf,rb).width;return r<=30?e:`${e.slice(0,Math.floor(15)-1)}${t}${e.slice(r-Math.ceil(15))}`}(this._slicesByIndex.get(e)??""),outer:!0,values:i}},y2:{padding:this.compact?{top:0,bottom:0}:void 0,label:this.compact?void 0:{text:"Lines changed",position:"outer-middle"},show:!0,tick:{format:e=>this.compact?"":e,outer:!0}}},bar:{width:2,sensitivity:4,padding:2},scatter:{zerobased:!0},grid:{focus:{edge:!0,show:!0,y:!0},front:!1,lines:{front:!1},x:{show:!1},y:{show:!0}},legend:{show:!0,hide:["additions","deletions"],padding:4,item:{tile:{type:"circle",r:5},interaction:{dblclick:!0}},tooltip:!0},point:{r:e=>null==e||"function"==typeof e.data&&(e=e.data()[0],null==e)?0:null!=e.r?e.r:Math.max(6,this._slices.get(e.id)?.z.get(e.x.toISOString())??6),focus:{expand:{enabled:!0}},select:{r:6}},resize:{auto:!1},tooltip:{contents:(r,o,i,s)=>{var a;let c=r[0],h=new Date(c.x),p=this._commitsByTimestamp.get(h.getTime());if(null==p)return"";if(""===p.sha)return`<div class="bb-tooltip">
									<div class="author">Working Tree</div>
									<div class="message"><span class="message__content">No uncommitted changes</span></div>
								</div>`;let u=p.additions,f=p.deletions,b=null==u?"":`<span class="additions">+${rg("line",u)}</span>`,g=null==f?"":`<span class="deletions">-${rg("line",f)}</span>`;b&&(g=`, ${g}`);let m=p.branches?.length?`<div class="branches"><span class="icon">\uEA68</span> ${p.branches.join(", ")}</div>`:"";return`<div class="bb-tooltip">
									<div class="author">${p.author}</div>
									<div>
										<span class="sha"><span class="icon">\uEAFC</span> ${eJ(p.sha)}</span>
										<span class="changes">${b}${g}</span>
									</div>
									<div class="date">
										<span class="icon">\uEA82</span><span class="date--relative">${(a=function(r){let o=("number"==typeof r?r:r.getTime())-Date.now();for(let[r,i,s,a]of e5)if(Math.abs(o)>=i||1e3===i)return(t??=new Intl.RelativeTimeFormat(e,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(o/s),r);return""}(h)).charAt(0).toUpperCase()+a.slice(1)}</span><span class="date--absolute">(${e8(h,this.dateFormat)})</span>
									</div>
									${m}
									<div class="message"><span class="message__content">${p.message}</span></div>
								</div>`},show:!0},zoom:{enabled:f(),type:"wheel",extent:[1,40],onzoom:this.onZoom,onzoomend:this.onZoom}};this._chart=c.generate(a);let h=s[0];this._shaHovered=void 0,this._shaSelected=h?.sha,null!=h&&this.selectDataPoint(new Date(h.date),{select:!0})}else this._chart.config("axis.y.tick.values",i,!1),this._chart.config("axis.y.min",r,!1),this._chart.load({...b,resizeAfter:!0,unload:!0,done:()=>{let e;null!=this._shaSelected&&(e=s.find(e=>e.sha===this._shaSelected)),null==e&&(e=s[0],this._shaHovered=void 0,this._shaSelected=e?.sha),null!=e&&this.selectDataPoint(new Date(e.date),{select:!0}),setTimeout(()=>o?.fulfill(),0)}});return void await o.promise.catch(()=>{})}catch(e){o?.cancel()}}updateChartSize(e){(e??=this.chartContainer.getBoundingClientRect()).width>0&&e.height>0&&requestAnimationFrame(()=>{this._chart.resize({width:e.width,height:e.height}),this.updateScrollerTrackPosition()})}updateScrollerTrackPosition(){let e=this.shadowRoot?.querySelector(".bb-axis.bb-axis-x");if(null==e)return;let t=e.getBoundingClientRect(),r=this.chartContainer.getBoundingClientRect();this.style.setProperty("--scroller-track-top",`${t.top-(r.top-1)}px`),this.style.setProperty("--scroller-track-left",`${t.left+2}px`),this.style.setProperty("--scroller-track-width",`${t.width-2}px`)}};nf.tagName=nu,nf.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nf.styles=[oW],np([eB("#chart")],nf.prototype,"chartContainer",2),np([eB(i$.tagName)],nf.prototype,"slider",2),np([eM()],nf.prototype,"_loading",2),np([eL()],nf.prototype,"placement",2),np([eL()],nf.prototype,"dateFormat",2),np([eL({type:String})],nf.prototype,"head",2),np([eL({type:Object})],nf.prototype,"scope",2),np([eL()],nf.prototype,"shortDateFormat",2),np([eL()],nf.prototype,"sliceBy",2),np([eM()],nf.prototype,"_data",2),np([eL({type:Object})],nf.prototype,"dataPromise",1),np([eM()],nf.prototype,"_shaHovered",2),np([eM()],nf.prototype,"_shaSelected",2),np([eM()],nf.prototype,"_shiftKeyPressed",2),np([eM()],nf.prototype,"_zoomedRange",2),np([eL({type:Boolean,reflect:!0})],nf.prototype,"zoomed",1),np([of({args:e=>({dataset:e?.length})})],nf.prototype,"prepareChartData",1),np([of({args:!1})],nf.prototype,"renderChart",1),nf=np([eD(nu)],nf);let nb=M`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;M`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${nb}
	}
`;let ng=M`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,nm=M`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`,nv=M`
	:focus-visible {
		${ng}
	}
`;var ny=Object.defineProperty,nw=Object.getOwnPropertyDescriptor,nx=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nw(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&ny(t,r,s),s};let nk=class extends lit_element_i{render(){return ek`<slot></slot>`}};nk.styles=M`
		* {
			box-sizing: border-box;
		}

		:host {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			gap: 0.4rem;
			overflow: hidden;
			font-size: var(--vscode-font-size);
			color: var(--vscode-foreground);
			width: 100%;
		}

		::slotted(gl-breadcrumb-item:not(:last-of-type))::after {
			content: '\\eab6'; /* chevron-right codicon */
			font-family: codicon;
			font-size: 12px;
			width: 12px;
			height: 12px;
			opacity: 0.6;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
			position: relative;
			left: -0.6rem;
			margin-right: -0.6rem;
			transition:
				left 0.3s cubic-bezier(0.25, 1, 0.5, 1),
				margin-right 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		}

		::slotted(gl-breadcrumb-item[collapsed]:not(:hover):not(:focus-within):not(:last-of-type))::after {
			left: -1.2rem;
			margin-right: -1.2rem;
		}

		::slotted(:last-child:not(gl-breadcrumb-item:last-of-type)) {
			margin-left: 1rem;
		}
	`,nk=nx([eD("gl-breadcrumbs")],nk);let n_=class extends lit_element_i{constructor(){super(...arguments),this.collapsibleState="none",this._shrink=1,this.onToggleCollapse=e=>{e.preventDefault(),e.stopPropagation(),e instanceof KeyboardEvent&&"Enter"!==e.key&&" "!==e.key||(this.collapsed=!this.collapsed)}}get collapsed(){return this._collapsed??"collapsed"===this.collapsibleState}set collapsed(e){this._collapsed=e}get collapsible(){return"none"!==this.collapsibleState}get shrink(){return this._shrink}set shrink(e){let t=this._shrink;this._shrink=e,this.style.setProperty("--gl-breadcrumb-item-shrink",String(e)),this.requestUpdate("shrink",t)}render(){let{collapsed:e,collapsible:t}=this;return ek`<div class=${im({"breadcrumb-item":!0,collapsible:t})}>
			<span class="breadcrumb-content">
				${this.renderIcon(t,e)}
				<slot class="breadcrumb-label"></slot>
			</span>
			<slot name="children"></slot>
		</div>`}renderIcon(e,t){return this.icon?e||this.iconTooltip?ek`<gl-tooltip
			content="${e?t?"Click to Expand":"Click to Collapse":this.iconTooltip}"
			placement="bottom"
		>
			<code-icon
				class="breadcrumb-icon"
				icon="${this.icon}"
				tabindex="0"
				@click=${e?this.onToggleCollapse:void 0}
				@keyup=${e?this.onToggleCollapse:void 0}
			></code-icon>
		</gl-tooltip>`:ek`<code-icon class="breadcrumb-icon" icon="${this.icon}"></code-icon>`:eC}};n_.styles=[nv,M`
			* {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				white-space: nowrap;
				overflow: hidden;
				min-width: 0;
				flex-shrink: var(--gl-breadcrumb-item-shrink, 1);
			}

			:host([icon]) {
				min-width: calc(24px + 0.6rem);
			}

			:host(:hover),
			:host(:focus-within) {
				flex-shrink: 0;
			}

			.breadcrumb-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				white-space: nowrap;
				overflow: hidden;
				min-width: 0;
				width: 100%;
				cursor: default;
			}

			.breadcrumb-content {
				display: inline-flex;
				align-items: center;
				gap: 0.6rem;
				vertical-align: middle;
				max-width: 100%;
			}

			.breadcrumb-icon {
				flex-shrink: 0;
				z-index: 2;
			}

			.collapsible .breadcrumb-icon {
				cursor: pointer;
			}

			.breadcrumb-label {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100vw;
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			}

			.breadcrumb-tooltip {
				display: inline-flex;
				align-items: center;
				vertical-align: middle;
			}

			slot[name='children'] {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				overflow: hidden;
				max-width: 100vw;
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			}

			:host([collapsed]) .breadcrumb-item:not(:hover):not(:focus-within) .breadcrumb-label,
			:host([collapsed]) .breadcrumb-item:not(:hover):not(:focus-within) slot[name='children'] {
				max-width: 0;
			}
		`],nx([eM()],n_.prototype,"_collapsed",2),nx([eL({type:Boolean,reflect:!0})],n_.prototype,"collapsed",1),nx([eL({type:String})],n_.prototype,"collapsibleState",2),nx([eL()],n_.prototype,"icon",2),nx([eL()],n_.prototype,"iconTooltip",2),nx([eL({type:Number})],n_.prototype,"shrink",1),n_=nx([eD("gl-breadcrumb-item")],n_);let n$=class extends lit_element_i{render(){return ek`<slot></slot>`}};n$.styles=M`
		:host {
			display: flex;
			flex-direction: row;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			margin-right: 0.6rem;
		}

		:host::before {
			content: '\\eab6'; /* chevron-right codicon */
			font-family: codicon;
			font-size: 12px;
			width: 12px;
			height: 12px;
			opacity: 0.6;
			margin-right: 0.4rem;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
		}

		.breadcrumb-label {
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	`,n$=nx([eD("gl-breadcrumb-item-child")],n$);let nC=M`
	:host {
		box-sizing: border-box;
	}
	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}
	[hidden] {
		display: none !important;
	}
`;M`
	* {
		box-sizing: border-box;
	}
`;let nS=M`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${ng}
	}
	a:hover {
		text-decoration: underline;
	}
`,nP=M`
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-color: inherit;
		border-right-style: inset;
		border-right-width: calc(100vw + 100vh);
		border-radius: unset !important;
	}
	::-webkit-scrollbar-thumb:hover {
		border-color: var(--vscode-scrollbarSlider-hoverBackground);
	}
	::-webkit-scrollbar-thumb:active {
		border-color: var(--vscode-scrollbarSlider-activeBackground);
	}

	.scrollable {
		border-color: transparent;
		transition: border-color 1s linear;
	}

	:host(:hover) .scrollable,
	:host(:focus-within) .scrollable {
		border-color: var(--vscode-scrollbarSlider-background);
		transition: none;
	}

	:host-context(.preload) .scrollable {
		transition: none;
	}
`;M`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;var nA=Object.defineProperty,nE=Object.getOwnPropertyDescriptor,nO=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nE(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nA(t,r,s),s};let nT=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?ek`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eC}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ek`<gl-tooltip placement=${this.tooltipPlacement??eC}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ek`<a
				class="control"
				tabindex="${(!1===this.disabled?void 0:-1)??eC}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ek`<button
			class="control"
			role=${this.role??eC}
			aria-checked=${this.ariaChecked??eC}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};nT.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nT.styles=[nC,M`
			:host {
				/* Base color variables - can be overridden by variant */
				--button-foreground: var(--vscode-button-foreground);
				--button-background: var(--vscode-button-background);
				--button-hover-background: var(--vscode-button-hoverBackground);
				--button-border: var(--vscode-button-border, transparent);

				/* Layout variables */
				--button-width: max-content;
				--button-padding: 0.4rem;
				--button-gap: 0.6rem;
				--button-compact-padding: 0.4rem;
				--button-input-padding: 0.1rem;
				--button-tight-padding: 0.4rem 0.8rem;
				--button-line-height: 1.35;

				display: inline-block;
				width: var(--button-width);
				border: none;
				font-family: inherit;
				font-size: inherit;
				line-height: var(--button-line-height);
				text-align: center;
				text-decoration: none;
				user-select: none;
				background: var(--button-background);
				color: var(--button-foreground);
				cursor: pointer;
				border: 1px solid var(--button-border);
				border-radius: var(--gk-action-radius, 0.3rem);
				-webkit-font-smoothing: auto;
			}

			.control {
				box-sizing: border-box;
				display: inline-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				gap: var(--button-gap);
				padding: var(--button-padding);
				line-height: var(--button-line-height);
				font-family: inherit;
				font-size: inherit;

				color: inherit;
				text-decoration: none;

				width: var(--button-width);
				max-width: 100%;
				height: 100%;
				cursor: pointer;
			}

			/* When truncate is enabled, allow the control to shrink */
			:host([truncate]) .control {
				min-width: 0;
			}

			button.control {
				appearance: none;
				background: transparent;
				border: none;
			}

			.control:focus {
				outline: none;
			}

			.label {
				display: inline-flex;
				align-items: center;
				max-width: 100%;
			}

			/* Text truncation option - enabled via truncate attribute */
			:host([truncate]) .label {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block; /* Change from flex to block for ellipsis to work */
			}

			:host(:hover) {
				background: var(--button-hover-background);
			}

			:host(:focus-within) {
				${nm}
			}

			:host([appearance='input']),
			:host([role='checkbox']:focus-within),
			:host([aria-checked]:focus-within) {
				outline-offset: -1px;
			}

			:host([full]),
			:host([full]) .control {
				width: 100%;
			}

			:host([appearance='secondary']) {
				--button-background: var(--vscode-button-secondaryBackground);
				--button-foreground: var(--vscode-button-secondaryForeground);
				--button-hover-background: var(--vscode-button-secondaryHoverBackground);
			}

			:host([appearance='input']),
			:host([appearance='toolbar']) {
				--button-background: transparent;
				--button-foreground: var(--vscode-foreground);
				--button-hover-background: var(--vscode-toolbar-hoverBackground);
				--button-border: transparent;
			}

			:host([appearance='alert']) {
				--button-background: transparent;
				--button-border: var(--color-alert-infoBorder);
				--button-foreground: var(--color-alert-infoForeground);
				--button-hover-background: var(--color-alert-infoBorder);
				--button-line-height: 1.64;
				width: max-content;
			}

			:host([appearance='alert']:hover) {
				--button-foreground: var(--vscode-button-foreground);
			}

			/* Variant property for semantic states - appearance controls structure, variant controls color */

			/* Solid buttons (default and secondary) with variants get full color treatment */
			:host([variant='danger']) {
				--button-foreground: var(--vscode-errorForeground, #f48771);
				--button-background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
				--button-hover-background: color-mix(
					in srgb,
					#000 30%,
					var(--vscode-inputValidation-errorBorder, #be1100)
				);
				--button-border: var(--vscode-inputValidation-errorBorder, #be1100);
			}

			:host([variant='warning']) {
				--button-foreground: #fff;
				--button-background: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
				--button-hover-background: color-mix(
					in srgb,
					#000 20%,
					var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor, #cc6600)
				);
				--button-border: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
			}

			:host([variant='success']) {
				--button-foreground: #fff;
				--button-background: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
				--button-hover-background: color-mix(in srgb, #000 30%, var(--vscode-testing-iconPassed, #73c991));
				--button-border: color-mix(in srgb, #000 40%, var(--vscode-testing-iconPassed, #73c991));
			}

			/* Transparent appearances (toolbar, input, alert) with variants only change foreground color */
			/* These come after the main variant rules to override background/border back to transparent */
			:host([appearance='toolbar'][variant='danger']),
			:host([appearance='input'][variant='danger']),
			:host([appearance='alert'][variant='danger']) {
				--button-foreground: var(--vscode-errorForeground, #f48771);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='warning']),
			:host([appearance='input'][variant='warning']),
			:host([appearance='alert'][variant='warning']) {
				--button-foreground: var(
					--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor,
					#cc6600
				);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='toolbar'][variant='success']),
			:host([appearance='input'][variant='success']),
			:host([appearance='alert'][variant='success']) {
				--button-foreground: var(--vscode-testing-iconPassed, #73c991);
				--button-background: transparent;
				--button-border: transparent;
			}

			:host([appearance='input']) .control {
				padding: var(--button-input-padding);
				--button-line-height: 1.1;
				height: var(--button-input-height, 1.8rem);
				gap: 0.2rem;
			}

			:host([appearance='input'][href]) > a,
			:host([appearance='toolbar'][href]) > a {
				display: flex;
				align-items: center;
			}

			:host([appearance='alert'][href]) > a {
				display: block;
				width: max-content;
			}

			:host([density='compact']) .control {
				padding: var(--button-compact-padding);
			}

			:host([density='tight']) .control {
				padding: var(--button-tight-padding);
			}

			:host([density='tight']) .control ::slotted(code-icon) {
				--code-icon-size: 11px;
				--code-icon-v-align: unset;
			}

			:host([aria-checked]:hover:not([disabled]):not([aria-checked='true'])) {
				background-color: var(--vscode-inputOption-hoverBackground);
			}

			:host([disabled]) {
				opacity: 0.4;
				cursor: not-allowed;
				pointer-events: none;
			}

			:host([disabled][aria-checked='true']) {
				opacity: 0.8;
			}

			:host([aria-checked='true']) {
				background-color: var(--vscode-inputOption-activeBackground);
				color: var(--vscode-inputOption-activeForeground);
				border-color: var(--vscode-inputOption-activeBorder);
			}

			gl-tooltip {
				height: 100%;
				width: 100%;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
		`],nO([eB(".control")],nT.prototype,"control",2),nO([eL({reflect:!0})],nT.prototype,"appearance",2),nO([eL({reflect:!0})],nT.prototype,"variant",2),nO([eL({type:Boolean,reflect:!0})],nT.prototype,"disabled",2),nO([eL({reflect:!0})],nT.prototype,"density",2),nO([eL({type:Boolean,reflect:!0})],nT.prototype,"full",2),nO([eL()],nT.prototype,"href",2),nO([eL()],nT.prototype,"tooltip",2),nO([eL()],nT.prototype,"tooltipPlacement",2),nO([eL({type:Boolean,reflect:!0})],nT.prototype,"truncate",2),nT=nO([eD("gl-button")],nT);let nz=M`
	:host {
		--checkbox-foreground: var(--vscode-checkbox-foreground);
		--checkbox-background: var(--vscode-checkbox-background);
		--checkbox-border: var(--vscode-checkbox-border);
		--checkbox-checked-foreground: var(--vscode-inputOption-activeForeground);
		--checkbox-checked-background: var(--vscode-inputOption-activeBackground);
		--checkbox-checked-border: var(--vscode-inputOption-activeBorder);
		--checkbox-active-background: var(--vscode-checkbox-selectBackground);
		--checkbox-active-border: var(--vscode-checkbox-selectBorder);
		--checkbox-hover-background: var(--vscode-inputOption-hoverBackground);
		--checkbox-radius: 3px;
		--checkbox-border-width: 1px;
		--checkbox-size: 1.6rem;
		--checkbox-spacing: 1rem;

		display: block;
		margin-block: 0.8rem;
	}

	label {
		display: flex;
		gap: var(--checkbox-spacing);
		align-items: center;
		user-select: none;
		white-space: nowrap;
		cursor: pointer;
		color: var(--checkbox-foreground);
	}

	:host([disabled]) label {
		cursor: default;
		opacity: 0.5;
	}

	.label-text {
		display: block;
		line-height: normal;
		margin-inline-end: var(--checkbox-spacing);
	}

	.input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}
	.control {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: var(--checkbox-size);
		height: var(--checkbox-size);
		box-sizing: border-box;
		border-radius: var(--checkbox-radius);
		color: var(--checkbox-foreground);
		background: var(--checkbox-background);
		border: var(--checkbox-border-width, 1px) solid var(--vscode-checkbox-border);
	}

	.input:hover + .control {
		background-color: var(--checkbox-hover-background);
	}

	.input:focus-visible + .control,
	.input:focus + .control {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: 2px;
	}

	.input:active + .control {
		background-color: var(--checkbox-active-background);
		border-color: var(--checkbox-active-border);
	}

	:host([checked]) .control {
		color: var(--checkbox-checked-foreground);
		background-color: var(--checkbox-checked-background);
		border-color: var(--checkbox-checked-border);
	}

	code-icon {
		pointer-events: none;
	}
`;var nR=Object.defineProperty,nD=Object.getOwnPropertyDescriptor,nI=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nD(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nR(t,r,s),s};let nL=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleChange(e){this.checked=e.target.checked;let t=new CustomEvent("gl-change-value");this.dispatchEvent(t)}renderCheck(){if(this.checked)return ek` <code-icon icon="check"></code-icon> `}render(){return ek`<label ?aria-disabled=${this.disabled}
			><input
				class="input"
				.disabled=${this.disabled}
				type="checkbox"
				.checked=${this.checked}
				@change=${this.handleChange}
			/>
			<div class="control">${this.renderCheck()}</div>
			<slot class="label-text"></slot>
		</label>`}};function nM(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}nL.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},nL.styles=[nz],nI([eL({type:Boolean,reflect:!0})],nL.prototype,"disabled",2),nI([eL({type:String})],nL.prototype,"value",2),nI([eL({type:Boolean})],nL.prototype,"defaultChecked",1),nI([eL({type:Boolean,reflect:!0})],nL.prototype,"checked",2),nL=nI([eD("gl-checkbox")],nL),sG.define("sl-popup");var nN=Object.defineProperty,nB=Object.getOwnPropertyDescriptor,nF=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nB(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nN(t,r,s),s};let nj=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleTriggerBlur=e=>{this.open&&this.hasTrigger("focus")&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=()=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=rj(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=rj(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of nj.openPopovers)t===e||t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINS||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),nj.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}render(){return ek`<sl-popup
			part="base"
			exportparts="
				popup:base__popup,
				arrow:base__arrow
			"
			class="popover"
			.anchor=${this.anchor}
			placement=${this.placement}
			distance=${this.distance}
			skidding=${this.skidding}
			strategy=${this.hoist?"fixed":"absolute"}
			auto-size="horizontal"
			auto-size-padding="3"
			flip-padding="3"
			flip
			shift
			?arrow=${this.arrow}
			hover-bridge
		>
			<div slot="anchor" aria-describedby="popover">
				<slot name="anchor"></slot>
			</div>

			<div
				part="body"
				id="popover"
				class="popover__body scrollable ${"menu"===this.appearance?"is-menu":""}"
				role="tooltip"
				aria-live=${this.open?"polite":"off"}
			>
				<slot name="content"></slot>
			</div>
		</sl-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),nj.closeOthers(this),this.open=!0,nj.openPopovers.add(this),rU(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,nj.openPopovers.delete(this),rU(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};nj.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nj.openPopovers=new Set,nj.styles=[nP,M`
			:host {
				--hide-delay: 0ms;
				--show-delay: 500ms;

				display: contents;
			}

			.popover {
				--arrow-size: var(--sl-tooltip-arrow-size);
				--arrow-color: var(--sl-tooltip-background-color);
			}

			.popover::part(popup) {
				z-index: var(--sl-z-index-tooltip);
			}

			.popover::part(arrow) {
				border: 1px solid var(--gl-tooltip-border-color);
				z-index: 1;
			}

			.popover[placement^='top']::part(popup) {
				transform-origin: bottom;
			}

			.popover[placement^='bottom']::part(popup) {
				transform-origin: top;
			}

			.popover[placement^='left']::part(popup) {
				transform-origin: right;
			}

			.popover[placement^='right']::part(popup) {
				transform-origin: left;
			}

			.popover[data-current-placement^='top']::part(arrow) {
				border-top-width: 0;
				border-left-width: 0;
				clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);
			}

			.popover[data-current-placement^='bottom']::part(arrow) {
				border-bottom-width: 0;
				border-right-width: 0;
				clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
			}

			.popover[data-current-placement^='left']::part(arrow) {
				border-bottom-width: 0;
				border-left-width: 0;
				clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 100%, 0 30%);
			}

			.popover[data-current-placement^='right']::part(arrow) {
				border-top-width: 0;
				border-right-width: 0;
				clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 70%, 30% 0);
			}

			.popover__body {
				display: block;
				width: fit-content;
				border: 1px solid var(--gl-tooltip-border-color);
				border-radius: var(--sl-tooltip-border-radius);
				box-shadow: 0 2px 8px var(--gl-tooltip-shadow);
				background-color: var(--sl-tooltip-background-color);
				font-family: var(--sl-tooltip-font-family);
				font-size: var(--sl-tooltip-font-size);
				font-weight: var(--sl-tooltip-font-weight);
				line-height: var(--sl-tooltip-line-height);
				text-align: start;
				white-space: normal;
				color: var(--sl-tooltip-color);
				padding: var(--sl-tooltip-padding);
				user-select: none;
				-webkit-user-select: none;
				max-width: min(var(--auto-size-available-width), var(--max-width, 70vw));
				/* max-height: var(--auto-size-available-height);
			overflow: auto; */
				pointer-events: all;
			}

			/* Override scrollbar thumb to not inherit border-color from the popover
			   body's visible border, which conflicts with the scrollableBase trick */
			.popover__body::-webkit-scrollbar-thumb {
				border-color: transparent;
			}
			:host(:hover) .popover__body::-webkit-scrollbar-thumb,
			:host(:focus-within) .popover__body::-webkit-scrollbar-thumb {
				border-color: var(--vscode-scrollbarSlider-background);
			}

			.popover[data-current-placement^='top'] .popover__body,
			.popover[data-current-placement^='bottom'] .popover__body {
				width: max-content;
			}

			:host([appearance='menu']) {
				--sl-tooltip-padding: var(--sl-spacing-2x-small);
				--sl-tooltip-font-size: var(--vscode-font-size);
				--sl-tooltip-background-color: var(--vscode-menu-background);
				--arrow-color: var(--vscode-menu-background);
			}

			[slot='anchor'] {
				width: var(--gl-popover-anchor-width, fit-content);
				max-width: 100%;
				overflow: hidden;
			}

			/* .popover::part(hover-bridge) {
				background: tomato;
				opacity: 0.5;
				z-index: 10000000000;
			} */
		`],nF([eB("#popover")],nj.prototype,"body",2),nF([eB("sl-popup")],nj.prototype,"popup",2),nF([eL({reflect:!0})],nj.prototype,"placement",2),nF([eL({type:Object})],nj.prototype,"anchor",2),nF([eL({reflect:!0,type:Boolean})],nj.prototype,"disabled",2),nF([eL({type:Number})],nj.prototype,"distance",2),nF([eL({reflect:!0,type:Boolean})],nj.prototype,"open",2),nF([eL({reflect:!0,type:Boolean})],nj.prototype,"arrow",2),nF([eL({type:Number})],nj.prototype,"skidding",2),nF([eL()],nj.prototype,"trigger",2),nF([eL({type:Boolean})],nj.prototype,"hoist",2),nF([eL({reflect:!0})],nj.prototype,"appearance",2),nF([eM()],nj.prototype,"suppressed",2),nF([rt("open",{afterFirstUpdate:!0})],nj.prototype,"handleOpenChange",1),nF([rt(["distance","hoist","placement","skidding"])],nj.prototype,"handleOptionsChange",1),nF([rt("disabled")],nj.prototype,"handleDisabledChange",1),nj=nF([eD("gl-popover")],nj);let private_async_helpers_s=class private_async_helpers_s{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let nU=e=>null!==e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...e){return e.find(e=>!nU(e))??e$}update(e,t){let r=this._$Cbt,o=r.length;this._$Cbt=t;let i=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let a=t[e];if(!nU(a))return this._$Cwt=e,a;e<o&&a===r[e]||(this._$Cwt=0x3fffffff,o=0,Promise.resolve(a).then(async e=>{for(;s.get();)await s.get();let t=i.deref();if(void 0!==t){let r=t._$Cbt.indexOf(a);r>-1&&r<t._$Cwt&&(t._$Cwt=r,t.setValue(e))}}))}return e$}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let nq=tj(until_c);var nW=Object.defineProperty,nH=Object.getOwnPropertyDescriptor,nV=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nH(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nW(t,r,s),s};let nG=class extends lit_element_i{constructor(){super(...arguments),this.type="info",this._hasPromo=!1}get hasPromo(){return this._hasPromo}set hasPromo(e){this._hasPromo=e}render(){return ek`${nq(this.promoPromise?.then(e=>this.renderPromo(e)),eC)}`}renderPromo(e){if(!e?.content?.webview){this.hasPromo=!1;return}let t=e.content.webview;switch(this.type){case"icon":return ek`<code-icon icon="star-full" size="16"></code-icon>`;case"info":if(t.info)return this.hasPromo=!0,ek`<p class="promo" part="text">${iW(t.info.html)}</p>`;break;case"link":if(t.link)return this.hasPromo=!0,ek`<a
						class="link"
						part="link"
						href="${this.getCommandUrl(e)}"
						title="${t.link.title??eC}"
						>${iW(t.link.html)}</a
					>`}return this.hasPromo=!1,eC}getCommandUrl(e){let t;return e?.content?.webview?.link?.command?.startsWith("command:")&&(t=e.content.webview.link.command.substring(8)),nM(t??"gitlens.plus.upgrade",this.source)}focus(){this._focusable?.focus()}};nG.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nG.styles=[M`
			:host {
				display: block;
			}

			.promo {
				margin: 0;
				margin-top: 0.8rem;
				text-align: center;
			}

			.header {
				margin-right: 0.4rem;
			}

			.content {
				font-size: smaller;
			}

			.muted {
				opacity: 0.7;
			}

			.link {
				display: block;
				color: inherit;
				max-width: 100%;
				text-align: center;
				text-decoration: none;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.link:focus-visible {
				${ng}
			}

			.link:hover {
				color: inherit;
				text-decoration: underline;
			}
		`],nV([eB('a,button,[tabindex="0"]')],nG.prototype,"_focusable",2),nV([eL({type:Object})],nG.prototype,"promoPromise",2),nV([eL({type:Object})],nG.prototype,"source",2),nV([eL({reflect:!0,type:String})],nG.prototype,"type",2),nV([eL({type:Boolean,reflect:!0,attribute:"has-promo"})],nG.prototype,"hasPromo",1),nG=nV([eD("gl-promo")],nG);var nK=Object.defineProperty,nZ=Object.getOwnPropertyDescriptor,nY=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nZ(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nK(t,r,s),s};let nX=class extends lit_element_i{constructor(){super(...arguments),this.cloud=!1,this.placement="bottom",this.preview=!1}get daysRemaining(){var e,t;return null==this.subscription?0:(e=this.subscription,t=e.plan.effective.expiresOn,(null!=t?function(e,t,r,o){let i=("number"==typeof t?t:t.getTime())-("number"==typeof e?e:e.getTime()),s=o??Math.floor;switch(r){case"days":return s(i/864e5);case"hours":return s(i/36e5);case"minutes":return s(i/6e4);case"seconds":return s(i/1e3);default:return i}}(Date.now(),new Date(t),"days",Math.round):void 0)??0)}get state(){return this.subscription?.state}render(){return ek`
			<gl-popover placement=${this.placement} hoist>
				<span slot="anchor" class="badge" tabindex="0">${this.renderBadge()}</span>
				<div slot="content" class="badge-popup" tabindex="-1">
					${this.renderPopoverHeader()}${this.renderPopoverContent()}
				</div>
			</gl-popover>
		`}renderBadge(){let e=this.preview?"Preview":"Pro";if(null!=this.subscription)if(this.state===te.VerificationRequired)return ek`${e} <code-icon class="badge-icon" icon="warning" size="10"></code-icon>`;else{var t;if(tr(this.subscription)||this.cloud&&null!=this.subscription.account)return ek`${e} <code-icon class="badge-icon" icon="check" size="10"></code-icon>`;if(null!=(t=this.subscription).state?t.state===te.Trial:t.plan.actual.id!==t.plan.effective.id)return ek`${e} <code-icon class="badge-icon" icon="clock" size="10"></code-icon>`}return e}renderPopoverHeader(){let e=ek`<span class="popup-title">${this.preview?"Preview feature":"Pro feature"}</span>`;return this.state===te.Paid?ek`<div class="popup-header">${e}</div>`:this.cloud?this.preview?ek`<div class="popup-header">
					${e}<span class="popup-subtitle"
						>Unlock this feature with an account and may require GitLens Pro in the future</span
					>
				</div>`:ek`<div class="popup-header">
				${e}<span class="popup-subtitle"> Unlock this feature with GitLens Pro</span>
			</div>`:this.preview?ek`<div class="popup-header">
				${e}<span class="popup-subtitle">May require GitLens Pro in the future</span>
			</div>`:ek`<div class="popup-header">
			${e}<span class="popup-subtitle"> Unlock this feature for privately hosted repos with GitLens Pro</span>
		</div>`}renderPopoverContent(){let e;if(null==this.subscription)return eC;switch(this.state){case te.Paid:var t;e=ek`<p>
					Your
					<gl-tooltip hoist content="Show Account view">
						<a href="${nM("gitlens.showAccountView")}"
							>${t=this.subscription?.plan.actual.id??"pro",`GitLens ${function(e){switch(e){case"student":return"Student";case"pro":return"Pro";case"advanced":return"Advanced";case"teams":return"Business";case"enterprise":return"Enterprise";default:return"Community"}}(t)}`}</a
						>
					</gl-tooltip>
					plan provides access to all Pro features.
				</p>`;break;case te.VerificationRequired:e=ek`<p>You must verify your email before you can access Pro features.</p>
					<div class="actions">
						<gl-button
							density="tight"
							href="${nM("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							density="tight"
							href="${nM("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</div>`;break;case te.Trial:{let t=this.daysRemaining;e=ek`<p>
						You have
						<strong>${t<1?"<1 day":rg("day",t,{infix:" more "})} left</strong>
						in your Pro trial. Once your trial ends, you will only be able to use Pro features on
						publicly-hosted repos.
					</p>
					${this.renderUpgradeActions()}`;break}case te.TrialExpired:e=ek`<p>
						Your Pro trial has ended. You can now only use Pro features on publicly-hosted repos.
					</p>
					${this.renderUpgradeActions(ek`<p>Please upgrade for full access to all GitLens Pro features:</p>`)}`;break;case te.TrialReactivationEligible:e=ek`<p>
						Reactivate your Pro trial and experience all the new Pro features — free for another
						${rg("day",14)}!
					</p>
					<div class="actions center">
						<gl-button
							density="tight"
							href="${nM("gitlens.plus.reactivateProTrial",this.source)}"
							tooltip="Reactivate your Pro trial for another ${rg("day",14)}"
							>Reactivate Pro Trial</gl-button
						>
					</div>`;break;default:e=ek`<p>
						You only have access to
						<gl-tooltip hoist content="Pro features that do not require an account"
							><span class="hint">local</span></gl-tooltip
						>
						Pro features on publicly-hosted repos.
					</p>
					${this.renderStartTrialActions()}`}return ek`<div class="popup-content">${e}</div>`}renderStartTrialActions(){return ek`<div class="actions">
			<p>For access to all Pro features:</p>
			<gl-button density="tight" href="${nM("gitlens.plus.signUp",this.source)}"
				>Start ${14}-day Pro Trial</gl-button
			>
			&nbsp;or
			<a href="${nM("gitlens.plus.login",this.source)}" title="Sign In">sign in</a>
		</div>`}renderUpgradeActions(e){return ek`<div class="actions">
			${e??eC}
			<gl-button
				density="tight"
				href="${nM("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-badge"}})}"
				>Upgrade to Pro</gl-button
			>
			${this.renderPromo()}
		</div>`}renderPromo(){return ek`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"badge")}
			.source=${this.source}
		></gl-promo>`}};nX.styles=[nC,nS,M`
			:host {
				/* position: relative; */
				display: inline-block;
				--gl-feature-badge-color: currentColor;
				--gl-feature-badge-border-color: var(--color-foreground--50);
				--max-width: 40rem;
			}

			a {
				color: var(--color-link);
				text-decoration: underline;
			}

			.badge {
				color: var(--gl-feature-badge-color, currentColor);
				cursor: help;
				font-size: var(--gl-feature-badge-font-size, x-small);
				font-variant: all-small-caps;
				font-weight: 600;
				border: 1px solid var(--gl-feature-badge-border-color, var(--color-foreground--50));
				border-radius: 1rem;
				padding: 0 0.8rem 0.1rem 0.8rem;
				white-space: nowrap;
			}

			.badge:focus-visible {
				${D(ng)}
			}

			.badge-icon {
				font-weight: 400;
				margin-left: 0.4rem;
				white-space: nowrap;
			}

			.badge-popup {
				display: flex;
				flex-direction: column;
				white-space: normal;
				gap: 0.6rem;
			}

			.popup-header {
				display: flex;
				flex-direction: column;
				margin-bottom: 0.4rem;
			}

			.popup-title {
				font-size: 1.3rem;
				font-weight: 600;
			}

			.popup-subtitle {
				font-size: smaller;
				margin-top: 0.6rem;
			}

			.popup-content {
				display: flex;
				flex-direction: column;
				border-top: 1px solid var(--color-foreground--25);
				padding-top: 0.6rem;
			}

			.popup-content p {
				margin: 0;
			}

			.popup-content .actions {
				margin-top: 0.8rem;
				margin-bottom: 0.6rem;
			}

			.popup-content .actions:first-child {
				margin-bottom: 0.8rem;
			}

			.popup-content .actions :not(:first-child) {
				margin-top: 0.4rem;
			}

			.popup-content .actions gl-button:not(:first-child) {
				margin-top: 0.8rem;
			}

			.hint {
				border-bottom: 1px dashed currentColor;
			}
		`],nY([eL({type:Boolean})],nX.prototype,"cloud",2),nY([eL({reflect:!0})],nX.prototype,"placement",2),nY([eL({type:Boolean})],nX.prototype,"preview",2),nY([td({context:"promos"})],nX.prototype,"promos",2),nY([eL({type:Object})],nX.prototype,"source",2),nY([eL({attribute:!1})],nX.prototype,"subscription",2),nX=nY([eD("gl-feature-badge")],nX);var nJ=((m=nJ||{}).AngleBracketLeftHeavy="❰",m.AngleBracketRightHeavy="❱",m.ArrowBack="↩",m.ArrowDown="↓",m.ArrowDownUp="⇵",m.ArrowDropRight="⤷",m.ArrowHeadRight="➤",m.ArrowLeft="←",m.ArrowLeftDouble="⇐",m.ArrowLeftRight="↔",m.ArrowLeftRightDouble="⇔",m.ArrowLeftRightDoubleStrike="⇎",m.ArrowLeftRightLong="⟷",m.ArrowRight="→",m.ArrowRightDouble="⇒",m.ArrowRightHollow="⇨",m.ArrowUp="↑",m.ArrowUpDown="⇅",m.ArrowUpRight="↗",m.ArrowsHalfLeftRight="⇋",m.ArrowsHalfRightLeft="⇌",m.ArrowsLeftRight="⇆",m.ArrowsRightLeft="⇄",m.Asterisk="∗",m.Bullseye="◎",m.Check="✔",m.Dash="—",m.Dot="•",m.Ellipsis="…",m.EnDash="–",m.Envelope="✉",m.EqualsTriple="≡",m.Flag="⚑",m.FlagHollow="⚐",m.MiddleEllipsis="⋯",m.MuchLessThan="≪",m.MuchGreaterThan="≫",m.Pencil="✎",m.Space=" ",m.SpaceThin=" ",m.SpaceThinnest=" ",m.SquareWithBottomShadow="❏",m.SquareWithTopShadow="❐",m.Warning="⚠",m.ZeroWidthSpace="​",m);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var nQ=((v=nQ||{}).File="file",v.Git="git",v.GitHub="github",v.GitLens="gitlens",v.GitLensAIMarkdown="gitlens-ai-markdown",v.PRs="pr",v.Remote="vscode-remote",v.Vsls="vsls",v.VslsScc="vsls-scc",v.Virtual="vscode-vfs",v);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let n0="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",n1=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${n0}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${n0}`,graph:`https://gitkraken.com/solutions/commit-graph?${n0}`,launchpad:`https://gitkraken.com/solutions/launchpad?${n0}`,platform:`https://gitkraken.com/devex?${n0}`,pricing:`https://gitkraken.com/gitlens/pricing?${n0}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${n0}`,security:`https://help.gitkraken.com/gitlens/security?${n0}`,workspaces:`https://gitkraken.com/solutions/workspaces?${n0}`,cli:`https://gitkraken.com/cli?${n0}`,browserExtension:`https://gitkraken.com/browser-extension?${n0}`,desktop:`https://gitkraken.com/git-client?${n0}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${n0}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${n0}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${n0}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${n0}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${n0}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${n0}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${n0}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${n0}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${n0}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${n0}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${n0}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${n0}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${n0}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${n0}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${n0}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${n0}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${n0}`});var n2=Object.defineProperty,n5=Object.getOwnPropertyDescriptor,n4=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?n5(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&n2(t,r,s),s};let n6=class extends lit_element_i{firstUpdated(){"alert"===this.appearance&&queueMicrotask(()=>this.button.focus())}render(){let e=null==this.state;if(this.hidden=e,e)return;let t=(this.appearance??"alert")==="alert"?"alert":void 0;switch(this.state){case te.VerificationRequired:return ek`
					<slot name="feature"></slot>
					<p class="actions">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${nM("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${nM("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</p>
					<p>You must verify your email before you can continue.</p>
				`;case te.Community:if(this.featurePreview&&"expired"!==function(e){let t=e?.usages;if(!t?.length)return"eligible";let r=(new Date(t.at(-1).expiresOn).getTime()-Date.now())/36e5;return t.length<=3&&r>0&&r<24?"active":"expired"}(this.featurePreview))return ek`${this.renderFeaturePreview(this.featurePreview)}`;return ek`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${n1.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${nM("gitlens.plus.signUp",this.source)}"
							>&nbsp;Try GitLens Pro&nbsp;</gl-button
						><span
							>or
							<a href="${nM("gitlens.plus.login",this.source)}" title="Sign In"
								>sign in</a
							></span
						>
					</p>
					<p>
						Get ${rg("day",14)} of
						<a href="${n1.communityVsPro}">GitLens Pro</a> for free — no credit card required.
					</p>`;case te.TrialExpired:return ek`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${n1.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${nM("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-gate"}})}"
							>Upgrade to Pro</gl-button
						>
					</p>
					<p>${this.renderPromo()}</p>`;case te.TrialReactivationEligible:return ek`<slot name="feature"></slot>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${t??eC}"
							href="${nM("gitlens.plus.reactivateProTrial",this.source)}"
							>Continue</gl-button
						>
					</p>
					<p>
						Reactivate your GitLens Pro trial and experience
						${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} and `:""}all the new
						Pro features — free for another ${rg("day",14)}!
					</p> `}}renderFeaturePreview(e){let t=(this.appearance??"alert")==="alert"?"alert":void 0,r=e.usages.length;return 0===r?ek`<slot name="feature"></slot>
				<gl-button appearance="${t??eC}" href="${this.featurePreviewCommandLink??eC}"
					>Continue</gl-button
				>
				<p>
					Continue to preview
					${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
					repos, or
					<a href="${nM("gitlens.plus.login",this.source)}" title="Sign In">sign in</a
					>.<br />
					${"alert"!==t?ek`<br />`:""} For full access to all GitLens Pro features,
					<a href="${nM("gitlens.plus.signUp",this.source)}"
						>start your free ${14}-day Pro trial</a
					>
					— no credit card required.
				</p> `:ek`
			${this.renderFeaturePreviewStep(e,r)}
			<p class="actions-row">
				<gl-button
					class="inline"
					appearance="${t??eC}"
					href="${this.featurePreviewCommandLink??eC}"
					>Continue Preview</gl-button
				><span
					>or
					<a href="${nM("gitlens.plus.login",this.source)}" title="Sign In"
						>sign in</a
					></span
				>
			</p>
			<p>
				After continuing, you will have ${rg("day",3-r,{infix:" more "})} to preview
				${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
				repos.<br />
				${"alert"!==t?ek`<br />`:""} For full access to all GitLens Pro features,
				<a href="${nM("gitlens.plus.signUp",this.source)}"
					>start your free ${14}-day Pro trial</a
				>
				— no credit card required.
			</p>
		`}renderFeaturePreviewStep(e,t){if("graph"!==e.feature)return ek`<slot name="feature"></slot>`;switch(t){case 1:return ek`<p>Try Commit Search</p>
							<p>
								Search for commits in your repo by author, commit message, SHA, file, change, or type.
								Turn on the commit filter to show only commits that match your query.
							</p>
							<p>
								<img
									src="${this.webroot??""}/media/graph-commit-search.webp"
									style="width:100%"
									alt="Graph Commit Search"
								/>
							</p> `;case 2:return ek`
							<p>Try the Graph Minimap</p>
							<p>
								Visualize the amount of changes to a repository over time, and inspect specific points
								in the history to locate branches, stashes, tags and pull requests.
							</p>
							<p>
								<img
									src="${this.webroot??""}/media/graph-minimap.webp"
									style="width:100%"
									alt="Graph Minimap"
								/>
							</p>
						`;default:return ek`<slot name="feature"></slot>`}}renderPromo(){return ek`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"gate")}
			.source=${this.source}
		></gl-promo>`}};n6.styles=[M`
			:host {
				--gk-action-radius: 0.3rem;

				--link-foreground: var(--vscode-textLink-foreground);
				--link-foreground-active: var(--vscode-textLink-activeForeground);
			}

			:host([appearance='alert']) {
				--link-decoration-default: underline;
				--link-foreground: color-mix(in srgb, var(--section-foreground) 50%, var(--vscode-textLink-foreground));
				--link-foreground-active: color-mix(
					in srgb,
					var(--section-foreground) 50%,
					var(--vscode-textLink-activeForeground)
				);
			}

			:host([appearance='default']) gl-button:only-child {
				width: 100%;
				max-width: 300px;
			}

			@container (max-width: 600px) {
				:host([appearance='default']) gl-button:not(.inline) {
					display: block;
					margin-left: auto;
					margin-right: auto;
				}
			}

			:host([appearance='alert']) gl-button:not(.inline) {
				display: block;
				margin-left: auto;
				margin-right: auto;
			}

			:host-context([appearance='alert']) p:first-child {
				margin-top: 0;
			}

			:host-context([appearance='alert']) p:last-child {
				margin-bottom: 0;
			}

			.actions {
				text-align: center;
			}

			.actions-row {
				display: flex;
				gap: 0.6em;
				align-items: baseline;
				justify-content: center;
				white-space: nowrap;
			}

			.hint {
				border-bottom: 1px dashed currentColor;
			}
		`,oF],n4([eB("gl-button")],n6.prototype,"button",2),n4([eL()],n6.prototype,"appearance",2),n4([eL({type:Object})],n6.prototype,"featurePreview",2),n4([eL()],n6.prototype,"featurePreviewCommandLink",2),n4([eL()],n6.prototype,"featureRestriction",2),n4([eL()],n6.prototype,"featureWithArticleIfNeeded",2),n4([td({context:"promos"})],n6.prototype,"promos",2),n4([eL({type:Object})],n6.prototype,"source",2),n4([eL({attribute:!1,type:Number})],n6.prototype,"state",2),n4([eL()],n6.prototype,"webroot",2),n6=n4([eD("gl-feature-gate-plus-state")],n6);var n3=Object.defineProperty,n8=Object.getOwnPropertyDescriptor,n7=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?n8(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&n3(t,r,s),s};let n9=class extends lit_element_i{render(){var e;if(this.hidden||null!=(e=this.state)&&(e===te.Trial||e===te.Paid))return;let t=this.appearance??(document.body.getAttribute("data-placement")??"editor")==="editor"?"alert":"default";return ek`
			<section>
				<slot></slot>
				<gl-feature-gate-plus-state
					appearance=${t}
					.featurePreview=${this.featurePreview}
					.featurePreviewCommandLink=${this.featurePreviewCommandLink}
					.featureRestriction=${this.featureRestriction}
					.featureWithArticleIfNeeded=${this.featureWithArticleIfNeeded}
					.source=${this.source}
					.state=${this.state}
					.webroot=${this.webroot}
				>
					<slot name="feature" slot="feature"></slot>
				</gl-feature-gate-plus-state>
			</section>
		`}};n9.styles=[oF,M`
			:host {
				--background: var(--vscode-sideBar-background);
				--foreground: var(--vscode-sideBar-foreground);

				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				overflow: auto;
				z-index: 100;

				box-sizing: border-box;
			}

			:host-context(body[data-placement='editor']),
			:host([appearance='alert']) {
				--background: transparent;
				--foreground: var(--vscode-editor-foreground);

				backdrop-filter: blur(3px) saturate(0.8);
				padding: 0 2rem;
			}

			::slotted(p) {
				margin: revert !important;
			}

			::slotted(p:first-child) {
				margin-top: 0 !important;
			}

			section {
				--section-foreground: var(--foreground);
				--section-background: var(--background);
				--section-border-color: transparent;

				--link-foreground: var(--vscode-textLink-foreground);
				--link-foreground-active: var(--vscode-textLink-activeForeground);

				display: flex;
				flex-direction: column;
				padding: 0 2rem 1.3rem 2rem;
				background: var(--section-background);
				color: var(--section-foreground);
				border: 1px solid var(--section-border-color);

				height: min-content;
			}

			:host-context(body[data-placement='editor']) section,
			:host([appearance='alert']) section {
				--section-foreground: var(--color-alert-infoForeground);
				--section-background: var(--color-alert-infoBackground);
				--section-border-color: var(--color-alert-infoBorder);

				--link-decoration-default: underline;
				--link-foreground: color-mix(in srgb, var(--section-foreground) 50%, var(--vscode-textLink-foreground));
				--link-foreground-active: color-mix(
					in srgb,
					var(--section-foreground) 50%,
					var(--vscode-textLink-activeForeground)
				);

				border-radius: 0.3rem;
				max-width: 600px;
				max-height: min-content;
				margin: 0.2rem auto;
				padding: 1.3rem;
			}

			:host-context(body[data-placement='editor']) section ::slotted(gl-button),
			:host([appearance='alert']) section ::slotted(gl-button) {
				display: block;
				margin-left: auto;
				margin-right: auto;
			}
		`],n7([eL({reflect:!0})],n9.prototype,"appearance",2),n7([eL({type:Object})],n9.prototype,"featurePreview",2),n7([eL({type:String})],n9.prototype,"featurePreviewCommandLink",2),n7([eL()],n9.prototype,"featureRestriction",2),n7([eL()],n9.prototype,"featureWithArticleIfNeeded",2),n7([eL({type:Object})],n9.prototype,"source",2),n7([eL({attribute:!1,type:Number})],n9.prototype,"state",2),n7([eL({type:String})],n9.prototype,"webroot",2),n9=n7([eD("gl-feature-gate")],n9);var ae=Object.defineProperty,at=Object.getOwnPropertyDescriptor;let ar=class extends lit_element_i{render(){return ek`<slot></slot>`}};ar.styles=[nC,M`
			:host {
				display: block;
				text-transform: uppercase;
				font-size: 0.84em;
				line-height: 2.2rem;
				padding-left: 0.6rem;
				padding-right: 0.6rem;
				margin: 0px;
				color: var(--vscode-menu-foreground);
				opacity: 0.6;
				user-select: none;
				-webkit-font-smoothing: auto;
			}
		`],ar=((e,t,r,o)=>{for(var i,s=o>1?void 0:o?at(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&ae(t,r,s),s})([eD("menu-label")],ar);var ao=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,as=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ai(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&ao(t,r,s),s};let an=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return ek`<div class="progress-bar"></div>`}};an.styles=M`
		* {
			box-sizing: border-box;
		}

		:host {
			position: absolute;
			left: 0;
			z-index: 5;
			height: 2px;
			width: 100%;
			overflow: hidden;
		}

		:host([position='bottom']) {
			bottom: 0;
		}

		:host([position='top']) {
			top: 0;
		}

		.progress-bar {
			background-color: var(--vscode-progressBar-background);
			display: none;
			position: absolute;
			left: 0;
			width: 2%;
			height: 2px;
		}

		:host([active]:not([active='false'])) .progress-bar {
			display: inherit;
		}

		:host([mode='discrete']) .progress-bar {
			left: 0;
			transition: width 0.1s linear;
		}

		:host([mode='discrete done']) .progress-bar {
			width: 100%;
		}

		:host([mode='infinite']) .progress-bar {
			animation-name: progress;
			animation-duration: 4s;
			animation-iteration-count: infinite;
			animation-timing-function: steps(100);
			transform: translateZ(0);
		}

		@keyframes progress {
			0% {
				transform: translateX(0) scaleX(1);
			}

			50% {
				transform: translateX(2500%) scaleX(3);
			}

			to {
				transform: translateX(4900%) scaleX(1);
			}
		}
	`,as([eL({reflect:!0})],an.prototype,"mode",2),as([eL({type:Boolean})],an.prototype,"active",2),as([eL()],an.prototype,"position",2),an=as([eD("progress-indicator")],an);let aa=M`
	:host {
		box-sizing: border-box;
		display: flex;
		align-items: center;

		max-width: 100%;
		min-width: 4.6rem;
	}

	* {
		box-sizing: border-box;
	}
`,al=M`
	code-icon.picker-icon {
		font-size: 1rem;
		/* margin-top: 0.4rem; */
		margin-right: -0.25rem;
	}

	code-icon.picker-icon::before {
		margin-left: -0.4rem;
	}
`,ac=M`
	.truncated-button {
		max-width: 100%;
		min-width: 4rem;
	}
	gl-button[disabled] {
		opacity: 1;
		cursor: default;
	}
	.truncated-button__label {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;var ah=Object.defineProperty,ad=Object.getOwnPropertyDescriptor,ap=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ad(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&ah(t,r,s),s};let au=class extends lit_element_i{constructor(){super(...arguments),this.icon=!1,this.size=13,this.worktree=!1}render(){let e,t;if(null==this.ref)return eC;switch(this.ref.refType){case"branch":e=this.worktree?"worktree":"branch",t=this.worktree?"gl-worktree":"git-branch";break;case"tag":e="tag",t="tag";break;default:e="revision",t="git-commit"}return ek`${this.icon?ek`<code-icon
						class="icon${e?` ${e}`:""}"
						icon="${t}"
						size="${this.size}"
					></code-icon>`:eC}<span class="label">${this.ref.name}</span>`}};au.styles=M`
		:host {
			box-sizing: border-box;
			display: flex;
			align-content: center;

			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			gap: 0.4rem;
		}

		* {
			box-sizing: border-box;
		}

		.icon.tag,
		.icon.worktree {
			margin-right: 0.1rem;
		}

		.label {
			min-width: 2.4rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: var(--font-weight, bold);
		}
	`,ap([eL({type:Boolean,reflect:!0})],au.prototype,"icon",2),ap([eL({type:Object})],au.prototype,"ref",2),ap([eL({type:Number})],au.prototype,"size",2),ap([eL({type:Boolean})],au.prototype,"worktree",2),au=ap([eD("gl-ref-name")],au);var af=Object.defineProperty,ab=Object.getOwnPropertyDescriptor,ag=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ab(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&af(t,r,s),s};let am=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.icon=!1,this.size=16,this.worktree=!1}render(){return ek`<gl-button appearance="toolbar" href=${this.href??eC} ?disabled=${this.disabled}
			>${null==this.ref?ek`<slot name="empty">&lt;missing&gt;</slot>`:ek`<gl-ref-name
						part="label"
						?icon=${this.icon}
						.ref=${this.ref}
						.size=${this.size}
						?worktree=${this.worktree}
					></gl-ref-name>`}<code-icon
				slot="suffix"
				class="picker-icon"
				icon="chevron-down"
				size="10"
			></code-icon
			><slot name="tooltip" slot="tooltip"></slot
		></gl-button>`}};am.styles=[aa,M`
			:host {
				--font-weight: normal;
			}

			gl-button {
				max-width: 100%;
			}

			gl-ref-name:not([icon]) {
				padding-left: 0.2rem;
			}
		`,al],ag([eL({type:Boolean,reflect:!0})],am.prototype,"disabled",2),ag([eL({type:String,reflect:!0})],am.prototype,"href",2),ag([eL({type:Boolean,reflect:!0})],am.prototype,"icon",2),ag([eL({type:Object})],am.prototype,"ref",2),ag([eL({type:Number})],am.prototype,"size",2),ag([eL({type:Boolean})],am.prototype,"worktree",2),am=ag([eD("gl-ref-button")],am);let av=M`
	/*
	:host {
		display: inline-block;
	}
    */

	.indicator {
		box-sizing: border-box;
		display: inline-block;
		border-radius: calc(var(--gl-indicator-size, 0.8rem) * 2);
		width: var(--gl-indicator-size, 0.8rem);
		aspect-ratio: 1;
		background-color: var(--gl-indicator-color);
		vertical-align: text-bottom;
	}
`,ay=M`
	.indicator--pulse {
		animation: 1.5s ease 0s infinite normal none running pulse;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 var(--gl-indicator-pulse-color);
		}
		70% {
			box-shadow: 0 0 0 var(--gl-indicator-size, 0.8rem) transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}
`;var aw=Object.defineProperty,ax=Object.getOwnPropertyDescriptor,ak=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?ax(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&aw(t,r,s),s};let a_=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return ek`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};a_.styles=[av,ay],ak([eL({type:Boolean})],a_.prototype,"pulse",2),a_=ak([eD("gl-indicator")],a_);var a$=Object.defineProperty,aC=Object.getOwnPropertyDescriptor,aS=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?aC(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&a$(t,r,s),s};let aP=class extends GlElement{constructor(){super(...arguments),this.connectIcon=!0,this.disabled=!1,this.icon=!0,this.hasMultipleRepositories=!1,this.expandable=!1}get icons(){if(this.repository?.provider===void 0)return;let e=0;if(this.icon&&e++,this.connectIcon&&this.repository.provider.integration?.connected===!1&&e++,0!==e)return e}get displayName(){return this.repository?.name??"none selected"}render(){return ek`
			${this.renderProviderIcon()}
			<gl-button
				class="truncated-button"
				appearance="toolbar"
				?disabled=${this.disabled}
				@click=${e=>this.emit("gl-click",{event:e,part:"label",repository:this.repository})}
			>
				<span class="truncated-button__label">${this.displayName}</span>
				${this.hasMultipleRepositories?ek`<code-icon
							slot="suffix"
							class="picker-icon"
							icon="chevron-down"
							aria-hidden="true"
						></code-icon>`:eC}
				<slot name="tooltip" slot="tooltip">${this.displayName}</slot>
			</gl-button>
		`}renderProviderIcon(){var e,t,r;if(!this.icon)return eC;let{repository:o}=this;if(!o?.provider)return ek`
				<gl-button part="provider-icon" appearance="toolbar" ?disabled=${!0}>
					<code-icon icon="gl-repository" aria-hidden="true"></code-icon>
				</gl-button>
			`;let{provider:i}=o,s=i.integration?.connected;return ek`<gl-popover placement="bottom" trigger="hover click focus">
				<gl-button
					slot="anchor"
					part="provider-icon"
					appearance="toolbar"
					href=${i.url??eC}
					aria-label=${`Open Repository on ${i.name}`}
					@click=${e=>this.emit("gl-click",{event:e,part:"icon",repository:this.repository})}
				>
					<code-icon
						icon=${"cloud"===i.icon?"cloud":`gl-provider-${i.icon}`}
						aria-hidden="true"
					></code-icon>
					${e=()=>ek`<gl-indicator class="indicator-dot"></gl-indicator>`,s?e(s):void 0}
				</gl-button>
				<span slot="content">
					Open Repository on ${i.name}
					<hr />
					${t=()=>ek`
							<span>
								<code-icon style="margin-top: -3px" icon="check" aria-hidden="true"></code-icon>
								Connected to ${i.name}
							</span>
						`,r=()=>!1!==s?eC:ek`
								<code-icon style="margin-top: -3px" icon="plug" aria-hidden="true"></code-icon>
								<a
									href=${nM("gitlens.connectRemoteProvider",{repoPath:o.path,remote:i.bestRemoteName})}
								>
									Connect to ${o.provider.name}
								</a>
								<span>&mdash; not connected</span>
							`,s?t(s):r?.(s)}
				</span>
			</gl-popover>
			${this.renderConnectIcon()}`}renderConnectIcon(){if(!this.connectIcon)return eC;let{repository:e}=this;if(!e?.provider)return eC;let{provider:t}=e;return t.integration?.connected!==!1?eC:ek`
			<gl-button
				part="connect-icon"
				appearance="toolbar"
				href=${nM("gitlens.connectRemoteProvider",{repoPath:e.path,remote:t.bestRemoteName})}
			>
				<code-icon icon="plug" style="color: var(--titlebar-fg)"></code-icon>
				<span slot="tooltip">
					Connect to ${t.name}
					<hr />
					View pull requests and issues in Home, Commit Graph, Launchpad, autolinks, and more
				</span>
			</gl-button>
		`}};aP.styles=[oF,oj,aa,ac,M`
			:host([icons='1']:not([expandable])) {
				min-width: 7rem;
			}

			:host([icons='1'][expandable]) {
				min-width: 0;
			}

			:host([icons='2']:not([expandable])) {
				min-width: 9.4rem;
			}

			:host([icons='2'][expandable]) {
				min-width: 5.6rem;
			}

			.indicator-dot {
				--gl-indicator-color: green;
				--gl-indicator-size: 0.4rem;
				margin-left: -0.2rem;
			}

			/* :host([expandable]) .truncated-button {
				transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
			} */

			:host([expandable]:not(:hover, :focus-within)) .truncated-button .picker-icon::before {
				visibility: hidden;
			}
			:host([expandable]:not(:hover, :focus-within)) .truncated-button {
				min-width: 0;
				max-width: 0;
			}
		`,al],aS([eL({type:Boolean})],aP.prototype,"connectIcon",2),aS([eL({type:Boolean})],aP.prototype,"disabled",2),aS([eL({type:Boolean})],aP.prototype,"icon",2),aS([eL({type:Object})],aP.prototype,"repository",2),aS([eL({type:Boolean})],aP.prototype,"hasMultipleRepositories",2),aS([eL({type:Object})],aP.prototype,"source",2),aS([eL({type:Boolean,reflect:!0})],aP.prototype,"expandable",2),aS([eL({type:Number,reflect:!0})],aP.prototype,"icons",1),aP=aS([eD("gl-repo-button-group")],aP);var aA=Object.defineProperty,aE=Object.getOwnPropertyDescriptor,aO=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?aE(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&aA(t,r,s),s};let aT=class extends GlAppHost{constructor(){super(...arguments),this._loading=!1,this.onChooseBaseRef=async e=>{if(e.target.disabled)return;let t=await this._ipc.sendRequest(ti,{scope:this.scope,type:"base"});t?.ref!=null&&this._ipc.sendCommand(tl,{scope:this.scope,changes:{base:t.ref}})},this.onChooseHeadRef=async e=>{if(e.target.disabled)return;let t=e.target.getAttribute("location"),r=await this._ipc.sendRequest(ti,{scope:this.scope,type:"head"});if(r?.ref===null){this.config.showAllBranches||this._ipc.sendCommand(ta,{changes:{showAllBranches:!0}});return}if(r?.ref!=null){if("config"===t)return void this._ipc.sendCommand(tl,{scope:this.scope,changes:{head:r.ref,base:this.config.showAllBranches?null:void 0}});this._ipc.sendCommand(tl,{scope:this.scope,changes:{head:r.ref,base:null}}),this.config.showAllBranches&&this._ipc.sendCommand(ta,{changes:{showAllBranches:!1}})}},this.onChoosePath=async e=>{if(e.stopImmediatePropagation(),null==this.repository||null==this.scope)return;let t=await this._ipc.sendRequest(ts,{repoUri:this.repository.uri,ref:this.head,title:"Select a File or Folder to Visualize",initialPath:"file"===this.scope.type?(0,e0.dirname)(this.scope.relativePath):this.scope.relativePath});t?.picked!=null&&this._ipc.sendCommand(tl,{scope:this.scope,changes:{type:t.picked.type,relativePath:t.picked.relativePath},altOrShift:e.altKey||e.shiftKey})},this.onChangeScope=e=>{let t=e.target?.closest("gl-breadcrumb-item-child")??e.target?.closest("gl-breadcrumb-item"),r=t?.getAttribute("type");if(null==r)return;if("repo"===r)return void this._ipc.sendCommand(tl,{scope:this.scope,changes:{type:"repo"},altOrShift:e.altKey||e.shiftKey});let o=t?.getAttribute("value");null!=o&&this._ipc.sendCommand(tl,{scope:this.scope,changes:{type:r,relativePath:o},altOrShift:e.altKey||e.shiftKey})}}createStateProvider(e,t,r){return new TimelineStateProvider(this,e,t,r)}connectedCallback(){super.connectedCallback?.(),eX=this.state.config.abbreviatedShaLength}get allowed(){return this.state.access?.allowed??!1}get base(){return this.scope?.base??this.repository?.ref}get config(){return this.state.config}get head(){return this.scope?.head??this.repository?.ref}get repository(){return this.state.repository}get scope(){return this.state.scope}get isShowAllBranchesSupported(){return!this.repository?.virtual}get isSliceBySupported(){return!this.repository?.virtual&&(this.scope?.type==="file"||this.scope?.type==="folder")}get sliceBy(){return this.isSliceBySupported&&this.config.showAllBranches?this.config.sliceBy:"author"}get subscription(){return this.state.access?.subscription?.current}renderGate(){return"editor"===this.placement?ek`<gl-feature-gate
				?hidden=${!1!==this.allowed}
				featureRestriction="private-repos"
				.source=${{source:"timeline",detail:"gate"}}
				.state=${this.subscription?.state}
				><p slot="feature">
					<a href="https://help.gitkraken.com/gitlens/gitlens-features/#visual-file-history-pro"
						>Visual History</a
					>
					<gl-feature-badge></gl-feature-badge>
					&mdash; visualize the evolution of a repository, branch, folder, or file and identify when the most
					impactful changes were made and by whom. Quickly see unmerged changes in files or folders, when
					slicing by branch.
				</p></gl-feature-gate
			>`:ek`<gl-feature-gate
			?hidden=${!1!==this.allowed}
			featureRestriction="private-repos"
			.source=${{source:"timeline",detail:"gate"}}
			.state=${this.subscription?.state}
			><p slot="feature">
				<a href="https://help.gitkraken.com/gitlens/gitlens-features/#visual-file-history-pro"
					>Visual File History</a
				>
				<gl-feature-badge></gl-feature-badge>
				&mdash; visualize the evolution of a file and quickly identify when the most impactful changes were made
				and by whom. Quickly see unmerged changes in files or folders, when slicing by branch.
			</p></gl-feature-gate
		>`}render(){return ek`${this.renderGate()}
			<div class="container">
				<progress-indicator ?active=${this._loading}></progress-indicator>
				<header class="header" ?hidden=${!this.scope}>
					<span class="details">${this.renderBreadcrumbs()} ${this.renderTimeframe()}</span>
					<span class="toolbox">
						${this.renderConfigPopover()}
						${"view"===this.placement?ek`<gl-button
									appearance="toolbar"
									href="command:gitlens.views.timeline.openInTab"
									tooltip="Open in Editor"
									aria-label="Open in Editor"
								>
									<code-icon icon="link-external"></code-icon>
								</gl-button>`:eC}
						${null==this.subscription||!tr(this.subscription)?ek`<gl-feature-badge
									placement="bottom"
									.source=${{source:"timeline",detail:"badge"}}
									.subscription=${this.subscription}
								></gl-feature-badge>`:eC}
					</span>
				</header>

				<main class="timeline">${this.renderChart()}</main>
			</div> `}renderBreadcrumbs(){return ek`<gl-breadcrumbs>
			${this.renderRepositoryBreadcrumbItem()}
			${this.renderBranchBreadcrumbItem()}${this.renderBreadcrumbPathItems()}
			${"editor"===this.placement?ek`<gl-button
						appearance="toolbar"
						density="compact"
						@click=${this.onChoosePath}
						tooltip="Choose File or Folder to Visualize..."
						aria-label="Choose File or Folder to Visualize..."
						><code-icon slot="prefix" icon="folder-opened"></code-icon>Choose File / Folder...</gl-button
					>`:eC}
		</gl-breadcrumbs>`}renderRepositoryBreadcrumbItem(){let e=this.state.repository;return null==e?eC:ek`<gl-breadcrumb-item
			collapsibleState="${this.state.scope?.relativePath?"collapsed":"expanded"}"
			icon="gl-repository"
			shrink="10000000"
			type="repo"
		>
			<gl-repo-button-group
				aria-label="Visualize Repository History"
				.connectIcon=${!1}
				.hasMultipleRepositories=${this.state.repositories.openCount>1}
				.icon=${!1}
				.repository=${e}
				.source=${{source:"timeline"}}
				@gl-click=${this.onChangeScope}
				><span slot="tooltip">
					Visualize Repository History
					<hr />
					${e.name}
				</span></gl-repo-button-group
			>
		</gl-breadcrumb-item>`}renderBranchBreadcrumbItem(){let{head:e,config:{showAllBranches:t}}=this;return ek`<gl-breadcrumb-item
			collapsibleState="expanded"
			icon="${t?"git-branch":function(e){switch(e?.refType){case"branch":return"git-branch";case"tag":return"tag";default:return"git-commit"}}(e)}"
			shrink="100000"
			type="ref"
		>
			<gl-ref-button .ref=${t?void 0:e} @click=${this.onChooseHeadRef}
				><span slot="empty">All Branches</span
				><span slot="tooltip"
					>Change Reference...
					<hr />
					${t?"Showing All Branches":ek`<gl-ref-name icon .ref=${e}></gl-ref-name>`}</span
				></gl-ref-button
			>
		</gl-breadcrumb-item>`}renderBreadcrumbPathItems(){let e=this.state.scope?.relativePath;if(!e)return eC;let t=[],r=e.split("/"),o=r.pop()||"",i=r.length;if(i){let e=r.shift(),o=e,i=ek`
				<gl-breadcrumb-item
					collapsibleState="expanded"
					icon="folder"
					type="${"folder"}"
					value="${e}"
				>
					<gl-button
						appearance="toolbar"
						@click=${this.onChangeScope}
						aria-label="Visualize folder history of ${e}"
						>${e}<span slot="tooltip"
							>Visualize Folder History
							<hr />
							${e}</span
						></gl-button
					>

					${r.length?ek`<span slot="children" class="breadcrumb-item-children">
								${r.map(e=>(o=`${o}/${e}`,ek`<gl-breadcrumb-item-child
										type="${"folder"}"
										value="${o}"
									>
										<gl-button
											appearance="toolbar"
											@click=${this.onChangeScope}
											aria-label="Visualize folder history of ${o}"
											>${e}<span slot="tooltip"
												>Visualize Folder History
												<hr />
												${o}</span
											></gl-button
										>
									</gl-breadcrumb-item-child>`))}
							</span>`:eC}
				</gl-breadcrumb-item>
			`;t.push(i)}return t.push(ek`
			<gl-breadcrumb-item
				collapsibleState="none"
				icon="${(this.scope?.type==="folder"?i?void 0:"folder":"file")??eC}"
				shrink="0"
				tooltip="${e}"
				type="${this.scope?.type==="folder"?"folder":"file"}"
				value="${e}"
			>
				<gl-copy-container
					tabindex="0"
					copyLabel="Copy Path&#10;&#10;${e}"
					.content=${e}
					placement="bottom"
				>
					<span>${o}</span>
				</gl-copy-container>
			</gl-breadcrumb-item>
		`),t}renderChart(){return this.scope||"view"!==this.placement?ek`<gl-timeline-chart
			id="chart"
			placement="${this.placement}"
			dateFormat="${this.state.config.dateFormat}"
			.dataPromise=${this.state.dataset}
			head="${this.head?.ref??"HEAD"}"
			.scope=${this.scope}
			shortDateFormat="${this.state.config.shortDateFormat}"
			sliceBy="${this.sliceBy}"
			@gl-commit-select=${this.onChartCommitSelected}
			@gl-loading=${e=>{this._loading=!0,e.detail.finally(()=>this._loading=!1)}}
		>
			<div slot="empty">
				${null==this.scope?ek`<p>Something went wrong</p>
							<p>Please close this tab and try again</p>`:ek`<p>No commits found for the specified time period</p>
							${this.renderPeriodSelect(this.state.config.period)}`}
			</div>
		</gl-timeline-chart>`:ek`<div class="timeline__empty">
				<p>There are no editors open that can provide file history information.</p>
			</div>`}renderConfigPopover(){let{config:{period:e}}=this;return ek`<gl-popover class="config" placement="bottom" trigger="hover focus click" hoist>
			<gl-button slot="anchor" appearance="toolbar">
				<code-icon icon="settings"></code-icon>
			</gl-button>
			<div slot="content" class="config__content">
				<menu-label>View Options</menu-label>
				${this.renderConfigHead()} ${this.renderConfigBase()} ${this.renderConfigShowAllBranches()}
				${this.renderPeriodSelect(e)} ${this.renderConfigSliceBy()}
			</div>
		</gl-popover>`}renderConfigHead(){let{head:e}=this,t=this.config.showAllBranches&&"branch"!==this.sliceBy;return ek`<section>
			<label for="head" ?disabled=${t}>Branch</label>
			<gl-ref-button
				name="head"
				?disabled=${t}
				icon
				.ref=${e}
				location="config"
				@click=${this.onChooseHeadRef}
				><span slot="tooltip"
					>Change Reference...
					<hr />
					${this.config.showAllBranches?"Showing All Branches":ek`<gl-ref-name icon .ref=${e}></gl-ref-name>`}</span
				></gl-ref-button
			>
		</section>`}renderConfigBase(){return eC}renderConfigShowAllBranches(){if(this.repository?.virtual)return eC;let{config:{showAllBranches:e}}=this;return ek`<section>
			<gl-checkbox
				value="all"
				.checked=${e}
				@gl-change-value=${e=>{this._ipc.sendCommand(ta,{changes:{showAllBranches:e.target.checked}})}}
				>View All Branches</gl-checkbox
			>
		</section>`}renderPeriodSelect(e){return ek`<section>
			<span class="select-container">
				<label for="periods">Timeframe</label>
				<select class="select" name="periods" position="below" .value=${e} @change=${this.onPeriodChanged}>
					<option value="7|D" ?selected=${"7|D"===e}>1 week</option>
					<option value="1|M" ?selected=${"1|M"===e}>1 month</option>
					<option value="3|M" ?selected=${"3|M"===e}>3 months</option>
					<option value="6|M" ?selected=${"6|M"===e}>6 months</option>
					<option value="9|M" ?selected=${"9|M"===e}>9 months</option>
					<option value="1|Y" ?selected=${"1|Y"===e}>1 year</option>
					<option value="2|Y" ?selected=${"2|Y"===e}>2 years</option>
					<option value="4|Y" ?selected=${"4|Y"===e}>4 years</option>
					<option value="all" ?selected=${"all"===e}>Full history</option>
				</select>
			</span>
		</section>`}renderConfigSliceBy(){if(!this.isSliceBySupported)return eC;let{sliceBy:e}=this;return ek`<section>
			<span class="select-container"
				><label for="sliceBy">Slice By</label>
				<select
					class="select"
					name="sliceBy"
					position="below"
					.value=${e}
					@change=${this.onSliceByChanged}
				>
					<option value="author" ?selected=${"author"===e}>Author</option>
					<option value="branch" ?selected=${"branch"===e}>Branch</option>
				</select></span
			>
		</section>`}renderTimeframe(){let e;switch(this.config.period){case"7|D":e="Up to 1wk ago";break;case"1|M":e="Up to 1mo ago";break;case"3|M":e="Up to 3mo ago";break;case"6|M":e="Up to 6mo ago";break;case"9|M":e="Up to 9mo ago";break;case"1|Y":e="Up to 1yr ago";break;case"2|Y":e="Up to 2yr ago";break;case"4|Y":e="Up to 4yr ago";break;case"all":e="All time";break;default:return eC}return ek`<span class="details__timeframe" tabindex="0">${e}</span>`}onChartCommitSelected(e){null!=e.detail.id&&this.fireSelectDataPoint(e.detail)}onPeriodChanged(e){let t=e.target,r=t.options[t.selectedIndex].value;(function(e){if("all"===e)return;let[t,r]=e.split("|");if(isNaN(Number(t))||"D"!==r&&"M"!==r&&"Y"!==r)throw Error(`Invalid period: ${e}`)})(r),this._ipc.sendCommand(ta,{changes:{period:r}})}onSliceByChanged(e){let t=e.target,r=t.options[t.selectedIndex].value;(function(e){if("author"!==e&&"branch"!==e)throw Error(`Invalid slice by: ${e}`)})(r),this._ipc.sendCommand(ta,{changes:{sliceBy:r}})}fireSelectDataPoint(e){let{scope:t}=this;null!=t&&(this._fireSelectDataPointDebounced??=eQ(e=>this._ipc.sendCommand(tn,{scope:t,...e}),250,{maxWait:"file"===t.type?500:void 0}),this._fireSelectDataPointDebounced(e))}};aT.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aT.styles=[oF,oj,oU,oq],aO([eB("#chart")],aT.prototype,"_chart",2),aO([eM()],aT.prototype,"_loading",2),aT=aO([eD("gl-timeline-app")],aT);export{aT as GlTimelineApp};