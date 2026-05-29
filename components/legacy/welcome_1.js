let e,t,r,o,i;var s,a,c,h,p,u,f,g,b,m={};m.d=(e,t)=>{for(var r in t)m.o(t,r)&&!m.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},m.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),void 0!==m&&Object.defineProperty(m,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let v=globalThis,w=v.ShadowRoot&&(void 0===v.ShadyCSS||v.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,x=Symbol(),C=new WeakMap;let n=class n{constructor(e,t,r){if(this._$cssResult$=!0,r!==x)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(w&&void 0===e){let r=void 0!==t&&1===t.length;r&&(e=C.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&C.set(t,e))}return e}toString(){return this.cssText}};let _=e=>new n("string"==typeof e?e:e+"",void 0,x),$=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,r,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1],e[0]),e,x),S=w?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return _(t)})(e):e,{is:A,defineProperty:E,getOwnPropertyDescriptor:P,getOwnPropertyNames:O,getOwnPropertySymbols:T,getPrototypeOf:M}=Object,N=globalThis,D=N.trustedTypes,j=D?D.emptyScript:"",U=N.reactiveElementPolyfillSupport,q={toAttribute(e,t){switch(t){case Boolean:e=e?j:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},B=(e,t)=>!A(e,t),F={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(e,r,t);void 0!==o&&E(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){let{get:o,set:i}=P(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){let s=o?.call(this);i?.call(this,t),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=M(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...O(e),...T(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,r]of t)this.elementProperties.set(e,r)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let r of new Set(e.flat(1/0).reverse()))t.unshift(S(r));else void 0!==e&&t.push(S(e));return t}static _$Eu(e,t){let r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(w)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement("style"),o=v.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=r.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(void 0!==o&&!0===r.reflect){let i=(void 0!==r.converter?.toAttribute?r.converter:q).toAttribute(t,r.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,o=r._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=r.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:q;this._$Em=o;let s=i.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,r,o=!1,i){if(void 0!==e){let s=this.constructor;if(!1===o&&(i=this[e]),!(((r??=s.getPropertyOptions(e)).hasChanged??B)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:i},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,r]of e){let{wrapped:e}=r,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,r,o)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,U?.({ReactiveElement:y}),(N.reactiveElementVersions??=[]).push("2.1.2");let G=globalThis,W=e=>e,V=G.trustedTypes,K=V?V.createPolicy("lit-html",{createHTML:e=>e}):void 0,J="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+Y,X=`<${Q}>`,ee=document,et=()=>ee.createComment(""),er=e=>null===e||"object"!=typeof e&&"function"!=typeof e,eo=Array.isArray,ei=e=>eo(e)||"function"==typeof e?.[Symbol.iterator],en=`[ 	
\x0c\r]`,es=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ea=/-->/g,el=/>/g,ec=RegExp(`>|${en}(?:([^\\s"'>=/]+)(${en}*=${en}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ed=/'/g,eh=/"/g,ep=/^(?:script|style|textarea|title)$/i,eu=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),ef=eu(1),eg=eu(2),eb=(eu(3),Symbol.for("lit-noChange")),em=Symbol.for("lit-nothing"),ev=new WeakMap,ew=ee.createTreeWalker(ee,129);function ey(e,t){if(!eo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==K?K.createHTML(t):t}let ex=(e,t)=>{let r=e.length-1,o=[],i,s=2===t?"<svg>":3===t?"<math>":"",a=es;for(let t=0;t<r;t++){let r=e[t],c,h,p=-1,u=0;for(;u<r.length&&(a.lastIndex=u,null!==(h=a.exec(r)));)u=a.lastIndex,a===es?"!--"===h[1]?a=ea:void 0!==h[1]?a=el:void 0!==h[2]?(ep.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=ec):void 0!==h[3]&&(a=ec):a===ec?">"===h[0]?(a=i??es,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?ec:'"'===h[3]?eh:ed):a===eh||a===ed?a=ec:a===ea||a===el?a=es:(a=ec,i=void 0);let f=a===ec&&e[t+1].startsWith("/>")?" ":"";s+=a===es?r+X:p>=0?(o.push(c),r.slice(0,p)+J+r.slice(p)+Y+f):r+Y+(-2===p?t:f)}return[ey(e,s+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let i=0,s=0,a=e.length-1,c=this.parts,[h,p]=ex(e,t);if(this.el=lit_html_S.createElement(h,r),ew.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=ew.nextNode())&&c.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(J)){let t=p[s++],r=o.getAttribute(e).split(Y),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:i,name:a[2],strings:r,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),o.removeAttribute(e)}else e.startsWith(Y)&&(c.push({type:6,index:i}),o.removeAttribute(e));if(ep.test(o.tagName)){let e=o.textContent.split(Y),t=e.length-1;if(t>0){o.textContent=V?V.emptyScript:"";for(let r=0;r<t;r++)o.append(e[r],et()),ew.nextNode(),c.push({type:2,index:++i});o.append(e[t],et())}}}else if(8===o.nodeType)if(o.data===Q)c.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(Y,e+1));)c.push({type:7,index:i}),e+=Y.length-1}i++}}static createElement(e,t){let r=ee.createElement("template");return r.innerHTML=e,r}};function eC(e,t,r=e,o){if(t===eb)return t;let i=void 0!==o?r._$Co?.[o]:r._$Cl,s=er(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e))._$AT(e,r,o),void 0!==o?(r._$Co??=[])[o]=i:r._$Cl=i),void 0!==i&&(t=eC(e,i._$AS(e,t.values),i,o)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??ee).importNode(t,!0);ew.currentNode=o;let i=ew.nextNode(),s=0,a=0,c=r[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(i,i.nextSibling,this,e):1===c.type?t=new c.ctor(i,c.name,c.strings,this,e):6===c.type&&(t=new Z(i,this,e)),this._$AV.push(t),c=r[++a]}s!==c?.index&&(i=ew.nextNode(),s++)}return ew.currentNode=ee,o}p(e){let t=0;for(let r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=em,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){er(e=eC(this,e,t))?e===em||null==e||""===e?(this._$AH!==em&&this._$AR(),this._$AH=em):e!==this._$AH&&e!==eb&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):ei(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==em&&er(this._$AH)?this._$AA.nextSibling.data=e:this.T(ee.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,o="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=lit_html_S.createElement(ey(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new R(o,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=ev.get(e.strings);return void 0===t&&ev.set(e.strings,t=new lit_html_S(e)),t}k(e){eo(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,o=0;for(let i of e)o===t.length?t.push(r=new k(this.O(et()),this.O(et()),this,this.options)):r=t[o],r._$AI(i),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=W(e).nextSibling;W(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,i){this.type=1,this._$AH=em,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=em}_$AI(e,t=this,r,o){let i=this.strings,s=!1;if(void 0===i)(s=!er(e=eC(this,e,t,0))||e!==this._$AH&&e!==eb)&&(this._$AH=e);else{let o,a,c=e;for(e=i[0],o=0;o<i.length-1;o++)(a=eC(this,c[r+o],t,o))===eb&&(a=this._$AH[o]),s||=!er(a)||a!==this._$AH[o],a===em?e=em:e!==em&&(e+=(a??"")+i[o+1]),this._$AH[o]=a}s&&!o&&this.j(e)}j(e){e===em?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===em?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==em)}};let z=class z extends H{constructor(e,t,r,o,i){super(e,t,r,o,i),this.type=5}_$AI(e,t=this){if((e=eC(this,e,t,0)??em)===eb)return;let r=this._$AH,o=e===em&&r!==em||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==em&&(r===em||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){eC(this,e)}};let e_=G.litHtmlPolyfillSupport;e_?.(lit_html_S,k),(G.litHtmlVersions??=[]).push("3.3.2");let ek=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{let o=r?.renderBefore??t,i=o._$litPart$;if(void 0===i){let e=r?.renderBefore??null;o._$litPart$=i=new k(t.insertBefore(et(),e),e,void 0,r??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eb}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ek.litElementHydrateSupport?.({LitElement:lit_element_i});let e$=ek.litElementPolyfillSupport;e$?.({LitElement:lit_element_i}),(ek.litElementVersions??=[]).push("4.2.2");let eS=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eA={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:B};function eL(e){return(t,r)=>{let o;return"object"==typeof r?((e=eA,t,r)=>{let{kind:o,metadata:i}=r,s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(r.name,e),"accessor"===o){let{name:o}=r;return{set(r){let i=t.get.call(this);t.set.call(this,r),this.requestUpdate(o,i,e,!0,r)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=r;return function(r){let i=this[o];t.call(this,r),this.requestUpdate(o,i,e,!0,r)}}throw Error("Unsupported decorator location: "+o)})(e,t,r):(o=t.hasOwnProperty(r),t.constructor.createProperty(r,e),o?Object.getOwnPropertyDescriptor(t,r):void 0)}}function eE(e){return eL({...e,state:!0,attribute:!1})}let eP=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,r),r);function eR(e,t){return(r,o,i)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof o?r:i??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eP(r,o,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return eP(r,o,{get(){return s(this)}})}}let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,r,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=r,this.subscribe=o??!1}};let context_consumer_s=class context_consumer_s{constructor(e,t,r,o){(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,void 0!==t.context)?(this.context=t.context,this.callback=t.callback,this.subscribe=t.subscribe??!1):(this.context=t,this.callback=r,this.subscribe=o??!1),this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new context_request_event_s(this.context,this.host,this.t,this.subscribe))}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let r=t||!Object.is(e,this.o);this.o=e,r&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,r){if(!r)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:o}=this.subscriptions.get(e);e(this.value,o)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,r){super(void 0!==t.context?t.initialValue:r),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:r}]of this.subscriptions)t.has(e)||(t.add(e),r.dispatchEvent(new context_request_event_s(this.context,r,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function eO({context:e}){return(t,r)=>{let o=new WeakMap;if("object"==typeof r)return{get(){return t.get.call(this)},set(e){return o.get(this).setValue(e),t.set.call(this,e)},init(t){return o.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let i;t.constructor.addInitializer(t=>{o.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,r);if(void 0===s){let e=new WeakMap;i={get(){return e.get(this)},set(t){o.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;i={...s,set(t){o.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,r,i)}}}function eT({context:e,subscribe:t}){return(r,o)=>{"object"==typeof o?o.addInitializer(function(){new context_consumer_s(this,{context:e,callback:e=>{r.set.call(this,e)},subscribe:t})}):r.constructor.addInitializer(r=>{new context_consumer_s(r,{context:e,callback:e=>{r[o]=e},subscribe:t})})}}var eI=Object.defineProperty,eM=(e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?eI(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r,r},eN=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},ez=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},eD=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot access private method");return r};function ej(e,t){return Object.is(e,t)}let eU=null,eq=!1,eB=1,eH=Symbol("SIGNAL");function eF(e){let t=eU;return eU=e,t}let eG={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function eW(e){if(eq)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===eU)return;eU.consumerOnSignalRead(e);let t=eU.nextProducerIndex++;eK(eU),t<eU.producerNode.length&&eU.producerNode[t]!==e&&eZ(eU)&&eV(eU.producerNode[t],eU.producerIndexOfThis[t]),eU.producerNode[t]!==e&&(eU.producerNode[t]=e,eU.producerIndexOfThis[t]=eZ(eU)?function e(t,r,o){var i;if(eJ(t),eK(t),0===t.liveConsumerNode.length){null==(i=t.watched)||i.call(t.wrapper);for(let r=0;r<t.producerNode.length;r++)t.producerIndexOfThis[r]=e(t.producerNode[r],t,r)}return t.liveConsumerIndexOfThis.push(o),t.liveConsumerNode.push(r)-1}(e,eU,t):0),eU.producerLastReadVersion[t]=e.version}function eV(e,t){var r;if(eJ(e),eK(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(r=e.unwatched)||r.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)eV(e.producerNode[t],e.producerIndexOfThis[t])}let o=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[o],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[o],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];eK(o),o.producerIndexOfThis[r]=t}}function eZ(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function eK(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function eJ(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function eY(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==eB){if(!t.producerMustRecompute(t)&&!function(t){eK(t);for(let r=0;r<t.producerNode.length;r++){let o=t.producerNode[r],i=t.producerLastReadVersion[r];if(i!==o.version||(e(o),i!==o.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=eB;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=eB}}(e),eW(e),e.value===e1)throw e.error;return e.value}let eQ=Symbol("UNSET"),eX=Symbol("COMPUTING"),e1=Symbol("ERRORED"),e0={...eG,value:eQ,dirty:!0,error:null,equal:ej,producerMustRecompute:e=>e.value===eQ||e.value===eX,producerRecomputeValue(e){let t;if(e.value===eX)throw Error("Detected cycle in computations.");let r=e.value;e.value=eX;let o=(e&&(e.nextProducerIndex=0),eF(e)),i=!1;try{t=e.computation.call(e.wrapper),i=r!==eQ&&r!==e1&&e.equal.call(e.wrapper,r,t)}catch(r){t=e1,e.error=r}finally{if(eF(o),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(eZ(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)eV(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(i){e.value=r;return}e.value=t,e.version++}},e2=function(){throw Error()};function e3(){return eW(this),this.value}let e5={...eG,equal:ej,value:void 0},e6=Symbol("node");(e=>{var t,r,o,i;let State=class State{constructor(o,i={}){let s,a;ez(this,r),eM(this,t);let c=((s=Object.create(e5)).value=o,(a=()=>(eW(s),s.value))[eH]=s,a)[eH];if(this[e6]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return e3.call(this[e6])}set(t){var r,o;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(eq)throw Error("Writes to signals not permitted during Watcher callback");r=this[e6],(null==eU?void 0:eU.consumerAllowSignalWrites)===!1&&e2(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,o=r,o.version++,eB++,function e(t){if(void 0===t.liveConsumerNode)return;let r=eq;eq=!0;try{for(let r of t.liveConsumerNode)r.dirty||function(t){var r;t.dirty=!0,e(t),null==(r=t.consumerMarkedDirty)||r.call(t.wrapper??t)}(r)}finally{eq=r}}(o))}};t=e6,r=new WeakSet,e.isState=e=>"object"==typeof e&&eN(r,e),e.State=State;let Computed=class Computed{constructor(t,r){let s,a;ez(this,i),eM(this,o);let c=((s=Object.create(e0)).computation=t,(a=()=>eY(s))[eH]=s,a)[eH];if(c.consumerAllowSignalWrites=!0,this[e6]=c,c.wrapper=this,r){let t=r.equals;t&&(c.equal=t),c.watched=r[e.subtle.watched],c.unwatched=r[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return eY(this[e6])}};o=e6,i=new WeakSet,e.isComputed=e=>"object"==typeof e&&eN(i,e),e.Computed=Computed,(t=>{var r,o,i,s;t.untrack=function(e){let t,r=null;try{r=eF(null),t=e()}finally{eF(r)}return t},t.introspectSources=function(t){var r;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(r=t[e6].producerNode)?void 0:r.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var r;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(r=t[e6].liveConsumerNode)?void 0:r.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let r=t[e6].liveConsumerNode;return!!r&&r.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let r=t[e6].producerNode;return!!r&&r.length>0};let Watcher=class Watcher{constructor(e){ez(this,o),ez(this,i),eM(this,r);let t=Object.create(eG);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[e6]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eD(this,i,s).call(this,t);let r=this[e6];r.dirty=!1;let o=eF(r);for(let e of t)eW(e[e6]);eF(o)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");eD(this,i,s).call(this,t);let r=this[e6];eK(r);for(let e=r.producerNode.length-1;e>=0;e--)if(t.includes(r.producerNode[e].wrapper)){eV(r.producerNode[e],r.producerIndexOfThis[e]);let t=r.producerNode.length-1;if(r.producerNode[e]=r.producerNode[t],r.producerIndexOfThis[e]=r.producerIndexOfThis[t],r.producerNode.length--,r.producerIndexOfThis.length--,r.nextProducerIndex--,e<r.producerNode.length){let t=r.producerIndexOfThis[e],o=r.producerNode[e];eJ(o),o.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[e6].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};r=e6,o=new WeakSet,i=new WeakSet,s=function(t){for(let r of t)if(!(0,e.isComputed)(r)&&!(0,e.isState)(r))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>eN(o,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=eU)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(u||(u={}));let e4=!1,e7=new u.subtle.Watcher(()=>{e4||(e4=!0,queueMicrotask(()=>{for(let e of(e4=!1,e7.getPending()))e.get();e7.watch()}))}),e8=Symbol("SignalWatcherBrand"),e9=(new FinalizationRegistry(e=>{e.unwatch(...u.subtle.introspectSources(e))}),new WeakMap,e=>(...t)=>({_$litDirective$:e,values:t}));let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:te}={M:J,P:Y,A:Q,C:1,L:ex,R,D:ei,V:eC,I:k,H,N:L,U:z,B:I,F:Z},tt=(e,t)=>{let r=e._$AN;if(void 0===r)return!1;for(let e of r)e._$AO?.(t,!1),tt(e,t);return!0},tr=e=>{let t,r;do{if(void 0===(t=e._$AM))break;(r=t._$AN).delete(e),e=t}while(0===r?.size)},to=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),ts(t)}};function ti(e){void 0!==this._$AN?(tr(this),this._$AM=e,to(this)):this._$AM=e}function tn(e,t=!1,r=0){let o=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(t)if(Array.isArray(o))for(let e=r;e<o.length;e++)tt(o[e],!1),tr(o[e]);else null!=o&&(tt(o,!1),tr(o));else tt(this,e)}let ts=e=>{2==e.type&&(e._$AP??=tn,e._$AQ??=ti)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),to(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tt(this,e),tr(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let ta=!1,tl=new u.subtle.Watcher(async()=>{ta||(ta=!0,queueMicrotask(()=>{for(let e of(ta=!1,tl.getPending()))e.get();tl.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new u.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tl,this._$Sm.watch(this._$Sj),u.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return u.subtle.untrack(()=>e.get())}update(e,[t]){var r;return null!=this._$Sk||(this._$Sk=null==(r=e.options)?void 0:r.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),u.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tc=e9(watch_r),td=e=>(t,...r)=>e(t,...r.map(e=>e instanceof u.State||e instanceof u.Computed?tc(e):e));td(ef),td(eg),u.State,u.Computed;let{fromCharCode:th}=String;new TextEncoder;let tp=new TextDecoder;function tu(e){return tp.decode(function(e){let t=globalThis.atob(e),r=t.length,o=new Uint8Array(r),i=0,s=r-r%8;for(;i<s;i+=8)o[i]=t.charCodeAt(i),o[i+1]=t.charCodeAt(i+1),o[i+2]=t.charCodeAt(i+2),o[i+3]=t.charCodeAt(i+3),o[i+4]=t.charCodeAt(i+4),o[i+5]=t.charCodeAt(i+5),o[i+6]=t.charCodeAt(i+6),o[i+7]=t.charCodeAt(i+7);for(;i<r;i++)o[i]=t.charCodeAt(i);return o}(e))}let IpcCall=class IpcCall{constructor(e,t,r=!1){this.scope=e,this.reset=r,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,r){super(e,t,r),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tf=new IpcRequest("core","webview/ready"),tg=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tb=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tm=new IpcCommand("core","telemetry/sendEvent"),tv=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tw=new IpcCommand("core","webview/focus/didChange"),ty=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tx=new WeakMap;let GlElement=class GlElement extends lit_element_i{emit(e,t,r){let o=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...r,detail:t});return this.dispatchEvent(o),o}update(e){let t=tx.get(this.constructor);if(null!=t)for(let{keys:r,method:o,afterFirstUpdate:i}of t){if(i&&!this.hasUpdated)continue;let t=r.filter(t=>e.has(t));t.length&&o.call(this,t)}super.update(e)}};new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let tC=/T/,t_=/.*\s*?at\s(.+?)\s/,tk=/^_+/,t$=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...t$,...e.sanitizeKeys??[]])},this.#r=t,this.#e=e.createChannel(e.name),this.#o=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#o=e})}enabled(e){return!!this.isDebugging||0!==this.#o&&(null==e||this.#o<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#r=!1;get isDebugging(){return this.#r}#o=0;get logLevel(){var e=this.#o;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tC," ").slice(0,-1)}]`}trace(e,...t){let r;(0!==this.#o&&!(this.#o>1)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.trace(`  ${r??""}${this.#i(!0,t)}`))}debug(e,...t){let r;(0!==this.#o&&!(this.#o>2)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.debug(`  ${r??""}${this.#i(!1,t)}`))}info(e,...t){let r;(0!==this.#o&&!(this.#o>3)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.info(`   ${r??""}${this.#i(!1,t)}`))}warn(e,...t){let r;(0!==this.#o&&!(this.#o>4)||this.isDebugging)&&("string"==typeof e?r=e:(r=t.shift(),null!=e&&(r=`${e.prefix} ${r??""}`)),this.isDebugging,this.#e?.warn(`${r??""}${this.#i(!1,t)}`))}error(e,t,...r){let o;if((0===this.#o||this.#o>5)&&!this.isDebugging)return;if(null==(o=null==t||"string"==typeof t?t:`${t.prefix} ${r.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=t_.exec(t);null!=e&&(o=e[1])}}this.isDebugging;let i=`  ${o??""}${this.#i(!1,r)}`;null!=e?this.#e?.error(String(e),i):this.#e?.error(i)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let r=this.sanitize(t,e);if(null!=r)return r}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,r=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${r}]`}let r=this.#t?.toLoggable,o=r?.(e);if(null!=o)return o;let i=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return i?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):r?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let r=e.replace(tk,"")||e;if(this.#t?.sanitizeKeys?.has(r))return null!=this.#t.hash?`<${r}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${r}>`}#i(e,t){if(0===t.length||e&&(0===this.#o||this.#o>2)&&!this.isDebugging)return"";let r=t.map(e=>this.toLoggable(e)).join(", ");return 0!==r.length?` \u2014 ${r}`:""}};let tS=new Logger,tA=new WeakMap,tL={enabled:e=>tS.enabled(e),log:(e,t,r,...o)=>{switch(e){case"error":tS.error(void 0,t,r,...o);break;case"warn":t?.warn(r,...o);break;case"info":t?.info(r,...o);break;case"debug":default:t?.debug(r,...o);break;case"trace":t?.trace(r,...o)}}},tE=0x40000000-1;function tP(){let e=0;return{get current(){return e},next:function(){return e===tE&&(e=0),++e},reset:function(){e=0}}}function tR(e){let t=.001*performance.now(),r=Math.floor(t),o=Math.floor(t%1*1e9);return void 0!==e&&(r-=e[0],(o-=e[1])<0&&(r--,o+=1e9)),[r,o]}function tO(e){let[t,r]=tR(e);return 1e3*t+Math.floor(r/1e6)}let tT=new Map;function tI(t,r){let o=e;e=t.scopeId,tT.set(t.scopeId,t);try{return r()}finally{e=o,tT.delete(t.scopeId)}}function tM(){return null!=e?tT.get(e):void 0}let tN=tP();function tz(e,t,r){var o;let i,s,a={scopeId:e,prevScopeId:t,prefix:r,enabled:e=>tS.enabled(e),addExitInfo:function(...e){(i??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:i?.length?` \u2022 ${i.join(", ")}`:void 0,failed:s}}};return tD(a,"trace",tS.trace),tD(a,"debug",tS.debug),tD(a,"info",tS.info),tD(a,"warn",tS.warn),Object.defineProperty(o=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...r)=>tS.error(e,o,t,...r);return Object.defineProperty(o,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function tD(e,t,r){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let o=r.bind(tS,e);return Object.defineProperty(e,t,{value:o,writable:!1,enumerable:!0}),o}})}function tj(e,t,r){if(null!=r){let o=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==o?`[${r.padEnd(13)}]`:`[${r}${o.padStart(13-r.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function tU(){let e=tM();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function tq(e,t,r){if(null!=t&&"boolean"!=typeof t)return tz(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let o=t?tM()?.scopeId:void 0,i=tN.next();return tz(i,o,`${tj(i,o,r)} ${e}`)}function tB(e,t,r,...o){switch(t){case"trace":tS.trace(e,r,...o);break;case"info":tS.info(e,r,...o);break;default:tS.debug(e,r,...o)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=tq(e,void 0),tS.configure({name:e,createChannel:function(e){let t=tS.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?tS.trace(this.scope,e,...t):tS.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?tS.debug(this.scope,e,...t):tS.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?tS.info(this.scope,e,...t):tS.info(e,t.shift(),...t)}};let tH=new IpcNotification("home","subscription/didChange"),tF="graph";new IpcCommand(tF,"chooseRepository"),new IpcCommand(tF,"dblclick"),new IpcCommand(tF,"avatars/get"),new IpcCommand(tF,"refs/metadata/get"),new IpcCommand(tF,"rows/get"),new IpcCommand(tF,"pullRequest/openDetails"),new IpcCommand(tF,"row/action"),new IpcCommand(tF,"search/openInView"),new IpcCommand(tF,"search/cancel"),new IpcCommand(tF,"columns/update"),new IpcCommand(tF,"refs/update/visibility"),new IpcCommand(tF,"filters/update/excludeTypes"),new IpcCommand(tF,"configuration/update"),new IpcCommand(tF,"search/update/mode"),new IpcCommand(tF,"filters/update/includedRefs"),new IpcCommand(tF,"selection/update"),new IpcRequest(tF,"jumpToHead"),new IpcRequest(tF,"chooseRef"),new IpcRequest(tF,"chooseComparison"),new IpcRequest(tF,"chooseAuthor"),new IpcRequest(tF,"chooseFile"),new IpcRequest(tF,"rows/ensure"),new IpcRequest(tF,"search/history/get"),new IpcRequest(tF,"search/history/store"),new IpcRequest(tF,"search/history/delete"),new IpcRequest(tF,"counts"),new IpcRequest(tF,"row/hover/get"),new IpcRequest(tF,"search"),new IpcNotification(tF,"repositories/integration/didChange"),new IpcNotification(tF,"didChange",!0),new IpcNotification(tF,"configuration/didChange");let tG=new IpcNotification(tF,"subscription/didChange");new IpcNotification(tF,"org/settings/didChange"),new IpcNotification(tF,"avatars/didChange"),new IpcNotification(tF,"mcp/didChange"),new IpcNotification(tF,"branchState/didChange"),new IpcNotification(tF,"refs/didChangeMetadata"),new IpcNotification(tF,"columns/didChange"),new IpcNotification(tF,"scrollMarkers/didChange"),new IpcNotification(tF,"refs/didChangeVisibility"),new IpcNotification(tF,"rows/didChange"),new IpcNotification(tF,"rows/stats/didChange"),new IpcNotification(tF,"selection/didChange"),new IpcNotification(tF,"workingTree/didChange"),new IpcNotification(tF,"didSearch"),new IpcNotification(tF,"didFetch"),new IpcNotification(tF,"featurePreview/didStart");let tW="timeline";new IpcRequest(tW,"ref/choose"),new IpcRequest(tW,"path/choose"),new IpcCommand(tW,"point/open"),new IpcCommand(tW,"config/update"),new IpcCommand(tW,"scope/update");let tV=new IpcNotification(tW,"didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(tH.is(e)||tG.is(e)||tV.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let r=`${e}|${t}`,o=this._promos.get(r);return null==o&&(o=this.ipc.sendRequest(tb,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(r,o)),await o}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tm,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};(f||(f={})).on=function(e,t,r,o){let i=!1;if("string"==typeof e){let s=function(t){let o=t?.target?.closest(e);null!=o&&r(t,o)};return document.addEventListener(t,s,o??!0),{dispose:()=>{i||(i=!0,document.removeEventListener(t,s,o??!0))}}}let s=function(e){r(e,this)};return e.addEventListener(t,s,o??!1),{dispose:()=>{i||(i=!0,e.removeEventListener(t,s,o??!1))}}};var tZ=Uint8Array,tK=Uint16Array,tJ=Int32Array,tY=new tZ([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),tQ=new tZ([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),tX=new tZ([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),t1=function(e,t){for(var r=new tK(31),o=0;o<31;++o)r[o]=t+=1<<e[o-1];for(var i=new tJ(r[30]),o=1;o<30;++o)for(var s=r[o];s<r[o+1];++s)i[s]=s-r[o]<<5|o;return{b:r,r:i}},t0=t1(tY,2),t2=t0.b,t3=t0.r;t2[28]=258,t3[258]=28;var t5=t1(tQ,0),t6=t5.b;t5.r;for(var t4=new tK(32768),t7=0;t7<32768;++t7){var t8=(43690&t7)>>1|(21845&t7)<<1;t8=(61680&(t8=(52428&t8)>>2|(13107&t8)<<2))>>4|(3855&t8)<<4,t4[t7]=((65280&t8)>>8|(255&t8)<<8)>>1}for(var t9=function(e,t,r){for(var o,i=e.length,s=0,a=new tK(t);s<i;++s)e[s]&&++a[e[s]-1];var c=new tK(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(r){o=new tK(1<<t);var h=15-t;for(s=0;s<i;++s)if(e[s])for(var p=s<<4|e[s],u=t-e[s],f=c[e[s]-1]++<<u,g=f|(1<<u)-1;f<=g;++f)o[t4[f]>>h]=p}else for(s=0,o=new tK(i);s<i;++s)e[s]&&(o[s]=t4[c[e[s]-1]++]>>15-e[s]);return o},re=new tZ(288),t7=0;t7<144;++t7)re[t7]=8;for(var t7=144;t7<256;++t7)re[t7]=9;for(var t7=256;t7<280;++t7)re[t7]=7;for(var t7=280;t7<288;++t7)re[t7]=8;for(var rt=new tZ(32),t7=0;t7<32;++t7)rt[t7]=5;var rr=t9(re,9,1),ro=t9(rt,5,1),ri=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},rn=function(e,t,r){var o=t/8|0;return(e[o]|e[o+1]<<8)>>(7&t)&r},rs=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(7&t)},ra=function(e,t,r){return(null==t||t<0)&&(t=0),(null==r||r>e.length)&&(r=e.length),new tZ(e.subarray(t,r))},rl=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],rc=function(e,t,r){var o=Error(t||rl[e]);if(o.code=e,Error.captureStackTrace&&Error.captureStackTrace(o,rc),!r)throw o;return o},rd=function(e,t,r,o){var i=e.length,s=o?o.length:0;if(!i||t.f&&!t.l)return r||new tZ(0);var a=!r,c=a||2!=t.i,h=t.i;a&&(r=new tZ(3*i));var p=function(e){var t=r.length;if(e>t){var o=new tZ(Math.max(2*t,e));o.set(r),r=o}},u=t.f||0,f=t.p||0,g=t.b||0,b=t.l,m=t.d,v=t.m,w=t.n,x=8*i;do{if(!b){u=rn(e,f,1);var C=rn(e,f+1,3);if(f+=3,C)if(1==C)b=rr,m=ro,v=9,w=5;else if(2==C){var _=rn(e,f,31)+257,$=rn(e,f+10,15)+4,S=_+rn(e,f+5,31)+1;f+=14;for(var A=new tZ(S),E=new tZ(19),P=0;P<$;++P)E[tX[P]]=rn(e,f+3*P,7);f+=3*$;for(var O=ri(E),T=(1<<O)-1,M=t9(E,O,1),P=0;P<S;){var N=M[rn(e,f,T)];f+=15&N;var D=N>>4;if(D<16)A[P++]=D;else{var j=0,U=0;for(16==D?(U=3+rn(e,f,3),f+=2,j=A[P-1]):17==D?(U=3+rn(e,f,7),f+=3):18==D&&(U=11+rn(e,f,127),f+=7);U--;)A[P++]=j}}var q=A.subarray(0,_),B=A.subarray(_);v=ri(q),w=ri(B),b=t9(q,v,1),m=t9(B,w,1)}else rc(1);else{var D=((f+7)/8|0)+4,F=e[D-4]|e[D-3]<<8,G=D+F;if(G>i){h&&rc(0);break}c&&p(g+F),r.set(e.subarray(D,G),g),t.b=g+=F,t.p=f=8*G,t.f=u;continue}if(f>x){h&&rc(0);break}}c&&p(g+131072);for(var W=(1<<v)-1,V=(1<<w)-1,K=f;;K=f){var j=b[rs(e,f)&W],J=j>>4;if((f+=15&j)>x){h&&rc(0);break}if(j||rc(2),J<256)r[g++]=J;else if(256==J){K=f,b=null;break}else{var Y=J-254;if(J>264){var P=J-257,Q=tY[P];Y=rn(e,f,(1<<Q)-1)+t2[P],f+=Q}var X=m[rs(e,f)&V],ee=X>>4;X||rc(3),f+=15&X;var B=t6[ee];if(ee>3){var Q=tQ[ee];B+=rs(e,f)&(1<<Q)-1,f+=Q}if(f>x){h&&rc(0);break}c&&p(g+131072);var et=g+Y;if(g<B){var er=s-B,eo=Math.min(B,et);for(er+g<0&&rc(3);g<eo;++g)r[g]=o[er+g]}for(;g<et;++g)r[g]=r[g-B]}}t.l=b,t.p=K,t.b=g,t.f=u,b&&(u=1,t.m=v,t.d=m,t.n=w)}while(!u)return g!=r.length&&a?ra(r,0,g):r.subarray(0,g)},rh=new tZ(0),rp="u">typeof TextDecoder&&new TextDecoder;try{rp.decode(rh,{stream:!0})}catch{}var ru=function(e){for(var t="",r=0;;){var o=e[r++],i=(o>127)+(o>223)+(o>239);if(r+i>e.length)return{s:t,r:ra(e,r-1)};i?3==i?t+=String.fromCharCode(55296|(o=((15&o)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536)>>10,56320|1023&o):1&i?t+=String.fromCharCode((31&o)<<6|63&e[r++]):t+=String.fromCharCode((15&o)<<12|(63&e[r++])<<6|63&e[r++]):t+=String.fromCharCode(o)}};function rf(e,t){if(t){for(var r="",o=0;o<e.length;o+=16384)r+=String.fromCharCode.apply(null,e.subarray(o,o+16384));return r}if(rp)return rp.decode(e);var i=ru(e),s=i.s,r=i.r;return r.length&&rc(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let rg=/\(([\s\S]*)\)/,rb=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,rm=/\s?=.*$/;function rv(e){return null!=e&&(e instanceof Promise||"function"==typeof e?.then)}function rw(e){var t,r;let o,i,s,a,c,h,p,u,f;return t="debug",c=!1,h=!0,null!=(r=e)&&({args:o,when:i,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=r),p="object"==typeof h?h.warnAfter:1500,u=!1!==h||"object"==typeof c&&c.after>0,f="trace"===t?tS.trace:"debug"===t?tS.debug:tS.info,(e,r,h)=>{let g,b;if("function"==typeof h.value?(g=h.value,b="value"):"function"==typeof h.get&&(g=h.get,b="get"),null==g||null==b)throw Error("Not supported");let m=null==o?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),r=(t=(t=t.replace(rb,"")||t).slice(0,t.indexOf("{"))).indexOf("("),o=t.indexOf(")");r=r>=0?r+1:0,o=o>0?o:t.indexOf("="),t=t.slice(r,o),t=`(${t})`;let i=rg.exec(t);return null!=i?i[1].split(",").map(e=>e.trim().replace(rm,"")):[]}(g):[];h[b]=function(...e){let h;if(!tS.enabled()||null!=i&&!i.apply(this,e))return g.apply(this,e);let b=tS.enabled(t),v=tU(),w=v?.scopeId,x=tN.next(),C=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let r=t?.name??"",o=r.indexOf("_");-1!==o&&(r=r.substring(o+1));let i=t;for(;null!=i;){let t=tA.get(i);if(null!=t)return t(e,r);i=Object.getPrototypeOf(i)}return r}(this):void 0,_=C?`${tj(x,w)} ${C}.${r}`:`${tj(x,w)} ${r}`;null!=a&&(_=a({id:x,instance:this,instanceName:C??"",name:r,prefix:_},...e));let $=tz(x,w,_),S=!1,A=()=>(S||(S=!0,h=function(e,t,r){if(!1===e||!t.length)return;if("function"==typeof e){let r=e(...t);if(!1===r)return;let o="";for(let[e,t]of Object.entries(r))o.length&&(o+=", "),o+=`${e}=${tS.toLoggable(t,e)}`;return o||void 0}let o="",i=-1;for(let e of t){let t=r[++i];o.length&&(o+=", "),o+=t?`${t}=${tS.toLoggable(e,t)}`:tS.toLoggable(e)}return o||void 0}(o,e,m)),h);if(!c&&b){let e=A();f.call(tS,e?`${_}(${e})`:_)}if(c||u||null!=s){let t=u?tR():void 0,r=e=>{let r=void 0!==t?` [${tO(t)}ms]`:"",o=$.getExitInfo();if(c){let t=A();tS.error(e,t?`${_}(${t})`:_,o?.details?`failed${o.details}${r}`:`failed${r}`)}else tS.error(e,_,o?.details?`failed${o.details}${r}`:`failed${r}`)},o=e=>{let r,o,i,a;null!=t?(r=tO(t))>p?(o=tS.warn,i=` [*${r}ms] (slow)`):(o=f,i=` [${r}ms]`):(i="",o=f);let h=$.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${tS.toLoggable(e)}`);else h?.failed?(a=h.failed,o=(e,...t)=>tS.error(null,e,...t)):a="completed";if(b||o!==f){let e=A();c?(!0===c||0===c.after||r>c.after)&&o.call(tS,e?`${_}(${e}) ${a}${h?.details||""}${i}`:`${_} ${a}${h?.details||""}${i}`):o.call(tS,e?`${_}(${e}) ${a}${h?.details||""}${i}`:`${_} ${a}${h?.details||""}${i}`)}};return tI($,()=>{let t;try{t=g.apply(this,e)}catch(e){throw r(e),e}return null!=t&&rv(t)?t.then(o,r):o(t),t})}return tI($,()=>g.apply(this,e))}}}Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...r){let o;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:tq(e??"",!1,t?.scopeLabel);let i=t?.log;if(o=null==i||!0===i?{}:!1===i||i.onlyExit?void 0:i,this.logLevel=("object"==typeof i?i.level:void 0)??"debug",this.logProvider=t?.provider??tL,this._time=tR(),null!=o){if(!this.logProvider.enabled(this.logLevel))return;r.length?this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`,...r):this.logProvider.log(this.logLevel,this.logScope,`${o.message??""}${o.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return tO(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=tR(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let r=tO(this._time),o=e?.message??"";this.logProvider.log(r>250?"warn":this.logLevel,this.logScope,`${o?`${o} `:""}[${r}ms]${e?.suffix??""}`)}};(()=>{let e;var t,r,o={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function r(e,t){for(var r,o="",i=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)r=e.charCodeAt(c);else{if(47===r)break;r=47}if(47===r){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(o.length<2||2!==i||46!==o.charCodeAt(o.length-1)||46!==o.charCodeAt(o.length-2)){if(o.length>2){var h=o.lastIndexOf("/");if(h!==o.length-1){-1===h?(o="",i=0):i=(o=o.slice(0,h)).length-1-o.lastIndexOf("/"),s=c,a=0;continue}}else if(2===o.length||1===o.length){o="",i=0,s=c,a=0;continue}}t&&(o.length>0?o+="/..":o="..",i=2)}else o.length>0?o+="/"+e.slice(s+1,c):o=e.slice(s+1,c),i=c-s-1;s=c,a=0}else 46===r&&-1!==a?++a:a=-1}return o}var o={resolve:function(){for(var e,o,i="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===o&&(o=process.cwd()),e=o),t(e),0!==e.length&&(i=e+"/"+i,s=47===e.charCodeAt(0));return i=r(i,!s),s?i.length>0?"/"+i:"/":i.length>0?i:"."},normalize:function(e){if(t(e),0===e.length)return".";var o=47===e.charCodeAt(0),i=47===e.charCodeAt(e.length-1);return 0!==(e=r(e,!o)).length||o||(e="."),e.length>0&&i&&(e+="/"),o?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];t(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":o.normalize(e)},relative:function(e,r){if(t(e),t(r),e===r||(e=o.resolve(e))===(r=o.resolve(r)))return"";for(var i=1;i<e.length&&47===e.charCodeAt(i);++i);for(var s=e.length,a=s-i,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,u=-1,f=0;f<=p;++f){if(f===p){if(h>p){if(47===r.charCodeAt(c+f))return r.slice(c+f+1);if(0===f)return r.slice(c+f)}else a>p&&(47===e.charCodeAt(i+f)?u=f:0===f&&(u=0));break}var g=e.charCodeAt(i+f);if(g!==r.charCodeAt(c+f))break;47===g&&(u=f)}var b="";for(f=i+u+1;f<=s;++f)f!==s&&47!==e.charCodeAt(f)||(0===b.length?b+="..":b+="/..");return b.length>0?b+r.slice(c+u):(c+=u,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var r=e.charCodeAt(0),o=47===r,i=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(r=e.charCodeAt(a))){if(!s){i=a;break}}else s=!1;return -1===i?o?"/":".":o&&1===i?"//":e.slice(0,i)},basename:function(e,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');t(e);var o,i=0,s=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var c=r.length-1,h=-1;for(o=e.length-1;o>=0;--o){var p=e.charCodeAt(o);if(47===p){if(!a){i=o+1;break}}else -1===h&&(a=!1,h=o+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(s=o):(c=-1,s=h))}return i===s?s=h:-1===s&&(s=e.length),e.slice(i,s)}for(o=e.length-1;o>=0;--o)if(47===e.charCodeAt(o)){if(!a){i=o+1;break}}else -1===s&&(a=!1,s=o+1);return -1===s?"":e.slice(i,s)},extname:function(e){t(e);for(var r=-1,o=0,i=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===i&&(s=!1,i=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1);else if(!s){o=c+1;break}}return -1===r||-1===i||0===a||1===a&&r===i-1&&r===o+1?"":e.slice(r,i)},format:function(e){var t,r;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+r:t+"/"+r:r},parse:function(e){t(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return r;var o,i=e.charCodeAt(0),s=47===i;s?(r.root="/",o=1):o=0;for(var a=-1,c=0,h=-1,p=!0,u=e.length-1,f=0;u>=o;--u)if(47!==(i=e.charCodeAt(u)))-1===h&&(p=!1,h=u+1),46===i?-1===a?a=u:1!==f&&(f=1):-1!==a&&(f=-1);else if(!p){c=u+1;break}return -1===a||-1===h||0===f||1===f&&a===h-1&&a===c+1?-1!==h&&(r.base=r.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(r.name=e.slice(1,a),r.base=e.slice(1,h)):(r.name=e.slice(c,a),r.base=e.slice(c,h)),r.ext=e.slice(a,h)),c>0?r.dir=e.slice(0,c-1):s&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return o[e](r,r.exports,s),r.exports}s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>r}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function u(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,r,o,i,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,r||""),this.query=o||"",this.fragment=i||"",u(this,s))}get fsPath(){return x(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:r,path:o,query:i,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===r?r=this.authority:null===r&&(r=""),void 0===o?o=this.path:null===o&&(o=""),void 0===i?i=this.query:null===i&&(i=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&r===this.authority&&o===this.path&&i===this.query&&s===this.fragment?this:new d(t,r,o,i,s)}static parse(e,t=!1){let r=f.exec(e);return r?new d(r[2]||"",$(r[4]||""),$(r[5]||""),$(r[7]||""),$(r[9]||""),t):new d("","","","","")}static file(t){let r="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(r=t.substring(2),t="/"):(r=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",r,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return u(t,!0),t}toString(e=!1){return C(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===b?e.fsPath:null,t}}return e}};let b=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=x(this,!1)),this._fsPath}toString(e=!1){return e?C(this,!0):(this._formatted||(this._formatted=C(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=b),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let m={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function v(e,t,r){let o,i=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||r&&91===a||r&&93===a||r&&58===a)-1!==i&&(o+=encodeURIComponent(e.substring(i,s)),i=-1),void 0!==o&&(o+=e.charAt(s));else{void 0===o&&(o=e.substr(0,s));let t=m[a];void 0!==t?(-1!==i&&(o+=encodeURIComponent(e.substring(i,s)),i=-1),o+=t):-1===i&&(i=s)}}return -1!==i&&(o+=encodeURIComponent(e.substring(i))),void 0!==o?o:e}function w(e){let t;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);35===o||63===o?(void 0===t&&(t=e.substr(0,r)),t+=m[o]):void 0!==t&&(t+=e[r])}return void 0!==t?t:e}function x(t,r){let o;return o=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?r?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(o=o.replace(/\//g,"\\")),o}function C(e,t){let r=t?w:v,o="",{scheme:i,authority:s,path:a,query:c,fragment:h}=e;if(i&&(o+=i,o+=":"),(s||"file"===i)&&(o+="/",o+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?o+=r(t,!1,!1):(o+=r(t.substr(0,e),!1,!1),o+=":",o+=r(t.substr(e+1),!1,!0)),o+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?o+=r(s,!1,!0):(o+=r(s.substr(0,e),!1,!0),o+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}o+=r(a,!0,!1)}return c&&(o+="?",o+=r(c,!1,!1)),h&&(o+="#",o+=t?h:v(h,!1,!1)),o}let _=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function $(e){return e.match(_)?e.replace(_,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var S=s(975);let A=S.posix||S;(t=r||(r={})).joinPath=function(e,...t){return e.with({path:A.join(e.path,...t)})},t.resolvePath=function(e,...t){let r=e.path,o=!1;"/"!==r[0]&&(r="/"+r,o=!0);let i=A.resolve(r,...t);return o&&"/"===i[0]&&!e.authority&&(i=i.substring(1)),e.with({path:i})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=A.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return A.basename(e.path)},t.extname=function(e){return A.extname(e.path)},g=a})();let{URI:ry,Utils:rx}=g;function rC(e,t){return JSON.parse(e,(e,r)=>(function(e,t){let r=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==r)return e;switch(r.__ipc){case"date":return new Date(r.value);case"promise":return t(r.value);case"uri":return ry.revive(r.value)}})(r,t))}let r_="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(e,t,r)=>{this.listeners??=new LinkedList;let o=this.listeners.push(null==t?e:[e,t]),i={dispose:()=>{i.dispose=Emitter._noop,this._disposed||o()}};return Array.isArray(r)&&r.push(i),i},this._event}fire(e){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let t=this.listeners.iterator(),r=t.next();!r.done;r=t.next())this._deliveryQueue.push([r.value,e]);for(;this._deliveryQueue.size>0;){let[e,t]=this._deliveryQueue.shift();try{"function"==typeof e?e(t):e[0].call(e[1],t)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let rk={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(e){this.element=e,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let r=new events_Node(e);if(this._first===events_Node.Undefined)this._first=r,this._last=r;else if(t){let e=this._last;this._last=r,r.prev=e,e.next=r}else{let e=this._first;this._first=r,r.next=e,e.prev=r}this._size+=1;let o=!1;return()=>{o||(o=!0,this._remove(r))}}shift(){if(this._first===events_Node.Undefined)return;let e=this._first.element;return this._remove(this._first),e}pop(){if(this._last===events_Node.Undefined)return;let e=this._last.element;return this._remove(this._last),e}_remove(e){if(e.prev!==events_Node.Undefined&&e.next!==events_Node.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===events_Node.Undefined&&e.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):e.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):e.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let e,t=this._first;return{next:function(){return t===events_Node.Undefined?rk:(null==e?e={done:!1,value:t.element}:e.value=t.element,t=t.next,e)}}}toArray(){let e=[];for(let t=this._first;t!==events_Node.Undefined;t=t.next)e.push(t.element);return e}};var r$=Object.defineProperty,rS=Object.getOwnPropertyDescriptor,rA=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),rL=e=>{throw TypeError(e)},rE=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?rS(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&r$(t,r,s),s};function rP(){return t??=null!=r?r():acquireVsCodeApi()}let rR=tP();function rO(){return`webview:${rR.next()}`}let rT=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=rP(),this._disposable=f.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(t){var r,o,i,s,a,c,h,p,u,f=[];try{if(i=t.data,"object"==typeof i&&null!==i&&r_ in i&&!0===i[r_])return;let a=t.data,c=((e,t,r)=>{if(null!=t){var o,i;"object"!=typeof t&&"function"!=typeof t&&rL("Object expected"),r&&(o=t[rA("asyncDispose")]),void 0===o&&(o=t[rA("dispose")],r&&(i=o)),"function"!=typeof o&&rL("Object not disposable"),i&&(o=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.push([r,o,t])}else r&&e.push([r]);return t})(f,function(t,r,o){var i,s;let a,c,h;if(!tS.enabled())return;let p=(i=o?.scope??!0,s=o?.scopeLabel,c=tM(),e=(h=tq(t,i,s)).scopeId,tT.set(h.scopeId,h),h[Symbol.dispose]=()=>{let t;t=h?.scopeId??e,null!=t&&tT.delete(t),e=c?.scopeId},h);if(!r)return p;let u="debug",f=!1;"object"==typeof r&&(u=r.level??u,a=r.message,f=!0===r.onlyExit);let g=tR();f||tB(p,u,a??"");let b=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=tO(g),t=` [${e}ms]`,r=p.getExitInfo(),o=r.failed??"completed";null!=r.failed?tS.error(null,p,`${o}${r.details??""}${t}`):tB(p,u,`${o}${r.details??""}${t}`),b()},p}(`(e=${a.id}|${a.method})`,void 0,{scope:tU()})),h=function(e,t,...r){let o=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??tL).enabled(o)?new Stopwatch(e,t,...r):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(a.compressed&&a.params instanceof Uint8Array){if("deflate"===a.compressed)try{a.params=rf((s=a.params,rd(s,{i:2},void 0,void 0)))}catch(e){a.params=rf(a.params)}else a.params=rf(a.params);h?.restart({message:`\u2022 decompressed (${a.compressed}) serialized params`})}if("string"==typeof a.params?(a.params=rC(a.params,e=>this.getResponsePromise(e.method,e.id)),h?.stop({message:"• deserialized params"})):null==a.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-a.timestamp}ms`),null!=a.completionId){let e=(r=a.method,o=a.completionId,`${r}|${o}`);this._pendingHandlers.get(e)?.(a);return}this._onReceiveMessage.fire(a)}catch(e){var g=e,b=!0}finally{a=g,c=b,h="function"==typeof SuppressedError?SuppressedError:function(e,t,r,o){return(o=Error(r)).name="SuppressedError",o.error=e,o.suppressed=t,o},p=e=>a=c?new h(e,a,"An error was suppressed during disposal"):(c=!0,e),(u=e=>{for(;e=f.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(u,e=>(p(e),u()))}catch(e){p(e)}if(c)throw a})()}}deserializeIpcData(e){return rC(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let r=rO();this.postMessage({id:r,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let r=rO(),o=this.getResponsePromise(e.response.method,r);return this.postMessage({id:r,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:r}),o}getResponsePromise(e,t){return new Promise((r,o)=>{var i,s;let a,c=(i=e,s=t,`${i}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),o(Error(`Timed out waiting for completion of ${c}`))},(tS.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tv.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>o(Error(t.reason))):queueMicrotask(()=>r(t.value))}else queueMicrotask(()=>r(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function rI(e,t){let r=Math.pow(10,t);return Math.round(e*r)/r}rE([rw({args:e=>({e:`${e.data.id}|${e.data.method}`})})],rT.prototype,"onMessageReceived",1),rE([rw({args:e=>({commandType:e.method})})],rT.prototype,"sendCommand",1),rE([rw({args:e=>({requestType:e.method})})],rT.prototype,"sendRequest",1),rE([rw({args:e=>({e:`${e.id}, method=${e.method}`})})],rT.prototype,"postMessage",1),rT=rE([(s=e=>`${e.appName}(HostIpc)`,e=>void tA.set(e,s))],rT);let RGBA=class RGBA{constructor(e,t,r,o=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,r)),this.a=rI(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,r,o){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rI(Math.max(Math.min(1,t),0),3),this.l=rI(Math.max(Math.min(1,r),0),3),this.a=rI(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,r=e.g/255,o=e.b/255,i=e.a,s=Math.max(t,r,o),a=Math.min(t,r,o),c=0,h=0,p=(a+s)/2,u=s-a;if(u>0){switch(h=Math.min(p<=.5?u/(2*p):u/(2-2*p),1),s){case t:c=(r-o)/u+6*(r<o);break;case r:c=(o-t)/u+2;break;case o:c=(t-r)/u+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,i)}static _hue2rgb(e,t,r){return(r<0&&(r+=1),r>1&&(r-=1),r<1/6)?e+(t-e)*6*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}static toRGBA(e){let t,r,o,i=e.h/360,{s,l:a,a:c}=e;if(0===s)t=r=o=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,i+1/3),r=HSLA._hue2rgb(c,e,i),o=HSLA._hue2rgb(c,e,i-1/3)}return new RGBA(Math.round(255*t),Math.round(255*r),Math.round(255*o),c)}};let HSVA=class HSVA{constructor(e,t,r,o){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rI(Math.max(Math.min(1,t),0),3),this.v=rI(Math.max(Math.min(1,r),0),3),this.a=rI(Math.max(Math.min(1,o),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,r=e.g/255,o=e.b/255,i=Math.max(t,r,o),s=i-Math.min(t,r,o);return new HSVA(Math.round(60*(0===s?0:i===t?((r-o)/s%6+6)%6:i===r?(o-t)/s+2:(t-r)/s+4)),0===i?0:s/i,i,e.a)}static toRGBA(e){let{h:t,s:r,v:o,a:i}=e,s=o*r,a=s*(1-Math.abs(t/60%2-1)),c=o-s,[h,p,u]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,u=a):t<240?(p=a,u=s):t<300?(h=a,u=s):t<=360&&(h=s,u=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),u=Math.round((u+c)*255),i)}};function rM(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(rM(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return rI(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),r=e.getRelativeLuminance();return t>r?(t+.05)/(r+.05):(r+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:r,b:o,a:i}=this.rgba;return new Color(new RGBA(t,r,o,i*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,r=this.rgba.a,o=t.a,i=r+o*(1-r);return i<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*r/i+t.r*o*(1-r)/i,this.rgba.g*r/i+t.g*o*(1-r)/i,this.rgba.b*r/i+t.b*o*(1-r)/i,i))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:r,b:o,a:i}=this.rgba;return new Color(new RGBA(e.rgba.r-i*(e.rgba.r-t),e.rgba.g-i*(e.rgba.g-r),e.rgba.b-i*(e.rgba.b-o),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let r=1-e.rgba.a;return new Color(new RGBA(r*t.rgba.r+e.rgba.a*e.rgba.r,r*t.rgba.g+e.rgba.a*e.rgba.g,r*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${rN(e.rgba.r)}${rN(e.rgba.g)}${rN(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,r){if(e.isLighterThan(t))return e;r=r||.5;let o=e.getRelativeLuminance(),i=t.getRelativeLuminance();return r=r*(i-o)/i,e.lighten(r)}static getDarkerColor(e,t,r){if(e.isDarkerThan(t))return e;r=r||.5;let o=e.getRelativeLuminance(),i=t.getRelativeLuminance();return r=r*(o-i)/o,e.darken(r)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rN(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let rz=new Emitter,rD=rz.event;function rj(e){let t=document.documentElement,r=window.getComputedStyle(t),o=document.body.classList,i=o.contains("vscode-light")||o.contains("vscode-high-contrast-light"),s=o.contains("vscode-high-contrast")||o.contains("vscode-high-contrast-light"),a=rM("--vscode-editor-background",r),c=rM("--vscode-editor-foreground",r);return c||(c=rM("--vscode-foreground",r)),{colors:{background:a,foreground:c},computedStyle:r,isLightTheme:i,isHighContrastTheme:s,isInitializing:null==e}}var rU=Object.defineProperty,rq=Object.getOwnPropertyDescriptor,rB=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?rq(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&rU(t,r,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tu(e)),r=t.webviewId,o=t.webviewInstanceId;this._webview={webviewId:r,webviewInstanceId:o,createCommandLink:(e,t)=>{var i;return e.endsWith(":")&&(e=`${e}${r.split(".").at(-1)}`),i=e,`command:${i}?${encodeURIComponent(JSON.stringify({webview:r,webviewInstance:o,...t}))}`}}}connectedCallback(){let e,t,r,o;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new rT(this.name);let i=rj();if(null!=this.onThemeUpdated){let e;this.onThemeUpdated(i),this.disposables.push(((e=new MutationObserver(e=>{rz.fire(rj(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),this.disposables.push(rD(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case tw.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case ty.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(r=0,o=function(e){let t,r,o,i,s,a,c,h,p,u,f=0,g="leading"===(a??="trailing")||"both"===a,b="trailing"===a||"both"===a;function m(){if(null!=t){f=Date.now();let r=t,i=u;return u=void 0,t=void 0,o=e.apply(i,r)}}function v(){null!=i&&(clearTimeout(i),i=void 0)}function w(){null!=s&&(clearTimeout(s),s=void 0)}function x(){v(),w(),u=void 0,t=void 0,r=void 0,f=0}function C(...e){if(h?.aborted)return;let a=Date.now();null!=p&&null!=t?t=p(t,e):(u=this,t=e);let w=null==i&&null==s;r=a,v();let _=Date.now();if(r=_,i=setTimeout(()=>{i=void 0,function e(){let t,o,s=Date.now();if(t=s-(r??0),o=s-f,null==r||t>=150||t<0||null!=c&&o>=c){b&&m(),x();return}i=setTimeout(()=>{i=void 0,e()},150-(s-(r??0)))}()},150),null!=c&&!s){0===f&&(f=_);let e=c-(_-f);e>0?s=setTimeout(()=>{s=void 0,b&&null!=t&&m(),f=Date.now()},e):(b&&null!=t&&m(),x())}return g&&w?m():o}return C.cancel=x,C.flush=function(){return v(),w(),m()},C.pending=function(){return null!=i||null!=s},h?.addEventListener("abort",x,{once:!0}),C}(e=>{let t=`webview:${++r}`;rP().postMessage({id:t,scope:tg.scope,method:tg.method,params:e,compressed:!1,timestamp:Date.now()})}),{onFocusIn:r=>{let i=r.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==i)&&(e=!0,t=i,o({focused:!0,inputFocused:i}))},onFocusOut:r=>{(!1!==e||!1!==t)&&(e=!1,t=!1,o({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return ef`<slot></slot>`}};rB([eL({type:String})],GlWebviewApp.prototype,"name",2),rB([eL({type:String})],GlWebviewApp.prototype,"placement",2),rB([eO({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rB([eO({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rB([eO({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rB([eO({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rB([eO({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[e8];var rH=Object.defineProperty,rF=Object.getOwnPropertyDescriptor;let GlAppHost=class GlAppHost extends GlWebviewApp{get state(){return this._stateProvider.state}connectedCallback(){super.connectedCallback();let e=this.bootstrap;this.bootstrap=void 0,this._stateProvider=this.createStateProvider(e,this._ipc,this._logger),this.initWebviewContext(e),this.disposables.push(this._stateProvider)}};((e,t,r,o)=>{for(var i,s=o>1?void 0:o?rF(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&rH(t,r,s)})([eL({type:String,noAccessor:!0})],GlAppHost.prototype,"bootstrap",2);let rG=$`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;$`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${rG}
	}
`;let rW=$`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,rV=$`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`;$`
	:focus-visible {
		${rW}
	}
`;let rZ=$`
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
`;$`
	* {
		box-sizing: border-box;
	}
`,$`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${rW}
	}
	a:hover {
		text-decoration: underline;
	}
`;let rK=$`
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
`;$`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;let rJ="welcome";new IpcCommand(rJ,"dismiss");let rY=new IpcNotification(rJ,"subscription/didChange"),rQ=new IpcNotification(rJ,"walkthroughProgress/didChange"),rX=new IpcNotification(rJ,"walkthrough/didFocus");let StateProviderBase=class StateProviderBase{constructor(e,t,r,o){this.host=e,this.ipc=r,this.logger=o,this._state=this.ipc.deserializeIpcData(tu(t)),this.logger?.debug(`bootstrap duration=${Date.now()-this._state.timestamp}ms`),this.provider=this.createContextProvider(this._state),this.onPersistState?.(this._state),this.disposable=this.ipc.onReceiveMessage(this.onMessageReceived.bind(this)),this.initializeState()}get state(){return this._state}get webviewId(){return this._state.webviewId}get webviewInstanceId(){return this._state.webviewInstanceId}get timestamp(){return this._state.timestamp}dispose(){this.disposable.dispose()}get deferBootstrap(){return!1}async initializeState(){if(this.deferBootstrap){let e=await this.ipc.sendRequest(tf,{bootstrap:!0});if(null!=e.state){let t=rv(e.state)?await e.state:e.state;this.onDeferredBootstrapStateReceived(t)}}else this.ipc.sendRequest(tf,{bootstrap:!1})}onDeferredBootstrapStateReceived(e){this._state={...e,timestamp:Date.now()},this.provider.setValue(this._state,!0),this.host.requestUpdate()}};let WelcomeStateProvider=class WelcomeStateProvider extends StateProviderBase{createContextProvider(e){return new context_provider_i(this.host,{context:"welcome-state",initialValue:e})}onMessageReceived(e){switch(!0){case rY.is(e):this._state.plusState=e.params.plusState,this._state.timestamp=Date.now(),this.provider.setValue(this._state,!0);break;case rQ.is(e):this._state.walkthroughProgress=e.params.walkthroughProgress,this._state.timestamp=Date.now(),this.provider.setValue(this._state,!0);break;case rX.is(e):this.host.dispatchEvent(new CustomEvent("gl-walkthrough-focus-command",{bubbles:!0,composed:!0}))}}};let r1=$`
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
`;var r0=((a=r0||{}).AngleBracketLeftHeavy="❰",a.AngleBracketRightHeavy="❱",a.ArrowBack="↩",a.ArrowDown="↓",a.ArrowDownUp="⇵",a.ArrowDropRight="⤷",a.ArrowHeadRight="➤",a.ArrowLeft="←",a.ArrowLeftDouble="⇐",a.ArrowLeftRight="↔",a.ArrowLeftRightDouble="⇔",a.ArrowLeftRightDoubleStrike="⇎",a.ArrowLeftRightLong="⟷",a.ArrowRight="→",a.ArrowRightDouble="⇒",a.ArrowRightHollow="⇨",a.ArrowUp="↑",a.ArrowUpDown="⇅",a.ArrowUpRight="↗",a.ArrowsHalfLeftRight="⇋",a.ArrowsHalfRightLeft="⇌",a.ArrowsLeftRight="⇆",a.ArrowsRightLeft="⇄",a.Asterisk="∗",a.Bullseye="◎",a.Check="✔",a.Dash="—",a.Dot="•",a.Ellipsis="…",a.EnDash="–",a.Envelope="✉",a.EqualsTriple="≡",a.Flag="⚑",a.FlagHollow="⚐",a.MiddleEllipsis="⋯",a.MuchLessThan="≪",a.MuchGreaterThan="≫",a.Pencil="✎",a.Space=" ",a.SpaceThin=" ",a.SpaceThinnest=" ",a.SquareWithBottomShadow="❏",a.SquareWithTopShadow="❐",a.Warning="⚠",a.ZeroWidthSpace="​",a);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var r2=((c=r2||{}).File="file",c.Git="git",c.GitHub="github",c.GitLens="gitlens",c.GitLensAIMarkdown="gitlens-ai-markdown",c.PRs="pr",c.Remote="vscode-remote",c.Vsls="vsls",c.VslsScc="vsls-scc",c.Virtual="vscode-vfs",c);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let r3="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",r5=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${r3}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${r3}`,graph:`https://gitkraken.com/solutions/commit-graph?${r3}`,launchpad:`https://gitkraken.com/solutions/launchpad?${r3}`,platform:`https://gitkraken.com/devex?${r3}`,pricing:`https://gitkraken.com/gitlens/pricing?${r3}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${r3}`,security:`https://help.gitkraken.com/gitlens/security?${r3}`,workspaces:`https://gitkraken.com/solutions/workspaces?${r3}`,cli:`https://gitkraken.com/cli?${r3}`,browserExtension:`https://gitkraken.com/browser-extension?${r3}`,desktop:`https://gitkraken.com/git-client?${r3}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${r3}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${r3}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${r3}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${r3}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${r3}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${r3}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${r3}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${r3}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${r3}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${r3}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${r3}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${r3}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${r3}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${r3}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${r3}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${r3}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${r3}`});var r6=((h=r6||{})[h.VerificationRequired=-1]="VerificationRequired",h[h.Community=0]="Community",h[h.DeprecatedPreview=1]="DeprecatedPreview",h[h.DeprecatedPreviewExpired=2]="DeprecatedPreviewExpired",h[h.Trial=3]="Trial",h[h.TrialExpired=4]="TrialExpired",h[h.TrialReactivationEligible=5]="TrialReactivationEligible",h[h.Paid=6]="Paid",h);function r4(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}let r7=$`
	:host {
		--accent-color: #cb64ff;
		--text-color: var(--vscode-sideBar-foreground);
		--dimmed-text-color: var(--vscode-descriptionForeground);
		--heading-color: var(--vscode-tab-activeForeground);
		--em-color: var(--vscode-sideBar-foreground);
		--link-color: var(--vscode-textLink-foreground);
		--card-background: color-mix(in srgb, var(--vscode-descriptionForeground) 13%, var(--color-view-background));

		--hero-gradient: radial-gradient(76.32% 76.32% at 50% 7.24%, #7b00ff 29.72%, rgba(255, 0, 242, 0) 100%);
		--trial-button-gradient: linear-gradient(90deg, #7900c9 0%, #196fff 100%);
		--trial-button-border: none;
		--trial-button-text-color: #fff;
	}

	:host-context(.vscode-light) {
		--hero-gradient: radial-gradient(62.4% 62.4% at 50% 7.24%, #7b00ff 29.72%, rgba(255, 0, 242, 0) 100%);
	}

	:host-context(.vscode-dark) {
		--hero-gradient: radial-gradient(76.32% 76.32% at 50% 7.24%, #7b00ff 29.72%, rgba(255, 0, 242, 0) 100%);
	}

	:host-context(.vscode-high-contrast) {
		--hero-gradient: transparent;
		--trial-button-gradient: var(--color-button-background);
		--trial-button-border: 1px solid var(--vscode-button-border);
		--trial-button-text-color: var(--color-button-foreground);
	}

	:host-context(.vscode-high-contrast-light) {
		--accent-color: #500070;
	}
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) {
		--accent-color: #ffc0ff;
	}
`,r8=$`
	:host {
		font-size: var(--vscode-editor-font-size);

		--h1-font-size: 1.7em;
		--p-font-size: 1.23em;
		--card-font-size: 1em;
	}

	@media (max-width: 640px) {
		:host {
			font-size: var(--vscode-editor-font-size);
			--h1-font-size: 1.2em;
			--p-font-size: 1em;
			--card-font-size: 1em;
		}
	}

	@media (max-width: 300px) {
		:host {
			font-size: calc(var(--vscode-editor-font-size) * 0.8);
		}
	}
`,r9=$`
	:host {
		--page-margin-left: 0px;
		--page-margin-right: 0px;
		display: block;
		height: 100%;
	}

	.welcome {
		max-height: 100%;
		overflow: auto;
		position: relative;
	}
`,oe=$`
	.welcome::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) translateY(-40%);
		z-index: -1;

		background: var(--hero-gradient);
		border-radius: 100%;
		opacity: 0.25;
		filter: blur(53px);

		width: 620px;
		height: 517px;
		max-width: 100%;
	}

	@media (max-width: 400px) {
		.welcome::before {
			height: 273px;
		}
	}
`,ot=$`
	.section {
		display: flex;
		flex-flow: column;
		justify-content: center;
		text-align: center;
		gap: 0.7em;
		margin: 0 auto;
		padding: 1em;
		max-width: 620px;
	}
	.section.section--centered {
		align-items: center;
	}
	.section h1 {
		color: var(--heading-color);
	}
	.section h2 {
		color: var(--heading-color);
		font-weight: normal;
		font-size: var(--p-font-size);
	}

	.section p {
		color: var(--text-color);
		font-size: var(--p-font-size);
	}
	.section > p {
		max-width: 30em;
	}
	.section > p:first-child {
		margin-top: 0;
	}
	.section > p:last-child {
		margin-bottom: 0;
	}

	.section .accent {
		color: var(--accent-color);
	}
	.section a {
		color: var(--link-color);
		text-decoration: none;
	}

	.section ul {
		color: var(--text-color);
		font-size: var(--p-font-size);
	}

	.section gl-button.start-trial-button {
		background: var(--trial-button-gradient);
		border: var(--trial-button-border);
		color: var(--trial-button-text-color);
	}
	.section gl-button {
		--button-width: 100%;
	}

	@media (min-width: 400px) {
		.section gl-button {
			--button-width: initial;
		}
		.section gl-button {
			--button-padding: 0.4em 4em;
		}
	}
`,or=$`
	.section.header {
		align-items: center;
	}
	.header {
		max-width: 620px;
		margin-left: auto;
		margin-right: auto;
	}
	.header gitlens-logo-circle {
		height: calc(46px * 0.6);
		width: 0;
		transform: scale(0.6) translate(calc(-46px), calc(-46px * 0.2));
		margin-right: 0.4em;
		vertical-align: top;
	}
	.header h1 {
		margin: 0;
		font-size: var(--h1-font-size);
	}
	.header h1 + p {
		margin-top: 0;
	}

	@media (max-width: 640px) {
		.header gitlens-logo-circle {
			height: calc(46px * 0.5);
			transform: scale(0.5) translate(calc(-46px), calc(-46px * 0.25 - 2px));
			margin-right: 0.3em;
		}
	}

	@media (max-width: 300px) {
		.header gitlens-logo-circle {
			height: calc(46px * 0.4);
			transform: scale(0.4) translate(calc(-46px), calc(-46px * 0.3 - 4px));
			margin-right: 0.2em;
		}
	}
`,oo=$`
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.7em;
		border-radius: 0.63em;
		background-color: var(--card-background);
		padding: 1.5em;
		text-align: initial;
	}

	.card-part--centered {
		margin: auto;
		align-items: center;
		text-align: center;
	}

	gl-walkthrough-step.card::part(header) {
		padding: 1.5em;
		margin: -1.5em;
	}

	@media (max-width: 400px) {
		.card-part--centered {
			margin: 0;
		}
	}

	@media (max-width: 300px) {
		.card {
			padding: 1em;
		}
		gl-walkthrough-step.card::part(header) {
			padding: 1em;
			margin: -1em;
		}
	}

	.card h1 {
		margin: 0;
		font-size: var(--card-font-size);
	}

	.card p {
		margin: 0.5em 0 0;
		font-size: var(--card-font-size);
	}

	.card p:last-child {
		margin: 1em 0 0;
	}

	.card ul {
		text-align: initial;
		padding-inline-start: 1em;
		margin: 0.5em 0 0;
		font-size: var(--card-font-size);
	}

	.card img {
		max-width: 100%;
	}

	p.card-part--tip {
		color: var(--dimmed-text-color);
	}
	p.card-part--tip em {
		color: var(--em-color);
		font-style: normal;
	}

	gl-walkthrough-step.card {
		text-align: left;
	}
`,oi=$`
	gl-scrollable-features {
		--side-shadow-padding: max(var(--page-margin-left), var(--page-margin-right));
		--side-shadow-color: var(--page-background-color);
	}
`,on=$`
	${r7} ${r8} ${r9}
	${oe} ${ot} ${or}
	${oi}
	${oo}
`;var os=Object.defineProperty,oa=Object.getOwnPropertyDescriptor;let ol=class extends lit_element_i{render(){return ef`<svg
			alt="GitLens"
			width="46"
			height="46"
			viewBox="0 0 46 46"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="23" cy="23" r="23" fill="#04090D" />
			<circle cx="23" cy="23" r="23" fill="url(#paint0_linear_43_72231)" />
			<circle cx="23" cy="23" r="23" fill="url(#paint1_radial_43_72231)" />
			<circle cx="23" cy="23" r="23" fill="url(#paint2_radial_43_72231)" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M23 45.0272C35.1653 45.0272 45.0272 35.1653 45.0272 23C45.0272 10.8347 35.1653 0.97281 23 0.97281C10.8347 0.97281 0.97281 10.8347 0.97281 23C0.97281 35.1653 10.8347 45.0272 23 45.0272ZM23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46Z"
				fill="white"
				style="mix-blend-mode:soft-light"
			/>
			<mask id="path-3-inside-1_43_72231" fill="white">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M23.7041 11.4729C23.9472 12.1964 23.9225 12.949 23.6825 13.6317C24.3067 14.1892 24.9927 14.8352 25.7364 15.5815C27.588 17.4394 28.8416 18.9594 29.656 20.0599C30.0572 19.9115 30.4909 19.8304 30.9435 19.8304C32.9992 19.8304 34.6656 21.5026 34.6656 23.5653C34.6656 25.628 32.9992 27.3002 30.9435 27.3002C28.8879 27.3002 27.2214 25.628 27.2214 23.5653C27.2214 22.6041 27.5833 21.7277 28.1778 21.0658C27.371 20.0286 26.204 18.6439 24.5714 16.9401C23.9124 16.2524 23.2877 15.641 22.7043 15.0996C22.3317 15.4388 21.881 15.7102 21.3681 15.8837C21.1476 15.9583 20.9254 16.0115 20.7039 16.0445C20.574 17.5426 20.4653 19.5952 20.4653 22.2681C20.4653 26.1145 20.6904 28.6762 20.8797 30.15C21.4 30.21 21.9245 30.3776 22.4173 30.6606C24.1985 31.6832 24.8932 33.826 23.969 35.4466C23.0449 37.0672 20.8519 37.552 19.0708 36.5294C17.2897 35.5067 16.595 33.3639 17.5191 31.7433C17.8825 31.1061 18.4421 30.6444 19.0957 30.381C18.8672 29.0854 18.6075 26.6547 18.6075 22.2997C18.6075 19.3649 18.7255 17.295 18.8723 15.8552C17.9399 15.5066 17.1791 14.7792 16.8475 13.7923C16.2443 11.9967 17.2902 10.0219 19.1835 9.38139C21.0769 8.74091 23.1009 9.6773 23.7041 11.4729Z"
				/>
			</mask>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M23.7041 11.4729C23.9472 12.1964 23.9225 12.949 23.6825 13.6317C24.3067 14.1892 24.9927 14.8352 25.7364 15.5815C27.588 17.4394 28.8416 18.9594 29.656 20.0599C30.0572 19.9115 30.4909 19.8304 30.9435 19.8304C32.9992 19.8304 34.6656 21.5026 34.6656 23.5653C34.6656 25.628 32.9992 27.3002 30.9435 27.3002C28.8879 27.3002 27.2214 25.628 27.2214 23.5653C27.2214 22.6041 27.5833 21.7277 28.1778 21.0658C27.371 20.0286 26.204 18.6439 24.5714 16.9401C23.9124 16.2524 23.2877 15.641 22.7043 15.0996C22.3317 15.4388 21.881 15.7102 21.3681 15.8837C21.1476 15.9583 20.9254 16.0115 20.7039 16.0445C20.574 17.5426 20.4653 19.5952 20.4653 22.2681C20.4653 26.1145 20.6904 28.6762 20.8797 30.15C21.4 30.21 21.9245 30.3776 22.4173 30.6606C24.1985 31.6832 24.8932 33.826 23.969 35.4466C23.0449 37.0672 20.8519 37.552 19.0708 36.5294C17.2897 35.5067 16.595 33.3639 17.5191 31.7433C17.8825 31.1061 18.4421 30.6444 19.0957 30.381C18.8672 29.0854 18.6075 26.6547 18.6075 22.2997C18.6075 19.3649 18.7255 17.295 18.8723 15.8552C17.9399 15.5066 17.1791 14.7792 16.8475 13.7923C16.2443 11.9967 17.2902 10.0219 19.1835 9.38139C21.0769 8.74091 23.1009 9.6773 23.7041 11.4729Z"
				fill="url(#paint3_linear_43_72231)"
			/>
			<path
				d="M23.6825 13.6317L22.7391 13.3001L22.517 13.9317L23.0164 14.3776L23.6825 13.6317ZM23.7041 11.4729L24.652 11.1544L23.7041 11.4729ZM25.7364 15.5815L25.0281 16.2874V16.2874L25.7364 15.5815ZM29.656 20.0599L28.8521 20.6547L29.2988 21.2583L30.003 20.9978L29.656 20.0599ZM28.1778 21.0658L28.9218 21.734L29.4805 21.1119L28.9671 20.4518L28.1778 21.0658ZM24.5714 16.9401L23.8494 17.632V17.632L24.5714 16.9401ZM22.7043 15.0996L23.3845 14.3666L22.7107 13.7413L22.031 14.3601L22.7043 15.0996ZM21.3681 15.8837L21.6885 16.831L21.6885 16.831L21.3681 15.8837ZM20.7039 16.0445L20.5567 15.0553L19.7758 15.1715L19.7076 15.9581L20.7039 16.0445ZM20.8797 30.15L19.8878 30.2774L19.9875 31.0538L20.7651 31.1434L20.8797 30.15ZM22.4173 30.6606L21.9194 31.5278H21.9194L22.4173 30.6606ZM23.969 35.4466L23.1004 34.9512L23.969 35.4466ZM19.0708 36.5294L19.5687 35.6621L19.0708 36.5294ZM17.5191 31.7433L18.3878 32.2387H18.3878L17.5191 31.7433ZM19.0957 30.381L19.4695 31.3085L20.2212 31.0056L20.0805 30.2074L19.0957 30.381ZM18.8723 15.8552L19.8671 15.9566L19.9454 15.1888L19.2225 14.9185L18.8723 15.8552ZM16.8475 13.7923L15.8996 14.1107L16.8475 13.7923ZM24.6259 13.9634C24.9355 13.0825 24.97 12.1009 24.652 11.1544L22.7562 11.7913C22.9243 12.2919 22.9094 12.8155 22.7391 13.3001L24.6259 13.9634ZM26.4448 14.8756C25.6877 14.116 24.9877 13.4565 24.3485 12.8858L23.0164 14.3776C23.6258 14.9218 24.2977 15.5545 25.0281 16.2874L26.4448 14.8756ZM30.4598 19.4651C29.6154 18.3239 28.3296 16.7669 26.4448 14.8756L25.0281 16.2874C26.8464 18.1119 28.0679 19.5949 28.8521 20.6547L30.4598 19.4651ZM30.9435 18.8304C30.3707 18.8304 29.8196 18.9331 29.309 19.122L30.003 20.9978C30.2948 20.8898 30.6112 20.8304 30.9435 20.8304V18.8304ZM35.6656 23.5653C35.6656 20.9535 33.5547 18.8304 30.9435 18.8304V20.8304C32.4437 20.8304 33.6656 22.0516 33.6656 23.5653H35.6656ZM30.9435 28.3002C33.5547 28.3002 35.6656 26.1771 35.6656 23.5653H33.6656C33.6656 25.079 32.4437 26.3002 30.9435 26.3002V28.3002ZM26.2214 23.5653C26.2214 26.1771 28.3323 28.3002 30.9435 28.3002V26.3002C29.4434 26.3002 28.2214 25.079 28.2214 23.5653H26.2214ZM27.4338 20.3976C26.6806 21.2362 26.2214 22.3484 26.2214 23.5653H28.2214C28.2214 22.8598 28.486 22.2192 28.9218 21.734L27.4338 20.3976ZM23.8494 17.632C25.4595 19.3123 26.6038 20.671 27.3884 21.6798L28.9671 20.4518C28.1382 19.3862 26.9486 17.9756 25.2934 16.2483L23.8494 17.632ZM22.024 15.8325C22.5932 16.3607 23.2039 16.9585 23.8494 17.632L25.2934 16.2483C24.6208 15.5464 23.9822 14.9212 23.3845 14.3666L22.024 15.8325ZM21.6885 16.831C22.3336 16.6128 22.9041 16.27 23.3775 15.839L22.031 14.3601C21.7593 14.6076 21.4283 14.8077 21.0476 14.9365L21.6885 16.831ZM20.851 17.0336C21.1313 16.9919 21.4115 16.9247 21.6885 16.831L21.0476 14.9365C20.8838 14.9919 20.7195 15.0311 20.5567 15.0553L20.851 17.0336ZM21.4653 22.2681C21.4653 19.6222 21.5729 17.5986 21.7001 16.1308L19.7076 15.9581C19.5751 17.4867 19.4653 19.5681 19.4653 22.2681H21.4653ZM21.8715 30.0227C21.6881 28.5945 21.4653 26.0756 21.4653 22.2681H19.4653C19.4653 26.1534 19.6927 28.7578 19.8878 30.2774L21.8715 30.0227ZM20.7651 31.1434C21.1508 31.1879 21.5448 31.3127 21.9194 31.5278L22.9153 29.7933C22.3041 29.4425 21.6492 29.2321 20.9942 29.1566L20.7651 31.1434ZM21.9194 31.5278C23.3025 32.3219 23.7079 33.8857 23.1004 34.9512L24.8377 35.9419C26.0784 33.7662 25.0944 31.0445 22.9153 29.7933L21.9194 31.5278ZM23.1004 34.9512C22.4943 36.0141 20.9505 36.4555 19.5687 35.6621L18.5729 37.3966C20.7533 38.6485 23.5955 38.1204 24.8377 35.9419L23.1004 34.9512ZM19.5687 35.6621C18.1856 34.868 17.7802 33.3042 18.3878 32.2387L16.6504 31.248C15.4097 33.4237 16.3938 36.1454 18.5729 37.3966L19.5687 35.6621ZM18.3878 32.2387C18.6319 31.8105 19.01 31.4937 19.4695 31.3085L18.7218 29.4535C17.8741 29.7952 17.133 30.4016 16.6504 31.248L18.3878 32.2387ZM17.6075 22.2997C17.6075 26.6892 17.8689 29.1823 18.1108 30.5546L20.0805 30.2074C19.8656 28.9885 19.6075 26.6202 19.6075 22.2997H17.6075ZM17.8775 15.7537C17.7264 17.2346 17.6075 19.3393 17.6075 22.2997H19.6075C19.6075 19.3905 19.7245 17.3553 19.8671 15.9566L17.8775 15.7537ZM15.8996 14.1107C16.3345 15.4053 17.33 16.3461 18.5221 16.7919L19.2225 14.9185C18.5498 14.667 18.0237 14.1531 17.7955 13.4738L15.8996 14.1107ZM18.8631 8.43412C16.4958 9.23492 15.1049 11.7452 15.8996 14.1107L17.7955 13.4738C17.3837 12.2482 18.0845 10.8088 19.504 10.3287L18.8631 8.43412ZM24.652 11.1544C23.8567 8.78703 21.2317 7.6329 18.8631 8.43412L19.504 10.3287C20.9222 9.84892 22.345 10.5676 22.7562 11.7913L24.652 11.1544Z"
				fill="white"
				style="mix-blend-mode:soft-light"
				mask="url(#path-3-inside-1_43_72231)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_43_72231"
					x1="-5.14199"
					y1="15.148"
					x2="35.1957"
					y2="53.4671"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#F1C6FF" />
					<stop offset="0.104167" stop-color="#DD74FF" />
					<stop offset="0.352245" stop-color="#DD74FF" stop-opacity="0" />
					<stop offset="0.62022" stop-color="#4E032E" stop-opacity="0" />
					<stop offset="0.825426" stop-color="#3C17A7" />
					<stop offset="1" stop-color="#3687FF" />
				</linearGradient>
				<radialGradient
					id="paint1_radial_43_72231"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(51.1591 15.2989) rotate(138.744) scale(31.2464 31.2515)"
				>
					<stop stop-color="#00A3FF" />
					<stop offset="1" stop-color="#00A3FF" stop-opacity="0" />
				</radialGradient>
				<radialGradient
					id="paint2_radial_43_72231"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(-2.91103 29.7569) rotate(42.9991) scale(28.6895 28.728)"
				>
					<stop stop-color="#00A3FF" />
					<stop offset="1" stop-color="#0D1017" stop-opacity="0" />
				</radialGradient>
				<linearGradient
					id="paint3_linear_43_72231"
					x1="23.4169"
					y1="14.5226"
					x2="41.2576"
					y2="49.9689"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#B7E1FF" stop-opacity="0.58" />
				</linearGradient>
			</defs>
		</svg>`}};ol.styles=[$`
			:host {
				display: inline-block;
				vertical-align: middle;
				position: relative;
			}

			:host::after {
				content: ' ';
				display: block;
				width: 100%;
				height: 100%;
				background-color: red;
				visibility: hidden;
				position: absolute;
				top: 0;
				left: 0;
			}

			:host-context(.vscode-high-contrast-light) .letters,
			:host-context(.vscode-light) .letters {
				fill: var(--color-foreground);
			}

			svg {
				display: block;
			}
		`],ol=((e,t,r,o)=>{for(var i,s=o>1?void 0:o?oa(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&os(t,r,s),s})([eS("gitlens-logo-circle")],ol);var oc=Object.defineProperty,od=Object.defineProperties,oh=Object.getOwnPropertyDescriptor,op=Object.getOwnPropertyDescriptors,ou=Object.getOwnPropertySymbols,of=Object.prototype.hasOwnProperty,og=Object.prototype.propertyIsEnumerable,ob=e=>{throw TypeError(e)},om=(e,t,r)=>t in e?oc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ov=(e,t)=>{for(var r in t||(t={}))of.call(t,r)&&om(e,r,t[r]);if(ou)for(var r of ou(t))og.call(t,r)&&om(e,r,t[r]);return e},ow=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?oh(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&oc(t,r,s),s},oy=(e,t,r)=>t.has(e)||ob("Cannot "+r),ox=new Map,oC=new WeakMap;function o_(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function ok(e,t){ox.set(e,null!=t?t:{keyframes:[],options:{duration:0}})}function o$(e,t,r){let o=oC.get(e);if(null==o?void 0:o[t])return o_(o[t],r.dir);let i=ox.get(t);return i?o_(i,r.dir):{keyframes:[],options:{duration:0}}}let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=em,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===em||null==e)return this._t=void 0,this.it=e;if(e===eb)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let oS=e9(unsafe_html_e);var oA=$`
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
`,oL=$`
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
`;let oE=new Set,oP=new Map,oR="ltr",oO="en",oT="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(oT){let e=new MutationObserver(oM);oR=document.documentElement.dir||"ltr",oO=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function oI(...e){e.map(e=>{let t=e.$code.toLowerCase();oP.has(t)?oP.set(t,Object.assign(Object.assign({},oP.get(t)),e)):oP.set(t,e),o||(o=e)}),oM()}function oM(){oT&&(oR=document.documentElement.dir||"ltr",oO=document.documentElement.lang||navigator.language),[...oE.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){oE.add(this.host)}hostDisconnected(){oE.delete(this.host)}dir(){return`${this.host.dir||oR}`.toLowerCase()}lang(){return`${this.host.lang||oO}`.toLowerCase()}getTranslationData(e){var t,r;let o=new Intl.Locale(e.replace(/_/g,"-")),i=null==o?void 0:o.language.toLowerCase(),s=null!=(r=null==(t=null==o?void 0:o.region)?void 0:t.toLowerCase())?r:"",a=oP.get(`${i}-${s}`),c=oP.get(i);return{locale:o,language:i,region:s,primary:a,secondary:c}}exists(e,t){var r;let{primary:i,secondary:s}=this.getTranslationData(null!=(r=t.lang)?r:this.lang());return t=Object.assign({includeFallback:!1},t),!!i&&!!i[e]||!!s&&!!s[e]||!!t.includeFallback&&!!o&&!!o[e]}term(e,...t){let r,{primary:i,secondary:s}=this.getTranslationData(this.lang());if(i&&i[e])r=i[e];else if(s&&s[e])r=s[e];else{if(!o||!o[e])return String(e);r=o[e]}return"function"==typeof r?r(...t):r}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,t)}};var oN={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};oI(oN);var oz=class extends LocalizeController{};oI(oN);var oD=$`
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
`,oj=class extends lit_element_i{constructor(){let e;super(),(e=b).has(this)?ob("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){let r=new CustomEvent(e,ov({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(r),r}static define(e,t=this,r={}){let o=customElements.get(e);if(!o){try{customElements.define(e,t,r)}catch(o){customElements.define(e,class extends t{},r)}return}let i=" (unknown version)";"version"in t&&t.version&&(i=" v"+t.version),"version"in o&&o.version&&o.version}attributeChangedCallback(e,t,r){let o,i;if(oy(this,o=b,"read from private field"),i?!i.call(this):!o.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),oy(this,e=b,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,r)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,r)=>{e.has(r)&&null==this[r]&&(this[r]=t)})}};b=new WeakMap,oj.version="2.20.1",oj.dependencies={},ow([eL()],oj.prototype,"dir",2),ow([eL()],oj.prototype,"lang",2);let oU=Math.min,oq=Math.max,oB=Math.round,oH=Math.floor,oF=e=>({x:e,y:e}),oG={left:"right",right:"left",bottom:"top",top:"bottom"};function oW(e,t){return"function"==typeof e?e(t):e}function oV(e){return e.split("-")[0]}function oZ(e){return e.split("-")[1]}function oK(e){return"x"===e?"y":"x"}function oJ(e){return"y"===e?"height":"width"}function oY(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function oQ(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let oX=["left","right"],o1=["right","left"],o0=["top","bottom"],o2=["bottom","top"];function o3(e){let t=oV(e);return oG[t]+e.slice(t.length)}function o5(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function o6(e){let{x:t,y:r,width:o,height:i}=e;return{width:o,height:i,top:r,left:t,right:t+o,bottom:r+i,x:t,y:r}}function o4(e,t,r){let o,{reference:i,floating:s}=e,a=oY(t),c=oK(oY(t)),h=oJ(c),p=oV(t),u="y"===a,f=i.x+i.width/2-s.width/2,g=i.y+i.height/2-s.height/2,b=i[h]/2-s[h]/2;switch(p){case"top":o={x:f,y:i.y-s.height};break;case"bottom":o={x:f,y:i.y+i.height};break;case"right":o={x:i.x+i.width,y:g};break;case"left":o={x:i.x-s.width,y:g};break;default:o={x:i.x,y:i.y}}switch(oZ(t)){case"start":o[c]-=b*(r&&u?-1:1);break;case"end":o[c]+=b*(r&&u?-1:1)}return o}async function o7(e,t){var r;void 0===t&&(t={});let{x:o,y:i,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:u="viewport",elementContext:f="floating",altBoundary:g=!1,padding:b=0}=oW(t,e),m=o5(b),v=c[g?"floating"===f?"reference":"floating":f],w=o6(await s.getClippingRect({element:null==(r=await (null==s.isElement?void 0:s.isElement(v)))||r?v:v.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:u,strategy:h})),x="floating"===f?{x:o,y:i,width:a.floating.width,height:a.floating.height}:a.reference,C=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),_=await (null==s.isElement?void 0:s.isElement(C))&&await (null==s.getScale?void 0:s.getScale(C))||{x:1,y:1},$=o6(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:C,strategy:h}):x);return{top:(w.top-$.top+m.top)/_.y,bottom:($.bottom-w.bottom+m.bottom)/_.y,left:(w.left-$.left+m.left)/_.x,right:($.right-w.right+m.right)/_.x}}let o8=async(e,t,r)=>{let{placement:o="bottom",strategy:i="absolute",middleware:s=[],platform:a}=r,c=a.detectOverflow?a:{...a,detectOverflow:o7},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:f}=o4(p,o,h),g=o,b=0,m={};for(let r=0;r<s.length;r++){let v=s[r];if(!v)continue;let{name:w,fn:x}=v,{x:C,y:_,data:$,reset:S}=await x({x:u,y:f,initialPlacement:o,placement:g,strategy:i,middlewareData:m,rects:p,platform:c,elements:{reference:e,floating:t}});u=null!=C?C:u,f=null!=_?_:f,m[w]={...m[w],...$},S&&b<50&&(b++,"object"==typeof S&&(S.placement&&(g=S.placement),S.rects&&(p=!0===S.rects?await a.getElementRects({reference:e,floating:t,strategy:i}):S.rects),{x:u,y:f}=o4(p,g,h)),r=-1)}return{x:u,y:f,placement:g,strategy:i,middlewareData:m}},o9=new Set(["left","top"]);async function ie(e,t){let{placement:r,platform:o,elements:i}=e,s=await (null==o.isRTL?void 0:o.isRTL(i.floating)),a=oV(r),c=oZ(r),h="y"===oY(r),p=o9.has(a)?-1:1,u=s&&h?-1:1,f=oW(t,e),{mainAxis:g,crossAxis:b,alignmentAxis:m}="number"==typeof f?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return c&&"number"==typeof m&&(b="end"===c?-1*m:m),h?{x:b*u,y:g*p}:{x:g*p,y:b*u}}function it(){return"u">typeof window}function ir(e){return is(e)?(e.nodeName||"").toLowerCase():"#document"}function io(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function ii(e){var t;return null==(t=(is(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function is(e){return!!it()&&(e instanceof Node||e instanceof io(e).Node)}function ia(e){return!!it()&&(e instanceof Element||e instanceof io(e).Element)}function il(e){return!!it()&&(e instanceof HTMLElement||e instanceof io(e).HTMLElement)}function ic(e){return!(!it()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof io(e).ShadowRoot)}function id(e){let{overflow:t,overflowX:r,overflowY:o,display:i}=iw(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+r)&&"inline"!==i&&"contents"!==i}function ih(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let ip=/transform|translate|scale|rotate|perspective|filter/,iu=/paint|layout|strict|content/,ig=e=>!!e&&"none"!==e;function ib(e){let t=ia(e)?iw(e):e;return ig(t.transform)||ig(t.translate)||ig(t.scale)||ig(t.rotate)||ig(t.perspective)||!im()&&(ig(t.backdropFilter)||ig(t.filter))||ip.test(t.willChange||"")||iu.test(t.contain||"")}function im(){return null==i&&(i="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),i}function iv(e){return/^(html|body|#document)$/.test(ir(e))}function iw(e){return io(e).getComputedStyle(e)}function iy(e){return ia(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ix(e){if("html"===ir(e))return e;let t=e.assignedSlot||e.parentNode||ic(e)&&e.host||ii(e);return ic(t)?t.host:t}function iC(e,t,r){var o;void 0===t&&(t=[]),void 0===r&&(r=!0);let i=function e(t){let r=ix(t);return iv(r)?t.ownerDocument?t.ownerDocument.body:t.body:il(r)&&id(r)?r:e(r)}(e),s=i===(null==(o=e.ownerDocument)?void 0:o.body),a=io(i);if(!s)return t.concat(i,iC(i,[],r));{let e=i_(a);return t.concat(a,a.visualViewport||[],id(i)?i:[],e&&r?iC(e):[])}}function i_(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function ik(e){let t=iw(e),r=parseFloat(t.width)||0,o=parseFloat(t.height)||0,i=il(e),s=i?e.offsetWidth:r,a=i?e.offsetHeight:o,c=oB(r)!==s||oB(o)!==a;return c&&(r=s,o=a),{width:r,height:o,$:c}}function i$(e){return ia(e)?e:e.contextElement}function iS(e){let t=i$(e);if(!il(t))return oF(1);let r=t.getBoundingClientRect(),{width:o,height:i,$:s}=ik(t),a=(s?oB(r.width):r.width)/o,c=(s?oB(r.height):r.height)/i;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let iA=oF(0);function iL(e){let t=io(e);return im()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:iA}function iE(e,t,r,o){var i;void 0===t&&(t=!1),void 0===r&&(r=!1);let s=e.getBoundingClientRect(),a=i$(e),c=oF(1);t&&(o?ia(o)&&(c=iS(o)):c=iS(e));let h=(void 0===(i=r)&&(i=!1),o&&(!i||o===io(a))&&i)?iL(a):oF(0),p=(s.left+h.x)/c.x,u=(s.top+h.y)/c.y,f=s.width/c.x,g=s.height/c.y;if(a){let e=io(a),t=o&&ia(o)?io(o):o,r=e,i=i_(r);for(;i&&o&&t!==r;){let e=iS(i),t=i.getBoundingClientRect(),o=iw(i),s=t.left+(i.clientLeft+parseFloat(o.paddingLeft))*e.x,a=t.top+(i.clientTop+parseFloat(o.paddingTop))*e.y;p*=e.x,u*=e.y,f*=e.x,g*=e.y,p+=s,u+=a,i=i_(r=io(i))}}return o6({width:f,height:g,x:p,y:u})}function iP(e,t){let r=iy(e).scrollLeft;return t?t.left+r:iE(ii(e)).left+r}function iR(e,t){let r=e.getBoundingClientRect();return{x:r.left+t.scrollLeft-iP(e,r),y:r.top+t.scrollTop}}function iO(e,t,r){var o;let i;if("viewport"===t)i=function(e,t){let r=io(e),o=ii(e),i=r.visualViewport,s=o.clientWidth,a=o.clientHeight,c=0,h=0;if(i){s=i.width,a=i.height;let e=im();(!e||e&&"fixed"===t)&&(c=i.offsetLeft,h=i.offsetTop)}let p=iP(o);if(p<=0){let e=o.ownerDocument,t=e.body,r=getComputedStyle(t),i="CSS1Compat"===e.compatMode&&parseFloat(r.marginLeft)+parseFloat(r.marginRight)||0,a=Math.abs(o.clientWidth-t.clientWidth-i);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,r);else if("document"===t){let t,r,s,a,c,h,p;o=ii(e),t=ii(o),r=iy(o),s=o.ownerDocument.body,a=oq(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=oq(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-r.scrollLeft+iP(o),p=-r.scrollTop,"rtl"===iw(s).direction&&(h+=oq(t.clientWidth,s.clientWidth)-a),i={width:a,height:c,x:h,y:p}}else if(ia(t)){let e,o,s,a,c,h;o=(e=iE(t,!0,"fixed"===r)).top+t.clientTop,s=e.left+t.clientLeft,a=il(t)?iS(t):oF(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,i={width:c,height:h,x:s*a.x,y:o*a.y}}else{let r=iL(e);i={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return o6(i)}function iT(e){return"static"===iw(e).position}function iI(e,t){if(!il(e)||"fixed"===iw(e).position)return null;if(t)return t(e);let r=e.offsetParent;return ii(e)===r&&(r=r.ownerDocument.body),r}function iM(e,t){var r;let o=io(e);if(ih(e))return o;if(!il(e)){let t=ix(e);for(;t&&!iv(t);){if(ia(t)&&!iT(t))return t;t=ix(t)}return o}let i=iI(e,t);for(;i&&(r=i,/^(table|td|th)$/.test(ir(r)))&&iT(i);)i=iI(i,t);return i&&iv(i)&&iT(i)&&!ib(i)?o:i||function(e){let t=ix(e);for(;il(t)&&!iv(t);){if(ib(t))return t;if(ih(t))break;t=ix(t)}return null}(e)||o}let iN=async function(e){let t=this.getOffsetParent||iM,r=this.getDimensions,o=await r(e.floating);return{reference:function(e,t,r){let o=il(t),i=ii(t),s="fixed"===r,a=iE(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=oF(0);if(o||!o&&!s)if(("body"!==ir(t)||id(i))&&(c=iy(t)),o){let e=iE(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else i&&(h.x=iP(i));s&&!o&&i&&(h.x=iP(i));let p=!i||o||s?oF(0):iR(i,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},iz={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:r,offsetParent:o,strategy:i}=e,s="fixed"===i,a=ii(o),c=!!t&&ih(t.floating);if(o===a||c&&s)return r;let h={scrollLeft:0,scrollTop:0},p=oF(1),u=oF(0),f=il(o);if((f||!f&&!s)&&(("body"!==ir(o)||id(a))&&(h=iy(o)),f)){let e=iE(o);p=iS(o),u.x=e.x+o.clientLeft,u.y=e.y+o.clientTop}let g=!a||f||s?oF(0):iR(a,h);return{width:r.width*p.x,height:r.height*p.y,x:r.x*p.x-h.scrollLeft*p.x+u.x+g.x,y:r.y*p.y-h.scrollTop*p.y+u.y+g.y}},getDocumentElement:ii,getClippingRect:function(e){let{element:t,boundary:r,rootBoundary:o,strategy:i}=e,s=[..."clippingAncestors"===r?ih(t)?[]:function(e,t){let r=t.get(e);if(r)return r;let o=iC(e,[],!1).filter(e=>ia(e)&&"body"!==ir(e)),i=null,s="fixed"===iw(e).position,a=s?ix(e):e;for(;ia(a)&&!iv(a);){let t=iw(a),r=ib(a);r||"fixed"!==t.position||(i=null),(s?r||i:!(!r&&"static"===t.position&&i&&("absolute"===i.position||"fixed"===i.position)||id(a)&&!r&&function e(t,r){let o=ix(t);return!(o===r||!ia(o)||iv(o))&&("fixed"===iw(o).position||e(o,r))}(e,a)))?i=t:o=o.filter(e=>e!==a),a=ix(a)}return t.set(e,o),o}(t,this._c):[].concat(r),o],a=iO(t,s[0],i),c=a.top,h=a.right,p=a.bottom,u=a.left;for(let e=1;e<s.length;e++){let r=iO(t,s[e],i);c=oq(r.top,c),h=oU(r.right,h),p=oU(r.bottom,p),u=oq(r.left,u)}return{width:h-u,height:p-c,x:u,y:c}},getOffsetParent:iM,getElementRects:iN,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:r}=ik(e);return{width:t,height:r}},getScale:iS,isElement:ia,isRTL:function(e){return"rtl"===iw(e).direction}};function iD(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let ij=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var r,o;let i,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:u=()=>{},...f}=oW(e,t),g=await h.detectOverflow(t,f),b=oV(a),m=oZ(a),v="y"===oY(a),{width:w,height:x}=c.floating;"top"===b||"bottom"===b?(i=b,s=m===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=b,i="end"===m?"top":"bottom");let C=x-g.top-g.bottom,_=w-g.left-g.right,$=oU(x-g[i],C),S=oU(w-g[s],_),A=!t.middlewareData.shift,E=$,P=S;if(null!=(r=t.middlewareData.shift)&&r.enabled.x&&(P=_),null!=(o=t.middlewareData.shift)&&o.enabled.y&&(E=C),A&&!m){let e=oq(g.left,0),t=oq(g.right,0),r=oq(g.top,0),o=oq(g.bottom,0);v?P=w-2*(0!==e||0!==t?e+t:oq(g.left,g.right)):E=x-2*(0!==r||0!==o?r+o:oq(g.top,g.bottom))}await u({...t,availableWidth:P,availableHeight:E});let O=await h.getDimensions(p.floating);return w!==O.width||x!==O.height?{reset:{rects:!0}}:{}}}},iU=e9(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let r in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let r=e.element.classList;for(let e of this.st)e in t||(r.remove(e),this.st.delete(e));for(let e in t){let o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return eb}});function iq(e){var t=e;for(let e=t;e;e=iB(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=iB(t);e;e=iB(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||ib(t)||"BODY"===e.tagName))return e}return null}function iB(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}var iH=class extends oj{constructor(){super(...arguments),this.localize=new oz(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),o=0,i=0,s=0,a=0,c=0,h=0,p=0,u=0;r?e.top<t.top?(o=e.left,i=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,u=t.top):(o=t.left,i=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,u=e.top):e.left<t.left?(o=e.right,i=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,u=t.bottom):(o=t.right,i=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else{var e;this.anchor instanceof Element||null!==(e=this.anchor)&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(e,t,r,o){let i;void 0===o&&(o={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=o,u=i$(e),f=s||a?[...u?iC(u):[],...t?iC(t):[]]:[];f.forEach(e=>{s&&e.addEventListener("scroll",r,{passive:!0}),a&&e.addEventListener("resize",r)});let g=u&&h?function(e,t){let r,o=null,i=ii(e);function s(){var e;clearTimeout(r),null==(e=o)||e.disconnect(),o=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:u,top:f,width:g,height:b}=p;if(c||t(),!g||!b)return;let m={rootMargin:-oH(f)+"px "+-oH(i.clientWidth-(u+g))+"px "+-oH(i.clientHeight-(f+b))+"px "+-oH(u)+"px",threshold:oq(0,oU(1,h))||1},v=!0;function w(t){let o=t[0].intersectionRatio;if(o!==h){if(!v)return a();o?a(!1,o):r=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==o||iD(p,e.getBoundingClientRect())||a(),v=!1}try{o=new IntersectionObserver(w,{...m,root:i.ownerDocument})}catch{o=new IntersectionObserver(w,m)}o.observe(e)}(!0),s}(u,r):null,b=-1,m=null;c&&(m=new ResizeObserver(e=>{let[o]=e;o&&o.target===u&&m&&t&&(m.unobserve(t),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var e;null==(e=m)||e.observe(t)})),r()}),u&&!p&&m.observe(u),t&&m.observe(t));let v=p?iE(e):null;return p&&function t(){let o=iE(e);v&&!iD(v,o)&&r(),v=o,i=requestAnimationFrame(t)}(),r(),()=>{var e;f.forEach(e=>{s&&e.removeEventListener("scroll",r),a&&e.removeEventListener("resize",r)}),null==g||g(),null==(e=m)||e.disconnect(),m=null,p&&cancelAnimationFrame(i)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,r,o,i,s;let a,c,h,p;if(!this.active||!this.anchorEl)return;let u=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var r,o;let{x:i,y:s,placement:a,middlewareData:c}=t,h=await ie(t,e);return a===(null==(r=c.offset)?void 0:r.placement)&&null!=(o=c.arrow)&&o.alignmentOffset?{}:{x:i+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?u.push(ij({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,r="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=r?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&u.push({name:"flip",options:t={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var r,o,i,s,a,c,h,p;let u,f,g,{placement:b,middlewareData:m,rects:v,initialPlacement:w,platform:x,elements:C}=e,{mainAxis:_=!0,crossAxis:$=!0,fallbackPlacements:S,fallbackStrategy:A="bestFit",fallbackAxisSideDirection:E="none",flipAlignment:P=!0,...O}=oW(t,e);if(null!=(r=m.arrow)&&r.alignmentOffset)return{};let T=oV(b),M=oY(w),N=oV(w)===w,D=await (null==x.isRTL?void 0:x.isRTL(C.floating)),j=S||(N||!P?[o3(w)]:(u=o3(w),[oQ(w),u,oQ(u)])),U="none"!==E;!S&&U&&j.push(...(f=oZ(w),g=function(e,t,r){switch(e){case"top":case"bottom":if(r)return t?o1:oX;return t?oX:o1;case"left":case"right":return t?o0:o2;default:return[]}}(oV(w),"start"===E,D),f&&(g=g.map(e=>e+"-"+f),P&&(g=g.concat(g.map(oQ)))),g));let q=[w,...j],B=await x.detectOverflow(e,O),F=[],G=(null==(o=m.flip)?void 0:o.overflows)||[];if(_&&F.push(B[T]),$){let e,t,r,o,i=(c=b,h=v,void 0===(p=D)&&(p=!1),e=oZ(c),r=oJ(t=oK(oY(c))),o="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[r]>h.floating[r]&&(o=o3(o)),[o,o3(o)]);F.push(B[i[0]],B[i[1]])}if(G=[...G,{placement:b,overflows:F}],!F.every(e=>e<=0)){let e=((null==(i=m.flip)?void 0:i.index)||0)+1,t=q[e];if(t&&("alignment"!==$||M===oY(t)||G.every(e=>oY(e.placement)!==M||e.overflows[0]>0)))return{data:{index:e,overflows:G},reset:{placement:t}};let r=null==(s=G.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!r)switch(A){case"bestFit":{let e=null==(a=G.filter(e=>{if(U){let t=oY(e.placement);return t===M||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(r=e);break}case"initialPlacement":r=w}if(b!==r)return{reset:{placement:r}}}return{}}}),this.shift&&u.push({name:"shift",options:r={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(e){let{x:t,y:o,placement:i,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:r}=e;return{x:t,y:r}}},...p}=oW(r,e),u={x:t,y:o},f=await s.detectOverflow(e,p),g=oY(oV(i)),b=oK(g),m=u[b],v=u[g];if(a){let e="y"===b?"top":"left",t="y"===b?"bottom":"right",r=m+f[e],o=m-f[t];m=oq(r,oU(m,o))}if(c){let e="y"===g?"top":"left",t="y"===g?"bottom":"right",r=v+f[e],o=v-f[t];v=oq(r,oU(v,o))}let w=h.fn({...e,[b]:m,[g]:v});return{...w,data:{x:w.x-t,y:w.y-o,enabled:{[b]:a,[g]:c}}}}}),this.autoSize?u.push(ij({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&u.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:r,placement:o,rects:i,platform:s,elements:c,middlewareData:h}=e,{element:p,padding:u=0}=oW(a,e)||{};if(null==p)return{};let f=o5(u),g={x:t,y:r},b=oK(oY(o)),m=oJ(b),v=await s.getDimensions(p),w="y"===b,x=w?"clientHeight":"clientWidth",C=i.reference[m]+i.reference[b]-g[b]-i.floating[m],_=g[b]-i.reference[b],$=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),S=$?$[x]:0;S&&await (null==s.isElement?void 0:s.isElement($))||(S=c.floating[x]||i.floating[m]);let A=S/2-v[m]/2-1,E=oU(f[w?"top":"left"],A),P=oU(f[w?"bottom":"right"],A),O=S-v[m]-P,T=S/2-v[m]/2+(C/2-_/2),M=oq(E,oU(T,O)),N=!h.arrow&&null!=oZ(o)&&T!==M&&i.reference[m]/2-(T<E?E:P)-v[m]/2<0,D=N?T<E?T-E:T-O:0;return{[b]:g[b]+D,data:{[b]:M,centerOffset:T-M-D,...N&&{alignmentOffset:D}},reset:N}}});let f="absolute"===this.strategy?e=>iz.getOffsetParent(e,iq):iz.getOffsetParent;(o=this.anchorEl,i=this.popup,s={placement:this.placement,middleware:u,strategy:this.strategy,platform:od(ov({},iz),op({getOffsetParent:f}))},c=new Map,p={...(h={platform:iz,...s}).platform,_c:c},o8(o,i,{...h,platform:p})).then(({x:e,y:t,middlewareData:r,placement:o})=>{let i="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=r.arrow.x,t=r.arrow.y,o="",a="",c="",h="";if("start"===this.arrowPlacement){let r="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=i?r:"",h=i?"":r}else if("end"===this.arrowPlacement){let r="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=i?"":r,h=i?r:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",o="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:o,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return ef`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${iU({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${iU({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ef`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};function iF(e,t){return new Promise(r=>{e.addEventListener(t,function o(i){i.target===e&&(e.removeEventListener(t,o),r())})})}function iG(e,t,r){return new Promise(o=>{if((null==r?void 0:r.duration)===1/0)throw Error("Promise-based animations must be finite.");let i=e.animate(t,od(ov({},r),op({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:r.duration})));i.addEventListener("cancel",o,{once:!0}),i.addEventListener("finish",o,{once:!0})})}function iW(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?1e3*parseFloat(e):parseFloat(e)}function iV(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}function iZ(e,t){let r=ov({waitUntilFirstUpdate:!1},t);return(t,o)=>{let{update:i}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{if(e.has(t)){let i=e.get(t),s=this[t];i!==s&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[o](i,s)}}),i.call(this,e)}}}iH.styles=[oD,oL],ow([eR(".popup")],iH.prototype,"popup",2),ow([eR(".popup__arrow")],iH.prototype,"arrowEl",2),ow([eL()],iH.prototype,"anchor",2),ow([eL({type:Boolean,reflect:!0})],iH.prototype,"active",2),ow([eL({reflect:!0})],iH.prototype,"placement",2),ow([eL({reflect:!0})],iH.prototype,"strategy",2),ow([eL({type:Number})],iH.prototype,"distance",2),ow([eL({type:Number})],iH.prototype,"skidding",2),ow([eL({type:Boolean})],iH.prototype,"arrow",2),ow([eL({attribute:"arrow-placement"})],iH.prototype,"arrowPlacement",2),ow([eL({attribute:"arrow-padding",type:Number})],iH.prototype,"arrowPadding",2),ow([eL({type:Boolean})],iH.prototype,"flip",2),ow([eL({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],iH.prototype,"flipFallbackPlacements",2),ow([eL({attribute:"flip-fallback-strategy"})],iH.prototype,"flipFallbackStrategy",2),ow([eL({type:Object})],iH.prototype,"flipBoundary",2),ow([eL({attribute:"flip-padding",type:Number})],iH.prototype,"flipPadding",2),ow([eL({type:Boolean})],iH.prototype,"shift",2),ow([eL({type:Object})],iH.prototype,"shiftBoundary",2),ow([eL({attribute:"shift-padding",type:Number})],iH.prototype,"shiftPadding",2),ow([eL({attribute:"auto-size"})],iH.prototype,"autoSize",2),ow([eL()],iH.prototype,"sync",2),ow([eL({type:Object})],iH.prototype,"autoSizeBoundary",2),ow([eL({attribute:"auto-size-padding",type:Number})],iH.prototype,"autoSizePadding",2),ow([eL({attribute:"hover-bridge",type:Boolean})],iH.prototype,"hoverBridge",2);var iK=class extends oj{constructor(){super(),this.localize=new oz(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let e=iW(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=iW(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await iV(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:t,options:r}=o$(this,"tooltip.show",{dir:this.localize.dir()});await iG(this.popup.popup,t,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await iV(this.body);let{keyframes:e,options:r}=o$(this,"tooltip.hide",{dir:this.localize.dir()});await iG(this.popup.popup,e,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,iF(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,iF(this,"sl-after-hide")}render(){return ef`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${iU({tooltip:!0,"tooltip--open":this.open})}
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
    `}};iK.styles=[oD,oA],iK.dependencies={"sl-popup":iH},ow([eR("slot:not([name])")],iK.prototype,"defaultSlot",2),ow([eR(".tooltip__body")],iK.prototype,"body",2),ow([eR("sl-popup")],iK.prototype,"popup",2),ow([eL()],iK.prototype,"content",2),ow([eL()],iK.prototype,"placement",2),ow([eL({type:Boolean,reflect:!0})],iK.prototype,"disabled",2),ow([eL({type:Number})],iK.prototype,"distance",2),ow([eL({type:Boolean,reflect:!0})],iK.prototype,"open",2),ow([eL({type:Number})],iK.prototype,"skidding",2),ow([eL()],iK.prototype,"trigger",2),ow([eL({type:Boolean})],iK.prototype,"hoist",2),ow([iZ("open",{waitUntilFirstUpdate:!0})],iK.prototype,"handleOpenChange",1),ow([iZ(["content","distance","hoist","placement","skidding"])],iK.prototype,"handleOptionsChange",1),ow([iZ("disabled")],iK.prototype,"handleDisabledChange",1),ok("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),ok("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),iK.define("sl-tooltip");var iJ=Object.defineProperty,iY=Object.getOwnPropertyDescriptor,iQ=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?iY(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&iJ(t,r,s),s};ok("tooltip.show",null),ok("tooltip.hide",null);let iX=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.suppressed=!1,this.onMouseDown=e=>{this.suppressed=!0,this.hide()},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.hide()},this.onDragEnd=e=>{this.suppressed=!1}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("dragstart",this.onDragStart,{capture:!0}),window.addEventListener("dragend",this.onDragEnd,{capture:!0})}firstUpdated(){this.observer=new MutationObserver(e=>{for(let t of e)if("attributes"===t.type&&"data-current-placement"===t.attributeName){let e=t.target.getAttribute("data-current-placement");e?this.setAttribute("data-current-placement",e):this.removeAttribute("data-current-placement")}});let e=this.shadowRoot?.querySelector("sl-tooltip")?.shadowRoot;e&&this.observer.observe(e,{attributes:!0,attributeFilter:["data-current-placement"],subtree:!0})}disconnectedCallback(){this.observer?.disconnect(),this.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("dragstart",this.onDragStart,{capture:!0}),window.removeEventListener("dragend",this.onDragEnd,{capture:!0}),super.disconnectedCallback?.()}async hide(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.hide()}async show(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.show()}render(){var e;return ef`<sl-tooltip
			.placement=${this.placement}
			?disabled=${this.disabled||this.suppressed}
			.distance=${this.distance??em}
			hoist
		>
			<slot></slot>
			<div slot="content">
				<slot name="content">${e=this.content,e?.includes(`
`)?oS(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}</slot>
			</div>
		</sl-tooltip>`}};iX.styles=$`
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
	`,iQ([eL()],iX.prototype,"content",2),iQ([eL({reflect:!0})],iX.prototype,"placement",2),iQ([eL({type:Boolean})],iX.prototype,"disabled",2),iQ([eL({type:Number})],iX.prototype,"distance",2),iQ([eL({type:Boolean,attribute:"hide-on-click"})],iX.prototype,"hideOnClick",2),iQ([eL({type:Boolean})],iX.prototype,"hoist",2),iQ([eE()],iX.prototype,"suppressed",2),iX=iQ([eS("gl-tooltip")],iX);var i1=Object.defineProperty,i0=Object.getOwnPropertyDescriptor,i2=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?i0(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&i1(t,r,s),s};let i3=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?ef`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??em}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ef`<gl-tooltip placement=${this.tooltipPlacement??em}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ef`<a
				class="control"
				tabindex="${(!1===this.disabled?void 0:-1)??em}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ef`<button
			class="control"
			role=${this.role??em}
			aria-checked=${this.ariaChecked??em}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};i3.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},i3.styles=[rZ,$`
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
				${rV}
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
		`],i2([eR(".control")],i3.prototype,"control",2),i2([eL({reflect:!0})],i3.prototype,"appearance",2),i2([eL({reflect:!0})],i3.prototype,"variant",2),i2([eL({type:Boolean,reflect:!0})],i3.prototype,"disabled",2),i2([eL({reflect:!0})],i3.prototype,"density",2),i2([eL({type:Boolean,reflect:!0})],i3.prototype,"full",2),i2([eL()],i3.prototype,"href",2),i2([eL()],i3.prototype,"tooltip",2),i2([eL()],i3.prototype,"tooltipPlacement",2),i2([eL({type:Boolean,reflect:!0})],i3.prototype,"truncate",2),i3=i2([eS("gl-button")],i3);let i5=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a"}),i6=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147"});var i4=Object.defineProperty,i7=Object.getOwnPropertyDescriptor,i8=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?i7(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&i4(t,r,s),s};function i9(e,t=""){return _(Object.entries(e).map(([e,r])=>(function(e,t,r=""){return`:host([icon='${r}${e}'])::before { content: '${t}'; }`})(e,r,t)).join(""))}let ne=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};ne.styles=$`
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

		${i9(i5)}
		${i9(i6,"gl-")}

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
	`,i8([eL({reflect:!0})],ne.prototype,"icon",2),i8([eL({reflect:!0})],ne.prototype,"modifier",2),i8([eL({type:Number})],ne.prototype,"size",2),i8([eL({reflect:!0})],ne.prototype,"flip",2),i8([eL({reflect:!0})],ne.prototype,"rotate",2),ne=i8([eS("code-icon")],ne);var nt=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,no=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nr(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&nt(t,r,s),s};let ni=class extends lit_element_i{constructor(){super(...arguments),this.completed=!1,this.expanded=!1}focus(e){this.header?.focus(e)}toggleExpanded(e=!this.expanded){this.expanded=e,queueMicrotask(()=>{this.dispatchEvent(new CustomEvent("gl-walkthrough-step-expand-toggled",{detail:{expanded:e},bubbles:!0,composed:!0}))})}handleHeaderClick(){this.toggleExpanded()}handleHeaderKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.toggleExpanded())}render(){return ef`
			<div
				part="header"
				class="header"
				role="button"
				tabindex="0"
				aria-expanded=${this.expanded}
				@click=${this.handleHeaderClick}
				@keydown=${this.handleHeaderKeydown}
			>
				<code-icon class="status-icon" icon=${this.completed?"pass-filled":"circle-large"}></code-icon>
				<span class="title"><slot name="title"></slot></span>
				<code-icon class="icon" icon="chevron-right"></code-icon>
			</div>
			<div class="content">
				<slot></slot>
			</div>
		`}};ni.styles=[$`
			:host {
				display: block;
			}

			:host(:focus-within) {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.header {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				gap: 0.6em;
				cursor: pointer;
				user-select: none;
			}

			.header:hover {
				opacity: 0.8;
			}

			.header:focus {
				outline: none;
			}

			.icon {
				flex: none;
				transition: transform 0.2s ease;
			}

			:host([expanded]) .icon {
				transform: rotate(90deg);
			}

			.title {
				display: block;
			}

			.status-icon {
				flex: none;
				color: var(--vscode-descriptionForeground);
			}

			:host([completed]) .status-icon {
				color: var(--vscode-textLink-foreground);
			}

			.content {
				display: none;
				flex-direction: column;
				gap: 1em;
			}

			:host([expanded]) .content {
				display: flex;
			}
		`],no([eL({type:String})],ni.prototype,"stepId",2),no([eL({type:Boolean,reflect:!0})],ni.prototype,"completed",2),no([eL({type:Boolean,reflect:!0})],ni.prototype,"expanded",2),no([eR(".header")],ni.prototype,"header",2),ni=no([eS("gl-walkthrough-step")],ni);let nn=class extends lit_element_i{constructor(){super(...arguments),this.onStepExpandToggled=e=>{let t=e.composedPath().find(e=>e.matches?.("gl-walkthrough-step"));null!=t&&(t.expanded?(this.steps.forEach(e=>{e!==t&&(e.expanded=!1)}),this.expandedStepId=t.stepId):this.expandedStepId=void 0)}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("gl-walkthrough-step-expand-toggled",this.onStepExpandToggled)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("gl-walkthrough-step-expand-toggled",this.onStepExpandToggled)}updated(e){super.updated(e),e.has("expandedStepId")&&this.syncStepsToExpandedStepId()}syncStepsToExpandedStepId(){this.steps.forEach(e=>{e.expanded=null!=e.stepId&&e.stepId===this.expandedStepId})}getDefaultStepToExpand(){return this.steps.find(e=>!e.completed)??this.steps[0]}handleSlotChange(){if(null!=this.expandedStepId)this.syncStepsToExpandedStepId();else{let e=this.steps.find(e=>e.expanded);if(null!=e)this.expandedStepId=e.stepId;else{let e=this.getDefaultStepToExpand();e?.stepId!=null&&(this.expandedStepId=e.stepId)}}}async resetToDefaultAndFocus(){let e=this.getDefaultStepToExpand();e?.stepId!=null&&(this.expandedStepId=e.stepId,await this.updateComplete,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e))),e.focus())}render(){return ef`<slot @slotchange=${this.handleSlotChange}></slot>`}};no([(p={selector:"gl-walkthrough-step"},(e,t)=>{let{slot:r,selector:o}=p??{},i="slot"+(r?`[name=${r}]`:":not([name])");return eP(e,t,{get(){let e=this.renderRoot?.querySelector(i),t=e?.assignedElements(p)??[];return void 0===o?t:t.filter(e=>e.matches(o))}})})],nn.prototype,"steps",2),no([eL({type:String,reflect:!0,attribute:"expanded-step-id"})],nn.prototype,"expandedStepId",2),nn=no([eS("gl-walkthrough")],nn);let ns=class extends lit_element_i{constructor(){super(...arguments),this.doneCount=0,this.allCount=0}get progressPercent(){return 0===this.allCount?0:this.doneCount/this.allCount*100}updated(){this._fillEl&&(this._fillEl.style.width=`${this.progressPercent}%`)}render(){return ef`
			<div class="progress">
				<div class="progress-bar">
					<div class="progress-bar__fill"></div>
				</div>
				<p>${this.doneCount}/${this.allCount} steps complete</p>
			</div>
		`}};ns.styles=[$`
			:host {
				display: block;
			}

			.progress {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5em;
				padding: 0 2em;
			}

			.progress-bar {
				width: 100%;
				height: 4px;
				background: var(--card-background);
				border-radius: 2px;
				overflow: hidden;
			}

			.progress-bar__fill {
				height: 100%;
				background: linear-gradient(to right, #7900c9, #196fff);
				border-radius: 2px;
				transition: width 0.3s ease;
			}

			p {
				margin: 0;
				color: var(--vscode-descriptionForeground);
			}
		`],no([eL({type:Number})],ns.prototype,"doneCount",2),no([eL({type:Number})],ns.prototype,"allCount",2),no([eR(".progress-bar__fill")],ns.prototype,"_fillEl",2),ns=no([eS("gl-walkthrough-progress")],ns);var na=Object.defineProperty,nl=Object.getOwnPropertyDescriptor,nc=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nl(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&na(t,r,s),s};let nd=[{id:"get-started-community",walkthroughKey:"gettingStarted",title:"Welcome to GitLens",body:ef`
			<p>
				The GitLens Community edition lets you track code changes and see who made them with inline blame
				annotations, hovers, and more—completely free.
			</p>
			<p>
				With <strong>GitLens Pro</strong> (Free 14-Day Trial), you’ll get full access to advanced visualization,
				collaboration, and built-in AI:
			</p>
			<ul>
				<li><strong>Commit Graph:</strong> visualize every branch and commit relationship</li>
				<li>
					<strong>Visual File History:</strong> see how a file has evolved with a graph of what changed and
					when
				</li>
				<li><strong>Launchpad & Worktrees:</strong> manage PRs and branches in one hub</li>
				<li><strong>GitKraken AI:</strong> writes commits, PRs & changelogs for you.</li>
			</ul>
			<div class="card-part--centered">
				<gl-button class="start-trial-button" href="command:gitlens.welcome.plus.signUp"
					>Get Started with GitLens Pro</gl-button
				>
			</div>
			<p>or <a href="command:gitlens.welcome.plus.login">sign in</a></p>
		`,condition:e=>!e.plusState||e.plusState<r6.Trial},{id:"welcome-in-trial",walkthroughKey:"gettingStarted",title:"Welcome to GitLens Pro",body:ef`
			<p>Thanks for starting your <strong>GitLens Pro</strong> trial.</p>
			<p>
				Complete this walkthrough to experience enhanced PR review tools, deeper code history visualizations,
				and streamlined collaboration to help boost your productivity.
			</p>
			<a href="#continue-walkthrough">Continue the Walkthrough</a>
			<p>
				Once your trial ends, you'll return to <strong>GitLens Community</strong> — where you can still leverage
				features like in-editor blame annotations, hovers, CodeLens, and more.
			</p>
			<div class="card-part--centered">
				<gl-button class="start-trial-button" href="command:gitlens.welcome.plus.upgrade"
					>Upgrade to GitLens Pro</gl-button
				>
			</div>
		`,condition:e=>e.plusState===r6.Trial},{id:"welcome-in-trial-expired",walkthroughKey:"gettingStarted",title:"Get the most out of GitLens",body:ef`
			<p>Thanks for installing GitLens and trying out GitLens Pro.</p>
			<p>
				You're now on the <strong>GitLens Community</strong> edition. Track code changes and see who made them
				with features like in-editor blame annotations, hovers, CodeLens, and more—completely free.
			</p>
			<p>
				Learn more about the
				<a href="command:gitlens.welcome.openCommunityVsPro">difference between GitLens Community vs. Pro</a>.
			</p>
			<p><strong>Unlock more powerful tools with GitLens Pro</strong></p>
			<div class="card-part--centered">
				<gl-button class="start-trial-button" href="command:gitlens.welcome.plus.upgrade"
					>Upgrade to GitLens Pro</gl-button
				>
			</div>
			<p>
				With GitLens Pro, you can accelerate PR reviews, visualize code history in-depth, and enhance
				collaboration across your team. It's the perfect upgrade to streamline your VS Code workflow.
			</p>
		`,condition:e=>e.plusState===r6.TrialExpired},{id:"welcome-in-trial-expired-eligible",walkthroughKey:"gettingStarted",title:"Get the most out of GitLens",body:ef`
			<p>Thanks for installing GitLens and trying out GitLens Pro.</p>
			<p>
				You're using <strong>GitLens Community</strong> edition. Track code changes and see who made them with
				features like in-editor blame annotations, hovers, CodeLens, and more—completely free.
			</p>
			<p><strong>Unlock more powerful tools — Try GitLens Pro again</strong> free for another 14 days.</p>
			<div class="card-part--centered">
				<gl-button class="start-trial-button" href="command:gitlens.welcome.plus.reactivate"
					>Reactivate GitLens Pro Trial</gl-button
				>
			</div>
			<p>
				With GitLens Pro, you can accelerate PR reviews, visualize code history in-depth, and enhance
				collaboration across your team. It's the perfect upgrade to streamline your VS Code workflow.
			</p>
		`,condition:e=>e.plusState===r6.TrialReactivationEligible},{id:"welcome-paid",walkthroughKey:"gettingStarted",title:"Discover the Benefits of GitLens Pro",body:ef`
			<p>
				As a GitLens Pro user, you have access to powerful tools that accelerate PR reviews, provide deeper code
				history visualizations, and streamline collaboration across your team.
			</p>
			<div class="card-part--centered">
				<gl-button href="#continue-walkthrough">Continue the Walkthrough</gl-button>
			</div>
			<p class="card-part--tip">
				<em>Tip:</em> To get the most out of your GitLens Pro experience, complete the walkthrough and visit our
				Help Center for in-depth guides.
			</p>
			<a href="command:gitlens.welcome.openHelpCenter">Learn more in the Help Center</a>
		`,condition:e=>e.plusState===r6.Paid},{id:"home-view",walkthroughKey:"homeView",title:"Streamline Workflow with the Home View",body:ef`
			<p>
				Streamline your workflow — effortlessly track, manage, and collaborate on your branches and pull
				requests, all in one intuitive hub.
			</p>
			<div class="card-part--centered">
				<gl-button href="command:gitlens.welcome.showHomeView">Open Home View</gl-button>
			</div>
		`},{id:"visualize-code-history",walkthroughKey:"visualizeCodeHistory",title:"Commit Graph: See Your Code's Story",body:ef`
			<p>
				Navigate complex repositories with a searchable, color-coded commit timeline. Instantly understand
				branch relationships, authorship patterns, and commit sequences.
			</p>
			<p>
				Select multiple commits to batch operations like cherry-picking or generate AI changelogs with a single
				command.
			</p>
			<div class="card-part--centered">
				<gl-button href="command:gitlens.welcome.showGraph">Discover your Commit Graph</gl-button>
			</div>
		`},{id:"ai-features",walkthroughKey:"aiFeatures",title:"Commit smarter, not harder",body:ef`
			<p>
				Let AI handle the heavy lifting - from turning your changes into clear, logical commits to getting
				context on others' work. GitLens’s AI features make reviews efficient and keep your history clean.
			</p>
			<ul>
				<li>
					<strong>Auto-Compose Commits:</strong> instantly generate a sequence of commits with descriptive
					summaries in an interactive editor
				</li>
				<li>
					<strong>Explain Commits and Branches:</strong> understand changes without wasting time diving into
					the diffs
				</li>
				<li><strong>Create PR Titles & Descriptions:</strong> save reviewers 10+ minutes per review</li>
			</ul>
			<p>
				Stay in control. Review and edit AI suggestions before finalizing, and
				<a href="command:gitlens.ai.switchProvider">configure your preferred AI provider</a>
				and model to fit your needs.
			</p>
			<div class="card-part--centered">
				<gl-button href="command:gitlens.welcome.showComposer">Compose Commits with AI</gl-button>
			</div>
		`},{id:"git-blame",walkthroughKey:"gitBlame",title:"Learn the why behind every code Line",body:ef`
			<p>See who changed a line, when and why — without leaving your editor.</p>
			<p>Hover over blame annotations to:</p>
			<ul>
				<li>View previous file revisions</li>
				<li>Open related PRs</li>
				<li>Jump to commits in the Graph</li>
				<li>Compare with previous versions</li>
			</ul>
			<div class="card-part--centered">
				<gl-button href="command:gitlens.showSettingsPage!current-line">Configure Inline Blame</gl-button>
			</div>
		`},{id:"accelerate-pr-reviews",walkthroughKey:"prReviews",title:"Manage all your work in one place",body:ef`
			<p>Keep everything at your fingertips with Launchpad & Worktrees.</p>
			<ul>
				<li><strong>Launchpad:</strong> view and manage all your PRs and branches from one hub</li>
				<li><strong>Worktrees:</strong> code, test, and review on multiple branches in parallel</li>
				<li>
					<strong>Integrations:</strong> connect PRs and issues from GitHub, GitLab, Jira, Azure DevOps & more
				</li>
			</ul>
			<p>Stay in flow, ship faster, and never lose track of what matters.</p>
			<div class="card-part--centered">
				<gl-button href="command:gitlens.welcome.showLaunchpad">Open Launchpad</gl-button>
			</div>
		`},{id:"mcp-bundled",walkthroughKey:"mcpFeatures",title:"GitKraken MCP",body:ef`
			<p>
				GitKraken MCP is active in your AI chat, leveraging Git and your integrations to provide context and
				perform actions. You can also connect MCP to other agents on your machine.
			</p>
			<div class="card-part--centered">
				<gl-button href="${r4("gitlens.ai.mcp.selectAgents",{source:"welcome"})}"
					>Connect More Agents</gl-button
				>
			</div>
			<p><a href="${r5.helpCenterMCP}">Learn more in the Help Center</a></p>
		`,condition:e=>!1===e.mcpNeedsInstall&&!e.mcpShowCleanupNotice},{id:"mcp-bundled-cleanup",walkthroughKey:"mcpFeatures",title:"GitKraken MCP",body:ef`
			<p>
				GitKraken MCP is active in your AI chat, leveraging Git and your integrations to provide context and
				perform actions. You can also connect MCP to other agents on your machine.
			</p>
			<div class="card-part--centered">
				<gl-button href="${r4("gitlens.ai.mcp.selectAgents",{source:"welcome"})}"
					>Connect More Agents</gl-button
				>
			</div>
			<p>
				<strong>Note:</strong> You may have a duplicate entry in your Cursor <code>mcp.json</code> from a
				previous install. Remove <code>mcpServers.GitKraken</code> to clean it up.
			</p>
			<p><a href="${r5.helpCenterMCP}">Learn more in the Help Center</a></p>
		`,condition:e=>!1===e.mcpNeedsInstall&&e.mcpShowCleanupNotice},{id:"mcp-install",walkthroughKey:"mcpFeatures",title:"Install GitKraken MCP for GitLens",body:ef`
			<p>
				Leverage Git and your integrations (issues, PRs, etc) to provide context and perform actions in AI chat.
			</p>
			<div class="card-part--centered">
				<gl-button href="${r4("gitlens.ai.mcp.install",{source:"welcome"})}"
					>Install GitKraken MCP</gl-button
				>
			</div>
			<p><a href="${r5.helpCenterMCP}">Learn more</a></p>
		`,condition:e=>!0===e.mcpNeedsInstall}],nh=class extends lit_element_i{constructor(){super(...arguments),this.closeable=!1,this.isLightTheme=!1,this.handleWalkthroughFocusCommand=()=>this.walkthrough?.resetToDefaultAndFocus(),this.handleClick=e=>{let t=e.composedPath()[0],r=t.closest?.('a[href="#continue-walkthrough"]'),o=e.target.closest?.('gl-button[href="#continue-walkthrough"]');(null!=r||null!=o)&&(e.preventDefault(),e.stopPropagation(),this.walkthrough?.resetToDefaultAndFocus())}}connectedCallback(){super.connectedCallback?.(),this._telemetry.sendEvent({name:"welcome/action",data:{name:"shown"},source:{source:"welcome"}}),window.addEventListener("gl-walkthrough-focus-command",this.handleWalkthroughFocusCommand),this.addEventListener("click",this.handleClick)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("gl-walkthrough-focus-command",this.handleWalkthroughFocusCommand),this.removeEventListener("click",this.handleClick)}render(){return this._state?ef`
			<div part="page" class="welcome scrollable">
				<div class="section header">
					<h1><gitlens-logo-circle></gitlens-logo-circle><span>Get Started with GitLens</span></h1>
					<p>
						Supercharge Git and unlock untapped knowledge within your repo to better understand, write, and
						review code.
					</p>
				</div>
				<gl-walkthrough-progress
					class="section"
					.doneCount=${this._state.walkthroughProgress?.doneCount??0}
					.allCount=${this._state.walkthroughProgress?.allCount??0}
				></gl-walkthrough-progress>
				<gl-walkthrough class="section">
					${nd.filter(e=>!e.condition||e.condition(this._state)).map(e=>ef`
								<gl-walkthrough-step
									class="card"
									stepId=${e.id}
									.completed=${null!=e.walkthroughKey&&this._state.walkthroughProgress?.state[e.walkthroughKey]===!0}
								>
									<h1 slot="title">${e.title}</h1>
									${e.body}
								</gl-walkthrough-step>
							`)}
				</gl-walkthrough>
				<div class="section section--centered">
					<p>
						You also have access to the
						<a href="https://gitkraken.dev/tools" target="_blank">GitKraken DevEx platform</a>, unleashing
						powerful Git visualization & productivity capabilities everywhere you work: IDE, desktop,
						browser, and terminal.
					</p>
				</div>
			</div>
		`:em}};nh.styles=[rK,on],nc([eL({type:Boolean})],nh.prototype,"closeable",2),nc([eL({type:String})],nh.prototype,"webroot",2),nc([eL({type:Boolean})],nh.prototype,"isLightTheme",2),nc([eT({context:"welcome-state",subscribe:!0}),eE()],nh.prototype,"_state",2),nc([eT({context:"ipc"})],nh.prototype,"_ipc",2),nc([eT({context:"telemetry"})],nh.prototype,"_telemetry",2),nc([eR("gl-walkthrough")],nh.prototype,"walkthrough",2),nh=nc([eS("gl-welcome-page")],nh);var np=Object.defineProperty,nu=Object.getOwnPropertyDescriptor,nf=(e,t,r,o)=>{for(var i,s=o>1?void 0:o?nu(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&np(t,r,s),s};let ng=class extends GlAppHost{constructor(){super(...arguments),this.isLightTheme=!1}createStateProvider(e,t,r){return new WelcomeStateProvider(this,e,t,r)}onThemeUpdated(e){this.isLightTheme=e.isLightTheme}render(){return ef`
			<div class="welcome scrollable">
				<gl-welcome-page .webroot=${this.webroot} .isLightTheme=${this.isLightTheme}></gl-welcome-page>
			</div>
		`}};ng.styles=[rK,r1],nf([eL({type:String})],ng.prototype,"webroot",2),nf([eE()],ng.prototype,"isLightTheme",2),ng=nf([eS("gl-welcome-app")],ng);export{ng as GlWelcomeApp};