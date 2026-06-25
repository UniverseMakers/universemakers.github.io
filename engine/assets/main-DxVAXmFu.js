(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Yn=Symbol.for("yaml.alias"),Fn=Symbol.for("yaml.document"),je=Symbol.for("yaml.map"),Ks=Symbol.for("yaml.pair"),Pe=Symbol.for("yaml.scalar"),yt=Symbol.for("yaml.seq"),Ee=Symbol.for("yaml.node.type"),Ze=n=>!!n&&typeof n=="object"&&n[Ee]===Yn,an=n=>!!n&&typeof n=="object"&&n[Ee]===Fn,$t=n=>!!n&&typeof n=="object"&&n[Ee]===je,ee=n=>!!n&&typeof n=="object"&&n[Ee]===Ks,K=n=>!!n&&typeof n=="object"&&n[Ee]===Pe,xt=n=>!!n&&typeof n=="object"&&n[Ee]===yt;function X(n){if(n&&typeof n=="object")switch(n[Ee]){case je:case yt:return!0}return!1}function Z(n){if(n&&typeof n=="object")switch(n[Ee]){case Yn:case je:case Pe:case yt:return!0}return!1}const qs=n=>(K(n)||X(n))&&!!n.anchor,Ge=Symbol("break visit"),ga=Symbol("skip children"),Tt=Symbol("remove node");function bt(n,e){const t=ya(e);an(n)?ct(null,n.contents,t,Object.freeze([n]))===Tt&&(n.contents=null):ct(null,n,t,Object.freeze([]))}bt.BREAK=Ge;bt.SKIP=ga;bt.REMOVE=Tt;function ct(n,e,t,s){const i=ba(n,e,t,s);if(Z(i)||ee(i))return va(n,s,i),ct(n,i,t,s);if(typeof i!="symbol"){if(X(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=ct(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Ge)return Ge;r===Tt&&(e.items.splice(a,1),a-=1)}}}else if(ee(e)){s=Object.freeze(s.concat(e));const a=ct("key",e.key,t,s);if(a===Ge)return Ge;a===Tt&&(e.key=null);const r=ct("value",e.value,t,s);if(r===Ge)return Ge;r===Tt&&(e.value=null)}}return i}function ya(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function ba(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if($t(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(xt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ee(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(K(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(Ze(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function va(n,e,t){const s=e[e.length-1];if(X(s))s.items[n]=t;else if(ee(s))n==="key"?s.key=t:s.value=t;else if(an(s))s.contents=t;else{const i=Ze(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const wa={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},_a=n=>n.replace(/[!,[\]{}]/g,e=>wa[e]);class fe{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},fe.defaultYaml,e),this.tags=Object.assign({},fe.defaultTags,t)}clone(){const e=new fe(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new fe(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:fe.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},fe.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:fe.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},fe.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+_a(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&Z(e.contents)){const a={};bt(e.contents,(r,o)=>{Z(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}fe.defaultYaml={explicit:!1,version:"1.2"};fe.defaultTags={"!!":"tag:yaml.org,2002:"};function Ws(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Ys(n){const e=new Set;return bt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Gs(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Sa(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Ys(n));const r=Gs(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(K(r.node)||X(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function ut(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=ut(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=ut(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=ut(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=ut(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function ke(n,e,t){if(Array.isArray(n))return n.map((s,i)=>ke(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!qs(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class Gn{constructor(e){Object.defineProperty(this,Ee,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!an(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=ke(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?ut(a,{"":o},"",o):o}}class zn extends Gn{constructor(e){super(Yn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],bt(e,{Node:(a,r)=>{(Ze(r)||qs(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(ke(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=zt(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Ws(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function zt(n,e,t){if(Ze(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(X(e)){let s=0;for(const i of e.items){const a=zt(n,i,t);a>s&&(s=a)}return s}else if(ee(e)){const s=zt(n,e.key,t),i=zt(n,e.value,t);return Math.max(s,i)}return 1}const zs=n=>!n||typeof n!="function"&&typeof n!="object";class $ extends Gn{constructor(e){super(Pe),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:ke(this.value,e,t)}toString(){return String(this.value)}}$.BLOCK_FOLDED="BLOCK_FOLDED";$.BLOCK_LITERAL="BLOCK_LITERAL";$.PLAIN="PLAIN";$.QUOTE_DOUBLE="QUOTE_DOUBLE";$.QUOTE_SINGLE="QUOTE_SINGLE";const ka="tag:yaml.org,2002:";function Ea(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Ot(n,e,t){var f,p,m;if(an(n)&&(n=n.contents),Z(n))return n;if(ee(n)){const b=(p=(f=t.schema[je]).createNode)==null?void 0:p.call(f,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new zn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=ka+e.slice(2));let l=Ea(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new $(n);return c&&(c.node=b),b}l=n instanceof Map?r[je]:Symbol.iterator in Object(n)?r[yt]:r[je]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((m=l==null?void 0:l.nodeClass)==null?void 0:m.from)=="function"?l.nodeClass.from(t.schema,n,t):new $(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function Zt(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Ot(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Nt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Js extends Gn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>Z(s)||ee(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Nt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(X(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Zt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(X(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&K(a)?a.value:a:X(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ee(t))return!1;const s=t.value;return s==null||e&&K(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return X(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(X(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Zt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const La=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function xe(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const Je=(n,e,t)=>n.endsWith(`
`)?xe(t,e):t.includes(`
`)?`
`+xe(t,e):(n.endsWith(" ")?"":" ")+t,Qs="flow",Vn="block",Jt="quoted";function rn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):f=i-s);let p,m,b=!1,h=-1,g=-1,v=-1;t===Vn&&(h=bs(n,h,e.length),h!==-1&&(f=h+c));for(let I;I=n[h+=1];){if(t===Jt&&I==="\\"){switch(g=h,n[h+1]){case"x":h+=3;break;case"u":h+=5;break;case"U":h+=9;break;default:h+=1}v=h}if(I===`
`)t===Vn&&(h=bs(n,h,e.length)),f=h+e.length+c,p=void 0;else{if(I===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const _=n[h+1];_&&_!==" "&&_!==`
`&&_!=="	"&&(p=h)}if(h>=f)if(p)l.push(p),f=p+c,p=void 0;else if(t===Jt){for(;m===" "||m==="	";)m=I,I=n[h+=1],b=!0;const _=h>v+1?h-2:g-1;if(u[_])return n;l.push(_),u[_]=!0,f=_+c,p=void 0}else b=!0}m=I}if(b&&o&&o(),l.length===0)return n;r&&r();let k=n.slice(0,l[0]);for(let I=0;I<l.length;++I){const _=l[I],y=l[I+1]||n.length;_===0?k=`
${e}${n.slice(0,y)}`:(t===Jt&&u[_]&&(k+=`${n[_]}\\`),k+=`
${e}${n.slice(_+1,y)}`)}return k}function bs(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const on=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),ln=n=>/^(%|---|\.\.\.)/m.test(n);function Aa(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Mt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(ln(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:rn(r,a,Jt,on(e,!1))}function Un(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Mt(n,e);const t=e.indent||(ln(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:rn(s,t,Qs,on(e,!1))}function dt(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Mt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Un:a&&!i?s=Mt:s=t?Un:Mt}return s(n,e)}let Dn;try{Dn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Dn=/\n+(?!\n|$)/g}function Qt({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return dt(t,s);const l=s.indent||(s.forceBlockIndent||ln(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===$.BLOCK_FOLDED?!1:e===$.BLOCK_LITERAL?!0:!Aa(t,c,l.length);if(!t)return u?`|
`:`>
`;let f,p;for(p=t.length;p>0;--p){const y=t[p-1];if(y!==`
`&&y!=="	"&&y!==" ")break}let m=t.substring(p);const b=m.indexOf(`
`);b===-1?f="-":t===m||b!==m.length-1?(f="+",a&&a()):f="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(Dn,`$&${l}`));let h=!1,g,v=-1;for(g=0;g<t.length;++g){const y=t[g];if(y===" ")h=!0;else if(y===`
`)v=g;else break}let k=t.substring(0,v<g?v+1:g);k&&(t=t.substring(k.length),k=k.replace(/\n+/g,`$&${l}`));let _=(h?l?"2":"1":"")+f;if(n&&(_+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const y=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let S=!1;const L=on(s,!0);r!=="folded"&&e!==$.BLOCK_FOLDED&&(L.onOverflow=()=>{S=!0});const E=rn(`${k}${y}${m}`,l,Vn,L);if(!S)return`>${_}
${l}${E}`}return t=t.replace(/\n+/g,`$&${l}`),`|${_}
${l}${k}${t}${m}`}function Ia(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return dt(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?dt(a,e):Qt(n,e,t,s);if(!o&&!u&&i!==$.PLAIN&&a.includes(`
`))return Qt(n,e,t,s);if(ln(a)){if(c==="")return e.forceBlockIndent=!0,Qt(n,e,t,s);if(o&&c===l)return dt(a,e)}const f=a.replace(/\n+/g,`$&
${c}`);if(r){const p=h=>{var g;return h.default&&h.tag!=="tag:yaml.org,2002:str"&&((g=h.test)==null?void 0:g.test(f))},{compat:m,tags:b}=e.doc.schema;if(b.some(p)||m!=null&&m.some(p))return dt(a,e)}return o?f:rn(f,c,Qs,on(e,!1))}function Jn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==$.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=$.QUOTE_DOUBLE);const c=u=>{switch(u){case $.BLOCK_FOLDED:case $.BLOCK_LITERAL:return i||a?dt(r.value,e):Qt(r,e,t,s);case $.QUOTE_DOUBLE:return Mt(r.value,e);case $.QUOTE_SINGLE:return Un(r.value,e);case $.PLAIN:return Ia(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:f}=e.options,p=i&&u||f;if(l=c(p),l===null)throw new Error(`Unsupported default string type ${p}`)}return l}function Xs(n,e){const t=Object.assign({blockQuote:!0,commentString:La,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Na(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(K(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Ca(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(K(n)||X(n))&&n.anchor;a&&Ws(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function pt(n,e,t,s){var c;if(ee(n))return n.toString(e,t,s);if(Ze(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=Z(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=Na(e.doc.schema.tags,a));const r=Ca(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):K(a)?Jn(a,e,t,s):a.toString(e,t,s);return r?K(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ta({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:f}}=t;let p=Z(n)&&n.comment||null;if(f){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(X(n)||!Z(n)&&typeof n=="object"){const L="With simple keys, collection cannot be used as a key value";throw new Error(L)}}let m=!f&&(!n||p&&e==null&&!t.inFlow||X(n)||(K(n)?n.type===$.BLOCK_FOLDED||n.type===$.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(f||!a),indent:o+c});let b=!1,h=!1,g=pt(n,t,()=>b=!0,()=>h=!0);if(!m&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!f||e==null&&m)return g=`? ${g}`,p&&!b?g+=Je(g,t.indent,l(p)):h&&i&&i(),g;b&&(p=null),m?(p&&(g+=Je(g,t.indent,l(p))),g=`? ${g}
${o}:`):(g=`${g}:`,p&&(g+=Je(g,t.indent,l(p))));let v,k,I;Z(e)?(v=!!e.spaceBefore,k=e.commentBefore,I=e.comment):(v=!1,k=null,I=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&K(e)&&(t.indentAtStart=g.length+1),h=!1,!u&&c.length>=2&&!t.inFlow&&!m&&xt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let _=!1;const y=pt(e,t,()=>_=!0,()=>h=!0);let S=" ";if(p||v||k){if(S=v?`
`:"",k){const L=l(k);S+=`
${xe(L,t.indent)}`}y===""&&!t.inFlow?S===`
`&&I&&(S=`

`):S+=`
${t.indent}`}else if(!m&&X(e)){const L=y[0],E=y.indexOf(`
`),M=E!==-1,x=t.inFlow??e.flow??e.items.length===0;if(M||!x){let C=!1;if(M&&(L==="&"||L==="!")){let O=y.indexOf(" ");L==="&"&&O!==-1&&O<E&&y[O+1]==="!"&&(O=y.indexOf(" ",O+1)),(O===-1||E<O)&&(C=!0)}C||(S=`
${t.indent}`)}}else(y===""||y[0]===`
`)&&(S="");return g+=S+y,t.inFlow?_&&s&&s():I&&!_?g+=Je(g,t.indent,l(I)):h&&i&&i(),g}function Zs(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const jt="<<",Fe={identify:n=>n===jt||typeof n=="symbol"&&n.description===jt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new $(Symbol(jt)),{addToJSMap:ei}),stringify:()=>jt},Ma=(n,e)=>(Fe.identify(e)||K(e)&&(!e.type||e.type===$.PLAIN)&&Fe.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Fe.tag&&t.default));function ei(n,e,t){if(t=n&&Ze(t)?t.resolve(n.doc):t,xt(t))for(const s of t.items)kn(n,e,s);else if(Array.isArray(t))for(const s of t)kn(n,e,s);else kn(n,e,t)}function kn(n,e,t){const s=n&&Ze(t)?t.resolve(n.doc):t;if(!$t(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function ti(n,e,{key:t,value:s}){if(Z(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ma(n,t))ei(n,e,s);else{const i=ke(t,"",n);if(e instanceof Map)e.set(i,ke(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Oa(t,i,n),r=ke(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Oa(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Z(n)&&(t!=null&&t.doc)){const s=Xs(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),Zs(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Qn(n,e,t){const s=Ot(n,void 0,t),i=Ot(e,void 0,t);return new he(s,i)}class he{constructor(e,t=null){Object.defineProperty(this,Ee,{value:Ks}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return Z(t)&&(t=t.clone(e)),Z(s)&&(s=s.clone(e)),new he(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return ti(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ta(this,e,t,s):JSON.stringify(this)}}function ni(n,e,t){return(e.inFlow??n.flow?Ra:Pa)(n,e,t)}function Pa({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const p=[];for(let b=0;b<e.length;++b){const h=e[b];let g=null;if(Z(h))!f&&h.spaceBefore&&p.push(""),en(t,p,h.commentBefore,f),h.comment&&(g=h.comment);else if(ee(h)){const k=Z(h.key)?h.key:null;k&&(!f&&k.spaceBefore&&p.push(""),en(t,p,k.commentBefore,f))}f=!1;let v=pt(h,u,()=>g=null,()=>f=!0);g&&(v+=Je(v,a,l(g))),f&&g&&(f=!1),p.push(s+v)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let b=1;b<p.length;++b){const h=p[b];m+=h?`
${c}${h}`:`
`}}return n?(m+=`
`+xe(l(n),c),o&&o()):f&&r&&r(),m}function Ra({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const f=[];for(let b=0;b<n.length;++b){const h=n[b];let g=null;if(Z(h))h.spaceBefore&&f.push(""),en(e,f,h.commentBefore,!1),h.comment&&(g=h.comment);else if(ee(h)){const k=Z(h.key)?h.key:null;k&&(k.spaceBefore&&f.push(""),en(e,f,k.commentBefore,!1),k.comment&&(l=!0));const I=Z(h.value)?h.value:null;I?(I.comment&&(g=I.comment),I.commentBefore&&(l=!0)):h.value==null&&(k!=null&&k.comment)&&(g=k.comment)}g&&(l=!0);let v=pt(h,c,()=>g=null);l||(l=f.length>u||v.includes(`
`)),b<n.length-1?v+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=f.reduce((k,I)=>k+I.length+2,2)+(v.length+2)>e.options.lineWidth)),l&&(v+=",")),g&&(v+=Je(v,s,o(g))),f.push(v),u=f.length}const{start:p,end:m}=t;if(f.length===0)return p+m;if(!l){const b=f.reduce((h,g)=>h+g.length+2,2);l=e.options.lineWidth>0&&b>e.options.lineWidth}if(l){let b=p;for(const h of f)b+=h?`
${a}${i}${h}`:`
`;return`${b}
${i}${m}`}else return`${p}${r}${f.join(" ")}${r}${m}`}function en({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=xe(e(s),n);t.push(a.trimStart())}}function Qe(n,e){const t=K(e)?e.value:e;for(const s of n)if(ee(s)&&(s.key===e||s.key===t||K(s.key)&&s.key.value===t))return s}class Se extends Js{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(je,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(Qn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ee(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new he(e,e==null?void 0:e.value):s=new he(e.key,e.value);const i=Qe(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);K(i.value)&&zs(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=Qe(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=Qe(this.items,e),i=s==null?void 0:s.value;return(!t&&K(i)?i.value:i)??void 0}has(e){return!!Qe(this.items,e)}set(e,t){this.add(new he(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)ti(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ee(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ni(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const vt={collection:"map",default:!0,nodeClass:Se,tag:"tag:yaml.org,2002:map",resolve(n,e){return $t(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Se.from(n,e,t)};class Xe extends Js{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(yt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Kt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Kt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&K(i)?i.value:i}has(e){const t=Kt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Kt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];K(i)&&zs(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(ke(a,String(i++),t));return s}toString(e,t,s){return e?ni(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(Ot(o,void 0,s))}}return a}}function Kt(n){let e=K(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const wt={collection:"seq",default:!0,nodeClass:Xe,tag:"tag:yaml.org,2002:seq",resolve(n,e){return xt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Xe.from(n,e,t)},cn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),Jn(n,e,t,s)}},un={identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new $(null),stringify:({source:n},e)=>typeof n=="string"&&un.test.test(n)?n:e.options.nullStr},Xn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new $(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&Xn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Ce({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const si={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ce},ii={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ce(n)}},ai={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new $(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ce},dn=n=>typeof n=="bigint"||Number.isInteger(n),Zn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function ri(n,e,t){const{value:s}=n;return dn(s)&&s>=0?t+s.toString(e):Ce(n)}const oi={identify:n=>dn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Zn(n,2,8,t),stringify:n=>ri(n,8,"0o")},li={identify:dn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Zn(n,0,10,t),stringify:Ce},ci={identify:n=>dn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Zn(n,2,16,t),stringify:n=>ri(n,16,"0x")},$a=[vt,wt,cn,un,Xn,oi,li,ci,si,ii,ai];function vs(n){return typeof n=="bigint"||Number.isInteger(n)}const qt=({value:n})=>JSON.stringify(n),xa=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:qt},{identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:qt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:qt},{identify:vs,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>vs(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:qt}],Ba={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Fa=[vt,wt].concat(xa,Ba),es={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=$.BLOCK_LITERAL),e!==$.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let f=0,p=0;f<l;++f,p+=c)u[f]=o.substr(p,c);o=u.join(e===$.BLOCK_LITERAL?`
`:" ")}return Jn({comment:n,type:e,value:o},s,i,a)}};function ui(n,e){if(xt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ee(s)){if($t(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new he(new $(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ee(s)?s:new he(s)}}else e("Expected a sequence for this tag");return n}function di(n,e,t){const{replacer:s}=t,i=new Xe(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(Qn(o,c,t))}return i}const ts={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ui,createNode:di};class ht extends Xe{constructor(){super(),this.add=Se.prototype.add.bind(this),this.delete=Se.prototype.delete.bind(this),this.get=Se.prototype.get.bind(this),this.has=Se.prototype.has.bind(this),this.set=Se.prototype.set.bind(this),this.tag=ht.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ee(i)?(a=ke(i.key,"",t),r=ke(i.value,a,t)):a=ke(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=di(e,t,s),a=new this;return a.items=i.items,a}}ht.tag="tag:yaml.org,2002:omap";const ns={collection:"seq",identify:n=>n instanceof Map,nodeClass:ht,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=ui(n,e),s=[];for(const{key:i}of t.items)K(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new ht,t)},createNode:(n,e,t)=>ht.from(n,e,t)};function fi({value:n,source:e},t){return e&&(n?hi:mi).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const hi={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new $(!0),stringify:fi},mi={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new $(!1),stringify:fi},Va={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ce},Ua={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ce(n)}},Da={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new $(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Ce},Bt=n=>typeof n=="bigint"||Number.isInteger(n);function fn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function ss(n,e,t){const{value:s}=n;if(Bt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Ce(n)}const Ha={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>fn(n,2,2,t),stringify:n=>ss(n,2,"0b")},ja={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>fn(n,1,8,t),stringify:n=>ss(n,8,"0")},Ka={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>fn(n,0,10,t),stringify:Ce},qa={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>fn(n,2,16,t),stringify:n=>ss(n,16,"0x")};class mt extends Se{constructor(e){super(e),this.tag=mt.tag}add(e){let t;ee(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new he(e.key,null):t=new he(e,null),Qe(this.items,t.key)||this.items.push(t)}get(e,t){const s=Qe(this.items,e);return!t&&ee(s)?K(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=Qe(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new he(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(Qn(r,null,s));return a}}mt.tag="tag:yaml.org,2002:set";const is={collection:"map",identify:n=>n instanceof Set,nodeClass:mt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>mt.from(n,e,t),resolve(n,e){if($t(n)){if(n.hasAllNullValues(!0))return Object.assign(new mt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function as(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function pi(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Ce(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const gi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>as(n,t),stringify:pi},yi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>as(n,!1),stringify:pi},hn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(hn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let f=as(u,!1);Math.abs(f)<30&&(f*=60),l-=6e4*f}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},ws=[vt,wt,cn,un,hi,mi,Ha,ja,Ka,qa,Va,Ua,Da,es,Fe,ns,ts,is,gi,yi,hn],_s=new Map([["core",$a],["failsafe",[vt,wt,cn]],["json",Fa],["yaml11",ws],["yaml-1.1",ws]]),Ss={binary:es,bool:Xn,float:ai,floatExp:ii,floatNaN:si,floatTime:yi,int:li,intHex:ci,intOct:oi,intTime:gi,map:vt,merge:Fe,null:un,omap:ns,pairs:ts,seq:wt,set:is,timestamp:hn},Wa={"tag:yaml.org,2002:binary":es,"tag:yaml.org,2002:merge":Fe,"tag:yaml.org,2002:omap":ns,"tag:yaml.org,2002:pairs":ts,"tag:yaml.org,2002:set":is,"tag:yaml.org,2002:timestamp":hn};function En(n,e,t){const s=_s.get(e);if(s&&!n)return t&&!s.includes(Fe)?s.concat(Fe):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(_s.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Fe)),i.reduce((a,r)=>{const o=typeof r=="string"?Ss[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(Ss).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const Ya=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class rs{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?En(e,"compat"):e?En(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?Wa:{},this.tags=En(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,je,{value:vt}),Object.defineProperty(this,Pe,{value:cn}),Object.defineProperty(this,yt,{value:wt}),this.sortMapEntries=typeof r=="function"?r:r===!0?Ya:null}clone(){const e=Object.create(rs.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Ga(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Xs(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(xe(l,""))}let r=!1,o=null;if(n.contents){if(Z(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(xe(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=pt(n.contents,i,()=>o=null,l);o&&(u+=Je(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(pt(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(xe(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(xe(a(l),"")))}return t.join(`
`)+`
`}class mn{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Ee,{value:Fn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new fe({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(mn.prototype,{[Ee]:{value:Fn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=Z(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){at(this.contents)&&this.contents.add(e)}addIn(e,t){at(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Ys(this);e.anchor=!t||s.has(t)?Gs(t||"a",s):t}return new zn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=k=>typeof k=="number"||k instanceof String||k instanceof Number,v=t.filter(g).map(String);v.length>0&&(t=t.concat(v)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:f,setAnchors:p,sourceObjects:m}=Sa(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:f,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:m},h=Ot(e,u,b);return o&&X(h)&&(h.flow=!0),p(),h}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new he(i,a)}delete(e){return at(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Nt(e)?this.contents==null?!1:(this.contents=null,!0):at(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return X(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Nt(e)?!t&&K(this.contents)?this.contents.value:this.contents:X(this.contents)?this.contents.getIn(e,t):void 0}has(e){return X(this.contents)?this.contents.has(e):!1}hasIn(e){return Nt(e)?this.contents!==void 0:X(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Zt(this.schema,[e],t):at(this.contents)&&this.contents.set(e,t)}setIn(e,t){Nt(e)?this.contents=t:this.contents==null?this.contents=Zt(this.schema,Array.from(e),t):at(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new fe({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new fe({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new rs(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=ke(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?ut(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Ga(this,e)}}function at(n){if(X(n))return!0;throw new Error("Expected a YAML collection as document contents")}class bi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Ct extends bi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class za extends bi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const ks=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function gt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,f="",p="",m=!1,b=!1,h=null,g=null,v=null,k=null,I=null,_=null,y=null;for(const E of n)switch(b&&(E.type!=="space"&&E.type!=="newline"&&E.type!=="comma"&&a(E.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),h&&(l&&E.type!=="comment"&&E.type!=="newline"&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),h=null),E.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&E.source.includes("	")&&(h=E),u=!0;break;case"comment":{u||a(E,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const M=E.source.substring(1)||" ";f?f+=p+M:f=M,p="",l=!1;break}case"newline":l?f?f+=E.source:(!_||t!=="seq-item-ind")&&(c=!0):p+=E.source,l=!0,m=!0,(g||v)&&(k=E),u=!0;break;case"anchor":g&&a(E,"MULTIPLE_ANCHORS","A node can have at most one anchor"),E.source.endsWith(":")&&a(E.offset+E.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=E,y??(y=E.offset),l=!1,u=!1,b=!0;break;case"tag":{v&&a(E,"MULTIPLE_TAGS","A node can have at most one tag"),v=E,y??(y=E.offset),l=!1,u=!1,b=!0;break}case t:(g||v)&&a(E,"BAD_PROP_ORDER",`Anchors and tags must be after the ${E.source} indicator`),_&&a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.source} in ${e??"collection"}`),_=E,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&a(E,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=E,l=!1,u=!1;break}default:a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.type} token`),l=!1,u=!1}const S=n[n.length-1],L=S?S.offset+S.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),h&&(l&&h.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:_,spaceBefore:c,comment:f,hasNewline:m,anchor:g,tag:v,newlineAfterProp:k,end:L,start:y??L}}function Pt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Pt(e.key)||Pt(e.value))return!0}return!1;default:return!0}}function Hn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Pt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function vi(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||K(a)&&K(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Es="All mapping items must start at the same column";function Ja({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Se,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const f of s.items){const{start:p,key:m,sep:b,value:h}=f,g=gt(p,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),v=!g.found;if(v){if(m&&(m.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(c,"BAD_INDENT",Es)),!g.anchor&&!g.tag&&!b){l=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||Pt(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",Es);t.atKey=!0;const k=g.end,I=m?n(t,m,g,i):e(t,k,p,null,g,i);t.schema.compat&&Hn(s.indent,m,i),t.atKey=!1,vi(t,o.items,I)&&i(k,"DUPLICATE_KEY","Map keys must be unique");const _=gt(b??[],{indicator:"map-value-ind",next:h,offset:I.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(c=_.end,_.found){v&&((h==null?void 0:h.type)==="block-map"&&!_.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<_.found.offset-1024&&i(I.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const y=h?n(t,h,_,i):e(t,c,b,null,_,i);t.schema.compat&&Hn(s.indent,h,i),c=y.range[2];const S=new he(I,y);t.options.keepSourceTokens&&(S.srcToken=f),o.items.push(S)}else{v&&i(I.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),_.comment&&(I.comment?I.comment+=`
`+_.comment:I.comment=_.comment);const y=new he(I);t.options.keepSourceTokens&&(y.srcToken=f),o.items.push(y)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function Qa({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Xe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:f}of s.items){const p=gt(u,{indicator:"seq-item-ind",next:f,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||f)(f==null?void 0:f.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=p.end,p.comment&&(o.comment=p.comment);continue}const m=f?n(t,f,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&Hn(s.indent,f,i),c=m.range[2],o.items.push(m)}return o.range=[s.offset,c,l??c],o}function Ft(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const Ln="Block collections are not allowed within flow collections",An=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Xa({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?Se:Xe),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let v=0;v<s.items.length;++v){const k=s.items[v],{start:I,key:_,sep:y,value:S}=k,L=gt(I,{flow:o,indicator:"explicit-key-ind",next:_??(y==null?void 0:y[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!L.found){if(!L.anchor&&!L.tag&&!y&&!S){v===0&&L.comma?i(L.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):v<s.items.length-1&&i(L.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),L.comment&&(l.comment?l.comment+=`
`+L.comment:l.comment=L.comment),f=L.end;continue}!r&&t.options.strict&&Pt(_)&&i(_,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(v===0)L.comma&&i(L.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(L.comma||i(L.start,"MISSING_CHAR",`Missing , between ${o} items`),L.comment){let E="";e:for(const M of I)switch(M.type){case"comma":case"space":break;case"comment":E=M.source.substring(1);break e;default:break e}if(E){let M=l.items[l.items.length-1];ee(M)&&(M=M.value??M.key),M.comment?M.comment+=`
`+E:M.comment=E,L.comment=L.comment.substring(E.length+1)}}if(!r&&!y&&!L.found){const E=S?n(t,S,L,i):e(t,L.end,y,null,L,i);l.items.push(E),f=E.range[2],An(S)&&i(E.range,"BLOCK_IN_FLOW",Ln)}else{t.atKey=!0;const E=L.end,M=_?n(t,_,L,i):e(t,E,I,null,L,i);An(_)&&i(M.range,"BLOCK_IN_FLOW",Ln),t.atKey=!1;const x=gt(y??[],{flow:o,indicator:"map-value-ind",next:S,offset:M.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(x.found){if(!r&&!L.found&&t.options.strict){if(y)for(const F of y){if(F===x.found)break;if(F.type==="newline"){i(F,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}L.start<x.found.offset-1024&&i(x.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&((g=S.source)==null?void 0:g[0])===":"?i(S,"MISSING_CHAR",`Missing space after : in ${o}`):i(x.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const C=S?n(t,S,x,i):x.found?e(t,x.end,y,null,x,i):null;C?An(S)&&i(C.range,"BLOCK_IN_FLOW",Ln):x.comment&&(M.comment?M.comment+=`
`+x.comment:M.comment=x.comment);const O=new he(M,C);if(t.options.keepSourceTokens&&(O.srcToken=k),r){const F=l;vi(t,F.items,M)&&i(E,"DUPLICATE_KEY","Map keys must be unique"),F.items.push(O)}else{const F=new Se(t.schema);F.flow=!0,F.items.push(O);const G=(C??M).range;F.range=[M.range[0],G[1],G[2]],l.items.push(F)}f=C?C.range[2]:x.end}}const p=r?"}":"]",[m,...b]=s.end;let h=f;if((m==null?void 0:m.source)===p)h=m.offset+m.source.length;else{const v=o[0].toUpperCase()+o.substring(1),k=u?`${v} must end with a ${p}`:`${v} in block collection must be sufficiently indented and end with a ${p}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",k),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const v=Ft(b,h,t.options.strict,i);v.comment&&(l.comment?l.comment+=`
`+v.comment:l.comment=v.comment),l.range=[s.offset,h,v.offset]}else l.range=[s.offset,h,h];return l}function In(n,e,t,s,i,a){const r=t.type==="block-map"?Ja(n,e,t,s,a):t.type==="block-seq"?Qa(n,e,t,s,a):Xa(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function Za(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,h=m&&a?m.offset>a.offset?m:a:m??a;h&&(!b||b.offset<h.offset)&&i(h,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Se.tagName&&o==="map"||r===Xe.tagName&&o==="seq")return In(n,e,t,i,r);let c=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!c){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),c=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),In(n,e,t,i,r)}const l=In(n,e,t,i,r,c),u=((p=c.resolve)==null?void 0:p.call(c,l,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??l,f=Z(u)?u:new $(u);return f.range=l.range,f.tag=r,c!=null&&c.format&&(f.format=c.format),f}function er(n,e,t){const s=e.offset,i=tr(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?$.BLOCK_FOLDED:$.BLOCK_LITERAL,r=e.source?nr(e.source):[];let o=r.length;for(let h=r.length-1;h>=0;--h){const g=r[h][1];if(g===""||g==="\r")o=h;else break}if(o===0){const h=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:h,type:a,comment:i.comment,range:[s,g,g]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let h=0;h<o;++h){const[g,v]=r[h];if(v===""||v==="\r")i.indent===0&&g.length>c&&(c=g.length);else{g.length<c&&t(l+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=g.length),u=h,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=g.length+v.length+1}for(let h=r.length-1;h>=o;--h)r[h][0].length>c&&(o=h+1);let f="",p="",m=!1;for(let h=0;h<u;++h)f+=r[h][0].slice(c)+`
`;for(let h=u;h<o;++h){let[g,v]=r[h];l+=g.length+v.length+1;const k=v[v.length-1]==="\r";if(k&&(v=v.slice(0,-1)),v&&g.length<c){const _=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-v.length-(k?2:1),"BAD_INDENT",_),g=""}a===$.BLOCK_LITERAL?(f+=p+g.slice(c)+v,p=`
`):g.length>c||v[0]==="	"?(p===" "?p=`
`:!m&&p===`
`&&(p=`

`),f+=p+g.slice(c)+v,p=`
`,m=!0):v===""?p===`
`?f+=`
`:p=`
`:(f+=p+v,p=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let h=o;h<r.length;++h)f+=`
`+r[h][0].slice(c);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}const b=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,b,b]}}function tr({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:c===-1&&(c=n+p)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",f=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":l=!0;case"newline":f+=m.source.length;break;case"comment":t&&!l&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),f+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const h=m.source;h&&typeof h=="string"&&(f+=h.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function nr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function sr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(p,m,b)=>t(s+p,m,b);switch(i){case"scalar":o=$.PLAIN,c=ir(a,l);break;case"single-quoted-scalar":o=$.QUOTE_SINGLE,c=ar(a,l);break;case"double-quoted-scalar":o=$.QUOTE_DOUBLE,c=rr(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Ft(r,u,e,t);return{value:c,type:o,comment:f.comment,range:[s,u,f.offset]}}function ir(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),wi(n)}function ar(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),wi(n.slice(1,-1)).replace(/''/g,"'")}function wi(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function rr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=or(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=lr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=cr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function or(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const lr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function cr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function _i(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?er(n,e,s):sr(e,n.options.strict,s),c=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[Pe]:c?l=ur(n.schema,i,c,t,s):e.type==="scalar"?l=dr(n,i,e,s):l=n.schema[Pe];let u;try{const f=l.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=K(f)?f:new $(f)}catch(f){const p=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",p),u=new $(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function ur(n,e,t,s,i){var o;if(t==="!")return n[Pe];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Pe])}function dr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[Pe];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[Pe];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function fr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const hr={composeNode:Si,composeEmptyNode:os};function Si(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=mr(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=_i(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=Za(hr,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(f){const p=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return l??(l=os(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!K(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function os(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:fr(e,t,s),indent:-1,source:""},f=_i(n,u,o,l);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=c),f}function mr({options:n},{offset:e,source:t,end:s},i){const a=new zn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Ft(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function pr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new mn(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=gt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Si(l,i,u,r):os(l,u.end,s,null,u,r);const f=c.contents.range[2],p=Ft(a,f,!1,r);return p.comment&&(c.comment=p.comment),c.range=[t,f,p.offset],c}function Lt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ls(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class gr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Lt(t);a?this.warnings.push(new za(r,s,i)):this.errors.push(new Ct(r,s,i))},this.directives=new fe({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ls(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(X(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ee(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ls(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Lt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=pr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Ct(Lt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Ct(Lt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Ft(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Ct(Lt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new mn(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const ki="\uFEFF",Ei="",Li="",jn="";function yr(n){switch(n){case ki:return"byte-order-mark";case Ei:return"doc-mode";case Li:return"flow-error-end";case jn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ae(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const As=new Set("0123456789ABCDEFabcdef"),br=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Wt=new Set(",[]{}"),vr=new Set(` ,[]{}
\r	`),Nn=n=>!n||vr.has(n);class wr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ae(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===ki&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Ei,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ae(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ae(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ae(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Nn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ae(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Li,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Nn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ae(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ae(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield jn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ae(a)||e&&Wt.has(a))break;t=s}else if(Ae(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Wt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Wt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield jn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Nn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ae(t)||e&&Wt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ae(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(br.has(t))t=this.buffer[++e];else if(t==="%"&&As.has(this.buffer[e+1])&&As.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class _r{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function De(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Is(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ai(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Yt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function rt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Ns(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!De(e.start,"explicit-key-ind")&&!De(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ai(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Sr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new wr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=yr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Ns(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Is(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Is(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Yt(this.peek(2)),s=rt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(De(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ai(t.key)&&!De(t.sep,"newline")){const o=rt(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(De(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=rt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):De(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!De(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||De(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Yt(s),a=rt(i);Ns(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Yt(e),s=rt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Yt(e),s=rt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function kr(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new _r||null,prettyErrors:e}}function Er(n,e={}){const{lineCounter:t,prettyErrors:s}=kr(e),i=new Sr(t==null?void 0:t.addNewLine),a=new gr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Ct(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(ks(n,t)),r.warnings.forEach(ks(n,t))),r}function Ve(n,e,t){let s;const i=Er(n,t);if(!i)return null;if(i.warnings.forEach(a=>Zs(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Lr=`# Simulation family catalog source-of-truth.
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

galaxy:
  label: Galaxy
  placeholderImage: assets/galaxy_example.webp
  parameterSubtitle: Adjust the ingredients of a galaxy.  What does it take to grow a galaxy like our Milky Way?
  views:
    - id: hst
      label: Hubble Space Telescope
      icon: hubble-space-telescope
      audio: true
      description: See your galaxy as the Hubble Space Telescope would — a luminous swirl of billions of stars.  Brighter regions trace where the most stars were born while dark lanes mark the dust (complex molecules and tiny grains) that blocks starlight.
    - id: sph_plus_hst
      label: Large Scale Structure
      icon: large-scale-structure
      audio: true
      description: Zoom out to see the grand architecture of your galaxy — vast streams of gas funnelling in to sustain the galaxy's star formation along the hidden skeleton of dark matter that holds everything together.

cosmos:
  label: Cosmos
  placeholderImage: assets/cosmos_example.webp
  parameterSubtitle: Adjust the fundamental laws of the Universe and see how matter evolves from the beginning of time.  What parameters best explain the Universe we observe?
  views:
    - id: gas_density
      label: Gas Density
      icon: gas-density
      description: The density of gas in the Universe.  Gas collapses onto the cosmic web — the largest structure in the Universe as it cools and succumbs to gravity.  Bright knots are galaxy clusters and groups, the wispy threads are filaments of gas stretching between them, and the dark empty patches are vast cosmic voids separating them.
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
      description: Where stars live and die.  This view combines the light of stars with the heavy elements they forge — oxygen, carbon, iron — sprayed back into space by supernova explosions to seed the next generation of stars.
`,Ar=`# Parameter definitions for each simulation family.
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
    description: How big was the object that smashed into the young Earth?  A more massive impactor could spray out more debris — and perhaps a bigger Moon.
    unit: Earth masses
    min: 0.05
    max: 0.35
    step: 0.01
  impactor_velocity:
    label: Impact Speed
    description: How fast was the impactor travelling when it hit?  Faster collisions are more violent, ejecting more and hotter debris.
    unit: km/s
    min: 8.5
    max: 30
    step: 0.1
  impactor_angle:
    label: Impact Angle
    description: Was the impact head-on, or grazing at a high angle?  A direct hit blasts material straight out, while a sideswipe can spray the debris out into a disk, or even escape as a hit and run.
    unit: °
    min: 0
    max: 65
    step: 1

galaxy:
  stellar_mass:
    label: Stellar Mass
    description: How many stars did your galaxy make?  This ranges from tiny dwarf galaxies with barely any stars up to enormous systems twice the size of the Milky Way.
    unit: '×10¹⁰ solar masses'
    min: 0.1
    max: 20
    value_scale: 1.0e10
    display_unit: solar masses
    display_format: compact
    display_significant_figures: 3
  black_hole_mass:
    label: Black Hole Mass
    description: How heavy is the monster at the centre?  Every large galaxy harbours a supermassive black hole — this slider controls how big yours grew over cosmic time.
    unit: '×10⁶ solar masses'
    min: 0.1
    max: 250
    value_scale: 1.0e6
    display_unit: solar masses
    display_format: compact
    display_significant_figures: 3
  galaxy_age:
    label: Galaxy Age
    description: How old are the stars in your galaxy?  Older galaxies look redder and smoother, having had time to settle.  Younger ones are bluer, brighter, and more chaotic.
    unit: years
    min: 4
    max: 13.8
    value_scale: 1.0e9
    display_format: compact

cosmos:
  baryon_fraction:
    label: Baryon Fraction
    description: How much of the Universe is made of ordinary stuff — the atoms that form stars, planets, and you?  Turn this up and there's more gas to make galaxies; turn it down and dark matter dominates.
    unit: ''
    min: 0.10
    max: 4
    step: 0.01
    value_scale: 0.159
  black_hole_strength:
    label: Black Hole Strength
    description: How powerfully do black holes push back?  As gas spirals inward it heats to millions of degrees.  Some of that energy blasts back out as fierce winds or jets, shutting down star formation across entire galaxies.
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
    description: What if gravity were stronger — or weaker?  Turn it up and the cosmic web forms faster, pulling galaxies into tighter clumps.  Turn it down and the Universe stays smoother and emptier for longer.
    unit: m/s²
    min: 0.01
    max: 10
    step: 0.01
    value_scale: 9.81
    display_significant_figures: 2
    log_scale: true
`,Ir=`# Summary overlay display configuration for each simulation family.
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
    - id: runtime
      value: '--'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run.  Calculating how everything moves and affects each other takes a lot of work, even for a supercomputer!
    - id: carbonBurnt
      value: '--'
      unit: kg CO₂
      display_format: float
      precision: 2
      description: The carbon cost of running this simulation.  Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: '--'
      description: How much internal computing time and memory the simulation needed to crunch all that physics.  Shared across all the CPUs working together in the supercomputer.
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
    - id: runtime
      value: '--'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run.  Calculating how everything moves and affects each other takes a lot of work, even for a supercomputer!
    - id: carbonBurnt
      value: '--'
      unit: kg CO₂
      description: The carbon cost of running this simulation.  Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: '--'
      description: How much internal computing time and memory the simulation needed to crunch all that physics.  Shared across all the CPUs working together in the supercomputer.
  results:
    - id: stellar_mass
      label: Stellar mass
      target: 6.1
      value: '--'
      unit: Msun
      value_scale: 1.0e10
      display_format: compact
      precision: 3
      description: How many stars your galaxy managed to make.  Each solar mass is the weight of our own Sun.
    - id: black_hole_mass
      label: Black hole mass
      target: 4.3
      value: '--'
      unit: Msun
      value_scale: 1.0e6
      display_format: compact
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
    - id: galaxy_age
      label: Galaxy age
      target: 8.5
      value: '--'
      unit: yrs
      value_scale: 1.0e9
      description: How old the stars in your galaxy are on average.  Older galaxies look redder and smoother; younger ones are bluer and more chaotic.
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
      unit: kpc
      display_format: float
      precision: 2
      description: The size of your galaxy's star-lit disc from one edge to the other.
    - id: black_hole_mass_msun
      label: Black hole mass
      value: '--'
      unit: Msun
      display_format: compact
      precision: 3
      description: The monster at the centre — how massive your galaxy's central black hole grew.
  similarityScore:
    value: '--'

cosmos:
  resources:
    - id: runtime
      value: '--'
      unit: hours
      display_format: float
      precision: 2
      description: How long the simulation took to run.  Calculating how everything moves and affects each other takes a lot of work, even for a supercomputer!
    - id: carbonBurnt
      value: '--'
      unit: kg CO₂
      display_format: float
      precision: 2
      description: The carbon cost of running this simulation.  Roughly the same as the emissions from a short-haul flight.
    - id: computeUsed
      value: '--'
      description: How much internal computing time and memory the simulation needed to crunch all that physics.  Shared across all the CPUs working together in the supercomputer.
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
`,Nr=`# Live telemetry HUD display configuration for each simulation family.
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
`;function te(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Cr=Ve(Lr),Tr=Ve(Ar),Cs=Ve(Ir),Mr=Ve(Nr),ot=Object.entries(Cr).map(([n,e])=>{var r,o;const t=Or(Cs[n]),s=(((r=Cs[n])==null?void 0:r.results)??[]).map(Pr),i=((o=Mr[n])==null?void 0:o.liveStats)??[],a=Tr[n]??{};return{id:n,label:e.label,placeholderImage:te(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(Kn),liveStats:i.map(Kn)},parameters:Object.entries(a).map(([c,l])=>{const u=l.step??Rr(l.min,l.max),f=l.log_scale?Math.sqrt(l.min*l.max):$r(l.min,l.max);return{id:c,label:l.label,unit:l.unit??"",min:l.min,max:l.max,step:u,fallbackValue:f,description:l.description,valueScale:l.value_scale,displayUnit:l.display_unit,displayFormat:l.display_format,displaySignificantFigures:l.display_significant_figures,logScale:l.log_scale}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Or(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function Kn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Pr(n){return{...Kn(n),target:n.target}}function Rr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function $r(n,e){return n+(e-n)/2}const Ii="universe-engine-theme",Ni=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function xr(){const n=localStorage.getItem(Ii);return Fr(n)?n:"glass"}function Cn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Ii,n)}function Br(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Ni){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function Fr(n){return Ni.some(e=>e.id===n)}let oe=null,Ie="primary";function Vr(n,e=null){oe={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function Ts(){oe=null,Ie="primary"}function Ur(n){Ie=n}function Dr(n){return n==="local"?{mode:"local",base:null}:oe?{mode:Ie,base:Ci()}:{mode:"primary",base:null}}function Oe(n){if(!oe)return n;const e=Ci();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!Os(t,oe.primaryBase)&&(!oe.backupBase||!Os(t,oe.backupBase))?n:Ps(e,`${t.pathname}${t.search}${t.hash}`)}return Ps(e,n)}async function He(n,e){const t=Oe(n),s=!!(oe!=null&&oe.backupBase)&&Ie==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Ms(n,e);return a.ok&&(Ie="backup"),a}catch(i){if(!s)throw i;const a=await Ms(n,e);return a.ok&&(Ie="backup"),a}}function Ci(){return oe?Ie==="backup"&&oe.backupBase?oe.backupBase:oe.primaryBase:null}async function Ms(n,e){if(!(oe!=null&&oe.backupBase))throw new Error("Backup asset host is not configured.");const t=Ie;Ie="backup";try{const s=await fetch(Oe(n),e);return s.ok||(Ie=t),s}catch(s){throw Ie=t,s}}function Os(n,e){const t=new URL(e);return n.origin===t.origin}function Ps(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function Hr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,c=!1;const l=new Map,u=new Map,f=new Map;let p=null,m=null;const b=document.createElement("canvas"),h=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function v(){p&&(URL.revokeObjectURL(p),p=null)}function k(A,P={}){const U=u.get(A);U&&(u.delete(A),P={...P,ownedObjectUrl:!0},A=U),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(A)){s.classList.remove("fade-out");return}const V=s.muted,B=P.seekFraction;v(),m=null,p=P.ownedObjectUrl?A:null,s.src=A,s.load(),s.onloadeddata=()=>{if(s.muted=V,B!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const se=Math.max(0,Math.min(.999,B));s.currentTime=se*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),P.autoplay&&s.play().catch(()=>{})}},120)}function I(A){s.muted=A}async function _(){await s.play()}function y(){s.pause()}function S(){s.classList.add("is-empty")}function L(){s.classList.remove("is-empty")}function E(A){if(!Number.isFinite(s.duration)||s.duration<=0)return;const P=Math.max(0,Math.min(1,A));s.currentTime=P*s.duration}function M(){s.currentTime=0,i==null||i(0)}function x(A=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const U=()=>{B(),P()},V=window.setTimeout(()=>{B(),P()},Math.max(0,A));function B(){window.clearTimeout(V),s.removeEventListener("loadeddata",U)}s.addEventListener("loadeddata",U,{once:!0})})}function C(A,P=8e3){const U=Math.max(0,A);return U===0||O(U)?Promise.resolve():new Promise(V=>{const B=()=>{O(U)&&(j(),V())},se=window.setTimeout(()=>{j(),V()},Math.max(0,P));function j(){window.clearTimeout(se),s.removeEventListener("progress",B),s.removeEventListener("canplay",B),s.removeEventListener("loadeddata",B)}s.addEventListener("progress",B),s.addEventListener("canplay",B),s.addEventListener("loadeddata",B),B()})}function O(A){const P=s.currentTime;for(let U=0;U<s.buffered.length;U+=1){const V=s.buffered.start(U),B=s.buffered.end(U);if(!(P<V||P>B))return B-P>=A}return!1}function F(A){o=new Set(A.filter(Boolean).filter(P=>P!==s.currentSrc)),c||H()}function G(){c=!0,re(),ye()}function J(){if(!c){H();return}c=!1,H()}function H(){for(const[A,P]of l.entries())o.has(A)||(P.removeAttribute("src"),P.load(),l.delete(A));for(const[A,P]of f.entries())o.has(A)||(P.abort(),f.delete(A));for(const A of o){if(!l.has(A)){const P=document.createElement("video");P.preload="auto",P.muted=!0,P.playsInline=!0,P.src=Oe(A),P.load(),l.set(A,P)}u.has(A)||f.has(A)||me(A)}}function re(){for(const A of l.values())A.removeAttribute("src"),A.load();l.clear()}function ye(){for(const A of f.values())A.abort();f.clear()}function me(A){const P=new AbortController;f.set(A,P);const U=`${A}?_=${Date.now()}`;He(U,{signal:P.signal}).then(async V=>{if(!V.ok)return;const B=await V.blob();o.has(A)&&u.set(A,URL.createObjectURL(B))}).catch(V=>{V instanceof DOMException&&V.name}).finally(()=>{f.get(A)===P&&f.delete(A)})}function ne(){o.clear(),c=!1,re(),ye();for(const A of u.values())URL.revokeObjectURL(A);u.clear()}function le(A){return u.get(A)??null}function we(){!h||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(b.width=s.videoWidth,b.height=s.videoHeight,h.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85))}function ce(){return m||we(),m}function q(A){i=A}function z(A){a=A}return{setSource:k,setMuted:I,play:_,pause:y,hideMedia:S,showMedia:L,seekToFraction:E,resetPlayback:M,waitForLoadedData:x,waitForBufferedAhead:C,onTimeUpdate:q,onEnded:z,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:A=>{g=A,s.playbackRate=A},getPlaybackRate:()=>g,onPlayStateChange:A=>{r=A},getElement:()=>t,prewarmSources:F,suspendPrewarming:G,resumePrewarming:J,clearPrewarmedSources:ne,getPrewarmedBlobUrl:le,captureFrame:ce}}const jr=[.25,.5,1,2];function Kr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onAudioVolumeChange:o,onScrubStart:c,onScrubEnd:l,initialSpeed:u=1}=e,f=document.createElement("div");f.className="timeline";const p=document.createElement("div");p.className="timeline__bar-row";const m=document.createElement("button");m.className="timeline__play-btn",m.type="button",m.setAttribute("aria-label","Toggle playback"),m.addEventListener("click",()=>s==null?void 0:s());const b=document.createElement("div");b.className="timeline__audio is-hidden";const h=document.createElement("button");h.className="timeline__audio-btn",h.type="button",h.setAttribute("aria-label","Toggle audio mute");const g=document.createElement("div");g.className="timeline__audio-slider-wrap";const v=document.createElement("input");v.className="timeline__audio-slider",v.type="range",v.min="0",v.max="100",v.step="1",v.value="75",v.setAttribute("aria-label","Audio volume"),g.appendChild(v),b.appendChild(h),b.appendChild(g);let k=null,I=!1;h.addEventListener("pointerdown",()=>{k=window.setTimeout(()=>{b.classList.add("open"),I=!0,k=null},250)}),h.addEventListener("pointerup",x),h.addEventListener("pointercancel",x),h.addEventListener("pointerleave",x),h.addEventListener("click",()=>{if(I){I=!1;return}r==null||r()}),v.addEventListener("input",()=>{const C=parseInt(v.value,10)/100;o==null||o(C)});const _=document.createElement("input");_.className="timeline__slider",_.type="range",_.min="0",_.max="1000",_.step="1",_.value="0",_.style.setProperty("--fill","0%"),_.setAttribute("aria-label","Simulation time");const y=document.createElement("div");y.className="timeline__speed";const S=document.createElement("button");S.className="timeline__speed-btn",S.type="button",S.setAttribute("aria-label","Playback speed"),S.addEventListener("click",()=>{y.classList.toggle("open")});const L=document.createElement("div");L.className="timeline__speed-menu";for(const C of jr){const O=document.createElement("button");O.className="timeline__speed-option",O.type="button",O.textContent=Tn(C),O.addEventListener("click",()=>{y.classList.remove("open"),i==null||i(C)}),L.appendChild(O)}y.appendChild(S),y.appendChild(L);const E=document.createElement("button");return E.className="timeline__summary-btn",E.type="button",E.setAttribute("aria-label","View run summary"),E.textContent="ⓘ",E.addEventListener("click",()=>a==null?void 0:a()),p.appendChild(b),p.appendChild(m),p.appendChild(_),p.appendChild(y),p.appendChild(E),_.addEventListener("input",()=>{const C=parseInt(_.value,10)/1e3;_.style.setProperty("--fill",`${C*100}%`),t==null||t(C)}),_.addEventListener("pointerdown",()=>c==null?void 0:c()),_.addEventListener("pointerup",()=>l==null?void 0:l()),_.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",C=>{y.contains(C.target)||y.classList.remove("open"),b.contains(C.target)||b.classList.remove("open")}),f.appendChild(p),n.appendChild(f),M(u),{setPosition(C){const O=Math.max(0,Math.min(1,C));_.value=String(Math.round(O*1e3)),_.style.setProperty("--fill",`${O*100}%`)},setPlaying(C){m.textContent=C?"⏸":"▶",m.classList.toggle("is-paused",!C),m.setAttribute("aria-label",C?"Pause":"Play")},setSpeed(C){M(C)},setAudioVisible(C){b.hidden=!C,b.classList.toggle("is-hidden",!C),C||b.classList.remove("open")},setMuted(C){h.textContent=C?"🔇":"🔊",h.classList.toggle("is-muted",C),h.setAttribute("aria-label",C?"Unmute audio":"Mute audio")},setVolume(C){const O=Math.max(0,Math.min(1,C));v.value=String(Math.round(O*100))}};function M(C){S.textContent=Tn(C);for(const O of L.children)O.classList.toggle("is-active",O.textContent===Tn(C))}function x(){k!==null&&(window.clearTimeout(k),k=null)}}function Tn(n){return`x${n}`}function qr(n,e){const t=Math.min(Ti(e),2);return n.toFixed(t)}function Ne(n,e){return e?`${n} ${e}`:n}function Rt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?At(n):e<1e6?`${t}${At(n/1e3)}K`:e<1e9?`${t}${At(n/1e6)}M`:e<1e12?`${t}${At(n/1e9)}B`:`${t}${At(n/1e12)}T`:String(n)}function At(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Wr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function tn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return Rt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ft(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="compact"||t.format==="scientific"?Rt(i):qr(i,a)}function Ti(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function Yr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=Gr(s,i,a);for(const o of s.metadata.liveStats){const c=Jr(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function Gr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:ft(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:zr(a),value:r}]))}}function zr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Jr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=Qr((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Ne(a,n.unit)}}function Qr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Rt(Math.round(a)):Rt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Wr(n,{integer:e.integer})}function Xr(){const n=te("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(eo()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function Zr(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function eo(){return Zr(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const to={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function no(n,e,t){const s=te("assets/banner-1600.webp"),i=[`${te("assets/banner-960.webp")} 960w`,`${te("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(p){o.innerHTML="";for(const m of p){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const h=to[m.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${h}</span>
      `,b.addEventListener("click",()=>t(m)),o.appendChild(b)}}c(e);const{infoButton:l,infoModal:u,close:f}=Xr();return r.appendChild(o),a.appendChild(r),a.appendChild(l),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){f(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(p){c(p)}}}function so(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(_=>[_.id,_.target])),a=n.metadata.results.map(_=>{const y=On(n,e,s,_.id);return y===null?null:{id:_.id,value:y,target:_.target}}).filter(_=>_!==null),r=n.parameters.filter(_=>i[_.id]!==void 0).map(_=>{const y=e[_.id]??_.fallbackValue,S=i[_.id]??_.fallbackValue;return Math.abs(y-S)/Math.max(_.max-_.min,1e-9)}),o=r.reduce((_,y)=>_+y,0)/Math.max(r.length,1),c=ro(a),l=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${Mn(u,1)} CPU-hrs
${Mn(f,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,h=String(n.parameters.length+6),g="Present",v=ao((s==null?void 0:s.wallclockSeconds)??t),k=Rs($s(On(n,e,s,"moon_iron"))),I=Rs($s(On(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:v},similarityScore:{label:"Similarity Score",value:`${c}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:l},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:Mn(f,1)},particlesUpdated:{label:"Particle updates",value:s?io(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:k},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:I},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:h},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([_,y])=>[_,{label:y.label,value:y.value}]))}}function io(n){return String(Math.max(0,n))}function ao(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Mn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function On(n,e,t,s){var o;const i=n.parameters.find(c=>c.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const c=Number(a);if(Number.isFinite(c))return c}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Rs(n){return n===null?"--":n.toFixed(1)}function $s(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function ro(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const qn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},oo={HIDE_AFTER_MS:980},Mi="https://media.universemakers.org/engine/run-manifest.json",Pn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",lo="https://universe-engine.universe-engine.workers.dev/api/track-run",co=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
    redHigh: Far too heavy.  Lots of material was added with very little removed, so thia planet ends up far more massive than our Earth.
  Spin of Earth-Moon system:
    greenLow: Spot on.  The system "angular momentum" is slightly lower than the real one — well within range.
    greenHigh: Spot on.  The system "angular momentum" is slightly higher than the real one — well within range.
    amberLow: A bit low.  This planet is spinning a bit slowly, or not enough material is flying around in orbit to evolve into the system we see today.
    amberHigh: A bit high.  This planet is spinning a bit fast, or too much material is flying around in orbit to match the system we see today.
    redLow: Far too low.  This impact gave the planet hardly any spin, with not much material in orbit — unlike our fairly fast-spinning and high-orbiting early Earth and Moon.
    redHigh: Far too high.  This impact drove the planet to spin super fast, with massive amounts of material flying around in orbit.

galaxy:
  stellar_mass:
    greenLow: Very close.  Your galaxy built just a fraction fewer stars than the Milky Way.
    greenHigh: Very close.  Your galaxy built just a fraction more stars than the Milky Way.
    amberLow: A bit low.  Your galaxy made fewer stars than the Milky Way, so it would look smaller and dimmer in the sky.
    amberHigh: A bit high.  Your galaxy made more stars than the Milky Way, so it would be a brighter, busier place.
    redLow: Far too low.  This galaxy is a shadow of the Milky Way — far fewer stars than the real thing.
    redHigh: Far too high.  This galaxy is absolutely bursting with stars, far more than the Milky Way.
  black_hole_mass:
    greenLow: Very close.  The black hole at the centre is just a fraction lighter than the one in the Milky Way.
    greenHigh: Very close.  The black hole at the centre is just a fraction heavier than the one in the Milky Way.
    amberLow: A bit low.  Your central black hole is smaller than the Milky Way's — it's still hungry.
    amberHigh: A bit high.  Your central black hole is bigger than the Milky Way's — it's been feasting.
    redLow: Far too low.  The supermassive black hole at your galaxy's heart is surprisingly small.
    redHigh: Far too high.  The central black hole is enormous — far larger than the Milky Way's Sagittarius A*.
  galaxy_age:
    greenLow: Very close.  The stars in your galaxy are just a touch younger, on average, than the Milky Way's.
    greenHigh: Very close.  The stars in your galaxy are just a touch older, on average, than the Milky Way's.
    amberLow: A bit young.  Most of the stars in your galaxy formed later than in the Milky Way.
    amberHigh: A bit old.  Most of the stars in your galaxy formed earlier than in the Milky Way.
    redLow: Far too young.  Your galaxy is dominated by freshly-minted stars — it's practically a newborn.
    redHigh: Far too old.  Your galaxy is full of ancient stars that formed very early on.

cosmos:
  stellar_fraction:
    greenLow: Very close.  Your universe locked just a slightly smaller fraction of its mass into stars than ours.
    greenHigh: Very close.  Your universe locked just a slightly larger fraction of its mass into stars than ours.
    amberLow: A bit low.  Your universe turned less of its raw material into stars, leaving it a bit darker and emptier.
    amberHigh: A bit high.  Your universe was a bit more efficient at cooking gas into stars than our own.
    redLow: Far too low.  Your universe struggled to form stars — most of the mass is still drifting around as gas.
    redHigh: Far too high.  Your universe is bursting with stars — it converted far more mass into starlight than ours.
  average_temperature_kelvin:
    greenLow: Very close.  The gas in your universe is just a shade cooler, on average, than in ours.
    greenHigh: Very close.  The gas in your universe is just a shade warmer, on average, than in ours.
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
`,xs=(()=>{const n=Ve(co),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),nn="#4CD98A",Wn="#E8951C",Oi="#D7372A",Pi=.2,Ri=.5,Bs=2;function $i(n){const e=Math.abs(n-1);return e<=Pi?{word:"On target",colour:nn}:e<=Ri?{word:n>1?"Too high":"Too low",colour:Wn}:{word:n>1?"Way too high":"Way too low",colour:Oi}}function uo(n){const e=Math.abs(n-1),t=n>=1;return e<=Pi?t?"greenHigh":"greenLow":e<=Ri?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function fo(n){return Math.min(Math.max(n,0),Bs)/Bs*100}function ho(n){return n>=85?{word:"Almost perfect",colour:nn}:n>=65?{word:"Really close",colour:nn}:n>=45?{word:"Getting there",colour:Wn}:n>=25?{word:"Not quite",colour:Wn}:{word:"Way off - try again",colour:Oi}}function mo(n,e,t){var r,o;const s=uo(t),i=((r=xs[n])==null?void 0:r[s])??((o=xs[e])==null?void 0:o[s]);return i||($i(t).colour===nn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function po(n,e,t){return n.metadata.results.map(s=>{const i=go(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=yo(s,n,t),o=mo(s.id,r,a),c=Ne(xi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:c,detail:o}}).filter(s=>s!==null)}function go(n,e,t,s){var c;const i=n.id,a=e.parameters.find(l=>l.id===i);if(a)return t[i]??a.fallbackValue;const r=bo((c=s==null?void 0:s.summaryMetrics[i])==null?void 0:c.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function yo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function bo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function vo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function wo(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const c=document.createElement("p");c.className="summary-overlay__hint",c.textContent="Select any card for more details",a.appendChild(o),a.appendChild(c);const l=document.createElement("div");l.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const f=document.createElement("button"),p=document.createElement("button");f.className="summary-overlay__button summary-overlay__button--primary",f.type="button",f.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),l.appendChild(f),l.appendChild(u),l.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(l),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),v=m.querySelector(".sci-modal__close");function k(S){const L=$i(S.value);b.textContent=S.label,h.textContent=L.word,h.style.color=L.colour,h.hidden=!1,g.textContent=S.detail,m.classList.remove("is-hidden")}function I(S,L){b.textContent=S,h.hidden=!0,g.textContent=L,m.classList.remove("is-hidden")}function _(){m.classList.add("is-hidden")}v.addEventListener("click",_),m.addEventListener("click",S=>{S.target===m&&_()}),t.addEventListener("click",S=>{S.target===t&&e.onReplay()});function y(S,L){const E=document.createElement("div");E.className=`${S.className} panel`,E.innerHTML=`<p class="sci-section__title">${S.title}</p>`;const M=document.createElement("div"),x=S.singleRow?Math.max(1,S.stats.length):Math.max(1,Math.min(S.stats.length,S.maxColumns));M.className="metric-grid",S.singleRow&&M.classList.add("metric-grid--single-row"),M.style.setProperty("--summary-grid-columns",String(x)),M.style.setProperty("--summary-grid-max-width",`${S.maxWidthRem}rem`);for(const C of S.stats){const O=_o(C,L),F=document.createElement("div"),G=document.createElement("span"),J=document.createElement("span");F.className="res-card",G.className="res-card__label",G.textContent=O.label,J.className="res-card__value",J.textContent=O.value,F.appendChild(G),F.appendChild(J),C.description&&(F.classList.add("res-card--has-info"),F.addEventListener("click",()=>{I(O.label,C.description)})),M.appendChild(F)}return E.appendChild(M),E}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},oo.HIDE_AFTER_MS)},setHomeVisible(S){p.hidden=!S},update(S,L,E,M,x){var ce;r.innerHTML="",_();const C=so(S,L,E,M),O=S.metadata.summaryStats,F=po(S,L,M),G=new Set(F.map(q=>q.id));let J;if(F.length>0)J=vo(F);else{const q=((ce=C.similarityScore)==null?void 0:ce.value)??"0/100";J=parseInt(q,10)||0}const H=ho(J),re=document.createElement("div"),ye=document.createElement("div"),me=document.createElement("div");re.className="sci-top",ye.className="summary-main-column",me.className="summary-side-column";const ne=document.createElement("div");ne.className="sci-hero panel",x?(ne.classList.add("sci-hero--thumbnail"),ne.innerHTML=`<img class="sci-hero__thumbnail" src="${x}" alt="Final frame of simulation" />`):ne.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${J}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${H.colour}">${H.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${J}%; background:${H.colour}; box-shadow:0 0 12px ${H.colour}"></div>
          </div>
        `,ye.appendChild(ne);const le=O.filter(q=>(q.section??"resources")==="resources"&&!F.some(z=>z.id===String(q.id))&&q.id!=="similarityScore"),we=O.filter(q=>q.section==="simulationStats"&&!G.has(String(q.id)));if(le.length>0&&me.appendChild(y({title:"Resources Used",className:"res-section",stats:le,maxColumns:3,maxWidthRem:48},C)),we.length>0&&me.appendChild(y({title:"Simulation Stats",className:"res-section",stats:we,maxColumns:we.length,maxWidthRem:48,singleRow:!0},C)),re.appendChild(ye),me.childElementCount>0&&re.appendChild(me),r.appendChild(re),F.length>0){const q=document.createElement("div");q.className="sci-bottom-row";const z=document.createElement("div");z.className="sci-section panel param-section",z.innerHTML='<p class="sci-section__title">Input Parameters</p>';const A=document.createElement("div");A.className="param-cards";for(const j of S.parameters){const be=L[j.id]??j.fallbackValue,ve=j.displayUnit??j.unit,D=document.createElement("div"),Ue=document.createElement("span"),Re=document.createElement("span");D.className="res-card",j.description&&(D.classList.add("res-card--has-info"),D.addEventListener("click",()=>I(j.label,j.description))),Ue.className="res-card__label",Ue.textContent=j.label,Re.className="res-card__value";const et=ft(be,j.step,{scale:j.valueScale,format:j.displayFormat,significantFigures:j.displaySignificantFigures});Re.textContent=Ne(et,ve),D.appendChild(Ue),D.appendChild(Re),A.appendChild(D)}z.appendChild(A);const P=document.createElement("div"),U=document.createElement("div"),V=document.createElement("p"),B=document.createElement("p");P.className="sci-section panel",U.className="sci-section__header",V.className="sci-section__title",V.textContent="Similarity Results",B.className="sci-section__hint",B.textContent="Select any bar for details",U.appendChild(V),U.appendChild(B);const se=document.createElement("div");se.className="sci-bars";for(const j of F){const be=document.createElement("div");be.className="sci-bar",be.innerHTML=`
            <div class="sci-bar__name">${j.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${fo(j.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${j.formattedValue}</div>
          `,be.addEventListener("click",()=>k(j)),se.appendChild(be)}P.appendChild(U),P.appendChild(se),q.appendChild(z),q.appendChild(P),r.appendChild(q)}}}}function _o(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=So(s,n);if(i)return{label:n.label??t.label,value:i};const a=xi(s,n);return{label:n.label??t.label,value:Ne(a,n.unit)}}function So(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Ne(tn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Ne(tn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Ne(n,e.unit)}function xi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return tn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return tn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Rt(i)}function ko(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const c=Eo(a.icon);if(c){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(c),o.appendChild(u)}const l=document.createElement("span");if(l.className="view-switcher__label",l.textContent=a.label??a.id,o.appendChild(l),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Lo()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Eo(n){switch(n){case"dark-matter":return ze(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return ze(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return ze(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return ze(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return ze(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return ze(`
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
      `);default:return null}}function ze(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Lo(){return ze(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Ao=`# Credits source-of-truth.
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
`;function Io(){const n=Ve(Ao);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function No(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:Co(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function v(_,y){b.textContent=_,h.textContent=y,m.classList.remove("is-hidden")}function k(){m.classList.add("is-hidden")}g.addEventListener("click",k),m.addEventListener("click",_=>{_.target===m&&k()});const I=document.createElement("div");I.className="parameter-editor__list";for(const _ of u.parameters)I.appendChild(c(_,v));i.appendChild(I),l()}function c(u,f){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const h=u.displayUnit??u.unit,g=document.createElement("span");g.className="param-card__range",g.textContent=`${Ne(ft(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)} – ${Ne(ft(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}`,m.appendChild(b),m.appendChild(g);const v=document.createElement("input");v.className="param-card__slider",v.type="range";const k=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max,_=r[u.id]??u.fallbackValue;v.min=String(k),v.max=String(I),v.step=u.logScale?"0.001":String(u.step),v.value=String(u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_),v.setAttribute("aria-label",u.label);const y=document.createElement("span");y.className="res-card__value";function S(E){const M=u.logScale?10**E:E;r[u.id]=M,v.value=String(E),v.style.setProperty("--fill",`${Fs(E,k,I)}%`),y.textContent=Ne(ft(M,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h),l()}v.addEventListener("input",()=>{S(parseFloat(v.value))}),v.addEventListener("pointerdown",E=>E.stopPropagation()),v.addEventListener("click",E=>E.stopPropagation());const L=u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_;if(v.style.setProperty("--fill",`${Fs(L,k,I)}%`),y.textContent=Ne(ft(_,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h),u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const E=document.createElement("span");E.className="param-card__info-btn",E.setAttribute("aria-label","Parameter description"),E.textContent="ⓘ",m.appendChild(E),p.addEventListener("click",()=>{f(u.label,u.description)})}return p.appendChild(m),p.appendChild(v),p.appendChild(y),p}function l(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Co(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function Fs(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Bi="universe-engine-advanced-settings",To="RSSSE26UM_Engine";function sn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Mo(n){const e=localStorage.getItem(Bi);if(!e)return sn();try{const t=JSON.parse(e);return Fi(t,n)}catch{return sn()}}function Oo(n,e){const t=Fi(n,e);return localStorage.setItem(Bi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Fi(n,e){const t=sn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((c,l,u)=>typeof c=="string"&&s.has(c)&&u.indexOf(c)===l&&c!==a):t.hiddenScaleIds,o=Po(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Po(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):sn().defaultAudioVolume}function Ro(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function $o(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=l.querySelector(".config-overlay__eyebrow"),f=l.querySelector(".config-overlay__title"),p=l.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Back"),m.textContent="←",c.appendChild(l),c.appendChild(m);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="parameters";const h=document.createElement("div");b.appendChild(h);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="settings",g.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const v=document.createElement("div");g.appendChild(v);const k=document.createElement("section");k.className="audio-settings",k.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const I=document.createElement("label");I.className="advanced-settings__field advanced-settings__field--inline";const _=document.createElement("input"),y=document.createElement("span");_.type="checkbox",_.className="advanced-settings__checkbox",y.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,I.appendChild(_),I.appendChild(y),k.appendChild(I);const S=document.createElement("label");S.className="advanced-settings__field",S.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const L=document.createElement("input"),E=document.createElement("span");L.type="range",L.min="0",L.max="100",L.step="1",L.className="audio-settings__slider",E.className="audio-settings__value",S.appendChild(L),S.appendChild(E),k.appendChild(S),g.appendChild(k);const M=document.createElement("section");M.className="advanced-settings",M.dataset.state="closed",M.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const x=document.createElement("button");x.className="advanced-settings__access",x.type="button",x.textContent="Advanced Settings",M.appendChild(x);const C=document.createElement("div");C.className="advanced-settings__auth";const O=document.createElement("input");O.className="advanced-settings__password",O.type="password",O.placeholder="Enter password",O.autocomplete="off";const F=document.createElement("button");F.className="advanced-settings__unlock",F.type="button",F.textContent="Unlock";const G=document.createElement("p");G.className="advanced-settings__message",C.appendChild(O),C.appendChild(F),C.appendChild(G),M.appendChild(C);const J=document.createElement("div");J.className="advanced-settings__form";const H=document.createElement("label");H.className="advanced-settings__field",H.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const re=document.createElement("select");re.className="advanced-settings__select",re.appendChild(new Option("None",""));for(const N of e.availableScales)re.appendChild(new Option(N.label,N.id));H.appendChild(re),J.appendChild(H);const ye=document.createElement("div");ye.className="advanced-settings__field",ye.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const me=document.createElement("div");me.className="advanced-settings__options";const ne=document.createElement("label"),le=document.createElement("input");ne.className="advanced-settings__choice",le.type="radio",le.name="manifest-source",le.value="local",ne.appendChild(le),ne.append("Local manifest");const we=document.createElement("label"),ce=document.createElement("input");we.className="advanced-settings__choice",ce.type="radio",ce.name="manifest-source",ce.value="online",we.appendChild(ce),we.append("Online manifest"),me.appendChild(ne),me.appendChild(we),ye.appendChild(me),J.appendChild(ye);const q=document.createElement("label");q.className="advanced-settings__field advanced-settings__field--inline";const z=document.createElement("input"),A=document.createElement("span");z.type="checkbox",z.className="advanced-settings__checkbox",A.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,q.appendChild(z),q.appendChild(A),J.appendChild(q);const P=document.createElement("div");P.className="advanced-settings__field",P.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const U=document.createElement("div");U.className="advanced-settings__options";const V=new Map;for(const N of e.availableScales){const W=document.createElement("label"),Q=document.createElement("input");W.className="advanced-settings__choice",Q.type="checkbox",Q.value=N.id,V.set(N.id,Q),W.appendChild(Q),W.append(`Show ${N.label}`),U.appendChild(W)}P.appendChild(U),J.appendChild(P),M.appendChild(J),g.appendChild(M);const B=document.createElement("section");B.className="config-overlay__section config-overlay__section--grow",B.dataset.section="credits",B.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const se=B.querySelector("[data-credits]"),j=Io();if(se.innerHTML="",j.length===0){const N=document.createElement("div");N.className="credits-list__entry",N.textContent="To be credited...",se.appendChild(N)}else for(const N of j)if(N.header){const W=document.createElement("div");W.className="credits-list__heading",W.textContent=N.text,se.appendChild(W)}else{const W=document.createElement("div");W.className="credits-list__entry";const Q=document.createElement("span");if(Q.className="credits-list__text",N.url){const Y=document.createElement("a");Y.className="credits-list__link",Y.href=N.url,Y.target="_blank",Y.rel="noopener noreferrer",Y.textContent=N.text,Q.appendChild(Y)}else Q.textContent=N.text;W.appendChild(Q),se.appendChild(W)}const be=document.createElement("div");be.className="config-overlay__footer";const ve=document.createElement("button");ve.className="run-button",ve.type="button",ve.textContent="Run",be.appendChild(ve),o.appendChild(c),o.appendChild(b),o.appendChild(g),o.appendChild(B),o.appendChild(be),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let D=It(e.advancedSettings),Ue="closed";const Re=No(h,e.simClass,e.values,e.onValuesChange),et=Br(v,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),x.addEventListener("click",()=>{if(Ue==="open"){tt("closed");return}tt("auth"),O.focus()}),F.addEventListener("click",Vt),O.addEventListener("keydown",N=>{N.key==="Enter"&&Vt()}),re.addEventListener("change",()=>{D.lockedScaleId=re.value||null,$e()}),le.addEventListener("change",()=>{le.checked&&(D.manifestSource="local")}),ce.addEventListener("change",()=>{ce.checked&&(D.manifestSource="online")}),z.addEventListener("change",()=>{D.verboseLogging=z.checked}),_.addEventListener("change",()=>{D.audioMutedByDefault=_.checked}),L.addEventListener("input",()=>{D.defaultAudioVolume=Number(L.value)/100,nt()});for(const[N,W]of V.entries())W.addEventListener("change",()=>{if(Array.from(V.entries()).filter(([,Y])=>Y.checked).map(([Y])=>Y).length===0&&!D.lockedScaleId){W.checked=!0;return}D.hiddenScaleIds=Array.from(V.keys()).filter(Y=>{var Me;return!((Me=V.get(Y))!=null&&Me.checked)&&Y!==D.lockedScaleId}),$e()}),N===D.lockedScaleId&&(W.disabled=!0);Ke(e.initialView??"parameters"),$e();function Ke(N){o.dataset.view=N,N==="parameters"?(u.textContent=e.simClass.label,f.textContent="Shape Your Simulation",p.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):N==="settings"?(u.textContent="Interface",f.textContent="Adjust The Control Room",p.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=te("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",f.textContent="Project Sources And Attribution",p.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=te("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),N==="settings"?ve.textContent="Apply":N==="credits"?ve.textContent="Close":ve.textContent="Run Simulation"}function $e(){re.value=D.lockedScaleId??"",le.checked=D.manifestSource==="local",ce.checked=D.manifestSource==="online",z.checked=D.verboseLogging,_.checked=D.audioMutedByDefault,L.value=String(Math.round(D.defaultAudioVolume*100)),nt();for(const[N,W]of V.entries()){const Q=D.lockedScaleId===N;W.checked=Q||!D.hiddenScaleIds.includes(N),W.disabled=Q}}function Vt(){if(O.value!==To){G.textContent="Incorrect password";return}O.value="",G.textContent="",tt("open")}function tt(N){Ue=N,M.dataset.state=N,x.textContent=N==="open"?"Hide Advanced Settings":"Advanced Settings",N!=="auth"&&(G.textContent="")}function Te(){O.value="",G.textContent="",tt("closed")}function ue(){D=It(e.advancedSettings),$e()}function nt(){E.textContent=`${Math.round(Number(L.value))}%`}return ve.addEventListener("click",()=>{const N=o.dataset.view;if(N==="settings"){e.onApplySettings(It(D));return}if(N==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),ue(),Te()},setSimulation(N,W){e.simClass=N,a.dataset.simClass=N.id,Re.setSimClass(N,W),o.dataset.view==="parameters"&&(r.src=N.placeholderImage,r.alt=`${N.label} preview`,Ke("parameters"))},setTheme(N){et.setActive(N)},setView(N){Ke(N),N!=="settings"&&Te()},setAdvancedSettings(N){e.advancedSettings=It(N),D=It(N),$e(),Te()}}}function It(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function xo(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=qn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let c=[],l=0;function u(){for(const b of c)window.clearTimeout(b);c=[]}function f(b,h){return new Promise(g=>{const v=window.setTimeout(()=>{h===l&&g()},Math.max(0,b));c.push(v)})}async function p(b,h){const g=document.createElement("div");g.className="terminal__line";const v=m();g.appendChild(v),o.appendChild(g);for(let k=0;k<b.length;k+=1){if(h!==l)return;const I=b[k];g.insertBefore(document.createTextNode(I),v),o.scrollTop=o.scrollHeight,await f(e,h)}v.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,h,g,v){u(),l+=1;const k=l;i.hidden=!1,i.classList.remove("is-hidden");const I=performance.now(),_=(v==null?void 0:v.minTerminalTimeMs)??t;let y=!g,S=[...b];g&&g.then(()=>{y=!0});let L=0;for(;k===l;){S.length===0&&(S=[...b]);const M=Math.floor(Math.random()*S.length),[x]=S.splice(M,1),C=`${Vs(L)} ${x.text}`;if(L+=1,await p(C,k),k!==l)return;if(performance.now()-I>=_&&y)break}if(k!==l)return;const E=document.createElement("div");E.className="terminal__line terminal__line--syncing",E.textContent=`${Vs(L)} STARTING SIMULATION...`,o.appendChild(E),o.scrollTop=o.scrollHeight,await f(s,k),k===l&&h()},hide(){u(),l+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Vs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Rn(t)}:${Rn(s)}:${Rn(i)}]`}function Rn(n){return String(n).padStart(2,"0")}function Bo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var f;l(),document.fullscreenElement?document.exitFullscreen():(f=document.getElementById("app"))==null||f.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const f=r.querySelector(".display-menu__item-label");f&&(f.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",f=>{n.contains(f.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(f,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${f}</span>
    `,m.addEventListener("click",p),m}function l(){n.classList.remove("open")}function u(f){a.hidden=!f,a.classList.toggle("is-hidden",!f)}}const Vi="universe-engine-playback-speed",Fo=new Set([.25,.5,1,2]);function Vo(){const n=localStorage.getItem(Vi),e=n?Number(n):NaN;return Fo.has(e)?e:1}function Uo(n){localStorage.setItem(Vi,String(n))}async function $n(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function Do(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const Ho=`# Initialization terminal script for the Planetary simulation family.
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
`,jo=`# Initialization terminal script for the Galaxy simulation family.
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
- 'VISUAL_PIPELINE :: reticulating splines'
`,Ko=`# Initialization terminal script for the Cosmos simulation family.
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
`,qo={planetary:Ho,galaxy:jo,cosmos:Ko};function Wo(n){return Ve(qo[n.id]).map(t=>({text:t}))}function Yo(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function Go(n){try{const e=await He(n);if(!e.ok)return null;const t=await e.text(),s=Ve(t),i=lt(s.wallclockSeconds),a=lt(s.computeUsed),r=lt(s.memoryUsed),o=lt(s.carbonBurnt),c=lt(s.particlesUpdated),l=await zo(n),u=Qo(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function zo(n){try{const e=await He(Jo(n));if(!e.ok)return{};const t=await e.text(),s=Ve(t);return Xo(s)}catch{return{}}}function Jo(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function lt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function Qo(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function Xo(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=lt(s);i!==null&&(e[t]=i)}return e}const Ui="[UniverseEngine]";let Di=!1;function Us(n){Di=n}function Hi(){return Di}function ae(n,e){Hi()&&console.info(Ui,n,e??"")}function Be(n,e){Hi()&&console.warn(Ui,n,e??"")}const Zo={local:"assets/local-manifest.json",online:Mi};function el(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),Ts(),e=s,ae("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await Ki(e,t)},async findNearestVideo(s,i,a){const r=await sl(e,t,s,i,a);if(r)return r;const o=ji(s);return Be("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:tl(s),summaryUrl:Yo(o)}}}}function ji(n){switch(n){case"planetary":return te("assets/planet_test.mp4");case"galaxy":return te("assets/galaxy_test.mp4");case"cosmos":return te("assets/cosmo_test.mp4");default:return te("assets/galaxy_test.mp4")}}function tl(n){switch(n){case"planetary":return te("assets/planet_test_planetary_stats.csv");case"galaxy":return te("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return te("assets/cosmo_test_cosmos_stats.csv");default:return te("assets/galaxy_test_galaxy_stats.csv")}}async function Ki(n,e){const t=e.get(n);if(t)return t;const s=Zo[n],i=(n==="online"?nl(s):fetch(te(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ae("Loaded manifest",{source:n,manifestPath:s}),await a.json()})).catch(a=>(Be("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function nl(n){const e=[n,Pn];for(const t of e)try{const s=await fetch(t);if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??Ds(Mi),r=i.backupBase??Ds(Pn);return Vr(a,r),t===Pn&&Ur("backup"),ae("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function sl(n,e,t,s,i){const r=(await Ki(n,e)).runs.filter(f=>f.simulationId===t);if(r.length===0)return Be("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=Hs(o,s,i);for(const f of r.slice(1)){const p=Hs(f,s,i);p<c&&(o=f,c=p)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(ae("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:Gt(n,u),liveDataUrl:Gt(n,o.liveDataPath),summaryUrl:Gt(n,o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([f,p])=>[f,Gt(n,p)]))}):null}function Gt(n,e){return n==="local"?te(e):Oe(e)}function Ds(n){const e=new URL(n);return`${e.protocol}//${e.host}`}function Hs(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Xt={mode:"time",frames:[]};async function il(n){const e=await He(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return ol(t)}function al(n,e,t=0){if(n.mode==="row")return ll(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=rl(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],c=(e-r.t)/Math.max(o.t-r.t,1e-9);return cl(r.values,o.values,c)}function rl(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function ol(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Xt;const t=xn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=xn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=xn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function ll(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function xn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function cl(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=ul(u);continue}i[a]=t<.5?r:o}return i}function ul(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function dl(n){fl(lo,n)}function fl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ae("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ae("Run selection tracked",{simulationId:e.simulationId}):Be("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Be("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const js=50*1024*1024,hl=8,ml=6e3,pl=8e3,gl=5e3,yl=1200,bl=100,Bn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function vl(n){const e=ot.map(d=>d.id);let t=Mo(e),s=gs(t);const i=el(t.manifestSource),a=Do();Us(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=ys(t.lockedScaleId)??s[0]??ot[0],o=t.lockedScaleId?Bn[r.id]:xr(),c=!1,l=null,u=null,f=!1,p=t.audioMutedByDefault,m=t.defaultAudioVolume,b=0,h=null,g=0,v=Xt,k=!1;const I=Object.fromEntries(ot.map(d=>[d.id,ia(d)]));Cn(o);const _=ji(r.id),y=Hr(n,_),S=document.createElement("audio");S.preload="auto",S.hidden=!0,S.setAttribute("playsinline","true"),S.muted=p,S.volume=m,n.appendChild(S);const L=document.createElement("div");L.className="display-chrome",L.classList.add("is-hidden"),n.appendChild(L);const E=document.createElement("div");E.className="orientation-overlay",E.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(E);const M=document.createElement("div");M.className="swift-logo",M.innerHTML=`
    <img
      class="swift-logo__image"
      src="${te("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(M);const x=document.createElement("div");x.className="synth-logo is-hidden",x.innerHTML=`
    <img
      class="synth-logo__image"
      src="${te("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(x);const C=document.createElement("img");C.className="app-partner-logo",C.src=te("assets/dirac-hpc-white.webp"),C.alt="DIRAC HPC",C.decoding="async",n.appendChild(C);const O=document.createElement("div");O.className="display-chrome__top-left is-hidden",n.appendChild(O);const F=Bo(O,{onHome(){bn()},onViewSelected(d){if(d==="credits"){Dt("credits");return}Dt(d)},showHome:!t.lockedScaleId}),G=document.createElement("div");G.className="display-chrome__left-center",L.appendChild(G);const J=ko(G,{onSelect(d){fs(d)},onInfo(d,w,T){re.textContent=w,ye.textContent=T,H.classList.add("is-visible")}}),H=document.createElement("div");H.className="view-info-overlay",H.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(H);const re=H.querySelector(".view-info-overlay__title"),ye=H.querySelector(".view-info-overlay__text"),me=H.querySelector(".view-info-overlay__close");H.addEventListener("click",d=>{d.target===H&&H.classList.remove("is-visible")}),me.addEventListener("click",()=>{H.classList.remove("is-visible")});const ne=document.createElement("div");ne.className="display-chrome__top-center is-hidden",L.appendChild(ne);const le=document.createElement("div");le.className="display-chrome__top-right",L.appendChild(le);const we=Yr(le),ce=document.createElement("div");ce.className="display-chrome__center-status",ce.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,L.appendChild(ce);const q=Vo();y.setPlaybackRate(q);const z=document.createElement("div");z.className="display-chrome__bottom",L.appendChild(z);const A=Kr(z,{onChange(d){D(d)},onTogglePlay:ds,onAudioToggle:Ji,onAudioVolumeChange:Qi,onSpeedChange:Xi,onSummaryClick:zi,onScrubStart(){Vt(),ve()},onScrubEnd(){tt(),y.isPaused()||be()},initialSpeed:q});A.setPlaying(!y.isPaused()),A.setAudioVisible(!1),A.setMuted(p),A.setVolume(m),S.addEventListener("loadedmetadata",()=>{it(!0),pe()});let P=null,U=null,V=null,B=!1,se=null,j=0;function be(){if(P!==null)return;function d(){const w=y.getPlaybackFraction();A.setPosition(w),y.isPaused()?P=null:P=requestAnimationFrame(d)}P=requestAnimationFrame(d)}function ve(){P!==null&&(cancelAnimationFrame(P),P=null)}function D(d){U=d,V===null&&(V=requestAnimationFrame(()=>{if(V=null,U===null)return;const w=U;U=null,y.seekToFraction(w),it(!0)}))}function Ue(){if(U===null)return;V!==null&&(cancelAnimationFrame(V),V=null);const d=U;U=null,y.seekToFraction(d),it(!0)}function Re(){se!==null&&(window.clearTimeout(se),se=null)}function et(){if(!(h!=null&&h.views))return[];const d=Ye(r,h);return Object.entries(h.views).filter(([w])=>w!==d).map(([,w])=>Oe(w)).filter(Boolean)}function Ke(){Re(),y.suspendPrewarming()}function $e(d=yl){Re(),!(B||y.isPaused())&&(se=window.setTimeout(()=>{se=null,!(B||y.isPaused())&&(y.resumePrewarming(),y.prewarmSources(et()))},Math.max(0,d)))}function Vt(){B=!0,j=0,Ke(),pe()}function tt(){B=!1,j=0,Ue(),g=y.getPlaybackFraction()*y.getDurationSeconds(),We(g),$e(),pe()}y.onPlayStateChange(d=>{A.setPlaying(!d),d?(ve(),Ke()):(be(),$e(0)),pe()}),y.onTimeUpdate(d=>{if(g=d*y.getDurationSeconds(),B){const w=performance.now();if(w-j<bl)return;j=w}We(g),it()});const Te=document.createElement("div");Te.className="overlay-layer",n.appendChild(Te);const ue=wo(Te,{onReplay:Gi,onParameters:()=>Dt("parameters"),onHome:bn,showHome:!t.lockedScaleId});y.onEnded(()=>{c=!0;const d=y.captureFrame();ue.update(r,_e(),y.getDurationSeconds(),l,d),ue.show(),pe()});const nt=no(Te,s,d=>{us(d),Dt("parameters")}),N=$o(Te,{simClass:r,values:_e(),theme:o,advancedSettings:t,availableScales:ot,onValuesChange:qi,onThemeChange:yn,onRun:()=>{ae("Parameters submitted — starting run",{simClassId:r.id}),Zi().catch(d=>{Be("Run failed to start",{simClassId:r.id,error:d instanceof Error?d.message:String(d)})})},onApplySettings:Wi,onClose:Yi,initialView:"parameters"}),W=xo(Te);A.setPosition(0),We(),ue.hide();const Q=new WeakMap,Y=d=>{const w=Q.get(d);w&&(clearTimeout(w),Q.delete(d)),d.classList.remove("side-collapsed")},Me=d=>{const w=Q.get(d);w&&clearTimeout(w),Q.set(d,setTimeout(()=>{d.classList.add("side-collapsed"),Q.delete(d)},2500))},pn=d=>{const w=Q.get(d);w&&(clearTimeout(w),Q.delete(d)),d.classList.add("side-collapsed")},gn=(d,w)=>{const T=w.isCollapsible??(()=>!0);d.addEventListener("mouseenter",()=>Y(d)),d.addEventListener("mouseleave",()=>{if(!T()){Y(d);return}Me(d)}),d.addEventListener("focusin",()=>Y(d)),d.addEventListener("focusout",R=>{if(!d.contains(R.relatedTarget)){if(!T()){Y(d);return}Me(d)}}),d.addEventListener("click",()=>{if(!T()){Y(d);return}if(d.classList.contains("side-collapsed")){Y(d),Me(d);return}w.toggleOnClick?pn(d):Me(d)}),T()?pn(d):Y(d)};gn(O,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),gn(G,{toggleOnClick:!0}),gn(z,{toggleOnClick:!1});let _t=0,st=null,Ut=0;const ls=()=>{st!==null&&(cancelAnimationFrame(st),st=null)},cs=()=>{if(st!==null)return;Ut=y.getPlaybackFraction();const d=()=>{if(_t===0){ls();return}const T=12*(1/60)/Math.max(y.getDurationSeconds(),1);Ut=Math.max(0,Math.min(1,Ut+_t*T)),y.seekToFraction(Ut),st=requestAnimationFrame(d)};st=requestAnimationFrame(d)};document.addEventListener("keydown",d=>{if(n.dataset.mode==="display"&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement))switch(d.key){case"Escape":d.preventDefault(),H.classList.contains("is-visible")?H.classList.remove("is-visible"):bn();break;case" ":d.preventDefault(),ds();break;case"ArrowLeft":d.preventDefault(),Y(z),Me(z),_t=-1,cs();break;case"ArrowRight":d.preventDefault(),Y(z),Me(z),_t=1,cs();break;case"ArrowUp":case"ArrowDown":{if(d.preventDefault(),Y(G),Me(G),!(h!=null&&h.views)||Object.keys(h.views).length<=1)break;const w=r.views.filter(de=>{var ge;return((ge=h==null?void 0:h.views)==null?void 0:ge[de.id])!==void 0});if(w.length<=1)break;const T=h.viewId??Ye(r,h),R=w.findIndex(de=>de.id===T),ie=d.key==="ArrowUp"?(R-1+w.length)%w.length:(R+1)%w.length;fs(w[ie].id);break}}}),document.addEventListener("keyup",d=>{(d.key==="ArrowLeft"||d.key==="ArrowRight")&&(_t=0,ls())}),y.hideMedia(),y.pause(),qe(t.lockedScaleId?"config":"entry");function us(d){d.id===r.id&&k||(r=d,_n(),yn(Bn[d.id]),N.setSimulation(r,_e()),A.setPosition(0),We(),wn(),vn())}function qi(d){I[r.id]={...d},ae("Parameter values updated",{simClassId:r.id,values:I[r.id]}),We()}function yn(d){o=d,Cn(d),N.setTheme(d)}function Dt(d){d==="parameters"&&N.setSimulation(r,_e()),N.setView(d),qe("config")}function Wi(d){if(pa(d),k){ue.hide(),qe("display");return}N.setSimulation(r,_e()),N.setView("parameters")}function Yi(){if(ue.hide(),!k&&t.lockedScaleId){N.setSimulation(r,_e()),N.setView("parameters");return}qe(k?"display":"entry")}function bn(){t.lockedScaleId||(ae("Returning to home screen",{simClassId:r.id}),_n(),k=!1,y.hideMedia(),qe("entry"))}function Gi(){c=!1,ue.hide(),y.getPlaybackFraction()>=.999&&(y.resetPlayback(),it(!0)),$n(y),pe()}function zi(){c=!0,y.pause();const d=l?y.captureFrame():null;ue.update(r,_e(),y.getDurationSeconds(),l,d),ue.show(),pe()}function ds(){y.isPaused()?$n(y):y.pause()}function Ji(){p=!p,pe()}function Qi(d){m=Math.max(0,Math.min(1,d)),p=m<=0,pe()}function Xi(d){y.setPlaybackRate(d),Uo(d),A.setSpeed(d)}async function Zi(){const d=_e(),w=a.start();ae("Run requested",{simClassId:r.id,values:d,manifestSource:i.getSource()});const T=await i.findNearestVideo(r.id,r.parameters,d);if(!a.isCurrent(w))return;_n({preserveRunRequest:!0}),h=T;const R=Ye(r,T),ie=Dr(i.getSource());dl({simulationId:r.id,parameters:d,manifestSource:i.getSource(),matchedRunId:T.runId,assetHostMode:ie.mode,assetHostBase:ie.base});const de=ca(T,R)??T.url,ge=Object.entries(T.views??{}).filter(([Le])=>Le!==R).map(([,Le])=>Le);ra(T.liveDataUrl,w),oa(T.summaryUrl,w),da(T.summaryUrl,w),y.setMuted(!0),wn(R),kt(),qe("initializing");const Ht=ea(de);y.resumePrewarming(),y.prewarmSources(ge);const Et=(async()=>{const Le=await Ht;a.isCurrent(w)&&(ae(`Prepared active video source: ${Le.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:de,waitsForBuffer:Le.shouldWaitForBuffer}),y.setSource(Le.src,{ownedObjectUrl:Le.ownedObjectUrl}),y.pause(),await y.waitForLoadedData(pl),a.isCurrent(w)&&Le.shouldWaitForBuffer&&await y.waitForBufferedAhead(hl,ml))})();await new Promise(Le=>{W.show(Wo(r),Le,Et,{minTerminalTimeMs:ha()})}),a.isCurrent(w)&&(k=!0,y.showMedia(),$n(y),qe("display"),pe())}async function ea(d){const w=Oe(d),T=await ta(d);if(T!==null&&T>0&&T<=js){ae("Downloading active video behind loading overlay",{videoUrl:w,contentLength:T});try{const R=await He(d);if(!R.ok)throw new Error(`Failed to download active video: ${w}`);const ie=await R.blob();return ae(`Active video full fetch complete: ${ie.size} bytes`,{videoUrl:Oe(d),blobType:ie.type}),{src:URL.createObjectURL(ie),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(R){Be(`Full-fetch FAILED; falling back to progressive: ${R instanceof Error?R.message:String(R)}`,{videoUrl:d})}}return T!==null?ae("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:d,contentLength:T,fullFetchMaxBytes:js}):ae("Could not determine active video size; using progressive load",{videoUrl:d}),ae("Using progressive active video load",{videoUrl:d}),{src:Oe(d),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ta(d){try{const w=await He(d,{headers:{Range:"bytes=0-0"}});ae("Probed active video size with range request",{videoUrl:d,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const T=sa(w.headers.get("Content-Length"));if(T!==null)return T;const R=na(w.headers.get("Content-Range"));return R!==null?R:null}catch(w){return Be("Could not probe active video size",{videoUrl:d,error:w instanceof Error?w.message:String(w)}),null}}function na(d){if(!d)return null;const w=d.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const T=Number(w[1]);return Number.isFinite(T)&&T>0?T:null}function sa(d){if(!d)return null;const w=Number(d);return Number.isFinite(w)?w:null}function qe(d){if(n.dataset.mode=d,d==="entry"?document.documentElement.setAttribute("data-theme","glass"):d==="display"&&Cn(o),St(L,d==="display"||d==="config"),St(M,d==="display"||d==="entry"),St(O,!t.lockedScaleId&&(d==="entry"||d==="config"||d==="display")),d==="entry"?Y(O):pn(O),d==="entry"&&!t.lockedScaleId?nt.show():nt.hide(),d==="config"?(W.hide(),N.setSimulation(r,_e()),N.show()):N.hide(),d!=="display")ue.hide();else if(c){const T=y.captureFrame();ue.update(r,_e(),y.getDurationSeconds(),l,T),ue.show()}!k||d==="initializing"?(y.hideMedia(),d==="initializing"&&y.pause()):y.showMedia(),d!=="initializing"&&W.hide(),vn(),pe()}function vn(){if(n.dataset.mode==="entry"){St(x,!0);return}const d=n.dataset.mode==="display",w=r.id==="galaxy",R=Ye(r,h)==="hst";St(x,d&&w&&R)}function We(d=0){const w=al(v,d,y.getDurationSeconds()),T=la(r,l,d,y.getDurationSeconds());we.update(r,_e(),{...w,...T})}function wn(d){const w=r.views.filter(ie=>{var de;return((de=h==null?void 0:h.views)==null?void 0:de[ie.id])!==void 0});if(w.length<=1){J.hide(),ne.classList.add("is-hidden");return}const T=d??Ye(r,h),R=w.find(ie=>ie.id===T);J.update(w,T),R?(ne.classList.remove("is-hidden"),ne.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):ne.classList.add("is-hidden")}function _n(d={}){d.preserveRunRequest||a.invalidate(),v=Xt,c=!1,l=null,h=null,g=0,B=!1,U=null,Re(),V!==null&&(cancelAnimationFrame(V),V=null),ue.hide(),J.hide(),y.pause(),S.pause(),y.clearPrewarmedSources(),y.resetPlayback(),A.setPosition(0),ms(),ps()}function fs(d){if(!(h!=null&&h.views)||d===Ye(r,h))return;const w=Oe(h.views[d]);if(!w)return;h.viewId=d;const T=!y.isPaused()&&!c,R=c?0:y.getPlaybackFraction();c=!1,ue.hide(),y.setSource(w,{seekFraction:R,autoplay:T}),y.prewarmSources(et()),T&&!B?$e():Ke(),wn(d),kt(),pe(),H.classList.remove("is-visible"),vn()}function _e(){return{...I[r.id]}}function ia(d){return Object.fromEntries(d.parameters.map(w=>[w.id,aa(w)]))}function aa(d){if(d.logScale){const de=Math.log10(d.min),ge=Math.log10(d.max);return 10**(de+Math.random()*(ge-de))}const w=Math.max(0,Math.round((d.max-d.min)/d.step)),T=Math.floor(Math.random()*(w+1)),R=d.min+T*d.step,ie=Ti(d.step);return Number(R.toFixed(ie))}async function ra(d,w){let T=Xt;try{T=await il(d)}catch(R){Be("Failed to load live stats",{url:d,error:R instanceof Error?R.message:String(R)})}a.isCurrent(w)&&(v=T,We())}async function oa(d,w){const T=await Go(d);a.isCurrent(w)&&(l=T,We(g))}function la(d,w,T,R){if(!w||!Number.isFinite(R)||R<=0)return{};const ie=Math.max(0,Math.min(1,T/R)),de={};for(const ge of d.metadata.liveStats){if(!ge.live||!ge.fromVideo||!ge.scaleWithTime)continue;const Ht=ge.videoKey??ge.id,Et=w[Ht];if(typeof Et!="number"||!Number.isFinite(Et))continue;const Sn=Et*ie;de[ge.id]=ge.integer?String(Math.floor(Sn)):String(Sn)}return de}function St(d,w){d.hidden=!w,d.classList.toggle("is-hidden",!w)}function Ye(d,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function ca(d,w){return!w||!d.views?null:d.views[w]??null}function hs(){const d=Ye(r,h);return d?r.views.some(w=>w.id===d&&w.audio):!1}function ua(d){return d.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function da(d,w){const T=ua(d),R=++b,ie=await fa(T);if(!(!a.isCurrent(w)||R!==b)){if(!ie){ms();return}u=Oe(T),f=!0,S.src!==u&&(S.pause(),S.src=u,S.load()),kt(),pe()}}async function fa(d){try{if((await He(d,{method:"HEAD"})).ok)return!0}catch{}try{return(await He(d,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function ms(){b+=1,u=null,f=!1,S.pause(),S.removeAttribute("src"),S.load(),kt()}function ps(){p=t.audioMutedByDefault,m=t.defaultAudioVolume,S.muted=p,S.volume=m,A.setMuted(p),A.setVolume(m)}function kt(){A.setAudioVisible(hs()&&f&&!!u),A.setMuted(p),A.setVolume(m)}function it(d=!1){if(!f||!Number.isFinite(S.duration)||S.duration<=0)return;const w=Math.max(0,Math.min(S.duration,y.getPlaybackFraction()*S.duration));(d||Math.abs(S.currentTime-w)>.35)&&(S.currentTime=w)}function pe(){const d=hs()&&f&&!!u;if(kt(),S.muted=p,S.volume=m,!d){S.pause();return}if(it(),n.dataset.mode!=="display"||y.isPaused()||c||B){S.pause();return}S.play().catch(()=>{p=!0,S.muted=!0,A.setMuted(!0)})}function gs(d){const w=new Set(Ro(d,e));return ot.filter(T=>w.has(T.id))}function ys(d){return d?ot.find(w=>w.id===d)??null:null}function ha(){return i.getSource()!=="local"?qn.MIN_TERMINAL_TIME_MS:ma(qn.MIN_TERMINAL_TIME_MS,gl)}function ma(d,w){const T=Math.ceil(Math.min(d,w)),R=Math.floor(Math.max(d,w));return Math.floor(Math.random()*(R-T+1))+T}function pa(d){const w=r.id,T=t.manifestSource;t=Oo(d,e),Us(t.verboseLogging),s=gs(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),F.setHomeVisible(!t.lockedScaleId),ue.setHomeVisible(!t.lockedScaleId),nt.setSimulationClasses(s),N.setAdvancedSettings(t),ae("Advanced settings updated",t),ps(),pe(),T!==t.manifestSource&&(h=null);const R=ys(t.lockedScaleId);R&&(us(R),R.id!==w&&(k=!1,y.hideMedia(),N.setView("parameters")),k||(yn(Bn[R.id]),N.setSimulation(r,_e())))}}function wl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");vl(n)}wl();
//# sourceMappingURL=main-DxVAXmFu.js.map
