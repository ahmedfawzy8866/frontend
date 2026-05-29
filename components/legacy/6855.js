"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7b298b48-4a99-5d5d-9055-a05cae4cad75")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[6855],{52497:(e,t,i)=>{i.d(t,{Y:()=>o});var n=i(16335),r=i(17453),a=i(41917);n.inexact({_types:n.array(n.string)});class o{static #e=this.typeName=r.j3.Internal;constructor(e,t){Object.defineProperties(this,{_ctxProvider:{enumerable:!1,value:e}}),this._integration=t,this._types=a.X9(this.getTypeDefinition())}getTypeDefinition(){return this.constructor}valueOf(){return this.serialize()}get _ctx(){return this._integration?this._ctxProvider?.getPluginContext(this._integration):void 0}hasPluginContext(){return void 0!==this._ctx}is(e){return a.is(this._types,e)}isExact(e){return a.u0(this._types,e)}hasType(e){return -1!==a.X9(this.getTypeDefinition()).indexOf(e)}getTypeDescription(){return a.OB(this.getTypeDefinition())}static is(e){return a.is(this,e)}static isSupertypeOf(e){return a.is(e,this)}static isSubtypeOf(e){return a.is(this,e)}static isExact(e){return a.u0(this,e)}static deserialize(e,t){return{ok:!1,error:{type:"PayloadError",module:"DType",resourceKind:"interface",payload:e,error:"Cannot instantiate abstract type"}}}static getConfigOptions(){}static getAllowedConfigOptions(e){return[]}static fromSignature(e){return this}}},867:(e,t,i)=>{i.d(t,{gn:()=>x,rV:()=>m});var n=i(2758),r=i(23667),a=i(3460),o=i(84895),l=i(17453),s=i(52497),p=i(41917);let d=r.D.taggedUnion("type",{error:r.D.object({type:r.D.constant("error"),error:a.qf,location:r.D.nullable(r.D.object({bclVarName:r.D.string}))}),success:r.D.object({type:r.D.constant("success"),successMessage:r.D.string,location:r.D.nullable(r.D.object({bclVarName:r.D.string}))})}),c=r.D.object({_types:r.D.arrayStrict(r.D.string),kind:r.D.optional(r.D.integer,0),error:r.D.optional(a.qf),successMessage:r.D.optional(r.D.string)}),u=r.D.object({_types:r.D.arrayStrict(r.D.string),kind:r.D.optional(r.D.integer,0),annotation:r.D.nullable(d)}),g=r.D.either(u,c.transform(e=>({_types:e._types,kind:e.kind,annotation:e.error?{type:"error",error:e.error,location:null}:e.successMessage?{type:"success",successMessage:e.successMessage,location:null}:null})));class x extends s.Y{static #e=this.typeName=l.j3.Nothing;static #t=this.typeDesc="No value";static #i=this.decoder=g;constructor(e,t=null){super(),this.kind=e,this.annotation=t}shouldSkip(){switch(this.kind){case 1:case 2:case 3:return!0;case 0:return!1}}get priority(){switch(this.kind){case 0:if(this.hasError())return 3;if(this.hasSuccessMessage())return 2;return 1;case 2:if(this.hasError())return 6;if(this.hasSuccessMessage())return 5;return 4;case 1:return 7;case 3:return 8;default:return 9}}hasError(){return null!=this.annotation&&"error"===this.annotation.type}hasSuccessMessage(){return null!=this.annotation&&"success"===this.annotation.type}isAnnotationLocationRelated(e){return!!this.annotation&&(null==this.annotation.location||this.annotation.location.bclVarName===e.bclVarName)}withReplacedLocation(e){return null==this.annotation?this:new x(this.kind,{...this.annotation,location:e})}toString(){if(null==this.annotation)return"";switch(this.annotation.type){case"error":return`[Error: ${this.annotation.error.message}]`;case"success":return`[Success: ${this.annotation.successMessage}]`}}valueOf(){return null}toJSON(){return this.serialize()}serialize(){return{_types:this._types,kind:this.kind,annotation:this.annotation}}static deserialize(e){if(null==e)return o.Q.Ok(m);let t=(0,n.D)("DType",p.zt(this.typeName),e,this.decoder);return t.ok?1===t.value._types.length&&t.value._types[0]===l.j3.Nothing?o.Q.Ok(new this(t.value.kind,t.value.annotation)):o.Q.Err({type:"PayloadError",module:"DType",resourceKind:"nothing",payload:t.value,error:"Unexpected facets"}):t}}let m=new x(0);new x(1),new x(3)},93100:(e,t,i)=>{i.d(t,{yG:()=>a});var n=i(16335);let r=[{name:"playbook-support",description:"Run automations created by Bardeen support"},{name:"enterprise",description:"Enterprise-level features (Enterprise only)"},{name:"business",description:"Business-level features (Enrichment & CRM)"},{name:"cloud-triggers",description:"Run autobooks in the cloud"},{name:"disable-branding",description:"Disable branding on demand"},{name:"premium-scraper",description:"Grants access to premium scrapers"},{name:"teams",description:"Allows creating and managing teams"},{name:"enrichment",description:"Enrichment specific features"}].map(e=>e.name);n.array(n.oneOf(r));let a=n.array(n.string).transform(e=>{let t=[];for(let i of e)r.includes(i)&&t.push(i);return t})},12787:(e,t,i)=>{i.d(t,{Uk:()=>n});let n={FREE:{version:2,state:"FREE",meta:{title:"Free"}},STARTER:{version:2,state:"PRO",meta:{title:"Starter"}},TEAMS:{version:2,state:"BUSINESS",meta:{title:"Teams"}},ENTERPRISE:{version:2,state:"ENTERPRISE",meta:{title:"Enterprise"}}}},89387:(e,t,i)=>{i.d(t,{tW:()=>d});var n=i(16335),r=i(59058);let a=n.object({provider:n.constant("obs"),ref:r.g}),o=n.object({provider:n.constant("pb"),id:n.string}),l="synth",s=n.object({provider:n.constant(l),ref:r.g}),p=n.object({provider:n.constant("mem"),id:n.string}),d=n.taggedUnion("provider",{obs:a,pb:o,[l]:s,mem:p})},96637:(e,t,i)=>{i.d(t,{K:()=>n});let n=["all","page","frame","selection","link","editable","image","video","audio","launcher","browser_action","page_action"]},96582:(e,t,i)=>{i.d(t,{Th:()=>n,_L:()=>r,td:()=>a});let n="Disabled by you",r="The autobook was modified",a="Disabled by the user"},21416:(e,t,i)=>{i.d(t,{ER:()=>r,N4:()=>n});let n=[{icon:"IntegrationScraper",description:"Use a scraper template to extract data from websites on the active tab.",commandId:"use_combined_scaper_model_on_active_tab",displayName:"Use a scraper template on the active tab.",pluginAlias:"Scraper",needsPaidFeature:[]},{icon:"IntegrationScraper",description:"Use a scraper template to extract data from websites in the background.",commandId:"use_combined_scaper_model_in_background",displayName:"Use a scraper template in the background.",pluginAlias:"Scraper",needsPaidFeature:[]}],r=[{icon:"IntegrationScraper",description:"Describe what information you need from a website and AI will find and extract it for you.",commandId:"act_using_goal",displayName:"Scrape with a goal on the active tab.",needsPaidFeature:[],pluginAlias:"Scraper"},{icon:"IntegrationScraper",description:"Describe what information you need from a website and AI will find and extract it for you.",commandId:"act_using_goal_in_background",displayName:"Scrape with a goal in the background.",pluginAlias:"Scraper",needsPaidFeature:[]}];[...n,...r]},94303:(e,t,i)=>{i.d(t,{NM:()=>a,_c:()=>s,oN:()=>o,ul:()=>l});var n=i(91159),r=i(99538);function a(e){let t="ObjectOutline",i="Action",r=null;if(!e)return{statementName:i,statementIcon:t,statementComment:r};switch(e.type){case"FunctionCallStatement":{t=e.displayHint?.command.icon||e.displayHint?.plugin.icon||t;let a=(0,n.ZH)(e.displayHint?.command.expressions[0]??"");i=e.commentFlags.keep&&e.comment||a,r=e.comment;break}case"ForStatement":t="LoopOutline",i="Loop",r=e.comment;break;case"IfStatement":t="ConditionalBold",i="Condition",r=e.comment}return{statementIcon:t,statementName:i,statementComment:r}}function o(e){switch(e.type){case"internal":case"deprecated":case"missing":case"unsupported":return e.severity;case"invalid":return e.error.severity;case"disconnected":return"error"}}function l(e){return p(e,"error")}function s(e){return p(e,"warning")}function p(e,t){let i=[],n=null,l=null,s={statementIcon:"ObjectOutline",statementName:"Action",statementComment:null};return(0,r.bZ)(e,{visitStatement:e=>{if(s=a(n=e),l="IfStatement"===e.type?{name:"condition",displayHint:{label:"Condition",description:"The condition to evaluate"}}:"ForStatement"===e.type?{name:"iterator",displayHint:{label:"Value",description:"The value to iterate"}}:null,e.validationStatus&&e.validationStatus.length>0)for(let n of e.validationStatus.filter(e=>"disconnected"!==e.type&&o(e)===t))i.push({statementIndex:e.index,argumentName:null,status:n,...s});return!0},visitFunctionArgument:e=>{if(l=e,e.validationStatus&&e.validationStatus.length>0)for(let r of e.validationStatus.filter(e=>"disconnected"!==e.type&&o(e)===t))i.push({statementIndex:n?.index??-1,argumentName:e.name,argumentLabel:e.displayHint?.label,status:r,...s});return!0},visitExpression:e=>{if("validationStatus"in e&&e.validationStatus&&e.validationStatus.length>0)for(let r of e.validationStatus.filter(e=>"disconnected"!==e.type&&o(e)===t))i.push({statementIndex:n?.index??-1,argumentName:l?.name??null,argumentLabel:l?.displayHint?.label,status:r,...s});return!0}}),i}},99538:(e,t,i)=>{i.d(t,{Co:()=>p,Cw:()=>r,b:()=>a,bZ:()=>o});var n=i(39629);function r(e,t){if(!e)return!0;function i(e,t){return!e||e(t)}if(!i(t.visitExpression,e))return!1;switch(e.type){case"ArrayLiteralExpression":if(!i(t.visitArrayLiteralExpression,e))return!1;for(let i of e.elements)if(!r(i,t))return!1;break;case"BCLFragmentExpression":if(!i(t.visitBCLFragmentExpression,e))return!1;break;case"CastExpression":if(!i(t.visitCastExpression,e)||!r(e.expression,t))return!1;break;case"ConstantValueExpression":if(!i(t.visitConstantValueExpression,e))return!1;break;case"FieldAccessExpression":if(!i(t.visitFieldAccessExpression,e)||!r(e.expression,t))return!1;break;case"MissingExpression":if(!i(t.visitMissingExpression,e))return!1;break;case"ObjectLiteralExpression":if(!i(t.visitObjectLiteralExpression,e))return!1;for(let i of e.fields)if(!r(i.value,t))return!1;break;case"ObjectStorageReferenceExpression":if(!i(t.visitObjectStorageReferenceExpression,e))return!1;break;case"ObjectStorageSearchExpression":if(!i(t.visitObjectStorageSearchExpression,e))return!1;break;case"OperatorExpression":if(!i(t.visitOperatorExpression,e))return!1;for(let i of e.args)if(!r(i,t))return!1;break;case"StringTemplatingExpression":if(!i(t.visitStringTemplatingExpression,e))return!1;for(let i of e.children)if(!r(i,t))return!1;break;case"StringTemplatingTextNode":if(!i(t.visitStringTemplatingTextNode,e))return!1;break;case"StringTemplatingVariableNode":if(!i(t.visitStringTemplatingVariableNode,e)||!r(e.value,t)||e.defaultValue&&!r(e.defaultValue,t))return!1;break;case"StringTemplatingGenerateNode":if(!i(t.visitStringTemplatingGenerateNode,e)||!r(e.prompt,t))return!1;break;case"StringTemplatingInlineFormattingNode":if(!i(t.visitStringTemplatingInlineFormattingNode,e))return!1;for(let i of e.children)if(!r(i,t))return!1;break;case"StringTemplatingBlockFormattingNode":if(!i(t.visitStringTemplatingBlockFormattingNode,e))return!1;for(let i of e.children)if(!r(i,t))return!1;break;case"StringTemplatingEmbedNode":if(!i(t.visitStringTemplatingEmbedNode,e))return!1;break;case"VarRefExpression":if(!i(t.visitVarRefExpression,e))return!1;break;case"FieldRemappingExpression":if(!i(t.visitFieldRemappingExpression,e)||!r(e.expression,t))return!1;break;case"TableColumnReferenceExpression":if(!i(t.visitTableColumnReferenceExpression,e))return!1}return!0}function a(e,t){var i,n,o,l,s,p;if(!e)return!0;if(!(!(i=t.visitStatement)||i(e)))return!1;switch(e.type){case"BlockStatement":if(!(!(n=t.visitBlockStatement)||n(e)))return!1;for(let i of e.children)if(!a(i,t))return!1;break;case"ForStatement":if(!(!(o=t.visitForStatement)||o(e))||!r(e.iterable,t)||!a(e.body,t))return!1;break;case"FunctionCallStatement":if(!(!(l=t.visitFunctionCallStatement)||l(e)))return!1;for(let i of e.args)if(!(!(s=t.visitFunctionArgument)||s(i))||i.value&&!r(i.value,t))return!1;break;case"IfStatement":if(!(!(p=t.visitIfStatement)||p(e))||!r(e.conditionExpr,t)||!a(e.ifTrue,t)||!a(e.ifFalse,t))return!1}return!0}function o(e,t){if(!e)return!0;for(let i of e.args)if(i.value&&!r(i.value,t))return!1;if(e.trigger&&!a(e.trigger,t))return!1;for(let i of e.statements)if(!a(i,t))return!1;return!0}function l(e,t){if(!e)return e;function i(e,t){return e?e(t):t}switch(e.type){case"ArrayLiteralExpression":{let r=e.elements.map(e=>l(e,t)).filter(n.zz);return i(t.transformArrayLiteralExpression,{...e,elements:r})}case"BCLFragmentExpression":return i(t.transformBCLFragmentExpression,e);case"CastExpression":{let n=l(e.expression,t);if(!n)return null;return i(t.transformCastExpression,{...e,expression:n})}case"ConstantValueExpression":return i(t.transformConstantValueExpression,e);case"FieldAccessExpression":{let n=l(e.expression,t);if(!n)return null;return i(t.transformFieldAccessExpression,{...e,expression:n})}case"MissingExpression":return i(t.transformMissingExpression,e);case"ObjectLiteralExpression":{let r=e.fields.map(e=>{let i=l(e.value,t);return i?{...e,value:i}:null}).filter(n.zz);return i(t.transformObjectLiteralExpression,{...e,fields:r})}case"ObjectStorageReferenceExpression":return i(t.transformObjectStorageReferenceExpression,e);case"ObjectStorageSearchExpression":return i(t.transformObjectStorageSearchExpression,e);case"OperatorExpression":{let r=e.args.map(e=>l(e,t)).filter(n.zz);return i(t.transformOperatorExpression,{...e,args:r})}case"StringTemplatingExpression":{let r=e.children.map(e=>(function e(t,i){switch(t.type){case"StringTemplatingVariableNode":{let e=l(t.value,i);if(!e)return null;return{...t,value:e}}case"StringTemplatingGenerateNode":{let e=l(t.prompt,i);if(!e)return null;return{...t,prompt:e}}case"StringTemplatingBlockFormattingNode":{let r=t.children.map(t=>e(t,i)).filter(n.zz);return{...t,children:r}}case"StringTemplatingInlineFormattingNode":{let r=t.children.map(t=>e(t,i)).filter(n.zz);return{...t,children:r}}case"StringTemplatingEmbedNode":case"StringTemplatingTextNode":return t}})(e,t)).filter(n.zz);return i(t.transformStringTemplatingExpression,{...e,children:r})}case"FieldRemappingExpression":{let n=l(e.expression,t);if(!n)return null;return i(t.transformFieldRemappingExpression,{...e,expression:n})}case"VarRefExpression":return i(t.transformVarRefExpression,e);case"TableColumnReferenceExpression":return i(t.transformTableColumnReferenceExpression,e)}}function s(e,t){var i,r,a,o,p,d,c,u;if(!e)return e;switch(e.type){case"BlockStatement":{let a=e.children.map(e=>s(e,t)).filter(n.zz);return i=t.transformBlockStatement,r={...e,children:a},i?i(r):r}case"ForStatement":{let i=l(e.iterable,t);if(!i)return null;let n=s(e.body,t);if(!n)return null;return a=t.transformForStatement,o={...e,iterable:i,body:n},a?a(o):o}case"FunctionCallStatement":{let i=e.args.map(e=>({...e,value:e.value?l(e.value,t):null}));return p=t.transformFunctionCallStatement,d={...e,args:i},p?p(d):d}case"IfStatement":{let i=l(e.conditionExpr,t);if(!i)return null;let n=s(e.ifTrue,t);if(!n)return null;let r=s(e.ifFalse,t);if(!r)return null;return c=t.transformIfStatement,u={...e,conditionExpr:i,ifTrue:n,ifFalse:r},c?c(u):u}}}function p(e,t){return e?{...e,args:e.args.map(e=>({...e,value:e.value?l(e.value,t):null})),trigger:e.trigger?s(e.trigger,t):null,statements:e.statements.flatMap(e=>{let i=s(e,t);return i?[i]:[]})}:null}},42018:(e,t,i)=>{i.d(t,{x_:()=>a});var n=i(39629);let r={tag:i(13489).E.Any,signature:[],typeLabel:"Unknown"};function a(e){var t;let i;if(null!=e.partitionExpr||"BlockStatement"!==e.ifTrue.type||"BlockStatement"!==e.ifFalse.type||0!==e.ifFalse.children.length)return null;let[a]=e.ifTrue.children;if(!a)return null;let o=function e(t){if("OperatorExpression"===t.type)switch(t.op){case"&&":case"||":return function(t,i){let r=t.map(e);return r.some(e=>null===e)?null:{type:"OpCombination",args:r.filter(n.zz),combine:i}}(t.args,t.op);case"!":break;default:return function(e){let[t,i]=e.args,n={id:e.op,arity:e.arity,displayHint:{icon:e.displayHint?.icon??"RadioQuestionOutline",label:e.displayHint?.label??e.op}},a=null;return(e.arity>1&&i&&(a=i),t?.type!=="TableColumnReferenceExpression")?null:{type:"OpField",op:n,value:a,column:t.id,typeHint:e.operatorTypeHint??e.typeHint??r}}(t)}return null}(e.conditionExpr);return o?{condition:o,wrappedStmt:(i=(t=e.conditionExpr).validationStatus,t.validationStatus&&(i=[...t.validationStatus,...a.validationStatus??[]]),{...a,validationStatus:i})}:null}function o(e){switch(e.type){case"OpCombination":if(1===e.args.length){let[t]=e.args;if(t)return o(t)}return function(e){let t=e.args.map(o);return{type:"OperatorExpression",op:e.combine,arity:t.length,args:t}}(e);case"OpField":return function(e){let t=[{type:"TableColumnReferenceExpression",id:e.column}];return e.op.arity>1&&e.value&&t.push(e.value),{type:"OperatorExpression",op:e.op.id,arity:e.op.arity,args:t}}(e);default:Assert.unreachable(e)}}},59998:(e,t,i)=>{i.d(t,{Cq:()=>function e(t){return t.flatMap(t=>{switch(t.group){case"scraper":case"action":return t;case"deepCrawl":case"container":case"fetch":return e(t.operations);default:throw Error("Unknown scraper operation type")}})},LB:()=>o,QR:()=>r,pM:()=>a});var n=i(64831);function r(e){return e.filter(e=>"deepCrawl"!==e.group&&"fetch"!==e.group)}function a(e){return n.z[e].targeted}function o(e){return n.z[e].scraping}},8706:(e,t,i)=>{i.d(t,{At:()=>o,hR:()=>l,pg:()=>s});var n=i(16335),r=i(49830),a=i(15980);let o=n.object({_id:n.string,_integration:n.optional(n.pojo),_types:n.optional(n.array(n.string),["indexable","object","scraper.model"]),_updated:n.optional(n.number),version:n.constant(2),details:n.object({name:n.string,goal:n.optional(n.string),pageImage:n.optional(n.string),faviconUrl:n.optional(n.string),exampleUrls:n.nonEmptyArray(n.string),catalogListed:n.optional(n.boolean),wiqCatalogListed:n.optional(n.boolean),premium:n.nullish(n.boolean,!1)}),settings:n.object({bgRunTab:n.object({type:n.constant("new"),incognito:n.optional(n.boolean,!1),window:n.oneOf(["minimized","behind"])}),cloudEnabled:n.optional(n.boolean,!1),match:n.optional(n.string)}),operations:n.either(n.array(r.dp),a.zG)}),l=n.inexact({_types:n.array(n.string),version:n.constant(2),details:n.inexact({name:n.string,exampleUrls:n.array(n.string),faviconUrl:n.optional(n.string),goal:n.optional(n.string),premium:n.nullish(n.boolean,!1)}),settings:n.inexact({cloudEnabled:n.optional(n.boolean,!1),match:n.optional(n.string),bgRunTab:n.inexact({type:n.constant("new"),incognito:n.optional(n.boolean,!1),window:n.oneOf(["minimized","behind"])})})});function s(e){return l.decode(e).ok}},67331:(e,t,i)=>{i.d(t,{H1:()=>l,H2:()=>s,H3:()=>p,H4:()=>d,H5:()=>c,H6:()=>u,P:()=>g,a:()=>x});var n=i(39716),r=i(69670),a=i(44724);let o=(0,n.AH)`
  font-family: Outfit;
  font-style: normal;
  font-weight: 600;
  text-wrap: balance;
`,l=n.Ay.h1`
  ${o}
  ${e=>e.$color?`color: ${e.$color};`:(0,a.Sp)("color",{light:r.t14,dark:r.wB3,colored:r.ONy})}
  font-size: ${e=>e.$small?"32px":"40px"};
  line-height: ${e=>e.$small?"44px":"54px"};
  letter-spacing: -0.004px;
`,s=n.Ay.h2`
  ${o}
  ${(0,a.Sp)("color",{light:r.t14,dark:r.wB3,colored:r.ONy})}
  font-size: 28px;
  line-height: 40px;
  letter-spacing: -0.003px;
`,p=n.Ay.h3`
  ${o}
  ${e=>e.$color?`color: ${e.$color};`:(0,a.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-size: 22px;
  line-height: 32px;
`,d=n.Ay.h4`
  ${o}
  ${e=>e.$color?`color: ${e.$color};`:(0,a.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-size: 20px;
  line-height: 30px;
`,c=n.Ay.h5`
  ${e=>e.$color?`color: ${e.$color};`:(0,a.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
`,u=n.Ay.h6`
  ${(0,a.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 185.714% */
  letter-spacing: 0.002px;
`,g=n.Ay.p`
  ${e=>e.$color?`color: ${e.$color};`:e.$bold?(0,a.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy}):(0,a.Sp)("color",{light:r.ui$,dark:r.pHq,colored:r.ONy})}
  font-size: ${e=>e.$small?"14px":"16px"};
  line-height: ${e=>e.$small?"26px":"30px"};
  ${e=>e.$bold?"font-weight: 500":""};
  ${e=>e.$ellipsis&&(0,n.AH)`
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`,x=n.Ay.p`
  ${(0,a.Sp)("color",{light:r.ui$,dark:r.pHq,colored:r.ONy})}
  font-family: Inter;
  font-size: ${e=>e.$small?"12px":"14px"};
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.002px;
`;n.Ay.a`
  ${(0,a.Sp)("color",{light:r.CP,dark:r.wB3,colored:r.ONy})}
  &:hover {
    ${(0,a.Sp)("color",{light:r.t14,dark:r.t14,colored:r.wB3})}
  }
  transition: color 0.2s ease-in-out;
  font-family: Inter;
  font-size: ${e=>e.$small?"12px":"14px"};
  font-style: normal;
  font-weight: 600;
  line-height: ${e=>e.$small?"20px":"22px"};
  letter-spacing: 0.002px;
`},44835:(e,t,i)=>{},93510:(e,t,i)=>{i.d(t,{eO:()=>a,oE:()=>o});var n=i(99420),r=i.n(n);function a(e){return async function(t){let{api:i,dispatch:n}=t;n(e({...await i.systemBardeenAccountProfileGet(),timeSaved:await i.getTimeSaved()}))}}function o(e,t){return async function(i){let{api:n,dispatch:a}=i;t&&await n.systemBardeenAccountInvalidateSubscriptionCache();let o=await n.systemBardeenAccountGetSubscriptionInfo();a(e(o.activeSubscription?{...o,plan:o.activeSubscription.planPeriod,endsIn:r()(o.activeSubscription.currentPeriodEnd).fromNow(!0).replace("a ","1 ").replace("an ","1 ").replace(" ","-"),endsAt:r()(o.activeSubscription.currentPeriodEnd).format("L"),canceled:o.activeSubscription.canceled,tierCredits:o.activeSubscription.tierCredits,status:o.activeSubscription.status,enterprise:o.activeSubscription.enterprise}:{...o,endsIn:"",endsAt:"",canceled:!1,tierCredits:0}))}}i(19916),i(63711),i(1254),i(96326),i(50278)},67100:(e,t,i)=>{var n,r=i(69670),a=i(85040);i(14041);var o=i(39716),l=i(14744),s=i(13489),p=i(117),d=i(54538),c=i(88645);i(63711),i(51134);i(21714),i(6717);var u=i(28363);i(96326),i(50278),i(32244),i(43275),i(39306),i(31335),i(74112),i(37089),i(66347),i(50854),i(85170),i(67846);var g=i(80389),x=i(67331);i(28926),o.Ay.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 32px;
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-basis: 50%;
  text-align: center;
  margin-top: 16px;
`,o.Ay.div`
  display: flex;
  padding: 32px 24px;
  flex-direction: column;
  align-items: center;
  flex-basis: 50%;
  text-align: center;
  gap: 16px;
  background: ${r.bCn};
  border-radius: 8px;
`,o.Ay.div`
  border-radius: 50%;
  background: ${r.KxS};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
`,o.Ay.a`
  font-size: 14px;
  line-height: 26px;
  display: inline;
  cursor: pointer;
  color: ${r.t14};
  &:hover {
    color: ${r.g7N};
  }
`,(0,o.Ay)(x.H3)`
  color: ${r.t14};
`,o.Ay.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: space-around;
`,o.Ay.a`
  color: ${r.ui$};
  text-decoration: underline;
  font-size: 12px;
  line-height: 26px;
`,i(33663),i(59750),i(63400),i(37345);var m=i(27461);i(45393);let f={beach:r.FbJ,plum:r.KxS,strawberry:r.Is2};o.Ay.div`
  display: flex;
  padding-inline: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: 6px solid rgba(0, 0, 0, 0.03);
  background: rgba(255, 255, 255, 0.64);
  ${x.P} {
    font-weight: 500;
    line-height: 32px; /* 228.571% */
  }
`,(0,o.Ay)(x.H4)`
  text-align: center;
`,(0,o.Ay)(m.VP)`
  gap: 24px;
  padding: 32px;
  border-radius: 12px;
  border: ${e=>{let{$variant:t}=e;return"plum"===t?`2px solid ${r.wB3}`:`1px solid ${r.MfC}`}};
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: ${e=>{let{$variant:t}=e;return f[t]}};

  ${x.H1} {
    line-height: 40px;
  }
`,o.Ay.span`
  line-height: 20px;
`,o.Ay.div`
  padding: 16px 24px;
  border-radius: 12px;
  border-radius: 8px;
  border: 1px solid ${r.MfC};
  background: ${r.hi1};
  align-self: stretch;
`,i(9014),i(47856),i(48143),i(61994),(0,a.A)(()=>({root:{width:"100%",height:"100%",display:"flex",flexDirection:"column"},close:{position:"absolute",top:18,right:18},top:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:20,flexBasis:"50%",background:r.KxS},bottom:{display:"flex",paddingTop:40,flexDirection:"column",alignItems:"center",flexBasis:"50%",textAlign:"center",gap:40},bottomText:{fontWeight:500,fontSize:14,lineHeight:"26px",color:r.ui$,"& .link":{color:r.t14,cursor:"pointer"},"& .link:hover":{color:r.g7N}}})),i(42014),i(13314),i(57972),i(24114),i(84296),i(43144),i(58756),i(20285),i(2289),i(32005),i(8869),i(77147),i(28108),i(5855),i(82602);var y=i(43682);i(39907),o.Ay.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  align-items: center;
  backdrop-filter: "blur(3px)";
  background-color: ${r.Ql9}a0;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  opacity: ${e=>e.$fadeOut?0:1};
  transition: all 0.3s;
`,o.Ay.span`
  transition: all 0.24s ease-in;
  opacity: ${e=>e.$active?1:0};
  &:not(:first-child) {
    position: absolute;
    left: 0;
  }
`,o.Ay.span`
  font-size: 18px;
  margin: 0 12px 0 0;
  position: relative;
`,(0,o.Ay)(y.o)`
  padding: 0px 16px;
`;var h=i(93510);i(11880),i(1970);var b=i(19431);(0,o.Ay)(m.VP)`
  background: rgba(0, 0, 0, 0.64);
  color: white;
  inset: 0;
  position: fixed;
`,i(13586);var v=i(89486);!function(e){e.isPreparing=e=>e?.type==="preparing",e.isRunning=e=>e?.type==="running",e.isDone=e=>e?.type==="done"}(n||(n={})),l.ok(b.$.initialState),l.ok(u.ue),c.j,u.ue,g.$h,b.$.initialState,d.ue,v.ue,h.eO(e=>({type:"App/ProfileFetched",profile:e})),h.oE(e=>({type:"App/SubscriptionFetched",subscription:e})),o.Ay.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: ${r.Tc2};
  color: ${r.vh3};
  padding: 0.5rem;
  font-size: 0.8rem;
  animation: ${e=>e.theme.fadeOut} 1.5s ease-in-out forwards;
`,(0,a.A)({"@global":{html:{height:"100%"},body:{height:"100%",padding:"0 !important"},"#root":{height:"100%"},hr:{border:0,borderTop:`1px solid ${r.Tc2}`,margin:0}},appWrapper:{display:"grid",height:"100%",minHeight:"100vh",padding:32,width:"100%","&.busy *":{cursor:"wait !important"}},windowStyle:{position:"fixed",left:0,top:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.45)"}});(0,p.zy)(e=>({type:"BuilderV2Action",action:e})),s.E.Any},11880:(e,t,i)=>{i(117)},13586:(e,t,i)=>{i(14041),i(37217).I.getLogger("PluginModules")},32005:(e,t,i)=>{},89486:(e,t,i)=>{i.d(t,{ue:()=>n.u});var n=i(87023);i(94949)},63400:(e,t,i)=>{},57972:(e,t,i)=>{i(45742),i(19431)},24114:(e,t,i)=>{var n=i(85040);i(14041);var r=i(39716);i(48143);var a=i(39907);r.Ay.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: grid;
`,r.Ay.div`
  align-self: center;
  animation: ${e=>{let{$noAnimation:t=a.env.CHROMATIC||!1}=e;return t?"":"appFadeIn 250ms"}};
  display: grid;
  height: 100%;
  justify-self: center;
  max-height: ${e=>{let{$prefersFullHeight:t}=e;return t?"auto":"900px"}};
  max-width: 1440px;
  min-width: 600px;
  position: sticky;
  transition: max-width 250ms;
  width: 100%;
  &.fullscreen {
    max-height: 100%;
    max-width: 100%;
  }
`,(0,n.A)({"@global @keyframes appFadeIn":{"0%":{top:0,opacity:0,transform:"scale(1)"},"1%":{top:20,opacity:0,transform:"scale(0.9)"},"100%":{top:0,opacity:1,transform:"scale(1)"}}})},8869:(e,t,i)=>{i(1970)},36674:(e,t,i)=>{i(14041);var n=i(39716);i(28926),i(82602),n.Ay.div`
  font-size: 16px;
  line-height: 1.8;
`},37504:(e,t,i)=>{i(14041),i(28926)},87268:(e,t,i)=>{i(14041)},82602:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(98380),i(28926),r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${n.ONy};
  position: fixed;
  inset: 0;

  .mt-12 {
    margin-top: 12px;
  }

  .font-bold {
    font-weight: 600;
  }
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  text-align: center;
  padding: 48px 64px;
  border-radius: 6px;
  background: #00000096;
  gap: 12px;
`},4974:(e,t,i)=>{var n=i(36213);class r extends n.F_{static #e=this.nameTemplate="App:ContainerApiError";static #t=this.is=e=>n.F_.is(e,r.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,r.nameTemplate);constructor(e){super(r.nameTemplate,"Unhandled API error",e)}}class a extends n.F_{static #e=this.nameTemplate="App:ContainerReduceError";static #t=this.is=e=>n.F_.is(e,a.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,a.nameTemplate);constructor(e){super(a.nameTemplate,"Reducing actions failed",e)}}},2822:(e,t,i)=>{i(38792),i(14041),i(19916);var n=i(74452);i(67100),i(117),i(11778),i(88645),i(75162),i(28363),i(96326),i(45742),i(13314),i(87268),i(4974),i(19431),i(89486),i(13586);let{MC:r,sR:a}=n},32244:(e,t,i)=>{var n=i(69670);i(88098);var r=i(14041),a=i(39716);i(117),i(64739),i(32021),i(15109);var o=i(24679);i(46354),i(67139),i(74948),i(29859),i(58756),i(50278);var l=i(48143);i(51134);var s=i(28926);a.Ay.form`
  display: flex;
  flex-direction: column;
  background-color: ${n.NEG};
  border-radius: 100px;
  bottom: 64px;
  margin: auto auto 0 auto;
  max-width: 500px;
  padding: 4px 8px;
  position: sticky;
  width: 100%;
`,(0,a.Ay)(s.dN.Ghost)`
  color: ${n.ONy};
  flex: 1;
  input {
    caret-color: ${n.ONy};
    color: ${n.ONy};
  }
  ${s.kc} {
    --icon-color: ${n.MfC};
    color: transparent;
    background-color: ${n.CP};
  }
`,a.Ay.div`
  font-weight: 500;
  font-size: 16px;
  max-width: ${e=>e.$visible?"280px":0};
  margin-left: ${e=>e.$visible?0:"-20px"};
  opacity: ${e=>e.$visible?1:0};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
`,i(19010);var p=i(96582),d=i(30393);a.Ay.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,a.Ay.div`
  padding: 8px;
  display: flex;
  gap: 12px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,a.Ay.div`
  color: ${n.ui$};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.25px;
`,a.Ay.div`
  color: ${n.vh3};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
  letter-spacing: 0.25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`,(0,a.Ay)(s.BQ)`
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
`,i(59750);let{LeftContent:c,MainContent:u,RightContent:g,Title:x,Subtitle:m}=d.K;a.Ay.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
`,a.Ay.div`
  @media (max-width: 984px) {
    display: none;
  }
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.2s ease-in-out;
  @media screen and (max-width: 1200px) {
    gap: 12px;
  }
`,(0,a.Ay)(s.z9)`
  border: none;
  box-shadow: none;
  border-radius: 100%;
  width: auto;
  height: auto;
`,p.Th,p.td,p._L,(0,a.Ay)(s.BQ)``,a.Ay.div`
  padding: 8px 12px;
  background: inherit;
  border-radius: 0 0 8px 8px;
`;var f=i(67331);i(60227),i(40282),i.p,i.p;var y=i(23);a.Ay.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`,(0,a.Ay)(f.H3)`
  text-align: center;
`,a.Ay.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  color: ${n.wmS};
  flex-grow: 1;
`,a.Ay.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  @media screen and (min-width: 884px) {
    flex-wrap: nowrap;
  }
`,(0,a.Ay)(y.h)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.24s ease-in-out;
  flex: 1;

  align-items: center;
`,a.Ay.div`
  padding: 8px;
`;var h=i(78126);(0,a.Ay)(s.VP)`
  height: 100%;
  max-width: 660px;
  margin: auto;
`,(0,a.Ay)(h.f)`
  overflow-y: ${e=>{let{$overflow:t}=e;return t?"hidden":"auto"}};
`;let b=(0,a.Ay)(s.$n).attrs({variant:"flat",round:!0})`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.24s ease-in-out;
`;(0,a.Ay)(r.memo(function(e){let t=(0,l.rD)(),i=t.teamConfig?.isAdmin,n=(0,l.jL)(),{folder:a,dropDisabled:p,page:d,children:c,foldersToMove:u,...g}=e,x=i||a.owner===t.profile?.uuid;return r.createElement(o.g,{id:a.id,key:a.id,disabled:p,style:{outlineOffset:0}},r.createElement("div",g,c,x&&r.createElement(s.ms,{renderContent:e=>{let{}=e;return r.createElement(r.Fragment,null,r.createElement(s.IU,{onClick:()=>n({type:"ModalsAction",action:{type:"Modal/FolderRenameShown",folderId:a.id,currentName:a.display.name,automationsView:d}})},"Rename"),r.createElement(s.IU,{onClick:()=>n({type:"ModalsAction",action:{type:"Modal/FolderDeleteShown",folderId:a.id,moveToFolderId:null,foldersToMove:u,automationsView:d,strategy:i?"delete":"move"}})},"Delete"))}},r.createElement(b,{icon:"OverflowVerticalOutline",tooltipText:"Folder options"}))))}))`
  position: relative;
  &:hover ${b} {
    opacity: 1;
  }
`,(0,a.Ay)(s.$n)`
  --icon-color: ${n.wmS};
  &:hover {
    --icon-color: ${n.wmS};
  }
`},39306:(e,t,i)=>{i.d(t,{ue:()=>b});var n=i(69670),r=i(14041),a=i(39716);i(32021);var o=i(1254);i(59750),i(93510);var l=i(28926);i(85170),i(78126);var s=i(67331);(0,a.Ay)(s.P)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${n.vh3};
  flex: 1;
`,i(43275),i(86920),i(50278),i(1265),i(8432),i(48603);let{Title:p,LeftContent:d,Subtitle:c,MainContent:u,RightContent:g}=i(30393).K;(0,a.Ay)(l.In)`
  opacity: 1;
  transition: all 0.24s ease-in-out;
`;let x=(0,a.AH)`
  transition: opacity 0.24s ease-in-out;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`,m=(0,a.Ay)(l.$n).attrs({variant:"flat",size:"m",round:!0})`
  ${x}
  opacity: 0;
`,f=(0,a.Ay)(l.y$).attrs({size:"m"})`
  ${x}
`;(0,a.Ay)(d)`
  position: relative;
  &:hover {
    ${m} {
      opacity: 1;
    }
    ${f} {
      opacity: 0;
    }
  }
`,a.Ay.div`
  display: flex;
  padding: 24px 32px;
  align-items: center;
  width: 100%;
  justify-content: stretch;
  gap: 32px;
  color: ${n.t14};
  background-color: ${n.KxS};
  border-radius: 12px;
  text-align: center;
`,(0,a.Ay)(s.H1).attrs({$small:!0,$color:n.t14})`
  line-height: 32px;
`;let y=+Date.now(),h={"Last 30 days":y-2592e6,"Last 6 months":y-15552e6,"Last 12 months":y-31536e6,Overall:0},b=e=>({isLoading:!0,isLoadingMore:!1,records:[],recordDetails:{},summary:{totalRuns:0,totalTimeSaved:0,totalMicrocredits:0},params:{query:"",period:"Overall",filter:null,page:0,perPage:o.I,user:e?{type:"user",id:e}:{type:"team",folderId:":team"},playbook:null}}),v=a.Ay.div`
  position: absolute;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  right: 1px;
  top: 1px;
  background-color: ${n.zIe};
`;(0,a.Ay)(e=>{let{children:t,...i}=e;return r.createElement("div",i,r.createElement(v,null),t)})`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  ${v} {
    display: ${e=>{let{active:t}=e;return t?"block":"none"}};
  }
`,(0,a.Ay)(l.VP)`
  padding: 32px 32px;
  background: ${n.KxS};
  border: 1px solid ${n.Q_2};
  border-radius: 12px;
  gap: 32px;
  position: relative;
  align-items: center;
  width: 100%;
`},43275:(e,t,i)=>{},68919:(e,t,i)=>{i(14041),i(48143),i(53747),i(28926);let{Title:n,LeftContent:r,Subtitle:a,MainContent:o,RightContent:l}=i(30393).K},86477:(e,t,i)=>{i.d(t,{u:()=>l});var n=i(69670);i(14041);var r=i(39716);i(32021),i(67139),i(48143);var a=i(28926);i(30393);var o=i(78126);(0,r.Ay)(a.VP)`
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 24px;
`,r.Ay.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #666;
`,i(68919),(0,r.Ay)(o.f)`
  .innerContent {
    padding: 24px;
  }
`,r.Ay.hr`
  border: none;
  border-bottom: ${n.Tc2} 1px solid;
  margin: 0;
`;let l={personal:[],catalog:null,catalogLastFetchedAt:0,loading:!1,query:"",view:"my-templates",site:""};r.Ay.div`
  color: ${n.vh3};
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.1px;
`},60227:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(28926),r.Ay.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
`;let a=r.Ay.div`
  transition: all 0.24s ease-in-out;
  background: linear-gradient(180deg, ${n.ONy} 0%, ${n.hi1} 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
`;(0,r.Ay)(a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;

  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      transform: scale(1.15);
    `}}
`,r.Ay.div`
  position: absolute;
  bottom: 0;
  width: 80px;
  height: 10px;
  flex-shrink: 0;
  background: radial-gradient(50% 50% at 50% 50%, ${n.l0o} 0%, rgba(222, 225, 230, 0) 100%);
  opacity: 0.24;
`;let o=r.Ay.div`
  color: ${n.ONy};
  transition: all 0.24s ease-in-out;
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 24px;
  height: 24px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  opacity: 0;
`;(0,r.Ay)(o)`
  background: linear-gradient(180deg, ${n.CqR} 0%, ${n.iTR} 100%);
  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      transform: translateX(-68px);
      opacity: 1;
    `}}

  &:after {
    position: absolute;
    right: -100%;
    width: 100%;
    height: 1px;
    background-color: ${n.MfC};
    content: "";
  }
`,(0,r.Ay)(o)`
  background: linear-gradient(180deg, ${n.wB3} 0%, ${n.t14} 100%);

  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      transform: translateX(44px);
      opacity: 1;
    `}}
  &:before {
    position: absolute;
    left: -100%;
    width: 100%;
    height: 1px;
    background-color: ${n.MfC};
    content: "";
  }
`},40282:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i.p,i(48143);var a=i(28926);r.Ay.div`
  padding: 32px 32px;
  background: ${n.KxS};
  border: 1px solid ${n.Q_2};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  position: relative;
  align-items: center;
  width: 100%;
`,(0,r.Ay)(a.Jn)`
  position: absolute;
  top: 16px;
  right: 16px;
`},64739:(e,t,i)=>{i(88098),i(14041);var n=i(39716);i(48143),n.Ay.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.3s ease;
  ${e=>{let{$isDragging:t}=e;return t?(0,n.AH)`
          filter: blur(2px);
          opacity: 0.7;
        `:""}}
`},35549:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(48143);var a=i(28926);i(4241),i(72352),r.Ay.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;

  width: 24px;
  height: 10px;

  padding: 2px;
  border-radius: 80px;
  border: 1px solid ${n.wdA};
`,r.Ay.div`
  width: ${e=>{let{$percent:t}=e;return`${t}%`}};
  background-color: ${e=>{let{$percent:t}=e;return t<=25?n.KE7:n.TJO}};
  border-radius: 100px;
  height: 100%;
`,r.Ay.div`
  padding: 0 4px;
`,r.Ay.hr`
  border: 0;
  border-top: 1px solid ${n.Tc2};
  margin: 8px 0;
`,(0,r.Ay)(a.BQ)`
  margin-top: 24px;
`,r.Ay.div`
  padding: 20px 24px 32px 24px;
  margin-top: -10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`},15109:(e,t,i)=>{i(88098),i(14041);var n=i(39716);n.Ay.div`
  position: absolute;
  inset: 0;
  opacity: 0.9;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  transform: 1;
  transition: 0.3s ease all;
  cursor: move;

  ${e=>{let{$isActive:t}=e;return t&&"transform: scale(0.8);"}}
`,n.Ay.div`
  pointer-events: none;
`},50695:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716),a=i(28926);r.Ay.a`
  transition: all 0.24s ease-in-out;
  font-weight: 600;
  color: ${n.wmS};
  &:hover {
    color: ${n.t14};
  }
`,(0,r.Ay)(a.In)`
  :hover {
    --icon-color: 1.2;
  }
`},40364:(e,t,i)=>{var n=i(69670),r=i(78445),a=i(54357),o=i(14041),l=i(39716),s=i(99834);i(117),i(48143),i(28926);var p=i(72352);i(35549),l.Ay.div`
  cursor: pointer;
  width: 100%;
  border-radius: 8px;

  &:hover {
    color: ${n.t14};
    background: ${n.KxS};
  }
`,l.Ay.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`,l.Ay.div`
  border-top: 1px solid ${n.Q_2};
  margin-inline: 16px;
`,l.Ay.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`,l.Ay.div`
  background: ${n.ONy};
  flex: 0 0 64px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }

  &:after {
    content: "";
    border-right: 1px solid ${n.Tc2};
    width: 1px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }

  & > * {
    flex: 0 0 64px;
    position: relative;
    &:not(:last-child):not(.nodivider):before {
      content: "";
      position: absolute;
      bottom: -1px;
      height: 1px;
      width: 100%;
      z-index: 1;
      background: ${n.Tc2};
    }
  }
`,(0,l.Ay)(e=>{let{active:t,text:i,icon:n,dotColor:l,noDivider:s,...d}=e;return o.createElement(r.m,{placement:"right",content:i},o.createElement("button",{"aria-label":i,...d,"aria-selected":!!t||void 0,className:(0,a.A)(d.className,s&&"nodivider")},n,l&&o.createElement(p.g,{$color:l,style:{position:"absolute",top:10,right:10}})))})`
  --transition: 0.24s ease-out;
  width: 100%;
  display: flex;
  border: 0;
  align-items: center;
  justify-content: center;
  appearance: none;
  outline: none;
  background: none;
  transition: all 0.2s ease-out;
  font-size: 20px;
  color: ${n.iTR};
  position: relative;

  &[disabled] {
    color: ${n.iTR}3D;
  }

  &:after {
    content: "";
    position: absolute;
    right: 0;
    height: 20%;
    width: 1px;
    transition: all var(--transition);
    z-index: 1;
  }

  svg {
    transition: all var(--transition);
  }

  &:not(:disabled) {
    &:hover svg {
      transform: scale(${26/24});
    }

    &:hover,
    &:focus-visible,
    &:focus {
      background-color: ${n.KxS}7A;
      color: ${n.b_I};
      &:after {
        background: ${n.NcT};
        height: 100%;
      }
    }

    &[aria-selected="true"],
    &:active {
      color: ${n.b_I};
      background-color: ${n.KxS};
      &:after {
        background: ${n.b_I};
        height: 100%;
      }
    }
  }
`,(0,l.Ay)(s.X)`
  path:first-child {
    fill: ${n.Kqb};
  }
`,l.Ay.div`
  display: flex;
  flex-direction: column;
  max-height: 628px;
  overflow-y: auto;
`},46354:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(48143);var a=i(28926);i.p,i.p,i.p,i.p,i.p,i.p,i.p,r.Ay.div`
  width: 48px;
  height: 48px;
  position: relative;
`,r.Ay.div`
  position: absolute;
  inset: 4px;
  transition: all 0.3s ease;

  ${e=>{let{$active:t}=e;return t&&"transform: translateY(4px);"}}
`,r.Ay.img`
  position: absolute;
  inset: 0;
`,r.Ay.img`
  position: absolute;
  inset: 0;
`,r.Ay.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`,r.Ay.div`
  position: absolute;
  left: 12px;
  bottom: 9px;
  width: 16px;
  height: 16px;
`,r.Ay.div`
  position: absolute;
  inset: 4px;
`,r.Ay.svg`
  stop {
    transition: 0.4s ease;
  }
`,r.Ay.img`
  width: 32px;
  height: 32px;
  left: 4px;
  bottom: 0;
  transition: all 0.3s ease;
  position: absolute;

  ${e=>{let{$active:t}=e;return t&&"bottom: 16px;"}}
`;let o=r.Ay.img`
  position: absolute;
  transition: all 0.3s ease;
  opacity: 0;
  width: 8px;
  height: 8px;

  ${e=>{let{$active:t}=e;return t&&"opacity: 1;"}}
`;(0,r.Ay)(o)`
  top: 40px;
  left: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      top: 44px;
      left: -8px;
    `}}
`,(0,r.Ay)(o)`
  translate: rotate(45deg);
  left: 18.34px;
  bottom: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      bottom: -12px;
    `}}
`,(0,r.Ay)(o)`
  top: 40px;
  right: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,r.AH)`
      top: 44px;
      right: -8px;
    `}}
`,(0,r.Ay)(a.h$)`
  padding: 24px 20px;
`,r.Ay.div`
  display: flex;
  justify-content: center;
`,r.Ay.h4`
  color: ${n.t14};
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.25px;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
`,r.Ay.p`
  color: ${n.ui$};
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`},67139:(e,t,i)=>{var n=i(69670),r=i(14041),a=i(39716),o=i(28926);let l=(0,a.Ay)(o.VP)`
  flex: 0 0 280px;
  padding: 24px 20px;
  margin: 24px 0 24px 24px;
  gap: 20px;
  background-color: ${n.ONy};
  border: 1px solid ${n.Tc2};
  border-radius: 12px;
  overflow-y: auto;
`,s=a.Ay.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-right: auto;
`;Object.assign(l,{Heading:(0,a.Ay)(e=>{let{title:t,...i}=e;return r.createElement("div",i,r.createElement(s,null,e.title),e.children)})`
    width: 100%;
    padding: 0px 0 4px 16px;
    color: ${n.CP};
    font-size: 14px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.1px;
    display: flex;
    flex-direction: row;
    word-break: break-word;
  `})},74948:(e,t,i)=>{i(14041);var n=i(39716);i(48143);var r=i(28926);n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`,r.In,r.In},29859:(e,t,i)=>{i(14041),i(117),i(48143),i(28926)},10777:(e,t,i)=>{i.d(t,{sx:()=>n.s}),i(78406),i(60227),i(40282),i(64739),i(32021),i(35549);var n=i(13159);i(15109),i(24679),i(50695),i(40364),i(46354),i(74948),i(29859)},1254:(e,t,i)=>{i.d(t,{I:()=>n});let n=10},50278:(e,t,i)=>{new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})},28363:(e,t,i)=>{i.d(t,{ue:()=>l}),i(14041),i(117),i(48143),i(93510),i(28926);var n=i(69670);(0,i(85040).A)(e=>({selectRoot:{display:"block",position:"initial"},body:{position:"relative",width:"420px"},actions:{"&:focus-within":{backgroundColor:"#F8F8FD",borderRadius:e.spacing(1),opacity:"1","& button":{pointerEvents:"initial"}},"& button":{"&:first-of-type":{"&:hover, &:focus":{backgroundColor:n.g7N,borderColor:"initial"},backgroundColor:n.t14,color:"#FFF"},"&:not(:first-of-type)":{"&:hover, &:focus":{backgroundColor:n.t14,color:"#FFF"},borderColor:n.Q_2,color:n.t14},pointerEvents:"none"},left:"0",display:"flex",gap:e.spacing(2),justifyContent:"center",alignItems:"center",position:"absolute",width:"100%",height:"100%",opacity:"0",transition:"opacity 0.5s"},listWrapper:{"& .searchGroup":{height:"100%",overflow:"auto",maxHeight:"260px"},"& .actionItem":{"&:hover":{borderRadius:e.spacing(1),color:n.t14,backgroundColor:"#F8F8FD","& .actionItemActions":{display:"flex"}},"& .actionItemIcon":{marginInlineEnd:e.spacing(4)},"& .actionItemActions":{display:"none",gap:e.spacing(2),marginLeft:2,"& button":{width:28,height:28,display:"flex",justifyContent:"center",alignItems:"center"}},"& span":{fontWeight:"500",lineHeight:"20px",overflow:"hidden",textOverflow:"ellipsis"},padding:e.spacing(3,4),fontSize:"1em",color:n.ui$},"& .headerItem":{"& > label":{color:n.NEG,fontSize:"1em",fontWeight:"600",lineHeight:"20px"},"&:not(:first-of-type)":{paddingTop:"20px",marginTop:e.spacing(2),borderTop:"1px solid",borderTopColor:n.Tc2},padding:e.spacing(3,4),fontSize:"1em",lineHeight:"20px"},"& .searchItem":{display:"flex",alignItems:"center",borderBottom:"1px solid",marginBottom:e.spacing(2),borderBottomColor:n.Tc2,paddingTop:0},maxHeight:"474px",overflow:"auto",marginInlineEnd:e.spacing(-2),paddingInlineEnd:e.spacing(2),margin:"0",padding:"0"}}));var r=i(39716);i(50695),i(40364),i(32244);var a=i(39306),o=i(86477);r.Ay.div`
  position: relative;
  display: flex;
  height: 100%;
`,i(43275),i(78126);let l={resultsHighlighted:!1,explorerPageSelected:"personal",explorerHighlightedPb:null,automationsQuery:"",panelId:null,panelMenuItems:[],panelMenuItemsLoading:!1,panels:[],showResultsOnboarding:!1,notificationsMenuIsOpen:!1,resultsState:a.ue(),createFolderState:null,scraperTemplates:o.u,automationsFolders:{personal:[],team:[]},automationsSelectedFolderId:null}},78126:(e,t,i)=>{i.d(t,{f:()=>l});var n=i(69670),r=i(85040),a=i(14041),o=i(39716);(0,r.A)(e=>({container:{display:"flex",flex:1,pointerEvents:"initial",position:"relative",transition:"max-width 300ms",width:"100%"},appWindow:{background:n.ONy,backgroundClip:"padding-box",border:"1px solid rgba(0, 0, 0, 0.02)",borderRadius:12,boxShadow:"0px 8px 24px rgba(0, 0, 0, 0.02)",flex:1,overflow:"hidden",position:"relative"},filterBar:{height:56,background:n.ONy,display:"flex",alignItems:"center",position:"relative"},tooltipAction:{display:"none"},tooltipActionText:{fontSize:14,lineHeight:"24px",fontWeight:500},playbookList:{marginTop:e.spacing(4)}}));let l=(0,o.Ay)(e=>{let{children:t,bar:i,leftBar:n,...r}=e;return a.createElement("div",r,i,a.createElement("div",{className:"layout"},n,a.createElement("div",{className:"content"},a.createElement("div",{className:"innerContent"},t))))})`
  position: relative;
  flex-grow: 1;
  background-color: ${n.o$k};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  container-type: inline-size;
  min-height: 100%;

  .layout {
    display: flex;
    max-width: 100%;
    overflow: ${e=>{let{$scrollHeader:t}=e;return t?"visible":"hidden"}};
    flex-grow: 1;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: ${e=>{let{$scrollHeader:t}=e;return t?"visible":"auto"}};
  }

  .innerContent {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 0 auto;

    max-width: ${e=>{let{$maxWidth:t}=e;return(t||984)+96}}px;
    padding: 24px;
    width: 100%;
    gap: ${e=>{let{$gap:t}=e;return t??64}}px;
    animation: ${e=>e.theme.fadeIn} 0.24s ease-out;

    & > :first-child {
      margin-top: ${e=>{let{$marginTop:t}=e;return t}}px;
    }
  }
`},86244:(e,t,i)=>{i.d(t,{Component:()=>n.A});var n=i(51354);i(19029),i(85999)},85999:(e,t,i)=>{i(99420);var n=i(37217);i(19029),n.I.getLogger("OpenAiComponents")},19029:(e,t,i)=>{i.d(t,{SV:()=>n});let n="basic-info"},70144:(e,t,i)=>{i.d(t,{f7:()=>s,k5:()=>d});var n=i(67331),r=i(69670),a=i(14041),o=i(39716),l=i(28926);let s={text:"TexturedParagraph",analysis:"TexturedCustom",compare:"TexturedCompare",notes:"TexturedNotes",qna:"TexturedQA",table:"TexturedTable"},p={text:"Text",analysis:"Analysis",compare:"Compare",notes:"Notes",qna:"Q & A",table:"Table"},d=e=>{let{type:t,...i}=e;return a.createElement(u,i,a.createElement(l.In,{icon:s[t],size:32}),a.createElement(n.P,{$small:!0},p[t]),a.createElement(c,{icon:"RadioCrossBold",size:16}))},c=(0,o.Ay)(l.In)`
  position: absolute;
  top: 6px;
  right: 6px;
  transform: rotate(45deg);
  opacity: 0;
  transition: all 0.24s ease-in-out;
  --icon-color: ${r.b_I};
`,u=o.Ay.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 14px;
  padding-top: 32px;
  padding-bottom: 28px;
  outline: 2px solid transparent;
  transition: all 0.24s ease-in-out;
  border: none;
  border-radius: 8px;
  background: ${r.ONy};
  ${n.P} {
    color: ${r.ui$};
    text-transform: capitalize;
  }
  &:hover {
    --icon-scale: 1.1;
    outline-color: ${r.NcT};
    ${c} {
      opacity: 1;
    }

    ${n.P} {
      color: ${r.t14};
    }
  }
`},72661:(e,t,i)=>{i.d(t,{KX:()=>m});var n=i(67331),r=i(69670);i(87046);var a=i(14041),o=i(39716),l=i(58756),s=i(5855),p=i(28926),d=i(66257),c=i(53433),u=i(70144),g=i(39641),x=i(8142);let m=e=>{let{state:t,dispatch:i,onSave:o,onBack:m,onCancel:w,allowedTypes:k}=e,{documentRoot:E}=a.useContext(l.o),S=(0,a.useCallback)(e=>{let n=e===t.sections.length-1;return{onEdit:()=>{i({type:"ClickedEditSection",index:e})},onDelete:()=>{i({type:"ClickedRemoveSection",confirmed:!1,index:e})},onUp:0===e?void 0:()=>{i({type:"ClickedMoveSectionUp",index:e})},onDown:n?void 0:()=>{i({type:"ClickedMoveSectionDown",index:e})}}},[t.sections.length,i]),C=e=>{i({type:"ReorderSections",sections:e})},T=e=>()=>{let t=E.querySelector(`#template-editor-main-tem-${e}`);t&&t.scrollIntoView({block:"start",inline:"nearest",behavior:"smooth"})};return a.createElement(a.Fragment,null,t.editingSection&&null!==t.editingSectionIndex?a.createElement(c.x,{section:t.editingSection,dispatch:i}):a.createElement(g.h,{menuWidth:"300px",menu:a.createElement($,{"data-testid":"writing-assistant-editor-sidebar"},a.createElement(p.tU,{tabs:["Content","Add"],active:t.tab,style:{paddingInlineStart:16},renderTab:e=>a.createElement(p.fI,{gap:8,style:{alignItems:"center"}},"Add"===e&&a.createElement(p.In,{icon:"PlusOutline",size:16}),e),onTabClick:e=>i({type:"ChangedTab",tab:e})}),"Content"===t.tab?a.createElement(y,{gap:8},a.createElement(d.q6,{items:t.sections,onItemsReorder:C},t.sections.map((e,t)=>a.createElement(d.Uq,{id:e.id,key:e.id},a.createElement(x.x,{onClick:T(t),sectionTitle:e.sectionTitle,"aria-label":e.sectionTitle,type:e.sectionType,index:t,...S(t)})))),a.createElement(p.IU,{onClick:()=>{i({type:"ChangedTab",tab:"Add"})},style:{justifyContent:"center"}},a.createElement(p.fI,{gap:4,style:{alignItems:"center"}},a.createElement(p.In,{icon:"PlusOutline",size:16}),a.createElement("span",null,"Add")))):a.createElement(v,null,k.map(e=>a.createElement(u.k5,{key:e,type:e,onClick:()=>{i({type:"ClickedAddNewSection",addedType:e})}}))))},a.createElement(g.h.RightSide,null,a.createElement(g.h.ContentHeader,{onBack:m},a.createElement(p.fI,{center:!0,gap:8},a.createElement(p.$n,{text:"Save template",onClick:o,size:"l",round:!0,variant:"primary",disabled:t.sections.length<1}),a.createElement(p.$n,{icon:"CrossOutline",tooltipText:"Close",round:!0,size:"l",variant:"flat",onClick:w}))),a.createElement(f,null,a.createElement(d.q6,{items:t.sections,onItemsReorder:C},a.createElement(b,null,a.createElement(n.H1,null,"Create your template"),a.createElement(n.P,{style:{marginBottom:16,color:r.ui$}},"You can modify, remove, rearrange and add new sections from the left side bar to customize your report template."),a.createElement(h,null,t.sections.map((e,t)=>a.createElement(d.Uq,{id:e.id,key:e.id},a.createElement(x.C,{"aria-label":e.sectionTitle,sectionTitle:e.sectionTitle,type:e.sectionType,id:`template-editor-main-tem-${t}`,index:t,onClick:()=>{i({type:"ClickedEditSection",index:t})},...S(t)},a.createElement(A,{item:e})))))))))),t.confirm&&a.createElement(s.u,{dispatch:i,state:t.confirm}))},f=o.Ay.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-inline: 72px;
  overflow: auto;
  height: 100%;
  align-items: baseline;
`,y=(0,o.Ay)(p.VP)`
  margin-inline: -20px;
  padding-inline: 20px;
  flex: 1;
  overflow: auto;
`,h=(0,o.Ay)(p.VP)`
  gap: 16px;
`,b=(0,o.Ay)(p.VP)`
  max-width: 620px;
  gap: 48px;
  padding: 80px 0px;
`,v=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,$=(0,o.Ay)(p.VP)`
  padding: 20px;
  border-inline-end: 1px solid ${r.Tc2};
  width: 100%;
  flex: 1;
  height: 100%;
  gap: 32px;
`,w=(0,o.Ay)(n.P)`
  color: ${r.ui$};
  word-break: break-word;
`,A=e=>{let{item:t}=e;switch(t.sectionType){case"text":return a.createElement(w,{$small:!0},t.textOptions.description);case"analysis":return a.createElement(w,{$small:!0},t.analysisOptions.summaryFocus);case"compare":return a.createElement(w,{$small:!0},t.comparisonOptions.items.join(", "));case"notes":return a.createElement(w,{$small:!0},t.notesOptions.goal);case"qna":if("question"in t.qaOptions)return a.createElement(w,{$small:!0},t.qaOptions.question);return a.createElement(w,{$small:!0},t.qaOptions.questions.map(e=>"string"==typeof e?e:e.name).join(", "));case"table":return a.createElement(w,null,t.tableOptions.columns.map(e=>e.name).join(", "))}}},21139:(e,t,i)=>{i.d(t,{Component:()=>n.A});var n=i(37431);i(83670),i(30451)},30451:(e,t,i)=>{i(72661),i(83670)},83670:(e,t,i)=>{i.d(t,{Q_:()=>n}),i(72661);let n=["sections-editor"]},29103:(e,t,i)=>{i.d(t,{Component:()=>n.A}),i(67226);var n=i(37878);i(89615)},89615:(e,t,i)=>{var n=i(37217);i(72661),i(67226),n.I.getLogger("OpenAiComponents")},67226:(e,t,i)=>{i.d(t,{Q_:()=>r,SV:()=>n}),i(99420),i(72661);let n="choose-email-type",r=["sections-update"]},87613:(e,t,i)=>{i.d(t,{B:()=>g});var n=i(69670),r=i(14041),a=i(39716),o=i(48266);let l=e=>{let{children:t,className:i,icon:n,leftAddon:a,rightAddon:l,round:g=!1,center:x=!1,style:m,variant:f,inline:y=!1,...h}=e;return r.createElement(d,{className:i,style:m,role:"alert",...h,tabIndex:e.onClick?1:void 0,$variant:f,$round:g,$inline:y,$center:x},n?r.createElement(c,null,r.createElement(o.In,{icon:n,color:s[f].iconColor,size:16})):null,a,r.createElement(p,null,t),e?.onClick?r.createElement(c,null,r.createElement(u,{icon:"FullArrowRightOutline",color:s[f].arrowColor})):null,l)},s={credits:{bgColor:n.FbJ,iconColor:n.VSB,arrowColor:n.VSB,borderColor:n.i5z,borderColorHover:n.VSB,bgColorHover:n.fMC,color:n.vh3},warning:{bgColor:n.ZE3,bgColorHover:n.SfY,borderColor:n.O$e,borderColorHover:n.O$e,iconColor:n.eJD,arrowColor:n.eJD},critical:{bgColor:n.P0$,bgColorHover:n.JIy,borderColor:n.JIy,borderColorHover:n.MEI,iconColor:n.KE7,arrowColor:n.CCs},info:{bgColor:n.UU9,bgColorHover:n.o_k,borderColor:n.o_k,borderColorHover:n.LRT,iconColor:n.IVJ,arrowColor:n.$yM},success:{bgColor:n.UFl,bgColorHover:n.$2P,borderColor:n.$2P,borderColorHover:n.wKm,iconColor:n.lhO,arrowColor:n.XxH}},p=a.Ay.div`
  white-space: pre-wrap;
  text-wrap: pretty;
  flex-grow: 1;
  word-break: break-word;
  max-width: 100%;
`,d=a.Ay.div`
  transition: 0.3s;
  display: flex;
  justify-content: ${e=>e.$center?"center":"flex-start"};
  background: ${e=>s[e.$variant].bgColor};
  border: 1px solid ${e=>s[e.$variant].borderColor};
  border-radius: ${e=>e.$round?"8px":void 0};
  padding: 14px 24px;
  color: ${e=>s[e.$variant].color??n.CP};
  gap: 16px;
  cursor: ${e=>e.onClick?"pointer":"auto"};
  width: ${e=>e.$inline?"fit-content":"100%"};

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  & ${p} {
    flex-grow: ${e=>e.$center?"0":"1"};
  }

  &:hover {
    background-color: ${e=>e.onClick?s[e.$variant].bgColorHover:void 0};
    border: ${e=>e.onClick?`1px solid ${s[e.$variant].borderColorHover}`:void 0};
  }
`,c=a.Ay.div`
  display: flex;
  align-items: center;
  height: 24px;
`,u=(0,a.Ay)(o.In)`
  display: flex;
  align-items: center;
  position: relative;
  left: -10px;
  opacity: 0;
  transition: 0.2s;

  ${d}:hover & {
    left: 0;
    opacity: 1;
  }
`;(0,a.Ay)(l)`
  position: sticky;
  top: 0;
`;let g=Object.assign(l,{Content:p})},82212:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(48266);let a={s:"12px",m:"14px",l:"16px"};r.Ay.a`
  color: ${n.wmS};
  position: relative;
  transition: all 0.2s ease-in-out;
  line-height: 16px;
  font-size: ${e=>{let{$size:t}=e;return a[t]}};
  color: ${n.t14};
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  :focus-visible {
    box-shadow: 0px 0px 0px 2px ${n.t14}3d;
  }
  ${e=>{let{$disabled:t}=e;return t&&(0,r.AH)`
      pointer-events: none;
      opacity: 0.32;
    `}}
  .arrow {
    position: absolute;
    right: 5px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    color: ${n.t14};
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    color: ${n.t14};
    padding-right: 18px;

    .arrow {
      opacity: 1;
      right: 0;
    }
  }
`},20285:(e,t,i)=>{i.d(t,{pT:()=>g});var n=i(69670),r=i(67331),a=i(14041),o=i(39716),l=i(7711),s=i(88260);let p=(0,o.Ay)(s.a)`
  width: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 48px 40px;
  text-align: center;
`,d=o.Ay.div`
  display: flex;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`,c=o.Ay.div`
  color: ${n.t14};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.25px;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: pretty;
`,u=(0,o.Ay)(r.P)`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`,g=Object.assign(a.memo(e=>{let{header:t,onClose:i,confirmBtn:n,cancelBtn:r,closeBtn:o,children:s,...g}=e;return a.createElement(p,{coordinatesAware:!0,isOpen:!0,onClose:()=>i?.(),id:"confirm",...g},t?a.createElement(c,{"data-testid":"header"},t):null,s?a.createElement(u,{"data-testid":"content"},s):null,n||r?a.createElement(d,null,n,r):null,i?o||a.createElement(l.J,{onClick:i,abs:!0}):null)}),{Header:c,Body:u,Actions:d})},61788:(e,t,i)=>{i(14041),i(37345)},8432:(e,t,i)=>{i(14041),i(37345)},48603:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(87613),i(27461),i(48266),r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  table {
    text-align: right;
    width: 100%;
  }

  tbody td {
    padding: 12px 16px;
  }

  thead th {
    padding: 14px 16px;
    font-weight: 600;
    color: ${n.CP};
    position: sticky;
    top: 0;
    background-color: ${n.ONy};
    z-index: 1;
  }

  th,
  td {
    text-align: left;
    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    background-color: ${n.o$k};
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:not(:last-child) {
      border-right: 1px solid ${n.Tc2};
    }
  }

  tr {
    line-height: 24px;
    position: relative;
    border-bottom: 1px solid ${n.Tc2};

    svg {
      vertical-align: middle;
      margin-right: 12px;
    }
  }
`,r.Ay.div`
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${n.Tc2};
  max-height: 70vh;
  overflow-y: auto;
`,r.Ay.tr`
  ${e=>{let{$cached:t}=e;return t&&`
    td {
      text-decoration: line-through;
    }
  `}}
`},82242:(e,t,i)=>{i.d(t,{Sk:()=>m,ke:()=>x,ms:()=>y});var n=i(69670),r=i(85148),a=i(26584),o=i(4630),l=i(14041),s=i(39716),p=i(58756),d=i(21714),c=i(27461),u=i(48266),g=i(65947);let x=s.Ay.div`
  padding: 14px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${n.CP};
  background-color: ${n.ONy};
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${n.ONy};
`,m=e=>{let{ref:t,...i}=e,n=(0,l.useRef)(null),a=(0,r.SV)([n,t]);(0,l.useLayoutEffect)(()=>{let e=setTimeout(()=>{n.current?.focus({preventScroll:!0})},10);return()=>clearTimeout(e)},[]);let o=i.view&&"ghost"===i.view?g.dN.Ghost:g.dN.Flat;return l.createElement(o,{ref:a,placeholder:"Search here...",addonBefore:l.createElement(u.In,{icon:"MagnifierOutline"}),size:"l",...i})},f=s.Ay.hr`
  border: none;
  border-bottom: ${n.Tc2} 1px solid;
  margin: 0;
`,y=e=>{let{children:t,noPadding:i,autoCloseOnContentClick:n=!1,anchor:s,customAnchorPoints:u,placement:g="bottom-end",width:x,fullWidth:m,height:y,style:$,offset:w,strategy:A="fixed",behavior:k="resize",renderContent:E,renderHeader:S,renderFooter:C,isOpen:T,bare:I,onIsOpenChanged:H,...N}=e,[O,P]=(0,l.useState)(!1),{portalInsertionPoint:z}=(0,l.useContext)(p.o),F=T??O,_=H??P,j=(0,l.useCallback)(()=>_(!1),[_]),M=(0,l.useCallback)(()=>{n&&j()},[n,j]),R=(0,l.useRef)(y);R.current=y;let B="inline"===A,{refs:D,floatingStyles:V,context:L}=(0,r.we)({open:F&&!B,onOpenChange:_,middleware:[(0,a.cY)(e=>{let{rects:t}=e;return k.includes("over")?-t.reference.height:w||10}),(0,a.Ej)({apply:e=>{let{availableHeight:t,elements:i,rects:n}=e,r=i.floating.style;switch(k.includes("over")&&(r.width=`${x||n.reference.width}px`),k){case"shift":case"flip-over":case"over":break;case"resize":{let e=R.current&&R.current<t?R.current:t;r.maxHeight=`${e-16}px`;break}case"resize-over":{let e=R.current&&R.current<t?R.current:t;r.maxHeight=`${e-16}px`;break}case"flip":case"flip-shift":R.current&&(r.maxHeight=`${R.current-16}px`)}m&&(r.width=`${n.reference.width}px`)}}),k.includes("flip")?(0,a.UU)():void 0,k.includes("shift")||"over"===k?(0,a.BN)({mainAxis:!0,crossAxis:!0}):void 0],whileElementsMounted:o.ll,strategy:"fixed-scrollable"===A?"fixed":"inline"===A?"absolute":A,placement:k.includes("over")?"bottom-start":g}),U=(0,r.ju)(L,{...u||{},enabled:!!u&&!B}),q=(0,r.s9)(L,{enabled:!B}),{isMounted:G,styles:K}=(0,r.DL)(L,{duration:200}),{getReferenceProps:X,getFloatingProps:W}=(0,r.bv)(B?[]:[q,U]),J=(0,l.useCallback)(e=>()=>{j(),e()},[j]),Q=B?{display:F?"inline-block":"none",width:m?"100%":x?`${x}px`:void 0,...y&&{height:`${y}px`}}:{},Z=B&&y?(()=>{let e=S?76:0,t=C?76:0;return{height:`${Math.max(y-e-t,100)}px`,flex:"1 1 auto",minHeight:0,overflow:"hidden"}})():{},Y=l.createElement(v,{"data-testid":"dropdown-wrapper",$bare:I,$width:x,$height:y,$fullWidth:m,$isInline:B,style:{...B?{}:{...V,...K},...Q,...$},...B?{}:W(),...N,ref:B?void 0:D.setFloating},S&&l.createElement(c.VP,{gap:8,style:{margin:8,marginBottom:0}},S?.({close:j,isOpen:F,closeAnd:J}),l.createElement(f,null)),l.createElement(c.mH,{"data-testid":"dropdown-results",onClick:e=>{let t=e.target instanceof HTMLElement?e.target:null;t?.closest("[data-no-autoclose]")||M()},itemGap:4,style:{...B?{}:{minHeight:48},paddingInline:8,...i&&{paddingInline:0},...Z}},E({close:j,isOpen:F,closeAnd:J})),C&&l.createElement(c.VP,{gap:8,style:{margin:8,marginTop:0}},C?.({close:j,isOpen:F,closeAnd:J}))),ee=(()=>{if("inline"===A)return Y;if(!G)return null;switch(A){case"fixed":return b(h(Y),z);case"fixed-scrollable":return b(Y,z);case"absolute":return Y}})();return l.createElement(l.Fragment,null,(0,l.isValidElement)(t)&&(0,l.cloneElement)(t,X({ref:B?void 0:D.setReference,...(0,d.rX)(t)&&t.props,onClick:e=>{(0,d.rX)(t)&&t.props.onClick?.(e),_(!F)}})),ee)},h=e=>l.createElement(r.zR,null,e),b=(e,t)=>l.createElement(r.XF,{root:t},e),v=s.Ay.div`
  background: ${n.ONy};
  width: ${e=>{let{$width:t,$fullWidth:i,$isInline:n}=e;return n&&i?"100%":t?`${t}px`:n?"auto":"244px"}};
  height: ${e=>{let{$height:t,$isInline:i}=e;return i&&t?`${t}px`:"auto"}};
  max-height: ${e=>{let{$height:t,$isInline:i}=e;return i?t?`${t}px`:"none":t?`min(${t}px, 100vh)`:"100vh"}};
  border: 1px solid #f1f3f4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  ${e=>{let{$isInline:t}=e;return t&&"vertical-align: top;"}}
  ${e=>{let{$bare:t}=e;return t&&`
      background: transparent;
      border-radius: 16px;
      padding: 0;
      border: none;
    `}}
`},43885:(e,t,i)=>{var n=i(69670),r=i(14041),a=i(39716),o=i(97638);let l=e=>{let{action:t,right:i,onClick:n,children:a,...o}=e;return r.createElement(s,{tabIndex:n?0:void 0,role:n?"button":void 0,onClick:n,...o},a,r.createElement("div",{style:{flex:1,textAlign:"right"}},i),t?r.createElement(p,null):null,t)};l.Caption=a.Ay.h6`
  color: ${n.wmS};
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.1px;
`,l.List=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`,l.Main=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;let s=a.Ay.div`
  padding: 12px 24px;
  outline: 1px solid ${n.Tc2};
  border-radius: 99999px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  cursor: ${e=>e.onClick?"pointer":"default"};
  border: 2px solid transparent;
  color: ${n.CP};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  min-height: 72px;
  text-align: left;

  transition: all 0.2s ease-in-out;
  --icon-size: 30px;
  --icon-scale: 1;

  ${e=>e.onClick&&(0,a.AH)`
      &:active,
      &.pseudo-active,
      &:hover,
      &.pseudo-hover,
      &:focus,
      &.pseudo-focus {
        border-color: ${n.NcT};
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.04);
      }
    `}
  ${o.e.Component} {
    margin-left: -12px;
  }
`,p=a.Ay.div`
  width: 1px;
  height: 32px;
  background: ${n.Tc2};
`},42400:(e,t,i)=>{i.d(t,{IU:()=>u,TO:()=>g,lm:()=>x});var n=i(78445),r=i(69670),a=i(54357),o=i(14041),l=i(39716),s=i(53747),p=i(9106),d=i(48266),c=i(85934);i(33808);let u=(0,l.Ay)(o.memo(e=>{let{ref:t,size:i="m",leftAddon:r,...l}=e,{icon:p,text:c,rightAddon:u,disabled:g,className:x,active:h,children:b,...v}=l,{ref:$,showTooltip:w}=(0,s.Q)(),A=o.useMemo(()=>o.createElement(y,{ref:$,className:"text"},b||c),[c,b,$]),k=o.createElement(m,{ref:t,className:(0,a.A)({disabled:g,active:h},x,"menubutton-parent"),"aria-selected":h,disabled:g,$size:i,...v},r?o.createElement(f,{style:{flexGrow:0}},r):null,p?o.createElement(d.In,{icon:p,size:"s"===i?14:20}):null,A,u?o.createElement(f,null,u):null);return w?o.createElement(n.m,{content:"string"==typeof(b||c)?b||c:null,placement:"bottom",delay:500,size:"m",style:{zIndex:1}},k):k}))``,g=e=>o.createElement(u,{...e,rightAddon:o.createElement(p.S,{tabIndex:-1,checked:e.checked,onChange:()=>{}})}),x=(0,l.Ay)(e=>{let t=o.createElement(c.q,{tabIndex:-1,checked:e.checked,onChange:()=>{}});return o.createElement(u,{...e,rightAddon:t})})``,m=l.Ay.button`
  display: flex;
  align-items: center;
  gap: ${e=>{let{$size:t}=e;return"m"===t?"16px":"12px"}};
  width: 100%;

  height: ${e=>{let{$size:t}=e;return"m"===t?"48px":"40px"}};
  padding: ${e=>{let{$size:t}=e;return"m"===t?"14px 16px":"8px 16px"}};
  background: ${e=>{let{$error:t}=e;return t?r.P0$:"unset"}};
  border: 1px solid transparent;
  border-radius: 8px;
  user-select: none;
  transition: all 0.2s;
  outline-color: transparent;
  outline: 2px solid transparent;
  outline-offset: -2px;

  font-weight: ${e=>{let{$size:t}=e;return"m"===t?"500":"400"}};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 20px;
  color: ${e=>{let{$error:t}=e;return t?r.CCs:r.ui$}};

  --icon-color: ${r.e30};

  ${e=>{let{onClick:t}=e;return t?"":"pointer-events: none;"}}

  &.active,
  &[aria-selected="true"],
  &.pseudo-hover,
  &:hover {
    --icon-color: ${r.b_I};
    background: ${r.KxS};
    color: ${r.t14};
  }
  svg {
    transition: all 0.2s;
    color: var(--icon-color);
  }
  &.active:hover {
    background: ${r.KxS};
    outline: 2px solid ${r.j3F};
    svg {
      fill: ${r.b_I};
    }
  }

  &.pseudo-hover,
  &:hover {
    &:not(.active),
    &:not([aria-selected="true"]) {
      ${d.In} {
        --icon-scale: 1.15;
      }
    }
  }
  &:focus-visible {
    background: ${r.KxS};
    outline-color: rgba(111, 96, 204, 0.24);
  }
  &.disabled {
    opacity: 0.32;
    pointer-events: none;
  }
`,f=l.Ay.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`,y=l.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  text-align: start;
  word-break: break-all;
`},64744:(e,t,i)=>{i.d(t,{a:()=>l});var n=i(69670),r=i(14041),a=i(39716),o=i(39241);let l=r.memo(e=>{let{size:t="m",variant:i,...n}=e,[a,...o]=r.Children.toArray(e.children).filter(e=>null!=e),l=!o.length&&1===`${a}`.length;return r.createElement(d,{$round:l,$size:t,$variant:i,...n})}),s={xs:{size:"12px",iconSize:6,padding:"2px 5px",lh:"8px",fontSize:"8px",gap:"3px"},s:{size:"16px",iconSize:8,padding:"3px 6px",lh:"10px",fontSize:"10px",gap:"4px"},m:{size:"20px",iconSize:12,padding:"6px 8px",lh:"12px",fontSize:"12px",gap:"6px"},l:{size:"24px",iconSize:12,padding:"6px 10px",lh:"16px",fontSize:"14px",gap:"8px"}},p={gray:{bgColor:`${n.Ql9}0a`,iconColor:n.l0o,textColor:n.FCg},plum:{bgColor:`${n.KxS}`,iconColor:n.b_I,textColor:n.t14,border:`1px solid ${n.Q_2}`},melon:{bgColor:`${n.jK0}`,iconColor:n.zIe,textColor:n.g7N,border:`1px solid ${n.vNc}`},error:{bgColor:n.P0$,iconColor:n.KE7,textColor:n.CCs},warning:{bgColor:n.bCn,iconColor:n.eJD,textColor:n.HOM},success:{bgColor:n.IhC,iconColor:n._fY,textColor:n.J5m},dark:{bgColor:n.CP,iconColor:n.l0o,textColor:n.ONy},premium:{bgColor:n.ONy,iconColor:n.wl$,textColor:n.S5v,border:`1px solid ${n.Tc2}`}},d=a.Ay.div`
  align-items: center;
  background-color: ${e=>p[e.$variant].bgColor};
  border-radius: 12px;
  border: ${e=>p[e.$variant].border};
  color: ${e=>p[e.$variant].textColor};
  display: inline-flex;
  font-size: ${e=>s[e.$size].fontSize};
  font-weight: 500;
  gap: ${e=>s[e.$size].gap};
  line-height: ${e=>s[e.$size].lh};
  justify-content: center;
  letter-spacing: 0.1px;
  min-width: ${e=>s[e.$size].size};
  padding: ${e=>s[e.$size].padding};
  width: ${e=>e.$round?s[e.$size].size:"auto"};
  height: ${e=>e.$round?s[e.$size].size:"auto"};
  text-wrap: nowrap;

  --icon-color: ${e=>p[e.$variant].iconColor};
  --icon-size: ${e=>s[e.$size].iconSize}px;
`;(0,a.Ay)(e=>r.createElement(l,{...e,variant:"premium",size:e.small?"s":"m"},r.createElement(o.E,null)," Premium"))`
  > svg {
    margin-bottom: 2px;
    margin-inline: 1px;
  }
`},43986:(e,t,i)=>{i(14041),i(68543),i(61994),i(46441),i(65016),i(8445)},38437:(e,t,i)=>{i(14041),i(58756),i(9106),i(48266),i(38940),i(61994);var n=i(69670);(0,i(85040).A)(e=>({paperRoot:{borderRadius:e.spacing()+2,border:"1px solid rgba(0, 0, 0, 0.04)",boxShadow:"0px 2px 8px rgba(0, 0, 0, 0.06)",backgroundColor:n.ONy},selectRoot:{display:"flex",padding:e.spacing(2,6,2,2),color:n.UmY,border:`1px solid ${n.MfC}`,borderRadius:e.spacing(2),"&:focus":{borderRadius:e.spacing(2),backgroundColor:"transparent"}},disabled:{color:n.l0o},select:{display:"flex"},menuRoot:{padding:e.spacing(2),zIndex:e.zIndex.tooltip},menuItem:{padding:`${e.spacing()}px ${e.spacing(3)}`,borderRadius:e.spacing(),color:n.ui$,"&:not(:first-child)":{marginTop:e.spacing(1)},"&:hover, &.Mui-selected, &.Mui-selected:hover ":{color:n.t14,backgroundColor:n.KxS}},menuItemContent:{display:"flex",alignItems:"center",flex:1},menuItemIcon:{marginRight:e.spacing(4)},icon:{top:"50%",right:e.spacing(),transform:"translate(0, -50%)",fill:n.ydb},iRoot:{color:n.CP,border:`1px solid ${n.Tc2}`,"&.MuiSelect-select":{"& $menuItemIcon":{color:n.wB3},padding:e.spacing(3.5,8,3.5,4)},"& ~ $icon":{top:"50%",left:`calc(100% - ${e.spacing(6)})`,transform:"translate(0, -50%)",fill:n.ui$}},iMenuRoot:{"& $menuItem":{padding:e.spacing(4),"&:hover, &.Mui-selected, &.Mui-selected:hover ":{color:n.t14,backgroundColor:"#F8F8FD"}}},fatRoot:{border:"none"},radioRootSelect:{color:n.CP,border:"none","&.MuiSelect-select":{"& $menuItemIcon":{color:n.wB3},padding:e.spacing(2.5,3,2.5,3)},"& .bardeen-icon, & .radio-icon-checked, & .radio-icon, & .all-categories-checkbox":{opacity:"0",position:"absolute"}},checkbox:{padding:"0px !important",marginRight:"-2px"},defaultText:{marginRight:e.spacing(4),flex:1},radioLabel:{width:"100%"},radioRoot:{padding:"0 !important"},arrow:{color:n.UmY,"&.passive":{color:n.ydb}}}))},37204:(e,t,i)=>{var n=i(69670),r=i(39716),a=i(63695);let o=r.Ay.div`
  display: flex;
  height: 100%;
  @media screen and (min-height: 500px) and (min-width: 1024px) {
    --margin: 32px;
  }
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`,l=r.Ay.div`
  background: radial-gradient(141.42% 616.58% at 0% 0%, #ffdda6 0%, #f27ad7 50%, #8374ff 75%);
  display: none;
  height: 100%;
  width: 50%;
  flex-grow: 1;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    display: flex;
  }
  justify-content: ${e=>{let{$align:t}=e;return"end"===t?"flex-end":"flex-start"}};
  border-left: 1px solid ${n.Tc2};
`;Object.assign(o,{ContentSide:r.Ay.div`
  --spacing: 1;
  height: 100%;
  width: 50%;
  min-width: 560px;
  max-height: 100vh;
  overflow: auto;
  padding: calc(12px * var(--spacing)) calc(16px * var(--spacing));
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-content: center;
  ${e=>{let{$center:t}=e;return t&&"justify-content: center"}};

  @media screen and (min-width: 768px) {
    --spacing: 2;
  }
  @media screen and (min-height: 500px) and (min-width: 1024px) {
    --spacing: 4;
  }

  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`,ImageSide:l,Image:(0,r.Ay)(a.o)`
  padding: 64px 96px;
  img {
    max-height: 540px;
  }
`})},45393:(e,t,i)=>{var n=i(69670),r=i(14041),a=i(39716),o=i(9005),l=i(9930);let s=(0,a.Ay)(o.y)`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  color: ${e=>"onboarding"===e.$variant?n.wB3:n.TJO};
  fill: ${n.ONy};
  flex-shrink: 0;
`,p=(0,a.Ay)(l.n)`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  color: ${n.KE7};
  flex-shrink: 0;
`;(0,a.Ay)(e=>{let{children:t,$variant:i,locked:n,size:a,...o}=e;return r.createElement("div",o,n?r.createElement(p,null):r.createElement(s,{$variant:i}),r.createElement("div",null,t))})`
  display: flex;
  align-items: center;
  gap: ${e=>"onboarding"===e.$variant?32:12}px;
  font-size: ${e=>"xl"===e.size?"18px":"14px"};
  font-weight: ${e=>"xl"===e.size?"500":"400"};
  line-height: 1.6;
  color: ${e=>"xl"===e.size?n.CP:n.ui$};
  svg {
    margin-left: ${e=>"xl"===e.size?"24px":"0"};
    width: ${e=>"xl"===e.size?"20px":"16px"};
    height: ${e=>"xl"===e.size?"20px":"16px"};
  }
`},51402:(e,t,i)=>{i(38792);var n=i(14041);i(117),i(67469),i(64942);var r=i(69670);i(45250);var a=i(39716);i(45742),i(85170),i(53136),i(61462);var o=i(77956);i(72865),i(48143);var l=i(28926);i(42014),i(20120),i(80284),i(82644),i(81660),(0,a.Ay)(l.VP)`
  --icon-color: ${r.ydb};
  --icon-size: 16px;
`,(0,a.Ay)(e=>n.createElement(l.In,{icon:"CommandsGet",...e}))`
  --size: 20px;
  --color: ${r.t14};
`,(0,a.Ay)(l.In)`
  --size: 20px;
  --color: ${r.t14};
`,(0,a.Ay)(l.fI)`
  font-size: 16px;
  font-weight: 500;
  color: ${r.CP};
  padding: 8px 0;
  flex: 1;
  font-family: Outfit;
  margin-bottom: 16px;
`,(0,a.Ay)(l.fI)`
  padding: 8px 0;
  flex: 1;
  gap: 16px;
`,(0,a.Ay)(l.fI)`
  flex: 1;
  background: ${r.hi1};
  border: 1px solid ${r.hi1};
  border-radius: 8px;
  height: 100%;
  padding: 11px 20px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${r.CP};
  gap: 8px;
`,a.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: ${r.CP};
`,i(20220);let s=e=>"ArrayLiteralExpression"===e.type?e.elements.flatMap(s):[e];i(35501),i(34238),i(54439),i(11778),i(44835),i(66712),i(62825),i(81250),i(62321),i(58651),(0,a.Ay)(l.VP)`
  border-radius: 8px;
  outline: 1px solid transparent;
  transition: outline 0.2s ease-in-out;
  &.error {
    outline: 1px solid ${r.KE7};
  }
`,(0,a.Ay)(e=>{let{$hasRightButtons:t,...i}=e;return n.createElement(o.T,i)})`
  &:hover {
    cursor: pointer;
    background-color: ${r.KxS};
  }
  ${e=>{let{$hasRightButtons:t}=e;return t&&(0,a.AH)`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}}
`,i(37089),i(50854),i(59750),i(93510),i(42257),i(27461)},19010:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(58282),i(85170),i(48143),i(59750),i(68919);var a=i(28926);r.Ay.div`
  width: 100%;
`,r.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
`,r.Ay.div`
  min-width: 360px;
  width: 100%;
  height: 100%;
`,r.Ay.div`
  max-width: ${e=>{let{$visible:t}=e;return t?"590px":"0"}};
  margin-left: ${e=>{let{$visible:t}=e;return t?"0":"-22px"}};
  opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
  transition:
    opacity 0.2s ease-out,
    max-width 0.2s ease-out;

  flex: 1;
  height: 450px;
  overflow: hidden;
  padding: ${e=>{let{$visible:t}=e;return t?"0 10px 10px 0":"0"}};
`,(0,r.Ay)(a.h$)`
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #f1f3f4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  gap: 32px;
  height: 100%;
  overflow: auto;
  justify-content: center;
`,(0,r.Ay)(a.h$)`
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  width: 580px;
`,(0,r.Ay)(a.fI)`
  position: relative;
  justify-content: center;
  align-items: center;
`,(0,r.Ay)(a.VP)`
  align-items: flex-start;
  gap: 0;
`,r.Ay.a`
  font-size: 14px;
  line-height: 26px;
  display: inline;
  cursor: pointer;
  color: ${n.t14};
  &:hover {
    color: ${n.g7N};
  }
`},71378:(e,t,i)=>{i(14041),i(28926)},67846:(e,t,i)=>{i(41880)},93754:(e,t,i)=>{i.d(t,{ue:()=>l}),i(14041),i(5855),i(85170);var n=i(67331),r=i(69670),a=i(39716);i(73457),i(45742);var o=i(28926);a.Ay.form``,(0,a.Ay)(n.P)`
  font-size: 12px;
  text-decoration-line: underline;
  color: ${r.ui$};
  cursor: pointer;
`,(0,a.Ay)(o.nt)`
  width: 530px;
  padding: 32px;
  position: relative;
`;let l={editor:null,confirm:null}},6025:(e,t,i)=>{i.d(t,{f:()=>d});var n=i(69670),r=i(67331),a=i(14041),o=i(39716),l=i(22001),s=i(48143),p=i(28926);i(12171);let d={query:"",open:!1,loading:!1,reason:null};(0,o.Ay)(p.$n)`
  --icon-color: ${n.KE7};
  &:hover,
  &:active {
    --icon-color: ${n.CCs};
  }
`,(0,o.Ay)(e=>{let{onClose:t,value:i,onChange:o,onSubmit:d,onChangeReason:c,reason:u,...g}=e,x=[{label:(0,s.rD)().featureFlags.v4MiniEnabled?"Playbook doesn't run":"Agent doesn't run",value:"playbook-does-not-run"},{label:"Results are not what I expect",value:"unexpected-result"},{label:"Couldn't build a playbook",value:"can-not-build-playbook"},{label:"Other",value:"other"}],m=x.find(e=>e.value===u)??null;return a.createElement("form",{onSubmit:e=>{e.preventDefault(),u&&d()},...g},a.createElement(r.H4,{$color:n.t14,style:{fontFamily:"Outfit"}},"Having an issue?"),a.createElement(r.P,{$small:!0},"Describe what is happening in detail below - we'll take it from there."),a.createElement(p.ms,{behavior:"over",autoCloseOnContentClick:!0,renderContent:()=>x.map(e=>a.createElement(p.IU,{type:"button",key:e.value,text:e.label,active:u===e.value,onClick:()=>{c(e.value)}}))},a.createElement(p.IU,{style:{borderColor:n.MfC},type:"button",text:m?.label||"Select option",rightAddon:a.createElement(p.In,{icon:"ArrowDownOutline",size:16})})),a.createElement(p.TM.Outline,{autoHeight:!0,rows:5,placeholder:"Describe the issue",onChange:o,value:i,maxLength:l.Y}),a.createElement(r.a,{$small:!0},'By clicking "Send Report", I agree to share app debugging data with Bardeen to assist with this issue.'),a.createElement(p.VP,{center:!0,style:{marginBottom:8}},a.createElement(p.$n,{size:"l",round:!0,variant:"primary",text:"Send Report",type:"submit",disabled:!u})))})`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 24px;
  align-items: stretch;
  align-self: stretch;
  text-align: center;
`},67469:(e,t,i)=>{i.d(t,{uA:()=>h,ue:()=>y});var n=i(69670);i(45250);var r=i(14041),a=i(39716);i(25954);var o=i(47831);i(45540),i(8937),i(77956),i(37089),i(45742);var l=i(85170),s=i(5855);i(93510),i(29103);var p=i(28926),d=i(27046),c=i(19855),u=i(33956),g=i(37345);let x=e=>{let{scraperUuid:t,typeHint:i,value:n,onSave:a,onCreate:o,onEdit:l}=e;return r.createElement(m,{scraperUuid:t,typeHint:i,onSave:a},r.createElement(p.fI,{gap:12},r.createElement(g.$n,{size:"l",text:"Create Template",icon:"PlusOutline",iconPosition:"left",round:!0,onClick:()=>o()}),n&&"ObjectStorageReferenceExpression"===n.type?r.createElement(g.$n,{size:"l",text:"Edit Template",icon:"PencilOutline",iconPosition:"left",round:!0,variant:"outlined",onClick:()=>n.ref&&l(n.ref)}):null))},m=r.memo(function(e){let{scraperUuid:t,typeHint:i,onSave:n,children:a}=e,l=r.useCallback(e=>{"setScraperModel"===e.type&&n({type:"ObjectStorageReferenceExpression",ref:e.ref.$ref,typeHint:i,displayHint:{description:"Template",label:"Template"},validationStatus:[],needsPaidFeatures:[]})},[n,i]);return(0,o.q)(t??"","scraper_model",l),a});var f=i(15263);let y={inputFlowState:null,categorizerData:{},confirm:null,loading:!1,categorizerTarget:"",categorizerBucket:null,categorizerQuestions:null,inlineWritingAssistant:null},h=r.memo(function(e){let{statementIndex:t,argName:i,typeHint:n,addonState:a,value:o,dispatch:p,onChange:g,categorizerTemplate:m,writingAssistantTemplate:y}=e;return r.createElement(r.Fragment,null,(()=>(0,l.oW)(n?.signature)?r.createElement(x,{onCreate:(e,n)=>{p({type:"Scraper/Create",id:`scraper/${t}/${i}`,url:e,goal:n,statementIndex:t})},onEdit:e=>{p({type:"Scraper/Edit",id:`scraper/${t}/${i}`,ref:e})},typeHint:n,scraperUuid:`scraper/${t}/${i}`,onSave:g,value:o}):(0,l.r6)(n.signature)?r.createElement(f.l,{value:o,state:a,dispatch:p,typeHint:n,onChange:g,template:y}):(0,l.Ut)(n.signature)?r.createElement(d.C,{state:a,dispatch:p,typeHint:n,value:o,statementIndex:t,onChange:g,template:m}):(0,l.Ce)(n.signature)?r.createElement(u.S,{state:a,dispatch:p,typeHint:n,value:o,onChange:g}):o&&"object"==typeof o&&"displayHint"in o&&o.displayHint?.interactions?.openResource?r.createElement(c.j,{openInteraction:o.displayHint.interactions.openResource}):void 0)(),a.confirm&&r.createElement(s.u,{dispatch:p,state:a.confirm}))});(0,a.Ay)(p.$n)`
  padding: 19px;
  border-radius: 0;
  border: 1px solid ${n.Tc2};
  border-left: none;
  z-index: 1;
  background: ${n.ONy};
  ${e=>{let{$empty:t}=e;return!t&&"box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);"}};
`},26572:(e,t,i)=>{var n=i(69670),r=i(67331),a=i(78445);i(45250),i(14041);var o=i(39716);i(48143);var l=i(28926);o.Ay.div`
  display: flex;
  --icon-size: 16px;
  --icon-color: ${n.wdA};

  &:hover {
    --icon-color: ${n.NcT};
  }
`,(0,o.Ay)(r.P)`
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  font-family: Inter;
  padding-left: 16px;
  color: ${n.CP};
  padding-block: 4px;
  position: sticky;
  top: 0;
  background: ${n.ONy};
  z-index: 1;
`,o.Ay.div`
  max-height: 624px;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  ${l.IU} p {
    font-weight: 400;
  }
`,(0,o.Ay)(a.m)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
`,(0,o.Ay)(r.H5)`
  color: ${n.ONy};
`,(0,o.Ay)(r.P)`
  color: ${n.MfC};
  font-weight: 400;
`,o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,(0,o.Ay)(l.fI)`
  padding: 4px 12px;
  --icon-scale: 1.1;
  border-bottom: 1px solid ${n.Tc2};
  justify-content: space-between;
  width: 100%;
`},64942:(e,t,i)=>{i(14041);var n=i(39716);i(85170),i(44835);var r=i(28926);i(42014),i(66712),i(62825),i(81250);var a=i(67331);i(45742),(0,n.Ay)(r.N)`
  ${r.N.Title} {
    width: 100%;
  }
  padding-inline-end: 48px;
`,(0,n.Ay)(r.fI)`
  width: 100%;
  min-width: 0;
`,(0,n.Ay)(a.P)`
  flex-shrink: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 50%;
`,(0,n.Ay)(a.P)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,i(58651),(0,n.Ay)(r.VP)``},89787:(e,t,i)=>{var n=i(69670),r=i(67331);i(14041);var a=i(39716);i(48143);var o=i(28926);a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  gap: 14px;

  background-color: ${e=>e.$error?n.P0$:n.KxS};
`,a.Ay.div`
  margin-top: 14px;
`,(0,a.Ay)(o.z9)`
  background: radial-gradient(100% 100% at 0% 0%, #8c80d6 0%, #6f60cc 100%);
`,(0,a.Ay)(r.P)`
  align-items: center;
`},77620:(e,t,i)=>{i.d(t,{OO:()=>g});var n=i(67331),r=i(69670),a=i(14041),o=i(39716);i(45742),i(85170),i(48143),i(10777);var l=i(28926);i(36836),i(98380),i(41880),o.Ay.div`
  margin: 8px 0;
  height: 1px;
  align-self: stretch;
  background: ${r.Tc2};
`,i(5629),(0,o.Ay)(l.R9)`
  button {
    margin: 4px;
  }
`,i(24760),i(79842),(0,o.Ay)(l.fI)`
  gap: 8px;
`,(0,o.Ay)(l.fI)`
  justify-content: space-between;
`,o.Ay.div``,(0,o.Ay)(l.XI)`
  .error-row {
    --icon-color: ${r.uSe};
    --row-background-color: ${r.bCn};
    --row-hover-background-color: ${r.ZE3};
    --row-text-color: ${r.wmS};
    --row-hover-text-color: ${r.wmS};
  }
`,i(93754);var s=i(56);o.Ay.div`
  padding: 12px 24px;
  text-align: center;
  margin-bottom: -24px;
  display: flex;
  align-items: center;
  justify-content: center;
`,i(54555);var p=i(58651);i(89787),o.Ay.span`
  background-color: ${r.o$k};
  border-radius: 100%;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  gap: 14px;
  background-color: ${e=>{let{$error:t}=e;return t?r.P0$:r.KxS}};
`,o.Ay.div`
  margin-top: 14px;
`,(0,o.Ay)(l.VP)`
  padding: 40px 32px;
  gap: 14px;
`.displayName="PreviewWrapper";let d=(0,o.Ay)(n.P)`
  ${p.Tf}
  color: ${r.vh3};
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-weight: 500;
  line-height: 28px;
`;o.Ay.p`
  ${p.Tf}
  color: ${r.wmS};
  flex-grow: 1;
  font-weight: 400;
  line-height: 16px;
  font-size: 12px;
`,o.Ay.div`
  margin: 12px;
  padding: 12px;
  overflow: hidden;
  flex: 1;
`,o.Ay.div`
  padding: 12px;
  text-align: center;
  color: ${r.ydb};
  word-wrap: break-word;
`;let c=(0,o.Ay)(e=>a.createElement(s.Z.HeaderActionButton,{icon:"OverflowVerticalOutline",tooltipText:"More options",tooltipPlacement:"top",...e,text:void 0}))`
  opacity: ${e=>e.$isMenuOpen?1:0};
`,u=(0,o.Ay)(l.fI).attrs({gap:8})`
  transition: transform 0.24s ease-out;
  transform: translateX(${e=>e.$isMenuOpen?"0":"40px"});
  position: absolute;
  top: 18px;
  right: 24px;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
  background: white !important;
`,g=(0,o.Ay)(l.$n)`
  --icon-color: ${r.KE7} !important;
`;o.Ay.div`
  position: relative;
  overflow: hidden;
`;let x=(0,o.AH)`
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.24s ease-in-out;
`,m=(0,o.Ay)(l.$n)`
  ${x}
`,f=(0,o.Ay)(l.In)``,y=(0,o.Ay)(f)`
  ${x}
`;(0,o.Ay)(s.Z)`
  &:hover,
  &.pseudo-hover,
  &.pseudo-active {
    ${d} {
      color: ${r.t14};
    }

    ${f} {
      transition: all 0.24s ease-in-out;
      opacity: ${e=>{let{$isTestButtonDisabled:t}=e;return t?1:0}};
    }

    ${m}, ${y} {
      opacity: 1;
      transform: translateX(0);
    }

    ${u} {
      transform: translateX(0);
    }
    ${c} {
      opacity: 1;
    }
  }
`,(0,o.Ay)(n.P)`
  color: ${r.ui$};
  font-size: 12px;
  line-height: 16px;
`},21823:(e,t,i)=>{i(14041);var n=i(39716),r=i(28926);let a=(0,n.i7)`
      0% { opacity: .48; }
     50% { opacity: 1; }
    100% { opacity: .48; }
`;(0,n.Ay)(r.VP)`
  height: 100%;
  animation: ${a} ease-out 2.4s infinite;
  position: relative;
  top: -32px;
`},65069:(e,t,i)=>{i.d(t,{VX:()=>d});var n=i(67331),r=i(69670);i(14041);var a=i(39716),o=i(62284);i(117),i(37089);var l=i(45742);i(85170);var s=i(28926);i(42014),i(66712),i(93754),i(64942),i(1727),i(56),i(62825),i(81250);var p=i(58651);let d=(e,t)=>({currentBranch:"ifTrue",expanded:!0,index:e,actionNumber:e,comment:t,commentFlags:{keep:!1},conditionExpr:{type:"OperatorExpression",arity:1,args:[l.mK],op:"notEmpty"},output:"compute",mode:o.A.PARTITION,partitionExpr:null,type:"IfStatement",varName:`__${e}`,ifFalse:{type:"BlockStatement",children:[],comment:null,commentFlags:{keep:!1},index:-2,output:"compute"},ifTrue:{type:"BlockStatement",children:[],comment:null,commentFlags:{keep:!1},index:-3,output:"compute"}});(0,a.Ay)(n.P)`
  ${p.Tf}
  color: ${r.vh3};
  flex-grow: 1;
  align-self: center;
  font-weight: 500;
  line-height: 28px;
`,(0,a.Ay)(s.VP)`
  padding: 16px;
  background-color: ${r.o$k};
  padding: 36px;
  padding-inline: 44px;
  padding-bottom: 48px;
`},54734:(e,t,i)=>{var n=i(69670);i(88098),i(14041);var r=i(39716),a=i(28926),o=i(58651);let l=r.Ay.div`
  background: ${n.MfC};
  height: 16px;
  width: 1px;
  flex-shrink: 0;
`,s=(0,r.Ay)(a.fI)`
  justify-content: center;
  min-width: 300px;

  opacity: ${e=>{let{$forceShow:t}=e;return t?1:0}};
  margin-block: ${e=>{let{$forceShow:t}=e;return t?0:"-28px"}};

  transition: all 0.3s ease-in-out;
  transition-delay: 0.25s;
  ${e=>{let{$forceShow:t}=e;return t&&"transition-delay: 0s; transition: none;"}}
`;(0,r.Ay)(a.VP)`
  width: 100%;
  ${e=>{let{$disabled:t}=e;return t&&o.z2}}

  &:hover ${s}, &:first-child ${s}, &:last-child ${s} {
    opacity: 1;
    margin-block: 0;
  }
  &:first-child ${l}:first-child, &:last-child ${l}:last-child {
    display: none;
  }
  &:first-child ${l}:last-child, &:last-child ${l}:first-child {
    height: 32px;
  }
`},25954:(e,t,i)=>{i.d(t,{uA:()=>s});var n=i(14041),r=i(117),a=i(48143),o=i(86244),l=i(47831);let s=e=>{let{state:t,dispatch:i,onFetchTrainingData:s,onComplete:p,onCancel:d}=e;(0,l.q)(t.uuid,"bardeen_classification_task",i);let c=(0,a.Mj)(),u=(0,a.jL)(),g=n.useCallback((e,t)=>{u({type:"ModalsAction",action:{type:"Modal/AppsConnectionShown",from:"customflow",pbId:e,apps:t,switchTo:null}})},[u]),x=(0,r.i8)(i,"TaskBuilderAction");return(0,n.useEffect)(()=>{t.completed&&t.ref&&(p(t.ref),i({type:"ClearCompleted"}))},[t.completed,t.ref,p,i]),t.taskBuilderState?n.createElement(o.Component,{state:t.taskBuilderState,dispatch:x,onFetchTrainingData:s,onFinish:()=>i({type:"Finish"}),onCancel:d,pluginsSummary:c,onConnectApps:g}):null}},45540:(e,t,i)=>{i.d(t,{uA:()=>o});var n=i(14041),r=i(117),a=i(21139);i(47831);let o=e=>{let{state:t,onComplete:i,onCancel:o,dispatch:l}=e,s=(0,r.i8)(l,"TaskBuilderAction");return(0,n.useEffect)(()=>{t.completed&&t.ref&&(i(t.ref),l({type:"ClearCompleted"}))},[t.completed,t.ref,i,l]),t.taskBuilderState?n.createElement(a.Component,{state:t.taskBuilderState,dispatch:s,onFinish:()=>l({type:"Finish"}),onCancel:o}):null}},8937:(e,t,i)=>{i.d(t,{uA:()=>l});var n=i(14041),r=i(117),a=i(29103),o=i(47831);let l=e=>{let{state:t,onComplete:i,onCancel:l,dispatch:s}=e;(0,o.q)(t.uuid,"bardeen_email_bot_prompt",s);let p=(0,r.i8)(s,"TaskBuilderAction");return(0,n.useEffect)(()=>{t.completed&&t.ref&&(i(t.ref),s({type:"ClearCompleted"}))},[t.completed,t.ref,i,s]),t.taskBuilderState?n.createElement(a.Component,{state:t.taskBuilderState,dispatch:p,onFinish:()=>s({type:"Finish"}),onCancel:l}):null}},47831:(e,t,i)=>{i.d(t,{q:()=>a});var n=i(14041),r=i(11778);function a(e,t,i){let a=(0,r.c)();(0,n.useEffect)(()=>{let n=async(n,r,a)=>{e===n&&t===r&&i(a)};if(a)return a.on("custom_input_flow_dispatch",n),()=>{a.off("custom_input_flow_dispatch",n)}},[a,i,t,e])}},54555:(e,t,i)=>{i(14041),i(117),i(37504),i(28926),i(66712),i(51402),i(93754)},43419:(e,t,i)=>{var n=i(78445),r=i(69670),a=i(14041),o=i(39716),l=i(91159),s=i(28926),p=i(20285);let d=(0,o.Ay)(p.pT)`
  width: 644px;
`;(0,a.memo)(function(e){let{state:t,dispatch:i,onJumpToReference:r}=e,{references:o,header:s,message:p,cancel:f,confirm:y}=t,h=e=>{i(f.action),r(e)};return a.createElement(d,{id:"delete-confirm",header:s||"Delete card",onClose:()=>i(f.action),confirmBtn:u("Delete",y,i),cancelBtn:u("Cancel",f,i)},a.createElement(g,null,p&&a.createElement(x,null,p),a.createElement(m,null,o.map((e,t)=>{let i=e.argumentNames.map(l.xJ);return a.createElement(n.m,{key:`${e.statementIndex}-${e.argumentNames.join("-")||"no-arg"}-${t}`,content:i.length>0?1===i.length?`Used in argument "${i[0]}" of ${e.displayName}`:`Used in arguments "${i.slice(0,-1).join('", "')}" and "${i[i.length-1]}" of ${e.displayName}`:`Used in ${e.displayName}`,placement:"top"},a.createElement(c,{icon:e.icon,title:`${e.actionNumber}. ${e.displayName}`,onClick:()=>h(e.statementIndex)}))}))))});let c=(0,o.Ay)(s.N)`
  outline: 0;
  border: 0;
`;function u(e,t,i){let{text:n=e,action:r}=t;return a.createElement(s.$n,{size:"xl",round:!0,variant:"Delete"===e?"primary":"outlined","data-testid":"Delete"===e?"delete":"cancel",onClick:()=>i(r),text:n})}let g=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`,x=o.Ay.p`
  margin: 0;
  color: ${r.Xi8};
  line-height: 1.5;
`,m=o.Ay.div`
  margin: 0;
  padding: 8px;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 12px;
  border: 1px solid #f1f3f4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
`},77956:(e,t,i)=>{i.d(t,{T:()=>d});var n=i(78445),r=i(14041),a=i(39716),o=i(85170),l=i(61888),s=i(28926),p=i(62321);let d=e=>{let{ref:t,bare:i=!1,showArrow:a=!1,...d}=e,{expr:g,variant:x="default",suffix:m,onClear:f,isPbArgument:y,rightAddon:h,...b}=d,v=function e(t,i){switch(t.type){case"ConstantValueExpression":case"FieldAccessExpression":case"VarRefExpression":case"TableColumnReferenceExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"OperatorExpression":case"MissingExpression":return t.displayHint?.label??"";case"ObjectLiteralExpression":return c(t.fields.map(e=>e.title),", ",i);case"ArrayLiteralExpression":return c(t.elements.map((t,i)=>e(t,i)),", ",i);case"CastExpression":case"FieldRemappingExpression":return e(t.expression);case"StringTemplatingExpression":return c(t.children.map((t,i)=>e(t,i))," ",i);case"BCLFragmentExpression":return t.code;case"StringTemplatingTextNode":return t.text;case"StringTemplatingVariableNode":{let e="displayHint"in t.value&&t.value.displayHint?.icon||t.value.typeHint?.typeIcon;return r.createElement(l.o,{key:i,variant:"plum",addonBefore:e?r.createElement(s.In,{icon:e}):null,joinMode:t.join,label:(0,o.NI)(t.value)})}case"StringTemplatingGenerateNode":return r.createElement(l.o,{key:i,variant:"beach",addonBefore:r.createElement(s.In,{icon:"Sparkles"}),joinMode:null,label:(0,o.NI)(t.prompt)});case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return c(t.children.map((t,i)=>e(t,i)),"",i);case"StringTemplatingEmbedNode":return""}}(g);"(Nothing)"===v&&(v="");let $=String(v).trim().length>0,w=a||!$&&"StringTemplatingExpression"!==g.type&&"ArrayLiteralExpression"!==g.type,A=r.createElement(r.Fragment,null,v,m?r.createElement(r.Fragment,null," - ",m):null),k=!h&&!w,E=i?s.N:u;return r.createElement(s.fI,{style:{position:"relative",flex:1}},r.createElement(E,{ref:t,"data-testid":"expression-select-button",$isEmpty:!$,variant:x,bare:i,style:{paddingRight:k?32:void 0},title:r.createElement(n.m,{content:A,placement:"top",delay:1e3},r.createElement(p.e,{fields:[r.createElement(r.Fragment,null,y?`Ask me for "${v}"`:v),m]})),icon:"StringTemplatingExpression"===g.type?"TexturedText":"displayHint"in g&&g.displayHint?.icon||g.typeHint?.typeIcon||"ObjectOutline",rightAddon:!h&&w?r.createElement(s.In,{icon:"ArrowDownOutline"}):null,...b}),h&&r.createElement("div",{style:{position:"absolute",right:13}},h),k&&f?r.createElement(s.Jn,{size:"m",tooltipText:"Reset input","aria-label":"Reset input",style:{position:"absolute",right:15},onClick:e=>{e.stopPropagation(),f()}}):null)};function c(e,t,i){if(e.every(e=>"string"==typeof e))return e.join(t);let n=[],a=!0;for(let i of e)a?a=!1:t&&n.push(t),n.push(i);return r.createElement(r.Fragment,{key:i},n)}let u=(0,a.Ay)(s.N)`
  width: 100%;
  position: relative;
  max-height: 56px;
  overflow: hidden;
  ${e=>{let{$isEmpty:t}=e;return!t&&"box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);"}};
`},73457:(e,t,i)=>{i.d(t,{iY:()=>v});var n=i(78445),r=i(67331),a=i(69670),o=i(45250),l=i(14041),s=i(39716),p=i(88236),d=i(44242),c=i(62987),u=i(45742),g=i(28926),x=i(56);let m=e=>{switch(e.value){case"string":return p.g.getAllowedConfigOptions();case"date":return d.bE.getAllowedConfigOptions();case"url":case"email":case"phone":case"number":case"object":case"boolean":return[]}},f=e=>(0,o.find)(u.Af,t=>(0,o.isEqual)(t.facets,e.typeHint.signature[0]?.facets??[])),y=e=>e.typeHint.signature[0]?.config?Object(e.typeHint.signature[0]?.config):null,h=(e,t)=>{let i=f(e);return{...e,typeHint:{...e.typeHint,...i?{signature:[{...i,config:t}]}:{}}}},b=(e,t)=>{let i=m(t),n=[{facets:t.facets}];return{...e,typeHint:{...e.typeHint,signature:n,configOptions:i}}},v=e=>{let{argument:t,onChange:i,typeIcon:r,...a}=e,[o,s]=l.useState(u.Dz),p=!(0,u.df)(t.typeHint),d=!t.requiredByOtherCommand;return l.createElement(g.VP,{...a,"data-testid":"input-metadata"},l.createElement(g.YE,{caretPosition:"left",title:l.createElement(g.fI,{style:{width:"100%"}},l.createElement("div",{"data-testid":"add-custom-metadata",style:{marginRight:"auto"}},"Custom title and description"),l.createElement(n.m,{content:"When executing the automation, Bardeen will prompt to choose a value for this. You can change the title and description to provide better context for that prompt."},l.createElement(k,{role:"button"},"What does it mean?")))},l.createElement(x.n,null,l.createElement($,{style:{marginTop:"20px"},argument:t,onChange:i}),l.createElement(g.fI,{"data-testid":"open-advanced-options",gap:8,style:{marginTop:"20px",cursor:"pointer"},onClick:()=>s({...o,advancedExpanded:!o.advancedExpanded})},l.createElement(E,{$small:!0},"Advanced Options"),l.createElement(g.In,{icon:o.advancedExpanded?"ArrowUpOutline":"ArrowDownOutline"})),l.createElement(g.SD,{open:o.advancedExpanded},l.createElement("div",{style:{paddingInline:2}},l.createElement(w,{style:{marginBottom:"20px"},argument:t,onChange:i,canChangeRequired:d,canChangeStruct:p}))))))},$=l.memo(e=>{let{argument:t,onChange:i,...n}=e;return l.createElement(g.VP,{gap:20,...n},l.createElement("label",null,l.createElement(g.VP,{gap:12},l.createElement(E,{$small:!0},"Title"),l.createElement(g.dN.Outline,{"data-testid":"custom-title-input",size:"xl",onChange:e=>i({...t,label:e}),value:t.label}))),l.createElement("label",null,l.createElement(g.VP,{gap:12},l.createElement(E,{$small:!0},"Description"),l.createElement(g.TM.Outline,{size:"xl",onChange:e=>i({...t,comment:e,commentFlags:{...t.commentFlags,keep:!!e}}),value:t.comment||""}))))}),w=l.memo(e=>{let{argument:t,onChange:i,canChangeRequired:n,canChangeStruct:r,...a}=e,o=f(t),s=t.typeHint.configOptions,p=r&&!t.restricted?"Allow multiple values":r?"This argument is reused across multiple cards with 'Ask me every time for multiple values' enabled. To change this, disable 'Ask me every time for multiple values' in other cards first.":"The argument is a Field Mapping and can not be changed.";return l.createElement(l.Fragment,null,l.createElement(g.VP,{gap:20,...a},l.createElement(g.Sc,{style:{marginTop:"20px"},title:n?"Required":"The argument is required by the action and can not be changed.",disabled:!n,checked:!n||t.required,onChange:e=>{n&&i({...t,required:e})},label:"Required"}),l.createElement(g.Sc,{checked:t.usedAsMultipleValueArgument||t.struct===c.u.Array,disabled:!r||t.restricted,title:p,onChange:e=>{r&&!t.restricted&&i({...t,struct:e?c.u.Array:c.u.Scalar})},label:"Allow multiple values"}),l.createElement(g.ms,{autoCloseOnContentClick:!0,renderContent:()=>u.Af.map(e=>l.createElement(g.IU,{key:e.value,icon:e.icon,onClick:()=>i(b(t,e)),text:e.label})),behavior:"flip-over"},l.createElement(g.N,{type:"button",onChange:()=>{},title:o?.label||"Use custom data type",icon:o?.icon})),s?.map(e=>l.createElement("label",{key:e.key},l.createElement(g.VP,{gap:12},l.createElement(E,{$small:!0},e.label),l.createElement(A,{argument:t,option:e,onChange:i}))))))}),A=e=>{let{argument:t,option:i,onChange:n}=e,r=y(t),a=e=>n(h(t,{...r,[i.key]:e})),o=r?.[i.key]||null;return"boolean"===i.type?l.createElement(g.Z,{onChange:a,options:[{value:!0,label:"True"},{value:!1,label:"False"}],selected:o}):i.choices?l.createElement(S,{onChange:a,options:i.choices.map(e=>({value:e.value,label:e.label})),selected:o}):"number"===i.type?l.createElement(g.dN.Outline,{size:"xl",onChange:e=>a(Number(e)),value:o?String(o):""}):l.createElement(g.dN.Outline,{size:"xl",onChange:a,value:o?String(o):""})},k=(0,s.Ay)(r.P)`
  font-size: 12px;
  text-decoration-line: underline;
  color: ${a.ui$};
  cursor: pointer;
`,E=(0,s.Ay)(r.P)`
  font-weight: 600;
  color: #484a4f;
`,S=(0,s.Ay)(g.Z)`
  input[type="radio"] {
    display: flex;
  }
`},12171:(e,t,i)=>{i.d(t,{e2:()=>u.e2,z2:()=>u.z2}),i(64942),i(26572);var n=i(77620),r=i(14041),a=i(85170),o=i(39716);i(53747);var l=i(28926),s=i(69670),p=i(67331),d=i(94303),c=i(10777),u=i(58651);(0,o.Ay)(function(e){let{disabled:t,children:i,statement:o,cardList:s,dispatch:p,renderConnector:u,...m}=e,{expanded:f,index:y}=o,h=a.nE(o)[0]?.status,b=h?(0,a.p0)(h):null,v=e=>{p({type:"ClickedJumpToError",error:{statementIndex:y,argumentName:null,status:e,...d.NM(o)}})};return r.createElement("div",{"data-statement-index":y,...m,style:{width:"100%",maxWidth:"848px"}},r.createElement(c.sx,{id:String(y)},r.createElement(x,{gap:12,"aria-expanded":f},r.createElement("div",{style:{position:"absolute",inset:0,zIndex:1},onClick:()=>p({type:"CardHeaderClicked",index:y})}),i,h&&b&&r.createElement(n.OO,{icon:"TriangularExclamationBold",variant:"ghost",tooltipText:b,onClick:()=>v(h)}))),r.createElement(l.SD,{open:f},r.createElement(g,{gap:8},u(y,!0),s)))})`
  background: ${s.o$k};
  box-sizing: border-box;
  border-radius: 12px;

  flex: 0 0 auto;
  overflow: hidden;

  ${u.Tf}

  border: 1px solid ${s.l0o};
  border-color: ${e=>{let{disabled:t,statement:i}=e;return(0,a.nE)(i,!0).length>0?`${(0,s.B3q)(s.MEI,t?.16:1)} !important`:(0,s.B3q)(s.l0o,t?.16:1)}};

  &:hover {
    border-color: ${s.LRT};
  }
`;let g=(0,o.Ay)(l.VP)`
  padding: 32px 0 48px 0;
  transition: all 0.2s ease-in-out;
  padding-inline: 16px;
  border-top: 1px solid ${s.Tc2};
  align-items: center;
  width: 100%;
  &:after {
    content: "";
    display: block;
    width: 848px;
  }
`,x=(0,o.Ay)(l.fI)`
  position: relative;
  background-color: ${s.ONy};
  height: 64px;
  width: 100%;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s ease-in-out;
  &:focus {
    background-color: ${s.KxS};
  }
  button {
    z-index: 1;
  }
  ${p.P} {
    color: ${s.vh3};
  }
`;(0,o.Ay)(e=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",...e},r.createElement("path",{d:"M4.61857 3V13H2.75V3H4.61857Z",fill:"currentColor"}),r.createElement("path",{d:"M6.64201 13V3H13.25V4.51856H8.51058V7.2334H12.7967V8.75195H8.51058V13H6.64201Z",fill:"currentColor"})))`
  margin: 12px;
`,o.Ay.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 290px;
  min-width: 0;
`,i(45742),i(48143),i(42257),i(36836);var m=i(56);let f=(0,o.Ay)(m.Z.HeaderActionButton)`
  opacity: 0;
  transform: translateX(16px);
`,y=(0,o.Ay)(p.P)`
  color: ${s.wmS};
  line-height: 16px;
  align-self: center;
  flex-shrink: 0;
  opacity: 1;
`;(0,o.Ay)(m.Z)`
  position: relative;
  z-index: 0;
  &::before {
    transition: all 0.2 ease-in-out;
    opacity: ${e=>{let{$expanded:t}=e;return t?0:1}};
    z-index: -1;
    position: absolute;
    content: "";
    width: calc(100% - 144px);
    height: 100%;
    top: 8px;
    transform: translateX(-50%);
    left: 50%;
    border-radius: 12px;
    border: 1px solid ${s.Tc2};
    background: ${s.ONy};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  }

  &:not(:hover) {
    ${m.Z.CardContent} {
      ${e=>{let{$expanded:t,disabled:i}=e;return!i&&t&&"opacity : 0.5;"}}
    }
  }

  &:hover,
  &:focus,
  &:focus-within,
  &.pseudo-hover {
    ${f} {
      opacity: 1;
      transform: translateX(0);
    }
    ${y} {
      opacity: 0;
    }
  }
`,o.Ay.p`
  padding-bottom: 18px;
  padding-top: 18px;
  color: ${s.ydb};
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  flex-shrink: 0;
  ${e=>{let{$disabled:t}=e;return t&&u.z2}}
`,(0,o.Ay)(m.n)`
  ${e=>{let{$expanded:t}=e;return t&&`border: 1px solid ${s.MfC};`}}
  border-top: none;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
`,o.Ay.div`
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  ${e=>{let{$lr:t}=e;return"left"===t?"right: 0;":"left: 0;"}}
  border-radius: 0px;
  border-top-${e=>{let{$lr:t}=e;return t}}-radius: 12px;
  border-top: 1px solid ${s.MfC};
  border-${e=>{let{$lr:t}=e;return t}}: 1px solid ${s.MfC};
`,(0,o.Ay)(l.In)`
  --icon-size: 16px;
`,i(54734),i(54555),i(43419),i(62825),i(21823),i(62321)},58651:(e,t,i)=>{i.d(t,{A1:()=>p,Tf:()=>l,e2:()=>s,z2:()=>o});var n=i(69670),r=i(39716),a=i(64744);let o=(0,r.AH)`
  pointer-events: none;
  opacity: 0.16;
`,l=(0,r.AH)`
  transition: all 0.24s ease-in-out;
`;r.Ay.div`
  --height: 64px;
  position: sticky;
  top: calc(var(--height) / -2);
  width: var(--height);
  height: var(--height);
  display: flex;
  align-items: center;
  justify-content: center;
`,(0,r.Ay)(a.a)`
  text-transform: uppercase;
`;let s=r.Ay.div`
  border: 1px solid ${n.Tc2};
  border-radius: ${e=>{let{$size:t=100}=e;return`${t}px`}};
  box-shadow: 0px 2px 4px 0px #0000000f;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: ${n.ONy};
  transition: all 0.24s ease-in-out;
  ${e=>{let{$disabled:t}=e;return t&&"pointer-events: none; "}}
  flex-direction: ${e=>{let{$direction:t="row"}=e;return t}};
`,p=r.Ay.h3`
  display: flex;
  align-items: center;
  color: ${n.t14};
  font-family: Outfit;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.002px;
  padding: 0px;
  gap: 8px;
`},37089:(e,t,i)=>{function n(e){return"FieldAccessExpression"===e.type&&("toTable"===e.field||"toString"===e.field)}i(96326),i(51703),i(47831),i(37117),i(45742),i(85170),i(67846);let r=async function(e,t,i){var a;let p,d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=[],{isAssignable:u,isConvertible:g}=await l(e,t.typeHint.signature||[],i.signature);if(u||g){let e=u?t:{type:"CastExpression",expression:t,typeHint:i},n=u||i.signature.some(e=>TypeUtil.isExact(e.facets,IDBlobText));p={type:"PreviousAction",value:e,varRef:"",displayHint:{label:`${t.displayHint.label}`,icon:t.displayHint.icon||"TexturedPreviousActions",description:"Use the result of a previous action",interactions:t.displayHint.interactions},typeHint:e.typeHint,validationStatus:[],children:null,isSafe:n}}else p=null;if(n(t))return p&&c.push(p),c;let x=[],m=null;i.signature.some(e=>TypeUtil.isExact(e.facets,IDBlobText))&&("VarRefExpression"===t.type||t.expression.typeHint.tag===UIAst.TypeHintTag.Multiport)&&(m={type:"PreviousAction",value:{type:"OperatorExpression",op:"error",args:[t],arity:1,displayHint:{label:"Error Message",icon:"TexturedPreviousActions",description:"Check the error on a previous action"},typeHint:textTypeHint},varRef:"",displayHint:{label:"Error Message",icon:"TextOutline",description:"Check the error on a previous action"},typeHint:textTypeHint,validationStatus:[],children:null,isSafe:!0});let f=isIncompleteTabularData(t.typeHint.signature),y=t.typeHint?.signature||[],h=d<4?(await Promise.all(y.map((a=i.signature,async t=>{let i=`${s([t])}-${s(a)}`;return o[i]??=await e.playbookEditor2_GetFieldAccessors(t,a)})))).flat():[],b=[];for(let a of h){let o={type:"FieldAccessExpression",expression:t,field:a.name,displayHint:{label:a.label,icon:a.icon||a.typeHint.typeIcon,description:a.description,interactions:a.typeHint.typeInteractions},typeHint:a.typeHint,validationStatus:[]};if(n(o)&&(u||g)){b=await r(e,o,i,d+1);continue}arrayPushAll(x,await r(e,o,i,d+1))}if(x.length>0&&(!t.typeHint.signature.some(e=>TypeUtil.is(e.facets,IDBlobText)||TypeUtil.is(e.facets,IDEmailAddressIdentifier)||TypeUtil.is(e.facets,IDPhoneNumber)||TypeUtil.is(e.facets,DNumber)||TypeUtil.is(e.facets,DBoolean)||TypeUtil.is(e.facets,DDate))||!u)||m||f){if(b.length>0)for(let e of b)x.unshift(e);m&&x.unshift(m),p&&(u||0===b.length)&&x.unshift({type:"PreviousAction",value:p.value,varRef:"",displayHint:{label:`Entire ${t.typeHint?.typeLabel||"value"}`,icon:t.typeHint?.typeIcon||t.displayHint?.icon||"TexturedPreviousActions",description:"Use the result of a previous action",interactions:t.displayHint.interactions},typeHint:p.typeHint,validationStatus:[],children:null,isSafe:p.isSafe}),c.push({type:"PreviousAction",value:t,varRef:"",displayHint:{label:t.displayHint.label,icon:t.displayHint.icon||"TexturedPreviousActions",description:""},typeHint:t.typeHint,validationStatus:[],children:x,isSafe:!0})}else p&&c.push(p);return c},a={},o={};async function l(e,t,i){let n=`${s(t)} ${s(i)}`;return a[n]??=await e.playbookEditor2_TypeIsAssignable(t,i)}let s=e=>e.map(e=>`${e.facets.join(",")}${e.config?`:${JSON.stringify(e.config)}`:""}`).join("-")},66347:(e,t,i)=>{i(85170)},50854:(e,t,i)=>{i(37117),i(85170)},37117:(e,t,i)=>{i(85170);let n=e=>{switch(e.type){case"ConstantValueExpression":case"FieldAccessExpression":case"VarRefExpression":case"CastExpression":case"BCLFragmentExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"OperatorExpression":case"MissingExpression":case"TableColumnReferenceExpression":return e.displayHint?.label??"";case"ObjectLiteralExpression":return e.fields.map(e=>e.title).join(",");case"ArrayLiteralExpression":return e.elements.map(n).join(",");case"FieldRemappingExpression":return n(e.expression);case"StringTemplatingExpression":return e.children.map(n).join("");case"StringTemplatingTextNode":return e.text;case"StringTemplatingVariableNode":return`\${${n(e.value)}}`;case"StringTemplatingGenerateNode":return`\${generate(${n(e.prompt)})}`;case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return`<${e.element}>${e.children.map(n).join("")}</${e.element}>`;case"StringTemplatingEmbedNode":return`<${e.element}/>`}}},45742:(e,t,i)=>{i.d(t,{$O:()=>O,Af:()=>D,Dz:()=>H,EW:()=>B,Fp:()=>C,HA:()=>$,IJ:()=>V,Ij:()=>h,Iw:()=>S,J9:()=>w,Jz:()=>v,Mv:()=>T,SS:()=>z,Tg:()=>M,UI:()=>U,Uc:()=>E,Vi:()=>b,_f:()=>F,dR:()=>P,dU:()=>_,df:()=>I,hg:()=>L,ie:()=>k,mK:()=>N,qz:()=>A,u5:()=>j,wL:()=>function e(t){switch(t.type){case"ConstantValueExpression":return P(t);case"StringTemplatingExpression":case"OperatorExpression":case"ObjectLiteralExpression":case"FieldAccessExpression":case"VarRefExpression":case"FieldRemappingExpression":case"BCLFragmentExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"TableColumnReferenceExpression":return!1;case"ArrayLiteralExpression":return t.elements.every(e);case"CastExpression":return e(t.expression);case"MissingExpression":return!0}},zu:()=>R});var n,r=i(41917),a=i(74729),o=i(91982),l=i(13489),s=i(52497),p=i(867),d=i(11739),c=i(88236),u=i(53691),g=i(29342),x=i(79382),m=i(44242),f=i(39303),y=i(87757);let h="Ask me every time",b="Custom Text",v="Map fields",$="Multiple values",w="Get from previous actions",A="AI generated text",k="Upload file",E=e=>"PreviousAction"===e.type,S=e=>"Custom"===e.type,C=e=>"ExistingArgument"===e.type;function T(e){let[t]=e.signature;return t&&r.u0(t.facets,a.y)}function I(e){if(!e)return!1;let[t]=e.signature;return t&&r.u0(t.facets,o.J)}let H={moreInfoExpanded:!1,editExpanded:!1,advancedExpanded:!1},N={type:"ConstantValueExpression",validationStatus:[],value:null,typeHint:{tag:l.E.Simple,signature:[{facets:r.X9(s.Y)}],typeLabel:""},displayHint:{label:"",description:""}},O=e=>({type:"ConstantValueExpression",typeHint:e,validationStatus:[],value:p.rV.serialize(),displayHint:{label:" ",description:""}});function P(e){return p.gn.deserialize(e.value).ok}let z=e=>({type:"ArrayLiteralExpression",typeHint:e,elements:[],validationStatus:[],mode:d.Qg.COMBINATIONS}),F=e=>O(e),_=e=>({type:"StringTemplatingExpression",children:[],mimeType:e,typeHint:e?{tag:l.E.Simple,signature:[{facets:r.X9(c.g),config:{mimeType:e}}],typeLabel:"Text",typeIcon:"TextOutline"}:M,validationStatus:[]}),j=r.X9(c.g),M={tag:l.E.Simple,signature:[{facets:j}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value"},R={tag:l.E.Simple,signature:[{facets:r.X9(u.N)}],typeIcon:"WebsiteOutline",typeLabel:"URL",typeDescription:"A URL value"};l.E.Simple;let B={tag:l.E.Simple,signature:[{facets:r.X9(c.g)},{facets:r.X9(g.l)},{facets:r.X9(x.c)},{facets:r.X9(m.bE)}],typeIcon:"CodeOutline",typeLabel:"JSON",typeDescription:"A JSON value"},D=[{label:"String",value:"string",icon:"TextOutline",facets:j},{label:"URL",value:"url",icon:"WebsiteOutline",facets:r.X9(u.N)},{label:"Email",value:"email",icon:"AtSignOutline",facets:r.X9(f.p)},{label:"Phone Number",value:"phone",icon:"MobileOutline",facets:r.X9(y.F)},{label:"Number",value:"number",icon:"OneBold",facets:r.X9(x.c)},{label:"Boolean",value:"boolean",icon:"CheckmarkOutline",facets:r.X9(g.l)},{label:"Date",value:"date",icon:"CalendarOutline",facets:r.X9(m.bE)}],V=D.reduce((e,t)=>(e[t.value]=t,e),{});function L(e){return"VarRefExpression"===e.type&&"argument"===e.referenceType}let U=e=>"CastExpression"===e.type?U(e.expression):e;!function(e){e.isRunning=e=>"running"===e.type,e.getRunning=t=>e.isRunning(t)?t:null,e.isPreparing=e=>"preparing"===e.type,e.isFilling=e=>"filling"===e.type,e.isIdle=e=>"idle"===e.type,e.isPausing=e=>"pausing"===e.type}(n||(n={}))},85170:(e,t,i)=>{i.d(t,{$C:()=>eT,$P:()=>K,BH:()=>eE,BZ:()=>j,Bf:()=>V,Ce:()=>ee,Dl:()=>ei,Jd:()=>X,L7:()=>eC,NI:()=>function e(t){if(!t)return"";switch(t.type){case"ObjectLiteralExpression":return"Table";case"ArrayLiteralExpression":return t.elements.map(e).join(", ");case"CastExpression":case"FieldRemappingExpression":return e(t.expression);case"StringTemplatingExpression":return t.children.map(e).join(" ");case"StringTemplatingTextNode":return t.text;case"StringTemplatingVariableNode":return`[${e(t.value)}]`;case"StringTemplatingGenerateNode":return`[${e(t.prompt)}]`;case"StringTemplatingEmbedNode":return"img"===t.element?"[image]":"";case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return t.children.map(e).join("");case"FieldAccessExpression":return`${e(t.expression)}.${t.displayHint?.label||t.field}`;case"OperatorExpression":if("error"===t.op&&t.args[0])return`${e(t.args[0])}.Error`;return t.displayHint?.label||"";default:return t.displayHint?.label||""}},OO:()=>ek,TC:()=>em,Ui:()=>ef,Ut:()=>J,Vl:()=>ey,WT:()=>ec,ZL:()=>D,a4:()=>ep,fW:()=>eu,gL:()=>ed,i4:()=>eS,j$:()=>Z,lC:()=>eI,lU:()=>q,nE:()=>ea,nO:()=>M,nx:()=>eN,oW:()=>Y,p0:()=>en,qf:()=>G,qn:()=>eH,r6:()=>W,rY:()=>e$,sD:()=>et,sx:()=>_,tP:()=>R,v8:()=>ew,xv:()=>eA,ye:()=>Q}),i(38792),i(6146);var n=i(46288),r=i(39303),a=i(87757),o=i(88236),l=i(41917),s=i(99538),p=i(51952),d=i(91982),c=i(2623),u=i(44242),g=i(79685),x=i(92727),m=i(80906),f=i(16918),y=i(53691),h=i(91159),b=i(94303),v=i(23667),$=i(76418),w=i(62987),A=i(34569),k=i(94975),E=i(29342),S=i(79382),C=i(52497),T=i(36884),I=i(16631),H=i(14744),N=i(13489),O=i(42018),P=i(98380),z=i(9562),F=i(45742);let _=e=>{if((0,F.hg)(e))return"TexturedAskMeEverytime";let t=e;for(;"FieldAccessExpression"===t.type||"CastExpression"===t.type||"FieldRemappingExpression"===t.type;)t=t.expression;return"displayHint"in t&&t.displayHint?.icon?t.displayHint.icon:t.typeHint?.typeIcon?t.typeHint.typeIcon:void 0},j=e=>{let t=e.some(e=>r.p.is(e.facets)),i=e.some(e=>a.F.is(e.facets)),n=e.some(e=>o.g.isExact(e.facets)),s=e.some(e=>l.is(e.facets,o.g));return!!(t||i||n||s)};function M(e){let t=[];return(0,s.bZ)(e,{visitFunctionCallStatement:e=>(t.push(e.index),!0)}),t}function R(e,t){let i=[];return(0,s.bZ)(e,{visitFunctionCallStatement:e=>(i.push(e),!0)}),i[0]?.index===t}let B=e=>e.history[e.activeIndex]?.ast??e.history[0].ast,D=e=>{let t=B(e);return t.trigger?.index??t.statements[0]?.index??0},V=(e,t)=>{let i=e.history.map((i,n)=>n===e.activeIndex?{...i,ast:{...i.ast,...t(i.ast)}}:i);if(!(i.length>0))throw Error("History should never be empty");return{...e,history:i}},L=(e,t,i)=>{let n=i.map(e=>e.name),r=t,a=p.L(e),o=1;for(;n.includes(a);)r=`${t} ${o}`,a=`${e}_${o}`,o++;return{name:a,label:r}},U=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.every(e=>0===e.facets.length)},q=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>d.J.is(e.facets))},G=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>c.h.is(e.facets))},K=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>u.bE.is(e.facets))},X=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(!U(e))return e.find(e=>u.bE.is(e.facets))},W=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>g.D.is(e.facets))},J=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>x.Z.is(e.facets))},Q=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.find(e=>x.Z.is(e.facets));if(!t)return;let i=x.z.decode(t.config);if(i.ok)return i.value},Z=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.find(e=>g.D.is(e.facets));if(!t)return;let i=g.X.decode(t.config);if(i.ok)return i.value},Y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>m.Lc.is(e.facets))},ee=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!U(e)&&e.some(e=>f.G.is(e.facets))},et=e=>{let t=j(e.signature),i=e.signature.some(e=>o.g.isExact(e.facets)),n=e.signature.some(e=>y.N.is(e.facets));return t&&!i&&!n},ei=(e,t,i,n)=>{let{label:r,name:a}=L(e,n?.label||(0,h.xJ)(e),t);return{type:"VarRefExpression",name:a,typeHint:i||{signature:[],typeLabel:"Special"},validationStatus:[],referenceType:"argument",displayHint:{label:r,description:n?.description??"",icon:"TexturedAskMeEverytime"}}},en=e=>{switch(e.type){case"disconnected":return`${e.plugin.name} needs to be connected`;case"internal":return"An internal error has occurred";case"invalid":return e.error.message;case"missing":case"unsupported":case"deprecated":return(0,P.u)(e.error)}};function er(e){let t;return(0,s.Cw)(e,{visitExpression:e=>!(t=e.validationStatus?.find(eo))}),t||null}function ea(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=[],n=(e,t,n,r)=>{eo(e)&&i.push({argumentName:t,argumentLabel:n,statementIndex:r.index,status:e,...b.NM(r)})};return(0,s.b)(e,{visitFunctionCallStatement:i=>{if(!t&&i.index!==e.index)return!1;let r=!1;if((0,s.b)(i,{visitFunctionArgument:e=>{let t=e.validationStatus?.find(eo)??null;t&&(n(t,e.name,e.displayHint?.label,i),r=!0);let a=e.value?er(e.value):null;return a&&(n(a,e.name,e.displayHint?.label,i),r=!0),!0}}),!r)for(let e of i.validationStatus?.filter(eo)??[])n(e,null,void 0,i);return!0},visitIfStatement:i=>{let{conditionExpr:r,index:a}=i;if(!t&&a!==e.index)return!1;let o=er(r);return o&&n(o,"conditionExpr","Condition",i),!0},visitForStatement:i=>{let{iterable:r,index:a}=i;if(!t&&a!==e.index)return!1;let o=er(r);return o&&n(o,"iterable","List",i),!0}}),i}let eo=e=>"error"===b.oN(e)&&"disconnected"!==e.type,el=(e,t)=>{let i=null;return(0,s.bZ)(t,{visitFunctionCallStatement:t=>t.varName!==e||(i=t,!1),visitIfStatement:t=>t.varName!==e||(i=t,!1),visitForStatement:t=>t.varName!==e||(i=t,!1)}),i},es=e=>{let t=new Map;return(0,s.bZ)(e,{visitFunctionCallStatement:e=>(t.set(e.varName,e),!0)}),t},ep=e=>{let t=!1,i=!1;return(0,s.bZ)(e,{visitStatement:e=>(i=!0,!e.comment||(t=!0,!1))}),!i||t},ed=v.D.object({editable:v.D.optional(v.D.boolean,!1),schema:v.D.optional(v.D.object({fields:v.D.array("TabularData Fields",v.D.object({name:v.D.string,type:$.pU,title:v.D.string,struct:v.D.optional(w.M)})).transform(e=>e.filter(e=>e.name))})),schemaType:v.D.optional($.pU),sourceName:v.D.optional(v.D.string),sourceIcon:v.D.optional(A.q$)});function ec(e){return e.length>0&&e.every(e=>{if(!(d.J.is(e.facets)||k.Y.is(e.facets)))return!1;let t=ed.value(e.config);return!t||!t.schema})}function eu(e){return/^__mapping[0-9]+$/.test(e)}let eg=e=>e?.type==="IfStatement",ex=e=>e?.type==="ForStatement";function em(e){if("string"!=typeof e)return e;switch(e){case"boolean":return{facets:l.X9(E.l)};case"date":return{facets:l.X9(u.bE)};case"number":return{facets:l.X9(S.c)};case"string":return{facets:l.X9(o.g)};case"url":return{facets:l.X9(y.N)};case"email":return{facets:l.X9(r.p)};case"phone":return{facets:l.X9(a.F)};default:return{facets:l.X9(C.Y)}}}let ef=()=>({args:[],comment:null,statements:[],trigger:null,plugins:[],errors:[],warnings:[],triggerState:null,meta:{name:"Untitled",description:"",categories:[],commands:[],id:(0,n.A)(),revision:0,author:{avatar:"",name:""},timeCreated:Date.now(),timeModified:Date.now(),creationMode:"blank"},flags:{seen_howtorun:!1},permissions:{owner:!0,write:!0,delete:!0,move:!0,share:!0,edit:!0,results:!0,reown:!0,cow:null},visibilities:["owned"]}),ey=e=>{let t=-1,i=e.trigger?ev(e.trigger,0):null,n=e.args.map(t=>{let i=e.args.filter(e=>e.usedInMapping.includes(t.name)),n=i[0]?.save,r=[],a=!1,o=!1,l=null;return(0,s.bZ)(e,{visitStatement:e=>(l=e,!0),visitIfStatement:e=>((0,s.Cw)(e.conditionExpr,{visitVarRefExpression:i=>(i.name===t.name&&r.push({index:e.index,argName:"CompareAgainst",argLabel:"Compare Against",...b.NM(e)}),!0)}),!0),visitFunctionArgument(e){o=t.struct===w.u.Array;let i=e.value?.type==="ObjectLiteralExpression";return(0,s.Cw)(e.value,{visitObjectLiteralExpression:e=>(e.fields.forEach(e=>{"VarRefExpression"===e.value.type&&e.value.name===t.name&&e.struct===w.u.Array&&(o=!0)}),!0),visitVarRefExpression:n=>(n.name===t.name&&l&&r.push({index:l.index,argName:e.name,argLabel:e.displayHint?.label??e.name,...b.NM(l)}),n.name===t.name&&e.displayHint?.required&&!i&&(a=!0),!0)}),!0}}),{...t,implicitSave:n??null,required:a||t.required,requiredByOtherCommand:a,restricted:!1,usedAsMultipleValueArgument:o,usedInStatementArg:r}}),r=eO(e.statements,n),a={number:1},o={...e,args:n.map(e=>({...e,restricted:!!r[e.name]})),statements:e.statements.map((e,i)=>{let n=ev(e,i,a,t);return e.comment&&t++,n}),trigger:i?.type==="FunctionCallStatement"?{...i,isTrigger:!0}:i,errors:b.ul(e),warnings:b._c(e)},l=o.args.map(e=>e.name),p=es(o);return(0,s.Co)(o,{transformVarRefExpression:e=>{let t=p.get(e.name);if("condition"===e.referenceType){let t=el(e.name,o);if(eg(t))return{...e,displayHint:{...e.displayHint,label:`Condition ${t.actionNumber}`,icon:e.displayHint?.icon??"TexturedPreviousActions",description:e.displayHint?.description??"Condition"}}}if("loop"===e.referenceType){let t=el(e.name,o);if(ex(t))return{...e,displayHint:{...e.displayHint,label:`Loop ${t.actionNumber}`,icon:e.displayHint?.icon??"TexturedPreviousActions",description:e.displayHint?.description??"Condition"}}}return t&&e.displayHint?{...e,displayHint:{...e.displayHint,label:eh(t)}}:l.includes(e.name)&&e.displayHint?{...e,displayHint:{...e.displayHint,icon:"TexturedAskMeEverytime"}}:e}})},eh=e=>{switch(e.type){case"FunctionCallStatement":{if(e.isTrigger)return"Trigger";let t=(0,h.ZH)(e.comment??e.displayHint?.command.expressions[0]??"")||e.name;return`Action ${e.actionNumber}  (${t})`}case"IfStatement":return`Condition ${e.actionNumber}`;case"ForStatement":return`Loop ${e.actionNumber}`;default:return""}},eb=e=>{switch(e.type){case"BlockStatement":return e.children.length>0;case"FunctionCallStatement":return!0;case"IfStatement":return eb(e.ifTrue)||eb(e.ifFalse);case"ForStatement":return eb(e.body);default:return!1}},ev=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{number:0},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1;switch(e.type){case"IfStatement":{let r=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{number:0},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,r=O.x_(e);if(!r)return null;let a=ev(r.wrappedStmt,t,i,n);return"FunctionCallStatement"!==a.type?null:{...a,conditionalExecution:"OpCombination"===r.condition.type?r.condition:{type:"OpCombination",args:[r.condition],combine:"&&"}}}(e,t,i,n);if(r)return r;let a=i.number++,o=eb(e.ifTrue),l=eb(e.ifFalse);return{...e,actionNumber:a,currentBranch:o||!l?"ifTrue":"ifFalse",expanded:!0,ifTrue:ev(e.ifTrue,0,i,n),ifFalse:ev(e.ifFalse,0,i,n)}}case"ForStatement":{let r=i.number++;return{...e,actionNumber:r,expanded:!0,body:ev(e.body,t,i,n)}}case"BlockStatement":let r=n+1;return{...e,children:e.children.map((e,t)=>{let n=ev(e,t,i,r);return e.comment&&r++,n})};case"FunctionCallStatement":return function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return{...e,currentRequest:null,suggestions:T.j.NotAsked,expanded:"expanded"in e&&!!e.expanded,selectedTab:e.args.length>0?"Customize":"Preview",entry:null,columnData:{status:"invalid"},status:"idle",progress:0,progressText:"",actionNumber:t,isTrigger:!1,addonState:{inputFlowState:null,categorizerData:{},confirm:null,loading:!1,categorizerTarget:"",categorizerBucket:null,categorizerQuestions:null,inlineWritingAssistant:null},validationError:ea(e)[0]??null,groupIndex:i,isGroupCardOpen:!1,conditionalExecution:null}}(e,i.number++,n)}};function e$(e){for(let t of e.signature){if(l.is(t.facets,l.X9(y.N)))return"url";let e=function(e){if(l.u0(e.facets,l.X9(o.g)))return o.i.value(e.config)}(t);if(e&&e.mimeType){if("text/plain"===e.mimeType)return"plain";if("text/html"===e.mimeType||"text/markdown"===e.mimeType)return"html";if("application/json"===e.mimeType)return"json"}}return null}function ew(e,t){switch(e.type){case"StringTemplatingExpression":return e;case"ConstantValueExpression":{let i=o.g.deserialize(e.value,new I.SP);if(!i.ok)return{type:"StringTemplatingExpression",children:[eI([eH("")])],mimeType:null,typeHint:F.Tg};{let e;H.hR(i.value,o.g);let n=i.value.toString();return e="text/html"===i.value.mimeType?"html":e$(t),{type:"StringTemplatingExpression",children:[eI([eH(n)])],mimeType:e,typeHint:F.Tg}}}default:return{type:"StringTemplatingExpression",children:[eI([eN(e)])],mimeType:null}}}let eA=(e,t)=>e.length>t?e.slice(0,t)+"...":e;function ek(e,t,i){return{_id:`blob.artifact=${e}`,_types:["blob.artifact","wcontext","blob","indexable","object"],_integration:{factoryId:"075c62a7-9e2f-478e-b0c6-d5fe981914bc",instanceId:"075c62a7-9e2f-478e-b0c6-d5fe981914bc-sgt",name:"Utilities",version:"1.0.0"},name:t,mimeType:i,uploadedAt:Date.now()}}let eE=e=>e?e.meta.name:"Start from blank canvas";function eS(e,t){return[...e.map(e=>{let i=t.find(t=>t.title===e.title);return i?{...i,typeHint:i.typeHint&&e.typeHint?{...i.typeHint,signature:[...i.typeHint.signature,...e.typeHint.signature]}:void 0}:e}),...t.filter(t=>!e.find(e=>e.title===t.title))]}function eC(e,t){let i=e.findIndex(e=>e.title===t.title);return -1===i?[...e,t]:e.map((e,n)=>n===i?t:e)}function eT(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return e.map(e=>{let i=function(e){if("string"!=typeof e)return{tag:N.E.Simple,signature:[e],typeIcon:"PencilOutline",typeLabel:"Custom"};{let t=F.IJ[e];return{tag:N.E.Simple,signature:[{facets:t?.facets??[]}],typeIcon:t?.icon,typeLabel:t?.label??""}}}(e.type||t);return{name:e.name,title:e.title,struct:e.struct||w.u.Scalar,typeHint:i,validationStatus:[],value:e.struct===w.u.Array?(0,F.SS)(i):{...(0,F.$O)(i),displayHint:{label:"",description:"",icon:i.typeIcon}}}})}function eI(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:e,validationStatus:[],...t}}function eH(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingTextNode",text:e,format:{},validationStatus:[],...t}}function eN(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingVariableNode",value:e,join:null,defaultValue:null,format:{},validationStatus:[],...t}}let eO=(e,t)=>{let i={};for(let n of t){let t=(0,z.l)(n,e);i[n.name]=t}return i}},61462:(e,t,i)=>{i.d(t,{w:()=>y});var n=i(14041),r=i(46288),a=i(36213),o=i(72194),l=i(77956),s=i(51156),p=i(45742),d=i(85170),c=i(11778),u=i(48143),g=i(28926),x=i(66712),m=i(18016),f=i(54439);let y=n.memo(e=>{let{expr:t,onChange:i,argContext:y,suffix:h,autoFocus:b,onOpenChanged:v,isPbArgument:$,parentIsArray:w,readonly:A}=e,{validationStatus:k=[]}=t,E=(0,x.k)(),{featureFlags:{v4MiniEnabled:S}}=(0,u.rD)(),C=k.filter(e=>"internal"!==e.type||"error"===e.severity).length>0,T=y.typeHint,I=(0,c.c)(),H=(0,u.jL)(),N=n.useCallback(e=>{if((0,p.Iw)(e))switch(e.displayHint?.label){case p.ie:{let e=document.createElement("input");e.type="file",e.onchange=async e=>{let t=e.target;if(!(t instanceof HTMLInputElement))return;let n=t.files?.[0];if(n)try{let e=(0,r.A)(),t=n.type||"application/octet-stream";if(!(await fetch(`https://blob.bardeen.ai/artifact/${e}`,{method:"PUT",body:n,headers:{"Content-Type":t}})).ok)throw Error("Failed to upload artifact");let a={type:"ConstantValueExpression",value:(0,d.OO)(e,n.name,t)};i(a)}catch(e){H({type:"App/ErrorNotified",bardeenError:a.sF.from(e).toJSON()})}},e.click();return}case p.Ij:{let e=(0,d.Dl)(y.argName,E.playbookArgs,y.typeHint,y.options?.fieldMappingMode?void 0:y.displayHint);E.onPlaybookArgCreate(e,y.displayHint,!1),i(e);return}case p.Vi:{let e=(0,d.sD)(y.typeHint),t=(0,p.dU)((0,d.rY)(y.typeHint)),n={type:"CastExpression",expression:t,typeHint:y.typeHint};i(e?n:t);return}case p.J9:return;case p.Jz:i((0,m.r)());return;case p.HA:i((0,p.SS)(y.typeHint));return;default:return}else(0,p.Fp)(e)?i(e.value):(0,p.Uc)(e)?i(e.value):i(e)},[y.argName,y.displayHint,y.options?.fieldMappingMode,y.typeHint,E,i,H]),O="ConstantValueExpression"===t.type&&typeof t.value,P=n.useCallback(e=>{i(null==e?null:{type:"ConstantValueExpression",value:e},O===typeof e)},[i,O]),z=n.useCallback(e=>y.fetchSuggestions(e,y.typeHint.signature),[y]),F=n.useCallback(e=>{v?.(e),e?(y.fetchSuggestions("",y.typeHint.signature),y.fetchPreviousActions()):y.resetSuggestions()},[y,v]),_=n.useCallback(e=>y.fetchSuggestions(e,y.typeHint.signature,{forceRefreshCache:!0}),[y]),j=n.useCallback(()=>i(null),[i]),M=n.useCallback(e=>{e.stopPropagation(),i(null)},[i]),R=n.useCallback(e=>{H({type:"App/ErrorNotified",bardeenError:e})},[H]);if(!I)return null;let B=n.createElement(s.t,{autoFocus:b,value:"ConstantValueExpression"===t.type?t.value:null,excludeGetFromPreviousActions:y.options?.excludeGetFromPreviousActions,excludeAskMeEveryTime:y.options?.excludeAskMeEveryTime,fieldMappingMode:y.options?.fieldMappingMode,excludeStringTemplating:y.options?.excludeStringTemplating,excludeFieldMapping:y.options?.excludeFieldMapping,excludeUploadFile:y.options?.excludeUploadFile,onQueryChange:z,onOpenChanged:F,onRefresh:_,onSelect:N,suggestions:y.suggestions,signature:y.typeHint.signature},n.createElement(l.T,{isPbArgument:$,"aria-label":`Select value for ${y.argName}`,expr:t,onClear:A?void 0:j,variant:C?"danger":"default",suffix:h,rightAddon:w?n.createElement(g.Jn,{variant:"flat",size:"m",icon:"CrossOutline",tooltipText:"Remove",onClick:M}):void 0})),D=(0,f.d)(T.signature),V=null;if(D){if(D.mode===o.c.UIAst){let e=D.Component;V="ConstantValueExpression"===t.type||"ObjectStorageReferenceExpression"===t.type?n.createElement(e,{value:t,onChange:i,api:I,onError:R,isMiniUI:S}):null}else{let e=D.Component;V="ConstantValueExpression"===t.type?n.createElement(e,{isMiniUI:S,value:t.value,onChange:P,displayHint:t.displayHint}):null}}return n.createElement(g.fI,{gap:16,center:!0,"data-testid":"value-picker",style:{width:"100%"}},D&&D.needsDropdown&&V?n.createElement(g.VP,{gap:8,style:{width:"100%"}},B,V):V||B)})},20220:(e,t,i)=>{i(14041),i(72865),i(48143),i(28926),i(20120)},54439:(e,t,i)=>{i.d(t,{d:()=>c});var n=i(97552),r=i(72194),a=i(48259),o=i(21787),l=i(7731),s=i(53631),p=i(27703);let d={[n.d.typeName]:{mode:r.c.Simple,Component:p.P},[a.W.typeName]:{mode:r.c.Simple,Component:s.r},[o.A.typeName]:{mode:r.c.Simple,Component:l.c}};function c(e){for(let t of e)for(let e of t.facets){let t=d[e];if(t)return t}}},74112:(e,t,i)=>{i.d(t,{Ur:()=>F});var n=i(69670);i(88098),i(38792);var r=i(14041),a=i(39716),o=i(21769),l=i(36884),s=i(117);i(54538);var p=i(48143);i(57972),i(5855),i(93510),i(11880),i(19431),i(10777);var d=i(28926);i(48603),i(80389),i(47856);var c=i(67469),u=i(12171);i(54734);var g=i(67331);(0,a.Ay)(d.In)`
  position: absolute;
  top: ${e=>{let{$position:t}=e;return"top"===t?"unset":"55%"}};
  bottom: ${e=>{let{$position:t}=e;return"top"===t?"-32px":"unset"}};
  left: ${e=>{let{$position:t}=e;return"right"===t?"-32px":"unset"}};
  right: ${e=>{let{$position:t}=e;return"left"===t?"-32px":"unset"}};
`;let x=(0,a.Ay)(d.VP)`
  pointer-events: none;
  opacity: ${e=>{let{$noHover:t}=e;return t?1:0}};
  z-index: ${e=>{let{$noHover:t}=e;return t?0:-1}};

  position: ${e=>{let{$noHover:t}=e;return t?"relative":"absolute"}};
  max-width: 300px;
  margin-bottom: 32px;

  transform: translate(
    ${e=>{let{$position:t,$noHover:i}=e;return i?"0":"left"===t?"-260px":"0px"}},
    ${e=>{let{$noHover:t}=e;return t?"0":"-45%"}}
  );

  transition: all 0.3s ease-in-out;
`;(0,a.Ay)(g.H2)`
  font-family: Caveat;
  font-weight: 700;
  text-align: center;
`,a.Ay.div`
  align-self: center;
  display: flex;
  transition: all 0.24s ease-in-out;
  padding: 8px;
  gap: 8px;

  ${e=>{let{$isOver:t,$isActive:i}=e;return i&&`
    background: ${n.o_k};
    outline: 2px ${t?"solid":"dashed"} ${n.IVJ};
    border-radius: 8px;
  `}}
`,a.Ay.div`
  display: inline;

  &:hover {
    > ${x} {
      opacity: 1;
      z-index: 0;
      transform: ${e=>{let{$position:t}=e;return"left"===t?"translate(-360px, -45%)":"translate(100px, -45%)"}};
    }
  }
`,i(26572),i(77620),i(56),(0,a.Ay)(e=>r.createElement("svg",{width:20,height:12,viewBox:"0 0 20 12",xmlns:"http://www.w3.org/2000/svg",...e},r.createElement("circle",{cx:"10",cy:"1",r:"0.7",stroke:"transparent",fill:"var(--color)"}),r.createElement("line",{x1:"10",y1:"1",x2:"20",y2:"10"}),r.createElement("line",{x1:"10",y1:"1",x2:"0",y2:"10"}),r.createElement("line",{x1:"1.5",y1:"9.5",x2:"18.5",y2:"9.5",stroke:"white",strokeWidth:1}),r.createElement("line",{x1:"0",y1:"10.5",x2:"20",y2:"10.5",stroke:"white",strokeWidth:1})))`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -10px;
  --width: 16px;
  --color: ${n.NcT};
  --stroke-width: 1.4px;
  stroke: var(--color);
  stroke-width: var(--stroke-width);
  fill: var(--color);
`,i(65069),i(45742);var m=i(85170);i(42014),i(1727),i(62825);var f=i(58651);(0,a.Ay)(g.P)`
  ${f.Tf}
  color: ${n.vh3};
  flex-grow: 1;
  align-self: center;
  font-weight: 500;
  line-height: 28px;
`,(0,a.Ay)(d.VP)`
  padding: 16px;
  background-color: ${n.o$k};
  padding: 36px;
  padding-inline: 44px;
  padding-bottom: 48px;
`,(0,a.Ay)(d.aF)`
  width: 100%;
  max-width: 720px;
  border: 2px solid ${n.NcT};
`,i(43419);var y=i(18299);r.memo(function(e){let{argument:t,dispatch:i,suggestions:n,statementIndex:a,addonState:o,isAutobook:l,showBackButton:p}=e,c=(0,s.i8)(i,"AddonAction"),u=(0,r.useCallback)(()=>i({type:"Sequence/PreviousArgument",currentName:t.name}),[t.name,i]),g=(0,r.useCallback)(e=>i({type:"Sequence/ArgumentUpdate",arg:e}),[i]),x=(0,r.useCallback)(e=>i({type:"Sequence/ArgumentSave",arg:e}),[i]),m=(0,r.useCallback)(()=>i({type:"Sequence/SkipArgument",arg:t}),[i,t]),f=r.useCallback((e,n,r)=>{i({type:"ArgumentFilling/RequestSuggestions",reqParams:{argumentName:t.name,typeSignature:r,userInput:e,forceRefreshCache:n,isPlaybookArgument:!0,pbArgumentsOnly:!1}})},[i,t]);return r.createElement(d.VP,null,r.createElement(y.L,{addonState:o,key:t.name,isAutobook:l,addonDispatch:c,onChange:g,onFetchSuggestions:f,onSave:x,onSkip:m,value:t,suggestions:n,statementIndex:a,showSaveButtons:!0,onBack:p?u:void 0}))}).displayName="PlaybookArgumentForm",i(93269),(0,a.Ay)(g.H3)`
  overflow-wrap: anywhere;
  color: ${n.t14};
`,(0,a.Ay)(g.a)`
  box-sizing: content-box;
  max-width: 100%;
  max-height: 240px;
  overflow: auto;
`,a.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&f.z2}}
  margin-bottom: 32px;
  margin-top: 20px;
  padding-inline: 64px;
  width: 100%;
  max-width: 848px;
`,a.Ay.div`
  padding: 0;
  display: flex;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`,i(37089),i(50854),a.Ay.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 32px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;
`,(0,a.Ay)(g.H3)`
  margin-bottom: 16px;
  text-align: center;
`,(0,a.Ay)(g.P)`
  text-align: center;
  margin-bottom: 24px;
  color: ${n.ui$};
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${e=>{let{$error:t}=e;return t?n.P0$:n.KxS}};
  border-radius: 8px;
  width: 100%;
`,a.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,(0,a.Ay)(g.P)`
  font-weight: 500;
  color: ${n.Xi8};
`,(0,a.Ay)(d.fI)`
  margin-top: 32px;
  justify-content: center;
  margin-bottom: 24px;
`,a.Ay.div`
  width: 48px;
  height: 48px;
  background-color: ${n.hi1};
  border-radius: 8px;
  position: relative;
`,(0,a.Ay)(d.z9)`
  position: absolute;
  top: -50%;
  left: 50%;
`,i(51402),i(30665),i(67846),i(98380),i(24760),a.Ay.a`
  display: flex;
  gap: 16px;
  overflow: hidden;
  margin: -11px -16px;
  padding: 11px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  p {
    color: ${e=>{let{$vectorized:t}=e;return t?n.wdA:n.ui$}};
  }
  &:hover p {
    color: ${n.t14};
  }
`;let h=a.Ay.div`
  opacity: 0;
  transition: all 0.24s ease-in-out;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 22px;
`;a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${n.KE7};
  ${e=>{let{$vectorized:t}=e;return t&&`
    color: ${n.JIy};
  `}}
  &:hover {
    color: ${n.CCs};
  }
`,a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${n.ydb};
  ${e=>{let{$vectorized:t}=e;return t&&`
    color: ${n.Tc2};
  `}}
  &:hover {
    color: ${n.wmS};
  }
`,a.Ay.div`
  display: flex;
  gap: 8px;
  color: ${n.b_I};
  align-items: center;
`;var b=i(42351);i(71378);let v=(0,a.Ay)(b.U)`
  flex-shrink: 0;
  fill: currentColor;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  margin-left: auto;
  font-size: 16px;
  color: ${n.ui$};
  &:hover {
    color: ${n.t14};
    transform: scale(1.1);
  }
`,$=(0,a.Ay)(d.fI)`
  opacity: 0;
  margin: -8px;
  transition: opacity 0.2s ease-in-out;
`;a.Ay.div`
  display: flex;
  --icon-size: 16px;
  background-color: ${n.ONy};
  border-radius: 8px 8px 0 0;
  border: 1px solid ${e=>{let{$error:t}=e;return t?n.MEI:n.Tc2}};
  border-bottom: none;
  width: 100%;
  padding: 10px 16px;
  align-items: center;
  height: 48px;
  margin-right: 3px;
  &:hover {
    ${$} {
      opacity: 1;
    }
    ${v} {
      opacity: 1;
    }
  }
`,(0,a.Ay)(g.P)`
  color: currentColor;
  ${e=>{let{$disabled:t}=e;return t&&(0,a.AH)`
      cursor: default;
      &:hover {
        color: inherit;
      }
    `}}

  &:hover {
    color: ${n.t14};
  }
`,(0,a.Ay)(g.P)`
  flex: 1;
  display: flex;
  align-items: center;
  text-align: start;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
`;let w=a.Ay.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(to right, transparent, ${n.ONy} 60px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 64px;
  padding-inline-end: 6px;
`;a.Ay.div`
  overflow: hidden;
  height: 100%;
  border: 1px solid ${n.Tc2};
  border-radius: 8px;
  background-color: ${n.o$k};
  display: flex;
  flex-direction: column;
`,a.Ay.div`
  min-width: 100%;
  overflow: auto;
  position: relative;
  flex: 1;

  /* Ensure proper positioning context for sticky elements */
  isolation: isolate;

  /* Webkit scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${n.o$k};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${n.NcT};
    border-radius: 4px;
  }

  /* Firefox scrollbar styles */
  overscroll-behavior: contain;
`,a.Ay.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  background: ${n.hi1};

  col:not(.row-number-col):not(.action-col) {
    min-width: 224px;
  }

  --table-border-color: ${n.Tc2};
  --table-header-color: ${n.ONy};

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th {
    background-color: var(--table-header-color);
  }

  .last-statement-column {
    border-right: 3px solid var(--table-border-color);
  }
  .last-statement-column + td:not(.action-cell) {
    border-left: 1px solid var(--table-border-color);
  }
  th:not(.statement-header):not(.column-number-count):not(.row-number-clear-selection) {
    color: ${n.vh3};
    font-weight: 500;
    text-align: left;
    padding: 14px 16px;
    border-bottom: 1px solid var(--table-border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
    border-right: 1px solid var(--table-border-color);
  }

  .row-number-clear-selection {
    color: ${n.vh3};
    font-weight: 500;
    text-align: left;
    border-bottom: 1px solid var(--table-border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
    vertical-align: middle;
  }

  .column-number-count {
    border-bottom: 1px solid var(--table-border-color);
    border-right: 1px solid var(--table-border-color);
    text-align: center;
    font-weight: 400;
    padding: 4px 16px;
    color: ${n.wmS};
    vertical-align: middle;
    text-align: start;
  }

  .tabs-row {
    .statement-header {
      padding-top: 4px;
      background-color: ${n.hi1};
      vertical-align: bottom;

      &:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        vertical-align: middle;
      }
      &:last-child {
        text-align: center;
        background-color: ${n.hi1};
        position: sticky;
        right: 0;
        z-index: 1;
      }

      .statement-header-container {
        position: sticky;
        left: 60px;
        max-width: 364px;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 4px;
        border-bottom: 1px solid var(--table-border-color);
      }
    }
  }

  th:last-child {
    border-right: none;
  }

  .last-statement-column {
    border-right-width: 4px !important;
  }
  td {
    &.vectorized {
      color: ${n.wdA};
    }
    --icon-size: 16px;
    position: relative;
    padding: 12px 16px;
    border-bottom: 1px solid var(--table-border-color);
    border-right: 1px solid var(--table-border-color);
    color: ${n.ui$};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: var(--row-background-color);
    line-height: 20px;
    font-size: 14px;
    letter-spacing: 0.1px;
    max-width: 280px;
    vertical-align: middle;
  }
  .action-cell {
    position: sticky;
    right: 0;
    overflow: visible;
    background-color: transparent;
    &.placeholder {
      background-color: ${n.hi1};
    }
  }
  tr {
    --row-background-color: ${n.o$k};
    --row-text-color: ${n.wmS};
    --row-hover-background-color: ${n.KxS};
    --row-hover-text-color: ${n.t14};

    transition: background 0.24s ease-in-out;
    position: relative;

    color: var(--row-text-color);

    td {
      background-color: var(--row-background-color);

      &[data-empty] {
        --row-background-color: ${n.hi1};
      }
    }

    &:focus,
    &:hover {
      td:not(.row-number):not(.row-collapse) {
        transition: background-color 0.24s ease-in-out;
        color: var(--row-hover-text-color);
        background-color: var(--row-hover-background-color);

        &:nth-last-child(2) {
          border-right: none;
        }
      }

      ${w} {
        opacity: 1;
      }
      ${h} {
        background: linear-gradient(to right, transparent, ${n.KxS} 18px);
        opacity: 1;
      }
    }

    &:last-child td {
      border-bottom: none;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid ${n.NcT};
      z-index: 1;
      pointer-events: none;
      opacity: 0;
    }

    &.selected {
      &::after {
        opacity: 1;
      }

      .row-number {
        border-left: 2px solid ${n.NcT};
      }

      &.next-selected {
        &::after {
          border-bottom-width: 1px;
          border-bottom-style: dashed;
        }
      }
      &.previous-selected {
        &::after {
          border-top-width: 1px;
          border-top-style: dashed;
        }
      }
    }
    &.row-span-collapsable {
      .row-collapse {
        cursor: pointer;
      }
      td {
        padding: 4px 16px;
        color: ${n.ydb};
        font-size: 10px;
        line-height: 12px;
        background-color: ${n.hi1};

        &:last-child {
          border-right-width: 4px;
        }
      }
    }
  }
  .sticky-cell {
    width: 60px;
    min-width: 60px;
    text-align: center;
    background-color: var(--table-header-color);
    position: sticky;
    left: 0;
    z-index: 1;
    border-right: 1px solid var(--table-border-color);
  }

  .column-header {
    margin-right: 2px;
    .column-header-title {
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    button {
      opacity: 0;
    }
    &:hover,
    &:focus {
      button {
        opacity: 1;
      }
    }
  }

  .sticky-content-cell {
    div {
      left: 0;
      z-index: 1;
    }
  }

  .row-number {
    cursor: pointer;
    transition: background-color 0.24s ease-in-out;
    color: ${n.ydb};
    &.placeholder {
      cursor: default;
    }
    &:hover:not(.placeholder) {
      color: ${n.t14};
      background-color: ${n.KxS};
    }
  }
`,a.Ay.div`
  height: 40px;
  background: ${n.MfC};
  width: 1px;
  flex-shrink: 0;
`,(0,a.Ay)(d.fI)`
  gap: 4px;
  background-color: ${n.hi1};
  padding: 4px;
  position: relative;
  justify-content: flex-end;
  &::before {
    content: "";
    position: absolute;
    right: 100%;
    height: 100%;
    width: 40px;
    background: linear-gradient(to right, transparent, ${n.hi1} 32px);
    pointer-events: none;
  }
`;let A={rowSpan:1,data:{data:{type:"empty",error:null,vectorized:!1,reason:"no-data",colSpan:1}},isPlaceholder:!0};Array.from({length:20},()=>A),(0,a.Ay)(d.fI)`
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding-inline-start: 20px;
  padding-inline-end: 8px;
  height: 52px;
  border-bottom: 1px solid ${n.Tc2};
  gap: 16px;
  background-color: ${n.hi1};
`,a.Ay.div`
  overflow: auto;
  & > * {
    border-bottom: 1px solid ${n.Tc2};
  }
`,(0,a.Ay)(d.VP)`
  transition:
    width 0.24s ease-in-out,
    opacity 0.24s ease-in-out;
  width: ${e=>{let{open:t}=e;return t?"320px":"0"}};
  opacity: ${e=>{let{open:t}=e;return t?"1":"0"}};
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${n.Tc2};
  background-color: ${n.ONy};
`;let k=(0,a.Ay)(d.VP)`
  transition: all 0.24s ease-in-out;
  border-radius: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;(0,a.Ay)(d.fI)`
  cursor: pointer;
  padding: 8px 20px;
  background: ${n.o$k};
  justify-content: center;
  --icon-color: ${n.e30};
  ${e=>{let{$disabled:t}=e;return t&&`
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    `}}
  &:hover {
    --icon-color: ${n.b_I};
    ${k} {
      background: ${n.KxS};
    }
  }
`;let E=(0,a.Ay)(d.fI)`
  gap: 8px;
  flex-shrink: 0;
  transition: all 0.24s ease-in-out;
  justify-self: flex-end;
  --icon-color: ${n.b_I};
  opacity: 0;
  background: ${n.KxS};
  position: absolute;
  right: 1px;

  &:before {
    content: "";
    position: absolute;
    left: -18px;
    width: 18px;
    top: 0;
    bottom: 0;
    background: linear-gradient(to right, transparent, ${n.KxS} 18px);
  }
`;(0,a.Ay)(d.fI)`
  position: relative;
  padding: 0 12px 0 20px;
  align-items: center;
  gap: 16px;
  height: 48px;
  color: ${n.vh3};
  transition: all 0.24s ease-out;

  ${e=>{let{$sortable:t}=e;return t&&`
    cursor: grab;
    user-select: none;
  `}}
  ${e=>{let{$error:t}=e;return t&&`
    outline: 1px solid ${n.MEI};
    outline-offset: -1px;
  `}}
  &:hover {
    background: ${n.KxS};
    color: ${n.t14};
    --color: ${n.t14};
    ${E} {
      opacity: 1;
    }
  }
  ${e=>{let{$warning:t}=e;return t&&`
    outline: 1px solid ${n.O$e};
    outline-offset: -1px;
  `}}
`,(0,a.Ay)(d.Uq)``,(0,a.Ay)(d.ke)`
  padding: 8px 16px;
`,a.Ay.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: ${n.o_k};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${e=>{let{$progress:t}=e;return 100*t}}%;
    background: ${n.NcT};
    transition: width 0.3s ease-out;
  }
`,(0,a.Ay)(d.fI)`
  flex-shrink: 0;
  width: 20px;
  justify-content: center;
  align-items: center;
`,(0,a.Ay)(g.P).attrs({$small:!0,$bold:!0,$ellipsis:!0,$color:"inherit"})``,(0,a.Ay)(d.VP)`
  margin: 22px 20px;
  height: calc(100% - 22px);
  overflow: hidden;
  position: relative;
`,(0,a.Ay)(d.XI)`
  th {
    display: none;
  }
  td {
    background-color: ${n.o$k};
    overflow: visible;
    text-wrap: initial;
    max-width: 500px;
    vertical-align: baseline;
  }
  td:nth-child(1) {
    background-color: ${n.ONy} !important;
    font-weight: 500;
    color: ${n.vh3} !important;
  }
  tr {
    --row-hover-background-color: unset;
    --row-hover-text-color: unset;

    ${e=>{let{$noBotRadius:t}=e;return t&&(0,a.AH)`
        &:last-child td {
          border-bottom: 1px solid ${n.Tc2};
        }
      `}}

    &.with-error {
      td {
        background-color: ${n.P0$} !important;
      }
    }
  }

  ${e=>{let{$noTopRadius:t}=e;return t&&(0,a.AH)`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}}
  ${e=>{let{$noBotRadius:t}=e;return t&&(0,a.AH)`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}}
`,i(21714);var S=i(32021);i(50278),i(8432);var C=i(36836),T=i(99676);(0,a.Ay)(function(e){let{completedSteps:t,totalSteps:i,children:n,onPause:a,...o}=e;return r.createElement(u.e2,o,r.createElement(d.$n,{icon:"RadioPauseBold",size:"l",round:!0,variant:"primary",tooltipText:"Pause",onClick:a}),r.createElement(T.z,{"aria-label":"execution progress",value:i>0?t/i:0}))})`
  width: 306px;
`,(0,a.Ay)(function(e){let{children:t,...i}=e;return r.createElement(u.e2,i,r.createElement(d.In,{icon:"RadioCheckmarkBold",size:20,color:n.XxH}),r.createElement(I,null,t))})`
  width: 306px;
  height: 56px;
  justify-content: center;
  gap: 12px;
  & > ${d.In} {
    animation: ${(0,a.i7)`
      0% {
        opacity: 0;
        height: 8px;
        width: 8px;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    `} 0.8s ease-in-out forwards;
  }
`;let I=a.Ay.p`
  color: ${n.XxH};
  font-family: Inter;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.1px;
  text-align: center;
  vertical-align: middle;
`;(0,a.Ay)(d.fI)`
  align-items: center;
  gap: 16px;
  flex-grow: 1;
`,(0,a.Ay)(d.fI)`
  align-items: center;
  display: flex;
  gap: 20px;
  margin-inline-start: 16px;
  flex-shrink: 0;
`,(0,a.Ay)(d.fI)`
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-width: 150px;
`,(0,a.Ay)(d.h$)`
  animation: 0.3s ease-in-out fadeIn;
  width: 100%;
  max-width: 720px;
`,(0,a.Ay)(C.w)`
  font-size: 14px;
  font-weight: 500;
  color: ${n.CP};

  ${d.In} {
    flex-shrink: 0;
    ${e=>{let{disabled:t}=e;return t&&f.z2}}
  }
  &:hover {
    color: ${n.t14};
    --icon-color: ${n.t14};
  }
`,(0,a.Ay)(S.H.Divider)`
  height: 65px;
`;var H=i(93754),N=i(6025);i(48266),(0,a.Ay)(f.e2)`
  margin-right: 16px;
`,(0,a.Ay)(d.$n)`
  --icon-color: ${n.KE7};
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    --icon-color: ${n.KE7};
  }
`,a.Ay.div`
  padding: 16px;
`,a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${n.Xi8};
  margin: 0 0 16px 0;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,a.Ay.div`
  width: 100%;
`,(0,a.Ay)(d.Sc)`
  width: 100%;

  span {
    color: ${n.CP};
    font-size: 14px;
    line-height: 1.4;
  }
`,i(53747),a.Ay.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`,a.Ay.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
`;let O=(0,a.Ay)(g.P)`
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.001px;
  width: 100%;
`;a.Ay.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
  ${g.H6} {
    color: var(--title-color);
  }
  ${g.P} {
    color: var(--title-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ${O} {
    color: var(--description-color);
  }
`;let P=(0,a.Ay)(d.$n)`
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`;a.Ay.div`
  --title-color: ${n.vh3};
  --description-color: ${n.ui$};
  display: flex;
  cursor: pointer;
  gap: 20px;
  padding: 16px 20px 16px 24px;
  align-items: flex-start;
  padding: 16px 32px 16px 24px;
  border-bottom: 1px solid ${n.Tc2};
  background: ${n.o$k};
  transition: background 0.24s ease-in-out;
  &:hover {
    background: ${n.KxS};
    --title-color: ${n.t14};
    --description-color: ${n.b_I};
  }
`,a.Ay.div`
  position: relative;
  &:hover {
    ${P} {
      opacity: 1;
    }
  }
`;let z=(0,a.AH)`
  --icon-color: ${n.KE7};
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    --icon-color: ${n.KE7};
  }
`;function F(e){let t=e.ast?(0,m.Vl)(e.ast):(0,m.Ui)(),i=(0,m.Ui)(),n="my"===e.from||"rightClickMenu"===e.from||"resume"===e.from,r={runCompletedId:null,miniViewState:{rowBodyState:null,selectedRowsIndices:[],expandedRowIndices:[],sidebarOpen:!0},loadingStatus:e.loadingStatus??null,previousActions:[],origin:{from:e.from??"blank",initPlaybook:e.ast?(0,m.Vl)(e.ast):null,lastDescribedPlaybook:(0,m.a4)(t)?t:null,trackInvocationWhenSaved:e.trackInvocationWhenSaved??!0},testModeEnabled:!n&&"results"!==e.from,resultsFromTestMode:!1,confirmState:null,activeIndex:0,scrollTop:0,history:[{prompt:(0,m.BH)(e.ast),generatedPlaybook:i,ast:t}],cardEditorState:null,argumentFillingState:{addonState:c.ue,currentRequest:null,suggestions:l.j.NotAsked},pbHeaderVisible:!1,missingPluginsModal:null,sequencingStatus:{type:"idle"},playbookArgsState:H.ue,reportIssueState:N.f,searchOpen:!1,searchValue:"",searchSuggestions:[],searchSelectedIndex:-1,savedInputsMenuOpen:!1,runHistory:[],partialState:{},sidebarMemory:{uncheckedExportStatement:null,uncheckedTriggerStatement:null}};return{...r,sequencingStatus:e.runRecordId?{type:"running",postRunActions:[],executionId:(0,o.A)(),runRecordId:e.runRecordId,statementIndex:(0,m.ZL)(r),statementProgress:0,startedStatements:[(0,m.ZL)(r)],finishedStatements:[],totalStatementsCount:(0,m.nO)(t).length,runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}:{type:"idle"}}}(0,a.Ay)(d.$n)`
  ${e=>{let{$error:t}=e;return t&&z}}
`,(0,a.Ay)(d.IU).attrs({disabled:!0})``,a.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,a.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`,a.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&u.z2}}
  flex: 1;
  display: flex;
  align-items: center;
`,a.Ay.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`,a.Ay.div`
  background: linear-gradient(180deg, #fff 49%, rgba(255, 255, 255, 0) 100%);
  align-items: center;
  display: flex;
  padding: 32px;
  width: 100%;
  ${d.lM} {
    [role="switch"] {
      gap: 16px;
    }
  }
`,a.Ay.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 24px;
  justify-content: flex-end;
  margin-inline-start: 16px;
`,(0,a.Ay)(d.lM)`
  font-size: 15px;
  padding-right: 18px;
  font-weight: 500;
`,a.Ay.div`
  font-size: 12px;
  font-weight: 500;
  min-width: 20px;
  color: ${e=>e.$active?n.t14:n.ui$};
`,(0,a.Ay)(function(e){let t=(0,p.jL)(),{trigger:i,pbId:n,from:a,disabled:o,...l}=e;return i?.status!=="running"&&i?.status!=="pending"?null:r.createElement(d.lM,{...l,disabled:o,label:i?.status==="running"?"Active":"Pending",checked:i?.status==="running"||i?.status==="pending",onChange:()=>t({type:"App/AutobookToggleClicked",pbId:n,from:a}),size:"m"})})`
  background-color: ${n.IhC};
  border-radius: 20px;
  padding: 10px 17px;
  border: 1px solid ${n.N9b};
  font-weight: 500;

  &:hover {
    color: ${n.J5m};
    border-color: ${n.wKm};
  }

  opacity: ${e=>{let{trigger:t}=e;return t?.status==="pending"?.32:1}};
  pointer-events: ${e=>{let{trigger:t}=e;return t?.status==="pending"?"none":"auto"}};
`,c.ue,l.j.NotAsked,(0,a.Ay)(d.h$)`
  animation: 0.3s ease-in-out fadeIn;
  width: 100%;
  max-width: 720px;
`,a.Ay.span`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 12px;
  color: ${n.vh3};
`,a.Ay.div`
  position: relative;
  padding-inline: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  min-height: 100%;
  &:after {
    content: "";
    display: block;
    flex: 0 0 128px;
    width: 100%;
  }
`,(0,a.Ay)(d.VP)`
  background: ${n.o$k};
  border-radius: 12px;
  min-height: 0;
  overflow: auto;
`,(0,a.Ay)(d.aF)`
  padding-block: 32px;
  padding-top: 64px;
  overflow: hidden;
`,(0,a.Ay)(d.aF)`
  padding: 0px;
  max-width: 720px;
  width: 100%;
`},33663:(e,t,i)=>{i(14041),i(59750),i(28926),i.p,i(6823)},9014:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(48143),i(35549);var a=i(28926),o=i(37345);i(27461),i(31335),(0,r.Ay)(a.BQ)`
  font-size: 14px;
  border-radius: 12px;
`;let l=r.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&(0,r.AH)`
      opacity: 0.5;
      cursor: not-allowed;
      ${a.In} {
        color: ${n.ui$};
      }
      ${a.IU} {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `}}
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: ${e=>{let{$highlighted:t}=e;return t?`2px solid ${n.Q_2}`:`1px solid ${n.Tc2}`}};
  border-radius: 12px;
  background: ${n.o$k};
`;(0,r.Ay)(l)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`,(0,r.Ay)(o.$n)`
  opacity: 0.5;
  cursor: not-allowed;
`,r.Ay.div`
  background: ${n.ONy};
  width: ${e=>{let{$width:t}=e;return t||"244px"}};
  height: auto;
  max-height: ${e=>{let{$height:t}=e;return t?`min(${t}px, 100vh)`:"100vh"}};
  border: 1px solid #f1f3f4;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
`},6823:(e,t,i)=>{var n=i(39716);n.Ay.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px 48px 40px;
  position: relative;
  width: 530px;
`,n.Ay.div`
  padding-bottom: 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`},51703:(e,t,i)=>{i(45250)},4241:(e,t,i)=>{var n=i(69670),r=i(67331);i(14041);var a=i(39716);i(48143),i(28926),a.Ay.div`
  display: flex;
  padding: 20px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 12px;
  background: ${n.KxS};
  text-align: left;
`,a.Ay.div`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;
`,a.Ay.div`
  color: ${n.ui$};
  font-family: Inter;
  font-size: 16px;
  font-style: italic;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  letter-spacing: 0.002px;
  text-align: center;

  strong {
    color: ${n.t14};
  }
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
  justify-content: center;
`,(0,a.Ay)(r.H3)`
  color: ${n.t14};
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0;
`,a.Ay.p`
  color: ${n.ui$};
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  letter-spacing: 0.002px;
`,a.Ay.div`
  height: 1px;
  align-self: stretch;
  border-radius: 1px;
  background: ${n.Q_2};
`,a.Ay.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`,a.Ay.div`
  width: 1px;
  align-self: stretch;
  border-radius: 1px;
  background: ${n.Q_2};
`,a.Ay.div`
  color: ${n.t14};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
`,a.Ay.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  align-self: stretch;
`,a.Ay.div`
  color: ${n.t14};
  font-family: Outfit;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 100% */
  letter-spacing: -0.003px;
`,a.Ay.div`
  color: ${n.wB3};
  font-family: Outfit;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.002px;
`,a.Ay.div`
  color: ${n.wB3};
  font-weight: 500;
  font-size: 16px;
  display: block;
  width: 240px;
  text-align: right;

  a {
    color: inherit;
    &:hover {
      color: ${n.t14};
      text-decoration: underline;
    }
  }
`},47856:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(117),i(48143),i(5855);var a=i(28926);i(89787),i(37089),i(66347),i(85170),i(51402),i(67846),i(71378),i(93754),i(42014),i(27461);var o=i(65947);r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 16px 1fr;
  gap: 12px;
  padding: 8px 0;
  align-items: center;
`,r.Ay.span`
  font-size: 16px;
  color: ${n.ui$};
  font-weight: bold;
  flex-shrink: 0;
`,r.Ay.div`
  flex: 1 1 50%;
  min-width: 0;
`,(0,r.Ay)(a.IU)`
  background: ${n.hi1};
  flex: 1 1 50%;
  min-width: 0;
`,(0,r.Ay)("span")`
  margin-top: 2px;
`;var l=i(67331),s=i(41917),p=i(52497),d=i(13489);i(14166);var c=i(21799);r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,(0,r.Ay)(o.dN.Flat)`
  font-family: "Roboto Mono", monospace;
  font-size: ${c.eA.I.size.m+2}px;
  font-weight: ${c.eA.I.weight.normal};
  line-height: ${c.eA.I.lineHeight.m+2}px;
`,r.Ay.div`
  cursor: pointer;
  color: ${n.CCs};
`,i(77956),i(20220),i(35501),s.X9(p.Y),d.E.Any,r.Ay.div`
  box-shadow: 0px 2px 4px 0px #0000000a;
  border: 1px solid #f1f3f4;
  background: ${n.ONy};
  border-radius: 8px;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 48px;
  align-items: center;
`,r.Ay.div`
  padding: 8px 8px;
  background: ${n.o$k};
`,r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${n.Tc2};
  height: 49px;
  background: ${n.ONy};
`,r.Ay.div`
  width: 100%;
  border-right: 1px solid ${n.Tc2};
  border-bottom: 1px solid ${n.Tc2};
  background: ${n.ONy};
  ${e=>{let{$colSpan:t}=e;return t&&`grid-column: span ${t};`}};
  ${e=>{let{onClick:t}=e;return t&&"cursor: pointer;"}};
`,(0,r.Ay)(l.P)`
  display: flex;
  align-items: center;
  color: ${n.FCg};
  margin: 0 14px;
  height: 49px;
`,(0,r.Ay)(l.P)`
  font-weight: 600;
  color: ${n.t14};
`,(0,r.Ay)(l.P)`
  text-align: center;
  color: ${n.xjr};
  margin: 24px;
`;var u=i(21416);i(58651),u.N4.find(e=>"use_combined_scaper_model_on_active_tab"===e.commandId),u.N4.find(e=>"use_combined_scaper_model_in_background"===e.commandId),(0,r.Ay)(a.h$)`
  padding: 20px 16px;
  text-align: start;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,i(44918),i(37504),i(66712),u.ER.find(e=>"act_using_goal"===e.commandId),u.ER.find(e=>"act_using_goal_in_background"===e.commandId),(0,r.Ay)(a.h$)`
  padding: 20px 16px;
  text-align: start;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,i(27745),(0,r.Ay)(a.mH)`
  overflow-y: auto;
  background-color: ${n.o$k};
`,n.KE7},44918:(e,t,i)=>{var n=i(69670),r=i(67331);i(14041);var a=i(39716);i(59750);var o=i(28926),l=i(27461);(0,a.Ay)(l.VP)`
  height: 100%;
`,(0,a.Ay)(l.VP)`
  gap: 16px;
  padding: 24px;
`,(0,a.Ay)(o.h$)`
  position: relative;
  display: flex;
  align-items: stretch;
  padding: 0;
  text-align: start;
  --icon-size: 32px;
`,a.Ay.div`
  width: 92px;
  height: 114px;
  background-color: ${n.KxS};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 24px;
  flex: 1;
`,(0,a.Ay)(r.H6)`
  color: ${n.CP};
`,(0,a.Ay)(r.a)`
  color: ${n.FCg};
`},27745:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716),a=i(28926);(0,r.Ay)(a.aF)`
  width: 100%;
  max-width: 720px;
  border: 2px solid ${n.NcT};
  top: 15vh;
  margin: 0 auto auto auto;
  max-height: 70vh;
  min-height: 300px;
  background-color: ${n.o$k};
  display: flex;
  flex-direction: column;
`,(0,r.Ay)(a.fI)`
  gap: 20px;
  padding: 14px 24px;
  border-bottom: 1px solid ${n.Tc2};
`},2289:(e,t,i)=>{i(14041);var n=i(39716);i.p,i(59750),i(63400),i(28926),n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
`,n.Ay.div`
  text-align: center;
`,n.Ay.div`
  padding: 0 8px;
  text-align: center;
`,n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`},80389:(e,t,i)=>{i.d(t,{$h:()=>u}),i(14041),i(117),i(48143),i(93510),i(19431);var n=i(67331),r=i(69670),a=i(39716),o=i(28926);a.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 48px;
  max-width: 482px;
  text-align: center;
`,(0,a.Ay)(n.P)`
  color: ${r.wmS};
`,a.Ay.div`
  display: flex;
  justify-content: center;
  padding: 8px 0px;
`,a.Ay.div`
  display: flex;
  justify-content: center;
`,a.Ay.div`
  position: relative;
`,(0,a.Ay)(o.In)`
  position: absolute;
  bottom: -16px;
  right: -16px;
`,i.p,i(53747),i(2289),i(32005),a.Ay.div`
  padding: 0px 64px 92px 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  justify-self: center;
`,a.Ay.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`,a.Ay.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`,a.Ay.ul`
  display: flex;
  gap: 16px;
  flex-direction: column;
`,a.Ay.li`
  display: flex;
  gap: 12px;
  align-items: center;
`,(0,a.Ay)(n.P)`
  color: ${r.ui$};
`,a.Ay.form`
  display: flex;
  flex-direction: column;
`,a.Ay.div`
  margin-top: 8px;
`,(0,a.Ay)(n.P)`
  color: ${r.KE7};
  font-size: 14px;
  margin-top: 8px;
  opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: 1.4;
  max-height: 1.4em; /* One line height based on line-height */
  ${e=>{let{$truncated:t}=e;return t&&`
    cursor: help;
  `}}
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,a.Ay.div`
  width: 530px;
`,(0,a.Ay)(o.VP)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`,a.Ay.footer`
  padding: 16px 40px 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`,(0,a.Ay)(o.fI)`
  background: ${r.JkX};
  width: 64px;
  height: 64px;
  border-radius: 100%;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 300px;
`,i(85934),a.Ay.div`
  width: 530px;
`,a.Ay.header`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`,a.Ay.div`
  padding: 16px 32px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 310px;
  overflow-y: auto;
`,a.Ay.footer`
  padding: 16px 40px 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`,a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${r.KxS};
  width: 64px;
  height: 64px;
  border-radius: 100%;
`,a.Ay.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 530px;
  gap: 48px;
`,(0,a.Ay)(n.H3)`
  color: ${r.t14};
`,a.Ay.div`
  width: 100%;
`,a.Ay.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,i(63400),i(50278),i(12171),i(37089),i(85170),i(54307),i.p,i(42048);var l=i(27461);i(65947),(0,a.Ay)(l.fI)`
  border: 1px solid ${r.MfC};
  border-radius: 7px;
  background-color: ${r.hi1};
  padding: 0 12px;
`,a.Ay.div`
  color: ${r.e30};
  padding: 8px;
  font-size: 16px;
`,i(21823),i(51703),a.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{$gap:t}=e;return t}}px;
`,a.Ay.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 16px 32px;
`,a.Ay.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
`,a.Ay.div`
  height: 32px;
  width: 0;
  border-left: 1px solid ${r.MfC};
`,a.Ay.div`
  display: flex;
  background-color: ${r.hi1};
  padding: 8px 8px 8px 20px;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  &:hover {
    background-color: ${r.KxS};
    ${n.P} {
      color: ${r.t14};
    }
  }
`,a.Ay.a`
  text-decoration: underline;
  color: ${r.ui$};
`,a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10%;
`,a.Ay.div`
  background-color: ${e=>{let{$error:t}=e;return t?r.P0$:r.KxS}};
  display: flex;
  flex-direction: column;
  padding-top: 48px;
  padding-bottom: 40px;
  padding-inline: 32px;
  gap: 14px;
  border-radius: 12px;
  align-items: center;
  text-align: center;
  max-width: 684px;
  width: 100%;
`,a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,a.Ay.div`
  display: flex;
  padding-top: 16px;
`;let s=(0,a.i7)`
  from {scale: 1; }
  to { scale: 3; }
`;(0,a.Ay)(o.In)`
  --icon-color: ${r.TJO};
  animation: ${s} 0.5s ease-in-out forwards;
  margin-top: 32px;
  margin-bottom: 32px;
`,a.Ay.div`
  position: relative;
`,(0,a.Ay)(o.In)`
  position: absolute;
  right: -10px;
  top: -10px;
  --icon-size: 20px;
  --icon-color: ${e=>{let{$completed:t,$error:i}=e;return t?r.XxH:i?r.CCs:null}};
`,(0,a.Ay)(o.z9)`
  border-radius: 12px;
  opacity: ${e=>{let{$error:t,$active:i,$completed:n,$idle:r}=e;return t||i||n||r?1:.32}};
  outline: ${e=>{let{$active:t,$selected:i,$error:n,$completed:a}=e;return t?`2px solid ${r.NcT}`:i?a?`2px solid ${r.$2P}`:n?`2px solid ${r.MEI}`:`2px solid ${r.NcT}`:"none"}};
`,a.Ay.div`
  margin-top: 16px;
`,i(26572),i(89787),i(51402),i(93754),i(66712),a.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  width: 100%;
  overflow-y: auto;
`,a.Ay.div`
  padding: 64px;
  max-width: ${e=>{let{$compressed:t}=e;return t?"60%":"100%"}};
  width: ${e=>{let{$compressed:t}=e;return t?"60%":"100%"}};
  align-items: ${e=>{let{$compressed:t}=e;return t?"unset":"center"}};
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
`,i(19010),(0,a.Ay)(o.hJ)`
  padding: 64px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`,(0,a.Ay)(o.aF)`
  overflow: hidden;
  width: 100%;
  max-width: 620px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 100%;
  gap: 32px;
  max-width: 530px;
  margin-inline: auto;
  text-align: center;
`,(0,a.Ay)(o.aF)`
  overflow: hidden;
  width: 100%;
  max-width: 620px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 100%;
  gap: 32px;
  max-width: 530px;
  margin-inline: auto;
  text-align: center;
`;var p=i(94720);i.p,i.p,a.Ay.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-self: center;
`,i(33663),i.p,i(6823),i.p,i(9014),i.p,a.Ay.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,a.Ay.div`
  overflow: hidden;
  background: radial-gradient(118.93% 141.42% at 100% 0%, #f8f8fd 0%, #e2dff5 100%);
  position: relative;
  height: 480px;
`,a.Ay.img`
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
`,a.Ay.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
  padding: 24px 0px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,(0,a.Ay)(o.$n)`
  margin-top: 16px;
`,i.p,a.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`,(0,a.Ay)(p.S)`
  pointer-events: none;
`,a.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
`,a.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
  align-self: center;
`,a.Ay.img`
  max-height: 100%;
`;var d=i(85040);i(7711),i(61994),i(58756),(0,d.A)(e=>({root:{display:"flex",alignItems:"center",justifyContent:"center"},layout:{background:r.ONy,backgroundClip:"padding-box",border:"1px solid rgba(0, 0, 0, 0.04)",boxShadow:"0px 8px 48px rgba(0, 0, 0, 0.08)",borderRadius:e.spacing(3),height:640,maxHeight:"calc(100vh - 32px)",maxWidth:"calc(100vw - 32px)",overflow:"hidden",position:"relative",width:952}})),(0,d.A)(e=>({layout:{height:"auto",width:"auto",minWidth:"524px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:e.spacing(8),position:"relative","& > :not(:first-child)":{marginTop:e.spacing(8)}},titleWrapper:{textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center"},title:{color:r.t14},subTitle:{marginTop:e.spacing(3)}})),(0,d.A)(e=>({header:{display:"flex",alignItems:"center",padding:e.spacing(5,5,5,8)},headerTitle:{color:r.t14,fontWeight:600,fontSize:"16px",lineHeight:"20px",flex:1},contentWrapper:{height:"100%",display:"flex",flexDirection:"column"},playbookHeader:{marginTop:"0 !important"},infoInput:{marginBottom:e.spacing(4)},title:{margin:e.spacing(3.5,0),fontSize:"14px",lineHeight:"20px",fontWeight:500,color:r.CP},modalContents:{display:"flex",flexDirection:"column",flex:1,padding:e.spacing(0,6,5,6)},shareInput:{"& .MuiInputBase-root":{height:"46px",paddingRight:"8px"},"& .MuiOutlinedInput-input":{fontWeight:600,fontSize:"18px"}},buttonBar:{display:"flex",margin:e.spacing(8,0,4,0),justifyContent:"center","& > :not(:first-child)":{marginLeft:e.spacing(3)}},bottomBar:{display:"flex",margin:e.spacing(4,0),justifyContent:"center",gap:"10px"}})),(0,a.Ay)(o.Sc)`
  &:not(:hover) {
    color: ${r.ui$};
  }
`,i.p,i.p,a.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`,a.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
`,a.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
  align-self: center;
`,i(87613),i(97638),i(37345),i(43885),i(42400),i(4241),a.Ay.div`
  max-width: 684px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 80px 0;

  animation: ${e=>e.theme.fadeIn} 0.3s;
`,a.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 48px;
  padding: 14px 16px;
  background: unset;
  border: 1px solid transparent;
  & label {
    color: ${r.ui$};
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    text-align: start;
    flex: 1;
  }
`,a.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
  }
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`,a.Ay.h4`
  color: ${r.CP};
  font-family: Outfit;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 150% */
`,(0,a.Ay)(n.P)`
  color: ${r.ui$};
`,a.Ay.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`,a.Ay.div`
  padding: 16px 0;
  border-bottom: ${r.MfC} 1px solid;
`,(0,a.Ay)(o.pd)`
  padding: 8xp 0;
`,a.Ay.div`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  text-align: left;
`,(0,a.Ay)(n.H4)`
  color: ${r.CP};
  text-align: center;
`,a.Ay.header`
  height: 64px;
`,(0,a.Ay)(n.H2)`
  color: ${r.t14};
  text-align: center;
`,a.Ay.div`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  gap: 32px;
  text-align: left;
`,(0,a.Ay)(n.H4)`
  color: ${r.CP};
  text-align: center;
`,a.Ay.div`
  display: flex;
  padding-top: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
  color: ${r.CP};
  font-family: Inter;
  font-size: 14px;
  line-height: 24px; /* 171.429% */
  font-style: normal;
`,a.Ay.div`
  font-weight: 600;
`,a.Ay.div`
  font-weight: 400;
`;let c=a.Ay.div`
  flex: 1;
  display: flex;
  padding: 24px 32px;
  border-radius: 12px;
  background: ${r.KxS};
  gap: 16px;
`;(0,a.Ay)(c)`
  flex-direction: column;
`,(0,a.Ay)(n.H5)`
  color: ${r.t14};
`,(0,a.Ay)("strong")`
  color: ${r.CP};
`,a.Ay.div`
  flex: 1;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 24px;
`,i(9331).w.map(e=>({label:e.replace(/_/g," "),value:e})),a.Ay.div`
  overflow-y: auto;
  margin: 16px 32px 0;
  display: flex;
  flex-direction: column;
  min-height: 0px;
  flex: 1;
  padding: 80px;
`,a.Ay.div`
  align-items: center;
  border: 4px dashed ${r.NcT};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  height: 75px;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 32px;
  border-width: ${e=>{let{$dragState:t}=e;return"over"===t?8:4}}px;
`,a.Ay.div`
  display: flex;
  gap: 8px;
`,i(94949),a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: start;
`,(0,a.Ay)(o.dN.Outline)`
  width: 100%;
`,(0,a.Ay)(o.$n)`
  margin-bottom: -7px;
  margin-top: -7px;
  margin-inline-end: -18px;
`,(0,a.Ay)(o.$n)`
  margin-top: -4px;
  margin-bottom: -4px;
  margin-inline-end: -14px;
`,(0,a.Ay)(o.BQ)`
  width: 100%;
`,a.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,a.Ay.div`
  display: flex;
  justify-content: center;
`,(0,a.Ay)(o.BQ)`
  text-align: start;
`,(0,a.Ay)(n.P)`
  padding-inline: 19px;
  color: ${r.CCs};
  text-align: start;
`,a.Ay.div`
  padding: 80px 0;
`,a.Ay.div`
  max-width: 684px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: center;
`,a.Ay.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
`,a.Ay.div`
  display: flex;
  flex: 1;
`,(0,a.Ay)(n.H4)`
  color: ${r.CP};
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`,a.Ay.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,a.Ay.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,a.Ay.div`
  display: flex;
  flex-direction: row;
`,a.Ay.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  width: 300px;
  padding: 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex-shrink: 0;
  border-right: 1px solid ${r.Tc2};
`,a.Ay.h2`
  color: ${r.t14};
  font-family: Outfit;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 160% */
  letter-spacing: 0.1px;
`,a.Ay.header`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`,a.Ay.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`,a.Ay.div`
  flex: 1;
  padding: 0 62px;
  overflow-y: auto;
  position: absolute;
  left: 300px;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${r.o$k};
`,i(47856),i(44918),i(27745),(0,a.Ay)(o.VP)`
  overflow-y: auto;
  background-color: ${r.o$k};
`,(0,a.Ay)(o.VP)`
  gap: 16px;
  padding: 24px;
`;let u={type:"None"}},84857:(e,t,i)=>{var n=i(69670);i(14041);var r=i(39716);i(58282);var a=i(28926);i(61994),(0,i(85040).A)(e=>({selectRoot:{display:"block",position:"initial"},groupLabel:{padding:e.spacing(4)},header:{"& > *":{textAlign:"center"},"& p":{fontSize:e.spacing(3.5),color:n.Wm,marginTop:e.spacing(3),textAlign:"center"},padding:e.spacing(5,0,9)},body:{padding:e.spacing(6),width:"512px"},groups:{"& li":{"&:hover":{color:n.Xvv,backgroundColor:n.KxS},"& svg, img":{marginInlineEnd:"16px"},"& span":{fontWeight:"600",lineHeight:"16px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"},"& div":{margin:"0"},borderRadius:e.spacing(1),padding:e.spacing(4),fontSize:"14px"},"& > label":{margin:"0 10px",fontSize:e.spacing(3),fontWeight:"400"},padding:"0px"},select:{maxHeight:"360px",overflow:"auto",marginInlineEnd:e.spacing(-6),paddingInlineEnd:e.spacing(6),paddingTop:e.spacing(5)}})),(0,r.Ay)(a.$n)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  background: white;

  &:hover {
    color: white;
    background: ${n.UmY};
  }
`;var o=i(67331);i.p,(0,r.Ay)(o.H1)`
  color: ${n.CP};
  text-wrap: wrap;
`,(0,r.Ay)(o.P)`
  color: ${n.ui$};
`,r.Ay.a`
  text-decoration: underline;
  color: ${n.ui$};
`,r.Ay.div`
  margin: 0 auto;
  padding: 96px 48px;
`,(0,r.Ay)(o.P)`
  font-weight: 600;
`,r.Ay.ul`
  li + li {
    margin-top: 10px;
  }
`,r.Ay.li`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid ${n.Tc2};
  height: 46px;
  border-radius: 8px;

  &:hover {
    background-color: transparent;
    transition: 0.2s border;
    border: 2px solid ${n.NcT};
    cursor: pointer;
  }
`,r.Ay.div`
  background-image: url(${e=>e.src});
  background-size: cover;
  background-position: left top;
  height: 89px;
`,(0,r.Ay)(a.VP)`
  width: 36%;
  @media (max-width: 768px) {
    display: none;
  }
`},13314:(e,t,i)=>{var n=i(14041);i(24114),i(93510);var r=i(39716);(0,r.Ay)(e=>{let{...t}=e,[i,r]=n.useState({}),o=(e,t)=>{let i=t.left-4,r=t.top-4,a=t.width+8,o=t.height+8;return n.createElement("rect",{key:e,x:i,y:r,width:a,height:o,fill:"black",rx:8,ry:8})},l=n.useMemo(()=>({add:(e,t)=>r(i=>({...i,[e]:t})),remove:e=>r(t=>{let{[e]:i,...n}=t;return n})}),[]);return n.createElement(a.Provider,{value:l},n.createElement("div",t),Object.entries(i).length>0&&n.createElement("svg",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}},n.createElement("defs",null,n.createElement("mask",{id:"mask"},n.createElement("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),Object.entries(i).map(e=>{let[t,i]=e;return o(t,i)}))),n.createElement("rect",{width:"100%",height:"100%",fill:"rgba(0, 0, 0, 0.3)",mask:"url(#mask)"})))})`
  display: grid;
  height: 100%;
  min-height: 100vh;
  padding: 32px;
  width: 100%;
  inset: 0;
  position: fixed;
  z-index: 100;
  pointer-events: all;
`;let a=n.createContext({add:()=>{},remove:()=>{}});var o=i(48514),l=i(13489),s=i(29e3),p=i(62987),d=i(99538),c=i(36884),u=i(54538),g=i(88645),x=i(23794),m=i(19431),f=i(89486),y=i(96326),h=i(39306),b=i(86477),v=i(74112),$=i(67469),w=i(65069),A=i(85170);let k={__version:"",overlayModal:null,appWindowState:{resultsHighlighted:!1,explorerPageSelected:"personal",explorerHighlightedPb:null,automationsQuery:"",panelId:null,panelMenuItems:[],panelMenuItemsLoading:!1,panels:[],showResultsOnboarding:!1,notificationsMenuIsOpen:!1,resultsState:h.ue(),automationsFolders:{team:[],personal:[]},automationsSelectedFolderId:null,createFolderState:null,scraperTemplates:b.u},builderV2State:null,busyCalls:[],clickTrackingBlacklist:[],confettiCelebrationActive:!1,confirmState:null,connection:{type:"active"},debugMsg:{i:0,msg:""},modal:{type:"None"},notifications:m.$.initialState,tourFlowState:null,playbooksState:u.ue,pluginsState:{},postRunActions:[],config:{...g.j,settings:{...o.x,favoriteApps:["mid-Scraper","mid-Slack","mid-Google Mail"],hasSeenOnboardingSlideshow:!0,hasSeenTrialEndedFlow:!0,hasSeenPlaybooksInfobox:!0,hasSeenAutobooksInfobox:!0,hasSeenStudioTestToggle:!0}},showReason:{type:"user"},teamState:f.ue,view:"appWindow",localInteractionRunState:null,createAutomationState:{compatibleModels:[],loadingModels:!1,modelsVisible:!1,openTabs:[]}},E=y.W.fromApi({...x.ne[0],id:"123",name:"Demo: Get leads from Website",description:"Scrape contacts from a website",space:"personal",permissions:{edit:!0,owner:!0,write:!0,delete:!0,move:!0,share:!0,cow:"replace",reown:!0,results:!0}}),S={...k.playbooksState,personal:[E]},C={...k,playbooksState:S,appWindowState:{...k.appWindowState,explorerPageSelected:"personal"}},T={type:"StringTemplatingExpression",mimeType:"html",children:[{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingTextNode",text:"Dear ",format:{},validationStatus:[]},{type:"StringTemplatingVariableNode",join:null,defaultValue:null,value:{type:"CastExpression",expression:{type:"FieldAccessExpression",expression:{type:"VarRefExpression",name:"__0",referenceType:"functionCall",typeHint:{tag:l.E.Simple,signature:[{facets:["bardeen.google.mail.email","bardeen.google.mail.meta","blob","email","indexable","object","wcontext"],src:[{uuid:"aa9f5190-f32b-4439-ra69-10c350571de3",name:"Google Mail",version:"2.0.0"}]}],typeIcon:"IntegrationGoogleMail",typeLabel:"Google Email",typeDescription:"An Email from Gmail",typeInteractions:{},configOptions:[]},displayHint:{label:"Action 1",icon:"IntegrationScraper",description:""},validationStatus:[]},field:"Name",typeHint:{tag:l.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"AtSignOutline",typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},displayHint:{label:"Name",description:"The name of the person"},validationStatus:[]},typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}],config:{mimeType:"text/html"}}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},displayHint:{label:"Bcc",icon:"TextOutline",description:"The bcc recipients of the email"},validationStatus:[]},format:{},validationStatus:[]}],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingTextNode",text:"My name is Artem Harutyinyan and I'm the CTO and Founder of Bardeen.ai.",format:{},validationStatus:[]}],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingGenerateNode",prompt:{type:"StringTemplatingExpression",mimeType:null,children:[{type:"StringTemplatingBlockFormattingNode",children:[{type:"StringTemplatingTextNode",text:"Explain the value you ",format:{},validationStatus:[]}],element:"p",attributes:[],validationStatus:[]}],typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},validationStatus:[]},format:{},validationStatus:[]}],validationStatus:[]}],typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}],config:{mimeType:"text/html"}}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},validationStatus:[]},I={columnData:{status:"invalid"},name:"",plugin:"",status:"idle",type:"FunctionCallStatement",conditionalExecution:null,actionNumber:1,hasResults:!1,progress:0,progressText:"",selectedTab:"Preview",args:[{name:"url",value:null,required:!1}],currentRequest:null,entry:null,expanded:!1,index:2,output:"compute",comment:"",commentFlags:{keep:!1},varName:"__0",columns:[],displayHint:{requiresPaymentPlan:[],columnBoundArgs:[],plugin:{name:"Bardeen",icon:"IntegrationBardeenCommons"},command:{id:"plugin:command",commandType:s.g.DO,expressions:[""],needsPaidFeature:[],returns:[]}},suggestions:{type:"success",value:[]},isTrigger:!1,addonState:$.ue,validationError:null,groupIndex:0,isGroupCardOpen:!1},H=e=>e.map(e=>{let{name:t,icon:i}=e;return{type:"ConstantValueExpression",value:{_types:["blob","blob.text","indexable","link","object"],_id:"link=https://example.com/",_updated:0x194d7043384,mimeType:"text/x-url",text:t},typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","link","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"LinkOutline",typeLabel:"URL",typeDescription:"A URL value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},displayHint:{label:t,icon:i,description:"A URL value",interactions:{}},validationStatus:[],weight:3}}),N={...I,actionNumber:1,index:0,varName:"__0",comment:"Scrape contacts from a website",status:"idle",plugin:"Scraper",displayHint:{plugin:{name:"Scraper",icon:"IntegrationScraper"},command:{id:"plugin:command",commandType:s.g.DO,expressions:["scrape with template on active tab"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},O={...I,actionNumber:2,index:1,comment:"Enrich profile data using Bardeen Enrichment",status:"idle",plugin:"Enrichment",displayHint:{plugin:{name:"Enrichment",icon:"IntegrationBardeenEnrichment"},command:{id:"plugin:command",commandType:s.g.DO,expressions:["enrich profile data"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},P={...I,actionNumber:3,index:2,comment:"Categorize contacts using Bardeen Categorizer",status:"idle",plugin:"Categorizer",displayHint:{plugin:{name:"Categorizer",icon:"IntegrationBardeenAI"},command:{id:"plugin:command",commandType:s.g.DO,expressions:["categorize contacts"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},z={...I,actionNumber:4,index:3,comment:"Create new record for each lead in Google Sheets",status:"idle",plugin:"GoogleSheets",name:"append_data_frame_google_sheet_tab",displayHint:{plugin:{name:"Google Sheets",icon:"IntegrationGoogleSheets"},command:{id:"plugin:command",commandType:s.g.DO,expressions:["create new record for each lead in Google Sheets"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]},args:[]},F={...I,actionNumber:4,index:4,comment:"Create a draft outreach email in Google Mail",status:"idle",plugin:"GoogleMail",name:"create_draft_email",expanded:!0,selectedTab:"Customize",displayHint:{plugin:{name:"Google Mail",icon:"IntegrationGoogleMail"},command:{id:"plugin:command",commandType:s.g.DO,expressions:["create draft email"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]},args:[{name:"Recipient(s)",required:!0,typeHint:{tag:l.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"]}],typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},value:{type:"FieldAccessExpression",expression:{type:"VarRefExpression",name:"__0",referenceType:"functionCall",typeHint:{tag:l.E.Simple,signature:[{facets:["bardeen.google.mail.email","bardeen.google.mail.meta","blob","email","indexable","object","wcontext"],src:[{uuid:"aa9f5190-f32b-4439-ra69-10c350571de3",name:"Google Mail",version:"2.0.0"}]}],typeIcon:"IntegrationGoogleMail",typeLabel:"Google Email",typeDescription:"An Email from Gmail",typeInteractions:{},configOptions:[]},displayHint:{label:"Action 1",icon:"IntegrationGoogleMail",description:""},validationStatus:[]},field:"bcc",typeHint:{tag:l.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"AtSignOutline",typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},displayHint:{label:"Email",description:"The bcc recipients of the email"},validationStatus:[]},displayHint:{label:"Recipient(s)",description:"Enter the email address of the recipient",dependsOn:[],miniUIConfig:null,expressions:[],required:!0,struct:p.u.Scalar}},{name:"Message",required:!0,displayHint:{label:"Message",description:"Enter the message of the email",dependsOn:[],miniUIConfig:null,expressions:[],required:!0,struct:p.u.Scalar},typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"]}],typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[]},value:T}]},_={...(0,A.Ui)(),args:[{name:"_What__website__do__you__want__to__scrape__the__contacts__from",label:"What website do you want to scrape the contacts from",comment:"Enter a website URL or select an open tab from the list below",commentFlags:{keep:!1},restricted:!1,typeHint:{tag:l.E.Simple,signature:[{facets:["blob","blob.text","indexable","link","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]},{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]},{facets:["string"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"LinkOutline",typeLabel:"URL",typeDescription:"A URL value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},value:null,struct:p.u.Scalar,required:!0,save:"config",validationStatus:[],usedInMapping:[],implicitSave:null,usedInStatementArg:[{index:1,argName:"url",argLabel:"URL",statementIcon:"LinkOutline",statementName:"Scraper",statementComment:null}],requiredByOtherCommand:!0,usedAsMultipleValueArgument:!1}],meta:{...(0,A.Ui)().meta,name:"Demo: Get leads from Website",description:"Scrape contacts from a website",categories:[],commands:[],id:"123",revision:0},plugins:[{needsPaidFeature:[],factoryId:"aa-0-190-f32b-4439-bf48-meeter71de3",instanceId:"aa-0-190-f32b-4439-bf48-meeter71de3-sgt",alias:"Scraper",displayHint:{name:"Scraper",version:"0.0.1",icon:"IntegrationScraper",enabled:!0}},{needsPaidFeature:[],factoryId:"16a55327-223b-42f4-97d5-bd4ca74a399e",instanceId:"16a55327-223b-42f4-97d5-bd4ca74a399e-sgt",alias:"BardeenEnrichment",displayHint:{name:"Bardeen Enrichment",version:"0.0.1",icon:"IntegrationBardeenEnrichment",enabled:!0}},{needsPaidFeature:[],factoryId:"2a4cd4df-01a9-4773-80f0-88cefea35602",instanceId:"2a4cd4df-01a9-4773-80f0-88cefea35602-sgt",alias:"BardeenAI",displayHint:{name:"BardeenAI",version:"0.0.1",icon:"IntegrationBardeenAI",enabled:!0}},{needsPaidFeature:[],factoryId:"f4dd54ae-b59d-4537-b785-f74f6b3eaeee",instanceId:"85edb2c3-dc7a-4062-9996-82fffd0f05f6",alias:"GoogleSheets",displayHint:{name:"Google Sheets",version:"1.0.0",icon:"IntegrationGoogleSheets",enabled:!0}}],statements:[N,O,P,{...(0,w.VX)(10,"If lead is qualified"),index:10,actionNumber:4,ifTrue:{type:"BlockStatement",index:3,output:"compute",comment:null,commentFlags:{keep:!1},children:[z],validationStatus:[]},ifFalse:{type:"BlockStatement",index:6,output:"compute",comment:null,commentFlags:{keep:!1},children:[],validationStatus:[]},validationStatus:[],currentBranch:"ifTrue"}]},j={...k,view:"builderV2",builderV2State:{...(0,v.Ur)({ast:_}),testModeEnabled:!1,pbHeaderVisible:!0}},M=[{Name:"Dr. Evelyn Carter",Company:"NexaTech",Location:"San-Francisco, CA, USA",Email:"evelyn@nexatech.com"},{Name:"Sophia Bennett",Company:"InnovateAI",Location:"San-Francisco, CA, USA",Email:"sophia@innovateai.com"},{Name:"Dr. Alejandro Torres",Company:"Global Tech University",Location:"Dallas. TX, USA",Email:"alejandro@gtu.com"},{Name:"Li Wei Zhang",Company:"SynapseAI",Location:"London, UK",Email:"zhang@synapseai.com"},{Name:"Amara Patel",Company:"Self Employed",Location:"San-Francisco, CA, USA",Email:"amara@patel.com"}],R={type:"result",result:{type:"success",message:null,microCredits:1e3,cached:!1,unitsProduced:1,timeSaved:1200,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:1,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"title"},{name:"Subject",title:"Subject",origin:null,type:"title"},{name:"Email count",title:"Email count",origin:null,type:"secondary"},{name:"From",title:"From",origin:null,type:"default"},{name:"To",title:"To",origin:null,type:"secondary"},{name:"Labels",title:"Labels",origin:null,type:"secondary"}],rows:[{resourceIcon:"IntegrationGoogleMail",contentIcon:null,error:null,pureContent:!1,body:[{url:`data:text/plain;base64,${btoa(`Dear ${M[0]?.Name||"..."},
                    My name is Artem Harutyinyan and I'm the CTO and Founder of Bardeen.ai.
                    I am reaching out to you because I believe you might be interested in our services.
                    I have attached a PDF with more information about our company and the services we offer.
                    Please let me know if you have any questions or if I can provide you with more information.
                    Best regards,
                    Artem Harutyinyan
                    CTO and Founder
                    Created by Bardeen.ai
                    `)}`,mimeType:"text/plain"}],values:{Name:{type:"plain",text:"Artem from Bardeen"},Subject:{type:"plain",text:"Artem from Bardeen"},"Email count":{type:"plain",text:M.length.toString()},From:{type:"plain",text:M[0]?.Email||"lead@bardeen.ai"},To:{type:"plain",text:"0"},Labels:{type:"plain",text:"Draft"}},message:null,iteration:[],resourceUrl:"https://mail.google.com/mail?authuser=me#all/1966c59898a5454f",resourceName:"Google Email",actions:[]}]}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}},B=(e,t)=>e.builderV2State?{...e,builderV2State:(0,A.Bf)(e.builderV2State,e=>(0,d.Co)(e,{transformBlockStatement:e=>({...e,children:[...e.children,t]})}))}:e,D=(e,t)=>e.builderV2State?{...e,builderV2State:(0,A.Bf)(e.builderV2State,e=>(0,d.Co)(e,{transformFunctionCallStatement:e=>e.index===t?{...e,expanded:!0}:e}))}:e,V=e=>e.builderV2State?{...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"idle"}}}:e,L=(e,t)=>{if(!e.builderV2State)return e;let i=Array(t+1).fill(void 0).map((e,t)=>t),n=Array(t).fill(void 0).map((e,t)=>t),r={...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"running",executionId:"1",runRecordId:"1",statementIndex:t,statementProgress:0,startedStatements:i,finishedStatements:n,totalStatementsCount:Math.max(i.length,4),postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}};if(!r.builderV2State)return r;let a=(0,A.Bf)(r.builderV2State,e=>(0,d.Co)(e,{transformFunctionCallStatement:e=>e.index===t?{...e,expanded:!1,status:"loading"}:n.includes(e.index)?{...e,status:"success"}:e}));return{...r,builderV2State:a}},U=e=>(t,i)=>{if(!e.builderV2State)return e;let n={...e};if(!n.builderV2State)return n;let r=Array(i+1).fill(void 0).map((e,t)=>t),a=Array(i+1).fill(void 0).map((e,t)=>t),o=(0,A.Bf)(n.builderV2State,e=>(0,d.Co)(e,{transformFunctionCallStatement:e=>e.index===i?{...e,status:"success",selectedTab:"Preview",expanded:!1,entry:t}:a.includes(e.index)?{...e,status:"success"}:e}));return{...n,builderV2State:{...o,sequencingStatus:{type:"running",executionId:"1",runRecordId:"1",statementIndex:i,statementProgress:0,startedStatements:r,finishedStatements:a,totalStatementsCount:Math.max(a.length,4),postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}}},q=e=>e.builderV2State?{...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"idle"}}}:e,G=(e=>({type:"result",result:{type:"success",message:null,microCredits:5e3,cached:!1,unitsProduced:1,timeSaved:3600,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:e.length,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"default"},{name:"Company",title:"Company",origin:null,type:"default"},{name:"Location",title:"Location",origin:null,type:"default"}],rows:e.map(e=>{let{Name:t,Company:i,Location:n}=e;return{values:{Name:{type:"plain",text:t},Company:{type:"plain",text:i},Location:{type:"plain",text:n}},iteration:[],resourceIcon:null,contentIcon:null,error:null,pureContent:!1,body:[],message:null,resourceName:"Table Row",actions:[]}})}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}}))(M),K="https://docs.google.com/spreadsheets/d/1AzaKvWw-4Ikm-0G_ql9B6n4PVa4ZS5xXVWERKHmdABk/edit?gid=0#gid=0",X={type:"result",result:{type:"success",message:null,microCredits:1e3,cached:!1,unitsProduced:1,timeSaved:1200,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:1,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"title"},{name:"Size",title:"Size",origin:null,type:"secondary"},{name:"Created",title:"Created",origin:null,type:"default"},{name:"Last Modified",title:"Last Modified",origin:null,type:"default"}],rows:[{resourceIcon:"IntegrationGoogleSheets",contentIcon:null,error:null,pureContent:!1,body:[],values:{Name:{type:"plain",text:"Leads sheet"},Size:{type:"plain",text:"0.00 Kb"},Created:{type:"plain",text:"Thursday, Sep 5, 2024, 4:49:05 PM"},"Last Modified":{type:"plain",text:"Wednesday, Apr 23, 2025, 3:36:31 PM"}},message:null,iteration:[],resourceUrl:K,resourceName:"GoogleSheet",actions:[]}]}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}},W=D(U(j)(G,0),0);D(q(U(L(W,4))(X,4)),4);let J=V(W),Q=0;function Z(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Q++;let t=V(D(U(L(W,3))(X,3),3));return{id:`builder-test-run-complete-${Q}`,type:"panel",title:"Run complete  \uD83C\uDF89",description:"The leads have been enriched, classified and stored in a sheet. Let's have a look at them!",autoNextDelay:0,activeElements:[],state:t,actions:[],isFlowComplete:!1,scrollElement:null,...e}}function Y(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Q++,{type:"panel",id:`click-on-open-playbook-in-studio-${Q}`,title:"My Playbooks",description:"Manage and open your Playbooks in the Studio to run or customize them.",activeElements:[],autoNextDelay:null,state:j,actions:[],isFlowComplete:!1,scrollElement:null,...e}}let ee={...k,playbooksState:S,appWindowState:{...k.appWindowState,explorerPageSelected:"personal"}};({...C,appWindowState:{...C.appWindowState,resultsHighlighted:!0}});let et=e=>({selector:`[data-tour-id='${e}']`,onClick:{type:"TourFlow/NextStepClicked"},highlighted:!0});function ei(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Q++,{id:`customized-card-result-preview-complete-collapsed-${Q}`,type:"panel",title:"Save Playbook",description:`Well done, your Playbook looks great and ready to be saved.

Click the highlighted Save button on top.`,activeElements:[],autoNextDelay:null,state:B(W,{...F,expanded:!1}),actions:[],isFlowComplete:!1,scrollElement:null,...e}}function en(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Q++,{id:`test-your-changes-${Q}`,type:"panel",title:"Nice!",description:`Magic Box just added an action to create draft emails. Click the play button to run that as well.

No worries - as this is a demo we won't actually create any draft emails.`,activeElements:[],autoNextDelay:null,state:B(J,{...F,expanded:!0}),actions:[],isFlowComplete:!1,scrollElement:null,...e}}function er(e){return{selector:`[data-statement-index='${e}']`,behavior:"start"}}Y({activeElements:[et("playbook-item")],state:ee}),Y({autoNextDelay:2e3,isFlowComplete:!0,state:ee}),function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0],Q++}({activeElements:[et("playbook-test-button")],state:j,description:`Here are the actions your Playbook will perform one after another.

    Click the Test button above to preview those actions.`}),er(0),L(j,0),(e=>{if(!e.builderV2State)return;let t={addonState:e.builderV2State.argumentFillingState?.addonState,currentRequest:null,suggestions:c.j.Success(H([{name:"Bardeen summit conference",icon:"IntegrationBardeenCommons"},{name:"(25) Frontend Developer Jobs | Linkedin",icon:"IntegrationLinkedin"},{name:"Bardeen - Google Search",icon:"IntegrationGoogleSheets"}]))};return{...e,builderV2State:{...e.builderV2State,argumentFillingState:t,sequencingStatus:{...e.builderV2State.sequencingStatus,activeIndex:0,autobookBehaviour:"run",arguments:[{statementIndex:0,argumentName:"_What__website__do__you__want__to__scrape__the__contacts__from"}],type:"filling",postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}}})(L(j,0)),U(L(j,0))(G,0),U(L(j,0))(G,0),U(L(j,0))(G,0),er(0),L(W,1),er(1),L(W,1),L(W,2),er(2),L(W,2),L(W,3),er(3),V(D(U(L(W,3))(X,3),3)),V(D(U(L(W,3))(X,3),3)),er(3),Z({autoNextDelay:1e3,activeElements:[]}),Z({activeElements:[{highlighted:!0,selector:"[data-tour-id='result-block-single-view-open-GoogleSheet']",onClick:{type:"TourFlow/ExternalLinkClicked",link:K}}],scrollElement:{selector:"[data-tour-id='result-block-single-view-open-GoogleSheet']",behavior:"center"}}),Z({autoNextDelay:2e3,isFlowComplete:!0}),ei({activeElements:[et("playbook-save-button")],state:B(J,{...F,expanded:!0,entry:R,selectedTab:"Preview"})}),ei({autoNextDelay:2e3,isFlowComplete:!0,state:C}),et("magicbox-btn"),J.builderV2State?J.builderV2State:j.builderV2State,er(4),B(J,F),en({activeElements:[{selector:"[data-statement-index='4']",highlighted:!1,customClassNames:["pseudo-active"]},et("play-btn-4")]}),er(4),L(B(W,{...F}),4),en({isFlowComplete:!0,autoNextDelay:2e3,state:q(B(J,{...F,expanded:!0,entry:R,selectedTab:"Preview"}))});var ea=i(69670);let eo=(0,r.i7)`
  0% {
    box-shadow: 0 0 0 0 rgba(242, 184, 94, 0.8);
  }
  50% {
    box-shadow: 0 0 0 ${16}px rgba(242, 184, 94, 0.4);
  }
  100% {
    box-shadow: 0 0 0 ${24}px rgba(242, 184, 94, 0);
  }
`,el=(0,r.i7)`
  0% {
    box-shadow: 0 0 0 0 rgba(242, 184, 94, 0.9);
    transform: scale(1);
  }
  30% {
    box-shadow: 0 0 0 24px rgba(242, 184, 94, 0.7);
    transform: scale(1.05);
  }
  60% {
    box-shadow: 0 0 0 36px rgba(242, 184, 94, 0.3);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 0 0 48px rgba(242, 184, 94, 0);
    transform: scale(1);
  }
`,es=(0,r.i7)`
  from {
    transform: scale(3);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;r.Ay.div.attrs({"aria-label":"Highlight"})`
  position: fixed;
  z-index: 9999;
  border-radius: ${e=>{let{$radius:t}=e;return t}}px;
  ${e=>{let{$highlighted:t}=e;return t?(0,r.AH)`
          animation:
            ${es} 0.7s ease-out,
            ${eo} 2s infinite;
        `:""}}
  box-shadow: 0 0 0 0px ${ea.eJD};
  opacity: 1;
  transition:
    transform 0.4s ease-out,
    box-shadow 0.2s ease-out;
  cursor: pointer;
  outline: none;

  &.highlight-pulse {
    animation: ${el} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:after {
    ${e=>{let{$highlighted:t}=e;return t&&`
      content: "";
      position: absolute;
      inset: -5px;
      background: transparent;
      pointer-events: auto;
      `}}
  }
`;var ep=i(67331),ed=i(28926);r.Ay.div`
  display: flex;
  width: 56px;
  height: 56px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${ea.$yM};
`;let ec=(0,r.i7)`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`,eu=(0,r.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,eg=(r.Ay.div`
  animation: ${eu} 0.3s ease-out;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
  width: 346px;
  border-radius: 12px;
  background: ${ea.ONy};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px); // Leave some space from viewport edges
`,r.Ay.div`
  overflow-y: auto;
`,(0,r.Ay)(ed.VP).attrs({gap:10})`
  padding: 22px 32px;
  color: ${ea.UU9};
  background: ${ea.$yM};
  position: relative;

  &:after {
    transition: all 0.24s ease-in-out;
    content: "";
    position: absolute;
    inset: 0;
    background: ${ea.MhJ};
    opacity: ${e=>{let{$done:t}=e;return t?.7:0}};
    border-radius: 12px;
  }

  & > svg {
    animation: ${eu} 0.3s ease-out forwards;
    opacity: 0;
    animation-delay: 0.5s;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    font-size: 32px;
    color: ${ea.ONy};
    z-index: 1;
  }
`,(0,r.Ay)(ep.H5)`
  animation: ${eu} 0.3s ease-out;
  color: white;
  white-space: pre-line;
`,r.Ay.div`
  animation: ${eu} 0.3s ease-out;
  line-height: 24px;
  padding: 8px 0 4px 0;
  white-space: pre-line;
`,(0,r.Ay)(ed.fI).attrs({gap:16})`
  align-items: center;
`,r.Ay.div`
  font-size: 12px;
  line-height: 28px;
  min-width: 24px;
  text-align: right;
`,r.Ay.div`
  width: 100%;
  height: 8px;
  background: ${ea.MhJ};
  border-radius: 4px;
  position: relative;
  &:before {
    transition: width 0.3s ease-out;
    content: "";
    position: absolute;
    inset: 2px;
    width: calc(${e=>{let{$fraction:t}=e;return 100*t}}% - 4px);
    background: white;
    border-radius: 4px;
  }
`,(0,r.Ay)(e=>{let t=n.useRef(null);return n.useEffect(()=>{t.current&&(e.open?t.current.style.maxHeight=t.current.scrollHeight+"px":t.current.style.maxHeight="0")},[e.open]),n.createElement("div",{...e,ref:t})})`
  color: ${ea.ONy};
  background: ${ea.c3n};
  transition: max-height 0.24s ease-in-out;
  overflow: hidden;
  flex-shrink: 0;
`,(0,r.Ay)(ep.H6)`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 32px;
  line-height: 24px;
  color: ${ea.ydb};
  font-weight: 400;
  font-size: 15px;
  transition: all 0.24s ease-out;
  svg {
    margin-left: auto;
    font-size: 16px;
    animation: ${ec} 0.3s ease-out;
  }
  ${e=>{let{$active:t}=e;return t&&`
      color: ${ea.ONy};
      font-size: 14px;
      font-weight: 600;
    `}}
`),ex=((0,r.Ay)(eg).attrs({as:"button"})`
  background: none;
  width: 100%;
  color: ${ea.ONy};
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background: ${ea.PdT};
  }
  &:focus {
    background: ${ea.PdT};
  }
  &:active {
    background: ${ea.MhJ};
  }
`,r.Ay.button.attrs({type:"button","aria-label":"Collapse Tour Panel"})`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${ea.ONy};
  width: calc(100% + 64px);
  margin: 0 -32px -22px;
  border: none;
  outline: none;
  transition: all 0.24s ease-in-out;
  background: transparent;
  font-size: 16px;
  padding: 8px 0;

  &:focus-visible,
  &:hover {
    background: linear-gradient(to bottom, ${ea.PdT}00, ${ea.o_k}40);
  }
`,(0,r.Ay)(ed.Jn).attrs({size:"s",mode:"color"})`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
`,(0,r.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`);(0,r.Ay)(ed.fI)`
  animation: ${ex} 0.3s ease-in-out;
  gap: 10px;
  position: absolute;
  background: ${ea.$yM};
  padding: 22px 32px;
  border-radius: 12px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
  color: ${ea.ONy};
  z-index: 3;
`,(0,r.Ay)(ep.P)`
  font-size: 16px;
  font-weight: 600;
  color: ${ea.ONy};
  white-space: pre-line;
`,(0,r.Ay)(ep.P)`
  font-size: 14px;
  font-weight: 400;
  color: ${ea.ONy};
  white-space: pre-line;
`,e=>{if(!e)return null;switch(e.type){case"panel":case"tooltip":{let{id:t,title:i,description:n}=e;return{id:t,title:i,description:n}}case"sequence":return null}}},54538:(e,t,i)=>{i.d(t,{ue:()=>n}),i(38792),i(117),i(93510),i(19431),i(50278),i(80389);let n={page:0,loading:!1,personal:null,team:[]}},87023:(e,t,i)=>{i.d(t,{u:()=>a});var n=i(36884);i(63711),i(93510);var r=i(19431);i(80389);let a={inviteForm:[],invitationRequest:n.j.NotAsked,invitations:[],refusedProEmails:[],refusedExistingEmails:[],upgradeToTeam:{cost:0,nextPeriodCost:0,loading:!1,createSpaceLoading:!1,invitationInput:""}};r.$.create("Some invitations were refused",{actions:[{onClick:{type:"ModalsAction",action:{type:"Modal/SettingsShown",tab:"team"}},text:"Show"}]})},94949:(e,t,i)=>{},42014:(e,t,i)=>{i.d(t,{Gm:()=>a});var n=i(14041);i(59750);let r=n.createContext([]),a=()=>n.useContext(r)},66712:(e,t,i)=>{i.d(t,{k:()=>a});var n=i(14041);let r=n.createContext({allowAskMeEveryTime:!0,playbookArgs:[],statementIndex:0,onRevalidatePlaybook:()=>{},onPlaybookArgChange:()=>{},onPlaybookArgReset:()=>{},onPlaybookArgCreate:()=>{},onPlaybookArgEditClicked:()=>{}}),a=()=>n.useContext(r)},11778:(e,t,i)=>{i.d(t,{c:()=>a});var n=i(14041);let r=n.createContext(null);function a(){return n.useContext(r)}},58756:(e,t,i)=>{i.d(t,{o:()=>n});let n=i(14041).createContext({styleInsertionPoint:document.head,get portalInsertionPoint(){return document.querySelector("#bardeen-popup")??document.body},documentRoot:document.body})},42048:(e,t,i)=>{var n=i(36213);class r extends n.F_{static #e=this.nameTemplate="Engine:InvalidMatchPattern";static #t=this.is=e=>n.F_.is(e,r.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,r.nameTemplate);constructor(e={}){super(r.nameTemplate,"Invalid website pattern",{userHint:'Please enter a valid website pattern. Examples: "https://google.com/*", "https://*.github.com/*", "*://example.com/path"',...e})}}},63711:(e,t,i)=>{var n=i(36213);class r extends n.F_{static #e=this.nameTemplate="Engine:EngineReconnectBootError";static #t=this.is=e=>n.F_.is(e,r.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,r.nameTemplate);constructor(e={}){super(r.nameTemplate,"Failed to reconnect to the Bardeen runtime",{userHint:"The Bardeen runtime failed to restart from sleep. Please refresh this page and try again.",...e})}}class a extends n.F_{static #e=this.nameTemplate="Engine:FailedToCopyToClipboard";static #t=this.is=e=>n.F_.is(e,a.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,a.nameTemplate);constructor(e={}){super(a.nameTemplate,"Failed to copy to clipboard",{userHint:"Please copy manually.",...e})}}class o extends n.F_{static #e=this.nameTemplate="Engine:IntegrationActivationFailed";static #t=this.is=e=>n.F_.is(e,o.nameTemplate);static #i=this.isExact=e=>n.F_.isExact(e,o.nameTemplate);constructor(e={}){super(o.nameTemplate,"Failed to connect the application, please try again.",{trackError:!1,...e})}}i(42048)},48143:(e,t,i)=>{i.d(t,{rD:()=>l.r,jL:()=>l.j,d7:()=>a.d,Rv:()=>r.R,JZ:()=>n.J,Mj:()=>o.M}),i(51134),i(86920),i(1265);var n=i(72134);i(19585);var r=i(98290),a=i(14166),o=i(84845),l=i(59750);i(29717),i(18782),i(65274)},75162:(e,t,i)=>{i(14041)},51134:(e,t,i)=>{i(14041),i(58756)},86920:(e,t,i)=>{i(14041)},1265:(e,t,i)=>{i(14041)},6717:(e,t,i)=>{i(14041)},21714:(e,t,i)=>{i.d(t,{rX:()=>r});var n=i(14041);function r(e){return n.isValidElement(e)}i(61578),i(14886)},117:(e,t,i)=>{function n(e){return t=>Object.assign(i=>t({...i,dispatch:t=>i.dispatch(e(t))}),{displayName:String(t.displayName??t.name)})}i.d(t,{zy:()=>n,i8:()=>r.i8}),i(96054);var r=i(99658)},99658:(e,t,i)=>{i.d(t,{i8:()=>r});var n=i(14041);function r(e,t){return n.useCallback(i=>e({type:t,action:i}),[e,t])}},96054:(e,t,i)=>{i(14041)}}]);
//# debugId=7b298b48-4a99-5d5d-9055-a05cae4cad75
