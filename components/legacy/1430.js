"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="67a33ada-774f-51c8-a03c-f18d0444380d")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[1430],{1970:(e,t,i)=>{i.d(t,{Y:()=>l});var o=i(85148),r=i(14041),n=i(86439);let a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=r.useContext(n.M),o=r.useRef(null);return r.useEffect(()=>{let t=o.current;if(!t)return;let r=()=>{i.setCoordinates(e,t.getBoundingClientRect())},n=new ResizeObserver(r),a=new MutationObserver(r),l=setTimeout(r,300),p=setInterval(r,1e3);return requestAnimationFrame(()=>{r(),a.observe(t,{attributes:!0,childList:!0,subtree:!0}),n.observe(t),window.addEventListener("resize",r)}),()=>{clearTimeout(l),clearInterval(p),a.disconnect(),n.disconnect(),window.removeEventListener("resize",r),i.setCoordinates(e,null)}},[o.current,e,i,...t]),o},l=e=>{let{ref:t,children:i,id:n,...l}=e,p=a(n),d=(0,o.SV)([p,t]);return r.createElement("div",{ref:d,id:n,...l},i)}},78406:(e,t,i)=>{var o=i(85148);i(14041);var r=i(39716);r.Ay.div`
  position: fixed;
  width: max-content;
`,(0,r.Ay)(o.zR)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
`},40180:(e,t,i)=>{i(88098),i(14041);var o=i(39716),r=i(69670),n=i(48266);(0,o.Ay)(n.In)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${r.b_I};
  --icon-scale: 1;
  opacity: 0;
  --icon-size: 24px;
`;let a=o.Ay.div`
  position: absolute;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  top: 50%;
  transform: translate(0, -50%);
  ${e=>{let{$position:t}=e;return t.includes("left")?"right: 100%;":"left: 100%;"}}
  padding: 8px;
  --icon-color: ${r.wmS}7B;
`,l=(0,o.AH)`
  & ${a} {
    opacity: 1;
    --icon-scale: 1;
  }
`;o.Ay.button`
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${e=>{let{$variant:t}=e;return"outlined"===t?r.ONy:"linear-gradient(180deg, #8C80D6 0%, #6F60CC 100%)"}};

  border-radius: 100%;
  border: 1px solid ${r.Tc2};
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
    border-color: ${e=>{let{$variant:t}=e;return"outlined"===t?r.b_I:r.eJD}};

    --icon-scale: 1.1;
    &:after {
      content: "";
      inset: 0;
      border: 1px solid ${r.b_I};
      position: absolute;
      border-radius: 100px;
    }

    ${l}
  }
`,o.Ay.div`
  position: absolute;
  transition:
    top 0.3s ease-out,
    left 0.3s ease-out;
  ${e=>{let{$position:t}=e,[i,o]=t.split("-");return`
      left: ${"left"===o?"32px":"calc(100vw - 90px)"};
      top: ${"top"===i?"32px":"calc(100vh - 90px)"};
    `}}
`},98942:(e,t,i)=>{var o=i(69670),r=i(14041),n=i(39716),a=i(16285),l=i(37345),p=i(27461);let d=e=>{let{children:t,busy:i,position:o,visible:n,...a}=e,l=y(o);return r.createElement(c,{$busy:i,$from:l,$visible:n,...a},t)},s=e=>(0,n.i7)`
  from { opacity: 0; transform: translateX(${"left"===e?"-":""}100%);}
    to { opacity: 1; transform: translateX(0); }`,x=e=>(0,n.i7)`
  from { opacity: 1; transform: translateX(0);}
    to { opacity: 0; transform: translateX(${"left"===e?"-":""}100%); }`,c=(0,n.Ay)(p.VP)`
  position: relative;
  background: ${o.ONy};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 384px;
  max-height: calc(100vh - 64px);
  ${e=>{let{$visible:t,$from:i}=e;return(0,n.AH)`
    animation: ${(t?s:x)(i)} 0.3s ease-out forwards;
  `}}
  ${e=>{let{$busy:t}=e;return t&&(0,n.AH)`
      pointer-events: none;
      opacity: 0.5;
    `}}
`,g=n.Ay.div`
  display: flex;
  padding: 12px 16px 12px 20px;
  background: radial-gradient(99.86% 141.42% at 0% 0%, ${o.b_I} 0%, ${o.t14} 100%);
  align-items: center;
  justify-content: space-between;
`,u=n.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[i,o]=t.split("-");return`${i}: 32px; ${o}: 32px;`}}
`,f=(0,n.Ay)(e=>{let{position:t,...i}=e;return r.createElement(l.$n,{icon:"CollapseOutline",tooltipText:"Close",variant:"flat",mode:"color",round:!0,size:"l",...i})})`
  transform: rotate(${e=>{let{position:t}=e;return"left"===y(t)?180:0}}deg);
`;d.Header=e=>{let{children:t,onLogoClick:i,...o}=e;return r.createElement(g,o,i?r.createElement(l.$n,{icon:"BardeenLogoV2Negative",style:{margin:"-12px auto -12px -12px"},onClick:i,variant:"ghost",size:"xxl",tooltipText:"Open Bardeen"}):r.createElement(a.U,{style:{margin:"8px",fontSize:"24px"}}),r.createElement(p.fI,null,t))},d.Positioner=u,d.CloseButton=f;let y=e=>{let[,t]=e.split("-");return"left"===t?"left":"right"}},18255:(e,t,i)=>{var o=i(69670);i(14041);var r=i(39716);i(1970),i(28926);let n=e=>(0,r.i7)`
  from { 
    opacity: 0; 
    transform: translateX(${"left"===e?"-":""}100%);
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`,a=e=>(0,r.i7)`
  from { 
    opacity: 1; 
    transform: translateX(0);
  }
  to { 
    opacity: 0; 
    transform: translateX(${"left"===e?"-":""}100%); 
  }
`;r.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[i,o]=t.split("-"),r=`${o}: 37px;`,n=`${i}: 102px;`;return`${r} ${n}`}}
  z-index: 9998;
`,r.Ay.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${o.ONy};
  border: 1px solid ${o.MfC};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${o.Bfz};
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
    background: ${o.ONy};
    border-color: ${o.b_I};
    color: ${o.t14};
    transform: scale(1.05);
    box-shadow:
      0 4px 12px rgba(140, 128, 214, 0.15),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${o.t14};
    outline-offset: 2px;
  }
`,r.Ay.div`
  position: fixed;
  ${e=>{let{$position:t}=e,[i,o]=t.split("-"),r=`${o}: 32px;`;return`${r} ${"top"===i?"top: 102px;":"bottom: 102px;"}`}}
  z-index: 9999;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  background: ${o.ONy};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 360px;
  max-height: calc(100vh - 150px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08);
  ${e=>{let{$visible:t,$from:i}=e;return(0,r.AH)`
    animation: ${(t?n:a)(i)} 0.3s ease-out forwards;
  `}}
`,r.Ay.div`
  display: flex;
  padding: 16px 20px;
  background: ${o.CP};
  align-items: center;
  justify-content: space-between;
`,r.Ay.span`
  color: ${o.ONy};
  font-size: 16px;
  font-weight: 600;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background: ${o.ONy};
`,r.Ay.div`
  padding: 16px;
  border-bottom: 1px solid ${o.Tc2};
`,r.Ay.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  width: 100%;
  border: 1px solid ${o.NcT};
  border-radius: 12px;
  background: linear-gradient(135deg, ${o.KxS} 0%, ${o.ONy} 100%);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, ${o.Q_2} 0%, ${o.KxS} 100%);
    border-color: ${o.wB3};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(140, 128, 214, 0.15);
  }
`,r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${o.t14};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${o.ONy};
  font-size: 24px;
  flex-shrink: 0;
`,r.Ay.div`
  flex: 1;
  min-width: 0;
`,r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${o.c3n};
  margin-bottom: 2px;
`,r.Ay.div`
  font-size: 12px;
  color: ${o.Wm};
`,r.Ay.div`
  color: ${o.Wm};
  font-size: 16px;
  flex-shrink: 0;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
`,r.Ay.span`
  color: ${o.Wm};
  font-size: 14px;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`,r.Ay.span`
  font-size: 12px;
  font-weight: 600;
  color: ${o.Wm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 4px 8px;
`,r.Ay.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid ${o.Tc2};
  border-radius: 8px;
  background: ${o.ONy};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${o.hi1};
    border-color: ${o.wdA};
  }
`,r.Ay.img`
  width: 80px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: ${o.Tc2};
`,r.Ay.div`
  flex: 1;
  min-width: 0;
`,r.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: ${o.c3n};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`},85415:(e,t,i)=>{var o=i(69670),r=i(14041),n=i(39716),a=i(30665);i(94741),i(117),i(6717);var l=i(28926),p=(i(46288),i(34946));i(37345),i(95513),i(38940),i(33808),(0,i(85040).A)(()=>({optionsGroupWrapper:{marginTop:"10px"},additionalOptions:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"10px"},header:{color:o.NEG},footer:{marginTop:"10px",display:"flex",gap:"12px",justifyContent:"end"}})),i(8869);var d=i(61994);let s={light:"rgba(255, 255, 255, 0.95)",dark:"rgba(0, 0, 0, 0.88)"};n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>s[e.$mode]};
`,n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`,n.Ay.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,n.Ay.div`
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
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`,(0,n.Ay)(l.$n)`
  border: none;
  background-color: ${o.XxH};
  position: sticky;
  bottom: 0;
  margin-top: 16px;
`;var x=i(67331);i(45250),i(59998),i(41716);var c=i(1970);Array.from(new Map([["delay",{label:"Delay",placeholder:"Delay in seconds",icon:"TexturedDelay"}],["clipboard",{label:"Extract from Clipboard",icon:"TexturedClipboard"}],["socImage",{label:"Meta image",icon:"TexturedCodeBox"}],["description",{label:"Meta description",icon:"TexturedCodeBox"}],["url",{label:"Page link",icon:"TexturedUrlBox"}],["title",{label:"Page title",icon:"TexturedTextBox"}],["timestamp",{label:"Time scraped",icon:"TexturedDelayBox"}],["contentLoad",{label:"Content load",icon:"TexturedCodeBox"}],["navigate",{label:"Navigate",icon:"TexturedUrlBox"}]])).map(e=>{let[t,i]=e;return{label:i.label,value:t,icon:i.icon}}),(0,n.Ay)(l.fI)`
  justify-content: space-between;
  border-top: 1px solid ${o.Tc2};
  padding: 0 24px;
  height: 56px;
`;var g=i(36836);n.Ay.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  max-height: 320px;
  height: 100%;
  border-bottom: 0.5px solid ${o.MfC};
  border-right: 0.5px solid ${o.MfC};
  background-color: ${o.ONy};

  .no-result {
    align-items: center;
    justify-content: center;
    height: 100%;
    display: flex;
  }
`,n.Ay.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 333px;
  transition: all 0.24s ease-in-out;
  color: ${o.vh3};
  padding: 14px 16px;
  font-weight: 500;
  text-align: start;
  border-radius: 8px;
  &:hover {
    background-color: ${o.KxS};
    color: ${o.t14};
  }
`,n.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 300px;
`,n.Ay.table`
  border-collapse: separate;
  border-spacing: 0;

  col {
    border: 0px solid ${o.Tc2};
    background-color: ${o.o$k};
  }

  th {
    background-clip: padding-box;
    position: sticky;
    top: 0px;
    background-color: ${o.ONy};
  }

  td {
    border: 2px solid ${o.hi1};
    border-width: 1px 2px;
    text-align: start;

    &:not(:first-of-type) {
      background-color: ${o.ONy};
      width: 333px;
      padding: 12px 16px;
    }

    &:first-of-type {
      // numbers
      background-color: ${o.hi1};
      box-shadow: 0px 2px 6px 0px #0000000f;
      text-align: center;
    }
  }
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${o.Tc2};
  border-radius: 16px 16px 0 0;
  background-color: ${o.ONy};
  height: 56px;
  gap: 16px;
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  background-color: ${o.KxS};
  height: 100%;
  width: 52px;
`,(0,n.Ay)(g.w)`
  color: ${o.t14};
  flex-grow: 1;
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  flex: 1;
  min-width: 0;
`,n.Ay.div`
  display: flex;
  gap: 4px;
  padding-inline-end: 14px;
`,(0,n.Ay)(c.Y)`
  max-height: ${e=>{let{$isMinimized:t}=e;return t?"56px":"320px"}};
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${o.Tc2};
  transition: max-height 0.3s ease-in-out;
`,n.Ay.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  max-width: calc(100vw - 64px);
  transition: all 0.24s ease-in-out;
  ${e=>{let{$buttonPosition:t,$isPanelOpen:i}=e;switch(t){case"top-left":return i?(0,n.AH)`
              left: 448px;
              max-width: calc(100vw - 480px);
            `:null;case"top-right":return i?(0,n.AH)`
              max-width: calc(100vw - 480px);
            `:null;case"bottom-left":if(i)return(0,n.AH)`
            left: 448px;
            max-width: calc(100vw - 480px);
          `;return(0,n.AH)`
          left: 122px;
          max-width: calc(100vw - 154px);
        `;case"bottom-right":if(i)return(0,n.AH)`
            left: 32px;
            max-width: calc(100vw - 480px);
          `;return(0,n.AH)`
          left: 32px;
          max-width: calc(100vw - 154px);
        `}}}
`,n.Ay.div`
  position: fixed;
  top: ${e=>{let{$initialCoords:t}=e;return`${t?t.top:14}px`}};
  left: ${e=>{let{$initialCoords:t}=e;return`${t?t.left:14}px`}};
  cursor: ${e=>{let{$draggable:t}=e;return t?"grab":"auto"}};

  z-index: ${0x7ffffdaa};
`,i(18255),i(93269),i(66257),n.Ay.li`
  ${e=>{let{$isSingleOperation:t}=e;return t&&"padding: 8px 16px"}};
  border-radius: 8px;
  background-color: ${o.ONy};
  border: 1px solid ${o.Tc2};
  box-shadow: 0px 2px 4px 0px #0000000a;
  cursor: pointer;
  transition:
    color 0.24s ease-in-out,
    outline-color 0.24s ease-in-out;
  outline: 2px solid transparent;
  &:hover {
    outline-color: ${o.Q_2};
    color: ${o.t14};
  }

  ${e=>{let{$selected:t}=e;return t&&`outline-color: ${o.wB3}; color: ${o.t14};`}}
`,n.Ay.li`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${o.ONy};
  cursor: pointer;
  transition:
    background-color 0.24s ease-in-out,
    outline-color 0.24s ease-in-out;
  outline: 2px solid transparent;
  --icon-color: ${o.pHq};
  &:hover {
    --icon-color: ${o.NcT};
    background-color: ${o.KxS};
    color: ${o.t14};
  }
`,n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,(0,n.Ay)(x.P)`
  font-size: 14px;
  flex-grow: 1;
  line-height: 20px;
`,n.Ay.div`
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
`,n.Ay.span`
  word-break: break-word;
`;let u=e=>{let{container:t,onSortEnd:i,dispatch:o,onStartDeepCrawlerClicked:r,hideMenu:n,isActiveContainer:a}=e,{operations:l,name:p}=t;return React.createElement(SortableContainer,{onItemsReorder:i,items:l},React.createElement(y,{role:"list"},React.createElement(m,null,React.createElement(Icon,{icon:"TexturedListScraper",size:16}),React.createElement(h,null,React.createElement(InlineEditable,{Component:w,onChange:e=>o({type:A.OperationNameUpdated,operationId:t.id,name:e}),value:p??"",autoFocus:!0,hideEditIcon:!!p,editIconTooltipText:"Edit name"})),React.createElement(Button,{icon:a?"RadioCrossBold":"RadioCheckmarkBold",variant:"flat",tooltipText:a?"Deactivate":"Activate",size:"m",round:!0,onClick:()=>{o({type:A.SetActiveContainerId,id:a?null:t.id})}}),n?null:React.createElement(MoreOptionsMenu,null,React.createElement(MenuButton,{onClick:()=>o({type:A.OperationDeleteTriggered,operation:t})},"Delete"),React.createElement(MenuButton,{onClick:()=>o({type:A.EditContainerDialogOpened,operation:t})},"Edit"),a?React.createElement(MenuButton,{onClick:()=>o({type:A.SetActiveContainerId,id:null})},"Deactivate"):React.createElement(MenuButton,{onClick:()=>o({type:A.SetActiveContainerId,id:t.id})},"Activate"))),React.createElement(PaginationItem,{container:t,dispatch:o}),l.map(e=>React.createElement(OperationItem,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:o,onStartDeepCrawlerClicked:r,onEditDeepCrawlerClicked:null,hideMenu:n,ContainerComponent:u,DeepCrawlComponent:f}))))},f=e=>{let{isRunning:t,isActionDisabled:i,deepCrawl:o,onSortEnd:r,dispatch:n,onStartDeepCrawlerClicked:a,onEditDeepCrawlerClicked:l}=e,{operations:p,name:d,id:s}=o;return React.createElement(SortableContainer,{onItemsReorder:r,items:p},React.createElement(y,{role:"list"},React.createElement(m,null,React.createElement(Icon,{icon:"SquareOutline",size:16}),React.createElement(h,null,React.createElement(InlineEditable,{Component:w,onChange:e=>n({type:A.OperationNameUpdated,operationId:o.id,name:e}),value:d??"",autoFocus:!0,hideEditIcon:!!d,editIconTooltipText:"Edit name"})),t?React.createElement(b,{icon:"RadioStopBold",variant:"flat",tooltipText:"Stop",size:"m",round:!0,onClick:()=>{n({type:A.DeepCrawlStopButtonClicked})}}):React.createElement(b,{icon:"RadioPlayBold",disabled:i,variant:"flat",tooltipText:"Run and populate (3 results)",size:"m",round:!0,onClick:()=>{i||n({type:A.DeepCrawlRunButtonClicked,operationId:s,limit:3})}}),React.createElement(MoreOptionsMenu,null,React.createElement(MenuButton,{onClick:()=>n({type:A.OperationDeleteTriggered,operation:o})},"Delete"),React.createElement(MenuButton,{onClick:()=>l?.(o)},"Edit"))),p.map(e=>React.createElement(OperationItem,{activeContainerId:null,runningDeepCrawlerId:null,key:e.id,operation:e,dispatch:n,onStartDeepCrawlerClicked:a,onEditDeepCrawlerClicked:l,hideMenu:!0,ContainerComponent:u,DeepCrawlComponent:f}))))},y=n.Ay.ul`
  padding-inline: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{$isMainContainer:t}=e;return t?"8px":"0px"}};
`,m=n.Ay.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
`,b=(0,n.Ay)(l.$n)``,h=n.Ay.div`
  flex-grow: 1;
`,w=n.Ay.span`
  word-break: break-word;
  line-break: anywhere;
  font-size: 14px;
  font-weight: 600;
`;i(78406),(0,n.Ay)(l.VP)`
  width: 480px;
  max-height: 400px;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.06);
  background-color: ${o.ONy};
  padding: 8px;
`,n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,n.Ay.span`
  color: ${o.FCg};
  font-size: 12px;
  margin-inline-start: 16px;
  display: inline-block;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${o.ONy};
  position: sticky;
  padding: 8px;
  margin: -8px;
  bottom: -8px;
`,(0,n.Ay)(d.EY)`
  font-size: 14px;
  font-weight: 600;
  color: ${o.CP};
  padding: 14px 16px;
`,n.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 160px;
  overflow: auto;
  margin-inline: -24px;
  padding-inline: 24px;
`,n.Ay.li`
  display: flex;
  margin-top: 3px;
  align-items: center;
  gap: 8px;
  width: 100%;
`,n.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,n.I4.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: 400px;
`;let v=(0,n.I4)(e=>{let t=r.useId();return r.createElement("div",null,r.createElement("label",{htmlFor:t},e.label),e.children(t))})`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;n.I4.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,n.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,n.I4.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,n.Ay.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid ${o.wdA};
`,n.Ay.fieldset`
  margin: 10px 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
`,n.Ay.h2`
  color: ${o.NEG};
`,n.Ay.footer`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,i(39629),(0,n.Ay)(l.$n).attrs({variant:"primary",size:"xl",round:!0})``,(0,n.Ay)(l.$n).attrs({variant:"outlined",size:"xl",round:!0})``,n.Ay.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid ${o.Tc2};
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  margin: 16px 0;
`,n.Ay.div`
  padding: 12px;
  background-color: ${o.P0$};
  border: 1px solid ${o.MEI};
  border-radius: 8px;
  color: ${o.CCs};
  font-size: 14px;
  margin: 16px 0;
  word-break: break-word;
`,n.Ay.div`
  padding: 12px 24px;
  height: 100vh;
  overflow: auto;
`,(0,n.Ay)(l.$n).attrs({variant:"primary",size:"xl",round:!0})``,(0,n.Ay)(l.$n).attrs({variant:"outlined",size:"xl",round:!0})``,n.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${x.H4} {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
    color: ${o.t14};
  }
  ${l.lm} {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    border: 1px solid ${o.Tc2};
  }
`,n.Ay.div`
  position: fixed;
  inset: 0;
  display: inline-block;
`,(0,n.Ay)(p.P)`
  transform: translateY(-50%);
`,(0,n.Ay)(l.$n).attrs({variant:"primary",size:"xl",round:!0})``,(0,n.Ay)(l.$n).attrs({variant:"outlined",size:"xl",round:!0})``;let $=(0,n.i7)`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,k=(0,n.i7)`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;n.Ay.div`
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: calc(100vh - 40px);
  width: 340px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: ${$} 0.3s ease-out;
`,n.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${o.ONy};
  border-radius: 12px;
  box-shadow: ${e=>e.$withShadow?`
        0 8px 30px rgba(0, 0, 0, 0.12),
        0 4px 8px rgba(140, 128, 214, 0.12)
      `:"none"};
  overflow: hidden;
  max-height: 100%;
  border: 1px solid ${o.Q_2};
  backdrop-filter: blur(8px);
`,n.Ay.div`
  padding: 18px 20px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${o.Q_2};
  background-color: ${o.KxS};
  color: ${o.c3n};
  white-space: normal;
  word-break: break-word;
`,n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  scrollbar-width: thin;
  scrollbar-color: ${o.NcT} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${o.NcT};
    border-radius: 6px;
  }
`,n.Ay.div`
  display: flex;
  padding: 12px;
  border-radius: 10px;
  background-color: ${e=>"executor"===e.type?o.KxS:o.hi1};
  gap: 10px;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid ${e=>"executor"===e.type?o.Q_2:o.Tc2};
  animation: ${e=>e.$isNew?(0,n.AH)`
          ${$} 0.3s ease-out
        `:"none"};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${e=>"executor"===e.type?o.t14:o.CP};
  color: ${o.ONy};
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px
    ${e=>"executor"===e.type?"rgba(140, 128, 214, 0.3)":"rgba(0, 0, 0, 0.1)"};
  border: 2px solid ${o.ONy};
`,n.Ay.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${o.c3n};
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  word-break: break-word;
  letter-spacing: 0.01em;
`,(0,n.Ay)(a.y)`
  margin-left: 8px;
  animation: ${e=>e.$pulse?(0,n.AH)`
          ${k} 1.5s ease-in-out infinite
        `:"none"};
`,i(7711),i(88260),n.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: clamp(16px, 3vw, 24px);
  padding: clamp(16px, 3vw, 24px);
  height: 100%;
  max-height: 90vh;
  max-width: 800px;
`,(0,n.Ay)(l.fI)`
  gap: 12px;
  justify-content: flex-end;
`,n.Ay.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: clamp(10px, 2vw, 12px);
  border: 1px solid ${e=>e.selected?o.t14:o.MfC};
  border-radius: 8px;
  background: ${e=>e.selected?o.KxS:o.ONy};
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  gap: 12px;

  &:hover {
    border-color: ${o.t14};
  }
`,n.Ay.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: 4px;
`,(0,n.Ay)(x.H5)`
  word-break: break-word;
  font-weight: 500;
`,n.Ay.span`
  font-size: clamp(12px, 1.5vw, 14px);
  color: #666;
  word-break: break-all;
  width: 100%;
`},69236:(e,t,i)=>{i(14041);var o=i(39716);i(28926),i(61994);var r=i(69670),n=i(85040),a=i(21799);(0,n.A)(e=>({nag:{...a.SP,backgroundColor:r.Xi8,borderRadius:".75rem",boxSizing:"border-box",color:r.ONy,fontWeight:600,padding:e.spacing(4,4),width:"358px",position:"relative"},header:{display:"flex",alignItems:"center",margin:e.spacing(0,2,3,2)},logo:{display:"block",marginRight:e.spacing(7)},titleWrapper:{display:"flex",flexDirection:"column",alignItems:"flex-start"},headline:{lineHeight:"44px",fontSize:"18px"},bodyText:{marginTop:e.spacing(2),lineHeight:"22px",fontSize:"14px"},subTitle:{lineHeight:"22px",color:r.ONy,opacity:.8},fullWidth:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},dot:{background:r.ui$,borderRadius:"50%",margin:"5px",height:"6px",transition:".5s all",width:"6px"},dotsWrapper:{display:"flex",alignItems:"center",width:"100%"},dotActive:{background:r.g7N},dots:{display:"flex",alignItems:"center",justifyContent:"center",flex:1},hover:{".hideTillMouseOver":{opacity:1}},invisible:{opacity:0},fadeIn:{opacity:1,transition:"opacity .5s"},fadeOut:{opacity:0,transition:"opacity .5s"},nagIconWrapper:{display:"flex","& .bardeen-icon":{"&:not(:last-child)":{marginRight:e.spacing(3)}}},nagTitle:{fontWeight:600,fontSize:"18px",lineHeight:"19px",marginBottom:e.spacing(3),color:r.t14},nagSubTitle:{fontSize:"16px",lineHeight:"24px"},commands:{marginBottom:e.spacing(4),display:"flex",alignItems:"center",flexDirection:"column",flexWrap:"wrap",width:"100%",paddingLeft:e.spacing(2),"& > * + *":{marginTop:4,position:"relative","&:after":{borderLeft:`2px dotted ${r.ydb}`,content:"''",height:26,left:16,position:"absolute",top:-29,transform:"translate(-50%,0)",width:0}},"& > :first-child + :after":{borderLeft:`2px dotted ${r.ydb}`},"& > :first-child":{paddingTop:0}},command:{display:"flex",color:r.MfC,padding:e.spacing(0,2),gap:"12px",alignItems:"center",margin:e.spacing(4,0),width:"100%"},closeIcon:{display:"flex",alignItems:"center",justifyContent:"center",padding:e.spacing(1.5),borderRadius:"50%",border:`2px solid ${r.ONy}`,backgroundColor:r.NEG,position:"absolute",top:-e.spacing(4),left:-e.spacing(4),cursor:"pointer"},cardIconsLabel:{padding:e.spacing(0)}})),o.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`},78927:(e,t,i)=>{i(14041);var o=i(39716);i(117),i(28926),o.Ay.ul`
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
`,o.Ay.span`
  overflow-wrap: anywhere;
  overflow: hidden;

  /* non standard versions */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* standard versions */
  line-clamp: 2;
  block-ellipsis: auto;
`,o.Ay.span`
  width: 1em;
  min-width: 1em;
  min-height: 1em;
`,o.Ay.span`
  color: #aaa;
  font-size: 0.8em;
  font-weight: 400;
  vertical-align: baseline;
`,o.Ay.span`
  width: 1.5em;
  min-width: 1.5em;
`,o.Ay.span`
  width: 1em;
  min-width: 1em;
  cursor: ${e=>e.disabled?"default":"pointer"};
`,i(37217).I.getLogger("DebugModal"),o.Ay.div`
  position: fixed;
  top: 0;
  right: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  z-index: 2147483000;
  max-height: 100%;
  overflow: auto;
`,o.Ay.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: darkgray 0px 0px 4px 0px;
  padding: 12px;
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`,o.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`,o.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 4px;
`,o.Ay.ul`
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
`,o.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`},13693:(e,t,i)=>{i(78927),i(55553)},94741:(e,t,i)=>{var o=i(69670);i(14041);var r=i(39716);i.p,i(28926),r.Ay.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 16px 16px 28px;
`,r.Ay.img`
  height: 96px;
  width: 96px;
`,r.Ay.h1`
  color: ${o.t14};
  font-size: 22px;
  text-align: center;
`,r.Ay.p`
  text-align: center;
  color: ${o.wmS};
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`,r.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,r.Ay.form`
  width: 100%;
`,r.Ay.textarea`
  width: 100%;
  border: 2px ${o.wB3} solid;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  resize: none;
  color: ${o.CP};
  margin: 8px 0;
`,r.Ay.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`},19585:(e,t,i)=>{i(14041)}}]);
//# debugId=67a33ada-774f-51c8-a03c-f18d0444380d
