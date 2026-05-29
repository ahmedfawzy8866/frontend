"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="61818303-68b7-5033-b982-1147c25754c6")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[143,5381,7762],{25873:(e,t,n)=>{!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=n(86974)},14041:(e,t,n)=>{e.exports=n(42062)},99530:(e,t,n)=>{n.d(t,{$n:()=>r.$n,Kf:()=>i.K,dN:()=>r.dN,fI:()=>r.fI}),n(2822);var r=n(28926);n(85415),n(84857),n(86244),n(29103),n(21139);var i=n(64185);n(69236),n(13693),n(94741),n(61994),n(54439)},81:(e,t,n)=>{n.d(t,{$n:()=>r.$n,Kf:()=>r.Kf,dN:()=>r.dN,fI:()=>r.fI,oB:()=>i.o});var r=n(99530);n(96326),n(86439);var i=n(58756);n(88645),n(11778),n(48143),n(14166),n(19585),n(21799),n(21714),n(36674)},45381:(e,t,n)=>{n.d(t,{Debugger:()=>p,bootstrap:()=>B}),n(48545);var r=n(14041),i=n(25873),a=n(81),o=n(69670),l=n(78445),s=n(39716);let c=new BroadcastChannel("ui debugger");function p(){let[e,t]=r.useState({i:-1,history:[]}),[n,i]=A("pathQuery",""),[o,l]=r.useState(!1),s=e=>{i(e),document.activeElement?.hasAttribute("data-path")&&requestAnimationFrame(()=>document.querySelector("[data-path]")?.focus())},[p,f]=A("filterRegexp",""),y=r.useCallback(async e=>{e.preventDefault(),l(!1);let n=e.dataTransfer.files[0];if(!n)return console.error("No file");t({i:0,history:await C(n)})},[]);r.useEffect(()=>{c.onmessage=e=>{let{data:n}=e;"DEBUG_PUSH_STATE"===n.type&&t(e=>{let{i:t,history:r}=e;return{history:[n,...r].slice(0,200),i:-1===t||0===t?t:t+1}}),"DEBUGGER_REPLACE"===n.type&&t({i:-1,history:n.history}),"DEBUG_EFFECT_UPDATE"===n.type&&t(e=>({...e,history:e.history.map(e=>({...e,effects:e.effects?.map(e=>e?.uuid===n.effect?.uuid?n.effect:e)}))}))}},[]),r.useEffect(()=>{c.postMessage({type:"DEBUGGER_OPENED"}),document.addEventListener("keydown",e=>{d({ArrowUp:()=>t(e=>({...e,i:Math.max(0,e.i-1)})),ArrowDown:()=>t(e=>({...e,i:Math.min(e.history.length-1,e.i+1)})),Escape:()=>t(e=>({...e,i:0}))})(e)})},[i]);let E=r.useMemo(()=>{try{return new RegExp(p,/[A-Z]/.test(p)?"":"i")}catch(e){return/.*/}},[p]),v=e.history[e.i]?.state??e.history[0]?.state,w=v;for(let e of n.split("."))if(w&&e in Object(w))w=Object(w)[e];else break;r.useEffect(()=>{c.postMessage({type:"DEBUG_SET_STATE",state:-1===e.i?null:v})},[e,v]),r.useEffect(()=>{let e=async e=>{let n=e.clipboardData?.files;if(!n||0===n.length)return;if(e.preventDefault(),n&&n.length>0){let e=n[0];return e?void t({i:0,history:await C(e)}):console.error("No file")}let r=e.clipboardData?.getData("Text");if(!r)return;let i=JSON.parse(r);t({i:0,history:"actionLog"in Object(i)?Object(i).actionLog:i})};return window.addEventListener("paste",e),()=>{window.removeEventListener("paste",e)}},[]);let O=r.useCallback(e=>t(t=>({...t,i:e})),[t]);return r.createElement(g,{onDrop:y,onDragOver:e=>{e.preventDefault(),l(!0)},onDragLeave:e=>{e.preventDefault();let t=e.currentTarget,n=e.relatedTarget;n&&t.contains(n)||l(!1)},$dropActive:o},o&&r.createElement(h,null,r.createElement(x,null,"Drop action log file (.json or .json.gz)")),r.createElement($,{i:e.i,setI:O,stateHistory:e.history}),-1!==e.i?r.createElement(a.$n,{fullWidth:!0,variant:"primary",onClick:()=>O(-1),text:"Resume App"}):null,r.createElement(a.fI,null,r.createElement(a.dN.Outline,{onChange:s,value:n||"",placeholder:"appWindowState.entries.0.collapsed",style:{flex:1}}),r.createElement(a.$n,{variant:"outlined",onClick:()=>{c.postMessage({type:"DEBUG_RESET"}),t({history:[],i:0})},text:"Clear Actions",size:"l"})),r.createElement(a.dN.Outline,{onChange:f,value:p||"",placeholder:"Seach in state... (supports regexp)"}),r.createElement(S,null,w&&m(w)?r.createElement(u,{obj:w,r:p?E:null,setPathQuery:s,pathQuery:n,prefix:[]}):r.createElement(b,null,JSON.stringify(w))))}let u=r.memo(e=>{let{obj:t,pathQuery:n,r:i,prefix:a}=e,o=!n&&!i,l=[...n?n.split("."):[],...a].join("."),s=Object.entries(t).filter(e=>{let[t,n]=e;return o||function e(t,n,r){return"object"==typeof n&&null!==n?Object.entries(n).some(n=>{let[i,a]=n;return e(`${t}.${i}`,a,r)}):!r||!!t.match(r)||!!String(n).match(r)}(`${l}.${t}`,n,i)}).sort((e,t)=>{let[n]=e,[r]=t;return w(n)&&w(r)?Number(n)-Number(r):n.localeCompare(r)});return r.createElement(r.Fragment,null,s.map(t=>{let[n,i]=t,a=l?`${l}.${n}`:n,o=`${a} ${e.expanded?"\u25BC":"\u25B6"}`;return r.createElement(f,{...e,key:o,k:n,obj:i,path:l})}))}),d=e=>t=>{let n=e[t.key];return n?j(t,n):e.vimRight&&["ArrowRight","l"].includes(t.key)?j(t,e.vimRight):e.vimDown&&["ArrowDown","j"].includes(t.key)?j(t,e.vimDown):e.vimUp&&["ArrowUp","k"].includes(t.key)?j(t,e.vimUp):e.vimLeft&&["ArrowLeft","h"].includes(t.key)?j(t,e.vimLeft):void 0},f=r.memo(e=>{let{k:t,obj:n,path:i,prefix:a,setPathQuery:l}=e,s=i?`${i}.${t}`:t,[c,p]=r.useState(!1),[f,y]=r.useState(e.expanded),g=()=>p(e=>!e),h=()=>{p(!f),y(e=>!e)},x=m(n),v=r.createElement(k,{title:"focus",onClick:()=>l(s)},"\u2316");r.useEffect(()=>{p(!1),requestIdleCallback(()=>{p(e.expanded??!0)})},[e.expanded]);let w=r.createElement(k,{title:"copy",onClick:e=>{e.stopPropagation(),navigator.clipboard.writeText(JSON.stringify({[t]:n}))}},"\uD83D\uDCCB"),A=r.createElement(D,{onClick:e=>{1===e.detail&&g(),2===e.detail&&h()}},x?c?"\u25BC":"\u25B6":" ",v,t,w);return r.createElement(r.Fragment,null,r.createElement("span",{style:{color:o.wdA}},"\n"+"|  ".repeat(a.length)),x?r.createElement(E,{"data-path":s,onKeyDown:d({L:()=>h(),Space:()=>l(s),Enter:()=>l(s),vimUp:e=>_(e.target,-1),vimDown:e=>_(e.target,1),vimLeft:()=>{if(c)return p(!1);let e=`[data-path='${s.split(".").slice(0,-1).join(".")}']`;document.querySelector(e)?.focus()},vimRight:()=>{p(!0),requestAnimationFrame(()=>{let e=`[data-path*='${s}.']`;document.querySelector(e)?.focus()})}})},A):A,x&&c?r.createElement(u,{...e,prefix:a.concat([t]),expanded:f}):Array.isArray(n)&&0===n.length||"object"!=typeof n||null===n?r.createElement(b,null,JSON.stringify(n)):null)}),m=e=>"object"==typeof e&&null!==e&&Object.keys(e).length>0,y=e=>e.map((e,t)=>{let{__name:n,...i}=e,a=(0===t?"":" ")+n.replace(/Action$/,"");if(0===Object.keys(i).length)return a;let o=1===Object.keys(i).length?Object.values(i)[0]:i,s=JSON.stringify(o),c="string"==typeof s&&s.length<=40?s:r.createElement(l.m,{interactive:300,delay:300,content:r.createElement(v,null,JSON.stringify(o,null,2)),style:{maxWidth:800}},r.createElement("span",null,"[obj]"));return r.createElement(r.Fragment,{key:t},a,"(",c,")")}),g=s.Ay.div`
  background: ${o.ONy};
  white-space: pre;
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 100%;
  width: 100%;
  position: relative;
  ${e=>e.$dropActive&&`
    outline: 2px dashed ${o.wB3};
    outline-offset: -10px;
  `}
`,h=s.Ay.div`
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
`,x=s.Ay.div`
  font-size: 16px;
  font-weight: 500;
  color: ${o.KxS};
  padding: 20px;
  border: 2px dashed ${o.wB3};
  border-radius: 8px;
  background: ${o.Q_2};
`,E=s.Ay.button`
  background: ${o.ONy};
  border: none;
  padding: 0;
  margin: 0;

  display: inline-block;
  border-radius: 4px;
  transition: 0.3s all;
  &:hover {
    background: ${o.Q_2};
  }
  &:focus {
    background: ${o.NcT};
  }
`,b=s.Ay.span`
  margin-left: 8px;
  background: ${o.eJU};
  padding: 0 2px;
`,v=s.Ay.pre`
  max-height: 50vh;
  font-size: 12px;
  overflow: auto;
  line-height: 18px;
`;function w(e){let t=e.trim();return""!==t&&!isNaN(parseFloat(t))}function A(e,t){let[n,i]=r.useState(()=>{try{return JSON.parse(localStorage.getItem(e)??"")}catch(e){return t}});return r.useEffect(()=>{localStorage.setItem(e,JSON.stringify(n))},[n,e]),[n,i]}let O=e=>{let t=[],n=e;for(;n;){let e={...n};if(delete e.action,t.push(e),n.action&&"type"in Object(n.action))n=n.action;else break}return{shortMsg:"APP "+t.map(e=>e.type).join(" "),trace:t.flatMap(e=>{let t=e.type,{type:n,schedule:r,...i}=e;return[{...i,__name:t}]})}},$=r.memo(function(e){let{stateHistory:t,i:n,setI:i}=e,a=t.length;return r.createElement("pre",{style:{overflow:"auto",flex:1}},t.map((e,t)=>{let{action:s,effects:c=[]}=e,{trace:p}=O(s),u=c.filter(e=>e?.ms!==void 0),f=c.length?(u.length+.5)/c.length*100:0,m=n===t,g=c.reduce((e,t)=>e+(t?.ms??0),0);return r.createElement("div",{onClick:()=>i(t),key:t,tabIndex:0,style:{background:m?o.Q_2:o.ONy,position:"relative"},ref:e=>{m&&0==n&&e?.focus()},onKeyDown:d({ArrowUp:()=>i(Math.max(0,n-1)),ArrowDown:()=>i(Math.min(a-1,n+1))})},y(p),c.length?r.createElement(l.m,{content:r.createElement(v,null,JSON.stringify(c,null,2)),interactive:300,delay:300},r.createElement("div",{style:{position:"absolute",right:0,top:0,background:"white"}},g?g+"ms":" ",f<100?"\uD83D\uDD04":"")):null)}))});function _(e,t){let n=Array.from(e.parentElement?.querySelectorAll("[data-path]")??[]);return n[n.indexOf(e)+t]?.focus()}let k=s.Ay.span`
  cursor: pointer;
  margin-left: 4px;
  font-size: 12px;
  color: ${o.ydb};
  &:hover {
    color: ${o.ui$};
  }
`,D=s.Ay.span`
  color: #000000;
  font-family: monospace;
`,S=s.Ay.pre`
  overflow: auto;
  height: 50vh;
`,j=(e,t)=>{e.preventDefault(),e.stopPropagation(),t(e)},C=async e=>{let t=new Response(await e.arrayBuffer());e.name.endsWith(".gz")&&(t=new Response(t.body?.pipeThrough(new DecompressionStream("gzip"))));let n=await t.text();if(!n)return console.error("Invalid file type");let r=JSON.parse(n);return"actionLog"in Object(r)?Object(r).actionLog:r};n(18140);var T=n(16335),N=n(36213);class L extends N.F_{static #e=this.nameTemplate="PreviewTable:BlobRefExpired";static #t=this.is=e=>N.F_.is(e,L.nameTemplate);static #n=this.isExact=e=>N.F_.isExact(e,L.nameTemplate);constructor(e={}){super(L.nameTemplate,"The table was deleted by the browser. Please close this tab and reopen the table again from the Bardeen app.",e)}}T.object({columns:T.array(T.string),rows:T.array(T.array(T.string))});var R=n(67331);function B(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=document.querySelector(o.target??"#main");if(!l)return console.error("Could not find #main");let s={api:t.api,documentHost:void 0,documentRoot:document.documentElement,portalInsertionPoint:document.querySelector("#bardeen-popup")??document.body,styleInsertionPoint:document.head};(0,i.createRoot)(l).render(r.createElement(a.oB.Provider,{value:s},r.createElement(a.Kf,null,r.createElement(e,{...n,...t}))))}s.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,s.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,(0,s.Ay)(R.H2)`
  color: ${o.t14};
`,s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #0000000f;
  outline: 1px solid ${o.Tc2};
  transition: all 0.2s ease-in-out;
  width: 100%;
`,s.Ay.a`
  font-size: 16px;
  color: ${o.t14};
  text-decoration: underline;
`,s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,(0,s.Ay)(a.$n)`
  margin-top: 40px;
`,s.Ay.form`
  margin-bottom: 16px;
`,s.Ay.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  font-size: 16px;
  color: ${o.t14};
  text-decoration: underline;
`,s.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`,s.Ay.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
`,(0,s.Ay)(R.P)`
  padding-inline: 19px;
  font-size: 16px;
  color: ${o.CP};
  margin-bottom: 8px;
  font-weight: 600;
`,(0,s.Ay)(R.P)`
  padding-inline: 19px;
  color: ${o.CCs};
  text-align: start;
`,s.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`,s.Ay.div`
  margin-top: 64px;
  max-width: 684px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`,(0,s.Ay)(R.H2)`
  color: ${o.t14};
`,s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,s.Ay.div`
  color: ${o.ui$};
  white-space: pre-wrap;
  font-size: 16px;
  width: 100%;
  text-align: center;
`}}]);
//# debugId=61818303-68b7-5033-b982-1147c25754c6
