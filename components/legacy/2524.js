"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8095135c-40e9-578c-b7d1-53755a4a742c")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[143,2524,5381,7762],{25873:(e,t,n)=>{!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(86974)},14041:(e,t,n)=>{e.exports=n(42062)},57785:(e,t,n)=>{n.d(t,{Y:()=>a});var a=function(e){return e.Text="text",e.Password="password",e.TextArea="textarea",e}({})},99530:(e,t,n)=>{n.d(t,{$n:()=>a.$n,Kf:()=>l.K,TM:()=>a.TM,dN:()=>a.dN,z9:()=>a.z9}),n(2822);var a=n(28926);n(85415),n(84857),n(86244),n(29103),n(21139);var l=n(64185);n(69236),n(13693),n(94741),n(61994),n(54439)},81:(e,t,n)=>{n.d(t,{$n:()=>a.$n,Kf:()=>a.Kf,TM:()=>a.TM,dN:()=>a.dN,oB:()=>l.o,z9:()=>a.z9});var a=n(99530);n(96326),n(86439);var l=n(58756);n(88645),n(11778),n(48143),n(14166),n(19585),n(21799),n(21714),n(36674)},45381:(e,t,n)=>{n.d(t,{PromptsWindow:()=>E,bootstrap:()=>O}),n(48545);var a=n(14041),l=n(25873),r=n(81),i=n(69670),o=n(39716);new BroadcastChannel("ui debugger"),o.Ay.div`
  background: ${i.ONy};
  white-space: pre;
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 100%;
  width: 100%;
  position: relative;
  ${e=>e.$dropActive&&`
    outline: 2px dashed ${i.wB3};
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
  color: ${i.KxS};
  padding: 20px;
  border: 2px dashed ${i.wB3};
  border-radius: 8px;
  background: ${i.Q_2};
`,o.Ay.button`
  background: ${i.ONy};
  border: none;
  padding: 0;
  margin: 0;

  display: inline-block;
  border-radius: 4px;
  transition: 0.3s all;
  &:hover {
    background: ${i.Q_2};
  }
  &:focus {
    background: ${i.NcT};
  }
`,o.Ay.span`
  margin-left: 8px;
  background: ${i.eJU};
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
  color: ${i.ydb};
  &:hover {
    color: ${i.ui$};
  }
`,o.Ay.span`
  color: #000000;
  font-family: monospace;
`,o.Ay.pre`
  overflow: auto;
  height: 50vh;
`;n(18140);var d=n(16335),c=n(36213);class s extends c.F_{static #e=this.nameTemplate="PreviewTable:BlobRefExpired";static #t=this.is=e=>c.F_.is(e,s.nameTemplate);static #n=this.isExact=e=>c.F_.isExact(e,s.nameTemplate);constructor(e={}){super(s.nameTemplate,"The table was deleted by the browser. Please close this tab and reopen the table again from the Bardeen app.",e)}}d.object({columns:d.array(d.string),rows:d.array(d.array(d.string))});var p=n(67331);o.Ay.div`
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
`,(0,o.Ay)(p.H2)`
  color: ${i.t14};
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000000f;
  outline: 1px solid ${i.Tc2};
  transition: all 0.2s ease-in-out;
  width: 100%;
`,o.Ay.a`
  font-size: 16px;
  color: ${i.t14};
  text-decoration: underline;
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,(0,o.Ay)(r.$n)`
  margin-top: 40px;
`,o.Ay.form`
  margin-bottom: 16px;
`;var m=n(68543);let u=e=>a.createElement(m.oz,{components:{a:x},...e}),x=o.Ay.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  font-size: 16px;
  color: ${i.t14};
  text-decoration: underline;
`;var f=n(57785);let y=e=>{let{layout:t,api:n}=e,[l,i]=a.useState(null),o=(e,t)=>{i(n=>({...n,[t]:e}))};return a.createElement(g,{onSubmit:()=>{if(l&&!Object.keys(l).some(e=>!l[e]))return n.promptSubmit(l)}},t.fields.map(e=>{let t=!l||e.name in l&&!l[e.name]?.trim();switch(e.type){case f.Y.Text:return a.createElement("label",{key:e.name},a.createElement(b,null,e.label),a.createElement(r.dN.Outline,{onChange:t=>o(t,e.name),value:l?.[e.name]||"",required:!0,size:"xl"}),t?a.createElement(v,{$small:!0},"This field cannot be empty!"):null);case f.Y.Password:return a.createElement("label",{key:e.name},a.createElement(b,null,e.label),a.createElement(r.dN.Outline,{type:"password",onChange:t=>o(t,e.name),value:l?.[e.name]||"",required:!0,size:"xl"}),t?a.createElement(v,{$small:!0},"This field cannot be empty!"):null);case f.Y.TextArea:return a.createElement("label",{key:e.name},a.createElement(b,null,e.label),a.createElement(r.TM.Outline,{onChange:t=>{o(t,e.name)},value:l?.[e.name]||"",required:!0,size:"xl",rows:5}),t?a.createElement(v,{$small:!0},"This field cannot be empty!"):null)}}),a.createElement(h,null,a.createElement(r.$n,{type:"submit",text:"Submit",variant:"primary",size:"xl",round:!0}),a.createElement(r.$n,{onClick:()=>(i(null),n.promptCancel()),text:"Cancel",variant:"flat",size:"xl",round:!0})))},g=o.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`,h=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
`,b=(0,o.Ay)(p.P)`
  padding-inline: 19px;
  font-size: 16px;
  color: ${i.CP};
  margin-bottom: 8px;
  font-weight: 600;
`,v=(0,o.Ay)(p.P)`
  padding-inline: 19px;
  color: ${i.CCs};
  text-align: start;
`,E=e=>{let{api:t}=e,n=String(window.location.hash).substr(1),l=n?JSON.parse(atob(n)):{fields:[],logo:"",description:"",title:"Invalid layout data"};return a.createElement(w,null,a.createElement(A,null,a.createElement(r.z9,{icon:l.logo,size:"l",rect:!0,tooltipText:""}),a.createElement($,null,a.createElement(_,null,l.title),l.description?a.createElement(T,null,a.createElement(u,null,l.description)):null),a.createElement(y,{api:t,layout:l})))},w=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,A=o.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,_=(0,o.Ay)(p.H2)`
  color: ${i.t14};
`,$=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,T=o.Ay.div`
  color: ${i.ui$};
  white-space: pre-wrap;
  font-size: 16px;
  width: 100%;
  text-align: center;
`;function O(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=document.querySelector(i.target??"#main");if(!o)return console.error("Could not find #main");let d={api:t.api,documentHost:void 0,documentRoot:document.documentElement,portalInsertionPoint:document.querySelector("#bardeen-popup")??document.body,styleInsertionPoint:document.head};(0,l.createRoot)(o).render(a.createElement(r.oB.Provider,{value:d},a.createElement(r.Kf,null,a.createElement(e,{...n,...t}))))}}}]);
//# debugId=8095135c-40e9-578c-b7d1-53755a4a742c
