"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="18c3e500-0684-5045-8f8a-1639f46e1021")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[143,5381,7762],{25873:(e,t,n)=>{!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(86974)},14041:(e,t,n)=>{e.exports=n(42062)},99530:(e,t,n)=>{n.d(t,{$n:()=>i.$n,Kf:()=>o.K,VP:()=>i.VP,XI:()=>i.XI}),n(2822);var i=n(28926);n(85415),n(84857),n(86244),n(29103),n(21139);var o=n(64185);n(69236),n(13693),n(94741),n(61994),n(54439)},81:(e,t,n)=>{n.d(t,{$n:()=>i.$n,Kf:()=>i.Kf,VP:()=>i.VP,XI:()=>i.XI,oB:()=>o.o});var i=n(99530);n(96326),n(86439);var o=n(58756);n(88645),n(11778),n(48143),n(14166),n(19585),n(21799),n(21714),n(36674)},45381:(e,t,n)=>{n.d(t,{PreviewTableWindow:()=>u,bootstrap:()=>g}),n(48545);var i=n(14041),o=n(25873),a=n(81),r=n(69670),l=n(39716);new BroadcastChannel("ui debugger"),l.Ay.div`
  background: ${r.ONy};
  white-space: pre;
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 100%;
  width: 100%;
  position: relative;
  ${e=>e.$dropActive&&`
    outline: 2px dashed ${r.wB3};
    outline-offset: -10px;
  `}
`,l.Ay.div`
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
`,l.Ay.div`
  font-size: 16px;
  font-weight: 500;
  color: ${r.KxS};
  padding: 20px;
  border: 2px dashed ${r.wB3};
  border-radius: 8px;
  background: ${r.Q_2};
`,l.Ay.button`
  background: ${r.ONy};
  border: none;
  padding: 0;
  margin: 0;

  display: inline-block;
  border-radius: 4px;
  transition: 0.3s all;
  &:hover {
    background: ${r.Q_2};
  }
  &:focus {
    background: ${r.NcT};
  }
`,l.Ay.span`
  margin-left: 8px;
  background: ${r.eJU};
  padding: 0 2px;
`,l.Ay.pre`
  max-height: 50vh;
  font-size: 12px;
  overflow: auto;
  line-height: 18px;
`,l.Ay.span`
  cursor: pointer;
  margin-left: 4px;
  font-size: 12px;
  color: ${r.ydb};
  &:hover {
    color: ${r.ui$};
  }
`,l.Ay.span`
  color: #000000;
  font-family: monospace;
`,l.Ay.pre`
  overflow: auto;
  height: 50vh;
`;n(18140);var d=n(16335),s=n(36213),p=n(18550);class c extends s.F_{static #e=this.nameTemplate="PreviewTable:BlobRefExpired";static #t=this.is=e=>s.F_.is(e,c.nameTemplate);static #n=this.isExact=e=>s.F_.isExact(e,c.nameTemplate);constructor(e={}){super(c.nameTemplate,"The table was deleted by the browser. Please close this tab and reopen the table again from the Bardeen app.",e)}}let x=d.object({columns:d.array(d.string),rows:d.array(d.array(d.string))}),u=e=>{let{blobRef:t,api:n}=e,[o,l]=i.useState(!0),[d,u]=i.useState([]),[m,g]=i.useState([]),[y,h]=i.useState(null),b=o?i.createElement("span",null,"Loading ..."):i.createElement("span",null,i.createElement(p.l,null)," Viewing Full Table");return i.useEffect(()=>{Promise.resolve().then(async()=>{let e=await fetch(t);if(!e.ok)throw new c;let n=await e.text();if(!n)throw new c;let i=x.verify(JSON.parse(n));u(i.rows.map(e=>e.reduce((e,t,n)=>({...e,data:{...e.data,[String(n)]:{type:"plain",value:t}}}),{data:{}}))),g(i.columns.map((e,t)=>({id:String(t),label:e,width:"180px"})))}).catch(async e=>{e instanceof TypeError&&"Failed to fetch"===e.message?h(new c().message):(await n.trackError(s.sF.from(e).toJSON()),h(s.sF.from(e).message))}).finally(()=>l(!1))},[n,t]),i.createElement(a.VP,{style:{height:"100%"}},i.createElement("div",{style:f},b),y?i.createElement("div",{style:{padding:"16px",textAlign:"center",color:r.CCs}},y):i.createElement(a.XI,{columns:m,rows:d}))},f={padding:"10px",backgroundColor:"#eee",color:"#54575c",fontSize:"14px",fontWeight:600,textAlign:"center"};var m=n(67331);function g(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=document.querySelector(r.target??"#main");if(!l)return console.error("Could not find #main");let d={api:t.api,documentHost:void 0,documentRoot:document.documentElement,portalInsertionPoint:document.querySelector("#bardeen-popup")??document.body,styleInsertionPoint:document.head};(0,o.createRoot)(l).render(i.createElement(a.oB.Provider,{value:d},i.createElement(a.Kf,null,i.createElement(e,{...n,...t}))))}l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,l.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,(0,l.Ay)(m.H2)`
  color: ${r.t14};
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000000f;
  outline: 1px solid ${r.Tc2};
  transition: all 0.2s ease-in-out;
  width: 100%;
`,l.Ay.a`
  font-size: 16px;
  color: ${r.t14};
  text-decoration: underline;
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,(0,l.Ay)(a.$n)`
  margin-top: 40px;
`,l.Ay.form`
  margin-bottom: 16px;
`,l.Ay.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  font-size: 16px;
  color: ${r.t14};
  text-decoration: underline;
`,l.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`,l.Ay.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
`,(0,l.Ay)(m.P)`
  padding-inline: 19px;
  font-size: 16px;
  color: ${r.CP};
  margin-bottom: 8px;
  font-weight: 600;
`,(0,l.Ay)(m.P)`
  padding-inline: 19px;
  color: ${r.CCs};
  text-align: start;
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,l.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,(0,l.Ay)(m.H2)`
  color: ${r.t14};
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,l.Ay.div`
  color: ${r.ui$};
  white-space: pre-wrap;
  font-size: 16px;
  width: 100%;
  text-align: center;
`}}]);
//# debugId=18c3e500-0684-5045-8f8a-1639f46e1021
