let t,i,r,s,o,n,a,c;var h,p,g,f,m,b,v,y,w={90(t,i,r){r.d(i,{FlowLayout:()=>FlowLayout,flow:()=>o}),r.r(i);let SizeCache=class SizeCache{constructor(t){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,t?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(t,i){let r=this._map.get(t)||0;this._map.set(t,i),this.totalSize+=i-r}get averageSize(){if(this._map.size>0){let t=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(t):t}return 0}getSize(t){return this._map.get(t)}clear(){this._map.clear(),this.totalSize=0}};function s(t){return"horizontal"===t?"width":"height"}let BaseLayout=class BaseLayout{_getDefaultConfig(){return{direction:"vertical"}}constructor(t,i){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=t,Promise.resolve().then(()=>this.config=i||this._getDefaultConfig())}set config(t){Object.assign(this,Object.assign({},this._getDefaultConfig(),t))}get config(){return{direction:this.direction}}get items(){return this._items}set items(t){this._setItems(t)}_setItems(t){t!==this._items&&(this._items=t,this._scheduleReflow())}get direction(){return this._direction}set direction(t){(t="horizontal"===t?t:"vertical")!==this._direction&&(this._direction=t,this._sizeDim="horizontal"===t?"width":"height",this._secondarySizeDim="horizontal"===t?"height":"width",this._positionDim="horizontal"===t?"left":"top",this._secondaryPositionDim="horizontal"===t?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(t){let{_viewDim1:i,_viewDim2:r}=this;Object.assign(this._viewportSize,t),r!==this._viewDim2?this._scheduleLayoutUpdate():i!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(t){Object.assign(this._latestCoords,t);let i=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(i-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(t=!1){(t||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(t){this._pin=t,this._triggerReflow()}get pin(){if(null!==this._pin){let{index:t,block:i}=this._pin;return{index:Math.max(0,Math.min(t,this.items.length-1)),block:i}}return null}_clampScrollPosition(t){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(t,this.totalScrollSize[s(this.direction)]-this._viewDim1))}unpin(){null!==this._pin&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(null!==this.pin){let t=this._scrollPosition,{index:i,block:r}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:i,block:r||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=t-this._scrollPosition}}_calculateScrollIntoViewPosition(t){let{block:i}=t,r=Math.min(this.items.length,Math.max(0,t.index)),s=this._getItemPosition(r)[this._positionDim],o=s;if("start"!==i){let t=this._getItemSize(r)[this._sizeDim];if("center"===i)o=s-.5*this._viewDim1+.5*t;else{let r=s-this._viewDim1+t;if("end"===i)o=r;else{let t=this._scrollPosition;o=Math.abs(t-s)<Math.abs(t-r)?s:r}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(t){return{[this._positionDim]:this._calculateScrollIntoViewPosition(t)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let t=new Map;if(-1!==this._first&&-1!==this._last)for(let i=this._first;i<=this._last;i++)t.set(i,this._getItemPosition(i));let i={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:t};this._scrollError&&(i.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(i)}get _num(){return -1===this._first||-1===this._last?0:this._last-this._first+1}_checkThresholds(){if(0===this._viewDim1&&this._num>0||null!==this._pin)this._scheduleReflow();else{let t=Math.max(0,this._scrollPosition-this._overhang),i=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>t||this._physicalMax<i?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(t){if(-1===this._first||-1===this._last)return;let i=this._first;for(;i<this._last&&Math.round(this._getItemPosition(i)[this._positionDim]+this._getItemSize(i)[this._sizeDim])<=Math.round(this._scrollPosition);)i++;let r=this._last;for(;r>this._first&&Math.round(this._getItemPosition(r)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)r--;(i!==this._firstVisible||r!==this._lastVisible)&&(this._firstVisible=i,this._lastVisible=r,t&&t.emit&&this._sendVisibilityChangedMessage())}};let o=t=>Object.assign({type:FlowLayout},t);function n(t){return"horizontal"===t?"marginLeft":"marginTop"}let MetricsCache=class MetricsCache{constructor(){this._childSizeCache=new SizeCache,this._marginSizeCache=new SizeCache,this._metricsCache=new Map}update(t,i){let r=new Set;for(let o of(Object.keys(t).forEach(o=>{let n=Number(o);this._metricsCache.set(n,t[n]),this._childSizeCache.set(n,t[n][s(i)]),r.add(n),r.add(n+1)}),r)){let t=this._metricsCache.get(o)?.[n(i)]||0,r=this._metricsCache.get(o-1)?.["horizontal"===i?"marginRight":"marginBottom"]||0;this._marginSizeCache.set(o,function(t,i){let r=[t,i].sort();return r[1]<=0?Math.min(...r):r[0]>=0?Math.max(...r):r[0]+r[1]}(t,r))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(t,i){return this._metricsCache.get(t)?.[n(i)]||0}getChildSize(t){return this._childSizeCache.getSize(t)}getMarginSize(t){return this._marginSizeCache.getSize(t)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}};let FlowLayout=class FlowLayout extends BaseLayout{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new MetricsCache,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(t){this._metricsCache.update(t,this.direction),this._scheduleReflow()}_getPhysicalItem(t){return this._newPhysicalItems.get(t)??this._physicalItems.get(t)}_getSize(t){return this._getPhysicalItem(t)&&this._metricsCache.getChildSize(t)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(t){let i=this._metricsCache;if(-1===this._first||-1===this._last)return i.averageMarginSize+t*(i.averageMarginSize+this._getAverageSize());if(t<this._first){let r=this._first-t;return this._getPhysicalItem(this._first).pos-(i.getMarginSize(this._first-1)||i.averageMarginSize)-(r*i.averageChildSize+(r-1)*i.averageMarginSize)}{let r=t-this._last;return this._getPhysicalItem(this._last).pos+(i.getChildSize(this._last)||i.averageChildSize)+(i.getMarginSize(this._last)||i.averageMarginSize)+r*(i.averageChildSize+i.averageMarginSize)}}_getPosition(t){let i=this._getPhysicalItem(t),{averageMarginSize:r}=this._metricsCache;return 0===t?this._metricsCache.getMarginSize(0)??r:i?i.pos:this._estimatePosition(t)}_calculateAnchor(t,i){return t<=0?0:i>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((t+i)/2/this._delta)))}_getAnchor(t,i){if(0===this._physicalItems.size||this._first<0||this._last<0)return this._calculateAnchor(t,i);let r=this._getPhysicalItem(this._first),s=this._getPhysicalItem(this._last),o=r.pos;if(s.pos+this._metricsCache.getChildSize(this._last)<t||o>i)return this._calculateAnchor(t,i);let n=this._firstVisible-1,a=-1/0;for(;a<t;)a=this._getPhysicalItem(++n).pos+this._metricsCache.getChildSize(n);return n}_getActiveItems(){0===this._viewDim1||0===this.items.length?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let t=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t,this._stable=!0}_getItems(){let t,i,r=this._newPhysicalItems;if(this._stable=!0,null!==this.pin){let{index:t}=this.pin;this._anchorIdx=t,this._anchorPos=this._getPosition(t)}if(t=this._scrollPosition-this._overhang,(i=this._scrollPosition+this._viewDim1+this._overhang)<0||t>this._scrollSize)return void this._clearItems();(null===this._anchorIdx||null===this._anchorPos)&&(this._anchorIdx=this._getAnchor(t,i),this._anchorPos=this._getPosition(this._anchorIdx));let s=this._getSize(this._anchorIdx);void 0===s&&(this._stable=!1,s=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;0===this._anchorIdx&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-s);let a=0;for(this._anchorPos+s+n<t&&(a=t-(this._anchorPos+s+n)),this._anchorPos-o>i&&(a=i-(this._anchorPos-o)),a&&(this._scrollPosition-=a,t-=a,i-=a,this._scrollError+=a),r.set(this._anchorIdx,{pos:this._anchorPos,size:s}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+s+n;this._physicalMin>t&&this._first>0;){let t=this._getSize(--this._first);void 0===t&&(this._stable=!1,t=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._first);void 0===i&&(this._stable=!1,i=this._metricsCache.averageMarginSize),this._physicalMin-=t;let s=this._physicalMin;if(r.set(this._first,{pos:s,size:t}),this._physicalMin-=i,!1===this._stable&&!1===this._estimate)break}for(;this._physicalMax<i&&this._last<this.items.length-1;){let t=this._getSize(++this._last);void 0===t&&(this._stable=!1,t=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._last);void 0===i&&(this._stable=!1,i=this._metricsCache.averageMarginSize);let s=this._physicalMax;if(r.set(this._last,{pos:s,size:t}),this._physicalMax+=t+i,!this._stable&&!this._estimate)break}let c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,r.forEach(t=>t.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=r)}_calculateError(){return 0===this._first?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:t,_last:i}=this;super._reflow(),(-1===this._first&&-1==this._last||this._first===t&&this._last===i)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:t}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(t+this._getAverageSize())+t)}get _delta(){let{averageMarginSize:t}=this._metricsCache;return this._getAverageSize()+t}_getItemPosition(t){return{[this._positionDim]:this._getPosition(t),[this._secondaryPositionDim]:0,["horizontal"===this.direction?"xOffset":"yOffset"]:-(this._metricsCache.getLeadingMarginValue(t,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(t){return{[this._sizeDim]:this._getSize(t)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}}},_={};function x(t){var i=_[t];if(void 0!==i)return i.exports;var r=_[t]={exports:{}};return w[t](r,r.exports,x),r.exports}function C(t,i,r){let s,o,n,a,c,h,p,g,f,m,b=0;null!=r&&({edges:h,maxWait:p,cancellation:g,aggregator:f}=r);let v="leading"===(h??="trailing")||"both"===h,y="trailing"===h||"both"===h;function w(){if(null!=s){b=Date.now();let i=s,r=m;return m=void 0,s=void 0,n=t.apply(r,i)}}function _(){null!=a&&(clearTimeout(a),a=void 0)}function x(){null!=c&&(clearTimeout(c),c=void 0)}function C(){_(),x(),m=void 0,s=void 0,o=void 0,b=0}function $(...t){if(g?.aborted)return;let r=Date.now();null!=f&&null!=s?s=f(s,t):(m=this,s=t);let h=null==a&&null==c;o=r,_();let x=Date.now();if(o=x,a=setTimeout(()=>{a=void 0,function t(){let r,s,n=Date.now();if(r=n-(o??0),s=n-b,null==o||r>=i||r<0||null!=p&&s>=p){y&&w(),C();return}a=setTimeout(()=>{a=void 0,t()},i-(n-(o??0)))}()},i),null!=p&&!c){0===b&&(b=x);let t=p-(x-b);t>0?c=setTimeout(()=>{c=void 0,y&&null!=s&&w(),b=Date.now()},t):(y&&null!=s&&w(),C())}return v&&h?w():n}return $.cancel=C,$.flush=function(){return _(),x(),w()},$.pending=function(){return null!=a||null!=c},g?.addEventListener("abort",C,{once:!0}),$}x.d=(t,i)=>{for(var r in i)x.o(i,r)&&!x.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},x.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),x.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},Object.defineProperty(x,"p",{get:function(){try{if("string"!=typeof webpackResourceBasePath)throw Error("WebpackRequireFrom: 'webpackResourceBasePath' is not a string or not available at runtime. See https://github.com/agoldis/webpack-require-from#troubleshooting");return webpackResourceBasePath}catch{return"#{root}/dist/webviews/"}},set:function(t){}});let IpcCall=class IpcCall{constructor(t,i,r=!1){this.scope=t,this.reset=r,this.method=`${t}/${i}`}is(t){return t.method===this.method}};let IpcCommand=class IpcCommand extends IpcCall{};let IpcRequest=class IpcRequest extends IpcCall{constructor(t,i,r){super(t,i,r),this.response=new IpcNotification(this.scope,`${i}/completion`,this.reset)}};let IpcNotification=class IpcNotification extends IpcCall{};let $="patchDetails",A=new IpcCommand($,"apply"),P=new IpcCommand($,"archive"),T=new IpcCommand($,"create");new IpcCommand($,"openInGraph");let E=new IpcCommand($,"checked"),M=new IpcCommand($,"selectRepo"),O=new IpcCommand($,"selectBase"),D=new IpcCommand($,"file/actions/execute"),B=new IpcCommand($,"file/open"),N=new IpcCommand($,"file/openOnRemote"),U=new IpcCommand($,"file/compareWorking"),F=new IpcCommand($,"file/comparePrevious"),j=new IpcCommand($,"preferences/update"),V=new IpcCommand($,"switchMode"),q=new IpcCommand($,"cloud/copyLink"),W=new IpcCommand($,"local/createPatch"),G=new IpcCommand($,"create/repository/check"),K=new IpcCommand($,"update/create/metadata"),X=new IpcCommand($,"update/draft/metadata"),Q=new IpcCommand($,"update/draft/permissions"),Y=new IpcCommand($,"update/users"),J=new IpcCommand($,"update/userSelection"),ee=new IpcRequest($,"explain"),et=new IpcRequest($,"generate"),ei=new IpcNotification($,"didChange",!0),er=new IpcNotification($,"create/didChange"),es=new IpcNotification($,"draft/didChange"),eo=new IpcNotification($,"preferences/didChange"),en=new IpcNotification($,"draft/didChangeRepository");new IpcNotification($,"org/settings/didChange");let ea=new IpcRequest("core","webview/ready"),el=new IpcCommand("core","webview/focus/changed"),ec=new IpcCommand("core","command/execute"),eh=new IpcRequest("core","promos/applicable");new IpcCommand("core","configuration/update");let ed=new IpcCommand("core","telemetry/sendEvent"),ep=new IpcNotification("core","ipc/promise/settled");new IpcNotification("core","window/focus/didChange");let eu=new IpcCommand("core","webview/focus/didChange"),eg=new IpcNotification("core","webview/visibility/didChange");new IpcNotification("core","configuration/didChange");let context_request_event_s=class context_request_event_s extends Event{constructor(t,i,r,s){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=i,this.callback=r,this.subscribe=s??!1}};let value_notifier_s=class value_notifier_s{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,i=!1){let r=i||!Object.is(t,this.o);this.o=t,r&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(let[t,{disposer:i}]of this.subscriptions)t(this.o,i)},void 0!==t&&(this.value=t)}addCallback(t,i,r){if(!r)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:i});let{disposer:s}=this.subscriptions.get(t);t(this.value,s)}clearCallbacks(){this.subscriptions.clear()}};let e=class e extends Event{constructor(t,i){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=i}};let context_provider_i=class context_provider_i extends value_notifier_s{constructor(t,i,r){super(void 0!==i.context?i.initialValue:r),this.onContextRequest=t=>{if(t.context!==this.context)return;let i=t.contextTarget??t.composedPath()[0];i!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,i,t.subscribe))},this.onProviderRequest=t=>{if(t.context!==this.context||(t.contextTarget??t.composedPath()[0])===this.host)return;let i=new Set;for(let[t,{consumerHost:r}]of this.subscriptions)i.has(t)||(i.add(t),r.dispatchEvent(new context_request_event_s(this.context,r,t,!0)));t.stopPropagation()},this.host=t,void 0!==i.context?this.context=i.context:this.context=i,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new e(this.context,this.host))}};function ef({context:t}){return(i,r)=>{let s=new WeakMap;if("object"==typeof r)return{get(){return i.get.call(this)},set(t){return s.get(this).setValue(t),i.set.call(this,t)},init(i){return s.set(this,new context_provider_i(this,{context:t,initialValue:i})),i}};{let o;i.constructor.addInitializer(i=>{s.set(i,new context_provider_i(i,{context:t}))});let n=Object.getOwnPropertyDescriptor(i,r);if(void 0===n){let t=new WeakMap;o={get(){return t.get(this)},set(i){s.get(this).setValue(i),t.set(this,i)},configurable:!0,enumerable:!0}}else{let t=n.set;o={...n,set(i){s.get(this).setValue(i),t?.call(this,i)}}}return void Object.defineProperty(i,r,o)}}}var em=Object.defineProperty,eb=(t,i,r)=>{let s;return(s="symbol"!=typeof i?i+"":i)in t?em(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r,r},ev=(t,i)=>{if(Object(i)!==i)throw TypeError('Cannot use the "in" operator on this value');return t.has(i)},ey=(t,i,r)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,r)},ew=(t,i,r)=>{if(!i.has(t))throw TypeError("Cannot access private method");return r};function e_(t,i){return Object.is(t,i)}let ek=null,ex=!1,eC=1,e$=Symbol("SIGNAL");function eS(t){let i=ek;return ek=t,i}let eA={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function eP(t){if(ex)throw Error("u">typeof ngDevMode&&ngDevMode?"Assertion error: signal read during notification phase":"");if(null===ek)return;ek.consumerOnSignalRead(t);let i=ek.nextProducerIndex++;eE(ek),i<ek.producerNode.length&&ek.producerNode[i]!==t&&eI(ek)&&eT(ek.producerNode[i],ek.producerIndexOfThis[i]),ek.producerNode[i]!==t&&(ek.producerNode[i]=t,ek.producerIndexOfThis[i]=eI(ek)?function t(i,r,s){var o;if(ez(i),eE(i),0===i.liveConsumerNode.length){null==(o=i.watched)||o.call(i.wrapper);for(let r=0;r<i.producerNode.length;r++)i.producerIndexOfThis[r]=t(i.producerNode[r],i,r)}return i.liveConsumerIndexOfThis.push(s),i.liveConsumerNode.push(r)-1}(t,ek,i):0),ek.producerLastReadVersion[i]=t.version}function eT(t,i){var r;if(ez(t),eE(t),"u">typeof ngDevMode&&ngDevMode&&i>=t.liveConsumerNode.length)throw Error(`Assertion error: active consumer index ${i} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(1===t.liveConsumerNode.length){null==(r=t.unwatched)||r.call(t.wrapper);for(let i=0;i<t.producerNode.length;i++)eT(t.producerNode[i],t.producerIndexOfThis[i])}let s=t.liveConsumerNode.length-1;if(t.liveConsumerNode[i]=t.liveConsumerNode[s],t.liveConsumerIndexOfThis[i]=t.liveConsumerIndexOfThis[s],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,i<t.liveConsumerNode.length){let r=t.liveConsumerIndexOfThis[i],s=t.liveConsumerNode[i];eE(s),s.producerIndexOfThis[r]=i}}function eI(t){var i;return t.consumerIsAlwaysLive||((null==(i=null==t?void 0:t.liveConsumerNode)?void 0:i.length)??0)>0}function eE(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function ez(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function eR(t){if(function t(i){if(i.dirty||i.lastCleanEpoch!==eC){if(!i.producerMustRecompute(i)&&!function(i){eE(i);for(let r=0;r<i.producerNode.length;r++){let s=i.producerNode[r],o=i.producerLastReadVersion[r];if(o!==s.version||(t(s),o!==s.version))return!0}return!1}(i)){i.dirty=!1,i.lastCleanEpoch=eC;return}i.producerRecomputeValue(i),i.dirty=!1,i.lastCleanEpoch=eC}}(t),eP(t),t.value===eO)throw t.error;return t.value}let eM=Symbol("UNSET"),eL=Symbol("COMPUTING"),eO=Symbol("ERRORED"),eD={...eA,value:eM,dirty:!0,error:null,equal:e_,producerMustRecompute:t=>t.value===eM||t.value===eL,producerRecomputeValue(t){let i;if(t.value===eL)throw Error("Detected cycle in computations.");let r=t.value;t.value=eL;let s=(t&&(t.nextProducerIndex=0),eS(t)),o=!1;try{i=t.computation.call(t.wrapper),o=r!==eM&&r!==eO&&t.equal.call(t.wrapper,r,i)}catch(r){i=eO,t.error=r}finally{if(eS(s),t&&void 0!==t.producerNode&&void 0!==t.producerIndexOfThis&&void 0!==t.producerLastReadVersion){if(eI(t))for(let i=t.nextProducerIndex;i<t.producerNode.length;i++)eT(t.producerNode[i],t.producerIndexOfThis[i]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}if(o){t.value=r;return}t.value=i,t.version++}},eB=function(){throw Error()};function eN(){return eP(this),this.value}let eU={...eA,equal:e_,value:void 0},eF=Symbol("node");(t=>{var i,r,s,o;let State=class State{constructor(s,o={}){let n,a;ey(this,r),eb(this,i);let c=((n=Object.create(eU)).value=s,(a=()=>(eP(n),n.value))[e$]=n,a)[e$];if(this[eF]=c,c.wrapper=this,o){let i=o.equals;i&&(c.equal=i),c.watched=o[t.subtle.watched],c.unwatched=o[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.get");return eN.call(this[eF])}set(i){var r,s;if(!(0,t.isState)(this))throw TypeError("Wrong receiver type for Signal.State.prototype.set");if(ex)throw Error("Writes to signals not permitted during Watcher callback");r=this[eF],(null==ek?void 0:ek.consumerAllowSignalWrites)===!1&&eB(),r.equal.call(r.wrapper,r.value,i)||(r.value=i,s=r,s.version++,eC++,function t(i){if(void 0===i.liveConsumerNode)return;let r=ex;ex=!0;try{for(let r of i.liveConsumerNode)r.dirty||function(i){var r;i.dirty=!0,t(i),null==(r=i.consumerMarkedDirty)||r.call(i.wrapper??i)}(r)}finally{ex=r}}(s))}};i=eF,r=new WeakSet,t.isState=t=>"object"==typeof t&&ev(r,t),t.State=State;let Computed=class Computed{constructor(i,r){let n,a;ey(this,o),eb(this,s);let c=((n=Object.create(eD)).computation=i,(a=()=>eR(n))[e$]=n,a)[e$];if(c.consumerAllowSignalWrites=!0,this[eF]=c,c.wrapper=this,r){let i=r.equals;i&&(c.equal=i),c.watched=r[t.subtle.watched],c.unwatched=r[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw TypeError("Wrong receiver type for Signal.Computed.prototype.get");return eR(this[eF])}};s=eF,o=new WeakSet,t.isComputed=t=>"object"==typeof t&&ev(o,t),t.Computed=Computed,(i=>{var r,s,o,n;i.untrack=function(t){let i,r=null;try{r=eS(null),i=t()}finally{eS(r)}return i},i.introspectSources=function(i){var r;if(!(0,t.isComputed)(i)&&!(0,t.isWatcher)(i))throw TypeError("Called introspectSources without a Computed or Watcher argument");return(null==(r=i[eF].producerNode)?void 0:r.map(t=>t.wrapper))??[]},i.introspectSinks=function(i){var r;if(!(0,t.isComputed)(i)&&!(0,t.isState)(i))throw TypeError("Called introspectSinks without a Signal argument");return(null==(r=i[eF].liveConsumerNode)?void 0:r.map(t=>t.wrapper))??[]},i.hasSinks=function(i){if(!(0,t.isComputed)(i)&&!(0,t.isState)(i))throw TypeError("Called hasSinks without a Signal argument");let r=i[eF].liveConsumerNode;return!!r&&r.length>0},i.hasSources=function(i){if(!(0,t.isComputed)(i)&&!(0,t.isWatcher)(i))throw TypeError("Called hasSources without a Computed or Watcher argument");let r=i[eF].producerNode;return!!r&&r.length>0};let Watcher=class Watcher{constructor(t){ey(this,s),ey(this,o),eb(this,r);let i=Object.create(eA);i.wrapper=this,i.consumerMarkedDirty=t,i.consumerIsAlwaysLive=!0,i.consumerAllowSignalWrites=!1,i.producerNode=[],this[eF]=i}watch(...i){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");ew(this,o,n).call(this,i);let r=this[eF];r.dirty=!1;let s=eS(r);for(let t of i)eP(t[eF]);eS(s)}unwatch(...i){if(!(0,t.isWatcher)(this))throw TypeError("Called unwatch without Watcher receiver");ew(this,o,n).call(this,i);let r=this[eF];eE(r);for(let t=r.producerNode.length-1;t>=0;t--)if(i.includes(r.producerNode[t].wrapper)){eT(r.producerNode[t],r.producerIndexOfThis[t]);let i=r.producerNode.length-1;if(r.producerNode[t]=r.producerNode[i],r.producerIndexOfThis[t]=r.producerIndexOfThis[i],r.producerNode.length--,r.producerIndexOfThis.length--,r.nextProducerIndex--,t<r.producerNode.length){let i=r.producerIndexOfThis[t],s=r.producerNode[t];ez(s),s.liveConsumerIndexOfThis[i]=t}}}getPending(){if(!(0,t.isWatcher)(this))throw TypeError("Called getPending without Watcher receiver");return this[eF].producerNode.filter(t=>t.dirty).map(t=>t.wrapper)}};r=eF,s=new WeakSet,o=new WeakSet,n=function(i){for(let r of i)if(!(0,t.isComputed)(r)&&!(0,t.isState)(r))throw TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=t=>ev(s,t),i.Watcher=Watcher,i.currentComputed=function(){var t;return null==(t=ek)?void 0:t.wrapper},i.watched=Symbol("watched"),i.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(m||(m={}));let ej=!1,eV=new m.subtle.Watcher(()=>{ej||(ej=!0,queueMicrotask(()=>{for(let t of(ej=!1,eV.getPending()))t.get();eV.watch()}))}),eH=Symbol("SignalWatcherBrand"),eq=(new FinalizationRegistry(t=>{t.unwatch(...m.subtle.introspectSources(t))}),new WeakMap,t=>(...i)=>({_$litDirective$:t,values:i}));let directive_i=class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,r){this._$Ct=t,this._$AM=i,this._$Ci=r}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};let eW=globalThis,eG=t=>t,eK=eW.trustedTypes,eZ=eK?eK.createPolicy("lit-html",{createHTML:t=>t}):void 0,eX="$lit$",eQ=`lit$${Math.random().toFixed(9).slice(2)}$`,eY="?"+eQ,eJ=`<${eY}>`,e0=document,e1=()=>e0.createComment(""),e2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,e5=Array.isArray,e3=t=>e5(t)||"function"==typeof t?.[Symbol.iterator],e6=`[ 	
\x0c\r]`,e4=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,e7=/-->/g,e8=/>/g,e9=RegExp(`>|${e6}(?:([^\\s"'>=/]+)(${e6}*=${e6}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,tt=/"/g,ti=/^(?:script|style|textarea|title)$/i,tr=t=>(i,...r)=>({_$litType$:t,strings:i,values:r}),ts=tr(1),to=tr(2),tn=(tr(3),Symbol.for("lit-noChange")),ta=Symbol.for("lit-nothing"),tl=new WeakMap,tc=e0.createTreeWalker(e0,129);function th(t,i){if(!e5(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==eZ?eZ.createHTML(i):i}let td=(t,i)=>{let r=t.length-1,s=[],o,n=2===i?"<svg>":3===i?"<math>":"",a=e4;for(let i=0;i<r;i++){let r=t[i],c,h,p=-1,g=0;for(;g<r.length&&(a.lastIndex=g,null!==(h=a.exec(r)));)g=a.lastIndex,a===e4?"!--"===h[1]?a=e7:void 0!==h[1]?a=e8:void 0!==h[2]?(ti.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=e9):void 0!==h[3]&&(a=e9):a===e9?">"===h[0]?(a=o??e4,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?e9:'"'===h[3]?tt:te):a===tt||a===te?a=e9:a===e7||a===e8?a=e4:(a=e9,o=void 0);let f=a===e9&&t[i+1].startsWith("/>")?" ":"";n+=a===e4?r+eJ:p>=0?(s.push(c),r.slice(0,p)+eX+r.slice(p)+eQ+f):r+eQ+(-2===p?i:f)}return[th(t,n+(t[r]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),s]};let S=class S{constructor({strings:t,_$litType$:i},r){let s;this.parts=[];let o=0,n=0,a=t.length-1,c=this.parts,[h,p]=td(t,i);if(this.el=S.createElement(h,r),tc.currentNode=this.el.content,2===i||3===i){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=tc.nextNode())&&c.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(let t of s.getAttributeNames())if(t.endsWith(eX)){let i=p[n++],r=s.getAttribute(t).split(eQ),a=/([.?@])?(.*)/.exec(i);c.push({type:1,index:o,name:a[2],strings:r,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),s.removeAttribute(t)}else t.startsWith(eQ)&&(c.push({type:6,index:o}),s.removeAttribute(t));if(ti.test(s.tagName)){let t=s.textContent.split(eQ),i=t.length-1;if(i>0){s.textContent=eK?eK.emptyScript:"";for(let r=0;r<i;r++)s.append(t[r],e1()),tc.nextNode(),c.push({type:2,index:++o});s.append(t[i],e1())}}}else if(8===s.nodeType)if(s.data===eY)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(eQ,t+1));)c.push({type:7,index:o}),t+=eQ.length-1}o++}}static createElement(t,i){let r=e0.createElement("template");return r.innerHTML=t,r}};function tp(t,i,r=t,s){if(i===tn)return i;let o=void 0!==s?r._$Co?.[s]:r._$Cl,n=e2(i)?void 0:i._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t))._$AT(t,r,s),void 0!==s?(r._$Co??=[])[s]=o:r._$Cl=o),void 0!==o&&(i=tp(t,o._$AS(t,i.values),o,s)),i}let R=class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:i},parts:r}=this._$AD,s=(t?.creationScope??e0).importNode(i,!0);tc.currentNode=s;let o=tc.nextNode(),n=0,a=0,c=r[0];for(;void 0!==c;){if(n===c.index){let i;2===c.type?i=new k(o,o.nextSibling,this,t):1===c.type?i=new c.ctor(o,c.name,c.strings,this,t):6===c.type&&(i=new Z(o,this,t)),this._$AV.push(i),c=r[++a]}n!==c?.index&&(o=tc.nextNode(),n++)}return tc.currentNode=e0,s}p(t){let i=0;for(let r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,i),i+=r.strings.length-2):r._$AI(t[i])),i++}};let k=class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,r,s){this.type=2,this._$AH=ta,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){e2(t=tp(this,t,i))?t===ta||null==t||""===t?(this._$AH!==ta&&this._$AR(),this._$AH=ta):t!==this._$AH&&t!==tn&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):e3(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ta&&e2(this._$AH)?this._$AA.nextSibling.data=t:this.T(e0.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=S.createElement(th(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(i);else{let t=new R(s,this),r=t.u(this.options);t.p(i),this.T(r),this._$AH=t}}_$AC(t){let i=tl.get(t.strings);return void 0===i&&tl.set(t.strings,i=new S(t)),i}k(t){e5(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,r,s=0;for(let o of t)s===i.length?i.push(r=new k(this.O(e1()),this.O(e1()),this,this.options)):r=i[s],r._$AI(o),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let i=eG(t).nextSibling;eG(t).remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}};let H=class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,r,s,o){this.type=1,this._$AH=ta,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=ta}_$AI(t,i=this,r,s){let o=this.strings,n=!1;if(void 0===o)(n=!e2(t=tp(this,t,i,0))||t!==this._$AH&&t!==tn)&&(this._$AH=t);else{let s,a,c=t;for(t=o[0],s=0;s<o.length-1;s++)(a=tp(this,c[r+s],i,s))===tn&&(a=this._$AH[s]),n||=!e2(a)||a!==this._$AH[s],a===ta?t=ta:t!==ta&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}n&&!s&&this.j(t)}j(t){t===ta?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};let I=class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ta?void 0:t}};let L=class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ta)}};let z=class z extends H{constructor(t,i,r,s,o){super(t,i,r,s,o),this.type=5}_$AI(t,i=this){if((t=tp(this,t,i,0)??ta)===tn)return;let r=this._$AH,s=t===ta&&r!==ta||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==ta&&(r===ta||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};let Z=class Z{constructor(t,i,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){tp(this,t)}};let tu=eW.litHtmlPolyfillSupport;tu?.(S,k),(eW.litHtmlVersions??=[]).push("3.3.2");let{I:tg}={M:eX,P:eQ,A:eY,C:1,L:td,R,D:e3,V:tp,I:k,H,N:L,U:z,B:I,F:Z},tf=t=>t,tm=(t,i,r)=>{let s=t._$AA.parentNode,o=void 0===i?t._$AB:i._$AA;if(void 0===r)r=new tg(s.insertBefore(document.createComment(""),o),s.insertBefore(document.createComment(""),o),t,t.options);else{let i=r._$AB.nextSibling,n=r._$AM,a=n!==t;if(a){let i;r._$AQ?.(t),r._$AM=t,void 0!==r._$AP&&(i=t._$AU)!==n._$AU&&r._$AP(i)}if(i!==o||a){let t=r._$AA;for(;t!==i;){let i=tf(t).nextSibling;tf(s).insertBefore(t,o),t=i}}}return r},tb=(t,i,r=t)=>(t._$AI(i,r),t),tv={},ty=(t,i=tv)=>t._$AH=i,tw=t=>{t._$AR(),t._$AA.remove()},t_=(t,i)=>{let r=t._$AN;if(void 0===r)return!1;for(let t of r)t._$AO?.(i,!1),t_(t,i);return!0},tk=t=>{let i,r;do{if(void 0===(i=t._$AM))break;(r=i._$AN).delete(t),t=i}while(0===r?.size)},tx=t=>{for(let i;i=t._$AM;t=i){let r=i._$AN;if(void 0===r)i._$AN=r=new Set;else if(r.has(t))break;r.add(t),tS(i)}};function tC(t){void 0!==this._$AN?(tk(this),this._$AM=t,tx(this)):this._$AM=t}function t$(t,i=!1,r=0){let s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(s))for(let t=r;t<s.length;t++)t_(s[t],!1),tk(s[t]);else null!=s&&(t_(s,!1),tk(s));else t_(this,t)}let tS=t=>{2==t.type&&(t._$AP??=t$,t._$AQ??=tC)};let async_directive_f=class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,r){super._$AT(t,i,r),tx(this),this.isConnected=t._$AU}_$AO(t,i=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),i&&(t_(this,t),tk(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}};let tA=!1,tP=new m.subtle.Watcher(async()=>{tA||(tA=!0,queueMicrotask(()=>{for(let t of(tA=!1,tP.getPending()))t.get();tP.watch()}))});let watch_r=class watch_r extends async_directive_f{_$S_(){var t,i;void 0===this._$Sm&&(this._$Sj=new m.Computed(()=>{var t;let i=null==(t=this._$SW)?void 0:t.get();return this.setValue(i),i}),this._$Sm=null!=(i=null==(t=this._$Sk)?void 0:t.h)?i:tP,this._$Sm.watch(this._$Sj),m.subtle.untrack(()=>{var t;return null==(t=this._$Sj)?void 0:t.get()}))}_$Sp(){void 0!==this._$Sm&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return m.subtle.untrack(()=>t.get())}update(t,[i]){var r;return null!=this._$Sk||(this._$Sk=null==(r=t.options)?void 0:r.host),i!==this._$SW&&void 0!==this._$SW&&this._$Sp(),this._$SW=i,this._$S_(),m.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}};let tT=eq(watch_r),tI=t=>(i,...r)=>t(i,...r.map(t=>t instanceof m.State||t instanceof m.Computed?tT(t):t));tI(ts),tI(to),m.State,m.Computed;let tE=globalThis,tz=tE.ShadowRoot&&(void 0===tE.ShadyCSS||tE.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tR=Symbol(),tM=new WeakMap;let css_tag_n=class css_tag_n{constructor(t,i,r){if(this._$cssResult$=!0,r!==tR)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o,i=this.t;if(tz&&void 0===t){let r=void 0!==i&&1===i.length;r&&(t=tM.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&tM.set(i,t))}return t}toString(){return this.cssText}};let tL=t=>new css_tag_n("string"==typeof t?t:t+"",void 0,tR),tO=(t,...i)=>new css_tag_n(1===t.length?t[0]:i.reduce((i,r,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]),t,tR),tD=tz?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(let r of t.cssRules)i+=r.cssText;return tL(i)})(t):t,{is:tB,defineProperty:tN,getOwnPropertyDescriptor:tU,getOwnPropertyNames:tF,getOwnPropertySymbols:tj,getPrototypeOf:tV}=Object,tH=globalThis,tq=tH.trustedTypes,tW=tq?tq.emptyScript:"",tG=tH.reactiveElementPolyfillSupport,tK={toAttribute(t,i){switch(i){case Boolean:t=t?tW:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let r=t;switch(i){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},tZ=(t,i)=>!tB(t,i),tX={attribute:!0,type:String,converter:tK,reflect:!1,useDefault:!1,hasChanged:tZ};Symbol.metadata??=Symbol("metadata"),tH.litPropertyMetadata??=new WeakMap;let reactive_element_y=class reactive_element_y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=tX){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,i);void 0!==s&&tN(this.prototype,t,s)}}static getPropertyDescriptor(t,i,r){let{get:s,set:o}=tU(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get:s,set(i){let n=s?.call(this);o?.call(this,i),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tX}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=tV(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let i of[...tF(t),...tj(t)])this.createProperty(i,t[i])}let t=this[Symbol.metadata];if(null!==t){let i=litPropertyMetadata.get(t);if(void 0!==i)for(let[t,r]of i)this.elementProperties.set(t,r)}for(let[t,i]of(this._$Eh=new Map,this.elementProperties)){let r=this._$Eu(t,i);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let i=[];if(Array.isArray(t))for(let r of new Set(t.flat(1/0).reverse()))i.unshift(tD(r));else void 0!==t&&i.push(tD(t));return i}static _$Eu(t,i){let r=i.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let i of this.constructor.elementProperties.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(tz)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let r of i){let i=document.createElement("style"),s=tE.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,r){this._$AK(t,r)}_$ET(t,i){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(void 0!==s&&!0===r.reflect){let o=(void 0!==r.converter?.toAttribute?r.converter:tK).toAttribute(i,r.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,i){let r=this.constructor,s=r._$Eh.get(t);if(void 0!==s&&this._$Em!==s){let t=r.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:tK;this._$Em=s;let n=o.fromAttribute(i,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,i,r,s=!1,o){if(void 0!==t){let n=this.constructor;if(!1===s&&(o=this[t]),!(((r??=n.getPropertyOptions(t)).hasChanged??tZ)(o,i)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,i,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,i,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||r||(i=void 0),this._$AL.set(t,i)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,r]of t){let{wrapped:t}=r,s=this[i];!0!==t||this._$AL.has(i)||void 0===s||this.C(i,void 0,r,s)}}let t=!1,i=this._$AL;try{(t=this.shouldUpdate(i))?(this.willUpdate(i),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(i)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};reactive_element_y.elementStyles=[],reactive_element_y.shadowRootOptions={mode:"open"},reactive_element_y.elementProperties=new Map,reactive_element_y.finalized=new Map,tG?.({ReactiveElement:reactive_element_y}),(tH.reactiveElementVersions??=[]).push("2.1.2");let tQ=globalThis;let lit_element_i=class lit_element_i extends reactive_element_y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,r)=>{let s=r?.renderBefore??i,o=s._$litPart$;if(void 0===o){let t=r?.renderBefore??null;s._$litPart$=o=new k(i.insertBefore(e1(),t),t,void 0,r??{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tn}};lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,tQ.litElementHydrateSupport?.({LitElement:lit_element_i});let tY=tQ.litElementPolyfillSupport;tY?.({LitElement:lit_element_i}),(tQ.litElementVersions??=[]).push("4.2.2");let tJ=t=>(i,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,i)}):customElements.define(t,i)},t0={attribute:!0,type:String,converter:tK,reflect:!1,hasChanged:tZ};function t1(t){return(i,r)=>{let s;return"object"==typeof r?((t=t0,i,r)=>{let{kind:s,metadata:o}=r,n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),"accessor"===s){let{name:s}=r;return{set(r){let o=i.get.call(this);i.set.call(this,r),this.requestUpdate(s,o,t,!0,r)},init(i){return void 0!==i&&this.C(s,void 0,t,i),i}}}if("setter"===s){let{name:s}=r;return function(r){let o=this[s];i.call(this,r),this.requestUpdate(s,o,t,!0,r)}}throw Error("Unsupported decorator location: "+s)})(t,i,r):(s=i.hasOwnProperty(r),i.constructor.createProperty(r,t),s?Object.getOwnPropertyDescriptor(i,r):void 0)}}function t2(t){return t1({...t,state:!0,attribute:!1})}let t5=(t,i,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof i&&Object.defineProperty(t,i,r),r);function t3(t,i){return(r,s,o)=>{let n=i=>i.renderRoot?.querySelector(t)??null;if(i){let t,{get:i,set:a}="object"==typeof s?r:o??(t=Symbol(),{get(){return this[t]},set(i){this[t]=i}});return t5(r,s,{get(){let t=i.call(this);return void 0===t&&(null!==(t=n(this))||this.hasUpdated)&&a.call(this,t),t}})}return t5(r,s,{get(){return n(this)}})}}let{fromCharCode:t6}=String;new TextEncoder;let t4=new TextDecoder;function t7(t,i,r,s){return`command:${t}?${encodeURIComponent(JSON.stringify({webview:i,webviewInstance:r,...s}))}`}let t8=new WeakMap;function t9(t,i){return function(r,s,o){let n=t8.get(r.constructor);null==n&&t8.set(r.constructor,n=[]),n.push({method:o.value,keys:Array.isArray(t)?t:[t],afterFirstUpdate:i?.afterFirstUpdate??!1})}}let GlElement=class GlElement extends lit_element_i{emit(t,i,r){let s=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,...r,detail:i});return this.dispatchEvent(s),s}update(t){let i=t8.get(this.constructor);if(null!=i)for(let{keys:r,method:s,afterFirstUpdate:o}of i){if(o&&!this.hasUpdated)continue;let i=r.filter(i=>t.has(i));i.length&&s.call(this,i)}super.update(t)}};new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,62,0,0,0,63,52,53,54,55,56,57,58,59,60,61,0,0,0,64,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,0,0,0,0,0,0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]);let ie=/T/,it=/.*\s*?at\s(.+?)\s/,ii=/^_+/,ir=["accessToken","password","token"];let Logger=class Logger{#e;#t;configure(t,i=!1){this.#t={...t,sanitizeKeys:new Set([...ir,...t.sanitizeKeys??[]])},this.#i=i,this.#e=t.createChannel(t.name),this.#r=this.#e.logLevel,this.#e.onDidChangeLogLevel?.(t=>{this.#r=t})}enabled(t){return!!this.isDebugging||0!==this.#r&&(null==t||this.#r<=function(t){switch(t){case"off":default:return 0;case"trace":return 1;case"debug":return 2;case"info":return 3;case"warn":return 4;case"error":return 5}}(t))}#i=!1;get isDebugging(){return this.#i}#r=0;get logLevel(){var t=this.#r;switch(t){case 0:default:return"off";case 1:return"trace";case 2:return"debug";case 3:return"info";case 4:return"warn";case 5:return"error"}}get timestamp(){return`[${new Date().toISOString().replace(ie," ").slice(0,-1)}]`}trace(t,...i){let r;(0!==this.#r&&!(this.#r>1)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.trace(`  ${r??""}${this.#s(!0,i)}`))}debug(t,...i){let r;(0!==this.#r&&!(this.#r>2)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.debug(`  ${r??""}${this.#s(!1,i)}`))}info(t,...i){let r;(0!==this.#r&&!(this.#r>3)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.info(`   ${r??""}${this.#s(!1,i)}`))}warn(t,...i){let r;(0!==this.#r&&!(this.#r>4)||this.isDebugging)&&("string"==typeof t?r=t:(r=i.shift(),null!=t&&(r=`${t.prefix} ${r??""}`)),this.isDebugging,this.#e?.warn(`${r??""}${this.#s(!1,i)}`))}error(t,i,...r){let s;if((0===this.#r||this.#r>5)&&!this.isDebugging)return;if(null==(s=null==i||"string"==typeof i?i:`${i.prefix} ${r.shift()??""}`)){let i=t instanceof Error?t.stack:void 0;if(i){let t=it.exec(i);null!=t&&(s=t[1])}}this.isDebugging;let o=`  ${s??""}${this.#s(!1,r)}`;null!=t?this.#e?.error(String(t),o):this.#e?.error(o)}showOutputChannel(t){this.#e?.show?.(t)}toLoggable(t,i){if(null!=i){let r=this.sanitize(i,t);if(null!=r)return r}if("function"==typeof t)return"<function>";if(null==t||"object"!=typeof t||t instanceof Error)return String(t);if(Array.isArray(t)){let i=t.length>10?t.slice(0,10):t,r=t.length>10?`, \u2026+${t.length-10}`:"";return`[${i.map(t=>this.toLoggable(t)).join(", ")}${r}]`}let r=this.#t?.toLoggable,s=r?.(t);if(null!=s)return s;let o=this.#t?.sanitizeKeys;try{return JSON.stringify(t,(t,i)=>{if(95!==t.charCodeAt(0))return o?.has(t)?this.sanitize(t,i):""===t||"object"!=typeof i||null==i||Array.isArray(i)?i:i instanceof Error?String(i):r?.(i)??i})}catch{return"<error>"}}sanitize(t,i){if(null==i)return;let r=t.replace(ii,"")||t;if(this.#t?.sanitizeKeys?.has(r))return null!=this.#t.hash?`<${r}:${this.#t.hash("string"==typeof i?i:JSON.stringify(i))}>`:`<${r}>`}#s(t,i){if(0===i.length||t&&(0===this.#r||this.#r>2)&&!this.isDebugging)return"";let r=i.map(t=>this.toLoggable(t)).join(", ");return 0!==r.length?` \u2014 ${r}`:""}};let is=new Logger,io=new WeakMap,ia={enabled:t=>is.enabled(t),log:(t,i,r,...s)=>{switch(t){case"error":is.error(void 0,i,r,...s);break;case"warn":i?.warn(r,...s);break;case"info":i?.info(r,...s);break;case"debug":default:i?.debug(r,...s);break;case"trace":i?.trace(r,...s)}}},il=0x40000000-1;function ic(){let t=0;return{get current(){return t},next:function(){return t===il&&(t=0),++t},reset:function(){t=0}}}function ih(t){let i=.001*performance.now(),r=Math.floor(i),s=Math.floor(i%1*1e9);return void 0!==t&&(r-=t[0],(s-=t[1])<0&&(r--,s+=1e9)),[r,s]}function id(t){let[i,r]=ih(t);return 1e3*i+Math.floor(r/1e6)}let ip=new Map;function iu(i,r){let s=t;t=i.scopeId,ip.set(i.scopeId,i);try{return r()}finally{t=s,ip.delete(i.scopeId)}}function ig(){return null!=t?ip.get(t):void 0}let im=ic();function ib(t,i,r){var s;let o,n,a={scopeId:t,prevScopeId:i,prefix:r,enabled:t=>is.enabled(t),addExitInfo:function(...t){(o??=[]).push(...t)},setFailed:function(t){n=t},getExitInfo:function(){return{details:o?.length?` \u2022 ${o.join(", ")}`:void 0,failed:n}}};return iv(a,"trace",is.trace),iv(a,"debug",is.debug),iv(a,"info",is.info),iv(a,"warn",is.warn),Object.defineProperty(s=a,"error",{configurable:!0,enumerable:!0,get:function(){let t=(t,i,...r)=>is.error(t,s,i,...r);return Object.defineProperty(s,"error",{value:t,writable:!1,enumerable:!0}),t}}),a}function iv(t,i,r){Object.defineProperty(t,i,{configurable:!0,enumerable:!0,get:function(){let s=r.bind(is,t);return Object.defineProperty(t,i,{value:s,writable:!1,enumerable:!0}),s}})}function iy(t,i,r){if(null!=r){let s=null==i?t.toString(16):`${i.toString(16)} \u2192 ${t.toString(16)}`;return null==s?`[${r.padEnd(13)}]`:`[${r}${s.padStart(13-r.length)}]`}return null==i?`[${t.toString(16).padStart(13)}]`:`[${i.toString(16).padStart(5)} \u2192 ${t.toString(16).padStart(5)}]`}function iw(){let t=ig();if(null==t)return;let i=Object.create(t);return i[Symbol.dispose]=()=>{},i}function i_(t,i,r){if(null!=i&&"boolean"!=typeof i)return ib(i.scopeId,i.prevScopeId,`${i.prefix}${t}`);let s=i?ig()?.scopeId:void 0,o=im.next();return ib(o,s,`${iy(o,s,r)} ${t}`)}function ik(t,i,r,...s){switch(i){case"trace":is.trace(t,r,...s);break;case"info":is.info(t,r,...s);break;default:is.debug(t,r,...s)}}let LoggerContext=class LoggerContext{constructor(t){this.scope=i_(t,void 0),is.configure({name:t,createChannel:function(t){let i=is.isDebugging?function(t){}:function(t){};return{name:t,logLevel:0,trace:i,debug:i,info:i,warn:i,error:i}}},!1)}trace(t,...i){"string"==typeof t?is.trace(this.scope,t,...i):is.trace(t,i.shift(),...i)}debug(t,...i){"string"==typeof t?is.debug(this.scope,t,...i):is.debug(t,i.shift(),...i)}info(t,...i){"string"==typeof t?is.info(this.scope,t,...i):is.info(t,i.shift(),...i)}};let ix=new IpcNotification("home","subscription/didChange"),iC="graph";new IpcCommand(iC,"chooseRepository"),new IpcCommand(iC,"dblclick"),new IpcCommand(iC,"avatars/get"),new IpcCommand(iC,"refs/metadata/get"),new IpcCommand(iC,"rows/get"),new IpcCommand(iC,"pullRequest/openDetails"),new IpcCommand(iC,"row/action"),new IpcCommand(iC,"search/openInView"),new IpcCommand(iC,"search/cancel"),new IpcCommand(iC,"columns/update"),new IpcCommand(iC,"refs/update/visibility"),new IpcCommand(iC,"filters/update/excludeTypes"),new IpcCommand(iC,"configuration/update"),new IpcCommand(iC,"search/update/mode"),new IpcCommand(iC,"filters/update/includedRefs"),new IpcCommand(iC,"selection/update"),new IpcRequest(iC,"jumpToHead"),new IpcRequest(iC,"chooseRef"),new IpcRequest(iC,"chooseComparison"),new IpcRequest(iC,"chooseAuthor"),new IpcRequest(iC,"chooseFile"),new IpcRequest(iC,"rows/ensure"),new IpcRequest(iC,"search/history/get"),new IpcRequest(iC,"search/history/store"),new IpcRequest(iC,"search/history/delete"),new IpcRequest(iC,"counts"),new IpcRequest(iC,"row/hover/get"),new IpcRequest(iC,"search"),new IpcNotification(iC,"repositories/integration/didChange"),new IpcNotification(iC,"didChange",!0),new IpcNotification(iC,"configuration/didChange");let i$=new IpcNotification(iC,"subscription/didChange");new IpcNotification(iC,"org/settings/didChange"),new IpcNotification(iC,"avatars/didChange"),new IpcNotification(iC,"mcp/didChange"),new IpcNotification(iC,"branchState/didChange"),new IpcNotification(iC,"refs/didChangeMetadata"),new IpcNotification(iC,"columns/didChange"),new IpcNotification(iC,"scrollMarkers/didChange"),new IpcNotification(iC,"refs/didChangeVisibility"),new IpcNotification(iC,"rows/didChange"),new IpcNotification(iC,"rows/stats/didChange"),new IpcNotification(iC,"selection/didChange"),new IpcNotification(iC,"workingTree/didChange"),new IpcNotification(iC,"didSearch"),new IpcNotification(iC,"didFetch"),new IpcNotification(iC,"featurePreview/didStart");let iS="timeline";new IpcRequest(iS,"ref/choose"),new IpcRequest(iS,"path/choose"),new IpcCommand(iS,"point/open"),new IpcCommand(iS,"config/update"),new IpcCommand(iS,"scope/update");let iA=new IpcNotification(iS,"didChange");let PromosContext=class PromosContext{constructor(t){this.disposables=[],this._promos=new Map,this.ipc=t,this.disposables.push(this.ipc.onReceiveMessage(t=>{(ix.is(t)||i$.is(t)||iA.is(t))&&this._promos.clear()}))}async getApplicablePromo(t,i){let r=`${t}|${i}`,s=this._promos.get(r);return null==s&&(s=this.ipc.sendRequest(eh,{plan:t,location:i}).then(t=>t.promo,()=>void 0),this._promos.set(r,s)),await s}dispose(){this.disposables.forEach(t=>t.dispose())}};let TelemetryContext=class TelemetryContext{constructor(t){this.disposables=[],this.ipc=t}sendEvent(t){this.ipc.sendCommand(ed,t)}dispose(){this.disposables.forEach(t=>t.dispose())}};function iP(t){return(t=t.toString().toLowerCase()).includes("ms")?parseFloat(t):t.includes("s")?1e3*parseFloat(t):parseFloat(t)}function iT(t,i){return new Promise(r=>{t.addEventListener(i,function s(o){o.target===t&&(t.removeEventListener(i,s),r())})})}(b||(b={})).on=function(t,i,r,s){let o=!1;if("string"==typeof t){let n=function(i){let s=i?.target?.closest(t);null!=s&&r(i,s)};return document.addEventListener(i,n,s??!0),{dispose:()=>{o||(o=!0,document.removeEventListener(i,n,s??!0))}}}let n=function(t){r(t,this)};return t.addEventListener(i,n,s??!1),{dispose:()=>{o||(o=!0,t.removeEventListener(i,n,s??!1))}}};var iI=Uint8Array,iE=Uint16Array,iz=Int32Array,iR=new iI([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),iM=new iI([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iL=new iI([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),iO=function(t,i){for(var r=new iE(31),s=0;s<31;++s)r[s]=i+=1<<t[s-1];for(var o=new iz(r[30]),s=1;s<30;++s)for(var n=r[s];n<r[s+1];++n)o[n]=n-r[s]<<5|s;return{b:r,r:o}},iD=iO(iR,2),iB=iD.b,iN=iD.r;iB[28]=258,iN[258]=28;var iU=iO(iM,0),iF=iU.b;iU.r;for(var ij=new iE(32768),iV=0;iV<32768;++iV){var iH=(43690&iV)>>1|(21845&iV)<<1;iH=(61680&(iH=(52428&iH)>>2|(13107&iH)<<2))>>4|(3855&iH)<<4,ij[iV]=((65280&iH)>>8|(255&iH)<<8)>>1}for(var iq=function(t,i,r){for(var s,o=t.length,n=0,a=new iE(i);n<o;++n)t[n]&&++a[t[n]-1];var c=new iE(i);for(n=1;n<i;++n)c[n]=c[n-1]+a[n-1]<<1;if(r){s=new iE(1<<i);var h=15-i;for(n=0;n<o;++n)if(t[n])for(var p=n<<4|t[n],g=i-t[n],f=c[t[n]-1]++<<g,m=f|(1<<g)-1;f<=m;++f)s[ij[f]>>h]=p}else for(n=0,s=new iE(o);n<o;++n)t[n]&&(s[n]=ij[c[t[n]-1]++]>>15-t[n]);return s},iW=new iI(288),iV=0;iV<144;++iV)iW[iV]=8;for(var iV=144;iV<256;++iV)iW[iV]=9;for(var iV=256;iV<280;++iV)iW[iV]=7;for(var iV=280;iV<288;++iV)iW[iV]=8;for(var iG=new iI(32),iV=0;iV<32;++iV)iG[iV]=5;var iK=iq(iW,9,1),iZ=iq(iG,5,1),iX=function(t){for(var i=t[0],r=1;r<t.length;++r)t[r]>i&&(i=t[r]);return i},iQ=function(t,i,r){var s=i/8|0;return(t[s]|t[s+1]<<8)>>(7&i)&r},iY=function(t,i){var r=i/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&i)},iJ=function(t,i,r){return(null==i||i<0)&&(i=0),(null==r||r>t.length)&&(r=t.length),new iI(t.subarray(i,r))},i0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],i1=function(t,i,r){var s=Error(i||i0[t]);if(s.code=t,Error.captureStackTrace&&Error.captureStackTrace(s,i1),!r)throw s;return s},i2=function(t,i,r,s){var o=t.length,n=s?s.length:0;if(!o||i.f&&!i.l)return r||new iI(0);var a=!r,c=a||2!=i.i,h=i.i;a&&(r=new iI(3*o));var p=function(t){var i=r.length;if(t>i){var s=new iI(Math.max(2*i,t));s.set(r),r=s}},g=i.f||0,f=i.p||0,m=i.b||0,b=i.l,v=i.d,y=i.m,w=i.n,_=8*o;do{if(!b){g=iQ(t,f,1);var x=iQ(t,f+1,3);if(f+=3,x)if(1==x)b=iK,v=iZ,y=9,w=5;else if(2==x){var C=iQ(t,f,31)+257,$=iQ(t,f+10,15)+4,A=C+iQ(t,f+5,31)+1;f+=14;for(var P=new iI(A),T=new iI(19),E=0;E<$;++E)T[iL[E]]=iQ(t,f+3*E,7);f+=3*$;for(var M=iX(T),O=(1<<M)-1,D=iq(T,M,1),E=0;E<A;){var B=D[iQ(t,f,O)];f+=15&B;var N=B>>4;if(N<16)P[E++]=N;else{var U=0,F=0;for(16==N?(F=3+iQ(t,f,3),f+=2,U=P[E-1]):17==N?(F=3+iQ(t,f,7),f+=3):18==N&&(F=11+iQ(t,f,127),f+=7);F--;)P[E++]=U}}var j=P.subarray(0,C),V=P.subarray(C);y=iX(j),w=iX(V),b=iq(j,y,1),v=iq(V,w,1)}else i1(1);else{var N=((f+7)/8|0)+4,q=t[N-4]|t[N-3]<<8,W=N+q;if(W>o){h&&i1(0);break}c&&p(m+q),r.set(t.subarray(N,W),m),i.b=m+=q,i.p=f=8*W,i.f=g;continue}if(f>_){h&&i1(0);break}}c&&p(m+131072);for(var G=(1<<y)-1,K=(1<<w)-1,X=f;;X=f){var U=b[iY(t,f)&G],Q=U>>4;if((f+=15&U)>_){h&&i1(0);break}if(U||i1(2),Q<256)r[m++]=Q;else if(256==Q){X=f,b=null;break}else{var Y=Q-254;if(Q>264){var E=Q-257,J=iR[E];Y=iQ(t,f,(1<<J)-1)+iB[E],f+=J}var ee=v[iY(t,f)&K],et=ee>>4;ee||i1(3),f+=15&ee;var V=iF[et];if(et>3){var J=iM[et];V+=iY(t,f)&(1<<J)-1,f+=J}if(f>_){h&&i1(0);break}c&&p(m+131072);var ei=m+Y;if(m<V){var er=n-V,es=Math.min(V,ei);for(er+m<0&&i1(3);m<es;++m)r[m]=s[er+m]}for(;m<ei;++m)r[m]=r[m-V]}}i.l=b,i.p=X,i.b=m,i.f=g,b&&(g=1,i.m=y,i.d=v,i.n=w)}while(!g)return m!=r.length&&a?iJ(r,0,m):r.subarray(0,m)},i5=new iI(0),i3="u">typeof TextDecoder&&new TextDecoder;try{i3.decode(i5,{stream:!0})}catch{}var i6=function(t){for(var i="",r=0;;){var s=t[r++],o=(s>127)+(s>223)+(s>239);if(r+o>t.length)return{s:i,r:iJ(t,r-1)};o?3==o?i+=String.fromCharCode(55296|(s=((15&s)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536)>>10,56320|1023&s):1&o?i+=String.fromCharCode((31&s)<<6|63&t[r++]):i+=String.fromCharCode((15&s)<<12|(63&t[r++])<<6|63&t[r++]):i+=String.fromCharCode(s)}};function i4(t,i){if(i){for(var r="",s=0;s<t.length;s+=16384)r+=String.fromCharCode.apply(null,t.subarray(s,s+16384));return r}if(i3)return i3.decode(t);var o=i6(t),n=o.s,r=o.r;return r.length&&i1(8),n}"function"==typeof queueMicrotask&&queueMicrotask;let i7=/\(([\s\S]*)\)/,i8=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,i9=/\s?=.*$/;function re(t){var i,r;let s,o,n,a,c,h,p,g,f;return i="debug",c=!1,h=!0,null!=(r=t)&&({args:s,when:o,exit:n,prefix:a,onlyExit:c=!1,timing:h=!0}=r),p="object"==typeof h?h.warnAfter:1500,g=!1!==h||"object"==typeof c&&c.after>0,f="trace"===i?is.trace:"debug"===i?is.debug:is.info,(t,r,h)=>{let m,b;if("function"==typeof h.value?(m=h.value,b="value"):"function"==typeof h.get&&(m=h.get,b="get"),null==m||null==b)throw Error("Not supported");let v=null==s?function(t){if("function"!=typeof t)throw Error("Not supported");if(0===t.length)return[];let i=Function.prototype.toString.call(t),r=(i=(i=i.replace(i8,"")||i).slice(0,i.indexOf("{"))).indexOf("("),s=i.indexOf(")");r=r>=0?r+1:0,s=s>0?s:i.indexOf("="),i=i.slice(r,s),i=`(${i})`;let o=i7.exec(i);return null!=o?o[1].split(",").map(t=>t.trim().replace(i9,"")):[]}(m):[];h[b]=function(...t){let h;if(!is.enabled()||null!=o&&!o.apply(this,t))return m.apply(this,t);let b=is.enabled(i),y=iw(),w=y?.scopeId,_=im.next(),x=this!=null?function(t){let i;if("function"==typeof t){if(null==(i=t.prototype?.constructor))return t.name}else i=t.constructor;let r=i?.name??"",s=r.indexOf("_");-1!==s&&(r=r.substring(s+1));let o=i;for(;null!=o;){let i=io.get(o);if(null!=i)return i(t,r);o=Object.getPrototypeOf(o)}return r}(this):void 0,C=x?`${iy(_,w)} ${x}.${r}`:`${iy(_,w)} ${r}`;null!=a&&(C=a({id:_,instance:this,instanceName:x??"",name:r,prefix:C},...t));let $=ib(_,w,C),A=!1,P=()=>(A||(A=!0,h=function(t,i,r){if(!1===t||!i.length)return;if("function"==typeof t){let r=t(...i);if(!1===r)return;let s="";for(let[t,i]of Object.entries(r))s.length&&(s+=", "),s+=`${t}=${is.toLoggable(i,t)}`;return s||void 0}let s="",o=-1;for(let t of i){let i=r[++o];s.length&&(s+=", "),s+=i?`${i}=${is.toLoggable(t,i)}`:is.toLoggable(t)}return s||void 0}(s,t,v)),h);if(!c&&b){let t=P();f.call(is,t?`${C}(${t})`:C)}if(c||g||null!=n){let i=g?ih():void 0,r=t=>{let r=void 0!==i?` [${id(i)}ms]`:"",s=$.getExitInfo();if(c){let i=P();is.error(t,i?`${C}(${i})`:C,s?.details?`failed${s.details}${r}`:`failed${r}`)}else is.error(t,C,s?.details?`failed${s.details}${r}`:`failed${r}`)},s=t=>{let r,s,o,a;null!=i?(r=id(i))>p?(s=is.warn,o=` [*${r}ms] (slow)`):(s=f,o=` [${r}ms]`):(o="",s=f);let h=$.getExitInfo();if(null!=n)if("function"==typeof n)try{a=n(t)}catch(t){a=`@log.exit error: ${t}`}else!0===n&&(a=`returned ${is.toLoggable(t)}`);else h?.failed?(a=h.failed,s=(t,...i)=>is.error(null,t,...i)):a="completed";if(b||s!==f){let t=P();c?(!0===c||0===c.after||r>c.after)&&s.call(is,t?`${C}(${t}) ${a}${h?.details||""}${o}`:`${C} ${a}${h?.details||""}${o}`):s.call(is,t?`${C}(${t}) ${a}${h?.details||""}${o}`:`${C} ${a}${h?.details||""}${o}`)}};return iu($,()=>{var i;let o;try{o=m.apply(this,t)}catch(t){throw r(t),t}return null!=o&&null!=(i=o)&&(i instanceof Promise||"function"==typeof i?.then)?o.then(s,r):s(o),o})}return iu($,()=>m.apply(this,t))}}}Symbol.dispose??=Symbol("Symbol.dispose"),Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");let Stopwatch=class Stopwatch{constructor(t,i,...r){let s;this._stopped=!1,this.logScope=null!=t&&"string"!=typeof t?t:i_(t??"",!1,i?.scopeLabel);let o=i?.log;if(s=null==o||!0===o?{}:!1===o||o.onlyExit?void 0:o,this.logLevel=("object"==typeof o?o.level:void 0)??"debug",this.logProvider=i?.provider??ia,this._time=ih(),null!=s){if(!this.logProvider.enabled(this.logLevel))return;r.length?this.logProvider.log(this.logLevel,this.logScope,`${s.message??""}${s.suffix??""}`,...r):this.logProvider.log(this.logLevel,this.logScope,`${s.message??""}${s.suffix??""}`)}}get startTime(){return this._time}[Symbol.dispose](){this.stop()}elapsed(){return id(this._time)}log(t){this.logCore(t,!1)}restart(t){this.logCore(t,!0),this._time=ih(),this._stopped=!1}stop(t){this._stopped||(this.restart(t),this._stopped=!0)}logCore(t,i){if(!this.logProvider.enabled(this.logLevel))return;if(!i)return void this.logProvider.log(this.logLevel,this.logScope,`${t?.message??""}${t?.suffix??""}`);let r=id(this._time),s=t?.message??"";this.logProvider.log(r>250?"warn":this.logLevel,this.logScope,`${s?`${s} `:""}[${r}ms]${t?.suffix??""}`)}};(()=>{let t;var i,r,s={975:t=>{function i(t){if("string"!=typeof t)throw TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,i){for(var r,s="",o=0,n=-1,a=0,c=0;c<=t.length;++c){if(c<t.length)r=t.charCodeAt(c);else{if(47===r)break;r=47}if(47===r){if(n===c-1||1===a);else if(n!==c-1&&2===a){if(s.length<2||2!==o||46!==s.charCodeAt(s.length-1)||46!==s.charCodeAt(s.length-2)){if(s.length>2){var h=s.lastIndexOf("/");if(h!==s.length-1){-1===h?(s="",o=0):o=(s=s.slice(0,h)).length-1-s.lastIndexOf("/"),n=c,a=0;continue}}else if(2===s.length||1===s.length){s="",o=0,n=c,a=0;continue}}i&&(s.length>0?s+="/..":s="..",o=2)}else s.length>0?s+="/"+t.slice(n+1,c):s=t.slice(n+1,c),o=c-n-1;n=c,a=0}else 46===r&&-1!==a?++a:a=-1}return s}var s={resolve:function(){for(var t,s,o="",n=!1,a=arguments.length-1;a>=-1&&!n;a--)a>=0?t=arguments[a]:(void 0===s&&(s=process.cwd()),t=s),i(t),0!==t.length&&(o=t+"/"+o,n=47===t.charCodeAt(0));return o=r(o,!n),n?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(t){if(i(t),0===t.length)return".";var s=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!s)).length||s||(t="."),t.length>0&&o&&(t+="/"),s?"/"+t:t},isAbsolute:function(t){return i(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0==arguments.length)return".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];i(o),o.length>0&&(void 0===t?t=o:t+="/"+o)}return void 0===t?".":s.normalize(t)},relative:function(t,r){if(i(t),i(r),t===r||(t=s.resolve(t))===(r=s.resolve(r)))return"";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var n=t.length,a=n-o,c=1;c<r.length&&47===r.charCodeAt(c);++c);for(var h=r.length-c,p=a<h?a:h,g=-1,f=0;f<=p;++f){if(f===p){if(h>p){if(47===r.charCodeAt(c+f))return r.slice(c+f+1);if(0===f)return r.slice(c+f)}else a>p&&(47===t.charCodeAt(o+f)?g=f:0===f&&(g=0));break}var m=t.charCodeAt(o+f);if(m!==r.charCodeAt(c+f))break;47===m&&(g=f)}var b="";for(f=o+g+1;f<=n;++f)f!==n&&47!==t.charCodeAt(f)||(0===b.length?b+="..":b+="/..");return b.length>0?b+r.slice(c+g):(c+=g,47===r.charCodeAt(c)&&++c,r.slice(c))},_makeLong:function(t){return t},dirname:function(t){if(i(t),0===t.length)return".";for(var r=t.charCodeAt(0),s=47===r,o=-1,n=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!n){o=a;break}}else n=!1;return -1===o?s?"/":".":s&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw TypeError('"ext" argument must be a string');i(t);var s,o=0,n=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return"";var c=r.length-1,h=-1;for(s=t.length-1;s>=0;--s){var p=t.charCodeAt(s);if(47===p){if(!a){o=s+1;break}}else -1===h&&(a=!1,h=s+1),c>=0&&(p===r.charCodeAt(c)?-1==--c&&(n=s):(c=-1,n=h))}return o===n?n=h:-1===n&&(n=t.length),t.slice(o,n)}for(s=t.length-1;s>=0;--s)if(47===t.charCodeAt(s)){if(!a){o=s+1;break}}else -1===n&&(a=!1,n=s+1);return -1===n?"":t.slice(o,n)},extname:function(t){i(t);for(var r=-1,s=0,o=-1,n=!0,a=0,c=t.length-1;c>=0;--c){var h=t.charCodeAt(c);if(47!==h)-1===o&&(n=!1,o=c+1),46===h?-1===r?r=c:1!==a&&(a=1):-1!==r&&(a=-1);else if(!n){s=c+1;break}}return -1===r||-1===o||0===a||1===a&&r===o-1&&r===s+1?"":t.slice(r,o)},format:function(t){var i,r;if(null===t||"object"!=typeof t)throw TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return i=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||""),i?i===t.root?i+r:i+"/"+r:r},parse:function(t){i(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var s,o=t.charCodeAt(0),n=47===o;n?(r.root="/",s=1):s=0;for(var a=-1,c=0,h=-1,p=!0,g=t.length-1,f=0;g>=s;--g)if(47!==(o=t.charCodeAt(g)))-1===h&&(p=!1,h=g+1),46===o?-1===a?a=g:1!==f&&(f=1):-1!==a&&(f=-1);else if(!p){c=g+1;break}return -1===a||-1===h||0===f||1===f&&a===h-1&&a===c+1?-1!==h&&(r.base=r.name=0===c&&n?t.slice(1,h):t.slice(c,h)):(0===c&&n?(r.name=t.slice(1,a),r.base=t.slice(1,h)):(r.name=t.slice(c,a),r.base=t.slice(c,h)),r.ext=t.slice(a,h)),c>0?r.dir=t.slice(0,c-1):n&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,t.exports=s}},o={};function n(t){var i=o[t];if(void 0!==i)return i.exports;var r=o[t]={exports:{}};return s[t](r,r.exports,n),r.exports}n.d=(t,i)=>{for(var r in i)n.o(i,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},n.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),n.r=t=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var a={};(n.r(a),n.d(a,{URI:()=>l,Utils:()=>r}),"object"==typeof process)?t="win32"===process.platform:"object"==typeof navigator&&(t=navigator.userAgent.indexOf("Windows")>=0);let c=/^\w[\w\d+.-]*$/,h=/^\//,p=/^\/\//;function g(t,i){if(!t.scheme&&i)throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`);if(t.scheme&&!c.test(t.scheme))throw Error("[UriError]: Scheme contains illegal characters.");if(t.path){if(t.authority){if(!h.test(t.path))throw Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(p.test(t.path))throw Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;let l=class l{static isUri(t){return t instanceof l||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString}scheme;authority;path;query;fragment;constructor(t,i,r,s,o,n=!1){"object"==typeof t?(this.scheme=t.scheme||"",this.authority=t.authority||"",this.path=t.path||"",this.query=t.query||"",this.fragment=t.fragment||""):(this.scheme=t||n?t:"file",this.authority=i||"",this.path=function(t,i){switch(t){case"https":case"http":case"file":i?"/"!==i[0]&&(i="/"+i):i="/"}return i}(this.scheme,r||""),this.query=s||"",this.fragment=o||"",g(this,n))}get fsPath(){return _(this,!1)}with(t){if(!t)return this;let{scheme:i,authority:r,path:s,query:o,fragment:n}=t;return void 0===i?i=this.scheme:null===i&&(i=""),void 0===r?r=this.authority:null===r&&(r=""),void 0===s?s=this.path:null===s&&(s=""),void 0===o?o=this.query:null===o&&(o=""),void 0===n?n=this.fragment:null===n&&(n=""),i===this.scheme&&r===this.authority&&s===this.path&&o===this.query&&n===this.fragment?this:new d(i,r,s,o,n)}static parse(t,i=!1){let r=f.exec(t);return r?new d(r[2]||"",$(r[4]||""),$(r[5]||""),$(r[7]||""),$(r[9]||""),i):new d("","","","","")}static file(i){let r="";if(t&&(i=i.replace(/\\/g,"/")),"/"===i[0]&&"/"===i[1]){let t=i.indexOf("/",2);-1===t?(r=i.substring(2),i="/"):(r=i.substring(2,t),i=i.substring(t)||"/")}return new d("file",r,i,"","")}static from(t){let i=new d(t.scheme,t.authority,t.path,t.query,t.fragment);return g(i,!0),i}toString(t=!1){return x(this,t)}toJSON(){return this}static revive(t){if(t){if(t instanceof l)return t;{let i=new d(t);return i._formatted=t.external,i._fsPath=t._sep===m?t.fsPath:null,i}}return t}};let m=t?1:void 0;let d=class d extends l{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=_(this,!1)),this._fsPath}toString(t=!1){return t?x(this,!0):(this._formatted||(this._formatted=x(this,!1)),this._formatted)}toJSON(){let t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=m),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t}};let b={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function y(t,i,r){let s,o=-1;for(let n=0;n<t.length;n++){let a=t.charCodeAt(n);if(a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||45===a||46===a||95===a||126===a||i&&47===a||r&&91===a||r&&93===a||r&&58===a)-1!==o&&(s+=encodeURIComponent(t.substring(o,n)),o=-1),void 0!==s&&(s+=t.charAt(n));else{void 0===s&&(s=t.substr(0,n));let i=b[a];void 0!==i?(-1!==o&&(s+=encodeURIComponent(t.substring(o,n)),o=-1),s+=i):-1===o&&(o=n)}}return -1!==o&&(s+=encodeURIComponent(t.substring(o))),void 0!==s?s:t}function w(t){let i;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);35===s||63===s?(void 0===i&&(i=t.substr(0,r)),i+=b[s]):void 0!==i&&(i+=t[r])}return void 0!==i?i:t}function _(i,r){let s;return s=i.authority&&i.path.length>1&&"file"===i.scheme?`//${i.authority}${i.path}`:47===i.path.charCodeAt(0)&&(i.path.charCodeAt(1)>=65&&90>=i.path.charCodeAt(1)||i.path.charCodeAt(1)>=97&&122>=i.path.charCodeAt(1))&&58===i.path.charCodeAt(2)?r?i.path.substr(1):i.path[1].toLowerCase()+i.path.substr(2):i.path,t&&(s=s.replace(/\//g,"\\")),s}function x(t,i){let r=i?w:y,s="",{scheme:o,authority:n,path:a,query:c,fragment:h}=t;if(o&&(s+=o,s+=":"),(n||"file"===o)&&(s+="/",s+="/"),n){let t=n.indexOf("@");if(-1!==t){let i=n.substr(0,t);n=n.substr(t+1),-1===(t=i.lastIndexOf(":"))?s+=r(i,!1,!1):(s+=r(i.substr(0,t),!1,!1),s+=":",s+=r(i.substr(t+1),!1,!0)),s+="@"}-1===(t=(n=n.toLowerCase()).lastIndexOf(":"))?s+=r(n,!1,!0):(s+=r(n.substr(0,t),!1,!0),s+=n.substr(t))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2)){let t=a.charCodeAt(1);t>=65&&t<=90&&(a=`/${String.fromCharCode(t+32)}:${a.substr(3)}`)}else if(a.length>=2&&58===a.charCodeAt(1)){let t=a.charCodeAt(0);t>=65&&t<=90&&(a=`${String.fromCharCode(t+32)}:${a.substr(2)}`)}s+=r(a,!0,!1)}return c&&(s+="?",s+=r(c,!1,!1)),h&&(s+="#",s+=i?h:y(h,!1,!1)),s}let C=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function $(t){return t.match(C)?t.replace(C,t=>(function t(i){try{return decodeURIComponent(i)}catch{return i.length>3?i.substr(0,3)+t(i.substr(3)):i}})(t)):t}var A=n(975);let P=A.posix||A;(i=r||(r={})).joinPath=function(t,...i){return t.with({path:P.join(t.path,...i)})},i.resolvePath=function(t,...i){let r=t.path,s=!1;"/"!==r[0]&&(r="/"+r,s=!0);let o=P.resolve(r,...i);return s&&"/"===o[0]&&!t.authority&&(o=o.substring(1)),t.with({path:o})},i.dirname=function(t){if(0===t.path.length||"/"===t.path)return t;let i=P.dirname(t.path);return 1===i.length&&46===i.charCodeAt(0)&&(i=""),t.with({path:i})},i.basename=function(t){return P.basename(t.path)},i.extname=function(t){return P.extname(t.path)},v=a})();let{URI:rt,Utils:ri}=v;function rr(t,i){return JSON.parse(t,(t,r)=>(function(t,i){let r=function(t){if("object"!=typeof t||null==t)return;let i=t.__ipc;if(null!=i)switch(i){case"date":return"number"==typeof t.value?t:void 0;case"promise":return"object"==typeof t.value&&"string"==typeof t.value.id&&"string"==typeof t.value.method?t:void 0;case"uri":return"object"==typeof t.value&&"string"==typeof t.value?.scheme?t:void 0;default:return}}(t);if(null==r)return t;switch(r.__ipc){case"date":return new Date(r.value);case"promise":return i(r.value);case"uri":return rt.revive(r.value)}})(r,i))}let rs="__supertalk_rpc__";new TextEncoder,new TextDecoder;let Emitter=class Emitter{constructor(){this._disposed=!1}static{this._noop=function(){}}get event(){return this._event??=(t,i,r)=>{this.listeners??=new LinkedList;let s=this.listeners.push(null==i?t:[t,i]),o={dispose:()=>{o.dispose=Emitter._noop,this._disposed||s()}};return Array.isArray(r)&&r.push(o),o},this._event}fire(t){if(null!=this.listeners){this._deliveryQueue??=new LinkedList;for(let i=this.listeners.iterator(),r=i.next();!r.done;r=i.next())this._deliveryQueue.push([r.value,t]);for(;this._deliveryQueue.size>0;){let[t,i]=this._deliveryQueue.shift();try{"function"==typeof t?t(i):t[0].call(t[1],i)}catch{}}}}dispose(){this.listeners?.clear(),this._deliveryQueue?.clear(),this._disposed=!0}};let ro={done:!0,value:void 0};let events_Node=class events_Node{static{this.Undefined=new events_Node(void 0)}constructor(t){this.element=t,this.next=events_Node.Undefined,this.prev=events_Node.Undefined}};let LinkedList=class LinkedList{constructor(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===events_Node.Undefined}clear(){this._first=events_Node.Undefined,this._last=events_Node.Undefined,this._size=0}unshift(t){return this._insert(t,!1)}push(t){return this._insert(t,!0)}_insert(t,i){let r=new events_Node(t);if(this._first===events_Node.Undefined)this._first=r,this._last=r;else if(i){let t=this._last;this._last=r,r.prev=t,t.next=r}else{let t=this._first;this._first=r,r.next=t,t.prev=r}this._size+=1;let s=!1;return()=>{s||(s=!0,this._remove(r))}}shift(){if(this._first===events_Node.Undefined)return;let t=this._first.element;return this._remove(this._first),t}pop(){if(this._last===events_Node.Undefined)return;let t=this._last.element;return this._remove(this._last),t}_remove(t){if(t.prev!==events_Node.Undefined&&t.next!==events_Node.Undefined){let i=t.prev;i.next=t.next,t.next.prev=i}else t.prev===events_Node.Undefined&&t.next===events_Node.Undefined?(this._first=events_Node.Undefined,this._last=events_Node.Undefined):t.next===events_Node.Undefined?(this._last=this._last.prev,this._last.next=events_Node.Undefined):t.prev===events_Node.Undefined&&(this._first=this._first.next,this._first.prev=events_Node.Undefined);this._size-=1}iterator(){let t,i=this._first;return{next:function(){return i===events_Node.Undefined?ro:(null==t?t={done:!1,value:i.element}:t.value=i.element,i=i.next,t)}}}toArray(){let t=[];for(let i=this._first;i!==events_Node.Undefined;i=i.next)t.push(i.element);return t}};var rn=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,rl=(t,i)=>(i=Symbol[t])?i:Symbol.for("Symbol."+t),rc=t=>{throw TypeError(t)},rh=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?ra(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&rn(i,r,n),n};function rd(){return i??=null!=r?r():acquireVsCodeApi()}let rp=ic();function ru(){return`webview:${rp.next()}`}let rg=class{constructor(t){this.appName=t,this._onReceiveMessage=new Emitter,this._pendingHandlers=new Map,this._api=rd(),this._disposable=b.on(window,"message",t=>this.onMessageReceived(t))}get onReceiveMessage(){return this._onReceiveMessage.event}dispose(){this._disposable.dispose()}onMessageReceived(i){var r,s,o,n,a,c,h,p,g,f=[];try{if(o=i.data,"object"==typeof o&&null!==o&&rs in o&&!0===o[rs])return;let a=i.data,c=((t,i,r)=>{if(null!=i){var s,o;"object"!=typeof i&&"function"!=typeof i&&rc("Object expected"),r&&(s=i[rl("asyncDispose")]),void 0===s&&(s=i[rl("dispose")],r&&(o=s)),"function"!=typeof s&&rc("Object not disposable"),o&&(s=function(){try{o.call(this)}catch(t){return Promise.reject(t)}}),t.push([r,s,i])}else r&&t.push([r]);return i})(f,function(i,r,s){var o,n;let a,c,h;if(!is.enabled())return;let p=(o=s?.scope??!0,n=s?.scopeLabel,c=ig(),t=(h=i_(i,o,n)).scopeId,ip.set(h.scopeId,h),h[Symbol.dispose]=()=>{let i;i=h?.scopeId??t,null!=i&&ip.delete(i),t=c?.scopeId},h);if(!r)return p;let g="debug",f=!1;"object"==typeof r&&(g=r.level??g,a=r.message,f=!0===r.onlyExit);let m=ih();f||ik(p,g,a??"");let b=p[Symbol.dispose];return p[Symbol.dispose]=()=>{let t=id(m),i=` [${t}ms]`,r=p.getExitInfo(),s=r.failed??"completed";null!=r.failed?is.error(null,p,`${s}${r.details??""}${i}`):ik(p,g,`${s}${r.details??""}${i}`),b()},p}(`(e=${a.id}|${a.method})`,void 0,{scope:iw()})),h=function(t,i,...r){let s=("object"==typeof i?.log?i.log.level:void 0)??"info";return(i?.provider??ia).enabled(s)?new Stopwatch(t,i,...r):void 0}(c,{log:{onlyExit:!0,level:"debug"}});if(a.compressed&&a.params instanceof Uint8Array){if("deflate"===a.compressed)try{a.params=i4((n=a.params,i2(n,{i:2},void 0,void 0)))}catch(t){a.params=i4(a.params)}else a.params=i4(a.params);h?.restart({message:`\u2022 decompressed (${a.compressed}) serialized params`})}if("string"==typeof a.params?(a.params=rr(a.params,t=>this.getResponsePromise(t.method,t.id)),h?.stop({message:"• deserialized params"})):null==a.params?h?.stop({message:"• no params"}):h?.stop({message:"• invalid params"}),c?.addExitInfo(`ipc (host -> webview) duration=${Date.now()-a.timestamp}ms`),null!=a.completionId){let t=(r=a.method,s=a.completionId,`${r}|${s}`);this._pendingHandlers.get(t)?.(a);return}this._onReceiveMessage.fire(a)}catch(t){var m=t,b=!0}finally{a=m,c=b,h="function"==typeof SuppressedError?SuppressedError:function(t,i,r,s){return(s=Error(r)).name="SuppressedError",s.error=t,s.suppressed=i,s},p=t=>a=c?new h(t,a,"An error was suppressed during disposal"):(c=!0,t),(g=t=>{for(;t=f.pop();)try{var i=t[1]&&t[1].call(t[2]);if(t[0])return Promise.resolve(i).then(g,t=>(p(t),g()))}catch(t){p(t)}if(c)throw a})()}}deserializeIpcData(t){return rr(t,t=>this.getResponsePromise(t.method,t.id))}sendCommand(t,i){let r=ru();this.postMessage({id:r,scope:t.scope,method:t.method,params:i,compressed:!1,timestamp:Date.now()})}async sendRequest(t,i){let r=ru(),s=this.getResponsePromise(t.response.method,r);return this.postMessage({id:r,scope:t.scope,method:t.method,params:i,compressed:!1,timestamp:Date.now(),completionId:r}),s}getResponsePromise(t,i){return new Promise((r,s)=>{var o,n;let a,c=(o=t,n=i,`${o}|${n}`);function h(){clearTimeout(a),a=void 0,this._pendingHandlers.delete(c)}a=setTimeout(()=>{h.call(this),s(Error(`Timed out waiting for completion of ${c}`))},(is.isDebugging?60:5)*6e4),this._pendingHandlers.set(c,t=>{if(h.call(this),t.method===ep.method){let i=t.params;"rejected"===i.status?queueMicrotask(()=>s(Error(i.reason))):queueMicrotask(()=>r(i.value))}else queueMicrotask(()=>r(t.params))})})}setPersistedState(t){this._api.setState(t)}updatePersistedState(t){let i=this._api.getState();null!=i&&"object"==typeof i?(i={...i,...t},this._api.setState(i)):i=t,this.setPersistedState(i)}postMessage(t){this._api.postMessage(t)}};function rf(t,i){let r=Math.pow(10,i);return Math.round(t*r)/r}rh([re({args:t=>({e:`${t.data.id}|${t.data.method}`})})],rg.prototype,"onMessageReceived",1),rh([re({args:t=>({commandType:t.method})})],rg.prototype,"sendCommand",1),rh([re({args:t=>({requestType:t.method})})],rg.prototype,"sendRequest",1),rh([re({args:t=>({e:`${t.id}, method=${t.method}`})})],rg.prototype,"postMessage",1),rg=rh([(h=t=>`${t.appName}(HostIpc)`,t=>void io.set(t,h))],rg);let RGBA=class RGBA{constructor(t,i,r,s=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,t)),this.g=0|Math.min(255,Math.max(0,i)),this.b=0|Math.min(255,Math.max(0,r)),this.a=rf(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.r===i.r&&t.g===i.g&&t.b===i.b&&t.a===i.a}};let HSLA=class HSLA{constructor(t,i,r,s){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=rf(Math.max(Math.min(1,i),0),3),this.l=rf(Math.max(Math.min(1,r),0),3),this.a=rf(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.h===i.h&&t.s===i.s&&t.l===i.l&&t.a===i.a}static fromRGBA(t){let i=t.r/255,r=t.g/255,s=t.b/255,o=t.a,n=Math.max(i,r,s),a=Math.min(i,r,s),c=0,h=0,p=(a+n)/2,g=n-a;if(g>0){switch(h=Math.min(p<=.5?g/(2*p):g/(2-2*p),1),n){case i:c=(r-s)/g+6*(r<s);break;case r:c=(s-i)/g+2;break;case s:c=(i-r)/g+4}c*=60,c=Math.round(c)}return new HSLA(c,h,p,o)}static _hue2rgb(t,i,r){return(r<0&&(r+=1),r>1&&(r-=1),r<1/6)?t+(i-t)*6*r:r<.5?i:r<2/3?t+(i-t)*(2/3-r)*6:t}static toRGBA(t){let i,r,s,o=t.h/360,{s:n,l:a,a:c}=t;if(0===n)i=r=s=a;else{let t=a<.5?a*(1+n):a+n-a*n,c=2*a-t;i=HSLA._hue2rgb(c,t,o+1/3),r=HSLA._hue2rgb(c,t,o),s=HSLA._hue2rgb(c,t,o-1/3)}return new RGBA(Math.round(255*i),Math.round(255*r),Math.round(255*s),c)}};let HSVA=class HSVA{constructor(t,i,r,s){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,t),0),this.s=rf(Math.max(Math.min(1,i),0),3),this.v=rf(Math.max(Math.min(1,r),0),3),this.a=rf(Math.max(Math.min(1,s),0),3)}static equals(t,i){return t.h===i.h&&t.s===i.s&&t.v===i.v&&t.a===i.a}static fromRGBA(t){let i=t.r/255,r=t.g/255,s=t.b/255,o=Math.max(i,r,s),n=o-Math.min(i,r,s);return new HSVA(Math.round(60*(0===n?0:o===i?((r-s)/n%6+6)%6:o===r?(s-i)/n+2:(i-r)/n+4)),0===o?0:n/o,o,t.a)}static toRGBA(t){let{h:i,s:r,v:s,a:o}=t,n=s*r,a=n*(1-Math.abs(i/60%2-1)),c=s-n,[h,p,g]=[0,0,0];return i<60?(h=n,p=a):i<120?(h=a,p=n):i<180?(p=n,g=a):i<240?(p=a,g=n):i<300?(h=a,g=n):i<=360&&(h=n,g=a),new RGBA(h=Math.round((h+c)*255),p=Math.round((p+c)*255),g=Math.round((g+c)*255),o)}};function rm(t,i){return i.getPropertyValue(t).trim()}let Color=class Color{static from(t){return t instanceof Color?t:parseColor(t)||Color.red}static fromCssVariable(t,i){return parseColor(rm(t,i))||Color.red}static fromHex(t){return parseHexColor(t)||Color.red}static equals(t,i){return!t&&!i||!!t&&!!i&&t.equals(i)}get hsla(){return this._hsla?this._hsla:HSLA.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:HSVA.fromRGBA(this.rgba)}constructor(t){if(t)if(t instanceof RGBA)this.rgba=t;else if(t instanceof HSLA)this._hsla=t,this.rgba=HSLA.toRGBA(t);else if(t instanceof HSVA)this._hsva=t,this.rgba=HSVA.toRGBA(t);else throw Error("Invalid color ctor argument");else throw Error("Color needs a value")}equals(t){return null!=t&&!!t&&RGBA.equals(this.rgba,t.rgba)&&HSLA.equals(this.hsla,t.hsla)&&HSVA.equals(this.hsva,t.hsva)}getRelativeLuminance(){return rf(.2126*Color._relativeLuminanceForComponent(this.rgba.r)+.7152*Color._relativeLuminanceForComponent(this.rgba.g)+.0722*Color._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(t){let i=t/255;return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)}luminance(t){return luminance(this,t)}getContrastRatio(t){let i=this.getRelativeLuminance(),r=t.getRelativeLuminance();return i>r?(i+.05)/(r+.05):(r+.05)/(i+.05)}isDarker(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3<128}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(t){return this.getRelativeLuminance()>t.getRelativeLuminance()}isDarkerThan(t){return this.getRelativeLuminance()<t.getRelativeLuminance()}lighten(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*t,this.hsla.a))}darken(t){return new Color(new HSLA(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*t,this.hsla.a))}transparent(t){let{r:i,g:r,b:s,a:o}=this.rgba;return new Color(new RGBA(i,r,s,o*t))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Color(new RGBA(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}blend(t){let i=t.rgba,r=this.rgba.a,s=i.a,o=r+s*(1-r);return o<1e-6?Color.transparent:new Color(new RGBA(this.rgba.r*r/o+i.r*s*(1-r)/o,this.rgba.g*r/o+i.g*s*(1-r)/o,this.rgba.b*r/o+i.b*s*(1-r)/o,o))}mix(t,i){return mixColors(this,t,i)}makeOpaque(t){if(this.isOpaque()||1!==t.rgba.a)return this;let{r:i,g:r,b:s,a:o}=this.rgba;return new Color(new RGBA(t.rgba.r-o*(t.rgba.r-i),t.rgba.g-o*(t.rgba.g-r),t.rgba.b-o*(t.rgba.b-s),1))}flatten(...t){let i=t.reduceRight((t,i)=>Color._flatten(i,t));return Color._flatten(this,i)}static _flatten(t,i){let r=1-t.rgba.a;return new Color(new RGBA(r*i.rgba.r+t.rgba.a*t.rgba.r,r*i.rgba.g+t.rgba.a*t.rgba.g,r*i.rgba.b+t.rgba.a*t.rgba.b))}toString(){return this._toString||(this._toString=function(t){return t.isOpaque()?`#${rb(t.rgba.r)}${rb(t.rgba.g)}${rb(t.rgba.b)}`:`rgba(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b}, ${Number(t.rgba.a.toFixed(2))})`}(this)),this._toString}static getLighterColor(t,i,r){if(t.isLighterThan(i))return t;r=r||.5;let s=t.getRelativeLuminance(),o=i.getRelativeLuminance();return r=r*(o-s)/o,t.lighten(r)}static getDarkerColor(t,i,r){if(t.isDarkerThan(i))return t;r=r||.5;let s=t.getRelativeLuminance(),o=i.getRelativeLuminance();return r=r*(s-o)/s,t.darken(r)}static{this.white=new Color(new RGBA(255,255,255,1))}static{this.black=new Color(new RGBA(0,0,0,1))}static{this.red=new Color(new RGBA(255,0,0,1))}static{this.blue=new Color(new RGBA(0,0,255,1))}static{this.green=new Color(new RGBA(0,255,0,1))}static{this.cyan=new Color(new RGBA(0,255,255,1))}static{this.lightgrey=new Color(new RGBA(211,211,211,1))}static{this.transparent=new Color(new RGBA(0,0,0,0))}};function rb(t){let i=t.toString(16);return 2!==i.length?`0${i}`:i}let rv=new Emitter,ry=rv.event;function rw(t){let i=document.documentElement,r=window.getComputedStyle(i),s=document.body.classList,o=s.contains("vscode-light")||s.contains("vscode-high-contrast-light"),n=s.contains("vscode-high-contrast")||s.contains("vscode-high-contrast-light"),a=rm("--vscode-editor-background",r),c=rm("--vscode-editor-foreground",r);return c||(c=rm("--vscode-foreground",r)),{colors:{background:a,foreground:c},computedStyle:r,isLightTheme:o,isHighContrastTheme:n,isInitializing:null==t}}function r_(){let t=new MutationObserver(t=>{rv.fire(rw(t))});return t.observe(document.body,{attributeFilter:["class"]}),{dispose:()=>t.disconnect()}}var rk=Object.defineProperty,rx=Object.getOwnPropertyDescriptor,rC=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?rx(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&rk(i,r,n),n};let GlWebviewApp=class GlWebviewApp extends GlElement{constructor(){super(...arguments),this.placement="editor",this.disposables=[]}static{this.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0}}initWebviewContext(t){let i=JSON.parse(t4.decode(function(t){let i=globalThis.atob(t),r=i.length,s=new Uint8Array(r),o=0,n=r-r%8;for(;o<n;o+=8)s[o]=i.charCodeAt(o),s[o+1]=i.charCodeAt(o+1),s[o+2]=i.charCodeAt(o+2),s[o+3]=i.charCodeAt(o+3),s[o+4]=i.charCodeAt(o+4),s[o+5]=i.charCodeAt(o+5),s[o+6]=i.charCodeAt(o+6),s[o+7]=i.charCodeAt(o+7);for(;o<r;o++)s[o]=i.charCodeAt(o);return s}(t))),r=i.webviewId,s=i.webviewInstanceId;this._webview={webviewId:r,webviewInstanceId:s,createCommandLink:(t,i)=>(t.endsWith(":")&&(t=`${t}${r.split(".").at(-1)}`),t7(t,r,s,i))}}connectedCallback(){let t,i,r,s;super.connectedCallback?.(),this._logger=new LoggerContext(this.name),this._logger.debug("connected"),this._ipc=new rg(this.name);let o=rw();null!=this.onThemeUpdated&&(this.onThemeUpdated(o),this.disposables.push(r_()),this.disposables.push(ry(this.onThemeUpdated,this))),this.disposables.push(this._ipc.onReceiveMessage(t=>{switch(!0){case eu.is(t):this.onWebviewFocusChanged?.(t.params.focused),window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case eg.is(t):this.onWebviewVisibilityChanged?.(t.params.visible),window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"))}}),this._ipc,this._promos=new PromosContext(this._ipc),this._telemetry=new TelemetryContext(this._ipc)),this._focusTracker=(r=0,s=C(t=>{let i=`webview:${++r}`;rd().postMessage({id:i,scope:el.scope,method:el.method,params:t,compressed:!1,timestamp:Date.now()})},150),{onFocusIn:r=>{let o=r.composedPath().some(t=>"INPUT"===t.tagName);(!0!==t||i!==o)&&(t=!0,i=o,s({focused:!0,inputFocused:o}))},onFocusOut:r=>{(!1!==t||!1!==i)&&(t=!1,i=!1,s({focused:!1,inputFocused:!1}))}}),document.addEventListener("focusin",this._focusTracker.onFocusIn),document.addEventListener("focusout",this._focusTracker.onFocusOut),document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}disconnectedCallback(){super.disconnectedCallback?.(),this._logger.debug("disconnected"),null!=this._focusTracker&&(document.removeEventListener("focusin",this._focusTracker.onFocusIn),document.removeEventListener("focusout",this._focusTracker.onFocusOut),this._focusTracker=void 0),this.disposables.forEach(t=>t.dispose())}render(){return ts`<slot></slot>`}};rC([t1({type:String})],GlWebviewApp.prototype,"name",2),rC([t1({type:String})],GlWebviewApp.prototype,"placement",2),rC([ef({context:"ipc"})],GlWebviewApp.prototype,"_ipc",2),rC([ef({context:"logger"})],GlWebviewApp.prototype,"_logger",2),rC([ef({context:"promos"})],GlWebviewApp.prototype,"_promos",2),rC([ef({context:"telemetry"})],GlWebviewApp.prototype,"_telemetry",2),rC([ef({context:"webview"})],GlWebviewApp.prototype,"_webview",2),GlWebviewApp[eH];let App=class App{constructor(t){this.appName=t;let i=[],r=rw();null!=this.onThemeUpdated&&(this.onThemeUpdated(r),i.push(ry(this.onThemeUpdated,this))),this.state=window.bootstrap,window.bootstrap=void 0,this.placement=document.body.getAttribute("data-placement")??"editor",this._logger=new LoggerContext(t),this.log("opening..."),this._api=rd(),this._hostIpc=new rg(this.appName),i.push(this._hostIpc),this._promos=new PromosContext(this._hostIpc),i.push(this._promos),this._telemetry=new TelemetryContext(this._hostIpc),i.push(this._telemetry);let{webviewId:s,webviewInstanceId:o}=this.state;if(this._webview={webviewId:s,webviewInstanceId:o,createCommandLink:(t,i)=>(t.endsWith(":")&&(t=`${t}${s.split(".").at(-1)}`),t7(t,s,o,i))},new context_provider_i(document.body,{context:"ipc",initialValue:this._hostIpc}),new context_provider_i(document.body,{context:"logger",initialValue:this._logger}),new context_provider_i(document.body,{context:"promos",initialValue:this._promos}),new context_provider_i(document.body,{context:"telemetry",initialValue:this._telemetry}),new context_provider_i(document.body,{context:"webview",initialValue:this._webview}),null!=this.state){let t=this.getState();this.state.timestamp>=(t?.timestamp??0)?this._api.setState(this.state):this.state=t}i.push(r_()),requestAnimationFrame(()=>{this.log("initializing...");try{this.onInitialize?.(),this.bind(),null!=this.onMessageReceived&&i.push(this._hostIpc.onReceiveMessage(t=>{switch(!0){case eu.is(t):window.dispatchEvent(new CustomEvent(t.params.focused?"webview-focus":"webview-blur"));break;case eg.is(t):window.dispatchEvent(new CustomEvent(t.params.visible?"webview-visible":"webview-hidden"));break;default:this.onMessageReceived(t)}})),this.sendRequest(ea,{bootstrap:!1}),this.onInitialized?.()}finally{this.log("initialized"),document.body.classList.contains("preload")&&setTimeout(()=>{document.body.classList.remove("preload")},500)}}),i.push(b.on(window,"pagehide",()=>{i?.forEach(t=>t.dispose()),this.bindDisposables?.forEach(t=>t.dispose()),this.bindDisposables=void 0})),i.push(b.on(window,"gl-telemetry-fired",t=>{this._telemetry.sendEvent(t.detail)})),this.log("opened")}bind(){document.querySelectorAll("a").forEach(t=>{t.href===t.title&&t.removeAttribute("title")}),this.bindDisposables?.forEach(t=>t.dispose()),this.bindDisposables=this.onBind?.(),this.bindDisposables??=[];let t=C(t=>{this.sendCommand(el,t)},150);this.bindDisposables.push(b.on(document,"focusin",i=>{let r=i.composedPath().some(t=>"INPUT"===t.tagName);(!0!==this._focused||this._inputFocused!==r)&&(this._focused=!0,this._inputFocused=r,t({focused:!0,inputFocused:r}))}),b.on(document,"focusout",()=>{(!1!==this._focused||!1!==this._inputFocused)&&(this._focused=!1,this._inputFocused=!1,t({focused:!1,inputFocused:!1}))}))}log(t,...i){this._logger.debug(t,...i)}getState(){return this._api.getState()}sendCommand(t,i){this._hostIpc.sendCommand(t,i)}sendRequest(t,i){return this._hostIpc.sendRequest(t,i)}setState(t){this._api.setState(t)}};function r$(t,i,r){return t?i(t):r?.(t)}function*rS(t,i){if(void 0!==t){let r=0;for(let s of t)yield i(s,r++)}}let rA=(t,i,r)=>{let s=new Map;for(let o=i;o<=r;o++)s.set(t[o],o);return s},rP=eq(class extends directive_i{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,i,r){let s;void 0===r?r=i:void 0!==i&&(s=i);let o=[],n=[],a=0;for(let i of t)o[a]=s?s(i,a):a,n[a]=r(i,a),a++;return{values:n,keys:o}}render(t,i,r){return this.dt(t,i,r).values}update(t,[i,r,s]){let o=t._$AH,{values:n,keys:a}=this.dt(i,r,s);if(!Array.isArray(o))return this.ut=a,n;let c=this.ut??=[],h=[],p,g,f=0,m=o.length-1,b=0,v=n.length-1;for(;f<=m&&b<=v;)if(null===o[f])f++;else if(null===o[m])m--;else if(c[f]===a[b])h[b]=tb(o[f],n[b]),f++,b++;else if(c[m]===a[v])h[v]=tb(o[m],n[v]),m--,v--;else if(c[f]===a[v])h[v]=tb(o[f],n[v]),tm(t,h[v+1],o[f]),f++,v--;else if(c[m]===a[b])h[b]=tb(o[m],n[b]),tm(t,o[f],o[m]),m--,b++;else if(void 0===p&&(p=rA(a,b,v),g=rA(c,f,m)),p.has(c[f]))if(p.has(c[m])){let i=g.get(a[b]),r=void 0!==i?o[i]:null;if(null===r){let i=tm(t,o[f]);tb(i,n[b]),h[b]=i}else h[b]=tb(r,n[b]),tm(t,o[f],r),o[i]=null;b++}else tw(o[m]),m--;else tw(o[f]),f++;for(;b<=v;){let i=tm(t,h[v+1]);tb(i,n[b]),h[b++]=i}for(;f<=m;){let t=o[f++];null!==t&&tw(t)}return this.ut=a,ty(t,h),tn}});let unsafe_html_e=class unsafe_html_e extends directive_i{constructor(t){if(super(t),this.it=ta,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ta||null==t)return this._t=void 0,this.it=t;if(t===tn)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}};unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;let rT=eq(unsafe_html_e);function rI(t,i,r,s=!1,o){let n={name:"",relativePath:"",children:new Map,descendants:[]},a=t.reduce((t,s)=>{let o=t,n="";for(let t of i(s)){n=r(n,t),o.children??=new Map;let i=o.children.get(t);null==i&&(i={name:t,relativePath:n,parent:o,children:void 0,descendants:void 0},o.children.set(t,i)),o.descendants??=[],o.descendants.push(s),o=i}return o.value=s,t},n);return s&&(a=function t(i,r,s=!0,o){if(null==i.children)return i;let n=[...i.children.values()];for(let i of n)t(i,r,!1,o);if(!s&&null==i.value&&1===n.length){let t=n[0];if((null==t.value||o?.(t.value))&&(i.name=r(i.name,t.name),i.relativePath=t.relativePath,i.children=t.children,i.descendants=t.descendants,i.value=t.value,null!=i.children))for(let t of i.children.values())t.parent=i}return i}(a,r,!0,o)),a}function rE(t,i){if(null==t)return 0;let r=0;for(let s of t)r+=i(s);return r}var rz=x(90);let rR=eq(class extends directive_i{constructor(){super(...arguments),this.key=ta}render(t,i){return this.key=t,i}update(t,[i,r]){return i!==this.key&&(ty(t),this.key=i),r}}),rM=()=>new ref_h;let ref_h=class ref_h{};let rL=new WeakMap,rO=eq(class extends async_directive_f{render(t){return ta}update(t,[i]){let r=i!==this.G;return r&&void 0!==this.G&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),ta}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){let i=this.ht??globalThis,r=rL.get(i);void 0===r&&(r=new WeakMap,rL.set(i,r)),void 0!==r.get(this.G)&&this.G.call(this.ht,void 0),r.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?rL.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),rD="important",rB=" !"+rD,rN=eq(class extends directive_i{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((i,r)=>{let s=t[r];return null==s?i:i+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[i]){let{style:r}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(i)),this.render(i);for(let t of this.ft)null==i[t]&&(this.ft.delete(t),t.includes("-")?r.removeProperty(t):r[t]=null);for(let t in i){let s=i[t];if(null!=s){this.ft.add(t);let i="string"==typeof s&&s.endsWith(rB);t.includes("-")||i?r.setProperty(t,i?s.slice(0,-11):s,i?rD:""):r[t]=s}}return tn}}),rU=tO`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
`;tO`
	.sr-only,
	.sr-only-focusable:not(:active):not(:focus-visible):not(:focus-within) {
		${rU}
	}
`;let rF=tO`
	outline: 1px solid var(--color-focus-border);
	outline-offset: -1px;
`,rj=tO`
	outline: 1px solid var(--color-focus-border);
	outline-offset: 2px;
`;tO`
	:focus-visible {
		${rF}
	}
`;let rV=tO`
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
`;tO`
	* {
		box-sizing: border-box;
	}
`,tO`
	a {
		color: var(--vscode-textLink-foreground);
		text-decoration: none;
	}
	a:focus {
		${rF}
	}
	a:hover {
		text-decoration: underline;
	}
`;let rH=tO`
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
`;tO`
	.inline-code {
		background: var(--vscode-textCodeBlock-background);
		border-radius: 3px;
		padding: 0px 4px 2px 4px;
		font-family: var(--vscode-editor-font-family);
	}
`;function rq(t,i,r,s){var o,n=arguments.length,a=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,i,r,s);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(a=(n<3?o(a):n>3?o(i,r,a):o(i,r))||a);return n>3&&a&&Object.defineProperty(i,r,a),a}"function"==typeof SuppressedError&&SuppressedError;let RangeChangedEvent=class RangeChangedEvent extends Event{constructor(t){super(RangeChangedEvent.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};RangeChangedEvent.eventName="rangeChanged";let VisibilityChangedEvent=class VisibilityChangedEvent extends Event{constructor(t){super(VisibilityChangedEvent.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};VisibilityChangedEvent.eventName="visibilityChanged";let UnpinnedEvent=class UnpinnedEvent extends Event{constructor(){super(UnpinnedEvent.eventName,{bubbles:!1})}};UnpinnedEvent.eventName="unpinned";let ScrollerShim=class ScrollerShim{constructor(t){this._element=null;let i=t??window;this._node=i,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}};let ScrollerController=class ScrollerController extends ScrollerShim{constructor(t,i){super(i),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let r=this._node;this._originalScrollTo=r.scrollTo,this._originalScrollBy=r.scrollBy,this._originalScroll=r.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(t,i){this._scrollTo("number"==typeof t&&"number"==typeof i?{left:t,top:i}:t)}scrollBy(t,i){let r="number"==typeof t&&"number"==typeof i?{left:t,top:i}:t;void 0!==r.top&&(r.top+=this.scrollTop),void 0!==r.left&&(r.left+=this.scrollLeft),this._scrollTo(r)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,i=null,r=null){null!==this._end&&this._end(),"smooth"===t.behavior?(this._setDestination(t),this._retarget=i,this._end=r):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:i,left:r}=t;return i=void 0===i?void 0:Math.max(0,Math.min(i,this.maxScrollTop)),r=void 0===r?void 0:Math.max(0,Math.min(r,this.maxScrollLeft)),(null===this._destination||r!==this._destination.left||i!==this._destination.top)&&(this.__destination={top:i,left:r,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,i,r){return this._scrollTo(t,i,r),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){let{scrollTop:t,scrollLeft:i}=this,{top:r,left:s}=this._destination;r=Math.min(r||0,this.maxScrollTop);let o=Math.abs((s=Math.min(s||0,this.maxScrollLeft))-i);1>Math.abs(r-t)&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),0===this._clients.size&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),1===this._clients.size&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};let rW="u">typeof window?window.ResizeObserver:void 0,rG=Symbol("virtualizerRef"),rK="virtualizer-sizer";let Virtualizer=class Virtualizer{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let i=t.layout||{};this._layoutInitialized=this._initLayout(i)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new rW(()=>this._hostElementSizeChanged()),this._childrenRO=new rW(this._childrenSizeChanged.bind(this))}_initHostElement(t){let i=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),i[rG]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=function(t,i=!1){let r=!1;return(function(t,i=!1){let r=[],s=i?t:rX(t);for(;null!==s;)r.push(s),s=rX(s);return r})(t,i).filter(t=>{if(r)return!1;let i=getComputedStyle(t);return r="fixed"===i.position,"visible"!==i.overflow})}(this._hostElement,t),this._scrollerController=new ScrollerController(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let t=this._hostElement.style;t.display=t.display||"block",t.position=t.position||"relative",t.contain=t.contain||"size layout",this._isScroller&&(t.overflow=t.overflow||"auto",t.minHeight=t.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let i=t.querySelector(`[${rK}]`);i||((i=document.createElement("div")).setAttribute(rK,""),t.appendChild(i)),Object.assign(i.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),i.textContent="&nbsp;",i.setAttribute(rK,""),this._sizer=i}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let i=t.type||s;if("function"==typeof i&&this._layout instanceof i){let i={...t};return delete i.type,this._layout.config=i,!0}return!1}async _initLayout(t){let i,r;if("function"==typeof t.type){r=t.type;let s={...t};delete s.type,i=s}else i=t;void 0===r&&(s=r=(await Promise.resolve().then(x.bind(x,90))).FlowLayout),this._layout=new r(t=>this._handleLayoutMessage(t),i),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){let t=window.performance.now(),i=t-this._benchmarkStart,r=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<t).reduce((t,i)=>t+i.duration,0);return this._benchmarkStart=null,{timeElapsed:i,virtualizationTime:r}}return null}_measureChildren(){let t={},i=this._children,r=this._measureChildOverride||this._measureChild;for(let s=0;s<i.length;s++){let o=i[s],n=this._first+s;(this._itemsChanged||this._toBeMeasured.has(o))&&(t[n]=r.call(this,o,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){var i;let r,{width:s,height:o}=t.getBoundingClientRect();return Object.assign({width:s,height:o},(i=t,{marginTop:rZ((r=window.getComputedStyle(i)).marginTop),marginRight:rZ(r.marginRight),marginBottom:rZ(r.marginBottom),marginLeft:rZ(r.marginLeft)}))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:i,_itemsChanged:r}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(i||r)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch{}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){"scroll"===t.type&&(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent()}_handleLayoutMessage(t){"stateChanged"===t.type?this._updateDOM(t):"visibilityChanged"===t.type?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):"unpinned"===t.type&&this._hostElement.dispatchEvent(new UnpinnedEvent)}get _children(){let t=[],i=this._hostElement.firstElementChild;for(;i;)i.hasAttribute(rK)||t.push(i),i=i.nextElementSibling;return t}_updateView(){let t=this._hostElement,i=this._scrollerController?.element,r=this._layout;if(t&&i&&r){let s,o,n,a,c=t.getBoundingClientRect();s=0,o=0,n=window.innerHeight,a=window.innerWidth;let h=this._clippingAncestors.map(t=>t.getBoundingClientRect());for(let t of(h.unshift(c),h))s=Math.max(s,t.top),o=Math.max(o,t.left),n=Math.min(n,t.bottom),a=Math.min(a,t.right);let p=i.getBoundingClientRect(),g={left:c.left-p.left,top:c.top-p.top},f={width:i.scrollWidth,height:i.scrollHeight},m=s-c.top+t.scrollTop,b=o-c.left+t.scrollLeft;r.viewportSize={width:Math.max(0,a-o),height:Math.max(0,n-s)},r.viewportScroll={top:m,left:b},r.totalScrollSize=f,r.offsetWithinScroller=g}}_sizeHostElement(t){let i=t&&null!==t.width?Math.min(82e5,t.width):0,r=t&&null!==t.height?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${i}px, ${r}px)`;else{let t=this._hostElement.style;t.minWidth=i?`${i}px`:"100%",t.minHeight=r?`${r}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:t,left:i,width:r,height:s,xOffset:o,yOffset:n},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${i}px, ${t}px)`,void 0!==r&&(c.style.width=r+"px"),void 0!==s&&(c.style.height=s+"px"),c.style.left=void 0===o?null:o+"px",c.style.top=void 0===n?null:n+"px")})}async _adjustRange(t){let{_first:i,_last:r,_firstVisible:s,_lastVisible:o}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==i||this._last!==r,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==s||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:i}=this._scrollerController,{top:r,left:s}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-r,left:i-s})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(i={})=>this._scrollElementIntoView({...i,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),"smooth"===t.behavior){let i=this._layout.getScrollIntoViewCoordinates(t),{behavior:r}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(i,{behavior:r}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:i}=this._scrollIntoViewTarget||{};i&&t?.has(i)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new RangeChangedEvent({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new VisibilityChangedEvent({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,i)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=i})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let i of t)this._toBeMeasured.set(i.target,i.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function rZ(t){let i=t?parseFloat(t):NaN;return Number.isNaN(i)?0:i}function rX(t){if(null!==t.assignedSlot)return t.assignedSlot;if(null!==t.parentElement)return t.parentElement;let i=t.parentNode;return i&&i.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&i.host||null}let rQ=t=>t,rY=(t,i)=>ts`${i}: ${JSON.stringify(t,null,2)}`;let VirtualizeDirective=class VirtualizeDirective extends async_directive_f{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(t,i)=>rY(t,i+this._first),this._keyFunction=(t,i)=>rQ(t,i+this._first),this._items=[],2!==t.type)throw Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let i=[];if(this._first>=0&&this._last>=this._first)for(let t=this._first;t<=this._last;t++)i.push(this._items[t]);return rP(i,this._keyFunction,this._renderItem)}update(t,[i]){this._setFunctions(i);let r=this._items!==i.items;return this._items=i.items||[],this._virtualizer?this._updateVirtualizerConfig(t,i):this._initialize(t,i),r?tn:this.render()}async _updateVirtualizerConfig(t,i){if(!await this._virtualizer.updateLayoutConfig(i.layout||{})){let r=t.parentNode;this._makeVirtualizer(r,i)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:i,keyFunction:r}=t;i&&(this._renderItem=(t,r)=>i(t,r+this._first)),r&&(this._keyFunction=(t,i)=>r(t,i+this._first))}_makeVirtualizer(t,i){this._virtualizer&&this._virtualizer.disconnected();let{layout:r,scroller:s,items:o}=i;this._virtualizer=new Virtualizer({hostElement:t,layout:r,scroller:s}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(t,i){let r=t.parentNode;r&&1===r.nodeType&&(r.addEventListener("rangeChanged",t=>{this._first=t.first,this._last=t.last,this.setValue(this.render())}),this._makeVirtualizer(r,i))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}};let rJ=eq(VirtualizeDirective);let LitVirtualizer=class LitVirtualizer extends lit_element_i{constructor(){super(...arguments),this.items=[],this.renderItem=rY,this.keyFunction=rQ,this.layout={},this.scroller=!1}createRenderRoot(){return this}render(){let{items:t,renderItem:i,keyFunction:r,layout:s,scroller:o}=this;return ts`${rJ({items:t,renderItem:i,keyFunction:r,layout:s,scroller:o})}`}element(t){return this[rG]?.element(t)}get layoutComplete(){return this[rG]?.layoutComplete}scrollToIndex(t,i="start"){this.element(t)?.scrollIntoView({block:i})}};rq([t1({attribute:!1})],LitVirtualizer.prototype,"items",void 0),rq([t1()],LitVirtualizer.prototype,"renderItem",void 0),rq([t1()],LitVirtualizer.prototype,"keyFunction",void 0),rq([t1({attribute:!1})],LitVirtualizer.prototype,"layout",void 0),rq([t1({reflect:!0,type:Boolean})],LitVirtualizer.prototype,"scroller",void 0),customElements.define("lit-virtualizer",LitVirtualizer);let r0=navigator?.userAgentData?.platform,r1=navigator.userAgent;"Linux"===r0||r1.includes("Linux");let r2="macOS"===r0||r1.includes("Macintosh");"Windows"===r0||r1.includes("Windows");var r5=Object.defineProperty,r3=Object.defineProperties,r6=Object.getOwnPropertyDescriptor,r4=Object.getOwnPropertyDescriptors,r7=Object.getOwnPropertySymbols,r8=Object.prototype.hasOwnProperty,r9=Object.prototype.propertyIsEnumerable,se=t=>{throw TypeError(t)},st=(t,i,r)=>i in t?r5(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r,si=(t,i)=>{for(var r in i||(i={}))r8.call(i,r)&&st(t,r,i[r]);if(r7)for(var r of r7(i))r9.call(i,r)&&st(t,r,i[r]);return t},sr=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?r6(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&r5(i,r,n),n},ss=(t,i,r)=>i.has(t)||se("Cannot "+r),so=new Map,sn=new WeakMap;function sa(t,i){return"rtl"===i.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function sl(t,i){so.set(t,null!=i?i:{keyframes:[],options:{duration:0}})}function sc(t,i,r){let s=sn.get(t);if(null==s?void 0:s[i])return sa(s[i],r.dir);let o=so.get(i);return o?sa(o,r.dir):{keyframes:[],options:{duration:0}}}var sh=tO`
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
`,sd=tO`
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
`;let sp=new Set,su=new Map,sg="ltr",sf="en",sm="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(sm){let t=new MutationObserver(sv);sg=document.documentElement.dir||"ltr",sf=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function sb(...t){t.map(t=>{let i=t.$code.toLowerCase();su.has(i)?su.set(i,Object.assign(Object.assign({},su.get(i)),t)):su.set(i,t),o||(o=t)}),sv()}function sv(){sm&&(sg=document.documentElement.dir||"ltr",sf=document.documentElement.lang||navigator.language),[...sp.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let LocalizeController=class LocalizeController{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){sp.add(this.host)}hostDisconnected(){sp.delete(this.host)}dir(){return`${this.host.dir||sg}`.toLowerCase()}lang(){return`${this.host.lang||sf}`.toLowerCase()}getTranslationData(t){var i,r;let s=new Intl.Locale(t.replace(/_/g,"-")),o=null==s?void 0:s.language.toLowerCase(),n=null!=(r=null==(i=null==s?void 0:s.region)?void 0:i.toLowerCase())?r:"",a=su.get(`${o}-${n}`),c=su.get(o);return{locale:s,language:o,region:n,primary:a,secondary:c}}exists(t,i){var r;let{primary:s,secondary:n}=this.getTranslationData(null!=(r=i.lang)?r:this.lang());return i=Object.assign({includeFallback:!1},i),!!s&&!!s[t]||!!n&&!!n[t]||!!i.includeFallback&&!!o&&!!o[t]}term(t,...i){let r,{primary:s,secondary:n}=this.getTranslationData(this.lang());if(s&&s[t])r=s[t];else if(n&&n[t])r=n[t];else{if(!o||!o[t])return String(t);r=o[t]}return"function"==typeof r?r(...i):r}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,i)}};var sy={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,i)=>`Go to slide ${t} of ${i}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};sb(sy);var sw=class extends LocalizeController{};sb(sy);var s_=tO`
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
`,sk=class extends lit_element_i{constructor(){let t;super(),(t=y).has(this)?se("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,i])=>{this.constructor.define(t,i)})}emit(t,i){let r=new CustomEvent(t,si({bubbles:!0,cancelable:!1,composed:!0,detail:{}},i));return this.dispatchEvent(r),r}static define(t,i=this,r={}){let s=customElements.get(t);if(!s){try{customElements.define(t,i,r)}catch(s){customElements.define(t,class extends i{},r)}return}let o=" (unknown version)";"version"in i&&i.version&&(o=" v"+i.version),"version"in s&&s.version&&s.version}attributeChangedCallback(t,i,r){let s,o;if(ss(this,s=y,"read from private field"),o?!o.call(this):!s.get(this)){let t,i;this.constructor.elementProperties.forEach((t,i)=>{t.reflect&&null!=this[i]&&this.initialReflectedProperties.set(i,this[i])}),ss(this,t=y,"write to private field"),i?i.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,i,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((i,r)=>{t.has(r)&&null==this[r]&&(this[r]=i)})}};y=new WeakMap,sk.version="2.20.1",sk.dependencies={},sr([t1()],sk.prototype,"dir",2),sr([t1()],sk.prototype,"lang",2);let sx=Math.min,sC=Math.max,s$=Math.round,sS=Math.floor,sA=t=>({x:t,y:t}),sP={left:"right",right:"left",bottom:"top",top:"bottom"};function sT(t,i){return"function"==typeof t?t(i):t}function sI(t){return t.split("-")[0]}function sE(t){return t.split("-")[1]}function sz(t){return"x"===t?"y":"x"}function sR(t){return"y"===t?"height":"width"}function sM(t){let i=t[0];return"t"===i||"b"===i?"y":"x"}function sL(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}let sO=["left","right"],sD=["right","left"],sB=["top","bottom"],sN=["bottom","top"];function sU(t){let i=sI(t);return sP[i]+t.slice(i.length)}function sF(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function sj(t){let{x:i,y:r,width:s,height:o}=t;return{width:s,height:o,top:r,left:i,right:i+s,bottom:r+o,x:i,y:r}}function sV(t,i,r){let s,{reference:o,floating:n}=t,a=sM(i),c=sz(sM(i)),h=sR(c),p=sI(i),g="y"===a,f=o.x+o.width/2-n.width/2,m=o.y+o.height/2-n.height/2,b=o[h]/2-n[h]/2;switch(p){case"top":s={x:f,y:o.y-n.height};break;case"bottom":s={x:f,y:o.y+o.height};break;case"right":s={x:o.x+o.width,y:m};break;case"left":s={x:o.x-n.width,y:m};break;default:s={x:o.x,y:o.y}}switch(sE(i)){case"start":s[c]-=b*(r&&g?-1:1);break;case"end":s[c]+=b*(r&&g?-1:1)}return s}async function sH(t,i){var r;void 0===i&&(i={});let{x:s,y:o,platform:n,rects:a,elements:c,strategy:h}=t,{boundary:p="clippingAncestors",rootBoundary:g="viewport",elementContext:f="floating",altBoundary:m=!1,padding:b=0}=sT(i,t),v=sF(b),y=c[m?"floating"===f?"reference":"floating":f],w=sj(await n.getClippingRect({element:null==(r=await (null==n.isElement?void 0:n.isElement(y)))||r?y:y.contextElement||await (null==n.getDocumentElement?void 0:n.getDocumentElement(c.floating)),boundary:p,rootBoundary:g,strategy:h})),_="floating"===f?{x:s,y:o,width:a.floating.width,height:a.floating.height}:a.reference,x=await (null==n.getOffsetParent?void 0:n.getOffsetParent(c.floating)),C=await (null==n.isElement?void 0:n.isElement(x))&&await (null==n.getScale?void 0:n.getScale(x))||{x:1,y:1},$=sj(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:_,offsetParent:x,strategy:h}):_);return{top:(w.top-$.top+v.top)/C.y,bottom:($.bottom-w.bottom+v.bottom)/C.y,left:(w.left-$.left+v.left)/C.x,right:($.right-w.right+v.right)/C.x}}let sq=async(t,i,r)=>{let{placement:s="bottom",strategy:o="absolute",middleware:n=[],platform:a}=r,c=a.detectOverflow?a:{...a,detectOverflow:sH},h=await (null==a.isRTL?void 0:a.isRTL(i)),p=await a.getElementRects({reference:t,floating:i,strategy:o}),{x:g,y:f}=sV(p,s,h),m=s,b=0,v={};for(let r=0;r<n.length;r++){let y=n[r];if(!y)continue;let{name:w,fn:_}=y,{x:x,y:C,data:$,reset:A}=await _({x:g,y:f,initialPlacement:s,placement:m,strategy:o,middlewareData:v,rects:p,platform:c,elements:{reference:t,floating:i}});g=null!=x?x:g,f=null!=C?C:f,v[w]={...v[w],...$},A&&b<50&&(b++,"object"==typeof A&&(A.placement&&(m=A.placement),A.rects&&(p=!0===A.rects?await a.getElementRects({reference:t,floating:i,strategy:o}):A.rects),{x:g,y:f}=sV(p,m,h)),r=-1)}return{x:g,y:f,placement:m,strategy:o,middlewareData:v}},sW=new Set(["left","top"]);async function sG(t,i){let{placement:r,platform:s,elements:o}=t,n=await (null==s.isRTL?void 0:s.isRTL(o.floating)),a=sI(r),c=sE(r),h="y"===sM(r),p=sW.has(a)?-1:1,g=n&&h?-1:1,f=sT(i,t),{mainAxis:m,crossAxis:b,alignmentAxis:v}="number"==typeof f?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return c&&"number"==typeof v&&(b="end"===c?-1*v:v),h?{x:b*g,y:m*p}:{x:m*p,y:b*g}}function sK(){return"u">typeof window}function sZ(t){return sY(t)?(t.nodeName||"").toLowerCase():"#document"}function sX(t){var i;return(null==t||null==(i=t.ownerDocument)?void 0:i.defaultView)||window}function sQ(t){var i;return null==(i=(sY(t)?t.ownerDocument:t.document)||window.document)?void 0:i.documentElement}function sY(t){return!!sK()&&(t instanceof Node||t instanceof sX(t).Node)}function sJ(t){return!!sK()&&(t instanceof Element||t instanceof sX(t).Element)}function s0(t){return!!sK()&&(t instanceof HTMLElement||t instanceof sX(t).HTMLElement)}function s1(t){return!(!sK()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof sX(t).ShadowRoot)}function s2(t){let{overflow:i,overflowX:r,overflowY:s,display:o}=oe(t);return/auto|scroll|overlay|hidden|clip/.test(i+s+r)&&"inline"!==o&&"contents"!==o}function s5(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}let s3=/transform|translate|scale|rotate|perspective|filter/,s6=/paint|layout|strict|content/,s4=t=>!!t&&"none"!==t;function s7(t){let i=sJ(t)?oe(t):t;return s4(i.transform)||s4(i.translate)||s4(i.scale)||s4(i.rotate)||s4(i.perspective)||!s8()&&(s4(i.backdropFilter)||s4(i.filter))||s3.test(i.willChange||"")||s6.test(i.contain||"")}function s8(){return null==n&&(n="u">typeof CSS&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),n}function s9(t){return/^(html|body|#document)$/.test(sZ(t))}function oe(t){return sX(t).getComputedStyle(t)}function ot(t){return sJ(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function oi(t){if("html"===sZ(t))return t;let i=t.assignedSlot||t.parentNode||s1(t)&&t.host||sQ(t);return s1(i)?i.host:i}function or(t,i,r){var s;void 0===i&&(i=[]),void 0===r&&(r=!0);let o=function t(i){let r=oi(i);return s9(r)?i.ownerDocument?i.ownerDocument.body:i.body:s0(r)&&s2(r)?r:t(r)}(t),n=o===(null==(s=t.ownerDocument)?void 0:s.body),a=sX(o);if(!n)return i.concat(o,or(o,[],r));{let t=os(a);return i.concat(a,a.visualViewport||[],s2(o)?o:[],t&&r?or(t):[])}}function os(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function oo(t){let i=oe(t),r=parseFloat(i.width)||0,s=parseFloat(i.height)||0,o=s0(t),n=o?t.offsetWidth:r,a=o?t.offsetHeight:s,c=s$(r)!==n||s$(s)!==a;return c&&(r=n,s=a),{width:r,height:s,$:c}}function on(t){return sJ(t)?t:t.contextElement}function oa(t){let i=on(t);if(!s0(i))return sA(1);let r=i.getBoundingClientRect(),{width:s,height:o,$:n}=oo(i),a=(n?s$(r.width):r.width)/s,c=(n?s$(r.height):r.height)/o;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}let ol=sA(0);function oc(t){let i=sX(t);return s8()&&i.visualViewport?{x:i.visualViewport.offsetLeft,y:i.visualViewport.offsetTop}:ol}function oh(t,i,r,s){var o;void 0===i&&(i=!1),void 0===r&&(r=!1);let n=t.getBoundingClientRect(),a=on(t),c=sA(1);i&&(s?sJ(s)&&(c=oa(s)):c=oa(t));let h=(void 0===(o=r)&&(o=!1),s&&(!o||s===sX(a))&&o)?oc(a):sA(0),p=(n.left+h.x)/c.x,g=(n.top+h.y)/c.y,f=n.width/c.x,m=n.height/c.y;if(a){let t=sX(a),i=s&&sJ(s)?sX(s):s,r=t,o=os(r);for(;o&&s&&i!==r;){let t=oa(o),i=o.getBoundingClientRect(),s=oe(o),n=i.left+(o.clientLeft+parseFloat(s.paddingLeft))*t.x,a=i.top+(o.clientTop+parseFloat(s.paddingTop))*t.y;p*=t.x,g*=t.y,f*=t.x,m*=t.y,p+=n,g+=a,o=os(r=sX(o))}}return sj({width:f,height:m,x:p,y:g})}function od(t,i){let r=ot(t).scrollLeft;return i?i.left+r:oh(sQ(t)).left+r}function op(t,i){let r=t.getBoundingClientRect();return{x:r.left+i.scrollLeft-od(t,r),y:r.top+i.scrollTop}}function ou(t,i,r){var s;let o;if("viewport"===i)o=function(t,i){let r=sX(t),s=sQ(t),o=r.visualViewport,n=s.clientWidth,a=s.clientHeight,c=0,h=0;if(o){n=o.width,a=o.height;let t=s8();(!t||t&&"fixed"===i)&&(c=o.offsetLeft,h=o.offsetTop)}let p=od(s);if(p<=0){let t=s.ownerDocument,i=t.body,r=getComputedStyle(i),o="CSS1Compat"===t.compatMode&&parseFloat(r.marginLeft)+parseFloat(r.marginRight)||0,a=Math.abs(s.clientWidth-i.clientWidth-o);a<=25&&(n-=a)}else p<=25&&(n+=p);return{width:n,height:a,x:c,y:h}}(t,r);else if("document"===i){let i,r,n,a,c,h,p;s=sQ(t),i=sQ(s),r=ot(s),n=s.ownerDocument.body,a=sC(i.scrollWidth,i.clientWidth,n.scrollWidth,n.clientWidth),c=sC(i.scrollHeight,i.clientHeight,n.scrollHeight,n.clientHeight),h=-r.scrollLeft+od(s),p=-r.scrollTop,"rtl"===oe(n).direction&&(h+=sC(i.clientWidth,n.clientWidth)-a),o={width:a,height:c,x:h,y:p}}else if(sJ(i)){let t,s,n,a,c,h;s=(t=oh(i,!0,"fixed"===r)).top+i.clientTop,n=t.left+i.clientLeft,a=s0(i)?oa(i):sA(1),c=i.clientWidth*a.x,h=i.clientHeight*a.y,o={width:c,height:h,x:n*a.x,y:s*a.y}}else{let r=oc(t);o={x:i.x-r.x,y:i.y-r.y,width:i.width,height:i.height}}return sj(o)}function og(t){return"static"===oe(t).position}function of(t,i){if(!s0(t)||"fixed"===oe(t).position)return null;if(i)return i(t);let r=t.offsetParent;return sQ(t)===r&&(r=r.ownerDocument.body),r}function om(t,i){var r;let s=sX(t);if(s5(t))return s;if(!s0(t)){let i=oi(t);for(;i&&!s9(i);){if(sJ(i)&&!og(i))return i;i=oi(i)}return s}let o=of(t,i);for(;o&&(r=o,/^(table|td|th)$/.test(sZ(r)))&&og(o);)o=of(o,i);return o&&s9(o)&&og(o)&&!s7(o)?s:o||function(t){let i=oi(t);for(;s0(i)&&!s9(i);){if(s7(i))return i;if(s5(i))break;i=oi(i)}return null}(t)||s}let ob=async function(t){let i=this.getOffsetParent||om,r=this.getDimensions,s=await r(t.floating);return{reference:function(t,i,r){let s=s0(i),o=sQ(i),n="fixed"===r,a=oh(t,!0,n,i),c={scrollLeft:0,scrollTop:0},h=sA(0);if(s||!s&&!n)if(("body"!==sZ(i)||s2(o))&&(c=ot(i)),s){let t=oh(i,!0,n,i);h.x=t.x+i.clientLeft,h.y=t.y+i.clientTop}else o&&(h.x=od(o));n&&!s&&o&&(h.x=od(o));let p=!o||s||n?sA(0):op(o,c);return{x:a.left+c.scrollLeft-h.x-p.x,y:a.top+c.scrollTop-h.y-p.y,width:a.width,height:a.height}}(t.reference,await i(t.floating),t.strategy),floating:{x:0,y:0,width:s.width,height:s.height}}},ov={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:i,rect:r,offsetParent:s,strategy:o}=t,n="fixed"===o,a=sQ(s),c=!!i&&s5(i.floating);if(s===a||c&&n)return r;let h={scrollLeft:0,scrollTop:0},p=sA(1),g=sA(0),f=s0(s);if((f||!f&&!n)&&(("body"!==sZ(s)||s2(a))&&(h=ot(s)),f)){let t=oh(s);p=oa(s),g.x=t.x+s.clientLeft,g.y=t.y+s.clientTop}let m=!a||f||n?sA(0):op(a,h);return{width:r.width*p.x,height:r.height*p.y,x:r.x*p.x-h.scrollLeft*p.x+g.x+m.x,y:r.y*p.y-h.scrollTop*p.y+g.y+m.y}},getDocumentElement:sQ,getClippingRect:function(t){let{element:i,boundary:r,rootBoundary:s,strategy:o}=t,n=[..."clippingAncestors"===r?s5(i)?[]:function(t,i){let r=i.get(t);if(r)return r;let s=or(t,[],!1).filter(t=>sJ(t)&&"body"!==sZ(t)),o=null,n="fixed"===oe(t).position,a=n?oi(t):t;for(;sJ(a)&&!s9(a);){let i=oe(a),r=s7(a);r||"fixed"!==i.position||(o=null),(n?r||o:!(!r&&"static"===i.position&&o&&("absolute"===o.position||"fixed"===o.position)||s2(a)&&!r&&function t(i,r){let s=oi(i);return!(s===r||!sJ(s)||s9(s))&&("fixed"===oe(s).position||t(s,r))}(t,a)))?o=i:s=s.filter(t=>t!==a),a=oi(a)}return i.set(t,s),s}(i,this._c):[].concat(r),s],a=ou(i,n[0],o),c=a.top,h=a.right,p=a.bottom,g=a.left;for(let t=1;t<n.length;t++){let r=ou(i,n[t],o);c=sC(r.top,c),h=sx(r.right,h),p=sx(r.bottom,p),g=sC(r.left,g)}return{width:h-g,height:p-c,x:g,y:c}},getOffsetParent:om,getElementRects:ob,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:i,height:r}=oo(t);return{width:i,height:r}},getScale:oa,isElement:sJ,isRTL:function(t){return"rtl"===oe(t).direction}};function oy(t,i){return t.x===i.x&&t.y===i.y&&t.width===i.width&&t.height===i.height}let ow=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(i){var r,s;let o,n,{placement:a,rects:c,platform:h,elements:p}=i,{apply:g=()=>{},...f}=sT(t,i),m=await h.detectOverflow(i,f),b=sI(a),v=sE(a),y="y"===sM(a),{width:w,height:_}=c.floating;"top"===b||"bottom"===b?(o=b,n=v===(await (null==h.isRTL?void 0:h.isRTL(p.floating))?"start":"end")?"left":"right"):(n=b,o="end"===v?"top":"bottom");let x=_-m.top-m.bottom,C=w-m.left-m.right,$=sx(_-m[o],x),A=sx(w-m[n],C),P=!i.middlewareData.shift,T=$,E=A;if(null!=(r=i.middlewareData.shift)&&r.enabled.x&&(E=C),null!=(s=i.middlewareData.shift)&&s.enabled.y&&(T=x),P&&!v){let t=sC(m.left,0),i=sC(m.right,0),r=sC(m.top,0),s=sC(m.bottom,0);y?E=w-2*(0!==t||0!==i?t+i:sC(m.left,m.right)):T=_-2*(0!==r||0!==s?r+s:sC(m.top,m.bottom))}await g({...i,availableWidth:E,availableHeight:T});let M=await h.getDimensions(p.floating);return w!==M.width||_!==M.height?{reset:{rects:!0}}:{}}}},o_=eq(class extends directive_i{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(i=>t[i]).join(" ")+" "}update(t,[i]){if(void 0===this.st){for(let r in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),i)i[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(i)}let r=t.element.classList;for(let t of this.st)t in i||(r.remove(t),this.st.delete(t));for(let t in i){let s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)))}return tn}});function ok(t){var i=t;for(let t=i;t;t=ox(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=ox(i);t;t=ox(t)){if(!(t instanceof Element))continue;let i=getComputedStyle(t);if("contents"!==i.display&&("static"!==i.position||s7(i)||"BODY"===t.tagName))return t}return null}function ox(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var oC=class extends sk{constructor(){super(...arguments),this.localize=new sw(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),i=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom"),s=0,o=0,n=0,a=0,c=0,h=0,p=0,g=0;r?t.top<i.top?(s=t.left,o=t.bottom,n=t.right,a=t.bottom,c=i.left,h=i.top,p=i.right,g=i.top):(s=i.left,o=i.bottom,n=i.right,a=i.bottom,c=t.left,h=t.top,p=t.right,g=t.top):t.left<i.left?(s=t.right,o=t.top,n=i.left,a=i.top,c=t.right,h=t.bottom,p=i.left,g=i.bottom):(s=i.right,o=i.top,n=t.left,a=t.top,c=i.right,h=i.bottom,p=t.left,g=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else{var t;this.anchor instanceof Element||null!==(t=this.anchor)&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,i,r,s){let o;void 0===s&&(s={});let{ancestorScroll:n=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:p=!1}=s,g=on(t),f=n||a?[...g?or(g):[],...i?or(i):[]]:[];f.forEach(t=>{n&&t.addEventListener("scroll",r,{passive:!0}),a&&t.addEventListener("resize",r)});let m=g&&h?function(t,i){let r,s=null,o=sQ(t);function n(){var t;clearTimeout(r),null==(t=s)||t.disconnect(),s=null}return!function a(c,h){void 0===c&&(c=!1),void 0===h&&(h=1),n();let p=t.getBoundingClientRect(),{left:g,top:f,width:m,height:b}=p;if(c||i(),!m||!b)return;let v={rootMargin:-sS(f)+"px "+-sS(o.clientWidth-(g+m))+"px "+-sS(o.clientHeight-(f+b))+"px "+-sS(g)+"px",threshold:sC(0,sx(1,h))||1},y=!0;function w(i){let s=i[0].intersectionRatio;if(s!==h){if(!y)return a();s?a(!1,s):r=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==s||oy(p,t.getBoundingClientRect())||a(),y=!1}try{s=new IntersectionObserver(w,{...v,root:o.ownerDocument})}catch{s=new IntersectionObserver(w,v)}s.observe(t)}(!0),n}(g,r):null,b=-1,v=null;c&&(v=new ResizeObserver(t=>{let[s]=t;s&&s.target===g&&v&&i&&(v.unobserve(i),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var t;null==(t=v)||t.observe(i)})),r()}),g&&!p&&v.observe(g),i&&v.observe(i));let y=p?oh(t):null;return p&&function i(){let s=oh(t);y&&!oy(y,s)&&r(),y=s,o=requestAnimationFrame(i)}(),r(),()=>{var t;f.forEach(t=>{n&&t.removeEventListener("scroll",r),a&&t.removeEventListener("resize",r)}),null==m||m(),null==(t=v)||t.disconnect(),v=null,p&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,i,r,s,o,n;let a,c,h,p;if(!this.active||!this.anchorEl)return;let g=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(i){var r,s;let{x:o,y:n,placement:a,middlewareData:c}=i,h=await sG(i,t);return a===(null==(r=c.offset)?void 0:r.placement)&&null!=(s=c.arrow)&&s.alignmentOffset?{}:{x:o+h.x,y:n+h.y,data:{...h,placement:a}}}}];this.sync?g.push(ow({apply:({rects:t})=>{let i="width"===this.sync||"both"===this.sync,r="height"===this.sync||"both"===this.sync;this.popup.style.width=i?`${t.reference.width}px`:"",this.popup.style.height=r?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&g.push({name:"flip",options:i={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var r,s,o,n,a,c,h,p;let g,f,m,{placement:b,middlewareData:v,rects:y,initialPlacement:w,platform:_,elements:x}=t,{mainAxis:C=!0,crossAxis:$=!0,fallbackPlacements:A,fallbackStrategy:P="bestFit",fallbackAxisSideDirection:T="none",flipAlignment:E=!0,...M}=sT(i,t);if(null!=(r=v.arrow)&&r.alignmentOffset)return{};let O=sI(b),D=sM(w),B=sI(w)===w,N=await (null==_.isRTL?void 0:_.isRTL(x.floating)),U=A||(B||!E?[sU(w)]:(g=sU(w),[sL(w),g,sL(g)])),F="none"!==T;!A&&F&&U.push(...(f=sE(w),m=function(t,i,r){switch(t){case"top":case"bottom":if(r)return i?sD:sO;return i?sO:sD;case"left":case"right":return i?sB:sN;default:return[]}}(sI(w),"start"===T,N),f&&(m=m.map(t=>t+"-"+f),E&&(m=m.concat(m.map(sL)))),m));let j=[w,...U],V=await _.detectOverflow(t,M),q=[],W=(null==(s=v.flip)?void 0:s.overflows)||[];if(C&&q.push(V[O]),$){let t,i,r,s,o=(c=b,h=y,void 0===(p=N)&&(p=!1),t=sE(c),r=sR(i=sz(sM(c))),s="x"===i?t===(p?"end":"start")?"right":"left":"start"===t?"bottom":"top",h.reference[r]>h.floating[r]&&(s=sU(s)),[s,sU(s)]);q.push(V[o[0]],V[o[1]])}if(W=[...W,{placement:b,overflows:q}],!q.every(t=>t<=0)){let t=((null==(o=v.flip)?void 0:o.index)||0)+1,i=j[t];if(i&&("alignment"!==$||D===sM(i)||W.every(t=>sM(t.placement)!==D||t.overflows[0]>0)))return{data:{index:t,overflows:W},reset:{placement:i}};let r=null==(n=W.filter(t=>t.overflows[0]<=0).sort((t,i)=>t.overflows[1]-i.overflows[1])[0])?void 0:n.placement;if(!r)switch(P){case"bestFit":{let t=null==(a=W.filter(t=>{if(F){let i=sM(t.placement);return i===D||"y"===i}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,i)=>t+i,0)]).sort((t,i)=>t[1]-i[1])[0])?void 0:a[0];t&&(r=t);break}case"initialPlacement":r=w}if(b!==r)return{reset:{placement:r}}}return{}}}),this.shift&&g.push({name:"shift",options:r={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(t){let{x:i,y:s,placement:o,platform:n}=t,{mainAxis:a=!0,crossAxis:c=!1,limiter:h={fn:t=>{let{x:i,y:r}=t;return{x:i,y:r}}},...p}=sT(r,t),g={x:i,y:s},f=await n.detectOverflow(t,p),m=sM(sI(o)),b=sz(m),v=g[b],y=g[m];if(a){let t="y"===b?"top":"left",i="y"===b?"bottom":"right",r=v+f[t],s=v-f[i];v=sC(r,sx(v,s))}if(c){let t="y"===m?"top":"left",i="y"===m?"bottom":"right",r=y+f[t],s=y-f[i];y=sC(r,sx(y,s))}let w=h.fn({...t,[b]:v,[m]:y});return{...w,data:{x:w.x-i,y:w.y-s,enabled:{[b]:a,[m]:c}}}}}),this.autoSize?g.push(ow({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:i})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&g.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:i,y:r,placement:s,rects:o,platform:n,elements:c,middlewareData:h}=t,{element:p,padding:g=0}=sT(a,t)||{};if(null==p)return{};let f=sF(g),m={x:i,y:r},b=sz(sM(s)),v=sR(b),y=await n.getDimensions(p),w="y"===b,_=w?"clientHeight":"clientWidth",x=o.reference[v]+o.reference[b]-m[b]-o.floating[v],C=m[b]-o.reference[b],$=await (null==n.getOffsetParent?void 0:n.getOffsetParent(p)),A=$?$[_]:0;A&&await (null==n.isElement?void 0:n.isElement($))||(A=c.floating[_]||o.floating[v]);let P=A/2-y[v]/2-1,T=sx(f[w?"top":"left"],P),E=sx(f[w?"bottom":"right"],P),M=A-y[v]-E,O=A/2-y[v]/2+(x/2-C/2),D=sC(T,sx(O,M)),B=!h.arrow&&null!=sE(s)&&O!==D&&o.reference[v]/2-(O<T?T:E)-y[v]/2<0,N=B?O<T?O-T:O-M:0;return{[b]:m[b]+N,data:{[b]:D,centerOffset:O-D-N,...B&&{alignmentOffset:N}},reset:B}}});let f="absolute"===this.strategy?t=>ov.getOffsetParent(t,ok):ov.getOffsetParent;(s=this.anchorEl,o=this.popup,n={placement:this.placement,middleware:g,strategy:this.strategy,platform:r3(si({},ov),r4({getOffsetParent:f}))},c=new Map,p={...(h={platform:ov,...n}).platform,_c:c},sq(s,o,{...h,platform:p})).then(({x:t,y:i,middlewareData:r,placement:s})=>{let o="rtl"===this.localize.dir(),n={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${t}px`,top:`${i}px`}),this.arrow){let t=r.arrow.x,i=r.arrow.y,s="",a="",c="",h="";if("start"===this.arrowPlacement){let r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s="number"==typeof i?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=o?r:"",h=o?"":r}else if("end"===this.arrowPlacement){let r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=o?"":r,h=o?r:"",c="number"==typeof i?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(h="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",s="number"==typeof i?"calc(50% - var(--arrow-size-diagonal))":""):(h="number"==typeof t?`${t}px`:"",s="number"==typeof i?`${i}px`:"");Object.assign(this.arrowEl.style,{top:s,right:a,bottom:c,left:h,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return ts`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${o_({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${o_({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ts`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};function o$(t,i){return new Promise(r=>{t.addEventListener(i,function s(o){o.target===t&&(t.removeEventListener(i,s),r())})})}function oS(t,i,r){return new Promise(s=>{if((null==r?void 0:r.duration)===1/0)throw Error("Promise-based animations must be finite.");let o=t.animate(i,r3(si({},r),r4({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:r.duration})));o.addEventListener("cancel",s,{once:!0}),o.addEventListener("finish",s,{once:!0})})}function oA(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function oP(t){return Promise.all(t.getAnimations().map(t=>new Promise(i=>{t.cancel(),requestAnimationFrame(i)})))}function oT(t,i){let r=si({waitUntilFirstUpdate:!1},i);return(i,s)=>{let{update:o}=i,n=Array.isArray(t)?t:[t];i.update=function(t){n.forEach(i=>{if(t.has(i)){let o=t.get(i),n=this[i];o!==n&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](o,n)}}),o.call(this,t)}}}oC.styles=[s_,sd],sr([t3(".popup")],oC.prototype,"popup",2),sr([t3(".popup__arrow")],oC.prototype,"arrowEl",2),sr([t1()],oC.prototype,"anchor",2),sr([t1({type:Boolean,reflect:!0})],oC.prototype,"active",2),sr([t1({reflect:!0})],oC.prototype,"placement",2),sr([t1({reflect:!0})],oC.prototype,"strategy",2),sr([t1({type:Number})],oC.prototype,"distance",2),sr([t1({type:Number})],oC.prototype,"skidding",2),sr([t1({type:Boolean})],oC.prototype,"arrow",2),sr([t1({attribute:"arrow-placement"})],oC.prototype,"arrowPlacement",2),sr([t1({attribute:"arrow-padding",type:Number})],oC.prototype,"arrowPadding",2),sr([t1({type:Boolean})],oC.prototype,"flip",2),sr([t1({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],oC.prototype,"flipFallbackPlacements",2),sr([t1({attribute:"flip-fallback-strategy"})],oC.prototype,"flipFallbackStrategy",2),sr([t1({type:Object})],oC.prototype,"flipBoundary",2),sr([t1({attribute:"flip-padding",type:Number})],oC.prototype,"flipPadding",2),sr([t1({type:Boolean})],oC.prototype,"shift",2),sr([t1({type:Object})],oC.prototype,"shiftBoundary",2),sr([t1({attribute:"shift-padding",type:Number})],oC.prototype,"shiftPadding",2),sr([t1({attribute:"auto-size"})],oC.prototype,"autoSize",2),sr([t1()],oC.prototype,"sync",2),sr([t1({type:Object})],oC.prototype,"autoSizeBoundary",2),sr([t1({attribute:"auto-size-padding",type:Number})],oC.prototype,"autoSizePadding",2),sr([t1({attribute:"hover-bridge",type:Boolean})],oC.prototype,"hoverBridge",2);var oI=class extends sk{constructor(){super(),this.localize=new sw(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let t=oA(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=oA(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,i;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await oP(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:i,options:r}=sc(this,"tooltip.show",{dir:this.localize.dir()});await oS(this.popup.popup,i,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(i=this.closeWatcher)||i.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await oP(this.body);let{keyframes:t,options:r}=sc(this,"tooltip.hide",{dir:this.localize.dir()});await oS(this.popup.popup,t,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,o$(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,o$(this,"sl-after-hide")}render(){return ts`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${o_({tooltip:!0,"tooltip--open":this.open})}
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
    `}};oI.styles=[s_,sh],oI.dependencies={"sl-popup":oC},sr([t3("slot:not([name])")],oI.prototype,"defaultSlot",2),sr([t3(".tooltip__body")],oI.prototype,"body",2),sr([t3("sl-popup")],oI.prototype,"popup",2),sr([t1()],oI.prototype,"content",2),sr([t1()],oI.prototype,"placement",2),sr([t1({type:Boolean,reflect:!0})],oI.prototype,"disabled",2),sr([t1({type:Number})],oI.prototype,"distance",2),sr([t1({type:Boolean,reflect:!0})],oI.prototype,"open",2),sr([t1({type:Number})],oI.prototype,"skidding",2),sr([t1()],oI.prototype,"trigger",2),sr([t1({type:Boolean})],oI.prototype,"hoist",2),sr([oT("open",{waitUntilFirstUpdate:!0})],oI.prototype,"handleOpenChange",1),sr([oT(["content","distance","hoist","placement","skidding"])],oI.prototype,"handleOptionsChange",1),sr([oT("disabled")],oI.prototype,"handleDisabledChange",1),sl("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),sl("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),oI.define("sl-tooltip");var oE=Object.defineProperty,oz=Object.getOwnPropertyDescriptor,oR=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oz(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oE(i,r,n),n};sl("tooltip.show",null),sl("tooltip.hide",null);let oM=class extends lit_element_i{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.suppressed=!1,this.onMouseDown=t=>{this.suppressed=!0,this.hide()},this.onMouseUp=t=>{this.suppressed=!1},this.onDragStart=t=>{this.suppressed=!0,this.hide()},this.onDragEnd=t=>{this.suppressed=!1}}connectedCallback(){super.connectedCallback?.(),this.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("dragstart",this.onDragStart,{capture:!0}),window.addEventListener("dragend",this.onDragEnd,{capture:!0})}firstUpdated(){this.observer=new MutationObserver(t=>{for(let i of t)if("attributes"===i.type&&"data-current-placement"===i.attributeName){let t=i.target.getAttribute("data-current-placement");t?this.setAttribute("data-current-placement",t):this.removeAttribute("data-current-placement")}});let t=this.shadowRoot?.querySelector("sl-tooltip")?.shadowRoot;t&&this.observer.observe(t,{attributes:!0,attributeFilter:["data-current-placement"],subtree:!0})}disconnectedCallback(){this.observer?.disconnect(),this.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("dragstart",this.onDragStart,{capture:!0}),window.removeEventListener("dragend",this.onDragEnd,{capture:!0}),super.disconnectedCallback?.()}async hide(){let t=this.shadowRoot?.querySelector("sl-tooltip");return t?.hide()}async show(){let t=this.shadowRoot?.querySelector("sl-tooltip");return t?.show()}render(){var t;return ts`<sl-tooltip
			.placement=${this.placement}
			?disabled=${this.disabled||this.suppressed}
			.distance=${this.distance??ta}
			hoist
		>
			<slot></slot>
			<div slot="content">
				<slot name="content">${t=this.content,t?.includes(`
`)?rT(t.replace(/\n\n/g,"<hr>").replace(/\n/g,"<br>")):t}</slot>
			</div>
		</sl-tooltip>`}};oM.styles=tO`
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
	`,oR([t1()],oM.prototype,"content",2),oR([t1({reflect:!0})],oM.prototype,"placement",2),oR([t1({type:Boolean})],oM.prototype,"disabled",2),oR([t1({type:Number})],oM.prototype,"distance",2),oR([t1({type:Boolean,attribute:"hide-on-click"})],oM.prototype,"hideOnClick",2),oR([t1({type:Boolean})],oM.prototype,"hoist",2),oR([t2()],oM.prototype,"suppressed",2),oM=oR([tJ("gl-tooltip")],oM);let oL=Object.freeze({add:"\\ea60",plus:"\\ea60","gist-new":"\\ea60","repo-create":"\\ea60",lightbulb:"\\ea61","light-bulb":"\\ea61",repo:"\\ea62","repo-delete":"\\ea62","gist-fork":"\\ea63","repo-forked":"\\ea63","git-pull-request":"\\ea64","git-pull-request-abandoned":"\\ea64","record-keys":"\\ea65",keyboard:"\\ea65",tag:"\\ea66","git-pull-request-label":"\\ea66","tag-add":"\\ea66","tag-remove":"\\ea66",person:"\\ea67","person-follow":"\\ea67","person-outline":"\\ea67","person-filled":"\\ea67","source-control":"\\ea68",mirror:"\\ea69","mirror-public":"\\ea69",star:"\\ea6a","star-add":"\\ea6a","star-delete":"\\ea6a","star-empty":"\\ea6a",comment:"\\ea6b","comment-add":"\\ea6b",alert:"\\ea6c",warning:"\\ea6c",search:"\\ea6d","search-save":"\\ea6d","log-out":"\\ea6e","sign-out":"\\ea6e","log-in":"\\ea6f","sign-in":"\\ea6f",eye:"\\ea70","eye-unwatch":"\\ea70","eye-watch":"\\ea70","circle-filled":"\\ea71","primitive-dot":"\\ea71","close-dirty":"\\ea71","debug-breakpoint":"\\ea71","debug-breakpoint-disabled":"\\ea71","debug-hint":"\\ea71","terminal-decoration-success":"\\ea71","primitive-square":"\\ea72",edit:"\\ea73",pencil:"\\ea73",info:"\\ea74","issue-opened":"\\ea74","gist-private":"\\ea75","git-fork-private":"\\ea75",lock:"\\ea75","mirror-private":"\\ea75",close:"\\ea76","remove-close":"\\ea76",x:"\\ea76","repo-sync":"\\ea77",sync:"\\ea77",clone:"\\ea78","desktop-download":"\\ea78",beaker:"\\ea79",microscope:"\\ea79",vm:"\\ea7a","device-desktop":"\\ea7a",file:"\\ea7b",more:"\\ea7c",ellipsis:"\\ea7c","kebab-horizontal":"\\ea7c","mail-reply":"\\ea7d",reply:"\\ea7d",organization:"\\ea7e","organization-filled":"\\ea7e","organization-outline":"\\ea7e","new-file":"\\ea7f","file-add":"\\ea7f","new-folder":"\\ea80","file-directory-create":"\\ea80",trash:"\\ea81",trashcan:"\\ea81",history:"\\ea82",clock:"\\ea82",folder:"\\ea83","file-directory":"\\ea83","symbol-folder":"\\ea83","logo-github":"\\ea84","mark-github":"\\ea84",github:"\\ea84",terminal:"\\ea85",console:"\\ea85",repl:"\\ea85",zap:"\\ea86","symbol-event":"\\ea86",error:"\\ea87",stop:"\\ea87",variable:"\\ea88","symbol-variable":"\\ea88",array:"\\ea8a","symbol-array":"\\ea8a","symbol-module":"\\ea8b","symbol-package":"\\ea8b","symbol-namespace":"\\ea8b","symbol-object":"\\ea8b","symbol-method":"\\ea8c","symbol-function":"\\ea8c","symbol-constructor":"\\ea8c","symbol-boolean":"\\ea8f","symbol-null":"\\ea8f","symbol-numeric":"\\ea90","symbol-number":"\\ea90","symbol-structure":"\\ea91","symbol-struct":"\\ea91","symbol-parameter":"\\ea92","symbol-type-parameter":"\\ea92","symbol-key":"\\ea93","symbol-text":"\\ea93","symbol-reference":"\\ea94","go-to-file":"\\ea94","symbol-enum":"\\ea95","symbol-value":"\\ea95","symbol-ruler":"\\ea96","symbol-unit":"\\ea96","activate-breakpoints":"\\ea97",archive:"\\ea98","arrow-both":"\\ea99","arrow-down":"\\ea9a","arrow-left":"\\ea9b","arrow-right":"\\ea9c","arrow-small-down":"\\ea9d","arrow-small-left":"\\ea9e","arrow-small-right":"\\ea9f","arrow-small-up":"\\eaa0","arrow-up":"\\eaa1",bell:"\\eaa2",bold:"\\eaa3",book:"\\eaa4",bookmark:"\\eaa5","debug-breakpoint-conditional-unverified":"\\eaa6","debug-breakpoint-conditional":"\\eaa7","debug-breakpoint-conditional-disabled":"\\eaa7","debug-breakpoint-data-unverified":"\\eaa8","debug-breakpoint-data":"\\eaa9","debug-breakpoint-data-disabled":"\\eaa9","debug-breakpoint-log-unverified":"\\eaaa","debug-breakpoint-log":"\\eaab","debug-breakpoint-log-disabled":"\\eaab",briefcase:"\\eaac",broadcast:"\\eaad",browser:"\\eaae",bug:"\\eaaf",calendar:"\\eab0","case-sensitive":"\\eab1",check:"\\eab2",checklist:"\\eab3","chevron-down":"\\eab4","chevron-left":"\\eab5","chevron-right":"\\eab6","chevron-up":"\\eab7","chrome-close":"\\eab8","chrome-maximize":"\\eab9","chrome-minimize":"\\eaba","chrome-restore":"\\eabb","circle-outline":"\\eabc",circle:"\\eabc","debug-breakpoint-unverified":"\\eabc","terminal-decoration-incomplete":"\\eabc","circle-slash":"\\eabd","circuit-board":"\\eabe","clear-all":"\\eabf",clippy:"\\eac0","close-all":"\\eac1","cloud-download":"\\eac2","cloud-upload":"\\eac3",code:"\\eac4","collapse-all":"\\eac5","color-mode":"\\eac6","comment-discussion":"\\eac7","credit-card":"\\eac9",dash:"\\eacc",dashboard:"\\eacd",database:"\\eace","debug-continue":"\\eacf","debug-disconnect":"\\ead0","debug-pause":"\\ead1","debug-restart":"\\ead2","debug-start":"\\ead3","debug-step-into":"\\ead4","debug-step-out":"\\ead5","debug-step-over":"\\ead6","debug-stop":"\\ead7",debug:"\\ead8","device-camera-video":"\\ead9","device-camera":"\\eada","device-mobile":"\\eadb","diff-added":"\\eadc","diff-ignored":"\\eadd","diff-modified":"\\eade","diff-removed":"\\eadf","diff-renamed":"\\eae0",diff:"\\eae1","diff-sidebyside":"\\eae1",discard:"\\eae2","editor-layout":"\\eae3","empty-window":"\\eae4",exclude:"\\eae5",extensions:"\\eae6","eye-closed":"\\eae7","file-binary":"\\eae8","file-code":"\\eae9","file-media":"\\eaea","file-pdf":"\\eaeb","file-submodule":"\\eaec","file-symlink-directory":"\\eaed","file-symlink-file":"\\eaee","file-zip":"\\eaef",files:"\\eaf0",filter:"\\eaf1",flame:"\\eaf2","fold-down":"\\eaf3","fold-up":"\\eaf4",fold:"\\eaf5","folder-active":"\\eaf6","folder-opened":"\\eaf7",gear:"\\eaf8",gift:"\\eaf9","gist-secret":"\\eafa",gist:"\\eafb","git-commit":"\\eafc","git-compare":"\\eafd","compare-changes":"\\eafd","git-merge":"\\eafe","github-action":"\\eaff","github-alt":"\\eb00",globe:"\\eb01",grabber:"\\eb02",graph:"\\eb03",gripper:"\\eb04",heart:"\\eb05",home:"\\eb06","horizontal-rule":"\\eb07",hubot:"\\eb08",inbox:"\\eb09","issue-reopened":"\\eb0b",issues:"\\eb0c",italic:"\\eb0d",jersey:"\\eb0e",json:"\\eb0f",bracket:"\\eb0f","kebab-vertical":"\\eb10",key:"\\eb11",law:"\\eb12","lightbulb-autofix":"\\eb13","link-external":"\\eb14",link:"\\eb15","list-ordered":"\\eb16","list-unordered":"\\eb17","live-share":"\\eb18",loading:"\\eb19",location:"\\eb1a","mail-read":"\\eb1b",mail:"\\eb1c",markdown:"\\eb1d",megaphone:"\\eb1e",mention:"\\eb1f",milestone:"\\eb20","git-pull-request-milestone":"\\eb20","mortar-board":"\\eb21",move:"\\eb22","multiple-windows":"\\eb23",mute:"\\eb24","no-newline":"\\eb25",note:"\\eb26",octoface:"\\eb27","open-preview":"\\eb28",package:"\\eb29",paintcan:"\\eb2a",pin:"\\eb2b",play:"\\eb2c",run:"\\eb2c",plug:"\\eb2d","preserve-case":"\\eb2e",preview:"\\eb2f",project:"\\eb30",pulse:"\\eb31",question:"\\eb32",quote:"\\eb33","radio-tower":"\\eb34",reactions:"\\eb35",references:"\\eb36",refresh:"\\eb37",regex:"\\eb38","remote-explorer":"\\eb39",remote:"\\eb3a",remove:"\\eb3b","replace-all":"\\eb3c",replace:"\\eb3d","repo-clone":"\\eb3e","repo-force-push":"\\eb3f","repo-pull":"\\eb40","repo-push":"\\eb41",report:"\\eb42","request-changes":"\\eb43",rocket:"\\eb44","root-folder-opened":"\\eb45","root-folder":"\\eb46",rss:"\\eb47",ruby:"\\eb48","save-all":"\\eb49","save-as":"\\eb4a",save:"\\eb4b","screen-full":"\\eb4c","screen-normal":"\\eb4d","search-stop":"\\eb4e",server:"\\eb50","settings-gear":"\\eb51",settings:"\\eb52",shield:"\\eb53",smiley:"\\eb54","sort-precedence":"\\eb55","split-horizontal":"\\eb56","split-vertical":"\\eb57",squirrel:"\\eb58","star-full":"\\eb59","star-half":"\\eb5a","symbol-class":"\\eb5b","symbol-color":"\\eb5c","symbol-constant":"\\eb5d","symbol-enum-member":"\\eb5e","symbol-field":"\\eb5f","symbol-file":"\\eb60","symbol-interface":"\\eb61","symbol-keyword":"\\eb62","symbol-misc":"\\eb63","symbol-operator":"\\eb64","symbol-property":"\\eb65",wrench:"\\eb65","wrench-subaction":"\\eb65","symbol-snippet":"\\eb66",tasklist:"\\eb67",telescope:"\\eb68","text-size":"\\eb69","three-bars":"\\eb6a",thumbsdown:"\\eb6b",thumbsup:"\\eb6c",tools:"\\eb6d","triangle-down":"\\eb6e","triangle-left":"\\eb6f","triangle-right":"\\eb70","triangle-up":"\\eb71",twitter:"\\eb72",unfold:"\\eb73",unlock:"\\eb74",unmute:"\\eb75",unverified:"\\eb76",verified:"\\eb77",versions:"\\eb78","vm-active":"\\eb79","vm-outline":"\\eb7a","vm-running":"\\eb7b",watch:"\\eb7c",whitespace:"\\eb7d","whole-word":"\\eb7e",window:"\\eb7f","word-wrap":"\\eb80","zoom-in":"\\eb81","zoom-out":"\\eb82","list-filter":"\\eb83","list-flat":"\\eb84","list-selection":"\\eb85",selection:"\\eb85","list-tree":"\\eb86","debug-breakpoint-function-unverified":"\\eb87","debug-breakpoint-function":"\\eb88","debug-breakpoint-function-disabled":"\\eb88","debug-stackframe-active":"\\eb89","circle-small-filled":"\\eb8a","debug-stackframe-dot":"\\eb8a","terminal-decoration-mark":"\\eb8a","debug-stackframe":"\\eb8b","debug-stackframe-focused":"\\eb8b","debug-breakpoint-unsupported":"\\eb8c","symbol-string":"\\eb8d","debug-reverse-continue":"\\eb8e","debug-step-back":"\\eb8f","debug-restart-frame":"\\eb90","debug-alt":"\\eb91","call-incoming":"\\eb92","call-outgoing":"\\eb93",menu:"\\eb94","expand-all":"\\eb95",feedback:"\\eb96","git-pull-request-reviewer":"\\eb96","group-by-ref-type":"\\eb97","ungroup-by-ref-type":"\\eb98",account:"\\eb99","git-pull-request-assignee":"\\eb99","bell-dot":"\\eb9a","debug-console":"\\eb9b",library:"\\eb9c",output:"\\eb9d","run-all":"\\eb9e","sync-ignored":"\\eb9f",pinned:"\\eba0","github-inverted":"\\eba1","server-process":"\\eba2","server-environment":"\\eba3",pass:"\\eba4","issue-closed":"\\eba4","stop-circle":"\\eba5","play-circle":"\\eba6",record:"\\eba7","debug-alt-small":"\\eba8","vm-connect":"\\eba9",cloud:"\\ebaa",merge:"\\ebab",export:"\\ebac","graph-left":"\\ebad",magnet:"\\ebae",notebook:"\\ebaf",redo:"\\ebb0","check-all":"\\ebb1","pinned-dirty":"\\ebb2","pass-filled":"\\ebb3","circle-large-filled":"\\ebb4","circle-large":"\\ebb5","circle-large-outline":"\\ebb5",combine:"\\ebb6",gather:"\\ebb6",table:"\\ebb7","variable-group":"\\ebb8","type-hierarchy":"\\ebb9","type-hierarchy-sub":"\\ebba","type-hierarchy-super":"\\ebbb","git-pull-request-create":"\\ebbc","run-above":"\\ebbd","run-below":"\\ebbe","notebook-template":"\\ebbf","debug-rerun":"\\ebc0","workspace-trusted":"\\ebc1","workspace-untrusted":"\\ebc2","workspace-unknown":"\\ebc3","terminal-cmd":"\\ebc4","terminal-debian":"\\ebc5","terminal-linux":"\\ebc6","terminal-powershell":"\\ebc7","terminal-tmux":"\\ebc8","terminal-ubuntu":"\\ebc9","terminal-bash":"\\ebca","arrow-swap":"\\ebcb",copy:"\\ebcc","person-add":"\\ebcd","filter-filled":"\\ebce",wand:"\\ebcf","debug-line-by-line":"\\ebd0",inspect:"\\ebd1",layers:"\\ebd2","layers-dot":"\\ebd3","layers-active":"\\ebd4",compass:"\\ebd5","compass-dot":"\\ebd6","compass-active":"\\ebd7",azure:"\\ebd8","issue-draft":"\\ebd9","git-pull-request-closed":"\\ebda","git-pull-request-draft":"\\ebdb","debug-all":"\\ebdc","debug-coverage":"\\ebdd","run-errors":"\\ebde","folder-library":"\\ebdf","debug-continue-small":"\\ebe0","beaker-stop":"\\ebe1","graph-line":"\\ebe2","graph-scatter":"\\ebe3","pie-chart":"\\ebe4","bracket-dot":"\\ebe5","bracket-error":"\\ebe6","lock-small":"\\ebe7","azure-devops":"\\ebe8","verified-filled":"\\ebe9",newline:"\\ebea",layout:"\\ebeb","layout-activitybar-left":"\\ebec","layout-activitybar-right":"\\ebed","layout-panel-left":"\\ebee","layout-panel-center":"\\ebef","layout-panel-justify":"\\ebf0","layout-panel-right":"\\ebf1","layout-panel":"\\ebf2","layout-sidebar-left":"\\ebf3","layout-sidebar-right":"\\ebf4","layout-statusbar":"\\ebf5","layout-menubar":"\\ebf6","layout-centered":"\\ebf7",target:"\\ebf8",indent:"\\ebf9","record-small":"\\ebfa","error-small":"\\ebfb","terminal-decoration-error":"\\ebfb","arrow-circle-down":"\\ebfc","arrow-circle-left":"\\ebfd","arrow-circle-right":"\\ebfe","arrow-circle-up":"\\ebff","layout-sidebar-right-off":"\\ec00","layout-panel-off":"\\ec01","layout-sidebar-left-off":"\\ec02",blank:"\\ec03","heart-filled":"\\ec04",map:"\\ec05","map-horizontal":"\\ec05","fold-horizontal":"\\ec05","map-filled":"\\ec06","map-horizontal-filled":"\\ec06","fold-horizontal-filled":"\\ec06","circle-small":"\\ec07","bell-slash":"\\ec08","bell-slash-dot":"\\ec09","comment-unresolved":"\\ec0a","git-pull-request-go-to-changes":"\\ec0b","git-pull-request-new-changes":"\\ec0c","search-fuzzy":"\\ec0d","comment-draft":"\\ec0e",send:"\\ec0f",sparkle:"\\ec10",insert:"\\ec11",mic:"\\ec12","thumbsdown-filled":"\\ec13","thumbsup-filled":"\\ec14",coffee:"\\ec15",snake:"\\ec16",game:"\\ec17",vr:"\\ec18",chip:"\\ec19",piano:"\\ec1a",music:"\\ec1b","mic-filled":"\\ec1c","repo-fetch":"\\ec1d",copilot:"\\ec1e","lightbulb-sparkle":"\\ec1f",robot:"\\ec20","sparkle-filled":"\\ec21","diff-single":"\\ec22","diff-multiple":"\\ec23","surround-with":"\\ec24",share:"\\ec25","git-stash":"\\ec26","git-stash-apply":"\\ec27","git-stash-pop":"\\ec28",vscode:"\\ec29","vscode-insiders":"\\ec2a","code-oss":"\\ec2b","run-coverage":"\\ec2c","run-all-coverage":"\\ec2d",coverage:"\\ec2e","github-project":"\\ec2f","map-vertical":"\\ec30","fold-vertical":"\\ec30","map-vertical-filled":"\\ec31","fold-vertical-filled":"\\ec31","go-to-search":"\\ec32",percentage:"\\ec33","sort-percentage":"\\ec33",attach:"\\ec34","go-to-editing-session":"\\ec35","edit-session":"\\ec36","code-review":"\\ec37","copilot-warning":"\\ec38",python:"\\ec39","copilot-large":"\\ec3a","copilot-warning-large":"\\ec3b","keyboard-tab":"\\ec3c","copilot-blocked":"\\ec3d","copilot-not-connected":"\\ec3e",flag:"\\ec3f","lightbulb-empty":"\\ec40","symbol-method-arrow":"\\ec41","copilot-unavailable":"\\ec42","repo-pinned":"\\ec43","keyboard-tab-above":"\\ec44","keyboard-tab-below":"\\ec45","git-pull-request-done":"\\ec46",mcp:"\\ec47","extensions-large":"\\ec48","layout-panel-dock":"\\ec49","layout-sidebar-left-dock":"\\ec4a","layout-sidebar-right-dock":"\\ec4b","copilot-in-progress":"\\ec4c","copilot-error":"\\ec4d","copilot-success":"\\ec4e","chat-sparkle":"\\ec4f","search-sparkle":"\\ec50","edit-sparkle":"\\ec51","copilot-snooze":"\\ec52","send-to-remote-agent":"\\ec53","comment-discussion-sparkle":"\\ec54","chat-sparkle-warning":"\\ec55","chat-sparkle-error":"\\ec56",collection:"\\ec57","new-collection":"\\ec58",thinking:"\\ec59",build:"\\ec5a","comment-discussion-quote":"\\ec5b",cursor:"\\ec5c",eraser:"\\ec5d","file-text":"\\ec5e",quotes:"\\ec60",rename:"\\ec61","run-with-deps":"\\ec62","debug-connected":"\\ec63",strikethrough:"\\ec64","open-in-product":"\\ec65","index-zero":"\\ec66",agent:"\\ec67","edit-code":"\\ec68","repo-selected":"\\ec69",skip:"\\ec6a","merge-into":"\\ec6b","git-branch-changes":"\\ec6c","git-branch-staged-changes":"\\ec6d","git-branch-conflicts":"\\ec6e","git-branch":"\\ec6f","git-branch-create":"\\ec6f","git-branch-delete":"\\ec6f","search-large":"\\ec70","terminal-git-bash":"\\ec71","window-active":"\\ec72",forward:"\\ec73",download:"\\ec74",clockface:"\\ec75",unarchive:"\\ec76","session-in-progress":"\\ec77","collection-small":"\\ec78","vm-small":"\\ec79","cloud-small":"\\ec7a"}),oO=Object.freeze({"commit-horizontal":"\\f101",graph:"\\f102","next-commit":"\\f103","prev-commit-menu":"\\f104","prev-commit":"\\f105","compare-ref-working":"\\f106","branches-view":"\\f107","commit-view":"\\f108","commits-view":"\\f109","compare-view":"\\f10a","contributors-view":"\\f10b","history-view":"\\f10c",history:"\\f10c","remotes-view":"\\f10d","repositories-view":"\\f10e","search-view":"\\f10f","stashes-view":"\\f110",stashes:"\\f110","tags-view":"\\f111","worktrees-view":"\\f112",gitlens:"\\f113","stash-pop":"\\f114","stash-save":"\\f115",unplug:"\\f116","open-revision":"\\f117",switch:"\\f118",expand:"\\f119","list-auto":"\\f11a","pinned-filled":"\\f11c",clock:"\\f11d","provider-azdo":"\\f11e","provider-bitbucket":"\\f11f","provider-gerrit":"\\f120","provider-gitea":"\\f121","provider-github":"\\f122","provider-gitlab":"\\f123","gitlens-inspect":"\\f124","workspaces-view":"\\f125","confirm-checked":"\\f126","confirm-unchecked":"\\f127","cloud-patch":"\\f128","cloud-patch-share":"\\f129",inspect:"\\f12a","repository-filled":"\\f12b","gitlens-filled":"\\f12c","code-suggestion":"\\f12d","provider-jira":"\\f133","play-button":"\\f134","rocket-filled":"\\f135","branches-view-filled":"\\f136","commits-view-filled":"\\f137","contributors-view-filled":"\\f138","remotes-view-filled":"\\f139","repositories-view-filled":"\\f13a","search-view-filled":"\\f13b","stashes-view-filled":"\\f13c","tags-view-filled":"\\f13d","worktrees-view-filled":"\\f13e","launchpad-view":"\\f13f","launchpad-view-filled":"\\f140","merge-target":"\\f141","history-view-filled":"\\f142",repository:"\\f143",worktree:"\\f144","worktree-filled":"\\f145","repository-cloud":"\\f146","provider-linear":"\\f147"});var oD=Object.defineProperty,oB=Object.getOwnPropertyDescriptor,oN=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oB(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oD(i,r,n),n};function oU(t,i=""){return tL(Object.entries(t).map(([t,r])=>(function(t,i,r=""){return`:host([icon='${r}${t}'])::before { content: '${i}'; }`})(t,r,i)).join(""))}let oF=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.modifier="",this.size=void 0}updated(t){t.has("size")&&this.style.setProperty("--code-icon-size",`${this.size}px`),super.update(t)}};oF.styles=tO`
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

		${oU(oL)}
		${oU(oO,"gl-")}

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
	`,oN([t1({reflect:!0})],oF.prototype,"icon",2),oN([t1({reflect:!0})],oF.prototype,"modifier",2),oN([t1({type:Number})],oF.prototype,"size",2),oN([t1({reflect:!0})],oF.prototype,"flip",2),oN([t1({reflect:!0})],oF.prototype,"rotate",2),oF=oN([tJ("code-icon")],oF);var oj=Object.defineProperty,oV=Object.getOwnPropertyDescriptor,oH=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oV(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oj(i,r,n),n};let oq=class extends lit_element_i{constructor(){super(...arguments),this.icon="",this.disabled=!1,this.isAltKeyPressed=!1,this.handlePointerModifiers=t=>{let i=t.altKey||t.shiftKey;this.isAltKeyPressed!==i&&(this.isAltKeyPressed=i)},this.handleLinkKeydown=t=>{this.effectiveHref||" "!==t.key&&"Enter"!==t.key||(t.preventDefault(),t.target.click())}}get effectiveIcon(){return this.isAltKeyPressed&&this.altIcon?this.altIcon:this.icon}get effectiveTooltip(){if(this.label||this.altLabel)return this.altLabel?this.isAltKeyPressed?this.altLabel:`${this.label}
[${r2?"⌥":"Alt"}] ${this.altLabel}`:this.label}get effectiveLabel(){if(this.label||this.altLabel)return this.altLabel&&this.isAltKeyPressed?this.altLabel:this.label}get effectiveHref(){return this.isAltKeyPressed&&this.altHref?this.altHref:this.href}connectedCallback(){super.connectedCallback?.(),window.addEventListener("keydown",this),window.addEventListener("keyup",this),this.addEventListener("pointerenter",this.handlePointerModifiers),this.addEventListener("pointermove",this.handlePointerModifiers)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("keydown",this),window.removeEventListener("keyup",this),this.removeEventListener("pointerenter",this.handlePointerModifiers),this.removeEventListener("pointermove",this.handlePointerModifiers)}handleEvent(t){let i="Alt"===t.key||"Shift"===t.key||t.altKey||t.shiftKey;"keydown"===t.type?this.isAltKeyPressed=i:"keyup"===t.type&&i&&(this.isAltKeyPressed=!1)}render(){return ts`
			<gl-tooltip hoist content="${this.effectiveTooltip??ta}">
				<a
					role="${!this.effectiveHref?"button":ta}"
					type="${!this.effectiveHref?"button":ta}"
					aria-label="${this.effectiveLabel??ta}"
					?disabled=${this.disabled}
					href=${this.effectiveHref??ta}
					tabindex="0"
					@keydown=${this.handleLinkKeydown}
				>
					<code-icon part="icon" icon="${this.effectiveIcon}"></code-icon>
				</a>
			</gl-tooltip>
		`}focus(t){this.defaultFocusEl.focus(t)}};oq.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},oq.styles=tO`
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
			${rF}
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
	`,oH([t1()],oq.prototype,"href",2),oH([t1({attribute:"alt-href"})],oq.prototype,"altHref",2),oH([t1()],oq.prototype,"label",2),oH([t1({attribute:"alt-label"})],oq.prototype,"altLabel",2),oH([t1()],oq.prototype,"icon",2),oH([t1({attribute:"alt-icon"})],oq.prototype,"altIcon",2),oH([t1({type:Boolean})],oq.prototype,"disabled",2),oH([t3("a")],oq.prototype,"defaultFocusEl",2),oH([t2()],oq.prototype,"isAltKeyPressed",2),oq=oH([tJ("action-item")],oq);var oW=Object.defineProperty,oG=Object.getOwnPropertyDescriptor,oK=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oG(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oW(i,r,n),n};let oZ=class extends lit_element_i{constructor(){super(...arguments),this.size=12,this.worktree=!1}render(){return ts`<code-icon
				class="icon"
				icon="${this.worktree?"gl-worktree":"git-branch"}"
				size="${this.size}"
			></code-icon
			><span class="label">${this.name??"<missing>"}</span>`}};function oX(t,i){return ts`<gl-branch-name .name=${t} .size=${12} ?worktree=${i??!1}></gl-branch-name>`}oZ.styles=tO`
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
	`,oK([t1({type:String})],oZ.prototype,"name",2),oK([t1({type:Number})],oZ.prototype,"size",2),oK([t1({type:Boolean})],oZ.prototype,"worktree",2),oZ=oK([tJ("gl-branch-name")],oZ);var oQ=Object.defineProperty,oY=Object.getOwnPropertyDescriptor,oJ=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?oY(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&oQ(i,r,n),n};let o0=class extends lit_element_i{constructor(){super(...arguments),this.hasChanges=!1,this.worktree=!1,this.isDefault=!1}render(){return ts`<gl-tooltip placement="bottom"
			>${this.renderIcon()}<span slot="content">${this.renderTooltipContent()}</span></gl-tooltip
		>`}renderIcon(){let t;if(!this.worktree&&(!this.status||"local"===this.status))return ts`<code-icon icon="git-branch"></code-icon>`;if("detached"===this.status)return ts`<code-icon icon="git-commit"></code-icon>`;let i="0.5";switch(this.status){case"diverged":t="var(--gl-icon-color-status-diverged)";break;case"behind":t="var(--gl-icon-color-status-behind)";break;case"ahead":t="var(--gl-icon-color-status-ahead)";break;case"missingUpstream":t="var(--gl-icon-color-status-missingUpstream)";break;case"upToDate":t=`var(--gl-icon-color-status-${this.hasChanges?"changes":"synced"})`;break;default:this.hasChanges?t="var(--gl-icon-color-status-changes)":(t="transparent",i="1")}return this.worktree&&!1===this.isDefault?to`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="var(--gl-icon-color-foreground, #c5c5c5)"
					d="M13.5 4h.501v1.003h-.2a5.5 5.5 0 0 1 1.2.755V3.5l-.5-.5H13.5v1zm-4 0V3H7.713l-.852-.854L6.507 2H1.511l-.5.5v3.996L1 6.507v6.995l.5.5h6.227a5.528 5.528 0 0 1-.836-1H2V7.496h.01v-.489h4.486l.354-.146.858-.858h.014a5.51 5.51 0 0 1 1.477-1H7.5l-.353.147-.858.857H2.011V3H6.3l.853.853.353.146H9.5z"
				/>
				<path
					fill="${t}"
					stroke="var(--gl-icon-color-foreground, #c5c5c5)"
					stroke-width="${i}"
					d="M11.5 6.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z"
				/>
				<path stroke="var(--gl-icon-color-foreground, #c5c5c5)" d="M11.5 13v3M11.5 1v6" />
			</svg>`:to`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="${t}"
				stroke="var(--gl-icon-color-foreground, #c5c5c5)"
				stroke-width="${i}"
				d="M12 10.25a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5z"
			/>
			<path
				fill="var(--gl-icon-color-foreground, #c5c5c5)"
				d="M6 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 5.95a2.5 2.5 0 1 0-1 0v4.1a2.5 2.5 0 1 0 1.165.04c.168-.38.383-.622.61-.78.327-.227.738-.32 1.214-.31H7c.387 0 .76.03 1.124.059l.026.002c.343.027.694.055 1.003.046.313-.01.661-.06.954-.248.29-.185.466-.466.544-.812a.756.756 0 0 1 .046-.055 2.5 2.5 0 1 0-1.03-.134c-.028.108-.07.14-.1.16-.063.04-.191.08-.446.089a8.783 8.783 0 0 1-.917-.045A14.886 14.886 0 0 0 7.005 8c-.61-.013-1.249.105-1.8.488-.07.05-.14.102-.205.159V5.95zm7-.45a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-9 7a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
			/>
		</svg>`}renderTooltipContent(){let t,i=this.branch?oX(this.branch):"Branch",r=this.upstream?oX(this.upstream):"its upstream";switch(this.status){case"diverged":t=ts`${i} has diverged from ${r}`;break;case"behind":t=ts`${i} is behind ${r}`;break;case"ahead":t=ts`${i} is ahead of ${r}`;break;case"missingUpstream":t=ts`${i} is missing its upstream ${r}`;break;case"upToDate":t=ts`${i} is up to date with ${r}`;break;case"local":t=ts`${i} is a local branch which hasn't been published`;break;case"remote":t=ts`${i} is a remote branch`;break;case"detached":t=ts`${i} is in a detached state, i.e. checked out to a commit or tag`;break;default:t=ts`${i} is in an unknown state`}return t=ts`<p>${t}</p>`,this.worktree?t=this.hasChanges?ts`${t}
					<p>Checked out in a worktree and has working (uncommitted) changes</p>`:ts`${t}
					<p>Checked out in a worktree</p>`:this.hasChanges&&(t=ts`${t}
				<p>Has working (uncommitted) changes</p>`),t}};o0.styles=tO`
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
	`,oJ([t1({type:String})],o0.prototype,"branch",2),oJ([t1({type:String})],o0.prototype,"status",2),oJ([t1({type:Boolean})],o0.prototype,"hasChanges",2),oJ([t1({type:String})],o0.prototype,"upstream",2),oJ([t1({type:Boolean})],o0.prototype,"worktree",2),oJ([t1({type:Boolean,attribute:"is-default"})],o0.prototype,"isDefault",2),o0=oJ([tJ("gl-branch-icon")],o0);let private_async_helpers_s=class private_async_helpers_s{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}};let private_async_helpers_i=class private_async_helpers_i{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(t=>this.Z=t)}resume(){this.Z?.(),this.Y=this.Z=void 0}};let o1=t=>null!==t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then;let until_c=class until_c extends async_directive_f{constructor(){super(...arguments),this._$Cwt=0x3fffffff,this._$Cbt=[],this._$CK=new private_async_helpers_s(this),this._$CX=new private_async_helpers_i}render(...t){return t.find(t=>!o1(t))??tn}update(t,i){let r=this._$Cbt,s=r.length;this._$Cbt=i;let o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){let a=i[t];if(!o1(a))return this._$Cwt=t,a;t<s&&a===r[t]||(this._$Cwt=0x3fffffff,s=0,Promise.resolve(a).then(async t=>{for(;n.get();)await n.get();let i=o.deref();if(void 0!==i){let r=i._$Cbt.indexOf(a);r>-1&&r<i._$Cwt&&(i._$Cwt=r,i.setValue(t))}}))}return tn}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}};let o2=eq(until_c);function o5(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var o3=o5(),o6={exec:()=>null};function o4(t,i=""){let r="string"==typeof t?t:t.source,s={replace:(t,i)=>{let o="string"==typeof i?i:i.source;return o=o.replace(o8.caret,"$1"),r=r.replace(t,o),s},getRegex:()=>new RegExp(r,i)};return s}var o7=(()=>{try{return!!RegExp("(?<=1)(?<!1)")}catch{return!1}})(),o8={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>RegExp(`^ {0,${Math.min(3,t-1)}}>`)},o9=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ne=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,nt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ni=o4(nt).replace(/bull/g,ne).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nr=o4(nt).replace(/bull/g,ne).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ns=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,no=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nn=o4(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",no).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),na=o4(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ne).getRegex(),nl="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",nc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nh=o4("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",nc).replace("tag",nl).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nd=o4(ns).replace("hr",o9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nl).getRegex(),np={blockquote:o4(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nd).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:nn,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:o9,html:nh,lheading:ni,list:na,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:nd,table:o6,text:/^[^\n]+/},nu=o4("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",o9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nl).getRegex(),ng={...np,lheading:nr,table:nu,paragraph:o4(ns).replace("hr",o9).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",nu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",nl).getRegex()},nf={...np,html:o4("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",nc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:o6,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:o4(ns).replace("hr",o9).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ni).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},nm=/^( {2,}|\\)\n(?!\s*$)/,nb=/[\p{P}\p{S}]/u,nv=/[\s\p{P}\p{S}]/u,ny=/[^\s\p{P}\p{S}]/u,nw=o4(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,nv).getRegex(),n_=/(?!~)[\p{P}\p{S}]/u,nk=o4(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",o7?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),nx=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,nC=o4(nx,"u").replace(/punct/g,nb).getRegex(),n$=o4(nx,"u").replace(/punct/g,n_).getRegex(),nS="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nA=o4(nS,"gu").replace(/notPunctSpace/g,ny).replace(/punctSpace/g,nv).replace(/punct/g,nb).getRegex(),nP=o4(nS,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,n_).getRegex(),nT=o4("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ny).replace(/punctSpace/g,nv).replace(/punct/g,nb).getRegex(),nI=o4(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,nb).getRegex(),nE=o4("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,ny).replace(/punctSpace/g,nv).replace(/punct/g,nb).getRegex(),nz=o4(/\\(punct)/,"gu").replace(/punct/g,nb).getRegex(),nR=o4(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nM=o4(nc).replace("(?:--\x3e|$)","--\x3e").getRegex(),nL=o4("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nM).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),nO=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,nD=o4(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",nO).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),nB=o4(/^!?\[(label)\]\[(ref)\]/).replace("label",nO).replace("ref",no).getRegex(),nN=o4(/^!?\[(ref)\](?:\[\])?/).replace("ref",no).getRegex(),nU=o4("reflink|nolink(?!\\()","g").replace("reflink",nB).replace("nolink",nN).getRegex(),nF=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,nj={_backpedal:o6,anyPunctuation:nz,autolink:nR,blockSkip:nk,br:nm,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:o6,delLDelim:o6,delRDelim:o6,emStrongLDelim:nC,emStrongRDelimAst:nA,emStrongRDelimUnd:nT,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:nD,nolink:nN,punctuation:nw,reflink:nB,reflinkSearch:nU,tag:nL,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:o6},nV={...nj,link:o4(/^!?\[(label)\]\((.*?)\)/).replace("label",nO).getRegex(),reflink:o4(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",nO).getRegex()},nH={...nj,emStrongRDelimAst:nP,emStrongLDelim:n$,delLDelim:nI,delRDelim:nE,url:o4(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",nF).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:o4(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",nF).getRegex()},nq={...nH,br:o4(nm).replace("{2,}","*").getRegex(),text:o4(nH.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},nW={normal:np,gfm:ng,pedantic:nf},nG={normal:nj,gfm:nH,breaks:nq,pedantic:nV},nK={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},nZ=t=>nK[t];function nX(t,i){if(i){if(o8.escapeTest.test(t))return t.replace(o8.escapeReplace,nZ)}else if(o8.escapeTestNoEncode.test(t))return t.replace(o8.escapeReplaceNoEncode,nZ);return t}function nQ(t){try{t=encodeURI(t).replace(o8.percentDecode,"%")}catch{return null}return t}function nY(t,i){let r=t.replace(o8.findPipe,(t,i,r)=>{let s=!1,o=i;for(;--o>=0&&"\\"===r[o];)s=!s;return s?"|":" |"}).split(o8.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),i)if(r.length>i)r.splice(i);else for(;r.length<i;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(o8.slashPipe,"|");return r}function nJ(t,i,r){let s=t.length;if(0===s)return"";let o=0;for(;o<s;){let n=t.charAt(s-o-1);if(n!==i||r)if(n!==i&&r)o++;else break;else o++}return t.slice(0,s-o)}function n0(t,i,r,s,o){let n=i.href,a=i.title||null,c=t[1].replace(o.other.outputLinkReplace,"$1");s.state.inLink=!0;let h={type:"!"===t[0].charAt(0)?"image":"link",raw:r,href:n,title:a,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,h}var n1=class{options;rules;lexer;constructor(t){this.options=t||o3}space(t){let i=this.rules.block.newline.exec(t);if(i&&i[0].length>0)return{type:"space",raw:i[0]}}code(t){let i=this.rules.block.code.exec(t);if(i){let t=i[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:i[0],codeBlockStyle:"indented",text:this.options.pedantic?t:nJ(t,`
`)}}}fences(t){let i=this.rules.block.fences.exec(t);if(i){let t=i[0],r=function(t,i,r){let s=t.match(r.other.indentCodeCompensation);if(null===s)return i;let o=s[1];return i.split(`
`).map(t=>{let i=t.match(r.other.beginningSpace);if(null===i)return t;let[s]=i;return s.length>=o.length?t.slice(o.length):t}).join(`
`)}(t,i[3]||"",this.rules);return{type:"code",raw:t,lang:i[2]?i[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):i[2],text:r}}}heading(t){let i=this.rules.block.heading.exec(t);if(i){let t=i[2].trim();if(this.rules.other.endingHash.test(t)){let i=nJ(t,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(t=i.trim())}return{type:"heading",raw:i[0],depth:i[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(t){let i=this.rules.block.hr.exec(t);if(i)return{type:"hr",raw:nJ(i[0],`
`)}}blockquote(t){let i=this.rules.block.blockquote.exec(t);if(i){let t=nJ(i[0],`
`).split(`
`),r="",s="",o=[];for(;t.length>0;){let i=!1,n=[],a;for(a=0;a<t.length;a++)if(this.rules.other.blockquoteStart.test(t[a]))n.push(t[a]),i=!0;else if(i)break;else n.push(t[a]);t=t.slice(a);let c=n.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,s=s?`${s}
${h}`:h;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=p,0===t.length)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let i=g.raw+`
`+t.join(`
`),n=this.blockquote(i);o[o.length-1]=n,r=r.substring(0,r.length-g.raw.length)+n.raw,s=s.substring(0,s.length-g.text.length)+n.text;break}if(g?.type==="list"){let i=g.raw+`
`+t.join(`
`),n=this.list(i);o[o.length-1]=n,r=r.substring(0,r.length-g.raw.length)+n.raw,s=s.substring(0,s.length-g.raw.length)+n.raw,t=i.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(t){let i=this.rules.block.list.exec(t);if(i){let r=i[1].trim(),s=r.length>1,o={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let n=this.rules.other.listItemRegex(r),a=!1;for(;t;){let r=!1,s="",c="";if(!(i=n.exec(t))||this.rules.block.hr.test(t))break;s=i[0],t=t.substring(s.length);let h=function(t,i=0){let r=i,s="";for(let i of t)if("	"===i){let t=4-r%4;s+=" ".repeat(t),r+=t}else s+=i,r++;return s}(i[2].split(`
`,1)[0],i[1].length),p=t.split(`
`,1)[0],g=!h.trim(),f=0;if(this.options.pedantic?(f=2,c=h.trimStart()):g?f=i[1].length+1:(f=(f=h.search(this.rules.other.nonSpaceChar))>4?1:f,c=h.slice(f),f+=i[1].length),g&&this.rules.other.blankLine.test(p)&&(s+=p+`
`,t=t.substring(p.length+1),r=!0),!r){let i=this.rules.other.nextBulletRegex(f),r=this.rules.other.hrRegex(f),o=this.rules.other.fencesBeginRegex(f),n=this.rules.other.headingBeginRegex(f),a=this.rules.other.htmlBeginRegex(f),m=this.rules.other.blockquoteBeginRegex(f);for(;t;){let b=t.split(`
`,1)[0],v;if(p=b,v=this.options.pedantic?p=p.replace(this.rules.other.listReplaceNesting,"  "):p.replace(this.rules.other.tabCharGlobal,"    "),o.test(p)||n.test(p)||a.test(p)||m.test(p)||i.test(p)||r.test(p))break;if(v.search(this.rules.other.nonSpaceChar)>=f||!p.trim())c+=`
`+v.slice(f);else{if(g||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||o.test(h)||n.test(h)||r.test(h))break;c+=`
`+p}g=!p.trim(),s+=b+`
`,t=t.substring(b.length+1),h=v.slice(f)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(s)&&(a=!0)),o.items.push({type:"list_item",raw:s,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),o.raw+=s}let c=o.items.at(-1);if(!c)return;for(let t of(c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),o.raw=o.raw.trimEnd(),o.items)){if(this.lexer.state.top=!1,t.tokens=this.lexer.blockTokens(t.text,[]),t.task){if(t.text=t.text.replace(this.rules.other.listReplaceTask,""),t.tokens[0]?.type==="text"||t.tokens[0]?.type==="paragraph"){t.tokens[0].raw=t.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),t.tokens[0].text=t.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let t=this.lexer.inlineQueue.length-1;t>=0;t--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[t].src)){this.lexer.inlineQueue[t].src=this.lexer.inlineQueue[t].src.replace(this.rules.other.listReplaceTask,"");break}}let i=this.rules.other.listTaskCheckbox.exec(t.raw);if(i){let r={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};t.checked=r.checked,o.loose?t.tokens[0]&&["paragraph","text"].includes(t.tokens[0].type)&&"tokens"in t.tokens[0]&&t.tokens[0].tokens?(t.tokens[0].raw=r.raw+t.tokens[0].raw,t.tokens[0].text=r.raw+t.tokens[0].text,t.tokens[0].tokens.unshift(r)):t.tokens.unshift({type:"paragraph",raw:r.raw,text:r.raw,tokens:[r]}):t.tokens.unshift(r)}}if(!o.loose){let i=t.tokens.filter(t=>"space"===t.type);o.loose=i.length>0&&i.some(t=>this.rules.other.anyLine.test(t.raw))}}if(o.loose)for(let t of o.items)for(let i of(t.loose=!0,t.tokens))"text"===i.type&&(i.type="paragraph");return o}}html(t){let i=this.rules.block.html.exec(t);if(i)return{type:"html",block:!0,raw:i[0],pre:"pre"===i[1]||"script"===i[1]||"style"===i[1],text:i[0]}}def(t){let i=this.rules.block.def.exec(t);if(i){let t=i[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=i[2]?i[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=i[3]?i[3].substring(1,i[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):i[3];return{type:"def",tag:t,raw:i[0],href:r,title:s}}}table(t){let i=this.rules.block.table.exec(t);if(!i||!this.rules.other.tableDelimiter.test(i[2]))return;let r=nY(i[1]),s=i[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=i[3]?.trim()?i[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:i[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let t of s)this.rules.other.tableAlignRight.test(t)?n.align.push("right"):this.rules.other.tableAlignCenter.test(t)?n.align.push("center"):this.rules.other.tableAlignLeft.test(t)?n.align.push("left"):n.align.push(null);for(let t=0;t<r.length;t++)n.header.push({text:r[t],tokens:this.lexer.inline(r[t]),header:!0,align:n.align[t]});for(let t of o)n.rows.push(nY(t,n.header.length).map((t,i)=>({text:t,tokens:this.lexer.inline(t),header:!1,align:n.align[i]})));return n}}lheading(t){let i=this.rules.block.lheading.exec(t);if(i){let t=i[1].trim();return{type:"heading",raw:i[0],depth:"="===i[2].charAt(0)?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(t){let i=this.rules.block.paragraph.exec(t);if(i){let t=i[1].charAt(i[1].length-1)===`
`?i[1].slice(0,-1):i[1];return{type:"paragraph",raw:i[0],text:t,tokens:this.lexer.inline(t)}}}text(t){let i=this.rules.block.text.exec(t);if(i)return{type:"text",raw:i[0],text:i[0],tokens:this.lexer.inline(i[0])}}escape(t){let i=this.rules.inline.escape.exec(t);if(i)return{type:"escape",raw:i[0],text:i[1]}}tag(t){let i=this.rules.inline.tag.exec(t);if(i)return!this.lexer.state.inLink&&this.rules.other.startATag.test(i[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(i[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(i[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(i[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:i[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:i[0]}}link(t){let i=this.rules.inline.link.exec(t);if(i){let t=i[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=nJ(t.slice(0,-1),"\\");if((t.length-i.length)%2==0)return}else{let t=function(t){if(-1===t.indexOf(")"))return -1;let i=0;for(let r=0;r<t.length;r++)if("\\"===t[r])r++;else if("("===t[r])i++;else if(")"===t[r]&&--i<0)return r;return i>0?-2:-1}(i[2]);if(-2===t)return;if(t>-1){let r=(0===i[0].indexOf("!")?5:4)+i[1].length+t;i[2]=i[2].substring(0,t),i[0]=i[0].substring(0,r).trim(),i[3]=""}}let r=i[2],s="";if(this.options.pedantic){let t=this.rules.other.pedanticHrefTitle.exec(r);t&&(r=t[1],s=t[3])}else s=i[3]?i[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(r=this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?r.slice(1):r.slice(1,-1)),n0(i,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},i[0],this.lexer,this.rules)}}reflink(t,i){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let t=i[(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!t){let t=r[0].charAt(0);return{type:"text",raw:t,text:t}}return n0(r,t,r[0],this.lexer,this.rules)}}emStrong(t,i,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!r||this.rules.inline.punctuation.exec(r))){let r=[...s[0]].length-1,o,n,a=r,c=0,h="*"===s[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,i=i.slice(-1*t.length+r);null!=(s=h.exec(i));){if(!(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6]))continue;if(n=[...o].length,s[3]||s[4]){a+=n;continue}if((s[5]||s[6])&&r%3&&!((r+n)%3)){c+=n;continue}if((a-=n)>0)continue;n=Math.min(n,n+a+c);let i=[...s[0]][0].length,h=t.slice(0,r+s.index+i+n);if(Math.min(r,n)%2){let t=h.slice(1,-1);return{type:"em",raw:h,text:t,tokens:this.lexer.inlineTokens(t)}}let p=h.slice(2,-2);return{type:"strong",raw:h,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(t){let i=this.rules.inline.code.exec(t);if(i){let t=i[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return r&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:i[0],text:t}}}br(t){let i=this.rules.inline.br.exec(t);if(i)return{type:"br",raw:i[0]}}del(t,i,r=""){let s=this.rules.inline.delLDelim.exec(t);if(s&&(!s[1]||!r||this.rules.inline.punctuation.exec(r))){let r=[...s[0]].length-1,o,n,a=r,c=this.rules.inline.delRDelim;for(c.lastIndex=0,i=i.slice(-1*t.length+r);null!=(s=c.exec(i));){if(!(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6])||(n=[...o].length)!==r)continue;if(s[3]||s[4]){a+=n;continue}if((a-=n)>0)continue;n=Math.min(n,n+a);let i=[...s[0]][0].length,c=t.slice(0,r+s.index+i+n),h=c.slice(r,-r);return{type:"del",raw:c,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(t){let i=this.rules.inline.autolink.exec(t);if(i){let t,r;return r="@"===i[2]?"mailto:"+(t=i[1]):t=i[1],{type:"link",raw:i[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}url(t){let i;if(i=this.rules.inline.url.exec(t)){let t,r;if("@"===i[2])r="mailto:"+(t=i[0]);else{let s;do s=i[0],i[0]=this.rules.inline._backpedal.exec(i[0])?.[0]??"";while(s!==i[0])t=i[0],r="www."===i[1]?"http://"+i[0]:i[0]}return{type:"link",raw:i[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(t){let i=this.rules.inline.text.exec(t);if(i){let t=this.lexer.state.inRawBlock;return{type:"text",raw:i[0],text:i[0],escaped:t}}}},n2=class u{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||o3,this.options.tokenizer=this.options.tokenizer||new n1,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let i={other:o8,block:nW.normal,inline:nG.normal};this.options.pedantic?(i.block=nW.pedantic,i.inline=nG.pedantic):this.options.gfm&&(i.block=nW.gfm,this.options.breaks?i.inline=nG.breaks:i.inline=nG.gfm),this.tokenizer.rules=i}static get rules(){return{block:nW,inline:nG}}static lex(t,i){return new u(i).lex(t)}static lexInline(t,i){return new u(i).inlineTokens(t)}lex(t){t=t.replace(o8.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let i=this.inlineQueue[t];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,i=[],r=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(o8.tabCharGlobal,"    ").replace(o8.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(r=>!!(s=r.call({lexer:this},t,i))&&(t=t.substring(s.raw.length),i.push(s),!0)))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let r=i.at(-1);1===s.raw.length&&void 0!==r?r.raw+=`
`:i.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let r=i.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+s.raw,r.text+=`
`+s.text,this.inlineQueue.at(-1).src=r.text):i.push(s);continue}if((s=this.tokenizer.fences(t))||(s=this.tokenizer.heading(t))||(s=this.tokenizer.hr(t))||(s=this.tokenizer.blockquote(t))||(s=this.tokenizer.list(t))||(s=this.tokenizer.html(t))){t=t.substring(s.raw.length),i.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let r=i.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+s.raw,r.text+=`
`+s.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},i.push(s));continue}if((s=this.tokenizer.table(t))||(s=this.tokenizer.lheading(t))){t=t.substring(s.raw.length),i.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,r=t.slice(1),s;this.options.extensions.startBlock.forEach(t=>{"number"==typeof(s=t.call({lexer:this},r))&&s>=0&&(i=Math.min(i,s))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let n=i.at(-1);r&&n?.type==="paragraph"?(n.raw+=(n.raw.endsWith(`
`)?"":`
`)+s.raw,n.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):i.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let r=i.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+s.raw,r.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):i.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent)break;throw Error(i)}}return this.state.top=!0,i}inline(t,i=[]){return this.inlineQueue.push({src:t,tokens:i}),i}inlineTokens(t,i=[]){let r;this.tokenizer.lexer=this;let s=t,o=null;if(this.tokens.links){let t=Object.keys(this.tokens.links);if(t.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(s));)t.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.anyPunctuation.exec(s));)s=s.slice(0,o.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(s));)r=o[2]?o[2].length:0,s=s.slice(0,o.index+r)+"["+"a".repeat(o[0].length-r-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let n=!1,a="";for(;t;){let r;if(n||(a=""),n=!1,this.options.extensions?.inline?.some(s=>!!(r=s.call({lexer:this},t,i))&&(t=t.substring(r.raw.length),i.push(r),!0)))continue;if((r=this.tokenizer.escape(t))||(r=this.tokenizer.tag(t))||(r=this.tokenizer.link(t))){t=t.substring(r.raw.length),i.push(r);continue}if(r=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(r.raw.length);let s=i.at(-1);"text"===r.type&&s?.type==="text"?(s.raw+=r.raw,s.text+=r.text):i.push(r);continue}if((r=this.tokenizer.emStrong(t,s,a))||(r=this.tokenizer.codespan(t))||(r=this.tokenizer.br(t))||(r=this.tokenizer.del(t,s,a))||(r=this.tokenizer.autolink(t))||!this.state.inLink&&(r=this.tokenizer.url(t))){t=t.substring(r.raw.length),i.push(r);continue}let o=t;if(this.options.extensions?.startInline){let i=1/0,r=t.slice(1),s;this.options.extensions.startInline.forEach(t=>{"number"==typeof(s=t.call({lexer:this},r))&&s>=0&&(i=Math.min(i,s))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(r=this.tokenizer.inlineText(o)){t=t.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(a=r.raw.slice(-1)),n=!0;let s=i.at(-1);s?.type==="text"?(s.raw+=r.raw,s.text+=r.text):i.push(r);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent)break;throw Error(i)}}return i}},n5=class{options;parser;constructor(t){this.options=t||o3}space(t){return""}code({text:t,lang:i,escaped:r}){let s=(i||"").match(o8.notSpaceStart)?.[0],o=t.replace(o8.endingNewline,"")+`
`;return s?'<pre><code class="language-'+nX(s)+'">'+(r?o:nX(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:nX(o,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:i}){return`<h${i}>${this.parser.parseInline(t)}</h${i}>
`}hr(t){return`<hr>
`}list(t){let i=t.ordered,r=t.start,s="";for(let i=0;i<t.items.length;i++){let r=t.items[i];s+=this.listitem(r)}let o=i?"ol":"ul";return"<"+o+(i&&1!==r?' start="'+r+'"':"")+`>
`+s+"</"+o+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let i="",r="";for(let i=0;i<t.header.length;i++)r+=this.tablecell(t.header[i]);i+=this.tablerow({text:r});let s="";for(let i=0;i<t.rows.length;i++){let o=t.rows[i];r="";for(let t=0;t<o.length;t++)r+=this.tablecell(o[t]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+i+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let i=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+i+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${nX(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:i,tokens:r}){let s=this.parser.parseInline(r),o=nQ(t);if(null===o)return s;let n='<a href="'+(t=o)+'"';return i&&(n+=' title="'+nX(i)+'"'),n+=">"+s+"</a>"}image({href:t,title:i,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let o=nQ(t);if(null===o)return nX(r);t=o;let n=`<img src="${t}" alt="${nX(r)}"`;return i&&(n+=` title="${nX(i)}"`),n+=">"}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:nX(t.text)}},n3=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},n6=class u{options;renderer;textRenderer;constructor(t){this.options=t||o3,this.options.renderer=this.options.renderer||new n5,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new n3}static parse(t,i){return new u(i).parse(t)}static parseInline(t,i){return new u(i).parseInline(t)}parse(t){this.renderer.parser=this;let i="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let t=this.options.extensions.renderers[s.type].call({parser:this},s);if(!1!==t||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){i+=t||"";continue}}switch(s.type){case"space":i+=this.renderer.space(s);break;case"hr":i+=this.renderer.hr(s);break;case"heading":i+=this.renderer.heading(s);break;case"code":i+=this.renderer.code(s);break;case"table":i+=this.renderer.table(s);break;case"blockquote":i+=this.renderer.blockquote(s);break;case"list":i+=this.renderer.list(s);break;case"checkbox":i+=this.renderer.checkbox(s);break;case"html":i+=this.renderer.html(s);break;case"def":i+=this.renderer.def(s);break;case"paragraph":i+=this.renderer.paragraph(s);break;case"text":i+=this.renderer.text(s);break;default:{let t='Token with "'+s.type+'" type was not found.';if(this.options.silent)return"";throw Error(t)}}}return i}parseInline(t,i=this.renderer){this.renderer.parser=this;let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let t=this.options.extensions.renderers[o.type].call({parser:this},o);if(!1!==t||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=t||"";continue}}switch(o.type){case"escape":case"text":r+=i.text(o);break;case"html":r+=i.html(o);break;case"link":r+=i.link(o);break;case"image":r+=i.image(o);break;case"checkbox":r+=i.checkbox(o);break;case"strong":r+=i.strong(o);break;case"em":r+=i.em(o);break;case"codespan":r+=i.codespan(o);break;case"br":r+=i.br(o);break;case"del":r+=i.del(o);break;default:{let t='Token with "'+o.type+'" type was not found.';if(this.options.silent)return"";throw Error(t)}}}return r}},n4=class{options;block;constructor(t){this.options=t||o3}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?n2.lex:n2.lexInline}provideParser(){return this.block?n6.parse:n6.parseInline}},n7=class{defaults=o5();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=n6;Renderer=n5;TextRenderer=n3;Lexer=n2;Tokenizer=n1;Hooks=n4;constructor(...t){this.use(...t)}walkTokens(t,i){let r=[];for(let s of t)switch(r=r.concat(i.call(this,s)),s.type){case"table":for(let t of s.header)r=r.concat(this.walkTokens(t.tokens,i));for(let t of s.rows)for(let s of t)r=r.concat(this.walkTokens(s.tokens,i));break;case"list":r=r.concat(this.walkTokens(s.items,i));break;default:{let t=s;this.defaults.extensions?.childTokens?.[t.type]?this.defaults.extensions.childTokens[t.type].forEach(s=>{let o=t[s].flat(1/0);r=r.concat(this.walkTokens(o,i))}):t.tokens&&(r=r.concat(this.walkTokens(t.tokens,i)))}}return r}use(...t){let i=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(t=>{let r={...t};if(r.async=this.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach(t=>{if(!t.name)throw Error("extension name required");if("renderer"in t){let r=i.renderers[t.name];r?i.renderers[t.name]=function(...i){let s=t.renderer.apply(this,i);return!1===s&&(s=r.apply(this,i)),s}:i.renderers[t.name]=t.renderer}if("tokenizer"in t){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw Error("extension level must be 'block' or 'inline'");let r=i[t.level];r?r.unshift(t.tokenizer):i[t.level]=[t.tokenizer],t.start&&("block"===t.level?i.startBlock?i.startBlock.push(t.start):i.startBlock=[t.start]:"inline"===t.level&&(i.startInline?i.startInline.push(t.start):i.startInline=[t.start]))}"childTokens"in t&&t.childTokens&&(i.childTokens[t.name]=t.childTokens)}),r.extensions=i),t.renderer){let i=this.defaults.renderer||new n5(this.defaults);for(let r in t.renderer){if(!(r in i))throw Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let s=t.renderer[r],o=i[r];i[r]=(...t)=>{let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r||""}}r.renderer=i}if(t.tokenizer){let i=this.defaults.tokenizer||new n1(this.defaults);for(let r in t.tokenizer){if(!(r in i))throw Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let s=t.tokenizer[r],o=i[r];i[r]=(...t)=>{let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r}}r.tokenizer=i}if(t.hooks){let i=this.defaults.hooks||new n4;for(let r in t.hooks){if(!(r in i))throw Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let s=t.hooks[r],o=i[r];n4.passThroughHooks.has(r)?i[r]=t=>{if(this.defaults.async&&n4.passThroughHooksRespectAsync.has(r))return(async()=>{let r=await s.call(i,t);return o.call(i,r)})();let n=s.call(i,t);return o.call(i,n)}:i[r]=(...t)=>{if(this.defaults.async)return(async()=>{let r=await s.apply(i,t);return!1===r&&(r=await o.apply(i,t)),r})();let r=s.apply(i,t);return!1===r&&(r=o.apply(i,t)),r}}r.hooks=i}if(t.walkTokens){let i=this.defaults.walkTokens,s=t.walkTokens;r.walkTokens=function(t){let r=[];return r.push(s.call(this,t)),i&&(r=r.concat(i.call(this,t))),r}}this.defaults={...this.defaults,...r}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,i){return n2.lex(t,i??this.defaults)}parser(t,i){return n6.parse(t,i??this.defaults)}parseMarkdown(t){return(i,r)=>{let s={...r},o={...this.defaults,...s},n=this.onError(!!o.silent,!!o.async);if(!0===this.defaults.async&&!1===s.async)return n(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof i>"u"||null===i)return n(Error("marked(): input parameter is undefined or null"));if("string"!=typeof i)return n(Error("marked(): input parameter is of type "+Object.prototype.toString.call(i)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=t),o.async)return(async()=>{let r=o.hooks?await o.hooks.preprocess(i):i,s=await (o.hooks?await o.hooks.provideLexer():t?n2.lex:n2.lexInline)(r,o),n=o.hooks?await o.hooks.processAllTokens(s):s;o.walkTokens&&await Promise.all(this.walkTokens(n,o.walkTokens));let a=await (o.hooks?await o.hooks.provideParser():t?n6.parse:n6.parseInline)(n,o);return o.hooks?await o.hooks.postprocess(a):a})().catch(n);try{o.hooks&&(i=o.hooks.preprocess(i));let r=(o.hooks?o.hooks.provideLexer():t?n2.lex:n2.lexInline)(i,o);o.hooks&&(r=o.hooks.processAllTokens(r)),o.walkTokens&&this.walkTokens(r,o.walkTokens);let s=(o.hooks?o.hooks.provideParser():t?n6.parse:n6.parseInline)(r,o);return o.hooks&&(s=o.hooks.postprocess(s)),s}catch(t){return n(t)}}}onError(t,i){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let t="<p>An error occurred:</p><pre>"+nX(r.message+"",!0)+"</pre>";return i?Promise.resolve(t):t}if(i)return Promise.reject(r);throw r}}},n8=new n7;function n9(t,i){return n8.parse(t,i)}n9.options=n9.setOptions=function(t){return n8.setOptions(t),n9.defaults=n8.defaults,o3=n9.defaults,n9},n9.getDefaults=o5,n9.defaults=o3,n9.use=function(...t){return n8.use(...t),n9.defaults=n8.defaults,o3=n9.defaults,n9},n9.walkTokens=function(t,i){return n8.walkTokens(t,i)},n9.parseInline=n8.parseInline,n9.Parser=n6,n9.parser=n6.parse,n9.Renderer=n5,n9.TextRenderer=n3,n9.Lexer=n2,n9.lexer=n2.lex,n9.Tokenizer=n1,n9.Hooks=n4,n9.parse=n9,n9.options,n9.setOptions,n9.use,n9.walkTokens,n9.parseInline,n6.parse,n2.lex,tO`
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
`;let ae=tO`
	hr {
		border: none;
		border-top: 1px solid var(--color-foreground--25);
	}
`;var at=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,ar=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?ai(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&at(i,r,n),n};let as=class extends lit_element_i{constructor(){super(...arguments),this.markdown="",this.density="compact",this.inline=!1}render(){return ts`${this.markdown?o2(this.renderMarkdown(this.markdown),"Loading..."):""}`}async renderMarkdown(t){let i,r,s,o;return this.inline?(a??=new n7({breaks:!1,gfm:!0,renderer:(r=0,s=!1,{blockquote:function({tokens:t}){return this.parser.parse(t)},code:function({text:t}){return`<code>${aa(t)}</code>`},codespan:function({text:t}){return`<code>${aa(t)}</code>`},heading:function({tokens:t}){return this.parser.parseInline(t)},hr:function(){return""},image:function({text:t}){return t||""},link:function({tokens:t}){return this.parser.parseInline(t)},list:function(t){s=t.ordered,r="number"==typeof t.start?t.start:1;let i="";for(let r of t.items)i+=o.call(this,r);return i},listitem:o=function(t){let i,o=this.parser.parse(t.tokens);return t.task?i=t.checked?"☑":"☐":s?(i=`${r}.`,r++):i="•",`${i} ${o.trim()} `},paragraph:function({tokens:t}){return this.parser.parseInline(t)},table:function(){return""},br:function(){return" "},html:function(){return""}})}),i=af(i=await a.parse(ag(t))),ts`<span>${rT(i)}</span>`):(c??=new n7({breaks:!0,gfm:!0,renderer:{image:function({href:t,title:i,text:r}){let s=[],o=[];return t&&({href:t,dimensions:s}=function(t){let i=[],r=t.split("|").map(t=>t.trim());t=r[0];let s=r[1];if(s){let t=/height=(\d+)/.exec(s),r=/width=(\d+)/.exec(s),o=t?t[1]:"",n=r?r[1]:"",a=isFinite(parseInt(n)),c=isFinite(parseInt(o));a&&i.push(`width="${n}"`),c&&i.push(`height="${o}"`)}return{href:t,dimensions:i}}(t),o.push(`src="${ab(t)}"`)),r&&o.push(`alt="${ab(r)}"`),i&&o.push(`title="${ab(i)}"`),s.length&&(o=[...o,...s]),`<img ${o.join(" ")}>`},codespan:function({text:t}){return`<code>${aa(t)}</code>`},paragraph:function({tokens:t}){let i=this.parser.parseInline(t);return`<p>${i}</p>`},html:function({text:t}){return t.match(/^(<span[^>]+>)|(<\/\s*span>)$/)?t:""}}}),rT(i=af(i=await c.parse(ag(t)))))}};as.styles=[ae,tO`
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
=		`],ar([t1({type:String})],as.prototype,"markdown",2),ar([t1({type:String,reflect:!0})],as.prototype,"density",2),ar([t1({type:Boolean,reflect:!0})],as.prototype,"inline",2),as=ar([tJ("gl-markdown")],as);let ao={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},an=t=>ao[t];function aa(t,i){if(i){if(/[&<>"']/.test(t))return t.replace(/[&<>"']/g,an)}else if(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/.test(t))return t.replace(/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,an);return t}let al="[A-Za-z0-9-]+",ac="~[A-Za-z]+",ah=RegExp(`^(${al})(${ac})?$`),ad=RegExp(`\\$\\(${al}(?:${ac})?\\)`,"g"),ap=RegExp(`\\\\${ad.source}`,"g"),au=RegExp(`(\\\\)?\\$\\((${al}(?:${ac})?)\\)`,"g");function ag(t){return t.replace(ap,t=>`\\${t}`)}function af(t){let i,r=[],s=0,o=0;for(;null!==(i=au.exec(t));){s<(o=i.index||0)&&r.push(t.substring(s,o)),s=(i.index||0)+i[0].length;let[,n,a]=i;r.push(n?`$(${a})`:function(t){let[,i,r]=ah.exec(t.id)??[void 0,"error",void 0];return i.startsWith("gitlens-")&&(i=`gl-${i.substring(8)}`),`<code-icon icon="${i}"${r?` modifier="${r}"`:""}></code-icon>`}({id:a}))}return s<t.length&&r.push(t.substring(s)),r.join("")}let am=/"/g;function ab(t){return t.replace(am,"&quot;")}oC.define("sl-popup");var av=Object.defineProperty,ay=Object.getOwnPropertyDescriptor,aw=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?ay(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&av(i,r,n),n};let a_=class extends GlElement{constructor(){super(...arguments),this.placement="bottom",this.disabled=!1,this.distance=8,this.open=!1,this.arrow=!0,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.suppressed=!1,this.handleTriggerBlur=t=>{this.open&&this.hasTrigger("focus")&&(t.relatedTarget&&this.contains(t.relatedTarget)||this.hide())},this.handleTriggerClick=t=>{if(this.hasTrigger("click"))if(this.open&&"hover"!==this._triggeredBy){if(this._skipHideOnClick){this._skipHideOnClick=!1;return}if(t.composedPath().includes(this.body))return;this.hide()}else this.show("click")},this._skipHideOnClick=!1,this.handleTriggerMouseDown=()=>{this.hasTrigger("click")&&this.hasTrigger("focus")&&!this.matches(":focus-within")?this._skipHideOnClick=!0:this._skipHideOnClick=!1,this.open&&"hover"===this._triggeredBy&&(this.suppressed=!0,this.hide())},this.handleMouseUp=()=>{this.suppressed=!1},this.handleDragStart=()=>{this.suppressed=!0,this.hide()},this.handleDragEnd=()=>{this.suppressed=!1},this.handleTriggerFocus=()=>{this.hasTrigger("focus")&&(this.open&&"hover"!==this._triggeredBy&&!this.hasPopupFocus()?this.hide():this.show("focus"))},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handlePopupBlur=t=>{let i=t.composedPath();i.includes(this)||i.includes(this.body)||this.hide()},this.handleWebviewBlur=()=>{this.hide()},this.handleDocumentMouseDown=t=>{let i=t.composedPath();i.includes(this)||i.includes(this.body)||this.hide()},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){clearTimeout(this.hoverTimeout);let t=iP(getComputedStyle(this).getPropertyValue("--show-delay"));this.hoverTimeout=setTimeout(()=>this.show("hover"),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){if(clearTimeout(this.hoverTimeout),this.hasPopupFocus()||"hover"!==this._triggeredBy)return;let t=iP(getComputedStyle(this).getPropertyValue("--hide-delay"));this.hoverTimeout=setTimeout(()=>this.hide(),t)}}}static closeOthers(t){for(let i of a_.openPopovers)i===t||i.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINS||i.hide()}get currentPlacement(){return this.popup?.getAttribute("data-current-placement")??this.placement}connectedCallback(){super.connectedCallback?.(),this.addEventListener("blur",this.handleTriggerBlur,!0),this.addEventListener("focus",this.handleTriggerFocus,!0),this.addEventListener("click",this.handleTriggerClick),this.addEventListener("mousedown",this.handleTriggerMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("dragstart",this.handleDragStart,{capture:!0}),window.addEventListener("dragend",this.handleDragEnd,{capture:!0})}disconnectedCallback(){this.removeEventListener("blur",this.handleTriggerBlur,!0),this.removeEventListener("focus",this.handleTriggerFocus,!0),this.removeEventListener("click",this.handleTriggerClick),this.removeEventListener("mousedown",this.handleTriggerMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.closeWatcher?.destroy(),document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("dragstart",this.handleDragStart,{capture:!0}),window.removeEventListener("dragend",this.handleDragEnd,{capture:!0}),a_.openPopovers.delete(this),super.disconnectedCallback?.()}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}render(){return ts`<sl-popup
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
		</sl-popup>`}async show(t){if(this.open||this.suppressed){"click"===t&&"hover"===this._triggeredBy&&(this._triggeredBy=t);return}return(null==this._triggeredBy||"hover"!==t)&&(this._triggeredBy=t),a_.closeOthers(this),this.open=!0,a_.openPopovers.add(this),iT(this,"gl-popover-after-show")}async hide(){if(this._triggeredBy=void 0,this.open)return this.open=!1,a_.openPopovers.delete(this),iT(this,"gl-popover-after-hide")}hasPopupFocus(){return this.matches(':has([slot="content"]:focus-within)')}hasTrigger(t){return this.trigger.split(" ").includes(t)}handleOpenChange(){this.open?this.disabled||(this.emit("gl-popover-show"),"CloseWatcher"in window?(this.closeWatcher?.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>void this.hide()):document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("focusin",this.handlePopupBlur),window.addEventListener("webview-blur",this.handleWebviewBlur,!1),(this.hasTrigger("click")||this.hasTrigger("focus"))&&document.addEventListener("mousedown",this.handleDocumentMouseDown),this.body.hidden=!1,this.popup.active=!0,this.popup.reposition(),this.emit("gl-popover-after-show")):(document.removeEventListener("focusin",this.handlePopupBlur),window.removeEventListener("webview-blur",this.handleWebviewBlur,!1),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.emit("gl-popover-hide"),this.closeWatcher?.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.popup.active=!1,this.body.hidden=!0,this.emit("gl-popover-after-hide"))}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}};a_.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},a_.openPopovers=new Set,a_.styles=[rH,tO`
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
		`],aw([t3("#popover")],a_.prototype,"body",2),aw([t3("sl-popup")],a_.prototype,"popup",2),aw([t1({reflect:!0})],a_.prototype,"placement",2),aw([t1({type:Object})],a_.prototype,"anchor",2),aw([t1({reflect:!0,type:Boolean})],a_.prototype,"disabled",2),aw([t1({type:Number})],a_.prototype,"distance",2),aw([t1({reflect:!0,type:Boolean})],a_.prototype,"open",2),aw([t1({reflect:!0,type:Boolean})],a_.prototype,"arrow",2),aw([t1({type:Number})],a_.prototype,"skidding",2),aw([t1()],a_.prototype,"trigger",2),aw([t1({type:Boolean})],a_.prototype,"hoist",2),aw([t1({reflect:!0})],a_.prototype,"appearance",2),aw([t2()],a_.prototype,"suppressed",2),aw([t9("open",{afterFirstUpdate:!0})],a_.prototype,"handleOpenChange",1),aw([t9(["distance","hoist","placement","skidding"])],a_.prototype,"handleOptionsChange",1),aw([t9("disabled")],a_.prototype,"handleDisabledChange",1),a_=aw([tJ("gl-popover")],a_);let ak=tO`
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
`;var ax=Object.defineProperty,aC=Object.getOwnPropertyDescriptor,a$=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aC(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&ax(i,r,n),n};let aS=class extends lit_element_i{constructor(){super(...arguments),this.ahead=0,this.behind=0,this.working=0,this.alwaysShow=!1,this.outlined=!1,this.colorized=!1,this.missingUpstream=!1}render(){return 0===this.ahead&&0===this.behind&&0===this.working?this.alwaysShow?this.missingUpstream?ts`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
					<span class="state${this.colorized?" state--missing":""}"
						><code-icon icon="error"></code-icon></span
				></span>`:ts`<span part="base" class="pill${this.outlined?" pill--outlined":""}">
				<span class="state${this.colorized?" state--ahead":""}"><code-icon icon="check"></code-icon></span>
			</span>`:ta:ts`<span part="base" class="pill${this.outlined?" pill--outlined":""}"
			>${r$(this.behind>0,()=>ts`<span class="state${this.colorized?" state--behind":""}"
						>${this.behind}<code-icon icon="arrow-down"></code-icon
					></span>`)}${r$(this.ahead>0,()=>ts`<span class="state${this.colorized?" state--ahead":""}"
						>${this.ahead}<code-icon icon="arrow-up"></code-icon
					></span>`)}${r$(this.working>0,()=>ts`<span class="state${this.colorized?" state--working":""}"
						>${this.working}<span class="working">&#177;</span></span
					>`)}</span
		>`}};aS.styles=[ak,tO`
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
		`],a$([t1({type:Number})],aS.prototype,"ahead",2),a$([t1({type:Number})],aS.prototype,"behind",2),a$([t1({type:Number})],aS.prototype,"working",2),a$([t1({type:Boolean,attribute:"always-show"})],aS.prototype,"alwaysShow",2),a$([t1({type:Boolean})],aS.prototype,"outlined",2),a$([t1({type:Boolean})],aS.prototype,"colorized",2),a$([t1({type:Boolean})],aS.prototype,"missingUpstream",2),aS=a$([tJ("gl-tracking-pill")],aS);let aA={".":"Unchanged","!":"Ignored","?":"Untracked",A:"Added",D:"Deleted",M:"Modified",R:"Renamed",C:"Copied",AA:"Added (Both)",AU:"Added (Current)",UA:"Added (Incoming)",DD:"Deleted (Both)",DU:"Deleted (Current)",UD:"Deleted (Incoming)",UU:"Modified (Both)",T:"Modified",U:"Updated but Unmerged"};var aP=Object.defineProperty,aT=Object.getOwnPropertyDescriptor,aI=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aT(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aP(i,r,n),n};let aE=class extends lit_element_i{get statusName(){return this.status?aA[this.status]??"Unknown":""}updated(t){super.updated(t),t.has("status")&&(this.statusName?this.setAttribute("title",this.statusName):this.removeAttribute("title"),this.status?.length===2?this.setAttribute("conflict",""):this.removeAttribute("conflict"))}renderIgnored(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#969696"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 4l-6.01 6.01 1.06 1.061 6.01-6.01L10 4z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderUntracked(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3.942-3.942l7.5-7.5.884.884-.664.664c.95.655 1.65 1.524 2.222 2.394-1.15 1.75-2.824 3.5-6 3.5-.696 0-1.32-.084-1.882-.234l-1.176 1.176-.884-.884zm5.188-3.42l1.629-1.629c.634.393 1.147.913 1.594 1.491C10.99 8.767 9.692 9.75 7.5 9.75c-.287 0-.56-.017-.817-.05l.455-.454a1.5 1.5 0 0 0 1.608-1.608zM7.362 6.254L5.754 7.862a1.5 1.5 0 0 1 1.608-1.608zm.955-.955A6.595 6.595 0 0 0 7.5 5.25c-2.192 0-3.49.982-4.469 2.25.447.578.96 1.098 1.594 1.491l-.903.903C2.772 9.239 2.072 8.369 1.5 7.5 2.65 5.75 4.324 4 7.5 4c.696 0 1.32.084 1.882.234L8.317 5.299z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderAdded(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#388A34"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm.75-6.75h3v-1.5h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderDeleted(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#9E121D"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-6.75v-1.5h-7.5v1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderModified(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#1B80B2"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.75-9.5V7h-3v2.5h-1.5V7h-3V5.5h3v-3h1.5v3h3zm0 5V12h-7.5v-1.5h7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderRenamed(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#C63"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.25 4.5v1.25h1.25l1 1v2.5l-1 1H9.25v1.25H10v1.25H7V11.5h.75v-1.25H4l-1-1v-2.5l1-1h3.75V4.5H7V3.25h3V4.5h-.75zm-5 2.5h3.5v2h-3.5V7zm5 0v2h1V7h-1z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderCopied(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#692C77"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM6.964 3.75L5.893 4.813v.53h1.071v-.53h3.215v4.25h-.536v1.062h.536l1.071-1.063v-4.25L10.179 3.75H6.964zM3.75 6.938l1.071-1.063h3.215l1.071 1.063v4.25L8.036 12.25H4.82L3.75 11.187v-4.25zm1.071 0v4.25h3.215v-4.25H4.82z"
					clip-rule="evenodd"
				/>
			</svg>
		`}renderConflictGlyphs(t,i,r,s,o,n){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 22 16">
				<path d="M3 0H10V16H3C1.35 16 0 14.65 0 13V3C0 1.35 1.35 0 3 0Z" fill="${t}" />
				<path d="M12 0H19C20.65 0 22 1.35 22 3V13C22 14.65 20.65 16 19 16H12V0Z" fill="${s}" />
				<text
					x="5"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${r}"
				>
					${i}
				</text>
				<text
					x="17"
					y="7"
					dominant-baseline="central"
					text-anchor="middle"
					font-size="12"
					font-weight="700"
					fill="${n}"
				>
					${o}
				</text>
			</svg>
		`}renderConflictUU(){let t="var(--gl-git-status-conflict-modified, #c4a000)";return this.renderConflictGlyphs(t,"±","#000",t,"±","#000")}renderConflictAA(){let t="var(--gl-git-status-added)";return this.renderConflictGlyphs(t,"+","#fff",t,"+","#fff")}renderConflictDD(){let t="var(--gl-git-status-deleted)";return this.renderConflictGlyphs(t,"−","#fff",t,"−","#fff")}renderConflictDU(){return this.renderConflictGlyphs("var(--gl-git-status-deleted)","−","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUD(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-deleted)","−","#fff")}renderConflictAU(){return this.renderConflictGlyphs("var(--gl-git-status-added)","+","#fff","var(--gl-git-status-conflict-modified, #c4a000)","±","#000")}renderConflictUA(){return this.renderConflictGlyphs("var(--gl-git-status-conflict-modified, #c4a000)","±","#000","var(--gl-git-status-added)","+","#fff")}renderUnknown(){return ts`
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
				<path
					fill="#6C6C6C"
					fill-rule="evenodd"
					d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM9.19 2.822c-.439-.215-.97-.322-1.596-.322-1.25 0-2.282.478-3.094 1.435l1.05.798c.275-.331.579-.574.91-.728.331-.154.66-.231.987-.231.415 0 .76.093 1.036.28.275.182.413.448.413.798 0 .275-.082.509-.245.7-.159.187-.36.364-.602.532a9.506 9.506 0 0 0-.728.56 2.66 2.66 0 0 0-.602.763c-.159.299-.238.679-.238 1.141v.483h1.498v-.413c0-.364.086-.663.259-.896a2.76 2.76 0 0 1 .637-.616c.252-.177.504-.362.756-.553.257-.196.471-.436.644-.721.173-.285.259-.651.259-1.099 0-.387-.114-.749-.343-1.085-.229-.34-.562-.616-1.001-.826zm-1.169 7.917a1.024 1.024 0 0 0-.763-.315c-.294 0-.544.105-.749.315-.2.205-.301.453-.301.742 0 .294.1.546.301.756.205.205.455.308.749.308.303 0 .558-.103.763-.308.205-.21.308-.462.308-.756 0-.29-.103-.537-.308-.742z"
					clip-rule="evenodd"
				/>
			</svg>
		`}render(){switch(this.status){case"!":return this.renderIgnored();case"?":return this.renderUntracked();case"A":return this.renderAdded();case"D":return this.renderDeleted();case"M":case"T":case"U":return this.renderModified();case"R":return this.renderRenamed();case"C":return this.renderCopied();case"AA":return this.renderConflictAA();case"AU":return this.renderConflictAU();case"UA":return this.renderConflictUA();case"DD":return this.renderConflictDD();case"DU":return this.renderConflictDU();case"UD":return this.renderConflictUD();case"UU":return this.renderConflictUU()}return this.renderUnknown()}};aE.styles=[tO`
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
		`],aI([t1()],aE.prototype,"status",2),aI([t2()],aE.prototype,"statusName",1),aE=aI([tJ("gl-git-status")],aE);var az=Object.defineProperty,aR=Object.getOwnPropertyDescriptor,aM=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aR(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&az(i,r,n),n};let aL=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.full=!1,this.tooltipPlacement="bottom",this.truncate=!1}connectedCallback(){super.connectedCallback?.(),this.setAttribute("role",this.href?"link":"button"),this.disabled&&this.setAttribute("aria-disabled",this.disabled.toString())}willUpdate(t){if(t.has("href")&&this.setAttribute("role",this.href?"link":"button"),t.has("disabled")){let i=t.get("disabled");i?this.setAttribute("aria-disabled",i.toString()):this.removeAttribute("aria-disabled")}super.willUpdate(t)}render(){return this.tooltip?ts`<gl-tooltip .content=${this.tooltip} placement=${this.tooltipPlacement??ta}
				>${this.renderControl()}</gl-tooltip
			>`:this.querySelectorAll('[slot="tooltip"]').length>0?ts`<gl-tooltip placement=${this.tooltipPlacement??ta}>
				${this.renderControl()}
				<slot name="tooltip" slot="content"></slot>
			</gl-tooltip>`:this.renderControl()}renderControl(){return null!=this.href?ts`<a
				class="control"
				tabindex="${(!1===this.disabled?void 0:-1)??ta}"
				href=${this.href}
				@keypress=${t=>this.onLinkKeypress(t)}
				><slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot
			></a>`:ts`<button
			class="control"
			role=${this.role??ta}
			aria-checked=${this.ariaChecked??ta}
			?disabled=${this.disabled}
		>
			<slot name="prefix"></slot><slot class="label"></slot><slot name="suffix"></slot>
		</button>`}onLinkKeypress(t){" "===t.key&&this.control.click()}focus(t){this.control.focus(t)}blur(){this.control.blur()}click(){this.control.click()}};aL.shadowRootOptions={...lit_element_i.shadowRootOptions,delegatesFocus:!0},aL.styles=[rV,tO`
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
				${rj}
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
		`],aM([t3(".control")],aL.prototype,"control",2),aM([t1({reflect:!0})],aL.prototype,"appearance",2),aM([t1({reflect:!0})],aL.prototype,"variant",2),aM([t1({type:Boolean,reflect:!0})],aL.prototype,"disabled",2),aM([t1({reflect:!0})],aL.prototype,"density",2),aM([t1({type:Boolean,reflect:!0})],aL.prototype,"full",2),aM([t1()],aL.prototype,"href",2),aM([t1()],aL.prototype,"tooltip",2),aM([t1()],aL.prototype,"tooltipPlacement",2),aM([t1({type:Boolean,reflect:!0})],aL.prototype,"truncate",2),aL=aM([tJ("gl-button")],aL),tO`
		:host {
			display: block;
			height: 100%;
		}
	`;let aO=[rV,tO`
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
	`];var aD=Object.defineProperty,aB=Object.getOwnPropertyDescriptor,aN=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aB(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aD(i,r,n),n};let aU=class extends lit_element_i{firstUpdated(){this.role="navigation"}disconnectedCallback(){this._slotSubscriptionsDisposer?.(),super.disconnectedCallback?.()}render(){return ts`<slot @slotchange=${this.handleSlotChange}></slot>`}handleSlotChange(t){if(this._slotSubscriptionsDisposer?.(),this.actionNodes.length<1)return;let i=this.handleKeydown.bind(this),r=`${this.actionNodes.length}`,s=this.actionNodes.map((t,s)=>(t.setAttribute("aria-posinset",`${s+1}`),t.setAttribute("aria-setsize",r),t.setAttribute("tabindex",0===s?"0":"-1"),this.actionNodes.length>=2&&t.addEventListener("keydown",i,!1),{dispose:()=>{t?.removeEventListener("keydown",i,!1)}}));this._slotSubscriptionsDisposer=()=>{s?.forEach(({dispose:t})=>t())}}handleKeydown(t){if(!t.target||null==this.actionNodes)return;let i=t.target,r=parseInt(i.getAttribute("aria-posinset")??"0",10);if("ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.actionNodes.length<2)return;let s=null;if("ArrowLeft"===t.key){let t=1===r?this.actionNodes.length-1:r-2;s=this.actionNodes[t]}else if("ArrowRight"===t.key){let t=r===this.actionNodes.length?0:r;s=this.actionNodes[t]}null!=s&&s!==i&&(t.preventDefault(),t.stopPropagation(),i.setAttribute("tabindex","-1"),s.setAttribute("tabindex","0"),s.focus())}};aU.styles=tO`
		:host {
			display: flex;
			align-items: center;
			user-select: none;
		}
	`,aN([(p={flatten:!0},(t,i)=>{let{slot:r,selector:s}=p??{},o="slot"+(r?`[name=${r}]`:":not([name])");return t5(t,i,{get(){let t=this.renderRoot?.querySelector(o),i=t?.assignedElements(p)??[];return void 0===s?i:i.filter(t=>t.matches(s))}})})],aU.prototype,"actionNodes",2),aU=aN([tJ("action-nav")],aU);var aF=Object.defineProperty,aj=Object.getOwnPropertyDescriptor,aV=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aj(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aF(i,r,n),n};let aH=class extends GlElement{constructor(){super(...arguments),this.branch=!1,this.expanded=!0,this.path="",this.level=0,this.size=1,this.position=1,this.checkable=!1,this.checked=!1,this.disableCheck=!1,this.showIcon=!0,this.matched=!1,this.tabIndex=-1,this.selected=!1,this.focused=!1,this.focusedInactive=!1,this.onComponentClick=t=>{this.selectCore({dblClick:!1,altKey:t.altKey})}}get isHidden(){return!1===this.parentExpanded||!this.branch&&!this.expanded}connectedCallback(){super.connectedCallback?.(),this.addEventListener("click",this.onComponentClick)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("click",this.onComponentClick)}updateAttrs(t,i=!1){(t.has("expanded")||t.has("branch")||i)&&(this.branch?this.setAttribute("aria-expanded",this.expanded.toString()):this.removeAttribute("aria-expanded")),(t.has("parentExpanded")||i)&&this.setAttribute("aria-hidden",this.isHidden.toString()),(t.has("selected")||i)&&this.setAttribute("aria-selected",this.selected.toString()),(t.has("size")||i)&&this.setAttribute("aria-setsize",this.size.toString()),(t.has("position")||i)&&this.setAttribute("aria-posinset",this.position.toString()),(t.has("level")||i)&&this.setAttribute("aria-level",this.level.toString())}firstUpdated(){this.role="treeitem"}updated(t){this.updateAttrs(t)}renderBranching(){let t=this.level-1;if(t<1&&!this.branch)return ta;let i=[];if(t>0)for(let r=0;r<t;r++)i.push(ts`<span class="node node--connector"><code-icon name="blank"></code-icon></span>`);return this.branch&&i.push(ts`<code-icon class="branch" icon="${this.expanded?"chevron-down":"chevron-right"}"></code-icon>`),i}renderCheckbox(){return this.checkable?ts`<span class="checkbox"
			><input
				class="checkbox__input"
				id="checkbox"
				type="checkbox"
				.checked=${this.checked}
				?disabled=${this.disableCheck}
				@change=${this.onCheckboxChange}
				@click=${this.onCheckboxClick} /><code-icon icon="check" size="14" class="checkbox__check"></code-icon
		></span>`:ta}renderActions(){return ts`<action-nav class="actions"><slot name="actions"></slot></action-nav>`}renderBefore(){return ts`<slot name="decorations-before" class="decorations-before"></slot>`}renderAfter(){return ts`<slot name="decorations-after" class="decorations-after"></slot>`}render(){return ts`
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
				${r$(this.showIcon,()=>ts`<slot name="icon" class="icon"></slot>`)}
				<span class="text">
					<slot class="main"></slot>
					<slot name="description" class="description"></slot>
				</span>
			</button>
			${this.renderBefore()}${this.renderActions()}${this.renderAfter()}
		`}selectCore(t,i=!1){this.emit("gl-tree-item-select"),this.selected=!0,i||window.requestAnimationFrame(()=>{this.emit("gl-tree-item-selected",{node:this,dblClick:t?.dblClick??!1,altKey:t?.altKey??!1,ctrlKey:t?.ctrlKey??!1,metaKey:t?.metaKey??!1})})}select(){this.selectCore(void 0,!0)}deselect(){this.selected=!1}focus(){this.buttonEl.focus()}onButtonClick(t){t.stopPropagation(),this.selectCore({dblClick:!1,altKey:t.altKey})}onButtonDblClick(t){t.stopPropagation(),this.selectCore({dblClick:!0,altKey:t.altKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey})}onButtonContextMenu(t){t.preventDefault(),t.stopPropagation();let i=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY,button:t.button,buttons:t.buttons,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey});this.dispatchEvent(i)}onCheckboxClick(t){t.stopPropagation()}onCheckboxChange(t){t.preventDefault(),t.stopPropagation(),this.checked=t.target.checked,this.emit("gl-tree-item-checked",{node:this,checked:this.checked})}};aH.styles=aO,aV([t1({type:Boolean})],aH.prototype,"branch",2),aV([t1({type:Boolean})],aH.prototype,"expanded",2),aV([t1({type:String})],aH.prototype,"path",2),aV([t1({type:String,attribute:"parent-path"})],aH.prototype,"parentPath",2),aV([t1({type:Boolean,attribute:"parent-expanded"})],aH.prototype,"parentExpanded",2),aV([t1({type:Number})],aH.prototype,"level",2),aV([t1({type:Number})],aH.prototype,"size",2),aV([t1({type:Number})],aH.prototype,"position",2),aV([t1({type:Boolean})],aH.prototype,"checkable",2),aV([t1({type:Boolean})],aH.prototype,"checked",2),aV([t1({type:Boolean})],aH.prototype,"disableCheck",2),aV([t1({type:Boolean})],aH.prototype,"showIcon",2),aV([t1({type:Boolean,reflect:!0})],aH.prototype,"matched",2),aV([t1({type:Number})],aH.prototype,"tabIndex",2),aV([t1({type:String,attribute:"vscode-context"})],aH.prototype,"vscodeContext",2),aV([t2()],aH.prototype,"selected",2),aV([t1({type:Boolean,reflect:!0})],aH.prototype,"focused",2),aV([t1({type:Boolean,reflect:!0,attribute:"focused-inactive"})],aH.prototype,"focusedInactive",2),aV([t3("#button")],aH.prototype,"buttonEl",2),aH=aV([tJ("gl-tree-item")],aH);var aq=Object.defineProperty,aW=Object.getOwnPropertyDescriptor,aG=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?aW(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aq(i,r,n),n};let aK=/^[a-zA-Z0-9\s\-_.]$/,aZ=class extends GlElement{constructor(){super(...arguments),this.treeItems=void 0,this._virtualizerKey=0,this.filtered=!1,this.filterable=!1,this.filterPlaceholder="Filter...",this.filterMode="filter",this.tooltipAnchorRight=!1,this._filterText="",this._filterLower="",this._filterTerms=[],this.ariaLabel="Tree",this._focusedItemIndex=-1,this.virtualizerRef=rM(),this.scrollableRef=rM(),this._containerHasFocus=!1,this._actionButtonHasFocus=!1,this._scrolling=!1,this._hoverOpen=!1,this._typeAheadBuffer="",this._typeAheadTimeout=800,this._nodeMap=new Map,this._pathToIndexMap=new Map,this.handleContainerFocus=()=>{this._containerHasFocus=!0,this._focusedItemPath||(this._lastSelectedPath?(this._focusedItemPath=this._lastSelectedPath,this._focusedItemIndex=this.getItemIndex(this._lastSelectedPath)):this.treeItems?.length&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0),this.requestUpdate())},this.handleContainerBlur=()=>{this._containerHasFocus=!1},this.handleFocusIn=t=>{let i=t.target;("ACTION-ITEM"===i.tagName?i:i.closest("action-item"))&&(this._actionButtonHasFocus=!0)},this.handleFocusOut=t=>{let i=t.target,r=t.relatedTarget,s="ACTION-ITEM"===i.tagName?i:i.closest("action-item"),o=r?.tagName==="ACTION-ITEM"?r:r?.closest("action-item");s&&!o&&(this._actionButtonHasFocus=!1)},this.handleContextMenu=t=>{let i=t.composedPath().find(t=>"GL-TREE-ITEM"===t.tagName);if(!i)return;let r=i.vscodeContext;if(!r)return;t.preventDefault(),t.stopPropagation(),this.dataset.vscodeContext=r;let s=new MouseEvent("contextmenu",{bubbles:!0,composed:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY,button:t.button,buttons:t.buttons,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey,metaKey:t.metaKey});this.dispatchEvent(s),setTimeout(()=>{delete this.dataset.vscodeContext},100)},this.handleKeydown=t=>{if("Tab"===t.key&&t.composedPath().find(t=>"ACTION-ITEM"===t.tagName))if(t.shiftKey){t.preventDefault();let i=this.scrollableRef.value;i&&i.focus()}else{t.preventDefault();let i=document.activeElement;setTimeout(()=>{i&&"function"==typeof i.blur&&i.blur()},0)}},this.handleContainerKeydown=t=>{if(!this.treeItems?.length||this._actionButtonHasFocus)return;if("Tab"===t.key&&!t.shiftKey){if(this._focusedItemPath){let i=this.virtualizerRef.value;if(i){let r=[...i.querySelectorAll("gl-tree-item")].find(t=>t.id===`tree-item-${this._focusedItemPath}`);if(r){let i=r.querySelector("action-item");i&&(t.preventDefault(),t.stopPropagation(),i.focus())}}}return}let i=this.getCurrentFocusedIndex(),r=i,s=!1;switch(t.key){case"Enter":case" ":t.preventDefault(),t.stopPropagation(),this.handleItemActivation(this.treeItems[i]);return;case"ArrowDown":r=Math.min(i+1,this.treeItems.length-1),s=!0;break;case"ArrowUp":r=Math.max(i-1,0),s=!0;break;case"Home":r=0,s=!0;break;case"End":r=this.treeItems.length-1,s=!0;break;case"ArrowLeft":case"ArrowRight":if(this.handleBranchToggle(t,this.treeItems[i]))return;if("ArrowRight"===t.key)r=Math.min(i+1,this.treeItems.length-1);else{let t=this.treeItems[i];if(t.parentPath){let s=this.getItemIndex(t.parentPath);r=-1!==s?s:Math.max(i-1,0)}else r=Math.max(i-1,0)}s=!0;break;default:if(this.isPrintableCharacter(t.key)){t.preventDefault(),t.stopPropagation(),this.handleTypeAhead(t.key);return}}s&&(t.preventDefault(),t.stopPropagation(),this.focusItemAtIndex(r))},this.handleFilterInput=t=>{this._filterText=t.target.value,this.dispatchEvent(new CustomEvent("gl-tree-filter-changed",{detail:this._filterText,bubbles:!0,composed:!0})),clearTimeout(this._filterDebounceTimer),this._filterDebounceTimer=setTimeout(()=>this.applyFilterToModel(),150)},this.toggleFilterMode=()=>{this.filterMode="filter"===this.filterMode?"highlight":"filter",this.dispatchEvent(new CustomEvent("gl-tree-filter-mode-changed",{detail:this.filterMode,bubbles:!0,composed:!0})),this.filtered&&this.rebuildFlattenedTree()}}get filterText(){return this._filterText}set filterText(t){let i=this._filterText;i!==t&&(this._filterText=t,clearTimeout(this._filterDebounceTimer),this.applyFilterToModel(),this.requestUpdate("filterText",i))}connectedCallback(){super.connectedCallback?.(),this.addEventListener("keydown",this.handleKeydown,{capture:!0}),this.addEventListener("focusin",this.handleFocusIn,{capture:!0}),this.addEventListener("focusout",this.handleFocusOut,{capture:!0}),this.addEventListener("contextmenu",this.handleContextMenu)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("keydown",this.handleKeydown,{capture:!0}),this.removeEventListener("focusin",this.handleFocusIn,{capture:!0}),this.removeEventListener("focusout",this.handleFocusOut,{capture:!0}),this.removeEventListener("contextmenu",this.handleContextMenu),this._typeAheadTimer&&(clearTimeout(this._typeAheadTimer),this._typeAheadTimer=void 0),clearTimeout(this._filterDebounceTimer),this._typeAheadBuffer=""}set model(t){let i;if(this._model!==t){if(this._model=t,this._filterTerms.length>0&&null!=this._model&&aQ(this._model,this._filterTerms),this._nodeMap.clear(),this._virtualizerKey++,null!=this._model){let t=this._model.length,r=this.filtered&&"filter"===this.filterMode;i=[];for(let s=0;s<t;s++)aX(this._model[s],t,s+1,void 0,this._nodeMap,r,i)}this.treeItems=i,this.buildPathToIndexMap(),this.treeItems?.length&&!this._focusedItemPath&&(this._focusedItemPath=this.treeItems[0].path,this._focusedItemIndex=0)}}get model(){return this._model}renderIcon(t){return null==t?ta:"string"==typeof t?ts`<code-icon slot="icon" icon=${t}></code-icon>`:"status"===t.type?ts`<gl-git-status slot="icon" .status=${t.name}></gl-git-status>`:"branch"===t.type?ts`<gl-branch-icon
				slot="icon"
				.status=${t.status}
				.worktree=${t.worktree??!1}
				.hasChanges=${t.hasChanges??!1}
			></gl-branch-icon>`:ta}renderActions(t){let i=t.actions;return null==i||0===i.length?ta:i.map(i=>ts`<action-item
				slot="actions"
				.icon=${i.icon}
				.label=${i.label}
				.altIcon=${i.altIcon}
				.altLabel=${i.altLabel}
				@mouseenter=${()=>this.onSuspendRowTooltip()}
				@mouseleave=${()=>this.onResumeRowTooltip()}
				@click=${r=>this.onTreeItemActionClicked(r,t,i,!1)}
				@dblclick=${r=>this.onTreeItemActionClicked(r,t,i,!0)}
			></action-item>`)}renderDecorations(t){let i=t.decorations;return null==i||0===i.length?ta:i.map(t=>{let i="before"===t.position?"decorations-before":"decorations-after";return"icon"===t.type?ts`<code-icon
					slot=${i}
					part=${i}
					aria-label="${t.label}"
					.icon=${t.icon}
				></code-icon>`:"text"===t.type?ts`<span
					slot=${i}
					part=${i}
					class="decoration-text"
					aria-label=${t.tooltip??t.label??ta}
					style=${t.color?rN({color:t.color}):ta}
					>${t.label}</span
				>`:"tracking"===t.type?ts`<gl-tracking-pill
					slot=${i}
					part=${i}
					.ahead=${t.ahead}
					.behind=${t.behind}
					colorized
					outlined
					?missingUpstream=${t.missingUpstream??!1}
				></gl-tracking-pill>`:"conflict"===t.type?ts`<span
					slot=${i}
					part=${i}
					class="conflict-count"
					aria-label=${t.tooltip??t.label??ta}
					style=${t.color?rN({color:t.color,"border-color":`color-mix(in srgb, transparent 60%, ${t.color})`}):ta}
					><code-icon icon="warning" size="12"></code-icon>${t.count}</span
				>`:void 0})}highlightText(t){if(!this.filtered||0===this._filterTerms.length)return t;let i=t.toLowerCase(),r=new Set;for(let t of this._filterTerms){let s=i.indexOf(t);if(-1!==s){for(let i=s;i<s+t.length;i++)r.add(i);continue}let o=aY(i,t);if(null!=o)for(let t of o)r.add(t)}return 0===r.size?t:function(t,i){let r=[],s=0,o=0;for(;o<i.length;){let n=o;for(;n+1<i.length&&i[n+1]===i[n]+1;)n++;let a=i[o],c=i[n]+1;a>s&&r.push(t.substring(s,a)),r.push(ts`<mark>${t.substring(a,c)}</mark>`),s=c,o=n+1}return s<t.length&&r.push(t.substring(s)),r}(t,[...r].sort((t,i)=>t-i))}renderTreeItem(t){let i=this._lastSelectedPath===t.path,r=this._focusedItemPath===t.path,s=`tree-item-${t.path}`;return ts`<gl-tree-item
			id=${s}
			.branch=${t.branch}
			.expanded=${t.expanded}
			.path=${t.path}
			.parentPath=${t.parentPath}
			.parentExpanded=${t.parentExpanded}
			.level=${t.level}
			.size=${t.size}
			.position=${t.position}
			.checkable=${t.checkable}
			.checked=${t.checked??!1}
			.disableCheck=${t.disableCheck??!1}
			.showIcon=${null!=t.icon}
			.matched=${t.matched??!1}
			.selected=${i}
			.focused=${r&&this._containerHasFocus&&!this._actionButtonHasFocus}
			.focusedInactive=${r&&(!this._containerHasFocus||this._actionButtonHasFocus)}
			.tabIndex=${-1}
			.vscodeContext=${t.contextData}
			@gl-tree-item-select=${()=>this.onBeforeTreeItemSelected(t)}
			@gl-tree-item-selected=${i=>this.onTreeItemSelected(i,t)}
			@gl-tree-item-checked=${i=>this.onTreeItemChecked(i,t)}
			@mouseenter=${i=>this.onTreeItemHover(i.currentTarget,t)}
			@mouseleave=${()=>this.onTreeItemUnhover()}
		>
			${this.renderIcon(t.icon)}
			${this.highlightText(t.label)}${r$(null!=t.description,()=>ts`<span slot="description">${this.highlightText(t.description)}</span>`)}
			${this.renderActions(t)} ${this.renderDecorations(t)}
		</gl-tree-item>`}renderFilterBar(){return this.filterable?ts`<div class="filter">
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
		</div>`:ta}render(){let t=!!this.treeItems?.length,i=!t&&this._filterText&&this._model?.length;if(!t&&!i)return ta;let r=this._focusedItemPath?`tree-item-${this._focusedItemPath}`:void 0;return ts`
			${this.renderFilterBar()}
			${i?ts`<div class="no-results">No results found</div>`:ts`<div
							${rO(this.scrollableRef)}
							class="scrollable"
							tabindex="0"
							role="tree"
							aria-label=${this.ariaLabel}
							aria-multiselectable="false"
							aria-activedescendant=${r||ta}
							@keydown=${this.handleContainerKeydown}
							@focus=${this.handleContainerFocus}
							@blur=${this.handleContainerBlur}
						>
							${rR(this._virtualizerKey,ts`<lit-virtualizer
									class="scrollable"
									${rO(this.virtualizerRef)}
									.items=${this.treeItems}
									.keyFunction=${t=>t.path}
									.layout=${(0,rz.flow)({direction:"vertical"})}
									.renderItem=${t=>this.renderTreeItem(t)}
									scroller
								></lit-virtualizer>`)}
						</div>
						${this._hoverOpen&&this._hoveredTooltip?ts`<gl-popover
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
								</gl-popover>`:ta}`}
		`}findTreeNode(t){return this._nodeMap.get(t)}getItemIndex(t){return this._pathToIndexMap.get(t)??-1}rebuildFlattenedTree(){if(!this._model)return;this._nodeMap.clear();let t=this.filtered&&"filter"===this.filterMode,i=this._model.length,r=[];for(let s=0;s<i;s++)aX(this._model[s],i,s+1,void 0,this._nodeMap,t,r);this.treeItems=r,this.buildPathToIndexMap()}onBeforeTreeItemSelected(t){if(this._lastSelectedPath!==t.path&&(this._lastSelectedPath=t.path),this._focusedItemPath!==t.path&&(this._focusedItemPath=t.path,this._focusedItemIndex=this.getItemIndex(t.path)),t.branch){let i=this.findTreeNode(t.path);i&&(i.expanded=!i.expanded,this.rebuildFlattenedTree())}this.requestUpdate()}onTreeItemSelected(t,i){t.stopPropagation(),this.emit("gl-tree-generated-item-selected",{...t.detail,node:i,context:i.context})}onTreeItemChecked(t,i){t.stopPropagation(),this.emit("gl-tree-generated-item-checked",{...t.detail,node:i,context:i.context})}onTreeItemHover(t,i){if(!i.tooltip)return void this.onTreeItemUnhover();if(clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this.tooltipAnchorRight){let i=this.getBoundingClientRect(),r=t.getBoundingClientRect();this._hoveredAnchor={getBoundingClientRect:()=>({x:i.right,y:r.top,top:r.top,bottom:r.bottom,left:i.right,right:i.right,width:0,height:r.height})}}else this._hoveredAnchor=t;this._hoveredTooltip=i.tooltip,this._hoverOpen||(this._hoverTimer=setTimeout(()=>{this._hoverOpen=!0},500))}onTreeItemUnhover(){clearTimeout(this._hoverTimer),this._unhoverTimer=setTimeout(()=>{this._hoverOpen=!1,this._hoveredTooltip=void 0,this._hoveredAnchor=void 0},100)}onSuspendRowTooltip(){clearTimeout(this._hoverTimer),clearTimeout(this._unhoverTimer),this._hoverOpen=!1}onResumeRowTooltip(){null!=this._hoveredTooltip&&null!=this._hoveredAnchor&&(this._hoverOpen=!0)}onTreeItemActionClicked(t,i,r,s=!1){t.stopPropagation(),this.emit("gl-tree-generated-item-action-clicked",{node:i,context:i.context,action:r,dblClick:s,altKey:t.altKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey})}getCurrentFocusedIndex(){if(!this.treeItems?.length)return -1;if(this._focusedItemPath){let t=this.getItemIndex(this._focusedItemPath);if(-1!==t)return t}if(this._focusedItemIndex>=0&&this._focusedItemIndex<this.treeItems.length)return this._focusedItemIndex;if(this._lastSelectedPath){let t=this.getItemIndex(this._lastSelectedPath);if(-1!==t)return t}return 0}handleItemActivation(t){t&&(this.onBeforeTreeItemSelected(t),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),t))}handleBranchToggle(t,i){if(!i?.branch)return!1;let r="ArrowRight"===t.key,s="ArrowLeft"===t.key;if(r&&i.expanded||s&&!i.expanded)return!1;t.preventDefault(),t.stopPropagation();let o=this.findTreeNode(i.path);return!!o&&(o.expanded=!o.expanded,this.rebuildFlattenedTree(),this.requestUpdate(),this.onTreeItemSelected(new CustomEvent("gl-tree-item-selected",{detail:{node:null,dblClick:!1,altKey:!1,ctrlKey:!1,metaKey:!1}}),i),!0)}focusItemAtIndex(t){let i=this.treeItems?.[t];i&&(this._focusedItemPath=i.path,this._focusedItemIndex=t,this._lastSelectedPath!==i.path&&(this._lastSelectedPath=i.path),this.requestUpdate(),this.scrollToItem(t))}scrollToItem(t){this._scrolling||(this._scrolling=!0,this.updateComplete.then(()=>{let i=this.virtualizerRef.value,r=this.scrollableRef.value;if(!i||!r){this._scrolling=!1;return}let s=()=>{r&&document.activeElement!==r&&r.focus(),this._scrolling=!1},o=0===t,n=t===(this.treeItems?.length??0)-1;o||n?requestAnimationFrame(()=>{o?r.scrollTop=0:r.scrollTop=r.scrollHeight,requestAnimationFrame(s)}):requestAnimationFrame(()=>{let r=i.scrollToIndex(t,"nearest");r&&"function"==typeof r.then?r.then(s):requestAnimationFrame(s)})}))}handleTypeAhead(t){this._typeAheadTimer&&clearTimeout(this._typeAheadTimer);let i=!this._typeAheadBuffer;this._typeAheadBuffer+=t.toLowerCase();let r=this.treeItems?.[this._focusedItemIndex],s=r?.label?.toLowerCase().startsWith(this._typeAheadBuffer),o=!1;if(i?o=!0:s||(o=!0),o){let t=this.findNextMatchingItem(this._typeAheadBuffer);-1!==t&&this.focusItemAtIndex(t)}this._typeAheadTimer=window.setTimeout(()=>{this._typeAheadBuffer="",this._typeAheadTimer=void 0},this._typeAheadTimeout)}buildPathToIndexMap(){if(this._pathToIndexMap.clear(),!this.treeItems)return;let t=0;for(let i of this.treeItems)this._pathToIndexMap.set(i.path,t++)}findNextMatchingItem(t){if(!this.treeItems?.length||!t)return -1;let i=t.toLowerCase(),r=this._focusedItemIndex,s=this.treeItems.length;for(let t=1;t<s;t++){let o=(r+t)%s;if(this.treeItems[o].label?.toLowerCase().startsWith(i))return o}return -1}isPrintableCharacter(t){return 1===t.length&&aK.test(t)}applyFilterToModel(){this._filterLower=this._filterText.toLowerCase().trim(),this._filterTerms=this._filterLower.split(/\s+/).filter(t=>t.length>0),0===this._filterTerms.length?(this.filtered=!1,null!=this._model&&function t(i){for(let r of i)r.matched=!1,null!=r.children&&t(r.children)}(this._model)):(this.filtered=!0,null!=this._model&&aQ(this._model,this._filterTerms)),this.rebuildFlattenedTree()}};function aX(t,i,r,s,o,n,a){if(n&&!1===t.matched)return a??[];let c=a??[];if(o?.set(t.path,t),c.push({...t,size:i,position:r,parentPath:s}),!1!==t.expanded&&null!=t.children&&t.children.length>0){let i=t.children.length;for(let r=0;r<i;r++)aX(t.children[r],i,r+1,t.path,o,n,c)}return c}function aQ(t,i){let r=!1;for(let s of t){let t=(s.label??"").toLowerCase(),o=s.filterText?.toLowerCase(),n=s.description?.toLowerCase(),a=i.every(i=>o?.includes(i)||t.includes(i)||null!=aY(t,i)||n?.includes(i)),c=!1;null!=s.children&&s.children.length>0&&(c=aQ(s.children,i)),s.matched=a||c,s.matched&&(r=!0),s.branch&&c&&(s.expanded=!0)}return r}function aY(t,i){let r=[],s=0;for(let o=0;o<t.length&&s<i.length;o++)t[o]===i[s]&&(r.push(o),s++);return s===i.length?r:void 0}aZ.styles=[rH,tO`
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
		`],aG([t2()],aZ.prototype,"treeItems",2),aG([t2()],aZ.prototype,"_virtualizerKey",2),aG([t1({reflect:!0})],aZ.prototype,"guides",2),aG([t1({type:Boolean,reflect:!0})],aZ.prototype,"filtered",2),aG([t1({type:Boolean,reflect:!0})],aZ.prototype,"filterable",2),aG([t1({type:String,attribute:"filter-placeholder"})],aZ.prototype,"filterPlaceholder",2),aG([t1({type:String,attribute:"filter-mode",reflect:!0})],aZ.prototype,"filterMode",2),aG([t1({type:Boolean,attribute:"tooltip-anchor-right"})],aZ.prototype,"tooltipAnchorRight",2),aG([t1({type:String,attribute:"filter-text"})],aZ.prototype,"filterText",1),aG([t1({type:String,attribute:"aria-label"})],aZ.prototype,"ariaLabel",2),aG([t2()],aZ.prototype,"_containerHasFocus",2),aG([t2()],aZ.prototype,"_actionButtonHasFocus",2),aG([t2()],aZ.prototype,"_hoveredTooltip",2),aG([t2()],aZ.prototype,"_hoveredAnchor",2),aG([t2()],aZ.prototype,"_hoverOpen",2),aG([t1({type:Array,attribute:!1})],aZ.prototype,"model",1),aZ=aG([tJ("gl-tree-generator")],aZ);var aJ=Object.defineProperty,a0=Object.getOwnPropertyDescriptor,a1=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?a0(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&aJ(i,r,n),n};let a2=class extends lit_element_i{constructor(){super(...arguments),this.lines=1}render(){let t=`--skeleton-lines: ${this.lines};`;return ts`<div class="skeleton" style=${t}></div>`}};a2.styles=tO`
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
	`,a1([t1({type:Number})],a2.prototype,"lines",2),a2=a1([tJ("skeleton-loader")],a2);let GlTreeBase=class GlTreeBase extends GlElement{renderLoading(){return ts`
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
			<div class="section section--skeleton">
				<skeleton-loader></skeleton-loader>
			</div>
		`}renderLayoutAction(t){if(!t)return ta;let i="tree",r="list-tree",s="View as Tree";switch(t){case"auto":i="list",r="gl-list-auto",s="View as List";break;case"list":i="tree",r="list-flat",s="View as Tree";break;case"tree":i="auto",r="list-tree",s="View as Auto"}return ts`<action-item data-switch-value="${i}" label="${s}" icon="${r}"></action-item>`}renderTreeView(t,i="none"){return ts`<gl-tree-generator
			.model=${t}
			.guides=${i}
			@gl-tree-generated-item-action-clicked=${this.onTreeItemActionClicked}
			@gl-tree-generated-item-checked=${this.onTreeItemChecked}
			@gl-tree-generated-item-selected=${this.onTreeItemSelected}
		></gl-tree-generator>`}renderFiles(t,i=!1,r=!1,s=2){let o=[];if(i){let i=rI(t,t=>t.path.split("/"),(...t)=>t.join("/"),r);if(null!=i.children)for(let t of i.children.values()){let i=this.walkFileTree(t,{level:s});o.push(i)}}else for(let i of t){let t=this.fileToTreeModel(i,{level:s,branch:!1},!0);o.push(t)}return o}walkFileTree(t,i={level:1}){let r;if(void 0===i.level&&(i.level=1),r=null==t.value?this.folderToTreeModel(t.name,t.relativePath,i):this.fileToTreeModel(t.value,i),null!=t.children){let s=[];for(let r of t.children.values()){let t=this.walkFileTree(r,{...i,level:i.level+1});s.push(t)}s.length>0&&(r.branch=!0,r.children=s)}return r}folderToTreeModel(t,i,r){return{branch:!1,expanded:!0,path:i,level:1,checkable:!1,checked:!1,icon:"folder",label:t,...r}}getRepoActions(t,i,r){return[]}emptyTreeModel(t,i){return{branch:!1,expanded:!0,path:"",level:1,checkable:!0,checked:!0,icon:void 0,label:t,...i}}repoToTreeModel(t,i,r,s){return{branch:!1,expanded:!0,path:i,level:1,checkable:!0,checked:!0,icon:"gl-repository",label:t,description:s,context:[i],actions:this.getRepoActions(t,i,r),...r}}getFileActions(t,i){return[]}fileToTreeModel(t,i,r=!1,s="/"){let o=t.path.lastIndexOf(s),n=-1!==o?t.path.substring(o+1):t.path,a=r&&-1!==o?t.path.substring(0,o):"";return{branch:!1,expanded:!0,path:t.path,level:1,checkable:!1,checked:!1,icon:"file",label:n,description:!0===r?a:void 0,context:[t],actions:this.getFileActions(t,i),decorations:[{type:"text",label:t.status}],...i}}};var a5=Object.defineProperty,a3=Object.getOwnPropertyDescriptor,a6=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?a3(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&a5(i,r,n),n};let a4=class extends lit_element_i{render(){return this.name?ts`<gl-tooltip .content=${this.name}>${this.renderAvatar()}</gl-tooltip>`:this.renderAvatar()}renderAvatar(){return this.href?ts`<a href=${this.href} class="avatar" part="avatar">${this.renderContent()}</a>`:ts`<span class="avatar" part="avatar">${this.renderContent()}</span>`}renderContent(){return this.src?ts`<img class="thumb thumb--media" src="${this.src}" alt="${this.name}" />`:ts`<slot class="thumb thumb--text"></slot>`}};a4.styles=[tO`
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
		`],a6([t1()],a4.prototype,"src",2),a6([t1()],a4.prototype,"name",2),a6([t1()],a4.prototype,"href",2),a4=a6([tJ("gl-avatar")],a4);let a7=tO`
	.badge {
		display: inline-flex;
		font-size: var(--gl-badge-font-size, x-small);
		font-variant: all-small-caps;
		font-weight: 600;
		color: var(--gl-badge-color, var(--color-foreground--50));
		border: currentColor 1px solid;
		border-radius: 1rem;
		padding: 0 0.8rem 0.1rem;
		white-space: nowrap;
	}
`;var a8=Object.defineProperty,a9=Object.getOwnPropertyDescriptor;let le=class extends lit_element_i{render(){return ts`<slot class="badge" part="base"></slot>`}};le.styles=[a7],le=((t,i,r,s)=>{for(var o,n=s>1?void 0:s?a9(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&a8(i,r,n),n})([tJ("gl-badge")],le);var lt=Object.defineProperty,li=Object.getOwnPropertyDescriptor,lr=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?li(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lt(i,r,n),n};let ls=class extends lit_element_i{constructor(){super(...arguments),this.editor=!1,this.layout="shift",this.grouping="gap"}render(){return ts`<div class="group"><slot></slot></div>`}};ls.styles=[rV,tO`
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
		`],lr([t1({type:Boolean})],ls.prototype,"editor",2),lr([t1({reflect:!0})],ls.prototype,"layout",2),lr([t1({reflect:!0})],ls.prototype,"grouping",2),ls=lr([tJ("button-container")],ls);var lo=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,la=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?ln(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lo(i,r,n),n};let ll=class extends lit_element_i{constructor(){super(...arguments),this.disabled=!1,this.role="option"}updateInteractiveState(){this.tabIndex=this.disabled?-1:"option"===this.role?0:-1}updated(t){(t.has("disabled")||t.has("role"))&&this.updateInteractiveState()}render(){return this.href?ts`<a href=${this.href}><slot></slot></a>`:ts`<slot></slot>`}};ll.styles=[rV,tO`
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
		`],la([t1({type:Boolean,reflect:!0})],ll.prototype,"disabled",2),la([t1({reflect:!0})],ll.prototype,"href",2),la([t1({reflect:!0})],ll.prototype,"role",2),ll=la([tJ("menu-item")],ll);var lc=Object.defineProperty,lh=Object.getOwnPropertyDescriptor;let ld=class extends lit_element_i{firstUpdated(t){this.role="listbox"}render(){return ts`<slot></slot>`}};ld.styles=[rV,tO`
			:host {
				width: max-content;
				background-color: var(--vscode-menu-background);
				border: 1px solid var(--vscode-menu-border);
				padding-bottom: 0.6rem;
			}
		`],ld=((t,i,r,s)=>{for(var o,n=s>1?void 0:s?lh(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lc(i,r,n),n})([tJ("menu-list")],ld);var lp=Object.defineProperty,lu=Object.getOwnPropertyDescriptor,lg=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lu(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lp(i,r,n),n};let lf=class extends lit_element_i{constructor(){super(...arguments),this.mode="infinite",this.active=!1,this.position="bottom"}firstUpdated(){this.setAttribute("role","progressbar")}render(){return ts`<div class="progress-bar"></div>`}};lf.styles=tO`
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
	`,lg([t1({reflect:!0})],lf.prototype,"mode",2),lg([t1({type:Boolean})],lf.prototype,"active",2),lg([t1()],lf.prototype,"position",2),lf=lg([tJ("progress-indicator")],lf);var lm=Object.defineProperty,lb=Object.getOwnPropertyDescriptor,lv=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lb(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lm(i,r,n),n};let ly=class extends lit_element_i{constructor(){super(...arguments),this.collapsable=!1,this.expanded=!1,this.loading=!1}renderTitle(){return this.collapsable?ts`<button
			type="button"
			class="label"
			aria-controls="content"
			aria-expanded=${this.expanded}
			@click="${this.toggleExpanded}"
		>
			<code-icon class="icon" icon=${this.expanded?"chevron-down":"chevron-right"}></code-icon
			><span class="title"><slot name="title">Section</slot></span>
			<span class="subtitle"><slot name="subtitle"></slot></span>
		</button>`:ts`<div class="label">
				<span class="title"><slot name="title">Section</slot></span>
				<span class="subtitle"><slot name="subtitle"></slot></span>
			</div>`}render(){return ts`
			<header class="header" part="header">
				${this.renderTitle()}
				<slot name="actions"></slot>
				<progress-indicator ?active="${this.loading}"></progress-indicator>
			</header>
			<div id="content" role="region" part="content" class="content scrollable">
				<slot></slot>
			</div>
		`}toggleExpanded(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("expanded-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}};ly.styles=[rH,tO`
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
		`],lv([t1({type:Boolean,reflect:!0})],ly.prototype,"collapsable",2),lv([t1({type:Boolean,reflect:!0})],ly.prototype,"expanded",2),lv([t1({type:Boolean,reflect:!0})],ly.prototype,"loading",2),ly=lv([tJ("webview-pane")],ly);var lw=Object.defineProperty,l_=Object.getOwnPropertyDescriptor,lk=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?l_(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lw(i,r,n),n};let lx=class extends GlTreeBase{constructor(){super(...arguments),this.explainBusy=!1,this.selectedPatches=[],this._copiedLink=!1}get cloudDraft(){if(this.state.draft?.draftType==="cloud")return this.state.draft}get isCodeSuggestion(){return this.cloudDraft?.type==="suggested_pr_change"}get canSubmit(){return this.selectedPatches.length>0}updated(t){if(t.has("explain")&&(this.explainBusy=!1,this.querySelector('[data-region="ai-explanation"]')?.scrollIntoView()),t.has("state")){let t=this.state?.draft?.patches;if(t?.length)for(let i of(this.selectedPatches=t.map(t=>t.id),t)){let t=this.selectedPatches.indexOf(i.id);i.repository.located?-1===t&&this.selectedPatches.push(i.id):t>-1&&this.selectedPatches.splice(t,1)}else this.selectedPatches=[]}}renderEmptyContent(){return ts`
			<div class="section section--empty" id="empty">
				<button-container>
					<gl-button full href="command:gitlens.openPatch">Open Patch...</gl-button>
				</button-container>
			</div>
		`}renderPatchMessage(){if(this.state?.draft?.title==null)return;let t=this.cloudDraft?.description;if(null!=t)return t=t.trim(),ts`
			<div class="message-block">
				<p class="message-block__text scrollable" data-region="message">
					<span>${rT(t)}</span>
				</p>
			</div>
		`}renderExplainAi(){if(this.state?.orgSettings.ai===!1||this.state?.preferences.aiEnabled===!1)return;let t=this.explain?.result!=null?`${this.explain.result.summary}

${this.explain.result.body}`:void 0;return ts`
			<webview-pane collapsable data-region="explain-pane">
				<span slot="title">Explain (AI)</span>
				<action-nav slot="actions">
					<action-item
						data-action="switch-ai"
						label="Switch AI Provider/Model"
						icon="arrow-swap"
					></action-item>
				</action-nav>

				<div class="section">
					<p>Let AI assist in understanding the changes made with this patch.</p>
					<p class="button-container">
						<span class="button-group button-group--single">
							<gl-button
								full
								class="button--busy"
								data-action="ai-explain"
								aria-busy="${(this.explainBusy?"true":void 0)??ta}"
								@click=${this.onExplainChanges}
								@keydown=${this.onExplainChanges}
								><code-icon icon="loading" modifier="spin" slot="prefix"></code-icon>Explain
								Changes</gl-button
							>
						</span>
					</p>
					${t?ts`<div class="ai-content" data-region="commit-explanation">
								<gl-markdown
									class="ai-content__summary scrollable"
									markdown="${t}"
								></gl-markdown>
							</div>`:this.explain?.error?ts`<div class="ai-content has-error" data-region="commit-explanation">
									<p class="ai-content__summary scrollable">
										${this.explain.error.message??"Error retrieving content"}
									</p>
								</div>`:void 0}
				</div>
			</webview-pane>
		`}renderChangedFiles(){let t=this.state?.preferences?.files?.layout??"auto";return ts`
			<webview-pane collapsable expanded>
				<span slot="title">Files changed </span>
				<!-- <span slot="subtitle" data-region="stats">\${this.renderCommitStats()}</span> -->
				<action-nav slot="actions">${this.renderLayoutAction(t)}</action-nav>

				${r$(null!=this.validityMessage,()=>ts`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${r$(this.state?.draft?.patches==null,()=>this.renderLoading(),()=>this.renderTreeView(this.treeModel,this.state?.preferences?.indentGuides))}
				</div>
			</webview-pane>
		`}get treeModel(){if(this.state?.draft?.patches==null)return[];let{draft:{patches:t}}=this.state,i=this.state?.preferences?.files?.layout??"auto",r=!1,s=rE(t,t=>t?.files?.length??0);return r="auto"===i?s>(this.state.preferences?.files?.threshold??5):"tree"===i,t?.map(t=>this.draftPatchToTreeModel(t,r,this.state.preferences?.files?.compact,{checkable:!0,checked:this.selectedPatches.includes(t.id)}))}renderUserSelection(t,i){if("delete"===t.change)return;let r=t.pendingRole??t.user.role,s=new Map([["owner","owner"],["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),o=s.get(r);return ts`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${t.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${t.member?.name??t.member?.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					${r$("owner"!==r&&("owner"===i||"admin"===i),()=>ts`
							<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
								<gl-button slot="anchor"
									>${o} <code-icon icon="chevron-down"></code-icon
								></gl-button>
								<menu-list slot="content">
									${rS(s,([i,s])=>"owner"===i?void 0:ts`<menu-item
													@click=${r=>this.onChangeSelectionRole(r,t,i)}
												>
													<code-icon
														icon="check"
														class="user-selection__check ${r===i?"is-active":""}"
													></code-icon>
													${s}
												</menu-item>`)}
								</menu-list>
							</gl-popover>
						`,()=>ts`${o}`)}
				</div>
			</div>
		`}renderUserSelectionList(t,i=!1){if(!t.userSelections?.length)return;let r=t.userSelections;return!1===i&&(r=r.filter(t=>t.user?.role!=="owner")),ts`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rP(r,t=>t.member?.id??t.user?.id,i=>this.renderUserSelection(i,t.role))}
				</div>
			</div>
		`}renderPatchPermissions(){let t=this.cloudDraft;if(null!=t){if("admin"===t.role||"owner"===t.role){let i,r=t.userSelections?.some(t=>void 0!==t.change);switch(t.visibility){case"private":i="organization";break;case"invite_only":i="lock";break;default:i="globe"}return ts`
				${r$(!0!==this.isCodeSuggestion,()=>ts` <div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${i}></code-icon
								></span>
								<select
									id="visibility"
									class="message-input__control"
									@change=${this.onVisibilityChange}
								>
									<option value="public" ?selected=${"public"===t.visibility}>
										Anyone with the link
									</option>
									<option value="private" ?selected=${"private"===t.visibility}>
										Members of my Org with the link
									</option>
									<option value="invite_only" ?selected=${"invite_only"===t.visibility}>
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
						</div>`)}
				${this.renderUserSelectionList(t)}
				${r$(r,()=>ts`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${this.onUpdatePatch}
									>Update Patch</gl-button
								>
							</span>
						</p>
					`)}
			`}return ts`
			${r$(!0!==this.isCodeSuggestion,()=>ts` <div class="message-input">
						<div class="message-input__control message-input__control--text">
							${r$("public"===t.visibility,()=>ts`<code-icon icon="globe"></code-icon> Anyone with the link`)}
							${r$("private"===t.visibility,()=>ts`<code-icon icon="organization"></code-icon> Members of my Org with the link`)}
							${r$("invite_only"===t.visibility,()=>ts`<code-icon icon="lock"></code-icon> Collaborators only`)}
						</div>
					</div>`)}
			${this.renderUserSelectionList(t,!0)}
		`}}renderCodeSuggectionActions(){if(this.isCodeSuggestion&&null!=this.cloudDraft&&!this.cloudDraft.isArchived&&"viewer"!==this.cloudDraft.role)return ts`
			<p class="button-container">
				<span class="button-group button-group--single">
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("accepted")}
						>Accept</gl-button
					>
					<gl-button appearance="secondary" full @click=${()=>this.onArchiveDraft("rejected")}
						>Reject</gl-button
					>
				</span>
			</p>
		`}renderPatches(){return ts`
			<div class="section section--action">
				${this.renderPatchPermissions()}
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button full @click=${this.onApplyPatch}>Apply Patch</gl-button>
						<gl-popover placement="top" trigger="click" appearance="menu" ?arrow=${!1}>
							<gl-button
								slot="anchor"
								density="compact"
								aria-label="Apply Patch Options..."
								title="Apply Patch Options..."
								><code-icon icon="chevron-down"></code-icon
							></gl-button>
							<menu-list slot="content" class="mine-menu">
								<menu-item data-value="branch" @click=${this.onSelectApplyOption}
									>Apply to a Branch</menu-item
								>
								<!-- <menu-item data-value="worktree">Apply to new worktree</menu-item> -->
							</menu-list>
						</gl-popover>
					</span>
				</p>
				${this.renderCodeSuggectionActions()}
			</div>
		`}renderActionbar(){let t=this.state?.draft;if(null!=t)return"local"===t.draftType?ts`
				<div class="top-details__actionbar">
					<div class="top-details__actionbar-group"></div>
					<div class="top-details__actionbar-group">
						<a
							class="commit-action"
							href="#"
							aria-label="Share Patch"
							title="Share Patch"
							@click=${this.onShareLocalPatch}
							>Share</a
						>
					</div>
				</div>
			`:ts`
			<div class="top-details__actionbar">
				<div class="top-details__actionbar-group"></div>
				<div class="top-details__actionbar-group">
					<a class="commit-action" href="#" @click=${this.onCopyCloudLink}>
						<code-icon icon="${this._copiedLink?"check":"link"}"></code-icon>
						<span class="top-details__sha">Copy Link</span></a
					>
					${r$(this.cloudDraft?.gkDevLink!=null,()=>ts`
							<a class="commit-action" href=${this.cloudDraft.gkDevLink} title="Open on gitkraken.dev">
								<code-icon icon="globe"></code-icon>
							</a>
						`)}
				</div>
			</div>
		`}renderDraftInfo(){let t;if(this.state.draft?.title==null)return ta;if(this.cloudDraft?.isArchived){let i=this.cloudDraft.archivedReason??"archived";t=ts`<gl-badge class="title__badge">${i}</gl-badge>`}return ts`
			<h1 class="title">${this.state.draft?.title} ${t}</h1>
			${this.renderPatchMessage()}
		`}render(){return this.state?.draft==null?ts` <div class="commit-detail-panel scrollable">${this.renderEmptyContent()}</div>`:ts`
			<div class="pane-groups">
				<div class="pane-groups__group-fixed">
					<div class="section">${this.renderActionbar()}${this.renderDraftInfo()}</div>
				</div>
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">
					${this.renderExplainAi()}${this.renderPatches()}
				</div>
			</div>
		`}createRenderRoot(){return this}onInviteUsers(t){this.emit("gl-patch-details-invite-users")}onChangeSelectionRole(t,i,r){this.emit("gl-patch-details-update-selection",{selection:i,role:r});let s=t.target?.closest("gl-popover");s?.hide()}onVisibilityChange(t){let i=this.state.draft;i.visibility=t.target.value,this.emit("gl-patch-details-update-metadata",{visibility:i.visibility})}onUpdatePatch(t){this.emit("gl-patch-details-update-permissions")}onExplainChanges(t){if(!0===this.explainBusy||t instanceof KeyboardEvent&&"Enter"!==t.key){t.preventDefault(),t.stopPropagation();return}this.explainBusy=!0}onTreeItemActionClicked(t){if(t.detail.context&&t.detail.action)switch(t.detail.action.action){case"apply-patch":this.onApplyPatch();break;case"change-patch-base":this.onChangePatchBase();break;case"show-patch-in-graph":this.onShowInGraph();break;case"file-open":this.onOpenFile(t);break;case"file-compare-working":this.onCompareWorking(t)}}fireFileEvent(t,i,r){let s=new CustomEvent(t,{detail:{...i,showOptions:r}});this.dispatchEvent(s)}onCompareWorking(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-compare-working",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onOpenFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-open",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onTreeItemChecked(t){if(!t.detail.context)return;let[i]=t.detail.context,r=this.state.draft?.patches?.find(t=>t.gkRepositoryId===i);if(!r)return;let s=this.selectedPatches.indexOf(r?.id);t.detail.checked?-1===s&&(this.selectedPatches.push(r.id),this.validityMessage=void 0):s>-1&&this.selectedPatches.splice(s,1);let o=new CustomEvent("gl-patch-checked",{detail:{patch:r,checked:t.detail.checked}});this.dispatchEvent(o)}onTreeItemSelected(t){let{node:i,context:r}=t.detail;if(!0===i.branch||null==r)return;let[s]=r;this.emit("gl-patch-file-compare-previous",{...s})}onApplyPatch(t,i="current"){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}this.validityMessage=void 0,this.emit("gl-patch-apply-patch",{draft:this.state.draft,target:i,selectedPatches:this.selectedPatches})}onArchiveDraft(t){this.emit("gl-draft-archive",{reason:t})}onSelectApplyOption(t){if(!1===this.canSubmit){this.validityMessage="Please select changes to apply";return}let i=t.target?.closest("menu-item");i?.dataset?.value!=null&&this.onApplyPatch(void 0,i.dataset.value)}onChangePatchBase(t){let i=new CustomEvent("change-patch-base",{detail:{draft:this.state.draft}});this.dispatchEvent(i)}onSelectPatchRepo(t){let i=new CustomEvent("select-patch-repo",{detail:{draft:this.state.draft}});this.dispatchEvent(i)}onShowInGraph(t){this.emit("gl-patch-details-graph-show-patch",{draft:this.state.draft})}onCopyCloudLink(){this.emit("gl-patch-details-copy-cloud-link",{draft:this.state.draft}),this._copiedLink=!0,setTimeout(()=>this._copiedLink=!1,1e3)}onShareLocalPatch(){this.emit("gl-patch-details-share-local-patch",{draft:this.state.draft})}draftPatchToTreeModel(t,i=!1,r=!0,s){let o=this.repoToTreeModel(t.repository.name,t.gkRepositoryId,s,t.repository.located?void 0:"missing");if(!t.files?.length)return o;let n=[];if(i){let i=rI(t.files,t=>t.path.split("/"),(...t)=>t.join("/"),r);if(null!=i.children)for(let t of i.children.values()){let i=this.walkFileTree(t,{level:2});n.push(i)}}else for(let i of t.files){let t=this.fileToTreeModel(i,{level:2,branch:!1},!0);n.push(t)}return n.length>0&&(o.branch=!0,o.children=n),o}getFileActions(t,i){return[{icon:"go-to-file",label:"Open file",action:"file-open"},{icon:"git-compare",label:"Open Changes with Working File",action:"file-compare-working"}]}};lk([t1({type:Object})],lx.prototype,"state",2),lk([t2()],lx.prototype,"explainBusy",2),lk([t1({type:Object})],lx.prototype,"explain",2),lk([t2()],lx.prototype,"selectedPatches",2),lk([t2()],lx.prototype,"validityMessage",2),lk([t2()],lx.prototype,"_copiedLink",2),lx=lk([tJ("gl-draft-details")],lx);var lC=((g=lC||{}).AngleBracketLeftHeavy="❰",g.AngleBracketRightHeavy="❱",g.ArrowBack="↩",g.ArrowDown="↓",g.ArrowDownUp="⇵",g.ArrowDropRight="⤷",g.ArrowHeadRight="➤",g.ArrowLeft="←",g.ArrowLeftDouble="⇐",g.ArrowLeftRight="↔",g.ArrowLeftRightDouble="⇔",g.ArrowLeftRightDoubleStrike="⇎",g.ArrowLeftRightLong="⟷",g.ArrowRight="→",g.ArrowRightDouble="⇒",g.ArrowRightHollow="⇨",g.ArrowUp="↑",g.ArrowUpDown="⇅",g.ArrowUpRight="↗",g.ArrowsHalfLeftRight="⇋",g.ArrowsHalfRightLeft="⇌",g.ArrowsLeftRight="⇆",g.ArrowsRightLeft="⇄",g.Asterisk="∗",g.Bullseye="◎",g.Check="✔",g.Dash="—",g.Dot="•",g.Ellipsis="…",g.EnDash="–",g.Envelope="✉",g.EqualsTriple="≡",g.Flag="⚑",g.FlagHollow="⚐",g.MiddleEllipsis="⋯",g.MuchLessThan="≪",g.MuchGreaterThan="≫",g.Pencil="✎",g.Space=" ",g.SpaceThin=" ",g.SpaceThinnest=" ",g.SquareWithBottomShadow="❏",g.SquareWithTopShadow="❐",g.Warning="⚠",g.ZeroWidthSpace="​",g);Object.freeze({".png":"image/png",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jpe":"image/jpeg",".webp":"image/webp",".tif":"image/tiff",".tiff":"image/tiff",".bmp":"image/bmp"}),Object.freeze(["left","alt+left","ctrl+left","right","alt+right","ctrl+right","alt+,","alt+.","alt+enter","ctrl+enter","escape"]);var l$=((f=l$||{}).File="file",f.Git="git",f.GitHub="github",f.GitLens="gitlens",f.GitLensAIMarkdown="gitlens-ai-markdown",f.PRs="pr",f.Remote="vscode-remote",f.Vsls="vsls",f.VslsScc="vsls-scc",f.Virtual="vscode-vfs",f);Object.freeze(new Set(["file","git","gitlens","pr","vscode-remote","vsls","vsls-scc","vscode-vfs","github"]));let lS="source=gitlens&product=gitlens&utm_source=gitlens-extension&utm_medium=in-app-links",lA=Object.freeze({codeSuggest:`https://gitkraken.com/solutions/code-suggest?${lS}`,cloudPatches:`https://gitkraken.com/solutions/cloud-patches?${lS}`,graph:`https://gitkraken.com/solutions/commit-graph?${lS}`,launchpad:`https://gitkraken.com/solutions/launchpad?${lS}`,platform:`https://gitkraken.com/devex?${lS}`,pricing:`https://gitkraken.com/gitlens/pricing?${lS}`,proFeatures:`https://gitkraken.com/gitlens/pro-features?${lS}`,security:`https://help.gitkraken.com/gitlens/security?${lS}`,workspaces:`https://gitkraken.com/solutions/workspaces?${lS}`,cli:`https://gitkraken.com/cli?${lS}`,browserExtension:`https://gitkraken.com/browser-extension?${lS}`,desktop:`https://gitkraken.com/git-client?${lS}`,githubIssues:`https://github.com/gitkraken/vscode-gitlens/issues/?${lS}`,githubDiscussions:`https://github.com/gitkraken/vscode-gitlens/discussions/?${lS}`,helpCenter:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lS}`,helpCenterHome:`https://help.gitkraken.com/gitlens/home-view/?${lS}`,helpCenterMCP:`https://help.gitkraken.com/mcp/mcp-getting-started/?${lS}`,releaseNotes:`https://help.gitkraken.com/gitlens/gitlens-release-notes-current/?${lS}`,acceleratePrReviews:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lS}#accelerate-pr-reviews`,communityVsPro:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lS}`,homeView:`https://help.gitkraken.com/gitlens/home-view/?${lS}&utm_campaign=walkthrough`,interactiveCodeHistory:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lS}#interactive-code-history`,startIntegrations:`https://help.gitkraken.com/gitlens/gitlens-start-here/?${lS}#improve-workflows-with-integrations`,aiFeatures:`https://help.gitkraken.com/gitlens/gl-gk-ai/?${lS}`,getStarted:`https://help.gitkraken.com/gitlens/gitlens-home/?${lS}`,welcomeInTrial:`https://help.gitkraken.com/gitlens/gitlens-home/?${lS}`,welcomePaid:`https://help.gitkraken.com/gitlens/gitlens-home/?${lS}`,welcomeTrialExpired:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lS}`,welcomeTrialReactivationEligible:`https://help.gitkraken.com/gitlens/gitlens-community-vs-gitlens-pro/?${lS}`});var lP=Object.defineProperty,lT=Object.getOwnPropertyDescriptor,lI=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lT(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lP(i,r,n),n};let lE=Object.freeze([["added",["+","add"]],["modified",["~","edit"]],["removed",["-","remove"]]]),lz=class extends lit_element_i{constructor(){super(...arguments),this.added=0,this.modified=0,this.removed=0}render(){return lE.map(([t,i])=>this.renderStat(t,i))}renderStat(t,i){let r=this[t];return null==r?ta:ts`<span class="stat ${t}" aria-label="${r} ${t}"
			><span class="label">${this.renderSymbol(i)}${r}</span></span
		>`}renderSymbol([t,i]){return"icons"===this.symbol?ts`<code-icon class="icon" icon="${i}"></code-icon>`:ts`<span>${t}</span>`}};lz.styles=tO`
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
	`,lI([t1({type:Number})],lz.prototype,"added",2),lI([t1({type:Number})],lz.prototype,"modified",2),lI([t1({type:Number})],lz.prototype,"removed",2),lI([t1()],lz.prototype,"symbol",2),lI([t1({reflect:!0})],lz.prototype,"appearance",2),lz=lI([tJ("commit-stats")],lz);var lR=Object.defineProperty,lM=Object.getOwnPropertyDescriptor,lL=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lM(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lR(i,r,n),n};let lO=class extends GlTreeBase{constructor(){super(...arguments),this.review=!1,this.generateBusy=!1,this.creationBusy=!1,this.onDebounceTitleInput=C(this.onTitleInput,500),this.onDebounceDescriptionInput=C(this.onDescriptionInput,500)}get create(){return this.state.create}get createChanges(){return Object.values(this.create.changes)}get createEntries(){return Object.entries(this.create.changes)}get hasWipChanges(){return this.createChanges.some(t=>t?.type==="wip")}get selectedChanges(){return 1===this.createChanges.length?this.createEntries:this.createEntries.filter(([,t])=>!1!==t.checked)}get canSubmit(){return null!=this.create.title&&this.create.title.length>0&&this.selectedChanges.length>0}get fileLayout(){return this.state?.preferences?.files?.layout??"auto"}get isCompact(){return this.state?.preferences?.files?.compact??!0}get filesModified(){return rE(this.createChanges,t=>t.files?.length??0)}get draftVisibility(){return this.state?.create?.visibility??"public"}updated(t){t.has("state")&&(this.creationBusy=!1),t.has("generate")&&(this.generateBusy=!1,this.generateAiButton.scrollIntoView())}firstUpdated(){window.requestAnimationFrame(()=>{this.titleInput.focus()})}renderUserSelection(t){let i=t.pendingRole,r=new Map([["admin","admin"],["editor","can edit"],["viewer","can view"],["remove","un-invite"]]),s=r.get(i);return ts`
			<div class="user-selection">
				<div class="user-selection__avatar">
					<gl-avatar .src=${t.avatarUrl}></gl-avatar>
				</div>
				<div class="user-selection__info">
					<div class="user-selection__name">
						${t.member.name??t.member.username??"Unknown"}
					</div>
				</div>
				<div class="user-selection__actions">
					<gl-popover trigger="click" appearance="menu" ?arrow=${!1}>
						<gl-button slot="anchor">${s} <code-icon icon="chevron-down"></code-icon></gl-button>
						<menu-list slot="content">
							${rS(r,([r,s])=>ts`<menu-item
										@click=${i=>this.onChangeSelectionRole(i,t,r)}
									>
										<code-icon
											icon="check"
											class="user-selection__check ${i===r?"is-active":""}"
										></code-icon>
										${s}
									</menu-item>`)}
						</menu-list>
					</gl-popover>
				</div>
			</div>
		`}renderUserSelectionList(){if(this.state?.create?.userSelections!=null&&this.state?.create?.userSelections.length!==0)return ts`
			<div class="message-input">
				<div class="user-selection-container scrollable">
					${rP(this.state.create.userSelections,t=>t.member.id,t=>this.renderUserSelection(t))}
				</div>
			</div>
		`}renderForm(){let t;switch(this.draftVisibility){case"private":t="organization";break;case"invite_only":t="lock";break;default:t="globe"}let i=this.review?"Code Suggestion":"Cloud Patch",r=this.review?"Code Suggestions":"Cloud Patches";return ts`
			<div class="section section--action">
				${r$(this.state?.create?.creationError!=null,()=>ts` <div class="alert alert--error">
							<code-icon icon="error"></code-icon>
							<p class="alert__content">${this.state.create.creationError}</p>
						</div>`)}
				${r$(!1===this.review,()=>ts`
						<div class="message-input message-input--group">
							<div class="message-input__select">
								<span class="message-input__select-icon"
									><code-icon icon=${t}></code-icon
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
						@input=${t=>this.onDebounceTitleInput(t)}
					/>
					${r$(this.state?.orgSettings.ai===!0&&this.state?.preferences.aiEnabled===!0,()=>ts`<div class="message-input__menu">
								<gl-button
									id="generate-ai"
									appearance="toolbar"
									density="compact"
									tooltip="Generate Title and Description..."
									@click=${t=>this.onGenerateTitleClick(t)}
									?disabled=${this.generateBusy}
									><code-icon
										icon=${this.generateBusy?"loading":"sparkle"}
										modifier="${this.generateBusy?"spin":""}"
									></code-icon
								></gl-button>
							</div>`)}
				</div>

				${r$(this.generate?.error!=null,()=>ts`
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
						@input=${t=>this.onDebounceDescriptionInput(t)}
					></textarea>
				</div>
				<p class="button-container">
					<span class="button-group button-group--single">
						<gl-button ?disabled=${this.creationBusy} full @click=${t=>this.onCreateAll(t)}
							>Create ${i}</gl-button
						>
					</span>
				</p>
				${r$(!0===this.review,()=>ts`
						<p class="button-container">
							<span class="button-group button-group--single">
								<gl-button appearance="secondary" full @click=${()=>this.onCancel()}
									>Cancel</gl-button
								>
							</span>
						</p>
					`)}
				${r$(this.state?.orgSettings.byob===!1,()=>ts`<p class="h-deemphasize">
							<code-icon icon="lock"></code-icon>
							<a
								href="${lA.cloudPatches}"
								title="Learn more about ${r}"
								aria-label="Learn more about ${r}"
								>${r}</a
							>
							are
							<a
								href="https://help.gitkraken.com/gitlens/security"
								title="Learn more about GitKraken security"
								aria-label="Learn more about GitKraken security"
								>securely stored</a
							>
							by GitKraken.
						</p>`,()=>ts`<p class="h-deemphasize">
							<code-icon icon="info"></code-icon>
							Your
							<a
								href="${lA.cloudPatches}"
								title="Learn more about ${r}"
								aria-label="Learn more about ${r}"
								>${i}</a
							>
							will be securely stored in your organization's self-hosted storage
						</p>`)}
			</div>
		`}render(){return ts`
			<div class="pane-groups">
				<div class="pane-groups__group">${this.renderChangedFiles()}</div>
				<div class="pane-groups__group-fixed pane-groups__group--bottom">${this.renderForm()}</div>
			</div>
		`}renderChangedFiles(){return ts`
			<webview-pane class="h-no-border" expanded>
				<span slot="title">${this.review?"Changes to Suggest":"Changes to Include"}</span>
				<action-nav slot="actions">${this.renderLayoutAction(this.fileLayout)}</action-nav>

				${r$(null!=this.validityMessage,()=>ts`<div class="section">
							<div class="alert alert--error">
								<code-icon icon="error"></code-icon>
								<p class="alert__content">${this.validityMessage}</p>
							</div>
						</div>`)}
				<div class="change-list" data-region="files">
					${r$(null==this.create.changes,()=>this.renderLoading(),()=>this.renderTreeViewWithModel())}
				</div>
			</webview-pane>
		`}onTreeItemChecked(t){if(null==t.detail.context||t.detail.context.length<1)return;let[i,r]=t.detail.context,s=t.detail.checked;"unstaged"===r&&(s=!!t.detail.checked||"staged");let o=this.getChangeForRepo(i);null==o||o.checked!==s&&(o.checked=s,this.requestUpdate("state"),this.emit("gl-patch-create-repo-checked",{repoUri:i,checked:s}))}onTreeItemSelected(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-compare-previous",{...i})}renderTreeViewWithModel(){if(null==this.createChanges||0===this.createChanges.length)return this.renderTreeView([{label:"No changes",path:"",level:1,branch:!1,checkable:!1,expanded:!0,checked:!1}]);let t=[],i=this.createChanges.length>1,r=this.isTree(this.filesModified??0),s=this.isCompact;if(i)for(let i of this.createChanges){let o=this.getTreeForChange(i,!0,r,s);null!=o&&t.push(...o)}else{let i=this.createChanges[0],o=this.getTreeForChange(i,!1,r,s);null!=o&&t.push(...o)}return this.renderTreeView(t,this.state?.preferences?.indentGuides)}getTreeForChange(t,i=!1,r=!1,s=!0){if(null==t.files||0===t.files.length)return;let o=[];if("wip"===t.type){let n=[],a=[];for(let i of t.files)i.staged?n.push(i):a.push(i);0===n.length||0===a.length?o.push(...this.renderFiles(t.files,r,s,i?2:1)):(a.length&&o.push({label:"Unstaged Changes",path:"",level:i?2:1,branch:!0,checkable:!0,expanded:!0,checked:!0===t.checked,context:[t.repository.uri,"unstaged"],children:this.renderFiles(a,r,s,i?3:2)}),n.length&&o.push({label:"Staged Changes",path:"",level:i?2:1,branch:!0,checkable:!0,expanded:!0,checked:!1!==t.checked,disableCheck:!0,children:this.renderFiles(n,r,s,i?3:2)}))}else o.push(...this.renderFiles(t.files,r,s));if(!i)return o;let n=this.repoToTreeModel(t.repository.name,t.repository.uri,{branch:!0,checkable:!0,checked:!1!==t.checked});return n.children=o,[n]}isTree(t){return"auto"===this.fileLayout?t>(this.state?.preferences?.files?.threshold??5):"tree"===this.fileLayout}createPatch(){if(!this.canSubmit){0===this.titleInput.value.length?(this.titleInput.setCustomValidity("Title is required"),this.titleInput.reportValidity(),this.titleInput.focus()):this.titleInput.setCustomValidity(""),null==this.selectedChanges||0===this.selectedChanges.length?this.validityMessage="Check at least one change":this.validityMessage=void 0;return}this.validityMessage=void 0,this.titleInput.setCustomValidity("");let t=this.selectedChanges.reduce((t,[i,r])=>(t[i]=r,t),{}),i={title:this.create.title??"",description:this.create.description,changesets:t,visibility:this.create.visibility,userSelections:this.create.userSelections};this.emit("gl-patch-create-patch",i)}onCreateAll(t){this.createPatch(),this.state?.create&&(this.creationBusy=!0)}onSelectCreateOption(t){}getChangeForRepo(t){return this.create.changes[t]}onTitleInput(t){this.create.title=this.titleInput.value,this.fireMetadataUpdate()}onDescriptionInput(t){this.create.description=this.descInput.value,this.fireMetadataUpdate()}onInviteUsers(t){this.emit("gl-patch-create-invite-users")}onChangeSelectionRole(t,i,r){this.emit("gl-patch-create-update-selection",{selection:i,role:r});let s=t.target?.closest("gl-popover");s?.hide()}onVisibilityChange(t){this.create.visibility=t.target.value,this.fireMetadataUpdate()}onGenerateTitleClick(t){this.generateBusy=!0,this.emit("gl-patch-generate-title",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}fireMetadataUpdate(){this.emit("gl-patch-create-update-metadata",{title:this.create.title,description:this.create.description,visibility:this.create.visibility})}createRenderRoot(){return this}onTreeItemActionClicked(t){if(t.detail.context&&t.detail.action)switch(t.detail.action.action){case"show-patch-in-graph":this.onShowInGraph(t);break;case"file-open":this.onOpenFile(t);break;case"file-stage":this.onStageFile(t);break;case"file-unstage":this.onUnstageFile(t)}}onOpenFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-open",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onStageFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-stage",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onUnstageFile(t){if(!t.detail.context)return;let[i]=t.detail.context;this.emit("gl-patch-file-unstage",{...i,showOptions:{preview:!t.detail.dblClick,viewColumn:t.detail.altKey?-2:void 0}})}onShowInGraph(t){}onCancel(){this.emit("gl-patch-create-cancelled")}getFileActions(t,i){let r={icon:"go-to-file",label:"Open file",action:"file-open"};return this.review?[r]:!0===t.staged?[r,{icon:"remove",label:"Unstage changes",action:"file-unstage"}]:[r,{icon:"plus",label:"Stage changes",action:"file-stage"}]}getRepoActions(t,i,r){return[{icon:"gl-graph",label:"Open in Commit Graph",action:"show-patch-in-graph"}]}};lL([t1({type:Object})],lO.prototype,"state",2),lL([t1({type:Boolean})],lO.prototype,"review",2),lL([t1({type:Object})],lO.prototype,"generate",2),lL([t2()],lO.prototype,"generateBusy",2),lL([t2()],lO.prototype,"creationBusy",2),lL([t3("#title")],lO.prototype,"titleInput",2),lL([t3("#desc")],lO.prototype,"descInput",2),lL([t3("#generate-ai")],lO.prototype,"generateAiButton",2),lL([t2()],lO.prototype,"validityMessage",2),lO=lL([tJ("gl-patch-create")],lO);var lD=Object.defineProperty,lB=Object.getOwnPropertyDescriptor,lN=(t,i,r,s)=>{for(var o,n=s>1?void 0:s?lB(i,r):i,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s?o(i,r,n):o(n))||n);return s&&n&&lD(i,r,n),n};let lU=class extends GlElement{constructor(){super(...arguments),this.indentPreference=16}get wipChangesCount(){return this.state?.create==null?0:Object.values(this.state.create.changes).reduce((t,i)=>t+=i.files?.length??0,0)}get wipChangeState(){if(this.state?.create==null)return;let t=Object.values(this.state.create.changes).reduce((t,i)=>(null!=i.files&&(t.files+=i.files.length,t.on.add(i.repository.uri)),t),{files:0,on:new Set});return{count:t.files,branches:[...t.on].join(", ")}}get mode(){return this.state?.mode??"view"}updateDocumentProperties(){let t=this.state?.preferences?.indent;t===this.indentPreference||(this.indentPreference=t??16,document.documentElement.style.setProperty("--gitlens-tree-indent",`${this.indentPreference}px`))}updated(t){t.has("state")&&this.updateDocumentProperties()}render(){return ts`
			<div class="commit-detail-panel scrollable">
				<main id="main" tabindex="-1">
					${r$("view"===this.mode,()=>ts`<gl-draft-details .state=${this.state} .explain=${this.explain}></gl-draft-details>`,()=>ts`<gl-patch-create .state=${this.state} .generate=${this.generate}></gl-patch-create>`)}
				</main>
			</div>
		`}createRenderRoot(){return this}};lN([t1({type:Object})],lU.prototype,"state",2),lN([t1({type:Object})],lU.prototype,"explain",2),lN([t1({type:Object})],lU.prototype,"generate",2),lN([t1({attribute:!1,type:Object})],lU.prototype,"app",2),lU=lN([tJ("gl-patch-details-app")],lU);let lF="0000000000000000000000000000000000000000";let PatchDetailsApp=class PatchDetailsApp extends App{constructor(){super("PatchDetailsApp"),this.debouncedAttachState=C(this.attachState.bind(this),100)}onInitialize(){this.debouncedAttachState()}onBind(){return[b.on("[data-switch-value]","click",t=>this.onToggleFilesLayout(t)),b.on('[data-action="ai-explain"]',"click",t=>this.onAIExplain(t)),b.on('[data-action="switch-ai"]',"click",t=>this.onSwitchAIModel(t)),b.on('[data-action="mode"]',"click",t=>this.onModeClicked(t)),b.on("gl-draft-details","gl-patch-apply-patch",t=>this.onApplyPatch(t.detail)),b.on("gl-draft-details","gl-draft-archive",t=>this.onArchiveDraft(t.detail.reason)),b.on("gl-patch-details-app","change-patch-base",t=>this.onChangePatchBase(t.detail)),b.on("gl-patch-details-app","select-patch-repo",t=>this.onSelectPatchRepo(t.detail)),b.on("gl-patch-details-app","gl-patch-details-graph-show-patch",t=>this.onShowPatchInGraph(t.detail)),b.on("gl-patch-details-app","gl-patch-create-patch",t=>this.onCreatePatch(t.detail)),b.on("gl-patch-details-app","gl-patch-share-local-patch",()=>this.onShareLocalPatch()),b.on("gl-draft-details","gl-patch-details-copy-cloud-link",()=>this.onCopyCloudLink()),b.on("gl-patch-create","gl-patch-create-invite-users",()=>this.onInviteUsers()),b.on("gl-draft-details","gl-patch-details-invite-users",()=>this.onInviteUsers()),b.on("gl-patch-create","gl-patch-create-update-selection",t=>this.onUpdateUserSelection(t.detail)),b.on("gl-draft-details","gl-patch-details-update-selection",t=>this.onUpdateUserSelection(t.detail)),b.on("gl-patch-create","gl-patch-create-repo-checked",t=>this.onCreateCheckRepo(t.detail)),b.on("gl-patch-create","gl-patch-generate-title",t=>this.onCreateGenerateTitle(t.detail)),b.on("gl-patch-create","gl-patch-create-update-metadata",t=>this.onCreateUpdateMetadata(t.detail)),b.on("gl-draft-details","gl-patch-details-update-metadata",t=>this.onDraftUpdateMetadata(t.detail)),b.on("gl-draft-details","gl-patch-details-update-permissions",()=>this.onDraftUpdatePermissions()),b.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-previous",t=>this.onCompareFileWithPrevious(t.detail)),b.on("gl-patch-create,gl-draft-details","gl-patch-file-compare-working",t=>this.onCompareFileWithWorking(t.detail)),b.on("gl-patch-create,gl-draft-details","gl-patch-file-open",t=>this.onOpenFile(t.detail)),b.on("gl-draft-details","gl-patch-checked",t=>this.onPatchChecked(t.detail))]}onMessageReceived(t){switch(!0){case ei.is(t):t.params.state,this.state=t.params.state,this.setState(this.state),this.debouncedAttachState();break;case er.is(t):case es.is(t):case eo.is(t):this.state={...this.state,...t.params},this.setState(this.state),this.debouncedAttachState(!0);break;case en.is(t):{let i=this.state.draft,r=i.patches,s=r.findIndex(i=>i.id===t.params.patch.id);r.splice(s,1,t.params.patch),this.state={...this.state,draft:i},this.setState(this.state),this.debouncedAttachState(!0);break}default:super.onMessageReceived?.(t)}}onPatchChecked(t){this.sendCommand(E,t)}onCreateCheckRepo(t){this.sendCommand(G,t)}onCreateUpdateMetadata(t){this.sendCommand(K,t)}async onCreateGenerateTitle(t){try{let t=await this.sendRequest(et,void 0);t.error?this.component.generate={error:{message:t.error.message??"Error retrieving content"}}:t.title||t.description?(this.component.generate={title:t.title,description:t.description},this.state={...this.state,create:{...this.state.create,title:t.title??this.state.create?.title,description:t.description??this.state.create?.description}},this.setState(this.state),this.debouncedAttachState()):this.component.generate=void 0}catch{this.component.generate={error:{message:"Error retrieving content"}}}}onDraftUpdateMetadata(t){this.sendCommand(X,t)}onDraftUpdatePermissions(){this.sendCommand(Q,void 0)}onShowPatchInGraph(t){}onCreatePatch(t){this.sendCommand(T,t)}onShareLocalPatch(){this.sendCommand(W,void 0)}onCopyCloudLink(){this.sendCommand(q,void 0)}onModeClicked(t){let i=t.target?.dataset.actionValue??void 0;i!==this.state.mode&&this.sendCommand(V,{mode:i})}onApplyPatch(t){null!=t.selectedPatches&&0!==t.selectedPatches.length&&this.sendCommand(A,{details:t.draft,target:t.target??"current",selected:t.selectedPatches})}onArchiveDraft(t){this.sendCommand(P,{reason:t})}onChangePatchBase(t){this.sendCommand(O,void 0)}onSelectPatchRepo(t){this.sendCommand(M,void 0)}onCommandClickedCore(t){let i=t?.startsWith("command:")?t.slice(8):t;null!=i&&this.sendCommand(ec,{command:i})}onSwitchAIModel(t){this.onCommandClickedCore("gitlens.ai.switchProvider")}async onAIExplain(t){try{let t=await this.sendRequest(ee,void 0);t.error?this.component.explain={error:{message:t.error.message??"Error retrieving content"}}:this.component.explain=t}catch{this.component.explain={error:{message:"Error retrieving content"}}}}onToggleFilesLayout(t){let i=t.target?.dataset.switchValue??void 0;if(i===this.state.preferences.files?.layout)return;let r={...this.state.preferences.files,layout:i??"auto",compact:this.state.preferences.files?.compact??!0,threshold:this.state.preferences.files?.threshold??5,icon:this.state.preferences.files?.icon??"type"};this.state={...this.state,preferences:{...this.state.preferences,files:r}},this.debouncedAttachState(),this.sendCommand(j,{files:r})}onInviteUsers(){this.sendCommand(Y,void 0)}onUpdateUserSelection(t){this.sendCommand(J,t)}onOpenFileOnRemote(t){this.sendCommand(N,t)}onOpenFile(t){this.sendCommand(B,t)}onCompareFileWithWorking(t){this.sendCommand(U,t)}onCompareFileWithPrevious(t){this.sendCommand(F,t)}onFileMoreActions(t){this.sendCommand(D,t)}get component(){return null==this._component&&(this._component=document.getElementById("app"),this._component.app=this),this._component}attachState(t){this.component.state=this.state}};new PatchDetailsApp;export{PatchDetailsApp,lF as uncommittedSha};