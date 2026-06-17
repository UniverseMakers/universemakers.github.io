(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const mn=Symbol.for("yaml.alias"),an=Symbol.for("yaml.document"),Ie=Symbol.for("yaml.map"),Jn=Symbol.for("yaml.pair"),be=Symbol.for("yaml.scalar"),Je=Symbol.for("yaml.seq"),ue=Symbol.for("yaml.node.type"),$e=n=>!!n&&typeof n=="object"&&n[ue]===mn,Mt=n=>!!n&&typeof n=="object"&&n[ue]===an,dt=n=>!!n&&typeof n=="object"&&n[ue]===Ie,z=n=>!!n&&typeof n=="object"&&n[ue]===Jn,K=n=>!!n&&typeof n=="object"&&n[ue]===be,ft=n=>!!n&&typeof n=="object"&&n[ue]===Je;function Y(n){if(n&&typeof n=="object")switch(n[ue]){case Ie:case Je:return!0}return!1}function J(n){if(n&&typeof n=="object")switch(n[ue]){case mn:case Ie:case be:case Je:return!0}return!1}const zn=n=>(K(n)||Y(n))&&!!n.anchor,Oe=Symbol("break visit"),ai=Symbol("skip children"),rt=Symbol("remove node");function ze(n,e){const t=ri(e);Mt(n)?He(null,n.contents,t,Object.freeze([n]))===rt&&(n.contents=null):He(null,n,t,Object.freeze([]))}ze.BREAK=Oe;ze.SKIP=ai;ze.REMOVE=rt;function He(n,e,t,s){const i=oi(n,e,t,s);if(J(i)||z(i))return li(n,s,i),He(n,i,t,s);if(typeof i!="symbol"){if(Y(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=He(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Oe)return Oe;r===rt&&(e.items.splice(a,1),a-=1)}}}else if(z(e)){s=Object.freeze(s.concat(e));const a=He("key",e.key,t,s);if(a===Oe)return Oe;a===rt&&(e.key=null);const r=He("value",e.value,t,s);if(r===Oe)return Oe;r===rt&&(e.value=null)}}return i}function ri(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function oi(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(dt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(ft(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(z(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(K(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if($e(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function li(n,e,t){const s=e[e.length-1];if(Y(s))s.items[n]=t;else if(z(s))n==="key"?s.key=t:s.value=t;else if(Mt(s))s.contents=t;else{const i=$e(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const ci={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},ui=n=>n.replace(/[!,[\]{}]/g,e=>ci[e]);class ae{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},ae.defaultYaml,e),this.tags=Object.assign({},ae.defaultTags,t)}clone(){const e=new ae(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new ae(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:ae.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},ae.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:ae.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},ae.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+ui(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&J(e.contents)){const a={};ze(e.contents,(r,o)=>{J(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}ae.defaultYaml={explicit:!1,version:"1.2"};ae.defaultTags={"!!":"tag:yaml.org,2002:"};function Qn(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Xn(n){const e=new Set;return ze(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Zn(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function di(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Xn(n));const r=Zn(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(K(r.node)||Y(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function je(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=je(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=je(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=je(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=je(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function ce(n,e,t){if(Array.isArray(n))return n.map((s,i)=>ce(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!zn(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class pn{constructor(e){Object.defineProperty(this,ue,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Mt(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=ce(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?je(a,{"":o},"",o):o}}class gn extends pn{constructor(e){super(mn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],ze(e,{Node:(a,r)=>{($e(r)||zn(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(ce(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Et(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Qn(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Et(n,e,t){if($e(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(Y(e)){let s=0;for(const i of e.items){const a=Et(n,i,t);a>s&&(s=a)}return s}else if(z(e)){const s=Et(n,e.key,t),i=Et(n,e.value,t);return Math.max(s,i)}return 1}const es=n=>!n||typeof n!="function"&&typeof n!="object";class O extends pn{constructor(e){super(be),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:ce(this.value,e,t)}toString(){return String(this.value)}}O.BLOCK_FOLDED="BLOCK_FOLDED";O.BLOCK_LITERAL="BLOCK_LITERAL";O.PLAIN="PLAIN";O.QUOTE_DOUBLE="QUOTE_DOUBLE";O.QUOTE_SINGLE="QUOTE_SINGLE";const fi="tag:yaml.org,2002:";function hi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function ct(n,e,t){var u,m,p;if(Mt(n)&&(n=n.contents),J(n))return n;if(z(n)){const b=(m=(u=t.schema[Ie]).createNode)==null?void 0:m.call(u,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new gn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=fi+e.slice(2));let l=hi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new O(n);return c&&(c.node=b),b}l=n instanceof Map?r[Ie]:Symbol.iterator in Object(n)?r[Je]:r[Ie]}a&&(a(l),delete t.onTagObj);const d=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((p=l==null?void 0:l.nodeClass)==null?void 0:p.from)=="function"?l.nodeClass.from(t.schema,n,t):new O(n);return e?d.tag=e:l.default||(d.tag=l.tag),c&&(c.node=d),d}function Tt(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return ct(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const st=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class ts extends pn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>J(s)||z(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(st(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(Y(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Tt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(Y(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&K(a)?a.value:a:Y(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!z(t))return!1;const s=t.value;return s==null||e&&K(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return Y(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(Y(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Tt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const mi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function ve(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const Me=(n,e,t)=>n.endsWith(`
`)?ve(t,e):t.includes(`
`)?`
`+ve(t,e):(n.endsWith(" ")?"":" ")+t,ns="flow",rn="block",Nt="quoted";function Pt(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],d={};let u=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):u=i-s);let m,p,b=!1,f=-1,h=-1,y=-1;t===rn&&(f=Pn(n,f,e.length),f!==-1&&(u=f+c));for(let S;S=n[f+=1];){if(t===Nt&&S==="\\"){switch(h=f,n[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}y=f}if(S===`
`)t===rn&&(f=Pn(n,f,e.length)),u=f+e.length+c,m=void 0;else{if(S===" "&&p&&p!==" "&&p!==`
`&&p!=="	"){const w=n[f+1];w&&w!==" "&&w!==`
`&&w!=="	"&&(m=f)}if(f>=u)if(m)l.push(m),u=m+c,m=void 0;else if(t===Nt){for(;p===" "||p==="	";)p=S,S=n[f+=1],b=!0;const w=f>y+1?f-2:h-1;if(d[w])return n;l.push(w),d[w]=!0,u=w+c,m=void 0}else b=!0}p=S}if(b&&o&&o(),l.length===0)return n;r&&r();let k=n.slice(0,l[0]);for(let S=0;S<l.length;++S){const w=l[S],_=l[S+1]||n.length;w===0?k=`
${e}${n.slice(0,_)}`:(t===Nt&&d[w]&&(k+=`${n[w]}\\`),k+=`
${e}${n.slice(w+1,_)}`)}return k}function Pn(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const xt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),$t=n=>/^(%|---|\.\.\.)/m.test(n);function pi(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function ot(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||($t(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const d=t.substr(c+2,4);switch(d){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:d.substr(0,2)==="00"?r+="\\x"+d.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:Pt(r,a,Nt,xt(e,!1))}function on(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ot(n,e);const t=e.indent||($t(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Pt(s,t,ns,xt(e,!1))}function Ke(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ot;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=on:a&&!i?s=ot:s=t?on:ot}return s(n,e)}let ln;try{ln=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{ln=/\n+(?!\n|$)/g}function Lt({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return Ke(t,s);const l=s.indent||(s.forceBlockIndent||$t(t)?"  ":""),d=r==="literal"?!0:r==="folded"||e===O.BLOCK_FOLDED?!1:e===O.BLOCK_LITERAL?!0:!pi(t,c,l.length);if(!t)return d?`|
`:`>
`;let u,m;for(m=t.length;m>0;--m){const _=t[m-1];if(_!==`
`&&_!=="	"&&_!==" ")break}let p=t.substring(m);const b=p.indexOf(`
`);b===-1?u="-":t===p||b!==p.length-1?(u="+",a&&a()):u="",p&&(t=t.slice(0,-p.length),p[p.length-1]===`
`&&(p=p.slice(0,-1)),p=p.replace(ln,`$&${l}`));let f=!1,h,y=-1;for(h=0;h<t.length;++h){const _=t[h];if(_===" ")f=!0;else if(_===`
`)y=h;else break}let k=t.substring(0,y<h?y+1:h);k&&(t=t.substring(k.length),k=k.replace(/\n+/g,`$&${l}`));let w=(f?l?"2":"1":"")+u;if(n&&(w+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!d){const _=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let L=!1;const N=xt(s,!0);r!=="folded"&&e!==O.BLOCK_FOLDED&&(N.onOverflow=()=>{L=!0});const E=Pt(`${k}${_}${p}`,l,rn,N);if(!L)return`>${w}
${l}${E}`}return t=t.replace(/\n+/g,`$&${l}`),`|${w}
${l}${k}${t}${p}`}function gi(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:d}=e;if(o&&a.includes(`
`)||d&&/[[\]{},]/.test(a))return Ke(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||d||!a.includes(`
`)?Ke(a,e):Lt(n,e,t,s);if(!o&&!d&&i!==O.PLAIN&&a.includes(`
`))return Lt(n,e,t,s);if($t(a)){if(c==="")return e.forceBlockIndent=!0,Lt(n,e,t,s);if(o&&c===l)return Ke(a,e)}const u=a.replace(/\n+/g,`$&
${c}`);if(r){const m=f=>{var h;return f.default&&f.tag!=="tag:yaml.org,2002:str"&&((h=f.test)==null?void 0:h.test(u))},{compat:p,tags:b}=e.doc.schema;if(b.some(m)||p!=null&&p.some(m))return Ke(a,e)}return o?u:Pt(u,c,ns,xt(e,!1))}function yn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==O.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=O.QUOTE_DOUBLE);const c=d=>{switch(d){case O.BLOCK_FOLDED:case O.BLOCK_LITERAL:return i||a?Ke(r.value,e):Lt(r,e,t,s);case O.QUOTE_DOUBLE:return ot(r.value,e);case O.QUOTE_SINGLE:return on(r.value,e);case O.PLAIN:return gi(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:d,defaultStringType:u}=e.options,m=i&&d||u;if(l=c(m),l===null)throw new Error(`Unsupported default string type ${m}`)}return l}function ss(n,e){const t=Object.assign({blockQuote:!0,commentString:mi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function yi(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(K(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function bi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(K(n)||Y(n))&&n.anchor;a&&Qn(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function Ge(n,e,t,s){var c;if(z(n))return n.toString(e,t,s);if($e(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=J(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=yi(e.doc.schema.tags,a));const r=bi(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):K(a)?yn(a,e,t,s):a.toString(e,t,s);return r?K(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function wi({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:d,simpleKeys:u}}=t;let m=J(n)&&n.comment||null;if(u){if(m)throw new Error("With simple keys, key nodes cannot have comments");if(Y(n)||!J(n)&&typeof n=="object"){const N="With simple keys, collection cannot be used as a key value";throw new Error(N)}}let p=!u&&(!n||m&&e==null&&!t.inFlow||Y(n)||(K(n)?n.type===O.BLOCK_FOLDED||n.type===O.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!p&&(u||!a),indent:o+c});let b=!1,f=!1,h=Ge(n,t,()=>b=!0,()=>f=!0);if(!p&&!t.inFlow&&h.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");p=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),h===""?"?":p?`? ${h}`:h}else if(a&&!u||e==null&&p)return h=`? ${h}`,m&&!b?h+=Me(h,t.indent,l(m)):f&&i&&i(),h;b&&(m=null),p?(m&&(h+=Me(h,t.indent,l(m))),h=`? ${h}
${o}:`):(h=`${h}:`,m&&(h+=Me(h,t.indent,l(m))));let y,k,S;J(e)?(y=!!e.spaceBefore,k=e.commentBefore,S=e.comment):(y=!1,k=null,S=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!p&&!m&&K(e)&&(t.indentAtStart=h.length+1),f=!1,!d&&c.length>=2&&!t.inFlow&&!p&&ft(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let w=!1;const _=Ge(e,t,()=>w=!0,()=>f=!0);let L=" ";if(m||y||k){if(L=y?`
`:"",k){const N=l(k);L+=`
${ve(N,t.indent)}`}_===""&&!t.inFlow?L===`
`&&S&&(L=`

`):L+=`
${t.indent}`}else if(!p&&Y(e)){const N=_[0],E=_.indexOf(`
`),A=E!==-1,x=t.inFlow??e.flow??e.items.length===0;if(A||!x){let R=!1;if(A&&(N==="&"||N==="!")){let B=_.indexOf(" ");N==="&"&&B!==-1&&B<E&&_[B+1]==="!"&&(B=_.indexOf(" ",B+1)),(B===-1||E<B)&&(R=!0)}R||(L=`
${t.indent}`)}}else(_===""||_[0]===`
`)&&(L="");return h+=L+_,t.inFlow?w&&s&&s():S&&!w?h+=Me(h,t.indent,l(S)):f&&i&&i(),h}function is(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const bt="<<",_e={identify:n=>n===bt||typeof n=="symbol"&&n.description===bt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new O(Symbol(bt)),{addToJSMap:as}),stringify:()=>bt},vi=(n,e)=>(_e.identify(e)||K(e)&&(!e.type||e.type===O.PLAIN)&&_e.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===_e.tag&&t.default));function as(n,e,t){if(t=n&&$e(t)?t.resolve(n.doc):t,ft(t))for(const s of t.items)Wt(n,e,s);else if(Array.isArray(t))for(const s of t)Wt(n,e,s);else Wt(n,e,t)}function Wt(n,e,t){const s=n&&$e(t)?t.resolve(n.doc):t;if(!dt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function rs(n,e,{key:t,value:s}){if(J(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(vi(n,t))as(n,e,s);else{const i=ce(t,"",n);if(e instanceof Map)e.set(i,ce(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Si(t,i,n),r=ce(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Si(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(J(n)&&(t!=null&&t.doc)){const s=ss(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),is(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function bn(n,e,t){const s=ct(n,void 0,t),i=ct(e,void 0,t);return new re(s,i)}class re{constructor(e,t=null){Object.defineProperty(this,ue,{value:Jn}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return J(t)&&(t=t.clone(e)),J(s)&&(s=s.clone(e)),new re(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return rs(t,s,this)}toString(e,t,s){return e!=null&&e.doc?wi(this,e,t,s):JSON.stringify(this)}}function os(n,e,t){return(e.inFlow??n.flow?ki:_i)(n,e,t)}function _i({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,d=Object.assign({},t,{indent:a,type:null});let u=!1;const m=[];for(let b=0;b<e.length;++b){const f=e[b];let h=null;if(J(f))!u&&f.spaceBefore&&m.push(""),At(t,m,f.commentBefore,u),f.comment&&(h=f.comment);else if(z(f)){const k=J(f.key)?f.key:null;k&&(!u&&k.spaceBefore&&m.push(""),At(t,m,k.commentBefore,u))}u=!1;let y=Ge(f,d,()=>h=null,()=>u=!0);h&&(y+=Me(y,a,l(h))),u&&h&&(u=!1),m.push(s+y)}let p;if(m.length===0)p=i.start+i.end;else{p=m[0];for(let b=1;b<m.length;++b){const f=m[b];p+=f?`
${c}${f}`:`
`}}return n?(p+=`
`+ve(l(n),c),o&&o()):u&&r&&r(),p}function ki({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,d=0;const u=[];for(let b=0;b<n.length;++b){const f=n[b];let h=null;if(J(f))f.spaceBefore&&u.push(""),At(e,u,f.commentBefore,!1),f.comment&&(h=f.comment);else if(z(f)){const k=J(f.key)?f.key:null;k&&(k.spaceBefore&&u.push(""),At(e,u,k.commentBefore,!1),k.comment&&(l=!0));const S=J(f.value)?f.value:null;S?(S.comment&&(h=S.comment),S.commentBefore&&(l=!0)):f.value==null&&(k!=null&&k.comment)&&(h=k.comment)}h&&(l=!0);let y=Ge(f,c,()=>h=null);l||(l=u.length>d||y.includes(`
`)),b<n.length-1?y+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=u.reduce((k,S)=>k+S.length+2,2)+(y.length+2)>e.options.lineWidth)),l&&(y+=",")),h&&(y+=Me(y,s,o(h))),u.push(y),d=u.length}const{start:m,end:p}=t;if(u.length===0)return m+p;if(!l){const b=u.reduce((f,h)=>f+h.length+2,2);l=e.options.lineWidth>0&&b>e.options.lineWidth}if(l){let b=m;for(const f of u)b+=f?`
${a}${i}${f}`:`
`;return`${b}
${i}${p}`}else return`${m}${r}${u.join(" ")}${r}${p}`}function At({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=ve(e(s),n);t.push(a.trimStart())}}function Pe(n,e){const t=K(e)?e.value:e;for(const s of n)if(z(s)&&(s.key===e||s.key===t||K(s.key)&&s.key.value===t))return s}class le extends ts{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Ie,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(bn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;z(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new re(e,e==null?void 0:e.value):s=new re(e.key,e.value);const i=Pe(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);K(i.value)&&es(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=Pe(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=Pe(this.items,e),i=s==null?void 0:s.value;return(!t&&K(i)?i.value:i)??void 0}has(e){return!!Pe(this.items,e)}set(e,t){this.add(new re(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)rs(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!z(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),os(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const Qe={collection:"map",default:!0,nodeClass:le,tag:"tag:yaml.org,2002:map",resolve(n,e){return dt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>le.from(n,e,t)};class xe extends ts{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Je,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=wt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=wt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&K(i)?i.value:i}has(e){const t=wt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=wt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];K(i)&&es(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(ce(a,String(i++),t));return s}toString(e,t,s){return e?os(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(ct(o,void 0,s))}}return a}}function wt(n){let e=K(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Xe={collection:"seq",default:!0,nodeClass:xe,tag:"tag:yaml.org,2002:seq",resolve(n,e){return ft(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>xe.from(n,e,t)},Rt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),yn(n,e,t,s)}},Ft={identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new O(null),stringify:({source:n},e)=>typeof n=="string"&&Ft.test.test(n)?n:e.options.nullStr},wn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new O(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&wn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function me({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const ls={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:me},cs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():me(n)}},us={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new O(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:me},Bt=n=>typeof n=="bigint"||Number.isInteger(n),vn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function ds(n,e,t){const{value:s}=n;return Bt(s)&&s>=0?t+s.toString(e):me(n)}const fs={identify:n=>Bt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>vn(n,2,8,t),stringify:n=>ds(n,8,"0o")},hs={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>vn(n,0,10,t),stringify:me},ms={identify:n=>Bt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>vn(n,2,16,t),stringify:n=>ds(n,16,"0x")},Ei=[Qe,Xe,Rt,Ft,wn,fs,hs,ms,ls,cs,us];function xn(n){return typeof n=="bigint"||Number.isInteger(n)}const vt=({value:n})=>JSON.stringify(n),Ni=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:vt},{identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:vt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:vt},{identify:xn,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>xn(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:vt}],Li={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Ii=[Qe,Xe].concat(Ni,Li),Sn={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=O.BLOCK_LITERAL),e!==O.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),d=new Array(l);for(let u=0,m=0;u<l;++u,m+=c)d[u]=o.substr(m,c);o=d.join(e===O.BLOCK_LITERAL?`
`:" ")}return yn({comment:n,type:e,value:o},s,i,a)}};function ps(n,e){if(ft(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!z(s)){if(dt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new re(new O(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=z(s)?s:new re(s)}}else e("Expected a sequence for this tag");return n}function gs(n,e,t){const{replacer:s}=t,i=new xe(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(bn(o,c,t))}return i}const _n={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ps,createNode:gs};class qe extends xe{constructor(){super(),this.add=le.prototype.add.bind(this),this.delete=le.prototype.delete.bind(this),this.get=le.prototype.get.bind(this),this.has=le.prototype.has.bind(this),this.set=le.prototype.set.bind(this),this.tag=qe.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(z(i)?(a=ce(i.key,"",t),r=ce(i.value,a,t)):a=ce(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=gs(e,t,s),a=new this;return a.items=i.items,a}}qe.tag="tag:yaml.org,2002:omap";const kn={collection:"seq",identify:n=>n instanceof Map,nodeClass:qe,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=ps(n,e),s=[];for(const{key:i}of t.items)K(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new qe,t)},createNode:(n,e,t)=>qe.from(n,e,t)};function ys({value:n,source:e},t){return e&&(n?bs:ws).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const bs={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new O(!0),stringify:ys},ws={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new O(!1),stringify:ys},Ti={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:me},Ai={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():me(n)}},Ci={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new O(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:me},ht=n=>typeof n=="bigint"||Number.isInteger(n);function Vt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function En(n,e,t){const{value:s}=n;if(ht(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return me(n)}const Oi={identify:ht,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Vt(n,2,2,t),stringify:n=>En(n,2,"0b")},Mi={identify:ht,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Vt(n,1,8,t),stringify:n=>En(n,8,"0")},Pi={identify:ht,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Vt(n,0,10,t),stringify:me},xi={identify:ht,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Vt(n,2,16,t),stringify:n=>En(n,16,"0x")};class We extends le{constructor(e){super(e),this.tag=We.tag}add(e){let t;z(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new re(e.key,null):t=new re(e,null),Pe(this.items,t.key)||this.items.push(t)}get(e,t){const s=Pe(this.items,e);return!t&&z(s)?K(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=Pe(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new re(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(bn(r,null,s));return a}}We.tag="tag:yaml.org,2002:set";const Nn={collection:"map",identify:n=>n instanceof Set,nodeClass:We,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>We.from(n,e,t),resolve(n,e){if(dt(n)){if(n.hasAllNullValues(!0))return Object.assign(new We,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function Ln(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function vs(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return me(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Ss={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Ln(n,t),stringify:vs},_s={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Ln(n,!1),stringify:vs},Ut={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Ut.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const d=e[8];if(d&&d!=="Z"){let u=Ln(d,!1);Math.abs(u)<30&&(u*=60),l-=6e4*u}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},$n=[Qe,Xe,Rt,Ft,bs,ws,Oi,Mi,Pi,xi,Ti,Ai,Ci,Sn,_e,kn,_n,Nn,Ss,_s,Ut],Rn=new Map([["core",Ei],["failsafe",[Qe,Xe,Rt]],["json",Ii],["yaml11",$n],["yaml-1.1",$n]]),Fn={binary:Sn,bool:wn,float:us,floatExp:cs,floatNaN:ls,floatTime:_s,int:hs,intHex:ms,intOct:fs,intTime:Ss,map:Qe,merge:_e,null:Ft,omap:kn,pairs:_n,seq:Xe,set:Nn,timestamp:Ut},$i={"tag:yaml.org,2002:binary":Sn,"tag:yaml.org,2002:merge":_e,"tag:yaml.org,2002:omap":kn,"tag:yaml.org,2002:pairs":_n,"tag:yaml.org,2002:set":Nn,"tag:yaml.org,2002:timestamp":Ut};function Gt(n,e,t){const s=Rn.get(e);if(s&&!n)return t&&!s.includes(_e)?s.concat(_e):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Rn.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(_e)),i.reduce((a,r)=>{const o=typeof r=="string"?Fn[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(Fn).map(d=>JSON.stringify(d)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const Ri=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class In{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Gt(e,"compat"):e?Gt(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?$i:{},this.tags=Gt(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,Ie,{value:Qe}),Object.defineProperty(this,be,{value:Rt}),Object.defineProperty(this,Je,{value:Xe}),this.sortMapEntries=typeof r=="function"?r:r===!0?Ri:null}clone(){const e=Object.create(In.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Fi(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=ss(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(ve(l,""))}let r=!1,o=null;if(n.contents){if(J(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const u=a(n.contents.commentBefore);t.push(ve(u,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let d=Ge(n.contents,i,()=>o=null,l);o&&(d+=Me(d,"",a(o))),(d[0]==="|"||d[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${d}`:t.push(d)}else t.push(Ge(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(ve(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(ve(a(l),"")))}return t.join(`
`)+`
`}class Dt{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,ue,{value:an});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new ae({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Dt.prototype,{[ue]:{value:an}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=J(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Fe(this.contents)&&this.contents.add(e)}addIn(e,t){Fe(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Xn(this);e.anchor=!t||s.has(t)?Zn(t||"a",s):t}return new gn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const h=k=>typeof k=="number"||k instanceof String||k instanceof Number,y=t.filter(h).map(String);y.length>0&&(t=t.concat(y)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:d}=s??{},{onAnchor:u,setAnchors:m,sourceObjects:p}=di(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:u,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:p},f=ct(e,d,b);return o&&Y(f)&&(f.flow=!0),m(),f}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new re(i,a)}delete(e){return Fe(this.contents)?this.contents.delete(e):!1}deleteIn(e){return st(e)?this.contents==null?!1:(this.contents=null,!0):Fe(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return Y(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return st(e)?!t&&K(this.contents)?this.contents.value:this.contents:Y(this.contents)?this.contents.getIn(e,t):void 0}has(e){return Y(this.contents)?this.contents.has(e):!1}hasIn(e){return st(e)?this.contents!==void 0:Y(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Tt(this.schema,[e],t):Fe(this.contents)&&this.contents.set(e,t)}setIn(e,t){st(e)?this.contents=t:this.contents==null?this.contents=Tt(this.schema,Array.from(e),t):Fe(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ae({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ae({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new In(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=ce(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:d}of o.anchors.values())a(d,l);return typeof r=="function"?je(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Fi(this,e)}}function Fe(n){if(Y(n))return!0;throw new Error("Expected a YAML collection as document contents")}class ks extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class it extends ks{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Bi extends ks{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Bn=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function Ye(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,d=o,u="",m="",p=!1,b=!1,f=null,h=null,y=null,k=null,S=null,w=null,_=null;for(const E of n)switch(b&&(E.type!=="space"&&E.type!=="newline"&&E.type!=="comma"&&a(E.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),f&&(l&&E.type!=="comment"&&E.type!=="newline"&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),f=null),E.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&E.source.includes("	")&&(f=E),d=!0;break;case"comment":{d||a(E,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const A=E.source.substring(1)||" ";u?u+=m+A:u=A,m="",l=!1;break}case"newline":l?u?u+=E.source:(!w||t!=="seq-item-ind")&&(c=!0):m+=E.source,l=!0,p=!0,(h||y)&&(k=E),d=!0;break;case"anchor":h&&a(E,"MULTIPLE_ANCHORS","A node can have at most one anchor"),E.source.endsWith(":")&&a(E.offset+E.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),h=E,_??(_=E.offset),l=!1,d=!1,b=!0;break;case"tag":{y&&a(E,"MULTIPLE_TAGS","A node can have at most one tag"),y=E,_??(_=E.offset),l=!1,d=!1,b=!0;break}case t:(h||y)&&a(E,"BAD_PROP_ORDER",`Anchors and tags must be after the ${E.source} indicator`),w&&a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.source} in ${e??"collection"}`),w=E,l=t==="seq-item-ind"||t==="explicit-key-ind",d=!1;break;case"comma":if(e){S&&a(E,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),S=E,l=!1,d=!1;break}default:a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.type} token`),l=!1,d=!1}const L=n[n.length-1],N=L?L.offset+L.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f&&(l&&f.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:S,found:w,spaceBefore:c,comment:u,hasNewline:p,anchor:h,tag:y,newlineAfterProp:k,end:N,start:_??N}}function ut(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ut(e.key)||ut(e.value))return!0}return!1;default:return!0}}function cn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ut(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Es(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||K(a)&&K(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Vn="All mapping items must start at the same column";function Vi({composeNode:n,composeEmptyNode:e},t,s,i,a){var d;const r=(a==null?void 0:a.nodeClass)??le,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const u of s.items){const{start:m,key:p,sep:b,value:f}=u,h=Ye(m,{indicator:"explicit-key-ind",next:p??(b==null?void 0:b[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),y=!h.found;if(y){if(p&&(p.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in p&&p.indent!==s.indent&&i(c,"BAD_INDENT",Vn)),!h.anchor&&!h.tag&&!b){l=h.end,h.comment&&(o.comment?o.comment+=`
`+h.comment:o.comment=h.comment);continue}(h.newlineAfterProp||ut(p))&&i(p??m[m.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((d=h.found)==null?void 0:d.indent)!==s.indent&&i(c,"BAD_INDENT",Vn);t.atKey=!0;const k=h.end,S=p?n(t,p,h,i):e(t,k,m,null,h,i);t.schema.compat&&cn(s.indent,p,i),t.atKey=!1,Es(t,o.items,S)&&i(k,"DUPLICATE_KEY","Map keys must be unique");const w=Ye(b??[],{indicator:"map-value-ind",next:f,offset:S.range[2],onError:i,parentIndent:s.indent,startOnNewline:!p||p.type==="block-scalar"});if(c=w.end,w.found){y&&((f==null?void 0:f.type)==="block-map"&&!w.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&h.start<w.found.offset-1024&&i(S.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const _=f?n(t,f,w,i):e(t,c,b,null,w,i);t.schema.compat&&cn(s.indent,f,i),c=_.range[2];const L=new re(S,_);t.options.keepSourceTokens&&(L.srcToken=u),o.items.push(L)}else{y&&i(S.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),w.comment&&(S.comment?S.comment+=`
`+w.comment:S.comment=w.comment);const _=new re(S);t.options.keepSourceTokens&&(_.srcToken=u),o.items.push(_)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function Ui({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??xe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:d,value:u}of s.items){const m=Ye(d,{indicator:"seq-item-ind",next:u,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!m.found)if(m.anchor||m.tag||u)(u==null?void 0:u.type)==="block-seq"?i(m.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=m.end,m.comment&&(o.comment=m.comment);continue}const p=u?n(t,u,m,i):e(t,m.end,d,null,m,i);t.schema.compat&&cn(s.indent,u,i),c=p.range[2],o.items.push(p)}return o.range=[s.offset,c,l??c],o}function mt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const d=c.substring(1)||" ";i?i+=r+d:i=d,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const Yt="Block collections are not allowed within flow collections",Jt=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Di({composeNode:n,composeEmptyNode:e},t,s,i,a){var h;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?le:xe),l=new c(t.schema);l.flow=!0;const d=t.atRoot;d&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=s.offset+s.start.source.length;for(let y=0;y<s.items.length;++y){const k=s.items[y],{start:S,key:w,sep:_,value:L}=k,N=Ye(S,{flow:o,indicator:"explicit-key-ind",next:w??(_==null?void 0:_[0]),offset:u,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!_&&!L){y===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):y<s.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),N.comment&&(l.comment?l.comment+=`
`+N.comment:l.comment=N.comment),u=N.end;continue}!r&&t.options.strict&&ut(w)&&i(w,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(y===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${o} items`),N.comment){let E="";e:for(const A of S)switch(A.type){case"comma":case"space":break;case"comment":E=A.source.substring(1);break e;default:break e}if(E){let A=l.items[l.items.length-1];z(A)&&(A=A.value??A.key),A.comment?A.comment+=`
`+E:A.comment=E,N.comment=N.comment.substring(E.length+1)}}if(!r&&!_&&!N.found){const E=L?n(t,L,N,i):e(t,N.end,_,null,N,i);l.items.push(E),u=E.range[2],Jt(L)&&i(E.range,"BLOCK_IN_FLOW",Yt)}else{t.atKey=!0;const E=N.end,A=w?n(t,w,N,i):e(t,E,S,null,N,i);Jt(w)&&i(A.range,"BLOCK_IN_FLOW",Yt),t.atKey=!1;const x=Ye(_??[],{flow:o,indicator:"map-value-ind",next:L,offset:A.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(x.found){if(!r&&!N.found&&t.options.strict){if(_)for(const U of _){if(U===x.found)break;if(U.type==="newline"){i(U,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<x.found.offset-1024&&i(x.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else L&&("source"in L&&((h=L.source)==null?void 0:h[0])===":"?i(L,"MISSING_CHAR",`Missing space after : in ${o}`):i(x.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const R=L?n(t,L,x,i):x.found?e(t,x.end,_,null,x,i):null;R?Jt(L)&&i(R.range,"BLOCK_IN_FLOW",Yt):x.comment&&(A.comment?A.comment+=`
`+x.comment:A.comment=x.comment);const B=new re(A,R);if(t.options.keepSourceTokens&&(B.srcToken=k),r){const U=l;Es(t,U.items,A)&&i(E,"DUPLICATE_KEY","Map keys must be unique"),U.items.push(B)}else{const U=new le(t.schema);U.flow=!0,U.items.push(B);const G=(R??A).range;U.range=[A.range[0],G[1],G[2]],l.items.push(U)}u=R?R.range[2]:x.end}}const m=r?"}":"]",[p,...b]=s.end;let f=u;if((p==null?void 0:p.source)===m)f=p.offset+p.source.length;else{const y=o[0].toUpperCase()+o.substring(1),k=d?`${y} must end with a ${m}`:`${y} in block collection must be sufficiently indented and end with a ${m}`;i(u,d?"MISSING_CHAR":"BAD_INDENT",k),p&&p.source.length!==1&&b.unshift(p)}if(b.length>0){const y=mt(b,f,t.options.strict,i);y.comment&&(l.comment?l.comment+=`
`+y.comment:l.comment=y.comment),l.range=[s.offset,f,y.offset]}else l.range=[s.offset,f,f];return l}function zt(n,e,t,s,i,a){const r=t.type==="block-map"?Vi(n,e,t,s,a):t.type==="block-seq"?Ui(n,e,t,s,a):Di(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function Hi(n,e,t,s,i){var m;const a=s.tag,r=a?e.directives.tagName(a.source,p=>i(a,"TAG_RESOLVE_FAILED",p)):null;if(t.type==="block-seq"){const{anchor:p,newlineAfterProp:b}=s,f=p&&a?p.offset>a.offset?p:a:p??a;f&&(!b||b.offset<f.offset)&&i(f,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===le.tagName&&o==="map"||r===xe.tagName&&o==="seq")return zt(n,e,t,i,r);let c=e.schema.tags.find(p=>p.tag===r&&p.collection===o);if(!c){const p=e.schema.knownTags[r];if((p==null?void 0:p.collection)===o)e.schema.tags.push(Object.assign({},p,{default:!1})),c=p;else return p?i(a,"BAD_COLLECTION_TYPE",`${p.tag} used for ${o} collection, but expects ${p.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),zt(n,e,t,i,r)}const l=zt(n,e,t,i,r,c),d=((m=c.resolve)==null?void 0:m.call(c,l,p=>i(a,"TAG_RESOLVE_FAILED",p),e.options))??l,u=J(d)?d:new O(d);return u.range=l.range,u.tag=r,c!=null&&c.format&&(u.format=c.format),u}function ji(n,e,t){const s=e.offset,i=Ki(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?O.BLOCK_FOLDED:O.BLOCK_LITERAL,r=e.source?qi(e.source):[];let o=r.length;for(let f=r.length-1;f>=0;--f){const h=r[f][1];if(h===""||h==="\r")o=f;else break}if(o===0){const f=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let h=s+i.length;return e.source&&(h+=e.source.length),{value:f,type:a,comment:i.comment,range:[s,h,h]}}let c=e.indent+i.indent,l=e.offset+i.length,d=0;for(let f=0;f<o;++f){const[h,y]=r[f];if(y===""||y==="\r")i.indent===0&&h.length>c&&(c=h.length);else{h.length<c&&t(l+h.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=h.length),d=f,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=h.length+y.length+1}for(let f=r.length-1;f>=o;--f)r[f][0].length>c&&(o=f+1);let u="",m="",p=!1;for(let f=0;f<d;++f)u+=r[f][0].slice(c)+`
`;for(let f=d;f<o;++f){let[h,y]=r[f];l+=h.length+y.length+1;const k=y[y.length-1]==="\r";if(k&&(y=y.slice(0,-1)),y&&h.length<c){const w=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-y.length-(k?2:1),"BAD_INDENT",w),h=""}a===O.BLOCK_LITERAL?(u+=m+h.slice(c)+y,m=`
`):h.length>c||y[0]==="	"?(m===" "?m=`
`:!p&&m===`
`&&(m=`

`),u+=m+h.slice(c)+y,m=`
`,p=!0):y===""?m===`
`?u+=`
`:m=`
`:(u+=m+y,m=" ",p=!1)}switch(i.chomp){case"-":break;case"+":for(let f=o;f<r.length;++f)u+=`
`+r[f][0].slice(c);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}const b=s+i.length+e.source.length;return{value:u,type:a,comment:i.comment,range:[s,b,b]}}function Ki({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let m=1;m<i.length;++m){const p=i[m];if(!o&&(p==="-"||p==="+"))o=p;else{const b=Number(p);!r&&b?r=b:c===-1&&(c=n+m)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,d="",u=i.length;for(let m=1;m<e.length;++m){const p=e[m];switch(p.type){case"space":l=!0;case"newline":u+=p.source.length;break;case"comment":t&&!l&&s(p,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=p.source.length,d=p.source.substring(1);break;case"error":s(p,"UNEXPECTED_TOKEN",p.message),u+=p.source.length;break;default:{const b=`Unexpected token in block scalar header: ${p.type}`;s(p,"UNEXPECTED_TOKEN",b);const f=p.source;f&&typeof f=="string"&&(u+=f.length)}}}return{mode:a,indent:r,chomp:o,comment:d,length:u}}function qi(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function Wi(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(m,p,b)=>t(s+m,p,b);switch(i){case"scalar":o=O.PLAIN,c=Gi(a,l);break;case"single-quoted-scalar":o=O.QUOTE_SINGLE,c=Yi(a,l);break;case"double-quoted-scalar":o=O.QUOTE_DOUBLE,c=Ji(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const d=s+a.length,u=mt(r,d,e,t);return{value:c,type:o,comment:u.comment,range:[s,d,u.offset]}}function Gi(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Ns(n)}function Yi(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Ns(n.slice(1,-1)).replace(/''/g,"'")}function Ns(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function Ji(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=zi(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Qi[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Xi(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function zi(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Qi={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Xi(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Ls(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?ji(n,e,s):Wi(e,n.options.strict,s),c=t?n.directives.tagName(t.source,u=>s(t,"TAG_RESOLVE_FAILED",u)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[be]:c?l=Zi(n.schema,i,c,t,s):e.type==="scalar"?l=ea(n,i,e,s):l=n.schema[be];let d;try{const u=l.resolve(i,m=>s(t??e,"TAG_RESOLVE_FAILED",m),n.options);d=K(u)?u:new O(u)}catch(u){const m=u instanceof Error?u.message:String(u);s(t??e,"TAG_RESOLVE_FAILED",m),d=new O(i)}return d.range=o,d.source=i,a&&(d.type=a),c&&(d.tag=c),l.format&&(d.format=l.format),r&&(d.comment=r),d}function Zi(n,e,t,s,i){var o;if(t==="!")return n[be];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[be])}function ea({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[be];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[be];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),d=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",d,!0)}}return r}function ta(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const na={composeNode:Is,composeEmptyNode:Tn};function Is(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,d=!0;switch(e.type){case"alias":l=sa(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=Ls(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=Hi(na,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(u){const m=u instanceof Error?u.message:String(u);s(e,"RESOURCE_EXHAUSTION",m)}break;default:{const u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",u),d=!1}}return l??(l=Tn(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!K(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&d&&(l.srcToken=e),l}function Tn(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const d={type:"scalar",offset:ta(e,t,s),indent:-1,source:""},u=Ls(n,d,o,l);return r&&(u.anchor=r.source.substring(1),u.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),a&&(u.comment=a,u.range[2]=c),u}function sa({options:n},{offset:e,source:t,end:s},i){const a=new gn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=mt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function ia(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new Dt(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},d=Ye(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});d.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!d.hasNewline&&r(d.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Is(l,i,d,r):Tn(l,d.end,s,null,d,r);const u=c.contents.range[2],m=mt(a,u,!1,r);return m.comment&&(c.comment=m.comment),c.range=[t,u,m.offset],c}function et(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Un(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class aa{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=et(t);a?this.warnings.push(new Bi(r,s,i)):this.errors.push(new it(r,s,i))},this.directives=new ae({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Un(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(Y(a)&&!a.flow&&a.items.length>0){let r=a.items[0];z(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Un(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=et(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=ia(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new it(et(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new it(et(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=mt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new it(et(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Dt(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Ts="\uFEFF",As="",Cs="",un="";function ra(n){switch(n){case Ts:return"byte-order-mark";case As:return"doc-mode";case Cs:return"flow-error-end";case un:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function he(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Dn=new Set("0123456789ABCDEFabcdef"),oa=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),St=new Set(",[]{}"),la=new Set(` ,[]{}
\r	`),Qt=n=>!n||la.has(n);class ca{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&he(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Ts&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield As,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&he(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!he(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&he(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Qt),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&he(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Cs,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Qt),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||he(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>he(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield un,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(he(a)||e&&St.has(a))break;t=s}else if(he(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&St.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&St.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield un,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Qt))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(he(t)||e&&St.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!he(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(oa.has(t))t=this.buffer[++e];else if(t==="%"&&Dn.has(this.buffer[e+1])&&Dn.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class ua{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Ne(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Hn(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Os(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function _t(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Be(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function jn(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Ne(e.start,"explicit-key-ind")&&!Ne(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Os(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class da{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ca,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=ra(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&jn(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Hn(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Hn(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=_t(this.peek(2)),s=Be(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ne(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Os(t.key)&&!Ne(t.sep,"newline")){const o=Be(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ne(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=Be(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ne(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Ne(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Ne(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=_t(s),a=Be(i);jn(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=_t(e),s=Be(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=_t(e),s=Be(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function fa(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new ua||null,prettyErrors:e}}function ha(n,e={}){const{lineCounter:t,prettyErrors:s}=fa(e),i=new da(t==null?void 0:t.addNewLine),a=new aa(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new it(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Bn(n,t)),r.warnings.forEach(Bn(n,t))),r}function ke(n,e,t){let s;const i=ha(n,t);if(!i)return null;if(i.warnings.forEach(a=>is(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const ma=`# Simulation family catalog source-of-truth.
#
# Each top-level key is one simulation family shown in the UI.
# Parameter definitions live in \`parameter-info.yaml\`.
# Display stat configuration lives in \`stats-config.yaml\`.
#
# \`metadata.correctValues\`
#   Canonical target values for summary comparisons.
#   - when an id matches a simulation parameter, parameter-based similarity can use it
#   - when an id matches a run \`parameters.yaml\` entry or \`run_summary.yaml\`
#     summary metric, the summary overlay can render answer-closeness bars for it
#
# \`views\`
#   Optional display-mode video tabs.
#   - \`id\` must match a view key in the generated run manifest
#   - \`label\` renders text in the switcher
#   - \`icon\` can be used instead of text when a theme wants glyph-first tabs

planetary:
  label: Planetary
  placeholderImage: assets/planet_example.webp
  metadata:
    distinctSimulations: 384
    correctValues:
      moon_mass: 1.0
      earth_mass: 1.0
      spin: 1.0
      moon_iron: 1.0
      proto_earth_in_moon: 1.0

galaxy:
  label: Galaxy
  placeholderImage: assets/galaxy_example.webp
  views:
    - id: hst
      label: Hubble Space Telescope
      icon: hubble-space-telescope
    - id: sph_plus_hst
      label: Large Scale Structure
      icon: large-scale-structure
  metadata:
    distinctSimulations: 20488
    correctValues:
      stellar_mass: 6.1 # in units of 1e10 Msun
      black_hole_mass: 4.3 # in units of 1e6 Msun
      galaxy_age: 8.5 # in Gyr; approximate Milky Way mass-weighted stellar age

cosmos:
  label: Cosmos
  placeholderImage: assets/cosmos_example.webp
  views:
    - id: gas_density
      label: Gas Density
      icon: gas-density
    - id: gas_temperature
      label: Gas Temperature
      icon: gas-temperature
    - id: dark_matter_density
      label: Dark Matter
      icon: dark-matter
    - id: gas_metallicity_plus_stellar_density
      label: Metals + Stars
      icon: metals-stars
  metadata:
    distinctSimulations: 8192
    correctValues:
      baryon_fraction: 1.0
      black_hole_strength: 1.0
      gravity_strength: 1.0
`,pa=`# Parameter definitions for each simulation family.
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
    description: Mass of the body colliding with the proto-Earth. Determines the mass of the debris disk and the resulting moon mass.
    unit: M⊕
    min: 0.05
    max: 0.35
    step: 0.01
  impactor_velocity:
    label: Impactor Velocity
    description: Relative velocity at which the impactor strikes the proto-Earth. Higher velocities produce more energetic collisions and hotter debris disks.
    unit: km/s
    min: 1
    max: 3
    step: 0.1
  impactor_angle:
    label: Impactor Angle
    description: Impact angle relative to the proto-Earth surface. Oblique impacts can produce different disk geometries than head-on collisions.
    unit: °
    min: 0
    max: 60
    step: 1

galaxy:
  stellar_mass:
    label: Stellar Mass
    description: Total stellar mass measured within R200 in the final snapshot. Across the current galaxy runs this spans dwarf-like systems up to massive Milky Way-scale galaxies.
    unit: '×10¹⁰ M☉'
    min: 0.1
    max: 20
    value_scale: 1.0e10
    display_unit: Msun
    display_format: scientific
    display_significant_figures: 3
  black_hole_mass:
    label: Black Hole Mass
    description: Central black hole mass measured within R200 in the final snapshot. The current galaxy runs cover small seeds through to very massive supermassive black holes.
    unit: '×10⁶ M☉'
    min: 0.1
    max: 250
    value_scale: 1.0e6
    display_unit: Msun
    display_format: scientific
    display_significant_figures: 3
  galaxy_age:
    label: Galaxy Age
    description: Mass-weighted stellar age of the galaxy in the final snapshot. The available runs cluster around 5-8 Gyr, but the slider extends to the age of an old Milky Way-like system for comparison.
    unit: Gyr
    min: 4
    max: 13.8

cosmos:
  baryon_fraction:
    label: Baryon Fraction
    description: The fraction of matter that is ordinary (visible/baryonic) versus dark matter. This controls the amount of gas available in the Universe for star and galaxy formation. One of the main goals in cosmological simulations is testing fundamental cosmological parameters such as this fraction.
    unit: ''
    min: 0.10
    max: 4
    step: 0.01
    value_scale: 0.159
  black_hole_strength:
    label: Black Hole Strength
    description: The temperature of gas escaping from a black hole. As gas falls in towards a black hole, it becomes superheated and forms an "accretion disc" around the black hole. This superheated plasma wants to escape and does so either as heat dumped into the environment or "jets" blasted out from the poles. Astrophysicists call this "feedback" but exactly how strong this feedback is, and the manner in which it leaves the black hole is up for debate.
    unit: 'K'
    min: 0.01
    max: 50.0
    step: 0.01
    value_scale: 8.80e7
    display_format: scientific
    display_significant_figures: 3
  gravity_strength:
    label: Gravity
    description: The strength of gravity, as described by Newton's gravitational constant G. Varying G changes the rate at which matter collapses into cosmic structures like dark matter halos and the cosmic web.
    unit: m^3 kg^-1 s^-2
    min: 0.01
    max: 10
    step: 0.01
    value_scale: 6.6743e-11
    display_format: scientific
    display_significant_figures: 3
`,ga=`# Summary overlay display configuration for each simulation family.
#
# Each family has three config blocks:
#   resources       — cards shown in the "Resources Used" section
#   simulationStats — cards shown in the "Simulation Stats" section
#   similarityScore — fallback score display when no scientific bars exist
#
# Stat fields:
#   id             — built-in metric key or key in the run's run_summary.yaml
#                    summaryMetrics map
#   label          — override for the card title (falls back to metric label)
#   value          — initial / fallback display value
#   unit           — appended after the formatted value
#   description    — explanatory text shown in a tap-to-open overlay
#   display_format — \`integer\`, \`float\`, or \`scientific\`
#   precision      — decimal places or scientific significant figures

planetary:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kgCO2e
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  simulationStats:
    - id: moon_mass
      label: Moon mass
      value: '1.05'
      description: How close you got to making the real Moon. Too small and the tides would be weak — too big and the night sky would be terrifying.
    - id: earth_mass
      label: Earth mass
      value: '1.55'
      description: How close your Earth ended up to the one we actually live on.
    - id: spin
      label: System spin
      value: '0.30'
      description: How fast the Earth-Moon pair is spinning. This sets the length of a day — faster spin means shorter days.
    - id: moon_iron
      label: Moon iron
      value: '0.70'
      description: How iron-poor your Moon turned out. The real Moon has surprisingly little iron in it — a clue about how it was born.
    - id: proto_earth_in_moon
      label: Earth in Moon
      value: '1.25'
      description: How much of your Moon came from the early Earth versus the rogue object that smashed into it.
  similarityScore:
    value: 100/100

galaxy:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kgCO2e
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass
      value: '0'
      unit: Msun
      display_format: scientific
      precision: 3
      description: How many stars your galaxy managed to make. Each solar mass is the weight of our own Sun.
    - id: stellar_size_kpc
      label: Stellar size
      value: '0'
      unit: kpc
      display_format: float
      precision: 2
      description: The size of your galaxy's star-lit disc from one edge to the other.
    - id: black_hole_mass_msun
      label: Black hole mass
      value: '0'
      unit: Msun
      display_format: scientific
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
    - id: galaxy_age
      label: Galaxy age
      value: '0'
      unit: yr
      display_format: float
      precision: 2
      value_scale: 1.0e9
      description: The average age of all the stars in your galaxy. Older means it formed its stars a long time ago.
  similarityScore:
    value: 100/100

cosmos:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kgCO2e
      display_format: float
      precision: 2
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass formed
      value: '0'
      unit: Msun
      display_format: scientific
      precision: 3
      description: How much star-stuff your universe managed to cook up across all of cosmic history.
    - id: number_of_black_holes
      label: Black holes formed
      value: '0'
      display_format: integer
      description: How many black holes popped into existence over the course of your universe.
    - id: particlesUpdated
      label: Particles updated
      value: '0'
      display_format: integer
      description: The sheer number of moving pieces the simulation had to keep track of every single frame.
  similarityScore:
    value: 100/100
`,ya=`# Live telemetry HUD display configuration for each simulation family.
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
      unit: M⊕
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
      unit: Gyr
      label: Universe Age
      live: true
      live_key: CosmicTime_Gyr
    - id: stellar_mass
      value: '0'
      unit: Msun
      label: Stellar Mass
      live: true
      live_key: StellarMassWithinR200_Msun
    - id: stellar_size
      value: 0.0
      unit: kpc
      label: Stellar Size
      live: true
      live_key: StellarHalfMassRadius_kpc
    - id: black_hole_mass
      value: '0'
      unit: Msun
      label: Black Hole Mass
      live: true
      live_key: BHSubgridMassWithinR200_Msun
    - id: star_formation_rate
      value: 0.0
      unit: Msun/yr
      label: SFR
      live: true
      live_key: StarFormationRateWithinR200_Msun_per_yr
    - id: galaxy_age
      value: 0.0
      unit: Gyr
      label: Mass-Weighted Age
      live: true
      live_key: StellarMassWeightedAge_yr
      value_scale: 1.0e-9

cosmos:
  liveStats:
    - id: age
      value: 0.0
      unit: Gyr
      live: true
      live_key: age_years
      value_scale: 1.0e-9
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
`;function Q(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const ba=ke(ma),wa=ke(pa),va=ke(ga),Sa=ke(ya),Ve=Object.entries(ba).map(([n,e])=>{var a;const t=_a(va[n]),s=((a=Sa[n])==null?void 0:a.liveStats)??[],i=wa[n]??{};return{id:n,label:e.label,placeholderImage:Q(e.placeholderImage),metadata:{distinctSimulations:e.metadata.distinctSimulations,correctValues:e.metadata.correctValues,summaryStats:t.map(lt),liveStats:s.map(lt)},parameters:Object.entries(i).map(([r,o])=>{const c=o.step??ka(o.min,o.max),l=Ea(o.min,o.max);return{id:r,label:o.label,unit:o.unit??"",min:o.min,max:o.max,step:c,fallbackValue:l,description:o.description,valueScale:o.value_scale,displayUnit:o.display_unit,displayFormat:o.display_format,displaySignificantFigures:o.display_significant_figures}}),views:(e.views??[]).map(r=>({id:r.id,label:r.label,icon:r.icon}))}});function _a(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push(lt({...t,section:"resources"}));for(const t of n.simulationStats??[])e.push(lt({...t,section:"simulationStats"}));return n.similarityScore&&e.push(lt({id:"similarityScore",value:n.similarityScore.value})),e}function lt(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function ka(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Ea(n,e){return n+(e-n)/2}const Ms="universe-engine-theme",Ps=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Na(){const n=localStorage.getItem(Ms);return Ia(n)?n:"glass"}function Xt(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Ms,n)}function La(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Ps){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function Ia(n){return Ps.some(e=>e.id===n)}function Ta(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r;const o=new Map,c=new Map;let l=null,d=null;s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{R(),!(!i||!Number.isFinite(s.duration)||s.duration<=0)&&i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let u=s.playbackRate;function m(){l&&(URL.revokeObjectURL(l),l=null)}function p(I,C={}){const P=c.get(I);P&&(c.delete(I),C={...C,ownedObjectUrl:!0},I=P),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(I)){s.classList.remove("fade-out");return}const V=s.muted,F=C.seekFraction;m(),l=C.ownedObjectUrl?I:null,s.src=I,s.load(),s.onloadeddata=()=>{if(s.muted=V,F!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const D=Math.max(0,Math.min(.999,F));s.currentTime=D*s.duration}else s.currentTime=0;s.playbackRate=u,s.classList.remove("fade-out"),C.autoplay&&s.play().catch(()=>{})}},120)}function b(I){s.muted=I}async function f(){await s.play()}function h(){s.pause()}function y(){s.classList.add("is-empty")}function k(){s.classList.remove("is-empty")}function S(I){if(!Number.isFinite(s.duration)||s.duration<=0)return;const C=Math.max(0,Math.min(1,I));s.currentTime=C*s.duration}function w(){s.currentTime=0,i==null||i(0)}function _(I=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(C=>{const P=()=>{F(),C()},V=window.setTimeout(()=>{F(),C()},Math.max(0,I));function F(){window.clearTimeout(V),s.removeEventListener("loadeddata",P)}s.addEventListener("loadeddata",P,{once:!0})})}function L(I,C=8e3){const P=Math.max(0,I);return P===0||N(P)?Promise.resolve():new Promise(V=>{const F=()=>{N(P)&&(H(),V())},D=window.setTimeout(()=>{H(),V()},Math.max(0,C));function H(){window.clearTimeout(D),s.removeEventListener("progress",F),s.removeEventListener("canplay",F),s.removeEventListener("loadeddata",F)}s.addEventListener("progress",F),s.addEventListener("canplay",F),s.addEventListener("loadeddata",F),F()})}function N(I){const C=s.currentTime;for(let P=0;P<s.buffered.length;P+=1){const V=s.buffered.start(P),F=s.buffered.end(P);if(!(C<V||C>F))return F-C>=I}return!1}function E(I){const C=new Set(I.filter(Boolean).filter(P=>P!==s.currentSrc));for(const[P,V]of o.entries())C.has(P)||(V.removeAttribute("src"),V.load(),o.delete(P));for(const P of C){if(o.has(P))continue;const V=document.createElement("video");V.preload="auto",V.muted=!0,V.playsInline=!0,V.src=P,V.load(),o.set(P,V)}for(const P of C){if(c.has(P))continue;const V=`${P}?_=${Date.now()}`;fetch(V).then(async F=>{if(!F.ok)return;const D=await F.blob();c.set(P,URL.createObjectURL(D))}).catch(()=>{})}}function A(){for(const I of o.values())I.removeAttribute("src"),I.load();o.clear();for(const I of c.values())URL.revokeObjectURL(I);c.clear()}function x(I){return c.get(I)??null}function R(){if(s.readyState<2||s.videoWidth===0||s.videoHeight===0)return;const I=document.createElement("canvas");I.width=s.videoWidth,I.height=s.videoHeight;const C=I.getContext("2d");C&&(C.drawImage(s,0,0,I.width,I.height),d=I.toDataURL("image/jpeg",.85))}function B(){return d||R(),d}function U(I){i=I}function G(I){a=I}return{setSource:p,setMuted:b,play:f,pause:h,hideMedia:y,showMedia:k,seekToFraction:S,resetPlayback:w,waitForLoadedData:_,waitForBufferedAhead:L,onTimeUpdate:U,onEnded:G,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:I=>{u=I,s.playbackRate=I},getPlaybackRate:()=>u,onPlayStateChange:I=>{r=I},getElement:()=>t,prewarmSources:E,clearPrewarmedSources:A,getPrewarmedBlobUrl:x,captureFrame:B}}const Aa=[.25,.5,1];function Ca(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onScrubStart:a,onScrubEnd:r,initialSpeed:o=1}=e,c=document.createElement("div");c.className="timeline";const l=document.createElement("div");l.className="timeline__bar-row";const d=document.createElement("button");d.className="timeline__play-btn",d.type="button",d.setAttribute("aria-label","Toggle playback"),d.addEventListener("click",()=>s==null?void 0:s());const u=document.createElement("input");u.className="timeline__slider",u.type="range",u.min="0",u.max="1000",u.step="1",u.value="0",u.style.setProperty("--fill","0%"),u.setAttribute("aria-label","Simulation time");const m=document.createElement("div");m.className="timeline__speed";const p=document.createElement("button");p.className="timeline__speed-btn",p.type="button",p.setAttribute("aria-label","Playback speed"),p.addEventListener("click",()=>{m.classList.toggle("open")});const b=document.createElement("div");b.className="timeline__speed-menu";for(const h of Aa){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=Zt(h),y.addEventListener("click",()=>{m.classList.remove("open"),i==null||i(h)}),b.appendChild(y)}return m.appendChild(p),m.appendChild(b),l.appendChild(d),l.appendChild(u),l.appendChild(m),u.addEventListener("input",()=>{const h=parseInt(u.value,10)/1e3;u.style.setProperty("--fill",`${h*100}%`),t==null||t(h)}),u.addEventListener("pointerdown",()=>a==null?void 0:a()),u.addEventListener("pointerup",()=>r==null?void 0:r()),u.addEventListener("change",()=>r==null?void 0:r()),document.addEventListener("click",h=>{m.contains(h.target)||m.classList.remove("open")}),c.appendChild(l),n.appendChild(c),f(o),{setPosition(h){const y=Math.max(0,Math.min(1,h));u.value=String(Math.round(y*1e3)),u.style.setProperty("--fill",`${y*100}%`)},setPlaying(h){d.textContent=h?"⏸":"▶",d.classList.toggle("is-paused",!h),d.setAttribute("aria-label",h?"Pause":"Play")},setSpeed(h){f(h)}};function f(h){p.textContent=Zt(h);for(const y of b.children)y.classList.toggle("is-active",y.textContent===Zt(h))}}function Zt(n){return`x${n}`}function Oa(n,e){const t=Math.min($s(e),2);return n.toFixed(t)}function Le(n,e){return e?`${n} ${e}`:n}function Ct(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?tt(n):e<1e6?`${t}${tt(n/1e3)}K`:e<1e9?`${t}${tt(n/1e6)}M`:e<1e12?`${t}${tt(n/1e9)}B`:`${t}${tt(n/1e12)}T`:String(n)}function tt(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Ma(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function xs(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"){const o=Math.max(1,e.precision??3);return a.toExponential(o-1).replace("e+","e").replace(/\.0+e/,"e")}const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function at(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;if(t.format==="scientific"){const r=Math.max(1,t.significantFigures??3);return i.toExponential(r-1).replace("e+","e").replace(/\.0+e/,"e")}return Oa(i,a)}function $s(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function Pa(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=xa(s,i,a);for(const o of s.metadata.liveStats){const c=Ra(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function xa(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:at(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:$a(a),value:r}]))}}function $a(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Ra(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=Fa((i==null?void 0:i.value)??t.value??n.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Le(a,n.unit)}}function Fa(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Ct(Math.round(a)):Ct(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Ma(n,{integer:e.integer})}function Ba(n,e,t){const s=Q("assets/banner-1600.webp"),i=[`${Q("assets/banner-960.webp")} 960w`,`${Q("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(l){o.innerHTML="";for(const d of l){const u=document.createElement("button");u.className="entry-overlay__button",u.type="button",u.innerHTML=`
        <span class="entry-overlay__button-label">${d.label}</span>
      `,u.addEventListener("click",()=>t(d)),o.appendChild(u)}}return c(e),r.appendChild(o),a.appendChild(r),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(l){c(l)}}}function Va(n,e,t,s){const i=n.parameters.filter(h=>n.metadata.correctValues[h.id]!==void 0).map(h=>{const y=e[h.id]??h.fallbackValue,k=n.metadata.correctValues[h.id]??h.fallbackValue;return Math.abs(y-k)/Math.max(h.max-h.min,1e-9)}),a=i.reduce((h,y)=>h+y,0)/Math.max(i.length,1),r=Math.max(0,Math.round((1-a)*100)),o=((s==null?void 0:s.carbonBurnt)??.8+a*4.2).toFixed(2),c=(s==null?void 0:s.computeUsed)??18+a*46,l=(s==null?void 0:s.memoryUsed)??12+a*84,d=`${en(c,1)} CPU-hrs
${en(l,1)} GB`,u=String(n.parameters.length),m=`${(a*100).toFixed(1)}%`,p=String(n.parameters.length+6),b="Present",f=Da((s==null?void 0:s.wallclockSeconds)??t);return{scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:u},runtime:{label:"Total Runtime",value:f},similarityScore:{label:"Similarity Score",value:`${r}/100`},bestFitDelta:{label:"Best-Fit Delta",value:m},carbonBurnt:{label:"Carbon Burnt",value:o},computeUsed:{label:"Compute Used",value:d},memoryUsed:{label:"Memory Used",value:en(l,1)},particlesUpdated:{label:"Particle updates",value:s?Ua(s.particlesUpdated):"--"},audioTrack:{label:"Audio Track",value:b},terminalLines:{label:"Terminal Lines",value:p},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([h,y])=>[h,{label:y.label,value:y.value}]))}}function Ua(n){return String(Math.max(0,n))}function Da(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function en(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}const Ha={TYPING_MS_PER_CHAR:8.5,FINAL_PAUSE_MS:1e3},ja={HIDE_AFTER_MS:980},Ka="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",qa="https://universe-engine.universe-engine.workers.dev/api/track-run",Wa=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
# Each section is a simulation family (theme).
# Each entry maps situation keys (greenLow, greenHigh, amberLow, amberHigh,
# redLow, redHigh) to descriptive message text.
# Planetary entries are keyed by bar label; galaxy and cosmos entries are
# keyed by parameter id.

planetary:
  Moon mass:
    greenLow: Spot on. Your Moon came out just a fraction lighter than the real one — well within range.
    greenHigh: Spot on. Your Moon came out just a fraction heavier than the real one — well within range.
    amberLow: A bit light. Slightly too little material made it into orbit, so this Moon is a touch small.
    amberHigh: A bit heavy. Slightly too much material made it into orbit, so this Moon is a touch large.
    redLow: Far too light. Barely any material reached orbit — this Moon would be much smaller than the real one.
    redHigh: Far too heavy. So much material was flung into orbit that this Moon would dwarf the real one.
  Earth mass:
    greenLow: Spot on. The Earth ended up a fraction lighter than today's — well within range.
    greenHigh: Spot on. The Earth ended up a fraction heavier than today's — well within range.
    amberLow: A bit light. A little too much was lost in the collision, leaving Earth slightly underweight.
    amberHigh: A bit heavy. A little too much material was kept, leaving Earth slightly overweight.
    redLow: Far too light. This impact stripped away too much — the Earth would never end up this small.
    redHigh: Far too heavy. Almost nothing was lost, so the Earth ends up far more massive than it really is.
  Spin of Earth-Moon system:
    greenLow: Spot on. The system spins just slightly slower than the real one — well within range.
    greenHigh: Spot on. The system spins just slightly faster than the real one — well within range.
    amberLow: A bit slow. The early day would have been a little longer than it should have been.
    amberHigh: A bit fast. The early day would have been a little shorter than it should have been.
    redLow: Far too slow. This impact gave the system hardly any spin — nothing like the fast-spinning early Earth-Moon.
    redHigh: Far too fast. This impact gave the system huge spin — the early day would have been extremely short.
  Moon iron:
    greenLow: Spot on — just a hair below the real Moon's iron, which is famously tiny.
    greenHigh: Spot on — just a hair above the real Moon's iron, which is famously tiny.
    amberLow: A little under. Even less iron than the real Moon, which already has very little.
    amberHigh: A little over. Somewhat more iron than the real Moon, which is unusually iron-poor.
    redLow: Far too little — almost no iron at all, well below even the real Moon's tiny amount.
    redHigh: Far too much iron. The real Moon is strange because it has almost none — a high-iron Moon looks nothing like ours.
  Proto-Earth in Moon:
    greenLow: Spot on — just below the expected share of material from the original Earth.
    greenHigh: Spot on — just above the expected share of material from the original Earth.
    amberLow: A bit low. Slightly less of this Moon comes from the original Earth than models expect.
    amberHigh: A bit high. Slightly more of this Moon comes from the original Earth than models expect.
    redLow: Far too low. Almost none of this Moon came from the original Earth — it is mostly impactor material.
    redHigh: Far too high. This Moon is made almost entirely of original-Earth material, more than models suggest.

galaxy:
  stellar_mass:
    greenLow: Very close. Your galaxy built just a fraction fewer stars than the Milky Way.
    greenHigh: Very close. Your galaxy built just a fraction more stars than the Milky Way.
    amberLow: A bit low. Your galaxy made fewer stars than the Milky Way, so it would look smaller and dimmer in the sky.
    amberHigh: A bit high. Your galaxy made more stars than the Milky Way, so it would be a brighter, busier place.
    redLow: Far too low. This galaxy is a shadow of the Milky Way — far fewer stars than the real thing.
    redHigh: Far too high. This galaxy is absolutely bursting with stars, far more than the Milky Way.
  black_hole_mass:
    greenLow: Very close. The black hole at the centre is just a fraction lighter than the one in the Milky Way.
    greenHigh: Very close. The black hole at the centre is just a fraction heavier than the one in the Milky Way.
    amberLow: A bit low. Your central black hole is smaller than the Milky Way's — it's still hungry.
    amberHigh: A bit high. Your central black hole is bigger than the Milky Way's — it's been feasting.
    redLow: Far too low. The supermassive black hole at your galaxy's heart is surprisingly small.
    redHigh: Far too high. The central black hole is enormous — far larger than the Milky Way's Sagittarius A*.
  galaxy_age:
    greenLow: Very close. The stars in your galaxy are just a touch younger, on average, than the Milky Way's.
    greenHigh: Very close. The stars in your galaxy are just a touch older, on average, than the Milky Way's.
    amberLow: A bit young. Most of the stars in your galaxy formed later than in the Milky Way.
    amberHigh: A bit old. Most of the stars in your galaxy formed earlier than in the Milky Way.
    redLow: Far too young. Your galaxy is dominated by freshly-minted stars — it's practically a newborn.
    redHigh: Far too old. Your galaxy is full of ancient stars that formed very early on.

cosmos:
  baryon_fraction:
    greenLow: Very close. You picked just a fraction less ordinary matter than our own universe — barely any difference.
    greenHigh: Very close. You picked just a fraction more ordinary matter than our own universe — barely any difference.
    amberLow: A bit low. With less ordinary matter, there's less raw material around to build stars and galaxies.
    amberHigh: A bit high. With more ordinary matter, there's extra gas floating around to feed star formation.
    redLow: Far too low. There's so little ordinary matter that your universe would struggle to build anything at all.
    redHigh: Far too high. There's so much ordinary matter that your universe would look completely different to the one we see.
  black_hole_strength:
    greenLow: Very close. The push from black holes is just a shade gentler than in our universe.
    greenHigh: Very close. The push from black holes is just a shade fiercer than in our universe.
    amberLow: A bit weak. Your black holes are too gentle, letting galaxies hold onto more gas and keep forming stars.
    amberHigh: A bit strong. Your black holes blast out too much energy, making it harder for galaxies to hold onto their gas.
    redLow: Far too weak. Black holes barely push back, so galaxy growth would run unchecked.
    redHigh: Far too strong. Black holes are blasting energy everywhere, dramatically shutting down galaxy growth.
  gravity_strength:
    greenLow: Very close. Gravity is a whisker weaker than in our universe, so things take slightly longer to come together.
    greenHigh: Very close. Gravity is a whisker stronger than in our universe, so things come together slightly faster.
    amberLow: A bit weak. Weaker gravity means it takes longer for stars and galaxies to start forming.
    amberHigh: A bit strong. Stronger gravity causes matter to clump together more quickly than normal.
    redLow: Far too weak. Gravity is so feeble that your universe would take ages to build anything interesting.
    redHigh: Far too high. Gravity is overwhelming — matter collapses far too fast for the usual cosmic timeline.
`,Rs=(()=>{const n=ke(Wa),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Ot="#4CD98A",dn="#E8951C",Fs="#D7372A",Bs=.2,Vs=.5,Kn=2;function fn(n){const e=Math.abs(n-1);return e<=Bs?{word:"On target",colour:Ot}:e<=Vs?{word:n>1?"Too high":"Too low",colour:dn}:{word:n>1?"Way too high":"Way too low",colour:Fs}}function Us(n){const e=Math.abs(n-1),t=n>=1;return e<=Bs?t?"greenHigh":"greenLow":e<=Vs?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Ga(n){return Math.min(Math.max(n,0),Kn)/Kn*100}function Ya(n){return n>=85?{word:"Almost perfect",colour:Ot}:n>=65?{word:"Really close",colour:Ot}:n>=45?{word:"Getting there",colour:dn}:n>=25?{word:"Not quite",colour:dn}:{word:"Way off - try again",colour:Fs}}function Ja(n,e){var s;const t=Us(e);return((s=Rs[n])==null?void 0:s[t])??""}function za(n,e,t){var r;const s=Us(t),i=(r=Rs[n])==null?void 0:r[s];return i||(fn(t).colour===Ot?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Qa(n,e,t){return Object.entries(n.metadata.correctValues).map(([s,i])=>{const a=Xa(s,n,e,t);if(a===null)return null;const r=a/Math.max(i,1e-9),o=Za(s,n,t),c=er(s,n),l=Ja(o,r)||za(s,o,r);return{id:s,label:o,value:r,rawValue:a,unit:c,detail:l}}).filter(s=>s!==null)}function Xa(n,e,t,s){var c,l;const i=e.parameters.find(d=>d.id===n);if(i)return t[n]??i.fallbackValue;const a=s==null?void 0:s.parameterValues[n];if(typeof a=="number"&&Number.isFinite(a))return a;const r=qn((c=s==null?void 0:s.summaryMetrics[n])==null?void 0:c.value);return r!==null?r:qn((l=e.metadata.summaryStats.find(d=>d.id===n))==null?void 0:l.value)}function Za(n,e,t){var s,i,a;return((s=e.parameters.find(r=>r.id===n))==null?void 0:s.label)??((i=e.metadata.summaryStats.find(r=>r.id===n))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[n])==null?void 0:a.label)??n}function er(n,e){var t,s;return((t=e.parameters.find(i=>i.id===n))==null?void 0:t.unit)??((s=e.metadata.summaryStats.find(i=>i.id===n))==null?void 0:s.unit)}function qn(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function tr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function nr(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div");a.className="summary-overlay__content";const r=document.createElement("div");r.className="summary-overlay__actions";const o=document.createElement("button");o.className="summary-overlay__button summary-overlay__button--primary",o.type="button",o.textContent="Replay";const c=document.createElement("button"),l=document.createElement("button");c.className="summary-overlay__button",c.type="button",c.textContent="New Parameters",l.className="summary-overlay__button",l.type="button",l.textContent="Home",l.hidden=!e.showHome,o.addEventListener("click",e.onReplay),c.addEventListener("click",e.onParameters),l.addEventListener("click",e.onHome),r.appendChild(o),r.appendChild(c),r.appendChild(l),i.appendChild(a),i.appendChild(r),t.appendChild(i);const d=document.createElement("div");d.className="sci-modal is-hidden",d.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(d),n.appendChild(t);const u=d.querySelector(".sci-modal__title"),m=d.querySelector(".sci-modal__verdict"),p=d.querySelector(".sci-modal__body"),b=d.querySelector(".sci-modal__close");function f(w){const _=fn(w.value);u.textContent=w.label,m.textContent=_.word,m.style.color=_.colour,m.hidden=!1,p.textContent=w.detail,d.classList.remove("is-hidden")}function h(w,_){u.textContent=w,m.hidden=!0,p.textContent=_,d.classList.remove("is-hidden")}function y(){d.classList.add("is-hidden")}b.addEventListener("click",y),d.addEventListener("click",w=>{w.target===d&&y()});function k(w,_){const L=document.createElement("div");L.className=`${w.className} panel`,L.innerHTML=`<p class="sci-section__title">${w.title}</p>`;const N=document.createElement("div"),E=w.singleRow?Math.max(1,w.stats.length):Math.max(1,Math.min(w.stats.length,w.maxColumns));N.className="metric-grid",w.singleRow&&N.classList.add("metric-grid--single-row"),N.style.setProperty("--summary-grid-columns",String(E)),N.style.setProperty("--summary-grid-max-width",`${w.maxWidthRem}rem`);for(const A of w.stats){const x=sr(A,_),R=document.createElement("div"),B=document.createElement("span"),U=document.createElement("span");R.className="res-card",B.className="res-card__label",B.textContent=x.label,U.className="res-card__value",U.textContent=x.value,R.appendChild(B),R.appendChild(U),A.description&&(R.classList.add("res-card--has-info"),R.addEventListener("click",()=>{h(x.label,A.description)})),N.appendChild(R)}return L.appendChild(N),L}function S(w){const _=document.createElement("div");_.className="res-section panel",_.innerHTML='<p class="sci-section__title">Simulation Stats</p>';const L=document.createElement("div");L.className="metric-grid",L.style.setProperty("--summary-grid-columns",String(Math.max(1,w.length))),L.style.setProperty("--summary-grid-max-width","48rem");for(const N of w){const E=document.createElement("div"),A=document.createElement("span"),x=document.createElement("span");E.className="res-card res-card--has-info",A.className="res-card__label",A.textContent=N.label,x.className="res-card__value",x.textContent=Number.isFinite(N.rawValue)?Le(Number(N.rawValue.toPrecision(4)).toString(),N.unit):"--",E.appendChild(A),E.appendChild(x),E.addEventListener("click",()=>h(N.label,N.detail)),L.appendChild(E)}return _.appendChild(L),_}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},ja.HIDE_AFTER_MS)},setHomeVisible(w){l.hidden=!w},update(w,_,L,N,E){var D;a.innerHTML="",y();const A=Va(w,_,L,N),x=w.metadata.summaryStats,R=Qa(w,_,N);let B;if(R.length>0)B=tr(R);else{const H=((D=A.similarityScore)==null?void 0:D.value)??"0/100";B=parseInt(H,10)||0}const U=Ya(B),G=document.createElement("div"),I=document.createElement("div"),C=document.createElement("div");G.className="sci-top",I.className="summary-main-column",C.className="summary-side-column";const P=document.createElement("div");P.className="sci-hero panel",E?(P.classList.add("sci-hero--thumbnail"),P.innerHTML=`<img class="sci-hero__thumbnail" src="${E}" alt="Final frame of simulation" />`):P.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${B}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${U.colour}">${U.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${B}%; background:${U.colour}; box-shadow:0 0 12px ${U.colour}"></div>
          </div>
        `,I.appendChild(P);const V=x.filter(H=>(H.section??"resources")==="resources"&&!R.some(j=>j.id===String(H.id))&&H.id!=="similarityScore"),F=x.filter(H=>H.section==="simulationStats"&&H.id!=="similarityScore");if(V.length>0&&C.appendChild(k({title:"Resources Used",className:"res-section",stats:V,maxColumns:3,maxWidthRem:48},A)),F.length>0?C.appendChild(k({title:"Simulation Stats",className:"res-section",stats:F,maxColumns:F.length,maxWidthRem:48,singleRow:!0},A)):R.length>0&&C.appendChild(S(R)),G.appendChild(I),C.childElementCount>0&&G.appendChild(C),a.appendChild(G),R.length>0){const H=document.createElement("div");H.className="sci-bottom-row";const j=document.createElement("div");j.className="sci-section panel param-section",j.innerHTML='<p class="sci-section__title">Input Parameters</p>';const pe=document.createElement("div");pe.className="param-cards";for(const M of w.parameters){const ge=_[M.id]??M.fallbackValue,oe=M.valueScale??1;let Ee=ge*oe,Te=M.displayUnit??M.unit;M.unit==="Gyr"&&(Ee*=1e9,Te="yr");const te=document.createElement("div"),de=document.createElement("span"),ye=document.createElement("span");te.className="res-card",M.description&&(te.classList.add("res-card--has-info"),te.addEventListener("click",()=>h(M.label,M.description))),de.className="res-card__label",de.textContent=M.label,ye.className="res-card__value";const Ae=M.displayFormat==="scientific"?xs(String(Ee),{mode:"scientific",precision:M.displaySignificantFigures??3}):Ct(Ee);ye.textContent=Le(Ae,Te),te.appendChild(de),te.appendChild(ye),pe.appendChild(te)}j.appendChild(pe);const Z=document.createElement("div");Z.className="sci-section panel",Z.innerHTML='<p class="sci-section__title">Similarity Results</p>';const ee=document.createElement("div");ee.className="sci-bars";for(const M of R){const ge=fn(M.value),oe=document.createElement("div");oe.className="sci-bar",oe.innerHTML=`
            <div class="sci-bar__name">${M.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Ga(M.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__verdict" style="color:${ge.colour}">${ge.word}</div>
          `,oe.addEventListener("click",()=>f(M)),ee.appendChild(oe)}Z.appendChild(ee),H.appendChild(j),H.appendChild(Z),a.appendChild(H)}}}}function sr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:n.value??"--",i=ir(s,n);return{label:n.label??t.label,value:Le(i,n.unit)}}function ir(n,e){if(n==="--")return n;const t=Number(n);if(!Number.isFinite(t))return n;if(e.displayFormat==="scientific")return xs(n,{scale:e.valueScale,mode:"scientific",precision:e.precision});const s=e.valueScale??1,i=t*s;return Ct(i)}function ar(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("button");r.className="view-switcher__button",r.type="button",r.dataset.viewId=a.id,r.classList.toggle("is-active",a.id===i),r.setAttribute("aria-pressed",String(a.id===i)),r.setAttribute("aria-label",a.label??a.id);const o=rr(a.icon);if(o){const l=document.createElement("span");l.className="view-switcher__icon",l.setAttribute("aria-hidden","true"),l.appendChild(o),r.appendChild(l)}const c=document.createElement("span");c.className="view-switcher__label",c.textContent=a.label??a.id,r.appendChild(c),r.addEventListener("click",()=>e.onSelect(a.id)),t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function rr(n){switch(n){case"dark-matter":return Ue(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Ue(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Ue(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Ue(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Ue(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return Ue(`
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
      `);default:return null}}function Ue(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}const or=`# Credits source-of-truth.
#
# Schema:
# - top-level is a YAML list
# - each list item is one credit entry
# - each entry must contain:
#     - \`text\` (required):  the exact text that must appear in the credits
#     - \`url\` (optional):   a URL that makes the entry a clickable link
#     - \`header\` (optional): when true renders as a section heading

- text: App Author
  header: true

- text: Dr Will Roper (University of Sussex / University of Oxford)
  url: https://willjroper.github.io/

- text: Simulations
  header: true

- text: All simulations performed with SWIFT
  url: https://swift.strw.leidenuniv.nl/

- text: Forward modelling done with Synthesizer
  url: https://synthesizer-project.github.io/synthesizer/#

- text: "Moon formation simulations by Jacob Kegerreis, Callum Mosley, Ella Buxton, Vince Eke"

- text: "Galaxy formation simulations by Kyle Oman, Diego Dado, Isabel Santos, James Trayford, Owen Jessop, Will Roper, + The COLIBRE Team"

- text: "Large scale structure simulations by Will Roper, Daniele Sorini, Isabel Santos, Owen Jessop, Sarah Johnston, + The FLAMINGO Team"

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

- text: "Milky Way: ESO / S. Brunier"
  url: https://www.eso.org/

- text: "COLIBRE: The COLIBRE Team (Schaye et al. 2026)"
  url: https://colibre.strw.leidenuniv.nl/team.html

- text: "FLAMINGO: The FLAMINGO Team (Schaye et al. 2023)"
  url: https://flamingo.strw.leidenuniv.nl/team.html

- text: "Moon Formation: Jacob Kegerreis & NASA"
  url: https://www.nasa.gov/solar-system/collision-may-have-formed-the-moon-in-mere-hours-simulations-reveal/#:~:text=%E2%80%9CThis%20opens%20up%20a%20whole,in%20The%20Astrophysical%20Journal%20Letters.

- text: Licensing
  header: true

- text: UniverseEngine is released under the GNU General Public License v3.0
  url: https://www.gnu.org/licenses/gpl-3.0.en.html

- text: COLIBRE and FLAMINGO content is licensed under CC BY 4.0
  url: https://creativecommons.org/licenses/by/4.0/
`;function lr(){const n=ke(or);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function cr(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(d,u){a=d,r=u?{...u}:ur(d),i.innerHTML="";const m=document.createElement("div");m.className="parameter-editor__heading",m.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${d.label} Controls</h2>
    `,i.appendChild(m);const p=document.createElement("div");p.className="parameter-editor__list";for(const b of d.parameters)p.appendChild(c(b));i.appendChild(p),l()}function c(d){const u=document.createElement("section");u.className="param";const m=document.createElement("div");m.className="param__label";const p=d.displayUnit??d.unit,b=document.createElement("div");b.innerHTML=`
      <span class="param__name">${d.label}</span>
      <span class="param__range">${Le(at(d.min,d.step,{scale:d.valueScale,format:d.displayFormat,significantFigures:d.displaySignificantFigures}),p)} - ${Le(at(d.max,d.step,{scale:d.valueScale,format:d.displayFormat,significantFigures:d.displaySignificantFigures}),p)}</span>
    `;const f=document.createElement("div");f.className="param__readout";const h=document.createElement("div");h.className="param__controls";const y=document.createElement("input");y.className="param__slider",y.type="range",y.min=String(d.min),y.max=String(d.max),y.step=String(d.step),y.value=String(r[d.id]??d.fallbackValue),y.setAttribute("aria-label",d.label);function k(S){r[d.id]=S,y.value=String(S),y.style.setProperty("--fill",`${Wn(S,d.min,d.max)}%`),f.textContent=Le(at(S,d.step,{scale:d.valueScale,format:d.displayFormat,significantFigures:d.displaySignificantFigures}),p),l()}if(y.addEventListener("input",()=>{k(parseFloat(y.value))}),y.style.setProperty("--fill",`${Wn(r[d.id]??d.fallbackValue,d.min,d.max)}%`),f.textContent=Le(at(r[d.id]??d.fallbackValue,d.step,{scale:d.valueScale,format:d.displayFormat,significantFigures:d.displaySignificantFigures}),p),m.appendChild(b),m.appendChild(f),d.description){b.classList.add("param__name--has-info"),b.setAttribute("title",d.description);const S=document.createElement("div");S.className="param__popover",S.textContent=d.description,u.appendChild(S),b.addEventListener("click",()=>{u.classList.toggle("param--info-open")}),document.addEventListener("click",w=>{u.contains(w.target)||u.classList.remove("param--info-open")})}return h.appendChild(y),u.appendChild(m),u.appendChild(h),u}function l(){s({...r})}return o(e,t),{setSimClass(d,u){o(d,u)},setValues(d){o(a,d)},getValues(){return{...r}}}}function ur(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function Wn(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Ds="universe-engine-advanced-settings",dr="RSSSE26UM_Engine";function hn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function Hs(n){const e=localStorage.getItem(Ds);if(!e)return hn();try{const t=JSON.parse(e);return js(t,n)}catch{return hn()}}function fr(n,e){const t=js(n,e);return localStorage.setItem(Ds,JSON.stringify({lockedScaleId:t.lockedScaleId,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function js(n,e){const t=hn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function hr(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function mr(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media";const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow">Celestial observer</p>
    <h2 class="config-overlay__title">Simulation matrix</h2>
  `;const d=document.createElement("button");d.className="config-overlay__close",d.type="button",d.setAttribute("aria-label","Close overlay"),d.textContent="×";const u=document.createElement("div");u.className="config-overlay__section-indicator",u.textContent="Parameters",c.appendChild(u),c.appendChild(l),c.appendChild(d);const m=document.createElement("section");m.className="config-overlay__section config-overlay__section--grow",m.dataset.section="parameters";const p=document.createElement("div");m.appendChild(p);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="settings",b.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const f=document.createElement("div");b.appendChild(f);const h=document.createElement("section");h.className="advanced-settings",h.dataset.state="closed",h.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const y=document.createElement("button");y.className="advanced-settings__access",y.type="button",y.textContent="Advanced Settings",h.appendChild(y);const k=document.createElement("div");k.className="advanced-settings__auth";const S=document.createElement("input");S.className="advanced-settings__password",S.type="password",S.placeholder="Enter password",S.autocomplete="off";const w=document.createElement("button");w.className="advanced-settings__unlock",w.type="button",w.textContent="Unlock";const _=document.createElement("p");_.className="advanced-settings__message",k.appendChild(S),k.appendChild(w),k.appendChild(_),h.appendChild(k);const L=document.createElement("div");L.className="advanced-settings__form";const N=document.createElement("label");N.className="advanced-settings__field",N.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const E=document.createElement("select");E.className="advanced-settings__select",E.appendChild(new Option("None",""));for(const T of e.availableScales)E.appendChild(new Option(T.label,T.id));N.appendChild(E),L.appendChild(N);const A=document.createElement("div");A.className="advanced-settings__field",A.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const x=document.createElement("div");x.className="advanced-settings__options";const R=document.createElement("label"),B=document.createElement("input");R.className="advanced-settings__choice",B.type="radio",B.name="manifest-source",B.value="local",R.appendChild(B),R.append("Local manifest");const U=document.createElement("label"),G=document.createElement("input");U.className="advanced-settings__choice",G.type="radio",G.name="manifest-source",G.value="online",U.appendChild(G),U.append("Online manifest"),x.appendChild(R),x.appendChild(U),A.appendChild(x),L.appendChild(A);const I=document.createElement("label");I.className="advanced-settings__field advanced-settings__field--inline";const C=document.createElement("input"),P=document.createElement("span");C.type="checkbox",C.className="advanced-settings__checkbox",P.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,I.appendChild(C),I.appendChild(P),L.appendChild(I);const V=document.createElement("div");V.className="advanced-settings__field",V.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const F=document.createElement("div");F.className="advanced-settings__options";const D=new Map;for(const T of e.availableScales){const W=document.createElement("label"),ne=document.createElement("input");W.className="advanced-settings__choice",ne.type="checkbox",ne.value=T.id,D.set(T.id,ne),W.appendChild(ne),W.append(`Show ${T.label}`),F.appendChild(W)}V.appendChild(F),L.appendChild(V),h.appendChild(L),b.appendChild(h);const H=document.createElement("section");H.className="config-overlay__section config-overlay__section--grow",H.dataset.section="credits",H.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const j=H.querySelector("[data-credits]"),pe=lr();if(j.innerHTML="",pe.length===0){const T=document.createElement("div");T.className="credits-list__entry",T.textContent="To be credited...",j.appendChild(T)}else for(const T of pe)if(T.header){const W=document.createElement("div");W.className="credits-list__heading",W.textContent=T.text,j.appendChild(W)}else{const W=document.createElement("div");W.className="credits-list__entry";const ne=document.createElement("span");if(ne.className="credits-list__text",T.url){const se=document.createElement("a");se.className="credits-list__link",se.href=T.url,se.target="_blank",se.rel="noopener noreferrer",se.textContent=T.text,ne.appendChild(se)}else ne.textContent=T.text;W.appendChild(ne),j.appendChild(W)}const Z=document.createElement("div");Z.className="config-overlay__footer";const ee=document.createElement("button");ee.className="run-button",ee.type="button",ee.textContent="Run",Z.appendChild(ee),o.appendChild(c),o.appendChild(m),o.appendChild(b),o.appendChild(H),o.appendChild(Z),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let M=nt(e.advancedSettings),ge="closed";const oe=cr(p,e.simClass,e.values,e.onValuesChange),Ee=La(f,e.theme,e.onThemeChange);d.addEventListener("click",e.onClose),y.addEventListener("click",()=>{if(ge==="open"){ye("closed");return}ye("auth"),S.focus()}),w.addEventListener("click",de),S.addEventListener("keydown",T=>{T.key==="Enter"&&de()}),E.addEventListener("change",()=>{M.lockedScaleId=E.value||null,te()}),B.addEventListener("change",()=>{B.checked&&(M.manifestSource="local")}),G.addEventListener("change",()=>{G.checked&&(M.manifestSource="online")}),C.addEventListener("change",()=>{M.verboseLogging=C.checked});for(const[T,W]of D.entries())W.addEventListener("change",()=>{if(Array.from(D.entries()).filter(([,se])=>se.checked).map(([se])=>se).length===0&&!M.lockedScaleId){W.checked=!0;return}M.hiddenScaleIds=Array.from(D.keys()).filter(se=>{var gt;return!((gt=D.get(se))!=null&&gt.checked)&&se!==M.lockedScaleId}),te()}),T===M.lockedScaleId&&(W.disabled=!0);Te(e.initialView??"parameters"),te();function Te(T){o.dataset.view=T,u.textContent=T==="parameters"?"Parameters":T==="settings"?"Settings":"Credits",T==="settings"?ee.textContent="Apply":T==="credits"?ee.textContent="Close":ee.textContent="Run"}function te(){E.value=M.lockedScaleId??"",B.checked=M.manifestSource==="local",G.checked=M.manifestSource==="online",C.checked=M.verboseLogging;for(const[T,W]of D.entries()){const ne=M.lockedScaleId===T;W.checked=ne||!M.hiddenScaleIds.includes(T),W.disabled=ne}}function de(){if(S.value!==dr){_.textContent="Incorrect password";return}S.value="",_.textContent="",ye("open")}function ye(T){ge=T,h.dataset.state=T,y.textContent=T==="open"?"Hide Advanced Settings":"Advanced Settings",T!=="auth"&&(_.textContent="")}function Ae(){S.value="",_.textContent="",ye("closed")}function pt(){M=nt(e.advancedSettings),te()}return ee.addEventListener("click",()=>{const T=o.dataset.view;if(T==="settings"){e.onApplySettings(nt(M));return}if(T==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),pt(),Ae()},setSimulation(T,W){oe.setSimClass(T,W),r.src=T.placeholderImage,r.alt=`${T.label} preview`},setTheme(T){Ee.setActive(T)},setView(T){Te(T),T!=="settings"&&Ae()},setAdvancedSettings(T){e.advancedSettings=nt(T),M=nt(T),te(),Ae()}}}function nt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function pr(n){const{TYPING_MS_PER_CHAR:e,FINAL_PAUSE_MS:t}=Ha,s=document.createElement("section");s.className="overlay overlay--initializing",s.hidden=!0,s.classList.add("is-hidden");const i=document.createElement("div");i.className="terminal";const a=document.createElement("div");a.className="terminal__header",a.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const r=document.createElement("div");r.className="terminal__log";const o=document.createElement("button");o.className="terminal__fast-forward",o.type="button",o.textContent=">>",o.setAttribute("aria-label","Fast forward terminal output"),o.setAttribute("aria-pressed","false"),i.appendChild(a),i.appendChild(r),i.appendChild(o),s.appendChild(i),n.appendChild(s);let c=[],l=0,d=!1;function u(h){d=h,o.classList.toggle("is-active",d),o.setAttribute("aria-pressed",String(d))}o.addEventListener("pointerdown",()=>{u(!0)}),o.addEventListener("pointerup",()=>{u(!1)}),o.addEventListener("pointerleave",()=>{u(!1)}),o.addEventListener("pointercancel",()=>{u(!1)}),o.addEventListener("blur",()=>{u(!1)}),o.addEventListener("keydown",h=>{(h.key===" "||h.key==="Enter")&&u(!0)}),o.addEventListener("keyup",h=>{(h.key===" "||h.key==="Enter")&&u(!1)});function m(){for(const h of c)window.clearTimeout(h);c=[]}function p(h,y){return new Promise(k=>{const S=window.setTimeout(()=>{y===l&&k()},d?0:Math.max(0,h));c.push(S)})}async function b(h,y){const k=document.createElement("div");k.className="terminal__line";const S=f();k.appendChild(S),r.appendChild(k);const w=d?2:1;for(let _=0;_<h.length;_+=w){if(y!==l)return;const L=h.slice(_,_+w);k.insertBefore(document.createTextNode(L),S),r.scrollTop=r.scrollHeight,await p(e,y)}S.remove()}function f(){const h=document.createElement("span");return h.className="terminal__cursor",h.textContent="█",h}return{async show(h,y,k){m(),l+=1;const S=l;u(!1),r.innerHTML="",s.hidden=!1,s.classList.remove("is-hidden");for(const[w,_]of h.entries()){if(S!==l)return;const L=`${kt(w)} ${_.text}`;await b(L,S)}if(k){const w=document.createElement("div");w.className="terminal__line terminal__line--syncing",w.textContent=`${kt(h.length)} STARTING SIMULATION`,r.appendChild(w);let _=0;const L=window.setInterval(()=>{_=(_+1)%4;const N=".".repeat(_);w.textContent=`${kt(h.length)} STARTING SIMULATION${N}`,r.scrollTop=r.scrollHeight},400);c.push(L);try{await k}catch{}window.clearInterval(L),w.textContent=`${kt(h.length)} STARTING SIMULATION...`,r.scrollTop=r.scrollHeight}S===l&&(await p(t,S),y())},hide(){m(),l+=1,u(!1),s.hidden=!0,s.classList.add("is-hidden"),r.innerHTML=""}}}function kt(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${tn(t)}:${tn(s)}:${tn(i)}]`}function tn(n){return String(n).padStart(2,"0")}function gr(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var u;l(),document.fullscreenElement?document.exitFullscreen():(u=document.getElementById("app"))==null||u.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const u=r.querySelector(".display-menu__item-label");u&&(u.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",u=>{n.contains(u.target)||l()}),d(e.showHome??!0),{close:l,setHomeVisible:d};function c(u,m){const p=document.createElement("button");return p.className="display-menu__item",p.type="button",p.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${u}</span>
    `,p.addEventListener("click",m),p}function l(){n.classList.remove("open")}function d(u){a.hidden=!u,a.classList.toggle("is-hidden",!u)}}const yr=`# Initialization terminal script for the Planetary simulation family.
#
# Schema:
# - each list item is one "entry" shown in order
# - each entry has an \`options\` list
# - one option is chosen randomly at runtime
# - each option supports:
#     - \`text\` (required): terminal line text

- options:
    - text: 'INIT_EARTH :: loading continental crusts with maximal volcanic activity'
    - text: 'INIT_EARTH :: breaking up Pangea, just to be annoying for future intercontinental travel'
    - text: 'INIT_EARTH :: giving Earth oceans, tectonics, and just enough existential risk'
    - text: 'INIT_EARTH :: assembling a respectable planet to immediately hit with something'
    - text: 'INIT_EARTH :: checking that the mantle is molten enough to be dramatic'
- options:
    - text: 'INIT_IMPACTOR :: selecting one large rock with terrible intentions'
    - text: 'INIT_IMPACTOR :: solving for a collision nobody involved will enjoy'
    - text: 'INIT_IMPACTOR :: setting up proto-planet pinball'
    - text: 'INIT_IMPACTOR :: checking if catastrophic failure counts as satellite formation'
- options:
    - text: 'INIT_MATERIAL :: solving problems in multi-material simulations just to slam things together'
    - text: 'INIT_MATERIAL :: does it matter what its made of if it’s about to be a molten mess?'
    - text: 'INIT_MATERIAL :: training equations of state to survive a bad day'
- options:
    - text: 'INIT_ORBIT :: aligning the crosshairs with Earth'
    - text: "INIT_ORBIT :: emulating Moonfall, Hollywood's finest achievement"
    - text: 'INIT_ORBIT :: turning orbital mechanics into a countdown to regret'
    - text: 'INIT_ORBIT :: fine-tuning impact angle for maximum moon-making potential'
    - text: 'INIT_ORBIT :: checking that all trajectories intersect in the least peaceful way possible'
- options:
    - text: 'PREPARE_COMP :: filling RAM to the brim'
    - text: 'PREPARE_COMP :: funding a bigger supercomputer'
    - text: 'PREPARE_COMP :: making computer go brrr'
    - text: 'PREPARE_COMP :: solving the three-body problem (ish)'
    - text: 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
    - text: 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
    - text: 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- options:
    - text: "VISUAL_PIPELINE :: taking artistic license with Earth's surface"
    - text: 'VISUAL_PIPELINE :: making sure the impact looks suitably apocalyptic'
    - text: 'VISUAL_PIPELINE :: colour-grading the magma to something tastefully catastrophic'
    - text: 'VISUAL_PIPELINE :: rendering one heroic plume of molten bad decisions'
    - text: 'VISUAL_PIPELINE :: making planetary destruction look oddly publication-ready'
`,br=`# Initialization terminal script for the Galaxy simulation family.
#
# Schema:
# - each list item is one "entry" shown in order
# - each entry has an \`options\` list
# - one option is chosen randomly at runtime
# - each option supports:
#     - \`text\` (required): terminal line text

- options:
    - text: 'INIT_STELLAR_POP :: spiralling arms into existence'
    - text: 'INIT_STELLAR_POP :: merging via hierarchical assembly'
    - text: 'INIT_STELLAR_POP :: assembling a galaxy one mildly unstable stellar population at a time'
    - text: 'INIT_STELLAR_POP :: ending runaway star formation for good with supernovae'
    - text: 'INIT_STELLAR_POP :: blowing gas back out before the stars get any ideas'
    - text: 'INIT_STELLAR_POP :: weaponising stellar evolution against future stellar evolution'
- options:
    - text: 'INIT_BLACK_HOLE :: regulating self-regulation mechanisms'
    - text: 'INIT_BLACK_HOLE :: placing one supermassive liability at the galactic center'
    - text: 'INIT_BLACK_HOLE :: ramping up x-rays from the accretion disk'
    - text: 'INIT_BLACK_HOLE :: allowing the core to consume matter with professional focus'
    - text: 'INIT_BLACK_HOLE :: giving supermassive black holes galaxy killing powers'
- options:
    - text: 'INIT_GAS :: threading cold flows through a halo with dubious boundaries'
    - text: 'INIT_GAS :: reminding baryons they are not actually collisionless'
    - text: "INIT_GAS :: letting the interstellar medium become everybody's problem"
- options:
    - text: 'INIT_HALO :: wrapping the visible galaxy in a dark matter support group'
    - text: 'INIT_HALO :: shaping the invisible mass budget into something rotationally persuasive'
    - text: 'INIT_HALO :: hiding most of the mass where telescopes will complain about it'
- options:
    - text: 'PREPARE_COMP :: filling RAM to the brim'
    - text: 'PREPARE_COMP :: funding a bigger supercomputer'
    - text: 'PREPARE_COMP :: making computer go brrr'
    - text: 'PREPARE_COMP :: solving the three-body problem (ish)'
    - text: 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
    - text: 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
    - text: 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
    - text: 'PREPARE_COMP :: making time run 10 quadrillion times faster'
- options:
    - text: 'VISUAL_PIPELINE :: rendering dust lanes to look like Andromeda'
    - text: 'VISUAL_PIPELINE :: asking Micheal Bay for advice on rendering explosions'
    - text: 'VISUAL_PIPELINE :: making the spiral arms look just unstable enough to be believable'
    - text: 'VISUAL_PIPELINE :: painting nebulae with suspiciously cinematic restraint'
    - text: 'VISUAL_PIPELINE :: counting photons until the galaxy agrees to be beautiful'
`,wr=`# Initialization terminal script for the Cosmos simulation family.
#
# Schema:
# - each list item is one "entry" shown in order
# - each entry has an \`options\` list
# - one option is chosen randomly at runtime
# - each option supports:
#     - \`text\` (required): terminal line text

- options:
    - text: 'INIT_PHYSICAL_LAWS :: fixing the speed of light'
    - text: 'INIT_PHYSICAL_LAWS :: finding the planck scale and trying not to look directly at it'
    - text: 'INIT_PHYSICAL_LAWS :: removing sanity from quantum mechanics'
    - text: 'INIT_PHYSICAL_LAWS :: bending spacetime to eventually drop apples'
    - text: 'INIT_PHYSICAL_LAWS :: making the cosmological constant small but nonzero, just to mess with everyone'
    - text: 'INIT_PHYSICAL_LAWS :: making time run 10 quadrillion times faster'
- options:
    - text: 'INIT_COSMOS :: finding the edge of the observable universe, give or take a few billion light-years'
    - text: "INIT_COSMOS :: hiding dark matter's origin"
    - text: 'INIT_COSMOS :: leaving inflation as an exercise for the reader'
- options:
    - text: 'INIT_MATTER :: taking away photon masses'
    - text: 'INIT_MATTER :: charging protons to their full potential'
    - text: 'INIT_MATTER :: holding nuclei together with neutrons and a prayer (i.e. the strong force)'
    - text: 'INIT_MATTER :: making neutrino masses confusing'
    - text: 'INIT_MATTER :: coupling to the Higgs field to fund the LHC'
- options:
    - text: 'INIT_DENSITY_FIELD :: ironing out spacetime variations'
    - text: 'INIT_DENSITY_FIELD :: forming primordial black holes (or are we?)'
    - text: 'INIT_DENSITY_FIELD :: generalising most elements as metals'
    - text: 'INIT_DENSITY_FIELD :: adding astrophysicists with a few good questions about inflation'
- options:
    - text: 'PREPARE_COMP :: filling RAM to the brim'
    - text: 'PREPARE_COMP :: funding a bigger supercomputer'
    - text: 'PREPARE_COMP :: making computer go brrr'
    - text: 'PREPARE_COMP :: solving the three-body problem (ish)'
    - text: 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
    - text: 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
    - text: 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- options:
    - text: 'VISUAL_PIPELINE :: colouring dark matter purple'
    - text: 'VISUAL_PIPELINE :: counting pixels one-by-one'
    - text: 'VISUAL_PIPELINE :: making sure the universe looks like a screensaver from 2002'
    - text: 'VISUAL_PIPELINE :: tracing rays from the big bang to your screen'
`,vr={planetary:yr,galaxy:br,cosmos:wr};function Sr(n){return ke(vr[n.id]).flatMap((t,s)=>{var a;if(!((a=t.options)!=null&&a.length))throw new Error(`Initialization YAML entry ${s} for ${n.id} has no options.`);const i=_r(2,Math.min(4,t.options.length));return kr(t.options,i).map(r=>({text:r.text}))})}function _r(n,e){return Math.floor(Math.random()*(e-n+1))+n}function kr(n,e){const t=[...n];for(let s=t.length-1;s>0;s-=1){const i=Math.floor(Math.random()*(s+1));[t[s],t[i]]=[t[i],t[s]]}return t.slice(0,e)}function Er(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function Nr(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=ke(t),i=De(s.wallclockSeconds),a=De(s.computeUsed),r=De(s.memoryUsed),o=De(s.carbonBurnt),c=De(s.particlesUpdated),l=await Lr(n),d=Tr(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:d}}catch{return null}}async function Lr(n){try{const e=await fetch(Ir(n));if(!e.ok)return{};const t=await e.text(),s=ke(t);return Ar(s)}catch{return{}}}function Ir(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function De(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function Tr(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function Ar(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=De(s);i!==null&&(e[t]=i)}return e}const Ks="[UniverseEngine]",Cr=["planetary","galaxy","cosmos"];function qs(){return Hs(Cr).verboseLogging}function X(n,e){qs()&&console.info(Ks,n,e??"")}function Se(n,e){qs()&&console.warn(Ks,n,e??"")}const Or={local:"assets/local-manifest.json",online:Ka};function Mr(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,X("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await Gs(e,t)},async findNearestVideo(s,i,a){const r=await xr(e,t,s,i,a);if(r)return r;const o=Ws(s);return Se("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:Pr(s),summaryUrl:Er(o)}}}}function Ws(n){switch(n){case"planetary":return Q("assets/planet_test.mp4");case"galaxy":return Q("assets/galaxy_test.mp4");case"cosmos":return Q("assets/cosmo_test.mp4");default:return Q("assets/galaxy_test.mp4")}}function Pr(n){switch(n){case"planetary":return Q("assets/planet_test_planetary_stats.csv");case"galaxy":return Q("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return Q("assets/cosmo_test_cosmos_stats.csv");default:return Q("assets/galaxy_test_galaxy_stats.csv")}}async function Gs(n,e){const t=e.get(n);if(t)return t;const s=Or[n],i=fetch(Q(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return X("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(Se("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function xr(n,e,t,s,i){const r=(await Gs(n,e)).runs.filter(u=>u.simulationId===t);if(r.length===0)return Se("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=Gn(o,s,i);for(const u of r.slice(1)){const m=Gn(u,s,i);m<c&&(o=u,c=m)}const l=o.defaultView??Object.keys(o.views)[0],d=o.views[l];return d?(X("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:Q(d),liveDataUrl:Q(o.liveDataPath),summaryUrl:Q(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([u,m])=>[u,Q(m)]))}):null}function Gn(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const It={mode:"time",frames:[]};async function $r(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Fr(t)}function Rr(n,e,t=0){if(n.mode==="row")return Br(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};for(let a=0;a<s.length-1;a+=1){const r=s[a],o=s[a+1];if(e<r.t||e>o.t)continue;const c=(e-r.t)/Math.max(o.t-r.t,1e-9);return Vr(r.values,o.values,c)}return{...i.values}}function Fr(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return It;const t=nn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=nn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=nn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function Br(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function nn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function Vr(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const d=c+(l-c)*t;i[a]=Ur(d);continue}i[a]=t<.5?r:o}return i}function Ur(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Dr(n){Hr(qa,n)}function Hr(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){X("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?X("Run selection tracked",{simulationId:e.simulationId}):Se("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Se("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const Yn=50*1024*1024,jr=8,Kr=6e3,qr=8e3,sn={galaxy:"tron",planetary:"matrix",cosmos:"nostromo"};function Wr(n){const e=Ve.map(g=>g.id);let t=Hs(e),s=An(t);const i=Mr(t.manifestSource);t.manifestSource==="online"&&i.preloadActiveManifest();let a=Cn(t.lockedScaleId)??s[0]??Ve[0],r=t.lockedScaleId?sn[a.id]:Na(),o=!1,c=null,l=null,d=0,u=It,m=!1;const p=Object.fromEntries(Ve.map(g=>[g.id,Xs(g)]));Xt(r);const b=Ws(a.id),f=Ta(n,b),h=document.createElement("div");h.className="display-chrome",h.classList.add("is-hidden"),n.appendChild(h);const y=document.createElement("div");y.className="orientation-overlay",y.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(y);const k=document.createElement("div");k.className="swift-logo",k.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Q("assets/credits/swift-logo.png")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(k);const S=document.createElement("div");S.className="display-chrome__top-left is-hidden",n.appendChild(S);const w=gr(S,{onHome(){pt()},onViewSelected(g){if(g==="credits"){de("credits");return}de(g)},showHome:!t.lockedScaleId}),_=document.createElement("div");_.className="display-chrome__left-center",h.appendChild(_);const L=ar(_,{onSelect(g){Qs(g)}}),N=document.createElement("div");N.className="display-chrome__top-right",h.appendChild(N);const E=Pa(N),A=document.createElement("div");A.className="display-chrome__center-status",A.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,h.appendChild(A);const x="universe-engine-playback-speed",R=()=>{const g=localStorage.getItem(x),v=g?Number(g):NaN;return[.25,.5,1].includes(v)?v:1},B=g=>{localStorage.setItem(x,String(g))},U=R();f.setPlaybackRate(U);const G=document.createElement("div");G.className="display-chrome__bottom",h.appendChild(G);const I=Ca(G,{onChange(g){f.seekToFraction(g)},onTogglePlay:W,onSpeedChange:ne,onScrubStart(){V()},onScrubEnd(){f.isPaused()||P()},initialSpeed:U});I.setPlaying(!f.isPaused());let C=null;function P(){if(C!==null)return;function g(){const v=f.getPlaybackFraction();I.setPosition(v),f.isPaused()?C=null:C=requestAnimationFrame(g)}C=requestAnimationFrame(g)}function V(){C!==null&&(cancelAnimationFrame(C),C=null)}f.onPlayStateChange(g=>{I.setPlaying(!g),g?V():P()}),f.onTimeUpdate(g=>{d=g*f.getDurationSeconds(),Re(d)});const F=document.createElement("div");F.className="overlay-layer",n.appendChild(F);const D=nr(F,{onReplay:T,onParameters:()=>de("parameters"),onHome:pt,showHome:!t.lockedScaleId});f.onEnded(()=>{o=!0;const g=f.captureFrame();D.update(a,fe(),f.getDurationSeconds(),c,g),D.show()});const H=Ba(F,s,g=>{Ee(g),de("parameters")}),j=mr(F,{simClass:a,values:fe(),theme:r,advancedSettings:t,availableScales:Ve,onValuesChange:Te,onThemeChange:te,onRun:()=>{X("Parameters submitted — starting run",{simClassId:a.id}),se().catch(g=>{Se("Run failed to start",{simClassId:a.id,error:g instanceof Error?g.message:String(g)})})},onApplySettings:ye,onClose:Ae,initialView:"parameters"}),pe=pr(F);I.setPosition(0),Re(),D.hide();const Z=new WeakMap,ee=g=>{const v=Z.get(g);v&&(clearTimeout(v),Z.delete(g)),g.classList.remove("side-collapsed")},M=g=>{const v=Z.get(g);v&&clearTimeout(v),Z.set(g,setTimeout(()=>{g.classList.add("side-collapsed"),Z.delete(g)},2500))},ge=g=>{const v=Z.get(g);v&&(clearTimeout(v),Z.delete(g)),g.classList.add("side-collapsed")},oe=(g,v)=>{g.addEventListener("mouseenter",()=>ee(g)),g.addEventListener("mouseleave",()=>M(g)),g.addEventListener("focusin",()=>ee(g)),g.addEventListener("focusout",$=>{g.contains($.relatedTarget)||M(g)}),g.addEventListener("click",()=>{if(g.classList.contains("side-collapsed")){ee(g),M(g);return}v.toggleOnClick?ge(g):M(g)}),ge(g)};oe(S,{toggleOnClick:!0}),oe(_,{toggleOnClick:!0}),oe(G,{toggleOnClick:!1}),f.hideMedia(),f.pause(),Ce(t.lockedScaleId?"config":"entry");function Ee(g){g.id===a.id&&m||(a=g,jt(),te(sn[g.id]),j.setSimulation(a,fe()),I.setPosition(0),Re(),Ht())}function Te(g){p[a.id]={...g},X("Parameter values updated",{simClassId:a.id,values:p[a.id]}),Re()}function te(g){r=g,Xt(g),j.setTheme(g)}function de(g){g==="parameters"&&j.setSimulation(a,fe()),j.setView(g),Ce("config")}function ye(g){if(ii(g),m){D.hide(),Ce("display");return}j.setSimulation(a,fe()),j.setView("parameters")}function Ae(){if(D.hide(),!m&&t.lockedScaleId){j.setSimulation(a,fe()),j.setView("parameters");return}Ce(m?"display":"entry")}function pt(){t.lockedScaleId||(X("Returning to home screen",{simClassId:a.id}),jt(),m=!1,f.hideMedia(),Ce("entry"))}function T(){o=!1,D.hide(),f.resetPlayback(),f.play().catch(()=>{f.setMuted(!0),f.play()})}function W(){f.isPaused()?f.play().catch(()=>{f.setMuted(!0),f.play()}):f.pause()}function ne(g){f.setPlaybackRate(g),B(g),I.setSpeed(g)}async function se(){const g=fe();X("Run requested",{simClassId:a.id,values:g,manifestSource:i.getSource()});const v=await i.findNearestVideo(a.id,a.parameters,g);jt(),l=v;const $=qt(a,v);Dr({simulationId:a.id,parameters:g,manifestSource:i.getSource(),matchedRunId:v.runId});const q=si(v,$)??v.url,Ze=Object.entries(v.views??{}).filter(([ie])=>ie!==$).map(([,ie])=>ie);ei(v.liveDataUrl),ti(v.summaryUrl),f.setMuted(!1),Ht($),Ce("initializing");const yt=gt(q);f.prewarmSources(Ze);const we=(async()=>{const ie=await yt;X(`Prepared active video source: ${ie.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:q,waitsForBuffer:ie.shouldWaitForBuffer}),f.setSource(ie.src,{ownedObjectUrl:ie.ownedObjectUrl}),f.pause(),await f.waitForLoadedData(qr),ie.shouldWaitForBuffer&&await f.waitForBufferedAhead(jr,Kr)})();await new Promise(ie=>{pe.show(Sr(a),ie,we)}),m=!0,f.showMedia(),f.play().catch(()=>{f.setMuted(!0),f.play().catch(()=>{})}),Ce("display")}async function gt(g){const v=await Ys(g);if(v!==null&&v>0&&v<=Yn){X("Downloading active video behind loading overlay",{videoUrl:g,contentLength:v});try{const $=await fetch(g);if(!$.ok)throw new Error(`Failed to download active video: ${g}`);const q=await $.blob();return X(`Active video full fetch complete: ${q.size} bytes`,{videoUrl:g,blobType:q.type}),{src:URL.createObjectURL(q),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch($){Se(`Full-fetch FAILED; falling back to progressive: ${$ instanceof Error?$.message:String($)}`,{videoUrl:g})}}return v!==null?X("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:g,contentLength:v,fullFetchMaxBytes:Yn}):X("Could not determine active video size; using progressive load",{videoUrl:g}),X("Using progressive active video load",{videoUrl:g}),{src:g,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function Ys(g){try{const v=await fetch(g,{headers:{Range:"bytes=0-0"}});X("Probed active video size with range request",{videoUrl:g,ok:v.ok,status:v.status,contentLength:v.headers.get("Content-Length"),contentRange:v.headers.get("Content-Range")});const $=zs(v.headers.get("Content-Length"));if($!==null)return $;const q=Js(v.headers.get("Content-Range"));return q!==null?q:null}catch(v){return Se("Could not probe active video size",{videoUrl:g,error:v instanceof Error?v.message:String(v)}),null}}function Js(g){if(!g)return null;const v=g.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!v)return null;const $=Number(v[1]);return Number.isFinite($)&&$>0?$:null}function zs(g){if(!g)return null;const v=Number(g);return Number.isFinite(v)?v:null}function Ce(g){if(n.dataset.mode=g,g==="entry"?document.documentElement.setAttribute("data-theme","glass"):g==="display"&&Xt(r),Kt(h,g==="display"||g==="config"),Kt(k,g==="display"),Kt(S,!t.lockedScaleId&&(g==="entry"||g==="config"||g==="display")),g==="entry"&&!t.lockedScaleId?H.show():H.hide(),g==="config"?(pe.hide(),j.setSimulation(a,fe()),j.show()):j.hide(),g!=="display")D.hide();else if(o){const $=f.captureFrame();D.update(a,fe(),f.getDurationSeconds(),c,$),D.show()}!m||g==="initializing"?(f.hideMedia(),g==="initializing"&&f.pause()):f.showMedia(),g!=="initializing"&&pe.hide()}function Re(g=0){const v=Rr(u,g,f.getDurationSeconds()),$=ni(a,c,g,f.getDurationSeconds());E.update(a,fe(),{...v,...$})}function Ht(g){const v=a.views.filter($=>{var q;return((q=l==null?void 0:l.views)==null?void 0:q[$.id])!==void 0});if(v.length<=1){L.hide();return}L.update(v,g??qt(a,l))}function jt(){u=It,o=!1,c=null,l=null,d=0,D.hide(),L.hide(),f.pause(),f.clearPrewarmedSources(),f.resetPlayback(),I.setPosition(0)}function Qs(g){if(!(l!=null&&l.views)||g===qt(a,l))return;const v=l.views[g];if(!v)return;l.viewId=g;const $=!f.isPaused()&&!o,q=o?0:f.getPlaybackFraction();o=!1,D.hide(),f.setSource(v,{seekFraction:q,autoplay:$}),Ht(g)}function fe(){return{...p[a.id]}}function Xs(g){return Object.fromEntries(g.parameters.map(v=>[v.id,Zs(v)]))}function Zs(g){const v=Math.max(0,Math.round((g.max-g.min)/g.step)),$=Math.floor(Math.random()*(v+1)),q=g.min+$*g.step,Ze=$s(g.step);return Number(q.toFixed(Ze))}async function ei(g){try{u=await $r(g)}catch(v){u=It,Se("Failed to load live stats",{url:g,error:v instanceof Error?v.message:String(v)})}Re()}async function ti(g){c=await Nr(g),Re(d)}function ni(g,v,$,q){if(!v||!Number.isFinite(q)||q<=0)return{};const Ze=Math.max(0,Math.min(1,$/q)),yt={};for(const we of g.metadata.liveStats){if(!we.live||!we.fromVideo||!we.scaleWithTime)continue;const On=we.videoKey??we.id,ie=v[On];if(typeof ie!="number"||!Number.isFinite(ie))continue;const Mn=ie*Ze;yt[we.id]=we.integer?String(Math.floor(Mn)):String(Mn)}return yt}function Kt(g,v){g.hidden=!v,g.classList.toggle("is-hidden",!v)}function qt(g,v){return v!=null&&v.views?v.viewId??Object.keys(v.views)[0]:v==null?void 0:v.viewId}function si(g,v){return!v||!g.views?null:g.views[v]??null}function An(g){const v=new Set(hr(g,e));return Ve.filter($=>v.has($.id))}function Cn(g){return g?Ve.find(v=>v.id===g)??null:null}function ii(g){const v=a.id,$=t.manifestSource;t=fr(g,e),s=An(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),w.setHomeVisible(!t.lockedScaleId),D.setHomeVisible(!t.lockedScaleId),H.setSimulationClasses(s),j.setAdvancedSettings(t),X("Advanced settings updated",t),$!==t.manifestSource&&(l=null);const q=Cn(t.lockedScaleId);q&&(Ee(q),q.id!==v&&(m=!1,f.hideMedia(),j.setView("parameters")),m||(te(sn[q.id]),j.setSimulation(a,fe())))}}function Gr(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Wr(n)}Gr();
//# sourceMappingURL=index-DDX2bMYt.js.map
