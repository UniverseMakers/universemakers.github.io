(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Zn=Symbol.for("yaml.alias"),qn=Symbol.for("yaml.document"),et=Symbol.for("yaml.map"),Ys=Symbol.for("yaml.pair"),He=Symbol.for("yaml.scalar"),Et=Symbol.for("yaml.seq"),Pe=Symbol.for("yaml.node.type"),ot=n=>!!n&&typeof n=="object"&&n[Pe]===Zn,fn=n=>!!n&&typeof n=="object"&&n[Pe]===qn,jt=n=>!!n&&typeof n=="object"&&n[Pe]===et,re=n=>!!n&&typeof n=="object"&&n[Pe]===Ys,z=n=>!!n&&typeof n=="object"&&n[Pe]===He,qt=n=>!!n&&typeof n=="object"&&n[Pe]===Et;function ie(n){if(n&&typeof n=="object")switch(n[Pe]){case et:case Et:return!0}return!1}function ae(n){if(n&&typeof n=="object")switch(n[Pe]){case Zn:case et:case He:case Et:return!0}return!1}const Gs=n=>(z(n)||ie(n))&&!!n.anchor,st=Symbol("break visit"),_a=Symbol("skip children"),Bt=Symbol("remove node");function It(n,e){const t=Sa(e);fn(n)?gt(null,n.contents,t,Object.freeze([n]))===Bt&&(n.contents=null):gt(null,n,t,Object.freeze([]))}It.BREAK=st;It.SKIP=_a;It.REMOVE=Bt;function gt(n,e,t,s){const i=ka(n,e,t,s);if(ae(i)||re(i))return Ea(n,s,i),gt(n,i,t,s);if(typeof i!="symbol"){if(ie(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=gt(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===st)return st;r===Bt&&(e.items.splice(a,1),a-=1)}}}else if(re(e)){s=Object.freeze(s.concat(e));const a=gt("key",e.key,t,s);if(a===st)return st;a===Bt&&(e.key=null);const r=gt("value",e.value,t,s);if(r===st)return st;r===Bt&&(e.value=null)}}return i}function Sa(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function ka(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(jt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(qt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(re(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(z(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(ot(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function Ea(n,e,t){const s=e[e.length-1];if(ie(s))s.items[n]=t;else if(re(s))n==="key"?s.key=t:s.value=t;else if(fn(s))s.contents=t;else{const i=ot(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Ia={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Na=n=>n.replace(/[!,[\]{}]/g,e=>Ia[e]);class we{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},we.defaultYaml,e),this.tags=Object.assign({},we.defaultTags,t)}clone(){const e=new we(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new we(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:we.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},we.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:we.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},we.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Na(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&ae(e.contents)){const a={};It(e.contents,(r,o)=>{ae(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}we.defaultYaml={explicit:!1,version:"1.2"};we.defaultTags={"!!":"tag:yaml.org,2002:"};function zs(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Js(n){const e=new Set;return It(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Qs(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function La(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Js(n));const r=Qs(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(z(r.node)||ie(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function yt(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=yt(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=yt(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=yt(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=yt(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Oe(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Oe(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Gs(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class es{constructor(e){Object.defineProperty(this,Pe,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!fn(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Oe(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?yt(a,{"":o},"",o):o}}class ts extends es{constructor(e){super(Zn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],It(e,{Node:(a,r)=>{(ot(r)||Gs(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Oe(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=nn(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(zs(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function nn(n,e,t){if(ot(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(ie(e)){let s=0;for(const i of e.items){const a=nn(n,i,t);a>s&&(s=a)}return s}else if(re(e)){const s=nn(n,e.key,t),i=nn(n,e.value,t);return Math.max(s,i)}return 1}const Xs=n=>!n||typeof n!="function"&&typeof n!="object";class x extends es{constructor(e){super(He),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Oe(this.value,e,t)}toString(){return String(this.value)}}x.BLOCK_FOLDED="BLOCK_FOLDED";x.BLOCK_LITERAL="BLOCK_LITERAL";x.PLAIN="PLAIN";x.QUOTE_DOUBLE="QUOTE_DOUBLE";x.QUOTE_SINGLE="QUOTE_SINGLE";const Aa="tag:yaml.org,2002:";function Ca(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Vt(n,e,t){var f,h,m;if(fn(n)&&(n=n.contents),ae(n))return n;if(re(n)){const b=(h=(f=t.schema[et]).createNode)==null?void 0:h.call(f,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new ts(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Aa+e.slice(2));let c=Ca(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new x(n);return l&&(l.node=b),b}c=n instanceof Map?r[et]:Symbol.iterator in Object(n)?r[Et]:r[et]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((m=c==null?void 0:c.nodeClass)==null?void 0:m.from)=="function"?c.nodeClass.from(t.schema,n,t):new x(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function on(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Vt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Rt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Zs extends es{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>ae(s)||re(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Rt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(ie(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,on(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(ie(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&z(a)?a.value:a:ie(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!re(t))return!1;const s=t.value;return s==null||e&&z(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return ie(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(ie(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,on(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Ta=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function We(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const it=(n,e,t)=>n.endsWith(`
`)?We(t,e):t.includes(`
`)?`
`+We(t,e):(n.endsWith(" ")?"":" ")+t,ei="flow",Kn="block",sn="quoted";function hn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):f=i-s);let h,m,b=!1,p=-1,g=-1,_=-1;t===Kn&&(p=Es(n,p,e.length),p!==-1&&(f=p+l));for(let N;N=n[p+=1];){if(t===sn&&N==="\\"){switch(g=p,n[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}_=p}if(N===`
`)t===Kn&&(p=Es(n,p,e.length)),f=p+e.length+l,h=void 0;else{if(N===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const E=n[p+1];E&&E!==" "&&E!==`
`&&E!=="	"&&(h=p)}if(p>=f)if(h)c.push(h),f=h+l,h=void 0;else if(t===sn){for(;m===" "||m==="	";)m=N,N=n[p+=1],b=!0;const E=p>_+1?p-2:g-1;if(u[E])return n;c.push(E),u[E]=!0,f=E+l,h=void 0}else b=!0}m=N}if(b&&o&&o(),c.length===0)return n;r&&r();let v=n.slice(0,c[0]);for(let N=0;N<c.length;++N){const E=c[N],k=c[N+1]||n.length;E===0?v=`
${e}${n.slice(0,k)}`:(t===sn&&u[E]&&(v+=`${n[E]}\\`),v+=`
${e}${n.slice(E+1,k)}`)}return v}function Es(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const mn=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),pn=n=>/^(%|---|\.\.\.)/m.test(n);function Ma(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Ft(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(pn(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:hn(r,a,sn,mn(e,!1))}function Wn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Ft(n,e);const t=e.indent||(pn(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:hn(s,t,ei,mn(e,!1))}function bt(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Ft;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Wn:a&&!i?s=Ft:s=t?Wn:Ft}return s(n,e)}let Yn;try{Yn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Yn=/\n+(?!\n|$)/g}function an({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return bt(t,s);const c=s.indent||(s.forceBlockIndent||pn(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===x.BLOCK_FOLDED?!1:e===x.BLOCK_LITERAL?!0:!Ma(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,h;for(h=t.length;h>0;--h){const k=t[h-1];if(k!==`
`&&k!=="	"&&k!==" ")break}let m=t.substring(h);const b=m.indexOf(`
`);b===-1?f="-":t===m||b!==m.length-1?(f="+",a&&a()):f="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(Yn,`$&${c}`));let p=!1,g,_=-1;for(g=0;g<t.length;++g){const k=t[g];if(k===" ")p=!0;else if(k===`
`)_=g;else break}let v=t.substring(0,_<g?_+1:g);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${c}`));let E=(p?c?"2":"1":"")+f;if(n&&(E+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const k=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let y=!1;const I=mn(s,!0);r!=="folded"&&e!==x.BLOCK_FOLDED&&(I.onOverflow=()=>{y=!0});const S=hn(`${v}${k}${m}`,c,Kn,I);if(!y)return`>${E}
${c}${S}`}return t=t.replace(/\n+/g,`$&${c}`),`|${E}
${c}${v}${t}${m}`}function Oa(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return bt(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?bt(a,e):an(n,e,t,s);if(!o&&!u&&i!==x.PLAIN&&a.includes(`
`))return an(n,e,t,s);if(pn(a)){if(l==="")return e.forceBlockIndent=!0,an(n,e,t,s);if(o&&l===c)return bt(a,e)}const f=a.replace(/\n+/g,`$&
${l}`);if(r){const h=p=>{var g;return p.default&&p.tag!=="tag:yaml.org,2002:str"&&((g=p.test)==null?void 0:g.test(f))},{compat:m,tags:b}=e.doc.schema;if(b.some(h)||m!=null&&m.some(h))return bt(a,e)}return o?f:hn(f,l,ei,mn(e,!1))}function ns(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==x.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=x.QUOTE_DOUBLE);const l=u=>{switch(u){case x.BLOCK_FOLDED:case x.BLOCK_LITERAL:return i||a?bt(r.value,e):an(r,e,t,s);case x.QUOTE_DOUBLE:return Ft(r.value,e);case x.QUOTE_SINGLE:return Wn(r.value,e);case x.PLAIN:return Oa(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:f}=e.options,h=i&&u||f;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}function ti(n,e){const t=Object.assign({blockQuote:!0,commentString:Ta,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Pa(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(z(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function xa(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(z(n)||ie(n))&&n.anchor;a&&zs(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function St(n,e,t,s){var l;if(re(n))return n.toString(e,t,s);if(ot(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=ae(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Pa(e.doc.schema.tags,a));const r=xa(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):z(a)?ns(a,e,t,s):a.toString(e,t,s);return r?z(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ra({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t;let h=ae(n)&&n.comment||null;if(f){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(ie(n)||!ae(n)&&typeof n=="object"){const I="With simple keys, collection cannot be used as a key value";throw new Error(I)}}let m=!f&&(!n||h&&e==null&&!t.inFlow||ie(n)||(z(n)?n.type===x.BLOCK_FOLDED||n.type===x.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(f||!a),indent:o+l});let b=!1,p=!1,g=St(n,t,()=>b=!0,()=>p=!0);if(!m&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!f||e==null&&m)return g=`? ${g}`,h&&!b?g+=it(g,t.indent,c(h)):p&&i&&i(),g;b&&(h=null),m?(h&&(g+=it(g,t.indent,c(h))),g=`? ${g}
${o}:`):(g=`${g}:`,h&&(g+=it(g,t.indent,c(h))));let _,v,N;ae(e)?(_=!!e.spaceBefore,v=e.commentBefore,N=e.comment):(_=!1,v=null,N=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!h&&z(e)&&(t.indentAtStart=g.length+1),p=!1,!u&&l.length>=2&&!t.inFlow&&!m&&qt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let E=!1;const k=St(e,t,()=>E=!0,()=>p=!0);let y=" ";if(h||_||v){if(y=_?`
`:"",v){const I=c(v);y+=`
${We(I,t.indent)}`}k===""&&!t.inFlow?y===`
`&&N&&(y=`

`):y+=`
${t.indent}`}else if(!m&&ie(e)){const I=k[0],S=k.indexOf(`
`),M=S!==-1,B=t.inFlow??e.flow??e.items.length===0;if(M||!B){let O=!1;if(M&&(I==="&"||I==="!")){let D=k.indexOf(" ");I==="&"&&D!==-1&&D<S&&k[D+1]==="!"&&(D=k.indexOf(" ",D+1)),(D===-1||S<D)&&(O=!0)}O||(y=`
${t.indent}`)}}else(k===""||k[0]===`
`)&&(y="");return g+=y+k,t.inFlow?E&&s&&s():N&&!E?g+=it(g,t.indent,c(N)):p&&i&&i(),g}function ni(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Jt="<<",Ge={identify:n=>n===Jt||typeof n=="symbol"&&n.description===Jt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new x(Symbol(Jt)),{addToJSMap:si}),stringify:()=>Jt},$a=(n,e)=>(Ge.identify(e)||z(e)&&(!e.type||e.type===x.PLAIN)&&Ge.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Ge.tag&&t.default));function si(n,e,t){if(t=n&&ot(t)?t.resolve(n.doc):t,qt(t))for(const s of t.items)Ln(n,e,s);else if(Array.isArray(t))for(const s of t)Ln(n,e,s);else Ln(n,e,t)}function Ln(n,e,t){const s=n&&ot(t)?t.resolve(n.doc):t;if(!jt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function ii(n,e,{key:t,value:s}){if(ae(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if($a(n,t))si(n,e,s);else{const i=Oe(t,"",n);if(e instanceof Map)e.set(i,Oe(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Ba(t,i,n),r=Oe(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Ba(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(ae(n)&&(t!=null&&t.doc)){const s=ti(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),ni(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function ss(n,e,t){const s=Vt(n,void 0,t),i=Vt(e,void 0,t);return new ve(s,i)}class ve{constructor(e,t=null){Object.defineProperty(this,Pe,{value:Ys}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return ae(t)&&(t=t.clone(e)),ae(s)&&(s=s.clone(e)),new ve(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return ii(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ra(this,e,t,s):JSON.stringify(this)}}function ai(n,e,t){return(e.inFlow??n.flow?Va:Fa)(n,e,t)}function Fa({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const h=[];for(let b=0;b<e.length;++b){const p=e[b];let g=null;if(ae(p))!f&&p.spaceBefore&&h.push(""),ln(t,h,p.commentBefore,f),p.comment&&(g=p.comment);else if(re(p)){const v=ae(p.key)?p.key:null;v&&(!f&&v.spaceBefore&&h.push(""),ln(t,h,v.commentBefore,f))}f=!1;let _=St(p,u,()=>g=null,()=>f=!0);g&&(_+=it(_,a,c(g))),f&&g&&(f=!1),h.push(s+_)}let m;if(h.length===0)m=i.start+i.end;else{m=h[0];for(let b=1;b<h.length;++b){const p=h[b];m+=p?`
${l}${p}`:`
`}}return n?(m+=`
`+We(c(n),l),o&&o()):f&&r&&r(),m}function Va({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const f=[];for(let b=0;b<n.length;++b){const p=n[b];let g=null;if(ae(p))p.spaceBefore&&f.push(""),ln(e,f,p.commentBefore,!1),p.comment&&(g=p.comment);else if(re(p)){const v=ae(p.key)?p.key:null;v&&(v.spaceBefore&&f.push(""),ln(e,f,v.commentBefore,!1),v.comment&&(c=!0));const N=ae(p.value)?p.value:null;N?(N.comment&&(g=N.comment),N.commentBefore&&(c=!0)):p.value==null&&(v!=null&&v.comment)&&(g=v.comment)}g&&(c=!0);let _=St(p,l,()=>g=null);c||(c=f.length>u||_.includes(`
`)),b<n.length-1?_+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=f.reduce((v,N)=>v+N.length+2,2)+(_.length+2)>e.options.lineWidth)),c&&(_+=",")),g&&(_+=it(_,s,o(g))),f.push(_),u=f.length}const{start:h,end:m}=t;if(f.length===0)return h+m;if(!c){const b=f.reduce((p,g)=>p+g.length+2,2);c=e.options.lineWidth>0&&b>e.options.lineWidth}if(c){let b=h;for(const p of f)b+=p?`
${a}${i}${p}`:`
`;return`${b}
${i}${m}`}else return`${h}${r}${f.join(" ")}${r}${m}`}function ln({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=We(e(s),n);t.push(a.trimStart())}}function at(n,e){const t=z(e)?e.value:e;for(const s of n)if(re(s)&&(s.key===e||s.key===t||z(s.key)&&s.key.value===t))return s}class Me extends Zs{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(et,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(ss(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;re(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ve(e,e==null?void 0:e.value):s=new ve(e.key,e.value);const i=at(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);z(i.value)&&Xs(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=at(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=at(this.items,e),i=s==null?void 0:s.value;return(!t&&z(i)?i.value:i)??void 0}has(e){return!!at(this.items,e)}set(e,t){this.add(new ve(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)ii(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!re(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ai(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const Nt={collection:"map",default:!0,nodeClass:Me,tag:"tag:yaml.org,2002:map",resolve(n,e){return jt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Me.from(n,e,t)};class rt extends Zs{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Et,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Qt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Qt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&z(i)?i.value:i}has(e){const t=Qt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Qt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];z(i)&&Xs(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Oe(a,String(i++),t));return s}toString(e,t,s){return e?ai(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(Vt(o,void 0,s))}}return a}}function Qt(n){let e=z(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Lt={collection:"seq",default:!0,nodeClass:rt,tag:"tag:yaml.org,2002:seq",resolve(n,e){return qt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>rt.from(n,e,t)},gn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),ns(n,e,t,s)}},yn={identify:n=>n==null,createNode:()=>new x(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new x(null),stringify:({source:n},e)=>typeof n=="string"&&yn.test.test(n)?n:e.options.nullStr},is={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new x(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&is.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Fe({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const ri={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Fe},oi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Fe(n)}},li={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new x(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Fe},bn=n=>typeof n=="bigint"||Number.isInteger(n),as=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function ci(n,e,t){const{value:s}=n;return bn(s)&&s>=0?t+s.toString(e):Fe(n)}const ui={identify:n=>bn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>as(n,2,8,t),stringify:n=>ci(n,8,"0o")},di={identify:bn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>as(n,0,10,t),stringify:Fe},fi={identify:n=>bn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>as(n,2,16,t),stringify:n=>ci(n,16,"0x")},Ua=[Nt,Lt,gn,yn,is,ui,di,fi,ri,oi,li];function Is(n){return typeof n=="bigint"||Number.isInteger(n)}const Xt=({value:n})=>JSON.stringify(n),Da=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Xt},{identify:n=>n==null,createNode:()=>new x(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Xt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Xt},{identify:Is,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Is(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Xt}],Ha={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},ja=[Nt,Lt].concat(Da,Ha),rs={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=x.BLOCK_LITERAL),e!==x.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let f=0,h=0;f<c;++f,h+=l)u[f]=o.substr(h,l);o=u.join(e===x.BLOCK_LITERAL?`
`:" ")}return ns({comment:n,type:e,value:o},s,i,a)}};function hi(n,e){if(qt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!re(s)){if(jt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ve(new x(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=re(s)?s:new ve(s)}}else e("Expected a sequence for this tag");return n}function mi(n,e,t){const{replacer:s}=t,i=new rt(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(ss(o,l,t))}return i}const os={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:hi,createNode:mi};class vt extends rt{constructor(){super(),this.add=Me.prototype.add.bind(this),this.delete=Me.prototype.delete.bind(this),this.get=Me.prototype.get.bind(this),this.has=Me.prototype.has.bind(this),this.set=Me.prototype.set.bind(this),this.tag=vt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(re(i)?(a=Oe(i.key,"",t),r=Oe(i.value,a,t)):a=Oe(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=mi(e,t,s),a=new this;return a.items=i.items,a}}vt.tag="tag:yaml.org,2002:omap";const ls={collection:"seq",identify:n=>n instanceof Map,nodeClass:vt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=hi(n,e),s=[];for(const{key:i}of t.items)z(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new vt,t)},createNode:(n,e,t)=>vt.from(n,e,t)};function pi({value:n,source:e},t){return e&&(n?gi:yi).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const gi={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new x(!0),stringify:pi},yi={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new x(!1),stringify:pi},qa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Fe},Ka={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Fe(n)}},Wa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new x(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Fe},Kt=n=>typeof n=="bigint"||Number.isInteger(n);function wn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function cs(n,e,t){const{value:s}=n;if(Kt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Fe(n)}const Ya={identify:Kt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>wn(n,2,2,t),stringify:n=>cs(n,2,"0b")},Ga={identify:Kt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>wn(n,1,8,t),stringify:n=>cs(n,8,"0")},za={identify:Kt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>wn(n,0,10,t),stringify:Fe},Ja={identify:Kt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>wn(n,2,16,t),stringify:n=>cs(n,16,"0x")};class _t extends Me{constructor(e){super(e),this.tag=_t.tag}add(e){let t;re(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ve(e.key,null):t=new ve(e,null),at(this.items,t.key)||this.items.push(t)}get(e,t){const s=at(this.items,e);return!t&&re(s)?z(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=at(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ve(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(ss(r,null,s));return a}}_t.tag="tag:yaml.org,2002:set";const us={collection:"map",identify:n=>n instanceof Set,nodeClass:_t,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>_t.from(n,e,t),resolve(n,e){if(jt(n)){if(n.hasAllNullValues(!0))return Object.assign(new _t,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function ds(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function bi(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Fe(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const wi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>ds(n,t),stringify:bi},vi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>ds(n,!1),stringify:bi},vn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(vn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let f=ds(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Ns=[Nt,Lt,gn,yn,gi,yi,Ya,Ga,za,Ja,qa,Ka,Wa,rs,Ge,ls,os,us,wi,vi,vn],Ls=new Map([["core",Ua],["failsafe",[Nt,Lt,gn]],["json",ja],["yaml11",Ns],["yaml-1.1",Ns]]),As={binary:rs,bool:is,float:li,floatExp:oi,floatNaN:ri,floatTime:vi,int:di,intHex:fi,intOct:ui,intTime:wi,map:Nt,merge:Ge,null:yn,omap:ls,pairs:os,seq:Lt,set:us,timestamp:vn},Qa={"tag:yaml.org,2002:binary":rs,"tag:yaml.org,2002:merge":Ge,"tag:yaml.org,2002:omap":ls,"tag:yaml.org,2002:pairs":os,"tag:yaml.org,2002:set":us,"tag:yaml.org,2002:timestamp":vn};function An(n,e,t){const s=Ls.get(e);if(s&&!n)return t&&!s.includes(Ge)?s.concat(Ge):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Ls.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Ge)),i.reduce((a,r)=>{const o=typeof r=="string"?As[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(As).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const Xa=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class fs{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?An(e,"compat"):e?An(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?Qa:{},this.tags=An(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,et,{value:Nt}),Object.defineProperty(this,He,{value:gn}),Object.defineProperty(this,Et,{value:Lt}),this.sortMapEntries=typeof r=="function"?r:r===!0?Xa:null}clone(){const e=Object.create(fs.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Za(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=ti(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(We(c,""))}let r=!1,o=null;if(n.contents){if(ae(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(We(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=St(n.contents,i,()=>o=null,c);o&&(u+=it(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(St(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(We(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(We(a(c),"")))}return t.join(`
`)+`
`}class _n{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Pe,{value:qn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new we({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(_n.prototype,{[Pe]:{value:qn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=ae(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){ft(this.contents)&&this.contents.add(e)}addIn(e,t){ft(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Js(this);e.anchor=!t||s.has(t)?Qs(t||"a",s):t}return new ts(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=v=>typeof v=="number"||v instanceof String||v instanceof Number,_=t.filter(g).map(String);_.length>0&&(t=t.concat(_)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:f,setAnchors:h,sourceObjects:m}=La(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},p=Vt(e,u,b);return o&&ie(p)&&(p.flow=!0),h(),p}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ve(i,a)}delete(e){return ft(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Rt(e)?this.contents==null?!1:(this.contents=null,!0):ft(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return ie(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Rt(e)?!t&&z(this.contents)?this.contents.value:this.contents:ie(this.contents)?this.contents.getIn(e,t):void 0}has(e){return ie(this.contents)?this.contents.has(e):!1}hasIn(e){return Rt(e)?this.contents!==void 0:ie(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=on(this.schema,[e],t):ft(this.contents)&&this.contents.set(e,t)}setIn(e,t){Rt(e)?this.contents=t:this.contents==null?this.contents=on(this.schema,Array.from(e),t):ft(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new we({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new we({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new fs(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Oe(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?yt(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Za(this,e)}}function ft(n){if(ie(n))return!0;throw new Error("Expected a YAML collection as document contents")}class _i extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class $t extends _i{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class er extends _i{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Cs=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function kt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,f="",h="",m=!1,b=!1,p=null,g=null,_=null,v=null,N=null,E=null,k=null;for(const S of n)switch(b&&(S.type!=="space"&&S.type!=="newline"&&S.type!=="comma"&&a(S.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),p&&(c&&S.type!=="comment"&&S.type!=="newline"&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),p=null),S.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&S.source.includes("	")&&(p=S),u=!0;break;case"comment":{u||a(S,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const M=S.source.substring(1)||" ";f?f+=h+M:f=M,h="",c=!1;break}case"newline":c?f?f+=S.source:(!E||t!=="seq-item-ind")&&(l=!0):h+=S.source,c=!0,m=!0,(g||_)&&(v=S),u=!0;break;case"anchor":g&&a(S,"MULTIPLE_ANCHORS","A node can have at most one anchor"),S.source.endsWith(":")&&a(S.offset+S.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=S,k??(k=S.offset),c=!1,u=!1,b=!0;break;case"tag":{_&&a(S,"MULTIPLE_TAGS","A node can have at most one tag"),_=S,k??(k=S.offset),c=!1,u=!1,b=!0;break}case t:(g||_)&&a(S,"BAD_PROP_ORDER",`Anchors and tags must be after the ${S.source} indicator`),E&&a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.source} in ${e??"collection"}`),E=S,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){N&&a(S,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),N=S,c=!1,u=!1;break}default:a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.type} token`),c=!1,u=!1}const y=n[n.length-1],I=y?y.offset+y.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),p&&(c&&p.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:N,found:E,spaceBefore:l,comment:f,hasNewline:m,anchor:g,tag:_,newlineAfterProp:v,end:I,start:k??I}}function Ut(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Ut(e.key)||Ut(e.value))return!0}return!1;default:return!0}}function Gn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Ut(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Si(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||z(a)&&z(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Ts="All mapping items must start at the same column";function tr({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Me,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:h,key:m,sep:b,value:p}=f,g=kt(h,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),_=!g.found;if(_){if(m&&(m.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(l,"BAD_INDENT",Ts)),!g.anchor&&!g.tag&&!b){c=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||Ut(m))&&i(m??h[h.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Ts);t.atKey=!0;const v=g.end,N=m?n(t,m,g,i):e(t,v,h,null,g,i);t.schema.compat&&Gn(s.indent,m,i),t.atKey=!1,Si(t,o.items,N)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const E=kt(b??[],{indicator:"map-value-ind",next:p,offset:N.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(l=E.end,E.found){_&&((p==null?void 0:p.type)==="block-map"&&!E.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<E.found.offset-1024&&i(N.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const k=p?n(t,p,E,i):e(t,l,b,null,E,i);t.schema.compat&&Gn(s.indent,p,i),l=k.range[2];const y=new ve(N,k);t.options.keepSourceTokens&&(y.srcToken=f),o.items.push(y)}else{_&&i(N.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),E.comment&&(N.comment?N.comment+=`
`+E.comment:N.comment=E.comment);const k=new ve(N);t.options.keepSourceTokens&&(k.srcToken=f),o.items.push(k)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function nr({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??rt,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:f}of s.items){const h=kt(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||f)(f==null?void 0:f.type)==="block-seq"?i(h.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(o.comment=h.comment);continue}const m=f?n(t,f,h,i):e(t,h.end,u,null,h,i);t.schema.compat&&Gn(s.indent,f,i),l=m.range[2],o.items.push(m)}return o.range=[s.offset,l,c??l],o}function Wt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Cn="Block collections are not allowed within flow collections",Tn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function sr({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?Me:rt),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let _=0;_<s.items.length;++_){const v=s.items[_],{start:N,key:E,sep:k,value:y}=v,I=kt(N,{flow:o,indicator:"explicit-key-ind",next:E??(k==null?void 0:k[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!I.found){if(!I.anchor&&!I.tag&&!k&&!y){_===0&&I.comma?i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):_<s.items.length-1&&i(I.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),I.comment&&(c.comment?c.comment+=`
`+I.comment:c.comment=I.comment),f=I.end;continue}!r&&t.options.strict&&Ut(E)&&i(E,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(_===0)I.comma&&i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(I.comma||i(I.start,"MISSING_CHAR",`Missing , between ${o} items`),I.comment){let S="";e:for(const M of N)switch(M.type){case"comma":case"space":break;case"comment":S=M.source.substring(1);break e;default:break e}if(S){let M=c.items[c.items.length-1];re(M)&&(M=M.value??M.key),M.comment?M.comment+=`
`+S:M.comment=S,I.comment=I.comment.substring(S.length+1)}}if(!r&&!k&&!I.found){const S=y?n(t,y,I,i):e(t,I.end,k,null,I,i);c.items.push(S),f=S.range[2],Tn(y)&&i(S.range,"BLOCK_IN_FLOW",Cn)}else{t.atKey=!0;const S=I.end,M=E?n(t,E,I,i):e(t,S,N,null,I,i);Tn(E)&&i(M.range,"BLOCK_IN_FLOW",Cn),t.atKey=!1;const B=kt(k??[],{flow:o,indicator:"map-value-ind",next:y,offset:M.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(B.found){if(!r&&!I.found&&t.options.strict){if(k)for(const F of k){if(F===B.found)break;if(F.type==="newline"){i(F,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}I.start<B.found.offset-1024&&i(B.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else y&&("source"in y&&((g=y.source)==null?void 0:g[0])===":"?i(y,"MISSING_CHAR",`Missing space after : in ${o}`):i(B.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const O=y?n(t,y,B,i):B.found?e(t,B.end,k,null,B,i):null;O?Tn(y)&&i(O.range,"BLOCK_IN_FLOW",Cn):B.comment&&(M.comment?M.comment+=`
`+B.comment:M.comment=B.comment);const D=new ve(M,O);if(t.options.keepSourceTokens&&(D.srcToken=v),r){const F=c;Si(t,F.items,M)&&i(S,"DUPLICATE_KEY","Map keys must be unique"),F.items.push(D)}else{const F=new Me(t.schema);F.flow=!0,F.items.push(D);const J=(O??M).range;F.range=[M.range[0],J[1],J[2]],c.items.push(F)}f=O?O.range[2]:B.end}}const h=r?"}":"]",[m,...b]=s.end;let p=f;if((m==null?void 0:m.source)===h)p=m.offset+m.source.length;else{const _=o[0].toUpperCase()+o.substring(1),v=u?`${_} must end with a ${h}`:`${_} in block collection must be sufficiently indented and end with a ${h}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",v),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const _=Wt(b,p,t.options.strict,i);_.comment&&(c.comment?c.comment+=`
`+_.comment:c.comment=_.comment),c.range=[s.offset,p,_.offset]}else c.range=[s.offset,p,p];return c}function Mn(n,e,t,s,i,a){const r=t.type==="block-map"?tr(n,e,t,s,a):t.type==="block-seq"?nr(n,e,t,s,a):sr(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function ir(n,e,t,s,i){var h;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,p=m&&a?m.offset>a.offset?m:a:m??a;p&&(!b||b.offset<p.offset)&&i(p,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Me.tagName&&o==="map"||r===rt.tagName&&o==="seq")return Mn(n,e,t,i,r);let l=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!l){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),l=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Mn(n,e,t,i,r)}const c=Mn(n,e,t,i,r,l),u=((h=l.resolve)==null?void 0:h.call(l,c,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??c,f=ae(u)?u:new x(u);return f.range=c.range,f.tag=r,l!=null&&l.format&&(f.format=l.format),f}function ar(n,e,t){const s=e.offset,i=rr(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?x.BLOCK_FOLDED:x.BLOCK_LITERAL,r=e.source?or(e.source):[];let o=r.length;for(let p=r.length-1;p>=0;--p){const g=r[p][1];if(g===""||g==="\r")o=p;else break}if(o===0){const p=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:p,type:a,comment:i.comment,range:[s,g,g]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let p=0;p<o;++p){const[g,_]=r[p];if(_===""||_==="\r")i.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=g.length),u=p,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+_.length+1}for(let p=r.length-1;p>=o;--p)r[p][0].length>l&&(o=p+1);let f="",h="",m=!1;for(let p=0;p<u;++p)f+=r[p][0].slice(l)+`
`;for(let p=u;p<o;++p){let[g,_]=r[p];c+=g.length+_.length+1;const v=_[_.length-1]==="\r";if(v&&(_=_.slice(0,-1)),_&&g.length<l){const E=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-_.length-(v?2:1),"BAD_INDENT",E),g=""}a===x.BLOCK_LITERAL?(f+=h+g.slice(l)+_,h=`
`):g.length>l||_[0]==="	"?(h===" "?h=`
`:!m&&h===`
`&&(h=`

`),f+=h+g.slice(l)+_,h=`
`,m=!0):_===""?h===`
`?f+=`
`:h=`
`:(f+=h+_,h=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let p=o;p<r.length;++p)f+=`
`+r[p][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}const b=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,b,b]}}function rr({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let h=1;h<i.length;++h){const m=i[h];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:l===-1&&(l=n+h)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let h=1;h<e.length;++h){const m=e[h];switch(m.type){case"space":c=!0;case"newline":f+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),f+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const p=m.source;p&&typeof p=="string"&&(f+=p.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function or(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function lr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(h,m,b)=>t(s+h,m,b);switch(i){case"scalar":o=x.PLAIN,l=cr(a,c);break;case"single-quoted-scalar":o=x.QUOTE_SINGLE,l=ur(a,c);break;case"double-quoted-scalar":o=x.QUOTE_DOUBLE,l=dr(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Wt(r,u,e,t);return{value:l,type:o,comment:f.comment,range:[s,u,f.offset]}}function cr(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),ki(n)}function ur(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),ki(n.slice(1,-1)).replace(/''/g,"'")}function ki(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function dr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=fr(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=hr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=mr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function fr(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const hr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function mr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Ei(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?ar(n,e,s):lr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[He]:l?c=pr(n.schema,i,l,t,s):e.type==="scalar"?c=gr(n,i,e,s):c=n.schema[He];let u;try{const f=c.resolve(i,h=>s(t??e,"TAG_RESOLVE_FAILED",h),n.options);u=z(f)?f:new x(f)}catch(f){const h=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",h),u=new x(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function pr(n,e,t,s,i){var o;if(t==="!")return n[He];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[He])}function gr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[He];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[He];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function yr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const br={composeNode:Ii,composeEmptyNode:hs};function Ii(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=wr(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Ei(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=ir(br,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(f){const h=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",h)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return c??(c=hs(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!z(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function hs(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:yr(e,t,s),indent:-1,source:""},f=Ei(n,u,o,c);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=l),f}function wr({options:n},{offset:e,source:t,end:s},i){const a=new ts(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Wt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function vr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new _n(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=kt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Ii(c,i,u,r):hs(c,u.end,s,null,u,r);const f=l.contents.range[2],h=Wt(a,f,!1,r);return h.comment&&(l.comment=h.comment),l.range=[t,f,h.offset],l}function Mt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ms(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class _r{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Mt(t);a?this.warnings.push(new er(r,s,i)):this.errors.push(new $t(r,s,i))},this.directives=new we({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ms(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(ie(a)&&!a.flow&&a.items.length>0){let r=a.items[0];re(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ms(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Mt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=vr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new $t(Mt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new $t(Mt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Wt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new $t(Mt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new _n(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Ni="\uFEFF",Li="",Ai="",zn="";function Sr(n){switch(n){case Ni:return"byte-order-mark";case Li:return"doc-mode";case Ai:return"flow-error-end";case zn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Re(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Os=new Set("0123456789ABCDEFabcdef"),kr=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Zt=new Set(",[]{}"),Er=new Set(` ,[]{}
\r	`),On=n=>!n||Er.has(n);class Ir{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Re(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Ni&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Li,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Re(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Re(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Re(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(On),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Re(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Ai,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(On),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Re(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Re(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield zn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Re(a)||e&&Zt.has(a))break;t=s}else if(Re(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Zt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Zt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield zn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(On))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Re(t)||e&&Zt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Re(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(kr.has(t))t=this.buffer[++e];else if(t==="%"&&Os.has(this.buffer[e+1])&&Os.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Nr{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Xe(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Ps(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ci(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function en(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function ht(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function xs(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Xe(e.start,"explicit-key-ind")&&!Xe(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ci(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Lr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Ir,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Sr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&xs(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Ps(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Ps(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=en(this.peek(2)),s=ht(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Xe(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ci(t.key)&&!Xe(t.sep,"newline")){const o=ht(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Xe(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=ht(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Xe(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Xe(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Xe(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=en(s),a=ht(i);xs(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=en(e),s=ht(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=en(e),s=ht(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Ar(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Nr||null,prettyErrors:e}}function Cr(n,e={}){const{lineCounter:t,prettyErrors:s}=Ar(e),i=new Lr(t==null?void 0:t.addNewLine),a=new _r(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new $t(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Cs(n,t)),r.warnings.forEach(Cs(n,t))),r}function ze(n,e,t){let s;const i=Cr(n,t);if(!i)return null;if(i.warnings.forEach(a=>ni(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Tr=`# Simulation family catalog source-of-truth.
#
# Each top-level key is one simulation family shown in the UI.
# Parameter definitions live in \`parameter-info.yaml\`.
# Display stat configuration lives in \`summary-stats-config.yaml\`.
#
# \`views\`
#   Optional display-mode video tabs.
#   - \`id\` must match a view key in the generated run manifest
#   - \`label\` renders text in the switcher
#   - \`icon\` can be used instead of text when a theme wants glyph-first tabs

planetary:
  label: Planetary
  placeholderImage: assets/planetary-parameter-overlay.webp
  parameterSubtitle: Set up your collision scenario to explore how varied the outcomes of giant impacts can be.  What parameters lead to the formation of a Moon like ours, a debris disk from which it could grow, or something dramatically different?
  views:
    - id: houdini
      label: Cinematic render
      icon: icon_houdini
      audio: false
      description: |-
        View the data of your simulated impact, rendered in 3D, as rock and iron get pushed and shocked by immense pressure, and pulled and disrupted by strong gravity.

        The colour, glow, and opacity of the visualised material are set directly by the simulation data.  Although, if we could see a real impact this close up, there would be a lot more thick dust making it harder to see than what is shown here.
    - id: material
      label: Material
      icon: icon_material
      audio: false
      description: See how materials mix at this planetary scale, with a cut-away view of your impact simulation.  The material is coloured to show the target-planet's metal core in purple, its rocky mantle in orange, the impactor's core in blue, and its mantle in yellow.
    - id: temperature
      label: Temperature
      icon: icon_temperature
      audio: false
      description: See how hot a planet gets when shocked and rocked by a giant impact, with a cut-away view of your impact simulation, and the material coloured to show the temperature.

galaxy:
  label: Galaxy
  placeholderImage: assets/galaxy_example.webp
  parameterSubtitle: Discover how brighter and fainter galaxies are shaped by their local neighbourhood. Can you make a spiral galaxy, an elliptical galaxy and an irregular galaxy?
  views:
    - id: hst
      label: Hubble Space Telescope
      icon: hubble-space-telescope
      audio: true
      description: See your galaxy as the Hubble Space Telescope would — a luminous swirl of billions of stars.  Brighter regions trace where the most stars were born while dark lanes mark the dust (complex molecules and tiny grains) that blocks starlight.
    - id: turntable
      label: 360 View
      icon: turntable
      description: A rotating view of the galaxy at the present day, showing the final state you created from every angle.
    - id: sph_plus_hst
      label: Large Scale Structure
      icon: large-scale-structure
      audio: true
      description: Zoom out to see the grand architecture of your galaxy — vast streams of gas funnelling in to sustain the galaxy's star formation along the hidden skeleton of dark matter that holds everything together.
    - id: line_trace
      label: Sonification
      icon: line-trace
      audio: true
      description: The sounds you are hearing denote different processes. This tab allows you to follow the sonification as it happens.  The harp-like notes denote the intensity of star formation, the wind-like sound maps to energy flowing out of the galaxy, and the Geiger-counter clicks indicate periods of strong supermassive black hole accretion.

cosmos:
  label: Cosmos
  placeholderImage: assets/cosmos_example.webp
  parameterSubtitle: Adjust the fundamental laws of the Universe and see how matter evolves from the beginning of time.  What parameters best explain the Universe we observe?
  views:
    - id: gas_density
      label: Gas Density
      icon: gas-density
      description: The density of gas in the Universe.  Gas collapses onto the cosmic web as it cools and succumbs to gravity.  Bright knots are galaxy clusters and groups, the wispy threads are filaments of gas stretching between them, and the dark empty patches are vast cosmic voids separating them.
    - id: gas_temperature
      label: Gas Temperature
      icon: gas-temperature
      description: The temperature of the gas in the Universe.  As gas collapses onto the cosmic web, it heats up but also cools as it radiates energy away.  This cooling is imperitive for the formation of galaxies and stars, which can only form in cold, dense gas.  However, once stars form they begin to heat the surrounding gas suppresing local star formation while supermassive black holes super heats gas as it falls into the black hole and ejects energy back into the surrounding gas on the largest scales.  These are the massive bubbles seen in the gas temperature view.
    - id: dark_matter_density
      label: Dark Matter
      icon: dark-matter
      description: The invisible scaffolding of the cosmos.  Dark matter outweighs ordinary matter five to one in our Universe — you can't see it, but without it, galaxies like ours would never have formed.
    - id: gas_metallicity_plus_stellar_density
      label: Metals + Stars
      icon: metals-stars
      description: See uncountably many stars be born and die across the age of the Universe.  This view combines the light of stars with the heavy elements they forge (oxygen, carbon, iron, etc.). These heavy elements are sprayed back into space by supernova explosions to seed the next generation of stars and continue the cycle that eventually leads to the formation of planets and life.
`,Mr=`# Parameter definitions for each simulation family.
#
# Each top-level key is a simulation family. Parameters are keyed by id
# and define the range, step, and display formatting used by the
# parameter editor sliders in the selection overlay.
#
# Slider starting values are randomized in app code rather than authored here.
#
# \`description\` fields appear in a popover when the user clicks the info
# button next to a parameter name.

planetary:
  impactor_mass:
    label: Impactor Mass
    description: How big was the object that smashed into the young Earth?  A more massive impactor could spray out more debris — and perhaps result in a bigger Moon.
    unit: Earth masses
    min: 0.01
    max: 0.35
    step: 0.01
    primary: false
  impactor_velocity:
    label: Impact Speed
    description: How fast was the impactor traveling when it hit?  Faster collisions are more violent, ejecting more and hotter debris.
    unit: km/s
    min: 6.7
    max: 31
    step: 0.1
    primary: false
  impactor_angle:
    label: Impact Angle
    description: Was the impact head-on, or grazing at a high angle?  A direct hit blasts material straight out, while a sideswipe can spray the debris out into a disk, or even escape as a hit and run.
    unit: °
    min: 0
    max: 65
    step: 1
    primary: true

galaxy:
  crowding:
    label: Neighbourhood
    description: Are you making a galaxy that stays far away from others, is part of a group of galaxies, or joins a huge cluster of galaxies? Merging with other galaxies is more common in a more crowded neighbourhood.
    quali_labels:
      - lonely
      - sparse
      - bustling
      - crowded
    display_format: qualitative
    min: -0.5
    max: 3.5
    primary: true
  mass_rank:
    label: Luminosity
    description: How bright is the galaxy you're making? Brighter galaxies usually have more stars, are bigger and are more massive.
    quali_labels:
      - faintest
      - fainter
      - faint
      - bright
      - brighter
      - brightest
    display_format: qualitative
    min: -0.5
    max: 5.5
    primary: true

cosmos:
  baryon_fraction:
    label: Baryon Fraction
    description: How much of the Universe is made of ordinary "stuff" — the atoms that form stars, planets, and you?  Turn this up and there's more gas to make galaxies; turn it down and dark matter dominates.
    unit: ''
    min: 0.10
    max: 4
    step: 0.01
    value_scale: 0.159
    primary: true
  black_hole_strength:
    label: Black Hole Strength
    description: How powerfully do black holes push back?  As gas spirals inward it heats to millions of degrees and then some.  Some of that energy blasts back out as fierce winds or jets, shutting down star formation across entire galaxies.
    unit: 'K'
    min: 0.01
    max: 50.0
    step: 0.01
    value_scale: 8.80e7
    display_format: compact
    display_significant_figures: 3
    log_scale: true
    primary: true
  gravity_strength:
    label: Gravity
    description: What if gravity were stronger — or weaker?  Turn it up and the cosmic web forms faster, pulling galaxies into tighter clumps.  Turn it down and the Universe stays smoother and emptier for longer.
    unit: m/s²
    min: 0.01
    max: 10
    step: 0.01
    value_scale: 9.81
    display_significant_figures: 2
    log_scale: true
    primary: true
`,Or=`# Summary overlay display configuration for each simulation family.
#
# Each family has four config blocks:
#   resources       — cards shown in the "Resources Used" section
#   results         — bars shown in the "Similarity Results" section
#   simulationStats — cards shown in the "Simulation Stats" section
#   similarityScore — fallback score display when no scientific bars exist
#
# Stat fields:
#   id             — built-in metric key or key in the run's run_summary.yaml
#                    summaryMetrics map
#   label          — override for the card title (falls back to metric label)
#   value          — fallback display value (shown when the metric is missing;
#                    use -- to make absent data obvious)
#   unit           — appended after the formatted value
#   description    — explanatory text shown in a tap-to-open overlay
#   target         — reference value used by result bars for similarity scoring
#   value_scale    — multiply numeric values before formatting for display
#   display_format — \`integer\`, \`float\`, or \`scientific\`
#   precision      — decimal places (float mode only; ignored by compact/scientific)

planetary:
  resources:
    - &resource_runtime
      id: runtime
      value: '--'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run.  Calculating how everything moves and affects each other takes a lot of work, even for a supercomputer!
    - &resource_carbon_burnt
      id: carbonBurnt
      value: '--'
      unit: kg CO₂
      display_format: float
      precision: 2
      description: The estimated carbon footprint of this run.  Carbon dioxide is a major driver of climate change, and supercomputer-driven research at this scale has real environmental costs that must be considered when we plan our research.
    - &resource_compute_used
      id: computeUsed
      value: '--'
      description: How much computing time and memory the simulation needed to crunch all that physics. A CPU-hour is one hour of work for a single CPU core, 2 CPU cores working for 2 hours would be 4 CPU-hours. With a supercomputer you can have thousands or tens of thousands of CPU cores working together, so a simulation can take a few hours to run but use tens of thousands of CPU-hours to do it.
  results:
    - id: moon_mass
      label: Moon-forming mass
      target: 1.0
      value: '--'
      unit: Lunar masses
      display_format: float
      precision: 2
      description: How big a moon was formed or could later form by growing out of orbiting debris.
    - id: earth_mass
      label: Planet mass
      target: 1.0
      value: '--'
      unit: Earth masses
      display_format: float
      precision: 2
      description: How big the planet ended up after the impact.
    - id: spin
      label: System spin
      target: 1.0
      value: '--'
      unit: Earth—Moon system
      display_format: float
      precision: 3
      description: The combined 'angular momentum' of the spinning planet and anything in orbit, compared with the real system (3.4×10³⁴ kg m² / s).
  simulationStats:
    - id: similarityScore
      label: Similarity score
      value: '--'
      description: How similar the planet—moon system after this impact would be to ours overall.
    - id: moon_iron_percent
      label: Moon-forming iron
      value: '--'
      unit: '%'
      display_format: float
      precision: 1
      description: The fraction of the moon-forming material that is iron.  Our Moon is mostly rock with a very small iron core, around 2% of its mass.  Typical rocky planets like Earth are around 30% core and 70% mantle.
    - id: proto_earth_in_moon_percent
      label: Moon-forming proto-Earth
      value: '--'
      unit: '%'
      display_format: float
      precision: 1
      description: What fraction of the moon-forming material came from the proto-Earth target rather than the impactor? Analysis of Moon and Earth rocks shows their makeup is very similar, but most impact scenarios struggle to mix together enough material to immediately explain this.
    - id: likelihood
      label: Scenario likelihood
      value: '--'
      unit: ''
      display_format: string
      description: We only have one Moon like ours to study, and it's possible that its formation wasn't very likely!  However, impacts at very low or high angles, or very high speeds, are less likely.  Impacts at very low speeds might not even be possible in reality without something mysterious to slow down the impactor, but that doesn't stop us from simulating what could happen if it did.
  similarityScore:
    value: '--'

galaxy:
  resources:
    - *resource_runtime
    - *resource_carbon_burnt
    - *resource_compute_used
  results:
    - id: crowding
      label: Neighbourhood
      target: 1
      value: '--'
      description: Are you making a galaxy that stays far away from others, is part of a group of galaxies, or joins a huge cluster of galaxies?  Merging with other galaxies is more common in a more crowded neighbourhood.
    - id: mass_rank
      label: Luminosity
      target: 3
      value: '--'
      description: How bright is the galaxy you're making?  Brighter galaxies usually have more stars, are bigger and are more massive.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass
      value: '--'
      unit: Msun
      display_format: compact
      precision: 3
      description: How many stars your galaxy managed to make.  Each solar mass is the weight of our own Sun.
    - id: stellar_size_kpc
      label: Stellar size
      value: '--'
      unit: ly
      value_scale: 3261.56
      display_format: compact
      precision: 2
      description: The size of your galaxy's star-lit disc from one edge to the other.
    - id: galaxy_age
      label: Galaxy age
      value: '--'
      unit: yrs
      value_scale: 1.0e9
      display_format: compact
      description: The average age of the stars in this galaxy.  Older galaxies tend to look redder and smoother, while younger ones are bluer and more chaotic.
    - id: black_hole_mass_msun
      label: Black hole mass
      value: '--'
      unit: Msun
      display_format: compact
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
  similarityScore:
    value: '--'
  morphologyChecklist:
    - id: spiral
      label: Spiral
      description: A rotating disc of stars with graceful spiral arms winding outward from a bright centre.  The Milky Way is a spiral galaxy, and so are most of the large galaxies in our local Universe.
      hint: Spiral galaxies are common and can be found across a wide range in brightness.
    - id: elliptical
      label: Elliptical
      description: A smooth, rounded ball of stars with very little gas or dust.  Elliptical galaxies are often the result of major mergers between two or more galaxies, and they contain mostly older, redder stars.
      hint: Elliptical galaxies are rarer than spirals and irregulars. They are usually brighter and live in more crowded neighbourhoods.
    - id: irregular
      label: Irregular
      description: A galaxy with no clear shape — no spiral arms, no smooth oval.  Irregular galaxies are often smaller, chaotic systems that have been disturbed by interactions, or are still in the early stages of assembling themselves.
      hint: Fainter galaxies often have irregular shapes. Irregular galaxies can also result from collisions between galaxies.

cosmos:
  resources:
    - *resource_runtime
    - *resource_carbon_burnt
    - *resource_compute_used
  results:
    - id: stellar_fraction
      label: Stellar fraction
      target: 0.007851
      value: '--'
      unit: '%'
      value_scale: 100
      display_format: float
      precision: 2
      description: What fraction of your universe's mass ended up locked inside stars.
    - id: average_temperature_kelvin
      label: Average gas temperature
      target: 901647
      value: '--'
      unit: K
      display_format: compact
      description: The average temperature of gas across your universe.  Hotter gas means more energetic feedback from stars and black holes.
    - id: nhalos
      label: Galaxy halos
      target: 1587
      value: '--'
      display_format: integer
      description: How many galaxy-sized dark matter halos (above 10 billion solar masses) your universe managed to build.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass formed
      value: '--'
      unit: Msun
      display_format: compact
      precision: 3
      description: How much star-stuff your universe managed to cook up across all of cosmic history.
    - id: number_of_black_holes
      label: Black holes formed
      value: '--'
      display_format: integer
      description: How many black holes popped into existence over the course of your universe.
    - id: particlesUpdated
      label: Particles updated
      value: '--'
      display_format: integer
      description: The sheer number of moving pieces the simulation had to keep track of every single frame.
  similarityScore:
    value: '--'
`,Pr=`# Live telemetry HUD display configuration for each simulation family.
#
# - \`value\` is the initial/fallback display value
# - \`unit\` is appended by the app
# - \`live: true\` means a CSV stream should provide updates
# - \`live_key\` can override which CSV column should be used
# - \`from_video: true\` means the final value should be pulled from the active
#   video's sidecar metadata YAML
# - \`video_key\` can override which metadata key should be used
# - \`scale_with_time: true\` (when \`live\`) scales the final metadata value
#   linearly by normalized playback time
# - \`value_scale\` multiplies a live numeric value before formatting

planetary:
  liveStats:
    - id: impactor_mass
      value: '0.10'
      unit: Earth masses
      live: false
    - id: impactor_velocity
      value: '12.0'
      unit: km/s
      live: false
    - id: impactor_angle
      value: '45'
      unit: °
      live: false
    - id: time
      value: 0.0
      unit: hours
      label: Time
      live: true
      live_key: time_seconds
      value_scale: 2.777777777777778e-4
    - id: particlesUpdated
      value: '0'
      label: Particle updates
      live: true
      live_key: particlesUpdated
      integer: true

galaxy:
  liveStats:
    - id: redshift
      value: 0.0
      unit: ''
      label: Redshift
      live: true
      live_key: Redshift
    - id: cosmic_time
      value: 0.0
      unit: yrs
      label: Universe Age
      live: true
      live_key: CosmicTime_Gyr
      value_scale: 1.0e9
    - id: stellar_mass
      value: '0'
      unit: Msun
      label: Stellar Mass
      live: true
      live_key: StellarMassWithinR200_Msun
    - id: stellar_size
      value: 0.0
      unit: ly
      label: Stellar Size
      live: true
      live_key: StellarHalfMassRadius_kpc
      value_scale: 3261.56
    - id: black_hole_mass
      value: '0'
      unit: Msun
      label: Black Hole Mass
      live: true
      live_key: BHSubgridMassWithinR200_Msun
    - id: star_formation_rate
      value: 0.0
      unit: Msun/yr
      label: Star Formation Rate
      live: true
      live_key: StarFormationRateWithinR200_Msun_per_yr

cosmos:
  liveStats:
    - id: age
      value: 0.0
      unit: yrs
      live: true
      live_key: age_years
      label: Universe Age
    - id: redshift
      value: 0.0
      unit: ''
      live: true
      label: Redshift
    - id: stellar_mass
      value: '0'
      label: Stellar Mass
      unit: Msun
      live: true
    - id: bh_mass
      value: '0'
      label: Black Hole Mass
      unit: Msun
      live: true
    - id: g_updates_total
      value: '0'
      label: Particle updates
      live: true
      integer: true
`;function X(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}function Ti(n,e,t){const s=n.indexOf("#"),i=s>=0?n.slice(0,s):n,a=s>=0?n.slice(s):"",r=new RegExp(`([?&])${xr(e)}=[^&#]*`);if(r.test(i))return`${i.replace(r,`$1${e}=${encodeURIComponent(t)}`)}${a}`;const o=i.includes("?")?"&":"?";return`${i}${o}${e}=${encodeURIComponent(t)}${a}`}function xr(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const Rr=ze(Tr),$r=ze(Mr),Pn=ze(Or),Br=ze(Pr),mt=Object.entries(Rr).map(([n,e])=>{var r,o,l;const t=Fr(Pn[n]),s=(((r=Pn[n])==null?void 0:r.results)??[]).map(Vr),i=((o=Br[n])==null?void 0:o.liveStats)??[],a=$r[n]??{};return{id:n,label:e.label,placeholderImage:X(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(Jn),liveStats:i.map(Jn),morphologyChecklist:(l=Pn[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const f=u.quali_labels,h=f!==void 0&&f.length>0,m=h?0:u.min,b=h?f.length-1:u.max,p=h?1:u.step??Ur(u.min,u.max),g=h?Math.floor(f.length/2):u.log_scale?Math.sqrt(u.min*u.max):Dr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:m,max:b,step:p,fallbackValue:g,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:f,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Fr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function Jn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Vr(n){return{...Jn(n),target:n.target}}function Ur(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Dr(n,e){return n+(e-n)/2}const Mi="universe-engine-theme",Oi=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Hr(){const n=localStorage.getItem(Mi);return qr(n)?n:"glass"}function xn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Mi,n)}function jr(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Oi){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function qr(n){return Oi.some(e=>e.id===n)}let he=null,$e="primary";function Kr(n,e=null){he={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function Wr(){he=null,$e="primary"}function Yr(n){$e=n}function Gr(n){return n==="local"?{mode:"local",base:null}:he?{mode:$e,base:Pi()}:{mode:"primary",base:null}}function De(n){if(!he)return n;const e=Pi();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!$s(t,he.primaryBase)&&(!he.backupBase||!$s(t,he.backupBase))?n:Bs(e,`${t.pathname}${t.search}${t.hash}`)}return Bs(e,n)}async function Ze(n,e){const t=De(n),s=!!(he!=null&&he.backupBase)&&$e==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Rs(n,e);return a.ok&&($e="backup"),a}catch(i){if(!s)throw i;const a=await Rs(n,e);return a.ok&&($e="backup"),a}}function Pi(){return he?$e==="backup"&&he.backupBase?he.backupBase:he.primaryBase:null}async function Rs(n,e){if(!(he!=null&&he.backupBase))throw new Error("Backup asset host is not configured.");const t=$e;$e="backup";try{const s=await fetch(De(n),e);return s.ok||($e=t),s}catch(s){throw $e=t,s}}function $s(n,e){const t=new URL(e);return n.origin===t.origin}function Bs(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function zr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.crossOrigin="anonymous",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,f=new Map;let h=null,m=null;const b=document.createElement("canvas"),p=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function _(){h&&(URL.revokeObjectURL(h),h=null)}function v(L,T={}){const K=u.get(L);K&&(u.delete(L),T={...T,ownedObjectUrl:!0},L=K),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(L)){s.classList.remove("fade-out");return}const j=s.muted,V=T.seekFraction;_(),m=null,h=T.ownedObjectUrl?L:null,s.src=L,s.load(),s.onloadeddata=()=>{if(s.muted=j,V!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const Z=Math.max(0,Math.min(.999,V));s.currentTime=Z*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),T.autoplay&&s.play().catch(()=>{})}},120)}function N(L){s.muted=L}async function E(){await s.play()}function k(){s.pause()}function y(){s.classList.add("is-empty")}function I(){s.classList.remove("is-empty")}function S(L){if(!Number.isFinite(s.duration)||s.duration<=0)return;const T=Math.max(0,Math.min(1,L));s.currentTime=T*s.duration}function M(){s.currentTime=0,i==null||i(0)}function B(L=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(T=>{const K=()=>{V(),T()},j=window.setTimeout(()=>{V(),T()},Math.max(0,L));function V(){window.clearTimeout(j),s.removeEventListener("loadeddata",K)}s.addEventListener("loadeddata",K,{once:!0})})}function O(L,T=8e3){const K=Math.max(0,L);return K===0||D(K)?Promise.resolve():new Promise(j=>{const V=()=>{D(K)&&($(),j())},Z=window.setTimeout(()=>{$(),j()},Math.max(0,T));function $(){window.clearTimeout(Z),s.removeEventListener("progress",V),s.removeEventListener("canplay",V),s.removeEventListener("loadeddata",V)}s.addEventListener("progress",V),s.addEventListener("canplay",V),s.addEventListener("loadeddata",V),V()})}function D(L){const T=s.currentTime;for(let K=0;K<s.buffered.length;K+=1){const j=s.buffered.start(K),V=s.buffered.end(K);if(!(T<j||T>V))return V-T>=L}return!1}function F(L){o=new Set(L.filter(Boolean).filter(T=>T!==s.currentSrc)),l||te()}function J(){l=!0,U(),_e()}function W(){if(!l){te();return}l=!1,te()}function te(){for(const[L,T]of c.entries())o.has(L)||(T.removeAttribute("src"),T.load(),c.delete(L));for(const[L,T]of f.entries())o.has(L)||(T.abort(),f.delete(L));for(const L of o){if(!c.has(L)){const T=document.createElement("video");T.preload="auto",T.crossOrigin="anonymous",T.muted=!0,T.playsInline=!0,T.src=De(L),T.load(),c.set(L,T)}u.has(L)||f.has(L)||me(L)}}function U(){for(const L of c.values())L.removeAttribute("src"),L.load();c.clear()}function _e(){for(const L of f.values())L.abort();f.clear()}function me(L){const T=new AbortController;f.set(L,T);const K=Ti(L,"_",`${Date.now()}`);Ze(K,{signal:T.signal}).then(async j=>{if(!j.ok)return;const V=await j.blob();o.has(L)&&u.set(L,URL.createObjectURL(V))}).catch(j=>{j instanceof DOMException&&j.name}).finally(()=>{f.get(L)===T&&f.delete(L)})}function Le(){o.clear(),l=!1,U(),_e();for(const L of u.values())URL.revokeObjectURL(L);u.clear()}function Q(L){return u.get(L)??null}function pe(){if(!(!p||s.readyState<2||s.videoWidth===0||s.videoHeight===0)){b.width=s.videoWidth,b.height=s.videoHeight;try{p.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85)}catch{m=null}}}function Se(){return pe(),m}function ke(L){i=L}function oe(L){a=L}return{setSource:v,setMuted:N,play:E,pause:k,hideMedia:y,showMedia:I,seekToFraction:S,resetPlayback:M,waitForLoadedData:B,waitForBufferedAhead:O,onTimeUpdate:ke,onEnded:oe,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:L=>{g=L,s.playbackRate=L},getPlaybackRate:()=>g,onPlayStateChange:L=>{r=L},getElement:()=>t,prewarmSources:F,suspendPrewarming:J,resumePrewarming:W,clearPrewarmedSources:Le,getPrewarmedBlobUrl:Q,captureFrame:Se}}const Jr=[.25,.5,1,2];function Qr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");u.className="timeline";const f=document.createElement("div");f.className="timeline__bar-row";const h=document.createElement("div");h.className="timeline__audio is-hidden";const m=document.createElement("button");m.className="timeline__audio-btn",m.type="button",m.setAttribute("aria-label","Toggle audio mute"),m.innerHTML=Xr(),m.addEventListener("click",()=>r==null?void 0:r()),h.appendChild(m);const b=document.createElement("button");b.className="timeline__play-btn",b.type="button",b.setAttribute("aria-label","Toggle playback"),b.addEventListener("click",()=>s==null?void 0:s());const p=document.createElement("input");p.className="timeline__slider",p.type="range",p.min="0",p.max="1000",p.step="1",p.value="0",p.style.setProperty("--fill","0%"),p.setAttribute("aria-label","Simulation time");const g=document.createElement("div");g.className="timeline__speed";const _=document.createElement("button");_.className="timeline__speed-btn",_.type="button",_.setAttribute("aria-label","Playback speed"),_.addEventListener("click",()=>{g.classList.toggle("open")});const v=document.createElement("div");v.className="timeline__speed-menu";for(const k of Jr){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=Rn(k),y.addEventListener("click",()=>{g.classList.remove("open"),i==null||i(k)}),v.appendChild(y)}g.appendChild(_),g.appendChild(v);const N=document.createElement("button");return N.className="timeline__summary-btn",N.type="button",N.setAttribute("aria-label","View run summary"),N.textContent="ⓘ",N.addEventListener("click",()=>a==null?void 0:a()),f.appendChild(h),f.appendChild(b),f.appendChild(p),f.appendChild(g),f.appendChild(N),p.addEventListener("input",()=>{const k=parseInt(p.value,10)/1e3;p.style.setProperty("--fill",`${k*100}%`),t==null||t(k)}),p.addEventListener("pointerdown",()=>o==null?void 0:o()),p.addEventListener("pointerup",()=>l==null?void 0:l()),p.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",k=>{g.contains(k.target)||g.classList.remove("open")}),u.appendChild(f),n.appendChild(u),E(c),{setPosition(k){const y=Math.max(0,Math.min(1,k));p.value=String(Math.round(y*1e3)),p.style.setProperty("--fill",`${y*100}%`)},setPlaying(k){b.textContent=k?"⏸":"▶",b.classList.toggle("is-paused",!k),b.setAttribute("aria-label",k?"Pause":"Play")},setSpeed(k){E(k)},setAudioVisible(k){h.hidden=!k,h.classList.toggle("is-hidden",!k)},setMuted(k){m.classList.toggle("is-muted",k),m.setAttribute("aria-label",k?"Unmute audio":"Mute audio")}};function E(k){_.textContent=Rn(k);for(const y of v.children)y.classList.toggle("is-active",y.textContent===Rn(k))}}function Rn(n){return`x${n}`}function Xr(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function Zr(n,e){const t=Math.min(xi(e),2);return n.toFixed(t)}function Be(n,e){return e?`${n} ${e}`:n}function Dt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?Ot(n):e<1e6?`${t}${Ot(n/1e3)}k`:e<1e9?`${t}${Ot(n/1e6)}M`:e<1e12?`${t}${Ot(n/1e9)}B`:`${t}${Ot(n/1e12)}T`:String(n)}function Ot(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function eo(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function cn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return Dt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function wt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?Dt(i):Zr(i,a)}function xi(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function to(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=no(s,i,a);for(const o of s.metadata.liveStats){const l=io(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function no(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":wt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:so(a),value:r}]))}}function so(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function io(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=ao((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Be(a,n.unit)}}function ao(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Dt(Math.round(a)):Dt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):eo(n,{integer:e.integer})}function Ri(){const n=X("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(oo()),e.className="sci-modal is-hidden",e.innerHTML=`
    <div class="entry-info-modal">
      <div class="entry-info-modal__shell">
        <div class="entry-info-modal__media">
          <img
            class="entry-info-modal__image"
            src="${n}"
            alt="Universe Engine preview"
            width="1920"
            height="1080"
            decoding="async"
          />
          <div class="entry-info-modal__media-copy">
            <p class="entry-info-modal__eyebrow">Universe Engine</p>
            <h2 class="entry-info-modal__headline">Explore Cosmic Simulations On Human Scales</h2>
          </div>
        </div>
        <div class="entry-info-modal__content">
          <button class="entry-info-modal__close" type="button" aria-label="Close">×</button>
          <div class="entry-info-modal__header">
            <p class="entry-info-modal__eyebrow">About</p>
            <h2 class="entry-info-modal__title">What Is The Universe Engine?</h2>
            <p class="entry-info-modal__subtitle">
              Universe Engine turns large scientific simulations into an interactive hands-on
              experience 
            </p>
          </div>
          <div class="entry-info-modal__body">
            <section class="entry-info-modal__section">
              <p class="entry-info-modal__copy">
                Choose a cosmic scale, select your inputs, and see how those decisions reshape the cosmos.
              </p>
              <p class="entry-info-modal__copy">
                Run your own simulations of proto-planetary impacts, galaxy formation, and cosmic evolution.
              </p>
              <p class="entry-info-modal__copy">
                Compare your choices with real scientific targets and outputs, and see the computational cost
                of real computational astrophysical research.  
              </p>
            </section>
            <section class="entry-info-modal__section">
              <h3 class="entry-info-modal__section-title">From Universes to Worlds</h3>
              <div class="entry-info-modal__theme-list">
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Cosmos</p>
                  <p class="entry-info-modal__copy">
                    The largest structures in the Universe began as tiny ripples in the early cosmos. Over billions
                    of years, gravity amplifies these subtle differences, drawing dark matter and eventually
                    gas into a vast cosmic web — the skeleton of the Universe. Along this skeleton, gas continues
                    to collapse, forming stars, galaxies, stars, planets, and eventually us. Explore how changing
                    the fundamental laws of the Universe shapes the filaments, clusters, and voids we see today.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Galaxy</p>
                  <p class="entry-info-modal__copy">
                    Galaxies emerge from darkness as gas collapses and cools on cosmic scales. Within them, stars
                    are born, live, and die, recycling matter into new generations of stars and planets.
                    These processes ultimately help create the conditions for life as we know it. But no two galaxies
                    are quite the same. Their shapes, colours, sizes, and histories are shaped by the complex
                    interplay of dark matter, gas, stars, and cosmic environment. Explore this diversity
                    and discover the many kinds of galaxies in our Universe — and what drives their differences.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Planetary</p>
                  <p class="entry-info-modal__copy">
                    Even the smallest changes in angle, speed, or mass can completely transform how a giant
                    impact unfolds. See if you can find the right combination to form a Moon like ours, and uncover
                    the hidden interplay between the initial conditions that turns planetary chaos into an Earth–Moon system.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function ro(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function oo(){return ro(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const lo={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function co(n,e,t){const s=X("assets/banner-1600.webp"),i=[`${X("assets/banner-960.webp")} 960w`,`${X("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(h){o.innerHTML="";for(const m of h){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const p=lo[m.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${p}</span>
      `,b.addEventListener("click",()=>t(m)),o.appendChild(b)}}l(e);const{infoButton:c,infoModal:u,close:f}=Ri();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){f(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(h){l(h)}}}function uo(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(E=>[E.id,E.target])),a=n.metadata.results.map(E=>{const k=Bn(n,e,s,E.id);return k===null?null:{id:E.id,value:k,target:E.target}}).filter(E=>E!==null),r=n.parameters.filter(E=>i[E.id]!==void 0).map(E=>{const k=e[E.id]??E.fallbackValue,y=i[E.id]??E.fallbackValue;return Math.abs(k-y)/Math.max(E.max-E.min,1e-9)}),o=r.reduce((E,k)=>E+k,0)/Math.max(r.length,1),l=mo(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,h=`${$n(u,1)} CPU-hrs
${$n(f,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,p=String(n.parameters.length+6),g="Present",_=ho((s==null?void 0:s.wallclockSeconds)??t),v=Fs(Vs(Bn(n,e,s,"moon_iron"))),N=Fs(Vs(Bn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:_},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:h},memoryUsed:{label:"Memory Used",value:$n(f,1)},particlesUpdated:{label:"Particle updates",value:s?fo(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:N},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:p},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([E,k])=>[E,{label:k.label,value:k.value}]))}}function fo(n){return String(Math.max(0,n))}function ho(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function $n(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Bn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Fs(n){return n===null?"--":n.toFixed(1)}function Vs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function mo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const Qn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},po={HIDE_AFTER_MS:980},$i="https://media.universemakers.org/engine/run-manifest.json",Fn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",go="https://universe-engine.universe-engine.workers.dev/api/track-run",yo=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
# Each section is a simulation family (theme).
# Each entry maps situation keys (greenLow, greenHigh, amberLow, amberHigh,
# redLow, redHigh) to descriptive message text.
# Planetary entries are keyed by bar label; galaxy and cosmos entries are
# keyed by parameter id.

planetary:
  Moon mass:
    greenLow: Spot on!  Your moon — or the moon that could grow out of your orbiting debris disk — came out just a fraction lighter than our real one.
    greenHigh: Spot on!  Your moon — or the moon that could grow out of your orbiting debris disk — came out just a fraction heavier than our real one.
    amberLow: A bit light.  Slightly too little material made it into orbit, or with not enough spin ("angular momentum"), so this impact would make a moon a bit smaller than ours.
    amberHigh: A bit heavy.  A lot of material made it into orbit, so this impact would make a moon even bigger than ours.
    redLow: Very light.  Not much material made it into orbit — this impact would make a moon much smaller than ours, or maybe no moon at all.
    redHigh: That's a big moon!  So much material was flung into orbit that this impact would make a moon far larger than ours.
  Earth mass:
    greenLow: Spot on.  The planet ended up a fraction lighter than our Earth — well within range.
    greenHigh: Spot on.  The planet ended up a fraction heavier than our Earth — well within range.
    amberLow: A bit light.  A little too much was lost in the collision, leaving Earth slightly underweight.
    amberHigh: A bit heavy.  A little too much material merged with the planet, leaving Earth slightly overweight.
    redLow: Far too light.  This impact stripped away too much material, or not enough material was added, leaving a planet far smaller than our Earth.
    redHigh: Far too heavy.  Lots of material was added with very little removed, so this planet ends up far more massive than our Earth.
  Spin of Earth-Moon system:
    greenLow: Spot on.  The system "angular momentum" is slightly lower than the real one — well within range.
    greenHigh: Spot on.  The system "angular momentum" is slightly higher than the real one — well within range.
    amberLow: A bit low.  This planet is spinning a bit slowly, or not enough material is flying around in orbit to evolve into the system we see today.
    amberHigh: A bit high.  This planet is spinning a bit fast, or too much material is flying around in orbit to match the system we see today.
    redLow: Far too low.  This impact gave the planet hardly any spin, with not much material in orbit — unlike our fairly fast-spinning and high-orbiting early Earth and Moon.
    redHigh: Far too high.  This impact drove the planet to spin super fast, with massive amounts of material flying around in orbit.

cosmos:
  stellar_fraction:
    greenLow: Very close.  Your universe locked just a slightly smaller fraction of its mass into stars than ours.
    greenHigh: Very close.  Your universe locked just a slightly larger fraction of its mass into stars than ours.
    amberLow: A bit low.  Your universe turned less of its raw material into stars, leaving it a bit darker and emptier.
    amberHigh: A bit high.  Your universe was a bit more efficient at forging gas into stars than our own.
    redLow: Far too low.  Your universe struggled to form stars — most of the mass is still drifting around as gas.
    redHigh: Far too high.  Your universe is bursting with stars — it converted far more mass into starlight than ours.
  average_temperature_kelvin:
    greenLow: Very close.  The gas in your universe is just a shade cooler than in ours.
    greenHigh: Very close.  The gas in your universe is just a shade warmer than in ours.
    amberLow: A bit cool.  Your gas is cooler than expected — less energetic feedback from black holes and supernovae heating things up.
    amberHigh: A bit hot.  Your gas is warmer than average — more energetic black holes and stars are heating up the cosmos.
    redLow: Far too cool.  The gas in your universe is very cold — there is barely any energetic feedback happening at all.
    redHigh: Far too hot.  The gas is scorching — black holes and stars are pumping so much energy that normal galaxy growth is disrupted.
  nhalos:
    greenLow: Very close.  Your universe built just a fraction fewer galaxy-sized dark matter halos than ours.
    greenHigh: Very close.  Your universe built just a fraction more galaxy-sized dark matter halos than ours.
    amberLow: A bit low.  Fewer galaxy-sized dark matter clumps formed — your universe needed a bit more time or stronger gravity to pull them together.
    amberHigh: A bit high.  More galaxy-sized dark matter clumps popped up than in ours — structure formation was a little more eager.
    redLow: Far too low.  Very few galaxy halos managed to form — structures barely clumped together.
    redHigh: Far too high.  Galaxy halos are everywhere — your universe is absolutely teeming with dark matter structures.

# Unused! Galaxy uses a scavenger hunt checklist instead of similarity bars
galaxy:
  crowding:
    greenLow: Very close.  Your galaxy lives in a neighbourhood just a little sparser than the Milky Way's.
    greenHigh: Very close.  Your galaxy lives in a neighbourhood just a little busier than the Milky Way's.
    amberLow: A bit sparse.  Your galaxy has fewer neighbours than the Milky Way — it may not experience many mergers.
    amberHigh: A bit crowded.  Your galaxy has more neighbours than the Milky Way — it may experience more frequent interactions.
    redLow: Far too sparse.  Your galaxy is almost completely isolated — it will have very few encounters with other galaxies.
    redHigh: Far too crowded.  Your galaxy is in an extremely dense environment — it will be constantly interacting with other galaxies.
  mass_rank:
    greenLow: Very close.  Your galaxy is just a touch dimmer, on average, than the Milky Way.
    greenHigh: Very close.  Your galaxy is just a touch brighter, on average, than the Milky Way.
    amberLow: A bit dim.  Your galaxy is noticeably fainter than the Milky Way — it probably has fewer stars.
    amberHigh: A bit bright.  Your galaxy is noticeably more luminous than the Milky Way — it likely has more stars.
    redLow: Far too dim.  Your galaxy is unusually faint — it may be a small dwarf galaxy.
    redHigh: Far too bright.  Your galaxy is exceptionally luminous — it rivals the brightest galaxies in the Universe.
`,Us=(()=>{const n=ze(yo),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),un="#4CD98A",Xn="#E8951C",Bi="#D7372A",Fi=.2,Vi=.5,Ds=2;function Ui(n){const e=Math.abs(n-1);return e<=Fi?{word:"On target",colour:un}:e<=Vi?{word:n>1?"Too high":"Too low",colour:Xn}:{word:n>1?"Way too high":"Way too low",colour:Bi}}function bo(n){const e=Math.abs(n-1),t=n>=1;return e<=Fi?t?"greenHigh":"greenLow":e<=Vi?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function wo(n){return Math.min(Math.max(n,0),Ds)/Ds*100}function vo(n){return n>=85?{word:"Almost perfect",colour:un}:n>=65?{word:"Really close",colour:un}:n>=45?{word:"Getting there",colour:Xn}:n>=25?{word:"Not quite",colour:Xn}:{word:"Way off - try again",colour:Bi}}function _o(n,e,t){var r,o;const s=bo(t),i=((r=Us[n])==null?void 0:r[s])??((o=Us[e])==null?void 0:o[s]);return i||(Ui(t).colour===un?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function So(n,e,t){return n.metadata.results.map(s=>{const i=ko(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=Eo(s,n,t),o=_o(s.id,r,a),l=Be(Di(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function ko(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=Io((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function Eo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Io(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function No(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Lo(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const f=document.createElement("button"),h=document.createElement("button");f.className="summary-overlay__button summary-overlay__button--primary",f.type="button",f.textContent="New Parameters",h.className="summary-overlay__button",h.type="button",h.textContent="Home",h.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),h.addEventListener("click",e.onHome),c.appendChild(f),c.appendChild(u),c.appendChild(h),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),_=m.querySelector(".sci-modal__close"),v=new Set;let N=!1;function E(S){const M=Ui(S.value);b.textContent=S.label,p.textContent=M.word,p.style.color=M.colour,p.hidden=!1,g.textContent=S.detail,m.classList.remove("is-hidden")}function k(S,M){b.textContent=S,p.hidden=!0,g.textContent=M,m.classList.remove("is-hidden")}function y(){m.classList.add("is-hidden")}_.addEventListener("click",y),m.addEventListener("click",S=>{S.target===m&&y()}),t.addEventListener("click",S=>{S.target===t&&e.onReplay()});function I(S,M){const B=document.createElement("div");B.className=`${S.className} panel`,B.innerHTML=`<p class="sci-section__title">${S.title}</p>`;const O=document.createElement("div"),D=S.singleRow?Math.max(1,S.stats.length):Math.max(1,Math.min(S.stats.length,S.maxColumns));O.className="metric-grid",S.singleRow&&O.classList.add("metric-grid--single-row"),O.style.setProperty("--summary-grid-columns",String(D)),O.style.setProperty("--summary-grid-max-width",`${S.maxWidthRem}rem`);for(const F of S.stats){const J=Ao(F,M),W=document.createElement("div"),te=document.createElement("span"),U=document.createElement("span");W.className="res-card",te.className="res-card__label",te.textContent=J.label,U.className="res-card__value",U.textContent=J.value,W.appendChild(te),W.appendChild(U),F.description&&(W.classList.add("res-card--has-info"),W.addEventListener("click",()=>{k(J.label,F.description)})),O.appendChild(W)}return B.appendChild(O),B}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,N&&(v.clear(),N=!1)},po.HIDE_AFTER_MS)},setHomeVisible(S){h.hidden=!S},update(S,M,B,O,D){var L,T,K,j,V,Z;r.innerHTML="",y();const F=uo(S,M,B,O),J=S.metadata.summaryStats,W=So(S,M,O),te=new Set(W.map($=>$.id));let U;if(W.length>0)U=No(W);else{const $=((L=F.similarityScore)==null?void 0:L.value)??"0/100";U=parseInt($,10)||0}const _e=vo(U),me=document.createElement("div"),Le=document.createElement("div"),Q=document.createElement("div");me.className="sci-top",Le.className="summary-main-column",Q.className="summary-side-column";const pe=document.createElement("div");pe.className="sci-hero panel",D?(pe.classList.add("sci-hero--thumbnail"),pe.innerHTML=`<img class="sci-hero__thumbnail" src="${D}" alt="Final frame of simulation" />`):pe.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${U}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${_e.colour}">${_e.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${U}%; background:${_e.colour}; box-shadow:0 0 12px ${_e.colour}"></div>
          </div>
        `,Le.appendChild(pe);const Se=J.filter($=>($.section??"resources")==="resources"&&!W.some(ne=>ne.id===String($.id))&&$.id!=="similarityScore"),ke=J.filter($=>$.section==="simulationStats"&&!te.has(String($.id)));Se.length>0&&Q.appendChild(I({title:"Resources Used",className:"res-section",stats:Se,maxColumns:3,maxWidthRem:48},F)),ke.length>0&&Q.appendChild(I({title:"Simulation Stats",className:"res-section",stats:ke,maxColumns:ke.length,maxWidthRem:48,singleRow:!0},F)),me.appendChild(Le),Q.childElementCount>0&&me.appendChild(Q),r.appendChild(me);const oe=S.metadata.morphologyChecklist;if(oe&&oe.length>0){const $=((K=(T=O==null?void 0:O.summaryMetrics)==null?void 0:T.morphology)==null?void 0:K.value)??null,ne=($==null?void 0:$.toLowerCase())??null,Ae=new Set(oe.map(R=>R.id));ne&&Ae.has(ne)&&v.add(ne);const ge=document.createElement("div");ge.className="sci-bottom-row";const le=document.createElement("div");le.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",le.appendChild(Hs(S,M,k));const q=((j=oe.find(R=>R.id===ne))==null?void 0:j.label)??$;if(q){const R=document.createElement("div");R.className="sci-section panel param-section";const G=document.createElement("p");G.className="sci-section__title",G.textContent="Galaxy Morphology";const Y=document.createElement("div");Y.className="res-card res-card--has-info";const Ke=document.createElement("span");Ke.className="res-card__value",Ke.textContent=q,Y.appendChild(Ke),Y.addEventListener("click",()=>{var ee;return k("Galaxy Morphology",((ee=oe.find(Je=>Je.id===($??"").toLowerCase()))==null?void 0:ee.description)??`This galaxy is classified as "${q}".`)}),R.appendChild(G),R.appendChild(Y),le.appendChild(R)}ge.appendChild(le);const ye=document.createElement("div");ye.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const Ee=((Z=(V=O==null?void 0:O.summaryMetrics)==null?void 0:V.description)==null?void 0:Z.value)??null;if(Ee){const R=document.createElement("div");R.className="sci-section panel",R.style.cssText="flex:0 1 auto; min-width:0;";const G=document.createElement("p");G.className="sci-section__title",G.textContent="About This Galaxy";const Y=document.createElement("p");Y.className="galaxy-summary__desc-text",Y.textContent=Ee,R.appendChild(G),R.appendChild(Y),ye.appendChild(R)}const Ce=document.createElement("div");Ce.className="sci-section panel",Ce.style.cssText="flex:1; min-height:0;";const je=document.createElement("p");je.className="sci-section__title",je.textContent="Morphology Scavenger Hunt";const Ve=document.createElement("div");Ve.className="galaxy-summary__checklist",Ve.style.cssText="flex:1; align-items:center;";const qe=oe.every(R=>v.has(R.id));for(const R of oe){const G=document.createElement("div");G.className="galaxy-summary__check",v.has(R.id)&&G.classList.add("is-found"),G.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${v.has(R.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${R.label}</span>
          `,R.hint&&(G.classList.add("res-card--has-info"),G.addEventListener("click",()=>k(R.label,R.hint))),Ve.appendChild(G)}if(Ce.appendChild(je),Ce.appendChild(Ve),qe){N=!0;const R=document.createElement("div");R.className="galaxy-summary__done",R.textContent="★ You've discovered all of the galaxy types. Well done! ★",Ce.appendChild(R)}ye.appendChild(Ce),ge.appendChild(ye),r.appendChild(ge)}else if(W.length>0){const $=document.createElement("div");$.className="sci-bottom-row",$.appendChild(Hs(S,M,k));const ne=document.createElement("div"),Ae=document.createElement("div"),ge=document.createElement("p"),le=document.createElement("p");ne.className="sci-section panel",Ae.className="sci-section__header",ge.className="sci-section__title",ge.textContent="Similarity Results",le.className="sci-section__hint",le.textContent="Select any bar for details",Ae.appendChild(ge),Ae.appendChild(le);const q=document.createElement("div");q.className="sci-bars";for(const ye of W){const Ee=document.createElement("div");Ee.className="sci-bar",Ee.innerHTML=`
            <div class="sci-bar__name">${ye.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${wo(ye.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${ye.formattedValue}</div>
          `,Ee.addEventListener("click",()=>E(ye)),q.appendChild(Ee)}ne.appendChild(Ae),ne.appendChild(q),$.appendChild(ne),r.appendChild($)}}}}function Ao(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Co(s,n);if(i)return{label:n.label??t.label,value:i};const a=Di(s,n);return{label:n.label??t.label,value:Be(a,n.unit)}}function Hs(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const f=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":wt(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=Be(f,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Co(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Be(cn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Be(cn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Be(n,e.unit)}function Di(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return cn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return cn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Dt(i)}function To(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=Mo(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Oo()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Mo(n){switch(n){case"icon_houdini":return Ne(`
        <rect x="4.5" y="8" width="9.8" height="8" rx="1.2"></rect>
        <path d="M14.3 10.1 19.5 7.3v9.4l-5.2-2.8Z"></path>
        <circle cx="8" cy="7" r="1.4"></circle>
        <circle cx="11.3" cy="7" r="1.4"></circle>
      `);case"icon_material":return Ne(`
        <path d="M12 4.6a7.4 7.4 0 1 0 7.4 7.4"></path>
        <path d="M12 12V4.6"></path>
        <path d="M12 12h7.4"></path>
        <path d="M12 8.8a3.2 3.2 0 0 1 3.2 3.2"></path>
        <path d="M12 12V8.8"></path>
        <path d="M12 12h3.2"></path>
      `);case"icon_temperature":return Ne(`
        <path d="M10.8 6.2a2.2 2.2 0 0 1 4.4 0v7.1a4.2 4.2 0 1 1-4.4 0Z"></path>
        <path d="M13 8.3v7.1"></path>
        <circle cx="13" cy="17.5" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"icon_pressure":return Ne(`
        <path d="M5.2 16a6.8 6.8 0 1 1 13.6 0"></path>
        <path d="M12 9.2v2"></path>
        <path d="M8.2 10.8 9.4 12"></path>
        <path d="M15.8 10.8 14.6 12"></path>
        <path d="M12 16 16.4 11.8"></path>
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"></circle>
      `);case"dark-matter":return Ne(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Ne(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Ne(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Ne(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Ne(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"turntable":return Ne(`
        <ellipse cx="12" cy="17.2" rx="7.6" ry="1.8"></ellipse>
        <path d="M12 6.2v6.4"></path>
        <path d="m12 6.2-2.6 2"></path>
        <path d="m12 6.2 2.6 2"></path>
        <path d="M12 12.6l-2.6-2"></path>
        <path d="M12 12.6l2.6-2"></path>
      `);case"large-scale-structure":return Ne(`
        <circle cx="6" cy="7" r="1.4"></circle>
        <circle cx="18" cy="6" r="1.2"></circle>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="7.5" cy="17" r="1.2"></circle>
        <circle cx="17.5" cy="18" r="1.4"></circle>
        <path d="M7.1 7.7 10.9 11"></path>
        <path d="M13.4 11 16.9 6.9"></path>
        <path d="M11.3 13.3 8.3 16"></path>
        <path d="M13.1 13.5 16.4 16.9"></path>
        <path d="M8.8 17.2 16.2 17.8"></path>
      `);case"line-trace":return Ne(`
        <path d="M3.5 14.5h3l2.2-5 2.8 9 2.4-6 1.8 2.5H20.5"></path>
        <path d="M3.5 19.5h17"></path>
        <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none"></circle>
        <circle cx="11.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"></circle>
      `);default:return null}}function Ne(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Oo(){return Ne(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Po=`# Credits source-of-truth.
#
# Schema:
# - top-level is a YAML list
# - each list item is one credit entry
# - each entry must contain:
#     - \`text\` (required):  the exact text that must appear in the credits
#     - \`url\` (optional):   a URL that makes the entry a clickable link
#     - \`header\` (optional): when true renders as a section heading

- text: App Authors
  header: true

- text: Lead Developer - Dr Will Roper (University of Sussex / Syzygy Labs)
  url: https://willjroper.github.io/

- text: The Universe Makers Team
  url: https://universe-makers.github.io/about.html

- text: Simulations and Visualisations
  header: true

- text: All simulations performed with SWIFT
  url: https://swift.strw.leidenuniv.nl/

- text: Forward modelling done with Synthesizer
  url: https://synthesizer-project.github.io/synthesizer/#

- text: 'Moon formation simulations by Jacob Kegerreis, Ella Buxton, Harrison Davies, Vince Eke, Callum Mosley'

- text: 'Galaxy formation simulations by Kyle Oman, Diego Dado, Isabel Santos, James Trayford, Owen Jessop, Will Roper, + The COLIBRE Team'

- text: 'Large scale structure simulations by Will Roper, Daniele Sorini, Isabel Santos, Owen Jessop, Sarah Johnston, + The FLAMINGO Team'

- text: Supercomputer
  header: true

- text: COSMA (Durham University)
  url: https://www.durham.ac.uk/departments/academic/physics/cosma/

- text: Partner Institutions
  header: true

- text: University of Sussex
  url: https://www.sussex.ac.uk/

- text: Institute for Computational Cosmology, Durham University
  url: https://www.icc.dur.ac.uk/

- text: Durham Centre for Extragalactic Astronomy (CEA)
  url: https://www.dur.ac.uk/research/directory/research-centres/cea/

- text: Imperial College London
  url: https://www.imperial.ac.uk/

- text: University of Portsmouth
  url: https://www.port.ac.uk/

- text: The Royal Society — Summer Science Exhibition 2026
  url: https://royalsociety.org/

- text: Image Credits
  header: true

- text: 'Milky Way: ESO / S. Brunier'
  url: https://www.eso.org/

- text: 'COLIBRE: The COLIBRE Team (Schaye et al. 2026)'
  url: https://colibre.strw.leidenuniv.nl/team.html

- text: 'FLAMINGO: The FLAMINGO Team (Schaye et al. 2023)'
  url: https://flamingo.strw.leidenuniv.nl/team.html

- text: 'Moon Formation: Jacob Kegerreis, NASA Ames'
  url: https://www.youtube.com/@jkeger_et_al

- text: 'Large scale structure & cluster simulation: Stuart McAlpine'

- text: Funding
  header: true

- text: We would like to thank the Ogden Trust, the Royal Society, and Durham University for their generous funding that made this project possible.

- text: Licensing
  header: true

- text: UniverseEngine is released under the GNU General Public License v3.0
  url: https://www.gnu.org/licenses/gpl-3.0.en.html

- text: COLIBRE and FLAMINGO content is licensed under CC BY 4.0
  url: https://creativecommons.org/licenses/by/4.0/
`;function xo(){const n=ze(Po);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Ro(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:$o(u),i.innerHTML="";const h=document.createElement("div");h.className="parameter-editor__heading",h.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(h);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function _(E,k){b.textContent=E,p.textContent=k,m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}g.addEventListener("click",v),m.addEventListener("click",E=>{E.target===m&&v()});const N=document.createElement("div");N.className="parameter-editor__list";for(const E of u.parameters)N.appendChild(l(E,_));i.appendChild(N),c()}function l(u,f){const h=document.createElement("div");h.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const p=u.displayUnit??u.unit,g=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,_=document.createElement("span");if(_.className="param-card__range",g){const y=u.qualiLabels;_.textContent=`${y[0]} – ${y[y.length-1]}`}else _.textContent=`${Be(wt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)} – ${Be(wt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}`;m.appendChild(b),m.appendChild(_);const v=document.createElement("input");v.className="param-card__slider",v.type="range";const N=r[u.id]??u.fallbackValue;if(g){const y=u.qualiLabels.length;v.min="0",v.max=String(y-1),v.step="any",v.value=String(Math.round(N))}else{const y=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max;v.min=String(y),v.max=String(I),v.step=u.logScale?"0.001":String(u.step),v.value=String(u.logScale?Math.log10(Math.max(N,Number.MIN_VALUE)):N)}v.setAttribute("aria-label",u.label);const E=document.createElement("span");E.className="res-card__value";function k(y){if(g){const I=Math.round(y),S=u.qualiLabels;r[u.id]=I,v.style.setProperty("--fill",`${tn(y,0,S.length-1)}%`),E.textContent=S[I]??String(I)}else{const I=u.logScale?10**y:y;r[u.id]=I,v.value=String(y),v.style.setProperty("--fill",`${tn(y,parseFloat(v.min),parseFloat(v.max))}%`),E.textContent=Be(wt(I,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}c()}if(v.addEventListener("input",()=>{k(parseFloat(v.value))}),v.addEventListener("pointerdown",y=>y.stopPropagation()),v.addEventListener("click",y=>y.stopPropagation()),g){const y=Math.round(N),I=u.qualiLabels;v.style.setProperty("--fill",`${tn(y,0,I.length-1)}%`),E.textContent=I[y]??String(y)}else{const y=u.logScale?Math.log10(Math.max(N,Number.MIN_VALUE)):N;v.style.setProperty("--fill",`${tn(y,parseFloat(v.min),parseFloat(v.max))}%`),E.textContent=Be(wt(N,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}if(u.description){h.classList.add("res-card--has-info"),h.setAttribute("title",u.description);const y=document.createElement("span");y.className="param-card__info-btn",y.setAttribute("aria-label","Parameter description"),y.textContent="ⓘ",m.appendChild(y),h.addEventListener("click",()=>{f(u.label,u.description)})}return h.appendChild(m),h.appendChild(v),h.appendChild(E),h}function c(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function $o(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function tn(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Hi="universe-engine-advanced-settings",Bo="RSSSE26UM_Engine";function dn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Fo(n){const e=localStorage.getItem(Hi);if(!e)return dn();try{const t=JSON.parse(e);return ji(t,n)}catch{return dn()}}function Vo(n,e){const t=ji(n,e);return localStorage.setItem(Hi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function ji(n,e){const t=dn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Uo(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Uo(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):dn().defaultAudioVolume}function Do(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Ho(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
      <p class="config-overlay__media-subtitle"></p>
    </div>
  `,a.prepend(r);const o=a.querySelector(".config-overlay__media-subtitle"),l=document.createElement("img");l.className="config-overlay__chartermark",l.src=X("assets/credits/des9400-chartermark.webp"),l.alt="DES9400 SSE 2026 Chartermark",l.decoding="async",a.appendChild(l);const c=document.createElement("div");c.className="config-overlay__controls",c.dataset.view=e.initialView??"parameters";const u=document.createElement("div");u.className="config-overlay__header";const f=document.createElement("div");f.className="config-overlay__title-block",f.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const h=f.querySelector(".config-overlay__eyebrow"),m=f.querySelector(".config-overlay__title"),b=f.querySelector(".config-overlay__subtitle"),p=document.createElement("button");p.className="config-overlay__close",p.type="button",p.setAttribute("aria-label","Back"),p.textContent="←",u.appendChild(f),u.appendChild(p);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="parameters";const _=document.createElement("div");g.appendChild(_);const v=document.createElement("section");v.className="config-overlay__section config-overlay__section--grow",v.dataset.section="settings",v.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const N=document.createElement("div");v.appendChild(N);const E=document.createElement("section");E.className="audio-settings",E.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const k=document.createElement("label");k.className="advanced-settings__field advanced-settings__field--inline";const y=document.createElement("input"),I=document.createElement("span");y.type="checkbox",y.className="advanced-settings__checkbox",I.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,k.appendChild(y),k.appendChild(I),E.appendChild(k);const S=document.createElement("label");S.className="advanced-settings__field",S.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const M=document.createElement("input"),B=document.createElement("span");M.type="range",M.min="0",M.max="100",M.step="1",M.className="audio-settings__slider",B.className="audio-settings__value",S.appendChild(M),S.appendChild(B),E.appendChild(S),v.appendChild(E);const O=document.createElement("section");O.className="advanced-settings",O.dataset.state="closed",O.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const D=document.createElement("button");D.className="advanced-settings__access",D.type="button",D.textContent="Advanced Settings",O.appendChild(D);const F=document.createElement("div");F.className="advanced-settings__auth";const J=document.createElement("input");J.className="advanced-settings__password",J.type="password",J.placeholder="Enter password",J.autocomplete="off";const W=document.createElement("button");W.className="advanced-settings__unlock",W.type="button",W.textContent="Unlock";const te=document.createElement("p");te.className="advanced-settings__message",F.appendChild(J),F.appendChild(W),F.appendChild(te),O.appendChild(F);const U=document.createElement("div");U.className="advanced-settings__form";const _e=document.createElement("label");_e.className="advanced-settings__field",_e.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const me=document.createElement("select");me.className="advanced-settings__select",me.appendChild(new Option("None",""));for(const A of e.availableScales)me.appendChild(new Option(A.label,A.id));_e.appendChild(me),U.appendChild(_e);const Le=document.createElement("div");Le.className="advanced-settings__field",Le.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const Q=document.createElement("div");Q.className="advanced-settings__options";const pe=document.createElement("label"),Se=document.createElement("input");pe.className="advanced-settings__choice",Se.type="radio",Se.name="manifest-source",Se.value="local",pe.appendChild(Se),pe.append("Local manifest");const ke=document.createElement("label"),oe=document.createElement("input");ke.className="advanced-settings__choice",oe.type="radio",oe.name="manifest-source",oe.value="online",ke.appendChild(oe),ke.append("Online manifest"),Q.appendChild(pe),Q.appendChild(ke),Le.appendChild(Q),U.appendChild(Le);const L=document.createElement("label");L.className="advanced-settings__field advanced-settings__field--inline";const T=document.createElement("input"),K=document.createElement("span");T.type="checkbox",T.className="advanced-settings__checkbox",K.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,L.appendChild(T),L.appendChild(K),U.appendChild(L);const j=document.createElement("div");j.className="advanced-settings__field",j.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const V=document.createElement("div");V.className="advanced-settings__options";const Z=new Map;for(const A of e.availableScales){const H=document.createElement("label"),ue=document.createElement("input");H.className="advanced-settings__choice",ue.type="checkbox",ue.value=A.id,Z.set(A.id,ue),H.appendChild(ue),H.append(`Show ${A.label}`),V.appendChild(H)}j.appendChild(V),U.appendChild(j),O.appendChild(U),v.appendChild(O);const $=document.createElement("section");$.className="config-overlay__section config-overlay__section--grow",$.dataset.section="credits",$.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const ne=$.querySelector("[data-credits]"),Ae=xo();if(ne.innerHTML="",Ae.length===0){const A=document.createElement("div");A.className="credits-list__entry",A.textContent="To be credited...",ne.appendChild(A)}else for(const A of Ae)if(A.header){const H=document.createElement("div");H.className="credits-list__heading",H.textContent=A.text,ne.appendChild(H)}else{const H=document.createElement("div");H.className="credits-list__entry";const ue=document.createElement("span");if(ue.className="credits-list__text",A.url){const de=document.createElement("a");de.className="credits-list__link",de.href=A.url,de.target="_blank",de.rel="noopener noreferrer",de.textContent=A.text,ue.appendChild(de)}else ue.textContent=A.text;H.appendChild(ue),ne.appendChild(H)}const ge=document.createElement("div");ge.className="config-overlay__footer";const le=document.createElement("button");le.className="run-button",le.type="button",le.textContent="Run",ge.appendChild(le),c.appendChild(u),c.appendChild(g),c.appendChild(v),c.appendChild($),c.appendChild(ge),i.appendChild(a),i.appendChild(c),s.appendChild(i),t.appendChild(s),n.appendChild(t);let q=Pt(e.advancedSettings),ye="closed",Ee=!e.advancedSettings.lockedScaleId;const Ce=Ro(_,e.simClass,e.values,e.onValuesChange),je=jr(N,e.theme,e.onThemeChange);p.addEventListener("click",e.onClose),D.addEventListener("click",()=>{if(ye==="open"){G("closed");return}G("auth"),J.focus()}),W.addEventListener("click",R),J.addEventListener("keydown",A=>{A.key==="Enter"&&R()}),me.addEventListener("change",()=>{q.lockedScaleId=me.value||null,qe()}),Se.addEventListener("change",()=>{Se.checked&&(q.manifestSource="local")}),oe.addEventListener("change",()=>{oe.checked&&(q.manifestSource="online")}),T.addEventListener("change",()=>{q.verboseLogging=T.checked}),y.addEventListener("change",()=>{q.audioMutedByDefault=y.checked}),M.addEventListener("input",()=>{q.defaultAudioVolume=Number(M.value)/100,ee()});for(const[A,H]of Z.entries())H.addEventListener("change",()=>{if(Array.from(Z.entries()).filter(([,de])=>de.checked).map(([de])=>de).length===0&&!q.lockedScaleId){H.checked=!0;return}q.hiddenScaleIds=Array.from(Z.keys()).filter(de=>{var Qe;return!((Qe=Z.get(de))!=null&&Qe.checked)&&de!==q.lockedScaleId}),qe()}),A===q.lockedScaleId&&(H.disabled=!0);Ve(e.initialView??"parameters"),qe(),Ue(Ee);function Ve(A){c.dataset.view=A,A==="parameters"?(h.textContent=e.simClass.label,m.textContent="Shape Your Simulation",b.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",o.textContent=e.simClass.label,o.hidden=!1,r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):A==="settings"?(h.textContent="Interface",m.textContent="Adjust The Control Room",b.textContent="Change the interface theme and manage exhibit-level options for this installation.",o.textContent="",o.hidden=!0,r.src=X("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(h.textContent="References",m.textContent="Project Sources And Attribution",b.textContent="Review the datasets, imagery, and supporting materials behind this experience.",o.textContent="",o.hidden=!0,r.src=X("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),A==="settings"?le.textContent="Apply":le.textContent="Run Simulation",ge.hidden=A==="credits",Je()}function qe(){me.value=q.lockedScaleId??"",Se.checked=q.manifestSource==="local",oe.checked=q.manifestSource==="online",T.checked=q.verboseLogging,y.checked=q.audioMutedByDefault,M.value=String(Math.round(q.defaultAudioVolume*100)),ee();for(const[A,H]of Z.entries()){const ue=q.lockedScaleId===A;H.checked=ue||!q.hiddenScaleIds.includes(A),H.disabled=ue}}function R(){if(J.value!==Bo){te.textContent="Incorrect password";return}J.value="",te.textContent="",G("open")}function G(A){ye=A,O.dataset.state=A,D.textContent=A==="open"?"Hide Advanced Settings":"Advanced Settings",A!=="auth"&&(te.textContent="")}function Y(){J.value="",te.textContent="",G("closed")}function Ke(){q=Pt(e.advancedSettings),qe()}function ee(){B.textContent=`${Math.round(Number(M.value))}%`}function Je(){const A=c.dataset.view,H=A==="settings"||A==="credits"||Ee;p.hidden=!H,p.classList.toggle("is-hidden",!H),p.setAttribute("aria-label",A==="parameters"?"Back":"Close"),p.textContent=A==="parameters"?"←":"×"}function Ue(A){Ee=A,Je()}return le.addEventListener("click",()=>{if(c.dataset.view==="settings"){e.onApplySettings(Pt(q));return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),Ke(),Y()},setSimulation(A,H){e.simClass=A,a.dataset.simClass=A.id,Ce.setSimClass(A,H),c.dataset.view==="parameters"&&(r.src=A.placeholderImage,r.alt=`${A.label} preview`,Ve("parameters"))},setTheme(A){je.setActive(A)},setView(A){Ve(A),A!=="settings"&&Y()},setAdvancedSettings(A){e.advancedSettings=Pt(A),q=Pt(A),qe(),Y()},setBackVisible:Ue}}function Pt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function jo(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=Qn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const b of l)window.clearTimeout(b);l=[]}function f(b,p){return new Promise(g=>{const _=window.setTimeout(()=>{p===c&&g()},Math.max(0,b));l.push(_)})}async function h(b,p){const g=document.createElement("div");g.className="terminal__line";const _=m();g.appendChild(_),o.appendChild(g);for(let v=0;v<b.length;v+=1){if(p!==c)return;const N=b[v];g.insertBefore(document.createTextNode(N),_),o.scrollTop=o.scrollHeight,await f(e,p)}_.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,p,g,_){u(),c+=1;const v=c;i.hidden=!1,i.classList.remove("is-hidden");const N=performance.now(),E=(_==null?void 0:_.minTerminalTimeMs)??t;let k=!g,y=[...b];g&&g.then(()=>{k=!0});let I=0;for(;v===c;){y.length===0&&(y=[...b]);const M=Math.floor(Math.random()*y.length),[B]=y.splice(M,1),O=`${js(I)} ${B.text}`;if(I+=1,await h(O,v),v!==c)return;if(performance.now()-N>=E&&k)break}if(v!==c)return;const S=document.createElement("div");S.className="terminal__line terminal__line--syncing",S.textContent=`${js(I)} STARTING SIMULATION...`,o.appendChild(S),o.scrollTop=o.scrollHeight,await f(s,v),v===c&&p()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function js(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Vn(t)}:${Vn(s)}:${Vn(i)}]`}function Vn(n){return String(n).padStart(2,"0")}function qo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{u(),e.onHome()}),r=c("Select Parameters",()=>{u(),e.onParameters()});s.appendChild(a),s.appendChild(r),s.appendChild(c("Settings",()=>{u(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{u(),e.onViewSelected("credits")}));const o=c("Fullscreen",()=>{var h;u(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});s.appendChild(o),n.appendChild(s);function l(){const h=o.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",l),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",h=>{n.contains(h.target)||u()}),f(e.showHome??!0),{close:u,setHomeVisible:f};function c(h,m){const b=document.createElement("button");return b.className="display-menu__item",b.type="button",b.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,b.addEventListener("click",m),b}function u(){n.classList.remove("open")}function f(h){a.hidden=!h,a.classList.toggle("is-hidden",!h),r.hidden=h,r.classList.toggle("is-hidden",h)}}const qi="universe-engine-playback-speed",Ko=new Set([.25,.5,1,2]);function Wo(){const n=localStorage.getItem(qi),e=n?Number(n):NaN;return Ko.has(e)?e:1}function Yo(n){localStorage.setItem(qi,String(n))}async function Un(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function Go(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const zo=`# Initialization terminal script for the Planetary simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_EARTH :: loading continental crusts and oceanic crusts into memory'
- 'INIT_EARTH :: making the Earth soft centred like a very hot chocolate truffle'
- 'INIT_EARTH :: breaking up Pangea, just to be annoying for future intercontinental travel'
- 'INIT_EARTH :: giving Earth oceans, tectonics, and just enough existential risk'
- 'INIT_EARTH :: checking that the mantle is molten enough to be dramatic'
- 'INIT_EARTH :: minding its own business'
- 'INIT_EARTH :: winning the goldilocks zone lottery'
- 'INIT_IMPACTOR :: selecting one large rock with terrible intentions'
- 'INIT_IMPACTOR :: solving for a collision nobody involved will enjoy'
- 'INIT_IMPACTOR :: setting up proto-planet pinball'
- 'INIT_IMPACTOR :: checking if catastrophic failure counts as satellite formation'
- 'INIT_IMPACTOR :: prepare to orbit because surfers will need waves'
- 'INIT_IMPACTOR :: sending Bruce Willis and a really big bomb to the rescue'
- 'INIT_MATERIAL :: solving problems in multi-material simulations just to slam things together'
- "INIT_MATERIAL :: does it matter what its made of if it's about to be a molten mess?"
- 'INIT_MATERIAL :: expressing equations of state in a way that makes sense to the computer'
- 'INIT_MATERIAL :: preparing to mix iron, rock, and magma in the solar systems first cocktail'
- 'INIT_ORBIT :: aligning the crosshairs with Earth'
- "INIT_ORBIT :: emulating Moonfall, Hollywood's finest achievement"
- 'INIT_ORBIT :: turning orbital mechanics into a countdown to regret'
- 'INIT_ORBIT :: fine-tuning impact angle for maximum moon-making potential'
- 'INIT_ORBIT :: checking that all trajectories intersect in the least peaceful way possible'
- 'INIT_ORBIT :: playing the best crossover album ever, Collision Course'
- 'INIT_ORBIT :: concocting a trajectory that will end in disaster for one and a new moon for the other'
- 'PREPARE_COMP :: filling RAM to the brim'
- 'PREPARE_COMP :: funding a bigger supercomputer'
- 'PREPARE_COMP :: making computer go brrr'
- 'PREPARE_COMP :: solving the three-body problem (ish)'
- 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
- 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
- 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- 'VISUAL_PIPELINE :: how liquid should planets be really?'
- "VISUAL_PIPELINE :: taking artistic license with Earth's surface"
- 'VISUAL_PIPELINE :: making sure the impact looks suitably apocalyptic'
- 'VISUAL_PIPELINE :: colour-grading the magma to something tasteful'
- 'VISUAL_PIPELINE :: rendering one heroic plume of molten bad decisions'
- 'VISUAL_PIPELINE :: making planetary destruction look oddly publication-ready'
- "VISUAL_PIPELINE :: watching Elon's Tesla get obliterated in the impact"
- 'INIT_FUNDING :: trying to secure future funding for the sciences while funding gets cut'
`,Jo=`# Initialization terminal script for the Galaxy simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_STELLAR_POP :: spiralling arms into existence'
- 'INIT_STELLAR_POP :: assembling a galaxy one mildly unstable stellar population at a time'
- 'INIT_STELLAR_POP :: ending runaway star formation for good with supernovae'
- 'INIT_STELLAR_POP :: blowing gas back out before the stars get any ideas'
- 'INIT_STELLAR_POP :: weaponising stellar evolution against future stellar evolution'
- 'INIT_STELLAR_POP :: hide Population III stars really really really well'
- 'INIT_STELLAR_POP :: pairing up most stars into binaries, because they are lonely otherwise'
- 'INIT_BLACK_HOLE :: regulating self-regulation mechanisms'
- 'INIT_BLACK_HOLE :: placing one supermassive liability at the galactic center'
- 'INIT_BLACK_HOLE :: making sure the black hole is fed enough to be a problem for the galaxy'
- 'INIT_BLACK_HOLE :: giving supermassive black holes galaxy killing powers'
- 'INIT_BLACK_HOLE :: following the unified AGN model to the letter'
- 'INIT_BLACK_HOLE :: deviating from the unified AGN model, why should physicists understand everything'
- 'INIT_GAS :: following complex cooling channels to ensure simulations are extremely expensive'
- 'INIT_GAS :: reminding baryons they are not actually collisionless'
- 'INIT_GAS :: letting the interstellar medium become a multi-phase mess of gas, dust and radiation'
- 'INIT_GAS :: classifying all elements as metals, astrophysics is complicated enough without chemistry'
- 'INIT_HALO :: wrapping the visible galaxy in a dark matter support group'
- 'INIT_HALO :: shaping the invisible mass budget into something rotationally persuasive'
- 'INIT_HALO :: hiding most of the mass where telescopes will complain about it'
- 'INIT_HALO :: why is it rotating like that?'
- 'INIT_HALO :: following an NFW profile, so that Navarro, Frenk and White can write a paper'
- 'INIT_EVOLUTION :: setting up some future mergers just when we start to get structure'
- 'INIT_EVOLUTION :: making sure the galaxy has a few close encounters with its neighbours'
- 'INIT_EVOLUTION :: defining the point a globular cluster becomes a dwarf galaxy'
- 'PREPARE_COMP :: filling RAM to the brim'
- 'PREPARE_COMP :: funding a bigger supercomputer'
- 'PREPARE_COMP :: solving the three-body problem (ish)'
- 'PREPARE_COMP :: optimising for oddly specific hardware configurations that will not exist in 2 years'
- 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
- 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- 'PREPARE_COMP :: making time run 10 quadrillion times faster'
- 'PREPARE_COMP :: finding the edge of a galaxy... actually how do you define that?'
- 'VISUAL_PIPELINE :: rendering dust lanes to look like Andromeda'
- 'VISUAL_PIPELINE :: asking Michael Bay for advice on rendering explosions'
- 'VISUAL_PIPELINE :: painting nebulae with suspiciously cinematic restraint'
- 'VISUAL_PIPELINE :: counting photons until the end of time'
- 'VISUAL_PIPELINE :: reticulating splines'
- 'VISUAL_PIPELINE :: accidentally making the Universe left-handed'
- 'VISUAL_PIPELINE :: tracing rays from across light-years to your screen'
- 'VISUAL_PIPELINE :: buying more GPUs'
- 'INIT_FUNDING :: trying to secure future funding for the sciences while funding gets cut'
`,Qo=`# Initialization terminal script for the Cosmos simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_PHYSICAL_LAWS :: fixing the speed of light'
- 'INIT_PHYSICAL_LAWS :: finding the planck scale and trying not to look directly at it'
- 'INIT_PHYSICAL_LAWS :: removing understandability from quantum mechanics'
- 'INIT_PHYSICAL_LAWS :: bending spacetime to eventually drop apples'
- 'INIT_PHYSICAL_LAWS :: making the cosmological constant small but nonzero, just to mess with everyone'
- 'INIT_PHYSICAL_LAWS :: making time run 10 quadrillion times faster'
- 'INIT_PHYSICAL_LAWS :: considering whether to bother with cosmic scale magnetic fields'
- 'INIT_PHYSICAL_LAWS :: looking beyond the standard model of particle physics for inspiration'
- 'INIT_COSMOS :: finding the edge of the observable universe, give or take a few billion light-years'
- "INIT_COSMOS :: hiding dark matter's existence"
- 'INIT_COSMOS :: leaving inflation as an exercise for the reader'
- 'INIT_COSMOS :: adding astrophysicists with a few good questions about inflation'
- 'INIT_COSMOS :: founding the restaurant at the end of the universe'
- 'INIT_COSMOS :: the answer is 42'
- 'INIT_MATTER :: taking away photon masses'
- 'INIT_MATTER :: charging protons to their full potential'
- 'INIT_MATTER :: holding nuclei together with neutrons and a prayer (i.e. the strong force)'
- 'INIT_MATTER :: making neutrino masses flakey'
- 'INIT_MATTER :: making neutrinos unsure about their own identity'
- 'INIT_MATTER :: assembling some matter into astrophysicists to create simulations'
- 'INIT_MATTER :: coupling to the Higgs field to fund the LHC'
- 'INIT_DENSITY_FIELD :: ironing out spacetime variations'
- 'INIT_DENSITY_FIELD :: forming primordial black holes (or are we?)'
- 'INIT_DENSITY_FIELD :: generalising elements as metals, astrophysics is hard enough without chemistry'
- 'INIT_DENSITY_FIELD :: seeding tiny quantum fluctuations at the beginning of time'
- 'INIT_MULTIVERSE :: making sure the multiverse is big enough to contain all possible universes'
- 'INIT_FUNDING :: trying to secure future funding for the sciences while funding gets cut'
- 'PREPARE_COMP :: filling RAM to the brim'
- 'PREPARE_COMP :: funding a bigger supercomputer'
- 'PREPARE_COMP :: making computer go brrr'
- 'PREPARE_COMP :: solving the three-body problem (ish)'
- 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
- 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
- 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- 'VISUAL_PIPELINE :: colouring dark matter purple'
- 'VISUAL_PIPELINE :: counting pixels one-by-one'
- 'VISUAL_PIPELINE :: making sure the universe looks like a screensaver from 2002'
- 'VISUAL_PIPELINE :: tracing rays from the big bang to your screen'
- 'VISUAL_PIPELINE :: DLSSing the universe into existence'
- 'VISUAL_PIPELINE :: setting the graphics settings to high'
`,Xo={planetary:zo,galaxy:Jo,cosmos:Qo};function Zo(n){return ze(Xo[n.id]).map(t=>({text:t}))}function Ht(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var f;const l=t[o.id]??o.fallbackValue,c=((f=n.parameters)==null?void 0:f[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function el(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(u=>u.primary!==!1).map(u=>u.id)),i=new Set(e.filter(u=>u.primary===!1).map(u=>u.id));if(!e.some(u=>u.primary===!1))return Dn(n,e,t);const r=Dn(n,e,t,s);if(!r)return null;const o=Ht(r,e,t,s),l=1e-6,c=n.filter(u=>{const f=Ht(u,e,t,s);return Math.abs(f-o)<=l});return Dn(c,e,t,i)}function Dn(n,e,t,s){if(n.length===0)return null;let i=n[0],a=Ht(i,e,t,s);for(const r of n.slice(1)){const o=Ht(r,e,t,s);o<a&&(i=r,a=o)}return i}function tl(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function nl(n){try{const e=await Ze(n);if(!e.ok)return null;const t=await e.text(),s=ze(t),i=pt(s.wallclockSeconds),a=pt(s.computeUsed),r=pt(s.memoryUsed),o=pt(s.carbonBurnt),l=pt(s.particlesUpdated),c=await sl(n),u=al(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function sl(n){try{const e=await Ze(il(n));if(!e.ok)return{};const t=await e.text(),s=ze(t);return rl(s)}catch{return{}}}function il(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function pt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function al(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function rl(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=pt(s);i!==null&&(e[t]=i)}return e}const Ki="[UniverseEngine]";let Wi=!1;function qs(n){Wi=n}function Yi(){return Wi}function ce(n,e){Yi()&&console.info(Ki,n,e??"")}function Ye(n,e){Yi()&&console.warn(Ki,n,e??"")}const ol={local:"assets/local-manifest.json",online:$i};function ll(n="local"){let e=n;const t=new Map,s=new Map;return{getSource(){return e},setSource(i){t.delete(i),s.delete(i),Wr(),e=i,ce("Manifest source updated",{source:i})},async preloadActiveManifest(){await zi(e,t,s)},async findNearestVideo(i,a,r){const o=await dl(e,t,s,i,a,r);if(o)return o;const l=Gi(i);return Ye("Falling back to placeholder assets",{simClassId:i,source:e,fallbackUrl:l}),{url:l,liveDataUrl:cl(i),summaryUrl:tl(l)}}}}function Gi(n){switch(n){case"planetary":return X("assets/planet_test.mp4");case"galaxy":return X("assets/galaxy_test.mp4");case"cosmos":return X("assets/cosmo_test.mp4");default:return X("assets/galaxy_test.mp4")}}function cl(n){switch(n){case"planetary":return X("assets/planet_test_planetary_stats.csv");case"galaxy":return X("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return X("assets/cosmo_test_cosmos_stats.csv");default:return X("assets/galaxy_test_galaxy_stats.csv")}}async function zi(n,e,t){const s=e.get(n);if(s)return s;const i=ol[n],a=(n==="online"?ul(i):fetch(X(i),{cache:"no-store"}).then(async r=>{if(!r.ok)throw new Error(`Failed to load manifest: ${i}`);return ce("Loaded manifest",{source:n,manifestPath:i}),await r.json()})).then(r=>(t.set(n,fl()),r)).catch(r=>(t.delete(n),Ye("Manifest unavailable",{source:n,manifestPath:i,error:r instanceof Error?r.message:String(r)}),{version:1,runs:[]}));return e.set(n,a),a}async function ul(n){const e=[n,Fn];for(const t of e)try{const s=await fetch(t,{cache:"no-store"});if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??Ks($i),r=i.backupBase??Ks(Fn);return Kr(a,r),t===Fn&&Yr("backup"),ce("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function dl(n,e,t,s,i,a){const o=(await zi(n,e,t)).runs.filter(h=>h.simulationId===s);if(o.length===0)return Ye("No manifest runs found for simulation",{simClassId:s,source:n}),null;const l=el(o,i,a);if(!l)return null;const c=Ht(l,i,a),u=l.defaultView??Object.keys(l.views)[0],f=l.views[u];return f?(ce("Selected manifest-backed run",{simClassId:s,source:n,runId:l.runId,selectedValues:a,distance:c,viewId:u}),{url:xt(n,f,t),liveDataUrl:xt(n,l.liveDataPath,t),summaryUrl:xt(n,l.summaryPath,t),audioUrl:l.audioPath?xt(n,l.audioPath,t):void 0,viewId:u,runId:l.runId,views:Object.fromEntries(Object.entries(l.views).map(([h,m])=>[h,xt(n,m,t)]))}):null}function xt(n,e,t){const s=n==="local"?X(e):De(e),i=t.get(n);return i?Ti(s,"_manifest",i):s}function fl(){return`${Date.now()}`}function Ks(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const rn={mode:"time",frames:[]};async function hl(n){const e=await Ze(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return gl(t)}function ml(n,e,t=0){if(n.mode==="row")return yl(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=pl(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return bl(r.values,o.values,l)}function pl(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function gl(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return rn;const t=Hn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Hn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Hn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function yl(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Hn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function bl(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=wl(u);continue}i[a]=t<.5?r:o}return i}function wl(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function vl(n){_l(go,n)}function _l(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ce("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ce("Run selection tracked",{simulationId:e.simulationId}):Ye("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Ye("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const Ws=50*1024*1024,Sl=8,kl=6e3,El=8e3,Il=7e3,Nl=1200,Ll=100,jn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Al(n){const e=mt.map(d=>d.id);let t=Fo(e),s=Ss(t);const i=ll(t.manifestSource),a=Go();qs(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=ks(t.lockedScaleId)??s[0]??mt[0],o=t.lockedScaleId?jn[r.id]:Hr(),l=!1,c=null,u=null,f=!1,h=t.audioMutedByDefault,m=t.defaultAudioVolume,b=0;const p=new Set;let g=null,_=0,v=rn,N=!1;const E=Object.fromEntries(mt.map(d=>[d.id,la(d)]));xn(o);const k=Gi(r.id),y=zr(n,k),I=document.createElement("audio");I.preload="auto",I.hidden=!0,I.setAttribute("playsinline","true"),I.muted=h,I.volume=m,n.appendChild(I);const S=document.createElement("div");S.className="display-chrome",S.classList.add("is-hidden"),n.appendChild(S);const M=document.createElement("div");M.className="orientation-overlay",M.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(M);const B=document.createElement("div");B.className="swift-logo",B.innerHTML=`
    <img
      class="swift-logo__image"
      src="${X("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      decoding="async"
    />
    <img
      class="swift-logo__image-compact"
      src="${X("assets/credits/swift-logo-compact.webp")}"
      alt="SWIFT"
      decoding="async"
    />
  `,n.appendChild(B);const O=document.createElement("div");O.className="synth-logo is-hidden",O.innerHTML=`
    <img
      class="synth-logo__image"
      src="${X("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
    <img
      class="synth-logo__image-compact"
      src="${X("assets/credits/synthesizer_banner_compact.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(O);const D=document.createElement("img");D.className="app-partner-logo",D.src=X("assets/dirac-hpc-white.webp"),D.alt="DIRAC HPC",D.decoding="async",n.appendChild(D);const F=document.createElement("div");F.className="display-chrome__top-left is-hidden",n.appendChild(F);const J=qo(F,{onHome(){kn()},onParameters(){At("parameters")},onViewSelected(d){if(d==="credits"){At("credits");return}At(d)},showHome:!t.lockedScaleId}),W=document.createElement("div");W.className="display-chrome__left-center",S.appendChild(W);const te=To(W,{onSelect(d){bs(d)},onInfo(d,w,C){_e.textContent=w,me.textContent=C,U.classList.add("is-visible")}}),U=document.createElement("div");U.className="view-info-overlay",U.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(U);const _e=U.querySelector(".view-info-overlay__title"),me=U.querySelector(".view-info-overlay__text"),Le=U.querySelector(".view-info-overlay__close");U.addEventListener("click",d=>{d.target===U&&U.classList.remove("is-visible")}),Le.addEventListener("click",()=>{U.classList.remove("is-visible")});const Q=document.createElement("div");Q.className="display-chrome__top-center is-hidden",S.appendChild(Q);const pe=document.createElement("div");pe.className="display-chrome__top-right",S.appendChild(pe);const Se=to(pe),ke=document.createElement("div");ke.className="display-chrome__center-status",ke.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,S.appendChild(ke);const oe=Wo();y.setPlaybackRate(oe);const L=document.createElement("div");L.className="display-chrome__bottom",S.appendChild(L);const T=Qr(L,{onChange(d){le(d)},onTogglePlay:ys,onAudioToggle:ta,onSpeedChange:na,onSummaryClick:ea,onScrubStart(){Ve(),ge()},onScrubEnd(){qe(),y.isPaused()||Ae()},initialSpeed:oe});T.setPlaying(!y.isPaused()),T.setAudioVisible(!1),T.setMuted(h),I.addEventListener("loadedmetadata",()=>{dt(!0),Ie()});let K=null,j=null,V=null,Z=!1,$=null,ne=0;function Ae(){if(K!==null)return;function d(){const w=y.getPlaybackFraction();T.setPosition(w),y.isPaused()?K=null:K=requestAnimationFrame(d)}K=requestAnimationFrame(d)}function ge(){K!==null&&(cancelAnimationFrame(K),K=null)}function le(d){j=d,V===null&&(V=requestAnimationFrame(()=>{if(V=null,j===null)return;const w=j;j=null,y.seekToFraction(w),dt(!0)}))}function q(){if(j===null)return;V!==null&&(cancelAnimationFrame(V),V=null);const d=j;j=null,y.seekToFraction(d),dt(!0)}function ye(){$!==null&&(window.clearTimeout($),$=null)}function Ee(){if(!(g!=null&&g.views))return[];const d=ut(r,g);return Object.entries(g.views).filter(([w])=>w!==d).map(([,w])=>De(w)).filter(Boolean)}function Ce(){ye(),y.suspendPrewarming()}function je(d=Nl){ye(),!(Z||y.isPaused())&&($=window.setTimeout(()=>{$=null,!(Z||y.isPaused())&&(y.resumePrewarming(),y.prewarmSources(Ee()))},Math.max(0,d)))}function Ve(){Z=!0,ne=0,Ce(),Ie()}function qe(){Z=!1,ne=0,q(),_=y.getPlaybackFraction()*y.getDurationSeconds(),nt(_),je(),Ie()}y.onPlayStateChange(d=>{T.setPlaying(!d),d?(ge(),Ce()):(Ae(),je(0)),Ie()}),y.onTimeUpdate(d=>{if(_=d*y.getDurationSeconds(),Z){const w=performance.now();if(w-ne<Ll)return;ne=w}nt(_),dt()});const R=document.createElement("div");R.className="overlay-layer",n.appendChild(R);const G=Ri();G.infoButton.classList.add("is-hidden"),G.infoButton.hidden=!0,n.appendChild(G.infoButton),n.appendChild(G.infoModal);const Y=Lo(R,{onReplay:Zi,onParameters:()=>At("parameters"),onHome:kn,showHome:!t.lockedScaleId});y.onEnded(()=>{l=!0;const d=y.captureFrame();Y.update(r,Te(),y.getDurationSeconds(),c,d),Y.show(),Ie()});const Ke=co(R,s,d=>{gs(d),At("parameters")}),ee=Ho(R,{simClass:r,values:Te(),theme:o,advancedSettings:t,availableScales:mt,onValuesChange:Ji,onThemeChange:Sn,onRun:()=>{ce("Parameters submitted — starting run",{simClassId:r.id}),sa().catch(d=>{Ye("Run failed to start",{simClassId:r.id,error:d instanceof Error?d.message:String(d)})})},onApplySettings:Qi,onClose:Xi,initialView:"parameters"});ee.setBackVisible(!t.lockedScaleId);const Je=jo(R);T.setPosition(0),nt(),Y.hide();const Ue=new WeakMap,A=d=>{const w=Ue.get(d);w&&(clearTimeout(w),Ue.delete(d)),d.classList.remove("side-collapsed")},H=d=>{const w=Ue.get(d);w&&clearTimeout(w),Ue.set(d,setTimeout(()=>{d.classList.add("side-collapsed"),Ue.delete(d)},2500))},ue=d=>{const w=Ue.get(d);w&&(clearTimeout(w),Ue.delete(d)),d.classList.add("side-collapsed")},de=(d,w)=>{const C=w.isCollapsible??(()=>!0);d.addEventListener("mouseenter",()=>A(d)),d.addEventListener("mouseleave",()=>{if(!C()){A(d);return}H(d)}),d.addEventListener("focusin",()=>A(d)),d.addEventListener("focusout",P=>{if(!d.contains(P.relatedTarget)){if(!C()){A(d);return}H(d)}}),d.addEventListener("click",()=>{if(!C()){A(d);return}if(d.classList.contains("side-collapsed")){A(d),H(d);return}w.toggleOnClick?ue(d):H(d)}),C()?ue(d):A(d)};de(F,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode==="display"}),de(W,{toggleOnClick:!0}),de(L,{toggleOnClick:!1});let Qe=0,lt=null,Yt=0;const ms=()=>{lt!==null&&(cancelAnimationFrame(lt),lt=null)},ps=()=>{if(lt!==null)return;Yt=y.getPlaybackFraction();const d=()=>{if(Qe===0){ms();return}const C=12*(1/60)/Math.max(y.getDurationSeconds(),1);Yt=Math.max(0,Math.min(1,Yt+Qe*C)),y.seekToFraction(Yt),lt=requestAnimationFrame(d)};lt=requestAnimationFrame(d)};document.addEventListener("keydown",d=>{if(n.dataset.mode==="display"&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement))switch(d.key){case"Escape":d.preventDefault(),U.classList.contains("is-visible")?U.classList.remove("is-visible"):kn();break;case" ":d.preventDefault(),ys();break;case"ArrowLeft":d.preventDefault(),A(L),H(L),Qe=-1,ps();break;case"ArrowRight":d.preventDefault(),A(L),H(L),Qe=1,ps();break;case"ArrowUp":case"ArrowDown":{if(d.preventDefault(),A(W),H(W),!(g!=null&&g.views)||Object.keys(g.views).length<=1)break;const w=r.views.filter(fe=>{var be;return((be=g==null?void 0:g.views)==null?void 0:be[fe.id])!==void 0});if(w.length<=1)break;const C=g.viewId??ut(r,g),P=w.findIndex(fe=>fe.id===C),se=d.key==="ArrowUp"?(P-1+w.length)%w.length:(P+1)%w.length;bs(w[se].id);break}}}),document.addEventListener("keyup",d=>{(d.key==="ArrowLeft"||d.key==="ArrowRight")&&(Qe=0,ms())}),y.hideMedia(),y.pause(),tt(t.lockedScaleId?"config":"entry");function gs(d){d.id===r.id&&N||(r=d,In(),Sn(jn[d.id]),ee.setSimulation(r,Te()),T.setPosition(0),nt(),Gt(),En())}function Ji(d){E[r.id]={...d},ce("Parameter values updated",{simClassId:r.id,values:E[r.id]}),nt()}function Sn(d){o=d,xn(d),ee.setTheme(d)}function At(d){d==="parameters"&&ee.setSimulation(r,Te()),ee.setView(d),tt("config")}function Qi(d){if(va(d),N){Y.hide(),tt("display");return}ee.setSimulation(r,Te()),ee.setView("parameters")}function Xi(){if(Y.hide(),!N&&t.lockedScaleId){ee.setSimulation(r,Te()),ee.setView("parameters");return}tt(N?"display":"entry")}function kn(){t.lockedScaleId||(ce("Returning to home screen",{simClassId:r.id}),In(),N=!1,y.hideMedia(),tt("entry"))}function Zi(){l=!1,Y.hide(),y.getPlaybackFraction()>=.999&&(y.resetPlayback(),dt(!0)),Un(y),Ie()}function ea(){l=!0,y.pause();const d=c?y.captureFrame():null;Y.update(r,Te(),y.getDurationSeconds(),c,d),Y.show(),Ie()}function ys(){y.isPaused()?Un(y):y.pause()}function ta(){h=!h,Ie()}function na(d){y.setPlaybackRate(d),Yo(d),T.setSpeed(d)}async function sa(){const d=Te(),w=a.start();ce("Run requested",{simClassId:r.id,values:d,manifestSource:i.getSource()});const C=await i.findNearestVideo(r.id,r.parameters,d);if(!a.isCurrent(w))return;In({preserveRunRequest:!0}),g=C;const P=ut(r,C),se=Gr(i.getSource());vl({simulationId:r.id,parameters:d,manifestSource:i.getSource(),matchedRunId:C.runId,assetHostMode:se.mode,assetHostBase:se.base});const fe=ha(C,P)??C.url,be=Object.entries(C.views??{}).filter(([xe])=>xe!==P).map(([,xe])=>xe);ua(C.liveDataUrl,w),da(C.summaryUrl,w),pa(C.summaryUrl,w,C.audioUrl),y.setMuted(!0),Gt(P),Ct(),tt("initializing");const zt=ia(fe);y.resumePrewarming(),y.prewarmSources(be);const Tt=(async()=>{const xe=await zt;a.isCurrent(w)&&(ce(`Prepared active video source: ${xe.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:fe,waitsForBuffer:xe.shouldWaitForBuffer}),y.setSource(xe.src,{ownedObjectUrl:xe.ownedObjectUrl}),y.pause(),await y.waitForLoadedData(El),a.isCurrent(w)&&xe.shouldWaitForBuffer&&await y.waitForBufferedAhead(Sl,kl))})();await new Promise(xe=>{Je.show(Zo(r),xe,Tt,{minTerminalTimeMs:ba()})}),a.isCurrent(w)&&(N=!0,y.showMedia(),Un(y),tt("display"),Ie())}async function ia(d){const w=De(d),C=await aa(d);if(C!==null&&C>0&&C<=Ws){ce("Downloading active video behind loading overlay",{videoUrl:w,contentLength:C});try{const P=await Ze(d);if(!P.ok)throw new Error(`Failed to download active video: ${w}`);const se=await P.blob();return ce(`Active video full fetch complete: ${se.size} bytes`,{videoUrl:De(d),blobType:se.type}),{src:URL.createObjectURL(se),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(P){Ye(`Full-fetch FAILED; falling back to progressive: ${P instanceof Error?P.message:String(P)}`,{videoUrl:d})}}return C!==null?ce("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:d,contentLength:C,fullFetchMaxBytes:Ws}):ce("Could not determine active video size; using progressive load",{videoUrl:d}),ce("Using progressive active video load",{videoUrl:d}),{src:De(d),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function aa(d){try{const w=await Ze(d,{headers:{Range:"bytes=0-0"}});ce("Probed active video size with range request",{videoUrl:d,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const C=oa(w.headers.get("Content-Length"));if(C!==null)return C;const P=ra(w.headers.get("Content-Range"));return P!==null?P:null}catch(w){return Ye("Could not probe active video size",{videoUrl:d,error:w instanceof Error?w.message:String(w)}),null}}function ra(d){if(!d)return null;const w=d.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const C=Number(w[1]);return Number.isFinite(C)&&C>0?C:null}function oa(d){if(!d)return null;const w=Number(d);return Number.isFinite(w)?w:null}function tt(d){if(n.dataset.mode=d,d==="entry"?document.documentElement.setAttribute("data-theme","glass"):d==="display"&&xn(o),ct(S,d==="display"||d==="config"),ct(B,d==="display"||d==="entry"),ct(F,d==="entry"||d==="config"||d==="display"),ct(G.infoButton,d==="config"&&!!t.lockedScaleId),(d!=="config"||!t.lockedScaleId)&&G.close(),d!=="display"?A(F):ue(F),d==="entry"&&!t.lockedScaleId?Ke.show():Ke.hide(),d==="config"?(Je.hide(),ee.setSimulation(r,Te()),ee.show()):ee.hide(),d!=="display")Y.hide(),te.hide(),Q.classList.add("is-hidden"),Q.innerHTML="";else if(l){const C=y.captureFrame();Y.update(r,Te(),y.getDurationSeconds(),c,C),Y.show()}else Gt();!N||d==="initializing"?(y.hideMedia(),d==="initializing"&&y.pause()):y.showMedia(),d!=="initializing"&&Je.hide(),En(),Ie()}function En(){if(n.dataset.mode==="entry"){ct(O,!0);return}const d=n.dataset.mode==="display",w=r.id==="galaxy";ct(O,d&&w)}function nt(d=0){const w=ml(v,d,y.getDurationSeconds()),C=fa(r,c,d,y.getDurationSeconds());Se.update(r,Te(),{...w,...C})}function Gt(d){const w=r.views.filter(se=>{var fe;return((fe=g==null?void 0:g.views)==null?void 0:fe[se.id])!==void 0});if(w.length<=1){te.hide(),Q.classList.add("is-hidden");return}const C=d??ut(r,g),P=w.find(se=>se.id===C);te.update(w,C),P?(Q.classList.remove("is-hidden"),Q.innerHTML=`<span class="viewport-title">${P.label??P.id}</span>`):Q.classList.add("is-hidden")}function In(d={}){d.preserveRunRequest||a.invalidate(),v=rn,l=!1,c=null,g=null,_=0,Z=!1,j=null,ye(),V!==null&&(cancelAnimationFrame(V),V=null),Y.hide(),te.hide(),Q.classList.add("is-hidden"),Q.innerHTML="",y.pause(),I.pause(),y.clearPrewarmedSources(),y.resetPlayback(),T.setPosition(0),_s()}function bs(d){if(!(g!=null&&g.views)||d===ut(r,g))return;const w=De(g.views[d]);if(!w)return;g.viewId=d;const C=!y.isPaused()&&!l,P=l?0:y.getPlaybackFraction();l=!1,Y.hide(),y.setSource(w,{seekFraction:P,autoplay:C}),y.prewarmSources(Ee()),C&&!Z?je():Ce(),Gt(d),Ct(),Ie(),U.classList.remove("is-visible"),En()}function Te(){return{...E[r.id]}}function la(d){return Object.fromEntries(d.parameters.map(w=>[w.id,ca(w)]))}function ca(d){if(d.logScale){const fe=Math.log10(d.min),be=Math.log10(d.max);return 10**(fe+Math.random()*(be-fe))}const w=Math.max(0,Math.round((d.max-d.min)/d.step)),C=Math.floor(Math.random()*(w+1)),P=d.min+C*d.step,se=xi(d.step);return Number(P.toFixed(se))}async function ua(d,w){let C=rn;try{C=await hl(d)}catch(P){Ye("Failed to load live stats",{url:d,error:P instanceof Error?P.message:String(P)})}a.isCurrent(w)&&(v=C,nt())}async function da(d,w){const C=await nl(d);a.isCurrent(w)&&(c=C,nt(_))}function fa(d,w,C,P){if(!w||!Number.isFinite(P)||P<=0)return{};const se=Math.max(0,Math.min(1,C/P)),fe={};for(const be of d.metadata.liveStats){if(!be.live||!be.fromVideo||!be.scaleWithTime)continue;const zt=be.videoKey??be.id,Tt=w[zt];if(typeof Tt!="number"||!Number.isFinite(Tt))continue;const Nn=Tt*se;fe[be.id]=be.integer?String(Math.floor(Nn)):String(Nn)}return fe}function ct(d,w){d.hidden=!w,d.classList.toggle("is-hidden",!w)}function ut(d,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function ha(d,w){return!w||!d.views?null:d.views[w]??null}function ws(){const d=ut(r,g);return d?r.views.some(w=>w.id===d&&w.audio):!1}function ma(d,w){return w||d.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function pa(d,w,C){const P=ma(d,C),se=De(P);if(p.has(se)){vs(se);return}const fe=++b,be=await ga(P);if(!(!a.isCurrent(w)||fe!==b)){if(!be){_s();return}p.add(se),vs(se)}}function vs(d){u=d,f=!0,I.src!==u&&(I.pause(),I.src=u,I.load()),Ct(),Ie()}async function ga(d){try{if((await Ze(d,{method:"HEAD"})).ok)return!0}catch{}try{return(await Ze(d,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function _s(){b+=1,u=null,f=!1,I.pause(),I.removeAttribute("src"),I.load(),Ct()}function ya(){h=t.audioMutedByDefault,m=t.defaultAudioVolume,I.muted=h,I.volume=m,T.setMuted(h)}function Ct(){T.setAudioVisible(ws()&&f&&!!u),T.setMuted(h)}function dt(d=!1){if(!f||!Number.isFinite(I.duration)||I.duration<=0)return;const w=Math.max(0,Math.min(I.duration,y.getPlaybackFraction()*I.duration));(d||Math.abs(I.currentTime-w)>.35)&&(I.currentTime=w)}function Ie(){const d=ws()&&f&&!!u;if(Ct(),I.muted=h,I.volume=m,!d){I.pause();return}if(dt(),n.dataset.mode!=="display"||y.isPaused()||l||Z){I.pause();return}I.play().catch(()=>{h=!0,I.muted=!0,T.setMuted(!0)})}function Ss(d){const w=new Set(Do(d,e));return mt.filter(C=>w.has(C.id))}function ks(d){return d?mt.find(w=>w.id===d)??null:null}function ba(){return i.getSource()!=="local"?Qn.MIN_TERMINAL_TIME_MS:wa(Qn.MIN_TERMINAL_TIME_MS,Il)}function wa(d,w){const C=Math.ceil(Math.min(d,w)),P=Math.floor(Math.max(d,w));return Math.floor(Math.random()*(P-C+1))+C}function va(d){const w=r.id,C=t.manifestSource;t=Vo(d,e),qs(t.verboseLogging),s=Ss(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),J.setHomeVisible(!t.lockedScaleId),Y.setHomeVisible(!t.lockedScaleId),Ke.setSimulationClasses(s),ee.setAdvancedSettings(t),ee.setBackVisible(!t.lockedScaleId),ce("Advanced settings updated",t),ya(),Ie(),C!==t.manifestSource&&(g=null);const P=ks(t.lockedScaleId);P&&(gs(P),P.id!==w&&(N=!1,y.hideMedia(),ee.setView("parameters")),N||(Sn(jn[P.id]),ee.setSimulation(r,Te())))}}function Cl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Al(n)}Cl();
//# sourceMappingURL=main-YM4mDIjq.js.map
