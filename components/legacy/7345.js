"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ca83d623-9c4c-5e2f-aefc-3d33ec0f91ac")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[7345],{37345:(o,r,e)=>{e.d(r,{$n:()=>i});var n=e(69670),t=e(78445),l=e(14041),a=e(39716);e(64185);var c=e(48266),d=e(30665);let i=(0,a.Ay)(l.memo(o=>{let r,{addonLeft:e,disabled:a=!1,fullWidth:i,href:u,loading:$=!1,mode:g="light",round:f,size:C="m",variant:h="primary",pulse:y=!1,ref:v,selected:k=!1,...w}=o;u&&(r=()=>window.open(u,"_blank","noopener noreferrer"));let N=a||$;if(x(w)){let{text:o,icon:t,iconPosition:p="left",...x}=w;return l.createElement(s,{ref:v,"aria-label":o,name:o,$iconPosition:p,disabled:N,...x,$size:C,$mode:g,$round:f,$fullWidth:i,$variant:h,$hasIcon:!0,$hasText:!0,$pulse:y&&!a,$selected:k,onClick:r||x.onClick,"data-href":u},$?l.createElement(d.y,{color:n.ONy,size:"s"}):t?l.createElement(l.Fragment,null,l.createElement(c.In,{icon:t})," ",o):null,e)}if(b(w)){let{icon:o,tooltipText:e,tooltipPlacement:x,...b}=w,q=l.createElement(s,{ref:v,"aria-label":e??String(o),disabled:N,...b,$size:C,$mode:g,$variant:h,$round:f,$hasIcon:!0,$hasText:!1,$pulse:y&&!a,$fullWidth:i,$selected:k,onClick:r||b.onClick,"data-href":u},$?l.createElement(d.y,{color:n.ONy,size:"s"}):l.createElement(c.In,{icon:o}));return e?l.createElement(t.m,{content:e,placement:x,delay:500},N?l.createElement(p,{$fullWidth:i},q):q):q}let{text:q,tooltipText:O,tooltipPlacement:m,...B}=w,z=l.createElement(s,{ref:v,disabled:N,...B,$size:C,$mode:g,$variant:h,$fullWidth:i,$round:f,$hasIcon:!1,$hasText:!!q,$pulse:y&&!a,$selected:k,onClick:r||B.onClick,"data-href":u},$?l.createElement(d.y,{color:n.ONy,size:"s"}):q);return O?l.createElement(t.m,{content:O,placement:m},N?l.createElement("span",null,z):z):z}))``,p=a.Ay.div`
  display: inline-block;
  width: ${o=>{let{$fullWidth:r}=o;return r?"100%":"fit-content"}};
`,s=a.Ay.button.attrs(o=>{let r=!!(o.onClick||o.href);return{as:r||"submit"===o.type?"button":"div",type:o.type?o.type:r?"button":void 0,role:o.role||"button"}})`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: background-color, color, border-color, opacity;
  width: ${o=>o.$fullWidth?"100%":"fit-content"};
  height: fit-content;
  text-align: center;
  white-space: nowrap;
  font-weight: 600;
  font-family: "Inter", serif;
  --icon-color: initial;
  --icon-size: initial;

  ${o=>g[o.$mode][o.$variant].default};

  display: inline-flex;
  flex-direction: ${o=>"left"===o.$iconPosition?"row":"row-reverse"};
  gap: ${o=>$[o.$size].gap};
  justify-content: center;
  align-items: center;

  padding: ${o=>o.$hasIcon&&!o.$hasText?$[o.$size].padding.icon:o.$round?$[o.$size].padding.round:$[o.$size].padding.default};

  border-radius: ${o=>o.$round?$[o.$size].radius.round:$[o.$size].radius.default};
  font-size: ${o=>$[o.$size].fontSize};
  line-height: ${o=>$[o.$size].lineHeight};

  --icon-size: ${o=>$[o.$size].svg}px;

  &:hover,
  &.pseudo-hover {
    --icon-scale: 1.1;
    color: ${n.ONy};
    ${o=>g[o.$mode][o.$variant].hover};
  }

  ${o=>o.$selected&&(0,a.AH)`
      --icon-scale: 1.1;
      color: ${n.ONy};
      ${g[o.$mode][o.$variant].hover};
      border: 1px solid ${n.j3F};
    `}

  &:focus-visible,
  &.pseudo-focus {
    ${o=>g[o.$mode][o.$variant].focus};
    padding: ${o=>o.$hasIcon&&!o.$hasText?$[o.$size].padding.iconFocus:o.$round?$[o.$size].padding.roundFocus:$[o.$size].padding.focus};
    border-style: solid;
    border-width: ${o=>$[o.$size].borderWidth};
  }

  &:active,
  &.pseudo-active {
    & > svg {
      transform: scale(1);
    }
    ${o=>g[o.$mode][o.$variant].active};
  }

  &[disabled] {
    pointer-events: none;
    ${o=>g[o.$mode][o.$variant].disabled};
  }

  &:not(:hover) {
    ${o=>o.$pulse&&(0,a.AH)`
        animation: ${u} 3s infinite;
        .tour & {
          animation: none;
        }
      `}
  }
`,u=(0,a.i7)`
    0% {
      -webkit-box-shadow: 0 0 0 0 Color.rgba(111, 96, 204, 0);
    }
    50% {
      -webkit-box-shadow: 0 0 0 6px Color.rgba(111, 96, 204, 0.32);
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 Color.rgba(111, 96, 204, 0);
    }
`,x=o=>"text"in o&&"icon"in o&&!!(o.text&&o.icon),b=o=>"icon"in o&&null!=o.icon,$={xxs:{padding:{default:"4px 6px",focus:"4px 6px",icon:"4px",iconFocus:"4px",round:"4px 7px",roundFocus:"4px 7px"},radius:{default:"3px",round:"10px"},svg:11,borderWidth:"1px",gap:"5px",fontSize:"9px",lineHeight:"10px"},xs:{padding:{default:"5px 7px",focus:"5px 7px",icon:"5px",iconFocus:"5px",round:"5px 9px",roundFocus:"5px 9px"},radius:{default:"4px",round:"12px"},svg:12,borderWidth:"1px",gap:"6px",lineHeight:"12px",fontSize:"11px"},s:{padding:{default:"6px 9px",focus:"6px 9px",icon:"6px",iconFocus:"6px",round:"6px 11px",roundFocus:"6px 11px"},radius:{default:"5px",round:"14px"},svg:14,borderWidth:"1px",gap:"7px",fontSize:"12px",lineHeight:"14px"},m:{padding:{default:"7px 11px",focus:"6px 10px",icon:"7px",iconFocus:"6px",round:"7px 13px",roundFocus:"6px 12px"},radius:{default:"6px",round:"16px"},svg:16,borderWidth:"2px",gap:"8px",fontSize:"14px",lineHeight:"16px"},l:{padding:{default:"10px 15px",focus:"9px 14px",icon:"10px",iconFocus:"9px",round:"10px 17px",roundFocus:"9px 16px"},radius:{default:"7px",round:"20px"},svg:16,borderWidth:"2px",gap:"10px",fontSize:"14px",lineHeight:"18px"},xl:{padding:{default:"13px 19px",focus:"12px 18px",icon:"13px",iconFocus:"12px",round:"12px 20px",roundFocus:"11px 19px"},radius:{default:"8px",round:"24px"},svg:20,borderWidth:"2px",gap:"12px",fontSize:"17px",lineHeight:"20px"},xxl:{padding:{default:"15px 23px",focus:"14px 22px",icon:"15px",iconFocus:"14px",round:"14px 24px",roundFocus:"13px 23px"},radius:{default:"9px",round:"28px"},svg:24,borderWidth:"2px",gap:"14px",fontSize:"20px",lineHeight:"24px"}},g={light:{primary:{default:{backgroundColor:n.t14,color:n.ONy,border:`1px ${n.t14} solid`},hover:{backgroundColor:n.Xvv,borderColor:n.Xvv,color:n.ONy},focus:{backgroundColor:n.Xvv,borderColor:n.ONy,boxShadow:`0px 0px 0px 2px ${n.B3q(n.Xvv,.48)}`},active:{backgroundColor:n.Xvv,borderColor:n.Xvv},disabled:{cursor:"not-allowed",backgroundColor:n.pHq,borderColor:n.pHq,opacity:.32}},outlined:{default:{"--icon-color":n.wmS,backgroundColor:"transparent",color:n.ui$,border:`1px ${n.MfC} solid`},hover:{"--icon-color":n.t14,backgroundColor:n.B3q(n.Q_2,.32),borderColor:n.B3q(n.Q_2,.64),color:n.t14},focus:{"--icon-color":n.t14,borderColor:"transparent",backgroundColor:n.B3q(n.Q_2,.32),color:n.t14,boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.48)}`},active:{"--icon-color":n.t14,backgroundColor:n.B3q(n.Q_2,.48),color:n.t14},disabled:{"--icon-color":n.MfC,cursor:"not-allowed",backgroundColor:"transparent",color:n.MfC}},flat:{default:{"--icon-color":n.wmS,backgroundColor:"transparent",color:n.ui$,border:"1px transparent solid"},hover:{"--icon-color":n.t14,backgroundColor:n.B3q(n.Q_2,.32),color:n.t14},focus:{"--icon-color":n.t14,backgroundColor:n.B3q(n.Q_2,.32),color:n.t14,borderColor:"white",boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.48)}`},active:{"--icon-color":n.t14,color:n.t14,backgroundColor:n.B3q(n.Q_2,.48)},disabled:{"--icon-color":n.B3q(n.ui$,.32),cursor:"not-allowed",backgroundColor:"transparent",color:n.B3q(n.ui$,.32)}},ghost:{default:{"--icon-color":n.wmS,color:n.ui$,border:"1px transparent solid"},hover:{"--icon-color":n.t14,color:n.t14},focus:{"--icon-color":n.t14,color:n.t14,boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.48)}`,borderColor:"transparent"},active:{"--icon-color":n.t14,color:n.t14},disabled:{"--icon-color":n.B3q(n.ui$,.32),cursor:"not-allowed",color:n.B3q(n.ui$,.32)}}},dark:{primary:{default:{backgroundColor:n.t14,color:n.ONy,border:`1px ${n.t14} solid`},hover:{backgroundColor:n.g7N,borderColor:n.g7N,color:n.ONy},focus:{backgroundColor:n.g7N,borderColor:n.Xi8,boxShadow:`0px 0px 0px 2px ${n.B3q(n.g7N,.64)}`},active:{backgroundColor:n.$yE,borderColor:n.$yE},disabled:{cursor:"not-allowed",backgroundColor:n.B3q(n.ONy,.16),opacity:.32}},outlined:{default:{"--icon-color":n.pHq,backgroundColor:"transparent",color:n.MfC,border:`1px ${n.B3q(n.ONy,.16)} solid`},hover:{"--icon-color":n.ONy,backgroundColor:n.B3q(n.t14,.48),borderColor:n.B3q(n.t14,.64),color:n.ONy},focus:{"--icon-color":n.ONy,backgroundColor:n.B3q(n.t14,.48),borderColor:n.Xi8,boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.64)}`,color:n.ONy},active:{backgroundColor:n.B3q(n.t14,.32),color:n.pHq},disabled:{"--icon-color":n.ONy,cursor:"not-allowed",backgroundColor:"transparent",color:n.ONy,opacity:.24}},flat:{default:{"--icon-color":n.pHq,backgroundColor:"transparent",color:n.MfC,border:"1px transparent solid"},hover:{"--icon-color":n.ONy,color:n.ONy,backgroundColor:n.B3q(n.t14,.48)},focus:{"--icon-color":n.ONy,backgroundColor:n.B3q(n.t14,.48),borderColor:n.Xi8,boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.64)}`,color:n.ONy},active:{"--icon-color":n.pHq,color:n.pHq,backgroundColor:n.B3q(n.t14,.32)},disabled:{"--icon-color":n.ONy,cursor:"not-allowed",backgroundColor:"transparent",color:n.ONy,opacity:.24}},ghost:{default:{"--icon-color":n.pHq,backgroundColor:"transparent",color:n.MfC,border:"1px transparent solid"},hover:{"--icon-color":n.wB3,color:n.wB3},focus:{"--icon-color":n.wB3,color:n.wB3,borderColor:"transparent",boxShadow:`0px 0px 0px 2px ${n.B3q(n.t14,.64)}`},active:{"--icon-color":n.b_I,color:n.b_I},disabled:{"--icon-color":n.ONy,cursor:"not-allowed",backgroundColor:"transparent",color:n.ONy,opacity:.24}}},color:{primary:{default:{background:`linear-gradient(${n.aWC}, ${n.Ow4}) border-box`,color:n.Xvv,border:"1px transparent solid"},hover:{color:n.Xvv,background:`linear-gradient(${n.eCI}, ${n.Z0l}) border-box`,borderColor:"transparent"},focus:{background:`linear-gradient(${n.eCI}, ${n.Z0l}) border-box`,borderColor:n.t14,boxShadow:`0px 0px 0px 2px ${n.B3q(n.nWs,.64)}`},active:{background:`linear-gradient(${n.aWC}, ${n.Ow4}) border-box`,borderColor:"transparent"},disabled:{cursor:"not-allowed",background:"none",backgroundColor:n.wB3,opacity:.32,borderColor:n.wB3}},outlined:{default:{"--icon-color":n.pHq,backgroundColor:"transparent",color:n.Q_2,border:`1px ${n.B3q(n.ONy,.32)} solid`},hover:{"--icon-color":n.ONy,color:n.ONy,backgroundColor:n.B3q(n.ONy,.08),borderColor:n.B3q(n.ONy,.16)},focus:{"--icon-color":n.ONy,color:n.ONy,backgroundColor:n.B3q(n.ONy,.08),borderColor:n.t14,boxShadow:`0px 0px 0px 2px ${n.B3q(n.ONy,.32)}`},active:{"--icon-color":n.NcT,backgroundColor:n.B3q(n.ONy,.04),borderColor:"transparent",color:n.NcT},disabled:{"--icon-color":n.Q_2,cursor:"not-allowed",border:`1px ${n.ONy} 0.32`,backgroundColor:"transparent",color:n.Q_2,opacity:.32}},flat:{default:{backgroundColor:"transparent",color:n.Q_2,border:"1px transparent solid"},hover:{color:n.ONy,backgroundColor:n.B3q(n.ONy,.08)},focus:{backgroundColor:n.B3q(n.ONy,.08),borderColor:n.t14,color:n.ONy,boxShadow:`0px 0px 0px 2px ${n.B3q(n.ONy,.32)}`},active:{backgroundColor:n.B3q(n.ONy,.04),borderColor:"transparent",color:n.NcT},disabled:{cursor:"not-allowed",border:`1px ${n.ONy} 0.32`,backgroundColor:"transparent",color:n.Q_2,opacity:.32}},ghost:{default:{backgroundColor:"transparent",color:n.Q_2,border:"1px transparent solid"},hover:{color:n.ONy},focus:{backgroundColor:n.B3q(n.ONy,.01),borderColor:n.t14,color:n.ONy,boxShadow:`0px 0px 0px 2px ${n.B3q(n.ONy,.32)}`},active:{backgroundColor:"transparent",borderColor:"transparent",color:n.NcT},disabled:{cursor:"not-allowed",backgroundColor:"transparent",color:n.Q_2,opacity:.32}}}};a.Ay.div`
  position: fixed;
  top: calc(100vh - 20%);
  left: 50%;
  transform: translateX(-50%);
`}}]);
//# debugId=ca83d623-9c4c-5e2f-aefc-3d33ec0f91ac
