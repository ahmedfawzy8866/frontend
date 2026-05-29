"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="dfab5439-5f02-5f11-9771-27186ab8e1de")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[3080],{23322:(e,t,n)=>{n.d(t,{w1:()=>E,ID:()=>M});var l=n(80284),a=n(69670),i=n(67331),r=n(14041),o=n(39716),s=n(41917),m=n(74729),c=n(16631),u=n(28926),d=n(56340),p=n(76418);function f(e,t){return e.type===t.type}function g(e,t){return"string"===e.type||"string"===t.type}let h=e=>{let{field:t,options:n,editable:l,value:i,direction:o,onChange:s}=e,m=r.useCallback(e=>{s(t.name,e)},[t.name,s]),c=r.useMemo(()=>l&&!n.find(e=>e.value===t.title)?[...n,{label:`New Column: ${t.title||t.name}`,value:t.title}]:n,[l,t.name,t.title,n]),d=r.createElement(u.ms,{behavior:"resize",renderContent:e=>{let{close:t}=e;return r.createElement(r.Fragment,null,r.createElement(u.IU,{text:1===o?"Discard":"Empty",icon:"CrossOutline",onClick:()=>{m(null),t()}}),c.map(e=>e.value?r.createElement(u.IU,{key:e.label,text:e.label||"",icon:e.icon,onClick:()=>{m(e.value||null),t()}}):null))}},r.createElement(u.N,{title:c.find(e=>e.value===i)?.label||i,rightAddon:r.createElement(u.In,{icon:"ArrowDownOutline"}),"data-testid":`${t.name}-dropdown`}));return r.createElement(b,{$direction:1===o?"row":"row-reverse",gap:16},r.createElement(u.N,{title:t.title||t.name,"data-testid":`${t.name}-fixed`,style:{backgroundColor:`${a.Q_2}3D`}}),r.createElement(y,null),d)},y=(0,o.Ay)(e=>r.createElement(u.fI,{center:!0,...e},r.createElement(u.In,{icon:"FullArrowRightOutline"})))`
  --icon-color: ${a.ydb};
  --icon-size: 16px;
  flex: 0 0 16px;
`,b=(0,o.Ay)(u.fI)`
  padding: 8px 0;
  flex-direction: ${e=>e.$direction};
  & > *:not(${y}) {
    width: calc(50% - 32px);
    flex: 1 1 0;
  }
`,E=r.memo(e=>{let{arg:t,onChange:n}=e,l=r.useMemo(()=>{let[e]=t.typeHint.signature;if(e&&s.u0(e.facets,m.y))return m.y.fromSignature(e).getConfigOptions()},[t.typeHint.signature]),a=l?.editable?1:0,i=1===a?l?.fromSchema.fields.length??0:l?.toSchema.fields.length??0,o=r.useMemo(()=>{let e=t.value&&"ConstantValueExpression"===t.value.type?m.y.deserialize(t.value.value,new c.SP):null;return e?.ok?e.value:m.y.create({mapping:l?function(e,t,n){let l=[],a=[];if(n)for(let t of e)a.push(p.Bi.create({name:t.title||t.name,title:t.title||t.name,type:t.type}));for(let a of e){let i=[];for(let e of t)i.push(function(e,t){if((e.title||e.name)===(t.title||t.name))return f(e,t)?0:g(e,t)?1:1e3;let n=e.name.toLowerCase(),l=e.title?.toLowerCase(),a=t.name.toLowerCase(),i=t.title?.toLowerCase(),r=null;if(n.includes(a)||a.includes(n)?r=Math.abs(n.length-a.length)/Math.max(n.length,a.length):l&&i&&(l?.includes(i)||i?.includes(l))?r=Math.abs(l.length-i.length)/Math.max(l.length,i.length):l&&(l?.includes(a)||a.includes(l))?r=Math.abs(l.length-a.length)/Math.max(l.length,a.length):i&&(i?.includes(n)||n.includes(i))&&(r=Math.abs(i.length-n.length)/Math.max(i.length,n.length)),null!==r){if(f(e,t))return 5+r;if(g(e,t))return 6+r}return 1e3}(a,e));if(n)for(let t of e)i.push(t===a?8:1e3);l.push(i)}0===l.length&&l.push([]);let i=new d.Munkres().compute(l),r=[];for(let[n,o]of i)if(!(l[n][o]>=1e3)){if(o<t.length){let l=e[n],a=t[o];l&&a&&r.push({original:l.name,renamed:a.name})}else{let l=e[n],i=a[o-t.length];l&&i&&r.push({original:l.name,renamed:i.name})}}return r}(l.fromSchema.fields,l.toSchema.fields,l.editable):[]})},[t.value,l]);r.useEffect(()=>{l&&!t.value&&n({type:"ConstantValueExpression",value:o.serialize(),typeHint:t.typeHint,validationStatus:[],displayHint:{label:"",description:""}})},[l,t.typeHint,t.value,o,n]);let y=r.useCallback((e,l)=>{let a;let i=!1;l?(a=o.mapping.map(t=>t.original===e?(i=!0,{...t,renamed:l}):t),i||a.push({original:e,renamed:l})):a=o.mapping.filter(t=>t.original!==e),n({type:"ConstantValueExpression",value:m.y.create({mapping:a}).serialize(),typeHint:t.typeHint,validationStatus:[],displayHint:{label:"",description:""}})},[t,o.mapping,n]),b=r.useCallback((e,l)=>{let a;let i=!1;l?(a=o.mapping.map(t=>t.renamed===e?(i=!0,{...t,original:l}):t),i||a.push({original:l,renamed:e})):a=o.mapping.filter(t=>t.renamed!==e),n({type:"ConstantValueExpression",value:m.y.create({mapping:a}).serialize(),typeHint:t.typeHint,validationStatus:[],displayHint:{label:"",description:""}})},[t,o.mapping,n]),E=r.useMemo(()=>l?l.toSchema.fields.map(e=>({label:e.title||e.name,value:e.name})):[],[l]),S=r.useMemo(()=>l?l.fromSchema.fields.map(e=>({label:e.title||e.name,value:e.name})):[],[l]);return l?r.createElement(v,null,r.createElement(x,{leftName:l.fromSourceName||"Data Source",leftIcon:r.createElement(C,{icon:l.fromSourceIcon||"CommandsGet"}),rightName:l.toSourceName||"Data Destination",rightIcon:r.createElement(C,{icon:l.toSourceIcon||"CommandsSet"})}),r.createElement(u.R9,{enabled:i>4,columns:!0},1===a?l.fromSchema.fields.map(e=>{let t=o.mapping.find(t=>t.original===e.name)?.renamed;return r.createElement(h,{key:e.name,field:e,options:E,editable:l.editable,value:t,direction:a,onChange:y})}):l.toSchema.fields.map(e=>{let t=o.mapping.find(t=>t.renamed===e.name)?.original;return r.createElement(h,{key:e.name,field:e,options:S,editable:l.editable,value:t,direction:a,onChange:b})})),(t.value?.validationStatus?.length??0)>0?r.createElement(u.BQ,{variant:"critical"}," ",JSON.stringify(t.value?.validationStatus)," "):null):r.createElement(u.VP,{center:!0,"aria-label":"Loading"},r.createElement(u.y$,null))}),v=(0,o.Ay)(u.VP)`
  --icon-color: ${a.ydb};
  --icon-size: 16px;
`,C=(0,o.Ay)(e=>r.createElement(u.In,{...e,icon:e.icon}))`
  --size: 20px;
  --color: ${a.t14};
`,x=(0,o.Ay)(l.s)`
  & ${i.P} {
    text-align: center;
  }
`;var S=n(13489),w=n(1727),$=n(85170),k=n(24522),I=n(23198);let M=r.memo(function(e){let{onChange:t,pbArgument:n,onFetchSuggestions:l,suggestions:a,Expression:o}=e,s={...w.C,fetchSuggestions:(e,t)=>{l(e,!1,t)},suggestions:a},m=r.useCallback(e=>{t({...n,value:e})},[n,t]),c=r.useMemo(()=>n.value?.type==="ObjectLiteralExpression"?n.value:{type:"ObjectLiteralExpression",fields:[],typeHint:{tag:S.E.Simple,signature:[],typeLabel:""},validationStatus:[]},[n.value]),d=n.dynamicTypeHint?.signature[0]?.config,p=$.gL.value(d),f=(0,$.$C)(p?.schema?.fields,p?.schemaType||"string"),g=(0,$.i4)(f,c.fields),h=void 0===p||p.editable,y=p?.sourceName??"Outgoing Data",b=p?.sourceIcon??"CommandsSet",E=r.useCallback(e=>{m({...c,fields:(0,$.L7)(c.fields,e)})},[c,m]),v=r.useCallback(e=>{m({...c,fields:c.fields.filter(t=>t.title!==e)})},[c,m]);return p?r.createElement(H,null,r.createElement(u.fI,{gap:48},r.createElement(L,{gap:12},r.createElement(A,null),"Data Source"),r.createElement(L,{gap:12},r.createElement(z,{icon:b}),y)),r.createElement(u.R9,{enabled:g.length>4,columns:!0},r.createElement(u.VP,{"data-testid":"widget-field-composition"},g.map((e,t)=>r.createElement(I.R,{key:`${e.title}  ${t}`,schemaFields:f,editable:!1,field:e,onChange:E,onRemove:v,argContext:s,Expression:o}))),h?r.createElement(k.J,{onAddColumn:e=>m({...c,fields:[...c.fields,e]})}):null),(c.validationStatus?.filter(e=>"internal"!==e.type||"warning"!==e.severity).length??0)>0?r.createElement(u.BQ,{variant:"critical"}," ",JSON.stringify(c.validationStatus)," "):null):r.createElement(i.P,null,"Loading...")}),H=(0,o.Ay)(u.VP)`
  --icon-color: ${a.ydb};
  --icon-size: 16px;
`,A=(0,o.Ay)(e=>r.createElement(u.In,{icon:"CommandsGet",...e}))`
  --size: 20px;
  --color: ${a.t14};
`,z=(0,o.Ay)(u.In)`
  --size: 20px;
  --color: ${a.t14};
`,L=(0,o.Ay)(u.fI)`
  font-size: 16px;
  font-weight: 500;
  color: ${a.CP};
  padding: 8px 0;
  flex: 1;
  font-family: Outfit;
  margin-bottom: 16px;
`},86439:(e,t,n)=>{n.d(t,{M:()=>l});let l=n(14041).createContext({setCoordinates(){}})}}]);
//# debugId=dfab5439-5f02-5f11-9771-27186ab8e1de
