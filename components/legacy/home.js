let t,r,o,i,n,a,c,h,p,u,g,b;var m,f,v,w,_,x,$,C,S,P={};P.d=(t,r)=>{for(var o in r)P.o(r,o)&&!P.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},P.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),void 0!==P&&Object.defineProperty(P,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(t){}});let context_request_event_s=class context_request_event_s extends Event{constructor(t,r,o,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=r,this.callback=o,this.subscribe=i??!1}};let s=class s{constructor(t,r,o,i){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,r)=>{this.unsubscribe&&(this.unsubscribe!==r&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,r)),this.unsubscribe=r},this.host=t,void 0!==r.context)?(this.context=r.context,this.callback=r.callback,this.subscribe=r.subscribe??!1):(this.context=r,this.callback=o,this.subscribe=i??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,r=!1){let o=r||!Object.is(t,this.o);this.o=t,o&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:r}]of this.subscriptions)t(this.o,r)},void 0!==t&&(this.value=t)}addCallback(t,r,o){if(!o)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:r});let{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}};let e=class e extends Event{constructor(t,r){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=r}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(t,r,o){super(void 0!==r.context?r.initialValue:o),this.onContextRequest=t=>{if(t.context!==this.context)return;let r=t.contextTarget??t.composedPath()[0];r!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,r,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;let r=new Set;for(let[t,{consumerHost:o}]of this.subscriptions)r.has(t)||(r.add(t),o.dispatchEvent(new context_request_event_s(this.context,o,t,!0)));t.stopPropagation()},this.host=t,void 0!==r.context?this.context=r.context:this.context=r,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new e(this.context,this.host))}};function O({context:t}){return(r,o)=>{let i=new WeakMap;if("object"==typeof o)return{get(){return r.get.call(this)},set(t){return i.get(this).setValue(t),r.set.call(this,t)},init(r){return i.set(this,new context_provider_i(this,{context:t,initialValue:r})),r}};{let n;r.constructor.addInitializer(r=>{i.set(r,new context_provider_i(r,{context:t}))});let a=Object.getOwnPropertyDescriptor(r,o);if(void 0===a){let t=new WeakMap;n={get(){return t.get(this)},set(r){i.get(this).setValue(r),t.set(this,r)},configurable:!0,enumerable:!0}}else{let t=a.set;n={...a,set(r){i.get(this).setValue(r),t?.call(this,r)}}}return void Object.defineProperty(r,o,n)}}}function A({context:t,subscribe:r}){return(o,i)=>{"object"==typeof i?i.addInitializer(function(){new s(this,{context:t,callback:t=>{o.set.call(this,t)},subscribe:r})}):o.constructor.addInitializer(o=>{new s(o,{context:t,callback:t=>{o[i]=t},subscribe:r})})}}let E=globalThis,B=E.ShadowRoot&&(void 0===E.ShadyCSS||E.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,T=Symbol(),M=new WeakMap;let css_tag_n=class css_tag_n{constructor(t,r,o){if(this._$cssResult$=!0,o!==T)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(B&&void 0===t){let o=void 0!==r&&1===r.length;o&&(t=M.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&M.set(r,t))}return t}toString(){return this.cssText}};let D=t=>new css_tag_n("string"==typeof t?t:t+"",void 0,T),j=(t,...r)=>new css_tag_n(1===t.length?t[0]:r.reduce((r,o,i)=>r+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]),t,T),W=B?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let r="";for(let o of t.cssRules)r+=o.cssText;return D(r)})(t):t,{is:N,defineProperty:F,getOwnPropertyDescriptor:U,getOwnPropertyNames:q,getOwnPropertySymbols:G,getPrototypeOf:V}=Object,K=globalThis,Y=K.trustedTypes,J=Y?Y.emptyScript:"",X=K.reactiveElementPolyfillSupport,Q={toAttribute(t,r){switch(r){case Boolean:t=t?J:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,r){let o=t;switch(r){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},ee=(t,r)=>!N(t,r),et={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=et){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(t,o,r);void 0!==i&&F(this.prototype,t,i)}}static getPropertyDescriptor(t,r,o){let{get:i,set:n}=U(this.prototype,t)??{get(){return this[r]},set(t){this[r]=t}};return{get:i,set(r){let a=i?.call(this);n?.call(this,r),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=V(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let r of[...q(t),...G(t)])this.createProperty(r,t[r])}let t=this[Symbol.metadata];if(null!==t){let r=litPropertyMetadata.get(t);if(void 0!==r)for(let[t,o]of r)this.elementProperties.set(t,o)}for(let[t,r]of(this._$Eh=new Map,this.elementProperties)){let o=this._$Eu(t,r);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t))for(let o of new Set(t.flat(1/0).reverse()))r.unshift(W(o));else void 0!==t&&r.push(W(t));return r}static _$Eu(t,r){let o=r.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let r of this.constructor.elementProperties.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(B)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let o of r){let r=document.createElement("style"),i=E.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){let o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){let n=(void 0!==o.converter?.toAttribute?o.converter:Q).toAttribute(r,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,r){let o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){let t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:Q;this._$Em=i;let a=n.fromAttribute(r,t.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,r,o,i=!1,n){if(void 0!==t){let a=this.constructor;if(!1===i&&(n=this[t]),!(((o??=a.getPropertyOptions(t)).hasChanged??ee)(n,r)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,o))))return;this.C(t,r,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:i,wrapped:n},a){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??r??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,r]of this._$Ep)this[t]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,o]of t){let{wrapped:t}=o,i=this[r];!0!==t||this._$AL.has(r)||void 0===i||this.C(r,void 0,o,i)}}let t=!1,r=this._$AL;try{(t=this.shouldUpdate(r))?(this.willUpdate(r),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(r)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,X?.({ReactiveElement:y}),(K.reactiveElementVersions??=[]).push("2.1.2");let er=globalThis,eo=t=>t,ei=er.trustedTypes,en=ei?ei.createPolicy("lit-html",{createHTML:t=>t}):void 0,es="$lit$",ea=`lit$${Math.random().toFixed(9).slice(2)}$`,el="?"+ea,ec=`<${el}>`,ed=document,eh=()=>ed.createComment(""),ep=t=>null===t||"object"!=typeof t&&"function"!=typeof t,eu=Array.isArray,eg=t=>eu(t)||"function"==typeof t?.[Symbol.iterator],eb=`[ 	
\x0c\r]`,em=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ef=/-->/g,ev=/>/g,ey=RegExp(`>|${eb}(?:([^\\s"'>=/]+)(${eb}*=${eb}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ew=/'/g,e_=/"/g,ek=/^(?:script|style|textarea|title)$/i,ex=t=>(r,...o)=>({_$litType$:t,strings:r,values:o}),e$=ex(1),eC=ex(2),eS=(ex(3),Symbol.for("lit-noChange")),eP=Symbol.for("lit-nothing"),eO=new WeakMap,eA=ed.createTreeWalker(ed,129);function eR(t,r){if(!eu(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==en?en.createHTML(r):r}let eE=(t,r)=>{let o=t.length-1,i=[],n,a=2===r?"<svg>":3===r?"<math>":"",c=em;for(let r=0;r<o;r++){let o=t[r],h,p,u=-1,g=0;for(;g<o.length&&(c.lastIndex=g,null!==(p=c.exec(o)));)g=c.lastIndex,c===em?"!--"===p[1]?c=ef:void 0!==p[1]?c=ev:void 0!==p[2]?(ek.test(p[2])&&(n=RegExp("</"+p[2],"g")),c=ey):void 0!==p[3]&&(c=ey):c===ey?">"===p[0]?(c=n??em,u=-1):void 0===p[1]?u=-2:(u=c.lastIndex-p[2].length,h=p[1],c=void 0===p[3]?ey:'"'===p[3]?e_:ew):c===e_||c===ew?c=ey:c===ef||c===ev?c=em:(c=ey,n=void 0);let b=c===ey&&t[r+1].startsWith("/>")?" ":"";a+=c===em?o+ec:u>=0?(i.push(h),o.slice(0,u)+es+o.slice(u)+ea+b):o+ea+(-2===u?r:b)}return[eR(t,a+(t[o]||"<?>")+(2===r?"</svg>":3===r?"</math>":"")),i]};let lit_html_S=class lit_html_S{constructor({strings:t,_$litType$:r},o){let i;this.parts=[];let n=0,a=0,c=t.length-1,h=this.parts,[p,u]=eE(t,r);if(this.el=lit_html_S.createElement(p,o),eA.currentNode=this.el.content,2===r||3===r){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=eA.nextNode())&&h.length<c;){if(1===i.nodeType){if(i.hasAttributes())for(let t of i.getAttributeNames())if(t.endsWith(es)){let r=u[a++],o=i.getAttribute(t).split(ea),c=/([.?@])?(.*)/.exec(r);h.push({type:1,index:n,name:c[2],strings:o,ctor:"."===c[1]?I:"?"===c[1]?L:"@"===c[1]?z:H}),i.removeAttribute(t)}else t.startsWith(ea)&&(h.push({type:6,index:n}),i.removeAttribute(t));if(ek.test(i.tagName)){let t=i.textContent.split(ea),r=t.length-1;if(r>0){i.textContent=ei?ei.emptyScript:"";for(let o=0;o<r;o++)i.append(t[o],eh()),eA.nextNode(),h.push({type:2,index:++n});i.append(t[r],eh())}}}else if(8===i.nodeType)if(i.data===el)h.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(ea,t+1));)h.push({type:7,index:n}),t+=ea.length-1}n++}}static createElement(t,r){let o=ed.createElement("template");return o.innerHTML=t,o}};function eI(t,r,o=t,i){if(r===eS)return r;let n=void 0!==i?o._$Co?.[i]:o._$Cl,a=ep(r)?void 0:r._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t))._$AT(t,o,i),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(r=eI(t,n._$AS(t,r.values),n,i)),r}let R=class R{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:o}=this._$AD,i=(t?.creationScope??ed).importNode(r,!0);eA.currentNode=i;let n=eA.nextNode(),a=0,c=0,h=o[0];for(;void 0!==h;){if(a===h.index){let r;2===h.type?r=new k(n,n.nextSibling,this,t):1===h.type?r=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(r=new Z(n,this,t)),this._$AV.push(r),h=o[++c]}a!==h?.index&&(n=eA.nextNode(),a++)}return eA.currentNode=ed,i}p(t){let r=0;for(let o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,i){this.type=2,this._$AH=eP,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return void 0!==r&&11===t?.nodeType&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){ep(t=eI(this,t,r))?t===eP||null==t||""===t?(this._$AH!==eP&&this._$AR(),this._$AH=eP):t!==this._$AH&&t!==eS&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):eg(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==eP&&ep(this._$AH)?this._$AA.nextSibling.data=t:this.T(ed.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=lit_html_S.createElement(eR(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(r);else{let t=new R(i,this),o=t.u(this.options);t.p(r),this.T(o),this._$AH=t}}_$AC(t){let r=eO.get(t.strings);return void 0===r&&eO.set(t.strings,r=new lit_html_S(t)),r}k(t){eu(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,i=0;for(let n of t)i===r.length?r.push(o=new k(this.O(eh()),this.O(eh()),this,this.options)):o=r[i],o._$AI(n),i++;i<r.length&&(this._$AR(o&&o._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let r=eo(t).nextSibling;eo(t).remove(),t=r}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,i,n){this.type=1,this._$AH=eP,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=eP}_$AI(t,r=this,o,i){let n=this.strings,a=!1;if(void 0===n)(a=!ep(t=eI(this,t,r,0))||t!==this._$AH&&t!==eS)&&(this._$AH=t);else{let i,c,h=t;for(t=n[0],i=0;i<n.length-1;i++)(c=eI(this,h[o+i],r,i))===eS&&(c=this._$AH[i]),a||=!ep(c)||c!==this._$AH[i],c===eP?t=eP:t!==eP&&(t+=(c??"")+n[i+1]),this._$AH[i]=c}a&&!i&&this.j(t)}j(t){t===eP?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===eP?void 0:t}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==eP)}};let z=class z extends H{constructor(t,r,o,i,n){super(t,r,o,i,n),this.type=5}_$AI(t,r=this){if((t=eI(this,t,r,0)??eP)===eS)return;let o=this._$AH,i=t===eP&&o!==eP||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==eP&&(o===eP||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};let Z=class Z{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){eI(this,t)}};let eB=er.litHtmlPolyfillSupport;eB?.(lit_html_S,k),(er.litHtmlVersions??=[]).push("3.3.2");let eL=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,r,o)=>{let i=o?.renderBefore??r,n=i._$litPart$;if(void 0===n){let t=o?.renderBefore??null;i._$litPart$=n=new k(r.insertBefore(eh(),t),t,void 0,o??{})}return n._$AI(t),n})(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eS}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,eL.litElementHydrateSupport?.({LitElement:lit_element_i});let eT=eL.litElementPolyfillSupport;eT?.({LitElement:lit_element_i}),(eL.litElementVersions??=[]).push("4.2.2");let eM=t=>(r,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)},ez={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:ee};function eD(t){return(r,o)=>{let i;return"object"==typeof o?((t=ez,r,o)=>{let{kind:i,metadata:n}=o,a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),"accessor"===i){let{name:i}=o;return{set(o){let n=r.get.call(this);r.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(r){return void 0!==r&&this.C(i,void 0,t,r),r}}}if("setter"===i){let{name:i}=o;return function(o){let n=this[i];r.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)})(t,r,o):(i=r.hasOwnProperty(o),r.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(r,o):void 0)}}function ej(t){return eD({...t,state:!0,attribute:!1})}let eW=(t,r,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof r&&Object.defineProperty(t,r,o),o);function eN(t,r){return(o,i,n)=>{let a=r=>r.renderRoot?.querySelector(t)??null;if(r){let t,{get:r,set:c}="object"==typeof i?o:n??(t=Symbol(),{get(){return this[t]},set(r){this[t]=r}});return eW(o,i,{get(){let t=r.call(this);return void 0===t&&(null!==(t=a(this))||this.hasUpdated)&&c.call(this,t),t}})}return eW(o,i,{get(){return a(this)}})}}var eF=Object.defineProperty,eU=(t,r,o)=>{let i;return(i="symbol"!=typeof r?r+"":r)in t?eF(t,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[i]=o,o},eq=(t,r)=>{if(Object(r)!==r)throw TypeError('Cannot use the "in" operator on this value');return t.has(r)},eH=(t,r,o)=>{if(r.has(t))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(t):r.set(t,o)},eG=(t,r,o)=>{if(!r.has(t))throw TypeError("Cannot access private method");return o};function eV(t,r){return Object.is(t,r)}let eK=null,eY=!1,eJ=1,eZ=Symbol("SIGNAL");function eX(t){let r=eK;return eK=t,r}let eQ={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function e0(t){if(eY)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eK)return;eK.consumerOnSignalRead(t);let r=eK.nextProducerIndex++;e5(eK),r<eK.producerNode.length&&eK.producerNode[r]!==t&&e2(eK)&&e1(eK.producerNode[r],eK.producerIndexOfThis[r]),eK.producerNode[r]!==t&&(eK.producerNode[r]=t,eK.producerIndexOfThis[r]=e2(eK)?function t(r,o,i){var n;if(e3(r),e5(r),0===r.liveConsumerNode.length){null==(n=r.watched)||n.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=t(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(i),r.liveConsumerNode.push(o)-1}(t,eK,r):0),eK.producerLastReadVersion[r]=t.version}function e1(t,r){var o;if(e3(t),e5(t),"u">typeof ngDevMode&&ngDevMode&&r>=t.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${r} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(o=t.unwatched)||o.call(t.wrapper);for(let r=0;r<t.producerNode.length;r++)e1(t.producerNode[r],t.producerIndexOfThis[r])}let i=t.liveConsumerNode.length-1;if(t.liveConsumerNode[r]=t.liveConsumerNode[i],t.liveConsumerIndexOfThis[r]=t.liveConsumerIndexOfThis[i],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,r<t.liveConsumerNode.length){let o=t.liveConsumerIndexOfThis[r],i=t.liveConsumerNode[r];e5(i),i.producerIndexOfThis[o]=r}}function e2(t){var r;return t.consumerIsAlwaysLive||((null==(r=null==t?void 0:t.liveConsumerNode)?void 0:r.length)??0)>0}function e5(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function e3(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function e4(t){if(function t(r){if(r.dirty||r.lastCleanEpoch!==eJ){if(!r.producerMustRecompute(r)&&!function(r){e5(r);for(let o=0;o<r.producerNode.length;o++){let i=r.producerNode[o],n=r.producerLastReadVersion[o];if(n!==i.version||(t(i),n!==i.version))return!0}return!1}(r)){r.dirty=!1,r.lastCleanEpoch=eJ;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=eJ}}(t),e0(t),t.value===e7)throw t.error;return t.value}let e6=Symbol("UNSET"),e8=Symbol("COMPUTING"),e7=Symbol("ERRORED"),e9={...eQ,value:e6,dirty:!0,error:null,equal:eV,producerMustRecompute:t=>t.value===e6||t.value===e8,producerRecomputeValue(t){let r;if(t.value===e8)throw Error("Detected cycle in computations.");let o=t.value;t.value=e8;let i=(t&&(t.nextProducerIndex=0),eX(t)),n=!1;try{r=t.computation.call(t.wrapper),n=o!==e6&&o!==e7&&t.equal.call(t.wrapper,o,r)}catch(o){r=e7,t.error=o}finally{if(eX(i),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(e2(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)e1(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}if(n){t.value=o;return}t.value=r,t.version++}},te=function(){throw Error()};function tt(){return e0(this),this.value}let tr={...eQ,equal:eV,value:void 0},to=Symbol("node");(t=>{var r,o,i,n;let State=class State{constructor(i,n={}){let a,c;eH(this,o),eU(this,r);let h=((a=Object.create(tr)).value=i,(c=()=>(e0(a),a.value))[eZ]=a,c)[eZ];if(this[to]=h,h.wrapper=this,n){let r=n.equals;r&&(h.equal=r),h.watched=n[t.subtle.watched],h.unwatched=n[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return tt.call(this[to])}set(r){var o,i;if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eY)throw Error("Writes to signals not permitted during Watcher callback");o=this[to],(null==eK?void 0:eK.consumerAllowSignalWrites)===!1&&te(),o.equal.call(o.wrapper,o.value,r)||(o.value=r,i=o,i.version++,eJ++,function t(r){if(void 0===r.liveConsumerNode)return;let o=eY;eY=!0;try{for(let o of r.liveConsumerNode)o.dirty||function(r){var o;r.dirty=!0,t(r),null==(o=r.consumerMarkedDirty)||o.call(r.wrapper??r)}(o)}finally{eY=o}}(i))}};r=to,o=new WeakSet,t.isState=t=>"object"==typeof t&&eq(o,t),t.State=State;let Computed=class Computed{constructor(r,o){let a,c;eH(this,n),eU(this,i);let h=((a=Object.create(e9)).computation=r,(c=()=>e4(a))[eZ]=a,c)[eZ];if(h.consumerAllowSignalWrites=!0,this[to]=h,h.wrapper=this,o){let r=o.equals;r&&(h.equal=r),h.watched=o[t.subtle.watched],h.unwatched=o[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return e4(this[to])}};i=to,n=new WeakSet,t.isComputed=t=>"object"==typeof t&&eq(n,t),t.Computed=Computed,(r=>{var o,i,n,a;r.untrack=function(t){let r,o=null;try{o=eX(null),r=t()}finally{eX(o)}return r},r.introspectSources=function(r){var o;if(!(0,t.isComputed)(r)&&!(0,t.isWatcher)(r))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(o=r[to].producerNode)?void 0:o.map(t=>t.wrapper))??[]},r.introspectSinks=function(r){var o;if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called introspectSinks without a Signal argument");return(null==(o=r[to].liveConsumerNode)?void 0:o.map(t=>t.wrapper))??[]},r.hasSinks=function(r){if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called hasSinks without a Signal argument");let o=r[to].liveConsumerNode;return!!o&&o.length>0},r.hasSources=function(r){if(!(0,t.isComputed)(r)&&!(0,t.isWatcher)(r))throw TypeError("Called hasSources without a Computed or Watcher argument");let o=r[to].producerNode;return!!o&&o.length>0};let Watcher=class Watcher{constructor(t){eH(this,i),eH(this,n),eU(this,o);let r=Object.create(eQ);r.wrapper=this,r.consumerMarkedDirty=t,r.consumerIsAlwaysLive=!0,r.consumerAllowSignalWrites=!1,r.producerNode=[],this[to]=r}watch(...r){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eG(this,n,a).call(this,r);let o=this[to];o.dirty=!1;let i=eX(o);for(let t of r)e0(t[to]);eX(i)}unwatch(...r){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eG(this,n,a).call(this,r);let o=this[to];e5(o);for(let t=o.producerNode.length-1;t>=0;t--)if(r.includes(o.producerNode[t].wrapper)){e1(o.producerNode[t],o.producerIndexOfThis[t]);let r=o.producerNode.length-1;if(o.producerNode[t]=o.producerNode[r],o.producerIndexOfThis[t]=o.producerIndexOfThis[r],o.producerNode.length--,o.producerIndexOfThis.length--,o.nextProducerIndex--,t<o.producerNode.length){let r=o.producerIndexOfThis[t],i=o.producerNode[t];e3(i),i.liveConsumerIndexOfThis[r]=t}}}getPending(){if(!(0,t.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[to].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}};o=to,i=new WeakSet,n=new WeakSet,a=function(r){for(let o of r)if(!(0,t.isComputed)(o)&&!(0,t.isState)(o))throw TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=t=>eq(i,t),r.Watcher=Watcher,r.currentComputed=function(){var t;return null==(t=eK)?void 0:t.wrapper},r.watched=Symbol("watched"),r.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(x||(x={}));let ti=(t=null)=>new x.State(t,{equals:()=>!1});new WeakMap;let SignalObjectImpl=class SignalObjectImpl{static fromEntries(t){return new SignalObjectImpl(Object.fromEntries(t))}#e=new Map;#t=ti();constructor(t={}){let r=Object.getPrototypeOf(t),o=Object.getOwnPropertyDescriptors(t),i=Object.create(r);for(let t in o)Object.defineProperty(i,t,o[t]);let n=this;return new Proxy(i,{get:(t,r,o)=>(n.#r(r),Reflect.get(t,r,o)),has:(t,r)=>(n.#r(r),r in t),ownKeys:t=>(n.#t.get(),Reflect.ownKeys(t)),set(t,r,o,i){let a=Reflect.set(t,r,o,i);return n.#o(r),n.#i(),a},deleteProperty:(t,r)=>(r in t&&(delete t[r],n.#o(r),n.#i()),!0),getPrototypeOf:()=>SignalObjectImpl.prototype})}#r(t){let r=this.#e.get(t);void 0===r&&(r=ti(),this.#e.set(t,r)),r.get()}#o(t){let r=this.#e.get(t);r&&r.set(null)}#i(){this.#t.set(null)}};function tn(t,r,o){let i,n,a,c,h,p,u,g,b,m,f=0;null!=o&&({edges:p,maxWait:u,cancellation:g,aggregator:b}=o);let v="leading"===(p??="trailing")||"both"===p,w="trailing"===p||"both"===p;function _(){if(null!=i){f=Date.now();let r=i,o=m;return m=void 0,i=void 0,a=t.apply(o,r)}}function x(){null!=c&&(clearTimeout(c),c=void 0)}function $(){null!=h&&(clearTimeout(h),h=void 0)}function C(){x(),$(),m=void 0,i=void 0,n=void 0,f=0}function S(...t){if(g?.aborted)return;let o=Date.now();null!=b&&null!=i?i=b(i,t):(m=this,i=t);let p=null==c&&null==h;n=o,x();let $=Date.now();if(n=$,c=setTimeout(()=>{c=void 0,function t(){let o,i,a=Date.now();if(o=a-(n??0),i=a-f,null==n||o>=r||o<0||null!=u&&i>=u){w&&_(),C();return}c=setTimeout(()=>{c=void 0,t()},r-(a-(n??0)))}()},r),null!=u&&!h){0===f&&(f=$);let t=u-($-f);t>0?h=setTimeout(()=>{h=void 0,w&&null!=i&&_(),f=Date.now()},t):(w&&null!=i&&_(),C())}return v&&p?_():a}return S.cancel=C,S.flush=function(){return x(),$(),_()},S.pending=function(){return null!=c||null!=h},g?.addEventListener("abort",C,{once:!0}),S}let ts=!1,ta=new x.subtle.Watcher(()=>{ts||(ts=!0,queueMicrotask(()=>{for(let t of(ts=!1,ta.getPending()))t.get();ta.watch()}))}),tl=Symbol("SignalWatcherBrand"),tc=new FinalizationRegistry(t=>{t.unwatch(...x.subtle.introspectSources(t))}),td=new WeakMap;function th(t){return!0===t[tl]?t:class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new x.State(0),this._$Si=!1}_$Sl(){var t,r;let o=[],i=[];this._$St.forEach((t,r)=>{((null==t?void 0:t.beforeUpdate)?o:i).push(r)});let n=null==(t=this.h)?void 0:t.getPending().filter(t=>t!==this._$Su&&!this._$St.has(t));o.forEach(t=>t.get()),null==(r=this._$Su)||r.get(),n.forEach(t=>t.get()),i.forEach(t=>t.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new x.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new x.subtle.Watcher(function(){let t=td.get(this);void 0!==t&&(!1===t._$Si&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});td.set(t,this),tc.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(void 0===this.h)return;let t=!1;this.h.unwatch(...x.subtle.introspectSources(this.h).filter(r=>{var o;let i=!0!==(null==(o=this._$St.get(r))?void 0:o.manualDispose);return i&&this._$St.delete(r),t||(t=!i),i})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,r){var o;this._$S_();let i=new x.Computed(()=>{t()});return this.h.watch(i),this._$St.set(i,r),null!=(o=null==r?void 0:r.beforeUpdate)&&o?x.subtle.untrack(()=>i.get()):this.updateComplete.then(()=>x.subtle.untrack(()=>i.get())),()=>{this._$St.delete(i),this.h.unwatch(i),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tp=t=>(...r)=>({_$litDirective$:t,values:r});let directive_i=class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};let{I:tu}={M:es,P:ea,A:el,C:1,L:eE,R,D:eg,V:eI,I:k,H,N:L,U:z,B:I,F:Z},tg=t=>t,tb=(t,r,o)=>{let i=t._$AA.parentNode,n=void 0===r?t._$AB:r._$AA;if(void 0===o)o=new tu(i.insertBefore(document.createComment(""),n),i.insertBefore(document.createComment(""),n),t,t.options);else{let r=o._$AB.nextSibling,a=o._$AM,c=a!==t;if(c){let r;o._$AQ?.(t),o._$AM=t,void 0!==o._$AP&&(r=t._$AU)!==a._$AU&&o._$AP(r)}if(r!==n||c){let t=o._$AA;for(;t!==r;){let r=tg(t).nextSibling;tg(i).insertBefore(t,n),t=r}}}return o},tm=(t,r,o=t)=>(t._$AI(r,o),t),tf={},tv=t=>{t._$AR(),t._$AA.remove()},ty=(t,r)=>{let o=t._$AN;if(void 0===o)return!1;for(let t of o)t._$AO?.(r,!1),ty(t,r);return!0},tw=t=>{let r,o;do{if(void 0===(r=t._$AM))break;(o=r._$AN).delete(t),t=r}while(0===o?.size)},t_=t=>{for(let r;r=t._$AM;t=r){let o=r._$AN;if(void 0===o)r._$AN=o=new Set;else if(o.has(t))break;o.add(t),t$(r)}};function tk(t){void 0!==this._$AN?(tw(this),this._$AM=t,t_(this)):this._$AM=t}function tx(t,r=!1,o=0){let i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(r)if(Array.isArray(i))for(let t=o;t<i.length;t++)ty(i[t],!1),tw(i[t]);else null!=i&&(ty(i,!1),tw(i));else ty(this,t)}let t$=t=>{2==t.type&&(t._$AP??=tx,t._$AQ??=tk)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,r,o){super._$AT(t,r,o),t_(this),this.isConnected=t._$AU}_$AO(t,r=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),r&&(ty(this,t),tw(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=t,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};let tC=!1,tS=new x.subtle.Watcher(async()=>{tC||(tC=!0,queueMicrotask(()=>{for(let t of(tC=!1,tS.getPending()))t.get();tS.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var t,r;void 0===this._$Sm&&(this._$Sj=new x.Computed(()=>{var t;let r=null==(t=this._$SW)?void 0:t.get();return this.setValue(r),r}),this._$Sm=null!=(r=null==(t=this._$Sk)?void 0:t.h)?r:tS,this._$Sm.watch(this._$Sj),x.subtle.untrack(()=>{var t;return null==(t=this._$Sj)?void 0:t.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return x.subtle.untrack(()=>t.get())}update(t,[r]){var o;return null!=this._$Sk||(this._$Sk=null==(o=t.options)?void 0:o.host),r!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=r,this._$S_(),x.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tP=tp(watch_r),tO=t=>(r,...o)=>t(r,...o.map(t=>t instanceof x.State||t instanceof x.Computed?tP(t):t));tO(e$),tO(eC),x.State,x.Computed;let tA=(t,r)=>new x.State(t,r),{fromCharCode:tR}=String;new TextEncoder;let tE=new TextDecoder;let IpcCall=class IpcCall{constructor(t,r,o=!1){this.scope=t,this.reset=o,this.method=`${t}/${r}`}is(t){return t.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(t,r,o){super(t,r,o),this.response=new IpcNotification(this.scope,`${r}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tI=new IpcRequest("core","webview/ready"),tB=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tL=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tT=new IpcCommand("core","telemetry/sendEvent"),tM=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tz=new IpcCommand("core","webview/focus/didChange"),tD=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tj=new WeakMap;function tW(t,r){return function(o,i,n){let a=tj.get(o.constructor);null==a&&tj.set(o.constructor,a=[]),a.push({method:n.value,keys:Array.isArray(t)?t:[t],afterFirstUpdate:r?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(t,r,o){let i=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...o,detail:r});return this.dispatchEvent(i),i}update(t){let r=tj.get(this.constructor);if(null!=r)for(let{keys:o,method:i,afterFirstUpdate:n}of r){if(n&&!this.hasUpdated)continue;let r=o.filter(r=>t.has(r));r.length&&i.call(this,r)}super.update(t)}};let tN=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,tF=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,tU=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],tq=new Map,tH=new Map;function tG(t,a){let c=("number"==typeof t?t:t.getTime())-Date.now();for(let[t,h,p,u]of tU){let g=Math.abs(c);if(g>=h||1e3===h){if(a){if(null==r&&(r=null!=n?n.resolvedOptions().locale:null!=i?i.resolvedOptions().locale:(n=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).resolvedOptions().locale),"en"===r||r?.startsWith("en-")){let t=Math.floor(g/p);return`${t}${u}`}return(n??=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"always",style:"narrow"})).format(Math.trunc(c/p),t)}return(i??=new Intl.RelativeTimeFormat(o,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(c/p),t)}}return""}function tV(t,r,i,n=!0){r=r??void 0;let a=`${i??""}:${r}`,c=tq.get(a);if(null==c){let t,h=function(t){if(null==t)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let r=tF.exec(t);if(r?.groups!=null){let{dateStyle:t,timeStyle:o}=r.groups;return{localeMatcher:"best fit",dateStyle:t||"full",timeStyle:o||void 0}}let o={localeMatcher:"best fit"};for(let{groups:r}of t.matchAll(tN))if(null!=r){for(let[t,i]of Object.entries(r))if(null!=i)switch(t){case"year":o.year=4===i.length?"numeric":"2-digit";break;case"month":switch(i.length){case 4:o.month="long";break;case 3:o.month="short";break;case 2:o.month="2-digit";break;case 1:o.month="numeric"}break;case"day":"DD"===i?o.day="2-digit":o.day="numeric";break;case"weekday":switch(i.length){case 4:o.weekday="long";break;case 3:o.weekday="short";break;case 2:o.weekday="narrow"}break;case"hour":o.hour=2===i.length?"2-digit":"numeric",o.hour12="hh"===i||"h"===i;break;case"minute":o.minute=2===i.length?"2-digit":"numeric";break;case"second":o.second=2===i.length?"2-digit":"numeric";break;case"fractionalSecond":o.fractionalSecondDigits=3;break;case"dayPeriod":o.dayPeriod="narrow",o.hour12=!0,o.hourCycle="h12";break;case"timeZoneName":o.timeZoneName=2===i.length?"long":"short"}}return o}(r);t=null==i?o:"system"===i?void 0:[i],c=new Intl.DateTimeFormat(t,h),n&&tq.set(a,c)}if(null==r||tF.test(r))return c.format(t);let h=c.formatToParts(t);return r.replace(tN,(r,a,c,p,u,g,b,m,f,v,w,_,x,$,C)=>{if(null!=a)return a.substring(1,a.length-1);for(let[r,a]of Object.entries(C)){if(null==a)continue;let c=h.find(t=>t.type===r);if("Do"===a&&c?.type==="day")return function(t){let r=t%100;return`${t}${tK[(r-20)%10]??tK[r]??tK[0]}`}(Number(c.value));if("a"===a&&c?.type==="dayPeriod"){let r=(function(t){let r=`${i??""}:time:${t}`,a=tq.get(r);if(null==a){let c;c=null==i?o:"system"===i?void 0:[i],a=new Intl.DateTimeFormat(c,{localeMatcher:"best fit",timeStyle:t}),n&&tq.set(r,a)}return a})("short").formatToParts(t).find(t=>"dayPeriod"===t.type);return` ${(r??c)?.value??""}`}return c?.value??""}return""})}let tK=["th","st","nd","rd"];function tY(t,r){t??="decimal";let i=`${r??""}:${t}`,n=tH.get(i);if(null==n){let a,c={localeMatcher:"best fit",style:t};a=null==r?o:"system"===r?void 0:[r],n=new Intl.NumberFormat(a,c),tH.set(i,n)}return n.format}let tJ=/\$\{(?:'.*?[^\\]'|\W*)?(\w*?)(?:'.*?[^\\]'|[\W\d]*)\}/g,tZ=new Map;function tX(t){return 95===t||t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57}function tQ(t,r,o){let i;if(null==o)return a??=tY(),`${a(r)} ${t}${1===r?"":"s"}`;let n=1===r?t:o.plural??`${t}s`;return o.only?n:(0===r?i=o.zero??r:!1===o.format?i=r:null!=o.format?i=o.format(r):(a??=tY(),i=a(r)),`${i}${o.infix??" "}${n}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let t0=/T/,t1=/.*\s*?at\s(.+?)\s/,t2=/^_+/,t5=["accessToken","password","token"];let Logger=class Logger{#n;#s;configure(t,r=!1){this.#s={...t,sanitizeKeys:new Set([...t5,...t.sanitizeKeys??[]])},this.#a=r,this.#n=t.createChannel(t.name),this.#l=this.#n.logLevel,this.#n.onDidChangeLogLevel?.(t=>{this.#l=t})}enabled(t){return!!this.isDebugging||0!==this.#l&&(null==t||this.#l<=function(t){switch(t){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(t))}#a=!1;get isDebugging(){return this.#a}#l=0;get logLevel(){var t=this.#l;switch(t){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(t0," ").slice(0,-1)}]`}trace(t,...r){let o;(0!==this.#l&&!(this.#l>1)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.trace(`  ${o??""}${this.#c(!0,r)}`))}debug(t,...r){let o;(0!==this.#l&&!(this.#l>2)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.debug(`  ${o??""}${this.#c(!1,r)}`))}info(t,...r){let o;(0!==this.#l&&!(this.#l>3)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.info(`   ${o??""}${this.#c(!1,r)}`))}warn(t,...r){let o;(0!==this.#l&&!(this.#l>4)||this.isDebugging)&&("string"==typeof t?o=t:(o=r.shift(),null!=t&&(o=`${t.prefix} ${o??""}`)),this.isDebugging,this.#n?.warn(`${o??""}${this.#c(!1,r)}`))}error(t,r,...o){let i;if((0===this.#l||this.#l>5)&&!this.isDebugging)return;if(null==(i=null==r||"string"==typeof r?r:`${r.prefix} ${o.shift()??""}`)){let r=t instanceof Error?t.stack:void 0;if(r){let t=t1.exec(r);null!=t&&(i=t[1])}}this.isDebugging;let n=`  ${i??""}${this.#c(!1,o)}`;null!=t?this.#n?.error(String(t),n):this.#n?.error(n)}showOutputChannel(t){this.#n?.show?.(t)}toLoggable(t,r){if(null!=r){let o=this.sanitize(r,t);if(null!=o)return o}if("function"==typeof t)return"<function>";if(null==t||"object"!=typeof t||t instanceof Error)return String(t);if(Array.isArray(t)){let r=t.length>10?t.slice(0,10):t,o=t.length>10?`, \u2026+${t.length-10}`:"";return`[${r.map(t=>this.toLoggable(t)).join(", ")}${o}]`}let o=this.#s?.toLoggable,i=o?.(t);if(null!=i)return i;let n=this.#s?.sanitizeKeys;try{return JSON.stringify(t,(t,r)=>{if(95!==t.charCodeAt(0))return n?.has(t)?this.sanitize(t,r):""===t||"object"!=typeof r||null==r||Array.isArray(r)?r:r instanceof Error?String(r):o?.(r)??r})}catch{return"<error>"}}sanitize(t,r){if(null==r)return;let o=t.replace(t2,"")||t;if(this.#s?.sanitizeKeys?.has(o))return null!=this.#s.hash?`<${o}:${this.#s.hash("string"==typeof r?r:JSON.stringify(r))}>`:`<${o}>`}#c(t,r){if(0===r.length||t&&(0===this.#l||this.#l>2)&&!this.isDebugging)return"";let o=r.map(t=>this.toLoggable(t)).join(", ");return 0!==o.length?` \u2014 ${o}`:""}};let t3=new Logger,t4=new WeakMap,t6={enabled:t=>t3.enabled(t),log:(t,r,o,...i)=>{switch(t){case"error":t3.error(void 0,r,o,...i);break;case"warn":r?.warn(o,...i);break;case"info":r?.info(o,...i);break;case"debug":default:r?.debug(o,...i);break;case"trace":r?.trace(o,...i)}}},t8=0x40000000-1;function t7(){let t=0;return{get current(){return t},next:function(){return t===t8&&(t=0),++t},reset:function(){t=0}}}function t9(t){let r=.001*performance.now(),o=Math.floor(r),i=Math.floor(r%1*1e9);return void 0!==t&&(o-=t[0],(i-=t[1])<0&&(o--,i+=1e9)),[o,i]}function re(t){let[r,o]=t9(t);return 1e3*r+Math.floor(o/1e6)}let rt=new Map;function rr(t,r){let o=c;c=t.scopeId,rt.set(t.scopeId,t);try{return r()}finally{c=o,rt.delete(t.scopeId)}}function ro(){return null!=c?rt.get(c):void 0}let ri=t7();function rn(t,r,o){var i;let n,a,c={scopeId:t,prevScopeId:r,prefix:o,enabled:t=>t3.enabled(t),addExitInfo:function(...t){(n??=[]).push(...t)},setFailed:function(t){a=t},getExitInfo:function(){return{details:n?.length?` \u2022 ${n.join(", ")}`:void 0,failed:a}}};return rs(c,"trace",t3.trace),rs(c,"debug",t3.debug),rs(c,"info",t3.info),rs(c,"warn",t3.warn),Object.defineProperty(i=c,"error",{configurable:!0,enumerable:!0,get:function(){let t=(t,r,...o)=>t3.error(t,i,r,...o);return Object.defineProperty(i,"error",{value:t,writable:!1,enumerable:!0}),t}}),c}function rs(t,r,o){Object.defineProperty(t,r,{configurable:!0,enumerable:!0,get:function(){let i=o.bind(t3,t);return Object.defineProperty(t,r,{value:i,writable:!1,enumerable:!0}),i}})}function ra(t,r,o){if(null!=o){let i=null==r?t.toString(16):`${r.toString(16)} \u2192 ${t.toString(16)}`;return null==i?`[${o.padEnd(13)}]`:`[${o}${i.padStart(13-o.length)}]`}return null==r?`[${t.toString(16).padStart(13)}]`:`[${r.toString(16).padStart(5)} \u2192 ${t.toString(16).padStart(5)}]`}function rl(){let t=ro();if(null==t)return;let r=Object.create(t);return r[Symbol.dispose]=()=>{},r}function rc(t,r,o){if(null!=r&&"boolean"!=typeof r)return rn(r.scopeId,r.prevScopeId,`${r.prefix}${t}`);let i=r?ro()?.scopeId:void 0,n=ri.next();return rn(n,i,`${ra(n,i,o)} ${t}`)}function rd(t,r,o,...i){switch(r){case"trace":t3.trace(t,o,...i);break;case"info":t3.info(t,o,...i);break;default:t3.debug(t,o,...i)}}let LoggerContext=class LoggerContext{constructor(t){this.scope=rc(t,void 0),t3.configure({name:t,createChannel:function(t){let r=t3.isDebugging?function(t){}:function(t){};return{name:t,logLevel:0,trace:r,debug:r,info:r,warn:r,error:r}}},!1)}trace(t,...r){"string"==typeof t?t3.trace(this.scope,t,...r):t3.trace(t,r.shift(),...r)}debug(t,...r){"string"==typeof t?t3.debug(this.scope,t,...r):t3.debug(t,r.shift(),...r)}info(t,...r){"string"==typeof t?t3.info(this.scope,t,...r):t3.info(t,r.shift(),...r)}};let rh=new IpcNotification("home","subscription/didChange"),rp="graph";new IpcCommand(rp,"chooseRepository"),new IpcCommand(rp,"dblclick"),new IpcCommand(rp,"avatars/get"),new IpcCommand(rp,"refs/metadata/get"),new IpcCommand(rp,"rows/get"),new IpcCommand(rp,"pullRequest/openDetails"),new IpcCommand(rp,"row/action"),new IpcCommand(rp,"search/openInView"),new IpcCommand(rp,"search/cancel"),new IpcCommand(rp,"columns/update"),new IpcCommand(rp,"refs/update/visibility"),new IpcCommand(rp,"filters/update/excludeTypes"),new IpcCommand(rp,"configuration/update"),new IpcCommand(rp,"search/update/mode"),new IpcCommand(rp,"filters/update/includedRefs"),new IpcCommand(rp,"selection/update"),new IpcRequest(rp,"jumpToHead"),new IpcRequest(rp,"chooseRef"),new IpcRequest(rp,"chooseComparison"),new IpcRequest(rp,"chooseAuthor"),new IpcRequest(rp,"chooseFile"),new IpcRequest(rp,"rows/ensure"),new IpcRequest(rp,"search/history/get"),new IpcRequest(rp,"search/history/store"),new IpcRequest(rp,"search/history/delete"),new IpcRequest(rp,"counts"),new IpcRequest(rp,"row/hover/get"),new IpcRequest(rp,"search"),new IpcNotification(rp,"repositories/integration/didChange"),new IpcNotification(rp,"didChange",!0),new IpcNotification(rp,"configuration/didChange");let ru=new IpcNotification(rp,"subscription/didChange");new IpcNotification(rp,"org/settings/didChange"),new IpcNotification(rp,"avatars/didChange"),new IpcNotification(rp,"mcp/didChange"),new IpcNotification(rp,"branchState/didChange"),new IpcNotification(rp,"refs/didChangeMetadata"),new IpcNotification(rp,"columns/didChange"),new IpcNotification(rp,"scrollMarkers/didChange"),new IpcNotification(rp,"refs/didChangeVisibility"),new IpcNotification(rp,"rows/didChange"),new IpcNotification(rp,"rows/stats/didChange"),new IpcNotification(rp,"selection/didChange"),new IpcNotification(rp,"workingTree/didChange"),new IpcNotification(rp,"didSearch"),new IpcNotification(rp,"didFetch"),new IpcNotification(rp,"featurePreview/didStart");let rg="timeline";new IpcRequest(rg,"ref/choose"),new IpcRequest(rg,"path/choose"),new IpcCommand(rg,"point/open"),new IpcCommand(rg,"config/update"),new IpcCommand(rg,"scope/update");let rb=new IpcNotification(rg,"didChange");let PromosContext=class PromosContext{constructor(t){this.disposables=[],this._promos=new Map,this.ipc=t,this.disposables.push(this.ipc.onReceiveMessage(t=>{(rh.is(t)||ru.is(t)||rb.is(t))&&this._promos.clear()}))}async getApplicablePromo(t,r){let o=`${t}|${r}`,i=this._promos.get(o);return null==i&&(i=this.ipc.sendRequest(tL,{plan:t,location:r}).then(t=>t.promo,()=>void 0),this._promos.set(o,i)),await i}dispose(){this.disposables.forEach(t=>t.dispose())}};let TelemetryContext=class TelemetryContext{constructor(t){this.disposables=[],this.ipc=t}sendEvent(t){this.ipc.sendCommand(tT,t)}dispose(){this.disposables.forEach(t=>t.dispose())}};function rm(t){return(t=t.toString().toLowerCase()).includes("ms")?parseFloat(t):t.includes("s")?1e3*parseFloat(t):parseFloat(t)}function rf(t,r){return new Promise(o=>{t.addEventListener(r,function i(n){n.target===t&&(t.removeEventListener(r,i),o())})})}($||($={})).on=function(t,r,o,i){let n=!1;if("string"==typeof t){let a=function(r){let i=r?.target?.closest(t);null!=i&&o(r,i)};return document.addEventListener(r,a,i??!0),{dispose:()=>{n||(n=!0,document.removeEventListener(r,a,i??!0))}}}let a=function(t){o(t,this)};return t.addEventListener(r,a,i??!1),{dispose:()=>{n||(n=!0,t.removeEventListener(r,a,i??!1))}}};var rv=Uint8Array,ry=Uint16Array,rw=Int32Array,r_=new rv([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),rk=new rv([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),rx=new rv([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),r$=function(t,r){for(var o=new ry(31),i=0;i<31;++i)o[i]=r+=1<<t[i-1];for(var n=new rw(o[30]),i=1;i<30;++i)for(var a=o[i];a<o[i+1];++a)n[a]=a-o[i]<<5|i;return{b:o,r:n}},rC=r$(r_,2),rS=rC.b,rP=rC.r;rS[28]=258,rP[258]=28;var rO=r$(rk,0),rA=rO.b;rO.r;for(var rR=new ry(32768),rE=0;rE<32768;++rE){var rI=(43690&rE)>>1|(21845&rE)<<1;rI=(61680&(rI=(52428&rI)>>2|(13107&rI)<<2))>>4|(3855&rI)<<4,rR[rE]=((65280&rI)>>8|(255&rI)<<8)>>1}for(var rB=function(t,r,o){for(var i,n=t.length,a=0,c=new ry(r);a<n;++a)t[a]&&++c[t[a]-1];var h=new ry(r);for(a=1;a<r;++a)h[a]=h[a-1]+c[a-1]<<1;if(o){i=new ry(1<<r);var p=15-r;for(a=0;a<n;++a)if(t[a])for(var u=a<<4|t[a],g=r-t[a],b=h[t[a]-1]++<<g,m=b|(1<<g)-1;b<=m;++b)i[rR[b]>>p]=u}else for(a=0,i=new ry(n);a<n;++a)t[a]&&(i[a]=rR[h[t[a]-1]++]>>15-t[a]);return i},rL=new rv(288),rE=0;rE<144;++rE)rL[rE]=8;for(var rE=144;rE<256;++rE)rL[rE]=9;for(var rE=256;rE<280;++rE)rL[rE]=7;for(var rE=280;rE<288;++rE)rL[rE]=8;for(var rT=new rv(32),rE=0;rE<32;++rE)rT[rE]=5;var rM=rB(rL,9,1),rz=rB(rT,5,1),rD=function(t){for(var r=t[0],o=1;o<t.length;++o)t[o]>r&&(r=t[o]);return r},rj=function(t,r,o){var i=r/8|0;return(t[i]|t[i+1]<<8)>>(7&r)&o},rW=function(t,r){var o=r/8|0;return(t[o]|t[o+1]<<8|t[o+2]<<16)>>(7&r)},rN=function(t,r,o){return(null==r||r<0)&&(r=0),(null==o||o>t.length)&&(o=t.length),new rv(t.subarray(r,o))},rF=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],rU=function(t,r,o){var i=Error(r||rF[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,rU),!o)throw i;return i},rq=function(t,r,o,i){var n=t.length,a=i?i.length:0;if(!n||r.f&&!r.l)return o||new rv(0);var c=!o,h=c||2!=r.i,p=r.i;c&&(o=new rv(3*n));var u=function(t){var r=o.length;if(t>r){var i=new rv(Math.max(2*r,t));i.set(o),o=i}},g=r.f||0,b=r.p||0,m=r.b||0,f=r.l,v=r.d,w=r.m,_=r.n,x=8*n;do{if(!f){g=rj(t,b,1);var $=rj(t,b+1,3);if(b+=3,$)if(1==$)f=rM,v=rz,w=9,_=5;else if(2==$){var C=rj(t,b,31)+257,S=rj(t,b+10,15)+4,P=C+rj(t,b+5,31)+1;b+=14;for(var O=new rv(P),A=new rv(19),E=0;E<S;++E)A[rx[E]]=rj(t,b+3*E,7);b+=3*S;for(var B=rD(A),T=(1<<B)-1,M=rB(A,B,1),E=0;E<P;){var D=M[rj(t,b,T)];b+=15&D;var j=D>>4;if(j<16)O[E++]=j;else{var W=0,N=0;for(16==j?(N=3+rj(t,b,3),b+=2,W=O[E-1]):17==j?(N=3+rj(t,b,7),b+=3):18==j&&(N=11+rj(t,b,127),b+=7);N--;)O[E++]=W}}var F=O.subarray(0,C),U=O.subarray(C);w=rD(F),_=rD(U),f=rB(F,w,1),v=rB(U,_,1)}else rU(1);else{var j=((b+7)/8|0)+4,q=t[j-4]|t[j-3]<<8,G=j+q;if(G>n){p&&rU(0);break}h&&u(m+q),o.set(t.subarray(j,G),m),r.b=m+=q,r.p=b=8*G,r.f=g;continue}if(b>x){p&&rU(0);break}}h&&u(m+131072);for(var V=(1<<w)-1,K=(1<<_)-1,Y=b;;Y=b){var W=f[rW(t,b)&V],J=W>>4;if((b+=15&W)>x){p&&rU(0);break}if(W||rU(2),J<256)o[m++]=J;else if(256==J){Y=b,f=null;break}else{var X=J-254;if(J>264){var E=J-257,Q=r_[E];X=rj(t,b,(1<<Q)-1)+rS[E],b+=Q}var ee=v[rW(t,b)&K],et=ee>>4;ee||rU(3),b+=15&ee;var U=rA[et];if(et>3){var Q=rk[et];U+=rW(t,b)&(1<<Q)-1,b+=Q}if(b>x){p&&rU(0);break}h&&u(m+131072);var er=m+X;if(m<U){var eo=a-U,ei=Math.min(U,er);for(eo+m<0&&rU(3);m<ei;++m)o[m]=i[eo+m]}for(;m<er;++m)o[m]=o[m-U]}}r.l=f,r.p=Y,r.b=m,r.f=g,f&&(g=1,r.m=w,r.d=v,r.n=_)}while(!g)return m!=o.length&&c?rN(o,0,m):o.subarray(0,m)},rH=new rv(0),rG="u">typeof TextDecoder&&new TextDecoder;try{rG.decode(rH,{stream:!0})}catch{}var rV=function(t){for(var r="",o=0;;){var i=t[o++],n=(i>127)+(i>223)+(i>239);if(o+n>t.length)return{s:r,r:rN(t,o-1)};n?3==n?r+=String.fromCharCode(55296|(i=((15&i)<<18|(63&t[o++])<<12|(63&t[o++])<<6|63&t[o++])-65536)>>10,56320|1023&i):1&n?r+=String.fromCharCode((31&i)<<6|63&t[o++]):r+=String.fromCharCode((15&i)<<12|(63&t[o++])<<6|63&t[o++]):r+=String.fromCharCode(i)}};function rK(t,r){if(r){for(var o="",i=0;i<t.length;i+=16384)o+=String.fromCharCode.apply(null,t.subarray(i,i+16384));return o}if(rG)return rG.decode(t);var n=rV(t),a=n.s,o=n.r;return o.length&&rU(8),a}"function"==typeof queueMicrotask&&queueMicrotask;let rY=/\(([\s\S]*)\)/,rJ=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,rZ=/\s?=.*$/;function rX(t){var r,o;let i,n,a,c,h,p,u,g,b;return r="debug",h=!1,p=!0,null!=(o=t)&&({args:i,when:n,exit:a,prefix:c,onlyExit:h=!1,timing:p=!0}=o),u="object"==typeof p?p.warnAfter:1500,g=!1!==p||"object"==typeof h&&h.after>0,b="trace"===r?t3.trace:"debug"===r?t3.debug:t3.info,(t,o,p)=>{let m,f;if("function"==typeof p.value?(m=p.value,f="value"):"function"==typeof p.get&&(m=p.get,f="get"),null==m||null==f)throw Error("Not supported");let v=null==i?function(t){if("function"!=typeof t)throw Error("Not supported");if(0===t.length)return[];let r=Function.prototype.toString.call(t),o=(r=(r=r.replace(rJ,"")||r).slice(0,r.indexOf("{"))).indexOf("("),i=r.indexOf(")");o=o>=0?o+1:0,i=i>0?i:r.indexOf("="),r=r.slice(o,i),r=`(${r})`;let n=rY.exec(r);return null!=n?n[1].split(",").map(t=>t.trim().replace(rZ,"")):[]}(m):[];p[f]=function(...t){let p;if(!t3.enabled()||null!=n&&!n.apply(this,t))return m.apply(this,t);let f=t3.enabled(r),w=rl(),_=w?.scopeId,x=ri.next(),$=this!=null?function(t){let r;if("function"==typeof t){if(null==(r=t.prototype?.constructor))return t.name}else r=t.constructor;let o=r?.name??"",i=o.indexOf("_");-1!==i&&(o=o.substring(i+1));let n=r;for(;null!=n;){let r=t4.get(n);if(null!=r)return r(t,o);n=Object.getPrototypeOf(n)}return o}(this):void 0,C=$?`${ra(x,_)} ${$}.${o}`:`${ra(x,_)} ${o}`;null!=c&&(C=c({id:x,instance:this,instanceName:$??"",name:o,prefix:C},...t));let S=rn(x,_,C),P=!1,O=()=>(P||(P=!0,p=function(t,r,o){if(!1===t||!r.length)return;if("function"==typeof t){let o=t(...r);if(!1===o)return;let i="";for(let[t,r]of Object.entries(o))i.length&&(i+=", "),i+=`${t}=${t3.toLoggable(r,t)}`;return i||void 0}let i="",n=-1;for(let t of r){let r=o[++n];i.length&&(i+=", "),i+=r?`${r}=${t3.toLoggable(t,r)}`:t3.toLoggable(t)}return i||void 0}(i,t,v)),p);if(!h&&f){let t=O();b.call(t3,t?`${C}(${t})`:C)}if(h||g||null!=a){let r=g?t9():void 0,o=t=>{let o=void 0!==r?` [${re(r)}ms]`:"",i=S.getExitInfo();if(h){let r=O();t3.error(t,r?`${C}(${r})`:C,i?.details?`failed${i.details}${o}`:`failed${o}`)}else t3.error(t,C,i?.details?`failed${i.details}${o}`:`failed${o}`)},i=t=>{let o,i,n,c;null!=r?(o=re(r))>u?(i=t3.warn,n=` [*${o}ms] (slow)`):(i=b,n=` [${o}ms]`):(n="",i=b);let p=S.getExitInfo();if(null!=a)if("function"==typeof a)try{c=a(t)}catch(t){c=`@log.exit error: ${t}`}else!0===a&&(c=`returned ${t3.toLoggable(t)}`);else p?.failed?(c=p.failed,i=(t,...r)=>t3.error(null,t,...r)):c="completed";if(f||i!==b){let t=O();h?(!0===h||0===h.after||o>h.after)&&i.call(t3,t?`${C}(${t}) ${c}${p?.details||""}${n}`:`${C} ${c}${p?.details||""}${n}`):i.call(t3,t?`${C}(${t}) ${c}${p?.details||""}${n}`:`${C} ${c}${p?.details||""}${n}`)}};return rr(S,()=>{var r;let n;try{n=m.apply(this,t)}catch(t){throw o(t),t}return null!=n&&null!=(r=n)&&(r instanceof Promise||"function"==typeof r?.then)?n.then(i,o):i(n),n})}return rr(S,()=>m.apply(this,t))}}}Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(t,r,...o){let i;this._stopped=!1,this.logScope=null!=t&&"string"!=typeof t?t:rc(t??"",!1,r?.scopeLabel);let n=r?.log;if(i=null==n||!0===n?{}:!1===n||n.onlyExit?void 0:n,this.logLevel=("object"==typeof n?n.level:void 0)??"debug",this.logProvider=r?.provider??t6,this._time=t9(),null!=i){if(!this.logProvider.enabled(this.logLevel))return;o.length?this.logProvider.log(this.logLevel,this.logScope,`${i.message??""}${i.suffix??""}`,...o):this.logProvider.log(this.logLevel,this.logScope,`${i.message??""}${i.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return re(this._time)}log(t){this.logCore(t,!1)}restart(t){this.logCore(t,!0),this._time=t9(),this._stopped=!1}stop(t){this._stopped||(this.restart(t),this._stopped=!0)}logCore(t,r){if(!this.logProvider.enabled(this.logLevel))return;if(!r)return void this.logProvider.log(this.logLevel,this.logScope,`${t?.message??""}${t?.suffix??""}`);let o=re(this._time),i=t?.message??"";this.logProvider.log(o>250?"warn":this.logLevel,this.logScope,`${i?`${i} `:""}[${o}ms]${t?.suffix??""}`)}};(()=>{let t;var r,o,i={975:t=>{function r(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function o(t,r){for(var o,i="",n=0,a=-1,c=0,h=0;h<=t.length;++h){if(h<t.length)o=t.charCodeAt(h);else{if(47===o)break;o=47}if(47===o){if(a===h-1||1===c);else if(a!==h-1&&2===c){if(i.length<2||2!==n||46!==i.charCodeAt(i.length-1)||46!==i.charCodeAt(i.length-2)){if(i.length>2){var p=i.lastIndexOf("/");if(p!==i.length-1){-1===p?(i="",n=0):n=(i=i.slice(0,p)).length-1-i.lastIndexOf("/"),a=h,c=0;continue}}else if(2===i.length||1===i.length){i="",n=0,a=h,c=0;continue}}r&&(i.length>0?i+="/..":i="..",n=2)}else i.length>0?i+="/"+t.slice(a+1,h):i=t.slice(a+1,h),n=h-a-1;a=h,c=0}else 46===o&&-1!==c?++c:c=-1}return i}var i={resolve:function(){for(var t,i,n="",a=!1,c=arguments.length-1;c>=-1&&!a;c--)c>=0?t=arguments[c]:(void 0===i&&(i=process.cwd()),t=i),r(t),0!==t.length&&(n=t+"/"+n,a=47===t.charCodeAt(0));return n=o(n,!a),a?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(r(t),0===t.length)return".";var i=47===t.charCodeAt(0),n=47===t.charCodeAt(t.length-1);return 0!==(t=o(t,!i)).length||i||(t="."),t.length>0&&n&&(t+="/"),i?"/"+t:t},isAbsolute:function(t){return r(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,o=0;o<arguments.length;++o){var n=arguments[o];r(n),n.length>0&&(void 0===t?t=n:t+="/"+n)}return void 0===t?".":i.normalize(t)},relative:function(t,o){if(r(t),r(o),t===o||(t=i.resolve(t))===(o=i.resolve(o)))return"";for(var n=1;n<t.length&&47===t.charCodeAt(n);++n);for(var a=t.length,c=a-n,h=1;h<o.length&&47===o.charCodeAt(h);++h);for(var p=o.length-h,u=c<p?c:p,g=-1,b=0;b<=u;++b){if(b===u){if(p>u){if(47===o.charCodeAt(h+b))return o.slice(h+b+1);if(0===b)return o.slice(h+b)}else c>u&&(47===t.charCodeAt(n+b)?g=b:0===b&&(g=0));break}var m=t.charCodeAt(n+b);if(m!==o.charCodeAt(h+b))break;47===m&&(g=b)}var f="";for(b=n+g+1;b<=a;++b)b!==a&&47!==t.charCodeAt(b)||(0===f.length?f+="..":f+="/..");return f.length>0?f+o.slice(h+g):(h+=g,47===o.charCodeAt(h)&&++h,o.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(r(t),0===t.length)return".";for(var o=t.charCodeAt(0),i=47===o,n=-1,a=!0,c=t.length-1;c>=1;--c)if(47===(o=t.charCodeAt(c))){if(!a){n=c;break}}else a=!1;return -1===n?i?"/":".":i&&1===n?"//":t.slice(0,n)},basename:function(t,o){if(void 0!==o&&"string"!=typeof o)throw TypeError('"ext" argument must be a string');r(t);var i,n=0,a=-1,c=!0;if(void 0!==o&&o.length>0&&o.length<=t.length){if(o.length===t.length&&o===t)return"";var h=o.length-1,p=-1;for(i=t.length-1;i>=0;--i){var u=t.charCodeAt(i);if(47===u){if(!c){n=i+1;break}}else -1===p&&(c=!1,p=i+1),h>=0&&(u===o.charCodeAt(h)?-1==--h&&(a=i):(h=-1,a=p))}return n===a?a=p:-1===a&&(a=t.length),t.slice(n,a)}for(i=t.length-1;i>=0;--i)if(47===t.charCodeAt(i)){if(!c){n=i+1;break}}else -1===a&&(c=!1,a=i+1);return -1===a?"":t.slice(n,a)},extname:function(t){r(t);for(var o=-1,i=0,n=-1,a=!0,c=0,h=t.length-1;h>=0;--h){var p=t.charCodeAt(h);if(47!==p)-1===n&&(a=!1,n=h+1),46===p?-1===o?o=h:1!==c&&(c=1):-1!==o&&(c=-1);else if(!a){i=h+1;break}}return -1===o||-1===n||0===c||1===c&&o===n-1&&o===i+1?"":t.slice(o,n)},format:function(t){var r,o;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return r=t.dir||t.root,o=t.base||(t.name||"")+(t.ext||""),r?r===t.root?r+o:r+"/"+o:o},parse:function(t){r(t);var o={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return o;var i,n=t.charCodeAt(0),a=47===n;a?(o.root="/",i=1):i=0;for(var c=-1,h=0,p=-1,u=!0,g=t.length-1,b=0;g>=i;--g)if(47!==(n=t.charCodeAt(g)))-1===p&&(u=!1,p=g+1),46===n?-1===c?c=g:1!==b&&(b=1):-1!==c&&(b=-1);else if(!u){h=g+1;break}return -1===c||-1===p||0===b||1===b&&c===p-1&&c===h+1?-1!==p&&(o.base=o.name=0===h&&a?t.slice(1,p):t.slice(h,p)):(0===h&&a?(o.name=t.slice(1,c),o.base=t.slice(1,p)):(o.name=t.slice(h,c),o.base=t.slice(h,p)),o.ext=t.slice(c,p)),h>0?o.dir=t.slice(0,h-1):a&&(o.dir="/"),o},sep:"/",delimiter:":",win32:null,posix:null};i.posix=i,t.exports=i}},n={};function a(t){var r=n[t];if(void 0!==r)return r.exports;var o=n[t]={exports:{}};return i[t](o,o.exports,a),o.exports}a.d=(t,r)=>{for(var o in r)a.o(r,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},a.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),a.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var c={};(a.r(c),a.d(c,{URI:()=>l,Utils:()=>o}),"object"==typeof process)?t="win32"===process.platform:"object"==typeof navigator&&(t=navigator.userAgent.indexOf("Windows")>=0);let h=/^\w[\w\d+.-]*$/,p=/^\//,u=/^\/\//;function g(t,r){if(!t.scheme&&r)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`);if(t.scheme&&!h.test(t.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(t.path){if(t.authority){if(!p.test(t.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(u.test(t.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let b=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(t){return t instanceof l||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString}scheme;authority;path;query;fragment;constructor(t,r,o,i,n,a=!1){"object"==typeof t?(this.scheme=t.scheme||"",this.authority=t.authority||"",this.path=t.path||"",this.query=t.query||"",this.fragment=t.fragment||""):(this.scheme=t||a?t:"file",this.authority=r||"",this.path=function(t,r){switch(t){case"https":case"http":case"file":r?"/"!==r[0]&&(r="/"+r):r="/"}return r}(this.scheme,o||""),this.query=i||"",this.fragment=n||"",g(this,a))}get fsPath(){return _(this,!1)}with(t){if(!t)return this;let{scheme:r,authority:o,path:i,query:n,fragment:a}=t;return void 0===r?r=this.scheme:null===r&&(r=""),void 0===o?o=this.authority:null===o&&(o=""),void 0===i?i=this.path:null===i&&(i=""),void 0===n?n=this.query:null===n&&(n=""),void 0===a?a=this.fragment:null===a&&(a=""),r===this.scheme&&o===this.authority&&i===this.path&&n===this.query&&a===this.fragment?this:new d(r,o,i,n,a)}static parse(t,r=!1){let o=b.exec(t);return o?new d(o[2]||"",S(o[4]||""),S(o[5]||""),S(o[7]||""),S(o[9]||""),r):new d("","","","","")}static file(r){let o="";if(t&&(r=r.replace(/\\/g,"/")),"/"===r[0]&&"/"===r[1]){let t=r.indexOf("/",2);-1===t?(o=r.substring(2),r="/"):(o=r.substring(2,t),r=r.substring(t)||"/")}return new d("file",o,r,"","")}static from(t){let r=new d(t.scheme,t.authority,t.path,t.query,t.fragment);return g(r,!0),r}toString(t=!1){return x(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof l)return t;{let r=new d(t);return r._formatted=t.external,r._fsPath=t._sep===m?t.fsPath:null,r}}return t}};let m=t?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(t=!1){return t?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=m),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}};let f={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function v(t,r,o){let i,n=-1;for(let a=0;a<t.length;a++){let c=t.charCodeAt(a);if(c>=97&&c<=122||c>=65&&c<=90||c>=48&&c<=57||45===c||46===c||95===c||126===c||r&&47===c||o&&91===c||o&&93===c||o&&58===c)-1!==n&&(i+=encodeURIComponent(t.substring(n,a)),n=-1),void 0!==i&&(i+=t.charAt(a));else{void 0===i&&(i=t.substr(0,a));let r=f[c];void 0!==r?(-1!==n&&(i+=encodeURIComponent(t.substring(n,a)),n=-1),i+=r):-1===n&&(n=a)}}return -1!==n&&(i+=encodeURIComponent(t.substring(n))),void 0!==i?i:t}function w(t){let r;for(let o=0;o<t.length;o++){let i=t.charCodeAt(o);35===i||63===i?(void 0===r&&(r=t.substr(0,o)),r+=f[i]):void 0!==r&&(r+=t[o])}return void 0!==r?r:t}function _(r,o){let i;return i=r.authority&&r.path.length>1&&"file"===r.scheme?`//${r.authority}${r.path}`:47===r.path.charCodeAt(0)&&(r.path.charCodeAt(1)>=65&&90>=r.path.charCodeAt(1)||r.path.charCodeAt(1)>=97&&122>=r.path.charCodeAt(1))&&58===r.path.charCodeAt(2)?o?r.path.substr(1):r.path[1].toLowerCase()+r.path.substr(2):r.path,t&&(i=i.replace(/\//g,"\\")),i}function x(t,r){let o=r?w:v,i="",{scheme:n,authority:a,path:c,query:h,fragment:p}=t;if(n&&(i+=n,i+=":"),(a||"file"===n)&&(i+="/",i+="/"),a){let t=a.indexOf("@");if(-1!==t){let r=a.substr(0,t);a=a.substr(t+1),-1===(t=r.lastIndexOf(":"))?i+=o(r,!1,!1):(i+=o(r.substr(0,t),!1,!1),i+=":",i+=o(r.substr(t+1),!1,!0)),i+="@"}-1===(t=(a=a.toLowerCase()).lastIndexOf(":"))?i+=o(a,!1,!0):(i+=o(a.substr(0,t),!1,!0),i+=a.substr(t))}if(c){if(c.length>=3&&47===c.charCodeAt(0)&&58===c.charCodeAt(2)){let t=c.charCodeAt(1);t>=65&&t<=90&&(c=`/${String.fromCharCode(t+32)}:${c.substr(3)}`)}else if(c.length>=2&&58===c.charCodeAt(1)){let t=c.charCodeAt(0);t>=65&&t<=90&&(c=`${String.fromCharCode(t+32)}:${c.substr(2)}`)}i+=o(c,!0,!1)}return h&&(i+="?",i+=o(h,!1,!1)),p&&(i+="#",i+=r?p:v(p,!1,!1)),i}let $=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function S(t){return t.match($)?t.replace($,t=>(function t(r){try{return decodeURIComponent(r)}catch{return r.length>3?r.substr(0,3)+t(r.substr(3)):r}})(t)):t}var P=a(975);let O=P.posix||P;(r=o||(o={})).joinPath=function(t,...r){return t.with({path:O.join(t.path,...r)})},r.resolvePath=function(t,...r){let o=t.path,i=!1;"/"!==o[0]&&(o="/"+o,i=!0);let n=O.resolve(o,...r);return i&&"/"===n[0]&&!t.authority&&(n=n.substring(1)),t.with({path:n})},r.dirname=function(t){if(0===t.path.length||"/"===t.path)return t;let r=O.dirname(t.path);return 1===r.length&&46===r.charCodeAt(0)&&(r=""),t.with({path:r})},r.basename=function(t){return O.basename(t.path)},r.extname=function(t){return O.extname(t.path)},C=c})();let{URI:rQ,Utils:r0}=C;function r1(t,r){return JSON.parse(t,(t,o)=>(function(t,r){let o=function(t){if("object"!=typeof t||null==t)return;let r=t.__ipc;if(null!=r)switch(r){case"date":return"number"==typeof t.value?t:void 0;case"promise":return"object"==typeof t.value&&"string"==typeof t.value.id&&"string"==typeof t.value.method?t:void 0;case"uri":return"object"==typeof t.value&&"string"==typeof t.value?.scheme?t:void 0;default:return}}(t);if(null==o)return t;switch(o.__ipc){case"date":return new Date(o.value);case"promise":return r(o.value);case"uri":return rQ.revive(o.value)}})(o,r))}let r2="__supertalk_rpc__";function r5(t){return"object"==typeof t&&null!==t&&r2 in t&&!0===t[r2]}let r3=new TextEncoder,r4=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(t,r,o)=>{this.listeners??=new LinkedList;let i=this.listeners.push(null==r?t:[t,r]),n={dispose:()=>{n.dispose=Emitter._noop,this._disposed||i()}};return Array.isArray(o)&&o.push(n),n},this._event}fire(t){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let r=this.listeners.iterator(),o=r.next();!o.done;o=r.next())this._deliveryQueue.push([o.value,t]);for(;this._deliveryQueue.size>0;){let[t,r]=this._deliveryQueue.shift();try{"function"==typeof t?t(r):t[0].call(t[1],r)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let r6={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(t){this.element=t,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(t){return this._insert(t,!1)}push(t){return this._insert(t,!0)}_insert(t,r){let o=new events_Node(t);if(this._first===events_Node.Undefined)this._first=o,this._last=o;else if(r){let t=this._last;this._last=o,o.prev=t,t.next=o}else{let t=this._first;this._first=o,o.next=t,t.prev=o}this._size+=1;let i=!1;return()=>{i||(i=!0,this._remove(o))}}shift(){if(this._first===events_Node.Undefined)return;let t=this._first.element;return this._remove(this._first),t}pop(){if(this._last===events_Node.Undefined)return;let t=this._last.element;return this._remove(this._last),t}_remove(t){if(t.prev!==events_Node.Undefined&&t.next!==events_Node.Undefined){let r=t.prev;r.next=t.next,t.next.prev=r}else t.prev===events_Node.Undefined&&t.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):t.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):t.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let t,r=this._first;return{next:function(){return r===events_Node.Undefined?r6:(null==t?t={done:!1,value:r.element}:t.value=r.element,r=r.next,t)}}}toArray(){let t=[];for(let r=this._first;r!==events_Node.Undefined;r=r.next)t.push(r.element);return t}};var r8=Object.defineProperty,r7=Object.getOwnPropertyDescriptor,r9=(t,r)=>(r=Symbol[t])?r:Symbol.for("Symbol."+t),oe=t=>{throw TypeError(t)},ot=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?r7(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&r8(r,o,a),a};function or(){return h??=null!=p?p():acquireVsCodeApi()}let oo=t7();function oi(){return`webview:${oo.next()}`}let on=class{constructor(t){this.appName=t,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=or(),this._disposable=$.on(window,"message",t=>this.onMessageReceived(t))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var r,o,i,n,a,h,p,u,g=[];try{if(r5(t.data))return;let n=t.data,a=((t,r,o)=>{if(null!=r){var i,n;"object"!=typeof r&&"function"!=typeof r&&oe("Object expected"),o&&(i=r[r9("asyncDispose")]),void 0===i&&(i=r[r9("dispose")],o&&(n=i)),"function"!=typeof i&&oe("Object not disposable"),n&&(i=function(){try{n.call(this)}catch(t){return Promise.reject(t)}}),t.push([o,i,r])}else o&&t.push([o]);return r})(g,function(t,r,o){var i,n;let a,h,p;if(!t3.enabled())return;let u=(i=o?.scope??!0,n=o?.scopeLabel,h=ro(),c=(p=rc(t,i,n)).scopeId,rt.set(p.scopeId,p),p[Symbol.dispose]=()=>{let t;t=p?.scopeId??c,null!=t&&rt.delete(t),c=h?.scopeId},p);if(!r)return u;let g="debug",b=!1;"object"==typeof r&&(g=r.level??g,a=r.message,b=!0===r.onlyExit);let m=t9();b||rd(u,g,a??"");let f=u[Symbol.dispose];return u[Symbol.dispose]=()=>{let t=re(m),r=` [${t}ms]`,o=u.getExitInfo(),i=o.failed??"completed";null!=o.failed?t3.error(null,u,`${i}${o.details??""}${r}`):rd(u,g,`${i}${o.details??""}${r}`),f()},u}(`(e=${n.id}|${n.method})`,void 0,{scope:rl()})),h=function(t,r,...o){let i=("object"==typeof r?.log?r.log.level:void 0)??"info";return(r?.provider??t6).enabled(i)?new Stopwatch(t,r,...o):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(n.compressed&&n.params instanceof Uint8Array){if("deflate"===n.compressed)try{n.params=rK((i=n.params,rq(i,{i:2},void 0,void 0)))}catch(t){n.params=rK(n.params)}else n.params=rK(n.params);h?.restart({message:`\u2022 decompressed (${n.compressed}) serialized params`})}if("string"==typeof n.params?(n.params=r1(n.params,t=>this.getResponsePromise(t.method,t.id)),h?.stop({message:"• deserialized params"})):null==n.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-n.timestamp}ms`),null!=n.completionId){let t=(r=n.method,o=n.completionId,`${r}|${o}`);this._pendingHandlers.get(t)?.(n);return}this._onReceiveMessage.fire(n)}catch(t){var b=t,m=!0}finally{n=b,a=m,h="function"==typeof SuppressedError?SuppressedError:function(t,r,o,i){return(i=Error(o)).name="SuppressedError",i.error=t,i.suppressed=r,i},p=t=>n=a?new h(t,n,"An error was suppressed during disposal"):(a=!0,t),(u=t=>{for(;t=g.pop();)try{var r=t[1]&&t[1].call(t[2]);if(t[0])return Promise.resolve(r).then(u,t=>(p(t),u()))}catch(t){p(t)}if(a)throw n})()}}deserializeIpcData(t){return r1(t,t=>this.getResponsePromise(t.method,t.id))}sendCommand(t,r){let o=oi();this.postMessage({id:o,scope:t.scope,method:t.method,params:r,compressed:!1,timestamp:Date.now()})}async sendRequest(t,r){let o=oi(),i=this.getResponsePromise(t.response.method,o);return this.postMessage({id:o,scope:t.scope,method:t.method,params:r,compressed:!1,timestamp:Date.now(),completionId:o}),i}getResponsePromise(t,r){return new Promise((o,i)=>{var n,a;let c,h=(n=t,a=r,`${n}|${a}`);function p(){clearTimeout(c),c=void 0,this._pendingHandlers.delete(h)}c=setTimeout(()=>{p.call(this),i(Error(`Timed out waiting for completion of ${h}`))},(t3.isDebugging?60:5)*6e4),this._pendingHandlers.set(h,t=>{if(p.call(this),t.method===tM.method){let r=t.params;"rejected"===r.status?queueMicrotask(()=>i(Error(r.reason))):queueMicrotask(()=>o(r.value))}else queueMicrotask(()=>o(t.params))})})}setPersistedState(t){this._api.setState(t)}updatePersistedState(t){let r=this._api.getState();null!=r&&"object"==typeof r?(r={...r,...t},this._api.setState(r)):r=t,this.setPersistedState(r)}postMessage(t){this._api.postMessage(t)}};function os(t,r){let o=Math.pow(10,r);return Math.round(t*o)/o}ot([rX({args:t=>({e:`${t.data.id}|${t.data.method}`})})],on.prototype,"onMessageReceived",1),ot([rX({args:t=>({commandType:t.method})})],on.prototype,"sendCommand",1),ot([rX({args:t=>({requestType:t.method})})],on.prototype,"sendRequest",1),ot([rX({args:t=>({e:`${t.id}, method=${t.method}`})})],on.prototype,"postMessage",1),on=ot([(m=t=>`${t.appName}(HostIpc)`,t=>void t4.set(t,m))],on);let RGBA=class RGBA{constructor(t,r,o,i=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,t)),this.g=0|Math.min(255,Math.max(0,r)),this.b=0|Math.min(255,Math.max(0,o)),this.a=os(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.r===r.r&&t.g===r.g&&t.b===r.b&&t.a===r.a}};let HSLA=class HSLA{constructor(t,r,o,i){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=os(Math.max(Math.min(1,r),0),3),this.l=os(Math.max(Math.min(1,o),0),3),this.a=os(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.h===r.h&&t.s===r.s&&t.l===r.l&&t.a===r.a}static fromRGBA(t){let r=t.r/255,o=t.g/255,i=t.b/255,n=t.a,a=Math.max(r,o,i),c=Math.min(r,o,i),h=0,p=0,u=(c+a)/2,g=a-c;if(g>0){switch(p=Math.min(u<=.5?g/(2*u):g/(2-2*u),1),a){case r:h=(o-i)/g+6*(o<i);break;case o:h=(i-r)/g+2;break;case i:h=(r-o)/g+4}h*=60,h=Math.round(h)}return new HSLA(h,p,u,n)}static _hue2rgb(t,r,o){return(o<0&&(o+=1),o>1&&(o-=1),o<1/6)?t+(r-t)*6*o:o<.5?r:o<2/3?t+(r-t)*(2/3-o)*6:t}static toRGBA(t){let r,o,i,n=t.h/360,{s:a,l:c,a:h}=t;if(0===a)r=o=i=c;else{let t=c<.5?c*(1+a):c+a-c*a,h=2*c-t;r=HSLA._hue2rgb(h,t,n+1/3),o=HSLA._hue2rgb(h,t,n),i=HSLA._hue2rgb(h,t,n-1/3)}return new RGBA(Math.round(255*r),Math.round(255*o),Math.round(255*i),h)}};let HSVA=class HSVA{constructor(t,r,o,i){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=os(Math.max(Math.min(1,r),0),3),this.v=os(Math.max(Math.min(1,o),0),3),this.a=os(Math.max(Math.min(1,i),0),3)}static equals(t,r){return t.h===r.h&&t.s===r.s&&t.v===r.v&&t.a===r.a}static fromRGBA(t){let r=t.r/255,o=t.g/255,i=t.b/255,n=Math.max(r,o,i),a=n-Math.min(r,o,i);return new HSVA(Math.round(60*(0===a?0:n===r?((o-i)/a%6+6)%6:n===o?(i-r)/a+2:(r-o)/a+4)),0===n?0:a/n,n,t.a)}static toRGBA(t){let{h:r,s:o,v:i,a:n}=t,a=i*o,c=a*(1-Math.abs(r/60%2-1)),h=i-a,[p,u,g]=[0,0,0];return r<60?(p=a,u=c):r<120?(p=c,u=a):r<180?(u=a,g=c):r<240?(u=c,g=a):r<300?(p=c,g=a):r<=360&&(p=a,g=c),new RGBA(p=Math.round((p+h)*255),u=Math.round((u+h)*255),g=Math.round((g+h)*255),n)}};function oa(t,r){return r.getPropertyValue(t).trim()}let Color=class Color{static from(t){return t instanceof Color?t:parseColor(t)||Color.red}static fromCssVariable(t,r){return parseColor(oa(t,r))||Color.red}static fromHex(t){return parseHexColor(t)||Color.red}static equals(t,r){return!t&&!r||!!t&&!!r&&t.equals(r)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof RGBA)this.rgba=t;else if(t instanceof HSLA)this._hsla=t,this.rgba=HSLA.toRGBA(t);else if(t instanceof HSVA)this._hsva=t,this.rgba=HSVA.toRGBA(t);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(t){return null!=t&&!!t&&RGBA.equals(this.rgba,t.rgba)&&HSLA.equals(this.hsla,t.hsla)&&HSVA.equals(this.hsva,t.hsva)}getRelativeLuminance(){return os(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(t){let r=t/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}luminance(t){return luminance(this,t)}getContrastRatio(t){let r=this.getRelativeLuminance(),o=t.getRelativeLuminance();return r>o?(r+.05)/(o+.05):(o+.05)/(r+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(t){return this.getRelativeLuminance()>t.getRelativeLuminance()}isDarkerThan(t){return this.getRelativeLuminance()<t.getRelativeLuminance()}lighten(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r,g:o,b:i,a:n}=this.rgba;return new Color(new RGBA(r,o,i,n*t))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let r=t.rgba,o=this.rgba.a,i=r.a,n=o+i*(1-o);return n<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*o/n+r.r*i*(1-o)/n,this.rgba.g*o/n+r.g*i*(1-o)/n,this.rgba.b*o/n+r.b*i*(1-o)/n,n))}mix(t,r){return mixColors(this,t,r)}makeOpaque(t){if(this.isOpaque()||1!==t.rgba.a)return this;let{r,g:o,b:i,a:n}=this.rgba;return new Color(new RGBA(t.rgba.r-n*(t.rgba.r-r),t.rgba.g-n*(t.rgba.g-o),t.rgba.b-n*(t.rgba.b-i),1))}flatten(...t){let r=t.reduceRight((t,r)=>Color._flatten(r,t));return Color._flatten(this,r)}static _flatten(t,r){let o=1-t.rgba.a;return new Color(new RGBA(o*r.rgba.r+t.rgba.a*t.rgba.r,o*r.rgba.g+t.rgba.a*t.rgba.g,o*r.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString||(this._toString=function(t){return t.isOpaque()?`#${ol(t.rgba.r)}${ol(t.rgba.g)}${ol(t.rgba.b)}`:`rgba(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b}, ${Number(t.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(t,r,o){if(t.isLighterThan(r))return t;o=o||.5;let i=t.getRelativeLuminance(),n=r.getRelativeLuminance();return o=o*(n-i)/n,t.lighten(o)}static getDarkerColor(t,r,o){if(t.isDarkerThan(r))return t;o=o||.5;let i=t.getRelativeLuminance(),n=r.getRelativeLuminance();return o=o*(i-n)/i,t.darken(o)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function ol(t){let r=t.toString(16);return 2!==r.length?`0${r}`:r}let oc=new Emitter,od=oc.event;function oh(t){let r=document.documentElement,o=window.getComputedStyle(r),i=document.body.classList,n=i.contains("vscode-light")||i.contains("vscode-high-contrast-light"),a=i.contains("vscode-high-contrast")||i.contains("vscode-high-contrast-light"),c=oa("--vscode-editor-background",o),h=oa("--vscode-editor-foreground",o);return h||(h=oa("--vscode-foreground",o)),{colors:{background:c,foreground:h},computedStyle:o,isLightTheme:n,isHighContrastTheme:a,isInitializing:null==t}}var op=Object.defineProperty,ou=Object.getOwnPropertyDescriptor,og=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ou(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&op(r,o,a),a};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(t){let r=JSON.parse(tE.decode(function(t){let r=globalThis.atob(t),o=r.length,i=new Uint8Array(o),n=0,a=o-o%8;for(;n<a;n+=8)i[n]=r.charCodeAt(n),i[n+1]=r.charCodeAt(n+1),i[n+2]=r.charCodeAt(n+2),i[n+3]=r.charCodeAt(n+3),i[n+4]=r.charCodeAt(n+4),i[n+5]=r.charCodeAt(n+5),i[n+6]=r.charCodeAt(n+6),i[n+7]=r.charCodeAt(n+7);for(;n<o;n++)i[n]=r.charCodeAt(n);return i}(t))),o=r.webviewId,i=r.webviewInstanceId;this._webview={webviewId:o,webviewInstanceId:i,createCommandLink:(t,r)=>{var n;return t.endsWith(":")&&(t=`${t}${o.split(".").at(-1)}`),n=t,`command:${n}?${encodeURIComponent(JSON.stringify({webview:o,webviewInstance:i,...r}))}`}}}connectedCallback(){let t,r,o,i;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new on(this.name);let n=oh();if(null!=this.onThemeUpdated){let t;this.onThemeUpdated(n),this.disposables.push(((t=new MutationObserver(t=>{oc.fire(oh(t))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>t.disconnect()})),this.disposables.push(od(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(t=>{switch(!0){case tz.is(t):this.onWebviewFocusChanged?.(t.params.focused),window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case tD.is(t):this.onWebviewVisibilityChanged?.(t.params.visible),window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(o=0,i=tn(t=>{let r=`webview:${++o}`;or().postMessage({id:r,scope:tB.scope,method:tB.method,params:t,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:o=>{let n=o.composedPath().some(t=>"INPUT"===t.tagName);(!0!==t||r!==n)&&(t=!0,r=n,i({focused:!0,inputFocused:n}))},onFocusOut:o=>{(!1!==t||!1!==r)&&(t=!1,r=!1,i({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(t=>t.dispose())}render(){return e$`<slot></slot>`}};og([eD({type:String})],GlWebviewApp.prototype,"name",2),og([eD({type:String})],GlWebviewApp.prototype,"placement",2),og([O({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),og([O({context:"logger"})],GlWebviewApp.prototype,"_logger",2),og([O({context:"promos"})],GlWebviewApp.prototype,"_promos",2),og([O({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),og([O({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let ob=th(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends ob{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tI,{bootstrap:!1})}};let om=j`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;j`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${om}
	}
`;let of=j`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,ov=j`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`,oy=j`
	:focus-visible {
		${of}
	}
`,ow=j`
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
`;j`
	* {
		box-sizing: border-box;
	}
`;let o_=j`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${of}
	}
	a:hover {
		text-decoration: underline;
	}
`,ok=j`
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
`;function ox(){let t=[];return{signal:function(r){let o=tA(r);return t.push(()=>o.set(r)),o},resetAll:function(){for(let r of t)r()}}}j`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;let o$="__rk",oC="__ts",oS=new Set(["__v",o$,oC]);function oP(){}let VsCodeStorage=class VsCodeStorage{constructor(){this._api=or()}get(){return this._api.getState()}set(t){this._api.setState(t)}};function oO(){return{storage:new VsCodeStorage,createEndpoint:()=>{let t,r;return t=or(),r=new Map,{postMessage:function(r,o){let i={[r2]:!0,payload:r3.encode(JSON.stringify(r))};t.postMessage(i)},addEventListener:function(t,o){if("message"!==t)return;let i=t=>{let r=t.data;if(!r5(r))return;let{payload:i}=r;o(new MessageEvent("message",{data:i instanceof Uint8Array||i instanceof ArrayBuffer?JSON.parse(r4.decode(i)):i,origin:t.origin,lastEventId:t.lastEventId,source:t.source,ports:[...t.ports]}))};r.set(o,i),window.addEventListener("message",i)},removeEventListener:function(t,o){if("message"!==t)return;let i=r.get(o);i&&(window.removeEventListener("message",i),r.delete(o))},dispose:function(){for(let t of r.values())window.removeEventListener("message",t);r.clear()}}}}}let oA="__st__",oR=Symbol(),oE=Symbol(),oI=()=>{},oB=Symbol(),oL=Symbol();function oT(t){if(t instanceof Error){let r={name:t.name,message:t.message};return void 0!==t.stack&&(r.stack=t.stack),r}return{name:"Error",message:String(t)}}function oM(t){let r=Error(t.message);return r.name=t.name,r.stack=t.stack,r}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(t,r){super(`The nested ${t} at "${r}" cannot be cloned. Use nestedProxies: true.`),this.valueType=t,this.path=r,this.name="NonCloneableError"}};let Connection=class Connection{#d;#h;#p;#u;#g;#b=new Map;#m=0;#f=1;#v=!1;#y=new Map;#w=new WeakMap;#_=new Map;#k=new WeakMap;#x;#$=0;#C=new Map;#S=new Map;#P;#O=[];#A=!1;constructor(t,r={}){for(let o of(this.#d=t,this.#h=r.nestedProxies??!1,this.#p=r.debug??!1,this.#u=r.logger,this.#g=r.handlers??[],this.#P=r.batching??!1,this.#g))this.#b.set(o.wireType,o),"function"==typeof o.connect&&o.connect({sendMessage:t=>{this.#R(o.wireType,t)}});this.#x=new FinalizationRegistry(({id:t,session:r})=>{r===this.#$&&(this.#_.delete(t),this.#E({type:"release",id:t}))}),t.addEventListener("message",this.#I)}#E(t,r){if(!this.#v){if(!this.#P)return void this.#d.postMessage(t,r);this.#O.push({message:t,transfers:r}),this.#A||(this.#A=!0,queueMicrotask(()=>this.#B()))}}#B(){this.#A=!1;let t=this.#O;if(this.#O=[],0===t.length)return;let r=r=>{let o=r instanceof Error?r:Error(String(r));for(let{message:r}of t)if("call"===r.type&&void 0!==r.id){let t=this.#C.get(r.id);t&&(this.#C.delete(r.id),t.reject(o))}};if(1===t.length){let{message:o,transfers:i}=t[0];try{this.#d.postMessage(o,i)}catch(t){r(t)}}else{let o=[],i=[];for(let{message:r,transfers:n}of t)i.push(r),n&&o.push(...n);try{this.#d.postMessage({type:"batch",messages:i},o.length>0?o:void 0)}catch(t){r(t)}}}#R(t,r){let o=[];this.#E({type:"handler",wireType:t,payload:this.#L(r,"",o)},o)}#T(){let t=this.#m;return this.#m+=this.#f,t}expose(t){this.#f=2,this.#M(t),this.#E({type:"return",id:0,value:this.#z(t)})}#D(t){this.#O=[],this.#A=!1;let r=Error(t);for(let{reject:t}of this.#C.values())t(r);for(let{reject:t}of(this.#C.clear(),this.#S.values()))t(r);this.#S.clear()}close(){for(let t of(this.#v=!0,this.#D("Connection closed"),this.#d.removeEventListener("message",this.#I),this.#g))t.disconnect?.()}reset(t){for(let t of(this.#D("Connection reset"),this.#y.clear(),this.#w=new WeakMap,this.#_.clear(),this.#k=new WeakMap,this.#$++,this.#m=0,this.#f=1,this.#g))t.disconnect?.();for(let r of(void 0!==t&&t!==this.#d?(this.#v||this.#d.removeEventListener("message",this.#I),this.#d=t,t.addEventListener("message",this.#I)):this.#v&&this.#d.addEventListener("message",this.#I),this.#v=!1,this.#g))"function"==typeof r.connect&&r.connect({sendMessage:t=>{this.#R(r.wireType,t)}})}#j(t){if(t!==this.#$)throw Error("Stale proxy from previous session")}waitForReady(){return this.#m=1,this.#f=2,new Promise((t,r)=>{this.#C.set(0,{resolve:t,reject:r})})}#M(t){let r=this.#w.get(t);return void 0!==r||(r=this.#T(),this.#y.set(r,t),this.#w.set(t,r)),r}#W(t){return this.#y.get(t)}#N(t){return this.#_.get(t)?.deref()}#F(t){return this.#k.get(t)}#L(t,r,o){return"object"==typeof t?.[oB]?{[oA]:"property",...t[oB]}:this.#U(t,r,o,new Map)}#z(t,r=!1){return{[oA]:"proxy",id:this.#F(t)??this.#M(t),o:r}}#U(t,r,o,i,n){if(null==t||"object"!=typeof t&&"function"!=typeof t)return t;let a=i.get(t);if(void 0!==a)return a;if(t?.[oE]===!0){if(r&&this.#p&&!this.#h)throw new NonCloneableError("transfer",r);return o.includes(t.value)||o.push(t.value),i.set(t,t.value),t.value}if(t?.[oR]!==void 0){if(r&&this.#p&&!this.#h)throw new NonCloneableError("proxy",r);let o=this.#z(t[oR],t?.[oL]==="handle");return i.set(t,o),o}if("function"==typeof t){if(r&&this.#p&&!this.#h)throw new NonCloneableError("function",r);let o=this.#z(t);return i.set(t,o),o}if(void 0!==this.#F(t)){let r=this.#z(t,"__o"in t);return i.set(t,r),r}if("function"==typeof t?.then){if(r&&this.#p&&!this.#h)throw new NonCloneableError("promise",r);let o={[oA]:"promise",id:this.#q(t)};return i.set(t,o),o}if(this.#g.length>0){for(let a of this.#g)if(a.canHandle(t)){let c={toWire:(t,a)=>{let c=a?r?`${r}.${a}`:a:r;return this.#U(t,c,o,i,n)},...void 0!==n&&{callId:n}},h=a.toWire(t,c);return i.set(t,h),h}}if(!(this.#h||this.#p))return t;if(Array.isArray(t)){let a=[];i.set(t,a);for(let c=0;c<t.length;c++)a.push(this.#U(t[c],`${r}[${String(c)}]`,o,i,n));return a}let c=Object.getPrototypeOf(t);if(c===Object.prototype||null===c){let a={};for(let c of(i.set(t,a),Object.keys(t)))a[c]=this.#U(t[c],r?`${r}.${c}`:c,o,i,n);return a}return t}#H(t){return{fromWire:r=>this.#G(r,t)}}#V(t){let r=t?.[oA];if("property"===r){let r=this.#W(t.targetProxyId);if(!r)throw ReferenceError(`Proxy property target ${String(t.targetProxyId)} not found`);return r[t.property]}if("thrown"===r)throw oM(t.error);return this.#G(t,new Map)}#G(t,r){if(null===t||"object"!=typeof t)return t;let o=r.get(t);if(void 0!==o)return o;if(t?.[oA]==="proxy"){let o=this.#W(t.id);if(o){let i=t.o?{[oR]:o,[oL]:"handle",__nc:oI}:new Proxy(oI,{get:(t,r)=>{var i,n,a;let c;return r===oR?o:r===oL?"proxy":"then"!==r?(i=o,n=r,a=o[r],(c=(...t)=>{if("function"==typeof a)return Promise.resolve(a.apply(i,t));throw TypeError(`${String(n)} is not a function`)}).then=(t,r)=>Promise.resolve(a).then(t,r),c):void 0},set:(t,r,i)=>(o[r]=i,!0),apply(t,r,i){if("function"==typeof o)return Promise.resolve(o(...i));throw TypeError("Proxy target is not callable")}});return r.set(t,i),i}let i=this.#N(t.id)??this.#K(t.id,t.o);return r.set(t,i),i}if(t?.[oA]==="promise"){let{promise:o,resolve:i,reject:n}=Promise.withResolvers();return this.#S.set(t.id,{resolve:i,reject:n}),r.set(t,o),o}let i=t[oA];if("string"==typeof i){let o=this.#b.get(i);if(o?.fromWire){let i=o.fromWire(t,this.#H(r));return r.set(t,i),i}}if(!this.#h)return t;if(Array.isArray(t)){let o=[];for(let i of(r.set(t,o),t))o.push(this.#G(i,r));return o}if(Object.getPrototypeOf(t)!==Object.prototype)return t;let n={};for(let o of(r.set(t,n),Object.keys(t)))n[o]=this.#G(t[o],r);return n}#q(t){let r=this.#T();return t.then(t=>{try{let o=[],i=this.#L(t,"",o);this.#E({type:"resolve",id:r,value:i},o)}catch{this.#E({type:"reject",id:r,error:oT(Error("Failed to serialize resolved promise value"))})}},t=>{try{this.#E({type:"reject",id:r,error:oT(t)})}catch{}}),r}#K(t,r){let o=this.#N(t);if(void 0===o){let i=this.#$;o=r?{__o:oI}:new Proxy(oI,{apply:(r,o,n)=>(this.#j(i),this.#Y(t,void 0,n)),get:(r,o)=>"string"==typeof o&&"then"!==o?this.#J(t,o,i):void 0,set:(r,o,n)=>{if("string"!=typeof o)return!1;this.#j(i);let a=[];return this.#Z(this.#T(),t,"set",o,[this.#L(n,"",a)],a).catch(()=>{}),!0}}),this.#_.set(t,new WeakRef(o)),this.#k.set(o,t),this.#x.register(o,{id:t,session:this.#$})}return o}#J(t,r,o){let i=(...i)=>(this.#j(o),this.#Y(t,r,i));return i.then=(i,n)=>(this.#j(o),this.#Z(this.#T(),t,"get",r,[],[]).then(i,n)),i[oB]={targetProxyId:t,property:r},i}#Z(t,r,o,i,n,a){let{promise:c,resolve:h,reject:p}=Promise.withResolvers();this.#C.set(t,{resolve:h,reject:p});try{this.#E({type:"call",id:t,target:r,action:o,method:i,args:n},a)}catch(r){this.#C.delete(t),p(r instanceof Error?r:Error(String(r)))}return c}#Y(t,r,o){let i=[],n=new Map,a=this.#T();return this.#Z(a,t,"call",r,o.map(t=>this.#U(t,"",i,n,a)),i)}#I=t=>{let r=t.data;if(null!=r)if("batch"===r.type)for(let t of r.messages)this.#X(t);else this.#X(r)};#X(t){switch(t.type){case"release":{let r=this.#y.get(t.id);void 0!==r&&(this.#y.delete(t.id),this.#w.delete(r));break}case"resolve":this.#Q(this.#S,t.id,t.value);break;case"reject":this.#ee(this.#S,t.id,t.error);break;case"return":this.#Q(this.#C,t.id,t.value),this.#et(t.id);break;case"throw":this.#ee(this.#C,t.id,t.error),this.#et(t.id);break;case"call":this.#er(t);break;case"handler":this.#eo(t.wireType,t.payload)}}#Q(t,r,o){let i=t.get(r);if(i){t.delete(r);try{i.resolve(this.#V(o))}catch(t){i.reject(t instanceof Error?t:Error(String(t)))}}}#ee(t,r,o){let i=t.get(r);i&&(t.delete(r),i.reject(oM(o)))}#et(t){for(let r of this.#g)r.onCallSettle?.(t)}#eo(t,r){try{let o=this.#b.get(t);if(o?.onMessage){let t=new Map;o.onMessage(this.#G(r,t),this.#H(t))}}catch(r){this.#u?.error?.(`Error in handler.onMessage for wireType "${t}":`,r)}}async #er(t){let{id:r,target:o,method:i,args:n,action:a}=t,c=new Map,h=n.map(t=>this.#G(t,c)),p=this.#W(o);if(!p)return this.#E({type:"throw",id:r,error:{name:"ReferenceError",message:`Proxy target ${String(o)} not found`}});let u=this.#u,g=u?.debug?performance.now():0;try{let t;if("get"===a){if(void 0===i)throw TypeError("Property name required for get action");t=p[i]}else if("set"===a){if(void 0===i)throw TypeError("Property name required for set action");p[i]=h[0],t=void 0}else if(void 0===i){if("function"!=typeof p)throw TypeError("Target is not callable");t=await p(...h)}else{let r=p[i];if("function"!=typeof r)throw TypeError(`${i} is not a function`);t=await r.apply(p,h)}let o=[],n=this.#L(t,"",o);this.#E({type:"return",id:r,value:n},o),u?.debug?.(`${a} ${i??"(direct)"} completed`,{duration:performance.now()-g})}catch(t){u?.debug?.(`${a} ${i??"(direct)"} failed`,{duration:performance.now()-g,error:t}),this.#E({type:"throw",id:r,error:oT(t)})}}};let oz="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=oz;#ei;#en=0;#m=1;#es=new WeakMap;#ea=new Map;#el=new Map;#ec=new FinalizationRegistry(({id:t,session:r})=>{r!==this.#en||this.#el.has(t)&&(this.#el.delete(t),this.#ea.delete(t),this.#ei?.sendMessage({type:"release",id:t}))});#ed=new Map;canHandle(t){return t instanceof AbortSignal}toWire(t,r){if(t.aborted)return{[oA]:oz,id:0,aborted:!0,reason:t.reason};let o=this.#es.get(t);if(void 0!==o)return{[oA]:oz,id:o,aborted:!1};o=this.#m++,this.#es.set(t,o),this.#ea.set(o,new WeakRef(t)),this.#ec.register(t,{id:o,session:this.#en},t);let i=new WeakRef(t),n=o,a=()=>{let t=i.deref(),r=t?.reason;"completed"===r?this.#ei?.sendMessage({type:"release",id:n}):this.#ei?.sendMessage({type:"abort",id:n,reason:r}),void 0!==t&&this.#ec.unregister(t),this.#eh(n)};return t.addEventListener("abort",a,{once:!0}),this.#el.set(o,a),{[oA]:oz,id:o,aborted:!1}}fromWire(t){if(t.aborted)return AbortSignal.abort(t.reason);let r=this.#ed.get(t.id);if(void 0!==r)return r.signal;let o=new AbortController;return this.#ed.set(t.id,o),o.signal}connect(t){this.#ei=t}onMessage(t){"abort"===t.type?(this.#ed.get(t.id)?.abort(t.reason),this.#ed.delete(t.id)):"release"===t.type&&this.#ed.delete(t.id)}disconnect(){for(let t of(this.#ei=void 0,this.#ed.values()))t.abort("disconnected");for(let[t,r]of(this.#ed.clear(),this.#el)){let o=this.#ea.get(t)?.deref();void 0!==o&&(o.removeEventListener("abort",r),this.#ec.unregister(o))}this.#el.clear(),this.#ea.clear(),this.#en++,this.#es=new WeakMap,this.#m=1}#eh(t){this.#el.delete(t),this.#ea.delete(t)}get _sentCount(){return this.#ea.size}get _receivedCount(){return this.#ed.size}};let RemoteSignal=class RemoteSignal{#ep;#eu;#eg;constructor(t,r,o){this.#eu=t,this.#eg=o,this.#ep=new x.State(r,{[x.subtle.watched]:()=>{this.#eg?.(this.#eu,!0)},[x.subtle.unwatched]:()=>{this.#eg?.(this.#eu,!1)}})}get(){return this.#ep.get()}set(t){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#eu}_update(t){this.#ep.set(t)}};let oD="signal";let SignalHandler=class SignalHandler{wireType=oD;#eb;#ei;#en=0;#em=1;#ea=new Map;#es=new WeakMap;#ef;#A=!1;#ev=new Map;#ey=new Map;#ew=new Map;#e_=new Map;#x=new FinalizationRegistry(({signalId:t,session:r})=>{r===this.#en&&(this.#ew.delete(t),this.#ei?.sendMessage({type:"signal:release",signalId:t}))});constructor(t={}){this.#eb=t.autoWatch??!1}connect(t){this.#ei=t}onMessage(t){(null!==t&&"object"==typeof t&&"type"in t?"signal:batch"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:release"!==t.type:1)?(null!==t&&"object"==typeof t&&"type"in t?"signal:watch"!==t.type:1)?null!==t&&"object"==typeof t&&"type"in t&&"signal:unwatch"===t.type&&this.#ek(t.signalId):this.#ex(t.signalId):this.releaseSignal(t.signalId):this.#e$(t)}disconnect(){this.#ei=void 0,this.#A=!1,void 0!==this.#ef&&(this.#ef.unwatch(...this.#ev.values()),this.#ef=void 0),this.#ea.clear(),this.#ev.clear(),this.#ey.clear(),this.#ew.clear(),this.#e_.clear(),this.#en++,this.#es=new WeakMap,this.#em=1}canHandle(t){return t instanceof x.State||t instanceof x.Computed}toWire(t,r){return this.#eC(t,r)}fromWire(t,r){return this.#eS(t,r)}#eC(t,r){let o=this.#es.get(t);return void 0===o&&(o=this.#em++,this.#ea.set(o,t),this.#es.set(t,o),this.#eb&&this.#ex(o)),{[oA]:oD,signalId:o,value:r.toWire(t.get())}}#eS(t,r){let o=r.fromWire(t.value),i=this.#ew.get(t.signalId),n=i?.deref();if(void 0!==n)return n._update(o),n;let a=this.#e_.get(t.signalId);this.#e_.delete(t.signalId);let c=new RemoteSignal(t.signalId,void 0!==a?a:o,this.#eP);return this.#ew.set(t.signalId,new WeakRef(c)),this.#x.register(c,{signalId:t.signalId,session:this.#en}),c}#eP=(t,r)=>{void 0!==this.#ei&&(r?this.#ei.sendMessage({type:"signal:watch",signalId:t}):this.#ei.sendMessage({type:"signal:unwatch",signalId:t}))};#ex(t){if(this.#ev.has(t))return;let r=this.#ea.get(t);if(void 0===r)return;let o=this.#eO(),i=new x.Computed(()=>r.get());this.#ev.set(t,i),this.#ey.set(i,t),o.watch(i);let n=i.get();this.#ei?.sendMessage({type:"signal:batch",updates:[{signalId:t,value:n}]})}#ek(t){let r=this.#ev.get(t);void 0!==r&&(this.#ef?.unwatch(r),this.#ev.delete(t),this.#ey.delete(r))}#eO(){return this.#ef??=new x.subtle.Watcher(()=>{this.#A||(this.#A=!0,queueMicrotask(this.#B))})}#B=()=>{if(this.#A=!1,void 0===this.#ef||void 0===this.#ei)return;let t=this.#ef.getPending(),r=[];for(let o of t){let t=this.#ey.get(o);if(void 0!==t&&this.#ea.has(t)){let i=o.get();r.push({signalId:t,value:i})}}this.#ef.watch(),r.length>0&&this.#ei.sendMessage({type:"signal:batch",updates:r})};#e$(t){for(let r of t.updates){let t=this.#ew.get(r.signalId),o=t?.deref();void 0!==o?o._update(r.value):this.#e_.set(r.signalId,r.value)}}releaseSignal(t){let r=this.#ev.get(t);void 0!==r&&(this.#ef?.unwatch(r),this.#ev.delete(t),this.#ey.delete(r)),this.#ea.delete(t)}get _sentSignalCount(){return this.#ea.size}get _remoteSignalCount(){return this.#ew.size}_isWatching(t){return this.#ev.has(t)}};let oj="__st__",oW=[{wireType:"date",canHandle:function(t){return t instanceof Date},toWire:function(t){return{[oj]:"date",value:t.getTime()}},fromWire:function(t){return new Date(t.value)}},{wireType:"map",canHandle:function(t){return t instanceof Map},toWire:function(t,r){let o=[];for(let[i,n]of t)o.push([r.toWire(i),r.toWire(n)]);return{[oj]:"map",entries:o}},fromWire:function(t,r){let o=new Map;for(let i of t.entries){let[t,n]=i;o.set(r.fromWire(t),r.fromWire(n))}return o}},{wireType:"set",canHandle:function(t){return t instanceof Set},toWire:function(t,r){let o=[];for(let i of t)o.push(r.toWire(i));return{[oj]:"set",values:o}},fromWire:function(t,r){let o=new Set;for(let i of t.values)o.add(r.fromWire(i));return o}},{wireType:"regexp",canHandle:function(t){return t instanceof RegExp},toWire:function(t){return{[oj]:"regexp",source:t.source,flags:t.flags}},fromWire:function(t){return new RegExp(t.source,t.flags)}}];function oN(t){return"string"==typeof t[0]?[t[0],t.slice(1)]:[t.map(String).join(" "),[]]}let oF={debug:(...t)=>{let[r,o]=oN(t);t3.debug(r,...o)},warn:(...t)=>{let[r,o]=oN(t);t3.warn(r,...o)},error:(...t)=>{let[r,o]=oN(t),i=o.find(t=>t instanceof Error);t3.error(i,r)}};async function oU(t){let r,o,i,n=t?.endpoint?.()??(u??=oO()).createEndpoint(),a=new Connection(n,{handlers:[...oW,new SignalHandler({autoWatch:t?.autoWatchSignals}),new AbortSignalHandler,...t?.handlers??[]],nestedProxies:t?.nestedProxies??!0,debug:t?.debug,batching:!0,logger:oF}),c=t?.timeout??1e4,h=()=>{null!=r&&(clearTimeout(r),r=void 0),null!=o&&(clearTimeout(o),o=void 0),null!=i&&(t?.signal?.removeEventListener("abort",i),i=void 0)},p=()=>{h(),a.close(),n.dispose()},g=()=>{let r=t?.signal?.reason;return r instanceof Error?r:Error("RPC connection aborted")};try{if(t?.signal?.aborted)throw g();t3.debug("RpcClient: Connecting to host..."),r=setTimeout(()=>t3.warn(`RpcClient: Connection still pending after ${c/2}ms`),c/2);let n=await Promise.race([a.waitForReady(),new Promise((t,r)=>o=setTimeout(()=>r(Error(`RPC connection timed out after ${c}ms`)),c)),...t?.signal!=null?[new Promise((r,o)=>{i=()=>o(g()),t.signal.addEventListener("abort",i,{once:!0})})]:[]]);return h(),t3.debug("RpcClient: Connected to host successfully"),{services:n,dispose:()=>{t3.debug("RpcClient: Disposing connection..."),p()}}}catch(t){throw p(),t3.error(t,"RpcClient: Failed to connect to host"),t}}let RpcController=class RpcController{constructor(t,r){this.host=t,this.options=r,t.addController(this)}get services(){return this._services}hostConnected(){this._connectionAbort?.abort(),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(t){try{let{services:r,dispose:o}=await oU({...this.options?.rpcOptions,signal:t});if(t.aborted)return void o();if(this._services=r,this._disposeRpc=o,this.options?.onReady!=null)try{await this.options.onReady(r)}catch(t){throw o(),this._disposeRpc=void 0,this._services=void 0,t}}catch(o){if(t.aborted)return;let r=o instanceof Error?o:Error(String(o));t3.error(r,"RpcController: Failed to connect"),this.options?.onError!=null&&this.options.onError(r)}}};function oq(t,r){let o,i,n=r?.cancelPrevious??!0,a=tA(r?.initialValue),c=tA(!1),h=tA(void 0),p=tA(!1),u=new x.Computed(()=>c.get()?"loading":null!=h.get()?"error":p.get()?"success":"idle"),g=!1,b=0,m=0;function f(){null!=o&&(o.abort(),o=void 0),c.set(!1)}async function v(...r){if(g)return;n&&f(),i=r;let u=new AbortController,w=++b;m=w,o=u,c.set(!0),h.set(void 0);try{let o=await t(u.signal,...r);if(u.signal.aborted||w!==m)return;a.set(o),p.set(!0)}catch(t){if(u.signal.aborted||w!==m)return;h.set(t instanceof Error?t.message:String(t))}finally{o===u&&(o=void 0,c.set(!1))}}async function w(){if(null!=i)return v(...i)}return{value:a,loading:c,error:h,status:{get:()=>u.get()},generationId:{get:()=>m},fetch:v,refetch:w,mutate:function(t){g||(a.set(t),h.set(void 0),p.set(!0))},cancel:f,dispose:function(){g=!0,f()}}}let oH=t=>{if(null!=t){let r=t instanceof Error?t.message:"unknown error";t3.warn(`RPC call rejected (noop handler): ${r}`)}};async function oG(t,r,o){let i=r=>{t.overviewFilter.set(r),o?.(r)},n=t.overviewFilter.get();i(n);try{await r.setOverviewFilter(n),i(await r.getOverviewFilterState())}catch(t){t3.error(t,"Home: Failed to restore overview filter")}}async function oV(t,r){try{let o=t.overviewRepositoryPath.get();if(null!=o){let i=await r.setOverviewRepository(o);t.overviewRepositoryPath.set(i);return}let i=await r.getOverviewRepositoryState();null!=i&&t.overviewRepositoryPath.set(i)}catch(t){t3.error(t,"Home: Failed to restore overview repository path")}}async function oK(t,r){t.launchpadLoading.set(!0);try{let o=await r.getSummary();t.launchpadSummary.set(o)}catch(r){t3.error(r,"Home: Failed to fetch launchpad summary"),t.launchpadSummary.set({error:r instanceof Error?r:Error("Failed to load")})}finally{t.launchpadLoading.set(!1)}}async function oY(t){let r=await Promise.allSettled(t.map(t=>t())),o=[];for(let t of r)"fulfilled"===t.status&&"function"==typeof t.value?o.push(t.value):"rejected"===t.status&&t3.error(t.reason,"Failed to subscribe");return()=>{for(let t of o)try{t()}catch(t){t3.error(t,"Failed to unsubscribe")}}}let oJ=j`
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
`,oZ=j`
	.home {
		padding: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		overflow: hidden;
	}

	.home__alerts {
		flex: none;
		padding: 0 2rem;
		position: relative;
	}
	.home__alerts:not([has-alerts]) {
		display: none;
	}

	.home__main {
		flex: 1;
		overflow: auto;
		padding: 0.8rem 1.2rem;
	}
	.home__main > *:last-child {
		margin-bottom: 0;
	}

	.home__aux,
	.home__header {
		flex: none;
	}

	.home__header {
		border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
		border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border);
		padding: 0.4rem;
	}

	.home__aux:has(gl-promo-banner:has(gl-promo:not([has-promo])):only-child) {
		display: none;
	}

	summary {
		font-size: 1.3rem;
		font-weight: normal;
		text-transform: uppercase;
		color: var(--vscode-foreground);
		cursor: pointer;
	}

	details[open] summary {
		margin-block-end: 0.8rem;
	}

	gl-home-header {
		margin: 0;
	}

	gl-repo-alerts:not([has-alerts]) {
		display: none;
	}
`;j`
	.button-container {
		margin: 1rem auto 0;
		text-align: left;
		max-width: 30rem;
		transition: max-width 0.2s ease-out;
	}

	@media (min-width: 640px) {
		.button-container {
			max-width: 100%;
		}
	}
	.button-container--trio > gl-button:first-child {
		margin-bottom: 0.4rem;
	}

	.button-group {
		display: inline-flex;
		gap: 0.4rem;
	}
	.button-group--single {
		width: 100%;
		max-width: 30rem;
	}
	.button-group gl-button {
		margin-top: 0;
	}
	.button-group gl-button:not(:first-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.button-group gl-button:not(:last-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;let oX=j`
	.alert {
		position: relative;
		padding: 0.8rem 1.2rem;
		line-height: 1.2;
		margin-bottom: 1.2rem;
		background-color: var(--color-alert-neutralBackground);
		border-left: 0.3rem solid var(--color-alert-neutralBorder);
		color: var(--color-alert-foreground);
	}
	.alert__title {
		font-size: 1.4rem;
		margin: 0;
	}
	.alert__description {
		font-size: 1.2rem;
		margin: 0.4rem 0 0;
	}
	.alert__description > :first-child {
		margin-top: 0;
	}
	.alert__description > :last-child {
		margin-bottom: 0;
	}
	.alert__close {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		color: inherit;
		opacity: 0.64;
	}
	.alert__close:hover {
		color: inherit;
		opacity: 1;
	}
	.alert.is-collapsed {
		cursor: pointer;
	}
	.alert.is-collapsed:hover {
		background-color: var(--color-alert-neutralHoverBackground);
	}
	.alert.is-collapsed .alert__description,
	.alert.is-collapsed .alert__close gl-tooltip:first-child,
	.alert:not(.is-collapsed) .alert__close gl-tooltip:last-child {
		display: none;
	}
	.alert--info {
		--color-alert-foreground: var(--color-alert-infoForeground);
		background-color: var(--color-alert-infoBackground);
		border-left-color: var(--color-alert-infoBorder);
	}
	.alert--warning {
		--color-alert-foreground: var(--color-alert-warningForeground);
		background-color: var(--color-alert-warningBackground);
		border-left-color: var(--color-alert-warningBorder);
	}
	.alert--danger {
		--color-alert-foreground: var(--color-alert-errorForeground);
		background-color: var(--color-alert-errorBackground);
		border-left-color: var(--color-alert-errorBorder);
	}
	.alert a:not(:hover) {
		color: color-mix(in srgb, var(--color-alert-foreground) 50%, var(--vscode-textLink-foreground));
	}
	.alert a:hover {
		color: color-mix(in srgb, var(--color-alert-foreground) 50%, var(--vscode-textLink-activeForeground));
	}
`,oQ=j`
	a,
	a:hover,
	a:focus,
	a:active {
		text-decoration: none;
	}

	.walkthrough-progress {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 2px 4px 4px;
		margin-top: 4px;
		align-items: stretch;
		cursor: pointer;
		border-radius: 4px;
	}
	.walkthrough-progress:focus-within,
	.walkthrough-progress:hover {
		background-color: var(--gl-walkthrough-hover-background);
	}

	.walkthrough-progress__title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--color-foreground--85);
	}
	.walkthrough-progress__button {
		--button-padding: 1px 2px 0px 2px;
		position: absolute;
		right: 0.4rem;
	}
	.walkthrough-progress__bar::-webkit-progress-bar {
		border-radius: 2px;
		background: var(--color-alert-neutralBackground);
	}
	.walkthrough-progress__bar::-webkit-progress-value {
		background: var(--vscode-progressBar-background, blue);
		transition: 0.1s ease-in;
		border-radius: 2px;
	}
	.walkthrough-progress__bar {
		pointer-events: none;
		border-radius: 2px;
		width: 100%;
		background: unset;
		height: 4px;
		flex-shrink: 0;
		z-index: 2;
	}
`,o0={recent:{threshold:"OneWeek"},stale:{threshold:"OneYear",show:!1,limit:9}};function o1(t,r,o){return t?r(t):o?.(t)}var o2=((f=o2||{}).AngleBracketLeftHeavy="❰",f.AngleBracketRightHeavy="❱",f.ArrowBack="↩",f.ArrowDown="↓",f.ArrowDownUp="⇵",f.ArrowDropRight="⤷",f.ArrowHeadRight="➤",f.ArrowLeft="←",f.ArrowLeftDouble="⇐",f.ArrowLeftRight="↔",f.ArrowLeftRightDouble="⇔",f.ArrowLeftRightDoubleStrike="⇎",f.ArrowLeftRightLong="⟷",f.ArrowRight="→",f.ArrowRightDouble="⇒",f.ArrowRightHollow="⇨",f.ArrowUp="↑",f.ArrowUpDown="⇅",f.ArrowUpRight="↗",f.ArrowsHalfLeftRight="⇋",f.ArrowsHalfRightLeft="⇌",f.ArrowsLeftRight="⇆",f.ArrowsRightLeft="⇄",f.Asterisk="∗",f.Bullseye="◎",f.Check="✔",f.Dash="—",f.Dot="•",f.Ellipsis="…",f.EnDash="–",f.Envelope="✉",f.EqualsTriple="≡",f.Flag="⚑",f.FlagHollow="⚐",f.MiddleEllipsis="⋯",f.MuchLessThan="≪",f.MuchGreaterThan="≫",f.Pencil="✎",f.Space=" ",f.SpaceThin=" ",f.SpaceThinnest=" ",f.SquareWithBottomShadow="❏",f.SquareWithTopShadow="❐",f.Warning="⚠",f.ZeroWidthSpace="​",f);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var o5=((v=o5||{}).File="file",v.Git="git",v.GitHub="github",v.GitLens="gitlens",v.GitLensAIMarkdown="gitlens-ai-markdown",v.PRs="pr",v.Remote="vscode-remote",v.Vsls="vsls",v.VslsScc="vsls-scc",v.Virtual="vscode-vfs",v);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let o3="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",o4=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${o3}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${o3}`,graph:`https://gitkraken.com/solutions/commit-graph?${o3}`,launchpad:`https://gitkraken.com/solutions/launchpad?${o3}`,platform:`https://gitkraken.com/devex?${o3}`,pricing:`https://gitkraken.com/gitlens/pricing?${o3}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${o3}`,security:`https://help.gitkraken.com/gitlens/security?${o3}`,workspaces:`https://gitkraken.com/solutions/workspaces?${o3}`,cli:`https://gitkraken.com/cli?${o3}`,browserExtension:`https://gitkraken.com/browser-extension?${o3}`,desktop:`https://gitkraken.com/git-client?${o3}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${o3}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${o3}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${o3}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${o3}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${o3}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${o3}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${o3}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${o3}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${o3}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${o3}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${o3}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${o3}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${o3}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${o3}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${o3}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${o3}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${o3}`});var o6=((w=o6||{})[w.VerificationRequired=-1]="VerificationRequired",w[w.Community=0]="Community",w[w.DeprecatedPreview=1]="DeprecatedPreview",w[w.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",w[w.Trial=3]="Trial",w[w.TrialExpired=4]="TrialExpired",w[w.TrialReactivationEligible=5]="TrialReactivationEligible",w[w.Paid=6]="Paid",w);let o8=["community","community-with-account","student","pro","advanced","teams","enterprise"],o7=["student","pro","advanced","teams","enterprise"];function o9(t){switch(t){case"student":return"Student";case"pro":return"Pro";case"advanced":return"Advanced";case"teams":return"Business";case"enterprise":return"Enterprise";default:return"Community"}}function ie(t){return null!=t?o8.indexOf(t):-1}function it(t){return`GitLens ${o9(t)}`}function ir(t,r){var o;return o=t.plan.effective.expiresOn,null!=o?function(t,r,o,i){let n=("number"==typeof r?r:r.getTime())-("number"==typeof t?t:t.getTime()),a=i??Math.floor;switch(o){case"days":return a(n/864e5);case"hours":return a(n/36e5);case"minutes":return a(n/6e4);case"seconds":return a(n/1e3);default:return n}}(Date.now(),new Date(o),r,Math.round):void 0}function io(t){var r;return r=t.plan.actual.id,o7.includes(r)}function ii(t){return null!=t.state?t.state===o6.Trial:t.plan.actual.id!==t.plan.effective.id}function is(t){return null!=t&&(t===o6.Trial||t===o6.Paid)}function ia(t,r){return null==r?`command:${t}`:`command:${t}?${encodeURIComponent("string"==typeof r?r:JSON.stringify(r))}`}let il=j`
	:host {
		display: flex;
	}

	.chip {
		display: flex;
		gap: 0.6rem;
		align-items: center;

		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
		cursor: pointer;
	}

	.chip:focus-visible {
		${of}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-bottom: 0.4rem;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding-bottom: 0.4rem;
	}

	.header__actions {
		flex: none;
		display: flex;
		gap: 0.2rem;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.header__title {
		flex: 1;
		font-size: 1.5rem;
		line-height: 1.7;
		font-weight: 600;
		margin: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`,ic=j`
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
`,id=j`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;var ih=Object.defineProperty,ip=Object.defineProperties,iu=Object.getOwnPropertyDescriptor,ig=Object.getOwnPropertyDescriptors,ib=Object.getOwnPropertySymbols,im=Object.prototype.hasOwnProperty,iv=Object.prototype.propertyIsEnumerable,iy=t=>{throw TypeError(t)},iw=(t,r,o)=>r in t?ih(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,i_=(t,r)=>{for(var o in r||(r={}))im.call(r,o)&&iw(t,o,r[o]);if(ib)for(var o of ib(r))iv.call(r,o)&&iw(t,o,r[o]);return t},ik=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?iu(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ih(r,o,a),a},ix=(t,r,o)=>r.has(t)||iy("Cannot "+o),i$=new Map,iC=new WeakMap;function iS(t,r){return"rtl"===r.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function iP(t,r){i$.set(t,null!=r?r:{keyframes:[],options:{duration:0}})}function iO(t,r,o){let i=iC.get(t);if(null==i?void 0:i[r])return iS(i[r],o.dir);let n=i$.get(r);return n?iS(n,o.dir):{keyframes:[],options:{duration:0}}}let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(t){if(super(t),this.it=eP,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===eP||null==t)return this._t=void 0,this.it=t;if(t===eS)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let iA=tp(unsafe_html_e);var iR=j`
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
`,iE=j`
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
`;let iI=new Set,iB=new Map,iL="ltr",iT="en",iM="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(iM){let t=new MutationObserver(iD);iL=document.documentElement.dir||"ltr",iT=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function iz(...t){t.map(t=>{let r=t.$code.toLowerCase();iB.has(r)?iB.set(r,Object.assign(Object.assign({},iB.get(r)),t)):iB.set(r,t),g||(g=t)}),iD()}function iD(){iM&&(iL=document.documentElement.dir||"ltr",iT=document.documentElement.lang||navigator.language),[...iI.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){iI.add(this.host)}hostDisconnected(){iI.delete(this.host)}dir(){return`${this.host.dir||iL}`.toLowerCase()}lang(){return`${this.host.lang||iT}`.toLowerCase()}getTranslationData(t){var r,o;let i=new Intl.Locale(t.replace(/_/g,"-")),n=null==i?void 0:i.language.toLowerCase(),a=null!=(o=null==(r=null==i?void 0:i.region)?void 0:r.toLowerCase())?o:"",c=iB.get(`${n}-${a}`),h=iB.get(n);return{locale:i,language:n,region:a,primary:c,secondary:h}}exists(t,r){var o;let{primary:i,secondary:n}=this.getTranslationData(null!=(o=r.lang)?o:this.lang());return r=Object.assign({includeFallback:!1},r),!!i&&!!i[t]||!!n&&!!n[t]||!!r.includeFallback&&!!g&&!!g[t]}term(t,...r){let o,{primary:i,secondary:n}=this.getTranslationData(this.lang());if(i&&i[t])o=i[t];else if(n&&n[t])o=n[t];else{if(!g||!g[t])return String(t);o=g[t]}return"function"==typeof o?o(...r):o}date(t,r){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),r).format(t)}number(t,r){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),r).format(t)}relativeTime(t,r,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,r)}};var ij={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,r)=>`Go to slide ${t} of ${r}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};iz(ij);var iW=class extends LocalizeController{};iz(ij);var iN=j`
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
`,iF=class extends lit_element_i{constructor(){let t;super(),(t=S).has(this)?iy("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,r])=>{this.constructor.define(t,r)})}emit(t,r){let o=new CustomEvent(t,i_({bubbles:!0,cancelable:!1,composed:!0,detail:{}},r));return this.dispatchEvent(o),o}static define(t,r=this,o={}){let i=customElements.get(t);if(!i){try{customElements.define(t,r,o)}catch(i){customElements.define(t,class extends r{},o)}return}let n=" (unknown version)";"version"in r&&r.version&&(n=" v"+r.version),"version"in i&&i.version&&i.version}attributeChangedCallback(t,r,o){let i,n;if(ix(this,i=S,"read from private field"),n?!n.call(this):!i.get(this)){let t,r;this.constructor.elementProperties.forEach((t,r)=>{t.reflect&&null!=this[r]&&this.initialReflectedProperties.set(r,this[r])}),ix(this,t=S,"write to private field"),r?r.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,r,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((r,o)=>{t.has(o)&&null==this[o]&&(this[o]=r)})}};S=new WeakMap,iF.version="2.20.1",iF.dependencies={},ik([eD()],iF.prototype,"dir",2),ik([eD()],iF.prototype,"lang",2);let iU=Math.min,iq=Math.max,iH=Math.round,iG=Math.floor,iV=t=>({x:t,y:t}),iK={left:"right",right:"left",bottom:"top",top:"bottom"};function iY(t,r){return"function"==typeof t?t(r):t}function iJ(t){return t.split("-")[0]}function iZ(t){return t.split("-")[1]}function iX(t){return"x"===t?"y":"x"}function iQ(t){return"y"===t?"height":"width"}function i0(t){let r=t[0];return"t"===r||"b"===r?"y":"x"}function i1(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}let i2=["left","right"],i5=["right","left"],i3=["top","bottom"],i4=["bottom","top"];function i6(t){let r=iJ(t);return iK[r]+t.slice(r.length)}function i8(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function i7(t){let{x:r,y:o,width:i,height:n}=t;return{width:i,height:n,top:o,left:r,right:r+i,bottom:o+n,x:r,y:o}}function i9(t,r,o){let i,{reference:n,floating:a}=t,c=i0(r),h=iX(i0(r)),p=iQ(h),u=iJ(r),g="y"===c,b=n.x+n.width/2-a.width/2,m=n.y+n.height/2-a.height/2,f=n[p]/2-a[p]/2;switch(u){case"top":i={x:b,y:n.y-a.height};break;case"bottom":i={x:b,y:n.y+n.height};break;case"right":i={x:n.x+n.width,y:m};break;case"left":i={x:n.x-a.width,y:m};break;default:i={x:n.x,y:n.y}}switch(iZ(r)){case"start":i[h]-=f*(o&&g?-1:1);break;case"end":i[h]+=f*(o&&g?-1:1)}return i}async function ne(t,r){var o;void 0===r&&(r={});let{x:i,y:n,platform:a,rects:c,elements:h,strategy:p}=t,{boundary:u="clippingAncestors",rootBoundary:g="viewport",elementContext:b="floating",altBoundary:m=!1,padding:f=0}=iY(r,t),v=i8(f),w=h[m?"floating"===b?"reference":"floating":b],_=i7(await a.getClippingRect({element:null==(o=await (null==a.isElement?void 0:a.isElement(w)))||o?w:w.contextElement||await (null==a.getDocumentElement?void 0:a.getDocumentElement(h.floating)),boundary:u,rootBoundary:g,strategy:p})),x="floating"===b?{x:i,y:n,width:c.floating.width,height:c.floating.height}:c.reference,$=await (null==a.getOffsetParent?void 0:a.getOffsetParent(h.floating)),C=await (null==a.isElement?void 0:a.isElement($))&&await (null==a.getScale?void 0:a.getScale($))||{x:1,y:1},S=i7(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:h,rect:x,offsetParent:$,strategy:p}):x);return{top:(_.top-S.top+v.top)/C.y,bottom:(S.bottom-_.bottom+v.bottom)/C.y,left:(_.left-S.left+v.left)/C.x,right:(S.right-_.right+v.right)/C.x}}let nt=async(t,r,o)=>{let{placement:i="bottom",strategy:n="absolute",middleware:a=[],platform:c}=o,h=c.detectOverflow?c:{...c,detectOverflow:ne},p=await (null==c.isRTL?void 0:c.isRTL(r)),u=await c.getElementRects({reference:t,floating:r,strategy:n}),{x:g,y:b}=i9(u,i,p),m=i,f=0,v={};for(let o=0;o<a.length;o++){let w=a[o];if(!w)continue;let{name:_,fn:x}=w,{x:$,y:C,data:S,reset:P}=await x({x:g,y:b,initialPlacement:i,placement:m,strategy:n,middlewareData:v,rects:u,platform:h,elements:{reference:t,floating:r}});g=null!=$?$:g,b=null!=C?C:b,v[_]={...v[_],...S},P&&f<50&&(f++,"object"==typeof P&&(P.placement&&(m=P.placement),P.rects&&(u=!0===P.rects?await c.getElementRects({reference:t,floating:r,strategy:n}):P.rects),{x:g,y:b}=i9(u,m,p)),o=-1)}return{x:g,y:b,placement:m,strategy:n,middlewareData:v}},nr=new Set(["left","top"]);async function no(t,r){let{placement:o,platform:i,elements:n}=t,a=await (null==i.isRTL?void 0:i.isRTL(n.floating)),c=iJ(o),h=iZ(o),p="y"===i0(o),u=nr.has(c)?-1:1,g=a&&p?-1:1,b=iY(r,t),{mainAxis:m,crossAxis:f,alignmentAxis:v}="number"==typeof b?{mainAxis:b,crossAxis:0,alignmentAxis:null}:{mainAxis:b.mainAxis||0,crossAxis:b.crossAxis||0,alignmentAxis:b.alignmentAxis};return h&&"number"==typeof v&&(f="end"===h?-1*v:v),p?{x:f*g,y:m*u}:{x:m*u,y:f*g}}function ni(){return"u">typeof window}function nn(t){return nl(t)?(t.nodeName||"").toLowerCase():"#document"}function ns(t){var r;return(null==t||null==(r=t.ownerDocument)?void 0:r.defaultView)||window}function na(t){var r;return null==(r=(nl(t)?t.ownerDocument:t.document)||window.document)?void 0:r.documentElement}function nl(t){return!!ni()&&(t instanceof Node||t instanceof ns(t).Node)}function nc(t){return!!ni()&&(t instanceof Element||t instanceof ns(t).Element)}function nd(t){return!!ni()&&(t instanceof HTMLElement||t instanceof ns(t).HTMLElement)}function nh(t){return!(!ni()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof ns(t).ShadowRoot)}function np(t){let{overflow:r,overflowX:o,overflowY:i,display:n}=nw(t);return/auto|scroll|overlay|hidden|clip/.test(r+i+o)&&"inline"!==n&&"contents"!==n}function nu(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}let ng=/transform|translate|scale|rotate|perspective|filter/,nb=/paint|layout|strict|content/,nm=t=>!!t&&"none"!==t;function nf(t){let r=nc(t)?nw(t):t;return nm(r.transform)||nm(r.translate)||nm(r.scale)||nm(r.rotate)||nm(r.perspective)||!nv()&&(nm(r.backdropFilter)||nm(r.filter))||ng.test(r.willChange||"")||nb.test(r.contain||"")}function nv(){return null==b&&(b="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),b}function ny(t){return/^(html|body|#document)$/.test(nn(t))}function nw(t){return ns(t).getComputedStyle(t)}function n_(t){return nc(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function nk(t){if("html"===nn(t))return t;let r=t.assignedSlot||t.parentNode||nh(t)&&t.host||na(t);return nh(r)?r.host:r}function nx(t,r,o){var i;void 0===r&&(r=[]),void 0===o&&(o=!0);let n=function t(r){let o=nk(r);return ny(o)?r.ownerDocument?r.ownerDocument.body:r.body:nd(o)&&np(o)?o:t(o)}(t),a=n===(null==(i=t.ownerDocument)?void 0:i.body),c=ns(n);if(!a)return r.concat(n,nx(n,[],o));{let t=n$(c);return r.concat(c,c.visualViewport||[],np(n)?n:[],t&&o?nx(t):[])}}function n$(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function nC(t){let r=nw(t),o=parseFloat(r.width)||0,i=parseFloat(r.height)||0,n=nd(t),a=n?t.offsetWidth:o,c=n?t.offsetHeight:i,h=iH(o)!==a||iH(i)!==c;return h&&(o=a,i=c),{width:o,height:i,$:h}}function nS(t){return nc(t)?t:t.contextElement}function nP(t){let r=nS(t);if(!nd(r))return iV(1);let o=r.getBoundingClientRect(),{width:i,height:n,$:a}=nC(r),c=(a?iH(o.width):o.width)/i,h=(a?iH(o.height):o.height)/n;return c&&Number.isFinite(c)||(c=1),h&&Number.isFinite(h)||(h=1),{x:c,y:h}}let nO=iV(0);function nA(t){let r=ns(t);return nv()&&r.visualViewport?{x:r.visualViewport.offsetLeft,y:r.visualViewport.offsetTop}:nO}function nR(t,r,o,i){var n;void 0===r&&(r=!1),void 0===o&&(o=!1);let a=t.getBoundingClientRect(),c=nS(t),h=iV(1);r&&(i?nc(i)&&(h=nP(i)):h=nP(t));let p=(void 0===(n=o)&&(n=!1),i&&(!n||i===ns(c))&&n)?nA(c):iV(0),u=(a.left+p.x)/h.x,g=(a.top+p.y)/h.y,b=a.width/h.x,m=a.height/h.y;if(c){let t=ns(c),r=i&&nc(i)?ns(i):i,o=t,n=n$(o);for(;n&&i&&r!==o;){let t=nP(n),r=n.getBoundingClientRect(),i=nw(n),a=r.left+(n.clientLeft+parseFloat(i.paddingLeft))*t.x,c=r.top+(n.clientTop+parseFloat(i.paddingTop))*t.y;u*=t.x,g*=t.y,b*=t.x,m*=t.y,u+=a,g+=c,n=n$(o=ns(n))}}return i7({width:b,height:m,x:u,y:g})}function nE(t,r){let o=n_(t).scrollLeft;return r?r.left+o:nR(na(t)).left+o}function nI(t,r){let o=t.getBoundingClientRect();return{x:o.left+r.scrollLeft-nE(t,o),y:o.top+r.scrollTop}}function nB(t,r,o){var i;let n;if("viewport"===r)n=function(t,r){let o=ns(t),i=na(t),n=o.visualViewport,a=i.clientWidth,c=i.clientHeight,h=0,p=0;if(n){a=n.width,c=n.height;let t=nv();(!t||t&&"fixed"===r)&&(h=n.offsetLeft,p=n.offsetTop)}let u=nE(i);if(u<=0){let t=i.ownerDocument,r=t.body,o=getComputedStyle(r),n="CSS1Compat"===t.compatMode&&parseFloat(o.marginLeft)+parseFloat(o.marginRight)||0,c=Math.abs(i.clientWidth-r.clientWidth-n);c<=25&&(a-=c)}else u<=25&&(a+=u);return{width:a,height:c,x:h,y:p}}(t,o);else if("document"===r){let r,o,a,c,h,p,u;i=na(t),r=na(i),o=n_(i),a=i.ownerDocument.body,c=iq(r.scrollWidth,r.clientWidth,a.scrollWidth,a.clientWidth),h=iq(r.scrollHeight,r.clientHeight,a.scrollHeight,a.clientHeight),p=-o.scrollLeft+nE(i),u=-o.scrollTop,"rtl"===nw(a).direction&&(p+=iq(r.clientWidth,a.clientWidth)-c),n={width:c,height:h,x:p,y:u}}else if(nc(r)){let t,i,a,c,h,p;i=(t=nR(r,!0,"fixed"===o)).top+r.clientTop,a=t.left+r.clientLeft,c=nd(r)?nP(r):iV(1),h=r.clientWidth*c.x,p=r.clientHeight*c.y,n={width:h,height:p,x:a*c.x,y:i*c.y}}else{let o=nA(t);n={x:r.x-o.x,y:r.y-o.y,width:r.width,height:r.height}}return i7(n)}function nL(t){return"static"===nw(t).position}function nT(t,r){if(!nd(t)||"fixed"===nw(t).position)return null;if(r)return r(t);let o=t.offsetParent;return na(t)===o&&(o=o.ownerDocument.body),o}function nM(t,r){var o;let i=ns(t);if(nu(t))return i;if(!nd(t)){let r=nk(t);for(;r&&!ny(r);){if(nc(r)&&!nL(r))return r;r=nk(r)}return i}let n=nT(t,r);for(;n&&(o=n,/^(table|td|th)$/.test(nn(o)))&&nL(n);)n=nT(n,r);return n&&ny(n)&&nL(n)&&!nf(n)?i:n||function(t){let r=nk(t);for(;nd(r)&&!ny(r);){if(nf(r))return r;if(nu(r))break;r=nk(r)}return null}(t)||i}let nz=async function(t){let r=this.getOffsetParent||nM,o=this.getDimensions,i=await o(t.floating);return{reference:function(t,r,o){let i=nd(r),n=na(r),a="fixed"===o,c=nR(t,!0,a,r),h={scrollLeft:0,scrollTop:0},p=iV(0);if(i||!i&&!a)if(("body"!==nn(r)||np(n))&&(h=n_(r)),i){let t=nR(r,!0,a,r);p.x=t.x+r.clientLeft,p.y=t.y+r.clientTop}else n&&(p.x=nE(n));a&&!i&&n&&(p.x=nE(n));let u=!n||i||a?iV(0):nI(n,h);return{x:c.left+h.scrollLeft-p.x-u.x,y:c.top+h.scrollTop-p.y-u.y,width:c.width,height:c.height}}(t.reference,await r(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},nD={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:r,rect:o,offsetParent:i,strategy:n}=t,a="fixed"===n,c=na(i),h=!!r&&nu(r.floating);if(i===c||h&&a)return o;let p={scrollLeft:0,scrollTop:0},u=iV(1),g=iV(0),b=nd(i);if((b||!b&&!a)&&(("body"!==nn(i)||np(c))&&(p=n_(i)),b)){let t=nR(i);u=nP(i),g.x=t.x+i.clientLeft,g.y=t.y+i.clientTop}let m=!c||b||a?iV(0):nI(c,p);return{width:o.width*u.x,height:o.height*u.y,x:o.x*u.x-p.scrollLeft*u.x+g.x+m.x,y:o.y*u.y-p.scrollTop*u.y+g.y+m.y}},getDocumentElement:na,getClippingRect:function(t){let{element:r,boundary:o,rootBoundary:i,strategy:n}=t,a=[..."clippingAncestors"===o?nu(r)?[]:function(t,r){let o=r.get(t);if(o)return o;let i=nx(t,[],!1).filter(t=>nc(t)&&"body"!==nn(t)),n=null,a="fixed"===nw(t).position,c=a?nk(t):t;for(;nc(c)&&!ny(c);){let r=nw(c),o=nf(c);o||"fixed"!==r.position||(n=null),(a?o||n:!(!o&&"static"===r.position&&n&&("absolute"===n.position||"fixed"===n.position)||np(c)&&!o&&function t(r,o){let i=nk(r);return!(i===o||!nc(i)||ny(i))&&("fixed"===nw(i).position||t(i,o))}(t,c)))?n=r:i=i.filter(t=>t!==c),c=nk(c)}return r.set(t,i),i}(r,this._c):[].concat(o),i],c=nB(r,a[0],n),h=c.top,p=c.right,u=c.bottom,g=c.left;for(let t=1;t<a.length;t++){let o=nB(r,a[t],n);h=iq(o.top,h),p=iU(o.right,p),u=iU(o.bottom,u),g=iq(o.left,g)}return{width:p-g,height:u-h,x:g,y:h}},getOffsetParent:nM,getElementRects:nz,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:r,height:o}=nC(t);return{width:r,height:o}},getScale:nP,isElement:nc,isRTL:function(t){return"rtl"===nw(t).direction}};function nj(t,r){return t.x===r.x&&t.y===r.y&&t.width===r.width&&t.height===r.height}let nW=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(r){var o,i;let n,a,{placement:c,rects:h,platform:p,elements:u}=r,{apply:g=()=>{},...b}=iY(t,r),m=await p.detectOverflow(r,b),f=iJ(c),v=iZ(c),w="y"===i0(c),{width:_,height:x}=h.floating;"top"===f||"bottom"===f?(n=f,a=v===(await (null==p.isRTL?void 0:p.isRTL(u.floating))?"start":"end")?"left":"right"):(a=f,n="end"===v?"top":"bottom");let $=x-m.top-m.bottom,C=_-m.left-m.right,S=iU(x-m[n],$),P=iU(_-m[a],C),O=!r.middlewareData.shift,A=S,E=P;if(null!=(o=r.middlewareData.shift)&&o.enabled.x&&(E=C),null!=(i=r.middlewareData.shift)&&i.enabled.y&&(A=$),O&&!v){let t=iq(m.left,0),r=iq(m.right,0),o=iq(m.top,0),i=iq(m.bottom,0);w?E=_-2*(0!==t||0!==r?t+r:iq(m.left,m.right)):A=x-2*(0!==o||0!==i?o+i:iq(m.top,m.bottom))}await g({...r,availableWidth:E,availableHeight:A});let B=await p.getDimensions(u.floating);return _!==B.width||x!==B.height?{reset:{rects:!0}}:{}}}},nN=tp(class extends directive_i{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(r=>t[r]).join(" ")+" "}update(t,[r]){if(void 0===this.st){for(let o in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),r)r[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(r)}let o=t.element.classList;for(let t of this.st)t in r||(o.remove(t),this.st.delete(t));for(let t in r){let i=!!r[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return eS}});function nF(t){var r=t;for(let t=r;t;t=nU(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=nU(r);t;t=nU(t)){if(!(t instanceof Element))continue;let r=getComputedStyle(t);if("contents"!==r.display&&("static"!==r.position||nf(r)||"BODY"===t.tagName))return t}return null}function nU(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var nq=class extends iF{constructor(){super(...arguments),this.localize=new iW(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),r=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),i=0,n=0,a=0,c=0,h=0,p=0,u=0,g=0;o?t.top<r.top?(i=t.left,n=t.bottom,a=t.right,c=t.bottom,h=r.left,p=r.top,u=r.right,g=r.top):(i=r.left,n=r.bottom,a=r.right,c=r.bottom,h=t.left,p=t.top,u=t.right,g=t.top):t.left<r.left?(i=t.right,n=t.top,a=r.left,c=r.top,h=t.right,p=t.bottom,u=r.left,g=r.bottom):(i=r.right,n=r.top,a=t.left,c=t.top,h=r.right,p=r.bottom,u=t.left,g=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else{var t;this.anchor instanceof Element||null!==(t=this.anchor)&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,r,o,i){let n;void 0===i&&(i={});let{ancestorScroll:a=!0,ancestorResize:c=!0,elementResize:h="function"==typeof ResizeObserver,layoutShift:p="function"==typeof IntersectionObserver,animationFrame:u=!1}=i,g=nS(t),b=a||c?[...g?nx(g):[],...r?nx(r):[]]:[];b.forEach(t=>{a&&t.addEventListener("scroll",o,{passive:!0}),c&&t.addEventListener("resize",o)});let m=g&&p?function(t,r){let o,i=null,n=na(t);function a(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return!function c(h,p){void 0===h&&(h=!1),void 0===p&&(p=1),a();let u=t.getBoundingClientRect(),{left:g,top:b,width:m,height:f}=u;if(h||r(),!m||!f)return;let v={rootMargin:-iG(b)+"px "+-iG(n.clientWidth-(g+m))+"px "+-iG(n.clientHeight-(b+f))+"px "+-iG(g)+"px",threshold:iq(0,iU(1,p))||1},w=!0;function _(r){let i=r[0].intersectionRatio;if(i!==p){if(!w)return c();i?c(!1,i):o=setTimeout(()=>{c(!1,1e-7)},1e3)}1!==i||nj(u,t.getBoundingClientRect())||c(),w=!1}try{i=new IntersectionObserver(_,{...v,root:n.ownerDocument})}catch{i=new IntersectionObserver(_,v)}i.observe(t)}(!0),a}(g,o):null,f=-1,v=null;h&&(v=new ResizeObserver(t=>{let[i]=t;i&&i.target===g&&v&&r&&(v.unobserve(r),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var t;null==(t=v)||t.observe(r)})),o()}),g&&!u&&v.observe(g),r&&v.observe(r));let w=u?nR(t):null;return u&&function r(){let i=nR(t);w&&!nj(w,i)&&o(),w=i,n=requestAnimationFrame(r)}(),o(),()=>{var t;b.forEach(t=>{a&&t.removeEventListener("scroll",o),c&&t.removeEventListener("resize",o)}),null==m||m(),null==(t=v)||t.disconnect(),v=null,u&&cancelAnimationFrame(n)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,r,o,i,n,a;let c,h,p,u;if(!this.active||!this.anchorEl)return;let g=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(r){var o,i;let{x:n,y:a,placement:c,middlewareData:h}=r,p=await no(r,t);return c===(null==(o=h.offset)?void 0:o.placement)&&null!=(i=h.arrow)&&i.alignmentOffset?{}:{x:n+p.x,y:a+p.y,data:{...p,placement:c}}}}];this.sync?g.push(nW({apply:({rects:t})=>{let r="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=r?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&g.push({name:"flip",options:r={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var o,i,n,a,c,h,p,u;let g,b,m,{placement:f,middlewareData:v,rects:w,initialPlacement:_,platform:x,elements:$}=t,{mainAxis:C=!0,crossAxis:S=!0,fallbackPlacements:P,fallbackStrategy:O="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:E=!0,...B}=iY(r,t);if(null!=(o=v.arrow)&&o.alignmentOffset)return{};let T=iJ(f),M=i0(_),D=iJ(_)===_,j=await (null==x.isRTL?void 0:x.isRTL($.floating)),W=P||(D||!E?[i6(_)]:(g=i6(_),[i1(_),g,i1(g)])),N="none"!==A;!P&&N&&W.push(...(b=iZ(_),m=function(t,r,o){switch(t){case"top":case"bottom":if(o)return r?i5:i2;return r?i2:i5;case"left":case"right":return r?i3:i4;default:return[]}}(iJ(_),"start"===A,j),b&&(m=m.map(t=>t+"-"+b),E&&(m=m.concat(m.map(i1)))),m));let F=[_,...W],U=await x.detectOverflow(t,B),q=[],G=(null==(i=v.flip)?void 0:i.overflows)||[];if(C&&q.push(U[T]),S){let t,r,o,i,n=(h=f,p=w,void 0===(u=j)&&(u=!1),t=iZ(h),o=iQ(r=iX(i0(h))),i="x"===r?t===(u?"end":"start")?"right":"left":"start"===t?"bottom":"top",p.reference[o]>p.floating[o]&&(i=i6(i)),[i,i6(i)]);q.push(U[n[0]],U[n[1]])}if(G=[...G,{placement:f,overflows:q}],!q.every(t=>t<=0)){let t=((null==(n=v.flip)?void 0:n.index)||0)+1,r=F[t];if(r&&("alignment"!==S||M===i0(r)||G.every(t=>i0(t.placement)!==M||t.overflows[0]>0)))return{data:{index:t,overflows:G},reset:{placement:r}};let o=null==(a=G.filter(t=>t.overflows[0]<=0).sort((t,r)=>t.overflows[1]-r.overflows[1])[0])?void 0:a.placement;if(!o)switch(O){case"bestFit":{let t=null==(c=G.filter(t=>{if(N){let r=i0(t.placement);return r===M||"y"===r}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,r)=>t+r,0)]).sort((t,r)=>t[1]-r[1])[0])?void 0:c[0];t&&(o=t);break}case"initialPlacement":o=_}if(f!==o)return{reset:{placement:o}}}return{}}}),this.shift&&g.push({name:"shift",options:o={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(t){let{x:r,y:i,placement:n,platform:a}=t,{mainAxis:c=!0,crossAxis:h=!1,limiter:p={fn:t=>{let{x:r,y:o}=t;return{x:r,y:o}}},...u}=iY(o,t),g={x:r,y:i},b=await a.detectOverflow(t,u),m=i0(iJ(n)),f=iX(m),v=g[f],w=g[m];if(c){let t="y"===f?"top":"left",r="y"===f?"bottom":"right",o=v+b[t],i=v-b[r];v=iq(o,iU(v,i))}if(h){let t="y"===m?"top":"left",r="y"===m?"bottom":"right",o=w+b[t],i=w-b[r];w=iq(o,iU(w,i))}let _=p.fn({...t,[f]:v,[m]:w});return{..._,data:{x:_.x-r,y:_.y-i,enabled:{[f]:c,[m]:h}}}}}),this.autoSize?g.push(nW({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:r})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:c={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:r,y:o,placement:i,rects:n,platform:a,elements:h,middlewareData:p}=t,{element:u,padding:g=0}=iY(c,t)||{};if(null==u)return{};let b=i8(g),m={x:r,y:o},f=iX(i0(i)),v=iQ(f),w=await a.getDimensions(u),_="y"===f,x=_?"clientHeight":"clientWidth",$=n.reference[v]+n.reference[f]-m[f]-n.floating[v],C=m[f]-n.reference[f],S=await (null==a.getOffsetParent?void 0:a.getOffsetParent(u)),P=S?S[x]:0;P&&await (null==a.isElement?void 0:a.isElement(S))||(P=h.floating[x]||n.floating[v]);let O=P/2-w[v]/2-1,A=iU(b[_?"top":"left"],O),E=iU(b[_?"bottom":"right"],O),B=P-w[v]-E,T=P/2-w[v]/2+($/2-C/2),M=iq(A,iU(T,B)),D=!p.arrow&&null!=iZ(i)&&T!==M&&n.reference[v]/2-(T<A?A:E)-w[v]/2<0,j=D?T<A?T-A:T-B:0;return{[f]:m[f]+j,data:{[f]:M,centerOffset:T-M-j,...D&&{alignmentOffset:j}},reset:D}}});let b="absolute"===this.strategy?t=>nD.getOffsetParent(t,nF):nD.getOffsetParent;(i=this.anchorEl,n=this.popup,a={placement:this.placement,middleware:g,strategy:this.strategy,platform:ip(i_({},nD),ig({getOffsetParent:b}))},h=new Map,u={...(p={platform:nD,...a}).platform,_c:h},nt(i,n,{...p,platform:u})).then(({x:t,y:r,middlewareData:o,placement:i})=>{let n="rtl"===this.localize.dir(),a={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${r}px`}),this.arrow){let t=o.arrow.x,r=o.arrow.y,i="",c="",h="",p="";if("start"===this.arrowPlacement){let o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof r?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",c=n?o:"",p=n?"":o}else if("end"===this.arrowPlacement){let o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";c=n?"":o,p=n?o:"",h="number"==typeof r?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(p="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof r?"calc(50% - var(--arrow-size-diagonal))":""):(p="number"==typeof t?`${t}px`:"",i="number"==typeof r?`${r}px`:"");Object.assign(this.arrowEl.style,{top:i,right:c,bottom:h,left:p,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return e$`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${nN({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${nN({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?e$`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};function nH(t,r){return new Promise(o=>{t.addEventListener(r,function i(n){n.target===t&&(t.removeEventListener(r,i),o())})})}function nG(t,r,o){return new Promise(i=>{if((null==o?void 0:o.duration)===1/0)throw Error("Promise-based animations must be finite.");let n=t.animate(r,ip(i_({},o),ig({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:o.duration})));n.addEventListener("cancel",i,{once:!0}),n.addEventListener("finish",i,{once:!0})})}function nV(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function nK(t){return Promise.all(t.getAnimations().map(t=>new Promise(r=>{t.cancel(),requestAnimationFrame(r)})))}function nY(t,r){let o=i_({waitUntilFirstUpdate:!1},r);return(r,i)=>{let{update:n}=r,a=Array.isArray(t)?t:[t];r.update=function(t){a.forEach(r=>{if(t.has(r)){let n=t.get(r),a=this[r];n!==a&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](n,a)}}),n.call(this,t)}}}nq.styles=[iN,iE],ik([eN(".popup")],nq.prototype,"popup",2),ik([eN(".popup__arrow")],nq.prototype,"arrowEl",2),ik([eD()],nq.prototype,"anchor",2),ik([eD({type:Boolean,reflect:!0})],nq.prototype,"active",2),ik([eD({reflect:!0})],nq.prototype,"placement",2),ik([eD({reflect:!0})],nq.prototype,"strategy",2),ik([eD({type:Number})],nq.prototype,"distance",2),ik([eD({type:Number})],nq.prototype,"skidding",2),ik([eD({type:Boolean})],nq.prototype,"arrow",2),ik([eD({attribute:"arrow-placement"})],nq.prototype,"arrowPlacement",2),ik([eD({attribute:"arrow-padding",type:Number})],nq.prototype,"arrowPadding",2),ik([eD({type:Boolean})],nq.prototype,"flip",2),ik([eD({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],nq.prototype,"flipFallbackPlacements",2),ik([eD({attribute:"flip-fallback-strategy"})],nq.prototype,"flipFallbackStrategy",2),ik([eD({type:Object})],nq.prototype,"flipBoundary",2),ik([eD({attribute:"flip-padding",type:Number})],nq.prototype,"flipPadding",2),ik([eD({type:Boolean})],nq.prototype,"shift",2),ik([eD({type:Object})],nq.prototype,"shiftBoundary",2),ik([eD({attribute:"shift-padding",type:Number})],nq.prototype,"shiftPadding",2),ik([eD({attribute:"auto-size"})],nq.prototype,"autoSize",2),ik([eD()],nq.prototype,"sync",2),ik([eD({type:Object})],nq.prototype,"autoSizeBoundary",2),ik([eD({attribute:"auto-size-padding",type:Number})],nq.prototype,"autoSizePadding",2),ik([eD({attribute:"hover-bridge",type:Boolean})],nq.prototype,"hoverBridge",2);var nJ=class extends iF{constructor(){super(),this.localize=new iW(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let t=nV(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=nV(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,r;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await nK(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:r,options:o}=iO(this,"tooltip.show",{dir:this.localize.dir()});await nG(this.popup.popup,r,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(r=this.closeWatcher)||r.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await nK(this.body);let{keyframes:t,options:o}=iO(this,"tooltip.hide",{dir:this.localize.dir()});await nG(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,nH(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,nH(this,"sl-after-hide")}render(){return e$`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${nN({tooltip:!0,"tooltip--open":this.open})}
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
    `}};nJ.styles=[iN,iR],nJ.dependencies={"sl-popup":nq},ik([eN("slot:not([name])")],nJ.prototype,"defaultSlot",2),ik([eN(".tooltip__body")],nJ.prototype,"body",2),ik([eN("sl-popup")],nJ.prototype,"popup",2),ik([eD()],nJ.prototype,"content",2),ik([eD()],nJ.prototype,"placement",2),ik([eD({type:Boolean,reflect:!0})],nJ.prototype,"disabled",2),ik([eD({type:Number})],nJ.prototype,"distance",2),ik([eD({type:Boolean,reflect:!0})],nJ.prototype,"open",2),ik([eD({type:Number})],nJ.prototype,"skidding",2),ik([eD()],nJ.prototype,"trigger",2),ik([eD({type:Boolean})],nJ.prototype,"hoist",2),ik([nY("open",{waitUntilFirstUpdate:!0})],nJ.prototype,"handleOpenChange",1),ik([nY(["content","distance","hoist","placement","skidding"])],nJ.prototype,"handleOptionsChange",1),ik([nY("disabled")],nJ.prototype,"handleDisabledChange",1),iP("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),iP("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),nJ.define("sl-tooltip");var nZ=Object.defineProperty,nX=Object.getOwnPropertyDescriptor,nQ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?nX(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&nZ(r,o,a),a};iP("tooltip.show",null),iP("tooltip.hide",null);let n0=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.suppressed=!1,this.onMouseDown=t=>{this.suppressed=!0,this.hide()},this.onMouseUp=t=>{this.suppressed=!1},this.onDragStart=t=>{this.suppressed=!0,this.hide()},this.onDragEnd=t=>{this.suppressed=!1}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("dragstart",this.onDragStart,{capture:!0}),window.addEventListener("dragend",this.onDragEnd,{capture:!0})}firstUpdated(){this.observer=new MutationObserver(t=>{for(let r of t)if("attributes"===r.type&&"data-current-placement"===r.attributeName){let t=r.target.getAttribute("data-current-placement");t?this.setAttribute("data-current-placement",t):this.removeAttribute("data-current-placement")}});let t=this.shadowRoot?.querySelector("sl-tooltip")?.shadowRoot;t&&this.observer.observe(t,{attributes:!0,attributeFilter:["data-current-placement"],subtree:!0})}disconnectedCallback(){this.observer?.disconnect(),this.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("dragstart",this.onDragStart,{capture:!0}),window.removeEventListener("dragend",this.onDragEnd,{capture:!0}),super.disconnectedCallback?.()}async hide(){let t=this.shadowRoot?.querySelector("sl-tooltip");return t?.hide()}async show(){let t=this.shadowRoot?.querySelector("sl-tooltip");return t?.show()}render(){var t;return e$`<sl-tooltip
			.placement=${this.placement}
			?disabled=${this.disabled||this.suppressed}
			.distance=${this.distance??eP}
			hoist
		>
			<slot></slot>
			<div slot="content">
				<slot name="content">${t=this.content,t?.includes(`
`)?iA(t.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):t}</slot>
			</div>
		</sl-tooltip>`}};n0.styles=j`
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
	`,nQ([eD()],n0.prototype,"content",2),nQ([eD({reflect:!0})],n0.prototype,"placement",2),nQ([eD({type:Boolean})],n0.prototype,"disabled",2),nQ([eD({type:Number})],n0.prototype,"distance",2),nQ([eD({type:Boolean,attribute:"hide-on-click"})],n0.prototype,"hideOnClick",2),nQ([eD({type:Boolean})],n0.prototype,"hoist",2),nQ([ej()],n0.prototype,"suppressed",2),n0=nQ([eM("gl-tooltip")],n0);var n1=Object.defineProperty,n2=Object.getOwnPropertyDescriptor,n5=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?n2(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&n1(r,o,a),a};let n3=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(t){if(t.has("href")&&this.setAttribute("role",this.href?"link":"button"),t.has("disabled")){let r=t.get("disabled");r?this.setAttribute("aria-disabled",r.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(t)}render(){return this.tooltip?e$`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eP}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?e$`<gl-tooltip placement=${this.tooltipPlacement??eP}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?e$`<a
				class="control"
				tabindex="${(!1===this.disabled?void 0:-1)??eP}"
				href=${this.href}
				@keypress=${t=>this.onLinkKeypress(t)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:e$`<button
			class="control"
			role=${this.role??eP}
			aria-checked=${this.ariaChecked??eP}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(t){" "===t.key&&this.control.click()}focus(t){this.control.focus(t)}blur(){this.control.blur()}click(){this.control.click()}};n3.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},n3.styles=[ow,j`
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
				${ov}
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
		`],n5([eN(".control")],n3.prototype,"control",2),n5([eD({reflect:!0})],n3.prototype,"appearance",2),n5([eD({reflect:!0})],n3.prototype,"variant",2),n5([eD({type:Boolean,reflect:!0})],n3.prototype,"disabled",2),n5([eD({reflect:!0})],n3.prototype,"density",2),n5([eD({type:Boolean,reflect:!0})],n3.prototype,"full",2),n5([eD()],n3.prototype,"href",2),n5([eD()],n3.prototype,"tooltip",2),n5([eD()],n3.prototype,"tooltipPlacement",2),n5([eD({type:Boolean,reflect:!0})],n3.prototype,"truncate",2),n3=n5([eM("gl-button")],n3);var n4=Object.defineProperty,n6=Object.getOwnPropertyDescriptor,n8=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?n6(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&n4(r,o,a),a};let n7=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return e$`<div class="group"><slot></slot></div>`}};n7.styles=[ow,j`
			:host {
				--button-group-gap: 0.4rem;
				--button-max-width: 30rem;
				--button-group-max-width: 30rem;
				display: block;
				max-width: var(--button-max-width, 30rem);
				margin-inline: auto;
				text-align: left;
				transition: max-width 0.2s ease-out;
			}

			:host([grouping='gap-wide']) {
				--button-group-gap: 1rem;
			}

			:host([grouping='split']) {
				--button-group-gap: 0.1rem;
			}

			@media (min-width: 640px) {
				:host([layout='shift']) {
					--button-max-width: 100%;
				}
			}

			:host([layout='full']) {
				--button-max-width: 100%;
				--button-group-max-width: 100%;
			}

			.group {
				display: inline-flex;
				gap: var(--button-group-gap, 0.4rem);
				width: 100%;
				max-width: var(--button-group-max-width, 30rem);
			}

			:host([grouping='split']) ::slotted(*:not(:first-child)) {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
			:host([grouping='split']) ::slotted(*:not(:last-child)) {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		`],n8([eD({type:Boolean})],n7.prototype,"editor",2),n8([eD({reflect:!0})],n7.prototype,"layout",2),n8([eD({reflect:!0})],n7.prototype,"grouping",2),n7=n8([eM("button-container")],n7);let n9=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a"}),se=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147"});var st=Object.defineProperty,sr=Object.getOwnPropertyDescriptor,so=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sr(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&st(r,o,a),a};function si(t,r=""){return D(Object.entries(t).map(([t,o])=>(function(t,r,o=""){return`:host([icon='${o}${t}'])::before { content: '${r}'; }`})(t,o,r)).join(""))}let sn=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(t){t.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(t)}};sn.styles=j`
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

		${si(n9)}
		${si(se,"gl-")}

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
	`,so([eD({reflect:!0})],sn.prototype,"icon",2),so([eD({reflect:!0})],sn.prototype,"modifier",2),so([eD({type:Number})],sn.prototype,"size",2),so([eD({reflect:!0})],sn.prototype,"flip",2),so([eD({reflect:!0})],sn.prototype,"rotate",2),sn=so([eM("code-icon")],sn),nq.define("sl-popup");var ss=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,sl=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sa(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ss(r,o,a),a};let sc=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleTriggerBlur=t=>{this.open&&this.hasTrigger("focus")&&(t.relatedTarget&&this.contains(t.relatedTarget)||this.hide())},this.handleTriggerClick=t=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(t.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=()=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handlePopupBlur=t=>{let r=t.composedPath();r.includes(this)||r.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=t=>{let r=t.composedPath();r.includes(this)||r.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let t=rm(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let t=rm(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),t)}}}static closeOthers(t){for(let r of sc.openPopovers)r===t||r.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINS||r.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),sc.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}render(){return e$`<sl-popup
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
		</sl-popup>`}async show(t){if(this.open||this.suppressed){"click"===t&&"hover"===this._triggeredBy&&(this._triggeredBy=t);return}return(null==this._triggeredBy||"hover"!==t)&&(this._triggeredBy=t),sc.closeOthers(this),this.open=!0,sc.openPopovers.add(this),rf(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,sc.openPopovers.delete(this),rf(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(t){return this.trigger.split(" ").includes(t)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};sc.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sc.openPopovers=new Set,sc.styles=[ok,j`
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
		`],sl([eN("#popover")],sc.prototype,"body",2),sl([eN("sl-popup")],sc.prototype,"popup",2),sl([eD({reflect:!0})],sc.prototype,"placement",2),sl([eD({type:Object})],sc.prototype,"anchor",2),sl([eD({reflect:!0,type:Boolean})],sc.prototype,"disabled",2),sl([eD({type:Number})],sc.prototype,"distance",2),sl([eD({reflect:!0,type:Boolean})],sc.prototype,"open",2),sl([eD({reflect:!0,type:Boolean})],sc.prototype,"arrow",2),sl([eD({type:Number})],sc.prototype,"skidding",2),sl([eD()],sc.prototype,"trigger",2),sl([eD({type:Boolean})],sc.prototype,"hoist",2),sl([eD({reflect:!0})],sc.prototype,"appearance",2),sl([ej()],sc.prototype,"suppressed",2),sl([tW("open",{afterFirstUpdate:!0})],sc.prototype,"handleOpenChange",1),sl([tW(["distance","hoist","placement","skidding"])],sc.prototype,"handleOptionsChange",1),sl([tW("disabled")],sc.prototype,"handleDisabledChange",1),sc=sl([eM("gl-popover")],sc);var sd=Object.defineProperty,sh=Object.getOwnPropertyDescriptor,sp=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sh(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sd(r,o,a),a};let su=class extends th(lit_element_i){constructor(){super(...arguments),this._showUpgrade=!1}get showUpgrade(){return this._showUpgrade}set showUpgrade(t){this._showUpgrade=t}get accountAvatar(){return this.hasAccount&&this._subscription.avatar.get()}get accountName(){return this.subscription?.account?.name??""}get accountEmail(){return this.subscription?.account?.email??""}get hasAccount(){return this.subscription?.account!=null}get isReactivatedTrial(){return this.subscriptionState===o6.Trial&&(this.subscription?.plan.effective.trialReactivationCount??0)>0}get planId(){return this._subscription.subscription.get()?.plan.actual.id??"pro"}get effectivePlanId(){return this._subscription.subscription.get()?.plan.effective.id??"pro"}get planName(){return function(t,r,o){switch(t){case o6.Community:case o6.Trial:return`${"student"===o?it("student"):it("pro")} Trial`;case o6.TrialExpired:case o6.TrialReactivationEligible:return it("community-with-account");case o6.VerificationRequired:return`${it(r??"pro")} (Unverified)`;default:return it(r??"pro")}}(this.subscriptionState??o6.Community,this.planId,this.effectivePlanId)}get planTier(){let t=this.subscription;return null!=t&&ii(t)?"student"===t.plan.effective.id?"Student":"Pro Trial":o9(this.planId)}get subscription(){return this._subscription.subscription.get()}get subscriptionState(){return this.subscription?.state}get trialDaysRemaining(){return null==this.subscription?0:ir(this.subscription,"days")??0}focus(){this._chip.focus()}render(){return void 0===this.subscription?e$`<span
				id="chip"
				class="chip chip--skeleton"
				tabindex="-1"
				aria-label="Loading account status"
				role="status"
			></span>`:e$`<gl-popover placement="bottom" trigger="hover focus click" hoist>
				<span id="chip" slot="anchor" class="chip" tabindex="0">
					${this.accountAvatar?e$`<img class="chip__media" src=${this.accountAvatar} />`:e$`<code-icon class="chip__media" icon="gl-gitlens" size="16"></code-icon>`}
					<span>${this.planTier}</span>
				</span>
				<div slot="content" class="content" tabindex="-1">
					<div class="header">
						<span class="header__title">${this.planName}</span>
						<span class="header__actions">
							${this.hasAccount?e$`<gl-button
											appearance="toolbar"
											href="${ia("gitlens.plus.validate",{source:"account"})}"
											tooltip="Synchronize Status"
											aria-label="Synchronize Status"
											><code-icon icon="sync"></code-icon
										></gl-button>
										<gl-button
											appearance="toolbar"
											href="${ia("gitlens.plus.manage",{source:"account"})}"
											tooltip="Manage Account"
											aria-label="Manage Account"
											><code-icon icon="gear"></code-icon
										></gl-button>
										<gl-button
											appearance="toolbar"
											href="${ia("gitlens.plus.logout",{source:"account"})}"
											tooltip="Sign Out"
											aria-label="Sign Out"
											><code-icon icon="sign-out"></code-icon
										></gl-button>`:eP}
						</span>
					</div>
					${this.renderAccountInfo()} ${this.renderAccountState()}
				</div>
			</gl-popover>
			${this.renderUpgradeContent()}`}show(){this._popover.show(),this.focus()}renderAccountInfo(){let t=this._subscription.subscription.get(),r=this._subscription.avatar.get(),o=this._subscription.organizationsCount.get(),i=t?.activeOrganization?.name??"";return this.hasAccount&&i?e$`<div class="account-info">
			<span class="row">
				<span class="row__media"
					>${r?e$`<img src=${r} />`:e$`<code-icon icon="gl-gitlens" size="20"></code-icon>`}</span
				>
				<span class="details"
					><p class="details__title">${this.accountName}</p>
					<p class="details__subtitle">${this.accountEmail}</p></span
				>
			</span>
			<span class="row">
				<span class="row__media"><code-icon icon="organization" size="20"></code-icon></span>
				<span class="details"><p class="details__title">${i}</p></span>
				${o1(o>1,()=>e$`<div class="details__button">
							<gl-button
								appearance="toolbar"
								href="${ia("gitlens.gk.switchOrganization",{source:"account",detail:{organization:t?.activeOrganization?.id}})}"
								aria-label="Switch Active Organization"
								><span class="org__badge">+${o-1}</span
								><code-icon icon="arrow-swap"></code-icon
								><span slot="tooltip"
									>Switch Active Organization
									<hr />
									You are in
									${tQ("organization",o-1,{infix:" other "})}</span
								></gl-button
							>
						</div>`)}
			</span>
			${o1(is(this.subscription?.state??o6.Community),()=>{var r;return e$`<span class="row">
						<span class="row__media"><code-icon icon="unlock" size="20"></code-icon></span>
						<span class="details"
							><p class="details__title">
								${null!=this.subscription&&ii(this.subscription)?e$`${o9(this.effectivePlanId)} plan
											<span class="details__subtitle">(trial)</span>`:e$`${o9(this.planId)} plan`}
							</p></span
						>
						${null!=this.subscription&&io(this.subscription)&&0>(r=this.planId,ie(r)-ie("advanced"))?e$`<div class="details__button">
									<gl-button
										appearance="secondary"
										href="${ia("gitlens.plus.upgrade",{plan:"advanced",source:"account",detail:{location:"plan-section:upgrade-button",organization:t?.activeOrganization?.id,plan:"advanced"}})}"
										aria-label="Upgrade to Advanced"
										><span class="upgrade-button">Upgrade</span>${this.renderPromo("advanced","icon","suffix")}
										<span slot="tooltip"
											>Upgrade to the Advanced plan for access to self-hosted integrations,
											advanced AI features @ 1M tokens/week, and more
											${this.renderPromo("advanced","info")}
										</span>
									</gl-button>
								</div>`:eP}
					</span>`})}
		</div>`:eP}renderAccountState(){let t=this._subscription.subscription.get();switch(this.subscriptionState){case o6.Paid:return e$`<div class="account-status">
					${this.renderIncludesDevEx()}${this.renderReferFriend()}
				</div> `;case o6.VerificationRequired:return e$`<div class="account-status">
					<p>You must verify your email before you can access Pro features.</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.resendVerification",{source:"account"})}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							href="${ia("gitlens.plus.validate",{source:"account"})}"
							><code-icon size="20" icon="refresh"></code-icon>
						</gl-button>
					</button-container>
				</div>`;case o6.Trial:{let r=this.trialDaysRemaining;return e$`<div class="account-status">
					${this.isReactivatedTrial?e$`<p>
								<code-icon icon="megaphone"></code-icon>
								See
								<a href="${o4.releaseNotes}">what's new</a>
								in GitLens.
							</p>`:eP}
					<p>
						You have
						<strong>${r<1?"<1 day":tQ("day",r,{infix:" more "})} left</strong>
						in your ${"Student"===this.planTier?"Student":"Pro"} trial. Once your trial ends, you will
						only be able to use Pro features on publicly-hosted repos.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")} ${this.renderIncludesDevEx()} ${this.renderReferFriend()}
				</div>`}case o6.TrialExpired:return e$`<div class="account-status">
					<p>Thank you for trying <a href="${o4.communityVsPro}">GitLens Pro</a>.</p>
					<p>Continue leveraging Pro features and workflows for privately hosted repos by upgrading today.</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")} ${this.renderIncludesDevEx()} ${this.renderReferFriend()}
				</div>`;case o6.TrialReactivationEligible:return e$`<div class="account-status">
					<p>
						Reactivate your GitLens Pro trial and experience all the new Pro features — free for another
						${tQ("day",14)}.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.reactivateProTrial",{source:"account"})}"
							tooltip="Reactivate your Pro trial for another ${tQ("day",14)}"
							>Reactivate GitLens Pro Trial</gl-button
						>
					</button-container>
					${this.renderReferFriend()}
				</div>`;default:return e$`<div class="account-status">
					<p>
						Unlock advanced features and workflows for private repos, accelerate reviews, and streamline
						collaboration with
						<a href="${o4.communityVsPro}">GitLens Pro</a>.
					</p>
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.signUp",{source:"account"})}"
							>Try GitLens Pro</gl-button
						>
						<span class="button-suffix"
							>or
							<a
								href="${ia("gitlens.plus.login",{source:"account"})}"
								>sign in</a
							></span
						>
					</button-container>
					<p>Get ${14} days of GitLens Pro for free — no credit card required.</p>
				</div>`}}renderIncludesDevEx(){return e$`<p>Includes access to <a href="${o4.platform}">GitKraken's DevEx platform</a></p>`}renderReferFriend(){return null!=this.subscription&&io(this.subscription)?e$`<p>
			<a
				href="${ia("gitlens.plus.referFriend",{source:"account"})}"
				>Refer a friend</a
			>
			&mdash; give 50% off and get up to $20
		</p>`:eP}renderUpgradeContent(){let t=this._subscription.subscription.get();return null!=t&&io(t)?(this.showUpgrade=!1,eP):(this.showUpgrade=!0,e$`<gl-popover placement="bottom" trigger="hover focus click" hoist>
			<span slot="anchor" class="chip chip--outlined" tabindex="0">
				<span>Upgrade</span>
			</span>
			<div slot="content" class="content" tabindex="-1">
				<div class="header">
					<span class="header__title">Advantages of GitLens Pro</span>
				</div>
				<div class="upgrade">
					<button-container layout="editor">
						<gl-button
							full
							href="${ia("gitlens.plus.upgrade",{plan:"pro",source:"account",detail:{location:"upgrade-chip:upgrade-button",organization:t?.activeOrganization?.id,plan:"pro"}})}"
							>Upgrade to Pro</gl-button
						>
					</button-container>
					${this.renderPromo("pro")}

					<ul>
						<li>Unlimited cloud integrations</li>
						<li>Smart AI features &mdash; 250K tokens/week</li>
						<li>
							Powerful tools &mdash; Commit Graph, Visual History, &amp; Git Worktrees for private repos
						</li>
						<li>Streamlined workflows &mdash; start work from issues, pull request reviews</li>
					</ul>

					<br />
					<button-container>
						<gl-button
							full
							href="${ia("gitlens.plus.upgrade",{plan:"advanced",source:"account",detail:{location:"upgrade-chip:upgrade-button",organization:t?.activeOrganization?.id,plan:"advanced"}})}"
							>Upgrade to Advanced</gl-button
						>
					</button-container>
					${this.renderPromo("advanced")}

					<ul>
						<li>Self-hosted integrations</li>
						<li>Advanced AI features &mdash; 1M tokens/week</li>
					</ul>
				</div>
			</div>
		</gl-popover>`)}renderPromo(t,r="info",o){return e$`<gl-promo
			slot=${o??eP}
			.promoPromise=${this.promos.getApplicablePromo(t,"account")}
			.type=${r}
			.source="${{source:"account"}}"
		></gl-promo>`}};su.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},su.styles=[ow,o_,oy,il,id,j`
			:host {
				display: inline-flex;
				align-items: center;
				gap: 0.8rem;
			}

			:host-context(.vscode-dark),
			:host-context(.vscode-high-contrast) {
				--gl-account-chip-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 10%);
				--gl-account-chip-media-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 25%);
				--gl-account-account-media-color: color-mix(in lab, var(--vscode-sideBar-background), #fff 20%);
			}

			:host-context(.vscode-light),
			:host-context(.vscode-high-contrast-light) {
				--gl-account-chip-color: color-mix(in lab, var(--vscode-sideBar-background), #000 7%);
				--gl-account-chip-media-color: color-mix(in lab, var(--vscode-sideBar-background), #000 18%);
				--gl-account-account-media-color: color-mix(in lab, var(--vscode-sideBar-background), #000 15%);
			}

			.chip {
				padding-right: 0.6rem;

				font-size: 1.1rem;
				font-weight: 400;
				text-transform: uppercase;
				line-height: 2rem;
				background-color: var(--gl-account-chip-color);
			}

			.chip--outlined {
				background-color: transparent;
				border: 1px solid var(--gl-account-chip-color);
			}

			.chip__media {
				flex: 0 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.2rem;
			}

			img.chip__media {
				width: 1.6rem;
				aspect-ratio: 1 / 1;
				border-radius: 50%;
				background-color: var(--gl-account-chip-media-color);
			}

			.chip-group {
				display: inline-flex;
				flex-direction: row;
				gap: 0.8rem;
				cursor: pointer;
			}

			.account-info {
				display: flex;
				flex-direction: column;
				gap: 0.2rem;
			}

			.row {
				position: relative;
				display: flex;
				flex-direction: row;
				gap: 0 0.6rem;
				align-items: center;
			}

			.row:last-of-type {
				margin-bottom: 0.6rem;
			}

			.row__media {
				flex: 0 0 auto;
				width: 3.4rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.row__media code-icon {
				color: var(--color-foreground--65);
			}

			.row__media img {
				width: 2rem;
				aspect-ratio: 1 / 1;
				border-radius: 50%;
				background-color: var(--gl-account-account-media-color);
			}

			.details {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.details__title {
				font-size: 1.3rem;
				font-weight: 600;
				margin: 0;
			}

			.details__subtitle {
				font-size: 1.1rem;
				font-weight: 400;
				margin: 0;
				color: var(--color-foreground--65);
			}

			.details__button {
				flex: none;
				display: flex;
				gap: 0.2rem;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}

			.org__badge {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 2.4rem;
				height: 2.4rem;
				line-height: 2.4rem;
				font-size: 1rem;
				font-weight: 600;
				color: var(--color-foreground--65);
				background-color: var(--vscode-toolbar-hoverBackground);
				border-radius: 50%;
				margin-right: 0.6rem;
			}

			.account-status > :first-child {
				margin-block-start: 0;
			}
			.account-status > :last-child {
				margin-block-end: 0;
			}

			button-container {
				margin-bottom: 1.3rem;
			}

			button-container .button-suffix {
				display: inline-flex;
				align-items: center;
				white-space: nowrap;
				gap: 0.2em;
				margin-left: 0.4rem;
			}

			.upgrade > * {
				margin-block: 0.8rem 0;
			}

			.upgrade ul {
				padding-inline-start: 2rem;
			}

			.upgrade li {
				text-wrap: pretty;
			}

			.upgrade gl-promo::part(text) {
				margin-block-start: 0;
				/* border-radius: 0.3rem;
				padding: 0.2rem 0.4rem;
				background-color: var(--gl-account-chip-color); */
			}

			.upgrade gl-promo:not([has-promo]) {
				display: none;
			}

			.upgrade-button {
				text-transform: uppercase;
				font-size: 1rem;
			}

			@keyframes shimmer {
				100% {
					transform: translateX(100%);
				}
			}

			.chip--skeleton {
				position: relative;
				overflow: hidden;
				width: 8rem;
				height: 2.4rem;
				background-color: var(--gl-account-chip-color);
				cursor: default;
			}

			.chip--skeleton::before {
				content: '';
				position: absolute;
				inset: 0;
				background-image: linear-gradient(
					to right,
					transparent 0%,
					var(--color-background--lighten-15) 20%,
					var(--color-background--lighten-30) 60%,
					transparent 100%
				);
				transform: translateX(-100%);
				animation: shimmer 2s ease-in-out infinite;
			}
		`],sp([A({context:"subscription",subscribe:!0})],su.prototype,"_subscription",2),sp([eD({type:Boolean,reflect:!0,attribute:"show-upgrade"})],su.prototype,"showUpgrade",1),sp([eN("#chip")],su.prototype,"_chip",2),sp([eN("gl-popover")],su.prototype,"_popover",2),sp([A({context:"promos"})],su.prototype,"promos",2),su=sp([eM("gl-account-chip")],su);let private_async_helpers_s=class private_async_helpers_s{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let sg=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...t){return t.find(t=>!sg(t))??eS}update(t,r){let o=this._$Cbt,i=o.length;this._$Cbt=r;let n=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<r.length&&!(t>this._$Cwt);t++){let c=r[t];if(!sg(c))return this._$Cwt=t,c;t<i&&c===o[t]||(this._$Cwt=0x3fffffff,i=0,Promise.resolve(c).then(async t=>{for(;a.get();)await a.get();let r=n.deref();if(void 0!==r){let o=r._$Cbt.indexOf(c);o>-1&&o<r._$Cwt&&(r._$Cwt=o,r.setValue(t))}}))}return eS}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let sb=tp(until_c);var sm=Object.defineProperty,sf=Object.getOwnPropertyDescriptor,sv=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sf(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sm(r,o,a),a};let sy=class extends lit_element_i{constructor(){super(...arguments),this.type="info",this._hasPromo=!1}get hasPromo(){return this._hasPromo}set hasPromo(t){this._hasPromo=t}render(){return e$`${sb(this.promoPromise?.then(t=>this.renderPromo(t)),eP)}`}renderPromo(t){if(!t?.content?.webview){this.hasPromo=!1;return}let r=t.content.webview;switch(this.type){case"icon":return e$`<code-icon icon="star-full" size="16"></code-icon>`;case"info":if(r.info)return this.hasPromo=!0,e$`<p class="promo" part="text">${iA(r.info.html)}</p>`;break;case"link":if(r.link)return this.hasPromo=!0,e$`<a
						class="link"
						part="link"
						href="${this.getCommandUrl(t)}"
						title="${r.link.title??eP}"
						>${iA(r.link.html)}</a
					>`}return this.hasPromo=!1,eP}getCommandUrl(t){let r;return t?.content?.webview?.link?.command?.startsWith("command:")&&(r=t.content.webview.link.command.substring(8)),ia(r??"gitlens.plus.upgrade",this.source)}focus(){this._focusable?.focus()}};sy.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sy.styles=[j`
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
				${of}
			}

			.link:hover {
				color: inherit;
				text-decoration: underline;
			}
		`],sv([eN('a,button,[tabindex="0"]')],sy.prototype,"_focusable",2),sv([eD({type:Object})],sy.prototype,"promoPromise",2),sv([eD({type:Object})],sy.prototype,"source",2),sv([eD({reflect:!0,type:String})],sy.prototype,"type",2),sv([eD({type:Boolean,reflect:!0,attribute:"has-promo"})],sy.prototype,"hasPromo",1),sy=sv([eM("gl-promo")],sy);var sw=Object.defineProperty,s_=Object.getOwnPropertyDescriptor,sk=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?s_(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sw(r,o,a),a};let sx=class extends lit_element_i{constructor(){super(...arguments),this.cloud=!1,this.placement="bottom",this.preview=!1}get daysRemaining(){return null==this.subscription?0:ir(this.subscription,"days")??0}get state(){return this.subscription?.state}render(){return e$`
			<gl-popover placement=${this.placement} hoist>
				<span slot="anchor" class="badge" tabindex="0">${this.renderBadge()}</span>
				<div slot="content" class="badge-popup" tabindex="-1">
					${this.renderPopoverHeader()}${this.renderPopoverContent()}
				</div>
			</gl-popover>
		`}renderBadge(){let t=this.preview?"Preview":"Pro";if(null!=this.subscription){if(this.state===o6.VerificationRequired)return e$`${t} <code-icon class="badge-icon" icon="warning" size="10"></code-icon>`;else if(io(this.subscription)||this.cloud&&null!=this.subscription.account)return e$`${t} <code-icon class="badge-icon" icon="check" size="10"></code-icon>`;else if(ii(this.subscription))return e$`${t} <code-icon class="badge-icon" icon="clock" size="10"></code-icon>`}return t}renderPopoverHeader(){let t=e$`<span class="popup-title">${this.preview?"Preview feature":"Pro feature"}</span>`;return this.state===o6.Paid?e$`<div class="popup-header">${t}</div>`:this.cloud?this.preview?e$`<div class="popup-header">
					${t}<span class="popup-subtitle"
						>Unlock this feature with an account and may require GitLens Pro in the future</span
					>
				</div>`:e$`<div class="popup-header">
				${t}<span class="popup-subtitle"> Unlock this feature with GitLens Pro</span>
			</div>`:this.preview?e$`<div class="popup-header">
				${t}<span class="popup-subtitle">May require GitLens Pro in the future</span>
			</div>`:e$`<div class="popup-header">
			${t}<span class="popup-subtitle"> Unlock this feature for privately hosted repos with GitLens Pro</span>
		</div>`}renderPopoverContent(){let t;if(null==this.subscription)return eP;switch(this.state){case o6.Paid:t=e$`<p>
					Your
					<gl-tooltip hoist content="Show Account view">
						<a href="${ia("gitlens.showAccountView")}"
							>${it(this.subscription?.plan.actual.id??"pro")}</a
						>
					</gl-tooltip>
					plan provides access to all Pro features.
				</p>`;break;case o6.VerificationRequired:t=e$`<p>You must verify your email before you can access Pro features.</p>
					<div class="actions">
						<gl-button
							density="tight"
							href="${ia("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							appearance="secondary"
							density="tight"
							href="${ia("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</div>`;break;case o6.Trial:{let r=this.daysRemaining;t=e$`<p>
						You have
						<strong>${r<1?"<1 day":tQ("day",r,{infix:" more "})} left</strong>
						in your Pro trial. Once your trial ends, you will only be able to use Pro features on
						publicly-hosted repos.
					</p>
					${this.renderUpgradeActions()}`;break}case o6.TrialExpired:t=e$`<p>
						Your Pro trial has ended. You can now only use Pro features on publicly-hosted repos.
					</p>
					${this.renderUpgradeActions(e$`<p>Please upgrade for full access to all GitLens Pro features:</p>`)}`;break;case o6.TrialReactivationEligible:t=e$`<p>
						Reactivate your Pro trial and experience all the new Pro features — free for another
						${tQ("day",14)}!
					</p>
					<div class="actions center">
						<gl-button
							density="tight"
							href="${ia("gitlens.plus.reactivateProTrial",this.source)}"
							tooltip="Reactivate your Pro trial for another ${tQ("day",14)}"
							>Reactivate Pro Trial</gl-button
						>
					</div>`;break;default:t=e$`<p>
						You only have access to
						<gl-tooltip hoist content="Pro features that do not require an account"
							><span class="hint">local</span></gl-tooltip
						>
						Pro features on publicly-hosted repos.
					</p>
					${this.renderStartTrialActions()}`}return e$`<div class="popup-content">${t}</div>`}renderStartTrialActions(){return e$`<div class="actions">
			<p>For access to all Pro features:</p>
			<gl-button density="tight" href="${ia("gitlens.plus.signUp",this.source)}"
				>Start ${14}-day Pro Trial</gl-button
			>
			&nbsp;or
			<a href="${ia("gitlens.plus.login",this.source)}" title="Sign In">sign in</a>
		</div>`}renderUpgradeActions(t){return e$`<div class="actions">
			${t??eP}
			<gl-button
				density="tight"
				href="${ia("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-badge"}})}"
				>Upgrade to Pro</gl-button
			>
			${this.renderPromo()}
		</div>`}renderPromo(){return e$`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"badge")}
			.source=${this.source}
		></gl-promo>`}};sx.styles=[ow,o_,j`
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
				${D(of)}
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
		`],sk([eD({type:Boolean})],sx.prototype,"cloud",2),sk([eD({reflect:!0})],sx.prototype,"placement",2),sk([eD({type:Boolean})],sx.prototype,"preview",2),sk([A({context:"promos"})],sx.prototype,"promos",2),sk([eD({type:Object})],sx.prototype,"source",2),sk([eD({attribute:!1})],sx.prototype,"subscription",2),sx=sk([eM("gl-feature-badge")],sx);var s$=Object.defineProperty,sC=Object.getOwnPropertyDescriptor,sS=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sC(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&s$(r,o,a),a};let sP=class extends th(lit_element_i){get hasAccount(){return this._subscription.subscription.get()?.account!=null}get isPaidAccount(){return this._subscription.subscription.get()?.state===o6.Paid}get isProAccount(){return is(this._subscription.subscription.get()?.state)}get hasConnectedIntegrations(){return this.hasAccount&&this.integrations.some(t=>t.connected)}get ai(){return this._ai.state.get()}get aiEnabled(){return this.ai.enabled&&this.ai.orgEnabled}get integrations(){return this._integrations.integrations.get()}focus(){this._chip.focus()}render(){if(void 0===this._subscription.subscription.get())return e$`<span
				id="chip"
				class="chip chip--skeleton"
				tabindex="-1"
				aria-label="Loading integrations status"
				role="status"
			></span>`;let t=this.hasConnectedIntegrations,r=function(t){let r=new Map;for(let o of t){let t=r.get(o.icon);t&&(!o.connected||t.connected)||r.set(o.icon,o)}return t=>r.get(t.icon)===t}(this.integrations);return e$`<gl-popover placement="bottom" trigger="hover click focus" hoist>
			<span slot="anchor" class="chip" tabindex="0"
				>${!t?e$`<span class="chip__label">Connect</span>`:""}${this.integrations.filter(r).map(t=>this.renderIntegrationStatus(t))}${this.renderAIStatus()}${this.renderMcpStatus()}</span
			>
			<div slot="content" class="content">
				<div class="header">
					<span class="header__title">Integrations</span>
					<span class="header__actions"></span>
						<gl-button
							appearance="toolbar"
							href="${ia("gitlens.plus.validate",{source:"home",detail:"integrations"})}"
							tooltip="Synchronize Status"
							aria-label="Synchronize Status"
							><code-icon icon="sync"></code-icon
						></gl-button>
						<gl-button
							appearance="toolbar"
							href="${ia("gitlens.plus.cloudIntegrations.manage",{source:{source:"home"}})}"
							tooltip="Manage Integrations"
							aria-label="Manage Integrations"
							><code-icon icon="gear"></code-icon></gl-button
					></span>
				</div>
				<div class="integrations">${!t?e$`<p>
									Connect hosting services like <strong>GitHub</strong> and issue trackers like
									<strong>Jira</strong> to track progress and take action on PRs and issues related to
									your branches.
								</p>
								<button-container>
									<gl-button
										full
										href="${ia("gitlens.plus.cloudIntegrations.connect",{integrationIds:this.integrations.map(t=>t.id),source:{source:"home",detail:"integrations"}})}"
										>Connect Integrations</gl-button
									>
								</button-container>`:this.integrations.map(t=>this.renderIntegrationRow(t))}${this.renderAIRow()}${this.renderMcpRow()}</div>
			</div>
		</gl-popover>`}renderIntegrationStatus(t){return t.requiresPro&&!this.isProAccount?e$`<span
				class="integration status--${t.connected?"connected":"disconnected"} is-locked"
				slot="anchor"
				><code-icon icon="${t.icon}"></code-icon
			></span>`:e$`<span
			class="integration status--${t.connected?"connected":"disconnected"}"
			slot="anchor"
			><code-icon icon="${t.icon}"></code-icon
		></span>`}renderIntegrationRow(t){let r=t.requiresPro&&!this.isProAccount,o=t.requiresPro&&!this.isPaidAccount;return e$`<div
			class="integration-row status--${t.connected?"connected":"disconnected"}${r?" is-locked":""}"
		>
			<span class="integration__icon"><code-icon icon="${t.icon}"></code-icon></span>
			<span class="integration__content">
				<span class="integration__title">
					<span>${t.name}</span>
					${o?e$` <gl-feature-badge
								placement="right"
								.source=${{source:"home",detail:"integrations"}}
								cloud
							></gl-feature-badge>`:eP}
				</span>
				<span class="integration__details">${function(t){let r=t.supports.map(t=>sO.get(t));if(0===r.length)return"";if(1===r.length)return`Supports ${r[0]}`;let o=r.pop();return`Supports ${r.join(", ")}, and ${o}`}(t)}</span>
			</span>
			<span class="integration__actions">
				${r?e$`<gl-button
							appearance="toolbar"
							href="${ia("gitlens.plus.upgrade",{plan:"pro",source:"home",detail:"integrations"})}"
							tooltip="Unlock ${t.name} features with GitLens Pro"
							aria-label="Unlock ${t.name} features with GitLens Pro"
							><code-icon class="status-indicator" icon="lock"></code-icon
						></gl-button>`:t.connected?e$`<gl-tooltip
								class="status-indicator status--connected"
								placement="bottom"
								content="Connected"
								><code-icon class="status-indicator" icon="check"></code-icon
							></gl-tooltip>`:e$`<gl-button
								appearance="toolbar"
								href="${ia("gitlens.plus.cloudIntegrations.connect",{integrationIds:[t.id],source:{source:"home",detail:"integrations"}})}"
								tooltip="Connect ${t.name}"
								aria-label="Connect ${t.name}"
								><code-icon icon="plug"></code-icon
							></gl-button>`}
			</span>
		</div>`}renderAIStatus(){let t=this._ai.model.get();return e$`<span
			class="integration status--${this.aiEnabled&&null!=t?"connected":"disconnected"}"
			slot="anchor"
		>
			<code-icon icon="${this.aiEnabled&&null!=t?"sparkle-filled":"sparkle"}"></code-icon>
		</span>`}renderAIRow(){let t=this._ai.model.get(),r=this.aiEnabled&&null!=t,o=!this.aiEnabled;return e$`<div
			class="integration-row integration-row--ai status--${r?"connected":"disconnected"}${o?" is-locked":""}"
		>
			<span class="integration__icon"><code-icon icon="${r?"sparkle-filled":"sparkle"}"></code-icon></span>
			${this.aiEnabled?e$`<span class="integration__content">
							${t?.provider.name?e$`<span class="integration__title">
										<span>${t.provider.name}</span>
										${eP}
									</span>`:e$`<span class="integration_details">Select AI model to enable AI features</span>`}
							${t?.name?e$`<span class="integration__details">${t.name}</span>`:eP}
						</span>
						<span class="integration__actions">
							<gl-button
								appearance="toolbar"
								href="${ia("gitlens.ai.switchProvider",{source:"home",detail:"integrations"})}"
								tooltip="Switch AI Provider/Model"
								aria-label="Switch AI Provider/Model"
								><code-icon icon="arrow-swap"></code-icon
							></gl-button>
						</span>`:e$`<span class="integration__content">
							<span class="integration_details"
								>GitLens AI features have been
								disabled${!this.ai.enabled?" via settings":" by your GitKraken admin"}</span
							>
						</span>
						${!this.ai.enabled?e$` <span class="integration__actions">
									<gl-button
										appearance="toolbar"
										href="${ia("gitlens.ai.enable",{source:"home",detail:"integrations"})}"
										tooltip="Re-enable AI Features"
										aria-label="Re-enable AI Features"
										><code-icon icon="unlock"></code-icon
									></gl-button>
								</span>`:eP}`}
		</div>`}renderMcpStatus(){let{mcp:t}=this.ai,r=this.aiEnabled&&t.settingEnabled&&t.installed;return e$`<span class="integration status--${r?"connected":"disconnected"}" slot="anchor">
			<code-icon icon="mcp"></code-icon>
		</span>`}renderMcpRow(){let{mcp:t}=this.ai,r=this.aiEnabled&&t.settingEnabled,o=r&&t.installed;return e$`<div class="integration-row integration-row--mcp status--${o?"connected":"disconnected"}">
			<span class="integration__icon"><code-icon icon="mcp"></code-icon></span>
			${r?t.installed?e$`<span class="integration__content">
								<span class="integration__title">GitKraken MCP</span>
								<span class="integration__details">Leverage Git &amp; Integrations in AI chats</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ia("gitlens.ai.mcp.selectAgents",{source:"home",detail:"integrations"})}"
									tooltip="Connect More Agents"
									aria-label="Connect More Agents"
									><code-icon icon="plug"></code-icon
								></gl-button>
								<gl-button
									appearance="toolbar"
									href="${ia("gitlens.ai.mcp.reinstall",{source:"home",detail:"integrations"})}"
									tooltip="Reinstall GitKraken MCP"
									aria-label="Reinstall GitKraken MCP"
									><code-icon icon="sync"></code-icon
								></gl-button>
								<gl-tooltip
									class="status-indicator status--connected"
									placement="bottom"
									content="Installed${t.bundled?" (bundled)":""}"
									><code-icon class="status-indicator" icon="check"></code-icon
								></gl-tooltip>
							</span>`:e$`<span class="integration__content">
								<span class="integration__title">GitKraken MCP</span>
								<span class="integration__details">Leverage Git &amp; Integrations in AI chats</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ia("gitlens.ai.mcp.install",{source:"home",detail:"integrations"})}"
									tooltip="Install GitKraken MCP"
									aria-label="Install GitKraken MCP"
									><code-icon icon="plug"></code-icon
								></gl-button>
							</span>`:!this.aiEnabled?e$`<span class="integration__content">
								<span class="integration_details"
									>GitKraken MCP has been
									disabled${!this.ai.enabled?" via settings":" by your GitKraken admin"}</span
								>
							</span>
							${!this.ai.enabled?e$` <span class="integration__actions">
										<gl-button
											appearance="toolbar"
											href="${ia("gitlens.ai.enable",{source:"home",detail:"integrations"})}"
											tooltip="Re-enable AI Features"
											aria-label="Re-enable AI Features"
											><code-icon icon="unlock"></code-icon
										></gl-button>
									</span>`:eP}`:e$`<span class="integration__content">
								<span class="integration_details">GitKraken MCP has been disabled via settings</span>
							</span>
							<span class="integration__actions">
								<gl-button
									appearance="toolbar"
									href="${ia("gitlens.ai.mcp.install",{source:"home",detail:"integrations"})}"
									tooltip="Re-enable MCP"
									aria-label="Re-enable MCP"
									><code-icon icon="unlock"></code-icon
								></gl-button>
							</span>`}
		</div>`}};sP.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sP.styles=[ow,o_,il,j`
			:host-context(.vscode-dark),
			:host-context(.vscode-high-contrast) {
				--gl-chip-skeleton-bg: color-mix(in lab, var(--vscode-sideBar-background), #fff 10%);
			}

			:host-context(.vscode-light),
			:host-context(.vscode-high-contrast-light) {
				--gl-chip-skeleton-bg: color-mix(in lab, var(--vscode-sideBar-background), #000 7%);
			}

			.chip {
				gap: 0.6rem;
				padding: 0.2rem 0.4rem 0.4rem 0.4rem;
				align-items: baseline;
			}

			.chip__label {
				font-size: 1.1rem;
				font-weight: 400;
				text-transform: uppercase;
				color: var(--color-foreground--75);
				margin-right: 0.4rem;
			}

			.integration {
				white-space: nowrap;
			}

			.content {
				gap: 0.6rem;
			}

			:host-context(.vscode-dark),
			:host-context(.vscode-high-contrast) {
				--status-color--connected: #00dd00;
			}

			:host-context(.vscode-light),
			:host-context(.vscode-high-contrast-light) {
				--status-color--connected: #00aa00;
			}

			.status--disconnected.integration {
				color: var(--color-foreground--25);
			}

			.status--connected:not(.is-locked) .status-indicator {
				color: var(--status-color--connected);
			}

			gl-tooltip.status-indicator {
				margin-right: 0.4rem;
			}

			.integrations {
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
				width: 100%;
			}

			.integration-row {
				display: flex;
				gap: 1rem;
				align-items: center;
			}

			.integration-row--ai {
				border-top: 1px solid var(--color-foreground--25);
				padding-top: 0.6rem;
			}

			.integration-row--mcp {
				padding-top: 0;
			}

			.status--disconnected .integration__icon {
				color: var(--color-foreground--25);
			}

			.integration__content {
				flex: 1 1 auto;
				display: block;
			}

			.integration__title {
				display: flex;
				justify-content: space-between;
			}

			.integration__title gl-feature-badge {
				vertical-align: super;
			}

			.integration__details {
				display: block;
				color: var(--color-foreground--75);
				font-size: 1rem;
			}

			.status--disconnected .integration__title,
			.status--disconnected .integration__details {
				color: var(--color-foreground--50);
			}

			.integration__actions {
				flex: none;
				display: flex;
				gap: 0.2rem;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
			}

			button-container {
				margin-bottom: 0.4rem;
				width: 100%;
			}

			p {
				margin: 0;
			}

			gl-popover::part(body) {
				--max-width: 90vw;
			}

			@keyframes shimmer {
				100% {
					transform: translateX(100%);
				}
			}

			.chip--skeleton {
				position: relative;
				overflow: hidden;
				width: 9rem;
				height: 2.2rem;
				background-color: var(--gl-chip-skeleton-bg);
				cursor: default;
			}

			.chip--skeleton::before {
				content: '';
				position: absolute;
				inset: 0;
				background-image: linear-gradient(
					to right,
					transparent 0%,
					var(--color-background--lighten-15) 20%,
					var(--color-background--lighten-30) 60%,
					transparent 100%
				);
				transform: translateX(-100%);
				animation: shimmer 2s ease-in-out infinite;
			}
		`],sS([A({context:"subscription",subscribe:!0})],sP.prototype,"_subscription",2),sS([A({context:"integrations"})],sP.prototype,"_integrations",2),sS([A({context:"ai"})],sP.prototype,"_ai",2),sS([eN("#chip")],sP.prototype,"_chip",2),sP=sS([eM("gl-integrations-chip")],sP);let sO=new Map([["prs","pull requests"],["issues","issues"]]),sA={gettingStarted:"Getting Started",homeView:"Home View",visualizeCodeHistory:"Visualize Code History",aiFeatures:"AI Features",gitBlame:"Inline Blame",prReviews:"Launchpad",mcpFeatures:"MCP Features"};var sR=Object.defineProperty,sE=Object.getOwnPropertyDescriptor,sI=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sE(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sR(r,o,a),a};let sB=class extends th(lit_element_i){constructor(){super(...arguments),this.onDismissWalkthrough=()=>{this._onboarding.walkthroughProgress.set(void 0),this._onboarding.dismissWalkthrough()}}get isWalkthroughComplete(){let t=this._onboarding.walkthroughProgress.get();return null!=t&&t.doneCount===t.allCount}render(){let t=this._onboarding.walkthroughProgress.get();if(null!=t)return e$`${this.isWalkthroughComplete?e$`<gl-button
						@click=${this.onDismissWalkthrough}
						class="walkthrough-progress__button"
						appearance="toolbar"
						tooltip="Dismiss"
						aria-label="Dismiss"
						><code-icon icon="x"></code-icon
					></gl-button>`:eP}
			<gl-tooltip placement="bottom">
				<a class="walkthrough-progress" href=${ia("gitlens.showWelcomeView")}>
					<header class="walkthrough-progress__title">
						<span>GitLens Walkthrough (${t.doneCount}/${t.allCount})</span>
					</header>
					<progress class="walkthrough-progress__bar" value=${t.progress}></progress>
				</a>
				<div slot="content">
					<div>Open Walkthrough</div>
					<hr />
					${this.renderWalkthroughProgress()}
				</div>
			</gl-tooltip>`}renderWalkthroughProgress(){let t=this._onboarding.walkthroughProgress.get();if(null!=t)return e$`<p class="walkthrough-progress__label">
				Walkthrough Progress (${t.doneCount}/${t.allCount})
			</p>
			<ul class="walkthrough-progress__steps">
				${Object.entries(sA).map(([r,o])=>{let i=t.state[r];return e$`<li class="walkthrough-progress__step ${i?"completed":""}">
						<code-icon icon="${i?"pass":"circle-large"}"></code-icon>
						<span class="walkthrough-progress__step-label">${o}</span>
					</li>`})}
			</ul>`}};sB.styles=[oJ,oQ,id,j`
			.walkthrough-progress__label {
				margin-block: 0;
			}
			.walkthrough-progress__steps {
				margin-block: 0;
				padding-inline-start: 0;
			}
			.walkthrough-progress__step {
				list-style: none;
				margin-block-start: 0.3rem;
			}
			.walkthrough-progress__step-label {
				margin-inline-start: 0.3rem;
			}
			code-icon[icon='circle-large'] {
				color: var(--color-foreground--50);
			}
			code-icon[icon='pass'] {
				color: #00dd00;
			}
		`],sI([A({context:"onboarding"})],sB.prototype,"_onboarding",2),sB=sI([eM("gl-onboarding")],sB);var sL=Object.defineProperty,sT=Object.getOwnPropertyDescriptor,sM=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sT(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sL(r,o,a),a};let sz=class extends lit_element_i{render(){return e$`
			<gl-promo
				.promoPromise=${this.promos.getApplicablePromo(void 0,"home")}
				.source="${{source:"home"}}"
				class="promo-banner promo-banner--eyebrow"
				id="promo"
				type="link"
			></gl-promo>
		`}};sz.styles=[j`
			:host {
				display: block;
			}
			.promo-banner {
				text-align: center;
				margin-bottom: 1rem;
			}
			.promo-banner--eyebrow {
				color: var(--color-foreground--50);
				margin-bottom: 0.2rem;
			}
			.promo-banner:has(gl-promo:not([has-promo])) {
				display: none;
			}
		`],sM([A({context:"promos"})],sz.prototype,"promos",2),sz=sM([eM("gl-promo-banner")],sz);var sD=Object.defineProperty,sj=Object.getOwnPropertyDescriptor,sW=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sj(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sD(r,o,a),a};let sN=class extends lit_element_i{render(){return e$`<gl-promo-banner></gl-promo-banner>
			<div class="container" tabindex="-1">
				<span class="group"><gl-account-chip></gl-account-chip></span>
				<gl-integrations-chip></gl-integrations-chip>
			</div>
			<gl-onboarding></gl-onboarding>`}show(){this.accountChip.show()}refreshPromo(){this.promoBanner?.requestUpdate()}};sN.styles=[ow,o_,j`
			:host {
				display: block;
			}

			.container {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.6rem;
			}

			.container:focus,
			.container:focus-within {
				outline: none;
			}

			/* .actions {
				flex: none;
				display: flex;
				gap: 0.2rem;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			} */

			gl-promo-banner {
				margin: 0 0.2rem 0.6rem;
			}

			gl-promo-banner:has(gl-promo:not([has-promo])) {
				display: none;
			}

			.group {
				display: flex;
				align-items: center;
				gap: 0.4rem;
			}
		`],sW([eN("gl-account-chip")],sN.prototype,"accountChip",2),sW([eN("gl-promo-banner")],sN.prototype,"promoBanner",2),sN=sW([eM("gl-home-header")],sN),((...t)=>t[0])(["mergeable","blocked","follow-up","needs-review"]);let sF=new Map([["current-branch","$(git-branch)"],["pinned","$(pinned)"],["mergeable","$(rocket)"],["blocked","$(error)"],["follow-up","$(report)"],["needs-review","$(comment-unresolved)"],["waiting-for-review","$(gitlens-clock)"],["draft","$(git-pull-request-draft)"],["other","$(ellipsis)"],["snoozed","$(bell-slash)"]]),sU=new Map([["current-branch","Current Branch"],["pinned","Pinned"],["mergeable","Ready to Merge"],["blocked","Blocked"],["follow-up","Requires Follow-up"],["needs-review","Needs Your Review"],["waiting-for-review","Waiting for Review"],["draft","Draft"],["other","Other"],["snoozed","Snoozed"]]),sq=new Map([["mergeable","mergeable"],["conflicts","blocked"],["failed-checks","blocked"],["unassigned-reviewers","blocked"],["needs-my-review","needs-review"],["code-suggestions","follow-up"],["changes-requested","follow-up"],["reviewer-commented","follow-up"],["waiting-for-review","waiting-for-review"],["draft","draft"],["other","other"]]),sH=new Map([["mergeable",["Ready to Merge","Ready to merge"]],["unassigned-reviewers",["Unassigned Reviewers","You need to assign reviewers"]],["failed-checks",["Failed Checks","You need to resolve the failing checks"]],["conflicts",["Resolve Conflicts","You need to resolve merge conflicts"]],["needs-my-review",["Needs Your Review","${author} requested your review"]],["code-suggestions",["Code Suggestions","Code suggestions have been made on this pull request"]],["changes-requested",["Changes Requested","Reviewers requested changes before this can be merged"]],["reviewer-commented",["Reviewers Commented","Reviewers have commented on this pull request"]],["waiting-for-review",["Waiting for Review","Waiting for reviewers to approve this pull request"]],["draft",["Draft","Continue working on your draft"]],["other",["Other","Opened by ${author} ${createdDateRelative}"]]]);var sG=Object.defineProperty,sV=Object.getOwnPropertyDescriptor,sK=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sV(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sG(r,o,a),a};let sY=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1}render(){return e$`<code-icon
				class="icon"
				icon="${this.worktree?"gl-worktree":"git-branch"}"
				size="${this.size}"
			></code-icon
			><span class="label">${this.name??"<missing>"}</span>`}};function sJ(t,r){return e$`<gl-branch-name .name=${t} .size=${12} ?worktree=${r??!1}></gl-branch-name>`}sY.styles=j`
		:host {
			display: inline-flex;
			align-items: baseline;
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-inline: 0.2rem;
		}

		:host(:focus) {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		.icon {
			margin-right: 0.3rem;
			align-self: center;
		}

		.label {
			font-weight: bold;
		}
	`,sK([eD({type:String})],sY.prototype,"name",2),sK([eD({type:Number})],sY.prototype,"size",2),sK([eD({type:Boolean})],sY.prototype,"worktree",2),sY=sK([eM("gl-branch-name")],sY);var sZ=Object.defineProperty,sX=Object.getOwnPropertyDescriptor,sQ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?sX(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&sZ(r,o,a),a};let s0=class extends lit_element_i{render(){return this.name?e$`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?e$`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:e$`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?e$`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:e$`<slot class="thumb thumb--text"></slot>`}};s0.styles=[j`
			:host {
				display: inline-block;
				vertical-align: middle;
			}

			.avatar {
				display: inline-flex;
				width: var(--gl-avatar-size, 1.6rem);
				aspect-ratio: 1;
				vertical-align: middle;
				border-radius: 100%;
				justify-content: center;
			}

			.thumb {
				border-radius: 50%;
			}

			.thumb--text {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: clamp(0.8rem, calc(var(--gl-avatar-size, 1.6rem) * 0.5), 1.1rem);
				line-height: 1;
				text-transform: uppercase;
				cursor: default;
				color: var(--vscode-descriptionForeground);
			}

			.thumb--media {
				display: block;
				width: 100%;
				height: auto;
				object-fit: cover;
				object-position: 50% 50%;
			}

			.avatar:hover {
				transform: scale(1.2);
			}
		`],sQ([eD()],s0.prototype,"src",2),sQ([eD()],s0.prototype,"name",2),sQ([eD()],s0.prototype,"href",2),s0=sQ([eM("gl-avatar")],s0);var s1=Object.defineProperty,s2=Object.getOwnPropertyDescriptor,s5=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?s2(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&s1(r,o,a),a};let s3=class extends lit_element_i{constructor(){super(...arguments),this.max=3,this.avatars=[]}render(){return e$`<gl-avatar-group exportparts="base">${this.renderList()}</gl-avatar-group>`}renderList(){let t=this.avatars.slice(0,this.max),r=this.avatars.slice(this.max);return e$`
			${t.map(t=>e$`<gl-avatar exportparts="avatar" .src=${t.src} .name=${t.name} .href=${t.href}
						>${!t.src?e$`<code-icon icon="account"></code-icon>`:""}</gl-avatar
					>`)}
			${o1(r.length,()=>e$`<gl-popover>
						<gl-avatar exportparts="avatar" slot="anchor" class="overflow"
							>+${r.length}</gl-avatar
						>
						<div slot="content" class="overflow-list">
							${r.map(t=>e$`<gl-avatar .src=${t.src} .name=${t.name} .href=${t.href}
										>${!t.src?e$`<code-icon icon="account"></code-icon>`:""}</gl-avatar
									>`)}
						</div>
					</gl-popover>`)}
		`}};s5([eD({type:Number})],s3.prototype,"max",2),s5([eD({type:Array})],s3.prototype,"avatars",2),s3=s5([eM("gl-avatar-list")],s3);let s4=class extends lit_element_i{render(){return e$`<div class="avatar-group" part="base"><slot></slot></div>`}};s4.styles=[j`
			.avatar-group {
				display: inline-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}

			.avatar-group ::slotted(*:not(:first-child)) {
				margin-left: calc(var(--gl-avatar-size, 1.6rem) * -0.2);
			}

			.avatar-group:focus-within ::slotted(*),
			.avatar-group:hover ::slotted(*) {
				opacity: 0.5;
			}

			.avatar-group:focus-within ::slotted(*:focus),
			.avatar-group:hover ::slotted(*:hover) {
				opacity: 1;
				z-index: var(--gl-avatar-selected-zindex, 1) !important;
			}
		`],s4=s5([eM("gl-avatar-group")],s4);var s6=Object.defineProperty,s8=Object.getOwnPropertyDescriptor,s7=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?s8(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&s6(r,o,a),a};let s9=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),ae=class extends lit_element_i{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0}render(){return s9.map(([t,r])=>this.renderStat(t,r))}renderStat(t,r){let o=this[t];return null==o?eP:e$`<span class="stat ${t}" aria-label="${o} ${t}"
			><span class="label">${this.renderSymbol(r)}${o}</span></span
		>`}renderSymbol([t,r]){return"icons"===this.symbol?e$`<code-icon class="icon" icon="${r}"></code-icon>`:e$`<span>${t}</span>`}};ae.styles=j`
		:host {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
			white-space: nowrap;
			font-size: 1rem;
		}

		:host([symbol='icons']) {
			gap: 0.8rem;
		}

		:host([appearance='pill']) {
			background-color: color-mix(
				in srgb,
				var(--vscode-sideBarSectionHeader-background) 90%,
				var(--vscode-foreground) 10%
			);
			border: 1px solid
				color-mix(in srgb, var(--vscode-sideBarSectionHeader-border) 100%, var(--vscode-foreground) 70%);
			border-radius: 0.4rem;
			gap: 0;
			padding: 0 0.8rem 0 0.6rem;
			white-space: nowrap;
			line-height: 1.5rem;
		}

		.stat {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
		}

		.added {
			color: var(--vscode-gitDecoration-addedResourceForeground);
		}
		.modified {
			color: var(--vscode-gitDecoration-modifiedResourceForeground);
		}
		.removed {
			color: var(--vscode-gitDecoration-deletedResourceForeground);
		}

		.label {
			flex-basis: 100%;
			text-align: center;
			align-content: center;
			user-select: none;
		}

		.icon {
			--code-icon-size: 0.9rem;
			margin-inline-end: 0.2rem;
		}

		/* Pill styles */
		:host([appearance='pill']) .stat {
			padding: 0;
			margin-inline-end: 0.8rem;
		}

		:host([appearance='pill']) .stat:last-child {
			margin-inline-end: 0;
		}

		:host([appearance='pill']) .icon {
			margin-inline-end: 0.3rem;
		}

		:host([appearance='pill']) .label {
			display: flex;
			align-items: center;
			gap: 0;
		}
	`,s7([eD({type:Number})],ae.prototype,"added",2),s7([eD({type:Number})],ae.prototype,"modified",2),s7([eD({type:Number})],ae.prototype,"removed",2),s7([eD()],ae.prototype,"symbol",2),s7([eD({reflect:!0})],ae.prototype,"appearance",2),ae=s7([eM("commit-stats")],ae);var at=Object.defineProperty,ar=Object.getOwnPropertyDescriptor,ao=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ar(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&at(r,o,a),a};let ai=class extends lit_element_i{constructor(){super(...arguments),this.dateStyle="relative",this.date=new Date,this.tooltip=""}get absoluteDate(){return tV(this.date,this.format??"MMMM Do, YYYY h:mma")}get dateLabel(){return"relative"===this.dateStyle?tG(this.date):this.absoluteDate}render(){return e$`<gl-tooltip content="${this.tooltip} ${this.absoluteDate}"
			><time part="base" datetime="${this.date.toISOString()}">${this.dateLabel}</time></gl-tooltip
		>`}};ao([eD()],ai.prototype,"format",2),ao([eD({attribute:"date-style"})],ai.prototype,"dateStyle",2),ao([eD({converter:{toAttribute:t=>t.getTime(),fromAttribute:(t,r)=>{let o=new Date(t);return isNaN(o.getTime())?new Date(parseInt(t,10)):o}},reflect:!0,attribute:!1})],ai.prototype,"date",2),ao([eD()],ai.prototype,"tooltip",2),ai=ao([eM("formatted-date")],ai);let an=j`
	:host {
		box-sizing: border-box;
		display: inline-block;
		vertical-align: text-bottom;
	}

	.pill {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.5rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		color: var(--gl-pill-foreground, var(--vscode-foreground));
		background-color: var(--gl-pill-background, var(--vscode-editorWidget-background));
		white-space: nowrap;
	}

	.pill--outlined {
		padding: 0.1rem 0.4rem;
		background-color: transparent;
		border: 1px solid var(--gl-pill-border, var(--vscode-foreground));
	}
`;var as=Object.defineProperty,aa=Object.getOwnPropertyDescriptor,al=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aa(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&as(r,o,a),a};let ac=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="check"></code-icon></span>
			</span>`:eP:e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${o1(this.behind>0,()=>e$`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${o1(this.ahead>0,()=>e$`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${o1(this.working>0,()=>e$`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};ac.styles=[an,j`
			.pill {
				gap: 0.1rem;
				text-transform: none;
			}

			.state {
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}

			.state--missing code-icon {
				color: var(--gl-tracking-missing);
			}

			.state--ahead code-icon {
				color: var(--gl-tracking-ahead);
			}

			.state--behind code-icon {
				color: var(--gl-tracking-behind);
			}

			.state--working .working {
				color: var(--gl-tracking-working);
			}

			.state code-icon {
				font-size: inherit !important;
				line-height: inherit !important;
			}

			.working {
				display: inline-block;
				width: 1rem;
				text-align: center;
				vertical-align: text-bottom;
				font-weight: normal;
			}
		`],al([eD({type:Number})],ac.prototype,"ahead",2),al([eD({type:Number})],ac.prototype,"behind",2),al([eD({type:Number})],ac.prototype,"working",2),al([eD({type:Boolean,attribute:"always-show"})],ac.prototype,"alwaysShow",2),al([eD({type:Boolean})],ac.prototype,"outlined",2),al([eD({type:Boolean})],ac.prototype,"colorized",2),al([eD({type:Boolean})],ac.prototype,"missingUpstream",2),ac=al([eM("gl-tracking-pill")],ac);let ad=j`
	.issue-icon--opened {
		color: var(--vscode-gitlens-openAutolinkedIssueIconColor);
	}
	.issue-icon--closed {
		color: var(--vscode-gitlens-closedAutolinkedIssueIconColor);
	}
`;var ah=Object.defineProperty,ap=Object.getOwnPropertyDescriptor,au=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ap(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ah(r,o,a),a};let ag=class extends lit_element_i{get icon(){let t="issues";if(this.state)switch(this.state){case"opened":t="issues";break;case"closed":t="pass"}return t}get classes(){return this.state?`issue-icon issue-icon--${this.state}`:"issue-icon"}get label(){return this.state?`Issue ${this.issueId?`#${this.issueId}`:""} is ${this.state}`:"Issue"}render(){return this.state?e$`<gl-tooltip>
			<code-icon class=${this.classes} icon=${this.icon} aria-label=${this.state??eP}></code-icon>
			<span slot="content">${this.label}</span>
		</gl-tooltip>`:e$`<code-icon
				class=${this.classes}
				icon=${this.icon}
				aria-label=${this.state??eP}
			></code-icon>`}};ag.styles=[ad],au([eD()],ag.prototype,"state",2),au([eD({attribute:"issue-id"})],ag.prototype,"issueId",2),ag=au([eM("issue-icon")],ag);let ab=j`
	.pr-icon--opened {
		color: var(--vscode-gitlens-openPullRequestIconColor);
	}
	.pr-icon--closed {
		color: var(--vscode-gitlens-closedPullRequestIconColor);
	}
	.pr-icon--merged {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}
`;var am=Object.defineProperty,af=Object.getOwnPropertyDescriptor,av=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?af(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&am(r,o,a),a};let ay=class extends lit_element_i{constructor(){super(...arguments),this.draft=!1}get icon(){let t=this.draft?"git-pull-request-draft":"git-pull-request";if(this.state)switch(this.state){case"merged":t="git-merge";break;case"closed":t="git-pull-request-closed"}return t}get classes(){return!this.state||this.draft&&"opened"===this.state?"pr-icon":`pr-icon pr-icon--${this.state}`}get label(){let t=this.draft?"Draft pull request":"Pull request";return this.state?`${t} ${this.prId?`#${this.prId}`:""} is ${this.state}`:t}render(){return this.state?e$`<gl-tooltip>
			<code-icon class=${this.classes} icon=${this.icon} aria-label=${this.state??eP}></code-icon>
			<span slot="content">${this.label}</span>
		</gl-tooltip>`:e$`<code-icon
				class=${this.classes}
				icon=${this.icon}
				aria-label=${this.state??eP}
			></code-icon>`}};ay.styles=[ab],av([eD()],ay.prototype,"state",2),av([eD({type:Boolean})],ay.prototype,"draft",2),av([eD({attribute:"pr-id"})],ay.prototype,"prId",2),ay=av([eM("pr-icon")],ay);let aw=navigator?.userAgentData?.platform,a_=navigator.userAgent;"Linux"===aw||a_.includes("Linux");let ak="macOS"===aw||a_.includes("Macintosh");"Windows"===aw||a_.includes("Windows");var ax=Object.defineProperty,a$=Object.getOwnPropertyDescriptor,aC=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?a$(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ax(r,o,a),a};let aS=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this.isAltKeyPressed=!1,this.handlePointerModifiers=t=>{let r=t.altKey||t.shiftKey;this.isAltKeyPressed!==r&&(this.isAltKeyPressed=r)},this.handleLinkKeydown=t=>{this.effectiveHref||" "!==t.key&&"Enter"!==t.key||(t.preventDefault(),t.target.click())}}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${ak?"⌥":"Alt"}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}connectedCallback(){super.connectedCallback?.(),window.addEventListener("keydown",this),window.addEventListener("keyup",this),this.addEventListener("pointerenter",this.handlePointerModifiers),this.addEventListener("pointermove",this.handlePointerModifiers)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("keydown",this),window.removeEventListener("keyup",this),this.removeEventListener("pointerenter",this.handlePointerModifiers),this.removeEventListener("pointermove",this.handlePointerModifiers)}handleEvent(t){let r="Alt"===t.key||"Shift"===t.key||t.altKey||t.shiftKey;"keydown"===t.type?this.isAltKeyPressed=r:"keyup"===t.type&&r&&(this.isAltKeyPressed=!1)}render(){return e$`
			<gl-tooltip hoist content="${this.effectiveTooltip??eP}">
				<a
					role="${!this.effectiveHref?"button":eP}"
					type="${!this.effectiveHref?"button":eP}"
					aria-label="${this.effectiveLabel??eP}"
					?disabled=${this.disabled}
					href=${this.effectiveHref??eP}
					tabindex="0"
					@keydown=${this.handleLinkKeydown}
				>
					<code-icon part="icon" icon="${this.effectiveIcon}"></code-icon>
				</a>
			</gl-tooltip>
		`}focus(t){this.defaultFocusEl.focus(t)}};aS.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aS.styles=j`
		:host {
			box-sizing: border-box;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 2rem;
			height: 2rem;
			border-radius: 0.5rem;
			color: var(--action-item-foreground, var(--vscode-icon-foreground));
			padding: 0.2rem;
			vertical-align: text-bottom;
			text-decoration: none;
			cursor: pointer;
		}

		:host(:focus-within) {
			${of}
		}

		:host(:hover),
		:host(:focus-within) {
			background-color: var(--vscode-toolbar-hoverBackground);
		}

		:host(:active) {
			background-color: var(--vscode-toolbar-activeBackground);
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}

		a {
			color: inherit;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			text-decoration: none;
		}
		a:focus {
			outline: none;
		}
		a:is(:hover, :focus, :active) {
			text-decoration: none;
		}
	`,aC([eD()],aS.prototype,"href",2),aC([eD({attribute:"alt-href"})],aS.prototype,"altHref",2),aC([eD()],aS.prototype,"label",2),aC([eD({attribute:"alt-label"})],aS.prototype,"altLabel",2),aC([eD()],aS.prototype,"icon",2),aC([eD({attribute:"alt-icon"})],aS.prototype,"altIcon",2),aC([eD({type:Boolean})],aS.prototype,"disabled",2),aC([eN("a")],aS.prototype,"defaultFocusEl",2),aC([ej()],aS.prototype,"isAltKeyPressed",2),aS=aC([eM("action-item")],aS);var aP=Object.defineProperty,aO=Object.getOwnPropertyDescriptor,aA=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aO(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aP(r,o,a),a};let aR=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return e$`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(t){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let r=this.handleKeydown.bind(this),o=`${this.actionNodes.length}`,i=this.actionNodes.map((t,i)=>(t.setAttribute("aria-posinset",`${i+1}`),t.setAttribute("aria-setsize",o),t.setAttribute("tabindex",0===i?"0":"-1"),this.actionNodes.length>=2&&t.addEventListener("keydown",r,!1),{dispose:()=>{t?.removeEventListener("keydown",r,!1)}}));this._slotSubscriptionsDisposer=()=>{i?.forEach(({dispose:t})=>t())}}handleKeydown(t){if(!t.target||null==this.actionNodes)return;let r=t.target,o=parseInt(r.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.actionNodes.length<2)return;let i=null;if("ArrowLeft"===t.key){let t=1===o?this.actionNodes.length-1:o-2;i=this.actionNodes[t]}else if("ArrowRight"===t.key){let t=o===this.actionNodes.length?0:o;i=this.actionNodes[t]}null!=i&&i!==r&&(t.preventDefault(),t.stopPropagation(),r.setAttribute("tabindex","-1"),i.setAttribute("tabindex","0"),i.focus())}};aR.styles=j`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,aA([(_={flatten:!0},(t,r)=>{let{slot:o,selector:i}=_??{},n="slot"+(o?`[name=${o}]`:":not([name])");return eW(t,r,{get(){let t=this.renderRoot?.querySelector(n),r=t?.assignedElements(_)??[];return void 0===i?r:r.filter(t=>t.matches(i))}})})],aR.prototype,"actionNodes",2),aR=aA([eM("action-nav")],aR);var aE=Object.defineProperty,aI=Object.getOwnPropertyDescriptor,aB=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aI(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aE(r,o,a),a};let aL=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return e$`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let t;if(!this.worktree&&(!this.status||"local"===this.status))return e$`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return e$`<code-icon icon="git-commit"></code-icon>`;let r="0.5";switch(this.status){case"diverged":t="var(--gl-icon-color-status-diverged)";break;case"behind":t="var(--gl-icon-color-status-behind)";break;case"ahead":t="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":t="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":t=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?t="var(--gl-icon-color-status-changes)":(t="transparent",r="1")}return this.worktree&&!1===this.isDefault?eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${t}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${r}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${t}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${r}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let t,r=this.branch?sJ(this.branch):"Branch",o=this.upstream?sJ(this.upstream):"its upstream";switch(this.status){case"diverged":t=e$`${r} has diverged from ${o}`;break;case"behind":t=e$`${r} is behind ${o}`;break;case"ahead":t=e$`${r} is ahead of ${o}`;break;case"missingUpstream":t=e$`${r} is missing its upstream ${o}`;break;case"upToDate":t=e$`${r} is up to date with ${o}`;break;case"local":t=e$`${r} is a local branch which hasn't been published`;break;case"remote":t=e$`${r} is a remote branch`;break;case"detached":t=e$`${r} is in a detached state, i.e. checked out to a commit or tag`;break;default:t=e$`${r} is in an unknown state`}return t=e$`<p>${t}</p>`,this.worktree?t=this.hasChanges?e$`${t}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:e$`${t}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(t=e$`${t}
				<p>Has working (uncommitted) changes</p>`),t}};aL.styles=j`
		:host {
			display: inline-flex;
			width: 16px;
			height: 16px;

			--gl-icon-color-foreground: var(--vscode-foreground, #c5c5c5);

			--gl-icon-color-status-synced: var(
				--gl-icon-color-foreground,
				var(--vscode-gitlens-decoration\\.branchUpToDateForegroundColor)
			);
			--gl-icon-color-status-diverged: var(--vscode-gitlens-decorations\\.branchDivergedForegroundColor, #ff5);
			--gl-icon-color-status-behind: var(--vscode-gitlens-decorations\\.branchBehindForegroundColor, #f05);
			--gl-icon-color-status-ahead: var(--vscode-gitlens-decorations\\.branchAheadForegroundColor, #0f5);
			--gl-icon-color-status-missingUpstream: var(
				--vscode-gitlens-decorations\\.branchMissingUpstreamForegroundColor,
				#c74e39
			);
			--gl-icon-color-status-changes: #1a79ff;
		}

		:host-context(.vscode-dark),
		:host-context(.vscode-high-contrast) {
			--gl-icon-color-foreground: #c5c5c5;
		}

		:host-context(.vscode-light),
		:host-context(.vscode-high-contrast-light) {
			--gl-icon-color-foreground: #424242;
		}

		p {
			margin: 0;
		}

		p + p {
			margin-top: 0.4rem;
		}

		svg {
			width: 100%;
			height: 100%;
			margin-top: -0.2rem;
			vertical-align: middle;
		}
	`,aB([eD({type:String})],aL.prototype,"branch",2),aB([eD({type:String})],aL.prototype,"status",2),aB([eD({type:Boolean})],aL.prototype,"hasChanges",2),aB([eD({type:String})],aL.prototype,"upstream",2),aB([eD({type:Boolean})],aL.prototype,"worktree",2),aB([eD({type:Boolean,attribute:"is-default"})],aL.prototype,"isDefault",2),aL=aB([eM("gl-branch-icon")],aL);let aT=j`
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
`,aM=j`
	code-icon.picker-icon {
		font-size: 1rem;
		/* margin-top: 0.4rem; */
		margin-right: -0.25rem;
	}

	code-icon.picker-icon::before {
		margin-left: -0.4rem;
	}
`,az=j`
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
`;var aD=Object.defineProperty,aj=Object.getOwnPropertyDescriptor,aW=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aj(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aD(r,o,a),a};let aN=class extends lit_element_i{constructor(){super(...arguments),this.icon=!1,this.size=13,this.worktree=!1}render(){let t,r;if(null==this.ref)return eP;switch(this.ref.refType){case"branch":t=this.worktree?"worktree":"branch",r=this.worktree?"gl-worktree":"git-branch";break;case"tag":t="tag",r="tag";break;default:t="revision",r="git-commit"}return e$`${this.icon?e$`<code-icon
						class="icon${t?` ${t}`:""}"
						icon="${r}"
						size="${this.size}"
					></code-icon>`:eP}<span class="label">${this.ref.name}</span>`}};aN.styles=j`
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
	`,aW([eD({type:Boolean,reflect:!0})],aN.prototype,"icon",2),aW([eD({type:Object})],aN.prototype,"ref",2),aW([eD({type:Number})],aN.prototype,"size",2),aW([eD({type:Boolean})],aN.prototype,"worktree",2),aN=aW([eM("gl-ref-name")],aN);var aF=Object.defineProperty,aU=Object.getOwnPropertyDescriptor,aq=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aU(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aF(r,o,a),a};let aH=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.icon=!1,this.size=16,this.worktree=!1}render(){return e$`<gl-button appearance="toolbar" href=${this.href??eP} ?disabled=${this.disabled}
			>${null==this.ref?e$`<slot name="empty">&lt;missing&gt;</slot>`:e$`<gl-ref-name
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
		></gl-button>`}};aH.styles=[aT,j`
			:host {
				--font-weight: normal;
			}

			gl-button {
				max-width: 100%;
			}

			gl-ref-name:not([icon]) {
				padding-left: 0.2rem;
			}
		`,aM],aq([eD({type:Boolean,reflect:!0})],aH.prototype,"disabled",2),aq([eD({type:String,reflect:!0})],aH.prototype,"href",2),aq([eD({type:Boolean,reflect:!0})],aH.prototype,"icon",2),aq([eD({type:Object})],aH.prototype,"ref",2),aq([eD({type:Number})],aH.prototype,"size",2),aq([eD({type:Boolean})],aH.prototype,"worktree",2),aH=aq([eM("gl-ref-button")],aH);var aG=Object.defineProperty,aV=Object.getOwnPropertyDescriptor,aK=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aV(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aG(r,o,a),a};let aY=class extends lit_element_i{firstUpdated(){"alert"===this.appearance&&queueMicrotask(()=>this.button.focus())}render(){let t=null==this.state;if(this.hidden=t,t)return;let r=(this.appearance??"alert")==="alert"?"alert":void 0;switch(this.state){case o6.VerificationRequired:return e$`
					<slot name="feature"></slot>
					<p class="actions">
						<gl-button
							class="inline"
							appearance="${r??eP}"
							href="${ia("gitlens.plus.resendVerification",this.source)}"
							>Resend Email</gl-button
						>
						<gl-button
							class="inline"
							appearance="${r??eP}"
							href="${ia("gitlens.plus.validate",this.source)}"
							><code-icon icon="refresh"></code-icon
						></gl-button>
					</p>
					<p>You must verify your email before you can continue.</p>
				`;case o6.Community:if(this.featurePreview&&"expired"!==function(t){let r=t?.usages;if(!r?.length)return"eligible";let o=(new Date(r.at(-1).expiresOn).getTime()-Date.now())/36e5;return r.length<=3&&o>0&&o<24?"active":"expired"}(this.featurePreview))return e$`${this.renderFeaturePreview(this.featurePreview)}`;return e$`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${o4.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${r??eP}"
							href="${ia("gitlens.plus.signUp",this.source)}"
							>&nbsp;Try GitLens Pro&nbsp;</gl-button
						><span
							>or
							<a href="${ia("gitlens.plus.login",this.source)}" title="Sign In"
								>sign in</a
							></span
						>
					</p>
					<p>
						Get ${tQ("day",14)} of
						<a href="${o4.communityVsPro}">GitLens Pro</a> for free — no credit card required.
					</p>`;case o6.TrialExpired:return e$`<slot name="feature"></slot>
					<p>
						${"private-repos"===this.featureRestriction?"Unlock this feature for privately hosted repos with ":"Unlock this feature with "} <a href="${o4.communityVsPro}">GitLens Pro</a>.
					</p>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${r??eP}"
							href="${ia("gitlens.plus.upgrade",{plan:"pro",...this.source??{source:"feature-gate"}})}"
							>Upgrade to Pro</gl-button
						>
					</p>
					<p>${this.renderPromo()}</p>`;case o6.TrialReactivationEligible:return e$`<slot name="feature"></slot>
					<p class="actions-row">
						<gl-button
							class="inline"
							appearance="${r??eP}"
							href="${ia("gitlens.plus.reactivateProTrial",this.source)}"
							>Continue</gl-button
						>
					</p>
					<p>
						Reactivate your GitLens Pro trial and experience
						${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} and `:""}all the new
						Pro features — free for another ${tQ("day",14)}!
					</p> `}}renderFeaturePreview(t){let r=(this.appearance??"alert")==="alert"?"alert":void 0,o=t.usages.length;return 0===o?e$`<slot name="feature"></slot>
				<gl-button appearance="${r??eP}" href="${this.featurePreviewCommandLink??eP}"
					>Continue</gl-button
				>
				<p>
					Continue to preview
					${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
					repos, or
					<a href="${ia("gitlens.plus.login",this.source)}" title="Sign In">sign in</a
					>.<br />
					${"alert"!==r?e$`<br />`:""} For full access to all GitLens Pro features,
					<a href="${ia("gitlens.plus.signUp",this.source)}"
						>start your free ${14}-day Pro trial</a
					>
					— no credit card required.
				</p> `:e$`
			${this.renderFeaturePreviewStep(t,o)}
			<p class="actions-row">
				<gl-button
					class="inline"
					appearance="${r??eP}"
					href="${this.featurePreviewCommandLink??eP}"
					>Continue Preview</gl-button
				><span
					>or
					<a href="${ia("gitlens.plus.login",this.source)}" title="Sign In"
						>sign in</a
					></span
				>
			</p>
			<p>
				After continuing, you will have ${tQ("day",3-o,{infix:" more "})} to preview
				${this.featureWithArticleIfNeeded?`${this.featureWithArticleIfNeeded} on`:""} privately hosted
				repos.<br />
				${"alert"!==r?e$`<br />`:""} For full access to all GitLens Pro features,
				<a href="${ia("gitlens.plus.signUp",this.source)}"
					>start your free ${14}-day Pro trial</a
				>
				— no credit card required.
			</p>
		`}renderFeaturePreviewStep(t,r){if("graph"!==t.feature)return e$`<slot name="feature"></slot>`;switch(r){case 1:return e$`<p>Try Commit Search</p>
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
							</p> `;case 2:return e$`
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
						`;default:return e$`<slot name="feature"></slot>`}}renderPromo(){return e$`<gl-promo
			.promoPromise=${this.promos.getApplicablePromo(void 0,"gate")}
			.source=${this.source}
		></gl-promo>`}};aY.styles=[j`
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
		`,ic],aK([eN("gl-button")],aY.prototype,"button",2),aK([eD()],aY.prototype,"appearance",2),aK([eD({type:Object})],aY.prototype,"featurePreview",2),aK([eD()],aY.prototype,"featurePreviewCommandLink",2),aK([eD()],aY.prototype,"featureRestriction",2),aK([eD()],aY.prototype,"featureWithArticleIfNeeded",2),aK([A({context:"promos"})],aY.prototype,"promos",2),aK([eD({type:Object})],aY.prototype,"source",2),aK([eD({attribute:!1,type:Number})],aY.prototype,"state",2),aK([eD()],aY.prototype,"webroot",2),aY=aK([eM("gl-feature-gate-plus-state")],aY);var aJ=Object.defineProperty,aZ=Object.getOwnPropertyDescriptor,aX=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?aZ(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&aJ(r,o,a),a};let aQ=j`
	.header__actions {
		margin-top: 0.4rem;
	}

	.content {
		gap: 0.6rem;
	}

	:host-context(.vscode-dark),
	:host-context(.vscode-high-contrast) {
		--color-status--in-sync: #00bb00;
		--color-merge--clean: #00bb00;
		--color-merge--conflict: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	:host-context(.vscode-light),
	:host-context(.vscode-high-contrast-light) {
		--color-status--in-sync: #00aa00;
		--color-merge--clean: #00aa00;
		--color-merge--conflict: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.header__title > span {
		cursor: help;
	}

	.header__title code-icon:not(.info) {
		margin-bottom: 0.1rem;
	}

	.header__title code-icon.status--warning {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.header__title p {
		margin: 0.5rem 0 0 0;
	}

	.header__subtitle {
		font-size: 1.3rem;
		margin: 0.2rem 0 0 0;
	}

	.status--conflict .icon,
	.status--conflict .status-indicator {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.status--behind .icon,
	.status--behind .status-indicator {
		color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
	}

	.status--merged .icon,
	.status--merged .status-indicator {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}

	.status--merged .icon {
		transform: rotateY(180deg);
	}

	.status--in-sync .status-indicator {
		color: var(--color-status--in-sync);
	}

	.status--merge-conflict {
		color: var(--color-merge--conflict);
	}

	.status--merge-clean {
		color: var(--color-merge--clean);
	}

	.status--merge-unknown {
		color: var(--color-foreground--50);
	}

	.status--upgrade {
		color: var(--color-foreground--50);
	}

	.status-indicator {
		margin-left: -0.5rem;
		margin-top: 0.8rem;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		width: 100%;
	}

	.button-container {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.button-container gl-button {
		max-width: 30rem;
	}

	p {
		margin: 0 0.4rem;
	}

	p code-icon,
	gl-button code-icon {
		margin-bottom: 0.1rem;
	}

	details {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0;
		position: relative;
		margin: 0 0.2rem 0.4rem;
		overflow: hidden;
		border: 1px solid transparent;
		color: var(--color-foreground--85);
	}

	details[open] {
		border-radius: 0.3rem;
		border: 1px solid var(--vscode-sideBar-border);
	}

	summary {
		position: sticky;
		top: 0;
		color: var(--color-foreground);
		cursor: pointer;
		list-style: none;
		transition: transform ease-in-out 0.1s;
		padding: 0.4rem 0.6rem 0.4rem 0.6rem;
		z-index: 1;
	}

	summary:hover {
		color: var(--vscode-textLink-activeForeground);
	}

	details[open] > summary {
		color: var(--vscode-textLink-foreground);
		border-radius: 0.3rem 0.3rem 0 0;
		margin-left: 0;
		background: var(--vscode-sideBar-background);
	}

	details[open] > summary code-icon {
		transform: rotate(90deg);
	}

	summary code-icon {
		transition: transform 0.2s;
	}

	.files {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		max-height: 8rem;
		overflow-y: auto;
		padding: 0.4rem 0.8rem;

		background: var(--vscode-sideBar-background);
	}

	gl-popover {
		--max-width: 80vw;
	}

	.target-edit * {
		text-decoration: underline dotted;
		text-underline-offset: 0.3rem;
	}

	.target-edit gl-branch-name {
		margin: 0;
	}
`,a0=class extends lit_element_i{get target(){return this._target}get targetPromise(){return this._targetPromise}set targetPromise(t){this._targetPromise!==t&&(this._targetPromise=t,this._targetPromise?.then(t=>this._target=t,()=>this._target=void 0))}get conflictResult(){return this.target?.potentialConflicts}get conflicts(){let t=this.conflictResult;return t?.status==="conflicts"?t.conflict:void 0}get conflictError(){let t=this.conflictResult;return t?.status==="error"?t:void 0}get mergedStatus(){return this.target?.mergedStatus}get status(){return this.target?.status}get branchRef(){if(null!=this.branch)return{repoPath:this.branch.repoPath,branchId:this.branch.id,branchName:this.branch.name,worktree:this.branch.worktree?{name:this.branch.worktree.name,isDefault:this.branch.worktree.isDefault}:void 0}}get targetBranchRef(){if(null!=this.target)return{repoPath:this.target.repoPath,branchId:this.target.id,branchName:this.target.name}}render(){let t,r;return this.status||this.conflicts?(this.mergedStatus?.merged?(t="git-merge",r="merged"):this.conflicts?(t="warning",r="conflict"):(this.status?.behind??0)>0?(t="arrow-down",r="behind"):(t="check",r="in-sync"),e$`<gl-popover placement="bottom" trigger="hover click focus" hoist>
			<span slot="anchor" class="chip status--${r}" tabindex="0"
				><code-icon class="icon" icon="gl-merge-target" size="18"></code-icon
				><code-icon class="status-indicator icon--${r}" icon="${t}" size="12"></code-icon>
			</span>
			<div slot="content" class="content">${this.renderContent()}</div>
		</gl-popover>`):eP}renderContent(){let t=sJ(this.target?.name),r=this.mergedStatus?.merged&&this.mergedStatus.localBranchOnly?{repoPath:this.branch.repoPath,branchId:this.mergedStatus.localBranchOnly.id,branchName:this.mergedStatus.localBranchOnly.name,branchUpstreamName:this.mergedStatus.localBranchOnly.upstream?.name}:this.target?{repoPath:this.target.repoPath,branchId:this.target.id,branchName:this.target.name,branchUpstreamName:void 0}:void 0;return this.mergedStatus?.merged?this.mergedStatus.localBranchOnly?e$`${this.renderHeader(`Branch ${"highest"!==this.mergedStatus.confidence?"Likely ":""}Merged Locally into Merge Target`,"git-merge")}
					<div class="body">
						<p>
							Your current branch ${sJ(this.branch.name)} has
							${"highest"!==this.mergedStatus.confidence?"likely ":""}been merged into its merge
							target's local branch ${sJ(this.mergedStatus.localBranchOnly.name)}.
						</p>
						<div class="button-container">
							<gl-button
								full
								href="${this._webview.createCommandLink("gitlens.pushBranch:",r)}"
								><span
									>Push ${sJ(this.mergedStatus.localBranchOnly.name)}</span
								></gl-button
							>
							<gl-button
								full
								appearance="secondary"
								href="${this._webview.createCommandLink("gitlens.deleteBranchOrWorktree:",[this.branchRef,r])}"
								><span
									>Delete
									${null!=this.branch.worktree&&!this.branch.worktree.isDefault?"Worktree":"Branch"}
									${sJ(this.branch.name,null!=this.branch.worktree)}</span
								></gl-button
							>
						</div>
					</div>`:e$`${this.renderHeader(`Branch ${"highest"!==this.mergedStatus.confidence?"Likely ":""}Merged into Merge Target`,"git-merge")}
				<div class="body">
					<p>
						Your current branch ${sJ(this.branch.name)} has
						${"highest"!==this.mergedStatus.confidence?"likely ":""}been merged into its merge target
						${this.renderInlineTargetEdit(this.target)}.
					</p>
					<div class="button-container">
						<gl-button
							full
							href="${this._webview.createCommandLink("gitlens.deleteBranchOrWorktree:",[this.branchRef,r])}"
							><span
								>Delete
								${null!=this.branch.worktree&&!this.branch.worktree.isDefault?"Worktree":"Branch"}
								${sJ(this.branch.name,null!=this.branch.worktree)}</span
							></gl-button
						>
					</div>
				</div>`:this.conflicts?e$`${this.renderHeader("Potential Conflicts with Merge Target","warning","warning")}
				<div class="body">
					${this.status?e$`<p>
								Your current branch ${sJ(this.branch.name)} is
								${tQ("commit",this.status.behind)} behind its merge target
								${this.renderInlineTargetEdit(this.target)}.
							</p>`:eP}
					<div class="button-container">
						<gl-button
							full
							href="${this._webview.createCommandLink("gitlens.rebaseCurrentOnto:",this.targetBranchRef)}"
							><span>Rebase ${sJ(this.conflicts.branch)} onto ${t}</span></gl-button
						>
						<gl-button
							full
							appearance="secondary"
							href="${this._webview.createCommandLink("gitlens.mergeIntoCurrent:",this.targetBranchRef)}"
							><span>Merge ${t} into ${sJ(this.conflicts.branch)}</span></gl-button
						>
					</div>
					<p class="status--merge-conflict">
						<code-icon icon="warning"></code-icon> Merging will cause conflicts in
						${tQ("file",this.conflicts.files.length)} that will need to be resolved.
					</p>
					${this.renderFiles(this.conflicts.files)}
				</div>`:null!=this.status?this.status.behind>0?e$`${this.renderHeader(`${tQ("Commit",this.status.behind)} Behind Merge Target`,"arrow-down","warning")}
					<div class="body">
						<p>
							Your current branch ${sJ(this.branch.name)} is
							${tQ("commit",this.status.behind)} behind its merge target
							${this.renderInlineTargetEdit(this.target)}.
						</p>
						<div class="button-container">
							<gl-button
								full
								href="${this._webview.createCommandLink("gitlens.rebaseCurrentOnto:",this.targetBranchRef)}"
								><span>Rebase ${sJ(this.branch.name)} onto ${t}</span></gl-button
							>
							<gl-button
								full
								appearance="secondary"
								href="${this._webview.createCommandLink("gitlens.mergeIntoCurrent:",this.targetBranchRef)}"
								><span>Merge ${t} into ${sJ(this.branch.name)}</span></gl-button
							>
						</div>
						${this.conflictError?e$`<p class="status--merge-unknown">
									<code-icon icon="error"></code-icon> Unable to detect conflicts.
								</p>`:e$`<p class="status--merge-clean">
									<code-icon icon="check"></code-icon> Merging will not cause conflicts.
								</p>`}
					</div>`:e$`${this.renderHeader("Up to Date with Merge Target","check")}
				<div class="body">
					<p>
						Your current branch ${sJ(this.branch.name)} is up to date with its merge target
						${this.renderInlineTargetEdit(this.target)}.
					</p>
				</div>`:eP}renderHeader(t,r,o){return e$`<div class="header">
			<gl-tooltip class="header__title">
				<span>
					<code-icon
						icon="${r}"
						class="${(o?`status--${o}`:void 0)??eP}"
					></code-icon>
					${t}&nbsp;<code-icon class="info" icon="question" size="16"></code-icon>
				</span>
				<span slot="content"
					>${t}
					<p>
						The "merge target" is the branch that ${sJ(this.branch.name)} is most likely to be
						merged into.
					</p>
				</span>
			</gl-tooltip>
			${this.renderHeaderActions()}
		</div>`}renderHeaderActions(){let t=this.branchRef,r=this.targetBranchRef;return e$`<span class="header__actions"
			>${t&&r?e$`<gl-button
							href="${this._webview.createCommandLink("gitlens.git.branch.setMergeTarget:",{...t,mergeTargetId:r.branchId,mergeTargetName:r.branchName})}"
							appearance="toolbar"
							><code-icon icon="pencil"></code-icon
							><span slot="tooltip"
								>Change Merge Target<br />${sJ(this.target?.name)}</span
							></gl-button
						><gl-button
							href="${this._webview.createCommandLink("gitlens.openMergeTargetComparison:",{...t,mergeTargetId:r.branchId,mergeTargetName:r.branchName})}"
							appearance="toolbar"
							><code-icon icon="git-compare"></code-icon>
							<span slot="tooltip"
								>Compare Branch with Merge Target<br />${sJ(this.branch.name)}
								<code-icon icon="arrow-both" size="12"></code-icon> ${sJ(this.target?.name)}</span
							>
						</gl-button>`:eP}<gl-button
				href="${this._webview.createCommandLink("gitlens.fetch:",this.targetBranchRef)}"
				appearance="toolbar"
				><code-icon icon="repo-fetch"></code-icon>
				<span slot="tooltip">Fetch Merge Target<br />${sJ(this.target?.name)}</span>
			</gl-button></span
		>`}renderInlineTargetEdit(t){return e$`<gl-button
			class="target-edit"
			appearance="toolbar"
			density="compact"
			tooltip="Change Merge Target"
			href="${this._webview.createCommandLink("gitlens.git.branch.setMergeTarget:",{...this.branchRef,mergeTargetId:this.targetBranchRef.branchId,mergeTargetName:this.targetBranchRef.branchName})}"
			>${sJ(t?.name)}</gl-button
		>`}renderFiles(t){return e$`
			<details>
				<summary>
					<code-icon icon="chevron-right"></code-icon>
					Show ${t.length} conflicting files
				</summary>
				<div class="files scrollable">${t.map(t=>this.renderFile(t.path))}</div>
			</details>
		`}renderFile(t){return e$`<span class="files__item"><code-icon icon="file"></code-icon> ${t}</span>`}};a0.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},a0.styles=[ow,o_,il,ok,aQ],aX([A({context:"webview"})],a0.prototype,"_webview",2),aX([eD({type:Object})],a0.prototype,"branch",2),aX([ej()],a0.prototype,"_target",2),aX([eD({type:Object})],a0.prototype,"targetPromise",1),a0=aX([eM("gl-merge-target-status")],a0);let a1=class extends lit_element_i{render(){let t="upgrade";return e$`<gl-popover placement="bottom" trigger="hover click focus" hoist>
			<span slot="anchor" class="chip status--${t}" tabindex="0"
				><code-icon class="icon" icon="gl-merge-target" size="18"></code-icon
				><code-icon class="status-indicator icon--${t}" icon="${"warning"}" size="12"></code-icon>
			</span>
			<gl-feature-gate-plus-state
				slot="content"
				appearance="default"
				featureRestriction="all"
				.source=${{source:"home",detail:"marge-target"}}
				.state=${this.state}
			>
				<div slot="feature">
					<span class="header__title">Detect potential merge conflicts</span>

					<p>
						See when your current branch has potential conflicts with its merge target branch and take
						action to resolve them.
					</p>
				</div>
			</gl-feature-gate-plus-state>
		</gl-popover>`}};a1.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},a1.styles=[ow,o_,il,ok,aQ,j`
			gl-feature-gate-plus-state {
				display: block;
				margin-inline: 0.5rem;

				p {
					margin-block: 1rem;
					margin-inline: 0;
				}
			}
		`],aX([eD({attribute:!1,type:Number})],a1.prototype,"state",2),a1=aX([eM("gl-merge-target-upgrade")],a1);var a2=Object.defineProperty,a5=Object.getOwnPropertyDescriptor,a3=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?a5(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&a2(r,o,a),a};let a4=j`
	* {
		box-sizing: border-box;
	}

	gl-avatar-list {
		--gl-avatar-size: 2.4rem;
		margin-block: -0.4rem;
	}

	.branch-item {
		position: relative;
	}

	.branch-item__container {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.branch-item__container > * {
		margin-block: 0;
	}

	.branch-item__section {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.branch-item__section > * {
		margin-block: 0;
	}

	.branch-item__section--details {
		font-size: 0.9em;
		color: var(--vscode-descriptionForeground);
	}

	.branch-item__actions {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		flex-direction: row;
		justify-content: flex-end;
		font-size: 0.9em;
	}

	/* :empty selector doesn't work with lit */
	.branch-item__actions:not(:has(*)) {
		display: none;
	}

	.branch-item__icon {
		color: var(--vscode-descriptionForeground);
		flex: none;
	}

	.branch-item__name {
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: bold;
	}

	.branch-item__name--secondary {
		font-weight: normal;
	}

	.branch-item__identifier {
		color: var(--vscode-descriptionForeground);
		text-decoration: none;
	}

	.branch-item__grouping {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		max-width: 100%;
		margin-block: 0;
	}

	.branch-item__changes {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: flex-end;
		flex-wrap: wrap;
		white-space: nowrap;
	}

	.branch-item__date {
		margin-inline-end: auto;
	}

	.branch-item__summary {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.branch-item__collapsed-actions {
		position: absolute;
		z-index: var(--gl-branch-card-actions-zindex, 2);
		right: 0.4rem;
		bottom: 0.3rem;
		padding: 0.4rem 0.6rem;
		background-color: var(--gl-card-hover-background);
	}

	.branch-item:not(:focus-within):not(:hover) .branch-item__collapsed-actions {
		${om}
	}

	.pill {
		--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));
	}

	.work-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
	}
	.work-item::part(base) {
		margin-block-end: 0;
	}

	.branch-item__section.mb-1 {
		margin-block: 0.4rem;
	}

	.branch-item__merge-target {
		margin-inline-end: auto;
	}

	.branch-item__row {
		display: flex;
		gap: 0.8rem;
	}

	.branch-item__row [full] {
		flex-grow: 1;
	}

	.branch-item__missing {
		--button-foreground: inherit;
	}

	:host-context(.vscode-dark) .branch-item__missing,
	:host-context(.vscode-high-contrast) .branch-item__missing {
		--button-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--button-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
		--button-border: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 12%);
	}

	:host-context(.vscode-light) .branch-item__missing,
	:host-context(.vscode-high-contrast-light) .branch-item__missing {
		--button-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 8%);
		--button-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 10%);
		--button-border: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 14%);
	}

	.branch-item__category {
		margin-inline-start: 0.6rem;
	}

	.launchpad-grouping--mergeable {
		color: var(--vscode-gitlens-launchpadIndicatorMergeableColor);
	}

	.launchpad-grouping--blocked {
		color: var(--vscode-gitlens-launchpadIndicatorBlockedColor);
	}

	.launchpad-grouping--attention {
		color: var(--vscode-gitlens-launchpadIndicatorAttentionColor);
	}

	.tracking__pill,
	.wip__pill {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.tracking__tooltip,
	.wip__tooltip {
		display: contents;
		vertical-align: middle;
	}

	.tracking__tooltip p,
	.wip__tooltip p {
		margin-block: 0;
	}

	p.tracking__tooltip--wip {
		margin-block-start: 1rem;
	}
`,a6=th(GlElement);let GlBranchCardBase=class GlBranchCardBase extends a6{constructor(){super(...arguments),this.showUpgrade=!1,this.busy=!1,this.expanded=!1,this.expandable=!1,this.onFocus=t=>{t.composedPath().some(t=>t.matches?.("action-item")??!1)||this.expanded||this.toggleExpanded(!0)}}static{this.styles=[ic,a4]}get branch(){return this._branch}set branch(t){this._branch=t,this.autolinksPromise=t?.autolinks,this.contributorsPromise=t?.contributors,this.issuesPromise=t?.issues,this.prPromise=t?.pr,this.mergeTargetPromise=t?.mergeTarget,this.remotePromise=t?.remote,this.wipPromise=t?.wip}get autolinks(){return this._autolinks}get autolinksPromise(){return this._autolinksPromise}set autolinksPromise(t){this._autolinksPromise!==t&&(this._autolinksPromise=t,this._autolinksPromise?.then(t=>this._autolinks=t,()=>this._autolinks=void 0))}get contributors(){return this._contributors}get contributorsPromise(){return this._contributorsPromise}set contributorsPromise(t){this._contributorsPromise!==t&&(this._contributorsPromise=t,this._contributorsPromise?.then(t=>this._contributors=t,()=>this._contributors=void 0))}get issues(){return this._issues}get issuesPromise(){return this._issuesPromise}set issuesPromise(t){this._issuesPromise!==t&&(this._issuesPromise=t,this._issuesPromise?.then(t=>this._issues=t,()=>this._issues=void 0))}get pr(){return this._pr}get prPromise(){return this._prPromise}set prPromise(t){this._prPromise!==t&&(this._prPromise=t,this._prPromise?.then(t=>{this._pr=t,this.launchpadItemPromise=t?.launchpad},()=>{this._pr=void 0,this.launchpadItemPromise=void 0}))}get launchpadItem(){return this._launchpadItem}get launchpadItemPromise(){return this._launchpadItemPromise}set launchpadItemPromise(t){this._launchpadItemPromise!==t&&(this._launchpadItemPromise=t,this._launchpadItemPromise?.then(t=>this._launchpadItem=t,()=>this._launchpadItem=void 0))}get mergeTarget(){return this._mergeTarget}get mergeTargetPromise(){return this._mergeTargetPromise}set mergeTargetPromise(t){this._mergeTargetPromise!==t&&(this._mergeTargetPromise=t,this._mergeTargetPromise?.then(t=>this._mergeTarget=t,()=>this._mergeTarget=void 0))}get remote(){return this._remote}get remotePromise(){return this._remotePromise}set remotePromise(t){this._remotePromise!==t&&(this._remotePromise=t,this._remotePromise?.then(t=>this._remote=t,()=>this._remote=void 0))}get wip(){return this._wip}get wipPromise(){return this._wipPromise}set wipPromise(t){this._wipPromise!==t&&(this._wipPromise=t,this._wipPromise?.then(t=>this._wip=t,()=>this._wip=void 0))}onExpandableChanged(){this.attachFocusListener()}get branchRef(){return{repoPath:this.repo,branchId:this.branch.id,branchName:this.branch.name,worktree:this.branch.worktree?{name:this.branch.worktree.name,isDefault:this.branch.worktree.isDefault}:void 0}}get isWorktree(){return null!=this.branch.worktree}get cardIndicator(){return le(a9(this.pr,this.launchpadItem))??"base"}get branchCardIndicator(){if(this.branch.opened){if(this.wip?.pausedOpStatus!=null){if(this.wip?.hasConflicts)return"conflict";switch(this.wip.pausedOpStatus.type){case"cherry-pick":return"cherry-picking";case"merge":return"merging";case"rebase":return"rebasing";case"revert":return"reverting"}}if(this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0)return"branch-changes";if(this.mergeTarget?.mergedStatus?.merged)return"branch-merged";switch(this.branch.status){case"ahead":return"branch-ahead";case"behind":return"branch-behind";case"diverged":return"branch-diverged";case"upToDate":return"branch-synced";case"missingUpstream":return"branch-missingUpstream";default:return}}}connectedCallback(){super.connectedCallback?.(),this.attachFocusListener()}disconnectedCallback(){super.disconnectedCallback?.(),this.eventController?.abort()}attachFocusListener(){this.eventController?.abort(),this.eventController=void 0,this.expandable&&(this.eventController??=new AbortController,this.addEventListener("focusin",this.onFocus,{signal:this.eventController.signal}))}renderIssues(){let{autolinks:t,issues:r}=this,o=r?.length?r:t;return o?.length?e$`
			${o.map(t=>e$`
					<p class="branch-item__grouping">
						<span class="branch-item__icon">
							<issue-icon state=${t.state} issue-id=${t.id}></issue-icon>
						</span>
						<a href=${t.url} class="branch-item__name branch-item__name--secondary">${t.title}</a>
						<span class="branch-item__identifier">${isNaN(parseInt(t.id))?"":"#"}${t.id}</span>
					</p>
				`)}
		`:eP}renderWip(){let t=this.wip?.workingTreeState;if(null==t)return eP;let r=lt(t);return e$`<gl-tooltip class="wip__pill" placement="bottom"
			><commit-stats
				added=${t.added}
				modified=${t.changed}
				removed=${t.deleted}
				symbol="icons"
			></commit-stats>
			<span class="wip__tooltip" slot="content">
				<p>${r.length?`${r.join(", ")} in the working tree`:"No working tree changes"}</p>
			</span>
		</gl-tooltip>`}renderAvatars(){let{contributors:t}=this;return t?.length?e$`<gl-avatar-list
			.avatars=${t.map(t=>({name:t.name,src:t.avatarUrl}))}
			max="1"
		></gl-avatar-list>`:eP}renderTracking(t=!1){let r,o;if(null==this.branch.upstream)return eP;let{state:i}=this.branch.upstream,n=0;if(t){let t=this.wip?.workingTreeState;if(null!=t){n=t.added+t.changed+t.deleted;let o=lt(t);o.length&&(r=e$`<p class="tracking__tooltip--wip">${o.join(", ")} in the working tree</p>`)}}if(this.branch.upstream.missing)o=e$`${sJ(this.branch.name)} is missing its upstream
			${sJ(this.branch.upstream.name)}`;else{let t=[];i.behind&&t.push(`${tQ("commit",i.behind)} behind`),i.ahead&&t.push(`${tQ("commit",i.ahead)} ahead of`),o=t.length?e$`${sJ(this.branch.name)} is
				${t.join(", ")}${sJ(this.branch.upstream?.name)}`:e$`${sJ(this.branch.name)} is up to date with
				${sJ(this.branch.upstream?.name)}`}return e$`<gl-tooltip class="tracking__pill" placement="bottom"
			><gl-tracking-pill
				class="pill"
				colorized
				outlined
				always-show
				ahead=${i.ahead}
				behind=${i.behind}
				working=${n}
				?missingUpstream=${this.branch.upstream?.missing??!1}
			></gl-tracking-pill>
			<span class="tracking__tooltip" slot="content">${o}${r}</span></gl-tooltip
		>`}renderBranchActions(){let t=this.getBranchActions?.();return t?.length?e$`<action-nav>${t}</action-nav>`:eP}renderPrActions(){let t=this.getPrActions?.();return t?.length?e$`<action-nav>${t}</action-nav>`:eP}renderCollapsedActions(){if(this.expanded)return eP;let t=this.getCollapsedActions?.();return t?.length?e$`<action-nav class="branch-item__collapsed-actions">${t}</action-nav>`:eP}createWebviewCommandLinkWithBranchRef(t,r){return this._webview.createCommandLink(t,r?{...r,...this.branchRef}:this.branchRef)}renderTimestamp(){let t,{timestamps:r}=this.branch;if(null==r)return eP;let{lastCommit:o,lastAccessed:i,lastModified:n}=r,a=Math.max(o??0,i??0,n??0);if(0===a)return eP;t=null!=n&&n>=(i??0)&&n>=(o??0)?"Modified":null!=i&&i>=(n??0)&&i>=(o??0)?"Accessed":"Committed";let c=(t,r)=>e$`${t} ${tG(new Date(r))} <i>(${tV(new Date(r),"MMMM Do, YYYY h:mma")})</i>`,h=[];null!=i&&null!=n&&3e4>Math.abs(i-n)?h.push(c("Modified",n)):(null!=i&&h.push(c("Accessed",i)),null!=n&&h.push(c("Modified",n))),null!=o&&h.push(c("Committed",o));let p=new Date(a);return e$`<gl-tooltip class="branch-item__date">
			<time datetime="${p.toISOString()}">${t} ${tG(p)}</time>
			<span slot="content">${h.map((t,r)=>r>0?e$`<br />${t}`:t)}</span>
		</gl-tooltip>`}renderBranchItem(t){let r=this.renderWip(),o=this.renderTracking(),i=this.renderAvatars(),n=this.branch.opened?void 0:this.renderBranchIndicator?.(),a=this.renderMergeTargetStatus(),c=this.renderTimestamp();return e$`
			<gl-work-item
				?primary=${!this.branch.opened}
				?nested=${!this.branch.opened}
				.indicator=${this.branchCardIndicator}
				?expanded=${this.expanded}
			>
				<div class="branch-item__section">
					<p class="branch-item__grouping">
						<span class="branch-item__icon"> ${this.renderBranchIcon()} </span>
						<span class="branch-item__name">${this.branch.name}</span>
					</p>
				</div>
				${o1(c||n||r||o||i,()=>e$`
						<div class="branch-item__section branch-item__section--details" slot="context">
							<p class="branch-item__changes">${c}${n}${r}${o}${i}</p>
						</div>
					`)}
				${o1(t||a,()=>e$`<div class="branch-item__actions" slot="actions">
							${a??eP}${t??eP}
						</div>`)}
				<span class="branch-item__summary" slot="summary">${this.renderTracking(!0)} ${i}</span>
			</gl-work-item>
		`}renderBranchIcon(){let t=this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0;return e$`<gl-branch-icon
			branch="${this.branch.name}"
			status="${this.branch.status}"
			?hasChanges=${t}
			upstream=${this.branch.upstream?.name}
			?worktree=${null!=this.branch.worktree}
			?is-default=${this.branch.worktree?.isDefault??!1}
		></gl-branch-icon>`}renderPrItem(){if(!this.pr)return this.branch.upstream?.missing===!1&&this.expanded?e$`
					<div>
						<button-container grouping="split" layout="full">
							<gl-button
								class="branch-item__missing"
								appearance="secondary"
								full
								href="${this._webview.createCommandLink("gitlens.createPullRequest:",{ref:this.branchRef,describeWithAI:!1,source:{source:"home",detail:"create-pr"}})}"
							>
								<code-icon icon="git-pull-request" slot="prefix"></code-icon>
								<span>Create a Pull Request</span>
							</gl-button>
							${this._subscription.orgSettings.get().ai&&this._aiCtx.state.get().enabled&&this.remote?.provider?.supportedFeatures?.createPullRequestWithDetails?e$`<gl-button
										class="branch-item__missing"
										tooltip="Create a Pull Request with AI (Preview)"
										appearance="secondary"
										href="${this._webview.createCommandLink("gitlens.createPullRequest:",{ref:this.branchRef,describeWithAI:!0,source:{source:"home",detail:"create-pr"}})}"
									>
										<code-icon icon="sparkle"></code-icon>
									</gl-button>`:eP}
						</button-container>
					</div>
				`:eP;let t=this.branch.opened?le(a9(this.pr,this.launchpadItem))??"base":void 0,r=this.renderPrActions();return e$`
			<gl-work-item ?expanded=${this.expanded} ?nested=${!this.branch.opened} .indicator=${t}>
				<div class="branch-item__section">
					<p class="branch-item__grouping">
						<span class="branch-item__icon">
							<pr-icon ?draft=${this.pr.draft} state=${this.pr.state} pr-id=${this.pr.id}></pr-icon>
						</span>
						<a href=${this.pr.url} class="branch-item__name branch-item__name--secondary"
							>${this.pr.title}</a
						>
						<span class="branch-item__identifier">#${this.pr.id}</span>
					</p>
				</div>
				${this.renderLaunchpadItem()}
				${o1(null!=r,()=>e$`<div class="branch-item__actions" slot="actions">${r}</div>`)}
			</gl-work-item>
		`}renderLaunchpadItem(){if(null==this.launchpadItem)return eP;let t=a9(this.pr,this.launchpadItem);if(null==t)return eP;let r=sU.get(t),o=sF.get(t);if(null==r||null==o)return eP;let i=o.match(/\$\((.*?)\)/)[1].replace("gitlens","gl"),n=function(t,r){if(null==t||0===t.length)return t;if(null==r)return t.replace(tJ,"");let o=function(t){let r=tZ.get(t);if(null!=r)return r;r=[];let o=t.length,i=0;for(;i<o;){let o=t.indexOf("${",i);if(-1===o)break;let n=t.indexOf("}",o);if(-1===n)break;let a=o+2,c="",h="",p="",u=!1,g="right",b="";if("'"===t[a]){let r=++a;if(-1===(a=t.indexOf("'",a)))break;r!==a&&(h=t.slice(r,a)),a++}else if(!tX(t.charCodeAt(a))){let r=a++;for(;a<n&&!tX(t.charCodeAt(a));)a++;r!==a&&(h=t.slice(r,a))}for(;a<n;){let r=t.charCodeAt(a);if(tX(r))c+=t[a++];else{if(124!==r)break;for(;a<n;){if((r=t.charCodeAt(++a))>=48&&r<=57){p+=t[a];continue}63===r?(u=!0,a++):45===r&&(g="left",a++);break}}}if(a<n){if("'"===t[a]){let r=++a;if(-1===(a=t.indexOf("'",a)))break;r!==a&&(b=t.slice(r,a)),a++}else if(!tX(t.charCodeAt(a))){let r=a++;for(;a<n&&!tX(t.charCodeAt(a));)a++;r!==a&&(b=t.slice(r,a))}}i=n+1,r.push({key:c,start:o,end:i,options:{prefix:h||void 0,suffix:b||void 0,truncateTo:p?parseInt(p,10):void 0,collapseWhitespace:u,padDirection:g}})}return tZ.set(t,r),r}(t);if(0===o.length)return t;let i=0,n="";for(let a of o)n+=t.slice(i,a.start)+(r[a.key]??""),i=a.end;return i<t.length&&(n+=t.slice(i)),n}(sH.get(this.launchpadItem.category)[1],{author:this.launchpadItem.author?.username??"unknown",createdDateRelative:tG(new Date(this.launchpadItem.createdDate))});return e$`<div class="branch-item__section branch-item__section--details" slot="context">
				<p class="launchpad-grouping--${le(t)}">
					<gl-tooltip content="${n}">
						<a
							href=${ia("gitlens.showLaunchpad",{source:"home",state:{id:{uuid:this.launchpadItem.uuid,group:t}}})}
							class="launchpad__grouping"
						>
							<code-icon icon="${i}"></code-icon
							><span class="branch-item__category">${r.toUpperCase()}</span></a
						>
					</gl-tooltip>
				</p>
			</div>
			${i?e$`<span
						class="branch-item__summary launchpad-grouping--${le(t)}"
						slot="summary"
						><gl-tooltip placement="bottom" content="${r}"
							><code-icon icon="${i}"></code-icon></gl-tooltip
					></span>`:eP}`}renderMergeTargetStatus(){return this.showUpgrade?e$`<gl-merge-target-upgrade
				class="branch-item__merge-target"
				.state=${this._subscription.subscription.get()?.state}
			></gl-merge-target-upgrade>`:this.branch.mergeTarget?e$`<gl-merge-target-status
			class="branch-item__merge-target"
			.branch=${this.branch}
			.targetPromise=${this.branch.mergeTarget}
		></gl-merge-target-status>`:eP}renderIssuesItem(){if(![...this.issues??[],...this.autolinks??[]].length)return eP;let t=this.branch.opened?"base":void 0;return e$`
			<gl-work-item ?expanded=${this.expanded} ?nested=${!this.branch.opened} .indicator=${t}>
				<div class="branch-item__section">${this.renderIssues()}</div>
			</gl-work-item>
		`}toggleExpanded(t=!this.expanded){this.expanded=t,queueMicrotask(()=>{this.emit("gl-branch-card-expand-toggled",{expanded:t})})}};a3([A({context:"subscription",subscribe:!0})],GlBranchCardBase.prototype,"_subscription",2),a3([A({context:"ai"})],GlBranchCardBase.prototype,"_aiCtx",2),a3([A({context:"webview"})],GlBranchCardBase.prototype,"_webview",2),a3([eD()],GlBranchCardBase.prototype,"repo",2),a3([eD({type:Boolean})],GlBranchCardBase.prototype,"showUpgrade",2),a3([eD({type:Object})],GlBranchCardBase.prototype,"branch",1),a3([ej()],GlBranchCardBase.prototype,"_autolinks",2),a3([ej()],GlBranchCardBase.prototype,"_contributors",2),a3([ej()],GlBranchCardBase.prototype,"_issues",2),a3([ej()],GlBranchCardBase.prototype,"_pr",2),a3([ej()],GlBranchCardBase.prototype,"_launchpadItem",2),a3([ej()],GlBranchCardBase.prototype,"_mergeTarget",2),a3([ej()],GlBranchCardBase.prototype,"_remote",2),a3([ej()],GlBranchCardBase.prototype,"_wip",2),a3([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"busy",2),a3([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"expanded",2),a3([eD({type:Boolean,reflect:!0})],GlBranchCardBase.prototype,"expandable",2),a3([tW("expandable")],GlBranchCardBase.prototype,"onExpandableChanged",1);let a8=class extends GlBranchCardBase{render(){return e$`
			<gl-card class="branch-item" focusable .indicator=${this.cardIndicator}>
				<div class="branch-item__container">
					${this.renderBranchItem(this.renderBranchActions())}${this.renderPrItem()}${this.renderIssuesItem()}
				</div>
				${this.renderCollapsedActions()}
			</gl-card>
		`}getCollapsedActions(){let t=[];return this.isWorktree?t.push(e$`<action-item
					label="Open Worktree"
					alt-label="Open Worktree in New Window"
					icon="browser"
					alt-icon="empty-window"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:")}
					alt-href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:",{location:"newWindow"})}
				></action-item>`):t.push(e$`<action-item
					label="Switch to Branch..."
					icon="gl-switch"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.switchToBranch:")}
				></action-item>`),t.push(e$`<action-item
				label="Open in Commit Graph"
				icon="gl-graph"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.showInCommitGraph:",{type:"branch"})}
			></action-item>`,e$`<action-item
				label=${this.isWorktree?"Open in Worktrees View":"Open in Branches View"}
				icon="arrow-right"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openInView.branch:")}
			></action-item>`),t}getBranchActions(){let t=[],r=this._subscription.orgSettings.get()?.ai&&this._aiCtx.state.get().enabled;return this.isWorktree?(t.push(e$`<action-item
					label="Open Worktree"
					alt-label="Open Worktree in New Window"
					icon="browser"
					alt-icon="empty-window"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:")}
					alt-href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openWorktree:",{location:"newWindow"})}
				></action-item>`),r&&(this.wip?.workingTreeState!=null&&this.wip.workingTreeState.added+this.wip.workingTreeState.changed+this.wip.workingTreeState.deleted>0?t.push(e$`<action-item
							label="Explain Working Changes (Preview)"
							icon="sparkle"
							href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainWip:")}
						></action-item>`):t.push(e$`<action-item
							label="Explain Branch Changes (Preview)"
							icon="sparkle"
							href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
						></action-item>`))):(t.push(e$`<action-item
					label="Switch to Branch..."
					icon="gl-switch"
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.switchToBranch:")}
				></action-item>`),r&&t.push(e$`<action-item
						label="Explain Branch Changes (Preview)"
						icon="sparkle"
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
					></action-item>`)),t.push(e$`<action-item
				label="Fetch"
				icon="repo-fetch"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.fetch:")}
			></action-item>`),t.push(e$` <action-item
				label="Visualize Branch History"
				icon="graph-scatter"
				href=${this._webview.createCommandLink("gitlens.visualizeHistory.branch:",{type:"branch",repoPath:this.repo,branchId:this.branch.id})}
			></action-item>`),t.push(e$`<action-item
				label="Open in Commit Graph"
				icon="gl-graph"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.showInCommitGraph:",{type:"branch"})}
			></action-item>`,e$`<action-item
				label=${this.isWorktree?"Open in Worktrees View":"Open in Branches View"}
				icon="arrow-right"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openInView.branch:")}
			></action-item>`),t}getPrActions(){return[e$`<action-item
				label="Open Pull Request Changes"
				icon="request-changes"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestChanges:")}
			></action-item>`,e$`<action-item
				label="Compare Pull Request"
				icon="git-compare"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestComparison:")}
			></action-item>`,e$`<action-item
				label="Open Pull Request Details"
				icon="eye"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestDetails:")}
			></action-item>`]}renderBranchIndicator(){}};a8=a3([eM("gl-branch-card")],a8);let a7=class extends lit_element_i{constructor(){super(...arguments),this.primary=!1,this.nested=!1,this.expanded=!1}render(){return e$`<gl-card
			.density=${this.primary?"tight":void 0}
			.grouping=${!1===this.nested?void 0:this.primary?"item-primary":"item"}
			.indicator=${this.indicator}
			>${this.renderContent()}</gl-card
		>`}renderContent(){let t=this.querySelectorAll('[slot="context"]').length>0||this.querySelectorAll('[slot="actions"]').length>0;return e$`
			<div class=${nN({"work-item":!0,"work-item_content-empty":!t})}>
				<header class="work-item__header">
					<slot class="work-item__main"></slot>
					${this.renderSummary()}
				</header>
				<div class="work-item__content">
					<slot class="work-item__context" name="context"></slot>
					<slot class="work-item__actions" name="actions"></slot>
				</div>
			</div>
		`}renderSummary(){return this.expanded?eP:e$`<slot class="work-item__summary" name="summary"></slot>`}};function a9(t,r){if(null==r||t?.state!=="opened"||t.draft&&"unassigned-reviewers"===r.category)return;let o=sq.get(r.category);if(null!=o&&"other"!==o&&"draft"!==o&&"current-branch"!==o)return o}function le(t){switch(t){case"mergeable":return"mergeable";case"blocked":return"blocked";case"follow-up":case"needs-review":return"attention"}}function lt(t){let r=[];return t.added&&r.push(`${tQ("file",t.added??0)} added`),t.changed&&r.push(`${tQ("file",t.changed??0)} changed`),t.deleted&&r.push(`${tQ("file",t.deleted??0)} deleted`),r}a7.styles=[j`
			.work-item {
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
			}

			.work-item_content-empty {
				gap: 0;
			}

			.work-item__header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				gap: 0.8rem;
			}

			.work-item__main {
				display: block;
				flex: 1;
				min-width: 0;
			}

			.work-item__summary {
				display: block;
				flex: none;
			}

			.work-item__content {
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
				max-height: 100px;

				transition-property: opacity, max-height, display;
				transition-duration: 0.2s;
				transition-behavior: allow-discrete;
			}

			:host(:not([expanded])) .work-item__content {
				display: none;
				opacity: 0;
				max-height: 0;
			}

			gl-card::part(base) {
				margin-block-end: 0;
				padding-top: var(--gl-card-vertical-padding, 0.8rem);
				padding-bottom: var(--gl-card-vertical-padding, 0.8rem);
			}
		`],a3([eD({type:Boolean,reflect:!0})],a7.prototype,"primary",2),a3([eD({type:Boolean,reflect:!0})],a7.prototype,"nested",2),a3([eD({reflect:!0})],a7.prototype,"indicator",2),a3([eD({type:Boolean,reflect:!0})],a7.prototype,"expanded",2),a7=a3([eM("gl-work-item")],a7);var lr=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,li=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lo(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lr(r,o,a),a};let ln=class extends lit_element_i{render(){return e$`<slot></slot>`}};ln.styles=j`
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
	`,ln=li([eM("gl-breadcrumbs")],ln);let ls=class extends lit_element_i{constructor(){super(...arguments),this.collapsibleState="none",this._shrink=1,this.onToggleCollapse=t=>{t.preventDefault(),t.stopPropagation(),t instanceof KeyboardEvent&&"Enter"!==t.key&&" "!==t.key||(this.collapsed=!this.collapsed)}}get collapsed(){return this._collapsed??"collapsed"===this.collapsibleState}set collapsed(t){this._collapsed=t}get collapsible(){return"none"!==this.collapsibleState}get shrink(){return this._shrink}set shrink(t){let r=this._shrink;this._shrink=t,this.style.setProperty("--gl-breadcrumb-item-shrink",String(t)),this.requestUpdate("shrink",r)}render(){let{collapsed:t,collapsible:r}=this;return e$`<div class=${nN({"breadcrumb-item":!0,collapsible:r})}>
			<span class="breadcrumb-content">
				${this.renderIcon(r,t)}
				<slot class="breadcrumb-label"></slot>
			</span>
			<slot name="children"></slot>
		</div>`}renderIcon(t,r){return this.icon?t||this.iconTooltip?e$`<gl-tooltip
			content="${t?r?"Click to Expand":"Click to Collapse":this.iconTooltip}"
			placement="bottom"
		>
			<code-icon
				class="breadcrumb-icon"
				icon="${this.icon}"
				tabindex="0"
				@click=${t?this.onToggleCollapse:void 0}
				@keyup=${t?this.onToggleCollapse:void 0}
			></code-icon>
		</gl-tooltip>`:e$`<code-icon class="breadcrumb-icon" icon="${this.icon}"></code-icon>`:eP}};ls.styles=[oy,j`
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
		`],li([ej()],ls.prototype,"_collapsed",2),li([eD({type:Boolean,reflect:!0})],ls.prototype,"collapsed",1),li([eD({type:String})],ls.prototype,"collapsibleState",2),li([eD()],ls.prototype,"icon",2),li([eD()],ls.prototype,"iconTooltip",2),li([eD({type:Number})],ls.prototype,"shrink",1),ls=li([eM("gl-breadcrumb-item")],ls);let la=class extends lit_element_i{render(){return e$`<slot></slot>`}};la.styles=j`
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
	`,la=li([eM("gl-breadcrumb-item-child")],la);var ll=Object.defineProperty,lc=Object.getOwnPropertyDescriptor,ld=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lc(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ll(r,o,a),a};let lh=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){let t=`--skeleton-lines: ${this.lines};`;return e$`<div class="skeleton" style=${t}></div>`}};lh.styles=j`
		:host {
			--skeleton-line-height: 1.2;
			--skeleton-lines: 1;
		}

		.skeleton {
			position: relative;
			display: block;
			overflow: hidden;
			border-radius: 0.25em;
			width: 100%;
			height: calc(1em * var(--skeleton-line-height, 1.2) * var(--skeleton-lines, 1));
			background-color: var(--color-background--lighten-15);
		}

		.skeleton::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-background--lighten-15) 20%,
				var(--color-background--lighten-30) 60%,
				transparent 100%
			);
			transform: translateX(-100%);
			animation: skeleton-loader 2s ease-in-out infinite;
		}

		@keyframes skeleton-loader {
			100% {
				transform: translateX(100%);
			}
		}
	`,ld([eD({type:Number})],lh.prototype,"lines",2),lh=ld([eM("skeleton-loader")],lh);let lp=j`
	:host {
		--gl-color-mix-base: var(
			--gl-card-background,
			color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%)
		);
	}

	.card {
		display: block;
		flex-direction: column;
		gap: 0.8rem;
		padding: 0.8rem 1.2rem;
		border-radius: 0.4rem;
		border-inline-start: 0.3rem solid transparent;
		/* border-inline-end: 0.3rem solid transparent; */
		background-color: var(--gl-card-background, color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%));
		margin-block-end: 0.6rem;
		position: relative;
	}

	:host-context(.vscode-dark) .card.is-base,
	:host-context(.vscode-high-contrast) .card.is-base {
		border-inline-start-color: color-mix(in lab, var(--gl-color-mix-base) 100%, #fff 7%);
	}

	:host-context(.vscode-light) .card.is-base,
	:host-context(.vscode-high-contrast-light) .card.is-base {
		border-inline-start-color: color-mix(in lab, var(--gl-color-mix-base) 100%, #000 5%);
	}

	.card.is-active {
		border-inline-start-color: var(--gl-card-indicator-border, var(--vscode-gitDecoration-addedResourceForeground));
	}

	.card.is-cherry-picking,
	.card.is-merging,
	.card.is-rebasing,
	.card.is-reverting {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor)
		);
	}

	.card.is-conflict {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor)
		);
	}

	.card.is-issue-open {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-openAutolinkedIssueIconColor) 0%, transparent)
		);
	}

	.card.is-issue-closed {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-closedAutolinkedIssueIconColor) 0%, transparent)
		);
	}

	.card.is-pr-open {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-openPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-pr-closed {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-closedPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-pr-merged {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-mergedPullRequestIconColor) 0%, transparent)
		);
	}

	.card.is-mergeable {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(var(--vscode-gitlens-launchpadIndicatorMergeableColor))
		);
	}

	.card.is-blocked {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-launchpadIndicatorBlockedColor)
		);
	}

	.card.is-attention {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-launchpadIndicatorAttentionColor)
		);
	}

	.card.is-branch-merged {
		border-inline-start-color: var(--gl-card-indicator-border, var(--vscode-gitlens-mergedPullRequestIconColor));
	}

	.card.is-branch-synced {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-decorations\\.branchUpToDateForegroundColor) 20%, transparent)
		);
	}

	.card.is-branch-diverged {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			color-mix(in lab, var(--vscode-gitlens-decorations\\.branchDivergedForegroundColor) 70%, transparent)
		);
	}

	.card.is-branch-behind {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchBehindForegroundColor)
		);
	}

	.card.is-branch-ahead {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchBehindForegroundColor)
		);
	}

	.card.is-info,
	.card.is-branch-changes {
		border-inline-start-color: var(--gl-card-indicator-border, color-mix(in lab, #1a79ff 80%, transparent));
	}

	.card.is-branch-missingUpstream {
		border-inline-start-color: var(
			--gl-card-indicator-border,
			var(--vscode-gitlens-decorations\\.branchMissingUpstreamForegroundColor)
		);
	}

	.card--focusable {
		cursor: pointer;
	}

	.card--focusable:focus,
	.card:focus-within,
	.card:hover {
		background-color: var(
			--gl-card-hover-background,
			color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 8%)
		);
	}

	.card--focusable:focus-visible {
		outline: 0.1rem solid var(--vscode-focusBorder);
	}

	.card__actions {
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		display: block;
	}

	.card__content {
		display: block;
	}

	.card__content::slotted(:first-child) {
		margin-block-start: 0;
	}

	.card__content::slotted(:last-child) {
		margin-block-end: 0;
	}

	:host-context(.vscode-dark) .card--grouping-item,
	:host-context(.vscode-high-contrast) .card--grouping-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 3%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #fff 1.5%);
	}

	:host-context(.vscode-light) .card--grouping-item,
	:host-context(.vscode-high-contrast-light) .card--grouping-item {
		--gl-card-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 8%);
		--gl-card-hover-background: color-mix(in lab, var(--vscode-sideBar-background) 100%, #000 10%);
	}

	.card--grouping-item-primary {
		--gl-card-background: transparent;
		--gl-card-hover-background: transparent;
	}

	.card--density-tight {
		padding: 0;
	}
`;var lu=Object.defineProperty,lg=Object.getOwnPropertyDescriptor,lb=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lg(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lu(r,o,a),a};let lm=class extends lit_element_i{constructor(){super(...arguments),this._focusable=!1}get focusable(){return null!=this.href||this._focusable}set focusable(t){let r=this._focusable;this._focusable=t,this.requestUpdate("focusable",r)}get classNames(){return{card:!0,"card--focusable":this.focusable,[`card--grouping-${this.grouping}`]:null!=this.grouping,[`card--density-${this.density}`]:null!=this.density,[`is-${this.indicator}`]:null!=this.indicator}}render(){return null!=this.href?e$`<a part="base" class=${nN(this.classNames)} href=${this.href}
				>${this.renderContent()}</a
			>`:e$`<div part="base" tabindex=${this.focusable?0:-1} class=${nN(this.classNames)}>
			${this.renderContent()}
		</div>`}renderContent(){return e$`
			<slot class="card__content"></slot>
			<slot name="actions" class="card__actions"></slot>
		`}focus(t){null!=this.href?this.shadowRoot?.querySelector("a")?.focus(t):super.focus(t)}};lm.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lm.styles=[lp],lb([eD({reflect:!0})],lm.prototype,"indicator",2),lb([eD({reflect:!0})],lm.prototype,"grouping",2),lb([eD({reflect:!0})],lm.prototype,"density",2),lb([eD()],lm.prototype,"href",2),lb([eD({type:Boolean,reflect:!0})],lm.prototype,"focusable",1),lm=lb([eM("gl-card")],lm);var lf=Object.defineProperty,lv=Object.getOwnPropertyDescriptor;let ly=class extends lit_element_i{};ly.styles=[ow,j`
			:host {
				display: block;
				height: 0;
				margin: 0.6rem;
				border-top: 0.1rem solid var(--vscode-menu-separatorBackground);
			}
		`],ly=((t,r,o,i)=>{for(var n,a=i>1?void 0:i?lv(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lf(r,o,a),a})([eM("menu-divider")],ly);var lw=Object.defineProperty,l_=Object.getOwnPropertyDescriptor,lk=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l_(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lw(r,o,a),a};let lx=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option"}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(t){(t.has("disabled")||t.has("role"))&&this.updateInteractiveState()}render(){return this.href?e$`<a href=${this.href}><slot></slot></a>`:e$`<slot></slot>`}};lx.styles=[ow,j`
			:host {
				display: block;
				font-family: inherit;
				border: none;
				padding: 0 0.6rem;
				cursor: pointer;
				color: var(--vscode-menu-foreground);
				background-color: var(--vscode-menu-background);
				text-align: left;
				height: auto;
				line-height: 2.2rem;
				-webkit-font-smoothing: auto;
				border-radius: var(--menu-item-radius, 0.3rem);
			}

			:host([role='option']:hover) {
				color: var(--vscode-menu-selectionForeground);
				background-color: var(--vscode-menu-selectionBackground);
			}

			:host([disabled]) {
				pointer-events: none;
				cursor: default;
				opacity: 0.5;
			}

			:host([aria-selected='true']) {
				opacity: 1;
				color: var(--vscode-menu-selectionForeground);
				background-color: var(--vscode-menu-background);
			}

			:host([href]) {
				padding-inline: 0;
			}

			a {
				display: block;
				color: inherit;
				text-decoration: none;
				padding: 0 0.6rem;
			}
		`],lk([eD({type:Boolean,reflect:!0})],lx.prototype,"disabled",2),lk([eD({reflect:!0})],lx.prototype,"href",2),lk([eD({reflect:!0})],lx.prototype,"role",2),lx=lk([eM("menu-item")],lx);var l$=Object.defineProperty,lC=Object.getOwnPropertyDescriptor;let lS=class extends lit_element_i{render(){return e$`<slot></slot>`}};lS.styles=[ow,j`
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
		`],lS=((t,r,o,i)=>{for(var n,a=i>1?void 0:i?lC(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l$(r,o,a),a})([eM("menu-label")],lS);let lP=j`
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
`,lO=j`
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
`;var lA=Object.defineProperty,lR=Object.getOwnPropertyDescriptor,lE=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lR(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lA(r,o,a),a};let lI=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return e$`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};lI.styles=[lP,lO],lE([eD({type:Boolean})],lI.prototype,"pulse",2),lI=lE([eM("gl-indicator")],lI);var lB=Object.defineProperty,lL=Object.getOwnPropertyDescriptor,lT=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lL(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lB(r,o,a),a};let lM=class extends GlElement{constructor(){super(...arguments),this.connectIcon=!0,this.disabled=!1,this.icon=!0,this.hasMultipleRepositories=!1,this.expandable=!1}get icons(){if(this.repository?.provider===void 0)return;let t=0;if(this.icon&&t++,this.connectIcon&&this.repository.provider.integration?.connected===!1&&t++,0!==t)return t}get displayName(){return this.repository?.name??"none selected"}render(){return e$`
			${this.renderProviderIcon()}
			<gl-button
				class="truncated-button"
				appearance="toolbar"
				?disabled=${this.disabled}
				@click=${t=>this.emit("gl-click",{event:t,part:"label",repository:this.repository})}
			>
				<span class="truncated-button__label">${this.displayName}</span>
				${this.hasMultipleRepositories?e$`<code-icon
							slot="suffix"
							class="picker-icon"
							icon="chevron-down"
							aria-hidden="true"
						></code-icon>`:eP}
				<slot name="tooltip" slot="tooltip">${this.displayName}</slot>
			</gl-button>
		`}renderProviderIcon(){if(!this.icon)return eP;let{repository:t}=this;if(!t?.provider)return e$`
				<gl-button part="provider-icon" appearance="toolbar" ?disabled=${!0}>
					<code-icon icon="gl-repository" aria-hidden="true"></code-icon>
				</gl-button>
			`;let{provider:r}=t,o=r.integration?.connected;return e$`<gl-popover placement="bottom" trigger="hover click focus">
				<gl-button
					slot="anchor"
					part="provider-icon"
					appearance="toolbar"
					href=${r.url??eP}
					aria-label=${`Open Repository on ${r.name}`}
					@click=${t=>this.emit("gl-click",{event:t,part:"icon",repository:this.repository})}
				>
					<code-icon
						icon=${"cloud"===r.icon?"cloud":`gl-provider-${r.icon}`}
						aria-hidden="true"
					></code-icon>
					${o1(o,()=>e$`<gl-indicator class="indicator-dot"></gl-indicator>`)}
				</gl-button>
				<span slot="content">
					Open Repository on ${r.name}
					<hr />
					${o1(o,()=>e$`
							<span>
								<code-icon style="margin-top: -3px" icon="check" aria-hidden="true"></code-icon>
								Connected to ${r.name}
							</span>
						`,()=>!1!==o?eP:e$`
								<code-icon style="margin-top: -3px" icon="plug" aria-hidden="true"></code-icon>
								<a
									href=${ia("gitlens.connectRemoteProvider",{repoPath:t.path,remote:r.bestRemoteName})}
								>
									Connect to ${t.provider.name}
								</a>
								<span>&mdash; not connected</span>
							`)}
				</span>
			</gl-popover>
			${this.renderConnectIcon()}`}renderConnectIcon(){if(!this.connectIcon)return eP;let{repository:t}=this;if(!t?.provider)return eP;let{provider:r}=t;return r.integration?.connected!==!1?eP:e$`
			<gl-button
				part="connect-icon"
				appearance="toolbar"
				href=${ia("gitlens.connectRemoteProvider",{repoPath:t.path,remote:r.bestRemoteName})}
			>
				<code-icon icon="plug" style="color: var(--titlebar-fg)"></code-icon>
				<span slot="tooltip">
					Connect to ${r.name}
					<hr />
					View pull requests and issues in Home, Commit Graph, Launchpad, autolinks, and more
				</span>
			</gl-button>
		`}};lM.styles=[ic,id,aT,az,j`
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
		`,aM],lT([eD({type:Boolean})],lM.prototype,"connectIcon",2),lT([eD({type:Boolean})],lM.prototype,"disabled",2),lT([eD({type:Boolean})],lM.prototype,"icon",2),lT([eD({type:Object})],lM.prototype,"repository",2),lT([eD({type:Boolean})],lM.prototype,"hasMultipleRepositories",2),lT([eD({type:Object})],lM.prototype,"source",2),lT([eD({type:Boolean,reflect:!0})],lM.prototype,"expandable",2),lT([eD({type:Number,reflect:!0})],lM.prototype,"icons",1),lM=lT([eM("gl-repo-button-group")],lM);let lz={"cherry-pick":{label:"Cherry picking",conflicts:"Resolve conflicts to continue cherry picking",directionality:"into"},merge:{label:"Merging",conflicts:"Resolve conflicts to continue merging",directionality:"into"},rebase:{label:"Rebasing",conflicts:"Resolve conflicts to continue rebasing",directionality:"onto",pending:"Pending rebase of"},revert:{label:"Reverting",conflicts:"Resolve conflicts to continue reverting",directionality:"in"}},lD="0000000000000000000000000000000000000000:",lj=/^([\w\-/]+(?:\.[\w\-/]+)*)?(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)?$/,lW=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.?)([\w\-/]+(?:\.[\w\-/]+)*)$/,lN=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,lF=/^([\w\-/]+(?:\.[\w\-/]+)*)(\.\.\.)([\w\-/]+(?:\.[\w\-/]+)*)$/,lU=/(^[0-9a-f]{40}([\^@~:]\S*)?$)|(^[0]{40}(:|-)$)/,lq=/^(.*?)([\^@~:].*)?$/,lH=/^[0]{40}(?:[\^@~:]\S*)?:?$/,lG=/^[0]{40}([\^@~]\S*)?:$/;function lV(t,r){return!!r&&t.test(r)}function lK(t,r=!1){return"0000000000000000000000000000000000000000"===t||t===lD||!r&&lV(lH,t)}var lY=Object.defineProperty,lJ=Object.getOwnPropertyDescriptor,lZ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?lJ(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&lY(r,o,a),a};let lX="gl-copy-container",lQ=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(t){t.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?e$`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eP}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eP}async onClick(t){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(t){("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.onClick(t))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};lQ.tagName=lX,lQ.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lQ.styles=j`
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
	`,lZ([eD({reflect:!0})],lQ.prototype,"appearance",2),lZ([eD({reflect:!1})],lQ.prototype,"content",2),lZ([eD()],lQ.prototype,"copyLabel",2),lZ([eD()],lQ.prototype,"copiedLabel",2),lZ([eD({type:Boolean,reflect:!0})],lQ.prototype,"disabled",2),lZ([eD()],lQ.prototype,"placement",2),lZ([eD({type:Number})],lQ.prototype,"timeout",2),lZ([ej()],lQ.prototype,"label",2),lZ([eN("gl-tooltip")],lQ.prototype,"tooltip",2),lQ=lZ([eM(lX)],lQ);var l0=Object.defineProperty,l1=Object.getOwnPropertyDescriptor,l2=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l1(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l0(r,o,a),a};let l5=j`
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
`,l3=class extends lit_element_i{constructor(){super(...arguments),this.size=12}get label(){return function(t,r){if("0000000000000000000000000000000000000000-"===t)return"(deleted)";if(!t)return r?.strings?.working??"";if(lK(t))return!function(t,r=!1){return t===lD||!r&&lV(lG,t)}(t)?r?.strings?.uncommitted??"Working Tree":r?.strings?.uncommittedStaged??"Index";if(function(t,r="any"){if(null==t)return!1;switch(r){case"qualified":return lW.test(t);case"qualified-double-dot":return lN.test(t);case"qualified-triple-dot":return lF.test(t);default:return lj.test(t)}}(t)||!lV(lU,t))return t;let o=lq.exec(t);if(null!=o){let[,t,r]=o;if(null!=r)return`${t.substring(0,7)}${r}`}return t.substring(0,7)}(this.sha,{strings:{uncommitted:"Working",uncommittedStaged:"Staged",working:"Working"}})}render(){return null==this.sha?eP:!this.sha||lK(this.sha)?e$`<span part="label" class="label--uncommitted">${this.label}</span>`:e$`<code-icon part="icon" class="icon" icon="git-commit" size="${this.size}"></code-icon
			><span part="label">${this.label}</span>`}};l3.styles=l5,l2([eD({type:String})],l3.prototype,"sha",2),l2([eD({type:Number})],l3.prototype,"size",2),l3=l2([eM("gl-commit-sha")],l3);let l4=class extends lit_element_i{constructor(){super(...arguments),this.size=12}render(){return null==this.sha?eP:e$`<gl-copy-container .content=${this.sha} placement="top">
			<gl-commit-sha exportparts="icon, label" .sha=${this.sha} .size=${this.size}></gl-commit-sha>
		</gl-copy-container>`}};l4.styles=l5,l2([eD({type:String})],l4.prototype,"sha",2),l2([eD({type:Number})],l4.prototype,"size",2),l4=l2([eM("gl-commit-sha-copy")],l4);var l6=Object.defineProperty,l8=Object.getOwnPropertyDescriptor,l7=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?l8(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&l6(r,o,a),a};let l9=class extends lit_element_i{constructor(){super(...arguments),this.conflicts=!1}get onSkipUrl(){return this.createPausedOperationCommandLink("skip")}get onContinueUrl(){return this.createPausedOperationCommandLink("continue")}get onAbortUrl(){return this.createPausedOperationCommandLink("abort")}get onOpenEditorUrl(){return this.createPausedOperationCommandLink("open")}get onShowConflictsUrl(){return this.createPausedOperationCommandLink("showConflicts")}createPausedOperationCommandLink(t){return this._webview.createCommandLink(`gitlens.pausedOperation.${t}:`,this.pausedOpStatus)}render(){return null==this.pausedOpStatus?eP:e$`
			<span class="status" part="base">
				<code-icon icon="warning" class="icon"></code-icon>
				${this.renderStatus(this.pausedOpStatus)}${this.renderActions()}
			</span>
		`}renderStatus(t){if("rebase"!==t.type){let r=lz[t.type],o=this.conflicts?r.conflicts:r.label;return e$`<span class="label"
				>${this.renderConflictsLink(o)} ${this.renderReference(t.incoming)}
				${r.directionality} ${this.renderReference(t.current)}</span
			>`}let r=t.steps.total>0,o=lz[t.type],i=this.conflicts?o.conflicts:r?o.label:o.pending;return e$`<span class="label"
				>${this.renderConflictsLink(i)} ${this.renderReference(t.incoming)}
				${o.directionality} ${this.renderReference(t.current??t.onto)}</span
			>${r?e$`<span class="steps"
						>(${t.steps.current.number}/${t.steps.total})</span
					>`:eP}`}renderConflictsLink(t){return this.conflicts?e$`<gl-tooltip hoist content="Show Conflicts">
			<a href="${this.onShowConflictsUrl}" class="link">${t}</a>
		</gl-tooltip>`:t}renderReference(t){let r=this._webview.webviewId,o="branch"===t.refType,i=this.createJumpUrl(t);return e$`<gl-tooltip hoist content=${"gitlens.graph"===r||"gitlens.views.graph"===r?o?"Jump to Branch":"Jump to Commit":o?"Open Branch in Commit Graph":"Open Commit in Commit Graph"}>
			<a href=${i} class="ref-link">
				${o?e$`<gl-branch-name .name=${t.name} .size=${12}></gl-branch-name>`:e$`<gl-commit-sha .sha=${t.ref} .size=${12}></gl-commit-sha>`}
			</a>
		</gl-tooltip>`}createJumpUrl(t){return ia("gitlens.showInCommitGraph",{ref:t,source:{source:"merge-target"}})}renderActions(){if(null==this.pausedOpStatus)return eP;let t=this.pausedOpStatus.type;return e$`<action-nav class="actions">
			${o1("rebase"===t,()=>e$`<action-item
						label="Open in Rebase Editor"
						href=${this.onOpenEditorUrl}
						icon="edit"
					></action-item>`)}
			${o1("revert"!==t&&!("rebase"===t&&this.conflicts),()=>e$`
					<action-item label="Continue" icon="debug-continue" href=${this.onContinueUrl}></action-item>
				`)}
			${o1("merge"!==t,()=>e$`<action-item label="Skip" icon="debug-step-over" href=${this.onSkipUrl}></action-item>`)}
			<action-item label="Abort" href=${this.onAbortUrl} icon="circle-slash"></action-item>
		</action-nav>`}};l9.styles=[j`
			.status {
				--action-item-foreground: #000;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				gap: 0.6rem;
				width: 100%;
				max-width: 100%;
				margin-block: 0;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingForegroundColor);
				color: #000;
				border-radius: 0.3rem;
				padding: 0.1rem 0.4rem;
			}

			:host([conflicts]) .status {
				--action-item-foreground: #fff;
				background-color: var(--vscode-gitlens-decorations\\.statusMergingOrRebasingConflictForegroundColor);
				color: #fff;
			}

			.label {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.icon,
			.steps,
			.actions {
				flex: none;
			}

			.md-code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}

			gl-commit-sha::part(label) {
				font-weight: bold;
			}

			.link {
				color: inherit;
				text-decoration: underline dotted;
				text-underline-offset: 0.3rem;
				opacity: 0.9;

				&:hover {
					text-decoration: none;
					opacity: 1;
				}
			}

			.link--conflicts {
				margin-left: 1rem;
			}

			.ref-link {
				color: inherit;
				cursor: pointer;
				text-decoration: none !important;
			}
		`],l7([A({context:"webview"})],l9.prototype,"_webview",2),l7([eD({type:Boolean,reflect:!0})],l9.prototype,"conflicts",2),l7([eD({type:Object})],l9.prototype,"pausedOpStatus",2),l9=l7([eM("gl-merge-rebase-status")],l9);var ce=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,cr=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ct(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&ce(r,o,a),a};let co=class extends th(lit_element_i){constructor(){super(...arguments),this.repoCollapsed=!0}get isPro(){let t=this._subscription.subscription.get();return null!=t&&is(t.state)}connectedCallback(){super.connectedCallback?.(),this._homeCtx.repositories.get().openCount>0&&this._activeOverviewState.fetch()}onBranchSelectorClicked(){this._commands.service?.executeScoped("gitlens.switchToBranch:home",{repoPath:this._activeOverviewState.value.get()?.active[0]?.repoPath})}render(){if(this._homeCtx.discovering.get())return this.renderLoader();if(0===this._homeCtx.repositories.get().openCount)return eP;if(null!=this._activeOverviewState.error.get())return e$`
				<gl-section>
					<span slot="heading">Active Branch</span>
					<span
						>Unable to load branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._activeOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._activeOverviewState.value.get();return null==t?this.renderLoader():this.renderComplete(t,this._activeOverviewState.loading.get())}renderLoader(){return e$`
			<gl-section>
				<skeleton-loader slot="heading" lines="1"></skeleton-loader>
				<skeleton-loader lines="3"></skeleton-loader>
			</gl-section>
		`}renderComplete(t,r=!1){let o=t?.repository,i=t?.active;if(!o||!i?.length)return e$`<span>None</span>`;let n=this._homeCtx.repositories.get().openCount>1,a=i[0];return e$`
			<gl-section ?loading=${r}>
				<gl-breadcrumbs slot="heading">
					<gl-breadcrumb-item collapsibleState="none" class="heading-repo-breadcrumb"
						><gl-repo-button-group
							.repository=${o}
							?disabled=${!n}
							?hasMultipleRepositories=${n}
							.source=${{source:"graph"}}
							?expandable=${!0}
							@gl-click=${this.onRepositorySelectorClicked}
							><span slot="tooltip">
								Switch to Another Repository...
								<hr />
								${o.name}
							</span></gl-repo-button-group
						></gl-breadcrumb-item
					>
					<gl-breadcrumb-item collapsibleState="none" icon="git-branch" class="heading-branch-breadcrumb"
						><gl-ref-button .ref=${a.reference} @click=${this.onBranchSelectorClicked}
							><span slot="tooltip">Switch to Another Branch... </span></gl-ref-button
						></gl-breadcrumb-item
					>
				</gl-breadcrumbs>
				<span class="section-heading-actions" slot="heading-actions">
					<gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Fetch All"
						href=${this._webview.createCommandLink("gitlens.fetch:")}
						><code-icon icon="repo-fetch"></code-icon
					></gl-button>
					<gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Visualize Repo History"
						href=${this._webview.createCommandLink("gitlens.visualizeHistory.repo:",{type:"repo",repoPath:o.path})}
						><code-icon icon="graph-scatter"></code-icon></gl-button
					><gl-button
						aria-busy="${r??eP}"
						?disabled=${r}
						class="section-heading-action"
						appearance="toolbar"
						tooltip="Open in Commit Graph"
						href=${this._webview.createCommandLink("gitlens.showInCommitGraph:",{type:"repo",repoPath:o.path})}
						><code-icon icon="gl-graph"></code-icon
					></gl-button>
				</span>
				${i.map(t=>this.renderRepoBranchCard(t,o.path,r))}
			</gl-section>
		`}renderRepoBranchCard(t,r,o){return e$`<gl-active-branch-card
			.branch=${t}
			.repo=${r}
			?busy=${o}
			?showUpgrade=${!this.isPro}
		></gl-active-branch-card>`}onRepositorySelectorClicked(t){"label"===t.detail.part&&this._activeOverviewState.changeRepository()}};co.styles=[ic,a4,id,j`
			[hidden] {
				display: none;
			}

			:host {
				display: block;
				margin-bottom: 2.4rem;
				color: var(--vscode-foreground);
			}

			gl-repo-button-group {
				text-transform: none;
			}

			gl-section::part(header) {
				margin-block-end: 0.2rem;
			}

			.section-heading-actions {
				flex: none;
				display: flex;
				align-items: center;
			}

			.section-heading-action {
				--button-padding: 0.2rem;
				--button-line-height: 1.2rem;
				/* margin-block: -1rem; */
			}

			.section-heading-provider {
				color: inherit;
			}

			.tooltip {
				text-transform: none;
			}

			.uppercase {
				text-transform: uppercase;
			}

			gl-breadcrumbs {
				--gl-tooltip-text-transform: none;
			}

			.heading-branch-breadcrumb {
				text-transform: none;
			}
		`],cr([A({context:"subscription",subscribe:!0})],co.prototype,"_subscription",2),cr([A({context:"homeState"})],co.prototype,"_homeCtx",2),cr([A({context:"commands"})],co.prototype,"_commands",2),cr([A({context:"activeOverviewState"})],co.prototype,"_activeOverviewState",2),cr([A({context:"webview"})],co.prototype,"_webview",2),cr([ej()],co.prototype,"repoCollapsed",2),co=cr([eM("gl-active-work")],co);let ci=class extends GlBranchCardBase{connectedCallback(){super.connectedCallback?.(),this.toggleExpanded(!0)}render(){return e$`
			${this.renderBranchIndicator()}${this.renderIssuesItem()}${this.renderBranchItem(e$`${this.renderBranchStateActions()}${this.renderBranchActions()}`)}${this.renderPrItem()}
		`}renderActionsMenu(){let t=this._subscription.orgSettings.get()?.ai&&this._aiCtx.state.get().enabled,r=this.busy,o=this.wip?.workingTreeState,i=null!=o&&o.added+o.changed+o.deleted>0,n=[];if(t)i&&(n.push(e$`<menu-item
						?disabled=${r}
						href=${ia("gitlens.ai.generateCommitMessage",{repoPath:this.repo,source:"home"})}
						>Generate Commit Message</menu-item
					>`),n.push(e$`<menu-divider></menu-divider>`),n.push(e$`<menu-item
						?disabled=${r}
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainWip:")}
						>Explain Working Changes (Preview)</menu-item
					>`)),n.push(e$`<menu-item
					?disabled=${r}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.ai.explainBranch:")}
					>Explain Branch Changes (Preview)</menu-item
				>`),i&&(n.push(e$`<menu-divider></menu-divider>`),n.push(e$`<menu-item
						?disabled=${r}
						href=${this.createWebviewCommandLinkWithBranchRef("gitlens.createCloudPatch:")}
						>Share as Cloud Patch</menu-item
					>`));else if(i)return e$`
				<gl-button
					aria-busy=${r??eP}
					?disabled=${r}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.createCloudPatch:")}
					appearance="secondary"
					tooltip="Share as Cloud Patch"
					><code-icon icon="gl-cloud-patch-share"></code-icon>
				</gl-button>
			`;if(0!==n.length)return e$`<gl-popover
			appearance="menu"
			trigger="click focus"
			placement="bottom-end"
			.arrow=${!1}
			distance="0"
		>
			<gl-button slot="anchor" appearance="toolbar" tooltipPlacement="top" aria-label="Additional Actions">
				<code-icon icon="ellipsis"></code-icon>
			</gl-button>
			<div slot="content">${n}</div>
		</gl-popover>`}renderBranchStateActions(){let{name:t,upstream:r}=this.branch,o=[],i=()=>0===o.length?this.renderActionsMenu():e$`<div><button-container>${o}${this.renderActionsMenu()}</button-container></div>`,n=this.busy,a=this.wip?.workingTreeState,c=null!=a&&a.added+a.changed+a.deleted>0;if(c&&o.push(e$`
				<gl-button
					aria-busy=${n??eP}
					?disabled=${n}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.composeCommits:")}
					appearance="secondary"
					density="compact"
					><code-icon icon="wand" slot="prefix"></code-icon>Compose Commits...<span slot="tooltip"
						><strong>Compose Commits</strong> (Preview)<br /><i
							>Automatically or interactively organize changes into meaningful commits</i
						></span
					></gl-button
				>
			`),this.wip?.pausedOpStatus!=null)return i();if(r?.missing!==!1)return o.push(e$`
				<gl-button
					aria-busy=${n??eP}
					?disabled=${n}
					href=${this.createWebviewCommandLinkWithBranchRef("gitlens.publishBranch:")}
					appearance="secondary"
					density="compact"
				>
					<code-icon icon="cloud-upload" slot="${(c?void 0:"prefix")??eP}"></code-icon>
					${c?"":"Publish Branch"}
					<span slot="tooltip"
						>Publish (push) <strong>${t}</strong> to ${r?.name??"a remote"}</span
					>
				</gl-button>
			`),i();if(r?.state?.ahead||r?.state?.behind){let t=!!r.state.ahead,a=!!r.state.behind;if(t&&a)return o.push(e$`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.pull:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-pull" slot="${(c?void 0:"prefix")??eP}"></code-icon>
						${c?"":"Pull"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Pull${r?.name?e$` from <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.push:",{force:!0})}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-force-push"></code-icon>
						<span slot="tooltip"
							>Force Push${r?.name?e$` to <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`),i();if(a)return o.push(e$`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.pull:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-pull" slot="${(c?void 0:"prefix")??eP}"></code-icon>
						${c?"":"Pull"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Pull${r?.name?e$` from <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`),i();t&&o.push(e$`
					<gl-button
						aria-busy=${n??eP}
						?disabled=${n}
						href=${this._webview.createCommandLink("gitlens.push:")}
						appearance="secondary"
						density="compact"
					>
						<code-icon icon="repo-push" slot="prefix"></code-icon>
						${c?"":"Push"}
						<gl-tracking-pill
							.ahead=${r.state.ahead}
							.behind=${r.state.behind}
							slot="suffix"
						></gl-tracking-pill>
						<span slot="tooltip"
							>Push${r?.name?e$` to <strong>${r.name}</strong>`:""}</span
						>
					</gl-button>
				`)}return i()}renderBranchIndicator(){let t=this.wip;if(t?.pausedOpStatus!=null)return e$`<gl-merge-rebase-status
			?conflicts=${t.hasConflicts}
			.pausedOpStatus=${t.pausedOpStatus}
		></gl-merge-rebase-status>`}getBranchActions(){return[]}getPrActions(){return[e$`<action-item
				label="Open Pull Request Changes"
				icon="request-changes"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestChanges:")}
			></action-item>`,e$`<action-item
				label="Compare Pull Request"
				icon="git-compare"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestComparison:")}
			></action-item>`,e$`<action-item
				label="Open Pull Request Details"
				icon="eye"
				href=${this.createWebviewCommandLinkWithBranchRef("gitlens.openPullRequestDetails:")}
			></action-item>`]}getCollapsedActions(){return[]}renderIssuesItem(){return[...this.issues??[],...this.autolinks??[]].length?super.renderIssuesItem():this.expanded?e$`<div class="branch-item__row" full>
				<span class="branch-item__missing" full>Current work item</span>
				<gl-button
					class="associate-issue-action"
					appearance="toolbar"
					href=${ia("gitlens.associateIssueWithBranch",{command:"associateIssueWithBranch",branch:this.branch.reference,source:"home"})}
					tooltip="Associate Issue with Branch"
					aria-label="Associate Issue with Branch"
					><issue-icon></issue-icon>
				</gl-button>
			</div>`:eP}};ci.styles=[ic,a4,j`
			:host {
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
			}

			span.branch-item__missing {
				color: var(--vscode-descriptionForeground);
				font-style: italic;
			}

			gl-work-item {
				--gl-card-vertical-padding: 0.4rem;
			}

			.associate-issue-action {
				--button-padding: 0.2rem;
				--button-line-height: 1.2rem;
			}
		`],ci=cr([eM("gl-active-branch-card")],ci);var cn=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,ca=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cs(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cn(r,o,a),a};let cl=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return e$`<div class="progress-bar"></div>`}};cl.styles=j`
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
	`,ca([eD({reflect:!0})],cl.prototype,"mode",2),ca([eD({type:Boolean})],cl.prototype,"active",2),ca([eD()],cl.prototype,"position",2),cl=ca([eM("progress-indicator")],cl);var cc=Object.defineProperty,cd=Object.getOwnPropertyDescriptor,ch=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cd(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cc(r,o,a),a};let cp=class extends lit_element_i{constructor(){super(...arguments),this.loading=!1,this.headingLevel="3"}render(){return e$`
			<div class="section">
				<header class="section__header" part="header">
					<div
						class="section__heading"
						role="heading"
						aria-level=${(this.headingLevel?this.headingLevel:void 0)??eP}
					>
						<slot name="heading" class="section__headline"></slot>
					</div>
					<slot name="heading-actions" class="section__actions"></slot>
					<progress-indicator class="section__loader" ?active="${this.loading}"></progress-indicator>
				</header>
				<slot></slot>
			</div>
		`}};cp.styles=[j`
			.section {
				margin-bottom: 1.2rem;
			}
			.section__header {
				position: relative;
				display: flex;
				justify-content: space-between;
				gap: 8px;
				margin-block: 0 0.8rem;
			}
			.section__heading {
				min-width: 0;
				flex: 1;
				font-size: 1.3rem;
			}
			.section__headline {
				font-weight: normal;
				text-transform: uppercase;
			}

			.section__actions {
				margin-inline-start: auto;
			}

			.section__loader {
				position: absolute;
				left: 0;
				bottom: 0;
			}
		`],ch([eD({type:Boolean})],cp.prototype,"loading",2),ch([eD({attribute:"heading-level"})],cp.prototype,"headingLevel",2),cp=ch([eM("gl-section")],cp);let cu=class extends lit_element_i{constructor(){super(...arguments),this.isFetching=!1,this.onCardExpanded=t=>{let r=t.composedPath().find(t=>t.matches("gl-branch-card"));this.toggleSiblingCardsDebounced(r)},this.toggleSiblingCardsDebounced=tn(this.toggleSiblingCards.bind(this),100)}connectedCallback(){super.connectedCallback?.(),this.addEventListener("gl-branch-card-expand-toggled",this.onCardExpanded)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("gl-branch-card-expand-toggled",this.onCardExpanded)}toggleSiblingCards(t){t?.expanded===!0&&this.branchCards.forEach(r=>{r!==t&&(r.expanded=!1)})}renderSectionLabel(){return this.isFetching||0===this.branches.length?this.label:`${this.label} (${this.branches.length})`}render(){return e$`
			<gl-section ?loading=${this.isFetching}>
				<span slot="heading">${this.renderSectionLabel()}</span>
				<span slot="heading-actions"><slot name="heading-actions"></slot></span>
				${o1(this.branches.length>0,()=>this.branches.map(t=>e$`<gl-branch-card expandable .repo=${this.repo} .branch=${t}></gl-branch-card>`),()=>e$`<p>No ${this.label} branches</p>`)}
			</gl-section>
		`}};ch([eD({type:String})],cu.prototype,"label",2),ch([eD()],cu.prototype,"repo",2),ch([eD({type:Array})],cu.prototype,"branches",2),ch([eD({type:Boolean})],cu.prototype,"isFetching",2),ch([(r,o)=>eW(r,o,{get(){return(this.renderRoot??(t??=document.createDocumentFragment())).querySelectorAll("gl-branch-card")}})],cu.prototype,"branchCards",2),cu=ch([eM("gl-branch-section")],cu);var cg=Object.defineProperty,cb=Object.getOwnPropertyDescriptor,cm=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cb(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cg(r,o,a),a};let cf=class extends th(lit_element_i){connectedCallback(){super.connectedCallback?.();let t=this._launchpad.service;null!=t&&oK(this._launchpad,t)}get startWorkCommand(){return this._webview.createCommandLink("gitlens.startWork:")}get createBranchCommand(){return this._webview.createCommandLink("gitlens.createBranch:")}render(){return e$`
			<gl-section ?loading=${this._launchpad.launchpadLoading.get()}>
				<span slot="heading">Launchpad</span>
				<div class="summary">${this.renderSummaryResult()}</div>
				<button-container grouping="gap-wide">
					<gl-button full class="start-work" href=${this.startWorkCommand}>Start Work on an Issue</gl-button>
					<gl-button
						appearance="secondary"
						density="compact"
						class="start-work"
						href=${this.createBranchCommand}
						tooltip="Create New Branch"
						><code-icon icon="custom-start-work"></code-icon
					></gl-button>
				</button-container>
			</gl-section>
		`}renderSummaryResult(){if(!1===this._integrations.hasAnyIntegrationConnected.get())return e$`<ul class="menu">
				<li>
					<a
						class="launchpad-action"
						href="${ia("gitlens.plus.cloudIntegrations.connect",{source:{source:"home"}})}"
					>
						<code-icon class="launchpad-action__icon" icon="plug"></code-icon>
						<span>Connect to see PRs and Issue here</span>
					</a>
				</li>
			</ul>`;let t=this._launchpad.launchpadSummary.get();return null==t?this.renderPending():this.renderSummary(t)}renderPending(){return e$`
			<div class="loader">
				<skeleton-loader lines="1"></skeleton-loader>
				<skeleton-loader lines="1"></skeleton-loader>
			</div>
		`}renderSummary(t){if(null==t)return eP;if(!("total"in t))return e$`<ul class="menu">
				<li>Unable to load items</li>
			</ul>`;let r=[];if(null!=t.error&&r.push(e$`<li>
					<span class="launchpad-action">
						<code-icon class="launchpad-action__icon" icon="warning"></code-icon>
						<span>Some integrations failed to load</span>
					</span>
				</li>`),0===t.total)return r.push(e$`<li>You are all caught up!</li>`),e$`<ul class="menu">
				${r}
			</ul>`;if(!t.hasGroupedItems)return r.push(e$`<li>No pull requests need your attention</li>
					<li>(${t.total} other pull requests)</li>`),e$`<ul class="menu">
				${r}
			</ul>`;for(let o of t.groups){let i;switch(o){case"mergeable":{if(0===(i=t.mergeable?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"mergeable"}}))}`;r.push(e$`<li>
							<a href=${o} class="launchpad-action launchpad-action--mergable">
								<code-icon class="launchpad-action__icon" icon="rocket"></code-icon>
								<span>${tQ("pull request",i)} can be merged</span>
							</a>
						</li>`);break}case"blocked":{if(0===(i=t.blocked?.total??0))continue;let o=[];t.blocked.unassignedReviewers&&o.push({count:t.blocked.unassignedReviewers,message:`${t.blocked.unassignedReviewers>1?"need":"needs"} reviewers`}),t.blocked.failedChecks&&o.push({count:t.blocked.failedChecks,message:`${t.blocked.failedChecks>1?"have":"has"} failed CI checks`}),t.blocked.conflicts&&o.push({count:t.blocked.conflicts,message:`${t.blocked.conflicts>1?"have":"has"} conflicts`});let n=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"blocked"}}))}`;1===o.length?r.push(e$`<li>
								<a href=${n} class="launchpad-action launchpad-action--blocked">
									<code-icon class="launchpad-action__icon" icon="error"></code-icon>
									<span>${tQ("pull request",i)} ${o[0].message}</span>
								</a>
							</li>`):r.push(e$`<li>
								<a href=${n} class="launchpad-action launchpad-action--blocked">
									<code-icon class="launchpad-action__icon" icon="error"></code-icon>
									<span
										>${tQ("pull request",i)} ${i>1?"are":"is"} blocked
										(${o.map(t=>`${t.count} ${t.message}`).join(", ")})</span
									>
								</a>
							</li>`);break}case"follow-up":{if(0===(i=t.followUp?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"follow-up"}}))}`;r.push(e$`<li>
							<a href=${o} class="launchpad-action launchpad-action--attention">
								<code-icon class="launchpad-action__icon" icon="report"></code-icon>
								<span
									>${tQ("pull request",i)} ${i>1?"require":"requires"}
									follow-up</span
								>
							</a>
						</li>`);break}case"needs-review":{if(0===(i=t.needsReview?.total??0))continue;let o=`command:gitlens.showLaunchpad?${encodeURIComponent(JSON.stringify({source:"home",state:{initialGroup:"needs-review"}}))}`;r.push(e$`<li>
							<a href=${o} class="launchpad-action launchpad-action--attention">
								<code-icon class="launchpad-action__icon" icon="comment-unresolved"></code-icon>
								<span
									>${tQ("pull request",i)} ${i>1?"need":"needs"} your
									review</span
								>
							</a>
						</li>`)}}}return e$`<menu class="menu">${r}</menu>`}};cf.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},cf.styles=[ic,j`
			:host {
				display: block;
				margin-bottom: 2.4rem;
				color: var(--vscode-foreground);
			}
			.summary {
				margin-bottom: 1rem;
			}

			.menu {
				list-style: none;
				padding-inline-start: 0;
				margin-block-start: 0;
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			}

			.launchpad-action {
				display: flex;
				align-items: center;
				gap: 0.6rem;
				color: inherit;
				text-decoration: none;
			}
			.launchpad-action:hover {
				text-decoration: none;
			}

			.launchpad-action:hover:not(span) span {
				text-decoration: underline;
			}

			.launchpad-action__icon {
				color: var(--gl-launchpad-action-color, inherit);
			}

			.launchpad-action:hover .launchpad-action__icon {
				color: var(--gl-launchpad-action-hover-color, inherit);
			}

			.launchpad-action--mergable {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorMergeableColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorMergeableHoverColor);
			}

			.launchpad-action--blocked {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorBlockedColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorBlockedHoverColor);
			}

			.launchpad-action--attention {
				--gl-launchpad-action-color: var(--vscode-gitlens-launchpadIndicatorAttentionColor);
				--gl-launchpad-action-hover-color: var(--vscode-gitlens-launchpadIndicatorAttentionHoverColor);
			}

			.loader {
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			}
		`],cm([A({context:"launchpad"})],cf.prototype,"_launchpad",2),cm([A({context:"integrations"})],cf.prototype,"_integrations",2),cm([A({context:"webview"})],cf.prototype,"_webview",2),cf=cm([eM("gl-launchpad")],cf);let cv=(t,r,o)=>{let i=new Map;for(let n=r;n<=o;n++)i.set(t[n],n);return i},cy=tp(class extends directive_i{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,r,o){let i;void 0===o?o=r:void 0!==r&&(i=r);let n=[],a=[],c=0;for(let r of t)n[c]=i?i(r,c):c,a[c]=o(r,c),c++;return{values:a,keys:n}}render(t,r,o){return this.dt(t,r,o).values}update(t,[r,o,i]){let n=t._$AH,{values:a,keys:c}=this.dt(r,o,i);if(!Array.isArray(n))return this.ut=c,a;let h=this.ut??=[],p=[],u,g,b=0,m=n.length-1,f=0,v=a.length-1;for(;b<=m&&f<=v;)if(null===n[b])b++;else if(null===n[m])m--;else if(h[b]===c[f])p[f]=tm(n[b],a[f]),b++,f++;else if(h[m]===c[v])p[v]=tm(n[m],a[v]),m--,v--;else if(h[b]===c[v])p[v]=tm(n[b],a[v]),tb(t,p[v+1],n[b]),b++,v--;else if(h[m]===c[f])p[f]=tm(n[m],a[f]),tb(t,n[b],n[m]),m--,f++;else if(void 0===u&&(u=cv(c,f,v),g=cv(h,b,m)),u.has(h[b]))if(u.has(h[m])){let r=g.get(c[f]),o=void 0!==r?n[r]:null;if(null===o){let r=tb(t,n[b]);tm(r,a[f]),p[f]=r}else p[f]=tm(o,a[f]),tb(t,n[b],o),n[r]=null;f++}else tv(n[m]),m--;else tv(n[b]),b++;for(;f<=v;){let r=tb(t,p[v+1]);tm(r,a[f]),p[f++]=r}for(;b<=m;){let t=n[b++];null!==t&&tv(t)}return this.ut=c,((t,r=tf)=>t._$AH=r)(t,p),eS}}),cw=j`
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
`;var c_=Object.defineProperty,ck=Object.getOwnPropertyDescriptor,cx=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?ck(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&c_(r,o,a),a};let c$=class extends GlElement{constructor(){super(),this.disabled=!1,this.value="",this._defaultChecked=!1,this.checked=!1,this._defaultChecked=this.checked}get defaultChecked(){return this._defaultChecked}handleChange(t){this.checked=t.target.checked;let r=new CustomEvent("gl-change-value");this.dispatchEvent(r)}renderCheck(){if(this.checked)return e$` <code-icon icon="check"></code-icon> `}render(){return e$`<label ?aria-disabled=${this.disabled}
			><input
				class="input"
				.disabled=${this.disabled}
				type="checkbox"
				.checked=${this.checked}
				@change=${this.handleChange}
			/>
			<div class="control">${this.renderCheck()}</div>
			<slot class="label-text"></slot>
		</label>`}};c$.shadowRootOptions={...GlElement.shadowRootOptions,delegatesFocus:!0},c$.styles=[cw],cx([eD({type:Boolean,reflect:!0})],c$.prototype,"disabled",2),cx([eD({type:String})],c$.prototype,"value",2),cx([eD({type:Boolean})],c$.prototype,"defaultChecked",1),cx([eD({type:Boolean,reflect:!0})],c$.prototype,"checked",2),c$=cx([eM("gl-checkbox")],c$);var cC=Object.defineProperty,cS=Object.getOwnPropertyDescriptor,cP=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cS(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cC(r,o,a),a};let cO=j`
	.select {
		background: none;
		outline: none;
		border: none;
		text-decoration: none !important;
		font-weight: 500;
		color: var(--color-foreground--25);
	}
	.select option {
		color: var(--vscode-foreground);
		background-color: var(--vscode-dropdown-background);
	}
	.select:not(:disabled) {
		cursor: pointer;
		color: var(--color-foreground--50);
	}
	.select:not(:disabled):focus {
		outline: 1px solid var(--color-focus-border);
	}
	.select:not(:disabled):hover {
		color: var(--vscode-foreground);
		text-decoration: underline !important;
	}
`;let GlObjectSelect=class GlObjectSelect extends GlElement{constructor(){super(...arguments),this.disabled=!1}static{this.styles=[cO]}render(){if(this.options)return e$`
			<select .disabled=${this.disabled} class="select" @change=${t=>this.onChange?.(t)}>
				${cy(this.options,t=>{let r=this.getValue(t),o=this.getLabel(t);return e$`<option .value="${r}" ?selected=${this.value===r}>${o}</option>`})}
			</select>
		`}};cP([eD({type:Boolean})],GlObjectSelect.prototype,"disabled",2),cP([eD({type:String})],GlObjectSelect.prototype,"value",2),cP([eD({type:Array})],GlObjectSelect.prototype,"options",2);let cA=class extends GlObjectSelect{getValue(t){return t.value}getLabel(t){return t.label}onChange(t){let r=new CustomEvent("gl-change",{detail:{threshold:t.target.value}});this.dispatchEvent(r)}};cA=cP([eM("gl-branch-threshold-filter")],cA);var cR=Object.defineProperty,cE=Object.getOwnPropertyDescriptor,cI=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cE(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cR(r,o,a),a};let cB=class extends th(lit_element_i){constructor(){super(...arguments),this.onChangeRecentThresholdFilter=t=>{this._inactiveOverviewState.filter.stale&&this._inactiveOverviewState.filter.recent&&this._homeCtx.homeService?.setOverviewFilter({stale:this._inactiveOverviewState.filter.stale,recent:{...this._inactiveOverviewState.filter.recent,threshold:t.detail.threshold}})}}connectedCallback(){super.connectedCallback?.(),this._homeCtx.repositories.get().openCount>0&&this._inactiveOverviewState.fetch()}render(){if(this._homeCtx.discovering.get())return this.renderLoader();if(0===this._homeCtx.repositories.get().openCount)return eP;if(null!=this._inactiveOverviewState.error.get())return e$`
				<gl-section>
					<span slot="heading">Recent</span>
					<span
						>Unable to load branch data.
						<a
							href="#"
							@click=${t=>{t.preventDefault(),this._inactiveOverviewState.fetch()}}
							>Retry</a
						>
					</span>
				</gl-section>
			`;let t=this._inactiveOverviewState.value.get();return null==t?this.renderLoader():this.renderComplete(t,this._inactiveOverviewState.loading.get())}renderLoader(){return e$`
			<gl-section>
				<skeleton-loader slot="heading" lines="1"></skeleton-loader>
				<skeleton-loader lines="3"></skeleton-loader>
			</gl-section>
		`}renderComplete(t,r=!1){if(null==t)return eP;let{repository:o}=t;return e$`
			<gl-branch-section
				label="recent"
				.isFetching=${r}
				.repo=${o.path}
				.branches=${t.recent}
			>
				<gl-branch-threshold-filter
					slot="heading-actions"
					@gl-change=${this.onChangeRecentThresholdFilter}
					.options=${[{value:"OneDay",label:"1 day"},{value:"OneWeek",label:"1 week"},{value:"OneMonth",label:"1 month"}]}
					.disabled=${r}
					.value=${this._inactiveOverviewState.filter.recent?.threshold}
				></gl-branch-threshold-filter>
			</gl-branch-section>
			${o1(this._inactiveOverviewState.filter.stale?.show===!0&&t.stale,()=>e$`
					<gl-branch-section
						label="stale"
						.repo=${o.path}
						.branches=${t.stale}
					></gl-branch-section>
				`)}
		`}};cB.styles=[ic,j`
			:host {
				display: block;
				margin-bottom: 2.4rem;
				color: var(--vscode-foreground);
			}
		`],cI([A({context:"homeState"})],cB.prototype,"_homeCtx",2),cI([A({context:"inactiveOverviewState"})],cB.prototype,"_inactiveOverviewState",2),cB=cI([eM("gl-overview")],cB);var cL=Object.defineProperty,cT=Object.getOwnPropertyDescriptor,cM=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cT(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cL(r,o,a),a};let cz=class extends th(lit_element_i){get hasAlerts(){return!0===this.alertVisibility.header||void 0}get alertVisibility(){let t={header:!1,untrusted:!1,noRepo:!1,unsafeRepo:!1};if(this._homeCtx.discovering.get())return t;let r=this._homeCtx.repositories.get();return r.trusted?0===r.openCount?(t.header=!0,t.noRepo=!0):r.hasUnsafe&&(t.header=!0,t.unsafeRepo=!0):(t.header=!0,t.untrusted=!0),t}render(){return this._homeCtx.ready.get()?this.alertVisibility.header?e$`
			${o1(this.alertVisibility.noRepo,()=>e$`
					<div id="no-repo-alert" class="alert alert--info mb-0">
						<h1 class="alert__title">No repository detected</h1>
						<div class="alert__description">
							<p>
								To use GitLens, open a folder containing a git repository or clone from a URL from the
								Explorer.
							</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.view.scm"
									>Open a Folder or Repository</gl-button
								>
							</p>
							<p class="mb-0">
								If you have opened a folder with a repository, please let us know by
								<a class="one-line" href="https://github.com/gitkraken/vscode-gitlens/issues/new/choose"
									>creating an Issue</a
								>.
							</p>
						</div>
					</div>
				`)}
			${o1(this.alertVisibility.unsafeRepo,()=>e$`
					<div id="unsafe-repo-alert" class="alert alert--info mb-0">
						<h1 class="alert__title">Unsafe repository</h1>
						<div class="alert__description">
							<p>
								Unable to open any repositories as Git blocked them as potentially unsafe, due to the
								folder(s) not being owned by the current user.
							</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.view.scm"
									>Manage in Source Control</gl-button
								>
							</p>
						</div>
					</div>
				`)}
			${o1(this.alertVisibility.untrusted,()=>e$`
					<div id="untrusted-alert" class="alert alert--info mb-0" aria-hidden="true">
						<h1 class="alert__title">Untrusted workspace</h1>
						<div class="alert__description">
							<p>Unable to open repositories in Restricted Mode.</p>
							<p class="centered">
								<gl-button class="is-basic" href="command:workbench.trust.manage"
									>Manage Workspace Trust</gl-button
								>
							</p>
						</div>
					</div>
				`)}
		`:void 0:eP}};cz.styles=[o_,oJ,oX,j`
			.alert {
				margin-bottom: 0;
			}

			.centered {
				text-align: center;
			}

			.one-line {
				white-space: nowrap;
			}

			gl-button.is-basic {
				max-width: 300px;
				width: 100%;
			}
			gl-button.is-basic + gl-button.is-basic {
				margin-top: 1rem;
			}
		`],cM([A({context:"homeState"})],cz.prototype,"_homeCtx",2),cM([eD({type:Boolean,reflect:!0,attribute:"has-alerts"})],cz.prototype,"hasAlerts",1),cz=cM([eM("gl-repo-alerts")],cz);let cD=j`
	:host {
		/* Banner color custom properties */
		--gl-banner-primary-background: var(--vscode-sideBar-background);
		--gl-banner-secondary-background: var(--vscode-editor-background);
		--gl-banner-primary-emphasis-background: var(--vscode-button-background);
		--gl-banner-secondary-emphasis-background: var(--vscode-button-secondaryBackground);
		--gl-banner-text-color: var(--vscode-foreground);
		--gl-banner-dim-text-color: var(--vscode-descriptionForeground);
		--gl-banner-transparency: 0.5;

		/* Layout properties */
		--gl-banner-padding: 1.2rem;
		--gl-banner-gap: 0.8rem;
		--gl-banner-border-radius: 0.4rem;

		/* Button customization - use 8px horizontal padding, keep original vertical padding */
		--gl-banner-button-padding: 0.4rem 0.8rem;

		display: block;
		margin-block-end: 1.2rem;
	}

	.banner {
		display: flex;
		flex-direction: column;
		padding: var(--gl-banner-padding);
		border-radius: var(--gl-banner-border-radius);
		position: relative;
		overflow: hidden;
		container-type: inline-size;
	}

	/* Solid display mode - same as card background */
	.banner--solid {
		background-color: var(--gl-banner-primary-background);
		border: 1px solid color-mix(in lab, var(--gl-banner-primary-background) 100%, var(--vscode-foreground) 12%);
	}

	/* Outline display mode - emphasis color outline with secondary background */
	.banner--outline {
		background-color: var(--gl-banner-secondary-background);
		border: 2px solid var(--gl-banner-primary-emphasis-background);
	}

	/* Gradient display mode - horizontal gradient from primary to secondary emphasis */
	.banner--gradient {
		background: linear-gradient(
			to right,
			var(--gl-banner-primary-emphasis-background) 0%,
			var(--gl-banner-secondary-emphasis-background) 100%
		);
		border: 1px solid
			color-mix(
				in lab,
				var(--gl-banner-primary-emphasis-background) 50%,
				var(--gl-banner-secondary-emphasis-background) 50%
			);
	}

	/* Gradient transparent display mode - same gradient but with transparency */
	.banner--gradient-transparent {
		background: linear-gradient(
			to right,
			color-mix(
					in lab,
					var(--gl-banner-primary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				0%,
			color-mix(
					in lab,
					var(--gl-banner-secondary-emphasis-background) calc(100% * (1 - var(--gl-banner-transparency))),
					transparent
				)
				100%
		);
		border: 1px solid
			color-mix(
				in lab,
				color-mix(
						in lab,
						var(--gl-banner-primary-emphasis-background) 50%,
						var(--gl-banner-secondary-emphasis-background) 50%
					)
					calc(100% * (1 - var(--gl-banner-transparency))),
				transparent
			);
	}

	/* Gradient purple display mode - matches the auto-composer container styling */
	.banner--gradient-purple {
		border: 1px solid var(--vscode-panel-border);
		border-radius: 6px;
		background: linear-gradient(135deg, #a100ff1a 0%, #255ed11a 100%);
	}

	.banner--gradient-purple .banner__title {
		font-size: 1.3rem;
		color: var(--vscode-foreground);
		font-weight: normal;
	}

	.banner--gradient-purple .banner__body {
		font-size: 1.2rem;
		color: var(--vscode-descriptionForeground);
		line-height: 1.4;
	}

	.banner--gradient-purple .banner__body a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}

	.banner--gradient-purple .banner__body a:hover {
		color: var(--vscode-textLink-activeForeground);
		text-decoration: underline;
	}

	.banner__content {
		display: flex;
		flex-direction: column;
		gap: var(--gl-banner-gap);
		align-items: center;
		text-align: center;
	}

	/* Responsive layout */
	.banner--responsive .banner__content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-align: left;
		gap: var(--gl-banner-gap);
	}

	.banner--responsive .banner__text {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.banner--responsive .banner__title,
	.banner--responsive .banner__body {
		text-align: left;
	}

	/* < 500px: Stack vertically with full-width buttons */
	.banner--responsive .banner__buttons {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-top: 0.8rem;
		width: 100%;
	}

	.banner--responsive .banner__button {
		grid-column: unset;
		justify-self: unset;
		width: 100% !important;
		min-width: 100% !important;
		max-width: 100% !important;
		justify-content: center;
		flex: 1;
	}

	/* >= 500px: Three-group horizontal layout */
	@container (min-width: 500px) {
		.banner--responsive .banner__content {
			flex-direction: row;
			align-items: center;
			gap: 1.6rem;
		}

		/* Group 1: Text content (left-aligned) */
		.banner--responsive .banner__text {
			flex: 1;
			min-width: 0;
			align-self: center;
		}

		/* Group 2: Buttons (content-sized) */
		.banner--responsive .banner__buttons {
			display: flex;
			flex-direction: column;
			gap: 0.8rem;
			margin-top: 0;
			width: auto;
			flex-shrink: 0;
			align-self: center;
		}

		.banner--responsive .banner__button {
			width: auto;
			white-space: nowrap;
		}

		/* Group 3: Dismiss button (to the right of buttons) */
		.banner--responsive .banner__dismiss {
			position: static !important;
			top: auto !important;
			right: auto !important;
			align-self: center;
			flex-shrink: 0;
		}
	}

	.banner__title {
		font-size: 1.2em;
		font-weight: bold;
		color: var(--gl-banner-text-color);
		margin: 0;
		text-wrap: pretty;
	}

	.banner__body {
		font-size: 1em;
		color: var(--gl-banner-text-color);
		margin: 0;
		line-height: 1.4;
		text-wrap: pretty;
	}

	.banner__buttons {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0.8rem;
		margin-top: 0.8rem;
		align-items: center;
		width: 100%;
	}

	.banner:not(.banner--gradient-purple) .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-foreground: var(--gl-banner-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner--gradient-purple .banner__button--primary {
		grid-column: 2;
		justify-self: center;
		white-space: nowrap;
		--button-padding: var(--gl-banner-button-padding);
	}

	.banner__button--secondary {
		grid-column: 3;
		justify-self: end;
		white-space: nowrap;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 10%, transparent);
	}

	/* When only primary button exists, center it across the full width */
	.banner__buttons:has(.banner__button--primary):not(:has(.banner__button--secondary)) .banner__button--primary {
		grid-column: 1 / -1;
		justify-self: center;
	}

	/* Dismiss button */
	.banner__dismiss {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		--button-background: transparent;
		--button-foreground: var(--gl-banner-dim-text-color);
		--button-hover-background: color-mix(in lab, var(--gl-banner-dim-text-color) 15%, transparent);
		--button-padding: 0.4rem;
		z-index: 1;
	}

	/* Responsive layout dismiss button */
	.banner--responsive .banner__dismiss {
		/* < 500px: Upper right corner (default positioning) */
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
	}

	/* Theme-specific adjustments */

	/* Light theme: Brighten gradient colors for better contrast with dark text */
	:host-context(.vscode-light),
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-primary-emphasis-background: color-mix(in lab, var(--vscode-button-background) 40%, #fff 60%);
		--gl-banner-secondary-emphasis-background: color-mix(
			in lab,
			var(--vscode-button-secondaryBackground) 40%,
			#fff 60%
		);
	}

	/* Override text color for high contrast light theme specifically */
	:host-context(.vscode-high-contrast-light) {
		--gl-banner-text-color: #000;
	}

	:host-context(.vscode-dark) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light))
		.banner:not(.banner--gradient-purple)
		.banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 10%, #fff 20%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 20%, #fff 30%);
		--button-foreground: #fff;
	}

	:host-context(.vscode-light) .banner:not(.banner--gradient-purple) .banner__button--primary,
	:host-context(.vscode-high-contrast-light) .banner:not(.banner--gradient-purple) .banner__button--primary {
		--button-background: color-mix(in lab, var(--gl-banner-primary-background) 8%, #fff 25%);
		--button-hover-background: color-mix(in lab, var(--gl-banner-primary-background) 15%, #fff 35%);
		--button-foreground: #000;
	}

	/* Make banner text darker in light themes */
	:host-context(.vscode-light) .banner__body,
	:host-context(.vscode-high-contrast-light) .banner__body {
		color: color-mix(in lab, var(--gl-banner-text-color) 20%, #000 80%);
	}

	/* Strong colors for banner title - pure black/white for maximum contrast */
	:host-context(.vscode-light) .banner__title,
	:host-context(.vscode-high-contrast-light) .banner__title {
		color: #000 !important;
	}

	:host-context(.vscode-dark) .banner__title,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .banner__title {
		color: #fff !important;
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.banner__buttons {
			flex-direction: column;
			width: 100%;
		}

		.banner__button {
			width: 100%;
		}
	}

	/* More aggressive responsive layout for narrow sidebars */
	@media (max-width: 400px) {
		.banner__buttons {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			margin-top: 0.8rem;
			align-items: center;
			width: 100%;
		}

		.banner__button--primary,
		.banner__button--secondary {
			grid-column: unset;
			justify-self: unset;
			width: 100%;
			max-width: 200px;
		}

		.banner__button--primary {
			order: 1;
		}

		.banner__button--secondary {
			order: 2;
		}
	}

	/* Support for custom banner buttons layout */
	:host([data-banner-buttons-layout='column']) .banner__buttons,
	.banner__buttons[data-layout='column'] {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-top: 0.8rem;
		align-items: center;
		width: 100%;
	}

	:host([data-banner-buttons-layout='column']) .banner__button--primary,
	:host([data-banner-buttons-layout='column']) .banner__button--secondary,
	.banner__buttons[data-layout='column'] .banner__button--primary,
	.banner__buttons[data-layout='column'] .banner__button--secondary {
		grid-column: unset;
		justify-self: unset;
		width: 100%;
		max-width: 200px;
	}
`;var cj=Object.defineProperty,cW=Object.getOwnPropertyDescriptor,cN=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cW(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cj(r,o,a),a};let cF=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return e$`<div part="base" class=${nN(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return e$`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return e$`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return e$`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return e$`<div class="banner__body">${iA(this.body)}</div>`}renderButtons(){let t=this.renderPrimaryButton(),r=this.renderSecondaryButton();if(t||r)return e$`<div class="banner__buttons">${t} ${r}</div>`}renderPrimaryButton(){if(this.primaryButton)return e$`
			<gl-button
				class="banner__button banner__button--primary"
				appearance=${"gradient-purple"===this.display?"secondary":void 0}
				?full=${"gradient-purple"===this.display}
				href=${this.primaryButtonHref??eP}
				truncate
				@click=${this.onPrimaryButtonClick}
			>
				${this.primaryButton}
			</gl-button>
		`}renderSecondaryButton(){if(this.secondaryButton)return e$`
			<gl-button
				class="banner__button banner__button--secondary"
				appearance="toolbar"
				href=${this.secondaryButtonHref??eP}
				@click=${this.onSecondaryButtonClick}
			>
				${this.secondaryButton}
			</gl-button>
		`}renderDismissButton(){if(this.dismissible)return e$`
			<gl-button
				class="banner__dismiss"
				appearance="toolbar"
				href=${this.dismissHref??eP}
				aria-label="Dismiss"
				tooltip="Dismiss"
				@click=${this.onDismissClick}
			>
				<code-icon icon="close"></code-icon>
			</gl-button>
		`}onPrimaryButtonClick(t){this.primaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(t){this.secondaryButtonCommand&&t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};cF.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},cF.styles=[cD],cN([eD({reflect:!0})],cF.prototype,"display",2),cN([eD({attribute:"banner-title"})],cF.prototype,"bannerTitle",2),cN([eD()],cF.prototype,"body",2),cN([eD({attribute:"primary-button"})],cF.prototype,"primaryButton",2),cN([eD({attribute:"primary-button-href"})],cF.prototype,"primaryButtonHref",2),cN([eD({attribute:"primary-button-command"})],cF.prototype,"primaryButtonCommand",2),cN([eD({attribute:"secondary-button"})],cF.prototype,"secondaryButton",2),cN([eD({attribute:"secondary-button-href"})],cF.prototype,"secondaryButtonHref",2),cN([eD({attribute:"secondary-button-command"})],cF.prototype,"secondaryButtonCommand",2),cN([eD({type:Boolean,attribute:"dismissible"})],cF.prototype,"dismissible",2),cN([eD({attribute:"dismiss-href"})],cF.prototype,"dismissHref",2),cN([eD({attribute:"layout"})],cF.prototype,"layout",2),cF=cN([eM("gl-banner")],cF);var cU=Object.defineProperty,cq=Object.getOwnPropertyDescriptor,cH=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cq(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cU(r,o,a),a};let cG=class extends th(lit_element_i){render(){let t=this.error.get();return t?e$`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${t}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:eP}};cH([eD({attribute:!1})],cG.prototype,"error",2),cG=cH([eM("gl-error-banner")],cG);var cV=Object.defineProperty,cK=Object.getOwnPropertyDescriptor,cY=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cK(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cV(r,o,a),a};let cJ=class extends lit_element_i{constructor(){super(...arguments),this.source="unknown",this.layout="default",this.collapsed=!1,this.canAutoRegister=!1,this.showCleanupNotice=!1}render(){if(this.collapsed)return eP;if(this.canAutoRegister){let t=this.showCleanupNotice?" &mdash; <strong>Note:</strong> You may have a duplicate entry in your Cursor <code>mcp.json</code>. Remove <code>mcpServers.GitKraken</code> to clean it up.":"",r=`GitKraken MCP is active in your AI chat, leveraging Git and your integrations to provide context and perform actions. <a href="${o4.helpCenterMCP}">Learn more</a>${t}`;return e$`
				<gl-banner
					exportparts="base"
					display="gradient-purple"
					layout="${this.layout}"
					banner-title="GitKraken MCP Bundled with GitLens"
					body="${r}"
					primary-button="Connect More Agents"
					primary-button-href="${ia("gitlens.ai.mcp.selectAgents",{source:this.source})}"
					dismissible
					dismiss-href="${ia("gitlens.onboarding.dismiss",{id:"mcp:banner"})}"
				></gl-banner>
			`}let t=`Leverage Git and your integrations (issues, PRs, etc) to provide context and perform actions in AI chat. <a href="${o4.helpCenterMCP}">Learn more</a>`;return e$`
			<gl-banner
				exportparts="base"
				display="gradient-purple"
				layout="${this.layout}"
				banner-title="Install GitKraken MCP for GitLens"
				body="${t}"
				primary-button="Install GitKraken MCP"
				primary-button-href="${ia("gitlens.ai.mcp.install",{source:this.source})}"
				dismissible
				dismiss-href="${ia("gitlens.onboarding.dismiss",{id:"mcp:banner"})}"
			></gl-banner>
		`}};cJ.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},cJ.styles=[j`
			:host {
				display: block;
			}

			gl-banner {
				margin-bottom: 1.2rem;
			}

			:host([layout='responsive']) gl-banner {
				margin-bottom: 0;
				width: 100%;
			}
		`],cY([eD()],cJ.prototype,"source",2),cY([eD()],cJ.prototype,"layout",2),cY([eD({type:Boolean})],cJ.prototype,"collapsed",2),cY([eD({type:Boolean})],cJ.prototype,"canAutoRegister",2),cY([eD({type:Boolean,attribute:"show-cleanup-notice"})],cJ.prototype,"showCleanupNotice",2),cJ=cY([eM("gl-mcp-banner")],cJ);var cZ=Object.defineProperty,cX=Object.getOwnPropertyDescriptor,cQ=(t,r,o,i)=>{for(var n,a=i>1?void 0:i?cX(r,o):r,c=t.length-1;c>=0;c--)(n=t[c])&&(a=(i?n(r,o,a):n(a))||a);return i&&a&&cZ(r,o,a),a};let c0=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=u??=oO(),this._homeState=function(t){let{signal:r,persisted:o,resetAll:i,startAutoPersist:n,dispose:a}=function(t){let r,o=t?.storage,i=t?.version,n=t?.restoreKey;function a(){if(null==o)return;let r=o.get();if(null==r)return;let a=r.__v,c=r[o$];if(null==n||c===n)return null!=i&&a!==i&&(r=t?.migrate?.(r,a)??void 0),r}let c=a(),h=[],p=[],u=!1;function g(){if(u=!1,r?.getPending(),r?.watch(),null==o||0===p.length)return;let t={};for(let r of(null!=i&&(t.__v=i),null!=n&&(t[o$]=n),t[oC]=Date.now(),p))t[r.key]=r.serialize(r.signal.get());o.set(t)}function b(t){if(null!=t){for(let o of(r===t&&u&&g(),p))t.unwatch(o.signal);r===t&&(r=void 0)}}return{signal:function(t){let r=tA(t);return h.push(()=>r.set(t)),r},persisted:function(t,o,i){if(oS.has(t))throw Error(`Cannot use reserved key '${t}' for persisted signal`);let n=i?.deserialize,a=i?.serialize??(t=>t),h=r=>{if(null==r||!(t in r))return o;let i=r[t];if(null!=n){let t=n(i);return void 0!==t?t:o}return i},u=tA(h(c));return p.push({key:t,signal:u,serialize:a,reset:t=>{u.set(h(t))}}),null!=r&&r.watch(u),u},resetAll:function(){for(let t of h)t();let t=a();for(let r of p)r.reset(t)},startAutoPersist:function(){if(null==o)return()=>{};b(r);let t=new x.subtle.Watcher(()=>{u||(u=!0,queueMicrotask(g))});for(let o of(r=t,p))t.watch(o.signal);return()=>{b(t)}},dispose:function(){b(r),h.length=0,p.length=0}}}({storage:t,version:1});return{loading:r(!1),error:r(void 0),repositories:r({count:0,openCount:0,hasUnsafe:!1,trusted:!0}),discovering:r(!1),ready:r(!1),overviewRepositoryPath:o("overviewRepositoryPath",void 0),overviewFilter:o("overviewFilter",o0),walkthroughSupported:r(!1),newInstall:r(!1),hostAppName:r(""),homeService:void 0,resetAll:i,startAutoPersist:n,dispose:a}}(this._host.storage),this._integrationsState=function(){let{signal:t,resetAll:r}=ox();return{integrations:t([]),hasAnyIntegrationConnected:t(!1),resetAll:r}}(),this._aiState=function(){let{signal:t,resetAll:r}=ox();return{model:t(void 0),state:t({enabled:!1,orgEnabled:!0,mcp:{settingEnabled:!1,installed:!1,bundled:!1}}),resetAll:r}}(),this._onboardingState=function(){let{signal:t,resetAll:r}=ox();return{banners:new SignalObjectImpl({integrationBanner:!1,mcpBanner:!1}),walkthroughProgress:t(void 0),dismiss:oP,dismissWalkthrough:oP,resetAll:r}}(),this._launchpadState=function(){let{signal:t,resetAll:r}=ox();return{launchpadSummary:t(void 0),launchpadLoading:t(!1),service:void 0,resetAll:r}}(),this._commandsState={service:void 0},this._rpc=new RpcController(this,{rpcOptions:{endpoint:()=>this._host.createEndpoint()},onReady:t=>this._onRpcReady(t),onError:t=>this._homeState.error.set(t.message)}),this._refreshOverviewDebounced=tn(()=>{this._activeResource?.fetch(),this._inactiveResource?.fetch()},500),this.isLightTheme=!1}get _rootState(){return{home:this._homeState,integrations:this._integrationsState,ai:this._aiState,onboarding:this._onboardingState,launchpad:this._launchpadState,commands:this._commandsState}}connectedCallback(){super.connectedCallback?.();let t=this.context;this.context=void 0,this.initWebviewContext(t),this._subscriptionCtx=new context_provider_i(this,{context:"subscription",initialValue:{subscription:tA(void 0),orgSettings:tA({ai:!1,drafts:!1}),avatar:tA(void 0),hasAccount:tA(!1),organizationsCount:tA(0)}}),this._homeStateCtx=new context_provider_i(this,{context:"homeState",initialValue:this._homeState}),new context_provider_i(this,{context:"integrations",initialValue:this._integrationsState}),new context_provider_i(this,{context:"ai",initialValue:this._aiState}),new context_provider_i(this,{context:"onboarding",initialValue:this._onboardingState}),new context_provider_i(this,{context:"commands",initialValue:this._commandsState}),new context_provider_i(this,{context:"launchpad",initialValue:this._launchpadState}),this._activeOverviewCtxProvider=new context_provider_i(this,{context:"activeOverviewState"}),this._inactiveOverviewCtxProvider=new context_provider_i(this,{context:"inactiveOverviewState"})}disconnectedCallback(){this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._refreshOverviewDebounced.cancel(),this._activeResource?.dispose(),this._inactiveResource?.dispose(),this._activeResource=void 0,this._inactiveResource=void 0,this._inactiveFilter=void 0,this._homeState.resetAll(),this._integrationsState.resetAll(),this._aiState.resetAll(),this._onboardingState.resetAll(),this._launchpadState.resetAll(),this._commandsState.service=void 0,super.disconnectedCallback?.()}onThemeUpdated(t){this.isLightTheme=t.isLightTheme}async _onRpcReady(t){var r,o;let i=this._rootState,[n,a,c,h,p,u,g,b,m,f]=await Promise.all([t.home,t.launchpad,t.config,t.subscription,t.integrations,t.repositories,t.repository,t.ai,t.commands,t.onboarding]),[v,w,_,x,$]=await Promise.all([h.subscriptionState,h.orgSettingsState,h.avatarState,h.hasAccountState,h.organizationsCountState]);this._subscriptionCtx?.setValue({subscription:v,orgSettings:w,avatar:_,hasAccount:x,organizationsCount:$},!0),this._stopAutoPersist=this._homeState.startAutoPersist(),await oV(this._homeState,n);let C=t=>{null!=t&&this._homeState.overviewRepositoryPath.set(t)},S=t=>{null!=this._inactiveFilter&&(this._inactiveFilter.recent=t.recent,this._inactiveFilter.stale=t.stale)},P=oq(async t=>{let r=await n.getOverviewBranches("active",t);if(null==r)return;C(r.repository.path);let o=r.active.map(t=>t.id),i=n.getOverviewWip(o,t),a=n.getOverviewEnrichment(o,t);return{repository:r.repository,active:r.active.map(t=>c1(t,i,a))}}),O=oq(async t=>{let r=await n.getOverviewBranches("inactive",t);if(null==r)return;C(r.repository.path);let o=[...r.recent,...r.stale??[]],i=o.map(t=>t.id),a=o.filter(t=>null!=t.worktree).map(t=>t.id),c=Promise.resolve({}),h=a.length>0?n.getOverviewWip(a,t):c,p=n.getOverviewEnrichment(i,t);return{repository:r.repository,recent:r.recent.map(t=>c1(t,h,p)),stale:r.stale?.map(t=>c1(t,h,p))}}),A=new SignalObjectImpl({});this._activeResource=P,this._inactiveResource=O,this._inactiveFilter=A,this._activeOverviewCtxProvider?.setValue({value:P.value,loading:P.loading,error:P.error,fetch:()=>void P.fetch(),changeRepository:()=>void n.changeOverviewRepository()},!0),this._inactiveOverviewCtxProvider?.setValue({value:O.value,loading:O.loading,error:O.error,filter:A,fetch:()=>void O.fetch()},!0),i.home.homeService=n,i.commands.service=m,i.launchpad.service=a;let E={integrationBanner:"home:integrationBanner"};this._onboardingState.dismiss=t=>{let r=E[t];null!=r&&(this._onboardingState.banners[t]=!1,f.dismiss(r))},this._onboardingState.dismissWalkthrough=()=>void n.dismissWalkthrough(),this._onboardingState.banners.integrationBanner=!f.isDismissed("home:integrationBanner"),this._onboardingState.banners.mcpBanner=!f.isDismissed("mcp:banner");let B=t=>{this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,null!=t&&(this._wipWatchUnsubscribe=g.onRepositoryWorkingChanged(t,()=>{this._refreshOverviewDebounced()}))},T=()=>{this._refreshOverviewDebounced.cancel(),this._activeResource?.cancel(),this._inactiveResource?.cancel(),this._activeResource?.fetch(),this._inactiveResource?.fetch(),B(this._homeState.overviewRepositoryPath.get())};this._unsubscribeEvents=await (r={home:n,launchpad:a,config:c,subscription:h,integrations:p,repositories:u,onboarding:f,ai:b},o={refreshOverview:()=>{this._refreshOverviewDebounced()},refreshInactiveOverview:()=>{this._inactiveResource?.fetch()},replaceOverview:()=>{T()},updateOverviewFilter:t=>{this._homeState.overviewFilter.set(t),S(t)},onFocusAccount:()=>this._header?.show(),onSubscriptionChanged:()=>{this._header?.refreshPromo()},refreshLaunchpad:()=>{null!=a&&oK(i.launchpad,a)}},oY([()=>r.subscription.onSubscriptionChanged(()=>{o.onSubscriptionChanged()}),()=>r.integrations.onIntegrationsChanged(t=>{i.integrations.hasAnyIntegrationConnected.set(t.hasAnyConnected),i.integrations.integrations.set(t.integrations),o.refreshOverview()}),()=>r.repositories.onDiscoveryCompleted(t=>{i.home.repositories.set(t),i.home.discovering.set(!1),o.refreshOverview()}),()=>r.repositories.onRepositoriesChanged(()=>{r.repositories.getRepositoriesState().then(t=>{i.home.repositories.set(t)},t=>t3.error(t,"Home: Failed to refetch repositories state")),o.refreshOverview()}),()=>r.repositories.onRepositoryChanged(t=>{let r=i.home.overviewRepositoryPath.get();null!=r&&t.repoPath===r&&o.refreshOverview()}),()=>r.home.onWalkthroughProgressChanged(t=>{i.onboarding.walkthroughProgress.set(t)}),()=>r.onboarding.onDidChange(t=>{"home:integrationBanner"===t.key?i.onboarding.banners.integrationBanner=!t.dismissed:"mcp:banner"===t.key&&(i.onboarding.banners.mcpBanner=!t.dismissed)}),()=>r.ai.onModelChanged(t=>{i.ai.model.set(t)}),()=>r.ai.onStateChanged(t=>{i.ai.state.set(t)}),()=>r.home.onOverviewRepositoryChanged(t=>{i.home.overviewRepositoryPath.set(t.repoPath),o.replaceOverview()}),()=>r.home.onOverviewFilterChanged(t=>{o.updateOverviewFilter(t.filter),o.refreshInactiveOverview()}),()=>r.home.onFocusAccount(()=>{o.onFocusAccount()}),()=>r.launchpad.onLaunchpadChanged(()=>{o.refreshLaunchpad()})])),B(this._homeState.overviewRepositoryPath.get());let M=()=>{if("visible"!==document.visibilityState){this._refreshOverviewDebounced.cancel(),this._activeResource?.cancel(),this._inactiveResource?.cancel();return}this._refreshOverviewDebounced(),null!=a&&oK(i.launchpad,a)};document.addEventListener("visibilitychange",M),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",M)}),Promise.all([n.getInitialContext(),oG(i.home,n,S)]).then(([t])=>{i.home.discovering.set(t.discovering),i.home.repositories.set(t.repositories),i.home.walkthroughSupported.set(t.walkthroughSupported),i.home.newInstall.set(t.newInstall),i.home.hostAppName.set(t.hostAppName),i.home.ready.set(!0)},t=>{t3.error(t,"Home: Failed to fetch initial context"),i.home.error.set(t instanceof Error?t.message:"Failed to load")}),p.getIntegrationStates().then(t=>{i.integrations.integrations.set(t),i.integrations.hasAnyIntegrationConnected.set(t.some(t=>t.connected))},oH),b.getModel().then(t=>i.ai.model.set(t),oH),n.getWalkthroughProgress().then(t=>i.onboarding.walkthroughProgress.set(t),oH),b.getState().then(t=>i.ai.state.set(t),oH)}render(){return e$`
			<div class="home scrollable">
				<gl-error-banner .error=${this._homeState.error}></gl-error-banner>
				<gl-home-header class="home__header"></gl-home-header>
				${this.renderBanners()}
				<gl-repo-alerts class="home__alerts"></gl-repo-alerts>
				<main class="home__main scrollable" id="main">${this.renderMain()}</main>
			</div>
		`}renderBanners(){return this._homeState.ready.get()?this.renderMcpBanner():eP}renderMcpBanner(){if(!this._onboardingState.banners.mcpBanner)return eP;let t=this._aiState.state.get();return e$` <gl-mcp-banner source="home" .canAutoRegister=${t.mcp.bundled}></gl-mcp-banner> `}renderMain(){return this._homeState.ready.get()?e$`
			<gl-active-work></gl-active-work>
			<gl-launchpad></gl-launchpad>
			<gl-overview></gl-overview>
		`:e$`<skeleton-loader lines="1"></skeleton-loader>`}};function c1(t,r,o){return{...t,wip:r.then(r=>r[t.id]),remote:o.then(r=>r[t.id]?.remote),pr:o.then(r=>r[t.id]?.pr),autolinks:o.then(r=>r[t.id]?.autolinks),issues:o.then(r=>r[t.id]?.issues),contributors:o.then(r=>r[t.id]?.contributors),mergeTarget:o.then(r=>r[t.id]?.mergeTarget)}}c0.styles=[oJ,ok,oZ],cQ([eD({type:String,noAccessor:!0})],c0.prototype,"context",2),cQ([eD({type:String})],c0.prototype,"webroot",2),cQ([eN("gl-home-header")],c0.prototype,"_header",2),cQ([ej()],c0.prototype,"isLightTheme",2),c0=cQ([eM("gl-home-app")],c0);export{c0 as GlHomeApp};