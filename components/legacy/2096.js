"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d06ea8f3-80f4-5d64-bcac-70f77e91ddee")}catch(e){}}();
(self.webpackChunkbardeen_browser_extension=self.webpackChunkbardeen_browser_extension||[]).push([[2096],{867:(e,t,n)=>{n.d(t,{NF:()=>x,WN:()=>h,ce:()=>b,gn:()=>y,qv:()=>v,rV:()=>f,uL:()=>d,xr:()=>E});var a=n(2758),r=n(23667),i=n(3460),l=n(84895),o=n(17453),s=n(52497),c=n(41917),d=function(e){return e[e.Empty=0]="Empty",e[e.Partition=1]="Partition",e[e.Error=2]="Error",e[e.Limited=3]="Limited",e}({});let u=r.D.taggedUnion("type",{error:r.D.object({type:r.D.constant("error"),error:i.qf,location:r.D.nullable(r.D.object({bclVarName:r.D.string}))}),success:r.D.object({type:r.D.constant("success"),successMessage:r.D.string,location:r.D.nullable(r.D.object({bclVarName:r.D.string}))})}),p=r.D.object({_types:r.D.arrayStrict(r.D.string),kind:r.D.optional(r.D.integer,0),error:r.D.optional(i.qf),successMessage:r.D.optional(r.D.string)}),m=r.D.object({_types:r.D.arrayStrict(r.D.string),kind:r.D.optional(r.D.integer,0),annotation:r.D.nullable(u)}),g=r.D.either(m,p.transform(e=>({_types:e._types,kind:e.kind,annotation:e.error?{type:"error",error:e.error,location:null}:e.successMessage?{type:"success",successMessage:e.successMessage,location:null}:null})));class y extends s.Y{static #e=this.typeName=o.j3.Nothing;static #t=this.typeDesc="No value";static #n=this.decoder=g;constructor(e,t=null){super(),this.kind=e,this.annotation=t}shouldSkip(){switch(this.kind){case 1:case 2:case 3:return!0;case 0:return!1}}get priority(){switch(this.kind){case 0:if(this.hasError())return 3;if(this.hasSuccessMessage())return 2;return 1;case 2:if(this.hasError())return 6;if(this.hasSuccessMessage())return 5;return 4;case 1:return 7;case 3:return 8;default:return 9}}hasError(){return null!=this.annotation&&"error"===this.annotation.type}hasSuccessMessage(){return null!=this.annotation&&"success"===this.annotation.type}isAnnotationLocationRelated(e){return!!this.annotation&&(null==this.annotation.location||this.annotation.location.bclVarName===e.bclVarName)}withReplacedLocation(e){return null==this.annotation?this:new y(this.kind,{...this.annotation,location:e})}toString(){if(null==this.annotation)return"";switch(this.annotation.type){case"error":return`[Error: ${this.annotation.error.message}]`;case"success":return`[Success: ${this.annotation.successMessage}]`}}valueOf(){return null}toJSON(){return this.serialize()}serialize(){return{_types:this._types,kind:this.kind,annotation:this.annotation}}static deserialize(e){if(null==e)return l.Q.Ok(f);let t=(0,a.D)("DType",c.zt(this.typeName),e,this.decoder);return t.ok?1===t.value._types.length&&t.value._types[0]===o.j3.Nothing?l.Q.Ok(new this(t.value.kind,t.value.annotation)):l.Q.Err({type:"PayloadError",module:"DType",resourceKind:"nothing",payload:t.value,error:"Unexpected facets"}):t}}let f=new y(0);function h(e,t){return new y(0,{type:"error",error:e,location:t})}let b=new y(1);function x(e,t){return new y(2,{type:"error",error:e,location:t})}let E=new y(3);function v(e){return e instanceof s.Y&&e.is(y)}},61198:(e,t,n)=>{n.d(t,{Tj:()=>a});function a(e,t){let n=Object.keys(e),a={};for(let r of n){let n=e[r];n&&(a[r]=t(n,r))}return a}},89060:(e,t,n)=>{n.d(t,{gP:()=>function e(t,n,r){switch(t.type){case a.LEAF:return function(e,t,n){if(null===e.value)return l.Z.empty();let a=n(e.value),r=(e.trace??[]).map(e=>t.baseOffset+e);return 0===r.length&&r.push(l.Z.nodeId()),{kind:l.b.Kind.Leaf,value:a,trace:new Set(r)}}(t,n,r);case a.BRANCH:return function(t,n,a){let r=t.items.map(t=>e(t,n,a));return l.Z.branchFromArray(r)}(t,n,r)}},sR:()=>c});var a,r=n(16335),i=n(38534),l=n(70297),o=n(52497);let s=r.either(r.null_,o.M);!function(e){e.LEAF="l",e.BRANCH="b";let t=r.object({type:r.constant(e.LEAF),value:s,trace:r.optional(r.array(r.number))}),n=r.object({type:r.constant(e.BRANCH),items:r.array(r.lazy(()=>e.NodeDecoder))});function a(t,n){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];t.type===e.LEAF?n(t,[...r,0]):t.type===e.BRANCH&&t.items.forEach((e,t)=>a(e,n,[...r,t]))}e.NodeDecoder=r.taggedUnion("type",{[e.LEAF]:t,[e.BRANCH]:n}),e.forEach=a,e.reduce=function(e,t,n){let r=n;return a(e,(e,n)=>{r=t(r,e,n)}),r}}(a||(a={})),r.object({traceIdCount:r.number});class c{constructor(e){this.baseOffset=l.Z.allocateNodeIds(e.traceIdCount)}static fromSerializedGraphs(e){let t=0,n=!0;for(let r of e)t=a.reduce(r,(e,t)=>t.type===a.LEAF?(n=!1,(0,i.E7)(t.trace??[],e)):e,t);return new c({traceIdCount:n?0:t+1})}}r.record(a.NodeDecoder)},93100:(e,t,n)=>{n.d(t,{OR:()=>r,yG:()=>l});var a=n(16335);let r=[{name:"playbook-support",description:"Run automations created by Bardeen support"},{name:"enterprise",description:"Enterprise-level features (Enterprise only)"},{name:"business",description:"Business-level features (Enrichment & CRM)"},{name:"cloud-triggers",description:"Run autobooks in the cloud"},{name:"disable-branding",description:"Disable branding on demand"},{name:"premium-scraper",description:"Grants access to premium scrapers"},{name:"teams",description:"Allows creating and managing teams"},{name:"enrichment",description:"Enrichment specific features"}],i=r.map(e=>e.name);a.array(a.oneOf(i));let l=a.array(a.string).transform(e=>{let t=[];for(let n of e)i.includes(n)&&t.push(n);return t})},12787:(e,t,n)=>{n.d(t,{$Y:()=>a,Uk:()=>r,nj:()=>i});let a={FREE:{version:1,state:"FREE",meta:{title:"Free"}},TRIAL:{version:1,state:"TRIAL",meta:{title:"Pro (Trial)"}},PRO:{version:1,state:"PRO",meta:{title:"Pro"}},ENTERPRISE:{version:1,state:"ENTERPRISE",meta:{title:"Enterprise"}}},r={FREE:{version:2,state:"FREE",meta:{title:"Free"}},STARTER:{version:2,state:"PRO",meta:{title:"Starter"}},TEAMS:{version:2,state:"BUSINESS",meta:{title:"Teams"}},ENTERPRISE:{version:2,state:"ENTERPRISE",meta:{title:"Enterprise"}}},i={FREE:{version:3,state:"FREE",meta:{title:"Free"}},BASIC:{version:3,state:"BASIC",meta:{title:"Basic"}},PREMIUM:{version:3,state:"PREMIUM",meta:{title:"Premium"}},ENTERPRISE:{version:3,state:"ENTERPRISE",meta:{title:"Enterprise"}}}},49861:(e,t,n)=>{n.d(t,{CN:()=>l,HJ:()=>h,HT:()=>c,TB:()=>u,W1:()=>g,Xj:()=>v,Zh:()=>o,b0:()=>E,eV:()=>d,fD:()=>m,mk:()=>x,oL:()=>y,qB:()=>b,tR:()=>s});var a=n(99538),r=n(12787);let i=["active","trialing"];function l(e,t){if(0===t.length)return!1;let{state:n}=h(e);return!t.some(e=>e.state===n)}function o(e,t){let n=t.plugins.flatMap(e=>e.needsPaidFeature).concat(t.meta.customPaidFeatures||[]),r=[];(0,a.bZ)(t,{visitFunctionCallStatement:e=>(r=r.concat(e.displayHint?.requiresPaymentPlan??[]),!0)});let i=l(e,r);return function(e,t){switch(e.paymentPlanVersion){case 1:if("FREE"===e.mode||p(e))return!t.isPremium;return!0;case 2:case 3:if(p(e))return!1;return t.needsPaidFeature.every(t=>e.activeSubscription?.features.includes(t))&&!t.needsUpgrade}}(e,{isPremium:!0,needsPaidFeature:n,needsUpgrade:i})}function s(e){if(!e)return!1;switch(e.paymentPlanVersion){case 1:return"PRO"===e.mode;case 2:return null!=e.activeSubscription&&"v2:free"!==e.activeSubscription.product;case 3:return null!=e.activeSubscription&&"v3:free"!==e.activeSubscription.product}}function c(e){return!!e&&(e.activeSubscription?.canceled??!1)}function d(e){return!(e&&s(e))||!e.activeSubscription?.enterprise}function u(e){if(!e)return!1;switch(e.paymentPlanVersion){case 1:return"TRIAL"===e.mode;case 2:case 3:return e.activeSubscription?.status==="trialing"}}function p(e){return!!e?.activeSubscription?.status&&!i.includes(e.activeSubscription?.status)}function m(e,t){if(!e)return!1;switch(e.paymentPlanVersion){case 1:return"PRO"===e.mode;case 2:case 3:return t.every(t=>e.activeSubscription?.features.includes(t))}}function g(e){return!(!e||p(e))&&"FREE"!==e.mode}function y(e){if(!e)return!0;switch(e.paymentPlanVersion){case 1:return"PRO"!==e.mode;case 2:case 3:return!m(e,["disable-branding"])}}function f(e,t){if(!e)return!1;let{available_bulk:n,available_manual:a,available_pro:r,available_team:i,available_free:l,available_enterprise:o=0,used_bulk:s,used_manual:c,used_overdraft:d,used_subscription:u}=e.microCreditsBreakdown;return s+c+d+u>=(n+a+r+i+o+l)*t}function h(e){if(!e)return r.$Y.FREE;switch(e?.paymentPlanVersion){case 1:switch(e.mode){case"FREE":return r.$Y.FREE;case"TRIAL":return r.$Y.TRIAL;case"PRO":if(e.activeSubscription?.enterprise)return r.$Y.ENTERPRISE;return r.$Y.PRO}case 2:if(!e.activeSubscription?.product)return r.$Y.FREE;switch(e.mode){case"PRO":switch(e.activeSubscription.product){case"v2:free":case"v1:free":case"invalid":return r.Uk.FREE;case"v3:free":return r.nj.FREE;case"v1:pro":case"v2:pro":case"v2.1:starter":return r.Uk.STARTER;case"v1:business":case"v2:business":case"v2.1:teams":return r.Uk.TEAMS;case"v3:premium":return r.nj.PREMIUM;case"v3:enterprise":return r.nj.ENTERPRISE;case"v3:basic":return r.nj.BASIC;case"v2:enterprise":case"v2.1:enterprise":return r.Uk.ENTERPRISE}case"FREE":return r.$Y.FREE;case"TRIAL":return r.$Y.TRIAL}case 3:if(!e.activeSubscription?.product)return r.$Y.FREE;switch(e.mode){case"PRO":switch(e.activeSubscription.product){case"v2:free":case"v3:free":case"v1:free":case"invalid":return r.nj.FREE;case"v1:pro":case"v2:pro":case"v2.1:starter":return r.Uk.STARTER;case"v3:basic":return r.nj.BASIC;case"v1:business":case"v2:business":case"v2.1:teams":return r.Uk.TEAMS;case"v3:premium":return r.nj.PREMIUM;case"v2:enterprise":case"v2.1:enterprise":return r.Uk.ENTERPRISE;case"v3:enterprise":return r.nj.ENTERPRISE}case"FREE":return r.$Y.FREE;case"TRIAL":return r.$Y.TRIAL}}}function b(e,t){if(p(e))return"blocked";if(function(e){if(!e)return!1;switch(e.paymentPlanVersion){case 1:return!1;case 2:case 3:return e.activeSubscription?.gracePeriod!=null&&e.activeSubscription?.gracePeriod.daysRemaining>0}}(e))return"payment-issues";if(t&&e?.activeSubscription?.openInvoice!=null)return"payment-open-invoice";if(t&&e?.activeSubscription?.status&&(!i.includes(e.activeSubscription?.status)||null!=e.activeSubscription.gracePeriod||null!=e.activeSubscription.openInvoice))return"payment-issues";let n=u(e),a=d(e);return n&&!a&&t?"trial-contact-sales":f(e,1)?"credits-exhausted":f(e,.8)?"credits-low":t&&n&&3>=function(e){if(!e?.activeSubscription)return 0;let t=new Date(e.activeSubscription.currentPeriodEnd),n=new Date;return Math.ceil((t.getTime()-n.getTime())/864e5)}(e)?"trial-ending":null}function x(e,t){if(!e?.activeSubscription)return{forced:!1,available:!0};if("YEARLY"===e.activeSubscription.planPeriod)return{forced:!0,available:!0};let n=t??e.activeSubscription.product;if(3===e.paymentPlanVersion)switch(n){case"v3:free":case"v3:basic":case"v3:enterprise":return{forced:!1,available:!1}}return{forced:!1,available:!0}}function E(e){return!!e?.activeSubscription&&(e.paymentPlanVersion<3||!e.activeSubscription.product.startsWith("v3:"))}async function v(e,t){if(!e?.activeSubscription)return null;let n=await t.systemBardeenAccountGetPaymentDue(),a=h(e);return{amount:n?.nextPeriodCharge??null,credits:e.activeSubscription.tierCredits,title:a.meta.title,period:e.activeSubscription.planPeriod,valueProps:function(e){let t=e?.activeSubscription?.features??[];return[{title:"Premium scrapers",locked:!t.includes("premium-scraper")},{title:"Enrichment",locked:!t.includes("enrichment")},{title:"Teams",locked:!t.includes("teams")},{title:"Build your own scrapers",locked:!1}]}(e)}}},18206:(e,t,n)=>{n.d(t,{uh:()=>m});var a=n(10328),r=n(16335),i=n(62864),l=n(3460),o=n(59058),s=n(10634),c=n(99828),d=n(39629);r.object({schemaVersion:r.number,deletedTs:r.optional(r.number),clientVersion:r.nullish(r.string,"3.20.0")});let u=r.oneOf(["chatgpt","gemini","anthropic"]),p=(e,t)=>r.either(e,r.always(t));r.object({timeZone:r.optional(r.string),prefersFullHeight:p(r.boolean,!1),prefersAutoScale:p(r.boolean,!1),brandingEnabled:p(r.boolean,!0),debugClicks:p(r.boolean,!1),favoriteApps:p(r.nullable(r.array(r.string)),null),hasSeenAutobooksInfobox:p(r.boolean,!1),hasSeenOnboardingSlideshow:p(r.boolean,!1),hasSeenPlaybooksInfobox:p(r.boolean,!1),hasSeenResultsOnboarding:p(r.boolean,!1),hasSeenTrialEndedFlow:p(r.boolean,!1),marketingConsentReceiveEmails:p(r.boolean,!0),onboardingCompletedAt:p(r.iso8601.transform(e=>e.toISOString()),null),playbookSorting:p(s.Zq,{sort:"playbook.modified",order:"desc"}),seenTutorials:p(r.array(r.string),[]),synthesisDataCollection:p(r.boolean,!0),hasRanFirstPlaybook:p(r.nullable(r.boolean),null),hasSeenPlaybooksMerge:p(r.boolean,!0),hasActivatedFirstAutobook:p(r.nullable(r.boolean),null),hasInvitedFirstTeamMember:p(r.nullable(r.boolean),null),lastDismissedDynamicBanner:p(r.boolean,!1),skippedDraftPbWarning:p(r.boolean,!1),skippedSaveBeforeRunPlaybookConfirmation:p(r.boolean,!1),featureOverrides:p(r.record(r.boolean),{}),optimizePrompt:p(r.boolean,null),modelFamilyOverride:p(u,null),hasSeenStudioTestToggle:p(r.boolean,!1),prefersActivateAndCloseAutobook:p(r.boolean,!0)}),i.rc;let m={surveyResults:{},paymentDone:!1,bookingDone:!1,done:!1};r.object({totalTimeSaved:r.number});let g=r.record(d.MY).transform(e=>{let t=r.object({schemaVersion:r.optional(r.number,1),sessionId:r.optional(r.nonEmptyString,()=>y(e)),auth:r.optional(d.$F),metadata:r.optional(d.$F)}).verify(e);return{...e,...t}});function y(e){let t;switch(typeof e){case"string":t=e;break;case"object":t=null===e?"null":JSON.stringify(e);break;default:t=String(e)}return a.createHash("sha256").update(t).digest("hex").toString().slice(0,64)}r.object({id:r.nonEmptyString,version:r.nonEmptyString});let f=r.select(r.optional(r.unknown),e=>void 0===e||void 0!==Object(e).type?r.unknown.transform(()=>({lastAuthSessionId:y(e),status:"connected",since:new Date().getTime()})):r.taggedUnion("status",{connected:r.object({status:r.constant("connected"),since:r.number,lastAuthSessionId:r.optional(r.nonEmptyString,()=>y(e))}),disconnected:r.object({status:r.constant("disconnected"),since:r.number,lastAuthSessionId:r.optional(r.nonEmptyString,()=>y(e)),reason:r.nonEmptyString})})),h=r.object({manifest:r.object({id:r.nonEmptyString,version:r.nonEmptyString}),data:r.optional(g),state:f});r.record(h);let b=r.object({name:r.nonEmptyString,initializer:r.optional(r.pojo),schedule:c.uT}),x=r.object({blueprint:b,instanceId:r.nonEmptyString,title:r.string,target:r.oneOf(["local","server","server-trigger"]),sessionId:r.optional(r.string,""),autobookId:r.nonEmptyString,autobookRef:r.optional(o.g),enabled:r.boolean,disabledReason:r.nullable(r.string)}),E=r.select(r.unknown,e=>"string"==typeof e?r.string.transform(e=>({message:e})).pipe(l.BM):l.BM),v=r.object({startedTs:r.positiveInteger,triggeredTs:r.nullable(r.positiveInteger),lastError:r.nullish(E,null),failureCount:r.integer.refine(e=>e>=0,"failure count cannot be negative"),lastErrorTs:r.nullish(r.positiveInteger),status:r.oneOf(["disabled","running","pending","failed","teardown"]),triggerMessage:r.nullish(r.object({type:r.constant("markdown"),body:r.string}),null)}),C=r.object({uuid:r.uuid,spec:x,status:v,data:r.optional(d.$F)});r.record(C)},89387:(e,t,n)=>{n.d(t,{W7:()=>g,tW:()=>p,tb:()=>m});var a=n(16335),r=n(59058),i=n(14744),l=n(75201);let o=a.object({provider:a.constant("obs"),ref:r.g}),s=a.object({provider:a.constant("pb"),id:a.string}),c="synth",d=a.object({provider:a.constant(c),ref:r.g}),u=a.object({provider:a.constant("mem"),id:a.string}),p=a.taggedUnion("provider",{obs:o,pb:s,[c]:d,mem:u});function m(e){switch(e.provider){case"obs":case c:return`${e.provider}:${e.ref.uri}#${e.ref.rev}`;case"mem":return`${e.provider}:${e.id}`;case"pb":return e.id}}function g(e){try{let[t,...n]=e.split(":");if(!n.length)return{provider:"pb",id:e};let a=n.join(":");switch(i.ok(a,"Missing primary key component"),i.ok("obs"===t||t===c||"mem"===t,"Invalid provider catalog"),t){case"obs":{let[e,t]=a.split("#");i.ok(e,"Missing resource URI");let n=t?Number(t):0;return i.ok(!isNaN(n),"Last known revision must be a number"),{provider:"obs",ref:{uri:e,rev:n}}}case c:{let[e,t]=a.split("#");i.ok(e,"Missing resource URI");let n=t?Number(t):0;return i.ok(!isNaN(n),"Last known revision must be a number"),{provider:c,ref:{uri:e,rev:n}}}case"mem":return{provider:"mem",id:a};default:i.HB("Invalid provider name")}}catch(t){throw new l.x({ref:e,cause:t})}}},75201:(e,t,n)=>{n.d(t,{x:()=>r});var a=n(36213);class r extends a.F_{static #e=this.nameTemplate="Playbook:InvalidRef";static #t=this.is=e=>a.F_.is(e,r.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,r.nameTemplate);constructor(e){super(r.nameTemplate,"Invalid playbook reference",e)}}},93274:(e,t,n)=>{n.d(t,{w:()=>a});function a(e){if(!e)return null;switch(e.type){case"scalar":return e.value.text;case"complex":case"empty":case"error":case"loading":return null}}},96582:(e,t,n)=>{n.d(t,{Th:()=>a,X7:()=>l,_L:()=>r,td:()=>i});let a="Disabled by you",r="The autobook was modified",i="Disabled by the user";function l(e){if(!e)return!1;switch(e.status){case"disabled":case"teardown":return!1;case"running":case"pending":case"failed":return!0}}},86347:(e,t,n)=>{n.d(t,{KE:()=>r,OP:()=>a});let a=["append_data_frame_google_sheet_tab","update_google_sheet_rows_in_tab","do_append_records_from_table","test_export"],r={name:"Export",icon:"IntegrationGoogleSheets",description:"Export data to a spreadsheet",commands:[{icon:"IntegrationGoogleSheets",description:"Add to Google Sheet",commandId:"append_data_frame_google_sheet_tab",displayName:"Add to Google Sheet",pluginAlias:"GoogleSheets",needsPaidFeature:[],exportTableArg:"tabularData",copyArgsOver:[{importCommandId:"get_google_spreadsheet_content_as_table",importArgName:"sheet",exportArgName:"sheet"},{importCommandId:"get_google_spreadsheet_content_as_table",importArgName:"tab",exportArgName:"tab"}]},{icon:"IntegrationGoogleSheets",description:"Update rows in existing Google Sheet",commandId:"update_google_sheet_rows_in_tab",displayName:"Update rows in Google Sheet",pluginAlias:"GoogleSheets",needsPaidFeature:[],exportTableArg:"data",copyArgsOver:[{importCommandId:"get_google_spreadsheet_content_as_table",importArgName:"sheet",exportArgName:"sheet"},{importCommandId:"get_google_spreadsheet_content_as_table",importArgName:"tab",exportArgName:"tab"}]},{icon:"IntegrationAirtable",description:"Append data to an existing Airtable",commandId:"do_append_records_from_table",displayName:"Append to Existing Airtable",pluginAlias:"Airtable",needsPaidFeature:[],exportTableArg:"table",copyArgsOver:[]}]}},21416:(e,t,n)=>{n.d(t,{ER:()=>o,Fw:()=>r,N4:()=>l,Vd:()=>a,bY:()=>c,gl:()=>i});let a=["use_combined_scaper_model_on_active_tab","act_using_goal"],r=[...a,"use_combined_scaper_model_in_background","act_using_goal_in_background","get_google_spreadsheet_content_as_table","get_all_values_from_table","notion_get_pages","do_create_fake_data","identity"];function i(e){return r.includes(e)}let l=[{icon:"IntegrationScraper",description:"Use a scraper template to extract data from websites on the active tab.",commandId:"use_combined_scaper_model_on_active_tab",displayName:"Use a scraper template on the active tab.",pluginAlias:"Scraper",needsPaidFeature:[]},{icon:"IntegrationScraper",description:"Use a scraper template to extract data from websites in the background.",commandId:"use_combined_scaper_model_in_background",displayName:"Use a scraper template in the background.",pluginAlias:"Scraper",needsPaidFeature:[]}],o=[{icon:"IntegrationScraper",description:"Describe what information you need from a website and AI will find and extract it for you.",commandId:"act_using_goal",displayName:"Scrape with a goal on the active tab.",needsPaidFeature:[],pluginAlias:"Scraper"},{icon:"IntegrationScraper",description:"Describe what information you need from a website and AI will find and extract it for you.",commandId:"act_using_goal_in_background",displayName:"Scrape with a goal in the background.",pluginAlias:"Scraper",needsPaidFeature:[]}],s=[{icon:"IntegrationGoogleSheets",description:"Get data from a Google Sheet",commandId:"get_google_spreadsheet_content_as_table",displayName:"Get data from a Google Sheet",pluginAlias:"GoogleSheets",needsPaidFeature:[]},{icon:"IntegrationAirtable",description:"Get values from table in Airtable",commandId:"get_all_values_from_table",displayName:"Get values from table in Airtable",pluginAlias:"Airtable",needsPaidFeature:[]},{icon:"IntegrationNotion",description:"Get data from a Notion page",commandId:"notion_get_pages",displayName:"Get data from a Notion page",pluginAlias:"Notion",needsPaidFeature:[]}],c={name:"Import from a sheet",icon:"TexturedDownload",description:"Import existing data from a Google Sheet, Airtable or Notion.",commands:s};[...l,...o,...s]},43955:(e,t,n)=>{n.d(t,{Nq:()=>r,tc:()=>a,uB:()=>i});let a=["use_combined_scaper_model_in_background","act_using_goal_in_background","get_perplexity_chat_completion","get_bing_web_page","get_answers_from_text","get_simple_classification_of","get_generated_text","get_phone_validation","do_verify_email","get_persons_data_from_email","get_company_info_from_domain","get_cleaned_url_from_url","get_redirected_url_starting_from_url","all_emails_from_text","all_phone_numbers_as_string_from_text","extract_links","get_split_strings","convert_to_string","array_nth_item","split_person_name","get_filtered_strings","get_time_difference","get_current_time","identity","identity_paid","do_create_fake_data"],r=[{name:"Add Column",icon:"AddFileOutline",description:"Create a new column with a custom value",commands:[{commandId:"identity",pluginAlias:"BardeenCommons",displayName:"New Column",description:"Create a new column with a custom value",icon:"AddFileOutline",needsPaidFeature:[]}]},{name:"Find X in Text",icon:"MagnifierOutline",description:"Finds information in a given text",commands:[{commandId:"all_emails_from_text",pluginAlias:"BardeenCommons",description:"Finds all emails in a given text",displayName:"Find email in text",icon:"MagnifierOutline",needsPaidFeature:[]},{commandId:"all_phone_numbers_as_string_from_text",pluginAlias:"BardeenCommons",description:"Finds all phone numbers in a given text",displayName:"Find phone number in text",icon:"MagnifierOutline",needsPaidFeature:[]},{commandId:"extract_links",pluginAlias:"BardeenCommons",description:"Extracts all links and URLs from a given text",displayName:"Find links in text",icon:"MagnifierOutline",needsPaidFeature:[]},{commandId:"get_filtered_strings",pluginAlias:"BardeenCommons",description:"Filters a given string, text or URL for a given filter regex or expression.",displayName:"Find using regular expression",icon:"MagnifierOutline",needsPaidFeature:[]}]},{name:"Clean URL",icon:"MagicWandOutline",description:"Cleans a given URL from all it's parameters.",commands:[{commandId:"get_cleaned_url_from_url",pluginAlias:"BardeenCommons",description:"Cleans a given URL from all it's parameters.",displayName:"Clean URL",icon:"MagicWandOutline",needsPaidFeature:[]},{commandId:"get_redirected_url_starting_from_url",pluginAlias:"BardeenCommons",description:"Follows the redirects, starting from the given URL, and returns the final URL it arrives at.",displayName:"Get Redirected URL",icon:"MagicWandOutline",needsPaidFeature:[]}]},{name:"Utilities",icon:"HoverOutline",description:"Utilities actions",commands:[{commandId:"get_split_strings",pluginAlias:"BardeenCommons",description:"Splits a string into a list of strings",displayName:"Split strings",icon:"HoverOutline",needsPaidFeature:[]},{commandId:"convert_to_string",pluginAlias:"BardeenCommons",description:"Converts a value to string",displayName:"Convert to string",icon:"HoverOutline",needsPaidFeature:[]},{commandId:"array_nth_item",pluginAlias:"BardeenCommons",description:"Get a specific element out of the list",displayName:"Get element from list",icon:"HoverOutline",needsPaidFeature:[]},{commandId:"split_person_name",pluginAlias:"BardeenCommons",description:"Split a full name into given (first) and family (last) name.",displayName:"Split person name",icon:"HoverOutline",needsPaidFeature:[]},{commandId:"get_time_difference",pluginAlias:"BardeenCommons",description:"Calculates the difference between two timestamps",displayName:"Get time difference",icon:"HistoryOutline",needsPaidFeature:[]},{commandId:"get_current_time",pluginAlias:"BardeenCommons",description:"Gets the current timestamp",displayName:"Current time",icon:"HistoryOutline",needsPaidFeature:[]}]}],i=[{name:"Scraper",icon:"IntegrationScraper",description:"Scrape data from web",commands:[{commandId:"use_combined_scaper_model_in_background",pluginAlias:"Scraper",description:"Use a scraper template to extract data from websites.",displayName:"Scrape with a Template",icon:"IntegrationScraper",needsPaidFeature:[]},{commandId:"act_using_goal_in_background",pluginAlias:"Scraper",description:"Describe what information you need from a website and AI will find and extract it for you.",displayName:"Scrape with a goal",icon:"CmdScrapeWithGoal",needsPaidFeature:[]}]},{name:"Enrichment",description:"Enrich data with additional information",icon:"IntegrationBardeenEnrichment",commands:[{commandId:"get_phone_validation",pluginAlias:"BardeenEnrichment",displayName:"Validate phone number",description:"Verify the validity of a phone number, and detect its type, country, carrier, and format information.",icon:"CmdValidatePhone",needsPaidFeature:["enrichment"]},{commandId:"do_verify_email",pluginAlias:"BardeenEnrichment",displayName:"Validate Email",description:"Check the validity of an email address; check if it's disposable or belongs to a free domain.",icon:"CmdValidateEmail",needsPaidFeature:["enrichment"]},{commandId:"get_persons_data_from_email",pluginAlias:"BardeenEnrichment",displayName:"Get a person's data",description:"Get a person's contact, social and employment information based on any known data.",icon:"CmdGetPersonsData",needsPaidFeature:["enrichment"]},{commandId:"get_company_info_from_domain",pluginAlias:"BardeenEnrichment",displayName:"Enrich Company's Socials",description:"Get a company's info with industry, description, size, contact, social and other information",icon:"CmdEnrichCompanySocials",needsPaidFeature:["enrichment"]}]},{name:"WebSearch",icon:"IntegrationWebSearch",description:"Search the web for information",commands:[{pluginAlias:"WebSearch",commandId:"get_bing_web_page",displayName:"Search the Web",description:"Search the web for information",icon:"IntegrationWebSearch",needsPaidFeature:[]}]},{name:"AI Qualification",icon:"CmdClassifier",description:"Qualify data with AI",commands:[{pluginAlias:"BardeenAI",commandId:"get_simple_classification_of",displayName:"Qualify data",description:"Check whether data is qualified according to given criteria",icon:"TexturedCategory",needsPaidFeature:[]}]},{name:"AI Generation",icon:"IntegrationBardeenAI",description:"Generate data with AI",commands:[{pluginAlias:"BardeenAI",commandId:"get_generated_text",displayName:"Generate text",description:"Generate text with a custom prompt",icon:"IntegrationBardeenAI",needsPaidFeature:[]}]},{name:"AI Analysis",icon:"IntegrationWebSearch",description:"Analyze text and get answers with AI",commands:[{pluginAlias:"BardeenAI",commandId:"get_answers_from_text",displayName:"Get answers with AI",description:"Get questions answered from text using AI",icon:"IntegrationWebSearch",needsPaidFeature:[]}]},{name:"AI Search",icon:"IntegrationAISearchReport",description:"Search the web for information with AI",commands:[{pluginAlias:"WebSearch",commandId:"get_perplexity_chat_completion",displayName:"Search with AI",description:"Search the web for information with AI",icon:"IntegrationAISearchReport",needsPaidFeature:[]}]}];[...i.flatMap(e=>e.commands),...r.flatMap(e=>e.commands)]},88389:(e,t,n)=>{n.d(t,{Wu:()=>r,qv:()=>a});let a=["when_schedule"],r={name:"Schedule Run",icon:"BardeenLogoV4",description:"Trigger an action",commands:[{icon:"BardeenLogoV4",description:"When a schedule",commandId:"when_schedule",displayName:"When a schedule event occurs",pluginAlias:"BardeenCommons",needsPaidFeature:[]}]}},3756:(e,t,n)=>{n.d(t,{AQ:()=>m,Bs:()=>p,El:()=>c,Nf:()=>o,Qo:()=>s,UR:()=>d,ir:()=>u});var a=n(86347),r=n(21416),i=n(43955),l=n(88389);let o=e=>{if(!e)return null;switch(e.type){case"IfStatement":{let t="BlockStatement"===e.ifTrue.type&&e.ifTrue.children?.[0]?e.ifTrue.children[0]:null;if(t&&"FunctionCallStatement"===t.type)return t;return null}case"FunctionCallStatement":return e;default:return null}},s=(e,t)=>{let n=o(e);return!!n&&t.some(e=>e===n.name)},c=e=>s(e,l.qv),d=e=>s(e,a.OP),u=e=>{let t=e.statements[0]??null,n=e.statements[e.statements.length-1]??null,o=e.trigger??null,c=t&&s(t,r.Fw),d=n&&s(n,a.OP),u=o&&s(o,l.qv);if(t&&!c||o&&!u||o&&t&&s(t,r.Vd))throw Error("Playbook is incompatible with this version of Bardeen");let p=e.statements.slice(c?1:0,d?-1:void 0);for(let e of p)if(!s(e,i.tc))throw Error("Playbook is incompatible with this version of Bardeen");return{importStatement:c?t:null,statements:p,exportStatement:d?n:null,triggerStatement:u?o:null}},p=(e,t)=>({...e,trigger:t.triggerStatement,statements:[t.importStatement,...t.statements,t.exportStatement].filter(e=>null!==e)}),m=e=>{let{importStatement:t}=u(e);return t&&!s(t,r.Vd)}},29190:(e,t,n)=>{n.d(t,{Bv:()=>s,Cz:()=>l,Xe:()=>o,pR:()=>i});var a=n(14744),r=n(81361);function i(e,t,n){let{compareComments:o=!1,compareStatementIndex:s=!1,compareStatementOutput:c=!1,compareColumnData:d=!0}=n;switch(e.type){case"BlockStatement":if(t.type!==e.type||c&&e.output!==t.output||o&&e.comment!==t.comment||o&&!(0,r.S)(e.commentFlags,t.commentFlags)||s&&e.index!==t.index||e.children.length!==t.children.length)return!1;for(let a=0;a<e.children.length;a++)if(!i(e.children[a],t.children[a],n))return!1;return!0;case"ForStatement":if(t.type!==e.type||c&&e.output!==t.output||o&&e.comment!==t.comment||o&&!(0,r.S)(e.commentFlags,t.commentFlags)||s&&e.index!==t.index||e.varName!==t.varName||!l(e.iterable,t.iterable,n)||!i(e.body,t.body,n))return!1;return!0;case"FunctionCallStatement":if(t.type!==e.type||c&&e.output!==t.output||o&&e.comment!==t.comment||o&&!(0,r.S)(e.commentFlags,t.commentFlags)||s&&e.index!==t.index||e.name!==t.name||e.plugin!==t.plugin||e.varName!==t.varName||e.args.length!==t.args.length)return!1;for(let a=0;a<e.args.length;a++){let r=e.args[a],i=t.args[a];if(r.name!==i.name||!l(r.value,i.value,n)||r.required!==i.required)return!1}if(!d)return!0;if(e.columns.length!==t.columns.length)return!1;for(let n=0;n<e.columns.length;n++){let a=e.columns[n],r=t.columns[n];if(a.id!==r.id||a.title!==r.title||a.selected!==r.selected)return!1}return!0;case"IfStatement":if(t.type!==e.type||c&&e.output!==t.output||o&&e.comment!==t.comment||o&&!(0,r.S)(e.commentFlags,t.commentFlags)||s&&e.index!==t.index||e.mode!==t.mode||e.varName!==t.varName||!l(e.conditionExpr,t.conditionExpr,n)||!l(e.partitionExpr,t.partitionExpr,n)||!i(e.ifTrue,t.ifTrue,n)||!i(e.ifFalse,t.ifFalse,n))return!1;return!0;default:a.HB(e)}}function l(e,t,n){let{compareUpdateTimestamp:i=!0}=n;if(null===e&&null===t)return!0;if(null===e||null===t)return!1;switch(e.type){case"ArrayLiteralExpression":if(t.type!==e.type||e.elements.length!==t.elements.length||e.mode!==t.mode)return!1;for(let a=0;a<e.elements.length;a++)if(!l(e.elements[a],t.elements[a],n))return!1;return!0;case"BCLFragmentExpression":if(t.type!==e.type||e.code!==t.code)return!1;return!0;case"CastExpression":if(t.type!==e.type||!l(e.expression,t.expression,n)||!(0,r.S)(e.typeHint.signature,t.typeHint.signature))return!1;return!0;case"ConstantValueExpression":if(t.type!==e.type)return!1;let o=e.value,s=t.value;if(!i&&(o&&"object"==typeof o&&"_updated"in o&&(o={...o,_updated:void 0}),s&&"object"==typeof s&&"_updated"in s&&(s={...s,_updated:void 0})),!(0,r.S)(o,s))return!1;return!0;case"FieldAccessExpression":if(t.type!==e.type||e.field!==t.field||!l(e.expression,t.expression,n))return!1;return!0;case"FieldRemappingExpression":if(t.type!==e.type||e.accordingTo!==t.accordingTo||!l(e.expression,t.expression,n))return!1;return!0;case"MissingExpression":if(t.type!==e.type)return!1;return!0;case"ObjectLiteralExpression":if(t.type!==e.type||e.fields.length!==t.fields.length)return!1;for(let a=0;a<e.fields.length;a++){let r=e.fields[a],i=t.fields[a];if(r.name!==i.name||r.title!==i.title||r.struct!==i.struct||!l(r.value,i.value,n))return!1}return!0;case"ObjectStorageReferenceExpression":if(t.type!==e.type||!(0,r.S)(e.ref,t.ref)||!(0,r.S)(e.typeHint.signature,t.typeHint.signature))return!1;return!0;case"ObjectStorageSearchExpression":if(t.type!==e.type||!(0,r.S)(e.args,t.args)||!(0,r.S)(e.typeHint.signature,t.typeHint.signature))return!1;return!0;case"OperatorExpression":if(t.type!==e.type||e.op!==t.op||e.arity!==t.arity||e.arity!==t.arity||e.args.length!==t.args.length)return!1;for(let a=0;a<e.args.length;a++)if(!l(e.args[a],t.args[a],n))return!1;return!0;case"StringTemplatingExpression":if(t.type!==e.type||e.mimeType!==t.mimeType||e.children.length!==t.children.length)return!1;for(let i=0;i<e.children.length;i++)if(!function e(t,n,i){if("StringTemplatingTextNode"===t.type)return!!(t.type===n.type&&t.text===n.text&&(0,r.S)(t.format,n.format));if("StringTemplatingVariableNode"===t.type)return!!(t.type===n.type&&l(t.value,n.value,i)&&l(t.defaultValue,n.defaultValue,i)&&(0,r.S)(t.join,n.join));if("StringTemplatingGenerateNode"===t.type)return!!(t.type===n.type&&l(t.prompt,n.prompt,i));if("StringTemplatingBlockFormattingNode"===t.type){if(t.type!==n.type||t.element!==n.element||t.children.length!==n.children.length)return!1;for(let a=0;a<t.children.length;a++)if(!e(t.children[a],n.children[a],i))return!1;return!0}if("StringTemplatingInlineFormattingNode"===t.type){if(t.type!==n.type||t.element!==n.element||!(0,r.S)(t.attributes,n.attributes)||t.children.length!==n.children.length)return!1;for(let a=0;a<t.children.length;a++)if(!e(t.children[a],n.children[a],i))return!1;return!0}if("StringTemplatingEmbedNode"===t.type)return!!(t.type===n.type&&t.element===n.element&&(0,r.S)(t.attributes,n.attributes));a.HB(t)}(e.children[i],t.children[i],n))return!1;return!0;case"VarRefExpression":if(t.type!==e.type||e.name!==t.name)return!1;return!0;case"TableColumnReferenceExpression":if(t.type!==e.type||e.id!==t.id)return!1;return!0;default:a.HB(e)}}function o(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{compareComments:a,compareMetadata:i,comparePlaybookArgumentValues:o}=n;if(e.length!==t.length)return!1;for(let s=0;s<e.length;s++){let c=e[s],d=t[s];if(c.name!==d.name||a&&c.comment!==d.comment||a&&!(0,r.S)(c.commentFlags,d.commentFlags)||i&&c.label!==d.label||c.struct!==d.struct||c.required!==d.required||!c.name.startsWith("__mapping")&&!(0,r.S)(c.typeHint.signature,d.typeHint.signature)||o&&(!0===o||o===c.save||o===d.save)&&(c.save!==d.save||!l(c.value,d.value,n)))return!1}return!0}function s(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{compareComments:a,compareFlags:l,compareMetadata:s,comparePlaybookArgumentValues:c}=n;if(s&&(e.meta.name!==t.meta.name||e.meta.description!==t.meta.description||!(0,r.S)(e.meta.customPaidFeatures,t.meta.customPaidFeatures))||a&&e.comment!==t.comment||l&&!(0,r.S)(e.flags,t.flags)||!o(e.args,t.args,{compareComments:a,compareMetadata:s,comparePlaybookArgumentValues:c}))return!1;if(null!==e.trigger&&null!==t.trigger){if(!i(e.trigger,t.trigger,n))return!1}else if(null!==e.trigger||null!==t.trigger)return!1;if(e.statements.length!==t.statements.length)return!1;for(let a=0;a<e.statements.length;a++)if(!i(e.statements[a],t.statements[a],n))return!1;return!0}},49908:(e,t,n)=>{n.d(t,{n:()=>r});var a=n(99538);function r(e){let t=new Set;(0,a.bZ)(e,{visitStatement:e=>("varName"in e&&t.add(e.varName),!0)});for(let e=0;;++e){let n=`__${e}`;if(!t.has(n))return n}}},94303:(e,t,n)=>{n.d(t,{EO:()=>d,NM:()=>i,_c:()=>s,oN:()=>l,ul:()=>o});var a=n(91159),r=n(99538);function i(e){let t="ObjectOutline",n="Action",r=null;if(!e)return{statementName:n,statementIcon:t,statementComment:r};switch(e.type){case"FunctionCallStatement":{t=e.displayHint?.command.icon||e.displayHint?.plugin.icon||t;let i=(0,a.ZH)(e.displayHint?.command.expressions[0]??"");n=e.commentFlags.keep&&e.comment||i,r=e.comment;break}case"ForStatement":t="LoopOutline",n="Loop",r=e.comment;break;case"IfStatement":t="ConditionalBold",n="Condition",r=e.comment}return{statementIcon:t,statementName:n,statementComment:r}}function l(e){switch(e.type){case"internal":case"deprecated":case"missing":case"unsupported":return e.severity;case"invalid":return e.error.severity;case"disconnected":return"error"}}function o(e){return c(e,"error")}function s(e){return c(e,"warning")}function c(e,t){let n=[],a=null,o=null,s={statementIcon:"ObjectOutline",statementName:"Action",statementComment:null};return(0,r.bZ)(e,{visitStatement:e=>{if(s=i(a=e),o="IfStatement"===e.type?{name:"condition",displayHint:{label:"Condition",description:"The condition to evaluate"}}:"ForStatement"===e.type?{name:"iterator",displayHint:{label:"Value",description:"The value to iterate"}}:null,e.validationStatus&&e.validationStatus.length>0)for(let a of e.validationStatus.filter(e=>"disconnected"!==e.type&&l(e)===t))n.push({statementIndex:e.index,argumentName:null,status:a,...s});return!0},visitFunctionArgument:e=>{if(o=e,e.validationStatus&&e.validationStatus.length>0)for(let r of e.validationStatus.filter(e=>"disconnected"!==e.type&&l(e)===t))n.push({statementIndex:a?.index??-1,argumentName:e.name,argumentLabel:e.displayHint?.label,status:r,...s});return!0},visitExpression:e=>{if("validationStatus"in e&&e.validationStatus&&e.validationStatus.length>0)for(let r of e.validationStatus.filter(e=>"disconnected"!==e.type&&l(e)===t))n.push({statementIndex:a?.index??-1,argumentName:o?.name??null,argumentLabel:o?.displayHint?.label,status:r,...s});return!0}}),n}function d(e){return o(e).length>0}},99538:(e,t,n)=>{n.d(t,{Co:()=>c,Cw:()=>r,GY:()=>s,b:()=>i,bZ:()=>l});var a=n(39629);function r(e,t){if(!e)return!0;function n(e,t){return!e||e(t)}if(!n(t.visitExpression,e))return!1;switch(e.type){case"ArrayLiteralExpression":if(!n(t.visitArrayLiteralExpression,e))return!1;for(let n of e.elements)if(!r(n,t))return!1;break;case"BCLFragmentExpression":if(!n(t.visitBCLFragmentExpression,e))return!1;break;case"CastExpression":if(!n(t.visitCastExpression,e)||!r(e.expression,t))return!1;break;case"ConstantValueExpression":if(!n(t.visitConstantValueExpression,e))return!1;break;case"FieldAccessExpression":if(!n(t.visitFieldAccessExpression,e)||!r(e.expression,t))return!1;break;case"MissingExpression":if(!n(t.visitMissingExpression,e))return!1;break;case"ObjectLiteralExpression":if(!n(t.visitObjectLiteralExpression,e))return!1;for(let n of e.fields)if(!r(n.value,t))return!1;break;case"ObjectStorageReferenceExpression":if(!n(t.visitObjectStorageReferenceExpression,e))return!1;break;case"ObjectStorageSearchExpression":if(!n(t.visitObjectStorageSearchExpression,e))return!1;break;case"OperatorExpression":if(!n(t.visitOperatorExpression,e))return!1;for(let n of e.args)if(!r(n,t))return!1;break;case"StringTemplatingExpression":if(!n(t.visitStringTemplatingExpression,e))return!1;for(let n of e.children)if(!r(n,t))return!1;break;case"StringTemplatingTextNode":if(!n(t.visitStringTemplatingTextNode,e))return!1;break;case"StringTemplatingVariableNode":if(!n(t.visitStringTemplatingVariableNode,e)||!r(e.value,t)||e.defaultValue&&!r(e.defaultValue,t))return!1;break;case"StringTemplatingGenerateNode":if(!n(t.visitStringTemplatingGenerateNode,e)||!r(e.prompt,t))return!1;break;case"StringTemplatingInlineFormattingNode":if(!n(t.visitStringTemplatingInlineFormattingNode,e))return!1;for(let n of e.children)if(!r(n,t))return!1;break;case"StringTemplatingBlockFormattingNode":if(!n(t.visitStringTemplatingBlockFormattingNode,e))return!1;for(let n of e.children)if(!r(n,t))return!1;break;case"StringTemplatingEmbedNode":if(!n(t.visitStringTemplatingEmbedNode,e))return!1;break;case"VarRefExpression":if(!n(t.visitVarRefExpression,e))return!1;break;case"FieldRemappingExpression":if(!n(t.visitFieldRemappingExpression,e)||!r(e.expression,t))return!1;break;case"TableColumnReferenceExpression":if(!n(t.visitTableColumnReferenceExpression,e))return!1}return!0}function i(e,t){var n,a,l,o,s,c;if(!e)return!0;if(!(!(n=t.visitStatement)||n(e)))return!1;switch(e.type){case"BlockStatement":if(!(!(a=t.visitBlockStatement)||a(e)))return!1;for(let n of e.children)if(!i(n,t))return!1;break;case"ForStatement":if(!(!(l=t.visitForStatement)||l(e))||!r(e.iterable,t)||!i(e.body,t))return!1;break;case"FunctionCallStatement":if(!(!(o=t.visitFunctionCallStatement)||o(e)))return!1;for(let n of e.args)if(!(!(s=t.visitFunctionArgument)||s(n))||n.value&&!r(n.value,t))return!1;break;case"IfStatement":if(!(!(c=t.visitIfStatement)||c(e))||!r(e.conditionExpr,t)||!i(e.ifTrue,t)||!i(e.ifFalse,t))return!1}return!0}function l(e,t){if(!e)return!0;for(let n of e.args)if(n.value&&!r(n.value,t))return!1;if(e.trigger&&!i(e.trigger,t))return!1;for(let n of e.statements)if(!i(n,t))return!1;return!0}function o(e,t){if(!e)return e;function n(e,t){return e?e(t):t}switch(e.type){case"ArrayLiteralExpression":{let r=e.elements.map(e=>o(e,t)).filter(a.zz);return n(t.transformArrayLiteralExpression,{...e,elements:r})}case"BCLFragmentExpression":return n(t.transformBCLFragmentExpression,e);case"CastExpression":{let a=o(e.expression,t);if(!a)return null;return n(t.transformCastExpression,{...e,expression:a})}case"ConstantValueExpression":return n(t.transformConstantValueExpression,e);case"FieldAccessExpression":{let a=o(e.expression,t);if(!a)return null;return n(t.transformFieldAccessExpression,{...e,expression:a})}case"MissingExpression":return n(t.transformMissingExpression,e);case"ObjectLiteralExpression":{let r=e.fields.map(e=>{let n=o(e.value,t);return n?{...e,value:n}:null}).filter(a.zz);return n(t.transformObjectLiteralExpression,{...e,fields:r})}case"ObjectStorageReferenceExpression":return n(t.transformObjectStorageReferenceExpression,e);case"ObjectStorageSearchExpression":return n(t.transformObjectStorageSearchExpression,e);case"OperatorExpression":{let r=e.args.map(e=>o(e,t)).filter(a.zz);return n(t.transformOperatorExpression,{...e,args:r})}case"StringTemplatingExpression":{let r=e.children.map(e=>(function e(t,n){switch(t.type){case"StringTemplatingVariableNode":{let e=o(t.value,n);if(!e)return null;return{...t,value:e}}case"StringTemplatingGenerateNode":{let e=o(t.prompt,n);if(!e)return null;return{...t,prompt:e}}case"StringTemplatingBlockFormattingNode":{let r=t.children.map(t=>e(t,n)).filter(a.zz);return{...t,children:r}}case"StringTemplatingInlineFormattingNode":{let r=t.children.map(t=>e(t,n)).filter(a.zz);return{...t,children:r}}case"StringTemplatingEmbedNode":case"StringTemplatingTextNode":return t}})(e,t)).filter(a.zz);return n(t.transformStringTemplatingExpression,{...e,children:r})}case"FieldRemappingExpression":{let a=o(e.expression,t);if(!a)return null;return n(t.transformFieldRemappingExpression,{...e,expression:a})}case"VarRefExpression":return n(t.transformVarRefExpression,e);case"TableColumnReferenceExpression":return n(t.transformTableColumnReferenceExpression,e)}}function s(e,t){var n,r,i,l,c,d,u,p;if(!e)return e;switch(e.type){case"BlockStatement":{let i=e.children.map(e=>s(e,t)).filter(a.zz);return n=t.transformBlockStatement,r={...e,children:i},n?n(r):r}case"ForStatement":{let n=o(e.iterable,t);if(!n)return null;let a=s(e.body,t);if(!a)return null;return i=t.transformForStatement,l={...e,iterable:n,body:a},i?i(l):l}case"FunctionCallStatement":{let n=e.args.map(e=>({...e,value:e.value?o(e.value,t):null}));return c=t.transformFunctionCallStatement,d={...e,args:n},c?c(d):d}case"IfStatement":{let n=o(e.conditionExpr,t);if(!n)return null;let a=s(e.ifTrue,t);if(!a)return null;let r=s(e.ifFalse,t);if(!r)return null;return u=t.transformIfStatement,p={...e,conditionExpr:n,ifTrue:a,ifFalse:r},u?u(p):p}}}function c(e,t){return e?{...e,args:e.args.map(e=>({...e,value:e.value?o(e.value,t):null})),trigger:e.trigger?s(e.trigger,t):null,statements:e.statements.flatMap(e=>{let n=s(e,t);return n?[n]:[]})}:null}},45216:(e,t,n)=>{n.d(t,{zZ:()=>b,YK:()=>g,MY:()=>function e(t,n){switch(t.type){case"OpField":let a=n.find(e=>e.id===t.column)?.title;if(!a)return null;if(s.includes(t.op.id))return`${f(a)}.${t.op.id}()`;if(c.includes(t.op.id))return`${f(a)}.${t.op.id}(${h(t.value)})`;if(d.includes(t.op.id))return`${f(a)} ${t.op.id} ${h(t.value)}`;return null;case"OpCombination":if(1===t.args.length)return e(t.args[0],n);return t.args.map(t=>e(t,n)).filter(e=>null!==e).join(` ${t.combine} `)}}});var a=n(16335),r=n(88236),i=n(79382),l=n(41917),o=n(34569);let s=["empty","notEmpty","error"],c=["contains","endsWith","failedWith","icontains","inotContains","notContains","startsWith"],d=["==","!=",">=","<=",">","<"],u=(e,t)=>({id:e,arity:t,displayHint:{icon:"RadioQuestionOutline",label:e}});class p extends SyntaxError{constructor(e,t,n,a){super(e),this.expected=t,this.found=n,this.location=a,this.name="SyntaxError"}format(e){let t="Error: "+this.message;if(this.location){let n=null,a=e.find(e=>e.source===this.location.source);a&&(n=a.text.split(/\r\n|\n|\r/g));let r=this.location.start,i=this.location.source&&"function"==typeof this.location.source.offset?this.location.source.offset(r):r,l=this.location.source+":"+i.line+":"+i.column;if(n){let e=this.location.end,a="".padEnd(i.line.toString().length," "),o=n[r.line-1],s=(r.line===e.line?e.column:o.length+1)-r.column||1;t+="\n --\x3e "+l+"\n"+a+" |\n"+i.line+" | "+o+"\n"+a+" | "+"".padEnd(r.column-1," ")+"".padEnd(s,"^")}else t+="\n at "+l}return t}static buildMessage(e,t){function n(e){return e.codePointAt(0).toString(16).toUpperCase()}let a=Object.prototype.hasOwnProperty.call(RegExp.prototype,"unicode")?RegExp("[\\p{C}\\p{Mn}\\p{Mc}]","gu"):null;function r(e){return a?e.replace(a,e=>"\\u{"+n(e)+"}"):e}function i(e){return r(e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,e=>"\\x0"+n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g,e=>"\\x"+n(e)))}function l(e){return r(e.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,e=>"\\x0"+n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g,e=>"\\x"+n(e)))}let o={literal:e=>'"'+i(e.text)+'"',class(e){let t=e.parts.map(e=>Array.isArray(e)?l(e[0])+"-"+l(e[1]):l(e));return"["+(e.inverted?"^":"")+t.join("")+"]"+(e.unicode?"u":"")},any:()=>"any character",end:()=>"end of input",other:e=>e.description};function s(e){return o[e.type](e)}return"Expected "+function(e){let t=e.map(s);if(t.sort(),t.length>0){let e=1;for(let n=1;n<t.length;n++)t[n-1]!==t[n]&&(t[e]=t[n],e++);t.length=e}switch(t.length){case 1:return t[0];case 2:return t[0]+" or "+t[1];default:return t.slice(0,-1).join(", ")+", or "+t[t.length-1]}}(e)+" but "+(t?'"'+i(t)+'"':"end of input")+" found."}}let m=a.object({start:a.object({offset:a.number,line:a.number,column:a.number}),end:a.object({offset:a.number,line:a.number,column:a.number})});function g(e,t){let n=a.object({type:a.constant("OpCombination"),combine:a.oneOf(["||","&&"]),args:a.array(a.lazy(()=>a.either(y,n)))}),l=a.lazy(()=>a.either(y,n)),g=[],y=a.object({type:a.constant("OpField"),column:a.object({title:a.string,location:m}).transform(e=>{let n=t.find(t=>t.title.toLowerCase()===e.title.toLocaleLowerCase());if(!n)throw g.push({message:`Column '${e.title}' does not exist`,location:e.location}),Error("aborted");return n.id}),op:a.object({arity:a.number,id:a.string,displayHint:a.object({icon:o.q$,label:a.string})}),value:a.nullable(a.either(a.string,a.number,a.null_).transform(e=>{switch(typeof e){case"string":return{type:"ConstantValueExpression",value:r.g.createWithText(e),displayHint:{label:e,description:"Plain Text"}};case"number":return{type:"ConstantValueExpression",value:i.c.from(e),displayHint:{label:Number(e).toString(),description:"Number"}};default:return null}}))});try{let t=l.decode(function(e,t){let n;let a={},r=(t=void 0!==t?t:{}).grammarSource,i={RootExpr:eT},l=eT,o="null",m=/^[!=><]/,g=/^[A-Za-z0-9_ ]/,y=/^[ \t\v\f\xA0\uFEFF]/,f=/^[A-Z]/,h=/^[^\\"\r\n]/,b=/^[^\\'\r\n]/,x=/^[0-9a-fA-F]/,E=/^[0-9]/,v=/^[eE]/,C=/^[+\-]/,S=eA("column name"),k=ek("{",!1),w=ek("}",!1),A=eA("column value"),I=ek(".",!1),P=ek("(",!1),$=ek(")",!1),T=ek("||",!1),F=ek("&&",!1),R=eA("expression operator"),M=ew(["!","=",">","<"],!1,!1,!1),O=eA("function with arguments"),_=eA("function without arguments"),N=eA("plain text"),B=ew([["A","Z"],["a","z"],["0","9"],"_"," "],!1,!1,!1),D=eA("whitespace"),H=ew([" ","	","\v","\f","\xa0","\uFEFF"],!1,!1,!1),z=ew([["A","Z"]],!1,!1,!1),L={type:"any"},U=eA("identifier"),V=eA("null"),q=ek("null",!1),j=ew(["\\",'"',"\r","\n"],!0,!1,!1),W=ew(["\\","'","\r","\n"],!0,!1,!1),G=eA("string"),Y=ek('"',!1),Q=ek("'",!1),J=ek("\\`",!1),Z=ek("\\$",!1),X=ek('\\"',!1),K=ek("\\\\",!1),ee=ek("\\'",!1),et=ek("\\n",!1),en=ek("\\r",!1),ea=ek("\\b",!1),er=ek("\\t",!1),ei=ek("\\v",!1),el=ek("\\f",!1),eo=ek("\\x",!1),es=ek("\\u",!1),ec=ek("\\u{",!1),ed=eA("hex digit"),eu=ew([["0","9"],["a","f"],["A","F"]],!1,!1,!1),ep=eA("digit"),em=ew([["0","9"]],!1,!1,!1),eg=eA("number"),ey=ek("-",!1),ef=ew(["e","E"],!1,!1,!1),eh=ew(["+","-"],!1,!1,!1),eb=0|t.peg$currPos,ex=eb,eE=[{line:1,column:1}],ev=eb,eC=t.peg$maxFailExpected||[],eS=0|t.peg$silentFails;if(t.startRule){if(!(t.startRule in i))throw Error("Can't start parsing from rule \""+t.startRule+'".');l=i[t.startRule]}function ek(e,t){return{type:"literal",text:e,ignoreCase:t}}function ew(e,t,n,a){return{type:"class",parts:e,inverted:t,ignoreCase:n,unicode:a}}function eA(e){return{type:"other",description:e}}function eI(t){let n,a=eE[t];if(a)return a;if(t>=eE.length)n=eE.length-1;else for(n=t;!eE[--n];);for(a={line:(a=eE[n]).line,column:a.column};n<t;)10===e.charCodeAt(n)?(a.line++,a.column=1):a.column++,n++;return eE[t]=a,a}function eP(e,t,n){let a=eI(e),i=eI(t),l={source:r,start:{offset:e,line:a.line,column:a.column},end:{offset:t,line:i.line,column:i.column}};return n&&r&&"function"==typeof r.offset&&(l.start=r.offset(l.start),l.end=r.offset(l.end)),l}function e$(e){eb<ev||(eb>ev&&(ev=eb,eC=[]),eC.push(e))}function eT(){return eR()}function eF(){let t,n,r,i;return eS++,t=eb,(n=eL())===a&&(n=function(){let t,n,r,i,l,o,s,c,d,u,p;if(eS++,t=eb,n=eb,r=eb,45===e.charCodeAt(eb)?(i="-",eb++):(i=a,0===eS&&e$(ey)),i===a&&(i=null),l=[],(o=eq())!==a)for(;o!==a;)l.push(o),o=eq();else l=a;if(l!==a){if(o=eb,46===e.charCodeAt(eb)?(s=".",eb++):(s=a,0===eS&&e$(I)),s!==a){for(c=[],d=eq();d!==a;)c.push(d),d=eq();o=s=[s,c]}else eb=o,o=a;if(o===a&&(o=null),s=eb,c=e.charAt(eb),v.test(c)?eb++:(c=a,0===eS&&e$(ef)),c!==a){if(d=e.charAt(eb),C.test(d)?eb++:(d=a,0===eS&&e$(eh)),d===a&&(d=null),u=[],(p=eq())!==a)for(;p!==a;)u.push(p),p=eq();else u=a;u!==a?s=c=[c,d,u]:(eb=s,s=a)}else eb=s,s=a;s===a&&(s=null),r=i=[i,l,o,s]}else eb=r,r=a;if((n=r!==a?e.substring(n,eb):r)!==a&&(r=eb,eS++,i=eB(),eS--,i===a?r=void 0:(eb=r,r=a),r!==a)?(ex=t,t=parseFloat(n)):(eb=t,t=a),t===a){if(t=eb,n=eb,r=eb,45===e.charCodeAt(eb)?(i="-",eb++):(i=a,0===eS&&e$(ey)),i===a&&(i=null),46===e.charCodeAt(eb)?(l=".",eb++):(l=a,0===eS&&e$(I)),l!==a){if(o=[],(s=eq())!==a)for(;s!==a;)o.push(s),s=eq();else o=a;if(o!==a){if(s=eb,c=e.charAt(eb),v.test(c)?eb++:(c=a,0===eS&&e$(ef)),c!==a){if(d=e.charAt(eb),C.test(d)?eb++:(d=a,0===eS&&e$(eh)),d===a&&(d=null),u=[],(p=eq())!==a)for(;p!==a;)u.push(p),p=eq();else u=a;u!==a?s=c=[c,d,u]:(eb=s,s=a)}else eb=s,s=a;s===a&&(s=null),r=i=[i,l,o,s]}else eb=r,r=a}else eb=r,r=a;(n=r!==a?e.substring(n,eb):r)!==a&&(r=eb,eS++,i=eB(),eS--,i===a?r=void 0:(eb=r,r=a),r!==a)?(ex=t,t=parseFloat(n)):(eb=t,t=a)}return eS--,t===a&&(n=a,0===eS&&e$(eg)),t}())===a&&(eS++,r=eb,e.substr(eb,4)===o?(i=o,eb+=4):(i=a,0===eS&&e$(q)),i!==a&&(ex=r,i=null),r=i,eS--,r===a&&(i=a,0===eS&&e$(V)),n=r),n!==a&&(ex=t),t=n,eS--,t===a&&(n=a,0===eS&&e$(A)),t}function eR(){let t,n,r,i,l,o,s,c;if(t=eb,(n=eM())!==a){for(e_(),r=[],i=eb,"||"===e.substr(eb,2)?(l="||",eb+=2):(l=a,0===eS&&e$(T)),l!==a?(o=e_(),(s=eM())!==a?i=l=[l,o,s,c=e_()]:(eb=i,i=a)):(eb=i,i=a);i!==a;)r.push(i),i=eb,"||"===e.substr(eb,2)?(l="||",eb+=2):(l=a,0===eS&&e$(T)),l!==a?(o=e_(),(s=eM())!==a?i=l=[l,o,s,c=e_()]:(eb=i,i=a)):(eb=i,i=a);ex=t,t=r.length?{type:"OpCombination",combine:"||",args:r.reduce((e,[,,t])=>[...e,t],[n])}:n}else eb=t,t=a;return t}function eM(){let t,n,r,i,l,o,s,c;if(t=eb,(n=eO())!==a){for(e_(),r=[],i=eb,"&&"===e.substr(eb,2)?(l="&&",eb+=2):(l=a,0===eS&&e$(F)),l!==a?(o=e_(),(s=eO())!==a?i=l=[l,o,s,c=e_()]:(eb=i,i=a)):(eb=i,i=a);i!==a;)r.push(i),i=eb,"&&"===e.substr(eb,2)?(l="&&",eb+=2):(l=a,0===eS&&e$(F)),l!==a?(o=e_(),(s=eO())!==a?i=l=[l,o,s,c=e_()]:(eb=i,i=a)):(eb=i,i=a);ex=t,t=r.length?{type:"OpCombination",combine:"&&",args:r.reduce((e,[,,t])=>[...e,t],[n])}:n}else eb=t,t=a;return t}function eO(){let t,n,r,i;return(t=eb,40===e.charCodeAt(eb)?(n="(",eb++):(n=a,0===eS&&e$(P)),n!==a&&(e_(),(r=eR())!==a&&(e_(),41===e.charCodeAt(eb)?(i=")",eb++):(i=a,0===eS&&e$($)),i!==a)))?(ex=t,t=r):(eb=t,t=a),t===a&&(t=function(){let t,n,r,i,l,o,p;if(t=eb,(eS++,i=eb,123===e.charCodeAt(eb)?(l="{",eb++):(l=a,0===eS&&e$(k)),l!==a&&((o=eL())===a&&(o=function(){let t,n,r;if(eS++,t=eb,n=[],r=e.charAt(eb),g.test(r)?eb++:(r=a,0===eS&&e$(B)),r!==a)for(;r!==a;)n.push(r),r=e.charAt(eb),g.test(r)?eb++:(r=a,0===eS&&e$(B));else n=a;return n!==a&&(ex=t,n=n.join("")),t=n,eS--,t===a&&(n=a,0===eS&&e$(N)),t}()),o!==a&&(125===e.charCodeAt(eb)?(p="}",eb++):(p=a,0===eS&&e$(w)),p!==a)))?(ex=i,i={title:o,location:eP(ex,eb)}):(eb=i,i=a),eS--,i===a&&(l=a,0===eS&&e$(S)),(n=i)!==a){let i,l,o;((r=function(){let t,n,r;if(t=eb,e_(),46===e.charCodeAt(eb)?(n=".",eb++):(n=a,0===eS&&e$(I)),n!==a){let n,i,l,o,d,p,m,g,y;if((n=eb,(i=function(){let e,t;if(eS++,e=eb,(t=eD())!==a){var n;(ex=eb,n=t,(s.includes(n)?void 0:a)!==a)?(ex=e,e=u(t,1)):(eb=e,e=a)}else eb=e,e=a;return eS--,e===a&&(t=a,0===eS&&e$(_)),e}())!==a&&(e_(),40===e.charCodeAt(eb)?(l="(",eb++):(l=a,0===eS&&e$(P)),l!==a&&(e_(),41===e.charCodeAt(eb)?(o=")",eb++):(o=a,0===eS&&e$($)),o!==a)))?(ex=n,n={op:i,value:null}):(eb=n,n=a),(r=n)===a&&((d=eb,(p=function(){let e,t;if(eS++,e=eb,(t=eD())!==a){var n;(ex=eb,n=t,(c.includes(n)?void 0:a)!==a)?(ex=e,e=u(t,2)):(eb=e,e=a)}else eb=e,e=a;return eS--,e===a&&(t=a,0===eS&&e$(O)),e}())!==a&&(e_(),40===e.charCodeAt(eb)?(m="(",eb++):(m=a,0===eS&&e$(P)),m!==a&&(e_(),(g=eF())!==a&&(e_(),41===e.charCodeAt(eb)?(y=")",eb++):(y=a,0===eS&&e$($)),y!==a))))?(ex=d,d={op:p,value:g}):(eb=d,d=a),r=d),r!==a)ex=t,t=r;else eb=t,t=a}else eb=t,t=a;return t}())===a&&((i=eb,e_(),(l=function(){let t,n,r;if(eS++,t=eb,n=[],r=e.charAt(eb),m.test(r)?eb++:(r=a,0===eS&&e$(M)),r!==a)for(;r!==a;)n.push(r),r=e.charAt(eb),m.test(r)?eb++:(r=a,0===eS&&e$(M));else n=a;if(n!==a){var i;(ex=eb,i=n,(r=(r=d.includes(i.join("")))?void 0:a)!==a)?(ex=t,t=u(n.join(""),2)):(eb=t,t=a)}else eb=t,t=a;return eS--,t===a&&(n=a,0===eS&&e$(R)),t}())!==a&&(e_(),(o=eF())!==a))?(ex=i,i={op:l,value:o}):(eb=i,i=a),r=i),r!==a)?(ex=t,t={type:"OpField",column:n,...r}):(eb=t,t=a)}else eb=t,t=a;return t}()),t}function e_(){let e,t;for(e=[],t=eN();t!==a;)e.push(t),t=eN();return e}function eN(){let t,n;if(eS++,t=[],n=e.charAt(eb),y.test(n)?eb++:(n=a,0===eS&&e$(H)),n!==a)for(;n!==a;)t.push(n),n=e.charAt(eb),y.test(n)?eb++:(n=a,0===eS&&e$(H));else t=a;return eS--,t===a&&(n=a,0===eS&&e$(D)),t}function eB(){let t,n,r;if(t=eb,e.length>eb?(n=e.charAt(eb),eb++):(n=a,0===eS&&e$(L)),n!==a){var i;ex=eb,i=n,(r=(r=/\p{ID_Continue}/u.test(i))?void 0:a)!==a?t=n=[n,r]:(eb=t,t=a)}else eb=t,t=a;return t}function eD(){let t,n,r,i,l,o;if(eS++,t=eb,n=eb,r=eb,(i=function(){let t,n,r,i;if(t=eb,n=eb,eS++,r=e.charAt(eb),f.test(r)?eb++:(r=a,0===eS&&e$(z)),eS--,r===a?n=void 0:(eb=n,n=a),n!==a){if(e.length>eb?(r=e.charAt(eb),eb++):(r=a,0===eS&&e$(L)),r!==a){var l;ex=eb,l=r,(i=(i=/[\p{ID_Start}_]/u.test(l))?void 0:a)!==a?t=n=[n,r,i]:(eb=t,t=a)}else eb=t,t=a}else eb=t,t=a;return t}())!==a){for(l=[],o=eB();o!==a;)l.push(o),o=eB();r=i=[i,l]}else eb=r,r=a;return(n=r!==a?e.substring(n,eb):r)!==a&&(ex=t),t=n,eS--,t===a&&(n=a,0===eS&&e$(U)),t}function eH(){let t;return t=e.charAt(eb),h.test(t)?eb++:(t=a,0===eS&&e$(j)),t===a&&(t=eU()),t}function ez(){let t;return t=e.charAt(eb),b.test(t)?eb++:(t=a,0===eS&&e$(W)),t===a&&(t=eU()),t}function eL(){let t,n,r,i;if(eS++,t=eb,34===e.charCodeAt(eb)?(n='"',eb++):(n=a,0===eS&&e$(Y)),n!==a){for(r=[],i=eH();i!==a;)r.push(i),i=eH();(34===e.charCodeAt(eb)?(i='"',eb++):(i=a,0===eS&&e$(Y)),i!==a)?(ex=t,t=r.join("")):(eb=t,t=a)}else eb=t,t=a;if(t===a){if(t=eb,39===e.charCodeAt(eb)?(n="'",eb++):(n=a,0===eS&&e$(Q)),n!==a){for(r=[],i=ez();i!==a;)r.push(i),i=ez();(39===e.charCodeAt(eb)?(i="'",eb++):(i=a,0===eS&&e$(Q)),i!==a)?(ex=t,t=r.join("")):(eb=t,t=a)}else eb=t,t=a}return eS--,t===a&&(n=a,0===eS&&e$(G)),t}function eU(){let t,n,r,i,l,o,s,c;if(t=eb,"\\`"===e.substr(eb,2)?(n="\\`",eb+=2):(n=a,0===eS&&e$(J)),n!==a&&(ex=t,n="`"),(t=n)===a&&(t=eb,"\\$"===e.substr(eb,2)?(n="\\$",eb+=2):(n=a,0===eS&&e$(Z)),n!==a&&(ex=t,n="$"),(t=n)===a&&(t=eb,'\\"'===e.substr(eb,2)?(n='\\"',eb+=2):(n=a,0===eS&&e$(X)),n!==a&&(ex=t,n='"'),(t=n)===a&&(t=eb,"\\\\"===e.substr(eb,2)?(n="\\\\",eb+=2):(n=a,0===eS&&e$(K)),n!==a&&(ex=t,n="\\"),(t=n)===a&&(t=eb,"\\'"===e.substr(eb,2)?(n="\\'",eb+=2):(n=a,0===eS&&e$(ee)),n!==a&&(ex=t,n="'"),(t=n)===a&&(t=eb,"\\n"===e.substr(eb,2)?(n="\\n",eb+=2):(n=a,0===eS&&e$(et)),n!==a&&(ex=t,n="\n"),(t=n)===a&&(t=eb,"\\r"===e.substr(eb,2)?(n="\\r",eb+=2):(n=a,0===eS&&e$(en)),n!==a&&(ex=t,n="\r"),(t=n)===a&&(t=eb,"\\b"===e.substr(eb,2)?(n="\\b",eb+=2):(n=a,0===eS&&e$(ea)),n!==a&&(ex=t,n="\b"),(t=n)===a&&(t=eb,"\\t"===e.substr(eb,2)?(n="\\t",eb+=2):(n=a,0===eS&&e$(er)),n!==a&&(ex=t,n="	"),(t=n)===a&&(t=eb,"\\v"===e.substr(eb,2)?(n="\\v",eb+=2):(n=a,0===eS&&e$(ei)),n!==a&&(ex=t,n="\v"),(t=n)===a&&(t=eb,"\\f"===e.substr(eb,2)?(n="\\f",eb+=2):(n=a,0===eS&&e$(el)),n!==a&&(ex=t,n="\f"),(t=n)===a))))))))))&&((t=eb,"\\x"===e.substr(eb,2)?(n="\\x",eb+=2):(n=a,0===eS&&e$(eo)),n!==a&&(r=eb,i=eb,(l=eV())!==a&&(o=eV())!==a?i=l=[l,o]:(eb=i,i=a),(r=i!==a?e.substring(r,eb):i)!==a))?(ex=t,t=String.fromCharCode(parseInt(r,16))):(eb=t,t=a),t===a&&((t=eb,"\\u"===e.substr(eb,2)?(n="\\u",eb+=2):(n=a,0===eS&&e$(es)),n!==a&&(r=eb,i=eb,(l=eV())!==a&&(o=eV())!==a&&(s=eV())!==a&&(c=eV())!==a?i=l=[l,o,s,c]:(eb=i,i=a),(r=i!==a?e.substring(r,eb):i)!==a))?(ex=t,t=String.fromCharCode(parseInt(r,16))):(eb=t,t=a),t===a))){if(t=eb,"\\u{"===e.substr(eb,3)?(n="\\u{",eb+=3):(n=a,0===eS&&e$(ec)),n!==a){for(r=eb,i=[],l=eV();l!==a;)i.push(l),l=eV();(r=e.substring(r,eb),125===e.charCodeAt(eb)?(i="}",eb++):(i=a,0===eS&&e$(w)),i!==a)?(ex=t,t=String.fromCodePoint(parseInt(r,16))):(eb=t,t=a)}else eb=t,t=a}return t}function eV(){let t,n;return eS++,t=eb,n=e.charAt(eb),x.test(n)?eb++:(n=a,0===eS&&e$(eu)),n!==a&&(ex=t,n=void 0),t=n,eS--,t===a&&(n=a,0===eS&&e$(ed)),t}function eq(){let t;return eS++,t=e.charAt(eb),E.test(t)?eb++:(t=a,0===eS&&e$(em)),eS--,t===a&&0===eS&&e$(ep),t}let ej=(n=l())!==a&&eb===e.length;function eW(){var t,r,i;throw n!==a&&eb<e.length&&e$({type:"end"}),t=eC,r=ev<e.length?function(t=eb){let n=e.codePointAt(t);return void 0===n?"":String.fromCodePoint(n)}(ev):null,i=ev<e.length?eP(ev,ev+1):eP(ev,ev),new p(p.buildMessage(t,r),t,r,i)}return t.peg$library?{peg$result:n,peg$currPos:eb,peg$FAILED:a,peg$maxFailExpected:eC,peg$maxFailPos:ev,peg$success:ej,peg$throw:ej?void 0:eW}:ej?n:void eW()}(e));if(t.ok)return{ok:!0,value:t.value};let[n]=g;if(n)return{ok:!1,error:n.message,location:{start:n.location.start.offset,end:n.location.end.offset}};return{ok:!1,location:{start:0,end:0},error:a.formatInline(t.error)}}catch(e){if(e instanceof p)return{ok:!1,error:e.message,location:{start:e.location.start.offset,end:e.location.end.offset}};throw e}}let y=/^[A-Za-z0-9_ ]+$/;function f(e){return y.exec(e)?`{${e}}`:`{${JSON.stringify(e)}}`}function h(e){if(!e)return"null";if("ConstantValueExpression"===e.type){let{value:t}=e;return"object"==typeof t&&null!==t&&"_types"in t&&Array.isArray(t._types)&&l.u0(r.g,t._types)?JSON.stringify(t.text):"object"==typeof t&&null!==t&&"_types"in t&&Array.isArray(t._types)&&l.u0(i.c,t._types)?JSON.stringify(t.value):e.displayHint?.label?JSON.stringify(e.displayHint.label):JSON.stringify(t)}return"null"}function b(e){switch(e.type){case"OpField":return!1;case"OpCombination":return e.args.some(e=>"OpCombination"===e.type)}}},42018:(e,t,n)=>{n.d(t,{HN:()=>o,NF:()=>s,qD:()=>d,x_:()=>c});var a=n(39629),r=n(14744),i=n(13489),l=n(62284);let o={id:"empty",arity:1,displayHint:{label:"is empty",icon:"RadioQuestionOutline"}},s={tag:i.E.Any,signature:[],typeLabel:"Unknown"};function c(e){var t;let n;if(null!=e.partitionExpr||"BlockStatement"!==e.ifTrue.type||"BlockStatement"!==e.ifFalse.type||0!==e.ifFalse.children.length)return null;let[r]=e.ifTrue.children;if(!r)return null;let i=function e(t){if("OperatorExpression"===t.type)switch(t.op){case"&&":case"||":return function(t,n){let r=t.map(e);return r.some(e=>null===e)?null:{type:"OpCombination",args:r.filter(a.zz),combine:n}}(t.args,t.op);case"!":break;default:return function(e){let[t,n]=e.args,a={id:e.op,arity:e.arity,displayHint:{icon:e.displayHint?.icon??"RadioQuestionOutline",label:e.displayHint?.label??e.op}},r=null;return(e.arity>1&&n&&(r=n),t?.type!=="TableColumnReferenceExpression")?null:{type:"OpField",op:a,value:r,column:t.id,typeHint:e.operatorTypeHint??e.typeHint??s}}(t)}return null}(e.conditionExpr);return i?{condition:i,wrappedStmt:(n=(t=e.conditionExpr).validationStatus,t.validationStatus&&(n=[...t.validationStatus,...r.validationStatus??[]]),{...r,validationStatus:n})}:null}function d(e,t,n){let a=function e(t){switch(t.type){case"OpCombination":if(1===t.args.length){let[n]=t.args;if(n)return e(n)}return function(t){let n=t.args.map(e);return{type:"OperatorExpression",op:t.combine,arity:n.length,args:n}}(t);case"OpField":return function(e){let t=[{type:"TableColumnReferenceExpression",id:e.column}];return e.op.arity>1&&e.value&&t.push(e.value),{type:"OperatorExpression",op:e.op.id,arity:e.op.arity,args:t}}(t);default:r.HB(t)}}(e),i="varName"in t?t.varName:"";return{type:"IfStatement",comment:"",commentFlags:{keep:!1},conditionExpr:a,index:n(),mode:l.A.PARTITION,output:"compute",partitionExpr:null,varName:`__cond_${i}`,validationStatus:[],ifFalse:{type:"BlockStatement",children:[],comment:"",commentFlags:{keep:!1},index:n(),output:!1},ifTrue:{type:"BlockStatement",children:[t],comment:"",commentFlags:{keep:!1},index:n(),output:"compute"}}}},59004:(e,t,n)=>{n.d(t,{P7:()=>i});var a=n(38792),r=n.n(a);function i(e,t,n){let{compareUpdateTimestamp:a=!1}=n??{};if(e===t)return!0;let i=e.serialize(),o=t.serialize(),s=a?["_ctx"]:["_updated","_ctx"];return i=l(i,s),o=l(o,s),r()(i,o)}function l(e,t){let n=Array.isArray(t)?t:[t],a=e=>"object"==typeof e&&null!==e?Array.isArray(e)?e.map(a):Object.fromEntries(Object.entries(e).filter(e=>{let[t]=e;return!n.includes(t)}).map(e=>{let[t,n]=e;return[t,a(n)]})):e;return a(e)}},38534:(e,t,n)=>{function a(e,t){return e.reduce((e,t)=>Math.max(e,t),t??-1/0)}function r(e,t,n){return e.reduce((e,n)=>Math.max(e,t(n)),n??-1/0)}n.d(t,{E7:()=>a,Mc:()=>r})},49170:(e,t,n)=>{n.d(t,{F:()=>i});var a=n(36213);let r=[n(74227).E];function i(e,t){let n="function"==typeof e?e:e[t].bind(e);return async function*(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];let l=await n({__async_generator_start_args:t});try{for(;;){let e;for(;;)try{e=await n({__async_generator_next:l});break}catch(e){if(r.some(t=>t.is(e)))continue;throw e}switch(e.type){case"next":for(let t of(l.offset+=e.value.length,e.value))yield t;break;case"final":return;case"error":throw a.sF.from(e.exception)}}}finally{await n({__async_generator_stop:l})}}}},26101:(e,t,n)=>{n.d(t,{cx:()=>r});let a=/^[a-z][\w-.+]*:(\/\/)?/i;function r(e){return a.test(e)?e:`https://${e}`}},91472:(e,t,n)=>{n.d(t,{HR:()=>o});var a=n(14041),r=n(39716),i=n(69670),l=n(44724);let o=(0,a.memo)((0,r.Ay)(e=>{let{text:t="",...n}=e;return a.createElement("div",n,t)})`
  ${(0,l.Sp)("--color",{light:i.ydb,dark:i.ui$,colored:i.B3q(i.ONy,.64)})}
  ${(0,l.Sp)("--border-color",{light:i.Tc2,dark:i.B3q(i.ONy,.16),colored:i.B3q(i.ONy,.16)})}

  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color);

  display: flex;
  align-items: center;
  gap: ${e=>{let{text:t}=e;return t?42:0}}px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid var(--border-color);
  }
`)},67331:(e,t,n)=>{n.d(t,{H1:()=>o,H2:()=>s,H3:()=>c,H4:()=>d,H5:()=>u,H6:()=>p,N:()=>y,P:()=>m,a:()=>g});var a=n(39716),r=n(69670),i=n(44724);let l=(0,a.AH)`
  font-family: Outfit;
  font-style: normal;
  font-weight: 600;
  text-wrap: balance;
`,o=a.Ay.h1`
  ${l}
  ${e=>e.$color?`color: ${e.$color};`:(0,i.Sp)("color",{light:r.t14,dark:r.wB3,colored:r.ONy})}
  font-size: ${e=>e.$small?"32px":"40px"};
  line-height: ${e=>e.$small?"44px":"54px"};
  letter-spacing: -0.004px;
`,s=a.Ay.h2`
  ${l}
  ${(0,i.Sp)("color",{light:r.t14,dark:r.wB3,colored:r.ONy})}
  font-size: 28px;
  line-height: 40px;
  letter-spacing: -0.003px;
`,c=a.Ay.h3`
  ${l}
  ${e=>e.$color?`color: ${e.$color};`:(0,i.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-size: 22px;
  line-height: 32px;
`,d=a.Ay.h4`
  ${l}
  ${e=>e.$color?`color: ${e.$color};`:(0,i.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-size: 20px;
  line-height: 30px;
`,u=a.Ay.h5`
  ${e=>e.$color?`color: ${e.$color};`:(0,i.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
`,p=a.Ay.h6`
  ${(0,i.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy})}
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 185.714% */
  letter-spacing: 0.002px;
`,m=a.Ay.p`
  ${e=>e.$color?`color: ${e.$color};`:e.$bold?(0,i.Sp)("color",{light:r.CP,dark:r.ONy,colored:r.ONy}):(0,i.Sp)("color",{light:r.ui$,dark:r.pHq,colored:r.ONy})}
  font-size: ${e=>e.$small?"14px":"16px"};
  line-height: ${e=>e.$small?"26px":"30px"};
  ${e=>e.$bold?"font-weight: 500":""};
  ${e=>e.$ellipsis&&(0,a.AH)`
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`,g=a.Ay.p`
  ${(0,i.Sp)("color",{light:r.ui$,dark:r.pHq,colored:r.ONy})}
  font-family: Inter;
  font-size: ${e=>e.$small?"12px":"14px"};
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.002px;
`,y=a.Ay.a`
  ${(0,i.Sp)("color",{light:r.CP,dark:r.wB3,colored:r.ONy})}
  &:hover {
    ${(0,i.Sp)("color",{light:r.t14,dark:r.t14,colored:r.wB3})}
  }
  transition: color 0.2s ease-in-out;
  font-family: Inter;
  font-size: ${e=>e.$small?"12px":"14px"};
  font-style: normal;
  font-weight: 600;
  line-height: ${e=>e.$small?"20px":"22px"};
  letter-spacing: 0.002px;
`},69670:(e,t,n)=>{n.d(t,{$2P:()=>eo,$8t:()=>$,$Sy:()=>ez,$yE:()=>en,$yM:()=>A,B3q:()=>eL,Bfz:()=>q,Btc:()=>i,CCs:()=>eB,CP:()=>W,CqR:()=>eA,FAq:()=>ew,FCg:()=>z,FbJ:()=>y,HFy:()=>eT,HOM:()=>m,IVJ:()=>w,IhC:()=>er,Is2:()=>eR,J5m:()=>ep,JIy:()=>eO,JkX:()=>eG,KE7:()=>eN,Kqb:()=>ea,KxS:()=>eg,LRT:()=>k,MEI:()=>e_,MfC:()=>O,MhJ:()=>P,MnK:()=>r,N9b:()=>el,NEG:()=>Y,NcT:()=>eh,O$e:()=>c,ONy:()=>eD,Ow4:()=>g,P0$:()=>eM,PdT:()=>I,QH7:()=>T,Q_2:()=>ey,Ql9:()=>eH,S5v:()=>E,S78:()=>h,SfY:()=>s,TJO:()=>ec,Tc2:()=>M,UFl:()=>ei,UU9:()=>C,UmY:()=>G,VSB:()=>v,Wm:()=>U,WrH:()=>eS,Xi8:()=>Q,Xvv:()=>ev,XxH:()=>eu,Z0l:()=>p,ZE3:()=>o,ZnR:()=>eC,_fY:()=>ed,_v2:()=>eP,aWC:()=>eq,bCn:()=>l,b_I:()=>ex,c3n:()=>J,e30:()=>D,eCI:()=>eV,eJD:()=>u,eJU:()=>eU,fMC:()=>b,g7N:()=>et,hUZ:()=>e$,hi1:()=>R,i5z:()=>f,iTR:()=>eI,j3F:()=>ef,jK0:()=>Z,k0i:()=>ej,klg:()=>eQ,l0o:()=>B,lhO:()=>em,nWs:()=>eW,o$k:()=>F,o8W:()=>eY,o_k:()=>S,pHq:()=>N,t14:()=>eE,u9j:()=>eF,uSe:()=>d,ui$:()=>V,vNc:()=>X,vh3:()=>j,wB3:()=>eb,wKm:()=>es,wdA:()=>_,wl$:()=>x,wmS:()=>L,woW:()=>a,xjr:()=>ek,yJm:()=>K,ydb:()=>H,zIe:()=>ee});let a="#EFFAF3",r="#9CE4B5",i="#59D182",l="#FDFAEF",o="#FCF5E0",s="#F9EBBF",c="#F9EBBF",d="#EECD5E",u="#F2B85E",p="#F4AD5E",m="#F5A25D",g="#F7975C",y="#FBFAF7",f="#F4F0E7",h="#F0EBDF",b="#E7E0CE",x="#D7CBAC",E="#C2B79B",v="#978E79",C="#EEF1FB",S="#DDE4F8",k="#B9C8F0",w="#96ACE8",A="#4F74D8",I="#405DAD",P="#304682",$="#F5F0FA",T="#9D6DCD",F="#FDFDFE",R="#F8F9FA",M="#F1F3F4",O="#EDEEF1",_="#DEE1E6",N="#D0D3D8",B="#C2C5CA",D="#B4B7BD",H="#A6A9AE",z="#989BA0",L="#8A8D92",U="#7C8084",V="#6D7176",q="#5F6368",j="#54575C",W="#484A4F",G="#3B3C41",Y="#2E2F33",Q="#202124",J="#191A1C",Z="#FFEFEF",X="#FFE0DF",K="#FFC0BE",ee="#FFA09D",et="#FF807B",en="#FF706A",ea="#FF605A",er="#E6F9F5",ei="#CDF4EB",el="#B3EEE0",eo="#9AE8D6",es="#66DDC0",ec="#34D1AB",ed="#1ACBA0",eu="#00C596",ep="#01B187",em="#019E78",eg="#F8F8FD",ey="#E2DFF5",ef="#D4CFF0",eh="#C5BFEB",eb="#A9A0E1",ex="#8C80D6",eE="#6F60CC",ev="#594DA3",eC="#F7C2D0",eS="#F3A2B8",ek="#BC506D",ew="#F1F4F7",eA="#CAD5DF",eI="#93AABF",eP="#7894AE",e$="#485969",eT="#EEF7FE",eF="#53B3F6",eR="#F8F2F2",eM="#FDEEEF",eO="#FBDBDD",e_="#F7B7BB",eN="#EF6E76",eB="#EA4953",eD="#ffffff",eH="#000000",ez="#26C2D0";function eL(e,t){let n=Math.round(255*t).toString(16);return 1===n.length?`${e}0${n}`:`${e}${n}`}let eU="#FBF0D0",eV="#F2D77F",eq="#EECD5E",ej="#F2B85E",eW="#F5A25D",eG="#ECF8FA",eY="#26C2D0",eQ="#339BA9"},44724:(e,t,n)=>{n.d(t,{Ej:()=>o,Kq:()=>s,Sp:()=>l});var a=n(14041),r=n(39716),i=n(69670);let l=(e,t)=>n=>{let a=n.theme.mode;return`${e}: ${"colored"===a?t.colored:t[a]};`},o=e=>a.createElement(r.NP,{theme:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d;return{...e,mode:c(e.mode)}}},e),s=e=>{let{children:t}=e;return a.createElement(r.NP,{theme:d},t)},c=e=>"colored"===e?"colored":"light"===e?"dark":"light",d={mode:"light",fadeIn:(0,r.i7)`from { opacity: 0; } to { opacity: 1; }`,fadeOut:(0,r.i7)`from { opacity: 1; } to { opacity: 0; }`,input_addonBefore_icon:i.ydb,input_addonBefore_iconHover_default:i.b_I,input_addonBefore_iconHover_danger:i.WrH,input_bg:i.ONy,input_border_default:i.MfC,input_borderHover_default:i.NcT,input_border_danger:i.ZnR,input_borderHover_danger:i.WrH,input_clear_icon:i.CP,input_clear_iconHover:i.g7N,input_text:i.hUZ,input_placeholder:i.l0o,notification_bg:i.c3n,notification_text:i.ONy,notification_icon:{error:i.KE7,info:i.l0o,success:i.TJO,hide:i.l0o,loading:i.l0o},notification_close:i.wdA,notification_closeHover:i.ONy,notification_divider:i.NEG,notification_num_bg:i.t14}},44835:(e,t,n)=>{n.d(t,{ky:()=>i});let a={},r={count:0},i=e=>{let t=a[e]||r;a[e]={count:t.count+1}}},93510:(e,t,n)=>{n.d(t,{BJ:()=>w,BO:()=>K,CL:()=>m,DJ:()=>v,E9:()=>A,EM:()=>et,Fn:()=>F,Hv:()=>T,JH:()=>ee,MA:()=>G,Ml:()=>E,Ov:()=>Q,PO:()=>D,Ph:()=>y,Q9:()=>q,RN:()=>W,U4:()=>I,Uc:()=>b,VT:()=>_,Vs:()=>S,WU:()=>er,Xt:()=>R,Zs:()=>N,aA:()=>x,ad:()=>X,b3:()=>M,cb:()=>J,eO:()=>f,ec:()=>H,g$:()=>eo,h2:()=>z,iO:()=>O,iS:()=>$,lC:()=>en,lW:()=>V,lw:()=>Y,mL:()=>C,nC:()=>j,o3:()=>P,oE:()=>h,p5:()=>p,sE:()=>el,u4:()=>U,uD:()=>ei,vM:()=>k,vV:()=>ea,xy:()=>u,y_:()=>B,zn:()=>L,zy:()=>g});var a=n(99420),r=n.n(a),i=n(19916),l=n(36213),o=n(63711),s=n(1254),c=n(96326),d=n(50278);let u={sort:"playbook.modified",order:"desc"};function p(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.accountSettingsSet(e),r(t(await a.accountSettingsGet()))}}function m(e){return async function(t){let{api:n,dispatch:a}=t,r=e=>n.systemCheckFeature(e),i={tour:r("tour"),devTools:r("dev_tools"),extraCreditOnStoreReview:r("extra_credit_on_store_review"),dynamicBanner:n.systemGetConfiguration("dynamic_banner"),voiceToQueryEnabled:r("voice_to_query_enabled"),builderIntroRephrasingEnabled:r("builder_intro_rephrasing_enabled"),v4MiniEnabled:r("v4_mini_enabled")};a(e(await Z(i)))}}function g(e){return t=>Object.assign(n=>t({...n,dispatch:t=>n.dispatch(e(t))}),{displayName:String(t.displayName??t.name)})}async function y(e){try{let t=await (0,i.tH)(e.systemBootStatusGet,{delay:e=>{let{currentTry:t}=e;return 100*t},until:e=>"Booted"===e||null!==e.error});if("Booted"===t)return;throw new o._T({cause:t.error})}catch(t){if(!(0,i.f8)(t))throw t;let e=t.getLastResult();if("Booted"===e)return;throw new o._T({cause:e.error})}}function f(e){return async function(t){let{api:n,dispatch:a}=t;a(e({...await n.systemBardeenAccountProfileGet(),timeSaved:await n.getTimeSaved()}))}}function h(e,t){return async function(n){let{api:a,dispatch:i}=n;t&&await a.systemBardeenAccountInvalidateSubscriptionCache();let l=await a.systemBardeenAccountGetSubscriptionInfo();i(e(l.activeSubscription?{...l,plan:l.activeSubscription.planPeriod,endsIn:r()(l.activeSubscription.currentPeriodEnd).fromNow(!0).replace("a ","1 ").replace("an ","1 ").replace(" ","-"),endsAt:r()(l.activeSubscription.currentPeriodEnd).format("L"),canceled:l.activeSubscription.canceled,tierCredits:l.activeSubscription.tierCredits,status:l.activeSubscription.status,enterprise:l.activeSubscription.enterprise}:{...l,endsIn:"",endsAt:"",canceled:!1,tierCredits:0}))}}function b(e){return async function(t){let{api:n,dispatch:a}=t,r=await n.accountSettingsGet();"boolean"!=typeof r.optimizePrompt&&(r.optimizePrompt=await Promise.race([n.systemGetConfiguration("optimize_prompt").then(e=>e.v1.optimizePromptEnabledByDefault),new Promise(e=>setTimeout(()=>e(!0),2e3))])),a(e(r))}}function x(e){return async function(t){let{api:n,dispatch:a}=t,[r,i,l,o]=await Promise.all([n.teamGetConfig(),n.teamMembersQuery({}),n.teamInvitationList(),n.teamJoinChoices()]);a(e({config:r,members:i,invitations:l,joinChoices:o}))}}function E(e){return async function(t){let{api:n,dispatch:a}=t;a(e({config:await n.teamSetConfig({isTeam:!0}),plans:await n.systemBardeenAccountGetAvailablePlans().catch(()=>[])}))}}function v(e,t,n){return async function(a){let{api:r,dispatch:i}=a;try{i(t(await r.teamInviteMany(e)))}catch(e){i(n(l.sF.from(e).toJSON()))}}}function C(e,t){return async function(n){let{api:a,dispatch:r}=n;r(t(await a.teamSetConfig({name:e})))}}function S(e,t,n,a){return async function(r){let{api:i,dispatch:l}=r;await i.teamJoinRespond(e,t,n??void 0),l(a())}}function k(e){return async function(t){let{api:n,dispatch:a}=t;await n.teamLeave(),a(e())}}function w(e,t){return async function(e){let{api:n,dispatch:a}=e;await n.teamDisband(),a(t())}}function A(e,t,n){return async function(a){let{api:r,dispatch:i}=a;i(n(await r.teamMemberModify(e,t)))}}function I(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.teamMemberDelete(e),r(t())}}function P(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.teamRequestUpgrade(e),r(t())}}function $(e){let{onSuccess:t,onError:n}=e;return async function(e){let{api:a,dispatch:r}=e;try{r(t(await a.teamInvitationLinkCreate(2592e6)))}catch(e){r(n(e))}}}function T(e){let{onSuccess:t,onError:n}=e;return async function(e){let{api:a,dispatch:r}=e;try{await a.teamInvitationLinkDelete(),r(t())}catch(e){r(n(e))}}}function F(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.systemBardeenAccountGetPaymentDue(void 0)))}}function R(e,t,n){let a=e.appWindowState,r=a.automationsQuery,i="team"===a.explorerPageSelected?"team":"personal",l=(0,d.aC)(i);return async function(o){let{api:d,dispatch:p}=o,m=e.config.settings?.playbookSorting??u;p(n({playbooks:(await d.playbookQuery({expression:r??void 0,limit:s.B,offset:t*s.B,sort:m.sort,sortOrder:m.order,categories:void 0,integrationsOp:"some",space:l,folderId:a.automationsSelectedFolderId??`:${l}`,scopes:["personal","catalog.favorite"]})).map(c.W.fromApi),view:i,query:r}))}}function M(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.playbookDelete(e.id),r(t)}}function O(e,t){return async function(n){let{api:a,dispatch:r}=n,i=await a.playbookRename(e.id,e.name,!1);r(t(c.W.fromApi(i)))}}function _(e,t){return async function(n){let{api:a,dispatch:r}=n,i=await a.playbookRename(e.id,e.name,!0);r(t(c.W.fromApi(i)))}}function N(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.playbookSetFavorite(e.id,!0),r(t(e))}}async function B(e,t){let n=await t.playbookGet(e);if(!n)throw l.sF.from({message:"Playbook not found"});return c.W.fromApi(n)}function D(e,t){return async function(n){let{api:a,dispatch:r}=n;r(t(c.W.fromApi(await a.playbookResetConfiguredArguments(e,"both"))))}}function H(e,t,n){return async function(a){let{api:r,dispatch:i}=a;i(n(c.W.fromApi(await r.playbookSetSpace(e,t))))}}function z(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.systemBardeenAccountGetAvailablePlans()))}}function L(e){return async t=>{let{dispatch:n,api:a}=t;n(e(await a.integrationListSummary()))}}function U(e){return async function(t){let{api:n}=t;await n.trackEvent(e)}}function V(e,t,n){return async function(a){let{dispatch:r}=a;try{await navigator.clipboard.writeText(e),r(t())}catch(e){r(n())}}}function q(e,t){return async n=>{let{api:a}=n;await a.authCancel(),await a.integrationActivate(e,{userData:t})}}function j(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.integrationsGetPanels()))}}function W(e){return async function(t){let{api:n,dispatch:a}=t,{ignoreRegExps:r}=await n.systemGetConfiguration("uiClickBlacklist");a(e(r))}}function G(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.integrationGetAllWithCloudEnabledCommands()))}}function Y(e){return async function(t){let{api:n,dispatch:a}=t;await n.systemBardeenAccountDelete(),a(e)}}function Q(e){return async function(t){let{api:n}=t;await n.systemClearState(e)}}function J(e,t){return async function(n){let{dispatch:a}=n;setTimeout(()=>a(t),e)}}let Z=async e=>Object.fromEntries(await Promise.all(Object.entries(e).map(e=>{let[t,n]=e;return n.then(e=>[t,e])})));function X(e,t){return async function(n){let{api:a,dispatch:r}=n,i=await a.runRecordSummary(e);r(t({records:await a.runRecordList(e),summary:i}))}}function K(e,t){return async function(n){let{api:a,dispatch:r}=n;r(t(await a.runRecordGet(e)))}}function ee(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.runRecordAbort(e),t&&r(t())}}function et(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.hasRunRecords()))}}function en(e,t){return async function(n){let{api:a,dispatch:r}=n;await a.uploadIssueReport(e),r(t())}}function ea(e,t,n){return async function(a){let{api:r,dispatch:i}=a;i(n(await r.folderCreate(e,t)))}}function er(e){return async function(t){let{api:n,dispatch:a}=t;a(e(await n.folderList()))}}function ei(e,t,n){return async function(a){let{api:r,dispatch:i}=a;await r.playbookMoveToFolder(e,t),i(n())}}function el(e,t,n,a){return async function(r){let{api:i,dispatch:l}=r;await i.folderDelete(e,t,n),l(a())}}function eo(e,t,n){return async function(a){let{api:r,dispatch:i}=a;await r.folderUpdate(e,t),i(n())}}},67100:(e,t,n)=>{n.d(t,{uA:()=>tp,dc:()=>a,Ts:()=>tE,ue:()=>to,Ff:()=>tc});var a,r=n(67331),i=n(69670),l=n(85040),o=n(54357),s=n(14041),c=n(39716),d=n(21769),u=n(14744),p=n(48514),m=n(18206),g=n(36213),y=n(49861),f=n(89387),h=n(96582),b=n(36884),x=n(29190),E=n(3756),v=n(21416),C=n(45281),S=n(84895),k=n(53691),w=n(13489),A=n(117),I=n(54538),P=n(88645),$=n(63711),T=n(51134);let F=(e,t)=>{if(!(document.activeElement instanceof HTMLElement))return;let n=Array.from((document.querySelector("[data-floating-ui-portal]")??document.body).querySelectorAll("[tabindex], button, a, input, select, textarea")).filter(e=>"disabled"in e&&!e.disabled&&null!==e.offsetParent),a=document.activeElement.getBoundingClientRect(),r=null,i=1/0;for(let e of n){if(e===document.activeElement)continue;let n=function(e,t,n){let a=M(e)[n],r=M(t)[O[n]],i=r.x-a.x,l=r.y-a.y,{x:o,y:s}=R[n],c=i*o+l*s;if(c<0)return 1/0;let d=Math.hypot(i,l);return 0===d?0:d/(c/d)**.6}(a,e.getBoundingClientRect(),t);n<i&&(r=e,i=n)}r&&(r.focus(),e.preventDefault())},R={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}},M=e=>({up:{x:e.left+e.width/2,y:e.top},down:{x:e.left+e.width/2,y:e.bottom},left:{x:e.left,y:e.top+e.height/2},right:{x:e.right,y:e.top+e.height/2}}),O={up:"down",down:"up",left:"right",right:"left"};var _=n(21714),N=n(6717),B=n(28363),D=n(96326),H=n(50278),z=n(32244),L=n(43275),U=n(39306),V=n(31335),q=n(74112),j=n(37089),W=n(66347),G=n(50854),Y=n(85170),Q=n(67846),J=n(80389),Z=n(28926);let X=e=>{let{onClose:t,onGotoSettings:n}=e;return s.createElement(Z.aF,{isOpen:!0,style:{width:"480px"},onClose:t},s.createElement(K,null,s.createElement(Z.Jn,{abs:!0,onClick:t}),s.createElement(ee,null,s.createElement(en,null,s.createElement(Z.In,{icon:"TexturedConfetti",size:32})),s.createElement("div",null,s.createElement(r.P,{$small:!0},"You can update your payment method & details in your"," ",s.createElement(ea,{role:"button",onClick:n},"settings.")))),s.createElement(et,null,s.createElement(el,null,s.createElement(Z.In,{icon:"TexturedReviewStar",size:20}),s.createElement(Z.In,{icon:"TexturedReviewStar",size:20}),s.createElement(Z.In,{icon:"TexturedReviewStar",size:20}),s.createElement(Z.In,{icon:"TexturedReviewStar",size:20}),s.createElement(Z.In,{icon:"TexturedReviewStar",size:20})),s.createElement(er,null,"Leave a review & earn 2000 credits ($100 value!)."),s.createElement("div",null,s.createElement(r.P,{$small:!0},"Leave a review in Chrome Store and send a screenshot to"," ",s.createElement(ea,{href:"mailto:support@bardeen.ai",target:"_blank"},"support@bardeen.ai")," ","to earn 2000 extra credits.")),s.createElement(ei,null,s.createElement(Z.$n,{href:"https://chromewebstore.google.com/detail/bardeen-automate-manual-w/ihhkmalpkhkoedlmcnilbbhhbhnicjga/reviews",variant:"primary",size:"xl",round:!0,text:"Leave a review"})),s.createElement(eo,{href:"https://www.bardeen.ai/screenshot",target:"_blank"},"How to take a screenshot?"))))},K=c.Ay.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 32px;
`,ee=c.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-basis: 50%;
  text-align: center;
  margin-top: 16px;
`,et=c.Ay.div`
  display: flex;
  padding: 32px 24px;
  flex-direction: column;
  align-items: center;
  flex-basis: 50%;
  text-align: center;
  gap: 16px;
  background: ${i.bCn};
  border-radius: 8px;
`,en=c.Ay.div`
  border-radius: 50%;
  background: ${i.KxS};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
`,ea=c.Ay.a`
  font-size: 14px;
  line-height: 26px;
  display: inline;
  cursor: pointer;
  color: ${i.t14};
  &:hover {
    color: ${i.g7N};
  }
`,er=(0,c.Ay)(r.H3)`
  color: ${i.t14};
`,ei=c.Ay.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,el=c.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: space-around;
`,eo=c.Ay.a`
  color: ${i.ui$};
  text-decoration: underline;
  font-size: 12px;
  line-height: 26px;
`;var es=n(33663),ec=n(12787),ed=n(59750),eu=n(63400),ep=n(37345),em=n(27461),eg=n(45393);let ey=e=>{let{busy:t,canUpgrade:n,message:a,onAdminRequest:l,onClose:o,onSubscribe:c,onUpgrade:d,from:u,plans:p,subscription:m}=e,[g,f]=s.useState(()=>y.tR(m)?m.activeSubscription?.planPeriod??"YEARLY":"YEARLY"),h="YEARLY"===g?p.yearly.tiers:p.monthly.tiers,b="YEARLY"===g?12:1,x=y.TB(m)&&!y.tR(m)||y.HT(m)?0:(m.activeSubscription?.tierCredits??0)/b,[E,v]=s.useState(()=>{if(y.TB(m)||y.HT(m))return 0;let e=h.findIndex(e=>e.credits>x);return -1===e?h.length-1:e}),C=h[E]??{amount:0,credits:0},S=!y.tR(m),k=y.HT(m),w=y.TB(m),A=(0,ed.r)().featureFlags.v4MiniEnabled,I=(e,t)=>`https://www.bardeen.ai/${t}?utm_source=product&utm_medium=website&utm_campaign=${encodeURIComponent(u+" "+e)}`,P={creditAmount:b*(C?.credits??1e3),planCode:g},$=n?k?s.createElement(eC,{loading:t,text:"Resubscribe",onClick:()=>c(P),tooltipText:"Replace your canceled subscription with a new one.",tooltipPlacement:"bottom"}):y.tR(m)?x>=C.credits?s.createElement(eC,{loading:t,text:"Contact Support",onClick:()=>window.open("https://www.bardeen.ai/contact")}):w?s.createElement(eC,{loading:t,text:"Subscribe",onClick:()=>d(P),tooltipText:"End your trial now to unlock more credits.",tooltipPlacement:"bottom"}):s.createElement(eC,{loading:t,text:"Upgrade",onClick:()=>d(P)}):s.createElement(eC,{loading:t,text:"Subscribe",onClick:()=>c(P)}):s.createElement(eC,{loading:t,text:"Ask admin to upgrade",onClick:()=>l(P)}),T=e=>{let{children:t,color:n}=e;return s.createElement(em.fI,{gap:8,style:{alignItems:"flex-end"}},s.createElement(r.H1,{$color:n??i.CP},t),s.createElement(ev,{style:{color:n??i.CP}},"/ month"))};return y.eV(m)?a?s.createElement(V.h,{onClose:o,style:{padding:32,maxWidth:768,height:"auto"}},s.createElement(em.VP,{gap:12,center:!0},s.createElement(r.H3,null,a))):s.createElement(V.h,{onClose:o,"data-testid":"subscription-modal","data-tracking-context":`SubscriptionUpdate - ${u}`,style:{padding:40}},s.createElement(r.H2,{style:{paddingBottom:28,textAlign:"center"}},"Upgrade your plan"),s.createElement(em.fI,null,s.createElement(eh,{variant:"beach",title:ec.Uk.STARTER.meta.title,description:"Automate simple tasks yourself",price:s.createElement(T,null,(0,eu.N)(C?.amount??0)),priceDescription:s.createElement(s.Fragment,null,S&&s.createElement(Z.lM,{onChange:e=>f(e?"YEARLY":"MONTHLY"),size:"m",checked:"YEARLY"===g,label:"Billed annually"})),actionButton:$,slider:s.createElement(Z.ms,{behavior:"flip-over",renderContent:e=>{let{close:t}=e;return s.createElement(s.Fragment,null,h.map(e=>s.createElement(Z.IU,{key:e.credits,text:`${ek(e.credits*b)} credits / ${"YEARLY"===g?"year":"month"}`,active:e.credits===C.credits,onClick:()=>{v(h.findIndex(t=>{let{credits:n}=t;return n===e.credits})),t()}})))}},s.createElement(Z.N,{title:`${ek(C.credits*b)} credits / ${"YEARLY"===g?"year":"month"}`,icon:"RadioInfoOutline",rightAddon:s.createElement(Z.In,{icon:"ArrowDownOutline"}),"data-testid":"Starter-plan-dropdown"})),features:["AI Agents",A?"Agent Studio":"AI Playbook Studio","Basic Integrations","Unlimited Team Members"],featuresTitle:"Starter includes:",footer:null}),s.createElement(eh,{variant:"plum",title:ec.Uk.TEAMS.meta.title,description:"White-glove automation at scale  with help from our AIgency",price:s.createElement(T,{color:i.t14},"$500"),priceDescription:"Billed annually, starting from",actionButton:s.createElement(ep.$n,{text:"Request a 14 day trial",size:"xl",fullWidth:!0,round:!0,variant:"primary",onClick:()=>window.open(I("business","start-trial"),"_blank")}),slider:null,featuresTitle:`Everything on ${ec.Uk.STARTER.meta.title} and:`,footer:s.createElement(eS,null,s.createElement(eg.m,{style:{alignItems:"flex-start"}},A?"2 Custom-Built Agents":"2 Custom-Built AI Playbooks"," ",s.createElement("br",null),"with ",s.createElement("b",null," 10 hours ")," of agency consulting")),features:["CRM + Outreach Integrations","Waterfall Enrichment","Cloud AI Agents","Dedicated Slack Channel"]}),s.createElement(eh,{variant:"strawberry",title:ec.Uk.ENTERPRISE.meta.title,description:"Transform your GTM motion with a dedicated AIgency",price:s.createElement(T,null,"$1,500"),priceDescription:"Billed annually, starting from",actionButton:s.createElement(ep.$n,{text:"Schedule a demo",size:"xl",fullWidth:!0,round:!0,variant:"outlined",onClick:()=>window.open(I("enterprise","contact-sales"),"_blank")}),slider:null,featuresTitle:`Everything on ${ec.Uk.TEAMS.meta.title} and:`,footer:s.createElement(eS,null,s.createElement(eg.m,{style:{alignItems:"flex-start"}},A?"5+ Custom-Built Agents":"5+ Custom-Built AI Playbooks"," ",s.createElement("br",null),"with ",s.createElement("b",null," dedicated ")," agency consulting")),features:["Custom contracts with unlimited credits","Dedicated GTM Consultant","Integration Request","SSO"]})),s.createElement(em.fI,{center:!0},s.createElement(ep.$n,{text:"Learn more about Pricing",size:"xl",fullWidth:!0,round:!0,variant:"ghost",onClick:()=>window.open("https://www.bardeen.ai/pricing","_blank")}))):s.createElement(V.h,{onClose:o,"data-tracking-context":"SubscriptionUpdate"},s.createElement("div",{style:{padding:64}},s.createElement(r.H2,{style:{paddingBottom:"48px",textAlign:"center"}},"Contact Support"),s.createElement(eC,{text:"Contact Support",onClick:()=>window.open("https://www.bardeen.ai/contact")})))},ef={beach:i.FbJ,plum:i.KxS,strawberry:i.Is2},eh=e=>{let{variant:t,title:n,description:a,price:l,priceDescription:o,actionButton:c,features:d,slider:u,featuresTitle:p,footer:m}=e;return s.createElement(eE,{"data-testid":`${n}-plan`,$variant:t},s.createElement(em.VP,{gap:24,center:!0},s.createElement(eb,null,s.createElement(r.P,{$small:!0,$color:"plum"===t?i.t14:i.ui$},n)),s.createElement(ex,{$color:"plum"===t?i.t14:i.CP},a)),s.createElement(em.VP,{gap:12},s.createElement(em.fI,{gap:8,center:!0},"string"==typeof o?s.createElement(r.P,{$small:!0},o):o),s.createElement(em.fI,{gap:8},"string"==typeof l?s.createElement(r.H1,null,l):l)),u,c,s.createElement(em.VP,{gap:24,style:{alignSelf:"flex-start",marginInline:24,marginTop:8}},s.createElement(r.P,{$bold:!0},p),s.createElement(em.VP,{gap:20},d.map((e,t)=>s.createElement(eg.m,{key:t},e)))),m)},eb=c.Ay.div`
  display: flex;
  padding-inline: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: 6px solid rgba(0, 0, 0, 0.03);
  background: rgba(255, 255, 255, 0.64);
  ${r.P} {
    font-weight: 500;
    line-height: 32px; /* 228.571% */
  }
`,ex=(0,c.Ay)(r.H4)`
  text-align: center;
`,eE=(0,c.Ay)(em.VP)`
  gap: 24px;
  padding: 32px;
  border-radius: 12px;
  border: ${e=>{let{$variant:t}=e;return"plum"===t?`2px solid ${i.wB3}`:`1px solid ${i.MfC}`}};
  flex: 1;
  align-self: stretch;
  align-items: center;
  background-color: ${e=>{let{$variant:t}=e;return ef[t]}};

  ${r.H1} {
    line-height: 40px;
  }
`,ev=c.Ay.span`
  line-height: 20px;
`,eC=e=>s.createElement(ep.$n,{size:"xl",fullWidth:!0,round:!0,variant:"outlined",...e}),eS=c.Ay.div`
  padding: 16px 24px;
  border-radius: 12px;
  border-radius: 8px;
  border: 1px solid ${i.MfC};
  background: ${i.hi1};
  align-self: stretch;
`,ek=e=>e>1e3?e%1e3==0?`${e/1e3}k`:`${Math.floor(e/1e3*10)/10}k`:e;var ew=n(9014),eA=n(47856),eI=n(48143),eP=n(61994);let e$=e=>{let{onClose:t,onGotoSettings:n}=e,a=eI.rD().profile?.email,r=eT();return s.createElement(Z.aF,{isOpen:!0,style:{width:"530px",height:"420px"},onClose:t},s.createElement("div",{className:r.root},s.createElement("div",{className:r.close},s.createElement(Z.$n,{icon:"CrossOutline",variant:"flat",tooltipText:"Close",size:"l",round:!0,onClick:t})),s.createElement("div",{className:r.top},s.createElement(Z.In,{icon:"TexturedConfetti",size:32}),s.createElement(eP.hE,{variant:"h1",color:i.t14},"Thanks for subscribing")),s.createElement("div",{className:r.bottom},s.createElement("div",null,s.createElement("div",null,s.createElement(eP.EY,{className:r.bottomText},"A confirmation email has been sent to ",a)),s.createElement("div",null," ",s.createElement(eP.EY,{className:r.bottomText},"You can update your payment method & details in your"," ",s.createElement("span",{className:"link",onClick:n},"settings.")))),s.createElement(Z.$n,{variant:"primary",size:"xl",round:!0,onClick:t,text:"Continue"}))))},eT=(0,l.A)(()=>({root:{width:"100%",height:"100%",display:"flex",flexDirection:"column"},close:{position:"absolute",top:18,right:18},top:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:20,flexBasis:"50%",background:i.KxS},bottom:{display:"flex",paddingTop:40,flexDirection:"column",alignItems:"center",flexBasis:"50%",textAlign:"center",gap:40},bottomText:{fontWeight:500,fontSize:14,lineHeight:"26px",color:i.ui$,"& .link":{color:i.t14,cursor:"pointer"},"& .link:hover":{color:i.g7N}}}));var eF=n(42014),eR=n(13314),eM=n(57972),eO=n(24114),e_=n(84296),eN=n.n(e_),eB=n(43144),eD=n(58756);let eH=e=>{let{children:t}=e,n=(0,eD.H)();return(0,eB.createPortal)(t,n)},ez=s.memo(()=>{let e=(0,s.useRef)(null),t=(0,s.useCallback)(t=>{e.current=t},[]),n=(0,s.useCallback)((t,n)=>{e.current?.({...n,origin:{y:.7},particleCount:t})},[]);return(0,s.useEffect)(()=>{n(50,{spread:26,startVelocity:55}),n(40,{spread:60}),n(70,{spread:100,decay:.91,scalar:.8}),n(20,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),n(20,{spread:120,startVelocity:45})},[n]),s.createElement(eH,null,s.createElement(eN(),{refConfetti:t,colors:["#8C80D6","#FFA09D","#F2B85E","#EF83A0","#7390E0"],style:{position:"fixed",zIndex:0x7fffffff,pointerEvents:"none",width:"100%",height:"100%",top:0,left:0}}))});var eL=n(20285),eU=n(2289),eV=n(32005);let eq={size:"xl",variant:"primary",text:"Confirm",autoFocus:!0,round:!0},ej={size:"xl",variant:"outlined",text:"Cancel",round:!0},eW=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Cancel";return s.createElement(Z.$n,{...ej,onClick:e,text:t})},eG=e=>{let{dispatch:t,state:n}=e,a=()=>t({type:"App/ConfirmCancelled"});switch(n.type){case"UseScraperTemplate":return s.createElement(eL.nA,{coordinatesAware:!0,isOpen:!0,onClose:a,id:"confirm"},s.createElement(eL.pT.Header,{"data-testid":"header"},"Where do you want to scrape data?"),s.createElement(eL.pT.Actions,null,s.createElement(Z.$n,{...eq,text:"Current page",onClick:()=>t({type:"ScraperTemplateSelected",variant:"activeTab"})}),s.createElement(Z.$n,{...eq,text:"Specific URLs",onClick:()=>t({type:"ScraperTemplateSelected",variant:"background"})})),s.createElement(Z.Jn,{onClick:a,abs:!0}));case"Confirm":return s.createElement(eL.pT,{header:n.header,confirmBtn:n.confirm?s.createElement(Z.$n,{...eq,onClick:()=>{n.confirm?.action&&t(n.confirm.action),a()},text:n.confirm.text??"Confirm"}):void 0,cancelBtn:n.cancel?s.createElement(Z.$n,{...ej,onClick:()=>{n.cancel?.action&&t(n.cancel.action),a()},text:n.cancel.text??"Cancel"}):void 0,onClose:a},n.message);case"App/BillingEmailEdited":{let e=()=>t({type:"App/BillingEmailSaveRequested"}),r=(0,eV.B9)(n.email);return s.createElement(eL.pT,{"data-testid":"billing email edit",header:"Update your billing email",confirmBtn:s.createElement(Z.$n,{...eq,text:n.saving?"Saving...":"Update",onClick:e,disabled:n.saving||!r,autoFocus:!1}),cancelBtn:eW(a),onClose:a},s.createElement("form",{onSubmit:t=>{t.preventDefault(),r&&e()}},s.createElement(Z.dN.Outline,{autoFocus:!0,value:n.email,onChange:e=>t({type:"App/BillingEmailEdited",email:e}),variant:n.email&&!r?"danger":"default",errorMessage:n.email&&!r?"Please enter a valid email address":void 0})))}case"RenameStatement":{let{index:e,name:r}=n,i=r.trim().length>0,l=()=>{i&&t({type:"BuilderV2Action",action:{type:"StatementNameChanged",index:e,name:r}})};return s.createElement(eL.pT,{header:"Rename Action",confirmBtn:s.createElement(Z.$n,{...eq,text:"Rename",onClick:l,disabled:!i,autoFocus:!1}),cancelBtn:eW(a),onClose:a},s.createElement(Z.dN.Outline,{round:!0,size:"xl",fullWidth:!0,value:n.name,onChange:e=>t({type:"App/ConfirmShown",config:{...n,name:e}}),onKeyDown:e=>"Enter"===e.key&&l(),autoFocus:!0}))}case"UnsavedChanges":return s.createElement(Z.aF,{style:{padding:32},isOpen:!0,onClose:a},s.createElement(Z.Jn,{onClick:a,abs:!0}),s.createElement(Z.VP,{gap:24,center:!0,style:{maxWidth:350}},s.createElement(r.H3,{style:{color:i.t14}},"Unsaved changes"),s.createElement(r.P,{style:{textAlign:"center"}},"Do you want to save the changes before closing?"),s.createElement(Z.fI,{gap:16,center:!0,style:{marginTop:8,marginBottom:12,width:"100%",maxWidth:"80%"}},s.createElement(Z.$n,{fullWidth:!0,round:!0,size:"xl",onClick:()=>{t({type:"BuilderV2Action",action:{type:"ClickedSavePlaybook"}}),a()},variant:"primary",text:"Save"}),s.createElement(Z.$n,{fullWidth:!0,round:!0,size:"xl",onClick:()=>{t({type:"App/BuilderUnsavedChangesDiscarded"}),a()},variant:"outlined",text:"Discard"}))));case"UpgradeSubscription":{let e=()=>t({type:"App/ConfirmCancelled"});if("loading"===n.due)return s.createElement(eU.A,{show:!0,loading:!0,onCancel:e});let{creditAmount:a,product:r,planCode:i}=n,{remainingTimeCharge:l,nextPeriodCharge:o}=n.due;return s.createElement(eU.A,{confirmText:"Confirm",remainingTimeCharge:l,nextPeriodCharge:o,onCancel:e,onConfirm:()=>t({type:"App/UpgradeSubscriptionClicked",creditAmount:a,product:r,planCode:i}),show:!0})}}};var eY=n(8869);n(77147),n(28108),n(5855),n(82602);var eQ=n(85148),eJ=n(43682),eZ=n(39907);let eX=e=>{let[t,n]=s.useState(0),[a,r]=s.useState(!1),i="active"!==e.state.type;s.useEffect(()=>{if(eZ.env.CHROMATIC)return;let e=setInterval(()=>n(t+1),500);return()=>clearInterval(e)}),s.useEffect(()=>{if(i)return r(!0);setTimeout(()=>r(!1),200)},[i]);let l=s.useContext(eD.o);return a?s.createElement(eQ.XF,{root:l.portalInsertionPoint},s.createElement(e0,{$fadeOut:a&&!i},s.createElement(e4,null,"unavailable"===e.state.type?s.createElement("span",null,"Bardeen was reloaded. Please refresh the current window to continue."):s.createElement(s.Fragment,null,s.createElement(e2,null,s.createElement(e1,{$active:!0},"\uD83D\uDE34"),s.createElement(e1,{$active:t%3==1},"\uD83D\uDE0C"),s.createElement(e1,{$active:t%3==2},"\uD83D\uDE00")),"Waking up \u2013 Your Browser put Bardeen to sleep",eK)))):null},eK=s.createElement("svg",{width:"14px",xmlns:"http://www.w3.org/2000/svg",id:"eME3ys5Izig1",viewBox:"0 0 14 14",shapeRendering:"geometricPrecision",textRendering:"geometricPrecision"},s.createElement("style",null,"#eME3ys5Izig2 {animation: eME3ys5Izig2_c_o 2000ms linear infinite normal forwards}@keyframes eME3ys5Izig2_c_o {0 % { opacity: 0 } 25% {opacity: 1} 75% {opacity: 1} 100% {opacity: 0}} #eME3ys5Izig3 {animation: eME3ys5Izig3_c_o 2000ms linear infinite normal forwards}@keyframes eME3ys5Izig3_c_o {0 % { opacity: 0 } 25% {opacity: 0} 50% {opacity: 1} 75% {opacity: 1} 100% {opacity: 0}} #eME3ys5Izig4 {animation: eME3ys5Izig4_c_o 2000ms linear infinite normal forwards}@keyframes eME3ys5Izig4_c_o {0 % { opacity: 0 } 50% {opacity: 0} 75% {opacity: 1} 100% {opacity: 0}}"),s.createElement("ellipse",{id:"eME3ys5Izig2",rx:"1",ry:"1",transform:"translate(3 11.2)",opacity:"0",fill:"#fff",strokeWidth:"0"}),s.createElement("ellipse",{id:"eME3ys5Izig3",rx:"1",ry:"1",transform:"translate(7 11.2)",opacity:"0",fill:"#fff",strokeWidth:"0"}),s.createElement("ellipse",{id:"eME3ys5Izig4",rx:"1",ry:"1",transform:"translate(11 11.2)",opacity:"0",fill:"#fff",strokeWidth:"0"})),e0=c.Ay.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  align-items: center;
  backdrop-filter: "blur(3px)";
  background-color: ${i.Ql9}a0;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  opacity: ${e=>e.$fadeOut?0:1};
  transition: all 0.3s;
`,e1=c.Ay.span`
  transition: all 0.24s ease-in;
  opacity: ${e=>e.$active?1:0};
  &:not(:first-child) {
    position: absolute;
    left: 0;
  }
`,e2=c.Ay.span`
  font-size: 18px;
  margin: 0 12px 0 0;
  position: relative;
`,e4=(0,c.Ay)(eJ.o)`
  padding: 0px 16px;
`;var e3=n(93510),e6=n(11880),e8=n(1970),e5=n(19431),e7=n(44724),e9=n(99676);let te=s.memo(e=>{let{progress:t,onCancel:n,type:a}=e;return(0,e7.Ej)(s.createElement(tt,{center:!0,gap:16},"progress"===a?s.createElement(e9.z,{style:{maxWidth:308},value:t}):s.createElement(Z.y$,{size:"m"}),s.createElement("div",null,"Running playbook..."),s.createElement(Z.$n,{mode:"dark",round:!0,text:"Cancel",variant:"outlined",onClick:n})))}),tt=(0,c.Ay)(em.VP)`
  background: rgba(0, 0, 0, 0.64);
  color: white;
  inset: 0;
  position: fixed;
`,tn=e=>{let{children:t,state:n,notificationsEl:a,sharedEl:r,dispatch:i,trackClick:l}=e,{localInteractionRunState:o}=n;return s.createElement(s.Fragment,null,s.createElement("div",{style:{position:"fixed",inset:0},onClickCapture:l,"data-tracking-context":"RightClickMenu"},t,!function(e){return"None"!==e.modal.type||null!==e.confirmState||e.confettiCelebrationActive||Object.entries(e.pluginsState).some(e=>{let[t,n]=e;return n.component&&n.state})||"active"!==e.connection.type}(n)?null:s.createElement(e8.Y,{id:"on-page-shared-elements",style:{inset:0,position:"fixed"}},r),a,o&&s.createElement(tr,{localInteractionRunState:o})),s.createElement(ta,{localInteractionRunState:o,dispatch:i}))},ta=e=>{let{localInteractionRunState:t,dispatch:n}=e,r=a.isRunning(t)&&t.interactionsBlocking,i=t?.executionId;return r&&i?s.createElement(e8.Y,{id:"scraping-overlay",style:{position:"fixed",inset:0}},s.createElement(te,{progress:t.totalProgress,type:"loader",onCancel:()=>n({type:"App/LocalInteractionRunCancelled",executionId:i})})):null},tr=e=>{let{localInteractionRunState:t}=e;if(!t)return null;let n=null;switch(t.type){case"preparing":n={type:"loading",id:t.executionId,actions:[],persist:!0,message:"Preparing to run playbook..."};break;case"running":n={type:"loading",id:t.executionId,actions:[],persist:!0,onClose:{type:"App/LocalInteractionRunCancelled",executionId:t.executionId},message:"Playbook is running"};break;case"done":"success"===t.variant?n={type:"success",message:"Playbook run completed",id:`${t.executionId}-success`,onClose:{type:"App/LocalInteractionRunCleared",executionId:t.executionId},actions:[{text:"View results",onClick:{type:"App/ClickedLocalInteractionShowResults",runRecordId:t.runRecordId}}]}:t.error&&(n={type:"error",error:t.error.toJSON(),id:`${t.executionId}-error`,onClose:{type:"App/LocalInteractionRunCleared",executionId:t.executionId},actions:[{text:"View results",onClick:{type:"App/ClickedLocalInteractionShowResults",runRecordId:t.runRecordId}}]})}return n?s.createElement(e5.$.Component,{state:[n]}):null};var ti=n(13586),tl=n(89486);!function(e){e.isPreparing=e=>e?.type==="preparing",e.isRunning=e=>e?.type==="running",e.isDone=e=>e?.type==="done"}(a||(a={})),u.ok(e5.$.initialState),u.ok(B.ue);let to={config:P.j,__version:"",appWindowState:B.ue,builderV2State:null,busyCalls:[],clickTrackingBlacklist:[],confettiCelebrationActive:!1,confirmState:null,connection:{type:"active"},debugMsg:{i:0,msg:""},modal:J.$h,notifications:e5.$.initialState,tourFlowState:null,overlayModal:null,playbooksState:I.ue,pluginsState:{},postRunActions:[],showReason:{type:"user"},teamState:tl.ue,view:"appWindow",localInteractionRunState:null,createAutomationState:{compatibleModels:[],loadingModels:!1,modelsVisible:!1,openTabs:[]}},ts=[e3.eO(e=>({type:"App/ProfileFetched",profile:e})),e3.oE(e=>({type:"App/SubscriptionFetched",subscription:e}))],tc=(e,t,n,a)=>{let r=[];(function(e){let{settings:t,subscription:n}=e.config;if(!n||!t||t.hasSeenTrialEndedFlow)return[];let a=[];return!n.hasUsedTrial||y.TB(n)||(a.push(async e=>{let{dispatch:t}=e;return t({type:"App/TrialEnded"})}),y.tR(n)||y.HT(n)||a.push(async e=>{let{dispatch:t}=e;return t({type:"App/ModalShown",name:"TrialEnded"})})),a})(t).forEach(e=>r.push(e));let[i,l]=td(e,t,n,a);if(t.config.featureFlags.v4MiniEnabled&&i.builderV2State){let e=(0,W.O)(Y.Pv(i.builderV2State)),t=Y.Bf(i.builderV2State,()=>e);i={...i,builderV2State:t}}return l.forEach(e=>r.push(e)),(0,I.YK)(i,t)&&r.push(async e=>{let{dispatch:t}=e;t(I.XI({type:"Playbooks/FetchRequested"}))}),[i,r]},td=(e,t,n,r)=>{let{profile:i,settings:l,subscription:o}=t.config,s=(e,t)=>({...t,config:{...t.config,...e}}),c=(e,n)=>async a=>{let{api:r}=a,i=t.appWindowState.panels.find(e=>"Scraper"===e.title)?.id;if(!i)throw Error("Panel ID is not set");await r.integrationPanelMenuClick(i,e,n)};if(tA(e)){if(!t.tourFlowState)return[t,[]];let[n,a]=eR.Ff(t.tourFlowState,e);if("TourFinished"===n){a.push(async e=>{let{api:t}=e,n=[...l?.seenTutorials??[],"tour"];await t.accountSettingsSet({seenTutorials:n})});let[e,t]=tE(to);return[e,[...a,...t]]}return[{...t,tourFlowState:n},a]}switch(e.type){case"App/RunRecordsCheckingPeriodPassed":return[s({hasRunRecords:!1},t),[e3.EM(e=>({type:"App/HasRunRecordsFetched",hasRunRecords:e}))]];case"App/HasRunRecordsFetched":return[s({hasRunRecords:e.hasRunRecords},t),[]];case"App/ExperimentsWiped":return[t,[async e=>{let{api:t}=e;await t.systemWipeExperimentsCache()}]];case"App/UIReset":{let e=e5.$.success("Reset successful",{actions:[{text:"Restart App",onClick:{type:"App/StateSet",state:to,reboot:!0}}]});return[{...t,notifications:[e]},[async e=>{let{api:t}=e;return t.accountSettingsSet(p.x)}]]}case"App/OnboardingReset":{let e=[async e=>{let{api:t}=e;await t.accountSettingsSet(p.x),await t.onboardingDataSet(m.uh),await t.setOnboardingSuggestions(null)}];return[{...t,notifications:[e5.$.success("Reset successful")]},e]}case"AppWindowAction":{let{appWindowState:n}=t,[a,r]=B.Ff(e.action,n,t.config),{type:i}=e,l=r.map((0,A.zy)(e=>({type:i,action:e}))),o="ResultsAction"===e.action.type&&e.action.action.type===L.X.RunRecordAborted?e5.$.add(t.notifications,`${t.config.featureFlags.v4MiniEnabled?"Agent":"Playbook"} Run stopped`,{variant:"success"}):t.notifications;return[{...t,appWindowState:a,notifications:o},l]}case"App/AppWindowOpened":return e.view&&(t=tC(t,{explorerPageSelected:e.view})),[t={...t,view:"appWindow"},tv(t)];case"App/TrialEnded":return tk(t,{hasSeenTrialEndedFlow:!0});case"App/LocalInteractionRunStarted":return[{...t,localInteractionRunState:{type:"preparing",executionId:e.executionId,interactionsBlocking:e.interactionsBlocking}},[]];case"App/LocalInteractionRunProgress":if(!a.isRunning(t.localInteractionRunState)||t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:{...t.localInteractionRunState,totalProgress:e.totalProgress}},[]];case"App/LocalInteractionRunCancelled":if(!a.isRunning(t.localInteractionRunState)||t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:null},[e3.JH(t.localInteractionRunState.runRecordId,()=>({type:"App/LocalInteractionRunCancelled",executionId:e.executionId})),(0,e6.go)(t.localInteractionRunState.executionId)]];case"App/LocalInteractionRunDone":if(!a.isRunning(t.localInteractionRunState)||t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:{...t.localInteractionRunState,type:"done",executionId:e.executionId,runRecordId:t.localInteractionRunState.runRecordId,variant:"success",message:"Playbook run completed!",actions:[]}},[]];case"App/LocalInteractionRunRecordCreated":{let{localInteractionRunState:n}=t;if(!a.isPreparing(n)||n?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:{type:"running",executionId:e.executionId,runRecordId:e.runRecordId,interactionsBlocking:n.interactionsBlocking,totalProgress:0}},[]]}case"App/LocalInteractionRunFailed":if(!a.isRunning(t.localInteractionRunState)||t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[(0,eM.n_)(t,e.error),[]];case"App/LocalInteractionRunError":if(!a.isRunning(t.localInteractionRunState)||t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:{...t.localInteractionRunState,type:"done",executionId:e.executionId,runRecordId:t.localInteractionRunState.runRecordId,variant:"error",message:e.message,error:e.error,actions:[]}},[]];case"App/LocalInteractionRunCleared":if(t.localInteractionRunState?.executionId!==e.executionId)return[t,[]];return[{...t,localInteractionRunState:null},[]];case"App/ClickedLocalInteractionShowResults":return[{...t,showReason:{type:"user"},modal:J.Lq("Opening snapshot"),appWindowState:{...t.appWindowState,explorerPageSelected:"results",resultsHighlighted:!1}},[tF({type:"snapshot",runRecordId:e.runRecordId},e=>({type:"App/ErrorNotified",bardeenError:g.sF.from(e)}))]];case"App/RightClickMenuPlaybookClicked":{if(!o)return[t,[async t=>{let{dispatch:n}=t;setTimeout(()=>n(e),1e3)}]];let n=[];return n.push(async n=>{let{api:a,dispatch:r}=n,i=await a.playbookEditor2_GetPlaybookAsUIAst(e.playbook.id),l=(0,eM.pO)(i,t.config);if(e.playbook.needsConfig||i.meta.needsEditing||"None"!==l.type)return r({type:"App/AstLoaded",ast:i,from:"rightClickMenu",resumeOptions:i.meta.needsEditing?void 0:{type:"start"}});let o=(0,d.A)();return r({type:"App/LocalInteractionRunStarted",executionId:o,interactionsBlocking:!!e.playbook.commands.find(e=>"use_combined_scaper_model_on_active_tab"===e.command)}),(0,e6.pb)({ast:i,executionId:o,params:{targetIndex:null,defaultCacheBehavior:"run-all",limitResults:null},onCancel:()=>({type:"App/LocalInteractionRunCancelled",executionId:o}),onError:e=>({type:"App/LocalInteractionRunError",executionId:o,message:g.sF.from(e).message,error:e}),onDone:()=>({type:"App/LocalInteractionRunDone",executionId:o}),onData:e=>{switch(e.type){case"runrecord":return{type:"App/LocalInteractionRunRecordCreated",executionId:o,runRecordId:e.runRecordId};case"progress":return{type:"App/LocalInteractionRunProgress",executionId:o,totalProgress:e.totalProgress};case"failed":return{type:"App/LocalInteractionRunFailed",executionId:o,error:e.error};default:return}}})(n)}),[t,n]}case"App/PlaybookDeleteConfirmed":return[t={...t,confirmState:{type:"Confirm",header:`Are you sure you want to remove ${e.pb.name}?`,confirm:{action:I.XI({type:"Playbooks/DeleteRequested",pb:e.pb})},cancel:{}}},[]];case"PremiumModalClosed":return[{...t,overlayModal:null},[]];case"App/CreateTeamDeeplinkOpened":if(e.hasTeam){let e=tf({type:"Modal/SettingsShown",tab:"team"});return[{...t,notifications:[e5.$.create("You are already in a team. You can manage your team in settings.")]},[async t=>{let{dispatch:n}=t;return n(e)}]]}return[t,[async e=>{let{dispatch:t}=e;return t({type:"CreateTeamClicked"})}]];case"CreateTeamClicked":if(!y.fD(t.config.subscription,["teams"]))return[{...t,overlayModal:{type:"premiumFeature"}},[]];return[{...t,modal:{type:"TeamCreate"}},[]];case"App/AccountSettingsUpdated":return[s({settings:e.settings},t),[]];case"App/PlaybookDownloadClicked":return[t,[async t=>{let{api:n}=t,a=await n.playbookGet(e.id);if(a){let t=a.name.toLocaleLowerCase().replace(/[^a-z0-9-_]/g,"-"),r=await n.playbookExport(e.id);(0,_.RG)(new Blob([r]),`${t}.txt`)}}]];case"App/RightClickModalSaved":{if("AddToRightClickMenu"!==t.modal.type)return[t,[]];let e=t.modal.addToRightClickState;switch(e.mode){case"builderSaveFlow":{let n={...e.prevModal,addToWebsiteMenuState:e};return[{...t,modal:{type:"PinOrRightClick",pinOrRightClickState:n}},[]]}case"addTriggerTo":return[t,[async t=>{let{api:n,dispatch:a}=t,r=await j.IP(e,n,e.pb.ref);r&&a({type:"App/OnPageOrRightClickSaved",pb:r})}]]}}case"App/OnPageOrRightClickSaved":return[t={...t,modal:J.$h,notifications:[e5.$.success("Automation added to website menu")],playbooksState:e.pb?I.It(t.playbooksState,e.pb):t.playbooksState},[]];case"App/RightClickTriggerUnchecked":return[t,[async t=>{let{api:n,dispatch:a}=t,r=await n.websiteMenuPlaybookRemove(e.id);r&&a(th({type:"Playbooks/Updated",pb:D.W.fromApi(r)}))}]];case"App/InfoboxDismissed":return tk(t,{hasSeenPlaybooksInfobox:!0});case"App/FirstTeamMemberInvited":return tk(t,{hasInvitedFirstTeamMember:!0});case"App/SettingToggled":if(!l)return[t,[]];return tk(t,{[e.key]:!l[e.key]});case"App/ModelOverrideChanged":return tk(t,{modelFamilyOverride:e.override});case"App/CancelSubscriptionCurrentDetailsReceived":if("CancelWinback"!==t.modal.type)return[t,[]];return[{...t,modal:{type:"CancelWinback",currentSubscriptionPlanDetails:e.subscriptionPlanDetails,loading:!1}},[]];case"App/CancelSubscriptionAnyway":return[{...t,modal:J.$h,confirmState:{type:"Confirm",header:"Are you sure you want to cancel your subscription?",confirm:{action:{type:"App/CancelSubscription"}}}},[]];case"App/CancelSubscription":if(!t.confirmState){if(y.b0(t.config.subscription))return[{...t,modal:{type:"CancelWinback",currentSubscriptionPlanDetails:null,loading:!0}},[async e=>{let{api:n,dispatch:a}=e;a({type:"App/CancelSubscriptionCurrentDetailsReceived",subscriptionPlanDetails:await y.Xj(t.config.subscription,n)})}]];return[{...t,confirmState:{type:"Confirm",header:"Are you sure you want to cancel your subscription?",confirm:{action:e}}},[]]}return[{...t,modal:J.Lq("Canceling subscription")},[async e=>{let{api:t,dispatch:n}=e;await t.systemBardeenAccountCancelSubscription(),await t.systemBardeenAccountInvalidateSubscriptionCache(),await e3.oE(e=>({type:"App/SubscriptionFetched",subscription:e}))(e),n({type:"App/SubscriptionCanceled"})}]];case"App/SubscriptionCanceled":{let e=[e5.$.success("Subscription canceled")];return[{...t,modal:J.$h,notifications:e},[]]}case"App/UpgradeIntended":{let{from:n}=e,a=async e=>{let{api:t}=e;await t.trackEvent({name:"monetization.premium.paywall",properties:{from:n}})};if((0,eu.V)(t.config.paymentPlans))return[{...t,modal:{type:"Upgrade"}},[a]];return[{...t,overlayModal:{type:"subscription",from:n}},[a]]}case"App/SubscriptionModalClosed":case"App/ThankYouModalClosed":return[{...t,overlayModal:null},[]];case"BuilderV2Action":{let n=e.action;if("GotResults"===n.type){let e=n.result;if("progress"===e.type){let{totalProgress:n,snapshotId:a}=e;t=tS(t,{records:t.appWindowState.resultsState.records.map(e=>e.snapshotId===a?{...e,progress:n}:e)})}}if(!t.builderV2State)return[t,[]];let a=t.builderV2State,[i,l]=q.Ff(e.action,{...t,builderV2State:a},r),{type:o}=e,s=l.map(e3.zy(e=>({type:o,action:e})));if("AutobookActivationFinished"===n.type){let{ref:e}=Y.Pv(a);return[i,[async t=>{let{dispatch:n,api:a}=t;e&&n(th({type:"Playbooks/AutobookToggled",pb:D.W.fromApi(await e3.y_(e,a)),activated:!0}))}]]}return[i,s]}case"App/AstLoaded":{let n=[],{ast:a}=e,r=tT(t,{...e});n.push(G.Xo(r.builderV2State));let{resumeOptions:i}=e,l=a.ref;if(t.config.featureFlags.v4MiniEnabled&&l&&n.push(async e=>{let{dispatch:t,api:n}=e;t(tP({type:"PlaybookHistoryFetched",history:await n.runRecordList({reason:["autobook-run","playbook-run"],playbookRefId:Y.vY((0,f.W7)(l)),finalized:!0,toDateTs:Date.now(),perPage:100,page:0})}))}),"customFlow"===e.from&&r.builderV2State&&(r={...r,builderV2State:{...r.builderV2State,testModeEnabled:!0}}),!i)return[r,n];if("start"===i.type)return[r,[...n,async e=>{let{dispatch:t}=e;return t(tP({type:"ClickedRunPlaybook",forceValidatePlaybook:!1,autobookBehaviour:"run",testMode:r.builderV2State.testModeEnabled,runParams:{targetIndex:null,defaultCacheBehavior:"run-all",limitResults:null}}))}]];let o=(0,d.A)(),s=tT(t,{...e,ast:a,runRecordId:i.runRecordId,loadingStatus:null,from:"snapshot"===i.type?"results":"resume"});return[s,[...n,G.Xo(s.builderV2State),(0,e6.Li)({ast:a,executionId:o,onData:e=>tP({type:"GotResults",result:e,executionId:o}),onDone:()=>tP({type:"PlaybookExecutionFinished",executionId:o,completeAnimation:"snapshot"!==i.type}),onCancel:void 0,onError:e=>tP({type:"PlaybookSnapshotLoadFailed",executionId:o,error:e.toJSON()})})]]}case"App/BuilderMinimized":{let e=[],n=U.ue(t.config.profile?.uuid).params;return t.builderV2State&&"executionId"in t.builderV2State.sequencingStatus&&e.push((0,e6.go)(t.builderV2State?.sequencingStatus.executionId??"")),[{...t,view:"appWindow",builderV2State:null,config:{...t.config,failedAppConnection:null},appWindowState:{...t.appWindowState,explorerPageSelected:"results",resultsState:{...t.appWindowState.resultsState,params:n}}},[...e,e3.ad(U.Qz(n),e=>{let{records:t,summary:n}=e;return tb({type:L.X.DataFetched,records:t,summary:n})})]]}case"App/BuilderClosed":{let n=t.builderV2State;if(!n)return[t,[]];let a=Y.Pv(n),{shouldSave:r,shouldSaveConfig:i,wasModified:l,shouldRename:o}=Y.ij(a,n.origin),{scraperTemplates:s,resultsState:c,explorerPageSelected:d}=t.appWindowState,u=[e3.zy(ty)(B.Gr(s)),e3.ad(U.Qz(c.params),e=>{let{records:t,summary:n}=e;return tb({type:L.X.DataFetched,records:t,summary:n})})];if(t.config.featureFlags.v4MiniEnabled){if(o){let[a,r]=q.dr({...t,builderV2State:n},e);return[a,r.map(t$)]}let i=async e=>e.dispatch(I.XI({type:"Playbooks/FetchRequested"}));return r?u.push(j.K2([j.oy(n,t.config,e=>({type:"BuilderV2Action",action:{type:"PlaybookSaved",pb:e,executionId:null}})),i])):u.push(i),[{...t,builderV2State:null,view:"appWindow",playbooksState:I.xd(t.playbooksState,e=>a.meta.id===e.legacyId?{...e,saving:r}:e)},u]}if((0,H.jx)(d)&&u.push(async e=>{let{dispatch:t}=e;return t(I.XI({type:"Playbooks/FetchRequested"}))}),!r&&!i||!l||0===a.statements.length)return u.push(G.XW(n,"exit")),"running"===n.sequencingStatus.type&&n.sequencingStatus.runRecordId&&u.push(e3.JH(n.sequencingStatus.runRecordId)),[{...t,view:"appWindow",builderV2State:null,config:{...t.config,failedAppConnection:null}},u];return[{...t,confirmState:{type:"UnsavedChanges"}},u]}case"App/BuilderUnsavedChangesDiscarded":{let e=[];return t.builderV2State&&e.push(G.XW(t.builderV2State,"discard")),[{...t,view:"appWindow",builderV2State:null,config:{...t.config,failedAppConnection:null}},e]}case"App/BusyCallAdded":{let{type:n,...a}=e;return[{...t,busyCalls:t.busyCalls.concat(a)},[]]}case"App/BusyCallRemoved":{let n=t.busyCalls.filter(t=>t.id!==e.id&&t.startedAt>Date.now()-1e4);return[{...t,busyCalls:n},[]]}case"App/DuePaymentAmountFetched":{if(t.confirmState?.type!=="UpgradeSubscription")return[t,[]];let{remainingTimeCharge:n,nextPeriodCharge:a}=e,r={...t.confirmState,due:{remainingTimeCharge:n,nextPeriodCharge:a}};return[{...t,confirmState:r},[]]}case"App/UpgradeSubscriptionClicked":{let{creditAmount:n,product:a,planCode:r}=e,i=[];if(!t.confirmState)return i.push(async e=>{let{api:t,dispatch:i}=e;i({type:"App/DuePaymentAmountFetched",...await t.systemBardeenAccountGetPaymentDue(n,a,r)})}),[{...t,confirmState:{type:"UpgradeSubscription",creditAmount:n,due:"loading",product:a,planCode:r}},i];return i.push(async e=>{let{api:i,dispatch:l}=e,o=await i.systemBardeenAccountUpgradeSubscription(n,t.confirmState&&"product"in t.confirmState?t.confirmState.product:a,r);await Promise.all(ts.map(t=>t(e))),"checkoutUrl"in o&&o.checkoutUrl?(window.open(o.checkoutUrl),l({type:"App/ExternalCheckoutPoppedUp"})):l({type:"App/CheckoutSucceeded"})}),[{...t,confirmState:null,overlayModal:{type:"message",message:"Changing subscription..."}},i]}case"App/PaymentPlansSet":return[{...t,config:{...t.config,paymentPlans:e.plans}},[]];case"App/PaymentInitialized":return[t,[async t=>{let{api:n,dispatch:a}=t,{planCode:r,creditAmount:i}=e,l=await n.systemBardeenAccountInitializePayment({creditAmount:i,planCode:r});"#demo"===l.checkoutUrl?a({type:"App/CheckoutSucceeded"}):window.open(l.checkoutUrl)}]];case"App/ClientDisconnected":if("inactive"===t.connection.type)return[t,[]];return[{...t,connection:{type:"inactive",queuedActions:[]}},[]];case"App/ClientUnavailable":return[{...t,connection:{type:"unavailable"}},[]];case"App/ClientReconnectRequested":{let e=async e=>{let{api:n,dispatch:a}=e;if(await e3.Ph(n),"appWindow"===t.view)return a({type:"App/ClientReconnected"})};return[t,[e]]}case"App/ClientReconnected":{let e=async e=>{let{dispatch:n}=e;n({type:"PluginModuleAction",action:{type:"CheckAllPluginModules"}}),"inactive"===t.connection.type&&t.connection.queuedActions.forEach(n)};return[t,[e]]}case"App/ConfirmCancelled":return[{...t,confirmState:null},[]];case"App/ConfirmShown":return[{...t,confirmState:e.config},[]];case"App/BillingEmailEdited":return[{...t,confirmState:{type:"App/BillingEmailEdited",email:e.email}},[]];case"App/BillingEmailSaveRequested":{if(t.confirmState?.type!=="App/BillingEmailEdited")return[t,[]];let e=t.confirmState.email,n=async t=>{let{api:n,dispatch:a}=t;await n.systemBardeenAccountUpdateBillingDetails({email:e}),a({type:"App/BillingEmailSaved"})};return[{...t,confirmState:{...t.confirmState,saving:!0}},[n]]}case"App/BillingEmailSaved":{if(t.confirmState?.type!=="App/BillingEmailEdited")return[t,[]];let e=t.modal;t.notifications;let n={notifications:[e5.$.success("Email updated")]};if("Settings"===e.type&&"billing"===e.settingsState.type&&e.settingsState.billing){let a={...e.settingsState.billing,email:t.confirmState.email};n.confirmState=null,n.modal={...e,settingsState:{...e.settingsState,billing:a}}}return[{...t,...n},[]]}case"App/PlaybookClicked":{let{from:n,pbId:a}=e,r=t.config.featureFlags.v4MiniEnabled;return[{...t,view:"builderV2",modal:J.Lq("Loading")},[async e=>{let{api:t,dispatch:i}=e,l=await t.playbookEditor2_GetPlaybookAsUIAst(a,r),o=l.snapshotId?{type:"snapshot",runRecordId:l.snapshotId}:void 0;i({type:"App/AstLoaded",ast:l,from:n,resumeOptions:o})}]]}case"Scrapers/CreateClicked":return[t,[c("create-scraper",e.forUrl??void 0)]];case"Scrapers/EditClicked":{let{personal:n,catalog:a=[]}=(t={...t,modal:J.$h}).appWindowState.scraperTemplates,r=[...n,...a??[]];if(t.config.featureFlags.v4MiniEnabled&&r.find(t=>t.id===e.id)?.premium&&!y.fD(t.config.subscription,["business"]))return[{...t,overlayModal:{type:"premiumFeature"}},[]];return[t,[c(`find-scraper-model/${e.id}`,"edit")]]}case"Scrapers/DeleteClicked":return[t,[c(`find-scraper-model/${e.id}`,"delete")]];case"Scrapers/DownloadClicked":return[t,[c(`find-scraper-model/${e.id}`,"download")]];case"Scrapers/DuplicateClicked":return[t={...t=tC(t,{scraperTemplates:{...t.appWindowState.scraperTemplates,view:"my-templates"}}),modal:J.$h},[t=>{let{api:n}=t;return n.scraperTemplatesDuplicate(e.id)}]];case"App/AutobookToggleClicked":return[t,[async n=>{let{api:a,dispatch:r}=n,i=await e3.y_(e.pbId,a),l=i.triggerStatus,o=t.config.featureFlags.v4MiniEnabled?"Agent":"Autobook";if(l&&(0,h.X7)(l))return r({type:"NotificationsAction",action:{type:"Notifications/Added",message:`${o} deactivating...`,variant:"success"}}),a.triggerDeactivate(l.uuid);r({type:"App/AutobookActivateStarted",pb:i});let s=await a.playbookEditor2_GetPlaybookAsUIAst(i.id),c=(0,eM.pO)(s,t.config);if("builderV2"!==t.view&&(i.needsConfig||i.needsEditing)||"None"!==c.type)return r({type:"App/AstLoaded",ast:s,from:"my",resumeOptions:{type:"start"}});i.triggerStatus&&r({type:"App/TriggersUpdated",triggers:[{...i.triggerStatus,status:"pending"}]}),await (0,e6.YO)({ast:s,executionId:(0,d.A)(),onDone:()=>({type:"App/AutobookActivateFinished",pb:i}),onError:e=>({type:"App/ErrorNotified",bardeenError:e})})(n)}]];case"App/AutobookActivateStarted":{let e=t.config.featureFlags.v4MiniEnabled?"Agent":"Autobook",n=[e5.$.success(`${e} activating...`)];return[{...t,notifications:n},[]]}case"App/AutobookActivateFinished":{let e=t.config.featureFlags.v4MiniEnabled?"Agent":"Autobook",n=[e5.$.success(`${e} activated successfully`)];return[{...t,notifications:n},[]]}case"App/BuilderSaved":{let{pb:n,mode:a}=e,r=[],i=t.config.featureFlags.v4MiniEnabled?"Agent":"Playbook";return n.needsEditing||"save-and-activate"!==a||r.push(async e=>{let{dispatch:t}=e;t({type:"App/AutobookToggleClicked",pbId:n.id,from:"blank"})}),(t=tI(t,n)).builderV2State&&r.push(G.XW(t.builderV2State,"save")),[t={...t,modal:J.$h,notifications:[e5.$.success(`Saved to My ${i}s`)],view:"appWindow",builderV2State:null},r]}case"App/LogoutRequested":{let e=[async e=>{let{api:t,dispatch:n}=e;n({type:"App/ResetRequested"}),await t.systemBardeenAccountLogout(),setTimeout(()=>window.location.reload(),400)}];return[t=s({logoutInProgress:!0},t),e]}case"App/PlaybookHighlighted":return[t={...t=tI(t,e.pb),notifications:[e5.$.success("Added successfully to My Space",{actions:[(0,I.rO)(e.pb.id,"my")]})],view:"appWindow"},[]];case"App/FeatureFlagsFetched":return[s({featureFlags:e.flags},t),[]];case"App/PlaybookSortingChanged":return tk(t=tC(t,{explorerHighlightedPb:null}),{playbookSorting:e.sorting});case"NotificationsAction":{let n=e5.$.reducer({action:e.action,state:t.notifications});return[{...t,notifications:n},[]]}case"App/AppConnectClicked":case"App/AppReconnectClicked":return[t,[e3.Q9(e.app,e.userData)]];case"App/AppRemoveClicked":return[t,[async t=>{await t.api.integrationDeactivate(e.app),await e3.zn(e=>({type:"App/PluginSummaryFetched",summary:e}))(t)}]];case"App/ResetRequested":return[to,[]];case"App/ErrorNotified":{let n=g.sF.from(e.bardeenError).toJSON(),a=[async e=>{let{api:t}=e;t.trackError(n)}];return[t={...t,notifications:e5.$.reducer({action:{type:"Notifications/ErrorAdded",bardeenError:n},state:t.notifications})},a]}case"App/AppConnectFlowFinished":return[t,[async function(e){let{api:t,dispatch:n}=e,a=await t.integrationsGetAndClearLastActivationStatus();if(!a)return;let{aborted:r,instance:i,userData:l,error:o}=a;!r&&l&&("disconnected"===i.instance.state.type?(o?.message,n({type:"App/AppConnectFlowFailed",app:i,userData:l,error:o?.message})):n({type:"App/AppConnectFlowSucceeded",userData:l,pluginInfo:i}))}]];case"App/AppConnectFlowFailed":{let n=[e3.zn(e=>({type:"App/PluginSummaryFetched",summary:e}))];return"builderV2"===e.userData.from&&n.push(async t=>{let{dispatch:n}=t;n(tP({type:"ConnectAppFailed",app:e.app,message:e.error||"Failed to connect to app"}))}),[{...t,config:{...t.config,failedAppConnection:e.app},notifications:e5.$.addError(t.notifications,new $.Qt().toJSON())},n]}case"App/AppConnectFlowSucceeded":{let n=[];n.push(e3.zn(e=>({type:"App/PluginSummaryFetched",summary:e})));let{userData:a}=e,r=[];return n.push(async n=>{let{dispatch:i,api:l}=n;if("builderV2"===a.from)r.push(tP({type:"ConnectAppSuccess",app:e.pluginInfo}));else if("convertToAutobook"===a.from)e3.MA(e=>tf({type:"Modal/ConvertToAutobookActionPerformed",action:{type:"SetIntegrations",integrations:e}}))({dispatch:i,api:l});else{let e=null;if(a.pb){let t=await l.playbookGet(a.pb);t&&(e=D.W.fromApi(t))}let t=e?.id;switch(a.switchTo){case"appWindow":t&&r.push({type:"App/PlaybookClicked",from:"unknown",pbId:t});break;case"builder":t&&r.push({type:"App/PlaybookClicked",from:"my",pbId:t})}}"AppsConnection"===t.modal.type?(i(tf({type:"Modal/AppsConnectionActionPerformed",action:{type:"Activated"}})),await new Promise(e=>setTimeout(e,2e3)),i({type:"ModalsAction",action:{type:"Modal/Closed"}})):"StudioCardEditor"===t.modal.type&&i(tf({type:"Modal/StudioCardEditorActionPerformed",action:{type:"ForceRevalidatePlaybook"}})),r.forEach(i)}),[s({failedAppConnection:null},t),n]}case"App/AppConnectionChanged":{let e=[e3.zn(e=>({type:"App/PluginSummaryFetched",summary:e}))];return t.builderV2State&&(e.push(t$(q.WA(t.builderV2State,{invalidateCache:!0}))),e.push(async e=>{let{dispatch:t}=e;t(tf({type:"Modal/StudioCardEditorActionPerformed",action:{type:"ForceRevalidatePlaybook"}}))})),[t,e]}case"App/ActionScheduledOnReconnect":{let n=("inactive"===t.connection.type?t.connection.queuedActions:[]).concat(e.action);return[t={...t,connection:{type:"inactive",queuedActions:n}},[]]}case"App/StateSet":{let[t,n]=e.reboot?tE(e.state):[e.state,[]];return[t,n]}case"App/TrackableClicked":{let n=async function(t){let{api:n}=t;await n.trackEvent({name:"ui.click",properties:{name:e.name}})};return[t={...t,debugMsg:{i:t.debugMsg.i+1,msg:e.name}},[n]]}case"TeamAction":return tl.Ff(e.action,t);case"App/CreditsChanged":{if(!o)return[t,[]];let{microCredits:n,microCreditsBreakdown:a}=e;return[t=s({subscription:{...o,microCredits:n,microCreditsBreakdown:a}},t),[]]}case"App/RunRecordAdded":{let n={...t};if("builderV2"===t.view){let a=n.builderV2State;if(!a)return[t,[]];let r=Y.Pv(a),i=e.runRecord.playbookRef?Y.vY(e.runRecord.playbookRef):"",l=r?.ref?Y.vY((0,f.W7)(r.ref)):"";if(i&&l&&i===l){let r=a.runHistory,i=[e.runRecord,...r];n={...t,builderV2State:{...a,runHistory:i}}}}let a=n.appWindowState.resultsState,r=n.appWindowState.resultsState.records.find(t=>t.id===e.runRecord.id)?n.appWindowState.resultsState.records:[e.runRecord,...n.appWindowState.resultsState.records],i={...n.appWindowState.resultsState.recordDetails,[e.runRecord.id]:e.runRecord},l=tR(n.appWindowState.explorerPageSelected,e.runRecord.reason);return[{...n,config:{...n.config,hasRunRecords:!0},appWindowState:{...n.appWindowState,resultsHighlighted:l,resultsState:{...a,records:r,recordDetails:i}}},[]]}case"App/RunRecordUpdated":{let n=t.appWindowState.resultsState;if(!n)return[t,[]];let a=n.records.map(t=>t.id===e.runRecord.id?e.runRecord:t),r={...n.recordDetails,[e.runRecord.id]:e.runRecord},i=tR(t.appWindowState.explorerPageSelected,e.runRecord.reason),l={...t,appWindowState:{...t.appWindowState,resultsHighlighted:i,resultsState:{...n,records:a,recordDetails:r}}},o=e3.zy(tb);return[l,e.runRecord.isFinalized?[o(U.Jf(l.appWindowState.resultsState))]:[]]}case"App/ProfileFetched":return[s({profile:e.profile},t),[]];case"App/SubscriptionFetched":return[s({subscription:e.subscription},t),[]];case"App/SettingsFetched":return[s({settings:e.settings},t),[]];case"ModalsAction":{let n=[],[a,r]=J.Ff(e.action,t);"Onboarding"===t.modal.type&&"None"===a.modal.type&&n.push(async e=>{let{dispatch:t}=e;return t({type:"App/OnboardingFinished"})}),"Modal/SettingsActionPerformed"===e.action.type&&"Settings/TabSwitched"===e.action.action.type&&"team"===e.action.action.tabName&&n.push(e3.aA(e=>({type:"TeamAction",action:{type:"Team/Fetched",...e}})));let i=e.type;return[a,[...n,...r.map(e=>async t=>{let{api:n,dispatch:a}=t;await e({api:n,dispatch:e=>a({type:i,action:e})})})]]}case"PluginModuleAction":{let{type:n}=e,[a,r]=ti.Ff(e.action,t.pluginsState);return[{...t,pluginsState:a},r.map(t=>async a=>{let{api:r,dispatch:i}=a,l=e=>i({type:n,action:e});await t({api:r,dispatch:l,controller:(0,ti.Dk)(r,l,e.action.uuid)})})]}case"App/PlaybookRenameSubmitted":{let e=t.modal;if("PlaybookRename"!==e.type)return[t,[]];let{mode:n,pb:a}=e.renamingState,r={duplicate:"Playbooks/DuplicateRequested",rename:"Playbooks/RenameRequested"}[n.type],[i,l]=I.Ff({type:r,pb:a},t);return[{...i,modal:{...e,renamingState:{...e.renamingState,loading:!0}}},l]}case"App/PaymentPortalNavigated":return[t,[async e=>{let{api:t}=e,n=await t.systemBardeenAccountPaymentPortal();window.open(n.customerPortalUrl)}]];case"App/OpenInvoiceNavigated":{let e=o?.activeSubscription?.openInvoice?.url;return[t,e?[async()=>void window.open(e)]:[]]}case"App/ModalShown":if("name"in e){if("ThankYou"===e.name)return[{...t,overlayModal:{type:"thankYou"}},[]];return[{...t,modal:{type:e.name}},[]]}return[{...t,modal:e.modal},[]];case"PlaybooksAction":return I.Ff(e.action,t);case"App/Focused":{let e="Settings"===t.modal.type?ts:[];if(t.tourFlowState?.isWaitingFocus){let[e,n]=eR.Ff(t.tourFlowState,{type:"TourFlow/NextStepClicked"});if("TourFinished"===e){let[e,t]=tE(to);return[e,[...t,...n]]}return[{...t,tourFlowState:{...e,isWaitingFocus:!1}},n]}return[t,e]}case"App/TeamJoinSuccessClosed":return tw(t);case"App/ConfettiDone":return[{...t,confettiCelebrationActive:!1},[]];case"App/ClickTrackingBlacklistFetched":return[{...t,clickTrackingBlacklist:e.regexps},[]];case"App/OnboardingFinished":{let e={hasSeenOnboardingSlideshow:!0,onboardingCompletedAt:new Date().toISOString(),hasRanFirstPlaybook:!1,hasInvitedFirstTeamMember:!1,hasActivatedFirstAutobook:!1},n=[async t=>{let{api:n,dispatch:a}=t;await n.accountSettingsSet(e);let r=(await n.integrationsSuggestions()).map(e=>e.factoryId);await n.setOnboardingSuggestions({integrationIds:r.join(",")}),await n.onboardingFinish()}];return l&&(t=s({settings:{...l,...e}},t)),[{...t,modal:J.$h},n]}case"App/PluginSummaryFetched":return[s({pluginsSummary:b.j.Success(e.summary)},t),[]];case"App/BardeenDismissClicked":{let e=t.modal;if("Onboarding"===e.type&&e.onboardingState)return[t,[]];return[t,[async e=>{let{api:t}=e;return t.appWindowHide()}]]}case"App/CreateClicked":if(t.config.featureFlags.v4MiniEnabled)return[{...t,modal:{type:"CreateNewAgent"}},[]];return[tT(t,{ast:null}),[async e=>{let{api:t}=e;return await t.playbookEditor3_ClearPreviewState()}]];case"App/EscapePressed":return[t,[async e=>{let{api:t}=e;return t.appWindowHide()}]];case"App/ExternalCheckoutPoppedUp":return[{...t,modal:J.$h},[]];case"App/CheckoutSucceeded":return[{...t,overlayModal:{type:"thankYou"}},[async e=>{let{api:t}=e;return await t.systemBardeenAccountInvalidateSubscriptionCache()}]];case"App/DynamicBannerDismissClicked":return tk(t,{lastDismissedDynamicBanner:!0});case"App/FirstSaveSetupSaved":{let n=t.modal,a="PinOrRightClick"===n.type?n.pinOrRightClickState:null,r=j.y_({origin:e.origin,rightClickMenu:a?.addToWebsiteMenuState??void 0,skipCommentsUpdate:t.config.featureFlags.v4MiniEnabled,pb:tM(e.pb)},(t,n)=>"save-and-activate"===e.mode?{type:"App/BuilderSaved",pb:t,mode:"save-and-activate"}:tP({type:"PlaybookSaved",pb:n,executionId:null}));if("PinOrRightClick"===n.type){let e={...n.pinOrRightClickState,loading:!0};n={...n,pinOrRightClickState:e}}else if("ConvertToAutobook"===n.type){let e={...n.convertToAutobookState,loading:!0};n={...n,convertToAutobookState:e}}return[{...t,modal:n},[r]]}case"App/TourFlowCanceled":{let[t,n]=tE(to);return[t,[...n,e3.u4({name:"onboarding.tour.skip",properties:{reason:e.reason}})]]}case"App/DownloadDebugBundleClicked":return[t,[n]];case"App/ShowInStudioClicked":return[{...t,modal:J.Lq("Opening snapshot")},[tF({type:e.isRunning?"resume":"snapshot",runRecordId:e.runRecordId},e=>({type:"App/SnapshotLoadingFailed",error:g.sF.from(e).toJSON()}))]];case"App/SnapshotLoadingFailed":{let n=J.$h,a=[e5.$.error(e.error)];return[{...t,view:"appWindow",modal:n,notifications:a},[]]}case"Builder/InteractedWithTestModeToggle":case"Builder/TestModeTooltipGotItClicked":return tk(t,{hasSeenStudioTestToggle:!0});case"App/OpenPlaybookResultsClicked":{let{pb:n}=e,a={...t,appWindowState:{...t.appWindowState,explorerPageSelected:"results",resultsState:{...t.appWindowState.resultsState,isLoading:!0,params:{...U.ue(i?.uuid).params,playbook:n}}}};return[a,[e3.ad(U.Qz(a.appWindowState.resultsState.params),e=>{let{records:t,summary:n}=e;return tb({type:L.X.DataFetched,records:t,summary:n})})]]}case"App/ExperimentalFeatureChanged":{if("Settings"!==t.modal.type||"account"!==t.modal.settingsState.type)return[t,[]];let{settingsState:n}=t.modal,a=n.featureOverrides.map(t=>t.feature===e.feature?{...t,value:e.value}:t),r=e5.$.add(t.notifications,"You need to open Bardeen manually after clicking Restart Bardeen",{variant:"success",actions:[{text:"Restart Bardeen",onClick:{type:"App/ReloadAndClose"}}]});return[{...t,modal:{...t.modal,settingsState:{...n,featureOverrides:a}},notifications:e.requiresReload?r:t.notifications},[async t=>{let{api:n}=t;return n.systemUpdateOverridableFeature(e.feature,e.value)}]]}case"App/ReloadAndClose":return[t,[async e=>{let{api:t}=e;return t.systemReload()}]];case"App/ChangedSaveAndActivate":return tk(t,{prefersActivateAndCloseAutobook:e.checked});case"App/TriggersUpdated":for(let n of e.triggers)t=tu(t,n);return[t,[]];case"ScraperTemplateSelected":{if("UseScraperTemplate"!==t.modal.type)return[t,[]];let{scraperTemplate:n}=t.modal,a={background:"use_combined_scaper_model_in_background",activeTab:"use_combined_scaper_model_on_active_tab"}[e.variant];return[{...t,confirmState:null,view:"builderV2",modal:J.Lq("Creating Agent")},[async e=>{let{api:t,dispatch:r}=e,i=await tO(t,n,a,null);r({type:"App/AstLoaded",ast:i={...i,statements:i.statements.map(e=>({...e,expanded:!0}))},from:"unknown"})}]]}case"App/ClickedPremiumFeature":return[{...t,overlayModal:{type:"premiumFeature"}},[]];case"StudioCardEditorExitRequested":{if("StudioCardEditor"!==t.modal.type)return[t,[]];let{mode:n,number:a}=e,{studioCardEditorState:r}=t.modal,i="create"===r.mode,l=r.pb.statements.concat(r.pb.trigger??[]).filter(e=>"FunctionCallStatement"===e.type).find(e=>e.index===r.statementIndex);if(!l)return[t,[]];let o=i&&"end"===r.appendTo||l&&Y.$J(l,r.pb),s=!x.Bv((0,Y.qO)(E.Bs(r.pb,{...E.ir(r.pb),exportStatement:null})),(0,Y.qO)(E.Bs(r.originalPb,{...E.ir(r.originalPb),exportStatement:null})),{compareColumnData:!1}),c=Y.T5(l,r.pb,!i);if(!o&&s&&c.length>0){let e=tf({type:"Modal/StudioCardEditorActionPerformed",action:{type:"ClickedCancelConfirmation"}});return[{...t,modal:{...t.modal,studioCardEditorState:{...r,confirmState:{...(0,Q.EX)(),closeAction:e,list:c,confirm:{text:"Yes",action:{type:"StudioCardEditorExited",mode:n,number:a,statementToIgnoreCache:c.map(e=>e.statementIndex)}},cancel:{text:"Cancel",action:e}}}}},[]]}return[t,[async e=>{let{dispatch:t}=e;return t({type:"StudioCardEditorExited",mode:n,number:a,statementToIgnoreCache:[]})}]]}case"StudioCardEditorExited":{if("StudioCardEditor"!==t.modal.type)return[t,[]];let n=[],{pb:a,statementIndex:r,mode:i}=t.modal.studioCardEditorState,l=a;if(t={...t,modal:J.$h},null===r)return[t,[]];let o="builderV2"===t.view?t.builderV2State:null;if(!o)return[t,[]];let{mode:s}=e,c=1===l.statements.length&&"create"===i;if(c){let e=l.statements[0];if(e&&"FunctionCallStatement"===e.type){let t=e.args[0]||null;if(v.gl(e.name)){let n=Y.dT(e.name,t);l={...l,meta:{...l.meta,name:n}}}}}o=Y.Bf(o,()=>Y.C8(l,e.statementToIgnoreCache));let d="save-only"!==s?r:void 0;return void 0!==d&&n.push(async t=>{let{dispatch:n}=t;return n({type:"BuilderV2Action",action:{type:"ClickedRunPlaybook",forceValidatePlaybook:!1,testMode:!1,autobookBehaviour:"activate"===s?"activate":"run",runParams:{targetIndex:d,targetCacheBehavior:"fill-missing",defaultCacheBehavior:"fill-missing",limitResults:"run-first"===e.mode?e.number:null}}})}),c&&n.push(G.Xo(o)),[{...t,builderV2State:{...o,testModeEnabled:!1,cardEditorState:null}},[...n,j.Yt(r)]]}case"ScraperTemplateClicked":{let{template:n}=e;if(t.config.featureFlags.v4MiniEnabled&&n.premium&&!y.fD(t.config.subscription,["business"]))return[{...t,overlayModal:{type:"premiumFeature"}},[]];return[{...t,modal:{type:"UseScraperTemplate",scraperTemplate:n}},[]]}case"UseScraperTemplate/useInAgentClicked":{if("UseScraperTemplate"!==t.modal.type)return[t,[]];if(!t.config.featureFlags.v4MiniEnabled)return[{...t,confirmState:{type:"UseScraperTemplate"}},[]];let{scraperTemplate:e}=t.modal;return[t,[async t=>{let{api:n,dispatch:a}=t;a({type:"UseScraperTemplate/useInAgentSucceeded",pb:await tO(n,e,"use_combined_scaper_model_in_background",null)})}]]}case"UseScraperTemplate/useInAgentSucceeded":{let{pb:n}=e,a=n.statements[0];if(!a)return[t,[]];return[{...tT(t,{ast:(0,Y.Ui)(),loadingStatus:null,from:"blank"}),view:"builderV2",modal:{type:"StudioCardEditor",studioCardEditorState:{...eA._G({commands:[],description:"Scrape data from the web",icon:"IntegrationScraper",name:"Scrape data from the web"},n,null),selectedTab:"Setup",statementIndex:a.index}}},[async e=>{let{dispatch:t}=e;t({type:"ModalsAction",action:{type:"Modal/StudioCardEditorActionPerformed",action:{type:"ForceRevalidatePlaybook"}}})}]]}case"App/CreateAgentSelectorClicked":{let{option:n}=e;switch(n.type){case"import":return[{...tT(t,{ast:Y.Ui(),loadingStatus:null,from:"blank"}),modal:{type:"StudioCardEditor",studioCardEditorState:eA._G(v.bY,Y.Ui(),"end")},view:"builderV2"},[]];case"scrape":if(t.config.featureFlags.v4MiniEnabled&&n.template.premium&&!y.fD(t.config.subscription,["business"]))return[{...t,overlayModal:{type:"premiumFeature"}},[]];return[t,[async e=>{let{api:t,dispatch:a}=e;a({type:"UseScraperTemplate/useInAgentSucceeded",pb:(await t.onboardingGetOpenTabs()).some(e=>e.url===n.url)?await tO(t,n.template,"use_combined_scaper_model_on_active_tab",null):await tO(t,n.template,"use_combined_scaper_model_in_background",n.url)}),await t.appWindowSwitchToTab(n.url)}]]}}case"MagicBoxQuerySubmitted":{let n=async t=>{let{api:n,dispatch:a}=t;try{let{id:t}=await n.playbookSemanticParsingGenerateFromQuery(e.value),r=await n.playbookEditor2_GetPlaybookAsUIAst(t);a({type:"App/AstLoaded",from:"my",ast:r})}catch(e){throw a({type:"MagicBoxFailed"}),e}};return[{...t,modal:{type:"LoadingOverlay",message:"Generating playbook"}},[n]]}case"MagicBoxFailed":return[{...t,modal:J.$h},[]];case"App/CreateAgent/Mounted":{let e={...t.createAutomationState,modelsVisible:!1,activeTabs:[],compatibleModels:[],loadingModels:!1};return[{...t,createAutomationState:e},[async e=>{let{api:t,dispatch:n}=e;n({type:"App/CreateAgent/ActiveTabsReloaded",openTabs:await t.onboardingGetOpenTabs()})}]]}case"App/CreateAgent/ActiveTabsReloaded":{let n={...t.createAutomationState,openTabs:e.openTabs};return[{...t,createAutomationState:n},[]]}case"App/CreateAgent/CreateAgentSelectorUrlSelected":{let n={...t.createAutomationState,compatibleModels:[],loadingModels:!0,modelsVisible:!0};return[{...t,createAutomationState:n},[async t=>{let{api:n,dispatch:a}=t;a({type:"App/CreateAgent/CompatibleModelsReloaded",compatibleModels:await n.scraperTemplatesListCompatibleForUrl(e.url)})}]]}case"App/CreateAgent/CompatibleModelsReloaded":{let n={...t.createAutomationState,loadingModels:!1,compatibleModels:e.compatibleModels,modelsVisible:!0};return[{...t,createAutomationState:n},[]]}case"App/CreateAgent/HideModels":{let e={...t.createAutomationState,modelsVisible:!1};return[{...t,createAutomationState:e},[]]}default:return(0,u.HB)(e)}},tu=(e,t)=>{let{playbooksState:n,builderV2State:a}=e;return n=I.EG(n,t),a&&(a=q.EG(a,t)),{...e,playbooksState:n,builderV2State:a}},tp=e=>{let{dispatch:t,state:n}=e,a=(0,A.i8)(t,"ModalsAction"),i=(0,A.i8)(t,"PluginModuleAction"),l=(0,A.i8)(t,"BuilderV2Action"),{confirmState:c,overlayModal:d}=n,{featureFlags:u}=n.config,{subscription:p,teamConfig:m,paymentPlans:g}=n.config,y=m?.isTeam??!1,f=!y||y&&!!m?.isAdmin,{settings:h}=n.config,b=n.busyCalls.filter(e=>e.startedAt>Date.now()-1e4).length>0,x=tg(),E=s.useCallback(e=>{t({type:"App/TrackableClicked",name:e})},[t]),v=(0,N.H)(E,n.clickTrackingBlacklist),C=s.createElement(e5.$.Component,{state:n.notifications}),S=s.useCallback(e=>{let n=e.target;n?.dataset.bardeenDismiss&&t({type:"App/BardeenDismissClicked"})},[t]),k=s.useCallback(()=>{t({type:"App/BuilderClosed"})},[t]),w=s.useCallback(()=>{t({type:"App/BuilderMinimized"})},[t]),I=(0,eR.Cb)(n.tourFlowState),P=s.createElement(s.Fragment,null,s.createElement(J.uA,{dispatch:a,state:n}),(()=>{switch(d?.type){case void 0:return null;case"message":return s.createElement(V.h,{style:{display:"flex"}},s.createElement(r.H2,{style:{margin:"auto"}},d.message));case"subscription":if(!p)return null;let e=g.find(e=>"MONTHLY"===e.code),n=g.find(e=>"YEARLY"===e.code);if(!e||!n)return null;if((0,eu.V)(g))return s.createElement(ew.k,{onClose:()=>t({type:"PremiumModalClosed"}),intent:"moreCredits"});return s.createElement(ey,{from:d.from,busy:d.busy,canUpgrade:f,onAdminRequest:()=>t({type:"TeamAction",action:{type:"Team/RequestAdminUpgradeRequested",reason:""}}),onClose:()=>t({type:"App/SubscriptionModalClosed"}),onUpgrade:e=>{let{creditAmount:n}=e;return t({type:"App/UpgradeSubscriptionClicked",creditAmount:n,product:d.product})},onSubscribe:e=>{let{creditAmount:n,planCode:a}=e;t({type:"App/PaymentInitialized",creditAmount:n,planCode:a})},plans:{monthly:e,yearly:n},subscription:p});case"premiumFeature":if(!p)return null;if(!(0,eu.V)(g))return s.createElement(es.D,{canUpgrade:f,onClose:()=>t({type:"PremiumModalClosed"}),onUpgrade:()=>t({type:"App/UpgradeIntended",from:"builder"}),missingFeatures:["premium-scraper"]});return s.createElement(ew.k,{onClose:()=>t({type:"PremiumModalClosed"}),intent:"moreFeatures"});case"thankYou":return u.extraCreditOnStoreReview?s.createElement(X,{onClose:()=>t({type:"App/ThankYouModalClosed"}),onGotoSettings:()=>a({type:"Modal/SettingsShown",tab:"billing"})}):s.createElement(e$,{onClose:()=>t({type:"App/ThankYouModalClosed"}),onGotoSettings:()=>a({type:"Modal/SettingsShown",tab:"billing"})})}})(),c?s.createElement(eG,{dispatch:t,state:c}):null,n.confettiCelebrationActive||I?.confetti?s.createElement(ez,null):null,s.createElement(ti.uA,{dispatch:i,state:n.pluginsState}),s.createElement(eX,{state:n.connection}),h?.debugClicks&&n.debugMsg.msg?s.createElement(tm,{key:String(n.debugMsg.i)},n.debugMsg.msg):null),$=n.tourFlowState&&I?s.createElement(eR.uA,{state:n.tourFlowState,step:I,dispatch:t}):null;return(s.useEffect(()=>{let e=e=>{e.metaKey&&"."===e.key&&a({type:"Modal/SettingsShown"})};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[a]),s.useEffect(()=>{let e=e=>{(0,T.sL)(e)||("ArrowLeft"===e.key&&F(e,"left"),"ArrowUp"===e.key&&F(e,"up"),"ArrowRight"===e.key&&F(e,"right"),"ArrowDown"===e.key&&F(e,"down"))};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[]),"rightClickMenu"===n.showReason.type)?s.createElement(tn,{dispatch:t,notificationsEl:C,sharedEl:P,state:n,trackClick:v}):s.createElement(eY.Y,{className:x.windowStyle,onKeyDown:e=>{"Escape"===e.key&&t({type:"App/EscapePressed"})},onMouseDown:S,"data-bardeen-dismiss":!0,id:"bardeen-popup"},s.createElement("div",{className:(0,o.A)(x.appWrapper,{busy:b,tour:!!I}),"data-bardeen-dismiss":!0,onClickCapture:v},(()=>{switch(n.view){case"builderV2":if(!n.builderV2State)return null;return s.createElement(eO.G,{"data-id-route":tx(n)},s.createElement(eF.JF,{suggestions:n.builderV2State.previousActions},s.createElement(q.uA,{onClose:k,dispatch:l,state:n.builderV2State,onMinimize:w,hasModalOpen:"None"!==n.modal.type||null!==n.overlayModal})),C,$);case"appWindow":return s.createElement(eO.G,{"data-id-route":tx(n)},s.createElement(B.uA,{activeModal:n.modal.type,playbooksState:n.playbooksState,state:n.appWindowState,createAutomationState:n.createAutomationState}),C,$)}})(),P))},tm=c.Ay.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: ${i.Tc2};
  color: ${i.vh3};
  padding: 0.5rem;
  font-size: 0.8rem;
  animation: ${e=>e.theme.fadeOut} 1.5s ease-in-out forwards;
`,tg=(0,l.A)({"@global":{html:{height:"100%"},body:{height:"100%",padding:"0 !important"},"#root":{height:"100%"},hr:{border:0,borderTop:`1px solid ${i.Tc2}`,margin:0}},appWrapper:{display:"grid",height:"100%",minHeight:"100vh",padding:32,width:"100%","&.busy *":{cursor:"wait !important"}},windowStyle:{position:"fixed",left:0,top:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.45)"}}),ty=e=>({type:"AppWindowAction",action:e}),tf=e=>({type:"ModalsAction",action:e}),th=e=>({type:"PlaybooksAction",action:e}),tb=e=>ty({type:"ResultsAction",action:e});function tx(e){let{view:t,appWindowState:n,modal:a}=e,r=[];r.push(t),"appWindow"===t&&r.push(n.explorerPageSelected);let i=r.join("/");return"None"!==a.type&&(i+=`?modal=${a.type}`),i}function tE(e){let t=e.showReason,n=e.view,r={...e},{settings:i}=e.config,l=[e3.CL(e=>({type:"App/FeatureFlagsFetched",flags:e})),...ts,e3.h2(e=>({type:"App/PaymentPlansSet",plans:e})),e3.RN(e=>({type:"App/ClickTrackingBlacklistFetched",regexps:e}))];if(b.j.isNotAsked(r.config.pluginsSummary)){let e={...r.config,pluginsSummary:b.j.Loading};r={...r,config:e},l.push(e3.zn(e=>({type:"App/PluginSummaryFetched",summary:e})))}if(i||l.push(e3.Uc(e=>({type:"App/SettingsFetched",settings:e}))),"appWindow"===n)(0,C.tM)(l,tv(e));else if("builderV2"===n){let t=e.builderV2State,n=t?.sequencingStatus,a=n?.type==="running"&&n;if(a){if(a.runRecordId&&e.builderV2State?.history[0]?.ast){let{executionId:t}=a;l.push((0,e6.Li)({ast:e.builderV2State?.history[0]?.ast,executionId:t,onData:e=>tP({type:"GotResults",result:e,executionId:t}),onDone:()=>tP({type:"PlaybookExecutionFinished",executionId:t,completeAnimation:!0}),onCancel:void 0,onError:e=>tP({type:"PlaybookSnapshotLoadFailed",executionId:t,error:e.toJSON()})}))}else(0,C.tM)(l,[async e=>{let{dispatch:t}=e;t(tP({type:"PlaybookPreviewCancelled",executionId:""}))}])}}return[r,[...l,async n=>{let{api:r,dispatch:l}=n;l({type:"App/AppConnectFlowFinished"});let o=e3.aA(e=>({type:"TeamAction",action:{type:"Team/Fetched",...e}}))(n);switch(t.type){case"createTeam":{let{isTeam:e}=await r.teamGetConfig();l({type:"App/CreateTeamDeeplinkOpened",hasTeam:e});break}case"system":case"user":i&&"Onboarding"!==e.modal.type&&!i.hasSeenOnboardingSlideshow&&l({type:"App/ModalShown",modal:J.Ge});break;case"showJoinTeam":await o;let{teamName:s,recipientEmail:c,invitationKey:d}=t,u=(await r.teamJoinChoices(d??void 0)).find(e=>e.name.replaceAll(" ","+")===s.replaceAll(" ","+"));l({type:"TeamAction",action:u?{type:"Team/JoinSpaceIntended",joinChoice:u,invitationKey:d}:{type:"Team/JoinSpaceWrongLinkDetected",intendedRecipient:c}});break;case"rightClickMenu":{if(!a.isRunning(e.localInteractionRunState))break;let t=e.localInteractionRunState.runRecordId,i=e.localInteractionRunState.executionId,l=await r.playbookEditor2_GetPlaybookAsUIAstFromRunRecord(t);if(!S.Q.isOk(l))break;await (0,e6.Li)({ast:l.value,executionId:i,onCancel:()=>({type:"App/LocalInteractionRunCancelled",executionId:i}),onError:e=>({type:"App/LocalInteractionRunError",executionId:i,message:g.sF.from(e).message,error:e}),onDone:()=>({type:"App/LocalInteractionRunDone",executionId:i}),onData:e=>{switch(e.type){case"runrecord":return{type:"App/LocalInteractionRunRecordCreated",executionId:i,runRecordId:e.runRecordId};case"progress":return{type:"App/LocalInteractionRunProgress",executionId:i,totalProgress:e.totalProgress};case"failed":return{type:"App/LocalInteractionRunFailed",executionId:i,error:e.error};default:return}}})(n)}}}]]}function tv(e){let t=[e3.nC(e=>ty({type:"AppWindow/PanelsFetched",panels:e})),e3.WU(e=>ty({type:"AppWindow/FoldersFetched",folders:e}))];return"results"===e.appWindowState.explorerPageSelected?t.push(e3.ad(U.Qz(e.appWindowState.resultsState.params),e=>{let{records:t,summary:n}=e;return tb({type:L.X.InitialDataFetched,records:t,summary:n})})):t.push(e3.EM(e=>({type:"App/HasRunRecordsFetched",hasRunRecords:e}))),t}let tC=(e,t)=>({...e,appWindowState:{...e.appWindowState,...t}}),tS=(e,t)=>tC(e,{resultsState:{...e.appWindowState.resultsState,...t}});function tk(e,t){let{settings:n}=e.config;if(!n)return[e,[]];let a=[e3.p5(t,e=>({type:"App/AccountSettingsUpdated",settings:e}))],r={...e.config,settings:{...n,...t}};return[{...e,config:r},a]}let tw=e=>{let t=e3.cb(2500,{type:"App/ConfettiDone"});return[{...e,confettiCelebrationActive:!0},[t]]},tA=e=>e.type.startsWith("TourFlow/"),tI=(e,t)=>{let n="team"===t.space?"team":"personal";return{...e,appWindowState:{...(0,z.O)(e.appWindowState),explorerPageSelected:n,explorerHighlightedPb:{id:t.id,legacyId:t.legacyId},automationsSelectedFolderId:null},playbooksState:(0,I.It)(e.playbooksState,t)}},tP=e=>({type:"BuilderV2Action",action:e}),t$=(0,A.zy)(tP),tT=(e,t)=>{let n=e.config.subscription,a=q.Ur(t),r=e.config.featureFlags.v4MiniEnabled&&t.ast&&(!n||!y.Zh(n,t.ast));return{...e,appWindowState:{...(0,z.O)(e.appWindowState)},builderV2State:a,config:{...e.config,failedAppConnection:null},modal:J.$h,overlayModal:r?{type:"premiumFeature"}:null,view:"builderV2",showReason:{type:"user"}}},tF=(e,t)=>async n=>{let{api:a,dispatch:r}=n,i=await a.playbookEditor2_GetPlaybookAsUIAstFromRunRecord(e.runRecordId);if(!S.Q.isOk(i))return r(t(i.error));r({type:"App/AstLoaded",ast:i.value,from:"results",resumeOptions:e})};function tR(e,t){return"results"!==e&&"autobook-start"!==t}let tM=e=>({...e,flags:{...e.flags,seen_howtorun:!0}});async function tO(e,t,n,a){let{plugins:r,statement:i}=await e.playbookEditor2_CreateFunctionCall((0,Y.Ui)(),"Scraper",n),l=Y.Vl({...(0,Y.Ui)(),plugins:r,statements:[{...i,args:i.args.map(e=>e.typeHint&&Y.oW(e.typeHint.signature)?{...e,value:{type:"ObjectStorageReferenceExpression",ref:{uri:`scraper_model/${t.id}/:auto`,rev:0},typeHint:e.typeHint??t_,needsPaidFeatures:t.premium?["premium-scraper"]:[]}}:e.typeHint&&Y.gU(e.typeHint.signature)&&a?{...e,value:{type:"ConstantValueExpression",value:k.N.fromURL(a).serialize()}}:e)}]}),o=await e.playbookEditor2_UpdatePlaybookCommandArgumentValue((0,Y.qO)(l),{cacheMaxAgeMs:0});return Y.Vl(o)}let t_={tag:w.E.Any,signature:[],typeLabel:"Unknown"}},11880:(e,t,n)=>{n.d(t,{Li:()=>s,YO:()=>u,go:()=>o,pb:()=>d,wO:()=>c});var a=n(36213),r=n(117);let i=new Set,l=e=>({onData:t=>i.has(e.executionId)?[!0,e.onData?.(t)]:[!1,e.onCancel?.()],onDone:()=>(i.delete(e.executionId),e.onDone?.()),onError:t=>(i.delete(e.executionId),e.onError?.(t))});function o(e){return async()=>{i.delete(e)}}function s(e){return i.add(e.executionId),(0,r.sf)("playbookEditor2_ExecResume",e.ast)(l(e))}function c(e){let{params:t,...n}=e;return i.add(n.executionId),(0,r.sf)("playbookEditor3_Preview",n.ast,t.targetIndex)(l(n))}function d(e){let{params:t,...n}=e,{targetIndex:a,defaultCacheBehavior:o,limitResults:s}=t;return i.add(n.executionId),(0,r.sf)("playbookEditor3_Run",n.ast,a,{enforcePremium:!0,storeResults:!0,statementIndexCacheBehavior:"targetCacheBehavior"in t?t.targetCacheBehavior:"default",defaultCacheBehavior:o,limitResults:s,statementIndexCacheIgnore:t.statementIndexCacheIgnore??[]})(l(n))}function u(e){return i.add(e.executionId),async t=>{let{api:n,dispatch:r}=t;try{await n.playbookEditor3_ActivateAutobook(e.ast),e.onDone&&r(e.onDone())}catch(t){e.onError&&r(e.onError(a.sF.from(t)))}finally{i.delete(e.executionId)}}}},32005:(e,t,n)=>{function a(e){return/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)}function r(){return`id-${Math.random()}`}function i(e){return new Date(e?.invitationLinkExpires||Date.now()).getTime()-new Date().getTime()<=0}function l(e){return Math.ceil((new Date(e?.invitationLinkExpires||Date.now()).getTime()-new Date().getTime())/864e5)}n.d(t,{$C:()=>r,B9:()=>a,Xj:()=>i,p5:()=>l})},89486:(e,t,n)=>{n.d(t,{Ff:()=>a.F,ue:()=>a.u});var a=n(87023);n(94949)},63400:(e,t,n)=>{n.d(t,{N:()=>a,V:()=>r});let a=e=>(e/100).toLocaleString(void 0,{currency:"USD",style:"currency",currencyDisplay:"narrowSymbol",minimumFractionDigits:0}),r=e=>e.some(e=>e.product?.startsWith("v3:")??!1)},57972:(e,t,n)=>{n.d(t,{n_:()=>c,pO:()=>o,ss:()=>s});var a=n(23882),r=n(36213),i=n(45742),l=n(19431);let o=(e,t)=>{let{subscription:n,featureFlags:{v4MiniEnabled:a}}=t,r=e.plugins.filter(e=>!e.displayHint?.enabled).map(i.JI),l=n?.activeSubscription?.features??[],o=[...e.plugins.flatMap(e=>e.needsPaidFeature),...a?[]:null!=e.trigger?["cloud-triggers"]:[],...e.meta.customPaidFeatures??[]].filter(e=>!l.includes(e));return r.length>0?{type:"MissingPlugins",plugins:r}:o.length>0?{type:"MissingFeatures",features:o}:{type:"None"}},s=(e,t,n)=>{switch(t.type){case"MissingPlugins":return{...e,builderV2State:e.builderV2State?{...e.builderV2State,missingPluginsModal:{runParams:n,plugins:t.plugins.map(e=>({...e,status:"disconnected",message:"Please connect your apps to continue"}))}}:e.builderV2State};case"MissingFeatures":return{...e,overlayModal:{type:"premiumFeature",missingFeatures:t.features}};case"OutOfCredits":return{...e,modal:{type:"OutOfCredits"}};case"None":return e}},c=(e,t)=>a.y.is(t)?{...e,modal:{type:"OutOfCredits"}}:{...e,notifications:[l.$.error(r.sF.from(t).toJSON()),...e.notifications]}},24114:(e,t,n)=>{n.d(t,{G:()=>d,T:()=>c});var a=n(85040),r=n(14041),i=n(39716),l=n(48143),o=n(39907);let s=i.Ay.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: grid;
`,c=i.Ay.div`
  align-self: center;
  animation: ${e=>{let{$noAnimation:t=o.env.CHROMATIC||!1}=e;return t?"":"appFadeIn 250ms"}};
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
`,d=e=>{let{children:t,...n}=e,{prefersFullHeight:a}=(0,l.rD)().settings??{};return u(),r.createElement(c,{...n,$prefersFullHeight:a},r.createElement(s,null,t))},u=(0,a.A)({"@global @keyframes appFadeIn":{"0%":{top:0,opacity:0,transform:"scale(1)"},"1%":{top:20,opacity:0,transform:"scale(0.9)"},"100%":{top:0,opacity:1,transform:"scale(1)"}}})},8869:(e,t,n)=>{n.d(t,{Y:()=>a.Y});var a=n(1970)},36674:(e,t,n)=>{n.d(t,{w:()=>u});var a=n(14041),r=n(39716),i=n(85211),l=n(12687),o=n(61069),s=n(40782),c=n(28926),d=n(82602);function u(e){let{status:t,onClickedRetry:n}=e,[r,u]=a.useState(!1),m=[i.I,l.Y,o.A].some(e=>e.is(t.error));a.useEffect(()=>{m&&!r&&(n(),u(!0))},[n,m,r]);let g=m?"Go to Login":t.error&&s.Y.is(t.error)?"Load Bardeen":"Retry";return a.createElement(d.p,{loading:!t.error,footer:t.error||t.isOverdue?a.createElement(c.$n,{icon:"RepeatBold",text:g,mode:"color",variant:"outlined",style:{color:"white"},onClick:n}):void 0,error:!m&&t.error||void 0,message:m?"Please log in to start Bardeen":t.error?"Failed to start Bardeen":t.isOverdue?"Starting Bardeen is taking longer than expected. This may be fine - e.g. if you're on a slow internet connection. If you're seeing this for a long time, please click 'Retry'.":a.createElement(p,null,a.createElement("div",null,`${t.tasksDone} / ${t.tasksTotal}`),a.createElement("div",null,t.message))})}let p=r.Ay.div`
  font-size: 16px;
  line-height: 1.8;
`},37504:(e,t,n)=>{n.d(t,{t:()=>i});var a=n(14041),r=n(28926);class i extends a.Component{static getDerivedStateFromError(e,t){return{hasError:!0,error:e,errorInfo:t}}render(){return this.state.hasError?a.createElement(r.BQ,{variant:"critical",style:{maxWidth:"100%"}},a.createElement("p",null,this.props.userMsg||"Sorry! Something went wrong."),this.props.recoverable?a.createElement(r.$n,{onClick:()=>this.setState({hasError:!1}),text:"Try again"}):null):this.props.children}constructor(...e){super(...e),this.state={hasError:!1,error:null,errorInfo:null}}}},87268:(e,t,n)=>{n.d(t,{J:()=>r});var a=n(14041);class r extends a.Component{constructor(e){super(e),this.state={hasError:!1},this.onError=e.onError}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){this.onError(e)}render(){return this.state.hasError?(this.setState({hasError:!1}),"error"):this.props.children}}},82602:(e,t,n)=>{n.d(t,{p:()=>d});var a=n(69670),r=n(78445),i=n(14041),l=n(39716),o=n(36213),s=n(98380),c=n(28926);let d=e=>{let{footer:t,loading:n,message:l,error:d,...m}=e,g=d?[...o.sF.errorChain(d)]:null;return i.createElement(u,{"data-bardeen-dismiss":!0,...m},i.createElement(p,null,n?i.createElement(c.y$,{color:a.ONy,size:"xl"},i.createElement(c.In,{icon:"BardeenLogoMonoNegative",size:60})):null,i.createElement("div",{className:"font-bold"},l),g?i.createElement(i.Fragment,null,g.map((e,t)=>i.createElement(r.m,{key:`error-block-${t}`,content:JSON.stringify(e.details,null,2)},i.createElement("span",null,i.createElement(c.BQ,{variant:"critical",round:!0,icon:"RadioExclamationOutline"},(0,s.u)(e)))))):null,t?i.createElement("div",{className:"mt-12"},t):null))},u=l.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${a.ONy};
  position: fixed;
  inset: 0;

  .mt-12 {
    margin-top: 12px;
  }

  .font-bold {
    font-weight: 600;
  }
`,p=l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  text-align: center;
  padding: 48px 64px;
  border-radius: 6px;
  background: #00000096;
  gap: 12px;
`},4974:(e,t,n)=>{n.d(t,{I:()=>r,w:()=>i});var a=n(36213);class r extends a.F_{static #e=this.nameTemplate="App:ContainerApiError";static #t=this.is=e=>a.F_.is(e,r.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,r.nameTemplate);constructor(e){super(r.nameTemplate,"Unhandled API error",e)}}class i extends a.F_{static #e=this.nameTemplate="App:ContainerReduceError";static #t=this.is=e=>a.F_.is(e,i.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,i.nameTemplate);constructor(e){super(i.nameTemplate,"Reducing actions failed",e)}}},32244:(e,t,n)=>{n.d(t,{Z:()=>eA,O:()=>ew});var a=n(69670),r=n(88098),i=n(14041),l=n(39716),o=n(117),s=n(64739),c=n(32021),d=n(15109),u=n(24679),p=n(46354),m=n(67139),g=n(74948),y=n(29859),f=n(58756);let h=(e,t,n)=>{let a=(0,i.useRef)(null),r=(0,i.useRef)(0),l=(0,i.useCallback)(()=>clearTimeout(r.current),[]),o=(0,i.useContext)(f.o),s=(0,i.useCallback)(()=>{n({type:"AppWindow/HighlightTimedOut"})},[n]);(0,i.useEffect)(()=>{let n=t.find(t=>t.legacyId===e?.legacyId)?.id,i=o.documentRoot.querySelector(`[data-book-id="pb-${e?.legacyId}"]`);n&&i&&a.current!==n&&(r.current=window.setTimeout(s,8e3),i.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"}),a.current=n)},[e,s,l,o.documentRoot,t])};var b=n(50278),x=n(48143),E=n(51134),v=n(28926),C=n(85148);function S(e){let{portalInsertionPoint:t}=(0,i.useContext)(f.o),{refs:n,floatingStyles:a,context:r,elements:l}=(0,C.we)({open:!0,onOpenChange:(t,n)=>{!t&&n&&("key"in n&&"keydown"===n.type&&"Escape"===n.key?e.onClose("escape"):e.onClose("back-drop"))},strategy:"fixed",placement:"top-start",middleware:[{name:"samePosition",fn:e=>{let{x:t,y:n,rects:a}=e;return{x:a.reference.x,y:a.reference.y}}}]}),o=(0,C.s9)(r,{outsidePress:!0,escapeKey:!0}),{getFloatingProps:s,getReferenceProps:c}=(0,C.bv)([o]);return(0,i.useLayoutEffect)(()=>{l.domReference&&l.domReference.scrollIntoView({behavior:"instant",block:"nearest"})},[l.domReference]),i.createElement(i.Fragment,null,i.isValidElement(e.placeholder)&&(0,i.cloneElement)(e.placeholder,c({ref:n.setReference,...e.placeholder.props||{}})),i.createElement(C.XF,{root:t},i.createElement(C.zR,null,i.createElement("div",s({ref:n.setFloating,style:{...a,width:n.reference.current?.getBoundingClientRect().width||"auto"}}),e.children))))}let k=i.memo(function(){let e=(0,x.jL)(),[t,n]=(0,i.useState)(""),a=i.createElement(i.Fragment,null,i.createElement(v.In,{icon:"TexturedSparkle",size:18}),i.createElement(I,{$visible:!t},"Tell AI what to automate"));return i.createElement(w,{onSubmit:a=>{a.preventDefault(),t.trim().length>0&&(e({type:"MagicBoxQuerySubmitted",value:t}),n(""))}},i.createElement(A,{size:"xl",addonBefore:a,onChange:n,value:t}))}),w=l.Ay.form`
  display: flex;
  flex-direction: column;
  background-color: ${a.NEG};
  border-radius: 100px;
  bottom: 64px;
  margin: auto auto 0 auto;
  max-width: 500px;
  padding: 4px 8px;
  position: sticky;
  width: 100%;
`,A=(0,l.Ay)(v.dN.Ghost)`
  color: ${a.ONy};
  flex: 1;
  input {
    caret-color: ${a.ONy};
    color: ${a.ONy};
  }
  ${v.kc} {
    --icon-color: ${a.MfC};
    color: transparent;
    background-color: ${a.CP};
  }
`,I=l.Ay.div`
  font-weight: 500;
  font-size: 16px;
  max-width: ${e=>e.$visible?"280px":0};
  margin-left: ${e=>e.$visible?0:"-20px"};
  opacity: ${e=>e.$visible?1:0};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
`;var P=n(19010),$=n(78445),T=n(96582),F=n(30393);let R=i.memo(e=>{let{author:t}=e;return i.createElement(M,null,i.createElement(O,null,i.createElement(v.eu,{size:32,src:t.avatar}),i.createElement(_,null,i.createElement(N,null,"Owner:"),i.createElement($.m,{content:t.name},i.createElement(B,null,t.name)))),i.createElement(D,{variant:"info",round:!0,icon:"RadioInfoBold"},"Only owners can make changes."))}),M=l.Ay.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,O=l.Ay.div`
  padding: 8px;
  display: flex;
  gap: 12px;
`,_=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,N=l.Ay.div`
  color: ${a.ui$};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.25px;
`,B=l.Ay.div`
  color: ${a.vh3};
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
`,D=(0,l.Ay)(v.BQ)`
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
`,H=i.memo(function(e){let{automationsFolders:t,selectedFolderId:n,pbId:a,source:r,children:l}=e,{personal:s,team:c}=t,{featureFlags:d,teamConfig:{isTeam:u}={isTeam:!1}}=(0,x.rD)(),p=d.v4MiniEnabled?"Agent":"Playbook",m=(0,x.jL)(),g=(0,o.i8)(m,"PlaybooksAction"),y="playbooks"===r?"TexturedPlaybookPointerLarge":"TexturedAutobookLightning",f=s.length>0||u;return i.createElement(v.ms,{autoCloseOnContentClick:!0,behavior:"flip-shift",placement:"right-start",width:304,renderContent:()=>i.createElement(v.VP,{gap:8},i.createElement(v.IU,{disabled:n===b.q8,key:b.q8,text:`My ${p}s`,icon:y,onClick:()=>{g({type:"Playbooks/MoveToFolderRequested",pbId:a,folderId:b.q8})}}),s.map(e=>i.createElement(v.IU,{disabled:n===e.id,key:e.id,text:e.display.name,icon:"FolderOutline",onClick:()=>{g({type:"Playbooks/MoveToFolderRequested",pbId:a,folderId:e.id})}})),u&&i.createElement(i.Fragment,null,i.createElement(v.rx,null),i.createElement(v.IU,{disabled:n===b.hY,key:b.hY,text:`Team ${p}s`,icon:y,onClick:()=>{g({type:"Playbooks/MoveToFolderRequested",pbId:a,folderId:b.hY})}}),c.map(e=>i.createElement(v.IU,{disabled:n===e.id,key:e.id,text:e.display.name,icon:"FolderOutline",onClick:()=>{g({type:"Playbooks/MoveToFolderRequested",pbId:a,folderId:e.id})}}))))},l({disabled:!f}))});var z=n(59750);let L=i.memo(function(e){let{pb:t,folders:n,selectedFolderId:a}=e,[r,l]=i.useState(!1),s=t.permissions,{id:c}=t,d=t.needsEditing??!1,u=(0,z.j)(),p=(0,o.i8)(u,"ModalsAction"),m=(0,o.i8)(u,"PlaybooksAction"),g=z.r().profile?.canExportPlaybooks??!1,y=()=>p({type:"Modal/PlaybookShared",id:c}),f=()=>p({type:"Modal/AddToRightClickMenuShown",mode:"addTriggerTo",pb:t}),h=()=>u({type:"App/RightClickTriggerUnchecked",id:c}),b=()=>u({type:"App/OpenPlaybookResultsClicked",pb:t}),x=()=>m({type:"Playbooks/ConfigurationResetRequested",pb:t}),E=()=>p({type:"Modal/PlaybookRenameShown",pb:t,mode:{type:"rename"}}),C=()=>p({type:"Modal/PlaybookRenameShown",pb:t,mode:{type:"duplicate"}}),S=()=>u({type:"App/PlaybookDeleteConfirmed",pb:t}),k=()=>u({type:"App/PlaybookDownloadClicked",id:c}),w=s.write&&!!t.argdef.length&&t.savedArgs.length>0;return i.createElement(v.ms,{isOpen:r,onIsOpenChanged:l,width:304,behavior:"shift",autoCloseOnContentClick:!0,renderContent:e=>{let{}=e;return i.createElement(i.Fragment,null,!s.write&&i.createElement(i.Fragment,null,i.createElement(R,{author:t.author}),i.createElement(v.rx,null)),d||t.isAutobook?null:t.localTriggers?.rightClickMenu?i.createElement(v.IU,{text:"Remove from Right Click Menu",onClick:h}):i.createElement(v.IU,{text:"Add to Right Click Menu",onClick:f}),s.share&&i.createElement(v.IU,{text:"Share",onClick:y}),i.createElement(v.IU,{text:"Results",onClick:b}),i.createElement(v.rx,null),w?i.createElement(v.IU,{text:"Reset All Inputs",onClick:x}):null,s.write&&i.createElement(v.IU,{text:"Rename",onClick:E}),i.createElement(v.IU,{onClick:C,text:"Duplicate"}),s.move&&i.createElement(H,{automationsFolders:n,selectedFolderId:a,pbId:t.id,source:"playbooks"},e=>{let{disabled:t}=e;return i.createElement(v.IU,{"data-no-autoclose":!0,disabled:t,text:"Move to folder",rightAddon:i.createElement(v.In,{icon:"ArrowRightOutline"})})}),s.delete&&i.createElement(v.IU,{text:"Delete",onClick:S}),g?i.createElement(i.Fragment,null,i.createElement(v.rx,null),i.createElement(v.IU,{text:"Download",onClick:k})):null)}},i.createElement(v.$n,{icon:"OverflowVerticalOutline",tooltipText:"More Options",tooltipPlacement:"top",variant:"flat",size:"l",round:!0}))}),{LeftContent:U,MainContent:V,RightContent:q,Title:j,Subtitle:W}=F.K,G=i.memo(function(e){let{pb:t,highlighted:n,folders:l,selectedFolderId:o,autoFocus:s}=e,c=!!t.saving,d=t.needsEditing??!1,u=t.triggerStatus?.status==="pending",{integrationIcons:p}=t,m=(0,x.jL)(),g=(0,x.TJ)(i.useMemo(()=>({Backspace:()=>m({type:"App/PlaybookDeleteConfirmed",pb:t}),Delete:()=>m({type:"App/PlaybookDeleteConfirmed",pb:t})}),[m,t])),y=t.id,f=!t.permissions.move,{attributes:h,listeners:b,setNodeRef:E}=(0,r.PM)({id:y,disabled:f}),{permissions:C}=t,S=(0,T.X7)(t.triggerStatus),k=t.triggerStatus?.triggerMessage??null,w=t.isAutobook?()=>m({type:"App/AutobookToggleClicked",pbId:t.id,from:"my"}):void 0;return i.createElement(F.K,{$disabled:c,$draggable:C.move,"aria-label":t.name,"data-book-id":`pb-${t.legacyId}`,className:n?"pseudo-active":void 0,onKeyDown:g},i.createElement($.m,{content:w?void 0:"This agent isn\u2019t set to run on a schedule"},i.createElement(U,{style:{cursor:w?"pointer":"default"},onClick:w},i.createElement(v.lM,{isPending:u,checked:S,label:"Schedule Agent",hideLabel:!0,size:"m",disabled:!t.isAutobook||d||!!t.saving||u}))),i.createElement(V,{...h,...b,autoFocus:s,onClick:()=>m({type:"App/PlaybookClicked",pbId:t.id,from:"my"}),addonRight:i.createElement(Q,{style:{marginLeft:"auto"}},p.map((e,t)=>{let{icon:n,name:a}=e;return i.createElement(J,{icon:n,size:"m",tooltipText:a,key:a+t})})),addonBelow:k?i.createElement(ee,{text:k.body,format:k.type}):null},i.createElement(v.fI,{gap:8,ref:E},Z(t.triggerStatus),t.cloudEnabled&&!d&&i.createElement($.m,{content:"Your Autobook will run in the cloud."},i.createElement(Y,null,i.createElement(v.In,{icon:"CloudOutline",color:a.wmS,style:{marginBottom:-1}}))),i.createElement(j,null,t.name),t.saving&&i.createElement(v.y$,{size:"s"})),i.createElement(W,null,d&&"Draft")),i.createElement(q,null,i.createElement(L,{pb:t,folders:l,selectedFolderId:o})))}),Y=l.Ay.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
`,Q=l.Ay.div`
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
`,J=(0,l.Ay)(v.z9)`
  border: none;
  box-shadow: none;
  border-radius: 100%;
  width: auto;
  height: auto;
`,Z=e=>e?.status==="failed"?i.createElement(X,null,"Failed: ",e?.error?.message??"No further details"):e?.disabledReason&&!K.includes(e.disabledReason)?i.createElement(X,null,i.createElement("div",null,"Deactivated: ",e?.disabledReason),e?.error?.message&&i.createElement("div",null,e.error.message)):void 0,X=e=>i.createElement($.m,{placement:"top",content:i.createElement("div",{"aria-describedby":"failed-tooltip"},e.children)},i.createElement(v.In,{id:"failed-tooltip",icon:"TriangularExclamationBold",color:a.eJD})),K=[T.Th,T.td,T._L],ee=e=>{let{text:t,format:n}=e,a=t.split("\n").filter(e=>e.trim()),r=a[0]||t,l=a.slice(1),o=l.length>0,s=e=>n?i.createElement(v.$f,{text:e,format:n}):e;if(!o)return i.createElement(et,{icon:"CodeOutline",variant:"info"},s(t));let c=l.join("\n");return i.createElement(et,{icon:"CodeOutline",variant:"info"},i.createElement(v.YE,{title:i.createElement("p",{style:{paddingLeft:"12px"}},r),caretPosition:"right"},i.createElement(en,null,s(c))))},et=(0,l.Ay)(v.BQ)``,en=l.Ay.div`
  padding: 8px 12px;
  background: inherit;
  border-radius: 0 0 8px 8px;
`;var ea=n(67331),er=n(60227),ei=n(40282);let el=n.p+"43114ecb5bbf7b1af249.png",eo=n.p+"e672cc3b52ab40acb06d.png";var es=n(23);let ec=i.memo(function(e){let t=e.filtersApplied?"No Playbooks found.":"Create a playbook to get started!";return i.createElement(ed,null,i.createElement(eu,null,i.createElement(ep,null,i.createElement(eg,null,t)),i.createElement(eE,{space:e.space}),i.createElement(ei.R,{space:e.space,empty:!0,hasDismissButton:!1})),i.createElement(ex,null))}),ed=l.Ay.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`,eu=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`,ep=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,em=l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`,eg=(0,l.Ay)(ea.H3)`
  text-align: center;
`,ey=l.Ay.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  color: ${a.wmS};
  flex-grow: 1;
`,ef=l.Ay.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  @media screen and (min-width: 884px) {
    flex-wrap: nowrap;
  }
`,eh=(0,l.Ay)(es.h)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.24s ease-in-out;
  flex: 1;

  align-items: center;
`,eb=l.Ay.div`
  padding: 8px;
`,ex=i.memo(()=>{let[e,t]=(0,i.useState)(!1),n=(0,x.jL)();return i.createElement(ef,null,i.createElement(eh,null,i.createElement(er.w,{active:!1}),i.createElement(ea.H3,{className:"content-headline"},"Scrape the web"),i.createElement(ey,null,"Extract data from the web using a pre-built Scraper Template or your own."),i.createElement(eb,null,i.createElement(v.$n,{onClick:()=>n({type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"scraper-templates"}}),text:"Explore scrapers",variant:"primary",round:!0,size:"xl"}))),i.createElement(eh,{onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1)},i.createElement(er.w,{active:e}),i.createElement(ea.H3,{className:"content-headline"},"Create from scratch"),i.createElement(ey,null,"Build fully customized playbooks. No code required."),i.createElement(eb,null,i.createElement(v.$n,{onClick:()=>n({type:"App/CreateClicked"}),text:"Start building",variant:"primary",round:!0,size:"xl"}))))}),eE=i.memo(e=>{let{space:t,autobook:n}=e;return"team"!==t?null:i.createElement(em,null,i.createElement("img",{src:n?el:eo}),i.createElement(ea.P,null,"Simply drag & drop your automation into the team space ",i.createElement("br",null),"to share it with everyone in your team."))});var ev=n(78126);let eC=i.memo(function(e){let{onCreate:t,filtersApplied:n}=e;return i.createElement(eS,{gap:24},i.createElement(v.VP,{gap:16,center:!0,style:{marginTop:64}},n?i.createElement(i.Fragment,null,i.createElement(ea.H3,{$color:a.t14},"No agents found"),i.createElement(ea.P,{$small:!0,$color:a.wmS},"Refine your search query or create a new agent that matches your criteria.")):i.createElement(i.Fragment,null,i.createElement(ea.H3,{$color:a.t14},"Empty Folder"),i.createElement(ea.P,{$small:!0,$color:a.wmS},"You can drag and drop agents from other folders here, or you can create a new agent."))),i.createElement(v.VP,{center:!0},i.createElement(v.$n,{onClick:t,text:"Create",icon:"PlusOutline",round:!0,variant:"primary",size:"l"})))}),eS=(0,l.Ay)(v.VP)`
  height: 100%;
  max-width: 660px;
  margin: auto;
`,ek=(0,l.Ay)(ev.f)`
  overflow-y: ${e=>{let{$overflow:t}=e;return t?"hidden":"auto"}};
`,ew=e=>({...e,automationsQuery:""}),eA=i.memo(function(e){let{dispatch:t,page:n,playbooksState:l,renderWarning:u,state:p,createAutomationState:m}=e,{featureFlags:y,teamConfig:f}=(0,x.rD)(),{v4MiniEnabled:C}=y,S=(0,x.jL)(),w=(0,o.i8)(S,"PlaybooksAction"),{personal:A,team:I,loading:$}=l,T=("personal"===n?A:I)??[],F=(0,b.aC)(n),R=C&&!f?.isTeam&&0===T.length&&"personal"===n&&0===p.automationsFolders.personal.length&&0===p.automationsFolders.team.length;h(p.explorerHighlightedPb,T,t);let M=i.useCallback(()=>w({type:"Playbooks/FetchMoreRequested"}),[w]);i.useEffect(()=>{let e=e=>{(0,E.sL)(e)||"c"!==e.key||e.metaKey||e.ctrlKey||S({type:"App/CreateClicked"})};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[S]);let O=!!p.automationsQuery,_=C?R?i.createElement(P.h,{state:m,onSelect:e=>{S({type:"App/CreateAgentSelectorClicked",option:e})}}):i.createElement(eC,{filtersApplied:O,onCreate:()=>S({type:"App/CreateClicked"})}):i.createElement(ec,{space:F,filtersApplied:O}),{withDndContext:N}=eP(),B=n.includes("team");return N(i.createElement(ek,{$gap:48,$marginTop:0,"data-tracking-context":"playbooks",$overflow:!!_,leftBar:i.createElement(eI,{selectedPage:n,createFolderState:p.createFolderState,folders:p.automationsFolders,selectedFolderId:p.automationsSelectedFolderId,style:{display:R?"none":"flex"},search:i.createElement(v.dN.Outline,{size:"l",addonBefore:i.createElement(v.In,{icon:"MagnifierOutline"}),onChange:e=>t({type:"AppWindow/ExplorerQueryUpdated",query:e}),value:p.automationsQuery,placeholder:"Search..."})}),bar:i.createElement(i.Fragment,null,i.createElement(c.H,{title:C?"Agents":"Playbooks",style:{display:R?"none":"flex"}},i.createElement(c.H.Divider,null),i.createElement(g.e,null,i.createElement(eR,{variant:"ghost",icon:"ArrowUpDownOutline",tooltipText:"Sorting",tooltipPlacement:B?"left":"bottom",round:!0})),i.createElement(c.H.Divider,null),i.createElement(v.$n,{onClick:()=>S({type:"App/CreateClicked"}),text:"Create",icon:"PlusOutline",round:!0,"data-tour-id":"create-playbook-btn",size:"l"})),u)},0===T.length?$?i.createElement(v.y$,{style:{placeSelf:"center",margin:"auto"},color:a.t14}):_:i.createElement(s.Y,{role:"list",dispatch:t,onLoadMore:M},T.map((e,t)=>i.createElement(G,{key:e.id,pb:e,highlighted:e.legacyId===p.explorerHighlightedPb?.legacyId,folders:p.automationsFolders,autoFocus:0===t,selectedFolderId:p.automationsSelectedFolderId||("team"===F?b.hY:b.q8)}))),!C&&i.createElement(k,null),i.createElement(r.Hd,{dropAnimation:null},i.createElement(d.W,null))))}),eI=e=>{let t=(0,x.jL)(),n=(0,o.i8)(t,"AppWindowAction"),a=e=>n({type:"AppWindow/ExplorerNavigated",page:e}),r=(e,t)=>{let{id:a}=e;return n({type:"AppWindow/ExplorerNavigated",page:t,folderId:a})},{selectedPage:l,createFolderState:s,selectedFolderId:c,folders:d,search:g}=e,f=(0,b.aC)(l),{teamConfig:h,featureFlags:E}=(0,x.rD)(),{id:C,name:k,isTeam:w}=h??{},A="personal"===f,I=E.v4MiniEnabled?"Agent":"Playbook",P="personal",$="team";return i.createElement(m.B,{"data-testid":"playbook-menu-sidebar",style:e.style},g,i.createElement(v.VP,{gap:4,style:{padding:"4px 0"}},i.createElement(m.B.Heading,{title:"Personal"},i.createElement(v.$n,{variant:"ghost",icon:"PlusOutline",tooltipText:"Create personal folder",round:!0,onClick:()=>n({type:"AppWindow/CreateFolderClicked",space:"personal"})})),i.createElement(u.g,{id:b.q8,key:b.q8,disabled:!c&&A,style:{outlineOffset:0}},i.createElement(v.IU,{active:A&&!c,onClick:()=>a(P),size:"s"},"My ",I,"s")),d.personal.map(e=>i.createElement(eF,{key:e.id,dropDisabled:c===e.id,folder:e,page:P,foldersToMove:d.personal},i.createElement(v.IU,{key:e.id,icon:"FolderOutline",active:c===e.id,onClick:()=>r(e,P),style:{paddingInlineEnd:32},size:"s"},e.display.name))),s&&"personal"===s.space&&i.createElement(S,{onClose:e=>{"escape"===e?n({type:"AppWindow/CreateFolderCancelled"}):n({type:"AppWindow/CreateFolderSubmitted"})},placeholder:i.createElement("div",{style:{height:"48px",width:"100%"}})},i.createElement(e$,{value:s.name,disabled:s.loading,onChange:e=>n({type:"AppWindow/CreateFolderNameChanged",name:e}),onSave:()=>n({type:"AppWindow/CreateFolderSubmitted"})}))),w&&C&&i.createElement(v.VP,{gap:4,style:{padding:"4px 0"}},i.createElement(m.B.Heading,{title:k??"Team"},i.createElement(y._,null),i.createElement(v.$n,{variant:"ghost",icon:"PlusOutline",tooltipText:"Create team folder",round:!0,onClick:()=>n({type:"AppWindow/CreateFolderClicked",space:"team"})})),i.createElement(u.g,{id:b.hY,key:b.hY,disabled:!c&&!A,style:{outlineOffset:0}},i.createElement(v.IU,{active:!A&&!c,onClick:()=>a($),size:"s"},"Team ",I,"s")),d.team.map(e=>i.createElement(eF,{key:e.id,dropDisabled:c===e.id,folder:e,page:$,foldersToMove:d.team},i.createElement(v.IU,{icon:"FolderOutline",active:c===e.id,onClick:()=>r(e,$),size:"s"},e.display.name))),s&&"team"===s.space&&i.createElement(S,{onClose:e=>{"escape"===e?n({type:"AppWindow/CreateFolderCancelled"}):n({type:"AppWindow/CreateFolderSubmitted"})},placeholder:i.createElement("div",{style:{height:"48px",width:"100%"}})},i.createElement(e$,{value:s.name,disabled:s.loading,onChange:e=>n({type:"AppWindow/CreateFolderNameChanged",name:e}),onSave:()=>n({type:"AppWindow/CreateFolderSubmitted"})}))),!1===w&&i.createElement(p.m,null))},eP=()=>{let e=(0,x.jL)(),t=(0,o.i8)(e,"PlaybooksAction"),n={distance:10,delay:250},a=(0,r.FR)((0,r.MS)(r.AN,{activationConstraint:n}),(0,r.MS)(r.cA,{activationConstraint:n}),(0,r.MS)(r.IG,{activationConstraint:n})),l=e=>{let n=e.over?.id,a=e.active.id;n&&a&&t({type:"Playbooks/MoveToFolderRequested",pbId:String(a),folderId:String(n)})};return{withDndContext:e=>i.createElement(r.Mp,{sensors:a,onDragEnd:l},e)}};function e$(e){let{value:t,onChange:n,onSave:r,disabled:l}=e,o=(0,i.useRef)(null);return(0,i.useEffect)(()=>{o.current&&o.current.focus()},[]),i.createElement(i.Fragment,null,i.createElement(v.IU,{icon:"FolderPlusOutline",style:{width:"100%",outlineColor:a.wB3},onClick:()=>{}},i.createElement("input",{placeholder:"Folder name...",disabled:l,style:{width:"100%",border:"none",outline:"none",background:"transparent"},ref:o,value:t,onChange:e=>n(e.target.value),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),e.stopPropagation(),r())}})))}let eT=(0,l.Ay)(v.$n).attrs({variant:"flat",round:!0})`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.24s ease-in-out;
`,eF=(0,l.Ay)(i.memo(function(e){let t=(0,x.rD)(),n=t.teamConfig?.isAdmin,a=(0,x.jL)(),{folder:r,dropDisabled:l,page:o,children:s,foldersToMove:c,...d}=e,p=n||r.owner===t.profile?.uuid;return i.createElement(u.g,{id:r.id,key:r.id,disabled:l,style:{outlineOffset:0}},i.createElement("div",d,s,p&&i.createElement(v.ms,{renderContent:e=>{let{}=e;return i.createElement(i.Fragment,null,i.createElement(v.IU,{onClick:()=>a({type:"ModalsAction",action:{type:"Modal/FolderRenameShown",folderId:r.id,currentName:r.display.name,automationsView:o}})},"Rename"),i.createElement(v.IU,{onClick:()=>a({type:"ModalsAction",action:{type:"Modal/FolderDeleteShown",folderId:r.id,moveToFolderId:null,foldersToMove:c,automationsView:o,strategy:n?"delete":"move"}})},"Delete"))}},i.createElement(eT,{icon:"OverflowVerticalOutline",tooltipText:"Folder options"}))))}))`
  position: relative;
  &:hover ${eT} {
    opacity: 1;
  }
`,eR=(0,l.Ay)(v.$n)`
  --icon-color: ${a.wmS};
  &:hover {
    --icon-color: ${a.wmS};
  }
`},39306:(e,t,n)=>{n.d(t,{uA:()=>X,Jf:()=>ei,ue:()=>Y,TS:()=>Z,Qz:()=>K});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(32021),s=n(1254),c=n(59750),d=n(93510),u=n(28926),p=n(85170),m=n(78126),g=n(78445);let y=e=>e?e.slice(0,2).toUpperCase():"T",f=e=>{let{selectedUser:t,onSelect:n,visibleTeams:a,visibleUsers:r}=e,[l,o]=(0,i.useState)(""),{profile:s}=(0,c.r)(),d=i.useCallback(e=>n?.(e),[n]),{title:p,src:m}=i.useMemo(()=>{if("user"===t.type&&t.id===s?.uuid)return{title:s.userName||s.email,src:s.profilePicture};if("team"===t.type)return{title:a.find(e=>e.folderId===t.folderId)?.title??"Team"};let e=r?.find(e=>e.id===t.id);return e?{title:e.name,src:e.picture}:{title:"Select user"}},[t,s,a,r]),f=i.useMemo(()=>r.reduce((e,n)=>(n.id===s?.uuid||(""===l||n.name.toLocaleLowerCase().includes(l.toLocaleLowerCase()))&&e.push({key:n.id,name:n.name,picture:n.picture,checked:"user"===t.type&&t.id===n.id,onSelect:()=>d({type:"user",id:n.id})}),e),[]),[d,l,t,r,s?.uuid]);return s&&(0!==a.length||0!==r.length)?i.createElement(u.ms,{width:320,renderHeader:()=>r.length>0?i.createElement(u.zZ,{placeholder:"Search",value:l,onChange:e=>o(e)}):null,renderContent:()=>i.createElement(i.Fragment,null,i.createElement(h,{name:s.userName||s.email||"You",picture:s.profilePicture,checked:"user"===t.type&&t.id===s.uuid,onSelect:()=>d({type:"user",id:s.uuid})}),a.map(e=>i.createElement(u.lm,{key:e.folderId,checked:"team"===t.type&&t.folderId===e.folderId,onClick:()=>d({type:"team",folderId:e.folderId})},i.createElement(u.fI,{gap:8,style:{flex:1,alignItems:"center"}},i.createElement(u.eu,{size:24,initials:y(e.title)}),i.createElement(g.m,{content:e.title},i.createElement(b,{className:"text"},e.title))))),r.length>0&&i.createElement(i.Fragment,null,i.createElement(u.rx,null),i.createElement(u.ke,null,"Team members"),f.length>0?f.map(e=>{let{key:t,...n}=e;return i.createElement(h,{key:t,...n})}):i.createElement(u.IU,{disabled:!0},"No team members found...")))},i.createElement(u.IU,{style:{width:"unset"},"aria-label":"team dropdown"},i.createElement(u.fI,{gap:8,style:{flex:1,alignItems:"center"}},i.createElement(u.eu,{size:24,src:m,initials:y(p)}),i.createElement(g.m,{content:p},i.createElement(b,{className:"text"},p)),i.createElement(u.In,{icon:"ArrowDownOutline"})))):null},h=i.memo(e=>i.createElement(u.lm,{checked:e.checked,onClick:e.onSelect},i.createElement(u.fI,{gap:8,style:{flex:1,alignItems:"center"}},i.createElement(u.eu,{size:24,src:e.picture,initials:y(e.name)}),i.createElement(g.m,{content:e.name},i.createElement(b,{className:"text"},e.name))))),b=(0,l.Ay)(a.P)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${r.vh3};
  flex: 1;
`;var x=n(43275),E=n(86920),v=n(50278),C=n(1265),S=n(8432),k=n(48603),w=n(30393);let{Title:A,LeftContent:I,Subtitle:P,MainContent:$,RightContent:T}=w.K,F=e=>{let{listing:t,dispatch:n,onVisible:a}=e,l=(0,c.j)(),{profile:o}=(0,c.r)(),s=i.useRef(null);(0,C.R)(s,()=>a(t.id));let{id:d}=t,p=t?.breakdown??[],m=Math.abs(t.microCredits??0)/1e3,y=!!t.isExpired,f=!t.isFinalized,h=t?.user,b=h?.id,E=function(){if(o?.uuid!==b)return"You can only see your own results.";if(!t.snapshotId)return"Preview no longer available: Result previews are stored for 30";if(!t.isFinalized){if(y)return"This execution was incomplete.";if(t.isAutobook)return"Still running. Waiting for results..."}return null}(),S=f?i.createElement(i.Fragment,null,i.createElement(_,null),i.createElement(O,{tooltipText:"Stop running",icon:"CrossOutline",onClick:()=>n({type:x.X.StopRunningClicked,id:d})})):t.hasErrors||y?i.createElement(g.m,{content:t.runErrors?.map(e=>e.message).join(", ")},i.createElement(R,{icon:"RadioExclamationBold",color:r.KE7,size:18})):t.isFinalized&&1===t.progress?i.createElement(u.In,{icon:"RadioCheckmarkBold",color:r.XxH,size:18}):null,k=h?.name??h?.email??"";return i.createElement(w.K,{"data-testid":"result-item",ref:s},i.createElement(B,null,S),i.createElement(g.m,{content:E},i.createElement($,{"aria-label":"Show in Studio",onClick:null===E?()=>l({type:"App/ShowInStudioClicked",runRecordId:d,isRunning:f}):void 0},i.createElement(u.VP,null,i.createElement(A,null,t.playbookTitle),i.createElement(P,null,k," \u2022 ",(0,v.Yq)(t.startDate))))),i.createElement(T,null,i.createElement(N,{breakdown:p,credits:m})))},R=(0,l.Ay)(u.In)`
  opacity: 1;
  transition: all 0.24s ease-in-out;
`,M=(0,l.AH)`
  transition: opacity 0.24s ease-in-out;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`,O=(0,l.Ay)(u.$n).attrs({variant:"flat",size:"m",round:!0})`
  ${M}
  opacity: 0;
`,_=(0,l.Ay)(u.y$).attrs({size:"m"})`
  ${M}
`,N=i.memo(function(e){let{breakdown:t,credits:n}=e;if(0===t.length)return null;let a=i.createElement("div",{style:{padding:20,backgroundColor:r.ONy,borderRadius:12}},i.createElement(k._,{actions:t.map((e,t)=>({number:String(t+1),title:e.title,icon:e.icon,outputs:e.unitsProduced,costMicroCredits:e.microcredits,cached:e.cached??!1}))}));return i.createElement(u.nt,{style:{backgroundColor:r.Btc},renderContent:()=>a},i.createElement(S.h,{credits:n,"aria-label":"Breakdown"}))}),B=(0,l.Ay)(I)`
  position: relative;
  &:hover {
    ${O} {
      opacity: 1;
    }
    ${_} {
      opacity: 0;
    }
  }
`,D=e=>{let{dispatch:t,records:n,recordDetails:l,isLoadingMore:o,maxRecords:s}=e,c=i.useRef(null),d=(0,i.useCallback)(()=>{t({type:x.X.ScrolledToBottom})},[t]);(0,E.J)(c,d);let p=z(n,e=>H(e.startDate));return i.createElement(u.VP,{style:{width:"100%",flexGrow:1},"aria-label":"results list"},Object.entries(p).map(e=>{let[n,o]=e;return i.createElement(i.Fragment,{key:n},i.createElement(a.P,{$small:!0,$color:r.wmS,style:{marginBlock:"32px 16px"}},n),i.createElement(u.VP,null,o.map(e=>{let n=l[e.id],{id:a}=e;return i.createElement(F,{key:a,listing:{...e,...n??{}},dispatch:t,onVisible:()=>t({type:x.X.RecordItemVisible,id:a})})})))}),o?i.createElement(u.fI,{center:!0,style:{padding:"16px 0"},"aria-label":"loading more results"},i.createElement(u.y$,{size:"s"})):null,n.length<s?i.createElement("div",{ref:c}):null)},H=e=>new Date(e).toLocaleString("en-US",{month:"long",year:"numeric"}),z=(e,t)=>{let n={};for(let a of e){let e=t(a);n[e]||(n[e]=[]),n[e].push(a)}return n},L=e=>{let{stats:t}=e;return i.createElement(U,null,t.map((e,n)=>i.createElement(i.Fragment,{key:e.label},i.createElement(u.VP,{gap:4,style:{width:"100%"},"aria-label":e.label},i.createElement(a.P,{$color:r.t14,$small:!0},e.label),i.createElement(V,{"data-testid":"counter"},e.value)),n!==t.length-1&&i.createElement(o.H.Divider,{$color:`${r.Q_2}A3`,style:{height:"100%"}}))))},U=l.Ay.div`
  display: flex;
  padding: 24px 32px;
  align-items: center;
  width: 100%;
  justify-content: stretch;
  gap: 32px;
  color: ${r.t14};
  background-color: ${r.KxS};
  border-radius: 12px;
  text-align: center;
`,V=(0,l.Ay)(a.H1).attrs({$small:!0,$color:r.t14})`
  line-height: 32px;
`,q=+Date.now(),j={"Last 30 days":q-2592e6,"Last 6 months":q-15552e6,"Last 12 months":q-31536e6,Overall:0},W=["errorOnly","successOnly"],G={errorOnly:"Error only",successOnly:"Success only"},Y=e=>({isLoading:!0,isLoadingMore:!1,records:[],recordDetails:{},summary:{totalRuns:0,totalTimeSaved:0,totalMicrocredits:0},params:{query:"",period:"Overall",filter:null,page:0,perPage:s.I,user:e?{type:"user",id:e}:{type:"team",folderId:":team"},playbook:null}}),Q=e=>({type:x.X.DataFetched,...e}),J=e=>({type:x.X.MoreDataFetched,...e});function Z(e,t,n){switch(e.type){case x.X.DataFetchRequested:return[{...t,isLoading:!0},[]];case x.X.DataFetched:{let{records:n,summary:a}=e;return[{...t,isLoading:!1,records:n,summary:a},[]]}case x.X.InitialDataFetched:{let{records:n,summary:a}=e;return[{...t,isLoading:!1,records:n,summary:a,params:{...t.params,page:0}},0===n.length?[async e=>{let{dispatch:t}=e;return t({type:x.X.UserChanged,value:{type:"team",folderId:":team"}})}]:[]]}case x.X.QueryChanged:let{query:a}=e;return[{...t,params:{...t.params,query:a}},[]];case x.X.RunRecordAborted:return[t,[d.ad(K(t.params),Q)]];case x.X.ScrolledToBottom:{let e=t.params.page+1;return[t={...t,isLoadingMore:!0,params:{...t.params,page:e}},[d.ad({...K(t.params),page:e},J)]]}case x.X.PeriodChanged:{let{period:n}=e;return[t={...t,isLoading:!0,params:{...t.params,period:n,page:0}},[ei(t)]]}case x.X.FilterChanged:{let{filter:n}=e;return[t={...t,isLoading:!0,params:{...t.params,filter:n,page:0}},[ei(t)]]}case x.X.MoreDataFetched:{let n=[...t.records,...e.records];return[{...t,records:n,isLoadingMore:!1},[]]}case x.X.UserChanged:{let n={...t,isLoading:!0,params:{...t.params,user:e.value,page:0}};return[n,[ei(n)]]}case x.X.FilterClearClicked:return[t={...t,isLoading:!0,params:{...t.params,filter:null}},[ei(t),async e=>{let{api:t}=e;return t.playbookEditor3_ClearPreviewState()}]];case x.X.ClearAllClicked:{let e={...t,isLoading:!0,params:{...Y(n?.uuid).params}};return[e,[ei(e)]]}case x.X.StopRunningClicked:{let{id:n}=e;return[t,[d.JH(n,()=>({type:x.X.RunRecordAborted,id:n}))]]}case x.X.ClearPlaybookFilterClicked:return[t={...t,isLoading:!0,params:{...t.params,playbook:null}},[ei(t)]];case x.X.RecordItemVisible:{let{id:n}=e;return[t,[d.BO(n,e=>({type:x.X.RecordDetailsFetched,id:n,record:e}))]]}case x.X.RecordDetailsFetched:{let{id:n,record:a}=e;return[{...t,recordDetails:{...t.recordDetails,[n]:a}},[]]}}}let X=(0,i.memo)(e=>{let{state:t,dispatch:n}=e,{recordDetails:r,records:l,params:s}=t,{teamConfig:d,featureFlags:p}=(0,c.r)(),{isAdmin:g,name:y="",members:h}=d||{},b=p.v4MiniEnabled?"Agent":"Playbook";return i.createElement(m.f,{$marginTop:16,"data-tracking-context":"results","data-testid":"results-screen",$maxWidth:816,$gap:0,bar:i.createElement(i.Fragment,null,i.createElement(o.H,{title:"Results"},s.playbook&&i.createElement(ec,{name:s.playbook.name,onClear:()=>n({type:x.X.ClearPlaybookFilterClicked})}),i.createElement("div",{style:{flexGrow:1}}),i.createElement(o.H.Divider,null),i.createElement(u.ms,{autoCloseOnContentClick:!0,renderContent:()=>i.createElement(i.Fragment,null,i.createElement(u.ke,null,"Time period"),es(j).map(e=>{let[t]=e;return i.createElement(u.lm,{key:t,text:t,onClick:()=>n({type:x.X.PeriodChanged,period:t}),checked:s.period===t})}))},i.createElement(u.$n,{"aria-label":"time period",icon:"ArrowDownOutline",text:s.period,iconPosition:"right",variant:"ghost"})),d?.isAdmin&&d.isTeam&&i.createElement(i.Fragment,null,i.createElement(o.H.Divider,null),i.createElement(f,{selectedUser:t.params.user,onSelect:e=>n({type:x.X.UserChanged,value:e}),visibleTeams:g?[{folderId:":team",title:y}]:el,visibleUsers:g&&h||eo})),i.createElement(o.H.Divider,null),i.createElement(u.ms,{"data-testid":"result-status",autoCloseOnContentClick:!0,renderContent:()=>i.createElement(i.Fragment,null,i.createElement(u.ke,null,"Show automation with..."),W.map(e=>i.createElement(u.lm,{key:e,text:G[e],onClick:()=>n({type:x.X.FilterChanged,filter:e}),checked:s.filter===e})),s.filter&&i.createElement(u.IU,{text:"Clear",onClick:()=>n({type:x.X.FilterClearClicked})}))},i.createElement(et,{active:null!==s.filter},i.createElement(u.$n,{icon:"FilterOutline",variant:"ghost",tooltipText:"Filters"})))))},t.isLoading?i.createElement(u.fI,{center:!0,style:{height:"100%"},"aria-label":"loading results"},i.createElement(u.y$,null)):0===l.length?i.createElement(u.fI,{center:!0,gap:16},i.createElement(en,null,i.createElement(a.H3,null,"No results available ",t.params.playbook?" for this "+b:""),ea(t)?i.createElement(i.Fragment,null,i.createElement(a.P,null,"Try changing the filter and/or time period."),i.createElement(u.$n,{variant:"outlined",round:!0,size:"xl",text:"Clear all",onClick:()=>n({type:x.X.ClearAllClicked})})):i.createElement(a.P,null,"Run a",p.v4MiniEnabled?"n":""," ",b," to see your results here."))):i.createElement(i.Fragment,null,i.createElement(L,{stats:[{label:`${b} runs`,value:t.summary.totalRuns.toString()},{label:"Credits used",value:er(t.summary.totalMicrocredits)}]}),i.createElement(D,{maxRecords:t.summary.totalRuns,records:l,recordDetails:r,dispatch:n,isLoadingMore:t.isLoadingMore})))}),K=e=>({fromDateTs:j[e.period],toDateTs:Date.now(),perPage:e.perPage,playbookRefId:e.playbook?(0,p.vY)(e.playbook.ref):void 0,page:0,userId:e.user?.type==="user"&&e.user.id||void 0,status:null==e.filter?void 0:"errorOnly"===e.filter?"error":"success",reason:["autobook-run","playbook-run"]}),ee=l.Ay.div`
  position: absolute;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  right: 1px;
  top: 1px;
  background-color: ${r.zIe};
`,et=(0,l.Ay)(e=>{let{children:t,...n}=e;return i.createElement("div",n,i.createElement(ee,null),t)})`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  ${ee} {
    display: ${e=>{let{active:t}=e;return t?"block":"none"}};
  }
`,en=(0,l.Ay)(u.VP)`
  padding: 32px 32px;
  background: ${r.KxS};
  border: 1px solid ${r.Q_2};
  border-radius: 12px;
  gap: 32px;
  position: relative;
  align-items: center;
  width: 100%;
`,ea=e=>null!=e.params.filter||"Overall"!==e.params.period||null!=e.params.playbook,er=e=>Math.floor(Math.abs(e)/1e3).toLocaleString(),ei=e=>d.ad(K(e.params),e=>{let{records:t,summary:n}=e;return{type:x.X.DataFetched,records:t,summary:n}}),el=[],eo=[],es=e=>Object.entries(e),ec=e=>{let{name:t,onClear:n}=e;return i.createElement(u.ab,{"aria-label":`Results for ${t}`,variant:"plum",size:"l",style:{borderRadius:"100px",paddingInlineStart:18,margin:"auto"}},i.createElement("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},t),i.createElement(u.$n,{icon:"CrossOutline",variant:"ghost",tooltipText:"Clear",onClick:n}))}},43275:(e,t,n)=>{n.d(t,{X:()=>a});var a=function(e){return e.DataFetchRequested="Results/DataFetchRequested",e.DataFetched="Results/DataFetched",e.InitialDataFetched="Results/InitialDataFetched",e.MoreDataFetched="Results/MoreDataFetched",e.QueryChanged="Results/QueryChanged",e.ScrolledToBottom="Results/ScrolledToBottom",e.PeriodChanged="Results/TimePeriodChanged",e.FilterChanged="Results/FilterChanged",e.FilterClearClicked="Results/FilterClearClicked",e.ClearAllClicked="Results/ClearAllClicked",e.UserChanged="Results/UserChanged",e.StopRunningClicked="Results/StopRunningClicked",e.RunRecordAborted="Results/RunRecordAborted",e.ClearPlaybookFilterClicked="Results/ClearPlaybookFilterClicked",e.RecordItemVisible="Results/RecordItemVisible",e.RecordDetailsFetched="Results/RecordDetailsFetched",e}({})},68919:(e,t,n)=>{n.d(t,{i:()=>c});var a=n(78445),r=n(14041),i=n(48143),l=n(53747),o=n(28926),s=n(30393);let c=r.memo(function(e){let{templates:t,actions:n,addonAfter:a,onClick:i}=e,[l,s]=r.useState(10),c=r.useRef(null);return r.useEffect(()=>{let e=new IntersectionObserver(e=>{e[0]?.isIntersecting&&s(l+10)});return c.current&&e.observe(c.current),()=>e.disconnect()},[t,l]),r.createElement(r.Fragment,null,r.createElement(o.VP,null,t.slice(0,l).map(e=>{let t=e.id+e.title;return r.createElement(y,{key:t,template:e,actions:n,onClick:i})}),a),r.createElement("div",{ref:c}))}),{Title:d,LeftContent:u,Subtitle:p,MainContent:m,RightContent:g}=s.K,y=r.memo(function(e){let{template:t,actions:n,onClick:c,...y}=e,{ref:f,showTooltip:h}=(0,l.Q)(),{id:b,title:x,icon:E,goal:v,premium:C}=t,S=(0,i.jL)(),k=r.createElement(d,{ref:f},x);return r.createElement(s.K,y,r.createElement(u,null,E&&r.createElement(o.In,{icon:E,size:20})),r.createElement(m,{onClick:()=>c?c(t):S({type:"ScraperTemplateClicked",template:t}),addonRight:C&&r.createElement(o.R,null)},h?r.createElement(a.m,{content:x,placement:"bottom-start",delay:300},k):k,v&&r.createElement(p,null,v)),n&&r.createElement(g,null,r.createElement(o.ms,{autoCloseOnContentClick:!0,renderContent:()=>n(b)},r.createElement(o.$n,{icon:"OverflowVerticalOutline",size:"l",variant:"flat",round:!0,tooltipText:"More Options","aria-label":`More Options - ${x}`}))))})},86477:(e,t,n)=>{n.d(t,{M:()=>x,u:()=>v});var a=n(69670),r=n(14041),i=n(39716),l=n(91159),o=n(15490),s=n(32021),c=n(67139),d=n(48143),u=n(28926),p=n(30393),m=n(78126);let g=(0,i.Ay)(u.VP)`
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 24px;
`,y=i.Ay.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #666;
`,f=r.memo(function(e){let{query:t,dispatch:n}=e,i=(0,d.jL)();return r.createElement(g,null,r.createElement(y,null,r.createElement(u.In,{icon:"ScraperFileBold",color:a.b_I})),r.createElement(u.VP,{gap:8},r.createElement(u.EY,{variant:"intermediate-large"},""!==t?`No scraper templates found for "${t}"`:"No scraper templates yet"),r.createElement(u.EY,{variant:"body"},"Create your first scraper template to get started")),""===t?r.createElement(u.$n,{round:!0,text:"Create Template",icon:"PlusOutline",onClick:()=>i({type:"Scrapers/CreateClicked",forUrl:null}),size:"l"}):r.createElement(u.$n,{round:!0,text:"Clear Search",icon:"CrossOutline",onClick:()=>n({type:"Scrapers/SearchCleared"}),size:"l"}))});var h=n(68919);let b=(0,i.Ay)(m.f)`
  .innerContent {
    padding: 24px;
  }
`,x=r.memo(function(e){let{state:t,dispatch:n}=e,{query:i,view:m,site:g,personal:y,catalog:x}=t,v=(0,d.rD)().featureFlags.devTools,S=0===y.length?"catalog":m,k=(0,d.jL)(),w=r.createElement(u.dN.Outline,{size:"l",addonBefore:r.createElement(u.In,{icon:"MagnifierOutline"}),onChange:e=>n({type:"Scrapers/QueryUpdated",query:e}),value:i,placeholder:"Search..."}),A=e=>n({type:"Scrapers/ViewChanged",view:e}),I=e=>e.toLowerCase().match(i.toLowerCase()),P=e=>e?.filter(e=>e.site?.domain.match(g?.toLowerCase())).filter(e=>I(e.title)||I(e.goal)),$=P(y.slice(0,"catalog"===S?3:void 0)??[]),T=P(x??[]),F=r.useMemo(()=>("catalog"===S?x??[]:y).map(e=>e.site).filter((e,t,n)=>e.domain&&t===n.findIndex(t=>t.domain===e.domain)).toSorted((e,t)=>e.domain.localeCompare(t.domain)),[S,y,x]),R=r.useCallback(e=>k({type:"Scrapers/DownloadClicked",id:e}),[k]),M=r.useCallback(e=>{let t=async()=>k({type:"Scrapers/DeleteClicked",id:e}),n=async()=>k({type:"Scrapers/DuplicateClicked",id:e});return r.createElement(r.Fragment,null,r.createElement(u.IU,{text:"Edit",onClick:()=>k({type:"Scrapers/EditClicked",id:e})}),r.createElement(u.IU,{text:"Duplicate",onClick:n}),r.createElement(u.IU,{text:"Delete",onClick:t}),v&&r.createElement(u.IU,{text:"Download",onClick:()=>R(e)}))},[R,v,k]),O=r.useCallback(e=>{let t=async()=>k({type:"Scrapers/DuplicateClicked",id:e});return r.createElement(r.Fragment,null,r.createElement(u.IU,{text:"Duplicate to My Templates",onClick:t}),v&&r.createElement(u.IU,{text:"Download",onClick:()=>R(e)}))},[R,v,k]);return r.createElement(b,{$gap:16,$marginTop:8,"data-tracking-context":"scraper-templates",leftBar:r.createElement(c.B,null,w,r.createElement(u.VP,{gap:4,style:{padding:"4px 0"}},r.createElement(u.IU,{size:"s",onClick:()=>A("catalog"),active:"catalog"===S},"Catalog"),r.createElement(u.IU,{size:"s",onClick:()=>A("my-templates"),active:"my-templates"===S,disabled:0===y.length},"My Templates")),r.createElement(E,{style:{margin:"-4px 0 4px 0"}}),F.length>0&&r.createElement(u.VP,{gap:4,style:{padding:"4px 0",minHeight:200}},r.createElement(c.B.Heading,{title:"Sites"}),r.createElement(u.mH,{style:{minHeight:200}},F.map(e=>{let{domain:t,icon:i}=e;return r.createElement(u.IU,{key:t,size:"s",active:t===g,onClick:()=>n({type:"Scrapers/FilterChanged",site:g===t?"":t}),icon:i,rightAddon:t===g?r.createElement(o.J,{fill:a.ydb}):null},(0,l.ZH)(t))})))),bar:r.createElement(s.H,{title:"Scraper Templates"},g&&r.createElement(u.$n,{variant:"outlined",round:!0,size:"s",icon:"CrossOutline",iconPosition:"right",text:(0,l.ZH)(g),onClick:()=>n({type:"Scrapers/FilterChanged",site:""})}),r.createElement(s.H.Divider,null),r.createElement(u.$n,{onClick:()=>k({type:"Scrapers/CreateClicked",forUrl:null}),text:"Create Template",icon:"PlusOutline",round:!0,size:"l"}))},0==[...$,...T].length?null===x?r.createElement(u.y$,{style:{margin:"auto"}}):r.createElement(f,{query:i,dispatch:n}):r.createElement(r.Fragment,null,$.length>0&&r.createElement(r.Fragment,null,r.createElement(C,null,"My Templates"),r.createElement(u.VP,{style:{marginBottom:16}},r.createElement(h.i,{key:$.length,templates:$,actions:M,addonAfter:"catalog"===S&&y.length>3&&r.createElement(p.K.Button,{onClick:()=>A("my-templates")},"View All")}))),"catalog"===S&&r.createElement(r.Fragment,null,r.createElement(C,null,"Catalog Templates"),r.createElement(h.i,{key:T.length,templates:T,actions:O}))))}),E=i.Ay.hr`
  border: none;
  border-bottom: ${a.Tc2} 1px solid;
  margin: 0;
`,v={personal:[],catalog:null,catalogLastFetchedAt:0,loading:!1,query:"",view:"my-templates",site:""},C=i.Ay.div`
  color: ${a.vh3};
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.1px;
`},60227:(e,t,n)=>{n.d(t,{w:()=>o});var a=n(69670),r=n(14041),i=n(39716),l=n(28926);let o=e=>{let{active:t,...n}=e;return r.createElement(s,n,r.createElement(m,{$active:t},r.createElement(l.In,{icon:"PlusOutline",size:16})),r.createElement(g,{$active:t},r.createElement(l.In,{icon:"PlusOutline",size:16})),r.createElement(d,{$active:t},r.createElement(l.In,{icon:"TexturedAutobookLightningPurple",size:24})),r.createElement(u,null))},s=i.Ay.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
`,c=i.Ay.div`
  transition: all 0.24s ease-in-out;
  background: linear-gradient(180deg, ${a.ONy} 0%, ${a.hi1} 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
`,d=(0,i.Ay)(c)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;

  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      transform: scale(1.15);
    `}}
`,u=i.Ay.div`
  position: absolute;
  bottom: 0;
  width: 80px;
  height: 10px;
  flex-shrink: 0;
  background: radial-gradient(50% 50% at 50% 50%, ${a.l0o} 0%, rgba(222, 225, 230, 0) 100%);
  opacity: 0.24;
`,p=i.Ay.div`
  color: ${a.ONy};
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
`,m=(0,i.Ay)(p)`
  background: linear-gradient(180deg, ${a.CqR} 0%, ${a.iTR} 100%);
  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      transform: translateX(-68px);
      opacity: 1;
    `}}

  &:after {
    position: absolute;
    right: -100%;
    width: 100%;
    height: 1px;
    background-color: ${a.MfC};
    content: "";
  }
`,g=(0,i.Ay)(p)`
  background: linear-gradient(180deg, ${a.wB3} 0%, ${a.t14} 100%);

  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      transform: translateX(44px);
      opacity: 1;
    `}}
  &:before {
    position: absolute;
    left: -100%;
    width: 100%;
    height: 1px;
    background-color: ${a.MfC};
    content: "";
  }
`},40282:(e,t,n)=>{n.d(t,{R:()=>p});var a=n(67331),r=n(69670),i=n(14041),l=n(39716);let o=n.p+"845affe823e69c58dffd.png";var s=n(48143),c=n(28926);let d={playbooks:{personal:{empty:{title:"What are Playbooks?",description:'Playbooks are one-time automations - like, "summarize this email for me".'},notEmpty:{title:"Manage your Playbooks",description:"Explore your automations here, or create a new one. Any new Playbooks will show up here."}},team:{empty:{title:"What are Playbooks?",description:"Explore your team automations here, or create a new one. Any new Playbooks will show up here."},notEmpty:{title:"Manage your team Playbooks",description:"Explore your team automations here, or create a new one. Any new team Playbooks will show up here."}}}},u={playbooks:{personal:{empty:{title:"What are Agents?",description:'Agents are one-time automations - like, "summarize this email for me".'},notEmpty:{title:"Manage your Agents",description:"Explore your automations here, or create a new one. Any new Agents will show up here."}},team:{empty:{title:"What are Agents?",description:"Explore your team automations here, or create a new one. Any new Agents will show up here."},notEmpty:{title:"Manage your team Agents",description:"Explore your team automations here, or create a new one. Any new team Agents will show up here."}}}},p=e=>{let{hasDismissButton:t,empty:n,space:l}=e,{title:p,description:y}=(0,s.rD)().featureFlags.v4MiniEnabled?u.playbooks[l][n?"empty":"notEmpty"]:d.playbooks[l][n?"empty":"notEmpty"],f=(0,s.jL)();return i.createElement(m,null,t&&i.createElement(g,{onClick:()=>f({type:"App/InfoboxDismissed"})}),i.createElement("img",{src:o,alt:"Playbooks icon",style:{width:64,height:64,marginLeft:8}}),i.createElement(c.VP,{style:{justifyContent:"center"},gap:4},i.createElement(a.H4,{style:{color:r.t14}},p),i.createElement(a.P,null,y)))},m=l.Ay.div`
  padding: 32px 32px;
  background: ${r.KxS};
  border: 1px solid ${r.Q_2};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  position: relative;
  align-items: center;
  width: 100%;
`,g=(0,l.Ay)(c.Jn)`
  position: absolute;
  top: 16px;
  right: 16px;
`},64739:(e,t,n)=>{n.d(t,{Y:()=>o});var a=n(88098),r=n(14041),i=n(39716),l=n(48143);let o=e=>{let{dispatch:t,onLoadMore:n,children:i,...o}=e,c=(0,r.useRef)(null),{active:d}=(0,a.fF)();return(0,l.Jm)(c,n),r.createElement(r.Fragment,null,r.createElement(s,{...o,$isDragging:!!d},i),r.createElement("div",{ref:c})," ")},s=i.Ay.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.3s ease;
  ${e=>{let{$isDragging:t}=e;return t?(0,i.AH)`
          filter: blur(2px);
          opacity: 0.7;
        `:""}}
`},35549:(e,t,n)=>{n.d(t,{Y:()=>b,_:()=>f});var a=n(67331),r=n(69670),i=n(85148),l=n(26584),o=n(14041),s=n(39716),c=n(49861),d=n(12787),u=n(48143),p=n(28926),m=n(4241),g=n(72352);let y=e=>{if(!e)return{credits:1e3,creditsLeft:1e3};let t=e.microCreditsBreakdown,n=t.available_bulk+t.available_manual,a=Math.max(0,n-(t.used_bulk+t.used_manual)),r=t.available_free+t.available_pro+t.available_team+(t.available_enterprise??0),i=Math.max(0,r-t.used_subscription);return{credits:r+n,creditsLeft:i+a}},f=o.memo(e=>{let[t,n]=o.useState(!1),{refs:a,floatingStyles:r,context:s}=(0,i.we)({open:t,onOpenChange:n,placement:"right-start",middleware:[(0,l.cY)(8),(0,l.UU)()]}),{isMounted:c,styles:d}=(0,i.DL)(s,{duration:300}),u=(0,i.Mk)(s,{handleClose:(0,i.iB)({requireIntent:!1})}),{getReferenceProps:p,getFloatingProps:m}=(0,i.bv)([u]);return o.createElement(o.Fragment,null,(c||t)&&o.createElement(i.XF,null,o.createElement("div",{style:{...r,...d,width:300},...m(),ref:a.setFloating},o.createElement(h,{onUpgrade:()=>{e.onUpgrade(),n(!1)},onGotoOpenInvoice:e.onGotoOpenInvoice,onGotoPaymentPortal:e.onGotoPaymentPortal}))),o.createElement("div",{style:{display:"flex",placeItems:"center",width:"100%"},ref:a.setReference,...p(),"data-testid":"credit-widget"},o.createElement(C,null)))}),h=o.memo(e=>{let{teamConfig:t,subscription:n}=(0,u.rD)();if(!n)return null;let r=c.HJ(n),i=t?.isTeam??!1,l=(0,m.He)(r,i),s=c.TB(n),d=`${l} Plan${s?" Trial":""}`,{credits:g,creditsLeft:f}=y(n),h=c.HT(n)||c.TB(n);return o.createElement(P,null,o.createElement(w,null,o.createElement(a.H1,{style:{fontSize:"18px",lineHeight:"28px"}},d)),o.createElement(E,{percent:100/g*f}),o.createElement(w,{style:{marginTop:"24px"}},o.createElement(p.fI,{style:{justifyContent:"space-between"}},o.createElement(a.P,{$small:!0},"Credits left:"),o.createElement(a.P,{$small:!0},(0,m.IO)(f)," / ",(0,m.IO)(g))),h&&o.createElement(o.Fragment,null,o.createElement(A,null),o.createElement(p.fI,{style:{justifyContent:"space-between"}},o.createElement(a.P,{$small:!0},"You will be charged in:"),o.createElement(a.P,{$small:!0},n.endsIn.replace("-"," ")))),o.createElement(b,null),o.createElement(x,{sub:n,onGotoPaymentPortal:e.onGotoPaymentPortal,onGotoOpenInvoice:e.onGotoOpenInvoice,onUpgrade:e.onUpgrade})))}),b=o.memo(()=>{let{subscription:e}=(0,u.rD)(),{activeSubscription:t}=e??{},{product:n="invalid",startDate:a,credits:r=0}=t?.schedule??{},i=o.useMemo(()=>{switch(n){case"v3:basic":return d.nj.BASIC;case"v3:premium":return d.nj.PREMIUM;case"v3:enterprise":return d.nj.ENTERPRISE;default:return null}},[n]);return e&&i?o.createElement(I,{variant:"info",style:{textAlign:"center"}},"Your subscription will change to ",o.createElement("strong",null,i.meta.title)," with",o.createElement("strong",null,"+",r)," credits on ",new Date(a??"").toLocaleDateString(),"."):null}),x=o.memo(e=>{let{sub:t}=e,{teamConfig:n}=(0,u.rD)(),a=n?.isTeam??!1,r=(0,u.op)(),i=u.rD().teamConfig?.canManagePayment,l=!a||a&&!!n?.isAdmin;switch(r){case null:return l?o.createElement(p.fI,{center:!0,style:{marginTop:"24px"}},o.createElement(p.$n,{size:"l",round:!0,variant:"primary",onClick:e.onUpgrade,text:"Change Plan"})):null;case"blocked":return o.createElement(I,{variant:"critical"},"Your subscription has been temporarily paused due to a payment issue."," ",i?o.createElement(o.Fragment,null,"To resume full access, please"," ",o.createElement("a",{onClick:e.onGotoPaymentPortal},"update your payment details")," and settle any outstanding invoices."):o.createElement(o.Fragment,null,"Please contact your team administrator to resolve this payment issue."));case"payment-issues":return o.createElement(I,{variant:"critical"},"We couldn't process your recent payment and your subscription"," ",o.createElement("strong",null,"will be paused in ",t.activeSubscription?.gracePeriod?.daysRemaining," days")," ","if not resolved."," ",i?o.createElement(o.Fragment,null,"Please ",o.createElement("a",{onClick:e.onGotoPaymentPortal},"update your payment method")," to continue using your account."):o.createElement(o.Fragment,null,"Please contact your team administrator to resolve this payment issue."));case"payment-open-invoice":return o.createElement(I,{variant:"warning"},"You have an open invoice."," ",i?o.createElement(o.Fragment,null,"Please ",o.createElement("a",{onClick:e.onGotoOpenInvoice},"go to the payment portal")," to settle it."):o.createElement(o.Fragment,null,"Please contact your team administrator to settle it."));case"trial-contact-sales":return o.createElement(p.fI,{center:!0,style:{marginTop:"24px"}},o.createElement(p.$n,{size:"l",round:!0,variant:"primary",href:"mailto:sales@bardeen.ai?subject=Activate Plan&body=Please send me a quote for the plan that I am trialing.",text:"Contact Sales to Activate"}));case"trial-ending":return o.createElement(I,{variant:"info"},"Your subscription is starting soon!");case"credits-exhausted":case"credits-low":return o.createElement(p.fI,{center:!0,style:{marginTop:"24px"}},o.createElement(p.$n,{size:"l",round:!0,variant:"primary",onClick:e.onUpgrade,text:"Explore Plans"}))}}),E=o.memo(e=>o.createElement(p.fI,{style:{width:"100%",backgroundColor:r.hi1,border:`1px solid ${r.Tc2}`,borderRadius:"80px",height:"12px",padding:"4px",marginTop:"16px"}},o.createElement("div",{style:{height:"4px",width:`${e.percent}%`,backgroundColor:e.percent<=25?r.KE7:r.XxH,borderRadius:"100px"}}))),v=e=>25*Math.ceil(e/25),C=o.memo(()=>{let{subscription:e}=(0,u.rD)(),{credits:t,creditsLeft:n}=y(e),a=v(100/t*n),i=!!(0,u.op)();return o.createElement(S,null,o.createElement(k,{$percent:a}),i&&o.createElement(g.g,{$color:r.CCs}))}),S=s.Ay.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;

  width: 24px;
  height: 10px;

  padding: 2px;
  border-radius: 80px;
  border: 1px solid ${r.wdA};
`,k=s.Ay.div`
  width: ${e=>{let{$percent:t}=e;return`${t}%`}};
  background-color: ${e=>{let{$percent:t}=e;return t<=25?r.KE7:r.TJO}};
  border-radius: 100px;
  height: 100%;
`,w=s.Ay.div`
  padding: 0 4px;
`,A=s.Ay.hr`
  border: 0;
  border-top: 1px solid ${r.Tc2};
  margin: 8px 0;
`,I=(0,s.Ay)(p.BQ)`
  margin-top: 24px;
`,P=s.Ay.div`
  padding: 20px 24px 32px 24px;
  margin-top: -10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`},15109:(e,t,n)=>{n.d(t,{W:()=>l});var a=n(88098),r=n(14041),i=n(39716);let l=()=>{let{activeNode:e}=(0,a.fF)(),t=(0,r.useRef)(null),[n,i]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{let n=t.current;return e&&n instanceof HTMLDivElement?(n.innerHTML=e.innerHTML,i(!0),()=>{n instanceof HTMLDivElement&&(n.innerHTML="",i(!1))}):()=>i(!1)},[t,e,i]),e)?r.createElement(o,{$isActive:n},r.createElement(s,{ref:t})):null},o=i.Ay.div`
  position: absolute;
  inset: 0;
  opacity: 0.9;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  transform: 1;
  transition: 0.3s ease all;
  cursor: move;

  ${e=>{let{$isActive:t}=e;return t&&"transform: scale(0.8);"}}
`,s=i.Ay.div`
  pointer-events: none;
`},50695:(e,t,n)=>{n.d(t,{u:()=>o});var a=n(69670),r=n(14041),i=n(39716),l=n(28926);let o=e=>{let{data:{active:t,content:n},onDismiss:i}=e;return t?r.createElement(l.Qn,{variant:"info","aria-label":"Information banner",icon:"RadioInfoBold",style:{alignItems:"center"},rightAddon:r.createElement(c,{role:"button","aria-label":"Close information banner",icon:"CrossOutline",color:a.IVJ,size:16,style:{cursor:"pointer",alignSelf:"center"},onClick:i})},n.map((e,t)=>{switch(e.type){case"text":return r.createElement(r.Fragment,{key:t},e.text);case"line-break":return r.createElement("br",{key:t});case"link":return r.createElement(s,{href:e.href,target:"_blank",key:t},e.text)}})):null},s=i.Ay.a`
  transition: all 0.24s ease-in-out;
  font-weight: 600;
  color: ${a.wmS};
  &:hover {
    color: ${a.t14};
  }
`,c=(0,i.Ay)(l.In)`
  :hover {
    --icon-color: 1.2;
  }
`},40364:(e,t,n)=>{n.d(t,{T:()=>v});var a=n(69670),r=n(78445),i=n(54357),l=n(14041),o=n(39716),s=n(84737),c=n(99834),d=n(117),u=n(48143),p=n(28926),m=n(72352),g=n(35549);let y=l.memo(function(e){return"invitation"===e.type?l.createElement(f,e):null}),f=l.memo(function(e){let{choice:t}=e,[n,a]=l.useState(!1),r=(0,u.jL)(),i=(0,d.i8)(r,"TeamAction"),o=l.useCallback(()=>{i({type:"Team/JoinSpaceIntended",joinChoice:t,invitationKey:null})},[t,i]),s=l.useCallback(()=>i({type:"Team/JoinSpaceRejectionRequested",choice:t}),[t,i]);return l.createElement(h,{role:"listitem","aria-label":"Notification item",tabIndex:0,onClick:()=>a(!n)},l.createElement(b,null,l.createElement(p.In,{icon:"TexturedSpace",size:32}),l.createElement("div",null,l.createElement("strong",null,t.invitedBy?.name??"Someone")," invited you to join"," ",l.createElement("strong",null,t.name))),l.createElement(p.SD,{open:n},l.createElement(x,null),l.createElement(E,null,l.createElement(p.$n,{size:"m",round:!0,variant:"primary",text:"Join Team",tooltipText:"Join Team",onClick:o}),l.createElement(p.$n,{size:"m",round:!0,variant:"outlined",text:"Decline",tooltipText:"Decline",onClick:s}))))}),h=o.Ay.div`
  cursor: pointer;
  width: 100%;
  border-radius: 8px;

  &:hover {
    color: ${a.t14};
    background: ${a.KxS};
  }
`,b=o.Ay.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`,x=o.Ay.div`
  border-top: 1px solid ${a.Q_2};
  margin-inline: 16px;
`,E=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`,v=l.memo(function(e){let{selectedPage:t,panels:n,dispatch:r,panelMenu:i,resultsHighlighted:o,notificationsMenuIsOpen:c}=e,d=(0,u.jL)(),{featureFlags:m,hasRunRecords:y}=(0,u.rD)(),f=e=>r({type:"AppWindow/ExplorerNavigated",page:e}),h=m.v4MiniEnabled?"Agents":"Playbooks";return l.createElement(S,{role:"navigation","data-tracking-context":"main navigation"},l.createElement(I,null),l.createElement(g._,{onUpgrade:()=>d({type:"App/UpgradeIntended",from:"header"}),onGotoPaymentPortal:()=>d({type:"App/PaymentPortalNavigated"}),onGotoOpenInvoice:()=>d({type:"App/OpenInvoiceNavigated"})}),l.createElement(k,{active:"personal"===t||"team"===t,"aria-label":h,icon:w,onClick:()=>f("personal"),text:h,"data-tour-id":"results-nav-button",$block:!0,noDivider:!0,role:"tab"}),l.createElement(k,{active:"scraper-templates"===t,"aria-label":"Scraper Templates","data-testid":"scraper-templates-btn",icon:l.createElement(p.In,{icon:"ScraperFileBold"}),onClick:()=>f("scraper-templates"),text:"Scraper Templates",noDivider:!0,role:"tab"}),l.createElement(k,{active:"results"===t,"aria-label":"Results","data-testid":"results-btn","data-tour-id":"results-btn",icon:A,onClick:()=>f("results"),text:y?"Results":"No Results yet. They will show up here after you run a Playbook.",dotColor:o&&y?a.XxH:void 0,disabled:!y,role:"tab"}),l.createElement("div",{style:{flex:"1 1 auto"}}),m.devTools&&n.map((e,t)=>l.createElement(l.Fragment,{key:e.id},l.createElement(p.ms,{behavior:"flip",placement:"right-end",width:428,renderContent:()=>l.createElement(l.Fragment,null,i),isOpen:0==t&&!!i,onIsOpenChanged:t=>{t?r({type:"AppWindow/PanelMenuOpened",id:e.id}):r({type:"AppWindow/PanelMenuClosed"})}},l.createElement(k,{key:e.id,onClick:()=>{},active:!1,icon:l.createElement(p.In,{icon:e.icon}),text:e.title,style:{marginBottom:"auto"},disabled:!1})))),l.createElement(C,{notificationsMenuIsOpen:c}),m.devTools?l.createElement(k,{onClick:()=>d({type:"App/DownloadDebugBundleClicked"}),icon:l.createElement(s.W,null),text:"Debug Bundle (Cmd+Shift+D)"}):null,l.createElement(k,{icon:l.createElement(p.In,{icon:"SettingsBold"}),text:"Settings",onClick:()=>d({type:"ModalsAction",action:{type:"Modal/SettingsShown"}})}))}),C=l.memo(function(e){let t=(0,u.jL)(),{joinChoices:n}=(0,u.rD)(),r=n.map(e=>({id:e.teamId,type:"invitation",choice:e})),i=r.length>0,o=(0,d.i8)((0,u.jL)(),"AppWindowAction");return i?l.createElement(p.ms,{isOpen:e.notificationsMenuIsOpen,placement:"right-end",behavior:"flip",width:408,onIsOpenChanged:e=>{e||o({type:"AppWindow/NotificationsMenuClicked",open:e})},renderContent:()=>l.createElement(P,{role:"listbox"},r.map(e=>{let{id:t,type:n,choice:a}=e;return l.createElement(y,{key:t,type:n,choice:a})}))},l.createElement(k,{icon:l.createElement(p.In,{icon:"BellOutline"}),onClick:()=>t({type:"AppWindowAction",action:{type:"AppWindow/NotificationsMenuClicked",open:!0}}),disabled:!i,"aria-label":"Notifications","data-testid":"notifications-btn",dotColor:i?a.zIe:void 0,text:i?`You have ${r.length} notifications.`:"No notifications yet."})):null}),S=o.Ay.div`
  background: ${a.ONy};
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
    border-right: 1px solid ${a.Tc2};
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
      background: ${a.Tc2};
    }
  }
`,k=(0,o.Ay)(e=>{let{active:t,text:n,icon:a,dotColor:o,noDivider:s,...c}=e;return l.createElement(r.m,{placement:"right",content:n},l.createElement("button",{"aria-label":n,...c,"aria-selected":!!t||void 0,className:(0,i.A)(c.className,s&&"nodivider")},a,o&&l.createElement(m.g,{$color:o,style:{position:"absolute",top:10,right:10}})))})`
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
  color: ${a.iTR};
  position: relative;

  &[disabled] {
    color: ${a.iTR}3D;
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
      background-color: ${a.KxS}7A;
      color: ${a.b_I};
      &:after {
        background: ${a.NcT};
        height: 100%;
      }
    }

    &[aria-selected="true"],
    &:active {
      color: ${a.b_I};
      background-color: ${a.KxS};
      &:after {
        background: ${a.b_I};
        height: 100%;
      }
    }
  }
`,w=l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 22 22",fill:"none"},l.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM8.25 14.2545V7.74551C8.25 7.21112 8.83298 6.88104 9.29122 7.15598L14.83 10.4105C15.275 10.6775 15.275 11.3225 14.83 11.5895L9.29122 14.844C8.83298 15.119 8.25 14.7889 8.25 14.2545Z",fill:"currentColor"})),A=l.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM13.0472 8.22447C13.2515 7.86701 13.1273 7.41165 12.7698 7.20739C12.4124 7.00313 11.957 7.12732 11.7527 7.48478L9.58773 11.2736L8.32021 10.2595C7.99872 10.0023 7.52961 10.0545 7.27242 10.376C7.01523 10.6974 7.06736 11.1666 7.38884 11.4237L9.33689 12.9822C9.50703 13.1183 9.7282 13.1732 9.94223 13.1323C10.1563 13.0915 10.3417 12.9591 10.4498 12.7699L13.0472 8.22447Z",fill:"currentColor"})),I=l.memo(()=>l.createElement("div",{style:{minHeight:64,width:64,display:"grid",placeItems:"center"}},l.createElement(c.X,{style:{fontSize:26}})));(0,o.Ay)(c.X)`
  path:first-child {
    fill: ${a.Kqb};
  }
`;let P=o.Ay.div`
  display: flex;
  flex-direction: column;
  max-height: 628px;
  overflow-y: auto;
`},46354:(e,t,n)=>{n.d(t,{m:()=>$});var a=n(69670),r=n(14041),i=n(39716),l=n(48143),o=n(28926);let s=n.p+"29a8cbe83eeb5aabe052.svg",c=n.p+"9210202eafddb9b708f2.svg",d=n.p+"e082b60d601760a9ec3b.svg",u=n.p+"d20d830537e400cb09f2.svg",p=n.p+"cd14bff02c2a8cf08a20.svg",m=n.p+"8384cdd8c8e06207c64f.svg",g=n.p+"1e4a98e1c0dd404baabd.svg",y=r.memo(e=>{let{active:t,...n}=e;return r.createElement(f,n,r.createElement(h,{$active:t},r.createElement(x,{src:m,alt:""}),r.createElement(k,{src:s,alt:"",$active:t}),r.createElement(b,{src:g,alt:"Create team icon"}),r.createElement(E,{src:c,alt:""}),r.createElement(v,null,r.createElement(S,{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",inset:0}},r.createElement("circle",{cx:"8",cy:"8",r:"8",fill:"url(#paint0_linear_8038_1653)"}),r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_8038_1653",x1:"8",y1:"0",x2:"8",y2:"16",gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:t?"#8C80D6":"#93AABF"}),r.createElement("stop",{offset:"1",stopColor:t?"#6F60CC":"#A1B4C7"})))),r.createElement(C,null,r.createElement(S,{width:"8",height:"8",viewBox:"0 0 8 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",inset:0}},r.createElement("path",{d:"M4 0C3.44772 0 3 0.447716 3 1V3H1C0.447716 3 0 3.44772 0 4C0 4.55228 0.447716 5 1 5H3V7C3 7.55228 3.44772 8 4 8C4.55228 8 5 7.55228 5 7V5H7C7.55228 5 8 4.55228 8 4C8 3.44772 7.55228 3 7 3H5V1C5 0.447716 4.55228 0 4 0Z",fill:"url(#paint0_linear_8038_1654)"}),r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_8038_1654",x1:"4",y1:"0",x2:"4",y2:"8",gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"#D8E0E8"}),r.createElement("stop",{offset:"1",stopColor:"#D2DCE4"}))))))),r.createElement(A,{src:d,alt:"",$active:t}),r.createElement(I,{src:u,alt:"",$active:t}),r.createElement(P,{src:p,alt:"",$active:t}))}),f=i.Ay.div`
  width: 48px;
  height: 48px;
  position: relative;
`,h=i.Ay.div`
  position: absolute;
  inset: 4px;
  transition: all 0.3s ease;

  ${e=>{let{$active:t}=e;return t&&"transform: translateY(4px);"}}
`,b=i.Ay.img`
  position: absolute;
  inset: 0;
`,x=i.Ay.img`
  position: absolute;
  inset: 0;
`,E=i.Ay.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`,v=i.Ay.div`
  position: absolute;
  left: 12px;
  bottom: 9px;
  width: 16px;
  height: 16px;
`,C=i.Ay.div`
  position: absolute;
  inset: 4px;
`,S=i.Ay.svg`
  stop {
    transition: 0.4s ease;
  }
`,k=i.Ay.img`
  width: 32px;
  height: 32px;
  left: 4px;
  bottom: 0;
  transition: all 0.3s ease;
  position: absolute;

  ${e=>{let{$active:t}=e;return t&&"bottom: 16px;"}}
`,w=i.Ay.img`
  position: absolute;
  transition: all 0.3s ease;
  opacity: 0;
  width: 8px;
  height: 8px;

  ${e=>{let{$active:t}=e;return t&&"opacity: 1;"}}
`,A=(0,i.Ay)(w)`
  top: 40px;
  left: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      top: 44px;
      left: -8px;
    `}}
`,I=(0,i.Ay)(w)`
  translate: rotate(45deg);
  left: 18.34px;
  bottom: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      bottom: -12px;
    `}}
`,P=(0,i.Ay)(w)`
  top: 40px;
  right: -18px;

  ${e=>{let{$active:t}=e;return t&&(0,i.AH)`
      top: 44px;
      right: -8px;
    `}}
`,$=r.memo(function(){let[e,t]=(0,r.useState)(!1),n=(0,l.jL)();return r.createElement(T,{onClick:()=>n({type:"CreateTeamClicked"}),onMouseEnter:()=>t(!0),onMouseLeave:()=>t(!1),role:"button","aria-label":"Create a team space"},r.createElement(F,null,r.createElement(y,{active:e})),r.createElement(M,null,r.createElement(R,null,"Create a team space"),r.createElement(O,null,"Unlock your team's potential with seamless collaboration.")))}),T=(0,i.Ay)(o.h$)`
  padding: 24px 20px;
`,F=i.Ay.div`
  display: flex;
  justify-content: center;
`,R=i.Ay.h4`
  color: ${a.t14};
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.25px;
`,M=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
`,O=i.Ay.p`
  color: ${a.ui$};
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`},67139:(e,t,n)=>{n.d(t,{B:()=>c});var a=n(69670),r=n(14041),i=n(39716),l=n(28926);let o=(0,i.Ay)(l.VP)`
  flex: 0 0 280px;
  padding: 24px 20px;
  margin: 24px 0 24px 24px;
  gap: 20px;
  background-color: ${a.ONy};
  border: 1px solid ${a.Tc2};
  border-radius: 12px;
  overflow-y: auto;
`,s=i.Ay.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-right: auto;
`,c=Object.assign(o,{Heading:(0,i.Ay)(e=>{let{title:t,...n}=e;return r.createElement("div",n,r.createElement(s,null,e.title),e.children)})`
    width: 100%;
    padding: 0px 0 4px 16px;
    color: ${a.CP};
    font-size: 14px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.1px;
    display: flex;
    flex-direction: row;
    word-break: break-word;
  `})},74948:(e,t,n)=>{n.d(t,{e:()=>c});var a=n(14041),r=n(39716),i=n(48143),l=n(28926);let o=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`,s=[{name:"A -> Z",content:a.createElement(o,null,"A ",a.createElement(l.In,{icon:"FullArrowRightOutline"})," Z"),value:{sort:"playbook.alphabetic",order:"asc"}},{name:"Z -> A",content:a.createElement(o,null,"Z ",a.createElement(l.In,{icon:"FullArrowRightOutline"})," A"),value:{sort:"playbook.alphabetic",order:"desc"}},{name:"Last used",value:{sort:"playbook.invoked",order:"desc"}},{name:"Last modified",value:{sort:"playbook.modified",order:"desc"}},{name:"Date added",value:{sort:"playbook.created",order:"desc"}}],c=a.memo(e=>{let t=i.rD().settings?.playbookSorting,n=(0,i.jL)();return a.createElement(l.ms,{"data-testid":"sorting-dropdown",width:240,autoCloseOnContentClick:!0,renderContent:()=>a.createElement(a.Fragment,null,a.createElement(l.ke,null,"Sorting:"),s.map(e=>a.createElement(l.IU,{key:e.name,text:e.name,onClick:()=>n({type:"App/PlaybookSortingChanged",sorting:e.value}),active:d(t,e.value)},e.content||e.name)))},e.children)}),d=(e,t)=>e?.sort===t.sort&&e?.order===t.order},29859:(e,t,n)=>{n.d(t,{_:()=>o});var a=n(14041),r=n(117),i=n(48143),l=n(28926);let o=a.memo(()=>{let e=(0,i.jL)(),{teamConfig:t}=(0,i.rD)(),n=(0,r.i8)(e,"ModalsAction"),o=()=>n({type:"Modal/SettingsShown",tab:"team"}),s=()=>n({type:"Modal/TeamRenameShown"}),c=t?.isLastAdmin?"Disband team":"Leave team",d=t?.isLastAdmin?()=>e({type:"TeamAction",action:{type:"Team/DisbandTeamClicked"}}):()=>e({type:"TeamAction",action:{type:"Team/LeaveTeamClicked"}});return a.createElement(a.Fragment,null,a.createElement(l.ms,{width:240,placement:"bottom-start",autoCloseOnContentClick:!0,renderContent:()=>a.createElement(a.Fragment,null,a.createElement(l.IU,{text:"Manage team",onClick:o}),t?.isAdmin?a.createElement(l.IU,{text:"Rename team",onClick:s}):null,a.createElement(l.IU,{text:c,onClick:d}))},a.createElement(l.$n,{icon:"OverflowVerticalOutline",tooltipText:"Team options","aria-label":"Team options sidebar menu",size:"m",mode:"light",variant:"flat",round:!0})))})},10777:(e,t,n)=>{n.d(t,{WE:()=>r.W,sx:()=>a.s}),n(78406),n(60227),n(40282),n(64739),n(32021),n(35549);var a=n(13159),r=n(15109);n(24679),n(50695),n(40364),n(46354),n(74948),n(29859)},1254:(e,t,n)=>{n.d(t,{B:()=>a,I:()=>r});let a=18,r=10},50278:(e,t,n)=>{n.d(t,{Yq:()=>d,aC:()=>r,hY:()=>o,jx:()=>i,q8:()=>l});let a=["personal","team"];function r(e){return i(e)&&e.includes("team")?"team":"personal"}let i=e=>a.includes(e),l=":personal",o=":team",s=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}),c=new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),d=e=>{let t=s.format(new Date(e)).replace(/^([A-Za-z]+)/,"$1."),n=c.format(new Date(e)).toLowerCase();return`${t} - ${n}`}},28363:(e,t,n)=>{n.d(t,{uA:()=>N,Gr:()=>H,ue:()=>O,Ff:()=>_});var a=n(14041),r=n(45281),i=n(14744),l=n(117),o=n(48143),s=n(93510),c=n(28926),d=n(69670),u=n(8225),p=n(90381),m=n(6804),g=n(89789),y=n(96452);let f=(0,n(85040).A)(e=>({selectRoot:{display:"block",position:"initial"},body:{position:"relative",width:"420px"},actions:{"&:focus-within":{backgroundColor:"#F8F8FD",borderRadius:e.spacing(1),opacity:"1","& button":{pointerEvents:"initial"}},"& button":{"&:first-of-type":{"&:hover, &:focus":{backgroundColor:d.g7N,borderColor:"initial"},backgroundColor:d.t14,color:"#FFF"},"&:not(:first-of-type)":{"&:hover, &:focus":{backgroundColor:d.t14,color:"#FFF"},borderColor:d.Q_2,color:d.t14},pointerEvents:"none"},left:"0",display:"flex",gap:e.spacing(2),justifyContent:"center",alignItems:"center",position:"absolute",width:"100%",height:"100%",opacity:"0",transition:"opacity 0.5s"},listWrapper:{"& .searchGroup":{height:"100%",overflow:"auto",maxHeight:"260px"},"& .actionItem":{"&:hover":{borderRadius:e.spacing(1),color:d.t14,backgroundColor:"#F8F8FD","& .actionItemActions":{display:"flex"}},"& .actionItemIcon":{marginInlineEnd:e.spacing(4)},"& .actionItemActions":{display:"none",gap:e.spacing(2),marginLeft:2,"& button":{width:28,height:28,display:"flex",justifyContent:"center",alignItems:"center"}},"& span":{fontWeight:"500",lineHeight:"20px",overflow:"hidden",textOverflow:"ellipsis"},padding:e.spacing(3,4),fontSize:"1em",color:d.ui$},"& .headerItem":{"& > label":{color:d.NEG,fontSize:"1em",fontWeight:"600",lineHeight:"20px"},"&:not(:first-of-type)":{paddingTop:"20px",marginTop:e.spacing(2),borderTop:"1px solid",borderTopColor:d.Tc2},padding:e.spacing(3,4),fontSize:"1em",lineHeight:"20px"},"& .searchItem":{display:"flex",alignItems:"center",borderBottom:"1px solid",marginBottom:e.spacing(2),borderBottomColor:d.Tc2,paddingTop:0},maxHeight:"474px",overflow:"auto",marginInlineEnd:e.spacing(-2),paddingInlineEnd:e.spacing(2),margin:"0",padding:"0"}})),h=e=>{let{title:t}=e;return a.createElement(u.A,{className:"headerItem",disableSticky:!0},a.createElement("label",null,t))},b=e=>{let{itemId:t,action:{icon:n,id:r,title:i},onClick:l}=e,o=a.useCallback(e=>{l(t,r),e.stopPropagation()},[t,r,l]);return a.createElement(c.$n,{icon:n,tooltipText:i,variant:"outlined",round:!0,onClick:o})},x=e=>{let{item:{icon:t,actions:n,id:r,title:i},onClick:l}=e,o=a.useCallback(()=>{l(r)},[r,l]);return a.createElement(p.A,{className:"actionItem",onClick:o},t?a.createElement(c.In,{className:"actionItemIcon",size:16,icon:t}):null,a.createElement(m.A,{title:i},i),n?a.createElement("div",{className:"actionItemActions",tabIndex:0,title:i},n.map(e=>a.createElement(b,{key:`${r}-${e.id}`,itemId:r,action:e,onClick:l}))):null)},E=e=>{let{groupItem:t,loadMore:n,search:r,onClick:i}=e,{items:l,id:o}=t,[s,u]=a.useState(""),p=a.useRef(null),m=a.useCallback(e=>{e.currentTarget.scrollTop+e.currentTarget.clientHeight>=e.currentTarget.scrollHeight&&n(o)},[n,o]),y=a.useCallback(e=>{u(e),p.current&&clearTimeout(p.current),p.current=setTimeout(()=>{r(o,e)},1e3)},[r,o]);return a.createElement(a.Fragment,null,a.createElement(g.Ay,{className:"searchItem"},a.createElement(c.In,{icon:"MagnifierOutline",color:d.UmY,size:16}),a.createElement(c.pd,{autoComplete:"off",autoFocus:!0,fullWidth:!0,variant:"flat",size:"l",placeholder:"",value:s,onChange:y})),a.createElement("li",null,a.createElement("ul",{className:"searchGroup",onScroll:m},l.map(e=>a.createElement(x,{key:e.id,item:e,onClick:i})))))},v=e=>{let{search:t,loadMore:n,onFinish:r,items:i}=e,l=f();return a.createElement("div",{className:l.body,"data-testid":"panel-menu"},a.createElement(y.A,{className:l.listWrapper,component:"div"},i.map(e=>"header"===e.type?a.createElement(h,{...e,key:e.id}):"searchable-group"===e.type?a.createElement(E,{key:e.id,groupItem:e,search:t,loadMore:n,onClick:r}):a.createElement(x,{key:e.id,item:e,onClick:r}))))};var C=n(39716),S=n(50695),k=n(40364),w=n(32244),A=n(39306),I=n(86477);let P=e=>{let{state:t,playbooksState:n,panelMenu:r,panels:i,createAutomationState:l,dispatch:s}=e,d=(0,o.jL)(),{featureFlags:u,settings:p}=(0,o.rD)(),m=(0,o.Mj)().disconnected[0]||null,g=(0,o.op)(),y=m?a.createElement(c.Qn,{variant:"warning",icon:"TriangularExclamationBold",onClick:()=>d({type:"ModalsAction",action:{type:"Modal/SettingsShown",tab:"apps"}})},a.createElement("strong",null,m.name," connection has expired.")," Click here to reconnect your app."):null,f=!p?.lastDismissedDynamicBanner&&u.dynamicBanner.active?a.createElement(S.u,{data:u.dynamicBanner,onDismiss:()=>d({type:"App/DynamicBannerDismissClicked"})}):null,h=g?a.createElement(F,null):f??y;return a.createElement($,null,a.createElement(k.T,{dispatch:s,notificationsMenuIsOpen:t.notificationsMenuIsOpen,panelMenu:r,panels:i,resultsHighlighted:t.resultsHighlighted,selectedPage:t.explorerPageSelected}),a.createElement(T,{state:t,dispatch:s,playbooksState:n,bannerEl:h,createAutomationState:l}))},$=C.Ay.div`
  position: relative;
  display: flex;
  height: 100%;
`,T=a.memo(function(e){let{state:t,dispatch:n,bannerEl:r,playbooksState:i,createAutomationState:o}=e,s=(0,l.i8)(n,"ResultsAction");switch(t.explorerPageSelected){case"personal":case"team":return a.createElement(w.Z,{page:t.explorerPageSelected,dispatch:n,playbooksState:i,renderWarning:r,state:t,createAutomationState:o});case"scraper-templates":return a.createElement(I.M,{dispatch:n,state:t.scraperTemplates});case"results":return a.createElement(A.uA,{dispatch:s,state:t.resultsState})}}),F=a.memo(function(){let e=(0,o.op)(),t=(0,o.jL)(),n=o.rD().teamConfig?.canManagePayment;if(!e)return null;switch(e){case"payment-issues":case"blocked":return a.createElement(c.Qn,{variant:"critical",icon:"TriangularExclamationBold",onClick:()=>n?t({type:"App/PaymentPortalNavigated"}):t({type:"TeamAction",action:{type:"Team/RequestAdminUpgradeRequested",reason:"The account has payment issues"}})},a.createElement("strong",null,"blocked"===e?"Your account is temporarily blocked.":"We were unable to process your payment.")," ",n?"Click here to resolve":"Click here to notify your team admins.");case"payment-open-invoice":return a.createElement(c.Qn,{variant:"warning",icon:"TriangularExclamationBold",onClick:()=>n?t({type:"App/OpenInvoiceNavigated"}):t({type:"TeamAction",action:{type:"Team/RequestAdminUpgradeRequested",reason:"There is an open invoice to be paid in our account."}})},a.createElement("strong",null,"There is an open invoice.")," ",n?"Click here to go to the payment portal.":"Click here to notify your team admins.");case"credits-exhausted":case"credits-low":case"trial-contact-sales":case"trial-ending":return null}});var R=n(43275),M=n(78126);let O={resultsHighlighted:!1,explorerPageSelected:"personal",explorerHighlightedPb:null,automationsQuery:"",panelId:null,panelMenuItems:[],panelMenuItemsLoading:!1,panels:[],showResultsOnboarding:!1,notificationsMenuIsOpen:!1,resultsState:A.ue(),createFolderState:null,scraperTemplates:I.u,automationsFolders:{personal:[],team:[]},automationsSelectedFolderId:null},_=(e,t,n)=>{let a=e=>({...t,...e}),{profile:o}=n;switch(e.type){case"AppWindow/NotificationsMenuClicked":return[a({notificationsMenuIsOpen:!t.notificationsMenuIsOpen}),[]];case"AppWindow/PanelMenuItemClicked":return[{...t,panelId:null},[async t=>{let{api:n}=t,{id:a,panelId:r}=e;await n.integrationPanelMenuClick(r,a,e.action)}]];case"AppWindow/PanelMenuOpened":return[{...t,panelMenuItems:[],panelMenuItemsLoading:!0,panelId:e.id},[async t=>{let{api:n,dispatch:a}=t,{id:r}=e;a({type:"AppWindow/PanelMenuItemsLoaded",panelMenuItems:await n.integrationPanelMenuGet(r)})}]];case"AppWindow/PanelMenuClosed":return[a({panelId:null,panelMenuItems:[],panelMenuItemsLoading:!1}),[]];case"AppWindow/PanelMenuQueryChanged":return[t,[async n=>{let{api:a,dispatch:r}=n,{panelId:i,groupId:l,query:o}=e,s=await a.integrationPanelMenuSearch(i,l,o),c=structuredClone(t.panelMenuItems);for(let e of c)"searchable-group"===e.type&&e.id===l&&(e.items=s);r({type:"AppWindow/PanelMenuItemsLoaded",panelMenuItems:c})}]];case"AppWindow/PanelMenuLoadMoreClicked":return[t,[async n=>{let{api:a,dispatch:i}=n,{panelId:l,groupId:o}=e,s=await a.integrationPanelMenuLoadMore(l,o),c=structuredClone(t.panelMenuItems);for(let e of c)"searchable-group"===e.type&&(0,r.tM)(e.items,s);i({type:"AppWindow/PanelMenuItemsLoaded",panelMenuItems:c})}]];case"AppWindow/PanelsFetched":return[a({panels:e.panels}),[]];case"AppWindow/PanelMenuItemsLoaded":return[a({panelMenuItems:e.panelMenuItems,panelMenuItemsLoading:!1}),[]];case"AppWindow/ExplorerNavigated":{let{page:n,folderId:r}=e,i=a({explorerPageSelected:n});i.explorerHighlightedPb=null;let l=[];return"results"===n&&(i.resultsState={...A.ue(o?.uuid)},l.push(s.ad(A.Qz(i.resultsState.params),e=>{let{records:t,summary:n}=e;return{type:"ResultsAction",action:{type:R.X.InitialDataFetched,records:t,summary:n}}}))),"scraper-templates"===n&&l.push(H(t.scraperTemplates)),[{...(0,w.O)(i),resultsHighlighted:"results"!==n&&t.resultsHighlighted,automationsSelectedFolderId:r??null},l]}case"AppWindow/HighlightTimedOut":return[a({explorerHighlightedPb:null}),[]];case"ResultsAction":{let[n,r]=A.TS(e.action,t.resultsState,o),{type:i}=e;return[a({resultsState:n}),r.map((0,l.zy)(e=>({type:i,action:e})))]}case"AppWindow/ExplorerQueryUpdated":return[a({automationsQuery:e.query}),[]];case"Scrapers/QueryUpdated":{let{query:n}=e;return[a({scraperTemplates:{...t.scraperTemplates,query:n}}),[]]}case"Scrapers/ViewChanged":{let{view:n}=e;return[a({scraperTemplates:{...t.scraperTemplates,view:n,site:""}}),[H(t.scraperTemplates)]]}case"Scrapers/FilterChanged":{let{site:n}=e;return[a({scraperTemplates:{...t.scraperTemplates,site:n}}),[]]}case"AppWindow/CreateFolderClicked":return[a({createFolderState:{name:"",loading:!1,space:e.space}}),[]];case"AppWindow/CreateFolderNameChanged":if(!t.createFolderState)return[t,[]];return[a({createFolderState:{...t.createFolderState,name:e.name}}),[]];case"AppWindow/CreateFolderCreated":{let{createFolderState:n}=t;if(!n)return[t,[]];let r=a({createFolderState:null}),i=[s.WU(e=>({type:"AppWindow/FoldersFetched",folders:e}))];return[r=a({...r,automationsFolders:{...t.automationsFolders,[n.space]:[...t.automationsFolders[n.space],e.folder]}}),i]}case"AppWindow/CreateFolderSubmitted":if(!t.createFolderState)return[t,[]];if(""===t.createFolderState.name.trim())return[a({createFolderState:null}),[]];return[a({createFolderState:{...t.createFolderState,loading:!0}}),[s.vV(t.createFolderState.name,"team"===t.createFolderState.space,e=>({type:"AppWindow/CreateFolderCreated",folder:e}))]];case"AppWindow/CreateFolderCancelled":return[a({createFolderState:null}),[]];case"AppWindow/FoldersFetched":return[a({automationsFolders:{...e.folders}}),[]];case"Scrapers/SearchCleared":return[a({scraperTemplates:{...t.scraperTemplates,query:""}}),[]];case"Scrapers/Updated":return[t,[H(t.scraperTemplates)]];case"Scrapers/TemplatesFetched":{let n="owned"===e.vis?"personal":"catalog",r={...t.scraperTemplates,[n]:e.templates};return"catalog"===n&&(r.catalogLastFetchedAt=Date.now()),[a({scraperTemplates:r}),[]]}default:(0,i.HB)(e)}},N=a.memo(e=>{let{state:t,playbooksState:n,activeModal:r,createAutomationState:i}=e,s=a.useMemo(()=>"Onboarding"===r?{...t,notificationsMenuIsOpen:!1}:t,[t,r]),c=(0,M.I)(),d=(0,o.jL)(),u=(0,l.i8)(d,"AppWindowAction");a.useEffect(()=>{let e=window.location.hash.slice(2);if(!window.location.protocol.startsWith("http")&&B(e)&&"checkoutSuccess"===e)return history.pushState("",document.title,window.location.pathname+window.location.search),d({type:"App/CheckoutSucceeded"})},[u,d]);let p=s.panelId?a.createElement(D,{panelId:s.panelId,panelMenuItems:s.panelMenuItems,panelMenuItemsLoading:s.panelMenuItemsLoading,dispatch:u}):null;return a.createElement(a.Fragment,null,a.createElement("div",{className:c.appWindow,"data-node":"app-window-content"},a.createElement(P,{panels:s.panels.filter(e=>"Scraper"!==e.title),panelMenu:p,state:s,dispatch:u,playbooksState:n,createAutomationState:i})))}),B=e=>"checkoutSuccess"===e,D=e=>{let{panelId:t,panelMenuItems:n,panelMenuItemsLoading:r,dispatch:i}=e,l=a.useCallback((e,n)=>{i({type:"AppWindow/PanelMenuItemClicked",id:e,action:n,panelId:t})},[i,t]),o=a.useCallback(e=>{i({type:"AppWindow/PanelMenuLoadMoreClicked",panelId:t,groupId:e})},[i,t]),s=a.useCallback((e,n)=>{i({type:"AppWindow/PanelMenuQueryChanged",panelId:t,groupId:e,query:n})},[i,t]);return r?a.createElement(c.y$,null):a.createElement(v,{items:n,onFinish:l,loadMore:o,search:s})};function H(e){return async t=>{let{api:n,dispatch:a}=t;n.scraperTemplatesList("owned").then(e=>{a({type:"Scrapers/TemplatesFetched",templates:e,vis:"owned"})});let r=Date.now()-e.catalogLastFetchedAt>36e5;(null===e.catalog||e.catalog?.length===0||r)&&n.scraperTemplatesList("public").then(e=>{e.sort((e,t)=>e.premium&&!t.premium?1:!e.premium&&t.premium?-1:e.title.localeCompare(t.title)),a({type:"Scrapers/TemplatesFetched",templates:e,vis:"public"})})}}},78126:(e,t,n)=>{n.d(t,{I:()=>o,f:()=>s});var a=n(69670),r=n(85040),i=n(14041),l=n(39716);let o=(0,r.A)(e=>({container:{display:"flex",flex:1,pointerEvents:"initial",position:"relative",transition:"max-width 300ms",width:"100%"},appWindow:{background:a.ONy,backgroundClip:"padding-box",border:"1px solid rgba(0, 0, 0, 0.02)",borderRadius:12,boxShadow:"0px 8px 24px rgba(0, 0, 0, 0.02)",flex:1,overflow:"hidden",position:"relative"},filterBar:{height:56,background:a.ONy,display:"flex",alignItems:"center",position:"relative"},tooltipAction:{display:"none"},tooltipActionText:{fontSize:14,lineHeight:"24px",fontWeight:500},playbookList:{marginTop:e.spacing(4)}})),s=(0,l.Ay)(e=>{let{children:t,bar:n,leftBar:a,...r}=e;return i.createElement("div",r,n,i.createElement("div",{className:"layout"},a,i.createElement("div",{className:"content"},i.createElement("div",{className:"innerContent"},t))))})`
  position: relative;
  flex-grow: 1;
  background-color: ${a.o$k};
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
`},85999:(e,t,n)=>{n.d(t,{F:()=>m});var a=n(99420),r=n.n(a),i=n(37217),l=n(36884),o=n(49170),s=n(29e3),c=n(91159);let d=JSON.parse('{"a":[{"question":"Could you describe the kind of items or situations you want the system to classify?","type":"free-text","recommendation":"I want to classify the emails in my inbox, I want to classify support requests, etc.","answer":""},{"question":"What\'s the main purpose or goal you want to achieve with this system and why are you building it?","type":"free-text","recommendation":"I want to find emails I need to take action on, etc.","answer":""}]}');var u=n(19029);let p=i.I.getLogger("OpenAiComponents");function m(e,t){switch(e.type){case"ClickedGoBack":if(t.initialTarget?.bucket&&"set-preset-questions"===t.page)return[{...t,page:u.SV},[]];return[{...t,page:(0,u.XB)(t),fewshotExecState:null},[]];case"SetPage":return[{...t,page:e.page},[]];case"SelectBucket":{let{bucket:n}=e,a=t.availableTargets.find(e=>e.valueKey===n.target);return[{...t,target:a?{key:a.valueKey,name:a.value}:null,classes:n.classes.map(e=>({...e,editing:!1})),page:"set-preset-questions",bucketId:n.id,name:n?.default_classifier_name?`${n?.default_classifier_name} (${r()(new Date).format("MMM DD YYYY")})`:"",preSetQuestions:n?.questions??d.a??[],question_header:n?.question_header??"",currentClassIndex:n.classes.length,question_description:n?.question_description??"",category_description:n?.category_description??"",category_header:n?.category_header??"",playbooks:a?a.playbooks:t.availableTargets.flatMap(e=>e.playbooks)},[]]}case"ClickedOnAddCategory":{let e=t.classes.concat({name:"",description:"",editing:!0});return[{...t,classes:e},[]]}case"ChangedCustomTargetName":return[{...t,target:{name:e.value,key:"custom"}},[]];case"ClickedOnCreateYourOwn":return[{...t,target:{key:"custom",name:""},playbooks:t.availableTargets.flatMap(e=>e.playbooks),page:"choose-custom-target"},[]];case"SubmittedCustomTarget":return[{...t,bucketId:"custom",name:t.target?.name?`${t.target.name} (${r()(new Date).format("MMM DD YYYY")})`:"",page:"set-custom-classes",classes:[{name:"",description:"",editing:!0}],preSetQuestions:[],currentClassIndex:0,question_header:"Answer a few questions to get started",question_description:`These questions help the AI get a better understanding of the context behind your task,
      improving it's accuracy.`,category_header:"Create categories",category_description:"Enter at least two categories for your data. The AI will learn to accurately sort your data into these categories."},[]];case"SetPresetQuestionAnswer":if("free-text"==e.form){let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:e.answer}:t);return[{...t,preSetQuestions:n},[]]}if(e.checked){let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:y(t.answer,e.answer).join(", ")}:t);return[{...t,preSetQuestions:n},[]]}{let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:t.answer.replace(e.answer,"")}:t);return[{...t,preSetQuestions:n},[]]}case"SubmitClasses":return[{...t,page:e.isReview?"setname":"decide-to-train"},[]];case"FinalizePresetQuestions":{let e=async e=>{let{dispatch:t}=e;return t({type:"DefineContext"})};return[{...t,page:"set-custom-classes"},[e]]}case"DefineContext":{let e=t.preSetQuestions.map(e=>{let{question:t,answer:n}=e;return{question:t,answer:n}});return[t,[async n=>{let{controller:a,dispatch:r}=n;r({type:"SetContext",context:await a.createContextPrompt(e,t.classes,t.target?.name)})}]]}case"SetContext":return[{...t,description:e.context},[]];case"SetFinalClassDescription":{let{description:n,index:a}=e,r=t.classes.map((e,t)=>t===a?{...e,description:n}:e);return[{...t,classes:r},[]]}case"SetName":return[{...t,name:e.text},[]];case"StartTrainingBuilderV2":return[{...t,page:"loading-data"},[]];case"StartTraining":return[{...t,page:"select-playbook"},[]];case"StartFewshotPlaybook":return[{...t,playbook_description:e.playbook_description,page:"loading-data"},[async t=>{let{api:n,dispatch:a}=t,r=await n.playbookEditor2_GetBCLPlaybookAsUIAst(e.name,e.code);a(0===r.args.length?{type:"FetchFewShotData",playbook:r}:{type:"UpdateFewShotPlaybook",pb:r})}]];case"UpdateFewShotArgument":{if(!t.fewshotExecState)return[t,[]];let n={...t.fewshotExecState.playbook,args:t.fewshotExecState.playbook.args.map(t=>t.name===e.pbArg.name?e.pbArg:t)},a=async e=>{let{api:t,dispatch:a}=e;a({type:"UpdateFewShotPlaybook",pb:await t.playbookEditor2_UpdatePlaybookCommandArgumentValue(n,{})})};return[{...t,fewshotExecState:{...t.fewshotExecState,playbook:n}},[a]]}case"UpdateFewShotPlaybook":{let n=e.pb;if(t.fewshotExecState)return[{...t,fewshotExecState:{...t.fewshotExecState,playbook:n}},[]];return[{...t,fewshotExecState:{playbook:n,suggestions:{type:"notAsked"}},page:"select-arguments"},[]]}case"FetchFewShotArgumentSuggestions":{if(!t.fewshotExecState)return[t,[]];let n=t.fewshotExecState.playbook;if(!n)return[t,[]];let a=l.j.Loading;return[{...t,fewshotExecState:{...t.fewshotExecState,suggestions:a}},[async t=>{let{api:a,dispatch:r}=t,i=[];for await(let t of o.F(a,"playbookEditor2_GetPlaybookValueSuggestions")(n,null,e.argName,e.typeSignature,e.input,e.forceRefreshCache?{cacheMaxAgeMs:0}:{}))i.push(t),i=i.sort((e,t)=>e.weight-t.weight);r({type:"SetFewShotArgumentSuggestions",suggestions:i})}]]}case"SetFewShotArgumentSuggestions":{if(!t.fewshotExecState)return[t,[]];let n=l.j.Success(e.suggestions);return[{...t,fewshotExecState:{...t.fewshotExecState,suggestions:n}},[]]}case"SetAnswer":{let{answer:n,index:a}=e,r=t.fewshots.map((e,r)=>{let i=e.annotations.map((e,t)=>t===a?{...e,answer:n}:e);return r===t.curExample?{...e,annotations:i}:e});return[{...t,fewshots:r},[]]}case"SetLabel":{p.debug(e.label+": the class that was selected");let n=t.classes.find(t=>t.name===e.label);if(!n)return[t,[]];return[{...t,fewshots:t.fewshots.map((e,a)=>a===t.curExample?{...e,label:n}:e)},[]]}case"SetExplanation":return[{...t,fewshots:t.fewshots.map((n,a)=>a===t.curExample?{...n,explanation:e.explanation}:n)},[]];case"CompleteUserExplainsExample":return[{...t,updatingClassDescriptions:!0},[async e=>{let{controller:n,dispatch:a}=e,r=t.fewshots[t.curExample];if(!r)return;let i=await n.editClassDescriptions(r.summarizationText??r.example.text,t.classes,r.label,r.predicted,r.annotations,r.explanation,t.description,t.target?.name??"");p.debug(t),a({type:"SetUpdatedClassDescriptions",classes:i}),a(t.curExample!==t.fewshots.length-1?{type:"GoToNextExample"}:{type:"SetPage",page:"review"})}]];case"GoToNextExample":{let e=t.fewshots[t.curExample+1]?.example.text,n={...t,updatingClassDescriptions:!0,customExampleEditingState:{...t.customExampleEditingState,generating:!0,editing:!e},curExample:t.curExample+1,currentGeneratedQuestion:0};return[n,[g(n,{onDone:e=>({type:"CurrentQuestionFetched",question:e}),onSummarize:e=>({type:"SetSummarizationText",text:e})})]]}case"CurrentQuestionFetched":{let n=t.fewshots[t.curExample]?.annotations?.[t.currentGeneratedQuestion];return[{...t,page:"fewshot",updatingClassDescriptions:!1,customExampleEditingState:{...t.customExampleEditingState,generating:!1},fewshots:t.fewshots.map((a,r)=>r===t.curExample?{...a,annotations:n?a.annotations.map((a,r)=>r===t.currentGeneratedQuestion?{...n,...e.question}:a):a.annotations.concat({question:e.question.question,explanation:e.question.explanation,answer:""})}:a)},[]]}case"FetchAvailableIntegrations":return[t,[async e=>{let{api:t,dispatch:n}=e,a=[],{connected:r,disconnected:i,preinstalled:l}=await t.integrationListSummary();for(let e of l.concat(r).concat(i)){let n=(await t.integrationGetCommands(e.factoryId)).filter(e=>e.type===s.g.GET&&!e.deprecated);0!==n.length&&a.push({factoryId:e.factoryId,alias:e.alias,instanceId:e.instance.instanceId,name:e.name,icon:e.icon,commands:n.map(e=>({name:e.name,label:(0,c.ZH)(e.expressions[0]??"")}))})}n({type:"SetAvailableIntegrations",integrations:a})}]];case"SetAvailableIntegrations":return[{...t,availableIntegrations:e.integrations},[]];case"FetchFewShotData":return[{...t,page:"loading-data"},[async t=>{let{api:n,dispatch:a}=t;a({type:"AddFewShotData",data:await n.playbookEditor2_RunWithResult(e.playbook,{enforcePremium:!1,storeResults:!1})})}]];case"UpdateClassName":return[{...t,classes:t.classes.map((t,n)=>n===e.index?{...t,name:e.text}:t)},[]];case"AddClassName":return[{...t,classes:t.classes.concat({name:"",description:"",editing:!0})},[]];case"AddFewShotData":{let n=e.data.length>0,a=n?e.data.slice(0,t.numExamples*t.classes.length).map(e=>({example:e,annotations:[],explanation:"",reflection:"",label:{name:"",description:""},predicted:{name:"",description:""}})):Array(t.numExamples*t.classes.length).fill({annotations:[],reflection:"",explanation:"",example:{text:"",visualBlocks:[]},label:{name:"",description:""},predicted:{name:"",description:""}}),r={...t,page:"fewshot",curExample:0,fewshots:a.map(e=>({...e})),currentGeneratedQuestion:0,customExampleEditingState:{...t.customExampleEditingState,generating:n,editing:!n}};if(n)return[r,[g(r,{onDone:e=>({type:"CurrentQuestionFetched",question:e}),onSummarize:e=>({type:"SetSummarizationText",text:e})})]];return[r,[]]}case"ClickedCreateYourOwnExample":return[{...t,page:"fewshot",curExample:0,currentGeneratedQuestion:0,customExampleEditingState:{...t.customExampleEditingState,editing:!0},fewshots:[{label:{name:"",description:""},predicted:{name:"",description:""},explanation:"",reflection:"",annotations:[],example:{text:"",visualBlocks:[]}},{label:{name:"",description:""},predicted:{name:"",description:""},explanation:"",reflection:"",annotations:[],example:{text:"",visualBlocks:[]}}]},[]];case"RegenerateCurrentQuestion":{let e={...t,customExampleEditingState:{...t.customExampleEditingState,generating:!0}};return[e,[g(e,{onDone:e=>({type:"CurrentQuestionFetched",question:e}),onSummarize:e=>({type:"SetSummarizationText",text:e})})]]}case"ClickedNextQuestion":{if(!t.fewshots[t.curExample])return[t,[]];let e={...t,updatingClassDescriptions:!1,page:"fewshot",currentGeneratedQuestion:t.currentGeneratedQuestion+1,customExampleEditingState:{...t.customExampleEditingState,generating:!0}};return[e,[g(e,{onDone:e=>({type:"CurrentQuestionFetched",question:e}),onSummarize:e=>({type:"SetSummarizationText",text:e})})]]}case"SetSummarizationText":return[{...t,fewshots:t.fewshots.map((n,a)=>a===t.curExample?{...n,summarizationText:e.text}:n)},[]];case"FetchPrediction":return[{...t,page:"prediction",loadingPredictions:!0},[async e=>{let{controller:n,dispatch:a}=e,r=t.fewshots[t.curExample];if(!r)return;let{predictedClass:i,reflection:l}=await n.classifyFewShot(r.summarizationText??r.example.text,t.classes,t.fewshots[t.curExample]?.annotations,t.description,t.target?.name);a({type:"SetPrediction",predictedClass:i,reflection:l})}]];case"SetPrediction":{let n=t.fewshots[t.curExample];if(!n)return[t,[]];let{predictedClass:a,reflection:r}=e;return[{...t,allQuestions:t.allQuestions.concat(n.annotations.map(e=>({question:e.question,answer:e.answer}))),fewshots:t.fewshots.map((e,n)=>n===t.curExample?{...e,predicted:a,reflection:r}:e),page:"prediction",loadingPredictions:!1},[]]}case"SetUpdatedClassDescriptions":return[{...t,page:t.curExample==t.fewshots.length-1?"review":"loading-edit",currentClassIndex:t.curExample==t.fewshots.length-1?0:t.currentClassIndex,classes:e.classes.map(e=>({...e,editing:!1}))},[]];case"UserClickedOnFilterTarget":return[{...t,selectedTargetFilter:e.targetKey},[]];case"ChangedCategory":{let n=t.classes.map((t,n)=>n===e.index?e.category:t);return[{...t,classes:n},[]]}case"ClickedSaveCategory":{let n=t.classes.map((t,n)=>n===e.index?{...t,editing:!1}:t);return[{...t,classes:n},[]]}case"ClickedEditCategory":{let n=t.classes.map((t,n)=>n===e.index?{...t,editing:!0}:t);return[{...t,classes:n},[]]}case"DeleteCategory":{let n=t.classes.filter((t,n)=>n!==e.index);return[{...t,classes:n},[]]}case"ClickedContinueWithoutTraining":return[{...t,page:"setname",skippedTraining:!0},[]];case"ClickedSkipExample":{let e=t.fewshots[t.curExample+1],n=e?.annotations[0];if(e){let a={...t,page:"fewshot",curExample:t.curExample+1,currentGeneratedQuestion:0,customExampleEditingState:{text:"",generating:!n?.question,editing:!e.example.text,changed:!1}};if(!n?.question)return[a,[g(a,{onDone:e=>({type:"CurrentQuestionFetched",question:e}),onSummarize:e=>({type:"SetSummarizationText",text:e})})]];return[a,[]]}return[{...t,page:t.editing?"edit-choose":"review"},[]]}case"ClickedAddCustomExample":{let e=t.fewshots[t.curExample||0];return[{...t,customExampleEditingState:{generating:!1,editing:!0,text:e?.example.text||"",changed:!1}},[]]}case"UpdateCurrentExample":{let n={...t.customExampleEditingState,changed:!0,text:e.text};return[{...t,customExampleEditingState:n},[]]}case"ClickedConfirmExampleChanges":if(!t.fewshots[t.curExample||0])return[t,[]];return[{...t,customExampleEditingState:{editing:!1,text:"",generating:!1,changed:!1},fewshots:t.fewshots.map((e,n)=>n===t.curExample?{...e,example:{...e.example,text:t.customExampleEditingState.text,visualBlocks:[]}}:e)},[async e=>{let{dispatch:t}=e;return t({type:"RegenerateCurrentQuestion"})}]];case"ClickedCancelExampleChanges":return[{...t,customExampleEditingState:{editing:!1,text:"",generating:!1,changed:!1}},[]];case"ClickedTrainAI":return[{...t,skippedTraining:!1},[]]}}let g=(e,t)=>{let{onDone:n,onSummarize:a}=t;return async t=>{let{controller:r,dispatch:i}=t,l=e.fewshots[e.curExample];if(!l)return;let o=l.summarizationText??l.example.text;async function s(t){return await r.generateQuestions(t??o,e.classes,e.fewshots[e.curExample]?.annotations,e.description,e.target?.name,e.allQuestions)}if(e.fewshots[e.curExample]?.summarizationText==void 0){let t=await r.summarizeText(l.example.text,e.target?.name??"",e.description);i(a(t)),i(n(await s(t)))}else i(n(await s()))}},y=(e,t)=>[...new Set([...e.split(", "),...t.split(", ")].filter(e=>""!==e.trim()))]},19029:(e,t,n)=>{n.d(t,{SV:()=>r,Ur:()=>l,XB:()=>i});var a=n(21769);let r="basic-info",i=e=>{let t=e.target?.key==="custom";return({"basic-info":"basic-info","choose-custom-target":"basic-info","set-preset-questions":t?"choose-custom-target":"basic-info","set-custom-classes":t?"choose-custom-target":"set-preset-questions",setname:e.skippedTraining?"decide-to-train":"review","decide-to-train":"set-custom-classes","select-playbook":e.editing?"edit-choose":"decide-to-train","select-arguments":"select-playbook","loading-data":"loading-data",fewshot:"fewshot",loading:"loading",prediction:"prediction","loading-edit":"loading-edit",review:"decide-to-train",final:"final","edit-choose":"edit-choose"})[e.page]};function l(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{isBuilderV2:!1},i=n?e.find(e=>e.valueKey===n?.target):void 0,l=e.flatMap(e=>e.buckets),o=n?l.find(e=>e.id===n.bucketId):void 0;return{classificationTaskId:t?._id||(0,a.A)(),saving:!1,isBuilderV2:r.isBuilderV2,selectedTargetFilter:null,availableTargets:e,availableBuckets:l,customExampleEditingState:{editing:!1,text:"",generating:!1,changed:!1},loadingPredictions:!1,editing:!!t,availableIntegrations:[],page:t?"edit-choose":"basic-info",name:t?.name??(o?.default_classifier_name?`${o.default_classifier_name} (${new Date().toISOString()})`:""),description:t?.context??"",classes:t?.classes?.map(e=>({...e,editing:!1}))??[{name:"",description:"",editing:!0}],initialClasses:t?.classes??[{name:"",description:""}],preSetQuestions:[],connection:{type:"active"},busyCalls:[],updatingClassDescriptions:!1,bucketId:o?.id??"",fewshotPlaybook:n?.dataSourcePlaybook?i?.playbooks.find(e=>e.id===n?.dataSourcePlaybook)??null:null,fewshotExecState:null,fewshots:t?.fewshots?.map(e=>({example:{text:e.example,visualBlocks:[]},summarizationText:"",label:e.label,predicted:e.predicted,explanation:e.explanation?e.explanation:"",reflection:"",annotations:e.annotations,oldPredicted:e.predicted}))??[],targetSuggestions:[],default_classifier_name:o?.default_classifier_name??"",start_page_header:o?.start_page_header??"Build a Categorizer",start_page_description:o?.start_page_description??"High-accuracy AI categorization to help you instantly analyze, organize, and sort emails, documents, and more.",question_header:o?.question_header??"Answer a few questions to get started",question_description:o?.question_description??"These questions help the Categorizer, improving its accuracy.",category_header:o?.category_header??"What are the categories you want the data to be divided into?",category_description:o?.category_description??"In this step, you will choose and describe the categories you want to include.",preBuiltBuckets:[],target:t?.target?{name:t.target,key:"custom"}:i?{name:i.value,key:i.valueKey}:null,initialTarget:n??null,classSuggestions:[],currentClassIndex:t&&t.classes?t.classes.length:0,curExample:0,playbooks:e.find(e=>t?.target===e.value)?.playbooks??[],playbook_description:"Apply any filters you may want to include on the data you annotate.",currentGeneratedQuestion:0,canAddCustomClasses:!1,allQuestions:[],numExamples:2,minQuestionsAmount:2,skippedTraining:!1}}},70144:(e,t,n)=>{n.d(t,{QN:()=>c,f7:()=>s,k5:()=>d});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(28926);let s={text:"TexturedParagraph",analysis:"TexturedCustom",compare:"TexturedCompare",notes:"TexturedNotes",qna:"TexturedQA",table:"TexturedTable"},c={text:"Text",analysis:"Analysis",compare:"Compare",notes:"Notes",qna:"Q & A",table:"Table"},d=e=>{let{type:t,...n}=e;return i.createElement(p,n,i.createElement(o.In,{icon:s[t],size:32}),i.createElement(a.P,{$small:!0},c[t]),i.createElement(u,{icon:"RadioCrossBold",size:16}))},u=(0,l.Ay)(o.In)`
  position: absolute;
  top: 6px;
  right: 6px;
  transform: rotate(45deg);
  opacity: 0;
  transition: all 0.24s ease-in-out;
  --icon-color: ${r.b_I};
`,p=l.Ay.button`
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
  ${a.P} {
    color: ${r.ui$};
    text-transform: capitalize;
  }
  &:hover {
    --icon-scale: 1.1;
    outline-color: ${r.NcT};
    ${u} {
      opacity: 1;
    }

    ${a.P} {
      color: ${r.t14};
    }
  }
`},72661:(e,t,n)=>{n.d(t,{Ff:()=>E,KX:()=>v,ue:()=>x});var a=n(67331),r=n(69670),i=n(87046),l=n(14041),o=n(39716),s=n(46288),c=n(58756),d=n(5855),u=n(28926),p=n(66257),m=n(53433),g=n(70144),y=n(39641),f=n(8142);let h=(e,t)=>{let n=1,a=g.QN[e];for(;t.includes(a);)a=`${g.QN[e]} ${n}`,n++;return a},b=(e,t)=>{let n=h(e,t),a={id:(0,s.A)(),sectionTitle:n,sectionType:e};switch(e){case"text":return{...a,sectionType:e,textOptions:{description:""}};case"analysis":return{...a,sectionType:e,analysisOptions:{summaryFocus:""}};case"compare":return{...a,sectionType:e,comparisonOptions:{items:[],reason:""}};case"notes":return{...a,sectionType:e,notesOptions:{goal:""}};case"qna":return{...a,sectionType:e,qaOptions:{questions:[]}};case"table":return{...a,sectionType:e,tableOptions:{columns:[]}}}},x=()=>({sections:[],tab:"Content",editingSection:null,editingSectionIndex:null,editMode:null,confirm:null}),E=(e,t)=>{switch(e.type){case"ReorderSections":return{...t,sections:e.sections};case"ChangedTab":return{...t,tab:e.tab};case"ClickedRemoveSection":if(!e.confirmed)return{...t,confirm:{type:"Confirm",header:"Confirm removing this section",message:`section # ${e.index+1} will be removed permanently.`,cancel:{text:"Cancel",action:{type:"ClickedCancelRemoveSection"}},confirm:{text:"Remove",action:{...e,confirmed:!0}}}};return{...t,sections:t.sections.filter((t,n)=>n!==e.index),confirm:null};case"ClickedCancelRemoveSection":return{...t,confirm:null};case"ClickedMoveSectionUp":{let n=e.index-1;if(n>=0){let a=(0,i.be)(t.sections,e.index,n);return{...t,sections:a}}return t}case"ClickedMoveSectionDown":{let n=e.index+1;if(n<=t.sections.length){let a=(0,i.be)(t.sections,e.index,n);return{...t,sections:a}}return t}case"ClickedEditSection":{let n=t.sections.find((t,n)=>n===e.index);if(!n)return t;return{...t,editingSection:n,editingSectionIndex:e.index,editMode:"edit"}}case"ClickedBackEditSection":return{...t,editingSection:null,editingSectionIndex:null,editMode:null,sections:"create"===t.editMode?t.sections.filter((e,n)=>t.editingSectionIndex!==n):t.sections};case"UpdatedSection":return{...t,editingSection:e.section};case"ClickedSaveSection":return{...t,editingSectionIndex:null,editingSection:null,editMode:null,tab:"Content",sections:t.sections.map((e,n)=>n===t.editingSectionIndex&&t.editingSection||e)};case"ClickedAddNewSection":{let n=b(e.addedType,t.sections.flatMap(t=>t.sectionType===e.addedType?[t.sectionTitle]:[])),a=[...t.sections,n];return{...t,sections:a,tab:"Content",editingSection:n,editingSectionIndex:a.length-1,editMode:"create"}}}},v=e=>{let{state:t,dispatch:n,onSave:i,onBack:o,onCancel:s,allowedTypes:h}=e,{documentRoot:b}=l.useContext(c.o),x=(0,l.useCallback)(e=>{let a=e===t.sections.length-1;return{onEdit:()=>{n({type:"ClickedEditSection",index:e})},onDelete:()=>{n({type:"ClickedRemoveSection",confirmed:!1,index:e})},onUp:0===e?void 0:()=>{n({type:"ClickedMoveSectionUp",index:e})},onDown:a?void 0:()=>{n({type:"ClickedMoveSectionDown",index:e})}}},[t.sections.length,n]),E=e=>{n({type:"ReorderSections",sections:e})},v=e=>()=>{let t=b.querySelector(`#template-editor-main-tem-${e}`);t&&t.scrollIntoView({block:"start",inline:"nearest",behavior:"smooth"})};return l.createElement(l.Fragment,null,t.editingSection&&null!==t.editingSectionIndex?l.createElement(m.x,{section:t.editingSection,dispatch:n}):l.createElement(y.h,{menuWidth:"300px",menu:l.createElement(I,{"data-testid":"writing-assistant-editor-sidebar"},l.createElement(u.tU,{tabs:["Content","Add"],active:t.tab,style:{paddingInlineStart:16},renderTab:e=>l.createElement(u.fI,{gap:8,style:{alignItems:"center"}},"Add"===e&&l.createElement(u.In,{icon:"PlusOutline",size:16}),e),onTabClick:e=>n({type:"ChangedTab",tab:e})}),"Content"===t.tab?l.createElement(S,{gap:8},l.createElement(p.q6,{items:t.sections,onItemsReorder:E},t.sections.map((e,t)=>l.createElement(p.Uq,{id:e.id,key:e.id},l.createElement(f.x,{onClick:v(t),sectionTitle:e.sectionTitle,"aria-label":e.sectionTitle,type:e.sectionType,index:t,...x(t)})))),l.createElement(u.IU,{onClick:()=>{n({type:"ChangedTab",tab:"Add"})},style:{justifyContent:"center"}},l.createElement(u.fI,{gap:4,style:{alignItems:"center"}},l.createElement(u.In,{icon:"PlusOutline",size:16}),l.createElement("span",null,"Add")))):l.createElement(A,null,h.map(e=>l.createElement(g.k5,{key:e,type:e,onClick:()=>{n({type:"ClickedAddNewSection",addedType:e})}}))))},l.createElement(y.h.RightSide,null,l.createElement(y.h.ContentHeader,{onBack:o},l.createElement(u.fI,{center:!0,gap:8},l.createElement(u.$n,{text:"Save template",onClick:i,size:"l",round:!0,variant:"primary",disabled:t.sections.length<1}),l.createElement(u.$n,{icon:"CrossOutline",tooltipText:"Close",round:!0,size:"l",variant:"flat",onClick:s}))),l.createElement(C,null,l.createElement(p.q6,{items:t.sections,onItemsReorder:E},l.createElement(w,null,l.createElement(a.H1,null,"Create your template"),l.createElement(a.P,{style:{marginBottom:16,color:r.ui$}},"You can modify, remove, rearrange and add new sections from the left side bar to customize your report template."),l.createElement(k,null,t.sections.map((e,t)=>l.createElement(p.Uq,{id:e.id,key:e.id},l.createElement(f.C,{"aria-label":e.sectionTitle,sectionTitle:e.sectionTitle,type:e.sectionType,id:`template-editor-main-tem-${t}`,index:t,onClick:()=>{n({type:"ClickedEditSection",index:t})},...x(t)},l.createElement($,{item:e})))))))))),t.confirm&&l.createElement(d.u,{dispatch:n,state:t.confirm}))},C=o.Ay.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-inline: 72px;
  overflow: auto;
  height: 100%;
  align-items: baseline;
`,S=(0,o.Ay)(u.VP)`
  margin-inline: -20px;
  padding-inline: 20px;
  flex: 1;
  overflow: auto;
`,k=(0,o.Ay)(u.VP)`
  gap: 16px;
`,w=(0,o.Ay)(u.VP)`
  max-width: 620px;
  gap: 48px;
  padding: 80px 0px;
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,I=(0,o.Ay)(u.VP)`
  padding: 20px;
  border-inline-end: 1px solid ${r.Tc2};
  width: 100%;
  flex: 1;
  height: 100%;
  gap: 32px;
`,P=(0,o.Ay)(a.P)`
  color: ${r.ui$};
  word-break: break-word;
`,$=e=>{let{item:t}=e;switch(t.sectionType){case"text":return l.createElement(P,{$small:!0},t.textOptions.description);case"analysis":return l.createElement(P,{$small:!0},t.analysisOptions.summaryFocus);case"compare":return l.createElement(P,{$small:!0},t.comparisonOptions.items.join(", "));case"notes":return l.createElement(P,{$small:!0},t.notesOptions.goal);case"qna":if("question"in t.qaOptions)return l.createElement(P,{$small:!0},t.qaOptions.question);return l.createElement(P,{$small:!0},t.qaOptions.questions.map(e=>"string"==typeof e?e:e.name).join(", "));case"table":return l.createElement(P,null,t.tableOptions.columns.map(e=>e.name).join(", "))}}},30451:(e,t,n)=>{n.d(t,{F:()=>l});var a=n(46288),r=n(72661),i=n(83670);let l=(e,t)=>{switch(e.type){case"ChangedRole":return{...t,llmRole:e.value};case"ChangedPurpose":return{...t,purpose:e.value};case"GoToPreviousPage":return{...t,page:(0,i.HK)(t)};case"ChangedPresetQuestion":if("free-text"==e.form){let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:e.answer}:t);return{...t,preSetQuestions:n}}if(e.checked){let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:[...new Set([...t.answer.split(", "),...e.answer.split(", ")])].join(", ")}:t);return{...t,preSetQuestions:n}}{let n=t.preSetQuestions.map((t,n)=>n===e.index?{...t,answer:t.answer.replace(e.answer,"")}:t);return{...t,preSetQuestions:n}}case"ClickedContinueQuestion":return{...t,page:"sections-editor",templateEditorState:{...t.templateEditorState,sections:[],tab:"Add",editingSection:null,editingSectionIndex:null,confirm:null,editMode:null}};case"ClickedSaveTemplate":return{...t,page:t.isEditing?"edit":"name",sections:t.templateEditorState.sections.flatMap(e=>"text"!==e.sectionType?[e]:[])};case"TemplateEditorAction":{let n=r.Ff(e.action,t.templateEditorState);return{...t,templateEditorState:n}}case"ChangedName":return{...t,name:e.value};case"ClickedEditTemplate":return{...t,page:"sections-editor",templateEditorState:{...t.templateEditorState,sections:t.sections.map(e=>({...e,id:(0,a.A)()}))}}}}},89615:(e,t,n)=>{n.d(t,{i:()=>d,F:()=>s});var a=n(46288),r=n(37217),i=n(72661),l=n(67226);let o=r.I.getLogger("OpenAiComponents"),s=(e,t)=>{let n=e=>({...t,...e});switch(e.type){case"TemplateEditorAction":return[n({templateEditorState:i.Ff(e.action,t.templateEditorState)}),[]];case"GoToPreviousPage":return[n({page:(0,l.HK)(t),finalizingStep:!1}),[]];case"SetPage":return[n({page:e.page,finalizingStep:!1}),[]];case"AddFewShotData":return[n({page:"answer-preset-questions",selectedTarget:t.selectedTarget?{...t.selectedTarget,context_questions:e.computedContextualQuestions,profile_questions:e.computedProfileQuestions}:null}),[]];case"StartProfilePlaybook":return[n({page:"loading-context",finalizingStep:!1}),[async t=>{let{api:n,controller:a,dispatch:r}=t,i=await n.playbookEditor2_GetBCLPlaybookAsUIAst(e.name,e.code),l=await n.playbookEditor2_RunWithResult(i,{enforcePremium:!1,storeResults:!1});r({type:"AddFewShotData",...await a.populateAnswers(e.target.context_questions,e.target.profile_questions,e.target.name,l.map(e=>e.text).join("\n"))})}]];case"SetTarget":{let r=e.target.sections.map(e=>{let{section:t,description:n}=e;return{sectionType:"text",sectionTitle:t,textOptions:{description:n}}});return[n({selectedTarget:e.target,sections:r,finalizingStep:!0,templateEditorState:{...t.templateEditorState,sections:r.map(e=>({...e,id:(0,a.A)()}))}}),[c(t=>{let{email:n,userName:a,playbook:r}=t;return[{type:"SetTargetSuccess",email:n,userName:a,playbook:r},r?{type:"StartProfilePlaybook",id:r.id,name:r.name,code:r.bcl,playbook_description:r.playbook_descriptions,target:e.target}:{type:"SetPage",page:"answer-preset-questions"}]})]]}case"SetTargetSuccess":return[n({userEmail:e.email,userName:e.userName,fewshotPlaybook:e.playbook,finalizingStep:!1}),[]];case"SetPresetQuestionAnswer":{let a;if(!t.selectedTarget)return[t,[]];let{context_questions:r}=t.selectedTarget;return a="free-text"==e.form?r.map((t,n)=>n===e.index?{...t,answer:e.answer}:t):e.checked?r.map((t,n)=>n===e.index?{...t,answer:[...new Set([...t.answer.split(", "),...e.answer.split(", ")])].join(", ")}:t):r.map((t,n)=>n===e.index?{...t,answer:t.answer.replace(e.answer,"")}:t),[n({selectedTarget:{...t.selectedTarget,context_questions:a}}),[]]}case"FinalizePresetQuestions":return[n({finalizingStep:!0}),[async e=>{let{controller:n,dispatch:a}=e;if(!t.selectedTarget)return;let r=await n.createContext(t.selectedTarget.context_questions.map(e=>({question:e.question,answer:e.answer})),t.selectedTarget.value);o.debug(r),a({type:"FinalizePresetQuestionsSuccess",context:r})}]];case"FinalizePresetQuestionsSuccess":return[n({context:e.context,finalizingStep:!1,page:"build-profile"}),[]];case"SetProfileQuestionAnswer":{let a;if(!t.selectedTarget)return[t,[]];let{profile_questions:r}=t.selectedTarget;return a="free-text"==e.form?r.map((t,n)=>n===e.index?{...t,answer:e.answer}:t):e.checked?r.map((t,n)=>n===e.index?{...t,answer:[...new Set([...t.answer.split(", "),...e.answer.split(", ")])].join(", ")}:t):r.map((t,n)=>n===e.index?{...t,answer:t.answer.replace(e.answer,"")}:t),[n({selectedTarget:{...t.selectedTarget,profile_questions:a}}),[]]}case"FinalizeProfileQuestions":{if(!t.selectedTarget)return[t,[]];let{profile_questions:e}=t.selectedTarget;return[n({finalizingStep:!0}),[async n=>{let{controller:a,dispatch:r}=n;r({type:"FinalizeProfileQuestionsSuccess",profile:await a.createUserProfile(t.userName,e.map(e=>({question:e.question,answer:e.answer})))})}]]}case"FinalizeProfileQuestionsSuccess":return[n({profile:e.profile,finalizingStep:!1,page:"sections-update",templateEditorState:{...t.templateEditorState,tab:"Content",editingSection:null,editingSectionIndex:null,confirm:null,editMode:null}}),[]];case"ClickedEditTemplate":return[n({page:"sections-update",finalizingStep:!1,templateEditorState:{tab:"Content",sections:t.sections.map(e=>({...e,id:(0,a.A)()})),editingSection:null,editingSectionIndex:null,confirm:null,editMode:null}}),[]];case"ChangedName":return[n({name:e.text}),[]];case"ClickedSaveTemplate":return[n({page:t.isEditing?"edit":"set-name",sections:t.templateEditorState.sections.flatMap(e=>"text"===e.sectionType?[e]:[])}),[]]}},c=e=>async t=>{let{api:n,dispatch:a}=t,{email:r,userName:i,playbook:l}=await d(n);e({email:r,userName:i,playbook:l}).forEach(a)},d=async e=>{let t=await e.systemBardeenAccountProfileGet(),n=t.email,a=t.userName,r={id:"4cf5930a-6683-41c2-bb23-f0c81a1158e9",name:"Setting up your profile",bcl:`function () {
    BardeenEnrichment.get_persons_data_from_email(email: B.Emailaddress(_id: '${n}'));
  }`,playbook_descriptions:"Enriching your information"};return{email:n,userName:a,playbook:r}}},67226:(e,t,n)=>{n.d(t,{HK:()=>s,Q_:()=>o,SV:()=>l,Ur:()=>c});var a=n(99420),r=n.n(a),i=n(72661);let l="choose-email-type",o=["sections-update"],s=e=>({"choose-email-type":"choose-email-type","loading-context":"loading-context","answer-preset-questions":"choose-email-type","build-profile":"answer-preset-questions","sections-update":e.isEditing?"edit":"build-profile","set-name":"sections-update",edit:"edit"})[e.page];function c(e,t,n){let a=!!n,l=n||e.find(e=>e.value===t?.emailType)||null;return{availableTargets:e,selectedTarget:l??null,page:a?"loading-context":t?"edit":"choose-email-type",isEditing:!!t,name:t?.name||(l?.name?`${l?.name} (${r()(new Date).format("MMM DD YYYY")})`:""),llmRole:t&&t.llmRole?t.llmRole:"Outreach Assistant",context:t?.context||"",profile:t?.profile||"",connection:{type:"active"},busyCalls:[],playbooks:[],fewshotPlaybook:null,playbookResponse:[],userName:t?.userName||"",userEmail:t?.email||"",finalizingStep:!1,templateEditorState:i.ue(),saving:!1,sections:t?.template||a&&l?.sections.map(e=>{let{section:t,description:n}=e;return{sectionType:"text",sectionTitle:t,textOptions:{description:n}}})||[]}}},87613:(e,t,n)=>{n.d(t,{B:()=>g,Q:()=>m});var a=n(69670),r=n(14041),i=n(39716),l=n(48266);let o=e=>{let{children:t,className:n,icon:a,leftAddon:i,rightAddon:o,round:m=!1,center:g=!1,style:y,variant:f,inline:h=!1,...b}=e;return r.createElement(d,{className:n,style:y,role:"alert",...b,tabIndex:e.onClick?1:void 0,$variant:f,$round:m,$inline:h,$center:g},a?r.createElement(u,null,r.createElement(l.In,{icon:a,color:s[f].iconColor,size:16})):null,i,r.createElement(c,null,t),e?.onClick?r.createElement(u,null,r.createElement(p,{icon:"FullArrowRightOutline",color:s[f].arrowColor})):null,o)},s={credits:{bgColor:a.FbJ,iconColor:a.VSB,arrowColor:a.VSB,borderColor:a.i5z,borderColorHover:a.VSB,bgColorHover:a.fMC,color:a.vh3},warning:{bgColor:a.ZE3,bgColorHover:a.SfY,borderColor:a.O$e,borderColorHover:a.O$e,iconColor:a.eJD,arrowColor:a.eJD},critical:{bgColor:a.P0$,bgColorHover:a.JIy,borderColor:a.JIy,borderColorHover:a.MEI,iconColor:a.KE7,arrowColor:a.CCs},info:{bgColor:a.UU9,bgColorHover:a.o_k,borderColor:a.o_k,borderColorHover:a.LRT,iconColor:a.IVJ,arrowColor:a.$yM},success:{bgColor:a.UFl,bgColorHover:a.$2P,borderColor:a.$2P,borderColorHover:a.wKm,iconColor:a.lhO,arrowColor:a.XxH}},c=i.Ay.div`
  white-space: pre-wrap;
  text-wrap: pretty;
  flex-grow: 1;
  word-break: break-word;
  max-width: 100%;
`,d=i.Ay.div`
  transition: 0.3s;
  display: flex;
  justify-content: ${e=>e.$center?"center":"flex-start"};
  background: ${e=>s[e.$variant].bgColor};
  border: 1px solid ${e=>s[e.$variant].borderColor};
  border-radius: ${e=>e.$round?"8px":void 0};
  padding: 14px 24px;
  color: ${e=>s[e.$variant].color??a.CP};
  gap: 16px;
  cursor: ${e=>e.onClick?"pointer":"auto"};
  width: ${e=>e.$inline?"fit-content":"100%"};

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  & ${c} {
    flex-grow: ${e=>e.$center?"0":"1"};
  }

  &:hover {
    background-color: ${e=>e.onClick?s[e.$variant].bgColorHover:void 0};
    border: ${e=>e.onClick?`1px solid ${s[e.$variant].borderColorHover}`:void 0};
  }
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  height: 24px;
`,p=(0,i.Ay)(l.In)`
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
`,m=(0,i.Ay)(o)`
  position: sticky;
  top: 0;
`,g=Object.assign(o,{Content:c})},82212:(e,t,n)=>{n.d(t,{Y:()=>c});var a=n(69670),r=n(14041),i=n(39716),l=n(48266);let o={s:"12px",m:"14px",l:"16px"},s={s:12,m:14,l:16},c=e=>{let{children:t,size:n,disabled:a,...i}=e;return r.createElement(d,{$size:n,$disabled:a,...i,tabIndex:a?0:1},t," ",r.createElement(l.In,{icon:"KeyArrowRight",className:"arrow",size:s[n]}))},d=i.Ay.a`
  color: ${a.wmS};
  position: relative;
  transition: all 0.2s ease-in-out;
  line-height: 16px;
  font-size: ${e=>{let{$size:t}=e;return o[t]}};
  color: ${a.t14};
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  :focus-visible {
    box-shadow: 0px 0px 0px 2px ${a.t14}3d;
  }
  ${e=>{let{$disabled:t}=e;return t&&(0,i.AH)`
      pointer-events: none;
      opacity: 0.32;
    `}}
  .arrow {
    position: absolute;
    right: 5px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    color: ${a.t14};
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    color: ${a.t14};
    padding-right: 18px;

    .arrow {
      opacity: 1;
      right: 0;
    }
  }
`},20285:(e,t,n)=>{n.d(t,{pT:()=>m,nA:()=>c});var a=n(69670),r=n(67331),i=n(14041),l=n(39716),o=n(7711),s=n(88260);let c=(0,l.Ay)(s.a)`
  width: 512px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 48px 40px;
  text-align: center;
`,d=l.Ay.div`
  display: flex;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`,u=l.Ay.div`
  color: ${a.t14};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.25px;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: pretty;
`,p=(0,l.Ay)(r.P)`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`,m=Object.assign(i.memo(e=>{let{header:t,onClose:n,confirmBtn:a,cancelBtn:r,closeBtn:l,children:s,...m}=e;return i.createElement(c,{coordinatesAware:!0,isOpen:!0,onClose:()=>n?.(),id:"confirm",...m},t?i.createElement(u,{"data-testid":"header"},t):null,s?i.createElement(p,{"data-testid":"content"},s):null,a||r?i.createElement(d,null,a,r):null,n?l||i.createElement(o.J,{onClick:n,abs:!0}):null)}),{Header:u,Body:p,Actions:d})},61788:(e,t,n)=>{n.d(t,{U:()=>i});var a=n(14041),r=n(37345);let i=e=>{let t=`Dear support team, I will need XXXX more credits to continue my work. Please help me upgrade my account. My e-mail is ${e.profileEmail}`,n=`mailto:premium_support@bardeen.ai?subject=${encodeURIComponent("Upgrade Request")}&body=${encodeURIComponent(t)}`;if(e.link)return a.createElement("a",{href:n,target:"_blank"},"premium_support@bardeen.ai");let{profileEmail:i,link:l,text:o="Contact Support",...s}=e;return a.createElement(r.$n,{text:o,round:!0,size:"xl",type:"submit",href:n,...s})}},8432:(e,t,n)=>{n.d(t,{h:()=>i});var a=n(14041),r=n(37345);let i=e=>{let t=String(e.credits);return a.createElement(r.$n,{variant:"ghost",icon:"TexturedCredits",style:l,text:t,...e})},l={fontWeight:500}},48603:(e,t,n)=>{n.d(t,{_:()=>c});var a=n(69670),r=n(14041),i=n(39716),l=n(87613),o=n(27461),s=n(48266);let c=r.memo(function(e){let t=e.actions.some(e=>e.cached),n=e.actions.reduce((e,t)=>t.cached?e:e+t.costMicroCredits,0);return r.createElement(d,{"data-testid":"credit-breakdown"},r.createElement(u,null,r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Action"),r.createElement("th",null,"Cost / Output"),r.createElement("th",null,"Outputs"),r.createElement("th",null,"Cost"))),r.createElement("tbody",null,e.actions.map((e,t)=>r.createElement(p,{key:t,$cached:e.cached},r.createElement("td",null,r.createElement(s.In,{icon:e.icon}),e.title),r.createElement("td",null,Math.round(0===e.costMicroCredits?0:e.costMicroCredits/e.outputs/1e3)," ","Cr."),r.createElement("td",null,e.outputs," "),r.createElement("td",null,Math.round(e.costMicroCredits/1e3)," Cr.")))))),r.createElement(o.fI,{"data-testid":"playbook-total-cost",style:{paddingInline:16}},r.createElement("strong",null,"Total: "),r.createElement("strong",{style:{marginLeft:"auto"}},Math.round(n/1e3)," Cr.")),e.preview?r.createElement(l.B,{round:!0,variant:"info",style:{textAlign:"center"}},"Testing is free - limited to 5 outputs / action"):null,t?r.createElement(l.B,{round:!0,variant:"info",style:{textAlign:"center"}},"Some actions re-used existing data from a previous run and were not billed."):null)}),d=i.Ay.div`
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
    color: ${a.CP};
    position: sticky;
    top: 0;
    background-color: ${a.ONy};
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
    background-color: ${a.o$k};
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:not(:last-child) {
      border-right: 1px solid ${a.Tc2};
    }
  }

  tr {
    line-height: 24px;
    position: relative;
    border-bottom: 1px solid ${a.Tc2};

    svg {
      vertical-align: middle;
      margin-right: 12px;
    }
  }
`,u=i.Ay.div`
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${a.Tc2};
  max-height: 70vh;
  overflow-y: auto;
`,p=i.Ay.tr`
  ${e=>{let{$cached:t}=e;return t&&`
    td {
      text-decoration: line-through;
    }
  `}}
`},82242:(e,t,n)=>{n.d(t,{Sk:()=>y,ke:()=>g,ms:()=>h,rx:()=>f});var a=n(69670),r=n(85148),i=n(26584),l=n(4630),o=n(14041),s=n(39716),c=n(58756),d=n(21714),u=n(27461),p=n(48266),m=n(65947);let g=s.Ay.div`
  padding: 14px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${a.CP};
  background-color: ${a.ONy};
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${a.ONy};
`,y=e=>{let{ref:t,...n}=e,a=(0,o.useRef)(null),i=(0,r.SV)([a,t]);(0,o.useLayoutEffect)(()=>{let e=setTimeout(()=>{a.current?.focus({preventScroll:!0})},10);return()=>clearTimeout(e)},[]);let l=n.view&&"ghost"===n.view?m.dN.Ghost:m.dN.Flat;return o.createElement(l,{ref:i,placeholder:"Search here...",addonBefore:o.createElement(p.In,{icon:"MagnifierOutline"}),size:"l",...n})},f=s.Ay.hr`
  border: none;
  border-bottom: ${a.Tc2} 1px solid;
  margin: 0;
`,h=e=>{let{children:t,noPadding:n,autoCloseOnContentClick:a=!1,anchor:s,customAnchorPoints:p,placement:m="bottom-end",width:g,fullWidth:y,height:h,style:v,offset:C,strategy:S="fixed",behavior:k="resize",renderContent:w,renderHeader:A,renderFooter:I,isOpen:P,bare:$,onIsOpenChanged:T,...F}=e,[R,M]=(0,o.useState)(!1),{portalInsertionPoint:O}=(0,o.useContext)(c.o),_=P??R,N=T??M,B=(0,o.useCallback)(()=>N(!1),[N]),D=(0,o.useCallback)(()=>{a&&B()},[a,B]),H=(0,o.useRef)(h);H.current=h;let z="inline"===S,{refs:L,floatingStyles:U,context:V}=(0,r.we)({open:_&&!z,onOpenChange:N,middleware:[(0,i.cY)(e=>{let{rects:t}=e;return k.includes("over")?-t.reference.height:C||10}),(0,i.Ej)({apply:e=>{let{availableHeight:t,elements:n,rects:a}=e,r=n.floating.style;switch(k.includes("over")&&(r.width=`${g||a.reference.width}px`),k){case"shift":case"flip-over":case"over":break;case"resize":{let e=H.current&&H.current<t?H.current:t;r.maxHeight=`${e-16}px`;break}case"resize-over":{let e=H.current&&H.current<t?H.current:t;r.maxHeight=`${e-16}px`;break}case"flip":case"flip-shift":H.current&&(r.maxHeight=`${H.current-16}px`)}y&&(r.width=`${a.reference.width}px`)}}),k.includes("flip")?(0,i.UU)():void 0,k.includes("shift")||"over"===k?(0,i.BN)({mainAxis:!0,crossAxis:!0}):void 0],whileElementsMounted:l.ll,strategy:"fixed-scrollable"===S?"fixed":"inline"===S?"absolute":S,placement:k.includes("over")?"bottom-start":m}),q=(0,r.ju)(V,{...p||{},enabled:!!p&&!z}),j=(0,r.s9)(V,{enabled:!z}),{isMounted:W,styles:G}=(0,r.DL)(V,{duration:200}),{getReferenceProps:Y,getFloatingProps:Q}=(0,r.bv)(z?[]:[j,q]),J=(0,o.useCallback)(e=>()=>{B(),e()},[B]),Z=z?{display:_?"inline-block":"none",width:y?"100%":g?`${g}px`:void 0,...h&&{height:`${h}px`}}:{},X=z&&h?(()=>{let e=A?76:0,t=I?76:0;return{height:`${Math.max(h-e-t,100)}px`,flex:"1 1 auto",minHeight:0,overflow:"hidden"}})():{},K=o.createElement(E,{"data-testid":"dropdown-wrapper",$bare:$,$width:g,$height:h,$fullWidth:y,$isInline:z,style:{...z?{}:{...U,...G},...Z,...v},...z?{}:Q(),...F,ref:z?void 0:L.setFloating},A&&o.createElement(u.VP,{gap:8,style:{margin:8,marginBottom:0}},A?.({close:B,isOpen:_,closeAnd:J}),o.createElement(f,null)),o.createElement(u.mH,{"data-testid":"dropdown-results",onClick:e=>{let t=e.target instanceof HTMLElement?e.target:null;t?.closest("[data-no-autoclose]")||D()},itemGap:4,style:{...z?{}:{minHeight:48},paddingInline:8,...n&&{paddingInline:0},...X}},w({close:B,isOpen:_,closeAnd:J})),I&&o.createElement(u.VP,{gap:8,style:{margin:8,marginTop:0}},I?.({close:B,isOpen:_,closeAnd:J}))),ee=(()=>{if("inline"===S)return K;if(!W)return null;switch(S){case"fixed":return x(b(K),O);case"fixed-scrollable":return x(K,O);case"absolute":return K}})();return o.createElement(o.Fragment,null,(0,o.isValidElement)(t)&&(0,o.cloneElement)(t,Y({ref:z?void 0:L.setReference,...(0,d.rX)(t)&&t.props,onClick:e=>{(0,d.rX)(t)&&t.props.onClick?.(e),N(!_)}})),ee)},b=e=>o.createElement(r.zR,null,e),x=(e,t)=>o.createElement(r.XF,{root:t},e),E=s.Ay.div`
  background: ${a.ONy};
  width: ${e=>{let{$width:t,$fullWidth:n,$isInline:a}=e;return a&&n?"100%":t?`${t}px`:a?"auto":"244px"}};
  height: ${e=>{let{$height:t,$isInline:n}=e;return n&&t?`${t}px`:"auto"}};
  max-height: ${e=>{let{$height:t,$isInline:n}=e;return n?t?`${t}px`:"none":t?`min(${t}px, 100vh)`:"100vh"}};
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
`},49416:(e,t,n)=>{var a=n(69670);n(14041);var r=n(39716),i=n(27461);r.Ay.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  top: 0;
  left: 0;
`,(0,r.Ay)(i.VP)`
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0);

  animation: fadeOut 0.5s ease-in-out forwards;

  @keyframes fadeOut {
    from {
      box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0);
    }
    to {
      box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.88);
    }
  }

}
`,r.Ay.div`
  width: 320px;
  height: 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.24);
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    height: 2px;
    width: 0%;
    background: ${a.ONy};
    animation: progress 3s ease-in-out 0.5s forwards;
    border-radius: 6px;
  }

  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: calc(100% - 4px);
    }
  }
`},43885:(e,t,n)=>{n.d(t,{c:()=>o});var a=n(69670),r=n(14041),i=n(39716),l=n(97638);let o=e=>{let{action:t,right:n,onClick:a,children:i,...l}=e;return r.createElement(s,{tabIndex:a?0:void 0,role:a?"button":void 0,onClick:a,...l},i,r.createElement("div",{style:{flex:1,textAlign:"right"}},n),t?r.createElement(c,null):null,t)};o.Caption=i.Ay.h6`
  color: ${a.wmS};
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.1px;
`,o.List=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`,o.Main=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;let s=i.Ay.div`
  padding: 12px 24px;
  outline: 1px solid ${a.Tc2};
  border-radius: 99999px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  cursor: ${e=>e.onClick?"pointer":"default"};
  border: 2px solid transparent;
  color: ${a.CP};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  min-height: 72px;
  text-align: left;

  transition: all 0.2s ease-in-out;
  --icon-size: 30px;
  --icon-scale: 1;

  ${e=>e.onClick&&(0,i.AH)`
      &:active,
      &.pseudo-active,
      &:hover,
      &.pseudo-hover,
      &:focus,
      &.pseudo-focus {
        border-color: ${a.NcT};
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.04);
      }
    `}
  ${l.e.Component} {
    margin-left: -12px;
  }
`,c=i.Ay.div`
  width: 1px;
  height: 32px;
  background: ${a.Tc2};
`},42400:(e,t,n)=>{n.d(t,{IU:()=>m,TO:()=>g,ko:()=>f,lm:()=>y});var a=n(78445),r=n(69670),i=n(54357),l=n(14041),o=n(39716),s=n(53747),c=n(9106),d=n(48266),u=n(85934),p=n(33808);let m=(0,o.Ay)(l.memo(e=>{let{ref:t,size:n="m",leftAddon:r,...o}=e,{icon:c,text:u,rightAddon:p,disabled:m,className:g,active:y,children:f,...E}=o,{ref:v,showTooltip:C}=(0,s.Q)(),S=l.useMemo(()=>l.createElement(x,{ref:v,className:"text"},f||u),[u,f,v]),k=l.createElement(h,{ref:t,className:(0,i.A)({disabled:m,active:y},g,"menubutton-parent"),"aria-selected":y,disabled:m,$size:n,...E},r?l.createElement(b,{style:{flexGrow:0}},r):null,c?l.createElement(d.In,{icon:c,size:"s"===n?14:20}):null,S,p?l.createElement(b,null,p):null);return C?l.createElement(a.m,{content:"string"==typeof(f||u)?f||u:null,placement:"bottom",delay:500,size:"m",style:{zIndex:1}},k):k}))``,g=e=>l.createElement(m,{...e,rightAddon:l.createElement(c.S,{tabIndex:-1,checked:e.checked,onChange:()=>{}})}),y=(0,o.Ay)(e=>{let t=l.createElement(u.q,{tabIndex:-1,checked:e.checked,onChange:()=>{}});return l.createElement(m,{...e,rightAddon:t})})``,f=e=>{let t=l.createElement(p.l,{size:"m",label:e.text,checked:e.checked});return l.createElement(m,{...e,onClick:e.onClick,rightAddon:t})},h=o.Ay.button`
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
`,b=o.Ay.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`,x=o.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  text-align: start;
  word-break: break-all;
`},64744:(e,t,n)=>{n.d(t,{R:()=>u,a:()=>o});var a=n(69670),r=n(14041),i=n(39716),l=n(39241);let o=r.memo(e=>{let{size:t="m",variant:n,...a}=e,[i,...l]=r.Children.toArray(e.children).filter(e=>null!=e),o=!l.length&&1===`${i}`.length;return r.createElement(d,{$round:o,$size:t,$variant:n,...a})}),s={xs:{size:"12px",iconSize:6,padding:"2px 5px",lh:"8px",fontSize:"8px",gap:"3px"},s:{size:"16px",iconSize:8,padding:"3px 6px",lh:"10px",fontSize:"10px",gap:"4px"},m:{size:"20px",iconSize:12,padding:"6px 8px",lh:"12px",fontSize:"12px",gap:"6px"},l:{size:"24px",iconSize:12,padding:"6px 10px",lh:"16px",fontSize:"14px",gap:"8px"}},c={gray:{bgColor:`${a.Ql9}0a`,iconColor:a.l0o,textColor:a.FCg},plum:{bgColor:`${a.KxS}`,iconColor:a.b_I,textColor:a.t14,border:`1px solid ${a.Q_2}`},melon:{bgColor:`${a.jK0}`,iconColor:a.zIe,textColor:a.g7N,border:`1px solid ${a.vNc}`},error:{bgColor:a.P0$,iconColor:a.KE7,textColor:a.CCs},warning:{bgColor:a.bCn,iconColor:a.eJD,textColor:a.HOM},success:{bgColor:a.IhC,iconColor:a._fY,textColor:a.J5m},dark:{bgColor:a.CP,iconColor:a.l0o,textColor:a.ONy},premium:{bgColor:a.ONy,iconColor:a.wl$,textColor:a.S5v,border:`1px solid ${a.Tc2}`}},d=i.Ay.div`
  align-items: center;
  background-color: ${e=>c[e.$variant].bgColor};
  border-radius: 12px;
  border: ${e=>c[e.$variant].border};
  color: ${e=>c[e.$variant].textColor};
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

  --icon-color: ${e=>c[e.$variant].iconColor};
  --icon-size: ${e=>s[e.$size].iconSize}px;
`,u=(0,i.Ay)(e=>r.createElement(o,{...e,variant:"premium",size:e.small?"s":"m"},r.createElement(l.E,null)," Premium"))`
  > svg {
    margin-bottom: 2px;
    margin-inline: 1px;
  }
`},43986:(e,t,n)=>{n.d(t,{s:()=>u});var a=n(14041),r=n(68543),i=n(61994),l=n(46441),o=n(65016),s=n(8445);function c(e){return a.createElement(a.Fragment,null,e.split(/(\r?\n)+/).filter((e,t)=>t%2==0).map((e,t)=>a.createElement("p",{key:`${e}-${t}`},a.createElement(l.d,{text:e}))))}let d=e=>{let{href:t,children:n,...r}=e;return a.createElement("a",{href:t,target:"_blank",rel:"noopener noreferrer",...r},n)};class u extends a.Component{shouldComponentUpdate(e){return e.text!==this.props.text||e.format!==this.props.format}render(){let{text:e,format:t,...n}=this.props,l=null;switch(t){case"markdown":l=a.createElement(r.oz,{components:{a:d},...n},e);break;case"pre":l=a.createElement(o.D,{text:e,...n});break;case"plaintext":l=a.createElement("span",n,c(e));break;case"html":l=-1===e.indexOf("<")?a.createElement("span",n,c(e)):a.createElement(s.F,{html:e,...n});break;default:return null}return a.createElement(i.EY,null,l)}}},38437:(e,t,n)=>{n.d(t,{l:()=>g});var a=n(13014),r=n(90381),i=n(54357),l=n(14041),o=n(58756),s=n(9106),c=n(48266),d=n(38940),u=n(61994),p=n(69670);let m=(0,n(85040).A)(e=>({paperRoot:{borderRadius:e.spacing()+2,border:"1px solid rgba(0, 0, 0, 0.04)",boxShadow:"0px 2px 8px rgba(0, 0, 0, 0.06)",backgroundColor:p.ONy},selectRoot:{display:"flex",padding:e.spacing(2,6,2,2),color:p.UmY,border:`1px solid ${p.MfC}`,borderRadius:e.spacing(2),"&:focus":{borderRadius:e.spacing(2),backgroundColor:"transparent"}},disabled:{color:p.l0o},select:{display:"flex"},menuRoot:{padding:e.spacing(2),zIndex:e.zIndex.tooltip},menuItem:{padding:`${e.spacing()}px ${e.spacing(3)}`,borderRadius:e.spacing(),color:p.ui$,"&:not(:first-child)":{marginTop:e.spacing(1)},"&:hover, &.Mui-selected, &.Mui-selected:hover ":{color:p.t14,backgroundColor:p.KxS}},menuItemContent:{display:"flex",alignItems:"center",flex:1},menuItemIcon:{marginRight:e.spacing(4)},icon:{top:"50%",right:e.spacing(),transform:"translate(0, -50%)",fill:p.ydb},iRoot:{color:p.CP,border:`1px solid ${p.Tc2}`,"&.MuiSelect-select":{"& $menuItemIcon":{color:p.wB3},padding:e.spacing(3.5,8,3.5,4)},"& ~ $icon":{top:"50%",left:`calc(100% - ${e.spacing(6)})`,transform:"translate(0, -50%)",fill:p.ui$}},iMenuRoot:{"& $menuItem":{padding:e.spacing(4),"&:hover, &.Mui-selected, &.Mui-selected:hover ":{color:p.t14,backgroundColor:"#F8F8FD"}}},fatRoot:{border:"none"},radioRootSelect:{color:p.CP,border:"none","&.MuiSelect-select":{"& $menuItemIcon":{color:p.wB3},padding:e.spacing(2.5,3,2.5,3)},"& .bardeen-icon, & .radio-icon-checked, & .radio-icon, & .all-categories-checkbox":{opacity:"0",position:"absolute"}},checkbox:{padding:"0px !important",marginRight:"-2px"},defaultText:{marginRight:e.spacing(4),flex:1},radioLabel:{width:"100%"},radioRoot:{padding:"0 !important"},arrow:{color:p.UmY,"&.passive":{color:p.ydb}}}));function g(e){let{type:t="default",options:n,value:p,onChange:g,multiple:y,selectClasses:f,menuItemClassName:h,disabled:b,disablePortal:x=!1,...E}=e,[v,C]=l.useState(null),S=l.useContext(o.o),k=m(),w=l.useCallback(e=>{let{value:t}=e.target;if(y){let e="string"==typeof t?t.split(","):t;g&&g(e)}else g&&g(t)},[y,g]),A=l.useCallback(e=>{let{label:n,labelValue:a}=e;switch(t){case"default":case"flat":case"input":return l.createElement("div",{className:k.menuItemContent,"aria-label":n||a},n||a);case"radio":return a?l.createElement(d.s,{labelClassName:k.radioLabel,radioRootClassName:k.radioRoot,checked:p===a,label:n,labelPlacement:"start"}):l.createElement("div",{className:k.menuItemContent,"aria-label":n||a},l.createElement(u.EY,{className:k.defaultText},n),l.createElement(s.S,{className:(0,i.A)(k.checkbox,"all-categories-checkbox"),checked:p===a,onChange:()=>{}}))}},[k,t,p]),I=l.useMemo(()=>{let e={container:S.portalInsertionPoint,TransitionProps:{exit:!1},MenuListProps:{classes:{root:(0,i.A)(k.menuRoot,{[k.iMenuRoot]:"input"===t})}},PopoverClasses:{paper:k.paperRoot},PaperProps:{classes:{root:k.paperRoot}}};return x&&(e.disablePortal=!0,e.anchorReference="none",v&&(e.anchorEl=v)),e},[S.portalInsertionPoint,k.menuRoot,k.iMenuRoot,k.paperRoot,t,x,v]);return l.createElement(a.A,{...E,ref:C,disabled:b,multiple:y,value:p,onChange:w,variant:"standard",IconComponent:e=>l.createElement(c.In,{icon:"ArrowDownOutline",size:14,...e}),classes:{root:(0,i.A)(k.selectRoot,{[k.iRoot]:"input"===t,[k.fatRoot]:"flat"===t,[k.radioRootSelect]:"radio"===t}),select:k.select,icon:k.icon,disabled:k.disabled,...f},MenuProps:I},n.map(e=>l.createElement(r.A,{classes:{root:(0,i.A)(k.menuItem,h)},key:e.label,value:e.value},e.icon?l.createElement(c.In,{className:k.menuItemIcon,icon:e.icon,size:16}):null,A({label:e.label,labelValue:e.value}))))}},37204:(e,t,n)=>{n.d(t,{U_:()=>s});var a=n(69670),r=n(39716),i=n(63695);let l=r.Ay.div`
  display: flex;
  height: 100%;
  @media screen and (min-height: 500px) and (min-width: 1024px) {
    --margin: 32px;
  }
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`,o=r.Ay.div`
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
  border-left: 1px solid ${a.Tc2};
`,s=Object.assign(l,{ContentSide:r.Ay.div`
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
`,ImageSide:o,Image:(0,r.Ay)(i.o)`
  padding: 64px 96px;
  img {
    max-height: 540px;
  }
`})},45393:(e,t,n)=>{n.d(t,{m:()=>d});var a=n(69670),r=n(14041),i=n(39716),l=n(9005),o=n(9930);let s=(0,i.Ay)(l.y)`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  color: ${e=>"onboarding"===e.$variant?a.wB3:a.TJO};
  fill: ${a.ONy};
  flex-shrink: 0;
`,c=(0,i.Ay)(o.n)`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  color: ${a.KE7};
  flex-shrink: 0;
`,d=(0,i.Ay)(e=>{let{children:t,$variant:n,locked:a,size:i,...l}=e;return r.createElement("div",l,a?r.createElement(c,null):r.createElement(s,{$variant:n}),r.createElement("div",null,t))})`
  display: flex;
  align-items: center;
  gap: ${e=>"onboarding"===e.$variant?32:12}px;
  font-size: ${e=>"xl"===e.size?"18px":"14px"};
  font-weight: ${e=>"xl"===e.size?"500":"400"};
  line-height: 1.6;
  color: ${e=>"xl"===e.size?a.CP:a.ui$};
  svg {
    margin-left: ${e=>"xl"===e.size?"24px":"0"};
    width: ${e=>"xl"===e.size?"20px":"16px"};
    height: ${e=>"xl"===e.size?"20px":"16px"};
  }
`},51402:(e,t,n)=>{n.d(t,{uA:()=>eC,qi:()=>eS,Ff:()=>ev});var a=n(67331),r=n(38792),i=n.n(r),l=n(14041),o=n(36884),s=n(14744),c=n(49861),d=n(117),u=n(67469),p=n(64942),m=n(69670),g=n(45250),y=n(39716),f=n(99538),h=n(62987),b=n(72194),x=n(45742),E=n(85170),v=n(53136),C=n(61462),S=n(45281),k=n(13489),w=n(77956),A=n(72865),I=n(48143),P=n(28926),$=n(42014),T=n(20120);let F={type:"Custom",displayHint:{label:"Back",icon:"FullArrowLeftOutline",description:"Go back to the previous level"}};function R(e){if("PreviousAction"!==e.type)return!1;let t=!1;return(0,f.Cw)(e.value,{visitTableColumnReferenceExpression:()=>(t=!0,!1)}),t}function M(e){if(!R(e))return null;let t=null;return(0,f.Cw)(e.value,{visitTableColumnReferenceExpression:e=>(t=e.displayHint?.label??null,!1)}),t}let O=l.memo(e=>{let{expr:t,onChange:n,argContext:a}=e,r=a.typeHint.signature[0]?.config,i=E.gL.value(r),o=(0,E.$C)(i?.schema?.fields,i?.schemaType||"string"),s=(0,$.Gm)(),c=(0,l.useMemo)(()=>{let e=(0,A.f6)(s).filter(R),t=new Set;for(let n of e){let e=M(n);e&&t.add(e)}return t},[s]),d=(0,l.useMemo)(()=>o.filter(e=>c.has(e.title)),[o,c]),u=(0,l.useMemo)(()=>{let e=(0,A.f6)(s).filter(R),t=new Map;for(let n of e){let e=M(n);if(e){let a=t.get(e)||[];a.push(n),t.set(e,a)}}return e=>t.get(e)||[]},[s]),p=(0,l.useMemo)(()=>JSON.stringify(o.map(e=>({name:e.name,title:e.title}))),[o]),m=l.useRef(null);l.useEffect(()=>{if(null!==m.current&&m.current!==p){let e=new Set(o.map(e=>`${e.name}:${e.title}`));t.fields.every(t=>e.has(`${t.name}:${t.title}`))||(n(null),y(1))}m.current=p},[p,n,t.fields,o]);let[g,y]=l.useState(()=>0===t.fields.length?1:0);l.useEffect(()=>{0===t.fields.length&&0===g&&y(1)},[t.fields.length,g]);let b=l.useCallback((e,a,r)=>{if(null===r){if(e){let e=Math.max(0,g-1);y(e),0===t.fields.length&&0===e&&y(1)}else{let e=t.fields.filter((e,t)=>t!==a);0===e.length?(n(null),y(1)):n({...t,fields:e})}}else if(e)y(e=>Math.max(0,e-1)),n({...t,fields:[...t.fields,r]});else{let e=[...t.fields];e[a]=r,n({...t,fields:e})}},[t,n,g]),x=l.useCallback(()=>{y(e=>e+1)},[]),v=l.useMemo(()=>{let e=[];for(let n=0;n<t.fields.length;n++){let a=t.fields[n];a&&e.push({field:a,isPlaceholder:!1,index:n})}for(let t=0;t<g;t++)e.push({field:null,isPlaceholder:!0,index:t});return e},[t.fields,g]);return l.createElement(P.VP,{gap:32},v.map((e,t)=>{let{field:n,isPlaceholder:r,index:i}=e,s=n&&"TableColumnReferenceExpression"===n.value.type?n.value.displayHint?.label??null:null;return l.createElement(_,{key:`${r?"placeholder":"field"}-${i}-${t}`,schemaFields:d,currentColumnName:s,getSuggestionsForColumn:u,argContext:a,onSelect:e=>{let t=M(e);t&&(0,f.Cw)(e.value,{visitTableColumnReferenceExpression(e){let n=o.find(e=>e.title===t);if(n){let a={type:"TableColumnReferenceExpression",id:e.id,typeHint:e.typeHint||n.typeHint,displayHint:{label:t,description:"",icon:e.displayHint?.icon||"StudioTableOutline"},validationStatus:[]};b(r,i,{name:n.name,title:n.title,value:a,struct:n.struct||h.u.Scalar,typeHint:n.typeHint,validationStatus:[]})}return!1}})},onClear:s?()=>{b(r,i,null)}:void 0})}),l.createElement(P.fI,{center:!0},l.createElement(P.$n,{icon:"PlusOutline",size:"l",tooltipText:g>0?"Fill in the missing value to add more":"Add more",round:!0,variant:"outlined",disabled:g>0,onClick:x})))}),_=l.memo(e=>{let{schemaFields:t,currentColumnName:n,getSuggestionsForColumn:a,argContext:r,onSelect:i,onClear:o}=e,s=(0,l.useRef)(null),[c,d]=(0,l.useState)(""),[u,p]=(0,l.useState)([]),[m,g]=(0,l.useState)(!1),y=l.useCallback(()=>{p(e=>e.slice(0,-1))},[]),f=(0,l.useMemo)(()=>{let e=[];for(let n of t){let t=a(n.title);(0,S.tM)(e,t)}return e},[t,a]),h=(0,l.useMemo)(()=>(0,A.Of)(f,u).suggestions,[f,u]),b=(0,A.gT)(c?(0,A.f6)(h):h),E=[...u.length>0?[F]:[],...b(c)].filter(R),v=e=>t=>{if("Custom"===t.type&&t.displayHint?.label==="Back"){y(),d(""),s.current?.focus();return}if(!(0,x.Uc)(t))return;if(!t.children){i(t),d(""),e();return}let n=E.filter(e=>e.displayHint?.label!=="Back");p(e=>[...e,n.findIndex(e=>e.displayHint?.label===t.displayHint?.label)]),d(""),s.current?.focus()},{selectedIndex:C,handleKeyDown:$,containerRef:M}=(0,I.JZ)(E,v(()=>g(!1))),O=n?{type:"TableColumnReferenceExpression",id:"",displayHint:{label:n,description:"",icon:"StudioTableOutline"},typeHint:{tag:k.E.Simple,signature:[],typeLabel:""},validationStatus:[]}:{type:"MissingExpression",displayHint:{label:"",description:""},typeHint:{tag:k.E.Never,signature:[],typeLabel:"Nothing"},validationStatus:[]};return l.createElement(P.ms,{style:{zIndex:1},isOpen:m,onIsOpenChanged:e=>{e&&r.fetchPreviousActions(),g(e),d(""),p([])},strategy:"fixed-scrollable",behavior:"over",height:360,width:void 0,renderContent:e=>{let{close:t}=e;return 0===f.length?l.createElement(P.IU,{text:"No common columns between table and sheet."}):l.createElement(T.C,{containerRef:M,list:E,selectedIndex:C,onSelect:v(t)})},renderHeader:()=>l.createElement(P.zZ,{ref:s,style:{flex:1},placeholder:"Type something...",value:c,onChange:d,onKeyDown:$})},l.createElement(w.T,{expr:O,onClear:o}))});var N=n(80284),B=n(82644),D=n(81660);let H=l.memo(e=>{let{expr:t,Expression:n}=e,a=e.argContext.typeHint.signature[0]?.config,r=E.gL.value(a),i=void 0===r||r.editable,o=(0,E.$C)(r?.schema?.fields,r?.schemaType||"string"),s=(0,E.i4)(o,t.fields),c=r?.sourceName??"Fields",d=r?.sourceIcon??"CommandsSet",u=l.useCallback(()=>{},[]);return l.createElement(z,null,l.createElement(q,{leftName:"Table Columns",leftIcon:l.createElement(L,null),rightName:`${c} Columns`,rightIcon:l.createElement(U,{icon:d}),editable:i}),l.createElement(P.R9,{enabled:s.length>4,columns:!0},l.createElement(P.VP,{"data-testid":"widget-field-composition-readonly"},s.map((t,a)=>{let r=o.some(e=>e.title===t.title),s={...e.argContext,argName:t.name,displayHint:{label:t.title,description:"",struct:t.struct,expressions:[],required:!1,dependsOn:[],miniUIConfig:null},fetchSuggestions:(n,a,r)=>{e.argContext.fetchSuggestions(n,t.typeHint?.signature||[],r)},typeHint:t.typeHint||{tag:k.E.Never,signature:[],typeLabel:""},options:{...e.argContext.options,fieldMappingMode:!0}},c="ArrayLiteralExpression"===(0,x.UI)(t.value).type?(0,v.JP)(t.value,t.typeHint||{tag:k.E.Never,signature:[],typeLabel:""}):t.value;return l.createElement(P.VP,{key:`${t.title}  ${a}`},l.createElement(j,{"data-testid":"composition-row-readonly"},l.createElement(P.VP,{style:{flex:1,minWidth:0}},l.createElement(n,{readonly:!0,hiddenArgEditor:!0,parentIsArray:!1,expr:c,onChange:u,argContext:s})),l.createElement(B.i,null),l.createElement("div",{style:{flex:1,minWidth:0}},r?l.createElement(D.D,{field:t,disabled:!0,onChange:u,icon:"CheckmarkOutline"}):l.createElement(W,{$disabled:!0},l.createElement(P.$n,{style:{marginInlineStart:"-8px"},disabled:!0,round:!0,icon:i?"SquarePlusOutline":"TrashBinOutline",tooltipText:i?"Will be created":"Will be dropped",variant:"flat",size:"m"}),l.createElement(G,null,i?"Will be created":"Will be dropped")))))}))),(t.validationStatus?.filter(e=>"internal"!==e.type||"warning"!==e.severity).length??0)>0?l.createElement(P.BQ,{variant:"critical"}," ",JSON.stringify(t.validationStatus)," "):null)}),z=(0,y.Ay)(P.VP)`
  --icon-color: ${m.ydb};
  --icon-size: 16px;
`,L=(0,y.Ay)(e=>l.createElement(P.In,{icon:"CommandsGet",...e}))`
  --size: 20px;
  --color: ${m.t14};
`,U=(0,y.Ay)(P.In)`
  --size: 20px;
  --color: ${m.t14};
`,V=(0,y.Ay)(P.fI)`
  font-size: 16px;
  font-weight: 500;
  color: ${m.CP};
  padding: 8px 0;
  flex: 1;
  font-family: Outfit;
  margin-bottom: 16px;
`,q=l.memo(function(e){let{leftName:t,leftIcon:n,rightName:r,rightIcon:i,className:o,editable:s}=e;return l.createElement(P.VP,{gap:32,className:o},l.createElement(P.VP,{gap:12},e.title,l.createElement(a.P,{$small:!0},"The columns from the current automation table are going to be inserted to the destination document. If missing,"," ",s?"they will be created automatically":"they will be ignored",".")),l.createElement(P.fI,{gap:48},l.createElement(V,{gap:12},n,t),l.createElement(V,{gap:12},i,r)))}),j=(0,y.Ay)(P.fI)`
  padding: 8px 0;
  flex: 1;
  gap: 16px;
`,W=(0,y.Ay)(P.fI)`
  flex: 1;
  background: ${m.hi1};
  border: 1px solid ${m.hi1};
  border-radius: 8px;
  height: 100%;
  padding: 11px 20px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: ${m.CP};
  gap: 8px;
`,G=y.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: ${m.CP};
`;var Y=n(29190),Q=n(20220);let J=l.memo(e=>{let{onSelect:t,...n}=e,a=Z(n.value);return l.createElement(Q.S,{...n,isSelectedFn:e=>X(a,e),onSelect:e=>{let r={signature:n.signature,tag:k.E.Simple,typeLabel:"Something"},i=(X(a,e)?a.filter(t=>!X([t],e)):[...a,e]).filter(e=>!(0,x.wL)(e));t(i.length?1===i.length&&i[0]?i[0]:{...(0,x.SS)(r),elements:i}:null)}})}),Z=e=>"ArrayLiteralExpression"===e.type?e.elements.flatMap(Z):[e],X=(e,t)=>e.some(e=>Y.Cz(e,t,{compareComments:!1,compareFlags:!1,compareMetadata:!1,compareStatementIndex:!1,compareStatementOutput:!1,comparePlaybookArgumentValues:!1,compareUpdateTimestamp:!1}));var K=n(35501),ee=n(34238),et=n(54439),en=n(11778),ea=n(44835),er=n(66712),ei=n(62825),el=n(81250),eo=n(62321),es=n(58651);let ec=l.memo(function(e){let{argument:t,suggestions:n,onChange:r,requestSuggestions:i,resetSuggestions:o,addonState:c,addonDispatch:d,...p}=e,[g,y]=l.useState(!0);(0,ea.ky)("argument"),(0,s.Ay)(ep(t),"failed isWithRequiredHints");let b=(0,er.k)(),C=t.displayHint?.description||"",S=t.displayHint?.label||t.name,k=t.displayHint?.required||!1,w=e.miniUIConfig||t.displayHint?.miniUIConfig,A=l.useMemo(()=>{let e=new Set;return(0,f.Cw)(t.value,{visitFieldRemappingExpression:t=>(e.add(t.accordingTo),!0)}),Array.from(e)},[t.value]),I=l.useCallback((e,n)=>{for(let e of A)b.onPlaybookArgReset(e,!0);r({...t,value:e},n)},[r,t,A,b]),T=(0,$.Qz)(),{expr:F,accessedValue:R}=eu(t.value||(0,x._f)(t.typeHint)),M=(F.validationStatus||[])?.filter(e=>"internal"!==e.type||"error"===e.severity).length>0;if(!w||"hidden"===w.visibility)return null;let O={argLabel:S,argName:t.name,fetchSuggestions:(e,n,a)=>{i({argumentName:t.name,typeSignature:n,userInput:e,isPlaybookArgument:!1,forceRefreshCache:a?.forceRefreshCache??!1,pbArgumentsOnly:a?.pbArgumentsOnly??!1})},fetchPreviousActions(){T(b.statementIndex,this.typeHint)},resetSuggestions:o,reloadValue:()=>b.onRevalidatePlaybook(),typeHint:t.typeHint,displayHint:t.displayHint,suggestions:n,options:{excludeGetFromPreviousActions:!0,fieldMappingMode:!1,excludeAskMeEveryTime:!0,excludeFieldMapping:!0,excludeStringTemplating:!0,excludeUploadFile:!0,isStandAlone:!1}},_=l.createElement(eg,{$hasRightButtons:u.R4(t.typeHint,t.value),isPbArgument:!1,"aria-label":`Select value for ${t.name}`,expr:F,onClear:()=>{I(null)},variant:M?"danger":"default",suffix:R}),N=u.R4(t.typeHint,t.value)?l.createElement(P.fI,null,_,l.createElement("div",{onClick:e=>e.stopPropagation()},l.createElement(u.qi,{addonState:c,argName:t.name,typeHint:t.typeHint,value:t.value,dispatch:d,statementIndex:b.statementIndex,onChange:I}))):_,B=u.Rv(t.typeHint,b.statementIndex,t.name,d);return l.createElement(P.VP,{gap:32,...p},l.createElement(P.VP,{gap:12},l.createElement(P.VP,{gap:24},l.createElement(P.fI,{gap:16,style:{minWidth:0}},l.createElement(P.VP,{style:{flex:1},gap:12},l.createElement(es.A1,null,S," ",l.createElement(P.In,{role:"button",size:14,color:m.e30,icon:"RadioInfoOutline",onClick:()=>y(!g),"aria-label":"Toggle description",style:{cursor:"pointer"}})),C&&l.createElement(P.SD,{open:!g},l.createElement(a.P,{$small:!0,style:{color:m.Wm}},C))),k?l.createElement(a.P,{$small:!0,style:{color:m.wmS,lineHeight:"20px",alignSelf:"start",marginTop:4}},"Required"):null),l.createElement(ed,{"data-argument-name":t.name,tabIndex:0,gap:12},(()=>{if(t.displayHint?.struct===h.u.Array){let e="ArrayLiteralExpression"===F.type?F:{...(0,x.SS)(O.typeHint),elements:[F||(0,x._f)(O.typeHint)]};return l.createElement(v.c6,{expr:e,onChange:I,argContext:O,withAskMeEverytime:!1,renderItem:(e,t)=>l.createElement(em,{expr:e,onChange:t,argContext:O,triggerButton:N,miniUIConfig:w,accessedValue:R,inlineActions:B})})}return l.createElement(em,{expr:F,onChange:I,argContext:O,triggerButton:N,miniUIConfig:w,accessedValue:R,inlineActions:B})})())),E.PA(t)?.map((e,t)=>l.createElement(el.t,{status:e,key:t})),t.validationStatus?.map((e,t)=>l.createElement(el.t,{status:e,key:t}))))}),ed=(0,y.Ay)(P.VP)`
  border-radius: 8px;
  outline: 1px solid transparent;
  transition: outline 0.2s ease-in-out;
  &.error {
    outline: 1px solid ${m.KE7};
  }
`,eu=e=>{let t=null,n=e;for(;"FieldAccessExpression"===n.type;)t=l.createElement(eo.e,{fields:[l.createElement(l.Fragment,null,n.displayHint?.label||n.field),t]}),n=n.expression;return{expr:n,accessedValue:t}},ep=e=>"typeHint"in e,em=l.memo(function e(t){let{expr:n,onChange:a,miniUIConfig:r,triggerButton:i,argContext:o,accessedValue:s,inlineActions:c}=t,d=(0,en.c)(),u=(0,I.jL)(),p="ConstantValueExpression"===n.type&&typeof n.value,m=l.useCallback(e=>{a(null==e?null:{type:"ConstantValueExpression",value:e},p===typeof e)},[a,p]),{suggestions:y}=o;if(!r||"hidden"===r.visibility)return null;if("CastExpression"===n.type)return l.createElement(e,{...t,expr:n.expression,onChange:e=>a(null===e?null:{...n,expression:e})});switch(r.inputType){case"multiSelect":return l.createElement(J,{value:n,onSelect:a,onFetchSuggestion:e=>o.fetchSuggestions(e,o.typeHint.signature,{forceRefreshCache:!1,pbArgumentsOnly:!1}),onRefresh:e=>o.fetchSuggestions(e,o.typeHint.signature,{forceRefreshCache:!0,pbArgumentsOnly:!1}),signature:o.typeHint.signature,suggestions:y},i);case"select-and-reference":if((0,C.k)(n))return l.createElement(C.w,{expr:n,onChange:a,suffix:s,argContext:{...o,options:{...o.options,excludeGetFromPreviousActions:!1}}});case"type-specific":{let e=(0,et.d)(o.typeHint.signature);if(!d)return null;if(e){if(e.mode===b.c.UIAst){let t=e.Component;return"ConstantValueExpression"===n.type||"ObjectStorageReferenceExpression"===n.type?l.createElement(t,{value:n,onChange:a,api:d,isMiniUI:!0,onError:e=>{u({type:"App/ErrorNotified",bardeenError:e})}}):null}{let t=e.Component;return"ConstantValueExpression"===n.type?l.createElement(t,{isMiniUI:!0,value:n.value,onChange:m,displayHint:n.displayHint}):null}}return null}case"select":return l.createElement(Q.S,{value:"ConstantValueExpression"===n.type?n.value:null,inlineActions:c,onFetchSuggestion:e=>o.fetchSuggestions(e,o.typeHint.signature,{forceRefreshCache:!1,pbArgumentsOnly:!1}),onRefresh:e=>o.fetchSuggestions(e,o.typeHint.signature,{forceRefreshCache:!0,pbArgumentsOnly:!1}),onSelect:a,suggestions:o.suggestions,signature:o.typeHint.signature},i);case"reference-and-entire-action":case"reference":return l.createElement(K.k,{onSelect:e=>{(0,x.Uc)(e)&&a(e.value)},onOpenChanged:e=>{e&&o.fetchPreviousActions()},fullWidth:!0,includeEntireAction:"reference-and-entire-action"===r.inputType},i);case"customText":{let e=(0,E.v8)(n,o.typeHint);return l.createElement(ee.R,{expr:e,onChange:a,argContext:{...o,options:{...o.options,excludeGetFromPreviousActions:!1}},onResetInput:()=>a(null)})}case"reference-to-schema-mapping":{let e="ObjectLiteralExpression"===n.type?n:{type:"ObjectLiteralExpression",fields:[],validationStatus:[],typeHint:o.typeHint};return l.createElement(O,{onChange:a,argContext:{...o,options:{...o.options,excludeStringTemplating:!1,fieldMappingMode:!0,excludeGetFromPreviousActions:!1}},Expression:ei.r,expr:e})}case"fieldMapping":{let e="ObjectLiteralExpression"===n.type?n:{type:"ObjectLiteralExpression",fields:[],validationStatus:[],typeHint:o.typeHint};return l.createElement(N.r,{onChange:a,argContext:{...o,options:{...o.options,excludeStringTemplating:!1,fieldMappingMode:!0,excludeGetFromPreviousActions:!1}},Expression:ei.r,expr:e,onAddColumn:t=>{a({...e,fields:(0,g.uniqBy)([...e.fields,t],"name")})},withoutHeader:!0})}case"read-only-mapping":{let e="ObjectLiteralExpression"===n.type?n:{type:"ObjectLiteralExpression",fields:[],validationStatus:[],typeHint:o.typeHint};return l.createElement(H,{argContext:{...o,options:{...o.options,excludeStringTemplating:!1,fieldMappingMode:!0,excludeGetFromPreviousActions:!1}},Expression:ei.r,expr:e})}}}),eg=(0,y.Ay)(e=>{let{$hasRightButtons:t,...n}=e;return l.createElement(w.T,n)})`
  &:hover {
    cursor: pointer;
    background-color: ${m.KxS};
  }
  ${e=>{let{$hasRightButtons:t}=e;return t&&(0,y.AH)`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}}
`;var ey=n(37089),ef=n(50854),eh=n(59750),eb=n(93510),ex=n(42257),eE=n(27461);let ev=(e,t,n,a,r)=>{switch(e.type){case"ChangedArgument":{let r=e.arg.name;return[{...t,args:t.args.map(t=>t.name===r?e.arg:t)},[(0,ef.qh)(t,n,a,r)]]}case"RequestSuggestions":{let a=(0,ey.hn)({pb:n,index:t.index,reqParams:e.reqParams,onDone:ek,onPartialResults:ew,onError:eA});return[{...t,suggestions:o.j.Loading,currentRequest:e.reqParams},[(0,d.Z3)(a,300)]]}case"RequestSuggestionsPartial":case"RequestSuggestionsSuccess":{let n=t.currentRequest;if(!i()(n,e.reqParams))return[t,[]];let a="RequestSuggestionsSuccess"===e.type?null:e.reqParams,r=o.j.Success(e.suggestions);return[{...t,suggestions:r,currentRequest:a},[]]}case"RequestSuggestionsError":return[{...t,suggestions:o.j.Success([])},[]];case"ResetSuggestions":return[{...t,currentRequest:null,suggestions:o.j.NotAsked},[]];case"AddonAction":{let[a,i]=u.Ff(e.action,t.addonState,n,r),l=i.map(eb.zy(t=>({type:e.type,action:t})));return[{...t,addonState:a},l]}default:return(0,s.HB)(e)}},eC=l.memo(function(e){let{dispatch:t,state:n,isFirstStatement:a}=e,r=(0,d.i8)(t,"AddonAction"),i=l.useCallback(e=>t({type:"RequestSuggestions",reqParams:e}),[t]),o=l.useCallback(()=>t({type:"ResetSuggestions"}),[t]),s=l.useCallback((e,n)=>t({type:"ChangedArgument",arg:e,debounce:n}),[t]);return l.createElement(l.Fragment,null,n.args.map(e=>l.createElement(p.e,{inFirstStatement:a,argument:e,key:e.name,requestSuggestions:i,onChange:s,resetSuggestions:o,suggestions:n.suggestions},(t,a)=>l.createElement(u.uA,{addonState:n.addonState,argName:e.name,typeHint:a,value:e.value,dispatch:r,statementIndex:n.index,onChange:t}))))}),eS=l.memo(function(e){let{dispatch:t,state:n,overrides:r}=e,i=(0,eh.j)(),u=(0,d.i8)(t,"AddonAction"),p=(0,eh.r)(),m=l.useCallback(e=>t({type:"RequestSuggestions",reqParams:e}),[t]),g=l.useCallback(()=>t({type:"ResetSuggestions"}),[t]),y=l.useCallback((e,n)=>{let a=e.value?.type==="ObjectStorageReferenceExpression"?e.value.needsPaidFeatures:[];c.fD(p.subscription,a)||i({type:"App/ClickedPremiumFeature"}),t({type:"ChangedArgument",arg:e,debounce:n})},[p.subscription,i,t]),f=l.useMemo(()=>o.j.isSuccess(n.suggestions)?o.j.Success(n.suggestions.value.filter(e=>"ExistingArgument"!==e.type)):n.suggestions,[n.suggestions]),h=[],b=[];for(let e of n.args)e.displayHint?.miniUIConfig?e.displayHint?.miniUIConfig.visibility==="hidden"||(e.displayHint?.miniUIConfig.visibility==="visible-advanced"?b.push(e):h.push(e)):h.push(e);let x=e=>((0,s.Ay)(e.displayHint?.miniUIConfig,"fnArg.displayHint.miniUIConfig is required"),e.displayHint?.miniUIConfig.visibility==="hidden")?null:l.createElement(ec,{miniUIConfig:r?.[e.name]??null,argument:e,key:e.name,requestSuggestions:m,onChange:y,resetSuggestions:g,suggestions:f,addonState:n.addonState,addonDispatch:u});return 0===h.length&&0===b.length?l.createElement(eE.VP,{center:!0,style:{paddingBlock:24,flexGrow:1}},l.createElement(a.a,null,"No arguments")):l.createElement(l.Fragment,null,h.map(x),b.length>0&&l.createElement(ex.YE,{title:"Advanced Settings"},l.createElement(eE.VP,{style:{paddingBlock:24},gap:40},b.map(x))))}),ek=e=>({type:"RequestSuggestionsSuccess",reqParams:e.reqParams,suggestions:[...e.existingArgumentSuggestions,...e.suggestions]}),ew=e=>({type:"RequestSuggestionsPartial",reqParams:e.reqParams,suggestions:[...e.existingArgumentSuggestions,...e.suggestions]}),eA=e=>({type:"RequestSuggestionsError",msg:e})},19010:(e,t,n)=>{n.d(t,{h:()=>y});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(58282),s=n(26101),c=n(14163),d=n(85170),u=n(48143),p=n(59750),m=n(68919),g=n(28926);let y=i.memo(function(e){let{onSelect:t,state:{loadingModels:n,openTabs:l,compatibleModels:y,modelsVisible:I}}=e,P=(0,p.j)(),[$,T]=i.useState("https://"),[F,R]=i.useState(""),M=i.useCallback(e=>{e.currentTarget.setSelectionRange(e.currentTarget.value.length,e.currentTarget.value.length)},[]);i.useEffect(()=>{F&&P({type:"App/CreateAgent/CreateAgentSelectorUrlSelected",url:F})},[P,F]);let O=i.useCallback(e=>{let t=(0,s.cx)(e.trim());t!==e&&T(t),f(t)&&R(t)},[]),_=(0,u.d7)(O,400),N=i.useCallback(e=>{T(e),_(e)},[_]),B=i.useCallback(e=>{R(e)},[]);i.useEffect(()=>{P({type:"App/CreateAgent/Mounted"})},[P]);let D=i.useMemo(()=>{let e=$.trim();if($.includes("://")){let[t,n]=$.split("://");e=(n??"").trim()}if(!e){let e=l.find(e=>e.active),t=l.filter(e=>!e.active);if(!e?.url)return l;let n=(0,o.Gw)(e.url);return n?[e,...(0,d.Vx)(n,t,e=>e.url??"")]:[e,...t]}return(0,d.Vx)(e,l,e=>e.url??"")},[l,$]),H=i.useMemo(()=>f($),[$]),z=i.useMemo(()=>{if(!F)return!1;let e=(0,o.Gw)(F);return null!=e&&c.F.includes(e)},[F]),L=D.some(e=>e.url&&(0,d.ht)(e.url,$)),U=i.useMemo(()=>D.findIndex(e=>e.url&&(0,d.ht)(e.url,F)),[F,D]);return i.createElement(g.VP,{gap:32,style:{width:"100%",margin:"auto"}},i.createElement(g.VP,{gap:16,center:!0,style:{marginBottom:32}},i.createElement(a.H3,{$color:r.t14},"Create a new Agent"),i.createElement(a.P,{$small:!0,$color:r.wmS},"Enter a URL or select an open browser tab you want to scrape.")),i.createElement(g.VP,{style:{width:"100%"}},i.createElement(b,null,i.createElement(E,{$visible:!0},i.createElement(g.ms,{isOpen:!0,strategy:"inline",height:440,fullWidth:!0,"data-tracking-context":"ActiveTabs",renderContent:()=>i.createElement(i.Fragment,null,i.createElement(g.zZ,{value:$,noClear:!0,onChange:N,addonBefore:null,onFocus:M,"data-testid":"url-input"}),i.createElement(g.rx,null),!L&&H?i.createElement(i.Fragment,null,i.createElement(g.ke,null,"Scrape New Website"),i.createElement(g.IU,{active:(0,d.ht)($,F),key:"custom-url",icon:"LinkOutline",text:$,onClick:()=>B($)})):null,D.length?i.createElement(i.Fragment,null,i.createElement(g.ke,null,"Currently Open Tabs"),D.filter(e=>e.url).map((e,t)=>i.createElement(g.IU,{key:String(t),active:t===U,onClick:()=>e.url&&B(e.url),icon:e.favIconUrl?{url:e.favIconUrl}:"LinkOutline",text:e.title}))):null)},i.createElement(i.Fragment,null))),i.createElement(E,{$visible:I},i.createElement(x,null,i.createElement(v,null,z?i.createElement(a.P,{$small:!0,$color:r.KE7},"This domain is not supported. Please select a different website."):n?i.createElement(g.y$,null):y.length?i.createElement(i.Fragment,null,i.createElement(a.P,{$small:!0},"We have ",y.length," compatible Scraper Template",y.length>1?"s":""," for this website."),i.createElement(h,{"data-testid":"scraper-templates-list"},i.createElement(m.i,{templates:y,onClick:e=>{t({type:"scrape",url:F,template:e})}}))):i.createElement(i.Fragment,null,i.createElement(a.P,{$small:!0},"We have no Scraper Templates for this website.")),n||z?null:i.createElement(i.Fragment,null,i.createElement(a.P,{style:{margin:"8px 0"}},i.createElement(g.$n,{variant:y.length?"outlined":"primary",round:!0,onClick:()=>P({type:"Scrapers/CreateClicked",forUrl:F}),size:"l",text:"Create my own"})),i.createElement(a.P,{$small:!0},i.createElement(A,{href:"https://www.bardeen.ai/tutorial/how-to-create-scraper-templates",target:"_blank",rel:"noopener noreferrer",role:"button","aria-label":"Learn how to create Scraper Templates"},i.createElement(g.In,{icon:"OpenLinkOutline",style:{verticalAlign:"middle"}})," Learn how to create Scraper Templates")))))))),i.createElement(g.VP,{style:{maxWidth:660,margin:"auto"}},i.createElement(C,{onClick:()=>t({type:"import"}),"data-testid":"import-card"},i.createElement(S,null,i.createElement(w,null)),i.createElement(k,{gap:12},i.createElement(a.P,{$bold:!0},"Import from a sheet"),i.createElement(a.P,{$small:!0},"Import existing data from a Google Sheet, Airtable or Notion.")))))});function f(e){let[t,n=""]=e.split("://");return n.toLowerCase().startsWith("localhost")||n.includes(".")}let h=l.Ay.div`
  width: 100%;
`,b=l.Ay.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
`,x=l.Ay.div`
  min-width: 360px;
  width: 100%;
  height: 100%;
`,E=l.Ay.div`
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
`,v=(0,l.Ay)(g.h$)`
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
`,C=(0,l.Ay)(g.h$)`
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  width: 580px;
`,S=(0,l.Ay)(g.fI)`
  position: relative;
  justify-content: center;
  align-items: center;
`,k=(0,l.Ay)(g.VP)`
  align-items: flex-start;
  gap: 0;
`,w=()=>i.createElement("svg",{width:"56",height:"56",viewBox:"0 0 56 56",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.createElement("rect",{width:"56",height:"56",rx:"4",fill:"#F8F9FA"}),i.createElement("g",{"clip-path":"url(#clip0_2408_87709)"},i.createElement("path",{d:"M22.75 16.75C19.4363 16.75 16.75 19.4363 16.75 22.75V26.875H28.284L25.3295 24.2955C24.8902 23.8562 25.2652 23.1438 25.7045 22.7045C26.1438 22.2652 26.8562 22.2652 27.2955 22.7045L31.7955 27.2045C32.2348 27.6438 32.2348 28.3562 31.7955 28.7955L27.2955 33.2955C26.8562 33.7348 26.1438 33.7348 25.7045 33.2955C25.2652 32.8562 25.2652 32.1438 25.7045 31.7045L28.284 29.125H16.75V33.25C16.75 36.5637 19.4363 39.25 22.75 39.25H33.25C36.5637 39.25 39.25 36.5637 39.25 33.25V22.75C39.25 19.4363 36.5637 16.75 33.25 16.75H22.75Z",fill:"#6F60CC"})),i.createElement("defs",null,i.createElement("clipPath",{id:"clip0_2408_87709"},i.createElement("rect",{width:"24",height:"24",fill:"white",transform:"translate(16 16)"})))),A=l.Ay.a`
  font-size: 14px;
  line-height: 26px;
  display: inline;
  cursor: pointer;
  color: ${r.t14};
  &:hover {
    color: ${r.g7N};
  }
`},71378:(e,t,n)=>{n.d(t,{B:()=>s});var a=n(14041),r=n(28926);let i=(e,t)=>{let n=0;for(let a of e){let e=a.displayHint?.command.computeUnitsProduced;if(!e){n+=1e3*t;continue}if("flatCost"in e)e.flatCost>0&&(n+=e.flatCost);else if("flatUnits"in e){let t=e.flatUnits;if(t>0){let a=e.microCreditsPerUnit??1e3;a>0&&(n+=t*a)}}else{let a=e.microCreditsPerUnit??1e3;a>0&&(n+=a*t)}}return n},l=e=>0===e?null:Math.ceil(e/1e3),o=e=>{let{credits:t}=e;return a.createElement(r.ab,{size:"s",variant:"gray"},"Max ",t," Cr",1!==t?"s":"")},s=e=>{let{placement:t,run:n,children:s,statements:c}=e,d=c?i(c,5):0,u=c?i(c,10):0;return a.createElement(r.ms,{autoCloseOnContentClick:!0,placement:t??"bottom-start",behavior:"flip-shift",renderContent:()=>{let e=l(d),t=l(u);return a.createElement(a.Fragment,null,a.createElement(r.IU,{text:"First 5 Rows","aria-label":"First 5 Rows",onClick:()=>n(5),rightAddon:null!==e?a.createElement(o,{credits:e}):null}),a.createElement(r.IU,{text:"First 10 Rows",onClick:()=>n(10),rightAddon:null!==t?a.createElement(o,{credits:t}):null}),a.createElement(r.IU,{text:"All Rows",onClick:()=>n(null)}))}},a.createElement("div",null,s))}},67846:(e,t,n)=>{n.d(t,{EX:()=>E,FK:()=>p,H4:()=>h,O9:()=>x,Z4:()=>m,gr:()=>u,ik:()=>y,tB:()=>b});var a=n(41880),r=n.n(a),i=n(89060),l=n(61198),o=n(70297),s=n(62987),c=n(867),d=n(93274);let u=e=>e.columns.filter(e=>e.selected),p=(e,t,n)=>{let a=e.getBoundingClientRect(),r=t.getBoundingClientRect();return Math.round(a.left)>=Math.round(r.left+n)&&Math.round(a.right)<=Math.round(r.right-n)},m=(e,t,n)=>{let a=e.getBoundingClientRect(),r=t.getBoundingClientRect();return Math.round(a.right)>Math.round(r.left+n)&&Math.round(a.left)<Math.round(r.right-n)},g=(e,t,n)=>{let a={};for(let r of Object.values(e))for(let[e,l]of Object.entries(r.columns))for(let r of l.values){n(e,l.limit);let o=a[e];o||(o=[],a[e]=o),o.push({value:(0,i.gP)(r.value,t,e=>e),path:r.graphPath})}return l.Tj(a,e=>o.Z.pack(e))},y=(e,t)=>{let n=new Map,a=[],r=[];for(let t of e)if("invalid"!==t.columnData.status)for(let e of t.columnData.columns)r.push(e.value);let l=i.sR.fromSerializedGraphs(r),d={},u={};for(let t of e)if(!t.isTrigger){for(let e of t.columns)e.selected&&a.push({...e,statementIndex:t.index,totalRows:0});if("invalid"!==t.columnData.status)for(let e of t.columnData.columns??[])n.set(e.id,e.limit),d[e.id]=(0,i.gP)(e.value,l,e=>e),u[e.id]=s.u.Scalar}let p=g(t,l,(e,t)=>n.set(e,t)),m=Array.from(new Set([...Object.keys(d),...Object.keys(p)])),y=Object.fromEntries(m.map(e=>{let t=p[e],n=d[e];return t?[e,t]:n?[e,n]:[e,o.Z.leaf("loading")]})),f=[];for(let e of m){let t=n.get(e)??null,a=f.find(e=>e.limit===t);a?a.columns.push(e):f.push({columns:[e],limit:t})}let h=[],b=0;for(let e of f){let t=function(e,t){let n={};for(let t of Object.keys(e))n[t]=s.u.Scalar;let a=o.Z.unpack(e,n,{unpackNothing:!1}),r=new Set,i=[];for(let e of a){let n={},a=null,l="";for(let i of t){let t;let s=e.values[i.id];if(!s||!o.Z.isLeaf(s))continue;let d=s.value,u="";if("loading"===d)t={type:"loading",colSpan:1,vectorized:!1,running:!1};else{if("is"in d&&d.is(c.gn))continue;u=JSON.stringify(d);let e=r.has(d);r.add(d),t={...d,vectorized:e,colSpan:1}}("loading"===t.type||"empty"===t.type||"error"===t.type)&&l===u&&a?(a.colSpan+=1,t.colSpan=0):a=t,n[i.id]=t,l=u}i.push({data:n,rowSpan:1})}return i}(Object.fromEntries(e.columns.map(e=>[e,y[e]??o.Z.empty()])),a);h.push(t),b=Math.max(b,t.length)}let x=[],E=null,v="";for(let e=0;e<b;e++){let t={data:{},rowSpan:1};for(let n of h){let a=n[e];a&&(t.data={...t.data,...a.data})}let n=JSON.stringify(t.data);v===n&&E?(E.rowSpan=(E.rowSpan??0)+1,t.rowSpan=0):E=t,x.push(t),v=n}for(;x.length<20;)x.push({data:{},rowSpan:1,isPlaceholder:!0});return{columns:a,rows:x,totalRows:x.length}},f=(e,t)=>{let n=t.map(e=>e.title),a=e.map(e=>{let n={};return t.forEach(t=>{n[t.title]=d.w(e.data[t.id])??""}),n}).filter(e=>Object.values(e).some(e=>""!==e));return r().unparse({data:a,fields:n},{quotes:!0})},h=(e,t,n)=>{let a=new Blob([f(t,n)],{type:"text/csv"}),r=URL.createObjectURL(a),i=new Date().toISOString(),l=document.createElement("a"),o=e.replace(/[^a-zA-Z0-9]/g,"_");l.download=`${o}_${i}.csv`,l.href=r,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(r)},b=(e,t)=>{if(!t||!e)return;let n=t.getBoundingClientRect(),a=e.getBoundingClientRect(),r=Math.max(0,Math.min(t.scrollLeft+(a.left-n.left)-60,t.scrollWidth-t.clientWidth));t.scrollTo({left:Math.round(r),behavior:"smooth"})},x=(e,t)=>{if(e?.type!=="FunctionCallStatement")return null;let n=t?e.args.find(e=>e.name===t)?.value:e.args[0]?.value;return n&&"displayHint"in n&&n.displayHint?n.displayHint:null},E=()=>({type:"ConfirmWithList",header:"Data will be lost",message:"Saving changes to this action will invalidate data from the following actions:"})},93754:(e,t,n)=>{n.d(t,{A:()=>v,uA:()=>k,m:()=>w,ue:()=>E,Ff:()=>S,oD:()=>A});var a=n(14041),r=n(99538),i=n(62987),l=n(5855),o=n(85170),s=n(67331),c=n(69670),d=n(39716),u=n(73457),p=n(45742),m=n(28926);let g=e=>{let{value:t,valueChange:n,children:r,...i}=e;return a.createElement(m.VP,{gap:20,...i},a.createElement("label",null,a.createElement(m.VP,{gap:12},a.createElement(s.P,{$small:!0,$bold:!0},"Title"),a.createElement(m.dN.Outline,{size:"xl",onChange:n,value:t}))),a.createElement(m.YE,{title:a.createElement(s.H6,null,"Advanced options")},r))},y=e=>{let{state:t,dispatch:n,...r}=e,i=""!==t.argument.name.trim(),l=e=>{e.preventDefault(),i&&n({type:v.EditorModalSubmitted,currentArgName:t.argument.name,newArg:t.argument})},o=(0,a.useCallback)(e=>{n({type:v.EditorArgumentFormChange,argument:{...t.argument,...e}})},[n,t.argument]),c=(0,a.useCallback)(()=>{n({type:v.EditorModalCloseClicked})},[n]),d=a.createElement(a.Fragment,null,a.createElement(m.fI,{style:{justifyContent:"flex-end"}},a.createElement(h,{onClick:()=>n({type:v.EditorToggleExpandMoreInfo}),role:"button"},t.moreInfoExpanded?"Hide info":"What does it mean?")),a.createElement(m.SD,{open:t.moreInfoExpanded},a.createElement(m.BQ,{variant:"info",round:!0,style:{marginBottom:16}},"Create a custom title and description to provide additional context about the conditions for this Playbook.")),a.createElement(u.Lo,{argument:t.argument,onChange:o,canChangeRequired:!t.argument.requiredByOtherCommand,canChangeStruct:!t.argument.usedAsMultipleValueArgument&&!(0,p.df)(t.argument.typeHint)}));return a.createElement(b,{"data-testid":"playbook-argument-editor-modal",isOpen:!0,onIsOpenChanged:c,renderContent:()=>a.createElement(f,{onSubmit:l},"edit"===t.mode&&a.createElement(m.Jn,{onClick:c,type:"button",style:{position:"absolute",top:16,right:16}}),a.createElement(m.VP,{gap:32},a.createElement(s.H3,null,"create"===t.mode?"Create Playbook Argument":"Edit Playbook Argument"),"create"===t.mode?a.createElement(g,{value:t.argument.label,valueChange:e=>o({label:e})},a.createElement(a.Fragment,null,a.createElement("label",null,a.createElement(m.VP,{gap:12,style:{marginTop:16}},a.createElement(s.P,{$small:!0,$bold:!0},"Description"),a.createElement(m.TM.Outline,{size:"xl",onChange:e=>o({comment:e}),value:t.argument.comment||""}))),d)):a.createElement(a.Fragment,null,a.createElement(u.Cl,{argument:t.argument,onChange:o}),d)),a.createElement(m.fI,{gap:16,style:{paddingTop:32}},a.createElement(m.$n,{text:"Save",size:"l",round:!0,type:"submit",disabled:!i,"data-testid":"arg-editor-modal-save-button"}))),...r})},f=d.Ay.form``,h=(0,d.Ay)(s.P)`
  font-size: 12px;
  text-decoration-line: underline;
  color: ${c.ui$};
  cursor: pointer;
`,b=(0,d.Ay)(m.nt)`
  width: 530px;
  padding: 32px;
  position: relative;
`,x=(e,t)=>({mode:t,editingArgumentName:e.name,argument:e,moreInfoExpanded:!1}),E={editor:null,confirm:null};var v=function(e){return e.EditorArgumentFormChange="PlaybookArgs/Editor/ArgumentFormChange",e.EditorToggleExpandMoreInfo="PlaybookArgs/Editor/ToggleExpandMoreInfo",e.ArgumentChanged="PlaybookArgs/ArgumentChanged",e.ArgumentCreated="PlaybookArgs/ArgumentCreated",e.EditorModalCloseClicked="PlaybookArgs/EditorModalCloseClicked",e.EditorModalSubmitted="PlaybookArgs/EditorModalSubmitted",e.ResetSavedArgumentInputClicked="PlaybookArgs/ResetSavedArgumentInputClicked",e.ResetSavedArgumentInputCancelClicked="PlaybookArgs/ResetSavedArgumentInputCancelClicked",e.EditClicked="PlaybookArgs/EditClicked",e.ResetStatementArgumentsClicked="PlaybookArgs/ResetStatementArgumentsClicked",e.ResetAllArgumentsClicked="PlaybookArgs/ResetAllArgumentsClicked",e.ResetArgumentClicked="PlaybookArgs/ResetArgumentClicked",e}({});let C=(e,t,n)=>{let a=(e,n)=>e.name===t?n:e;return(0,r.Co)({...e,args:e.args.map(e=>a(e,n))},{transformVarRefExpression:e=>{let t=e.displayHint?{...e.displayHint,label:n.label}:void 0;return a(e,{...e,name:n.name,displayHint:t})}})},S=(e,t)=>{let n=t=>e.editor?{...e,editor:{...e.editor,...t}}:e;switch(t.type){case"PlaybookArgs/ArgumentChanged":return[{...e,pb:C(e.pb,t.currentArgName,t.newArg)},[]];case"PlaybookArgs/EditClicked":{let n=e.pb.args.find(e=>e.name===t.argName);if(!n)return[e,[]];return[{...e,editor:x(n,"edit")},[]]}case"PlaybookArgs/ArgumentCreated":return[{...e,pb:{...e.pb,args:[...e.pb.args,t.arg]},editor:x(t.arg,"create")},[]];case"PlaybookArgs/EditorModalCloseClicked":return[{...e,editor:null},[]];case"PlaybookArgs/EditorModalSubmitted":{let n=C(e.pb,t.currentArgName,t.newArg);return[{...e,pb:n,editor:null},[]]}case"PlaybookArgs/Editor/ArgumentFormChange":return[n({argument:t.argument}),[]];case"PlaybookArgs/Editor/ToggleExpandMoreInfo":return[n({moreInfoExpanded:!e.editor?.moreInfoExpanded}),[]];case"PlaybookArgs/ResetSavedArgumentInputClicked":{if(!t.confirmed)return[{...e,confirm:{type:"Confirm",cancel:{text:"Cancel",action:{type:"PlaybookArgs/ResetSavedArgumentInputCancelClicked"}},confirm:{text:"Reset",action:{...t,confirmed:!0}},header:"Reset saved input",message:"This will reset the saved value of this argument. Are you sure you want to proceed?"}},[]];let n=(0,o.aX)(e.pb,[t.currentArgName]);return[{...e,confirm:null,pb:n},[]]}case"PlaybookArgs/ResetSavedArgumentInputCancelClicked":return[{...e,confirm:null},[]];case"PlaybookArgs/ResetStatementArgumentsClicked":{let n=new Set;(0,r.bZ)(e.pb,{visitStatement:e=>(e.index===t.index&&(0,r.b)(e,{visitVarRefExpression:e=>("argument"===e.referenceType&&n.add(e.name),!0)}),!0)});let a=(0,o.aX)(e.pb,Array.from(n));return[{...e,confirm:null,pb:a},[]]}case"PlaybookArgs/ResetAllArgumentsClicked":{let t=(0,o.aX)(e.pb,e.pb.args.map(e=>e.name));return[{...e,confirm:null,pb:t},[]]}case"PlaybookArgs/ResetArgumentClicked":{let n=(0,o.aX)(e.pb,[t.arg.name]);return[{...e,confirm:null,pb:n},[]]}default:return[e,[]]}},k=a.memo(function(e){let{state:t,dispatch:n}=e;return a.createElement(a.Fragment,null,t.editor?a.createElement(y,{state:t.editor,dispatch:n}):null,t.confirm?a.createElement(l.u,{dispatch:n,state:t.confirm}):null)}),w=e=>({onPlaybookArgChange:(t,n)=>{e({type:"PlaybookArgs/ArgumentChanged",currentArgName:t,newArg:n})},onPlaybookArgReset:function(t){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e({type:"PlaybookArgs/ResetSavedArgumentInputClicked",currentArgName:t,confirmed:n})},onPlaybookArgEditClicked:t=>{e({type:"PlaybookArgs/EditClicked",argName:t.name})},onPlaybookArgCreate:(t,n,a)=>{let r=(0,o.UA)(n,a);e({type:"PlaybookArgs/ArgumentCreated",arg:{name:t.name,label:t.displayHint.label,comment:null,commentFlags:{keep:!1},typeHint:t.typeHint,save:"config",value:null,restricted:!1,struct:r,required:n?.required||!1,requiredByOtherCommand:n?.required||!1,validationStatus:[],usedInMapping:[],implicitSave:null,usedInStatementArg:[],usedAsMultipleValueArgument:r===i.u.Array}})}}),A=e=>"PlaybookArgs/ResetSavedArgumentInputClicked"===e.type&&e.confirmed||"PlaybookArgs/ResetAllArgumentsClicked"===e.type||"PlaybookArgs/ResetStatementArgumentsClicked"===e.type},67469:(e,t,n)=>{n.d(t,{uA:()=>N,qi:()=>H,R4:()=>B,Rv:()=>D,ue:()=>M,Ff:()=>O});var a=n(69670),r=n(45250),i=n(14041),l=n(39716),o=n(21769),s=n(79685),c=n(44814),d=n(92727),u=n(99538),p=n(16918),m=n(25954),g=n(47831),y=n(45540),f=n(8937),h=n(77956),b=n(37089),x=n(45742),E=n(85170),v=n(5855),C=n(93510),S=n(29103),k=n(28926),w=n(27046),A=n(19855),I=n(33956),P=n(37345);let $=e=>{let{scraperUuid:t,typeHint:n,value:a,onSave:r,onCreate:l,onEdit:o}=e;return i.createElement(T,{scraperUuid:t,typeHint:n,onSave:r},i.createElement(k.fI,{gap:12},i.createElement(P.$n,{size:"l",text:"Create Template",icon:"PlusOutline",iconPosition:"left",round:!0,onClick:()=>l()}),a&&"ObjectStorageReferenceExpression"===a.type?i.createElement(P.$n,{size:"l",text:"Edit Template",icon:"PencilOutline",iconPosition:"left",round:!0,variant:"outlined",onClick:()=>a.ref&&o(a.ref)}):null))},T=i.memo(function(e){let{scraperUuid:t,typeHint:n,onSave:a,children:r}=e,l=i.useCallback(e=>{"setScraperModel"===e.type&&a({type:"ObjectStorageReferenceExpression",ref:e.ref.$ref,typeHint:n,displayHint:{description:"Template",label:"Template"},validationStatus:[],needsPaidFeatures:[]})},[a,n]);return(0,g.q)(t??"","scraper_model",l),r});var F=n(15263);let R=["data","text","items"],M={inputFlowState:null,categorizerData:{},confirm:null,loading:!1,categorizerTarget:"",categorizerBucket:null,categorizerQuestions:null,inlineWritingAssistant:null},O=(e,t,n,a)=>{switch(e.type){case"Scraper/Create":return[t,[(0,b.rr)(e.id,n,e.statementIndex,e.url,e.goal)]];case"Scraper/Edit":return[t,[(0,b.Ht)(e.id,e.ref)]];case"WritingAssistant/NoPlaybookOrTargetFound":case"ResearchAssistant/OpenError":return[{...t,loading:!1},[]];case"WritingAssistant/GotData":return[{...t,inlineWritingAssistant:{target:e.target,questions:e.questions,ref:null,refName:null}},[]];case"WritingAssistant/Created":if(!t.inlineWritingAssistant)return[t,[]];return[{...t,loading:!1,inlineWritingAssistant:{...t.inlineWritingAssistant,refName:e.name,ref:e.ref}},[]];case"WritingAssistant/PreviousQuestionClicked":{if(!t.inlineWritingAssistant)return[t,[]];let n=t.inlineWritingAssistant.questions,a=n.findIndex(t=>t.question===e.question.question),r=a-1>=0?a-1:0,i=n.map((e,t)=>t===r?{...e,seen:!1}:e);return[{...t,inlineWritingAssistant:{...t.inlineWritingAssistant,questions:i}},[]]}case"WritingAssistant/QuestionAnswered":{if(!t.inlineWritingAssistant)return[t,[]];let n=z(t.inlineWritingAssistant.questions,t=>t.question===e.question.question?{...t,...e.question}:t),a={...t};if(!(a={...t,inlineWritingAssistant:{...t.inlineWritingAssistant,questions:n}}).inlineWritingAssistant)return[a,[]];let r=a.inlineWritingAssistant.questions.filter(e=>"context"===e.source)??[],i=a.inlineWritingAssistant.questions.filter(e=>"profile"===e.source)??[],l=r.every(e=>e.seen)&&i.every(e=>e.seen),c=[];return l&&c.push(async e=>{let{api:t,dispatch:n}=e;if(!a.inlineWritingAssistant?.target)return;let l=a.inlineWritingAssistant.target,{email:c,userName:d}=await t.systemBardeenAccountProfileGet(),u=(0,g.c)("temp",f.$H)(t),p=r.length>0?await u.createContext(r,l.value):"",m=i.length>0?await u.createUserProfile(d,i):"",y=s.D.createWithID((0,o.A)(),{name:`${l.name} (${new Date().toISOString().substring(0,10)})`,userName:d,email:c,profile:m,context:p,emailType:l.value,template:l.sections.map(e=>({sectionType:"text",sectionTitle:e.section,textOptions:{description:e.description}})),llmRole:l.role,questions:l.questions});n({type:"WritingAssistant/Created",ref:await t.objectStorageCreateResource("bardeen_email_bot_prompt",y),name:y.name})}),[a,c]}case"WritingAssistant/EmptyWritingAssistantAppeared":return[{...t,loading:!0},[async t=>{let{api:n,dispatch:a}=t,{playbook:r}=await (0,S.prepare)(n),i=(await n.systemGetConfiguration("bardeenai_email_bot_prebuilts_v1")).targets.find(t=>t.valueKey===e.template?.target);if(!r||!i){a({type:"WritingAssistant/NoPlaybookOrTargetFound"});return}let l=await n.playbookEditor2_GetBCLPlaybookAsUIAst(r.name,r.bcl),o=await n.playbookEditor2_RunWithResult(l,{enforcePremium:!1,storeResults:!1}),s=(0,g.c)("temp",f.$H)(n),c=await s.populateAnswers(i.context_questions,i.profile_questions,i.name,o.map(e=>e.text).join("\n"));a({type:"WritingAssistant/GotData",target:i,questions:[...c.computedContextualQuestions.map(e=>({...e,source:"context",seen:!1})),...c.computedProfileQuestions.map(e=>({...e,source:"profile",seen:!1}))]})}]];case"WritingAssistantAction":{if(!t.inputFlowState||"WritingAssistant"!==t.inputFlowState.type||e.uuid!==t.inputFlowState.uuid)return[t,[]];let{type:n}=e,[a,r]=f.Ff(e.action,t.inputFlowState);return[{...t,inputFlowState:a},r.map((0,C.zy)(t=>({type:n,action:t,uuid:e.uuid})))]}case"WritingAssistant/Open":return[{...t,loading:!0},[async t=>{let{api:n,dispatch:a}=t,r=await n.systemGetConfiguration("bardeenai_email_bot_prebuilts_v1"),i=null;if(e.ref){let t=(0,c.RY)(e.ref.uri);i=await n.objectStorageGetResource("bardeen_email_bot_prompt",t.id,t.tag)}a({type:"WritingAssistant/OpenSuccess",targets:r.targets,template:e.template,ref:e.ref,task:i})}]];case"WritingAssistant/OpenSuccess":return[{...t,inputFlowState:f.Ur((0,r.uniqueId)(),e)},[]];case"Addon/Close":return[{...t,inputFlowState:null,loading:!1,confirm:null},[]];case"Categorizer/Duplicate":{if(!e.ref)return[t,[]];let n=(0,c.RY)(e.ref.uri);return[t,[async t=>{let{api:a,dispatch:r}=t,i=await a.objectStorageGetResource("bardeen_classification_task",n.id,n.tag);if(!i)return;let l=`${i.name} - copy`,o=d.Z.createWithID(l,{name:l,context:i.context,classes:i.classes,target:i.target,fewshots:i.fewshots});r({type:"Categorizer/Open",ref:await a.objectStorageCreateResource("bardeen_classification_task",o),view:"edit",skipPreview:!0,statementIndex:e.statementIndex,template:e.template})}]]}case"Categorizer/Open":{let a=e.statementIndex,r=(0,E.Xc)(n,a);if(!r||"FunctionCallStatement"!==r.type)return[t,[]];let i=r.args.filter(e=>R.includes(e.name));if(0===i.length)throw Error("Can not find text argument");let l=i.flatMap(e=>(0,E.nY)(e.value)).filter(e=>"argument"!==e.referenceType).map(e=>e.name),o=-1,s=!1,p=!1;if((0,u.bZ)(n,{visitStatement:e=>"FunctionCallStatement"!==e.type||(l.includes(e.varName)&&(p=!0,e.entry||(o=e.index,s=!0)),!0)}),!e.skipPreview&&s)return[{...t,confirm:{type:"Confirm",header:"Get Categorizer data",message:"In order to create a categorizer we now test run the selected data source card.",confirm:{text:"Get Categorizer data",action:{type:"CategorizerPreviewTrigger",onDone:[{type:"CategorizerDataFetched",statementIndex:a},{type:"FunctionStatementAction",index:a,action:{type:"AddonAction",action:e}}],statementIndex:o}},cancel:{text:"Continue without data",action:{...e,skipPreview:!0}},closeAction:{type:"Addon/Close"}}},[]];return[{...t,confirm:null},[async t=>{let{api:n,dispatch:a}=t,r=(await n.systemGetConfiguration("bardeenai_classification_prebuilts_v1")).targets,i=e.ref,l=null;if(i){let e=(0,c.RY)(i.uri),[t,a]=await Promise.all([n.objectStorageGetResource("bardeen_classification_task",e.id,e.tag),n.objectStorageGetMeta("bardeen_classification_task",e.id,e.tag)]);if(l=t,t&&a?.visibility!=="owned"){i=null;let e=`${t.name} - copy`;l=d.Z.createWithID(e,{name:e,context:t.context,classes:t.classes,target:t.target,fewshots:[]})}}a({type:"Categorizer/OpenSuccess",usingPreviewData:p,view:e.view,task:l,targets:r,ref:i,template:e.template})}]]}case"Categorizer/OpenSuccess":{let n;switch(e.view){case"create":n=m.Ur({uuid:(0,r.uniqueId)(),...e,task:null});break;case"edit":n=m.Ur({uuid:(0,r.uniqueId)(),...e})}return[{...t,inputFlowState:n},[]]}case"Categorizer/FetchTrainingData":{let a=t.inputFlowState?.type==="Categorizer"&&t.inputFlowState.usingPreviewData?[async a=>{let{dispatch:i,api:l}=a,o=(0,E.Xc)(n,e.statementIndex);if(!o||!(0,x.Ec)(o))return;let s=o.args.find(e=>R.includes(e.name));s&&i({type:"CategorizerAction",action:{type:"AddFewShotData",data:await l.playbookEditor2_PreviewArgument((0,E.qO)(n),e.statementIndex,s.name)},uuid:t.inputFlowState?.uuid??(0,r.uniqueId)()})}]:[];return[t,a]}case"Categorizer/FetchData":return[{...t,categorizerData:{...t.categorizerData,[e.uri]:"loading"}},[async t=>{let{api:n,dispatch:a}=t,r=(0,c.RY)(e.uri),i=await n.objectStorageGetResource("bardeen_classification_task",r.id,r.tag);i&&a({type:"Categorizer/FetchDataSuccess",data:i,uri:e.uri})}]];case"Categorizer/PreviousQuestionClicked":{if(!t.categorizerQuestions)return[t,[]];let n=t.categorizerQuestions.findIndex(t=>t.question===e.question.question),a=n-1>=0?n-1:0,r=t.categorizerQuestions.map((e,t)=>t===a?{...e,seen:!1}:e);return[{...t,categorizerQuestions:r},[]]}case"Categorizer/AnswerChanged":{if(!t.categorizerQuestions)return[t,[]];let n=z(t.categorizerQuestions,t=>({...t,answer:e.answer}));return[{...t,categorizerQuestions:n},[]]}case"Categorizer/QuestionAnswered":{if(!t.categorizerQuestions||!t.categorizerBucket)return[t,[]];let e=z(t.categorizerQuestions,e=>({...e,seen:!0})),n=e.every(e=>e.seen),a=t.categorizerBucket,r=n?[async n=>{let{dispatch:r,api:i}=n,l=(0,g.c)("temp","bardeen_classification_task")(i),s=d.Z.createWithID((0,o.A)(),{name:`${a.default_classifier_name} (${new Date().toISOString().substring(0,10)})`,context:await l.createContextPrompt(e,a.classes,t.categorizerTarget),classes:a.classes,target:t.categorizerTarget,fewshots:[]});r({type:"Categorizer/FetchData",uri:(await i.objectStorageCreateResource("bardeen_classification_task",s)).uri})}]:[];return[{...t,loading:n,categorizerQuestions:e},r]}case"Categorizer/EmptyCategorizerAppeared":return[{...t,categorizerQuestions:[],categorizerData:{}},[async t=>{let{api:n,dispatch:a}=t,r=(await n.systemGetConfiguration("bardeenai_classification_prebuilts_v1")).targets.find(t=>t.valueKey===e.template.target),i=r?.buckets.find(t=>t.id===e.template.bucket);r&&i&&a({type:"Categorizer/QuestionsFetched",target:r.value,bucket:i,questions:i.questions})}]];case"Categorizer/QuestionsFetched":return[{...t,categorizerTarget:e.target,categorizerBucket:e.bucket,categorizerQuestions:e.questions.map(e=>({...e,seen:!1}))},[]];case"Categorizer/FetchDataSuccess":return[{...t,loading:!1,categorizerData:{...t.categorizerData,[e.uri]:e.data}},[]];case"CategorizerAction":{if(!t.inputFlowState||"Categorizer"!==t.inputFlowState.type||e.uuid!==t.inputFlowState.uuid)return[t,[]];let[n,a]=m.Ff(e.action,t.inputFlowState);return[{...t,inputFlowState:n},a.map((0,C.zy)(t=>({type:e.type,action:t,uuid:e.uuid})))]}case"CategorizerPreviewTrigger":return[{...t,confirm:null},[]];case"ResearchAssistantAction":{if(!t.inputFlowState||"ResearchAssistant"!==t.inputFlowState.type||e.uuid!==t.inputFlowState.uuid)return[t,[]];let{type:n}=e,[a,r]=y.Ff(e.action,t.inputFlowState);return[{...t,inputFlowState:a},r.map((0,C.zy)(t=>({type:n,action:t,uuid:e.uuid})))]}case"ResearchAssistant/Open":return[{...t,loading:!0},[async t=>{let{api:n,dispatch:a}=t,r=null,i=e.ref;if(e.ref){let t=(0,c.RY)(e.ref.uri),l=await Promise.all([n.objectStorageGetResource("bardeen_research_bot_template",t.id,t.tag),n.objectStorageGetMeta("bardeen_research_bot_template",t.id,t.tag)]);if(!(r=l[0]))return a({type:"ResearchAssistant/OpenError"});let o=l[1];o?.visibility!=="owned"&&(i=null,r=p.G.createWithID(r.name,{purpose:r.purpose,sections:r.sections,name:r.name,context:r.context,llmRole:r.llmRole}))}a({type:"ResearchAssistant/OpenSuccess",task:r,ref:i})}]];case"ResearchAssistant/OpenSuccess":return[{...t,inputFlowState:y.Ur((0,r.uniqueId)(),e)},[]];case"WritingAssistant/AnswerChanged":{if(!t.inlineWritingAssistant)return[t,[]];let n=z(t.inlineWritingAssistant.questions,t=>t.question===e.question.question?{...t,answer:e.answer}:t);return[{...t,inlineWritingAssistant:{...t.inlineWritingAssistant,questions:n}},[]]}}};function _(e){return!!e&&"object"==typeof e&&"displayHint"in e&&!!e.displayHint?.interactions?.openResource}let N=i.memo(function(e){let{statementIndex:t,argName:n,typeHint:a,addonState:r,value:l,dispatch:o,onChange:s,categorizerTemplate:c,writingAssistantTemplate:d}=e;return i.createElement(i.Fragment,null,(0,E.oW)(a?.signature)?i.createElement($,{onCreate:(e,a)=>{o({type:"Scraper/Create",id:`scraper/${t}/${n}`,url:e,goal:a,statementIndex:t})},onEdit:e=>{o({type:"Scraper/Edit",id:`scraper/${t}/${n}`,ref:e})},typeHint:a,scraperUuid:`scraper/${t}/${n}`,onSave:s,value:l}):(0,E.r6)(a.signature)?i.createElement(F.l,{value:l,state:r,dispatch:o,typeHint:a,onChange:s,template:d}):(0,E.Ut)(a.signature)?i.createElement(w.C,{state:r,dispatch:o,typeHint:a,value:l,statementIndex:t,onChange:s,template:c}):(0,E.Ce)(a.signature)?i.createElement(I.S,{state:r,dispatch:o,typeHint:a,value:l,onChange:s}):_(l)?i.createElement(A.j,{openInteraction:l.displayHint.interactions.openResource}):void 0,r.confirm&&i.createElement(v.u,{dispatch:o,state:r.confirm}))}),B=(e,t)=>(0,E.oW)(e?.signature)||_(t);function D(e,t,n,a){let r=[];return(0,E.oW)(e?.signature)&&r.push({label:"Create new Scraper Template",icon:"PlusOutline",onClick:()=>{a({type:"Scraper/Create",id:`scraper/${t}/${n}`,url:void 0,goal:void 0,statementIndex:t})}}),r}let H=i.memo(function(e){let{statementIndex:t,argName:n,typeHint:a,addonState:r,value:l,dispatch:o,onChange:s}=e;return B(a,l)?i.createElement(i.Fragment,null,(0,E.oW)(a?.signature)?i.createElement(T,{typeHint:a,scraperUuid:`scraper/${t}/${n}`,onSave:s},i.createElement(k.fI,null,l?.type==="ObjectStorageReferenceExpression"&&i.createElement(L,{variant:"flat",round:!0,size:"m",icon:"PencilOutline",tooltipText:"edit","aria-label":"edit",$empty:!l||!(0,h.H)(l),onClick:()=>{l.ref&&o({type:"Scraper/Edit",id:`scraper/${t}/${n}`,ref:l.ref})}}),i.createElement(L,{variant:"flat",round:!0,size:"m",icon:"PlusOutline",tooltipText:"Create new Scraper Template","aria-label":"Create new Scraper Template",$empty:!l||!(0,h.H)(l),style:{borderTopRightRadius:8,borderBottomRightRadius:8},onClick:()=>{o({type:"Scraper/Create",id:`scraper/${t}/${n}`,url:void 0,goal:void 0,statementIndex:t})}}))):_(l)?i.createElement(k.fI,null,i.createElement(L,{variant:"flat",round:!0,size:"m",icon:"OpenLinkOutline",tooltipText:l.displayHint.interactions.openResource.title,"aria-label":l.displayHint.interactions.openResource.title,$empty:!l||!(0,h.H)(l),style:{borderTopRightRadius:8,borderBottomRightRadius:8},href:l.displayHint.interactions.openResource.href})):void 0,r.confirm&&i.createElement(v.u,{dispatch:o,state:r.confirm})):null}),z=(e,t)=>{let n=e?.find(e=>!e.seen);return n&&e?e.map(e=>e.question===n.question?t(e):e):e},L=(0,l.Ay)(k.$n)`
  padding: 19px;
  border-radius: 0;
  border: 1px solid ${a.Tc2};
  border-left: none;
  z-index: 1;
  background: ${a.ONy};
  ${e=>{let{$empty:t}=e;return!t&&"box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);"}};
`},26572:(e,t,n)=>{n.d(t,{U:()=>m,u:()=>b});var a=n(69670),r=n(67331),i=n(78445),l=n(69238),o=n(45250),s=n(14041),c=n(39716),d=n(39629),u=n(48143),p=n(28926);let m=(e,t,n)=>({type:"addCard",targetIndex:t,targetInside:n,mode:e,apps:{favorites:{},more:{},promoted:{},promotedCommands:[]},commandsLoading:!0,selectedApp:null,searchInput:""}),g=e=>"commandId"in e,y=e=>"commands"in e,f={Scraper:{text:"With our Scraper you can extract data from any website, create templates to fill in forms or navigate and perform actions.",link:"https://www.bardeen.ai/scraper"},WebSearch:{text:"Find accurate information quickly and easily for any search term.",link:""},BardeenEnrichment:{text:"Get up-to-date company and contact information like social links, email addresses, phone numbers, and more.",link:"https://www.bardeen.ai/product/bardeen-enrichment"},BardeenCommons:{text:"Perform our most used actions like moving and finding data, opening links, and saving PDFs.",link:"https://www.bardeen.ai/product"},BardeenAI:{text:"Categorize data, generate messages and reports, convert text into speech and more.",link:""}},h=(e,t)=>{let n=e.flatMap(e=>e.commands.map(t=>({...t,pluginAlias:e.name,pluginName:e.label,icon:e.icon,name:t.name})));for(let e of t)n.push({...e,pluginAlias:e.pluginAlias,pluginName:e.pluginAlias,icon:e.icon,name:e.name});return new l.Rk(n,{casing:"case-insensitive",selector:e=>`${e.name} ${e.pluginName} ${e.expressions.join(" ")}`})},b=e=>{let{state:t,dispatch:n,onClose:r,onSelectCommand:i}=e,l=s.useRef(null),c=e=>{n({type:"AddCard/SelectedApp",app:e})},m=Object.values(t.apps.favorites),f=Object.values(t.apps.more),b=Object.values(t.apps.promoted),C=t.apps.promotedCommands,w=s.useMemo(()=>h([...m,...f,...b].filter(d.zz),C),[m,f,b,C]),A=""!==t.searchInput?(0,o.uniqBy)(w.find(t.searchInput),"item.commandId"):null;(0,s.useEffect)(()=>{l.current?.scrollIntoViewIfNeeded()},[t.selectedApp]);let I=t.selectedApp,P=null===I&&""===t.searchInput,T=null!==I&&""===t.searchInput,F=A?.map(e=>e.item)??(T?I?.commands.map(e=>({...e,pluginAlias:I.name})):P?[...m,...f]:[]),{selectedIndex:R,handleKeyDown:M,containerRef:O}=(0,u.JZ)(F,e=>{"commandId"in e?i({commandId:e.commandId,pluginAlias:e.pluginAlias,name:e.name,expressions:e.expressions}):c(e)});return s.createElement(k,{"data-testid":"builder-new-action-card"},s.createElement($,null,T&&s.createElement("div",{style:{borderRight:`1px solid ${a.Tc2}`,paddingRight:"12px"}},s.createElement(p.$n,{icon:"FullArrowLeftOutline",size:"l",variant:"flat",tooltipText:"Back",round:!0,onClick:()=>c(null)})),s.createElement("div",{style:{padding:`0 28px 0 ${T?"28px":"12px"}`,width:"100%"}},s.createElement(p.dN.Ghost,{onKeyDown:M,autoFocus:!0,size:"xl",style:{paddingLeft:"0px",paddingRight:"0",width:"100%"},value:t.searchInput,onChange:e=>{n({type:"AddCard/UpdatedInput",input:e})},placeholder:"command"===t.mode?"What do you want to happen? E.g. Add data to Google Sheets":"When do like it to run? E.g. When row is added to Google Sheets",addonBefore:s.createElement(p.In,{icon:"MagnifierOutline"})})),r&&s.createElement(p.Jn,{onClick:r})),s.createElement("div",{style:{display:"flex",minHeight:0}},A?.length===0?s.createElement(x,null):s.createElement(s.Fragment,null,s.createElement(p.mH,{itemGap:4,style:{flex:1,paddingInline:8},ref:O},P&&s.createElement(s.Fragment,null,m.length>0&&s.createElement(E,{activeIndex:R,label:"Favorite Apps",apps:m,onSelect:e=>c(e)}),s.createElement(E,{activeIndex:R-m.length,label:"More Apps",apps:f,onSelect:e=>c(e)})),T&&s.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4}},s.createElement(S,null,I.label," Actions"),I.commands.map((e,t)=>s.createElement(v,{active:R===t,key:e.commandId,name:e.name,icon:I.icon,label:e.name,onClick:()=>i({commandId:e.commandId,pluginAlias:I.name,name:e.name,expressions:e.expressions})}))),A?.map((e,t)=>{let{item:n}=e;return s.createElement(v,{active:R===t,name:n.name,key:n.commandId,icon:n.icon,label:n.name,onClick:()=>i({commandId:n.commandId,pluginAlias:n.pluginAlias,name:n.name,expressions:n.expressions})})})),P&&s.createElement(s.Fragment,null,s.createElement(p.VP,{style:{borderLeft:`1px solid ${a.Tc2}`}}),s.createElement(p.mH,{style:{width:"40%",backgroundColor:a.o$k,paddingInline:8}},s.createElement(S,null,"Bardeen Features"),(0,o.sortBy)([...C,...b],"priority").toReversed().map(e=>g(e)?s.createElement(v,{key:e.commandId,label:e.name,name:e.name,icon:e.icon||"IntegrationBardeenCommons",onClick:()=>i({commandId:e.commandId,pluginAlias:e.pluginAlias,name:e.name,expressions:e.expressions})}):y(e)?s.createElement(v,{name:e.name,key:e.name,label:e.label,icon:e.icon,onClick:()=>c(e)}):void 0))))))},x=()=>s.createElement(p.VP,{style:{width:"100%",padding:"40px"},center:!0,gap:12},s.createElement(r.H3,{style:{color:a.t14}},"No matching results"),s.createElement(r.P,{$small:!0},"Unfortunately we don\u2019t have any app or action matching your input."),s.createElement(p.$n,{style:{margin:"10px 0"},variant:"primary",size:"l",round:!0,text:"Request new action",href:"https://www.bardeen.ai/integration-request"})),E=e=>{let{label:t,apps:n,onSelect:a,activeIndex:r}=e;return s.createElement(s.Fragment,null,t&&s.createElement(S,null,t),n.map((e,t)=>s.createElement(v,{active:r===t,name:e.name,key:e.name,label:e.label,icon:e.icon,onClick:()=>a(e)})))},v=e=>{let{icon:t,label:n,name:a,onClick:i,active:l}=e,o=f[a];return s.createElement(p.IU,{"aria-selected":l,onClick:i,rightAddon:o&&s.createElement(w,{delay:500,interactive:500,content:s.createElement(s.Fragment,null,s.createElement(A,null,n),s.createElement(I,{$small:!0},o.text),o.link?s.createElement(P,null,s.createElement(p.$n,{variant:"primary",size:"l",round:!0,text:"Learn More",href:o.link})):null),placement:"left"},s.createElement(C,null,s.createElement(p.In,{icon:"RadioInfoBold"}))),icon:t},s.createElement(r.P,{style:{color:"unset"},$small:!0},n))},C=c.Ay.div`
  display: flex;
  --icon-size: 16px;
  --icon-color: ${a.wdA};

  &:hover {
    --icon-color: ${a.NcT};
  }
`,S=(0,c.Ay)(r.P)`
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  font-family: Inter;
  padding-left: 16px;
  color: ${a.CP};
  padding-block: 4px;
  position: sticky;
  top: 0;
  background: ${a.ONy};
  z-index: 1;
`,k=c.Ay.div`
  max-height: 624px;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  ${p.IU} p {
    font-weight: 400;
  }
`,w=(0,c.Ay)(i.m)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
`,A=(0,c.Ay)(r.H5)`
  color: ${a.ONy};
`,I=(0,c.Ay)(r.P)`
  color: ${a.MfC};
  font-weight: 400;
`,P=c.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,$=(0,c.Ay)(p.fI)`
  padding: 4px 12px;
  --icon-scale: 1.1;
  border-bottom: 1px solid ${a.Tc2};
  justify-content: space-between;
  width: 100%;
`},64942:(e,t,n)=>{n.d(t,{e:()=>A});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(99538),s=n(14744),c=n(85170),d=n(44835),u=n(28926),p=n(42014),m=n(66712),g=n(62825),y=n(81250),f=n(78445),h=n(45742);let b=e=>{let{text:t,children:n}=e,a=i.useRef(null),[r,l]=i.useState(!1);i.useEffect(()=>{let e=a.current;e&&l(e.scrollWidth>e.clientWidth)},[t]);let o=i.cloneElement(n,{ref:a});return r?i.createElement(f.m,{placement:"top-end",content:t},o):o},x=e=>{let{arg:t,onClear:n}=e,{typeHint:a,value:l,label:o}=t,s=`"${o}" ${"config"===t.save?"saved as":"ran with"}`,d=l&&(0,h.wL)(l),p=d?'"no value"':(0,c.NI)(l);return i.createElement(u.fI,{style:{position:"relative"}},i.createElement(E,{"aria-label":"saved input value",style:{backgroundColor:r.KxS},title:i.createElement(v,{gap:8},i.createElement(b,{text:s},i.createElement(C,{$bold:!0,$small:!0},s)),!d&&a.typeIcon?i.createElement("span",{style:{display:"flex",alignItems:"center"}},i.createElement(u.In,{icon:a.typeIcon})," "):null,i.createElement("span",null,i.createElement(f.m,{content:d?"Skipped":p},i.createElement(S,{$small:!0},p))))}),i.createElement(u.$n,{variant:"flat",round:!0,size:"m",icon:"CrossOutline",tooltipText:"Reset saved input",style:{position:"absolute",right:12},onClick:n}))},E=(0,l.Ay)(u.N)`
  ${u.N.Title} {
    width: 100%;
  }
  padding-inline-end: 48px;
`,v=(0,l.Ay)(u.fI)`
  width: 100%;
  min-width: 0;
`,C=(0,l.Ay)(a.P)`
  flex-shrink: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 50%;
`,S=(0,l.Ay)(a.P)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`,k=e=>{let{args:t,children:n}=e;return t.length?i.createElement(u.R9,{enabled:t.length>5,minHeight:180},i.createElement(u.VP,{gap:12},t.map((e,t)=>i.createElement(i.Fragment,{key:t},n(e))))):null};var w=n(58651);let A=i.memo(function(e){let{argument:t,suggestions:n,children:l,onChange:f,requestSuggestions:h,resetSuggestions:b,inFirstStatement:E,...v}=e;(0,d.ky)("argument");let C=(0,m.k)(),{statementIndex:S}=C,A=t.displayHint?.description||"",T=t.displayHint?.label||t.name,F=t.displayHint?.required||!1,R=i.useMemo(()=>{let e=new Set;return(0,o.Cw)(t.value,{visitFieldRemappingExpression:t=>(e.add(t.accordingTo),!0)}),Array.from(e)},[t.value]),M=i.useCallback((e,n)=>{for(let e of R)C.onPlaybookArgReset(e,!0);f({...t,value:e},n)},[f,t,R,C]);(0,s.Ay)(I(t),"failed isWithRequiredHints");let O=(0,p.Qz)(),_=(0,c.Ut)(t.typeHint.signature),N=(0,c.KH)(t.typeHint.signature),B={fetchSuggestions:(e,n,a)=>{h({argumentName:t.name,typeSignature:n,userInput:e,isPlaybookArgument:!1,forceRefreshCache:a?.forceRefreshCache??!1,pbArgumentsOnly:a?.pbArgumentsOnly??!1})},fetchPreviousActions(){O(C.statementIndex,this.typeHint)},resetSuggestions:b,reloadValue:()=>{C.onRevalidatePlaybook()},suggestions:n,argName:t.name,argLabel:t.displayHint?.label||t.name,typeHint:t.typeHint,displayHint:t.displayHint,options:{excludeGetFromPreviousActions:E||_&&!N,excludeAskMeEveryTime:!1}},D=(0,i.useMemo)(()=>C.playbookArgs.filter(e=>e.value&&e.usedInStatementArg.find(e=>{let{index:n,argName:a}=e;return n===S&&a===t.name})),[C.playbookArgs,S,t.name]),H=$(t.typeHint.signature);return i.createElement(u.VP,{gap:32,...v},i.createElement(u.VP,{gap:12},i.createElement(u.VP,{gap:24},i.createElement(u.fI,{gap:16,style:{minWidth:0}},H||i.createElement(u.VP,{style:{flex:1},gap:12},i.createElement(w.A1,null,T),A&&i.createElement(a.P,{$small:!0,style:{color:r.Wm}},A)),F?i.createElement(a.P,{$small:!0,style:{color:r.wmS,lineHeight:"20px",alignSelf:"start",marginTop:4}},"Required"):null),i.createElement(P,{"data-argument-name":t.name,tabIndex:0,gap:12},i.createElement(g.r,{argContext:B,fieldMappingConfig:t.typeHint?.signature[0]?.config,expr:t.value,onChange:M}),D.length>0&&i.createElement(k,{args:D},e=>i.createElement(x,{arg:e,onClear:()=>C.onPlaybookArgReset(e.name)})))),c.PA(t)?.map((e,t)=>i.createElement(y.t,{status:e,key:t})),t.validationStatus?.map((e,t)=>i.createElement(y.t,{status:e,key:t}))),l?.(M,t.typeHint))}),I=e=>"typeHint"in e,P=(0,l.Ay)(u.VP)``,$=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return(0,c.Ut)(e)?i.createElement("div",null,i.createElement(w.A1,null,"Categorizer Template"),i.createElement(a.P,{$small:!0,style:{color:r.Wm}},"Select or create a template to start categorizing your data. The AI will sort your data into categories you select, e.g. important or unimportant emails.")):null}},89787:(e,t,n)=>{n.d(t,{e:()=>c});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(48143),s=n(28926);let c=e=>{let{app:t,from:n}=e,r=d(t.factoryId),l=(0,o.jL)(),c={from:n,switchTo:null};return i.createElement(u,{$error:!!r},i.createElement(s.fI,{center:!0,gap:16,style:{marginBottom:12}},i.createElement(m,{icon:"BardeenLogoV2White",iconSize:"m-l",variant:"flat",rect:!0,size:"l",tooltipText:""}),i.createElement(s.z9,{icon:t.icon,rect:!0,size:"l",tooltipText:"",iconSize:"m-l"})),i.createElement(a.H4,null,r?`${t.name} couldn't connect`:"Connect your app with Bardeen"),i.createElement(s.VP,{gap:8,center:!0},r?i.createElement(g,{$small:!0},r):i.createElement(i.Fragment,null,i.createElement(g,{$small:!0},"You can update or disconnect your apps any time in your settings."),i.createElement(a.N,{href:"https://www.bardeen.ai/privacy-policy",target:"_blank"},"Learn more"))),i.createElement(p,null,i.createElement(s.$n,{round:!0,text:r?"Retry":"Connect",size:"l",onClick:()=>l({type:"App/AppConnectClicked",app:t,userData:c})})))},d=e=>{let t=(0,o.rD)().failedAppConnection;if(t?.factoryId!==e)return null;let{state:n}=t.instance;return"disconnected"!==n.type?null:n.reason||"An unknown error occured"},u=l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  gap: 14px;

  background-color: ${e=>e.$error?r.P0$:r.KxS};
`,p=l.Ay.div`
  margin-top: 14px;
`,m=(0,l.Ay)(s.z9)`
  background: radial-gradient(100% 100% at 0% 0%, #8c80d6 0%, #6f60cc 100%);
`,g=(0,l.Ay)(a.P)`
  align-items: center;
`},77620:(e,t,n)=>{n.d(t,{gM:()=>er,qm:()=>ei,OO:()=>eb});var a=n(99676),r=n(67331),i=n(69670),l=n(78445),o=n(14041),s=n(39716),c=n(91159),d=n(49861),u=n(45742),p=n(85170),m=n(48143),g=n(10777),y=n(28926),f=n(36836),h=n(98380);function b(e){let{error:t}=e;return o.createElement(y.VP,{gap:24},o.createElement(y.BQ,{round:!0,variant:"critical",icon:"RadioExclamationBold"},(0,h.u)(t.error)))}var x=n(41880),E=n.n(x),v=n(47521),C=n.n(v);let S=s.Ay.div`
  margin: 8px 0;
  height: 1px;
  align-self: stretch;
  background: ${i.Tc2};
`;var k=n(5629);let w=(0,o.memo)(e=>{let{groups:t,selectedGroup:n,onGroupSelect:a}=e,r=e=>{a&&(n===e?a(null):a(e))};return t?.length?o.createElement(A,{enabled:t.length>4,minHeight:100},o.createElement("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"}},t.map((e,t)=>o.createElement(y.$n,{key:`group-${t}`,text:`${e.name} (${e.value})`,onClick:()=>r(e.name),size:"xl",variant:"outlined",selected:n===e.name,style:{fontSize:"14px",flex:"1 0 33.333%"}})))):null}),A=(0,s.Ay)(y.R9)`
  button {
    margin: 4px;
  }
`;var I=n(24760),P=n(79842);let $=o.memo(function(e){let{result:t,fullScreenTab:n,currentRowBody:a,selectedGroup:i,dispatch:l,statementIndex:s,tableOnly:c}=e,d=t.tabs.length>1,u=e=>l({type:"StatementResult/ShowRowBodyClicked",statementIndex:s,rowBodyState:e}),p=(e,t)=>l({type:"StatementResult/GroupSelected",statementIndex:s,tabTitle:e,groupName:t});return o.createElement(o.Fragment,null,o.createElement(y.VP,{gap:32},t.message&&o.createElement(y.BQ,{round:!0,variant:B[t.message.type].variant,icon:B[t.message.type].icon},t.message.message),o.createElement(y.VP,{gap:40},t.tabs.map(e=>{let t=e.table.columns.find(e=>e.computeUniqueValues)?.name,n=i[e.title]&&t?n=>{let a=n.data[t];return a?.value===i[e.title]}:void 0,a=i[e.title]&&t?n=>{let a=n.values[t];return a?.text===i[e.title]}:void 0,m=(0,k.yY)((0,k.kN)(e.table,u,!0),n),g=d&&o.createElement(y.fI,null,o.createElement(r.H5,null,e.title));return o.createElement(y.VP,{key:e.title,gap:24},g,o.createElement(T,{breakdown:e.breakdown}),o.createElement(w,{groups:m.groups,selectedGroup:i[e.title]||null,onGroupSelect:t=>p(e.title,t)}),o.createElement(I.m,{tableOnly:c,table:e.table,onRowClick:u,filterFn:n,footer:o.createElement(R,{tab:e,selectedGroup:i[e.title]||null,groupFilterFn:a},m.totalRows>5?o.createElement(y.$n,{"data-testid":"field-value-records",text:`Show all (${m.totalRows})`,size:"m",round:!0,variant:"flat",onClick:()=>l({type:"StatementResult/ShowFullScreenTabClicked",statementIndex:s,tab:e})}):null)}))}))),n?o.createElement(O,{tab:n,selectedGroup:i[n?.title]||null,onClose:()=>l({type:"StatementResult/CloseFullScreenTabClicked",statementIndex:s}),onRowAction:u,onGroupSelected:p}):null,a?o.createElement(M,{row:a.row,columns:a.columns,onClose:()=>l({type:"StatementResult/CloseRowBodyClicked",statementIndex:s})}):null)}),T=e=>{let{breakdown:t}=e,{c_good:n,c_error:a,c_empty:r,c_skip:i,c_filter:l}=t;if(r+a+i+n+l<=1)return null;let s=n+a;return o.createElement(F,null,i>0&&o.createElement(y.BQ,{variant:"warning",round:!0,center:!0,style:{marginBottom:8}},o.createElement("strong",null,"Skipped ",i," row",1===i?"":"s"," due to previous errors")),l>0&&o.createElement(y.BQ,{variant:"info",round:!0,center:!0,style:{marginBottom:8}},o.createElement("strong",null,"Skipped ",l," row",1===l?"":"s"," that did not match the filter")),n<s?o.createElement(y.BQ,{variant:"warning",round:!0,center:!0,style:{marginBottom:8}},o.createElement("strong",null,"Errors encountered in ",a," row",1===a?"":"s")):null)},F=(0,s.Ay)(y.fI)`
  gap: 8px;
`,R=e=>{let{children:t,tab:n,selectedGroup:a,groupFilterFn:r}=e;return o.createElement(_,null,o.createElement(N,null,o.createElement(L,{tab:n,selectedGroup:a,groupFilterFn:r})),o.createElement(N,null,t),o.createElement(N,null,o.createElement(U,{tab:n,selectedGroup:a,groupFilterFn:r})))},M=e=>{let{row:t,columns:n,onClose:a}=e;return o.createElement(y.aF,{isOpen:!0,onClose:a,style:{padding:32},"data-testid":"row-body-modal"},o.createElement(y.VP,{gap:32,style:{height:"100%",maxWidth:848,minWidth:580,margin:"auto"}},t.message?o.createElement(r.H4,{style:{textAlign:"center"}},t.message.message||"Content"," "):null,o.createElement(P.Y,{row:t,columns:n,defaultFieldsOnly:!0})))},O=e=>{let{tab:t,selectedGroup:n,onClose:a,onRowAction:i,onGroupSelected:l}=e,s=t.table.columns.find(e=>e.computeUniqueValues)?.name,c=n&&s?e=>{let t=e.data[s];return t?.value===n}:void 0,d=n&&s?e=>{let t=e.values[s];return t?.text===n}:void 0,{columns:u,rows:p,groups:m}=(0,k.yY)((0,k.kN)(t.table,i,!1),c);return o.createElement(y.aF,{isOpen:!0,onClose:a,fullWidth:!0,"data-testid":"show-all-results-modal"},o.createElement(y.VP,{center:!0,style:{width:"100%",height:"100%"}},o.createElement(y.fI,{style:{padding:16,paddingInlineStart:20,width:"100%"},gap:8},t.icon&&o.createElement(y.In,{icon:t.icon,size:16}),o.createElement(r.P,{$small:!0,style:{flexGrow:1}},o.createElement("strong",null,t.title)),o.createElement(L,{tab:t,selectedGroup:n,groupFilterFn:d}),o.createElement(U,{tab:t,selectedGroup:n,groupFilterFn:d}),o.createElement(y.$n,{tooltipText:"Close",size:"m",round:!0,variant:"flat",icon:"CrossOutline",onClick:a})),o.createElement(S,{style:{margin:0}}),o.createElement(y.VP,{style:{flexGrow:1,width:"100%",overflow:"auto",gap:16,padding:20}},o.createElement(w,{groups:m,selectedGroup:n,onGroupSelect:e=>l(t.title,e)}),o.createElement(z,{columns:u,rows:p,style:{width:"100%"},showRowNumbers:!0}))))},_=(0,s.Ay)(y.fI)`
  justify-content: space-between;
`,N=s.Ay.div``,B={"no-data":{variant:"info",icon:"RadioInfoBold"},info:{variant:"info",icon:"RadioInfoBold"},success:{variant:"success",icon:"RadioCheckmarkBold"}},D=(e,t)=>{let n=e.table.columns.map(e=>e.title),a=(t?e.table.rows.filter(t):e.table.rows).map(t=>{let n={};return e.table.columns.forEach(e=>{n[e.title]=(0,k.cx)(t.values[e.name]).value}),n});return E().unparse({data:a,fields:n},{quotes:!0})},H=(e,t)=>{let n=t?e.table.rows.filter(t):e.table.rows;return C()(`
    <table>
      <thead>
        <tr>
          ${e.table.columns.map(e=>`<th>${e.title}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${n.map(t=>`<tr>${e.table.columns.map(e=>{let{name:n}=e;return`<td>${t.values[n]?(0,k.cx)(t.values[n]).value:""}</td>`}).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `)},z=(0,s.Ay)(y.XI)`
  .error-row {
    --icon-color: ${i.uSe};
    --row-background-color: ${i.bCn};
    --row-hover-background-color: ${i.ZE3};
    --row-text-color: ${i.wmS};
    --row-hover-text-color: ${i.wmS};
  }
`,L=o.memo(e=>{let{tab:t,selectedGroup:n,groupFilterFn:a}=e,[r,i]=(0,o.useState)(!1),l=async e=>{let n=H(t,e),a=D(t,e),r=new Blob([n],{type:"text/html"}),l=new Blob([a],{type:"text/plain"});await navigator.clipboard.write([new ClipboardItem({"text/html":r,"text/plain":l})]),i(!0),setTimeout(()=>i(!1),1e3)},s=r?"Copied!":"Copy to clipboard";return n?o.createElement(y.ms,{placement:"bottom-start",width:300,autoCloseOnContentClick:!0,renderContent:e=>{let{closeAnd:t}=e;return o.createElement(y.VP,{gap:4},o.createElement(y.IU,{text:"Copy all",onClick:t(()=>l())}),o.createElement(y.IU,{text:`Copy selected (${n})`,onClick:t(()=>l(a))}))}},o.createElement(y.$n,{size:"m",round:!0,variant:"flat",icon:"HoverOutline",tooltipText:s})):o.createElement(y.$n,{size:"m",round:!0,variant:"flat",icon:"HoverOutline",tooltipText:s,onClick:()=>l()})}),U=o.memo(e=>{let{tab:t,selectedGroup:n,groupFilterFn:a}=e,r=(e,n)=>{let a=new Blob([D(t,e)],{type:"text/csv"}),r=URL.createObjectURL(a),i=new Date().toISOString(),l=document.createElement("a"),o=t.title.replace(/[^a-zA-Z0-9]/g,"_"),s=n?`_${n}`:"";l.download=`${o}${s}_${i}.csv`,l.href=r,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(r)};return n?o.createElement(y.ms,{placement:"bottom-end",autoCloseOnContentClick:!0,width:300,renderContent:e=>{let{closeAnd:t}=e;return o.createElement(y.VP,{gap:4},o.createElement(y.IU,{text:"Download all",onClick:t(()=>r(void 0,"all"))}),o.createElement(y.IU,{text:`Download selected (${n})`,onClick:t(()=>r(a,n))}))}},o.createElement(y.$n,{size:"m",round:!0,variant:"flat",icon:"DownloadOutline",tooltipText:"Download CSV"})):o.createElement(y.$n,{size:"m",round:!0,variant:"flat",icon:"DownloadOutline",tooltipText:"Download CSV",onClick:()=>r()})}),V=o.memo(function(e){let{result:t,dispatch:n,statementIndex:a,tableOnly:r}=e;switch(t.result.type){case"success":return o.createElement($,{result:t.result,fullScreenTab:t.fullScreenTab,currentRowBody:t.rowBodyState,selectedGroup:t.selectedGroup,dispatch:n,statementIndex:a,tableOnly:r});case"error":return o.createElement(b,{error:t.result})}});var q=n(93754),j=n(56),W=n(58721);let G=o.memo(function(e){let t=e.units&&"flatCost"in e.units?e.units.flatCost:e.units?.microCreditsPerUnit??1e3;return o.createElement(Y,null,o.createElement(W.m,{style:{fontSize:"16px",marginRight:"12px"}})," ",o.createElement("strong",null,Math.ceil(t/1e3)," Credit / Record"),"\xa0(testing is free - limited to 5 outputs / action)")}),Y=s.Ay.div`
  padding: 12px 24px;
  text-align: center;
  margin-bottom: -24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;var Q=n(54555),J=n(58651),Z=n(89787);let X=e=>{let t=e.breakdown.c_empty+e.breakdown.c_error+e.breakdown.c_skip+e.breakdown.c_good+e.breakdown.c_filter;return e.breakdown.c_empty+e.breakdown.c_filter+e.breakdown.c_skip===t?o.createElement(K,null,o.createElement(y.In,{icon:"RadioEmptyBold",color:i.wdA,size:20,"aria-label":"Action did not run"})):e.breakdown.c_good+e.breakdown.c_filter===t?o.createElement(K,null,o.createElement(y.In,{icon:"RadioCheckmarkBold",color:i.XxH,size:20,"aria-label":"Action successfully executed"})):e.breakdown.c_error===t?o.createElement(K,null,o.createElement(y.In,{icon:"TriangularExclamationBold",color:i.KE7,size:20,"aria-label":"Action failed"})):o.createElement(K,null,o.createElement(y.In,{icon:"TriangularExclamationBold",color:i.eJD,size:20,"aria-label":"Action contains errors"}))},K=s.Ay.span`
  background-color: ${i.o$k};
  border-radius: 100%;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
`,ee=e=>{let t={error:{title:"Preview not available.",description:"Some issues detected in the actions up to here.",buttonText:"Go to issue",onClick:()=>e.dispatch({type:"ClickedJumpToFirstError"})},test:{title:"Test out your Playbook",description:"Run a test of your automation to make sure everything's working correctly.",buttonText:"Test up to here",buttonIcon:"RadioPlayBold",onClick:()=>e.dispatch({type:"ClickedRunPlaybook",forceValidatePlaybook:!1,testMode:!0,autobookBehaviour:"activate",runParams:{targetIndex:e.statementIndex,targetCacheBehavior:"run-all",defaultCacheBehavior:"default",limitResults:null}})},run:{title:"Run your Playbook",description:'Click "Run Playbook" to see the results.'},lonelyWhen:{title:"Add some actions first",description:"You can only preview this card once you have added some automation actions."},readOnly:{title:"Action skipped",description:"This action didn't run."}}[e.status],n=t.buttonText;return o.createElement(et,{$error:"error"===e.status},o.createElement(r.H4,null,t.title),o.createElement(r.P,{$small:!0,style:{textAlign:"center"}},t.description),n?o.createElement(en,null,o.createElement(y.$n,{round:!0,text:n,icon:t.buttonIcon,size:"l",onClick:t.onClick})):null)},et=s.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  gap: 14px;
  background-color: ${e=>{let{$error:t}=e;return t?i.P0$:i.KxS}};
`,en=s.Ay.div`
  margin-top: 14px;
`,ea=(0,s.Ay)(y.VP)`
  padding: 40px 32px;
  gap: 14px;
`;ea.displayName="PreviewWrapper";let er=o.memo(function(e){let{activeStep:t,dispatch:n,pbEqualsLastDescribedPlaybook:r,block:i,activeIndex:l,isRunning:s,hasErrorUpToHere:c,playbookArgs:d,isTestButtonDisabled:m,isLonelyTriggerCard:f,isArgumentFilling:h,isGroupCard:b,argumentFillingState:x,isAutobook:E,isReadOnly:v,isTestModeEnabled:C,sequencingStatus:S,isFirstStatement:k,...w}=e,{selectedTab:A,index:I,progress:P,progressText:$,status:T,expanded:F,actionNumber:R,displayHint:M,comment:O,isTrigger:_,validationError:N,validationStatus:B}=i,D=N?(0,p.kJ)(N):null,H=B?.find(e=>"disconnected"===e.type),z=H?.type==="disconnected",L=I===l,U=S?.type==="running"&&(S.startedStatements||[]).includes(I),V=s&&(h?!L:!U),q="filling"!==S.type,W=!s&&i.args.length>0&&!v,G=!v&&!s&&!f&&(!E||C),Y=!C&&q&&(0,u.gB)(i.entry)&&"success"===i.entry.result.type?(i.entry.result.microCredits/1e3).toFixed(0):void 0,X=(0,u.gB)(i.entry)&&(0,u.Ze)(i.entry.result)?i.entry.result.breakdown:void 0,K=N&&D;return o.createElement(ek,{...w,"data-testid":"builder-card","data-statement-index":I,disabled:V,$isTestButtonDisabled:m,status:"loading"===T?"loading":D?"error":void 0,expanded:!h&&F,tabIndex:0,Header:o.createElement(g.sx,{id:String(I),disabled:_},o.createElement(ey,{canEdit:!V&&!s&&!v,isTrigger:_,dispatch:n,index:I,expanded:F,comment:O,prettyTitle:b||!i.commentFlags?.keep&&!r,displayHint:M,playbookArgs:d})),Prefix:o.createElement(ef,{isTrigger:_,stepNumber:R}),Suffix:o.createElement(j.Z.Suffix,{"data-testid":"builder-card-suffix"},o.createElement(J.PB,null,K?o.createElement(eb,{icon:"TriangularExclamationBold",variant:"ghost",tooltipText:D,onClick:()=>n({type:"ClickedJumpToError",error:N})}):o.createElement(o.Fragment,null,o.createElement("span",{style:{position:"absolute"},"data-status":!0},o.createElement(ep,{status:T,breakdown:X})),G&&o.createElement(em,{hasError:c,dispatch:n,index:I,isTestModeEnabled:C}))))},z?o.createElement("div",{style:{padding:"40px 32px"}},o.createElement(Z.e,{app:H.plugin,from:"builderV2"})):o.createElement(o.Fragment,null,o.createElement(eu,{credits:Y,showPreview:q,showCustomize:W,selectedTab:q?v?"Preview":A:"Customize",dispatch:n,index:I}),"Preview"===A&&q||v?"loading"===T?o.createElement(y.fI,{center:!0,style:{padding:"12px"}},o.createElement(eo,null,o.createElement(a.z,{value:P}),o.createElement(es,null,$))):q&&o.createElement(eg,{block:i,dispatch:n,index:I,hasErrorUpToHere:c,isLonelyTriggerCard:f,isReadOnly:v,isTestModeEnabled:C,isAutobook:E}):s?null:o.createElement(Q.I,{state:i,dispatch:n,playbookArgs:d,isFirstStatement:k})))}),ei=(0,s.Ay)(r.P)`
  ${J.Tf}
  color: ${i.vh3};
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-weight: 500;
  line-height: 28px;
`,el=s.Ay.p`
  ${J.Tf}
  color: ${i.wmS};
  flex-grow: 1;
  font-weight: 400;
  line-height: 16px;
  font-size: 12px;
`,eo=s.Ay.div`
  margin: 12px;
  padding: 12px;
  overflow: hidden;
  flex: 1;
`,es=s.Ay.div`
  padding: 12px;
  text-align: center;
  color: ${i.ydb};
  word-wrap: break-word;
`,ec=(0,s.Ay)(e=>o.createElement(j.Z.HeaderActionButton,{icon:"OverflowVerticalOutline",tooltipText:"More options",tooltipPlacement:"top",...e,text:void 0}))`
  opacity: ${e=>e.$isMenuOpen?1:0};
`,ed=(0,s.Ay)(y.fI).attrs({gap:8})`
  transition: transform 0.24s ease-out;
  transform: translateX(${e=>e.$isMenuOpen?"0":"40px"});
  position: absolute;
  top: 18px;
  right: 24px;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
  background: white !important;
`,eu=o.memo(function(e){let{selectedTab:t,dispatch:n,index:a,showCustomize:r,showPreview:i,credits:l}=e,s=[];return r&&s.push("Customize"),i&&s.push("Preview"),o.createElement(y.tU,{tabs:s,active:t,onTabClick:e=>n({type:"ClickedTabHeader",index:a,tab:e})},o.createElement(y.fI,{gap:24,style:{width:"100%",justifyContent:"flex-end",padding:"0 24px"}},l?o.createElement(y.fI,{gap:8},o.createElement(y.In,{icon:"TexturedCredits",size:16}),o.createElement(ew,{$small:!0},l," ","1"===l?"Credit":"Credits")):null))}),ep=o.memo(function(e){let{status:t,breakdown:n}=e;switch(t){case"loading":return o.createElement(y.y$,{size:"s","aria-label":"Preview run in progress",color:i.XxH});case"success":if(n)return o.createElement(X,{breakdown:n});return o.createElement(eC,{icon:"RadioCheckmarkBold",color:i.XxH,"aria-label":"Successful preview run"});case"idle":return null;case"error":return o.createElement(eC,{icon:"RadioCrossBold",color:i.CCs,"aria-label":"Failed preview run"})}}),em=o.memo(function(e){let{hasError:t,dispatch:n,index:a,isTestModeEnabled:r}=e;return o.createElement(ev,{disabled:t,variant:"primary",size:"m",icon:"PlayBold",round:!0,"data-tour-id":`play-btn-${a}`,onClick:()=>n({type:"ClickedRunPlaybook",forceValidatePlaybook:!1,testMode:r,autobookBehaviour:"activate",runParams:{targetIndex:a,targetCacheBehavior:"run-all",defaultCacheBehavior:"default",limitResults:null}}),tooltipText:t?"Some issues detected in the actions up to here.":`${r?"Test":"Run"} up to here`})}),eg=o.memo(function(e){let{block:t,dispatch:n,index:a,hasErrorUpToHere:r,isLonelyTriggerCard:i,isReadOnly:l,isTestModeEnabled:s,isAutobook:c}=e,d=t.entry;return o.createElement(ea,{"data-testid":"preview-wrapper"},d?o.createElement(y.mH,{"data-testid":"preview-result",style:{maxHeight:500}},o.createElement(V,{result:d,dispatch:n,statementIndex:a})):o.createElement(ee,{isAutobook:c,status:r?"error":i?"lonelyWhen":l?"readOnly":s?"test":"run",dispatch:n,statementIndex:a}),s&&o.createElement(G,{units:t.displayHint?.command.computeUnitsProduced}))}),ey=o.memo(function(e){let{dispatch:t,index:n,prettyTitle:a,expanded:r,comment:i,displayHint:l,isTrigger:s,canEdit:u,playbookArgs:p}=e,[g,h]=(0,o.useState)(!1),b=(0,c.ZH)(l?.command.expressions[0]??""),x=i||b,E=l?.plugin.icon?[l?.plugin.icon]:[],v=l?.plugin.name??"",{subscription:C}=(0,m.rD)(),S=l?.requiresPaymentPlan??[],k=d.CN(C,S),w=()=>t({type:"PlaybookArgsAction",action:{type:q.A.ResetStatementArgumentsClicked,index:n}}),A=()=>t({type:"DeleteStatementClicked",indexes:[n]}),I=(0,m.jL)(),P=()=>{I({type:"App/ConfirmShown",config:{type:"RenameStatement",index:n,name:x}})},$=p.some(e=>e.value&&e.usedInStatementArg.some(e=>e.index===n)),T=a&&!s?b:x,F=o.createElement(ex,null,o.createElement(j.Z.Header,{onClick:()=>t({type:"CardHeaderClicked",index:n}),"data-testid":"builder-card-header",style:{paddingInlineEnd:64}},E.map((e,t)=>o.createElement(y.z9,{key:t,icon:e,variant:"flat",size:"xs",iconSize:"m",tooltipText:"",style:{flexShrink:0,marginTop:"4px"}})),o.createElement(y.VP,{gap:6},o.createElement(ei,null,o.createElement(f.w,{onBlur:e=>{""===e.currentTarget.innerText.trim()&&(e.currentTarget.innerText=T)},style:{maxWidth:"100%",display:"inline"},value:T,onSave:e=>{""!==e&&t({type:"StatementNameChanged",index:n,name:e})}})),!a&&r&&i&&o.createElement(el,null,b)),k&&o.createElement(y.fI,{style:{height:28,alignItems:"center",flexShrink:0}},o.createElement(eh,{integrationName:v,productName:S[0]?.meta.title??"Business"}))),u&&o.createElement(ed,{$isMenuOpen:g},o.createElement(y.ms,{behavior:"flip",isOpen:g,onIsOpenChanged:h,autoCloseOnContentClick:!0,renderContent:()=>o.createElement(o.Fragment,null,!s&&o.createElement(y.IU,{text:"Duplicate",onClick:()=>t({type:"DuplicateStatementClicked",index:n})}),o.createElement(y.IU,{text:"Reset saved inputs",onClick:w,disabled:!$}),o.createElement(y.IU,{text:"Delete",onClick:A}),o.createElement(y.IU,{text:"Rename",onClick:P}))},o.createElement(ec,{$isMenuOpen:g}))));return o.createElement("div",{"data-testid":"builder-card-header-content"},u&&o.createElement(y.Yz,{size:4,$offset:0}),F)}),ef=o.memo(function(e){let{isTrigger:t,stepNumber:n}=e;return o.createElement(j.Z.Prefix,{"data-testid":"builder-card-prefix"},o.createElement(J.PB,null,t?o.createElement(y.In,{icon:"TexturedAutobookLightning",size:18}):n.toString()))}),eh=o.memo(e=>{let{integrationName:t,productName:n}=e,a=(0,m.jL)(),s=o.createElement(y.VP,{style:{padding:"20px 16px"},"data-tracking-context":"upgrade-badge-in-builder"},o.createElement(r.P,{$bold:!0,$color:i.ONy,style:{marginBottom:16}},"Unlock ",t," with Bardeen ",n),o.createElement(r.P,{$color:i.ONy,$small:!0},"This integration is only available in ",n," tier or higher."),o.createElement(y.$n,{style:{marginTop:24},text:"Explore Plans",round:!0,onClick:()=>a({type:"App/UpgradeIntended",from:"builder"})}));return o.createElement(l.m,{delay:300,interactive:300,content:s},o.createElement("div",null,o.createElement(J.JI,{variant:"plum"},"Upgrade")))}),eb=(0,s.Ay)(y.$n)`
  --icon-color: ${i.KE7} !important;
`,ex=s.Ay.div`
  position: relative;
  overflow: hidden;
`,eE=(0,s.AH)`
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.24s ease-in-out;
`,ev=(0,s.Ay)(y.$n)`
  ${eE}
`,eC=(0,s.Ay)(y.In)``,eS=(0,s.Ay)(eC)`
  ${eE}
`,ek=(0,s.Ay)(j.Z)`
  &:hover,
  &.pseudo-hover,
  &.pseudo-active {
    ${ei} {
      color: ${i.t14};
    }

    ${eC} {
      transition: all 0.24s ease-in-out;
      opacity: ${e=>{let{$isTestButtonDisabled:t}=e;return t?1:0}};
    }

    ${ev}, ${eS} {
      opacity: 1;
      transform: translateX(0);
    }

    ${ed} {
      transform: translateX(0);
    }
    ${ec} {
      opacity: 1;
    }
  }
`,ew=(0,s.Ay)(r.P)`
  color: ${i.ui$};
  font-size: 12px;
  line-height: 16px;
`},21823:(e,t,n)=>{n.d(t,{g:()=>s});var a=n(67331),r=n(14041),i=n(39716),l=n(28926);let o=(0,i.i7)`
      0% { opacity: .48; }
     50% { opacity: 1; }
    100% { opacity: .48; }
`,s=e=>{let{status:t,...n}=e;return t?r.createElement(c,{...n,center:!0},r.createElement(a.H2,{style:{textTransform:"capitalize",fontSize:"22px",lineHeight:"32px"}},t)):null},c=(0,i.Ay)(l.VP)`
  height: 100%;
  animation: ${o} ease-out 2.4s infinite;
  position: relative;
  top: -32px;
`},65069:(e,t,n)=>{n.d(t,{Ff:()=>I,VX:()=>A,uA:()=>P});var a=n(69670),r=n(67331),i=n(14041),l=n(39716),o=n(62284),s=n(36884),c=n(62987),d=n(99538),u=n(117),p=n(37089),m=n(45742),g=n(85170),y=n(28926),f=n(42014),h=n(66712),b=n(93754),x=n(64942),E=n(1727),v=n(56),C=n(62825),S=n(81250),k=n(58651);let w={ifTrue:"If true",ifFalse:"Otherwise",both:"Both",stay:"Don't move"},A=(e,t)=>({currentBranch:"ifTrue",expanded:!0,index:e,actionNumber:e,comment:t,commentFlags:{keep:!1},conditionExpr:{type:"OperatorExpression",arity:1,args:[m.mK],op:"notEmpty"},output:"compute",mode:o.A.PARTITION,partitionExpr:null,type:"IfStatement",varName:`__${e}`,ifFalse:{type:"BlockStatement",children:[],comment:null,commentFlags:{keep:!1},index:-2,output:"compute"},ifTrue:{type:"BlockStatement",children:[],comment:null,commentFlags:{keep:!1},index:-3,output:"compute"}}),I=(e,t)=>{switch(t.type){case"Update":{let n=t.conditionExpr.args.slice(0,t.conditionExpr.arity);return[e,[R(e,{...t.conditionExpr,args:n})]]}case"UpdateSuccess":return[{...e,statement:t.statement,pb:t.pb},[]];case"UpdateOperation":{if("OperatorExpression"!==e.statement.conditionExpr.type)return[e,[]];let n=e.statement.conditionExpr.args.slice(0,t.index+1),a={...e.statement.conditionExpr,op:t.op.id,args:n};return[e,[R(e,a)]]}case"RequestSuggestions":return[{...e,suggestions:s.j.Loading},[(0,p.hn)({pb:e.pb,index:e.statement.index,reqParams:{userInput:t.userInput,argumentName:null,typeSignature:t.typeSignature,forceRefreshCache:t.forceRefreshCache,isPlaybookArgument:!1,pbArgumentsOnly:t.pbArgumentsOnly},onDone:e=>{let{suggestions:t}=e;return{type:"RequestSuggestionsSuccess",suggestions:t}}})]];case"RequestSuggestionsSuccess":return[{...e,suggestions:s.j.Success(t.suggestions)},[]];case"ResetSuggestions":return[{...e,suggestions:s.j.NotAsked},[]];case"RequestOperators":return[{...e,operators:s.j.Loading},[(0,p.uB)([t.typeSignature],e=>({type:"RequestOperatorsSuccess",operators:e}))]];case"RequestOperatorsSuccess":return[{...e,operators:s.j.Success(t.operators)},[]];case"ChangedTargetBranch":if("create"!==e.mode)return[e,[]];return[{...e,belowStatementsGoTo:t.targetBranch},[]];case"PlaybookArgsAction":{if("OperatorExpression"!==e.statement.conditionExpr.type)return[e,[]];let[{pb:n,...a},r]=b.Ff({...e.playbookArgsState,pb:e.pb},t.action);return[e={...e,pb:n,playbookArgsState:a},[...r.map((0,u.zy)(e=>({type:t.type,action:e}))),R(e)]]}}},P=e=>{let{dispatch:t,state:n,onSave:r,onClose:l,hasActionsBelow:o}=e,d=(0,i.useRef)(null),p=(0,i.useRef)(null),m=(0,u.i8)(t,"PlaybookArgsAction"),w=i.useMemo(()=>({allowAskMeEveryTime:!0,playbookArgs:n.pb.args,statementIndex:n.statement.index,onRevalidatePlaybook:()=>{},...b.m(m)}),[n.statement.index,m,n.pb.args]),A=n.statement.conditionExpr,I=i.useCallback((e,n)=>{if("OperatorExpression"!==A.type)return;let a=e=>t({type:"Update",conditionExpr:{...A,args:e}});if(null===e&&0===n)return a([]);let r=[];for(let t=0;t<=A.arity;t++){let a=A.args[t];t===n?r.push(null===e?O:e):a?r.push(a):t<n&&r.push(O)}a(r)},[A,t]);i.useEffect(()=>{"create"===n.mode&&p.current?.querySelector("button")?.click()},[n.mode]);let P=(0,f.Qz)(),R=i.useMemo(()=>({...E.C,options:{...E.C.options,excludeGetFromPreviousActions:!1},fetchPreviousActions(){P(n.statement.index,this.typeHint)},resetSuggestions:()=>t({type:"ResetSuggestions"}),suggestions:s.j.Success([])}),[t,P,n.statement.index]);if(!n.statement||"OperatorExpression"!==A.type)return i.createElement(y.BQ,{variant:"critical",onClick:l,inline:!0},"Condition expression must be an operator expression (Click to close)");if(-1===A.arity)return i.createElement(y.BQ,{variant:"critical",onClick:l,inline:!0},"Logical expressions cannot be edited manually (Click to close)");let _=(0,g.nE)(n.statement).length>0,N=(0,g.nE)(n.statement,!0).length>0;return i.createElement(h.S,{value:w},i.createElement(v.Z,{tabIndex:0,status:N?"error":void 0,ref:d,expanded:!0,disabled:!1,Header:i.createElement(v.Z.Header,{style:{justifyContent:"space-between"}},i.createElement(y.fI,{style:{alignItems:"center"},gap:20},i.createElement(y.In,{icon:"ConditionalBold",size:18,color:a.wmS}),i.createElement($,null,"If conditional statement")),i.createElement(v.Z.HeaderActionButton,{icon:"CrossOutline",tooltipText:"Close",onClick:l})),"data-testid":"edit-conditional-card"},i.createElement(T,{gap:40,ref:p},i.createElement(y.VP,{gap:24,"data-testid":"first-operand"},i.createElement(y.VP,{style:{flex:1},gap:12},i.createElement(k.A1,null,"Value")),i.createElement(C.r,{expr:A.args[0]??null,argContext:R,onChange:e=>I(e,0)}),A.args[0]?.validationStatus?.map((e,t)=>i.createElement(S.t,{status:e,key:t}))),i.createElement(F,{conditionExpr:A,dispatch:t,operators:n.operators,index:0}),Array(A.arity-1).fill(0).map((e,a,r)=>{let l=A.args[a+1]??null,o=a===r.length-1;return i.createElement(i.Fragment,{key:a},i.createElement(x.e,{inFirstStatement:!1,"data-testid":"second-operand",onChange:e=>{I(e.value,a+1)},resetSuggestions:()=>t({type:"ResetSuggestions"}),requestSuggestions:e=>{t({type:"RequestSuggestions",...e})},argument:{name:"CompareAgainst",required:!0,value:l,typeHint:"OperatorExpression"===A.type?A.operatorTypeHint||A.typeHint:E.C.typeHint,displayHint:{struct:c.u.Scalar,label:"Compare against",description:"",required:!0,dependsOn:[],expressions:[],miniUIConfig:null}},suggestions:n.suggestions}),o?null:i.createElement(F,{key:A.op+a,conditionExpr:A,dispatch:t,operators:n.operators,index:a+1}))}),"create"===n.mode&&o?i.createElement(M,{dispatch:t,goto:n.belowStatementsGoTo}):null,A.validationStatus?.filter(e=>"missing"!==e.type||"BCL:WrongOperatorArity"!==e.error.name).map((e,t)=>i.createElement(S.t,{status:e,key:t})),i.createElement(y.$n,{round:!0,size:"xl",text:"Save",disabled:_,onClick:r}))),i.createElement(b.uA,{state:n.playbookArgsState,dispatch:m}))},$=(0,l.Ay)(r.P)`
  ${k.Tf}
  color: ${a.vh3};
  flex-grow: 1;
  align-self: center;
  font-weight: 500;
  line-height: 28px;
`,T=(0,l.Ay)(y.VP)`
  padding: 16px;
  background-color: ${a.o$k};
  padding: 36px;
  padding-inline: 44px;
  padding-bottom: 48px;
`,F=e=>{let{dispatch:t,conditionExpr:n,operators:a,index:r}=e,[l,o]=i.useState(!1);return i.createElement(y.VP,{gap:24,"data-testid":"operator"},i.createElement(y.VP,{style:{flex:1},gap:12},i.createElement(k.A1,null,"Operator")),i.createElement(y.ms,{strategy:"fixed-scrollable",behavior:"over",style:{zIndex:1},isOpen:l,height:400,onIsOpenChanged:e=>{o(e),e?t({type:"RequestOperators",typeSignature:n.args[r]?.typeHint?.signature||[]}):t({type:"ResetSuggestions"})},renderContent:e=>{let{close:n}=e;return i.createElement(i.Fragment,null,s.j.isSuccess(a)?a.value.map(e=>i.createElement(y.IU,{key:e.id,onClick:()=>{e.displayHint.label,t({type:"UpdateOperation",op:e,index:r}),n()},text:e?.displayHint.label||""})):i.createElement(y.IU,{onClick:()=>{},text:"Loading..."}))}},i.createElement("div",{style:{width:"100%"}},i.createElement(y.N,{title:n.displayHint?.label||n.op,rightAddon:i.createElement(y.In,{icon:"ArrowDownOutline"})}))))};function R(e,t){return async n=>{let{api:a,dispatch:r}=n,i=(0,g.yO)((0,d.Co)(e.pb,{transformIfStatement:n=>n.index===e.statement.index&&t?{...n,conditionExpr:t}:n})),l={...e.statement},o=await a.playbookEditor2_UpdatePlaybookCommandArgumentValue((0,g.qO)(i),{}),s=(0,g.Vl)(o);(0,d.bZ)(s,{visitIfStatement:t=>t.index!==e.statement.index||(l=t,!1)}),r({type:"UpdateSuccess",statement:l,pb:s})}}let M=e=>{let{dispatch:t,goto:n}=e,a=e=>{t({type:"ChangedTargetBranch",targetBranch:e})};return i.createElement(y.VP,{gap:24,"data-testid":"target-branch-selector"},i.createElement(y.VP,{style:{flex:1},gap:12},i.createElement(k.A1,null,"Move below actions to")),i.createElement(y.ms,{strategy:"fixed-scrollable",style:{zIndex:1},behavior:"over",autoCloseOnContentClick:!0,renderContent:()=>i.createElement(i.Fragment,null,i.createElement(y.IU,{text:"If True",onClick:()=>a("ifTrue")}),i.createElement(y.IU,{text:"Otherwise",onClick:()=>a("ifFalse")}),i.createElement(y.IU,{text:"Both",onClick:()=>a("both")}),i.createElement(y.IU,{text:"Don't move",onClick:()=>a("stay")}))},i.createElement(y.N,{title:w[n],rightAddon:i.createElement(y.In,{icon:"ArrowDownOutline"})})))},O={type:"MissingExpression"}},54734:(e,t,n)=>{n.d(t,{W:()=>c});var a=n(69670),r=n(88098),i=n(14041),l=n(39716),o=n(28926),s=n(58651);let c=i.memo(function(e){let{disabled:t,children:n,...a}=e,l=(0,r.fF)();return i.createElement(p,{$disabled:t,"data-testid":"connector",center:!0,...a},i.createElement(d,null),i.createElement(u,{$forceShow:!!l.active},n),i.createElement(d,null))}),d=l.Ay.div`
  background: ${a.MfC};
  height: 16px;
  width: 1px;
  flex-shrink: 0;
`,u=(0,l.Ay)(o.fI)`
  justify-content: center;
  min-width: 300px;

  opacity: ${e=>{let{$forceShow:t}=e;return t?1:0}};
  margin-block: ${e=>{let{$forceShow:t}=e;return t?0:"-28px"}};

  transition: all 0.3s ease-in-out;
  transition-delay: 0.25s;
  ${e=>{let{$forceShow:t}=e;return t&&"transition-delay: 0s; transition: none;"}}
`,p=(0,l.Ay)(o.VP)`
  width: 100%;
  ${e=>{let{$disabled:t}=e;return t&&s.z2}}

  &:hover ${u}, &:first-child ${u}, &:last-child ${u} {
    opacity: 1;
    margin-block: 0;
  }
  &:first-child ${d}:first-child, &:last-child ${d}:last-child {
    display: none;
  }
  &:first-child ${d}:last-child, &:last-child ${d}:first-child {
    height: 32px;
  }
`},25954:(e,t,n)=>{n.d(t,{Ff:()=>m,Ur:()=>d,uA:()=>p});var a=n(14041),r=n(92727),i=n(44814),l=n(117),o=n(48143),s=n(86244),c=n(47831);function d(e){return{type:"Categorizer",uuid:e.uuid,ref:e.ref,completed:!1,targets:e.targets,taskBuilderState:s.createInitialState(e.targets,e.task||void 0,e.template,{isBuilderV2:!0}),usingPreviewData:e.usingPreviewData}}let u="bardeen_classification_task",p=e=>{let{state:t,dispatch:n,onFetchTrainingData:r,onComplete:i,onCancel:d}=e;(0,c.q)(t.uuid,u,n);let p=(0,o.Mj)(),m=(0,o.jL)(),g=a.useCallback((e,t)=>{m({type:"ModalsAction",action:{type:"Modal/AppsConnectionShown",from:"customflow",pbId:e,apps:t,switchTo:null}})},[m]),y=(0,l.i8)(n,"TaskBuilderAction");return(0,a.useEffect)(()=>{t.completed&&t.ref&&(i(t.ref),n({type:"ClearCompleted"}))},[t.completed,t.ref,i,n]),t.taskBuilderState?a.createElement(s.Component,{state:t.taskBuilderState,dispatch:y,onFetchTrainingData:r,onFinish:()=>n({type:"Finish"}),onCancel:d,pluginsSummary:p,onConnectApps:g}):null},m=(e,t)=>{switch(e.type){case"Start":return[t,[async e=>{let{dispatch:t}=e;t({type:"TaskBuilderAction",action:{type:"FetchAvailableIntegrations"}})}]];case"AddFewShotData":{let{data:n}=e;return[t,[async e=>{let{dispatch:t}=e;t({type:"TaskBuilderAction",action:{type:"AddFewShotData",data:n}})}]]}case"TaskBuilderAction":{let[n,a]=s.reducer(e.action,t.taskBuilderState),{type:r}=e,i=a.map(e=>{let n=(0,c.c)(t.uuid,u);return async t=>{let{api:a,dispatch:i}=t;await e({api:a,dispatch:e=>i({type:r,action:e}),controller:n(a)})}});return[{...t,taskBuilderState:n},i]}case"Finish":{let e=t.taskBuilderState;if(!e)return[t,[]];let n=e.fewshots.map(e=>{let{reflection:t,summarizationText:n,oldPredicted:a,...r}=e;return{...r,annotations:r.annotations.map(e=>{let{explanation:t,...n}=e;return n})}}),a=r.Z.createWithID(e.classificationTaskId,{name:e.name,context:e.description,classes:e.classes,target:e.target?.name,fewshots:n.map(e=>({...e,example:e.example.text}))}),l=async e=>{let{api:n,dispatch:r}=e;try{let e=t.ref?await n.objectStorageUpdateResource(u,(0,i.RY)(t.ref.uri).id,a):await n.objectStorageCreateResource(u,a);r({type:"FinishSuccess",ref:e})}catch(e){r({type:"FinishFailed"})}};return[{...t,taskBuilderState:{...t.taskBuilderState,saving:!0}},[l]]}case"FinishSuccess":return[t={...t,ref:e.ref,completed:!0,taskBuilderState:{...t.taskBuilderState,saving:!1}},[]];case"FinishFailed":return[{...t,taskBuilderState:{...t.taskBuilderState,saving:!1}},[]];case"ClearCompleted":return[{...t,completed:!1},[]]}}},45540:(e,t,n)=>{n.d(t,{Ff:()=>p,Ur:()=>d,uA:()=>u});var a=n(14041),r=n(16918),i=n(44814),l=n(117),o=n(21139),s=n(47831);let c="bardeen_research_bot_template";function d(e,t){return{type:"ResearchAssistant",ref:t.ref,completed:!1,uuid:e,taskBuilderState:o.createInitialState(t.task||void 0)}}let u=e=>{let{state:t,onComplete:n,onCancel:r,dispatch:i}=e,s=(0,l.i8)(i,"TaskBuilderAction");return(0,a.useEffect)(()=>{t.completed&&t.ref&&(n(t.ref),i({type:"ClearCompleted"}))},[t.completed,t.ref,n,i]),t.taskBuilderState?a.createElement(o.Component,{state:t.taskBuilderState,dispatch:s,onFinish:()=>i({type:"Finish"}),onCancel:r}):null},p=(e,t)=>{switch(e.type){case"TaskBuilderAction":{let n=o.reducer(e.action,t.taskBuilderState);return[{...t,taskBuilderState:n},[]]}case"Finish":return[{...t,taskBuilderState:{...t.taskBuilderState,saving:!0}},[async e=>{let{api:n,dispatch:a}=e,{taskBuilderState:l,uuid:o}=t,{name:d,purpose:u,llmRole:p,sections:m,preSetQuestions:g}=l,y=(0,s.c)(o,c)(n),f=await y.createContext(g.map(e=>{let{question:t,answer:n}=e;return{question:t,answer:n}}),l.type,u),h=r.G.createWithID(d,{purpose:u,sections:m,name:d,context:f,llmRole:p});a({type:"FinishSuccess",ref:t.ref?await n.objectStorageUpdateResource(c,(0,i.RY)(t.ref.uri).id,h):await n.objectStorageCreateResource(c,h)})}]];case"FinishSuccess":return[{...t,ref:e.ref,completed:!0,taskBuilderState:{...t.taskBuilderState,saving:!1}},[]];case"ClearCompleted":return[{...t,completed:!1},[]]}}},8937:(e,t,n)=>{n.d(t,{$H:()=>c,Ff:()=>p,Ur:()=>d,uA:()=>u});var a=n(14041),r=n(79685),i=n(44814),l=n(117),o=n(29103),s=n(47831);let c="bardeen_email_bot_prompt";function d(e,t){return{type:"WritingAssistant",ref:t.ref,completed:!1,uuid:e,taskBuilderState:o.createInitialState(t.targets,t.task||void 0)}}let u=e=>{let{state:t,onComplete:n,onCancel:r,dispatch:i}=e;(0,s.q)(t.uuid,c,i);let d=(0,l.i8)(i,"TaskBuilderAction");return(0,a.useEffect)(()=>{t.completed&&t.ref&&(n(t.ref),i({type:"ClearCompleted"}))},[t.completed,t.ref,n,i]),t.taskBuilderState?a.createElement(o.Component,{state:t.taskBuilderState,dispatch:d,onFinish:()=>i({type:"Finish"}),onCancel:r}):null},p=(e,t)=>{switch(e.type){case"AddFewShotData":{let[n]=o.reducer({type:"AddFewShotData",computedContextualQuestions:e.computedContextualQuestions,computedProfileQuestions:e.computedProfileQuestions},t.taskBuilderState);return[{...t,taskBuilderState:n},[]]}case"PlaybookError":return[t,[]];case"TaskBuilderAction":{let[n,a]=o.reducer(e.action,t.taskBuilderState);return[{...t,taskBuilderState:n},a.map(e=>async n=>{let{api:a,dispatch:r}=n;await e({api:a,dispatch:e=>r({type:"TaskBuilderAction",action:e}),controller:(0,s.c)(t.uuid,c)(a)})})]}case"Finish":{let e=t.taskBuilderState,n=r.D.createWithID(e.name,{name:e.name,userName:e.userName,context:e.context,email:e.userEmail,emailType:e.selectedTarget?.value||"",template:e.sections,llmRole:e.llmRole,profile:e.profile,questions:e.selectedTarget?.questions||[]});return[{...t,taskBuilderState:{...t.taskBuilderState,saving:!0}},[async e=>{let{api:a,dispatch:r}=e;r({type:"FinishSuccess",ref:t.ref?await a.objectStorageUpdateResource(c,(0,i.RY)(t.ref.uri).id,n):await a.objectStorageCreateResource(c,n)})}]]}case"FinishSuccess":return[{...t,ref:e.ref,completed:!0,taskBuilderState:{...t.taskBuilderState,saving:!1}},[]];case"ClearCompleted":return[{...t,completed:!1},[]]}}},47831:(e,t,n)=>{n.d(t,{c:()=>l,q:()=>i});var a=n(14041),r=n(11778);function i(e,t,n){let i=(0,r.c)();(0,a.useEffect)(()=>{let a=async(a,r,i)=>{e===a&&t===r&&n(i)};if(i)return i.on("custom_input_flow_dispatch",a),()=>{i.off("custom_input_flow_dispatch",a)}},[i,n,t,e])}function l(e,t){return n=>new Proxy({},{get(a,r){if("string"==typeof r)return r in a?a[r]:function(){for(var a=arguments.length,i=Array(a),l=0;l<a;l++)i[l]=arguments[l];return n.playbookEditor2_InvokeCustomInputFlowMethod(e,t,r,...i)}}})}},54555:(e,t,n)=>{n.d(t,{I:()=>u});var a=n(69670),r=n(14041),i=n(117),l=n(37504),o=n(28926),s=n(66712),c=n(51402),d=n(93754);let u=r.memo(e=>{let{state:t,dispatch:n,playbookArgs:u,isFirstStatement:p}=e,{index:m}=t,g=(0,r.useCallback)(e=>{n({type:"FunctionStatementAction",index:m,action:e})},[m,n]),y=(0,i.i8)(n,"PlaybookArgsAction"),f=r.useMemo(()=>({onRevalidatePlaybook:()=>{n({type:"ForceRevalidatePlaybook"})},playbookArgs:u,statementIndex:m,allowAskMeEveryTime:!0,...(0,d.m)(y)}),[n,m,u,y]);return r.createElement(s.S,{value:f},r.createElement(o.VP,{gap:40,style:{padding:"36px 44px 48px",backgroundColor:a.o$k,borderRadius:12}},r.createElement(l.t,{recoverable:!0,userMsg:"Sorry! Something went wrong - please try again."},r.createElement(c.uA,{state:t,dispatch:g,isFirstStatement:p}))))})},43419:(e,t,n)=>{n.d(t,{Y:()=>u});var a=n(78445),r=n(69670),i=n(14041),l=n(39716),o=n(91159),s=n(28926),c=n(20285);let d=(0,l.Ay)(c.pT)`
  width: 644px;
`,u=(0,i.memo)(function(e){let{state:t,dispatch:n,onJumpToReference:r}=e,{references:l,header:s,message:c,cancel:u,confirm:h}=t,b=e=>{n(u.action),r(e)};return i.createElement(d,{id:"delete-confirm",header:s||"Delete card",onClose:()=>n(u.action),confirmBtn:m("Delete",h,n),cancelBtn:m("Cancel",u,n)},i.createElement(g,null,c&&i.createElement(y,null,c),i.createElement(f,null,l.map((e,t)=>{let n=e.argumentNames.map(o.xJ);return i.createElement(a.m,{key:`${e.statementIndex}-${e.argumentNames.join("-")||"no-arg"}-${t}`,content:n.length>0?1===n.length?`Used in argument "${n[0]}" of ${e.displayName}`:`Used in arguments "${n.slice(0,-1).join('", "')}" and "${n[n.length-1]}" of ${e.displayName}`:`Used in ${e.displayName}`,placement:"top"},i.createElement(p,{icon:e.icon,title:`${e.actionNumber}. ${e.displayName}`,onClick:()=>b(e.statementIndex)}))}))))}),p=(0,l.Ay)(s.N)`
  outline: 0;
  border: 0;
`;function m(e,t,n){let{text:a=e,action:r}=t;return i.createElement(s.$n,{size:"xl",round:!0,variant:"Delete"===e?"primary":"outlined","data-testid":"Delete"===e?"delete":"cancel",onClick:()=>n(r),text:a})}let g=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`,y=l.Ay.p`
  margin: 0;
  color: ${r.Xi8};
  line-height: 1.5;
`,f=l.Ay.div`
  margin: 0;
  padding: 8px;
  max-height: 300px;
  overflow-y: scroll;
  border-radius: 12px;
  border: 1px solid #f1f3f4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
`},77956:(e,t,n)=>{n.d(t,{H:()=>m,T:()=>d});var a=n(78445),r=n(14041),i=n(39716),l=n(85170),o=n(61888),s=n(28926),c=n(62321);let d=e=>{let{ref:t,bare:n=!1,showArrow:i=!1,...l}=e,{expr:o,variant:d="default",suffix:u,onClear:m,isPbArgument:y,rightAddon:f,...h}=l,b=p(o);"(Nothing)"===b&&(b="");let x=String(b).trim().length>0,E=i||!x&&"StringTemplatingExpression"!==o.type&&"ArrayLiteralExpression"!==o.type,v=r.createElement(r.Fragment,null,b,u?r.createElement(r.Fragment,null," - ",u):null),C=!f&&!E,S=n?s.N:g;return r.createElement(s.fI,{style:{position:"relative",flex:1}},r.createElement(S,{ref:t,"data-testid":"expression-select-button",$isEmpty:!x,variant:d,bare:n,style:{paddingRight:C?32:void 0},title:r.createElement(a.m,{content:v,placement:"top",delay:1e3},r.createElement(c.e,{fields:[r.createElement(r.Fragment,null,y?`Ask me for "${b}"`:b),u]})),icon:"StringTemplatingExpression"===o.type?"TexturedText":"displayHint"in o&&o.displayHint?.icon||o.typeHint?.typeIcon||"ObjectOutline",rightAddon:!f&&E?r.createElement(s.In,{icon:"ArrowDownOutline"}):null,...h}),f&&r.createElement("div",{style:{position:"absolute",right:13}},f),C&&m?r.createElement(s.Jn,{size:"m",tooltipText:"Reset input","aria-label":"Reset input",style:{position:"absolute",right:15},onClick:e=>{e.stopPropagation(),m()}}):null)};function u(e,t,n){if(e.every(e=>"string"==typeof e))return e.join(t);let a=[],i=!0;for(let n of e)i?i=!1:t&&a.push(t),a.push(n);return r.createElement(r.Fragment,{key:n},a)}function p(e,t){switch(e.type){case"ConstantValueExpression":case"FieldAccessExpression":case"VarRefExpression":case"TableColumnReferenceExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"OperatorExpression":case"MissingExpression":return e.displayHint?.label??"";case"ObjectLiteralExpression":return u(e.fields.map(e=>e.title),", ",t);case"ArrayLiteralExpression":return u(e.elements.map((e,t)=>p(e,t)),", ",t);case"CastExpression":case"FieldRemappingExpression":return p(e.expression);case"StringTemplatingExpression":return u(e.children.map((e,t)=>p(e,t))," ",t);case"BCLFragmentExpression":return e.code;case"StringTemplatingTextNode":return e.text;case"StringTemplatingVariableNode":{let n="displayHint"in e.value&&e.value.displayHint?.icon||e.value.typeHint?.typeIcon;return r.createElement(o.o,{key:t,variant:"plum",addonBefore:n?r.createElement(s.In,{icon:n}):null,joinMode:e.join,label:(0,l.NI)(e.value)})}case"StringTemplatingGenerateNode":return r.createElement(o.o,{key:t,variant:"beach",addonBefore:r.createElement(s.In,{icon:"Sparkles"}),joinMode:null,label:(0,l.NI)(e.prompt)});case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return u(e.children.map((e,t)=>p(e,t)),"",t);case"StringTemplatingEmbedNode":return""}}let m=e=>{let t=p(e);return"(Nothing)"===t&&(t=""),String(t).trim()},g=(0,i.Ay)(s.N)`
  width: 100%;
  position: relative;
  max-height: 56px;
  overflow: hidden;
  ${e=>{let{$isEmpty:t}=e;return!t&&"box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);"}};
`},73457:(e,t,n)=>{n.d(t,{Cl:()=>v,Lo:()=>C,iY:()=>E});var a=n(78445),r=n(67331),i=n(69670),l=n(45250),o=n(14041),s=n(39716),c=n(88236),d=n(44242),u=n(62987),p=n(45742),m=n(28926),g=n(56);let y=e=>{switch(e.value){case"string":return c.g.getAllowedConfigOptions();case"date":return d.bE.getAllowedConfigOptions();case"url":case"email":case"phone":case"number":case"object":case"boolean":return[]}},f=e=>(0,l.find)(p.Af,t=>(0,l.isEqual)(t.facets,e.typeHint.signature[0]?.facets??[])),h=e=>e.typeHint.signature[0]?.config?Object(e.typeHint.signature[0]?.config):null,b=(e,t)=>{let n=f(e);return{...e,typeHint:{...e.typeHint,...n?{signature:[{...n,config:t}]}:{}}}},x=(e,t)=>{let n=y(t),a=[{facets:t.facets}];return{...e,typeHint:{...e.typeHint,signature:a,configOptions:n}}},E=e=>{let{argument:t,onChange:n,typeIcon:r,...i}=e,[l,s]=o.useState(p.Dz),c=!(0,p.df)(t.typeHint),d=!t.requiredByOtherCommand;return o.createElement(m.VP,{...i,"data-testid":"input-metadata"},o.createElement(m.YE,{caretPosition:"left",title:o.createElement(m.fI,{style:{width:"100%"}},o.createElement("div",{"data-testid":"add-custom-metadata",style:{marginRight:"auto"}},"Custom title and description"),o.createElement(a.m,{content:"When executing the automation, Bardeen will prompt to choose a value for this. You can change the title and description to provide better context for that prompt."},o.createElement(k,{role:"button"},"What does it mean?")))},o.createElement(g.n,null,o.createElement(v,{style:{marginTop:"20px"},argument:t,onChange:n}),o.createElement(m.fI,{"data-testid":"open-advanced-options",gap:8,style:{marginTop:"20px",cursor:"pointer"},onClick:()=>s({...l,advancedExpanded:!l.advancedExpanded})},o.createElement(w,{$small:!0},"Advanced Options"),o.createElement(m.In,{icon:l.advancedExpanded?"ArrowUpOutline":"ArrowDownOutline"})),o.createElement(m.SD,{open:l.advancedExpanded},o.createElement("div",{style:{paddingInline:2}},o.createElement(C,{style:{marginBottom:"20px"},argument:t,onChange:n,canChangeRequired:d,canChangeStruct:c}))))))},v=o.memo(e=>{let{argument:t,onChange:n,...a}=e;return o.createElement(m.VP,{gap:20,...a},o.createElement("label",null,o.createElement(m.VP,{gap:12},o.createElement(w,{$small:!0},"Title"),o.createElement(m.dN.Outline,{"data-testid":"custom-title-input",size:"xl",onChange:e=>n({...t,label:e}),value:t.label}))),o.createElement("label",null,o.createElement(m.VP,{gap:12},o.createElement(w,{$small:!0},"Description"),o.createElement(m.TM.Outline,{size:"xl",onChange:e=>n({...t,comment:e,commentFlags:{...t.commentFlags,keep:!!e}}),value:t.comment||""}))))}),C=o.memo(e=>{let{argument:t,onChange:n,canChangeRequired:a,canChangeStruct:r,...i}=e,l=f(t),s=t.typeHint.configOptions,c=r&&!t.restricted?"Allow multiple values":r?"This argument is reused across multiple cards with 'Ask me every time for multiple values' enabled. To change this, disable 'Ask me every time for multiple values' in other cards first.":"The argument is a Field Mapping and can not be changed.";return o.createElement(o.Fragment,null,o.createElement(m.VP,{gap:20,...i},o.createElement(m.Sc,{style:{marginTop:"20px"},title:a?"Required":"The argument is required by the action and can not be changed.",disabled:!a,checked:!a||t.required,onChange:e=>{a&&n({...t,required:e})},label:"Required"}),o.createElement(m.Sc,{checked:t.usedAsMultipleValueArgument||t.struct===u.u.Array,disabled:!r||t.restricted,title:c,onChange:e=>{r&&!t.restricted&&n({...t,struct:e?u.u.Array:u.u.Scalar})},label:"Allow multiple values"}),o.createElement(m.ms,{autoCloseOnContentClick:!0,renderContent:()=>p.Af.map(e=>o.createElement(m.IU,{key:e.value,icon:e.icon,onClick:()=>n(x(t,e)),text:e.label})),behavior:"flip-over"},o.createElement(m.N,{type:"button",onChange:()=>{},title:l?.label||"Use custom data type",icon:l?.icon})),s?.map(e=>o.createElement("label",{key:e.key},o.createElement(m.VP,{gap:12},o.createElement(w,{$small:!0},e.label),o.createElement(S,{argument:t,option:e,onChange:n}))))))}),S=e=>{let{argument:t,option:n,onChange:a}=e,r=h(t),i=e=>a(b(t,{...r,[n.key]:e})),l=r?.[n.key]||null;return"boolean"===n.type?o.createElement(m.Z,{onChange:i,options:[{value:!0,label:"True"},{value:!1,label:"False"}],selected:l}):n.choices?o.createElement(A,{onChange:i,options:n.choices.map(e=>({value:e.value,label:e.label})),selected:l}):"number"===n.type?o.createElement(m.dN.Outline,{size:"xl",onChange:e=>i(Number(e)),value:l?String(l):""}):o.createElement(m.dN.Outline,{size:"xl",onChange:i,value:l?String(l):""})},k=(0,s.Ay)(r.P)`
  font-size: 12px;
  text-decoration-line: underline;
  color: ${i.ui$};
  cursor: pointer;
`,w=(0,s.Ay)(r.P)`
  font-weight: 600;
  color: #484a4f;
`,A=(0,s.Ay)(m.Z)`
  input[type="radio"] {
    display: flex;
  }
`},12171:(e,t,n)=>{n.d(t,{_N:()=>H,gb:()=>V.g,e2:()=>g.e2,z2:()=>g.z2}),n(64942),n(26572);var a=n(77620),r=n(14041),i=n(85170),l=n(78445),o=n(39716),s=n(53747),c=n(28926),d=n(69670),u=n(67331),p=n(94303),m=n(10777),g=n(58651);let y=(0,o.Ay)(function(e){let{disabled:t,children:n,statement:l,cardList:o,dispatch:s,renderConnector:d,...u}=e,{expanded:g,index:y}=l,b=i.nE(l)[0]?.status,x=b?(0,i.p0)(b):null,E=e=>{s({type:"ClickedJumpToError",error:{statementIndex:y,argumentName:null,status:e,...p.NM(l)}})};return r.createElement("div",{"data-statement-index":y,...u,style:{width:"100%",maxWidth:"848px"}},r.createElement(m.sx,{id:String(y)},r.createElement(h,{gap:12,"aria-expanded":g},r.createElement("div",{style:{position:"absolute",inset:0,zIndex:1},onClick:()=>s({type:"CardHeaderClicked",index:y})}),n,b&&x&&r.createElement(a.OO,{icon:"TriangularExclamationBold",variant:"ghost",tooltipText:x,onClick:()=>E(b)}))),r.createElement(c.SD,{open:g},r.createElement(f,{gap:8},d(y,!0),o)))})`
  background: ${d.o$k};
  box-sizing: border-box;
  border-radius: 12px;

  flex: 0 0 auto;
  overflow: hidden;

  ${g.Tf}

  border: 1px solid ${d.l0o};
  border-color: ${e=>{let{disabled:t,statement:n}=e;return(0,i.nE)(n,!0).length>0?`${(0,d.B3q)(d.MEI,t?.16:1)} !important`:(0,d.B3q)(d.l0o,t?.16:1)}};

  &:hover {
    border-color: ${d.LRT};
  }
`,f=(0,o.Ay)(c.VP)`
  padding: 32px 0 48px 0;
  transition: all 0.2s ease-in-out;
  padding-inline: 16px;
  border-top: 1px solid ${d.Tc2};
  align-items: center;
  width: 100%;
  &:after {
    content: "";
    display: block;
    width: 848px;
  }
`,h=(0,o.Ay)(c.fI)`
  position: relative;
  background-color: ${d.ONy};
  height: 64px;
  width: 100%;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s ease-in-out;
  &:focus {
    background-color: ${d.KxS};
  }
  button {
    z-index: 1;
  }
  ${u.P} {
    color: ${d.vh3};
  }
`,b=r.memo(e=>{let{tab:t}=e,{ref:n,showTooltip:a}=(0,s.Q)();return a?r.createElement(l.m,{content:t},r.createElement(v,{ref:n},t)):r.createElement(v,{ref:n},t)}),x=r.memo(function(e){let{statement:t,disabled:n,dispatch:a,pbEqualsLastDescribedPlaybook:i}=e,{comment:l,index:o}=t,s=i?l??C(t):C(t);return r.createElement(y,{"data-testid":"builder-conditional-card",...e},r.createElement(E,null),r.createElement(c.tU,{tabs:[s,"Otherwise"],active:"ifTrue"===t.currentBranch?s:"Otherwise","data-testid":"builder-conditional-card-if-true-button",style:{height:64,marginBottom:-1,paddingInline:0,width:"auto",zIndex:1},onTabClick:e=>a({type:"BranchClicked",branch:e===s?"ifTrue":"ifFalse",index:o}),renderTab:e=>r.createElement(b,{tab:e})}),r.createElement(c.$n,{disabled:n,icon:"PencilOutline",size:"l",tooltipText:"Edit",round:!0,variant:"flat",onClick:()=>a({type:"Conditional/EditOpen",statement:t}),style:{marginLeft:"auto"}}),r.createElement(c.$n,{disabled:n,icon:"TrashBinOutline",size:"l",tooltipText:"Delete",round:!0,variant:"flat",onClick:()=>a({type:"DeleteConditionalClicked",index:o})}))}),E=(0,o.Ay)(e=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",...e},r.createElement("path",{d:"M4.61857 3V13H2.75V3H4.61857Z",fill:"currentColor"}),r.createElement("path",{d:"M6.64201 13V3H13.25V4.51856H8.51058V7.2334H12.7967V8.75195H8.51058V13H6.64201Z",fill:"currentColor"})))`
  margin: 12px;
`,v=o.Ay.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 290px;
  min-width: 0;
`,C=e=>{let{conditionExpr:t}=e;if("OperatorExpression"===t.type&&t.args[0]){let e=t.args[0],n=t.args.slice(1),a=`${(0,i.NI)(e)} "${t.displayHint?.label||t.op}" `;for(let e of n)a+=`${(0,i.NI)(e)} `;return a}return"If true"};var S=n(45742),k=n(48143),w=n(42257),A=n(36836),I=n(56);let P=e=>{let{items:t,children:n,activeIndex:i,isRunning:l,dispatch:o,sequencingStatus:s,isArgumentFilling:d}=e,u=t.find(e=>e.comment)??t[0],p=t.map(e=>e.index),m=u?.comment??"",y=!!t.find(e=>e.index===i),f=t.some(e=>e.isGroupCardOpen),{groupIndex:h}=u,b=f||y,x=S.py.isRunning(s)&&(s.startedStatements||[]).find(e=>p.includes(e)),E=l&&(d?!y:!x);return r.createElement(c.VP,{style:{width:"100%",alignItems:"center"},"data-testid":"builder-group-card"},r.createElement(F,{disabled:E,$expanded:b,Header:r.createElement("div",{"data-testid":"builder-group-card-header",style:{position:"relative"}},r.createElement(I.Z.Header,{onClick:()=>o({type:"ClickedOnGroupCard",groupIndex:h})},u.displayHint&&r.createElement(c.z9,{icon:u.displayHint.plugin.icon,variant:"flat",size:"xs",iconSize:"m",tooltipText:"",style:{flexShrink:0,marginTop:"4px"}}),r.createElement(a.qm,null,r.createElement(A.w,{style:{maxWidth:"100%",display:"inline"},value:m,onBlur:e=>{""===e.currentTarget.innerText.trim()&&(e.currentTarget.innerText=m)},onSave:e=>{""!==e&&o({type:"StatementNameChanged",index:u.index,name:e})}})),r.createElement(T,{$small:!0},t.length," Actions")),r.createElement(N,{disabled:l,dispatch:o,items:t,commentItem:u})),Prefix:r.createElement(I.Z.Prefix,{style:{cursor:"pointer",right:0},onClick:()=>o({type:"ClickedOnGroupCard",groupIndex:h})},b?r.createElement(O,{$lr:"left"}):r.createElement(g.PB,null,r.createElement(_,{icon:"OverflowVerticalOutline"}))),Suffix:r.createElement(I.Z.Suffix,null,b&&r.createElement(O,{$lr:"right"})),expanded:!1}),r.createElement(w.SD,{open:b,style:{maxWidth:872},"data-testid":"builder-group-card-content"},r.createElement(M,{$expanded:b},r.createElement(R,{$disabled:l},"contains ",t.length," actions:"),n)))},$=(0,o.Ay)(I.Z.HeaderActionButton)`
  opacity: 0;
  transform: translateX(16px);
`,T=(0,o.Ay)(u.P)`
  color: ${d.wmS};
  line-height: 16px;
  align-self: center;
  flex-shrink: 0;
  opacity: 1;
`,F=(0,o.Ay)(I.Z)`
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
    border: 1px solid ${d.Tc2};
    background: ${d.ONy};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  }

  &:not(:hover) {
    ${I.Z.CardContent} {
      ${e=>{let{$expanded:t,disabled:n}=e;return!n&&t&&"opacity : 0.5;"}}
    }
  }

  &:hover,
  &:focus,
  &:focus-within,
  &.pseudo-hover {
    ${$} {
      opacity: 1;
      transform: translateX(0);
    }
    ${T} {
      opacity: 0;
    }
  }
`,R=o.Ay.p`
  padding-bottom: 18px;
  padding-top: 18px;
  color: ${d.ydb};
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  flex-shrink: 0;
  ${e=>{let{$disabled:t}=e;return t&&g.z2}}
`,M=(0,o.Ay)(I.n)`
  ${e=>{let{$expanded:t}=e;return t&&`border: 1px solid ${d.MfC};`}}
  border-top: none;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
`,O=o.Ay.div`
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  ${e=>{let{$lr:t}=e;return"left"===t?"right: 0;":"left: 0;"}}
  border-radius: 0px;
  border-top-${e=>{let{$lr:t}=e;return t}}-radius: 12px;
  border-top: 1px solid ${d.MfC};
  border-${e=>{let{$lr:t}=e;return t}}: 1px solid ${d.MfC};
`,_=(0,o.Ay)(c.In)`
  --icon-size: 16px;
`,N=e=>{let{disabled:t,dispatch:n,items:a,commentItem:i}=e,l=(0,k.jL)(),o=()=>n({type:"DeleteStatementClicked",indexes:a.map(e=>e.index)}),s=()=>{l({type:"App/ConfirmShown",config:{type:"RenameStatement",index:i.index,name:i.comment??""}})};return r.createElement(c.ms,{renderContent:()=>r.createElement(r.Fragment,null,r.createElement(c.IU,{disabled:t,onClick:o},"Delete Actions"),r.createElement(c.IU,{disabled:t,onClick:s},"Rename Action"))},r.createElement($,{icon:"OverflowVerticalOutline",tooltipText:"Actions",tooltipPlacement:"top",style:{position:"absolute",right:16,top:16,zIndex:1,background:"white"}}))};var B=n(71842);let D=e=>{let{dispatch:t,disabled:n,pbEqualsLastDescribedPlaybook:a}=e,{index:i,comment:l}=e.statement;return r.createElement(y,{"data-testid":"builder-loop-card",...e},r.createElement(B.v,{style:{color:d.vh3,fontSize:16,margin:12}}),r.createElement(u.P,{$bold:!0,style:{textOverflow:"ellipsis",whiteSpace:"nowrap"}},a?l??"For each":"For each"),r.createElement(c.$n,{icon:"PencilOutline",size:"l",tooltipText:"Edit",round:!0,variant:"flat",style:{marginLeft:"auto"},onClick:()=>t({type:"LoopCard/EditOpen",index:i}),disabled:n}),r.createElement(c.$n,{icon:"TrashBinOutline",size:"l",tooltipText:"Delete",round:!0,variant:"flat",onClick:()=>t({type:"DeleteLoopClicked",index:i}),disabled:n}))},H=r.memo(function(e){let{blocks:t,isRootList:n,hasErrorUpToHere:a,...l}=e,{isAutobook:o,pbEqualsLastDescribedPlaybook:s}=l,c=s?(0,i.vU)(t):t,d=a;return c.map((e,t)=>{let a=t===c.length-1,s={...l,hasErrorUpToHere:d,isLast:a,isFirstStatement:!!n&&0===t&&!o};return Array.isArray(e)?(d||=e.some(e=>(0,i.nE)(e).length>0),r.createElement(L,{...s,key:e[0]?.index,cards:e})):(d||=(0,i.nE)(e).length>0,r.createElement(z,{...s,key:e.index,statement:e}))})}),z=r.memo(function(e){let{statement:t,isLast:n,isFirstStatement:i,...l}=e,{dispatch:o,pbEqualsLastDescribedPlaybook:s,renderArgumentFilling:c,renderConnector:d}=l,u={renderConnector:d,dispatch:o,disabled:e.disabled,pbEqualsLastDescribedPlaybook:s},p=e=>r.createElement(r.Fragment,{key:t.index},e,c(t.index),d(t.index));switch(t.type){case"BlockStatement":return r.createElement(H,{...l,blocks:t.children});case"IfStatement":let m=t[t.currentBranch],g=r.createElement(z,{...e,statement:m});return p(r.createElement(x,{...u,statement:t,cardList:g}));case"ForStatement":let y=r.createElement(z,{...e,statement:t.body});return p(r.createElement(D,{...u,statement:t,cardList:y}));case"FunctionCallStatement":return p(r.createElement(a.gM,{...l,key:String(t.index),isGroupCard:!1,block:t,isFirstStatement:i}))}}),L=r.memo(function(e){let{cards:t,isLast:n,isFirstStatement:i,...l}=e,{renderArgumentFilling:o,renderConnector:s}=l,c=t[0];if(!c)return null;let d=t[t.length-1];return d?r.createElement(r.Fragment,null,r.createElement(P,{...l,key:c.index,items:t},t.map((e,n)=>{let c=t.length-1===n;return r.createElement(r.Fragment,{key:e.index},r.createElement(a.gM,{...l,key:e.index,isGroupCard:!0,block:e,isFirstStatement:i&&0===n}),o(e.index),c?U:s(e.index))})),s(d.index)):null}),U=r.createElement("div",{style:{height:48}});n(54734),n(54555),n(43419),n(62825);var V=n(21823);n(62321)},58651:(e,t,n)=>{n.d(t,{A1:()=>u,JI:()=>c,PB:()=>s,Tf:()=>o,e2:()=>d,z2:()=>l});var a=n(69670),r=n(39716),i=n(64744);let l=(0,r.AH)`
  pointer-events: none;
  opacity: 0.16;
`,o=(0,r.AH)`
  transition: all 0.24s ease-in-out;
`,s=r.Ay.div`
  --height: 64px;
  position: sticky;
  top: calc(var(--height) / -2);
  width: var(--height);
  height: var(--height);
  display: flex;
  align-items: center;
  justify-content: center;
`,c=(0,r.Ay)(i.a)`
  text-transform: uppercase;
`,d=r.Ay.div`
  border: 1px solid ${a.Tc2};
  border-radius: ${e=>{let{$size:t=100}=e;return`${t}px`}};
  box-shadow: 0px 2px 4px 0px #0000000f;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: ${a.ONy};
  transition: all 0.24s ease-in-out;
  ${e=>{let{$disabled:t}=e;return t&&"pointer-events: none; "}}
  flex-direction: ${e=>{let{$direction:t="row"}=e;return t}};
`,u=r.Ay.h3`
  display: flex;
  align-items: center;
  color: ${a.t14};
  font-family: Outfit;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.002px;
  padding: 0px;
  gap: 8px;
`},37089:(e,t,n)=>{n.d(t,{Cr:()=>ee,Dl:()=>U,Ht:()=>q,IP:()=>en,K2:()=>X,OO:()=>B,WA:()=>j,Yt:()=>K,ZZ:()=>J,ad:()=>D,cr:()=>F,gm:()=>T,h2:()=>L,hD:()=>et,hn:()=>O,iC:()=>I,oy:()=>er,rr:()=>V,s8:()=>G,u0:()=>ec,uB:()=>z,y_:()=>ea,yi:()=>Z});var a=n(99538),r=n(13489),i=n(49170),l=n(41917),o=n(88236),s=n(39303),c=n(87757),d=n(79382),u=n(29342),p=n(44242),m=n(45281),g=n(36213),y=n(89387),f=n(44814),h=n(39629),b=n(13025),x=n(8706),E=n(96326),v=n(51703),C=n(47831),S=n(37117),k=n(45742),w=n(85170),A=n(67846);let I=(e,t)=>async n=>{let{api:a,dispatch:r}=n,{favoriteApps:i}=await a.accountSettingsGet();r(t((await a.playbookEditorGetAllCommands()).reduce((t,n)=>{if("trigger"===e&&!n.isTrigger||"command"===e&&n.isTrigger)return t;let a={name:n.alias,label:n.appName,icon:n.appIcons[0],commands:[]},r={name:n.label,commandId:n.commandId,expressions:n.expressions};if(n.promoted)return{...t,promotedCommands:[...t.promotedCommands,{...r,icon:a.icon,pluginAlias:a.name,priority:n.priority??0}]};if(n.appPromoted){let e=t.promoted[a.name];return e?t.promoted[a.name]={...e,commands:[...e.commands,r]}:t.promoted[a.name]={...a,priority:n.priority??0,commands:[r]},t}if(i?.includes(n.factoryId)){let e=t.favorites[a.name];return e?t.favorites[a.name]={...e,commands:[...e.commands,r]}:t.favorites[a.name]={...a,commands:[r]},t}let l=t.more[a.name];return l?t.more[a.name]={...l,commands:[...l.commands,r]}:t.more[a.name]={...a,commands:[r]},t},{favorites:{},more:{},promoted:{},promotedCommands:[]})))},P=e=>{let t={...e};return"FunctionCallStatement"===t.type&&(t.expanded=!0,t.args.length>0?t.selectedTab="Customize":t.selectedTab="Preview"),t};async function $(e,t,n){let a=(0,w.Pv)(n),{pluginAlias:r,commandId:i}=t,l=await e.playbookEditor2_CreateFunctionCall((0,w.qO)(a),r,i);return e.trackEvent((0,S.R_)(t,n,l.statement.index)),l}let T=(e,t,n)=>async a=>{let{api:r,dispatch:i}=a;if(t.cardEditorState?.type!=="addCard")return;let{statement:l,plugins:o}=await $(r,e,t),s=t.cardEditorState.targetIndex??0,c=t.cardEditorState.targetInside??!0;i(n((0,w.Bf)(t,e=>({...R(e,P((0,w.Yy)(l,-1)),s,c),plugins:o})),l.index))},F=(e,t,n)=>async a=>{let{api:r,dispatch:i}=a,{statement:l,plugins:o}=await $(r,e,t),s=P((0,w.Yy)(l,-1));i(n((0,w.Bf)(t,e=>({...e,trigger:s,plugins:o})),-1))},R=(e,t,n,r)=>-1===n?{...e,statements:[t,...e.statements]}:(0,a.Co)({...e,statements:(0,w.Hy)(e.statements,t,n,r)},{transformBlockStatement:e=>({...e,children:(0,w.Hy)(e.children,t,n,r)})}),M=0;function O(e){return async function(t){let{api:n,dispatch:a}=t,{index:l,pb:o,reqParams:s}=e,c=[];if(!s.isPlaybookArgument)for(let e of o.args){if((0,w.fW)(e.name))continue;let t={type:"VarRefExpression",name:e.name,displayHint:{label:e.label,description:e.comment||"",icon:"TexturedAskMeEverytime"},typeHint:e.typeHint,validationStatus:[],referenceType:"argument"};if(s.userInput&&!e.label.toLowerCase().includes(s.userInput.toLowerCase()))continue;let{isAssignable:a,isConvertible:i}=await eo(n,e.typeHint.signature,s.typeSignature);(a||i)&&(a?c.push({type:"ExistingArgument",value:t,displayHint:{description:e.comment||"",label:`Existing Argument - ${e.label}`,icon:"TexturedAskMeEverytime",interactions:{...t.displayHint.interactions,...e.typeHint.typeInteractions}},isSafe:a}):i&&c.push({type:"ExistingArgument",value:{type:"CastExpression",expression:t,typeHint:{tag:r.E.Simple,signature:s.typeSignature,typeLabel:"Unknown"},displayHint:{...t.displayHint,icon:e.typeHint.typeIcon},validationStatus:[]},displayHint:{description:e.comment||"",label:`Existing Argument - ${e.label}`,icon:"TexturedAskMeEverytime",interactions:{...t.displayHint.interactions,...e.typeHint.typeInteractions}},isSafe:!1}))}if(s.pbArgumentsOnly){a(e.onDone({existingArgumentSuggestions:c,reqParams:s,suggestions:[]}));return}let d=Date.now();M=d;let u=[];try{for await(let t of i.F(n,"playbookEditor2_GetPlaybookValueSuggestions")((0,w.qO)(o),s.isPlaybookArgument?null:l,s.argumentName,s.typeSignature,s.userInput,s.forceRefreshCache?{cacheMaxAgeMs:0}:{})){if(u.push(t),u=u.toSorted((e,t)=>e.weight-t.weight),M!==d)return;e.onPartialResults&&a(e.onPartialResults({existingArgumentSuggestions:c,reqParams:s,suggestions:Array.from(u)}))}a(e.onDone({existingArgumentSuggestions:c,reqParams:s,suggestions:u}))}catch(t){e.onError&&a(e.onError(JSON.stringify(t,null,2)))}}}function _(e){return"FieldAccessExpression"===e.type&&("toTable"===e.field||"toString"===e.field)}let N=async function(e,t,n){var a;let i,g=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,y=[],{isAssignable:f,isConvertible:h}=await eo(e,t.typeHint.signature||[],n.signature);if(f||h){let e=f?t:{type:"CastExpression",expression:t,typeHint:n},a=f||n.signature.some(e=>l.u0(e.facets,o.g));i={type:"PreviousAction",value:e,varRef:"",displayHint:{label:`${t.displayHint.label}`,icon:t.displayHint.icon||"TexturedPreviousActions",description:"Use the result of a previous action",interactions:t.displayHint.interactions},typeHint:e.typeHint,validationStatus:[],children:null,isSafe:a}}else i=null;if(_(t))return i&&y.push(i),y;let b=[],x=null;n.signature.some(e=>l.u0(e.facets,o.g))&&("VarRefExpression"===t.type||t.expression.typeHint.tag===r.E.Multiport)&&(x={type:"PreviousAction",value:{type:"OperatorExpression",op:"error",args:[t],arity:1,displayHint:{label:"Error Message",icon:"TexturedPreviousActions",description:"Check the error on a previous action"},typeHint:k.Tg},varRef:"",displayHint:{label:"Error Message",icon:"TextOutline",description:"Check the error on a previous action"},typeHint:k.Tg,validationStatus:[],children:null,isSafe:!0});let E=(0,w.WT)(t.typeHint.signature),v=t.typeHint?.signature||[],C=g<4?(await Promise.all(v.map((a=n.signature,async t=>{let n=`${es([t])}-${es(a)}`;return el[n]??=await e.playbookEditor2_GetFieldAccessors(t,a)})))).flat():[],S=[];for(let a of C){let r={type:"FieldAccessExpression",expression:t,field:a.name,displayHint:{label:a.label,icon:a.icon||a.typeHint.typeIcon,description:a.description,interactions:a.typeHint.typeInteractions},typeHint:a.typeHint,validationStatus:[]};if(_(r)&&(f||h)){S=await N(e,r,n,g+1);continue}(0,m.tM)(b,await N(e,r,n,g+1))}if(b.length>0&&(!t.typeHint.signature.some(e=>l.is(e.facets,o.g)||l.is(e.facets,s.p)||l.is(e.facets,c.F)||l.is(e.facets,d.c)||l.is(e.facets,u.l)||l.is(e.facets,p.bE))||!f)||x||E){if(S.length>0)for(let e of S)b.unshift(e);x&&b.unshift(x),i&&(f||0===S.length)&&b.unshift({type:"PreviousAction",value:i.value,varRef:"",displayHint:{label:`Entire ${t.typeHint?.typeLabel||"value"}`,icon:t.typeHint?.typeIcon||t.displayHint?.icon||"TexturedPreviousActions",description:"Use the result of a previous action",interactions:t.displayHint.interactions},typeHint:i.typeHint,validationStatus:[],children:null,isSafe:i.isSafe}),y.push({type:"PreviousAction",value:t,varRef:"",displayHint:{label:t.displayHint.label,icon:t.displayHint.icon||"TexturedPreviousActions",description:""},typeHint:t.typeHint,validationStatus:[],children:b,isSafe:!0})}else i&&y.push(i);return y};function B(e,t,n){return async a=>{let{api:r,dispatch:i}=a,s=[],c=[];for(let n of e)if("FunctionCallStatement"===n.type)for(let e of((0,m.tM)(c,await H(n,r,t,!1)),n.columns)){if(!e.selected)continue;let n=e.typeHint?.signature||[],{isAssignable:a,isConvertible:i}=await eo(r,t.signature,e.typeHint?.signature||[]);if(!a&&!i)continue;let c={type:"TableColumnReferenceExpression",id:e.id,typeHint:e.typeHint||t,validationStatus:[],displayHint:{label:e.title,description:"",icon:"StudioTableOutline"}},d=a?c:{type:"CastExpression",expression:c,typeHint:t},u=a||n.some(e=>l.u0(e.facets,o.g)),p={type:"PreviousAction",value:d,varRef:"",displayHint:{label:`${c.displayHint.label}`,icon:c.displayHint.icon||"TexturedPreviousActions",description:"Use the result of a previous action",interactions:c.displayHint.interactions},typeHint:d.typeHint,validationStatus:[],children:null,isSafe:u};s.push(p)}i(n([...s,...c]))}}function D(e,t,n){return async a=>{let{api:r,dispatch:i}=a,l=[];for(let n of e)if("FunctionCallStatement"===n.type)(0,m.tM)(l,await H(n,r,t,!0));else if("IfStatement"===n.type){let e={type:"VarRefExpression",name:n.varName,referenceType:"condition",displayHint:{label:`Condition ${n.actionNumber}`,description:""},typeHint:(0,w.Zy)(n),validationStatus:[]};(0,m.tM)(l,await N(r,e,t))}else if("ForStatement"===n.type){let e={type:"VarRefExpression",name:n.varName,referenceType:"loop",displayHint:{label:`Loop ${n.actionNumber}`,description:""},typeHint:(0,w.YX)(n),validationStatus:[]};(0,m.tM)(l,await N(r,e,t))}i(n(l.slice().reverse()))}}async function H(e,t,n,a){var i;let l=[],o=a?(0,w.u5)(e):(0,w.cD)(e),s={type:"VarRefExpression",name:e.varName,referenceType:"functionCall",displayHint:{label:o,icon:e.displayHint?.plugin.icon,description:""},typeHint:0===(i=e.displayHint?.command.returns.map(e=>e.type)||[]).length?{tag:r.E.Any,signature:[],typeLabel:"Unknown"}:1===i.length&&i[0]?i[0]:{tag:r.E.Multiport,signature:i.flatMap(e=>e.signature),typeLabel:"Multiple"},validationStatus:[]};for(let r of e.displayHint?.command.returns||[]){if(0===r.type.signature.length)continue;let e=r.port?{type:"FieldAccessExpression",expression:s,field:r.port,displayHint:{label:`${o} \u{2022} ${r.label}`,icon:s.displayHint.icon,description:"",interactions:s.displayHint.interactions},typeHint:r.type,validationStatus:[]}:s;a?(0,m.tM)(l,await N(t,e,n)):l.push({type:"PreviousAction",value:e,varRef:"",displayHint:{label:e.displayHint.label,icon:e.displayHint.icon||"TexturedPreviousActions",description:""},typeHint:e.typeHint,validationStatus:[],children:null,isSafe:!0})}return l}function z(e,t){return async n=>{let{api:a,dispatch:r}=n;r(t(await a.playbookEditor2_GetValidOperators(e)))}}function L(e,t,n){return async a=>{let{api:r,dispatch:i}=a;return i(n(await U(e,t,r)))}}async function U(e,t,n){let a=await n.playbookEditor2_UpdatePlaybookCommandArgumentValue((0,w.qO)(e),t?{cacheMaxAgeMs:0}:{});return(0,w.C7)((0,w.Vl)(a),e)}function V(e,t,n,a,r){return async i=>{let{api:l}=i,o={},s=[];for(let e of(r&&(s=await l.playbookEditor2_PreviewArgument((0,w.qO)(t),n,"inputData")),s))e.records&&Object.assign(o,e.records);let c=(0,C.c)(e,"scraper_model")(l);await c.startAgentBuilder({contextUrls:a?[a]:[],goal:r,inputData:o||{}})}}function q(e,t){return async n=>{let{api:a}=n,r=(0,C.c)(e,"scraper_model")(a);await r.startAgentBuilder({inputData:{},objectRef:t})}}let j=(e,t,n,a)=>async function(r){let{api:i,dispatch:l}=r,o=(0,w.qO)(e);a(await i.playbookEditor2_UpdatePlaybookCommandArgumentValue(o,t?{cacheMaxAgeMs:0}:{}),n).forEach(l)};async function W(e,t,n,a){let r=(0,w.ij)(e,t),{meta:i,ref:l}=e;0===i.name.trim().length&&(i.name=w.tS);let o=(0,w.qO)(e);r.shouldSave&&r.shouldUpdateComments&&!a&&(o=await n.playbookEditor2_RecomputeComments(o));let s=!l||r.shouldSave?await n.playbookEditor2_SavePlaybook(o):r.shouldSaveConfig?await n.playbookEditor2_SavePlaybookConfig(o):await n.playbookGet(l);if(!s)throw g.sF.from({message:"Could not save or find playbook"});let c=E.W.fromApi(s);r.shouldDeactivateTrigger&&c.triggerStatus?.uuid&&await n.triggerDeactivate(c.triggerStatus?.uuid),r.shouldPin&&(c.space="personal",c.id&&await n.playbookSetFavorite(c.id,!0));let d=(0,y.tb)(c.ref);return[c,{...o=await n.playbookEditor2_GetPlaybookAsUIAst(d),args:e.args,fromSnapshot:r.shouldDiscardSnapshot?void 0:e.fromSnapshot}]}function G(e,t,n){return async a=>{let{api:r,dispatch:i}=a;try{let a="provider"in e?await r.playbookEditor2_GetPlaybookAsUIAst((0,y.tb)(e)):e,l=(0,w.h_)(a),o=await (0,w.el)(r,a);if(!l){i(n());return}let s=(0,w.CX)(a),c=await Promise.all(s.map(e=>{let t=(0,f.RY)(e.uri);return r.objectStorageGetResource("scraper_model",t.id,t.tag)})),d=c.map(e=>x.is(e)?e?.settings.match:e?.match).filter(h.zz).flat(),u=c.map(e=>x.is(e)?e?.details.exampleUrls:e?.url).filter(h.zz).flat();i(t(u,d,o))}catch(e){i(n())}}}function Y(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:250,a=e.getBoundingClientRect().top,r=t.getBoundingClientRect().top,i=a+t.scrollTop-r;t.scrollTo({top:i-n,behavior:"smooth"})}function Q(e,t){document.activeElement!==e&&(e instanceof HTMLElement&&e.focus({preventScroll:!0}),t())}let J=e=>async()=>{await new Promise(requestAnimationFrame);let t=document.querySelector("[data-builder-role='scrollable-container']"),n=document.querySelector(`[data-argument-name='${e}']`);n&&t&&Q(n,()=>{n.scrollIntoView({behavior:"smooth",block:"center"})})},Z=e=>async()=>{let t=document.querySelector("[data-builder-role='scrollable-container']"),n=document.querySelector(`[data-statement-index='${e}']`);n&&t&&Q(n,()=>Y(n,t))},X=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return async function(){for(var n=arguments.length,a=Array(n),r=0;r<n;r++)a[r]=arguments[r];for(let n=0;n<e.length;n++){let r=e[n];r&&(await r(...a),n<e.length-1&&await (0,b.QN)(t))}}},K=e=>async()=>{let t=document.querySelector("[data-builder-role='scrollable-table']"),n=t?.querySelector(`[data-statement-header-index='${e}']`);n&&t&&(0,A.tB)(n,t)},ee=e=>async()=>{let t=document.querySelector("[data-builder-role='statement-container']"),n=t?.querySelector(`[data-argument-name="${e.replace(/["\\]/g,"\\$&")}"]`);n&&t&&(n.classList.add("error"),setTimeout(()=>n.classList.remove("error"),200),Q(n,()=>{n.scrollIntoView({behavior:"smooth",block:"center"})}))},et=(e,t)=>async()=>{let n=document.querySelector("[data-builder-role='scrollable-container']"),a=document.querySelector(`[data-statement-index='${e}']`);if(!a||!n)return;a.scrollIntoView({behavior:"smooth"});let r=a.querySelector(`[data-argument-name="${t.replace(/["\\]/g,"\\$&")}"]`);r&&Q(r,()=>(function(e,t,n){let a=new IntersectionObserver(e=>{e.forEach(e=>{n(e.isIntersecting),a.disconnect()})},{root:t,threshold:0});a.observe(e)})(r,a,e=>{r instanceof HTMLElement&&r.focus(),e?Y(r,n):setTimeout(()=>{Y(r,n)},250)}))};async function en(e,t,n){let a=(0,v.j)(e),r=a.advancedOptions.length>0,i=await t.websiteMenuPlaybookAdd((0,y.tb)(n),{title:a.name,contexts:r?a.advancedOptions:["all"],urlMatchPatterns:"all"===a.showOn?["*://*/*"]:a.specificMatchers.filter(e=>"pattern"===e.operation).map(e=>e.value),urlContainsPatterns:[],integrationExtraData:{"scraper.contextualScraping":a.contextualScraping},urlRegexPatterns:"all"===a.showOn?[]:a.specificMatchers.filter(e=>"regex"===e.operation).map(e=>e.value)});return E.W.fromApi(i)}function ea(e,t){return async function(n){let{api:a,dispatch:r}=n,{pb:i,origin:l,rightClickMenu:o}=e,[s,c]=await W(i,l,a,e.skipCommentsUpdate);o&&(s=await en({...o},a,s.ref)),r(t(s,c))}}function er(e,t,n){return ea({pb:(0,w.Pv)(e),origin:e.origin,skipCommentsUpdate:t.featureFlags.v4MiniEnabled},(e,t)=>n(t))}let ei={},el={};async function eo(e,t,n){let a=`${es(t)} ${es(n)}`;return ei[a]??=await e.playbookEditor2_TypeIsAssignable(t,n)}let es=e=>e.map(e=>`${e.facets.join(",")}${e.config?`:${JSON.stringify(e.config)}`:""}`).join("-");function ec(e,t,n){return async function(a){let{api:r,dispatch:i}=a,{statement:l,plugins:o}=await r.playbookEditor2_CreateFunctionCall(e,t.pluginAlias,t.commandId);i(n(l,o))}}},66347:(e,t,n)=>{n.d(t,{O:()=>s});var a=n(86347),r=n(99538),i=n(13489),l=n(62987),o=n(85170);function s(e){let t=d(e);return(0,o.li)(e,e=>{let n=c(e.name);if(!n)return e;let a=e.args.map(e=>e.name===n.exportTableArg?{...e,value:t}:e);return{...e,args:a}})}let c=e=>a.KE.commands.find(t=>t.commandId===e),d=e=>({type:"ObjectLiteralExpression",fields:(function(e){let t=new Map;return(0,r.bZ)(e,{visitFunctionCallStatement(e){if(c(e.name))return!0;for(let n of e.columns)n.selected&&t.set(n.id,n);return!0}}),Array.from(t.values())})(e).map(e=>{let t={type:"CastExpression",expression:{type:"TableColumnReferenceExpression",id:e.id,typeHint:e.typeHint,displayHint:{description:e.title,label:e.title,icon:e.typeHint?.typeIcon}},typeHint:{tag:i.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"]}],typeLabel:"Text"}};return{name:e.title,title:e.title,struct:l.u.Scalar,value:t}})})},50854:(e,t,n)=>{n.d(t,{J$:()=>g,N0:()=>u,Ve:()=>y,XW:()=>p,Xo:()=>m,aX:()=>d,qh:()=>b,sB:()=>s,yZ:()=>f});var a=n(10328),r=n(99538),i=n(37117),l=n(85170);let o={delete:"builder.delete-conditional",edit:"builder.edit-conditional",add:"builder.add-conditional"};function s(e,t,n){return async a=>{let{api:r}=a,l=(0,i.Pf)(t,n);l&&await r.trackEvent({name:o[e],properties:l})}}let c={delete:"builder.delete-loop",edit:"builder.edit-loop",add:"builder.add-loop"};function d(e,t,n){return async a=>{let{api:r}=a,l=(0,i.Fu)(t,n);l&&await r.trackEvent({name:c[e],properties:l})}}function u(e,t){return async n=>{let a=(0,l.S3)(e,t),r=(0,l.Pv)(e);if(a){if("FunctionCallStatement"===a.type)await n.api.trackEvent({name:"builder.delete-action",properties:{pbId:r.meta.id,pbName:r.meta.name,from:(0,i.$Y)(e.origin),mode:(0,i.Wi)(e),step:t,commandName:(0,i.kD)(a),commandId:a.name,verb:(0,i.Zn)(a),pluginId:r.plugins.find(e=>e.alias===a.plugin)?.factoryId??"",pluginName:a.plugin,isWhenCommand:a.isTrigger}});else if("ForStatement"===a.type)return d("delete",e,t)(n);else if("IfStatement"===a.type)return s("delete",e,t)(n)}}}function p(e,t){return async n=>{let{api:a}=n,r=(0,i.el)(e,t);await a.trackEvent(r)}}function m(e){return async t=>{let{api:n}=t,a=(0,i.Sl)(e);await n.trackEvent(a)}}function g(e,t){return async n=>{let{api:a}=n,r=(0,l.Pv)(e);await a.trackEvent({name:"builder.test_mode.toggle",properties:{pbId:r.meta.id,pbName:r.meta.name,from:(0,i.$Y)(e.origin),mode:(0,i.Wi)(e),test_mode:t}})}}function y(e,t,n){return async a=>{let{api:r}=a,o=(0,l.Pv)(e);await r.trackEvent({name:"builder.statement.expand",properties:{pbId:o.meta.id,pbName:o.meta.name,from:(0,i.$Y)(e.origin),mode:(0,i.Wi)(e),statementIndex:t,result_analytics:n}})}}function f(e,t,n){return async a=>{let{api:o}=a,s=(0,l.Pv)(e),c=n||x(s),d=[],u=null;if((0,r.bZ)(s,{visitFunctionCallStatement(e){if(!e.entry&&e.index!==c)return!0;let t=[];return(0,r.b)(e,{visitVarRefExpression(e){for(let n of s.args)if(n.name===e.name){t.push({label:n.name,skipped:!n.value});break}return!0}}),d.push({...e,inputArray:t}),e.index!==c||(u=e,!1)}}),!u)return;let p=(0,i.CY)(u,s);await o.trackEvent({name:t,properties:{commands:d.map(e=>[(0,i.kD)(e),e.name].join(":")),from:(0,i.$Y)(e.origin),mode:(0,i.Wi)(e),commandsArray:d.map(e=>({...(0,i.CY)(e,s),inputArray:e.inputArray,needCustomize:!!e.inputArray.length})),error:p?.error,pbId:s.meta.id,pbName:s.meta.name,plugins:s.plugins.map(e=>e.displayHint?.name||e.alias),status:p?.status,step:c,test_mode:e.testModeEnabled}})}}let h=null;function b(e,t,n,r){return async function(l){let{api:o}=l,s={name:"builder.edit-action",properties:{...(0,i.LN)(e,t),pbId:t.meta.id,pbName:t.meta.name,from:(0,i.$Y)(n),mode:(0,i.Q)(n)?"edit":"create",step:e.index,changedArgName:r}},c=(0,a.createHash)("sha256").update(JSON.stringify(s)).digest("hex");h!==c&&(h=c,await o.trackEvent(s))}}let x=e=>{let t=0;return(0,r.bZ)(e,{visitFunctionCallStatement:e=>(e.entry&&(t=e.index),!0)}),t}},37117:(e,t,n)=>{n.d(t,{$Y:()=>s,CY:()=>h,Fu:()=>m,LN:()=>g,Pf:()=>p,Q:()=>r,R_:()=>o,Sl:()=>b,Wi:()=>i,Zn:()=>c,el:()=>l,kD:()=>u});var a=n(85170);let r=e=>e.initPlaybook?.meta.id,i=e=>"resume"===e.origin.from?"resume":"results"===e.origin.from?"from_snapshot":r(e.origin)?"edit":"create",l=(e,t)=>{let n=(0,a.Pv)(e),r=(0,a.gN)(n).map(e=>({commandId:e.name,verb:c(e),plugin:e.plugin,index:e.index,errors:e.validationError?[{argumentName:e.validationError.argumentName??e.validationError.argumentLabel??"unknown argument",message:(0,a.p0)(e.validationError.status)}]:[]}));return{name:"builder.exit",properties:{pbId:n.meta.id,pbName:n.meta.name,from:s(e.origin),mode:i(e),exitMode:t,commands:r}}},o=(e,t,n)=>{let r=(0,a.Pv)(t),l=e.expressions?.[0]?.split(" ")[0]??"",o=r.plugins.find(t=>t.alias===e.pluginAlias)?.factoryId??"";return{name:"builder.add-action",properties:{pbId:r.meta.id,pbName:r.meta.name,from:s(t.origin),mode:i(t),step:n,commandName:e.name,commandId:e.commandId,verb:l,pluginId:o,pluginName:e.pluginAlias,isWhenCommand:0===n}}},s=e=>{switch(e.from){case"customFlow":return"custom_flow";case"unknown":case"blank":return"create";case"synthesisLink":return"opportunities";case"resume":case"results":return"results";case"rightClickMenu":case"playLink":case"similarPlaybooks":case"retry":case"my":return"my"}},c=e=>{let t="",n=e.displayHint?.command.expressions[0];return n&&([t=""]=n.split(/\s+/)),t},d=e=>{switch(e.type){case"ConstantValueExpression":case"FieldAccessExpression":case"VarRefExpression":case"CastExpression":case"BCLFragmentExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"OperatorExpression":case"MissingExpression":case"TableColumnReferenceExpression":return e.displayHint?.label??"";case"ObjectLiteralExpression":return e.fields.map(e=>e.title).join(",");case"ArrayLiteralExpression":return e.elements.map(d).join(",");case"FieldRemappingExpression":return d(e.expression);case"StringTemplatingExpression":return e.children.map(d).join("");case"StringTemplatingTextNode":return e.text;case"StringTemplatingVariableNode":return`\${${d(e.value)}}`;case"StringTemplatingGenerateNode":return`\${generate(${d(e.prompt)})}`;case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return`<${e.element}>${e.children.map(d).join("")}</${e.element}>`;case"StringTemplatingEmbedNode":return`<${e.element}/>`}},u=e=>e?.comment||e.displayHint?.command.expressions[0]||e.name,p=(e,t)=>{let n,r;let l=(0,a.Pv)(e),o=(0,a.S3)(e,t);if(o?.type==="IfStatement")return"OperatorExpression"===o.conditionExpr.type&&(n=o.conditionExpr.displayHint?.label,r=o.conditionExpr.args.map(d)),{pbId:l.meta.id,pbName:l.meta.name,from:s(e.origin),mode:i(e),step:t,operator:n,args:r}},m=(e,t)=>{let n=(0,a.Pv)(e),r=(0,a.S3)(e,t);if(r?.type==="ForStatement"){let a=d(r?.iterable);return{pbId:n.meta.id,pbName:n.meta.name,from:s(e.origin),mode:i(e),step:t,iterable:a}}},g=(e,t)=>({commandName:u(e),commandId:e.name,verb:c(e),pluginId:t.plugins.find(t=>t.alias===e.plugin)?.factoryId??"",pluginName:e.plugin,isWhenCommand:e.isTrigger}),y=e=>{if(e.entry)return e.entry.result.type},f=e=>{if(e.entry&&"error"===e.entry.result.type)return e.entry.result.error.message},h=(e,t)=>({...g(e,t),output:!0,status:y(e),error:f(e)}),b=e=>{let t=(0,a.Pv)(e);return{name:"builder.open",properties:{pbId:t.meta.id,pbName:t.meta.name,from:s(e.origin),mode:i(e)}}}},45742:(e,t,n)=>{n.d(t,{$O:()=>B,Af:()=>Y,Dz:()=>F,EW:()=>G,Ec:()=>_,Fp:()=>P,HA:()=>C,IJ:()=>Q,Ij:()=>x,Iw:()=>I,J9:()=>S,JI:()=>ee,Jz:()=>v,Mv:()=>$,QJ:()=>W,SS:()=>z,Tg:()=>q,UI:()=>Z,Uc:()=>A,Vi:()=>E,XW:()=>O,Ze:()=>K,_f:()=>L,aX:()=>R,dR:()=>H,dU:()=>U,df:()=>T,gB:()=>X,hg:()=>J,ie:()=>w,kx:()=>D,mK:()=>N,py:()=>a,qz:()=>k,r:()=>M,u5:()=>V,wL:()=>function e(t){switch(t.type){case"ConstantValueExpression":return H(t);case"StringTemplatingExpression":case"OperatorExpression":case"ObjectLiteralExpression":case"FieldAccessExpression":case"VarRefExpression":case"FieldRemappingExpression":case"BCLFragmentExpression":case"ObjectStorageSearchExpression":case"ObjectStorageReferenceExpression":case"TableColumnReferenceExpression":return!1;case"ArrayLiteralExpression":return t.elements.every(e);case"CastExpression":return e(t.expression);case"MissingExpression":return!0}},zu:()=>j});var a,r=n(41917),i=n(74729),l=n(91982),o=n(13489),s=n(52497),c=n(867),d=n(11739),u=n(88236),p=n(53691),m=n(29342),g=n(79382),y=n(44242),f=n(39303),h=n(87757),b=n(34569);let x="Ask me every time",E="Custom Text",v="Map fields",C="Multiple values",S="Get from previous actions",k="AI generated text",w="Upload file",A=e=>"PreviousAction"===e.type,I=e=>"Custom"===e.type,P=e=>"ExistingArgument"===e.type;function $(e){let[t]=e.signature;return t&&r.u0(t.facets,i.y)}function T(e){if(!e)return!1;let[t]=e.signature;return t&&r.u0(t.facets,l.J)}let F={moreInfoExpanded:!1,editExpanded:!1,advancedExpanded:!1},R=e=>"IfStatement"===e.type,M=e=>"ForStatement"===e.type,O=e=>"BlockStatement"===e.type,_=e=>"FunctionCallStatement"===e.type,N={type:"ConstantValueExpression",validationStatus:[],value:null,typeHint:{tag:o.E.Simple,signature:[{facets:r.X9(s.Y)}],typeLabel:""},displayHint:{label:"",description:""}},B=e=>({type:"ConstantValueExpression",typeHint:e,validationStatus:[],value:c.rV.serialize(),displayHint:{label:" ",description:""}}),D=()=>({type:"ConstantValueExpression",typeHint:{tag:o.E.Simple,signature:[{facets:r.X9(c.gn)}],typeLabel:"Nothing"},validationStatus:[],value:c.rV.serialize(),displayHint:{label:" ",description:""}});function H(e){return c.gn.deserialize(e.value).ok}let z=e=>({type:"ArrayLiteralExpression",typeHint:e,elements:[],validationStatus:[],mode:d.Qg.COMBINATIONS}),L=e=>B(e),U=e=>({type:"StringTemplatingExpression",children:[],mimeType:e,typeHint:e?{tag:o.E.Simple,signature:[{facets:r.X9(u.g),config:{mimeType:e}}],typeLabel:"Text",typeIcon:"TextOutline"}:q,validationStatus:[]}),V=r.X9(u.g),q={tag:o.E.Simple,signature:[{facets:V}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value"},j={tag:o.E.Simple,signature:[{facets:r.X9(p.N)}],typeIcon:"WebsiteOutline",typeLabel:"URL",typeDescription:"A URL value"},W={tag:o.E.Simple,signature:[],typeIcon:"ObjectOutline",typeLabel:"Unknown"},G={tag:o.E.Simple,signature:[{facets:r.X9(u.g)},{facets:r.X9(m.l)},{facets:r.X9(g.c)},{facets:r.X9(y.bE)}],typeIcon:"CodeOutline",typeLabel:"JSON",typeDescription:"A JSON value"},Y=[{label:"String",value:"string",icon:"TextOutline",facets:V},{label:"URL",value:"url",icon:"WebsiteOutline",facets:r.X9(p.N)},{label:"Email",value:"email",icon:"AtSignOutline",facets:r.X9(f.p)},{label:"Phone Number",value:"phone",icon:"MobileOutline",facets:r.X9(h.F)},{label:"Number",value:"number",icon:"OneBold",facets:r.X9(g.c)},{label:"Boolean",value:"boolean",icon:"CheckmarkOutline",facets:r.X9(m.l)},{label:"Date",value:"date",icon:"CalendarOutline",facets:r.X9(y.bE)}],Q=Y.reduce((e,t)=>(e[t.value]=t,e),{});function J(e){return"VarRefExpression"===e.type&&"argument"===e.referenceType}let Z=e=>"CastExpression"===e.type?Z(e.expression):e,X=e=>null!==e&&"type"in e&&"result"===e.type,K=e=>"success"===e.type;function ee(e){let t=b.q$.decode(e.displayHint?.icon??""),n=t.ok?t.value:"IntegrationBardeenCommons";return{factoryId:e.factoryId,name:e.displayHint?.name||"",alias:e.alias,version:e.displayHint?.version||"",icon:n,singleton:!1,instance:void 0}}!function(e){e.isRunning=e=>"running"===e.type,e.getRunning=t=>e.isRunning(t)?t:null,e.isPreparing=e=>"preparing"===e.type,e.isFilling=e=>"filling"===e.type,e.isIdle=e=>"idle"===e.type,e.isPausing=e=>"pausing"===e.type}(a||(a={}))},85170:(e,t,n)=>{n.d(t,{$C:()=>tB,$J:()=>nt,$P:()=>eO,BH:()=>tO,BZ:()=>el,Bf:()=>ev,C7:()=>eI,C8:()=>e4,CX:()=>tn,Ce:()=>eU,Ck:()=>ew,Cs:()=>e1,Dl:()=>ej,EP:()=>tJ,Ej:()=>e2,GB:()=>eG,GR:()=>tF,Hy:()=>em,Jd:()=>e_,KH:()=>eN,L7:()=>tN,Ll:()=>eQ,NI:()=>tC,OO:()=>tI,P0:()=>t8,PA:()=>t3,Pv:()=>ef,RQ:()=>t6,Re:()=>ed,Rn:()=>t0,S3:()=>eg,Su:()=>t9,T5:()=>nn,TC:()=>td,TY:()=>tH,UA:()=>tQ,Ui:()=>tu,Ut:()=>eD,Vl:()=>tm,Vx:()=>nr,WT:()=>ti,Xc:()=>ey,YM:()=>eS,YX:()=>tY,Yy:()=>th,ZA:()=>eC,ZL:()=>eh,Zg:()=>ep,Zq:()=>eJ,Zy:()=>tG,_c:()=>tW,_x:()=>t7,a4:()=>e7,aB:()=>eE,aX:()=>tw,ai:()=>et,cD:()=>ty,dG:()=>t$,dT:()=>X,el:()=>tt,f$:()=>ei,fW:()=>tl,g9:()=>na,gL:()=>tr,gN:()=>eo,gU:()=>eV,gy:()=>ne,h$:()=>tP,h_:()=>te,hk:()=>to,ht:()=>ni,i4:()=>t_,ij:()=>ee,j$:()=>ez,kJ:()=>e0,kw:()=>eA,lC:()=>tL,lU:()=>eR,li:()=>ek,mG:()=>tD,mY:()=>eP,md:()=>tX,nE:()=>eK,nO:()=>es,nY:()=>e3,nx:()=>tV,oW:()=>eL,p:()=>function e(t,n){return t.flatMap(t=>{let a=n(t);if(Array.isArray(a))return a;if(!a)return[];switch(a.type){case"BlockStatement":{let t=e(a.children,n);return[{...a,children:t}]}case"ForStatement":{let[t]=e([a.body],n);return[{...a,body:t||{type:"BlockStatement",children:[],index:0,output:!1,comment:null,commentFlags:{keep:!1}}}]}case"IfStatement":{let[t]=e([a.ifTrue],n),[r]=e([a.ifFalse],n);return[{...a,ifTrue:t||{type:"BlockStatement",children:[],index:0,output:!1,comment:null,commentFlags:{keep:!1}},ifFalse:r||{type:"BlockStatement",children:[],index:0,output:!1,comment:null,commentFlags:{keep:!1}}}]}case"FunctionCallStatement":return[a]}})},p0:()=>eZ,pd:()=>tZ,ph:()=>tv,qO:()=>tp,qf:()=>eM,qn:()=>tU,r6:()=>eB,rY:()=>tS,rf:()=>tz,sD:()=>eq,sX:()=>tR,sx:()=>K,tP:()=>eu,tS:()=>Z,u5:()=>tg,uC:()=>en,v8:()=>tk,vU:()=>t1,vY:()=>tM,w3:()=>e$,wv:()=>tK,xv:()=>tA,yO:()=>eW,ye:()=>eH,yu:()=>eY});var a=n(38792),r=n.n(a),i=n(6146),l=n.n(i),o=n(46288),s=n(29190),c=n(39303),d=n(87757),u=n(88236),p=n(41917),m=n(99538),g=n(38534),y=n(45281),f=n(51952),h=n(91982),b=n(2623),x=n(44242),E=n(79685),v=n(92727),C=n(80906),S=n(16918),k=n(53691),w=n(91159),A=n(94303),I=n(44814),P=n(39629),$=n(23667),T=n(76418),F=n(62987),R=n(34569),M=n(94975),O=n(29342),_=n(79382),N=n(52497),B=n(36884),D=n(16631),H=n(14744),z=n(89387),L=n(13489),U=n(29e3),V=n(42018),q=n(3756),j=n(86347),W=n(26101),G=n(59998),Y=n(98380),Q=n(9562),J=n(45742);let Z="Untitled";function X(e,t){let n=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),a="";if(t){let e=tC(t.value).replace("(by Bardeen)","");if(e){if(e.length>20){let t=e.split(" ");for(;t.join(" ").length>20;)t.pop();e=t.length>0?t.join(" "):(e.split(" ")[0]?.slice(0,18)??"")+"..."}a=` ${e}`}}return`${({use_combined_scaper_model_on_active_tab:"Scrape",use_combined_scaper_model_in_background:"Scrape",act_using_goal:"Scrape",act_using_goal_in_background:"Scrape",get_google_spreadsheet_content_as_table:"Process Google Sheet",get_all_values_from_table:"Process Airtable",notion_get_pages:"Process Notion Page ",do_create_fake_data:"Create fake data",identity:"Test Data"})[e]}${a} - ${n}`}let K=e=>{if((0,J.hg)(e))return"TexturedAskMeEverytime";let t=e;for(;"FieldAccessExpression"===t.type||"CastExpression"===t.type||"FieldRemappingExpression"===t.type;)t=t.expression;return"displayHint"in t&&t.displayHint?.icon?t.displayHint.icon:t.typeHint?.typeIcon?t.typeHint.typeIcon:void 0},ee=(e,t)=>{let n=tp(e),a=t.initPlaybook?tp(t.initPlaybook):null,r=n.visibilities.includes("watched")||n.visibilities.includes("team-watched"),i=n.visibilities.includes("public")&&!r,l=!a||!!a.needsSaving||!s.Bv(tp(n),tp(a),{compareComments:!0,compareMetadata:!0,compareStatementIndex:!1,comparePlaybookArgumentValues:"default",compareStatementOutput:!0,compareFlags:!1}),o=!!a&&!s.Bv(tp(n),tp(a),{compareComments:!1,compareMetadata:!1,compareStatementIndex:!1,comparePlaybookArgumentValues:"config",compareStatementOutput:!1,compareFlags:!0}),c=function(e,t){return!t.lastDescribedPlaybook||!s.Bv(tp(e),tp(t.lastDescribedPlaybook),{compareComments:!1,compareMetadata:!1,compareStatementIndex:!1,comparePlaybookArgumentValues:!1,compareStatementOutput:!1})}(n,t),d=l&&a?.permissions.cow==="duplicate"&&n.meta.name===a.meta.name,u=null!=n.trigger,p=!n.ref,m=er(n,a),g=l&&!!a?.permissions.cow,y=!!a&&ea(n,a),f=(n.meta.needsEditing||y||m||g)&&!p;return{shouldPin:!!(n.ref&&i&&!l),shouldSave:!n.ref||l,shouldSaveConfig:o,shouldShowHowtoRun:(i||p)&&!u&&!n.flags.seen_howtorun,shouldUpdateComments:c,shouldRename:d,shouldDeactivateTrigger:f,shouldDiscardSnapshot:f,wasModified:l}},et=e=>{let{shouldSave:t,shouldPin:n}=e;return t||n},en=e=>{let{shouldSave:t,shouldSaveConfig:n}=e;return t||n},ea=(e,t)=>{let n=e.args,a=t.args;return!s.Xe(n,a,{compareComments:!0,compareMetadata:!0,comparePlaybookArgumentValues:"config"})},er=(e,t)=>{let{trigger:n}=e,a=t?.trigger;return(null!=n||null!=a)&&(null==n||null==a||!s.pR(n,a,{compareComments:!1,compareMetadata:!1,compareFlags:!1,compareStatementIndex:!1,compareStatementOutput:!1,comparePlaybookArgumentValues:!0}))},ei=e=>{let t=ef(e);if(!t.trigger)return!1;let n=ee(t,e.origin);return!(t.fromSnapshot&&!tJ(t)&&!n.shouldDeactivateTrigger)},el=e=>{let t=e.some(e=>c.p.is(e.facets)),n=e.some(e=>d.F.is(e.facets)),a=e.some(e=>u.g.isExact(e.facets)),r=e.some(e=>p.is(e.facets,u.g));return!!(t||n||a||r)};function eo(e){let t=[];return(0,m.bZ)(e,{visitFunctionCallStatement:e=>(t.push(e),!0)}),t}function es(e){let t=[];return(0,m.bZ)(e,{visitFunctionCallStatement:e=>(t.push(e.index),!0)}),t}function ec(e){let t=new Map;return(0,m.bZ)(e,{visitStatement:e=>(t.set(e.index,e),!0)}),t}function ed(e){let t=ec(e);return(0,g.E7)(Array.from(t.keys()),-1)+1}function eu(e,t){let n=[];return(0,m.bZ)(e,{visitFunctionCallStatement:e=>(n.push(e),!0)}),n[0]?.index===t}function ep(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],[a]=function e(t,n,a){let r=[];for(let i=0;i<t.length;i++){let l=t[i];if(l){if("BlockStatement"===l.type){let[t,i]=e(l.children,n,a);if((0,y.tM)(r,t),i)return[r,!0]}else{if(l.index===n)return a&&r.push(l),[r,!0];switch(r.push(l),l.type){case"IfStatement":{let[t,i]=e([l.ifTrue],n,a);if(i)return(0,y.tM)(r,t),[r,!0];let[o,s]=e([l.ifFalse],n,a);if(s)return(0,y.tM)(r,o),[r,!0];(0,y.tM)(r,t),(0,y.tM)(r,o);break}case"ForStatement":{let[t,i]=e([l.body],n,a);if((0,y.tM)(r,t),i)return[r,!0]}}}}}return[r,!1]}(e.trigger?[e.trigger,...e.statements]:e.statements,t,n);return a}let em=(e,t,n,a)=>{if(-1===n)return[t,...e];let r=e.findIndex(e=>e.index===n),i=e[r];if(!i)return e;let l=e.slice(0,r),o=e.slice(r+1);switch(i.type){case"BlockStatement":if(a)return[...l,{...i,children:[t,...i.children]},...o];return[...l,i,t,...o];case"ForStatement":if(!a)return[...l,i,t,...o];{let e="BlockStatement"===i.body.type?{...i.body,children:[t,...i.body.children]}:{type:"BlockStatement",children:[t,i.body],index:0,output:!1,comment:null,commentFlags:{keep:!1}};return[...l,{...i,body:e},...o]}case"IfStatement":if(!a)return[...l,i,t,...o];{let e=i[i.currentBranch],n="BlockStatement"===e.type?{...e,children:[t,...e.children]}:{type:"BlockStatement",children:[t,e],index:0,output:!1,comment:null,commentFlags:{keep:!1}};return[...l,{...i,[i.currentBranch]:n},...o]}case"FunctionCallStatement":return[...l,i,t,...o]}};function eg(e,t){return ey(ef(e),t)}function ey(e,t){function n(e){if(e.index===t)return e;switch(e.type){case"BlockStatement":for(let t of e.children){let e=n(t);if(e)return e}return null;case"ForStatement":return n(e.body);case"IfStatement":{let t=n(e.ifTrue);if(t)return t;return n(e.ifFalse)}case"FunctionCallStatement":return null}}let a=e.trigger?n(e.trigger):null;if(a)return a;for(let t of e.statements){let e=n(t);if(e)return e}return null}let ef=e=>e.history[e.activeIndex]?.ast??e.history[0].ast,eh=e=>{let t=ef(e);return t.trigger?.index??t.statements[0]?.index??0},eb=e=>{let t=new Map;e.trigger&&t.set(e.trigger.index,e.trigger);let n=e=>{switch(t.set(e.index,e),e.type){case"BlockStatement":e.children.forEach(n);break;case"ForStatement":n(e.body);break;case"IfStatement":n(e.ifTrue),n(e.ifFalse)}return t};return e.statements.forEach(n),t},ex=e=>{let t=new Map;return(0,m.bZ)(e,{visitFunctionCallStatement:e=>(t.set(e.varName,e),!0)}),t},eE=e=>{let t=(e,n)=>{switch(n.type){case"BlockStatement":return n.children.reduce(t,e);case"ForStatement":return t(e,n.body);case"IfStatement":return t(e,n[n.currentBranch]);case"FunctionCallStatement":return n.index}};return e.statements.reduce(t,0)},ev=(e,t)=>{let n=e.history.map((n,a)=>a===e.activeIndex?{...n,ast:{...n.ast,...t(n.ast)}}:n);if(!(n.length>0))throw Error("History should never be empty");return{...e,history:n}},eC=(e,t)=>{let n=e.history[e.activeIndex];if(!n)throw Error("Current ast should never be empty");let a={...n.ast,...t(n.ast)},r=e.history.filter((t,n)=>n>=e.activeIndex).slice(0,20),i=[{ast:a,generatedPlaybook:a,prompt:tO(a)},...r];if(!(i.length>0))throw Error("History should never be empty");return{...e,history:i,activeIndex:0}},eS=(e,t)=>ev(e,e=>({statements:e.statements.map(e=>tE(e,t)),trigger:e.trigger?tE(e.trigger,t):null})),ek=(e,t)=>({...e,statements:e.statements.map(e=>tE(e,t)),trigger:e.trigger?tE(e.trigger,t):null}),ew=(e,t)=>ev(e,e=>{let{statements:n}=e;return{statements:n.map(e=>tx(e,t))}}),eA=(e,t,n)=>(n?eC:ev)(e,e=>({statements:e.statements.map(e=>tb(e,t)),trigger:e.trigger?tb(e.trigger,t):null})),eI=(e,t)=>{let n=eb(t),a=ex(t),i=(0,m.Co)(e,{transformForStatement:e=>{let t=n.get(e.index);return t&&"ForStatement"===t.type?{...e,expanded:t.expanded}:e},transformIfStatement:e=>{let t=n.get(e.index);return t&&"IfStatement"===t.type&&t.currentBranch!==e.currentBranch?{...e,currentBranch:t.currentBranch,expanded:t.expanded}:e},transformFunctionCallStatement:e=>{let t=a.get(e.varName);if(!t||"FunctionCallStatement"!==t.type)return e;let n={...e,currentRequest:t.currentRequest,entry:t.entry,expanded:t.expanded,selectedTab:t.selectedTab,suggestions:t.suggestions,isGroupCardOpen:t.isGroupCardOpen,status:t.status,columnData:t.columnData};return r()(t,n)?t:n}});return r()(i.errors,t.errors)&&(i.errors=t.errors),r()(i.warnings,t.warnings)&&(i.warnings=t.warnings),r()(i.args,t.args)&&(i.args=t.args),r()(i.plugins,t.plugins)&&(i.plugins=t.plugins),i.args=i.args.map(e=>t.args.find(t=>t.name===e.name)?{...e}:e),i},eP=(e,t)=>{let n=tm(e),a=e7(n),r=ef(t);return{...t,history:[{ast:eI(n,r),prompt:tO(n),generatedPlaybook:e}],origin:{...t.origin,initPlaybook:n,lastDescribedPlaybook:a?e:null}}},e$=(e,t,n)=>{let a=tm(e);return n?eC(t,e=>eI(a,e)):ev(t,e=>eI(a,e))},eT=(e,t,n)=>{let a=n.map(e=>e.name),r=t,i=f.L(e),l=1;for(;a.includes(i);)r=`${t} ${l}`,i=`${e}_${l}`,l++;return{name:i,label:r}},eF=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.every(e=>0===e.facets.length)},eR=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>h.J.is(e.facets))},eM=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>b.h.is(e.facets))},eO=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>x.bE.is(e.facets))},e_=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(!eF(e))return e.find(e=>x.bE.is(e.facets))},eN=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>u.g.is(e.facets))},eB=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>E.D.is(e.facets))},eD=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>v.Z.is(e.facets))},eH=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.find(e=>v.Z.is(e.facets));if(!t)return;let n=v.z.decode(t.config);if(n.ok)return n.value},ez=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.find(e=>E.D.is(e.facets));if(!t)return;let n=E.X.decode(t.config);if(n.ok)return n.value},eL=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>C.Lc.is(e.facets))},eU=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>S.G.is(e.facets))},eV=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return!eF(e)&&e.some(e=>k.N.is(e.facets))},eq=e=>{let t=el(e.signature),n=e.signature.some(e=>u.g.isExact(e.facets)),a=e.signature.some(e=>k.N.is(e.facets));return t&&!n&&!a},ej=(e,t,n,a)=>{let{label:r,name:i}=eT(e,a?.label||(0,w.xJ)(e),t);return{type:"VarRefExpression",name:i,typeHint:n||{signature:[],typeLabel:"Special"},validationStatus:[],referenceType:"argument",displayHint:{label:r,description:a?.description??"",icon:"TexturedAskMeEverytime"}}},eW=e=>{let t=new Set;(0,m.bZ)(e,{visitVarRefExpression:e=>(t.add(e.name),!0),visitFieldRemappingExpression:e=>(t.add(e.accordingTo),!0)});let n=e.args.filter(e=>t.has(e.name));return n.length!==e.args.length?{...e,args:n}:e},eG=(e,t)=>ev(e,e=>({...e,args:e.args.map(t)})),eY=e=>{let t=eW(ef(e));return ev(e,()=>t)},eQ=e=>{let t=ef(e),n=new Set(eo(t).map(e=>{let{plugin:t}=e;return t})),a=t.plugins.filter(e=>n.has(e.alias));return ev(e,()=>({...t,plugins:a}))};function eJ(e,t){return ev(e,e=>({args:e.args.map(e=>e.name===t.name?t:{...e,requiredByOtherCommand:!1})}))}let eZ=e=>{switch(e.type){case"disconnected":return`${e.plugin.name} needs to be connected`;case"internal":return"An internal error has occurred";case"invalid":return e.error.message;case"missing":case"unsupported":case"deprecated":return(0,Y.u)(e.error)}};function eX(e){let t;return(0,m.Cw)(e,{visitExpression:e=>!(t=e.validationStatus?.find(e1))}),t||null}function eK(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=[],a=(e,t,a,r)=>{e1(e)&&n.push({argumentName:t,argumentLabel:a,statementIndex:r.index,status:e,...A.NM(r)})};return(0,m.b)(e,{visitFunctionCallStatement:n=>{if(!t&&n.index!==e.index)return!1;let r=!1;if((0,m.b)(n,{visitFunctionArgument:e=>{let t=e.validationStatus?.find(e1)??null;t&&(a(t,e.name,e.displayHint?.label,n),r=!0);let i=e.value?eX(e.value):null;return i&&(a(i,e.name,e.displayHint?.label,n),r=!0),!0}}),!r)for(let e of n.validationStatus?.filter(e1)??[])a(e,null,void 0,n);return!0},visitIfStatement:n=>{let{conditionExpr:r,index:i}=n;if(!t&&i!==e.index)return!1;let l=eX(r);return l&&a(l,"conditionExpr","Condition",n),!0},visitForStatement:n=>{let{iterable:r,index:i}=n;if(!t&&i!==e.index)return!1;let l=eX(r);return l&&a(l,"iterable","List",n),!0}}),n}function e0(e){return`${eZ(e.status)} in "${e.argumentLabel||e.argumentName}"`}let e1=e=>"error"===A.oN(e)&&"disconnected"!==e.type,e2=(e,t)=>{let n=ep(e,t,!1).map(e=>e.index);return ek(e,e=>n.includes(e.index)?e:{...e,status:"idle",entry:null,tableEntry:null})},e4=(e,t)=>ek(e,e=>t.includes(e.index)?{...e,status:"idle",columnData:{status:"invalid"}}:e),e3=e=>{if(!e)return[];let t=[];return(0,m.Cw)(e,{visitVarRefExpression:e=>(t.push(e),!0)}),t},e6=(e,t)=>{let n=null;return(0,m.bZ)(t,{visitFunctionCallStatement:t=>t.varName!==e||(n=t,!1),visitIfStatement:t=>t.varName!==e||(n=t,!1),visitForStatement:t=>t.varName!==e||(n=t,!1)}),n},e8=e=>{let t=new Map;return(0,m.bZ)(e,{visitFunctionCallStatement:e=>(t.set(e.varName,e),!0)}),t},e5=e=>{let t=[];return(0,m.bZ)(e,{visitFunctionCallStatement:e=>("Scraper"===e.plugin&&("use_combined_scaper_model_on_active_tab"===e.name||"use_combined_scaper_model_in_background"===e.name)&&t.push(e),!0)}),t},e7=e=>{let t=!1,n=!1;return(0,m.bZ)(e,{visitStatement:e=>(n=!0,!e.comment||(t=!0,!1))}),!n||t},e9=(e,t)=>{if("use_combined_scaper_model_on_active_tab"===e.name)return!0;if("use_combined_scaper_model_in_background"===e.name){let n=e.args.find(e=>"url"===e.name);for(let e of e3(n?.value||null)){let n=e6(e.name,t);if(n&&"FunctionCallStatement"===n.type&&"get_current_page_url"===n.name)return!0}}return!1},te=e=>{let t=e5(e);return t?.some(t=>e9(t,e))??!1},tt=async(e,t)=>{let n=new Set;for(let a of((0,m.bZ)(t,{visitFunctionCallStatement:e=>{if("Scraper"===e.plugin&&"use_combined_scaper_model_on_active_tab"===e.name){let t=e.args.find(e=>"model"===e.name);if(t?.value?.type==="ObjectStorageReferenceExpression"){let e=t.value.ref;e&&n.add(e.uri)}}return!0}}),n)){let{id:t,tag:n}=(0,I.RY)(a),r=await e.objectStorageGetResource("scraper_model",t,n);if(r&&"version"in r&&2===r.version&&!(0,G.mC)(r.operations)&&(0,G.Vh)(r.operations))return!0}return!1},tn=e=>(e5(e)?.filter(t=>e9(t,e))??[]).map(e=>e.args.find(ta)?.value.ref).filter(P.zz);function ta(e){return e.value?.type==="ObjectStorageReferenceExpression"&&"model"===e.name}let tr=$.D.object({editable:$.D.optional($.D.boolean,!1),schema:$.D.optional($.D.object({fields:$.D.array("TabularData Fields",$.D.object({name:$.D.string,type:T.pU,title:$.D.string,struct:$.D.optional(F.M)})).transform(e=>e.filter(e=>e.name))})),schemaType:$.D.optional(T.pU),sourceName:$.D.optional($.D.string),sourceIcon:$.D.optional(R.q$)});function ti(e){return e.length>0&&e.every(e=>{if(!(h.J.is(e.facets)||M.Y.is(e.facets)))return!1;let t=tr.value(e.config);return!t||!t.schema})}function tl(e){return/^__mapping[0-9]+$/.test(e)}let to=e=>{let t=eE(e);return ep(e,t,!0).filter(e=>"FunctionCallStatement"===e.type).every(e=>e.entry)},ts=e=>e?.type==="IfStatement",tc=e=>e?.type==="ForStatement";function td(e){if("string"!=typeof e)return e;switch(e){case"boolean":return{facets:p.X9(O.l)};case"date":return{facets:p.X9(x.bE)};case"number":return{facets:p.X9(_.c)};case"string":return{facets:p.X9(u.g)};case"url":return{facets:p.X9(k.N)};case"email":return{facets:p.X9(c.p)};case"phone":return{facets:p.X9(d.F)};default:return{facets:p.X9(N.Y)}}}let tu=()=>({args:[],comment:null,statements:[],trigger:null,plugins:[],errors:[],warnings:[],triggerState:null,meta:{name:Z,description:"",categories:[],commands:[],id:(0,o.A)(),revision:0,author:{avatar:"",name:""},timeCreated:Date.now(),timeModified:Date.now(),creationMode:"blank"},flags:{seen_howtorun:!1},permissions:{owner:!0,write:!0,delete:!0,move:!0,share:!0,edit:!0,results:!0,reown:!0,cow:null},visibilities:["owned"]}),tp=e=>{let t=ed(e);return(0,m.Co)(e,{transformFunctionCallStatement:e=>(function(e,t){if(!e.conditionalExecution)return null;let n={args:e.args,comment:e.comment,commentFlags:e.commentFlags,index:e.index,name:e.name,output:e.output,plugin:e.plugin,type:e.type,varName:e.varName,hasResults:e.hasResults,columns:e.columns};return V.qD(e.conditionalExecution,n,t)})(e,()=>++t)||{args:e.args,comment:e.comment,commentFlags:e.commentFlags,index:e.index,name:e.name,output:e.output,plugin:e.plugin,type:e.type,varName:e.varName,hasResults:e.hasResults,columns:e.columns}})},tm=e=>{let t=-1,n=e.trigger?th(e.trigger,0):null,a=e.args.map(t=>{let n=e.args.filter(e=>e.usedInMapping.includes(t.name)),a=n[0]?.save,r=[],i=!1,l=!1,o=null;return(0,m.bZ)(e,{visitStatement:e=>(o=e,!0),visitIfStatement:e=>((0,m.Cw)(e.conditionExpr,{visitVarRefExpression:n=>(n.name===t.name&&r.push({index:e.index,argName:"CompareAgainst",argLabel:"Compare Against",...A.NM(e)}),!0)}),!0),visitFunctionArgument(e){l=t.struct===F.u.Array;let n=e.value?.type==="ObjectLiteralExpression";return(0,m.Cw)(e.value,{visitObjectLiteralExpression:e=>(e.fields.forEach(e=>{"VarRefExpression"===e.value.type&&e.value.name===t.name&&e.struct===F.u.Array&&(l=!0)}),!0),visitVarRefExpression:a=>(a.name===t.name&&o&&r.push({index:o.index,argName:e.name,argLabel:e.displayHint?.label??e.name,...A.NM(o)}),a.name===t.name&&e.displayHint?.required&&!n&&(i=!0),!0)}),!0}}),{...t,implicitSave:a??null,required:i||t.required,requiredByOtherCommand:i,restricted:!1,usedAsMultipleValueArgument:l,usedInStatementArg:r}}),r=t2(e.statements,a),i={number:1},l={...e,args:a.map(e=>({...e,restricted:!!r[e.name]})),statements:e.statements.map((e,n)=>{let a=th(e,n,i,t);return e.comment&&t++,a}),trigger:n?.type==="FunctionCallStatement"?{...n,isTrigger:!0}:n,errors:A.ul(e),warnings:A._c(e)},o=l.args.map(e=>e.name),s=e8(l);return(0,m.Co)(l,{transformVarRefExpression:e=>{let t=s.get(e.name);if("condition"===e.referenceType){let t=e6(e.name,l);if(ts(t))return{...e,displayHint:{...e.displayHint,label:`Condition ${t.actionNumber}`,icon:e.displayHint?.icon??"TexturedPreviousActions",description:e.displayHint?.description??"Condition"}}}if("loop"===e.referenceType){let t=e6(e.name,l);if(tc(t))return{...e,displayHint:{...e.displayHint,label:`Loop ${t.actionNumber}`,icon:e.displayHint?.icon??"TexturedPreviousActions",description:e.displayHint?.description??"Condition"}}}return t&&e.displayHint?{...e,displayHint:{...e.displayHint,label:tg(t)}}:o.includes(e.name)&&e.displayHint?{...e,displayHint:{...e.displayHint,icon:"TexturedAskMeEverytime"}}:e}})},tg=e=>{switch(e.type){case"FunctionCallStatement":{if(e.isTrigger)return"Trigger";let t=(0,w.ZH)(e.comment??e.displayHint?.command.expressions[0]??"")||e.name;return`Action ${e.actionNumber}  (${t})`}case"IfStatement":return`Condition ${e.actionNumber}`;case"ForStatement":return`Loop ${e.actionNumber}`;default:return""}},ty=e=>"FunctionCallStatement"===e.type?`All columns of ${tg(e)}`:tg(e),tf=e=>{switch(e.type){case"BlockStatement":return e.children.length>0;case"FunctionCallStatement":return!0;case"IfStatement":return tf(e.ifTrue)||tf(e.ifFalse);case"ForStatement":return tf(e.body);default:return!1}},th=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{number:0},a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1;switch(e.type){case"IfStatement":{let r=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{number:0},a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,r=V.x_(e);if(!r)return null;let i=th(r.wrappedStmt,t,n,a);return"FunctionCallStatement"!==i.type?null:{...i,conditionalExecution:"OpCombination"===r.condition.type?r.condition:{type:"OpCombination",args:[r.condition],combine:"&&"}}}(e,t,n,a);if(r)return r;let i=n.number++,l=tf(e.ifTrue),o=tf(e.ifFalse);return{...e,actionNumber:i,currentBranch:l||!o?"ifTrue":"ifFalse",expanded:!0,ifTrue:th(e.ifTrue,0,n,a),ifFalse:th(e.ifFalse,0,n,a)}}case"ForStatement":{let r=n.number++;return{...e,actionNumber:r,expanded:!0,body:th(e.body,t,n,a)}}case"BlockStatement":let r=a+1;return{...e,children:e.children.map((e,t)=>{let a=th(e,t,n,r);return e.comment&&r++,a})};case"FunctionCallStatement":return tv(e,n.number++,a)}},tb=(e,t)=>{switch(e.type){case"IfStatement":let n=tb(e.ifTrue,t),a=tb(e.ifFalse,t);return t({...e,ifTrue:n,ifFalse:a});case"ForStatement":return t({...e,body:tb(e.body,t)});case"BlockStatement":return t({...e,children:e.children.map(e=>tb(e,t))});case"FunctionCallStatement":return t(e)}},tx=(e,t)=>tb(e,e=>"IfStatement"===e.type?t(e):e),tE=(e,t)=>tb(e,e=>"FunctionCallStatement"===e.type?t(e):e);function tv(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return{...e,currentRequest:null,suggestions:B.j.NotAsked,expanded:"expanded"in e&&!!e.expanded,selectedTab:e.args.length>0?"Customize":"Preview",entry:null,columnData:{status:"invalid"},status:"idle",progress:0,progressText:"",actionNumber:t,isTrigger:!1,addonState:{inputFlowState:null,categorizerData:{},confirm:null,loading:!1,categorizerTarget:"",categorizerBucket:null,categorizerQuestions:null,inlineWritingAssistant:null},validationError:eK(e)[0]??null,groupIndex:n,isGroupCardOpen:!1,conditionalExecution:null}}function tC(e){if(!e)return"";switch(e.type){case"ObjectLiteralExpression":return"Table";case"ArrayLiteralExpression":return e.elements.map(tC).join(", ");case"CastExpression":case"FieldRemappingExpression":return tC(e.expression);case"StringTemplatingExpression":return e.children.map(tC).join(" ");case"StringTemplatingTextNode":return e.text;case"StringTemplatingVariableNode":return`[${tC(e.value)}]`;case"StringTemplatingGenerateNode":return`[${tC(e.prompt)}]`;case"StringTemplatingEmbedNode":return"img"===e.element?"[image]":"";case"StringTemplatingBlockFormattingNode":case"StringTemplatingInlineFormattingNode":return e.children.map(tC).join("");case"FieldAccessExpression":return`${tC(e.expression)}.${e.displayHint?.label||e.field}`;case"OperatorExpression":if("error"===e.op&&e.args[0])return`${tC(e.args[0])}.Error`;return e.displayHint?.label||"";default:return e.displayHint?.label||""}}function tS(e){for(let t of e.signature){if(p.is(t.facets,p.X9(k.N)))return"url";let e=function(e){if(p.u0(e.facets,p.X9(u.g)))return u.i.value(e.config)}(t);if(e&&e.mimeType){if("text/plain"===e.mimeType)return"plain";if("text/html"===e.mimeType||"text/markdown"===e.mimeType)return"html";if("application/json"===e.mimeType)return"json"}}return null}function tk(e,t){switch(e.type){case"StringTemplatingExpression":return e;case"ConstantValueExpression":{let n=u.g.deserialize(e.value,new D.SP);if(!n.ok)return{type:"StringTemplatingExpression",children:[tL([tU("")])],mimeType:null,typeHint:J.Tg};{let e;H.hR(n.value,u.g);let a=n.value.toString();return e="text/html"===n.value.mimeType?"html":tS(t),{type:"StringTemplatingExpression",children:[tL([tU(a)])],mimeType:e,typeHint:J.Tg}}}default:return{type:"StringTemplatingExpression",children:[tL([tV(e)])],mimeType:null}}}let tw=(e,t)=>{let n=new Map;e.args.forEach(e=>{n.set(e.name,e)});let a=t.flatMap(e=>{let t=n.get(e);return t?[t.name,...t.usedInMapping]:[]});return{...e,args:e.args.map(e=>a.includes(e.name)?{...e,value:null}:e)}},tA=(e,t)=>e.length>t?e.slice(0,t)+"...":e;function tI(e,t,n){return{_id:`blob.artifact=${e}`,_types:["blob.artifact","wcontext","blob","indexable","object"],_integration:{factoryId:"075c62a7-9e2f-478e-b0c6-d5fe981914bc",instanceId:"075c62a7-9e2f-478e-b0c6-d5fe981914bc-sgt",name:"Utilities",version:"1.0.0"},name:t,mimeType:n,uploadedAt:Date.now()}}let tP=e=>ef(e).fromSnapshot?.snapshotId!==void 0,t$=e=>tP(e)&&!ef(e).fromSnapshot?.isLatestRevision,tT=(e,t)=>{let n=(e,n)=>{let a={...e[n]},r=null;return a=(0,m.GY)(a,{transformIfStatement:e=>tT(e,t)})||a,(0,m.b)(a,{visitFunctionCallStatement:e=>e.index!==t||(r=n,!1)}),{[n]:a,...r?{currentBranch:r,expanded:!0}:{}}};return{...e,...n(e,"ifTrue"),...n(e,"ifFalse")}},tF=(e,t)=>{let n=new Set;(0,m.bZ)(ef(e),{visitFunctionCallStatement:e=>(e.index===t&&n.add(e.groupIndex),!0)});let a=e=>{let n=!1;return(0,m.b)(e.body,{visitFunctionCallStatement:e=>e.index!==t||(n=!0,!1)}),n};return{...ev(e,e=>(0,m.Co)(e,{transformIfStatement:e=>tT(e,t),transformForStatement:e=>a(e)?{...e,expanded:!0}:e,transformFunctionCallStatement:e=>n.has(e.groupIndex)?{...e,isGroupCardOpen:!0}:e}))}},tR=(e,t)=>{let n=(0,z.W7)(e);if("obs"===n.provider){let{type:e,id:a}=(0,I.RY)(n.ref.uri);n.ref.uri=`${e}/${a}/:${t}`}return(0,z.tb)(n)},tM=e=>{if("obs"===e.provider||"synth"===e.provider){let{id:t}=(0,I.RY)(e.ref.uri);return t}},tO=e=>e?e.meta.name:"Start from blank canvas";function t_(e,t){return[...e.map(e=>{let n=t.find(t=>t.title===e.title);return n?{...n,typeHint:n.typeHint&&e.typeHint?{...n.typeHint,signature:[...n.typeHint.signature,...e.typeHint.signature]}:void 0}:e}),...t.filter(t=>!e.find(e=>e.title===t.title))]}function tN(e,t){let n=e.findIndex(e=>e.title===t.title);return -1===n?[...e,t]:e.map((e,a)=>a===n?t:e)}function tB(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return e.map(e=>{let n=function(e){if("string"!=typeof e)return{tag:L.E.Simple,signature:[e],typeIcon:"PencilOutline",typeLabel:"Custom"};{let t=J.IJ[e];return{tag:L.E.Simple,signature:[{facets:t?.facets??[]}],typeIcon:t?.icon,typeLabel:t?.label??""}}}(e.type||t);return{name:e.name,title:e.title,struct:e.struct||F.u.Scalar,typeHint:n,validationStatus:[],value:e.struct===F.u.Array?(0,J.SS)(n):{...(0,J.$O)(n),displayHint:{label:"",description:"",icon:n.typeIcon}}}})}let tD=(e,t,n)=>eS(e,e=>{if(e.index!==t||!(0,J.gB)(e.entry))return e;let a=n(e.entry);return{...e,entry:a}}),tH=e=>eS(e,e=>"loading"===e.status?{...e,status:"idle"}:e),tz=(e,t)=>eS(e,e=>e.displayHint?.command.commandType===U.g.WHEN?{...e,status:"error",error:t.message,selectedTab:"Preview",expanded:!0,entry:{type:"result",fullScreenTab:null,rowBodyState:null,selectedGroup:{},result:{type:"error",error:t}}}:e);function tL(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:e,validationStatus:[],...t}}function tU(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingTextNode",text:e,format:{},validationStatus:[],...t}}function tV(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"StringTemplatingVariableNode",value:e,join:null,defaultValue:null,format:{},validationStatus:[],...t}}let tq=(e,t)=>{if(e.statements.some(e=>e.index===t))return e.statements;let n=[];return(0,m.bZ)(e,{visitBlockStatement:e=>!e.children.some(e=>e.index===t)||(n=e.children,!1)}),n},tj=(e,t)=>{let n=tq(e,t),a=n.findIndex(e=>e.index===t);if(-1===a)throw Error(`Index ${t} not found in playbook`);return n.slice(a+1)},tW=(e,t,n)=>{if("stay"===n)return e;let a=tj(e,t.index);if(0===a.length)return e;let r=a.map(e=>e.index);return(0,m.Co)(e,{transformForStatement:e=>r.includes(e.index)?null:e,transformFunctionCallStatement:e=>r.includes(e.index)?null:e,transformBlockStatement:e=>r.includes(e.index)?null:e,transformIfStatement(e){if(e.index===t.index){let r={type:"BlockStatement",children:a,index:e.index,output:e.output,comment:e.comment,commentFlags:e.commentFlags};switch(n){case"ifTrue":return{...t,ifTrue:r};case"ifFalse":return{...t,ifFalse:r};case"both":return{...t,ifTrue:r,ifFalse:r}}}return r.includes(e.index)?null:e}})};function tG(e){return(e.partitionExpr?e.partitionExpr:"OperatorExpression"===e.conditionExpr.type&&e.conditionExpr.args[0]?e.conditionExpr.args[0]:e.conditionExpr).typeHint||J.QJ}function tY(e){return e.iterable.typeHint||J.QJ}let tQ=(e,t)=>t?F.u.Array:e?.struct==="array"?F.u.Scalar:e?.struct||F.u.Scalar,tJ=e=>{let t=Array.from(ec(e).values()).filter(e=>"entry"in e);return t.length===(e.trigger?1:0)||t.every(e=>(0,J.gB)(e.entry)&&"success"===e.entry.result.type&&!t4(e.entry.result.breakdown))},tZ=e=>Array.from(ec(e).values()).filter(e=>(0,J.Ec)(e)).some(e=>"valid"===e.columnData.status&&e.columnData.columns.length>0),tX=(e,t)=>{let n=[],a=new Set,r=new Map,i=new Map;return(0,m.bZ)(e,{visitFunctionCallStatement(e){let l=e.comment||e.displayHint?.command.expressions[0]||e.name,o=e.columns.map(e=>e.id);t.includes(e.index)&&e.varName&&(a.add(e.varName),r.set(e.varName,{type:"FunctionCallStatement",displayName:l}));let s=t=>{let a=i.get(e.index);if(a)a.argumentNames.includes(t.name)||a.argumentNames.push(t.name);else{let a={statementIndex:e.index,actionNumber:e.actionNumber,argumentNames:[t.name],displayName:l,icon:e.displayHint?.plugin.icon||"ObjectOutline"};n.push(a),i.set(e.index,a)}};return e.args.forEach(e=>{e.value&&(0,m.Cw)(e.value,{visitVarRefExpression:t=>(a.has(t.name)&&r.get(t.name)&&s(e),!0),visitTableColumnReferenceExpression:t=>(o.includes(t.id)&&s(e),!0)})}),!0},visitIfStatement(e){let l=e.comment||`Condition ${e.actionNumber}`;return t.includes(e.index)&&e.varName&&(a.add(e.varName),r.set(e.varName,{type:"IfStatement",displayName:l})),(0,m.Cw)(e.conditionExpr,{visitVarRefExpression(t){if(a.has(t.name)&&r.get(t.name)&&!i.get(e.index)){let t={statementIndex:e.index,actionNumber:e.actionNumber,argumentNames:[],displayName:l,icon:"ConditionalBold"};n.push(t),i.set(e.index,t)}return!0}}),!0},visitForStatement(e){let l=e.comment||`Loop ${e.actionNumber}`;return t.includes(e.index)&&e.varName&&(a.add(e.varName),r.set(e.varName,{type:"ForStatement",displayName:l})),(0,m.Cw)(e.iterable,{visitVarRefExpression(t){if(a.has(t.name)&&r.get(t.name)&&!i.get(e.index)){let t={statementIndex:e.index,actionNumber:e.actionNumber,argumentNames:[],displayName:l,icon:"LoopOutline"};n.push(t),i.set(e.index,t)}return!0}}),!0}}),n},tK=(e,t)=>e.map(e=>({index:e.index,actionNumber:e.actionNumber,displayName:t0(e,t),icon:e.displayHint?.plugin.icon||"ObjectOutline"})),t0=(e,t)=>{let n=t.some(t=>Array.isArray(t)&&t.includes(e)),a=e.comment||e.displayHint?.command.expressions[0]||e.name;return n&&!e.commentFlags?.keep&&(a=(0,w.ZH)(e.displayHint?.command.expressions[0]??"")),a},t1=e=>{let t=[],n=null,a=()=>{n&&(n.length>1&&n.some(e=>null!==e.comment)?t.push(n):(0,y.tM)(t,n),n=null)};for(let r of e)"groupIndex"in r?(n&&n[0].groupIndex!==r.groupIndex&&a(),n?n.push(r):n=[r]):(a(),t.push(r));return a(),t},t2=(e,t)=>{let n={};for(let a of t){let t=(0,Q.l)(a,e);n[a.name]=t}return n},t4=e=>0===e.c_good&&e.c_error>0,t3=e=>{let t=[];return((0,m.Cw)(e.value,{visitExpression:e=>(e.validationStatus?.length&&(t=[...t,...e.validationStatus]),!0)}),t.length>0)?t:null},t6=e=>{let{sequencingStatus:t,loadingStatus:n}=e;return!J.py.isIdle(t)||null!==n};function t8(e,t,n,a,i,l){let o=e[t];o||(o={columns:{}});let s=o.columns[n];s||(s={values:[],limit:l});let c=!1;return s={limit:l,values:s.values.map(e=>r()(e.graphPath,a)?(c=!0,{...e,value:i}):e)},c||(s={...s,values:[...s.values,{graphPath:a,value:i}]}),o={...o,columns:{...o.columns,[n]:s}},{...e,[t]:o}}let t5={restoring:"Restoring",updating:"Updating",saving:"Saving",tidying:"Tidying","opening-snapshot":"Opening snapshot",preparing:"Preparing","switching-to-latest-version":"Switching to latest version","playbook-running":"Playbook running","autobook-activating":"Activating",renaming:"Renaming",pausing:"Pausing"},t7=e=>{let{sequencingStatus:t,loadingStatus:n}=e;return n&&t5[n]?t5[n]:J.py.isPausing(t)?"Pausing...":null};function t9(e,t,n,a){let r=[];(0,m.bZ)(e,{visitFunctionCallStatement(e){for(let t of e.columns)r.push(t.title);return!0}});let i=/(.*)\([0-9]+\)$/,l=e=>{if(!r.includes(e))return e;let t=e,n=i.exec(e);n&&(t=n[1]?.trim()??e);let a=r.filter(e=>e.startsWith(`${t} (`)),l=1;for(let e of a){let t=(e??"").trim().split("("),n=Number(t[t.length-1]?.replace(")",""));isNaN(n)||(l=Math.max(l,n))}return`${t} (${l+1})`};return t.map(e=>({...e,id:e.id.replace(n,a),title:l(e.title)}))}function ne(e,t){let n=null;return(0,m.bZ)(e,{visitFunctionCallStatement(e){for(let a of e.columns)if(a.id===t)return n=a,!1;return!0}}),n}let nt=(e,t)=>q.UR(e)||t.trigger?.index===e.index,nn=function(e,t){let n=!(arguments.length>2)||void 0===arguments[2]||arguments[2],a=!1,r=0,i=[];return(0,m.bZ)(t,{visitFunctionCallStatement(l){if(l.isTrigger)return!0;r++;let o=l.index===e.index,{statementName:s,statementIcon:c}=A.NM(l);return"valid"===l.columnData.status&&0!==l.columnData.columns.length&&(o&&n||a&&!nt(l,t))&&i.push({text:`${r}. ${s}`,icon:c,statementIndex:l.index}),a=a||o,!0}}),i},na=(e,t)=>{if(!t)return e;let n=j.KE.commands.find(t=>t.commandId===e.name);if(!n)return e;let a=e.args.map(e=>{let a=n.copyArgsOver.find(n=>t.name===n.importCommandId&&n.exportArgName===e.name);if(!a)return e;let r=t.args.find(e=>e.name===a.importArgName);return r?{...e,value:r.value}:e});return{...e,args:a}};function nr(e,t,n){let a=t.map(e=>[e,n(e)]),r=l().go(e,a,{threshold:0,all:!0,key:e=>{let[t,n]=e;return n}}).map(e=>e.obj[0]),i=t.filter(e=>!r.includes(e));return[...r,...i]}function ni(e,t){let n=e=>{let t=(0,W.cx)(e).toLowerCase().trim().replace("www.","");return t.endsWith("?")&&(t=t.slice(0,-1)),t.endsWith("/")&&(t=t.slice(0,-1)),t};return n(e)===n(t)}},61462:(e,t,n)=>{n.d(t,{k:()=>h,w:()=>b});var a=n(14041),r=n(46288),i=n(36213),l=n(72194),o=n(77956),s=n(51156),c=n(45742),d=n(85170),u=n(11778),p=n(48143),m=n(28926),g=n(66712),y=n(18016),f=n(54439);let h=e=>"ConstantValueExpression"===e.type||"VarRefExpression"===e.type||"BCLFragmentExpression"===e.type||"ObjectStorageReferenceExpression"===e.type||"MissingExpression"===e.type||"TableColumnReferenceExpression"===e.type,b=a.memo(e=>{let{expr:t,onChange:n,argContext:h,suffix:b,autoFocus:x,onOpenChanged:E,isPbArgument:v,parentIsArray:C,readonly:S}=e,{validationStatus:k=[]}=t,w=(0,g.k)(),{featureFlags:{v4MiniEnabled:A}}=(0,p.rD)(),I=k.filter(e=>"internal"!==e.type||"error"===e.severity).length>0,P=h.typeHint,$=(0,u.c)(),T=(0,p.jL)(),F=a.useCallback(e=>{if((0,c.Iw)(e))switch(e.displayHint?.label){case c.ie:{let e=document.createElement("input");e.type="file",e.onchange=async e=>{let t=e.target;if(!(t instanceof HTMLInputElement))return;let a=t.files?.[0];if(a)try{let e=(0,r.A)(),t=a.type||"application/octet-stream";if(!(await fetch(`https://blob.bardeen.ai/artifact/${e}`,{method:"PUT",body:a,headers:{"Content-Type":t}})).ok)throw Error("Failed to upload artifact");let i={type:"ConstantValueExpression",value:(0,d.OO)(e,a.name,t)};n(i)}catch(e){T({type:"App/ErrorNotified",bardeenError:i.sF.from(e).toJSON()})}},e.click();return}case c.Ij:{let e=(0,d.Dl)(h.argName,w.playbookArgs,h.typeHint,h.options?.fieldMappingMode?void 0:h.displayHint);w.onPlaybookArgCreate(e,h.displayHint,!1),n(e);return}case c.Vi:{let e=(0,d.sD)(h.typeHint),t=(0,c.dU)((0,d.rY)(h.typeHint)),a={type:"CastExpression",expression:t,typeHint:h.typeHint};n(e?a:t);return}case c.J9:return;case c.Jz:n((0,y.r)());return;case c.HA:n((0,c.SS)(h.typeHint));return;default:return}else(0,c.Fp)(e)?n(e.value):(0,c.Uc)(e)?n(e.value):n(e)},[h.argName,h.displayHint,h.options?.fieldMappingMode,h.typeHint,w,n,T]),R="ConstantValueExpression"===t.type&&typeof t.value,M=a.useCallback(e=>{n(null==e?null:{type:"ConstantValueExpression",value:e},R===typeof e)},[n,R]),O=a.useCallback(e=>h.fetchSuggestions(e,h.typeHint.signature),[h]),_=a.useCallback(e=>{E?.(e),e?(h.fetchSuggestions("",h.typeHint.signature),h.fetchPreviousActions()):h.resetSuggestions()},[h,E]),N=a.useCallback(e=>h.fetchSuggestions(e,h.typeHint.signature,{forceRefreshCache:!0}),[h]),B=a.useCallback(()=>n(null),[n]),D=a.useCallback(e=>{e.stopPropagation(),n(null)},[n]),H=a.useCallback(e=>{T({type:"App/ErrorNotified",bardeenError:e})},[T]);if(!$)return null;let z=a.createElement(s.t,{autoFocus:x,value:"ConstantValueExpression"===t.type?t.value:null,excludeGetFromPreviousActions:h.options?.excludeGetFromPreviousActions,excludeAskMeEveryTime:h.options?.excludeAskMeEveryTime,fieldMappingMode:h.options?.fieldMappingMode,excludeStringTemplating:h.options?.excludeStringTemplating,excludeFieldMapping:h.options?.excludeFieldMapping,excludeUploadFile:h.options?.excludeUploadFile,onQueryChange:O,onOpenChanged:_,onRefresh:N,onSelect:F,suggestions:h.suggestions,signature:h.typeHint.signature},a.createElement(o.T,{isPbArgument:v,"aria-label":`Select value for ${h.argName}`,expr:t,onClear:S?void 0:B,variant:I?"danger":"default",suffix:b,rightAddon:C?a.createElement(m.Jn,{variant:"flat",size:"m",icon:"CrossOutline",tooltipText:"Remove",onClick:D}):void 0})),L=(0,f.d)(P.signature),U=null;if(L){if(L.mode===l.c.UIAst){let e=L.Component;U="ConstantValueExpression"===t.type||"ObjectStorageReferenceExpression"===t.type?a.createElement(e,{value:t,onChange:n,api:$,onError:H,isMiniUI:A}):null}else{let e=L.Component;U="ConstantValueExpression"===t.type?a.createElement(e,{isMiniUI:A,value:t.value,onChange:M,displayHint:t.displayHint}):null}}return a.createElement(m.fI,{gap:16,center:!0,"data-testid":"value-picker",style:{width:"100%"}},L&&L.needsDropdown&&U?a.createElement(m.VP,{gap:8,style:{width:"100%"}},z,U):U||z)})},20220:(e,t,n)=>{n.d(t,{S:()=>y});var a=n(69670),r=n(14041),i=n(36884),l=n(13489),o=n(70),s=n(44242),c=n(41917),d=n(49861),u=n(72865),p=n(48143),m=n(28926),g=n(20120);let y=r.memo(e=>{let{suggestions:t,value:n,onSelect:y,onRefresh:f,children:h,signature:b,onFetchSuggestion:x,isSelectedFn:E,inlineActions:v}=e,[C,S]=(0,r.useState)(""),[k,w]=(0,r.useState)(!1),A=!C&&(0,u.LO)(b),I=(0,r.useRef)(null),P=i.j.isLoading(t),$=P&&!A,T=(0,u.pp)(n),F=(0,p.rD)(),R=r.useMemo(()=>(v??[]).map((e,t)=>({type:"ConstantValueExpression",displayHint:{label:e.label,description:"",icon:e.icon},typeHint:{tag:l.E.Simple,signature:[],typeLabel:e.label},validationStatus:[],value:{$InlineAction:t},weight:-1e3+10*t})),[v]),M=r.useMemo(()=>i.j.isSuccess(t)?t.value:[],[t]),O=r.useMemo(()=>[...P?[]:R,...M],[P,R,M]),_=r.useCallback(e=>{if(function(e){return"value"in e&&"object"==typeof e.value&&null!==e.value&&"$InlineAction"in e.value}(e)){v?.[e.value.$InlineAction]?.onClick();return}y(e),w(!1)},[v,y]),N=!P&&0===O.length,{selectedIndex:B,handleKeyDown:D,containerRef:H}=(0,p.JZ)(O,_);(0,r.useEffect)(()=>{let e=I.current;if(e&&k)return e.addEventListener("keydown",D),()=>e.removeEventListener("keydown",D)},[D,k]);let z=r.useCallback(e=>{S(e),x(e)},[x]);return r.createElement(m.ms,{isOpen:k,onIsOpenChanged:e=>{w(e),S(""),e&&x("")},strategy:"fixed-scrollable",behavior:"over",autoCloseOnContentClick:!A,"aria-busy":P,height:A?554:360,style:{border:i.j.isErr(t)?`1px solid ${a.CCs}`:void 0},renderHeader:()=>r.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,paddingRight:6}},r.createElement(m.zZ,{ref:I,style:{flex:1},placeholder:"Type something...",addonAfter:P?r.createElement(m.y$,{color:a.NcT,size:"s"}):null,noClear:!0,value:A&&T instanceof Date?(0,o.eh)(T):C,onChange:z,addonBefore:null}),f?r.createElement(m.$n,{icon:"RefreshOutline",variant:"ghost",tooltipText:"Refresh the list",onClick:()=>f(C)}):null),renderContent:()=>r.createElement(r.Fragment,null,$&&r.createElement(m.IU,null,r.createElement(m.fI,{center:!0,gap:16},r.createElement(m.y$,{size:"s"}),"Loading...")),!i.j.isErr(t)&&N&&r.createElement(m.IU,{text:"No suggestions found"}),A?r.createElement(m.Vv,{allowPastDates:A!==s.CO.FUTURE,allowFutureDates:A!==s.CO.PAST,value:(0,u.pp)(n),onChange:e=>{_({type:"ConstantValueExpression",displayHint:{label:e.toISOString(),description:"Date"},typeHint:{tag:l.E.Simple,signature:[{facets:c.X9(s.bE)}],typeLabel:"Date"},validationStatus:[],value:s.bE.from(e).serialize(),weight:0})}}):r.createElement(g.C,{containerRef:H,list:O,selectedIndex:B,onSelect:_,renderRightAddon:e=>{let t="ObjectStorageReferenceExpression"===e.type?e.needsPaidFeatures:[],n=!d.fD(F.subscription,t);return E?.(e)?r.createElement(m.In,{size:20,icon:"CheckmarkOutline",color:a.XxH}):n?r.createElement(m.In,{size:20,icon:"StarGradient"}):null}}))},h)})},74112:(e,t,n)=>{n.d(t,{uA:()=>nq,Ur:()=>nU,Ff:()=>nV,dr:()=>n0,EG:()=>an,WA:()=>nZ});var a=n(67331),r=n(69670),i=n(88098),l=n(38792),o=n.n(l),s=n(14041),c=n(39716),d=n(21769),u=n(36884),p=n(45281),m=n(36213),g=n(49861),y=n(49908),f=n(99538),h=n(22001),b=n(84895),x=n(3756),E=n(86347),v=n(88389),C=n(14744),S=n(29190),k=n(91159),w=n(94303),A=n(58721),I=n(117),P=n(54538),$=n(48143),T=n(57972),F=n(5855),R=n(93510),M=n(11880),O=n(19431),_=n(10777),N=n(28926),B=n(48603),D=n(80389),H=n(47856),z=n(67469),L=n(12171),U=n(54734);let V=e=>{let{title:t,description:n,example:a,position:i,noHover:l,...o}=e,c=j(i);return s.createElement(W,{$noHover:l,$position:i,center:!0,gap:8,...o},s.createElement(G,null,t),n&&s.createElement(N.EY,{style:{textAlign:"center"}},n),a&&s.createElement(N.EY,{style:{textAlign:"center",fontStyle:"italic",marginTop:6},color:r.b_I,variant:"caption"},a),s.createElement(q,{$position:i,color:r.t14,icon:c,size:16}))},q=(0,c.Ay)(N.In)`
  position: absolute;
  top: ${e=>{let{$position:t}=e;return"top"===t?"unset":"55%"}};
  bottom: ${e=>{let{$position:t}=e;return"top"===t?"-32px":"unset"}};
  left: ${e=>{let{$position:t}=e;return"right"===t?"-32px":"unset"}};
  right: ${e=>{let{$position:t}=e;return"left"===t?"-32px":"unset"}};
`,j=e=>{switch(e){case"top":return"TexturedOnboardingArrowDown";case"bottom":return"TexturedOnboardingArrowUp";case"left":return"TexturedOnboardingArrowRight";case"right":return"TexturedOnboardingArrowLeft"}},W=(0,c.Ay)(N.VP)`
  pointer-events: none;
  opacity: ${e=>{let{$noHover:t}=e;return t?1:0}};
  z-index: ${e=>{let{$noHover:t}=e;return t?0:-1}};

  position: ${e=>{let{$noHover:t}=e;return t?"relative":"absolute"}};
  max-width: 300px;
  margin-bottom: 32px;

  transform: translate(
    ${e=>{let{$position:t,$noHover:n}=e;return n?"0":"left"===t?"-260px":"0px"}},
    ${e=>{let{$noHover:t}=e;return t?"0":"-45%"}}
  );

  transition: all 0.3s ease-in-out;
`,G=(0,c.Ay)(a.H2)`
  font-family: Caveat;
  font-weight: 700;
  text-align: center;
`,Y=s.memo(function(e){let{index:t,inside:n,dispatch:a}=e,r=`${t}:${n?"inside":"normal"}`,l=(0,i.fF)(),{isOver:o,setNodeRef:c}=(0,i.zM)({id:r});return s.createElement(Z,{"data-testid":"builder-add-actions",ref:c,"data-droppable":!0,"data-drop-active":o,$isOver:o,$isActive:!!l.active},s.createElement(X,null,s.createElement(J,{tooltipText:"Add Conditional",icon:"ConditionalBold",onClick:()=>a({type:"Conditional/CreateOpen",index:t,inside:n})})),s.createElement(X,null,s.createElement(J,{tooltipText:"Add Action",icon:"PlusOutline",onClick:()=>a({type:"AddCard/Started",index:t,inside:n})})),s.createElement(X,null,s.createElement(J,{tooltipText:"Add Loop",icon:"LoopOutline",onClick:()=>a({type:"LoopCard/CreateOpen",index:t,inside:n})})))}),Q=s.memo(function(e){let t;let{highlight:n,dispatch:a,disabled:r}=e,[l,o]=s.useState(!1),c=n&&!l,d=(0,i.fF)(),{isOver:u,setNodeRef:p}=(0,i.zM)({id:"firstcard"});return s.createElement(s.Fragment,null,n?s.createElement(V,{noHover:!0,position:"top",id:"start",title:"Add your first action here",style:{marginBottom:40,opacity:l?0:1}}):null,(t=s.createElement(Z,{"data-testid":"builder-add-actions",style:{gap:16},ref:p,"data-droppable":!0,"data-drop-active":u,$isOver:u,$isActive:!!d.active},s.createElement(X,{$position:"left",onOver:o},n?s.createElement(V,{id:"trigger",title:"Add a Trigger",description:"Runs your automation when something happens, or at a set time.",example:"E.g. When an email arrives.",position:"left"}):null,s.createElement(J,{title:"Add Trigger",icon:"LightningBold",onClick:()=>a({type:"AddCard/Trigger"})})),s.createElement(X,{$position:"right",onOver:o},n?s.createElement(V,{id:"action",title:"Add an Action",description:"Add another step to your automation.",example:"E.g. Send an email, or Find emails.",position:"right"}):null,s.createElement(J,{title:"Add Action",icon:"PlusOutline",onClick:()=>a({type:"AddCard/Started",index:-1,inside:!0}),pulse:c,autoFocus:n}))),n?t:s.createElement(U.W,{disabled:r},t)))}),J=s.memo(function(e){return s.createElement(N.$n,{"aria-label":e.title??e.tooltipText,tooltipText:e.tooltipText??"",icon:e.icon,round:!0,variant:"outlined",size:"l",onClick:e.onClick,pulse:e.pulse,autoFocus:e.autoFocus})}),Z=c.Ay.div`
  align-self: center;
  display: flex;
  transition: all 0.24s ease-in-out;
  padding: 8px;
  gap: 8px;

  ${e=>{let{$isOver:t,$isActive:n}=e;return n&&`
    background: ${r.o_k};
    outline: 2px ${t?"solid":"dashed"} ${r.IVJ};
    border-radius: 8px;
  `}}
`,X=s.memo(function(e){return s.createElement(K,{$position:e.$position??"left",onMouseEnter:()=>e.onOver?.(!0),onMouseLeave:()=>e.onOver?.(!1)},e.children)}),K=c.Ay.div`
  display: inline;

  &:hover {
    > ${W} {
      opacity: 1;
      z-index: 0;
      transform: ${e=>{let{$position:t}=e;return"left"===t?"translate(-360px, -45%)":"translate(100px, -45%)"}};
    }
  }
`;var ee=n(26572),et=n(77620),en=n(56);let ea=(0,c.Ay)(e=>s.createElement("svg",{width:20,height:12,viewBox:"0 0 20 12",xmlns:"http://www.w3.org/2000/svg",...e},s.createElement("circle",{cx:"10",cy:"1",r:"0.7",stroke:"transparent",fill:"var(--color)"}),s.createElement("line",{x1:"10",y1:"1",x2:"20",y2:"10"}),s.createElement("line",{x1:"10",y1:"1",x2:"0",y2:"10"}),s.createElement("line",{x1:"1.5",y1:"9.5",x2:"18.5",y2:"9.5",stroke:"white",strokeWidth:1}),s.createElement("line",{x1:"0",y1:"10.5",x2:"20",y2:"10.5",stroke:"white",strokeWidth:1})))`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -10px;
  --width: 16px;
  --color: ${r.NcT};
  --stroke-width: 1.4px;
  stroke: var(--color);
  stroke-width: var(--stroke-width);
  fill: var(--color);
`,er=s.memo(function(e){return s.createElement(en.Z,{style:ei,disabled:!1,className:"pseudo-hover",expanded:!0,Prefix:s.createElement(en.Z.Prefix,null),Suffix:s.createElement(en.Z.Suffix,null)},s.createElement(ea,null),e.children)}),ei={marginTop:16};var el=n(65069),eo=n(45742),es=n(85170),ec=n(42014),ed=n(1727),eu=n(62825),ep=n(58651);let em=(e,t)=>({type:"ForStatement",comment:t,commentFlags:{keep:!1},index:e,actionNumber:e,iterable:eo.mK,output:"compute",varName:`i${e}`,validationStatus:[],expanded:!0,body:{type:"BlockStatement",children:[],comment:null,commentFlags:{keep:!1},index:-2,output:"compute",validationStatus:[]}}),eg=(e,t)=>{switch(t.type){case"LoopCard/ChangeIterable":{let n=null===t.expr?eo.mK:t.expr,a={...e,statement:{...e.statement,iterable:n}};return[a,[function(e,t){return async n=>{let{api:a,dispatch:r}=n,i=(0,es.yO)((0,f.Co)(e.pb,{transformForStatement:n=>n.index===e.statement.index&&t?{...n,iterable:t}:n})),l={...e.statement},o=await a.playbookEditor2_UpdatePlaybookCommandArgumentValue((0,es.qO)(i),{}),s=(0,es.Vl)(o);(0,f.bZ)(s,{visitForStatement:t=>t.index!==e.statement.index||(l=t,!1)}),r({type:"LoopCard/Validated",statement:l,pb:s})}}(a,n)]]}case"LoopCard/Validated":return[{...e,statement:t.statement,pb:t.pb},[]]}},ey=e=>{let{dispatch:t,state:n,onSave:a,onClose:i}=e,l=(0,s.useRef)(null),o=(0,s.useRef)(null),c=(0,ec.Qz)(),d=s.useMemo(()=>({...ed.C,options:{...ed.C.options,excludeGetFromPreviousActions:!1},fetchPreviousActions(){c(n.statement.index,this.typeHint)}}),[c,n.statement.index]),u="MissingExpression"===n.statement.iterable.type;return s.useEffect(()=>{u&&o.current?.querySelector("button")?.click()},[u]),s.createElement(en.Z,{ref:l,expanded:!0,disabled:!1,Header:s.createElement(en.Z.Header,{style:{justifyContent:"space-between"}},s.createElement(N.fI,{style:{alignItems:"center"},gap:20},s.createElement(N.In,{icon:"LoopOutline",size:18,color:r.wmS}),s.createElement(ef,null,"For loop")),s.createElement(en.Z.HeaderActionButton,{icon:"CrossOutline",tooltipText:"Close",onClick:i})),"data-testid":"edit-loop-card"},s.createElement(eh,{gap:40},s.createElement(N.VP,{gap:24,ref:o},s.createElement(ep.A1,null,"The value to iterate"),s.createElement(eu.r,{expr:n.statement.iterable,argContext:d,onChange:e=>t({type:"LoopCard/ChangeIterable",expr:e})})),s.createElement(N.fI,{center:!0,style:{marginTop:8}},s.createElement(N.$n,{round:!0,size:"xl",text:"Save",disabled:(0,eo.wL)(n.statement.iterable),onClick:a}))))},ef=(0,c.Ay)(a.P)`
  ${ep.Tf}
  color: ${r.vh3};
  flex-grow: 1;
  align-self: center;
  font-weight: 500;
  line-height: 28px;
`,eh=(0,c.Ay)(N.VP)`
  padding: 16px;
  background-color: ${r.o$k};
  padding: 36px;
  padding-inline: 44px;
  padding-bottom: 48px;
`,eb=s.memo(function(e){let{state:t,dispatch:n}=e,a=(0,I.i8)(n,"ConditionalCardAction"),r=(0,I.i8)(n,"LoopCardAction"),i=(0,s.useCallback)(()=>n({type:"AddCard/Closed"}),[n]),l=(0,$.rD)().featureFlags.devTools,o=e=>s.createElement(ex,{isOpen:!0,onClose:i,children:e});if(!t)return null;switch(t.type){case"addCard":return o(s.createElement(ee.u,{state:t,dispatch:n,onClose:i,onSelectCommand:e=>n({type:"AddCard/SelectedCommand",command:e})}));case"conditional":return o(s.createElement(el.uA,{hasActionsBelow:l,onSave:()=>n({type:"CardEditor/ConditionalSaved"}),state:t,onClose:i,dispatch:a}));case"loop":return o(s.createElement(ey,{onSave:()=>n({type:"CardEditor/LoopSaved"}),dispatch:r,onClose:i,state:t}))}}),ex=(0,c.Ay)(N.aF)`
  width: 100%;
  max-width: 720px;
  border: 2px solid ${r.NcT};
`;var eE=n(43419),ev=n(18299);let eC=s.memo(function(e){let{argument:t,dispatch:n,suggestions:a,statementIndex:r,addonState:i,isAutobook:l,showBackButton:o}=e,c=(0,I.i8)(n,"AddonAction"),d=(0,s.useCallback)(()=>n({type:"Sequence/PreviousArgument",currentName:t.name}),[t.name,n]),u=(0,s.useCallback)(e=>n({type:"Sequence/ArgumentUpdate",arg:e}),[n]),p=(0,s.useCallback)(e=>n({type:"Sequence/ArgumentSave",arg:e}),[n]),m=(0,s.useCallback)(()=>n({type:"Sequence/SkipArgument",arg:t}),[n,t]),g=s.useCallback((e,a,r)=>{n({type:"ArgumentFilling/RequestSuggestions",reqParams:{argumentName:t.name,typeSignature:r,userInput:e,forceRefreshCache:a,isPlaybookArgument:!0,pbArgumentsOnly:!1}})},[n,t]);return s.createElement(N.VP,null,s.createElement(ev.L,{addonState:i,key:t.name,isAutobook:l,addonDispatch:c,onChange:u,onFetchSuggestions:g,onSave:p,onSkip:m,value:t,suggestions:a,statementIndex:r,showSaveButtons:!0,onBack:o?d:void 0}))});eC.displayName="PlaybookArgumentForm";var eS=n(93269);let ek=s.memo(e=>{let{ref:t,...n}=e,{name:i,description:l,plugins:o,onMetaChange:c,disabled:d}=n,u=!!c,p=s.useMemo(()=>o.flatMap(e=>e.displayHint?.icon?[e.displayHint.icon]:[]).map(e=>s.createElement(N.In,{size:24,key:JSON.stringify(e),icon:e})),[o]),m=s.useMemo(()=>l?l.split("\n").map((e,t)=>s.createElement("div",{key:t},e)):null,[l]);return s.createElement(eI,{ref:t,$disabled:d,"data-testid":"playbook-header"},s.createElement(eP,null,p.length>0&&s.createElement(N.fI,{gap:16,style:{marginBottom:4}},p),u?s.createElement(e$,{name:i,description:l,onMetaChange:c}):s.createElement(s.Fragment,null,s.createElement(a.H3,{style:{color:r.t14,maxWidth:"100%",textAlign:"center"}},i),s.createElement(a.a,{style:{maxWidth:"100%"}},m))))}),ew=(0,c.Ay)(a.H3)`
  overflow-wrap: anywhere;
  color: ${r.t14};
`,eA=(0,c.Ay)(a.a)`
  box-sizing: content-box;
  max-width: 100%;
  max-height: 240px;
  overflow: auto;
`,eI=c.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&ep.z2}}
  margin-bottom: 32px;
  margin-top: 20px;
  padding-inline: 64px;
  width: 100%;
  max-width: 848px;
`,eP=c.Ay.div`
  padding: 0;
  display: flex;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`,e$=s.memo(function(e){let{onMetaChange:t}=e,[n,a]=(0,s.useState)({name:e.name,description:e.description}),r=(0,s.useRef)(null),i=(0,s.useRef)(null),[l,o]=(0,s.useState)(!1),c=e=>{a({...n,...e}),t({...n,...e})},d=s.useCallback(()=>{i.current?.textContent?.trim()===""&&(i.current.textContent=es.tS,t({name:es.tS}))},[i,t]);return s.createElement(s.Fragment,null,s.createElement(eS.S,{onBlur:d,style:{textAlign:"center"},Component:ew,value:n.name,onChange:e=>c({name:e}),placeholder:"Name your automation",ref:i,hideEditIcon:!0}),n.description||l?s.createElement(eS.S,{ref:r,style:{textAlign:"center"},Component:eA,value:n.description??"",onChange:e=>c({description:e}),placeholder:"Description...",multiline:!0,onBlur:()=>{c({description:n.description}),n.description||o(!1)}}):s.createElement(N.$n,{variant:"flat",text:"Add a description",icon:"PlusOutline",size:"m",round:!0,onClick:()=>{o(!0),setTimeout(()=>{r?.current?.focus()},0)}}))});var eT=n(37089),eF=n(50854);let eR=s.memo(e=>{let{apps:t,onClose:n,onConnect:i}=e,l=t[0];return s.createElement(N.aF,{isOpen:!0,onClose:n},s.createElement(N.Jn,{onClick:n,abs:!0}),s.createElement(eM,null,l&&s.createElement(eL,null,s.createElement(eU,null,s.createElement(eV,{iconSize:"m",rect:!0,variant:"outlined",icon:l.icon,size:"l",tooltipText:l.name}))),s.createElement(eO,null,s.createElement(e_,null,"Connect your apps"),s.createElement(eN,null,"In order to run this Playbook you need to connect following apps:"),s.createElement(eB,null,t.map(e=>s.createElement(eD,{$error:"error"===e.status,key:e.name},s.createElement(N.fI,{style:{justifyContent:"space-between",padding:"12px 16px"}},s.createElement(eH,null,s.createElement(N.In,{icon:e.icon,size:20}),s.createElement(ez,null,e.name)),s.createElement(N.$n,{text:"error"===e.status?"Retry":"Connect",size:"m",round:!0,variant:"primary",onClick:()=>i(e)})),"error"===e.status&&e.message&&s.createElement(N.VP,{center:!0,style:{borderTop:`1px solid ${r.JIy}`,padding:"12px 16px"}},s.createElement(a.P,{$small:!0,$color:r.CCs},e.message))))))))}),eM=c.Ay.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 32px;
`,eO=c.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;
`,e_=(0,c.Ay)(a.H3)`
  margin-bottom: 16px;
  text-align: center;
`,eN=(0,c.Ay)(a.P)`
  text-align: center;
  margin-bottom: 24px;
  color: ${r.ui$};
`,eB=c.Ay.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`,eD=c.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: ${e=>{let{$error:t}=e;return t?r.P0$:r.KxS}};
  border-radius: 8px;
  width: 100%;
`,eH=c.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ez=(0,c.Ay)(a.P)`
  font-weight: 500;
  color: ${r.Xi8};
`,eL=(0,c.Ay)(N.fI)`
  margin-top: 32px;
  justify-content: center;
  margin-bottom: 24px;
`,eU=c.Ay.div`
  width: 48px;
  height: 48px;
  background-color: ${r.hi1};
  border-radius: 8px;
  position: relative;
`,eV=(0,c.Ay)(N.z9)`
  position: absolute;
  top: -50%;
  left: 50%;
`;var eq=n(51402),ej=n(30665);let eW=e=>{let[t,n]=s.useState(!1);return(s.useEffect(()=>{let e=requestIdleCallback(()=>{s.startTransition(()=>n(!0))});return()=>cancelIdleCallback(e)},[]),t)?e.children:s.createElement(ej.y,{style:{margin:"auto"}})};var eG=n(54357),eY=n(93274),eQ=n(23667),eJ=n(67846),eZ=n(78445),eX=n(98380),eK=n(24760);let e0=c.Ay.a`
  display: flex;
  gap: 16px;
  overflow: hidden;
  margin: -11px -16px;
  padding: 11px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  p {
    color: ${e=>{let{$vectorized:t}=e;return t?r.wdA:r.ui$}};
  }
  &:hover p {
    color: ${r.t14};
  }
`,e1=c.Ay.div`
  opacity: 0;
  transition: all 0.24s ease-in-out;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 22px;
`,e2=c.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${r.KE7};
  ${e=>{let{$vectorized:t}=e;return t&&`
    color: ${r.JIy};
  `}}
  &:hover {
    color: ${r.CCs};
  }
`,e4=c.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${r.ydb};
  ${e=>{let{$vectorized:t}=e;return t&&`
    color: ${r.Tc2};
  `}}
  &:hover {
    color: ${r.wmS};
  }
`,e3=c.Ay.div`
  display: flex;
  gap: 8px;
  color: ${r.b_I};
  align-items: center;
`,e6=s.memo(e=>{let{value:t,variant:n}=e;switch(t.type){case"loading":if(t.running)return s.createElement(e3,null,s.createElement(N.y$,{size:"s"})," Loading...");return s.createElement(e3,null,"Waiting...");case"scalar":switch(t.value.type){case"plain":switch(n){case"block":return s.createElement(N.$f,{format:"plaintext",text:t.value.text});case"inline":return t.value.text}case"rich":switch(n){case"block":return s.createElement(N.$f,{format:t.value.format,text:t.value.text});case"inline":return t.value.text}case"url":return s.createElement(e0,{href:t.value.url??t.value.text,target:"_blank",rel:"noopener noreferrer",$vectorized:e.vectorized},s.createElement(a.P,{$small:!0,$ellipsis:!0},t.value.text),s.createElement(e1,null,s.createElement(N.$n,{size:"s",icon:"OpenLinkOutline",tooltipText:"Open link",round:!0,variant:"flat"})))}case"error":return s.createElement(e2,{$vectorized:e.vectorized},s.createElement(N.In,{icon:"TriangularExclamationBold",color:"currentColor"}),(0,eX.u)(t.error));case"complex":switch(n){case"block":return s.createElement(eK.m,{table:t.value,onRowClick:()=>{}});case"inline":return s.createElement(e4,{$vectorized:e.vectorized,title:"You might want to refresh the outputs. Click the reload button on the 'Outputs' tab"},s.createElement(N.In,{icon:"StudioTableOutline",color:"currentColor"})," Multiple Fields",s.createElement(eZ.m,{content:"You might want to refresh the outputs. Click the reload button on the 'Outputs' tab"},s.createElement(N.In,{icon:"InfoBold",color:r.wdA})))}case"empty":if(t.error)return s.createElement(e4,{$vectorized:e.vectorized},s.createElement(N.In,{icon:"RadioEmptyBold",color:"currentColor"}),(0,eX.u)(t.error));switch(t.reason){case"no-data":case"limited":return"";case"filtered":return s.createElement(e4,{$vectorized:e.vectorized},s.createElement(N.In,{icon:"RadioEmptyBold",color:"currentColor"}),"Condition Unmet")}}});var e8=n(42351),e5=n(71378);let e7=e=>{let{statement:t,dispatch:n,disabled:a,variant:r}=e,i=()=>n({type:"DeleteStatementClicked",indexes:[t.index]}),l=()=>n({type:"DuplicateStatementClicked",index:t.index}),o=()=>n({type:"HeaderClicked",index:t.index}),c=()=>n({type:"MiniUI/ClickedEditAction",statement:t}),d="FunctionCallStatement"===t.type&&"valid"===t.columnData.status&&t.columnData.columns.length>0,u=()=>n({type:"MiniUI/ClickedClearActionData",statementIndex:t.index});return s.createElement(N.ms,{renderContent:e=>{let{closeAnd:a,close:p}=e;return s.createElement(s.Fragment,null,"top"===r?s.createElement(N.IU,{text:"Set up action",onClick:a(c)}):null,"sidebar"===r?s.createElement(e5.B,{placement:"right-start",run:e=>{p(),n({type:"ClickedRunPlaybook",forceValidatePlaybook:!1,autobookBehaviour:"run",testMode:!1,runParams:{targetIndex:t.index,targetCacheBehavior:"fill-missing",defaultCacheBehavior:"fill-missing",limitResults:e}})}},s.createElement(N.IU,{text:"Run action",rightAddon:s.createElement(N.In,{icon:"ArrowRightOutline"}),onClick:()=>{}})):null,s.createElement(N.IU,{text:"Clear",onClick:a(u),disabled:!d}),s.createElement(N.IU,{text:"Show / hide columns",onClick:a(o)}),"sidebar"===r?s.createElement(N.IU,{text:"Duplicate action",onClick:a(l)}):null,s.createElement(N.IU,{text:"Delete action",onClick:a(i)}))}},s.createElement(N.$n,{icon:"OverflowVerticalOutline",size:"l",variant:"ghost",round:!0,tooltipText:"More",disabled:a}))},e9=s.memo(function(e){let{statement:{index:t,validationError:n,actionNumber:a,entry:r},isImportStatement:i,isTestEnabled:l,dispatch:o,playbookArgs:c,editingDisabled:d,pb:u,...p}=e,{statementComment:m,statementName:g,statementIcon:y}=w.NM(e.statement),f=n?(0,es.kJ)(n):null,h=r?.result.type==="error"?0:r?.result.breakdown.c_good??0,b=s.useMemo(()=>{if(!r)return 0;if("error"===r.result.type)return 1;let e=r.result.tabs[0]?.breakdown??r.result.breakdown;return Math.max(e.c_empty-e.c_filter,0)+e.c_error},[r]),x=s.useMemo(()=>{if(!r)return 0;if("error"===r.result.type)return 1;let e=r.result.tabs[0]?.breakdown??r.result.breakdown;return e.c_good+e.c_empty+e.c_error+e.c_skip+e.c_filter},[r]),E=s.useMemo(()=>(0,es.Zg)(u,t,!0).filter(e=>"FunctionCallStatement"===e.type),[u,t]);return s.createElement(tn,{...p,$error:!!f},s.createElement(N.In,{icon:y,style:{marginRight:12}}),s.createElement(tr,{as:"div",$bold:!0,$small:!0,$ellipsis:!0,$disabled:d},s.createElement(ta,{$small:!0,role:"button",$ellipsis:!0,$disabled:d,onClick:()=>!d&&o({type:"HeaderClicked",index:t})},a,". ",m||g)),!d&&s.createElement(tt,null,s.createElement(e7,{statement:e.statement,dispatch:o,disabled:d,variant:"top"}),s.createElement(N.ms,{renderContent:e=>{let{close:n}=e;return s.createElement(s.Fragment,null,s.createElement(e5.B,{placement:"right-start",statements:E,run:e=>{n(),o({type:"ClickedRunPlaybook",forceValidatePlaybook:i,autobookBehaviour:"run",testMode:!1,runParams:{targetIndex:t,targetCacheBehavior:"fill-missing",defaultCacheBehavior:"fill-missing",limitResults:e}})}},s.createElement(N.IU,{text:`Run action${h>0?" again":""}`,rightAddon:s.createElement(N.In,{icon:"ArrowRightOutline"}),onClick:()=>{}})),s.createElement(N.IU,{text:`Retry ${0==b?"":b} missing entries`,disabled:0===b,onClick:()=>{n(),o({type:"ClickedRunPlaybook",forceValidatePlaybook:!1,autobookBehaviour:"run",testMode:l,runParams:{targetIndex:t,targetCacheBehavior:"fill-missing-to-completion",defaultCacheBehavior:"fill-missing-to-completion",limitResults:x}})}}))}},s.createElement(N.$n,{variant:"flat",round:!0,size:"l",icon:"RadioPlayBold",tooltipText:"Run up to here",tooltipPlacement:"top",disabled:d}))))}),te=(0,c.Ay)(e8.U)`
  flex-shrink: 0;
  fill: currentColor;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  margin-left: auto;
  font-size: 16px;
  color: ${r.ui$};
  &:hover {
    color: ${r.t14};
    transform: scale(1.1);
  }
`,tt=(0,c.Ay)(N.fI)`
  opacity: 0;
  margin: -8px;
  transition: opacity 0.2s ease-in-out;
`,tn=c.Ay.div`
  display: flex;
  --icon-size: 16px;
  background-color: ${r.ONy};
  border-radius: 8px 8px 0 0;
  border: 1px solid ${e=>{let{$error:t}=e;return t?r.MEI:r.Tc2}};
  border-bottom: none;
  width: 100%;
  padding: 10px 16px;
  align-items: center;
  height: 48px;
  margin-right: 3px;
  &:hover {
    ${tt} {
      opacity: 1;
    }
    ${te} {
      opacity: 1;
    }
  }
`,ta=(0,c.Ay)(a.P)`
  color: currentColor;
  ${e=>{let{$disabled:t}=e;return t&&(0,c.AH)`
      cursor: default;
      &:hover {
        color: inherit;
      }
    `}}

  &:hover {
    color: ${r.t14};
  }
`,tr=(0,c.Ay)(a.P)`
  flex: 1;
  display: flex;
  align-items: center;
  text-align: start;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
`,ti=e=>e.some(e=>Object.keys(e.data).length>0&&Object.values(e.data).some(e=>e&&"loading"!==e.type)),tl=e=>{let{statements:t,importStatement:n}=x.ir(e);return[n,...t].filter(e=>e?.type==="FunctionCallStatement")},to=s.memo(function(e){let{state:t,dispatch:n}=e,a=t.resultsFromTestMode?5:void 0,r=(0,es.Pv)(t),i=t.miniViewState.selectedRowsIndices,l=t.miniViewState.expandedRowIndices,o=tl(r),c=(0,eJ.ik)(o,t.partialState),d=(0,s.useCallback)(e=>{n({type:"MiniUI/ClickedViewRow",row:e,columns:c.columns})},[n,c.columns]),u=(0,s.useRef)([]),p=(0,s.useRef)([]),m=(0,s.useRef)(null),g=(0,s.useRef)(null),y=(0,s.useRef)(null),[f,h]=(0,s.useState)(!1),[b,x]=(0,s.useState)(!0),[E,v]=(0,s.useState)(!1),C="studio-table-scroll-position";s.useEffect(()=>{v(!!(g.current?.scrollWidth&&g.current?.clientWidth&&g.current?.scrollWidth>g.current?.clientWidth))},[c.columns]),s.useEffect(()=>{let e=g.current;if(e){try{let t=localStorage.getItem(C);if(t){let{scrollLeft:n,scrollTop:a}=tE(JSON.parse(t));e.scrollLeft=n,e.scrollTop=a}}catch{}return()=>window.clearTimeout(y.current??void 0)}},[]);let S=(0,s.useCallback)(e=>{let{scrollLeft:t,scrollTop:n,clientWidth:a,scrollWidth:r}=e.currentTarget,i=t+a>=r,l=0===t;i!==f&&h(i),l!==b&&x(l),window.clearTimeout(y.current??void 0),y.current=window.setTimeout(()=>{try{localStorage.setItem(C,JSON.stringify({scrollLeft:t,scrollTop:n}))}catch{}y.current=null},100)},[f,b]),w=(0,s.useCallback)(e=>{let t=g.current;if(!t)return;let n=p.current.findIndex(e=>{let{el:n}=e;return(0,eJ.FK)(n,t,60)}),a=n;a=-1!==n?n:p.current.findIndex(e=>{let{el:n}=e;return(0,eJ.Z4)(n,t,60)});let r=0;if("next"===e){if(a===u.current.length-1){t.scrollTo({left:t.scrollWidth,behavior:"smooth"});return}r=Math.min(a+1,u.current.length-1)}else{if(0===a){t.scrollTo({left:0,behavior:"smooth"});return}r=Math.max(a-1,0)}(0,eJ.tB)(u.current[r]?.el??null,g.current)},[]),A=(0,es.RQ)(t),I=(0,es.dG)(t),P=A||I,$=tb(a?c.rows.slice(0,a):c.rows),T=!!a&&c.rows.length>a;return s.createElement(tc,null,s.createElement(td,{ref:g,onScroll:S,"data-builder-role":"scrollable-table"},s.createElement(tu,null,s.createElement("colgroup",{span:1},s.createElement("col",{span:1,className:"row-number-col"})),o.map((e,t)=>{let n=(0,eJ.gr)(e);return s.createElement("colgroup",{key:e.index,span:n.length,className:"statement-colgroup"},n.map(e=>s.createElement("col",{key:e.id,className:"statement-col"})))}),s.createElement("colgroup",{span:1},s.createElement("col",{span:1,className:"action-col"})),s.createElement("tbody",null,($.length>0?$:tf).map((e,t)=>{let a=Object.values(e.data),r=!a.length||a.every(e=>"empty"===e.type);if(0===e.rowSpan)return null;let o=l.includes(t),u=e.rowSpan>1?s.createElement(tg,{key:t+"-collapsed-row",expanded:o,collapsedCount:e.rowSpan-1,colCount:c.columns.length,onExpandClicked:()=>n({type:"MiniUI/ClickedExpandRow",rowIndex:t})}):null,p=s.createElement(s.Fragment,null,c.columns.map((n,a)=>{let r=th(a,c.columns),i=e.data[n.id],l=(0,k.fC)(eY.w(i)),o=(0,k.Z_)(String(l),512);return i?.colSpan===0?null:s.createElement("td",{"data-column-header":n.title,className:(0,eG.A)({"last-statement-column":r,vectorized:i?.vectorized}),...l?{title:o}:{},key:`${a}-${t}-${n.id}`,"data-empty":!l||void 0,"data-type":i?.type??"empty",colSpan:i?.colSpan},i&&s.createElement(e6,{value:i,vectorized:i.vectorized,variant:"inline"}))}),s.createElement("td",{className:(0,eG.A)("action-cell",e.isPlaceholder&&"placeholder")},r?null:s.createElement(ts,null,s.createElement(N.$n,{text:"View",onClick:()=>d(e),size:"m",round:!0,variant:"flat"}))));return s.createElement(s.Fragment,null,o?Array(e.rowSpan).fill(p).map((e,a)=>s.createElement(tx,{key:t+a,row:e,rowIndex:t+a,selectedRowsIndices:i,dispatch:n},p)):s.createElement(tx,{row:e,rowIndex:t,selectedRowsIndices:i,dispatch:n},p),u)}),T&&s.createElement("tr",null,s.createElement("td",{className:"sticky-cell row-number"},"..."),c.columns.map((e,t)=>s.createElement("td",{key:e.id})),s.createElement("td",{className:"action-cell"}))),s.createElement("thead",null,s.createElement("tr",{className:"tabs-row",ref:m},s.createElement("th",{scope:"col",className:"statement-header add-card-button"}),o.map((e,a)=>{let i=(0,eJ.gr)(e);return 0===i.length||e.isTrigger?null:s.createElement(s.Fragment,{key:e.index},s.createElement("th",{"data-statement-header-index":e.index,colSpan:i.length,scope:"col",className:"statement-header",ref:t=>{t&&(u.current[a]={statementIndex:e.index,el:t})}},s.createElement("div",{className:"statement-header-container",ref:t=>{t&&(p.current[a]={statementIndex:e.index,el:t})}},s.createElement(e9,{isImportStatement:0===a,key:e.index,statement:e,dispatch:n,playbookArgs:r.args,isTestEnabled:t.testModeEnabled,editingDisabled:P,pb:r}))))}),s.createElement("th",{colSpan:1,scope:"col",className:"statement-header"},s.createElement(tm,null,s.createElement(tp,null),s.createElement(N.$n,{variant:"ghost",size:"l",icon:"ArrowLeftOutline",tooltipText:"Previous",onClick:()=>w("previous"),disabled:!E||b}),s.createElement(N.$n,{variant:"ghost",size:"l",icon:"ArrowRightOutline",tooltipText:"Next",onClick:()=>w("next"),disabled:!E||f}),s.createElement(tp,null),s.createElement(N.$n,{variant:"ghost",size:"l",icon:"DownloadOutline",tooltipText:"Download CSV",disabled:!ti(c.rows),onClick:()=>(0,eJ.H4)(r.meta.name,c.rows,c.columns)}),!t.miniViewState.sidebarOpen&&s.createElement(N.$n,{variant:"ghost",size:"l",icon:"SidebarROutline",tooltipText:"Open sidebar",onClick:()=>n({type:"MiniUI/ClickedOpenSidebar"})})))),s.createElement("tr",null,s.createElement("th",{scope:"col",className:"sticky-cell row-number-clear-selection"},i.length>0&&s.createElement(N.$n,{variant:"ghost",size:"m",icon:"CrossOutline",tooltipText:"Clear selection",onClick:()=>n({type:"MiniUI/ClickedClearRowSelection"})})),c.columns.map((e,t)=>s.createElement("th",{key:`${t}-${e.id}`,scope:"col",className:(0,eG.A)(th(t,c.columns)&&"last-statement-column","column-header")},s.createElement(N.fI,{center:!0,style:{height:"20px"}},s.createElement("p",{className:"column-header-title"},e.title||s.createElement(s.Fragment,null,"\xa0")),s.createElement(N.$n,{variant:"ghost",size:"m",icon:"EyeHideOutline",tooltipText:`Hide "${e.title}"`,style:{marginLeft:"auto"},onClick:()=>{let{statementIndex:t,id:a}=e;n({type:"MiniUI/ClickedHideColumn",index:t,columnId:a})}})))),s.createElement("th",{scope:"col"}))))))}),ts=c.Ay.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(to right, transparent, ${r.ONy} 60px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 64px;
  padding-inline-end: 6px;
`,tc=c.Ay.div`
  overflow: hidden;
  height: 100%;
  border: 1px solid ${r.Tc2};
  border-radius: 8px;
  background-color: ${r.o$k};
  display: flex;
  flex-direction: column;
`,td=c.Ay.div`
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
    background: ${r.o$k};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${r.NcT};
    border-radius: 4px;
  }

  /* Firefox scrollbar styles */
  overscroll-behavior: contain;
`,tu=c.Ay.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  background: ${r.hi1};

  col:not(.row-number-col):not(.action-col) {
    min-width: 224px;
  }

  --table-border-color: ${r.Tc2};
  --table-header-color: ${r.ONy};

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
    color: ${r.vh3};
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
    color: ${r.vh3};
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
    color: ${r.wmS};
    vertical-align: middle;
    text-align: start;
  }

  .tabs-row {
    .statement-header {
      padding-top: 4px;
      background-color: ${r.hi1};
      vertical-align: bottom;

      &:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        vertical-align: middle;
      }
      &:last-child {
        text-align: center;
        background-color: ${r.hi1};
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
      color: ${r.wdA};
    }
    --icon-size: 16px;
    position: relative;
    padding: 12px 16px;
    border-bottom: 1px solid var(--table-border-color);
    border-right: 1px solid var(--table-border-color);
    color: ${r.ui$};
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
      background-color: ${r.hi1};
    }
  }
  tr {
    --row-background-color: ${r.o$k};
    --row-text-color: ${r.wmS};
    --row-hover-background-color: ${r.KxS};
    --row-hover-text-color: ${r.t14};

    transition: background 0.24s ease-in-out;
    position: relative;

    color: var(--row-text-color);

    td {
      background-color: var(--row-background-color);

      &[data-empty] {
        --row-background-color: ${r.hi1};
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

      ${ts} {
        opacity: 1;
      }
      ${e1} {
        background: linear-gradient(to right, transparent, ${r.KxS} 18px);
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
      border: 2px solid ${r.NcT};
      z-index: 1;
      pointer-events: none;
      opacity: 0;
    }

    &.selected {
      &::after {
        opacity: 1;
      }

      .row-number {
        border-left: 2px solid ${r.NcT};
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
        color: ${r.ydb};
        font-size: 10px;
        line-height: 12px;
        background-color: ${r.hi1};

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
    color: ${r.ydb};
    &.placeholder {
      cursor: default;
    }
    &:hover:not(.placeholder) {
      color: ${r.t14};
      background-color: ${r.KxS};
    }
  }
`,tp=c.Ay.div`
  height: 40px;
  background: ${r.MfC};
  width: 1px;
  flex-shrink: 0;
`,tm=(0,c.Ay)(N.fI)`
  gap: 4px;
  background-color: ${r.hi1};
  padding: 4px;
  position: relative;
  justify-content: flex-end;
  &::before {
    content: "";
    position: absolute;
    right: 100%;
    height: 100%;
    width: 40px;
    background: linear-gradient(to right, transparent, ${r.hi1} 32px);
    pointer-events: none;
  }
`,tg=e=>{let{expanded:t,collapsedCount:n,colCount:a,onExpandClicked:i}=e;return s.createElement("tr",{className:"row-span-collapsable"},s.createElement("td",{className:(0,eG.A)("sticky-cell row-collapse"),role:"button",tabIndex:0,onClick:i},s.createElement(N.In,{size:12,color:r.ydb,icon:t?"ArrowUpOutline":"ArrowDownOutline"})),s.createElement("td",{colSpan:a},t?"Collapse repetitive Items":`${n} repetitive items collapsed`))},ty={rowSpan:1,data:{data:{type:"empty",error:null,vectorized:!1,reason:"no-data",colSpan:1}},isPlaceholder:!0},tf=Array.from({length:20},()=>ty),th=(e,t)=>{let n=t[e+1];return!n||n.statementIndex!==t[e]?.statementIndex},tb=e=>e.concat(Array.from({length:20-e.length},()=>ty)),tx=e=>{let{row:t,rowIndex:n,selectedRowsIndices:a,dispatch:r,children:i}=e,l=a.includes(n+1),o=a.includes(n-1),c=a.includes(n);return s.createElement("tr",{key:n,className:(0,eG.A)(c?"selected":"",o&&c?"previous-selected":"",l&&c?"next-selected":""),"data-selected":c,"data-placeholder":t.isPlaceholder||void 0},s.createElement("td",{className:(0,eG.A)("sticky-cell row-number",t.isPlaceholder&&"placeholder"),role:"button",tabIndex:0,onClick:()=>r({type:"MiniUI/ClickedRowNumber",rowIndex:n})},n+1),i)},tE=e=>{let t=eQ.D.object({scrollLeft:eQ.D.number,scrollTop:eQ.D.number}).decode(e);return t.ok?t.value:{scrollLeft:0,scrollTop:0}};var tv=n(43955);let tC=e=>{let{state:t,dispatch:n}=e,a=(0,$.jL)(),i=(0,$.rD)(),l=(0,es.Pv)(t),o=(0,es.RQ)(t),{importStatement:c,statements:d,exportStatement:u,triggerStatement:p}=x.ir(l),m=d.map(e=>({...e,id:e.index.toString()})),y=(0,es.dG)(t),f=o||y,h=x.AQ(l);function b(e){let n=eo.py.getRunning(t.sequencingStatus);if(!n)return;let a=tL(n,e);if(void 0!==a)return s.createElement(tD,{$progress:a})}let E=s.createElement(N.lM,{disabled:!h||f,checked:!!p&&!l.triggerState?.disabledReason,isPending:l.triggerState?.status==="pending",yellow:l.triggerState?.status!=="running"&&l.triggerState?.disabledReason!=="Disabled by you",onChange:()=>h&&n({type:"MiniUI/ClickedTriggerToggle"}),label:"",size:"s"}),v=h?E:s.createElement(eZ.m,{content:"Can't schedule because your import scraper's target is set to 'current website'."},E),C=e=>s.createElement(t$,null,s.createElement(N.$n,{icon:"PencilOutline",size:"s",variant:"ghost",round:!0,tooltipText:"Edit",disabled:f,onClick:()=>n({type:"MiniUI/ClickedEditAction",statement:e})}));return s.createElement(tw,{open:t.miniViewState.sidebarOpen},s.createElement(tS,null,s.createElement(tz,{$color:r.ui$},"Actions"),s.createElement(N.$n,{variant:"ghost",size:"l",icon:"CollapseOutline",tooltipText:"Close sidebar",onClick:()=>n({type:"MiniUI/ClickedOpenSidebar"})})),s.createElement(tk,null,c&&s.createElement(tT,{"data-testid":"sidebar-import-statement-item",onClick:()=>n({type:"MiniUI/SidebarItemClicked",statement:c}),$error:!!x.Nf(c)?.validationError,onDoubleClick:()=>n({type:"MiniUI/ClickedEditAction",statement:c})},b(c.index),tN(c,"Import")||s.createElement(s.Fragment,null,s.createElement(tH,null,s.createElement(N.In,{icon:"TexturedGetFromPreviousActions2",size:16})),s.createElement(tz,{as:"div",style:tB},"Import")),s.createElement("span",{style:{marginLeft:"auto"}}),s.createElement(t$,null,C(c))),m.length>0&&s.createElement(tM,{dispatch:n,appendTo:"start",disabled:f}),s.createElement(N.VP,{style:{display:m.length>0?"flex":"none"}},s.createElement(N.q6,{disabled:f,items:m,onItemsReorder:e=>{n({type:"MiniUI/ReorderedStatements",statements:e})}},m.map(e=>{let t=x.Nf(e),{statementName:o,statementIcon:c,statementComment:d}=w.NM(t),u=g.CN(i.subscription,t?.displayHint?.requiresPaymentPlan??[]),p=s.createElement(tT,{"data-testid":"sidebar-middle-statement-item",onClick:()=>n({type:"MiniUI/SidebarItemClicked",statement:e}),key:e.index,$error:u||!!t?.validationError,$sortable:!0,onDoubleClick:()=>n({type:"MiniUI/ClickedEditAction",statement:e})},b(e.index),u?s.createElement(eZ.m,{content:"Upgrade to premium to use this action"},s.createElement(tH,null,s.createElement(N.In,{icon:"StarBold",size:16,color:r.eJD,onClick:()=>a({type:"App/ClickedPremiumFeature"})}))):s.createElement(tH,null,s.createElement(N.In,{icon:eJ.O9(e,"model")?.icon??c,size:16})),s.createElement(eZ.m,{content:u?"Upgrade to premium to use this action":""},s.createElement(tz,{style:{flexGrow:1},onClick:u?()=>a({type:"App/ClickedPremiumFeature"}):()=>n({type:"MiniUI/ClickedOnMiddleActionName",statement:e})},d||o)),s.createElement(tF,{statement:e,dispatch:n,needsUpgrade:u,disabled:f,pb:l}),s.createElement(N.Yz,{$offset:-24,size:16}));return s.createElement(tR,{key:e.index,id:e.id},s.createElement("div",null,p))}))),s.createElement(tM,{dispatch:n,appendTo:"end",disabled:f}),s.createElement(tT,{"data-testid":"sidebar-export-statement-item",onClick:u?()=>n({type:"MiniUI/SidebarItemClicked",statement:u}):void 0,$error:!!(u&&x.Nf(u)?.validationError),onDoubleClick:u?()=>n({type:"MiniUI/ClickedEditAction",statement:u}):void 0},b(u?.index),s.createElement(N.lM,{disabled:f,checked:!!u,onChange:()=>n({type:"MiniUI/ClickedExportToggle"}),label:"",size:"s"}),s.createElement(tz,{as:"div",style:tB},s.createElement(N.fI,{gap:12},s.createElement("span",null,"Export")," ",u&&tN(u))),u&&C(u)),s.createElement(tT,{"data-testid":"sidebar-trigger-statement-item",$error:!!(p&&x.Nf(p)?.validationError),onDoubleClick:p?()=>n({type:"MiniUI/ClickedEditAction",statement:p}):void 0},b(p?.index),v,l.triggerState?.disabledReason&&"Disabled by you"!==l.triggerState.disabledReason&&p&&s.createElement(eZ.m,{content:l.triggerState?.disabledReason},s.createElement(N.In,{icon:"TriangularExclamationBold",size:16,color:r.uSe,onClick:()=>n({type:"MiniUI/ClickedEditAction",statement:p})})),s.createElement(tz,{style:{flexGrow:1}},"Schedule Run"),p&&C(p))))},tS=(0,c.Ay)(N.fI)`
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding-inline-start: 20px;
  padding-inline-end: 8px;
  height: 52px;
  border-bottom: 1px solid ${r.Tc2};
  gap: 16px;
  background-color: ${r.hi1};
`,tk=c.Ay.div`
  overflow: auto;
  & > * {
    border-bottom: 1px solid ${r.Tc2};
  }
`,tw=e=>{let{children:t,open:n,...a}=e,[r,i]=s.useState(n);return s.useEffect(()=>{if(n){i(!0);return}let e=setTimeout(()=>{i(n)},240);return()=>clearTimeout(e)},[n]),s.createElement(tA,{open:n,...a},r?t:null)},tA=(0,c.Ay)(N.VP)`
  transition:
    width 0.24s ease-in-out,
    opacity 0.24s ease-in-out;
  width: ${e=>{let{open:t}=e;return t?"320px":"0"}};
  opacity: ${e=>{let{open:t}=e;return t?"1":"0"}};
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${r.Tc2};
  background-color: ${r.ONy};
`,tI=(0,c.Ay)(N.VP)`
  transition: all 0.24s ease-in-out;
  border-radius: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
`,tP=(0,c.Ay)(N.fI)`
  cursor: pointer;
  padding: 8px 20px;
  background: ${r.o$k};
  justify-content: center;
  --icon-color: ${r.e30};
  ${e=>{let{$disabled:t}=e;return t&&`
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    `}}
  &:hover {
    --icon-color: ${r.b_I};
    ${tI} {
      background: ${r.KxS};
    }
  }
`,t$=(0,c.Ay)(N.fI)`
  gap: 8px;
  flex-shrink: 0;
  transition: all 0.24s ease-in-out;
  justify-self: flex-end;
  --icon-color: ${r.b_I};
  opacity: 0;
  background: ${r.KxS};
  position: absolute;
  right: 1px;

  &:before {
    content: "";
    position: absolute;
    left: -18px;
    width: 18px;
    top: 0;
    bottom: 0;
    background: linear-gradient(to right, transparent, ${r.KxS} 18px);
  }
`,tT=(0,c.Ay)(N.fI)`
  position: relative;
  padding: 0 12px 0 20px;
  align-items: center;
  gap: 16px;
  height: 48px;
  color: ${r.vh3};
  transition: all 0.24s ease-out;

  ${e=>{let{$sortable:t}=e;return t&&`
    cursor: grab;
    user-select: none;
  `}}
  ${e=>{let{$error:t}=e;return t&&`
    outline: 1px solid ${r.MEI};
    outline-offset: -1px;
  `}}
  &:hover {
    background: ${r.KxS};
    color: ${r.t14};
    --color: ${r.t14};
    ${t$} {
      opacity: 1;
    }
  }
  ${e=>{let{$warning:t}=e;return t&&`
    outline: 1px solid ${r.O$e};
    outline-offset: -1px;
  `}}
`,tF=e=>{let{statement:t,dispatch:n,disabled:a,needsUpgrade:r,pb:i}=e;return r?s.createElement(t$,null,s.createElement(N.$n,{icon:"TrashBinOutline",size:"s",variant:"ghost",round:!0,tooltipText:"Delete",onClick:()=>n({type:"DeleteStatementClicked",indexes:[t.index]})})):s.createElement(t$,null,s.createElement(N.$n,{icon:"PencilOutline",size:"s",variant:"ghost",round:!0,tooltipText:"Edit",disabled:a,onClick:()=>n({type:"MiniUI/ClickedEditAction",statement:t})}),s.createElement(e7,{statement:t,dispatch:n,disabled:a,variant:"sidebar"}))},tR=(0,c.Ay)(N.Uq)``,tM=e=>{let{dispatch:t,appendTo:n,disabled:a}=e;return s.createElement(N.ms,{autoCloseOnContentClick:!0,behavior:"flip-shift",renderContent:()=>s.createElement(s.Fragment,null,s.createElement(tO,null,"Add Action:"),tv.uB.map(e=>s.createElement(t_,{key:e.name,g:e,dispatch:t,appendTo:n})),s.createElement(tO,null,"Add Utility:"),tv.Nq.map(e=>s.createElement(t_,{key:e.name,g:e,dispatch:t,appendTo:n})))},s.createElement(tP,{role:"button","data-testid":`add-action-button-${n}`,$disabled:a},s.createElement(tI,null,s.createElement(N.In,{icon:"PlusOutline",size:16}))))},tO=(0,c.Ay)(N.ke)`
  padding: 8px 16px;
`,t_=s.memo(function(e){let{subscription:t}=(0,$.rD)();if(!t)return null;let{g:n,dispatch:a,appendTo:r}=e,i=g.fD(t,n.commands.flatMap(e=>e.needsPaidFeature)),l=n.commands.every(e=>e.needsPaidFeature.length>0),o=!i&&l;return s.createElement(eZ.m,{content:o?"Upgrade to premium to use these actions":""},s.createElement(N.IU,{key:n.name,text:n.name,icon:n.icon,size:"s",onClick:()=>a({type:"MiniUI/ClickedAddMiddleAction",commandGroup:n,appendTo:r})},n.name," ",o?s.createElement(N.R,{small:!0}):null))}),tN=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=(0,eJ.O9)(e);if(!n)return null;let{icon:a,label:r,interactions:i={}}=n,{openResource:l}=i,o=l?.href?()=>window.open(l.href,"_blank"):null,c=o?N.YK:N.fI;return s.createElement(N.fI,null,t&&s.createElement(tz,{style:{flexShrink:0,marginRight:16}},t),s.createElement(eZ.m,{content:l?.title},s.createElement(c,{onClick:o,style:{display:"flex",alignItems:"center",minWidth:0,gap:4}},a&&s.createElement(tH,null,s.createElement(N.In,{icon:a,size:16})),s.createElement(tz,null,r))))},tB={display:"flex",alignItems:"center",flexGrow:1},tD=c.Ay.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: ${r.o_k};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${e=>{let{$progress:t}=e;return 100*t}}%;
    background: ${r.NcT};
    transition: width 0.3s ease-out;
  }
`,tH=(0,c.Ay)(N.fI)`
  flex-shrink: 0;
  width: 20px;
  justify-content: center;
  align-items: center;
`,tz=(0,c.Ay)(a.P).attrs({$small:!0,$bold:!0,$ellipsis:!0,$color:"inherit"})``,tL=(e,t)=>{if(t===e.statementIndex)return e.finishedStatements.includes(t)?1:e.startedStatements.includes(t)?e.statementProgress:.1},tU=(0,c.Ay)(N.VP)`
  margin: 22px 20px;
  height: calc(100% - 22px);
  overflow: hidden;
  position: relative;
`,tV=e=>{let{dispatch:t,state:n,isModalOpen:a}=e;s.useEffect(()=>{function e(e){let n=(e.metaKey||e.ctrlKey)&&!e.shiftKey&&"z"===e.key.toLowerCase(),r=(e.metaKey||e.ctrlKey)&&e.shiftKey&&"z"===e.key.toLowerCase();if(n||r){if(a)return;e.preventDefault(),t({type:n?"MiniUI/ClickedUndo":"MiniUI/ClickedRedo"})}}return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[t,a]);let i=(0,es._x)(n);return s.createElement(s.Fragment,null,s.createElement(tU,null,s.createElement(N.fI,{gap:n.miniViewState.sidebarOpen?24:0,style:{height:"100%",alignItems:"start"}},s.createElement(N.VP,{style:{flex:1,height:"100%"}},s.createElement(eW,null,s.createElement(to,{state:n,dispatch:t}))),s.createElement(tC,{state:n,dispatch:t})),"saving"!==n.loadingStatus&&i&&s.createElement("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1,backgroundColor:r.o$k}},s.createElement(L.gb,{status:i}))))},tq=[{id:"key",label:"Key"},{id:"value",label:"Value"}],tj=e=>{let{row:{data:t},columns:n}=e,{errors:a,hasData:r}=s.useMemo(()=>{let e=Object.values(t),n=new Set,a=!1;for(let t of e)switch(t.type){case"error":n.add((0,eX.u)(t.error));break;case"empty":case"loading":break;case"complex":case"scalar":a=!0}return{hasData:a,errors:Array.from(n)}},[t]),i=Object.entries(t).map(e=>{let[t,a]=e,r=n.find(e=>e.id===t);return{customClass:"error"===a.type?"with-error":void 0,data:{key:{type:"plain",value:r?.title??"-"},value:{type:"custom",value:s.createElement(e6,{value:a,variant:"block"}),title:null}}}});return s.createElement(N.VP,{gap:16},a.map(e=>s.createElement(N.BQ,{key:e,round:!0,variant:"critical",icon:"RadioExclamationBold"},e)),r?s.createElement(tW,{$noTopRadius:!1,$noBotRadius:!1,columns:tq,rows:i,"data-testid":"single-row-table"}):null)},tW=(0,c.Ay)(N.XI)`
  th {
    display: none;
  }
  td {
    background-color: ${r.o$k};
    overflow: visible;
    text-wrap: initial;
    max-width: 500px;
    vertical-align: baseline;
  }
  td:nth-child(1) {
    background-color: ${r.ONy} !important;
    font-weight: 500;
    color: ${r.vh3} !important;
  }
  tr {
    --row-hover-background-color: unset;
    --row-hover-text-color: unset;

    ${e=>{let{$noBotRadius:t}=e;return t&&(0,c.AH)`
        &:last-child td {
          border-bottom: 1px solid ${r.Tc2};
        }
      `}}

    &.with-error {
      td {
        background-color: ${r.P0$} !important;
      }
    }
  }

  ${e=>{let{$noTopRadius:t}=e;return t&&(0,c.AH)`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}}
  ${e=>{let{$noBotRadius:t}=e;return t&&(0,c.AH)`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}}
`;var tG=n(22384),tY=n(21714),tQ=n(32021),tJ=n(50278),tZ=n(8432),tX=n(36836),tK=n(99676);let t0=(0,c.Ay)(function(e){let{completedSteps:t,totalSteps:n,children:a,onPause:r,...i}=e;return s.createElement(L.e2,i,s.createElement(N.$n,{icon:"RadioPauseBold",size:"l",round:!0,variant:"primary",tooltipText:"Pause",onClick:r}),s.createElement(tK.z,{"aria-label":"execution progress",value:n>0?t/n:0}))})`
  width: 306px;
`,t1=(0,c.Ay)(function(e){let{children:t,...n}=e;return s.createElement(L.e2,n,s.createElement(N.In,{icon:"RadioCheckmarkBold",size:20,color:r.XxH}),s.createElement(t2,null,t))})`
  width: 306px;
  height: 56px;
  justify-content: center;
  gap: 12px;
  & > ${N.In} {
    animation: ${(0,c.i7)`
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
`,t2=c.Ay.p`
  color: ${r.XxH};
  font-family: Inter;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.1px;
  text-align: center;
  vertical-align: middle;
`,t4=e=>{let{snapshotFullyExecuted:t,playbookIncomplete:n,isReadOnly:a,isLoading:r}=e;if(a)return"Agent has been modified";if(r)return"Agent is loading";if(t);else if(n)return"Agent has errors, fix to continue";return null},t3=s.memo(function(e){let t;let{pb:n,state:a,dispatch:r,onClose:i,onMinimize:l,costBreakdown:o,...c}=e,{runHistory:d,runCompletedId:u,testModeEnabled:p,sequencingStatus:m}=a,{subscription:y}=(0,$.rD)(),f=eo.py.isIdle(m),h=eo.py.isRunning(m),b=eo.py.isFilling(m),x=(0,es.RQ)(a),E=(0,es.dG)(a),v=E||x,{needsEditing:C}=n.meta,S=0===n.statements.length,k=(0,tY.Am)("finishedStatements"in m&&m.finishedStatements||[]),w=o.reduce((e,t)=>t.cached?e:e+t.costMicroCredits,0),A=!x&&(p||n.fromSnapshot)&&o.length>0,I=d.find(e=>e.snapshotId===n.fromSnapshot?.snapshotId),P="totalStatementsCount"in a.sequencingStatus?a.sequencingStatus.totalStatementsCount:n.statements.length,T=(0,$.jL)();if(!y)return null;let F=!g.Zh(y,n),R=t4({snapshotFullyExecuted:(0,es.EP)(n),playbookIncomplete:S||!!C,isReadOnly:E,isLoading:x}),M=0===d.length||!f||x;I?s.createElement(N.$n,{variant:"flat","data-testid":"run-history-button",disabled:M,icon:"ArrowDownOutline",iconPosition:"right",round:!0,style:{fontWeight:500},text:(0,tJ.Yq)(I.startDate)}):s.createElement(N.$n,{variant:"flat",icon:"HistoryOutline",tooltipText:"Run History","data-testid":"run-history-button",disabled:M}),s.Fragment,a.history[a.activeIndex-1]&&N.$n,N.$n,a.history[a.activeIndex+1],N.ms;let O=s.createElement(N.$n,{icon:"RadioPlayBold",disabled:!!R,text:"Run",size:"l",round:!0,variant:"primary","data-tour-id":"playbook-test-button","data-testid":"playbook-run-button",addonLeft:s.createElement(tG.$,{style:{position:"relative",top:1}})});if(R)O=s.createElement(eZ.m,{content:s.createElement(s.Fragment,null,R)},s.createElement("span",null,O));else{let e=(0,es.gN)(n);O=s.createElement(e5.B,{statements:e,run:e=>{r({type:"ClickedRunPlaybook",postRunActions:[],forceValidatePlaybook:!1,autobookBehaviour:"run",testMode:!1,runParams:{targetIndex:null,defaultCacheBehavior:"fill-missing",limitResults:e}})}},s.createElement("div",null,O))}let _=s.createElement(s.Fragment,null,!f||b?s.createElement(t0,{style:t6,completedSteps:k.length+("running"===a.sequencingStatus.type?a.sequencingStatus.statementProgress:0),totalSteps:P,onPause:()=>r({type:"ClickedPauseV2"})}):u?s.createElement(t1,{style:t6,onClick:()=>r({type:"ExecutionCompletedAnimationFinished",runCompletedId:u})},a.testModeEnabled?"Test-Run Complete":"Run Complete"):s.createElement(N.fI,{gap:20,onClick:()=>T({type:"Builder/InteractedWithTestModeToggle"})},F?s.createElement(N.$n,{text:"Explore Premium Plans",variant:"primary",round:!0,size:"l",disabled:v,onClick:()=>T({type:"App/ClickedPremiumFeature"})}):O));return s.createElement(tQ.H.Bar,{"data-testid":"title-bar-mini",...c,style:{paddingInlineStart:0,gap:20}},s.createElement(N.fI,{style:{flexShrink:0},center:!0},s.createElement(N.VP,{style:{width:64,height:64},center:!0},s.createElement(N.In,{icon:"BardeenLogoV4",size:26})),s.createElement(nt,null)),s.createElement(t8,null,s.createElement(t7,null,s.createElement(N.fI,null,s.createElement(ne,{"data-testid":"playbook-name-editable",key:n.meta.name,disabled:x,editWhen:"click",value:n.meta.name,addonAfter:s.createElement(N.In,{icon:"PencilOutline"}),onSave:e=>{r({type:"UserChangedPbMeta",meta:{name:e||"Untitled"}})}}))),s.createElement(t5,null,s.createElement(nt,null),A?s.createElement(s.Fragment,null,(t=s.createElement(tZ.h,{"data-testid":"playbook-cost-breakdown-button",credits:Math.ceil(w/1e3)}),s.createElement(N.nt,{"data-testid":"playbook-cost-breakdown-popup",renderContent:()=>s.createElement(t9,null,s.createElement(B._,{preview:a.testModeEnabled,actions:o}))},s.createElement(N.fI,null,t))),s.createElement(nt,null)):null,(0,es.pd)(n)&&f?s.createElement(s.Fragment,null,s.createElement(N.$n,{icon:"RubberOutline",tooltipText:"Clear table data to start a fresh run",size:"l",disabled:E,round:!0,variant:"flat",onClick:()=>r({type:"ClearDataClicked"})}),s.createElement(nt,null)):null,_,!a.testModeEnabled&&h&&null===a.loadingStatus?s.createElement(N.Jn,{icon:"MinimizeOutline",onClick:l,variant:"flat"}):s.createElement(N.Jn,{onClick:i,"data-tour-id":"builder-close-button",variant:"flat"}))))}),t6={gap:20,width:234,border:"none",boxShadow:"none",flexDirection:"row-reverse",padding:0},t8=(0,c.Ay)(N.fI)`
  align-items: center;
  gap: 16px;
  flex-grow: 1;
`,t5=(0,c.Ay)(N.fI)`
  align-items: center;
  display: flex;
  gap: 20px;
  margin-inline-start: 16px;
  flex-shrink: 0;
`,t7=(0,c.Ay)(N.fI)`
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-width: 150px;
`,t9=(0,c.Ay)(N.h$)`
  animation: 0.3s ease-in-out fadeIn;
  width: 100%;
  max-width: 720px;
`,ne=(0,c.Ay)(tX.w)`
  font-size: 14px;
  font-weight: 500;
  color: ${r.CP};

  ${N.In} {
    flex-shrink: 0;
    ${e=>{let{disabled:t}=e;return t&&ep.z2}}
  }
  &:hover {
    color: ${r.t14};
    --icon-color: ${r.t14};
  }
`,nt=(0,c.Ay)(tQ.H.Divider)`
  height: 65px;
`;var nn=n(93754),na=n(6025),nr=n(48266),ni=n(93100);let nl=["business","enterprise","cloud-triggers","disable-branding"],no=s.memo(function(e){let{enabledFeatures:t,onChange:n}=e,a=s.useCallback((e,a)=>{a?n([...t,e]):n(t.filter(t=>t!==e))},[t,n]);return s.createElement(ns,{$disabled:!1},s.createElement(N.ms,{offset:24,width:420,renderContent:()=>s.createElement(nd,null,s.createElement(nu,null,"Require Paid Features"),s.createElement(np,null,ni.OR.filter(e=>!nl.includes(e.name)).map(e=>s.createElement(nm,{key:e.name},s.createElement(ng,{checked:t.includes(e.name),onChange:t=>a(e.name,t),label:e.description,size:"m"})))))},s.createElement(nc,{icon:"StarGradient",size:"l",tooltipText:"Paid Features",round:!0,variant:"flat"})))}),ns=(0,c.Ay)(ep.e2)`
  margin-right: 16px;
`,nc=(0,c.Ay)(N.$n)`
  --icon-color: ${r.KE7};
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    --icon-color: ${r.KE7};
  }
`,nd=c.Ay.div`
  padding: 16px;
`,nu=c.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${r.Xi8};
  margin: 0 0 16px 0;
`,np=c.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,nm=c.Ay.div`
  width: 100%;
`,ng=(0,c.Ay)(N.Sc)`
  width: 100%;

  span {
    color: ${r.CP};
    font-size: 14px;
    line-height: 1.4;
  }
`;var ny=n(53747);let nf=s.memo(function(e){let{icon:t,subAddon:n,title:r,description:i,subTitle:l,onClick:o,onClear:c,readonly:d}=e,{ref:u,showTooltip:p}=(0,ny.Q)([i]),m=s.createElement(a.P,{ref:u,$small:!0},i),g=p?s.createElement(eZ.m,{content:i,placement:"bottom",delay:500},m):m;return s.createElement(nS,{role:"button",tabIndex:0},s.createElement(nC,{onClick:d?void 0:o},t&&s.createElement(nh,null,s.createElement("div",{style:{position:"relative"}},s.createElement(N.In,{icon:t,size:20}),n&&s.createElement(nb,null,n))),s.createElement(nE,null,s.createElement(N.VP,null,s.createElement(N.fI,{gap:8,style:{flex:1}},s.createElement(a.H6,{style:{flexShrink:0}},r," :"),g),l&&s.createElement(nx,null,l)))),c&&s.createElement(nv,{icon:"CrossOutline",tooltipText:d?"Inputs can not be reset in read-only mode":"Reset",disabled:d,variant:"flat",size:"m",round:!0,onClick:c}))}),nh=c.Ay.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`,nb=c.Ay.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
`,nx=(0,c.Ay)(a.P)`
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.001px;
  width: 100%;
`,nE=c.Ay.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
  ${a.H6} {
    color: var(--title-color);
  }
  ${a.P} {
    color: var(--title-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ${nx} {
    color: var(--description-color);
  }
`,nv=(0,c.Ay)(N.$n)`
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`,nC=c.Ay.div`
  --title-color: ${r.vh3};
  --description-color: ${r.ui$};
  display: flex;
  cursor: pointer;
  gap: 20px;
  padding: 16px 20px 16px 24px;
  align-items: flex-start;
  padding: 16px 32px 16px 24px;
  border-bottom: 1px solid ${r.Tc2};
  background: ${r.o$k};
  transition: background 0.24s ease-in-out;
  &:hover {
    background: ${r.KxS};
    --title-color: ${r.t14};
    --description-color: ${r.b_I};
  }
`,nS=c.Ay.div`
  position: relative;
  &:hover {
    ${nv} {
      opacity: 1;
    }
  }
`,nk=(e,t)=>t?e.statementComment??e.statementName:e.statementName,nw=s.memo(function(e){let{disabled:t,validationErrors:n,onJumpToError:a,open:i,onOpenChange:l,pbArguments:o,onResetAll:c,onResetArgument:d,onJumpToArgumentUsage:u,shouldSavePb:p,readonly:m}=e,g=n[0],[y,f]=s.useState(g?"Issues":"Saved Inputs"),h=o.filter(e=>!!e.value),b="Saved Inputs"===y&&h.length>0;return s.createElement(L.e2,{$disabled:!!t},s.createElement(N.ms,{noPadding:!0,offset:24,width:420,height:620,isOpen:i,placement:"bottom-start",behavior:"flip",onIsOpenChanged:e=>{l(e),e&&f(g?"Issues":"Saved Inputs")},renderContent:e=>{let{close:t}=e;return s.createElement(N.VP,null,s.createElement(N.tU,{active:y,tabs:["Saved Inputs","Issues"],onTabClick:e=>{f(e)},style:{position:"sticky",zIndex:1,top:0}},b&&s.createElement(N.fI,{style:{justifyContent:"flex-end",flexGrow:1,alignItems:"start",padding:6}},s.createElement(N.$n,{tooltipText:m?"Inputs can not be reset in read-only mode":"Reset all",disabled:m,text:"Reset all",variant:"flat",size:"m",round:!0,onClick:c}))),s.createElement(N.VP,null,(()=>{switch(y){case"Issues":if(!g)return s.createElement(nP,{text:"No issues"});return n.map((e,n)=>{let{argumentName:i,status:l,argumentLabel:o,statementIcon:c,statementName:d,statementComment:u}=e;return s.createElement(nf,{key:i+(o||"")+n,subAddon:s.createElement(N.In,{icon:"TriangularExclamationBold",color:r.CCs,size:12}),subTitle:nk({statementName:d,statementComment:u},p),icon:c,title:null!=i?o||i:"",description:(0,es.p0)(l),onClick:()=>{t(),a(e)}})});case"Saved Inputs":if(0===h.length)return s.createElement(nP,{text:"No saved inputs"});return h.map((e,n)=>{let{value:a,usedInStatementArg:r}=e,i=a&&(0,eo.wL)(a)?'"no value"':(0,es.NI)(a),l=r[0],o=r.length,c=l?nk(l,p):"",g=o-1;return s.createElement(nf,{readonly:m,key:e.name+(e.label||"")+n,icon:e.typeHint.typeIcon,title:e.label||e.name,description:i,onClick:()=>{t(),u(e)},onClear:()=>d(e),subTitle:s.createElement(n$,null,s.createElement(nT,null,c),g>0?`(+${g})`:""),subAddon:null})})}})()))}},s.createElement(nI,{icon:g?"TriangularExclamationBold":"RadioMessageBubble",size:"l",tooltipText:g?"Issues":"Saved Inputs",round:!0,variant:"flat",disabled:t,$error:!!g})))}),nA=(0,c.AH)`
  --icon-color: ${r.KE7};
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    --icon-color: ${r.KE7};
  }
`,nI=(0,c.Ay)(N.$n)`
  ${e=>{let{$error:t}=e;return t&&nA}}
`,nP=(0,c.Ay)(N.IU).attrs({disabled:!0})``,n$=c.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,nT=c.Ay.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`,nF=s.memo(function(e){let{children:t,disabled:n}=e;return s.createElement(nR,{$disabled:n},s.createElement(N.In,{icon:"BardeenLogoV2",size:36,style:{margin:11,marginRight:"auto"}}),t)}),nR=c.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&L.z2}}
  flex: 1;
  display: flex;
  align-items: center;
`,nM=c.Ay.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`,nO=c.Ay.div`
  background: linear-gradient(180deg, #fff 49%, rgba(255, 255, 255, 0) 100%);
  align-items: center;
  display: flex;
  padding: 32px;
  width: 100%;
  ${N.lM} {
    [role="switch"] {
      gap: 16px;
    }
  }
`,n_=c.Ay.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 24px;
  justify-content: flex-end;
  margin-inline-start: 16px;
`,nN=s.memo(function(e){let{state:t,pb:n,dispatch:a,onClose:r,onMinimize:i}=e,{testModeEnabled:l,runCompletedId:o}=t,c=(0,es.ij)(n,t.origin),d=(0,es.uC)(c),u=$.rD().featureFlags?.devTools,{errors:p,statements:m}=n,{customPaidFeatures:g,needsEditing:y}=n.meta,f=$.rD().settings?.hasSeenStudioTestToggle,h=(0,$.jL)(),b=(0,es.dG)(t),x=t.sequencingStatus,E=eo.py.isIdle(x),v=eo.py.isPreparing(x),C=eo.py.isRunning(x),S=eo.py.isFilling(x),k=eo.py.isPausing(x),w=C||S,A=null!==t.loadingStatus||v,I=w?"Please pause or exit the test mode before saving your automation.":0===m.length?"Add at least one action (no trigger) to your automation to be able to save.":null,P=s.useCallback(e=>a({type:"ClickedJumpToError",error:e}),[a]),T=s.useCallback(e=>{if("Escape"===e.key)a({type:"SearchClosed"});else if("ArrowDown"===e.key)e.preventDefault(),a({type:"SearchSelectedIndexChanged",index:t.searchSelectedIndex>=t.searchSuggestions.length-1?0:t.searchSelectedIndex+1});else if("ArrowUp"===e.key)e.preventDefault(),a({type:"SearchSelectedIndexChanged",index:t.searchSelectedIndex<=0?t.searchSuggestions.length-1:t.searchSelectedIndex-1});else if("Enter"===e.key&&t.searchSelectedIndex>=0&&t.searchSuggestions[t.searchSelectedIndex]){let e=t.searchSuggestions[t.searchSelectedIndex];e&&(a({type:"SearchSuggestionSelected",index:e.index}),a({type:"SearchClosed"}))}},[t.searchSelectedIndex,t.searchSuggestions,a]),F=s.useCallback(e=>{a({type:"SearchSuggestionSelected",index:e}),a({type:"SearchClosed"})},[a]),R=s.useCallback(e=>{a({type:"SearchSelectedIndexChanged",index:e})},[a]),M=s.useMemo(()=>null!=n.trigger?l?"Test Playbook":c.shouldDeactivateTrigger?"Activate Playbook":n.fromSnapshot?"Continue":n.triggerState?.status==="running"||n.triggerState?.status==="pending"?null:"Activate Playbook":l?"Test Playbook":n.fromSnapshot?"Continue":"Run Playbook",[l,n,c.shouldDeactivateTrigger]),O="Continue"===M&&(0,es.EP)(n),_=0===m.length,B=_||!!y,D=!E||null!==t.loadingStatus||_,H=b||A||k,z=O||B||H,U=H||w,V=(0,tY.Am)("finishedStatements"in t.sequencingStatus&&t.sequencingStatus.finishedStatements||[]),q="totalStatementsCount"in t.sequencingStatus?t.sequencingStatus.totalStatementsCount:m.length,j=w?s.createElement(t0,{completedSteps:V.length+("running"===t.sequencingStatus.type?t.sequencingStatus.statementProgress:0),totalSteps:q,onPause:()=>a({type:"ClickedPauseV2"})}):o?s.createElement(t1,{onClick:()=>a({type:"ExecutionCompletedAnimationFinished",runCompletedId:o})},t.testModeEnabled?"Test-Run Complete":"Run Complete"):t.searchOpen?s.createElement(L.e2,{style:{marginLeft:"32px",padding:"4px"}},s.createElement(N.ms,{isOpen:t.searchOpen,onIsOpenChanged:e=>{e||a({type:"SearchClosed"})},placement:"bottom",width:517,height:300,renderHeader:()=>s.createElement(N.dN.Flat,{fullWidth:!0,value:t.searchValue,onChange:e=>a({type:"SearchValueChanged",value:e}),placeholder:"Search actions...",addonBefore:s.createElement(nr.In,{icon:"MagnifierOutline"}),size:"xl",autoFocus:!0,onKeyDown:T}),renderContent:e=>{let{close:n}=e;return s.createElement("div",{style:{backgroundColor:"white"}},0===t.searchSuggestions.length&&s.createElement(N.IU,{text:"No actions found"}),t.searchSuggestions.map((e,a)=>s.createElement(N.IU,{key:e.index,icon:e.icon,text:e.displayName,active:a===t.searchSelectedIndex,rightAddon:s.createElement(nH,{$active:a===t.searchSelectedIndex},e.actionNumber),onClick:()=>{F(e.index),n()},onMouseEnter:()=>R(a)})))}},s.createElement("div",{style:{position:"absolute",top:"16px",left:"50%"}}))):s.createElement(s.Fragment,null,s.createElement(L.e2,{$disabled:H,style:{gap:26},onClick:()=>h({type:"Builder/InteractedWithTestModeToggle"})},M?s.createElement(N.$n,{disabled:z,text:M,size:"l",round:!0,variant:z?"flat":"primary","data-tour-id":"playbook-test-button","data-testid":"playbook-run-button",onClick:()=>{a({type:"ClickedRunPlaybook",postRunActions:[],forceValidatePlaybook:!1,testMode:t.testModeEnabled,autobookBehaviour:M.startsWith("Activate")?"activate":"run",runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}})}}):s.createElement(nz,{trigger:n.triggerState,pbId:n.meta.id,from:t.origin.from,disabled:H}),s.createElement(eZ.m,{key:String(f),size:"l",content:s.createElement(nB,{onClose:()=>h({type:"Builder/TestModeTooltipGotItClicked"}),showGotIt:!f}),forceOpen:!f,placement:"bottom",delay:1500},s.createElement(nD,{disabled:U,checked:l,onChange:()=>a({type:"TestModeToggled"}),label:"Test mode",size:"m"}))));return s.createElement(nM,null,s.createElement(nO,{"data-testid":"title-bar"},s.createElement(nF,{disabled:D},t.searchOpen||A?null:s.createElement(L.e2,{style:{marginRight:16}},s.createElement(eZ.m,{content:"Search"},s.createElement(N.$n,{text:"",size:"l",icon:"MagnifierOutline","data-testid":"search-button",round:!0,variant:"flat",onClick:()=>a({type:"SearchOpened"})})))),j,!f&&s.createElement("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0, 0, 0, 0.3)",zIndex:10}}),s.createElement(n_,null,!t.searchOpen&&s.createElement(N.fI,{style:{flexGrow:1,justifyItems:"flex-start"}},u&&!A?s.createElement(no,{enabledFeatures:g??[],onChange:e=>a({type:"UpdatePaidFeatures",features:e})}):null,s.createElement(nw,{open:t.savedInputsMenuOpen,onOpenChange:e=>a({type:"Builder/SavedInputsMenuOpenChanged",open:e}),readonly:b,pbArguments:n.args,validationErrors:p,disabled:D,onJumpToError:P,onResetAll:()=>a({type:"PlaybookArgsAction",action:{type:nn.A.ResetAllArgumentsClicked}}),onResetArgument:e=>a({type:"PlaybookArgsAction",action:{type:nn.A.ResetArgumentClicked,arg:e}}),onJumpToArgumentUsage:e=>a({type:"ClickedOnSavedArgument",arg:e}),shouldSavePb:d})),s.createElement(L.e2,null,d&&!b&&!I&&s.createElement(N.$n,{text:"Save",size:"l",round:!0,variant:"primary",onClick:()=>a({type:"ClickedSavePlaybook"}),disabled:H,"data-tour-id":"playbook-save-button"}),!l&&C&&null===t.loadingStatus?s.createElement(N.Jn,{icon:"MinimizeOutline",onClick:i,disabled:H,variant:"flat"}):s.createElement(N.Jn,{onClick:r,"data-tour-id":"builder-close-button",variant:"flat"})))))}),nB=e=>{let{onClose:t,showGotIt:n}=e;return s.createElement(N.VP,{gap:24},s.createElement(N.VP,{gap:20},s.createElement(a.H5,{$color:r.ONy},"Test Mode"),s.createElement(a.P,{$small:!0,$color:r.ONy,style:{lineHeight:"24px"}},"It won't use credits but limits each action to 5 outputs.")),n&&s.createElement(N.$n,{text:"Got it",size:"l",round:!0,variant:"primary",onClick:t,style:{marginBlock:8}}))},nD=(0,c.Ay)(N.lM)`
  font-size: 15px;
  padding-right: 18px;
  font-weight: 500;
`,nH=c.Ay.div`
  font-size: 12px;
  font-weight: 500;
  min-width: 20px;
  color: ${e=>e.$active?r.t14:r.ui$};
`,nz=(0,c.Ay)(function(e){let t=(0,$.jL)(),{trigger:n,pbId:a,from:r,disabled:i,...l}=e;return n?.status!=="running"&&n?.status!=="pending"?null:s.createElement(N.lM,{...l,disabled:i,label:n?.status==="running"?"Active":"Pending",checked:n?.status==="running"||n?.status==="pending",onChange:()=>t({type:"App/AutobookToggleClicked",pbId:a,from:r}),size:"m"})})`
  background-color: ${r.IhC};
  border-radius: 20px;
  padding: 10px 17px;
  border: 1px solid ${r.N9b};
  font-weight: 500;

  &:hover {
    color: ${r.J5m};
    border-color: ${r.wKm};
  }

  opacity: ${e=>{let{trigger:t}=e;return t?.status==="pending"?.32:1}};
  pointer-events: ${e=>{let{trigger:t}=e;return t?.status==="pending"?"none":"auto"}};
`,nL={addonState:z.ue,currentRequest:null,suggestions:u.j.NotAsked};function nU(e){nJ=0;let t=e.ast?(0,es.Vl)(e.ast):(0,es.Ui)(),n=(0,es.Ui)(),a="my"===e.from||"rightClickMenu"===e.from||"resume"===e.from,r={runCompletedId:null,miniViewState:{rowBodyState:null,selectedRowsIndices:[],expandedRowIndices:[],sidebarOpen:!0},loadingStatus:e.loadingStatus??null,previousActions:[],origin:{from:e.from??"blank",initPlaybook:e.ast?(0,es.Vl)(e.ast):null,lastDescribedPlaybook:(0,es.a4)(t)?t:null,trackInvocationWhenSaved:e.trackInvocationWhenSaved??!0},testModeEnabled:!a&&"results"!==e.from,resultsFromTestMode:!1,confirmState:null,activeIndex:0,scrollTop:0,history:[{prompt:(0,es.BH)(e.ast),generatedPlaybook:n,ast:t}],cardEditorState:null,argumentFillingState:{addonState:z.ue,currentRequest:null,suggestions:u.j.NotAsked},pbHeaderVisible:!1,missingPluginsModal:null,sequencingStatus:{type:"idle"},playbookArgsState:nn.ue,reportIssueState:na.f,searchOpen:!1,searchValue:"",searchSuggestions:[],searchSelectedIndex:-1,savedInputsMenuOpen:!1,runHistory:[],partialState:{},sidebarMemory:{uncheckedExportStatement:null,uncheckedTriggerStatement:null}};return{...r,sequencingStatus:e.runRecordId?{type:"running",postRunActions:[],executionId:(0,d.A)(),runRecordId:e.runRecordId,statementIndex:(0,es.ZL)(r),statementProgress:0,startedStatements:[(0,es.ZL)(r)],finishedStatements:[],totalStatementsCount:(0,es.nO)(t).length,runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}:{type:"idle"}}}let nV=(e,t,n)=>{let a=t.builderV2State,r=e=>({...t,builderV2State:{...a,...e}});switch(e.type){case"ClearDataClicked":return a=at(a=(0,es.YM)(a,e=>({...e,columnData:{columns:[],status:"invalid"}}))),[r(a=(0,es.Bf)(a,e=>({...e,fromSnapshot:void 0}))),[]];case"TestModeToggled":{let e=!a.testModeEnabled;return[r({...a=(0,es.kw)(a,e=>({...e,entry:null,columnData:{columns:[],status:"invalid"}})),testModeEnabled:e}),[eF.J$(a,e)]]}case"ForceRevalidatePlaybook":return[t,[nZ(a,{invalidateCache:!0})]];case"PreviousActions/Requested":{let n=H.i2(t)??n9(a)??(0,es.Pv)(a),i=(0,es.Zg)(n,e.statementIndex),l=(t.config.featureFlags.v4MiniEnabled?eT.OO:eT.ad)(i,e.typeHint,e=>({type:"PreviousActions/Fetched",suggestions:e}));return[r({previousActions:[]}),[l]]}case"PreviousActions/Fetched":return[r({previousActions:e.suggestions}),[]];case"FunctionStatementAction":{let n=[],{index:i,type:l}=e,o=(0,es.YM)(a,r=>{if(r.index===i){"AddonAction"===e.action.type&&"Categorizer/Open"===e.action.action.type&&nJ++;let[o,s]=eq.Ff(e.action,r,(0,es.Pv)(a),a.origin,t.config);(0,p.tM)(n,s.map(R.zy(e=>({type:l,action:e,index:i}))));let c=e.action;return"AddonAction"===c.type&&"CategorizerPreviewTrigger"===c.action.type&&(0,p.tM)(n,[async e=>{let{dispatch:t}=e;return t(c)}]),{...r,...o}}return r}),s=t.notifications||[];return"ChangedArgument"===e.action.type?(o=(0,es.yu)((0,es.Bf)(o,t=>(0,es.Ej)(t,e.index))),n.push(nZ(o,{debounce:e.action.debounce}))):"RequestSuggestionsError"===e.action.type&&(s=O.$.addError(s,m.sF.from(e.action.msg).toJSON())),[{...r(o),notifications:s},n]}case"AddonAction":{let n=(0,es.Pv)(a);"Categorizer/Open"===e.action.type&&nJ++;let[i,l]=z.Ff(e.action,a.argumentFillingState.addonState,n,t.config),o=l.map(R.zy(t=>({type:e.type,action:t}))),s=e.action;if("CategorizerPreviewTrigger"===s.type){let{statementIndex:e,onDone:t}=s;o.push(async n=>{let{dispatch:a}=n;return a({type:"CategorizerDataRequested",statementIndex:e,onDone:t})})}return[r({argumentFillingState:{...a.argumentFillingState,addonState:i}}),o]}case"ClickedRunPlaybook":{let n=e.testMode??a.testModeEnabled,i=(0,es.YM)(a,e=>({...e,entry:null}));i={...i=(0,es.GB)({...(0,es.yu)(a)},e=>"config"!==e.save||e.value?e:{...e,value:null,save:"nowhere"}),testModeEnabled:n};let l=(0,es.Pv)(i),o=(0,T.pO)(l,t.config);if(n&&"MissingPlugins"===o.type||!n&&"None"!==o.type)return[(0,T.ss)(t,o,e.runParams),[]];let s=nX(l,e.runParams.targetIndex),c=async e=>{let{api:t}=e;a.origin.trackInvocationWhenSaved&&await t.trackPlaybookStartInvocation(l.meta.id,{runFrom:a.origin.from,needsConfig:l.args.some(e=>!e.value&&"nowhere"!==e.save),run_mode:!n,continue_mode:!!l.fromSnapshot,arguments_to_fill:s.length,plugins_to_connect:"MissingPlugins"===o.type?o.plugins.map(e=>e.factoryId):[],screen_size:{width:window.screen.width,height:window.screen.height}})};if(s.length>0){i=(0,es.GR)({...a,sequencingStatus:{type:"filling",activeIndex:0,arguments:s,runParams:e.runParams,autobookBehaviour:e.autobookBehaviour,postRunActions:e.postRunActions??[]}},s[0]?s[0].statementIndex:(0,es.ZL)(i));let t=s[0]?eT.ZZ(s[0].argumentName):eT.yi((0,es.ZL)(i));return[r(i),[c,t]]}if(t.config.featureFlags.v4MiniEnabled&&t.config.subscription&&!g.Zh(t.config.subscription,l))return[{...r(i),overlayModal:{type:"premiumFeature"}},[]];if(e.forceValidatePlaybook)return[r({}),[nZ(i,{debounce:!0,postValidateActions:[{...e,forceValidatePlaybook:!1}]})]];let[d,u]=n1({...t,builderV2State:i},e.runParams,e.autobookBehaviour,e,e.postRunActions??[]);return[d,[c,...u]]}case"AutobookActivationFinished":return[r((0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"}})),[async e=>{let{dispatch:t}=e;return n5(a).forEach(t)}]];case"AutobookActivationCanceled":return[r((0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"}})),[]];case"PlaybookSaved":{let n=(0,P.xd)(t.playbooksState,t=>t.legacyId===e.pb.meta.id?{...t,...e.pb.meta}:t),{sequencingStatus:i}=a,l=(0,es.mY)(e.pb,{...a,origin:{...a.origin,initPlaybook:(0,es.Vl)(e.pb)}});if(eo.py.isPreparing(i)&&e.executionId===i.executionId){let e=(0,es.Pv)(l),n=(0,es.f$)(l)&&"run"!==i.autobookBehaviour,a=at(l);return a=n3(a),(0,es.EP)(e)&&!t.config.featureFlags.v4MiniEnabled&&(a=(0,es.Bf)(a,e=>({...e,fromSnapshot:void 0}))),[{...r({...a,sequencingStatus:{...i,loadingStatus:"Preparing"},loadingStatus:n?"autobook-activating":null,miniViewState:{...a.miniViewState,expandedRowIndices:[]}}),modal:D.$h},[...n6(a,i.executionId,n,ai(t))]]}if(t.config.featureFlags.v4MiniEnabled&&e.pb.meta.id!==(0,es.Pv)(a).meta.id)return[{...t,playbooksState:n},[]];return[{...r({...(0,es.YM)(l,e=>({...e,entry:null,status:"idle",tableEntry:null})),sequencingStatus:{type:"idle"},loadingStatus:null}),modal:D.$h,playbooksState:n},[]]}case"HeaderClicked":{let n=(0,es.Pv)(a).statements.find(t=>t.index===e.index);if(!n)return[t,[]];let r=(0,es.Pv)(a),i=H.Yb(n,r,"Outputs");return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:i}},[]]}case"CardHeaderClicked":{let n=[],r=(0,es.kw)(a,t=>"expanded"in t&&t.index===e.index?{...t,expanded:!t.expanded}:t),i=(0,es.Pv)(a).statements.filter(e=>"FunctionCallStatement"===e.type).find(t=>t.index===e.index);if(i&&!i.expanded){let t=null;i.entry&&"type"in i.entry&&"result"===i.entry.type&&"success"===i.entry.result.type&&(t=i.entry.result.breakdown),n.push(eF.Ve(a,e.index,t))}return[{...t,builderV2State:r},n]}case"PreviewFinished":return[r(a),[eF.yZ(a,"builder.test-action",e.statementIndex)]];case"ClickedTabHeader":return[r((0,es.YM)(a,t=>t.index===e.index?{...t,selectedTab:e.tab}:t)),[]];case"ValidatedPlaybookFetched":case"UpdatePlaybookAstAndContinue":return[r((0,es.w3)(e.pb,a)),[]];case"ConnectAppSuccess":{let t=eT.WA((0,es.Pv)(a),!1,0,e=>[{type:"UpdatePlaybookAstAndContinue",pb:e}]),n=a.missingPluginsModal?{...a.missingPluginsModal,plugins:a.missingPluginsModal.plugins.filter(t=>t.factoryId!==e.app.factoryId)}:null,i=n?.plugins.length===0;return[r({missingPluginsModal:i?null:n}),i?[eT.K2([t,async function(e){let{dispatch:t}=e,{runParams:r,autobookBehaviour:i}=n;t({type:"ClickedRunPlaybook",autobookBehaviour:i,forceValidatePlaybook:!1,testMode:a.testModeEnabled,runParams:r})}],200)]:[t]]}case"ConnectAppFailed":return[r({missingPluginsModal:a.missingPluginsModal?{...a.missingPluginsModal,plugins:a.missingPluginsModal.plugins.map(t=>t.factoryId===e.app.factoryId?{...t,error:e.message,status:"error"}:t)}:null}),[eT.WA((0,es.Pv)(a),!1,0,e=>[{type:"UpdatePlaybookAstAndContinue",pb:e}])]];case"Sequence/ArgumentUpdate":{let t={...(0,es.Zq)(a,e.arg),argumentFillingState:{...a.argumentFillingState,addonState:z.ue}};return[r(t),[nZ(t,{debounce:!0})]]}case"Sequence/ArgumentSave":{let t=(0,es.Zq)(a,e.arg),n=n2(t),i=a.sequencingStatus;if(null!==n){let{index:e,argument:a,shouldFocus:i}=n;return[r(t=(0,es.GR)({...t,sequencingStatus:{...t.sequencingStatus,..."filling"===t.sequencingStatus.type?{activeIndex:e}:{}}},a.statementIndex)),[i?eT.K2([eT.ZZ(a.argumentName),nZ(t)],250):nZ(t)]]}let l="filling"===a.sequencingStatus.type?a.sequencingStatus:null;return n1(r(t),l?.runParams??{targetIndex:null,defaultCacheBehavior:"default",limitResults:null},l?.autobookBehaviour??"activate",e,"postRunActions"in i?i.postRunActions:[])}case"Sequence/SkipArgument":{let t=(0,es.Zq)(a,{...e.arg,value:(0,eo.kx)()}),n=n2(t),i=t.sequencingStatus;if(null!==n){let{index:e,argument:a,shouldFocus:l}=n;return[r(t=(0,es.GR)({...t,sequencingStatus:{...i,..."filling"===i.type?{activeIndex:e}:{}}},a.statementIndex)),[l?eT.K2([nZ(t),eT.ZZ(a.argumentName)],250):nZ(t)]]}let l="filling"===a.sequencingStatus.type?a.sequencingStatus:null;return n1(r(t),l?.runParams??{targetIndex:null,defaultCacheBehavior:"default",limitResults:null},l?.autobookBehaviour??"activate",e,"postRunActions"in i?i.postRunActions:[])}case"Sequence/PreviousArgument":{let e=n4(a);if(null===e)return[t,[]];let{index:n,argument:i,shouldFocus:l}=e;return[r((0,es.GR)({...a,sequencingStatus:{...a.sequencingStatus,..."filling"===a.sequencingStatus.type?{activeIndex:n}:{}},argumentFillingState:{...a.argumentFillingState,addonState:z.ue}},i.statementIndex)),l?[eT.ZZ(i.argumentName)]:[]]}case"DeleteConditionalClicked":{let n=(0,es.Pv)(a),i=(0,es.Xc)(n,e.index);if(!i||!(0,eo.aX)(i))return[t,[]];let{ifTrue:l,ifFalse:o}=i,s=(0,eo.XW)(l)&&l.children.length>0,c=(0,eo.XW)(o)&&o.children.length>0,d=e.confirmedToKeep??(s&&c?null:s?"ifTrue":"ifFalse");if(!d)return[r({...a,confirmState:{type:"Confirm",cancel:{text:"Keep false branch",action:{...e,confirmedToKeep:"ifFalse"}},confirm:{text:"Keep true branch",action:{...e,confirmedToKeep:"ifTrue"}},closeAction:{type:"ClickedCancelConfirmation"},header:"Delete conditional",message:"This conditional has two branches. Which do you want to keep?"}}),[]];let u=(0,es.p)(n.statements,t=>t.index===e.index&&(0,eo.aX)(t)?(0,eo.XW)(t[d])?t[d].children:[]:t),p=(0,es.Ll)((0,es.yu)((0,es.w3)({...n,statements:u},a))),m=[nZ(p=n7(p,e.index)),eF.N0(p,e.index)];return[r({...p,confirmState:null}),m]}case"DeleteLoopClicked":{let n=(0,es.Pv)(a),i=(0,es.Xc)(n,e.index);if(!i||!(0,eo.r)(i))return[t,[]];let l=(0,es.p)(n.statements,t=>t.index===e.index&&(0,eo.r)(t)?(0,eo.XW)(t.body)?t.body.children:[]:t),o=(0,es.Ll)((0,es.yu)((0,es.w3)({...n,statements:l},a))),s=[nZ(o=n7(o,e.index)),eF.N0(o,e.index)];return[r({...o}),s]}case"DuplicateStatementClicked":{let n=(0,es.Pv)(a),i=(0,es.Re)(n),l=(e,t)=>a=>{if(a.index===e){let e={...a,index:t},r=(0,y.n)(n);if("BlockStatement"!==e.type&&(e.varName=r),"FunctionCallStatement"===e.type){let t="FunctionCallStatement"===a.type?a.varName:"";e.entry=null,e.status="idle",e.groupIndex=i,e.columnData={status:"invalid"},e.columns=(0,es.Su)(n,e.columns,t,r)}return[a,e]}return[a]},o=(0,f.Co)({...n,statements:(0,es.p)(n.statements,l(e.index,i))},{transformBlockStatement:t=>({...t,children:(0,es.p)(t.children,l(e.index,i))})}),s=(ai(t)?es.ZA:es.Bf)(a,()=>o);if(ai(t))return[{...t,builderV2State:s},[nZ(s)]];let c=[nZ(s),eT.yi(i)];return[r(s),c]}case"StatementNameChanged":{let t=(0,es.Pv)(a),n=(0,f.Co)(t,{transformFunctionCallStatement:t=>{if(t.index===e.index){let n={...t.commentFlags,keep:!!e.name};return{...t,comment:e.name,commentFlags:n}}return t}});return[{...r((0,es.w3)(n,a)),confirmState:null},[]]}case"DeleteStatementClicked":{let n=(0,es.Pv)(a),i=(0,es.md)(n,e.indexes);if(i.length>0&&!e.confirmed)return[r({confirmState:{type:"delete",cancel:{text:"Cancel",action:{type:"ClickedCancelConfirmation"}},confirm:{text:"Delete",action:{...e,confirmed:!0}},header:"Delete card",message:"This card is used by other actions. Deleting it will remove these references:",references:i}}),[]];let l=(0,es.gN)(n).filter(t=>e.indexes.includes(t.index)).flatMap(e=>"FunctionCallStatement"===e.type?e.varName:null),o=e.indexes,s=(0,f.Co)(n,{transformBlockStatement:e=>o.includes(e.index)?null:e,transformForStatement:e=>o.includes(e.index)?null:e,transformFunctionCallStatement:e=>o.includes(e.index)?null:e,transformIfStatement:e=>o.includes(e.index)?null:e,transformVarRefExpression:e=>l.includes(e.name)?{type:"MissingExpression"}:e}),c=(0,es.Ll)((0,es.yu)((0,es.w3)(s,a,ai(t))));for(let t of e.indexes)c=n7(c,t);let d=[nZ(c),...e.indexes.map(e=>eF.N0(a,e))],u=r({...c,confirmState:null});if(ai(t))return[u,[]];return[u,d]}case"BranchClicked":return[r((0,es.Ck)(a,t=>t.index===e.index?{...t,currentBranch:e.branch,expanded:!0}:t)),[]];case"AddCard/Started":return[r({...a,cardEditorState:ee.U("command",e.index,e.inside)}),[eT.iC("command",e=>({type:"AddCard/QuerySuccess",apps:e}))]];case"AddCard/Trigger":return[r({...a,cardEditorState:ee.U("trigger",-2,!1)}),[eT.iC("trigger",e=>({type:"AddCard/QuerySuccess",apps:e}))]];case"AddCard/SelectedApp":if(a.cardEditorState?.type!=="addCard")return[t,[]];return[r({cardEditorState:{...a.cardEditorState,selectedApp:e.app,searchInput:""}}),[]];case"AddCard/UpdatedInput":if(a.cardEditorState?.type!=="addCard")return[t,[]];return[r({cardEditorState:{...a.cardEditorState,searchInput:e.input}}),[]];case"AddCard/QuerySuccess":if(!a.cardEditorState||"addCard"!==a.cardEditorState.type)return[t,[]];return[r({cardEditorState:{...a.cardEditorState,apps:e.apps,commandsLoading:!1}}),[]];case"AddCard/SelectedCommand":{if(!a.cardEditorState||"addCard"!==a.cardEditorState.type)return[t,[]];let n=[("command"===a.cardEditorState.mode?eT.gm:eT.cr)(e.command,a,(e,t)=>({type:"AddCard/CreateSuccess",newState:e,index:t}))];return[r(a),n]}case"AddCard/CreateSuccess":{let n=[nZ(e.newState)];if(!a.cardEditorState)return[t,[]];return a={...e.newState,cardEditorState:null},n.push(eT.yi(e.index)),[r(a),n]}case"CardEditor/LoopSaved":{let e=a.cardEditorState;if(!e||"loop"!==e.type)return[t,[]];let{targetIndex:n,statement:i}=e,l=(0,f.Co)(e.pb,{transformForStatement:e=>e.index===i.index?i:e});a=n7(a=(0,es.w3)(l,a),n);let o=[eF.aX("create"===e.mode?"add":"edit",a,n),nZ(a)];return[r({...a,cardEditorState:null}),o]}case"CardEditor/ConditionalSaved":{let e=a.cardEditorState;if(!e||"conditional"!==e.type)return[t,[]];let{pb:n,statement:i}=e,{index:l}=i;"create"===e.mode&&(n=(0,es._c)(n,i,e.belowStatementsGoTo)),a=n7(a=(0,es.w3)(n,a),l);let o=[eF.sB("create"===e.mode?"add":"edit",a,l),nZ(a)];return[r({...a,cardEditorState:null}),o]}case"AddCard/Closed":return[r({cardEditorState:null}),[]];case"Conditional/EditOpen":return[r({cardEditorState:{type:"conditional",mode:"edit",operators:u.j.NotAsked,suggestions:u.j.NotAsked,pb:{...(0,es.Pv)(a)},statement:e.statement,playbookArgsState:nn.ue}}),[]];case"ConditionalCardAction":{let{cardEditorState:n}=a;if(!n||"conditional"!==n.type)return[t,[]];let[i,l]=el.Ff(n,e.action),o=l.map(R.zy(t=>({type:e.type,action:t})));return[r({cardEditorState:i}),o]}case"Conditional/CreateOpen":{let n=(0,es.Re)((0,es.Pv)(a)),r=(0,y.n)((0,es.Pv)(a)),i=(0,es.Pv)(a),l={...el.VX(n,"If true"),varName:r},o=t=>(0,es.Hy)(t,l,e.index,e.inside),s=(0,f.Co)({...i,statements:o(i.statements)},{transformBlockStatement:t=>-1===e.index?t:{...t,children:o(t.children)}});return[t,[async e=>{let{api:t,dispatch:a}=e,r=await eT.Dl(s,!1,t),i=l,o=(0,f.Co)(r,{transformIfStatement:e=>(n===e.index&&(i=e),e)});a({type:"Conditional/OpenSuccess",conditionalState:{type:"conditional",mode:"create",statement:i,operators:u.j.NotAsked,suggestions:u.j.NotAsked,pb:o,belowStatementsGoTo:"stay",playbookArgsState:nn.ue}})}]]}case"Conditional/OpenSuccess":return[r({cardEditorState:e.conditionalState}),[]];case"LoopCard/EditOpen":{let n=(0,es.Pv)(a),i=null;(0,f.bZ)(n,{visitForStatement:t=>{let n=t.index===e.index;return n&&(i=t),!n}});let l=i;if(!l)return[t,[]];return[r({cardEditorState:{type:"loop",mode:"edit",targetIndex:e.index,pb:n,statement:l}}),[]]}case"LoopCard/CreateOpen":{let n=(0,es.Re)((0,es.Pv)(a)),r=(0,y.n)((0,es.Pv)(a)),i=(0,es.Pv)(a),l={...em(n,"temporary for statement comment"),varName:r},o=(0,f.Co)({...i,statements:-1===e.index?[l,...i.statements]:(0,es.Hy)(i.statements,l,e.index,e.inside)},{transformBlockStatement:t=>-1===e.index?t:{...t,children:(0,es.Hy)(t.children,l,e.index,e.inside)}});return[t,[async t=>{let{api:n,dispatch:a}=t,r=await eT.Dl(o,!1,n),i={...l};a({type:"LoopCard/OpenSuccess",state:{type:"loop",mode:"create",pb:(0,f.Co)(r,{transformForStatement:e=>{if(e.comment===l.comment){let t={...e,comment:"For each"};return i=t,t}return e}}),statement:i,targetIndex:e.index}})}]]}case"LoopCard/OpenSuccess":return[r({cardEditorState:e.state}),[]];case"LoopCardAction":{let{cardEditorState:n}=a;if(!n||"loop"!==n.type)return[t,[]];let[i,l]=eg(n,e.action),o=l.map(R.zy(t=>({type:e.type,action:t})));return[r({cardEditorState:i}),o]}case"UserChangedPbMeta":{let n=(ai(t)?es.ZA:es.Bf)(a,t=>{let n={...t.meta,...e.meta};return{...t,meta:n}});if(ai(t))return[{...t,builderV2State:n},[]];return[r({...n}),[]]}case"ClickedJumpToError":{let n,i;if(ai(t))return[t,[eT.Yt(e.error.statementIndex)]];let l=(0,es.kw)(a,t=>{let{statementIndex:r,status:l}=e.error;if((0,es.Zg)((0,es.Pv)(a),r).map(e=>e.index).includes(t.index)&&"expanded"in t&&(t={...t,expanded:!0}),t.index===r)switch(t.type){case"FunctionCallStatement":return{...t,selectedTab:"Customize",expanded:!0};case"BlockStatement":break;case"ForStatement":("missing"!==l.type||"BCL:EmptyLoop"!==l.error.name)&&(i=t);break;case"IfStatement":n=t}return t});n?l={...l,cardEditorState:{type:"conditional",mode:"edit",operators:u.j.NotAsked,suggestions:u.j.NotAsked,pb:{...(0,es.Pv)(a)},statement:n,playbookArgsState:nn.ue}}:i&&(l={...l,cardEditorState:{type:"loop",mode:"edit",targetIndex:i.index,pb:{...(0,es.Pv)(a)},statement:i}});let o=e.error.argumentName?eT.hD(e.error.statementIndex,e.error.argumentName):eT.yi(e.error.statementIndex);return[r((0,es.GR)(l,e.error.statementIndex)),[(0,I.rF)(o,300)]]}case"ClickedJumpToFirstError":return[t,[async e=>{let{dispatch:t}=e,n=(0,es.Pv)(a).errors[0];n&&t({type:"ClickedJumpToError",error:n})}]];case"ClickedOnSavedArgument":{let{arg:n}=e,{usedInStatementArg:i}=n,l=i[0];if(!l)return[t,[]];let o=(0,es.kw)(a,e=>e.index===l.index?{...e,selectedTab:"Customize",expanded:!0}:e);return[r((0,es.GR)(o,l.index)),[eT.hD(l.index,l.argName)]]}case"ClickedJumpToReference":return[r((0,es.GR)(a,e.statementIndex)),[(0,I.rF)(eT.yi(e.statementIndex),300)]];case"ScrollToPbHeaderChanged":return[r({pbHeaderVisible:e.visible}),[]];case"ClickedOnGroupCard":{let t=(0,f.Co)((0,es.Pv)(a),{transformFunctionCallStatement:t=>t.groupIndex===e.groupIndex?{...t,isGroupCardOpen:!t.isGroupCardOpen}:t});return[r((0,es.Bf)(a,()=>t)),[]]}case"ClickedCancelConfirmation":return[r({confirmState:null}),[]];case"UpdatePaidFeatures":return[r((0,es.Bf)(a,t=>({...t,meta:{...t.meta,customPaidFeatures:e.features}}))),[]];case"CardDroppedOnConnector":{let{draggedIndex:n,targetIndex:i,inside:l}=e;if(n===i)return[t,[]];let o=(0,es.Pv)(a),s=(0,es.Xc)(o,n);if(!s||"BlockStatement"===s.type)return[t,[]];let c=(0,es.Re)(o),d={...s,index:c},u=o;if("firstcard"===i||-1===i)u={...u,statements:[d,...u.statements]};else{let e=e=>(0,es.Hy)(e,d,i,l);u=(0,f.Co)({...o,statements:e(o.statements)},{transformBlockStatement:t=>({...t,children:e(t.children)})})}u=(0,f.Co)(u,{transformIfStatement:e=>e.index===n?null:e,transformForStatement:e=>e.index===n?null:e,transformFunctionCallStatement:e=>e.index===n?null:e});let p=(0,es.Bf)(a,()=>u);return[r(p),[nZ(p)]]}case"PlaybookPreviewStarted":{let{runParams:t,postRunActions:n}=e,i=(0,d.A)(),l=n3({...a,sequencingStatus:{type:"preparing",executionId:i,postRunActions:n,loadingStatus:"Preparing",autobookBehaviour:"run",runParams:t}});return[r(l),[(0,M.wO)({ast:(0,es.qO)((0,es.Pv)(l)),params:t,executionId:i,onData:e=>({type:"GotResults",result:e,executionId:i}),onDone:()=>({type:"PlaybookPreviewFinished",executionId:i,targetIndex:t.targetIndex}),onCancel:()=>({type:"PlaybookPreviewCancelled",executionId:i}),onError:e=>({type:"PlaybookPreviewFailed",executionId:i,error:e.toJSON()})}),eT.yi((0,es.ZL)(a))]]}case"PlaybookSnapshotLoadFailed":case"PlaybookExecutionFailed":case"PlaybookPreviewFailed":return[{...r((0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"}})),notifications:O.$.addError(t.notifications||[],e.error)},[]];case"AutobookActivationFailed":return[{...r((0,es.rf)((0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"}}),e.error)),notifications:O.$.addError(t.notifications||[],e.error)},[eT.yi((0,es.ZL)(a))]];case"PlaybookExecutionCanceled":return[{...r((0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"}})),notifications:[O.$.info("Playbook run canceled")]},[]];case"PlaybookPreviewCancelled":return[{...r({loadingStatus:null,sequencingStatus:{type:"idle"}}),notifications:[O.$.info("Playbook test cancelled")]},[]];case"PlaybookPreviewFinished":{let t=n8(a),n=[];if(null!==e.targetIndex)n.push(eF.yZ(a,"builder.test-action",e.targetIndex));else{let e=(0,es.aB)((0,es.Pv)(t));n.push(eF.yZ(a,"builder.test",e))}let i=(0,d.A)();return[{...r({...t,loadingStatus:null,sequencingStatus:{type:"idle"},runCompletedId:i})},[...n,async e=>{let{dispatch:t}=e;n5(a).forEach(t)},R.cb(3200,{type:"ExecutionCompletedAnimationFinished",runCompletedId:i})]]}case"PlaybookExecutionFinished":{let t=n8(a),n=e.completeAnimation?(0,d.A)():null,i=[async e=>{let{dispatch:t}=e;n5(a).forEach(t)}];return n&&i.push(R.cb(3200,{type:"ExecutionCompletedAnimationFinished",runCompletedId:n})),[{...r((0,es.TY)({...t,loadingStatus:null,sequencingStatus:{type:"idle"},runCompletedId:n}))},i]}case"ExecutionCompletedAnimationFinished":if(e.runCompletedId!==a.runCompletedId)return[t,[]];return[r({runCompletedId:null}),[]];case"ClickedPauseV2":{let{sequencingStatus:e}=a,t=(0,es.TY)({...a,loadingStatus:null,sequencingStatus:{type:"idle"},argumentFillingState:nL});if(!eo.py.isRunning(e))return[r(t),[]];return[r({...t,sequencingStatus:{type:"pausing"}}),[R.JH(e.runRecordId)]]}case"ClickedSwitchToLatestVersion":{let e=(0,es.Pv)(a);if(!e.ref)return[t,[]];let n=(0,es.sX)(e.ref,"auto");return[r({loadingStatus:"switching-to-latest-version"}),[async t=>{let{api:a,dispatch:r}=t,i=await a.playbookEditor2_GetPlaybookAsUIAst(n);i.fromSnapshot=e.fromSnapshot?{...e.fromSnapshot,isLatestRevision:!0}:void 0,r({type:"PlaybookSaved",pb:i,executionId:null})}]]}case"GotResults":{let{sequencingStatus:n}=a,{result:i}=e;switch(i.type){case"started":{let{statementIndex:e}=i,t=(0,es.Bf)(a,t=>(0,f.Co)(t,{transformFunctionCallStatement:t=>t.index===e?{...t,selectedTab:"Preview",status:"loading"}:t}));if(!eo.py.isRunning(n))return[r(t),[]];return[r({...t,resultsFromTestMode:a.testModeEnabled,partialState:{...a.partialState,[e]:{columns:{}}},sequencingStatus:{...n,statementIndex:e,startedStatements:[...new Set([...n.startedStatements,e])]}}),[]]}case"progress":{let{statementIndex:e}=i,t=(0,es.Bf)(a,t=>(0,f.Co)(t,{transformFunctionCallStatement:t=>t.index===e?{...t,selectedTab:"Preview",status:"loading",progress:i.totalProgress,progressText:i.message}:t}));if(!eo.py.isRunning(n))return[r(t),[]];return[r({...t,sequencingStatus:{...n,statementProgress:i.totalProgress}}),[]]}case"completed":{let{statementIndex:e}=i,t=!1,l={...(0,es.Bf)(a,n=>{let a=(0,f.Co)(n,{transformFunctionCallStatement:t=>t.index===e?{...t,selectedTab:"Preview",entry:{type:"result",result:i.result,fullScreenTab:null,rowBodyState:null,selectedGroup:{}},progressText:"",progress:0,status:"success"===i.result.type?"success":"error"}:{...t,selectedTab:"Preview"}});return a.trigger?.index===i.statementIndex&&(t="error"===i.result.type||i.result.breakdown.c_error>0),a})};if("autobook-activating"===l.loadingStatus&&t&&(l={...(0,es.YM)(l,e=>e.index===i.statementIndex?{...e,expanded:!0,selectedTab:"Preview"}:e),loadingStatus:null,sequencingStatus:{type:"idle"}}),!eo.py.isRunning(n))return[r(l),[]];return[r({...l,sequencingStatus:{...n,statementProgress:0,finishedStatements:[...new Set([...n.finishedStatements,e])]}}),[]]}case"runrecord":{if(!eo.py.isPreparing(n))return[t,[]];let e=(0,es.Pv)(a),l=n.runParams.targetIndex,o=(0,es.Bf)(a,e=>{if(!i.snapshotId)return e;let{isLatestRevision:t,snapshotId:n}=i;return{...e,fromSnapshot:{isLatestRevision:t,snapshotId:n,limitResults:i.limitResults}}}),s=(0,es.ZL)(a),c=l?(0,es.Zg)(e,l,!0).filter(e=>"FunctionCallStatement"===e.type).length:(0,es.nO)(e).length;return[r({...o,sequencingStatus:{totalStatementsCount:c,finishedStatements:[],startedStatements:[s],statementProgress:0,postRunActions:n.postRunActions,type:"running",executionId:n.executionId,runRecordId:i.runRecordId,statementIndex:s,runParams:n.runParams}}),[]]}case"failed":if(!eo.py.isRunning(n))return[t,[]];return[(0,T.n_)(t,i.error),[]];case"columnresults":{let e=(0,es.YM)(a,e=>{if(e.index===i.statementIndex){let t="valid"===e.columnData.status?e.columnData.columns?.filter(e=>e.id!==i.column.id)??[]:[];return t.push({id:i.column.id,value:i.value,limit:i.limit}),{...e,columnData:{columns:t,status:"valid"}}}return e}),t={...a.partialState};return delete t[i.statementIndex],[r({...e,partialState:t}),[]]}case"columnpartialresult":{let e={...a.partialState};for(let t of i.graphValues)e=(0,es.P0)(e,i.statementIndex,t.columnId,t.graphPath,t.value,i.limit);return[r({partialState:e}),[]]}}}case"StatementResult/ShowFullScreenTabClicked":return[r((0,es.mG)(a,e.statementIndex,t=>({...t,fullScreenTab:e.tab}))),[]];case"StatementResult/CloseFullScreenTabClicked":return[r((0,es.mG)(a,e.statementIndex,e=>(0,eo.Ze)(e.result)?{...e,fullScreenTab:null}:e)),[]];case"StatementResult/ShowRowBodyClicked":return[r((0,es.mG)(a,e.statementIndex,t=>(0,eo.Ze)(t.result)?{...t,rowBodyState:e.rowBodyState}:t)),[]];case"StatementResult/CloseRowBodyClicked":return[r((0,es.mG)(a,e.statementIndex,e=>(0,eo.Ze)(e.result)?{...e,rowBodyState:null}:e)),[]];case"StatementResult/GroupSelected":return[r((0,es.mG)(a,e.statementIndex,t=>(0,eo.Ze)(t.result)?{...t,selectedGroup:{...t.selectedGroup,[e.tabTitle]:e.groupName}}:t)),[]];case"MissingPluginsModal/Close":return[r({missingPluginsModal:null}),[]];case"ArgumentFilling/RequestSuggestions":{let t=(0,es.Pv)(a),n=eT.hn({pb:t,index:-1,reqParams:{...e.reqParams,isPlaybookArgument:!0},onDone:e=>{let{reqParams:t,suggestions:n}=e;return{type:"ArgumentFilling/RequestSuggestionsSuccess",reqParams:t,suggestions:n}},onPartialResults:e=>{let{reqParams:t,suggestions:n}=e;return{type:"ArgumentFilling/RequestSuggestionsPartial",reqParams:t,suggestions:n}}});return[r({argumentFillingState:{...a.argumentFillingState,suggestions:u.j.Loading,currentRequest:e.reqParams}}),[(0,I.Z3)(n,300)]]}case"ArgumentFilling/RequestSuggestionsPartial":case"ArgumentFilling/RequestSuggestionsSuccess":{let n=a.argumentFillingState.currentRequest;if(!o()(n,e.reqParams))return[t,[]];let i="ArgumentFilling/RequestSuggestionsSuccess"===e.type?null:e.reqParams,l=u.j.Success(e.suggestions);return[r({argumentFillingState:{...a.argumentFillingState,suggestions:l,currentRequest:i}}),[]]}case"ClickedSavePlaybook":return n0(t,{type:"BuilderV2Action",action:e});case"CategorizerDataRequested":{let{statementIndex:t,onDone:n}=e;return[r({testModeEnabled:!0}),[async e=>{let{dispatch:a}=e;a({type:"ClickedRunPlaybook",postRunActions:n,forceValidatePlaybook:!1,autobookBehaviour:"run",testMode:!0,runParams:{targetIndex:t,targetCacheBehavior:"default",defaultCacheBehavior:"default",limitResults:null}})}]]}case"CategorizerDataFetched":return[r((0,es.YM)(a,t=>t.index===e.statementIndex?{...t,expanded:!0,selectedTab:"Customize"}:t)),[]];case"PlaybookArgsAction":{let n=(0,es.Pv)(a),[{pb:i,...l},o]=nn.Ff({pb:n,...a.playbookArgsState},e.action),s=(0,es.w3)(i,a),c=t.notifications||[];return nn.oD(e.action)&&(c=O.$.add(c,"Saved inputs reset",{variant:"success"})),[{...r({...s,playbookArgsState:l}),notifications:c},[...o.map(R.zy(t=>({type:e.type,action:t}))),nZ(s)]]}case"ReportIssue/OpenToggled":return[r({reportIssueState:{...a.reportIssueState,open:e.open}}),[]];case"ReportIssue/QueryChanged":return[r({reportIssueState:{...a.reportIssueState,query:e.query}}),[]];case"ReportIssue/Submitted":{let e=a.reportIssueState.query.substring(0,h.Y),i=a.reportIssueState.reason;if(!i)return[t,[]];return[r({reportIssueState:{...na.f,loading:!0}}),[async t=>{let r=JSON.stringify(await n()),l=URL.createObjectURL(new Blob([r],{type:"application/json"}));await R.lC({message:e,reason:i,uiBundleBlobURL:l,uiAst:(0,es.qO)((0,es.Pv)(a)),runRecordId:"running"===a.sequencingStatus.type&&a.sequencingStatus.runRecordId||void 0},()=>({type:"ReportIssue/Uploaded"}))(t),URL.revokeObjectURL(l)}]]}case"ReportIssue/Uploaded":return[{...r({reportIssueState:na.f}),notifications:[...t.notifications,O.$.success("Issue report uploaded")]},[]];case"ReportIssue/ReasonChanged":return[r({reportIssueState:{...a.reportIssueState,reason:e.reason}}),[]];case"SearchOpened":{let e=(0,es.gN)((0,es.Pv)(a)),t=(0,es.vU)(e),n=(0,es.wv)(e,t);return[r({searchOpen:!0,searchValue:"",searchSuggestions:n,searchSelectedIndex:n.length>0?0:-1}),[]]}case"SearchClosed":return[r({searchOpen:!1,searchValue:"",searchSuggestions:[],searchSelectedIndex:-1}),[]];case"SearchValueChanged":{let t=e.value.toLowerCase().trim(),n=(0,es.gN)((0,es.Pv)(a)),i=(0,es.vU)(n),l=n.filter(e=>{if(!t)return!0;let n=(0,es.Rn)(e,i),a=e.displayHint?.plugin.name??e.plugin,r=e.name;return n.toLowerCase().includes(t)||a.toLowerCase().includes(t)||r.toLowerCase().includes(t)||e.actionNumber.toString().includes(t)}),o=(0,es.wv)(l,i);return[r({searchValue:e.value,searchSuggestions:o,searchSelectedIndex:o.length>0?0:-1}),[]]}case"SearchSelectedIndexChanged":return[r({searchSelectedIndex:e.index}),[]];case"SearchSuggestionSelected":return[r({...(0,es.GR)(a,e.index),searchOpen:!1,searchValue:"",searchSuggestions:[],searchSelectedIndex:-1}),[eT.yi(e.index)]];case"Builder/SavedInputsMenuOpenChanged":return[r({savedInputsMenuOpen:e.open}),[]];case"MiniUI/ClickedRowNumber":return[r({miniViewState:{...a.miniViewState,selectedRowsIndices:a.miniViewState.selectedRowsIndices.includes(e.rowIndex)?a.miniViewState.selectedRowsIndices.filter(t=>t!==e.rowIndex):[...a.miniViewState.selectedRowsIndices,e.rowIndex]}}),[]];case"MiniUI/ClickedExpandRow":{let t=a.miniViewState.expandedRowIndices.includes(e.rowIndex);return[r({miniViewState:{...a.miniViewState,expandedRowIndices:t?a.miniViewState.expandedRowIndices.filter(t=>t!==e.rowIndex):[...a.miniViewState.expandedRowIndices,e.rowIndex]}}),[]]}case"MiniUI/ClickedClearRowSelection":return[r({miniViewState:{...a.miniViewState,selectedRowsIndices:[]}}),[]];case"MiniUI/ClickedHideColumn":{let{index:n,columnId:i}=e,l=(0,es.Pv)(a).statements.find(e=>e.index===n);if(!l||"FunctionCallStatement"!==l.type)return[t,[]];let o=l.columns.map(e=>e.id===i?{...e,selected:!1}:e);return[r((0,es.kw)(a,e=>e.index===n?{...e,columns:o}:e,!0)),[]]}case"MiniUI/ClickedViewRow":return[r({miniViewState:{...a.miniViewState,rowBodyState:{columns:e.columns,row:e.row}}}),[]];case"MiniUI/DismissRowBody":return[r({miniViewState:{...a.miniViewState,rowBodyState:null}}),[]];case"PlaybookHistoryFetched":return[r({runHistory:e.history}),[]];case"ClickedOnRunHistoryItem":return[r({sequencingStatus:{type:"preparing",executionId:(0,d.A)(),loadingStatus:"Fetching Snapshot",postRunActions:[],autobookBehaviour:"run",runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}),[async t=>{let{api:n,dispatch:a}=t;a({type:"HistoryItemLoaded",res:await n.playbookEditor2_GetPlaybookAsUIAstFromRunRecord(e.recordId)})}]];case"HistoryItemLoaded":{let n=a.sequencingStatus;if(!eo.py.isPreparing(n))return[t,[]];if(!b.Q.isOk(e.res))return[{...t=r({sequencingStatus:{type:"idle"}}),notifications:[O.$.error(e.res.error)]},[]];let i=e.res.value;return[r((0,es.mY)((0,es.Vl)(i),a)),[(0,M.Li)({ast:i,executionId:n.executionId,onData:e=>({type:"GotResults",result:e,executionId:n.executionId}),onDone:()=>({type:"PlaybookExecutionFinished",executionId:n.executionId,completeAnimation:!1}),onCancel:void 0,onError:e=>({type:"PlaybookSnapshotLoadFailed",executionId:n.executionId,error:e.toJSON()})})]]}case"MiniUI/ClickedOpenSidebar":return[r({miniViewState:{...a.miniViewState,sidebarOpen:!a.miniViewState.sidebarOpen}}),[]];case"MiniUI/ClickedAddMiddleAction":return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:H._G(e.commandGroup,(0,es.Pv)(a),e.appendTo)}},[]];case"MiniUI/ClickedEditAction":return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:H.Yb(e.statement,(0,es.Pv)(a))}},[]];case"MiniUI/SidebarItemClicked":return[r({}),[async()=>(0,eJ.tB)(document.querySelector(`[data-statement-header-index='${e.statement.index}']`),document.querySelector("[data-builder-role='scrollable-table']"))]];case"MiniUI/ClickedExportToggle":{let e=(0,es.Pv)(a),n=x.ir(e),i=a.sidebarMemory;if(n.exportStatement){let t=x.Bs(e,{...n,exportStatement:null}),i=n.exportStatement,l={...a.sidebarMemory,uncheckedExportStatement:i};return[r({...(0,es.w3)(t,a),sidebarMemory:l}),[]]}if(i.uncheckedExportStatement){let t=i.uncheckedExportStatement,l=x.Bs(e,{...n,exportStatement:t}),o={...i,uncheckedExportStatement:null};return[r({...(0,es.w3)(l,a),sidebarMemory:o}),[]]}return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:H._G(E.KE,(0,es.Pv)(a))}},[]]}case"MiniUI/ClickedTriggerToggle":{let e=(0,es.Pv)(a),n=x.ir(e),i=a.sidebarMemory;if(e.triggerState?.status==="running")return[{...t,confirmState:{type:"Confirm",header:"Stop Agent",message:"Are you sure you want to stop the agent?",confirm:{text:"Stop",action:{type:"BuilderV2Action",action:{type:"MiniUI/StopAgentClicked"}}}}},[]];if(n.triggerStatement){let t=x.Bs(e,{...n,triggerStatement:null}),l={...i,uncheckedTriggerStatement:n.triggerStatement};return[r({...(0,es.w3)(t,a),sidebarMemory:l}),[]]}if(i.uncheckedTriggerStatement){let a=i.uncheckedTriggerStatement,r=x.Bs(e,{...n,triggerStatement:a}),l=H.Yb(a,r);return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:l}},[]]}let l=H._G(v.Wu,(0,es.Pv)(a));return[{...t,modal:{type:"StudioCardEditor",studioCardEditorState:l}},[]]}case"MiniUI/StopAgentClicked":{let e=(0,es.Pv)(a),t=x.ir(e),n=x.Bs(e,{...t,triggerStatement:null});return[r({...(0,es.w3)(n,a),sidebarMemory:{...a.sidebarMemory,uncheckedTriggerStatement:t.triggerStatement}}),[async t=>{let{api:n}=t;return n.triggerDeactivate(e.triggerState?.uuid??"")}]]}case"MiniUI/ReorderedStatements":return[r(a=(ai(t)?es.ZA:es.Bf)(a,t=>x.Bs(t,{...x.ir(t),statements:e.statements}))),[nZ(a)]];case"MiniUI/ClickedOnMiddleActionName":return[t,[eT.Yt(e.statement.index)]];case"MiniUI/ClickedUndo":return[r({activeIndex:Math.min(a.history.length-1,a.activeIndex+1)}),[]];case"MiniUI/ClickedRedo":return[r({activeIndex:Math.max(0,a.activeIndex-1)}),[]];case"MiniUI/ClickedClearActionData":{let n=(0,es.Pv)(a),i=n.statements.find(t=>t.index===e.statementIndex);if(!i||!(0,eo.Ec)(i))return[t,[]];let l=(0,es.T5)(i,n,!0);if(0===l.length)return[t,[]];return[r({confirmState:{...(0,eJ.EX)(),list:l,confirm:{text:"Yes",action:{type:"MiniUI/ClickedClearActionDataConfirmed",affectedStatements:l}},cancel:{text:"Cancel",action:{type:"MiniUI/ClickedClearActionDataCancelled"}}}}),[]]}case"MiniUI/ClickedClearActionDataConfirmed":return[r({...(0,es.Bf)(a,t=>(0,es.C8)(t,e.affectedStatements.map(e=>e.statementIndex))),confirmState:null}),[]];case"MiniUI/ClickedClearActionDataCancelled":return[r({confirmState:null}),[]];default:(0,C.HB)(e)}};function nq(e){let{dispatch:t,state:n,onClose:r,onMinimize:l,hasModalOpen:o}=e,{v4MiniEnabled:c}=(0,$.rD)().featureFlags;(0,$.th)(e=>{"Escape"===e.key&&t({type:"ClickedPauseV2"})});let d=(0,I.i8)(t,"PlaybookArgsAction"),u=s.useRef(null),p=(0,es.Pv)(n),m=(0,es.h$)(n),g=(0,es.dG)(n),y=n.testModeEnabled,f=(0,$.jL)(),h=eo.py.isIdle(n.sequencingStatus),b=eo.py.isFilling(n.sequencingStatus),x=null!==n.loadingStatus,E=nK(n),v=(0,es.hk)(p),C=0===p.statements.length||!!p.meta.needsEditing,k=0===p.statements.length&&null!==p.trigger;s.useEffect(()=>{u.current&&(u.current.scrollTop=n.scrollTop)},[n.scrollTop]);let w=s.useRef(null),P=s.useCallback(e=>{t({type:"ScrollToPbHeaderChanged",visible:e})},[t,x]);(0,$.c5)(w,P);let T=n.sequencingStatus,R="filling"===T.type&&T.arguments[T.activeIndex||0]||null,M=R?.statementIndex??null,O=p.args.find(e=>e.name===R?.argumentName),D=g||!h||b,H=null!=p.trigger,z=n.argumentFillingState,V="filling"!==T.type||0!==T.activeIndex,q=s.useCallback(function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=n?s.Fragment:er;return O&&e===M?s.createElement(a,null,s.createElement(eC,{addonState:z.addonState,dispatch:t,showBackButton:V,isAutobook:H,statementIndex:e,suggestions:z.suggestions,argument:O})):null},[M,O,z,V,H,t]),j={activeStep:R,disabled:g||!h||b,pbEqualsLastDescribedPlaybook:!!n.origin.lastDescribedPlaybook&&S.Bv((0,es.qO)(p),(0,es.qO)(n.origin.lastDescribedPlaybook),{compareComments:!1,compareMetadata:!1,compareStatementIndex:!1,comparePlaybookArgumentValues:!1,compareStatementOutput:!1}),isReadOnly:g,hasErrorUpToHere:!1,isTestButtonDisabled:C,isLonelyTriggerCard:k,isRunning:!h,isArgumentFilling:b,isAutobook:H,argumentFillingState:z,dispatch:t,playbookArgs:p.args,activeIndex:E,isTestModeEnabled:y,sequencingStatus:n.sequencingStatus,renderArgumentFilling:q,renderConnector:s.useCallback(function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return s.createElement(U.W,{disabled:D},s.createElement(Y,{index:e,dispatch:t,inside:n}))},[D,t])},W=p.trigger,G=s.useCallback(e=>t({type:"UserChangedPbMeta",meta:e}),[t]),J=m&&!y,Z=s.useMemo(()=>{if(p.errors.length>0)return[];if(!J)return(0,es.gN)(p).flatMap(e=>nQ(e)??[]);{let e=(0,es.aB)(p);return(0,es.Zg)(p,e,!0).filter(e=>"FunctionCallStatement"===e.type).flatMap(e=>nQ(e)??[])}},[p,J]),X=Z.reduce((e,t)=>t.cached?e:e+t.costMicroCredits,0),K=h&&Z.length>0,ee=(0,es._x)(n),en=s.createElement(nG,{"data-builder-role":"container"},s.createElement(ek,{disabled:!h,ref:w,name:p.meta.name,description:p.meta.description,plugins:p.plugins,onMetaChange:g?void 0:G}),s.createElement(N.VP,{gap:8,style:{alignItems:"center",width:"100%"}},W?.type==="FunctionCallStatement"?s.createElement(s.Fragment,null,s.createElement(et.gM,{...j,hasErrorUpToHere:!!(W.validationError?.status&&(0,es.Cs)(W.validationError.status)),isGroupCard:!1,block:{...W,isTrigger:!0},isFirstStatement:!0}),q(W.index),j.renderConnector(-1)):s.createElement(Q,{highlight:0===p.statements.length,dispatch:t,disabled:D}),s.createElement(L._N,{...j,blocks:p.statements,isRootList:!0,hasErrorUpToHere:!!p.trigger?.validationStatus?.some(es.Cs),activeStep:R})),K?s.createElement("div",{style:{display:"flex",alignItems:"center",marginTop:24}},s.createElement(N.BQ,{variant:"credits",style:{borderRadius:999},"data-testid":"playbook-cost-breakdown"},s.createElement(A.m,{style:{fontSize:"16px",marginRight:"8px",verticalAlign:"sub"}}),J?"This run cost you":"This run would have cost you",s.createElement("strong",null," ",Math.ceil(X/1e3)," credits"),s.createElement(N.nt,{"data-testid":"playbook-cost-breakdown-popup",renderContent:()=>s.createElement(nj,null,s.createElement(B._,{preview:n.testModeEnabled,actions:Z}))},s.createElement(nW,{"aria-label":"Open breakdown"},"Breakdown")))):null),ea=s.createElement(nY,{ref:u,"data-builder-role":"scrollable-container","data-testid":"playbook-builder-v2","data-tracking-context":"Builder",onKeyDown:e=>{"Escape"===e.key&&e.stopPropagation()}},g&&s.createElement(N.BQ,{variant:"info",center:!0,icon:"RadioInfoBold",style:{alignItems:"center"}},"You are viewing a historical record.",s.createElement(a.N,{onClick:()=>t({type:"ClickedSwitchToLatestVersion"}),style:{textDecoration:"underline"}},"Modify the current version of this ",c?"Agent":"Playbook","."),"."),c?s.createElement(t3,{pb:p,state:n,dispatch:t,onClose:r,onMinimize:l,costBreakdown:Z}):s.createElement(nN,{state:n,pb:p,isAllPreviewed:v,dispatch:t,onClose:r,onMinimize:l}),c?s.createElement(s.Fragment,null,s.createElement(tV,{dispatch:t,state:n,isModalOpen:null!==n.miniViewState.rowBodyState||"filling"===n.sequencingStatus.type||o}),!ee&&s.createElement(s.Fragment,null,n.miniViewState.rowBodyState&&s.createElement(aa,{isOpen:!0,onClose:()=>t({type:"MiniUI/DismissRowBody"})},s.createElement(N.VP,{style:{overflow:"hidden"}},s.createElement(N.Jn,{abs:!0,onClick:()=>t({type:"MiniUI/DismissRowBody"}),style:{top:16,right:16}}),s.createElement("div",{style:{paddingInline:32,overflow:"auto",maxHeight:"calc(100vh - 164px)"}},s.createElement(tj,{row:n.miniViewState.rowBodyState.row,columns:n.miniViewState.rowBodyState.columns})))),"filling"===n.sequencingStatus.type&&s.createElement(ar,{isOpen:!0,onClose:()=>t({type:"ClickedPauseV2"})},q(n.sequencingStatus.arguments[n.sequencingStatus.activeIndex]?.statementIndex??0,!0)))):ee?s.createElement(L.gb,{status:ee}):en,n.confirmState?.type==="delete"?s.createElement(eE.Y,{dispatch:t,state:n.confirmState,onJumpToReference:e=>t({type:"ClickedJumpToReference",statementIndex:e})}):n.confirmState?s.createElement(F.u,{dispatch:t,state:n.confirmState}):null,n.cardEditorState?s.createElement(eb,{dispatch:t,state:n.cardEditorState}):null,s.createElement(na.G,{state:n.reportIssueState,dispatch:t}),n.missingPluginsModal?s.createElement(eR,{apps:n.missingPluginsModal.plugins,onClose:()=>t({type:"MissingPluginsModal/Close"}),onConnect:e=>{f({type:"App/AppConnectClicked",app:e,userData:{from:"builderV2",switchTo:"builder"}})}}):null,s.createElement(nn.uA,{state:n.playbookArgsState,dispatch:d})),ei=s.useCallback(e=>{if(!e.over)return;let[n="",a=""]=String(e.over.id).split(":");n&&t({type:"CardDroppedOnConnector",draggedIndex:Number(e.active.id),targetIndex:e.over?.id==="firstcard"?"firstcard":Number(n),inside:"inside"===a})},[t]);return s.createElement(i.Mp,{sensors:(0,i.FR)((0,i.MS)(i.cA,ae),(0,i.MS)(i.IG,ae)),onDragEnd:ei},ea,s.createElement(i.Hd,{dropAnimation:null},s.createElement(_.WE,null)))}let nj=(0,c.Ay)(N.h$)`
  animation: 0.3s ease-in-out fadeIn;
  width: 100%;
  max-width: 720px;
`,nW=c.Ay.span`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 12px;
  color: ${r.vh3};
`,nG=c.Ay.div`
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
`,nY=(0,c.Ay)(N.VP)`
  background: ${r.o$k};
  border-radius: 12px;
  min-height: 0;
  overflow: auto;
`;function nQ(e){let t=e.entry;return t?{icon:e.displayHint?.plugin.icon??"BardeenLogoV2",title:e.comment||(0,k.ZH)(e.displayHint?.command.expressions[0]??"")||e.name,cached:"success"===t.result.type&&t.result.cached,outputs:"success"===t.result.type?t.result.unitsProduced:0,costMicroCredits:"success"===t.result.type?t.result.microCredits:0}:null}let nJ=0,nZ=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{invalidateCache:n=!1,debounce:a=!1}=t,r=eT.WA((0,es.Pv)(e),n,++nJ,(e,n)=>nJ!==n?[]:[{type:"ValidatedPlaybookFetched",pb:e},...t.postValidateActions??[]]);return a?(0,I.Z3)(r,300):r},nX=(e,t,n)=>{let{withResetArguments:a=!1}=n??{},r=[],i=new Set,l=new Map;e.args.forEach(e=>{l.set(e.name,e)});let o=(e,t)=>{i.has(e.name)||(i.add(e.name),r.push({statementIndex:t,argumentName:e.name}))};return(0,f.bZ)(e,{visitStatement:e=>((0,f.b)(e,{visitVarRefExpression:t=>{if("argument"===t.referenceType){let n=l.get(t.name);n&&(a||!n.value)&&o(n,e.index)}return!0},visitFieldRemappingExpression:t=>{let n=l.get(t.accordingTo);return n&&!n.value&&o(n,e.index),!0}}),t!==e.index)}),r},nK=e=>{switch(e.sequencingStatus.type){case"idle":case"pausing":case"preparing":case"running":return null;case"filling":let t=e.sequencingStatus.arguments[e.sequencingStatus.activeIndex];if(!t)return null;return"number"==typeof t.statementIndex?t.statementIndex:null}},n0=(e,t)=>{let n=e.builderV2State;if("builderV2"!==e.view||!n)return[e,[]];let{settings:a,featureFlags:r}=e.config,i=(0,es.Ll)((0,es.yu)(n)),l=(0,es.Pv)(i),{shouldSave:o,shouldShowHowtoRun:s,shouldRename:c,shouldSaveConfig:d}=(0,es.ij)(l,n.origin);return o||d?c?[{...e,modal:{type:"BuilderV2/ForceRenamePlaybook",onSaveAction:t}},[]]:w.EO(l)?a?.skippedDraftPbWarning||"RememberMyChoice"===e.modal.type?[{...e,builderV2State:{...i,loadingStatus:"saving"},modal:D.$h},[eT.oy(i,e.config,e=>({type:"PlaybookSaved",pb:e,executionId:null}))]]:[{...e,modal:{type:"RememberMyChoice",rememberMyChoiceState:{title:"Your automation isn't complete yet",key:"skippedDraftPbWarning",description:"Finish filling out all the required fields to run it. Otherwise, you can save your progress as a draft and edit it later.",buttonText:"Save draft",action:t}}},[]]:s&&!r.v4MiniEnabled?[{...e,modal:{type:"HowToRun"}},[nZ(i)]]:[{...e,modal:D.$h,builderV2State:{...i,loadingStatus:"saving"}},[eT.oy(i,e.config,e=>({type:"PlaybookSaved",pb:e,executionId:null}))]]:[e,[]]},n1=(e,t,n,a,r)=>{let i=e.builderV2State;if(!i)return[e,[]];let{settings:l}=e.config;if(i.testModeEnabled)return[{...e,builderV2State:(0,es.Bf)(i,e=>({...e,fromSnapshot:void 0}))},[async e=>{let{dispatch:n}=e;n({type:"PlaybookPreviewStarted",runParams:t,postRunActions:r})}]];let o=(0,es.Pv)(i),s=(0,es.ij)(o,i.origin),{shouldRename:c}=s,u=(0,es.ai)(s);if(u&&c)return[{...e,modal:{type:"BuilderV2/ForceRenamePlaybook",onSaveAction:{type:"BuilderV2Action",action:a}}},[]];if(!l?.skippedSaveBeforeRunPlaybookConfirmation&&!i.testModeEnabled&&u&&"RememberMyChoice"!==e.modal.type&&!e.config.featureFlags.v4MiniEnabled){let t=(0,es.f$)(i),n={type:"RememberMyChoice",rememberMyChoiceState:{title:"Save required",description:`The Playbook should be saved before ${t?"activating":"running"}.`,key:"skippedSaveBeforeRunPlaybookConfirmation",buttonText:t?"Activate":"Save and Run",action:{type:"BuilderV2Action",action:a}}};return[{...e,modal:n},[]]}let p=D.$h,m=(0,d.A)();return[{...e,modal:p,builderV2State:{...i,sequencingStatus:{type:"preparing",executionId:m,loadingStatus:s.shouldSave?"Saving":"Preparing",postRunActions:r,runParams:t,autobookBehaviour:n}}},[eT.oy(i,e.config,e=>({type:"PlaybookSaved",pb:e,executionId:m}))]]},n2=e=>{let t=e.sequencingStatus;if("filling"!==t.type)return null;let n=t.arguments[t.activeIndex];if(!n)return null;let a=t.activeIndex+1,r=t.arguments[a];if(!r)return null;let i=n.statementIndex!==r.statementIndex;return{index:a,argument:r,shouldFocus:i}},n4=e=>{let t=e.sequencingStatus;if("filling"!==t.type)return null;let n=t.arguments[t.activeIndex];if(!n)return null;let a=t.activeIndex-1;a=a<0?0:a;let r=t.arguments[a];if(!r)return null;let i=r.statementIndex!==n.statementIndex;return{index:a,argument:r,shouldFocus:i}},n3=e=>(0,es.YM)(e,e=>({...e,status:"idle",progress:0,progressText:"",expanded:!1,selectedTab:"Preview",entry:null})),n6=(e,t,n,a)=>{let{sequencingStatus:r}=e,i=(0,es.Pv)(e),l="runParams"in r?r.runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null};return n?[(0,M.YO)({ast:i,executionId:t,onDone:()=>({type:"AutobookActivationFinished",executionId:t}),onError:e=>({type:"AutobookActivationFailed",executionId:t,error:e.toJSON()})})]:[(0,M.pb)({ast:(0,es.qO)(i),executionId:t,params:{...l,statementIndexCacheIgnore:a?al(e):[]},onData:e=>({type:"GotResults",result:e,executionId:t}),onDone:()=>({type:"PlaybookExecutionFinished",executionId:t,completeAnimation:!0}),onCancel:()=>({type:"PlaybookExecutionCanceled",executionId:t}),onError:e=>({type:"PlaybookExecutionFailed",executionId:t,error:e.toJSON()})}),eT.yi((0,es.ZL)(e))]},n8=e=>{let t="running"===e.sequencingStatus.type&&e.sequencingStatus.statementIndex;return(0,es.kw)(e,e=>e.index===t?{...e,expanded:!0}:e)},n5=e=>"running"===e.sequencingStatus.type&&e.sequencingStatus.postRunActions||[],n7=(e,t)=>{let n=(0,es.Zg)((0,es.Pv)(e),t,!0).map(e=>e.index);return(0,es.YM)(e,e=>({...e,entry:n.includes(e.index)?e.entry:null}))},n9=e=>{let t=e.cardEditorState;return t?.type==="conditional"||t?.type==="loop"?t.pb:null},ae={activationConstraint:{distance:10}},at=e=>(0,es.YM)(e,e=>({...e,entry:null}));function an(e,t){return(0,es.Bf)(e,e=>e.meta.id!==t.autobookId?e:{...e,triggerState:{status:t.status,uuid:t.uuid,disabledReason:t.disabledReason}})}let aa=(0,c.Ay)(N.aF)`
  padding-block: 32px;
  padding-top: 64px;
  overflow: hidden;
`,ar=(0,c.Ay)(N.aF)`
  padding: 0px;
  max-width: 720px;
  width: 100%;
`,ai=e=>e.config.featureFlags.v4MiniEnabled,al=e=>{let t=(0,es.Pv)(e),n=[];return(0,f.bZ)(t,{visitFunctionCallStatement:e=>{let t=x.UR(e);return("invalid"===e.columnData.status||n.length>0||t)&&n.push(e.index),!0}}),n}},33663:(e,t,n)=>{n.d(t,{D:()=>u});var a=n(67331),r=n(14041),i=n(49997),l=n(12787),o=n(59750),s=n(28926);let c=n.p+"2039ec5cddad894ec918.png";var d=n(6823);let u=e=>{let{canUpgrade:t,onClose:n,onUpgrade:u,missingFeatures:p}=e,m=r.useMemo(()=>Array.from(new Set(p.flatMap(e=>i.L[e]))),[p]),g=r.useMemo(()=>{let e=m.map(e=>e.meta.title);return new Intl.ListFormat("en",{style:"long",type:"disjunction"}).format(e)},[m]),y=(0,o.r)().featureFlags.v4MiniEnabled,f=y?"Agent":"Playbook",h=m.includes(l.Uk.STARTER)?`This ${f} requires a paid subscription`:`This ${f} requires a ${g} subscription`;return r.createElement(s.aF,{isOpen:!0},r.createElement(d.r,{"data-tracking-context":"Modal PremiumAutomation"},r.createElement(s.Jn,{abs:!0,onClick:n}),r.createElement(d.G,null,r.createElement("img",{src:c}),r.createElement(a.H2,null,h),y?r.createElement(a.P,{$small:!0,style:{fontWeight:500}},"Upgrade your plan to run this ",f,"."):r.createElement(a.P,{$small:!0,style:{fontWeight:500}},"Customize and test your Agent now in the Studio. Upgrade your plan when you're ready to run it.")),r.createElement(s.$n,{variant:"primary",size:"xl",round:!0,text:t?"Explore Plans":"Ask admin to upgrade",onClick:u,fullWidth:!0})))}},9014:(e,t,n)=>{n.d(t,{k:()=>h});var a=n(67331),r=n(69670),i=n(91472),l=n(78445),o=n(14041),s=n(39716),c=n(49861),d=n(48143),u=n(35549),p=n(28926),m=n(37345),g=n(27461),y=n(31335);let f=()=>window.open("https://www.bardeen.ai/contact-sales","_blank"),h=e=>{let{onClose:t,intent:n,subscriptionPlanDetails:a,subscriptionLoading:r}=e,{subscription:i,paymentPlans:l}=(0,d.rD)();return i?o.createElement(b,{onClose:t,intent:n,subscription:i,paymentPlans:l,subscriptionLoading:r,subscriptionPlanDetails:a}):null},b=e=>{let{onClose:t,intent:n,subscription:s,paymentPlans:h,subscriptionPlanDetails:b,subscriptionLoading:E}=e,A=(0,d.jL)(),I=s.activeSubscription?.product,P=s.activeSubscription?.planPeriod,$=s.activeSubscription?.tierCredits??0,T=(s.microCredits??0)/1e3,F=c.mk(s,"v3:premium"),R="cancelWinback"===n,[M,O]=o.useState(F.forced?"YEARLY":"MONTHLY"),_=h.find(e=>"v3:basic"===e.product),N=h.find(e=>"v3:premium"===e.product&&e.code===M),[B,D]=o.useState("v3:basic"===I?$:_?.tiers?.[0]?.credits??0),[H,z]=o.useState("v3:premium"===I?$:N?.tiers?.[0]?.credits??0),L=c.HT(s),U=function(e){return o.useCallback(function(t,n){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"MONTHLY",r=e.activeSubscription?.product,i=e.activeSubscription?.planPeriod,l=e.activeSubscription?.tierCredits??0;return!c.HT(e)&&r===t&&i===a&&n===l},[e])}(s),V=o.useCallback(e=>{if(L)return"Resubscribe";if("basic"===e)return"v3:basic"===I?B===$?"Current plan":B<$?"Downgrade":"Upgrade now":"v3:premium"===I||"v3:enterprise"===I?"Downgrade":"Upgrade now";if("v3:premium"===I){if(M===P)return H===$?"Current plan":H<$?"Downgrade":"Upgrade now";if("YEARLY"===P&&"MONTHLY"===M)return"Not allowed"}return"Upgrade now"},[B,$,P,I,M,H,L]);if(!_)return o.createElement(y.h,{onClose:t,style:{padding:32,maxWidth:768,height:"auto"}},o.createElement(g.VP,{gap:12,center:!0},o.createElement(a.H3,null,"Could not find plans"),o.createElement(a.P,null,"Please try again later.")));let q="YEARLY"===M?12:1;if("v3:enterprise"===I)return o.createElement(y.h,{onClose:t,style:{padding:32,maxWidth:768,height:"auto"}},o.createElement(g.VP,{gap:12,center:!0},o.createElement(a.H3,null,"Contact support"),o.createElement(a.P,null,"Please contact support to alter your subscription."),o.createElement(m.$n,{text:"Contact support",variant:"primary",round:!0,onClick:()=>window.open("https://www.bardeen.ai/contact","_blank")})));let j=o.createElement(m.$n,{text:V("basic"),size:"xl",style:{margin:"8px"},disabled:"Current plan"===V("basic")||"Not allowed"===V("basic"),fullWidth:!0,round:!0,variant:"primary",onClick:()=>{F.forced||A({type:"App/UpgradeSubscriptionClicked",creditAmount:B,product:"v3:basic",planCode:"MONTHLY"})}}),W=String(b?.period).toLowerCase(),G=W.replace("ly",""),Y=E?o.createElement(C,{$disabled:!1,$highlighted:!0},o.createElement(p.y$,null)):o.createElement(v,{$disabled:!1,$highlighted:!0},o.createElement(a.H4,{style:{textAlign:"center"}},"Current Plan"),o.createElement(g.fI,{center:!0,style:{height:24,marginBottom:8}},o.createElement("span",{style:{color:r.ui$}},W)),o.createElement(w,{$width:"100%",$height:48},b?.credits," credits / ",G),o.createElement(a.P,{$bold:!0,style:{textAlign:"center",marginBlock:4}},b?.amount?S(b.amount):"N/A"," ","/ ",G),o.createElement(i.HR,null),o.createElement(g.VP,{gap:12,style:{padding:12}},b?.valueProps.map(e=>{let{title:t,locked:n}=e;return o.createElement(p.mb,{key:t,locked:n},t)})),o.createElement(k,{size:"xl",style:{margin:"8px"},disabled:"Current plan"===V("basic")||"Not allowed"===V("basic"),fullWidth:!0,round:!0,variant:"outlined",text:"Current plan"}));return o.createElement(y.h,{onClose:t,"data-tracking-context":"Upgrade","data-testid":"upgrade-modal",style:{padding:32,maxWidth:380+(R?378:0)+("moreFeatures"!==n?378:0),height:"auto"}},o.createElement(g.VP,{gap:24},R?o.createElement(o.Fragment,null,o.createElement(a.H4,{style:{margin:"auto"}},"We have some special offers for you"),o.createElement(a.P,{style:{textAlign:"center",margin:"0"}},"You have ",o.createElement("span",{style:{color:r.t14}},T)," Credits remaining",c.TB(s)?" from your trial, that you will forfeit if you cancel.":", that will be available until the end of the current billing period.")):o.createElement(o.Fragment,null,o.createElement(a.H4,{style:{margin:"auto"}},"moreFeatures"===n?"Unlock features with Premium":o.createElement(g.fI,{style:{margin:"auto"},gap:8},o.createElement("span",{style:{color:r.t14}},T),"Credits remaining")),o.createElement(x,{subscription:s}),o.createElement(u.Y,null),L&&o.createElement(a.P,{style:{textAlign:"center",color:r.ui$,fontSize:"14px",margin:"0"}},"Your subscription has been canceled. Your plan ends on"," ",new Date(s.endsAt).toLocaleDateString(),".")),o.createElement(g.fI,{gap:12},R&&Y,"moreFeatures"!==n&&o.createElement(v,{$disabled:F.forced},o.createElement(a.H4,{style:{textAlign:"center"}},"Basic"),o.createElement(g.fI,{center:!0,style:{height:24,marginBottom:8}},o.createElement("span",{style:{color:r.ui$}},"monthly")),o.createElement(p.ms,{behavior:"flip-over",autoCloseOnContentClick:!0,renderContent:()=>_.tiers.map(e=>{let{credits:t,amount:n}=e,a=B===t,r=U("v3:basic",t);return o.createElement(p.IU,{key:t,active:a,onClick:()=>D(t)},o.createElement(g.fI,{center:!0,gap:4},"+",t.toString()," credits / month",r?o.createElement(p.ab,{variant:"plum"},"Current"):null))})},o.createElement(p.IU,{rightAddon:o.createElement(p.In,{icon:"ArrowDownOutline"}),"data-testid":"Starter-plan-dropdown",style:{border:"1px solid "+r.MfC,background:r.ONy}},o.createElement(g.fI,{center:!0,gap:4},"+",B.toString()," credits / month",U("v3:basic",B)&&o.createElement(p.ab,{style:{marginLeft:6},variant:"plum"},"Current")))),o.createElement(a.P,{$bold:!0,style:{textAlign:"center",marginBlock:4}},S(_.tiers.find(e=>e.credits===B)?.amount??0)," ","/ month"),o.createElement(i.HR,null),o.createElement(g.VP,{gap:12,style:{padding:12}},o.createElement(p.mb,{locked:!0},"Premium scrapers"),o.createElement(p.mb,{locked:!0},"Enrichment"),o.createElement(p.mb,{locked:!0},"Teams"),o.createElement(p.mb,null,"Build your own scrapers")),F.forced?o.createElement(l.m,{content:"You cannot downgrade from a yearly plan. Please contact support for assistance."},j):j),N&&o.createElement(v,null,o.createElement(a.H4,{style:{textAlign:"center"}},"Premium"),F.forced?o.createElement(g.fI,{center:!0,style:{height:24,marginBottom:8}},o.createElement("span",{style:{color:r.ui$}},"yearly")):o.createElement(g.fI,{center:!0,style:{height:24,marginBottom:8}},o.createElement(p.lM,{size:"m",label:"Yearly (save 20%)",checked:"YEARLY"===M,disabled:!F.available,onChange:e=>{("v3:premium"!==I||"YEARLY"!==P||e)&&O(e?"YEARLY":"MONTHLY")}})),o.createElement(p.ms,{behavior:"flip-over",autoCloseOnContentClick:!0,renderContent:()=>o.createElement(o.Fragment,null,N.tiers.map(e=>{let{credits:t}=e,n=H===t,a=U("v3:premium",t,M);return o.createElement(p.IU,{key:t,active:n,onClick:()=>z(t)},o.createElement(g.fI,{center:!0,gap:4},"YEARLY"===M?o.createElement(o.Fragment,null,"+",(t*q).toString()," credits / year"):o.createElement(o.Fragment,null,"+",t.toString()," credits / month"),a?o.createElement(p.ab,{variant:"plum"},"Current"):null))}),o.createElement(p.IU,{onClick:f},"Need more? Talk to Sales."))},o.createElement(p.IU,{rightAddon:o.createElement(p.In,{icon:"ArrowDownOutline"}),"data-testid":"Starter-plan-dropdown",style:{border:"1px solid "+r.MfC,background:r.ONy}},o.createElement(g.fI,{center:!0,gap:4},"YEARLY"===M?o.createElement(o.Fragment,null,"+",(H*q).toString()," credits / year"):o.createElement(o.Fragment,null,"+",H.toString()," credits / month"),U("v3:premium",H,M)&&o.createElement(p.ab,{style:{marginLeft:6},variant:"plum"},"Current")))),o.createElement(a.P,{$bold:!0,style:{textAlign:"center",marginBlock:4}},S((N.tiers.find(e=>e.credits===H)?.amount??0)*q),"YEARLY"===M?" / year":" / month"),o.createElement(i.HR,null),o.createElement(g.VP,{gap:12,style:{padding:12}},o.createElement(p.mb,null,"Premium scrapers"),o.createElement(p.mb,null,"Enrichment"),o.createElement(p.mb,null,"Teams"),o.createElement(p.mb,null,"Build your own scrapers")),o.createElement(m.$n,{style:{margin:"8px"},text:V("premium"),size:"xl",fullWidth:!0,round:!0,variant:"primary",disabled:"Not allowed"===V("premium"),onClick:()=>{A({type:"App/UpgradeSubscriptionClicked",creditAmount:H*("YEARLY"===M?12:1),product:"v3:premium",planCode:M})}}))),R?o.createElement(g.VP,{center:!0},o.createElement(m.$n,{fullWidth:!0,text:"Cancel Anyway",variant:"outlined",size:"xl",round:!0,onClick:()=>A({type:"App/CancelSubscriptionAnyway"})})):o.createElement(p.BQ,{variant:"info",round:!0},"Want us to build you a scraper? ",o.createElement("a",{onClick:f},"Talk to sales")),o.createElement(a.P,{style:{textAlign:"center",color:r.ui$,fontSize:"14px",margin:"0"}},"Unused credits expire at the end of each billing period")))},x=e=>{let{subscription:t}=e;if(!t.activeSubscription)return null;switch(t.activeSubscription.product){case"v3:basic":case"v3:enterprise":case"v3:free":case"v3:premium":return null;case"v1:business":case"v1:free":case"v1:pro":case"v2.1:enterprise":case"v2.1:starter":case"v2.1:teams":case"v2:business":case"v2:enterprise":case"v2:free":case"v2:pro":case"invalid":return o.createElement(E,{variant:"warning",icon:"TriangularExclamationBold"},"Your current subscription is outdated and no longer supported. We've matched it to the closest newer plan, but some features may be missing. Please upgrade to one of the options below to avoid interruptions.")}},E=(0,s.Ay)(p.BQ)`
  font-size: 14px;
  border-radius: 12px;
`,v=s.Ay.div`
  ${e=>{let{$disabled:t}=e;return t&&(0,s.AH)`
      opacity: 0.5;
      cursor: not-allowed;
      ${p.In} {
        color: ${r.ui$};
      }
      ${p.IU} {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `}}
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: ${e=>{let{$highlighted:t}=e;return t?`2px solid ${r.Q_2}`:`1px solid ${r.Tc2}`}};
  border-radius: 12px;
  background: ${r.o$k};
`,C=(0,s.Ay)(v)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`,S=e=>`$${(e/100).toString()}`,k=(0,s.Ay)(m.$n)`
  opacity: 0.5;
  cursor: not-allowed;
`,w=s.Ay.div`
  background: ${r.ONy};
  width: ${e=>{let{$width:t}=e;return t||"244px"}};
  height: auto;
  max-height: ${e=>{let{$height:t}=e;return t?`min(${t}px, 100vh)`:"100vh"}};
  border: 1px solid #f1f3f4;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
`},6823:(e,t,n)=>{n.d(t,{G:()=>i,r:()=>r});var a=n(39716);let r=a.Ay.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px 48px 40px;
  position: relative;
  width: 530px;
`,i=a.Ay.div`
  padding-bottom: 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`},51703:(e,t,n)=>{n.d(t,{h:()=>i,j:()=>r});var a=n(45250);function r(e){return e.matchersInput.value.trim()?{...e,specificMatchers:(0,a.uniqWith)([...e.specificMatchers,e.matchersInput],a.isEqual),matchersInput:{...e.matchersInput,value:"",error:null},matchersInputPath:"",matchersInputDomain:""}:e}let i=(e,t)=>{if(""===e&&""===t)return"";if(/^https?:\/\//.test(e))try{let n=new URL(e);return`https://*.${n.hostname}${n.pathname}${""!==t?"/*/"+t:""}/*`}catch{}return`https://*.${e}${""!==t?"/*/"+t:""}/*`}},4241:(e,t,n)=>{n.d(t,{He:()=>g,IO:()=>u,oh:()=>p});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(49861),s=n(12787),c=n(48143),d=n(28926);let u=e=>e/1e3,p=i.memo(function(e){let t=(0,c.jL)(),{profile:n,teamConfig:l,subscription:s}=(0,c.rD)(),p=n?.email;if(!s||!p)return null;let h=()=>t({type:"App/PaymentPortalNavigated"}),F=!l?.isTeam||l?.isAdmin,R=s.microCreditsBreakdown,M=R.available_free+R.available_pro+R.available_team+(R.available_enterprise??0),O=Math.max(0,M-R.used_subscription),_=R.available_bulk+R.available_manual,N=Math.max(0,_-(R.used_bulk+R.used_manual)),B=!o.tR(s),D=o.HT(s),H=s.activeSubscription?.planPeriod??"MONTHLY",z=s.activeSubscription?.status??"active",L=o.HJ(s),U={MONTHLY:"Monthly",YEARLY:"Annual",NONE:""}[H??"NONE"],V=g(L,l?.isTeam??!1),q=`${U} ${V} Plan`,j=o.tR(s)&&!o.HT(s);return i.createElement(i.Fragment,null,D&&!o.TB(s)&&i.createElement(d.BQ,{variant:"warning",round:!0},"Your subscription has been canceled. You'll be able to use your plan until"," ",new Date(s.endsAt).toLocaleDateString(),"."),!D&&o.TB(s)?i.createElement(y,null,i.createElement(f,null,i.createElement(b,null,i.createElement(x,null,"Trial"),i.createElement(v,null,"Your trial ends ",new Date(s.endsAt).toLocaleDateString(),". Afterwards your ",U," ",V," plan will be activated.")))):null,i.createElement(y,null,i.createElement(f,null,i.createElement(b,null,i.createElement(a.H3,{style:{color:r.t14}},q),o.W1(s)&&i.createElement(v,null,"Balance: ",u(O+N)," credits left",i.createElement("br",null),!B&&F&&i.createElement("a",{onClick:h},"Manage Payment Settings"))),i.createElement(E,null,o.eV(s)?F?i.createElement("div",{style:{display:"flex",gap:12}},j&&i.createElement(d.$n,{variant:"outlined",size:"xl",round:!0,onClick:()=>t({type:"App/CancelSubscription"}),text:"Cancel"}),i.createElement(d.$n,{variant:"primary",size:"xl",round:!0,onClick:()=>t({type:"App/UpgradeIntended",from:e.context}),text:"Upgrade"})):null:i.createElement(T,null,"For changes contact ",i.createElement(d.Uc,{profileEmail:p,link:!0})))),N>0&&!B&&i.createElement(i.Fragment,null,i.createElement(C,null),i.createElement(S,null,i.createElement(k,null,i.createElement(A,null,"Credits left from ","MONTHLY"===H&&"monthly","YEARLY"===H&&"annual"," plan"),i.createElement(I,null,i.createElement(P,null,u(O)),i.createElement($,null,"/",u(M)))),i.createElement(w,null),i.createElement(k,null,i.createElement(A,null,"Extra credits left"),i.createElement(I,null,i.createElement(P,null,u(N)),i.createElement($,null,"/",u(_)))))),i.createElement(m,{sub:s})),"paused"===z&&F&&i.createElement(d.BQ,{icon:"TriangularExclamationBold",variant:"warning"},"Your subscription is currently paused. Add your payment info to resume your subscription. You can add your payment settings ",i.createElement("a",{onClick:h},"here"),"."),("incomplete"===z||"incomplete_expired"===z)&&F&&i.createElement(d.BQ,{icon:"TriangularExclamationBold",variant:"critical"},"We could not verify your payment data. Please update your payment data"," ",i.createElement("a",{onClick:h},"here"),"."),"unpaid"===z&&F&&i.createElement(d.BQ,{icon:"TriangularExclamationBold",variant:"critical"},"Your subscription is unpaid. Please update your payment data"," ",i.createElement("a",{onClick:h},"here"),"."))}),m=i.memo(e=>{let{sub:{activeSubscription:t}}=e,{schedule:n}=t??{},{product:a="invalid",startDate:r,credits:l=0}=n??{},o=i.useMemo(()=>{switch(a){case"v3:basic":return s.nj.BASIC;case"v3:premium":return s.nj.PREMIUM;case"v3:enterprise":return s.nj.ENTERPRISE;default:return null}},[a]);return o?i.createElement(h,null,"Your subscription will switch to ",i.createElement("strong",null,o.meta.title)," with ",l," credits on ",new Date(r??"").toLocaleDateString(),"."):null});function g(e,t){return 1===e.version&&"PRO"===e.state&&t?"Business":e.meta.title}let y=l.Ay.div`
  display: flex;
  padding: 20px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 12px;
  background: ${r.KxS};
  text-align: left;
`,f=l.Ay.div`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;
`,h=l.Ay.div`
  color: ${r.ui$};
  font-family: Inter;
  font-size: 16px;
  font-style: italic;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  letter-spacing: 0.002px;
  text-align: center;

  strong {
    color: ${r.t14};
  }
`,b=l.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
  justify-content: center;
`,x=(0,l.Ay)(a.H3)`
  color: ${r.t14};
`,E=l.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0;
`,v=l.Ay.p`
  color: ${r.ui$};
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 187.5% */
  letter-spacing: 0.002px;
`,C=l.Ay.div`
  height: 1px;
  align-self: stretch;
  border-radius: 1px;
  background: ${r.Q_2};
`,S=l.Ay.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`,k=l.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`,w=l.Ay.div`
  width: 1px;
  align-self: stretch;
  border-radius: 1px;
  background: ${r.Q_2};
`,A=l.Ay.div`
  color: ${r.t14};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
`,I=l.Ay.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  align-self: stretch;
`,P=l.Ay.div`
  color: ${r.t14};
  font-family: Outfit;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 100% */
  letter-spacing: -0.003px;
`,$=l.Ay.div`
  color: ${r.wB3};
  font-family: Outfit;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.002px;
`,T=l.Ay.div`
  color: ${r.wB3};
  font-weight: 500;
  font-size: 16px;
  display: block;
  width: 240px;
  text-align: right;

  a {
    color: inherit;
    &:hover {
      color: ${r.t14};
      text-decoration: underline;
    }
  }
`},47856:(e,t,n)=>{n.d(t,{uA:()=>eZ,_G:()=>eQ,Yb:()=>eY,i2:()=>eK,Ff:()=>eJ});var a=n(69670),r=n(14041),i=n(39716),l=n(36884),o=n(49861),s=n(3756),c=n(45281),d=n(42018),u=n(14744),p=n(99538),m=n(86347),g=n(94303),y=n(88389),f=n(44242),h=n(97552),b=n(22384),x=n(117),E=n(48143),v=n(5855),C=n(28926),S=n(89787),k=n(37089),w=n(66347),A=n(85170),I=n(51402),P=n(67846),$=n(71378),T=n(93754),F=n(42014);let R=0,M=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{invalidateCache:n=!1,debounce:a=!1}=t,r=(0,k.WA)(e,n,++R,(e,t)=>R!==t?[]:[{type:"ValidatedPlaybookFetched",pb:(0,A.Vl)(e)}]);return a?(0,x.Z3)(r,300):r},O=(e,t)=>{let n=(0,A.C7)(t,e.pb);return{...e,pb:n}},_=(e,t)=>({...e,pb:t});var N=n(67331),B=n(78445),D=n(62987),H=n(91982),z=n(27461),L=n(65947);let U=r.memo(e=>{let{state:t,allColumns:n,dispatch:a}=e,{columns:i}=t,l=e=>{a({type:"UpdatedColumns",columns:i.map(t=>t.id===e.id?e:t)})},o=i.every(e=>e.selected),s=i.some(e=>e.selected),c=r.createElement(C.$n,{size:"m",variant:"ghost",icon:"RefreshOutline",tooltipText:"Refresh Columns",onClick:()=>a({type:"ForceRevalidatePlaybook"})});return 0===i.length?r.createElement(z.fI,{center:!0,gap:8},r.createElement(N.P,{style:{textAlign:"center"}},"No columns to show for this action"),c):r.createElement(z.VP,{style:{padding:"12px 32px"}},r.createElement(j,null,r.createElement(z.fI,{style:{flex:1,paddingInlineStart:16}},r.createElement(B.m,{content:"Toggle all"},r.createElement("div",{onClick:()=>{a({type:"UpdatedColumns",columns:i.map(e=>({...e,selected:!o}))})}},r.createElement(C.Sc,{style:{marginRight:8,opacity:s&&!o?.4:1},checked:o||s,onChange:()=>{}}),r.createElement("strong",null,"Show in table"))),r.createElement(z.fI,{style:{flex:1,justifyContent:"flex-end"}},c)),r.createElement(W,{style:{opacity:0}},"\u2192"),r.createElement("strong",{style:{flex:1}},"Rename fields")),i.map(e=>r.createElement(V,{struct:e.struct,key:e.id,column:e,onChange:l,allColumns:n})))}),V=e=>{let{allColumns:t,column:n,onChange:a,struct:i}=e,[l,o]=(0,r.useState)(n.title),s=r.useMemo(()=>t.filter(e=>e.id!==n.id).some(e=>e.title===l),[t,n.id,l]),c=0===l.length?"Cannot be empty":"-"===l?"Cannot contain dashes":s?"A column with this name already exists":void 0,d=e=>a({...n,selected:e});return r.createElement(j,{key:n.id},r.createElement(Y,{onClick:()=>d(!n.selected),leftAddon:r.createElement(C.Sc,{checked:n.selected,size:"m",onChange:()=>{}}),rightAddon:r.createElement(q,{struct:i,typeHint:n.typeHint})},n.originalTitle),r.createElement(W,null,"\u2192"),r.createElement(G,null,r.createElement(L.dN.Outline,{value:l,onChange:e=>{c||a({...n,title:e}),o(e)},size:"xl",fullWidth:!0,errorMessage:c,noClear:!0})))},q=e=>{let{struct:t,typeHint:n}=e;return t===D.u.Array?r.createElement(B.m,{content:"Produces multiple rows",placement:"right"},r.createElement(Q,null,r.createElement(C.In,{icon:"HoverOutline",color:a.ui$}))):n?.signature[0]&&H.J.is(n.signature[0].facets)?r.createElement(B.m,{content:"The rows in this column will contain multiple values that are not known in advance. Consider adjusting the action configuration to fix this.",placement:"right"},r.createElement(Q,null,r.createElement(C.In,{icon:"TableOutline",color:a.ui$}))):null},j=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 16px 1fr;
  gap: 12px;
  padding: 8px 0;
  align-items: center;
`,W=i.Ay.span`
  font-size: 16px;
  color: ${a.ui$};
  font-weight: bold;
  flex-shrink: 0;
`,G=i.Ay.div`
  flex: 1 1 50%;
  min-width: 0;
`,Y=(0,i.Ay)(C.IU)`
  background: ${a.hi1};
  flex: 1 1 50%;
  min-width: 0;
`,Q=(0,i.Ay)("span")`
  margin-top: 2px;
`;var J=n(41917),Z=n(52497),X=n(13489),K=n(45216),ee=n(36213),et=n(14166),en=n(21799);let ea=e=>{let{columns:t,value:n,onChange:a,...i}=e,[l,o]=r.useState(null),[s,c]=r.useState(""),d=r.useRef(""),u=r.useRef(null),p=(0,et.d)(a,100),m=r.useCallback(e=>{c(e);let n=e.trim();if(!n){d.current="",p(null),o(null);return}try{let e=K.YK(n,t);o(e),e.ok&&(d.current=n,p(e.value))}catch(e){o({ok:!1,error:ee.sF.from(e).message,location:{start:0,end:0}})}},[t,p]);return r.useEffect(()=>{let e=n?K.MY(n,t)??"":"";e!==d.current&&(d.current=e,c(e))},[t,n]),r.createElement(er,null,r.createElement(ei,{...i,value:s,onChange:m,ref:u}),l?.ok===!1&&r.createElement(el,{onClick:()=>{u.current&&!l?.ok&&(u.current.focus(),u.current.setSelectionRange(l?.location.start??0,l?.location.end??u.current.value.length))}},l.error))},er=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,ei=(0,i.Ay)(L.dN.Flat)`
  font-family: "Roboto Mono", monospace;
  font-size: ${en.eA.I.size.m+2}px;
  font-weight: ${en.eA.I.weight.normal};
  line-height: ${en.eA.I.lineHeight.m+2}px;
`,el=i.Ay.div`
  cursor: pointer;
  color: ${a.CCs};
`;var eo=n(77956),es=n(20220),ec=n(35501);let ed=[{facets:J.X9(Z.Y)}],eu={signature:ed,tag:X.E.Any,typeLabel:"Interface"},ep=r.memo(e=>{let{state:t,dispatch:n,allColumns:a}=e,{statements:i,trigger:l}=t.pb,o=[...i,l].find(e=>e?.index===t.statementIndex)??null,c=s.Nf(o),[d,u]=r.useState(-1),p=c?.conditionalExecution?.args??[],m=c?.conditionalExecution&&K.zZ(c?.conditionalExecution),g=r.useCallback(e=>{n({type:"OperatorsReplaced",operators:e?"OpField"===e.type?{type:"OpCombination",combine:"&&",args:[e]}:e:{type:"OpCombination",combine:"&&",args:[]}})},[n]),y=r.useCallback(()=>{n({type:"ClickedAddConditional",statementIndex:c?.index??0}),u(p.length)},[n,c?.index,p.length]);if(m)return r.createElement(r.Fragment,null,r.createElement(z.VP,{style:{padding:"12px 24px 0"}},r.createElement(eC,null,"Only run action if ...")),r.createElement(z.VP,{style:{padding:"12px 32px"}},r.createElement(ef,null,r.createElement(eh,null,r.createElement(eE,{$colSpan:4},r.createElement(eS,null,"Expression too complex for interactive editing"))),r.createElement(eb,null,r.createElement(ea,{columns:a,value:c?.conditionalExecution,onChange:g})))));if(!c||!p.every(e=>"OpField"===e.type))return null;let f=p.some(e=>e.op?.arity===2),h=0===p.length;return r.createElement(r.Fragment,null,r.createElement(z.VP,{style:{padding:"12px 24px 0"}},r.createElement(eC,null,"Only run action if ...")),r.createElement(z.VP,{style:{padding:"12px 24px"}},r.createElement(ef,null,r.createElement(eh,null,r.createElement(eE,{onClick:h?y:void 0},r.createElement(ev,null,"Field")),r.createElement(eE,{$colSpan:f?void 0:2,onClick:h?y:void 0},r.createElement(ev,null,"Operator")),f?r.createElement(eE,null,r.createElement(ev,null,"Value")):null,r.createElement(ex,null,r.createElement(C.$n,{variant:"flat",icon:"PlusOutline",tooltipText:"Add condition",onClick:y}))),p.map((e,a)=>r.createElement(eh,{key:a},r.createElement(eE,null,r.createElement(em,{state:t,statement:c,column:e.column,isNew:d===a,onChange:t=>{u(-1),n({type:"ConditionalOperatorChanged",statementIndex:c?.index??0,opIndex:a,value:{...e,column:t}})},onDismiss:()=>{u(-1),n({type:"ClickedDeleteConditional",statementIndex:c?.index??0,opIndex:a})}})),r.createElement(eE,{$colSpan:e.op?.arity===1?2:void 0},r.createElement(eg,{state:t,op:e.op,onFetchSuggestions:()=>{n({type:"OperatorsReloadRequested",typeSignature:A.gy(t.pb,e.column)?.typeHint?.signature??[]})},onChange:t=>{n({type:"ConditionalOperatorChanged",statementIndex:c?.index??0,opIndex:a,value:{...e,op:t}})}})),e.op?.arity===2&&r.createElement(eE,null,r.createElement(ey,{state:t,dispatch:n,typeSignature:e.typeHint?.signature??[],onChange:t=>{n({type:"ConditionalOperatorChanged",statementIndex:c?.index??0,opIndex:a,value:{...e,value:t}})},value:e.value,op:e.op})),r.createElement(ex,null,r.createElement(C.$n,{size:"m",variant:"flat",icon:"TrashBinOutline",tooltipText:"Delete condition",onClick:()=>{n({type:"ClickedDeleteConditional",statementIndex:c?.index??0,opIndex:a})}})))),r.createElement(eb,null,r.createElement(ea,{columns:a,value:c?.conditionalExecution,onChange:g})))))}),em=e=>{let{state:{pb:t},statement:n,column:a,isNew:i,onChange:l,onDismiss:o}=e,s=(0,F.Qz)(),c=r.useRef(!1),d=r.useMemo(()=>(0,A.gy)(t,a),[t,a]),u=r.useMemo(()=>({type:"TableColumnReferenceExpression",id:a,displayHint:{description:d?.title??a,label:d?.title??a,icon:"StudioTableOutline"}}),[a,d]);return r.useEffect(()=>{i&&(s(n?.index??0,eu),c.current=!0)},[n?.index,i,s]),r.createElement(z.VP,null,r.createElement(ec.k,{open:i,onSelect:e=>{(0,p.Cw)(e.value,{visitTableColumnReferenceExpression:e=>(c.current=!1,l(e.id),!1)})},onOpenChanged:e=>{e?s(n?.index??0,eu):c.current&&""===a&&(c.current=!1,o())},fullWidth:!0},r.createElement(eo.T,{expr:u,variant:"default",showArrow:!0,bare:!0})))},eg=e=>{let[t,n]=r.useState(""),{state:{operators:a},op:i,onChange:o,onFetchSuggestions:s}=e,c=r.useMemo(()=>"success"!==a.type?l.j.NotAsked:l.j.Success(a.value.map(e=>({type:"ConstantValueExpression",displayHint:{description:e.displayHint.label,label:e.displayHint.label,icon:e.displayHint.icon},typeHint:eu,value:e,validationStatus:[],weight:1}))),[a]),d=r.useMemo(()=>({type:"ConstantValueExpression",value:i,typeHint:eu,displayHint:i?{description:i.displayHint.label,label:i.displayHint.label,icon:i.displayHint.icon}:void 0}),[i]),u=i?.arity===2?void 0:"span 2",p=r.useMemo(()=>e=>{n(e),s()},[s]),m=r.useMemo(()=>{if("success"!==c.type)return l.j.Success([]);let e=c.value.filter(e=>e.displayHint.label.toLowerCase().includes(t.toLowerCase()));return l.j.Success(e)},[c,t]);return r.createElement(z.VP,{style:{gridColumn:u}},r.createElement(es.S,{value:i,onFetchSuggestion:p,onSelect:e=>{"ConstantValueExpression"===e.type&&function(e){return"object"==typeof e&&null!==e&&"id"in e&&"arity"in e&&"displayHint"in e}(e.value)&&o(e.value)},suggestions:m,signature:ed},r.createElement(eo.T,{expr:d,variant:"default",showArrow:!0,bare:!0})))},ey=e=>{let{state:t,value:n,onChange:a,dispatch:i,typeSignature:l}=e;return r.createElement(z.VP,null,r.createElement(es.S,{value:n,onFetchSuggestion:e=>{i({type:"SuggestionsRequested",userInput:e,typeSignature:l,forceRefreshCache:!1,pbArgumentsOnly:!1})},onSelect:e=>{"ConstantValueExpression"===e.type&&a(e)},suggestions:t.suggestions,signature:l},r.createElement(eo.T,{expr:n??{type:"MissingExpression"},variant:"default",showArrow:!0,bare:!0})))},ef=i.Ay.div`
  box-shadow: 0px 2px 4px 0px #0000000a;
  border: 1px solid #f1f3f4;
  background: ${a.ONy};
  border-radius: 8px;
`,eh=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 48px;
  align-items: center;
`,eb=i.Ay.div`
  padding: 8px 8px;
  background: ${a.o$k};
`,ex=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${a.Tc2};
  height: 49px;
  background: ${a.ONy};
`,eE=i.Ay.div`
  width: 100%;
  border-right: 1px solid ${a.Tc2};
  border-bottom: 1px solid ${a.Tc2};
  background: ${a.ONy};
  ${e=>{let{$colSpan:t}=e;return t&&`grid-column: span ${t};`}};
  ${e=>{let{onClick:t}=e;return t&&"cursor: pointer;"}};
`,ev=(0,i.Ay)(N.P)`
  display: flex;
  align-items: center;
  color: ${a.FCg};
  margin: 0 14px;
  height: 49px;
`,eC=(0,i.Ay)(N.P)`
  font-weight: 600;
  color: ${a.t14};
`,eS=(0,i.Ay)(N.P)`
  text-align: center;
  color: ${a.xjr};
  margin: 24px;
`;var ek=n(21416),ew=n(58651);let eA=e=>!!ek.N4.find(t=>t.commandId===e),eI=ek.N4.find(e=>"use_combined_scaper_model_on_active_tab"===e.commandId),eP=ek.N4.find(e=>"use_combined_scaper_model_in_background"===e.commandId),e$=r.memo(function(e){let{hasSchedule:t,selected:n,onChange:i}=e;return r.createElement(C.VP,{gap:24},r.createElement(C.fI,{gap:16,style:{minWidth:0}},r.createElement(C.VP,{style:{flex:1},gap:12},r.createElement(ew.A1,null,"Target")),r.createElement(N.P,{$small:!0,style:{color:a.wmS,lineHeight:"20px",alignSelf:"start",marginTop:4}},"Required")),r.createElement(eF,null,r.createElement(eT,{onClick:()=>eP&&i(eP)},r.createElement(C.fI,{gap:20,style:{alignItems:"start"}},r.createElement("span",{style:{marginTop:6}},r.createElement(C.q_,{checked:"use_combined_scaper_model_in_background"===n,onChange:()=>{}})),r.createElement(C.VP,{gap:4},r.createElement(N.P,{$bold:!0},"URLs"),r.createElement(N.a,{$small:!0},"Enter URLs you want to scrape. This will open and scrape all links in the background.")))),eR(t,"Scraping on the current website can not run on a schedule",r.createElement(eT,{onClick:()=>!t&&eI&&i(eI),disabled:t},r.createElement(C.fI,{gap:20,style:{alignItems:"start"}},r.createElement("span",{style:{marginTop:6}},r.createElement(C.q_,{checked:"use_combined_scaper_model_on_active_tab"===n,onChange:()=>{}})),r.createElement(C.VP,{gap:4},r.createElement(N.P,{$bold:!0},"Current website"),r.createElement(N.a,{$small:!0},"Scrape the website in the browser tab that the Bardeen extension was opened in")))))))}),eT=(0,i.Ay)(C.h$)`
  padding: 20px 16px;
  text-align: start;
`,eF=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,eR=(e,t,n)=>e?r.createElement(B.m,{content:t},r.createElement("span",null,n)):n;var eM=n(44918),eO=n(37504),e_=n(66712);let eN=e=>!!ek.ER.find(t=>t.commandId===e),eB=ek.ER.find(e=>"act_using_goal"===e.commandId),eD=ek.ER.find(e=>"act_using_goal_in_background"===e.commandId),eH=r.memo(function(e){let{hasSchedule:t,selected:n,onChange:i}=e;return r.createElement(C.VP,{gap:24},r.createElement(C.fI,{gap:16,style:{minWidth:0}},r.createElement(C.VP,{style:{flex:1},gap:12},r.createElement(ew.A1,null,"Target")),r.createElement(N.P,{$small:!0,style:{color:a.wmS,lineHeight:"20px",alignSelf:"start",marginTop:4}},"Required")),r.createElement(eL,null,r.createElement(ez,{onClick:()=>eD&&i(eD)},r.createElement(C.fI,{gap:20,style:{alignItems:"start"}},r.createElement("span",{style:{marginTop:6}},r.createElement(C.q_,{checked:"act_using_goal_in_background"===n,onChange:()=>{}})),r.createElement(C.VP,{gap:4},r.createElement(N.P,{$bold:!0},"URLs"),r.createElement(N.a,{$small:!0},"Enter URLs you want to scrape. This will open and scrape all links in the background.")))),eU(t,"Scraping on the current website can not run on a schedule",r.createElement(ez,{onClick:()=>!t&&eB&&i(eB),disabled:t},r.createElement(C.fI,{gap:20,style:{alignItems:"start"}},r.createElement("span",{style:{marginTop:6}},r.createElement(C.q_,{checked:"act_using_goal"===n,onChange:()=>{}})),r.createElement(C.VP,{gap:4},r.createElement(N.P,{$bold:!0},"Current website"),r.createElement(N.a,{$small:!0},"Scrape the website in the browser tab that the Bardeen extension was opened in")))))))}),ez=(0,i.Ay)(C.h$)`
  padding: 20px 16px;
  text-align: start;
`,eL=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,eU=(e,t,n)=>e?r.createElement(B.m,{content:t},r.createElement("span",null,n)):n,eV=r.memo(e=>{let{state:t,dispatch:n}=e,a=t.pb.statements.find(e=>e.index===t.statementIndex)??null,i=s.Nf(a)?.name??"",l=!!s.Nf(s.ir(t.pb).triggerStatement);return eA(i)?r.createElement(e$,{hasSchedule:l,selected:i,onChange:e=>n({type:"SelectedScraperCommand",command:e})}):eN(i)?r.createElement(eH,{hasSchedule:l,selected:i,onChange:e=>n({type:"SelectedBrowserAgentCommand",command:e})}):void 0}),eq={use_combined_scaper_model_in_background:{args:{url:{visibility:"visible",inputType:"reference"}},condition:e=>!(0,A.tP)(e.pb,e.statementIndex)},act_using_goal_in_background:{args:{url:{visibility:"visible",inputType:"reference"}},condition:e=>!(0,A.tP)(e.pb,e.statementIndex)}},ej=e=>{if(null==e.statementIndex)return null;let t=(0,A.Xc)(e.pb,e.statementIndex);if(!t||"FunctionCallStatement"!==t.type)return null;let n=eq[t.name];return n&&n.condition(e)?n.args:null},eW=r.memo(e=>{let{state:t,dispatch:n}=e,{args:i}=t.pb,{statements:l,trigger:o}=t.pb,c=[...l,o].find(e=>e?.index===t.statementIndex)??null,d=s.Nf(c),u=(0,r.useCallback)(e=>{n({type:"FunctionStatementAction",index:d?.index??0,action:e})},[d?.index,n]),p=(0,x.i8)(n,"PlaybookArgsAction"),m=r.useMemo(()=>({allowAskMeEveryTime:!1,onRevalidatePlaybook:()=>{n({type:"ForceRevalidatePlaybook"})},playbookArgs:i,statementIndex:d?.index??0,...(0,T.m)(p)}),[n,d?.index,i,p]);if(!d)return null;let g=(0,A.tP)(t.pb,d.index);return r.createElement(e_.S,{value:m},r.createElement(C.VP,{gap:40,style:{padding:"36px 44px 48px",backgroundColor:a.o$k,borderRadius:12}},r.createElement(eO.t,{recoverable:!0,userMsg:"Sorry! Something went wrong - please try again."},g&&r.createElement(eV,{state:t,dispatch:n}),r.createElement(I.qi,{overrides:ej(t),state:d,dispatch:u,isFirstStatement:g}))))});var eG=n(27745);let eY=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Setup",a="FunctionCallStatement"===e.type?e.columns:[];return{mode:"edit",statementIndex:e.index,selectedTab:n,pb:{...t},originalPb:{...t},playbookArgsState:T.ue,isLoading:!1,columns:a,operators:l.j.NotAsked,suggestions:l.j.NotAsked,confirmState:null}},eQ=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{mode:"create",statementIndex:null,selectedTab:"Select Option",commandGroup:e,pb:{...t},originalPb:{...t},playbookArgsState:T.ue,columns:[],operators:l.j.NotAsked,suggestions:l.j.NotAsked,appendTo:n,isLoading:!1,confirmState:null}},eJ=(e,t,n,a)=>{let r=t=>({...e,modal:{type:"StudioCardEditor",studioCardEditorState:t}});switch(n.type){case"ClickedTabHeader":if("Select Option"===n.tab&&"create"===t.mode)return[r({...t,selectedTab:n.tab,statementIndex:null,pb:{...t.pb,statements:null!==t.statementIndex?t.pb.statements.filter(e=>e.index!==t.statementIndex):t.pb.statements}}),[]];return[r({...t,selectedTab:n.tab}),[]];case"SelectedAction":{let{command:i}=n;if(!o.fD(a.subscription,i.needsPaidFeature))return[{...e,overlayModal:{type:"premiumFeature"}},[]];return[r({...t,isLoading:!0}),[k.u0(t.pb,i,(e,t)=>({type:"SelectedActionSuccess",statement:e,plugins:t}))]]}case"SelectedActionSuccess":{let i=(0,A.ph)(n.statement,n.statement.index+1),l=i.displayHint?.requiresPaymentPlan??[];if(o.CN(a.subscription,l))return[{...e,overlayModal:{type:"premiumFeature"}},[]];let c={...t.pb,plugins:n.plugins};if("create"===t.mode){let e=s.UR(i),a=s.El(i);if(e){let e=c.statements[0]??null,t=e&&"FunctionCallStatement"===e.type?A.g9(i,e):i;c=(0,w.O)({...c,statements:[...c.statements,t]})}else if(a)c={...c,trigger:e1(i)};else if(n.replaceImportStatement)c=s.Bs(c,{...s.ir(c),importStatement:i});else{let e=s.ir(c);c=s.Bs(c,{...e,statements:[..."start"===t.appendTo?[i]:[],...e.statements,..."end"===t.appendTo?[i]:[]]})}}else c={...t.pb,plugins:n.plugins,statements:t.pb.statements.map(e=>e.index===t.statementIndex?i:e)};if(0===i.args.length&&"create"===t.mode&&e.builderV2State){let t=A.ZA(e.builderV2State,()=>A.Ej(c,i.index));return[{...e,modal:{type:"None"},builderV2State:t},[k.Yt(i.index)]]}return[r({...t,statementIndex:i.index,selectedTab:"Setup",pb:c,isLoading:!0}),[M(c)]]}case"PlaybookArgsAction":{let e=t.pb,[{pb:a,...i},l]=T.Ff({pb:e,...t.playbookArgsState},n.action),o=(0,A.C7)(a,e);return[r({...t,pb:o,playbookArgsState:i,isLoading:!0}),[...l.map((0,x.zy)(e=>({type:n.type,action:e}))),M(o)]]}case"ForceRevalidatePlaybook":return[r({...t,isLoading:!0}),[M(t.pb,{invalidateCache:!0})]];case"FunctionStatementAction":{let e=[],{index:i,type:l}=n,o="ChangedArgument"===n.action.type?n.action.arg.name:null,s=(0,A.li)(t.pb,r=>{if(r.index===i){let s=r.columns;o&&r.displayHint?.columnBoundArgs.includes(o)&&(s=[]);let[d,u]=I.Ff(n.action,r,t.pb,{from:"blank",initPlaybook:null,lastDescribedPlaybook:null,trackInvocationWhenSaved:!1},a);return(0,c.tM)(e,u.map((0,x.zy)(e=>({type:l,action:e,index:i})))),{...r,...d,columns:s}}return r});s=(0,A.yO)(s);let d="ChangedArgument"===n.action.type;return d&&e.push(M(s,{debounce:"debounce"in n.action&&n.action.debounce})),[r({..._(t,s),...d?{isLoading:!0}:{}}),e]}case"ValidatedPlaybookFetched":{let e=(0,A.C7)(n.pb,t.pb),a=null!=t.statementIndex?(0,A.Xc)(e,t.statementIndex):null,i=a?.type==="FunctionCallStatement"?a:null,l=i?.columns??[];return[r({...O(t,(0,w.O)(e)),isLoading:!1,columns:l}),[]]}case"SelectedScraperCommand":{let a=t.pb.statements.find(e=>e.index===t.statementIndex)??null,r=a&&s.Nf(a)?.args.find(e=>"model"===e.name)?.value;return[e,[k.u0(t.pb,n.command,(e,t)=>({type:"SelectedActionSuccess",replaceImportStatement:!0,statement:{...e,args:e.args.map(e=>"model"===e.name?{...e,value:r??null}:e)},plugins:t}))]]}case"SelectedBrowserAgentCommand":{let a=t.pb.statements.find(e=>e.index===t.statementIndex)??null,r=a&&s.Nf(a)?.args.find(e=>"goal"===e.name)?.value;return[e,[k.u0(t.pb,n.command,(e,t)=>({type:"SelectedActionSuccess",statement:{...e,args:e.args.map(e=>"goal"===e.name?{...e,value:r??null}:e)},plugins:t}))]]}case"UpdatedColumns":{let e=t.pb,a=(0,A.li)(e,e=>e.index===t.statementIndex?{...e,columns:n.columns}:e);return[r({...t,pb:a,columns:n.columns}),[M(a)]]}case"ClickedJumpToError":if(!(null!=n.error.argumentName))return[r({...t,selectedTab:"Run Conditions"}),[]];return[r({...t,selectedTab:"Setup"}),[k.Cr(n.error.argumentName??"")]];case"ClickedAddConditional":{let e=t.pb,n=(0,A.li)(e,e=>{if(e.index===t.statementIndex){let t=e.conditionalExecution?.args??[];return{...e,conditionalExecution:{type:"OpCombination",combine:e.conditionalExecution?.combine??"&&",args:[...t,{type:"OpField",column:"",op:d.HN,typeHint:d.NF,value:null}]}}}return e});return[r({...t,pb:n}),[]]}case"ClickedDeleteConditional":{let e=t.pb,a=(0,A.li)(e,e=>{if(e.index===t.statementIndex){let t=[...e.conditionalExecution?.args??[]];return t.splice(n.opIndex,1),{...e,conditionalExecution:0===t.length?null:{type:"OpCombination",combine:e.conditionalExecution?.combine??"&&",args:t}}}return e});return[r({...t,pb:a}),[M(a)]]}case"OperatorsReplaced":{let e=t.pb,a=(0,A.li)(e,e=>e.index===t.statementIndex?{...e,conditionalExecution:n.operators}:e);return[r({...t}),[M(a,{invalidateCache:!1})]]}case"ConditionalOperatorChanged":{let e=t.pb,a=[],i=(0,A.li)(e,r=>{if(r.index===t.statementIndex){let t=r.conditionalExecution?.args?.[n.opIndex]??null;if(!t||"OpField"!==t.type||"OpField"!==n.value.type)return r;if(t.column!==n.value.column){let t=A.gy(e,n.value.column)?.typeHint;(0,c.tM)(a,t?.signature??[])}let i=[...r.conditionalExecution?.args??[]];return i.splice(n.opIndex,1,n.value),{...r,conditionalExecution:{type:"OpCombination",combine:r.conditionalExecution?.combine??"&&",args:i}}}return r});return[r({...t,pb:i}),[M(i)]]}case"OperatorsReloadRequested":return[r({...t,operators:l.j.Loading}),[k.uB([n.typeSignature],e=>({type:"OperatorsReceived",operators:e}))]];case"OperatorsReceived":return[r({...t,operators:l.j.Success(n.operators)}),[]];case"SuggestionsRequested":return[r({...t,suggestions:l.j.Loading}),[k.hn({pb:t.pb,index:t.statementIndex??-1,reqParams:{userInput:n.userInput,argumentName:null,typeSignature:n.typeSignature,forceRefreshCache:n.forceRefreshCache,isPlaybookArgument:!1,pbArgumentsOnly:n.pbArgumentsOnly},onDone:e=>{let{suggestions:t}=e;return{type:"SuggestionsRequestedSuccess",suggestions:t}}})]];case"SuggestionsRequestedSuccess":return[r({...t,suggestions:l.j.Success(n.suggestions)}),[]];case"ClickedCancelConfirmation":return[r({...t,confirmState:null}),[]];default:(0,u.HB)(n)}},eZ=r.memo(function(e){let t,{state:n,dispatch:a,onClose:i,previousActions:l}=e,o=(0,E.jL)(),{statementIndex:d,mode:u,pb:f}=n,{statements:h,trigger:x}=f,k=[...h,x].find(e=>e?.index===d)??null,w=r.useCallback(e=>a({type:"SelectedAction",command:e}),[a]),I=r.useMemo(()=>A.Zg(f,d??0,!0).filter(e=>"FunctionCallStatement"===e.type),[f,d]),T=r.useMemo(()=>{let e=[];return(0,p.bZ)(f,{visitFunctionCallStatement:t=>!!s.Qo(t,m.OP)||((0,c.tM)(e,t.columns),!0)}),e},[f]),R=k&&k.validationStatus?.find(e=>"disconnected"===e.type),{statementIcon:M,statementName:O}=g.NM(k);"create"===u&&"Select Option"===n.selectedTab&&(M=n.commandGroup.icon,O=n.commandGroup.name);let _=k&&s.Qo(k,y.qv),N=(e,t)=>{o({type:"StudioCardEditorExitRequested",mode:e,number:t})},B=k&&A.tP(f,k.index),D=r.useMemo(()=>{let e="create"===u&&!k,t=[{id:"Setup",label:"Setup",disabled:e}],n=k&&s.Qo(k,m.OP),a=k&&s.Qo(k,y.qv);return n||a||t.push({id:"Outputs",label:"Outputs",disabled:e}),n&&t.unshift({id:"Select Option",label:"Select Option",disabled:!1}),B||a||t.push({id:"Run Conditions",label:"Run Conditions",disabled:e}),t},[u,k,B]),H=!!s.Nf(k)?.validationError;if(!k&&"edit"===u)return null;let z=eA(s.Nf(k)?.name??""),L=(k&&(0,A.nE)(k,!0)[0])??null;return t=R?r.createElement(eX,{style:{padding:24,justifyContent:"center",flexGrow:1}},r.createElement(S.e,{app:R.plugin,from:"builderV2"})):r.createElement(r.Fragment,null,r.createElement(C.tU,{tabs:D,active:n.selectedTab,onTabClick:e=>{a({type:"ClickedTabHeader",tab:e})}},r.createElement(C.fI,{center:!0,style:{flexGrow:1,justifyContent:"flex-end",paddingInlineEnd:24}},L&&r.createElement(C.$n,{size:"m",variant:"ghost",round:!0,icon:"TriangularExclamationBold",tooltipText:(0,A.p0)(L.status),onClick:()=>a({type:"ClickedJumpToError",error:L}),style:e0}),k&&!H?_?r.createElement(C.$n,{size:"m",variant:"primary",text:"Activate now",onClick:()=>N("activate",0)}):r.createElement(C.fI,{gap:8},r.createElement(C.$n,{size:"m",variant:"flat",text:"Save",onClick:()=>N("save-only",0)}),r.createElement($.B,{statements:I,run:e=>N(null==e?"run-all":"run-first",e??0)},r.createElement(C.$n,{size:"m",variant:"primary",text:"Run",icon:"RadioPlayBold",addonLeft:r.createElement(b.$,null)}))):null)),r.createElement(eX,{itemGap:0,withScrollbar:!0,"data-builder-role":"statement-container"},(()=>{switch(n.selectedTab){case"Select Option":if("create"===n.mode)return r.createElement(eM.O,{group:n.commandGroup,onSelect:w});if(k&&s.Qo(k,m.OP))return r.createElement(eM.O,{group:m.KE,onSelect:w});return null;case"Setup":return r.createElement(eW,{dispatch:a,state:n});case"Outputs":return r.createElement(U,{dispatch:a,state:n,allColumns:T});case"Run Conditions":return r.createElement(ep,{dispatch:a,state:n,allColumns:T})}})()),n.confirmState?r.createElement(v.u,{dispatch:o,state:n.confirmState}):null),r.createElement(F.JF,{suggestions:l},r.createElement(eG.B,{onClose:e=>{"escape"===e&&i()},icon:z?P.O9(s.Nf(k),"model")?.icon??M:M,title:O},r.createElement(C.Jn,{onClick:i,abs:!0,style:{right:14,top:10},tabIndex:-1}),t))}),eX=(0,i.Ay)(C.mH)`
  overflow-y: auto;
  background-color: ${a.o$k};
`,eK=e=>"StudioCardEditor"===e.modal.type?e.modal.studioCardEditorState.pb:null,e0={"--icon-color":a.KE7},e1=e=>(e?.args[0]&&"time"===e.args[0].name&&(e.args[0].value={type:"ConstantValueExpression",value:f.bE.from(Date.now()).serialize()}),e?.args[1]&&"frequency"===e.args[1].name&&(e.args[1].value={type:"ConstantValueExpression",value:h.d.fromString("every hour")?.serialize()}),e)},44918:(e,t,n)=>{n.d(t,{O:()=>p,V:()=>y});var a=n(69670),r=n(67331),i=n(14041),l=n(39716),o=n(49861),s=n(21416),c=n(59750),d=n(28926),u=n(27461);let p=i.memo(function(e){let{group:t,onSelect:n}=e,{subscription:a}=(0,c.r)();return i.useEffect(()=>{1===t.commands.length&&t.commands[0]&&n(t.commands[0])},[t.commands,n]),i.createElement(m,null,i.createElement(g,null,t.commands.map((e,t)=>i.createElement(y,{autoFocus:0===t,premium:!o.fD(a,e.needsPaidFeature),key:e.commandId,icon:e.icon,id:e.commandId,title:e.displayName,description:e.description,onSelect:()=>n(e)}))))}),m=(0,l.Ay)(u.VP)`
  height: 100%;
`,g=(0,l.Ay)(u.VP)`
  gap: 16px;
  padding: 24px;
`,y=e=>{let{icon:t,id:n,title:a,description:r,premium:l,onSelect:o,autoFocus:c}=e,u=s.bY.commands.some(e=>e.commandId===n);return i.createElement(f,{key:n,role:"button","aria-label":n,onClick:o,autoFocus:c},i.createElement(h,{"aria-hidden":!0},i.createElement(d.In,{icon:t,size:24})),i.createElement(b,null,i.createElement(x,{style:{display:"flex",alignItems:"center"}},a," ",l&&i.createElement(d.R,{small:!0,style:{marginLeft:4}}),u&&i.createElement(d.ab,{variant:"gray",style:{marginLeft:"auto"}},"Free")),i.createElement(E,null,r)))},f=(0,l.Ay)(d.h$)`
  position: relative;
  display: flex;
  align-items: stretch;
  padding: 0;
  text-align: start;
  --icon-size: 32px;
`,h=l.Ay.div`
  width: 92px;
  height: 114px;
  background-color: ${a.KxS};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,b=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 24px;
  flex: 1;
`,x=(0,l.Ay)(r.H6)`
  color: ${a.CP};
`,E=(0,l.Ay)(r.a)`
  color: ${a.FCg};
`},27745:(e,t,n)=>{n.d(t,{B:()=>s});var a=n(67331),r=n(69670),i=n(14041),l=n(39716),o=n(28926);let s=e=>{let{onClose:t,icon:n,title:l,children:s}=e;return i.createElement(c,{isOpen:!0,onClose:t,flex:!0},i.createElement(d,null,i.createElement(o.In,{icon:n,size:24}),i.createElement(a.P,{$ellipsis:!0,$color:r.vh3,style:{flex:1,flexShrink:1}},l)),s)},c=(0,l.Ay)(o.aF)`
  width: 100%;
  max-width: 720px;
  border: 2px solid ${r.NcT};
  top: 15vh;
  margin: 0 auto auto auto;
  max-height: 70vh;
  min-height: 300px;
  background-color: ${r.o$k};
  display: flex;
  flex-direction: column;
`,d=(0,l.Ay)(o.fI)`
  gap: 20px;
  padding: 14px 24px;
  border-bottom: 1px solid ${r.Tc2};
`},2289:(e,t,n)=>{n.d(t,{A:()=>u});var a=n(67331),r=n(69670),i=n(14041),l=n(39716);let o=n.p+"a877f990a6c057ea129d.png";var s=n(59750),c=n(63400),d=n(28926);let u=e=>{let{show:t,title:n,onCancel:l}=e,{paymentPlans:u}=(0,s.r)(),f=(0,c.V)(u);if(!t)return null;let h={fullWidth:!0,round:!0,size:"xl"};return i.createElement(d.aF,{isOpen:!0,style:{width:480},onClose:l},i.createElement(p,null,i.createElement(m,null,i.createElement(d.In,{icon:{url:o},size:64})),i.createElement(m,null,i.createElement(a.H1,null,n??"Your subscription changes")),i.createElement(g,null,e.loading?i.createElement(d.VP,{style:{alignItems:"center"}},i.createElement(d.y$,null),i.createElement(a.P,{color:r.ui$},"Crunching numbers...")):f?i.createElement(a.P,{color:r.ui$},e.remainingTimeCharge>0?i.createElement(i.Fragment,null,"You will be"," ",i.createElement("strong",null,"charged ",(0,c.N)(e.remainingTimeCharge)," now")," and"," ",(0,c.N)(e.nextPeriodCharge)," from the next billing period onwards."):i.createElement(i.Fragment,null,"Your credits will be available until the end of this billing period. Starting from the next billing period, you'll be charged"," ",(0,c.N)(e.nextPeriodCharge),".")):i.createElement(a.P,{color:r.ui$},(0,c.N)(e.remainingTimeCharge)," now for the remaining billing period and"," ",(0,c.N)(e.nextPeriodCharge)," from then on.")),i.createElement(y,null,e.loading?i.createElement(d.$n,{...h,disabled:!0,onClick:void 0,text:"",variant:"primary"}):i.createElement(d.$n,{...h,onClick:e.onConfirm,text:e.confirmText||"Confirm",variant:"primary"}),i.createElement(d.$n,{round:!0,size:"xl",fullWidth:!0,variant:"outlined",onClick:l,text:"Cancel"}))))},p=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
`,m=l.Ay.div`
  text-align: center;
`,g=l.Ay.div`
  padding: 0 8px;
  text-align: center;
`,y=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`},80389:(e,t,n)=>{n.d(t,{uA:()=>ax,$h:()=>ay,Lq:()=>af,Ge:()=>ah,Ff:()=>ab});var a=n(14041),r=n(14744),i=n(117),l=n(48143),o=n(93510),s=n(19431),c=n(67331),d=n(69670),u=n(39716),p=n(28926);let m=e=>{let{onClose:t,teamName:n}=e;return a.createElement(p.aF,{isOpen:!0,onClose:t},a.createElement(g,{onSubmit:e=>{e.preventDefault(),t()}},a.createElement(h,null,a.createElement(b,null,a.createElement(p.In,{icon:"TexturedSpace",size:66}),a.createElement(x,{icon:"TexturedConfetti",size:32}))),a.createElement(c.H3,{style:{wordBreak:"break-word"}},"You are now part of ",n,"\u2019s team."),a.createElement(y,null,"Start exploring your team\u2019s automations or share your own and save even more time together."),a.createElement(f,null,a.createElement(p.$n,{variant:"primary",size:"xl",text:"Explore automations",type:"submit",round:!0}))))},g=u.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 48px;
  max-width: 482px;
  text-align: center;
`,y=(0,u.Ay)(c.P)`
  color: ${d.wmS};
`,f=u.Ay.div`
  display: flex;
  justify-content: center;
  padding: 8px 0px;
`,h=u.Ay.div`
  display: flex;
  justify-content: center;
`,b=u.Ay.div`
  position: relative;
`,x=(0,u.Ay)(p.In)`
  position: absolute;
  bottom: -16px;
  right: -16px;
`;var E=n(78445),v=n(7696);let C=n.p+"21dc1e3e56dcd387c80e.svg";var S=n(53747),k=n(2289),w=n(32005);let A=["Standardize team automations","Centralized billing & team management","Admin analytics dashboard","Priority support, training and dedicated customer success manager"],I=e=>{let{state:t,dispatch:n,onClose:r}=e,{subscription:i}=(0,l.rD)(),o=i?.mode;(0,a.useEffect)(()=>{"PRO"===o&&n({type:"Team/CreateSpaceCostCalculationRequested"})},[o,n]);let s=(0,a.useCallback)(e=>e.split(/[\s,]+/).map(e=>e.trim()).filter(e=>e.length>0).filter(e=>!(0,w.B9)(e)),[]),d=(0,a.useCallback)(()=>{n({type:"Team/CreateSpaceRequested",emails:Array.from(new Set(t.upgradeToTeam.invitationInput.match(v.N)||[]))})},[n,t.upgradeToTeam.invitationInput]),[u,m]=a.useState(!1),[g,y]=a.useState([]),f=i?.enterprise?.seats??0,h=!!i?.microCreditsBreakdown.available_enterprise,b=(0,a.useCallback)(e=>{e.preventDefault();let n=s(t.upgradeToTeam.invitationInput);y(n),0===n.length&&d()},[d,s,t.upgradeToTeam.invitationInput]);return a.createElement(a.Fragment,null,a.createElement(k.A,{confirmText:t.upgradeToTeam.loading?"Calculating":"Upgrade",onCancel:()=>m(!1),onConfirm:()=>{d(),m(!1)},remainingTimeCharge:t.upgradeToTeam.cost,nextPeriodCharge:t.upgradeToTeam.nextPeriodCost,title:"Upgrade to business",show:u,loading:t.upgradeToTeam.loading}),a.createElement(p.aF,{"data-tracking-context":"Modal Team Create",isOpen:!0,fullWidth:!0,onClose:r},a.createElement(p.U_,null,a.createElement(p.Jn,{onClick:r,abs:!0}),a.createElement(p.U_.ImageSide,{$align:"start"},a.createElement(p.U_.Image,{src:C})),a.createElement(p.U_.ContentSide,{$center:!0},a.createElement(P,null,a.createElement(c.H2,null,"Create a team space."),a.createElement(z,{header:"You are ready to start using teams.",body:"You can invite as many members in your team as you want. Enter their e-mails below to get started!"}),h&&!f?null:a.createElement(O,{onSubmit:b},a.createElement(c.H3,{style:{marginBottom:32}},"Invite your team"),a.createElement(p.dN.Outline,{variant:g.length>0?"danger":"default",value:t.upgradeToTeam.invitationInput,round:!0,size:"xl",placeholder:"E.g. john@bardeen.ai, alexa@bardeen.ai ...",onChange:e=>{n({type:"Team/CreateSpaceInvitationInputChanged",value:e}),g.length>0&&y([])}}),a.createElement(B,{invalidEmails:g}),a.createElement(_,null,a.createElement(p.$n,{text:t.upgradeToTeam.loading?"Loading...":"Create team",round:!0,size:"xl",type:"submit",disabled:t.upgradeToTeam.loading||t.upgradeToTeam.createSpaceLoading}))))))))},P=u.Ay.div`
  padding: 0px 64px 92px 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  justify-self: center;
`,$=u.Ay.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`,T=u.Ay.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`,F=u.Ay.ul`
  display: flex;
  gap: 16px;
  flex-direction: column;
`,R=u.Ay.li`
  display: flex;
  gap: 12px;
  align-items: center;
`,M=(0,u.Ay)(c.P)`
  color: ${d.ui$};
`,O=u.Ay.form`
  display: flex;
  flex-direction: column;
`,_=u.Ay.div`
  margin-top: 8px;
`,N=(0,u.Ay)(c.P)`
  color: ${d.KE7};
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
`,B=a.memo(function(e){let{invalidEmails:t}=e,n=a.useMemo(()=>{if(0===t.length)return null;let e=t.join(", ");return`Some inputs aren't valid email addresses: ${e}`},[t]),{ref:r,showTooltip:i}=(0,S.Q)([n]);if(!n)return a.createElement(N,{$visible:!1},"\xa0");let l=a.createElement(N,{ref:r,$visible:!0,$truncated:i},n);return i?a.createElement(E.m,{content:a.createElement(D,null,a.createElement(c.P,{$color:d.ONy,$bold:!0},"Invalid email addresses:"),a.createElement("ul",null,t.map(e=>a.createElement("li",{key:e},a.createElement(c.P,{$color:d.ONy},e))))),placement:"bottom-start",delay:300},l):l}),D=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,H=a.memo(e=>a.createElement(T,null,a.createElement(c.H5,null,e.header),a.createElement(F,null,A.map(e=>a.createElement(R,{key:e},a.createElement(p.In,{icon:"RadioCheckmarkBold",color:d.XxH,size:16}),a.createElement(M,null,e)))))),z=a.memo(e=>a.createElement(a.Fragment,null,a.createElement($,null,e.header&&a.createElement(c.H4,null,e.header),a.createElement("div",null,a.createElement(c.P,null,e.body))),e.benefitsHeader&&a.createElement(H,{header:e.benefitsHeader}),e.contactSupportEmail&&a.createElement(_,null,a.createElement(p.Uc,{profileEmail:e.contactSupportEmail})))),L=e=>{let{dispatch:t,onClose:n}=e,[r,i]=(0,a.useState)(""),l="delete"===r.toLowerCase();return a.createElement(p.aF,{isOpen:!0,onClose:n},a.createElement(p.Jn,{abs:!0,onClick:n}),a.createElement(U,null,a.createElement(V,{center:!0,gap:24},a.createElement(j,{center:!0},a.createElement(p.In,{icon:"TexturedTriangularExclamation",size:32})),a.createElement(c.H2,null,"Are you sure you want to delete this team?"),a.createElement(c.P,null,"This action cannot be undone. All team members will lose access to shared resources."),a.createElement(W,null,a.createElement(c.P,{$small:!0},'Type "delete" to confirm'),a.createElement(p.dN.Outline,{value:r,onChange:i,placeholder:"delete"}))),a.createElement(q,null,a.createElement(p.$n,{text:"Delete Team",round:!0,size:"xl",fullWidth:!0,variant:"primary",onClick:()=>{t({type:"Team/DisbandTeamConfirmed"})},disabled:!l}),a.createElement(p.$n,{text:"Cancel",round:!0,size:"xl",fullWidth:!0,variant:"outlined",onClick:n}))))},U=u.Ay.div`
  width: 530px;
`,V=(0,u.Ay)(p.VP)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`,q=u.Ay.footer`
  padding: 16px 40px 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`,j=(0,u.Ay)(p.fI)`
  background: ${d.JkX};
  width: 64px;
  height: 64px;
  border-radius: 100%;
`,W=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 300px;
`;var G=n(85934);let Y=e=>{let{onDone:t,onClose:n}=e,{profile:r,teamConfig:i}=(0,l.rD)(),[o,s]=(0,a.useState)(""),d=i?.members.filter(e=>e.email!==r?.email);return a.createElement(p.aF,{isOpen:!0,onClose:n},a.createElement(p.Jn,{abs:!0,onClick:n}),a.createElement(Q,null,a.createElement(J,null,a.createElement(K,null,a.createElement(p.In,{icon:"TexturedTriangularExclamation",size:32})),a.createElement(c.H2,null,"You are the only admin. Please assign a new one before you leave.")),a.createElement(Z,null,r&&d?.map(e=>{let{id:t,name:n,email:r,picture:i}=e;return a.createElement(p.ck,{key:t,action:a.createElement(G.q,{checked:t===o,onChange:()=>s(t)}),onClick:()=>s(t)},a.createElement(p.eu,{size:48,src:i,style:{flexShrink:0}}),a.createElement(p.ck.Main,null,a.createElement(E.m,{delay:500,content:n},a.createElement("div",{style:ee},n)),a.createElement(E.m,{delay:500,content:r},a.createElement(p.ck.Caption,{style:ee},r))))})),a.createElement(X,null,a.createElement(p.$n,{text:"Leave",round:!0,size:"xl",fullWidth:!0,variant:"primary",disabled:!o,onClick:()=>t(o)}),a.createElement(p.$n,{text:"Cancel",round:!0,size:"xl",fullWidth:!0,variant:"outlined",onClick:n}))))},Q=u.Ay.div`
  width: 530px;
`,J=u.Ay.header`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`,Z=u.Ay.div`
  padding: 16px 32px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 310px;
  overflow-y: auto;
`,X=u.Ay.footer`
  padding: 16px 40px 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`,K=u.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${d.KxS};
  width: 64px;
  height: 64px;
  border-radius: 100%;
`,ee={overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"260px"},et=e=>{let{dispatch:t,onClose:n}=e,{teamConfig:r}=(0,l.rD)(),[i,o]=(0,a.useState)(r?.name||""),s=r?.name!==i;return(0,a.useEffect)(()=>o(r?.name||""),[r?.name]),a.createElement(p.aF,{isOpen:!0,onClose:n},a.createElement(p.Jn,{abs:!0,onClick:n}),a.createElement(en,{"data-tracking-context":"Modal Team Rename",onSubmit:e=>{e.preventDefault(),t({type:"Team/RenameSpaceRequested",name:i})}},a.createElement(ea,null,"Rename Team"),a.createElement(er,null,a.createElement(p.dN.Outline,{onChange:e=>o(e),value:i,round:!0,size:"xl"})),a.createElement(ei,null,a.createElement(p.$n,{text:"Save",round:!0,size:"xl",fullWidth:!0,variant:"primary",disabled:!i||!s,type:"submit"}),a.createElement(p.$n,{text:"Cancel",round:!0,size:"xl",fullWidth:!0,variant:"outlined",onClick:n}))))},en=u.Ay.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 530px;
  gap: 48px;
`,ea=(0,u.Ay)(c.H3)`
  color: ${d.t14};
`,er=u.Ay.div`
  width: 100%;
`,ei=u.Ay.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;var el=n(63400),eo=n(50278),es=n(12171),ec=n(37089),ed=n(85170),eu=n(54307);let ep=n.p+"2e2f89a31aaea08d6d41.png";var em=n(42048),eg=n(27461),ey=n(65947);let ef=a.memo(e=>{let t=()=>{""!==e.domain&&""!==e.path&&e.onAdd()};return a.createElement(eh,null,a.createElement(eb,null,"https://*."),a.createElement(ey.dN.Outline,{size:"xl",placeholder:"example.com",value:e.domain,onChange:e.onDomainChange,onKeyDown:t=>"Enter"===t.key&&e.onAdd(),onBlur:t,style:ex}),a.createElement(eb,null,"/*/"),a.createElement(ey.dN.Outline,{size:"xl",placeholder:"profile (optional)",value:e.path,onChange:e.onPathChange,onKeyDown:t=>"Enter"===t.key&&e.onAdd(),onBlur:t,style:ex}),a.createElement(eb,null,"/*"))}),eh=(0,u.Ay)(eg.fI)`
  border: 1px solid ${d.MfC};
  border-radius: 7px;
  background-color: ${d.hi1};
  padding: 0 12px;
`,eb=u.Ay.div`
  color: ${d.e30};
  padding: 8px;
  font-size: 16px;
`,ex={minWidth:"60px",flex:1};var eE=n(21823),ev=n(51703);let eC=[{id:"selection",label:"Show on Selections"},{id:"image",label:"Show on Images"},{id:"link",label:"Show on Links"},{id:"page",label:"Show on Page Body"}],eS=e=>({...e,advancedOptions:[],name:"builderSaveFlow"===e.mode?e.ast.meta.name:e.pb.name,showOn:"all",matchersInput:{operation:"pattern",value:"",error:null},matchersInputPath:"",matchersInputDomain:"",specificMatchers:[],exampleUrls:null,loading:!0,showContextualScraping:!1,contextualScraping:!1}),ek=e=>[eS(e),[(0,ec.s8)("builderSaveFlow"===e.mode?e.ast:e.pb.ref,(e,t,n)=>({type:"MatchersAndExamplesFetched",exampleUrls:e,matches:t,hasContextualScraping:n}),()=>({type:"MatchersAndExamplesFailedFetched"}))]],ew=e=>{let{onClose:t,onSave:n,dispatch:r,state:i}=e,[l,o]=a.useState(!1);return i.loading?a.createElement(p.hJ,{"data-tracking-context":"Modal Add To Website Menu",onClose:t},a.createElement(eE.g,{status:"loading"}),";"):a.createElement(p.hJ,{"data-tracking-context":"Modal Add To Right Click Menu",onClose:t},a.createElement(p.U_,null,a.createElement(p.U_.ImageSide,{$align:"start"},a.createElement(p.U_.Image,{src:ep})),a.createElement(p.U_.ContentSide,null,a.createElement(eA,null,a.createElement(c.H1,null,"Add to right-click menu "),a.createElement(eI,{$gap:32},a.createElement(c.P,null,"Save shortcuts to your right-click menu to access your automations faster."),a.createElement(c.H4,null,"Shortcut name"),a.createElement(p.dN.Outline,{size:"xl",value:i.name,onChange:e=>r({type:"UpdatedName",name:e})}),a.createElement(c.H4,null,"Settings"),a.createElement(eI,{$gap:16},a.createElement(p.q_,{disabled:"scraperCompatible"===i.showOn,checked:"all"===i.showOn,label:"Show on every site",value:"showOn",onChange:()=>r({type:"ChangedVisibility",showOn:"all"})}),a.createElement(p.q_,{checked:"specific"===i.showOn||"scraperCompatible"===i.showOn,label:"scraperCompatible"===i.showOn?"Show only on compatible website(s)":"Select specific website(s)",onChange:()=>r({type:"ChangedVisibility",showOn:"specific"})}),"scraperCompatible"===i.showOn&&a.createElement("div",null,a.createElement(c.P,{$small:!0},"Example:"),i.exampleUrls?.map(e=>a.createElement(eM,{key:e,href:e,target:"_blank",rel:"noopener noreferrer"},e))),"specific"===i.showOn?a.createElement(a.Fragment,null,i.specificMatchers.map((e,t)=>{let{operation:n,value:i}=e;return a.createElement(eR,{key:t},a.createElement(c.P,{style:{textTransform:"capitalize"}},n),a.createElement(eF,null),a.createElement(c.P,{style:{overflow:"hidden",textOverflow:"ellipsis"}},i),a.createElement(p.$n,{icon:"TrashBinOutline",variant:"flat",tooltipText:"Remove",round:!0,"aria-label":"remove-matcher",onClick:()=>{r({type:"ClickedRemoveMatcher",index:t})}}))}),a.createElement(ef,{domain:i.matchersInputDomain,path:i.matchersInputPath,onAdd:()=>r({type:"AddMatcher"}),onDomainChange:e=>r({type:"UpdatedDomain",value:e}),onPathChange:e=>r({type:"UpdatedPath",value:e})})):null,i.matchersInput.error?a.createElement(p.BQ,{variant:"critical"},i.matchersInput.error):null,a.createElement(eP,{tabIndex:0,onClick:()=>{o(!l)}},a.createElement(c.H4,null,"Advanced Settings"),a.createElement(p.In,{icon:"ArrowDownBold",size:16,color:d.CP})),a.createElement(p.SD,{open:l},a.createElement(e$,null,eC.map(e=>{let{id:t,label:n}=e;return a.createElement(p.Sc,{key:t,label:n,checked:i.advancedOptions.includes(t),onChange:()=>{r({type:"SetAdvancedOption",option:t,value:!i.advancedOptions.includes(t)})}})}),i.showContextualScraping&&a.createElement(p.Sc,{key:"filterScraperByClickedElement",label:"Scrape only the right-clicked element",checked:i.contextualScraping,onChange:()=>{r({type:"SetContextualScraping",value:!i.contextualScraping})}})))),a.createElement(eT,null,a.createElement(p.$n,{size:"xl",round:!0,disabled:!i.name||"specific"===i.showOn&&!(0,ev.j)(i).specificMatchers.length||!!i.matchersInput.error,text:"Save shortcut",variant:"primary",onClick:n}),a.createElement(p.$n,{size:"xl",round:!0,text:i.prevModal?"Previous step":"Cancel",variant:"ghost",onClick:t})))))))},eA=u.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`,eI=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>{let{$gap:t}=e;return t}}px;
`,eP=u.Ay.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,e$=u.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 16px 32px;
`,eT=u.Ay.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
`,eF=u.Ay.div`
  height: 32px;
  width: 0;
  border-left: 1px solid ${d.MfC};
`,eR=u.Ay.div`
  display: flex;
  background-color: ${d.hi1};
  padding: 8px 8px 8px 20px;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  &:hover {
    background-color: ${d.KxS};
    ${c.P} {
      color: ${d.t14};
    }
  }
`,eM=u.Ay.a`
  text-decoration: underline;
  color: ${d.ui$};
`,eO=e=>({auto:!0,entries:e.map(e=>({active:!1,completed:!1,error:"",icon:e.icon,name:e.name})),meta:{}}),e_=(e,t,n,a)=>({apps:t,playbookId:e,from:n,status:"idle",switchTo:a,authStatus:eO(t),selectedApp:void 0}),eN=e=>{let{onClose:t,dispatch:n,state:r}=e,i=(0,a.useCallback)(()=>{n({type:"AbortConnection"}),t()},[t,n]);(0,a.useEffect)(()=>{if("inProgress"===r.status){let e=setInterval(()=>{n({type:"CheckStatus"})},200);return()=>clearInterval(e)}},[r.status,n]);let l=e=>e.completed?a.createElement(c.H3,null,e.name," successfully connected "):e.error?a.createElement(a.Fragment,null,a.createElement(c.H3,null,e.name," couldn't connect "),a.createElement(c.P,null,e.error),a.createElement(eW,null,a.createElement(p.$n,{size:"xl",round:!0,text:"Retry",onClick:()=>n({type:"RetryAppConnection"})}))):a.createElement(a.Fragment,null,a.createElement(c.H3,null,e.name," is not connected "),a.createElement(eW,null,a.createElement(p.$n,{size:"xl",round:!0,text:"Connect",onClick:()=>n({type:"RetryAppConnection"})})));return a.createElement(p.hJ,{onClose:i,"data-testid":"appsconnection-modal"},a.createElement(eB,null,a.createElement(eD,{$error:!!r.selectedApp?.error},(()=>{switch(r.status){case"idle":return a.createElement(a.Fragment,null,a.createElement(eH,null,r.authStatus.entries.map((e,t)=>{let{icon:n,name:r}=e;return a.createElement(eV,{key:r},a.createElement(ej,{key:t,icon:n,tooltipText:r,size:"l",$error:!1,$active:!1,$completed:!1,$idle:!0,$selected:!1}))})),a.createElement(c.H3,null," Connect your apps with Bardeen"),a.createElement(c.P,null,"Your credentials and data are stored only in your browser. You can update or disconnect your apps any time in your settings."),a.createElement(p.YK,{size:"m",href:"https://www.bardeen.ai/privacy-policy",target:"_blank"},"Learn More"),a.createElement(ez,null,a.createElement(p.$n,{text:"Connect",size:"xl",round:!0,onClick:()=>{n({type:"Connect",apps:r.apps,playbookId:r.playbookId})}})));case"inProgress":return a.createElement(a.Fragment,null,a.createElement(eH,null,r.authStatus.entries.map(e=>a.createElement(eV,{key:e.name},e.error||e.completed?a.createElement(eq,{icon:e.error?"RadioExclamationBold":"RadioCheckmarkBold",$error:!!e.error,$active:e.active,$completed:e.completed}):null,a.createElement(ej,{key:e.name,icon:e.icon,tooltipText:e.name,size:"l",$error:!!e.error,$active:e.active,$completed:e.completed,$idle:!r.authStatus.auto,$selected:r.selectedApp?.name===e.name,onClick:r.authStatus.auto?void 0:()=>n({type:"SelectApp",app:e})})))),!r.authStatus.auto&&r.selectedApp?l(r.selectedApp):a.createElement(a.Fragment,null,a.createElement(c.H3,null,"Connecting"),a.createElement(c.P,null,"Bardeen is trying to connect click focus to continue"),a.createElement(ez,null,a.createElement(p.$n,{text:"Focus",size:"xl",round:!0,onClick:()=>{n({type:"FocusActiveApp"})}}))));case"success":return a.createElement(a.Fragment,null,a.createElement(eU,{icon:"RadioCheckmarkBold",size:16}),a.createElement(c.H3,null,"Apps successfully connected"));default:return null}})())))},eB=u.Ay.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10%;
`,eD=u.Ay.div`
  background-color: ${e=>{let{$error:t}=e;return t?d.P0$:d.KxS}};
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
`,eH=u.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,ez=u.Ay.div`
  display: flex;
  padding-top: 16px;
`,eL=(0,u.i7)`
  from {scale: 1; }
  to { scale: 3; }
`,eU=(0,u.Ay)(p.In)`
  --icon-color: ${d.TJO};
  animation: ${eL} 0.5s ease-in-out forwards;
  margin-top: 32px;
  margin-bottom: 32px;
`,eV=u.Ay.div`
  position: relative;
`,eq=(0,u.Ay)(p.In)`
  position: absolute;
  right: -10px;
  top: -10px;
  --icon-size: 20px;
  --icon-color: ${e=>{let{$completed:t,$error:n}=e;return t?d.XxH:n?d.CCs:null}};
`,ej=(0,u.Ay)(p.z9)`
  border-radius: 12px;
  opacity: ${e=>{let{$error:t,$active:n,$completed:a,$idle:r}=e;return t||n||a||r?1:.32}};
  outline: ${e=>{let{$active:t,$selected:n,$error:a,$completed:r}=e;return t?`2px solid ${d.NcT}`:n?r?`2px solid ${d.$2P}`:a?`2px solid ${d.MEI}`:`2px solid ${d.NcT}`:"none"}};
`,eW=u.Ay.div`
  margin-top: 16px;
`;var eG=n(26572),eY=n(89787),eQ=n(51402),eJ=n(93754),eZ=n(66712);let eX={schedule:"Schedule automation",websiteData:"When website data changes",custom:"When something happens"},eK=(e,t,n)=>({loading:!1,origin:t,currentPb:e,mode:n,integrations:[],addCardState:eG.U("trigger",0,!1),playbookArgsState:eJ.ue}),e0=e=>{let{onClose:t,onSave:n,onBack:r,state:o,dispatch:s}=e,{settings:d}=(0,l.rD)(),u=d?.prefersActivateAndCloseAutobook,m=(0,l.jL)(),g=(0,i.i8)(s,"FunctionStatementAction"),{currentPb:y}=o,f=(0,i.i8)(s,"PlaybookArgsAction"),h=a.useMemo(()=>({playbookArgs:y.args,allowAskMeEveryTime:!0,onRevalidatePlaybook:()=>{s({type:"ForceRevalidatePlaybook"})},statementIndex:0,...eJ.m(f)}),[y.args,f,s]),b=o.integrations.find(e=>e.integration.alias===o.addCardState.selectedApp?.name),x=y.trigger&&"FunctionCallStatement"===y.trigger.type&&b?.isDisconnected,E=eX[o.mode],v=!!(!y.trigger||y.errors.length>0||x),C=y.trigger&&"FunctionCallStatement"===y.trigger.type?a.createElement(eQ.uA,{isFirstStatement:!0,state:y.trigger,dispatch:g}):null;return a.createElement(eZ.S,{value:h},a.createElement(p.hJ,{"data-tracking-context":E,"aria-label":E,onClose:t},a.createElement(e1,null,a.createElement(e2,{$compressed:"custom"!==o.mode||null!==y.trigger},o.loading||"custom"===o.mode&&o.addCardState.commandsLoading?a.createElement(es.gb,{status:"saving"}):a.createElement(a.Fragment,null,a.createElement(c.H2,{style:{textAlign:"center"}},E),"custom"===o.mode&&!y.trigger&&a.createElement("div",{style:{width:"640px",maxWidth:"100%"}},a.createElement(eG.u,{state:o.addCardState,dispatch:s,onSelectCommand:e=>s({type:"AddCard/SelectedCommand",command:e})})),C&&x?a.createElement(eY.e,{app:b.integration,from:"convertToAutobook"}):C,a.createElement(p.fI,{gap:24,style:{alignSelf:"center"}},a.createElement(p.$n,{round:!0,size:"xl",variant:"outlined",text:"Previous Step",onClick:r}),a.createElement(p.fI,{gap:8},a.createElement(p.$n,{round:!0,disabled:v,variant:"primary",size:"xl",icon:"RadioCheckmarkBold",text:"Save",onClick:n}))),a.createElement(p.fI,{center:!0,style:{paddingBottom:64}},a.createElement(p.Sc,{disabled:v,label:"Activate and close",checked:!!u,onChange:e=>m({type:"App/ChangedSaveAndActivate",checked:e})})))),a.createElement(eJ.uA,{state:o.playbookArgsState,dispatch:f}))))},e1=u.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  width: 100%;
  overflow-y: auto;
`,e2=u.Ay.div`
  padding: 64px;
  max-width: ${e=>{let{$compressed:t}=e;return t?"60%":"100%"}};
  width: ${e=>{let{$compressed:t}=e;return t?"60%":"100%"}};
  align-items: ${e=>{let{$compressed:t}=e;return t?"unset":"center"}};
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
`;var e4=n(19010);let e3=a.memo(e=>{let{onClose:t,onSelect:n,state:r}=e;return a.createElement(e6,{onClose:t},a.createElement(e4.h,{state:r,onSelect:n}))}),e6=(0,u.Ay)(p.hJ)`
  padding: 64px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`,e8=(e,t,n,a,r)=>({folderId:e,moveToFolderId:t,foldersToMove:n,loading:!1,automationsView:a,strategy:r}),e5=e=>{let{onClose:t,state:n,onDeleteFolderClicked:r}=e;return a.createElement(e7,{isOpen:!0,onClose:t},a.createElement(p.Jn,{abs:!0,onClick:t}),a.createElement(e9,null,a.createElement(c.H2,null,"Delete Folder"),a.createElement(c.P,null,"delete"===n.strategy?"All items in the folder will be deleted permanently.":"All items in the folder will be moved to the default folder."),a.createElement(p.$n,{text:n.loading?"Deleting...":"Delete",disabled:n.loading,onClick:()=>{n.loading||r()},round:!0,size:"l"})))},e7=(0,u.Ay)(p.aF)`
  overflow: hidden;
  width: 100%;
  max-width: 620px;
`,e9=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 100%;
  gap: 32px;
  max-width: 530px;
  margin-inline: auto;
  text-align: center;
`,te=(e,t,n)=>({folderId:e,currentName:t,newName:t,loading:!1,automationsView:n}),tt=(e,t)=>{switch(e.type){case"ChangeNewName":return[{...t,newName:e.name},[]];case"RenameFolderClicked":return[{...t,loading:!0},[o.g$(t.folderId,t.newName,()=>({type:"RenameFolderSucceeded"}))]];case"RenameFolderSucceeded":return[{...t,loading:!1},[]]}},tn=e=>{let{onClose:t,state:n,dispatch:r}=e,i=n.newName!==n.currentName,l=n.newName.trim().length>0,o=i&&l&&!n.loading;return a.createElement(ta,{isOpen:!0,onClose:t},a.createElement(p.Jn,{abs:!0,onClick:t}),a.createElement(tr,null,a.createElement(c.H2,null,"Rename Folder"),a.createElement(c.P,null,"Enter a new name for your folder."),a.createElement(p.dN.Outline,{value:n.newName,onChange:e=>{r({type:"ChangeNewName",name:e})},placeholder:"Folder name",autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&o&&r({type:"RenameFolderClicked"})},round:!0,size:"l"}),a.createElement(p.$n,{text:n.loading?"Renaming...":"Rename",disabled:!o,onClick:()=>{o&&r({type:"RenameFolderClicked"})},round:!0,size:"l"})))},ta=(0,u.Ay)(p.aF)`
  overflow: hidden;
  width: 100%;
  max-width: 620px;
`,tr=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px 48px 40px;
  width: 100%;
  gap: 32px;
  max-width: 530px;
  margin-inline: auto;
  text-align: center;
`,ti=e=>{let{dispatch:t,state:n,onClose:r,onSave:i}=e,o=(0,ed.Pv)(n),s=a.useCallback(e=>{t({type:"BuilderV2Action",action:{type:"UserChangedPbMeta",meta:{...o.meta,name:e}}})},[o,t]),u=o.meta.name!==n.origin.initPlaybook?.meta.name,m=o.meta.name.trim().length>0,g=u&&m,{featureFlags:y}=(0,l.rD)(),f=y.v4MiniEnabled;return a.createElement(p.aF,{isOpen:!0,onClose:r,style:{padding:48},"data-testid":"force-rename-playbook-modal"},a.createElement(p.Jn,{onClick:r,abs:!0}),a.createElement("form",{onSubmit:e=>{e.preventDefault(),g&&i()}},a.createElement(p.VP,{gap:24,center:!0,style:{maxWidth:350}},a.createElement(c.H3,{style:{color:d.t14}},"Rename ",f?"Agent":"Playbook"),a.createElement(c.P,{style:{textAlign:"center"}},"You can't modify this ",f?"agent":"playbook",", but you can save your own copy. Please specify a new name for it."),a.createElement(p.dN.Outline,{fullWidth:!0,autoFocus:!0,size:"l",value:o.meta.name,onChange:s}),a.createElement(p.$n,{fullWidth:!0,round:!0,size:"xl",type:"submit",variant:"primary",text:"Save",disabled:!g,tooltipText:(m?"":"Please enter a name")||(u?"":"Please use a different name")}))))};var tl=n(94720);let to=n.p+"ed41c4a017ffc4ef880d.png",ts=n.p+"4dc9740f360aa13da6e2.png",tc=e=>{let{onClose:t}=e,n=(0,l.jL)(),r=(0,i.i8)(n,"ModalsAction");return a.createElement(p.hJ,{"data-tracking-context":"Modal How to run this automation","aria-label":"Modal How to run this automation",onClose:t},a.createElement(td,null,a.createElement(tu,null,a.createElement(c.H2,{style:{textAlign:"center"}},"How do you want to run this automation?"),a.createElement(p.fI,{gap:24,style:{alignItems:"stretch"}},a.createElement(tl.S,{variant:"plum",img:a.createElement("img",{src:ts,alt:"Cursor"}),onClick:()=>r({type:"Modal/PinOrRightClickShown"})},a.createElement(tl.S.Title,null,"Manually"),a.createElement(tl.S.Description,null,"Create a Playbook to run your automation yourself when you need it.")),a.createElement(tl.S,{variant:"melon",img:a.createElement("img",{src:to,alt:"Lightning"}),onClick:()=>r({type:"Modal/RunAutomaticallyShown"})},a.createElement(tl.S.Title,null,"Automatically"),a.createElement(tl.S.Description,null,"Create a Playbook that runs automatically based on a set schedule, event, or action."))))))},td=u.Ay.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`,tu=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-self: center;
`;var tp=n(33663);let tm=n.p+"fc26905aaaa42cf2ae48.png";var tg=n(6823);let ty=e=>{let{onClose:t,canUpgrade:n=!0,onUpgrade:r}=e;return a.createElement(p.aF,{isOpen:!0},a.createElement(tg.r,{"data-testid":"out-of-credits"},a.createElement(p.Jn,{abs:!0,onClick:t}),a.createElement(tg.G,null,a.createElement("img",{src:tm}),a.createElement(c.H2,null,"Not enough credits"),a.createElement(c.P,{$small:!0,style:{fontWeight:500}},n?"Looks like you don\u2019t have enough credits to run this playbook.":"Ask an admin to upgrade to run premium automations in your team space.")),a.createElement(p.$n,{variant:"primary",size:"xl",round:!0,text:n?"Explore Plans":"Ask admin to upgrade",onClick:r,fullWidth:!0})))},tf=n.p+"bfe86291643bc07d5822.png",th=e=>{let{onClose:t,canUpgrade:n,onUpgrade:r}=e;return a.createElement(p.aF,{isOpen:!0,"data-tracking-context":"Trial Ended Modal"},a.createElement(tg.r,null,a.createElement(p.Jn,{abs:!0,onClick:t}),a.createElement(tg.G,null,a.createElement("img",{src:tf,alt:"Trial Ended"}),a.createElement(c.H2,null,"Trial period ended"),a.createElement(c.P,{$small:!0,style:{fontWeight:500}},"Upgrade to Bardeen Pro for more credits.")),a.createElement(p.$n,{variant:"primary",size:"xl",round:!0,text:n?"Explore Plans":"Ask admin to upgrade",onClick:r,fullWidth:!0})))};var tb=n(9014);let tx=n.p+"af44e067ddd50b9f1557.png",tE=e=>{let{dispatch:t}=e;return(0,a.useEffect)(()=>{t({type:"CheckExtensionPinned"});let e=setInterval(()=>t({type:"CheckExtensionPinned"}),500);return()=>clearInterval(e)},[t]),a.createElement(p.hJ,{"data-tracking-context":"Modal Onboarding"},a.createElement(tv,null,a.createElement(tC,null,a.createElement(tS,{src:tx})),a.createElement(tk,null,a.createElement(c.H2,null,"Quick launch Bardeen"),a.createElement(tw,null,a.createElement(c.P,null,"Pin our extension to your Chrome toolbar for quick access!"),a.createElement(c.P,null,"Click on the Extensions icon"," ",a.createElement(p.In,{icon:"ChromeExtensionIconBold",size:14,color:d.ydb})," in your browser bar."),a.createElement(c.P,null,"Then click the pin icon ",a.createElement(p.In,{icon:"PinBold",size:14,color:d.ydb})," to pin it to your dashboard.")),a.createElement(tA,{text:"Done",round:!0,size:"xl",onClick:()=>t({type:"PinningCompleted"}),autoFocus:!0}))))},tv=u.Ay.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,tC=u.Ay.div`
  overflow: hidden;
  background: radial-gradient(118.93% 141.42% at 100% 0%, #f8f8fd 0%, #e2dff5 100%);
  position: relative;
  height: 480px;
`,tS=u.Ay.img`
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
`,tk=u.Ay.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
  padding: 24px 0px;
`,tw=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,tA=(0,u.Ay)(p.$n)`
  margin-top: 16px;
`,tI=a.memo(function(e){let{state:t,dispatch:n}=e;return null===t?null:"Pin"===t?a.createElement(tE,{key:"pinExtension",dispatch:n}):void 0}),tP=n.p+"fe67b1f247485c46397e.png",t$=(e,t)=>({pbAst:e,pbMeta:null,loading:!1,addToWebsiteMenuState:null,origin:t}),tT=e=>{let{onClose:t,onPreviousStep:n,onConfigureRightClick:r,onSave:i,state:l}=e;return a.createElement(p.hJ,{"data-tracking-context":"Modal Pin Or Right Click Optional","aria-label":"Modal Pin Or Right Click Optional",onClose:t},a.createElement(tM,null,a.createElement(tO,null,l.loading?a.createElement(es.gb,{status:"saving"}):a.createElement(a.Fragment,null,a.createElement(c.H2,{style:{textAlign:"center"}},"Create shortcuts"),a.createElement(tF,null,a.createElement(tR,{img:a.createElement("img",{src:tP,alt:"Save playbook"}),variant:"plum"},a.createElement(p.fI,{gap:8},a.createElement(p.Sc,{id:"PinCheckbox",checked:!0,onChange:()=>{},disabled:!0}),a.createElement(tl.S.Title,null,"Save in My Playbooks")),a.createElement(tl.S.Description,null,"The Playbook is automatically saved in My Playbooks. Edit or delete it there.")),a.createElement(tl.S,{variant:"plum",img:a.createElement(a.Fragment,null,a.createElement(t_,{src:ep,alt:"Browser window"})),onClick:()=>r(!l.addToWebsiteMenuState)},a.createElement(p.fI,{gap:8},a.createElement(p.Sc,{id:"RightClickCheckbox",checked:!!l.addToWebsiteMenuState,onChange:()=>{}}),a.createElement(tl.S.Title,null," Add to right-click menu")),a.createElement(tl.S.Description,null,"Choose on which websites your Playbook will appear in the right-click menu."))),a.createElement(p.fI,{gap:24,style:{alignSelf:"center"}},a.createElement(p.$n,{round:!0,icon:"FullArrowLeftOutline",size:"xl",variant:"outlined",text:"Previous Step",onClick:n}),a.createElement(p.fI,{gap:8},a.createElement(p.$n,{round:!0,icon:"RadioCheckmarkBold",size:"xl",variant:"primary",text:"Save",disabled:l.loading,onClick:i})))))))},tF=u.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`,tR=(0,u.Ay)(tl.S)`
  pointer-events: none;
`,tM=u.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
`,tO=u.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
  align-self: center;
`,t_=u.Ay.img`
  max-height: 100%;
`;var tN=n(85040),tB=n(7711),tD=n(61994),tH=n(82134),tz=n(54357),tL=n(58756);let tU=a.memo(e=>{let{children:t,onClose:n,layoutClassName:r,ModalProps:i}=e,l=tV(),o=a.useContext(tL.o);return a.createElement(tH.A,{open:!0,container:o.portalInsertionPoint,className:l.root,disableEnforceFocus:!0,onClose:n,role:"dialog",...i},a.createElement("div",{className:(0,tz.A)(l.layout,r)},t))}),tV=(0,tN.A)(e=>({root:{display:"flex",alignItems:"center",justifyContent:"center"},layout:{background:d.ONy,backgroundClip:"padding-box",border:"1px solid rgba(0, 0, 0, 0.04)",boxShadow:"0px 8px 48px rgba(0, 0, 0, 0.08)",borderRadius:e.spacing(3),height:640,maxHeight:"calc(100vh - 32px)",maxWidth:"calc(100vw - 32px)",overflow:"hidden",position:"relative",width:952}})),tq=(e,t)=>({loading:!1,mode:t,pb:e}),tj=a.memo(e=>{let{dispatch:t,pb:n,state:r,onSubmit:i}=e,o=(0,l.jL)(),s=tW(),c=()=>o({type:"ModalsAction",action:{type:"Modal/Closed"}});return a.createElement(tU,{onClose:c,layoutClassName:s.layout},a.createElement("div",null,((e,t)=>a.createElement("div",{className:s.titleWrapper},a.createElement(tD.hE,{className:s.title,variant:"h2"},a.createElement("label",{htmlFor:"new-name"},e)),t?a.createElement(tD.EY,{className:s.subTitle,variant:"body"},t):null))(`${"duplicate"===r.mode.type?"Duplicate":"Rename"} ${n.variant}`,"duplicate"===r.mode.type?"Please use a unique name to duplicate this Playbook.":null),a.createElement(tB.J,{abs:!0,onClick:c})),a.createElement(p.dN.Outline,{id:"new-name",autoFocus:!0,size:"l",round:!0,fullWidth:!0,value:r.pb.name,onChange:e=>t({type:"ChangePlaybookName",name:e}),onKeyDown:e=>{"Enter"===e.key&&i()}}),a.createElement(p.$n,{text:"Save",round:!0,size:"l",disabled:r.loading||n.name===r.pb.name||!r.pb.name.trim(),tooltipText:r.pb.name.trim()?"":"Please enter a name",onClick:i,loading:r.loading}))}),tW=(0,tN.A)(e=>({layout:{height:"auto",width:"auto",minWidth:"524px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:e.spacing(8),position:"relative","& > :not(:first-child)":{marginTop:e.spacing(8)}},titleWrapper:{textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center"},title:{color:d.t14},subTitle:{marginTop:e.spacing(3)}}));var tG=n(99938);let tY=(0,tN.A)(e=>({header:{display:"flex",alignItems:"center",padding:e.spacing(5,5,5,8)},headerTitle:{color:d.t14,fontWeight:600,fontSize:"16px",lineHeight:"20px",flex:1},contentWrapper:{height:"100%",display:"flex",flexDirection:"column"},playbookHeader:{marginTop:"0 !important"},infoInput:{marginBottom:e.spacing(4)},title:{margin:e.spacing(3.5,0),fontSize:"14px",lineHeight:"20px",fontWeight:500,color:d.CP},modalContents:{display:"flex",flexDirection:"column",flex:1,padding:e.spacing(0,6,5,6)},shareInput:{"& .MuiInputBase-root":{height:"46px",paddingRight:"8px"},"& .MuiOutlinedInput-input":{fontWeight:600,fontSize:"18px"}},buttonBar:{display:"flex",margin:e.spacing(8,0,4,0),justifyContent:"center","& > :not(:first-child)":{marginLeft:e.spacing(3)}},bottomBar:{display:"flex",margin:e.spacing(4,0),justifyContent:"center",gap:"10px"}})),tQ="Failed to copy to clipboard. Please copy manually.",tJ=e=>{let{loading:t,error:n,sharingInfo:r,onDelete:i,onClose:l,onError:o}=e,s=e.sharingInfo.editable,c=a.useRef(null),d=tY(),u=a.useMemo(()=>{let e=encodeURIComponent(r.shareUrl||""),t=encodeURIComponent("I use this awesome automation to save time! Give it a try:");return a.createElement(a.Fragment,null,a.createElement(p.$n,{icon:"IntegrationLinkedin",tooltipText:"Share on LinkedIn",round:!0,size:"l",variant:"outlined",onClick:()=>window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${e}`)}),a.createElement(p.$n,{icon:"IntegrationTwitter",tooltipText:"Share on Twitter",round:!0,size:"l",variant:"outlined",onClick:()=>window.open(`https://twitter.com/intent/tweet?text=${t}%20${e}`)}),a.createElement(p.$n,{icon:"IntegrationFacebook",tooltipText:"Share on Facebook",round:!0,size:"l",variant:"outlined",onClick:()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${e}`)}),a.createElement(p.$n,{icon:"AtSignOutline",tooltipText:"Share via email",href:`mailto:?subject=${t}&body=I found this Playbook for you on bardeen.ai - check it out: ${e}`,round:!0,size:"l",variant:"outlined"}))},[r.shareUrl]),m=a.useCallback(async()=>{try{await navigator.clipboard.writeText(r.shareUrl||""),l()}catch(e){o(tQ),c.current?.select(),c.current?.setSelectionRange(0,99999)}},[l,r.shareUrl,o]);return a.createElement(p.aF,{style:{width:"608px",maxHeight:"700px",minWidth:"600px"},isOpen:!0,"data-tracking-context":"Modal Share",onClose:l},a.createElement("div",{className:d.contentWrapper},a.createElement("div",{className:d.header},a.createElement(tD.EY,{className:d.headerTitle},"Share"),a.createElement(p.Jn,{onClick:l})),a.createElement("div",{className:d.modalContents},a.createElement(p.pd,{addonAfter:a.createElement(p.$n,{variant:"primary",size:"m",onClick:m,text:"Copy & Close"}),className:d.shareInput,disabled:t,fullWidth:!0,inputRef:c,readOnly:!0,size:"l",value:r.shareUrl||""}),a.createElement("div",{className:d.buttonBar},u),n?a.createElement(p.BQ,{round:!0,variant:"critical"},n):null,a.createElement("div",{className:d.bottomBar},s?a.createElement(p.$n,{style:{width:140},disabled:t,size:"l",variant:"outlined",onClick:i,text:"Unshare"}):null,a.createElement(p.$n,{style:{width:140},onClick:n===tQ?l:m,disabled:t,size:"l",variant:"primary",text:n===tQ?"Close":"Copy & Close"})))))},tZ={error:null,isLoading:!1,sharingInfo:null},tX=a.memo(e=>{let{dispatch:t,state:n,id:r,onClose:i}=e,{isLoading:l,sharingInfo:o}=n;return o?a.createElement(tJ,{error:n.error,loading:l,onClose:i,onDelete:()=>t({type:"Unshare",id:r}),onError:e=>t({type:"ShowError",msg:e}),sharingInfo:o}):null}),tK=e=>{let{state:t,onClose:n}=e,{buttonText:r,title:i,description:o}=t,s=!!l.rD()?.settings?.[t.key],u=(0,l.jL)();return a.createElement(p.aF,{isOpen:!0,onClose:n,style:{padding:48}},a.createElement(p.Jn,{onClick:n,abs:!0}),a.createElement(p.VP,{gap:24,center:!0,style:{maxWidth:350}},a.createElement(c.H3,{style:{color:d.t14}},i),a.createElement(c.P,{style:{textAlign:"center"}},o),a.createElement(p.fI,{gap:16,center:!0,style:{marginTop:8,marginBottom:12}},a.createElement(p.$n,{round:!0,size:"xl",onClick:()=>u(t.action),variant:"primary",text:r})),a.createElement(t0,{label:"Don't show again",checked:s,onChange:()=>u({type:"App/SettingToggled",key:t.key})})))},t0=(0,u.Ay)(p.Sc)`
  &:not(:hover) {
    color: ${d.ui$};
  }
`,t1=n.p+"3279dc0490be4759d332.png",t2=n.p+"d08b25732060363c7ada.png",t4=e=>{let{onClose:t}=e,n=(0,l.jL)(),r=(0,i.i8)(n,"ModalsAction");return a.createElement(p.hJ,{"data-tracking-context":"Modal When do you want to run your automation?","aria-label":"Modal When do you want to run your automation?",onClose:t},a.createElement(t6,null,a.createElement(t8,null,a.createElement(c.H2,{style:{textAlign:"center"}},"When do you want to run your automation?"),a.createElement(t3,null,a.createElement(tl.S,{variant:"melon",img:a.createElement("img",{src:t1,alt:"Calendar"}),onClick:()=>{r({type:"Modal/ConvertToAutobookShown",mode:"schedule"})}},a.createElement(tl.S.Title,null,"On a schedule"),a.createElement(tl.S.Description,null,"Automation runs on a pre-set schedule, e.g. every Monday at 9 am."," ")),a.createElement(tl.S,{variant:"melon",img:a.createElement("img",{src:to,alt:"Lightning"}),onClick:()=>{r({type:"Modal/ConvertToAutobookShown",mode:"custom"})}},a.createElement(tl.S.Title,null,"When something happens"),a.createElement(tl.S.Description,null,"Automation runs when something pre-selected occurs, e.g. when a new email arrives.")),a.createElement(tl.S,{variant:"melon",img:a.createElement("img",{src:t2,alt:"Website"}),onClick:()=>{r({type:"Modal/ConvertToAutobookShown",mode:"websiteData"})}},a.createElement(tl.S.Title,null,"When a website changes"),a.createElement(tl.S.Description,null,"Automation runs when a website is updated, e.g. when an item price changes on Amazon."))),a.createElement(p.fI,{gap:24,style:{alignSelf:"center"}},a.createElement(p.$n,{icon:"FullArrowLeftOutline",round:!0,size:"xl",variant:"outlined",text:"Previous Step",onClick:()=>r({type:"Modal/HowToRunShown"})})))))},t3=u.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`,t6=u.Ay.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
`,t8=u.Ay.div`
  padding: 64px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
  align-self: center;
`;var t5=n(87613),t7=n(49861),t9=n(97638),ne=n(37345),nt=n(43885),nn=n(42400),na=n(4241);let nr=u.Ay.div`
  max-width: 684px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 80px 0;

  animation: ${e=>e.theme.fadeIn} 0.3s;
`,ni=e=>{let{dispatch:t,state:n}=e,{settings:r,teamConfig:i,logoutInProgress:o,profile:s,subscription:d,featureFlags:u}=(0,l.rD)(),p=(0,l.jL)(),m=i?.isTeam??!1,g="delete"===n.deletionConfirmation,[y,f]=(0,a.useState)(!1),h=a.useCallback(async e=>{e.preventDefault();try{await navigator.clipboard.writeText(n.trackingId)}catch(e){}y||(f(!0),setTimeout(()=>{f(!1)},3e3))},[n.trackingId,y]),b=e=>()=>{p({type:"App/SettingToggled",key:e})},x=a.useCallback(e=>{p({type:"App/ModelOverrideChanged",override:e})},[p]),v=a.useCallback(()=>{p({type:"App/LogoutRequested"})},[p]);return s?a.createElement(nr,{"data-tracking-context":"Account"},a.createElement(nc,null,a.createElement(t9.e,{size:64,src:s.profilePicture,style:{flexShrink:0}}),a.createElement(nd,null,a.createElement(nu,null,s.userName),a.createElement(np,{$small:!0},s.email," ",s.emailVerified&&" (verified)")),a.createElement("div",null,a.createElement(ne.$n,{variant:"outlined",size:"l",round:!0,disabled:o,onClick:v,text:"Log out"}))),a.createElement(na.oh,{context:"settings/account"}),a.createElement(nt.c,{action:a.createElement(ne.$n,{variant:"flat",icon:y?"CheckmarkOutline":"PopOutOutline",size:"l",round:!0,disabled:o,onClick:h,text:"Copy"})},a.createElement("strong",null,"ID:"),a.createElement("div",{style:{fontWeight:400,textOverflow:"ellipsis",overflow:"hidden"},"data-testid":"account-id"},n.trackingId)),a.createElement(nm,null,a.createElement(c.H4,null,"Options"),a.createElement(eg.VP,{gap:8},a.createElement(nn.ko,{checked:r?.synthesisDataCollection??!1,onClick:b("synthesisDataCollection")},"Record browser usage data for Work Intelligence"),a.createElement(nn.ko,{checked:r?.marketingConsentReceiveEmails??!1,onClick:b("marketingConsentReceiveEmails")},"Send me very occasional emails about new features and updates."),a.createElement(E.m,{content:t7.oL(d)?`Upgrade to the ${m?"Team":"Pro"} plan to use this feature`:""},a.createElement("div",null,a.createElement(nn.ko,{text:"",checked:r?.brandingEnabled??!0,onClick:b("brandingEnabled"),disabled:t7.oL(d)},"Include branding info on generated resources."))),a.createElement(nn.ko,{checked:r?.prefersFullHeight??!1,onClick:b("prefersFullHeight")},"Use full screen height to display Bardeen."),u.devTools?a.createElement(nn.ko,{checked:r?.debugClicks??!1,onClick:b("debugClicks")},"Debug Clicks"):null,a.createElement(nn.ko,{checked:r?.prefersAutoScale??!1,onClick:b("prefersAutoScale")},"Auto-scale Bardeen to fit the screen height."),a.createElement("div",null,a.createElement(no,{onChange:x,value:r?.modelFamilyOverride??null})))),n.featureOverrides.length>0?a.createElement(nm,null,a.createElement(c.H4,null,"Experimental Features"),a.createElement(eg.VP,{gap:8},n.featureOverrides.map(e=>a.createElement(nn.ko,{key:e.feature,checked:!0===e.value,onClick:()=>{p({type:"App/ExperimentalFeatureChanged",feature:e.feature,value:!0!==e.value||null,requiresReload:e.requiresReload})}},e.title)))):null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",padding:"7px 5px"},"data-testid":"delete-account-section"},null!==n.deletionConfirmation?a.createElement("div",null,a.createElement(ey.dN.Outline,{size:"l",round:!0,onChange:e=>t({type:"Settings/DeleteAccountConfirmationChanged",confirm:e}),value:n.deletionConfirmation}),'Type "delete" to confirm! This action can\'t be reverted!'):null,a.createElement("div",null,a.createElement(ne.$n,{size:"l",round:!0,disabled:o||null!==n.deletionConfirmation&&"delete"!==n.deletionConfirmation,variant:g?"ghost":"outlined",onClick:()=>p({type:"ModalsAction",action:{type:"Modal/AccountDeletionIntended"}}),text:"Delete Account"})))):null},nl=[{label:"Default",value:"default"},{label:"OpenAI (GPT 4o, 4o mini)",value:"chatgpt"},{label:"Anthropic (Claude 3.7 Sonnet, 3.5 Haiku)",value:"anthropic"},{label:"Google (Gemini 1.5 Pro, 2.0 Flash)",value:"gemini"}],no=e=>{let{onChange:t,value:n}=e,r=a.useId(),i=a.useCallback(e=>{t("default"===e?null:e)},[t]);return a.createElement(ns,null,a.createElement("label",{htmlFor:r},"Override AI model family"),a.createElement(p.l6,{"aria-label":"Override AI model family",id:r,value:n??"default",options:nl,onChange:i}))},ns=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 48px;
  padding: 14px 16px;
  background: unset;
  border: 1px solid transparent;
  & label {
    color: ${d.ui$};
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    text-align: start;
    flex: 1;
  }
`,nc=u.Ay.div`
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
`,nd=u.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`,nu=u.Ay.h4`
  color: ${d.CP};
  font-family: Outfit;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 150% */
`,np=(0,u.Ay)(c.P)`
  color: ${d.ui$};
`,nm=u.Ay.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;var ng=n(69238);let ny=a.memo(e=>{let{query:t,dispatch:n}=e,r=(0,l.jL)(),{disconnected:i,connected:o,available:s,preinstalled:m}=(0,l.Mj)(),g=new ng.Rk(i,{selector:e=>e.name}).find(t),y=new ng.Rk(o,{selector:e=>e.name}).find(t),f=new ng.Rk(s,{selector:e=>e.name}).find(t),h=new ng.Rk(m,{selector:e=>e.name}).find(t),b=[...g,...y,...f,...h],x=(0,u.Ay)(p.BQ)`
    margin-top: 5px;
    border-radius: 8px;
  `;return a.createElement(nr,{"data-tracking-context":"Conntected Apps"},a.createElement(nf,null,a.createElement(nh,{autoFocus:!0,focused:!0,fullWidth:!0,isSearchable:!0,onChange:e=>n({type:"Settings/QuerySet",q:e}),placeholder:"Search for apps...",size:"xl",value:t,variant:"flat"})),0===b.length&&a.createElement(nb,null,a.createElement(nx,null,"No matching apps found")),g.length>0&&a.createElement(nb,{"data-testid":"expired-apps"},a.createElement(nx,null,"Expired"),a.createElement(p.BQ,{round:!0,variant:"warning",leftAddon:a.createElement(p.In,{icon:"TriangularExclamationBold",color:d.k0i})},a.createElement(c.H6,null,"Automations using expired app-connections stopped working.")),a.createElement(p.ck.List,{role:"list"},g.map(e=>{let{item:t}=e;return a.createElement("div",{key:t.factoryId},a.createElement(p.ck,{key:t.factoryId,role:"listitem",action:a.createElement(p.$n,{icon:"TrashBinOutline","aria-label":`Disconnect ${t.name}`,tooltipText:`Disconnect ${t.name}`,variant:"flat",mode:"light",round:!0,onClick:()=>r({type:"App/AppRemoveClicked",app:t})}),right:a.createElement(p.$n,{text:"reconnect","aria-label":`Reconnect ${t.name}`,variant:"flat",round:!0,onClick:()=>r({type:"App/AppReconnectClicked",app:t,userData:{from:"appWindow",switchTo:null}})})},a.createElement(p.In,{icon:t.icon}),a.createElement(p.ck.Main,null,t.name,t.instance?.state.accountName&&a.createElement(p.ck.Caption,null,t.instance?.state.accountName))),t.instance?.state.type==="disconnected"&&a.createElement(x,{icon:"AlertTriangleOutline",variant:"critical"},t.instance.state.reason))}))),y.length>0&&a.createElement(nb,{"data-testid":"connected-apps"},a.createElement(nx,null,"Connected"),a.createElement(p.ck.List,{role:"list"},y.map(e=>{let{item:t}=e;return a.createElement(p.ck,{key:t.factoryId,role:"listitem",action:a.createElement(p.$n,{icon:"TrashBinOutline","aria-label":`Disconnect ${t.name}`,tooltipText:`Disconnect ${t.name}`,variant:"flat",mode:"light",round:!0,onClick:()=>r({type:"App/AppRemoveClicked",app:t})})},a.createElement(p.In,{icon:t.icon}),a.createElement(p.ck.Main,null,t.name,t.instance.state.accountName&&a.createElement(p.ck.Caption,null,t.instance.state.accountName)))}))),f.length>0&&a.createElement(nb,{"data-testid":"not-connected-apps"},a.createElement(nx,null,"Not connected"),a.createElement(p.ck.List,{role:"list"},f.map(e=>{let{item:t}=e;return a.createElement(p.ck,{key:t.factoryId,role:"listitem",action:a.createElement(p.$n,{text:"connect",variant:"flat",round:!0,"aria-label":`Connect ${t.name}`,onClick:()=>r({type:"App/AppConnectClicked",app:t,userData:{from:"appWindow",switchTo:null}})})},a.createElement(p.In,{icon:t.icon})," ",t.name)}))),h.length>0&&a.createElement(nb,{"data-testid":"default-apps"},a.createElement(nx,null,"Default"),a.createElement(p.ck.List,{role:"list"},h.map(e=>{let{item:{factoryId:t,name:n,icon:r}}=e;return a.createElement(p.ck,{key:t,role:"listitem"},a.createElement(p.In,{icon:r})," ",n)}))))}),nf=u.Ay.div`
  padding: 16px 0;
  border-bottom: ${d.MfC} 1px solid;
`,nh=(0,u.Ay)(p.pd)`
  padding: 8xp 0;
`,nb=u.Ay.div`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  text-align: left;
`,nx=(0,u.Ay)(c.H4)`
  color: ${d.CP};
  text-align: center;
`,nE=e=>{let{billing:t,invoices:n}=e,{subscription:r,teamConfig:i}=(0,l.rD)(),o=(0,l.jL)(),s=[t?.address?.line1,t?.address?.line2,t?.address?.city,t?.address?.state,t?.address?.postal_code,t?.address?.country].filter(e=>e).join(", "),d=t?.paymentMethod;return a.createElement(nr,{"data-tracking-context":"Billing"},a.createElement(nC,null,a.createElement(nS,null,"Subscription & Billing")),a.createElement(na.oh,{context:"settings/billing"}),i?.canManagePayment?a.createElement(a.Fragment,null,t&&d?a.createElement(nk,null,a.createElement(nw,null,"Billing Information"),a.createElement(nT,null,a.createElement(nM,null,"Current billing period ends")," ",r?.endsAt),a.createElement(nO,null,a.createElement(nF,null,a.createElement(nR,null,"Address"),a.createElement(nM,null,t.name),a.createElement(c.P,{$small:!0},s)),a.createElement(nF,null,a.createElement(nR,null,"Card"),a.createElement(c.P,{$small:!0},a.createElement(nM,null,d?.brand)," ending in ",d?.last4),a.createElement(c.P,{$small:!0},a.createElement("div",null,a.createElement(nM,null,"Owner:")," ",d?.cardholder_name),a.createElement(nM,null,"Expires:")," ",d?.exp_month,"/",d?.exp_year))),a.createElement(nA,null,a.createElement(p.$n,{variant:"primary",size:"l",round:!0,onClick:()=>o({type:"App/PaymentPortalNavigated"}),text:"Modify billing information"}))):null,a.createElement(nk,null,a.createElement(nw,null,"Invoices"),t?.email?a.createElement(nT,{style:{padding:"24px 24px 24px 32px",alignItems:"center"}},a.createElement("div",{style:{flex:1}},a.createElement("strong",null,"Invoice Email:")," ",t.email),a.createElement(p.$n,{variant:"ghost",size:"m",round:!0,onClick:()=>o({type:"App/BillingEmailEdited",email:t.email}),tooltipText:"Change Email",icon:"PencilOutline"})):null,n&&n.length>0?a.createElement(p.ck.List,null,n.map(e=>a.createElement(nv,{key:e.url,invoice:e}))):a.createElement("div",null,"No invoices yet"))):a.createElement(a.Fragment,null,a.createElement(nk,null,a.createElement(nw,null,"Billing information")),a.createElement(p.BQ,{round:!0,icon:"RadioInfoBold",variant:"info"},a.createElement(nI,null,a.createElement(nP,null,"Only team admins can see and modify billing information."),a.createElement(n$,null,"You are currently member of ",i?.name,". All credits are owned and payed by the team. To be able to modify your team\u2019s plan or billing information please contact one of your team admins.")))))},nv=e=>{let{invoice:t}=e,n=new Date(t.createdAt).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}),r=`${t.amount} ${t.currency}`.toUpperCase();return a.createElement(p.ck,{action:a.createElement(p.$n,{href:t.pdfUrl,mode:"light",variant:"flat",round:!0,size:"l",icon:"DownloadOutline",tooltipText:"Download invoice",tooltipPlacement:"top"}),right:r},n)},nC=u.Ay.header`
  height: 64px;
`,nS=(0,u.Ay)(c.H2)`
  color: ${d.t14};
  text-align: center;
`,nk=u.Ay.div`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  gap: 32px;
  text-align: left;
`,nw=(0,u.Ay)(c.H4)`
  color: ${d.CP};
  text-align: center;
`,nA=u.Ay.div`
  display: flex;
  padding-top: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,nI=u.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
  color: ${d.CP};
  font-family: Inter;
  font-size: 14px;
  line-height: 24px; /* 171.429% */
  font-style: normal;
`,nP=u.Ay.div`
  font-weight: 600;
`,n$=u.Ay.div`
  font-weight: 400;
`,nT=u.Ay.div`
  flex: 1;
  display: flex;
  padding: 24px 32px;
  border-radius: 12px;
  background: ${d.KxS};
  gap: 16px;
`,nF=(0,u.Ay)(nT)`
  flex-direction: column;
`,nR=(0,u.Ay)(c.H5)`
  color: ${d.t14};
`,nM=(0,u.Ay)("strong")`
  color: ${d.CP};
`,nO=u.Ay.div`
  flex: 1;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 24px;
`,n_=n(9331).w.map(e=>({label:e.replace(/_/g," "),value:e})),nN=e=>{let{state:t,dispatch:n}=e,r=a.useCallback(e=>{if(!e||!e.type.endsWith("json")&&("playbook"!==t.importType||!e.name.endsWith(".bcl")))return!1;let a=new FileReader;return a.readAsArrayBuffer(e),a.onload=()=>{let e=a.result;e&&n({type:"Settings/FileImported",importType:t.importType,content:"string"==typeof e?e:new TextDecoder().decode(e)})},!0},[n,t.importType]);return a.createElement(a.Fragment,null,a.createElement(p.l6,{type:"input",options:n_,value:t.importType,onChange:e=>n({type:"Settings/ImportTypeChanged",importType:e})}),a.createElement(nH,{onDragOver:e=>{!function(e,t){let n=e[0];return!!n&&("playbook"===t?n.type.endsWith("json")||"text/plain"===n.type:n.type.endsWith("json"))}(e.dataTransfer.items,t.importType)?n({type:"Settings/DragStateChanged",state:{msg:"Please pass a JSON file!"}}):n({type:"Settings/DragStateChanged",state:"over"}),e.preventDefault(),e.stopPropagation()},onDragLeave:e=>{n({type:"Settings/DragStateChanged",state:"idle"}),e.preventDefault(),e.stopPropagation()},onDrop:e=>{r(e.dataTransfer.files[0])||n({type:"Settings/DragStateChanged",state:"idle"}),e.preventDefault(),e.stopPropagation()},onClick:()=>{let e=document.createElement("input");e.type="file",e.onchange=()=>r(e.files?.[0]),e.click()},$dragState:t.dragState},"object"==typeof t.dragState?t.dragState.msg:`Import ${t.importType.replace(/_/g," ")}`))},nB=e=>{let{state:t,dispatch:n}=e,r=(0,l.jL)();return a.createElement(nD,null,a.createElement(nN,{state:t,dispatch:n}),a.createElement(c.H4,null,"Misc"),a.createElement(nz,{style:{margin:"16px 0"}},a.createElement(p.$n,{round:!0,onClick:()=>r({type:"App/ExperimentsWiped"}),text:"Wipe experiments cache",variant:"outlined"}),a.createElement(p.$n,{round:!0,onClick:()=>r({type:"App/UIReset"}),text:"Reset UI state",tooltipText:"Reset UI state + accountSettings"}),a.createElement(p.$n,{round:!0,onClick:()=>r({type:"App/OnboardingReset"}),text:"Reset UI State and web-onboarding-data",variant:"outlined",tooltipText:"Reset UI state + accountSettings + web-onboarding-data"})))},nD=u.Ay.div`
  overflow-y: auto;
  margin: 16px 32px 0;
  display: flex;
  flex-direction: column;
  min-height: 0px;
  flex: 1;
  padding: 80px;
`,nH=u.Ay.div`
  align-items: center;
  border: 4px dashed ${d.NcT};
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
`,nz=u.Ay.div`
  display: flex;
  gap: 8px;
`;var nL=n(91472),nU=n(36884),nV=n(94949);let nq=e=>{let{onGenerate:t,onDeactivate:n,onCopy:r}=e,{teamConfig:i}=(0,l.rD)();if(!i)return null;let o=i.isAdmin,s=(0,w.Xj)(i),c=(0,w.p5)(i),{invitationLink:d}=i;return a.createElement(nj,null,d&&!s?a.createElement(a.Fragment,null,a.createElement(nW,{onChange:()=>{},value:d,size:"xl",round:!0,noClear:!0,addonAfter:a.createElement(nG,{variant:"ghost",size:"l",round:!0,text:"Copy Link",icon:"PopOutOutline",onClick:r,disabled:s})}),o?a.createElement(nQ,{variant:"info",round:!0,icon:"RadioInfoBold",rightAddon:a.createElement(nY,{size:"m",text:"Deactivate now",variant:"primary",round:!0,onClick:n})},"For security reasons the link will expire in ",c," days."):null):o?a.createElement(p.$n,{onClick:t,text:"Generate & copy invite link",variant:"primary",size:"xl",round:!0}):null)},nj=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: start;
`,nW=(0,u.Ay)(p.dN.Outline)`
  width: 100%;
`,nG=(0,u.Ay)(p.$n)`
  margin-bottom: -7px;
  margin-top: -7px;
  margin-inline-end: -18px;
`,nY=(0,u.Ay)(p.$n)`
  margin-top: -4px;
  margin-bottom: -4px;
  margin-inline-end: -14px;
`,nQ=(0,u.Ay)(p.BQ)`
  width: 100%;
`,nJ=e=>{let{value:t,loading:n,numFieldItems:r=1,hasInviteAction:i,refusedProUsers:l,refusedExistingUsers:o,onChange:s,onInvite:c}=e,d=t.every(e=>""===e.email||e.email&&(0,w.B9)(e.email)&&!l.includes(e.email)&&!o.includes(e.email));(0,a.useEffect)(()=>{t.length||s([...Array(r-t.length)].map(()=>({id:(0,w.$C)(),isDirty:!1,email:"",refused:null})))},[t,r,s]);let u=t.some(e=>(0,w.B9)(e.email)),m=t.find(e=>l.includes(e.email)),g=(e,n)=>{let a=t.map(t=>t.id===n?{...t,email:e,refused:l.includes(e)?"user_is_pro":o.includes(e)?"user_exists":null}:t);a[a.length-1]?.email&&a.push({id:(0,w.$C)(),email:"",isDirty:!1,refused:null}),s(a)},y=e=>{s(t.map(t=>t.id===e?{...t,isDirty:!0}:t).filter((e,n)=>e.email||n===t.length-1||n<r-1))},f=(e,n)=>{let a=n.clipboardData.getData("Text").toString().match(v.N);if(a?.length){n.stopPropagation(),n.preventDefault();let i=t.slice();i.splice(e,1,...a.map(e=>({id:(0,w.$C)(),isDirty:!1,email:e,refused:null})));let l=i.filter((e,n)=>e.email||n===t.length-1||n<r-1);l[l.length-1]?.email&&l.push({id:(0,w.$C)(),isDirty:!1,email:"",refused:null}),s(l)}};return a.createElement(nZ,{onSubmit:e=>{e.preventDefault(),c&&c(t)}},m?a.createElement(nK,{round:!0,icon:"RadioInfoBold",variant:"critical"},"Free users have been successfully invited, upgrade to Business to invite the paid users highlighted below."):null,t.map((e,t)=>a.createElement("div",{key:e.id},a.createElement(p.dN.Outline,{disabled:n,key:e.id,size:"xl",value:e.email,placeholder:"E.g. john.doe@bardeen.ai",onChange:t=>{g(t,e.id)},onBlur:()=>y(e.id),onPaste:e=>{f(t,e)},variant:""!==e.email&&!(0,w.B9)(e.email)&&e.isDirty||e.refused?"danger":"default","data-testid":"invite-input",noClear:!0,round:!0}),e.refused?a.createElement(n0,{$small:!0},"user_is_pro"===e.refused?"Pro user":"Already a team member"):null)),i&&a.createElement(nX,null,a.createElement(p.$n,{type:"submit",mode:"light",variant:"primary",text:"Invite users",round:!0,size:"xl",disabled:!d||!u,loading:n})))},nZ=u.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,nX=u.Ay.div`
  display: flex;
  justify-content: center;
`,nK=(0,u.Ay)(p.BQ)`
  text-align: start;
`,n0=(0,u.Ay)(c.P)`
  padding-inline: 19px;
  color: ${d.CCs};
  text-align: start;
`,n1=e=>{let{state:t,dispatch:n}=e,{profile:r,teamConfig:o}=(0,l.rD)(),s=(0,l.jL)(),d=(0,i.i8)(s,"ModalsAction"),u=t.invitations,m=o?.members??[],g=o?.isAdmin??!1,y=e=>{n({type:"Team/InvitationRemoveRequested",invitationId:e})},f=e=>{n({type:"Team/MemberRemoveRequested",memberId:e})},h=(0,a.useCallback)(e=>{n({type:"Team/InviteFormUpdated",value:e})},[n]),b=(0,w.Xj)(o);return a.createElement(n2,{"data-tracking-context":"Team"},a.createElement(n4,null,a.createElement(n3,null,a.createElement(n6,null,a.createElement(n8,null,o?.name)),a.createElement(n5,null,g?a.createElement(p.$n,{variant:"outlined",size:"l",round:!0,onClick:()=>d({type:"Modal/TeamRenameShown"}),text:"Rename"}):null,a.createElement(p.$n,{variant:"outlined",size:"l",round:!0,onClick:()=>s({type:"TeamAction",action:{type:"Team/LeaveTeamClicked"}}),text:"Leave"}))),o&&a.createElement(na.oh,{context:"settings/team"}),a.createElement(n7,null,a.createElement(n9,null,a.createElement(c.H4,null,"Invite friends & colleagues")),a.createElement(nq,{onGenerate:()=>{n({type:"Team/InvitationLinkGenerationRequested"})},onDeactivate:()=>{n({type:"Team/InvitationLinkDeactivationRequested"})},onCopy:()=>{n({type:"Team/InvitationLinkCopyRequested"})}}),g||o?.invitationLink&&!b?a.createElement(nL.HR,{text:"OR"}):null,a.createElement(nJ,{value:t.inviteForm,loading:nU.j.isLoading(t.invitationRequest),hasInviteAction:!0,onChange:h,onInvite:e=>{n({type:"Team/InviteMembersRequested",emails:e.filter(e=>(0,w.B9)(e.email)).map(e=>e.email)})},refusedProUsers:t.refusedProEmails,refusedExistingUsers:t.refusedExistingEmails.concat(m.map(e=>e.email))}),a.createElement(c.H2,{style:{padding:8}},"Your team members"),u.map(e=>a.createElement(p.ck,{key:e.id,right:a.createElement(c.a,null,"Invite pending"),action:g?a.createElement(p.$n,{mode:"light",variant:"flat",round:!0,text:"",size:"l",icon:"TrashBinOutline",key:"2",onClick:()=>y(e.id)}):null},e.email))),m.map(e=>a.createElement(p.ck,{key:e.id,action:(0,nV.L)(r,e,g)?a.createElement(p.$n,{mode:"light",variant:"flat",round:!0,text:"",size:"l",icon:"TrashBinOutline","aria-label":`Remove ${e.name}`,onClick:()=>f(e.id)}):null,right:(0,nV.W)(r,e,g)?a.createElement(p.ms,{width:240,placement:"left",renderContent:t=>{let{close:r}=t;return a.createElement(a.Fragment,null,a.createElement(p.IU,{text:"User",onClick:()=>{n({type:"Team/MemberRoleUpdateRequested",memberId:e.id,isAdmin:!1}),r()}},"User"),a.createElement(p.IU,{text:"Admin",onClick:()=>{n({type:"Team/MemberRoleUpdateRequested",memberId:e.id,isAdmin:!0}),r()}},"Admin"))}},a.createElement(p.$n,{mode:"light",variant:"flat",round:!0,text:e.isAdmin?"Admin":"User",size:"l",icon:"ArrowDownOutline",iconPosition:"right"})):a.createElement(p.ck.Caption,null,e.isAdmin?"Admin":"User")},a.createElement(p.eu,{size:48,src:e.picture}),a.createElement(p.ck.Main,null,a.createElement("div",null,e.name),a.createElement(p.ck.Caption,null,e.email))))))},n2=u.Ay.div`
  padding: 80px 0;
`,n4=u.Ay.div`
  max-width: 684px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  text-align: center;
`,n3=u.Ay.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
`,n6=u.Ay.div`
  display: flex;
  flex: 1;
`,n8=(0,u.Ay)(c.H4)`
  color: ${d.CP};
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`,n5=u.Ay.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`,n7=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,n9=u.Ay.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ae={type:"account",deletionConfirmation:null,trackingId:"Loading...",featureOverrides:[]},at=a.memo(e=>{let t=(0,l.jL)(),{appState:n,onClose:r,state:o}=e,{featureFlags:s,subscription:c,teamConfig:d}=(0,l.rD)(),{teamState:u}=n,m=(0,i.i8)(t,"ModalsAction"),g=(0,i.i8)(t,"TeamAction"),y=(0,i.i8)(m,"Modal/SettingsActionPerformed"),f=s.devTools,h=["account","team","billing","apps","devTools"].filter(e=>!!(("team"!==e||d?.isTeam)&&("devTools"!==e||f)&&("billing"!==e||d?.canManagePayment)));return a.createElement(p.hJ,{onClose:()=>{g({type:"Team/InviteFormUpdated",value:[]}),r()},"data-tracking-context":"Settings","data-testid":"settings-modal"},a.createElement(aa,null,a.createElement(ar,{"data-tracking-context":an[o.type]},a.createElement(al,null,a.createElement(ai,null,"Settings")),a.createElement(ao,null,h.map(e=>a.createElement(p.IU,{key:e,active:o.type===e,onClick:()=>y({type:"Settings/TabSwitched",tabName:e})},an[e])))),a.createElement(as,{"data-testid":"settings-tabpanel-container"},(()=>{switch(o.type){case"account":return a.createElement(ni,{dispatch:y,state:o});case"apps":return a.createElement(ny,{dispatch:y,query:o.query});case"billing":if(!c)return a.createElement(t5.B,{variant:"info"},"Fetching Profile...");return a.createElement(nE,{invoices:o.invoices,billing:o.billing});case"devTools":return a.createElement(nB,{state:o,dispatch:y});case"team":return a.createElement(n1,{state:u,dispatch:g})}})())))}),an={account:"Account",apps:"Connected Apps",billing:"Subscription & Billing",team:"Team",devTools:"DevTools"},aa=u.Ay.div`
  display: flex;
  flex-direction: row;
`,ar=u.Ay.div`
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
  border-right: 1px solid ${d.Tc2};
`,ai=u.Ay.h2`
  color: ${d.t14};
  font-family: Outfit;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 160% */
  letter-spacing: 0.1px;
`,al=u.Ay.header`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`,ao=u.Ay.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`,as=u.Ay.div`
  flex: 1;
  padding: 0 62px;
  overflow-y: auto;
  position: absolute;
  left: 300px;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${d.o$k};
`;var ac=n(47856),ad=n(44918),au=n(27745);let ap=e=>{let{onClose:t,scraperTemplate:n,onUseInAgent:r,onModifyTemplate:i,onDuplicateTemplate:o}=e,{title:s,icon:c,type:d}=n,u=(0,l.rD)().featureFlags.v4MiniEnabled;return a.createElement(au.B,{onClose:t,icon:c??"IntegrationScraper",title:s},a.createElement(p.Jn,{onClick:t,abs:!0,style:{right:14,top:10}}),a.createElement(am,null,a.createElement(ag,null,a.createElement(ad.V,{autoFocus:!0,premium:!1,icon:"IntegrationScraper",id:"in-agent",title:u?"Use in Agent":"Use in Playbook",description:"Start scraping the web with this template. You can enrich the results, use AI actions and more after the running the scraper.",onSelect:r}),a.createElement(ad.V,{premium:!1,icon:"PencilOutline",id:"modify-template",title:"Modify Template",description:"owned"===d?"Modify the scraper template to change what data is collected from the website.":"Duplicate this scraper template to your own scraper templates. You can modify it afterwards.",onSelect:"owned"===d?i:o}))))},am=(0,u.Ay)(p.VP)`
  overflow-y: auto;
  background-color: ${d.o$k};
`,ag=(0,u.Ay)(p.VP)`
  gap: 16px;
  padding: 24px;
`,ay={type:"None"};function af(e){return{type:"LoadingOverlay",message:e}}let ah={type:"Onboarding",onboardingState:"Pin"};function ab(e,t){let n=t.modal,{teamConfig:a}=t.config,i=e=>({...t,modal:e});switch(e.type){case"Modal/Closed":let l=[];if(e.only&&n.type!==e.only)return[t,l];return[i({type:"None"}),l];case"DeleteFolderClicked":{if(!("folderDeleteState"in n))return[t,[]];let e={...n.folderDeleteState,loading:!0},{folderId:a,moveToFolderId:r,strategy:l}=n.folderDeleteState,s=o.sE(a,l,r,()=>({type:"DeleteFolderDone",deletedId:a}));return[i({type:"FolderDelete",folderDeleteState:e}),[s]]}case"DeleteFolderDone":{let{appWindowState:n}=t,{automationsFolders:a,automationsSelectedFolderId:r}=n,{deletedId:l}=e;return[{...i({type:"None"}),notifications:[s.$.success("Folder deleted")],appWindowState:{...t.appWindowState,automationsSelectedFolderId:l===r?null:r,automationsFolders:{personal:a.personal.filter(e=>e.id!==l),team:a.team.filter(e=>e.id!==l)}}},[]]}case"Modal/AccountDeletionIntended":{if(e.force)return[t,[o.lw({type:"Modal/AccountDeleted"})]];if("Settings"!==n.type||"account"!==n.settingsState.type)return[t,[]];let{settingsState:r}=n;if(null===r.deletionConfirmation)return[i({type:"Settings",settingsState:{...r,deletionConfirmation:""}}),[]];if("delete"!==r.deletionConfirmation)return[t,[]];if(a?.isLastAdmin&&a.members.length>1)return[i({type:"TeamLeaveAdminAssign",onDone:{type:"ModalsAction",action:{...e,force:!0}}}),[]];return[t,[o.lw({type:"Modal/AccountDeleted"})]]}case"Modal/TeamRenameShown":return[i({type:"TeamRename"}),[]];case"Modal/SharingActionPerformed":{if(!("sharingState"in n))return[t,[]];let{type:a}=e,[r,l]=function(e,t){switch(e.type){case"SetInfo":return[{...t,isLoading:!1,sharingInfo:e.info},[]];case"Unshare":{let n=async t=>{let{api:n,dispatch:a}=t;try{await n.playbookSharingRevoke(e.id),a({type:"UnshareSuccess"})}catch(e){a({type:"ShowError",msg:`Unsharing failed. Please try again. Error: ${(0,tG.X)(e)}`})}};return[{...t,error:null,isLoading:!0},[n]]}case"UnshareSuccess":return[{...t,isLoading:!1},[async e=>{let{onClose:t}=e;return t()}]];case"ShowError":return[{...t,error:e.msg,isLoading:!1},[]]}}(e.action,n.sharingState),o=async e=>{let{api:t,dispatch:n}=e,r=()=>n({type:"Modal/Closed"});l.forEach(e=>e({api:t,dispatch:e=>n({type:a,action:e}),onClose:r}))};return[i({type:"PlaybookSharing",id:n.id,sharingState:r}),[o]]}case"Modal/RenamingActionPerformed":{if(!("renamingState"in n))return[t,[]];let[a,r]=function(e,t){if("ChangePlaybookName"===e.type)return[{...t,pb:{...t.pb,name:e.name}},[]]}(e.action,n.renamingState),l=e.type;return[i({type:"PlaybookRename",pb:n.pb,renamingState:a}),r.map(o.zy(e=>({type:l,action:e})))]}case"Modal/SettingsActionPerformed":{if(!("settingsState"in n))return[t,[]];let[a,l]=function(e,t){switch(e.type){case"Settings/DeleteAccountConfirmationChanged":if("account"!==t.type)return[t,[]];return[{...t,deletionConfirmation:e.confirm},[]];case"Settings/DragStateChanged":if("devTools"!==t.type)return[t,[]];return[{...t,dragState:e.state},[]];case"Settings/FileImported":return[t,[async t=>{let{api:n,dispatch:a}=t;"playbook"===e.importType?await n.playbookImport(e.content):await n.objectStorageImportResource(e.importType,e.content),a({type:"Settings/DragStateChanged",state:{msg:"Imported!"}})}]];case"Settings/QuerySet":if("apps"!==t.type)return[t,[]];return[{...t,query:e.q},[]];case"Settings/StateSet":if(e.replaceOnly&&e.state.type!==t.type)return[t,[]];return[e.state,[]];case"Settings/TabSwitched":switch(e.tabName){case"apps":return[{type:"apps",query:""},[]];case"account":return[ae,[async e=>{let{api:t,dispatch:n}=e;n({type:"Settings/StateSet",replaceOnly:!0,state:{deletionConfirmation:null,trackingId:await t.trackingGetId(),type:"account",featureOverrides:await t.systemGetOverridableFeatures()}})}]];case"billing":{let e=async e=>{let{api:t,dispatch:n}=e,a=await t.systemBardeenAccountGetInvoices();n({type:"Settings/StateSet",state:{type:"billing",billing:await t.systemBardeenAccountGetBillingDetails(),invoices:a,initialAmount:null,initialPlanCode:null},replaceOnly:!0})};return[{...t,type:"billing",billing:null,invoices:null,initialAmount:null,initialPlanCode:null},[e]]}case"team":return[{...t,type:"team"},[]];case"devTools":{let e=async e=>{let{api:t,dispatch:n}=e;n({type:"Settings/StateSet",state:{type:"devTools",importType:"playbook",dragState:"idle"},replaceOnly:!0})};return[{...t,type:"devTools",importType:"playbook",dragState:"idle"},[e]]}default:return(0,r.HB)(e.tabName)}case"Settings/ImportTypeChanged":if("devTools"!==t.type)return[t,[]];return[{...t,importType:e.importType},[]];default:return(0,r.HB)(e)}}(e.action,n.settingsState),s=e.type;return[i({...n,settingsState:a}),l.map(o.zy(e=>({type:s,action:e})))]}case"Modal/SettingsShown":let c=async t=>{let{dispatch:n}=t;n({type:"Modal/SettingsActionPerformed",action:{type:"Settings/TabSwitched",tabName:e.tab||"account"}})};return[i({type:"Settings",settingsState:ae}),[c]];case"Modal/PlaybookShared":{let t=async t=>{let{api:n,dispatch:a}=t;try{let t=await n.playbookShare(e.id);a({type:"Modal/SharingActionPerformed",action:{type:"SetInfo",info:t}})}catch(e){a({type:"Modal/Closed"})}};return[i({type:"PlaybookSharing",id:e.id,sharingState:tZ}),[t]]}case"Modal/PlaybookRenameShown":{let t=tq(e.pb,e.mode);return[i({type:"PlaybookRename",pb:e.pb,renamingState:t}),[]]}case"Modal/OnboardingActionPerformed":{if(!("onboardingState"in n))return[t,[]];let[a,r]=function(e,t){switch(e.type){case"CheckExtensionPinned":return[t,[async e=>{let{api:t,dispatch:n}=e;await t.isExtensionPinned()&&n({type:"PinningCompleted"})}]];case"PinningCompleted":return[null,[async e=>{let{dispatch:t}=e;return t({type:"Done"})}]];case"Done":return[null,[]]}}(e.action,n.onboardingState),l=e.type,s=r.map(o.zy(e=>({type:l,action:e})));return[i(null===a?{type:"None"}:{type:"Onboarding",onboardingState:a}),s]}case"Modal/AccountDeleted":return[i({type:"None"}),[o.Ov(!0)]];case"Modal/AppsConnectionShown":return[i({type:"AppsConnection",appsConnectionState:e_(e.pbId,e.apps,e.from,e.switchTo)}),[]];case"Modal/AppsConnectionActionPerformed":{if(!("appsConnectionState"in n))return[t,[]];let[a,l]=function(e,t){switch(e.type){case"Connect":{let n=async n=>{let{api:a}=n;for(let n of(await a.authCancel(),e.apps))await a.integrationActivate(n,{withControllerUI:!0,userData:{from:t.from,pb:e.playbookId,switchTo:t.switchTo}})};return[{...t,status:"inProgress"},[n]]}case"Activated":return[{...t,status:"success"},[]];case"CheckStatus":return[t,[async e=>{let{api:t,dispatch:n}=e,a=await t.authGetStatus();a&&n({type:"UpdateStatus",status:a})}]];case"UpdateStatus":{let n=e.status.auto?void 0:t.selectedApp?t.selectedApp:e.status.entries.find(e=>e.error);return[{...t,authStatus:e.status,selectedApp:n},[]]}case"AbortConnection":return[t,[async e=>{let{api:t}=e;await t.authCancel()}]];case"RetryAppConnection":{let e=async e=>{let{api:n}=e,a=t.authStatus.entries.findIndex(e=>e.name===t.selectedApp?.name);-1!==a&&await n.authContinueOne(a)};return[t,[e]]}case"SelectApp":return[{...t,selectedApp:e.app},[]];case"FocusActiveApp":return[t,[async e=>{let{api:t}=e;await t.authFocusActive()}]];default:(0,r.HB)(e)}}(e.action,n.appsConnectionState),s=e.type;return[i({type:"AppsConnection",appsConnectionState:a}),l.map(o.zy(e=>({type:s,action:e})))]}case"Modal/AddToRightClickMenuShown":{let[t,n]=ek(e);return[i({type:"AddToRightClickMenu",addToRightClickState:t}),n.map(o.zy(e=>({type:"Modal/AddToWebsiteMenuActionPerformed",action:e})))]}case"Modal/AddToWebsiteMenuActionPerformed":{if(!("addToRightClickState"in n))return[t,[]];let[a,l]=function(e,t){switch(e.type){case"SetAdvancedOption":return[{...t,advancedOptions:e.value?t.advancedOptions.concat(e.option):t.advancedOptions.filter(t=>t!==e.option)},[]];case"SetContextualScraping":return[{...t,contextualScraping:e.value},[]];case"UpdatedName":return[{...t,name:e.name},[]];case"ChangedVisibility":return[{...t,showOn:e.showOn},[]];case"UpdateMatcher":{let n=null;if("pattern"===e.operation&&e.value.trim()&&!(0,eu.gH)(e.value).valid){let e=new em.f;n=e.userHint||e.message}return[{...t,matchersInput:{operation:e.operation,value:e.value,error:n}},[]]}case"UpdatedPath":return[{...t,matchersInputPath:e.value},[async n=>{let{dispatch:a}=n;return a({type:"UpdateMatcher",value:(0,ev.h)(t.matchersInputDomain,e.value),operation:"pattern"})}]];case"UpdatedDomain":return[{...t,matchersInputDomain:e.value},[async n=>{let{dispatch:a}=n;return a({type:"UpdateMatcher",value:(0,ev.h)(e.value,t.matchersInputPath),operation:"pattern"})}]];case"AddMatcher":if("pattern"===t.matchersInput.operation&&!(0,eu.gH)(t.matchersInput.value).valid){let e=new em.f;return[{...t,matchersInput:{...t.matchersInput,error:e.userHint||e.message}},[]]}return[(0,ev.j)(t),[]];case"ClickedRemoveMatcher":{let n=t.specificMatchers.filter((t,n)=>n!==e.index);return[{...t,specificMatchers:n},[]]}case"MatchersAndExamplesFetched":{let n=e.matches.map(e=>({operation:"regex",value:e}));if(0===e.matches.length||0===e.exampleUrls.length)return[{...t,loading:!1,showContextualScraping:e.hasContextualScraping},[]];return[{...t,showOn:"scraperCompatible",specificMatchers:n,showContextualScraping:e.hasContextualScraping,exampleUrls:e.exampleUrls,loading:!1},[]]}case"MatchersAndExamplesFailedFetched":return[{...t,loading:!1},[]];default:(0,r.HB)(e)}}(e.action,n.addToRightClickState),s=e.type;return[i({type:"AddToRightClickMenu",addToRightClickState:a}),l.map(o.zy(e=>({type:s,action:e})))]}case"Modal/PinOrRightClickShown":if(!t.builderV2State)return[t,[]];return[i({type:"PinOrRightClick",pinOrRightClickState:{...t$((0,ed.Pv)(t.builderV2State),t.builderV2State.origin),...e.state||{}}}),[]];case"Modal/HowToRunShown":return[i({type:"HowToRun"}),[]];case"Modal/RunAutomaticallyShown":return[i({type:"RunAutomatically"}),[]];case"Modal/ConvertToAutobookShown":if(!t.builderV2State)return[t,[]];return[i({type:"ConvertToAutobook",convertToAutobookState:{...eK((0,ed.Pv)(t.builderV2State),t.builderV2State.origin,e.mode)}}),[(0,ec.iC)("trigger",e=>({type:"Modal/ConvertToAutobookActionPerformed",action:{type:"SetApps",apps:e}})),async n=>{if(!t.builderV2State)return;let{api:a,dispatch:r}=n,i=null;switch(e.mode){case"websiteData":i={pluginAlias:"Scraper",name:"website_data_changed_always_on"};break;case"schedule":i={pluginAlias:"BardeenCommons",name:"when_schedule"}}if(i){let{plugins:e,statement:n}=await a.playbookEditor2_CreateFunctionCall((0,ed.qO)((0,ed.Pv)(t.builderV2State)),i.pluginAlias,i.name);r({type:"Modal/ConvertToAutobookActionPerformed",action:{type:"SetCard",card:(0,ed.ph)(n,1),plugins:e}})}else await o.MA(e=>({type:"Modal/ConvertToAutobookActionPerformed",action:{type:"SetIntegrations",integrations:e}}))(n)}]];case"Modal/ConvertToAutobookActionPerformed":{if(!("convertToAutobookState"in n)||!t.builderV2State)return[t,[]];let[a,l]=function(e,t,n){switch(e.type){case"FunctionStatementAction":{let a=t.currentPb.trigger;if(!a||"FunctionCallStatement"!==a.type)return[t,[]];let r={...t.currentPb,trigger:(0,ed.Yy)(a,0)},[i,l]=eQ.Ff(e.action,a,r,t.origin,n),s=l.map(o.zy(t=>({type:e.type,action:t,index:a.index}))),c={...t.currentPb,trigger:i};return"ChangedArgument"===e.action.type&&s.push((0,ec.h2)(c,!1,e=>({type:"UpdateCurrentPb",pb:(0,ed.yO)(e)}))),[{...t,currentPb:c},s]}case"SetCard":{let n={...t,currentPb:{...t.currentPb,plugins:e.plugins,trigger:e.card}};return[n,[(0,ec.h2)(n.currentPb,!1,e=>({type:"UpdateCurrentPb",pb:e}))]]}case"UpdateCurrentPb":return[{...t,currentPb:e.pb},[]];case"SetApps":return[{...t,addCardState:{...t.addCardState,commandsLoading:!1,apps:e.apps}},[]];case"SetIntegrations":return[{...t,integrations:e.integrations},[]];case"AddCard/UpdatedInput":return[{...t,addCardState:{...t.addCardState,searchInput:e.input}},[]];case"AddCard/SelectedApp":return[{...t,addCardState:{...t.addCardState,selectedApp:e.app}},[]];case"AddCard/SelectedCommand":return[{...t,addCardState:{...t.addCardState}},[async function(n){let{api:a,dispatch:r}=n,{statement:i,plugins:l}=await a.playbookEditor2_CreateFunctionCall((0,ed.qO)(t.currentPb),e.command.pluginAlias,e.command.commandId);r({type:"SetCard",card:(0,ed.ph)(i,i.index),plugins:l})}]];case"AddCard/Closed":return[t,[]];case"ForceRevalidatePlaybook":return[t,[(0,ec.h2)(t.currentPb,!0,e=>({type:"UpdateCurrentPb",pb:e}))]];case"PlaybookArgsAction":{let{type:n}=e,[{pb:a,...r},i]=eJ.Ff({...t.playbookArgsState,pb:t.currentPb},e.action);return[{...t,currentPb:a,playbookArgsState:r},[...i.map(o.zy(e=>({type:n,action:e}))),(0,ec.h2)(a,!1,e=>({type:"UpdateCurrentPb",pb:e}))]]}default:(0,r.HB)(e)}}(e.action,n.convertToAutobookState,t.config),s=e.type;return[i({type:"ConvertToAutobook",convertToAutobookState:a}),l.map(o.zy(e=>({type:s,action:e})))]}case"Modal/PinOrRightClick/RightClickMenuClicked":{if(!("pinOrRightClickState"in n))return[t,[]];if(!e.checked)return[i({type:"PinOrRightClick",pinOrRightClickState:{...n.pinOrRightClickState,addToWebsiteMenuState:null}}),[]];let[a,r]=ek(e);return[i({type:"AddToRightClickMenu",addToRightClickState:a}),r.map(o.zy(e=>({type:"Modal/AddToWebsiteMenuActionPerformed",action:e})))]}case"Modal/FolderDeleteShown":return[i({type:"FolderDelete",folderDeleteState:e8(e.folderId,e.moveToFolderId,e.foldersToMove,e.automationsView,e.strategy)}),[]];case"Modal/FolderRenameShown":return[i({type:"FolderRename",folderRenameState:te(e.folderId,e.currentName,e.automationsView)}),[]];case"Modal/FolderRenameActionPerformed":{if(!("folderRenameState"in n))return[t,[]];let[a,r]=tt(e.action,n.folderRenameState),l=e.type,c=r.map(o.zy(e=>({type:l,action:e})));if("RenameFolderSucceeded"===e.action.type){let{folderId:e,newName:a,automationsView:r}=n.folderRenameState,l=(0,eo.aC)(r),o=t.appWindowState.automationsFolders[l];return[{...i({type:"None"}),notifications:s.$.add(t.notifications,"Folder renamed",{variant:"success"}),appWindowState:{...t.appWindowState,automationsFolders:{...t.appWindowState.automationsFolders,[l]:o.map(t=>t.id===e?{...t,display:{...t.display,name:a}}:t)}}},c]}return[i({type:"FolderRename",folderRenameState:a}),c]}case"Modal/StudioCardEditorActionPerformed":{if(!("studioCardEditorState"in n))return[t,[]];let[a,r]=ac.Ff(t,n.studioCardEditorState,e.action,t.config),i=e.type;return[a,r.map(o.zy(e=>({type:i,action:e})))]}default:return(0,r.HB)(e)}}let ax=a.memo(e=>{let t=(0,l.jL)(),{dispatch:n,state:o}=e,{subscription:s,teamConfig:c}=o.config,d=o.modal,u=c?.isTeam??!1,g=!u||u&&!!c?.isAdmin,y=(0,i.i8)(n,"Modal/RenamingActionPerformed"),f=(0,i.i8)(n,"Modal/SharingActionPerformed"),h=(0,i.i8)(n,"Modal/OnboardingActionPerformed"),b=(0,i.i8)(t,"TeamAction"),x=(0,i.i8)(n,"Modal/AppsConnectionActionPerformed"),E=(0,i.i8)(n,"Modal/AddToWebsiteMenuActionPerformed"),v=(0,i.i8)(n,"Modal/ConvertToAutobookActionPerformed"),C=(0,i.i8)(n,"Modal/FolderRenameActionPerformed"),S=(0,i.i8)(n,"Modal/StudioCardEditorActionPerformed"),k=a.useCallback(()=>n({type:"Modal/Closed"}),[n]),w=a.useCallback(e=>t(g?{type:"App/UpgradeIntended",from:e}:{type:"TeamAction",action:{type:"Team/RequestAdminUpgradeRequested",reason:""}}),[t,g]);switch(d.type){case"None":return null;case"Onboarding":return a.createElement(tI,{state:d.onboardingState,dispatch:h});case"Upgrade":if(!s)return null;if(!(0,el.V)(o.config.paymentPlans))return a.createElement(tp.D,{canUpgrade:!u||g,onClose:k,onUpgrade:()=>w("upgrade needed modal"),missingFeatures:[]});return a.createElement(tb.k,{onClose:k});case"CancelWinback":return a.createElement(tb.k,{onClose:k,intent:"cancelWinback",subscriptionPlanDetails:d.currentSubscriptionPlanDetails,subscriptionLoading:d.loading});case"Settings":return a.createElement(at,{onClose:k,appState:o,state:d.settingsState});case"PlaybookSharing":return a.createElement(tX,{dispatch:f,state:d.sharingState,id:d.id,onClose:k});case"PlaybookRename":return a.createElement(tj,{state:d.renamingState,pb:d.pb,dispatch:y,onSubmit:()=>t({type:"App/PlaybookRenameSubmitted"})});case"TrialEnded":return a.createElement(th,{canUpgrade:!u||g,onClose:k,onUpgrade:()=>w("trial ended modal")});case"OutOfCredits":if((0,el.V)(o.config.paymentPlans))return a.createElement(tb.k,{onClose:k,intent:"moreCredits"});return a.createElement(ty,{canUpgrade:!u||g,onClose:k,onUpgrade:()=>w("out of credits modal")});case"TeamCreate":return a.createElement(I,{state:o.teamState,dispatch:b,onClose:k});case"TeamRename":return a.createElement(et,{dispatch:b,onClose:k});case"TeamLeaveAdminAssign":return a.createElement(Y,{onDone:e=>b({type:"Team/AssignNewAdminPending",onDone:d.onDone,memberId:e}),onClose:k});case"TeamDelete":return a.createElement(L,{dispatch:b,onClose:k});case"TeamJoinSuccess":return a.createElement(m,{onClose:()=>{t({type:"App/TeamJoinSuccessClosed"}),k()},teamName:d.teamName});case"AppsConnection":return a.createElement(eN,{onClose:k,state:d.appsConnectionState,dispatch:x});case"AddToRightClickMenu":{let e=d.addToRightClickState;return a.createElement(ew,{onClose:()=>{k(),"builderSaveFlow"===e.mode&&n({type:"Modal/PinOrRightClickShown",state:e.prevModal})},onSave:()=>t({type:"App/RightClickModalSaved"}),state:d.addToRightClickState,dispatch:E})}case"PinOrRightClick":{let e=o.builderV2State&&(0,ed.Pv)(o.builderV2State);if(!e)throw Error("No builder state");let r=d.pinOrRightClickState;return a.createElement(tT,{onClose:k,onPreviousStep:()=>n({type:"Modal/HowToRunShown"}),onConfigureRightClick:t=>n({type:"Modal/PinOrRightClick/RightClickMenuClicked",checked:t,mode:"builderSaveFlow",ast:e,prevModal:r}),onSave:()=>{t({type:"App/FirstSaveSetupSaved",pb:r.pbAst,origin:r.origin,mode:"save-only"})},state:d.pinOrRightClickState})}case"HowToRun":if(!o.builderV2State)throw Error("No builder state");return a.createElement(tc,{onClose:k});case"RunAutomatically":if(!o.builderV2State)throw Error("No builder state");return a.createElement(t4,{onClose:k});case"ConvertToAutobook":{if(!o.builderV2State)return null;let e=d.convertToAutobookState,{currentPb:r,origin:i}=e;return a.createElement(e0,{state:e,dispatch:v,onClose:k,onBack:()=>n({type:"Modal/RunAutomaticallyShown"}),onSave:()=>t({type:"App/FirstSaveSetupSaved",pb:r,origin:i,mode:o.config.settings?.prefersActivateAndCloseAutobook?"save-and-activate":"save-only"})})}case"RememberMyChoice":return a.createElement(tK,{state:d.rememberMyChoiceState,onClose:k});case"BuilderV2/ForceRenamePlaybook":if(!o.builderV2State)return null;return a.createElement(ti,{dispatch:t,state:o.builderV2State,onClose:k,onSave:()=>t(d.onSaveAction)});case"LoadingOverlay":return a.createElement(p.hJ,{fullWidth:!0},a.createElement(es.gb,{status:d.message}));case"FolderDelete":return a.createElement(e5,{onClose:k,onDeleteFolderClicked:()=>n({type:"DeleteFolderClicked"}),state:d.folderDeleteState});case"FolderRename":return a.createElement(tn,{onClose:k,dispatch:C,state:d.folderRenameState});case"StudioCardEditor":{let e=o.builderV2State,n="builderV2"===o.view&&!!e;return a.createElement(ac.uA,{previousActions:n&&e?.previousActions||[],state:d.studioCardEditorState,dispatch:S,onClose:()=>{let n=e?(0,ed.Pv)(e).statements:[];"create"===d.studioCardEditorState.mode&&0===n.length&&t({type:"App/AppWindowOpened"}),k()}})}case"UseScraperTemplate":{let e=d.scraperTemplate.id;return a.createElement(ap,{onClose:k,scraperTemplate:d.scraperTemplate,onUseInAgent:()=>t({type:"UseScraperTemplate/useInAgentClicked"}),onModifyTemplate:()=>t({type:"Scrapers/EditClicked",id:e}),onDuplicateTemplate:()=>t({type:"Scrapers/DuplicateClicked",id:e})})}case"CreateNewAgent":return a.createElement(e3,{state:o.createAutomationState,onSelect:e=>t({type:"App/CreateAgentSelectorClicked",option:e}),onClose:k});default:(0,r.HB)(d)}})},64185:(e,t,n)=>{n.d(t,{K:()=>h});var a=n(44724),r=n(80028),i=n(53670),l=n(39221),o=n(28469),s=n(94555),c=n(14041),d=n(39716),u=n(58756),p=n(21799),m=n(4254),g=n(69670);let y=(0,n(85040).A)({"@global":{"html, body":{width:"100%",height:"100%",textWrap:"pretty"},"html, body, :host":{fontFamily:"Inter, system-ui, sans-serif",fontSize:"14px",fontWeight:400,color:g.ui$,height:"100vh"},"::-webkit-scrollbar":{height:1,width:1},"::-webkit-scrollbar-thumb":{background:`linear-gradient(transparent 8px, ${g.NcT} 20px, ${g.NcT} calc(100% - 20px), transparent calc(100% - 8px))`},"::-webkit-scrollbar-track-piece":{background:"transparent"},a:{color:g.t14,textDecoration:"none",cursor:"pointer","&:hover":{color:g.ui$},"&:focus":{textDecoration:"underline"}},"b, strong":{fontWeight:600,color:g.CP},button:{cursor:"pointer"},"#iframe":{width:"100%",height:"100%",border:"none",display:"flex",alignItems:"center",justifyContent:"center"}}}),f=e=>((0,m.dy)(),y(),(0,m.Zt)(),e.children),h=e=>{let{children:t}=e,n=c.useContext(u.o),m=c.useMemo(()=>{if(!n.styleInsertionPoint)return;let e=document.createComment("JSS Styles");return n.styleInsertionPoint.appendChild(e),e},[n.styleInsertionPoint]);c.useEffect(()=>{if(m)return()=>{m.parentElement?.removeChild(m)}},[m]);let g=(0,s.vt)({...(0,l.A)(),insertionPoint:m});return c.createElement(o.Ay,{jss:g},c.createElement(f,null,c.createElement(d.ID,{target:n.styleInsertionPoint},c.createElement(a.Kq,null,c.createElement(r.A,{injectFirst:!0},c.createElement(i.A,{theme:p.$Q},t))))))}},13314:(e,t,n)=>{n.d(t,{uA:()=>e1,Cb:()=>e6,Ff:()=>e0});var a=n(85148),r=n(14041),i=n(24114),l=n(93510),o=n(39716);let s=(0,o.Ay)(e=>{let{...t}=e,[n,a]=r.useState({}),i=(e,t)=>{let n=t.left-4,a=t.top-4,i=t.width+8,l=t.height+8;return r.createElement("rect",{key:e,x:n,y:a,width:i,height:l,fill:"black",rx:8,ry:8})},l=r.useMemo(()=>({add:(e,t)=>a(n=>({...n,[e]:t})),remove:e=>a(t=>{let{[e]:n,...a}=t;return a})}),[]);return r.createElement(c.Provider,{value:l},r.createElement("div",t),Object.entries(n).length>0&&r.createElement("svg",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}},r.createElement("defs",null,r.createElement("mask",{id:"mask"},r.createElement("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),Object.entries(n).map(e=>{let[t,n]=e;return i(t,n)}))),r.createElement("rect",{width:"100%",height:"100%",fill:"rgba(0, 0, 0, 0.3)",mask:"url(#mask)"})))})`
  display: grid;
  height: 100%;
  min-height: 100vh;
  padding: 32px;
  width: 100%;
  inset: 0;
  position: fixed;
  z-index: 100;
  pointer-events: all;
`,c=r.createContext({add:()=>{},remove:()=>{}});var d=n(48514),u=n(13489),p=n(29e3),m=n(62987),g=n(99538),y=n(36884),f=n(54538),h=n(88645),b=n(23794),x=n(19431),E=n(89486),v=n(96326),C=n(39306),S=n(86477),k=n(74112),w=n(67469),A=n(65069),I=n(85170);let P={__version:"",overlayModal:null,appWindowState:{resultsHighlighted:!1,explorerPageSelected:"personal",explorerHighlightedPb:null,automationsQuery:"",panelId:null,panelMenuItems:[],panelMenuItemsLoading:!1,panels:[],showResultsOnboarding:!1,notificationsMenuIsOpen:!1,resultsState:C.ue(),automationsFolders:{team:[],personal:[]},automationsSelectedFolderId:null,createFolderState:null,scraperTemplates:S.u},builderV2State:null,busyCalls:[],clickTrackingBlacklist:[],confettiCelebrationActive:!1,confirmState:null,connection:{type:"active"},debugMsg:{i:0,msg:""},modal:{type:"None"},notifications:x.$.initialState,tourFlowState:null,playbooksState:f.ue,pluginsState:{},postRunActions:[],config:{...h.j,settings:{...d.x,favoriteApps:["mid-Scraper","mid-Slack","mid-Google Mail"],hasSeenOnboardingSlideshow:!0,hasSeenTrialEndedFlow:!0,hasSeenPlaybooksInfobox:!0,hasSeenAutobooksInfobox:!0,hasSeenStudioTestToggle:!0}},showReason:{type:"user"},teamState:E.ue,view:"appWindow",localInteractionRunState:null,createAutomationState:{compatibleModels:[],loadingModels:!1,modelsVisible:!1,openTabs:[]}},$=v.W.fromApi({...b.ne[0],id:"123",name:"Demo: Get leads from Website",description:"Scrape contacts from a website",space:"personal",permissions:{edit:!0,owner:!0,write:!0,delete:!0,move:!0,share:!0,cow:"replace",reown:!0,results:!0}}),T={...P.playbooksState,personal:[$]},F={...P,playbooksState:T,appWindowState:{...P.appWindowState,explorerPageSelected:"personal"}},R={type:"StringTemplatingExpression",mimeType:"html",children:[{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingTextNode",text:"Dear ",format:{},validationStatus:[]},{type:"StringTemplatingVariableNode",join:null,defaultValue:null,value:{type:"CastExpression",expression:{type:"FieldAccessExpression",expression:{type:"VarRefExpression",name:"__0",referenceType:"functionCall",typeHint:{tag:u.E.Simple,signature:[{facets:["bardeen.google.mail.email","bardeen.google.mail.meta","blob","email","indexable","object","wcontext"],src:[{uuid:"aa9f5190-f32b-4439-ra69-10c350571de3",name:"Google Mail",version:"2.0.0"}]}],typeIcon:"IntegrationGoogleMail",typeLabel:"Google Email",typeDescription:"An Email from Gmail",typeInteractions:{},configOptions:[]},displayHint:{label:"Action 1",icon:"IntegrationScraper",description:""},validationStatus:[]},field:"Name",typeHint:{tag:u.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"AtSignOutline",typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},displayHint:{label:"Name",description:"The name of the person"},validationStatus:[]},typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}],config:{mimeType:"text/html"}}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},displayHint:{label:"Bcc",icon:"TextOutline",description:"The bcc recipients of the email"},validationStatus:[]},format:{},validationStatus:[]}],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingTextNode",text:"My name is Artem Harutyinyan and I'm the CTO and Founder of Bardeen.ai.",format:{},validationStatus:[]}],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[],validationStatus:[]},{type:"StringTemplatingBlockFormattingNode",element:"p",attributes:[],children:[{type:"StringTemplatingGenerateNode",prompt:{type:"StringTemplatingExpression",mimeType:null,children:[{type:"StringTemplatingBlockFormattingNode",children:[{type:"StringTemplatingTextNode",text:"Explain the value you ",format:{},validationStatus:[]}],element:"p",attributes:[],validationStatus:[]}],typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},validationStatus:[]},format:{},validationStatus:[]}],validationStatus:[]}],typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}],config:{mimeType:"text/html"}}],typeIcon:"TextOutline",typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},validationStatus:[]},M={columnData:{status:"invalid"},name:"",plugin:"",status:"idle",type:"FunctionCallStatement",conditionalExecution:null,actionNumber:1,hasResults:!1,progress:0,progressText:"",selectedTab:"Preview",args:[{name:"url",value:null,required:!1}],currentRequest:null,entry:null,expanded:!1,index:2,output:"compute",comment:"",commentFlags:{keep:!1},varName:"__0",columns:[],displayHint:{requiresPaymentPlan:[],columnBoundArgs:[],plugin:{name:"Bardeen",icon:"IntegrationBardeenCommons"},command:{id:"plugin:command",commandType:p.g.DO,expressions:[""],needsPaidFeature:[],returns:[]}},suggestions:{type:"success",value:[]},isTrigger:!1,addonState:w.ue,validationError:null,groupIndex:0,isGroupCardOpen:!1},O=e=>e.map(e=>{let{name:t,icon:n}=e;return{type:"ConstantValueExpression",value:{_types:["blob","blob.text","indexable","link","object"],_id:"link=https://example.com/",_updated:0x194d7043384,mimeType:"text/x-url",text:t},typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","link","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"LinkOutline",typeLabel:"URL",typeDescription:"A URL value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},displayHint:{label:t,icon:n,description:"A URL value",interactions:{}},validationStatus:[],weight:3}}),_={...M,actionNumber:1,index:0,varName:"__0",comment:"Scrape contacts from a website",status:"idle",plugin:"Scraper",displayHint:{plugin:{name:"Scraper",icon:"IntegrationScraper"},command:{id:"plugin:command",commandType:p.g.DO,expressions:["scrape with template on active tab"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},N={...M,actionNumber:2,index:1,comment:"Enrich profile data using Bardeen Enrichment",status:"idle",plugin:"Enrichment",displayHint:{plugin:{name:"Enrichment",icon:"IntegrationBardeenEnrichment"},command:{id:"plugin:command",commandType:p.g.DO,expressions:["enrich profile data"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},B={...M,actionNumber:3,index:2,comment:"Categorize contacts using Bardeen Categorizer",status:"idle",plugin:"Categorizer",displayHint:{plugin:{name:"Categorizer",icon:"IntegrationBardeenAI"},command:{id:"plugin:command",commandType:p.g.DO,expressions:["categorize contacts"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]}},D={...M,actionNumber:4,index:3,comment:"Create new record for each lead in Google Sheets",status:"idle",plugin:"GoogleSheets",name:"append_data_frame_google_sheet_tab",displayHint:{plugin:{name:"Google Sheets",icon:"IntegrationGoogleSheets"},command:{id:"plugin:command",commandType:p.g.DO,expressions:["create new record for each lead in Google Sheets"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]},args:[]},H={...M,actionNumber:4,index:4,comment:"Create a draft outreach email in Google Mail",status:"idle",plugin:"GoogleMail",name:"create_draft_email",expanded:!0,selectedTab:"Customize",displayHint:{plugin:{name:"Google Mail",icon:"IntegrationGoogleMail"},command:{id:"plugin:command",commandType:p.g.DO,expressions:["create draft email"],needsPaidFeature:[],returns:[]},requiresPaymentPlan:[],columnBoundArgs:[]},args:[{name:"Recipient(s)",required:!0,typeHint:{tag:u.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"]}],typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},value:{type:"FieldAccessExpression",expression:{type:"VarRefExpression",name:"__0",referenceType:"functionCall",typeHint:{tag:u.E.Simple,signature:[{facets:["bardeen.google.mail.email","bardeen.google.mail.meta","blob","email","indexable","object","wcontext"],src:[{uuid:"aa9f5190-f32b-4439-ra69-10c350571de3",name:"Google Mail",version:"2.0.0"}]}],typeIcon:"IntegrationGoogleMail",typeLabel:"Google Email",typeDescription:"An Email from Gmail",typeInteractions:{},configOptions:[]},displayHint:{label:"Action 1",icon:"IntegrationGoogleMail",description:""},validationStatus:[]},field:"bcc",typeHint:{tag:u.E.Simple,signature:[{facets:["emailaddress","indexable","object","personid"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"AtSignOutline",typeLabel:"Email Address",typeDescription:"An e-mail address",typeInteractions:{},configOptions:[]},displayHint:{label:"Email",description:"The bcc recipients of the email"},validationStatus:[]},displayHint:{label:"Recipient(s)",description:"Enter the email address of the recipient",dependsOn:[],miniUIConfig:null,expressions:[],required:!0,struct:m.u.Scalar}},{name:"Message",required:!0,displayHint:{label:"Message",description:"Enter the message of the email",dependsOn:[],miniUIConfig:null,expressions:[],required:!0,struct:m.u.Scalar},typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","object"]}],typeLabel:"Text",typeDescription:"A text value",typeInteractions:{},configOptions:[]},value:R}]},z={...(0,I.Ui)(),args:[{name:"_What__website__do__you__want__to__scrape__the__contacts__from",label:"What website do you want to scrape the contacts from",comment:"Enter a website URL or select an open tab from the list below",commentFlags:{keep:!1},restricted:!1,typeHint:{tag:u.E.Simple,signature:[{facets:["blob","blob.text","indexable","link","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]},{facets:["blob","blob.text","indexable","object"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]},{facets:["string"],src:[{uuid:"00000000-0000-0000-0000-000000000000",name:"Bardeen Core",version:"0.1.0"}]}],typeIcon:"LinkOutline",typeLabel:"URL",typeDescription:"A URL value",typeInteractions:{},configOptions:[{key:"mimeType",label:"Format",type:"string",description:"The text type (MIME type) of the text blob",choices:[{label:"Plain Text",value:"text/plain"},{label:"HTML",value:"text/html"},{label:"Markdown",value:"text/markdown"}]}]},value:null,struct:m.u.Scalar,required:!0,save:"config",validationStatus:[],usedInMapping:[],implicitSave:null,usedInStatementArg:[{index:1,argName:"url",argLabel:"URL",statementIcon:"LinkOutline",statementName:"Scraper",statementComment:null}],requiredByOtherCommand:!0,usedAsMultipleValueArgument:!1}],meta:{...(0,I.Ui)().meta,name:"Demo: Get leads from Website",description:"Scrape contacts from a website",categories:[],commands:[],id:"123",revision:0},plugins:[{needsPaidFeature:[],factoryId:"aa-0-190-f32b-4439-bf48-meeter71de3",instanceId:"aa-0-190-f32b-4439-bf48-meeter71de3-sgt",alias:"Scraper",displayHint:{name:"Scraper",version:"0.0.1",icon:"IntegrationScraper",enabled:!0}},{needsPaidFeature:[],factoryId:"16a55327-223b-42f4-97d5-bd4ca74a399e",instanceId:"16a55327-223b-42f4-97d5-bd4ca74a399e-sgt",alias:"BardeenEnrichment",displayHint:{name:"Bardeen Enrichment",version:"0.0.1",icon:"IntegrationBardeenEnrichment",enabled:!0}},{needsPaidFeature:[],factoryId:"2a4cd4df-01a9-4773-80f0-88cefea35602",instanceId:"2a4cd4df-01a9-4773-80f0-88cefea35602-sgt",alias:"BardeenAI",displayHint:{name:"BardeenAI",version:"0.0.1",icon:"IntegrationBardeenAI",enabled:!0}},{needsPaidFeature:[],factoryId:"f4dd54ae-b59d-4537-b785-f74f6b3eaeee",instanceId:"85edb2c3-dc7a-4062-9996-82fffd0f05f6",alias:"GoogleSheets",displayHint:{name:"Google Sheets",version:"1.0.0",icon:"IntegrationGoogleSheets",enabled:!0}}],statements:[_,N,B,{...(0,A.VX)(10,"If lead is qualified"),index:10,actionNumber:4,ifTrue:{type:"BlockStatement",index:3,output:"compute",comment:null,commentFlags:{keep:!1},children:[D],validationStatus:[]},ifFalse:{type:"BlockStatement",index:6,output:"compute",comment:null,commentFlags:{keep:!1},children:[],validationStatus:[]},validationStatus:[],currentBranch:"ifTrue"}]},L={...P,view:"builderV2",builderV2State:{...(0,k.Ur)({ast:z}),testModeEnabled:!1,pbHeaderVisible:!0}},U=[{Name:"Dr. Evelyn Carter",Company:"NexaTech",Location:"San-Francisco, CA, USA",Email:"evelyn@nexatech.com"},{Name:"Sophia Bennett",Company:"InnovateAI",Location:"San-Francisco, CA, USA",Email:"sophia@innovateai.com"},{Name:"Dr. Alejandro Torres",Company:"Global Tech University",Location:"Dallas. TX, USA",Email:"alejandro@gtu.com"},{Name:"Li Wei Zhang",Company:"SynapseAI",Location:"London, UK",Email:"zhang@synapseai.com"},{Name:"Amara Patel",Company:"Self Employed",Location:"San-Francisco, CA, USA",Email:"amara@patel.com"}],V={type:"result",result:{type:"success",message:null,microCredits:1e3,cached:!1,unitsProduced:1,timeSaved:1200,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:1,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"title"},{name:"Subject",title:"Subject",origin:null,type:"title"},{name:"Email count",title:"Email count",origin:null,type:"secondary"},{name:"From",title:"From",origin:null,type:"default"},{name:"To",title:"To",origin:null,type:"secondary"},{name:"Labels",title:"Labels",origin:null,type:"secondary"}],rows:[{resourceIcon:"IntegrationGoogleMail",contentIcon:null,error:null,pureContent:!1,body:[{url:`data:text/plain;base64,${btoa(`Dear ${U[0]?.Name||"..."},
                    My name is Artem Harutyinyan and I'm the CTO and Founder of Bardeen.ai.
                    I am reaching out to you because I believe you might be interested in our services.
                    I have attached a PDF with more information about our company and the services we offer.
                    Please let me know if you have any questions or if I can provide you with more information.
                    Best regards,
                    Artem Harutyinyan
                    CTO and Founder
                    Created by Bardeen.ai
                    `)}`,mimeType:"text/plain"}],values:{Name:{type:"plain",text:"Artem from Bardeen"},Subject:{type:"plain",text:"Artem from Bardeen"},"Email count":{type:"plain",text:U.length.toString()},From:{type:"plain",text:U[0]?.Email||"lead@bardeen.ai"},To:{type:"plain",text:"0"},Labels:{type:"plain",text:"Draft"}},message:null,iteration:[],resourceUrl:"https://mail.google.com/mail?authuser=me#all/1966c59898a5454f",resourceName:"Google Email",actions:[]}]}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}},q=(e,t)=>e.builderV2State?{...e,builderV2State:(0,I.Bf)(e.builderV2State,e=>(0,g.Co)(e,{transformBlockStatement:e=>({...e,children:[...e.children,t]})}))}:e,j=(e,t)=>e.builderV2State?{...e,builderV2State:(0,I.Bf)(e.builderV2State,e=>(0,g.Co)(e,{transformFunctionCallStatement:e=>e.index===t?{...e,expanded:!0}:e}))}:e,W=e=>e.builderV2State?{...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"idle"}}}:e,G=(e,t)=>{if(!e.builderV2State)return e;let n=Array(t+1).fill(void 0).map((e,t)=>t),a=Array(t).fill(void 0).map((e,t)=>t),r={...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"running",executionId:"1",runRecordId:"1",statementIndex:t,statementProgress:0,startedStatements:n,finishedStatements:a,totalStatementsCount:Math.max(n.length,4),postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}};if(!r.builderV2State)return r;let i=(0,I.Bf)(r.builderV2State,e=>(0,g.Co)(e,{transformFunctionCallStatement:e=>e.index===t?{...e,expanded:!1,status:"loading"}:a.includes(e.index)?{...e,status:"success"}:e}));return{...r,builderV2State:i}},Y=e=>(t,n)=>{if(!e.builderV2State)return e;let a={...e};if(!a.builderV2State)return a;let r=Array(n+1).fill(void 0).map((e,t)=>t),i=Array(n+1).fill(void 0).map((e,t)=>t),l=(0,I.Bf)(a.builderV2State,e=>(0,g.Co)(e,{transformFunctionCallStatement:e=>e.index===n?{...e,status:"success",selectedTab:"Preview",expanded:!1,entry:t}:i.includes(e.index)?{...e,status:"success"}:e}));return{...a,builderV2State:{...l,sequencingStatus:{type:"running",executionId:"1",runRecordId:"1",statementIndex:n,statementProgress:0,startedStatements:r,finishedStatements:i,totalStatementsCount:Math.max(i.length,4),postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}}},Q=e=>e.builderV2State?{...e,builderV2State:{...e.builderV2State,sequencingStatus:{type:"idle"}}}:e,J=(e=>({type:"result",result:{type:"success",message:null,microCredits:5e3,cached:!1,unitsProduced:1,timeSaved:3600,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:e.length,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"default"},{name:"Company",title:"Company",origin:null,type:"default"},{name:"Location",title:"Location",origin:null,type:"default"}],rows:e.map(e=>{let{Name:t,Company:n,Location:a}=e;return{values:{Name:{type:"plain",text:t},Company:{type:"plain",text:n},Location:{type:"plain",text:a}},iteration:[],resourceIcon:null,contentIcon:null,error:null,pureContent:!1,body:[],message:null,resourceName:"Table Row",actions:[]}})}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}}))(U),Z="https://docs.google.com/spreadsheets/d/1AzaKvWw-4Ikm-0G_ql9B6n4PVa4ZS5xXVWERKHmdABk/edit?gid=0#gid=0",X={type:"result",result:{type:"success",message:null,microCredits:1e3,cached:!1,unitsProduced:1,timeSaved:1200,tabs:[{name:"_default",title:"_default",icon:null,breakdown:{c_good:1,c_filter:0,c_empty:0,c_error:0,c_skip:0},table:{columns:[{name:"Name",title:"Name",origin:null,type:"title"},{name:"Size",title:"Size",origin:null,type:"secondary"},{name:"Created",title:"Created",origin:null,type:"default"},{name:"Last Modified",title:"Last Modified",origin:null,type:"default"}],rows:[{resourceIcon:"IntegrationGoogleSheets",contentIcon:null,error:null,pureContent:!1,body:[],values:{Name:{type:"plain",text:"Leads sheet"},Size:{type:"plain",text:"0.00 Kb"},Created:{type:"plain",text:"Thursday, Sep 5, 2024, 4:49:05 PM"},"Last Modified":{type:"plain",text:"Wednesday, Apr 23, 2025, 3:36:31 PM"}},message:null,iteration:[],resourceUrl:Z,resourceName:"GoogleSheet",actions:[]}]}}],breakdown:{c_empty:0,c_error:0,c_filter:0,c_good:0,c_skip:0}},fullScreenTab:null,rowBodyState:null,selectedGroup:{}},K=j(Y(L)(J,0),0),ee=j(Q(Y(G(K,4))(X,4)),4),et=W(K),en=0;function ea(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};en++;let t=W(j(Y(G(K,3))(X,3),3));return{id:`builder-test-run-complete-${en}`,type:"panel",title:"Run complete  \uD83C\uDF89",description:"The leads have been enriched, classified and stored in a sheet. Let's have a look at them!",autoNextDelay:0,activeElements:[],state:t,actions:[],isFlowComplete:!1,scrollElement:null,...e}}function er(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return en++,{type:"panel",id:`click-on-open-playbook-in-studio-${en}`,title:"My Playbooks",description:"Manage and open your Playbooks in the Studio to run or customize them.",activeElements:[],autoNextDelay:null,state:L,actions:[],isFlowComplete:!1,scrollElement:null,...e}}let ei={...P,playbooksState:T,appWindowState:{...P.appWindowState,explorerPageSelected:"personal"}},el={...F,appWindowState:{...F.appWindowState,resultsHighlighted:!0}},eo=e=>({selector:`[data-tour-id='${e}']`,onClick:{type:"TourFlow/NextStepClicked"},highlighted:!0}),es=[er({activeElements:[eo("playbook-item")],state:ei}),er({autoNextDelay:2e3,isFlowComplete:!0,state:ei})],ec=[function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return en++,{type:"panel",id:`test-playbook-visible-${en}`,title:"Welcome to the Studio!",description:`Here are the actions your Playbook will perform one after another.

Click the Test button above to preview those actions.`,activeElements:[],autoNextDelay:null,state:L,actions:[],isFlowComplete:!1,scrollElement:null,...e}}({activeElements:[eo("playbook-test-button")],state:L,description:`Here are the actions your Playbook will perform one after another.

    Click the Test button above to preview those actions.`}),{id:"builder-test-scraper-start",type:"sequence",autoNextDelay:1500,scrollElement:ey(0),state:G(L,0),isFlowComplete:!1},{type:"panel",id:"builder-test-ask-to-scrape-website",title:"Your input needed",description:"Some actions need your input each time they run. Select an option to continue.",activeElements:[{selector:"[data-statement-index='0']",highlighted:!1},{selector:"[data-tour-id='argument-filling-widget-suggestion-0']",highlighted:!0,onClick:{type:"TourFlow/ExternalLinkClicked",link:"https://www.bardeen.ai/bardeen-summit"}}],autoNextDelay:null,state:(e=>{if(!e.builderV2State)return e;let t={addonState:e.builderV2State.argumentFillingState?.addonState,currentRequest:null,suggestions:y.j.Success(O([{name:"Bardeen summit conference",icon:"IntegrationBardeenCommons"},{name:"(25) Frontend Developer Jobs | Linkedin",icon:"IntegrationLinkedin"},{name:"Bardeen - Google Search",icon:"IntegrationGoogleSheets"}]))};return{...e,builderV2State:{...e.builderV2State,argumentFillingState:t,sequencingStatus:{...e.builderV2State.sequencingStatus,activeIndex:0,autobookBehaviour:"run",arguments:[{statementIndex:0,argumentName:"_What__website__do__you__want__to__scrape__the__contacts__from"}],type:"filling",postRunActions:[],runParams:{targetIndex:null,defaultCacheBehavior:"default",limitResults:null}}}}})(G(L,0)),actions:[],isFlowComplete:!1,scrollElement:null},{id:"builder-test-scraper-completed",type:"sequence",autoNextDelay:200,state:Y(G(L,0))(J,0),isFlowComplete:!1,scrollElement:null},{id:"builder-test-scraper-completed-scroll",type:"sequence",autoNextDelay:800,state:Y(G(L,0))(J,0),isFlowComplete:!1,scrollElement:{selector:"[data-statement-index='0']",behavior:"center"}},{id:"builder-test-scraper-result",type:"tooltip",title:"Click on the card to preview the results.",description:"The scrape action just got the contacts from the conference website. Looks like it's working nicely.",action:null,activeElements:[{selector:"[data-statement-index='0']  [data-testid='builder-card-header-content']",onClick:{type:"TourFlow/NextStepClicked"},highlighted:!0}],anchoredSelector:"[data-statement-index='0']  [data-testid='builder-card-header-content']",state:Y(G(L,0))(J,0),isFlowComplete:!1,autoNextDelay:null,scrollElement:null},{id:"builder-test-scraper-result-visible",type:"sequence",autoNextDelay:300,state:K,isFlowComplete:!1,scrollElement:null},{id:"builder-test-scraper-result-visible",type:"sequence",autoNextDelay:3e3,state:K,isFlowComplete:!1,scrollElement:ey(0)},{id:"builder-test-enrichment-start",type:"sequence",autoNextDelay:2e3,state:G(K,1),isFlowComplete:!1,scrollElement:ey(1)},{id:"builder-test-enrichment-completed",type:"sequence",autoNextDelay:200,state:G(K,1),isFlowComplete:!1,scrollElement:null},{id:"builder-test-categorizer-start",type:"sequence",autoNextDelay:2e3,state:G(K,2),isFlowComplete:!1,scrollElement:ey(2)},{id:"builder-test-categorizer-completed",type:"sequence",autoNextDelay:200,state:G(K,2),isFlowComplete:!1,scrollElement:null},{id:"builder-test-google-sheet-start",type:"sequence",autoNextDelay:2e3,state:G(K,3),isFlowComplete:!1,scrollElement:ey(3)},{id:"builder-test-google-sheet-completed",type:"sequence",autoNextDelay:300,state:W(j(Y(G(K,3))(X,3),3)),isFlowComplete:!1,scrollElement:null},{id:"builder-test-google-sheet-completed-scroll",type:"sequence",autoNextDelay:800,state:W(j(Y(G(K,3))(X,3),3)),isFlowComplete:!1,scrollElement:ey(3)},ea({autoNextDelay:1e3,activeElements:[]}),ea({activeElements:[{highlighted:!0,selector:"[data-tour-id='result-block-single-view-open-GoogleSheet']",onClick:{type:"TourFlow/ExternalLinkClicked",link:Z}}],scrollElement:{selector:"[data-tour-id='result-block-single-view-open-GoogleSheet']",behavior:"center"}}),ea({autoNextDelay:2e3,isFlowComplete:!0}),{id:"builder-test-run-complete-choose-next",type:"panel",title:"What next?",description:"Close the Studio using the 'X' in the top right - or learn how to  customize your Playbook with AI.",autoNextDelay:null,activeElements:[{selector:"[data-tour-id='builder-close-button']",highlighted:!1,onClick:{type:"TourFlow/Canceled"}}],scrollElement:{selector:"[data-tour-id='builder-close-button']",behavior:"center"},state:ee,actions:[{title:"Close Studio",onClick:{type:"TourFlow/Canceled"}},{title:"Customize Playbook with AI",onClick:{type:"TourFlow/FlowSelected",flowId:"customize-playbook"}}],isFlowComplete:!0}];function ed(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return en++,{id:`customized-card-result-preview-complete-collapsed-${en}`,type:"panel",title:"Save Playbook",description:`Well done, your Playbook looks great and ready to be saved.

Click the highlighted Save button on top.`,activeElements:[],autoNextDelay:null,state:q(K,{...H,expanded:!1}),actions:[],isFlowComplete:!1,scrollElement:null,...e}}function eu(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return en++,{id:`test-your-changes-${en}`,type:"panel",title:"Nice!",description:`Magic Box just added an action to create draft emails. Click the play button to run that as well.

No worries - as this is a demo we won't actually create any draft emails.`,activeElements:[],autoNextDelay:null,state:q(et,{...H,expanded:!0}),actions:[],isFlowComplete:!1,scrollElement:null,...e}}let ep=[ed({activeElements:[eo("playbook-save-button")],state:q(et,{...H,expanded:!0,entry:V,selectedTab:"Preview"})}),ed({autoNextDelay:2e3,isFlowComplete:!0,state:F})],em=[{id:"customize-open-magicbox",type:"panel",title:"Edit with Magic Box",description:"Open Magic Box with the button on the left to start customizing.",activeElements:[eo("magicbox-btn")],autoNextDelay:null,state:et,actions:[],isFlowComplete:!1,scrollElement:{selector:"[data-tour-id='magicbox-btn']",behavior:"center"}},{id:"customize-magicbox-open",type:"sequence",autoNextDelay:2e3,state:et,isFlowComplete:!1,scrollElement:null},{id:"customize-magicbox-fill",type:"tooltip",title:"This is Magic Box",description:'Describe how you want to change your Playbook - in natural language. Let\'s try "Create a draft email for each qualified user."',activeElements:[],state:et,isFlowComplete:!1,anchoredSelector:"[data-tour-id='magicbox-input']",action:{onClick:{type:"TourFlow/NextStepClicked"},label:"Continue"},autoNextDelay:null,scrollElement:null},{id:"updating-magicbox",type:"sequence",autoNextDelay:2e3,isFlowComplete:!1,state:{...et,builderV2State:et.builderV2State?{...et.builderV2State,loadingStatus:"updating"}:L.builderV2State},scrollElement:null},{id:"test-your-changes-scroll",type:"sequence",autoNextDelay:300,isFlowComplete:!1,scrollElement:ey(4),state:q(et,H)},eu({activeElements:[{selector:"[data-statement-index='4']",highlighted:!1,customClassNames:["pseudo-active"]},eo("play-btn-4")]}),{id:"run-customized-card",type:"sequence",autoNextDelay:2e3,isFlowComplete:!1,scrollElement:ey(4),state:G(q(K,{...H}),4)},eu({isFlowComplete:!0,autoNextDelay:2e3,state:Q(q(et,{...H,expanded:!0,entry:V,selectedTab:"Preview"}))})],eg=e=>[{id:"open-playbook-in-studio",title:"1. Open Playbook in Studio",required:!0,steps:es},{id:"test-playbook",title:"2. Run Playbook",required:!0,steps:ec},{id:"customize-playbook",title:"3. Customize Playbook",required:!1,steps:em},{id:"save-playbook",title:"4. Save Playbook",required:!0,steps:[...ep,{id:"highlight-results-tab",type:"tooltip",title:"Find Your Results",description:"All your past Playbook runs are saved here for easy access.",activeElements:[],state:el,isFlowComplete:!1,action:{onClick:{type:"TourFlow/NextStepClicked"},label:"Got it"},anchoredSelector:"[data-tour-id='results-btn']",autoNextDelay:null,scrollElement:null},{id:"highlight-create-playbook-btn",type:"tooltip",title:"Ready to start?",description:"Click here to build your own Playbook.",activeElements:[eo("create-playbook-btn")],state:el,isFlowComplete:!1,action:null,anchoredSelector:"[data-tour-id='create-playbook-btn']",autoNextDelay:null,scrollElement:{selector:"[data-tour-id='create-playbook-btn']",behavior:"center"}}]}];function ey(e){return{selector:`[data-statement-index='${e}']`,behavior:"start"}}var ef=n(69670);let eh=(0,o.i7)`
  0% {
    box-shadow: 0 0 0 0 rgba(242, 184, 94, 0.8);
  }
  50% {
    box-shadow: 0 0 0 ${16}px rgba(242, 184, 94, 0.4);
  }
  100% {
    box-shadow: 0 0 0 ${24}px rgba(242, 184, 94, 0);
  }
`,eb=(0,o.i7)`
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
`,ex=(0,o.i7)`
  from {
    transform: scale(3);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`,eE=o.Ay.div.attrs({"aria-label":"Highlight"})`
  position: fixed;
  z-index: 9999;
  border-radius: ${e=>{let{$radius:t}=e;return t}}px;
  ${e=>{let{$highlighted:t}=e;return t?(0,o.AH)`
          animation:
            ${ex} 0.7s ease-out,
            ${eh} 2s infinite;
        `:""}}
  box-shadow: 0 0 0 0px ${ef.eJD};
  opacity: 1;
  transition:
    transform 0.4s ease-out,
    box-shadow 0.2s ease-out;
  cursor: pointer;
  outline: none;

  &.highlight-pulse {
    animation: ${eb} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
`;function ev(e){let{selector:t,highlighted:n,onClick:a,customClassNames:i}=e,[l,o]=r.useState(null),[s,d]=r.useState(4),u=r.useRef(null);r.useEffect(()=>{let e=()=>{},n=null,a=null,r=null,l=[],s=document.querySelector(t);if(s)return d(parseInt(getComputedStyle(s).borderRadius)+5),requestAnimationFrame(()=>{u.current=s,i.length>0&&s.classList.add(...i);let t=e=>{if(!e||e===document.body)return;let n=window.getComputedStyle(e).overflowY;"visible"!==n&&"hidden"!==n&&l.push(e),t(e.parentElement)};t(s.parentElement),n=new MutationObserver(e=()=>{o(s.getBoundingClientRect())}),a=new ResizeObserver(e),l.forEach(t=>{t.addEventListener("scroll",e,{passive:!0})}),document.addEventListener("scroll",e,{passive:!0}),window.addEventListener("resize",e),n.observe(s,{attributes:!0,childList:!0,subtree:!0}),a.observe(s),e(),r=window.setTimeout(e,400)}),()=>{window.removeEventListener("resize",e),r&&clearTimeout(r),n?.disconnect(),a?.disconnect(),l.forEach(t=>{t.removeEventListener("scroll",e)}),document.removeEventListener("scroll",e),s&&i.length>0&&s.classList.remove(...i)}},[t,n,i]),r.useEffect(()=>()=>{u.current&&u.current.classList.remove("pseudo-hover")},[]);let p=r.useId(),{add:m,remove:g}=r.useContext(c);return(r.useEffect(()=>(l&&m(p,l),()=>g(p)),[l,p,m,g]),l)?r.createElement(eE,{"data-tour-highlight":n?"true":void 0,"data-testid":n?"tour-highlight-clickable":void 0,$highlighted:!!n,$radius:s,style:{top:l.top-5,left:l.left-5,width:l.width+10,height:l.height+10},onMouseOver:()=>{u.current&&u.current.classList.add("pseudo-hover")},onMouseLeave:()=>{u.current&&u.current.classList.remove("pseudo-hover")},onClick:a}):null}var eC=n(67331),eS=n(26584),ek=n(4630),ew=n(72947),eA=n(72546),eI=n(9005),eP=n(28926);let e$=o.Ay.div`
  display: flex;
  width: 56px;
  height: 56px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${ef.$yM};
`,eT=r.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.createElement("g",{clipPath:"url(#clip0_3061_12579)"},r.createElement("path",{d:"M15.5035 11.25H4.125V11.5151L10.546 14.6634C11.4613 15.1122 12.5387 15.1122 13.454 14.6634L17.6192 12.6212L17.625 12.5625C17.6248 12.5587 17.6246 12.5551 17.6245 12.5514C17.6186 12.4246 17.616 12.3698 17.3013 12.1875L15.5035 11.25Z",fill:"url(#paint0_linear_3061_12579)"}),r.createElement("path",{d:"M18.3533 12.2612C18.297 12.0965 18.15 11.925 18.15 11.925C18.0565 11.8209 17.9086 11.7226 17.7532 11.6449L17.0131 11.25H19.875V11.5151L18.3533 12.2612Z",fill:"url(#paint1_linear_3061_12579)"}),r.createElement("path",{d:"M17.5319 13.4993L17.3013 15.8191C17.1839 16.3322 17.9235 16.7578 18.3419 16.4378L18.4293 16.3858C18.7524 16.1387 18.8524 15.8191 18.7435 15.3281L18.4586 13.0449L19.875 12.3504V15.7422C19.875 18.4389 16.3492 20.625 12 20.625C7.65076 20.625 4.125 18.4389 4.125 15.7422V12.3504L10.2159 15.3368C11.3394 15.8877 12.6606 15.8877 13.7841 15.3368L17.5319 13.4993Z",fill:"url(#paint2_linear_3061_12579)"}),r.createElement("path",{d:"M13.454 3.33658C12.5387 2.88781 11.4613 2.88781 10.546 3.33658L0.4493 8.28711C-0.149766 8.58084 -0.149767 9.41916 0.4493 9.71289L10.546 14.6634C11.4613 15.1122 12.5387 15.1122 13.454 14.6634L17.6192 12.6212L17.625 12.5625C17.6248 12.5587 17.6246 12.5551 17.6245 12.5514C17.6186 12.4246 17.616 12.3698 17.3013 12.1875L11.8323 9.33549C11.6471 9.24287 11.572 9.01762 11.6646 8.83238C11.7572 8.64713 11.9825 8.57205 12.1677 8.66467L17.7532 11.6449C17.9086 11.7226 18.0565 11.8209 18.15 11.925C18.15 11.925 18.297 12.0965 18.3533 12.2612L23.5507 9.71289C24.1498 9.41917 24.1498 8.58084 23.5507 8.28711L13.454 3.33658Z",fill:"white"})),r.createElement("defs",null,r.createElement("linearGradient",{id:"paint0_linear_3061_12579",x1:"12",y1:"11.25",x2:"12",y2:"20.625",gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"white",stopOpacity:"0.32"}),r.createElement("stop",{offset:"1",stopColor:"white"})),r.createElement("linearGradient",{id:"paint1_linear_3061_12579",x1:"12",y1:"11.25",x2:"12",y2:"20.625",gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"white",stopOpacity:"0.32"}),r.createElement("stop",{offset:"1",stopColor:"white"})),r.createElement("linearGradient",{id:"paint2_linear_3061_12579",x1:"12",y1:"11.25",x2:"12",y2:"20.625",gradientUnits:"userSpaceOnUse"},r.createElement("stop",{stopColor:"white",stopOpacity:"0.32"}),r.createElement("stop",{offset:"1",stopColor:"white"})),r.createElement("clipPath",{id:"clip0_3061_12579"},r.createElement("rect",{width:"24",height:"24",fill:"white"})))),eF=r.memo(e=>{let{ref:t,...n}=e;return r.createElement(e$,{...n,ref:t},eT)}),eR=(0,o.i7)`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`,eM=(0,o.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,eO=o.Ay.div`
  animation: ${eM} 0.3s ease-out;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
  width: 346px;
  border-radius: 12px;
  background: ${ef.ONy};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px); // Leave some space from viewport edges
`,e_=o.Ay.div`
  overflow-y: auto;
`,eN=(0,o.Ay)(eP.VP).attrs({gap:10})`
  padding: 22px 32px;
  color: ${ef.UU9};
  background: ${ef.$yM};
  position: relative;

  &:after {
    transition: all 0.24s ease-in-out;
    content: "";
    position: absolute;
    inset: 0;
    background: ${ef.MhJ};
    opacity: ${e=>{let{$done:t}=e;return t?.7:0}};
    border-radius: 12px;
  }

  & > svg {
    animation: ${eM} 0.3s ease-out forwards;
    opacity: 0;
    animation-delay: 0.5s;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    font-size: 32px;
    color: ${ef.ONy};
    z-index: 1;
  }
`,eB=(0,o.Ay)(eC.H5)`
  animation: ${eM} 0.3s ease-out;
  color: white;
  white-space: pre-line;
`,eD=o.Ay.div`
  animation: ${eM} 0.3s ease-out;
  line-height: 24px;
  padding: 8px 0 4px 0;
  white-space: pre-line;
`,eH=(0,o.Ay)(eP.fI).attrs({gap:16})`
  align-items: center;
`,ez=o.Ay.div`
  font-size: 12px;
  line-height: 28px;
  min-width: 24px;
  text-align: right;
`,eL=o.Ay.div`
  width: 100%;
  height: 8px;
  background: ${ef.MhJ};
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
`;function eU(e){let{dispatch:t,panelOpen:n,currentStep:i,flowOutline:l,onCancel:o}=e,{title:s,description:c}=i,d=l.filter(e=>e.done).length,u=l.length||1,p=d/u,{refs:m,floatingStyles:g}=(0,a.we)({placement:"left-end",strategy:"fixed",middleware:[(0,eS.cY)(32),(0,eS.BN)({padding:16,boundary:document.body})],whileElementsMounted:(e,n,a)=>{(0,ek.ll)(e,n,a);let r=i.activeElements.find(e=>e.highlighted);if(!r?.selector)return()=>{};let l=document.querySelector(r?.selector??"");if(!l)return()=>{};let o=()=>{(function(e,t){let n=e.getBoundingClientRect(),a=t.getBoundingClientRect();return!(n.right<a.left||n.left>a.right||n.bottom<a.top||n.top>a.bottom)})(n,l)&&t({type:"TourFlow/PanelToggled"})};return requestAnimationFrame(o),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}}}),y=n&&null!=p,f=i.isFlowComplete&&!i.actions.length;return r.createElement("div",{style:{position:"absolute",bottom:64,right:64,zIndex:1e4},"data-panel":!0},r.createElement(eO,{style:g,ref:m.setFloating,"data-testid":"tour-panel"},r.createElement(eN,{$done:f},r.createElement(eY,{onClick:o,"aria-label":"Close Tour"}),r.createElement(eB,{key:s},s),r.createElement(eD,{key:c},c),y?r.createElement(eH,null,r.createElement(eL,{$fraction:p}),r.createElement(ez,null,d,"/",u)):null,0===i.actions.length?r.createElement(eG,{onClick:()=>t({type:"TourFlow/PanelToggled"})},n?r.createElement(ew.K,null):r.createElement(eA.v,null)):null,f?r.createElement(eI.y,null):null),r.createElement(e_,null,r.createElement(eV,{open:!!i.actions.length},i.actions.map(e=>r.createElement(eW,{onClick:()=>t(e.onClick),key:e.title},e.title))),r.createElement(eV,{open:!i.actions.length&&n},l.map((e,t)=>r.createElement(eq,{key:t,$active:e.highlight},e.title,e.required?null:r.createElement(eC.P,null,"* Optional"),e.done?r.createElement(eI.y,null):ej))))),r.createElement(eF,{ref:m.setReference}))}let eV=(0,o.Ay)(e=>{let t=r.useRef(null);return r.useEffect(()=>{t.current&&(e.open?t.current.style.maxHeight=t.current.scrollHeight+"px":t.current.style.maxHeight="0")},[e.open]),r.createElement("div",{...e,ref:t})})`
  color: ${ef.ONy};
  background: ${ef.c3n};
  transition: max-height 0.24s ease-in-out;
  overflow: hidden;
  flex-shrink: 0;
`,eq=(0,o.Ay)(eC.H6)`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 32px;
  line-height: 24px;
  color: ${ef.ydb};
  font-weight: 400;
  font-size: 15px;
  transition: all 0.24s ease-out;
  svg {
    margin-left: auto;
    font-size: 16px;
    animation: ${eR} 0.3s ease-out;
  }
  ${e=>{let{$active:t}=e;return t&&`
      color: ${ef.ONy};
      font-size: 14px;
      font-weight: 600;
    `}}
`,ej=r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8ZM10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z",fill:"currentColor"})),eW=(0,o.Ay)(eq).attrs({as:"button"})`
  background: none;
  width: 100%;
  color: ${ef.ONy};
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background: ${ef.PdT};
  }
  &:focus {
    background: ${ef.PdT};
  }
  &:active {
    background: ${ef.MhJ};
  }
`,eG=o.Ay.button.attrs({type:"button","aria-label":"Collapse Tour Panel"})`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${ef.ONy};
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
    background: linear-gradient(to bottom, ${ef.PdT}00, ${ef.o_k}40);
  }
`,eY=(0,o.Ay)(eP.Jn).attrs({size:"s",mode:"color"})`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
`,eQ=(0,o.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,eJ=(0,o.Ay)(eP.fI)`
  animation: ${eQ} 0.3s ease-in-out;
  gap: 10px;
  position: absolute;
  background: ${ef.$yM};
  padding: 22px 32px;
  border-radius: 12px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
  color: ${ef.ONy};
  z-index: 3;
`,eZ=(0,o.Ay)(eC.P)`
  font-size: 16px;
  font-weight: 600;
  color: ${ef.ONy};
  white-space: pre-line;
`,eX=(0,o.Ay)(eC.P)`
  font-size: 14px;
  font-weight: 400;
  color: ${ef.ONy};
  white-space: pre-line;
`;function eK(e){let{tooltip:t,dispatch:n}=e,{anchoredSelector:i,title:l,description:o}=t,s=r.useRef(null),{refs:c,floatingStyles:d,context:u}=(0,a.we)({elements:{reference:document.querySelector(i)},middleware:[(0,eS.cY)(32),(0,eS.RK)({padding:16}),(0,eS.BN)({padding:16,boundary:document.body,crossAxis:!0,mainAxis:!0}),(0,eS.UE)({element:s})],placement:"bottom",whileElementsMounted:ek.ll}),p=t.action?.onClick;return r.createElement(eJ,{style:d,ref:c.setFloating},r.createElement(eP.VP,{gap:10,style:{maxWidth:"620px"}},r.createElement(eZ,null,l),o&&r.createElement(eX,null,o),p?r.createElement(eP.fI,{style:{margin:"8px 0"}},r.createElement(eP.$n,{size:"l",text:"Next",onClick:()=>n(p),variant:"outlined",mode:"color",round:!0})):null),r.createElement(a.ie,{ref:s,context:u,fill:ef.$yM}))}function e0(e,t){let n=eg(e);switch(t.type){case"TourFlow/Canceled":return["TourFinished",[(0,l.u4)({name:"onboarding.tour.skip",properties:{reason:"completed"}})]];case"TourFlow/FlowSelected":{let a=n[e.flowIndex];if(!a)return[e,[]];let r=n.findIndex(e=>e.id===t.flowId),i=[...e.completedFlowIds,a.id];return[{...e,flowIndex:r,stepIndex:0,completedFlowIds:i},[]]}case"TourFlow/NextStepClicked":{let t=n[e.flowIndex??0]??n[0],a=e6(e),r=e6(e={...e,stepIndex:e.stepIndex+1});if(r?.id.startsWith("builder-test-run-complete")&&"panel"===r.type&&r.activeElements.length>0&&(e={...e,panelOpen:!1}),!r){let n=[...e.completedFlowIds,t.id];r=e6(e={...e,flowIndex:e.flowIndex+1,stepIndex:0,completedFlowIds:n})}let i=e3(a,r);if(!r)return i.push((0,l.u4)({name:"onboarding.tour.completed"})),["TourFinished",i];return[e,i]}case"TourFlow/PreviousStepClicked":{if(e.stepIndex>0)return[{...e,stepIndex:e.stepIndex-1},[]];let t=n[e.flowIndex-1];if(!t)return[e,[]];return[{...e,flowIndex:e.flowIndex-1,stepIndex:t.steps.length-1,completedFlowIds:e.completedFlowIds.filter(e=>e!==t.id)},[]]}case"TourFlow/ExternalLinkClicked":{let n=async()=>void window.open(t.link,"_blank");return[{...e,isWaitingFocus:!0},[n]]}case"TourFlow/BackdropClicked":return[e,[async()=>{document.querySelector("[data-tour-highlight]")?.classList.add("highlight-pulse"),setTimeout(()=>{document.querySelector("[data-tour-highlight]")?.classList.remove("highlight-pulse")},600)}]];case"TourFlow/PanelToggled":return[{...e,panelOpen:!e.panelOpen},[]]}}function e1(e){let{state:t,step:n,dispatch:l}=e,{context:o,refs:c}=(0,a.we)(),d=eg(t),u=d[t.flowIndex];e2(n,l),r.useEffect(()=>{},[l]);let p="panel"===n.type||"tooltip"===n.type?n.activeElements:[];return r.createElement(a.XF,null,r.createElement(a.s3,{context:o,modal:!0},r.createElement(s,{"data-tracking-context":"onboarding-tour",onClick:()=>l({type:"TourFlow/BackdropClicked"}),ref:c.setFloating},r.createElement(i.T,{style:{position:"relative"},$noAnimation:!0,"data-testid":"tour-portal"},p?.map((e,t)=>r.createElement(ev,{key:`${e.selector}-${t}`,selector:e.selector,highlighted:e.highlighted,onClick:()=>e.onClick&&l(e.onClick),customClassNames:e.customClassNames||[]})),(()=>{switch(n.type){case"panel":return r.createElement(eU,{key:n.id,currentStep:n,panelOpen:t.panelOpen,dispatch:l,onCancel:()=>l({type:"App/TourFlowCanceled",reason:"skipped"}),flowOutline:d.map(e=>({title:e.title,highlight:e.id===u?.id,done:t.completedFlowIds.includes(e.id)||!!(e?.steps.includes(n)&&n.isFlowComplete),required:e.required}))});case"tooltip":return r.createElement(eK,{key:n.id,tooltip:n,dispatch:l});case"sequence":return null}})()))))}let e2=(e,t)=>{r.useEffect(()=>{if(!e.scrollElement)return;let t=document.querySelector(e.scrollElement.selector);t instanceof HTMLElement&&t?.scrollIntoView({block:e.scrollElement.behavior,behavior:"smooth"})},[e.id,e.scrollElement]),r.useEffect(()=>{if(!e.autoNextDelay)return;let n=setTimeout(()=>t({type:"TourFlow/NextStepClicked"}),e.autoNextDelay);return()=>clearTimeout(n)},[e.autoNextDelay,t,e.id])},e4=e=>{if(!e)return null;switch(e.type){case"panel":case"tooltip":{let{id:t,title:n,description:a}=e;return{id:t,title:n,description:a}}case"sequence":return null}},e3=(e,t)=>{let n=[],a=e4(e);a&&n.push((0,l.u4)({name:"onboarding.tour.stepCompleted",properties:a}));let r=e4(t);return r&&n.push((0,l.u4)({name:"onboarding.tour.stepShown",properties:r})),n},e6=e=>{if(!e)return null;let t=eg(e)[e.flowIndex];return t?.steps[e.stepIndex]??null}},54538:(e,t,n)=>{n.d(t,{XI:()=>f,ue:()=>p,YK:()=>h,Ff:()=>g,rO:()=>u,xd:()=>x,EG:()=>E,It:()=>m});var a=n(38792),r=n.n(a),i=n(14744),l=n(117),o=n(93510),s=n(19431),c=n(50278),d=n(80389);let u=(e,t)=>({text:"Show in Studio",onClick:{type:"App/PlaybookClicked",pbId:e,from:t}}),p={page:0,loading:!1,personal:null,team:[]},m=(e,t)=>{let n=("team"===t.space?e.team:e.personal)??[],a=n.find(e=>{let{legacyId:n}=e;return n===t.legacyId})?n.map(e=>t.legacyId!==e.legacyId?e:t):[t,...n];return{...e,[t.space]:a}},g=(e,t)=>{let n=t.playbooksState,a=e=>({...t,playbooksState:{...n,...e}}),r=e=>a(m(n,e));switch(e.type){case"Playbooks/AutobookToggled":{let n=t.config.featureFlags.v4MiniEnabled?"Agent":"Autobook",a=[s.$.success(`${e.activated?e.pending?"Activating":"Activated":"Deactivated"} ${n}`)];return[{...r(e.pb),notifications:a},[]]}case"Playbooks/FetchRequested":{let e=t.appWindowState.explorerPageSelected;if(!(0,c.jx)(e))return[t,[]];let n=o.Xt(t,0,e=>y({type:"Playbooks/Fetched",...e}));return[a({page:0,loading:!0}),[(0,l.Z3)(n,300)]]}case"Playbooks/Fetched":{let{query:n,playbooks:r,view:i}=e;if(n!==b(t).query)return[t,[]];return[a({[i]:r,loading:!1}),[]]}case"Playbooks/FetchMoreRequested":return[t,[o.Xt(t,n.page+1,e=>y({type:"Playbooks/FetchedMore",...e}))]];case"Playbooks/FetchedMore":{let{view:t,playbooks:r}=e,i=[...n[t]??[],...r];return[a({page:n.page+1,[t]:i}),[]]}case"Playbooks/DeleteRequested":{let{pb:n}=e;return[{...t,appWindowState:{...t.appWindowState,explorerHighlightedPb:null}},[o.b3(n,y({type:"Playbooks/Deleted",pb:n}))]]}case"Playbooks/Deleted":{let{legacyId:t}=e.pb;return[{...a(x(n,e=>e.legacyId===t?null:e)),modal:d.$h},[]]}case"Playbooks/RenameRequested":{let n=o.iO(e.pb,e=>y({type:"Playbooks/Renamed",pb:e}));return[t,[n]]}case"Playbooks/Renamed":{let t=[u(e.pb.id,"my")],n=[s.$.success("Renamed successfully",{actions:t})];return[{...r(e.pb),modal:{type:"None"},notifications:n},[]]}case"Playbooks/DuplicateRequested":return[t,[o.VT(e.pb,t=>y({type:"Playbooks/Duplicated",pb:e.pb,newPb:t}))]];case"Playbooks/Duplicated":{let{space:r}=e.newPb,i=null===t.appWindowState.automationsSelectedFolderId;if(i){if("personal"!==r&&"team"!==r)return[t,[]];let i=function(e,t,n){let a=e.indexOf(n);return -1===a?[t,...e]:[...e.slice(0,a+1),t,...e.slice(a+1)]}(n[r]??[],e.newPb,e.pb);t=a({[r]:i})}return[{...t,modal:{type:"None"},notifications:[s.$.success("Duplicated successfully",{actions:i?[]:[{text:"View in My Playbooks",onClick:{type:"AppWindowAction",action:{type:"AppWindow/ExplorerNavigated",page:"team"===r?"team":"personal",folderId:void 0}}}]})]},[]]}case"Playbooks/PinRequested":{let n=o.Zs(e.pb,e=>y({type:"Playbooks/Pinned",pb:{...e,space:"personal",favorite:!0}}));return[t,[n]]}case"Playbooks/Pinned":return[{...r(e.pb),notifications:[s.$.success("Added to My Space",{actions:[u(e.pb.id,"my")]})]},[]];case"Playbooks/Updated":return[r(e.pb),[]];case"Playbooks/ConfigurationResetRequested":{let n=o.PO(e.pb.id,e=>y({type:"Playbooks/ConfigurationReset",pb:e}));return[t,[n]]}case"Playbooks/ConfigurationReset":return[{...r(e.pb),notifications:[s.$.success("Configuration has been reset")]},[]];case"Playbooks/MoveToSpaceRequested":{let{type:n,...a}=e,r=o.ec(e.pbId,e.space,e=>y({type:"Playbooks/MovedToSpace",...a,pb:e}));return[t,[r]]}case"Playbooks/MovedToSpace":{let{pb:t,space:r}=e,i="team"===r?"personal":"team";return[{...a({[i]:n[i]?.filter(e=>t.legacyId!==e.legacyId)??[],[r]:[...n[r]??[],t]}),notifications:[s.$.success(e.message||`Moved to ${e.spaceName}`,{actions:[u(t.id,"my")]})]},[]]}case"Playbooks/MoveToFolderRequested":{let{pbId:n,folderId:a}=e,r=o.uD(n,a,()=>y({type:"Playbooks/MovedToFolder",pbId:n,folderId:a}));return[t,[r]]}case"Playbooks/MovedToFolder":{let{pbId:r}=e,i=t.appWindowState.explorerPageSelected;if(!(0,c.jx)(i))return[t,[]];let l=s.$.success("Moved to folder",{actions:[u(r,"my")]}),o=n[i]?.filter(e=>r!==e.id);return[{...a({[i]:o}),notifications:[l]},[]]}default:(0,i.HB)(e)}},y=e=>({type:"PlaybooksAction",action:e}),f=y,h=(e,t)=>{let{query:n,sorting:a,page:i}=b(e);if(!(0,c.jx)(i))return!1;let l=b(t);return!e.playbooksState.personal&&!e.playbooksState.loading||i!==l.page||n!==l.query||!r()(a,l.sorting)||e.appWindowState.automationsSelectedFolderId!==t.appWindowState.automationsSelectedFolderId},b=e=>({page:e.appWindowState.explorerPageSelected,query:e.appWindowState.automationsQuery,sorting:e.config.settings?.playbookSorting??o.xy}),x=(e,t)=>({...e,personal:v(e.personal,t),team:v(e.team,t)}),E=(e,t)=>x(e,e=>e.legacyId!==t.autobookId?e:{...e,triggerStatus:t});function v(e,t){let n=!1,a=e?.flatMap(e=>{let a=t(e);return n||=a!==e,a?[a]:[]});return n?a??[]:e}},94949:(e,t,n)=>{n.d(t,{L:()=>a,W:()=>r});let a=(e,t,n)=>e?.email!==t.email&&n,r=(e,t,n)=>e?.email!==t.email&&n},42014:(e,t,n)=>{n.d(t,{Gm:()=>l,JF:()=>o,Qz:()=>s});var a=n(14041),r=n(59750);let i=a.createContext([]),l=()=>a.useContext(i),o=e=>{let{children:t,suggestions:n}=e;return a.createElement(i.Provider,{value:n},t)},s=()=>{let e=(0,r.j)();return a.useCallback((t,n)=>{e({type:"BuilderV2Action",action:{type:"PreviousActions/Requested",statementIndex:t,typeHint:n}})},[e])}},66712:(e,t,n)=>{n.d(t,{S:()=>l,k:()=>i});var a=n(14041);let r=a.createContext({allowAskMeEveryTime:!0,playbookArgs:[],statementIndex:0,onRevalidatePlaybook:()=>{},onPlaybookArgChange:()=>{},onPlaybookArgReset:()=>{},onPlaybookArgCreate:()=>{},onPlaybookArgEditClicked:()=>{}}),i=()=>a.useContext(r),l=e=>{let{children:t,value:n}=e;return a.createElement(r.Provider,{value:n},t)}},11778:(e,t,n)=>{n.d(t,{E:()=>r,c:()=>i});var a=n(14041);let r=a.createContext(null);function i(){return a.useContext(r)}},58756:(e,t,n)=>{n.d(t,{H:()=>i,o:()=>r});var a=n(14041);let r=a.createContext({styleInsertionPoint:document.head,get portalInsertionPoint(){return document.querySelector("#bardeen-popup")??document.body},documentRoot:document.body}),i=()=>a.useContext(r).portalInsertionPoint},42048:(e,t,n)=>{n.d(t,{f:()=>r});var a=n(36213);class r extends a.F_{static #e=this.nameTemplate="Engine:InvalidMatchPattern";static #t=this.is=e=>a.F_.is(e,r.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,r.nameTemplate);constructor(e={}){super(r.nameTemplate,"Invalid website pattern",{userHint:'Please enter a valid website pattern. Examples: "https://google.com/*", "https://*.github.com/*", "*://example.com/path"',...e})}}},63711:(e,t,n)=>{n.d(t,{_T:()=>r,HJ:()=>i,Qt:()=>l});var a=n(36213);class r extends a.F_{static #e=this.nameTemplate="Engine:EngineReconnectBootError";static #t=this.is=e=>a.F_.is(e,r.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,r.nameTemplate);constructor(e={}){super(r.nameTemplate,"Failed to reconnect to the Bardeen runtime",{userHint:"The Bardeen runtime failed to restart from sleep. Please refresh this page and try again.",...e})}}class i extends a.F_{static #e=this.nameTemplate="Engine:FailedToCopyToClipboard";static #t=this.is=e=>a.F_.is(e,i.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,i.nameTemplate);constructor(e={}){super(i.nameTemplate,"Failed to copy to clipboard",{userHint:"Please copy manually.",...e})}}class l extends a.F_{static #e=this.nameTemplate="Engine:IntegrationActivationFailed";static #t=this.is=e=>a.F_.is(e,l.nameTemplate);static #n=this.isExact=e=>a.F_.isExact(e,l.nameTemplate);constructor(e={}){super(l.nameTemplate,"Failed to connect the application, please try again.",{trackError:!1,...e})}}n(42048)},48143:(e,t,n)=>{n.d(t,{rD:()=>d.r,jL:()=>d.j,d7:()=>s.d,Rv:()=>o.R,TJ:()=>a.TJ,th:()=>a.th,JZ:()=>l.J,Jm:()=>r.J,Mj:()=>c.M,op:()=>p,c5:()=>i.c});var a=n(51134),r=n(86920),i=n(1265),l=n(72134);n(19585);var o=n(98290),s=n(14166),c=n(84845),d=n(59750);n(29717),n(18782);var u=n(49861);function p(){let{subscription:e,teamConfig:t}=(0,d.r)(),n=t?.isAdmin??!1;return u.qB(e,n)}n(65274)},75162:(e,t,n)=>{n.d(t,{p:()=>r});var a=n(14041);function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{targetHeight:t=964,minZoom:n=.75,enabled:r=!0}=e;(0,a.useEffect)(()=>{if(!r)return;let e=document.querySelector("#bardeen-popup");if(!e)return;let a=()=>{let a=Math.min(Math.max(window.innerHeight/t,n),1);e.style.zoom=a.toString()};return a(),window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a),e.style.zoom=""}},[t,n,r])}},51134:(e,t,n)=>{n.d(t,{TJ:()=>o,sL:()=>c,th:()=>l});var a=n(14041),r=n(58756);let i=e=>t=>{let n=t.toLowerCase().split("+");return Object.values({alt:e.altKey===(n.includes("alt")||n.includes("option")),ctrl:e.ctrlKey===n.includes("ctrl"),meta:e.metaKey===n.includes("meta"),shift:e.shiftKey===n.includes("shift")}).every(e=>e)&&n.includes(e.code.toLowerCase())};function l(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"keydown",l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=a.useContext(r.o),s=(0,a.useCallback)(n=>{(0===t.length||t.some(i(n)))&&e(n)},[e,t]);(0,a.useEffect)(()=>{if(!(l.length>0))return o.documentRoot.addEventListener(n,s,!0),()=>{o.documentRoot.removeEventListener(n,s,!0)}},[]),(0,a.useEffect)(()=>{if(0!==l.length)return o.documentRoot.addEventListener(n,s,!0),()=>{o.documentRoot.removeEventListener(n,s,!0)}},[o,t,n,l,s])}function o(e){return a.useCallback(t=>{let n=e[t.key];n&&(t.stopPropagation(),t.preventDefault(),n(t))},[e])}let s=["INPUT","TEXTAREA","SELECT","OPTION"],c=e=>e.target instanceof HTMLElement&&(e.target instanceof HTMLInputElement?d.includes(e.target.type):!!e.target.isContentEditable||s.includes(e.target.tagName)),d=["date","datetime-local","email","month","number","password","range","search","tel","text","time","url","week"]},86920:(e,t,n)=>{n.d(t,{J:()=>r});var a=n(14041);function r(e,t){(0,a.useEffect)(()=>{let n=new IntersectionObserver(e=>{e[0]?.isIntersecting&&t()});return e.current&&n.observe(e.current),()=>n.disconnect()},[e,t])}},1265:(e,t,n)=>{n.d(t,{R:()=>i,c:()=>r});var a=n(14041);function r(e,t){let n=(0,a.useCallback)(e=>{let[n]=e;return t(!!n?.isIntersecting)},[t]),r=(0,a.useRef)(null);(0,a.useEffect)(()=>(r.current=new IntersectionObserver(n),e.current&&r.current.observe(e.current),()=>{t(!1),r.current?.disconnect()}),[e,n,t])}let i=(e,t)=>{(0,a.useEffect)(()=>{if(!e.current)return;let n=new IntersectionObserver(e=>{let[a]=e;a?.isIntersecting&&(t(),n.disconnect())});return n.observe(e.current),()=>n.disconnect()},[e])}},6717:(e,t,n)=>{n.d(t,{H:()=>s});var a=n(14041);let r=e=>"tagName"in Object(e),i=e=>/input/i.test(e.tagName),l=e=>e.ariaLabel||e.tagName.match(/label/i)&&e.textContent||e.title||(e.tagName.match(/button/i)||"button"===e.role)&&e.textContent||i(e)&&e.labels?.[0]?.textContent||"placeholder"in e&&String(e.placeholder)||null,o=[];function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;return a.useCallback(n=>{if(!r(n.target)||function e(t){return!!r(t)&&(null!==t.getAttribute("data-tracking-ignore")||e(r(t.parentNode)?t.parentNode:null))}(n.target))return;let a=function e(t){return l(t)?t:r(t.parentNode)?e(t.parentNode):null}(n.target);if(!a)return;let i=a.querySelector("[type=checkbox]"),o=[...function e(t,n){if(!r(n))return t;let a=n.getAttribute("data-tracking-context");return e(a?[a,...t]:t,n.parentNode)}([],a),l(a),...i?[!i?.checked]:[]].join(" - ");if(!t.some(e=>new RegExp(e).test(o)))return requestAnimationFrame(()=>e(o))},[e,t])}},21714:(e,t,n)=>{n.d(t,{Am:()=>l,RG:()=>r,rX:()=>i});var a=n(14041);function r(e,t){let n=document.createElementNS("http://www.w3.org/1999/xhtml","a");n.style.display="none",n.href=URL.createObjectURL(e),n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(n.href),n.parentNode?.removeChild(n)},0)}function i(e){return a.isValidElement(e)}n(61578),n(14886);let l=e=>[...new Set(e)]},117:(e,t,n)=>{function a(e){return t=>Object.assign(n=>t({...n,dispatch:t=>n.dispatch(e(t))}),{displayName:String(t.displayName??t.name)})}n.d(t,{sf:()=>s.s,Z3:()=>i,rF:()=>l,zy:()=>a,WO:()=>o.W,i8:()=>c.i8});let r={};function i(e,t){if(0===t)return e;async function n(n){return new Promise((a,i)=>{let l=window.setTimeout(()=>e(n).catch(i).finally(a),t);r[e.name]={timeout:l,resolve:a}})}return clearTimeout(r[e.name]?.timeout),r[e.name]?.resolve(),n.displayName=`debounce(${e.name}, 300)`,n}function l(e,t){return async n=>{await new Promise(e=>setTimeout(e,t)),await e(n)}}var o=n(96054),s=n(66505),c=n(99658)},66505:(e,t,n)=>{n.d(t,{s:()=>i});var a=n(49170),r=n(36213);function i(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];let l=t=>{let{onData:i,onDone:l,onError:o}=t;return async function(t){let{api:s,dispatch:c}=t;try{let t=!1;for await(let r of a.F(s,e)(...n)){let[e,n]=i(r);if(n&&c(n),!e){t=!0;break}}let r=!t&&l();r&&c(r)}catch(t){let e=o(r.sF.from(t));e&&c(e)}}};return l.displayName=e,l}}}]);
//# debugId=d06ea8f3-80f4-5d64-bcac-70f77e91ddee
