"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6a0dd068-16e8-5e4a-839f-fb0b7f427a7f")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[617,8363],{25873:(e,t,n)=>{!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(86974)},36725:(e,t,n)=>{n.d(t,{C:()=>i});var a=n(36213);class i extends a.F_{static #e=this.nameTemplate="UiModule:CreationError";static #t=this.is=e=>a.F_.is(e,i.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,i.nameTemplate);constructor(e){super(i.nameTemplate,"The UI module could not be created",{trackError:!1,userHint:"Please try to reload the current page and try again",...e})}}},9135:(e,t,n)=>{n.r(t),n.d(t,{ShadowDOMIsolation:()=>d});var a=n(14041),i=n(25873),o=n(36725),r=n(14744),l=n(81),c=n(32651);let s={get:async(e,t)=>(await c.RO([e]))[e]??t,set:async(e,t)=>c.kx({[e]:t})};async function p(e){let t=await e.systemGetVersion();return{api:e,storage:s,version:t}}class d{constructor(e,t,n,a){this.rootElement=e,this.rootShadow=t,this.rootBody=n,this.shadowHead=a,this.initialized=!1}loadFonts(){(async()=>{let{FontFaces:e}=await Promise.resolve().then(n.bind(n,81));for(let t of(await Promise.all(e.map(e=>(function(e){let t={};return e.fontDisplay&&(t.display=e.fontDisplay),e.fontStyle&&(t.style=e.fontStyle),e.fontWeight&&(t.weight=e.fontWeight),e.unicodeRange&&(t.unicodeRange=e.unicodeRange),new FontFace(e.fontFamily,e.src,t).load()})(e)))))document.fonts.add(t)})()}async setup(){this.initialized||(this.initialized=!0,this.loadFonts(),this.contentElement=document.createElementNS("http://www.w3.org/1999/xhtml","div"),this.contentElement.setAttribute("data-role","content"),this.rootBody.appendChild(this.contentElement),this.portalElement=document.createElementNS("http://www.w3.org/1999/xhtml","div"),this.portalElement.setAttribute("data-role","portal"),this.rootBody.appendChild(this.portalElement))}async create(e,t,n){if(!this.contentElement)throw new o.C({module:t.name});let a=document.createElementNS("http://www.w3.org/1999/xhtml","div");return a.id=`ui-module-${t.name}`,this.contentElement.appendChild(a),{type:"shadow-dom",api:e,container:a,documentHost:this.rootElement,documentRoot:this.rootShadow,portalInsertionPoint:this.portalElement??document.body,styleInsertionPoint:this.shadowHead??document.head}}async mount(e,t,n,o){(0,r.Ay)("shadow-dom"===e.type);let{default:c}=await t.component(),s={...o,...await p(e.api),controller:n};this.root=(0,i.createRoot)(e.container),this.root.render(a.createElement(()=>a.createElement(l.oB.Provider,{value:e},a.createElement(l.Kf,null,a.createElement(c,s))),null))}destroy(e,t){(0,r.Ay)("shadow-dom"===e.type),this.root&&(this.root.unmount(),this.root=void 0),e.container.remove()}hide(e){(0,r.Ay)("shadow-dom"===e.type),e.container.style.display="none"}show(e){(0,r.Ay)("shadow-dom"===e.type),e.container.style.display="block"}setStyle(e,t){(0,r.Ay)("shadow-dom"===e.type),Object.assign(e.container.style,t)}}},13586:(e,t,n)=>{n.d(t,{Dk:()=>c,Ff:()=>s,uA:()=>d});var a=n(14041),i=n(37217),o=n(33068);let r=i.I.getLogger("PluginModules"),l={};function c(e,t,n){return new Proxy({},{get(a,i){if("string"==typeof i)return i in a?a[i]:async function(){for(var a=arguments.length,r=Array(a),l=0;l<a;l++)r[l]=arguments[l];try{return await e.invokeAppWindowModuleCall(n,i,r)}catch(e){throw o.O.is(e)&&t({type:"UnmountPluginModule",uuid:n}),e}}}})}let s=(e,t)=>{switch(e.type){case"MountPluginModule":{if(!l[e.component])return r.error(`Unknown plugin module ${e.component}`),[t,[]];let n={component:e.component,state:e.initialState};return[{...t,[e.uuid]:n},[]]}case"UnmountPluginModule":{let{[e.uuid]:n,...a}=t;return[a,[]]}case"CheckPluginModule":return[t,[async t=>{let{api:n,dispatch:a}=t;try{await n.checkAppWindowModule(e.uuid)}catch(t){throw o.O.is(t)&&a({type:"UnmountPluginModule",uuid:e.uuid}),t}}]];case"CheckAllPluginModules":{let e=async e=>{let{dispatch:n}=e;for(let e in t)n({type:"CheckPluginModule",uuid:e})};return[t,[e]]}case"PluginModuleAction":{let n=t[e.uuid];if(!n)return[t,[]];let a=l[n.component];if(!a){let{[e.uuid]:n,...a}=t;return[a,[]]}let[i,o]=a.reducer(e.action,n.state),r={...n,state:i};return[{...t,[e.uuid]:r},o.map(t=>async n=>{let{api:a,dispatch:i}=n;await t({api:a,dispatch:t=>i({type:"PluginModuleAction",uuid:e.uuid,action:t}),controller:c(a,t=>i({type:"PluginModuleAction",uuid:e.uuid,action:t}),e.uuid)})})]}}},p=e=>{let{uuid:t,component:n,state:i,dispatch:o}=e,r=a.useCallback(e=>o({type:"PluginModuleAction",uuid:t,action:e}),[t,o]);a.useEffect(()=>{o({type:"CheckPluginModule",uuid:t})},[t,o]);let c=l[n]?.Component;return c?a.createElement(c,{key:t,state:i,dispatch:r}):null},d=e=>{let{state:t,dispatch:n}=e;return a.createElement(a.Fragment,null,Object.entries(t).map(e=>{let[t,{component:i,state:o}]=e;return a.createElement(p,{key:t,uuid:t,component:i,state:o,dispatch:n})}))}},2822:(e,t,n)=>{n.d(t,{RT:()=>S,qw:()=>s});var a=n(38792),i=n.n(a),o=n(14041),r=n(19916),l=n(74452),c=n(36213),s=n(67100),p=n(117),d=n(11778),u=n(88645),m=n(75162),g=n(28363),y=n(96326),h=n(45742),f=n(13314),x=n(87268),C=n(4974),E=n(19431),b=n(89486);n(13586);let{MC:k,sR:w}=l,S=o.memo(function(e){let[t,n]=o.useState(e.initialState);return o.createElement(x.J,{onError:t=>{let a=c.sF.from(t).toJSON();n({...s.ue,notifications:[E.$.error(a)]}),e.api.trackError(a)}},o.createElement(v,{...e,initialState:t}))}),v=e=>{let{initialState:t,api:n,storage:a,version:l}=e,x=o.useMemo(()=>A(n),[n]),E=o.useMemo(()=>{let e={...s.ue,...t};switch(e.showReason.type){case"showSubscribe":{let{code:t,amount:n}=e.showReason;return{...e,overlayModal:{type:"subscription",from:"deeplink",initialAmount:n||void 0,initialCode:t||void 0}}}case"showThanksForSubscribing":return{...e,overlayModal:{type:"thankYou"}};case"playlink":case"createTeam":case"showJoinTeam":case"resumeExecution":case"rightClickMenu":case"system":case"user":return e}},[t]),k=o.useRef(E),[w,S,{downloadBundle:v,getActionLog:O}]=(0,p.WO)((e,t)=>{try{let[n,a]=s.Ff(e,t,async()=>v(),async()=>O());return[n,a.map(t=>(t=P(t,e),t=D(t,e)))]}catch(a){let e=new C.w({cause:a,message:String(a)});console.error(e),console.error(a);let n=c.sF.withFallback(a,()=>e);return requestAnimationFrame(()=>S({type:"App/ErrorNotified",bardeenError:n})),[t,[]]}},E,[],{api:x}),I=f.Cb(w.tourFlowState)?.state,R=I?{...I,tourFlowState:w.tourFlowState}:w;k.current=R,(0,m.p)({enabled:R.config.settings?.prefersAutoScale??!1}),o.useEffect(()=>{let e=async()=>{let e=k.current;if(e.config.logoutInProgress)return;let t=e.builderV2State;if(t){let e=document.querySelector('[data-builder-role="scrollable-container"]')?.scrollTop??0,n=h.py.isPausing(t.sequencingStatus)||h.py.isPreparing(t.sequencingStatus)?{type:"idle"}:t.sequencingStatus;t={...t,scrollTop:e,runCompletedId:null,sequencingStatus:n}}let n=t?.loadingStatus!==null;await a.set("ui state",{...e,modal:"LoadingOverlay"===e.modal.type?{type:"None"}:e.modal,builderV2State:n?null:t,view:n?"appWindow":e.view,overlayModal:null,localInteractionRunState:s.dc.isRunning(e.localInteractionRunState)?e.localInteractionRunState:null,appWindowState:{...e.appWindowState,notificationsMenuIsOpen:g.ue.notificationsMenuIsOpen,showResultsOnboarding:g.ue.showResultsOnboarding},busyCalls:[],confettiCelebrationActive:!1,connection:{type:"active"},debugMsg:s.ue.debugMsg,notifications:[],playbooksState:{...e.playbooksState,loading:!1,personal:e.playbooksState.personal?.map(e=>({...e,saving:!1}))??null,team:e.playbooksState.team?.map(e=>({...e,saving:!1}))??null},teamState:b.ue,__version:l.clientVersion})},t=()=>{S({type:"App/Focused"})};return window.addEventListener("beforeunload",e),window.addEventListener("pagehide",e),window.addEventListener("focus",t),()=>{e(),window.removeEventListener("beforeunload",e),window.removeEventListener("pagehide",e),window.removeEventListener("focus",t)}},[n,S,a,l]),o.useEffect(()=>{let e=[],t=async()=>{let t=await n.triggersList();i()(e,t)||S({type:"App/TriggersUpdated",triggers:e=t})},a=async()=>{await t(),setTimeout(()=>a(),3e4)};a()},[S,n]),o.useEffect(()=>{let e;if(!R.config.hasRunRecords){let t=()=>S({type:"App/RunRecordsCheckingPeriodPassed"});t(),e=window.setInterval(t,3e5)}return()=>clearInterval(e)},[S,R.config.hasRunRecords]),o.useEffect(()=>{let e=(e,t,n)=>{let a=y.W.fromApi(e);if("rightClickMenu"===t)return S({type:"App/RightClickMenuPlaybookClicked",playbook:a,execParams:n});S({type:"App/PlaybookClicked",from:t,pbId:e.id,skipInvocationTracking:!1})},t=e=>{S({type:"App/AppWindowOpened"}),S({type:"App/PlaybookClicked",from:"synthesisLink",pbId:e.id})},a=e=>{S({type:"App/AppWindowOpened"}),S({type:"App/ErrorNotified",bardeenError:e})},i=async e=>{S({type:"App/AstLoaded",ast:e,from:"unknown"})},o=async(e,t,n)=>{S({type:"PluginModuleAction",action:{type:"MountPluginModule",uuid:e,component:t,initialState:n}})},l=async e=>{S({type:"PluginModuleAction",action:{type:"UnmountPluginModule",uuid:e}}),await (0,r.tH)(async()=>k.current.pluginsState,{until:t=>!(e in t),maxTry:3,delay:5})},c=async(e,t)=>{S({type:"PluginModuleAction",action:{type:"PluginModuleAction",uuid:e,action:t}})},p=async()=>{S({type:"App/AppConnectionChanged"})},d=async()=>{S({type:"App/AppConnectFlowFinished"})},u=e=>{S({type:"App/PlaybookHighlighted",pb:y.W.fromApi(e)})},m=e=>{S({type:"App/TriggersUpdated",triggers:[e]})},g=(e,t)=>{k.current.config.subscription?.microCredits!==t&&S({type:"App/CreditsChanged",microCreditsBreakdown:e,microCredits:t})},h=e=>S({type:"invalidated"===e?"App/ClientUnavailable":"open"===e?"App/ClientReconnectRequested":"App/ClientDisconnected"}),f=e=>{S({type:"App/RunRecordAdded",runRecord:e})},x=e=>{S({type:"App/RunRecordUpdated",runRecord:e})},C=()=>{S({type:"AppWindowAction",action:{type:"Scrapers/Updated"}})},E=e=>{S({type:"ScraperTemplateClicked",template:e})};n.on("app_highlight_playbook",u),n.on("scraper_templates_changed",C),n.on("app_invoke_playbook",e),n.on("app_invoke_synthesized_playbook",t),n.on("app_invoke_scraper_template",E),n.on("app_synthesized_playbook_error",a),n.on("app_show_builder",i),n.on("app_window_module_mount",o),n.on("app_window_module_unmount",l),n.on("app_window_module_dispatch",c),n.on("app_connection_changed",p),n.on("auth_flow_finished",d),n.on("credits_changed",g),n.on("trigger_updated",m),n.on("connection_status_changed",h),n.on("runrecord_added",f),n.on("runrecord_updated",x),n.appWindowEvent("app_shown");let[b,w]=s.Ts(R);return k.current=b,w.forEach(e=>e({api:n,dispatch:S})),()=>{n.off("app_highlight_playbook",u),n.off("app_invoke_playbook",e),n.off("app_invoke_scraper_template",E),n.off("scraper_templates_changed",C),n.off("app_invoke_synthesized_playbook",t),n.off("app_synthesized_playbook_error",a),n.off("app_show_builder",i),n.off("app_window_module_mount",o),n.off("app_window_module_unmount",l),n.off("app_window_module_dispatch",c),n.off("app_connection_changed",p),n.off("auth_flow_finished",d),n.off("credits_changed",g),n.off("trigger_updated",m),n.off("connection_status_changed",h),n.off("runrecord_added",f),n.off("runrecord_updated",x)}},[n,S]),k.current=R;let T=o.useMemo(()=>({dispatch:S,config:R.config}),[S,R.config]);return o.createElement(u.o.Provider,{value:T},o.createElement(d.E.Provider,{value:n},o.createElement(s.uA,{state:R,dispatch:S})))},O=(e,t)=>function(){for(var n=arguments.length,a=Array(n),i=0;i<n;i++)a[i]=arguments[i];let o=Date.now();if(!e[t])throw Error(`Runtime has no "${t}"! Did you update the Runtime-Mock?`);try{let n=e[t](...a);if(!n||!("then"in n))return n;return n.then(e=>(String(t),Date.now(),e)).catch(e=>{let n=[`API ERROR ${String(t)}`,`${Date.now()-o}ms`,a,e];throw console.error(...n),e})}catch(e){throw console.error(`API ERROR ${String(t)}`,`${Date.now()-o}ms`,a,e),e}},A=e=>new Proxy(e,{get:O}),I=0,D=(e,t)=>{let n=async function(n){I++;let a=!1,i=n.dispatch,o=setTimeout(()=>{a=!0,i({type:"App/BusyCallAdded",id:I,startedAt:Date.now(),action:t})},1e3);try{return await e(n)}catch(e){}finally{clearTimeout(o),a&&i({type:"App/BusyCallRemoved",id:I})}};return n.displayName=String(e.displayName??e.name),n},P=(e,t)=>{let n=async function(n){let a=n.dispatch;try{return await e(n)}catch(n){k.is(n)&&a({type:"App/ActionScheduledOnReconnect",action:t}),w.is(n)&&a({type:"App/ClientUnavailable"});let e=new C.I({cause:n,actionType:t.type});return a({type:"App/ErrorNotified",bardeenError:c.sF.withFallback(n,()=>e)})}};return n.displayName=String(e.displayName??e.name),n}},86244:(e,t,n)=>{n.d(t,{Component:()=>a.A,createInitialState:()=>i.Ur,reducer:()=>o.F});var a=n(51354),i=n(19029),o=n(85999)},21139:(e,t,n)=>{n.d(t,{Component:()=>a.A,createInitialState:()=>i.Ur,reducer:()=>o.F});var a=n(37431),i=n(83670),o=n(30451)},83670:(e,t,n)=>{n.d(t,{HK:()=>r,Q_:()=>o,Ur:()=>l});var a=n(72661);let i=[{question:"Where will this report be getting data from?",answer:"",type:"free-text",recommendation:"The data will come from..."},{question:"How will this report be used?",answer:"",type:"free-text",recommendation:"The report will be used to..."}],o=["sections-editor"],r=e=>({questions:"questions","sections-editor":e.isEditing?"edit":"questions",name:"sections-editor",edit:"edit"})[e.page];function l(e){return{page:e?"edit":"questions",name:e?.name??"",type:"General Research Report",sections:e?.sections??[],purpose:e?.purpose??"",llmRole:e?.llmRole??"",isEditing:!!e,preSetQuestions:i,templateEditorState:a.ue(),saving:!1}}},29103:(e,t,n)=>{n.d(t,{Component:()=>i.A,createInitialState:()=>a.Ur,prepare:()=>o.i,reducer:()=>o.F});var a=n(67226),i=n(37878),o=n(89615)},28926:(e,t,n)=>{n.d(t,{$f:()=>R.s,$n:()=>c.$n,BQ:()=>a.B,EY:()=>H.EY,F$:()=>D.F,IU:()=>v.IU,In:()=>E.In,Jn:()=>u.J,N:()=>S.N,Qn:()=>a.Q,R:()=>I.R,R9:()=>m.R9,SD:()=>m.SD,Sc:()=>d.S,TM:()=>N.T,TO:()=>v.TO,U_:()=>L.U_,Uc:()=>y.U,Uq:()=>B.Uq,VP:()=>x.VP,Vv:()=>s.Vv,XI:()=>F.X,YE:()=>m.YE,YK:()=>o.Y,Yz:()=>B.Yz,Z:()=>$.Z,aF:()=>O.a,ab:()=>I.a,ck:()=>w.c,dN:()=>k.dN,eu:()=>r.e,fI:()=>x.fI,h$:()=>p.h,hE:()=>H.hE,hJ:()=>A.h,kc:()=>k.kc,ke:()=>f.ke,l6:()=>T.l,lM:()=>z.l,lm:()=>v.lm,lr:()=>h.l,mH:()=>x.mH,mb:()=>W.m,ms:()=>f.ms,nt:()=>C.n,oq:()=>l.o,pT:()=>g.pT,pd:()=>b.p,q6:()=>B.q6,q_:()=>P.q,rx:()=>f.rx,tU:()=>U.t,wv:()=>M.w,y$:()=>_.y,z9:()=>i.z,zZ:()=>f.Sk});var a=n(87613);n(8578);var i=n(14557),o=n(82212),r=n(97638),l=n(13800);n(63695);var c=n(37345),s=n(99427),p=n(23),d=n(9106);n(92674);var u=n(7711),m=n(42257),g=n(20285),y=n(61788);n(91961);var h=n(6213),f=n(82242);n(49416);var x=n(27461),C=n(84235);n(23888),n(38446);var E=n(48266),b=n(95513),k=n(65947);n(40289);var w=n(43885),S=n(59245);n(87020),n(45212);var v=n(42400),O=n(88260);n(49521);var A=n(31335),I=n(64744),D=n(40180);n(38940);var P=n(85934);n(45447);var R=n(43986);n(60397);var T=n(38437);n(29146);var $=n(59709),M=n(98942),B=n(66257),_=n(30665),L=n(37204),F=n(50782),U=n(23776),N=n(7207),z=n(33808),H=n(61994),W=n(45393)},85415:(e,t,n)=>{n.d(t,{Gm:()=>nn,Fe:()=>t2,ln:()=>tU,hj:()=>tM,Ni:()=>q,B0:()=>tN});var a=n(69670),i=n(14041),o=n(39716),r=n(15577),l=n(30665),c=n(94741),s=n(117),p=n(6717),d=function(e){return e.CancelPickElement="CancelPickElement",e.ChangedButtonPosition="ChangedButtonPosition",e.ChangedPanelOpen="ChangedPanelOpen",e.ClearAllClicked="ClearAllClicked",e.ClickPaginationSelectionCanceled="ClickPaginationSelectionCanceled",e.ClickPaginationSelectionFinished="ClickPaginationSelectionFinished",e.ClickPaginationSelectionPhaseStarted="ClickPaginationSelectionPhaseStarted",e.ClickPaginationSelectionPickStarted="ClickPaginationSelectionPickStarted",e.ClickedDiscard="ClickedDiscard",e.DiscardConfirmationRequested="DiscardConfirmationRequested",e.DiscardConfirmed="DiscardConfirmed",e.DiscardConfirmationCanceled="DiscardConfirmationCanceled",e.ClickedPlay="ClickedPlay",e.ClickedStop="ClickedStop",e.ConfirmationCanceled="ConfirmationCanceled",e.ContainerOperationListSorted="ContainerOperationListSorted",e.DeepCrawlPlayAborted="DeepCrawlPlayAborted",e.DeepCrawlRunButtonClicked="DeepCrawlRunButtonClicked",e.DeepCrawlSessionCanceled="DeepCrawlSessionCanceled",e.DeepCrawlSessionErrored="DeepCrawlSessionErrored",e.DeepCrawlSessionFinished="DeepCrawlSessionFinished",e.DeepCrawlStopButtonClicked="DeepCrawlStopButtonClicked",e.EditContainerDialogClosed="EditContainerDialogClosed",e.EditContainerDialogOpened="EditContainerDialogOpened",e.EditContainerDialogSubmitted="EditContainerDialogSubmitted",e.EditOperationDialogClosed="EditOperationDialogClosed",e.EditOperationDialogOpened="EditOperationDialogOpened",e.EditOperationDialogSubmitted="EditOperationDialogSubmitted",e.EditPaginationDialogClosed="EditPaginationDialogClosed",e.EditPaginationDialogOpened="EditPaginationDialogOpened",e.EditPaginationDialogSubmitted="EditPaginationDialogSubmitted",e.ExecuteActionOperationClicked="ExecuteActionOperationClicked",e.GotDeepCrawlExecutionResult="GotDeepCrawlExecutionResult",e.GotExecutionResult="GotExecutionResult",e.ImportOperationTriggered="ImportOperationTriggered",e.ImportOperationSubmitted="ImportOperationSubmitted",e.ImportOperationCanceled="ImportOperationCanceled",e.MinimizeBottomTableClicked="MinimizeBottomTableClicked",e.NameUpdated="NameUpdated",e.OperationDeleteTriggered="OperationDeleteTriggered",e.OperationListSorted="OperationListSorted",e.OperationUpdated="OperationUpdated",e.OperationNameUpdated="OperationNameUpdated",e.OperationsExecutionStarted="OperationsExecutionStarted",e.PickElementClickedStarted="PickElementClickedStarted",e.PickedContainerPaginationDirection="PickedContainerPaginationDirection",e.PickedContainerPaginationType="PickedContainerPaginationType",e.ListPicked="ListPicked",e.PickerModalItemExpandToggled="PickerModalItemExpandToggled",e.PickerModalItemInputChanged="PickerModalItemInputChanged",e.PickerModalItemSelected="PickerModalItemSelected",e.PickerModalSingleOperationSubmitFinished="PickerModalSingleOperationSubmitFinished",e.PickerModalSubmitStarted="PickerModalSubmitStarted",e.RegExpUpdatedInModal="RegExpUpdatedInModal",e.ListCompeted="ListCompeted",e.SetActiveContainerId="SetActiveContainerId",e.SetPhase="SetPhase",e.SetPickerModalAnchorAndItems="SetPickerModalAnchorAndItems",e.SetPickerModalItems="SetPickerModalItems",e.UntargettedOperationItemClicked="UntargettedOperationItemClicked",e.SecondListItemClicked="SecondListItemClicked",e.TablePicked="TablePicked",e.TableContainerOperationCreated="TableContainerOperationCreated",e}({}),u=function(e){return e.OperationsBuilderAction="OperationsBuilderAction",e.StartedDeepCrawlerSessionClicked="StartedDeepCrawlerSessionClicked",e.SubmittedMagicBoxValue="SubmittedMagicBoxValue",e.ConfirmMagicBoxSubmission="ConfirmMagicBoxSubmission",e.CancelMagicBoxSubmission="CancelMagicBoxSubmission",e.DeepCrawlerSessionStarted="DeepCrawlerSessionStarted",e.EditDeepCrawlerClicked="EditDeepCrawlerClicked",e.EditModelSettingsDialogOpened="EditModelSettingsDialogOpened",e.EditModelSettingsDialogSubmitted="EditModelSettingsDialogSubmitted",e.EditModelSettingsDialogClosed="EditModelSettingsDialogClosed",e.ChangedMagicBoxValue="ChangedMagicBoxValue",e.DeepCrawlSessionCanceled="DeepCrawlSessionCanceled",e.DeepCrawlSessionErrored="DeepCrawlSessionErrored",e.DeepCrawlSessionFinished="DeepCrawlSessionFinished",e.DeepCrawlSessionEditFinished="DeepCrawlSessionEditFinished",e.GotExecutionResult="GotExecutionResult",e.Finished="Finished",e.Canceled="Canceled",e.SetPhase="SetPhase",e.ExtendModelClicked="ExtendModelClicked",e.UseCurrentModelClicked="UseCurrentModelClicked",e.ConvertTableOperationClicked="ConvertTableOperationClicked",e.ConvertTableOperationFinished="ConvertTableOperationFinished",e.DeleteTableOperationClicked="DeleteTableOperationClicked",e.AgentLoopStateUpdated="AgentLoopStateUpdated",e.AgentLoopStarted="AgentLoopStarted",e.AgentLoopFinished="AgentLoopFinished",e.AgentLoopStopped="AgentLoopStopped",e.AgentLoopIndicatorUpdated="AgentLoopIndicatorUpdated",e.ClickedStopAgentLoop="ClickedStopAgentLoop",e.TrackableClicked="TrackableClicked",e}({}),m=n(88210),g=n(59998),y=n(28926),h=n(46288);let f={convertLegacyTableOperation:function(e,t){return async n=>{let{controller:a,dispatch:i}=n;i(t(await a.convertLegacyTableOperation(e)))}},editDeepCrawler:function(e){let{url:t,operation:n,rowNum:a,targetTableId:i,onDone:o}=e;return async e=>{let{controller:r,dispatch:l}=e;await r.editDeepCrawlerSession({operation:n,url:t,rowNum:a,targetTableId:i}),l(o())}},startDeepCrawler:function(e,t){let{url:n,operationId:a,targetTableId:i,rowNum:o}=e;return async e=>{let{controller:r,dispatch:l}=e,c=(0,h.A)();await r.startDeepCrawlerSession({url:n,sessionId:c,operationId:a,targetTableId:i,rowNum:o}),l(t())}},finish:function(e,t){return async n=>{let{controller:a}=n;await a.removeAllStyles(),await a.finish(e,t)}},cancel:function(){return async e=>{let{controller:t}=e;await t.cancel()}},executeOperations:function(e,t,n){return async a=>{let{controller:i,dispatch:o}=a;o(n(await i.executeMainScrapingOps(e,t,"main-session-result")))}},startAgentLoop:function(e){return async t=>{let{controller:n}=t;n.startAgentLoop(e)}},stopAgentLoop:function(){return async e=>{let{controller:t}=e;t.stopAgentLoop()}},saveOperationsState:function(e){return async t=>{let{controller:n}=t;await n.saveOperationsState(e)}}};var x=n(34946),C=n(31122),E=n(91159),b=n(37345),k=n(95513),w=n(38940),S=n(33808);let v=(0,n(85040).A)(()=>({optionsGroupWrapper:{marginTop:"10px"},additionalOptions:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"10px"},header:{color:a.NEG},footer:{marginTop:"10px",display:"flex",gap:"12px",justifyContent:"end"}}));function O(e){let{model:t,onSubmit:n,onCancel:a,canControlPremium:o}=e,{match:r}=t.settings,l=new URL(t.details.exampleUrls[0]||window.location.href),c=()=>r??p,s=t.details.premium??!1,p=(0,E.$f)(l.origin)+".*",[d,u]=(0,i.useState)(c()),[m,g]=(0,i.useState)(t.settings.cloudEnabled??!1),[h,f]=(0,i.useState)(!t.settings.bgRunTab.window||"minimized"===t.settings.bgRunTab.window),[x,O]=(0,i.useState)(s),[A,I]=(0,i.useState)(c()),D=v(),P=()=>{try{return new RegExp(A).test(l.href)}catch(e){return!1}},R=l.pathname.split("/").filter(e=>e);return i.createElement(y.aF,{"data-testid":"scraper-settings-dialog",isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - ModelSettings"},i.createElement("h2",{className:D.header},"Where should current template run?"),i.createElement(C.A,{value:d,onChange:(e,t)=>{u(t),"custom"!==t&&I(t)},className:D.optionsGroupWrapper},i.createElement(w.s,{value:".*",label:"Everywhere"}),i.createElement(w.s,{value:p,label:"On current domain"}),i.createElement(w.s,{value:"custom",label:"Custom (Regular expression)"})),i.createElement(k.p,{disabled:"custom"!==d,"data-testid":"scraper-match-input",error:!P(),onChange:I,style:{margin:"10px 0"},value:A,fullWidth:!0}),i.createElement(y.SD,{open:"custom"===d},i.createElement("a",{onClick:()=>I(p)},l.origin),i.createElement("span",{className:"separator"},"/"),R.map((e,t)=>i.createElement(i.Fragment,{key:e+t},i.createElement("a",{key:t,onClick:e=>{let n=R.splice(0,t+1);if(n.length>1){let e=n.pop();I((0,E.$f)(l.origin)+"\\/.*\\/"+(0,E.$f)(e??"")+"\\/.*")}else I((0,E.$f)(l.origin)+"\\/"+(0,E.$f)(n[0]??"")+"\\/.*")}},e),i.createElement("span",{className:"separator"},"/")))),i.createElement("h3",{className:D.header},"Additional options"),i.createElement("div",{className:D.additionalOptions},i.createElement(S.l,{size:"m",label:"Enable scraping on the cloud.",checked:m,onChange:g}),i.createElement("div",{style:{display:"flex"}},i.createElement(S.l,{size:"m",label:" Use minimized window for background scraping.",checked:h,onChange:f}),i.createElement(b.$n,{size:"xxs",icon:"InfoOutline",variant:"ghost",tooltipText:"This option is ignored when doing cloud or active tab scraping.",role:"presentation"})),o&&i.createElement(S.l,{size:"m",label:"Mark as premium template",checked:x,onChange:O})),i.createElement("div",{className:D.footer},i.createElement(b.$n,{disabled:!P(),onClick:()=>{n({...t,details:{...t.details,...o&&{premium:x}},settings:{...t.settings,match:A,cloudEnabled:m,bgRunTab:{...t.settings.bgRunTab,window:h?"minimized":"behind"}}})},text:"Save"}),i.createElement(b.$n,{variant:"outlined",onClick:()=>{u(c()),I(c()),O(s),a()},text:"Cancel"})))}var A=n(67331),I=n(8869),D=n(61994);function P(e){return i.createElement(T,{role:"dialog",$mode:e.mode??"dark"},i.createElement(y.Jn,{onClick:e.onCancel,abs:!0}),i.createElement($,null,e.children))}let R={light:"rgba(255, 255, 255, 0.95)",dark:"rgba(0, 0, 0, 0.88)"},T=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>R[e.$mode]};
`,$=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;function M(e){let{suggestions:t,model:n,dispatch:a}=e,[o,r]=i.useState(null);return i.createElement(I.Y,{id:"browser-agent-model-suggestion-modal","data-testid":"browser-agent-model-suggestion-modal",style:{position:"fixed",inset:0,zIndex:2},"data-tracking-context":"ModelSuggestion"},i.createElement(P,{onCancel:()=>a({type:u.Canceled}),mode:"light"},i.createElement("section",{style:{padding:"40px 48px",textAlign:"center"}},i.createElement(A.H2,{style:{marginBottom:32}},"Want to use a pre-built Scraper Template?"),i.createElement(B,{action:"",method:"dialog"},i.createElement(L,{role:"list"},t.map((e,t)=>{let{model:n}=e;return i.createElement(y.IU,{className:"item",key:`item-${t}`,onClick:()=>{t===o?r(null):r(t)}},i.createElement(_,null,n.details.faviconUrl?i.createElement(y.In,{icon:{url:n.details.faviconUrl},className:"icon",size:20}):null,i.createElement(D.EY,null,n.details.name),i.createElement(w.s,{checked:t===o,onChange:()=>""})))})),i.createElement(F,null,null!==o?i.createElement(i.Fragment,null,i.createElement(y.$n,{onClick:()=>{let e=t[o];e&&a({type:u.UseCurrentModelClicked,suggestion:e})},size:"l",variant:"primary",round:!0,text:"Use current model"}),i.createElement(y.$n,{onClick:()=>{let e=t[o]?.model;e&&(a({type:u.SetPhase,phase:"building"}),a({type:u.ExtendModelClicked,model:{...e,details:{...e.details,exampleUrls:[n.details.exampleUrls[0]],name:n.details.name}}}))},size:"l",variant:"outlined",round:!0,text:"Extend current model"})):i.createElement(y.$n,{onClick:()=>a({type:u.SetPhase,phase:"building"}),size:"l",variant:"outlined",round:!0,text:"No, I will build my own"}))))))}let B=o.Ay.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,_=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,L=o.Ay.div`
  position: relative;
  &:has(> :nth-of-type(4)) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center; /* vertical alignment */
  }
  & .item {
    height: auto;
    width: 100%;
    max-width: 400px;
    display: flex;
    & span {
      margin: 0 8px;
      flex: 1;
      text-align: start;
    }
  }
`,F=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`,U=(0,o.Ay)(y.$n)`
  border: none;
  background-color: ${a.XxH};
  position: sticky;
  bottom: 0;
  margin-top: 16px;
`;var N=n(16335),z=n(49830),H=n(45250),W=n(41716);let q=e=>{let{cancelPickElement:t,pickElement:n}=e,[a,o]=(0,i.useState)(new Date);return(0,i.useEffect)(()=>{setTimeout(()=>o(new Date),3e4);let e=(0,h.A)();return n(e),()=>{t(e)}},[n,t,a]),i.createElement(i.Fragment,null)},G=e=>{if("scraper"===e.group)switch(e.type){case"attribute":case"socImage":case"description":return"TexturedCodeBox";case"text":return"TexturedScraperText";case"link":return"TexturedLink";case"clipboard":return"TexturedClipboard";case"timestamp":return"TexturedDelayBox";case"title":return"TexturedTextBox";case"url":return"TexturedUrlBox";case"image":return"TexturedScraperImage";default:return"TexturedSingleScraper"}else if("action"===e.group)switch(e.type){case"click":return"CursorOutline";case"input":return"InputOutline";case"hover":case"focus":return"HoverOutline";case"enter":return"PressEnterOutline";case"contentLoad":return"TexturedCodeBox";default:return"TexturedSingleScraper"}else"container"===e.group||e.group;return"TexturedListScraper"};function j(e,t,n){let a=(n=(0,H.capitalize)(n))&&("input"===e||"click"===e)?n:(0,H.capitalize)(e)+(n&&!(0,g.LB)(e)?n:"");if(!(0,g.LB)(e)&&!t.includes(a))return a;let i=1;for(;t.includes(`${a}${i}`);)i++;return`${a}${i}`}var V=n(1970);let X=new Map([["delay",{label:"Delay",placeholder:"Delay in seconds",icon:"TexturedDelay"}],["clipboard",{label:"Extract from Clipboard",icon:"TexturedClipboard"}],["socImage",{label:"Meta image",icon:"TexturedCodeBox"}],["description",{label:"Meta description",icon:"TexturedCodeBox"}],["url",{label:"Page link",icon:"TexturedUrlBox"}],["title",{label:"Page title",icon:"TexturedTextBox"}],["timestamp",{label:"Time scraped",icon:"TexturedDelayBox"}],["contentLoad",{label:"Content load",icon:"TexturedCodeBox"}],["navigate",{label:"Navigate",icon:"TexturedUrlBox"}]]),Y={clipboard:{group:"scraper",type:"clipboard",id:"Temp_ID",name:"Description",schema:"string"},socImage:{group:"scraper",type:"socImage",id:"Temp_ID",name:"Image",schema:"url"},delay:{group:"action",id:"Temp_ID",type:"delay",timeout:1e3},title:{group:"scraper",id:"Temp_ID",type:"title",name:"Title",schema:"string"},url:{group:"scraper",id:"Temp_ID",type:"url",name:"URL",schema:"url"},contentLoad:{group:"action",id:"Temp_ID",type:"contentLoad"},navigate:{group:"action",id:"Temp_ID",type:"navigate",name:"Navigate",url:""},description:{group:"scraper",id:"Temp_ID",type:"description",name:"Description",schema:"string"},timestamp:{group:"scraper",id:"Temp_ID",type:"timestamp",name:"Time Scraped",schema:"date"}},K=Array.from(X).map(e=>{let[t,n]=e;return{label:n.label,value:t,icon:n.icon}}),Q=e=>{let t=(0,i.useCallback)(t=>{e.onSelect({...Y[t],id:(0,h.A)()})},[e]);return i.createElement(y.ms,{placement:"bottom-start",behavior:"flip",renderContent:e=>{let{close:n}=e;return i.createElement(i.Fragment,null,K.map(e=>i.createElement(y.IU,{key:e.value,text:e.label,icon:e.icon,onClick:()=>{t(e.value),n()}})))}},e.children)},J=e=>{let{agentLoopStatus:t,onPlay:n,onStop:o,onClearAll:r,onAdd:l}=e;return i.createElement(Z,null,i.createElement(Q,{onSelect:l},i.createElement(y.$n,{variant:"flat",tooltipText:"Add",icon:"PlusOutline",color:a.Tc2})),"running"===t&&o?i.createElement(y.$n,{tooltipText:"Stop AI template generation",variant:"flat",onClick:o,icon:"RadioStopBold",color:a.Tc2}):null,i.createElement(y.$n,{tooltipText:"Clear all",variant:"flat",onClick:r,icon:"DiscardOutline",color:a.Tc2}))},Z=(0,o.Ay)(y.fI)`
  justify-content: space-between;
  border-top: 1px solid ${a.Tc2};
  padding: 0 24px;
  height: 56px;
`;var ee=n(36836);function et(e){let{tooltip:t,icon:n,items:a}=e;return i.createElement(y.ms,{behavior:"flip",renderContent:e=>{let{close:t}=e;return i.createElement(i.Fragment,null,a?.map(e=>{let{id:n,label:a,handler:o}=e;return i.createElement(y.IU,{key:n,text:a,onClick:()=>{t(),o(n)}})}))}},i.createElement(y.$n,{icon:n,tooltipText:t,size:"m",variant:"flat",round:!0}))}let en=o.Ay.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  max-height: 320px;
  height: 100%;
  border-bottom: 0.5px solid ${a.MfC};
  border-right: 0.5px solid ${a.MfC};
  background-color: ${a.ONy};

  .no-result {
    align-items: center;
    justify-content: center;
    height: 100%;
    display: flex;
  }
`,ea=o.Ay.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 333px;
  transition: all 0.24s ease-in-out;
  color: ${a.vh3};
  padding: 14px 16px;
  font-weight: 500;
  text-align: start;
  border-radius: 8px;
  &:hover {
    background-color: ${a.KxS};
    color: ${a.t14};
  }
`,ei=o.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 300px;
`,eo=o.Ay.table`
  border-collapse: separate;
  border-spacing: 0;

  col {
    border: 0px solid ${a.Tc2};
    background-color: ${a.o$k};
  }

  th {
    background-clip: padding-box;
    position: sticky;
    top: 0px;
    background-color: ${a.ONy};
  }

  td {
    border: 2px solid ${a.hi1};
    border-width: 1px 2px;
    text-align: start;

    &:not(:first-of-type) {
      background-color: ${a.ONy};
      width: 333px;
      padding: 12px 16px;
    }

    &:first-of-type {
      // numbers
      background-color: ${a.hi1};
      box-shadow: 0px 2px 6px 0px #0000000f;
      text-align: center;
    }
  }
`,er=e=>{let{columns:t,rows:n}=e,[a,o]=(0,i.useState)(10),r=i.createRef();return t.length&&n.length?i.createElement(en,{onScroll:e=>{e.currentTarget.scrollTop+e.currentTarget.clientHeight>=e.currentTarget.scrollHeight&&o(e=>e+10)},ref:r},i.createElement(eo,null,i.createElement("colgroup",null,e.columns.map((e,t)=>i.createElement("col",{key:t})),i.createElement("col",null)),i.createElement("thead",null,i.createElement("tr",null,i.createElement("th",null),t.map(e=>{let{actions:t,label:n,icon:a,id:o,onLabelChange:r}=e;return i.createElement("th",{key:o},i.createElement(ea,null,a&&i.createElement(y.In,{icon:a,className:"icon",size:20}),i.createElement(ee.w,{value:n,placeholder:n,onSave:e=>r?.({columnId:o,label:e||n})}),t?i.createElement(et,{tooltip:"More Options",icon:"OverflowVerticalOutline",items:t.map(e=>({id:e.id,label:e.title,handler:t=>{e.handler({columnId:o,actionId:t})}}))}):null))}))),i.createElement("tbody",{"data-tracking-ignore":!0},n.slice(0,a).map((e,n)=>i.createElement("tr",{key:n},i.createElement("td",{key:`cell${n}-0`},i.createElement(ei,{style:{width:"52px"}},n+1)),t.map((t,a)=>{let{id:o}=t;return i.createElement("td",{key:`cell${n}-${a}`},i.createElement(ei,{title:e[o]},e[o]))})))))):i.createElement(en,null,i.createElement("div",{className:"no-result"},"No rows"))},el=e=>{let{title:t,onTitleChange:n,onMinimize:a,minimized:o}=e;return i.createElement(ec,null,i.createElement(es,null,i.createElement(y.In,{icon:"TexturedListScraper",size:20})),i.createElement(ed,null,i.createElement(ep,{onSave:n,value:t,placeholder:"Name your agent"})),i.createElement(eu,null,i.createElement(y.$n,{round:!0,icon:o?"ExpandOutline":"ShrinkOutline",onClick:a,tooltipText:o?"Expand":"Minimize",variant:"flat",size:"m"})))},ec=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${a.Tc2};
  border-radius: 16px 16px 0 0;
  background-color: ${a.ONy};
  height: 56px;
  gap: 16px;
`,es=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  background-color: ${a.KxS};
  height: 100%;
  width: 52px;
`,ep=(0,o.Ay)(ee.w)`
  color: ${a.t14};
  flex-grow: 1;
`,ed=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  flex: 1;
  min-width: 0;
`,eu=o.Ay.div`
  display: flex;
  gap: 4px;
  padding-inline-end: 14px;
`,em=e=>{let{bottomTableState:t,dispatch:n,operations:a,name:o,executionResult:{tabularData:r}}=e,l=(r?.data||[]).map(e=>{let{records:t={}}=e,n={};for(let[e,a]of Object.entries(t))n[e]=a.toString()||"";return n});if((0,g.mC)(a))throw Error("Not implemented");let c=(0,g.OT)(a),s=new Set,p=c.filter(e=>!s.has(e.name)&&(s.add(e.name),!0)).map(e=>({label:e.name||"undefined",id:e.name,icon:G(e),actions:[{id:"delete",title:"Delete",handler:()=>n({type:d.OperationDeleteTriggered,operation:e})},{id:"edit",title:"Edit",handler:()=>n({type:d.EditOperationDialogOpened,operation:e})}],onLabelChange:t=>{let{label:a}=t;n({type:d.OperationUpdated,operation:{...e,name:a}})}}));return i.createElement(ey,{$isMinimized:t.minimized,$buttonPosition:e.panelPosition,$isPanelOpen:e.panelOpen,"data-testid":"preview-table","data-tracking-context":"PreviewTable"},i.createElement(eg,{id:"preview-table",$isMinimized:t.minimized},i.createElement(el,{title:o,onTitleChange:e=>{n({type:d.NameUpdated,name:e})},onMinimize:()=>{n({type:d.MinimizeBottomTableClicked})},minimized:t.minimized}),i.createElement(er,{columns:p,rows:l})))},eg=(0,o.Ay)(V.Y)`
  max-height: ${e=>{let{$isMinimized:t}=e;return t?"56px":"320px"}};
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${a.Tc2};
  transition: max-height 0.3s ease-in-out;
`,ey=o.Ay.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  max-width: calc(100vw - 64px);
  transition: all 0.24s ease-in-out;
  ${e=>{let{$buttonPosition:t,$isPanelOpen:n}=e;switch(t){case"top-left":return n?(0,o.AH)`
              left: 448px;
              max-width: calc(100vw - 480px);
            `:null;case"top-right":return n?(0,o.AH)`
              max-width: calc(100vw - 480px);
            `:null;case"bottom-left":if(n)return(0,o.AH)`
            left: 448px;
            max-width: calc(100vw - 480px);
          `;return(0,o.AH)`
          left: 122px;
          max-width: calc(100vw - 154px);
        `;case"bottom-right":if(n)return(0,o.AH)`
            left: 32px;
            max-width: calc(100vw - 480px);
          `;return(0,o.AH)`
          left: 32px;
          max-width: calc(100vw - 154px);
        `}}}
`;function eh(e){let{children:t,initialCoords:n,draggingRef:a,...o}=e,r={startX:n?n.left:14,startY:n?n.top:14},l=i.useRef(null),c=i.useRef(n||{top:14,left:14}),s=i.useRef(r),p=i.useRef(!1),d=()=>{let e=l.current,t=e?.children[0];if(e&&t){let n=t.getBoundingClientRect();n.x+n.width+15>window.innerWidth&&(e.style.left=`${window.innerWidth-(n.width+15)}px`),n.y+n.height+15>window.innerHeight&&(e.style.top=`${window.innerHeight-(n.height+15)}px`)}};return i.useEffect(()=>{let e=e=>{let t=l.current,n=a?.current||l.current;if(n&&(n.style.cursor="grabbing"),t&&e.target&&e.target instanceof Node&&t.contains(e.target)){let{left:n,top:a}=t.getBoundingClientRect();p.current=!0,c.current={left:n,top:a},s.current={startX:e.clientX,startY:e.clientY}}},t=e=>{let t=l.current;if(t&&p.current){let n=t.getBoundingClientRect(),{left:a,top:i}=c.current,{startX:o,startY:r}=s.current,l=window.innerWidth-n.width-15,p=window.innerHeight-n.height-15,d=Math.max(Math.min(a+e.clientX-o,l),15),u=Math.max(Math.min(i+e.clientY-r,p),15);t.style.left=d+"px",t.style.top=u+"px",t.style.bottom="auto"}},n=()=>{p.current=!1;let e=a?.current||l.current;e&&(e.style.cursor="grab")},i=a?.current||l.current;return i&&i.addEventListener("mousedown",e),document.addEventListener("mousemove",t),document.addEventListener("mouseup",n),window.addEventListener("resize",d),()=>{document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",n),window.removeEventListener("resize",d),i&&i.removeEventListener("mousedown",e)}},[a]),i.createElement(ef,{ref:l,...o,$initialCoords:n,$draggable:!a},t)}let ef=o.Ay.div`
  position: fixed;
  top: ${e=>{let{$initialCoords:t}=e;return`${t?t.top:14}px`}};
  left: ${e=>{let{$initialCoords:t}=e;return`${t?t.left:14}px`}};
  cursor: ${e=>{let{$draggable:t}=e;return t?"grab":"auto"}};

  z-index: ${0x7ffffdaa};
`;var ex=n(18255),eC=n(93269),eE=n(66257),eb=n(39629);let ek=i.memo(e=>0===i.Children.toArray(e.children).filter(eb.zz).length?null:i.createElement(y.ms,{autoCloseOnContentClick:!0,renderContent:()=>e.children},i.createElement(y.$n,{icon:"OverflowVerticalOutline",variant:"flat",round:!0,tooltipText:"More Options"}))),ew=e=>i.createElement(eI,{"data-testid":"operation-item"},!e.isMainContainer&&i.createElement(eP,null),i.createElement(y.In,{icon:e.icon,size:16}),i.createElement(eD,null,e.text),e.children),eS=e=>{let{activeContainerId:t,runningDeepCrawlerId:n,operation:a,dispatch:o,isMainContainer:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,hideMenu:s,ContainerComponent:p,DeepCrawlComponent:u}=e,m=()=>o({type:d.OperationDeleteTriggered,operation:a}),h="action"===a.group||"scraper"===a.group?()=>o({type:d.EditOperationDialogOpened,operation:a}):void 0,f="scraper"===a.group&&"url"===a.schema&&l?()=>l(a):null,x=e=>i.createElement(ew,{isMainContainer:r,icon:G(a),text:e},i.createElement(ek,null,f?i.createElement(y.IU,{onClick:f},"Start deep crawl"):null,s?null:i.createElement(y.IU,{onClick:m},"Delete"),!s&&h?i.createElement(y.IU,{onClick:h},"Edit"):null)),C=a.id===n,E=!!(!C&&n),b=()=>{switch(a.group){case"action":let e=["input","click","enter","focus","hover","unhover"].includes(a.type);if("delay"===a.type)return x(i.createElement(eT,{operation:a,dispatch:o}));if(e)return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eC.S,{Component:eR,onChange:e=>o({type:d.OperationNameUpdated,operationId:a.id,name:e}),addonAfter:i.createElement(y.$n,{"aria-label":"content-play-button",onClick:()=>{o({type:d.ExecuteActionOperationClicked,operationId:a.id})},tooltipText:"Execute action",icon:"RadioPlayBold",variant:"ghost",round:!0}),value:a.name??"",hideEditIcon:!!a.name,autoFocus:!0,editIconTooltipText:"Edit name"})));return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eC.S,{Component:eR,onChange:e=>o({type:d.OperationNameUpdated,operationId:a.id,name:e}),value:a.name??"",hideEditIcon:!!a.name,autoFocus:!0,editIconTooltipText:"Edit name"})));case"scraper":return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eC.S,{Component:eR,onChange:e=>o({type:d.OperationNameUpdated,operationId:a.id,name:e}),value:a.name,autoFocus:!0,hideEditIcon:!!a.name,editIconTooltipText:"Edit name"})));case"container":return i.createElement(p,{isActiveContainer:t===a.id,container:a,onSortEnd:e=>{o({type:d.ContainerOperationListSorted,operations:e,id:a.id})},dispatch:o,onStartDeepCrawlerClicked:l,hideMenu:s});case"deepCrawl":return i.createElement(u,{isRunning:C,isActionDisabled:E,deepCrawl:a,onSortEnd:()=>{},dispatch:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c});case"fetch":return null}};return i.createElement(eE.Uq,{id:a.id},r?i.createElement(eO,{role:"listitem",$selected:a.id===t,$isSingleOperation:(0,g.iz)(a),onClick:()=>{if((0,g.iz)(a))return}},b()):i.createElement(eA,{role:"listitem"},b()))},ev=e=>{let{container:t,dispatch:n}=e,a=t.pagination,{type:o}=a,r=["none","click","scroll"];return i.createElement(eA,{style:{display:"flex",gap:8,alignItems:"center"}},i.createElement(ew,{isMainContainer:!1,icon:"TexturedThreeDotsBox",text:"Pagination"}),i.createElement(y.ms,{renderContent:e=>{let{close:a}=e;return i.createElement(i.Fragment,null,r.map(e=>i.createElement(y.IU,{key:e,text:e,onClick:()=>{switch(e){case"click":n({type:d.ClickPaginationSelectionPhaseStarted,container:t});break;case"scroll":n({type:d.PickedContainerPaginationType,container:t,pagination:{type:"scroll",direction:"down"}});break;case"none":n({type:d.PickedContainerPaginationType,container:t,pagination:{type:"none"}})}a()}})))}},i.createElement(y.$n,{text:o,variant:"outlined",size:"m",icon:"ArrowDownOutline",iconPosition:"right"})),"click"===a.type?i.createElement(y.fI,{style:{flex:1,flexDirection:"row-reverse"}},i.createElement(y.$n,{icon:"PencilOutline",tooltipText:"Edit pagination",variant:"ghost",size:"s",onClick:()=>{n({type:d.EditPaginationDialogOpened,container:t,paginationClick:a})}})):"scroll"===a.type?i.createElement(y.fI,{style:{flex:1,flexDirection:"row-reverse"}},i.createElement(y.ms,{renderContent:e=>{let{close:a}=e;return i.createElement(i.Fragment,null,i.createElement(y.IU,{text:"Down",onClick:()=>{n({type:d.PickedContainerPaginationDirection,container:t,direction:"down"}),a()}}),i.createElement(y.IU,{text:"Up",onClick:()=>{n({type:d.PickedContainerPaginationDirection,container:t,direction:"up"}),a()}}),i.createElement(y.IU,{text:"Left",onClick:()=>{n({type:d.PickedContainerPaginationDirection,container:t,direction:"left"}),a()}}),i.createElement(y.IU,{text:"Right",onClick:()=>{n({type:d.PickedContainerPaginationDirection,container:t,direction:"right"}),a()}}))}},i.createElement(y.$n,{text:"",variant:"outlined",size:"m",icon:e$(a.direction||"down"),iconPosition:"right"}))):null)},eO=o.Ay.li`
  ${e=>{let{$isSingleOperation:t}=e;return t&&"padding: 8px 16px"}};
  border-radius: 8px;
  background-color: ${a.ONy};
  border: 1px solid ${a.Tc2};
  box-shadow: 0px 2px 4px 0px #0000000a;
  cursor: pointer;
  transition:
    color 0.24s ease-in-out,
    outline-color 0.24s ease-in-out;
  outline: 2px solid transparent;
  &:hover {
    outline-color: ${a.Q_2};
    color: ${a.t14};
  }

  ${e=>{let{$selected:t}=e;return t&&`outline-color: ${a.wB3}; color: ${a.t14};`}}
`,eA=o.Ay.li`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${a.ONy};
  cursor: pointer;
  transition:
    background-color 0.24s ease-in-out,
    outline-color 0.24s ease-in-out;
  outline: 2px solid transparent;
  --icon-color: ${a.pHq};
  &:hover {
    --icon-color: ${a.NcT};
    background-color: ${a.KxS};
    color: ${a.t14};
  }
`,eI=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,eD=(0,o.Ay)(A.P)`
  font-size: 14px;
  flex-grow: 1;
  line-height: 20px;
`,eP=o.Ay.div`
  width: 24px;
  height: 24px;
  width: 18px;
  height: 18px;
  position: relative;
  border-radius: 4px;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    border: 1px solid var(--icon-color);
    border-top: none;
    border-right: none;
    border-bottom: 1px solid var(--icon-color);
    border-left: 1px solid var(--icon-color);
    border-radius: 0 4px 0 4px;
  }
`,eR=o.Ay.span`
  word-break: break-word;
`,eT=e=>{let{operation:t,dispatch:n}=e,{timeout:a}=t;return i.createElement(y.fI,{gap:4},i.createElement("span",null,"delay:"),i.createElement(eC.S,{Component:eR,onChange:e=>{let a=parseInt(e,10);!isNaN(a)&&a>0&&n({type:d.OperationUpdated,operation:{...t,timeout:a}})},value:a.toString(),autoFocus:!0,editIconTooltipText:"Edit name"}),i.createElement("span",null,"ms"))},e$=e=>{switch(e){case"down":return"ArrowDownOutline";case"up":return"ArrowUpOutline";case"left":return"ArrowLeftOutline";case"right":return"ArrowRightOutline"}},eM=e=>{let{activeContainerId:t,runningDeepCrawlerId:n,operations:a,onSortEnd:o,dispatch:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c}=e;return i.createElement(y.q6,{onItemsReorder:o,items:a},i.createElement(eL,{role:"list",$isMainContainer:!0},a.map(e=>i.createElement(eS,{activeContainerId:t,runningDeepCrawlerId:n,key:e.id,operation:e,dispatch:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,isMainContainer:!0,ContainerComponent:eB,DeepCrawlComponent:e_}))))},eB=e=>{let{container:t,onSortEnd:n,dispatch:a,onStartDeepCrawlerClicked:o,hideMenu:r,isActiveContainer:l}=e,{operations:c,name:s}=t;return i.createElement(y.q6,{onItemsReorder:n,items:c},i.createElement(eL,{role:"list"},i.createElement(eF,null,i.createElement(y.In,{icon:"TexturedListScraper",size:16}),i.createElement(eN,null,i.createElement(eC.S,{Component:ez,onChange:e=>a({type:d.OperationNameUpdated,operationId:t.id,name:e}),value:s??"",autoFocus:!0,hideEditIcon:!!s,editIconTooltipText:"Edit name"})),i.createElement(y.$n,{icon:l?"RadioCrossBold":"RadioCheckmarkBold",variant:"flat",tooltipText:l?"Deactivate":"Activate",size:"m",round:!0,onClick:()=>{a({type:d.SetActiveContainerId,id:l?null:t.id})}}),r?null:i.createElement(ek,null,i.createElement(y.IU,{onClick:()=>a({type:d.OperationDeleteTriggered,operation:t})},"Delete"),i.createElement(y.IU,{onClick:()=>a({type:d.EditContainerDialogOpened,operation:t})},"Edit"),l?i.createElement(y.IU,{onClick:()=>a({type:d.SetActiveContainerId,id:null})},"Deactivate"):i.createElement(y.IU,{onClick:()=>a({type:d.SetActiveContainerId,id:t.id})},"Activate"))),i.createElement(ev,{container:t,dispatch:a}),c.map(e=>i.createElement(eS,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:a,onStartDeepCrawlerClicked:o,onEditDeepCrawlerClicked:null,hideMenu:r,ContainerComponent:eB,DeepCrawlComponent:e_}))))},e_=e=>{let{isRunning:t,isActionDisabled:n,deepCrawl:a,onSortEnd:o,dispatch:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c}=e,{operations:s,name:p,id:u}=a;return i.createElement(y.q6,{onItemsReorder:o,items:s},i.createElement(eL,{role:"list"},i.createElement(eF,null,i.createElement(y.In,{icon:"SquareOutline",size:16}),i.createElement(eN,null,i.createElement(eC.S,{Component:ez,onChange:e=>r({type:d.OperationNameUpdated,operationId:a.id,name:e}),value:p??"",autoFocus:!0,hideEditIcon:!!p,editIconTooltipText:"Edit name"})),t?i.createElement(eU,{icon:"RadioStopBold",variant:"flat",tooltipText:"Stop",size:"m",round:!0,onClick:()=>{r({type:d.DeepCrawlStopButtonClicked})}}):i.createElement(eU,{icon:"RadioPlayBold",disabled:n,variant:"flat",tooltipText:"Run and populate (3 results)",size:"m",round:!0,onClick:()=>{n||r({type:d.DeepCrawlRunButtonClicked,operationId:u,limit:3})}}),i.createElement(ek,null,i.createElement(y.IU,{onClick:()=>r({type:d.OperationDeleteTriggered,operation:a})},"Delete"),i.createElement(y.IU,{onClick:()=>c?.(a)},"Edit"))),s.map(e=>i.createElement(eS,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,hideMenu:!0,ContainerComponent:eB,DeepCrawlComponent:e_}))))},eL=o.Ay.ul`
  padding-inline: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{$isMainContainer:t}=e;return t?"8px":"0px"}};
`,eF=o.Ay.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
`,eU=(0,o.Ay)(y.$n)``,eN=o.Ay.div`
  flex-grow: 1;
`,ez=o.Ay.span`
  word-break: break-word;
  line-break: anywhere;
  font-size: 14px;
  font-weight: 600;
`;var eH=n(78406);let eW=(0,o.Ay)(y.VP)`
  width: 480px;
  max-height: 400px;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.06);
  background-color: ${a.ONy};
  padding: 8px;
`,eq=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,eG=o.Ay.span`
  color: ${a.FCg};
  font-size: 12px;
  margin-inline-start: 16px;
  display: inline-block;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ej=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${a.ONy};
  position: sticky;
  padding: 8px;
  margin: -8px;
  bottom: -8px;
`;function eV(e){let{state:t,dispatch:n}=e,{items:a}=t,o=e=>{let t=e=>{n({type:d.PickerModalItemSelected,item:e})},a=(e,t)=>{n({type:d.PickerModalItemInputChanged,item:e,value:t})};return e.map(e=>{switch(e.type){case"item":if(!e.emptyValue&&!e.value)return null;return i.createElement(i.Fragment,null,i.createElement(y.IU,{onClick:()=>t(e),key:`${e.label}-${e.value}`,icon:e.icon,rightAddon:i.createElement(i.Fragment,null,i.createElement(eG,{title:e.value,style:{marginRight:16}},e.value),i.createElement(y.Sc,{checked:e.selected,onChange:()=>{}})),"aria-label":e.label},e.label),e.selected&&void 0!==e.input&&i.createElement(y.IU,{onClick:()=>"",key:`${e.label}-${e.value}-input`},e.options?i.createElement(y.l6,{options:e.options,value:e.input||e.options[0]?.value||"",onChange:t=>a(e,t),fullWidth:!0}):i.createElement(y.pd,{autoFocus:!0,placeholder:e.inputPlaceholder,value:e.input,fullWidth:!0,size:"l",onChange:t=>a(e,t)})));case"expandable":if(!e.items.length)return null;return i.createElement(i.Fragment,null,i.createElement(eY,{key:`header-${e.label}`},e.label),o(e.items));case"header":return i.createElement(eY,{key:`header-${e.label}`},e.label);case"button":return i.createElement(y.IU,{onClick:()=>n({type:d.PickerModalSubmitStarted,items:[{type:e.operation,input:void 0}]}),key:`${e.label}-${e.operation}`,icon:e.icon,"aria-label":e.label},e.label);default:return null}})},r=e=>{let t=[],n=e=>{for(let a of e)if("item"===a.type&&a.selected){let e=a.operation;t.push({type:e,input:"attribute"===e?a.label:a.input})}else"expandable"===a.type&&n(a.items)};return n(e),t};return 0===a.length?null:i.createElement(V.Y,{id:"picker-modal",style:{position:"fixed",inset:0,zIndex:2},"data-tracking-context":"PickerModal"},i.createElement(eH.k,{open:a.length>0,rect:t.anchor??null,onClose:()=>n({type:d.SetPickerModalItems,items:[]}),"data-testid":"picker-modal"},i.createElement(eW,null,i.createElement(eq,null,o(a)),i.createElement(ej,null,i.createElement(y.$n,{fullWidth:!0,onClick:()=>n({type:d.PickerModalSubmitStarted,items:r(a)}),disabled:!r(a).length,size:"l",variant:"primary",text:(()=>{let e=a.some(e=>{if("item"!==e.type)return!1;let t=e.operation;return!!(e.selected&&("table"===t||(0,g.LB)(t)))}),t=!a.some(e=>"item"===e.type&&e.selected);return e||t?"Get data":"Trigger action"})()})))))}let eX=(e,t)=>e.map(e=>"expandable"===e.type?t({...e,items:eX(e.items,t)}):t(e)),eY=(0,o.Ay)(D.EY)`
  font-size: 14px;
  font-weight: 600;
  color: ${a.CP};
  padding: 14px 16px;
`;var eK=n(7696),eQ=n(80694);let eJ=o.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 160px;
  overflow: auto;
  margin-inline: -24px;
  padding-inline: 24px;
`,eZ=i.memo(function(e){let{value:t,onChange:n}=e,a=i.useCallback(e=>{let a=[...t];a.splice(e,1),n(a)},[n,t]),o=i.useCallback((e,a)=>{n(t.map((t,n)=>n===e?a:t))},[n,t]),r=i.useCallback(()=>{n([...t,{type:"CSS",selector:"tagname.className"}])},[n,t]);return i.createElement(i.Fragment,null,i.createElement(e2,null,i.createElement(y.fI,{style:{justifyContent:"space-between"}},i.createElement("legend",null,"Selectors"),i.createElement("legend",null,"XPath")),i.createElement(eJ,{"data-testid":"selectors-list"},t.map((e,t)=>i.createElement(e0,{key:t},i.createElement(y.dN.Outline,{style:{width:"100%"},round:!0,variant:e1(e)?"default":"danger",value:e.selector,onChange:n=>o(t,{...e,selector:n})}),i.createElement(y.$n,{variant:"outlined",round:!0,onClick:()=>a(t),icon:"TrashBinOutline",tooltipText:"Delete selector",size:"m"}),i.createElement(y.Sc,{checked:"XPath"===e.type,onChange:n=>o(t,{...e,type:n?"XPath":"CSS"})}))))),i.createElement(y.$n,{variant:"outlined",round:!0,onClick:r,size:"m",text:"Add permutation",fullWidth:!0}))}),e0=o.Ay.li`
  display: flex;
  margin-top: 3px;
  align-items: center;
  gap: 8px;
  width: 100%;
`,e1=e=>{let{selector:t,type:n}=e;try{if("XPath"===n){let e=XPathResult.FIRST_ORDERED_NODE_TYPE;document.evaluate(t,document.body,null,e,null)}else{let e=t.split(">>>"),n=document.createDocumentFragment();e.length>1?e.forEach(e=>n.querySelector(e)):n.querySelector(t)}}catch{return!1}return!0},e2=o.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;function e4(e){let[t,n]=(0,i.useState)(e.operation),{type:a}=t,o=e=>0===e?1:e/1e3,r=e=>1e3*e,l="delay"===t.type?o(t.timeout??1e3):1,c="contentLoad"===t.type?o(t.timeout??eQ.f):1,s="contentLoad"===t.type?o(t.interval??eQ.X):1,[p,d]=(0,i.useState)(l.toString()),[u,m]=(0,i.useState)(c.toString()),[h,f]=(0,i.useState)(s.toString());return i.createElement(y.aF,{isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - Update"},i.createElement(e6,{action:"",method:"dialog",onSubmit:n=>{n.preventDefault(),(!(0,g.kw)(t)||t.selectors.every(e1))&&("delay"===a?e.onUpdate({...t,timeout:r(parseFloat(p))}):"contentLoad"===a?e.onUpdate({...t,timeout:r(parseFloat(u)),interval:r(parseFloat(h))}):e.onUpdate(t),e.onClose())}},"scraper"===t.group||"input"===a?i.createElement(e8,{label:"Field name"},e=>i.createElement(y.dN.Outline,{round:!0,id:e,value:t.name||"",onChange:e=>n({...t,name:e}),required:!0})):null,"input"===a?i.createElement(e9,{label:"Input value",value:t.value??"",onChange:e=>n({...t,value:e})}):null,"attribute"===a?i.createElement(e9,{label:"Attribute",value:t.attribute,onChange:e=>n({...t,attribute:e})}):null,"delay"===a?i.createElement(e7,{label:"Delay (seconds)",value:p,onChange:d}):null,"contentLoad"===a?i.createElement(i.Fragment,null,i.createElement(e7,{label:"Content load timeout (seconds)",value:u,onChange:m}),i.createElement(e7,{label:"Interval of content load checks (seconds)",value:h,onChange:f})):null,i.createElement("div",null,(0,g.kw)(t)?i.createElement(y.YE,{title:"Selectors (advanced)"},i.createElement(eZ,{value:t.selectors,onChange:e=>n({...t,selectors:e})})):null,"scraper"===t.group?i.createElement(y.YE,{title:"Lookup and Q/A setup (advanced)"},i.createElement(te,{operation:t,setOperation:n,onRegExpUpdate:e.onRegExpUpdate})):null),"image"===a?i.createElement(e8,{label:"When to take screenshot"},e=>i.createElement(y.l6,{id:e,value:t.screenshot,options:[{label:"Always",value:"always"},{label:"No data",value:"no-data"},{label:"Never",value:"never"}],onChange:e=>n({...t,screenshot:e})})):null,"input"===a?i.createElement(y.lM,{checked:!!t.exactSelectBoxMatch,onChange:()=>n({...t,exactSelectBoxMatch:!t.exactSelectBoxMatch}),label:"Ensure exact match for native selectbox values"}):null,"scraper"===t.group&&"text"===a?i.createElement("div",null,i.createElement(y.lM,{checked:t.withRender??!1,onChange:()=>n({...t,withRender:!t.withRender}),label:"Preserve rendered features."})):null,i.createElement(e5,null,i.createElement(y.$n,{type:"submit",text:"Save",round:!0,size:"l",disabled:!(()=>{if("delay"===a||"contentLoad"===a){let e=/^\d*\.?\d*$/;if(!e.test(p)||!e.test(u)||!e.test(h))return!1}return"delay"===a?parseFloat(p)>0:"contentLoad"===a?parseFloat(u)>0&&parseFloat(h)>0:!("lookup"in t)||t.lookup?.type!=="regExp"||!!(0,eK.y)(t.lookup.expression)})()}),i.createElement(y.$n,{onClick:e.onClose,type:"reset",text:"Cancel",variant:"outlined",size:"l",round:!0}))))}let e6=o.I4.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: 400px;
`,e8=(0,o.I4)(e=>{let t=i.useId();return i.createElement("div",null,i.createElement("label",{htmlFor:t},e.label),e.children(t))})`
  display: flex;
  gap: 8px;
  flex-direction: column;
`,e3=o.I4.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,e5=o.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,e9=e=>i.createElement(e8,{label:e.label},t=>i.createElement(y.dN.Outline,{id:t,value:e.value,onChange:e.onChange})),e7=e=>i.createElement(e9,{label:e.label,value:String(e.value),onChange:t=>e.onChange(t)}),te=e=>{let{operation:t,setOperation:n}=e,a=e=>{if(e?.type==="questionAnswering"&&""===e.question&&""===e.context)return n({...t,lookup:void 0});n({...t,lookup:e})};return i.createElement(i.Fragment,null,i.createElement(y.l6,{value:t.lookup?.type??"regExp",options:[{label:"RegExp",value:"regExp"},{label:"Question Answering",value:"questionAnswering"}],onChange:e=>n({...t,lookup:tt[e]})}),(()=>{switch(t.lookup?.type){case void 0:case"regExp":{let n=t.lookup??tt.regExp;return i.createElement(e3,null,i.createElement("label",{htmlFor:"update_operation_lookup_expression"},"Use"," ",i.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",target:"_blank"},"RegExp")," ","to update the matched result(s)"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_expression",value:n.expression,onChange:i=>{e.onRegExpUpdate?.({...t,lookup:{...n,expression:i}}),a(""===i?void 0:{...n,expression:i})},placeholder:"Enter lookup expression",round:!0}))}case"questionAnswering":{let e=t.lookup;return i.createElement(e3,null,i.createElement("label",{htmlFor:"update_operation_lookup_question"},"Question"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_question",value:e.question,onChange:t=>a({...e,question:t}),placeholder:"Enter question",round:!0}),i.createElement("label",{htmlFor:"update_operation_lookup_context"},"Context"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_context",value:e.context,onChange:t=>a({...e,context:t}),placeholder:"Enter context",round:!0}))}case"classification":return null}})())},tt={regExp:{type:"regExp",expression:""},questionAnswering:{type:"questionAnswering",question:"",context:""},classification:{type:"classification",classes:[],description:""}};function tn(e){let[t,n]=(0,i.useState)(e.selectors),a=()=>t.some(e=>!e1(e));return i.createElement(y.aF,{isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"UpdatePaginationClick"},i.createElement("form",{action:"",method:"dialog",style:{display:"flex",flexDirection:"column",gap:12}},i.createElement("div",null,i.createElement(eZ,{value:t,onChange:n})),i.createElement(ta,null,i.createElement(y.$n,{variant:"primary",onClick:()=>{a()||e.onFinish(t)},text:"Save",round:!0}),i.createElement(y.$n,{onClick:e.onCancel,text:"Cancel",variant:"outlined",round:!0}))))}let ta=o.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,ti=e=>1e3*e,to=e=>e/1e3;function tr(e){let t=structuredClone(e.operation),n=t.wait.map(e=>"contentLoad"===e.type?{type:"contentLoad",timeout:e.timeout?to(e.timeout).toString():to(eQ.f).toString(),interval:e.interval?to(e.interval).toString():to(eQ.X).toString()}:{type:"delay",timeout:e.timeout?to(e.timeout).toString():to(1e3).toString()}),a=t.rowId?.selectors[0]?.selector??"",[o,r]=(0,i.useState)(t.locator.selector),[l,c]=(0,i.useState)(t.locator.type),[s,p]=(0,i.useState)(a),[d,u]=(0,i.useState)(!1),[m,g]=(0,i.useState)(!1),[f,x]=(0,i.useState)(n),C=()=>{if(t.rowId&&s)t.rowId.selectors=[{selector:s,type:"CSS"}];else if(s)return{id:(0,h.A)(),type:"text",context:"relative",group:"scraper",name:"Container ID",schema:"string",selectors:[{selector:s,type:"CSS"}],withRender:!1};return t.rowId},E=i.useMemo(()=>{if("XPath"===l)try{let e=XPathResult.FIRST_ORDERED_NODE_TYPE;document.evaluate(o,document.body,null,e,null)}catch{return!1}else try{let e=o.split(">>>"),t=document.createDocumentFragment();e.length>1?e.forEach(e=>t.querySelector(e)):document.createDocumentFragment().querySelector(o)}catch{return!1}return!0},[o,l]),b=i.useMemo(()=>E&&f.every(e=>{let t=/^\d*\.?\d*$/;if("contentLoad"===e.type){if(!t.test(e.timeout??"")||!t.test(e.interval??""))return!1}else if(!t.test(e.timeout??""))return!1;return!0}),[E,f]),k=i.createElement(tc,null,i.createElement("p",null,"Some pages are using re-usable containers, for those pages we need to specify container ID CSS selector targeting element which textContent will be used as a container ID."),i.createElement(y.dN.Outline,{value:s||"",onChange:e=>p(e),placeholder:"Enter container ID selector"})),w=i.createElement(tc,null,f.map((e,t)=>"delay"===e.type?i.createElement(i.Fragment,null,i.createElement(y.fI,{key:`${t}-${e.type}`},i.createElement("label",{htmlFor:`delay-${t}`},"Delay (in seconds)"),i.createElement(y.dN.Outline,{id:`delay-${t}`,value:e.timeout??"",onChange:e=>{let n=[...f];if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],timeout:e},x(n)},placeholder:"Enter delay in seconds"}),i.createElement(y.$n,{key:`${t}-remove`,text:"Remove",onClick:()=>{let e=structuredClone(f);e.splice(t,1),x(e)}})),i.createElement(tl,null)):i.createElement(i.Fragment,null,i.createElement("label",{htmlFor:`interval-${t}`},"Content load interval(in seconds)"),i.createElement(y.dN.Outline,{id:`interval-${t}`,placeholder:"Enter interval in seconds",key:`${t}-interval`,value:e.interval??"",onChange:e=>{let n=[...f];if(n[t]?.type!=="contentLoad")throw Error(`Wait at index ${t} is not a content load`);if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],interval:e},x(n)}}),i.createElement("label",{htmlFor:`content-load-${t}`},"Content load timeout(in seconds)"),i.createElement(y.dN.Outline,{id:`content-load-${t}`,placeholder:"Enter content load in seconds",key:`${t}-content-load`,value:e.timeout??"",onChange:e=>{let n=[...f];if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],timeout:e},x(n)}}),i.createElement(y.$n,{text:"Remove",onClick:()=>{let e=structuredClone(f);e.splice(t,1),x(e)}}),i.createElement(tl,null))),i.createElement(y.fI,{style:{justifyContent:"flex-end"}},i.createElement(y.$n,{text:"Add delay",onClick:()=>{x([...f,{type:"delay",timeout:to(1e3).toString()}])}}),i.createElement(y.$n,{text:"Add content load",onClick:()=>x([...f,{type:"contentLoad",interval:to(eQ.X).toString(),timeout:to(eQ.f).toString()}])}))),S="XPath"===l;return i.createElement(y.aF,{isOpen:!0,style:{maxWidth:"500px",width:"100%",padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - UpdateContainers"},i.createElement(y.VP,{gap:8},i.createElement(ts,{id:"container-header"},"Enter container selector"),i.createElement(y.dN.Outline,{"aria-labelledby":"container-header",size:"l",value:o,onChange:r,variant:E?"default":"danger"}),i.createElement(y.lM,{size:"m",label:"XPath",checked:S,onChange:()=>c(S?"CSS":"XPath")}),i.createElement(y.fI,{style:{cursor:"pointer",justifyContent:"space-between"},onClick:()=>u(!d)},i.createElement(A.P,null,"Setup container ID (Advanced)"),i.createElement(y.In,{icon:d?"ArrowUpOutline":"ArrowDownOutline"})),i.createElement(y.SD,{open:d},k),"none"!==t.pagination.type?i.createElement(i.Fragment,null,i.createElement(y.fI,{style:{cursor:"pointer",justifyContent:"space-between"},onClick:()=>g(!m)},i.createElement(A.P,null,"Setup pagination load delays"),i.createElement(y.In,{icon:m?"ArrowUpOutline":"ArrowDownOutline"})),i.createElement(y.SD,{open:m},i.createElement(y.mH,{style:{maxHeight:600}},w))):null,i.createElement(tp,null,i.createElement(y.$n,{disabled:!b,onClick:()=>e.onFinish({...t,locator:{type:l,selector:o},rowId:C(),wait:f.map(e=>"contentLoad"===e.type?{type:"contentLoad",timeout:ti(parseInt(e.timeout??"0")),interval:ti(parseInt(e.interval??"0"))}:{type:"delay",timeout:ti(parseInt(e.timeout??"0"))})}),text:"Save"}),i.createElement(y.$n,{variant:"outlined",onClick:e.onCancel,text:"Cancel"}))))}let tl=o.Ay.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid ${a.wdA};
`,tc=o.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,ts=o.Ay.h2`
  color: ${a.NEG};
`,tp=o.Ay.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,td={styleOperations:function(e){return async t=>{let{controller:n}=t;await n.removeAllStyles(),await n.styleElements((0,g.QR)(e))}},stylePagination:function(e){return async t=>{let{controller:n}=t;await n.stylePagination(e)}},pickElementStart:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.pickElement(e);if(!i)return;let o=await n.getElementRect(i),r=await (0,W.k)(i,n);a({type:d.SetPickerModalAnchorAndItems,items:r,anchor:o??null,element:i})}},pickSecondListItem:function(e,t){return async n=>{let{controller:a,dispatch:i}=n,o=await a.pickElement(e);if(!o)return;let r=await a.generateContainerSelector([...t,o]),l=(0,h.A)();i({type:d.ListCompeted,operation:{group:"container",id:l,locator:{type:"CSS",selector:r},operations:[],pagination:{type:"none"},wait:[]}})}},paginationElementPickStarted:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.pickElement(e);if(!i)return;let o=await n.generatePaginationSelectors(i);a({type:d.ClickPaginationSelectionFinished,selectors:o})}},executeOperations:function(e,t,n,a){return async i=>{let{controller:o,dispatch:r}=i;r(t?a(await o.executeMainScrapingOps(e,n,"main-session-result")):a(await o.executeMainScrapingOps(e,n)))}},executeDeepCrawlOperation:function(e,t){return async n=>{let{controller:a,dispatch:i}=n;i(t(await a.executeDeepCrawl(e)))}},stopDeepCrawlOperation:function(){return async e=>{let{controller:t}=e;await t.stopControllerExecution()}},pickerModalSubmit:function(e,t){return async n=>{let{controller:a,dispatch:i}=n,{allOperations:o,currentElement:r,container:l}=t;for(let{type:t,input:n}of e){let e,c;if(!r)throw Error("No current element");let s=await a.getElementLabel(r),p=(0,g.Cq)(o).map(e=>"name"in e?e.name:"").filter(eb.zz),u="relative";l&&(e=l.locator,u=await a.closestElemRef(r,l.locator)?"relative":"main");let m=await a.generateSelectors(r,e);if("input"==t){let e=await a.findInputableElement(r);e&&(c=await a.getInputType(e))}if("input"===t)i({type:d.PickerModalSingleOperationSubmitFinished,operation:{group:"action",type:"input",valueSchema:function(e){switch(e){case"checkbox":return"boolean";case"date":case"datetime":return"date";default:return"string"}}(c),context:u,name:j(t,p,s),id:(0,h.A)(),selectors:m},elementRef:r,inputValue:n});else if("attribute"===t){if(!n)throw Error("Attribute operation requires an input");i({type:d.PickerModalSingleOperationSubmitFinished,operation:{group:"scraper",type:"attribute",attribute:n,context:u,name:j(t,p,s),schema:"string",id:(0,h.A)(),selectors:m},elementRef:r})}else if("container"===t)await a.styleContainerPick([r]),i({type:d.ListPicked,currentElement:r});else if("table"===t)i({type:d.TablePicked,currentElement:r});else if((0,g.LB)(t)){let e=function(e){switch(e){case"link":case"image":case"socImage":case"url":return"url";case"timestamp":return"date";default:return"string"}}(t),n={context:u,group:"scraper",id:(0,h.A)(),name:j(t,p,s),schema:e,selectors:m};i("image"===t?{type:d.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t,screenshot:"no-data"},elementRef:r}:"text"===t?{type:d.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t,withRender:!0},elementRef:r}:{type:d.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t},elementRef:r})}else{let e={context:u,group:"action",id:(0,h.A)(),selectors:m,type:t,name:j(t,p,s)};i("click"===t&&n?{type:d.PickerModalSingleOperationSubmitFinished,operation:{...e,byText:{value:n}},elementRef:r}:{type:d.PickerModalSingleOperationSubmitFinished,operation:e,elementRef:r})}}i({type:d.SetPickerModalItems,items:[]})}},generateTableContainerOperation:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.generateTableContainerOperation(e);a({type:d.TableContainerOperationCreated,operation:i})}},cancelPickElement:function(e){return async t=>{let{controller:n}=t;await n.cancelPickElement(e)}},saveOperationsState:function(e){return async t=>{let{controller:n}=t;await n.saveOperationsState(e)}},cancel:function(){return async e=>{let{controller:t}=e;await t.cancel()}},checkOperationsChangedAndDiscard:function(){return async e=>{let{controller:t,dispatch:n}=e;await t.hasOperationsChanged()?n({type:d.DiscardConfirmationRequested}):await t.cancel()}},executeSingleOperation:function(e,t){return async n=>{let{controller:a}=n;a&&await a.executeSingleOperation(e,t)}},trackEvent:function(e){return async t=>{let{api:n}=t;await n.trackEvent(e)}}},tu=(0,o.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,tm=(0,o.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tg=o.Ay.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid ${a.Tc2};
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  margin: 16px 0;
`,ty=o.Ay.div`
  padding: 12px;
  background-color: ${a.P0$};
  border: 1px solid ${a.MEI};
  border-radius: 8px;
  color: ${a.CCs};
  font-size: 14px;
  margin: 16px 0;
  word-break: break-word;
`;function th(e){let{error:t,onClose:n,onSubmit:o,trackClick:r}=e,[l,c]=i.useState("");return i.createElement(y.pT,{header:"Import Operations",confirmBtn:i.createElement(tu,{text:"Import",onClick:()=>{o(l)}}),cancelBtn:i.createElement(tm,{text:"Cancel",onClick:n}),onClose:n,onClickCapture:r,"data-tracking-context":"ImportDialog"},i.createElement(A.H4,{color:a.t14},"Paste your operations array"),i.createElement(A.P,null,"Please paste the JSON content of your operations array below:"),t&&i.createElement(ty,null,t),i.createElement(tg,{value:l,onChange:e=>c(e.target.value),placeholder:"Paste your operations array here..."}))}function tf(e,t){switch(e.type){case d.ListCompeted:{let n=0===t.operations.length||t.panelOpen,a=[...t.operations,e.operation],i={...t,panelOpen:n,operations:a,containerRefs:[],activeContainerId:e.operation.id,phase:{__type:"pagination-type-selection",container:e.operation}},o="locator"in e.operation?e.operation.locator:void 0,r=(0,g.Vh)(t.operations)&&!t.activeContainerId;return[i,[td.saveOperationsState(i),...tS(i),td.trackEvent({name:"scraper.builder.op.add",properties:{selectors:(o?[o]:[]).map(e=>`${e.type}:${e.selector}`),hasInactiveContainer:r,id:e.operation.id,name:e.operation.name??"",type:"container",group:e.operation.group}})]]}case d.ChangedButtonPosition:return[{...t,buttonPosition:e.position},[]];case d.ChangedPanelOpen:return[{...t,panelOpen:e.open},[]];case d.ClickedPlay:return[{...t,canRun:!1},[]];case d.ClickedStop:return[{...t,canRun:!0},[]];case d.ClickedDiscard:return[t,[td.checkOperationsChangedAndDiscard()]];case d.UntargettedOperationItemClicked:{let n=(0,g.Vh)(t.operations)&&!t.activeContainerId;if(t.activeContainerId){let a=(0,g.X7)(t.operations,n=>n.id===t.activeContainerId&&(0,g.bB)(n)?{...n,operations:[...n.operations,e.operation]}:n),i={...t,operations:a};return[i,[td.saveOperationsState(i),...tS(i),td.trackEvent({name:"scraper.builder.op.add",properties:{selectors:[],hasInactiveContainer:n,id:e.operation.id,name:e.operation.name??"",type:e.operation.type??"",group:e.operation.group}})]]}{let a={...t,operations:[...t.operations,e.operation]};return[a,[td.saveOperationsState(a),...tS(a),td.trackEvent({name:"scraper.builder.op.add",properties:{selectors:[],hasInactiveContainer:n,id:e.operation.id,name:e.operation.name??"",type:e.operation.type??"",group:e.operation.group}})]]}}case d.OperationDeleteTriggered:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?null:t),a=t.executionResult.deepCrawlerResults.filter(t=>t.operationId!==e.operation.id),i=t.activeContainerId===e.operation.id,o={...t,activeContainerId:i?null:t.activeContainerId,operations:n,executionResult:{...t.executionResult,deepCrawlerResults:a}},r="type"in e.operation?e.operation.type:void 0;return[o,[td.saveOperationsState(o),...tS(o),td.trackEvent({name:"scraper.builder.op.delete",properties:{type:r,id:e.operation.id,name:e.operation.name??"",group:e.operation.group}})]]}case d.OperationsExecutionStarted:return[t,tS(t)];case d.EditOperationDialogOpened:return[{...t,editBasicOperation:e.operation},[]];case d.EditOperationDialogSubmitted:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t);return[{...t,operations:n},[td.styleOperations(n),td.executeOperations(n,t.isMainSession,t.executionResult.deepCrawlerResults.map(e=>e.tableResult),e=>({type:d.GotExecutionResult,executionResult:e}))]]}case d.EditOperationDialogClosed:return[{...t,editBasicOperation:null},tS(t)];case d.EditContainerDialogOpened:return[{...t,editContainerOperation:e.operation},tS(t)];case d.EditContainerDialogSubmitted:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id&&(0,g.bB)(t)?e.operation:t),a={...t,editContainerOperation:null,operations:n};return[a,[td.saveOperationsState(a),...tS(a)]]}case d.EditContainerDialogClosed:return[{...t,editContainerOperation:null},[]];case d.EditPaginationDialogOpened:return[{...t,editPaginationOperation:{container:e.container,pagination:e.paginationClick}},[]];case d.EditPaginationDialogSubmitted:{let n=t.editPaginationOperation?.container;if(!n)return[t,[]];let a=e.paginationClick,i=(0,g.X7)(t.operations,e=>e.id===n.id&&(0,g.bB)(e)?{...e,pagination:a}:e);return[{...t,editPaginationOperation:null,operations:i},[td.stylePagination(a)]]}case d.EditPaginationDialogClosed:return[{...t,editPaginationOperation:null},[]];case d.OperationUpdated:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t),a={...t,operations:n},i=g.N1(t.operations,e.operation.id)?.name,o=e.operation.name!=i,r="type"in e.operation?e.operation.type:void 0;return[a,[td.saveOperationsState(a),...tS(a),td.trackEvent({name:"scraper.builder.op.update",properties:{update_type:o?"rename":"update",type:r,id:e.operation.id,name:e.operation.name??"",group:e.operation.group}})]]}case d.OperationNameUpdated:{let n=(0,g.X7)(t.operations,t=>t.id===e.operationId?{...t,name:e.name}:t);return[{...t,operations:n},[]]}case d.RegExpUpdatedInModal:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t),a={...t,operations:n};return[t,tS(a)]}case d.SetActiveContainerId:return[{...t,activeContainerId:e.id},[]];case d.GotExecutionResult:{let[,...n]=e.executionResult.tabularData.data,a=n.length,i=0,o=0,r={};for(let e of n){let t=!1;for(let[n,a]of Object.entries(e.records??{}))r[n]||(r[n]={empty:0,withData:0}),null==a||""===String(a)?(r[n].empty++,t=!0):(r[n].withData++,o++);t&&i++}let l=Object.values(r).filter(e=>e.empty>0).length,c=Object.values(r).filter(e=>e.empty===a).length,s=Object.values(r).filter(e=>e.withData>0).length,p=Object.keys(r).length,d=p*a,u=d>0?o/d:0;return[{...t,executionResult:{...t.executionResult,tabularData:e.executionResult.tabularData,agentResult:e.executionResult.agentResult}},p>0?[td.trackEvent({name:"scraper.builder.preview",properties:{cols_empty:c,cols_with_data:s,cols_with_gaps:l,cols_total:p,rows_total:a,rows_with_gaps:i,fill_percentage:u}})]:[]]}case d.GotDeepCrawlExecutionResult:{let n=t.runningDeepCrawlerId;if(!n)throw Error("Running deep crawler id is not set");return[{...t,runningDeepCrawlerId:null,executionResult:{...t.executionResult,tabularData:e.executionResult.tabularData,deepCrawlerResults:e.executionResult.deepCrawlResults.map(e=>({operationId:n,tableResult:e}))}},[]]}case d.SetPhase:return[{...t,phase:e.phase},[]];case d.SetPickerModalItems:{let n={...t.pickerModal,items:e.items};return[{...t,pickerModal:n},[]]}case d.SetPickerModalAnchorAndItems:{let{anchor:n,element:a,items:i}=e;return[{...t,pickerModal:{anchor:n,element:a,items:i}},[]]}case d.PickerModalSubmitStarted:if(!t.pickerModal.element)return[t,[]];return[t,[td.pickerModalSubmit(e.items,{allOperations:t.operations,currentElement:t.pickerModal.element,container:t.activeContainerId?(0,g.yd)(t.operations,t.activeContainerId)??void 0:void 0})]];case d.PickerModalSingleOperationSubmitFinished:{let n;let a=0===t.operations.length||t.panelOpen;n=t.activeContainerId?(0,g.X7)(t.operations,n=>n.id===t.activeContainerId&&(0,g.bB)(n)?{...n,operations:[...n.operations,e.operation]}:n):[...t.operations,e.operation];let i={...t,operations:n,pickerModal:{items:[],element:null,anchor:null},panelOpen:a},o=[],r="input"===e.operation.type?{...e.operation,value:e.inputValue}:e.operation;"action"===r.group&&["click","hover","focus","enter","input"].includes(r.type)&&o.push(td.executeSingleOperation(r));let l="selectors"in e.operation?e.operation.selectors:[],c=(0,g.Vh)(t.operations)&&!t.activeContainerId;return[i,[td.saveOperationsState(i),...tS(i),...o,td.trackEvent({name:"scraper.builder.op.add",properties:{id:e.operation.id,name:e.operation.name??"",selectors:l.map(e=>`${e.type}:${e.selector}`),type:e.operation.type,group:e.operation.group,hasInactiveContainer:c}})]]}case d.ListPicked:return[{...t,phase:{__type:"second-list-item-selection"},containerRefs:[e.currentElement]},[]];case d.TablePicked:return[t,[td.generateTableContainerOperation(e.currentElement)]];case d.TableContainerOperationCreated:{let n=0===t.operations.length||t.panelOpen,a=[...t.operations,e.operation],i={...t,operations:a};return[{...i,panelOpen:n},[td.saveOperationsState(i),...tS(i)]]}case d.ClickPaginationSelectionPhaseStarted:return[{...t,phase:{__type:"pagination-selection",container:e.container}},[]];case d.ClickPaginationSelectionPickStarted:return[t,[td.paginationElementPickStarted(e.operationId)]];case d.ClickPaginationSelectionFinished:{let n=e.selectors;if("pagination-selection"!==t.phase.__type)throw Error("Invalid phase");let a=t.phase.container,i={type:"click",selectors:n},o=(0,g.X7)(t.operations,e=>e.id===a.id&&(0,g.bB)(e)?{...e,pagination:i}:e);return[{...t,phase:{__type:"field-selection"},operations:o},[td.stylePagination(i)]]}case d.ClickPaginationSelectionCanceled:return[{...t,phase:{__type:"field-selection"}},[]];case d.PickedContainerPaginationType:{let n=(0,g.X7)(t.operations,t=>t.id===e.container.id&&(0,g.bB)(t)?{...t,pagination:e.pagination}:t);return[{...t,operations:n,phase:{__type:"field-selection"}},[td.stylePagination(e.pagination)]]}case d.PickedContainerPaginationDirection:{let n=(0,g.X7)(t.operations,t=>{if(t.id===e.container.id&&(0,g.bB)(t)){let n=t.pagination;if("scroll"===n.type){let a={...n,direction:e.direction};return"up"===e.direction?{...t,pagination:a,reverse:!0}:{...t,pagination:a}}}return t}),a={...t,operations:n};return[a,[td.saveOperationsState(a),...tS(a)]]}case d.PickElementClickedStarted:return[t,[td.pickElementStart(e.operationId)]];case d.SecondListItemClicked:return[t,[td.pickSecondListItem(e.operationId,t.containerRefs)]];case d.CancelPickElement:return[t,[td.cancelPickElement(e.operationId)]];case d.DeepCrawlSessionCanceled:case d.DeepCrawlSessionErrored:case d.DeepCrawlSessionFinished:return[t,[]];case d.OperationListSorted:return[{...t,operations:e.operations},[]];case d.ContainerOperationListSorted:{let n=(0,g.X7)(t.operations,t=>t.id===e.id&&(0,g.bB)(t)?{...t,operations:e.operations}:t);return[{...t,operations:n},[]]}case d.PickerModalItemExpandToggled:{let n=eX(t.pickerModal.items,t=>t.id===e.item.id&&"expandable"===t.type?{...t,expanded:!t.expanded}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case d.PickerModalItemSelected:{let n=eX(t.pickerModal.items,t=>t.id===e.item.id&&"item"===t.type?{...t,selected:!t.selected}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case d.MinimizeBottomTableClicked:return[{...t,bottomTable:{minimized:!t.bottomTable.minimized}},[]];case d.NameUpdated:return[{...t,name:e.name},[]];case d.PickerModalItemInputChanged:{let n=eX(t.pickerModal.items,t=>t.id===e.item.id&&"item"===t.type?{...t,input:e.value}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case d.DeepCrawlRunButtonClicked:return[{...t,runningDeepCrawlerId:e.operationId},tw(t,e.operationId,e.limit)];case d.DeepCrawlStopButtonClicked:return[t,[td.stopDeepCrawlOperation()]];case d.DeepCrawlPlayAborted:return[{...t,runningDeepCrawlerId:null},[]];case d.ClearAllClicked:{if(!t.confirm)return[{...t,confirm:"clear-all"},[]];let e={...t,operations:[],confirm:null};return[e,[td.saveOperationsState(e),...tS(e)]]}case d.ConfirmationCanceled:return[{...t,confirm:null},[]];case d.ExecuteActionOperationClicked:{let n;let a=(0,g.N1)(t.operations,e.operationId);if(a){let e=(0,g.xu)(t.operations,a);e?.group==="container"&&(n=e)}if(!a||"action"!==a.group)return[t,[]];return[t,[td.saveOperationsState(t),td.executeSingleOperation(a,n),td.styleOperations(t.operations)]]}case d.ImportOperationTriggered:return[{...t,importDialog:!0,importError:null},[]];case d.ImportOperationSubmitted:try{let n=JSON.parse(e.content),a=N.array(z.dp).verify(n),i={...t,importDialog:!1,importError:null,operations:a};return[i,[td.saveOperationsState(i),...tS(i)]]}catch(n){let e=n instanceof Error?n.message:String(n);return[{...t,importDialog:!0,importError:`Failed to import operations: ${e}`},[]]}case d.ImportOperationCanceled:return[{...t,importDialog:!1,importError:null},[]];case d.DiscardConfirmationRequested:return[{...t,confirm:"discard"},[]];case d.DiscardConfirmed:return[t,[td.cancel()]];case d.DiscardConfirmationCanceled:return[{...t,confirm:null},[]]}}function tx(e){let{state:t,magicBox:n,renderSaveButton:o,dispatch:r,onSettingsButtonClicked:l,onStartDeepCrawlerClicked:c,onEditDeepCrawlerClicked:s,onStopAgentLoopClicked:p,trackClick:u}=e,m=(0,V.t)("browser-agent-button",[t.buttonPosition,t.panelOpen]);i.useEffect(()=>{t.operations.length>0&&setTimeout(()=>{r({type:d.OperationsExecutionStarted})},1e3)},[r,t.operations]),i.useEffect(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&"o"===e.key&&(e.preventDefault(),r({type:d.ImportOperationTriggered}))};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[r]);let g=i.useCallback(e=>r({type:d.PickElementClickedStarted,operationId:e}),[r]),h=i.useCallback(e=>r({type:d.SecondListItemClicked,operationId:e}),[r]),f=i.useCallback(e=>r({type:d.ClickPaginationSelectionPickStarted,operationId:e}),[r]),x=i.useCallback(e=>r({type:d.CancelPickElement,operationId:e}),[r]);if("pagination-type-selection"===t.phase.__type){let e=t.phase.container;return i.createElement(tA,{"data-tracking-context":"Pagination"},i.createElement(tO,null,i.createElement(A.H4,{color:a.t14},"Please select the type of pagination"),i.createElement(y.VP,{gap:8},i.createElement(y.lm,{checked:!1,onClick:()=>r({type:d.ClickPaginationSelectionCanceled})},"None"),i.createElement(y.lm,{checked:!1,onClick:()=>r({type:d.ClickPaginationSelectionPhaseStarted,container:e})},"Click"),i.createElement(y.lm,{checked:!1,onClick:()=>r({type:d.PickedContainerPaginationType,pagination:{type:"scroll",direction:"down"},container:e})},"Infinite Scroll")),i.createElement(y.$n,{variant:"outlined",size:"l",round:!0,text:"Cancel",onClick:()=>r({type:d.ClickPaginationSelectionCanceled})})))}return"pagination-selection"===t.phase.__type?i.createElement(i.Fragment,null,i.createElement(tO,{"data-tracking-context":"Tutorial"},i.createElement(A.H4,{color:a.t14},"Please click on the pagination button"),i.createElement(y.$n,{variant:"outlined",size:"l",round:!0,text:"Cancel",onClick:()=>r({type:d.ClickPaginationSelectionCanceled})})),i.createElement(q,{pickElement:f,cancelPickElement:x})):i.createElement(i.Fragment,null,t.panelOpen?i.createElement(y.wv.Positioner,{$position:t.buttonPosition},i.createElement(V.Y,{id:"browser-agent-side-panel","data-testid":"browser-agent-side-panel"},i.createElement(y.wv,{busy:!1,position:t.buttonPosition,visible:t.panelOpen,"data-tracking-context":"SidePanel"},i.createElement(y.wv.Header,{style:{minHeight:n?"88px":"auto",alignItems:"flex-start"}},l&&i.createElement(y.$n,{variant:"flat",round:!0,mode:"color",icon:"SettingsOutline",tooltipText:"Model settings",size:"l",onClick:l}),i.createElement(y.wv.CloseButton,{tooltipText:"Collapse",onClick:()=>r({type:d.ChangedPanelOpen,open:!1}),position:t.buttonPosition}),i.createElement(y.$n,{variant:"flat",round:!0,icon:"CrossOutline",mode:"color",size:"l",tooltipText:"Discard",onClick:()=>r({type:d.ClickedDiscard})})),n,i.createElement(tC,null,i.createElement(eM,{activeContainerId:t.activeContainerId,runningDeepCrawlerId:t.runningDeepCrawlerId,operations:t.operations,onSortEnd:e=>{r({type:d.OperationListSorted,operations:e})},dispatch:r,onStartDeepCrawlerClicked:c,onEditDeepCrawlerClicked:s}),"running"===t.agentLoop.status&&i.createElement("div",null,i.createElement(tq,{state:t.agentLoop.indicator})),t.operations.length>0&&o),i.createElement(J,{agentLoopStatus:t.agentLoop.status,onAdd:e=>r({type:d.UntargettedOperationItemClicked,operation:e}),onClearAll:()=>r({type:d.ClearAllClicked}),onPlay:()=>r({type:d.ClickedPlay}),onStop:p})))):i.createElement(y.F$,{divRef:m,onClick:()=>r({type:d.ChangedPanelOpen,open:!0}),position:t.buttonPosition,variant:"primary",onPositionChange:e=>r({type:d.ChangedButtonPosition,position:e})}),"field-selection"===t.phase.__type&&0===t.pickerModal.items.length?i.createElement(q,{pickElement:g,cancelPickElement:x}):null,"second-list-item-selection"===t.phase.__type?i.createElement(i.Fragment,null,i.createElement(q,{pickElement:h,cancelPickElement:x}),i.createElement(tO,null,i.createElement(A.H4,{color:a.t14},"Select another list item"),i.createElement(A.P,null,"Please select one more list item of the list that you want to scrape."))):null,i.createElement(eV,{dispatch:r,state:t.pickerModal}),t.editBasicOperation?i.createElement(e4,{onClose:()=>r({type:d.EditOperationDialogClosed}),onUpdate:e=>r({type:d.OperationUpdated,operation:e}),operation:t.editBasicOperation,onRegExpUpdate:e=>r({type:d.RegExpUpdatedInModal,operation:e}),trackClick:u}):null,t.editContainerOperation?i.createElement(tr,{operation:t.editContainerOperation,onCancel:()=>r({type:d.EditContainerDialogClosed}),onFinish:e=>r({type:d.EditContainerDialogSubmitted,operation:e}),trackClick:u}):null,t.editPaginationOperation?i.createElement(tn,{selectors:t.editPaginationOperation.pagination.selectors,onCancel:()=>r({type:d.EditPaginationDialogClosed}),onFinish:e=>r({type:d.EditPaginationDialogSubmitted,paginationClick:{type:"click",selectors:e}}),trackClick:u}):null,i.createElement(em,{bottomTableState:t.bottomTable,operations:t.operations,name:t.name,panelPosition:t.buttonPosition,panelOpen:t.panelOpen,executionResult:t.executionResult,dispatch:r}),i.createElement(tk,{state:t.confirm,dispatch:r,trackClick:u}),t.importDialog&&i.createElement(th,{error:t.importError,onClose:()=>r({type:d.ImportOperationCanceled}),onSubmit:e=>r({type:d.ImportOperationSubmitted,content:e}),trackClick:u}),i.createElement(ex.g,{position:t.buttonPosition,playlistId:"PLcXybhQ4q2HmfyOZEz4dtWaQzp-wrsUvP",videos:t.helpSidebarVideos,hidden:t.panelOpen}))}let tC=o.Ay.div`
  padding: 12px 24px;
  height: 100vh;
  overflow: auto;
`,tE=(0,o.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,tb=(0,o.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tk=i.memo(function(e){let{state:t,dispatch:n,trackClick:a}=e;if(!t)return null;let o=()=>n({type:d.ConfirmationCanceled});switch(t){case"clear-all":return i.createElement(y.pT,{header:"Clear All Operations",confirmBtn:i.createElement(tE,{text:"Clear All",onClick:()=>n({type:d.ClearAllClicked})}),cancelBtn:i.createElement(tb,{text:"Cancel",onClick:o}),onClose:o,onClickCapture:a,"data-tracking-context":"Confirmation"},"Are you sure you want to clear all operations? This action cannot be undone.");case"discard":return i.createElement(y.pT,{header:"Discard Changes",confirmBtn:i.createElement(tE,{text:"Discard",onClick:()=>n({type:d.DiscardConfirmed})}),cancelBtn:i.createElement(tb,{text:"Cancel",onClick:o}),onClose:o,onClickCapture:a,"data-tracking-context":"Confirmation"},"You have made changes to the operations. Are you sure you want to discard them?")}}),tw=(e,t,n)=>{let a=(0,g.Oi)(e.operations,t);if(!a)return[];let i=(0,g.Kt)(e.operations).map(e=>e.id),o=i.indexOf(t),r=i.slice(o),l=e.executionResult.deepCrawlerResults.filter(e=>!r.includes(e.operationId)).map(e=>e.tableResult);return[td.executeDeepCrawlOperation({allOperations:e.operations,deepCrawlOperation:a,mainSessionResult:e.executionResult.agentResult,deepCrawlerResults:l,limit:n},e=>{switch(e.status){case"aborted":return{type:d.DeepCrawlPlayAborted};case"success":let{tabularData:t,deepCrawlResults:n}=e;return{type:d.GotDeepCrawlExecutionResult,executionResult:{tabularData:t,deepCrawlResults:n}}}})]},tS=e=>{let t=[td.executeOperations(e.operations,e.isMainSession,e.executionResult.deepCrawlerResults.map(e=>e.tableResult),e=>({type:d.GotExecutionResult,executionResult:e}))];return t.push(td.styleOperations(e.operations)),t},tv=o.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${A.H4} {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
    color: ${a.t14};
  }
  ${y.lm} {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    border: 1px solid ${a.Tc2};
  }
`,tO=i.memo(function(e){let{children:t,...n}=e;return i.createElement(eh,{initialCoords:{left:32,top:32}},i.createElement(V.Y,{id:"agent-tutorial",...n},i.createElement(tv,{style:{width:380}},t)))}),tA=i.memo(function(e){let{children:t,...n}=e;return i.createElement(tI,n,i.createElement(V.Y,{id:"agent-simple-modal",style:{width:"100%",height:"100%"}},t))}),tI=o.Ay.div`
  position: fixed;
  inset: 0;
  display: inline-block;
`;function tD(e,t){switch(e.type){case u.OperationsBuilderAction:{let[n,a]=tf(e.action,t.operationsBuilderState),i=e.type;return[{...t,operationsBuilderState:n,model:{...t.model,operations:n.operations,details:{...t.model.details,name:n.name}}},a.map((0,s.zy)(e=>({type:i,action:e})))]}case u.EditModelSettingsDialogOpened:return[{...t,settingsOpen:!0},[]];case u.EditModelSettingsDialogSubmitted:{let n=e.modelSettings;return[{...t,settingsOpen:!1,model:{...t.model,...n}},[]]}case u.EditModelSettingsDialogClosed:return[{...t,settingsOpen:!1},[]];case u.StartedDeepCrawlerSessionClicked:{let n=[t.operationsBuilderState.executionResult.agentResult,...t.operationsBuilderState.executionResult.deepCrawlerResults.map(e=>e.tableResult)],a=(0,m.q)(n,e.operation.id).find(e=>{try{return new URL(e.value),!0}catch(e){return!1}}),i=(0,m.G)(n,e.operation.id);if(!a||!i)return[t,[]];return[t,[f.startDeepCrawler({url:a.value,operationId:e.operation.id,targetTableId:i.id,rowNum:a.rowNum},()=>({type:u.DeepCrawlerSessionStarted}))]]}case u.EditDeepCrawlerClicked:{let n,a,i;let o=e.operation,[r]=o.link;if(r?.type==="ref"){let e=r.editUrl;if(e)n=e;else{let e=[t.operationsBuilderState.executionResult.agentResult,...t.operationsBuilderState.executionResult.deepCrawlerResults.map(e=>e.tableResult)],a=(0,m.q)(e,r.targetId);if(0===a.length)throw Error("No results found for deep crawler operation, try to run previous operations first.");{let e=a.find(e=>{try{return new URL(e.value),!0}catch(e){return!1}});if(e)n=e.value;else throw Error("No result found for deep crawler operation, try to run previous operations first and ensure they have valid URLs.")}}}else if(r?.type==="static")n=r.url;else throw Error("Dynamic deep crawler link not supported");let l=t.operationsBuilderState.executionResult.deepCrawlerResults.find(e=>e.operationId===o.id);return l&&l.tableResult.tableRef&&(a=l.tableResult.tableRef.rowNum,i=l.tableResult.tableRef.tableId),[t,[f.editDeepCrawler({url:n,operation:e.operation,targetTableId:i,rowNum:a,onDone:()=>({type:u.DeepCrawlerSessionStarted})})]]}case u.DeepCrawlSessionEditFinished:{if((0,g.mC)(t.model.operations))throw Error("Deep crawler operation can't be added to the table operation");let n=e.rowNum&&e.targetTableId?{operationId:e.operation.id,tableResult:{...e.deepCrawlerResult,tableRef:{operationId:e.targetOperationId,rowNum:e.rowNum,tableId:e.targetTableId}}}:{operationId:e.operation.id,tableResult:e.deepCrawlerResult},a=structuredClone(t.operationsBuilderState.executionResult.deepCrawlerResults),i=a.find(t=>t.operationId===e.operation.id);i?i.tableResult.tableResult=n.tableResult.tableResult:a.push(n);let o=(0,g.X7)(t.model.operations,t=>"deepCrawl"===t.group&&t.id===e.operation.id?e.operation:t);return[{...t,operationsBuilderState:{...t.operationsBuilderState,operations:o,executionResult:{...t.operationsBuilderState.executionResult,deepCrawlerResults:a}},model:{...t.model,operations:o}},[f.executeOperations(o,a.map(e=>e.tableResult),e=>({type:u.GotExecutionResult,executionResult:e}))]]}case u.DeepCrawlerSessionStarted:case u.DeepCrawlSessionCanceled:case u.DeepCrawlSessionErrored:return[t,[]];case u.DeepCrawlSessionFinished:{if((0,g.mC)(t.model.operations))throw Error("Deep crawler operation can't be added to the table operation");let n={operationId:e.operation.id,tableResult:{...e.deepCrawlerResult,tableRef:{operationId:e.targetOperationId,rowNum:e.rowNum,tableId:e.targetTableId}}},a=[...t.operationsBuilderState.executionResult.deepCrawlerResults,n];return[{...t,operationsBuilderState:{...t.operationsBuilderState,operations:[...t.operationsBuilderState.operations,e.operation],executionResult:{...t.operationsBuilderState.executionResult,deepCrawlerResults:a}},model:{...t.model,operations:[...t.model.operations,e.operation]}},[f.executeOperations([...t.model.operations,e.operation],a.map(e=>e.tableResult),e=>({type:u.GotExecutionResult,executionResult:e}))]]}case u.GotExecutionResult:return[{...t,operationsBuilderState:{...t.operationsBuilderState,executionResult:{...t.operationsBuilderState.executionResult,tabularData:e.executionResult.tabularData,agentResult:e.executionResult.agentResult}}},[]];case u.Finished:return[t,[f.finish(t.model)]];case u.Canceled:return[t,[f.cancel()]];case u.SubmittedMagicBoxValue:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,goal:t.magicBox.value,currentMessage:{content:"Starting AI agent...",type:"executor"},messageHistory:[]}}}},[async e=>{let{api:n}=e;await n.trackEvent({name:"scraper.builder.agent_prompt",properties:{prompt:t.magicBox.value}})},f.startAgentLoop(t.magicBox.value)]];case u.ConfirmMagicBoxSubmission:return[{...t,magicBox:{...t.magicBox},model:{...t.model,operations:[]},operationsBuilderState:{...t.operationsBuilderState,operations:[],agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,goal:t.magicBox.value,currentMessage:{content:"Starting AI agent...",type:"executor"},messageHistory:[]}}}},[f.startAgentLoop(t.magicBox.value)]];case u.CancelMagicBoxSubmission:return[{...t,magicBox:{...t.magicBox}},[]];case u.ChangedMagicBoxValue:return[{...t,magicBox:{...t.magicBox,value:e.value}},[]];case u.SetPhase:return[{...t,phase:e.phase},[]];case u.ExtendModelClicked:{let n=e.model.operations;if((0,g.mC)(n))throw Error("Table operation is not supported in the model suggestion phase");return[{...t,model:e.model,operationsBuilderState:{...t.operationsBuilderState,operations:n,panelOpen:!0}},[]]}case u.UseCurrentModelClicked:return[{...t},[f.finish(e.suggestion.model,e.suggestion.ref)]];case u.ConvertTableOperationClicked:if(!(0,g.mC)(t.model.operations))throw Error("Can not convert non-table operation");return[t,[f.convertLegacyTableOperation(t.model.operations,e=>({type:u.ConvertTableOperationFinished,operation:e}))]];case u.ConvertTableOperationFinished:return[{...t,model:{...t.model,operations:[e.operation]},operationsBuilderState:{...t.operationsBuilderState,operations:[e.operation]}},[]];case u.DeleteTableOperationClicked:return[{...t,model:{...t.model,operations:[]},operationsBuilderState:{...t.operationsBuilderState,operations:[]}},[]];case u.AgentLoopStateUpdated:return[{...t,model:{...t.model,operations:e.operations},operationsBuilderState:{...t.operationsBuilderState,operations:e.operations}},[]];case u.AgentLoopStarted:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,currentMessage:{content:"AI Agent started.",type:"executor"},messageHistory:[]}}},magicBox:{...t.magicBox,value:""}},[]];case u.AgentLoopFinished:{let n={...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"idle"},operations:e.operations},model:{...t.model,operations:e.operations}};return[n,[f.saveOperationsState(n.operationsBuilderState)]]}case u.AgentLoopStopped:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"idle"}}},[]];case u.AgentLoopIndicatorUpdated:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,indicator:e.indicator}}},[]];case u.ClickedStopAgentLoop:return[t,[f.stopAgentLoop()]];case u.TrackableClicked:return[t,[]];default:return e}}function tP(e){let{state:t,dispatch:n,trackClick:a}=e,o=(0,s.i8)(n,u.OperationsBuilderAction);return"modelSuggestion"===t.phase?i.createElement(M,{suggestions:t.suggestions,model:t.model,dispatch:n}):(0,g.mC)(t.model.operations)?i.createElement(i.Fragment,null,i.createElement(y.pT,{header:"Table Scraping Update Required",confirmBtn:i.createElement(tT,{text:"Update Format",onClick:()=>n({type:u.ConvertTableOperationClicked})}),cancelBtn:i.createElement(t$,{text:"Start Fresh",onClick:()=>n({type:u.DeleteTableOperationClicked})}),onClose:()=>n({type:u.Canceled}),onClickCapture:a,"data-tracking-context":"TableUpdate"},"We've improved our table scraping capabilities! Your current configuration uses an older format that needs to be updated.")):i.createElement(i.Fragment,null,i.createElement(tx,{state:t.operationsBuilderState,dispatch:o,trackClick:a,renderSaveButton:i.createElement(U,{onClick:()=>{n({type:u.Finished})},round:!0,size:"l",variant:"primary",fullWidth:!0,text:"Save Agent"}),onSettingsButtonClicked:()=>n({type:u.EditModelSettingsDialogOpened}),onStartDeepCrawlerClicked:e=>{n({type:u.StartedDeepCrawlerSessionClicked,operation:e})},onEditDeepCrawlerClicked:e=>{n({type:u.EditDeepCrawlerClicked,operation:e})},onStopAgentLoopClicked:()=>{n({type:u.ClickedStopAgentLoop})},magicBox:t.magicBox.visible?i.createElement(tR,{size:"l",onChange:e=>n({type:u.ChangedMagicBoxValue,value:e}),onSubmit:()=>n({type:u.SubmittedMagicBoxValue}),value:t.magicBox.value}):null}),t.settingsOpen?i.createElement(O,{model:t.model,onSubmit:e=>n({type:u.EditModelSettingsDialogSubmitted,modelSettings:e}),onCancel:()=>n({type:u.EditModelSettingsDialogClosed}),canControlPremium:t.canControlPremium,trackClick:a}):null)}let tR=(0,o.Ay)(x.P)`
  transform: translateY(-50%);
`,tT=(0,o.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,t$=(0,o.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tM=e=>{let{api:t,state:n,controller:a}=e,[o,r]=(0,s.WO)(tD,n,[],{controller:a,api:t}),l=i.useCallback(e=>{t.trackEvent({name:"ui.click",properties:{name:e}})},[t]),c=(0,p.H)(l,[]);return i.useEffect(()=>{a.on("deepCrawlSessionCanceled",async e=>{r({type:u.DeepCrawlSessionCanceled,sessionId:e})}),a.on("deepCrawlSessionErrored",async e=>{r({type:u.DeepCrawlSessionErrored,sessionId:e})}),a.on("deepCrawlSessionFinished",async e=>{let{operation:t,agentTableResult:n,targetOperationId:a,targetTableId:i,rowNum:o}=e;r({type:u.DeepCrawlSessionFinished,operation:t,targetOperationId:a,deepCrawlerResult:n,targetTableId:i,rowNum:o})}),a.on("deepCrawlSessionEditFinished",async e=>{let{operation:t,agentTableResult:n,targetOperationId:a,targetTableId:i,rowNum:o}=e;r({type:u.DeepCrawlSessionEditFinished,operation:t,targetOperationId:a,deepCrawlerResult:n,targetTableId:i,rowNum:o})}),a.on("isMounted",async()=>!0),a.on("onAgentLoopStateUpdate",async e=>{r({type:u.AgentLoopStateUpdated,operations:e})}),a.on("onAgentLoopStarted",async()=>{r({type:u.AgentLoopStarted})}),a.on("onAgentLoopFinished",async e=>{r({type:u.AgentLoopFinished,operations:e})}),a.on("onAgentLoopStopped",async()=>{r({type:u.AgentLoopStopped})}),a.on("onAgentLoopIndicatorUpdated",async e=>{r({type:u.AgentLoopIndicatorUpdated,indicator:e})})},[a,r]),i.createElement("div",{onClickCapture:c,"data-tracking-context":"AgentBuilder"},i.createElement(tP,{state:o,dispatch:r,trackClick:c}))},tB="OperationsBuilderAction",t_="Finished";function tL(e,t){switch(e.type){case tB:{let[n,a]=tf(e.action,t.operationsBuilderState),i=e.type;return[{...t,operation:{...t.operation,name:n.name,operations:(0,g.QR)(n.operations)},operationsBuilderState:n},a.map((0,s.zy)(e=>({type:i,action:e})))]}case t_:return[t,[async e=>{let{controller:n}=e;await n.finish({operation:t.operation,id:t.operation.id,agentTableResult:t.operationsBuilderState.executionResult.agentResult})}]]}}function tF(e){let{state:t,dispatch:n,controller:a,api:o}=e,r=(0,s.i8)(n,tB),l=i.useCallback(e=>{o.trackEvent({name:"ui.click",properties:{name:e}})},[o]),c=(0,p.H)(l,[]);return i.useEffect(()=>(a.on("isMounted",async()=>!0),()=>{a.on("isMounted",async()=>!1)}),[a]),i.createElement(i.Fragment,null,i.createElement(tx,{trackClick:c,state:t.operationsBuilderState,dispatch:r,onSettingsButtonClicked:null,onStartDeepCrawlerClicked:null,onEditDeepCrawlerClicked:null,onStopAgentLoopClicked:null,renderSaveButton:i.createElement(U,{onClick:()=>{n({type:t_})},round:!0,size:"l",variant:"primary",fullWidth:!0,text:"Save Crawler"})}))}let tU=e=>{let{controller:t,api:n}=e,[a,o]=(0,s.WO)(tL,e.state,[],{controller:t,api:n});return i.createElement(i.Fragment,null,i.createElement(tF,{state:a,dispatch:o,controller:t,api:n}))},tN=e=>{let[t,n]=(0,i.useState)(!1);return i.createElement(i.Fragment,null,i.createElement("div",{style:{position:"fixed",bottom:20,right:20,backgroundColor:"white",zIndex:0x77359402}},i.createElement(b.$n,{"data-testid":"stop-scraping-progress-btn",size:"l",onClick:()=>{n(!0),e.onClick()},text:t?"Stopping...":e.text??"Stop Scraping"})))},tz=(0,o.i7)`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,tH=(0,o.i7)`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`,tW=e=>{let{message:t,isPending:n=!1,isNew:a=!1}=e;return i.createElement(tK,{type:t.type,$isNew:a},i.createElement(tQ,{type:t.type},"executor"===t.type?"E":"V"),i.createElement(tJ,null,t.content,n&&i.createElement(tZ,{size:"xs",$pulse:!0})))},tq=e=>{let{state:t,withShadow:n=!1}=e,a=(0,i.useRef)(null),[o,r]=i.useState(0);return(0,i.useEffect)(()=>{a.current&&a.current.scrollIntoView({behavior:"smooth"})},[t.messageHistory,t.currentMessage]),(0,i.useEffect)(()=>{t.messageHistory&&r(t.messageHistory.length)},[t.messageHistory]),i.createElement(tV,{$withShadow:n},t.goal&&i.createElement(tX,null,t.goal),i.createElement(tY,null,t.messageHistory&&t.messageHistory.map((e,t)=>i.createElement(tW,{key:t,message:e,isNew:t>=o-1})),t.currentMessage&&i.createElement(tW,{message:t.currentMessage,isPending:!0,isNew:!0}),i.createElement("div",{ref:a})))},tG=e=>{let{state:t}=e;return i.createElement(tj,null,i.createElement(tq,{state:t,withShadow:!0}))},tj=o.Ay.div`
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: calc(100vh - 40px);
  width: 340px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: ${tz} 0.3s ease-out;
`,tV=o.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${a.ONy};
  border-radius: 12px;
  box-shadow: ${e=>e.$withShadow?`
        0 8px 30px rgba(0, 0, 0, 0.12),
        0 4px 8px rgba(140, 128, 214, 0.12)
      `:"none"};
  overflow: hidden;
  max-height: 100%;
  border: 1px solid ${a.Q_2};
  backdrop-filter: blur(8px);
`,tX=o.Ay.div`
  padding: 18px 20px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${a.Q_2};
  background-color: ${a.KxS};
  color: ${a.c3n};
  white-space: normal;
  word-break: break-word;
`,tY=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  scrollbar-width: thin;
  scrollbar-color: ${a.NcT} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${a.NcT};
    border-radius: 6px;
  }
`,tK=o.Ay.div`
  display: flex;
  padding: 12px;
  border-radius: 10px;
  background-color: ${e=>"executor"===e.type?a.KxS:a.hi1};
  gap: 10px;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${e=>"executor"===e.type?a.Q_2:a.Tc2};
  animation: ${e=>e.$isNew?(0,o.AH)`
          ${tz} 0.3s ease-out
        `:"none"};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`,tQ=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${e=>"executor"===e.type?a.t14:a.CP};
  color: ${a.ONy};
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px
    ${e=>"executor"===e.type?"rgba(140, 128, 214, 0.3)":"rgba(0, 0, 0, 0.1)"};
  border: 2px solid ${a.ONy};
`,tJ=o.Ay.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${a.c3n};
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  word-break: break-word;
  letter-spacing: 0.01em;
`,tZ=(0,o.Ay)(l.y)`
  margin-left: 8px;
  animation: ${e=>e.$pulse?(0,o.AH)`
          ${tH} 1.5s ease-in-out infinite
        `:"none"};
`,t0=e=>{let{api:t,controller:n}=e,[a,o]=i.useState(!1);i.useEffect(()=>{let e=async()=>{o(!0)};return n.on("collectFeedback",e),()=>{n.off("collectFeedback",e)}},[n]);let l=i.useCallback((e,a)=>{(0,r.J)(t,async()=>{await n.feedbackComplete("Yes"===a,e)})},[t,n]),s=i.useCallback(()=>{(0,r.J)(t,()=>n.feedbackComplete(!0,""))},[t,n]);return a?i.createElement(c._,{open:a,onClose:s,onSubmit:l}):null},t1=e=>{let{controller:t}=e,[n,a]=i.useState({goal:"",messageHistory:[],currentMessage:{content:"",type:"executor"}});return i.useEffect(()=>{let e=async e=>{a(e)};return t.on("setState",e),()=>{t.off("setState",e)}},[t]),i.createElement(tG,{state:n})},t2=e=>{let{api:t,controller:n}=e;return i.createElement(i.Fragment,null,i.createElement(t0,{api:t,controller:n}),i.createElement(t1,{controller:n}),i.createElement(tN,{text:"Stop",onClick:()=>n.cancel()}))};var t4=n(7711),t6=n(88260);let t8=o.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: clamp(16px, 3vw, 24px);
  padding: clamp(16px, 3vw, 24px);
  height: 100%;
  max-height: 90vh;
  max-width: 800px;
`,t3=(0,o.Ay)(y.fI)`
  gap: 12px;
  justify-content: flex-end;
`,t5=o.Ay.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: clamp(10px, 2vw, 12px);
  border: 1px solid ${e=>e.selected?a.t14:a.MfC};
  border-radius: 8px;
  background: ${e=>e.selected?a.KxS:a.ONy};
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  gap: 12px;

  &:hover {
    border-color: ${a.t14};
  }
`,t9=o.Ay.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: 4px;
`,t7=(0,o.Ay)(A.H5)`
  word-break: break-word;
  font-weight: 500;
`,ne=o.Ay.span`
  font-size: clamp(12px, 1.5vw, 14px);
  color: #666;
  word-break: break-all;
  width: 100%;
`,nt=i.memo(e=>{let{state:t,dispatch:n}=e,[a,o]=i.useState(null),r=e=>{o(e)},l=()=>{n({type:"Cancel"})};return i.createElement(t6.a,{isOpen:!0,onClose:()=>l(),coordinatesAware:!0},i.createElement(t8,null,i.createElement(t4.J,{onClick:l,abs:!0,style:{top:12,right:12}}),i.createElement(A.H2,null,t.header),t.subHeader&&i.createElement(A.P,null,t.subHeader),i.createElement(y.VP,{style:{minHeight:120}},i.createElement(A.H5,null,"Search Results"),i.createElement(y.mH,{style:{overflow:"hidden"}},t.searchResults?.map(e=>i.createElement(t5,{key:e.id,selected:a===e.id,onClick:()=>r(e.id)},e.favicon&&i.createElement(t9,{src:e.favicon,alt:""}),i.createElement(y.VP,null,i.createElement(t7,null,e.title),i.createElement(ne,null,e.url)))))),i.createElement(y.VP,{style:{minHeight:120}},i.createElement(A.H5,null,"Open tabs"),i.createElement(y.mH,{style:{overflow:"hidden"}},t.openTabs.map(e=>i.createElement(t5,{key:e.id,selected:a===e.id,onClick:()=>r(e.id)},e.favicon&&i.createElement(t9,{src:e.favicon,alt:""}),i.createElement(y.VP,null,i.createElement(t7,null,e.title),i.createElement(ne,null,e.url)))))),i.createElement(t3,null,i.createElement(b.$n,{variant:"flat",size:"l",text:"Cancel",onClick:l,round:!0}),i.createElement(b.$n,{variant:"primary",size:"l",round:!0,text:"Select",onClick:()=>{if(!a)return;let e=t.openTabs.find(e=>e.id===a),i=t.searchResults?.find(e=>e.id===a);e?n({type:"Finish",payload:{tabId:e.id,url:e.url}}):i&&n({type:"Finish",payload:{tabId:i.id,url:i.url}})},disabled:!a}))))}),nn=e=>{let{controller:t,state:n}=e,[a,o]=(0,s.WO)(na,n,[],{controller:t});return i.createElement(nt,{state:a,dispatch:o})};function na(e,t){switch(e.type){case"setOpenTabs":return[{...t,openTabs:e.payload},[]];case"setSearchResults":return[{...t,searchResults:e.payload},[]];case"Finish":return[t,[async t=>{let{controller:n}=t;await n.onResult(e.payload)}]];case"Cancel":return[t,[async e=>{let{controller:t}=e;await t.onCancel()}]];default:return[t,[]]}}},54439:(e,t,n)=>{n.d(t,{d:()=>d});var a=n(97552),i=n(72194),o=n(48259),r=n(21787),l=n(7731),c=n(53631),s=n(27703);let p={[a.d.typeName]:{mode:i.c.Simple,Component:s.P},[o.W.typeName]:{mode:i.c.Simple,Component:c.r},[r.A.typeName]:{mode:i.c.Simple,Component:l.c}};function d(e){for(let t of e)for(let e of t.facets){let t=p[e];if(t)return t}}},84857:(e,t,n)=>{var a=n(69670);n(14041);var i=n(39716);n(58282);var o=n(28926);n(61994),(0,n(85040).A)(e=>({selectRoot:{display:"block",position:"initial"},groupLabel:{padding:e.spacing(4)},header:{"& > *":{textAlign:"center"},"& p":{fontSize:e.spacing(3.5),color:a.Wm,marginTop:e.spacing(3),textAlign:"center"},padding:e.spacing(5,0,9)},body:{padding:e.spacing(6),width:"512px"},groups:{"& li":{"&:hover":{color:a.Xvv,backgroundColor:a.KxS},"& svg, img":{marginInlineEnd:"16px"},"& span":{fontWeight:"600",lineHeight:"16px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"},"& div":{margin:"0"},borderRadius:e.spacing(1),padding:e.spacing(4),fontSize:"14px"},"& > label":{margin:"0 10px",fontSize:e.spacing(3),fontWeight:"400"},padding:"0px"},select:{maxHeight:"360px",overflow:"auto",marginInlineEnd:e.spacing(-6),paddingInlineEnd:e.spacing(6),paddingTop:e.spacing(5)}})),(0,i.Ay)(o.$n)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  background: white;

  &:hover {
    color: white;
    background: ${a.UmY};
  }
`;var r=n(67331);n.p,(0,i.Ay)(r.H1)`
  color: ${a.CP};
  text-wrap: wrap;
`,(0,i.Ay)(r.P)`
  color: ${a.ui$};
`,i.Ay.a`
  text-decoration: underline;
  color: ${a.ui$};
`,i.Ay.div`
  margin: 0 auto;
  padding: 96px 48px;
`,(0,i.Ay)(r.P)`
  font-weight: 600;
`,i.Ay.ul`
  li + li {
    margin-top: 10px;
  }
`,i.Ay.li`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid ${a.Tc2};
  height: 46px;
  border-radius: 8px;

  &:hover {
    background-color: transparent;
    transition: 0.2s border;
    border: 2px solid ${a.NcT};
    cursor: pointer;
  }
`,i.Ay.div`
  background-image: url(${e=>e.src});
  background-size: cover;
  background-position: left top;
  height: 89px;
`,(0,i.Ay)(o.VP)`
  width: 36%;
  @media (max-width: 768px) {
    display: none;
  }
`},69236:(e,t,n)=>{n.d(t,{z:()=>u});var a=n(69670),i=n(54357),o=n(14041),r=n(39716),l=n(28926),c=n(61994),s=n(85040),p=n(21799);let d=(0,s.A)(e=>({nag:{...p.SP,backgroundColor:a.Xi8,borderRadius:".75rem",boxSizing:"border-box",color:a.ONy,fontWeight:600,padding:e.spacing(4,4),width:"358px",position:"relative"},header:{display:"flex",alignItems:"center",margin:e.spacing(0,2,3,2)},logo:{display:"block",marginRight:e.spacing(7)},titleWrapper:{display:"flex",flexDirection:"column",alignItems:"flex-start"},headline:{lineHeight:"44px",fontSize:"18px"},bodyText:{marginTop:e.spacing(2),lineHeight:"22px",fontSize:"14px"},subTitle:{lineHeight:"22px",color:a.ONy,opacity:.8},fullWidth:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},dot:{background:a.ui$,borderRadius:"50%",margin:"5px",height:"6px",transition:".5s all",width:"6px"},dotsWrapper:{display:"flex",alignItems:"center",width:"100%"},dotActive:{background:a.g7N},dots:{display:"flex",alignItems:"center",justifyContent:"center",flex:1},hover:{".hideTillMouseOver":{opacity:1}},invisible:{opacity:0},fadeIn:{opacity:1,transition:"opacity .5s"},fadeOut:{opacity:0,transition:"opacity .5s"},nagIconWrapper:{display:"flex","& .bardeen-icon":{"&:not(:last-child)":{marginRight:e.spacing(3)}}},nagTitle:{fontWeight:600,fontSize:"18px",lineHeight:"19px",marginBottom:e.spacing(3),color:a.t14},nagSubTitle:{fontSize:"16px",lineHeight:"24px"},commands:{marginBottom:e.spacing(4),display:"flex",alignItems:"center",flexDirection:"column",flexWrap:"wrap",width:"100%",paddingLeft:e.spacing(2),"& > * + *":{marginTop:4,position:"relative","&:after":{borderLeft:`2px dotted ${a.ydb}`,content:"''",height:26,left:16,position:"absolute",top:-29,transform:"translate(-50%,0)",width:0}},"& > :first-child + :after":{borderLeft:`2px dotted ${a.ydb}`},"& > :first-child":{paddingTop:0}},command:{display:"flex",color:a.MfC,padding:e.spacing(0,2),gap:"12px",alignItems:"center",margin:e.spacing(4,0),width:"100%"},closeIcon:{display:"flex",alignItems:"center",justifyContent:"center",padding:e.spacing(1.5),borderRadius:"50%",border:`2px solid ${a.ONy}`,backgroundColor:a.NEG,position:"absolute",top:-e.spacing(4),left:-e.spacing(4),cursor:"pointer"},cardIconsLabel:{padding:e.spacing(0)}})),u=e=>{let[t,n]=o.useState("init"),{hideAfterMs:r,onClose:s,onRun:p,playbook:u}=e,g=d();return o.useEffect(()=>{let e=(()=>{switch(t){case"init":return setTimeout(()=>n("fadeIn"),550);case"fadeIn":return r?setTimeout(()=>n("hide"),r):void 0;case"hide":return setTimeout(()=>s("timeout"),550)}})();return()=>clearTimeout(Number(e))},[t,r,s]),o.createElement("div",{className:(0,i.A)(g.nag,g.invisible,{[g.fadeIn]:"fadeIn"===t,[g.fadeOut]:"hide"===t})},o.createElement("div",{className:g.header},o.createElement("div",{className:g.titleWrapper},o.createElement(c.hE,{variant:"h5",className:g.headline},"We created an automation for you!"))),o.createElement(m,null,u.integrationIcons.map((e,t)=>{let{icon:n,name:a}=e;return o.createElement(l.z9,{key:t,icon:n,tooltipText:a,size:"m"})}),o.createElement("span",null,u.name)),o.createElement(l.$n,{icon:"BardeenLogoColoredNegative",style:{justifyContent:"center"},size:"l",variant:"primary",fullWidth:!0,onClick:()=>p(u),text:"Try it out"}),o.createElement("div",{className:g.closeIcon,onClick:()=>s("closed")},o.createElement(l.In,{icon:"CrossOutline",size:16,color:a.ONy})))},m=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`},13693:(e,t,n)=>{n.d(t,{$:()=>a});var a={};n.r(a),n.d(a,{C:()=>i.C});var i=n(78927);n(55553)},99530:(e,t,n)=>{n.d(t,{$n:()=>i.$n,$u:()=>c.$,B0:()=>o.B0,Fe:()=>o.Fe,Gm:()=>o.Gm,Kf:()=>r.K,Ni:()=>o.Ni,RT:()=>a.RT,Su:()=>l.z,hj:()=>o.hj,ln:()=>o.ln,qw:()=>a.qw});var a=n(2822),i=n(28926),o=n(85415);n(84857),n(86244),n(29103),n(21139);var r=n(64185),l=n(69236),c=n(13693);n(94741),n(61994),n(54439)},86439:(e,t,n)=>{n.d(t,{M:()=>a});let a=n(14041).createContext({setCoordinates(){}})},81:(e,t,n)=>{n.d(t,{$n:()=>a.$n,$u:()=>a.$u,B0:()=>a.B0,Fe:()=>a.Fe,FontFaces:()=>l.qR,Gm:()=>a.Gm,KB:()=>r.K,Kf:()=>a.Kf,M5:()=>i.M,Ni:()=>a.Ni,RT:()=>a.RT,Su:()=>a.Su,hj:()=>a.hj,ln:()=>a.ln,n9:()=>s.A,oB:()=>o.o,qw:()=>a.qw,wQ:()=>c.w});var a=n(99530);n(96326);var i=n(86439),o=n(58756);n(88645),n(11778),n(48143),n(14166);var r=n(19585),l=n(21799);n(21714);var c=n(36674),s=n(85040)},21799:(e,t,n)=>{n.d(t,{$Q:()=>c,SP:()=>o.SP,TG:()=>o.TG,aP:()=>o.aP,eA:()=>i,gO:()=>o.gO,qR:()=>r.qR});var a=n(48187),i=n(35415),o=n(30575),r=n(4254);let l=i.p.spacing,c=(0,a.A)({spacing:l.base,typography:{fontFamily:"Inter, system-ui, sans-serif",body1:{fontSize:14,lineHeight:"normal"},body2:{fontSize:13,lineHeight:"normal"}},zIndex:{mobileStepper:0x7ffffd82,speedDial:0x7ffffd8c,drawer:0x7ffffda0,modal:0x7ffffdaa,snackbar:0x7ffffdb4,tooltip:0x7ffffdbe},components:{MuiBackdrop:{styleOverrides:{root:{backgroundColor:"rgba(0,0,0,0.08)"}}},MuiListItemSecondaryAction:{styleOverrides:{root:{display:"flex",justifyContent:"center","& > * + *":{marginLeft:".5rem"}}}},MuiTab:{styleOverrides:{root:{textTransform:"none",padding:`${2.5*l.base}px ${l.l}px`,minHeight:"auto",overflow:"visible",backgroundColor:"transparent",borderTopLeftRadius:"6px",borderTopRightRadius:"6px","&:after":{content:"''",borderStyle:"solid",borderColor:"transparent",borderWidth:"1px",borderTopLeftRadius:"6px",borderTopRightRadius:"6px",borderBottomWidth:0,...(0,o.DY)({top:"-1px",bottom:"1px",right:"-1px",left:"-1px"}),zIndex:-1},"@media (min-width: 600px)":{minWidth:"auto"}},textColorInherit:{opacity:1}}},MuiTabs:{styleOverrides:{root:{padding:`0 ${l.m}px`,minHeight:"auto"},indicator:{display:"none"},scroller:{padding:"1px 1px 0"}}}}})},4254:(e,t,n)=>{n.d(t,{Zt:()=>g,dy:()=>y,fM:()=>u,qR:()=>m});var a=n(85040),i=n(57418),o=n(64029),r=n(90580),l=n(13e3),c=n(31562),s=n(76115),p=n(28219);n(8361);let d=(e,t,n)=>({fontDisplay:"swap",fontFamily:e,fontStyle:"normal",fontWeight:"100 900",src:`url(${t})`,...n}),u=(0,a.A)({IconAnimation:s.m}),m=[d("Roboto Mono",c,{fontWeight:"400"}),d("Inter",r),d("Inter",o,{fontStyle:"italic"}),d("Outfit",l),d("Caveat",i,{fontWeight:"700"})],g=(0,a.A)({"@global":{":root":{fontFamily:"Inter, sans-serif",fontOpticalSizing:"auto"},"@font-face":m,"html > *, :host > :not(body)":{fontFamily:'"Inter", system-ui, sans-serif'}}}),y=(0,a.A)(p.U)},99658:(e,t,n)=>{n.d(t,{i8:()=>i});var a=n(14041);function i(e,t){return a.useCallback(n=>e({type:t,action:n}),[e,t])}},96054:(e,t,n)=>{n.d(t,{W:()=>i});var a=n(14041);function i(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3?arguments[3]:void 0,l=a.useMemo(()=>null,[]),[c,s]=a.useState(null),[p,d]=a.useReducer((t,n)=>{if(c)return t;let[a,i]=e(n,t[0].state);return[{state:a,effects:i,action:n,effectsRan:!1},...t]},[{state:t,effects:n,action:{type:"INIT"},effectsRan:!1}]),u=a.useCallback(()=>({actionLog:p,gitSha:"48f01dfc98"}),[p]);a.useEffect(()=>{l&&(l.onmessage=e=>{let{data:t}=e;if("DEBUG_SET_STATE"===t.type&&s(t.state),"DEBUGGER_OPENED"===t.type){let e=p.map(e=>{let{state:t,action:n}=e;return{state:t,action:n}});l.postMessage({type:"DEBUGGER_REPLACE",history:e})}})},[p,l]),a.useEffect(()=>{for(let e of p.filter(e=>{let{effectsRan:t}=e;return!t}).toReversed()){e.effectsRan=!0;let{action:t,state:n,effects:a}=e;for(let e of a){let t=Date.now();e.displayName=e.displayName??e.name??"unknown",e.startedAt=t,e.uuid=crypto.randomUUID(),e({dispatch:d,...i}).finally(()=>{e.ms=Date.now()-t,l?.postMessage({type:"DEBUG_EFFECT_UPDATE",effect:r(e)})})}o(e);try{l?.postMessage({type:"DEBUG_PUSH_STATE",action:t,state:n,effects:a.map(r)})}catch(e){console.error(e)}}p.length>100&&(p.length=100)},[p,l,i]);let m=a.useCallback(async()=>{!function(e,t){let n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=t,a.click(),URL.revokeObjectURL(n),setTimeout(()=>a.remove(),0)}(await function(e){let{body:t}=new Response(new TextEncoder().encode(e));if(!t)throw Error("No body");return new Response(t.pipeThrough(new CompressionStream("gzip"))).blob()}(JSON.stringify({actionLog:p,gitSha:"48f01dfc98"})),"action-log.json.gz")},[p]);return a.useEffect(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&"KeyD"===e.code&&(e.preventDefault(),m())};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[m]),[c??p[0].state,d,{downloadBundle:m,getActionLog:u}]}let o=e=>{},r=e=>({...e,displayName:e.displayName,startedAt:e.startedAt,ms:e.ms})}}]);
//# debugId=6a0dd068-16e8-5e4a-839f-fb0b7f427a7f
