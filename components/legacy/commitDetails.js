let e,t,i,r,o,s,a,c,h,p,g,f,m;var b,v,w,_,x,$,C,S,P={90(e,t,i){i.d(t,{FlowLayout:()=>FlowLayout,flow:()=>o}),i.r(t);let SizeCache=class SizeCache{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){let i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){let e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}};function r(e){return"horizontal"===e?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){(e="horizontal"===e?e:"vertical")!==this._direction&&(this._direction=e,this._sizeDim="horizontal"===e?"width":"height",this._secondarySizeDim="horizontal"===e?"height":"width",this._positionDim="horizontal"===e?"left":"top",this._secondaryPositionDim="horizontal"===e?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){let{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);let t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[r(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){let{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),r=this._getItemPosition(i)[this._positionDim],o=r;if("start"!==t){let e=this._getItemSize(i)[this._sizeDim];if("center"===t)o=r-.5*this._viewDim1+.5*e;else{let i=r-this._viewDim1+e;if("end"===t)o=i;else{let e=this._scrollPosition;o=Math.abs(e-r)<Math.abs(e-i)?r:i}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let e=new Map;if(-1!==this._first&&-1!==this._last)for(let t=this._first;t<=this._last;t++)e.set(t,this._getItemPosition(t));let t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(-1===this._first||-1===this._last)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}};let o=e=>Object.assign({type:FlowLayout},e);function s(e){return"horizontal"===e?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(e,t){let i=new Set;for(let o of(Object.keys(e).forEach(o=>{let s=Number(o);this._metricsCache.set(s,e[s]),this._childSizeCache.set(s,e[s][r(t)]),i.add(s),i.add(s+1)}),i)){let e=this._metricsCache.get(o)?.[s(t)]||0,i=this._metricsCache.get(o-1)?.["horizontal"===t?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(o,function(e,t){let i=[e,t].sort();return i[1]<=0?Math.min(...i):i[0]>=0?Math.max(...i):i[0]+i[1]}(e,i))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[s(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){let t=this._metricsCache;if(-1===this._first||-1===this._last)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){let i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}{let i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){let t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return 0===e?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(e,t);let i=this._getPhysicalItem(this._first),r=this._getPhysicalItem(this._last),o=i.pos;if(r.pos+this._metricsCache.getChildSize(this._last)<e||o>t)return this._calculateAnchor(e,t);let s=this._firstVisible-1,a=-1/0;for(;a<e;)a=this._getPhysicalItem(++s).pos+this._metricsCache.getChildSize(s);return s}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){let e,t,i=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:e}=this.pin;this._anchorIdx=e,this._anchorPos=this._getPosition(e)}if(e=this._scrollPosition-this._overhang,(t=this._scrollPosition+this._viewDim1+this._overhang)<0||e>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(e,t),this._anchorPos=this._getPosition(this._anchorIdx));let r=this._getSize(this._anchorIdx);void 0===r&&(this._stable=!1,r=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,s=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-s-r);let a=0;for(this._anchorPos+r+s<e&&(a=e-(this._anchorPos+r+s)),this._anchorPos-o>t&&(a=t-(this._anchorPos-o)),a&&(this._scrollPosition-=a,e-=a,t-=a,this._scrollError+=a),i.set(this._anchorIdx,{pos:this._anchorPos,size:r}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+r+s;this._physicalMin>e&&this._first>0;){let e=this._getSize(--this._first);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._first);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize),this._physicalMin-=e;let r=this._physicalMin;if(i.set(this._first,{pos:r,size:e}),this._physicalMin-=t,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<t&&this._last<this.items.length-1;){let e=this._getSize(++this._last);void 0===e&&(this._stable=!1,e=this._getAverageSize());let t=this._metricsCache.getMarginSize(this._last);void 0===t&&(this._stable=!1,t=this._metricsCache.averageMarginSize);let r=this._physicalMax;if(i.set(this._last,{pos:r,size:e}),this._physicalMax+=e+t,!this._stable&&!this._estimate)break}let c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,i.forEach(e=>e.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=i)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:e,_last:t}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){let{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}},A={};function E(e){var t=A[e];if(void 0!==t)return t.exports;var i=A[e]={exports:{}};return P[e](i,i.exports,E),i.exports}E.d=(e,t)=>{for(var i in t)E.o(t,i)&&!E.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},E.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),E.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},Object.defineProperty(E,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(e){}});let T=globalThis,M=T.ShadowRoot&&(void 0===T.ShadyCSS||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O=Symbol(),D=new WeakMap;let n=class n{constructor(e,t,i){if(this._$cssResult$=!0,i!==O)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(M&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=D.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&D.set(t,e))}return e}toString(){return this.cssText}};let B=e=>new n("string"==typeof e?e:e+"",void 0,O),F=(e,...t)=>new n(1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]),e,O),j=M?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return B(t)})(e):e,{is:N,defineProperty:q,getOwnPropertyDescriptor:U,getOwnPropertyNames:W,getOwnPropertySymbols:V,getPrototypeOf:G}=Object,K=globalThis,Y=K.trustedTypes,X=Y?Y.emptyScript:"",Q=K.reactiveElementPolyfillSupport,J={toAttribute(e,t){switch(t){case Boolean:e=e?X:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},ee=(e,t)=>!N(e,t),et={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;let y=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=et){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&q(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:o}=U(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??et}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=G(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...W(e),...V(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(j(i));else void 0!==e&&t.push(j(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(M)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),r=T.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){let o=(void 0!==i.converter?.toAttribute?i.converter:J).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){let e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:J;this._$Em=r;let s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){let s=this.constructor;if(!1===r&&(o=this[e]),!(((i??=s.getPropertyOptions(e)).hasChanged??ee)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y.elementProperties=new Map,y.finalized=new Map,Q?.({ReactiveElement:y}),(K.reactiveElementVersions??=[]).push("2.1.2");let ei=globalThis,er=e=>e,eo=ei.trustedTypes,es=eo?eo.createPolicy("lit-html",{createHTML:e=>e}):void 0,en="$lit$",ea=`lit$${Math.random().toFixed(9).slice(2)}$`,el="?"+ea,ec=`<${el}>`,eh=document,ed=()=>eh.createComment(""),ep=e=>null===e||"object"!=typeof e&&"function"!=typeof e,eu=Array.isArray,eg=e=>eu(e)||"function"==typeof e?.[Symbol.iterator],ef=`[ 	
\x0c\r]`,em=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,eb=/-->/g,ev=/>/g,ey=RegExp(`>|${ef}(?:([^\\s"'>=/]+)(${ef}*=${ef}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ew=/'/g,e_=/"/g,ex=/^(?:script|style|textarea|title)$/i,ek=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),e$=ek(1),eC=ek(2),eS=(ek(3),Symbol.for("lit-noChange")),eP=Symbol.for("lit-nothing"),eA=new WeakMap,eE=eh.createTreeWalker(eh,129);function eT(e,t){if(!eu(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==es?es.createHTML(t):t}let eR=(e,t)=>{let i=e.length-1,r=[],o,s=2===t?"<svg>":3===t?"<math>":"",a=em;for(let t=0;t<i;t++){let i=e[t],c,h,p=-1,g=0;for(;g<i.length&&(a.lastIndex=g,null!==(h=a.exec(i)));)g=a.lastIndex,a===em?"!--"===h[1]?a=eb:void 0!==h[1]?a=ev:void 0!==h[2]?(ex.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=ey):void 0!==h[3]&&(a=ey):a===ey?">"===h[0]?(a=o??em,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?ey:'"'===h[3]?e_:ew):a===e_||a===ew?a=ey:a===eb||a===ev?a=em:(a=ey,o=void 0);let f=a===ey&&e[t+1].startsWith("/>")?" ":"";s+=a===em?i+ec:p>=0?(r.push(c),i.slice(0,p)+en+i.slice(p)+ea+f):i+ea+(-2===p?t:f)}return[eT(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};let lit_html_S=class lit_html_S{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0,a=e.length-1,c=this.parts,[h,p]=eR(e,t);if(this.el=lit_html_S.createElement(h,i),eE.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=eE.nextNode())&&c.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(let e of r.getAttributeNames())if(e.endsWith(en)){let t=p[s++],i=r.getAttribute(e).split(ea),a=/([.?@])?(.*)/.exec(t);c.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),r.removeAttribute(e)}else e.startsWith(ea)&&(c.push({type:6,index:o}),r.removeAttribute(e));if(ex.test(r.tagName)){let e=r.textContent.split(ea),t=e.length-1;if(t>0){r.textContent=eo?eo.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],ed()),eE.nextNode(),c.push({type:2,index:++o});r.append(e[t],ed())}}}else if(8===r.nodeType)if(r.data===el)c.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(ea,e+1));)c.push({type:7,index:o}),e+=ea.length-1}o++}}static createElement(e,t){let i=eh.createElement("template");return i.innerHTML=e,i}};function eI(e,t,i=e,r){if(t===eS)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl,s=ep(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(e))._$AT(e,i,r),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=eI(e,o._$AS(e,t.values),o,r)),t}let R=class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??eh).importNode(t,!0);eE.currentNode=r;let o=eE.nextNode(),s=0,a=0,c=i[0];for(;void 0!==c;){if(s===c.index){let t;2===c.type?t=new k(o,o.nextSibling,this,e):1===c.type?t=new c.ctor(o,c.name,c.strings,this,e):6===c.type&&(t=new Z(o,this,e)),this._$AV.push(t),c=i[++a]}s!==c?.index&&(o=eE.nextNode(),s++)}return eE.currentNode=eh,r}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=eP,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){ep(e=eI(this,e,t))?e===eP||null==e||""===e?(this._$AH!==eP&&this._$AR(),this._$AH=eP):e!==this._$AH&&e!==eS&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):eg(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==eP&&ep(this._$AH)?this._$AA.nextSibling.data=e:this.T(eh.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=lit_html_S.createElement(eT(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new R(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=eA.get(e.strings);return void 0===t&&eA.set(e.strings,t=new lit_html_S(e)),t}k(e){eu(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new k(this.O(ed()),this.O(ed()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=er(e).nextSibling;er(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=eP,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=eP}_$AI(e,t=this,i,r){let o=this.strings,s=!1;if(void 0===o)(s=!ep(e=eI(this,e,t,0))||e!==this._$AH&&e!==eS)&&(this._$AH=e);else{let r,a,c=e;for(e=o[0],r=0;r<o.length-1;r++)(a=eI(this,c[i+r],t,r))===eS&&(a=this._$AH[r]),s||=!ep(a)||a!==this._$AH[r],a===eP?e=eP:e!==eP&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!r&&this.j(e)}j(e){e===eP?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===eP?void 0:e}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==eP)}};let z=class z extends H{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=eI(this,e,t,0)??eP)===eS)return;let i=this._$AH,r=e===eP&&i!==eP||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==eP&&(i===eP||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};let Z=class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){eI(this,e)}};let eM=ei.litHtmlPolyfillSupport;eM?.(lit_html_S,k),(ei.litHtmlVersions??=[]).push("3.3.2");let ez=globalThis;let lit_element_i=class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let r=i?.renderBefore??t,o=r._$litPart$;if(void 0===o){let e=i?.renderBefore??null;r._$litPart$=o=new k(t.insertBefore(ed(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return eS}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,ez.litElementHydrateSupport?.({LitElement:lit_element_i});let eO=ez.litElementPolyfillSupport;eO?.({LitElement:lit_element_i}),(ez.litElementVersions??=[]).push("4.2.2");let eL=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},eD={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ee};function eB(e){return(t,i)=>{let r;return"object"==typeof i?((e=eD,t,i)=>{let{kind:r,metadata:o}=i,s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){let{name:r}=i;return{set(i){let o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){let{name:r}=i;return function(i){let o=this[r];t.call(this,i),this.requestUpdate(r,o,e,!0,i)}}throw Error("Unsupported decorator location: "+r)})(e,t,i):(r=t.hasOwnProperty(i),t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0)}}function eF(e){return eB({...e,state:!0,attribute:!1})}let ej=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eN(e,t){return(i,r,o)=>{let s=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof r?i:o??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return ej(i,r,{get(){let e=t.call(this);return void 0===e&&(null!==(e=s(this))||this.hasUpdated)&&a.call(this,e),e}})}return ej(i,r,{get(){return s(this)}})}}function eq(e,t,i){return e?t(e):i?.(e)}let eU=/(?<literal>\[.*?\])|(?<year>YYYY|YY)|(?<month>M{1,4})|(?<day>Do|DD?)|(?<weekday>d{2,4})|(?<hour>HH?|hh?)|(?<minute>mm?)|(?<second>ss?)|(?<fractionalSecond>SSS)|(?<dayPeriod>A|a)|(?<timeZoneName>ZZ?)/g,eW=/(?<dateStyle>full|long|medium|short)(?:\+(?<timeStyle>full|long|medium|short))?/,eH=[["year",629856e5,31536e6,"yr"],["month",2628e6,2628e6,"mo"],["week",6048e5,6048e5,"wk"],["day",864e5,864e5,"d"],["hour",36e5,36e5,"h"],["minute",6e4,6e4,"m"],["second",1e3,1e3,"s"]],eV=new Map,eG=new Map,eK=["th","st","nd","rd"];function eZ(t,i){t??="decimal";let r=`${i??""}:${t}`,o=eG.get(r);if(null==o){let s={localeMatcher:"best fit",style:t};o=new Intl.NumberFormat(null==i?e:"system"===i?void 0:[i],s),eG.set(r,o)}return o.format}function eY(e,t,i){let o;if(null==i)return r??=eZ(),`${r(t)} ${e}${1===t?"":"s"}`;let s=1===t?e:i.plural??`${e}s`;return i.only?s:(0===t?o=i.zero??t:!1===i.format?o=t:null!=i.format?o=i.format(t):(r??=eZ(),o=r(t)),`${o}${i.infix??" "}${s}`)}new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let context_request_event_s=class context_request_event_s extends Event{constructor(e,t,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=i,this.subscribe=r??!1}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let i=t||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}};let context_provider_e=class context_provider_e extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(e,t,i){super(void 0!==t.context?t.initialValue:i),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:i}]of this.subscriptions)t.has(e)||(t.add(e),i.dispatchEvent(new context_request_event_s(this.context,i,e,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new context_provider_e(this.context,this.host))}};function eX({context:e}){return(t,i)=>{let r=new WeakMap;if("object"==typeof i)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new context_provider_i(this,{context:e,initialValue:t})),t}};{let o;t.constructor.addInitializer(t=>{r.set(t,new context_provider_i(t,{context:e}))});let s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){let e=new WeakMap;o={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=s.set;o={...s,set(t){r.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,i,o)}}}var eQ=Object.defineProperty,eJ=(e,t,i)=>{let r;return(r="symbol"!=typeof t?t+"":t)in e?eQ(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,i},e0=(e,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return e.has(t)},e1=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},e2=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot access private method");return i};function e5(e,t){return Object.is(e,t)}let e3=null,e6=!1,e4=1,e7=Symbol("SIGNAL");function e8(e){let t=e3;return e3=e,t}let e9={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function te(e){if(e6)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===e3)return;e3.consumerOnSignalRead(e);let t=e3.nextProducerIndex++;tr(e3),t<e3.producerNode.length&&e3.producerNode[t]!==e&&ti(e3)&&tt(e3.producerNode[t],e3.producerIndexOfThis[t]),e3.producerNode[t]!==e&&(e3.producerNode[t]=e,e3.producerIndexOfThis[t]=ti(e3)?function e(t,i,r){var o;if(to(t),tr(t),0===t.liveConsumerNode.length){null==(o=t.watched)||o.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)t.producerIndexOfThis[i]=e(t.producerNode[i],t,i)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(i)-1}(e,e3,t):0),e3.producerLastReadVersion[t]=e.version}function tt(e,t){var i;if(to(e),tr(e),"u">typeof ngDevMode&&ngDevMode&&t>=e.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);if(1===e.liveConsumerNode.length){null==(i=e.unwatched)||i.call(e.wrapper);for(let t=0;t<e.producerNode.length;t++)tt(e.producerNode[t],e.producerIndexOfThis[t])}let r=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[r],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[r],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let i=e.liveConsumerIndexOfThis[t],r=e.liveConsumerNode[t];tr(r),r.producerIndexOfThis[i]=t}}function ti(e){var t;return e.consumerIsAlwaysLive||((null==(t=null==e?void 0:e.liveConsumerNode)?void 0:t.length)??0)>0}function tr(e){e.producerNode??(e.producerNode=[]),e.producerIndexOfThis??(e.producerIndexOfThis=[]),e.producerLastReadVersion??(e.producerLastReadVersion=[])}function to(e){e.liveConsumerNode??(e.liveConsumerNode=[]),e.liveConsumerIndexOfThis??(e.liveConsumerIndexOfThis=[])}function ts(e){if(function e(t){if(t.dirty||t.lastCleanEpoch!==e4){if(!t.producerMustRecompute(t)&&!function(t){tr(t);for(let i=0;i<t.producerNode.length;i++){let r=t.producerNode[i],o=t.producerLastReadVersion[i];if(o!==r.version||(e(r),o!==r.version))return!0}return!1}(t)){t.dirty=!1,t.lastCleanEpoch=e4;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=e4}}(e),te(e),e.value===tl)throw e.error;return e.value}let tn=Symbol("UNSET"),ta=Symbol("COMPUTING"),tl=Symbol("ERRORED"),tc={...e9,value:tn,dirty:!0,error:null,equal:e5,producerMustRecompute:e=>e.value===tn||e.value===ta,producerRecomputeValue(e){let t;if(e.value===ta)throw Error("Detected cycle in computations.");let i=e.value;e.value=ta;let r=(e&&(e.nextProducerIndex=0),e8(e)),o=!1;try{t=e.computation.call(e.wrapper),o=i!==tn&&i!==tl&&e.equal.call(e.wrapper,i,t)}catch(i){t=tl,e.error=i}finally{if(e8(r),e&&void 0!==e.producerNode&&void 0!==e.producerIndexOfThis&&void 0!==e.producerLastReadVersion){if(ti(e))for(let t=e.nextProducerIndex;t<e.producerNode.length;t++)tt(e.producerNode[t],e.producerIndexOfThis[t]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}if(o){e.value=i;return}e.value=t,e.version++}},th=function(){throw Error()};function td(){return te(this),this.value}let tp={...e9,equal:e5,value:void 0},tu=Symbol("node");(e=>{var t,i,r,o;let State=class State{constructor(r,o={}){let s,a;e1(this,i),eJ(this,t);let c=((s=Object.create(tp)).value=r,(a=()=>(te(s),s.value))[e7]=s,a)[e7];if(this[tu]=c,c.wrapper=this,o){let t=o.equals;t&&(c.equal=t),c.watched=o[e.subtle.watched],c.unwatched=o[e.subtle.unwatched]}}get(){if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return td.call(this[tu])}set(t){var i,r;if(!(0,e.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(e6)throw Error("Writes to signals not permitted during Watcher callback");i=this[tu],(null==e3?void 0:e3.consumerAllowSignalWrites)===!1&&th(),i.equal.call(i.wrapper,i.value,t)||(i.value=t,r=i,r.version++,e4++,function e(t){if(void 0===t.liveConsumerNode)return;let i=e6;e6=!0;try{for(let i of t.liveConsumerNode)i.dirty||function(t){var i;t.dirty=!0,e(t),null==(i=t.consumerMarkedDirty)||i.call(t.wrapper??t)}(i)}finally{e6=i}}(r))}};t=tu,i=new WeakSet,e.isState=e=>"object"==typeof e&&e0(i,e),e.State=State;let Computed=class Computed{constructor(t,i){let s,a;e1(this,o),eJ(this,r);let c=((s=Object.create(tc)).computation=t,(a=()=>ts(s))[e7]=s,a)[e7];if(c.consumerAllowSignalWrites=!0,this[tu]=c,c.wrapper=this,i){let t=i.equals;t&&(c.equal=t),c.watched=i[e.subtle.watched],c.unwatched=i[e.subtle.unwatched]}}get(){if(!(0,e.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return ts(this[tu])}};r=tu,o=new WeakSet,e.isComputed=e=>"object"==typeof e&&e0(o,e),e.Computed=Computed,(t=>{var i,r,o,s;t.untrack=function(e){let t,i=null;try{i=e8(null),t=e()}finally{e8(i)}return t},t.introspectSources=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(i=t[tu].producerNode)?void 0:i.map(e=>e.wrapper))??[]},t.introspectSinks=function(t){var i;if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called introspectSinks without a Signal argument");return(null==(i=t[tu].liveConsumerNode)?void 0:i.map(e=>e.wrapper))??[]},t.hasSinks=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isState)(t))throw TypeError("Called hasSinks without a Signal argument");let i=t[tu].liveConsumerNode;return!!i&&i.length>0},t.hasSources=function(t){if(!(0,e.isComputed)(t)&&!(0,e.isWatcher)(t))throw TypeError("Called hasSources without a Computed or Watcher argument");let i=t[tu].producerNode;return!!i&&i.length>0};let Watcher=class Watcher{constructor(e){e1(this,r),e1(this,o),eJ(this,i);let t=Object.create(e9);t.wrapper=this,t.consumerMarkedDirty=e,t.consumerIsAlwaysLive=!0,t.consumerAllowSignalWrites=!1,t.producerNode=[],this[tu]=t}watch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e2(this,o,s).call(this,t);let i=this[tu];i.dirty=!1;let r=e8(i);for(let e of t)te(e[tu]);e8(r)}unwatch(...t){if(!(0,e.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");e2(this,o,s).call(this,t);let i=this[tu];tr(i);for(let e=i.producerNode.length-1;e>=0;e--)if(t.includes(i.producerNode[e].wrapper)){tt(i.producerNode[e],i.producerIndexOfThis[e]);let t=i.producerNode.length-1;if(i.producerNode[e]=i.producerNode[t],i.producerIndexOfThis[e]=i.producerIndexOfThis[t],i.producerNode.length--,i.producerIndexOfThis.length--,i.nextProducerIndex--,e<i.producerNode.length){let t=i.producerIndexOfThis[e],r=i.producerNode[e];to(r),r.liveConsumerIndexOfThis[t]=e}}}getPending(){if(!(0,e.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[tu].producerNode.filter(e=>e.dirty).map(e=>e.wrapper)}};i=tu,r=new WeakSet,o=new WeakSet,s=function(t){for(let i of t)if(!(0,e.isComputed)(i)&&!(0,e.isState)(i))throw TypeError("Called watch/unwatch without a Computed or State argument")},e.isWatcher=e=>e0(r,e),t.Watcher=Watcher,t.currentComputed=function(){var e;return null==(e=e3)?void 0:e.wrapper},t.watched=Symbol("watched"),t.unwatched=Symbol("unwatched")})(e.subtle||(e.subtle={}))})(x||(x={}));let tg=!1,tf=new x.subtle.Watcher(()=>{tg||(tg=!0,queueMicrotask(()=>{for(let e of(tg=!1,tf.getPending()))e.get();tf.watch()}))}),tm=Symbol("SignalWatcherBrand"),tb=new FinalizationRegistry(e=>{e.unwatch(...x.subtle.introspectSources(e))}),tv=new WeakMap;function ty(e){return!0===e[tm]?e:class extends e{constructor(){super(...arguments),this._$St=new Map,this._$So=new x.State(0),this._$Si=!1}_$Sl(){var e,t;let i=[],r=[];this._$St.forEach((e,t)=>{((null==e?void 0:e.beforeUpdate)?i:r).push(t)});let o=null==(e=this.h)?void 0:e.getPending().filter(e=>e!==this._$Su&&!this._$St.has(e));i.forEach(e=>e.get()),null==(t=this._$Su)||t.get(),o.forEach(e=>e.get()),r.forEach(e=>e.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(void 0!==this.h)return;this._$Su=new x.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new x.subtle.Watcher(function(){let e=tv.get(this);void 0!==e&&(!1===e._$Si&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});tv.set(e,this),tb.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(void 0===this.h)return;let e=!1;this.h.unwatch(...x.subtle.introspectSources(this.h).filter(t=>{var i;let r=!0!==(null==(i=this._$St.get(t))?void 0:i.manualDispose);return r&&this._$St.delete(t),e||(e=!r),r})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var i;this._$S_();let r=new x.Computed(()=>{e()});return this.h.watch(r),this._$St.set(r,t),null!=(i=null==t?void 0:t.beforeUpdate)&&i?x.subtle.untrack(()=>r.get()):this.updateComplete.then(()=>x.subtle.untrack(()=>r.get())),()=>{this._$St.delete(r),this.h.unwatch(r),!1===this.isConnected&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{!1===this.isConnected&&this._$Sp()})}}}let tw=e=>(...t)=>({_$litDirective$:e,values:t});let directive_i=class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};let{I:t_}={M:en,P:ea,A:el,C:1,L:eR,R,D:eg,V:eI,I:k,H,N:L,U:z,B:I,F:Z},tx=e=>e,tk=(e,t,i)=>{let r=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i)i=new t_(r.insertBefore(document.createComment(""),o),r.insertBefore(document.createComment(""),o),e,e.options);else{let t=i._$AB.nextSibling,s=i._$AM,a=s!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){let t=tx(e).nextSibling;tx(r).insertBefore(e,o),e=t}}}return i},t$=(e,t,i=e)=>(e._$AI(t,i),e),tC={},tS=(e,t=tC)=>e._$AH=t,tP=e=>{e._$AR(),e._$AA.remove()},tA=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),tA(e,t);return!0},tE=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},tT=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),tM(t)}};function tR(e){void 0!==this._$AN?(tE(this),this._$AM=e,tT(this)):this._$AM=e}function tI(e,t=!1,i=0){let r=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(r))for(let e=i;e<r.length;e++)tA(r[e],!1),tE(r[e]);else null!=r&&(tA(r,!1),tE(r));else tA(this,e)}let tM=e=>{2==e.type&&(e._$AP??=tI,e._$AQ??=tR)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),tT(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(tA(this,e),tE(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};let tz=!1,tO=new x.subtle.Watcher(async()=>{tz||(tz=!0,queueMicrotask(()=>{for(let e of(tz=!1,tO.getPending()))e.get();tO.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var e,t;void 0===this._$Sm&&(this._$Sj=new x.Computed(()=>{var e;let t=null==(e=this._$SW)?void 0:e.get();return this.setValue(t),t}),this._$Sm=null!=(t=null==(e=this._$Sk)?void 0:e.h)?t:tO,this._$Sm.watch(this._$Sj),x.subtle.untrack(()=>{var e;return null==(e=this._$Sj)?void 0:e.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return x.subtle.untrack(()=>e.get())}update(e,[t]){var i;return null!=this._$Sk||(this._$Sk=null==(i=e.options)?void 0:i.host),t!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=t,this._$S_(),x.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tL=tw(watch_r),tD=e=>(t,...i)=>e(t,...i.map(e=>e instanceof x.State||e instanceof x.Computed?tL(e):e));tD(e$),tD(eC),x.State,x.Computed;let tB=(e,t)=>new x.State(e,t),tF=(e,t)=>new x.Computed(e,t),{fromCharCode:tj}=String;new TextEncoder;let tN=new TextDecoder;function tq(e){return JSON.stringify(e)}let IpcCall=class IpcCall{constructor(e,t,i=!1){this.scope=e,this.reset=i,this.method=`${e}/${t}`}is(e){return e.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(e,t,i){super(e,t,i),this.response=new IpcNotification(this.scope,`${t}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let tU=new IpcRequest("core","webview/ready"),tW=new IpcCommand("core","webview/focus/changed");new IpcCommand("core","command/execute");let tH=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let tV=new IpcCommand("core","telemetry/sendEvent"),tG=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let tK=new IpcCommand("core","webview/focus/didChange"),tZ=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let tY=new WeakMap;function tX(e,t){return function(i,r,o){let s=tY.get(i.constructor);null==s&&tY.set(i.constructor,s=[]),s.push({method:o.value,keys:Array.isArray(e)?e:[e],afterFirstUpdate:t?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(e,t,i){let r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,...i,detail:t});return this.dispatchEvent(r),r}update(e){let t=tY.get(this.constructor);if(null!=t)for(let{keys:i,method:r,afterFirstUpdate:o}of t){if(o&&!this.hasUpdated)continue;let t=i.filter(t=>e.has(t));t.length&&r.call(this,t)}super.update(e)}};let tQ=/T/,tJ=/.*\s*?at\s(.+?)\s/,t0=/^_+/,t1=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(e,t=!1){this.#t={...e,sanitizeKeys:new Set([...t1,...e.sanitizeKeys??[]])},this.#i=t,this.#e=e.createChannel(e.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(e=>{this.#r=e})}enabled(e){return!!this.isDebugging||0!==this.#r&&(null==e||this.#r<=function(e){switch(e){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(e))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var e=this.#r;switch(e){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(tQ," ").slice(0,-1)}]`}trace(e,...t){let i;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.trace(`  ${i??""}${this.#o(!0,t)}`))}debug(e,...t){let i;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.debug(`  ${i??""}${this.#o(!1,t)}`))}info(e,...t){let i;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.info(`   ${i??""}${this.#o(!1,t)}`))}warn(e,...t){let i;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof e?i=e:(i=t.shift(),null!=e&&(i=`${e.prefix} ${i??""}`)),this.isDebugging,this.#e?.warn(`${i??""}${this.#o(!1,t)}`))}error(e,t,...i){let r;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(r=null==t||"string"==typeof t?t:`${t.prefix} ${i.shift()??""}`)){let t=e instanceof Error?e.stack:void 0;if(t){let e=tJ.exec(t);null!=e&&(r=e[1])}}this.isDebugging;let o=`  ${r??""}${this.#o(!1,i)}`;null!=e?this.#e?.error(String(e),o):this.#e?.error(o)}showOutputChannel(e){this.#e?.show?.(e)}toLoggable(e,t){if(null!=t){let i=this.sanitize(t,e);if(null!=i)return i}if("function"==typeof e)return"<function>";if(null==e||"object"!=typeof e||e instanceof Error)return String(e);if(Array.isArray(e)){let t=e.length>10?e.slice(0,10):e,i=e.length>10?`, \u2026+${e.length-10}`:"";return`[${t.map(e=>this.toLoggable(e)).join(", ")}${i}]`}let i=this.#t?.toLoggable,r=i?.(e);if(null!=r)return r;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(e,(e,t)=>{if(95!==e.charCodeAt(0))return o?.has(e)?this.sanitize(e,t):""===e||"object"!=typeof t||null==t||Array.isArray(t)?t:t instanceof Error?String(t):i?.(t)??t})}catch{return"<error>"}}sanitize(e,t){if(null==t)return;let i=e.replace(t0,"")||e;if(this.#t?.sanitizeKeys?.has(i))return null!=this.#t.hash?`<${i}:${this.#t.hash("string"==typeof t?t:JSON.stringify(t))}>`:`<${i}>`}#o(e,t){if(0===t.length||e&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let i=t.map(e=>this.toLoggable(e)).join(", ");return 0!==i.length?` \u2014 ${i}`:""}};let t2=new Logger,t5=new WeakMap,t3={enabled:e=>t2.enabled(e),log:(e,t,i,...r)=>{switch(e){case"error":t2.error(void 0,t,i,...r);break;case"warn":t?.warn(i,...r);break;case"info":t?.info(i,...r);break;case"debug":default:t?.debug(i,...r);break;case"trace":t?.trace(i,...r)}}},t6=0x40000000-1;function t4(){let e=0;return{get current(){return e},next:function(){return e===t6&&(e=0),++e},reset:function(){e=0}}}function t7(e){let t=.001*performance.now(),i=Math.floor(t),r=Math.floor(t%1*1e9);return void 0!==e&&(i-=e[0],(r-=e[1])<0&&(i--,r+=1e9)),[i,r]}function t8(e){let[t,i]=t7(e);return 1e3*t+Math.floor(i/1e6)}let t9=new Map;function ie(e,t){let i=o;o=e.scopeId,t9.set(e.scopeId,e);try{return t()}finally{o=i,t9.delete(e.scopeId)}}function it(){return null!=o?t9.get(o):void 0}let ii=t4();function ir(e,t,i){var r;let o,s,a={scopeId:e,prevScopeId:t,prefix:i,enabled:e=>t2.enabled(e),addExitInfo:function(...e){(o??=[]).push(...e)},setFailed:function(e){s=e},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:s}}};return io(a,"trace",t2.trace),io(a,"debug",t2.debug),io(a,"info",t2.info),io(a,"warn",t2.warn),Object.defineProperty(r=a,"error",{configurable:!0,enumerable:!0,get:function(){let e=(e,t,...i)=>t2.error(e,r,t,...i);return Object.defineProperty(r,"error",{value:e,writable:!1,enumerable:!0}),e}}),a}function io(e,t,i){Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){let r=i.bind(t2,e);return Object.defineProperty(e,t,{value:r,writable:!1,enumerable:!0}),r}})}function is(e,t,i){if(null!=i){let r=null==t?e.toString(16):`${t.toString(16)} \u2192 ${e.toString(16)}`;return null==r?`[${i.padEnd(13)}]`:`[${i}${r.padStart(13-i.length)}]`}return null==t?`[${e.toString(16).padStart(13)}]`:`[${t.toString(16).padStart(5)} \u2192 ${e.toString(16).padStart(5)}]`}function ia(){let e=it();if(null==e)return;let t=Object.create(e);return t[Symbol.dispose]=()=>{},t}function il(e,t,i){if(null!=t&&"boolean"!=typeof t)return ir(t.scopeId,t.prevScopeId,`${t.prefix}${e}`);let r=t?it()?.scopeId:void 0,o=ii.next();return ir(o,r,`${is(o,r,i)} ${e}`)}function ic(e,t,i,...r){switch(t){case"trace":t2.trace(e,i,...r);break;case"info":t2.info(e,i,...r);break;default:t2.debug(e,i,...r)}}let LoggerContext=class LoggerContext{constructor(e){this.scope=il(e,void 0),t2.configure({name:e,createChannel:function(e){let t=t2.isDebugging?function(e){}:function(e){};return{name:e,logLevel:0,trace:t,debug:t,info:t,warn:t,error:t}}},!1)}trace(e,...t){"string"==typeof e?t2.trace(this.scope,e,...t):t2.trace(e,t.shift(),...t)}debug(e,...t){"string"==typeof e?t2.debug(this.scope,e,...t):t2.debug(e,t.shift(),...t)}info(e,...t){"string"==typeof e?t2.info(this.scope,e,...t):t2.info(e,t.shift(),...t)}};let ih=new IpcNotification("home","subscription/didChange"),id="graph";new IpcCommand(id,"chooseRepository"),new IpcCommand(id,"dblclick"),new IpcCommand(id,"avatars/get"),new IpcCommand(id,"refs/metadata/get"),new IpcCommand(id,"rows/get"),new IpcCommand(id,"pullRequest/openDetails"),new IpcCommand(id,"row/action"),new IpcCommand(id,"search/openInView"),new IpcCommand(id,"search/cancel"),new IpcCommand(id,"columns/update"),new IpcCommand(id,"refs/update/visibility"),new IpcCommand(id,"filters/update/excludeTypes"),new IpcCommand(id,"configuration/update"),new IpcCommand(id,"search/update/mode"),new IpcCommand(id,"filters/update/includedRefs"),new IpcCommand(id,"selection/update"),new IpcRequest(id,"jumpToHead"),new IpcRequest(id,"chooseRef"),new IpcRequest(id,"chooseComparison"),new IpcRequest(id,"chooseAuthor"),new IpcRequest(id,"chooseFile"),new IpcRequest(id,"rows/ensure"),new IpcRequest(id,"search/history/get"),new IpcRequest(id,"search/history/store"),new IpcRequest(id,"search/history/delete"),new IpcRequest(id,"counts"),new IpcRequest(id,"row/hover/get"),new IpcRequest(id,"search"),new IpcNotification(id,"repositories/integration/didChange"),new IpcNotification(id,"didChange",!0),new IpcNotification(id,"configuration/didChange");let ip=new IpcNotification(id,"subscription/didChange");new IpcNotification(id,"org/settings/didChange"),new IpcNotification(id,"avatars/didChange"),new IpcNotification(id,"mcp/didChange"),new IpcNotification(id,"branchState/didChange"),new IpcNotification(id,"refs/didChangeMetadata"),new IpcNotification(id,"columns/didChange"),new IpcNotification(id,"scrollMarkers/didChange"),new IpcNotification(id,"refs/didChangeVisibility"),new IpcNotification(id,"rows/didChange"),new IpcNotification(id,"rows/stats/didChange"),new IpcNotification(id,"selection/didChange"),new IpcNotification(id,"workingTree/didChange"),new IpcNotification(id,"didSearch"),new IpcNotification(id,"didFetch"),new IpcNotification(id,"featurePreview/didStart");let iu="timeline";new IpcRequest(iu,"ref/choose"),new IpcRequest(iu,"path/choose"),new IpcCommand(iu,"point/open"),new IpcCommand(iu,"config/update"),new IpcCommand(iu,"scope/update");let ig=new IpcNotification(iu,"didChange");let PromosContext=class PromosContext{constructor(e){this.disposables=[],this._promos=new Map,this.ipc=e,this.disposables.push(this.ipc.onReceiveMessage(e=>{(ih.is(e)||ip.is(e)||ig.is(e))&&this._promos.clear()}))}async getApplicablePromo(e,t){let i=`${e}|${t}`,r=this._promos.get(i);return null==r&&(r=this.ipc.sendRequest(tH,{plan:e,location:t}).then(e=>e.promo,()=>void 0),this._promos.set(i,r)),await r}dispose(){this.disposables.forEach(e=>e.dispose())}};let TelemetryContext=class TelemetryContext{constructor(e){this.disposables=[],this.ipc=e}sendEvent(e){this.ipc.sendCommand(tV,e)}dispose(){this.disposables.forEach(e=>e.dispose())}};function im(e){return(e=e.toString().toLowerCase()).includes("ms")?parseFloat(e):e.includes("s")?1e3*parseFloat(e):parseFloat(e)}function ib(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function iv(e,t,i){let r,o,s,a,c,h,p,g,f,m,b=0;null!=i&&({edges:h,maxWait:p,cancellation:g,aggregator:f}=i);let v="leading"===(h??="trailing")||"both"===h,w="trailing"===h||"both"===h;function _(){if(null!=r){b=Date.now();let t=r,i=m;return m=void 0,r=void 0,s=e.apply(i,t)}}function x(){null!=a&&(clearTimeout(a),a=void 0)}function $(){null!=c&&(clearTimeout(c),c=void 0)}function C(){x(),$(),m=void 0,r=void 0,o=void 0,b=0}function S(...e){if(g?.aborted)return;let i=Date.now();null!=f&&null!=r?r=f(r,e):(m=this,r=e);let h=null==a&&null==c;o=i,x();let $=Date.now();if(o=$,a=setTimeout(()=>{a=void 0,function e(){let i,r,s=Date.now();if(i=s-(o??0),r=s-b,null==o||i>=t||i<0||null!=p&&r>=p){w&&_(),C();return}a=setTimeout(()=>{a=void 0,e()},t-(s-(o??0)))}()},t),null!=p&&!c){0===b&&(b=$);let e=p-($-b);e>0?c=setTimeout(()=>{c=void 0,w&&null!=r&&_(),b=Date.now()},e):(w&&null!=r&&_(),C())}return v&&h?_():s}return S.cancel=C,S.flush=function(){return x(),$(),_()},S.pending=function(){return null!=a||null!=c},g?.addEventListener("abort",C,{once:!0}),S}($||($={})).on=function(e,t,i,r){let o=!1;if("string"==typeof e){let s=function(t){let r=t?.target?.closest(e);null!=r&&i(t,r)};return document.addEventListener(t,s,r??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(t,s,r??!0))}}}let s=function(e){i(e,this)};return e.addEventListener(t,s,r??!1),{dispose:()=>{o||(o=!0,e.removeEventListener(t,s,r??!1))}}};var iy=Uint8Array,iw=Uint16Array,i_=Int32Array,ix=new iy([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ik=new iy([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),i$=new iy([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iC=function(e,t){for(var i=new iw(31),r=0;r<31;++r)i[r]=t+=1<<e[r-1];for(var o=new i_(i[30]),r=1;r<30;++r)for(var s=i[r];s<i[r+1];++s)o[s]=s-i[r]<<5|r;return{b:i,r:o}},iS=iC(ix,2),iP=iS.b,iA=iS.r;iP[28]=258,iA[258]=28;var iE=iC(ik,0),iT=iE.b;iE.r;for(var iR=new iw(32768),iI=0;iI<32768;++iI){var iM=(43690&iI)>>1|(21845&iI)<<1;iM=(61680&(iM=(52428&iM)>>2|(13107&iM)<<2))>>4|(3855&iM)<<4,iR[iI]=((65280&iM)>>8|(255&iM)<<8)>>1}for(var iz=function(e,t,i){for(var r,o=e.length,s=0,a=new iw(t);s<o;++s)e[s]&&++a[e[s]-1];var c=new iw(t);for(s=1;s<t;++s)c[s]=c[s-1]+a[s-1]<<1;if(i){r=new iw(1<<t);var h=15-t;for(s=0;s<o;++s)if(e[s])for(var p=s<<4|e[s],g=t-e[s],f=c[e[s]-1]++<<g,m=f|(1<<g)-1;f<=m;++f)r[iR[f]>>h]=p}else for(s=0,r=new iw(o);s<o;++s)e[s]&&(r[s]=iR[c[e[s]-1]++]>>15-e[s]);return r},iO=new iy(288),iI=0;iI<144;++iI)iO[iI]=8;for(var iI=144;iI<256;++iI)iO[iI]=9;for(var iI=256;iI<280;++iI)iO[iI]=7;for(var iI=280;iI<288;++iI)iO[iI]=8;for(var iL=new iy(32),iI=0;iI<32;++iI)iL[iI]=5;var iD=iz(iO,9,1),iB=iz(iL,5,1),iF=function(e){for(var t=e[0],i=1;i<e.length;++i)e[i]>t&&(t=e[i]);return t},ij=function(e,t,i){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&i},iN=function(e,t){var i=t/8|0;return(e[i]|e[i+1]<<8|e[i+2]<<16)>>(7&t)},iq=function(e,t,i){return(null==t||t<0)&&(t=0),(null==i||i>e.length)&&(i=e.length),new iy(e.subarray(t,i))},iU=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],iW=function(e,t,i){var r=Error(t||iU[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,iW),!i)throw r;return r},iH=function(e,t,i,r){var o=e.length,s=r?r.length:0;if(!o||t.f&&!t.l)return i||new iy(0);var a=!i,c=a||2!=t.i,h=t.i;a&&(i=new iy(3*o));var p=function(e){var t=i.length;if(e>t){var r=new iy(Math.max(2*t,e));r.set(i),i=r}},g=t.f||0,f=t.p||0,m=t.b||0,b=t.l,v=t.d,w=t.m,_=t.n,x=8*o;do{if(!b){g=ij(e,f,1);var $=ij(e,f+1,3);if(f+=3,$)if(1==$)b=iD,v=iB,w=9,_=5;else if(2==$){var C=ij(e,f,31)+257,S=ij(e,f+10,15)+4,P=C+ij(e,f+5,31)+1;f+=14;for(var A=new iy(P),E=new iy(19),T=0;T<S;++T)E[i$[T]]=ij(e,f+3*T,7);f+=3*S;for(var M=iF(E),O=(1<<M)-1,D=iz(E,M,1),T=0;T<P;){var B=D[ij(e,f,O)];f+=15&B;var F=B>>4;if(F<16)A[T++]=F;else{var j=0,N=0;for(16==F?(N=3+ij(e,f,3),f+=2,j=A[T-1]):17==F?(N=3+ij(e,f,7),f+=3):18==F&&(N=11+ij(e,f,127),f+=7);N--;)A[T++]=j}}var q=A.subarray(0,C),U=A.subarray(C);w=iF(q),_=iF(U),b=iz(q,w,1),v=iz(U,_,1)}else iW(1);else{var F=((f+7)/8|0)+4,W=e[F-4]|e[F-3]<<8,V=F+W;if(V>o){h&&iW(0);break}c&&p(m+W),i.set(e.subarray(F,V),m),t.b=m+=W,t.p=f=8*V,t.f=g;continue}if(f>x){h&&iW(0);break}}c&&p(m+131072);for(var G=(1<<w)-1,K=(1<<_)-1,Y=f;;Y=f){var j=b[iN(e,f)&G],X=j>>4;if((f+=15&j)>x){h&&iW(0);break}if(j||iW(2),X<256)i[m++]=X;else if(256==X){Y=f,b=null;break}else{var Q=X-254;if(X>264){var T=X-257,J=ix[T];Q=ij(e,f,(1<<J)-1)+iP[T],f+=J}var ee=v[iN(e,f)&K],et=ee>>4;ee||iW(3),f+=15&ee;var U=iT[et];if(et>3){var J=ik[et];U+=iN(e,f)&(1<<J)-1,f+=J}if(f>x){h&&iW(0);break}c&&p(m+131072);var ei=m+Q;if(m<U){var er=s-U,eo=Math.min(U,ei);for(er+m<0&&iW(3);m<eo;++m)i[m]=r[er+m]}for(;m<ei;++m)i[m]=i[m-U]}}t.l=b,t.p=Y,t.b=m,t.f=g,b&&(g=1,t.m=w,t.d=v,t.n=_)}while(!g)return m!=i.length&&a?iq(i,0,m):i.subarray(0,m)},iV=new iy(0),iG="u">typeof TextDecoder&&new TextDecoder;try{iG.decode(iV,{stream:!0})}catch{}var iK=function(e){for(var t="",i=0;;){var r=e[i++],o=(r>127)+(r>223)+(r>239);if(i+o>e.length)return{s:t,r:iq(e,i-1)};o?3==o?t+=String.fromCharCode(55296|(r=((15&r)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++])-65536)>>10,56320|1023&r):1&o?t+=String.fromCharCode((31&r)<<6|63&e[i++]):t+=String.fromCharCode((15&r)<<12|(63&e[i++])<<6|63&e[i++]):t+=String.fromCharCode(r)}};function iZ(e,t){if(t){for(var i="",r=0;r<e.length;r+=16384)i+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return i}if(iG)return iG.decode(e);var o=iK(e),s=o.s,i=o.r;return i.length&&iW(8),s}"function"==typeof queueMicrotask&&queueMicrotask;let iY=/\(([\s\S]*)\)/,iX=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,iQ=/\s?=.*$/;function iJ(e,t){return e?.status==="fulfilled"?e.value:t}function i0(e){var t,i;let r,o,s,a,c,h,p,g,f;return t="debug",c=!1,h=!0,null!=(i=e)&&({args:r,when:o,exit:s,prefix:a,onlyExit:c=!1,timing:h=!0}=i),p="object"==typeof h?h.warnAfter:1500,g=!1!==h||"object"==typeof c&&c.after>0,f="trace"===t?t2.trace:"debug"===t?t2.debug:t2.info,(e,i,h)=>{let m,b;if("function"==typeof h.value?(m=h.value,b="value"):"function"==typeof h.get&&(m=h.get,b="get"),null==m||null==b)throw Error("Not supported");let v=null==r?function(e){if("function"!=typeof e)throw Error("Not supported");if(0===e.length)return[];let t=Function.prototype.toString.call(e),i=(t=(t=t.replace(iX,"")||t).slice(0,t.indexOf("{"))).indexOf("("),r=t.indexOf(")");i=i>=0?i+1:0,r=r>0?r:t.indexOf("="),t=t.slice(i,r),t=`(${t})`;let o=iY.exec(t);return null!=o?o[1].split(",").map(e=>e.trim().replace(iQ,"")):[]}(m):[];h[b]=function(...e){let h;if(!t2.enabled()||null!=o&&!o.apply(this,e))return m.apply(this,e);let b=t2.enabled(t),w=ia(),_=w?.scopeId,x=ii.next(),$=this!=null?function(e){let t;if("function"==typeof e){if(null==(t=e.prototype?.constructor))return e.name}else t=e.constructor;let i=t?.name??"",r=i.indexOf("_");-1!==r&&(i=i.substring(r+1));let o=t;for(;null!=o;){let t=t5.get(o);if(null!=t)return t(e,i);o=Object.getPrototypeOf(o)}return i}(this):void 0,C=$?`${is(x,_)} ${$}.${i}`:`${is(x,_)} ${i}`;null!=a&&(C=a({id:x,instance:this,instanceName:$??"",name:i,prefix:C},...e));let S=ir(x,_,C),P=!1,A=()=>(P||(P=!0,h=function(e,t,i){if(!1===e||!t.length)return;if("function"==typeof e){let i=e(...t);if(!1===i)return;let r="";for(let[e,t]of Object.entries(i))r.length&&(r+=", "),r+=`${e}=${t2.toLoggable(t,e)}`;return r||void 0}let r="",o=-1;for(let e of t){let t=i[++o];r.length&&(r+=", "),r+=t?`${t}=${t2.toLoggable(e,t)}`:t2.toLoggable(e)}return r||void 0}(r,e,v)),h);if(!c&&b){let e=A();f.call(t2,e?`${C}(${e})`:C)}if(c||g||null!=s){let t=g?t7():void 0,i=e=>{let i=void 0!==t?` [${t8(t)}ms]`:"",r=S.getExitInfo();if(c){let t=A();t2.error(e,t?`${C}(${t})`:C,r?.details?`failed${r.details}${i}`:`failed${i}`)}else t2.error(e,C,r?.details?`failed${r.details}${i}`:`failed${i}`)},r=e=>{let i,r,o,a;null!=t?(i=t8(t))>p?(r=t2.warn,o=` [*${i}ms] (slow)`):(r=f,o=` [${i}ms]`):(o="",r=f);let h=S.getExitInfo();if(null!=s)if("function"==typeof s)try{a=s(e)}catch(e){a=`@log.exit error: ${e}`}else!0===s&&(a=`returned ${t2.toLoggable(e)}`);else h?.failed?(a=h.failed,r=(e,...t)=>t2.error(null,e,...t)):a="completed";if(b||r!==f){let e=A();c?(!0===c||0===c.after||i>c.after)&&r.call(t2,e?`${C}(${e}) ${a}${h?.details||""}${o}`:`${C} ${a}${h?.details||""}${o}`):r.call(t2,e?`${C}(${e}) ${a}${h?.details||""}${o}`:`${C} ${a}${h?.details||""}${o}`)}};return ie(S,()=>{var t;let o;try{o=m.apply(this,e)}catch(e){throw i(e),e}return null!=o&&null!=(t=o)&&(t instanceof Promise||"function"==typeof t?.then)?o.then(r,i):r(o),o})}return ie(S,()=>m.apply(this,e))}}}Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(e,t,...i){let r;this._stopped=!1,this.logScope=null!=e&&"string"!=typeof e?e:il(e??"",!1,t?.scopeLabel);let o=t?.log;if(r=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=t?.provider??t3,this._time=t7(),null!=r){if(!this.logProvider.enabled(this.logLevel))return;i.length?this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`,...i):this.logProvider.log(this.logLevel,this.logScope,`${r.message??""}${r.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return t8(this._time)}log(e){this.logCore(e,!1)}restart(e){this.logCore(e,!0),this._time=t7(),this._stopped=!1}stop(e){this._stopped||(this.restart(e),this._stopped=!0)}logCore(e,t){if(!this.logProvider.enabled(this.logLevel))return;if(!t)return void this.logProvider.log(this.logLevel,this.logScope,`${e?.message??""}${e?.suffix??""}`);let i=t8(this._time),r=e?.message??"";this.logProvider.log(i>250?"warn":this.logLevel,this.logScope,`${r?`${r} `:""}[${i}ms]${e?.suffix??""}`)}};(()=>{let e;var t,i,r={975:e=>{function t(e){if("string"!=typeof e)throw TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var i,r="",o=0,s=-1,a=0,c=0;c<=e.length;++c){if(c<e.length)i=e.charCodeAt(c);else{if(47===i)break;i=47}if(47===i){if(s===c-1||1===a);else if(s!==c-1&&2===a){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){var h=r.lastIndexOf("/");if(h!==r.length-1){-1===h?(r="",o=0):o=(r=r.slice(0,h)).length-1-r.lastIndexOf("/"),s=c,a=0;continue}}else if(2===r.length||1===r.length){r="",o=0,s=c,a=0;continue}}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(s+1,c):r=e.slice(s+1,c),o=c-s-1;s=c,a=0}else 46===i&&-1!==a?++a:a=-1}return r}var r={resolve:function(){for(var e,r,o="",s=!1,a=arguments.length-1;a>=-1&&!s;a--)a>=0?e=arguments[a]:(void 0===r&&(r=process.cwd()),e=r),t(e),0!==e.length&&(o=e+"/"+o,s=47===e.charCodeAt(0));return o=i(o,!s),s?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=i(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var e,i=0;i<arguments.length;++i){var o=arguments[i];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,i){if(t(e),t(i),e===i||(e=r.resolve(e))===(i=r.resolve(i)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var s=e.length,a=s-o,c=1;c<i.length&&47===i.charCodeAt(c);++c);for(var h=i.length-c,p=a<h?a:h,g=-1,f=0;f<=p;++f){if(f===p){if(h>p){if(47===i.charCodeAt(c+f))return i.slice(c+f+1);if(0===f)return i.slice(c+f)}else a>p&&(47===e.charCodeAt(o+f)?g=f:0===f&&(g=0));break}var m=e.charCodeAt(o+f);if(m!==i.charCodeAt(c+f))break;47===m&&(g=f)}var b="";for(f=o+g+1;f<=s;++f)f!==s&&47!==e.charCodeAt(f)||(0===b.length?b+="..":b+="/..");return b.length>0?b+i.slice(c+g):(c+=g,47===i.charCodeAt(c)&&++c,i.slice(c))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var i=e.charCodeAt(0),r=47===i,o=-1,s=!0,a=e.length-1;a>=1;--a)if(47===(i=e.charCodeAt(a))){if(!s){o=a;break}}else s=!1;return -1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,i){if(void 0!==i&&"string"!=typeof i)throw TypeError('"ext" argument must be a string');t(e);var r,o=0,s=-1,a=!0;if(void 0!==i&&i.length>0&&i.length<=e.length){if(i.length===e.length&&i===e)return"";var c=i.length-1,h=-1;for(r=e.length-1;r>=0;--r){var p=e.charCodeAt(r);if(47===p){if(!a){o=r+1;break}}else -1===h&&(a=!1,h=r+1),c>=0&&(p===i.charCodeAt(c)?-1==--c&&(s=r):(c=-1,s=h))}return o===s?s=h:-1===s&&(s=e.length),e.slice(o,s)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!a){o=r+1;break}}else -1===s&&(a=!1,s=r+1);return -1===s?"":e.slice(o,s)},extname:function(e){t(e);for(var i=-1,r=0,o=-1,s=!0,a=0,c=e.length-1;c>=0;--c){var h=e.charCodeAt(c);if(47!==h)-1===o&&(s=!1,o=c+1),46===h?-1===i?i=c:1!==a&&(a=1):-1!==i&&(a=-1);else if(!s){r=c+1;break}}return -1===i||-1===o||0===a||1===a&&i===o-1&&i===r+1?"":e.slice(i,o)},format:function(e){var t,i;if(null===e||"object"!=typeof e)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return t=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||""),t?t===e.root?t+i:t+"/"+i:i},parse:function(e){t(e);var i={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return i;var r,o=e.charCodeAt(0),s=47===o;s?(i.root="/",r=1):r=0;for(var a=-1,c=0,h=-1,p=!0,g=e.length-1,f=0;g>=r;--g)if(47!==(o=e.charCodeAt(g)))-1===h&&(p=!1,h=g+1),46===o?-1===a?a=g:1!==f&&(f=1):-1!==a&&(f=-1);else if(!p){c=g+1;break}return -1===a||-1===h||0===f||1===f&&a===h-1&&a===c+1?-1!==h&&(i.base=i.name=0===c&&s?e.slice(1,h):e.slice(c,h)):(0===c&&s?(i.name=e.slice(1,a),i.base=e.slice(1,h)):(i.name=e.slice(c,a),i.base=e.slice(c,h)),i.ext=e.slice(a,h)),c>0?i.dir=e.slice(0,c-1):s&&(i.dir="/"),i},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,s),i.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(s.r(a),s.d(a,{URI:()=>l,Utils:()=>i}),"object"==typeof process)?e="win32"===process.platform:"object"==typeof navigator&&(e=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function g(e,t){if(!e.scheme&&t)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!c.test(e.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(e.path){if(e.authority){if(!h.test(e.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(e.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(e){return e instanceof l||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString}scheme;authority;path;query;fragment;constructor(e,t,i,r,o,s=!1){"object"==typeof e?(this.scheme=e.scheme||"",this.authority=e.authority||"",this.path=e.path||"",this.query=e.query||"",this.fragment=e.fragment||""):(this.scheme=e||s?e:"file",this.authority=t||"",this.path=function(e,t){switch(e){case"https":case"http":case"file":t?"/"!==t[0]&&(t="/"+t):t="/"}return t}(this.scheme,i||""),this.query=r||"",this.fragment=o||"",g(this,s))}get fsPath(){return _(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:i,path:r,query:o,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=""),void 0===i?i=this.authority:null===i&&(i=""),void 0===r?r=this.path:null===r&&(r=""),void 0===o?o=this.query:null===o&&(o=""),void 0===s?s=this.fragment:null===s&&(s=""),t===this.scheme&&i===this.authority&&r===this.path&&o===this.query&&s===this.fragment?this:new d(t,i,r,o,s)}static parse(e,t=!1){let i=f.exec(e);return i?new d(i[2]||"",S(i[4]||""),S(i[5]||""),S(i[7]||""),S(i[9]||""),t):new d("","","","","")}static file(t){let i="";if(e&&(t=t.replace(/\\/g,"/")),"/"===t[0]&&"/"===t[1]){let e=t.indexOf("/",2);-1===e?(i=t.substring(2),t="/"):(i=t.substring(2,e),t=t.substring(e)||"/")}return new d("file",i,t,"","")}static from(e){let t=new d(e.scheme,e.authority,e.path,e.query,e.fragment);return g(t,!0),t}toString(e=!1){return x(this,e)}toJSON(){return this}static revive(e){if(e){if(e instanceof l)return e;{let t=new d(e);return t._formatted=e.external,t._fsPath=e._sep===m?e.fsPath:null,t}}return e}};let m=e?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(e=!1){return e?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=m),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}};let b={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function v(e,t,i){let r,o=-1;for(let s=0;s<e.length;s++){let a=e.charCodeAt(s);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||t&&47===a||i&&91===a||i&&93===a||i&&58===a)-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),void 0!==r&&(r+=e.charAt(s));else{void 0===r&&(r=e.substr(0,s));let t=b[a];void 0!==t?(-1!==o&&(r+=encodeURIComponent(e.substring(o,s)),o=-1),r+=t):-1===o&&(o=s)}}return -1!==o&&(r+=encodeURIComponent(e.substring(o))),void 0!==r?r:e}function w(e){let t;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);35===r||63===r?(void 0===t&&(t=e.substr(0,i)),t+=b[r]):void 0!==t&&(t+=e[i])}return void 0!==t?t:e}function _(t,i){let r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?`//${t.authority}${t.path}`:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&90>=t.path.charCodeAt(1)||t.path.charCodeAt(1)>=97&&122>=t.path.charCodeAt(1))&&58===t.path.charCodeAt(2)?i?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,e&&(r=r.replace(/\//g,"\\")),r}function x(e,t){let i=t?w:v,r="",{scheme:o,authority:s,path:a,query:c,fragment:h}=e;if(o&&(r+=o,r+=":"),(s||"file"===o)&&(r+="/",r+="/"),s){let e=s.indexOf("@");if(-1!==e){let t=s.substr(0,e);s=s.substr(e+1),-1===(e=t.lastIndexOf(":"))?r+=i(t,!1,!1):(r+=i(t.substr(0,e),!1,!1),r+=":",r+=i(t.substr(e+1),!1,!0)),r+="@"}-1===(e=(s=s.toLowerCase()).lastIndexOf(":"))?r+=i(s,!1,!0):(r+=i(s.substr(0,e),!1,!0),r+=s.substr(e))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let e=a.charCodeAt(1);e>=65&&e<=90&&(a=`/${String.fromCharCode(e+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let e=a.charCodeAt(0);e>=65&&e<=90&&(a=`${String.fromCharCode(e+32)}:${a.substr(2)}`)}r+=i(a,!0,!1)}return c&&(r+="?",r+=i(c,!1,!1)),h&&(r+="#",r+=t?h:v(h,!1,!1)),r}let $=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function S(e){return e.match($)?e.replace($,e=>(function e(t){try{return decodeURIComponent(t)}catch{return t.length>3?t.substr(0,3)+e(t.substr(3)):t}})(e)):e}var P=s(975);let A=P.posix||P;(t=i||(i={})).joinPath=function(e,...t){return e.with({path:A.join(e.path,...t)})},t.resolvePath=function(e,...t){let i=e.path,r=!1;"/"!==i[0]&&(i="/"+i,r=!0);let o=A.resolve(i,...t);return r&&"/"===o[0]&&!e.authority&&(o=o.substring(1)),e.with({path:o})},t.dirname=function(e){if(0===e.path.length||"/"===e.path)return e;let t=A.dirname(e.path);return 1===t.length&&46===t.charCodeAt(0)&&(t=""),e.with({path:t})},t.basename=function(e){return A.basename(e.path)},t.extname=function(e){return A.extname(e.path)},C=a})();let{URI:i1,Utils:i2}=C;function i5(e,t){return JSON.parse(e,(e,i)=>(function(e,t){let i=function(e){if("object"!=typeof e||null==e)return;let t=e.__ipc;if(null!=t)switch(t){case"date":return"number"==typeof e.value?e:void 0;case"promise":return"object"==typeof e.value&&"string"==typeof e.value.id&&"string"==typeof e.value.method?e:void 0;case"uri":return"object"==typeof e.value&&"string"==typeof e.value?.scheme?e:void 0;default:return}}(e);if(null==i)return e;switch(i.__ipc){case"date":return new Date(i.value);case"promise":return t(i.value);case"uri":return i1.revive(i.value)}})(i,t))}let i3="__supertalk_rpc__";function i6(e){return"object"==typeof e&&null!==e&&i3 in e&&!0===e[i3]}let i4=new TextEncoder,i7=new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(e,t,i)=>{this.listeners??=new LinkedList;let r=this.listeners.push(null==t?e:[e,t]),o={dispose:()=>{o.dispose=Emitter._noop,this._disposed||r()}};return Array.isArray(i)&&i.push(o),o},this._event}fire(e){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let t=this.listeners.iterator(),i=t.next();!i.done;i=t.next())this._deliveryQueue.push([i.value,e]);for(;this._deliveryQueue.size>0;){let[e,t]=this._deliveryQueue.shift();try{"function"==typeof e?e(t):e[0].call(e[1],t)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let i8={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(e){this.element=e,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){let i=new events_Node(e);if(this._first===events_Node.Undefined)this._first=i,this._last=i;else if(t){let e=this._last;this._last=i,i.prev=e,e.next=i}else{let e=this._first;this._first=i,i.next=e,e.prev=i}this._size+=1;let r=!1;return()=>{r||(r=!0,this._remove(i))}}shift(){if(this._first===events_Node.Undefined)return;let e=this._first.element;return this._remove(this._first),e}pop(){if(this._last===events_Node.Undefined)return;let e=this._last.element;return this._remove(this._last),e}_remove(e){if(e.prev!==events_Node.Undefined&&e.next!==events_Node.Undefined){let t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===events_Node.Undefined&&e.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):e.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):e.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let e,t=this._first;return{next:function(){return t===events_Node.Undefined?i8:(null==e?e={done:!1,value:t.element}:e.value=t.element,t=t.next,e)}}}toArray(){let e=[];for(let t=this._first;t!==events_Node.Undefined;t=t.next)e.push(t.element);return e}};var i9=Object.defineProperty,re=Object.getOwnPropertyDescriptor,rt=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),ri=e=>{throw TypeError(e)},rr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?re(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&i9(t,i,s),s};function ro(){return s??=null!=a?a():acquireVsCodeApi()}let rs=t4();function rn(){return`webview:${rs.next()}`}let ra=class{constructor(e){this.appName=e,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=ro(),this._disposable=$.on(window,"message",e=>this.onMessageReceived(e))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(e){var t,i,r,s,a,c,h,p,g=[];try{if(i6(e.data))return;let s=e.data,a=((e,t,i)=>{if(null!=t){var r,o;"object"!=typeof t&&"function"!=typeof t&&ri("Object expected"),i&&(r=t[rt("asyncDispose")]),void 0===r&&(r=t[rt("dispose")],i&&(o=r)),"function"!=typeof r&&ri("Object not disposable"),o&&(r=function(){try{o.call(this)}catch(e){return Promise.reject(e)}}),e.push([i,r,t])}else i&&e.push([i]);return t})(g,function(e,t,i){var r,s;let a,c,h;if(!t2.enabled())return;let p=(r=i?.scope??!0,s=i?.scopeLabel,c=it(),o=(h=il(e,r,s)).scopeId,t9.set(h.scopeId,h),h[Symbol.dispose]=()=>{let e;e=h?.scopeId??o,null!=e&&t9.delete(e),o=c?.scopeId},h);if(!t)return p;let g="debug",f=!1;"object"==typeof t&&(g=t.level??g,a=t.message,f=!0===t.onlyExit);let m=t7();f||ic(p,g,a??"");let b=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let e=t8(m),t=` [${e}ms]`,i=p.getExitInfo(),r=i.failed??"completed";null!=i.failed?t2.error(null,p,`${r}${i.details??""}${t}`):ic(p,g,`${r}${i.details??""}${t}`),b()},p}(`(e=${s.id}|${s.method})`,void 0,{scope:ia()})),c=function(e,t,...i){let r=("object"==typeof t?.log?t.log.level:void 0)??"info";return(t?.provider??t3).enabled(r)?new Stopwatch(e,t,...i):void 0}(a,{log:{onlyExit:!0,level:"debug"}});if(s.compressed&&s.params instanceof Uint8Array){if("deflate"===s.compressed)try{s.params=iZ((r=s.params,iH(r,{i:2},void 0,void 0)))}catch(e){s.params=iZ(s.params)}else s.params=iZ(s.params);c?.restart({message:`\u2022 decompressed (${s.compressed}) serialized params`})}if("string"==typeof s.params?(s.params=i5(s.params,e=>this.getResponsePromise(e.method,e.id)),c?.stop({message:"• deserialized params"})):null==s.params?c?.stop({message:"• no params"}):c?.stop({message:"• invalid params"}),a?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-s.timestamp}ms`),null!=s.completionId){let e=(t=s.method,i=s.completionId,`${t}|${i}`);this._pendingHandlers.get(e)?.(s);return}this._onReceiveMessage.fire(s)}catch(e){var f=e,m=!0}finally{s=f,a=m,c="function"==typeof SuppressedError?SuppressedError:function(e,t,i,r){return(r=Error(i)).name="SuppressedError",r.error=e,r.suppressed=t,r},h=e=>s=a?new c(e,s,"An error was suppressed during disposal"):(a=!0,e),(p=e=>{for(;e=g.pop();)try{var t=e[1]&&e[1].call(e[2]);if(e[0])return Promise.resolve(t).then(p,e=>(h(e),p()))}catch(e){h(e)}if(a)throw s})()}}deserializeIpcData(e){return i5(e,e=>this.getResponsePromise(e.method,e.id))}sendCommand(e,t){let i=rn();this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now()})}async sendRequest(e,t){let i=rn(),r=this.getResponsePromise(e.response.method,i);return this.postMessage({id:i,scope:e.scope,method:e.method,params:t,compressed:!1,timestamp:Date.now(),completionId:i}),r}getResponsePromise(e,t){return new Promise((i,r)=>{var o,s;let a,c=(o=e,s=t,`${o}|${s}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),r(Error(`Timed out waiting for completion of ${c}`))},(t2.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,e=>{if(h.call(this),e.method===tG.method){let t=e.params;"rejected"===t.status?queueMicrotask(()=>r(Error(t.reason))):queueMicrotask(()=>i(t.value))}else queueMicrotask(()=>i(e.params))})})}setPersistedState(e){this._api.setState(e)}updatePersistedState(e){let t=this._api.getState();null!=t&&"object"==typeof t?(t={...t,...e},this._api.setState(t)):t=e,this.setPersistedState(t)}postMessage(e){this._api.postMessage(e)}};function rl(e,t){let i=Math.pow(10,t);return Math.round(e*i)/i}rr([i0({args:e=>({e:`${e.data.id}|${e.data.method}`})})],ra.prototype,"onMessageReceived",1),rr([i0({args:e=>({commandType:e.method})})],ra.prototype,"sendCommand",1),rr([i0({args:e=>({requestType:e.method})})],ra.prototype,"sendRequest",1),rr([i0({args:e=>({e:`${e.id}, method=${e.method}`})})],ra.prototype,"postMessage",1),ra=rr([(b=e=>`${e.appName}(HostIpc)`,e=>void t5.set(e,b))],ra);let RGBA=class RGBA{constructor(e,t,i,r=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,i)),this.a=rl(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}};let HSLA=class HSLA{constructor(e,t,i,r){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rl(Math.max(Math.min(1,t),0),3),this.l=rl(Math.max(Math.min(1,i),0),3),this.a=rl(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=e.a,s=Math.max(t,i,r),a=Math.min(t,i,r),c=0,h=0,p=(a+s)/2,g=s-a;if(g>0){switch(h=Math.min(p<=.5?g/(2*p):g/(2-2*p),1),s){case t:c=(i-r)/g+6*(i<r);break;case i:c=(r-t)/g+2;break;case r:c=(t-i)/g+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,o)}static _hue2rgb(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}static toRGBA(e){let t,i,r,o=e.h/360,{s,l:a,a:c}=e;if(0===s)t=i=r=a;else{let e=a<.5?a*(1+s):a+s-a*s,c=2*a-e;t=HSLA._hue2rgb(c,e,o+1/3),i=HSLA._hue2rgb(c,e,o),r=HSLA._hue2rgb(c,e,o-1/3)}return new RGBA(Math.round(255*t),Math.round(255*i),Math.round(255*r),c)}};let HSVA=class HSVA{constructor(e,t,i,r){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=rl(Math.max(Math.min(1,t),0),3),this.v=rl(Math.max(Math.min(1,i),0),3),this.a=rl(Math.max(Math.min(1,r),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){let t=e.r/255,i=e.g/255,r=e.b/255,o=Math.max(t,i,r),s=o-Math.min(t,i,r);return new HSVA(Math.round(60*(0===s?0:o===t?((i-r)/s%6+6)%6:o===i?(r-t)/s+2:(t-i)/s+4)),0===o?0:s/o,o,e.a)}static toRGBA(e){let{h:t,s:i,v:r,a:o}=e,s=r*i,a=s*(1-Math.abs(t/60%2-1)),c=r-s,[h,p,g]=[0,0,0];return t<60?(h=s,p=a):t<120?(h=a,p=s):t<180?(p=s,g=a):t<240?(p=a,g=s):t<300?(h=a,g=s):t<=360&&(h=s,g=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),g=Math.round((g+c)*255),o)}};function rc(e,t){return t.getPropertyValue(e).trim()}let Color=class Color{static from(e){return e instanceof Color?e:parseColor(e)||Color.red}static fromCssVariable(e,t){return parseColor(rc(e,t))||Color.red}static fromHex(e){return parseHexColor(e)||Color.red}static equals(e,t){return!e&&!t||!!e&&!!t&&e.equals(t)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(e){if(e)if(e instanceof RGBA)this.rgba=e;else if(e instanceof HSLA)this._hsla=e,this.rgba=HSLA.toRGBA(e);else if(e instanceof HSVA)this._hsva=e,this.rgba=HSVA.toRGBA(e);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(e){return null!=e&&!!e&&RGBA.equals(this.rgba,e.rgba)&&HSLA.equals(this.hsla,e.hsla)&&HSVA.equals(this.hsva,e.hsva)}getRelativeLuminance(){return rl(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){let t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}luminance(e){return luminance(this,e)}getContrastRatio(e){let t=this.getRelativeLuminance(),i=e.getRelativeLuminance();return t>i?(t+.05)/(i+.05):(i+.05)/(t+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(t,i,r,o*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(e){let t=e.rgba,i=this.rgba.a,r=t.a,o=i+r*(1-i);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*i/o+t.r*r*(1-i)/o,this.rgba.g*i/o+t.g*r*(1-i)/o,this.rgba.b*i/o+t.b*r*(1-i)/o,o))}mix(e,t){return mixColors(this,e,t)}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;let{r:t,g:i,b:r,a:o}=this.rgba;return new Color(new RGBA(e.rgba.r-o*(e.rgba.r-t),e.rgba.g-o*(e.rgba.g-i),e.rgba.b-o*(e.rgba.b-r),1))}flatten(...e){let t=e.reduceRight((e,t)=>Color._flatten(t,e));return Color._flatten(this,t)}static _flatten(e,t){let i=1-e.rgba.a;return new Color(new RGBA(i*t.rgba.r+e.rgba.a*e.rgba.r,i*t.rgba.g+e.rgba.a*e.rgba.g,i*t.rgba.b+e.rgba.a*e.rgba.b))}toString(){return this._toString||(this._toString=function(e){return e.isOpaque()?`#${rh(e.rgba.r)}${rh(e.rgba.g)}${rh(e.rgba.b)}`:`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${Number(e.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(e,t,i){if(e.isLighterThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(o-r)/o,e.lighten(i)}static getDarkerColor(e,t,i){if(e.isDarkerThan(t))return e;i=i||.5;let r=e.getRelativeLuminance(),o=t.getRelativeLuminance();return i=i*(r-o)/r,e.darken(i)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rh(e){let t=e.toString(16);return 2!==t.length?`0${t}`:t}let rd=new Emitter,rp=rd.event;function ru(e){let t=document.documentElement,i=window.getComputedStyle(t),r=document.body.classList,o=r.contains("vscode-light")||r.contains("vscode-high-contrast-light"),s=r.contains("vscode-high-contrast")||r.contains("vscode-high-contrast-light"),a=rc("--vscode-editor-background",i),c=rc("--vscode-editor-foreground",i);return c||(c=rc("--vscode-foreground",i)),{colors:{background:a,foreground:c},computedStyle:i,isLightTheme:o,isHighContrastTheme:s,isInitializing:null==e}}var rg=Object.defineProperty,rf=Object.getOwnPropertyDescriptor,rm=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rf(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rg(t,i,s),s};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(e){let t=JSON.parse(tN.decode(function(e){let t=globalThis.atob(e),i=t.length,r=new Uint8Array(i),o=0,s=i-i%8;for(;o<s;o+=8)r[o]=t.charCodeAt(o),r[o+1]=t.charCodeAt(o+1),r[o+2]=t.charCodeAt(o+2),r[o+3]=t.charCodeAt(o+3),r[o+4]=t.charCodeAt(o+4),r[o+5]=t.charCodeAt(o+5),r[o+6]=t.charCodeAt(o+6),r[o+7]=t.charCodeAt(o+7);for(;o<i;o++)r[o]=t.charCodeAt(o);return r}(e))),i=t.webviewId,r=t.webviewInstanceId;this._webview={webviewId:i,webviewInstanceId:r,createCommandLink:(e,t)=>{var o;return e.endsWith(":")&&(e=`${e}${i.split(".").at(-1)}`),o=e,`command:${o}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...t}))}`}}}connectedCallback(){let e,t,i,r;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new ra(this.name);let o=ru();if(null!=this.onThemeUpdated){let e;this.onThemeUpdated(o),this.disposables.push(((e=new MutationObserver(e=>{rd.fire(ru(e))})).observe(document.body,{attributeFilter:["class"]}),{dispose:()=>e.disconnect()})),this.disposables.push(rp(this.onThemeUpdated,this))}this.disposables.push(this._ipc.onReceiveMessage(e=>{switch(!0){case tK.is(e):this.onWebviewFocusChanged?.(e.params.focused),window.dispatchEvent(new CustomEvent(e.params.focused?"webview-focus":"webview-blur"));break;case tZ.is(e):this.onWebviewVisibilityChanged?.(e.params.visible),window.dispatchEvent(new CustomEvent(e.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(i=0,r=iv(e=>{let t=`webview:${++i}`;ro().postMessage({id:t,scope:tW.scope,method:tW.method,params:e,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:i=>{let o=i.composedPath().some(e=>"INPUT"===e.tagName);(!0!==e||t!==o)&&(e=!0,t=o,r({focused:!0,inputFocused:o}))},onFocusOut:i=>{(!1!==e||!1!==t)&&(e=!1,t=!1,r({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(e=>{e.href===e.title&&e.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(e=>e.dispose())}render(){return e$`<slot></slot>`}};rm([eB({type:String})],GlWebviewApp.prototype,"name",2),rm([eB({type:String})],GlWebviewApp.prototype,"placement",2),rm([eX({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rm([eX({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rm([eX({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rm([eX({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rm([eX({context:"webview"})],GlWebviewApp.prototype,"_webview",2);let rb=ty(GlWebviewApp);let SignalWatcherWebviewApp=class SignalWatcherWebviewApp extends rb{connectedCallback(){super.connectedCallback?.(),this._ipc.sendRequest(tU,{bootstrap:!1})}};let VsCodeStorage=class VsCodeStorage{constructor(){this._api=ro()}get(){return this._api.getState()}set(e){this._api.setState(e)}};function rv(){return{storage:new VsCodeStorage,createEndpoint:()=>{let e,t;return e=ro(),t=new Map,{postMessage:function(t,i){let r={[i3]:!0,payload:i4.encode(JSON.stringify(t))};e.postMessage(r)},addEventListener:function(e,i){if("message"!==e)return;let r=e=>{let t=e.data;if(!i6(t))return;let{payload:r}=t;i(new MessageEvent("message",{data:r instanceof Uint8Array||r instanceof ArrayBuffer?JSON.parse(i7.decode(r)):r,origin:e.origin,lastEventId:e.lastEventId,source:e.source,ports:[...e.ports]}))};t.set(i,r),window.addEventListener("message",r)},removeEventListener:function(e,i){if("message"!==e)return;let r=t.get(i);r&&(window.removeEventListener("message",r),t.delete(i))},dispose:function(){for(let e of t.values())window.removeEventListener("message",e);t.clear()}}}}}let ry="__st__",rw=Symbol(),r_=Symbol(),rx=()=>{},rk=Symbol(),r$=Symbol();function rC(e){if(e instanceof Error){let t={name:e.name,message:e.message};return void 0!==e.stack&&(t.stack=e.stack),t}return{name:"Error",message:String(e)}}function rS(e){let t=Error(e.message);return t.name=e.name,t.stack=e.stack,t}Symbol(),new WeakMap;let NonCloneableError=class NonCloneableError extends Error{valueType;path;constructor(e,t){super(`The nested ${e} at "${t}" cannot be cloned. Use nestedProxies: true.`),this.valueType=e,this.path=t,this.name="NonCloneableError"}};let Connection=class Connection{#s;#n;#a;#l;#c;#h=new Map;#d=0;#p=1;#u=!1;#g=new Map;#f=new WeakMap;#m=new Map;#b=new WeakMap;#v;#y=0;#w=new Map;#_=new Map;#x;#k=[];#$=!1;constructor(e,t={}){for(let i of(this.#s=e,this.#n=t.nestedProxies??!1,this.#a=t.debug??!1,this.#l=t.logger,this.#c=t.handlers??[],this.#x=t.batching??!1,this.#c))this.#h.set(i.wireType,i),"function"==typeof i.connect&&i.connect({sendMessage:e=>{this.#C(i.wireType,e)}});this.#v=new FinalizationRegistry(({id:e,session:t})=>{t===this.#y&&(this.#m.delete(e),this.#S({type:"release",id:e}))}),e.addEventListener("message",this.#P)}#S(e,t){if(!this.#u){if(!this.#x)return void this.#s.postMessage(e,t);this.#k.push({message:e,transfers:t}),this.#$||(this.#$=!0,queueMicrotask(()=>this.#A()))}}#A(){this.#$=!1;let e=this.#k;if(this.#k=[],0===e.length)return;let t=t=>{let i=t instanceof Error?t:Error(String(t));for(let{message:t}of e)if("call"===t.type&&void 0!==t.id){let e=this.#w.get(t.id);e&&(this.#w.delete(t.id),e.reject(i))}};if(1===e.length){let{message:i,transfers:r}=e[0];try{this.#s.postMessage(i,r)}catch(e){t(e)}}else{let i=[],r=[];for(let{message:t,transfers:o}of e)r.push(t),o&&i.push(...o);try{this.#s.postMessage({type:"batch",messages:r},i.length>0?i:void 0)}catch(e){t(e)}}}#C(e,t){let i=[];this.#S({type:"handler",wireType:e,payload:this.#E(t,"",i)},i)}#T(){let e=this.#d;return this.#d+=this.#p,e}expose(e){this.#p=2,this.#R(e),this.#S({type:"return",id:0,value:this.#I(e)})}#M(e){this.#k=[],this.#$=!1;let t=Error(e);for(let{reject:e}of this.#w.values())e(t);for(let{reject:e}of(this.#w.clear(),this.#_.values()))e(t);this.#_.clear()}close(){for(let e of(this.#u=!0,this.#M("Connection closed"),this.#s.removeEventListener("message",this.#P),this.#c))e.disconnect?.()}reset(e){for(let e of(this.#M("Connection reset"),this.#g.clear(),this.#f=new WeakMap,this.#m.clear(),this.#b=new WeakMap,this.#y++,this.#d=0,this.#p=1,this.#c))e.disconnect?.();for(let t of(void 0!==e&&e!==this.#s?(this.#u||this.#s.removeEventListener("message",this.#P),this.#s=e,e.addEventListener("message",this.#P)):this.#u&&this.#s.addEventListener("message",this.#P),this.#u=!1,this.#c))"function"==typeof t.connect&&t.connect({sendMessage:e=>{this.#C(t.wireType,e)}})}#z(e){if(e!==this.#y)throw Error("Stale proxy from previous session")}waitForReady(){return this.#d=1,this.#p=2,new Promise((e,t)=>{this.#w.set(0,{resolve:e,reject:t})})}#R(e){let t=this.#f.get(e);return void 0!==t||(t=this.#T(),this.#g.set(t,e),this.#f.set(e,t)),t}#O(e){return this.#g.get(e)}#L(e){return this.#m.get(e)?.deref()}#D(e){return this.#b.get(e)}#E(e,t,i){return"object"==typeof e?.[rk]?{[ry]:"property",...e[rk]}:this.#B(e,t,i,new Map)}#I(e,t=!1){return{[ry]:"proxy",id:this.#D(e)??this.#R(e),o:t}}#B(e,t,i,r,o){if(null==e||"object"!=typeof e&&"function"!=typeof e)return e;let s=r.get(e);if(void 0!==s)return s;if(e?.[r_]===!0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("transfer",t);return i.includes(e.value)||i.push(e.value),r.set(e,e.value),e.value}if(e?.[rw]!==void 0){if(t&&this.#a&&!this.#n)throw new NonCloneableError("proxy",t);let i=this.#I(e[rw],e?.[r$]==="handle");return r.set(e,i),i}if("function"==typeof e){if(t&&this.#a&&!this.#n)throw new NonCloneableError("function",t);let i=this.#I(e);return r.set(e,i),i}if(void 0!==this.#D(e)){let t=this.#I(e,"__o"in e);return r.set(e,t),t}if("function"==typeof e?.then){if(t&&this.#a&&!this.#n)throw new NonCloneableError("promise",t);let i={[ry]:"promise",id:this.#F(e)};return r.set(e,i),i}if(this.#c.length>0){for(let s of this.#c)if(s.canHandle(e)){let a={toWire:(e,s)=>{let a=s?t?`${t}.${s}`:s:t;return this.#B(e,a,i,r,o)},...void 0!==o&&{callId:o}},c=s.toWire(e,a);return r.set(e,c),c}}if(!(this.#n||this.#a))return e;if(Array.isArray(e)){let s=[];r.set(e,s);for(let a=0;a<e.length;a++)s.push(this.#B(e[a],`${t}[${String(a)}]`,i,r,o));return s}let a=Object.getPrototypeOf(e);if(a===Object.prototype||null===a){let s={};for(let a of(r.set(e,s),Object.keys(e)))s[a]=this.#B(e[a],t?`${t}.${a}`:a,i,r,o);return s}return e}#j(e){return{fromWire:t=>this.#N(t,e)}}#q(e){let t=e?.[ry];if("property"===t){let t=this.#O(e.targetProxyId);if(!t)throw ReferenceError(`Proxy property target ${String(e.targetProxyId)} not found`);return t[e.property]}if("thrown"===t)throw rS(e.error);return this.#N(e,new Map)}#N(e,t){if(null===e||"object"!=typeof e)return e;let i=t.get(e);if(void 0!==i)return i;if(e?.[ry]==="proxy"){let i=this.#O(e.id);if(i){let r=e.o?{[rw]:i,[r$]:"handle",__nc:rx}:new Proxy(rx,{get:(e,t)=>{var r,o,s;let a;return t===rw?i:t===r$?"proxy":"then"!==t?(r=i,o=t,s=i[t],(a=(...e)=>{if("function"==typeof s)return Promise.resolve(s.apply(r,e));throw TypeError(`${String(o)} is not a function`)}).then=(e,t)=>Promise.resolve(s).then(e,t),a):void 0},set:(e,t,r)=>(i[t]=r,!0),apply(e,t,r){if("function"==typeof i)return Promise.resolve(i(...r));throw TypeError("Proxy target is not callable")}});return t.set(e,r),r}let r=this.#L(e.id)??this.#U(e.id,e.o);return t.set(e,r),r}if(e?.[ry]==="promise"){let{promise:i,resolve:r,reject:o}=Promise.withResolvers();return this.#_.set(e.id,{resolve:r,reject:o}),t.set(e,i),i}let r=e[ry];if("string"==typeof r){let i=this.#h.get(r);if(i?.fromWire){let r=i.fromWire(e,this.#j(t));return t.set(e,r),r}}if(!this.#n)return e;if(Array.isArray(e)){let i=[];for(let r of(t.set(e,i),e))i.push(this.#N(r,t));return i}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let o={};for(let i of(t.set(e,o),Object.keys(e)))o[i]=this.#N(e[i],t);return o}#F(e){let t=this.#T();return e.then(e=>{try{let i=[],r=this.#E(e,"",i);this.#S({type:"resolve",id:t,value:r},i)}catch{this.#S({type:"reject",id:t,error:rC(Error("Failed to serialize resolved promise value"))})}},e=>{try{this.#S({type:"reject",id:t,error:rC(e)})}catch{}}),t}#U(e,t){let i=this.#L(e);if(void 0===i){let r=this.#y;i=t?{__o:rx}:new Proxy(rx,{apply:(t,i,o)=>(this.#z(r),this.#W(e,void 0,o)),get:(t,i)=>"string"==typeof i&&"then"!==i?this.#H(e,i,r):void 0,set:(t,i,o)=>{if("string"!=typeof i)return!1;this.#z(r);let s=[];return this.#V(this.#T(),e,"set",i,[this.#E(o,"",s)],s).catch(()=>{}),!0}}),this.#m.set(e,new WeakRef(i)),this.#b.set(i,e),this.#v.register(i,{id:e,session:this.#y})}return i}#H(e,t,i){let r=(...r)=>(this.#z(i),this.#W(e,t,r));return r.then=(r,o)=>(this.#z(i),this.#V(this.#T(),e,"get",t,[],[]).then(r,o)),r[rk]={targetProxyId:e,property:t},r}#V(e,t,i,r,o,s){let{promise:a,resolve:c,reject:h}=Promise.withResolvers();this.#w.set(e,{resolve:c,reject:h});try{this.#S({type:"call",id:e,target:t,action:i,method:r,args:o},s)}catch(t){this.#w.delete(e),h(t instanceof Error?t:Error(String(t)))}return a}#W(e,t,i){let r=[],o=new Map,s=this.#T();return this.#V(s,e,"call",t,i.map(e=>this.#B(e,"",r,o,s)),r)}#P=e=>{let t=e.data;if(null!=t)if("batch"===t.type)for(let e of t.messages)this.#G(e);else this.#G(t)};#G(e){switch(e.type){case"release":{let t=this.#g.get(e.id);void 0!==t&&(this.#g.delete(e.id),this.#f.delete(t));break}case"resolve":this.#K(this.#_,e.id,e.value);break;case"reject":this.#Z(this.#_,e.id,e.error);break;case"return":this.#K(this.#w,e.id,e.value),this.#Y(e.id);break;case"throw":this.#Z(this.#w,e.id,e.error),this.#Y(e.id);break;case"call":this.#X(e);break;case"handler":this.#Q(e.wireType,e.payload)}}#K(e,t,i){let r=e.get(t);if(r){e.delete(t);try{r.resolve(this.#q(i))}catch(e){r.reject(e instanceof Error?e:Error(String(e)))}}}#Z(e,t,i){let r=e.get(t);r&&(e.delete(t),r.reject(rS(i)))}#Y(e){for(let t of this.#c)t.onCallSettle?.(e)}#Q(e,t){try{let i=this.#h.get(e);if(i?.onMessage){let e=new Map;i.onMessage(this.#N(t,e),this.#j(e))}}catch(t){this.#l?.error?.(`Error in handler.onMessage for wireType "${e}":`,t)}}async #X(e){let{id:t,target:i,method:r,args:o,action:s}=e,a=new Map,c=o.map(e=>this.#N(e,a)),h=this.#O(i);if(!h)return this.#S({type:"throw",id:t,error:{name:"ReferenceError",message:`Proxy target ${String(i)} not found`}});let p=this.#l,g=p?.debug?performance.now():0;try{let e;if("get"===s){if(void 0===r)throw TypeError("Property name required for get action");e=h[r]}else if("set"===s){if(void 0===r)throw TypeError("Property name required for set action");h[r]=c[0],e=void 0}else if(void 0===r){if("function"!=typeof h)throw TypeError("Target is not callable");e=await h(...c)}else{let t=h[r];if("function"!=typeof t)throw TypeError(`${r} is not a function`);e=await t.apply(h,c)}let i=[],o=this.#E(e,"",i);this.#S({type:"return",id:t,value:o},i),p?.debug?.(`${s} ${r??"(direct)"} completed`,{duration:performance.now()-g})}catch(e){p?.debug?.(`${s} ${r??"(direct)"} failed`,{duration:performance.now()-g,error:e}),this.#S({type:"throw",id:t,error:rC(e)})}}};let rP="abort-signal";let AbortSignalHandler=class AbortSignalHandler{wireType=rP;#J;#ee=0;#d=1;#et=new WeakMap;#ei=new Map;#er=new Map;#eo=new FinalizationRegistry(({id:e,session:t})=>{t!==this.#ee||this.#er.has(e)&&(this.#er.delete(e),this.#ei.delete(e),this.#J?.sendMessage({type:"release",id:e}))});#es=new Map;canHandle(e){return e instanceof AbortSignal}toWire(e,t){if(e.aborted)return{[ry]:rP,id:0,aborted:!0,reason:e.reason};let i=this.#et.get(e);if(void 0!==i)return{[ry]:rP,id:i,aborted:!1};i=this.#d++,this.#et.set(e,i),this.#ei.set(i,new WeakRef(e)),this.#eo.register(e,{id:i,session:this.#ee},e);let r=new WeakRef(e),o=i,s=()=>{let e=r.deref(),t=e?.reason;"completed"===t?this.#J?.sendMessage({type:"release",id:o}):this.#J?.sendMessage({type:"abort",id:o,reason:t}),void 0!==e&&this.#eo.unregister(e),this.#en(o)};return e.addEventListener("abort",s,{once:!0}),this.#er.set(i,s),{[ry]:rP,id:i,aborted:!1}}fromWire(e){if(e.aborted)return AbortSignal.abort(e.reason);let t=this.#es.get(e.id);if(void 0!==t)return t.signal;let i=new AbortController;return this.#es.set(e.id,i),i.signal}connect(e){this.#J=e}onMessage(e){"abort"===e.type?(this.#es.get(e.id)?.abort(e.reason),this.#es.delete(e.id)):"release"===e.type&&this.#es.delete(e.id)}disconnect(){for(let e of(this.#J=void 0,this.#es.values()))e.abort("disconnected");for(let[e,t]of(this.#es.clear(),this.#er)){let i=this.#ei.get(e)?.deref();void 0!==i&&(i.removeEventListener("abort",t),this.#eo.unregister(i))}this.#er.clear(),this.#ei.clear(),this.#ee++,this.#et=new WeakMap,this.#d=1}#en(e){this.#er.delete(e),this.#ei.delete(e)}get _sentCount(){return this.#ei.size}get _receivedCount(){return this.#es.size}};let RemoteSignal=class RemoteSignal{#ea;#el;#ec;constructor(e,t,i){this.#el=e,this.#ec=i,this.#ea=new x.State(t,{[x.subtle.watched]:()=>{this.#ec?.(this.#el,!0)},[x.subtle.unwatched]:()=>{this.#ec?.(this.#el,!1)}})}get(){return this.#ea.get()}set(e){throw Error("RemoteSignal is read-only. The signal can only be modified on the sender side.")}get signalId(){return this.#el}_update(e){this.#ea.set(e)}};let rA="signal";let SignalHandler=class SignalHandler{wireType=rA;#eh;#J;#ee=0;#ed=1;#ei=new Map;#et=new WeakMap;#ep;#$=!1;#eu=new Map;#eg=new Map;#ef=new Map;#em=new Map;#v=new FinalizationRegistry(({signalId:e,session:t})=>{t===this.#ee&&(this.#ef.delete(e),this.#J?.sendMessage({type:"signal:release",signalId:e}))});constructor(e={}){this.#eh=e.autoWatch??!1}connect(e){this.#J=e}onMessage(e){(null!==e&&"object"==typeof e&&"type"in e?"signal:batch"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:release"!==e.type:1)?(null!==e&&"object"==typeof e&&"type"in e?"signal:watch"!==e.type:1)?null!==e&&"object"==typeof e&&"type"in e&&"signal:unwatch"===e.type&&this.#eb(e.signalId):this.#ev(e.signalId):this.releaseSignal(e.signalId):this.#ey(e)}disconnect(){this.#J=void 0,this.#$=!1,void 0!==this.#ep&&(this.#ep.unwatch(...this.#eu.values()),this.#ep=void 0),this.#ei.clear(),this.#eu.clear(),this.#eg.clear(),this.#ef.clear(),this.#em.clear(),this.#ee++,this.#et=new WeakMap,this.#ed=1}canHandle(e){return e instanceof x.State||e instanceof x.Computed}toWire(e,t){return this.#ew(e,t)}fromWire(e,t){return this.#e_(e,t)}#ew(e,t){let i=this.#et.get(e);return void 0===i&&(i=this.#ed++,this.#ei.set(i,e),this.#et.set(e,i),this.#eh&&this.#ev(i)),{[ry]:rA,signalId:i,value:t.toWire(e.get())}}#e_(e,t){let i=t.fromWire(e.value),r=this.#ef.get(e.signalId),o=r?.deref();if(void 0!==o)return o._update(i),o;let s=this.#em.get(e.signalId);this.#em.delete(e.signalId);let a=new RemoteSignal(e.signalId,void 0!==s?s:i,this.#ex);return this.#ef.set(e.signalId,new WeakRef(a)),this.#v.register(a,{signalId:e.signalId,session:this.#ee}),a}#ex=(e,t)=>{void 0!==this.#J&&(t?this.#J.sendMessage({type:"signal:watch",signalId:e}):this.#J.sendMessage({type:"signal:unwatch",signalId:e}))};#ev(e){if(this.#eu.has(e))return;let t=this.#ei.get(e);if(void 0===t)return;let i=this.#ek(),r=new x.Computed(()=>t.get());this.#eu.set(e,r),this.#eg.set(r,e),i.watch(r);let o=r.get();this.#J?.sendMessage({type:"signal:batch",updates:[{signalId:e,value:o}]})}#eb(e){let t=this.#eu.get(e);void 0!==t&&(this.#ep?.unwatch(t),this.#eu.delete(e),this.#eg.delete(t))}#ek(){return this.#ep??=new x.subtle.Watcher(()=>{this.#$||(this.#$=!0,queueMicrotask(this.#A))})}#A=()=>{if(this.#$=!1,void 0===this.#ep||void 0===this.#J)return;let e=this.#ep.getPending(),t=[];for(let i of e){let e=this.#eg.get(i);if(void 0!==e&&this.#ei.has(e)){let r=i.get();t.push({signalId:e,value:r})}}this.#ep.watch(),t.length>0&&this.#J.sendMessage({type:"signal:batch",updates:t})};#ey(e){for(let t of e.updates){let e=this.#ef.get(t.signalId),i=e?.deref();void 0!==i?i._update(t.value):this.#em.set(t.signalId,t.value)}}releaseSignal(e){let t=this.#eu.get(e);void 0!==t&&(this.#ep?.unwatch(t),this.#eu.delete(e),this.#eg.delete(t)),this.#ei.delete(e)}get _sentSignalCount(){return this.#ei.size}get _remoteSignalCount(){return this.#ef.size}_isWatching(e){return this.#eu.has(e)}};let rE="__st__",rT=[{wireType:"date",canHandle:function(e){return e instanceof Date},toWire:function(e){return{[rE]:"date",value:e.getTime()}},fromWire:function(e){return new Date(e.value)}},{wireType:"map",canHandle:function(e){return e instanceof Map},toWire:function(e,t){let i=[];for(let[r,o]of e)i.push([t.toWire(r),t.toWire(o)]);return{[rE]:"map",entries:i}},fromWire:function(e,t){let i=new Map;for(let r of e.entries){let[e,o]=r;i.set(t.fromWire(e),t.fromWire(o))}return i}},{wireType:"set",canHandle:function(e){return e instanceof Set},toWire:function(e,t){let i=[];for(let r of e)i.push(t.toWire(r));return{[rE]:"set",values:i}},fromWire:function(e,t){let i=new Set;for(let r of e.values)i.add(t.fromWire(r));return i}},{wireType:"regexp",canHandle:function(e){return e instanceof RegExp},toWire:function(e){return{[rE]:"regexp",source:e.source,flags:e.flags}},fromWire:function(e){return new RegExp(e.source,e.flags)}}];function rR(e){return"string"==typeof e[0]?[e[0],e.slice(1)]:[e.map(String).join(" "),[]]}let rI={debug:(...e)=>{let[t,i]=rR(e);t2.debug(t,...i)},warn:(...e)=>{let[t,i]=rR(e);t2.warn(t,...i)},error:(...e)=>{let[t,i]=rR(e),r=i.find(e=>e instanceof Error);t2.error(r,t)}};async function rM(e){let t,i,r,o=e?.endpoint?.()??(c??=rv()).createEndpoint(),s=new Connection(o,{handlers:[...rT,new SignalHandler({autoWatch:e?.autoWatchSignals}),new AbortSignalHandler,...e?.handlers??[]],nestedProxies:e?.nestedProxies??!0,debug:e?.debug,batching:!0,logger:rI}),a=e?.timeout??1e4,h=()=>{null!=t&&(clearTimeout(t),t=void 0),null!=i&&(clearTimeout(i),i=void 0),null!=r&&(e?.signal?.removeEventListener("abort",r),r=void 0)},p=()=>{h(),s.close(),o.dispose()},g=()=>{let t=e?.signal?.reason;return t instanceof Error?t:Error("RPC connection aborted")};try{if(e?.signal?.aborted)throw g();t2.debug("RpcClient: Connecting to host..."),t=setTimeout(()=>t2.warn(`RpcClient: Connection still pending after ${a/2}ms`),a/2);let o=await Promise.race([s.waitForReady(),new Promise((e,t)=>i=setTimeout(()=>t(Error(`RPC connection timed out after ${a}ms`)),a)),...e?.signal!=null?[new Promise((t,i)=>{r=()=>i(g()),e.signal.addEventListener("abort",r,{once:!0})})]:[]]);return h(),t2.debug("RpcClient: Connected to host successfully"),{services:o,dispose:()=>{t2.debug("RpcClient: Disposing connection..."),p()}}}catch(e){throw p(),t2.error(e,"RpcClient: Failed to connect to host"),e}}let RpcController=class RpcController{constructor(e,t){this.host=e,this.options=t,e.addController(this)}get services(){return this._services}hostConnected(){this._connectionAbort?.abort(),this._connectionAbort=new AbortController,this._connect(this._connectionAbort.signal)}hostDisconnected(){this._connectionAbort?.abort(),this._connectionAbort=void 0,this._disposeRpc?.(),this._disposeRpc=void 0,this._services=void 0}async _connect(e){try{let{services:t,dispose:i}=await rM({...this.options?.rpcOptions,signal:e});if(e.aborted)return void i();if(this._services=t,this._disposeRpc=i,this.options?.onReady!=null)try{await this.options.onReady(t)}catch(e){throw i(),this._disposeRpc=void 0,this._services=void 0,e}}catch(i){if(e.aborted)return;let t=i instanceof Error?i:Error(String(i));t2.error(t,"RpcController: Failed to connect"),this.options?.onError!=null&&this.options.onError(t)}}};function rz(e,t){let i,r,o=t?.cancelPrevious??!0,s=tB(t?.initialValue),a=tB(!1),c=tB(void 0),h=tB(!1),p=new x.Computed(()=>a.get()?"loading":null!=c.get()?"error":h.get()?"success":"idle"),g=!1,f=0,m=0;function b(){null!=i&&(i.abort(),i=void 0),a.set(!1)}async function v(...t){if(g)return;o&&b(),r=t;let p=new AbortController,w=++f;m=w,i=p,a.set(!0),c.set(void 0);try{let i=await e(p.signal,...t);if(p.signal.aborted||w!==m)return;s.set(i),h.set(!0)}catch(e){if(p.signal.aborted||w!==m)return;c.set(e instanceof Error?e.message:String(e))}finally{i===p&&(i=void 0,a.set(!1))}}async function w(){if(null!=r)return v(...r)}return{value:s,loading:a,error:c,status:{get:()=>p.get()},generationId:{get:()=>m},fetch:v,refetch:w,mutate:function(e){g||(s.set(e),c.set(void 0),h.set(!0))},cancel:b,dispose:function(){g=!0,b()}}}let rO=`\0
\0`,rL=e=>{if(null!=e){let t=e instanceof Error?e.message:"unknown error";t2.warn(`RPC call rejected (noop handler): ${t}`)}},rD=new WeakMap;function rB(e,t){return{signal:e,value:t}}function rF(e,t,i,r){let o=e.map(e=>{var t;let i,r=e.signal.get(),o=(t=e.signal,i=(rD.get(t)??0)+1,rD.set(t,i),i);return e.signal.set(e.value),{signal:e.signal,optimistic:e.value,previous:r,version:o}});t.catch(e=>{for(let e of o)rD.get(e.signal)===e.version&&e.signal.get()===e.optimistic&&e.signal.set(e.previous);t2.error(e,`RPC call failed${i?` (${i})`:""}, rolled back`),r?.set(e instanceof Error?e.message:"RPC call failed")})}function rj(e,t){let i=e.generationId.get();return r=>{i===e.generationId.get()&&t(r)}}function rN(e,t){e.catch(e=>{t2.error(e,`RPC call failed${t?` (${t})`:""}`)})}function rq(e,t,i){t.catch(t=>{t2.error(t,`RPC call failed${i?` (${i})`:""}`),e.set(t instanceof Error?t.message:"RPC call failed")})}let CommitDetailsActions=class CommitDetailsActions{constructor(e,t,i){this.state=e,this.services=t,this.resources=i,this._navigating=!1}cancelPendingRequests(){this.resources.commit.cancel(),this.resources.wip.cancel(),this.resources.reachability.cancel(),this.resources.explain.cancel(),this.resources.generate.cancel()}watchWipRepo(e){e!==this._wipWatchRepoPath&&(this._wipWatchUnsubscribe?.(),this._wipWatchRepoPath=e,this._wipWatchUnsubscribe=this.services.repository.onRepositoryWorkingChanged(e,()=>{this.fetchWipState(e)}))}unwatchWip(){this._wipWatchUnsubscribe?.(),this._wipWatchUnsubscribe=void 0,this._wipWatchRepoPath=void 0}updateTelemetryContext(e){rN(this.services.telemetry.updateContext(e))}sendTelemetryEvent(e,t){rN(this.services.telemetry.sendEvent(e,t))}async navigateBack(){if(!this._navigating&&this.state.canNavigateBack.get()){this._navigating=!0;try{let e=await this.services.inspect.navigate("back");this.state.navigationStack.set(e.navigationStack),null!=e.selectedCommit&&(this.state.searchContext.set(void 0),await this.fetchCommit(e.selectedCommit.repoPath,e.selectedCommit.sha,{force:!0}))}catch(e){t2.error(e,"navigate back failed")}finally{this._navigating=!1}}}async navigateForward(){if(!this._navigating&&this.state.canNavigateForward.get()){this._navigating=!0;try{let e=await this.services.inspect.navigate("forward");this.state.navigationStack.set(e.navigationStack),null!=e.selectedCommit&&(this.state.searchContext.set(void 0),await this.fetchCommit(e.selectedCommit.repoPath,e.selectedCommit.sha,{force:!0}))}catch(e){t2.error(e,"navigate forward failed")}finally{this._navigating=!1}}}async refetchCurrentCommit(){let e=this.state.currentCommit.get();null!=e&&await this.fetchCommit(e.repoPath,e.sha,{force:!0})}togglePin(){var e,t;let i=!this.state.pinned.get();e=this.state.pinned,t=this.services.inspect.setPin(i),rF([rB(e,i)],t,"toggle pin")}pickCommit(){rN(this.services.inspect.pickCommit(),"pick commit")}searchCommit(){rN(this.services.inspect.searchCommit(),"search commit")}switchMode(e){if(e===this.state.mode.get())return;let t=this.state.currentCommit.get(),i=t?.repoPath;this.state.mode.set(e),this.services.inspect.switchMode(e,i).catch(e=>{t2.error(e,"switch mode RPC failed")}),"wip"===e?this.fetchWipState(i):this.unwatchWip()}changeReviewMode(e){if(e===this.state.inReview.get())return;let t=this.state.wipState.get()?.repo?.path;rF([rB(this.state.inReview,e),rB(this.state.draftState,{inReview:e})],this.services.inspect.changeReviewMode(e,t),"change review mode",this.state.error)}updatePullRequestExpanded(e){var t,i,r;let o=this.state.preferences.get();null==o?rq(this.state.error,this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),"update pullRequestExpanded"):(t=this.state.preferences,i={...o,pullRequestExpanded:e},r=this.services.storage.updateWorkspace("views:commitDetails:pullRequestExpanded",e),rF([rB(t,i)],r,"update pullRequestExpanded"))}updateFilesLayout(e){let t=this.state.preferences.get();if(null==t)return;let i={...t,files:{...t.files,...e}};this.state.preferences.set(i),null!=e.compact&&rN(this.services.config.update("views.commitDetails.files.compact",e.compact),"update files.compact"),null!=e.icon&&rN(this.services.config.update("views.commitDetails.files.icon",e.icon),"update files.icon"),null!=e.layout&&rN(this.services.config.update("views.commitDetails.files.layout",e.layout),"update files.layout"),null!=e.threshold&&rN(this.services.config.update("views.commitDetails.files.threshold",e.threshold),"update files.threshold")}getRepoPath(){let e=this.state.wipState.get();return e?.repo?.path?e.repo.path:this.state.currentCommit.get()?.repoPath}fetch(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,rN(t.fetch(e),"fetch")}}push(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,rN(t.push(e),"push")}}pull(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,rN(t.pull(e),"pull")}}publish(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,rN(t.publish(e),"publish")}}switchBranch(){let e=this.getRepoPath();if(e){var t;t=this.services.repository,rN(t.switchBranch(e),"switch branch")}}stageFile(e){var t,i;t=this.state.error,i=this.services.repository,rq(t,i.stageFile(e),"stage file")}unstageFile(e){var t,i;t=this.state.error,i=this.services.repository,rq(t,i.unstageFile(e),"unstage file")}getCurrentRef(){if("wip"!==this.state.mode.get())return this.state.currentCommit.get()?.sha}openFile(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),rN(i.openFile(e,t,r),"open file")}openFileOnRemote(e){var t,i;t=this.services.files,i=this.getCurrentRef(),rN(t.openFileOnRemote(e,i),"open file on remote")}openFileCompareWorking(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),rN(i.openFileCompareWorking(e,t,r),"compare file with working")}openFileComparePrevious(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),rN(i.openFileComparePrevious(e,t,r),"compare file with previous")}executeFileAction(e,t){var i,r;i=this.services.files,r=this.getCurrentRef(),rN(i.executeFileAction(e,t,r),"file action")}executeCommitAction(e,t){let i=this.state.currentCommit.get();i&&rN(this.services.inspect.executeCommitAction(i.repoPath,i.sha,e,t),`commit action: ${e}`)}executeCommand(e,...t){rN(this.services.commands.execute(e,...t),`command: ${e}`)}getPrContext(){let e=this.state.pullRequest.get(),t=this.state.wipState.get()?.repo?.path??this.state.currentCommit.get()?.repoPath;if(e?.refs&&t)return{repoPath:t,refs:e.refs,url:e.url,id:e.id,provider:e.provider?.id??"unknown"}}openPullRequestChanges(){let e=this.getPrContext();if(e){var t,i,r;t=this.services.pullRequests,i=e.repoPath,r=e.refs,rN(t.openPullRequestChanges(i,r),"open PR changes")}}openPullRequestComparison(){let e=this.getPrContext();if(e){var t,i,r;t=this.services.pullRequests,i=e.repoPath,r=e.refs,rN(t.openPullRequestComparison(i,r),"open PR comparison")}}openPullRequestOnRemote(){let e=this.getPrContext();if(e){var t,i;t=this.services.pullRequests,i=e.url,rN(t.openPullRequestOnRemote(i),"open PR on remote")}}openPullRequestDetails(){let e=this.getPrContext();if(e){var t,i,r,o;t=this.services.pullRequests,i=e.repoPath,r=e.id,o=e.provider,rN(t.openPullRequestDetails(i,r,o),"open PR details")}}createPatchFromWip(e,t){rN(this.services.drafts.createPatchFromWip(e,t),"create patch from WIP")}suggestChanges(e){let t=this.state.wipState.get();t?.repo?.path&&this.services.drafts.suggestChanges({repoPath:t.repo.path,...e}).then(()=>{this.changeReviewMode(!1)},rL)}showCodeSuggestion(e){rN(this.services.drafts.showCodeSuggestion(e),"show code suggestion")}async explainCommit(){this.state.currentCommit.get()&&await this.resources.explain.fetch()}async generateDescription(){this.getRepoPath()&&await this.resources.generate.fetch()}async loadReachability(){this.resources.reachability.loading.get()||null!=this.state.currentCommit.get()&&await this.resources.reachability.fetch()}clearReachability(){this.resources.reachability.cancel(),this.resources.reachability.mutate(void 0)}refreshReachability(){this.resources.reachability.mutate(void 0),this.loadReachability()}async fetchInitialState(){this.state.loading.set(!0),this.state.error.set(void 0);let e=this.state.mode.get(),t=this.state.pinned.get(),i=this.state.commitRef.get();try{let r=await this.services.inspect.getInitialContext(),o=null!=r.initialCommit?r.mode:"commit"!==e?e:r.mode,s=t||r.pinned;this.state.mode.set(o),this.state.pinned.set(s),this.state.navigationStack.set(r.navigationStack),this.state.inReview.set(r.inReview),this.state.draftState.set({inReview:r.inReview}),this.fetchPreferences(),this.services.config.get("views.commitDetails.autolinks.enabled").then(e=>this.state.capabilities.autolinksEnabled=e,rL),this.services.config.get("ai.experimental.composer.enabled").then(e=>this.state.capabilities.experimentalComposerEnabled=e,rL),this.services.integrations.getIntegrationStates().then(e=>this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected),rL);let a=r.initialCommit??i;"commit"===o&&null!=a?await this.fetchCommit(a.repoPath,a.sha):"wip"===o&&await this.fetchWipState(r.initialWipRepoPath)}catch(e){t2.error(e,"Failed to fetch initial state"),this.state.error.set(e instanceof Error?e.message:"Failed to initialize")}finally{this.state.loading.set(!1)}}async fetchCommit(e,t,i){let r=this.state.currentCommit.get();if(!i?.force&&r?.repoPath===e&&r?.sha===t)return void this.resources.commit.cancel();if(this.state.error.set(void 0),this.state.autolinks.set(void 0),this.state.formattedMessage.set(void 0),this.state.autolinkedIssues.set(void 0),this.state.pullRequest.set(void 0),this.state.signature.set(void 0),this.resources.reachability.cancel(),this.resources.explain.cancel(),this.resources.generate.cancel(),await this.resources.commit.fetch(e,t),"success"===this.resources.commit.status.get()){let i=this.resources.commit.value.get();if(this.state.currentCommit.set(i),this.state.commitRef.set(i?{sha:i.sha,repoPath:i.repoPath}:void 0),null!=i){let i=e=>rj(this.resources.commit,e);this.state.capabilities.autolinksEnabled&&(this.services.autolinks.getCommitAutolinks(e,t,rO).then(i(e=>{null!=e&&(this.state.autolinks.set(e.autolinks),this.state.formattedMessage.set(e.formattedMessage))}),rL),this.services.autolinks.getEnrichedAutolinks(e,t,rO).then(i(e=>{null!=e&&(this.state.autolinkedIssues.set(e.autolinkedIssues),this.state.formattedMessage.set(e.formattedMessage))}),rL)),this.services.pullRequests.getPullRequestForCommit(e,t).then(i(e=>{this.state.pullRequest.set(e)}),rL),this.services.repository.getCommitSignature(e,t).then(i(e=>{this.state.signature.set(e)}),rL)}}else null!=this.resources.commit.error.get()&&this.state.error.set(this.resources.commit.error.get())}async fetchWipState(e){if(this.state.error.set(void 0),this.state.pullRequest.set(void 0),this.state.codeSuggestions.set(void 0),await this.resources.wip.fetch(e),"success"===this.resources.wip.status.get()){let t=this.resources.wip.value.get();this.state.wipState.set(t);let i=t?.repo?.path??e;if(null!=i){this.watchWipRepo(i);let e=e=>rj(this.resources.wip,e);this.services.pullRequests.getPullRequestForBranch(i).then(e(e=>{this.state.pullRequest.set(e),null!=e&&this.services.drafts.getCodeSuggestions(i).then(rj(this.resources.wip,e=>this.state.codeSuggestions.set(e)),rL)}),rL)}}else null!=this.resources.wip.error.get()&&this.state.error.set(this.resources.wip.error.get())}async fetchPreferences(){try{let[e,t,i,r]=await Promise.allSettled([this.services.storage.getWorkspace("views:commitDetails:pullRequestExpanded"),this.services.config.getMany("views.commitDetails.avatars","defaultCurrentUserNameStyle","defaultDateFormat","defaultDateStyle","views.commitDetails.files","signing.showSignatureBadges","views.commitDetails.autolinks.enabled","ai.experimental.composer.enabled"),this.services.config.getManyCore("workbench.tree.renderIndentGuides","workbench.tree.indent"),this.services.ai.isEnabled()]),o=iJ(e),[s,a,c,h,p,g,f,m]=iJ(t)??[],[b,v]=iJ(i)??[],w=iJ(r);this.state.preferences.set({currentUserNameStyle:a??"you",pullRequestExpanded:o??!0,avatars:s??!0,dateFormat:c??"MMMM Do, YYYY h:mma",dateStyle:h??"relative",files:p??this.state.preferences.get()?.files??{layout:"auto",compact:!0,threshold:5,icon:"type"},indentGuides:b??"onHover",indent:v,aiEnabled:w??!1,showSignatureBadges:g??!1}),null!=f&&(this.state.capabilities.autolinksEnabled=f),null!=m&&(this.state.capabilities.experimentalComposerEnabled=m)}catch(e){t2.error(e,"Failed to fetch preferences")}}async checkIntegrations(){try{let e=await this.services.integrations.getIntegrationStates();this.state.capabilities.hasIntegrationsConnected=e.some(e=>e.connected)}catch(e){t2.error(e,"Failed to check integrations status")}}handleBranchAction(e){switch(e){case"pull":this.pull();break;case"push":this.push();break;case"fetch":this.fetch();break;case"publish-branch":this.publish();break;case"switch":this.switchBranch();break;case"open-pr-changes":this.openPullRequestChanges();break;case"open-pr-compare":this.openPullRequestComparison();break;case"open-pr-remote":this.openPullRequestOnRemote();break;case"open-pr-details":this.openPullRequestDetails()}}};async function rU(e){let t=await Promise.allSettled(e.map(e=>e())),i=[];for(let e of t)"fulfilled"===e.status&&"function"==typeof e.value?i.push(e.value):"rejected"===e.status&&t2.error(e.reason,"Failed to subscribe");return()=>{for(let e of i)try{e()}catch(e){t2.error(e,"Failed to unsubscribe")}}}let rW=(e=null)=>new x.State(e,{equals:()=>!1});new WeakMap;let SignalObjectImpl=class SignalObjectImpl{static fromEntries(e){return new SignalObjectImpl(Object.fromEntries(e))}#e$=new Map;#eC=rW();constructor(e={}){let t=Object.getPrototypeOf(e),i=Object.getOwnPropertyDescriptors(e),r=Object.create(t);for(let e in i)Object.defineProperty(r,e,i[e]);let o=this;return new Proxy(r,{get:(e,t,i)=>(o.#eS(t),Reflect.get(e,t,i)),has:(e,t)=>(o.#eS(t),t in e),ownKeys:e=>(o.#eC.get(),Reflect.ownKeys(e)),set(e,t,i,r){let s=Reflect.set(e,t,i,r);return o.#eP(t),o.#eA(),s},deleteProperty:(e,t)=>(t in e&&(delete e[t],o.#eP(t),o.#eA()),!0),getPrototypeOf:()=>SignalObjectImpl.prototype})}#eS(e){let t=this.#e$.get(e);void 0===t&&(t=rW(),this.#e$.set(e,t)),t.get()}#eP(e){let t=this.#e$.get(e);t&&t.set(null)}#eA(){this.#eC.set(null)}};function rH(e){let t=new x.State(e),i=new x.State(void 0),r=new x.Computed(()=>{let e=i.get();return null!=e?e.get():t.get()});return{get:function(){return r.get()},connect:function(e){i.set(e)},disconnect:function(){let e=i.get();null!=e&&t.set(e.get()),i.set(void 0)}}}let rV="__rk",rG="__ts",rK=new Set(["__v",rV,rG]),rZ=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a"}),rY=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147"});var rX=Object.defineProperty,rQ=Object.getOwnPropertyDescriptor,rJ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rQ(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rX(t,i,s),s};function r0(e,t=""){return B(Object.entries(e).map(([e,i])=>(function(e,t,i=""){return`:host([icon='${i}${e}'])::before { content: '${t}'; }`})(e,i,t)).join(""))}let r1=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(e){e.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(e)}};r1.styles=F`
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

		${r0(rZ)}
		${r0(rY,"gl-")}

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
	`,rJ([eB({reflect:!0})],r1.prototype,"icon",2),rJ([eB({reflect:!0})],r1.prototype,"modifier",2),rJ([eB({type:Number})],r1.prototype,"size",2),rJ([eB({reflect:!0})],r1.prototype,"flip",2),rJ([eB({reflect:!0})],r1.prototype,"rotate",2),r1=rJ([eL("code-icon")],r1);let r2=tw(class extends directive_i{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return eS}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=eP,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===eP||null==e)return this._t=void 0,this.it=e;if(e===eS)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let r5=tw(unsafe_html_e),r3=F`
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
`,r6=F`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;F`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${r6}
	}
`;let r4=F`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,r7=F`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`;F`
	:focus-visible {
		${r4}
	}
`;let r8=F`
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
`;F`
	* {
		box-sizing: border-box;
	}
`,F`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${r4}
	}
	a:hover {
		text-decoration: underline;
	}
`;let r9=F`
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
`;F`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;var oe=Object.defineProperty,ot=Object.defineProperties,oi=Object.getOwnPropertyDescriptor,or=Object.getOwnPropertyDescriptors,oo=Object.getOwnPropertySymbols,os=Object.prototype.hasOwnProperty,on=Object.prototype.propertyIsEnumerable,oa=e=>{throw TypeError(e)},ol=(e,t,i)=>t in e?oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,oc=(e,t)=>{for(var i in t||(t={}))os.call(t,i)&&ol(e,i,t[i]);if(oo)for(var i of oo(t))on.call(t,i)&&ol(e,i,t[i]);return e},oh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?oi(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&oe(t,i,s),s},od=(e,t,i)=>t.has(e)||oa("Cannot "+i),op=new Map,ou=new WeakMap;function og(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function of(e,t){op.set(e,null!=t?t:{keyframes:[],options:{duration:0}})}function om(e,t,i){let r=ou.get(e);if(null==r?void 0:r[t])return og(r[t],i.dir);let o=op.get(t);return o?og(o,i.dir):{keyframes:[],options:{duration:0}}}function ob(e){return e?.includes(`
`)?r5(e.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):e}var ov=F`
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
`,oy=F`
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
`;let ow=new Set,o_=new Map,ox="ltr",ok="en",o$="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(o$){let e=new MutationObserver(oS);ox=document.documentElement.dir||"ltr",ok=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function oC(...e){e.map(e=>{let t=e.$code.toLowerCase();o_.has(t)?o_.set(t,Object.assign(Object.assign({},o_.get(t)),e)):o_.set(t,e),h||(h=e)}),oS()}function oS(){o$&&(ox=document.documentElement.dir||"ltr",ok=document.documentElement.lang||navigator.language),[...ow.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){ow.add(this.host)}hostDisconnected(){ow.delete(this.host)}dir(){return`${this.host.dir||ox}`.toLowerCase()}lang(){return`${this.host.lang||ok}`.toLowerCase()}getTranslationData(e){var t,i;let r=new Intl.Locale(e.replace(/_/g,"-")),o=null==r?void 0:r.language.toLowerCase(),s=null!=(i=null==(t=null==r?void 0:r.region)?void 0:t.toLowerCase())?i:"",a=o_.get(`${o}-${s}`),c=o_.get(o);return{locale:r,language:o,region:s,primary:a,secondary:c}}exists(e,t){var i;let{primary:r,secondary:o}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!r&&!!r[e]||!!o&&!!o[e]||!!t.includeFallback&&!!h&&!!h[e]}term(e,...t){let i,{primary:r,secondary:o}=this.getTranslationData(this.lang());if(r&&r[e])i=r[e];else if(o&&o[e])i=o[e];else{if(!h||!h[e])return String(e);i=h[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}};var oP={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};oC(oP);var oA=class extends LocalizeController{};oC(oP);var oE=F`
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
`,oT=class extends lit_element_i{constructor(){let e;super(),(e=S).has(this)?oa("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){let i=new CustomEvent(e,oc({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}static define(e,t=this,i={}){let r=customElements.get(e);if(!r){try{customElements.define(e,t,i)}catch(r){customElements.define(e,class extends t{},i)}return}let o=" (unknown version)";"version"in t&&t.version&&(o=" v"+t.version),"version"in r&&r.version&&r.version}attributeChangedCallback(e,t,i){let r,o;if(od(this,r=S,"read from private field"),o?!o.call(this):!r.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),od(this,e=S,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}};S=new WeakMap,oT.version="2.20.1",oT.dependencies={},oh([eB()],oT.prototype,"dir",2),oh([eB()],oT.prototype,"lang",2);let oR=Math.min,oI=Math.max,oM=Math.round,oz=Math.floor,oO=e=>({x:e,y:e}),oL={left:"right",right:"left",bottom:"top",top:"bottom"};function oD(e,t){return"function"==typeof e?e(t):e}function oB(e){return e.split("-")[0]}function oF(e){return e.split("-")[1]}function oj(e){return"x"===e?"y":"x"}function oN(e){return"y"===e?"height":"width"}function oq(e){let t=e[0];return"t"===t||"b"===t?"y":"x"}function oU(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}let oW=["left","right"],oH=["right","left"],oV=["top","bottom"],oG=["bottom","top"];function oK(e){let t=oB(e);return oL[t]+e.slice(t.length)}function oZ(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function oY(e){let{x:t,y:i,width:r,height:o}=e;return{width:r,height:o,top:i,left:t,right:t+r,bottom:i+o,x:t,y:i}}function oX(e,t,i){let r,{reference:o,floating:s}=e,a=oq(t),c=oj(oq(t)),h=oN(c),p=oB(t),g="y"===a,f=o.x+o.width/2-s.width/2,m=o.y+o.height/2-s.height/2,b=o[h]/2-s[h]/2;switch(p){case"top":r={x:f,y:o.y-s.height};break;case"bottom":r={x:f,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:m};break;case"left":r={x:o.x-s.width,y:m};break;default:r={x:o.x,y:o.y}}switch(oF(t)){case"start":r[c]-=b*(i&&g?-1:1);break;case"end":r[c]+=b*(i&&g?-1:1)}return r}async function oQ(e,t){var i;void 0===t&&(t={});let{x:r,y:o,platform:s,rects:a,elements:c,strategy:h}=e,{boundary:p="clippingAncestors",rootBoundary:g="viewport",elementContext:f="floating",altBoundary:m=!1,padding:b=0}=oD(t,e),v=oZ(b),w=c[m?"floating"===f?"reference":"floating":f],_=oY(await s.getClippingRect({element:null==(i=await (null==s.isElement?void 0:s.isElement(w)))||i?w:w.contextElement||await (null==s.getDocumentElement?void 0:s.getDocumentElement(c.floating)),boundary:p,rootBoundary:g,strategy:h})),x="floating"===f?{x:r,y:o,width:a.floating.width,height:a.floating.height}:a.reference,$=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c.floating)),C=await (null==s.isElement?void 0:s.isElement($))&&await (null==s.getScale?void 0:s.getScale($))||{x:1,y:1},S=oY(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:$,strategy:h}):x);return{top:(_.top-S.top+v.top)/C.y,bottom:(S.bottom-_.bottom+v.bottom)/C.y,left:(_.left-S.left+v.left)/C.x,right:(S.right-_.right+v.right)/C.x}}let oJ=async(e,t,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:a}=i,c=a.detectOverflow?a:{...a,detectOverflow:oQ},h=await (null==a.isRTL?void 0:a.isRTL(t)),p=await a.getElementRects({reference:e,floating:t,strategy:o}),{x:g,y:f}=oX(p,r,h),m=r,b=0,v={};for(let i=0;i<s.length;i++){let w=s[i];if(!w)continue;let{name:_,fn:x}=w,{x:$,y:C,data:S,reset:P}=await x({x:g,y:f,initialPlacement:r,placement:m,strategy:o,middlewareData:v,rects:p,platform:c,elements:{reference:e,floating:t}});g=null!=$?$:g,f=null!=C?C:f,v[_]={...v[_],...S},P&&b<50&&(b++,"object"==typeof P&&(P.placement&&(m=P.placement),P.rects&&(p=!0===P.rects?await a.getElementRects({reference:e,floating:t,strategy:o}):P.rects),{x:g,y:f}=oX(p,m,h)),i=-1)}return{x:g,y:f,placement:m,strategy:o,middlewareData:v}},o0=new Set(["left","top"]);async function o1(e,t){let{placement:i,platform:r,elements:o}=e,s=await (null==r.isRTL?void 0:r.isRTL(o.floating)),a=oB(i),c=oF(i),h="y"===oq(i),p=o0.has(a)?-1:1,g=s&&h?-1:1,f=oD(t,e),{mainAxis:m,crossAxis:b,alignmentAxis:v}="number"==typeof f?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return c&&"number"==typeof v&&(b="end"===c?-1*v:v),h?{x:b*g,y:m*p}:{x:m*p,y:b*g}}function o2(){return"u">typeof window}function o5(e){return o4(e)?(e.nodeName||"").toLowerCase():"#document"}function o3(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function o6(e){var t;return null==(t=(o4(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function o4(e){return!!o2()&&(e instanceof Node||e instanceof o3(e).Node)}function o7(e){return!!o2()&&(e instanceof Element||e instanceof o3(e).Element)}function o8(e){return!!o2()&&(e instanceof HTMLElement||e instanceof o3(e).HTMLElement)}function o9(e){return!(!o2()||"u"<typeof ShadowRoot)&&(e instanceof ShadowRoot||e instanceof o3(e).ShadowRoot)}function se(e){let{overflow:t,overflowX:i,overflowY:r,display:o}=sl(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+i)&&"inline"!==o&&"contents"!==o}function st(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}let si=/transform|translate|scale|rotate|perspective|filter/,sr=/paint|layout|strict|content/,so=e=>!!e&&"none"!==e;function ss(e){let t=o7(e)?sl(e):e;return so(t.transform)||so(t.translate)||so(t.scale)||so(t.rotate)||so(t.perspective)||!sn()&&(so(t.backdropFilter)||so(t.filter))||si.test(t.willChange||"")||sr.test(t.contain||"")}function sn(){return null==p&&(p="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),p}function sa(e){return/^(html|body|#document)$/.test(o5(e))}function sl(e){return o3(e).getComputedStyle(e)}function sc(e){return o7(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function sh(e){if("html"===o5(e))return e;let t=e.assignedSlot||e.parentNode||o9(e)&&e.host||o6(e);return o9(t)?t.host:t}function sd(e,t,i){var r;void 0===t&&(t=[]),void 0===i&&(i=!0);let o=function e(t){let i=sh(t);return sa(i)?t.ownerDocument?t.ownerDocument.body:t.body:o8(i)&&se(i)?i:e(i)}(e),s=o===(null==(r=e.ownerDocument)?void 0:r.body),a=o3(o);if(!s)return t.concat(o,sd(o,[],i));{let e=sp(a);return t.concat(a,a.visualViewport||[],se(o)?o:[],e&&i?sd(e):[])}}function sp(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function su(e){let t=sl(e),i=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=o8(e),s=o?e.offsetWidth:i,a=o?e.offsetHeight:r,c=oM(i)!==s||oM(r)!==a;return c&&(i=s,r=a),{width:i,height:r,$:c}}function sg(e){return o7(e)?e:e.contextElement}function sf(e){let t=sg(e);if(!o8(t))return oO(1);let i=t.getBoundingClientRect(),{width:r,height:o,$:s}=su(t),a=(s?oM(i.width):i.width)/r,c=(s?oM(i.height):i.height)/o;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let sm=oO(0);function sb(e){let t=o3(e);return sn()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:sm}function sv(e,t,i,r){var o;void 0===t&&(t=!1),void 0===i&&(i=!1);let s=e.getBoundingClientRect(),a=sg(e),c=oO(1);t&&(r?o7(r)&&(c=sf(r)):c=sf(e));let h=(void 0===(o=i)&&(o=!1),r&&(!o||r===o3(a))&&o)?sb(a):oO(0),p=(s.left+h.x)/c.x,g=(s.top+h.y)/c.y,f=s.width/c.x,m=s.height/c.y;if(a){let e=o3(a),t=r&&o7(r)?o3(r):r,i=e,o=sp(i);for(;o&&r&&t!==i;){let e=sf(o),t=o.getBoundingClientRect(),r=sl(o),s=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,a=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;p*=e.x,g*=e.y,f*=e.x,m*=e.y,p+=s,g+=a,o=sp(i=o3(o))}}return oY({width:f,height:m,x:p,y:g})}function sy(e,t){let i=sc(e).scrollLeft;return t?t.left+i:sv(o6(e)).left+i}function sw(e,t){let i=e.getBoundingClientRect();return{x:i.left+t.scrollLeft-sy(e,i),y:i.top+t.scrollTop}}function s_(e,t,i){var r;let o;if("viewport"===t)o=function(e,t){let i=o3(e),r=o6(e),o=i.visualViewport,s=r.clientWidth,a=r.clientHeight,c=0,h=0;if(o){s=o.width,a=o.height;let e=sn();(!e||e&&"fixed"===t)&&(c=o.offsetLeft,h=o.offsetTop)}let p=sy(r);if(p<=0){let e=r.ownerDocument,t=e.body,i=getComputedStyle(t),o="CSS1Compat"===e.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(r.clientWidth-t.clientWidth-o);a<=25&&(s-=a)}else p<=25&&(s+=p);return{width:s,height:a,x:c,y:h}}(e,i);else if("document"===t){let t,i,s,a,c,h,p;r=o6(e),t=o6(r),i=sc(r),s=r.ownerDocument.body,a=oI(t.scrollWidth,t.clientWidth,s.scrollWidth,s.clientWidth),c=oI(t.scrollHeight,t.clientHeight,s.scrollHeight,s.clientHeight),h=-i.scrollLeft+sy(r),p=-i.scrollTop,"rtl"===sl(s).direction&&(h+=oI(t.clientWidth,s.clientWidth)-a),o={width:a,height:c,x:h,y:p}}else if(o7(t)){let e,r,s,a,c,h;r=(e=sv(t,!0,"fixed"===i)).top+t.clientTop,s=e.left+t.clientLeft,a=o8(t)?sf(t):oO(1),c=t.clientWidth*a.x,h=t.clientHeight*a.y,o={width:c,height:h,x:s*a.x,y:r*a.y}}else{let i=sb(e);o={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return oY(o)}function sx(e){return"static"===sl(e).position}function sk(e,t){if(!o8(e)||"fixed"===sl(e).position)return null;if(t)return t(e);let i=e.offsetParent;return o6(e)===i&&(i=i.ownerDocument.body),i}function s$(e,t){var i;let r=o3(e);if(st(e))return r;if(!o8(e)){let t=sh(e);for(;t&&!sa(t);){if(o7(t)&&!sx(t))return t;t=sh(t)}return r}let o=sk(e,t);for(;o&&(i=o,/^(table|td|th)$/.test(o5(i)))&&sx(o);)o=sk(o,t);return o&&sa(o)&&sx(o)&&!ss(o)?r:o||function(e){let t=sh(e);for(;o8(t)&&!sa(t);){if(ss(t))return t;if(st(t))break;t=sh(t)}return null}(e)||r}let sC=async function(e){let t=this.getOffsetParent||s$,i=this.getDimensions,r=await i(e.floating);return{reference:function(e,t,i){let r=o8(t),o=o6(t),s="fixed"===i,a=sv(e,!0,s,t),c={scrollLeft:0,scrollTop:0},h=oO(0);if(r||!r&&!s)if(("body"!==o5(t)||se(o))&&(c=sc(t)),r){let e=sv(t,!0,s,t);h.x=e.x+t.clientLeft,h.y=e.y+t.clientTop}else o&&(h.x=sy(o));s&&!r&&o&&(h.x=sy(o));let p=!o||r||s?oO(0):sw(o,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},sS={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:r,strategy:o}=e,s="fixed"===o,a=o6(r),c=!!t&&st(t.floating);if(r===a||c&&s)return i;let h={scrollLeft:0,scrollTop:0},p=oO(1),g=oO(0),f=o8(r);if((f||!f&&!s)&&(("body"!==o5(r)||se(a))&&(h=sc(r)),f)){let e=sv(r);p=sf(r),g.x=e.x+r.clientLeft,g.y=e.y+r.clientTop}let m=!a||f||s?oO(0):sw(a,h);return{width:i.width*p.x,height:i.height*p.y,x:i.x*p.x-h.scrollLeft*p.x+g.x+m.x,y:i.y*p.y-h.scrollTop*p.y+g.y+m.y}},getDocumentElement:o6,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:r,strategy:o}=e,s=[..."clippingAncestors"===i?st(t)?[]:function(e,t){let i=t.get(e);if(i)return i;let r=sd(e,[],!1).filter(e=>o7(e)&&"body"!==o5(e)),o=null,s="fixed"===sl(e).position,a=s?sh(e):e;for(;o7(a)&&!sa(a);){let t=sl(a),i=ss(a);i||"fixed"!==t.position||(o=null),(s?i||o:!(!i&&"static"===t.position&&o&&("absolute"===o.position||"fixed"===o.position)||se(a)&&!i&&function e(t,i){let r=sh(t);return!(r===i||!o7(r)||sa(r))&&("fixed"===sl(r).position||e(r,i))}(e,a)))?o=t:r=r.filter(e=>e!==a),a=sh(a)}return t.set(e,r),r}(t,this._c):[].concat(i),r],a=s_(t,s[0],o),c=a.top,h=a.right,p=a.bottom,g=a.left;for(let e=1;e<s.length;e++){let i=s_(t,s[e],o);c=oI(i.top,c),h=oR(i.right,h),p=oR(i.bottom,p),g=oI(i.left,g)}return{width:h-g,height:p-c,x:g,y:c}},getOffsetParent:s$,getElementRects:sC,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=su(e);return{width:t,height:i}},getScale:sf,isElement:o7,isRTL:function(e){return"rtl"===sl(e).direction}};function sP(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}let sA=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){var i,r;let o,s,{placement:a,rects:c,platform:h,elements:p}=t,{apply:g=()=>{},...f}=oD(e,t),m=await h.detectOverflow(t,f),b=oB(a),v=oF(a),w="y"===oq(a),{width:_,height:x}=c.floating;"top"===b||"bottom"===b?(o=b,s=v===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(s=b,o="end"===v?"top":"bottom");let $=x-m.top-m.bottom,C=_-m.left-m.right,S=oR(x-m[o],$),P=oR(_-m[s],C),A=!t.middlewareData.shift,E=S,T=P;if(null!=(i=t.middlewareData.shift)&&i.enabled.x&&(T=C),null!=(r=t.middlewareData.shift)&&r.enabled.y&&(E=$),A&&!v){let e=oI(m.left,0),t=oI(m.right,0),i=oI(m.top,0),r=oI(m.bottom,0);w?T=_-2*(0!==e||0!==t?e+t:oI(m.left,m.right)):E=x-2*(0!==i||0!==r?i+r:oI(m.top,m.bottom))}await g({...t,availableWidth:T,availableHeight:E});let M=await h.getDimensions(p.floating);return _!==M.width||x!==M.height?{reset:{rects:!0}}:{}}}};function sE(e){var t=e;for(let e=t;e;e=sT(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=sT(t);e;e=sT(e)){if(!(e instanceof Element))continue;let t=getComputedStyle(e);if("contents"!==t.display&&("static"!==t.position||ss(t)||"BODY"===e.tagName))return e}return null}function sT(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}var sR=class extends oT{constructor(){super(...arguments),this.localize=new oA(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,s=0,a=0,c=0,h=0,p=0,g=0;i?e.top<t.top?(r=e.left,o=e.bottom,s=e.right,a=e.bottom,c=t.left,h=t.top,p=t.right,g=t.top):(r=t.left,o=t.bottom,s=t.right,a=t.bottom,c=e.left,h=e.top,p=e.right,g=e.top):e.left<t.left?(r=e.right,o=e.top,s=t.left,a=t.top,c=e.right,h=e.bottom,p=t.left,g=t.bottom):(r=t.right,o=t.top,s=e.left,a=e.top,c=t.right,h=t.bottom,p=e.left,g=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else{var e;this.anchor instanceof Element||null!==(e=this.anchor)&&"object"==typeof e&&"getBoundingClientRect"in e&&(!("contextElement"in e)||e.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(e,t,i,r){let o;void 0===r&&(r={});let{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=r,g=sg(e),f=s||a?[...g?sd(g):[],...t?sd(t):[]]:[];f.forEach(e=>{s&&e.addEventListener("scroll",i,{passive:!0}),a&&e.addEventListener("resize",i)});let m=g&&h?function(e,t){let i,r=null,o=o6(e);function s(){var e;clearTimeout(i),null==(e=r)||e.disconnect(),r=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),s();let p=e.getBoundingClientRect(),{left:g,top:f,width:m,height:b}=p;if(c||t(),!m||!b)return;let v={rootMargin:-oz(f)+"px "+-oz(o.clientWidth-(g+m))+"px "+-oz(o.clientHeight-(f+b))+"px "+-oz(g)+"px",threshold:oI(0,oR(1,h))||1},w=!0;function _(t){let r=t[0].intersectionRatio;if(r!==h){if(!w)return a();r?a(!1,r):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==r||sP(p,e.getBoundingClientRect())||a(),w=!1}try{r=new IntersectionObserver(_,{...v,root:o.ownerDocument})}catch{r=new IntersectionObserver(_,v)}r.observe(e)}(!0),s}(g,i):null,b=-1,v=null;c&&(v=new ResizeObserver(e=>{let[r]=e;r&&r.target===g&&v&&t&&(v.unobserve(t),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var e;null==(e=v)||e.observe(t)})),i()}),g&&!p&&v.observe(g),t&&v.observe(t));let w=p?sv(e):null;return p&&function t(){let r=sv(e);w&&!sP(w,r)&&i(),w=r,o=requestAnimationFrame(t)}(),i(),()=>{var e;f.forEach(e=>{s&&e.removeEventListener("scroll",i),a&&e.removeEventListener("resize",i)}),null==m||m(),null==(e=v)||e.disconnect(),v=null,p&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i,r,o,s;let a,c,h,p;if(!this.active||!this.anchorEl)return;let g=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,r;let{x:o,y:s,placement:a,middlewareData:c}=t,h=await o1(t,e);return a===(null==(i=c.offset)?void 0:i.placement)&&null!=(r=c.arrow)&&r.alignmentOffset?{}:{x:o+h.x,y:s+h.y,data:{...h,placement:a}}}}];this.sync?g.push(sA({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&g.push({name:"flip",options:t={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,r,o,s,a,c,h,p;let g,f,m,{placement:b,middlewareData:v,rects:w,initialPlacement:_,platform:x,elements:$}=e,{mainAxis:C=!0,crossAxis:S=!0,fallbackPlacements:P,fallbackStrategy:A="bestFit",fallbackAxisSideDirection:E="none",flipAlignment:T=!0,...M}=oD(t,e);if(null!=(i=v.arrow)&&i.alignmentOffset)return{};let O=oB(b),D=oq(_),B=oB(_)===_,F=await (null==x.isRTL?void 0:x.isRTL($.floating)),j=P||(B||!T?[oK(_)]:(g=oK(_),[oU(_),g,oU(g)])),N="none"!==E;!P&&N&&j.push(...(f=oF(_),m=function(e,t,i){switch(e){case"top":case"bottom":if(i)return t?oH:oW;return t?oW:oH;case"left":case"right":return t?oV:oG;default:return[]}}(oB(_),"start"===E,F),f&&(m=m.map(e=>e+"-"+f),T&&(m=m.concat(m.map(oU)))),m));let q=[_,...j],U=await x.detectOverflow(e,M),W=[],V=(null==(r=v.flip)?void 0:r.overflows)||[];if(C&&W.push(U[O]),S){let e,t,i,r,o=(c=b,h=w,void 0===(p=F)&&(p=!1),e=oF(c),i=oN(t=oj(oq(c))),r="x"===t?e===(p?"end":"start")?"right":"left":"start"===e?"bottom":"top",h.reference[i]>h.floating[i]&&(r=oK(r)),[r,oK(r)]);W.push(U[o[0]],U[o[1]])}if(V=[...V,{placement:b,overflows:W}],!W.every(e=>e<=0)){let e=((null==(o=v.flip)?void 0:o.index)||0)+1,t=q[e];if(t&&("alignment"!==S||D===oq(t)||V.every(e=>oq(e.placement)!==D||e.overflows[0]>0)))return{data:{index:e,overflows:V},reset:{placement:t}};let i=null==(s=V.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:s.placement;if(!i)switch(A){case"bestFit":{let e=null==(a=V.filter(e=>{if(N){let t=oq(e.placement);return t===D||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:a[0];e&&(i=e);break}case"initialPlacement":i=_}if(b!==i)return{reset:{placement:i}}}return{}}}),this.shift&&g.push({name:"shift",options:i={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(e){let{x:t,y:r,placement:o,platform:s}=e,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...p}=oD(i,e),g={x:t,y:r},f=await s.detectOverflow(e,p),m=oq(oB(o)),b=oj(m),v=g[b],w=g[m];if(a){let e="y"===b?"top":"left",t="y"===b?"bottom":"right",i=v+f[e],r=v-f[t];v=oI(i,oR(v,r))}if(c){let e="y"===m?"top":"left",t="y"===m?"bottom":"right",i=w+f[e],r=w-f[t];w=oI(i,oR(w,r))}let _=h.fn({...e,[b]:v,[m]:w});return{..._,data:{x:_.x-t,y:_.y-r,enabled:{[b]:a,[m]:c}}}}}),this.autoSize?g.push(sA({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(e){let{x:t,y:i,placement:r,rects:o,platform:s,elements:c,middlewareData:h}=e,{element:p,padding:g=0}=oD(a,e)||{};if(null==p)return{};let f=oZ(g),m={x:t,y:i},b=oj(oq(r)),v=oN(b),w=await s.getDimensions(p),_="y"===b,x=_?"clientHeight":"clientWidth",$=o.reference[v]+o.reference[b]-m[b]-o.floating[v],C=m[b]-o.reference[b],S=await (null==s.getOffsetParent?void 0:s.getOffsetParent(p)),P=S?S[x]:0;P&&await (null==s.isElement?void 0:s.isElement(S))||(P=c.floating[x]||o.floating[v]);let A=P/2-w[v]/2-1,E=oR(f[_?"top":"left"],A),T=oR(f[_?"bottom":"right"],A),M=P-w[v]-T,O=P/2-w[v]/2+($/2-C/2),D=oI(E,oR(O,M)),B=!h.arrow&&null!=oF(r)&&O!==D&&o.reference[v]/2-(O<E?E:T)-w[v]/2<0,F=B?O<E?O-E:O-M:0;return{[b]:m[b]+F,data:{[b]:D,centerOffset:O-D-F,...B&&{alignmentOffset:F}},reset:B}}});let f="absolute"===this.strategy?e=>sS.getOffsetParent(e,sE):sS.getOffsetParent;(r=this.anchorEl,o=this.popup,s={placement:this.placement,middleware:g,strategy:this.strategy,platform:ot(oc({},sS),or({getOffsetParent:f}))},c=new Map,p={...(h={platform:sS,...s}).platform,_c:c},oJ(r,o,{...h,platform:p})).then(({x:e,y:t,middlewareData:i,placement:r})=>{let o="rtl"===this.localize.dir(),s={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,r="",a="",c="",h="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=o?i:"",h=o?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=o?"":i,h=o?i:"",c="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:a,bottom:c,left:h,[s]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return e$`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${r2({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${r2({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?e$`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};function sI(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function sM(e,t,i){return new Promise(r=>{if((null==i?void 0:i.duration)===1/0)throw Error("Promise-based animations must be finite.");let o=e.animate(t,ot(oc({},i),or({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:i.duration})));o.addEventListener("cancel",r,{once:!0}),o.addEventListener("finish",r,{once:!0})})}function sz(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?1e3*parseFloat(e):parseFloat(e)}function sO(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}function sL(e,t){let i=oc({waitUntilFirstUpdate:!1},t);return(t,r)=>{let{update:o}=t,s=Array.isArray(e)?e:[e];t.update=function(e){s.forEach(t=>{if(e.has(t)){let o=e.get(t),s=this[t];o!==s&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](o,s)}}),o.call(this,e)}}}sR.styles=[oE,oy],oh([eN(".popup")],sR.prototype,"popup",2),oh([eN(".popup__arrow")],sR.prototype,"arrowEl",2),oh([eB()],sR.prototype,"anchor",2),oh([eB({type:Boolean,reflect:!0})],sR.prototype,"active",2),oh([eB({reflect:!0})],sR.prototype,"placement",2),oh([eB({reflect:!0})],sR.prototype,"strategy",2),oh([eB({type:Number})],sR.prototype,"distance",2),oh([eB({type:Number})],sR.prototype,"skidding",2),oh([eB({type:Boolean})],sR.prototype,"arrow",2),oh([eB({attribute:"arrow-placement"})],sR.prototype,"arrowPlacement",2),oh([eB({attribute:"arrow-padding",type:Number})],sR.prototype,"arrowPadding",2),oh([eB({type:Boolean})],sR.prototype,"flip",2),oh([eB({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],sR.prototype,"flipFallbackPlacements",2),oh([eB({attribute:"flip-fallback-strategy"})],sR.prototype,"flipFallbackStrategy",2),oh([eB({type:Object})],sR.prototype,"flipBoundary",2),oh([eB({attribute:"flip-padding",type:Number})],sR.prototype,"flipPadding",2),oh([eB({type:Boolean})],sR.prototype,"shift",2),oh([eB({type:Object})],sR.prototype,"shiftBoundary",2),oh([eB({attribute:"shift-padding",type:Number})],sR.prototype,"shiftPadding",2),oh([eB({attribute:"auto-size"})],sR.prototype,"autoSize",2),oh([eB()],sR.prototype,"sync",2),oh([eB({type:Object})],sR.prototype,"autoSizeBoundary",2),oh([eB({attribute:"auto-size-padding",type:Number})],sR.prototype,"autoSizePadding",2),oh([eB({attribute:"hover-bridge",type:Boolean})],sR.prototype,"hoverBridge",2);var sD=class extends oT{constructor(){super(),this.localize=new oA(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let e=sz(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=sz(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await sO(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:t,options:i}=om(this,"tooltip.show",{dir:this.localize.dir()});await sM(this.popup.popup,t,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await sO(this.body);let{keyframes:e,options:i}=om(this,"tooltip.hide",{dir:this.localize.dir()});await sM(this.popup.popup,e,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,sI(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,sI(this,"sl-after-hide")}render(){return e$`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${r2({tooltip:!0,"tooltip--open":this.open})}
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
    `}};sD.styles=[oE,ov],sD.dependencies={"sl-popup":sR},oh([eN("slot:not([name])")],sD.prototype,"defaultSlot",2),oh([eN(".tooltip__body")],sD.prototype,"body",2),oh([eN("sl-popup")],sD.prototype,"popup",2),oh([eB()],sD.prototype,"content",2),oh([eB()],sD.prototype,"placement",2),oh([eB({type:Boolean,reflect:!0})],sD.prototype,"disabled",2),oh([eB({type:Number})],sD.prototype,"distance",2),oh([eB({type:Boolean,reflect:!0})],sD.prototype,"open",2),oh([eB({type:Number})],sD.prototype,"skidding",2),oh([eB()],sD.prototype,"trigger",2),oh([eB({type:Boolean})],sD.prototype,"hoist",2),oh([sL("open",{waitUntilFirstUpdate:!0})],sD.prototype,"handleOpenChange",1),oh([sL(["content","distance","hoist","placement","skidding"])],sD.prototype,"handleOptionsChange",1),oh([sL("disabled")],sD.prototype,"handleDisabledChange",1),of("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),of("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),sD.define("sl-tooltip");var sB=Object.defineProperty,sF=Object.getOwnPropertyDescriptor,sj=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sF(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sB(t,i,s),s};of("tooltip.show",null),of("tooltip.hide",null);let sN=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.suppressed=!1,this.onMouseDown=e=>{this.suppressed=!0,this.hide()},this.onMouseUp=e=>{this.suppressed=!1},this.onDragStart=e=>{this.suppressed=!0,this.hide()},this.onDragEnd=e=>{this.suppressed=!1}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("dragstart",this.onDragStart,{capture:!0}),window.addEventListener("dragend",this.onDragEnd,{capture:!0})}firstUpdated(){this.observer=new MutationObserver(e=>{for(let t of e)if("attributes"===t.type&&"data-current-placement"===t.attributeName){let e=t.target.getAttribute("data-current-placement");e?this.setAttribute("data-current-placement",e):this.removeAttribute("data-current-placement")}});let e=this.shadowRoot?.querySelector("sl-tooltip")?.shadowRoot;e&&this.observer.observe(e,{attributes:!0,attributeFilter:["data-current-placement"],subtree:!0})}disconnectedCallback(){this.observer?.disconnect(),this.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("dragstart",this.onDragStart,{capture:!0}),window.removeEventListener("dragend",this.onDragEnd,{capture:!0}),super.disconnectedCallback?.()}async hide(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.hide()}async show(){let e=this.shadowRoot?.querySelector("sl-tooltip");return e?.show()}render(){return e$`<sl-tooltip
			.placement=${this.placement}
			?disabled=${this.disabled||this.suppressed}
			.distance=${this.distance??eP}
			hoist
		>
			<slot></slot>
			<div slot="content">
				<slot name="content">${ob(this.content)}</slot>
			</div>
		</sl-tooltip>`}};sN.styles=F`
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
	`,sj([eB()],sN.prototype,"content",2),sj([eB({reflect:!0})],sN.prototype,"placement",2),sj([eB({type:Boolean})],sN.prototype,"disabled",2),sj([eB({type:Number})],sN.prototype,"distance",2),sj([eB({type:Boolean,attribute:"hide-on-click"})],sN.prototype,"hideOnClick",2),sj([eB({type:Boolean})],sN.prototype,"hoist",2),sj([eF()],sN.prototype,"suppressed",2),sN=sj([eL("gl-tooltip")],sN);var sq=Object.defineProperty,sU=Object.getOwnPropertyDescriptor,sW=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sU(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sq(t,i,s),s};let sH=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(e){if(e.has("href")&&this.setAttribute("role",this.href?"link":"button"),e.has("disabled")){let t=e.get("disabled");t?this.setAttribute("aria-disabled",t.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(e)}render(){return this.tooltip?e$`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??eP}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?e$`<gl-tooltip placement=${this.tooltipPlacement??eP}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?e$`<a
				class="control"
				tabindex="${(!1===this.disabled?void 0:-1)??eP}"
				href=${this.href}
				@keypress=${e=>this.onLinkKeypress(e)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:e$`<button
			class="control"
			role=${this.role??eP}
			aria-checked=${this.ariaChecked??eP}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(e){" "===e.key&&this.control.click()}focus(e){this.control.focus(e)}blur(){this.control.blur()}click(){this.control.click()}};sH.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sH.styles=[r8,F`
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
				${r7}
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
		`],sW([eN(".control")],sH.prototype,"control",2),sW([eB({reflect:!0})],sH.prototype,"appearance",2),sW([eB({reflect:!0})],sH.prototype,"variant",2),sW([eB({type:Boolean,reflect:!0})],sH.prototype,"disabled",2),sW([eB({reflect:!0})],sH.prototype,"density",2),sW([eB({type:Boolean,reflect:!0})],sH.prototype,"full",2),sW([eB()],sH.prototype,"href",2),sW([eB()],sH.prototype,"tooltip",2),sW([eB()],sH.prototype,"tooltipPlacement",2),sW([eB({type:Boolean,reflect:!0})],sH.prototype,"truncate",2),sH=sW([eL("gl-button")],sH);var sV=Object.defineProperty,sG=Object.getOwnPropertyDescriptor,sK=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sG(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sV(t,i,s),s};let sZ=class extends lit_element_i{constructor(){super(...arguments),this.display="solid",this.dismissible=!1,this.layout="default"}get classNames(){return{banner:!0,[`banner--${this.display}`]:!0,[`banner--${this.layout}`]:"default"!==this.layout}}render(){return e$`<div part="base" class=${r2(this.classNames)}>
			<div class="banner__content">
				${"responsive"===this.layout?this.renderResponsiveContent():this.renderDefaultContent()}
			</div>
			${"responsive"!==this.layout?this.renderDismissButton():void 0}
		</div>`}renderDefaultContent(){return e$`${this.renderTitle()} ${this.renderBody()} ${this.renderButtons()}`}renderResponsiveContent(){return e$`
			<div class="banner__text">${this.renderTitle()} ${this.renderBody()}</div>
			${this.renderButtons()} ${this.renderDismissButton()}
		`}renderTitle(){if(this.bannerTitle)return e$`<div class="banner__title">${this.bannerTitle}</div>`}renderBody(){if(this.body)return e$`<div class="banner__body">${r5(this.body)}</div>`}renderButtons(){let e=this.renderPrimaryButton(),t=this.renderSecondaryButton();if(e||t)return e$`<div class="banner__buttons">${e} ${t}</div>`}renderPrimaryButton(){if(this.primaryButton)return e$`
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
		`}onPrimaryButtonClick(e){this.primaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-primary-click",{detail:{command:this.primaryButtonCommand},bubbles:!0,composed:!0}))}onSecondaryButtonClick(e){this.secondaryButtonCommand&&e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-secondary-click",{detail:{command:this.secondaryButtonCommand},bubbles:!0,composed:!0}))}onDismissClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gl-banner-dismiss",{bubbles:!0,composed:!0}))}};sZ.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},sZ.styles=[r3],sK([eB({reflect:!0})],sZ.prototype,"display",2),sK([eB({attribute:"banner-title"})],sZ.prototype,"bannerTitle",2),sK([eB()],sZ.prototype,"body",2),sK([eB({attribute:"primary-button"})],sZ.prototype,"primaryButton",2),sK([eB({attribute:"primary-button-href"})],sZ.prototype,"primaryButtonHref",2),sK([eB({attribute:"primary-button-command"})],sZ.prototype,"primaryButtonCommand",2),sK([eB({attribute:"secondary-button"})],sZ.prototype,"secondaryButton",2),sK([eB({attribute:"secondary-button-href"})],sZ.prototype,"secondaryButtonHref",2),sK([eB({attribute:"secondary-button-command"})],sZ.prototype,"secondaryButtonCommand",2),sK([eB({type:Boolean,attribute:"dismissible"})],sZ.prototype,"dismissible",2),sK([eB({attribute:"dismiss-href"})],sZ.prototype,"dismissHref",2),sK([eB({attribute:"layout"})],sZ.prototype,"layout",2),sZ=sK([eL("gl-banner")],sZ);var sY=Object.defineProperty,sX=Object.getOwnPropertyDescriptor,sQ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sX(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sY(t,i,s),s};let sJ=class extends ty(lit_element_i){render(){let e=this.error.get();return e?e$`<gl-banner
			display="solid"
			banner-title="Something went wrong"
			.body=${e}
			dismissible
			@gl-banner-dismiss=${()=>this.error.set(void 0)}
		></gl-banner>`:eP}};sQ([eB({attribute:!1})],sJ.prototype,"error",2),sJ=sQ([eL("gl-error-banner")],sJ);let s0=F`
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
`,s1=F`
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
`;var s2=Object.defineProperty,s5=Object.getOwnPropertyDescriptor,s3=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s5(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s2(t,i,s),s};let s6=class extends lit_element_i{constructor(){super(...arguments),this.pulse=!1}render(){return e$`<slot class="indicator${this.pulse?" indicator--pulse":""}"></slot>`}};s6.styles=[s0,s1],s3([eB({type:Boolean})],s6.prototype,"pulse",2),s6=s3([eL("gl-indicator")],s6);let s4=F`
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
`;var s7=Object.defineProperty,s8=Object.getOwnPropertyDescriptor,s9=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?s8(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&s7(t,i,s),s};let ne=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="check"></code-icon></span>
			</span>`:eP:e$`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${eq(this.behind>0,()=>e$`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${eq(this.ahead>0,()=>e$`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${eq(this.working>0,()=>e$`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};function nt(e,t){return null==t?`command:${e}`:`command:${e}?${encodeURIComponent("string"==typeof t?t:JSON.stringify(t))}`}function ni(e,t,i,r=!1,o){let s={name:"",relativePath:"",children:new Map,descendants:[]},a=e.reduce((e,r)=>{let o=e,s="";for(let e of t(r)){s=i(s,e),o.children??=new Map;let t=o.children.get(e);null==t&&(t={name:e,relativePath:s,parent:o,children:void 0,descendants:void 0},o.children.set(e,t)),o.descendants??=[],o.descendants.push(r),o=t}return o.value=r,e},s);return r&&(a=function e(t,i,r=!0,o){if(null==t.children)return t;let s=[...t.children.values()];for(let t of s)e(t,i,!1,o);if(!r&&null==t.value&&1===s.length){let e=s[0];if((null==e.value||o?.(e.value))&&(t.name=i(t.name,e.name),t.relativePath=e.relativePath,t.children=e.children,t.descendants=e.descendants,t.value=e.value,null!=t.children))for(let e of t.children.values())e.parent=t}return t}(a,i,!0,o)),a}ne.styles=[s4,F`
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
		`],s9([eB({type:Number})],ne.prototype,"ahead",2),s9([eB({type:Number})],ne.prototype,"behind",2),s9([eB({type:Number})],ne.prototype,"working",2),s9([eB({type:Boolean,attribute:"always-show"})],ne.prototype,"alwaysShow",2),s9([eB({type:Boolean})],ne.prototype,"outlined",2),s9([eB({type:Boolean})],ne.prototype,"colorized",2),s9([eB({type:Boolean})],ne.prototype,"missingUpstream",2),ne=s9([eL("gl-tracking-pill")],ne);var nr=Object.defineProperty,no=Object.getOwnPropertyDescriptor,ns=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?no(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nr(t,i,s),s};let nn=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return e$`<div class="progress-bar"></div>`}};nn.styles=F`
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
	`,ns([eB({reflect:!0})],nn.prototype,"mode",2),ns([eB({type:Boolean})],nn.prototype,"active",2),ns([eB()],nn.prototype,"position",2),nn=ns([eL("progress-indicator")],nn);var na=Object.defineProperty,nl=Object.getOwnPropertyDescriptor,nc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nl(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&na(t,i,s),s};let nh=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?e$`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:e$`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return e$`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};nh.styles=[r9,F`
			:host {
				display: flex;
				flex-direction: column;
				background-color: var(--vscode-sideBar-background);
				min-height: 23px;
			}

			* {
				box-sizing: border-box;
			}

			.header {
				flex: none;
				display: flex;
				background-color: var(--vscode-sideBarSectionHeader-background);
				color: var(--vscode-sideBarSectionHeader-foreground);
				border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
				position: relative;
			}

			.header:focus-within {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.label {
				appearance: none;
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				padding: 0;
				border: none;
				text-align: left;
				font-family: var(--font-family);
				font-size: 1.1rem;
				line-height: 2.2rem;
				height: 2.2rem;
				background: transparent;
				color: inherit;
				outline: none;
				text-overflow: ellipsis;
				user-select: none;
			}

			:host([collapsable]) .label {
				cursor: pointer;
			}

			.title {
				font-weight: bold;
				text-transform: uppercase;
				flex: 1;
				min-width: 0;
				width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:host(:not([collapsable])) .title {
				margin-left: 0.8rem;
			}

			.subtitle {
				margin-left: 1rem;
			}

			.subtitle::slotted(*) {
				opacity: 0.6;
			}

			.icon {
				font-weight: normal;
				margin: 0 0.2rem;
			}

			.content {
				display: flex;
				flex-direction: column;
				flex: 1;
				overflow: auto;
				min-height: 0;
				/*
			scrollbar-gutter: stable;
			box-shadow: #000000 0 0.6rem 0.6rem -0.6rem inset;
			*/
				padding-top: 0.6rem;
			}

			:host([collapsable]:not([expanded])) .content,
			:host([collapsable][expanded='false']) .content {
				display: none;
			}

			slot[name='actions']::slotted(*) {
				flex: none;
				margin-left: auto;
			}
		`],nc([eB({type:Boolean,reflect:!0})],nh.prototype,"collapsable",2),nc([eB({type:Boolean,reflect:!0})],nh.prototype,"expanded",2),nc([eB({type:Boolean,reflect:!0})],nh.prototype,"loading",2),nh=nc([eL("webview-pane")],nh);let nd=navigator?.userAgentData?.platform,np=navigator.userAgent;"Linux"===nd||np.includes("Linux");let nu="macOS"===nd||np.includes("Macintosh");function ng(){return nu?"⌥":"Alt"}"Windows"===nd||np.includes("Windows");var nf=Object.defineProperty,nm=Object.getOwnPropertyDescriptor,nb=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nm(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nf(t,i,s),s};let nv=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this.isAltKeyPressed=!1,this.handlePointerModifiers=e=>{let t=e.altKey||e.shiftKey;this.isAltKeyPressed!==t&&(this.isAltKeyPressed=t)},this.handleLinkKeydown=e=>{this.effectiveHref||" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),e.target.click())}}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${ng()}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}connectedCallback(){super.connectedCallback?.(),window.addEventListener("keydown",this),window.addEventListener("keyup",this),this.addEventListener("pointerenter",this.handlePointerModifiers),this.addEventListener("pointermove",this.handlePointerModifiers)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("keydown",this),window.removeEventListener("keyup",this),this.removeEventListener("pointerenter",this.handlePointerModifiers),this.removeEventListener("pointermove",this.handlePointerModifiers)}handleEvent(e){let t="Alt"===e.key||"Shift"===e.key||e.altKey||e.shiftKey;"keydown"===e.type?this.isAltKeyPressed=t:"keyup"===e.type&&t&&(this.isAltKeyPressed=!1)}render(){return e$`
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
		`}focus(e){this.defaultFocusEl.focus(e)}};nv.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},nv.styles=F`
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
			${r4}
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
	`,nb([eB()],nv.prototype,"href",2),nb([eB({attribute:"alt-href"})],nv.prototype,"altHref",2),nb([eB()],nv.prototype,"label",2),nb([eB({attribute:"alt-label"})],nv.prototype,"altLabel",2),nb([eB()],nv.prototype,"icon",2),nb([eB({attribute:"alt-icon"})],nv.prototype,"altIcon",2),nb([eB({type:Boolean})],nv.prototype,"disabled",2),nb([eN("a")],nv.prototype,"defaultFocusEl",2),nb([eF()],nv.prototype,"isAltKeyPressed",2),nv=nb([eL("action-item")],nv);var ny=Object.defineProperty,nw=Object.getOwnPropertyDescriptor,n_=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nw(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ny(t,i,s),s};let nx=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return e$`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(e){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let t=this.handleKeydown.bind(this),i=`${this.actionNodes.length}`,r=this.actionNodes.map((e,r)=>(e.setAttribute("aria-posinset",`${r+1}`),e.setAttribute("aria-setsize",i),e.setAttribute("tabindex",0===r?"0":"-1"),this.actionNodes.length>=2&&e.addEventListener("keydown",t,!1),{dispose:()=>{e?.removeEventListener("keydown",t,!1)}}));this._slotSubscriptionsDisposer=()=>{r?.forEach(({dispose:e})=>e())}}handleKeydown(e){if(!e.target||null==this.actionNodes)return;let t=e.target,i=parseInt(t.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==e.key&&"ArrowRight"!==e.key||this.actionNodes.length<2)return;let r=null;if("ArrowLeft"===e.key){let e=1===i?this.actionNodes.length-1:i-2;r=this.actionNodes[e]}else if("ArrowRight"===e.key){let e=i===this.actionNodes.length?0:i;r=this.actionNodes[e]}null!=r&&r!==t&&(e.preventDefault(),e.stopPropagation(),t.setAttribute("tabindex","-1"),r.setAttribute("tabindex","0"),r.focus())}};nx.styles=F`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,n_([(v={flatten:!0},(e,t)=>{let{slot:i,selector:r}=v??{},o="slot"+(i?`[name=${i}]`:":not([name])");return ej(e,t,{get(){let e=this.renderRoot?.querySelector(o),t=e?.assignedElements(v)??[];return void 0===r?t:t.filter(e=>e.matches(r))}})})],nx.prototype,"actionNodes",2),nx=n_([eL("action-nav")],nx);var nk=E(90);let n$=tw(class extends directive_i{constructor(){super(...arguments),this.key=eP}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(tS(e),this.key=t),i}}),nC=()=>new ref_h;let ref_h=class ref_h{};let nS=new WeakMap,nP=tw(class extends async_directive_f{render(e){return eP}update(e,[t]){let i=t!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),eP}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=nS.get(t);void 0===i&&(i=new WeakMap,nS.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?nS.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),nA="important",nE=" !"+nA,nT=tw(class extends directive_i{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{let r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){let{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(let e in t){let r=t[e];if(null!=r){this.ft.add(e);let t="string"==typeof r&&r.endsWith(nE);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?nA:""):i[e]=r}}return eS}});function nR(e,t,i,r){var o,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a);return s>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;let nI=(e,t,i)=>{let r=new Map;for(let o=t;o<=i;o++)r.set(e[o],o);return r},nM=tw(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);let o=[],s=[],a=0;for(let t of e)o[a]=r?r(t,a):a,s[a]=i(t,a),a++;return{values:s,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){let o=e._$AH,{values:s,keys:a}=this.dt(t,i,r);if(!Array.isArray(o))return this.ut=a,s;let c=this.ut??=[],h=[],p,g,f=0,m=o.length-1,b=0,v=s.length-1;for(;f<=m&&b<=v;)if(null===o[f])f++;else if(null===o[m])m--;else if(c[f]===a[b])h[b]=t$(o[f],s[b]),f++,b++;else if(c[m]===a[v])h[v]=t$(o[m],s[v]),m--,v--;else if(c[f]===a[v])h[v]=t$(o[f],s[v]),tk(e,h[v+1],o[f]),f++,v--;else if(c[m]===a[b])h[b]=t$(o[m],s[b]),tk(e,o[f],o[m]),m--,b++;else if(void 0===p&&(p=nI(a,b,v),g=nI(c,f,m)),p.has(c[f]))if(p.has(c[m])){let t=g.get(a[b]),i=void 0!==t?o[t]:null;if(null===i){let t=tk(e,o[f]);t$(t,s[b]),h[b]=t}else h[b]=t$(i,s[b]),tk(e,o[f],i),o[t]=null;b++}else tP(o[m]),m--;else tP(o[f]),f++;for(;b<=v;){let t=tk(e,h[v+1]);t$(t,s[b]),h[b++]=t}for(;f<=m;){let e=o[f++];null!==e&&tP(e)}return this.ut=a,tS(e,h),eS}});let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(e){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(e){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(e){this._element=null;let t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){this._scrollTo("number"==typeof e&&"number"==typeof t?{left:e,top:t}:e)}scrollBy(e,t){let i="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==i.top&&(i.top+=this.scrollTop),void 0!==i.left&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),(null===this._destination||i!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:e,scrollLeft:t}=this,{top:i,left:r}=this._destination;i=Math.min(i||0,this.maxScrollTop);let o=Math.abs((r=Math.min(r||0,this.maxScrollLeft))-t);1>Math.abs(i-e)&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let nz="u">typeof window?window.ResizeObserver:void 0,nO=Symbol("virtualizerRef"),nL="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);let t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new nz(()=>this._hostElementSizeChanged()),this._childrenRO=new nz(this._childrenSizeChanged.bind(this))}_initHostElement(e){let t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[nO]=this}connected(){this._initObservers();let e=this._isScroller;this._clippingAncestors=function(e,t=!1){let i=!1;return(function(e,t=!1){let i=[],r=t?e:nB(e);for(;null!==r;)i.push(r),r=nB(r);return i})(e,t).filter(e=>{if(i)return!1;let t=getComputedStyle(e);return i="fixed"===t.position,"visible"!==t.overflow})}(this._hostElement,e),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${nL}]`);t||((t=document.createElement("div")).setAttribute(nL,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(nL,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;let t=e.type||g;if("function"==typeof t&&this._layout instanceof t){let t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,i;if("function"==typeof e.type){i=e.type;let r={...e};delete r.type,t=r}else t=e;void 0===i&&(g=i=(await Promise.resolve().then(E.bind(E,90))).FlowLayout),this._layout=new i(e=>this._handleLayoutMessage(e),t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let e=window.performance.now(),t=e-this._benchmarkStart,i=performance.getEntriesByName("uv-virtualizing","measure").filter(t=>t.startTime>=this._benchmarkStart&&t.startTime<e).reduce((e,t)=>e+t.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:i}}return null}_measureChildren(){let e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let r=0;r<t.length;r++){let o=t[r],s=this._first+r;(this._itemsChanged||this._toBeMeasured.has(o))&&(e[s]=i.call(this,o,this._items[s]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){var t;let i,{width:r,height:o}=e.getBoundingClientRect();return Object.assign({width:r,height:o},(t=e,{marginTop:nD((i=window.getComputedStyle(t)).marginTop),marginRight:nD(i.marginRight),marginBottom:nD(i.marginBottom),marginLeft:nD(i.marginLeft)}))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;let{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){"scroll"===e.type&&(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(e){"stateChanged"===e.type?this._updateDOM(e):"visibilityChanged"===e.type?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):"unpinned"===e.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let e=[],t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(nL)||e.push(t),t=t.nextElementSibling;return e}_updateView(){let e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let r,o,s,a,c=e.getBoundingClientRect();r=0,o=0,s=window.innerHeight,a=window.innerWidth;let h=this._clippingAncestors.map(e=>e.getBoundingClientRect());for(let e of(h.unshift(c),h))r=Math.max(r,e.top),o=Math.max(o,e.left),s=Math.min(s,e.bottom),a=Math.min(a,e.right);let p=t.getBoundingClientRect(),g={left:c.left-p.left,top:c.top-p.top},f={width:t.scrollWidth,height:t.scrollHeight},m=r-c.top+e.scrollTop,b=o-c.left+e.scrollLeft;i.viewportSize={width:Math.max(0,a-o),height:Math.max(0,s-r)},i.viewportScroll={top:m,left:b},i.totalScrollSize=f,i.offsetWithinScroller=g}}_sizeHostElement(e){let t=e&&null!==e.width?Math.min(82e5,e.width):0,i=e&&null!==e.height?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${t}px, ${i}px)`;else{let e=this._hostElement.style;e.minWidth=t?`${t}px`:"100%",e.minHeight=i?`${i}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:e,left:t,width:i,height:r,xOffset:o,yOffset:s},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${t}px, ${e}px)`,void 0!==i&&(c.style.width=i+"px"),void 0!==r&&(c.style.height=r+"px"),c.style.left=void 0===o?null:o+"px",c.style.top=void 0===s?null:s+"px")})}async _adjustRange(e){let{_first:t,_last:i,_firstVisible:r,_lastVisible:o}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==r||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:r}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-r})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){let t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){let{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(let t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function nD(e){let t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function nB(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;let t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}let nF=e=>e,nj=(e,t)=>e$`${t}: ${JSON.stringify(e,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>nj(e,t+this._first),this._keyFunction=(e,t)=>nF(e,t+this._first),this._items=[],2!==e.type)throw Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);let t=[];if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<=this._last;e++)t.push(this._items[e]);return nM(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);let i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?eS:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){let i=e.parentNode;this._makeVirtualizer(i,t)}this._virtualizer.items=this._items}_setFunctions(e){let{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(e,i)=>t(e,i+this._first)),i&&(this._keyFunction=(e,t)=>i(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();let{layout:i,scroller:r,items:o}=t;this._virtualizer=new Virtualizer({hostElement:e,layout:i,scroller:r}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(e,t){let i=e.parentNode;i&&1===i.nodeType&&(i.addEventListener("rangeChanged",e=>{this._first=e.first,this._last=e.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let nN=tw(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=nj,this.keyFunction=nF,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:e,renderItem:t,keyFunction:i,layout:r,scroller:o}=this;return e$`${nN({items:e,renderItem:t,keyFunction:i,layout:r,scroller:o})}`}element(e){return this[nO]?.element(e)}get layoutComplete(){return this[nO]?.layoutComplete}scrollToIndex(e,t="start"){this.element(e)?.scrollIntoView({block:t})}};nR([eB({attribute:!1})],LitVirtualizer.prototype,"items",void 0),nR([eB()],LitVirtualizer.prototype,"renderItem",void 0),nR([eB()],LitVirtualizer.prototype,"keyFunction",void 0),nR([eB({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),nR([eB({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);var nq=Object.defineProperty,nU=Object.getOwnPropertyDescriptor,nW=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nU(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nq(t,i,s),s};let nH=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1}render(){return e$`<code-icon
				class="icon"
				icon="${this.worktree?"gl-worktree":"git-branch"}"
				size="${this.size}"
			></code-icon
			><span class="label">${this.name??"<missing>"}</span>`}};function nV(e,t){return e$`<gl-branch-name .name=${e} .size=${12} ?worktree=${t??!1}></gl-branch-name>`}nH.styles=F`
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
	`,nW([eB({type:String})],nH.prototype,"name",2),nW([eB({type:Number})],nH.prototype,"size",2),nW([eB({type:Boolean})],nH.prototype,"worktree",2),nH=nW([eL("gl-branch-name")],nH);var nG=Object.defineProperty,nK=Object.getOwnPropertyDescriptor,nZ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nK(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&nG(t,i,s),s};let nY=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return e$`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let e;if(!this.worktree&&(!this.status||"local"===this.status))return e$`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return e$`<code-icon icon="git-commit"></code-icon>`;let t="0.5";switch(this.status){case"diverged":e="var(--gl-icon-color-status-diverged)";break;case"behind":e="var(--gl-icon-color-status-behind)";break;case"ahead":e="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":e="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":e=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?e="var(--gl-icon-color-status-changes)":(e="transparent",t="1")}return this.worktree&&!1===this.isDefault?eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${e}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${t}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:eC`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${e}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${t}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let e,t=this.branch?nV(this.branch):"Branch",i=this.upstream?nV(this.upstream):"its upstream";switch(this.status){case"diverged":e=e$`${t} has diverged from ${i}`;break;case"behind":e=e$`${t} is behind ${i}`;break;case"ahead":e=e$`${t} is ahead of ${i}`;break;case"missingUpstream":e=e$`${t} is missing its upstream ${i}`;break;case"upToDate":e=e$`${t} is up to date with ${i}`;break;case"local":e=e$`${t} is a local branch which hasn't been published`;break;case"remote":e=e$`${t} is a remote branch`;break;case"detached":e=e$`${t} is in a detached state, i.e. checked out to a commit or tag`;break;default:e=e$`${t} is in an unknown state`}return e=e$`<p>${e}</p>`,this.worktree?e=this.hasChanges?e$`${e}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:e$`${e}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(e=e$`${e}
				<p>Has working (uncommitted) changes</p>`),e}};nY.styles=F`
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
	`,nZ([eB({type:String})],nY.prototype,"branch",2),nZ([eB({type:String})],nY.prototype,"status",2),nZ([eB({type:Boolean})],nY.prototype,"hasChanges",2),nZ([eB({type:String})],nY.prototype,"upstream",2),nZ([eB({type:Boolean})],nY.prototype,"worktree",2),nZ([eB({type:Boolean,attribute:"is-default"})],nY.prototype,"isDefault",2),nY=nZ([eL("gl-branch-icon")],nY);let private_async_helpers_s=class private_async_helpers_s{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let nX=e=>null!==e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...e){return e.find(e=>!nX(e))??eS}update(e,t){let i=this._$Cbt,r=i.length;this._$Cbt=t;let o=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){let a=t[e];if(!nX(a))return this._$Cwt=e,a;e<r&&a===i[e]||(this._$Cwt=0x3fffffff,r=0,Promise.resolve(a).then(async e=>{for(;s.get();)await s.get();let t=o.deref();if(void 0!==t){let i=t._$Cbt.indexOf(a);i>-1&&i<t._$Cwt&&(t._$Cwt=i,t.setValue(e))}}))}return eS}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let nQ=tw(until_c);function nJ(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var n0=nJ(),n1={exec:()=>null};function n2(e,t=""){let i="string"==typeof e?e:e.source,r={replace:(e,t)=>{let o="string"==typeof t?t:t.source;return o=o.replace(n3.caret,"$1"),i=i.replace(e,o),r},getRegex:()=>new RegExp(i,t)};return r}var n5=(()=>{try{return!!RegExp("(?<=1)(?<!1)")}catch{return!1}})(),n3={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},n6=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,n4=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,n7=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,n8=n2(n7).replace(/bull/g,n4).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),n9=n2(n7).replace(/bull/g,n4).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ae=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,at=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ai=n2(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",at).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ar=n2(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,n4).getRegex(),ao="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",as=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,an=n2("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",as).replace("tag",ao).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),aa=n2(ae).replace("hr",n6).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),al={blockquote:n2(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",aa).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:ai,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:n6,html:an,lheading:n8,list:ar,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:aa,table:n1,text:/^[^\n]+/},ac=n2("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",n6).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),ah={...al,lheading:n9,table:ac,paragraph:n2(ae).replace("hr",n6).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ac).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex()},ad={...al,html:n2("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",as).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:n1,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:n2(ae).replace("hr",n6).replace("heading",` *#{1,6} *[^
]`).replace("lheading",n8).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ap=/^( {2,}|\\)\n(?!\s*$)/,au=/[\p{P}\p{S}]/u,ag=/[\s\p{P}\p{S}]/u,af=/[^\s\p{P}\p{S}]/u,am=n2(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ag).getRegex(),ab=/(?!~)[\p{P}\p{S}]/u,av=n2(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",n5?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ay=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,aw=n2(ay,"u").replace(/punct/g,au).getRegex(),a_=n2(ay,"u").replace(/punct/g,ab).getRegex(),ax="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ak=n2(ax,"gu").replace(/notPunctSpace/g,af).replace(/punctSpace/g,ag).replace(/punct/g,au).getRegex(),a$=n2(ax,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,ab).getRegex(),aC=n2("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,af).replace(/punctSpace/g,ag).replace(/punct/g,au).getRegex(),aS=n2(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,au).getRegex(),aP=n2("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,af).replace(/punctSpace/g,ag).replace(/punct/g,au).getRegex(),aA=n2(/\\(punct)/,"gu").replace(/punct/g,au).getRegex(),aE=n2(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),aT=n2(as).replace("(?:--\x3e|$)","--\x3e").getRegex(),aR=n2("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",aT).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),aI=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,aM=n2(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",aI).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),az=n2(/^!?\[(label)\]\[(ref)\]/).replace("label",aI).replace("ref",at).getRegex(),aO=n2(/^!?\[(ref)\](?:\[\])?/).replace("ref",at).getRegex(),aL=n2("reflink|nolink(?!\\()","g").replace("reflink",az).replace("nolink",aO).getRegex(),aD=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,aB={_backpedal:n1,anyPunctuation:aA,autolink:aE,blockSkip:av,br:ap,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:n1,delLDelim:n1,delRDelim:n1,emStrongLDelim:aw,emStrongRDelimAst:ak,emStrongRDelimUnd:aC,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:aM,nolink:aO,punctuation:am,reflink:az,reflinkSearch:aL,tag:aR,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:n1},aF={...aB,link:n2(/^!?\[(label)\]\((.*?)\)/).replace("label",aI).getRegex(),reflink:n2(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",aI).getRegex()},aj={...aB,emStrongRDelimAst:a$,emStrongLDelim:a_,delLDelim:aS,delRDelim:aP,url:n2(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",aD).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:n2(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",aD).getRegex()},aN={...aj,br:n2(ap).replace("{2,}","*").getRegex(),text:n2(aj.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},aq={normal:al,gfm:ah,pedantic:ad},aU={normal:aB,gfm:aj,breaks:aN,pedantic:aF},aW={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},aH=e=>aW[e];function aV(e,t){if(t){if(n3.escapeTest.test(e))return e.replace(n3.escapeReplace,aH)}else if(n3.escapeTestNoEncode.test(e))return e.replace(n3.escapeReplaceNoEncode,aH);return e}function aG(e){try{e=encodeURI(e).replace(n3.percentDecode,"%")}catch{return null}return e}function aK(e,t){let i=e.replace(n3.findPipe,(e,t,i)=>{let r=!1,o=t;for(;--o>=0&&"\\"===i[o];)r=!r;return r?"|":" |"}).split(n3.splitPipe),r=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;r<i.length;r++)i[r]=i[r].trim().replace(n3.slashPipe,"|");return i}function aZ(e,t,i){let r=e.length;if(0===r)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s!==t||i)if(s!==t&&i)o++;else break;else o++}return e.slice(0,r-o)}function aY(e,t,i,r,o){let s=t.href,a=t.title||null,c=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let h={type:"!"===e[0].charAt(0)?"image":"link",raw:i,href:s,title:a,text:c,tokens:r.inlineTokens(c)};return r.state.inLink=!1,h}var aX=class{options;rules;lexer;constructor(e){this.options=e||n0}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:aZ(e,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let r=e.match(i.other.indentCodeCompensation);if(null===r)return t;let o=r[1];return t.split(`
`).map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=o.length?e.slice(o.length):e}).join(`
`)}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=aZ(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:aZ(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=aZ(t[0],`
`).split(`
`),i="",r="",o=[];for(;e.length>0;){let t=!1,s=[],a;for(a=0;a<e.length;a++)if(this.rules.other.blockquoteStart.test(e[a]))s.push(e[a]),t=!0;else if(t)break;else s.push(e[a]);e=e.slice(a);let c=s.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,r=r?`${r}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=p,0===e.length)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let t=g.raw+`
`+e.join(`
`),s=this.blockquote(t);o[o.length-1]=s,i=i.substring(0,i.length-g.raw.length)+s.raw,r=r.substring(0,r.length-g.text.length)+s.text;break}if(g?.type==="list"){let t=g.raw+`
`+e.join(`
`),s=this.list(t);o[o.length-1]=s,i=i.substring(0,i.length-g.raw.length)+s.raw,r=r.substring(0,r.length-g.raw.length)+s.raw,e=t.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=t[1].trim(),r=i.length>1,o={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");let s=this.rules.other.listItemRegex(i),a=!1;for(;e;){let i=!1,r="",c="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let h=function(e,t=0){let i=t,r="";for(let t of e)if("	"===t){let e=4-i%4;r+=" ".repeat(e),i+=e}else r+=t,i++;return r}(t[2].split(`
`,1)[0],t[1].length),p=e.split(`
`,1)[0],g=!h.trim(),f=0;if(this.options.pedantic?(f=2,c=h.trimStart()):g?f=t[1].length+1:(f=(f=h.search(this.rules.other.nonSpaceChar))>4?1:f,c=h.slice(f),f+=t[1].length),g&&this.rules.other.blankLine.test(p)&&(r+=p+`
`,e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(f),i=this.rules.other.hrRegex(f),o=this.rules.other.fencesBeginRegex(f),s=this.rules.other.headingBeginRegex(f),a=this.rules.other.htmlBeginRegex(f),m=this.rules.other.blockquoteBeginRegex(f);for(;e;){let b=e.split(`
`,1)[0],v;if(p=b,v=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),o.test(p)||s.test(p)||a.test(p)||m.test(p)||t.test(p)||i.test(p))break;if(v.search(this.rules.other.nonSpaceChar)>=f||!p.trim())c+=`
`+v.slice(f);else{if(g||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(h)||s.test(h)||i.test(h))break;c+=`
`+p}g=!p.trim(),r+=b+`
`,e=e.substring(b.length+1),h=v.slice(f)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(a=!0)),o.items.push({type:"list_item",raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),o.raw+=r}let c=o.items.at(-1);if(!c)return;for(let e of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),o.raw=o.raw.trimEnd(),o.items)){if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),e.task){if(e.text=e.text.replace(this.rules.other.listReplaceTask,""),e.tokens[0]?.type==="text"||e.tokens[0]?.type==="paragraph"){e.tokens[0].raw=e.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),e.tokens[0].text=e.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}}let t=this.rules.other.listTaskCheckbox.exec(e.raw);if(t){let i={type:"checkbox",raw:t[0]+" ",checked:"[ ]"!==t[0]};e.checked=i.checked,o.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=i.raw+e.tokens[0].raw,e.tokens[0].text=i.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(i)):e.tokens.unshift({type:"paragraph",raw:i.raw,text:i.raw,tokens:[i]}):e.tokens.unshift(i)}}if(!o.loose){let t=e.tokens.filter(e=>"space"===e.type);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(o.loose)for(let e of o.items)for(let t of(e.loose=!0,e.tokens))"text"===t.type&&(t.type="paragraph");return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:i,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=aK(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(i.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<i.length;e++)s.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:s.align[e]});for(let e of o)s.rows.push(aK(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=aZ(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e){if(-1===e.indexOf(")"))return -1;let t=0;for(let i=0;i<e.length;i++)if("\\"===e[i])i++;else if("("===e[i])t++;else if(")"===e[i]&&--t<0)return i;return t>0?-2:-1}(t[2]);if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i.slice(1):i.slice(1,-1)),aY(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let e=t[(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return aY(i,e,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,a=i,c=0,h="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+i);null!=(r=h.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6]))continue;if(s=[...o].length,r[3]||r[4]){a+=s;continue}if((r[5]||r[6])&&i%3&&!((i+s)%3)){c+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a+c);let t=[...r[0]][0].length,h=e.slice(0,i+r.index+t+s);if(Math.min(i,s)%2){let e=h.slice(1,-1);return{type:"em",raw:h,text:e,tokens:this.lexer.inlineTokens(e)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!i||this.rules.inline.punctuation.exec(i))){let i=[...r[0]].length-1,o,s,a=i,c=this.rules.inline.delRDelim;for(c.lastIndex=0,t=t.slice(-1*e.length+i);null!=(r=c.exec(t));){if(!(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6])||(s=[...o].length)!==i)continue;if(r[3]||r[4]){a+=s;continue}if((a-=s)>0)continue;s=Math.min(s,s+a);let t=[...r[0]][0].length,c=e.slice(0,i+r.index+t+s),h=c.slice(i,-i);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return i="@"===t[2]?"mailto:"+(e=t[1]):e=t[1],{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])i="mailto:"+(e=t[0]);else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0])e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},aQ=class u{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||n0,this.options.tokenizer=this.options.tokenizer||new aX,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:n3,block:aq.normal,inline:aU.normal};this.options.pedantic?(t.block=aq.pedantic,t.inline=aU.pedantic):this.options.gfm&&(t.block=aq.gfm,this.options.breaks?t.inline=aU.breaks:t.inline=aU.gfm),this.tokenizer.rules=t}static get rules(){return{block:aq,inline:aU}}static lex(e,t){return new u(t).lex(e)}static lexInline(e,t){return new u(t).inlineTokens(e)}lex(e){e=e.replace(n3.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(n3.tabCharGlobal,"    ").replace(n3.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>!!(r=i.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);1===r.raw.length&&void 0!==i?i.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if((r=this.tokenizer.fences(e))||(r=this.tokenizer.heading(e))||(r=this.tokenizer.hr(e))||(r=this.tokenizer.blockquote(e))||(r=this.tokenizer.list(e))||(r=this.tokenizer.html(e))){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if((r=this.tokenizer.table(e))||(r=this.tokenizer.lheading(e))){e=e.substring(r.raw.length),t.push(r);continue}let o=e;if(this.options.extensions?.startBlock){let t=1/0,i=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){let s=t.at(-1);i&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r),i=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent)break;throw Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i;this.tokenizer.lexer=this;let r=e,o=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(r));)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,a="";for(;e;){let i;if(s||(a=""),s=!1,this.options.extensions?.inline?.some(r=>!!(i=r.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if((i=this.tokenizer.escape(e))||(i=this.tokenizer.tag(e))||(i=this.tokenizer.link(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let r=t.at(-1);"text"===i.type&&r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if((i=this.tokenizer.emStrong(e,r,a))||(i=this.tokenizer.codespan(e))||(i=this.tokenizer.br(e))||(i=this.tokenizer.del(e,r,a))||(i=this.tokenizer.autolink(e))||!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let t=1/0,i=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{"number"==typeof(r=e.call({lexer:this},i))&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),"_"!==i.raw.slice(-1)&&(a=i.raw.slice(-1)),s=!0;let r=t.at(-1);r?.type==="text"?(r.raw+=i.raw,r.text+=i.text):t.push(i);continue}if(e){let t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent)break;throw Error(t)}}return t}},aJ=class{options;parser;constructor(e){this.options=e||n0}space(e){return""}code({text:e,lang:t,escaped:i}){let r=(t||"").match(n3.notSpaceStart)?.[0],o=e.replace(n3.endingNewline,"")+`
`;return r?'<pre><code class="language-'+aV(r)+'">'+(i?o:aV(o,!0))+`</code></pre>
`:"<pre><code>"+(i?o:aV(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,i=e.start,r="";for(let t=0;t<e.items.length;t++){let i=e.items[t];r+=this.listitem(i)}let o=t?"ol":"ul";return"<"+o+(t&&1!==i?' start="'+i+'"':"")+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let r="";for(let t=0;t<e.rows.length;t++){let o=e.rows[t];i="";for(let e=0;e<o.length;e++)i+=this.tablecell(o[e]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${aV(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:i}){let r=this.parser.parseInline(i),o=aG(e);if(null===o)return r;let s='<a href="'+(e=o)+'"';return t&&(s+=' title="'+aV(t)+'"'),s+=">"+r+"</a>"}image({href:e,title:t,text:i,tokens:r}){r&&(i=this.parser.parseInline(r,this.parser.textRenderer));let o=aG(e);if(null===o)return aV(i);e=o;let s=`<img src="${e}" alt="${aV(i)}"`;return t&&(s+=` title="${aV(t)}"`),s+=">"}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:aV(e.text)}},a0=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},a1=class u{options;renderer;textRenderer;constructor(e){this.options=e||n0,this.options.renderer=this.options.renderer||new aJ,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new a0}static parse(e,t){return new u(t).parse(e)}static parseInline(e,t){return new u(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let r=e[i];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){t+=e||"";continue}}switch(r.type){case"space":t+=this.renderer.space(r);break;case"hr":t+=this.renderer.hr(r);break;case"heading":t+=this.renderer.heading(r);break;case"code":t+=this.renderer.code(r);break;case"table":t+=this.renderer.table(r);break;case"blockquote":t+=this.renderer.blockquote(r);break;case"list":t+=this.renderer.list(r);break;case"checkbox":t+=this.renderer.checkbox(r);break;case"html":t+=this.renderer.html(r);break;case"def":t+=this.renderer.def(r);break;case"paragraph":t+=this.renderer.paragraph(r);break;case"text":t+=this.renderer.text(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let e=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=e||"";continue}}switch(o.type){case"escape":case"text":i+=t.text(o);break;case"html":i+=t.html(o);break;case"link":i+=t.link(o);break;case"image":i+=t.image(o);break;case"checkbox":i+=t.checkbox(o);break;case"strong":i+=t.strong(o);break;case"em":i+=t.em(o);break;case"codespan":i+=t.codespan(o);break;case"br":i+=t.br(o);break;case"del":i+=t.del(o);break;default:{let e='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(e)}}}return i}},a2=class{options;block;constructor(e){this.options=e||n0}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?aQ.lex:aQ.lexInline}provideParser(){return this.block?a1.parse:a1.parseInline}},a5=class{defaults=nJ();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=a1;Renderer=aJ;TextRenderer=a0;Lexer=aQ;Tokenizer=aX;Hooks=a2;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let r of e)switch(i=i.concat(t.call(this,r)),r.type){case"table":for(let e of r.header)i=i.concat(this.walkTokens(e.tokens,t));for(let e of r.rows)for(let r of e)i=i.concat(this.walkTokens(r.tokens,t));break;case"list":i=i.concat(this.walkTokens(r.items,t));break;default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let o=e[r].flat(1/0);i=i.concat(this.walkTokens(o,t))}):e.tokens&&(i=i.concat(this.walkTokens(e.tokens,t)))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];i?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=i.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new aJ(this.defaults);for(let i in e.renderer){if(!(i in t))throw Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let r=e.renderer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new aX(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let r=e.tokenizer[i],o=t[i];t[i]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new a2;for(let i in e.hooks){if(!(i in t))throw Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let r=e.hooks[i],o=t[i];a2.passThroughHooks.has(i)?t[i]=e=>{if(this.defaults.async&&a2.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await r.call(t,e);return o.call(t,i)})();let s=r.call(t,e);return o.call(t,s)}:t[i]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await r.apply(t,e);return!1===i&&(i=await o.apply(t,e)),i})();let i=r.apply(t,e);return!1===i&&(i=o.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(r.call(this,e)),t&&(i=i.concat(t.call(this,e))),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return aQ.lex(e,t??this.defaults)}parser(e,t){return a1.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let r={...i},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===r.async)return s(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,r=await (o.hooks?await o.hooks.provideLexer():e?aQ.lex:aQ.lexInline)(i,o),s=o.hooks?await o.hooks.processAllTokens(r):r;o.walkTokens&&await Promise.all(this.walkTokens(s,o.walkTokens));let a=await (o.hooks?await o.hooks.provideParser():e?a1.parse:a1.parseInline)(s,o);return o.hooks?await o.hooks.postprocess(a):a})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?aQ.lex:aQ.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let r=(o.hooks?o.hooks.provideParser():e?a1.parse:a1.parseInline)(i,o);return o.hooks&&(r=o.hooks.postprocess(r)),r}catch(e){return s(e)}}}onError(e,t){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e="<p>An error occurred:</p><pre>"+aV(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}},a3=new a5;function a6(e,t){return a3.parse(e,t)}a6.options=a6.setOptions=function(e){return a3.setOptions(e),a6.defaults=a3.defaults,n0=a6.defaults,a6},a6.getDefaults=nJ,a6.defaults=n0,a6.use=function(...e){return a3.use(...e),a6.defaults=a3.defaults,n0=a6.defaults,a6},a6.walkTokens=function(e,t){return a3.walkTokens(e,t)},a6.parseInline=a3.parseInline,a6.Parser=a1,a6.parser=a1.parse,a6.Renderer=aJ,a6.TextRenderer=a0,a6.Lexer=aQ,a6.lexer=aQ.lex,a6.Tokenizer=aX,a6.Hooks=a2,a6.parse=a6,a6.options,a6.setOptions,a6.use,a6.walkTokens,a6.parseInline,a1.parse,aQ.lex;let a4=F`
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
`,a7=F`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;var a8=Object.defineProperty,a9=Object.getOwnPropertyDescriptor,le=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?a9(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&a8(t,i,s),s};let lt=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return e$`${this.markdown?nQ(this.renderMarkdown(this.markdown),"Loading..."):""}`}async renderMarkdown(e){let t,i,r,o;return this.inline?(f??=new a5({breaks:!1,gfm:!0,renderer:(i=0,r=!1,{blockquote:function({tokens:e}){return this.parser.parse(e)},code:function({text:e}){return`<code>${lo(e)}</code>`},codespan:function({text:e}){return`<code>${lo(e)}</code>`},heading:function({tokens:e}){return this.parser.parseInline(e)},hr:function(){return""},image:function({text:e}){return e||""},link:function({tokens:e}){return this.parser.parseInline(e)},list:function(e){r=e.ordered,i="number"==typeof e.start?e.start:1;let t="";for(let i of e.items)t+=o.call(this,i);return t},listitem:o=function(e){let t,o=this.parser.parse(e.tokens);return e.task?t=e.checked?"☑":"☐":r?(t=`${i}.`,i++):t="•",`${t} ${o.trim()} `},paragraph:function({tokens:e}){return this.parser.parseInline(e)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),t=lp(t=await f.parse(ld(e))),e$`<span>${r5(t)}</span>`):(m??=new a5({breaks:!0,gfm:!0,renderer:{image:function({href:e,title:t,text:i}){let r=[],o=[];return e&&({href:e,dimensions:r}=function(e){let t=[],i=e.split("|").map(e=>e.trim());e=i[0];let r=i[1];if(r){let e=/height=(\d+)/.exec(r),i=/width=(\d+)/.exec(r),o=e?e[1]:"",s=i?i[1]:"",a=isFinite(parseInt(s)),c=isFinite(parseInt(o));a&&t.push(`width="${s}"`),c&&t.push(`height="${o}"`)}return{href:e,dimensions:t}}(e),o.push(`src="${lg(e)}"`)),i&&o.push(`alt="${lg(i)}"`),t&&o.push(`title="${lg(t)}"`),r.length&&(o=[...o,...r]),`<img ${o.join(" ")}>`},codespan:function({text:e}){return`<code>${lo(e)}</code>`},paragraph:function({tokens:e}){let t=this.parser.parseInline(e);return`<p>${t}</p>`},html:function({text:e}){return e.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?e:""}}}),r5(t=lp(t=await m.parse(ld(e)))))}};lt.styles=[a7,F`
			:host {
				display: contents;

				--markdown-compact-block-spacing: 8px;
				--markdown-list-spacing: 20px;
			}

			a,
			a code {
				text-decoration: none;
				color: var(--vscode-textLink-foreground);
			}

			a:hover,
			a:hover code {
				color: var(--vscode-textLink-activeForeground);
			}

			a:hover:not(.disabled) {
				cursor: pointer;
			}

			p,
			.code,
			ul,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin-inline: 0;
			}

			:where(:host([density='compact'])) p,
			:where(:host([density='compact'])) .code,
			:where(:host([density='compact'])) ul,
			:where(:host([density='compact'])) h1,
			:where(:host([density='compact'])) h2,
			:where(:host([density='compact'])) h3,
			:where(:host([density='compact'])) h4,
			:where(:host([density='compact'])) h5,
			:where(:host([density='compact'])) h6 {
				margin-block: var(--markdown-compact-block-spacing);
			}

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				line-height: 1.1;
			}

			code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}

			code code-icon {
				color: inherit;
				font-size: inherit;
				vertical-align: middle;
			}

			p:first-child,
			.code:first-child,
			ul:first-child {
				margin-top: 0;
			}

			p:last-child,
			.code:last-child,
			ul:last-child {
				margin-bottom: 0;
			}

			/* MarkupContent Layout */
			ul {
				padding-left: var(--markdown-list-spacing);
			}
			ol {
				padding-left: var(--markdown-list-spacing);
			}

			li > p {
				margin-bottom: 0;
			}

			li > ul {
				margin-top: 0;
			}
=		`],le([eB({type:String})],lt.prototype,"markdown",2),le([eB({type:String,reflect:!0})],lt.prototype,"density",2),le([eB({type:Boolean,reflect:!0})],lt.prototype,"inline",2),lt=le([eL("gl-markdown")],lt);let li={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},lr=e=>li[e];function lo(e,t){if(t){if(/[&<>"']/.test(e))return e.replace(/[&<>"']/g,lr)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(e))return e.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,lr);return e}let ls="[A-Za-z0-9-]+",ln="~[A-Za-z]+",la=RegExp(`^(${ls})(${ln})?$`),ll=RegExp(`\\$\\(${ls}(?:${ln})?\\)`,"g"),lc=RegExp(`\\\\${ll.source}`,"g"),lh=RegExp(`(\\\\)?\\$\\((${ls}(?:${ln})?)\\)`,"g");function ld(e){return e.replace(lc,e=>`\\${e}`)}function lp(e){let t,i=[],r=0,o=0;for(;null!==(t=lh.exec(e));){r<(o=t.index||0)&&i.push(e.substring(r,o)),r=(t.index||0)+t[0].length;let[,s,a]=t;i.push(s?`$(${a})`:function(e){let[,t,i]=la.exec(e.id)??[void 0,"error",void 0];return t.startsWith("gitlens-")&&(t=`gl-${t.substring(8)}`),`<code-icon icon="${t}"${i?` modifier="${i}"`:""}></code-icon>`}({id:a}))}return r<e.length&&i.push(e.substring(r)),i.join("")}let lu=/"/g;function lg(e){return e.replace(lu,"&quot;")}sR.define("sl-popup");var lf=Object.defineProperty,lm=Object.getOwnPropertyDescriptor,lb=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lm(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lf(t,i,s),s};let lv=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleTriggerBlur=e=>{this.open&&this.hasTrigger("focus")&&(e.relatedTarget&&this.contains(e.relatedTarget)||this.hide())},this.handleTriggerClick=e=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(e.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=()=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handlePopupBlur=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=e=>{let t=e.composedPath();t.includes(this)||t.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let e=im(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let e=im(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),e)}}}static closeOthers(e){for(let t of lv.openPopovers)t===e||t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINS||t.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),lv.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}render(){return e$`<sl-popup
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
		</sl-popup>`}async show(e){if(this.open||this.suppressed){"click"===e&&"hover"===this._triggeredBy&&(this._triggeredBy=e);return}return(null==this._triggeredBy||"hover"!==e)&&(this._triggeredBy=e),lv.closeOthers(this),this.open=!0,lv.openPopovers.add(this),ib(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,lv.openPopovers.delete(this),ib(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(e){return this.trigger.split(" ").includes(e)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};lv.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},lv.openPopovers=new Set,lv.styles=[r9,F`
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
		`],lb([eN("#popover")],lv.prototype,"body",2),lb([eN("sl-popup")],lv.prototype,"popup",2),lb([eB({reflect:!0})],lv.prototype,"placement",2),lb([eB({type:Object})],lv.prototype,"anchor",2),lb([eB({reflect:!0,type:Boolean})],lv.prototype,"disabled",2),lb([eB({type:Number})],lv.prototype,"distance",2),lb([eB({reflect:!0,type:Boolean})],lv.prototype,"open",2),lb([eB({reflect:!0,type:Boolean})],lv.prototype,"arrow",2),lb([eB({type:Number})],lv.prototype,"skidding",2),lb([eB()],lv.prototype,"trigger",2),lb([eB({type:Boolean})],lv.prototype,"hoist",2),lb([eB({reflect:!0})],lv.prototype,"appearance",2),lb([eF()],lv.prototype,"suppressed",2),lb([tX("open",{afterFirstUpdate:!0})],lv.prototype,"handleOpenChange",1),lb([tX(["distance","hoist","placement","skidding"])],lv.prototype,"handleOptionsChange",1),lb([tX("disabled")],lv.prototype,"handleDisabledChange",1),lv=lb([eL("gl-popover")],lv);let ly={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"};var lw=Object.defineProperty,l_=Object.getOwnPropertyDescriptor,lx=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?l_(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lw(t,i,s),s};let lk=class extends lit_element_i{get statusName(){return this.status?ly[this.status]??"Unknown":""}updated(e){super.updated(e),e.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(e,t,i,r,o,s){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${e}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${r}" />
				<text
					x="5"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${i}"
				>
					${t}
				</text>
				<text
					x="17"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${s}"
				>
					${o}
				</text>
			</svg>
		`}renderConflictUU(){let e="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(e,"±","#000",e,"±","#000")}renderConflictAA(){let e="var(--gl-git-status-added)";return this.renderConflictGlyphs(e,"+","#fff",e,"+","#fff")}renderConflictDD(){let e="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(e,"−","#fff",e,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return e$`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};lk.styles=[F`
			:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)),
			:host-context(.vscode-dark) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host-context(.vscode-high-contrast-light),
			:host-context(.vscode-light) {
				--gl-git-status-ignored: #969696;
				--gl-git-status-untracked: #6c6c6c;
				--gl-git-status-added: #388a34;
				--gl-git-status-deleted: #9e121d;
				--gl-git-status-modified: #1b80b2;
				--gl-git-status-renamed: #c63;
				--gl-git-status-copied: #692c77;
				--gl-git-status-conflict: #7f4e7e;
				--gl-git-status-unknown: #6c6c6c;
			}

			:host {
				--gl-icon-size: 1.6rem;

				display: inline-block;
				width: 16px;
				aspect-ratio: 1 / 1;
			}

			:host([conflict]) {
				--gl-icon-size: 2.2rem;
				margin-right: 0.4rem;

				width: 22px;
				aspect-ratio: auto;
			}

			svg {
				display: inline-block;
				vertical-align: text-bottom;
			}
		`],lx([eB()],lk.prototype,"status",2),lx([eF()],lk.prototype,"statusName",1),lk=lx([eL("gl-git-status")],lk),F`
		:host {
			display: block;
			height: 100%;
		}
	`;let l$=[r8,F`
		:host {
			--tree-connector-spacing: 0.6rem;
			--tree-connector-size: var(--gitlens-tree-indent, 1.6rem);
			box-sizing: border-box;
			padding-left: var(--gitlens-gutter-width);
			padding-right: 0.5rem;
			padding-top: 0.1rem;
			padding-bottom: 0.1rem;
			line-height: 2.2rem;
			height: 2.2rem;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: var(--vscode-font-size);
			color: var(--gitlens-tree-foreground, var(--vscode-foreground));

			cursor: pointer;
			/* Reduced containment to allow tooltips to escape */
			contain: layout;
		}

		:host([aria-hidden='true']) {
			display: none;
		}

		:host(:hover) {
			color: var(--vscode-list-hoverForeground);
			background-color: var(--vscode-list-hoverBackground);
			/* Raise above sibling items so action tooltips aren't painted behind the next row */
			z-index: 1;
		}

		:host([aria-selected='true']) {
			color: var(--vscode-list-inactiveSelectionForeground);
			background-color: var(--vscode-list-inactiveSelectionBackground);
		}

		/* Focused state - when the item is the active descendant in the tree */
		:host([focused]) {
			outline: 1px solid var(--vscode-list-focusOutline);
			outline-offset: -0.1rem;
			z-index: 1;
		}

		:host([aria-selected='true'][focused]) {
			color: var(--vscode-list-activeSelectionForeground);
			background-color: var(--vscode-list-activeSelectionBackground);
		}

		/* Inactive focus state - when the item would be focused but container doesn't have focus */
		/* In VS Code, inactive focus shows the selection background without the outline */
		:host([focused-inactive]) {
			color: var(--vscode-list-inactiveSelectionForeground);
			background-color: var(--vscode-list-inactiveSelectionBackground);
		}

		/* TODO: these should be :has(.input:focus) instead of :focus-within */
		:host(:focus-within) {
			outline: 1px solid var(--vscode-list-focusOutline);
			outline-offset: -0.1rem;
			z-index: 1;
		}

		:host([aria-selected='true']:focus-within) {
			color: var(--vscode-list-activeSelectionForeground);
			background-color: var(--vscode-list-activeSelectionBackground);
		}

		.item {
			appearance: none;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: 0.6rem;
			flex: 1;
			min-width: 0;
			padding: 0;
			font-family: inherit;
			font-size: inherit;
			text-decoration: none;
			color: inherit;
			background: none;
			border: none;
			outline: none;
			cursor: pointer;
		}
		.icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 2.2rem;
			pointer-events: none;
			flex: none;
		}

		slot[name='icon']::slotted(*) {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--gl-icon-size, 1.6rem);
			height: 1.6rem;
			vertical-align: middle;
		}

		.node {
			display: inline-block;
			width: var(--tree-connector-size);
			text-align: center;
			flex: none;
			height: 2.2rem;
			line-height: 2.2rem;
			pointer-events: none;
			vertical-align: text-bottom;
		}

		.node:last-of-type {
			margin-right: 0.3rem;
		}

		.node--connector {
			position: relative;
		}

		.node--connector::before {
			content: '';
			position: absolute;
			height: 2.2rem;
			border-left: 1px solid transparent;
			top: 50%;
			transform: translate(-1px, -50%);
			left: 0.8rem;
			width: 0.1rem;
			transition: border-color 0.1s linear;
			opacity: 0.4;
		}

		@media (prefers-reduced-motion: reduce) {
			.node--connector::before {
				transition: none;
			}
		}

		:host-context([guides='always']) .node--connector::before,
		:host-context([guides='onHover']:focus-within) .node--connector::before,
		:host-context([guides='onHover'][focused]) .node--connector::before,
		:host-context([guides='onHover'][focused-inactive]) .node--connector::before,
		:host-context([guides='onHover']:hover) .node--connector::before {
			border-color: var(--vscode-tree-indentGuidesStroke);
		}

		.branch {
			display: inline-block;
			margin-right: 0.6rem;
			height: 2.2rem;
			line-height: 2.2rem;
			vertical-align: text-bottom;
		}

		.text {
			line-height: 1.8rem;
			overflow: hidden;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;
			flex: 1;
		}

		.main {
			display: inline;
		}

		.description {
			display: inline;
			opacity: 0.7;
			font-size: 0.9em;
			margin-left: 0.3rem;
			pointer-events: none;
		}

		.actions {
			flex: none;
			user-select: none;
			color: var(--vscode-icon-foreground);
			margin-left: 0.4rem;
		}

		:host(:focus-within) .actions,
		:host([focused]) .actions {
			color: var(--vscode-list-activeSelectionIconForeground);
		}

		:host([focused-inactive]) .actions {
			color: var(--vscode-list-inactiveSelectionIconForeground, var(--vscode-icon-foreground));
		}

		:host(:not(:hover):not(:focus-within):not([focused]):not([focused-inactive])) .actions {
			display: none;
		}

		.checkbox {
			position: relative;
			display: inline-flex;
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			text-align: center;
			color: var(--vscode-checkbox-foreground);
			background: var(--vscode-checkbox-background);
			border: 1px solid var(--vscode-checkbox-border);
			border-radius: 0.3rem;
			margin-right: 0.6rem;
		}

		.checkbox:has(:checked) {
			color: var(--vscode-inputOption-activeForeground);
			border-color: var(--vscode-inputOption-activeBorder);
			background-color: var(--vscode-inputOption-activeBackground);
		}

		.checkbox:has(:disabled) {
			opacity: 0.4;
		}

		.checkbox__input {
			position: absolute;
			top: 0;
			left: 0;
			appearance: none;
			width: 1.4rem;
			aspect-ratio: 1 / 1;
			margin: 0;
			cursor: pointer;
			border-radius: 0.3rem;
		}

		.checkbox__input:disabled {
			cursor: default;
		}

		.checkbox__check {
			width: 1.6rem;
			aspect-ratio: 1 / 1;
			opacity: 0;
			transition: opacity 0.1s linear;
			color: var(--vscode-checkbox-foreground);
			pointer-events: none;
		}

		.checkbox__input:checked + .checkbox__check {
			opacity: 1;
		}

		slot[name='decorations-before'],
		slot[name='decorations-after'] {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			flex: none;
			white-space: nowrap;
			margin-left: 0.4rem;
			--gl-pill-border: color-mix(in srgb, transparent 80%, var(--color-foreground));
		}

		::slotted([slot='decorations-before'].decoration-text) {
			font-size: var(--gl-decoration-before-font-size, inherit);
			opacity: var(--gl-decoration-before-opacity, 1);
		}

		/* High Contrast Mode Support */
		@media (forced-colors: active) {
			:host {
				forced-color-adjust: none;
			}

			:host([focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			:host([aria-selected='true']) {
				background-color: Highlight;
				color: HighlightText;
			}

			:host([aria-selected='true'][focused]) {
				outline: 2px solid CanvasText;
				outline-offset: -2px;
			}

			.checkbox {
				border: 1px solid CanvasText;
			}

			.checkbox:has(:checked) {
				background-color: Highlight;
				border-color: CanvasText;
			}

			.node--connector::before {
				border-color: CanvasText;
				opacity: 1;
			}

			slot[name='decorations-after'] span {
				color: CanvasText !important;
			}
		}
	`];var lC=Object.defineProperty,lS=Object.getOwnPropertyDescriptor,lP=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lS(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lC(t,i,s),s};let lA=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.disableCheck=!1,this.showIcon=!0,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.focusedInactive=!1,this.onComponentClick=e=>{this.selectCore({dblClick:!1,altKey:e.altKey})}}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick)}updateAttrs(e,t=!1){(e.has("expanded")||e.has("branch")||t)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(e.has("parentExpanded")||t)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(e.has("selected")||t)&&this.setAttribute("aria-selected",this.selected.toString()),(e.has("size")||t)&&this.setAttribute("aria-setsize",this.size.toString()),(e.has("position")||t)&&this.setAttribute("aria-posinset",this.position.toString()),(e.has("level")||t)&&this.setAttribute("aria-level",this.level.toString())}firstUpdated(){this.role="treeitem"}updated(e){this.updateAttrs(e)}renderBranching(){let e=this.level-1;if(e<1&&!this.branch)return eP;let t=[];if(e>0)for(let i=0;i<e;i++)t.push(e$`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&t.push(e$`<code-icon class="branch" icon="${this.expanded?"chevron-down":"chevron-right"}"></code-icon>`),t}renderCheckbox(){return this.checkable?e$`<span class="checkbox"
			><input
				class="checkbox__input"
				id="checkbox"
				type="checkbox"
				.checked=${this.checked}
				?disabled=${this.disableCheck}
				@change=${this.onCheckboxChange}
				@click=${this.onCheckboxClick} /><code-icon icon="check" size="14" class="checkbox__check"></code-icon
		></span>`:eP}renderActions(){return e$`<action-nav class="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return e$`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return e$`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return e$`
			${this.renderBranching()}${this.renderCheckbox()}
			<button
				id="button"
				class="item"
				type="button"
				tabindex=${this.tabIndex}
				@click=${this.onButtonClick}
				@dblclick=${this.onButtonDblClick}
				@contextmenu=${this.onButtonContextMenu}
			>
				${eq(this.showIcon,()=>e$`<slot name="icon" class="icon"></slot>`)}
				<span class="text">
					<slot class="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(e,t=!1){this.emit("gl-tree-item-select"),this.selected=!0,t||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:e?.dblClick??!1,altKey:e?.altKey??!1,ctrlKey:e?.ctrlKey??!1,metaKey:e?.metaKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}onButtonClick(e){e.stopPropagation(),this.selectCore({dblClick:!1,altKey:e.altKey})}onButtonDblClick(e){e.stopPropagation(),this.selectCore({dblClick:!0,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}onButtonContextMenu(e){e.preventDefault(),e.stopPropagation();let t=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(t)}onCheckboxClick(e){e.stopPropagation()}onCheckboxChange(e){e.preventDefault(),e.stopPropagation(),this.checked=e.target.checked,this.emit("gl-tree-item-checked",{node:this,checked:this.checked})}};lA.styles=l$,lP([eB({type:Boolean})],lA.prototype,"branch",2),lP([eB({type:Boolean})],lA.prototype,"expanded",2),lP([eB({type:String})],lA.prototype,"path",2),lP([eB({type:String,attribute:"parent-path"})],lA.prototype,"parentPath",2),lP([eB({type:Boolean,attribute:"parent-expanded"})],lA.prototype,"parentExpanded",2),lP([eB({type:Number})],lA.prototype,"level",2),lP([eB({type:Number})],lA.prototype,"size",2),lP([eB({type:Number})],lA.prototype,"position",2),lP([eB({type:Boolean})],lA.prototype,"checkable",2),lP([eB({type:Boolean})],lA.prototype,"checked",2),lP([eB({type:Boolean})],lA.prototype,"disableCheck",2),lP([eB({type:Boolean})],lA.prototype,"showIcon",2),lP([eB({type:Boolean,reflect:!0})],lA.prototype,"matched",2),lP([eB({type:Number})],lA.prototype,"tabIndex",2),lP([eB({type:String,attribute:"vscode-context"})],lA.prototype,"vscodeContext",2),lP([eF()],lA.prototype,"selected",2),lP([eB({type:Boolean,reflect:!0})],lA.prototype,"focused",2),lP([eB({type:Boolean,reflect:!0,attribute:"focused-inactive"})],lA.prototype,"focusedInactive",2),lP([eN("#button")],lA.prototype,"buttonEl",2),lA=lP([eL("gl-tree-item")],lA);var lE=Object.defineProperty,lT=Object.getOwnPropertyDescriptor,lR=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lT(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lE(t,i,s),s};let lI=/^[a-zA-Z0-9\s\-_.]$/,lM=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this._virtualizerKey=0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.filterMode="filter",this.tooltipAnchorRight=!1,this._filterText="",this._filterLower="",this._filterTerms=[],this.ariaLabel="Tree",this._focusedItemIndex=-1,this.virtualizerRef=nC(),this.scrollableRef=nC(),this._containerHasFocus=!1,this._actionButtonHasFocus=!1,this._scrolling=!1,this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this._pathToIndexMap=new Map,this.handleContainerFocus=()=>{this._containerHasFocus=!0,this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0),this.requestUpdate())},this.handleContainerBlur=()=>{this._containerHasFocus=!1},this.handleFocusIn=e=>{let t=e.target;("ACTION-ITEM"===t.tagName?t:t.closest("action-item"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=e=>{let t=e.target,i=e.relatedTarget,r="ACTION-ITEM"===t.tagName?t:t.closest("action-item"),o=i?.tagName==="ACTION-ITEM"?i:i?.closest("action-item");r&&!o&&(this._actionButtonHasFocus=!1)},this.handleContextMenu=e=>{let t=e.composedPath().find(e=>"GL-TREE-ITEM"===e.tagName);if(!t)return;let i=t.vscodeContext;if(!i)return;e.preventDefault(),e.stopPropagation(),this.dataset.vscodeContext=i;let r=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:e.clientX,clientY:e.clientY,button:e.button,buttons:e.buttons,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey});this.dispatchEvent(r),setTimeout(()=>{delete this.dataset.vscodeContext},100)},this.handleKeydown=e=>{if("Tab"===e.key&&e.composedPath().find(e=>"ACTION-ITEM"===e.tagName))if(e.shiftKey){e.preventDefault();let t=this.scrollableRef.value;t&&t.focus()}else{e.preventDefault();let t=document.activeElement;setTimeout(()=>{t&&"function"==typeof t.blur&&t.blur()},0)}},this.handleContainerKeydown=e=>{if(!this.treeItems?.length||this._actionButtonHasFocus)return;if("Tab"===e.key&&!e.shiftKey){if(this._focusedItemPath){let t=this.virtualizerRef.value;if(t){let i=[...t.querySelectorAll("gl-tree-item")].find(e=>e.id===`tree-item-${this._focusedItemPath}`);if(i){let t=i.querySelector("action-item");t&&(e.preventDefault(),e.stopPropagation(),t.focus())}}}return}let t=this.getCurrentFocusedIndex(),i=t,r=!1;switch(e.key){case"Enter":case" ":e.preventDefault(),e.stopPropagation(),this.handleItemActivation(this.treeItems[t]);return;case"ArrowDown":i=Math.min(t+1,this.treeItems.length-1),r=!0;break;case"ArrowUp":i=Math.max(t-1,0),r=!0;break;case"Home":i=0,r=!0;break;case"End":i=this.treeItems.length-1,r=!0;break;case"ArrowLeft":case"ArrowRight":if(this.handleBranchToggle(e,this.treeItems[t]))return;if("ArrowRight"===e.key)i=Math.min(t+1,this.treeItems.length-1);else{let e=this.treeItems[t];if(e.parentPath){let r=this.getItemIndex(e.parentPath);i=-1!==r?r:Math.max(t-1,0)}else i=Math.max(t-1,0)}r=!0;break;default:if(this.isPrintableCharacter(e.key)){e.preventDefault(),e.stopPropagation(),this.handleTypeAhead(e.key);return}}r&&(e.preventDefault(),e.stopPropagation(),this.focusItemAtIndex(i))},this.handleFilterInput=e=>{this._filterText=e.target.value,this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:this._filterText,bubbles:!0,composed:!0})),clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=setTimeout(()=>this.applyFilterToModel(),150)},this.toggleFilterMode=()=>{this.filterMode="filter"===this.filterMode?"highlight":"filter",this.dispatchEvent(new CustomEvent("gl-tree-filter-mode-changed",{detail:this.filterMode,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filterText}set filterText(e){let t=this._filterText;t!==e&&(this._filterText=e,clearTimeout(this._filterDebounceTimer),this.applyFilterToModel(),this.requestUpdate("filterText",t))}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("contextmenu",this.handleContextMenu)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("contextmenu",this.handleContextMenu),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),clearTimeout(this._filterDebounceTimer),this._typeAheadBuffer=""}set model(e){let t;if(this._model!==e){if(this._model=e,this._filterTerms.length>0&&null!=this._model&&lO(this._model,this._filterTerms),this._nodeMap.clear(),this._virtualizerKey++,null!=this._model){let e=this._model.length,i=this.filtered&&"filter"===this.filterMode;t=[];for(let r=0;r<e;r++)lz(this._model[r],e,r+1,void 0,this._nodeMap,i,t)}this.treeItems=t,this.buildPathToIndexMap(),this.treeItems?.length&&!this._focusedItemPath&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)}}get model(){return this._model}renderIcon(e){return null==e?eP:"string"==typeof e?e$`<code-icon slot="icon" icon=${e}></code-icon>`:"status"===e.type?e$`<gl-git-status slot="icon" .status=${e.name}></gl-git-status>`:"branch"===e.type?e$`<gl-branch-icon
				slot="icon"
				.status=${e.status}
				.worktree=${e.worktree??!1}
				.hasChanges=${e.hasChanges??!1}
			></gl-branch-icon>`:eP}renderActions(e){let t=e.actions;return null==t||0===t.length?eP:t.map(t=>e$`<action-item
				slot="actions"
				.icon=${t.icon}
				.label=${t.label}
				.altIcon=${t.altIcon}
				.altLabel=${t.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${i=>this.onTreeItemActionClicked(i,e,t,!1)}
				@dblclick=${i=>this.onTreeItemActionClicked(i,e,t,!0)}
			></action-item>`)}renderDecorations(e){let t=e.decorations;return null==t||0===t.length?eP:t.map(e=>{let t="before"===e.position?"decorations-before":"decorations-after";return"icon"===e.type?e$`<code-icon
					slot=${t}
					part=${t}
					aria-label="${e.label}"
					.icon=${e.icon}
				></code-icon>`:"text"===e.type?e$`<span
					slot=${t}
					part=${t}
					class="decoration-text"
					aria-label=${e.tooltip??e.label??eP}
					style=${e.color?nT({color:e.color}):eP}
					>${e.label}</span
				>`:"tracking"===e.type?e$`<gl-tracking-pill
					slot=${t}
					part=${t}
					.ahead=${e.ahead}
					.behind=${e.behind}
					colorized
					outlined
					?missingUpstream=${e.missingUpstream??!1}
				></gl-tracking-pill>`:"conflict"===e.type?e$`<span
					slot=${t}
					part=${t}
					class="conflict-count"
					aria-label=${e.tooltip??e.label??eP}
					style=${e.color?nT({color:e.color,"border-color":`color-mix(in srgb, transparent 60%, ${e.color})`}):eP}
					><code-icon icon="warning" size="12"></code-icon>${e.count}</span
				>`:void 0})}highlightText(e){if(!this.filtered||0===this._filterTerms.length)return e;let t=e.toLowerCase(),i=new Set;for(let e of this._filterTerms){let r=t.indexOf(e);if(-1!==r){for(let t=r;t<r+e.length;t++)i.add(t);continue}let o=lL(t,e);if(null!=o)for(let e of o)i.add(e)}return 0===i.size?e:function(e,t){let i=[],r=0,o=0;for(;o<t.length;){let s=o;for(;s+1<t.length&&t[s+1]===t[s]+1;)s++;let a=t[o],c=t[s]+1;a>r&&i.push(e.substring(r,a)),i.push(e$`<mark>${e.substring(a,c)}</mark>`),r=c,o=s+1}return r<e.length&&i.push(e.substring(r)),i}(e,[...i].sort((e,t)=>e-t))}renderTreeItem(e){let t=this._lastSelectedPath===e.path,i=this._focusedItemPath===e.path,r=`tree-item-${e.path}`;return e$`<gl-tree-item
			id=${r}
			.branch=${e.branch}
			.expanded=${e.expanded}
			.path=${e.path}
			.parentPath=${e.parentPath}
			.parentExpanded=${e.parentExpanded}
			.level=${e.level}
			.size=${e.size}
			.position=${e.position}
			.checkable=${e.checkable}
			.checked=${e.checked??!1}
			.disableCheck=${e.disableCheck??!1}
			.showIcon=${null!=e.icon}
			.matched=${e.matched??!1}
			.selected=${t}
			.focused=${i&&this._containerHasFocus&&!this._actionButtonHasFocus}
			.focusedInactive=${i&&(!this._containerHasFocus||this._actionButtonHasFocus)}
			.tabIndex=${-1}
			.vscodeContext=${e.contextData}
			@gl-tree-item-select=${()=>this.onBeforeTreeItemSelected(e)}
			@gl-tree-item-selected=${t=>this.onTreeItemSelected(t,e)}
			@gl-tree-item-checked=${t=>this.onTreeItemChecked(t,e)}
			@mouseenter=${t=>this.onTreeItemHover(t.currentTarget,e)}
			@mouseleave=${()=>this.onTreeItemUnhover()}
		>
			${this.renderIcon(e.icon)}
			${this.highlightText(e.label)}${eq(null!=e.description,()=>e$`<span slot="description">${this.highlightText(e.description)}</span>`)}
			${this.renderActions(e)} ${this.renderDecorations(e)}
		</gl-tree-item>`}renderFilterBar(){return this.filterable?e$`<div class="filter">
			<div class="filter-field">
				<input
					class="filter-input"
					type="text"
					placeholder="${this.filterPlaceholder}"
					.value=${this._filterText}
					@input=${this.handleFilterInput}
				/>
				<div class="filter-controls">
					<gl-button
						appearance="input"
						role="checkbox"
						aria-checked=${"filter"===this.filterMode?"true":"false"}
						tooltip=${"filter"===this.filterMode?"Filter Results":"Highlight Results"}
						aria-label=${"filter"===this.filterMode?"Filter Results":"Highlight Results"}
						@click=${this.toggleFilterMode}
					>
						<code-icon icon="list-filter"></code-icon>
					</gl-button>
				</div>
			</div>
		</div>`:eP}render(){let e=!!this.treeItems?.length,t=!e&&this._filterText&&this._model?.length;if(!e&&!t)return eP;let i=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return e$`
			${this.renderFilterBar()}
			${t?e$`<div class="no-results">No results found</div>`:e$`<div
							${nP(this.scrollableRef)}
							class="scrollable"
							tabindex="0"
							role="tree"
							aria-label=${this.ariaLabel}
							aria-multiselectable="false"
							aria-activedescendant=${i||eP}
							@keydown=${this.handleContainerKeydown}
							@focus=${this.handleContainerFocus}
							@blur=${this.handleContainerBlur}
						>
							${n$(this._virtualizerKey,e$`<lit-virtualizer
									class="scrollable"
									${nP(this.virtualizerRef)}
									.items=${this.treeItems}
									.keyFunction=${e=>e.path}
									.layout=${(0,nk.flow)({direction:"vertical"})}
									.renderItem=${e=>this.renderTreeItem(e)}
									scroller
								></lit-virtualizer>`)}
						</div>
						${this._hoverOpen&&this._hoveredTooltip?e$`<gl-popover
									?open=${this._hoverOpen}
									.anchor=${this._hoveredAnchor}
									.placement=${this.tooltipAnchorRight?"right-start":"bottom"}
									trigger="manual"
									hoist
									.distance=${4}
									@mouseenter=${()=>clearTimeout(this._unhoverTimer)}
									@mouseleave=${()=>this.onTreeItemUnhover()}
								>
									<div slot="content" class="hover-content">
										<gl-markdown
											density="compact"
											.markdown=${this._hoveredTooltip??""}
										></gl-markdown>
									</div>
								</gl-popover>`:eP}`}
		`}findTreeNode(e){return this._nodeMap.get(e)}getItemIndex(e){return this._pathToIndexMap.get(e)??-1}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let e=this.filtered&&"filter"===this.filterMode,t=this._model.length,i=[];for(let r=0;r<t;r++)lz(this._model[r],t,r+1,void 0,this._nodeMap,e,i);this.treeItems=i,this.buildPathToIndexMap()}onBeforeTreeItemSelected(e){if(this._lastSelectedPath!==e.path&&(this._lastSelectedPath=e.path),this._focusedItemPath!==e.path&&(this._focusedItemPath=e.path,this._focusedItemIndex=this.getItemIndex(e.path)),e.branch){let t=this.findTreeNode(e.path);t&&(t.expanded=!t.expanded,this.rebuildFlattenedTree())}this.requestUpdate()}onTreeItemSelected(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-selected",{...e.detail,node:t,context:t.context})}onTreeItemChecked(e,t){e.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...e.detail,node:t,context:t.context})}onTreeItemHover(e,t){if(!t.tooltip)return void this.onTreeItemUnhover();if(clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this.tooltipAnchorRight){let t=this.getBoundingClientRect(),i=e.getBoundingClientRect();this._hoveredAnchor={getBoundingClientRect:()=>({x:t.right,y:i.top,top:i.top,bottom:i.bottom,left:t.right,right:t.right,width:0,height:i.height})}}else this._hoveredAnchor=e;this._hoveredTooltip=t.tooltip,this._hoverOpen||(this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500))}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(e,t,i,r=!1){e.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:t,context:t.context,action:i,dblClick:r,altKey:e.altKey,ctrlKey:e.ctrlKey,metaKey:e.metaKey})}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let e=this.getItemIndex(this._focusedItemPath);if(-1!==e)return e}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let e=this.getItemIndex(this._lastSelectedPath);if(-1!==e)return e}return 0}handleItemActivation(e){e&&(this.onBeforeTreeItemSelected(e),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),e))}handleBranchToggle(e,t){if(!t?.branch)return!1;let i="ArrowRight"===e.key,r="ArrowLeft"===e.key;if(i&&t.expanded||r&&!t.expanded)return!1;e.preventDefault(),e.stopPropagation();let o=this.findTreeNode(t.path);return!!o&&(o.expanded=!o.expanded,this.rebuildFlattenedTree(),this.requestUpdate(),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),t),!0)}focusItemAtIndex(e){let t=this.treeItems?.[e];t&&(this._focusedItemPath=t.path,this._focusedItemIndex=e,this._lastSelectedPath!==t.path&&(this._lastSelectedPath=t.path),this.requestUpdate(),this.scrollToItem(e))}scrollToItem(e){this._scrolling||(this._scrolling=!0,this.updateComplete.then(()=>{let t=this.virtualizerRef.value,i=this.scrollableRef.value;if(!t||!i){this._scrolling=!1;return}let r=()=>{i&&document.activeElement!==i&&i.focus(),this._scrolling=!1},o=0===e,s=e===(this.treeItems?.length??0)-1;o||s?requestAnimationFrame(()=>{o?i.scrollTop=0:i.scrollTop=i.scrollHeight,requestAnimationFrame(r)}):requestAnimationFrame(()=>{let i=t.scrollToIndex(e,"nearest");i&&"function"==typeof i.then?i.then(r):requestAnimationFrame(r)})}))}handleTypeAhead(e){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let t=!this._typeAheadBuffer;this._typeAheadBuffer+=e.toLowerCase();let i=this.treeItems?.[this._focusedItemIndex],r=i?.label?.toLowerCase().startsWith(this._typeAheadBuffer),o=!1;if(t?o=!0:r||(o=!0),o){let e=this.findNextMatchingItem(this._typeAheadBuffer);-1!==e&&this.focusItemAtIndex(e)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){if(this._pathToIndexMap.clear(),!this.treeItems)return;let e=0;for(let t of this.treeItems)this._pathToIndexMap.set(t.path,e++)}findNextMatchingItem(e){if(!this.treeItems?.length||!e)return -1;let t=e.toLowerCase(),i=this._focusedItemIndex,r=this.treeItems.length;for(let e=1;e<r;e++){let o=(i+e)%r;if(this.treeItems[o].label?.toLowerCase().startsWith(t))return o}return -1}isPrintableCharacter(e){return 1===e.length&&lI.test(e)}applyFilterToModel(){this._filterLower=this._filterText.toLowerCase().trim(),this._filterTerms=this._filterLower.split(/\s+/).filter(e=>e.length>0),0===this._filterTerms.length?(this.filtered=!1,null!=this._model&&function e(t){for(let i of t)i.matched=!1,null!=i.children&&e(i.children)}(this._model)):(this.filtered=!0,null!=this._model&&lO(this._model,this._filterTerms)),this.rebuildFlattenedTree()}};function lz(e,t,i,r,o,s,a){if(s&&!1===e.matched)return a??[];let c=a??[];if(o?.set(e.path,e),c.push({...e,size:t,position:i,parentPath:r}),!1!==e.expanded&&null!=e.children&&e.children.length>0){let t=e.children.length;for(let i=0;i<t;i++)lz(e.children[i],t,i+1,e.path,o,s,c)}return c}function lO(e,t){let i=!1;for(let r of e){let e=(r.label??"").toLowerCase(),o=r.filterText?.toLowerCase(),s=r.description?.toLowerCase(),a=t.every(t=>o?.includes(t)||e.includes(t)||null!=lL(e,t)||s?.includes(t)),c=!1;null!=r.children&&r.children.length>0&&(c=lO(r.children,t)),r.matched=a||c,r.matched&&(i=!0),r.branch&&c&&(r.expanded=!0)}return i}function lL(e,t){let i=[],r=0;for(let o=0;o<e.length&&r<t.length;o++)e[o]===t[r]&&(i.push(o),r++);return r===t.length?i:void 0}lM.styles=[r9,F`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100%;
				overflow: hidden;
			}

			.scrollable {
				flex: 1;
				width: 100%;
				min-height: 0;
				overflow-y: auto;
				overflow-x: visible; /* Allow horizontal overflow for tooltips */
				outline: none;
			}

			.scrollable:focus-within {
				outline: none;
			}

			lit-virtualizer {
				display: block;
				width: 100%;
				height: 100%;
				/* Use layout containment instead of strict to avoid rendering issues */
				/* Removed paint containment to allow tooltips to escape */
				contain: layout;
				/* lit-virtualizer sets an inline min-height based on its initial item-size
				   estimate, which can exceed the scrollable container in small viewports and
				   push scrolling onto the outer .scrollable div instead of the virtualizer's
				   own scroller. Since height: 100% already provides correct sizing from the
				   flex layout, the min-height is always redundant. */
				min-height: 0 !important;
			}

			gl-tree-item {
				width: 100%;
			}

			/* Dim non-matched items when highlighting */
			:host([filtered]:not([filter-mode='filter'])) gl-tree-item:not([matched]) {
				opacity: 0.6;
			}

			.filter {
				padding: 0.4rem 0.6rem;
				flex: none;
			}

			.filter-field {
				position: relative;
			}

			.filter-input {
				width: 100%;
				height: 2.4rem;
				box-sizing: border-box;
				padding: 0 2rem 0 0.6rem;
				font-family: var(--vscode-font-family);
				font-size: var(--vscode-font-size);
				color: var(--vscode-input-foreground);
				background-color: var(--vscode-input-background);
				border: 1px solid var(--vscode-input-border, transparent);
				border-radius: 2px;
				outline: none;
			}

			.filter-input:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.filter-input::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.filter-controls {
				position: absolute;
				top: 1px;
				right: 0;
				bottom: 1px;
				display: inline-flex;
				align-items: center;
				gap: 0.1rem;
				padding-right: 0.2rem;
			}

			.filter-controls gl-button {
				--button-line-height: 1;
				--button-input-height: 2rem;
			}

			mark {
				background-color: var(--vscode-editor-findMatchHighlightBackground, rgba(234, 92, 0, 0.33));
				color: inherit;
				border-radius: 1px;
			}

			.no-results {
				padding: 1rem;
				color: var(--vscode-descriptionForeground);
				font-style: italic;
				text-align: center;
			}

			.hover-content {
				font-size: 1.2rem;
				line-height: 1.5;
				max-width: min(92vw, 35rem);
				--code-icon-size: 1em;
			}

			.conflict-count {
				display: inline-flex;
				align-items: center;
				gap: 0.3rem;
				padding: 0 0.6rem;
				height: 1.8rem;
				border-radius: 0.9rem;
				font-size: 1.1rem;
				font-weight: 500;
				border: 1px solid;
			}
		`],lR([eF()],lM.prototype,"treeItems",2),lR([eF()],lM.prototype,"_virtualizerKey",2),lR([eB({reflect:!0})],lM.prototype,"guides",2),lR([eB({type:Boolean,reflect:!0})],lM.prototype,"filtered",2),lR([eB({type:Boolean,reflect:!0})],lM.prototype,"filterable",2),lR([eB({type:String,attribute:"filter-placeholder"})],lM.prototype,"filterPlaceholder",2),lR([eB({type:String,attribute:"filter-mode",reflect:!0})],lM.prototype,"filterMode",2),lR([eB({type:Boolean,attribute:"tooltip-anchor-right"})],lM.prototype,"tooltipAnchorRight",2),lR([eB({type:String,attribute:"filter-text"})],lM.prototype,"filterText",1),lR([eB({type:String,attribute:"aria-label"})],lM.prototype,"ariaLabel",2),lR([eF()],lM.prototype,"_containerHasFocus",2),lR([eF()],lM.prototype,"_actionButtonHasFocus",2),lR([eF()],lM.prototype,"_hoveredTooltip",2),lR([eF()],lM.prototype,"_hoveredAnchor",2),lR([eF()],lM.prototype,"_hoverOpen",2),lR([eB({type:Array,attribute:!1})],lM.prototype,"model",1),lM=lR([eL("gl-tree-generator")],lM);var lD=Object.defineProperty,lB=Object.getOwnPropertyDescriptor,lF=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lD(t,i,s),s};let GlDetailsBase=class GlDetailsBase extends lit_element_i{constructor(){super(...arguments),this.tab="commit",this.isUncommitted=!1,this._filterMode="mixed",this.emptyText="No Files"}get fileLayout(){return this.preferences?.files?.layout??"auto"}get isCompact(){return this.preferences?.files?.compact??!0}get indentGuides(){return this.preferences?.indentGuides??"none"}get filesChangedPaneLabel(){let e=this.files?.length??0,t=e>0?eY("file",e):"Files";return`${t} changed`}renderFilterAction(){let e,t,i;if(null==this.searchContext)return eP;let r=this.searchContext.matchedFiles?.length??0,o=this.files?.length??0;switch(this._filterMode){case"off":e="filter",t=`Search matched ${r} of ${o} files
Click to highlight matching files`;break;case"mixed":e="filter-filled",t=`Search matched ${r} of ${o} files
Click to show only matching files`,i="filter-mode-mixed";break;case"matched":e="filter-filled",t=`Showing ${r} of ${o} files
Click to show all files`}return e$`<action-item
			data-action="filter-mode"
			class="${i??""}"
			label="${t}"
			icon="${e}"
			@click="${this.onToggleFilter}"
		></action-item>`}onToggleFilter(e){switch(e.preventDefault(),e.stopPropagation(),this._filterMode){case"off":this._filterMode="mixed";break;case"mixed":this._filterMode="matched";break;case"matched":this._filterMode="off"}}renderLayoutAction(){let e="tree",t="list-tree",i="View as Tree";switch(this.fileLayout){case"auto":e="list",t="gl-list-auto",i="View as List";break;case"list":e="tree",t="list-flat",i="View as Tree";break;case"tree":e="auto",t="list-tree",i="View as Auto"}return e$`<action-item
			data-action="files-layout"
			data-files-layout="${e}"
			label="${i}"
			icon="${t}"
		></action-item>`}renderChangedFiles(e,t){let i=this.files?.length??0,r=this.isTree(i),o=this.createTreeModel(e,this.files??[],r,this.isCompact);return e$`
			<webview-pane collapsable expanded flexible>
				<span slot="title">${this.filesChangedPaneLabel}</span>
				<span slot="subtitle" data-region="stats" style="opacity: 1">${t}</span>
				<action-nav slot="actions"> ${this.renderFilterAction()} ${this.renderLayoutAction()} </action-nav>
				${this.renderChangedFilesActions()}${this.renderTreeFileModel(o)}
			</webview-pane>
		`}renderChangedFilesActions(){}onShareWipChanges(e,t,i){if(!i)return;let r=new CustomEvent("share-wip",{detail:{checked:t}});this.dispatchEvent(r)}createRenderRoot(){return this}isTree(e){return"auto"===this.fileLayout?e>(this.preferences?.files?.threshold??5):"tree"===this.fileLayout}createTreeModel(e,t,i=!1,r=!0){if(!this.isUncommitted)return this.createFileTreeModel(e,t,i,r);let o=[],s=[],a=[];for(let e of t)e.staged?s.push(e):a.push(e);return s.length||a.length?(s.length&&o.push({label:"Staged Changes",path:"/:staged:/",level:1,branch:!0,checkable:!1,expanded:!0,checked:!1,context:["staged"],children:this.createFileTreeModel(e,s,i,r,{level:2}),actions:this.getStagedActions()}),a.length&&o.push({label:"Unstaged Changes",path:"/:unstaged:/",level:1,branch:!0,checkable:!1,expanded:!0,checked:!1,context:["unstaged"],children:this.createFileTreeModel(e,a,i,r,{level:2}),actions:this.getUnstagedActions()})):o.push(...this.createFileTreeModel(e,t,i,r)),o}sortChildren(e){return e.sort((e,t)=>e.branch&&!t.branch?-1:!e.branch&&t.branch?1:e.label<t.label?-1:+(e.label>t.label)),e}createFileTreeModel(e,t,i=!1,r=!0,o={level:1}){void 0===o.level&&(o.level=1);let s=t;if("matched"===this._filterMode&&this.searchContext?.matchedFiles!=null){let e=new Set(this.searchContext.matchedFiles.map(e=>e.path));s=t.filter(t=>e.has(t.path))}if(!s.length)return[{label:"matched"===this._filterMode&&null!=this.searchContext?"No matching files":"No changes",path:"",level:o.level,branch:!1,checkable:!1,expanded:!0,checked:!1}];let a=[];if(i){let e=ni(s,e=>e.path.split("/"),(...e)=>e.join("/"),r);if(null!=e.children)for(let t of e.children.values()){let e=this.walkFileTree(t,{level:o.level});a.push(e)}}else for(let e of s){let t=this.fileToTreeModel(e,{level:o.level,branch:!1},!0);a.push(t)}return this.sortChildren(a),a}walkFileTree(e,t={level:1}){let i;if(void 0===t.level&&(t.level=1),i=null==e.value?this.folderToTreeModel(e.name,e.relativePath,t):this.fileToTreeModel(e.value,t),null!=e.children){let r=[];for(let i of e.children.values()){let e=this.walkFileTree(i,{...t,level:t.level+1});r.push(e)}r.length>0&&(this.sortChildren(r),i.branch=!0,i.children=r,r.some(e=>e.matched)&&(i.matched=!0))}return i}getStagedActions(e){return"wip"===this.tab?[{icon:"gl-cloud-patch-share",label:"Share Staged Changes",action:"staged-create-patch"}]:[]}getUnstagedActions(e){return"wip"===this.tab?[{icon:"gl-cloud-patch-share",label:"Share Unstaged Changes",action:"unstaged-create-patch"}]:[]}getFileActions(e,t){return[]}getFileContextData(e){}fileToTreeModel(e,t,i=!1,r="/"){let o=e.path.lastIndexOf(r),s=-1!==o?e.path.substring(o+1):e.path,a=i&&-1!==o?e.path.substring(0,o):"",c=this.searchContext?.matchedFiles?.find(t=>t.path===e.path)!=null;return{branch:!1,expanded:!0,path:e.path,level:1,checkable:!1,checked:!1,icon:{type:"status",name:e.status},label:s,description:`${!0===i?a:""}${"R"===e.status?` \u2190 ${e.originalPath}`:""}`,context:[e],actions:this.getFileActions(e,t),contextData:this.getFileContextData(e),matched:c,...t}}folderToTreeModel(e,t,i){return{branch:!1,expanded:!0,path:t,level:1,checkable:!1,checked:!1,icon:"folder",label:e,...i}}renderTreeFileModel(e){return e$`<gl-tree-generator
			.model=${e}
			.guides=${this.indentGuides}
			.filtered=${null!=this.searchContext&&"off"!==this._filterMode}
			filterable
			filter-placeholder="Filter files..."
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-generator>`}onTreeItemActionClicked(e){if(e.detail.context&&e.detail.action)switch(e.detail.action.action){case"staged-create-patch":this.onCreatePatch(e);break;case"unstaged-create-patch":this.onCreatePatch(e,!0);break;case"file-open":this.onOpenFile(e);break;case"file-unstage":this.onUnstageFile(e);break;case"file-stage":this.onStageFile(e);break;case"file-compare-working":this.onCompareWorking(e);break;case"file-open-on-remote":this.onOpenFileOnRemote(e);break;case"file-more-actions":this.onMoreActions(e)}}onTreeItemSelected(e){e.detail.context&&this.onComparePrevious(e)}onCreatePatch(e,t=!1){let i=new CustomEvent("create-patch",{detail:{checked:!!t||"staged"}});this.dispatchEvent(i)}onOpenFile(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-open",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}onOpenFileOnRemote(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-open-on-remote",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}onCompareWorking(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-compare-working",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}onComparePrevious(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-compare-previous",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}onMoreActions(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-more-actions",{detail:this.getEventDetail(t)});this.dispatchEvent(i)}onStageFile(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-stage",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}onUnstageFile(e){if(!e.detail.context)return;let[t]=e.detail.context,i=new CustomEvent("file-unstage",{detail:this.getEventDetail(t,{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0})});this.dispatchEvent(i)}getEventDetail(e,t){return{path:e.path,repoPath:e.repoPath,status:e.status,staged:e.staged,showOptions:t}}};lF([eB({type:Array})],GlDetailsBase.prototype,"files",2),lF([eB({type:Boolean})],GlDetailsBase.prototype,"isUncommitted",2),lF([eB({type:Object})],GlDetailsBase.prototype,"preferences",2),lF([eB({type:Object})],GlDetailsBase.prototype,"orgSettings",2),lF([eB({type:Object})],GlDetailsBase.prototype,"searchContext",2),lF([eF()],GlDetailsBase.prototype,"_filterMode",2),lF([eB({attribute:"empty-text"})],GlDetailsBase.prototype,"emptyText",2);var lj=Object.defineProperty,lN=Object.getOwnPropertyDescriptor,lq=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lN(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lj(t,i,s),s};let lU=class extends lit_element_i{constructor(){super(...arguments),this.overlay="tooltip",this.icon="",this.disabled=!1}render(){return this.label?"popover"===this.overlay?e$`<gl-popover hoist
				>${this.renderContent()}
				<div slot="content">${ob(this.label)}</div></gl-popover
			>`:e$`<gl-tooltip hoist content="${this.label}">${this.renderContent()}</gl-tooltip>`:this.renderContent()}renderContent(){let e="popover"===this.overlay?"anchor":eP,t=e$`<code-icon
			part="icon"
			icon="${this.icon}"
			modifier="${("loading"===this.icon?"spin":"")??eP}"
		></code-icon>`;return this.href?e$`
				<a class="chip" part="base" ?disabled=${this.disabled} href=${this.href} slot=${e}>
					${t}<slot></slot>
				</a>
			`:e$`
			<button class="chip" part="base" type="button" ?disabled=${this.disabled} slot=${e}>
				${t}<slot></slot>
			</button>
		`}focus(e){this.defaultFocusEl.focus(e)}};function lW(e="autolink",t="merged"){let i,r;switch(e){case"issue":r="closed"===t?"merged":"opened",i="closed"===t?"pass":"issues";break;case"pr":switch(r=t,t){case"merged":i="git-merge";break;case"closed":i="git-pull-request-closed";break;default:i="git-pull-request"}break;default:r="opened",i="link"}return{icon:i,modifier:r}}lU.styles=[a4,a7,F`
			:host {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				vertical-align: text-bottom;
				border-radius: 0.5rem;
				max-width: 100%;
				min-width: 0;
			}

			* {
				box-sizing: border-box;
			}

			:host(:focus-within) {
				${r4}
			}

			:host(:hover) {
				background-color: var(--vscode-toolbar-hoverBackground);
			}

			:host(:active) {
				background-color: var(--vscode-toolbar-activeBackground);
			}

			:host([disabled]) {
				pointer-events: none;
				opacity: 0.5;
			}

			.chip {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				gap: 0.2rem;
				/* vertical-align: middle; */
				color: inherit;
				max-width: 100%;
				min-width: 2rem;
				height: 2rem;
				color: inherit;
				padding: 0.2rem;
				text-decoration: none;
				cursor: pointer;
				background: none;
				border: none;
				font: inherit;
				overflow: hidden;
			}
			.chip:hover {
				text-decoration: none;
			}
			.chip:focus {
				outline: none;
			}

			a:not(.chip) {
				text-decoration: underline;
			}

			::slotted(*) {
				padding-inline-end: 0.2rem;
				vertical-align: middle;
				text-transform: var(--chip-text-transform, capitalize);
			}
		`],lq([eB()],lU.prototype,"href",2),lq([eB()],lU.prototype,"label",2),lq([eB()],lU.prototype,"overlay",2),lq([eB()],lU.prototype,"icon",2),lq([eB({type:Boolean})],lU.prototype,"disabled",2),lq([eN(".chip")],lU.prototype,"defaultFocusEl",2),lU=lq([eL("gl-action-chip")],lU);let lH=()=>({toAttribute:e=>e.getTime(),fromAttribute:(e,t)=>{let i=new Date(e);return isNaN(i.getTime())?new Date(parseInt(e,10)):i}});var lV=Object.defineProperty,lG=Object.getOwnPropertyDescriptor,lK=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lG(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lV(t,i,s),s};let lZ=class extends lit_element_i{constructor(){super(...arguments),this.dateStyle="relative",this.date=new Date,this.tooltip=""}get absoluteDate(){return function(t,i,r=!0){i=i??void 0;let o=`${(void 0)??""}:${i}`,s=eV.get(o);if(null==s){let t=function(e){if(null==e)return{localeMatcher:"best fit",dateStyle:"full",timeStyle:"short"};let t=eW.exec(e);if(t?.groups!=null){let{dateStyle:e,timeStyle:i}=t.groups;return{localeMatcher:"best fit",dateStyle:e||"full",timeStyle:i||void 0}}let i={localeMatcher:"best fit"};for(let{groups:t}of e.matchAll(eU))if(null!=t){for(let[e,r]of Object.entries(t))if(null!=r)switch(e){case"year":i.year=4===r.length?"numeric":"2-digit";break;case"month":switch(r.length){case 4:i.month="long";break;case 3:i.month="short";break;case 2:i.month="2-digit";break;case 1:i.month="numeric"}break;case"day":"DD"===r?i.day="2-digit":i.day="numeric";break;case"weekday":switch(r.length){case 4:i.weekday="long";break;case 3:i.weekday="short";break;case 2:i.weekday="narrow"}break;case"hour":i.hour=2===r.length?"2-digit":"numeric",i.hour12="hh"===r||"h"===r;break;case"minute":i.minute=2===r.length?"2-digit":"numeric";break;case"second":i.second=2===r.length?"2-digit":"numeric";break;case"fractionalSecond":i.fractionalSecondDigits=3;break;case"dayPeriod":i.dayPeriod="narrow",i.hour12=!0,i.hourCycle="h12";break;case"timeZoneName":i.timeZoneName=2===r.length?"long":"short"}}return i}(i);s=new Intl.DateTimeFormat(e,t),r&&eV.set(o,s)}if(null==i||eW.test(i))return s.format(t);let a=s.formatToParts(t);return i.replace(eU,(i,o,s,c,h,p,g,f,m,b,v,w,_,x,$)=>{if(null!=o)return o.substring(1,o.length-1);for(let[i,o]of Object.entries($)){if(null==o)continue;let s=a.find(e=>e.type===i);if("Do"===o&&s?.type==="day")return function(e){let t=e%100;return`${e}${eK[(t-20)%10]??eK[t]??eK[0]}`}(Number(s.value));if("a"===o&&s?.type==="dayPeriod"){let i=(function(t){let i=`${(void 0)??""}:time:${t}`,o=eV.get(i);null==o&&(o=new Intl.DateTimeFormat(e,{localeMatcher:"best fit",timeStyle:t}),r&&eV.set(i,o));return o})("short").formatToParts(t).find(e=>"dayPeriod"===e.type);return` ${(i??s)?.value??""}`}return s?.value??""}return""})}(this.date,this.format??"MMMM Do, YYYY h:mma")}get dateLabel(){return"relative"===this.dateStyle?function(i){let r=("number"==typeof i?i:i.getTime())-Date.now();for(let[i,o,s,a]of eH)if(Math.abs(r)>=o||1e3===o)return(t??=new Intl.RelativeTimeFormat(e,{localeMatcher:"best fit",numeric:"auto",style:"long"})).format(Math.trunc(r/s),i);return""}(this.date):this.absoluteDate}render(){return e$`<gl-tooltip content="${this.tooltip} ${this.absoluteDate}"
			><time part="base" datetime="${this.date.toISOString()}">${this.dateLabel}</time></gl-tooltip
		>`}};lK([eB()],lZ.prototype,"format",2),lK([eB({attribute:"date-style"})],lZ.prototype,"dateStyle",2),lK([eB({converter:lH(),reflect:!0,attribute:!1})],lZ.prototype,"date",2),lK([eB()],lZ.prototype,"tooltip",2),lZ=lK([eL("formatted-date")],lZ);var lY=Object.defineProperty,lX=Object.getOwnPropertyDescriptor,lQ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?lX(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&lY(t,i,s),s};let lJ=class extends GlElement{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1}renderDate(){return this.date?e$`<formatted-date
			.date=${new Date(this.date)}
			.format=${this.dateFormat}
			.dateStyle=${this.dateStyle}
		></formatted-date>`:eP}render(){let{icon:e,modifier:t}=lW(this.type,this.status);return this.compact?e$`
				<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
				<p class="title">${this.identifier}</p>
			`:e$`
			<span class="icon icon--${t}"><code-icon icon=${e}></code-icon></span>
			<p class="title">
				<a href="${this.url}">${this.name}</a>
			</p>
			<p class="date">${this.identifier} ${this.status?this.status:eP} ${this.renderDate()}</p>
			${eq(!0===this.details,()=>e$`
					<p class="details">
						<gl-button appearance="toolbar" tooltip="Open Details" @click=${()=>this.onDetailsClicked()}
							><code-icon icon="eye"></code-icon
						></gl-button>
					</p>
				`)}
		`}onDetailsClicked(){this.emit("gl-issue-pull-request-details")}};lJ.styles=F`
		:host {
			display: grid;
			gap: 0.25rem 0.6rem;
			justify-content: start;
			font-size: 1.3rem;
			grid-template-columns: min-content 1fr min-content;
		}

		:host([compact]) {
			grid-template-columns: min-content 1fr;
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.icon {
			grid-column: 1;
			grid-row: 1 / 3;
			text-align: center;
			padding-top: 0.1rem;
		}

		.icon--opened {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}
		.icon--closed {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}
		.icon--merged {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}

		.title {
			grid-column: 2;
			grid-row: 1;
			margin: 0;
		}

		.date {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
		}

		.details {
			grid-column: 3;
			grid-row: 1 / 3;
			margin: 0;
		}
	`,lQ([eB()],lJ.prototype,"url",2),lQ([eB()],lJ.prototype,"name",2),lQ([eB()],lJ.prototype,"date",2),lQ([eB()],lJ.prototype,"dateFormat",2),lQ([eB()],lJ.prototype,"dateStyle",2),lQ([eB()],lJ.prototype,"status",2),lQ([eB()],lJ.prototype,"type",2),lQ([eB()],lJ.prototype,"identifier",2),lQ([eB({type:Boolean,reflect:!0})],lJ.prototype,"compact",2),lQ([eB({type:Boolean})],lJ.prototype,"details",2),lJ=lQ([eL("issue-pull-request")],lJ);var l0=Object.defineProperty,l1=Object.getOwnPropertyDescriptor,l2=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?l1(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&l0(t,i,s),s};let l5=class extends lit_element_i{constructor(){super(...arguments),this.url="",this.name="",this.status="merged",this.type="autolink",this.identifier="",this.details=!1}render(){let{icon:e,modifier:t}=lW(this.type,this.status);return e$`<gl-popover hoist>
			<gl-action-chip exportparts="icon" slot="anchor" icon=${e} class="chip--${t}"
				><span part="label">${this.identifier}</span></gl-action-chip
			>
			<div slot="content">
				<issue-pull-request
					type=${this.type}
					name=${this.name}
					url="${this.url}"
					identifier=${this.identifier}
					status=${this.status}
					.date=${this.date}
					.dateFormat=${this.dateFormat}
					.dateStyle=${this.dateStyle}
					?details=${this.details}
				></issue-pull-request>
			</div>
		</gl-popover>`}};l5.styles=F`
		:host {
			display: contents;
		}

		.chip--opened::part(icon) {
			color: var(--vscode-gitlens-openPullRequestIconColor);
		}
		.chip--closed::part(icon) {
			color: var(--vscode-gitlens-closedPullRequestIconColor);
		}
		.chip--merged::part(icon) {
			color: var(--vscode-gitlens-mergedPullRequestIconColor);
		}
	`,l2([eB()],l5.prototype,"url",2),l2([eB()],l5.prototype,"name",2),l2([eB()],l5.prototype,"date",2),l2([eB()],l5.prototype,"dateFormat",2),l2([eB()],l5.prototype,"dateStyle",2),l2([eB()],l5.prototype,"status",2),l2([eB()],l5.prototype,"type",2),l2([eB()],l5.prototype,"identifier",2),l2([eB({type:Boolean})],l5.prototype,"details",2),l5=l2([eL("gl-autolink-chip")],l5);let l3=/\/EMail=([^/]+)/i,l6=/<([^>]+)>/,l4=/no public key/i;function l7(e,t){if(null==e)return"unknown";let{status:i,trustLevel:r,signer:o}=e;if("bad"===i)return"untrusted";if("good"===i&&("ultimate"===r||"full"===r)){let e=function(e){if(!e)return;let t=e.match(l3);if(t)return t[1];let i=e.match(l6);return i?i[1]:e.includes("@")&&!e.includes(" ")?e:void 0}(o);if(e&&t&&e.toLowerCase()===t.toLowerCase())return"trusted"}return"unknown"}function l8(e){switch(e){case"trusted":return"workspace-trusted";case"untrusted":return"workspace-untrusted";default:return"workspace-unknown"}}var l9=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,ct=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ce(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&l9(t,i,s),s};let ci=class extends lit_element_i{render(){if(null==this.signature)return eP;let e=l7(this.signature,this.committerEmail),t=l8(e);return e$`
			<span class="badge badge--${e}">
				<code-icon icon="${t}"></code-icon>
			</span>
		`}};ci.styles=F`
		:host {
			display: inline-flex;
			align-items: center;
		}

		.badge {
			display: inline-flex;
			align-items: center;

			& code-icon {
				margin-top: 0.1rem;
			}
		}

		.badge--trusted {
			color: var(--vscode-charts-green);
		}

		.badge--unknown {
			color: var(--color-foreground--65);
		}

		.badge--untrusted {
			color: var(--vscode-charts-red);
		}
	`,ct([eB({type:String})],ci.prototype,"committerEmail",2),ct([eB({type:Object})],ci.prototype,"signature",2),ci=ct([eL("gl-signature-badge")],ci);var cr=Object.defineProperty,co=Object.getOwnPropertyDescriptor,cs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?co(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cr(t,i,s),s};let cn="gl-copy-container",ca=class extends lit_element_i{constructor(){super(...arguments),this.copyLabel="Copy",this.copiedLabel="Copied",this.disabled=!1,this.placement="top",this.timeout=1e3,this._isMouseDown=!1,this.onMouseDown=()=>{this._isMouseDown=!0,window.addEventListener("mouseup",()=>this._isMouseDown=!1,{once:!0})},this.onFocusIn=()=>{this._isMouseDown||this.tooltip?.show()},this.onFocusOut=()=>{this.tooltip?.hide()}}connectedCallback(){super.connectedCallback?.(),this.label=this.copyLabel,this.addEventListener("mousedown",this.onMouseDown),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}willUpdate(e){e.has("copyLabel")&&null==this._resetTimer&&(this.label=this.copyLabel)}disconnectedCallback(){this.cancelResetTimer(),this.removeEventListener("mousedown",this.onMouseDown),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),super.disconnectedCallback?.()}render(){return this.content||this.disabled?e$`<gl-tooltip
			tabindex="0"
			.content="${this.label}"
			placement="${this.placement??eP}"
			@click=${this.onClick}
			@keydown=${this.onKeydown}
		>
			<slot></slot>
		</gl-tooltip>`:eP}async onClick(e){if(this.cancelResetTimer(),this.content)try{await navigator.clipboard.writeText(this.content),this.label=this.copiedLabel}catch{this.label="Unable to Copy"}else this.label="Nothing to Copy";this.createResetTimer(),await this.updateComplete,await this.tooltip?.updateComplete,this.tooltip?.show()}onKeydown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.onClick(e))}cancelResetTimer(){null!=this._resetTimer&&(clearTimeout(this._resetTimer),this._resetTimer=void 0)}createResetTimer(){this._resetTimer=setTimeout(()=>{this._resetTimer=void 0,this.label=this.copyLabel},this.timeout)}};ca.tagName=cn,ca.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},ca.styles=F`
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
	`,cs([eB({reflect:!0})],ca.prototype,"appearance",2),cs([eB({reflect:!1})],ca.prototype,"content",2),cs([eB()],ca.prototype,"copyLabel",2),cs([eB()],ca.prototype,"copiedLabel",2),cs([eB({type:Boolean,reflect:!0})],ca.prototype,"disabled",2),cs([eB()],ca.prototype,"placement",2),cs([eB({type:Number})],ca.prototype,"timeout",2),cs([eF()],ca.prototype,"label",2),cs([eN("gl-tooltip")],ca.prototype,"tooltip",2),ca=cs([eL(cn)],ca);var cl=Object.defineProperty,cc=Object.getOwnPropertyDescriptor,ch=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cc(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cl(t,i,s),s};let cd=class extends lit_element_i{getFormatLabel(e){switch(e){case"gpg":case"openpgp":return"GPG";case"ssh":return"SSH";case"x509":return"X.509";default:return""}}renderKeyLine(){let{keyId:e,fingerprint:t,format:i}=this.signature??{};if(!e&&!t)return eP;let r=t??e,o=this.getFormatLabel(i),s=t?"Fingerprint":"Key ID",a=o?`${o} ${s}:`:`${s}:`;return e$`
			<div class="signature-key">
				<span class="signature-key-label">${a}</span>
				<span class="signature-key-value">${r}</span>
				<gl-copy-container tabindex="0" .content=${r} copyLabel="Copy ${s}">
					<code-icon icon="copy"></code-icon>
				</gl-copy-container>
			</div>
		`}render(){if(null==this.signature)return eP;let e=function(e,t){let i=l7(e,t),r=l8(i);switch(i){case"trusted":return{icon:r,text:"Signed & Verified",description:"Trusted",detail:"Signature is valid and the signer is trusted"};case"untrusted":return{icon:r,text:"Invalid Signature",description:"Untrusted",detail:"Signature does not match the commit contents — this commit may have been tampered with"};case"unknown":switch(e.status){case"good":return{icon:r,text:"Signed",description:"Unverified Signer",detail:"Signature is valid, but the signer is not in your trusted keys"};case"expired":return{icon:r,text:"Signed",description:"Expired",detail:"Signature was made with an expired key and cannot be verified"};case"revoked":return{icon:r,text:"Signed",description:"Revoked",detail:"Signature was made with a revoked key and should not be trusted"};case"error":if(e.errorMessage&&l4.test(e.errorMessage))return{icon:r,text:"Signed",description:"Missing Key",detail:"Signature cannot be verified because the public key is not available"};return{icon:r,text:"Signed",description:"Failed",detail:e.errorMessage?`Signature verification failed: ${e.errorMessage}`:"Signature verification failed"};default:return{icon:r,text:"Signed",description:"Unverified",detail:e.errorMessage??"Signature could not be verified"}}}}(this.signature,this.committerEmail);return e$`
			<div class="signature-details">
				<div class="signature-status">
					<gl-signature-badge
						.signature=${this.signature}
						.committerEmail=${this.committerEmail}
					></gl-signature-badge>
					<div class="signature-status-text">
						<div class="signature-status-message">
							${e.text}${e.description?e$`<span class="signature-status-description">${e.description}</span>`:eP}
						</div>
						${e.detail?e$`<div class="signature-status-detail">${e.detail}</div>`:eP}
						${this.renderKeyLine()}
					</div>
				</div>
			</div>
		`}};cd.styles=F`
		:host {
			display: block;
		}

		.signature-details {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.signature-status {
			display: flex;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.signature-status gl-signature-badge {
			flex-shrink: 0;
		}

		.signature-status-text {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			flex: 1;
			font-weight: 400;
		}

		.signature-status-message {
			color: var(--vscode-foreground);
		}

		.signature-status-description {
			color: var(--vscode-descriptionForeground);
			margin-left: 0.8rem;
			text-transform: lowercase;
			font-variant: small-caps;
		}

		.signature-status-detail {
			color: var(--vscode-descriptionForeground);
		}

		.signature-key {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: var(--vscode-descriptionForeground);
			font-size: 0.9em;
		}

		.signature-key-label {
			flex-shrink: 0;
		}

		.signature-key-value {
			word-break: break-all;
			overflow-wrap: break-word;
		}

		gl-copy-container {
			margin-left: auto;
			flex-shrink: 0;
		}

		gl-copy-container code-icon {
			color: var(--vscode-descriptionForeground);
		}

		gl-copy-container:hover code-icon {
			color: var(--vscode-foreground);
		}
	`,ch([eB({type:String})],cd.prototype,"committerEmail",2),ch([eB({type:Object})],cd.prototype,"signature",2),cd=ch([eL("gl-signature-details")],cd);var cp=Object.defineProperty,cu=Object.getOwnPropertyDescriptor,cg=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cu(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cp(t,i,s),s};let cf=class extends lit_element_i{constructor(){super(...arguments),this.avatarUrl="https://www.gravatar.com/avatar/?s=64&d=robohash",this.name="",this.showAvatar=!1,this.showSignature=!0}renderAvatar(){return this.showAvatar&&this.avatarUrl?.length?e$`<img class="thumb" src="${this.avatarUrl}" alt="${this.name}" />`:e$`<code-icon icon="person" size="18"></code-icon>`}renderSignatureBadge(){return null!=this.signature&&this.showSignature?e$`<gl-signature-badge
			.signature=${this.signature}
			.committerEmail=${this.committerEmail}
		></gl-signature-badge>`:eP}renderPopoverContent(){return e$`
			<div class="popover-content">
				<div class="author-info">
					${this.avatarUrl?.length?e$`<img class="author-avatar" src="${this.avatarUrl}" alt="${this.name}" />`:eP}
					<div class="author-details">
						<div class="author-name-text">${this.name}</div>
						${this.email?e$`<span class="author-email"><a href="mailto:${this.email}">${this.email}</a></span>`:eP}
					</div>
				</div>
				${this.signature&&this.showSignature?e$`<gl-signature-details
							.signature=${this.signature}
							.committerEmail=${this.committerEmail}
						></gl-signature-details>`:eP}
			</div>
		`}render(){return e$`
			<gl-popover hoist placement="bottom" trigger="hover click focus">
				<span slot="anchor" class="author" tabindex="0"
					><span class="avatar">${this.renderAvatar()}</span
					><span class="name">${this.name}</span>${this.renderSignatureBadge()}</span
				>
				<div slot="content">${this.renderPopoverContent()}</div>
			</gl-popover>
		`}};cf.styles=F`
		:host {
			display: contents;
		}

		* {
			box-sizing: border-box;
		}

		.author {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0 0.6rem;
			border-radius: 0.3rem;
			cursor: pointer;

			&:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}

		a {
			color: var(--color-link-foreground);
			text-decoration: none;
		}

		.author-hover {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.6rem;
			margin: 0.6rem 0.2rem 0.2rem 0.2rem;
		}

		.author-hover img {
			max-width: 64px;
		}

		.avatar {
			width: 1.8rem;
		}

		.thumb {
			width: 100%;
			height: auto;
			vertical-align: middle;
			border-radius: 0.4rem;
		}

		.name {
			flex: 1;
			font-size: 1.3rem;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		gl-signature-badge {
			margin-left: 0.4rem;
		}

		.popover-content {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.author-info {
			display: flex;
			gap: 0.625rem;
			align-items: center;
		}

		.author-avatar {
			width: 32px;
			height: 32px;
			border-radius: 8px;
			flex-shrink: 0;
		}

		.author-details {
			display: flex;
			flex-direction: column;
			gap: 0;
			min-width: 0;
			flex: 1;
			line-height: normal;
		}

		.author-name-text {
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: var(--vscode-foreground);
		}

		.author-email {
			font-weight: 400;
			color: var(--vscode-descriptionForeground);

			a {
				display: inline-block;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				vertical-align: bottom;
			}

			a:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: 2px;
			}
		}
	`,cg([eB()],cf.prototype,"avatarUrl",2),cg([eB()],cf.prototype,"committerEmail",2),cg([eB()],cf.prototype,"email",2),cg([eB()],cf.prototype,"name",2),cg([eB({type:Boolean,attribute:"show-avatar",reflect:!0})],cf.prototype,"showAvatar",2),cg([eB({type:Boolean,attribute:"show-signature",reflect:!0})],cf.prototype,"showSignature",2),cg([eB({type:Object})],cf.prototype,"signature",2),cf=cg([eL("gl-commit-author")],cf);var cm=Object.defineProperty,cb=Object.getOwnPropertyDescriptor,cv=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cb(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cm(t,i,s),s};let cy=class extends lit_element_i{constructor(){super(...arguments),this.dateFormat="MMMM Do, YYYY h:mma",this.dateStyle="relative",this.committer=!1}get absoluteDate(){return this.dateElement.absoluteDate}get dateLabel(){return this.dateElement.dateLabel}render(){return e$`<code-icon icon="git-commit"></code-icon>
			<formatted-date
				.date=${this.date}
				.format=${this.dateFormat}
				.dateStyle=${this.dateStyle}
				.tooltip=${this.actionLabel??eP}
			></formatted-date>`}};cy.styles=F`
		:host {
			display: inline-flex;
			align-items: center;
			gap: 0.2rem;
			vertical-align: middle;
			font-size: inherit;
		}

		formatted-date::part(base) {
			white-space: nowrap;
		}
	`,cv([eB({converter:lH(),reflect:!0})],cy.prototype,"date",2),cv([eB()],cy.prototype,"dateFormat",2),cv([eB()],cy.prototype,"dateStyle",2),cv([eB({type:Boolean})],cy.prototype,"committer",2),cv([eB()],cy.prototype,"actionLabel",2),cv([eN("formatted-date")],cy.prototype,"dateElement",2),cy=cv([eL("gl-commit-date")],cy);var cw=Object.defineProperty,c_=Object.getOwnPropertyDescriptor,cx=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?c_(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cw(t,i,s),s};let ck=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),c$=class extends lit_element_i{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0}render(){return ck.map(([e,t])=>this.renderStat(e,t))}renderStat(e,t){let i=this[e];return null==i?eP:e$`<span class="stat ${e}" aria-label="${i} ${e}"
			><span class="label">${this.renderSymbol(t)}${i}</span></span
		>`}renderSymbol([e,t]){return"icons"===this.symbol?e$`<code-icon class="icon" icon="${t}"></code-icon>`:e$`<span>${e}</span>`}};c$.styles=F`
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
	`,cx([eB({type:Number})],c$.prototype,"added",2),cx([eB({type:Number})],c$.prototype,"modified",2),cx([eB({type:Number})],c$.prototype,"removed",2),cx([eB()],c$.prototype,"symbol",2),cx([eB({reflect:!0})],c$.prototype,"appearance",2),c$=cx([eL("commit-stats")],c$);var cC=Object.defineProperty,cS=Object.getOwnPropertyDescriptor;let cP=class extends lit_element_i{render(){return e$`<slot></slot>`}};cP.styles=F`
		:host {
			display: flex;
			box-sizing: border-box;
			flex-direction: column;
		}

		::slotted(webview-pane) {
			flex: none;
		}

		:host([flexible]) ::slotted(webview-pane[flexible][expanded]) {
			flex: 1;
		}
	`,cP=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?cS(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cC(t,i,s),s})([eL("webview-pane-group")],cP);var cA=Object.defineProperty,cE=Object.getOwnPropertyDescriptor,cT=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cE(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cA(t,i,s),s};let cR=class extends GlDetailsBase{constructor(){super(...arguments),this.tab="commit",this.autolinksEnabled=!1,this.hasAccount=!1,this.hasIntegrationsConnected=!1,this.explainBusy=!1,this.reachabilityState="idle"}get isStash(){return this.commit?.stashNumber!=null}updated(e){e.has("explain")&&(this.explainBusy=!1,this.querySelector('[data-region="commit-explanation"]')?.scrollIntoView()),e.has("commit")&&(this.explainBusy=!1)}render(){return null==this.commit?this.renderEmptyContent():e$`
			${this.renderHiddenNotice()} ${this.renderCommitMessage()}
			<webview-pane-group flexible>
				${this.renderChangedFiles(this.isStash?"stash":"commit",this.renderCommitStats(this.commit.stats))}
			</webview-pane-group>
		`}renderHiddenNotice(){return this.searchContext?.hiddenFromGraph?e$`
			<div class="section">
				<div class="alert alert--warning">
					<code-icon icon="warning"></code-icon>
					<p class="alert__content">
						This ${this.isStash?"stash":"commit"} is not currently visible in the Commit Graph.
					</p>
				</div>
			</div>
		`:eP}renderEmptyContent(){return e$`
			<div class="section section--empty" id="empty">
				<p>Rich details for commits and stashes are shown as you navigate:</p>

				<ul class="bulleted">
					<li>lines in the text editor</li>
					<li>
						commits in the <a href="command:gitlens.showGraph">Commit Graph</a>,
						<a href="command:gitlens.showTimelineView">Visual File History</a>, or
						<a href="command:gitlens.showCommitsView">Commits view</a>
					</li>
					<li>stashes in the <a href="command:gitlens.showStashesView">Stashes view</a></li>
				</ul>

				<p>Alternatively, show your work-in-progress, or search for or choose a commit</p>

				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full data-action="wip">Overview</gl-button>
					</span>
				</p>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full data-action="pick-commit">Choose Commit...</gl-button>
						<gl-button density="compact" data-action="search-commit" tooltip="Search for Commit"
							><code-icon icon="search"></code-icon
						></gl-button>
					</span>
				</p>
			</div>
		`}renderExplainChanges(){if(this.orgSettings?.ai!==!1)return e$`
			<gl-action-chip
				label=${this.isUncommitted?"Explain Working Changes":`Explain Changes in this ${this.isStash?"Stash":"Commit"}`}
				icon="sparkle"
				data-action="explain-commit"
				aria-busy="${this.explainBusy?"true":eP}"
				?disabled="${!!this.explainBusy||eP}"
				@click=${this.onExplainChanges}
				@keydown=${this.onExplainChanges}
				><span>explain</span></gl-action-chip
			>
		`}renderCommitMessage(){let e=this.commit;if(null==e)return;let t=this.formattedMessage??e.message,i=t.indexOf(rO);return e$`
			<div class="section section--message">
				<div class="message-block-row">
					${eq(!this.isStash,()=>{var t,i;return e$`
							<div class="message-block-group">
								<gl-commit-author
									.avatarUrl="${e.author.avatar??""}"
									.committerEmail="${e.committer.email}"
									email="${e.author.email}"
									name="${t=e.author,i=this.preferences?.currentUserNameStyle??"you",t.current?function(e,t){switch(t){case"name":return e;case"nameAndYou":if("You"===e||e.endsWith(" (you)"))return e;return e?`${e} (you)`:"You";default:return"You"}}(t.name,i):t.name}"
									.showAvatar="${this.preferences?.avatars??!0}"
									.showSignature="${this.preferences?.showSignatureBadges??!0}"
									.signature="${this.signature}"
								></gl-commit-author>
							</div>
						`})}
					${this.renderExplainChanges()}
				</div>
				<div>
					<div class="message-block">
						${eq(-1===i,()=>e$`<p class="message-block__text scrollable" data-region="message">
									<strong>${r5(t)}</strong>
								</p>`,()=>e$`<p class="message-block__text scrollable" data-region="message">
									<strong>${r5(t.substring(0,i))}</strong><br /><span
										>${r5(t.substring(i+3))}</span
									>
								</p>`)}
					</div>
					<div class="message-block-row message-block-row--actions">
						${this.renderAutoLinksChips()}
						${eq(!this.isStash,()=>e$`
								<gl-commit-date
									.date=${e.author.date}
									.dateFormat="${this.preferences?.dateFormat??"absolute"}"
									.dateStyle="${this.preferences?.dateStyle??"relative"}"
									.actionLabel="${e.sha===hb?"Modified":"Committed"}"
								></gl-commit-date>
							`)}
					</div>
					<div class="message-block-row message-block-row--actions">${this.renderReachability()}</div>
				</div>
			</div>
		`}get autolinkState(){if(!this.autolinksEnabled||this.isUncommitted)return;let e=new Map,t=new Map;if(null!=this.autolinks)for(let i of this.autolinks)e.set(i.id,{type:"autolink",value:i}),t.set(i.url,i.id);let i=this.autolinkedIssues;if(null!=i)for(let r of i){if(null!=r.url){let i=t.get(r.url);null!=i&&e.delete(i)}e.set(r.id,{type:"issue",value:r})}let r=this.pullRequest;if(null!=r){if(null!=r.url){let i=t.get(r.url);null!=i&&e.delete(i)}e.set(r.id,{type:"pr",value:r})}let o=[],s=[],a=[];for(let t of e.values())switch(t.type){case"autolink":o.push(t.value);break;case"issue":s.push(t.value);break;case"pr":a.push(t.value)}return{autolinks:o,issues:s,prs:a,size:e.size}}renderLearnAboutAutolinks(e=!1){let t=e?eP:e$`<span class="mq-hide-sm">Learn about autolinks</span>`,i=nt("gitlens.showSettingsPage!autolinks",{showOptions:{preserveFocus:!0}}),r="Configure autolinks to linkify external references, like Jira or Zendesk tickets, in commit messages.";return this.hasIntegrationsConnected||(r=`<a href="${i}">Configure autolinks</a> to linkify external references, like Jira or Zendesk tickets, in commit messages.

<a href="${nt("gitlens.plus.cloudIntegrations.connect",{source:{source:"inspect",detail:{action:"connect"}}})}">Connect an Integration</a> &mdash;`,this.hasAccount||(r+=" sign up and"),r+=" to get access to automatic rich autolinks for services like Jira, GitHub, and more."),e$`<gl-action-chip
			href=${i}
			data-action="autolink-settings"
			icon="info"
			.label=${r}
			overlay=${this.hasIntegrationsConnected?"tooltip":"popover"}
			>${t}</gl-action-chip
		>`}renderAutoLinksChips(){let e=this.autolinkState;if(null==e)return this.renderLearnAboutAutolinks();let{autolinks:t,issues:i,prs:r,size:o}=e;return 0===o?this.renderLearnAboutAutolinks():e$`<div class="message-block-group">
			${this.renderLearnAboutAutolinks(!0)}
			${eq(t.length,()=>t.map(e=>{let t=e.description??e.title;return void 0===t&&(t=`Custom Autolink ${e.prefix}${e.id}`),e$`<gl-autolink-chip
						type="autolink"
						name="${t}"
						url="${e.url}"
						identifier="${e.prefix}${e.id}"
					></gl-autolink-chip>`}))}
			${eq(r.length,()=>r.map(e=>e$`<gl-autolink-chip
							type="pr"
							name="${e.title}"
							url="${e.url}"
							identifier="#${e.id}"
							status="${e.state}"
							.date=${e.updatedDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
						></gl-autolink-chip>`))}
			${eq(i.length,()=>i.map(e=>e$`<gl-autolink-chip
							type="issue"
							name="${e.title}"
							url="${e.url}"
							identifier="${e.id}"
							status="${e.state}"
							.date=${e.closed?e.closedDate:e.createdDate}
							.dateFormat="${this.preferences?.dateFormat}"
							.dateStyle="${this.preferences?.dateStyle}"
						></gl-autolink-chip>`))}
		</div>`}renderReachability(){if(this.isUncommitted)return eP;if("loading"===this.reachabilityState)return e$`<gl-action-chip icon="loading" label="Loading branches and tags which contain this commit"
				>Loading...</gl-action-chip
			>`;if("error"===this.reachabilityState)return e$`<gl-action-chip
				class="error"
				icon="error"
				label="Failed to load branches and tags. Click to retry."
				overlay="tooltip"
				@click=${()=>this.dispatchEvent(new CustomEvent("refresh-reachability"))}
				><span class="mq-hide-sm">Failed to load</span></gl-action-chip
			>`;if("idle"===this.reachabilityState)return e$`<gl-action-chip
				icon="git-branch"
				label="Show which branches and tags contain this commit"
				overlay="tooltip"
				@click=${()=>this.dispatchEvent(new CustomEvent("load-reachability"))}
				><span class="mq-hide-sm">Show Branches &amp; Tags</span></gl-action-chip
			>`;if(null==this.reachability)return eP;let{refs:e}=this.reachability;if(!e.length)return e$`<gl-action-chip
				class="warning"
				icon="git-branch"
				label="Commit is not on any branch or tag"
				overlay="tooltip"
				><span class="mq-hide-sm">Not on any branch or tag</span></gl-action-chip
			>`;let t=e.filter(e=>"branch"===e.refType),i=e.filter(e=>"tag"===e.refType);return e$`<div class="reachability-summary">
			${this.renderReachabilityChip("branch",t)} ${this.renderReachabilityChip("tag",i)}
		</div>`}renderReachabilityChip(e,t){if(!t.length)return eP;let i="branch"===e?"git-branch":"tag",r=t.length,[o]=t;if(1===r){let e="branch"===o.refType?o.remote?"remote branch":"branch":"tag";return e$`<gl-action-chip
				icon="${i}"
				label="Commit on 1 ${e}: ${o.name}"
				overlay="tooltip"
				class="reachability-range-chip reachability-range-chip--${"branch"===o.refType?o.remote?"remote-branch":"local-branch":"tag"}${o.current?" reachability-range-chip--current":""}"
				>${o.name}</gl-action-chip
			>`}let s=t.at(-1);return e$`<gl-popover placement="bottom" trigger="hover focus click" class="reachability-range-chip-wrapper">
			<gl-action-chip
				slot="anchor"
				class="reachability-range-chip reachability-range-chip--range reachability-range-chip--${"branch"===e?"local-branch":"tag"}"
				><span class="reachability-range-chip__label">
					<code-icon icon="${i}"></code-icon>${o.name}
					<span class="reachability-range-chip__ellipsis">...</span>
					<code-icon icon="${i}"></code-icon>${s.name}
				</span>
				<span class="reachability-range-chip__count">+${r}</span></gl-action-chip
			>
			<div slot="content" class="reachability-popover">
				<div class="reachability-popover__header">
					Commit is on ${r} ${"branch"===e?"branches":"tags"}
				</div>
				<div class="reachability-popover__list scrollable">
					${t.map(t=>e$`<div
								class="reachability-list-item${t.current?" reachability-list-item--current":""}"
							>
								<code-icon
									icon="${"branch"===e?"git-branch":"tag"}"
									class="reachability-list-item__icon"
								></code-icon>
								<span class="reachability-list-item__label">${t.name}</span>
							</div>`)}
				</div>
			</div>
		</gl-popover>`}onExplainChanges(e){if(e instanceof KeyboardEvent){if("Enter"!==e.key&&" "!==e.key)return;if(this.explainBusy)return void e.preventDefault()}else if(this.explainBusy){e.preventDefault(),e.stopPropagation();return}this.explainBusy=!0}renderCommitStats(e){if(e?.files==null)return;if("number"==typeof e.files)return e$`<commit-stats modified="${e.files}" symbol="icons" appearance="pill"></commit-stats>`;let{added:t,deleted:i,changed:r}=e.files;return e$`<commit-stats
			added="${t}"
			modified="${r}"
			removed="${i}"
			symbol="icons"
			appearance="pill"
		></commit-stats>`}getFileActions(e,t){let i=[{icon:"go-to-file",label:"Open File",action:"file-open"}];return this.isUncommitted||(i.push({icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}),this.isStash||null!=e.submodule||i.push({icon:"globe",label:"Open on Remote",action:"file-open-on-remote"})),i}getFileContextData(e){if(!this.commit)return;let t=this.commit,i=null!=t.stashNumber,r=null!=e.submodule?"+submodule":"";return tq({webviewItem:i?`gitlens:file+stashed${r}`:`gitlens:file+committed${r}`,webviewItemValue:{type:"file",path:e.path,repoPath:t.repoPath,sha:t.sha,stashNumber:t.stashNumber,status:e.status}})}};cT([eB({type:Object})],cR.prototype,"commit",2),cT([eB({type:Boolean})],cR.prototype,"autolinksEnabled",2),cT([eB({type:Array})],cR.prototype,"autolinkedIssues",2),cT([eB({type:Object})],cR.prototype,"pullRequest",2),cT([eB({type:Boolean})],cR.prototype,"hasAccount",2),cT([eB({type:Boolean})],cR.prototype,"hasIntegrationsConnected",2),cT([eF()],cR.prototype,"isStash",1),cT([eF()],cR.prototype,"explainBusy",2),cT([eB({type:Object})],cR.prototype,"explain",2),cT([eB({type:Object})],cR.prototype,"reachability",2),cT([eB({type:String})],cR.prototype,"reachabilityState",2),cT([eB({type:Array})],cR.prototype,"autolinks",2),cT([eB({type:String})],cR.prototype,"formattedMessage",2),cT([eB({type:Object})],cR.prototype,"signature",2),cR=cT([eL("gl-commit-details")],cR);let cI="0000000000000000000000000000000000000000";var cM=Object.defineProperty,cz=Object.getOwnPropertyDescriptor,cO=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cz(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cM(t,i,s),s};let cL=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return e$`<div class="group"><slot></slot></div>`}};cL.styles=[r8,F`
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
		`],cO([eB({type:Boolean})],cL.prototype,"editor",2),cO([eB({reflect:!0})],cL.prototype,"layout",2),cO([eB({reflect:!0})],cL.prototype,"grouping",2),cL=cO([eL("button-container")],cL);var cD=Object.defineProperty,cB=Object.getOwnPropertyDescriptor,cF=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cB(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cD(t,i,s),s};let cj=class extends lit_element_i{render(){return this.name?e$`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?e$`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:e$`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?e$`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:e$`<slot class="thumb thumb--text"></slot>`}};cj.styles=[F`
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
		`],cF([eB()],cj.prototype,"src",2),cF([eB()],cj.prototype,"name",2),cF([eB()],cj.prototype,"href",2),cj=cF([eL("gl-avatar")],cj);let cN=F`
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

	.button-group {
		display: inline-flex;
		gap: 0.1rem;
	}
	.button-group--single {
		width: 100%;
		max-width: 30rem;
	}

	.button-group > *:not(:first-child),
	.button-group > *:not(:first-child) gl-button {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.button-group > *:not(:last-child),
	.button-group > *:not(:last-child) gl-button {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;var cq=((w=cq||{}).AngleBracketLeftHeavy="❰",w.AngleBracketRightHeavy="❱",w.ArrowBack="↩",w.ArrowDown="↓",w.ArrowDownUp="⇵",w.ArrowDropRight="⤷",w.ArrowHeadRight="➤",w.ArrowLeft="←",w.ArrowLeftDouble="⇐",w.ArrowLeftRight="↔",w.ArrowLeftRightDouble="⇔",w.ArrowLeftRightDoubleStrike="⇎",w.ArrowLeftRightLong="⟷",w.ArrowRight="→",w.ArrowRightDouble="⇒",w.ArrowRightHollow="⇨",w.ArrowUp="↑",w.ArrowUpDown="⇅",w.ArrowUpRight="↗",w.ArrowsHalfLeftRight="⇋",w.ArrowsHalfRightLeft="⇌",w.ArrowsLeftRight="⇆",w.ArrowsRightLeft="⇄",w.Asterisk="∗",w.Bullseye="◎",w.Check="✔",w.Dash="—",w.Dot="•",w.Ellipsis="…",w.EnDash="–",w.Envelope="✉",w.EqualsTriple="≡",w.Flag="⚑",w.FlagHollow="⚐",w.MiddleEllipsis="⋯",w.MuchLessThan="≪",w.MuchGreaterThan="≫",w.Pencil="✎",w.Space=" ",w.SpaceThin=" ",w.SpaceThinnest=" ",w.SquareWithBottomShadow="❏",w.SquareWithTopShadow="❐",w.Warning="⚠",w.ZeroWidthSpace="​",w);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var cU=((_=cU||{}).File="file",_.Git="git",_.GitHub="github",_.GitLens="gitlens",_.GitLensAIMarkdown="gitlens-ai-markdown",_.PRs="pr",_.Remote="vscode-remote",_.Vsls="vsls",_.VslsScc="vsls-scc",_.Virtual="vscode-vfs",_);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let cW="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",cH=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${cW}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${cW}`,graph:`https://gitkraken.com/solutions/commit-graph?${cW}`,launchpad:`https://gitkraken.com/solutions/launchpad?${cW}`,platform:`https://gitkraken.com/devex?${cW}`,pricing:`https://gitkraken.com/gitlens/pricing?${cW}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${cW}`,security:`https://help.gitkraken.com/gitlens/security?${cW}`,workspaces:`https://gitkraken.com/solutions/workspaces?${cW}`,cli:`https://gitkraken.com/cli?${cW}`,browserExtension:`https://gitkraken.com/browser-extension?${cW}`,desktop:`https://gitkraken.com/git-client?${cW}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${cW}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${cW}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${cW}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${cW}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${cW}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${cW}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${cW}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${cW}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${cW}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${cW}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${cW}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${cW}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${cW}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${cW}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${cW}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${cW}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${cW}`});var cV=Object.defineProperty,cG=Object.getOwnPropertyDescriptor,cK=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cG(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cV(t,i,s),s};let cZ=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){let e=`--skeleton-lines: ${this.lines};`;return e$`<div class="skeleton" style=${e}></div>`}};cZ.styles=F`
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
	`,cK([eB({type:Number})],cZ.prototype,"lines",2),cZ=cK([eL("skeleton-loader")],cZ);let GlTreeBase=class GlTreeBase extends GlElement{renderLoading(){return e$`
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
		`}renderLayoutAction(e){if(!e)return eP;let t="tree",i="list-tree",r="View as Tree";switch(e){case"auto":t="list",i="gl-list-auto",r="View as List";break;case"list":t="tree",i="list-flat",r="View as Tree";break;case"tree":t="auto",i="list-tree",r="View as Auto"}return e$`<action-item data-switch-value="${t}" label="${r}" icon="${i}"></action-item>`}renderTreeView(e,t="none"){return e$`<gl-tree-generator
			.model=${e}
			.guides=${t}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-generator>`}renderFiles(e,t=!1,i=!1,r=2){let o=[];if(t){let t=ni(e,e=>e.path.split("/"),(...e)=>e.join("/"),i);if(null!=t.children)for(let e of t.children.values()){let t=this.walkFileTree(e,{level:r});o.push(t)}}else for(let t of e){let e=this.fileToTreeModel(t,{level:r,branch:!1},!0);o.push(e)}return o}walkFileTree(e,t={level:1}){let i;if(void 0===t.level&&(t.level=1),i=null==e.value?this.folderToTreeModel(e.name,e.relativePath,t):this.fileToTreeModel(e.value,t),null!=e.children){let r=[];for(let i of e.children.values()){let e=this.walkFileTree(i,{...t,level:t.level+1});r.push(e)}r.length>0&&(i.branch=!0,i.children=r)}return i}folderToTreeModel(e,t,i){return{branch:!1,expanded:!0,path:t,level:1,checkable:!1,checked:!1,icon:"folder",label:e,...i}}getRepoActions(e,t,i){return[]}emptyTreeModel(e,t){return{branch:!1,expanded:!0,path:"",level:1,checkable:!0,checked:!0,icon:void 0,label:e,...t}}repoToTreeModel(e,t,i,r){return{branch:!1,expanded:!0,path:t,level:1,checkable:!0,checked:!0,icon:"gl-repository",label:e,description:r,context:[t],actions:this.getRepoActions(e,t,i),...i}}getFileActions(e,t){return[]}fileToTreeModel(e,t,i=!1,r="/"){let o=e.path.lastIndexOf(r),s=-1!==o?e.path.substring(o+1):e.path,a=i&&-1!==o?e.path.substring(0,o):"";return{branch:!1,expanded:!0,path:e.path,level:1,checkable:!1,checked:!1,icon:"file",label:s,description:!0===i?a:void 0,context:[e],actions:this.getFileActions(e,t),decorations:[{type:"text",label:e.status}],...t}}};var cY=Object.defineProperty,cX=Object.getOwnPropertyDescriptor,cQ=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?cX(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cY(t,i,s),s};let cJ=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option"}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(e){(e.has("disabled")||e.has("role"))&&this.updateInteractiveState()}render(){return this.href?e$`<a href=${this.href}><slot></slot></a>`:e$`<slot></slot>`}};cJ.styles=[r8,F`
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
		`],cQ([eB({type:Boolean,reflect:!0})],cJ.prototype,"disabled",2),cQ([eB({reflect:!0})],cJ.prototype,"href",2),cQ([eB({reflect:!0})],cJ.prototype,"role",2),cJ=cQ([eL("menu-item")],cJ);var c0=Object.defineProperty,c1=Object.getOwnPropertyDescriptor;let c2=class extends lit_element_i{firstUpdated(e){this.role="listbox"}render(){return e$`<slot></slot>`}};c2.styles=[r8,F`
			:host {
				width: max-content;
				background-color: var(--vscode-menu-background);
				border: 1px solid var(--vscode-menu-border);
				padding-bottom: 0.6rem;
			}
		`],c2=((e,t,i,r)=>{for(var o,s=r>1?void 0:r?c1(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&c0(t,i,s),s})([eL("menu-list")],c2);var c5=Object.defineProperty,c3=Object.getOwnPropertyDescriptor,c6=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?c3(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&c5(t,i,s),s};let c4=class extends GlTreeBase{constructor(){super(...arguments),this.review=!1,this.generateBusy=!1,this.creationBusy=!1,this.onDebounceTitleInput=iv(this.onTitleInput,500),this.onDebounceDescriptionInput=iv(this.onDescriptionInput,500)}get create(){return this.state.create}get createChanges(){return Object.values(this.create.changes)}get createEntries(){return Object.entries(this.create.changes)}get hasWipChanges(){return this.createChanges.some(e=>e?.type==="wip")}get selectedChanges(){return 1===this.createChanges.length?this.createEntries:this.createEntries.filter(([,e])=>!1!==e.checked)}get canSubmit(){return null!=this.create.title&&this.create.title.length>0&&this.selectedChanges.length>0}get fileLayout(){return this.state?.preferences?.files?.layout??"auto"}get isCompact(){return this.state?.preferences?.files?.compact??!0}get filesModified(){return function(e,t){if(null==e)return 0;let i=0;for(let r of e)i+=t(r);return i}(this.createChanges,e=>e.files?.length??0)}get draftVisibility(){return this.state?.create?.visibility??"public"}updated(e){e.has("state")&&(this.creationBusy=!1),e.has("generate")&&(this.generateBusy=!1,this.generateAiButton.scrollIntoView())}firstUpdated(){window.requestAnimationFrame(()=>{this.titleInput.focus()})}renderUserSelection(e){let t=e.pendingRole,i=new Map([["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),r=i.get(t);return e$`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${e.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${e.member.name??e.member.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
						<gl-button slot="anchor">${r} <code-icon icon="chevron-down"></code-icon></gl-button>
						<menu-list slot="content">
							${function*(e,t){if(void 0!==e){let i=0;for(let r of e)yield t(r,i++)}}(i,([i,r])=>e$`<menu-item
										@click=${t=>this.onChangeSelectionRole(t,e,i)}
									>
										<code-icon
											icon="check"
											class="user-selection__check ${t===i?"is-active":""}"
										></code-icon>
										${r}
									</menu-item>`)}
						</menu-list>
					</gl-popover>
				</div>
			</div>
		`}renderUserSelectionList(){if(this.state?.create?.userSelections!=null&&this.state?.create?.userSelections.length!==0)return e$`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${nM(this.state.create.userSelections,e=>e.member.id,e=>this.renderUserSelection(e))}
				</div>
			</div>
		`}renderForm(){let e;switch(this.draftVisibility){case"private":e="organization";break;case"invite_only":e="lock";break;default:e="globe"}let t=this.review?"Code Suggestion":"Cloud Patch",i=this.review?"Code Suggestions":"Cloud Patches";return e$`
			<div class="section section--action">
				${eq(this.state?.create?.creationError!=null,()=>e$` <div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.state.create.creationError}</p>
						</div>`)}
				${eq(!1===this.review,()=>e$`
						<div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${e}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===this.draftVisibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===this.draftVisibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===this.draftVisibility}>
										Collaborators only
									</option>
								</select>
								<span class="message-input__select-caret"
									><code-icon icon="chevron-down"></code-icon
								></span>
							</div>
							<gl-button appearance="secondary" @click=${this.onInviteUsers}
								><code-icon icon="person-add" slot="prefix"></code-icon> Invite</gl-button
							>
						</div>
						${this.renderUserSelectionList()}
					`)}
				<div class="message-input message-input--with-menu">
					<input
						id="title"
						type="text"
						class="message-input__control"
						placeholder="Title (required)"
						maxlength="100"
						.value=${this.create.title??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceTitleInput(e)}
					/>
					${eq(this.state?.orgSettings.ai===!0&&this.state?.preferences.aiEnabled===!0,()=>e$`<div class="message-input__menu">
								<gl-button
									id="generate-ai"
									appearance="toolbar"
									density="compact"
									tooltip="Generate Title and Description..."
									@click=${e=>this.onGenerateTitleClick(e)}
									?disabled=${this.generateBusy}
									><code-icon
										icon=${this.generateBusy?"loading":"sparkle"}
										modifier="${this.generateBusy?"spin":""}"
									></code-icon
								></gl-button>
							</div>`)}
				</div>

				${eq(this.generate?.error!=null,()=>e$`
						<div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.generate.error.message??"Error retrieving content"}</p>
						</div>
					`)}
				<div class="message-input">
					<textarea
						id="desc"
						class="message-input__control"
						placeholder="Description (optional)"
						maxlength="10000"
						.value=${this.create.description??""}
						?disabled=${this.generateBusy}
						@input=${e=>this.onDebounceDescriptionInput(e)}
					></textarea>
				</div>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button ?disabled=${this.creationBusy} full @click=${e=>this.onCreateAll(e)}
							>Create ${t}</gl-button
						>
					</span>
				</p>
				${eq(!0===this.review,()=>e$`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${()=>this.onCancel()}
									>Cancel</gl-button
								>
							</span>
						</p>
					`)}
				${eq(this.state?.orgSettings.byob===!1,()=>e$`<p class="h-deemphasize">
							<code-icon icon="lock"></code-icon>
							<a
								href="${cH.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${i}</a
							>
							are
							<a
								href="https://help.gitkraken.com/gitlens/security"
								title="Learn more about GitKraken security"
								aria-label="Learn more about GitKraken security"
								>securely stored</a
							>
							by GitKraken.
						</p>`,()=>e$`<p class="h-deemphasize">
							<code-icon icon="info"></code-icon>
							Your
							<a
								href="${cH.cloudPatches}"
								title="Learn more about ${i}"
								aria-label="Learn more about ${i}"
								>${t}</a
							>
							will be securely stored in your organization's self-hosted storage
						</p>`)}
			</div>
		`}render(){return e$`
			<div class="pane-groups">
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">${this.renderForm()}</div>
			</div>
		`}renderChangedFiles(){return e$`
			<webview-pane class="h-no-border" expanded>
				<span slot="title">${this.review?"Changes to Suggest":"Changes to Include"}</span>
				<action-nav slot="actions">${this.renderLayoutAction(this.fileLayout)}</action-nav>

				${eq(null!=this.validityMessage,()=>e$`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${eq(null==this.create.changes,()=>this.renderLoading(),()=>this.renderTreeViewWithModel())}
				</div>
			</webview-pane>
		`}onTreeItemChecked(e){if(null==e.detail.context||e.detail.context.length<1)return;let[t,i]=e.detail.context,r=e.detail.checked;"unstaged"===i&&(r=!!e.detail.checked||"staged");let o=this.getChangeForRepo(t);null==o||o.checked!==r&&(o.checked=r,this.requestUpdate("state"),this.emit("gl-patch-create-repo-checked",{repoUri:t,checked:r}))}onTreeItemSelected(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-compare-previous",{...t})}renderTreeViewWithModel(){if(null==this.createChanges||0===this.createChanges.length)return this.renderTreeView([{label:"No changes",path:"",level:1,branch:!1,checkable:!1,expanded:!0,checked:!1}]);let e=[],t=this.createChanges.length>1,i=this.isTree(this.filesModified??0),r=this.isCompact;if(t)for(let t of this.createChanges){let o=this.getTreeForChange(t,!0,i,r);null!=o&&e.push(...o)}else{let t=this.createChanges[0],o=this.getTreeForChange(t,!1,i,r);null!=o&&e.push(...o)}return this.renderTreeView(e,this.state?.preferences?.indentGuides)}getTreeForChange(e,t=!1,i=!1,r=!0){if(null==e.files||0===e.files.length)return;let o=[];if("wip"===e.type){let s=[],a=[];for(let t of e.files)t.staged?s.push(t):a.push(t);0===s.length||0===a.length?o.push(...this.renderFiles(e.files,i,r,t?2:1)):(a.length&&o.push({label:"Unstaged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!0===e.checked,context:[e.repository.uri,"unstaged"],children:this.renderFiles(a,i,r,t?3:2)}),s.length&&o.push({label:"Staged Changes",path:"",level:t?2:1,branch:!0,checkable:!0,expanded:!0,checked:!1!==e.checked,disableCheck:!0,children:this.renderFiles(s,i,r,t?3:2)}))}else o.push(...this.renderFiles(e.files,i,r));if(!t)return o;let s=this.repoToTreeModel(e.repository.name,e.repository.uri,{branch:!0,checkable:!0,checked:!1!==e.checked});return s.children=o,[s]}isTree(e){return"auto"===this.fileLayout?e>(this.state?.preferences?.files?.threshold??5):"tree"===this.fileLayout}createPatch(){if(!this.canSubmit){0===this.titleInput.value.length?(this.titleInput.setCustomValidity("Title is required"),this.titleInput.reportValidity(),this.titleInput.focus()):this.titleInput.setCustomValidity(""),null==this.selectedChanges||0===this.selectedChanges.length?this.validityMessage="Check at least one change":this.validityMessage=void 0;return}this.validityMessage=void 0,this.titleInput.setCustomValidity("");let e=this.selectedChanges.reduce((e,[t,i])=>(e[t]=i,e),{}),t={title:this.create.title??"",description:this.create.description,changesets:e,visibility:this.create.visibility,userSelections:this.create.userSelections};this.emit("gl-patch-create-patch",t)}onCreateAll(e){this.createPatch(),this.state?.create&&(this.creationBusy=!0)}onSelectCreateOption(e){}getChangeForRepo(e){return this.create.changes[e]}onTitleInput(e){this.create.title=this.titleInput.value,this.fireMetadataUpdate()}onDescriptionInput(e){this.create.description=this.descInput.value,this.fireMetadataUpdate()}onInviteUsers(e){this.emit("gl-patch-create-invite-users")}onChangeSelectionRole(e,t,i){this.emit("gl-patch-create-update-selection",{selection:t,role:i});let r=e.target?.closest("gl-popover");r?.hide()}onVisibilityChange(e){this.create.visibility=e.target.value,this.fireMetadataUpdate()}onGenerateTitleClick(e){this.generateBusy=!0,this.emit("gl-patch-generate-title",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}fireMetadataUpdate(){this.emit("gl-patch-create-update-metadata",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}createRenderRoot(){return this}onTreeItemActionClicked(e){if(e.detail.context&&e.detail.action)switch(e.detail.action.action){case"show-patch-in-graph":this.onShowInGraph(e);break;case"file-open":this.onOpenFile(e);break;case"file-stage":this.onStageFile(e);break;case"file-unstage":this.onUnstageFile(e)}}onOpenFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-open",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onStageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-stage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onUnstageFile(e){if(!e.detail.context)return;let[t]=e.detail.context;this.emit("gl-patch-file-unstage",{...t,showOptions:{preview:!e.detail.dblClick,viewColumn:e.detail.altKey?-2:void 0}})}onShowInGraph(e){}onCancel(){this.emit("gl-patch-create-cancelled")}getFileActions(e,t){let i={icon:"go-to-file",label:"Open file",action:"file-open"};return this.review?[i]:!0===e.staged?[i,{icon:"remove",label:"Unstage changes",action:"file-unstage"}]:[i,{icon:"plus",label:"Stage changes",action:"file-stage"}]}getRepoActions(e,t,i){return[{icon:"gl-graph",label:"Open in Commit Graph",action:"show-patch-in-graph"}]}};c6([eB({type:Object})],c4.prototype,"state",2),c6([eB({type:Boolean})],c4.prototype,"review",2),c6([eB({type:Object})],c4.prototype,"generate",2),c6([eF()],c4.prototype,"generateBusy",2),c6([eF()],c4.prototype,"creationBusy",2),c6([eN("#title")],c4.prototype,"titleInput",2),c6([eN("#desc")],c4.prototype,"descInput",2),c6([eN("#generate-ai")],c4.prototype,"generateAiButton",2),c6([eF()],c4.prototype,"validityMessage",2),c4=c6([eL("gl-patch-create")],c4);var c7=Object.defineProperty,c8=Object.getOwnPropertyDescriptor,c9=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?c8(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&c7(t,i,s),s};let he=class extends GlElement{get patchCreateState(){return{preferences:this.preferences,orgSettings:this.orgSettings,create:this.createState}}render(){return e$`<gl-patch-create
			.state=${this.patchCreateState}
			.generate=${this.generate}
			review
			@gl-patch-file-compare-working=${e=>{}}
			@gl-patch-create-update-metadata=${e=>{}}
		></gl-patch-create>`}};he.styles=[cN,F`
			:host {
				flex: 1;
			}

			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			a {
				color: var(--vscode-textLink-foreground);
				text-decoration: none;
			}
			a:hover {
				text-decoration: underline;
			}

			gl-patch-create {
				height: 100%;
				display: block;
			}

			.pane-groups {
				display: flex;
				flex-direction: column;
				height: 100%;
			}
			.pane-groups__group {
				min-height: 0;
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}
			.pane-groups__group webview-pane {
				flex: none;
			}
			.pane-groups__group webview-pane[expanded] {
				min-height: 0;
				flex: 1;
			}

			.pane-groups__group-fixed {
				flex: none;
			}
			.pane-groups__group-fixed webview-pane::part(content) {
				overflow: visible;
			}

			.section {
				padding: 0 var(--gitlens-scrollbar-gutter-width) 1.5rem var(--gitlens-gutter-width);
			}
			.section > :first-child {
				margin-top: 0;
			}
			.section > :last-child {
				margin-bottom: 0;
			}

			.section--action {
				border-top: 1px solid var(--vscode-sideBarSectionHeader-border);
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
			}
			.section--action > :first-child {
				padding-top: 0;
			}

			/* TODO: these form styles should be moved to a common location */
			.message-input {
				padding-top: 0.8rem;
			}

			.message-input__control {
				flex: 1;
				border: 1px solid var(--vscode-input-border);
				background: var(--vscode-input-background);
				padding: 0.5rem;
				font-size: 1.3rem;
				line-height: 1.4;
				width: 100%;
				border-radius: 0.2rem;
				color: var(--vscode-input-foreground);
				font-family: inherit;
			}

			.message-input__control::placeholder {
				color: var(--vscode-input-placeholderForeground);
			}

			.message-input__control:invalid {
				border-color: var(--vscode-inputValidation-errorBorder);
				background-color: var(--vscode-inputValidation-errorBackground);
			}

			.message-input__control:focus {
				outline: 1px solid var(--vscode-focusBorder);
				outline-offset: -1px;
			}

			.message-input__control:disabled {
				opacity: 0.4;
				cursor: not-allowed;
				pointer-events: none;
			}

			.message-input__control--text {
				overflow: hidden;
				white-space: nowrap;
				opacity: 0.7;
			}

			.message-input__action {
				flex: none;
			}

			.message-input__select {
				flex: 1;
				position: relative;
				display: flex;
				align-items: stretch;
			}
			.message-input__select-icon {
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				width: 2.4rem;
				height: 100%;
				align-items: center;
				justify-content: center;
				pointer-events: none;
				color: var(--vscode-foreground);
			}
			.message-input__select-caret {
				position: absolute;
				right: 0;
				top: 0;
				display: flex;
				width: 2.4rem;
				height: 100%;
				align-items: center;
				justify-content: center;
				pointer-events: none;
				color: var(--vscode-foreground);
			}

			.message-input__select .message-input__control {
				box-sizing: border-box;
				appearance: none;
				padding-left: 2.4rem;
				padding-right: 2.4rem;
			}

			.message-input__menu {
				position: absolute;
				top: 0.8rem;
				right: 0;
			}

			.section--action > :first-child .message-input__menu {
				top: 0;
			}

			.message-input--group {
				display: flex;
				flex-direction: row;
				align-items: stretch;
				gap: 0.6rem;
			}

			.message-input--with-menu {
				position: relative;
			}

			textarea.message-input__control {
				resize: vertical;
				min-height: 4rem;
				max-height: 40rem;
			}

			.user-selection-container {
				max-height: (2.4rem * 4);
				overflow: auto;
			}

			.user-selection {
				--gl-avatar-size: 2rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.4rem;
				height: 2.4rem;
			}
			.user-selection__avatar {
				flex: none;
			}

			.user-selection__info {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
			}

			.user-selection__name {
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.user-selection__actions {
				flex: none;
				color: var(--gl-patch-ghost-color);
			}
			.user-selection__actions gl-button::part(base) {
				padding-right: 0;
				padding-block: 0.4rem;
			}

			.user-selection__actions gl-button code-icon {
				pointer-events: none;
			}

			.user-selection__check:not(.is-active) {
				opacity: 0;
			}

			.alert {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0.8rem 1.2rem;
				line-height: 1.2;
				background-color: var(--color-alert-errorBackground);
				border-left: 0.3rem solid var(--color-alert-errorBorder);
				color: var(--color-alert-foreground);
			}

			.alert code-icon {
				margin-right: 0.4rem;
				vertical-align: baseline;
			}

			.alert__content {
				font-size: 1.2rem;
				line-height: 1.2;
				text-align: left;
				margin: 0;
			}
		`],c9([eB({type:Object})],he.prototype,"orgSettings",2),c9([eB({type:Object})],he.prototype,"preferences",2),c9([eB({type:Object})],he.prototype,"generate",2),c9([eB({type:Object})],he.prototype,"createState",2),he=c9([eL("gl-inspect-patch")],he);var ht=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,hr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hi(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ht(t,i,s),s};let ho=class extends GlDetailsBase{constructor(){super(...arguments),this.tab="wip",this.experimentalComposerEnabled=!1,this.patchCreateMetadata={title:void 0,description:void 0}}get inReview(){return this.draftState?.inReview??!1}get isUnpublished(){let e=this.wip?.branch;return e?.upstream==null||!0===e.upstream.missing}get draftsEnabled(){return this.orgSettings?.drafts===!0}get filesCount(){return this.files?.length??0}get branchState(){let e=this.wip?.branch;if(null!=e)return{ahead:e.tracking?.ahead??0,behind:e.tracking?.behind??0}}get patchCreateState(){let e=this.wip,t=e.repo.uri,i={type:"wip",repository:{name:e.repo.name,path:e.repo.path,uri:e.repo.uri},revision:{to:cI,from:"HEAD"},files:e.changes?.files??[],checked:!0};return{...this.patchCreateMetadata,changes:{[t]:i},creationError:void 0,visibility:"public",userSelections:void 0}}updated(e){super.updated(e),null!=this.wip&&e.has("generate")&&(this.patchCreateMetadata={title:this.generate?.title??this.patchCreateMetadata.title,description:this.generate?.description??this.patchCreateMetadata.description})}get filesChangedPaneLabel(){return"Working Changes"}renderChangedFilesActions(){if(this.files?.length)return e$`<div class="section section--actions">
			<button-container>
				<gl-button
					full
					.href=${nt("gitlens.composeCommits",{repoPath:this.wip?.repo.path,source:"inspect"})}
					><code-icon icon="wand" slot="prefix"></code-icon>Compose Commits...<span slot="tooltip"
						><strong>Compose Commits</strong> (Preview)<br /><i
							>Automatically or interactively organize changes into meaningful commits</i
						></span
					></gl-button
				>
				<gl-button appearance="secondary" href="command:workbench.view.scm" tooltip="Commit via SCM"
					><code-icon rotate="45" icon="arrow-up"></code-icon
				></gl-button>
			</button-container>
		</div>`}renderSecondaryAction(e=!0){if(!this.draftsEnabled||this.inReview)return;let t="Share as Cloud Patch",r="create-patch",o=this.pullRequest;return o?.state==="opened"&&function(e,t){let r;return null==e&&null==t||null!=e&&null!=t&&0==(0===(r=(i??=new Intl.Collator(void 0,{sensitivity:"accent"})).compare(e,t))?0:r>0?1:-1)}(o.provider.domain,"github.com")?(this.inReview?(t="Close Suggestion for PR",r="end-patch-review"):(t="Suggest Changes for PR",r="start-patch-review"),(this.wip?.changes?.files.length??0)===0)?e$`
					<gl-button
						?full=${!e}
						appearance="secondary"
						data-action="${r}"
						@click=${()=>this.onToggleReviewMode(!this.inReview)}
						.tooltip=${e?t:void 0}
					>
						<code-icon icon="gl-code-suggestion" .slot=${!e?"prefix":eP}></code-icon
						>${!e?t:eP}
					</gl-button>
				`:e$`
				<gl-button
					?full=${!e}
					appearance="secondary"
					data-action="${r}"
					.tooltip=${e?t:void 0}
					@click=${()=>this.onToggleReviewMode(!this.inReview)}
				>
					<code-icon icon="gl-code-suggestion" .slot=${!e?"prefix":eP}></code-icon
					>${!e?t:eP}
				</gl-button>
				<gl-button
					appearance="secondary"
					density="compact"
					data-action="create-patch"
					tooltip="Share as Cloud Patch"
					@click=${()=>this.onDataActionClick("create-patch")}
				>
					<code-icon icon="gl-cloud-patch-share"></code-icon>
				</gl-button>
			`:(this.wip?.changes?.files.length??0)!==0?e$`
			<gl-button
				?full=${!e}
				appearance="secondary"
				data-action="${r}"
				.tooltip=${e?t:void 0}
				@click=${()=>this.onDataActionClick(r)}
			>
				<code-icon icon="gl-cloud-patch-share" .slot=${!e?"prefix":eP}></code-icon
				>${!e?t:eP}
			</gl-button>
		`:void 0}renderPrimaryAction(){if(this.isUnpublished)return e$`
				<gl-button full data-action="publish-branch" @click=${()=>this.onDataActionClick("publish-branch")}>
					<code-icon icon="cloud-upload" slot="prefix"></code-icon>Publish Branch<span slot="tooltip"
						>Publish (push) <strong>${this.wip?.branch?.name}</strong> to
						${this.wip?.branch?.upstream?.name??"a remote"}</span
					>
				</gl-button>
			`;if(null==this.branchState)return;let{ahead:e,behind:t}=this.branchState;if(0===e&&0===t)return;let i=t>0?"Pull":e>0?"Push":"Fetch";return e$`
			<gl-button
				full
				data-action="${i.toLowerCase()}"
				@click=${()=>this.onDataActionClick(i.toLowerCase())}
			>
				<code-icon icon="${t>0?"repo-pull":e>0?"repo-push":"repo-fetch"}" slot="prefix"></code-icon> ${i}
				<gl-tracking-pill .ahead=${e} .behind=${t} slot="suffix"></gl-tracking-pill>
				<span slot="tooltip">${t>0?"Pull from":e>0?"Push to":"Fetch from"} <strong>${this.wip?.branch?.upstream?.name}</strong></span>
			</gl-button>
		`}renderActions(){let e=this.renderPrimaryAction(),t=this.renderSecondaryAction(null!=e);return null==e&&null==t?eP:e$`<div class="section section--actions">
			<button-container>${e}${t}</button-container>
		</div>`}renderSuggestedChanges(){return this.codeSuggestions?.length?e$`
			<gl-tree>
				<gl-tree-item branch .expanded=${!0} .level=${0}>
					<code-icon slot="icon" icon="gl-code-suggestion"></code-icon>
					Code Suggestions
				</gl-tree-item>
				${nM(this.codeSuggestions,e=>e.id,e=>e$`
						<gl-tree-item
							.expanded=${!0}
							.level=${1}
							@gl-tree-item-selected=${()=>this.onShowCodeSuggestion(e.id)}
						>
							<gl-avatar
								class="author-icon"
								src="${e.author.avatarUri}"
								name="${e.author.name} (author)"
							></gl-avatar>
							${e.title}
							<span slot="description"
								><formatted-date .date=${new Date(e.updatedAt)}></formatted-date
							></span>
						</gl-tree-item>
					`)}
			</gl-tree>
		`:eP}renderPullRequest(){return null==this.pullRequest?eP:e$`
			<webview-pane
				collapsable
				flexible
				?expanded=${this.preferences?.pullRequestExpanded??!0}
				data-region="pullrequest-pane"
			>
				<span slot="title">Pull Request #${this.pullRequest?.id}</span>
				<action-nav slot="actions">
					<action-item
						label="Open Pull Request Changes"
						icon="diff-multiple"
						@click=${()=>this.onDataActionClick("open-pr-changes")}
					></action-item>
					<action-item
						label="Compare Pull Request"
						icon="compare-changes"
						@click=${()=>this.onDataActionClick("open-pr-compare")}
					></action-item>
					<action-item
						label="Open Pull Request on Remote"
						icon="globe"
						@click=${()=>this.onDataActionClick("open-pr-remote")}
					></action-item>
				</action-nav>
				<div class="section">
					<issue-pull-request
						type="pr"
						name="${this.pullRequest.title}"
						url="${this.pullRequest.url}"
						identifier="#${this.pullRequest.id}"
						status="${this.pullRequest.state}"
						.date=${this.pullRequest.updatedDate}
						.dateFormat="${this.preferences?.dateFormat}"
						.dateStyle="${this.preferences?.dateStyle}"
						details
					></issue-pull-request>
				</div>
				${this.renderSuggestedChanges()}
			</webview-pane>
		`}renderIncomingOutgoing(){return null==this.branchState||0===this.branchState.ahead&&0===this.branchState.behind?eP:e$`
			<webview-pane collapsable>
				<span slot="title">Incoming / Outgoing</span>
				<gl-tree>
					<gl-tree-item branch .expanded=${!1}>
						<code-icon slot="icon" icon="arrow-circle-down"></code-icon>
						Incoming Changes
						<span slot="decorations">${this.branchState.behind??0}</span>
					</gl-tree-item>
					<gl-tree-item branch .expanded=${!1}>
						<code-icon slot="icon" icon="arrow-circle-up"></code-icon>
						Outgoing Changes
						<span slot="decorations">${this.branchState.ahead??0}</span>
					</gl-tree-item>
				</gl-tree>
			</webview-pane>
		`}renderPatchCreation(){return this.inReview?e$`<gl-inspect-patch
			.orgSettings=${this.orgSettings}
			.preferences=${this.preferences}
			.generate=${this.generate}
			.createState=${this.patchCreateState}
			@gl-patch-create-patch=${e=>{this.dispatchEvent(new CustomEvent("gl-inspect-create-suggestions",{detail:e.detail}))}}
		></gl-inspect-patch>`:eP}render(){return null==this.wip?eP:e$`
			${this.renderActions()}
			<webview-pane-group flexible>
				${this.renderPullRequest()}
				${eq(!1===this.inReview,()=>this.renderChangedFiles("wip"))}${this.renderPatchCreation()}
			</webview-pane-group>
		`}getFileActions(e,t){let i={icon:"go-to-file",label:"Open file",action:"file-open"};return!0===e.staged?[i,{icon:"remove",label:"Unstage changes",action:"file-unstage"}]:[i,{icon:"plus",label:"Stage changes",action:"file-stage"}]}getFileContextData(e){if(this.wip?.repo?.path)return tq({webviewItem:e.staged?"gitlens:file+staged":"gitlens:file+unstaged",webviewItemValue:{type:"file",path:e.path,repoPath:this.wip.repo.path,sha:cI,staged:e.staged,status:e.status}})}onDataActionClick(e){this.dispatchEvent(new CustomEvent("data-action",{detail:{name:e}}))}onToggleReviewMode(e){this.dispatchEvent(new CustomEvent("draft-state-changed",{detail:{inReview:e}}))}onShowCodeSuggestion(e){this.dispatchEvent(new CustomEvent("gl-show-code-suggestion",{detail:{id:e}}))}};ho.styles=[F`
			:host {
				--gl-avatar-size: 1.6rem;
			}
		`],hr([eB({type:Object})],ho.prototype,"wip",2),hr([eB({type:Object})],ho.prototype,"pullRequest",2),hr([eB({type:Array})],ho.prototype,"codeSuggestions",2),hr([eB({type:Object})],ho.prototype,"draftState",2),hr([eB({type:Object})],ho.prototype,"generate",2),hr([eB({type:Boolean})],ho.prototype,"experimentalComposerEnabled",2),hr([eF()],ho.prototype,"inReview",1),hr([eF()],ho.prototype,"patchCreateMetadata",2),ho=hr([eL("gl-wip-details")],ho);let hs=F`
	.commit-action {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		border-radius: 0.25em;
		color: inherit;
		padding: 0.2rem;
		vertical-align: middle;
		text-decoration: none;
		gap: 0.2rem;
	}

	.commit-action > * {
		pointer-events: none;
	}

	.commit-action:focus {
		outline: 1px solid var(--vscode-focusBorder);
		outline-offset: -1px;
	}

	.commit-action:hover {
		color: var(--vscode-foreground);
		text-decoration: none;
	}

	:host-context(.vscode-dark) .commit-action:hover,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .commit-action:hover {
		background-color: var(--color-background--lighten-15);
	}
	:host-context(.vscode-light) .commit-action:hover,
	:host-context(.vscode-high-contrast-light) .commit-action:hover {
		background-color: var(--color-background--darken-15);
	}

	:host-context(.vscode-dark) .commit-action.is-active,
	:host-context(.vscode-high-contrast:not(.vscode-high-contrast-light)) .commit-action.is-active {
		background-color: var(--color-background--lighten-10);
	}
	:host-context(.vscode-light) .commit-action.is-active,
	:host-context(.vscode-high-contrast-light) .commit-action.is-active {
		background-color: var(--color-background--darken-10);
	}

	.commit-action.is-disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.commit-action.is-hidden {
		display: none;
	}

	.commit-action--emphasis-low:not(:hover, :focus, :active) {
		opacity: 0.5;
	}

	.pr--opened {
		color: var(--vscode-gitlens-openPullRequestIconColor);
	}
	.pr--closed {
		color: var(--vscode-gitlens-closedPullRequestIconColor);
	}
	.pr--merged {
		color: var(--vscode-gitlens-mergedPullRequestIconColor);
	}
`;var hn=Object.defineProperty,ha=Object.getOwnPropertyDescriptor,hl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ha(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hn(t,i,s),s};let hc=class extends lit_element_i{constructor(){super(...arguments),this.pinned=!1,this.uncommitted=!1,this.shortSha=""}get navigationState(){if(null==this.navigation)return{back:!1,forward:!1};let e={back:!0,forward:!0};return this.navigation.count<=1?(e.back=!1,e.forward=!1):0===this.navigation.position?(e.back=!0,e.forward=!1):this.navigation.position===this.navigation.count-1&&(e.back=!1,e.forward=!0),e}handleAction(e){let t=e.target,i=t.dataset.action;if(null!=i)if("commit-actions"===i){let i=e instanceof MouseEvent&&e.altKey;this.fireEvent("commit-actions",{action:t.dataset.actionType,alt:i})}else this.fireEvent(i)}fireEvent(e,t){this.dispatchEvent(new CustomEvent(`gl-${e}`,{detail:t}))}render(){let e=this.pinned?e$`Unpin this Commit<br />Restores Automatic Following`:e$`Pin this Commit<br />Suspends Automatic Following`,t="Forward",i="Back";return this.navigation?.hint&&(this.pinned?i+=` - ${this.navigation.hint}`:t+=` - ${this.navigation.hint}`),e$`
			<div class="group">
				${eq(!this.uncommitted,()=>e$`
						<gl-tooltip hoist>
							<a
								class="commit-action"
								href="#"
								data-action="commit-actions"
								data-action-type="sha"
								@click=${this.handleAction}
							>
								<code-icon
									icon="${null!=this.stashNumber?"gl-stashes-view":"git-commit"}"
								></code-icon>
								<span class="sha" data-region="shortsha"
									>${null!=this.stashNumber?`#${this.stashNumber}`:this.shortSha}</span
								>
							</a>
							<span slot="content"
								>Copy ${null!=this.stashNumber?"Stash Name":"SHA"}<br />[${ng()}]
								Copy Message</span
							>
						</gl-tooltip>
					`)}
			</div>
			<div class="group">
				<gl-tooltip hoist
					><a
						class="commit-action${this.pinned?" is-active":""}"
						href="#"
						data-action="pin"
						@click=${this.handleAction}
						><code-icon
							icon="${this.pinned?"gl-pinned-filled":"pin"}"
							data-region="commit-pin"
						></code-icon></a
					><span slot="content">${e}</span></gl-tooltip
				>
				<gl-tooltip hoist content="${i}"
					><a
						class="commit-action${this.navigationState.back?"":" is-disabled"}"
						aria-disabled="${this.navigationState.back?"false":"true"}"
						href="#"
						data-action="back"
						@click=${this.handleAction}
						><code-icon icon="arrow-left" data-region="commit-back"></code-icon></a
				></gl-tooltip>
				${eq(this.navigationState.forward,()=>e$`
						<gl-tooltip hoist content="${t}"
							><a class="commit-action" href="#" data-action="forward" @click=${this.handleAction}
								><code-icon icon="arrow-right" data-region="commit-forward"></code-icon></a
						></gl-tooltip>
					`)}
				<!-- TODO: add a spacer -->
				${eq(this.uncommitted,()=>e$`
						<gl-tooltip hoist content="Open SCM view"
							><a
								class="commit-action"
								href="#"
								data-action="commit-actions"
								data-action-type="scm"
								@click=${this.handleAction}
								><code-icon icon="source-control"></code-icon></a
						></gl-tooltip>
					`)}
				<gl-tooltip hoist content="Open in Commit Graph"
					><a
						class="commit-action"
						href="#"
						data-action="commit-actions"
						data-action-type="graph"
						@click=${this.handleAction}
						><code-icon icon="gl-graph"></code-icon></a
				></gl-tooltip>
				${eq(!this.uncommitted,()=>e$`
						<gl-tooltip hoist content="Show Commit Actions"
							><a
								class="commit-action"
								href="#"
								data-action="commit-actions"
								data-action-type="more"
								@click=${this.handleAction}
								><code-icon icon="kebab-vertical"></code-icon></a
						></gl-tooltip>
					`)}
			</div>
		`}};hc.styles=[hs,F`
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				gap: 0.2rem;
			}

			:host([pinned]) {
				background-color: var(--color-alert-warningBackground);
				box-shadow: 0 0 0 0.1rem var(--color-alert-warningBorder);
				color: var(--color-alert-warningForeground);
				border-radius: 0.3rem;
			}

			:host([pinned]) .commit-action:hover,
			:host([pinned]) .commit-action.is-active {
				background-color: var(--color-alert-warningHoverBackground);
			}

			.group {
				display: flex;
				flex: none;
				flex-direction: row;
				max-width: 100%;
			}

			.group:last-child {
				margin-inline-start: auto;
			}

			.sha {
				margin: 0 0.5rem 0 0.25rem;
			}
		`],hl([eB({type:Boolean,reflect:!0})],hc.prototype,"pinned",2),hl([eB({type:Boolean})],hc.prototype,"uncommitted",2),hl([eB({type:Object})],hc.prototype,"navigation",2),hl([eB()],hc.prototype,"shortSha",2),hl([eB()],hc.prototype,"stashNumber",2),hc=hl([eL("gl-inspect-nav")],hc);var hh=Object.defineProperty,hd=Object.getOwnPropertyDescriptor,hp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hd(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hh(t,i,s),s};let hu=class extends lit_element_i{render(){if(null==this.wip)return eP;let e=this.wip.changes,t=this.wip.branch;if(null==e||null==t)return eP;let i="git-pull-request";if(this.pullRequest?.state)switch(this.pullRequest.state){case"merged":i="git-merge";break;case"closed":i="git-pull-request-closed"}return e$`
			<div class="group">
				${eq(null!=this.pullRequest,()=>e$`<gl-popover hoist>
							<a href="#" class="commit-action" slot="anchor"
								><code-icon icon=${i} class="pr pr--${this.pullRequest.state}"></code-icon
								><span>#${this.pullRequest.id}</span></a
							>
							<div slot="content">
								<issue-pull-request
									type="pr"
									name="${this.pullRequest.title}"
									url="${this.pullRequest.url}"
									identifier="#${this.pullRequest.id}"
									status="${this.pullRequest.state}"
									.date=${this.pullRequest.updatedDate}
									.dateFormat="${this.preferences?.dateFormat}"
									.dateStyle="${this.preferences?.dateStyle}"
									details
								></issue-pull-request>
							</div>
						</gl-popover>`)}
				<gl-tooltip hoist class="tooltip--overflowed">
					<a
						href="#"
						class="commit-action commit-action--overflowed"
						@click=${e=>this.handleAction(e,"switch")}
					>
						${eq(null==this.pullRequest,()=>e$`<code-icon icon="git-branch"></code-icon>`)}<span
							class="branch"
							>${t.name}</span
						><code-icon icon="chevron-down" size="10"></code-icon
					></a>
					<div slot="content">
						Switch to Another Branch...
						<hr />
						<code-icon icon="git-branch"></code-icon><span class="md-code">${this.wip.branch?.name}</span>
					</div>
				</gl-tooltip>
			</div>
			<div class="group">
				<gl-tooltip hoist content="Fetch">
					<a href="#" class="commit-action" @click=${e=>this.handleAction(e,"fetch")}
						><code-icon icon="repo-fetch"></code-icon></a
				></gl-tooltip>
			</div>
		`}handleAction(e,t){let i=e instanceof MouseEvent&&e.altKey;this.dispatchEvent(new CustomEvent("gl-branch-action",{detail:{action:t,alt:i}}))}};hu.styles=[hs,F`
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			:host {
				display: flex;
				flex-direction: row;
				/* flex-wrap: wrap; */
				align-items: center;
				justify-content: space-between;
				gap: 0.2rem;
			}

			.tooltip--overflowed {
				min-width: 0;
			}

			.commit-action--overflowed {
				width: 100%;
			}

			.branch {
				min-width: 0;
				max-width: fit-content;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.group {
				display: flex;
				flex: none;
				flex-direction: row;
				min-width: 0;
				max-width: 100%;
			}

			.group:first-child {
				min-width: 0;
				flex: 0 1 auto;
			}

			hr {
				border: none;
				border-top: 1px solid var(--color-foreground--25);
			}

			.md-code {
				background: var(--vscode-textCodeBlock-background);
				border-radius: 3px;
				padding: 0px 4px 2px 4px;
				font-family: var(--vscode-editor-font-family);
			}
		`],hp([eB({type:Object})],hu.prototype,"wip",2),hp([eB({type:Object})],hu.prototype,"pullRequest",2),hp([eB({type:Object})],hu.prototype,"preferences",2),hu=hp([eL("gl-status-nav")],hu);var hg=Object.defineProperty,hf=Object.getOwnPropertyDescriptor,hm=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hf(t,i):t,a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hg(t,i,s),s};let hb="0000000000000000000000000000000000000000",hv=class extends SignalWatcherWebviewApp{constructor(){super(...arguments),this._host=c??=rv(),this._state=function(e){let{signal:t,persisted:i,resetAll:r,startAutoPersist:o,dispose:s}=function(e){let t,i=e?.storage,r=e?.version,o=e?.restoreKey;function s(){if(null==i)return;let t=i.get();if(null==t)return;let s=t.__v,a=t[rV];if(null==o||a===o)return null!=r&&s!==r&&(t=e?.migrate?.(t,s)??void 0),t}let a=s(),c=[],h=[],p=!1;function g(){if(p=!1,t?.getPending(),t?.watch(),null==i||0===h.length)return;let e={};for(let t of(null!=r&&(e.__v=r),null!=o&&(e[rV]=o),e[rG]=Date.now(),h))e[t.key]=t.serialize(t.signal.get());i.set(e)}function f(e){if(null!=e){for(let i of(t===e&&p&&g(),h))e.unwatch(i.signal);t===e&&(t=void 0)}}return{signal:function(e){let t=tB(e);return c.push(()=>t.set(e)),t},persisted:function(e,i,r){if(rK.has(e))throw Error(`Cannot use reserved key '${e}' for persisted signal`);let o=r?.deserialize,s=r?.serialize??(e=>e),c=t=>{if(null==t||!(e in t))return i;let r=t[e];if(null!=o){let e=o(r);return void 0!==e?e:i}return r},p=tB(c(a));return h.push({key:e,signal:p,serialize:s,reset:e=>{p.set(c(e))}}),null!=t&&t.watch(p),p},resetAll:function(){for(let e of c)e();let e=s();for(let t of h)t.reset(e)},startAutoPersist:function(){if(null==i)return()=>{};f(t);let e=new x.subtle.Watcher(()=>{p||(p=!0,queueMicrotask(g))});for(let i of(t=e,h))e.watch(i.signal);return()=>{f(e)}},dispose:function(){f(t),c.length=0,h.length=0}}}({storage:e,version:1}),a=t(!1),c=t(void 0),h=i("mode","commit"),p=i("pinned",!1),g=i("commitRef",void 0),f=t({count:0,position:0}),m=t(!1),b=t({inReview:!1}),v=t(void 0),w=t(void 0),_=t(void 0),$=t(void 0),C=rH({ai:!1,drafts:!1}),S=rH(!1),P=new SignalObjectImpl({hasIntegrationsConnected:!1,autolinksEnabled:!1,experimentalComposerEnabled:!1}),A=t(void 0),E=t(void 0),T=t(void 0),M=t(void 0),O=t(void 0),D=t(void 0),B=tF(()=>f.get().position>0),F=tF(()=>{let e=f.get();return e.position<e.count-1}),j=tF(()=>{let e=v.get();return e?.sha==="0000000000000000000000000000000000000000"}),N=tF(()=>{let e=v.get();return e?.stashNumber!=null}),q=tF(()=>{let e=_.get();if(null==e)return;let t=e.branch;if(null==t)return;let i=e.changes,r=i?.files.length??0,o=t.tracking?.ahead??0,s=t.tracking?.behind??0;return{branch:e.repositoryCount>1?`${e.repo.name}:${t.name}`:t.name,upstream:t.upstream?.name,ahead:o,behind:s,working:e.changes?.files.length??0,status:s>0&&o>0?"both":s>0?"behind":o>0?"ahead":r>0?"working":void 0}});return{loading:a,error:c,mode:h,pinned:p,commitRef:g,navigationStack:f,inReview:m,draftState:b,currentCommit:v,searchContext:w,wipState:_,preferences:$,orgSettings:C,hasAccount:S,capabilities:P,autolinks:A,formattedMessage:E,autolinkedIssues:T,pullRequest:M,signature:O,codeSuggestions:D,canNavigateBack:B,canNavigateForward:F,isUncommitted:j,isStash:N,wipStatus:q,resetAll:r,startAutoPersist:o,dispose:s}}(this._host.storage),this._rpc=new RpcController(this,{rpcOptions:{endpoint:()=>this._host.createEndpoint()},onReady:e=>this._onRpcReady(e),onError:e=>this._state.error.set(e.message)}),this._lastTelemetryContextStr="",this.indentPreference=16}createRenderRoot(){return this}connectedCallback(){super.connectedCallback?.();let e=this.context;this.context=void 0,this.initWebviewContext(e)}disconnectedCallback(){this._actions?.unwatchWip(),this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0,this._stopAutoPersist?.(),this._stopAutoPersist=void 0,this._resources?.commit.dispose(),this._resources?.wip.dispose(),this._resources?.reachability.dispose(),this._resources?.explain.dispose(),this._resources?.generate.dispose(),this._resources=void 0,this._state.orgSettings.disconnect(),this._state.hasAccount.disconnect(),this._actions=void 0,this._state.resetAll(),super.disconnectedCallback?.()}async _onRpcReady(e){var t,i,r;let o=this._state,[s,a,c,h,p,g,f,m,b,v,w,_,x,$]=await Promise.all([e.inspect,e.repository,e.repositories,e.commands,e.config,e.storage,e.ai,e.autolinks,e.subscription,e.integrations,e.files,e.pullRequests,e.drafts,e.telemetry]),[C,S]=await Promise.all([b.orgSettingsState,b.hasAccountState]);o.orgSettings.connect(C),o.hasAccount.connect(S);let P={commit:rz((e,t,i)=>s.getCommit(t,i,e)),wip:rz((e,t)=>s.getWipChanges(t,e)),reachability:rz(async e=>{let t=o.currentCommit.get();if(null!=t)return a.getCommitReachability(t.repoPath,t.sha,e)}),explain:rz(async e=>{let t=o.currentCommit.get();if(null!=t)try{let i=await s.explainCommit(t.repoPath,t.sha,e);if(i.error)return{error:{message:i.error.message??"Error retrieving content"}};return{result:i.result}}catch{return{error:{message:"Error retrieving content"}}}}),generate:rz(async e=>{let t=o.wipState.get()?.repo?.path??o.currentCommit.get()?.repoPath;if(null!=t)try{let i=await s.generateDescription(t,e);if(i.error)return{error:{message:i.error.message??"Error retrieving content"}};if(i.title||i.description)return{title:i.title,description:i.description};return}catch{return{error:{message:"Error retrieving content"}}}})};this._resources=P,this._actions=(t={inspect:s,drafts:x,repositories:c,repository:a,commands:h,config:p,storage:g,ai:f,autolinks:m,subscription:b,integrations:v,files:w,pullRequests:_,telemetry:$},new CommitDetailsActions(o,t,P)),this._stopAutoPersist=o.startAutoPersist(),this.setupDomListeners(),this._unsubscribeEvents=await (i={inspect:s,repositories:c,config:p,integrations:v},r=this._actions,rU([()=>i.inspect.onCommitSelected(e=>(function(e,t,i){let r=e.pinned.get();if(!r||!t.passive){if(e.searchContext.set(t.searchContext),null!=t.requestedMode&&!r){if("wip"===t.requestedMode)return void("wip"!==e.mode.get()?i.switchMode("wip"):i.fetchWipState(t.repoPath));"commit"!==e.mode.get()&&i.switchMode("commit")}"commit"===e.mode.get()&&i.fetchCommit(t.repoPath,t.sha)}})(o,e,r)),()=>i.repositories.onRepositoryChanged(e=>(function(e,t,i){if("wip"===e.mode.get()){let r=e.wipState.get()?.repo?.path;t.repoPath===r&&t.changes.some(e=>"index"===e||"head"===e)&&i.fetchWipState(t.repoPath)}let r=e.currentCommit.get();r?.repoPath===t.repoPath&&t.changes.some(e=>"head"===e||"heads"===e)&&i.clearReachability()})(o,e,r)),()=>i.config.onConfigChanged(()=>{r.fetchPreferences()}),()=>i.integrations.onIntegrationsChanged(e=>{var t,i;return t=o,i=e.hasAnyConnected,void(t.capabilities.hasIntegrationsConnected=i)}),()=>i.inspect.onShowWip(e=>{var t,i,s;return t=o,i=e,s=r,void(t.mode.set("wip"),t.inReview.set(i.inReview),t.draftState.set({inReview:i.inReview}),s.fetchWipState(i.repoPath))})])),await this._actions.fetchInitialState(),this.updateDocumentProperties()}setupDomListeners(){let e=this._actions;if(null==e)return;let t=this._state,i=()=>{if("visible"!==document.visibilityState)return void e.cancelPendingRequests();if(!t.loading.get()){if("wip"===t.mode.get()){let i=t.wipState.get()?.repo?.path;null!=i&&e.fetchWipState(i);return}e.refetchCurrentCommit()}};document.addEventListener("visibilitychange",i),this.disposables.push({dispose:()=>document.removeEventListener("visibilitychange",i)}),this.disposables.push($.on('[data-action="pick-commit"]',"click",()=>e.pickCommit()),$.on('[data-action="wip"]',"click",()=>e.switchMode("wip")),$.on('[data-action="details"]',"click",()=>e.switchMode("commit")),$.on('[data-action="search-commit"]',"click",()=>e.searchCommit()),$.on('[data-action="files-layout"]',"click",e=>this.onToggleFilesLayout(e)),$.on('[data-action="create-patch"]',"click",()=>this.onCreatePatchFromWip(!0)),$.on('[data-region="pullrequest-pane"]',"expanded-change",e=>this.onExpandedChange(e.detail,"pullrequest")),$.on('[data-action="explain-commit"]',"click",()=>void e.explainCommit()),$.on('[data-action="switch-ai"]',"click",()=>e.executeCommand("gitlens.ai.switchProvider")))}updated(e){this.updateDocumentProperties(),this.pushTelemetryContext()}pushTelemetryContext(){let e,t=this._actions;if(null==t)return;let i=this._state;if("wip"===i.mode.get())e={"context.autolinks":0,"context.codeSuggestions":i.codeSuggestions.get()?.length??0};else{let t=i.currentCommit.get();e={"context.autolinks":i.autolinks.get()?.length??0,"context.type":t?.stashNumber!=null?"stash":null!=t?"commit":void 0,"context.uncommitted":i.isUncommitted.get()}}let r=JSON.stringify(e);r!==this._lastTelemetryContextStr&&(this._lastTelemetryContextStr=r,t.updateTelemetryContext(e))}updateDocumentProperties(){let e=this._state.preferences.get(),t=e?.indent;t===this.indentPreference||(this.indentPreference=t??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}renderTopInspect(){let e=this._actions,t=this._state,i=t.currentCommit.get();if(null==i)return eP;let r=t.navigationStack.get(),o=t.pinned.get();return e$`<gl-inspect-nav
			?uncommitted=${t.isUncommitted.get()}
			?pinned=${o}
			.navigation=${r}
			.shortSha=${i.shortSha??""}
			.stashNumber=${i.stashNumber}
			@gl-commit-actions=${e=>this.onCommitActions(e)}
			@gl-pin=${()=>e?.togglePin()}
			@gl-back=${()=>e?.navigateBack()}
			@gl-forward=${()=>e?.navigateForward()}
		></gl-inspect-nav>`}renderTopWip(){let e=this._actions,t=this._state,i=t.wipState.get(),r=t.preferences.get();return null==i?eP:e$`<gl-status-nav
			.wip=${i}
			.pullRequest=${t.pullRequest.get()}
			.preferences=${r}
			@gl-branch-action=${e=>this.onBranchAction(e.detail.action)}
			@gl-issue-pull-request-details=${()=>e?.openPullRequestDetails()}
		></gl-status-nav>`}renderRepoStatusContent(e){let t=this._state.wipStatus.get(),i=t?.status;return e$`
			<code-icon icon="gl-repository-filled"></code-icon>
			${eq(t?.status!=null,()=>e$`<gl-tracking-pill
						class="inspect-header__tab-tracking"
						.ahead=${t.ahead}
						.behind=${t.behind}
						.working=${t.working}
						outlined
					></gl-tracking-pill>`)}
			${eq(null!=i,()=>e$`<gl-indicator
						class="inspect-header__tab-indicator inspect-header__tab-indicator--${i}"
					></gl-indicator>`)}
		`}renderWipTooltipContent(){let e=this._state.wipStatus.get();return null==e?"Overview":e$`
			Overview of &nbsp;<code-icon icon="git-branch" size="12"></code-icon
			><span class="md-code">${e.branch}</span>
			${eq("both"===e.status,()=>e$`<hr />
						<span class="md-code">${e.branch}</span> is ${eY("commit",e.behind)}
						behind and ${eY("commit",e.ahead)} ahead of
						<span class="md-code">${e.upstream??"origin"}</span>`)}
			${eq("behind"===e.status,()=>e$`<hr />
						<span class="md-code">${e.branch}</span> is ${eY("commit",e.behind)}
						behind <span class="md-code">${e.upstream??"origin"}</span>`)}
			${eq("ahead"===e.status,()=>e$`<hr />
						<span class="md-code">${e.branch}</span> is ${eY("commit",e.ahead)}
						ahead of <span class="md-code"> ${e.upstream??"origin"}</span>`)}
			${eq(e.working>0,()=>e$`<hr />
						${eY("working change",e.working)}`)}
		`}renderTopSection(){let e=this._state,t="wip"===e.mode.get(),i=e.currentCommit.get(),r=e.pinned.get();return e$`
			<div class="inspect-header">
				<nav class="inspect-header__tabs">
					<gl-tooltip hoist>
						<button class="inspect-header__tab${!t?" is-active":""}" data-action="details">
							<code-icon icon="gl-inspect"></code-icon>
						</button>
						<span slot="content"
							>${null!=i?!e.isStash.get()?e$`Inspect Commit
											<span class="md-code"
												><code-icon icon="git-commit"></code-icon> ${i.shortSha}</span
											>`:e$`Inspect Stash
											<span class="md-code"
												><code-icon icon="gl-stashes-view"></code-icon>
												#${i.stashNumber}</span
											>`:"Inspect"}${r?e$`(pinned)
										<hr />
										Automatic following is suspended while pinned`:""}</span
						>
					</gl-tooltip>
					<gl-tooltip hoist>
						<button class="inspect-header__tab${t?" is-active":""}" data-action="wip">
							${this.renderRepoStatusContent(t)}
						</button>
						<span slot="content">${this.renderWipTooltipContent()}</span>
					</gl-tooltip>
				</nav>
				<div class="inspect-header__content">
					${eq(!t,()=>this.renderTopInspect(),()=>this.renderTopWip())}
				</div>
			</div>
		`}render(){var e;let t=this._actions,i=this._state,r=this._resources,o=i.mode.get(),s=i.currentCommit.get(),a=i.wipState.get(),c=i.preferences.get(),h=i.orgSettings.get(),p=r?.explain.value.get(),g=r?.generate.value.get(),f=r?.reachability.value.get(),m="success"===(e=r?.reachability.status.get()??"idle")?"loaded":e,b=i.searchContext.get(),v=i.draftState.get(),w=i.capabilities.experimentalComposerEnabled;return e$`
			<div class="commit-detail-panel scrollable">
				<gl-error-banner .error=${i.error}></gl-error-banner>
				${this.renderTopSection()}
				<main id="main" tabindex="-1">
					${eq("commit"===o,()=>e$`<gl-commit-details
								.commit=${s}
								.autolinks=${i.autolinks.get()}
								.formattedMessage=${i.formattedMessage.get()}
								.signature=${i.signature.get()}
								.autolinksEnabled=${i.capabilities.autolinksEnabled}
								.autolinkedIssues=${i.autolinkedIssues.get()}
								.pullRequest=${i.pullRequest.get()}
								.hasAccount=${i.hasAccount.get()}
								.hasIntegrationsConnected=${i.capabilities.hasIntegrationsConnected}
								.files=${s?.files}
								.explain=${p}
								.preferences=${c}
								.orgSettings=${h}
								.isUncommitted=${i.isUncommitted.get()}
								.searchContext=${b}
								.reachability=${f}
								.reachabilityState=${m}
								@load-reachability=${()=>void t?.loadReachability()}
								@refresh-reachability=${()=>t?.refreshReachability()}
								@file-open-on-remote=${e=>t?.openFileOnRemote(e.detail)}
								@file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@file-compare-working=${e=>t?.openFileCompareWorking(e.detail,e.detail.showOptions)}
								@file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@file-more-actions=${e=>t?.executeFileAction(e.detail,e.detail.showOptions)}
							></gl-commit-details>`,()=>e$`<gl-wip-details
								.experimentalComposerEnabled=${w}
								.wip=${a}
								.pullRequest=${i.pullRequest.get()}
								.codeSuggestions=${i.codeSuggestions.get()}
								.files=${a?.changes?.files}
								.preferences=${c}
								.orgSettings=${h}
								.generate=${g}
								.isUncommitted=${!0}
								.emptyText=${"No working changes"}
								.draftState=${v}
								@draft-state-changed=${e=>t?.changeReviewMode(e.detail.inReview)}
								@create-patch=${e=>this.onCreatePatchFromWip(e.detail.checked)}
								@file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@file-stage=${e=>t?.stageFile(e.detail)}
								@file-unstage=${e=>t?.unstageFile(e.detail)}
								@data-action=${e=>this.onBranchAction(e.detail.name)}
								@gl-inspect-create-suggestions=${e=>t?.suggestChanges(e.detail)}
								@gl-patch-generate-title=${()=>void t?.generateDescription()}
								@gl-show-code-suggestion=${e=>{let r=i.codeSuggestions.get()?.find(t=>t.id===e.detail.id);r&&t?.showCodeSuggestion(r)}}
								@gl-patch-file-compare-previous=${e=>t?.openFileComparePrevious(e.detail,e.detail.showOptions)}
								@gl-patch-file-open=${e=>t?.openFile(e.detail,e.detail.showOptions)}
								@gl-patch-file-stage=${e=>t?.stageFile(e.detail)}
								@gl-patch-file-unstage=${e=>t?.unstageFile(e.detail)}
								@gl-patch-create-cancelled=${()=>t?.changeReviewMode(!1)}
							></gl-wip-details>`)}
				</main>
			</div>
		`}onBranchAction(e){this._actions?.handleBranchAction(e)}onCreatePatchFromWip(e=!0){let t=this._state.wipState.get();t?.changes!=null&&this._actions?.createPatchFromWip(t.changes,e)}onToggleFilesLayout(e){let t=e.target?.dataset.filesLayout??void 0,i=this._state.preferences.get();if(i?.files==null||t===i.files.layout)return;let r={...i.files,layout:t??"auto"};this._actions?.updateFilesLayout(r)}onExpandedChange(e,t){"pullrequest"===t&&this._actions?.updatePullRequestExpanded(e.expanded)}onCommitActions(e){null!=this._state.currentCommit.get()&&this._actions?.executeCommitAction(e.detail.action,e.detail.alt)}};hm([eB({type:String,noAccessor:!0})],hv.prototype,"context",2),hv=hm([eL("gl-commit-details-app")],hv);export{hv as GlCommitDetailsApp,hb as uncommittedSha};