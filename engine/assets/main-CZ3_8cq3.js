(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const ls=Symbol.for("yaml.alias"),Zn=Symbol.for("yaml.document"),tt=Symbol.for("yaml.map"),si=Symbol.for("yaml.pair"),Ye=Symbol.for("yaml.scalar"),At=Symbol.for("yaml.seq"),$e=Symbol.for("yaml.node.type"),dt=n=>!!n&&typeof n=="object"&&n[$e]===ls,bn=n=>!!n&&typeof n=="object"&&n[$e]===Zn,zt=n=>!!n&&typeof n=="object"&&n[$e]===tt,ae=n=>!!n&&typeof n=="object"&&n[$e]===si,J=n=>!!n&&typeof n=="object"&&n[$e]===Ye,Jt=n=>!!n&&typeof n=="object"&&n[$e]===At;function se(n){if(n&&typeof n=="object")switch(n[$e]){case tt:case At:return!0}return!1}function ie(n){if(n&&typeof n=="object")switch(n[$e]){case ls:case tt:case Ye:case At:return!0}return!1}const ii=n=>(J(n)||se(n))&&!!n.anchor,ot=Symbol("break visit"),Ta=Symbol("skip children"),qt=Symbol("remove node");function Ct(n,e){const t=Ma(e);bn(n)?vt(null,n.contents,t,Object.freeze([n]))===qt&&(n.contents=null):vt(null,n,t,Object.freeze([]))}Ct.BREAK=ot;Ct.SKIP=Ta;Ct.REMOVE=qt;function vt(n,e,t,s){const i=Oa(n,e,t,s);if(ie(i)||ae(i))return Pa(n,s,i),vt(n,i,t,s);if(typeof i!="symbol"){if(se(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=vt(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===ot)return ot;r===qt&&(e.items.splice(a,1),a-=1)}}}else if(ae(e)){s=Object.freeze(s.concat(e));const a=vt("key",e.key,t,s);if(a===ot)return ot;a===qt&&(e.key=null);const r=vt("value",e.value,t,s);if(r===ot)return ot;r===qt&&(e.value=null)}}return i}function Ma(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Oa(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(zt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(Jt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ae(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(J(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(dt(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function Pa(n,e,t){const s=e[e.length-1];if(se(s))s.items[n]=t;else if(ae(s))n==="key"?s.key=t:s.value=t;else if(bn(s))s.contents=t;else{const i=dt(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const xa={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ra=n=>n.replace(/[!,[\]{}]/g,e=>xa[e]);class Ee{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},Ee.defaultYaml,e),this.tags=Object.assign({},Ee.defaultTags,t)}clone(){const e=new Ee(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new Ee(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:Ee.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},Ee.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:Ee.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},Ee.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ra(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&ie(e.contents)){const a={};Ct(e.contents,(r,o)=>{ie(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}Ee.defaultYaml={explicit:!1,version:"1.2"};Ee.defaultTags={"!!":"tag:yaml.org,2002:"};function ai(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function ri(n){const e=new Set;return Ct(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function oi(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function $a(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=ri(n));const r=oi(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(J(r.node)||se(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function _t(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=_t(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=_t(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=_t(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=_t(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Re(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Re(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!ii(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class cs{constructor(e){Object.defineProperty(this,$e,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!bn(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Re(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?_t(a,{"":o},"",o):o}}class us extends cs{constructor(e){super(ls),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],Ct(e,{Node:(a,r)=>{(dt(r)||ii(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Re(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=un(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(ai(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function un(n,e,t){if(dt(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(se(e)){let s=0;for(const i of e.items){const a=un(n,i,t);a>s&&(s=a)}return s}else if(ae(e)){const s=un(n,e.key,t),i=un(n,e.value,t);return Math.max(s,i)}return 1}const li=n=>!n||typeof n!="function"&&typeof n!="object";class $ extends cs{constructor(e){super(Ye),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Re(this.value,e,t)}toString(){return String(this.value)}}$.BLOCK_FOLDED="BLOCK_FOLDED";$.BLOCK_LITERAL="BLOCK_LITERAL";$.PLAIN="PLAIN";$.QUOTE_DOUBLE="QUOTE_DOUBLE";$.QUOTE_SINGLE="QUOTE_SINGLE";const Ba="tag:yaml.org,2002:";function Fa(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Wt(n,e,t){var f,h,m;if(bn(n)&&(n=n.contents),ie(n))return n;if(ae(n)){const b=(h=(f=t.schema[tt]).createNode)==null?void 0:h.call(f,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new us(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Ba+e.slice(2));let c=Fa(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new $(n);return l&&(l.node=b),b}c=n instanceof Map?r[tt]:Symbol.iterator in Object(n)?r[At]:r[tt]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((m=c==null?void 0:c.nodeClass)==null?void 0:m.from)=="function"?c.nodeClass.from(t.schema,n,t):new $(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function hn(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Wt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Dt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class ci extends cs{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>ie(s)||ae(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Dt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(se(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,hn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(se(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&J(a)?a.value:a:se(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ae(t))return!1;const s=t.value;return s==null||e&&J(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return se(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(se(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,hn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Va=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Ge(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const lt=(n,e,t)=>n.endsWith(`
`)?Ge(t,e):t.includes(`
`)?`
`+Ge(t,e):(n.endsWith(" ")?"":" ")+t,ui="flow",es="block",dn="quoted";function wn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):f=i-s);let h,m,b=!1,p=-1,g=-1,k=-1;t===es&&(p=xs(n,p,e.length),p!==-1&&(f=p+l));for(let E;E=n[p+=1];){if(t===dn&&E==="\\"){switch(g=p,n[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}k=p}if(E===`
`)t===es&&(p=xs(n,p,e.length)),f=p+e.length+l,h=void 0;else{if(E===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const v=n[p+1];v&&v!==" "&&v!==`
`&&v!=="	"&&(h=p)}if(p>=f)if(h)c.push(h),f=h+l,h=void 0;else if(t===dn){for(;m===" "||m==="	";)m=E,E=n[p+=1],b=!0;const v=p>k+1?p-2:g-1;if(u[v])return n;c.push(v),u[v]=!0,f=v+l,h=void 0}else b=!0}m=E}if(b&&o&&o(),c.length===0)return n;r&&r();let y=n.slice(0,c[0]);for(let E=0;E<c.length;++E){const v=c[E],N=c[E+1]||n.length;v===0?y=`
${e}${n.slice(0,N)}`:(t===dn&&u[v]&&(y+=`${n[v]}\\`),y+=`
${e}${n.slice(v+1,N)}`)}return y}function xs(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const vn=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),_n=n=>/^(%|---|\.\.\.)/m.test(n);function Ua(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Kt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(_n(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:wn(r,a,dn,vn(e,!1))}function ts(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Kt(n,e);const t=e.indent||(_n(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:wn(s,t,ui,vn(e,!1))}function St(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Kt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=ts:a&&!i?s=Kt:s=t?ts:Kt}return s(n,e)}let ns;try{ns=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{ns=/\n+(?!\n|$)/g}function fn({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return St(t,s);const c=s.indent||(s.forceBlockIndent||_n(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===$.BLOCK_FOLDED?!1:e===$.BLOCK_LITERAL?!0:!Ua(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,h;for(h=t.length;h>0;--h){const N=t[h-1];if(N!==`
`&&N!=="	"&&N!==" ")break}let m=t.substring(h);const b=m.indexOf(`
`);b===-1?f="-":t===m||b!==m.length-1?(f="+",a&&a()):f="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(ns,`$&${c}`));let p=!1,g,k=-1;for(g=0;g<t.length;++g){const N=t[g];if(N===" ")p=!0;else if(N===`
`)k=g;else break}let y=t.substring(0,k<g?k+1:g);y&&(t=t.substring(y.length),y=y.replace(/\n+/g,`$&${c}`));let v=(p?c?"2":"1":"")+f;if(n&&(v+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const N=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let _=!1;const I=vn(s,!0);r!=="folded"&&e!==$.BLOCK_FOLDED&&(I.onOverflow=()=>{_=!0});const L=wn(`${y}${N}${m}`,c,es,I);if(!_)return`>${v}
${c}${L}`}return t=t.replace(/\n+/g,`$&${c}`),`|${v}
${c}${y}${t}${m}`}function Da(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return St(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?St(a,e):fn(n,e,t,s);if(!o&&!u&&i!==$.PLAIN&&a.includes(`
`))return fn(n,e,t,s);if(_n(a)){if(l==="")return e.forceBlockIndent=!0,fn(n,e,t,s);if(o&&l===c)return St(a,e)}const f=a.replace(/\n+/g,`$&
${l}`);if(r){const h=p=>{var g;return p.default&&p.tag!=="tag:yaml.org,2002:str"&&((g=p.test)==null?void 0:g.test(f))},{compat:m,tags:b}=e.doc.schema;if(b.some(h)||m!=null&&m.some(h))return St(a,e)}return o?f:wn(f,l,ui,vn(e,!1))}function ds(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==$.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=$.QUOTE_DOUBLE);const l=u=>{switch(u){case $.BLOCK_FOLDED:case $.BLOCK_LITERAL:return i||a?St(r.value,e):fn(r,e,t,s);case $.QUOTE_DOUBLE:return Kt(r.value,e);case $.QUOTE_SINGLE:return ts(r.value,e);case $.PLAIN:return Da(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:f}=e.options,h=i&&u||f;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}function di(n,e){const t=Object.assign({blockQuote:!0,commentString:Va,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Ha(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(J(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function ja(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(J(n)||se(n))&&n.anchor;a&&ai(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function Nt(n,e,t,s){var l;if(ae(n))return n.toString(e,t,s);if(dt(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=ie(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Ha(e.doc.schema.tags,a));const r=ja(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):J(a)?ds(a,e,t,s):a.toString(e,t,s);return r?J(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function qa({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t;let h=ie(n)&&n.comment||null;if(f){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(se(n)||!ie(n)&&typeof n=="object"){const I="With simple keys, collection cannot be used as a key value";throw new Error(I)}}let m=!f&&(!n||h&&e==null&&!t.inFlow||se(n)||(J(n)?n.type===$.BLOCK_FOLDED||n.type===$.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(f||!a),indent:o+l});let b=!1,p=!1,g=Nt(n,t,()=>b=!0,()=>p=!0);if(!m&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!f||e==null&&m)return g=`? ${g}`,h&&!b?g+=lt(g,t.indent,c(h)):p&&i&&i(),g;b&&(h=null),m?(h&&(g+=lt(g,t.indent,c(h))),g=`? ${g}
${o}:`):(g=`${g}:`,h&&(g+=lt(g,t.indent,c(h))));let k,y,E;ie(e)?(k=!!e.spaceBefore,y=e.commentBefore,E=e.comment):(k=!1,y=null,E=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!h&&J(e)&&(t.indentAtStart=g.length+1),p=!1,!u&&l.length>=2&&!t.inFlow&&!m&&Jt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let v=!1;const N=Nt(e,t,()=>v=!0,()=>p=!0);let _=" ";if(h||k||y){if(_=k?`
`:"",y){const I=c(y);_+=`
${Ge(I,t.indent)}`}N===""&&!t.inFlow?_===`
`&&E&&(_=`

`):_+=`
${t.indent}`}else if(!m&&se(e)){const I=N[0],L=N.indexOf(`
`),B=L!==-1,O=t.inFlow??e.flow??e.items.length===0;if(B||!O){let S=!1;if(B&&(I==="&"||I==="!")){let M=N.indexOf(" ");I==="&"&&M!==-1&&M<L&&N[M+1]==="!"&&(M=N.indexOf(" ",M+1)),(M===-1||L<M)&&(S=!0)}S||(_=`
${t.indent}`)}}else(N===""||N[0]===`
`)&&(_="");return g+=_+N,t.inFlow?v&&s&&s():E&&!v?g+=lt(g,t.indent,c(E)):p&&i&&i(),g}function fi(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const nn="<<",Je={identify:n=>n===nn||typeof n=="symbol"&&n.description===nn,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new $(Symbol(nn)),{addToJSMap:hi}),stringify:()=>nn},Ka=(n,e)=>(Je.identify(e)||J(e)&&(!e.type||e.type===$.PLAIN)&&Je.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Je.tag&&t.default));function hi(n,e,t){if(t=n&&dt(t)?t.resolve(n.doc):t,Jt(t))for(const s of t.items)Bn(n,e,s);else if(Array.isArray(t))for(const s of t)Bn(n,e,s);else Bn(n,e,t)}function Bn(n,e,t){const s=n&&dt(t)?t.resolve(n.doc):t;if(!zt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function mi(n,e,{key:t,value:s}){if(ie(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ka(n,t))hi(n,e,s);else{const i=Re(t,"",n);if(e instanceof Map)e.set(i,Re(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Wa(t,i,n),r=Re(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Wa(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(ie(n)&&(t!=null&&t.doc)){const s=di(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),fi(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function fs(n,e,t){const s=Wt(n,void 0,t),i=Wt(e,void 0,t);return new Ie(s,i)}class Ie{constructor(e,t=null){Object.defineProperty(this,$e,{value:si}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return ie(t)&&(t=t.clone(e)),ie(s)&&(s=s.clone(e)),new Ie(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return mi(t,s,this)}toString(e,t,s){return e!=null&&e.doc?qa(this,e,t,s):JSON.stringify(this)}}function pi(n,e,t){return(e.inFlow??n.flow?Ga:Ya)(n,e,t)}function Ya({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const h=[];for(let b=0;b<e.length;++b){const p=e[b];let g=null;if(ie(p))!f&&p.spaceBefore&&h.push(""),mn(t,h,p.commentBefore,f),p.comment&&(g=p.comment);else if(ae(p)){const y=ie(p.key)?p.key:null;y&&(!f&&y.spaceBefore&&h.push(""),mn(t,h,y.commentBefore,f))}f=!1;let k=Nt(p,u,()=>g=null,()=>f=!0);g&&(k+=lt(k,a,c(g))),f&&g&&(f=!1),h.push(s+k)}let m;if(h.length===0)m=i.start+i.end;else{m=h[0];for(let b=1;b<h.length;++b){const p=h[b];m+=p?`
${l}${p}`:`
`}}return n?(m+=`
`+Ge(c(n),l),o&&o()):f&&r&&r(),m}function Ga({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const f=[];for(let b=0;b<n.length;++b){const p=n[b];let g=null;if(ie(p))p.spaceBefore&&f.push(""),mn(e,f,p.commentBefore,!1),p.comment&&(g=p.comment);else if(ae(p)){const y=ie(p.key)?p.key:null;y&&(y.spaceBefore&&f.push(""),mn(e,f,y.commentBefore,!1),y.comment&&(c=!0));const E=ie(p.value)?p.value:null;E?(E.comment&&(g=E.comment),E.commentBefore&&(c=!0)):p.value==null&&(y!=null&&y.comment)&&(g=y.comment)}g&&(c=!0);let k=Nt(p,l,()=>g=null);c||(c=f.length>u||k.includes(`
`)),b<n.length-1?k+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=f.reduce((y,E)=>y+E.length+2,2)+(k.length+2)>e.options.lineWidth)),c&&(k+=",")),g&&(k+=lt(k,s,o(g))),f.push(k),u=f.length}const{start:h,end:m}=t;if(f.length===0)return h+m;if(!c){const b=f.reduce((p,g)=>p+g.length+2,2);c=e.options.lineWidth>0&&b>e.options.lineWidth}if(c){let b=h;for(const p of f)b+=p?`
${a}${i}${p}`:`
`;return`${b}
${i}${m}`}else return`${h}${r}${f.join(" ")}${r}${m}`}function mn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=Ge(e(s),n);t.push(a.trimStart())}}function ct(n,e){const t=J(e)?e.value:e;for(const s of n)if(ae(s)&&(s.key===e||s.key===t||J(s.key)&&s.key.value===t))return s}class xe extends ci{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(tt,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(fs(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ae(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new Ie(e,e==null?void 0:e.value):s=new Ie(e.key,e.value);const i=ct(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);J(i.value)&&li(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=ct(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=ct(this.items,e),i=s==null?void 0:s.value;return(!t&&J(i)?i.value:i)??void 0}has(e){return!!ct(this.items,e)}set(e,t){this.add(new Ie(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)mi(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ae(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),pi(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const Tt={collection:"map",default:!0,nodeClass:xe,tag:"tag:yaml.org,2002:map",resolve(n,e){return zt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>xe.from(n,e,t)};class ut extends ci{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(At,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=sn(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=sn(e);if(typeof s!="number")return;const i=this.items[s];return!t&&J(i)?i.value:i}has(e){const t=sn(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=sn(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];J(i)&&li(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Re(a,String(i++),t));return s}toString(e,t,s){return e?pi(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(Wt(o,void 0,s))}}return a}}function sn(n){let e=J(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Mt={collection:"seq",default:!0,nodeClass:ut,tag:"tag:yaml.org,2002:seq",resolve(n,e){return Jt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>ut.from(n,e,t)},Sn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),ds(n,e,t,s)}},kn={identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new $(null),stringify:({source:n},e)=>typeof n=="string"&&kn.test.test(n)?n:e.options.nullStr},hs={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new $(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&hs.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function je({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const gi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:je},yi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():je(n)}},bi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new $(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:je},En=n=>typeof n=="bigint"||Number.isInteger(n),ms=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function wi(n,e,t){const{value:s}=n;return En(s)&&s>=0?t+s.toString(e):je(n)}const vi={identify:n=>En(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ms(n,2,8,t),stringify:n=>wi(n,8,"0o")},_i={identify:En,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ms(n,0,10,t),stringify:je},Si={identify:n=>En(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ms(n,2,16,t),stringify:n=>wi(n,16,"0x")},za=[Tt,Mt,Sn,kn,hs,vi,_i,Si,gi,yi,bi];function Rs(n){return typeof n=="bigint"||Number.isInteger(n)}const an=({value:n})=>JSON.stringify(n),Ja=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:an},{identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:an},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:an},{identify:Rs,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Rs(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:an}],Qa={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Xa=[Tt,Mt].concat(Ja,Qa),ps={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=$.BLOCK_LITERAL),e!==$.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let f=0,h=0;f<c;++f,h+=l)u[f]=o.substr(h,l);o=u.join(e===$.BLOCK_LITERAL?`
`:" ")}return ds({comment:n,type:e,value:o},s,i,a)}};function ki(n,e){if(Jt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ae(s)){if(zt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new Ie(new $(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ae(s)?s:new Ie(s)}}else e("Expected a sequence for this tag");return n}function Ei(n,e,t){const{replacer:s}=t,i=new ut(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(fs(o,l,t))}return i}const gs={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ki,createNode:Ei};class Et extends ut{constructor(){super(),this.add=xe.prototype.add.bind(this),this.delete=xe.prototype.delete.bind(this),this.get=xe.prototype.get.bind(this),this.has=xe.prototype.has.bind(this),this.set=xe.prototype.set.bind(this),this.tag=Et.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ae(i)?(a=Re(i.key,"",t),r=Re(i.value,a,t)):a=Re(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=Ei(e,t,s),a=new this;return a.items=i.items,a}}Et.tag="tag:yaml.org,2002:omap";const ys={collection:"seq",identify:n=>n instanceof Map,nodeClass:Et,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=ki(n,e),s=[];for(const{key:i}of t.items)J(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new Et,t)},createNode:(n,e,t)=>Et.from(n,e,t)};function Ii({value:n,source:e},t){return e&&(n?Ni:Li).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const Ni={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new $(!0),stringify:Ii},Li={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new $(!1),stringify:Ii},Za={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:je},er={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():je(n)}},tr={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new $(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:je},Qt=n=>typeof n=="bigint"||Number.isInteger(n);function In(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function bs(n,e,t){const{value:s}=n;if(Qt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return je(n)}const nr={identify:Qt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>In(n,2,2,t),stringify:n=>bs(n,2,"0b")},sr={identify:Qt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>In(n,1,8,t),stringify:n=>bs(n,8,"0")},ir={identify:Qt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>In(n,0,10,t),stringify:je},ar={identify:Qt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>In(n,2,16,t),stringify:n=>bs(n,16,"0x")};class It extends xe{constructor(e){super(e),this.tag=It.tag}add(e){let t;ae(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Ie(e.key,null):t=new Ie(e,null),ct(this.items,t.key)||this.items.push(t)}get(e,t){const s=ct(this.items,e);return!t&&ae(s)?J(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=ct(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new Ie(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(fs(r,null,s));return a}}It.tag="tag:yaml.org,2002:set";const ws={collection:"map",identify:n=>n instanceof Set,nodeClass:It,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>It.from(n,e,t),resolve(n,e){if(zt(n)){if(n.hasAllNullValues(!0))return Object.assign(new It,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function vs(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function Ai(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return je(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Ci={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>vs(n,t),stringify:Ai},Ti={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>vs(n,!1),stringify:Ai},Nn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Nn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let f=vs(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},$s=[Tt,Mt,Sn,kn,Ni,Li,nr,sr,ir,ar,Za,er,tr,ps,Je,ys,gs,ws,Ci,Ti,Nn],Bs=new Map([["core",za],["failsafe",[Tt,Mt,Sn]],["json",Xa],["yaml11",$s],["yaml-1.1",$s]]),Fs={binary:ps,bool:hs,float:bi,floatExp:yi,floatNaN:gi,floatTime:Ti,int:_i,intHex:Si,intOct:vi,intTime:Ci,map:Tt,merge:Je,null:kn,omap:ys,pairs:gs,seq:Mt,set:ws,timestamp:Nn},rr={"tag:yaml.org,2002:binary":ps,"tag:yaml.org,2002:merge":Je,"tag:yaml.org,2002:omap":ys,"tag:yaml.org,2002:pairs":gs,"tag:yaml.org,2002:set":ws,"tag:yaml.org,2002:timestamp":Nn};function Fn(n,e,t){const s=Bs.get(e);if(s&&!n)return t&&!s.includes(Je)?s.concat(Je):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Bs.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Je)),i.reduce((a,r)=>{const o=typeof r=="string"?Fs[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(Fs).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const or=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class _s{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Fn(e,"compat"):e?Fn(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?rr:{},this.tags=Fn(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,tt,{value:Tt}),Object.defineProperty(this,Ye,{value:Sn}),Object.defineProperty(this,At,{value:Mt}),this.sortMapEntries=typeof r=="function"?r:r===!0?or:null}clone(){const e=Object.create(_s.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function lr(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=di(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(Ge(c,""))}let r=!1,o=null;if(n.contents){if(ie(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(Ge(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=Nt(n.contents,i,()=>o=null,c);o&&(u+=lt(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(Nt(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(Ge(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(Ge(a(c),"")))}return t.join(`
`)+`
`}class Ln{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,$e,{value:Zn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new Ee({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Ln.prototype,{[$e]:{value:Zn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=ie(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){gt(this.contents)&&this.contents.add(e)}addIn(e,t){gt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=ri(this);e.anchor=!t||s.has(t)?oi(t||"a",s):t}return new us(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=y=>typeof y=="number"||y instanceof String||y instanceof Number,k=t.filter(g).map(String);k.length>0&&(t=t.concat(k)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:f,setAnchors:h,sourceObjects:m}=$a(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},p=Wt(e,u,b);return o&&se(p)&&(p.flow=!0),h(),p}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new Ie(i,a)}delete(e){return gt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Dt(e)?this.contents==null?!1:(this.contents=null,!0):gt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return se(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Dt(e)?!t&&J(this.contents)?this.contents.value:this.contents:se(this.contents)?this.contents.getIn(e,t):void 0}has(e){return se(this.contents)?this.contents.has(e):!1}hasIn(e){return Dt(e)?this.contents!==void 0:se(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=hn(this.schema,[e],t):gt(this.contents)&&this.contents.set(e,t)}setIn(e,t){Dt(e)?this.contents=t:this.contents==null?this.contents=hn(this.schema,Array.from(e),t):gt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Ee({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new Ee({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new _s(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Re(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?_t(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return lr(this,e)}}function gt(n){if(se(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Mi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Ht extends Mi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class cr extends Mi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Vs=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function Lt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,f="",h="",m=!1,b=!1,p=null,g=null,k=null,y=null,E=null,v=null,N=null;for(const L of n)switch(b&&(L.type!=="space"&&L.type!=="newline"&&L.type!=="comma"&&a(L.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),p&&(c&&L.type!=="comment"&&L.type!=="newline"&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),p=null),L.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&L.source.includes("	")&&(p=L),u=!0;break;case"comment":{u||a(L,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const B=L.source.substring(1)||" ";f?f+=h+B:f=B,h="",c=!1;break}case"newline":c?f?f+=L.source:(!v||t!=="seq-item-ind")&&(l=!0):h+=L.source,c=!0,m=!0,(g||k)&&(y=L),u=!0;break;case"anchor":g&&a(L,"MULTIPLE_ANCHORS","A node can have at most one anchor"),L.source.endsWith(":")&&a(L.offset+L.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=L,N??(N=L.offset),c=!1,u=!1,b=!0;break;case"tag":{k&&a(L,"MULTIPLE_TAGS","A node can have at most one tag"),k=L,N??(N=L.offset),c=!1,u=!1,b=!0;break}case t:(g||k)&&a(L,"BAD_PROP_ORDER",`Anchors and tags must be after the ${L.source} indicator`),v&&a(L,"UNEXPECTED_TOKEN",`Unexpected ${L.source} in ${e??"collection"}`),v=L,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){E&&a(L,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),E=L,c=!1,u=!1;break}default:a(L,"UNEXPECTED_TOKEN",`Unexpected ${L.type} token`),c=!1,u=!1}const _=n[n.length-1],I=_?_.offset+_.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),p&&(c&&p.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:E,found:v,spaceBefore:l,comment:f,hasNewline:m,anchor:g,tag:k,newlineAfterProp:y,end:I,start:N??I}}function Yt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Yt(e.key)||Yt(e.value))return!0}return!1;default:return!0}}function ss(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Yt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Oi(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||J(a)&&J(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Us="All mapping items must start at the same column";function ur({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??xe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:h,key:m,sep:b,value:p}=f,g=Lt(h,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),k=!g.found;if(k){if(m&&(m.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(l,"BAD_INDENT",Us)),!g.anchor&&!g.tag&&!b){c=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||Yt(m))&&i(m??h[h.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Us);t.atKey=!0;const y=g.end,E=m?n(t,m,g,i):e(t,y,h,null,g,i);t.schema.compat&&ss(s.indent,m,i),t.atKey=!1,Oi(t,o.items,E)&&i(y,"DUPLICATE_KEY","Map keys must be unique");const v=Lt(b??[],{indicator:"map-value-ind",next:p,offset:E.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(l=v.end,v.found){k&&((p==null?void 0:p.type)==="block-map"&&!v.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<v.found.offset-1024&&i(E.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const N=p?n(t,p,v,i):e(t,l,b,null,v,i);t.schema.compat&&ss(s.indent,p,i),l=N.range[2];const _=new Ie(E,N);t.options.keepSourceTokens&&(_.srcToken=f),o.items.push(_)}else{k&&i(E.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),v.comment&&(E.comment?E.comment+=`
`+v.comment:E.comment=v.comment);const N=new Ie(E);t.options.keepSourceTokens&&(N.srcToken=f),o.items.push(N)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function dr({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??ut,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:f}of s.items){const h=Lt(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||f)(f==null?void 0:f.type)==="block-seq"?i(h.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(o.comment=h.comment);continue}const m=f?n(t,f,h,i):e(t,h.end,u,null,h,i);t.schema.compat&&ss(s.indent,f,i),l=m.range[2],o.items.push(m)}return o.range=[s.offset,l,c??l],o}function Xt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Vn="Block collections are not allowed within flow collections",Un=n=>n&&(n.type==="block-map"||n.type==="block-seq");function fr({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?xe:ut),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let k=0;k<s.items.length;++k){const y=s.items[k],{start:E,key:v,sep:N,value:_}=y,I=Lt(E,{flow:o,indicator:"explicit-key-ind",next:v??(N==null?void 0:N[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!I.found){if(!I.anchor&&!I.tag&&!N&&!_){k===0&&I.comma?i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):k<s.items.length-1&&i(I.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),I.comment&&(c.comment?c.comment+=`
`+I.comment:c.comment=I.comment),f=I.end;continue}!r&&t.options.strict&&Yt(v)&&i(v,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(k===0)I.comma&&i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(I.comma||i(I.start,"MISSING_CHAR",`Missing , between ${o} items`),I.comment){let L="";e:for(const B of E)switch(B.type){case"comma":case"space":break;case"comment":L=B.source.substring(1);break e;default:break e}if(L){let B=c.items[c.items.length-1];ae(B)&&(B=B.value??B.key),B.comment?B.comment+=`
`+L:B.comment=L,I.comment=I.comment.substring(L.length+1)}}if(!r&&!N&&!I.found){const L=_?n(t,_,I,i):e(t,I.end,N,null,I,i);c.items.push(L),f=L.range[2],Un(_)&&i(L.range,"BLOCK_IN_FLOW",Vn)}else{t.atKey=!0;const L=I.end,B=v?n(t,v,I,i):e(t,L,E,null,I,i);Un(v)&&i(B.range,"BLOCK_IN_FLOW",Vn),t.atKey=!1;const O=Lt(N??[],{flow:o,indicator:"map-value-ind",next:_,offset:B.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(O.found){if(!r&&!I.found&&t.options.strict){if(N)for(const x of N){if(x===O.found)break;if(x.type==="newline"){i(x,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}I.start<O.found.offset-1024&&i(O.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else _&&("source"in _&&((g=_.source)==null?void 0:g[0])===":"?i(_,"MISSING_CHAR",`Missing space after : in ${o}`):i(O.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const S=_?n(t,_,O,i):O.found?e(t,O.end,N,null,O,i):null;S?Un(_)&&i(S.range,"BLOCK_IN_FLOW",Vn):O.comment&&(B.comment?B.comment+=`
`+O.comment:B.comment=O.comment);const M=new Ie(B,S);if(t.options.keepSourceTokens&&(M.srcToken=y),r){const x=c;Oi(t,x.items,B)&&i(L,"DUPLICATE_KEY","Map keys must be unique"),x.items.push(M)}else{const x=new xe(t.schema);x.flow=!0,x.items.push(M);const re=(S??B).range;x.range=[B.range[0],re[1],re[2]],c.items.push(x)}f=S?S.range[2]:O.end}}const h=r?"}":"]",[m,...b]=s.end;let p=f;if((m==null?void 0:m.source)===h)p=m.offset+m.source.length;else{const k=o[0].toUpperCase()+o.substring(1),y=u?`${k} must end with a ${h}`:`${k} in block collection must be sufficiently indented and end with a ${h}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",y),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const k=Xt(b,p,t.options.strict,i);k.comment&&(c.comment?c.comment+=`
`+k.comment:c.comment=k.comment),c.range=[s.offset,p,k.offset]}else c.range=[s.offset,p,p];return c}function Dn(n,e,t,s,i,a){const r=t.type==="block-map"?ur(n,e,t,s,a):t.type==="block-seq"?dr(n,e,t,s,a):fr(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function hr(n,e,t,s,i){var h;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,p=m&&a?m.offset>a.offset?m:a:m??a;p&&(!b||b.offset<p.offset)&&i(p,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===xe.tagName&&o==="map"||r===ut.tagName&&o==="seq")return Dn(n,e,t,i,r);let l=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!l){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),l=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Dn(n,e,t,i,r)}const c=Dn(n,e,t,i,r,l),u=((h=l.resolve)==null?void 0:h.call(l,c,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??c,f=ie(u)?u:new $(u);return f.range=c.range,f.tag=r,l!=null&&l.format&&(f.format=l.format),f}function mr(n,e,t){const s=e.offset,i=pr(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?$.BLOCK_FOLDED:$.BLOCK_LITERAL,r=e.source?gr(e.source):[];let o=r.length;for(let p=r.length-1;p>=0;--p){const g=r[p][1];if(g===""||g==="\r")o=p;else break}if(o===0){const p=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:p,type:a,comment:i.comment,range:[s,g,g]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let p=0;p<o;++p){const[g,k]=r[p];if(k===""||k==="\r")i.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=g.length),u=p,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+k.length+1}for(let p=r.length-1;p>=o;--p)r[p][0].length>l&&(o=p+1);let f="",h="",m=!1;for(let p=0;p<u;++p)f+=r[p][0].slice(l)+`
`;for(let p=u;p<o;++p){let[g,k]=r[p];c+=g.length+k.length+1;const y=k[k.length-1]==="\r";if(y&&(k=k.slice(0,-1)),k&&g.length<l){const v=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-k.length-(y?2:1),"BAD_INDENT",v),g=""}a===$.BLOCK_LITERAL?(f+=h+g.slice(l)+k,h=`
`):g.length>l||k[0]==="	"?(h===" "?h=`
`:!m&&h===`
`&&(h=`

`),f+=h+g.slice(l)+k,h=`
`,m=!0):k===""?h===`
`?f+=`
`:h=`
`:(f+=h+k,h=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let p=o;p<r.length;++p)f+=`
`+r[p][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}const b=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,b,b]}}function pr({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let h=1;h<i.length;++h){const m=i[h];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:l===-1&&(l=n+h)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let h=1;h<e.length;++h){const m=e[h];switch(m.type){case"space":c=!0;case"newline":f+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),f+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const p=m.source;p&&typeof p=="string"&&(f+=p.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function gr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function yr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(h,m,b)=>t(s+h,m,b);switch(i){case"scalar":o=$.PLAIN,l=br(a,c);break;case"single-quoted-scalar":o=$.QUOTE_SINGLE,l=wr(a,c);break;case"double-quoted-scalar":o=$.QUOTE_DOUBLE,l=vr(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Xt(r,u,e,t);return{value:l,type:o,comment:f.comment,range:[s,u,f.offset]}}function br(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Pi(n)}function wr(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Pi(n.slice(1,-1)).replace(/''/g,"'")}function Pi(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function vr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=_r(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Sr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=kr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function _r(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Sr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function kr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function xi(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?mr(n,e,s):yr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[Ye]:l?c=Er(n.schema,i,l,t,s):e.type==="scalar"?c=Ir(n,i,e,s):c=n.schema[Ye];let u;try{const f=c.resolve(i,h=>s(t??e,"TAG_RESOLVE_FAILED",h),n.options);u=J(f)?f:new $(f)}catch(f){const h=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",h),u=new $(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function Er(n,e,t,s,i){var o;if(t==="!")return n[Ye];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Ye])}function Ir({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[Ye];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[Ye];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function Nr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const Lr={composeNode:Ri,composeEmptyNode:Ss};function Ri(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=Ar(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=xi(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=hr(Lr,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(f){const h=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",h)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return c??(c=Ss(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!J(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function Ss(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:Nr(e,t,s),indent:-1,source:""},f=xi(n,u,o,c);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=l),f}function Ar({options:n},{offset:e,source:t,end:s},i){const a=new us(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Xt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Cr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new Ln(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=Lt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Ri(c,i,u,r):Ss(c,u.end,s,null,u,r);const f=l.contents.range[2],h=Xt(a,f,!1,r);return h.comment&&(l.comment=h.comment),l.range=[t,f,h.offset],l}function Bt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ds(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Tr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Bt(t);a?this.warnings.push(new cr(r,s,i)):this.errors.push(new Ht(r,s,i))},this.directives=new Ee({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ds(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(se(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ae(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ds(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Bt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Cr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Ht(Bt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Ht(Bt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Xt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Ht(Bt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Ln(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const $i="\uFEFF",Bi="",Fi="",is="";function Mr(n){switch(n){case $i:return"byte-order-mark";case Bi:return"doc-mode";case Fi:return"flow-error-end";case is:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ue(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Hs=new Set("0123456789ABCDEFabcdef"),Or=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),rn=new Set(",[]{}"),Pr=new Set(` ,[]{}
\r	`),Hn=n=>!n||Pr.has(n);class xr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ue(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===$i&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Bi,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ue(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ue(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ue(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Hn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ue(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Fi,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Hn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ue(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ue(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield is,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ue(a)||e&&rn.has(a))break;t=s}else if(Ue(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&rn.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&rn.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield is,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Hn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ue(t)||e&&rn.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ue(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Or.has(t))t=this.buffer[++e];else if(t==="%"&&Hs.has(this.buffer[e+1])&&Hs.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Rr{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Ze(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function js(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Vi(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function on(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function yt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function qs(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Ze(e.start,"explicit-key-ind")&&!Ze(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Vi(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class $r{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new xr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Mr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&qs(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&js(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{js(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=on(this.peek(2)),s=yt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ze(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Vi(t.key)&&!Ze(t.sep,"newline")){const o=yt(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ze(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=yt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ze(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Ze(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Ze(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=on(s),a=yt(i);qs(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=on(e),s=yt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=on(e),s=yt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Br(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Rr||null,prettyErrors:e}}function Fr(n,e={}){const{lineCounter:t,prettyErrors:s}=Br(e),i=new $r(t==null?void 0:t.addNewLine),a=new Tr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Ht(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Vs(n,t)),r.warnings.forEach(Vs(n,t))),r}function Qe(n,e,t){let s;const i=Fr(n,t);if(!i)return null;if(i.warnings.forEach(a=>fi(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Vr=`# Simulation family catalog source-of-truth.
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
`,Ur=`# Parameter definitions for each simulation family.
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
`,Dr=`# Summary overlay display configuration for each simulation family.
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
`,Hr=`# Live telemetry HUD display configuration for each simulation family.
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
      precision: 2
    - id: impactor_velocity
      value: '12.0'
      unit: km/s
      live: false
      precision: 2
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
      precision: 2
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
`;function te(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}function Ui(n,e,t){const s=n.indexOf("#"),i=s>=0?n.slice(0,s):n,a=s>=0?n.slice(s):"",r=new RegExp(`([?&])${jr(e)}=[^&#]*`);if(r.test(i))return`${i.replace(r,`$1${e}=${encodeURIComponent(t)}`)}${a}`;const o=i.includes("?")?"&":"?";return`${i}${o}${e}=${encodeURIComponent(t)}${a}`}function jr(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const qr=Qe(Vr),Kr=Qe(Ur),jn=Qe(Dr),Wr=Qe(Hr),bt=Object.entries(qr).map(([n,e])=>{var r,o,l;const t=Yr(jn[n]),s=(((r=jn[n])==null?void 0:r.results)??[]).map(Gr),i=((o=Wr[n])==null?void 0:o.liveStats)??[],a=Kr[n]??{};return{id:n,label:e.label,placeholderImage:te(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(as),liveStats:i.map(as),morphologyChecklist:(l=jn[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const f=u.quali_labels,h=f!==void 0&&f.length>0,m=h?0:u.min,b=h?f.length-1:u.max,p=h?1:u.step??zr(u.min,u.max),g=h?Math.floor(f.length/2):u.log_scale?Math.sqrt(u.min*u.max):Jr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:m,max:b,step:p,fallbackValue:g,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:f,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Yr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function as(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Gr(n){return{...as(n),target:n.target}}function zr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Jr(n,e){return n+(e-n)/2}const Di="universe-engine-theme",Hi=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Qr(){const n=localStorage.getItem(Di);return Zr(n)?n:"glass"}function qn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Di,n)}function Xr(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Hi){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function Zr(n){return Hi.some(e=>e.id===n)}let ve=null,De="primary";function eo(n,e=null){ve={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function to(){ve=null,De="primary"}function no(n){De=n}function so(n){return n==="local"?{mode:"local",base:null}:ve?{mode:De,base:ji()}:{mode:"primary",base:null}}function We(n){if(!ve)return n;const e=ji();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!Ws(t,ve.primaryBase)&&(!ve.backupBase||!Ws(t,ve.backupBase))?n:Ys(e,`${t.pathname}${t.search}${t.hash}`)}return Ys(e,n)}async function et(n,e){const t=We(n),s=!!(ve!=null&&ve.backupBase)&&De==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Ks(n,e);return a.ok&&(De="backup"),a}catch(i){if(!s)throw i;const a=await Ks(n,e);return a.ok&&(De="backup"),a}}function ji(){return ve?De==="backup"&&ve.backupBase?ve.backupBase:ve.primaryBase:null}async function Ks(n,e){if(!(ve!=null&&ve.backupBase))throw new Error("Backup asset host is not configured.");const t=De;De="backup";try{const s=await fetch(We(n),e);return s.ok||(De=t),s}catch(s){throw De=t,s}}function Ws(n,e){const t=new URL(e);return n.origin===t.origin}function Ys(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function io(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.crossOrigin="anonymous",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,f=new Map;let h=null,m=null;const b=document.createElement("canvas"),p=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function k(){h&&(URL.revokeObjectURL(h),h=null)}function y(A,P={}){const F=u.get(A);F&&(u.delete(A),P={...P,ownedObjectUrl:!0},A=F),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(A)){s.classList.remove("fade-out");return}const G=s.muted,H=P.seekFraction;k(),m=null,h=P.ownedObjectUrl?A:null,s.src=A,s.load(),s.onloadeddata=()=>{if(s.muted=G,H!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const de=Math.max(0,Math.min(.999,H));s.currentTime=de*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),P.autoplay&&s.play().catch(()=>{})}},120)}function E(A){s.muted=A}async function v(){await s.play()}function N(){s.pause()}function _(){s.classList.add("is-empty")}function I(){s.classList.remove("is-empty")}function L(A){if(!Number.isFinite(s.duration)||s.duration<=0)return;const P=Math.max(0,Math.min(1,A));s.currentTime=P*s.duration}function B(){s.currentTime=0,i==null||i(0)}function O(A=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const F=()=>{H(),P()},G=window.setTimeout(()=>{H(),P()},Math.max(0,A));function H(){window.clearTimeout(G),s.removeEventListener("loadeddata",F)}s.addEventListener("loadeddata",F,{once:!0})})}function S(A,P=8e3){const F=Math.max(0,A);return F===0||x(F)?Promise.resolve():new Promise(G=>{const H=()=>{x(F)&&(z(),G())},de=window.setTimeout(()=>{z(),G()},Math.max(0,P));function z(){window.clearTimeout(de),s.removeEventListener("progress",H),s.removeEventListener("canplay",H),s.removeEventListener("loadeddata",H)}s.addEventListener("progress",H),s.addEventListener("canplay",H),s.addEventListener("loadeddata",H),H()})}function M(A=800){return!s.seeking&&s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const F=()=>{s.seeking||s.readyState<HTMLMediaElement.HAVE_CURRENT_DATA||(H(),P())},G=window.setTimeout(()=>{H(),P()},Math.max(0,A));function H(){window.clearTimeout(G),s.removeEventListener("seeked",F),s.removeEventListener("canplay",F),s.removeEventListener("loadeddata",F)}s.addEventListener("seeked",F),s.addEventListener("canplay",F),s.addEventListener("loadeddata",F),F()})}function x(A){const P=s.currentTime;for(let F=0;F<s.buffered.length;F+=1){const G=s.buffered.start(F),H=s.buffered.end(F);if(!(P<G||P>H))return H-P>=A}return!1}function re(A){o=new Set(A.filter(Boolean).filter(P=>P!==s.currentSrc)),l||Q()}function he(){l=!0,K(),ge()}function W(){if(!l){Q();return}l=!1,Q()}function Q(){for(const[A,P]of c.entries())o.has(A)||(P.removeAttribute("src"),P.load(),c.delete(A));for(const[A,P]of f.entries())o.has(A)||(P.abort(),f.delete(A));for(const A of o){if(!c.has(A)){const P=document.createElement("video");P.preload="auto",P.crossOrigin="anonymous",P.muted=!0,P.playsInline=!0,P.src=We(A),P.load(),c.set(A,P)}u.has(A)||f.has(A)||ce(A)}}function K(){for(const A of c.values())A.removeAttribute("src"),A.load();c.clear()}function ge(){for(const A of f.values())A.abort();f.clear()}function ce(A){const P=new AbortController;f.set(A,P);const F=Ui(A,"_",`${Date.now()}`);et(F,{signal:P.signal}).then(async G=>{if(!G.ok)return;const H=await G.blob();o.has(A)&&u.set(A,URL.createObjectURL(H))}).catch(G=>{G instanceof DOMException&&G.name}).finally(()=>{f.get(A)===P&&f.delete(A)})}function ue(){o.clear(),l=!1,K(),ge();for(const A of u.values())URL.revokeObjectURL(A);u.clear()}function Y(A){return u.get(A)??null}function Te(){if(!(!p||s.readyState<2||s.videoWidth===0||s.videoHeight===0)){b.width=s.videoWidth,b.height=s.videoHeight;try{p.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85)}catch{m=null}}}function Ne(){return Te(),m}function ye(A){i=A}function oe(A){a=A}return{setSource:y,setMuted:E,play:v,pause:N,hideMedia:_,showMedia:I,seekToFraction:L,resetPlayback:B,waitForLoadedData:O,waitForBufferedAhead:S,waitForSeekSettled:M,onTimeUpdate:ye,onEnded:oe,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getCurrentTimeSeconds:()=>Number.isFinite(s.currentTime)?s.currentTime:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:A=>{g=A,s.playbackRate=A},getPlaybackRate:()=>g,onPlayStateChange:A=>{r=A},getElement:()=>t,prewarmSources:re,suspendPrewarming:he,resumePrewarming:W,clearPrewarmedSources:ue,getPrewarmedBlobUrl:Y,captureFrame:Ne}}const ao=[.25,.5,1,2];function ro(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");let f=!1;u.className="timeline";const h=document.createElement("div");h.className="timeline__bar-row";const m=document.createElement("div");m.className="timeline__audio is-hidden";const b=document.createElement("button");b.className="timeline__audio-btn",b.type="button",b.setAttribute("aria-label","Toggle audio mute"),b.innerHTML=oo(),b.addEventListener("click",()=>r==null?void 0:r()),m.appendChild(b);const p=document.createElement("button");p.className="timeline__play-btn",p.type="button",p.setAttribute("aria-label","Toggle playback"),p.addEventListener("click",()=>s==null?void 0:s());const g=document.createElement("input");g.className="timeline__slider",g.type="range",g.min="0",g.max="1000",g.step="1",g.value="0",g.style.setProperty("--fill","0%"),g.setAttribute("aria-label","Simulation time");const k=document.createElement("div");k.className="timeline__speed";const y=document.createElement("button");y.className="timeline__speed-btn",y.type="button",y.setAttribute("aria-label","Playback speed"),y.addEventListener("click",()=>{k.classList.toggle("open")});const E=document.createElement("div");E.className="timeline__speed-menu";for(const _ of ao){const I=document.createElement("button");I.className="timeline__speed-option",I.type="button",I.textContent=Kn(_),I.addEventListener("click",()=>{k.classList.remove("open"),i==null||i(_)}),E.appendChild(I)}k.appendChild(y),k.appendChild(E);const v=document.createElement("button");return v.className="timeline__summary-btn",v.type="button",v.setAttribute("aria-label","View run summary"),v.textContent="ⓘ",v.addEventListener("click",()=>a==null?void 0:a()),h.appendChild(m),h.appendChild(p),h.appendChild(g),h.appendChild(k),h.appendChild(v),g.addEventListener("input",()=>{const _=parseInt(g.value,10)/1e3;g.style.setProperty("--fill",`${_*100}%`),t==null||t(_)}),g.addEventListener("pointerdown",()=>{f||(f=!0,o==null||o())}),g.addEventListener("pointerup",()=>{f&&(f=!1,l==null||l())}),g.addEventListener("change",()=>{f&&(f=!1,l==null||l())}),document.addEventListener("click",_=>{k.contains(_.target)||k.classList.remove("open")}),u.appendChild(h),n.appendChild(u),N(c),{setPosition(_){const I=Math.max(0,Math.min(1,_));g.value=String(Math.round(I*1e3)),g.style.setProperty("--fill",`${I*100}%`)},setPlaying(_){p.textContent=_?"❚❚︎":"▶︎",p.classList.toggle("is-paused",!_),p.setAttribute("aria-label",_?"Pause":"Play")},setSpeed(_){N(_)},setAudioVisible(_){m.hidden=!_,m.classList.toggle("is-hidden",!_)},setMuted(_){b.classList.toggle("is-muted",_),b.setAttribute("aria-label",_?"Unmute audio":"Mute audio")}};function N(_){y.textContent=Kn(_);for(const I of E.children)I.classList.toggle("is-active",I.textContent===Kn(_))}}function Kn(n){return`x${n}`}function oo(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function lo(n,e){const t=Math.min(qi(e),2);return n.toFixed(t)}function He(n,e){return e?`${n} ${e}`:n}function An(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?Ft(n):e<1e6?`${t}${Ft(n/1e3)}k`:e<1e9?`${t}${Ft(n/1e6)}M`:e<1e12?`${t}${Ft(n/1e9)}B`:`${t}${Ft(n/1e12)}T`:String(n)}function Ft(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function co(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function pn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return An(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function kt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?An(i):lo(i,a)}function qi(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function uo(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=fo(s,i,a);for(const o of s.metadata.liveStats){const l=mo(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function fo(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":kt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:ho(a),value:r}]))}}function ho(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function mo(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=po((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:He(a,n.unit)}}function po(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return typeof e.precision=="number"&&!e.integer?a.toFixed(Math.max(0,e.precision)):t?e.integer?An(Math.round(a)):go(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):co(n,{integer:e.integer})}function go(n){const e=Math.abs(n),t=n<0?"−":"";return e<1e3?n.toFixed(2):e<1e6?`${t}${(e/1e3).toFixed(2)}k`:e<1e9?`${t}${(e/1e6).toFixed(2)}M`:e<1e12?`${t}${(e/1e9).toFixed(2)}B`:`${t}${(e/1e12).toFixed(2)}T`}function Ki(){const n=te("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(bo()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function yo(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function bo(){return yo(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const wo={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function vo(n,e,t){const s=te("assets/banner-1600.webp"),i=[`${te("assets/banner-960.webp")} 960w`,`${te("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(h){o.innerHTML="";for(const m of h){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const p=wo[m.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${p}</span>
      `,b.addEventListener("click",()=>t(m)),o.appendChild(b)}}l(e);const{infoButton:c,infoModal:u,close:f}=Ki();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){f(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(h){l(h)}}}function _o(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(v=>[v.id,v.target])),a=n.metadata.results.map(v=>{const N=Yn(n,e,s,v.id);return N===null?null:{id:v.id,value:N,target:v.target}}).filter(v=>v!==null),r=n.parameters.filter(v=>i[v.id]!==void 0).map(v=>{const N=e[v.id]??v.fallbackValue,_=i[v.id]??v.fallbackValue;return Math.abs(N-_)/Math.max(v.max-v.min,1e-9)}),o=r.reduce((v,N)=>v+N,0)/Math.max(r.length,1),l=Eo(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,h=`${Wn(u,1)} CPU-hrs
${Wn(f,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,p=String(n.parameters.length+6),g="Present",k=ko((s==null?void 0:s.wallclockSeconds)??t),y=Gs(zs(Yn(n,e,s,"moon_iron"))),E=Gs(zs(Yn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:k},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:h},memoryUsed:{label:"Memory Used",value:Wn(f,1)},particlesUpdated:{label:"Particle updates",value:s?So(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:y},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:E},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:p},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([v,N])=>[v,{label:N.label,value:N.value}]))}}function So(n){return String(Math.max(0,n))}function ko(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Wn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Yn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Gs(n){return n===null?"--":n.toFixed(1)}function zs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function Eo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const rs={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},Io={HIDE_AFTER_MS:980},Wi="https://media.universemakers.org/engine/run-manifest.json",Gn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",No="https://universe-engine.universe-engine.workers.dev/api/track-run",Lo=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
# Each section is a simulation family (theme).
# Each entry maps situation keys (greenLow, greenHigh, amberLow, amberHigh,
# redLow, redHigh) to descriptive message text.
# Entries are keyed by stable result ids so authored copy survives label tweaks.

planetary:
  moon_mass:
    greenLow: Spot on!  Your moon — or the moon that could grow out of your orbiting debris disk — came out just a fraction lighter than our real one.
    greenHigh: Spot on!  Your moon — or the moon that could grow out of your orbiting debris disk — came out just a fraction heavier than our real one.
    amberLow: A bit light.  Slightly too little material made it into orbit, or with not enough spin ("angular momentum"), so this impact would make a moon a bit smaller than ours.
    amberHigh: A bit heavy.  A lot of material made it into orbit, so this impact would make a moon even bigger than ours.
    redLow: Very light.  Not much material made it into orbit — this impact would make a moon much smaller than ours, or maybe no moon at all.
    redHigh: That's a big moon!  So much material was flung into orbit that this impact would make a moon far larger than ours.
  earth_mass:
    greenLow: Spot on.  The planet ended up a fraction lighter than our Earth — well within range.
    greenHigh: Spot on.  The planet ended up a fraction heavier than our Earth — well within range.
    amberLow: A bit light.  A little too much was lost in the collision, leaving Earth slightly underweight.
    amberHigh: A bit heavy.  A little too much material merged with the planet, leaving Earth slightly overweight.
    redLow: Far too light.  This impact stripped away too much material, or not enough material was added, leaving a planet far smaller than our Earth.
    redHigh: Far too heavy.  Lots of material was added with very little removed, so this planet ends up far more massive than our Earth.
  spin:
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
`,Js=(()=>{const n=Qe(Lo),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),gn="#4CD98A",os="#E8951C",Yi="#D7372A",Gi=.2,zi=.5,Qs=2;function Ji(n){const e=Math.abs(n-1);return e<=Gi?{word:"On target",colour:gn}:e<=zi?{word:n>1?"Too high":"Too low",colour:os}:{word:n>1?"Way too high":"Way too low",colour:Yi}}function Ao(n){const e=Math.abs(n-1),t=n>=1;return e<=Gi?t?"greenHigh":"greenLow":e<=zi?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Co(n){return Math.min(Math.max(n,0),Qs)/Qs*100}function To(n){return n>=85?{word:"Almost perfect",colour:gn}:n>=65?{word:"Really close",colour:gn}:n>=45?{word:"Getting there",colour:os}:n>=25?{word:"Not quite",colour:os}:{word:"Way off - try again",colour:Yi}}function Mo(n,e,t){var r,o;const s=Ao(t),i=((r=Js[n])==null?void 0:r[s])??((o=Js[e])==null?void 0:o[s]);return i||(Ji(t).colour===gn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Oo(n,e,t){return n.metadata.results.map(s=>{const i=Po(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=xo(s,n,t),o=Mo(s.id,r,a),l=He(Qi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function Po(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=Ro((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function xo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Ro(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function $o(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Bo(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const f=document.createElement("button"),h=document.createElement("button");f.className="summary-overlay__button summary-overlay__button--primary",f.type="button",f.textContent="New Parameters",h.className="summary-overlay__button",h.type="button",h.textContent="Home",h.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),h.addEventListener("click",e.onHome),c.appendChild(f),c.appendChild(u),c.appendChild(h),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),k=m.querySelector(".sci-modal__close"),y=new Set;let E=!1,v=null,N=null;function _(O){const S=Ji(O.value);b.textContent=O.label,p.textContent=S.word,p.style.color=S.colour,p.hidden=!1,g.textContent=O.detail,m.classList.remove("is-hidden")}function I(O,S){b.textContent=O,p.hidden=!0,g.textContent=S,m.classList.remove("is-hidden")}function L(){m.classList.add("is-hidden")}k.addEventListener("click",L),m.addEventListener("click",O=>{O.target===m&&L()}),t.addEventListener("click",O=>{O.target===t&&e.onReplay()});function B(O,S){const M=document.createElement("div");M.className=`${O.className} panel`,M.innerHTML=`<p class="sci-section__title">${O.title}</p>`;const x=document.createElement("div"),re=O.singleRow?Math.max(1,O.stats.length):Math.max(1,Math.min(O.stats.length,O.maxColumns));x.className="metric-grid",O.singleRow&&x.classList.add("metric-grid--single-row"),x.style.setProperty("--summary-grid-columns",String(re)),x.style.setProperty("--summary-grid-max-width",`${O.maxWidthRem}rem`);for(const he of O.stats){const W=Fo(he,S),Q=document.createElement("div"),K=document.createElement("span"),ge=document.createElement("span");Q.className="res-card",K.className="res-card__label",K.textContent=W.label,ge.className="res-card__value",ge.textContent=W.value,Q.appendChild(K),Q.appendChild(ge),he.description&&(Q.classList.add("res-card--has-info"),Q.addEventListener("click",()=>{I(W.label,he.description)})),x.appendChild(Q)}return M.appendChild(x),M}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,E&&(y.clear(),E=!1)},Io.HIDE_AFTER_MS)},resetGalaxyChecklist(){var O;y.clear(),E=!1,N=v;for(const S of r.querySelectorAll(".galaxy-summary__check")){S.classList.remove("is-found");const M=S.querySelector(".galaxy-summary__check-box");M&&(M.textContent="")}(O=r.querySelector(".galaxy-summary__done"))==null||O.remove()},setHomeVisible(O){h.hidden=!O},update(O,S,M,x,re,he){var F,G,H,de,z,_e;r.innerHTML="",L();const W=_o(O,S,M,x),Q=O.metadata.summaryStats,K=Oo(O,S,x),ge=new Set(K.map(D=>D.id));let ce;if(K.length>0)ce=$o(K);else{const D=((F=W.similarityScore)==null?void 0:F.value)??"0/100";ce=parseInt(D,10)||0}const ue=To(ce),Y=document.createElement("div"),Te=document.createElement("div"),Ne=document.createElement("div");Y.className="sci-top",Te.className="summary-main-column",Ne.className="summary-side-column";const ye=document.createElement("div");ye.className="sci-hero panel",re?(ye.classList.add("sci-hero--thumbnail"),ye.innerHTML=`<img class="sci-hero__thumbnail" src="${re}" alt="Final frame of simulation" />`):ye.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${ce}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${ue.colour}">${ue.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${ce}%; background:${ue.colour}; box-shadow:0 0 12px ${ue.colour}"></div>
          </div>
        `,Te.appendChild(ye);const oe=Q.filter(D=>(D.section??"resources")==="resources"&&!K.some(X=>X.id===String(D.id))&&D.id!=="similarityScore"),A=Q.filter(D=>D.section==="simulationStats"&&!ge.has(String(D.id)));oe.length>0&&Ne.appendChild(B({title:"Resources Used",className:"res-section",stats:oe,maxColumns:3,maxWidthRem:48},W)),A.length>0&&Ne.appendChild(B({title:"Simulation Stats",className:"res-section",stats:A,maxColumns:A.length,maxWidthRem:48,singleRow:!0},W)),Y.appendChild(Te),Ne.childElementCount>0&&Y.appendChild(Ne),r.appendChild(Y);const P=O.metadata.morphologyChecklist;if(P&&P.length>0){const D=((H=(G=x==null?void 0:x.summaryMetrics)==null?void 0:G.morphology)==null?void 0:H.value)??null,X=(D==null?void 0:D.toLowerCase())??null,ee=new Set(P.map(U=>U.id));v=he??null,X&&ee.has(X)&&v!==N&&y.add(X),v!==N&&(N=null);const le=document.createElement("div");le.className="sci-bottom-row";const V=document.createElement("div");V.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",V.appendChild(Xs(O,S,I));const Se=((de=P.find(U=>U.id===X))==null?void 0:de.label)??D;if(Se){const U=document.createElement("div");U.className="sci-section panel param-section";const ne=document.createElement("p");ne.className="sci-section__title",ne.textContent="Galaxy Morphology";const Le=document.createElement("div");Le.className="res-card res-card--has-info";const Ke=document.createElement("span");Ke.className="res-card__value",Ke.textContent=Se,Le.appendChild(Ke),Le.addEventListener("click",()=>{var nt;return I("Galaxy Morphology",((nt=P.find(ht=>ht.id===(D??"").toLowerCase()))==null?void 0:nt.description)??`This galaxy is classified as "${Se}".`)}),U.appendChild(ne),U.appendChild(Le),V.appendChild(U)}le.appendChild(V);const me=document.createElement("div");me.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const Me=((_e=(z=x==null?void 0:x.summaryMetrics)==null?void 0:z.description)==null?void 0:_e.value)??null;if(Me){const U=document.createElement("div");U.className="sci-section panel",U.style.cssText="flex:0 1 auto; min-width:0;";const ne=document.createElement("p");ne.className="sci-section__title",ne.textContent="About This Galaxy";const Le=document.createElement("p");Le.className="galaxy-summary__desc-text",Le.textContent=Me,U.appendChild(ne),U.appendChild(Le),me.appendChild(U)}const Be=document.createElement("div");Be.className="sci-section panel",Be.style.cssText="flex:1; min-height:0;";const qe=document.createElement("p");qe.className="sci-section__title",qe.textContent="Morphology Scavenger Hunt";const Oe=document.createElement("div");Oe.className="galaxy-summary__checklist",Oe.style.cssText="flex:1; align-items:center;";const ft=P.every(U=>y.has(U.id));for(const U of P){const ne=document.createElement("div");ne.className="galaxy-summary__check",y.has(U.id)&&ne.classList.add("is-found"),ne.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${y.has(U.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${U.label}</span>
          `,U.hint&&(ne.classList.add("res-card--has-info"),ne.addEventListener("click",()=>I(U.label,U.hint))),Oe.appendChild(ne)}if(Be.appendChild(qe),Be.appendChild(Oe),ft){E=!0;const U=document.createElement("div");U.className="galaxy-summary__done",U.textContent="★ You've discovered all of the galaxy types. Well done! ★",Be.appendChild(U)}me.appendChild(Be),le.appendChild(me),r.appendChild(le)}else if(K.length>0){const D=document.createElement("div");D.className="sci-bottom-row",D.appendChild(Xs(O,S,I));const X=document.createElement("div"),ee=document.createElement("div"),le=document.createElement("p"),V=document.createElement("p");X.className="sci-section panel",ee.className="sci-section__header",le.className="sci-section__title",le.textContent="Similarity Results",V.className="sci-section__hint",V.textContent="Select any bar for details",ee.appendChild(le),ee.appendChild(V);const Se=document.createElement("div");Se.className="sci-bars";for(const me of K){const Me=document.createElement("div");Me.className="sci-bar",Me.innerHTML=`
            <div class="sci-bar__name">${me.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Co(me.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${me.formattedValue}</div>
          `,Me.addEventListener("click",()=>_(me)),Se.appendChild(Me)}X.appendChild(ee),X.appendChild(Se),D.appendChild(X),r.appendChild(D)}}}}function Fo(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Vo(s,n);if(i)return{label:n.label??t.label,value:i};const a=Qi(s,n);return{label:n.label??t.label,value:He(a,n.unit)}}function Xs(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const f=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":kt(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=He(f,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Vo(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?He(pn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):He(pn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):He(n,e.unit)}function Qi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return pn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return pn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return An(i)}function Uo(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=Do(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Ho()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Do(n){switch(n){case"icon_houdini":return Ce(`
        <rect x="4.5" y="8" width="9.8" height="8" rx="1.2"></rect>
        <path d="M14.3 10.1 19.5 7.3v9.4l-5.2-2.8Z"></path>
        <circle cx="8" cy="7" r="1.4"></circle>
        <circle cx="11.3" cy="7" r="1.4"></circle>
      `);case"icon_material":return Ce(`
        <path d="M12 4.6a7.4 7.4 0 1 0 7.4 7.4"></path>
        <path d="M12 12V4.6"></path>
        <path d="M12 12h7.4"></path>
        <path d="M12 8.8a3.2 3.2 0 0 1 3.2 3.2"></path>
        <path d="M12 12V8.8"></path>
        <path d="M12 12h3.2"></path>
      `);case"icon_temperature":return Ce(`
        <path d="M10.8 6.2a2.2 2.2 0 0 1 4.4 0v7.1a4.2 4.2 0 1 1-4.4 0Z"></path>
        <path d="M13 8.3v7.1"></path>
        <circle cx="13" cy="17.5" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"icon_pressure":return Ce(`
        <path d="M5.2 16a6.8 6.8 0 1 1 13.6 0"></path>
        <path d="M12 9.2v2"></path>
        <path d="M8.2 10.8 9.4 12"></path>
        <path d="M15.8 10.8 14.6 12"></path>
        <path d="M12 16 16.4 11.8"></path>
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"></circle>
      `);case"dark-matter":return Ce(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Ce(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Ce(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Ce(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Ce(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"turntable":return Ce(`
        <ellipse cx="12" cy="17.2" rx="7.6" ry="1.8"></ellipse>
        <path d="M12 6.2v6.4"></path>
        <path d="m12 6.2-2.6 2"></path>
        <path d="m12 6.2 2.6 2"></path>
        <path d="M12 12.6l-2.6-2"></path>
        <path d="M12 12.6l2.6-2"></path>
      `);case"large-scale-structure":return Ce(`
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
      `);case"line-trace":return Ce(`
        <path d="M3.5 14.5h3l2.2-5 2.8 9 2.4-6 1.8 2.5H20.5"></path>
        <path d="M3.5 19.5h17"></path>
        <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none"></circle>
        <circle cx="11.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"></circle>
      `);default:return null}}function Ce(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Ho(){return Ce(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const jo=`# Credits source-of-truth.
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
`;function qo(){const n=Qe(jo);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Ko(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:Wo(u),i.innerHTML="";const h=document.createElement("div");h.className="parameter-editor__heading",h.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(h);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function k(v,N){b.textContent=v,p.textContent=N,m.classList.remove("is-hidden")}function y(){m.classList.add("is-hidden")}g.addEventListener("click",y),m.addEventListener("click",v=>{v.target===m&&y()});const E=document.createElement("div");E.className="parameter-editor__list";for(const v of u.parameters)E.appendChild(l(v,k));i.appendChild(E),c()}function l(u,f){const h=document.createElement("div");h.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const p=u.displayUnit??u.unit,g=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,k=document.createElement("span");if(k.className="param-card__range",g){const _=u.qualiLabels;k.textContent=`${_[0]} – ${_[_.length-1]}`}else k.textContent=`${He(kt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)} – ${He(kt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}`;m.appendChild(b),m.appendChild(k);const y=document.createElement("input");y.className="param-card__slider",y.type="range";const E=r[u.id]??u.fallbackValue;if(g){const _=u.qualiLabels.length;y.min="0",y.max=String(_-1),y.step="any",y.value=String(Math.round(E))}else{const _=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max;y.min=String(_),y.max=String(I),y.step=u.logScale?"0.001":String(u.step),y.value=String(u.logScale?Math.log10(Math.max(E,Number.MIN_VALUE)):E)}y.setAttribute("aria-label",u.label);const v=document.createElement("span");v.className="res-card__value";function N(_){if(g){const I=Math.round(_),L=u.qualiLabels;r[u.id]=I,y.style.setProperty("--fill",`${ln(_,0,L.length-1)}%`),v.textContent=L[I]??String(I)}else{const I=u.logScale?10**_:_;r[u.id]=I,y.value=String(_),y.style.setProperty("--fill",`${ln(_,parseFloat(y.min),parseFloat(y.max))}%`),v.textContent=He(kt(I,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}c()}if(y.addEventListener("input",()=>{N(parseFloat(y.value))}),y.addEventListener("pointerdown",_=>_.stopPropagation()),y.addEventListener("click",_=>_.stopPropagation()),g){const _=Math.round(E),I=u.qualiLabels;y.style.setProperty("--fill",`${ln(_,0,I.length-1)}%`),v.textContent=I[_]??String(_)}else{const _=u.logScale?Math.log10(Math.max(E,Number.MIN_VALUE)):E;y.style.setProperty("--fill",`${ln(_,parseFloat(y.min),parseFloat(y.max))}%`),v.textContent=He(kt(E,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}if(u.description){h.classList.add("res-card--has-info"),h.setAttribute("title",u.description);const _=document.createElement("span");_.className="param-card__info-btn",_.setAttribute("aria-label","Parameter description"),_.textContent="ⓘ",m.appendChild(_),h.addEventListener("click",()=>{f(u.label,u.description)})}return h.appendChild(m),h.appendChild(y),h.appendChild(v),h}function c(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Wo(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function ln(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Xi="universe-engine-advanced-settings",Yo="RSSSE26UM_Engine";function yn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Go(n){const e=localStorage.getItem(Xi);if(!e)return yn();try{const t=JSON.parse(e);return Zi(t,n)}catch{return yn()}}function zo(n,e){const t=Zi(n,e);return localStorage.setItem(Xi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Zi(n,e){const t=yn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Jo(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Jo(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):yn().defaultAudioVolume}function Qo(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Xo(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
      <p class="config-overlay__media-subtitle"></p>
    </div>
  `,a.prepend(r);const o=a.querySelector(".config-overlay__media-subtitle"),l=document.createElement("img");l.className="config-overlay__chartermark",l.src=te("assets/credits/des9400-chartermark.webp"),l.alt="DES9400 SSE 2026 Chartermark",l.decoding="async",a.appendChild(l);const c=document.createElement("div");c.className="config-overlay__controls",c.dataset.view=e.initialView??"parameters";const u=document.createElement("div");u.className="config-overlay__header";const f=document.createElement("div");f.className="config-overlay__title-block",f.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const h=f.querySelector(".config-overlay__eyebrow"),m=f.querySelector(".config-overlay__title"),b=f.querySelector(".config-overlay__subtitle"),p=document.createElement("button");p.className="config-overlay__close",p.type="button",p.setAttribute("aria-label","Back"),p.textContent="←",u.appendChild(f),u.appendChild(p);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="parameters";const k=document.createElement("div");g.appendChild(k);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="settings";const E=document.createElement("div");E.className="config-overlay__settings-block",E.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const v=document.createElement("section");v.className="config-overlay__settings-group config-overlay__settings-block",v.innerHTML=`
    <p class="config-overlay__eyebrow">Galaxy checklist</p>
    <p class="config-overlay__settings-copy">Clear the galaxy scavenger-hunt progress and uncheck every morphology box for this session.</p>
  `;const N=document.createElement("button");N.className="advanced-settings__access",N.type="button",N.textContent="Reset Galaxy Checkboxes",N.addEventListener("click",()=>{e.onResetGalaxyChecklist()}),v.appendChild(N),y.appendChild(E),y.prepend(v);const _=document.createElement("section");_.className="audio-settings config-overlay__settings-block",_.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const I=document.createElement("label");I.className="advanced-settings__field advanced-settings__field--inline";const L=document.createElement("input"),B=document.createElement("span");L.type="checkbox",L.className="advanced-settings__checkbox",B.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,I.appendChild(L),I.appendChild(B),_.appendChild(I);const O=document.createElement("label");O.className="advanced-settings__field",O.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const S=document.createElement("input"),M=document.createElement("span");S.type="range",S.min="0",S.max="100",S.step="1",S.className="audio-settings__slider",M.className="audio-settings__value",O.appendChild(S),O.appendChild(M),_.appendChild(O),y.appendChild(_);const x=document.createElement("section");x.className="advanced-settings config-overlay__settings-block",x.dataset.state="closed",x.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const re=document.createElement("button");re.className="advanced-settings__access",re.type="button",re.textContent="Advanced Settings",x.appendChild(re);const he=document.createElement("div");he.className="advanced-settings__auth";const W=document.createElement("input");W.className="advanced-settings__password",W.type="password",W.placeholder="Enter password",W.autocomplete="off";const Q=document.createElement("button");Q.className="advanced-settings__unlock",Q.type="button",Q.textContent="Unlock";const K=document.createElement("p");K.className="advanced-settings__message",he.appendChild(W),he.appendChild(Q),he.appendChild(K),x.appendChild(he);const ge=document.createElement("div");ge.className="advanced-settings__form";const ce=document.createElement("label");ce.className="advanced-settings__field",ce.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const ue=document.createElement("select");ue.className="advanced-settings__select",ue.appendChild(new Option("None",""));for(const T of e.availableScales)ue.appendChild(new Option(T.label,T.id));ce.appendChild(ue),ge.appendChild(ce);const Y=document.createElement("div");Y.className="advanced-settings__field",Y.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const Te=document.createElement("div");Te.className="advanced-settings__options";const Ne=document.createElement("label"),ye=document.createElement("input");Ne.className="advanced-settings__choice",ye.type="radio",ye.name="manifest-source",ye.value="local",Ne.appendChild(ye),Ne.append("Local manifest");const oe=document.createElement("label"),A=document.createElement("input");oe.className="advanced-settings__choice",A.type="radio",A.name="manifest-source",A.value="online",oe.appendChild(A),oe.append("Online manifest"),Te.appendChild(Ne),Te.appendChild(oe),Y.appendChild(Te),ge.appendChild(Y);const P=document.createElement("label");P.className="advanced-settings__field advanced-settings__field--inline";const F=document.createElement("input"),G=document.createElement("span");F.type="checkbox",F.className="advanced-settings__checkbox",G.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,P.appendChild(F),P.appendChild(G),ge.appendChild(P);const H=document.createElement("div");H.className="advanced-settings__field",H.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const de=document.createElement("div");de.className="advanced-settings__options";const z=new Map;for(const T of e.availableScales){const j=document.createElement("label"),q=document.createElement("input");j.className="advanced-settings__choice",q.type="checkbox",q.value=T.id,z.set(T.id,q),j.appendChild(q),j.append(`Show ${T.label}`),de.appendChild(j)}H.appendChild(de),ge.appendChild(H),x.appendChild(ge),y.appendChild(x);const _e=document.createElement("section");_e.className="config-overlay__section config-overlay__section--grow",_e.dataset.section="credits",_e.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const D=_e.querySelector("[data-credits]"),X=qo();if(D.innerHTML="",X.length===0){const T=document.createElement("div");T.className="credits-list__entry",T.textContent="To be credited...",D.appendChild(T)}else for(const T of X)if(T.header){const j=document.createElement("div");j.className="credits-list__heading",j.textContent=T.text,D.appendChild(j)}else{const j=document.createElement("div");j.className="credits-list__entry";const q=document.createElement("span");if(q.className="credits-list__text",T.url){const be=document.createElement("a");be.className="credits-list__link",be.href=T.url,be.target="_blank",be.rel="noopener noreferrer",be.textContent=T.text,q.appendChild(be)}else q.textContent=T.text;j.appendChild(q),D.appendChild(j)}const ee=document.createElement("div");ee.className="config-overlay__footer";const le=document.createElement("button");le.className="run-button",le.type="button",le.textContent="Run",ee.appendChild(le),c.appendChild(u),c.appendChild(g),c.appendChild(y),c.appendChild(_e),c.appendChild(ee),i.appendChild(a),i.appendChild(c),s.appendChild(i),t.appendChild(s),n.appendChild(t);let V=Vt(e.advancedSettings),Se="closed",me=!e.advancedSettings.lockedScaleId;const Me=Ko(k,e.simClass,e.values,e.onValuesChange),Be=Xr(E,e.theme,e.onThemeChange);p.addEventListener("click",e.onClose),re.addEventListener("click",()=>{if(Se==="open"){U("closed");return}U("auth"),W.focus()}),Q.addEventListener("click",ft),W.addEventListener("keydown",T=>{T.key==="Enter"&&ft()}),ue.addEventListener("change",()=>{V.lockedScaleId=ue.value||null,Oe()}),ye.addEventListener("change",()=>{ye.checked&&(V.manifestSource="local")}),A.addEventListener("change",()=>{A.checked&&(V.manifestSource="online")}),F.addEventListener("change",()=>{V.verboseLogging=F.checked}),L.addEventListener("change",()=>{V.audioMutedByDefault=L.checked}),S.addEventListener("input",()=>{V.defaultAudioVolume=Number(S.value)/100,Ke()});for(const[T,j]of z.entries())j.addEventListener("change",()=>{if(Array.from(z.entries()).filter(([,be])=>be.checked).map(([be])=>be).length===0&&!V.lockedScaleId){j.checked=!0;return}V.hiddenScaleIds=Array.from(z.keys()).filter(be=>{var fe;return!((fe=z.get(be))!=null&&fe.checked)&&be!==V.lockedScaleId}),Oe()}),T===V.lockedScaleId&&(j.disabled=!0);qe(e.initialView??"parameters"),Oe(),ht(me);function qe(T){c.dataset.view=T,T==="parameters"?(h.textContent=e.simClass.label,m.textContent="Shape Your Simulation",b.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",o.textContent=e.simClass.label,o.hidden=!1,r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):T==="settings"?(h.textContent="Interface",m.textContent="Adjust The Control Room",b.textContent="Change the interface theme and manage exhibit-level options for this installation.",o.textContent="",o.hidden=!0,r.src=te("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(h.textContent="References",m.textContent="Project Sources And Attribution",b.textContent="Review the datasets, imagery, and supporting materials behind this experience.",o.textContent="",o.hidden=!0,r.src=te("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),T==="settings"?le.textContent="Apply":le.textContent="Run Simulation",ee.hidden=T==="credits",nt()}function Oe(){ue.value=V.lockedScaleId??"",ye.checked=V.manifestSource==="local",A.checked=V.manifestSource==="online",F.checked=V.verboseLogging,L.checked=V.audioMutedByDefault,S.value=String(Math.round(V.defaultAudioVolume*100)),Ke();for(const[T,j]of z.entries()){const q=V.lockedScaleId===T;j.checked=q||!V.hiddenScaleIds.includes(T),j.disabled=q}}function ft(){if(W.value!==Yo){K.textContent="Incorrect password";return}W.value="",K.textContent="",U("open")}function U(T){Se=T,x.dataset.state=T,re.textContent=T==="open"?"Hide Advanced Settings":"Advanced Settings",T!=="auth"&&(K.textContent="")}function ne(){W.value="",K.textContent="",U("closed")}function Le(){V=Vt(e.advancedSettings),Oe()}function Ke(){M.textContent=`${Math.round(Number(S.value))}%`}function nt(){const T=c.dataset.view,j=T==="settings"||T==="credits"||me;p.hidden=!j,p.classList.toggle("is-hidden",!j),p.setAttribute("aria-label",T==="parameters"?"Back":"Close"),p.textContent=T==="parameters"?"←":"×"}function ht(T){me=T,nt()}return le.addEventListener("click",()=>{if(c.dataset.view==="settings"){e.onApplySettings(Vt(V));return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),Le(),ne()},setSimulation(T,j){e.simClass=T,a.dataset.simClass=T.id,Me.setSimClass(T,j),c.dataset.view==="parameters"&&(r.src=T.placeholderImage,r.alt=`${T.label} preview`,qe("parameters"))},setTheme(T){Be.setActive(T)},setView(T){qe(T),T!=="settings"&&ne()},setAdvancedSettings(T){e.advancedSettings=Vt(T),V=Vt(T),Oe(),ne()},setBackVisible:ht}}function Vt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function Zo(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=rs,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const b of l)window.clearTimeout(b);l=[]}function f(b,p){return new Promise(g=>{const k=window.setTimeout(()=>{p===c&&g()},Math.max(0,b));l.push(k)})}async function h(b,p){const g=document.createElement("div");g.className="terminal__line";const k=m();g.appendChild(k),o.appendChild(g);for(let y=0;y<b.length;y+=1){if(p!==c)return;const E=b[y];g.insertBefore(document.createTextNode(E),k),o.scrollTop=o.scrollHeight,await f(e,p)}k.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,p,g,k){u(),c+=1;const y=c;i.hidden=!1,i.classList.remove("is-hidden");const E=performance.now(),v=(k==null?void 0:k.minTerminalTimeMs)??t;let N=!g,_=[...b];g&&g.then(()=>{N=!0});let I=0;for(;y===c;){_.length===0&&(_=[...b]);const B=Math.floor(Math.random()*_.length),[O]=_.splice(B,1),S=`${Zs(I)} ${O.text}`;if(I+=1,await h(S,y),y!==c)return;if(performance.now()-E>=v&&N)break}if(y!==c)return;const L=document.createElement("div");L.className="terminal__line terminal__line--syncing",L.textContent=`${Zs(I)} STARTING SIMULATION...`,o.appendChild(L),o.scrollTop=o.scrollHeight,await f(s,y),y===c&&p()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Zs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${zn(t)}:${zn(s)}:${zn(i)}]`}function zn(n){return String(n).padStart(2,"0")}function el(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{u(),e.onHome()}),r=c("Select Parameters",()=>{u(),e.onParameters()});s.appendChild(a),s.appendChild(r),s.appendChild(c("Settings",()=>{u(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{u(),e.onViewSelected("credits")}));const o=c("Fullscreen",()=>{var h;u(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});s.appendChild(o),n.appendChild(s);function l(){const h=o.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",l),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",h=>{n.contains(h.target)||u()}),f(e.showHome??!0),{close:u,setHomeVisible:f};function c(h,m){const b=document.createElement("button");return b.className="display-menu__item",b.type="button",b.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,b.addEventListener("click",m),b}function u(){n.classList.remove("open")}function f(h){a.hidden=!h,a.classList.toggle("is-hidden",!h),r.hidden=h,r.classList.toggle("is-hidden",h)}}const ea="universe-engine-playback-speed",tl=new Set([.25,.5,1,2]);function nl(){const n=localStorage.getItem(ea),e=n?Number(n):NaN;return tl.has(e)?e:1}function sl(n){localStorage.setItem(ea,String(n))}async function cn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function il(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const al=`# Initialization terminal script for the Planetary simulation family.
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
`,rl=`# Initialization terminal script for the Galaxy simulation family.
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
`,ol=`# Initialization terminal script for the Cosmos simulation family.
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
`,ll={planetary:al,galaxy:rl,cosmos:ol};function cl(n){return Qe(ll[n.id]).map(t=>({text:t}))}function Gt(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var f;const l=t[o.id]??o.fallbackValue,c=((f=n.parameters)==null?void 0:f[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function ul(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(u=>u.primary!==!1).map(u=>u.id)),i=new Set(e.filter(u=>u.primary===!1).map(u=>u.id));if(!e.some(u=>u.primary===!1))return Jn(n,e,t);const r=Jn(n,e,t,s);if(!r)return null;const o=Gt(r,e,t,s),l=1e-6,c=n.filter(u=>{const f=Gt(u,e,t,s);return Math.abs(f-o)<=l});return Jn(c,e,t,i)}function Jn(n,e,t,s){if(n.length===0)return null;let i=n[0],a=Gt(i,e,t,s);for(const r of n.slice(1)){const o=Gt(r,e,t,s);o<a&&(i=r,a=o)}return i}function dl(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function fl(n){try{const e=await et(n);if(!e.ok)return null;const t=await e.text(),s=Qe(t),i=wt(s.wallclockSeconds),a=wt(s.computeUsed),r=wt(s.memoryUsed),o=wt(s.carbonBurnt),l=wt(s.particlesUpdated),c=await hl(n),u=pl(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function hl(n){try{const e=await et(ml(n));if(!e.ok)return{};const t=await e.text(),s=Qe(t);return gl(s)}catch{return{}}}function ml(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function wt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function pl(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function gl(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=wt(s);i!==null&&(e[t]=i)}return e}const ta="[UniverseEngine]";let na=!1;function ei(n){na=n}function sa(){return na}function pe(n,e){sa()&&console.info(ta,n,e??"")}function ze(n,e){sa()&&console.warn(ta,n,e??"")}const yl={local:"assets/local-manifest.json",online:Wi};function bl(n="local"){let e=n;const t=new Map,s=new Map;return{getSource(){return e},setSource(i){t.delete(i),s.delete(i),to(),e=i,pe("Manifest source updated",{source:i})},async preloadActiveManifest(){await aa(e,t,s)},async findNearestVideo(i,a,r){const o=await _l(e,t,s,i,a,r);if(o)return o;const l=ia(i);return ze("Falling back to placeholder assets",{simClassId:i,source:e,fallbackUrl:l}),{url:l,liveDataUrl:wl(i),summaryUrl:dl(l)}}}}function ia(n){switch(n){case"planetary":return te("assets/planet_test.mp4");case"galaxy":return te("assets/galaxy_test.mp4");case"cosmos":return te("assets/cosmo_test.mp4");default:return te("assets/galaxy_test.mp4")}}function wl(n){switch(n){case"planetary":return te("assets/planet_test_planetary_stats.csv");case"galaxy":return te("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return te("assets/cosmo_test_cosmos_stats.csv");default:return te("assets/galaxy_test_galaxy_stats.csv")}}async function aa(n,e,t){const s=e.get(n);if(s)return s;const i=yl[n],a=(n==="online"?vl(i):fetch(te(i),{cache:"no-store"}).then(async r=>{if(!r.ok)throw new Error(`Failed to load manifest: ${i}`);return pe("Loaded manifest",{source:n,manifestPath:i}),await r.json()})).then(r=>(t.set(n,Sl()),r)).catch(r=>(t.delete(n),ze("Manifest unavailable",{source:n,manifestPath:i,error:r instanceof Error?r.message:String(r)}),{version:1,runs:[]}));return e.set(n,a),a}async function vl(n){const e=[n,Gn];for(const t of e)try{const s=await fetch(t,{cache:"no-store"});if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??ti(Wi),r=i.backupBase??ti(Gn);return eo(a,r),t===Gn&&no("backup"),pe("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function _l(n,e,t,s,i,a){const o=(await aa(n,e,t)).runs.filter(h=>h.simulationId===s);if(o.length===0)return ze("No manifest runs found for simulation",{simClassId:s,source:n}),null;const l=ul(o,i,a);if(!l)return null;const c=Gt(l,i,a),u=l.defaultView??Object.keys(l.views)[0],f=l.views[u];return f?(pe("Selected manifest-backed run",{simClassId:s,source:n,runId:l.runId,selectedValues:a,distance:c,viewId:u}),{url:Ut(n,f,t),liveDataUrl:Ut(n,l.liveDataPath,t),summaryUrl:Ut(n,l.summaryPath,t),audioUrl:l.audioPath?Ut(n,l.audioPath,t):void 0,viewId:u,runId:l.runId,views:Object.fromEntries(Object.entries(l.views).map(([h,m])=>[h,Ut(n,m,t)]))}):null}function Ut(n,e,t){const s=n==="local"?te(e):We(e),i=t.get(n);return i?Ui(s,"_manifest",i):s}function Sl(){return`${Date.now()}`}function ti(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const jt={mode:"time",frames:[]};async function kl(n){const e=await et(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Nl(t)}function El(n,e,t=0){if(n.mode==="row")return Ll(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=Il(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return Al(r.values,o.values,l)}function Il(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function Nl(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return jt;const t=Qn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Qn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Qn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function Ll(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Qn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function Al(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=Cl(u);continue}i[a]=t<.5?r:o}return i}function Cl(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Tl(n){Ml(No,n)}function Ml(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){pe("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?pe("Run selection tracked",{simulationId:e.simulationId}):ze("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{ze("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const ni=50*1024*1024,Ol=8,Pl=6e3,xl=8e3,Rl=7e3,$l=1200,Bl=100,Fl="(max-width: 768px), (max-height: 450px)",Vl=1,Ul=1500,Xn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Dl(n){const e=bt.map(d=>d.id);let t=Go(e),s=Os(t);const i=bl(t.manifestSource),a=il(),r=window.matchMedia(Fl);ei(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let o=Ps(t.lockedScaleId)??s[0]??bt[0],l=t.lockedScaleId?Xn[o.id]:Qr(),c=!1,u=0,f=null,h=null,m=!1,b=t.audioMutedByDefault,p=t.defaultAudioVolume,g=0;const k=new Set;let y=null,E=0,v=jt,N=null,_=0,I=!r.matches,L=!1;const B=Object.fromEntries(bt.map(d=>[d.id,ba(d)]));qn(l);const O=ia(o.id),S=io(n,O),M=document.createElement("audio");M.preload="auto",M.hidden=!0,M.setAttribute("playsinline","true"),M.muted=b,M.volume=p,n.appendChild(M);const x=document.createElement("div");x.className="display-chrome",x.classList.add("is-hidden"),n.appendChild(x);const re=document.createElement("div");re.className="orientation-overlay",re.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(re);const he=document.createElement("div");he.className="swift-logo",he.innerHTML=`
    <img
      class="swift-logo__image"
      src="${te("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      decoding="async"
    />
    <img
      class="swift-logo__image-compact"
      src="${te("assets/credits/swift-logo-compact.webp")}"
      alt="SWIFT"
      decoding="async"
    />
  `,n.appendChild(he);const W=document.createElement("div");W.className="synth-logo is-hidden",W.innerHTML=`
    <img
      class="synth-logo__image"
      src="${te("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
    <img
      class="synth-logo__image-compact"
      src="${te("assets/credits/synthesizer_banner_compact.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(W);const Q=document.createElement("img");Q.className="app-partner-logo",Q.src=te("assets/dirac-hpc-white.webp"),Q.alt="DIRAC HPC",Q.decoding="async",n.appendChild(Q);const K=document.createElement("div");K.className="display-chrome__top-left is-hidden",n.appendChild(K);const ge=el(K,{onHome(){Pn()},onParameters(){Pt("parameters")},onViewSelected(d){if(d==="credits"){Pt("credits");return}Pt(d)},showHome:!t.lockedScaleId}),ce=document.createElement("div");ce.className="display-chrome__left-center",x.appendChild(ce);const ue=Uo(ce,{onSelect(d){Ls(d)},onInfo(d,w,C){Te.textContent=w,Ne.textContent=C,Y.classList.add("is-visible")}}),Y=document.createElement("div");Y.className="view-info-overlay",Y.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(Y);const Te=Y.querySelector(".view-info-overlay__title"),Ne=Y.querySelector(".view-info-overlay__text"),ye=Y.querySelector(".view-info-overlay__close");Y.addEventListener("click",d=>{d.target===Y&&Y.classList.remove("is-visible")}),ye.addEventListener("click",()=>{Y.classList.remove("is-visible")});const oe=document.createElement("div");oe.className="display-chrome__top-center is-hidden",x.appendChild(oe);const A=document.createElement("div");A.className="display-chrome__top-right",x.appendChild(A);const P=uo(A);function F(){I=!r.matches,rt(A,I),I&&(Xe(E),N&&v.frames.length===0&&_>0&&As(N,_))}F(),r.addEventListener("change",F);const G=document.createElement("div");G.className="display-chrome__center-status",G.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,x.appendChild(G);const H=nl();S.setPlaybackRate(H);const de=document.createElement("div");de.className="display-chrome__bottom",x.appendChild(de);const z=ro(de,{onChange(d){Oe(d)},onTogglePlay:Ns,onAudioToggle:da,onSpeedChange:fa,onSummaryClick:ua,onScrubStart(){nt(),qe()},onScrubEnd(){ht(),S.isPaused()||Be()},initialSpeed:H});z.setPlaying(!S.isPaused()),z.setAudioVisible(!1),z.setMuted(b),M.addEventListener("loadedmetadata",()=>{M.playbackRate=S.getPlaybackRate(),Rt({force:!0}),Ae()});let _e=null,D=null,X=null,ee=!1,le=!1,V=0,Se=null,me=0,Me=Number.NEGATIVE_INFINITY;function Be(){if(_e!==null)return;function d(){const w=S.getPlaybackFraction();z.setPosition(w),S.isPaused()?_e=null:_e=requestAnimationFrame(d)}_e=requestAnimationFrame(d)}function qe(){_e!==null&&(cancelAnimationFrame(_e),_e=null)}function Oe(d){D=d,X===null&&(X=requestAnimationFrame(()=>{if(X=null,D===null)return;const w=D;D=null,S.seekToFraction(w)}))}function ft(){if(D===null)return;X!==null&&(cancelAnimationFrame(X),X=null);const d=D;D=null,S.seekToFraction(d)}function U(){Se!==null&&(window.clearTimeout(Se),Se=null)}function ne(){if(!(y!=null&&y.views))return[];const d=pt(o,y);return Object.entries(y.views).filter(([w])=>w!==d).map(([,w])=>We(w)).filter(Boolean)}function Le(){U(),S.suspendPrewarming()}function Ke(d=$l){U(),!(ee||S.isPaused())&&(Se=window.setTimeout(()=>{Se=null,!(ee||S.isPaused())&&(S.resumePrewarming(),S.prewarmSources(ne()))},Math.max(0,d)))}function nt(){ee||(V+=1,le=!S.isPaused(),ee=!0,me=0,Le(),S.pause(),Ae())}async function ht(){if(!ee)return;const d=++V;ee=!1,me=0,ft(),await S.waitForSeekSettled(),d===V&&(Rt({force:!0}),E=S.getCurrentTimeSeconds(),Xe(E),!(le&&(await cn(S),d!==V))&&(Ke(),Ae({forceAudioSync:!1})))}S.onPlayStateChange(d=>{z.setPlaying(!d),d?(qe(),Le()):(Be(),Ke(0)),Ae()}),S.onTimeUpdate(d=>{if(E=d*S.getDurationSeconds(),ee){const w=performance.now();if(w-me<Bl)return;me=w}Xe(E),!ee&&Rt()});const T=document.createElement("div");T.className="overlay-layer",n.appendChild(T);const j=Ki();j.infoButton.classList.add("is-hidden"),j.infoButton.hidden=!0,n.appendChild(j.infoButton),n.appendChild(j.infoModal);const q=Bo(T,{onReplay:ca,onParameters:()=>Pt("parameters"),onHome:Pn,showHome:!t.lockedScaleId});S.onEnded(()=>{c=!0,u+=1;const d=S.captureFrame();q.update(o,Pe(),S.getDurationSeconds(),f,d,u),q.show(),Ae()});const be=vo(T,s,d=>{Is(d),Pt("parameters")}),fe=Xo(T,{simClass:o,values:Pe(),theme:l,advancedSettings:t,availableScales:bt,onValuesChange:ra,onThemeChange:On,onRun:()=>{pe("Parameters submitted — starting run",{simClassId:o.id}),ha().catch(d=>{ze("Run failed to start",{simClassId:o.id,error:d instanceof Error?d.message:String(d)})})},onResetGalaxyChecklist:()=>{q.resetGalaxyChecklist()},onApplySettings:oa,onClose:la,initialView:"parameters"});fe.setBackVisible(!t.lockedScaleId);const Cn=Zo(T);z.setPosition(0),Xe(),q.hide();const st=new WeakMap,Fe=d=>{const w=st.get(d);w&&(clearTimeout(w),st.delete(d)),d.classList.remove("side-collapsed")},it=d=>{const w=st.get(d);w&&clearTimeout(w),st.set(d,setTimeout(()=>{d.classList.add("side-collapsed"),st.delete(d)},2500))},Tn=d=>{const w=st.get(d);w&&(clearTimeout(w),st.delete(d)),d.classList.add("side-collapsed")},Mn=(d,w)=>{const C=w.isCollapsible??(()=>!0);d.addEventListener("mouseenter",()=>Fe(d)),d.addEventListener("mouseleave",()=>{if(!C()){Fe(d);return}it(d)}),d.addEventListener("focusin",()=>Fe(d)),d.addEventListener("focusout",R=>{if(!d.contains(R.relatedTarget)){if(!C()){Fe(d);return}it(d)}}),d.addEventListener("click",()=>{if(!C()){Fe(d);return}if(d.classList.contains("side-collapsed")){Fe(d),it(d);return}w.toggleOnClick?Tn(d):it(d)}),C()?Tn(d):Fe(d)};Mn(K,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode==="display"}),Mn(ce,{toggleOnClick:!0}),Mn(de,{toggleOnClick:!1});let Ot=0,mt=null,Zt=0;const ks=()=>{mt!==null&&(cancelAnimationFrame(mt),mt=null)},Es=()=>{if(mt!==null)return;Zt=S.getPlaybackFraction();const d=()=>{if(Ot===0){ks();return}const C=12*(1/60)/Math.max(S.getDurationSeconds(),1);Zt=Math.max(0,Math.min(1,Zt+Ot*C)),S.seekToFraction(Zt),mt=requestAnimationFrame(d)};mt=requestAnimationFrame(d)};document.addEventListener("keydown",d=>{if(n.dataset.mode==="display"&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement))switch(d.key){case"Escape":d.preventDefault(),Y.classList.contains("is-visible")?Y.classList.remove("is-visible"):Pn();break;case" ":d.preventDefault(),Ns();break;case"ArrowLeft":d.preventDefault(),Fe(de),it(de),Ot=-1,Es();break;case"ArrowRight":d.preventDefault(),Fe(de),it(de),Ot=1,Es();break;case"ArrowUp":case"ArrowDown":{if(d.preventDefault(),Fe(ce),it(ce),!(y!=null&&y.views)||Object.keys(y.views).length<=1)break;const w=o.views.filter(we=>{var ke;return((ke=y==null?void 0:y.views)==null?void 0:ke[we.id])!==void 0});if(w.length<=1)break;const C=y.viewId??pt(o,y),R=w.findIndex(we=>we.id===C),Z=d.key==="ArrowUp"?(R-1+w.length)%w.length:(R+1)%w.length;Ls(w[Z].id);break}}}),document.addEventListener("keyup",d=>{(d.key==="ArrowLeft"||d.key==="ArrowRight")&&(Ot=0,ks())}),S.hideMedia(),S.pause(),at(t.lockedScaleId?"config":"entry");function Is(d){d.id===o.id&&L||(o=d,Rn(),On(Xn[d.id]),fe.setSimulation(o,Pe()),z.setPosition(0),Xe(),en(),xn())}function ra(d){B[o.id]={...d},pe("Parameter values updated",{simClassId:o.id,values:B[o.id]}),Xe()}function On(d){l=d,qn(d),fe.setTheme(d)}function Pt(d){d==="parameters"&&fe.setSimulation(o,Pe()),fe.setView(d),at("config")}function oa(d){if(Ca(d),L){q.hide(),at("display");return}fe.setSimulation(o,Pe()),fe.setView("parameters")}function la(){if(q.hide(),!L&&t.lockedScaleId){fe.setSimulation(o,Pe()),fe.setView("parameters");return}at(L?"display":"entry")}function Pn(){t.lockedScaleId||(pe("Returning to home screen",{simClassId:o.id}),Rn(),L=!1,S.hideMedia(),at("entry"))}function ca(){c=!1,q.hide(),S.getPlaybackFraction()>=.999&&(S.resetPlayback(),Rt({force:!0})),cn(S),Ae()}function ua(){c=!0,u+=1,S.pause();const d=f?S.captureFrame():null;q.update(o,Pe(),S.getDurationSeconds(),f,d,u),q.show(),Ae()}function Ns(){S.isPaused()?cn(S):S.pause()}function da(){b=!b,Ae()}function fa(d){S.setPlaybackRate(d),M.playbackRate=d,sl(d),z.setSpeed(d)}async function ha(){const d=Pe(),w=a.start();_=w,pe("Run requested",{simClassId:o.id,values:d,manifestSource:i.getSource()});const C=await i.findNearestVideo(o.id,o.parameters,d);if(!a.isCurrent(w))return;Rn({preserveRunRequest:!0}),y=C;const R=pt(o,C),Z=so(i.getSource());Tl({simulationId:o.id,parameters:d,manifestSource:i.getSource(),matchedRunId:C.runId,assetHostMode:Z.mode,assetHostBase:Z.base});const we=Sa(C,R)??C.url,ke=Object.entries(C.views??{}).filter(([Ve])=>Ve!==R).map(([,Ve])=>Ve);N=C.liveDataUrl,As(C.liveDataUrl,w),va(C.summaryUrl,w),Ea(C.summaryUrl,w,C.audioUrl),S.setMuted(!0),en(R),xt(),at("initializing");const tn=ma(we);S.resumePrewarming(),S.prewarmSources(ke);const $t=(async()=>{const Ve=await tn;a.isCurrent(w)&&(pe(`Prepared active video source: ${Ve.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:we,waitsForBuffer:Ve.shouldWaitForBuffer}),S.setSource(Ve.src,{ownedObjectUrl:Ve.ownedObjectUrl}),S.pause(),await S.waitForLoadedData(xl),a.isCurrent(w)&&Ve.shouldWaitForBuffer&&await S.waitForBufferedAhead(Ol,Pl))})();await new Promise(Ve=>{Cn.show(cl(o),Ve,$t,{minTerminalTimeMs:La()})}),a.isCurrent(w)&&(L=!0,S.showMedia(),cn(S),at("display"),Ae())}async function ma(d){const w=We(d),C=await pa(d);if(C!==null&&C>0&&C<=ni){pe("Downloading active video behind loading overlay",{videoUrl:w,contentLength:C});try{const R=await et(d);if(!R.ok)throw new Error(`Failed to download active video: ${w}`);const Z=await R.blob();return pe(`Active video full fetch complete: ${Z.size} bytes`,{videoUrl:We(d),blobType:Z.type}),{src:URL.createObjectURL(Z),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(R){ze(`Full-fetch FAILED; falling back to progressive: ${R instanceof Error?R.message:String(R)}`,{videoUrl:d})}}return C!==null?pe("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:d,contentLength:C,fullFetchMaxBytes:ni}):pe("Could not determine active video size; using progressive load",{videoUrl:d}),pe("Using progressive active video load",{videoUrl:d}),{src:We(d),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function pa(d){try{const w=await et(d,{headers:{Range:"bytes=0-0"}});pe("Probed active video size with range request",{videoUrl:d,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const C=ya(w.headers.get("Content-Length"));if(C!==null)return C;const R=ga(w.headers.get("Content-Range"));return R!==null?R:null}catch(w){return ze("Could not probe active video size",{videoUrl:d,error:w instanceof Error?w.message:String(w)}),null}}function ga(d){if(!d)return null;const w=d.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const C=Number(w[1]);return Number.isFinite(C)&&C>0?C:null}function ya(d){if(!d)return null;const w=Number(d);return Number.isFinite(w)?w:null}function at(d){if(n.dataset.mode=d,d==="entry"?document.documentElement.setAttribute("data-theme","glass"):d==="display"&&qn(l),rt(x,d==="display"||d==="config"),rt(he,d==="display"||d==="entry"),rt(K,d==="entry"||d==="config"||d==="display"),rt(j.infoButton,d==="config"&&!!t.lockedScaleId),(d!=="config"||!t.lockedScaleId)&&j.close(),d!=="display"?Fe(K):Tn(K),d==="entry"&&!t.lockedScaleId?be.show():be.hide(),d==="config"?(Cn.hide(),fe.setSimulation(o,Pe()),fe.show()):fe.hide(),d!=="display")q.hide(),ue.hide(),oe.classList.add("is-hidden"),oe.innerHTML="";else if(c){const C=S.captureFrame();q.update(o,Pe(),S.getDurationSeconds(),f,C,u),q.show()}else en();!L||d==="initializing"?(S.hideMedia(),d==="initializing"&&S.pause()):S.showMedia(),d!=="initializing"&&Cn.hide(),xn(),Ae()}function xn(){if(n.dataset.mode==="entry"){rt(W,!0);return}const d=n.dataset.mode==="display",w=o.id==="galaxy";rt(W,d&&w)}function Xe(d=0){if(!I)return;const w=El(v,d,S.getDurationSeconds()),C=_a(o,f,d,S.getDurationSeconds());P.update(o,Pe(),{...w,...C})}function en(d){const w=o.views.filter(Z=>{var we;return((we=y==null?void 0:y.views)==null?void 0:we[Z.id])!==void 0});if(w.length<=1){ue.hide(),oe.classList.add("is-hidden");return}const C=d??pt(o,y),R=w.find(Z=>Z.id===C);ue.update(w,C),R?(oe.classList.remove("is-hidden"),oe.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):oe.classList.add("is-hidden")}function Rn(d={}){d.preserveRunRequest||(a.invalidate(),_=0),v=jt,N=null,c=!1,f=null,y=null,E=0,ee=!1,le=!1,V+=1,D=null,U(),X!==null&&(cancelAnimationFrame(X),X=null),q.hide(),ue.hide(),oe.classList.add("is-hidden"),oe.innerHTML="",S.pause(),M.pause(),S.clearPrewarmedSources(),S.resetPlayback(),z.setPosition(0),Ms()}function Ls(d){if(!(y!=null&&y.views)||d===pt(o,y))return;const w=We(y.views[d]);if(!w)return;y.viewId=d;const C=!S.isPaused()&&!c,R=c?0:S.getPlaybackFraction();c=!1,q.hide(),S.setSource(w,{seekFraction:R,autoplay:C}),S.prewarmSources(ne()),C&&!ee?Ke():Le(),en(d),xt(),Ae(),Y.classList.remove("is-visible"),xn()}function Pe(){return{...B[o.id]}}function ba(d){return Object.fromEntries(d.parameters.map(w=>[w.id,wa(w)]))}function wa(d){if(d.logScale){const we=Math.log10(d.min),ke=Math.log10(d.max);return 10**(we+Math.random()*(ke-we))}const w=Math.max(0,Math.round((d.max-d.min)/d.step)),C=Math.floor(Math.random()*(w+1)),R=d.min+C*d.step,Z=qi(d.step);return Number(R.toFixed(Z))}async function As(d,w){if(!I){v=jt;return}let C=jt;try{C=await kl(d)}catch(R){ze("Failed to load live stats",{url:d,error:R instanceof Error?R.message:String(R)})}a.isCurrent(w)&&(v=C,Xe())}async function va(d,w){const C=await fl(d);a.isCurrent(w)&&(f=C,Xe(E))}function _a(d,w,C,R){if(!w||!Number.isFinite(R)||R<=0)return{};const Z=Math.max(0,Math.min(1,C/R)),we={};for(const ke of d.metadata.liveStats){if(!ke.live||!ke.fromVideo||!ke.scaleWithTime)continue;const tn=ke.videoKey??ke.id,$t=w[tn];if(typeof $t!="number"||!Number.isFinite($t))continue;const $n=$t*Z;we[ke.id]=ke.integer?String(Math.floor($n)):String($n)}return we}function rt(d,w){d.hidden=!w,d.classList.toggle("is-hidden",!w)}function pt(d,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function Sa(d,w){return!w||!d.views?null:d.views[w]??null}function Cs(){const d=pt(o,y);return d?o.views.some(w=>w.id===d&&w.audio):!1}function ka(d,w){return w||d.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function Ea(d,w,C){const R=ka(d,C),Z=We(R);if(k.has(Z)){Ts(Z);return}const we=++g,ke=await Ia(R);if(!(!a.isCurrent(w)||we!==g)){if(!ke){Ms();return}k.add(Z),Ts(Z)}}function Ts(d){h=d,m=!0,M.playbackRate=S.getPlaybackRate(),M.src!==h&&(M.pause(),M.src=h,M.load()),xt(),Ae()}async function Ia(d){try{if((await et(d,{method:"HEAD"})).ok)return!0}catch{}try{return(await et(d,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function Ms(){g+=1,h=null,m=!1,M.pause(),M.removeAttribute("src"),M.load(),xt()}function Na(){b=t.audioMutedByDefault,p=t.defaultAudioVolume,M.muted=b,M.volume=p,z.setMuted(b)}function xt(){z.setAudioVisible(Cs()&&m&&!!h),z.setMuted(b)}function Rt(d={}){if(!m||!Number.isFinite(M.duration)||M.duration<=0)return;const w=d.force??!1,C=Math.max(0,Math.min(M.duration,S.getCurrentTimeSeconds())),R=Math.abs(M.currentTime-C);if(!w&&R<=(d.driftThresholdSeconds??Vl))return;const Z=performance.now();!w&&Z-Me<Ul||(M.currentTime=C,Me=Z)}function Ae(d={}){const w=Cs()&&m&&!!h;if(xt(),M.muted=b,M.volume=p,M.playbackRate=S.getPlaybackRate(),!w){M.pause();return}if(Rt({force:d.forceAudioSync??M.paused}),n.dataset.mode!=="display"||S.isPaused()||c||ee){M.pause();return}M.play().catch(()=>{b=!0,M.muted=!0,z.setMuted(!0)})}function Os(d){const w=new Set(Qo(d,e));return bt.filter(C=>w.has(C.id))}function Ps(d){return d?bt.find(w=>w.id===d)??null:null}function La(){return i.getSource()!=="local"?rs.MIN_TERMINAL_TIME_MS:Aa(rs.MIN_TERMINAL_TIME_MS,Rl)}function Aa(d,w){const C=Math.ceil(Math.min(d,w)),R=Math.floor(Math.max(d,w));return Math.floor(Math.random()*(R-C+1))+C}function Ca(d){const w=o.id,C=t.manifestSource;t=zo(d,e),ei(t.verboseLogging),s=Os(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),ge.setHomeVisible(!t.lockedScaleId),q.setHomeVisible(!t.lockedScaleId),be.setSimulationClasses(s),fe.setAdvancedSettings(t),fe.setBackVisible(!t.lockedScaleId),pe("Advanced settings updated",t),Na(),Ae(),C!==t.manifestSource&&(y=null);const R=Ps(t.lockedScaleId);R&&(Is(R),R.id!==w&&(L=!1,S.hideMedia(),fe.setView("parameters")),L||(On(Xn[R.id]),fe.setSimulation(o,Pe())))}}function Hl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Dl(n)}Hl();
//# sourceMappingURL=main-CZ3_8cq3.js.map
