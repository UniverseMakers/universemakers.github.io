(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Mn=Symbol.for("yaml.alias"),_n=Symbol.for("yaml.document"),$e=Symbol.for("yaml.map"),_s=Symbol.for("yaml.pair"),Ae=Symbol.for("yaml.scalar"),ot=Symbol.for("yaml.seq"),we=Symbol.for("yaml.node.type"),We=n=>!!n&&typeof n=="object"&&n[we]===Mn,Dt=n=>!!n&&typeof n=="object"&&n[we]===_n,kt=n=>!!n&&typeof n=="object"&&n[we]===$e,z=n=>!!n&&typeof n=="object"&&n[we]===_s,K=n=>!!n&&typeof n=="object"&&n[we]===Ae,Et=n=>!!n&&typeof n=="object"&&n[we]===ot;function Y(n){if(n&&typeof n=="object")switch(n[we]){case $e:case ot:return!0}return!1}function J(n){if(n&&typeof n=="object")switch(n[we]){case Mn:case $e:case Ae:case ot:return!0}return!1}const Ss=n=>(K(n)||Y(n))&&!!n.anchor,Ue=Symbol("break visit"),Bi=Symbol("skip children"),bt=Symbol("remove node");function lt(n,e){const t=Vi(e);Dt(n)?Ze(null,n.contents,t,Object.freeze([n]))===bt&&(n.contents=null):Ze(null,n,t,Object.freeze([]))}lt.BREAK=Ue;lt.SKIP=Bi;lt.REMOVE=bt;function Ze(n,e,t,s){const i=Hi(n,e,t,s);if(J(i)||z(i))return Ui(n,s,i),Ze(n,i,t,s);if(typeof i!="symbol"){if(Y(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=Ze(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Ue)return Ue;r===bt&&(e.items.splice(a,1),a-=1)}}}else if(z(e)){s=Object.freeze(s.concat(e));const a=Ze("key",e.key,t,s);if(a===Ue)return Ue;a===bt&&(e.key=null);const r=Ze("value",e.value,t,s);if(r===Ue)return Ue;r===bt&&(e.value=null)}}return i}function Vi(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Hi(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(kt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(Et(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(z(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(K(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(We(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function Ui(n,e,t){const s=e[e.length-1];if(Y(s))s.items[n]=t;else if(z(s))n==="key"?s.key=t:s.value=t;else if(Dt(s))s.contents=t;else{const i=We(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Di={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},ji=n=>n.replace(/[!,[\]{}]/g,e=>Di[e]);class fe{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},fe.defaultYaml,e),this.tags=Object.assign({},fe.defaultTags,t)}clone(){const e=new fe(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new fe(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:fe.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},fe.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:fe.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},fe.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+ji(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&J(e.contents)){const a={};lt(e.contents,(r,o)=>{J(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}fe.defaultYaml={explicit:!1,version:"1.2"};fe.defaultTags={"!!":"tag:yaml.org,2002:"};function ks(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Es(n){const e=new Set;return lt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Is(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Ki(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Es(n));const r=Is(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(K(r.node)||Y(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function et(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=et(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=et(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=et(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=et(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function be(n,e,t){if(Array.isArray(n))return n.map((s,i)=>be(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Ss(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class On{constructor(e){Object.defineProperty(this,we,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Dt(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=be(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?et(a,{"":o},"",o):o}}class Pn extends On{constructor(e){super(Mn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],lt(e,{Node:(a,r)=>{(We(r)||Ss(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(be(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=$t(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(ks(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function $t(n,e,t){if(We(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(Y(e)){let s=0;for(const i of e.items){const a=$t(n,i,t);a>s&&(s=a)}return s}else if(z(e)){const s=$t(n,e.key,t),i=$t(n,e.value,t);return Math.max(s,i)}return 1}const Ls=n=>!n||typeof n!="function"&&typeof n!="object";class P extends On{constructor(e){super(Ae),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:be(this.value,e,t)}toString(){return String(this.value)}}P.BLOCK_FOLDED="BLOCK_FOLDED";P.BLOCK_LITERAL="BLOCK_LITERAL";P.PLAIN="PLAIN";P.QUOTE_DOUBLE="QUOTE_DOUBLE";P.QUOTE_SINGLE="QUOTE_SINGLE";const qi="tag:yaml.org,2002:";function Wi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function vt(n,e,t){var f,p,m;if(Dt(n)&&(n=n.contents),J(n))return n;if(z(n)){const b=(p=(f=t.schema[$e]).createNode)==null?void 0:p.call(f,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new Pn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=qi+e.slice(2));let l=Wi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new P(n);return c&&(c.node=b),b}l=n instanceof Map?r[$e]:Symbol.iterator in Object(n)?r[ot]:r[$e]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((m=l==null?void 0:l.nodeClass)==null?void 0:m.from)=="function"?l.nodeClass.from(t.schema,n,t):new P(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function Bt(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return vt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const gt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Ns extends On{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>J(s)||z(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(gt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(Y(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Bt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(Y(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&K(a)?a.value:a:Y(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!z(t))return!1;const s=t.value;return s==null||e&&K(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return Y(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(Y(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Bt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Gi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Te(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const je=(n,e,t)=>n.endsWith(`
`)?Te(t,e):t.includes(`
`)?`
`+Te(t,e):(n.endsWith(" ")?"":" ")+t,As="flow",Sn="block",Rt="quoted";function jt(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):f=i-s);let p,m,b=!1,d=-1,g=-1,y=-1;t===Sn&&(d=es(n,d,e.length),d!==-1&&(f=d+c));for(let I;I=n[d+=1];){if(t===Rt&&I==="\\"){switch(g=d,n[d+1]){case"x":d+=3;break;case"u":d+=5;break;case"U":d+=9;break;default:d+=1}y=d}if(I===`
`)t===Sn&&(d=es(n,d,e.length)),f=d+e.length+c,p=void 0;else{if(I===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const E=n[d+1];E&&E!==" "&&E!==`
`&&E!=="	"&&(p=d)}if(d>=f)if(p)l.push(p),f=p+c,p=void 0;else if(t===Rt){for(;m===" "||m==="	";)m=I,I=n[d+=1],b=!0;const E=d>y+1?d-2:g-1;if(u[E])return n;l.push(E),u[E]=!0,f=E+c,p=void 0}else b=!0}m=I}if(b&&o&&o(),l.length===0)return n;r&&r();let _=n.slice(0,l[0]);for(let I=0;I<l.length;++I){const E=l[I],v=l[I+1]||n.length;E===0?_=`
${e}${n.slice(0,v)}`:(t===Rt&&u[E]&&(_+=`${n[E]}\\`),_+=`
${e}${n.slice(E+1,v)}`)}return _}function es(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const Kt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),qt=n=>/^(%|---|\.\.\.)/m.test(n);function Yi(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function wt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(qt(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:jt(r,a,Rt,Kt(e,!1))}function kn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return wt(n,e);const t=e.indent||(qt(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:jt(s,t,As,Kt(e,!1))}function tt(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=wt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=kn:a&&!i?s=wt:s=t?kn:wt}return s(n,e)}let En;try{En=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{En=/\n+(?!\n|$)/g}function xt({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return tt(t,s);const l=s.indent||(s.forceBlockIndent||qt(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===P.BLOCK_FOLDED?!1:e===P.BLOCK_LITERAL?!0:!Yi(t,c,l.length);if(!t)return u?`|
`:`>
`;let f,p;for(p=t.length;p>0;--p){const v=t[p-1];if(v!==`
`&&v!=="	"&&v!==" ")break}let m=t.substring(p);const b=m.indexOf(`
`);b===-1?f="-":t===m||b!==m.length-1?(f="+",a&&a()):f="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(En,`$&${l}`));let d=!1,g,y=-1;for(g=0;g<t.length;++g){const v=t[g];if(v===" ")d=!0;else if(v===`
`)y=g;else break}let _=t.substring(0,y<g?y+1:g);_&&(t=t.substring(_.length),_=_.replace(/\n+/g,`$&${l}`));let E=(d?l?"2":"1":"")+f;if(n&&(E+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const v=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let k=!1;const L=Kt(s,!0);r!=="folded"&&e!==P.BLOCK_FOLDED&&(L.onOverflow=()=>{k=!0});const S=jt(`${_}${v}${m}`,l,Sn,L);if(!k)return`>${E}
${l}${S}`}return t=t.replace(/\n+/g,`$&${l}`),`|${E}
${l}${_}${t}${m}`}function Ji(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return tt(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?tt(a,e):xt(n,e,t,s);if(!o&&!u&&i!==P.PLAIN&&a.includes(`
`))return xt(n,e,t,s);if(qt(a)){if(c==="")return e.forceBlockIndent=!0,xt(n,e,t,s);if(o&&c===l)return tt(a,e)}const f=a.replace(/\n+/g,`$&
${c}`);if(r){const p=d=>{var g;return d.default&&d.tag!=="tag:yaml.org,2002:str"&&((g=d.test)==null?void 0:g.test(f))},{compat:m,tags:b}=e.doc.schema;if(b.some(p)||m!=null&&m.some(p))return tt(a,e)}return o?f:jt(f,c,As,Kt(e,!1))}function $n(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==P.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=P.QUOTE_DOUBLE);const c=u=>{switch(u){case P.BLOCK_FOLDED:case P.BLOCK_LITERAL:return i||a?tt(r.value,e):xt(r,e,t,s);case P.QUOTE_DOUBLE:return wt(r.value,e);case P.QUOTE_SINGLE:return kn(r.value,e);case P.PLAIN:return Ji(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:f}=e.options,p=i&&u||f;if(l=c(p),l===null)throw new Error(`Unsupported default string type ${p}`)}return l}function Ts(n,e){const t=Object.assign({blockQuote:!0,commentString:Gi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function zi(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(K(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Qi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(K(n)||Y(n))&&n.anchor;a&&ks(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function at(n,e,t,s){var c;if(z(n))return n.toString(e,t,s);if(We(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=J(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=zi(e.doc.schema.tags,a));const r=Qi(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):K(a)?$n(a,e,t,s):a.toString(e,t,s);return r?K(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Xi({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:f}}=t;let p=J(n)&&n.comment||null;if(f){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(Y(n)||!J(n)&&typeof n=="object"){const L="With simple keys, collection cannot be used as a key value";throw new Error(L)}}let m=!f&&(!n||p&&e==null&&!t.inFlow||Y(n)||(K(n)?n.type===P.BLOCK_FOLDED||n.type===P.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(f||!a),indent:o+c});let b=!1,d=!1,g=at(n,t,()=>b=!0,()=>d=!0);if(!m&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!f||e==null&&m)return g=`? ${g}`,p&&!b?g+=je(g,t.indent,l(p)):d&&i&&i(),g;b&&(p=null),m?(p&&(g+=je(g,t.indent,l(p))),g=`? ${g}
${o}:`):(g=`${g}:`,p&&(g+=je(g,t.indent,l(p))));let y,_,I;J(e)?(y=!!e.spaceBefore,_=e.commentBefore,I=e.comment):(y=!1,_=null,I=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&K(e)&&(t.indentAtStart=g.length+1),d=!1,!u&&c.length>=2&&!t.inFlow&&!m&&Et(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let E=!1;const v=at(e,t,()=>E=!0,()=>d=!0);let k=" ";if(p||y||_){if(k=y?`
`:"",_){const L=l(_);k+=`
${Te(L,t.indent)}`}v===""&&!t.inFlow?k===`
`&&I&&(k=`

`):k+=`
${t.indent}`}else if(!m&&Y(e)){const L=v[0],S=v.indexOf(`
`),A=S!==-1,x=t.inFlow??e.flow??e.items.length===0;if(A||!x){let V=!1;if(A&&(L==="&"||L==="!")){let B=v.indexOf(" ");L==="&"&&B!==-1&&B<S&&v[B+1]==="!"&&(B=v.indexOf(" ",B+1)),(B===-1||S<B)&&(V=!0)}V||(k=`
${t.indent}`)}}else(v===""||v[0]===`
`)&&(k="");return g+=k+v,t.inFlow?E&&s&&s():I&&!E?g+=je(g,t.indent,l(I)):d&&i&&i(),g}function Cs(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Tt="<<",Me={identify:n=>n===Tt||typeof n=="symbol"&&n.description===Tt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new P(Symbol(Tt)),{addToJSMap:Ms}),stringify:()=>Tt},Zi=(n,e)=>(Me.identify(e)||K(e)&&(!e.type||e.type===P.PLAIN)&&Me.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Me.tag&&t.default));function Ms(n,e,t){if(t=n&&We(t)?t.resolve(n.doc):t,Et(t))for(const s of t.items)ln(n,e,s);else if(Array.isArray(t))for(const s of t)ln(n,e,s);else ln(n,e,t)}function ln(n,e,t){const s=n&&We(t)?t.resolve(n.doc):t;if(!kt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function Os(n,e,{key:t,value:s}){if(J(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Zi(n,t))Ms(n,e,s);else{const i=be(t,"",n);if(e instanceof Map)e.set(i,be(s,i,n));else if(e instanceof Set)e.add(i);else{const a=ea(t,i,n),r=be(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function ea(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(J(n)&&(t!=null&&t.doc)){const s=Ts(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),Cs(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Rn(n,e,t){const s=vt(n,void 0,t),i=vt(e,void 0,t);return new he(s,i)}class he{constructor(e,t=null){Object.defineProperty(this,we,{value:_s}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return J(t)&&(t=t.clone(e)),J(s)&&(s=s.clone(e)),new he(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return Os(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Xi(this,e,t,s):JSON.stringify(this)}}function Ps(n,e,t){return(e.inFlow??n.flow?na:ta)(n,e,t)}function ta({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const p=[];for(let b=0;b<e.length;++b){const d=e[b];let g=null;if(J(d))!f&&d.spaceBefore&&p.push(""),Vt(t,p,d.commentBefore,f),d.comment&&(g=d.comment);else if(z(d)){const _=J(d.key)?d.key:null;_&&(!f&&_.spaceBefore&&p.push(""),Vt(t,p,_.commentBefore,f))}f=!1;let y=at(d,u,()=>g=null,()=>f=!0);g&&(y+=je(y,a,l(g))),f&&g&&(f=!1),p.push(s+y)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let b=1;b<p.length;++b){const d=p[b];m+=d?`
${c}${d}`:`
`}}return n?(m+=`
`+Te(l(n),c),o&&o()):f&&r&&r(),m}function na({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const f=[];for(let b=0;b<n.length;++b){const d=n[b];let g=null;if(J(d))d.spaceBefore&&f.push(""),Vt(e,f,d.commentBefore,!1),d.comment&&(g=d.comment);else if(z(d)){const _=J(d.key)?d.key:null;_&&(_.spaceBefore&&f.push(""),Vt(e,f,_.commentBefore,!1),_.comment&&(l=!0));const I=J(d.value)?d.value:null;I?(I.comment&&(g=I.comment),I.commentBefore&&(l=!0)):d.value==null&&(_!=null&&_.comment)&&(g=_.comment)}g&&(l=!0);let y=at(d,c,()=>g=null);l||(l=f.length>u||y.includes(`
`)),b<n.length-1?y+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=f.reduce((_,I)=>_+I.length+2,2)+(y.length+2)>e.options.lineWidth)),l&&(y+=",")),g&&(y+=je(y,s,o(g))),f.push(y),u=f.length}const{start:p,end:m}=t;if(f.length===0)return p+m;if(!l){const b=f.reduce((d,g)=>d+g.length+2,2);l=e.options.lineWidth>0&&b>e.options.lineWidth}if(l){let b=p;for(const d of f)b+=d?`
${a}${i}${d}`:`
`;return`${b}
${i}${m}`}else return`${p}${r}${f.join(" ")}${r}${m}`}function Vt({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=Te(e(s),n);t.push(a.trimStart())}}function Ke(n,e){const t=K(e)?e.value:e;for(const s of n)if(z(s)&&(s.key===e||s.key===t||K(s.key)&&s.key.value===t))return s}class ye extends Ns{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super($e,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(Rn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;z(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new he(e,e==null?void 0:e.value):s=new he(e.key,e.value);const i=Ke(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);K(i.value)&&Ls(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=Ke(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=Ke(this.items,e),i=s==null?void 0:s.value;return(!t&&K(i)?i.value:i)??void 0}has(e){return!!Ke(this.items,e)}set(e,t){this.add(new he(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)Os(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!z(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Ps(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const ct={collection:"map",default:!0,nodeClass:ye,tag:"tag:yaml.org,2002:map",resolve(n,e){return kt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>ye.from(n,e,t)};class qe extends Ns{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(ot,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Ct(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Ct(e);if(typeof s!="number")return;const i=this.items[s];return!t&&K(i)?i.value:i}has(e){const t=Ct(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Ct(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];K(i)&&Ls(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(be(a,String(i++),t));return s}toString(e,t,s){return e?Ps(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(vt(o,void 0,s))}}return a}}function Ct(n){let e=K(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ut={collection:"seq",default:!0,nodeClass:qe,tag:"tag:yaml.org,2002:seq",resolve(n,e){return Et(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>qe.from(n,e,t)},Wt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),$n(n,e,t,s)}},Gt={identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new P(null),stringify:({source:n},e)=>typeof n=="string"&&Gt.test.test(n)?n:e.options.nullStr},xn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new P(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&xn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Ne({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const $s={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ne},Rs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ne(n)}},xs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new P(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ne},Yt=n=>typeof n=="bigint"||Number.isInteger(n),Fn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Fs(n,e,t){const{value:s}=n;return Yt(s)&&s>=0?t+s.toString(e):Ne(n)}const Bs={identify:n=>Yt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Fn(n,2,8,t),stringify:n=>Fs(n,8,"0o")},Vs={identify:Yt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Fn(n,0,10,t),stringify:Ne},Hs={identify:n=>Yt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Fn(n,2,16,t),stringify:n=>Fs(n,16,"0x")},sa=[ct,ut,Wt,Gt,xn,Bs,Vs,Hs,$s,Rs,xs];function ts(n){return typeof n=="bigint"||Number.isInteger(n)}const Mt=({value:n})=>JSON.stringify(n),ia=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Mt},{identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Mt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Mt},{identify:ts,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>ts(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Mt}],aa={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},ra=[ct,ut].concat(ia,aa),Bn={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=P.BLOCK_LITERAL),e!==P.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let f=0,p=0;f<l;++f,p+=c)u[f]=o.substr(p,c);o=u.join(e===P.BLOCK_LITERAL?`
`:" ")}return $n({comment:n,type:e,value:o},s,i,a)}};function Us(n,e){if(Et(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!z(s)){if(kt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new he(new P(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=z(s)?s:new he(s)}}else e("Expected a sequence for this tag");return n}function Ds(n,e,t){const{replacer:s}=t,i=new qe(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(Rn(o,c,t))}return i}const Vn={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Us,createNode:Ds};class st extends qe{constructor(){super(),this.add=ye.prototype.add.bind(this),this.delete=ye.prototype.delete.bind(this),this.get=ye.prototype.get.bind(this),this.has=ye.prototype.has.bind(this),this.set=ye.prototype.set.bind(this),this.tag=st.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(z(i)?(a=be(i.key,"",t),r=be(i.value,a,t)):a=be(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=Ds(e,t,s),a=new this;return a.items=i.items,a}}st.tag="tag:yaml.org,2002:omap";const Hn={collection:"seq",identify:n=>n instanceof Map,nodeClass:st,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Us(n,e),s=[];for(const{key:i}of t.items)K(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new st,t)},createNode:(n,e,t)=>st.from(n,e,t)};function js({value:n,source:e},t){return e&&(n?Ks:qs).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const Ks={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new P(!0),stringify:js},qs={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new P(!1),stringify:js},oa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ne},la={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ne(n)}},ca={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new P(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Ne},It=n=>typeof n=="bigint"||Number.isInteger(n);function Jt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function Un(n,e,t){const{value:s}=n;if(It(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Ne(n)}const ua={identify:It,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Jt(n,2,2,t),stringify:n=>Un(n,2,"0b")},da={identify:It,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Jt(n,1,8,t),stringify:n=>Un(n,8,"0")},fa={identify:It,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Jt(n,0,10,t),stringify:Ne},ha={identify:It,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Jt(n,2,16,t),stringify:n=>Un(n,16,"0x")};class it extends ye{constructor(e){super(e),this.tag=it.tag}add(e){let t;z(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new he(e.key,null):t=new he(e,null),Ke(this.items,t.key)||this.items.push(t)}get(e,t){const s=Ke(this.items,e);return!t&&z(s)?K(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=Ke(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new he(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(Rn(r,null,s));return a}}it.tag="tag:yaml.org,2002:set";const Dn={collection:"map",identify:n=>n instanceof Set,nodeClass:it,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>it.from(n,e,t),resolve(n,e){if(kt(n)){if(n.hasAllNullValues(!0))return Object.assign(new it,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function jn(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function Ws(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Ne(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Gs={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>jn(n,t),stringify:Ws},Ys={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>jn(n,!1),stringify:Ws},zt={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(zt.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let f=jn(u,!1);Math.abs(f)<30&&(f*=60),l-=6e4*f}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},ns=[ct,ut,Wt,Gt,Ks,qs,ua,da,fa,ha,oa,la,ca,Bn,Me,Hn,Vn,Dn,Gs,Ys,zt],ss=new Map([["core",sa],["failsafe",[ct,ut,Wt]],["json",ra],["yaml11",ns],["yaml-1.1",ns]]),is={binary:Bn,bool:xn,float:xs,floatExp:Rs,floatNaN:$s,floatTime:Ys,int:Vs,intHex:Hs,intOct:Bs,intTime:Gs,map:ct,merge:Me,null:Gt,omap:Hn,pairs:Vn,seq:ut,set:Dn,timestamp:zt},ma={"tag:yaml.org,2002:binary":Bn,"tag:yaml.org,2002:merge":Me,"tag:yaml.org,2002:omap":Hn,"tag:yaml.org,2002:pairs":Vn,"tag:yaml.org,2002:set":Dn,"tag:yaml.org,2002:timestamp":zt};function cn(n,e,t){const s=ss.get(e);if(s&&!n)return t&&!s.includes(Me)?s.concat(Me):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(ss.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Me)),i.reduce((a,r)=>{const o=typeof r=="string"?is[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(is).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const pa=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class Kn{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?cn(e,"compat"):e?cn(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?ma:{},this.tags=cn(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,$e,{value:ct}),Object.defineProperty(this,Ae,{value:Wt}),Object.defineProperty(this,ot,{value:ut}),this.sortMapEntries=typeof r=="function"?r:r===!0?pa:null}clone(){const e=Object.create(Kn.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function ga(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ts(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(Te(l,""))}let r=!1,o=null;if(n.contents){if(J(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(Te(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=at(n.contents,i,()=>o=null,l);o&&(u+=je(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(at(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(Te(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(Te(a(l),"")))}return t.join(`
`)+`
`}class Qt{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,we,{value:_n});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new fe({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Qt.prototype,{[we]:{value:_n}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=J(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Je(this.contents)&&this.contents.add(e)}addIn(e,t){Je(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Es(this);e.anchor=!t||s.has(t)?Is(t||"a",s):t}return new Pn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=_=>typeof _=="number"||_ instanceof String||_ instanceof Number,y=t.filter(g).map(String);y.length>0&&(t=t.concat(y)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:f,setAnchors:p,sourceObjects:m}=Ki(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:f,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:m},d=vt(e,u,b);return o&&Y(d)&&(d.flow=!0),p(),d}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new he(i,a)}delete(e){return Je(this.contents)?this.contents.delete(e):!1}deleteIn(e){return gt(e)?this.contents==null?!1:(this.contents=null,!0):Je(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return Y(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return gt(e)?!t&&K(this.contents)?this.contents.value:this.contents:Y(this.contents)?this.contents.getIn(e,t):void 0}has(e){return Y(this.contents)?this.contents.has(e):!1}hasIn(e){return gt(e)?this.contents!==void 0:Y(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Bt(this.schema,[e],t):Je(this.contents)&&this.contents.set(e,t)}setIn(e,t){gt(e)?this.contents=t:this.contents==null?this.contents=Bt(this.schema,Array.from(e),t):Je(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new fe({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new fe({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new Kn(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=be(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?et(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return ga(this,e)}}function Je(n){if(Y(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Js extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class yt extends Js{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class ya extends Js{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const as=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function rt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,f="",p="",m=!1,b=!1,d=null,g=null,y=null,_=null,I=null,E=null,v=null;for(const S of n)switch(b&&(S.type!=="space"&&S.type!=="newline"&&S.type!=="comma"&&a(S.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),d&&(l&&S.type!=="comment"&&S.type!=="newline"&&a(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),d=null),S.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&S.source.includes("	")&&(d=S),u=!0;break;case"comment":{u||a(S,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const A=S.source.substring(1)||" ";f?f+=p+A:f=A,p="",l=!1;break}case"newline":l?f?f+=S.source:(!E||t!=="seq-item-ind")&&(c=!0):p+=S.source,l=!0,m=!0,(g||y)&&(_=S),u=!0;break;case"anchor":g&&a(S,"MULTIPLE_ANCHORS","A node can have at most one anchor"),S.source.endsWith(":")&&a(S.offset+S.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=S,v??(v=S.offset),l=!1,u=!1,b=!0;break;case"tag":{y&&a(S,"MULTIPLE_TAGS","A node can have at most one tag"),y=S,v??(v=S.offset),l=!1,u=!1,b=!0;break}case t:(g||y)&&a(S,"BAD_PROP_ORDER",`Anchors and tags must be after the ${S.source} indicator`),E&&a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.source} in ${e??"collection"}`),E=S,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&a(S,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=S,l=!1,u=!1;break}default:a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.type} token`),l=!1,u=!1}const k=n[n.length-1],L=k?k.offset+k.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),d&&(l&&d.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(d,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:E,spaceBefore:c,comment:f,hasNewline:m,anchor:g,tag:y,newlineAfterProp:_,end:L,start:v??L}}function _t(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(_t(e.key)||_t(e.value))return!0}return!1;default:return!0}}function In(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&_t(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function zs(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||K(a)&&K(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const rs="All mapping items must start at the same column";function ba({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??ye,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const f of s.items){const{start:p,key:m,sep:b,value:d}=f,g=rt(p,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),y=!g.found;if(y){if(m&&(m.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(c,"BAD_INDENT",rs)),!g.anchor&&!g.tag&&!b){l=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||_t(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",rs);t.atKey=!0;const _=g.end,I=m?n(t,m,g,i):e(t,_,p,null,g,i);t.schema.compat&&In(s.indent,m,i),t.atKey=!1,zs(t,o.items,I)&&i(_,"DUPLICATE_KEY","Map keys must be unique");const E=rt(b??[],{indicator:"map-value-ind",next:d,offset:I.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(c=E.end,E.found){y&&((d==null?void 0:d.type)==="block-map"&&!E.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<E.found.offset-1024&&i(I.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const v=d?n(t,d,E,i):e(t,c,b,null,E,i);t.schema.compat&&In(s.indent,d,i),c=v.range[2];const k=new he(I,v);t.options.keepSourceTokens&&(k.srcToken=f),o.items.push(k)}else{y&&i(I.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),E.comment&&(I.comment?I.comment+=`
`+E.comment:I.comment=E.comment);const v=new he(I);t.options.keepSourceTokens&&(v.srcToken=f),o.items.push(v)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function wa({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??qe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:f}of s.items){const p=rt(u,{indicator:"seq-item-ind",next:f,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||f)(f==null?void 0:f.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=p.end,p.comment&&(o.comment=p.comment);continue}const m=f?n(t,f,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&In(s.indent,f,i),c=m.range[2],o.items.push(m)}return o.range=[s.offset,c,l??c],o}function Lt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const un="Block collections are not allowed within flow collections",dn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function va({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?ye:qe),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let y=0;y<s.items.length;++y){const _=s.items[y],{start:I,key:E,sep:v,value:k}=_,L=rt(I,{flow:o,indicator:"explicit-key-ind",next:E??(v==null?void 0:v[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!L.found){if(!L.anchor&&!L.tag&&!v&&!k){y===0&&L.comma?i(L.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):y<s.items.length-1&&i(L.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),L.comment&&(l.comment?l.comment+=`
`+L.comment:l.comment=L.comment),f=L.end;continue}!r&&t.options.strict&&_t(E)&&i(E,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(y===0)L.comma&&i(L.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(L.comma||i(L.start,"MISSING_CHAR",`Missing , between ${o} items`),L.comment){let S="";e:for(const A of I)switch(A.type){case"comma":case"space":break;case"comment":S=A.source.substring(1);break e;default:break e}if(S){let A=l.items[l.items.length-1];z(A)&&(A=A.value??A.key),A.comment?A.comment+=`
`+S:A.comment=S,L.comment=L.comment.substring(S.length+1)}}if(!r&&!v&&!L.found){const S=k?n(t,k,L,i):e(t,L.end,v,null,L,i);l.items.push(S),f=S.range[2],dn(k)&&i(S.range,"BLOCK_IN_FLOW",un)}else{t.atKey=!0;const S=L.end,A=E?n(t,E,L,i):e(t,S,I,null,L,i);dn(E)&&i(A.range,"BLOCK_IN_FLOW",un),t.atKey=!1;const x=rt(v??[],{flow:o,indicator:"map-value-ind",next:k,offset:A.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(x.found){if(!r&&!L.found&&t.options.strict){if(v)for(const $ of v){if($===x.found)break;if($.type==="newline"){i($,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}L.start<x.found.offset-1024&&i(x.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else k&&("source"in k&&((g=k.source)==null?void 0:g[0])===":"?i(k,"MISSING_CHAR",`Missing space after : in ${o}`):i(x.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const V=k?n(t,k,x,i):x.found?e(t,x.end,v,null,x,i):null;V?dn(k)&&i(V.range,"BLOCK_IN_FLOW",un):x.comment&&(A.comment?A.comment+=`
`+x.comment:A.comment=x.comment);const B=new he(A,V);if(t.options.keepSourceTokens&&(B.srcToken=_),r){const $=l;zs(t,$.items,A)&&i(S,"DUPLICATE_KEY","Map keys must be unique"),$.items.push(B)}else{const $=new ye(t.schema);$.flow=!0,$.items.push(B);const W=(V??A).range;$.range=[A.range[0],W[1],W[2]],l.items.push($)}f=V?V.range[2]:x.end}}const p=r?"}":"]",[m,...b]=s.end;let d=f;if((m==null?void 0:m.source)===p)d=m.offset+m.source.length;else{const y=o[0].toUpperCase()+o.substring(1),_=u?`${y} must end with a ${p}`:`${y} in block collection must be sufficiently indented and end with a ${p}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",_),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const y=Lt(b,d,t.options.strict,i);y.comment&&(l.comment?l.comment+=`
`+y.comment:l.comment=y.comment),l.range=[s.offset,d,y.offset]}else l.range=[s.offset,d,d];return l}function fn(n,e,t,s,i,a){const r=t.type==="block-map"?ba(n,e,t,s,a):t.type==="block-seq"?wa(n,e,t,s,a):va(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function _a(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,d=m&&a?m.offset>a.offset?m:a:m??a;d&&(!b||b.offset<d.offset)&&i(d,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===ye.tagName&&o==="map"||r===qe.tagName&&o==="seq")return fn(n,e,t,i,r);let c=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!c){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),c=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),fn(n,e,t,i,r)}const l=fn(n,e,t,i,r,c),u=((p=c.resolve)==null?void 0:p.call(c,l,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??l,f=J(u)?u:new P(u);return f.range=l.range,f.tag=r,c!=null&&c.format&&(f.format=c.format),f}function Sa(n,e,t){const s=e.offset,i=ka(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?P.BLOCK_FOLDED:P.BLOCK_LITERAL,r=e.source?Ea(e.source):[];let o=r.length;for(let d=r.length-1;d>=0;--d){const g=r[d][1];if(g===""||g==="\r")o=d;else break}if(o===0){const d=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:d,type:a,comment:i.comment,range:[s,g,g]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let d=0;d<o;++d){const[g,y]=r[d];if(y===""||y==="\r")i.indent===0&&g.length>c&&(c=g.length);else{g.length<c&&t(l+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=g.length),u=d,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=g.length+y.length+1}for(let d=r.length-1;d>=o;--d)r[d][0].length>c&&(o=d+1);let f="",p="",m=!1;for(let d=0;d<u;++d)f+=r[d][0].slice(c)+`
`;for(let d=u;d<o;++d){let[g,y]=r[d];l+=g.length+y.length+1;const _=y[y.length-1]==="\r";if(_&&(y=y.slice(0,-1)),y&&g.length<c){const E=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-y.length-(_?2:1),"BAD_INDENT",E),g=""}a===P.BLOCK_LITERAL?(f+=p+g.slice(c)+y,p=`
`):g.length>c||y[0]==="	"?(p===" "?p=`
`:!m&&p===`
`&&(p=`

`),f+=p+g.slice(c)+y,p=`
`,m=!0):y===""?p===`
`?f+=`
`:p=`
`:(f+=p+y,p=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let d=o;d<r.length;++d)f+=`
`+r[d][0].slice(c);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}const b=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,b,b]}}function ka({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:c===-1&&(c=n+p)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",f=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":l=!0;case"newline":f+=m.source.length;break;case"comment":t&&!l&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),f+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const d=m.source;d&&typeof d=="string"&&(f+=d.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function Ea(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function Ia(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(p,m,b)=>t(s+p,m,b);switch(i){case"scalar":o=P.PLAIN,c=La(a,l);break;case"single-quoted-scalar":o=P.QUOTE_SINGLE,c=Na(a,l);break;case"double-quoted-scalar":o=P.QUOTE_DOUBLE,c=Aa(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Lt(r,u,e,t);return{value:c,type:o,comment:f.comment,range:[s,u,f.offset]}}function La(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Qs(n)}function Na(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Qs(n.slice(1,-1)).replace(/''/g,"'")}function Qs(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function Aa(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=Ta(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Ca[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Ma(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Ta(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Ca={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Ma(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Xs(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?Sa(n,e,s):Ia(e,n.options.strict,s),c=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[Ae]:c?l=Oa(n.schema,i,c,t,s):e.type==="scalar"?l=Pa(n,i,e,s):l=n.schema[Ae];let u;try{const f=l.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=K(f)?f:new P(f)}catch(f){const p=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",p),u=new P(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function Oa(n,e,t,s,i){var o;if(t==="!")return n[Ae];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Ae])}function Pa({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[Ae];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[Ae];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function $a(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const Ra={composeNode:Zs,composeEmptyNode:qn};function Zs(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=xa(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=Xs(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=_a(Ra,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(f){const p=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return l??(l=qn(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!K(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function qn(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:$a(e,t,s),indent:-1,source:""},f=Xs(n,u,o,l);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=c),f}function xa({options:n},{offset:e,source:t,end:s},i){const a=new Pn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Lt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Fa(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new Qt(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=rt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Zs(l,i,u,r):qn(l,u.end,s,null,u,r);const f=c.contents.range[2],p=Lt(a,f,!1,r);return p.comment&&(c.comment=p.comment),c.range=[t,f,p.offset],c}function ht(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function os(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Ba{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=ht(t);a?this.warnings.push(new ya(r,s,i)):this.errors.push(new yt(r,s,i))},this.directives=new fe({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=os(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(Y(a)&&!a.flow&&a.items.length>0){let r=a.items[0];z(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:os(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=ht(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Fa(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new yt(ht(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new yt(ht(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Lt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new yt(ht(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Qt(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const ei="\uFEFF",ti="",ni="",Ln="";function Va(n){switch(n){case ei:return"byte-order-mark";case ti:return"doc-mode";case ni:return"flow-error-end";case Ln:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ie(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const ls=new Set("0123456789ABCDEFabcdef"),Ha=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ot=new Set(",[]{}"),Ua=new Set(` ,[]{}
\r	`),hn=n=>!n||Ua.has(n);class Da{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ie(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===ei&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield ti,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ie(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ie(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ie(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(hn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ie(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield ni,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(hn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ie(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ie(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield Ln,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ie(a)||e&&Ot.has(a))break;t=s}else if(Ie(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Ot.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Ot.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Ln,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(hn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ie(t)||e&&Ot.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ie(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Ha.has(t))t=this.buffer[++e];else if(t==="%"&&ls.has(this.buffer[e+1])&&ls.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class ja{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Pe(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function cs(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function si(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Pt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function ze(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function us(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Pe(e.start,"explicit-key-ind")&&!Pe(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,si(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Ka{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Da,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Va(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&us(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&cs(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{cs(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Pt(this.peek(2)),s=ze(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Pe(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(si(t.key)&&!Pe(t.sep,"newline")){const o=ze(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Pe(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=ze(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Pe(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Pe(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Pe(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Pt(s),a=ze(i);us(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Pt(e),s=ze(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Pt(e),s=ze(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function qa(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new ja||null,prettyErrors:e}}function Wa(n,e={}){const{lineCounter:t,prettyErrors:s}=qa(e),i=new Ka(t==null?void 0:t.addNewLine),a=new Ba(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new yt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(as(n,t)),r.warnings.forEach(as(n,t))),r}function Oe(n,e,t){let s;const i=Wa(n,t);if(!i)return null;if(i.warnings.forEach(a=>Cs(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Ga=`# Simulation family catalog source-of-truth.
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
  placeholderImage: assets/planetary-parameter-overlay.webp
  parameterSubtitle: Adjust proto-planet impact parameters and hunt for the initial state that produced our Earth-Moon system.
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
  parameterSubtitle: Adjust the ingredients of a galaxy and see whether your setup can grow into something like the Milky Way.
  views:
    - id: hst
      label: Hubble Space Telescope
      icon: hubble-space-telescope
      description: See your galaxy as the Hubble Space Telescope would — a luminous swirl of billions of stars. Brighter regions trace where the most stars were born while dark lanes mark the dust (complex molecules and tiny grains) that blocks starlight.
    - id: sph_plus_hst
      label: Large Scale Structure
      icon: large-scale-structure
      description: Zoom out to see the grand architecture of your galaxy — vast streams of gas funnelling in to sustain the galaxy's star formation along the hidden skeleton of dark matter that holds everything together.
  metadata:
    distinctSimulations: 20488
    correctValues:
      stellar_mass: 6.1 # in units of 1e10 Msun
      black_hole_mass: 4.3 # in units of 1e6 Msun
      galaxy_age: 8.5 # in B yrs; approximate Milky Way mass-weighted stellar age

cosmos:
  label: Cosmos
  placeholderImage: assets/cosmos_example.webp
  parameterSubtitle: Adjust the fundamental laws of our Universe and see how matter evolves from the beginning of time.
  views:
    - id: gas_density
      label: Gas Density
      icon: gas-density
      description: The density of gas in the Universe. Gas collapses onto the cosmic web — the largest structure in the Universe as it cools and succumbs to gravity. Bright knots are galaxy clusters and groups, the wispy threads are filaments of gas stretching between them, and the dark empty patches are vast cosmic voids separating them.
    - id: gas_temperature
      label: Gas Temperature
      icon: gas-temperature
      description: The temperature of the gas in the Universe. As gas collapses onto the cosmic web, it heats up but also cools as it radiates energy away. This cooling is imperitive for the formation of galaxies and stars, which can only form in cold, dense gas. However, once stars form they begin to heat the surrounding gas suppresing local star formation while supermassive black holes super heats gas as it falls into the black hole and ejects energy back into the surrounding gas on the largest scales. These are the massive bubbles seen in the gas temperature view.
    - id: dark_matter_density
      label: Dark Matter
      icon: dark-matter
      description: The invisible scaffolding of the cosmos. Dark matter outweighs ordinary matter five to one in our Universe — you can't see it, but without it, galaxies like ours would never have formed.
    - id: gas_metallicity_plus_stellar_density
      label: Metals + Stars
      icon: metals-stars
      description: Where stars live and die. This view combines the light of stars with the heavy elements they forge — oxygen, carbon, iron — sprayed back into space by supernova explosions to seed the next generation of stars.
  metadata:
    distinctSimulations: 8192
    correctValues:
      baryon_fraction: 1.0
      black_hole_strength: 1.0
      gravity_strength: 1.0
`,Ya=`# Parameter definitions for each simulation family.
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
    description: How big was the object that smashed into the young Earth? A larger impactor creates a bigger debris cloud — and a bigger Moon.
    unit: M⊕
    min: 0.05
    max: 0.35
    step: 0.01
  impactor_velocity:
    label: Impactor Velocity
    description: How fast was the impactor travelling when it hit? Faster collisions are more violent, spraying hotter debris into orbit around the early Earth.
    unit: km/s
    min: 8.6
    max: 27.9
    step: 0.1
  impactor_angle:
    label: Impactor Angle
    description: Did the impactor strike head-on or glance off at an angle? A direct hit throws material straight up, while a sideswipe can spin the debris into a wider, thinner disc.
    unit: °
    min: 0
    max: 60
    step: 1

galaxy:
  stellar_mass:
    label: Stellar Mass
    description: How many stars did your galaxy make? This ranges from tiny dwarf galaxies with barely any stars up to enormous systems twice the size of the Milky Way.
    unit: '×10¹⁰ M☉'
    min: 0.1
    max: 20
    value_scale: 1.0e10
    display_unit: Msun
    display_format: compact
    display_significant_figures: 3
  black_hole_mass:
    label: Black Hole Mass
    description: How heavy is the monster at the centre? Every large galaxy harbours a supermassive black hole — this slider controls how big yours grew over cosmic time.
    unit: '×10⁶ M☉'
    min: 0.1
    max: 250
    value_scale: 1.0e6
    display_unit: Msun
    display_format: compact
    display_significant_figures: 3
  galaxy_age:
    label: Galaxy Age
    description: How old are the stars in your galaxy? Older galaxies look redder and smoother, having had time to settle. Younger ones are bluer, brighter, and more chaotic.
    unit: yrs
    min: 4
    max: 13.8
    value_scale: 1.0e9
    display_format: compact

cosmos:
  baryon_fraction:
    label: Baryon Fraction
    description: How much of the Universe is made of ordinary stuff — the atoms that form stars, planets, and you? Turn this up and there's more gas to make galaxies; turn it down and dark matter dominates.
    unit: ''
    min: 0.10
    max: 4
    step: 0.01
    value_scale: 0.159
  black_hole_strength:
    label: Black Hole Strength
    description: How powerfully do black holes push back? As gas spirals inward it heats to millions of degrees. Some of that energy blasts back out as fierce winds or jets, shutting down star formation across entire galaxies.
    unit: 'K'
    min: 0.01
    max: 50.0
    step: 0.01
    value_scale: 8.80e7
    display_format: compact
    display_significant_figures: 3
    log_scale: true
  gravity_strength:
    label: Gravity
    description: What if gravity were stronger — or weaker? Turn it up and the cosmic web forms faster, pulling galaxies into tighter clumps. Turn it down and the Universe stays smoother and emptier for longer.
    # unit: m^3 kg^-1 s^-2
    min: 0.01
    max: 10
    step: 0.01
    # value_scale: 6.6743e-11
    # display_format: compact
    display_significant_figures: 2
    log_scale: true
`,Ja=`# Summary overlay display configuration for each simulation family.
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
#   value          — initial / fallback display value
#   unit           — appended after the formatted value
#   description    — explanatory text shown in a tap-to-open overlay
#   target         — reference value used by result bars for similarity scoring
#   value_scale    — multiply numeric values before formatting for display
#   display_format — \`integer\`, \`float\`, or \`scientific\`
#   precision      — decimal places or scientific significant figures

planetary:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kg CO2
      display_format: float
      precision: 2
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  results:
    - id: moon_mass
      label: Moon mass
      target: 1.0
      value: '1.05'
      unit: M⊕
      display_format: float
      precision: 2
      description: How close you got to making the real Moon. Too small and the tides would be weak — too big and the night sky would be terrifying.
    - id: earth_mass
      label: Earth mass
      target: 1.0
      value: '1.55'
      unit: M⊕
      display_format: float
      precision: 2
      description: How close your Earth ended up to the one we actually live on.
    - id: spin
      label: Earth-Moon system spin
      target: 1.0
      value: '0.30'
      display_format: float
      precision: 3
      description: How fast the Earth-Moon pair is spinning as a fraction of the real system.
    - id: moon_iron
      label: Moon iron
      target: 1.0
      value: '0.70'
      display_format: float
      precision: 2
      description: How iron-poor your Moon turned out. The real Moon has surprisingly little iron in it — a clue about how it was born.
    - id: proto_earth_in_moon
      label: Proto-Earth in Moon
      target: 1.0
      value: '1.25'
      display_format: float
      precision: 2
      description: How much of your Moon came from the early Earth versus the rogue object that smashed into it.
  simulationStats:
    - id: similarityScore
      label: Similarity score
      value: 100/100
      description: A simple overall score showing how close this Moon-forming collision came to the target outcome.
    - id: moon_iron_percent
      label: Moon iron
      value: '0'
      unit: '%'
      display_format: float
      precision: 1
      description: How closely the Moon's iron content matches the target value. Higher percentages are more Moon-like.
    - id: proto_earth_in_moon_percent
      label: Proto-Earth Moon fraction
      value: '0'
      unit: '%'
      display_format: float
      precision: 1
      description: How closely the proto-Earth contribution to the Moon matches the target value. Higher percentages are a better match.
    - id: scenario_likelihood
      label: Scenario likelihood
      value: '100'
      unit: '%'
      display_format: integer
      description: A simple numerical plausibility score for the chosen impact geometry. More extreme speeds or near head-on collisions score lower.
  similarityScore:
    value: 100/100

galaxy:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kg CO2
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  results:
    - id: stellar_mass
      label: Stellar mass
      target: 6.1
      unit: Msun
      value_scale: 1.0e10
      display_format: compact
      precision: 3
      description: How many stars your galaxy managed to make. Each solar mass is the weight of our own Sun.
    - id: black_hole_mass
      label: Black hole mass
      target: 4.3
      unit: Msun
      value_scale: 1.0e6
      display_format: compact
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
    - id: galaxy_age
      label: Galaxy age
      target: 8.5
      unit: yrs
      value_scale: 1.0e9
      description: How old the stars in your galaxy are on average. Older galaxies look redder and smoother; younger ones are bluer and more chaotic.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass
      value: '0'
      unit: Msun
      display_format: compact
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
      display_format: compact
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
  similarityScore:
    value: 100/100

cosmos:
  resources:
    - id: runtime
      value: '0.00'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run. Think of it like the render time for a CGI movie.
    - id: carbonBurnt
      value: '0.00'
      unit: kg CO2
      display_format: float
      precision: 2
      description: The carbon cost of running this simulation. Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: 0 CPU-hrs / 0 GB
      description: How much computer muscle the simulation needed to crunch all that physics.
  results:
    - id: baryon_fraction
      label: Baryon fraction
      target: 1.0
      value: '1.0'
      display_format: float
      precision: 2
      description: How much ordinary matter your universe had compared with our own.
    - id: black_hole_strength
      label: Black hole strength
      target: 1.0
      value_scale: 8.80e7
      unit: K
      display_format: compact
      precision: 3
      description: How powerfully black holes heated and pushed on the surrounding gas.
    - id: gravity_strength
      label: Gravity
      target: 1.0
      value: '1.0'
      display_format: float
      precision: 2
      description: How strong gravity was compared with our own universe.
  simulationStats:
    - id: stellar_mass_msun
      label: Stellar mass formed
      value: '0'
      unit: Msun
      display_format: compact
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
`,za=`# Live telemetry HUD display configuration for each simulation family.
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
      unit: yrs
      label: Mass-Weighted Age
      live: true
      live_key: StellarMassWeightedAge_yr

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
`;function Z(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Qa=Oe(Ga),Xa=Oe(Ya),ds=Oe(Ja),Za=Oe(za),Qe=Object.entries(Qa).map(([n,e])=>{var r,o;const t=er(ds[n]),s=(((r=ds[n])==null?void 0:r.results)??[]).map(tr),i=((o=Za[n])==null?void 0:o.liveStats)??[],a=Xa[n]??{};return{id:n,label:e.label,placeholderImage:Z(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{distinctSimulations:e.metadata.distinctSimulations,correctValues:e.metadata.correctValues,results:s,summaryStats:t.map(Nn),liveStats:i.map(Nn)},parameters:Object.entries(a).map(([c,l])=>{const u=l.step??nr(l.min,l.max),f=l.log_scale?Math.sqrt(l.min*l.max):sr(l.min,l.max);return{id:c,label:l.label,unit:l.unit??"",min:l.min,max:l.max,step:u,fallbackValue:f,description:l.description,valueScale:l.value_scale,displayUnit:l.display_unit,displayFormat:l.display_format,displaySignificantFigures:l.display_significant_figures,logScale:l.log_scale}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,description:c.description}))}});function er(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function Nn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function tr(n){return{...Nn(n),target:n.target}}function nr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function sr(n,e){return n+(e-n)/2}const ii="universe-engine-theme",ai=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function ir(){const n=localStorage.getItem(ii);return rr(n)?n:"glass"}function mn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(ii,n)}function ar(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of ai){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function rr(n){return ai.some(e=>e.id===n)}function or(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,c=!1;const l=new Map,u=new Map,f=new Map;let p=null,m=null;const b=document.createElement("canvas"),d=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function y(){p&&(URL.revokeObjectURL(p),p=null)}function _(N,C={}){const O=u.get(N);O&&(u.delete(N),C={...C,ownedObjectUrl:!0},N=O),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(N)){s.classList.remove("fade-out");return}const q=s.muted,U=C.seekFraction;y(),m=null,p=C.ownedObjectUrl?N:null,s.src=N,s.load(),s.onloadeddata=()=>{if(s.muted=q,U!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const ve=Math.max(0,Math.min(.999,U));s.currentTime=ve*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),C.autoplay&&s.play().catch(()=>{})}},120)}function I(N){s.muted=N}async function E(){await s.play()}function v(){s.pause()}function k(){s.classList.add("is-empty")}function L(){s.classList.remove("is-empty")}function S(N){if(!Number.isFinite(s.duration)||s.duration<=0)return;const C=Math.max(0,Math.min(1,N));s.currentTime=C*s.duration}function A(){s.currentTime=0,i==null||i(0)}function x(N=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(C=>{const O=()=>{U(),C()},q=window.setTimeout(()=>{U(),C()},Math.max(0,N));function U(){window.clearTimeout(q),s.removeEventListener("loadeddata",O)}s.addEventListener("loadeddata",O,{once:!0})})}function V(N,C=8e3){const O=Math.max(0,N);return O===0||B(O)?Promise.resolve():new Promise(q=>{const U=()=>{B(O)&&(D(),q())},ve=window.setTimeout(()=>{D(),q()},Math.max(0,C));function D(){window.clearTimeout(ve),s.removeEventListener("progress",U),s.removeEventListener("canplay",U),s.removeEventListener("loadeddata",U)}s.addEventListener("progress",U),s.addEventListener("canplay",U),s.addEventListener("loadeddata",U),U()})}function B(N){const C=s.currentTime;for(let O=0;O<s.buffered.length;O+=1){const q=s.buffered.start(O),U=s.buffered.end(O);if(!(C<q||C>U))return U-C>=N}return!1}function $(N){o=new Set(N.filter(Boolean).filter(C=>C!==s.currentSrc)),c||Q()}function W(){c=!0,oe(),le()}function ee(){if(!c){Q();return}c=!1,Q()}function Q(){for(const[N,C]of l.entries())o.has(N)||(C.removeAttribute("src"),C.load(),l.delete(N));for(const[N,C]of f.entries())o.has(N)||(C.abort(),f.delete(N));for(const N of o){if(!l.has(N)){const C=document.createElement("video");C.preload="auto",C.muted=!0,C.playsInline=!0,C.src=N,C.load(),l.set(N,C)}u.has(N)||f.has(N)||ge(N)}}function oe(){for(const N of l.values())N.removeAttribute("src"),N.load();l.clear()}function le(){for(const N of f.values())N.abort();f.clear()}function ge(N){const C=new AbortController;f.set(N,C);const O=`${N}?_=${Date.now()}`;fetch(O,{signal:C.signal}).then(async q=>{if(!q.ok)return;const U=await q.blob();o.has(N)&&u.set(N,URL.createObjectURL(U))}).catch(q=>{q instanceof DOMException&&q.name}).finally(()=>{f.get(N)===C&&f.delete(N)})}function ce(){o.clear(),c=!1,oe(),le();for(const N of u.values())URL.revokeObjectURL(N);u.clear()}function ne(N){return u.get(N)??null}function X(){!d||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(b.width=s.videoWidth,b.height=s.videoHeight,d.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85))}function te(){return m||X(),m}function F(N){i=N}function G(N){a=N}return{setSource:_,setMuted:I,play:E,pause:v,hideMedia:k,showMedia:L,seekToFraction:S,resetPlayback:A,waitForLoadedData:x,waitForBufferedAhead:V,onTimeUpdate:F,onEnded:G,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:N=>{g=N,s.playbackRate=N},getPlaybackRate:()=>g,onPlayStateChange:N=>{r=N},getElement:()=>t,prewarmSources:$,suspendPrewarming:W,resumePrewarming:ee,clearPrewarmedSources:ce,getPrewarmedBlobUrl:ne,captureFrame:te}}const lr=[.25,.5,1,2];function cr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onScrubStart:a,onScrubEnd:r,initialSpeed:o=1}=e,c=document.createElement("div");c.className="timeline";const l=document.createElement("div");l.className="timeline__bar-row";const u=document.createElement("button");u.className="timeline__play-btn",u.type="button",u.setAttribute("aria-label","Toggle playback"),u.addEventListener("click",()=>s==null?void 0:s());const f=document.createElement("input");f.className="timeline__slider",f.type="range",f.min="0",f.max="1000",f.step="1",f.value="0",f.style.setProperty("--fill","0%"),f.setAttribute("aria-label","Simulation time");const p=document.createElement("div");p.className="timeline__speed";const m=document.createElement("button");m.className="timeline__speed-btn",m.type="button",m.setAttribute("aria-label","Playback speed"),m.addEventListener("click",()=>{p.classList.toggle("open")});const b=document.createElement("div");b.className="timeline__speed-menu";for(const g of lr){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=pn(g),y.addEventListener("click",()=>{p.classList.remove("open"),i==null||i(g)}),b.appendChild(y)}return p.appendChild(m),p.appendChild(b),l.appendChild(u),l.appendChild(f),l.appendChild(p),f.addEventListener("input",()=>{const g=parseInt(f.value,10)/1e3;f.style.setProperty("--fill",`${g*100}%`),t==null||t(g)}),f.addEventListener("pointerdown",()=>a==null?void 0:a()),f.addEventListener("pointerup",()=>r==null?void 0:r()),f.addEventListener("change",()=>r==null?void 0:r()),document.addEventListener("click",g=>{p.contains(g.target)||p.classList.remove("open")}),c.appendChild(l),n.appendChild(c),d(o),{setPosition(g){const y=Math.max(0,Math.min(1,g));f.value=String(Math.round(y*1e3)),f.style.setProperty("--fill",`${y*100}%`)},setPlaying(g){u.textContent=g?"⏸":"▶",u.classList.toggle("is-paused",!g),u.setAttribute("aria-label",g?"Pause":"Play")},setSpeed(g){d(g)}};function d(g){m.textContent=pn(g);for(const y of b.children)y.classList.toggle("is-active",y.textContent===pn(g))}}function pn(n){return`x${n}`}function ur(n,e){const t=Math.min(ri(e),2);return n.toFixed(t)}function Le(n,e){return e?`${n} ${e}`:n}function St(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?mt(n):e<1e6?`${t}${mt(n/1e3)}K`:e<1e9?`${t}${mt(n/1e6)}M`:e<1e12?`${t}${mt(n/1e9)}B`:`${t}${mt(n/1e12)}T`:String(n)}function mt(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function dr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Ht(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return St(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function nt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="compact"||t.format==="scientific"?St(i):ur(i,a)}function ri(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function fr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=hr(s,i,a);for(const o of s.metadata.liveStats){const c=pr(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function hr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:nt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:mr(a),value:r}]))}}function mr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function pr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=gr((i==null?void 0:i.value)??t.value??n.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Le(a,n.unit)}}function gr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?St(Math.round(a)):St(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):dr(n,{integer:e.integer})}const yr={planetary:"Smash together proto-planets and try to form the Moon",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function br(n,e,t){const s=Z("assets/banner-1600.webp"),i=[`${Z("assets/banner-960.webp")} 960w`,`${Z("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(b){o.innerHTML="";for(const d of b){const g=document.createElement("button");g.className="entry-overlay__button",g.type="button";const y=yr[d.id]??"Explore this simulation scale.";g.innerHTML=`
        <span class="entry-overlay__button-label">${d.label}</span>
        <span class="entry-overlay__button-description">${y}</span>
      `,g.addEventListener("click",()=>t(d)),o.appendChild(g)}}c(e);const l=document.createElement("div"),u=document.createElement("button");u.className="view-switcher__info entry-overlay__info-button",u.type="button",u.setAttribute("aria-label","About this experience"),u.appendChild(vr()),l.className="sci-modal is-hidden",l.innerHTML=`
    <div class="entry-info-modal">
      <div class="entry-info-modal__shell">
        <div class="entry-info-modal__media">
          <img
            class="entry-info-modal__image"
            src="${s}"
            alt="Universe Engine preview"
            width="1600"
            height="381"
            decoding="async"
          />
          <div class="entry-info-modal__media-copy">
            <p class="entry-info-modal__eyebrow">Universe Engine</p>
            <h2 class="entry-info-modal__headline">Explore Simulation At Human Scale</h2>
          </div>
        </div>
        <div class="entry-info-modal__content">
          <button class="entry-info-modal__close" type="button" aria-label="Close">×</button>
          <div class="entry-info-modal__header">
            <p class="entry-info-modal__eyebrow">About</p>
            <h2 class="entry-info-modal__title">What Is This Experience?</h2>
            <p class="entry-info-modal__subtitle">
              Universe Engine turns large scientific simulations into an interactive public-facing
              experience: choose a scale, change the inputs, and see how those decisions reshape
              the final outcome.
            </p>
          </div>
          <div class="entry-info-modal__body">
            <section class="entry-info-modal__section">
              <h3 class="entry-info-modal__section-title">What can you do?</h3>
              <p class="entry-info-modal__copy">
                Pick a theme, tune a small set of meaningful parameters, run the simulation, and
                compare your choices with the scientific targets, outputs, and computational cost.
              </p>
            </section>
            <section class="entry-info-modal__section">
              <h3 class="entry-info-modal__section-title">What should you take away?</h3>
              <div class="entry-info-modal__theme-list">
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Planetary</p>
                  <p class="entry-info-modal__copy">
                    Small shifts in angle, speed, and mass can completely change how a Moon-forming
                    impact unfolds.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Galaxy</p>
                  <p class="entry-info-modal__copy">
                    Galaxies emerge from long feedback loops between stars, gas, and black holes,
                    not from any single parameter in isolation.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Cosmos</p>
                  <p class="entry-info-modal__copy">
                    Even the largest structures in the Universe depend sensitively on the basic
                    physical laws underpinning everything from the Big Bang to the present day.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,r.appendChild(o),a.appendChild(r),a.appendChild(u),a.appendChild(l),n.appendChild(a);const f=l.querySelector(".entry-info-modal__close");function p(){l.classList.remove("is-hidden")}function m(){l.classList.add("is-hidden")}return u.addEventListener("click",p),f.addEventListener("click",m),l.addEventListener("click",b=>{b.target===l&&m()}),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){m(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(b){c(b)}}}function wr(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function vr(){return wr(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}function _r(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(v=>[v.id,v.target])),a=n.metadata.results.map(v=>{const k=yn(n,e,s,v.id);return k===null?null:{id:v.id,value:k,target:v.target}}).filter(v=>v!==null),r=n.parameters.filter(v=>i[v.id]!==void 0).map(v=>{const k=e[v.id]??v.fallbackValue,L=i[v.id]??v.fallbackValue;return Math.abs(k-L)/Math.max(v.max-v.min,1e-9)}),o=r.reduce((v,k)=>v+k,0)/Math.max(r.length,1),c=Er(a),l=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${gn(u,1)} CPU-hrs
${gn(f,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,d=String(n.parameters.length+6),g="Present",y=kr((s==null?void 0:s.wallclockSeconds)??t),_=fs(hs(yn(n,e,s,"moon_iron"))),I=fs(hs(yn(n,e,s,"proto_earth_in_moon"))),E=Ir(n.id,e);return{scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:y},similarityScore:{label:"Similarity Score",value:`${c}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:l},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:gn(f,1)},particlesUpdated:{label:"Particle updates",value:s?Sr(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:_},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:I},scenario_likelihood:{label:"Scenario likelihood",value:E},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:d},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([v,k])=>[v,{label:k.label,value:k.value}]))}}function Sr(n){return String(Math.max(0,n))}function kr(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function gn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function yn(n,e,t,s){var c;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=t==null?void 0:t.parameterValues[s];if(typeof a=="number"&&Number.isFinite(a))return a;const r=(c=t==null?void 0:t.summaryMetrics[s])==null?void 0:c.value;if(r===void 0)return null;const o=Number(r);return Number.isFinite(o)?o:null}function fs(n){return n===null?"--":n.toFixed(1)}function hs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function Er(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}function Ir(n,e){if(n!=="planetary")return"--";const t=e.impactor_velocity,s=e.impactor_angle;if(!Number.isFinite(t)||!Number.isFinite(s))return"--";const i=Math.abs(t-15)*6,a=Math.abs(s-45)*1.6,r=Math.max(0,Math.round(100-i-a));return String(r)}const An={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},Lr={HIDE_AFTER_MS:980},Nr="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",Ar="https://universe-engine.universe-engine.workers.dev/api/track-run",Tr=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,ms=(()=>{const n=Oe(Tr),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Ut="#4CD98A",Tn="#E8951C",oi="#D7372A",li=.2,ci=.5,ps=2;function ui(n){const e=Math.abs(n-1);return e<=li?{word:"On target",colour:Ut}:e<=ci?{word:n>1?"Too high":"Too low",colour:Tn}:{word:n>1?"Way too high":"Way too low",colour:oi}}function Cr(n){const e=Math.abs(n-1),t=n>=1;return e<=li?t?"greenHigh":"greenLow":e<=ci?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Mr(n){return Math.min(Math.max(n,0),ps)/ps*100}function Or(n){return n>=85?{word:"Almost perfect",colour:Ut}:n>=65?{word:"Really close",colour:Ut}:n>=45?{word:"Getting there",colour:Tn}:n>=25?{word:"Not quite",colour:Tn}:{word:"Way off - try again",colour:oi}}function Pr(n,e,t){var r,o;const s=Cr(t),i=((r=ms[n])==null?void 0:r[s])??((o=ms[e])==null?void 0:o[s]);return i||(ui(t).colour===Ut?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function $r(n,e,t){return n.metadata.results.map(s=>{const i=Rr(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=xr(s,n,t),o=Pr(s.id,r,a),c=Le(di(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:c,detail:o}}).filter(s=>s!==null)}function Rr(n,e,t,s){var l;const i=n.id,a=e.parameters.find(u=>u.id===i);if(a)return t[i]??a.fallbackValue;const r=s==null?void 0:s.parameterValues[i];if(typeof r=="number"&&Number.isFinite(r))return r;const o=gs((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);return o!==null?o:gs(n.value)}function xr(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function gs(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Fr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Br(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const c=document.createElement("p");c.className="summary-overlay__hint",c.textContent="Select any card for more details",a.appendChild(o),a.appendChild(c);const l=document.createElement("div");l.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button summary-overlay__button--primary",u.type="button",u.textContent="Continue Exploring";const f=document.createElement("button"),p=document.createElement("button");f.className="summary-overlay__button",f.type="button",f.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),l.appendChild(u),l.appendChild(f),l.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(l),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),d=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),y=m.querySelector(".sci-modal__close");function _(k){const L=ui(k.value);b.textContent=k.label,d.textContent=L.word,d.style.color=L.colour,d.hidden=!1,g.textContent=k.detail,m.classList.remove("is-hidden")}function I(k,L){b.textContent=k,d.hidden=!0,g.textContent=L,m.classList.remove("is-hidden")}function E(){m.classList.add("is-hidden")}y.addEventListener("click",E),m.addEventListener("click",k=>{k.target===m&&E()});function v(k,L){const S=document.createElement("div");S.className=`${k.className} panel`,S.innerHTML=`<p class="sci-section__title">${k.title}</p>`;const A=document.createElement("div"),x=k.singleRow?Math.max(1,k.stats.length):Math.max(1,Math.min(k.stats.length,k.maxColumns));A.className="metric-grid",k.singleRow&&A.classList.add("metric-grid--single-row"),A.style.setProperty("--summary-grid-columns",String(x)),A.style.setProperty("--summary-grid-max-width",`${k.maxWidthRem}rem`);for(const V of k.stats){const B=Vr(V,L),$=document.createElement("div"),W=document.createElement("span"),ee=document.createElement("span");$.className="res-card",W.className="res-card__label",W.textContent=B.label,ee.className="res-card__value",ee.textContent=B.value,$.appendChild(W),$.appendChild(ee),V.description&&($.classList.add("res-card--has-info"),$.addEventListener("click",()=>{I(B.label,V.description)})),A.appendChild($)}return S.appendChild(A),S}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},Lr.HIDE_AFTER_MS)},setHomeVisible(k){p.hidden=!k},update(k,L,S,A,x){var te;r.innerHTML="",E();const V=_r(k,L,S,A),B=k.metadata.summaryStats,$=$r(k,L,A),W=new Set($.map(F=>F.id));let ee;if($.length>0)ee=Fr($);else{const F=((te=V.similarityScore)==null?void 0:te.value)??"0/100";ee=parseInt(F,10)||0}const Q=Or(ee),oe=document.createElement("div"),le=document.createElement("div"),ge=document.createElement("div");oe.className="sci-top",le.className="summary-main-column",ge.className="summary-side-column";const ce=document.createElement("div");ce.className="sci-hero panel",x?(ce.classList.add("sci-hero--thumbnail"),ce.innerHTML=`<img class="sci-hero__thumbnail" src="${x}" alt="Final frame of simulation" />`):ce.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${ee}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${Q.colour}">${Q.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${ee}%; background:${Q.colour}; box-shadow:0 0 12px ${Q.colour}"></div>
          </div>
        `,le.appendChild(ce);const ne=B.filter(F=>(F.section??"resources")==="resources"&&!$.some(G=>G.id===String(F.id))&&F.id!=="similarityScore"),X=B.filter(F=>F.section==="simulationStats"&&!W.has(String(F.id)));if(ne.length>0&&ge.appendChild(v({title:"Resources Used",className:"res-section",stats:ne,maxColumns:3,maxWidthRem:48},V)),X.length>0&&ge.appendChild(v({title:"Simulation Stats",className:"res-section",stats:X,maxColumns:X.length,maxWidthRem:48,singleRow:!0},V)),oe.appendChild(le),ge.childElementCount>0&&oe.appendChild(ge),r.appendChild(oe),$.length>0){const F=document.createElement("div");F.className="sci-bottom-row";const G=document.createElement("div");G.className="sci-section panel param-section",G.innerHTML='<p class="sci-section__title">Input Parameters</p>';const N=document.createElement("div");N.className="param-cards";for(const D of k.parameters){const re=L[D.id]??D.fallbackValue,Re=D.displayUnit??D.unit,ue=document.createElement("div"),_e=document.createElement("span"),xe=document.createElement("span");ue.className="res-card",D.description&&(ue.classList.add("res-card--has-info"),ue.addEventListener("click",()=>I(D.label,D.description))),_e.className="res-card__label",_e.textContent=D.label,xe.className="res-card__value";const T=nt(re,D.step,{scale:D.valueScale,format:D.displayFormat,significantFigures:D.displaySignificantFigures});xe.textContent=Le(T,Re),ue.appendChild(_e),ue.appendChild(xe),N.appendChild(ue)}G.appendChild(N);const C=document.createElement("div"),O=document.createElement("div"),q=document.createElement("p"),U=document.createElement("p");C.className="sci-section panel",O.className="sci-section__header",q.className="sci-section__title",q.textContent="Similarity Results",U.className="sci-section__hint",U.textContent="Select any bar for details",O.appendChild(q),O.appendChild(U);const ve=document.createElement("div");ve.className="sci-bars";for(const D of $){const re=document.createElement("div");re.className="sci-bar",re.innerHTML=`
            <div class="sci-bar__name">${D.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Mr(D.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${D.formattedValue}</div>
          `,re.addEventListener("click",()=>_(D)),ve.appendChild(re)}C.appendChild(O),C.appendChild(ve),F.appendChild(G),F.appendChild(C),r.appendChild(F)}}}}function Vr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:n.value??"--",i=Hr(s,n);if(i)return{label:n.label??t.label,value:i};const a=di(s,n);return{label:n.label??t.label,value:Le(a,n.unit)}}function Hr(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Le(Ht(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Le(Ht(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Le(n,e.unit)}function di(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return Ht(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return Ht(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return St(i)}function Ur(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const c=Dr(a.icon);if(c){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(c),o.appendChild(u)}const l=document.createElement("span");if(l.className="view-switcher__label",l.textContent=a.label??a.id,o.appendChild(l),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(jr()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Dr(n){switch(n){case"dark-matter":return De(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return De(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return De(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return De(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return De(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return De(`
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
      `);default:return null}}function De(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function jr(){return De(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Kr=`# Credits source-of-truth.
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

- text: Simulations
  header: true

- text: All simulations performed with SWIFT
  url: https://swift.strw.leidenuniv.nl/

- text: Forward modelling done with Synthesizer
  url: https://synthesizer-project.github.io/synthesizer/#

- text: 'Moon formation simulations by Jacob Kegerreis, Callum Mosley, Ella Buxton, Vince Eke'

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

- text: 'Moon Formation: Jacob Kegerreis & NASA'
  url: https://www.nasa.gov/solar-system/collision-may-have-formed-the-moon-in-mere-hours-simulations-reveal/#:~:text=%E2%80%9CThis%20opens%20up%20a%20whole,in%20The%20Astrophysical%20Journal%20Letters.

- text: Funding
  header: true

- text: We would like to thank the Ogden Trust, the Royal Society, and Durham University for their generous funding that made this project possible.

- text: Licensing
  header: true

- text: UniverseEngine is released under the GNU General Public License v3.0
  url: https://www.gnu.org/licenses/gpl-3.0.en.html

- text: COLIBRE and FLAMINGO content is licensed under CC BY 4.0
  url: https://creativecommons.org/licenses/by/4.0/
`;function qr(){const n=Oe(Kr);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Wr(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:Gr(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),d=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function y(E,v){b.textContent=E,d.textContent=v,m.classList.remove("is-hidden")}function _(){m.classList.add("is-hidden")}g.addEventListener("click",_),m.addEventListener("click",E=>{E.target===m&&_()});const I=document.createElement("div");I.className="parameter-editor__list";for(const E of u.parameters)I.appendChild(c(E,y));i.appendChild(I),l()}function c(u,f){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const d=u.displayUnit??u.unit,g=document.createElement("span");g.className="param-card__range",g.textContent=`${Le(nt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),d)} – ${Le(nt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),d)}`,m.appendChild(b),m.appendChild(g);const y=document.createElement("input");y.className="param-card__slider",y.type="range";const _=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max,E=r[u.id]??u.fallbackValue;y.min=String(_),y.max=String(I),y.step=u.logScale?"0.001":String(u.step),y.value=String(u.logScale?Math.log10(Math.max(E,Number.MIN_VALUE)):E),y.setAttribute("aria-label",u.label);const v=document.createElement("span");v.className="res-card__value";function k(S){const A=u.logScale?10**S:S;r[u.id]=A,y.value=String(S),y.style.setProperty("--fill",`${ys(S,_,I)}%`),v.textContent=Le(nt(A,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),d),l()}y.addEventListener("input",()=>{k(parseFloat(y.value))}),y.addEventListener("pointerdown",S=>S.stopPropagation()),y.addEventListener("click",S=>S.stopPropagation());const L=u.logScale?Math.log10(Math.max(E,Number.MIN_VALUE)):E;if(y.style.setProperty("--fill",`${ys(L,_,I)}%`),v.textContent=Le(nt(E,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),d),u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const S=document.createElement("span");S.className="param-card__info-btn",S.setAttribute("aria-label","Parameter description"),S.textContent="ⓘ",m.appendChild(S),p.addEventListener("click",()=>{f(u.label,u.description)})}return p.appendChild(m),p.appendChild(y),p.appendChild(v),p}function l(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Gr(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function ys(n,e,t){return t===e?0:(n-e)/(t-e)*100}const fi="universe-engine-advanced-settings",Yr="RSSSE26UM_Engine";function Cn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function hi(n){const e=localStorage.getItem(fi);if(!e)return Cn();try{const t=JSON.parse(e);return mi(t,n)}catch{return Cn()}}function Jr(n,e){const t=mi(n,e);return localStorage.setItem(fi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function mi(n,e){const t=Cn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function zr(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Qr(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=l.querySelector(".config-overlay__eyebrow"),f=l.querySelector(".config-overlay__title"),p=l.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Close overlay"),m.textContent="×",c.appendChild(l),c.appendChild(m);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="parameters";const d=document.createElement("div");b.appendChild(d);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="settings",g.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const y=document.createElement("div");g.appendChild(y);const _=document.createElement("section");_.className="advanced-settings",_.dataset.state="closed",_.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const I=document.createElement("button");I.className="advanced-settings__access",I.type="button",I.textContent="Advanced Settings",_.appendChild(I);const E=document.createElement("div");E.className="advanced-settings__auth";const v=document.createElement("input");v.className="advanced-settings__password",v.type="password",v.placeholder="Enter password",v.autocomplete="off";const k=document.createElement("button");k.className="advanced-settings__unlock",k.type="button",k.textContent="Unlock";const L=document.createElement("p");L.className="advanced-settings__message",E.appendChild(v),E.appendChild(k),E.appendChild(L),_.appendChild(E);const S=document.createElement("div");S.className="advanced-settings__form";const A=document.createElement("label");A.className="advanced-settings__field",A.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const x=document.createElement("select");x.className="advanced-settings__select",x.appendChild(new Option("None",""));for(const T of e.availableScales)x.appendChild(new Option(T.label,T.id));A.appendChild(x),S.appendChild(A);const V=document.createElement("div");V.className="advanced-settings__field",V.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const B=document.createElement("div");B.className="advanced-settings__options";const $=document.createElement("label"),W=document.createElement("input");$.className="advanced-settings__choice",W.type="radio",W.name="manifest-source",W.value="local",$.appendChild(W),$.append("Local manifest");const ee=document.createElement("label"),Q=document.createElement("input");ee.className="advanced-settings__choice",Q.type="radio",Q.name="manifest-source",Q.value="online",ee.appendChild(Q),ee.append("Online manifest"),B.appendChild($),B.appendChild(ee),V.appendChild(B),S.appendChild(V);const oe=document.createElement("label");oe.className="advanced-settings__field advanced-settings__field--inline";const le=document.createElement("input"),ge=document.createElement("span");le.type="checkbox",le.className="advanced-settings__checkbox",ge.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,oe.appendChild(le),oe.appendChild(ge),S.appendChild(oe);const ce=document.createElement("div");ce.className="advanced-settings__field",ce.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const ne=document.createElement("div");ne.className="advanced-settings__options";const X=new Map;for(const T of e.availableScales){const H=document.createElement("label"),j=document.createElement("input");H.className="advanced-settings__choice",j.type="checkbox",j.value=T.id,X.set(T.id,j),H.appendChild(j),H.append(`Show ${T.label}`),ne.appendChild(H)}ce.appendChild(ne),S.appendChild(ce),_.appendChild(S),g.appendChild(_);const te=document.createElement("section");te.className="config-overlay__section config-overlay__section--grow",te.dataset.section="credits",te.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const F=te.querySelector("[data-credits]"),G=qr();if(F.innerHTML="",G.length===0){const T=document.createElement("div");T.className="credits-list__entry",T.textContent="To be credited...",F.appendChild(T)}else for(const T of G)if(T.header){const H=document.createElement("div");H.className="credits-list__heading",H.textContent=T.text,F.appendChild(H)}else{const H=document.createElement("div");H.className="credits-list__entry";const j=document.createElement("span");if(j.className="credits-list__text",T.url){const se=document.createElement("a");se.className="credits-list__link",se.href=T.url,se.target="_blank",se.rel="noopener noreferrer",se.textContent=T.text,j.appendChild(se)}else j.textContent=T.text;H.appendChild(j),F.appendChild(H)}const N=document.createElement("div");N.className="config-overlay__footer";const C=document.createElement("button");C.className="run-button",C.type="button",C.textContent="Run",N.appendChild(C),o.appendChild(c),o.appendChild(b),o.appendChild(g),o.appendChild(te),o.appendChild(N),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let O=pt(e.advancedSettings),q="closed";const U=Wr(d,e.simClass,e.values,e.onValuesChange),ve=ar(y,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),I.addEventListener("click",()=>{if(q==="open"){ue("closed");return}ue("auth"),v.focus()}),k.addEventListener("click",Re),v.addEventListener("keydown",T=>{T.key==="Enter"&&Re()}),x.addEventListener("change",()=>{O.lockedScaleId=x.value||null,re()}),W.addEventListener("change",()=>{W.checked&&(O.manifestSource="local")}),Q.addEventListener("change",()=>{Q.checked&&(O.manifestSource="online")}),le.addEventListener("change",()=>{O.verboseLogging=le.checked});for(const[T,H]of X.entries())H.addEventListener("change",()=>{if(Array.from(X.entries()).filter(([,se])=>se.checked).map(([se])=>se).length===0&&!O.lockedScaleId){H.checked=!0;return}O.hiddenScaleIds=Array.from(X.keys()).filter(se=>{var ie;return!((ie=X.get(se))!=null&&ie.checked)&&se!==O.lockedScaleId}),re()}),T===O.lockedScaleId&&(H.disabled=!0);D(e.initialView??"parameters"),re();function D(T){o.dataset.view=T,T==="parameters"?(u.textContent=e.simClass.label,f.textContent="Shape Your Simulation",p.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready."):T==="settings"?(u.textContent="Interface",f.textContent="Adjust The Control Room",p.textContent="Change the interface theme and manage exhibit-level options for this installation."):(u.textContent="References",f.textContent="Project Sources And Attribution",p.textContent="Review the datasets, imagery, and supporting materials behind this experience."),T==="settings"?C.textContent="Apply":T==="credits"?C.textContent="Close":C.textContent="Run Simulation"}function re(){x.value=O.lockedScaleId??"",W.checked=O.manifestSource==="local",Q.checked=O.manifestSource==="online",le.checked=O.verboseLogging;for(const[T,H]of X.entries()){const j=O.lockedScaleId===T;H.checked=j||!O.hiddenScaleIds.includes(T),H.disabled=j}}function Re(){if(v.value!==Yr){L.textContent="Incorrect password";return}v.value="",L.textContent="",ue("open")}function ue(T){q=T,_.dataset.state=T,I.textContent=T==="open"?"Hide Advanced Settings":"Advanced Settings",T!=="auth"&&(L.textContent="")}function _e(){v.value="",L.textContent="",ue("closed")}function xe(){O=pt(e.advancedSettings),re()}return C.addEventListener("click",()=>{const T=o.dataset.view;if(T==="settings"){e.onApplySettings(pt(O));return}if(T==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),xe(),_e()},setSimulation(T,H){e.simClass=T,a.dataset.simClass=T.id,U.setSimClass(T,H),r.src=T.placeholderImage,r.alt=`${T.label} preview`,o.dataset.view==="parameters"&&D("parameters")},setTheme(T){ve.setActive(T)},setView(T){D(T),T!=="settings"&&_e()},setAdvancedSettings(T){e.advancedSettings=pt(T),O=pt(T),re(),_e()}}}function pt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function Xr(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=An,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let c=[],l=0;function u(){for(const b of c)window.clearTimeout(b);c=[]}function f(b,d){return new Promise(g=>{const y=window.setTimeout(()=>{d===l&&g()},Math.max(0,b));c.push(y)})}async function p(b,d){const g=document.createElement("div");g.className="terminal__line";const y=m();g.appendChild(y),o.appendChild(g);for(let _=0;_<b.length;_+=1){if(d!==l)return;const I=b[_];g.insertBefore(document.createTextNode(I),y),o.scrollTop=o.scrollHeight,await f(e,d)}y.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,d,g,y){u(),l+=1;const _=l;i.hidden=!1,i.classList.remove("is-hidden");const I=performance.now(),E=(y==null?void 0:y.minTerminalTimeMs)??t;let v=!g,k=[...b];g&&g.then(()=>{v=!0});let L=0;for(;_===l;){k.length===0&&(k=[...b]);const A=Math.floor(Math.random()*k.length),[x]=k.splice(A,1),V=`${bs(L)} ${x.text}`;if(L+=1,await p(V,_),_!==l)return;if(performance.now()-I>=E&&v)break}if(_!==l)return;const S=document.createElement("div");S.className="terminal__line terminal__line--syncing",S.textContent=`${bs(L)} STARTING SIMULATION...`,o.appendChild(S),o.scrollTop=o.scrollHeight,await f(s,_),_===l&&d()},hide(){u(),l+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function bs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${bn(t)}:${bn(s)}:${bn(i)}]`}function bn(n){return String(n).padStart(2,"0")}function Zr(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var f;l(),document.fullscreenElement?document.exitFullscreen():(f=document.getElementById("app"))==null||f.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const f=r.querySelector(".display-menu__item-label");f&&(f.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",f=>{n.contains(f.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(f,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${f}</span>
    `,m.addEventListener("click",p),m}function l(){n.classList.remove("open")}function u(f){a.hidden=!f,a.classList.toggle("is-hidden",!f)}}const eo=`# Initialization terminal script for the Planetary simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_EARTH :: loading continental crusts with maximal volcanic activity'
- 'INIT_EARTH :: breaking up Pangea, just to be annoying for future intercontinental travel'
- 'INIT_EARTH :: giving Earth oceans, tectonics, and just enough existential risk'
- 'INIT_EARTH :: assembling a respectable planet to immediately hit with something'
- 'INIT_EARTH :: checking that the mantle is molten enough to be dramatic'
- 'INIT_IMPACTOR :: selecting one large rock with terrible intentions'
- 'INIT_IMPACTOR :: solving for a collision nobody involved will enjoy'
- 'INIT_IMPACTOR :: setting up proto-planet pinball'
- 'INIT_IMPACTOR :: checking if catastrophic failure counts as satellite formation'
- 'INIT_MATERIAL :: solving problems in multi-material simulations just to slam things together'
- 'INIT_MATERIAL :: does it matter what its made of if it''s about to be a molten mess?'
- 'INIT_MATERIAL :: training equations of state to survive a bad day'
- 'INIT_ORBIT :: aligning the crosshairs with Earth'
- 'INIT_ORBIT :: emulating Moonfall, Hollywood''s finest achievement'
- 'INIT_ORBIT :: turning orbital mechanics into a countdown to regret'
- 'INIT_ORBIT :: fine-tuning impact angle for maximum moon-making potential'
- 'INIT_ORBIT :: checking that all trajectories intersect in the least peaceful way possible'
- 'PREPARE_COMP :: filling RAM to the brim'
- 'PREPARE_COMP :: funding a bigger supercomputer'
- 'PREPARE_COMP :: making computer go brrr'
- 'PREPARE_COMP :: solving the three-body problem (ish)'
- 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
- 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
- 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- 'VISUAL_PIPELINE :: taking artistic license with Earth''s surface'
- 'VISUAL_PIPELINE :: making sure the impact looks suitably apocalyptic'
- 'VISUAL_PIPELINE :: colour-grading the magma to something tastefully catastrophic'
- 'VISUAL_PIPELINE :: rendering one heroic plume of molten bad decisions'
- 'VISUAL_PIPELINE :: making planetary destruction look oddly publication-ready'
`,to=`# Initialization terminal script for the Galaxy simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_STELLAR_POP :: spiralling arms into existence'
- 'INIT_STELLAR_POP :: merging via hierarchical assembly'
- 'INIT_STELLAR_POP :: assembling a galaxy one mildly unstable stellar population at a time'
- 'INIT_STELLAR_POP :: ending runaway star formation for good with supernovae'
- 'INIT_STELLAR_POP :: blowing gas back out before the stars get any ideas'
- 'INIT_STELLAR_POP :: weaponising stellar evolution against future stellar evolution'
- 'INIT_BLACK_HOLE :: regulating self-regulation mechanisms'
- 'INIT_BLACK_HOLE :: placing one supermassive liability at the galactic center'
- 'INIT_BLACK_HOLE :: ramping up x-rays from the accretion disk'
- 'INIT_BLACK_HOLE :: allowing the core to consume matter with professional focus'
- 'INIT_BLACK_HOLE :: giving supermassive black holes galaxy killing powers'
- 'INIT_GAS :: threading cold flows through a halo with dubious boundaries'
- 'INIT_GAS :: reminding baryons they are not actually collisionless'
- 'INIT_GAS :: letting the interstellar medium become everybody''s problem'
- 'INIT_HALO :: wrapping the visible galaxy in a dark matter support group'
- 'INIT_HALO :: shaping the invisible mass budget into something rotationally persuasive'
- 'INIT_HALO :: hiding most of the mass where telescopes will complain about it'
- 'PREPARE_COMP :: filling RAM to the brim'
- 'PREPARE_COMP :: funding a bigger supercomputer'
- 'PREPARE_COMP :: making computer go brrr'
- 'PREPARE_COMP :: solving the three-body problem (ish)'
- 'PREPARE_COMP :: optimising for oddly specific hardware configurations that may not exist in 2 years'
- 'PREPARE_COMP :: asking the AI overlords to stop using our hardware for cryptocurrency mining'
- 'PREPARE_COMP :: spending bitcoin before the bubble bursts'
- 'PREPARE_COMP :: making time run 10 quadrillion times faster'
- 'VISUAL_PIPELINE :: rendering dust lanes to look like Andromeda'
- 'VISUAL_PIPELINE :: asking Micheal Bay for advice on rendering explosions'
- 'VISUAL_PIPELINE :: making the spiral arms look just unstable enough to be believable'
- 'VISUAL_PIPELINE :: painting nebulae with suspiciously cinematic restraint'
- 'VISUAL_PIPELINE :: counting photons until the galaxy agrees to be beautiful'
`,no=`# Initialization terminal script for the Cosmos simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_PHYSICAL_LAWS :: fixing the speed of light'
- 'INIT_PHYSICAL_LAWS :: finding the planck scale and trying not to look directly at it'
- 'INIT_PHYSICAL_LAWS :: removing sanity from quantum mechanics'
- 'INIT_PHYSICAL_LAWS :: bending spacetime to eventually drop apples'
- 'INIT_PHYSICAL_LAWS :: making the cosmological constant small but nonzero, just to mess with everyone'
- 'INIT_PHYSICAL_LAWS :: making time run 10 quadrillion times faster'
- 'INIT_COSMOS :: finding the edge of the observable universe, give or take a few billion light-years'
- 'INIT_COSMOS :: hiding dark matter''s origin'
- 'INIT_COSMOS :: leaving inflation as an exercise for the reader'
- 'INIT_MATTER :: taking away photon masses'
- 'INIT_MATTER :: charging protons to their full potential'
- 'INIT_MATTER :: holding nuclei together with neutrons and a prayer (i.e. the strong force)'
- 'INIT_MATTER :: making neutrino masses confusing'
- 'INIT_MATTER :: coupling to the Higgs field to fund the LHC'
- 'INIT_DENSITY_FIELD :: ironing out spacetime variations'
- 'INIT_DENSITY_FIELD :: forming primordial black holes (or are we?)'
- 'INIT_DENSITY_FIELD :: generalising most elements as metals'
- 'INIT_DENSITY_FIELD :: adding astrophysicists with a few good questions about inflation'
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
`,so={planetary:eo,galaxy:to,cosmos:no};function io(n){return Oe(so[n.id]).map(t=>({text:t}))}function ao(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function ro(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=Oe(t),i=Xe(s.wallclockSeconds),a=Xe(s.computeUsed),r=Xe(s.memoryUsed),o=Xe(s.carbonBurnt),c=Xe(s.particlesUpdated),l=await oo(n),u=co(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function oo(n){try{const e=await fetch(lo(n));if(!e.ok)return{};const t=await e.text(),s=Oe(t);return uo(s)}catch{return{}}}function lo(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function Xe(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function co(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function uo(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=Xe(s);i!==null&&(e[t]=i)}return e}const pi="[UniverseEngine]",fo=["planetary","galaxy","cosmos"];function gi(){return hi(fo).verboseLogging}function ae(n,e){gi()&&console.info(pi,n,e??"")}function Ce(n,e){gi()&&console.warn(pi,n,e??"")}const ho={local:"assets/local-manifest.json",online:Nr};function mo(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,ae("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await bi(e,t)},async findNearestVideo(s,i,a){const r=await go(e,t,s,i,a);if(r)return r;const o=yi(s);return Ce("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:po(s),summaryUrl:ao(o)}}}}function yi(n){switch(n){case"planetary":return Z("assets/planet_test.mp4");case"galaxy":return Z("assets/galaxy_test.mp4");case"cosmos":return Z("assets/cosmo_test.mp4");default:return Z("assets/galaxy_test.mp4")}}function po(n){switch(n){case"planetary":return Z("assets/planet_test_planetary_stats.csv");case"galaxy":return Z("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return Z("assets/cosmo_test_cosmos_stats.csv");default:return Z("assets/galaxy_test_galaxy_stats.csv")}}async function bi(n,e){const t=e.get(n);if(t)return t;const s=ho[n],i=fetch(Z(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ae("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(Ce("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function go(n,e,t,s,i){const r=(await bi(n,e)).runs.filter(f=>f.simulationId===t);if(r.length===0)return Ce("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=ws(o,s,i);for(const f of r.slice(1)){const p=ws(f,s,i);p<c&&(o=f,c=p)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(ae("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:Z(u),liveDataUrl:Z(o.liveDataPath),summaryUrl:Z(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([f,p])=>[f,Z(p)]))}):null}function ws(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Ft={mode:"time",frames:[]};async function yo(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return vo(t)}function bo(n,e,t=0){if(n.mode==="row")return _o(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=wo(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],c=(e-r.t)/Math.max(o.t-r.t,1e-9);return So(r.values,o.values,c)}function wo(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function vo(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Ft;const t=wn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=wn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=wn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function _o(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function wn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function So(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=ko(u);continue}i[a]=t<.5?r:o}return i}function ko(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Eo(n){Io(Ar,n)}function Io(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ae("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ae("Run selection tracked",{simulationId:e.simulationId}):Ce("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Ce("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const vs=50*1024*1024,Lo=8,No=6e3,Ao=8e3,To=5e3,Co=1200,Mo=100,vn={galaxy:"tron",planetary:"matrix",cosmos:"nostromo"};function Oo(n){const e=Qe.map(h=>h.id);let t=hi(e),s=Qn(t);const i=mo(t.manifestSource);t.manifestSource==="online"&&i.preloadActiveManifest();let a=Xn(t.lockedScaleId)??s[0]??Qe[0],r=t.lockedScaleId?vn[a.id]:ir(),o=!1,c=null,l=null,u=0,f=Ft,p=!1;const m=Object.fromEntries(Qe.map(h=>[h.id,Ti(h)]));mn(r);const b=yi(a.id),d=or(n,b),g=document.createElement("div");g.className="display-chrome",g.classList.add("is-hidden"),n.appendChild(g);const y=document.createElement("div");y.className="orientation-overlay",y.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(y);const _=document.createElement("div");_.className="swift-logo",_.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Z("assets/credits/swift-logo.png")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(_);const I=document.createElement("div");I.className="synth-logo is-hidden",I.innerHTML=`
    <img
      class="synth-logo__image"
      src="${Z("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(I);const E=document.createElement("img");E.className="app-partner-logo",E.src=Z("assets/dirac-hpc-white.webp"),E.alt="DIRAC HPC",E.decoding="async",n.appendChild(E);const v=document.createElement("div");v.className="display-chrome__top-left is-hidden",n.appendChild(v);const k=Zr(v,{onHome(){nn()},onViewSelected(h){if(h==="credits"){At("credits");return}At(h)},showHome:!t.lockedScaleId}),L=document.createElement("div");L.className="display-chrome__left-center",g.appendChild(L);const S=Ur(L,{onSelect(h){zn(h)},onInfo(h,w,M){x.textContent=w,V.textContent=M,A.classList.add("is-visible")}}),A=document.createElement("div");A.className="view-info-overlay",A.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(A);const x=A.querySelector(".view-info-overlay__title"),V=A.querySelector(".view-info-overlay__text"),B=A.querySelector(".view-info-overlay__close");A.addEventListener("click",h=>{h.target===A&&A.classList.remove("is-visible")}),B.addEventListener("click",()=>{A.classList.remove("is-visible")});const $=document.createElement("div");$.className="display-chrome__top-center is-hidden",g.appendChild($);const W=document.createElement("div");W.className="display-chrome__top-right",g.appendChild(W);const ee=fr(W),Q=document.createElement("div");Q.className="display-chrome__center-status",Q.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,g.appendChild(Q);const oe="universe-engine-playback-speed",le=()=>{const h=localStorage.getItem(oe),w=h?Number(h):NaN;return[.25,.5,1,2].includes(w)?w:1},ge=h=>{localStorage.setItem(oe,String(h))},ce=le();d.setPlaybackRate(ce);const ne=document.createElement("div");ne.className="display-chrome__bottom",g.appendChild(ne);const X=cr(ne,{onChange(h){ve(h)},onTogglePlay:Jn,onSpeedChange:ki,onScrubStart(){xe(),U()},onScrubEnd(){T(),d.isPaused()||q()},initialSpeed:ce});X.setPlaying(!d.isPaused());let te=null,F=null,G=null,N=!1,C=null,O=0;function q(){if(te!==null)return;function h(){const w=d.getPlaybackFraction();X.setPosition(w),d.isPaused()?te=null:te=requestAnimationFrame(h)}te=requestAnimationFrame(h)}function U(){te!==null&&(cancelAnimationFrame(te),te=null)}function ve(h){F=h,G===null&&(G=requestAnimationFrame(()=>{if(G=null,F===null)return;const w=F;F=null,d.seekToFraction(w)}))}function D(){if(F===null)return;G!==null&&(cancelAnimationFrame(G),G=null);const h=F;F=null,d.seekToFraction(h)}function re(){C!==null&&(window.clearTimeout(C),C=null)}function Re(){if(!(l!=null&&l.views))return[];const h=Ye(a,l);return Object.entries(l.views).filter(([w])=>w!==h).map(([,w])=>w).filter(Boolean)}function ue(){re(),d.suspendPrewarming()}function _e(h=Co){re(),!(N||d.isPaused())&&(C=window.setTimeout(()=>{C=null,!(N||d.isPaused())&&(d.resumePrewarming(),d.prewarmSources(Re()))},Math.max(0,h)))}function xe(){N=!0,O=0,ue()}function T(){N=!1,O=0,D(),u=d.getPlaybackFraction()*d.getDurationSeconds(),He(u),_e()}d.onPlayStateChange(h=>{X.setPlaying(!h),h?(U(),ue()):(q(),_e(0))}),d.onTimeUpdate(h=>{if(u=h*d.getDurationSeconds(),N){const w=performance.now();if(w-O<Mo)return;O=w}He(u)});const H=document.createElement("div");H.className="overlay-layer",n.appendChild(H);const j=Br(H,{onReplay:Si,onParameters:()=>At("parameters"),onHome:nn,showHome:!t.lockedScaleId});d.onEnded(()=>{o=!0;const h=d.captureFrame();j.update(a,ke(),d.getDurationSeconds(),c,h),j.show()});const se=br(H,s,h=>{Yn(h),At("parameters")}),ie=Qr(H,{simClass:a,values:ke(),theme:r,advancedSettings:t,availableScales:Qe,onValuesChange:wi,onThemeChange:tn,onRun:()=>{ae("Parameters submitted — starting run",{simClassId:a.id}),Ei().catch(h=>{Ce("Run failed to start",{simClassId:a.id,error:h instanceof Error?h.message:String(h)})})},onApplySettings:vi,onClose:_i,initialView:"parameters"}),Xt=Xr(H);X.setPosition(0),He(),j.hide();const Fe=new WeakMap,Se=h=>{const w=Fe.get(h);w&&(clearTimeout(w),Fe.delete(h)),h.classList.remove("side-collapsed")},Be=h=>{const w=Fe.get(h);w&&clearTimeout(w),Fe.set(h,setTimeout(()=>{h.classList.add("side-collapsed"),Fe.delete(h)},2500))},Zt=h=>{const w=Fe.get(h);w&&(clearTimeout(w),Fe.delete(h)),h.classList.add("side-collapsed")},en=(h,w)=>{const M=w.isCollapsible??(()=>!0);h.addEventListener("mouseenter",()=>Se(h)),h.addEventListener("mouseleave",()=>{if(!M()){Se(h);return}Be(h)}),h.addEventListener("focusin",()=>Se(h)),h.addEventListener("focusout",R=>{if(!h.contains(R.relatedTarget)){if(!M()){Se(h);return}Be(h)}}),h.addEventListener("click",()=>{if(!M()){Se(h);return}if(h.classList.contains("side-collapsed")){Se(h),Be(h);return}w.toggleOnClick?Zt(h):Be(h)}),M()?Zt(h):Se(h)};en(v,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),en(L,{toggleOnClick:!0}),en(ne,{toggleOnClick:!1});let dt=0,Ge=null,Nt=0;const Wn=()=>{Ge!==null&&(cancelAnimationFrame(Ge),Ge=null)},Gn=()=>{if(Ge!==null)return;Nt=d.getPlaybackFraction();const h=()=>{if(dt===0){Wn();return}const M=12*(1/60)/Math.max(d.getDurationSeconds(),1);Nt=Math.max(0,Math.min(1,Nt+dt*M)),d.seekToFraction(Nt),Ge=requestAnimationFrame(h)};Ge=requestAnimationFrame(h)};document.addEventListener("keydown",h=>{if(n.dataset.mode==="display"&&!(h.target instanceof HTMLInputElement||h.target instanceof HTMLTextAreaElement))switch(h.key){case"Escape":h.preventDefault(),A.classList.contains("is-visible")?A.classList.remove("is-visible"):nn();break;case" ":h.preventDefault(),Jn();break;case"ArrowLeft":h.preventDefault(),Se(ne),Be(ne),dt=-1,Gn();break;case"ArrowRight":h.preventDefault(),Se(ne),Be(ne),dt=1,Gn();break;case"ArrowUp":case"ArrowDown":{if(h.preventDefault(),Se(L),Be(L),!(l!=null&&l.views)||Object.keys(l.views).length<=1)break;const w=a.views.filter(me=>{var pe;return((pe=l==null?void 0:l.views)==null?void 0:pe[me.id])!==void 0});if(w.length<=1)break;const M=l.viewId??Ye(a,l),R=w.findIndex(me=>me.id===M),Ee=h.key==="ArrowUp"?(R-1+w.length)%w.length:(R+1)%w.length;zn(w[Ee].id);break}}}),document.addEventListener("keyup",h=>{(h.key==="ArrowLeft"||h.key==="ArrowRight")&&(dt=0,Wn())}),d.hideMedia(),d.pause(),Ve(t.lockedScaleId?"config":"entry");function Yn(h){h.id===a.id&&p||(a=h,rn(),tn(vn[h.id]),ie.setSimulation(a,ke()),X.setPosition(0),He(),an(),sn())}function wi(h){m[a.id]={...h},ae("Parameter values updated",{simClassId:a.id,values:m[a.id]}),He()}function tn(h){r=h,mn(h),ie.setTheme(h)}function At(h){h==="parameters"&&ie.setSimulation(a,ke()),ie.setView(h),Ve("config")}function vi(h){if(Fi(h),p){j.hide(),Ve("display");return}ie.setSimulation(a,ke()),ie.setView("parameters")}function _i(){if(j.hide(),!p&&t.lockedScaleId){ie.setSimulation(a,ke()),ie.setView("parameters");return}Ve(p?"display":"entry")}function nn(){t.lockedScaleId||(ae("Returning to home screen",{simClassId:a.id}),rn(),p=!1,d.hideMedia(),Ve("entry"))}function Si(){o=!1,j.hide(),d.resetPlayback(),d.play().catch(()=>{d.setMuted(!0),d.play()})}function Jn(){d.isPaused()?d.play().catch(()=>{d.setMuted(!0),d.play()}):d.pause()}function ki(h){d.setPlaybackRate(h),ge(h),X.setSpeed(h)}async function Ei(){const h=ke();ae("Run requested",{simClassId:a.id,values:h,manifestSource:i.getSource()});const w=await i.findNearestVideo(a.id,a.parameters,h);rn(),l=w;const M=Ye(a,w);Eo({simulationId:a.id,parameters:h,manifestSource:i.getSource(),matchedRunId:w.runId});const R=$i(w,M)??w.url,Ee=Object.entries(w.views??{}).filter(([de])=>de!==M).map(([,de])=>de);Mi(w.liveDataUrl),Oi(w.summaryUrl),d.setMuted(!1),an(M),Ve("initializing");const me=Ii(R);d.resumePrewarming(),d.prewarmSources(Ee);const pe=(async()=>{const de=await me;ae(`Prepared active video source: ${de.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:R,waitsForBuffer:de.shouldWaitForBuffer}),d.setSource(de.src,{ownedObjectUrl:de.ownedObjectUrl}),d.pause(),await d.waitForLoadedData(Ao),de.shouldWaitForBuffer&&await d.waitForBufferedAhead(Lo,No)})();await new Promise(de=>{Xt.show(io(a),de,pe,{minTerminalTimeMs:Ri()})}),p=!0,d.showMedia(),d.play().catch(()=>{d.setMuted(!0),d.play().catch(()=>{})}),Ve("display")}async function Ii(h){const w=await Li(h);if(w!==null&&w>0&&w<=vs){ae("Downloading active video behind loading overlay",{videoUrl:h,contentLength:w});try{const M=await fetch(h);if(!M.ok)throw new Error(`Failed to download active video: ${h}`);const R=await M.blob();return ae(`Active video full fetch complete: ${R.size} bytes`,{videoUrl:h,blobType:R.type}),{src:URL.createObjectURL(R),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(M){Ce(`Full-fetch FAILED; falling back to progressive: ${M instanceof Error?M.message:String(M)}`,{videoUrl:h})}}return w!==null?ae("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:h,contentLength:w,fullFetchMaxBytes:vs}):ae("Could not determine active video size; using progressive load",{videoUrl:h}),ae("Using progressive active video load",{videoUrl:h}),{src:h,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function Li(h){try{const w=await fetch(h,{headers:{Range:"bytes=0-0"}});ae("Probed active video size with range request",{videoUrl:h,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const M=Ai(w.headers.get("Content-Length"));if(M!==null)return M;const R=Ni(w.headers.get("Content-Range"));return R!==null?R:null}catch(w){return Ce("Could not probe active video size",{videoUrl:h,error:w instanceof Error?w.message:String(w)}),null}}function Ni(h){if(!h)return null;const w=h.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const M=Number(w[1]);return Number.isFinite(M)&&M>0?M:null}function Ai(h){if(!h)return null;const w=Number(h);return Number.isFinite(w)?w:null}function Ve(h){if(n.dataset.mode=h,h==="entry"?document.documentElement.setAttribute("data-theme","glass"):h==="display"&&mn(r),ft(g,h==="display"||h==="config"),ft(_,h==="display"||h==="entry"),ft(v,!t.lockedScaleId&&(h==="entry"||h==="config"||h==="display")),h==="entry"?Se(v):Zt(v),h==="entry"&&!t.lockedScaleId?se.show():se.hide(),h==="config"?(Xt.hide(),ie.setSimulation(a,ke()),ie.show()):ie.hide(),h!=="display")j.hide();else if(o){const M=d.captureFrame();j.update(a,ke(),d.getDurationSeconds(),c,M),j.show()}!p||h==="initializing"?(d.hideMedia(),h==="initializing"&&d.pause()):d.showMedia(),h!=="initializing"&&Xt.hide(),sn()}function sn(){if(n.dataset.mode==="entry"){ft(I,!0);return}const h=n.dataset.mode==="display",w=a.id==="galaxy",R=Ye(a,l)==="hst";ft(I,h&&w&&R)}function He(h=0){const w=bo(f,h,d.getDurationSeconds()),M=Pi(a,c,h,d.getDurationSeconds());ee.update(a,ke(),{...w,...M})}function an(h){const w=a.views.filter(Ee=>{var me;return((me=l==null?void 0:l.views)==null?void 0:me[Ee.id])!==void 0});if(w.length<=1){S.hide(),$.classList.add("is-hidden");return}const M=h??Ye(a,l),R=w.find(Ee=>Ee.id===M);S.update(w,M),R?($.classList.remove("is-hidden"),$.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):$.classList.add("is-hidden")}function rn(){f=Ft,o=!1,c=null,l=null,u=0,N=!1,F=null,re(),G!==null&&(cancelAnimationFrame(G),G=null),j.hide(),S.hide(),d.pause(),d.clearPrewarmedSources(),d.resetPlayback(),X.setPosition(0)}function zn(h){if(!(l!=null&&l.views)||h===Ye(a,l))return;const w=l.views[h];if(!w)return;l.viewId=h;const M=!d.isPaused()&&!o,R=o?0:d.getPlaybackFraction();o=!1,j.hide(),d.setSource(w,{seekFraction:R,autoplay:M}),d.prewarmSources(Re()),M&&!N?_e():ue(),an(h),A.classList.remove("is-visible"),sn()}function ke(){return{...m[a.id]}}function Ti(h){return Object.fromEntries(h.parameters.map(w=>[w.id,Ci(w)]))}function Ci(h){if(h.logScale){const me=Math.log10(h.min),pe=Math.log10(h.max);return 10**(me+Math.random()*(pe-me))}const w=Math.max(0,Math.round((h.max-h.min)/h.step)),M=Math.floor(Math.random()*(w+1)),R=h.min+M*h.step,Ee=ri(h.step);return Number(R.toFixed(Ee))}async function Mi(h){try{f=await yo(h)}catch(w){f=Ft,Ce("Failed to load live stats",{url:h,error:w instanceof Error?w.message:String(w)})}He()}async function Oi(h){c=await ro(h),He(u)}function Pi(h,w,M,R){if(!w||!Number.isFinite(R)||R<=0)return{};const Ee=Math.max(0,Math.min(1,M/R)),me={};for(const pe of h.metadata.liveStats){if(!pe.live||!pe.fromVideo||!pe.scaleWithTime)continue;const on=pe.videoKey??pe.id,de=w[on];if(typeof de!="number"||!Number.isFinite(de))continue;const Zn=de*Ee;me[pe.id]=pe.integer?String(Math.floor(Zn)):String(Zn)}return me}function ft(h,w){h.hidden=!w,h.classList.toggle("is-hidden",!w)}function Ye(h,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function $i(h,w){return!w||!h.views?null:h.views[w]??null}function Qn(h){const w=new Set(zr(h,e));return Qe.filter(M=>w.has(M.id))}function Xn(h){return h?Qe.find(w=>w.id===h)??null:null}function Ri(){return i.getSource()!=="local"?An.MIN_TERMINAL_TIME_MS:xi(An.MIN_TERMINAL_TIME_MS,To)}function xi(h,w){const M=Math.ceil(Math.min(h,w)),R=Math.floor(Math.max(h,w));return Math.floor(Math.random()*(R-M+1))+M}function Fi(h){const w=a.id,M=t.manifestSource;t=Jr(h,e),s=Qn(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),k.setHomeVisible(!t.lockedScaleId),j.setHomeVisible(!t.lockedScaleId),se.setSimulationClasses(s),ie.setAdvancedSettings(t),ae("Advanced settings updated",t),M!==t.manifestSource&&(l=null);const R=Xn(t.lockedScaleId);R&&(Yn(R),R.id!==w&&(p=!1,d.hideMedia(),ie.setView("parameters")),p||(tn(vn[R.id]),ie.setSimulation(a,ke())))}}function Po(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Oo(n)}Po();
//# sourceMappingURL=index-bcBH46yI.js.map
