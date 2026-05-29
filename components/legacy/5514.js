"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ff82cffd-e906-5512-878d-4124e5f44bd1")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[5514],{15577:(e,t,n)=>{n.d(t,{J:()=>i});var r=n(36213);let l=n(37217).I.getLogger("RuntimeApiHelper");function i(e,t){("then"in t?t:t()).catch(t=>{let n=r.sF.from(t).toJSON();l.error("De-dangled promise failure",n),e.trackError(n)})}},7696:(e,t,n)=>{n.d(t,{N:()=>r,y:()=>l});let r=/\b[a-z0-9!#$%&'*+=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]*[a-z0-9])?\b/gi,l=e=>{try{return new RegExp(e),!0}catch(e){return!1}}},59998:(e,t,n)=>{n.d(t,{Cq:()=>i,Kt:()=>p,LB:()=>g,N1:()=>s,OT:()=>a,Oi:()=>d,QR:()=>o,Vh:()=>function e(t){return t.some(t=>"container"===t.group||("deepCrawl"===t.group||"fetch"===t.group?e(t.operations):void 0))},X7:()=>function e(t,n){return t.flatMap(t=>{let r=n(t);return r?u(r)||"operations"in t&&r.operations!=t.operations?r:{...r,operations:e(r.operations,n)}:[]})},bB:()=>m,iz:()=>u,kw:()=>f,mC:()=>b,pM:()=>x,xu:()=>l,yd:()=>c});var r=n(64831);function l(e,t){let n=(e,t)=>{if(e.operations.some(e=>e.id===t.id))return e;for(let r of e.operations)if("container"===r.group){let e=n(r,t);if(e)return e}return null};for(let r of e)if("container"===r.group||"deepCrawl"===r.group){let e=n(r,t);if(e)return e}return null}function i(e){return e.flatMap(e=>{switch(e.group){case"scraper":case"action":return e;case"deepCrawl":case"container":case"fetch":return i(e.operations);default:throw Error("Unknown scraper operation type")}})}function a(e){return i(e).filter(e=>"scraper"===e.group)}function o(e){return e.filter(e=>"deepCrawl"!==e.group&&"fetch"!==e.group)}function s(e,t){for(let n of e){if(n.id===t)return n;if("container"===n.group||"deepCrawl"===n.group||"fetch"===n.group){let e=s(n.operations,t);if(e)return e}}return null}function c(e,t){let n=s(e,t);return n&&"container"===n.group?n:null}function d(e,t){let n=s(e,t);return n&&"deepCrawl"===n.group?n:null}function p(e){return e.filter(e=>"deepCrawl"===e.group)}function u(e){return"scraper"===e.group||"action"===e.group}function m(e){return"container"===e.group}function f(e){return r.z[e.type].targeted}function x(e){return r.z[e].targeted}function g(e){return r.z[e].scraping}function b(e){return"type"in e&&"table"===e.type}},88210:(e,t,n)=>{function r(e,t){let n=[];for(let r of e)r.tableResult.data.forEach((e,r)=>{for(let l of e.filter(e=>"value"in e&&e.operationId===t).map(e=>e.value))n.push({value:l,rowNum:r})});return n}function l(e,t){return e.find(e=>e.tableResult.columns.some(e=>e.id===t))}n.d(t,{G:()=>l,q:()=>r})},80694:(e,t,n)=>{n.d(t,{X:()=>r,f:()=>l});let r=1e3,l=1e4},1970:(e,t,n)=>{n.d(t,{Y:()=>o,t:()=>a});var r=n(85148),l=n(14041),i=n(86439);let a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=l.useContext(i.M),r=l.useRef(null);return l.useEffect(()=>{let t=r.current;if(!t)return;let l=()=>{n.setCoordinates(e,t.getBoundingClientRect())},i=new ResizeObserver(l),a=new MutationObserver(l),o=setTimeout(l,300),s=setInterval(l,1e3);return requestAnimationFrame(()=>{l(),a.observe(t,{attributes:!0,childList:!0,subtree:!0}),i.observe(t),window.addEventListener("resize",l)}),()=>{clearTimeout(o),clearInterval(s),a.disconnect(),i.disconnect(),window.removeEventListener("resize",l),n.setCoordinates(e,null)}},[r.current,e,n,...t]),r},o=e=>{let{ref:t,children:n,id:i,...o}=e,s=a(i),c=(0,r.SV)([s,t]);return l.createElement("div",{ref:c,id:i,...o},n)}},78406:(e,t,n)=>{n.d(t,{k:()=>c});var r=n(85148),l=n(26584),i=n(4630),a=n(14041),o=n(39716);let s=o.Ay.div`
  position: fixed;
  width: max-content;
`,c=e=>{let{children:t,rect:n,open:o,onClose:c,...p}=e,{refs:u,floatingStyles:m,context:f}=(0,r.we)({open:o,onOpenChange:c,middleware:[(0,l.BN)({crossAxis:!0,padding:24,mainAxis:!0}),(0,l.cY)({crossAxis:10,mainAxis:10})],whileElementsMounted:i.ll}),x=(0,r.s9)(f),{getFloatingProps:g}=(0,r.bv)([x]);return o?a.createElement(a.Fragment,null,a.createElement(d,null),a.createElement("div",{"data-positioner":!0,style:{...n,position:"absolute"},ref:u.setReference}),a.createElement(s,{style:{...m,...p.style||{}},...p,...g(),ref:u.setFloating},t)):null},d=(0,o.Ay)(r.zR)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
`},40180:(e,t,n)=>{n.d(t,{F:()=>f});var r=n(88098),l=n(14041),i=n(39716),a=n(69670),o=n(85148),s=n(48266);let c=e=>{let{ref:t,position:n,variant:i,...a}=e,{attributes:c,listeners:u,setNodeRef:f,transform:x}=(0,r.PM)({id:"on-page-button"}),g=(0,o.SV)([f,t]),b=x?{transform:`translate(${x.x}px, ${x.y}px)`,cursor:"grabbing"}:{transition:"transform 0.3s ease-out"};return l.createElement(m,{ref:g,style:b,...u,...c,...a,$variant:i},l.createElement(s.In,{icon:"primary"===i?"BardeenLogoV2White":"BardeenLogoV2",size:26}),l.createElement(d,{icon:"CrossOutline"}),l.createElement(p,{$position:n},l.createElement(s.In,{icon:"DraggerOutline",size:16})))},d=(0,i.Ay)(s.In)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${a.b_I};
  --icon-scale: 1;
  opacity: 0;
  --icon-size: 24px;
`,p=i.Ay.div`
  position: absolute;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  top: 50%;
  transform: translate(0, -50%);
  ${e=>{let{$position:t}=e;return t.includes("left")?"right: 100%;":"left: 100%;"}}
  padding: 8px;
  --icon-color: ${a.wmS}7B;
`,u=(0,i.AH)`
  & ${p} {
    opacity: 1;
    --icon-scale: 1;
  }
`,m=i.Ay.button`
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${e=>{let{$variant:t}=e;return"outlined"===t?a.ONy:"linear-gradient(180deg, #8C80D6 0%, #6F60CC 100%)"}};

  border-radius: 100%;
  border: 1px solid ${a.Tc2};
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.04),
    0px 4px 32px 0px rgba(0, 0, 0, 0.04);
  position: relative;
  transition-property: background-color, border;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  animation: ${e=>{let{theme:t}=e;return t.fadeIn}} 500ms forwards;

  &:hover,
  &:active {
    ${e=>{let{$variant:t}=e;return"outlined"===t&&"background-color: white;"}}
    border-color: ${e=>{let{$variant:t}=e;return"outlined"===t?a.b_I:a.eJD}};

    --icon-scale: 1.1;
    &:after {
      content: "";
      inset: 0;
      border: 1px solid ${a.b_I};
      position: absolute;
      border-radius: 100px;
    }

    ${u}
  }
`,f=e=>{let{ref:t,position:n,onClick:i,onPositionChange:a,variant:o,divRef:s}=e,d=(0,r.MS)(r.cA,{activationConstraint:{distance:32,delay:250}}),p=(0,r.FR)(d),u=l.useCallback(async e=>{let{top:t=0,height:n=0,left:r=0,width:l=0}=e.active.rect.current.translated??{},i={top:window.innerHeight/2,left:window.innerWidth/2},o=r+l/2<i.left?"left":"right",s=t+n/2<i.top?"top":"bottom";a(`${s}-${o}`)},[a]);return l.createElement(r.Mp,{sensors:p,onDragEnd:u},l.createElement(x,{$position:n,ref:s},l.createElement(c,{onClick:i,position:n,variant:o,ref:t,"data-testid":"positioned-button"})))},x=i.Ay.div`
  position: absolute;
  transition:
    top 0.3s ease-out,
    left 0.3s ease-out;
  ${e=>{let{$position:t}=e,[n,r]=t.split("-");return`
      left: ${"left"===r?"32px":"calc(100vw - 90px)"};
      top: ${"top"===n?"32px":"calc(100vh - 90px)"};
    `}}
`},98942:(e,t,n)=>{n.d(t,{w:()=>c});var r=n(69670),l=n(14041),i=n(39716),a=n(16285),o=n(37345),s=n(27461);let c=e=>{let{children:t,busy:n,position:r,visible:i,...a}=e,o=g(r);return l.createElement(u,{$busy:n,$from:o,$visible:i,...a},t)},d=e=>(0,i.i7)`
  from { opacity: 0; transform: translateX(${"left"===e?"-":""}100%);}
    to { opacity: 1; transform: translateX(0); }`,p=e=>(0,i.i7)`
  from { opacity: 1; transform: translateX(0);}
    to { opacity: 0; transform: translateX(${"left"===e?"-":""}100%); }`,u=(0,i.Ay)(s.VP)`
  position: relative;
  background: ${r.ONy};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 384px;
  max-height: calc(100vh - 64px);
  ${e=>{let{$visible:t,$from:n}=e;return(0,i.AH)`
    animation: ${(t?d:p)(n)} 0.3s ease-out forwards;
  `}}
  ${e=>{let{$busy:t}=e;return t&&(0,i.AH)`
      pointer-events: none;
      opacity: 0.5;
    `}}
`,m=i.Ay.div`
  display: flex;
  padding: 12px 16px 12px 20px;
  background: radial-gradient(99.86% 141.42% at 0% 0%, ${r.b_I} 0%, ${r.t14} 100%);
  align-items: center;
  justify-content: space-between;
`,f=i.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[n,r]=t.split("-");return`${n}: 32px; ${r}: 32px;`}}
`,x=(0,i.Ay)(e=>{let{position:t,...n}=e;return l.createElement(o.$n,{icon:"CollapseOutline",tooltipText:"Close",variant:"flat",mode:"color",round:!0,size:"l",...n})})`
  transform: rotate(${e=>{let{position:t}=e;return"left"===g(t)?180:0}}deg);
`;c.Header=e=>{let{children:t,onLogoClick:n,...r}=e;return l.createElement(m,r,n?l.createElement(o.$n,{icon:"BardeenLogoV2Negative",style:{margin:"-12px auto -12px -12px"},onClick:n,variant:"ghost",size:"xxl",tooltipText:"Open Bardeen"}):l.createElement(a.U,{style:{margin:"8px",fontSize:"24px"}}),l.createElement(s.fI,null,t))},c.Positioner=f,c.CloseButton=x;let g=e=>{let[,t]=e.split("-");return"left"===t?"left":"right"}},18255:(e,t,n)=>{n.d(t,{g:()=>p});var r=n(69670),l=n(14041),i=n(39716),a=n(60656),o=n(99812),s=n(91062),c=n(1970),d=n(28926);let p=l.memo(function(e){let{playlistId:t,videos:n,position:i="bottom-right",hidden:p=!1,getAssetUrl:m}=e,[f,D]=l.useState(!1),W=l.useCallback(()=>{D(!0)},[]),_=l.useCallback(()=>{D(!1)},[]),M=l.useCallback(()=>{t&&window.open(`https://www.youtube.com/playlist?list=${t}`,"_blank")},[t]),L=l.useCallback(e=>{window.open(`https://www.youtube.com/watch?v=${e}`,"_blank")},[]),H=l.useCallback(e=>e.thumbnail?e.thumbnail.startsWith("http://")||e.thumbnail.startsWith("https://")||e.thumbnail.startsWith("data:")?e.thumbnail:m?m(e.thumbnail):e.thumbnail:`https://img.youtube.com/vi/${e.id}/mqdefault.jpg`,[m]),X=u(i),Y=t??(n&&n.length>0);return(l.useEffect(()=>{p&&f&&D(!1)},[p,f]),p)?null:l.createElement(l.Fragment,null,!f&&l.createElement(x,{$position:i,"data-tracking-context":"HelpSidebar"},l.createElement(c.Y,{id:"help-sidebar-button"},l.createElement(g,{onClick:W,"aria-label":"Open help videos",title:"Help Videos"},"?"))),f&&l.createElement(b,{$position:i,"data-tracking-context":"HelpSidebar"},l.createElement(c.Y,{id:"help-sidebar-panel"},l.createElement(y,{$visible:f,$from:X},l.createElement(h,null,l.createElement(w,null,"Help Videos"),l.createElement(d.fI,{gap:8},l.createElement(d.$n,{icon:"CollapseOutline",tooltipText:"Close",variant:"flat",mode:"color",round:!0,size:"l",onClick:_,style:{transform:"left"===X?"rotate(180deg)":"rotate(0deg)"}}))),l.createElement(v,null,t&&l.createElement(E,null,l.createElement($,{onClick:M},l.createElement(k,null,l.createElement(a.x,null)),l.createElement(C,null,l.createElement(A,null,"Watch Tutorial Playlist"),l.createElement(z,null,"Open the full playlist on YouTube")),l.createElement(I,null,l.createElement(o.R,null)))),n&&n.length>0&&l.createElement(F,null,l.createElement(N,null,"Quick Links"),n.map(e=>l.createElement(q,{key:e.id,onClick:()=>L(e.id)},l.createElement(T,{src:H(e),alt:e.title}),l.createElement(B,null,l.createElement(R,null,e.title)),l.createElement(I,null,l.createElement(o.R,null))))),!Y&&l.createElement(O,null,l.createElement(s.p,{style:{fontSize:48,color:r.pHq}}),l.createElement(S,null,"No videos configured")))))))}),u=e=>e.includes("left")?"left":"right",m=e=>(0,i.i7)`
  from { 
    opacity: 0; 
    transform: translateX(${"left"===e?"-":""}100%);
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`,f=e=>(0,i.i7)`
  from { 
    opacity: 1; 
    transform: translateX(0);
  }
  to { 
    opacity: 0; 
    transform: translateX(${"left"===e?"-":""}100%); 
  }
`,x=i.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[n,r]=t.split("-"),l=`${r}: 37px;`,i=`${n}: 102px;`;return`${l} ${i}`}}
  z-index: 9998;
`,g=i.Ay.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${r.ONy};
  border: 1px solid ${r.MfC};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${r.Bfz};
  font-size: 22px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${r.ONy};
    border-color: ${r.b_I};
    color: ${r.t14};
    transform: scale(1.05);
    box-shadow:
      0 4px 12px rgba(140, 128, 214, 0.15),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${r.t14};
    outline-offset: 2px;
  }
`,b=i.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[n,r]=t.split("-"),l=`${r}: 32px;`;return`${l} ${"top"===n?"top: 102px;":"bottom: 102px;"}`}}
  z-index: 9999;
`,y=i.Ay.div`
  display: flex;
  flex-direction: column;
  background: ${r.ONy};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 360px;
  max-height: calc(100vh - 150px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08);
  ${e=>{let{$visible:t,$from:n}=e;return(0,i.AH)`
    animation: ${(t?m:f)(n)} 0.3s ease-out forwards;
  `}}
`,h=i.Ay.div`
  display: flex;
  padding: 16px 20px;
  background: ${r.CP};
  align-items: center;
  justify-content: space-between;
`,w=i.Ay.span`
  color: ${r.ONy};
  font-size: 16px;
  font-weight: 600;
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background: ${r.ONy};
`,E=i.Ay.div`
  padding: 16px;
  border-bottom: 1px solid ${r.Tc2};
`,$=i.Ay.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  width: 100%;
  border: 1px solid ${r.NcT};
  border-radius: 12px;
  background: linear-gradient(135deg, ${r.KxS} 0%, ${r.ONy} 100%);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, ${r.Q_2} 0%, ${r.KxS} 100%);
    border-color: ${r.wB3};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(140, 128, 214, 0.15);
  }
`,k=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${r.t14};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${r.ONy};
  font-size: 24px;
  flex-shrink: 0;
`,C=i.Ay.div`
  flex: 1;
  min-width: 0;
`,A=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${r.c3n};
  margin-bottom: 2px;
`,z=i.Ay.div`
  font-size: 12px;
  color: ${r.Wm};
`,I=i.Ay.div`
  color: ${r.Wm};
  font-size: 16px;
  flex-shrink: 0;
`,O=i.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
`,S=i.Ay.span`
  color: ${r.Wm};
  font-size: 14px;
`,F=i.Ay.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`,N=i.Ay.span`
  font-size: 12px;
  font-weight: 600;
  color: ${r.Wm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 4px 8px;
`,q=i.Ay.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid ${r.Tc2};
  border-radius: 8px;
  background: ${r.ONy};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${r.hi1};
    border-color: ${r.wdA};
  }
`,T=i.Ay.img`
  width: 80px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: ${r.Tc2};
`,B=i.Ay.div`
  flex: 1;
  min-width: 0;
`,R=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: ${r.c3n};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`},78927:(e,t,n)=>{n.d(t,{C:()=>v});var r=n(69670),l=n(14041),i=n(39716),a=n(117),o=n(28926);let s=e=>{let{breadcrumbs:t,className:n,onSequenceClick:r}=e,i=l.useMemo(()=>{let e=new Set;return t.forEach(t=>{void 0!==t.sequenceIndex&&-1!==t.sequenceIndex&&e.add(t.sequenceIndex)}),e.size},[t]);return l.createElement(d,{className:n},t.map(e=>l.createElement("li",{key:e.id},e.icon?l.createElement(u,null,l.createElement(o.In,{icon:e.icon,size:12})):null,void 0!==e.sequenceIndex?l.createElement(c,{sequenceIndex:e.sequenceIndex,sequenceId:e.sequenceId??"",onSequenceClick:e.sequenceId?r:void 0,numSequences:i}):null,l.createElement(p,null,e.label,e.timestamp?l.createElement(m,null," "+new Date(e.timestamp).toLocaleString()):null))))},c=e=>{let{sequenceIndex:t,sequenceId:n,onSequenceClick:r,numSequences:i}=e,a=l.useCallback(()=>{r?.(n)},[r,n]);return l.createElement(u,{role:r?"button":void 0,onClick:a,style:{backgroundColor:function(e,t){return -1===e?"#aaa":`hsl(${e/t*360}, 100%, 50%)`}(t,i)}})},d=i.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 6px;
  padding-left: 1em;

  & > li {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  & > li > :last-child {
    flex-grow: 1;
  }
`,p=i.Ay.span`
  overflow-wrap: anywhere;
  overflow: hidden;

  /* non standard versions */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* standard versions */
  line-clamp: 2;
  block-ellipsis: auto;
`,u=i.Ay.span`
  width: 1em;
  min-width: 1em;
  min-height: 1em;
`,m=i.Ay.span`
  color: #aaa;
  font-size: 0.8em;
  font-weight: 400;
  vertical-align: baseline;
`,f=e=>{let{action:t}=e,[n,r]=l.useState(!1),i=l.useCallback(()=>r(e=>!e),[]),a=t.current||n;return l.createElement("li",null,l.createElement("div",null,l.createElement(g,{disabled:t.current,onClick:t.current?void 0:i},l.createElement(o.In,{icon:a?"ArrowDownBold":"ArrowRightBold",size:12})),t.icon?l.createElement(x,null,l.createElement(o.In,{icon:t.icon,size:18})):null,l.createElement(p,null,t.label)),a?l.createElement(s,{breadcrumbs:t.children}):null)},x=i.Ay.span`
  width: 1.5em;
  min-width: 1.5em;
`,g=i.Ay.span`
  width: 1em;
  min-width: 1em;
  cursor: ${e=>e.disabled?"default":"pointer"};
`,b=(e,t)=>{let n=e=>({...t,...e});switch(e.type){case"Cancel":return[t,[async e=>{let{controller:t}=e;await t.cancel()}]];case"Finish":return[t,[async e=>{let{controller:t}=e;return t.finish()}]];case"Dump":return[t,[async t=>{let{controller:n,dispatch:r}=t;r({type:"SetDump",data:e.training?await n.dumpForTraining():await n.dump()})}]];case"SetDump":return[n({dump:e.data,modal:"dump"}),[]];case"CloseDump":return[n({dump:null,modal:null}),[]]}},y=n(37217).I.getLogger("DebugModal"),h=e=>{let{dump:t,dispatch:n}=e,r=l.useCallback(()=>{n({type:"CloseDump"})},[n]),i=l.useCallback(()=>{navigator.clipboard.writeText(t).catch(e=>{y.error("Failed to write to the clipboard",e)})},[t]);return l.createElement(o.aF,{isOpen:!0,onClose:r},l.createElement("pre",null,t),l.createElement(o.$n,{onClick:i,variant:"outlined",text:"Copy"}))},w=l.memo(e=>{let{api:t,host:n,actions:i,devTools:s,loading:c}=e,[d,p]=(0,a.WO)(b,{modal:null,dump:null},[],{api:t,controller:n});return l.createElement(l.Fragment,null,"dump"===d.modal?l.createElement(h,{dump:d.dump??"",dispatch:p}):null,l.createElement($,null,c?l.createElement(k,null,l.createElement(o.y$,{color:r.ONy,size:"m"})):null,l.createElement(C,null,l.createElement("div",null,l.createElement(o.In,{size:12,icon:"BulletPointBold",color:"red"})),l.createElement("div",null,"Recording...")),l.createElement(A,null,i.map(e=>l.createElement(f,{key:e.actionId,action:e}))),l.createElement(z,null,l.createElement(o.$n,{onClick:()=>p({type:"Cancel"}),variant:"outlined",icon:"CrossOutline",tooltipText:"Cancel",fullWidth:!0}),l.createElement(o.$n,{onClick:()=>p({type:"Finish"}),variant:"primary",icon:"CheckmarkOutline",tooltipText:"Finish",fullWidth:!0})),s?l.createElement(l.Fragment,null,l.createElement(o.$n,{onClick:()=>p({type:"Dump",training:!1}),variant:"primary",text:"Show actions",fullWidth:!0}),l.createElement(o.$n,{onClick:()=>p({type:"Dump",training:!0}),variant:"primary",text:"Show training data",fullWidth:!0})):null))}),v=e=>l.createElement(E,null,l.createElement(w,e)),E=i.Ay.div`
  position: fixed;
  top: 0;
  right: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: 2147483000;
  max-height: 100%;
  overflow: auto;
`,$=i.Ay.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: darkgray 0px 0px 4px 0px;
  padding: 12px;
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`,k=i.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`,C=i.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 4px;
`,A=i.Ay.ul`
  border-top: 1px solid lightgray;
  padding: 16px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > li > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  & > li > div > :last-child {
    flex-grow: 1;
  }
`,z=i.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`},94741:(e,t,n)=>{n.d(t,{_:()=>c});var r=n(69670),l=n(14041),i=n(39716);let a=n.p+"0b7a104db25065a11af8.png";var o=n(28926);let s={Yes:{display:"Yes",requiresInput:!1},No:{display:"No",requiresInput:!0},Partial:{display:"Sort-of",requiresInput:!0}},c=e=>{let{open:t,onClose:n,onSubmit:r}=e,[i,c]=(0,l.useState)(""),[y,h]=(0,l.useState)(""),[w,v]=(0,l.useState)(!1),E=l.useCallback(e=>{c(e),s[e]?.requiresInput?v(!0):v(!1)},[]),$=l.useCallback(()=>{("Yes"===i||"No"===i||"Partial"===i)&&r(y,i),n()},[r,n,y,i]);return l.createElement(o.aF,{isOpen:t,onClose:n},l.createElement(d,null,l.createElement(p,{src:a,alt:"feedback icon"}),l.createElement(u,null,"Please leave some feedback"),l.createElement(m,null,"Did I complete your goal successfully?"),l.createElement(f,null,Object.keys(s).map(e=>l.createElement(o.$n,{key:e,style:{width:102,margin:5},variant:"primary",size:"xl",round:!0,onClick:()=>E(e),disabled:i===e,text:s[e]?.display??""}))),w&&l.createElement(l.Fragment,null,l.createElement(m,null,"I would appreciate if you can give me some feedback so I can learn",l.createElement("br",null),"and do it better next time."),l.createElement(x,null,l.createElement(b,{htmlFor:"feedbackTextarea"},"Feedback"),l.createElement(g,{id:"feedbackTextarea",autoFocus:!0,value:y,rows:3,onChange:e=>h(e.target.value)}))),l.createElement(f,null,l.createElement(o.$n,{style:{width:102},variant:"primary",size:"xl",round:!0,onClick:$,disabled:"Yes"!==i&&!y,text:"Submit"}))))},d=i.Ay.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 16px 16px 28px;
`,p=i.Ay.img`
  height: 96px;
  width: 96px;
`,u=i.Ay.h1`
  color: ${r.t14};
  font-size: 22px;
  text-align: center;
`,m=i.Ay.p`
  text-align: center;
  color: ${r.wmS};
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`,f=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,x=i.Ay.form`
  width: 100%;
`,g=i.Ay.textarea`
  width: 100%;
  border: 2px ${r.wB3} solid;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  resize: none;
  color: ${r.CP};
  margin: 8px 0;
`,b=i.Ay.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`},19585:(e,t,n)=>{n.d(t,{K:()=>l});var r=n(14041);let l=e=>{let t=r.useRef(new Map),n=r.useRef(null),l=r.useCallback((n,r)=>{e.setCoordinates(n,r),t.current?.set(n,r)},[e]);return r.useEffect(()=>{if(!n.current)return;let r=n.current,l=n=>{let r=n.clientX,l=n.clientY;Array.from(t.current?.values()??[]).find(e=>!!e&&r>=e.x&&r<=e.x+e.width&&l>=e.y&&l<=e.y+e.height)||e.mouseOutsideOfCoordinates()};return r.addEventListener("mousemove",l),()=>{r.removeEventListener("mousemove",l)}},[e]),{setCoordinates:l,divRef:n,coordsDebugger:null}}}}]);
//# debugId=ff82cffd-e906-5512-878d-4124e5f44bd1
