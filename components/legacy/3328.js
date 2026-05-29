"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a8d3d9b5-46b5-56a6-9587-d1bc00523a57")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[3328],{28926:(e,t,n)=>{n.d(t,{$f:()=>R.s,$n:()=>c.$n,BQ:()=>a.B,EY:()=>H.EY,F$:()=>A.F,IU:()=>T.IU,In:()=>k.In,Jn:()=>u.J,N:()=>w.N,Qn:()=>a.Q,R:()=>D.R,R9:()=>m.R9,SD:()=>m.SD,Sc:()=>p.S,TM:()=>_.T,TO:()=>T.TO,U_:()=>N.U_,Uc:()=>y.U,Uq:()=>L.Uq,VP:()=>x.VP,Vv:()=>s.Vv,XI:()=>U.X,YE:()=>m.YE,YK:()=>r.Y,Yz:()=>L.Yz,Z:()=>M.Z,aF:()=>I.a,ab:()=>D.a,b2:()=>f.b,ck:()=>S.c,dN:()=>v.dN,eu:()=>o.e,fI:()=>x.fI,h$:()=>d.h,hE:()=>H.hE,hJ:()=>O.h,kc:()=>v.kc,ke:()=>h.ke,l6:()=>$.l,lM:()=>q.l,lm:()=>T.lm,lr:()=>C.l,mH:()=>x.mH,mb:()=>W.m,ms:()=>h.ms,nt:()=>E.n,oq:()=>l.o,pT:()=>g.pT,pd:()=>b.p,q6:()=>L.q6,q_:()=>P.q,rx:()=>h.rx,tU:()=>z.t,wv:()=>B.w,y$:()=>F.y,z9:()=>i.z,zZ:()=>h.Sk});var a=n(87613);n(8578);var i=n(14557),r=n(82212),o=n(97638),l=n(13800);n(63695);var c=n(37345),s=n(99427),d=n(23),p=n(9106);n(92674);var u=n(7711),m=n(42257),g=n(20285),y=n(61788);n(91961);var C=n(6213),h=n(82242);n(49416);var x=n(27461),E=n(84235);n(23888);var f=n(38446),k=n(48266),b=n(95513),v=n(65947);n(40289);var S=n(43885),w=n(59245);n(87020),n(45212);var T=n(42400),I=n(88260);n(49521);var O=n(31335),D=n(64744),A=n(40180);n(38940);var P=n(85934);n(45447);var R=n(43986);n(60397);var $=n(38437);n(29146);var M=n(59709),B=n(98942),L=n(66257),F=n(30665),N=n(37204),U=n(50782),z=n(23776),_=n(7207),q=n(33808),H=n(61994),W=n(45393)},85415:(e,t,n)=>{n.d(t,{Gm:()=>nn,Fe:()=>t2,ln:()=>tU,hj:()=>tM,Ni:()=>W,B0:()=>tz});var a=n(69670),i=n(14041),r=n(39716),o=n(15577),l=n(30665),c=n(94741),s=n(117),d=n(6717),p=function(e){return e.CancelPickElement="CancelPickElement",e.ChangedButtonPosition="ChangedButtonPosition",e.ChangedPanelOpen="ChangedPanelOpen",e.ClearAllClicked="ClearAllClicked",e.ClickPaginationSelectionCanceled="ClickPaginationSelectionCanceled",e.ClickPaginationSelectionFinished="ClickPaginationSelectionFinished",e.ClickPaginationSelectionPhaseStarted="ClickPaginationSelectionPhaseStarted",e.ClickPaginationSelectionPickStarted="ClickPaginationSelectionPickStarted",e.ClickedDiscard="ClickedDiscard",e.DiscardConfirmationRequested="DiscardConfirmationRequested",e.DiscardConfirmed="DiscardConfirmed",e.DiscardConfirmationCanceled="DiscardConfirmationCanceled",e.ClickedPlay="ClickedPlay",e.ClickedStop="ClickedStop",e.ConfirmationCanceled="ConfirmationCanceled",e.ContainerOperationListSorted="ContainerOperationListSorted",e.DeepCrawlPlayAborted="DeepCrawlPlayAborted",e.DeepCrawlRunButtonClicked="DeepCrawlRunButtonClicked",e.DeepCrawlSessionCanceled="DeepCrawlSessionCanceled",e.DeepCrawlSessionErrored="DeepCrawlSessionErrored",e.DeepCrawlSessionFinished="DeepCrawlSessionFinished",e.DeepCrawlStopButtonClicked="DeepCrawlStopButtonClicked",e.EditContainerDialogClosed="EditContainerDialogClosed",e.EditContainerDialogOpened="EditContainerDialogOpened",e.EditContainerDialogSubmitted="EditContainerDialogSubmitted",e.EditOperationDialogClosed="EditOperationDialogClosed",e.EditOperationDialogOpened="EditOperationDialogOpened",e.EditOperationDialogSubmitted="EditOperationDialogSubmitted",e.EditPaginationDialogClosed="EditPaginationDialogClosed",e.EditPaginationDialogOpened="EditPaginationDialogOpened",e.EditPaginationDialogSubmitted="EditPaginationDialogSubmitted",e.ExecuteActionOperationClicked="ExecuteActionOperationClicked",e.GotDeepCrawlExecutionResult="GotDeepCrawlExecutionResult",e.GotExecutionResult="GotExecutionResult",e.ImportOperationTriggered="ImportOperationTriggered",e.ImportOperationSubmitted="ImportOperationSubmitted",e.ImportOperationCanceled="ImportOperationCanceled",e.MinimizeBottomTableClicked="MinimizeBottomTableClicked",e.NameUpdated="NameUpdated",e.OperationDeleteTriggered="OperationDeleteTriggered",e.OperationListSorted="OperationListSorted",e.OperationUpdated="OperationUpdated",e.OperationNameUpdated="OperationNameUpdated",e.OperationsExecutionStarted="OperationsExecutionStarted",e.PickElementClickedStarted="PickElementClickedStarted",e.PickedContainerPaginationDirection="PickedContainerPaginationDirection",e.PickedContainerPaginationType="PickedContainerPaginationType",e.ListPicked="ListPicked",e.PickerModalItemExpandToggled="PickerModalItemExpandToggled",e.PickerModalItemInputChanged="PickerModalItemInputChanged",e.PickerModalItemSelected="PickerModalItemSelected",e.PickerModalSingleOperationSubmitFinished="PickerModalSingleOperationSubmitFinished",e.PickerModalSubmitStarted="PickerModalSubmitStarted",e.RegExpUpdatedInModal="RegExpUpdatedInModal",e.ListCompeted="ListCompeted",e.SetActiveContainerId="SetActiveContainerId",e.SetPhase="SetPhase",e.SetPickerModalAnchorAndItems="SetPickerModalAnchorAndItems",e.SetPickerModalItems="SetPickerModalItems",e.UntargettedOperationItemClicked="UntargettedOperationItemClicked",e.SecondListItemClicked="SecondListItemClicked",e.TablePicked="TablePicked",e.TableContainerOperationCreated="TableContainerOperationCreated",e}({}),u=function(e){return e.OperationsBuilderAction="OperationsBuilderAction",e.StartedDeepCrawlerSessionClicked="StartedDeepCrawlerSessionClicked",e.SubmittedMagicBoxValue="SubmittedMagicBoxValue",e.ConfirmMagicBoxSubmission="ConfirmMagicBoxSubmission",e.CancelMagicBoxSubmission="CancelMagicBoxSubmission",e.DeepCrawlerSessionStarted="DeepCrawlerSessionStarted",e.EditDeepCrawlerClicked="EditDeepCrawlerClicked",e.EditModelSettingsDialogOpened="EditModelSettingsDialogOpened",e.EditModelSettingsDialogSubmitted="EditModelSettingsDialogSubmitted",e.EditModelSettingsDialogClosed="EditModelSettingsDialogClosed",e.ChangedMagicBoxValue="ChangedMagicBoxValue",e.DeepCrawlSessionCanceled="DeepCrawlSessionCanceled",e.DeepCrawlSessionErrored="DeepCrawlSessionErrored",e.DeepCrawlSessionFinished="DeepCrawlSessionFinished",e.DeepCrawlSessionEditFinished="DeepCrawlSessionEditFinished",e.GotExecutionResult="GotExecutionResult",e.Finished="Finished",e.Canceled="Canceled",e.SetPhase="SetPhase",e.ExtendModelClicked="ExtendModelClicked",e.UseCurrentModelClicked="UseCurrentModelClicked",e.ConvertTableOperationClicked="ConvertTableOperationClicked",e.ConvertTableOperationFinished="ConvertTableOperationFinished",e.DeleteTableOperationClicked="DeleteTableOperationClicked",e.AgentLoopStateUpdated="AgentLoopStateUpdated",e.AgentLoopStarted="AgentLoopStarted",e.AgentLoopFinished="AgentLoopFinished",e.AgentLoopStopped="AgentLoopStopped",e.AgentLoopIndicatorUpdated="AgentLoopIndicatorUpdated",e.ClickedStopAgentLoop="ClickedStopAgentLoop",e.TrackableClicked="TrackableClicked",e}({}),m=n(88210),g=n(59998),y=n(28926),C=n(46288);let h={convertLegacyTableOperation:function(e,t){return async n=>{let{controller:a,dispatch:i}=n;i(t(await a.convertLegacyTableOperation(e)))}},editDeepCrawler:function(e){let{url:t,operation:n,rowNum:a,targetTableId:i,onDone:r}=e;return async e=>{let{controller:o,dispatch:l}=e;await o.editDeepCrawlerSession({operation:n,url:t,rowNum:a,targetTableId:i}),l(r())}},startDeepCrawler:function(e,t){let{url:n,operationId:a,targetTableId:i,rowNum:r}=e;return async e=>{let{controller:o,dispatch:l}=e,c=(0,C.A)();await o.startDeepCrawlerSession({url:n,sessionId:c,operationId:a,targetTableId:i,rowNum:r}),l(t())}},finish:function(e,t){return async n=>{let{controller:a}=n;await a.removeAllStyles(),await a.finish(e,t)}},cancel:function(){return async e=>{let{controller:t}=e;await t.cancel()}},executeOperations:function(e,t,n){return async a=>{let{controller:i,dispatch:r}=a;r(n(await i.executeMainScrapingOps(e,t,"main-session-result")))}},startAgentLoop:function(e){return async t=>{let{controller:n}=t;n.startAgentLoop(e)}},stopAgentLoop:function(){return async e=>{let{controller:t}=e;t.stopAgentLoop()}},saveOperationsState:function(e){return async t=>{let{controller:n}=t;await n.saveOperationsState(e)}}};var x=n(34946),E=n(31122),f=n(91159),k=n(37345),b=n(95513),v=n(38940),S=n(33808);let w=(0,n(85040).A)(()=>({optionsGroupWrapper:{marginTop:"10px"},additionalOptions:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"10px"},header:{color:a.NEG},footer:{marginTop:"10px",display:"flex",gap:"12px",justifyContent:"end"}}));function T(e){let{model:t,onSubmit:n,onCancel:a,canControlPremium:r}=e,{match:o}=t.settings,l=new URL(t.details.exampleUrls[0]||window.location.href),c=()=>o??d,s=t.details.premium??!1,d=(0,f.$f)(l.origin)+".*",[p,u]=(0,i.useState)(c()),[m,g]=(0,i.useState)(t.settings.cloudEnabled??!1),[C,h]=(0,i.useState)(!t.settings.bgRunTab.window||"minimized"===t.settings.bgRunTab.window),[x,T]=(0,i.useState)(s),[I,O]=(0,i.useState)(c()),D=w(),A=()=>{try{return new RegExp(I).test(l.href)}catch(e){return!1}},P=l.pathname.split("/").filter(e=>e);return i.createElement(y.aF,{"data-testid":"scraper-settings-dialog",isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - ModelSettings"},i.createElement("h2",{className:D.header},"Where should current template run?"),i.createElement(E.A,{value:p,onChange:(e,t)=>{u(t),"custom"!==t&&O(t)},className:D.optionsGroupWrapper},i.createElement(v.s,{value:".*",label:"Everywhere"}),i.createElement(v.s,{value:d,label:"On current domain"}),i.createElement(v.s,{value:"custom",label:"Custom (Regular expression)"})),i.createElement(b.p,{disabled:"custom"!==p,"data-testid":"scraper-match-input",error:!A(),onChange:O,style:{margin:"10px 0"},value:I,fullWidth:!0}),i.createElement(y.SD,{open:"custom"===p},i.createElement("a",{onClick:()=>O(d)},l.origin),i.createElement("span",{className:"separator"},"/"),P.map((e,t)=>i.createElement(i.Fragment,{key:e+t},i.createElement("a",{key:t,onClick:e=>{let n=P.splice(0,t+1);if(n.length>1){let e=n.pop();O((0,f.$f)(l.origin)+"\\/.*\\/"+(0,f.$f)(e??"")+"\\/.*")}else O((0,f.$f)(l.origin)+"\\/"+(0,f.$f)(n[0]??"")+"\\/.*")}},e),i.createElement("span",{className:"separator"},"/")))),i.createElement("h3",{className:D.header},"Additional options"),i.createElement("div",{className:D.additionalOptions},i.createElement(S.l,{size:"m",label:"Enable scraping on the cloud.",checked:m,onChange:g}),i.createElement("div",{style:{display:"flex"}},i.createElement(S.l,{size:"m",label:" Use minimized window for background scraping.",checked:C,onChange:h}),i.createElement(k.$n,{size:"xxs",icon:"InfoOutline",variant:"ghost",tooltipText:"This option is ignored when doing cloud or active tab scraping.",role:"presentation"})),r&&i.createElement(S.l,{size:"m",label:"Mark as premium template",checked:x,onChange:T})),i.createElement("div",{className:D.footer},i.createElement(k.$n,{disabled:!A(),onClick:()=>{n({...t,details:{...t.details,...r&&{premium:x}},settings:{...t.settings,match:I,cloudEnabled:m,bgRunTab:{...t.settings.bgRunTab,window:C?"minimized":"behind"}}})},text:"Save"}),i.createElement(k.$n,{variant:"outlined",onClick:()=>{u(c()),O(c()),T(s),a()},text:"Cancel"})))}var I=n(67331),O=n(8869),D=n(61994);function A(e){return i.createElement(R,{role:"dialog",$mode:e.mode??"dark"},i.createElement(y.Jn,{onClick:e.onCancel,abs:!0}),i.createElement($,null,e.children))}let P={light:"rgba(255, 255, 255, 0.95)",dark:"rgba(0, 0, 0, 0.88)"},R=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>P[e.$mode]};
`,$=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;function M(e){let{suggestions:t,model:n,dispatch:a}=e,[r,o]=i.useState(null);return i.createElement(O.Y,{id:"browser-agent-model-suggestion-modal","data-testid":"browser-agent-model-suggestion-modal",style:{position:"fixed",inset:0,zIndex:2},"data-tracking-context":"ModelSuggestion"},i.createElement(A,{onCancel:()=>a({type:u.Canceled}),mode:"light"},i.createElement("section",{style:{padding:"40px 48px",textAlign:"center"}},i.createElement(I.H2,{style:{marginBottom:32}},"Want to use a pre-built Scraper Template?"),i.createElement(B,{action:"",method:"dialog"},i.createElement(F,{role:"list"},t.map((e,t)=>{let{model:n}=e;return i.createElement(y.IU,{className:"item",key:`item-${t}`,onClick:()=>{t===r?o(null):o(t)}},i.createElement(L,null,n.details.faviconUrl?i.createElement(y.In,{icon:{url:n.details.faviconUrl},className:"icon",size:20}):null,i.createElement(D.EY,null,n.details.name),i.createElement(v.s,{checked:t===r,onChange:()=>""})))})),i.createElement(N,null,null!==r?i.createElement(i.Fragment,null,i.createElement(y.$n,{onClick:()=>{let e=t[r];e&&a({type:u.UseCurrentModelClicked,suggestion:e})},size:"l",variant:"primary",round:!0,text:"Use current model"}),i.createElement(y.$n,{onClick:()=>{let e=t[r]?.model;e&&(a({type:u.SetPhase,phase:"building"}),a({type:u.ExtendModelClicked,model:{...e,details:{...e.details,exampleUrls:[n.details.exampleUrls[0]],name:n.details.name}}}))},size:"l",variant:"outlined",round:!0,text:"Extend current model"})):i.createElement(y.$n,{onClick:()=>a({type:u.SetPhase,phase:"building"}),size:"l",variant:"outlined",round:!0,text:"No, I will build my own"}))))))}let B=r.Ay.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,L=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,F=r.Ay.div`
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
`,N=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`,U=(0,r.Ay)(y.$n)`
  border: none;
  background-color: ${a.XxH};
  position: sticky;
  bottom: 0;
  margin-top: 16px;
`;var z=n(16335),_=n(49830),q=n(45250),H=n(41716);let W=e=>{let{cancelPickElement:t,pickElement:n}=e,[a,r]=(0,i.useState)(new Date);return(0,i.useEffect)(()=>{setTimeout(()=>r(new Date),3e4);let e=(0,C.A)();return n(e),()=>{t(e)}},[n,t,a]),i.createElement(i.Fragment,null)},j=e=>{if("scraper"===e.group)switch(e.type){case"attribute":case"socImage":case"description":return"TexturedCodeBox";case"text":return"TexturedScraperText";case"link":return"TexturedLink";case"clipboard":return"TexturedClipboard";case"timestamp":return"TexturedDelayBox";case"title":return"TexturedTextBox";case"url":return"TexturedUrlBox";case"image":return"TexturedScraperImage";default:return"TexturedSingleScraper"}else if("action"===e.group)switch(e.type){case"click":return"CursorOutline";case"input":return"InputOutline";case"hover":case"focus":return"HoverOutline";case"enter":return"PressEnterOutline";case"contentLoad":return"TexturedCodeBox";default:return"TexturedSingleScraper"}else"container"===e.group||e.group;return"TexturedListScraper"};function Y(e,t,n){let a=(n=(0,q.capitalize)(n))&&("input"===e||"click"===e)?n:(0,q.capitalize)(e)+(n&&!(0,g.LB)(e)?n:"");if(!(0,g.LB)(e)&&!t.includes(a))return a;let i=1;for(;t.includes(`${a}${i}`);)i++;return`${a}${i}`}var X=n(1970);let V=new Map([["delay",{label:"Delay",placeholder:"Delay in seconds",icon:"TexturedDelay"}],["clipboard",{label:"Extract from Clipboard",icon:"TexturedClipboard"}],["socImage",{label:"Meta image",icon:"TexturedCodeBox"}],["description",{label:"Meta description",icon:"TexturedCodeBox"}],["url",{label:"Page link",icon:"TexturedUrlBox"}],["title",{label:"Page title",icon:"TexturedTextBox"}],["timestamp",{label:"Time scraped",icon:"TexturedDelayBox"}],["contentLoad",{label:"Content load",icon:"TexturedCodeBox"}],["navigate",{label:"Navigate",icon:"TexturedUrlBox"}]]),G={clipboard:{group:"scraper",type:"clipboard",id:"Temp_ID",name:"Description",schema:"string"},socImage:{group:"scraper",type:"socImage",id:"Temp_ID",name:"Image",schema:"url"},delay:{group:"action",id:"Temp_ID",type:"delay",timeout:1e3},title:{group:"scraper",id:"Temp_ID",type:"title",name:"Title",schema:"string"},url:{group:"scraper",id:"Temp_ID",type:"url",name:"URL",schema:"url"},contentLoad:{group:"action",id:"Temp_ID",type:"contentLoad"},navigate:{group:"action",id:"Temp_ID",type:"navigate",name:"Navigate",url:""},description:{group:"scraper",id:"Temp_ID",type:"description",name:"Description",schema:"string"},timestamp:{group:"scraper",id:"Temp_ID",type:"timestamp",name:"Time Scraped",schema:"date"}},J=Array.from(V).map(e=>{let[t,n]=e;return{label:n.label,value:t,icon:n.icon}}),K=e=>{let t=(0,i.useCallback)(t=>{e.onSelect({...G[t],id:(0,C.A)()})},[e]);return i.createElement(y.ms,{placement:"bottom-start",behavior:"flip",renderContent:e=>{let{close:n}=e;return i.createElement(i.Fragment,null,J.map(e=>i.createElement(y.IU,{key:e.value,text:e.label,icon:e.icon,onClick:()=>{t(e.value),n()}})))}},e.children)},Q=e=>{let{agentLoopStatus:t,onPlay:n,onStop:r,onClearAll:o,onAdd:l}=e;return i.createElement(Z,null,i.createElement(K,{onSelect:l},i.createElement(y.$n,{variant:"flat",tooltipText:"Add",icon:"PlusOutline",color:a.Tc2})),"running"===t&&r?i.createElement(y.$n,{tooltipText:"Stop AI template generation",variant:"flat",onClick:r,icon:"RadioStopBold",color:a.Tc2}):null,i.createElement(y.$n,{tooltipText:"Clear all",variant:"flat",onClick:o,icon:"DiscardOutline",color:a.Tc2}))},Z=(0,r.Ay)(y.fI)`
  justify-content: space-between;
  border-top: 1px solid ${a.Tc2};
  padding: 0 24px;
  height: 56px;
`;var ee=n(36836);function et(e){let{tooltip:t,icon:n,items:a}=e;return i.createElement(y.ms,{behavior:"flip",renderContent:e=>{let{close:t}=e;return i.createElement(i.Fragment,null,a?.map(e=>{let{id:n,label:a,handler:r}=e;return i.createElement(y.IU,{key:n,text:a,onClick:()=>{t(),r(n)}})}))}},i.createElement(y.$n,{icon:n,tooltipText:t,size:"m",variant:"flat",round:!0}))}let en=r.Ay.div`
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
`,ea=r.Ay.div`
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
`,ei=r.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 300px;
`,er=r.Ay.table`
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
`,eo=e=>{let{columns:t,rows:n}=e,[a,r]=(0,i.useState)(10),o=i.createRef();return t.length&&n.length?i.createElement(en,{onScroll:e=>{e.currentTarget.scrollTop+e.currentTarget.clientHeight>=e.currentTarget.scrollHeight&&r(e=>e+10)},ref:o},i.createElement(er,null,i.createElement("colgroup",null,e.columns.map((e,t)=>i.createElement("col",{key:t})),i.createElement("col",null)),i.createElement("thead",null,i.createElement("tr",null,i.createElement("th",null),t.map(e=>{let{actions:t,label:n,icon:a,id:r,onLabelChange:o}=e;return i.createElement("th",{key:r},i.createElement(ea,null,a&&i.createElement(y.In,{icon:a,className:"icon",size:20}),i.createElement(ee.w,{value:n,placeholder:n,onSave:e=>o?.({columnId:r,label:e||n})}),t?i.createElement(et,{tooltip:"More Options",icon:"OverflowVerticalOutline",items:t.map(e=>({id:e.id,label:e.title,handler:t=>{e.handler({columnId:r,actionId:t})}}))}):null))}))),i.createElement("tbody",{"data-tracking-ignore":!0},n.slice(0,a).map((e,n)=>i.createElement("tr",{key:n},i.createElement("td",{key:`cell${n}-0`},i.createElement(ei,{style:{width:"52px"}},n+1)),t.map((t,a)=>{let{id:r}=t;return i.createElement("td",{key:`cell${n}-${a}`},i.createElement(ei,{title:e[r]},e[r]))})))))):i.createElement(en,null,i.createElement("div",{className:"no-result"},"No rows"))},el=e=>{let{title:t,onTitleChange:n,onMinimize:a,minimized:r}=e;return i.createElement(ec,null,i.createElement(es,null,i.createElement(y.In,{icon:"TexturedListScraper",size:20})),i.createElement(ep,null,i.createElement(ed,{onSave:n,value:t,placeholder:"Name your agent"})),i.createElement(eu,null,i.createElement(y.$n,{round:!0,icon:r?"ExpandOutline":"ShrinkOutline",onClick:a,tooltipText:r?"Expand":"Minimize",variant:"flat",size:"m"})))},ec=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${a.Tc2};
  border-radius: 16px 16px 0 0;
  background-color: ${a.ONy};
  height: 56px;
  gap: 16px;
`,es=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  background-color: ${a.KxS};
  height: 100%;
  width: 52px;
`,ed=(0,r.Ay)(ee.w)`
  color: ${a.t14};
  flex-grow: 1;
`,ep=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  flex: 1;
  min-width: 0;
`,eu=r.Ay.div`
  display: flex;
  gap: 4px;
  padding-inline-end: 14px;
`,em=e=>{let{bottomTableState:t,dispatch:n,operations:a,name:r,executionResult:{tabularData:o}}=e,l=(o?.data||[]).map(e=>{let{records:t={}}=e,n={};for(let[e,a]of Object.entries(t))n[e]=a.toString()||"";return n});if((0,g.mC)(a))throw Error("Not implemented");let c=(0,g.OT)(a),s=new Set,d=c.filter(e=>!s.has(e.name)&&(s.add(e.name),!0)).map(e=>({label:e.name||"undefined",id:e.name,icon:j(e),actions:[{id:"delete",title:"Delete",handler:()=>n({type:p.OperationDeleteTriggered,operation:e})},{id:"edit",title:"Edit",handler:()=>n({type:p.EditOperationDialogOpened,operation:e})}],onLabelChange:t=>{let{label:a}=t;n({type:p.OperationUpdated,operation:{...e,name:a}})}}));return i.createElement(ey,{$isMinimized:t.minimized,$buttonPosition:e.panelPosition,$isPanelOpen:e.panelOpen,"data-testid":"preview-table","data-tracking-context":"PreviewTable"},i.createElement(eg,{id:"preview-table",$isMinimized:t.minimized},i.createElement(el,{title:r,onTitleChange:e=>{n({type:p.NameUpdated,name:e})},onMinimize:()=>{n({type:p.MinimizeBottomTableClicked})},minimized:t.minimized}),i.createElement(eo,{columns:d,rows:l})))},eg=(0,r.Ay)(X.Y)`
  max-height: ${e=>{let{$isMinimized:t}=e;return t?"56px":"320px"}};
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${a.Tc2};
  transition: max-height 0.3s ease-in-out;
`,ey=r.Ay.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  max-width: calc(100vw - 64px);
  transition: all 0.24s ease-in-out;
  ${e=>{let{$buttonPosition:t,$isPanelOpen:n}=e;switch(t){case"top-left":return n?(0,r.AH)`
              left: 448px;
              max-width: calc(100vw - 480px);
            `:null;case"top-right":return n?(0,r.AH)`
              max-width: calc(100vw - 480px);
            `:null;case"bottom-left":if(n)return(0,r.AH)`
            left: 448px;
            max-width: calc(100vw - 480px);
          `;return(0,r.AH)`
          left: 122px;
          max-width: calc(100vw - 154px);
        `;case"bottom-right":if(n)return(0,r.AH)`
            left: 32px;
            max-width: calc(100vw - 480px);
          `;return(0,r.AH)`
          left: 32px;
          max-width: calc(100vw - 154px);
        `}}}
`;function eC(e){let{children:t,initialCoords:n,draggingRef:a,...r}=e,o={startX:n?n.left:14,startY:n?n.top:14},l=i.useRef(null),c=i.useRef(n||{top:14,left:14}),s=i.useRef(o),d=i.useRef(!1),p=()=>{let e=l.current,t=e?.children[0];if(e&&t){let n=t.getBoundingClientRect();n.x+n.width+15>window.innerWidth&&(e.style.left=`${window.innerWidth-(n.width+15)}px`),n.y+n.height+15>window.innerHeight&&(e.style.top=`${window.innerHeight-(n.height+15)}px`)}};return i.useEffect(()=>{let e=e=>{let t=l.current,n=a?.current||l.current;if(n&&(n.style.cursor="grabbing"),t&&e.target&&e.target instanceof Node&&t.contains(e.target)){let{left:n,top:a}=t.getBoundingClientRect();d.current=!0,c.current={left:n,top:a},s.current={startX:e.clientX,startY:e.clientY}}},t=e=>{let t=l.current;if(t&&d.current){let n=t.getBoundingClientRect(),{left:a,top:i}=c.current,{startX:r,startY:o}=s.current,l=window.innerWidth-n.width-15,d=window.innerHeight-n.height-15,p=Math.max(Math.min(a+e.clientX-r,l),15),u=Math.max(Math.min(i+e.clientY-o,d),15);t.style.left=p+"px",t.style.top=u+"px",t.style.bottom="auto"}},n=()=>{d.current=!1;let e=a?.current||l.current;e&&(e.style.cursor="grab")},i=a?.current||l.current;return i&&i.addEventListener("mousedown",e),document.addEventListener("mousemove",t),document.addEventListener("mouseup",n),window.addEventListener("resize",p),()=>{document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",n),window.removeEventListener("resize",p),i&&i.removeEventListener("mousedown",e)}},[a]),i.createElement(eh,{ref:l,...r,$initialCoords:n,$draggable:!a},t)}let eh=r.Ay.div`
  position: fixed;
  top: ${e=>{let{$initialCoords:t}=e;return`${t?t.top:14}px`}};
  left: ${e=>{let{$initialCoords:t}=e;return`${t?t.left:14}px`}};
  cursor: ${e=>{let{$draggable:t}=e;return t?"grab":"auto"}};

  z-index: ${0x7ffffdaa};
`;var ex=n(18255),eE=n(93269),ef=n(66257),ek=n(39629);let eb=i.memo(e=>0===i.Children.toArray(e.children).filter(ek.zz).length?null:i.createElement(y.ms,{autoCloseOnContentClick:!0,renderContent:()=>e.children},i.createElement(y.$n,{icon:"OverflowVerticalOutline",variant:"flat",round:!0,tooltipText:"More Options"}))),ev=e=>i.createElement(eO,{"data-testid":"operation-item"},!e.isMainContainer&&i.createElement(eA,null),i.createElement(y.In,{icon:e.icon,size:16}),i.createElement(eD,null,e.text),e.children),eS=e=>{let{activeContainerId:t,runningDeepCrawlerId:n,operation:a,dispatch:r,isMainContainer:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,hideMenu:s,ContainerComponent:d,DeepCrawlComponent:u}=e,m=()=>r({type:p.OperationDeleteTriggered,operation:a}),C="action"===a.group||"scraper"===a.group?()=>r({type:p.EditOperationDialogOpened,operation:a}):void 0,h="scraper"===a.group&&"url"===a.schema&&l?()=>l(a):null,x=e=>i.createElement(ev,{isMainContainer:o,icon:j(a),text:e},i.createElement(eb,null,h?i.createElement(y.IU,{onClick:h},"Start deep crawl"):null,s?null:i.createElement(y.IU,{onClick:m},"Delete"),!s&&C?i.createElement(y.IU,{onClick:C},"Edit"):null)),E=a.id===n,f=!!(!E&&n),k=()=>{switch(a.group){case"action":let e=["input","click","enter","focus","hover","unhover"].includes(a.type);if("delay"===a.type)return x(i.createElement(eR,{operation:a,dispatch:r}));if(e)return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eE.S,{Component:eP,onChange:e=>r({type:p.OperationNameUpdated,operationId:a.id,name:e}),addonAfter:i.createElement(y.$n,{"aria-label":"content-play-button",onClick:()=>{r({type:p.ExecuteActionOperationClicked,operationId:a.id})},tooltipText:"Execute action",icon:"RadioPlayBold",variant:"ghost",round:!0}),value:a.name??"",hideEditIcon:!!a.name,autoFocus:!0,editIconTooltipText:"Edit name"})));return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eE.S,{Component:eP,onChange:e=>r({type:p.OperationNameUpdated,operationId:a.id,name:e}),value:a.name??"",hideEditIcon:!!a.name,autoFocus:!0,editIconTooltipText:"Edit name"})));case"scraper":return x(i.createElement(y.fI,{gap:4},i.createElement("span",null,a.type,":"),i.createElement(eE.S,{Component:eP,onChange:e=>r({type:p.OperationNameUpdated,operationId:a.id,name:e}),value:a.name,autoFocus:!0,hideEditIcon:!!a.name,editIconTooltipText:"Edit name"})));case"container":return i.createElement(d,{isActiveContainer:t===a.id,container:a,onSortEnd:e=>{r({type:p.ContainerOperationListSorted,operations:e,id:a.id})},dispatch:r,onStartDeepCrawlerClicked:l,hideMenu:s});case"deepCrawl":return i.createElement(u,{isRunning:E,isActionDisabled:f,deepCrawl:a,onSortEnd:()=>{},dispatch:r,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c});case"fetch":return null}};return i.createElement(ef.Uq,{id:a.id},o?i.createElement(eT,{role:"listitem",$selected:a.id===t,$isSingleOperation:(0,g.iz)(a),onClick:()=>{if((0,g.iz)(a))return}},k()):i.createElement(eI,{role:"listitem"},k()))},ew=e=>{let{container:t,dispatch:n}=e,a=t.pagination,{type:r}=a,o=["none","click","scroll"];return i.createElement(eI,{style:{display:"flex",gap:8,alignItems:"center"}},i.createElement(ev,{isMainContainer:!1,icon:"TexturedThreeDotsBox",text:"Pagination"}),i.createElement(y.ms,{renderContent:e=>{let{close:a}=e;return i.createElement(i.Fragment,null,o.map(e=>i.createElement(y.IU,{key:e,text:e,onClick:()=>{switch(e){case"click":n({type:p.ClickPaginationSelectionPhaseStarted,container:t});break;case"scroll":n({type:p.PickedContainerPaginationType,container:t,pagination:{type:"scroll",direction:"down"}});break;case"none":n({type:p.PickedContainerPaginationType,container:t,pagination:{type:"none"}})}a()}})))}},i.createElement(y.$n,{text:r,variant:"outlined",size:"m",icon:"ArrowDownOutline",iconPosition:"right"})),"click"===a.type?i.createElement(y.fI,{style:{flex:1,flexDirection:"row-reverse"}},i.createElement(y.$n,{icon:"PencilOutline",tooltipText:"Edit pagination",variant:"ghost",size:"s",onClick:()=>{n({type:p.EditPaginationDialogOpened,container:t,paginationClick:a})}})):"scroll"===a.type?i.createElement(y.fI,{style:{flex:1,flexDirection:"row-reverse"}},i.createElement(y.ms,{renderContent:e=>{let{close:a}=e;return i.createElement(i.Fragment,null,i.createElement(y.IU,{text:"Down",onClick:()=>{n({type:p.PickedContainerPaginationDirection,container:t,direction:"down"}),a()}}),i.createElement(y.IU,{text:"Up",onClick:()=>{n({type:p.PickedContainerPaginationDirection,container:t,direction:"up"}),a()}}),i.createElement(y.IU,{text:"Left",onClick:()=>{n({type:p.PickedContainerPaginationDirection,container:t,direction:"left"}),a()}}),i.createElement(y.IU,{text:"Right",onClick:()=>{n({type:p.PickedContainerPaginationDirection,container:t,direction:"right"}),a()}}))}},i.createElement(y.$n,{text:"",variant:"outlined",size:"m",icon:e$(a.direction||"down"),iconPosition:"right"}))):null)},eT=r.Ay.li`
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
`,eI=r.Ay.li`
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
`,eO=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,eD=(0,r.Ay)(I.P)`
  font-size: 14px;
  flex-grow: 1;
  line-height: 20px;
`,eA=r.Ay.div`
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
`,eP=r.Ay.span`
  word-break: break-word;
`,eR=e=>{let{operation:t,dispatch:n}=e,{timeout:a}=t;return i.createElement(y.fI,{gap:4},i.createElement("span",null,"delay:"),i.createElement(eE.S,{Component:eP,onChange:e=>{let a=parseInt(e,10);!isNaN(a)&&a>0&&n({type:p.OperationUpdated,operation:{...t,timeout:a}})},value:a.toString(),autoFocus:!0,editIconTooltipText:"Edit name"}),i.createElement("span",null,"ms"))},e$=e=>{switch(e){case"down":return"ArrowDownOutline";case"up":return"ArrowUpOutline";case"left":return"ArrowLeftOutline";case"right":return"ArrowRightOutline"}},eM=e=>{let{activeContainerId:t,runningDeepCrawlerId:n,operations:a,onSortEnd:r,dispatch:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c}=e;return i.createElement(y.q6,{onItemsReorder:r,items:a},i.createElement(eF,{role:"list",$isMainContainer:!0},a.map(e=>i.createElement(eS,{activeContainerId:t,runningDeepCrawlerId:n,key:e.id,operation:e,dispatch:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,isMainContainer:!0,ContainerComponent:eB,DeepCrawlComponent:eL}))))},eB=e=>{let{container:t,onSortEnd:n,dispatch:a,onStartDeepCrawlerClicked:r,hideMenu:o,isActiveContainer:l}=e,{operations:c,name:s}=t;return i.createElement(y.q6,{onItemsReorder:n,items:c},i.createElement(eF,{role:"list"},i.createElement(eN,null,i.createElement(y.In,{icon:"TexturedListScraper",size:16}),i.createElement(ez,null,i.createElement(eE.S,{Component:e_,onChange:e=>a({type:p.OperationNameUpdated,operationId:t.id,name:e}),value:s??"",autoFocus:!0,hideEditIcon:!!s,editIconTooltipText:"Edit name"})),i.createElement(y.$n,{icon:l?"RadioCrossBold":"RadioCheckmarkBold",variant:"flat",tooltipText:l?"Deactivate":"Activate",size:"m",round:!0,onClick:()=>{a({type:p.SetActiveContainerId,id:l?null:t.id})}}),o?null:i.createElement(eb,null,i.createElement(y.IU,{onClick:()=>a({type:p.OperationDeleteTriggered,operation:t})},"Delete"),i.createElement(y.IU,{onClick:()=>a({type:p.EditContainerDialogOpened,operation:t})},"Edit"),l?i.createElement(y.IU,{onClick:()=>a({type:p.SetActiveContainerId,id:null})},"Deactivate"):i.createElement(y.IU,{onClick:()=>a({type:p.SetActiveContainerId,id:t.id})},"Activate"))),i.createElement(ew,{container:t,dispatch:a}),c.map(e=>i.createElement(eS,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:a,onStartDeepCrawlerClicked:r,onEditDeepCrawlerClicked:null,hideMenu:o,ContainerComponent:eB,DeepCrawlComponent:eL}))))},eL=e=>{let{isRunning:t,isActionDisabled:n,deepCrawl:a,onSortEnd:r,dispatch:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c}=e,{operations:s,name:d,id:u}=a;return i.createElement(y.q6,{onItemsReorder:r,items:s},i.createElement(eF,{role:"list"},i.createElement(eN,null,i.createElement(y.In,{icon:"SquareOutline",size:16}),i.createElement(ez,null,i.createElement(eE.S,{Component:e_,onChange:e=>o({type:p.OperationNameUpdated,operationId:a.id,name:e}),value:d??"",autoFocus:!0,hideEditIcon:!!d,editIconTooltipText:"Edit name"})),t?i.createElement(eU,{icon:"RadioStopBold",variant:"flat",tooltipText:"Stop",size:"m",round:!0,onClick:()=>{o({type:p.DeepCrawlStopButtonClicked})}}):i.createElement(eU,{icon:"RadioPlayBold",disabled:n,variant:"flat",tooltipText:"Run and populate (3 results)",size:"m",round:!0,onClick:()=>{n||o({type:p.DeepCrawlRunButtonClicked,operationId:u,limit:3})}}),i.createElement(eb,null,i.createElement(y.IU,{onClick:()=>o({type:p.OperationDeleteTriggered,operation:a})},"Delete"),i.createElement(y.IU,{onClick:()=>c?.(a)},"Edit"))),s.map(e=>i.createElement(eS,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:o,onStartDeepCrawlerClicked:l,onEditDeepCrawlerClicked:c,hideMenu:!0,ContainerComponent:eB,DeepCrawlComponent:eL}))))},eF=r.Ay.ul`
  padding-inline: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{$isMainContainer:t}=e;return t?"8px":"0px"}};
`,eN=r.Ay.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
`,eU=(0,r.Ay)(y.$n)``,ez=r.Ay.div`
  flex-grow: 1;
`,e_=r.Ay.span`
  word-break: break-word;
  line-break: anywhere;
  font-size: 14px;
  font-weight: 600;
`;var eq=n(78406);let eH=(0,r.Ay)(y.VP)`
  width: 480px;
  max-height: 400px;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.06);
  background-color: ${a.ONy};
  padding: 8px;
`,eW=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ej=r.Ay.span`
  color: ${a.FCg};
  font-size: 12px;
  margin-inline-start: 16px;
  display: inline-block;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,eY=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${a.ONy};
  position: sticky;
  padding: 8px;
  margin: -8px;
  bottom: -8px;
`;function eX(e){let{state:t,dispatch:n}=e,{items:a}=t,r=e=>{let t=e=>{n({type:p.PickerModalItemSelected,item:e})},a=(e,t)=>{n({type:p.PickerModalItemInputChanged,item:e,value:t})};return e.map(e=>{switch(e.type){case"item":if(!e.emptyValue&&!e.value)return null;return i.createElement(i.Fragment,null,i.createElement(y.IU,{onClick:()=>t(e),key:`${e.label}-${e.value}`,icon:e.icon,rightAddon:i.createElement(i.Fragment,null,i.createElement(ej,{title:e.value,style:{marginRight:16}},e.value),i.createElement(y.Sc,{checked:e.selected,onChange:()=>{}})),"aria-label":e.label},e.label),e.selected&&void 0!==e.input&&i.createElement(y.IU,{onClick:()=>"",key:`${e.label}-${e.value}-input`},e.options?i.createElement(y.l6,{options:e.options,value:e.input||e.options[0]?.value||"",onChange:t=>a(e,t),fullWidth:!0}):i.createElement(y.pd,{autoFocus:!0,placeholder:e.inputPlaceholder,value:e.input,fullWidth:!0,size:"l",onChange:t=>a(e,t)})));case"expandable":if(!e.items.length)return null;return i.createElement(i.Fragment,null,i.createElement(eG,{key:`header-${e.label}`},e.label),r(e.items));case"header":return i.createElement(eG,{key:`header-${e.label}`},e.label);case"button":return i.createElement(y.IU,{onClick:()=>n({type:p.PickerModalSubmitStarted,items:[{type:e.operation,input:void 0}]}),key:`${e.label}-${e.operation}`,icon:e.icon,"aria-label":e.label},e.label);default:return null}})},o=e=>{let t=[],n=e=>{for(let a of e)if("item"===a.type&&a.selected){let e=a.operation;t.push({type:e,input:"attribute"===e?a.label:a.input})}else"expandable"===a.type&&n(a.items)};return n(e),t};return 0===a.length?null:i.createElement(X.Y,{id:"picker-modal",style:{position:"fixed",inset:0,zIndex:2},"data-tracking-context":"PickerModal"},i.createElement(eq.k,{open:a.length>0,rect:t.anchor??null,onClose:()=>n({type:p.SetPickerModalItems,items:[]}),"data-testid":"picker-modal"},i.createElement(eH,null,i.createElement(eW,null,r(a)),i.createElement(eY,null,i.createElement(y.$n,{fullWidth:!0,onClick:()=>n({type:p.PickerModalSubmitStarted,items:o(a)}),disabled:!o(a).length,size:"l",variant:"primary",text:(()=>{let e=a.some(e=>{if("item"!==e.type)return!1;let t=e.operation;return!!(e.selected&&("table"===t||(0,g.LB)(t)))}),t=!a.some(e=>"item"===e.type&&e.selected);return e||t?"Get data":"Trigger action"})()})))))}let eV=(e,t)=>e.map(e=>"expandable"===e.type?t({...e,items:eV(e.items,t)}):t(e)),eG=(0,r.Ay)(D.EY)`
  font-size: 14px;
  font-weight: 600;
  color: ${a.CP};
  padding: 14px 16px;
`;var eJ=n(7696),eK=n(80694);let eQ=r.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 160px;
  overflow: auto;
  margin-inline: -24px;
  padding-inline: 24px;
`,eZ=i.memo(function(e){let{value:t,onChange:n}=e,a=i.useCallback(e=>{let a=[...t];a.splice(e,1),n(a)},[n,t]),r=i.useCallback((e,a)=>{n(t.map((t,n)=>n===e?a:t))},[n,t]),o=i.useCallback(()=>{n([...t,{type:"CSS",selector:"tagname.className"}])},[n,t]);return i.createElement(i.Fragment,null,i.createElement(e2,null,i.createElement(y.fI,{style:{justifyContent:"space-between"}},i.createElement("legend",null,"Selectors"),i.createElement("legend",null,"XPath")),i.createElement(eQ,{"data-testid":"selectors-list"},t.map((e,t)=>i.createElement(e0,{key:t},i.createElement(y.dN.Outline,{style:{width:"100%"},round:!0,variant:e1(e)?"default":"danger",value:e.selector,onChange:n=>r(t,{...e,selector:n})}),i.createElement(y.$n,{variant:"outlined",round:!0,onClick:()=>a(t),icon:"TrashBinOutline",tooltipText:"Delete selector",size:"m"}),i.createElement(y.Sc,{checked:"XPath"===e.type,onChange:n=>r(t,{...e,type:n?"XPath":"CSS"})}))))),i.createElement(y.$n,{variant:"outlined",round:!0,onClick:o,size:"m",text:"Add permutation",fullWidth:!0}))}),e0=r.Ay.li`
  display: flex;
  margin-top: 3px;
  align-items: center;
  gap: 8px;
  width: 100%;
`,e1=e=>{let{selector:t,type:n}=e;try{if("XPath"===n){let e=XPathResult.FIRST_ORDERED_NODE_TYPE;document.evaluate(t,document.body,null,e,null)}else{let e=t.split(">>>"),n=document.createDocumentFragment();e.length>1?e.forEach(e=>n.querySelector(e)):n.querySelector(t)}}catch{return!1}return!0},e2=r.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;function e4(e){let[t,n]=(0,i.useState)(e.operation),{type:a}=t,r=e=>0===e?1:e/1e3,o=e=>1e3*e,l="delay"===t.type?r(t.timeout??1e3):1,c="contentLoad"===t.type?r(t.timeout??eK.f):1,s="contentLoad"===t.type?r(t.interval??eK.X):1,[d,p]=(0,i.useState)(l.toString()),[u,m]=(0,i.useState)(c.toString()),[C,h]=(0,i.useState)(s.toString());return i.createElement(y.aF,{isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - Update"},i.createElement(e8,{action:"",method:"dialog",onSubmit:n=>{n.preventDefault(),(!(0,g.kw)(t)||t.selectors.every(e1))&&("delay"===a?e.onUpdate({...t,timeout:o(parseFloat(d))}):"contentLoad"===a?e.onUpdate({...t,timeout:o(parseFloat(u)),interval:o(parseFloat(C))}):e.onUpdate(t),e.onClose())}},"scraper"===t.group||"input"===a?i.createElement(e6,{label:"Field name"},e=>i.createElement(y.dN.Outline,{round:!0,id:e,value:t.name||"",onChange:e=>n({...t,name:e}),required:!0})):null,"input"===a?i.createElement(e9,{label:"Input value",value:t.value??"",onChange:e=>n({...t,value:e})}):null,"attribute"===a?i.createElement(e9,{label:"Attribute",value:t.attribute,onChange:e=>n({...t,attribute:e})}):null,"delay"===a?i.createElement(e7,{label:"Delay (seconds)",value:d,onChange:p}):null,"contentLoad"===a?i.createElement(i.Fragment,null,i.createElement(e7,{label:"Content load timeout (seconds)",value:u,onChange:m}),i.createElement(e7,{label:"Interval of content load checks (seconds)",value:C,onChange:h})):null,i.createElement("div",null,(0,g.kw)(t)?i.createElement(y.YE,{title:"Selectors (advanced)"},i.createElement(eZ,{value:t.selectors,onChange:e=>n({...t,selectors:e})})):null,"scraper"===t.group?i.createElement(y.YE,{title:"Lookup and Q/A setup (advanced)"},i.createElement(te,{operation:t,setOperation:n,onRegExpUpdate:e.onRegExpUpdate})):null),"image"===a?i.createElement(e6,{label:"When to take screenshot"},e=>i.createElement(y.l6,{id:e,value:t.screenshot,options:[{label:"Always",value:"always"},{label:"No data",value:"no-data"},{label:"Never",value:"never"}],onChange:e=>n({...t,screenshot:e})})):null,"input"===a?i.createElement(y.lM,{checked:!!t.exactSelectBoxMatch,onChange:()=>n({...t,exactSelectBoxMatch:!t.exactSelectBoxMatch}),label:"Ensure exact match for native selectbox values"}):null,"scraper"===t.group&&"text"===a?i.createElement("div",null,i.createElement(y.lM,{checked:t.withRender??!1,onChange:()=>n({...t,withRender:!t.withRender}),label:"Preserve rendered features."})):null,i.createElement(e5,null,i.createElement(y.$n,{type:"submit",text:"Save",round:!0,size:"l",disabled:!(()=>{if("delay"===a||"contentLoad"===a){let e=/^\d*\.?\d*$/;if(!e.test(d)||!e.test(u)||!e.test(C))return!1}return"delay"===a?parseFloat(d)>0:"contentLoad"===a?parseFloat(u)>0&&parseFloat(C)>0:!("lookup"in t)||t.lookup?.type!=="regExp"||!!(0,eJ.y)(t.lookup.expression)})()}),i.createElement(y.$n,{onClick:e.onClose,type:"reset",text:"Cancel",variant:"outlined",size:"l",round:!0}))))}let e8=r.I4.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: 400px;
`,e6=(0,r.I4)(e=>{let t=i.useId();return i.createElement("div",null,i.createElement("label",{htmlFor:t},e.label),e.children(t))})`
  display: flex;
  gap: 8px;
  flex-direction: column;
`,e3=r.I4.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,e5=r.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,e9=e=>i.createElement(e6,{label:e.label},t=>i.createElement(y.dN.Outline,{id:t,value:e.value,onChange:e.onChange})),e7=e=>i.createElement(e9,{label:e.label,value:String(e.value),onChange:t=>e.onChange(t)}),te=e=>{let{operation:t,setOperation:n}=e,a=e=>{if(e?.type==="questionAnswering"&&""===e.question&&""===e.context)return n({...t,lookup:void 0});n({...t,lookup:e})};return i.createElement(i.Fragment,null,i.createElement(y.l6,{value:t.lookup?.type??"regExp",options:[{label:"RegExp",value:"regExp"},{label:"Question Answering",value:"questionAnswering"}],onChange:e=>n({...t,lookup:tt[e]})}),(()=>{switch(t.lookup?.type){case void 0:case"regExp":{let n=t.lookup??tt.regExp;return i.createElement(e3,null,i.createElement("label",{htmlFor:"update_operation_lookup_expression"},"Use"," ",i.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",target:"_blank"},"RegExp")," ","to update the matched result(s)"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_expression",value:n.expression,onChange:i=>{e.onRegExpUpdate?.({...t,lookup:{...n,expression:i}}),a(""===i?void 0:{...n,expression:i})},placeholder:"Enter lookup expression",round:!0}))}case"questionAnswering":{let e=t.lookup;return i.createElement(e3,null,i.createElement("label",{htmlFor:"update_operation_lookup_question"},"Question"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_question",value:e.question,onChange:t=>a({...e,question:t}),placeholder:"Enter question",round:!0}),i.createElement("label",{htmlFor:"update_operation_lookup_context"},"Context"),i.createElement(y.dN.Outline,{id:"update_operation_lookup_context",value:e.context,onChange:t=>a({...e,context:t}),placeholder:"Enter context",round:!0}))}case"classification":return null}})())},tt={regExp:{type:"regExp",expression:""},questionAnswering:{type:"questionAnswering",question:"",context:""},classification:{type:"classification",classes:[],description:""}};function tn(e){let[t,n]=(0,i.useState)(e.selectors),a=()=>t.some(e=>!e1(e));return i.createElement(y.aF,{isOpen:!0,style:{padding:24},onClickCapture:e.trackClick,"data-tracking-context":"UpdatePaginationClick"},i.createElement("form",{action:"",method:"dialog",style:{display:"flex",flexDirection:"column",gap:12}},i.createElement("div",null,i.createElement(eZ,{value:t,onChange:n})),i.createElement(ta,null,i.createElement(y.$n,{variant:"primary",onClick:()=>{a()||e.onFinish(t)},text:"Save",round:!0}),i.createElement(y.$n,{onClick:e.onCancel,text:"Cancel",variant:"outlined",round:!0}))))}let ta=r.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,ti=e=>1e3*e,tr=e=>e/1e3;function to(e){let t=structuredClone(e.operation),n=t.wait.map(e=>"contentLoad"===e.type?{type:"contentLoad",timeout:e.timeout?tr(e.timeout).toString():tr(eK.f).toString(),interval:e.interval?tr(e.interval).toString():tr(eK.X).toString()}:{type:"delay",timeout:e.timeout?tr(e.timeout).toString():tr(1e3).toString()}),a=t.rowId?.selectors[0]?.selector??"",[r,o]=(0,i.useState)(t.locator.selector),[l,c]=(0,i.useState)(t.locator.type),[s,d]=(0,i.useState)(a),[p,u]=(0,i.useState)(!1),[m,g]=(0,i.useState)(!1),[h,x]=(0,i.useState)(n),E=()=>{if(t.rowId&&s)t.rowId.selectors=[{selector:s,type:"CSS"}];else if(s)return{id:(0,C.A)(),type:"text",context:"relative",group:"scraper",name:"Container ID",schema:"string",selectors:[{selector:s,type:"CSS"}],withRender:!1};return t.rowId},f=i.useMemo(()=>{if("XPath"===l)try{let e=XPathResult.FIRST_ORDERED_NODE_TYPE;document.evaluate(r,document.body,null,e,null)}catch{return!1}else try{let e=r.split(">>>"),t=document.createDocumentFragment();e.length>1?e.forEach(e=>t.querySelector(e)):document.createDocumentFragment().querySelector(r)}catch{return!1}return!0},[r,l]),k=i.useMemo(()=>f&&h.every(e=>{let t=/^\d*\.?\d*$/;if("contentLoad"===e.type){if(!t.test(e.timeout??"")||!t.test(e.interval??""))return!1}else if(!t.test(e.timeout??""))return!1;return!0}),[f,h]),b=i.createElement(tc,null,i.createElement("p",null,"Some pages are using re-usable containers, for those pages we need to specify container ID CSS selector targeting element which textContent will be used as a container ID."),i.createElement(y.dN.Outline,{value:s||"",onChange:e=>d(e),placeholder:"Enter container ID selector"})),v=i.createElement(tc,null,h.map((e,t)=>"delay"===e.type?i.createElement(i.Fragment,null,i.createElement(y.fI,{key:`${t}-${e.type}`},i.createElement("label",{htmlFor:`delay-${t}`},"Delay (in seconds)"),i.createElement(y.dN.Outline,{id:`delay-${t}`,value:e.timeout??"",onChange:e=>{let n=[...h];if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],timeout:e},x(n)},placeholder:"Enter delay in seconds"}),i.createElement(y.$n,{key:`${t}-remove`,text:"Remove",onClick:()=>{let e=structuredClone(h);e.splice(t,1),x(e)}})),i.createElement(tl,null)):i.createElement(i.Fragment,null,i.createElement("label",{htmlFor:`interval-${t}`},"Content load interval(in seconds)"),i.createElement(y.dN.Outline,{id:`interval-${t}`,placeholder:"Enter interval in seconds",key:`${t}-interval`,value:e.interval??"",onChange:e=>{let n=[...h];if(n[t]?.type!=="contentLoad")throw Error(`Wait at index ${t} is not a content load`);if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],interval:e},x(n)}}),i.createElement("label",{htmlFor:`content-load-${t}`},"Content load timeout(in seconds)"),i.createElement(y.dN.Outline,{id:`content-load-${t}`,placeholder:"Enter content load in seconds",key:`${t}-content-load`,value:e.timeout??"",onChange:e=>{let n=[...h];if(!n[t])throw Error(`Wait at index ${t} not found`);n[t]={...n[t],timeout:e},x(n)}}),i.createElement(y.$n,{text:"Remove",onClick:()=>{let e=structuredClone(h);e.splice(t,1),x(e)}}),i.createElement(tl,null))),i.createElement(y.fI,{style:{justifyContent:"flex-end"}},i.createElement(y.$n,{text:"Add delay",onClick:()=>{x([...h,{type:"delay",timeout:tr(1e3).toString()}])}}),i.createElement(y.$n,{text:"Add content load",onClick:()=>x([...h,{type:"contentLoad",interval:tr(eK.X).toString(),timeout:tr(eK.f).toString()}])}))),S="XPath"===l;return i.createElement(y.aF,{isOpen:!0,style:{maxWidth:"500px",width:"100%",padding:24},onClickCapture:e.trackClick,"data-tracking-context":"AgentBuilder - UpdateContainers"},i.createElement(y.VP,{gap:8},i.createElement(ts,{id:"container-header"},"Enter container selector"),i.createElement(y.dN.Outline,{"aria-labelledby":"container-header",size:"l",value:r,onChange:o,variant:f?"default":"danger"}),i.createElement(y.lM,{size:"m",label:"XPath",checked:S,onChange:()=>c(S?"CSS":"XPath")}),i.createElement(y.fI,{style:{cursor:"pointer",justifyContent:"space-between"},onClick:()=>u(!p)},i.createElement(I.P,null,"Setup container ID (Advanced)"),i.createElement(y.In,{icon:p?"ArrowUpOutline":"ArrowDownOutline"})),i.createElement(y.SD,{open:p},b),"none"!==t.pagination.type?i.createElement(i.Fragment,null,i.createElement(y.fI,{style:{cursor:"pointer",justifyContent:"space-between"},onClick:()=>g(!m)},i.createElement(I.P,null,"Setup pagination load delays"),i.createElement(y.In,{icon:m?"ArrowUpOutline":"ArrowDownOutline"})),i.createElement(y.SD,{open:m},i.createElement(y.mH,{style:{maxHeight:600}},v))):null,i.createElement(td,null,i.createElement(y.$n,{disabled:!k,onClick:()=>e.onFinish({...t,locator:{type:l,selector:r},rowId:E(),wait:h.map(e=>"contentLoad"===e.type?{type:"contentLoad",timeout:ti(parseInt(e.timeout??"0")),interval:ti(parseInt(e.interval??"0"))}:{type:"delay",timeout:ti(parseInt(e.timeout??"0"))})}),text:"Save"}),i.createElement(y.$n,{variant:"outlined",onClick:e.onCancel,text:"Cancel"}))))}let tl=r.Ay.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid ${a.wdA};
`,tc=r.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,ts=r.Ay.h2`
  color: ${a.NEG};
`,td=r.Ay.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,tp={styleOperations:function(e){return async t=>{let{controller:n}=t;await n.removeAllStyles(),await n.styleElements((0,g.QR)(e))}},stylePagination:function(e){return async t=>{let{controller:n}=t;await n.stylePagination(e)}},pickElementStart:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.pickElement(e);if(!i)return;let r=await n.getElementRect(i),o=await (0,H.k)(i,n);a({type:p.SetPickerModalAnchorAndItems,items:o,anchor:r??null,element:i})}},pickSecondListItem:function(e,t){return async n=>{let{controller:a,dispatch:i}=n,r=await a.pickElement(e);if(!r)return;let o=await a.generateContainerSelector([...t,r]),l=(0,C.A)();i({type:p.ListCompeted,operation:{group:"container",id:l,locator:{type:"CSS",selector:o},operations:[],pagination:{type:"none"},wait:[]}})}},paginationElementPickStarted:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.pickElement(e);if(!i)return;let r=await n.generatePaginationSelectors(i);a({type:p.ClickPaginationSelectionFinished,selectors:r})}},executeOperations:function(e,t,n,a){return async i=>{let{controller:r,dispatch:o}=i;o(t?a(await r.executeMainScrapingOps(e,n,"main-session-result")):a(await r.executeMainScrapingOps(e,n)))}},executeDeepCrawlOperation:function(e,t){return async n=>{let{controller:a,dispatch:i}=n;i(t(await a.executeDeepCrawl(e)))}},stopDeepCrawlOperation:function(){return async e=>{let{controller:t}=e;await t.stopControllerExecution()}},pickerModalSubmit:function(e,t){return async n=>{let{controller:a,dispatch:i}=n,{allOperations:r,currentElement:o,container:l}=t;for(let{type:t,input:n}of e){let e,c;if(!o)throw Error("No current element");let s=await a.getElementLabel(o),d=(0,g.Cq)(r).map(e=>"name"in e?e.name:"").filter(ek.zz),u="relative";l&&(e=l.locator,u=await a.closestElemRef(o,l.locator)?"relative":"main");let m=await a.generateSelectors(o,e);if("input"==t){let e=await a.findInputableElement(o);e&&(c=await a.getInputType(e))}if("input"===t)i({type:p.PickerModalSingleOperationSubmitFinished,operation:{group:"action",type:"input",valueSchema:function(e){switch(e){case"checkbox":return"boolean";case"date":case"datetime":return"date";default:return"string"}}(c),context:u,name:Y(t,d,s),id:(0,C.A)(),selectors:m},elementRef:o,inputValue:n});else if("attribute"===t){if(!n)throw Error("Attribute operation requires an input");i({type:p.PickerModalSingleOperationSubmitFinished,operation:{group:"scraper",type:"attribute",attribute:n,context:u,name:Y(t,d,s),schema:"string",id:(0,C.A)(),selectors:m},elementRef:o})}else if("container"===t)await a.styleContainerPick([o]),i({type:p.ListPicked,currentElement:o});else if("table"===t)i({type:p.TablePicked,currentElement:o});else if((0,g.LB)(t)){let e=function(e){switch(e){case"link":case"image":case"socImage":case"url":return"url";case"timestamp":return"date";default:return"string"}}(t),n={context:u,group:"scraper",id:(0,C.A)(),name:Y(t,d,s),schema:e,selectors:m};i("image"===t?{type:p.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t,screenshot:"no-data"},elementRef:o}:"text"===t?{type:p.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t,withRender:!0},elementRef:o}:{type:p.PickerModalSingleOperationSubmitFinished,operation:{...n,type:t},elementRef:o})}else{let e={context:u,group:"action",id:(0,C.A)(),selectors:m,type:t,name:Y(t,d,s)};i("click"===t&&n?{type:p.PickerModalSingleOperationSubmitFinished,operation:{...e,byText:{value:n}},elementRef:o}:{type:p.PickerModalSingleOperationSubmitFinished,operation:e,elementRef:o})}}i({type:p.SetPickerModalItems,items:[]})}},generateTableContainerOperation:function(e){return async t=>{let{controller:n,dispatch:a}=t,i=await n.generateTableContainerOperation(e);a({type:p.TableContainerOperationCreated,operation:i})}},cancelPickElement:function(e){return async t=>{let{controller:n}=t;await n.cancelPickElement(e)}},saveOperationsState:function(e){return async t=>{let{controller:n}=t;await n.saveOperationsState(e)}},cancel:function(){return async e=>{let{controller:t}=e;await t.cancel()}},checkOperationsChangedAndDiscard:function(){return async e=>{let{controller:t,dispatch:n}=e;await t.hasOperationsChanged()?n({type:p.DiscardConfirmationRequested}):await t.cancel()}},executeSingleOperation:function(e,t){return async n=>{let{controller:a}=n;a&&await a.executeSingleOperation(e,t)}},trackEvent:function(e){return async t=>{let{api:n}=t;await n.trackEvent(e)}}},tu=(0,r.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,tm=(0,r.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tg=r.Ay.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid ${a.Tc2};
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  margin: 16px 0;
`,ty=r.Ay.div`
  padding: 12px;
  background-color: ${a.P0$};
  border: 1px solid ${a.MEI};
  border-radius: 8px;
  color: ${a.CCs};
  font-size: 14px;
  margin: 16px 0;
  word-break: break-word;
`;function tC(e){let{error:t,onClose:n,onSubmit:r,trackClick:o}=e,[l,c]=i.useState("");return i.createElement(y.pT,{header:"Import Operations",confirmBtn:i.createElement(tu,{text:"Import",onClick:()=>{r(l)}}),cancelBtn:i.createElement(tm,{text:"Cancel",onClick:n}),onClose:n,onClickCapture:o,"data-tracking-context":"ImportDialog"},i.createElement(I.H4,{color:a.t14},"Paste your operations array"),i.createElement(I.P,null,"Please paste the JSON content of your operations array below:"),t&&i.createElement(ty,null,t),i.createElement(tg,{value:l,onChange:e=>c(e.target.value),placeholder:"Paste your operations array here..."}))}function th(e,t){switch(e.type){case p.ListCompeted:{let n=0===t.operations.length||t.panelOpen,a=[...t.operations,e.operation],i={...t,panelOpen:n,operations:a,containerRefs:[],activeContainerId:e.operation.id,phase:{__type:"pagination-type-selection",container:e.operation}},r="locator"in e.operation?e.operation.locator:void 0,o=(0,g.Vh)(t.operations)&&!t.activeContainerId;return[i,[tp.saveOperationsState(i),...tS(i),tp.trackEvent({name:"scraper.builder.op.add",properties:{selectors:(r?[r]:[]).map(e=>`${e.type}:${e.selector}`),hasInactiveContainer:o,id:e.operation.id,name:e.operation.name??"",type:"container",group:e.operation.group}})]]}case p.ChangedButtonPosition:return[{...t,buttonPosition:e.position},[]];case p.ChangedPanelOpen:return[{...t,panelOpen:e.open},[]];case p.ClickedPlay:return[{...t,canRun:!1},[]];case p.ClickedStop:return[{...t,canRun:!0},[]];case p.ClickedDiscard:return[t,[tp.checkOperationsChangedAndDiscard()]];case p.UntargettedOperationItemClicked:{let n=(0,g.Vh)(t.operations)&&!t.activeContainerId;if(t.activeContainerId){let a=(0,g.X7)(t.operations,n=>n.id===t.activeContainerId&&(0,g.bB)(n)?{...n,operations:[...n.operations,e.operation]}:n),i={...t,operations:a};return[i,[tp.saveOperationsState(i),...tS(i),tp.trackEvent({name:"scraper.builder.op.add",properties:{selectors:[],hasInactiveContainer:n,id:e.operation.id,name:e.operation.name??"",type:e.operation.type??"",group:e.operation.group}})]]}{let a={...t,operations:[...t.operations,e.operation]};return[a,[tp.saveOperationsState(a),...tS(a),tp.trackEvent({name:"scraper.builder.op.add",properties:{selectors:[],hasInactiveContainer:n,id:e.operation.id,name:e.operation.name??"",type:e.operation.type??"",group:e.operation.group}})]]}}case p.OperationDeleteTriggered:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?null:t),a=t.executionResult.deepCrawlerResults.filter(t=>t.operationId!==e.operation.id),i=t.activeContainerId===e.operation.id,r={...t,activeContainerId:i?null:t.activeContainerId,operations:n,executionResult:{...t.executionResult,deepCrawlerResults:a}},o="type"in e.operation?e.operation.type:void 0;return[r,[tp.saveOperationsState(r),...tS(r),tp.trackEvent({name:"scraper.builder.op.delete",properties:{type:o,id:e.operation.id,name:e.operation.name??"",group:e.operation.group}})]]}case p.OperationsExecutionStarted:return[t,tS(t)];case p.EditOperationDialogOpened:return[{...t,editBasicOperation:e.operation},[]];case p.EditOperationDialogSubmitted:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t);return[{...t,operations:n},[tp.styleOperations(n),tp.executeOperations(n,t.isMainSession,t.executionResult.deepCrawlerResults.map(e=>e.tableResult),e=>({type:p.GotExecutionResult,executionResult:e}))]]}case p.EditOperationDialogClosed:return[{...t,editBasicOperation:null},tS(t)];case p.EditContainerDialogOpened:return[{...t,editContainerOperation:e.operation},tS(t)];case p.EditContainerDialogSubmitted:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id&&(0,g.bB)(t)?e.operation:t),a={...t,editContainerOperation:null,operations:n};return[a,[tp.saveOperationsState(a),...tS(a)]]}case p.EditContainerDialogClosed:return[{...t,editContainerOperation:null},[]];case p.EditPaginationDialogOpened:return[{...t,editPaginationOperation:{container:e.container,pagination:e.paginationClick}},[]];case p.EditPaginationDialogSubmitted:{let n=t.editPaginationOperation?.container;if(!n)return[t,[]];let a=e.paginationClick,i=(0,g.X7)(t.operations,e=>e.id===n.id&&(0,g.bB)(e)?{...e,pagination:a}:e);return[{...t,editPaginationOperation:null,operations:i},[tp.stylePagination(a)]]}case p.EditPaginationDialogClosed:return[{...t,editPaginationOperation:null},[]];case p.OperationUpdated:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t),a={...t,operations:n},i=g.N1(t.operations,e.operation.id)?.name,r=e.operation.name!=i,o="type"in e.operation?e.operation.type:void 0;return[a,[tp.saveOperationsState(a),...tS(a),tp.trackEvent({name:"scraper.builder.op.update",properties:{update_type:r?"rename":"update",type:o,id:e.operation.id,name:e.operation.name??"",group:e.operation.group}})]]}case p.OperationNameUpdated:{let n=(0,g.X7)(t.operations,t=>t.id===e.operationId?{...t,name:e.name}:t);return[{...t,operations:n},[]]}case p.RegExpUpdatedInModal:{let n=(0,g.X7)(t.operations,t=>t.id===e.operation.id?e.operation:t),a={...t,operations:n};return[t,tS(a)]}case p.SetActiveContainerId:return[{...t,activeContainerId:e.id},[]];case p.GotExecutionResult:{let[,...n]=e.executionResult.tabularData.data,a=n.length,i=0,r=0,o={};for(let e of n){let t=!1;for(let[n,a]of Object.entries(e.records??{}))o[n]||(o[n]={empty:0,withData:0}),null==a||""===String(a)?(o[n].empty++,t=!0):(o[n].withData++,r++);t&&i++}let l=Object.values(o).filter(e=>e.empty>0).length,c=Object.values(o).filter(e=>e.empty===a).length,s=Object.values(o).filter(e=>e.withData>0).length,d=Object.keys(o).length,p=d*a,u=p>0?r/p:0;return[{...t,executionResult:{...t.executionResult,tabularData:e.executionResult.tabularData,agentResult:e.executionResult.agentResult}},d>0?[tp.trackEvent({name:"scraper.builder.preview",properties:{cols_empty:c,cols_with_data:s,cols_with_gaps:l,cols_total:d,rows_total:a,rows_with_gaps:i,fill_percentage:u}})]:[]]}case p.GotDeepCrawlExecutionResult:{let n=t.runningDeepCrawlerId;if(!n)throw Error("Running deep crawler id is not set");return[{...t,runningDeepCrawlerId:null,executionResult:{...t.executionResult,tabularData:e.executionResult.tabularData,deepCrawlerResults:e.executionResult.deepCrawlResults.map(e=>({operationId:n,tableResult:e}))}},[]]}case p.SetPhase:return[{...t,phase:e.phase},[]];case p.SetPickerModalItems:{let n={...t.pickerModal,items:e.items};return[{...t,pickerModal:n},[]]}case p.SetPickerModalAnchorAndItems:{let{anchor:n,element:a,items:i}=e;return[{...t,pickerModal:{anchor:n,element:a,items:i}},[]]}case p.PickerModalSubmitStarted:if(!t.pickerModal.element)return[t,[]];return[t,[tp.pickerModalSubmit(e.items,{allOperations:t.operations,currentElement:t.pickerModal.element,container:t.activeContainerId?(0,g.yd)(t.operations,t.activeContainerId)??void 0:void 0})]];case p.PickerModalSingleOperationSubmitFinished:{let n;let a=0===t.operations.length||t.panelOpen;n=t.activeContainerId?(0,g.X7)(t.operations,n=>n.id===t.activeContainerId&&(0,g.bB)(n)?{...n,operations:[...n.operations,e.operation]}:n):[...t.operations,e.operation];let i={...t,operations:n,pickerModal:{items:[],element:null,anchor:null},panelOpen:a},r=[],o="input"===e.operation.type?{...e.operation,value:e.inputValue}:e.operation;"action"===o.group&&["click","hover","focus","enter","input"].includes(o.type)&&r.push(tp.executeSingleOperation(o));let l="selectors"in e.operation?e.operation.selectors:[],c=(0,g.Vh)(t.operations)&&!t.activeContainerId;return[i,[tp.saveOperationsState(i),...tS(i),...r,tp.trackEvent({name:"scraper.builder.op.add",properties:{id:e.operation.id,name:e.operation.name??"",selectors:l.map(e=>`${e.type}:${e.selector}`),type:e.operation.type,group:e.operation.group,hasInactiveContainer:c}})]]}case p.ListPicked:return[{...t,phase:{__type:"second-list-item-selection"},containerRefs:[e.currentElement]},[]];case p.TablePicked:return[t,[tp.generateTableContainerOperation(e.currentElement)]];case p.TableContainerOperationCreated:{let n=0===t.operations.length||t.panelOpen,a=[...t.operations,e.operation],i={...t,operations:a};return[{...i,panelOpen:n},[tp.saveOperationsState(i),...tS(i)]]}case p.ClickPaginationSelectionPhaseStarted:return[{...t,phase:{__type:"pagination-selection",container:e.container}},[]];case p.ClickPaginationSelectionPickStarted:return[t,[tp.paginationElementPickStarted(e.operationId)]];case p.ClickPaginationSelectionFinished:{let n=e.selectors;if("pagination-selection"!==t.phase.__type)throw Error("Invalid phase");let a=t.phase.container,i={type:"click",selectors:n},r=(0,g.X7)(t.operations,e=>e.id===a.id&&(0,g.bB)(e)?{...e,pagination:i}:e);return[{...t,phase:{__type:"field-selection"},operations:r},[tp.stylePagination(i)]]}case p.ClickPaginationSelectionCanceled:return[{...t,phase:{__type:"field-selection"}},[]];case p.PickedContainerPaginationType:{let n=(0,g.X7)(t.operations,t=>t.id===e.container.id&&(0,g.bB)(t)?{...t,pagination:e.pagination}:t);return[{...t,operations:n,phase:{__type:"field-selection"}},[tp.stylePagination(e.pagination)]]}case p.PickedContainerPaginationDirection:{let n=(0,g.X7)(t.operations,t=>{if(t.id===e.container.id&&(0,g.bB)(t)){let n=t.pagination;if("scroll"===n.type){let a={...n,direction:e.direction};return"up"===e.direction?{...t,pagination:a,reverse:!0}:{...t,pagination:a}}}return t}),a={...t,operations:n};return[a,[tp.saveOperationsState(a),...tS(a)]]}case p.PickElementClickedStarted:return[t,[tp.pickElementStart(e.operationId)]];case p.SecondListItemClicked:return[t,[tp.pickSecondListItem(e.operationId,t.containerRefs)]];case p.CancelPickElement:return[t,[tp.cancelPickElement(e.operationId)]];case p.DeepCrawlSessionCanceled:case p.DeepCrawlSessionErrored:case p.DeepCrawlSessionFinished:return[t,[]];case p.OperationListSorted:return[{...t,operations:e.operations},[]];case p.ContainerOperationListSorted:{let n=(0,g.X7)(t.operations,t=>t.id===e.id&&(0,g.bB)(t)?{...t,operations:e.operations}:t);return[{...t,operations:n},[]]}case p.PickerModalItemExpandToggled:{let n=eV(t.pickerModal.items,t=>t.id===e.item.id&&"expandable"===t.type?{...t,expanded:!t.expanded}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case p.PickerModalItemSelected:{let n=eV(t.pickerModal.items,t=>t.id===e.item.id&&"item"===t.type?{...t,selected:!t.selected}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case p.MinimizeBottomTableClicked:return[{...t,bottomTable:{minimized:!t.bottomTable.minimized}},[]];case p.NameUpdated:return[{...t,name:e.name},[]];case p.PickerModalItemInputChanged:{let n=eV(t.pickerModal.items,t=>t.id===e.item.id&&"item"===t.type?{...t,input:e.value}:t);return[{...t,pickerModal:{...t.pickerModal,items:n}},[]]}case p.DeepCrawlRunButtonClicked:return[{...t,runningDeepCrawlerId:e.operationId},tv(t,e.operationId,e.limit)];case p.DeepCrawlStopButtonClicked:return[t,[tp.stopDeepCrawlOperation()]];case p.DeepCrawlPlayAborted:return[{...t,runningDeepCrawlerId:null},[]];case p.ClearAllClicked:{if(!t.confirm)return[{...t,confirm:"clear-all"},[]];let e={...t,operations:[],confirm:null};return[e,[tp.saveOperationsState(e),...tS(e)]]}case p.ConfirmationCanceled:return[{...t,confirm:null},[]];case p.ExecuteActionOperationClicked:{let n;let a=(0,g.N1)(t.operations,e.operationId);if(a){let e=(0,g.xu)(t.operations,a);e?.group==="container"&&(n=e)}if(!a||"action"!==a.group)return[t,[]];return[t,[tp.saveOperationsState(t),tp.executeSingleOperation(a,n),tp.styleOperations(t.operations)]]}case p.ImportOperationTriggered:return[{...t,importDialog:!0,importError:null},[]];case p.ImportOperationSubmitted:try{let n=JSON.parse(e.content),a=z.array(_.dp).verify(n),i={...t,importDialog:!1,importError:null,operations:a};return[i,[tp.saveOperationsState(i),...tS(i)]]}catch(n){let e=n instanceof Error?n.message:String(n);return[{...t,importDialog:!0,importError:`Failed to import operations: ${e}`},[]]}case p.ImportOperationCanceled:return[{...t,importDialog:!1,importError:null},[]];case p.DiscardConfirmationRequested:return[{...t,confirm:"discard"},[]];case p.DiscardConfirmed:return[t,[tp.cancel()]];case p.DiscardConfirmationCanceled:return[{...t,confirm:null},[]]}}function tx(e){let{state:t,magicBox:n,renderSaveButton:r,dispatch:o,onSettingsButtonClicked:l,onStartDeepCrawlerClicked:c,onEditDeepCrawlerClicked:s,onStopAgentLoopClicked:d,trackClick:u}=e,m=(0,X.t)("browser-agent-button",[t.buttonPosition,t.panelOpen]);i.useEffect(()=>{t.operations.length>0&&setTimeout(()=>{o({type:p.OperationsExecutionStarted})},1e3)},[o,t.operations]),i.useEffect(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.shiftKey&&"o"===e.key&&(e.preventDefault(),o({type:p.ImportOperationTriggered}))};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[o]);let g=i.useCallback(e=>o({type:p.PickElementClickedStarted,operationId:e}),[o]),C=i.useCallback(e=>o({type:p.SecondListItemClicked,operationId:e}),[o]),h=i.useCallback(e=>o({type:p.ClickPaginationSelectionPickStarted,operationId:e}),[o]),x=i.useCallback(e=>o({type:p.CancelPickElement,operationId:e}),[o]);if("pagination-type-selection"===t.phase.__type){let e=t.phase.container;return i.createElement(tI,{"data-tracking-context":"Pagination"},i.createElement(tT,null,i.createElement(I.H4,{color:a.t14},"Please select the type of pagination"),i.createElement(y.VP,{gap:8},i.createElement(y.lm,{checked:!1,onClick:()=>o({type:p.ClickPaginationSelectionCanceled})},"None"),i.createElement(y.lm,{checked:!1,onClick:()=>o({type:p.ClickPaginationSelectionPhaseStarted,container:e})},"Click"),i.createElement(y.lm,{checked:!1,onClick:()=>o({type:p.PickedContainerPaginationType,pagination:{type:"scroll",direction:"down"},container:e})},"Infinite Scroll")),i.createElement(y.$n,{variant:"outlined",size:"l",round:!0,text:"Cancel",onClick:()=>o({type:p.ClickPaginationSelectionCanceled})})))}return"pagination-selection"===t.phase.__type?i.createElement(i.Fragment,null,i.createElement(tT,{"data-tracking-context":"Tutorial"},i.createElement(I.H4,{color:a.t14},"Please click on the pagination button"),i.createElement(y.$n,{variant:"outlined",size:"l",round:!0,text:"Cancel",onClick:()=>o({type:p.ClickPaginationSelectionCanceled})})),i.createElement(W,{pickElement:h,cancelPickElement:x})):i.createElement(i.Fragment,null,t.panelOpen?i.createElement(y.wv.Positioner,{$position:t.buttonPosition},i.createElement(X.Y,{id:"browser-agent-side-panel","data-testid":"browser-agent-side-panel"},i.createElement(y.wv,{busy:!1,position:t.buttonPosition,visible:t.panelOpen,"data-tracking-context":"SidePanel"},i.createElement(y.wv.Header,{style:{minHeight:n?"88px":"auto",alignItems:"flex-start"}},l&&i.createElement(y.$n,{variant:"flat",round:!0,mode:"color",icon:"SettingsOutline",tooltipText:"Model settings",size:"l",onClick:l}),i.createElement(y.wv.CloseButton,{tooltipText:"Collapse",onClick:()=>o({type:p.ChangedPanelOpen,open:!1}),position:t.buttonPosition}),i.createElement(y.$n,{variant:"flat",round:!0,icon:"CrossOutline",mode:"color",size:"l",tooltipText:"Discard",onClick:()=>o({type:p.ClickedDiscard})})),n,i.createElement(tE,null,i.createElement(eM,{activeContainerId:t.activeContainerId,runningDeepCrawlerId:t.runningDeepCrawlerId,operations:t.operations,onSortEnd:e=>{o({type:p.OperationListSorted,operations:e})},dispatch:o,onStartDeepCrawlerClicked:c,onEditDeepCrawlerClicked:s}),"running"===t.agentLoop.status&&i.createElement("div",null,i.createElement(tW,{state:t.agentLoop.indicator})),t.operations.length>0&&r),i.createElement(Q,{agentLoopStatus:t.agentLoop.status,onAdd:e=>o({type:p.UntargettedOperationItemClicked,operation:e}),onClearAll:()=>o({type:p.ClearAllClicked}),onPlay:()=>o({type:p.ClickedPlay}),onStop:d})))):i.createElement(y.F$,{divRef:m,onClick:()=>o({type:p.ChangedPanelOpen,open:!0}),position:t.buttonPosition,variant:"primary",onPositionChange:e=>o({type:p.ChangedButtonPosition,position:e})}),"field-selection"===t.phase.__type&&0===t.pickerModal.items.length?i.createElement(W,{pickElement:g,cancelPickElement:x}):null,"second-list-item-selection"===t.phase.__type?i.createElement(i.Fragment,null,i.createElement(W,{pickElement:C,cancelPickElement:x}),i.createElement(tT,null,i.createElement(I.H4,{color:a.t14},"Select another list item"),i.createElement(I.P,null,"Please select one more list item of the list that you want to scrape."))):null,i.createElement(eX,{dispatch:o,state:t.pickerModal}),t.editBasicOperation?i.createElement(e4,{onClose:()=>o({type:p.EditOperationDialogClosed}),onUpdate:e=>o({type:p.OperationUpdated,operation:e}),operation:t.editBasicOperation,onRegExpUpdate:e=>o({type:p.RegExpUpdatedInModal,operation:e}),trackClick:u}):null,t.editContainerOperation?i.createElement(to,{operation:t.editContainerOperation,onCancel:()=>o({type:p.EditContainerDialogClosed}),onFinish:e=>o({type:p.EditContainerDialogSubmitted,operation:e}),trackClick:u}):null,t.editPaginationOperation?i.createElement(tn,{selectors:t.editPaginationOperation.pagination.selectors,onCancel:()=>o({type:p.EditPaginationDialogClosed}),onFinish:e=>o({type:p.EditPaginationDialogSubmitted,paginationClick:{type:"click",selectors:e}}),trackClick:u}):null,i.createElement(em,{bottomTableState:t.bottomTable,operations:t.operations,name:t.name,panelPosition:t.buttonPosition,panelOpen:t.panelOpen,executionResult:t.executionResult,dispatch:o}),i.createElement(tb,{state:t.confirm,dispatch:o,trackClick:u}),t.importDialog&&i.createElement(tC,{error:t.importError,onClose:()=>o({type:p.ImportOperationCanceled}),onSubmit:e=>o({type:p.ImportOperationSubmitted,content:e}),trackClick:u}),i.createElement(ex.g,{position:t.buttonPosition,playlistId:"PLcXybhQ4q2HmfyOZEz4dtWaQzp-wrsUvP",videos:t.helpSidebarVideos,hidden:t.panelOpen}))}let tE=r.Ay.div`
  padding: 12px 24px;
  height: 100vh;
  overflow: auto;
`,tf=(0,r.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,tk=(0,r.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tb=i.memo(function(e){let{state:t,dispatch:n,trackClick:a}=e;if(!t)return null;let r=()=>n({type:p.ConfirmationCanceled});switch(t){case"clear-all":return i.createElement(y.pT,{header:"Clear All Operations",confirmBtn:i.createElement(tf,{text:"Clear All",onClick:()=>n({type:p.ClearAllClicked})}),cancelBtn:i.createElement(tk,{text:"Cancel",onClick:r}),onClose:r,onClickCapture:a,"data-tracking-context":"Confirmation"},"Are you sure you want to clear all operations? This action cannot be undone.");case"discard":return i.createElement(y.pT,{header:"Discard Changes",confirmBtn:i.createElement(tf,{text:"Discard",onClick:()=>n({type:p.DiscardConfirmed})}),cancelBtn:i.createElement(tk,{text:"Cancel",onClick:r}),onClose:r,onClickCapture:a,"data-tracking-context":"Confirmation"},"You have made changes to the operations. Are you sure you want to discard them?")}}),tv=(e,t,n)=>{let a=(0,g.Oi)(e.operations,t);if(!a)return[];let i=(0,g.Kt)(e.operations).map(e=>e.id),r=i.indexOf(t),o=i.slice(r),l=e.executionResult.deepCrawlerResults.filter(e=>!o.includes(e.operationId)).map(e=>e.tableResult);return[tp.executeDeepCrawlOperation({allOperations:e.operations,deepCrawlOperation:a,mainSessionResult:e.executionResult.agentResult,deepCrawlerResults:l,limit:n},e=>{switch(e.status){case"aborted":return{type:p.DeepCrawlPlayAborted};case"success":let{tabularData:t,deepCrawlResults:n}=e;return{type:p.GotDeepCrawlExecutionResult,executionResult:{tabularData:t,deepCrawlResults:n}}}})]},tS=e=>{let t=[tp.executeOperations(e.operations,e.isMainSession,e.executionResult.deepCrawlerResults.map(e=>e.tableResult),e=>({type:p.GotExecutionResult,executionResult:e}))];return t.push(tp.styleOperations(e.operations)),t},tw=r.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${I.H4} {
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
`,tT=i.memo(function(e){let{children:t,...n}=e;return i.createElement(eC,{initialCoords:{left:32,top:32}},i.createElement(X.Y,{id:"agent-tutorial",...n},i.createElement(tw,{style:{width:380}},t)))}),tI=i.memo(function(e){let{children:t,...n}=e;return i.createElement(tO,n,i.createElement(X.Y,{id:"agent-simple-modal",style:{width:"100%",height:"100%"}},t))}),tO=r.Ay.div`
  position: fixed;
  inset: 0;
  display: inline-block;
`;function tD(e,t){switch(e.type){case u.OperationsBuilderAction:{let[n,a]=th(e.action,t.operationsBuilderState),i=e.type;return[{...t,operationsBuilderState:n,model:{...t.model,operations:n.operations,details:{...t.model.details,name:n.name}}},a.map((0,s.zy)(e=>({type:i,action:e})))]}case u.EditModelSettingsDialogOpened:return[{...t,settingsOpen:!0},[]];case u.EditModelSettingsDialogSubmitted:{let n=e.modelSettings;return[{...t,settingsOpen:!1,model:{...t.model,...n}},[]]}case u.EditModelSettingsDialogClosed:return[{...t,settingsOpen:!1},[]];case u.StartedDeepCrawlerSessionClicked:{let n=[t.operationsBuilderState.executionResult.agentResult,...t.operationsBuilderState.executionResult.deepCrawlerResults.map(e=>e.tableResult)],a=(0,m.q)(n,e.operation.id).find(e=>{try{return new URL(e.value),!0}catch(e){return!1}}),i=(0,m.G)(n,e.operation.id);if(!a||!i)return[t,[]];return[t,[h.startDeepCrawler({url:a.value,operationId:e.operation.id,targetTableId:i.id,rowNum:a.rowNum},()=>({type:u.DeepCrawlerSessionStarted}))]]}case u.EditDeepCrawlerClicked:{let n,a,i;let r=e.operation,[o]=r.link;if(o?.type==="ref"){let e=o.editUrl;if(e)n=e;else{let e=[t.operationsBuilderState.executionResult.agentResult,...t.operationsBuilderState.executionResult.deepCrawlerResults.map(e=>e.tableResult)],a=(0,m.q)(e,o.targetId);if(0===a.length)throw Error("No results found for deep crawler operation, try to run previous operations first.");{let e=a.find(e=>{try{return new URL(e.value),!0}catch(e){return!1}});if(e)n=e.value;else throw Error("No result found for deep crawler operation, try to run previous operations first and ensure they have valid URLs.")}}}else if(o?.type==="static")n=o.url;else throw Error("Dynamic deep crawler link not supported");let l=t.operationsBuilderState.executionResult.deepCrawlerResults.find(e=>e.operationId===r.id);return l&&l.tableResult.tableRef&&(a=l.tableResult.tableRef.rowNum,i=l.tableResult.tableRef.tableId),[t,[h.editDeepCrawler({url:n,operation:e.operation,targetTableId:i,rowNum:a,onDone:()=>({type:u.DeepCrawlerSessionStarted})})]]}case u.DeepCrawlSessionEditFinished:{if((0,g.mC)(t.model.operations))throw Error("Deep crawler operation can't be added to the table operation");let n=e.rowNum&&e.targetTableId?{operationId:e.operation.id,tableResult:{...e.deepCrawlerResult,tableRef:{operationId:e.targetOperationId,rowNum:e.rowNum,tableId:e.targetTableId}}}:{operationId:e.operation.id,tableResult:e.deepCrawlerResult},a=structuredClone(t.operationsBuilderState.executionResult.deepCrawlerResults),i=a.find(t=>t.operationId===e.operation.id);i?i.tableResult.tableResult=n.tableResult.tableResult:a.push(n);let r=(0,g.X7)(t.model.operations,t=>"deepCrawl"===t.group&&t.id===e.operation.id?e.operation:t);return[{...t,operationsBuilderState:{...t.operationsBuilderState,operations:r,executionResult:{...t.operationsBuilderState.executionResult,deepCrawlerResults:a}},model:{...t.model,operations:r}},[h.executeOperations(r,a.map(e=>e.tableResult),e=>({type:u.GotExecutionResult,executionResult:e}))]]}case u.DeepCrawlerSessionStarted:case u.DeepCrawlSessionCanceled:case u.DeepCrawlSessionErrored:return[t,[]];case u.DeepCrawlSessionFinished:{if((0,g.mC)(t.model.operations))throw Error("Deep crawler operation can't be added to the table operation");let n={operationId:e.operation.id,tableResult:{...e.deepCrawlerResult,tableRef:{operationId:e.targetOperationId,rowNum:e.rowNum,tableId:e.targetTableId}}},a=[...t.operationsBuilderState.executionResult.deepCrawlerResults,n];return[{...t,operationsBuilderState:{...t.operationsBuilderState,operations:[...t.operationsBuilderState.operations,e.operation],executionResult:{...t.operationsBuilderState.executionResult,deepCrawlerResults:a}},model:{...t.model,operations:[...t.model.operations,e.operation]}},[h.executeOperations([...t.model.operations,e.operation],a.map(e=>e.tableResult),e=>({type:u.GotExecutionResult,executionResult:e}))]]}case u.GotExecutionResult:return[{...t,operationsBuilderState:{...t.operationsBuilderState,executionResult:{...t.operationsBuilderState.executionResult,tabularData:e.executionResult.tabularData,agentResult:e.executionResult.agentResult}}},[]];case u.Finished:return[t,[h.finish(t.model)]];case u.Canceled:return[t,[h.cancel()]];case u.SubmittedMagicBoxValue:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,goal:t.magicBox.value,currentMessage:{content:"Starting AI agent...",type:"executor"},messageHistory:[]}}}},[async e=>{let{api:n}=e;await n.trackEvent({name:"scraper.builder.agent_prompt",properties:{prompt:t.magicBox.value}})},h.startAgentLoop(t.magicBox.value)]];case u.ConfirmMagicBoxSubmission:return[{...t,magicBox:{...t.magicBox},model:{...t.model,operations:[]},operationsBuilderState:{...t.operationsBuilderState,operations:[],agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,goal:t.magicBox.value,currentMessage:{content:"Starting AI agent...",type:"executor"},messageHistory:[]}}}},[h.startAgentLoop(t.magicBox.value)]];case u.CancelMagicBoxSubmission:return[{...t,magicBox:{...t.magicBox}},[]];case u.ChangedMagicBoxValue:return[{...t,magicBox:{...t.magicBox,value:e.value}},[]];case u.SetPhase:return[{...t,phase:e.phase},[]];case u.ExtendModelClicked:{let n=e.model.operations;if((0,g.mC)(n))throw Error("Table operation is not supported in the model suggestion phase");return[{...t,model:e.model,operationsBuilderState:{...t.operationsBuilderState,operations:n,panelOpen:!0}},[]]}case u.UseCurrentModelClicked:return[{...t},[h.finish(e.suggestion.model,e.suggestion.ref)]];case u.ConvertTableOperationClicked:if(!(0,g.mC)(t.model.operations))throw Error("Can not convert non-table operation");return[t,[h.convertLegacyTableOperation(t.model.operations,e=>({type:u.ConvertTableOperationFinished,operation:e}))]];case u.ConvertTableOperationFinished:return[{...t,model:{...t.model,operations:[e.operation]},operationsBuilderState:{...t.operationsBuilderState,operations:[e.operation]}},[]];case u.DeleteTableOperationClicked:return[{...t,model:{...t.model,operations:[]},operationsBuilderState:{...t.operationsBuilderState,operations:[]}},[]];case u.AgentLoopStateUpdated:return[{...t,model:{...t.model,operations:e.operations},operationsBuilderState:{...t.operationsBuilderState,operations:e.operations}},[]];case u.AgentLoopStarted:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"running",indicator:{...t.operationsBuilderState.agentLoop.indicator,currentMessage:{content:"AI Agent started.",type:"executor"},messageHistory:[]}}},magicBox:{...t.magicBox,value:""}},[]];case u.AgentLoopFinished:{let n={...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"idle"},operations:e.operations},model:{...t.model,operations:e.operations}};return[n,[h.saveOperationsState(n.operationsBuilderState)]]}case u.AgentLoopStopped:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,status:"idle"}}},[]];case u.AgentLoopIndicatorUpdated:return[{...t,operationsBuilderState:{...t.operationsBuilderState,agentLoop:{...t.operationsBuilderState.agentLoop,indicator:e.indicator}}},[]];case u.ClickedStopAgentLoop:return[t,[h.stopAgentLoop()]];case u.TrackableClicked:return[t,[]];default:return e}}function tA(e){let{state:t,dispatch:n,trackClick:a}=e,r=(0,s.i8)(n,u.OperationsBuilderAction);return"modelSuggestion"===t.phase?i.createElement(M,{suggestions:t.suggestions,model:t.model,dispatch:n}):(0,g.mC)(t.model.operations)?i.createElement(i.Fragment,null,i.createElement(y.pT,{header:"Table Scraping Update Required",confirmBtn:i.createElement(tR,{text:"Update Format",onClick:()=>n({type:u.ConvertTableOperationClicked})}),cancelBtn:i.createElement(t$,{text:"Start Fresh",onClick:()=>n({type:u.DeleteTableOperationClicked})}),onClose:()=>n({type:u.Canceled}),onClickCapture:a,"data-tracking-context":"TableUpdate"},"We've improved our table scraping capabilities! Your current configuration uses an older format that needs to be updated.")):i.createElement(i.Fragment,null,i.createElement(tx,{state:t.operationsBuilderState,dispatch:r,trackClick:a,renderSaveButton:i.createElement(U,{onClick:()=>{n({type:u.Finished})},round:!0,size:"l",variant:"primary",fullWidth:!0,text:"Save Agent"}),onSettingsButtonClicked:()=>n({type:u.EditModelSettingsDialogOpened}),onStartDeepCrawlerClicked:e=>{n({type:u.StartedDeepCrawlerSessionClicked,operation:e})},onEditDeepCrawlerClicked:e=>{n({type:u.EditDeepCrawlerClicked,operation:e})},onStopAgentLoopClicked:()=>{n({type:u.ClickedStopAgentLoop})},magicBox:t.magicBox.visible?i.createElement(tP,{size:"l",onChange:e=>n({type:u.ChangedMagicBoxValue,value:e}),onSubmit:()=>n({type:u.SubmittedMagicBoxValue}),value:t.magicBox.value}):null}),t.settingsOpen?i.createElement(T,{model:t.model,onSubmit:e=>n({type:u.EditModelSettingsDialogSubmitted,modelSettings:e}),onCancel:()=>n({type:u.EditModelSettingsDialogClosed}),canControlPremium:t.canControlPremium,trackClick:a}):null)}let tP=(0,r.Ay)(x.P)`
  transform: translateY(-50%);
`,tR=(0,r.Ay)(y.$n).attrs({variant:"primary",size:"xl",round:!0})``,t$=(0,r.Ay)(y.$n).attrs({variant:"outlined",size:"xl",round:!0})``,tM=e=>{let{api:t,state:n,controller:a}=e,[r,o]=(0,s.WO)(tD,n,[],{controller:a,api:t}),l=i.useCallback(e=>{t.trackEvent({name:"ui.click",properties:{name:e}})},[t]),c=(0,d.H)(l,[]);return i.useEffect(()=>{a.on("deepCrawlSessionCanceled",async e=>{o({type:u.DeepCrawlSessionCanceled,sessionId:e})}),a.on("deepCrawlSessionErrored",async e=>{o({type:u.DeepCrawlSessionErrored,sessionId:e})}),a.on("deepCrawlSessionFinished",async e=>{let{operation:t,agentTableResult:n,targetOperationId:a,targetTableId:i,rowNum:r}=e;o({type:u.DeepCrawlSessionFinished,operation:t,targetOperationId:a,deepCrawlerResult:n,targetTableId:i,rowNum:r})}),a.on("deepCrawlSessionEditFinished",async e=>{let{operation:t,agentTableResult:n,targetOperationId:a,targetTableId:i,rowNum:r}=e;o({type:u.DeepCrawlSessionEditFinished,operation:t,targetOperationId:a,deepCrawlerResult:n,targetTableId:i,rowNum:r})}),a.on("isMounted",async()=>!0),a.on("onAgentLoopStateUpdate",async e=>{o({type:u.AgentLoopStateUpdated,operations:e})}),a.on("onAgentLoopStarted",async()=>{o({type:u.AgentLoopStarted})}),a.on("onAgentLoopFinished",async e=>{o({type:u.AgentLoopFinished,operations:e})}),a.on("onAgentLoopStopped",async()=>{o({type:u.AgentLoopStopped})}),a.on("onAgentLoopIndicatorUpdated",async e=>{o({type:u.AgentLoopIndicatorUpdated,indicator:e})})},[a,o]),i.createElement("div",{onClickCapture:c,"data-tracking-context":"AgentBuilder"},i.createElement(tA,{state:r,dispatch:o,trackClick:c}))},tB="OperationsBuilderAction",tL="Finished";function tF(e,t){switch(e.type){case tB:{let[n,a]=th(e.action,t.operationsBuilderState),i=e.type;return[{...t,operation:{...t.operation,name:n.name,operations:(0,g.QR)(n.operations)},operationsBuilderState:n},a.map((0,s.zy)(e=>({type:i,action:e})))]}case tL:return[t,[async e=>{let{controller:n}=e;await n.finish({operation:t.operation,id:t.operation.id,agentTableResult:t.operationsBuilderState.executionResult.agentResult})}]]}}function tN(e){let{state:t,dispatch:n,controller:a,api:r}=e,o=(0,s.i8)(n,tB),l=i.useCallback(e=>{r.trackEvent({name:"ui.click",properties:{name:e}})},[r]),c=(0,d.H)(l,[]);return i.useEffect(()=>(a.on("isMounted",async()=>!0),()=>{a.on("isMounted",async()=>!1)}),[a]),i.createElement(i.Fragment,null,i.createElement(tx,{trackClick:c,state:t.operationsBuilderState,dispatch:o,onSettingsButtonClicked:null,onStartDeepCrawlerClicked:null,onEditDeepCrawlerClicked:null,onStopAgentLoopClicked:null,renderSaveButton:i.createElement(U,{onClick:()=>{n({type:tL})},round:!0,size:"l",variant:"primary",fullWidth:!0,text:"Save Crawler"})}))}let tU=e=>{let{controller:t,api:n}=e,[a,r]=(0,s.WO)(tF,e.state,[],{controller:t,api:n});return i.createElement(i.Fragment,null,i.createElement(tN,{state:a,dispatch:r,controller:t,api:n}))},tz=e=>{let[t,n]=(0,i.useState)(!1);return i.createElement(i.Fragment,null,i.createElement("div",{style:{position:"fixed",bottom:20,right:20,backgroundColor:"white",zIndex:0x77359402}},i.createElement(k.$n,{"data-testid":"stop-scraping-progress-btn",size:"l",onClick:()=>{n(!0),e.onClick()},text:t?"Stopping...":e.text??"Stop Scraping"})))},t_=(0,r.i7)`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,tq=(0,r.i7)`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`,tH=e=>{let{message:t,isPending:n=!1,isNew:a=!1}=e;return i.createElement(tJ,{type:t.type,$isNew:a},i.createElement(tK,{type:t.type},"executor"===t.type?"E":"V"),i.createElement(tQ,null,t.content,n&&i.createElement(tZ,{size:"xs",$pulse:!0})))},tW=e=>{let{state:t,withShadow:n=!1}=e,a=(0,i.useRef)(null),[r,o]=i.useState(0);return(0,i.useEffect)(()=>{a.current&&a.current.scrollIntoView({behavior:"smooth"})},[t.messageHistory,t.currentMessage]),(0,i.useEffect)(()=>{t.messageHistory&&o(t.messageHistory.length)},[t.messageHistory]),i.createElement(tX,{$withShadow:n},t.goal&&i.createElement(tV,null,t.goal),i.createElement(tG,null,t.messageHistory&&t.messageHistory.map((e,t)=>i.createElement(tH,{key:t,message:e,isNew:t>=r-1})),t.currentMessage&&i.createElement(tH,{message:t.currentMessage,isPending:!0,isNew:!0}),i.createElement("div",{ref:a})))},tj=e=>{let{state:t}=e;return i.createElement(tY,null,i.createElement(tW,{state:t,withShadow:!0}))},tY=r.Ay.div`
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: calc(100vh - 40px);
  width: 340px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: ${t_} 0.3s ease-out;
`,tX=r.Ay.div`
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
`,tV=r.Ay.div`
  padding: 18px 20px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${a.Q_2};
  background-color: ${a.KxS};
  color: ${a.c3n};
  white-space: normal;
  word-break: break-word;
`,tG=r.Ay.div`
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
`,tJ=r.Ay.div`
  display: flex;
  padding: 12px;
  border-radius: 10px;
  background-color: ${e=>"executor"===e.type?a.KxS:a.hi1};
  gap: 10px;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${e=>"executor"===e.type?a.Q_2:a.Tc2};
  animation: ${e=>e.$isNew?(0,r.AH)`
          ${t_} 0.3s ease-out
        `:"none"};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`,tK=r.Ay.div`
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
`,tQ=r.Ay.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${a.c3n};
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  word-break: break-word;
  letter-spacing: 0.01em;
`,tZ=(0,r.Ay)(l.y)`
  margin-left: 8px;
  animation: ${e=>e.$pulse?(0,r.AH)`
          ${tq} 1.5s ease-in-out infinite
        `:"none"};
`,t0=e=>{let{api:t,controller:n}=e,[a,r]=i.useState(!1);i.useEffect(()=>{let e=async()=>{r(!0)};return n.on("collectFeedback",e),()=>{n.off("collectFeedback",e)}},[n]);let l=i.useCallback((e,a)=>{(0,o.J)(t,async()=>{await n.feedbackComplete("Yes"===a,e)})},[t,n]),s=i.useCallback(()=>{(0,o.J)(t,()=>n.feedbackComplete(!0,""))},[t,n]);return a?i.createElement(c._,{open:a,onClose:s,onSubmit:l}):null},t1=e=>{let{controller:t}=e,[n,a]=i.useState({goal:"",messageHistory:[],currentMessage:{content:"",type:"executor"}});return i.useEffect(()=>{let e=async e=>{a(e)};return t.on("setState",e),()=>{t.off("setState",e)}},[t]),i.createElement(tj,{state:n})},t2=e=>{let{api:t,controller:n}=e;return i.createElement(i.Fragment,null,i.createElement(t0,{api:t,controller:n}),i.createElement(t1,{controller:n}),i.createElement(tz,{text:"Stop",onClick:()=>n.cancel()}))};var t4=n(7711),t8=n(88260);let t6=r.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: clamp(16px, 3vw, 24px);
  padding: clamp(16px, 3vw, 24px);
  height: 100%;
  max-height: 90vh;
  max-width: 800px;
`,t3=(0,r.Ay)(y.fI)`
  gap: 12px;
  justify-content: flex-end;
`,t5=r.Ay.button`
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
`,t9=r.Ay.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: 4px;
`,t7=(0,r.Ay)(I.H5)`
  word-break: break-word;
  font-weight: 500;
`,ne=r.Ay.span`
  font-size: clamp(12px, 1.5vw, 14px);
  color: #666;
  word-break: break-all;
  width: 100%;
`,nt=i.memo(e=>{let{state:t,dispatch:n}=e,[a,r]=i.useState(null),o=e=>{r(e)},l=()=>{n({type:"Cancel"})};return i.createElement(t8.a,{isOpen:!0,onClose:()=>l(),coordinatesAware:!0},i.createElement(t6,null,i.createElement(t4.J,{onClick:l,abs:!0,style:{top:12,right:12}}),i.createElement(I.H2,null,t.header),t.subHeader&&i.createElement(I.P,null,t.subHeader),i.createElement(y.VP,{style:{minHeight:120}},i.createElement(I.H5,null,"Search Results"),i.createElement(y.mH,{style:{overflow:"hidden"}},t.searchResults?.map(e=>i.createElement(t5,{key:e.id,selected:a===e.id,onClick:()=>o(e.id)},e.favicon&&i.createElement(t9,{src:e.favicon,alt:""}),i.createElement(y.VP,null,i.createElement(t7,null,e.title),i.createElement(ne,null,e.url)))))),i.createElement(y.VP,{style:{minHeight:120}},i.createElement(I.H5,null,"Open tabs"),i.createElement(y.mH,{style:{overflow:"hidden"}},t.openTabs.map(e=>i.createElement(t5,{key:e.id,selected:a===e.id,onClick:()=>o(e.id)},e.favicon&&i.createElement(t9,{src:e.favicon,alt:""}),i.createElement(y.VP,null,i.createElement(t7,null,e.title),i.createElement(ne,null,e.url)))))),i.createElement(t3,null,i.createElement(k.$n,{variant:"flat",size:"l",text:"Cancel",onClick:l,round:!0}),i.createElement(k.$n,{variant:"primary",size:"l",round:!0,text:"Select",onClick:()=>{if(!a)return;let e=t.openTabs.find(e=>e.id===a),i=t.searchResults?.find(e=>e.id===a);e?n({type:"Finish",payload:{tabId:e.id,url:e.url}}):i&&n({type:"Finish",payload:{tabId:i.id,url:i.url}})},disabled:!a}))))}),nn=e=>{let{controller:t,state:n}=e,[a,r]=(0,s.WO)(na,n,[],{controller:t});return i.createElement(nt,{state:a,dispatch:r})};function na(e,t){switch(e.type){case"setOpenTabs":return[{...t,openTabs:e.payload},[]];case"setSearchResults":return[{...t,searchResults:e.payload},[]];case"Finish":return[t,[async t=>{let{controller:n}=t;await n.onResult(e.payload)}]];case"Cancel":return[t,[async e=>{let{controller:t}=e;await t.onCancel()}]];default:return[t,[]]}}},69236:(e,t,n)=>{n.d(t,{z:()=>u});var a=n(69670),i=n(54357),r=n(14041),o=n(39716),l=n(28926),c=n(61994),s=n(85040),d=n(21799);let p=(0,s.A)(e=>({nag:{...d.SP,backgroundColor:a.Xi8,borderRadius:".75rem",boxSizing:"border-box",color:a.ONy,fontWeight:600,padding:e.spacing(4,4),width:"358px",position:"relative"},header:{display:"flex",alignItems:"center",margin:e.spacing(0,2,3,2)},logo:{display:"block",marginRight:e.spacing(7)},titleWrapper:{display:"flex",flexDirection:"column",alignItems:"flex-start"},headline:{lineHeight:"44px",fontSize:"18px"},bodyText:{marginTop:e.spacing(2),lineHeight:"22px",fontSize:"14px"},subTitle:{lineHeight:"22px",color:a.ONy,opacity:.8},fullWidth:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},dot:{background:a.ui$,borderRadius:"50%",margin:"5px",height:"6px",transition:".5s all",width:"6px"},dotsWrapper:{display:"flex",alignItems:"center",width:"100%"},dotActive:{background:a.g7N},dots:{display:"flex",alignItems:"center",justifyContent:"center",flex:1},hover:{".hideTillMouseOver":{opacity:1}},invisible:{opacity:0},fadeIn:{opacity:1,transition:"opacity .5s"},fadeOut:{opacity:0,transition:"opacity .5s"},nagIconWrapper:{display:"flex","& .bardeen-icon":{"&:not(:last-child)":{marginRight:e.spacing(3)}}},nagTitle:{fontWeight:600,fontSize:"18px",lineHeight:"19px",marginBottom:e.spacing(3),color:a.t14},nagSubTitle:{fontSize:"16px",lineHeight:"24px"},commands:{marginBottom:e.spacing(4),display:"flex",alignItems:"center",flexDirection:"column",flexWrap:"wrap",width:"100%",paddingLeft:e.spacing(2),"& > * + *":{marginTop:4,position:"relative","&:after":{borderLeft:`2px dotted ${a.ydb}`,content:"''",height:26,left:16,position:"absolute",top:-29,transform:"translate(-50%,0)",width:0}},"& > :first-child + :after":{borderLeft:`2px dotted ${a.ydb}`},"& > :first-child":{paddingTop:0}},command:{display:"flex",color:a.MfC,padding:e.spacing(0,2),gap:"12px",alignItems:"center",margin:e.spacing(4,0),width:"100%"},closeIcon:{display:"flex",alignItems:"center",justifyContent:"center",padding:e.spacing(1.5),borderRadius:"50%",border:`2px solid ${a.ONy}`,backgroundColor:a.NEG,position:"absolute",top:-e.spacing(4),left:-e.spacing(4),cursor:"pointer"},cardIconsLabel:{padding:e.spacing(0)}})),u=e=>{let[t,n]=r.useState("init"),{hideAfterMs:o,onClose:s,onRun:d,playbook:u}=e,g=p();return r.useEffect(()=>{let e=(()=>{switch(t){case"init":return setTimeout(()=>n("fadeIn"),550);case"fadeIn":return o?setTimeout(()=>n("hide"),o):void 0;case"hide":return setTimeout(()=>s("timeout"),550)}})();return()=>clearTimeout(Number(e))},[t,o,s]),r.createElement("div",{className:(0,i.A)(g.nag,g.invisible,{[g.fadeIn]:"fadeIn"===t,[g.fadeOut]:"hide"===t})},r.createElement("div",{className:g.header},r.createElement("div",{className:g.titleWrapper},r.createElement(c.hE,{variant:"h5",className:g.headline},"We created an automation for you!"))),r.createElement(m,null,u.integrationIcons.map((e,t)=>{let{icon:n,name:a}=e;return r.createElement(l.z9,{key:t,icon:n,tooltipText:a,size:"m"})}),r.createElement("span",null,u.name)),r.createElement(l.$n,{icon:"BardeenLogoColoredNegative",style:{justifyContent:"center"},size:"l",variant:"primary",fullWidth:!0,onClick:()=>d(u),text:"Try it out"}),r.createElement("div",{className:g.closeIcon,onClick:()=>s("closed")},r.createElement(l.In,{icon:"CrossOutline",size:16,color:a.ONy})))},m=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`},13693:(e,t,n)=>{n.d(t,{$:()=>a});var a={};n.r(a),n.d(a,{C:()=>i.C});var i=n(78927);n(55553)},87023:(e,t,n)=>{n.d(t,{F:()=>p,u:()=>d});var a=n(36884),i=n(49861),r=n(36213),o=n(63711),l=n(93510),c=n(19431),s=n(80389);let d={inviteForm:[],invitationRequest:a.j.NotAsked,invitations:[],refusedProEmails:[],refusedExistingEmails:[],upgradeToTeam:{cost:0,nextPeriodCost:0,loading:!1,createSpaceLoading:!1,invitationInput:""}},p=(e,t)=>{let n=t.teamState,{teamConfig:d,joinChoices:p}=t.config,E=e=>({...t,teamState:{...t.teamState,...e}}),{subscription:f,settings:k}=t.config,b=l.aA(e=>u({type:"Team/Fetched",...e})),v=[b,l.eO(e=>({type:"App/ProfileFetched",profile:e})),l.oE(e=>({type:"App/SubscriptionFetched",subscription:e})),l.h2(e=>({type:"App/PaymentPlansSet",plans:e}))];switch(e.type){case"Team/InviteFormUpdated":return[E({inviteForm:e.value}),[]];case"Team/Fetched":{let{config:n,members:a,invitations:i,joinChoices:r}=e,o=!d&&r.length>0;return[t=x(t=h(t=g(t=E({invitations:i}),o),n,a),{joinChoices:r}),[]]}case"Team/CreateSpaceRequested":return[E({upgradeToTeam:{...n.upgradeToTeam,createSpaceLoading:!0}}),[l.Ml(e=>u({type:"Team/CreateSpaceSucceeded",...e})),l.DJ(e.emails,e=>u({type:"Team/InviteMembersSucceeded",invitations:e}),e=>u({type:"Team/InviteMembersFailed",error:e})),l.h2(e=>({type:"App/PaymentPlansSet",plans:e}))]];case"Team/CreateSpaceSucceeded":return[t=h(t={...E({inviteForm:[],upgradeToTeam:{...n.upgradeToTeam,createSpaceLoading:!1}}),modal:s.$h,notifications:[c.$.success("Team Space created",{actions:[{text:"Show team settings",onClick:y}]})],config:{...t.config,paymentPlans:e.plans}},e.config),[async e=>{let{dispatch:t}=e;t({type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"team"}})}]];case"Team/RenameSpaceRequested":{let{name:n}=e;return[t,[l.mL(n,e=>u({type:"Team/RenameSpaceSucceeded",config:e}))]]}case"Team/RenameSpaceSucceeded":{let{config:n}=e,a=[c.$.success(`Team  space renamed to "${n.name}"`)];return[{...t=h(t,e.config),modal:s.$h,notifications:a},[]]}case"Team/JoinSpaceIntended":{let{joinChoice:n,invitationKey:a}=e,r=d?.isTeam,o=d?.name,l=d?.isLastAdmin&&d?.members.length>=2;if(e.joinChoice.teamId===d?.id){let e=[c.$.success("You are in this team already")];return[{...t,notifications:e},[]]}t=g(t,!1);let s=i.tR(f),p={type:"Team/JoinSpaceConfirmed",joinChoice:n,invitationKey:a};return[t=m(t,{type:"Confirm",header:`Please confirm joining "${n.name}"`,message:r?`You will leave "${o}" and lose access to the team's resources as well as of your existing results.`:`You are about to join a team. Your credits will ${s?"be added to the team's credits.":"not be transferred."} Note that all of your existing results will be lost.`,confirm:{action:{...u(l?{type:"Team/AssignNewAdminRequested",onDone:u(p)}:p)}},cancel:{}}),[]]}case"Team/JoinSpaceConfirmed":return[t,function(e){return[l.Vs(e.joinChoice.teamId,"accept",e.invitationKey,()=>u({type:"Team/Joined",joinChoice:e.joinChoice}))]}(e)];case"Team/Joined":{let n=e.joinChoice.name;return[{...t,appWindowState:{...t.appWindowState,resultsHighlighted:!1},modal:{type:"TeamJoinSuccess",teamName:n},notifications:[c.$.success(`You have joined ${n}`)],config:{...t.config,hasRunRecords:!1}},[...v,async e=>{let{dispatch:t}=e;t({type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"team"}})}]]}case"Team/JoinSpaceRejectionRequested":{let{choice:n}=e,a=p.filter(e=>e.teamId!==n.teamId);return[x(t,{joinChoices:a}),[l.Vs(n.teamId,"reject",null,()=>u({type:"Team/JoinSpaceRejected",choice:n}))]]}case"Team/JoinSpaceRejected":{let{teamId:n}=e.choice,a=p.filter(e=>e.teamId!==n),i=[c.$.success("Invitation dismissed")];return 0===p.length&&(t=g(t,!1)),[{...x(t,{joinChoices:a}),notifications:i},[]]}case"Team/LeaveTeamClicked":return[t,[l.aA(e=>u({type:"Team/PrepareDisbandOrLeave",operation:"leave",...e}))]];case"Team/LeaveTeamConfirmed":if(!d)return[t,[]];return[t,[l.vM(()=>u({type:"Team/LeaveTeamSucceeded",config:d})),...v]];case"Team/LeaveTeamSucceeded":{let n=e.config.name;return[{...t,config:{...t.config,hasRunRecords:!1},modal:s.$h,notifications:[c.$.success(`You have left ${n}`)]},[...v,async e=>{let{dispatch:t}=e;t({type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"personal"}})}]]}case"Team/DisbandTeamClicked":return[t,[l.aA(e=>u({type:"Team/PrepareDisbandOrLeave",operation:"disband",...e}))]];case"Team/PrepareDisbandOrLeave":{let{config:n,members:a,operation:i}=e;t=h(t,n,a);let r=n.isAdmin&&1===a.filter(e=>e.isAdmin).length&&a.length>=2;switch(i){case"leave":return[t=m(t,{type:"Confirm",header:"Are you sure you want to leave this team?",message:"You will lose access to all of your Playbook results and the team's Playbooks.",confirm:{action:r?{type:"TeamAction",action:{type:"Team/AssignNewAdminRequested",onDone:u({type:"Team/LeaveTeamConfirmed"})}}:u({type:"Team/LeaveTeamConfirmed"})},cancel:{}}),[]];case"disband":if(r)return[{...t,config:t.config,modal:{type:"TeamLeaveAdminAssign",onDone:u({type:"Team/DisbandTeamConfirmed"})}},[]];return[{...t,modal:{type:"TeamDelete"}},[]]}}case"Team/DisbandTeamConfirmed":if(!d||!d.isAdmin)return[t,[]];return[{...t,modal:{type:"None"}},[l.BJ(n,()=>u({type:"Team/DisbandTeamSucceeded",config:d}))]];case"Team/DisbandTeamSucceeded":{let n=e.config.name;return[{...t,modal:s.$h,notifications:[c.$.success(`You have deleted ${n}`)]},[...v,async e=>{let{dispatch:t}=e;t({type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"personal"}})}]]}case"Team/InviteMembersRequested":{let t=l.DJ(e.emails,e=>u({type:"Team/InviteMembersSucceeded",invitations:e}),e=>u({type:"Team/InviteMembersFailed",error:e}));return[E({invitationRequest:a.j.Loading}),[t]]}case"Team/InviteMembersSucceeded":{let{invitations:i}=e,r=[],o=[],l=[],s=[],d=[],p=[];for(let e of i)"user_is_pro"===e.refused?(o.push(e),s.push(e.email)):"user_exists"===e.refused?(l.push(e),d.push(e.email)):(r.push(e),p.push(e.email));t=E({invitations:[...r,...n.invitations.filter(e=>!p.includes(e.email))],refusedProEmails:s,refusedExistingEmails:d,invitationRequest:a.j.Success(!0),inviteForm:o.concat(l).map(e=>({email:e.email,id:e.id,isDirty:!0,refused:e.refused}))});let u=[];r.length&&!k?.hasInvitedFirstTeamMember&&u.push(async e=>{let{dispatch:t}=e;return t({type:"App/FirstTeamMemberInvited"})});let m=e.invitations.some(e=>e.refused)?[C]:r.length?[c.$.success("Invite sent to new members")]:[];return[{...t,notifications:[...t.notifications,...m]},u]}case"Team/InviteMembersFailed":{let t=E({invitationRequest:a.j.Err(e.error)});return[{...t,notifications:c.$.addError(t.notifications,e.error)},[]]}case"Team/InvitationRemoveRequested":{let{invitationId:n}=e;return[t=m(t,{type:"Confirm",header:"Are you sure you want to remove the invitation?",confirm:{action:u({type:"Team/InvitationRemovePending",invitationId:n})},cancel:{}}),[]]}case"Team/InvitationRemovePending":{let{invitationId:n}=e;return[t,[(e=>async t=>{let{api:n,dispatch:a}=t;await n.teamInvitationRemove(e),a(u({type:"Team/InvitationRemoved",invitationId:e}))})(n)]]}case"Team/InvitationRemoved":{let{invitationId:t}=e,a=n.invitations.filter(e=>e.id!==t),i=[c.$.success("Invitation removed")];return[{...E({invitations:a}),notifications:i},[]]}case"Team/MemberRoleUpdateRequested":{let{memberId:n,isAdmin:a}=e,i=l.E9(n,{isAdmin:a},e=>u({type:"Team/MemberRoleUpdated",memberId:n,member:e}));return[t,[i]]}case"Team/MemberRoleUpdated":{if(!d)return[t,[]];let{memberId:n,member:a}=e,i=d?.members.map(e=>e.id===n?a:e),r=[c.$.success("Team member role updated")];return[{...h(t,d,i),notifications:r},[]]}case"Team/MemberRemoveRequested":{let{memberId:n}=e;return[t=m(t,{type:"Confirm",header:"Are you sure you want to remove the team member?",confirm:{action:u({type:"Team/MemberRemovePending",memberId:n})},cancel:{}}),[]]}case"Team/MemberRemovePending":{let{memberId:n}=e,a=l.U4(n,()=>u({type:"Team/MemberRemoved",memberId:n}));return[t,[a]]}case"Team/MemberRemoved":{if(!d)return[t,[]];let{memberId:n}=e,a=d.members.filter(e=>e.id!==n),i=[c.$.success("Team member removed")];return[{...h(t,d,a),notifications:i},[]]}case"Team/AssignNewAdminRequested":return[{...t,modal:{type:"TeamLeaveAdminAssign",onDone:e.onDone}},[]];case"Team/AssignNewAdminPending":{let{memberId:n,onDone:a}=e,i=l.E9(n,{isAdmin:!0},()=>u({type:"Team/AssignNewAdminSucceeded",onDone:a}));return[t,[i]]}case"Team/AssignNewAdminSucceeded":{let n;return[{...t,modal:s.$h},[(n=e.onDone,async e=>{let{dispatch:t,api:a}=e;await b({api:a,dispatch:t}),t(n)})]]}case"Team/RequestAdminUpgradeRequested":{let{reason:n}=e,a=l.o3(n,()=>u({type:"Team/RequestAdminUpgradeSucceeded"}));return[t,[a]]}case"Team/RequestAdminUpgradeSucceeded":{let e=[c.$.success("Request sent to the team admins")];return[{...t,modal:s.$h,notifications:e},[]]}case"Team/JoinSpaceWrongLinkDetected":{let n=e.intendedRecipient?`This invitation is intended for the user with e-mail ${e.intendedRecipient}. You might have to log-in with a different account first.`:"This invitation link might be expired or revoked. Please ask the team owners to give you a fresh one.";return[{...t,notifications:[c.$.create(n)]},[]]}case"Team/InvitationLinkGenerationRequested":return[t,[l.iS({onSuccess:e=>u({type:"Team/InvitationLinkGenerated",link:e}),onError:()=>u({type:"Team/InvitationLinkGenerationFailed"})})]];case"Team/InvitationLinkGenerated":return[{...t},[l.lW(e.link,()=>u({type:"Team/InvitationLinkCopied"}),()=>u({type:"Team/InvitationLinkCopyFailed"})),b]];case"Team/InvitationLinkGenerationFailed":{let e=[c.$.create("Failed to generate invitation link")];return[{...t,notifications:e},[]]}case"Team/InvitationLinkDeactivationRequested":return[t,[l.Hv({onSuccess:()=>u({type:"Team/InvitationLinkDeactivated"}),onError:()=>u({type:"Team/InvitationLinkDeactivationFailed"})})]];case"Team/InvitationLinkDeactivated":return[{...t,notifications:[c.$.success("Invitation link deactivated")]},[b]];case"Team/InvitationLinkDeactivationFailed":{let e=[c.$.create("Failed to deactivate invitation link")];return[{...t,notifications:e},[]]}case"Team/InvitationLinkCopyRequested":return[{...t},[l.lW(d?.invitationLink||"",()=>u({type:"Team/InvitationLinkCopied"}),()=>u({type:"Team/InvitationLinkCopyFailed"}))]];case"Team/InvitationLinkCopied":return[{...t,notifications:[c.$.success("Invitation link copied")]},[]];case"Team/InvitationLinkCopyFailed":{let e=r.sF.from(new o.HJ).toJSON();return[{...t,notifications:c.$.addError(t.notifications,e)},[]]}case"Team/CreateSpaceCostCalculationRequested":return[E({upgradeToTeam:{...n.upgradeToTeam,cost:0,nextPeriodCost:0,loading:!0}}),[l.Fn(e=>{let{remainingTimeCharge:t,nextPeriodCharge:n}=e;return u({type:"Team/CreateSpaceCostCalculated",cost:t,nextPeriodCost:n})})]];case"Team/CreateSpaceCostCalculated":return[E({upgradeToTeam:{...n.upgradeToTeam,cost:e.cost,loading:!1,nextPeriodCost:e.nextPeriodCost}}),[]];case"Team/CreateSpaceInvitationInputChanged":return[E({upgradeToTeam:{...n.upgradeToTeam,invitationInput:e.value}}),[]]}};function u(e){return{type:"TeamAction",action:e}}let m=(e,t)=>({...e,confirmState:t}),g=(e,t)=>({...e,appWindowState:{...e.appWindowState,notificationsMenuIsOpen:t}}),y={type:"ModalsAction",action:{type:"Modal/SettingsShown",tab:"team"}},C=c.$.create("Some invitations were refused",{actions:[{onClick:y,text:"Show"}]}),h=(e,t,n)=>{let{isTeam:a,isAdmin:i}=t,r=n??e.config.teamConfig?.members??[];return{...e,config:{...e.config,teamConfig:{...t,canManagePayment:!a||a&&i,members:r,isLastAdmin:i&&1===r.filter(e=>e.isAdmin).length}}}},x=(e,t)=>({...e,config:{...e.config,...t}})},99530:(e,t,n)=>{n.d(t,{$n:()=>i.$n,$u:()=>u.$,B0:()=>r.B0,BZ:()=>a.BZ,Fe:()=>r.Fe,Gm:()=>r.Gm,KN:()=>o.K,Kf:()=>d.K,Ni:()=>r.Ni,RT:()=>a.RT,Sc:()=>i.Sc,Su:()=>p.z,TM:()=>i.TM,b2:()=>i.b2,dN:()=>i.dN,hJ:()=>i.hJ,hj:()=>r.hj,i8:()=>l,k:()=>o.T,ln:()=>r.ln,qw:()=>a.qw,sr:()=>c,tW:()=>m.t,vR:()=>s});var a=n(2822),i=n(28926),r=n(85415),o=n(84857),l=n(86244),c=n(29103),s=n(21139),d=n(64185),p=n(69236),u=n(13693);n(94741),n(61994);var m=n(54439)}}]);
//# debugId=a8d3d9b5-46b5-56a6-9587-d1bc00523a57
