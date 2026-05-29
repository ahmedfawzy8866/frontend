"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9d63e195-5e7f-54ef-b40e-d84ab2d066b5")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[5381],{45381:(e,t,i)=>{i.d(t,{PopupWindow:()=>d.t,bootstrap:()=>u}),i(48545);var o=i(14041),n=i(25873),r=i(81),a=i(69670),l=i(39716);new BroadcastChannel("ui debugger"),l.Ay.div`
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
  color: ${a.KxS};
  padding: 20px;
  border: 2px dashed ${a.wB3};
  border-radius: 8px;
  background: ${a.Q_2};
`,l.Ay.button`
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
`,l.Ay.span`
  margin-left: 8px;
  background: ${a.eJU};
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
  color: ${a.ydb};
  &:hover {
    color: ${a.ui$};
  }
`,l.Ay.span`
  color: #000000;
  font-family: monospace;
`,l.Ay.pre`
  overflow: auto;
  height: 50vh;
`;var d=i(18140),p=i(16335),s=i(36213);class c extends s.F_{static #e=this.nameTemplate="PreviewTable:BlobRefExpired";static #t=this.is=e=>s.F_.is(e,c.nameTemplate);static #i=this.isExact=e=>s.F_.isExact(e,c.nameTemplate);constructor(e={}){super(c.nameTemplate,"The table was deleted by the browser. Please close this tab and reopen the table again from the Bardeen app.",e)}}p.object({columns:p.array(p.string),rows:p.array(p.array(p.string))});var x=i(67331);function u(e,t,i){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=document.querySelector(a.target??"#main");if(!l)return console.error("Could not find #main");let d={api:t.api,documentHost:void 0,documentRoot:document.documentElement,portalInsertionPoint:document.querySelector("#bardeen-popup")??document.body,styleInsertionPoint:document.head};(0,n.createRoot)(l).render(o.createElement(r.oB.Provider,{value:d},o.createElement(r.Kf,null,o.createElement(e,{...i,...t}))))}l.Ay.div`
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
`,(0,l.Ay)(x.H2)`
  color: ${a.t14};
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000000f;
  outline: 1px solid ${a.Tc2};
  transition: all 0.2s ease-in-out;
  width: 100%;
`,l.Ay.a`
  font-size: 16px;
  color: ${a.t14};
  text-decoration: underline;
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,(0,l.Ay)(r.$n)`
  margin-top: 40px;
`,l.Ay.form`
  margin-bottom: 16px;
`,l.Ay.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  font-size: 16px;
  color: ${a.t14};
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
`,(0,l.Ay)(x.P)`
  padding-inline: 19px;
  font-size: 16px;
  color: ${a.CP};
  margin-bottom: 8px;
  font-weight: 600;
`,(0,l.Ay)(x.P)`
  padding-inline: 19px;
  color: ${a.CCs};
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
`,(0,l.Ay)(x.H2)`
  color: ${a.t14};
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,l.Ay.div`
  color: ${a.ui$};
  white-space: pre-wrap;
  font-size: 16px;
  width: 100%;
  text-align: center;
`}}]);
//# debugId=9d63e195-5e7f-54ef-b40e-d84ab2d066b5
