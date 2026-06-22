(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const An=Symbol.for("yaml.alias"),wn=Symbol.for("yaml.document"),Pe=Symbol.for("yaml.map"),vs=Symbol.for("yaml.pair"),Le=Symbol.for("yaml.scalar"),rt=Symbol.for("yaml.seq"),ve=Symbol.for("yaml.node.type"),je=n=>!!n&&typeof n=="object"&&n[ve]===An,Dt=n=>!!n&&typeof n=="object"&&n[ve]===wn,_t=n=>!!n&&typeof n=="object"&&n[ve]===Pe,Q=n=>!!n&&typeof n=="object"&&n[ve]===vs,K=n=>!!n&&typeof n=="object"&&n[ve]===Le,St=n=>!!n&&typeof n=="object"&&n[ve]===rt;function J(n){if(n&&typeof n=="object")switch(n[ve]){case Pe:case rt:return!0}return!1}function z(n){if(n&&typeof n=="object")switch(n[ve]){case An:case Pe:case Le:case rt:return!0}return!1}const _s=n=>(K(n)||J(n))&&!!n.anchor,Be=Symbol("break visit"),xi=Symbol("skip children"),yt=Symbol("remove node");function ot(n,e){const t=Bi(e);Dt(n)?Xe(null,n.contents,t,Object.freeze([n]))===yt&&(n.contents=null):Xe(null,n,t,Object.freeze([]))}ot.BREAK=Be;ot.SKIP=xi;ot.REMOVE=yt;function Xe(n,e,t,s){const i=Vi(n,e,t,s);if(z(i)||Q(i))return Hi(n,s,i),Xe(n,i,t,s);if(typeof i!="symbol"){if(J(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=Xe(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Be)return Be;r===yt&&(e.items.splice(a,1),a-=1)}}}else if(Q(e)){s=Object.freeze(s.concat(e));const a=Xe("key",e.key,t,s);if(a===Be)return Be;a===yt&&(e.key=null);const r=Xe("value",e.value,t,s);if(r===Be)return Be;r===yt&&(e.value=null)}}return i}function Bi(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Vi(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(_t(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(St(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(Q(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(K(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(je(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function Hi(n,e,t){const s=e[e.length-1];if(J(s))s.items[n]=t;else if(Q(s))n==="key"?s.key=t:s.value=t;else if(Dt(s))s.contents=t;else{const i=je(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Di={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ui=n=>n.replace(/[!,[\]{}]/g,e=>Di[e]);class le{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},le.defaultYaml,e),this.tags=Object.assign({},le.defaultTags,t)}clone(){const e=new le(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new le(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:le.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},le.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:le.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},le.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ui(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&z(e.contents)){const a={};ot(e.contents,(r,o)=>{z(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}le.defaultYaml={explicit:!1,version:"1.2"};le.defaultTags={"!!":"tag:yaml.org,2002:"};function Ss(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function ks(n){const e=new Set;return ot(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Es(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function ji(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=ks(n));const r=Es(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(K(r.node)||J(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function Ze(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=Ze(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=Ze(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=Ze(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=Ze(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function we(n,e,t){if(Array.isArray(n))return n.map((s,i)=>we(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!_s(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class Cn{constructor(e){Object.defineProperty(this,ve,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Dt(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=we(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?Ze(a,{"":o},"",o):o}}class Mn extends Cn{constructor(e){super(An),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],ot(e,{Node:(a,r)=>{(je(r)||_s(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(we(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Ot(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Ss(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Ot(n,e,t){if(je(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(J(e)){let s=0;for(const i of e.items){const a=Ot(n,i,t);a>s&&(s=a)}return s}else if(Q(e)){const s=Ot(n,e.key,t),i=Ot(n,e.value,t);return Math.max(s,i)}return 1}const Is=n=>!n||typeof n!="function"&&typeof n!="object";class O extends Cn{constructor(e){super(Le),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:we(this.value,e,t)}toString(){return String(this.value)}}O.BLOCK_FOLDED="BLOCK_FOLDED";O.BLOCK_LITERAL="BLOCK_LITERAL";O.PLAIN="PLAIN";O.QUOTE_DOUBLE="QUOTE_DOUBLE";O.QUOTE_SINGLE="QUOTE_SINGLE";const Ki="tag:yaml.org,2002:";function qi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function wt(n,e,t){var d,p,m;if(Dt(n)&&(n=n.contents),z(n))return n;if(Q(n)){const b=(p=(d=t.schema[Pe]).createNode)==null?void 0:p.call(d,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new Mn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=Ki+e.slice(2));let l=qi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new O(n);return c&&(c.node=b),b}l=n instanceof Map?r[Pe]:Symbol.iterator in Object(n)?r[rt]:r[Pe]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((m=l==null?void 0:l.nodeClass)==null?void 0:m.from)=="function"?l.nodeClass.from(t.schema,n,t):new O(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function Ft(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return wt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const pt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Ls extends Cn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>z(s)||Q(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(pt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(J(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Ft(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(J(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&K(a)?a.value:a:J(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!Q(t))return!1;const s=t.value;return s==null||e&&K(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return J(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(J(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Ft(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Wi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Te(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const He=(n,e,t)=>n.endsWith(`
`)?Te(t,e):t.includes(`
`)?`
`+Te(t,e):(n.endsWith(" ")?"":" ")+t,Ns="flow",vn="block",Pt="quoted";function Ut(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):d=i-s);let p,m,b=!1,f=-1,g=-1,y=-1;t===vn&&(f=Zn(n,f,e.length),f!==-1&&(d=f+c));for(let I;I=n[f+=1];){if(t===Pt&&I==="\\"){switch(g=f,n[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}y=f}if(I===`
`)t===vn&&(f=Zn(n,f,e.length)),d=f+e.length+c,p=void 0;else{if(I===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const L=n[f+1];L&&L!==" "&&L!==`
`&&L!=="	"&&(p=f)}if(f>=d)if(p)l.push(p),d=p+c,p=void 0;else if(t===Pt){for(;m===" "||m==="	";)m=I,I=n[f+=1],b=!0;const L=f>y+1?f-2:g-1;if(u[L])return n;l.push(L),u[L]=!0,d=L+c,p=void 0}else b=!0}m=I}if(b&&o&&o(),l.length===0)return n;r&&r();let k=n.slice(0,l[0]);for(let I=0;I<l.length;++I){const L=l[I],_=l[I+1]||n.length;L===0?k=`
${e}${n.slice(0,_)}`:(t===Pt&&u[L]&&(k+=`${n[L]}\\`),k+=`
${e}${n.slice(L+1,_)}`)}return k}function Zn(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const jt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Kt=n=>/^(%|---|\.\.\.)/m.test(n);function Gi(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function bt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(Kt(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:Ut(r,a,Pt,jt(e,!1))}function _n(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return bt(n,e);const t=e.indent||(Kt(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Ut(s,t,Ns,jt(e,!1))}function et(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=bt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=_n:a&&!i?s=bt:s=t?_n:bt}return s(n,e)}let Sn;try{Sn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Sn=/\n+(?!\n|$)/g}function $t({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return et(t,s);const l=s.indent||(s.forceBlockIndent||Kt(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===O.BLOCK_FOLDED?!1:e===O.BLOCK_LITERAL?!0:!Gi(t,c,l.length);if(!t)return u?`|
`:`>
`;let d,p;for(p=t.length;p>0;--p){const _=t[p-1];if(_!==`
`&&_!=="	"&&_!==" ")break}let m=t.substring(p);const b=m.indexOf(`
`);b===-1?d="-":t===m||b!==m.length-1?(d="+",a&&a()):d="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(Sn,`$&${l}`));let f=!1,g,y=-1;for(g=0;g<t.length;++g){const _=t[g];if(_===" ")f=!0;else if(_===`
`)y=g;else break}let k=t.substring(0,y<g?y+1:g);k&&(t=t.substring(k.length),k=k.replace(/\n+/g,`$&${l}`));let L=(f?l?"2":"1":"")+d;if(n&&(L+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const _=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let S=!1;const N=jt(s,!0);r!=="folded"&&e!==O.BLOCK_FOLDED&&(N.onOverflow=()=>{S=!0});const v=Ut(`${k}${_}${m}`,l,vn,N);if(!S)return`>${L}
${l}${v}`}return t=t.replace(/\n+/g,`$&${l}`),`|${L}
${l}${k}${t}${m}`}function Yi(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return et(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?et(a,e):$t(n,e,t,s);if(!o&&!u&&i!==O.PLAIN&&a.includes(`
`))return $t(n,e,t,s);if(Kt(a)){if(c==="")return e.forceBlockIndent=!0,$t(n,e,t,s);if(o&&c===l)return et(a,e)}const d=a.replace(/\n+/g,`$&
${c}`);if(r){const p=f=>{var g;return f.default&&f.tag!=="tag:yaml.org,2002:str"&&((g=f.test)==null?void 0:g.test(d))},{compat:m,tags:b}=e.doc.schema;if(b.some(p)||m!=null&&m.some(p))return et(a,e)}return o?d:Ut(d,c,Ns,jt(e,!1))}function On(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==O.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=O.QUOTE_DOUBLE);const c=u=>{switch(u){case O.BLOCK_FOLDED:case O.BLOCK_LITERAL:return i||a?et(r.value,e):$t(r,e,t,s);case O.QUOTE_DOUBLE:return bt(r.value,e);case O.QUOTE_SINGLE:return _n(r.value,e);case O.PLAIN:return Yi(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:d}=e.options,p=i&&u||d;if(l=c(p),l===null)throw new Error(`Unsupported default string type ${p}`)}return l}function Ts(n,e){const t=Object.assign({blockQuote:!0,commentString:Wi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Ji(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(K(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function zi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(K(n)||J(n))&&n.anchor;a&&Ss(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function it(n,e,t,s){var c;if(Q(n))return n.toString(e,t,s);if(je(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=z(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=Ji(e.doc.schema.tags,a));const r=zi(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):K(a)?On(a,e,t,s):a.toString(e,t,s);return r?K(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Qi({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:d}}=t;let p=z(n)&&n.comment||null;if(d){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(J(n)||!z(n)&&typeof n=="object"){const N="With simple keys, collection cannot be used as a key value";throw new Error(N)}}let m=!d&&(!n||p&&e==null&&!t.inFlow||J(n)||(K(n)?n.type===O.BLOCK_FOLDED||n.type===O.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(d||!a),indent:o+c});let b=!1,f=!1,g=it(n,t,()=>b=!0,()=>f=!0);if(!m&&!t.inFlow&&g.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!d||e==null&&m)return g=`? ${g}`,p&&!b?g+=He(g,t.indent,l(p)):f&&i&&i(),g;b&&(p=null),m?(p&&(g+=He(g,t.indent,l(p))),g=`? ${g}
${o}:`):(g=`${g}:`,p&&(g+=He(g,t.indent,l(p))));let y,k,I;z(e)?(y=!!e.spaceBefore,k=e.commentBefore,I=e.comment):(y=!1,k=null,I=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&K(e)&&(t.indentAtStart=g.length+1),f=!1,!u&&c.length>=2&&!t.inFlow&&!m&&St(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let L=!1;const _=it(e,t,()=>L=!0,()=>f=!0);let S=" ";if(p||y||k){if(S=y?`
`:"",k){const N=l(k);S+=`
${Te(N,t.indent)}`}_===""&&!t.inFlow?S===`
`&&I&&(S=`

`):S+=`
${t.indent}`}else if(!m&&J(e)){const N=_[0],v=_.indexOf(`
`),A=v!==-1,F=t.inFlow??e.flow??e.items.length===0;if(A||!F){let B=!1;if(A&&(N==="&"||N==="!")){let P=_.indexOf(" ");N==="&"&&P!==-1&&P<v&&_[P+1]==="!"&&(P=_.indexOf(" ",P+1)),(P===-1||v<P)&&(B=!0)}B||(S=`
${t.indent}`)}}else(_===""||_[0]===`
`)&&(S="");return g+=S+_,t.inFlow?L&&s&&s():I&&!L?g+=He(g,t.indent,l(I)):f&&i&&i(),g}function As(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Nt="<<",Ce={identify:n=>n===Nt||typeof n=="symbol"&&n.description===Nt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new O(Symbol(Nt)),{addToJSMap:Cs}),stringify:()=>Nt},Xi=(n,e)=>(Ce.identify(e)||K(e)&&(!e.type||e.type===O.PLAIN)&&Ce.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Ce.tag&&t.default));function Cs(n,e,t){if(t=n&&je(t)?t.resolve(n.doc):t,St(t))for(const s of t.items)rn(n,e,s);else if(Array.isArray(t))for(const s of t)rn(n,e,s);else rn(n,e,t)}function rn(n,e,t){const s=n&&je(t)?t.resolve(n.doc):t;if(!_t(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function Ms(n,e,{key:t,value:s}){if(z(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Xi(n,t))Cs(n,e,s);else{const i=we(t,"",n);if(e instanceof Map)e.set(i,we(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Zi(t,i,n),r=we(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Zi(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(z(n)&&(t!=null&&t.doc)){const s=Ts(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),As(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Pn(n,e,t){const s=wt(n,void 0,t),i=wt(e,void 0,t);return new ce(s,i)}class ce{constructor(e,t=null){Object.defineProperty(this,ve,{value:vs}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return z(t)&&(t=t.clone(e)),z(s)&&(s=s.clone(e)),new ce(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return Ms(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Qi(this,e,t,s):JSON.stringify(this)}}function Os(n,e,t){return(e.inFlow??n.flow?ta:ea)(n,e,t)}function ea({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const p=[];for(let b=0;b<e.length;++b){const f=e[b];let g=null;if(z(f))!d&&f.spaceBefore&&p.push(""),xt(t,p,f.commentBefore,d),f.comment&&(g=f.comment);else if(Q(f)){const k=z(f.key)?f.key:null;k&&(!d&&k.spaceBefore&&p.push(""),xt(t,p,k.commentBefore,d))}d=!1;let y=it(f,u,()=>g=null,()=>d=!0);g&&(y+=He(y,a,l(g))),d&&g&&(d=!1),p.push(s+y)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let b=1;b<p.length;++b){const f=p[b];m+=f?`
${c}${f}`:`
`}}return n?(m+=`
`+Te(l(n),c),o&&o()):d&&r&&r(),m}function ta({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const d=[];for(let b=0;b<n.length;++b){const f=n[b];let g=null;if(z(f))f.spaceBefore&&d.push(""),xt(e,d,f.commentBefore,!1),f.comment&&(g=f.comment);else if(Q(f)){const k=z(f.key)?f.key:null;k&&(k.spaceBefore&&d.push(""),xt(e,d,k.commentBefore,!1),k.comment&&(l=!0));const I=z(f.value)?f.value:null;I?(I.comment&&(g=I.comment),I.commentBefore&&(l=!0)):f.value==null&&(k!=null&&k.comment)&&(g=k.comment)}g&&(l=!0);let y=it(f,c,()=>g=null);l||(l=d.length>u||y.includes(`
`)),b<n.length-1?y+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=d.reduce((k,I)=>k+I.length+2,2)+(y.length+2)>e.options.lineWidth)),l&&(y+=",")),g&&(y+=He(y,s,o(g))),d.push(y),u=d.length}const{start:p,end:m}=t;if(d.length===0)return p+m;if(!l){const b=d.reduce((f,g)=>f+g.length+2,2);l=e.options.lineWidth>0&&b>e.options.lineWidth}if(l){let b=p;for(const f of d)b+=f?`
${a}${i}${f}`:`
`;return`${b}
${i}${m}`}else return`${p}${r}${d.join(" ")}${r}${m}`}function xt({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=Te(e(s),n);t.push(a.trimStart())}}function De(n,e){const t=K(e)?e.value:e;for(const s of n)if(Q(s)&&(s.key===e||s.key===t||K(s.key)&&s.key.value===t))return s}class be extends Ls{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Pe,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(Pn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;Q(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ce(e,e==null?void 0:e.value):s=new ce(e.key,e.value);const i=De(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);K(i.value)&&Is(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=De(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=De(this.items,e),i=s==null?void 0:s.value;return(!t&&K(i)?i.value:i)??void 0}has(e){return!!De(this.items,e)}set(e,t){this.add(new ce(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)Ms(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!Q(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Os(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const lt={collection:"map",default:!0,nodeClass:be,tag:"tag:yaml.org,2002:map",resolve(n,e){return _t(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>be.from(n,e,t)};class Ue extends Ls{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(rt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Tt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Tt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&K(i)?i.value:i}has(e){const t=Tt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Tt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];K(i)&&Is(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(we(a,String(i++),t));return s}toString(e,t,s){return e?Os(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(wt(o,void 0,s))}}return a}}function Tt(n){let e=K(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ct={collection:"seq",default:!0,nodeClass:Ue,tag:"tag:yaml.org,2002:seq",resolve(n,e){return St(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Ue.from(n,e,t)},qt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),On(n,e,t,s)}},Wt={identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new O(null),stringify:({source:n},e)=>typeof n=="string"&&Wt.test.test(n)?n:e.options.nullStr},$n={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new O(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&$n.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Ie({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const Ps={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ie},$s={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ie(n)}},Rs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new O(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ie},Gt=n=>typeof n=="bigint"||Number.isInteger(n),Rn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Fs(n,e,t){const{value:s}=n;return Gt(s)&&s>=0?t+s.toString(e):Ie(n)}const xs={identify:n=>Gt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Rn(n,2,8,t),stringify:n=>Fs(n,8,"0o")},Bs={identify:Gt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Rn(n,0,10,t),stringify:Ie},Vs={identify:n=>Gt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Rn(n,2,16,t),stringify:n=>Fs(n,16,"0x")},na=[lt,ct,qt,Wt,$n,xs,Bs,Vs,Ps,$s,Rs];function es(n){return typeof n=="bigint"||Number.isInteger(n)}const At=({value:n})=>JSON.stringify(n),sa=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:At},{identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:At},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:At},{identify:es,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>es(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:At}],ia={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},aa=[lt,ct].concat(sa,ia),Fn={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=O.BLOCK_LITERAL),e!==O.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let d=0,p=0;d<l;++d,p+=c)u[d]=o.substr(p,c);o=u.join(e===O.BLOCK_LITERAL?`
`:" ")}return On({comment:n,type:e,value:o},s,i,a)}};function Hs(n,e){if(St(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!Q(s)){if(_t(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ce(new O(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=Q(s)?s:new ce(s)}}else e("Expected a sequence for this tag");return n}function Ds(n,e,t){const{replacer:s}=t,i=new Ue(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(Pn(o,c,t))}return i}const xn={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Hs,createNode:Ds};class nt extends Ue{constructor(){super(),this.add=be.prototype.add.bind(this),this.delete=be.prototype.delete.bind(this),this.get=be.prototype.get.bind(this),this.has=be.prototype.has.bind(this),this.set=be.prototype.set.bind(this),this.tag=nt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(Q(i)?(a=we(i.key,"",t),r=we(i.value,a,t)):a=we(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=Ds(e,t,s),a=new this;return a.items=i.items,a}}nt.tag="tag:yaml.org,2002:omap";const Bn={collection:"seq",identify:n=>n instanceof Map,nodeClass:nt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Hs(n,e),s=[];for(const{key:i}of t.items)K(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new nt,t)},createNode:(n,e,t)=>nt.from(n,e,t)};function Us({value:n,source:e},t){return e&&(n?js:Ks).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const js={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new O(!0),stringify:Us},Ks={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new O(!1),stringify:Us},ra={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ie},oa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ie(n)}},la={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new O(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Ie},kt=n=>typeof n=="bigint"||Number.isInteger(n);function Yt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function Vn(n,e,t){const{value:s}=n;if(kt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Ie(n)}const ca={identify:kt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Yt(n,2,2,t),stringify:n=>Vn(n,2,"0b")},ua={identify:kt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Yt(n,1,8,t),stringify:n=>Vn(n,8,"0")},da={identify:kt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Yt(n,0,10,t),stringify:Ie},fa={identify:kt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Yt(n,2,16,t),stringify:n=>Vn(n,16,"0x")};class st extends be{constructor(e){super(e),this.tag=st.tag}add(e){let t;Q(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ce(e.key,null):t=new ce(e,null),De(this.items,t.key)||this.items.push(t)}get(e,t){const s=De(this.items,e);return!t&&Q(s)?K(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=De(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ce(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(Pn(r,null,s));return a}}st.tag="tag:yaml.org,2002:set";const Hn={collection:"map",identify:n=>n instanceof Set,nodeClass:st,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>st.from(n,e,t),resolve(n,e){if(_t(n)){if(n.hasAllNullValues(!0))return Object.assign(new st,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function Dn(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function qs(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Ie(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Ws={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Dn(n,t),stringify:qs},Gs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Dn(n,!1),stringify:qs},Jt={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Jt.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let d=Dn(u,!1);Math.abs(d)<30&&(d*=60),l-=6e4*d}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},ts=[lt,ct,qt,Wt,js,Ks,ca,ua,da,fa,ra,oa,la,Fn,Ce,Bn,xn,Hn,Ws,Gs,Jt],ns=new Map([["core",na],["failsafe",[lt,ct,qt]],["json",aa],["yaml11",ts],["yaml-1.1",ts]]),ss={binary:Fn,bool:$n,float:Rs,floatExp:$s,floatNaN:Ps,floatTime:Gs,int:Bs,intHex:Vs,intOct:xs,intTime:Ws,map:lt,merge:Ce,null:Wt,omap:Bn,pairs:xn,seq:ct,set:Hn,timestamp:Jt},ha={"tag:yaml.org,2002:binary":Fn,"tag:yaml.org,2002:merge":Ce,"tag:yaml.org,2002:omap":Bn,"tag:yaml.org,2002:pairs":xn,"tag:yaml.org,2002:set":Hn,"tag:yaml.org,2002:timestamp":Jt};function on(n,e,t){const s=ns.get(e);if(s&&!n)return t&&!s.includes(Ce)?s.concat(Ce):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(ns.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Ce)),i.reduce((a,r)=>{const o=typeof r=="string"?ss[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(ss).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const ma=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class Un{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?on(e,"compat"):e?on(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?ha:{},this.tags=on(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,Pe,{value:lt}),Object.defineProperty(this,Le,{value:qt}),Object.defineProperty(this,rt,{value:ct}),this.sortMapEntries=typeof r=="function"?r:r===!0?ma:null}clone(){const e=Object.create(Un.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function pa(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ts(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(Te(l,""))}let r=!1,o=null;if(n.contents){if(z(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(Te(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=it(n.contents,i,()=>o=null,l);o&&(u+=He(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(it(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(Te(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(Te(a(l),"")))}return t.join(`
`)+`
`}class zt{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,ve,{value:wn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new le({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(zt.prototype,{[ve]:{value:wn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=z(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Ye(this.contents)&&this.contents.add(e)}addIn(e,t){Ye(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=ks(this);e.anchor=!t||s.has(t)?Es(t||"a",s):t}return new Mn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=k=>typeof k=="number"||k instanceof String||k instanceof Number,y=t.filter(g).map(String);y.length>0&&(t=t.concat(y)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:d,setAnchors:p,sourceObjects:m}=ji(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:d,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:m},f=wt(e,u,b);return o&&J(f)&&(f.flow=!0),p(),f}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ce(i,a)}delete(e){return Ye(this.contents)?this.contents.delete(e):!1}deleteIn(e){return pt(e)?this.contents==null?!1:(this.contents=null,!0):Ye(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return J(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return pt(e)?!t&&K(this.contents)?this.contents.value:this.contents:J(this.contents)?this.contents.getIn(e,t):void 0}has(e){return J(this.contents)?this.contents.has(e):!1}hasIn(e){return pt(e)?this.contents!==void 0:J(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ft(this.schema,[e],t):Ye(this.contents)&&this.contents.set(e,t)}setIn(e,t){pt(e)?this.contents=t:this.contents==null?this.contents=Ft(this.schema,Array.from(e),t):Ye(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new le({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new le({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new Un(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=we(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?Ze(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return pa(this,e)}}function Ye(n){if(J(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Ys extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class gt extends Ys{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class ga extends Ys{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const is=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function at(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,d="",p="",m=!1,b=!1,f=null,g=null,y=null,k=null,I=null,L=null,_=null;for(const v of n)switch(b&&(v.type!=="space"&&v.type!=="newline"&&v.type!=="comma"&&a(v.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),f&&(l&&v.type!=="comment"&&v.type!=="newline"&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),f=null),v.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&v.source.includes("	")&&(f=v),u=!0;break;case"comment":{u||a(v,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const A=v.source.substring(1)||" ";d?d+=p+A:d=A,p="",l=!1;break}case"newline":l?d?d+=v.source:(!L||t!=="seq-item-ind")&&(c=!0):p+=v.source,l=!0,m=!0,(g||y)&&(k=v),u=!0;break;case"anchor":g&&a(v,"MULTIPLE_ANCHORS","A node can have at most one anchor"),v.source.endsWith(":")&&a(v.offset+v.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=v,_??(_=v.offset),l=!1,u=!1,b=!0;break;case"tag":{y&&a(v,"MULTIPLE_TAGS","A node can have at most one tag"),y=v,_??(_=v.offset),l=!1,u=!1,b=!0;break}case t:(g||y)&&a(v,"BAD_PROP_ORDER",`Anchors and tags must be after the ${v.source} indicator`),L&&a(v,"UNEXPECTED_TOKEN",`Unexpected ${v.source} in ${e??"collection"}`),L=v,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&a(v,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=v,l=!1,u=!1;break}default:a(v,"UNEXPECTED_TOKEN",`Unexpected ${v.type} token`),l=!1,u=!1}const S=n[n.length-1],N=S?S.offset+S.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f&&(l&&f.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:L,spaceBefore:c,comment:d,hasNewline:m,anchor:g,tag:y,newlineAfterProp:k,end:N,start:_??N}}function vt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(vt(e.key)||vt(e.value))return!0}return!1;default:return!0}}function kn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&vt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Js(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||K(a)&&K(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const as="All mapping items must start at the same column";function ya({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??be,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const d of s.items){const{start:p,key:m,sep:b,value:f}=d,g=at(p,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),y=!g.found;if(y){if(m&&(m.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(c,"BAD_INDENT",as)),!g.anchor&&!g.tag&&!b){l=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||vt(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",as);t.atKey=!0;const k=g.end,I=m?n(t,m,g,i):e(t,k,p,null,g,i);t.schema.compat&&kn(s.indent,m,i),t.atKey=!1,Js(t,o.items,I)&&i(k,"DUPLICATE_KEY","Map keys must be unique");const L=at(b??[],{indicator:"map-value-ind",next:f,offset:I.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(c=L.end,L.found){y&&((f==null?void 0:f.type)==="block-map"&&!L.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<L.found.offset-1024&&i(I.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const _=f?n(t,f,L,i):e(t,c,b,null,L,i);t.schema.compat&&kn(s.indent,f,i),c=_.range[2];const S=new ce(I,_);t.options.keepSourceTokens&&(S.srcToken=d),o.items.push(S)}else{y&&i(I.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),L.comment&&(I.comment?I.comment+=`
`+L.comment:I.comment=L.comment);const _=new ce(I);t.options.keepSourceTokens&&(_.srcToken=d),o.items.push(_)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function ba({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Ue,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:d}of s.items){const p=at(u,{indicator:"seq-item-ind",next:d,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||d)(d==null?void 0:d.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=p.end,p.comment&&(o.comment=p.comment);continue}const m=d?n(t,d,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&kn(s.indent,d,i),c=m.range[2],o.items.push(m)}return o.range=[s.offset,c,l??c],o}function Et(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const ln="Block collections are not allowed within flow collections",cn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function wa({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?be:Ue),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let y=0;y<s.items.length;++y){const k=s.items[y],{start:I,key:L,sep:_,value:S}=k,N=at(I,{flow:o,indicator:"explicit-key-ind",next:L??(_==null?void 0:_[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!_&&!S){y===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):y<s.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),N.comment&&(l.comment?l.comment+=`
`+N.comment:l.comment=N.comment),d=N.end;continue}!r&&t.options.strict&&vt(L)&&i(L,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(y===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${o} items`),N.comment){let v="";e:for(const A of I)switch(A.type){case"comma":case"space":break;case"comment":v=A.source.substring(1);break e;default:break e}if(v){let A=l.items[l.items.length-1];Q(A)&&(A=A.value??A.key),A.comment?A.comment+=`
`+v:A.comment=v,N.comment=N.comment.substring(v.length+1)}}if(!r&&!_&&!N.found){const v=S?n(t,S,N,i):e(t,N.end,_,null,N,i);l.items.push(v),d=v.range[2],cn(S)&&i(v.range,"BLOCK_IN_FLOW",ln)}else{t.atKey=!0;const v=N.end,A=L?n(t,L,N,i):e(t,v,I,null,N,i);cn(L)&&i(A.range,"BLOCK_IN_FLOW",ln),t.atKey=!1;const F=at(_??[],{flow:o,indicator:"map-value-ind",next:S,offset:A.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(F.found){if(!r&&!N.found&&t.options.strict){if(_)for(const $ of _){if($===F.found)break;if($.type==="newline"){i($,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<F.found.offset-1024&&i(F.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&((g=S.source)==null?void 0:g[0])===":"?i(S,"MISSING_CHAR",`Missing space after : in ${o}`):i(F.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const B=S?n(t,S,F,i):F.found?e(t,F.end,_,null,F,i):null;B?cn(S)&&i(B.range,"BLOCK_IN_FLOW",ln):F.comment&&(A.comment?A.comment+=`
`+F.comment:A.comment=F.comment);const P=new ce(A,B);if(t.options.keepSourceTokens&&(P.srcToken=k),r){const $=l;Js(t,$.items,A)&&i(v,"DUPLICATE_KEY","Map keys must be unique"),$.items.push(P)}else{const $=new be(t.schema);$.flow=!0,$.items.push(P);const X=(B??A).range;$.range=[A.range[0],X[1],X[2]],l.items.push($)}d=B?B.range[2]:F.end}}const p=r?"}":"]",[m,...b]=s.end;let f=d;if((m==null?void 0:m.source)===p)f=m.offset+m.source.length;else{const y=o[0].toUpperCase()+o.substring(1),k=u?`${y} must end with a ${p}`:`${y} in block collection must be sufficiently indented and end with a ${p}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",k),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const y=Et(b,f,t.options.strict,i);y.comment&&(l.comment?l.comment+=`
`+y.comment:l.comment=y.comment),l.range=[s.offset,f,y.offset]}else l.range=[s.offset,f,f];return l}function un(n,e,t,s,i,a){const r=t.type==="block-map"?ya(n,e,t,s,a):t.type==="block-seq"?ba(n,e,t,s,a):wa(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function va(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,f=m&&a?m.offset>a.offset?m:a:m??a;f&&(!b||b.offset<f.offset)&&i(f,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===be.tagName&&o==="map"||r===Ue.tagName&&o==="seq")return un(n,e,t,i,r);let c=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!c){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),c=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),un(n,e,t,i,r)}const l=un(n,e,t,i,r,c),u=((p=c.resolve)==null?void 0:p.call(c,l,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??l,d=z(u)?u:new O(u);return d.range=l.range,d.tag=r,c!=null&&c.format&&(d.format=c.format),d}function _a(n,e,t){const s=e.offset,i=Sa(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?O.BLOCK_FOLDED:O.BLOCK_LITERAL,r=e.source?ka(e.source):[];let o=r.length;for(let f=r.length-1;f>=0;--f){const g=r[f][1];if(g===""||g==="\r")o=f;else break}if(o===0){const f=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:f,type:a,comment:i.comment,range:[s,g,g]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let f=0;f<o;++f){const[g,y]=r[f];if(y===""||y==="\r")i.indent===0&&g.length>c&&(c=g.length);else{g.length<c&&t(l+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=g.length),u=f,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=g.length+y.length+1}for(let f=r.length-1;f>=o;--f)r[f][0].length>c&&(o=f+1);let d="",p="",m=!1;for(let f=0;f<u;++f)d+=r[f][0].slice(c)+`
`;for(let f=u;f<o;++f){let[g,y]=r[f];l+=g.length+y.length+1;const k=y[y.length-1]==="\r";if(k&&(y=y.slice(0,-1)),y&&g.length<c){const L=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-y.length-(k?2:1),"BAD_INDENT",L),g=""}a===O.BLOCK_LITERAL?(d+=p+g.slice(c)+y,p=`
`):g.length>c||y[0]==="	"?(p===" "?p=`
`:!m&&p===`
`&&(p=`

`),d+=p+g.slice(c)+y,p=`
`,m=!0):y===""?p===`
`?d+=`
`:p=`
`:(d+=p+y,p=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let f=o;f<r.length;++f)d+=`
`+r[f][0].slice(c);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const b=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,b,b]}}function Sa({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:c===-1&&(c=n+p)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",d=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":l=!0;case"newline":d+=m.source.length;break;case"comment":t&&!l&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),d+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const f=m.source;f&&typeof f=="string"&&(d+=f.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function ka(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function Ea(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(p,m,b)=>t(s+p,m,b);switch(i){case"scalar":o=O.PLAIN,c=Ia(a,l);break;case"single-quoted-scalar":o=O.QUOTE_SINGLE,c=La(a,l);break;case"double-quoted-scalar":o=O.QUOTE_DOUBLE,c=Na(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=Et(r,u,e,t);return{value:c,type:o,comment:d.comment,range:[s,u,d.offset]}}function Ia(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),zs(n)}function La(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),zs(n.slice(1,-1)).replace(/''/g,"'")}function zs(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function Na(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=Ta(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Aa[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Ca(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Ta(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Aa={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Ca(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Qs(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?_a(n,e,s):Ea(e,n.options.strict,s),c=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[Le]:c?l=Ma(n.schema,i,c,t,s):e.type==="scalar"?l=Oa(n,i,e,s):l=n.schema[Le];let u;try{const d=l.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=K(d)?d:new O(d)}catch(d){const p=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",p),u=new O(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function Ma(n,e,t,s,i){var o;if(t==="!")return n[Le];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Le])}function Oa({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[Le];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[Le];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function Pa(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const $a={composeNode:Xs,composeEmptyNode:jn};function Xs(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=Ra(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=Qs(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=va($a,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(d){const p=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return l??(l=jn(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!K(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function jn(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:Pa(e,t,s),indent:-1,source:""},d=Qs(n,u,o,l);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=c),d}function Ra({options:n},{offset:e,source:t,end:s},i){const a=new Mn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Et(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Fa(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new zt(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=at(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Xs(l,i,u,r):jn(l,u.end,s,null,u,r);const d=c.contents.range[2],p=Et(a,d,!1,r);return p.comment&&(c.comment=p.comment),c.range=[t,d,p.offset],c}function ft(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function rs(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class xa{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=ft(t);a?this.warnings.push(new ga(r,s,i)):this.errors.push(new gt(r,s,i))},this.directives=new le({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=rs(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(J(a)&&!a.flow&&a.items.length>0){let r=a.items[0];Q(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:rs(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=ft(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Fa(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new gt(ft(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new gt(ft(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Et(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new gt(ft(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new zt(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Zs="\uFEFF",ei="",ti="",En="";function Ba(n){switch(n){case Zs:return"byte-order-mark";case ei:return"doc-mode";case ti:return"flow-error-end";case En:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function ke(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const os=new Set("0123456789ABCDEFabcdef"),Va=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ct=new Set(",[]{}"),Ha=new Set(` ,[]{}
\r	`),dn=n=>!n||Ha.has(n);class Da{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&ke(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Zs&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield ei,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&ke(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!ke(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&ke(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(dn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&ke(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield ti,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(dn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||ke(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>ke(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield En,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(ke(a)||e&&Ct.has(a))break;t=s}else if(ke(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Ct.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Ct.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield En,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(dn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(ke(t)||e&&Ct.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!ke(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Va.has(t))t=this.buffer[++e];else if(t==="%"&&os.has(this.buffer[e+1])&&os.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Ua{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Oe(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function ls(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function ni(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Mt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Je(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function cs(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Oe(e.start,"explicit-key-ind")&&!Oe(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,ni(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class ja{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Da,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Ba(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&cs(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&ls(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{ls(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Mt(this.peek(2)),s=Je(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Oe(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(ni(t.key)&&!Oe(t.sep,"newline")){const o=Je(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Oe(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=Je(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Oe(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Oe(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Oe(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Mt(s),a=Je(i);cs(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Mt(e),s=Je(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Mt(e),s=Je(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Ka(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Ua||null,prettyErrors:e}}function qa(n,e={}){const{lineCounter:t,prettyErrors:s}=Ka(e),i=new ja(t==null?void 0:t.addNewLine),a=new xa(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new gt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(is(n,t)),r.warnings.forEach(is(n,t))),r}function Me(n,e,t){let s;const i=qa(n,t);if(!i)return null;if(i.warnings.forEach(a=>As(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Wa=`# Simulation family catalog source-of-truth.
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
  views:
    - id: gas_density
      label: Gas Density
      icon: gas-density
      description: The density of gas in the Universe. A gas collapses onto the cosmic wev — the largest structures in the Universe. Bright knots are galaxy clusters and groups, the wispy threads are filaments of gas stretching between them, and the dark empty patches are vast cosmic voids separating them.
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
`,Ga=`# Parameter definitions for each simulation family.
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
    display_format: scientific
    display_significant_figures: 3
  black_hole_mass:
    label: Black Hole Mass
    description: How heavy is the monster at the centre? Every large galaxy harbours a supermassive black hole — this slider controls how big yours grew over cosmic time.
    unit: '×10⁶ M☉'
    min: 0.1
    max: 250
    value_scale: 1.0e6
    display_unit: Msun
    display_format: scientific
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
    display_format: scientific
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
    # display_format: scientific
    display_significant_figures: 2
    log_scale: true
`,Ya=`# Summary overlay display configuration for each simulation family.
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
      display_format: scientific
      precision: 3
      description: How many stars your galaxy managed to make. Each solar mass is the weight of our own Sun.
    - id: black_hole_mass
      label: Black hole mass
      target: 4.3
      unit: Msun
      value_scale: 1.0e6
      display_format: scientific
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
      display_format: scientific
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
`,Ja=`# Live telemetry HUD display configuration for each simulation family.
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
`;function ee(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const za=Me(Wa),Qa=Me(Ga),us=Me(Ya),Xa=Me(Ja),ze=Object.entries(za).map(([n,e])=>{var r,o;const t=Za(us[n]),s=(((r=us[n])==null?void 0:r.results)??[]).map(er),i=((o=Xa[n])==null?void 0:o.liveStats)??[],a=Qa[n]??{};return{id:n,label:e.label,placeholderImage:ee(e.placeholderImage),metadata:{distinctSimulations:e.metadata.distinctSimulations,correctValues:e.metadata.correctValues,results:s,summaryStats:t.map(In),liveStats:i.map(In)},parameters:Object.entries(a).map(([c,l])=>{const u=l.step??tr(l.min,l.max),d=l.log_scale?Math.sqrt(l.min*l.max):nr(l.min,l.max);return{id:c,label:l.label,unit:l.unit??"",min:l.min,max:l.max,step:u,fallbackValue:d,description:l.description,valueScale:l.value_scale,displayUnit:l.display_unit,displayFormat:l.display_format,displaySignificantFigures:l.display_significant_figures,logScale:l.log_scale}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,description:c.description}))}});function Za(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function In(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function er(n){return{...In(n),target:n.target}}function tr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function nr(n,e){return n+(e-n)/2}const si="universe-engine-theme",ii=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function sr(){const n=localStorage.getItem(si);return ar(n)?n:"glass"}function fn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(si,n)}function ir(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of ii){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function ar(n){return ii.some(e=>e.id===n)}function rr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,c=!1;const l=new Map,u=new Map,d=new Map;let p=null,m=null;const b=document.createElement("canvas"),f=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function y(){p&&(URL.revokeObjectURL(p),p=null)}function k(E,C={}){const U=u.get(E);U&&(u.delete(E),C={...C,ownedObjectUrl:!0},E=U),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(E)){s.classList.remove("fade-out");return}const G=s.muted,V=C.seekFraction;y(),m=null,p=C.ownedObjectUrl?E:null,s.src=E,s.load(),s.onloadeddata=()=>{if(s.muted=G,V!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const re=Math.max(0,Math.min(.999,V));s.currentTime=re*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),C.autoplay&&s.play().catch(()=>{})}},120)}function I(E){s.muted=E}async function L(){await s.play()}function _(){s.pause()}function S(){s.classList.add("is-empty")}function N(){s.classList.remove("is-empty")}function v(E){if(!Number.isFinite(s.duration)||s.duration<=0)return;const C=Math.max(0,Math.min(1,E));s.currentTime=C*s.duration}function A(){s.currentTime=0,i==null||i(0)}function F(E=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(C=>{const U=()=>{V(),C()},G=window.setTimeout(()=>{V(),C()},Math.max(0,E));function V(){window.clearTimeout(G),s.removeEventListener("loadeddata",U)}s.addEventListener("loadeddata",U,{once:!0})})}function B(E,C=8e3){const U=Math.max(0,E);return U===0||P(U)?Promise.resolve():new Promise(G=>{const V=()=>{P(U)&&(H(),G())},re=window.setTimeout(()=>{H(),G()},Math.max(0,C));function H(){window.clearTimeout(re),s.removeEventListener("progress",V),s.removeEventListener("canplay",V),s.removeEventListener("loadeddata",V)}s.addEventListener("progress",V),s.addEventListener("canplay",V),s.addEventListener("loadeddata",V),V()})}function P(E){const C=s.currentTime;for(let U=0;U<s.buffered.length;U+=1){const G=s.buffered.start(U),V=s.buffered.end(U);if(!(C<G||C>V))return V-C>=E}return!1}function $(E){o=new Set(E.filter(Boolean).filter(C=>C!==s.currentSrc)),c||te()}function X(){c=!0,ge(),pe()}function Z(){if(!c){te();return}c=!1,te()}function te(){for(const[E,C]of l.entries())o.has(E)||(C.removeAttribute("src"),C.load(),l.delete(E));for(const[E,C]of d.entries())o.has(E)||(C.abort(),d.delete(E));for(const E of o){if(!l.has(E)){const C=document.createElement("video");C.preload="auto",C.muted=!0,C.playsInline=!0,C.src=E,C.load(),l.set(E,C)}u.has(E)||d.has(E)||ue(E)}}function ge(){for(const E of l.values())E.removeAttribute("src"),E.load();l.clear()}function pe(){for(const E of d.values())E.abort();d.clear()}function ue(E){const C=new AbortController;d.set(E,C);const U=`${E}?_=${Date.now()}`;fetch(U,{signal:C.signal}).then(async G=>{if(!G.ok)return;const V=await G.blob();o.has(E)&&u.set(E,URL.createObjectURL(V))}).catch(G=>{G instanceof DOMException&&G.name}).finally(()=>{d.get(E)===C&&d.delete(E)})}function W(){o.clear(),c=!1,ge(),pe();for(const E of u.values())URL.revokeObjectURL(E);u.clear()}function ne(E){return u.get(E)??null}function se(){!f||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(b.width=s.videoWidth,b.height=s.videoHeight,f.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85))}function ae(){return m||se(),m}function x(E){i=E}function q(E){a=E}return{setSource:k,setMuted:I,play:L,pause:_,hideMedia:S,showMedia:N,seekToFraction:v,resetPlayback:A,waitForLoadedData:F,waitForBufferedAhead:B,onTimeUpdate:x,onEnded:q,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:E=>{g=E,s.playbackRate=E},getPlaybackRate:()=>g,onPlayStateChange:E=>{r=E},getElement:()=>t,prewarmSources:$,suspendPrewarming:X,resumePrewarming:Z,clearPrewarmedSources:W,getPrewarmedBlobUrl:ne,captureFrame:ae}}const or=[.25,.5,1,2];function lr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onScrubStart:a,onScrubEnd:r,initialSpeed:o=1}=e,c=document.createElement("div");c.className="timeline";const l=document.createElement("div");l.className="timeline__bar-row";const u=document.createElement("button");u.className="timeline__play-btn",u.type="button",u.setAttribute("aria-label","Toggle playback"),u.addEventListener("click",()=>s==null?void 0:s());const d=document.createElement("input");d.className="timeline__slider",d.type="range",d.min="0",d.max="1000",d.step="1",d.value="0",d.style.setProperty("--fill","0%"),d.setAttribute("aria-label","Simulation time");const p=document.createElement("div");p.className="timeline__speed";const m=document.createElement("button");m.className="timeline__speed-btn",m.type="button",m.setAttribute("aria-label","Playback speed"),m.addEventListener("click",()=>{p.classList.toggle("open")});const b=document.createElement("div");b.className="timeline__speed-menu";for(const g of or){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=hn(g),y.addEventListener("click",()=>{p.classList.remove("open"),i==null||i(g)}),b.appendChild(y)}return p.appendChild(m),p.appendChild(b),l.appendChild(u),l.appendChild(d),l.appendChild(p),d.addEventListener("input",()=>{const g=parseInt(d.value,10)/1e3;d.style.setProperty("--fill",`${g*100}%`),t==null||t(g)}),d.addEventListener("pointerdown",()=>a==null?void 0:a()),d.addEventListener("pointerup",()=>r==null?void 0:r()),d.addEventListener("change",()=>r==null?void 0:r()),document.addEventListener("click",g=>{p.contains(g.target)||p.classList.remove("open")}),c.appendChild(l),n.appendChild(c),f(o),{setPosition(g){const y=Math.max(0,Math.min(1,g));d.value=String(Math.round(y*1e3)),d.style.setProperty("--fill",`${y*100}%`)},setPlaying(g){u.textContent=g?"⏸":"▶",u.classList.toggle("is-paused",!g),u.setAttribute("aria-label",g?"Pause":"Play")},setSpeed(g){f(g)}};function f(g){m.textContent=hn(g);for(const y of b.children)y.classList.toggle("is-active",y.textContent===hn(g))}}function hn(n){return`x${n}`}function cr(n,e){const t=Math.min(ai(e),2);return n.toFixed(t)}function Ee(n,e){return e?`${n} ${e}`:n}function Bt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?ht(n):e<1e6?`${t}${ht(n/1e3)}K`:e<1e9?`${t}${ht(n/1e6)}M`:e<1e12?`${t}${ht(n/1e9)}B`:`${t}${ht(n/1e12)}T`:String(n)}function ht(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ur(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Vt(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"){const o=Math.max(1,e.precision??3);return a.toExponential(o-1).replace("e+","e").replace(/\.0+e/,"e")}const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function tt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;if(t.format==="compact")return Bt(i);if(t.format==="scientific"){const r=Math.max(1,t.significantFigures??3);return i.toExponential(r-1).replace("e+","e").replace(/\.0+e/,"e")}return cr(i,a)}function ai(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function dr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=fr(s,i,a);for(const o of s.metadata.liveStats){const c=mr(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function fr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:tt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:hr(a),value:r}]))}}function hr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function mr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=pr((i==null?void 0:i.value)??t.value??n.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Ee(a,n.unit)}}function pr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Bt(Math.round(a)):Bt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):ur(n,{integer:e.integer})}function gr(n,e,t){const s=ee("assets/banner-1600.webp"),i=[`${ee("assets/banner-960.webp")} 960w`,`${ee("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(l){o.innerHTML="";for(const u of l){const d=document.createElement("button");d.className="entry-overlay__button",d.type="button",d.innerHTML=`
        <span class="entry-overlay__button-label">${u.label}</span>
      `,d.addEventListener("click",()=>t(u)),o.appendChild(d)}}return c(e),r.appendChild(o),a.appendChild(r),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(l){c(l)}}}function yr(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(_=>[_.id,_.target])),a=n.metadata.results.map(_=>{const S=pn(n,e,s,_.id);return S===null?null:{id:_.id,value:S,target:_.target}}).filter(_=>_!==null),r=n.parameters.filter(_=>i[_.id]!==void 0).map(_=>{const S=e[_.id]??_.fallbackValue,N=i[_.id]??_.fallbackValue;return Math.abs(S-N)/Math.max(_.max-_.min,1e-9)}),o=r.reduce((_,S)=>_+S,0)/Math.max(r.length,1),c=vr(a),l=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${mn(u,1)} CPU-hrs
${mn(d,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,f=String(n.parameters.length+6),g="Present",y=wr((s==null?void 0:s.wallclockSeconds)??t),k=ds(fs(pn(n,e,s,"moon_iron"))),I=ds(fs(pn(n,e,s,"proto_earth_in_moon"))),L=_r(n.id,e);return{scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:y},similarityScore:{label:"Similarity Score",value:`${c}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:l},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:mn(d,1)},particlesUpdated:{label:"Particle updates",value:s?br(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:k},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:I},scenario_likelihood:{label:"Scenario likelihood",value:L},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:f},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([_,S])=>[_,{label:S.label,value:S.value}]))}}function br(n){return String(Math.max(0,n))}function wr(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function mn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function pn(n,e,t,s){var c;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=t==null?void 0:t.parameterValues[s];if(typeof a=="number"&&Number.isFinite(a))return a;const r=(c=t==null?void 0:t.summaryMetrics[s])==null?void 0:c.value;if(r===void 0)return null;const o=Number(r);return Number.isFinite(o)?o:null}function ds(n){return n===null?"--":n.toFixed(1)}function fs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function vr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}function _r(n,e){if(n!=="planetary")return"--";const t=e.impactor_velocity,s=e.impactor_angle;if(!Number.isFinite(t)||!Number.isFinite(s))return"--";const i=Math.abs(t-15)*6,a=Math.abs(s-45)*1.6,r=Math.max(0,Math.round(100-i-a));return String(r)}const Ln={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},Sr={HIDE_AFTER_MS:980},kr="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",Er="https://universe-engine.universe-engine.workers.dev/api/track-run",Ir=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,hs=(()=>{const n=Me(Ir),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Ht="#4CD98A",Nn="#E8951C",ri="#D7372A",oi=.2,li=.5,ms=2;function ci(n){const e=Math.abs(n-1);return e<=oi?{word:"On target",colour:Ht}:e<=li?{word:n>1?"Too high":"Too low",colour:Nn}:{word:n>1?"Way too high":"Way too low",colour:ri}}function Lr(n){const e=Math.abs(n-1),t=n>=1;return e<=oi?t?"greenHigh":"greenLow":e<=li?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Nr(n){return Math.min(Math.max(n,0),ms)/ms*100}function Tr(n){return n>=85?{word:"Almost perfect",colour:Ht}:n>=65?{word:"Really close",colour:Ht}:n>=45?{word:"Getting there",colour:Nn}:n>=25?{word:"Not quite",colour:Nn}:{word:"Way off - try again",colour:ri}}function Ar(n,e,t){var r,o;const s=Lr(t),i=((r=hs[n])==null?void 0:r[s])??((o=hs[e])==null?void 0:o[s]);return i||(ci(t).colour===Ht?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Cr(n,e,t){return n.metadata.results.map(s=>{const i=Mr(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=Or(s,n,t),o=Ar(s.id,r,a),c=Ee(ui(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:c,detail:o}}).filter(s=>s!==null)}function Mr(n,e,t,s){var l;const i=n.id,a=e.parameters.find(u=>u.id===i);if(a)return t[i]??a.fallbackValue;const r=s==null?void 0:s.parameterValues[i];if(typeof r=="number"&&Number.isFinite(r))return r;const o=ps((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);return o!==null?o:ps(n.value)}function Or(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function ps(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Pr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function $r(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const c=document.createElement("p");c.className="summary-overlay__hint",c.textContent="Select any card for more details",a.appendChild(o),a.appendChild(c);const l=document.createElement("div");l.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button summary-overlay__button--primary",u.type="button",u.textContent="Continue Exploring";const d=document.createElement("button"),p=document.createElement("button");d.className="summary-overlay__button",d.type="button",d.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),l.appendChild(u),l.appendChild(d),l.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(l),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),f=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),y=m.querySelector(".sci-modal__close");function k(S){const N=ci(S.value);b.textContent=S.label,f.textContent=N.word,f.style.color=N.colour,f.hidden=!1,g.textContent=S.detail,m.classList.remove("is-hidden")}function I(S,N){b.textContent=S,f.hidden=!0,g.textContent=N,m.classList.remove("is-hidden")}function L(){m.classList.add("is-hidden")}y.addEventListener("click",L),m.addEventListener("click",S=>{S.target===m&&L()});function _(S,N){const v=document.createElement("div");v.className=`${S.className} panel`,v.innerHTML=`<p class="sci-section__title">${S.title}</p>`;const A=document.createElement("div"),F=S.singleRow?Math.max(1,S.stats.length):Math.max(1,Math.min(S.stats.length,S.maxColumns));A.className="metric-grid",S.singleRow&&A.classList.add("metric-grid--single-row"),A.style.setProperty("--summary-grid-columns",String(F)),A.style.setProperty("--summary-grid-max-width",`${S.maxWidthRem}rem`);for(const B of S.stats){const P=Rr(B,N),$=document.createElement("div"),X=document.createElement("span"),Z=document.createElement("span");$.className="res-card",X.className="res-card__label",X.textContent=P.label,Z.className="res-card__value",Z.textContent=P.value,$.appendChild(X),$.appendChild(Z),B.description&&($.classList.add("res-card--has-info"),$.addEventListener("click",()=>{I(P.label,B.description)})),A.appendChild($)}return v.appendChild(A),v}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},Sr.HIDE_AFTER_MS)},setHomeVisible(S){p.hidden=!S},update(S,N,v,A,F){var ae;r.innerHTML="",L();const B=yr(S,N,v,A),P=S.metadata.summaryStats,$=Cr(S,N,A),X=new Set($.map(x=>x.id));let Z;if($.length>0)Z=Pr($);else{const x=((ae=B.similarityScore)==null?void 0:ae.value)??"0/100";Z=parseInt(x,10)||0}const te=Tr(Z),ge=document.createElement("div"),pe=document.createElement("div"),ue=document.createElement("div");ge.className="sci-top",pe.className="summary-main-column",ue.className="summary-side-column";const W=document.createElement("div");W.className="sci-hero panel",F?(W.classList.add("sci-hero--thumbnail"),W.innerHTML=`<img class="sci-hero__thumbnail" src="${F}" alt="Final frame of simulation" />`):W.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${Z}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${te.colour}">${te.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${Z}%; background:${te.colour}; box-shadow:0 0 12px ${te.colour}"></div>
          </div>
        `,pe.appendChild(W);const ne=P.filter(x=>(x.section??"resources")==="resources"&&!$.some(q=>q.id===String(x.id))&&x.id!=="similarityScore"),se=P.filter(x=>x.section==="simulationStats"&&!X.has(String(x.id)));if(ne.length>0&&ue.appendChild(_({title:"Resources Used",className:"res-section",stats:ne,maxColumns:3,maxWidthRem:48},B)),se.length>0&&ue.appendChild(_({title:"Simulation Stats",className:"res-section",stats:se,maxColumns:se.length,maxWidthRem:48,singleRow:!0},B)),ge.appendChild(pe),ue.childElementCount>0&&ge.appendChild(ue),r.appendChild(ge),$.length>0){const x=document.createElement("div");x.className="sci-bottom-row";const q=document.createElement("div");q.className="sci-section panel param-section",q.innerHTML='<p class="sci-section__title">Input Parameters</p>';const E=document.createElement("div");E.className="param-cards";for(const H of S.parameters){const de=N[H.id]??H.fallbackValue,Ne=H.displayUnit??H.unit,ye=document.createElement("div"),T=document.createElement("span"),D=document.createElement("span");ye.className="res-card",H.description&&(ye.classList.add("res-card--has-info"),ye.addEventListener("click",()=>I(H.label,H.description))),T.className="res-card__label",T.textContent=H.label,D.className="res-card__value";const Y=tt(de,H.step,{scale:H.valueScale,format:H.displayFormat,significantFigures:H.displaySignificantFigures});D.textContent=Ee(Y,Ne),ye.appendChild(T),ye.appendChild(D),E.appendChild(ye)}q.appendChild(E);const C=document.createElement("div"),U=document.createElement("div"),G=document.createElement("p"),V=document.createElement("p");C.className="sci-section panel",U.className="sci-section__header",G.className="sci-section__title",G.textContent="Similarity Results",V.className="sci-section__hint",V.textContent="Select any bar for details",U.appendChild(G),U.appendChild(V);const re=document.createElement("div");re.className="sci-bars";for(const H of $){const de=document.createElement("div");de.className="sci-bar",de.innerHTML=`
            <div class="sci-bar__name">${H.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Nr(H.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${H.formattedValue}</div>
          `,de.addEventListener("click",()=>k(H)),re.appendChild(de)}C.appendChild(U),C.appendChild(re),x.appendChild(q),x.appendChild(C),r.appendChild(x)}}}}function Rr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:n.value??"--",i=Fr(s,n);if(i)return{label:n.label??t.label,value:i};const a=ui(s,n);return{label:n.label??t.label,value:Ee(a,n.unit)}}function Fr(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Ee(Vt(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Ee(Vt(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Ee(n,e.unit)}function ui(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="float")return Vt(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return Vt(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Bt(i)}function xr(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const c=Br(a.icon);if(c){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(c),o.appendChild(u)}const l=document.createElement("span");if(l.className="view-switcher__label",l.textContent=a.label??a.id,o.appendChild(l),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Vr()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Br(n){switch(n){case"dark-matter":return Ve(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Ve(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Ve(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Ve(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Ve(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return Ve(`
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
      `);default:return null}}function Ve(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Vr(){return Ve(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Hr=`# Credits source-of-truth.
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
`;function Dr(){const n=Me(Hr);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Ur(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:jr(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),f=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function y(L,_){b.textContent=L,f.textContent=_,m.classList.remove("is-hidden")}function k(){m.classList.add("is-hidden")}g.addEventListener("click",k),m.addEventListener("click",L=>{L.target===m&&k()});const I=document.createElement("div");I.className="parameter-editor__list";for(const L of u.parameters)I.appendChild(c(L,y));i.appendChild(I),l()}function c(u,d){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const f=u.displayUnit??u.unit,g=document.createElement("span");g.className="param-card__range",g.textContent=`${Ee(tt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),f)} – ${Ee(tt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),f)}`,m.appendChild(b),m.appendChild(g);const y=document.createElement("input");y.className="param-card__slider",y.type="range";const k=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max,L=r[u.id]??u.fallbackValue;y.min=String(k),y.max=String(I),y.step=u.logScale?"0.001":String(u.step),y.value=String(u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L),y.setAttribute("aria-label",u.label);const _=document.createElement("span");_.className="res-card__value";function S(v){const A=u.logScale?10**v:v;r[u.id]=A,y.value=String(v),y.style.setProperty("--fill",`${gs(v,k,I)}%`),_.textContent=Ee(tt(A,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),f),l()}y.addEventListener("input",()=>{S(parseFloat(y.value))}),y.addEventListener("click",v=>v.stopPropagation());const N=u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L;if(y.style.setProperty("--fill",`${gs(N,k,I)}%`),_.textContent=Ee(tt(L,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),f),u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const v=document.createElement("span");v.className="param-card__info-btn",v.setAttribute("aria-label","Parameter description"),v.textContent="ⓘ",m.appendChild(v),p.addEventListener("click",()=>{d(u.label,u.description)})}return p.appendChild(m),p.appendChild(y),p.appendChild(_),p}function l(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function jr(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function gs(n,e,t){return t===e?0:(n-e)/(t-e)*100}const di="universe-engine-advanced-settings",Kr="RSSSE26UM_Engine";function Tn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function fi(n){const e=localStorage.getItem(di);if(!e)return Tn();try{const t=JSON.parse(e);return hi(t,n)}catch{return Tn()}}function qr(n,e){const t=hi(n,e);return localStorage.setItem(di,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function hi(n,e){const t=Tn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function Wr(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Gr(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media";const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow">Celestial observer</p>
    <h2 class="config-overlay__title">Simulation matrix</h2>
  `;const u=document.createElement("button");u.className="config-overlay__close",u.type="button",u.setAttribute("aria-label","Close overlay"),u.textContent="×";const d=document.createElement("div");d.className="config-overlay__section-indicator",d.textContent="Parameters",c.appendChild(d),c.appendChild(l),c.appendChild(u);const p=document.createElement("section");p.className="config-overlay__section config-overlay__section--grow",p.dataset.section="parameters";const m=document.createElement("div");p.appendChild(m);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="settings",b.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const f=document.createElement("div");b.appendChild(f);const g=document.createElement("section");g.className="advanced-settings",g.dataset.state="closed",g.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const y=document.createElement("button");y.className="advanced-settings__access",y.type="button",y.textContent="Advanced Settings",g.appendChild(y);const k=document.createElement("div");k.className="advanced-settings__auth";const I=document.createElement("input");I.className="advanced-settings__password",I.type="password",I.placeholder="Enter password",I.autocomplete="off";const L=document.createElement("button");L.className="advanced-settings__unlock",L.type="button",L.textContent="Unlock";const _=document.createElement("p");_.className="advanced-settings__message",k.appendChild(I),k.appendChild(L),k.appendChild(_),g.appendChild(k);const S=document.createElement("div");S.className="advanced-settings__form";const N=document.createElement("label");N.className="advanced-settings__field",N.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const v=document.createElement("select");v.className="advanced-settings__select",v.appendChild(new Option("None",""));for(const T of e.availableScales)v.appendChild(new Option(T.label,T.id));N.appendChild(v),S.appendChild(N);const A=document.createElement("div");A.className="advanced-settings__field",A.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const F=document.createElement("div");F.className="advanced-settings__options";const B=document.createElement("label"),P=document.createElement("input");B.className="advanced-settings__choice",P.type="radio",P.name="manifest-source",P.value="local",B.appendChild(P),B.append("Local manifest");const $=document.createElement("label"),X=document.createElement("input");$.className="advanced-settings__choice",X.type="radio",X.name="manifest-source",X.value="online",$.appendChild(X),$.append("Online manifest"),F.appendChild(B),F.appendChild($),A.appendChild(F),S.appendChild(A);const Z=document.createElement("label");Z.className="advanced-settings__field advanced-settings__field--inline";const te=document.createElement("input"),ge=document.createElement("span");te.type="checkbox",te.className="advanced-settings__checkbox",ge.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,Z.appendChild(te),Z.appendChild(ge),S.appendChild(Z);const pe=document.createElement("div");pe.className="advanced-settings__field",pe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const ue=document.createElement("div");ue.className="advanced-settings__options";const W=new Map;for(const T of e.availableScales){const D=document.createElement("label"),Y=document.createElement("input");D.className="advanced-settings__choice",Y.type="checkbox",Y.value=T.id,W.set(T.id,Y),D.appendChild(Y),D.append(`Show ${T.label}`),ue.appendChild(D)}pe.appendChild(ue),S.appendChild(pe),g.appendChild(S),b.appendChild(g);const ne=document.createElement("section");ne.className="config-overlay__section config-overlay__section--grow",ne.dataset.section="credits",ne.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const se=ne.querySelector("[data-credits]"),ae=Dr();if(se.innerHTML="",ae.length===0){const T=document.createElement("div");T.className="credits-list__entry",T.textContent="To be credited...",se.appendChild(T)}else for(const T of ae)if(T.header){const D=document.createElement("div");D.className="credits-list__heading",D.textContent=T.text,se.appendChild(D)}else{const D=document.createElement("div");D.className="credits-list__entry";const Y=document.createElement("span");if(Y.className="credits-list__text",T.url){const j=document.createElement("a");j.className="credits-list__link",j.href=T.url,j.target="_blank",j.rel="noopener noreferrer",j.textContent=T.text,Y.appendChild(j)}else Y.textContent=T.text;D.appendChild(Y),se.appendChild(D)}const x=document.createElement("div");x.className="config-overlay__footer";const q=document.createElement("button");q.className="run-button",q.type="button",q.textContent="Run",x.appendChild(q),o.appendChild(c),o.appendChild(p),o.appendChild(b),o.appendChild(ne),o.appendChild(x),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let E=mt(e.advancedSettings),C="closed";const U=Ur(m,e.simClass,e.values,e.onValuesChange),G=ir(f,e.theme,e.onThemeChange);u.addEventListener("click",e.onClose),y.addEventListener("click",()=>{if(C==="open"){de("closed");return}de("auth"),I.focus()}),L.addEventListener("click",H),I.addEventListener("keydown",T=>{T.key==="Enter"&&H()}),v.addEventListener("change",()=>{E.lockedScaleId=v.value||null,re()}),P.addEventListener("change",()=>{P.checked&&(E.manifestSource="local")}),X.addEventListener("change",()=>{X.checked&&(E.manifestSource="online")}),te.addEventListener("change",()=>{E.verboseLogging=te.checked});for(const[T,D]of W.entries())D.addEventListener("change",()=>{if(Array.from(W.entries()).filter(([,j])=>j.checked).map(([j])=>j).length===0&&!E.lockedScaleId){D.checked=!0;return}E.hiddenScaleIds=Array.from(W.keys()).filter(j=>{var Ke;return!((Ke=W.get(j))!=null&&Ke.checked)&&j!==E.lockedScaleId}),re()}),T===E.lockedScaleId&&(D.disabled=!0);V(e.initialView??"parameters"),re();function V(T){o.dataset.view=T,d.textContent=T==="parameters"?"Parameters":T==="settings"?"Settings":"Credits",T==="settings"?q.textContent="Apply":T==="credits"?q.textContent="Close":q.textContent="Run"}function re(){v.value=E.lockedScaleId??"",P.checked=E.manifestSource==="local",X.checked=E.manifestSource==="online",te.checked=E.verboseLogging;for(const[T,D]of W.entries()){const Y=E.lockedScaleId===T;D.checked=Y||!E.hiddenScaleIds.includes(T),D.disabled=Y}}function H(){if(I.value!==Kr){_.textContent="Incorrect password";return}I.value="",_.textContent="",de("open")}function de(T){C=T,g.dataset.state=T,y.textContent=T==="open"?"Hide Advanced Settings":"Advanced Settings",T!=="auth"&&(_.textContent="")}function Ne(){I.value="",_.textContent="",de("closed")}function ye(){E=mt(e.advancedSettings),re()}return q.addEventListener("click",()=>{const T=o.dataset.view;if(T==="settings"){e.onApplySettings(mt(E));return}if(T==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),ye(),Ne()},setSimulation(T,D){U.setSimClass(T,D),r.src=T.placeholderImage,r.alt=`${T.label} preview`},setTheme(T){G.setActive(T)},setView(T){V(T),T!=="settings"&&Ne()},setAdvancedSettings(T){e.advancedSettings=mt(T),E=mt(T),re(),Ne()}}}function mt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function Yr(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=Ln,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let c=[],l=0;function u(){for(const b of c)window.clearTimeout(b);c=[]}function d(b,f){return new Promise(g=>{const y=window.setTimeout(()=>{f===l&&g()},Math.max(0,b));c.push(y)})}async function p(b,f){const g=document.createElement("div");g.className="terminal__line";const y=m();g.appendChild(y),o.appendChild(g);for(let k=0;k<b.length;k+=1){if(f!==l)return;const I=b[k];g.insertBefore(document.createTextNode(I),y),o.scrollTop=o.scrollHeight,await d(e,f)}y.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,f,g,y){u(),l+=1;const k=l;i.hidden=!1,i.classList.remove("is-hidden");const I=performance.now(),L=(y==null?void 0:y.minTerminalTimeMs)??t;let _=!g,S=[...b];g&&g.then(()=>{_=!0});let N=0;for(;k===l;){S.length===0&&(S=[...b]);const A=Math.floor(Math.random()*S.length),[F]=S.splice(A,1),B=`${ys(N)} ${F.text}`;if(N+=1,await p(B,k),k!==l)return;if(performance.now()-I>=L&&_)break}if(k!==l)return;const v=document.createElement("div");v.className="terminal__line terminal__line--syncing",v.textContent=`${ys(N)} STARTING SIMULATION...`,o.appendChild(v),o.scrollTop=o.scrollHeight,await d(s,k),k===l&&f()},hide(){u(),l+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function ys(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${gn(t)}:${gn(s)}:${gn(i)}]`}function gn(n){return String(n).padStart(2,"0")}function Jr(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var d;l(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(d,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,m.addEventListener("click",p),m}function l(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const zr=`# Initialization terminal script for the Planetary simulation family.
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
`,Qr=`# Initialization terminal script for the Galaxy simulation family.
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
`,Xr=`# Initialization terminal script for the Cosmos simulation family.
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
`,Zr={planetary:zr,galaxy:Qr,cosmos:Xr};function eo(n){return Me(Zr[n.id]).map(t=>({text:t}))}function to(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function no(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=Me(t),i=Qe(s.wallclockSeconds),a=Qe(s.computeUsed),r=Qe(s.memoryUsed),o=Qe(s.carbonBurnt),c=Qe(s.particlesUpdated),l=await so(n),u=ao(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function so(n){try{const e=await fetch(io(n));if(!e.ok)return{};const t=await e.text(),s=Me(t);return ro(s)}catch{return{}}}function io(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function Qe(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function ao(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function ro(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=Qe(s);i!==null&&(e[t]=i)}return e}const mi="[UniverseEngine]",oo=["planetary","galaxy","cosmos"];function pi(){return fi(oo).verboseLogging}function ie(n,e){pi()&&console.info(mi,n,e??"")}function Ae(n,e){pi()&&console.warn(mi,n,e??"")}const lo={local:"assets/local-manifest.json",online:kr};function co(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,ie("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await yi(e,t)},async findNearestVideo(s,i,a){const r=await fo(e,t,s,i,a);if(r)return r;const o=gi(s);return Ae("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:uo(s),summaryUrl:to(o)}}}}function gi(n){switch(n){case"planetary":return ee("assets/planet_test.mp4");case"galaxy":return ee("assets/galaxy_test.mp4");case"cosmos":return ee("assets/cosmo_test.mp4");default:return ee("assets/galaxy_test.mp4")}}function uo(n){switch(n){case"planetary":return ee("assets/planet_test_planetary_stats.csv");case"galaxy":return ee("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return ee("assets/cosmo_test_cosmos_stats.csv");default:return ee("assets/galaxy_test_galaxy_stats.csv")}}async function yi(n,e){const t=e.get(n);if(t)return t;const s=lo[n],i=fetch(ee(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ie("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(Ae("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function fo(n,e,t,s,i){const r=(await yi(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return Ae("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=bs(o,s,i);for(const d of r.slice(1)){const p=bs(d,s,i);p<c&&(o=d,c=p)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(ie("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:ee(u),liveDataUrl:ee(o.liveDataPath),summaryUrl:ee(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,p])=>[d,ee(p)]))}):null}function bs(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Rt={mode:"time",frames:[]};async function ho(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return go(t)}function mo(n,e,t=0){if(n.mode==="row")return yo(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=po(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],c=(e-r.t)/Math.max(o.t-r.t,1e-9);return bo(r.values,o.values,c)}function po(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function go(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Rt;const t=yn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=yn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=yn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function yo(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function yn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function bo(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=wo(u);continue}i[a]=t<.5?r:o}return i}function wo(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function vo(n){_o(Er,n)}function _o(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ie("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ie("Run selection tracked",{simulationId:e.simulationId}):Ae("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Ae("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const ws=50*1024*1024,So=8,ko=6e3,Eo=8e3,Io=5e3,Lo=1200,No=100,bn={galaxy:"tron",planetary:"matrix",cosmos:"nostromo"};function To(n){const e=ze.map(h=>h.id);let t=fi(e),s=zn(t);const i=co(t.manifestSource);t.manifestSource==="online"&&i.preloadActiveManifest();let a=Qn(t.lockedScaleId)??s[0]??ze[0],r=t.lockedScaleId?bn[a.id]:sr(),o=!1,c=null,l=null,u=0,d=Rt,p=!1;const m=Object.fromEntries(ze.map(h=>[h.id,Ti(h)]));fn(r);const b=gi(a.id),f=rr(n,b),g=document.createElement("div");g.className="display-chrome",g.classList.add("is-hidden"),n.appendChild(g);const y=document.createElement("div");y.className="orientation-overlay",y.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(y);const k=document.createElement("div");k.className="swift-logo",k.innerHTML=`
    <img
      class="swift-logo__image"
      src="${ee("assets/credits/swift-logo.png")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(k);const I=document.createElement("div");I.className="synth-logo is-hidden",I.innerHTML=`
    <img
      class="synth-logo__image"
      src="${ee("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(I);const L=document.createElement("div");L.className="display-chrome__top-left is-hidden",n.appendChild(L);const _=Jr(L,{onHome(){en()},onViewSelected(h){if(h==="credits"){Lt("credits");return}Lt(h)},showHome:!t.lockedScaleId}),S=document.createElement("div");S.className="display-chrome__left-center",g.appendChild(S);const N=xr(S,{onSelect(h){Jn(h)},onInfo(h,w,M){A.textContent=w,F.textContent=M,v.classList.add("is-visible")}}),v=document.createElement("div");v.className="view-info-overlay",v.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(v);const A=v.querySelector(".view-info-overlay__title"),F=v.querySelector(".view-info-overlay__text"),B=v.querySelector(".view-info-overlay__close");v.addEventListener("click",h=>{h.target===v&&v.classList.remove("is-visible")}),B.addEventListener("click",()=>{v.classList.remove("is-visible")});const P=document.createElement("div");P.className="display-chrome__top-center is-hidden",g.appendChild(P);const $=document.createElement("div");$.className="display-chrome__top-right",g.appendChild($);const X=dr($),Z=document.createElement("div");Z.className="display-chrome__center-status",Z.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,g.appendChild(Z);const te="universe-engine-playback-speed",ge=()=>{const h=localStorage.getItem(te),w=h?Number(h):NaN;return[.25,.5,1,2].includes(w)?w:1},pe=h=>{localStorage.setItem(te,String(h))},ue=ge();f.setPlaybackRate(ue);const W=document.createElement("div");W.className="display-chrome__bottom",g.appendChild(W);const ne=lr(W,{onChange(h){V(h)},onTogglePlay:Yn,onSpeedChange:Si,onScrubStart(){T(),G()},onScrubEnd(){D(),f.isPaused()||U()},initialSpeed:ue});ne.setPlaying(!f.isPaused());let se=null,ae=null,x=null,q=!1,E=null,C=0;function U(){if(se!==null)return;function h(){const w=f.getPlaybackFraction();ne.setPosition(w),f.isPaused()?se=null:se=requestAnimationFrame(h)}se=requestAnimationFrame(h)}function G(){se!==null&&(cancelAnimationFrame(se),se=null)}function V(h){ae=h,x===null&&(x=requestAnimationFrame(()=>{if(x=null,ae===null)return;const w=ae;ae=null,f.seekToFraction(w)}))}function re(){if(ae===null)return;x!==null&&(cancelAnimationFrame(x),x=null);const h=ae;ae=null,f.seekToFraction(h)}function H(){E!==null&&(window.clearTimeout(E),E=null)}function de(){if(!(l!=null&&l.views))return[];const h=Ge(a,l);return Object.entries(l.views).filter(([w])=>w!==h).map(([,w])=>w).filter(Boolean)}function Ne(){H(),f.suspendPrewarming()}function ye(h=Lo){H(),!(q||f.isPaused())&&(E=window.setTimeout(()=>{E=null,!(q||f.isPaused())&&(f.resumePrewarming(),f.prewarmSources(de()))},Math.max(0,h)))}function T(){q=!0,C=0,Ne()}function D(){q=!1,C=0,re(),u=f.getPlaybackFraction()*f.getDurationSeconds(),xe(u),ye()}f.onPlayStateChange(h=>{ne.setPlaying(!h),h?(G(),Ne()):(U(),ye(0))}),f.onTimeUpdate(h=>{if(u=h*f.getDurationSeconds(),q){const w=performance.now();if(w-C<No)return;C=w}xe(u)});const Y=document.createElement("div");Y.className="overlay-layer",n.appendChild(Y);const j=$r(Y,{onReplay:_i,onParameters:()=>Lt("parameters"),onHome:en,showHome:!t.lockedScaleId});f.onEnded(()=>{o=!0;const h=f.captureFrame();j.update(a,_e(),f.getDurationSeconds(),c,h),j.show()});const Ke=gr(Y,s,h=>{Gn(h),Lt("parameters")}),fe=Gr(Y,{simClass:a,values:_e(),theme:r,advancedSettings:t,availableScales:ze,onValuesChange:bi,onThemeChange:Zt,onRun:()=>{ie("Parameters submitted — starting run",{simClassId:a.id}),ki().catch(h=>{Ae("Run failed to start",{simClassId:a.id,error:h instanceof Error?h.message:String(h)})})},onApplySettings:wi,onClose:vi,initialView:"parameters"}),Qt=Yr(Y);ne.setPosition(0),xe(),j.hide();const $e=new WeakMap,qe=h=>{const w=$e.get(h);w&&(clearTimeout(w),$e.delete(h)),h.classList.remove("side-collapsed")},Re=h=>{const w=$e.get(h);w&&clearTimeout(w),$e.set(h,setTimeout(()=>{h.classList.add("side-collapsed"),$e.delete(h)},2500))},Kn=h=>{const w=$e.get(h);w&&(clearTimeout(w),$e.delete(h)),h.classList.add("side-collapsed")},Xt=(h,w)=>{h.addEventListener("mouseenter",()=>qe(h)),h.addEventListener("mouseleave",()=>Re(h)),h.addEventListener("focusin",()=>qe(h)),h.addEventListener("focusout",M=>{h.contains(M.relatedTarget)||Re(h)}),h.addEventListener("click",()=>{if(h.classList.contains("side-collapsed")){qe(h),Re(h);return}w.toggleOnClick?Kn(h):Re(h)}),Kn(h)};Xt(L,{toggleOnClick:!0}),Xt(S,{toggleOnClick:!0}),Xt(W,{toggleOnClick:!1});let ut=0,We=null,It=0;const qn=()=>{We!==null&&(cancelAnimationFrame(We),We=null)},Wn=()=>{if(We!==null)return;It=f.getPlaybackFraction();const h=()=>{if(ut===0){qn();return}const M=12*(1/60)/Math.max(f.getDurationSeconds(),1);It=Math.max(0,Math.min(1,It+ut*M)),f.seekToFraction(It),We=requestAnimationFrame(h)};We=requestAnimationFrame(h)};document.addEventListener("keydown",h=>{if(n.dataset.mode==="display"&&!(h.target instanceof HTMLInputElement||h.target instanceof HTMLTextAreaElement))switch(h.key){case"Escape":h.preventDefault(),v.classList.contains("is-visible")?v.classList.remove("is-visible"):en();break;case" ":h.preventDefault(),Yn();break;case"ArrowLeft":h.preventDefault(),qe(W),Re(W),ut=-1,Wn();break;case"ArrowRight":h.preventDefault(),qe(W),Re(W),ut=1,Wn();break;case"ArrowUp":case"ArrowDown":{if(h.preventDefault(),qe(S),Re(S),!(l!=null&&l.views)||Object.keys(l.views).length<=1)break;const w=a.views.filter(he=>{var me;return((me=l==null?void 0:l.views)==null?void 0:me[he.id])!==void 0});if(w.length<=1)break;const M=l.viewId??Ge(a,l),R=w.findIndex(he=>he.id===M),Se=h.key==="ArrowUp"?(R-1+w.length)%w.length:(R+1)%w.length;Jn(w[Se].id);break}}}),document.addEventListener("keyup",h=>{(h.key==="ArrowLeft"||h.key==="ArrowRight")&&(ut=0,qn())}),f.hideMedia(),f.pause(),Fe(t.lockedScaleId?"config":"entry");function Gn(h){h.id===a.id&&p||(a=h,sn(),Zt(bn[h.id]),fe.setSimulation(a,_e()),ne.setPosition(0),xe(),nn(),tn())}function bi(h){m[a.id]={...h},ie("Parameter values updated",{simClassId:a.id,values:m[a.id]}),xe()}function Zt(h){r=h,fn(h),fe.setTheme(h)}function Lt(h){h==="parameters"&&fe.setSimulation(a,_e()),fe.setView(h),Fe("config")}function wi(h){if(Fi(h),p){j.hide(),Fe("display");return}fe.setSimulation(a,_e()),fe.setView("parameters")}function vi(){if(j.hide(),!p&&t.lockedScaleId){fe.setSimulation(a,_e()),fe.setView("parameters");return}Fe(p?"display":"entry")}function en(){t.lockedScaleId||(ie("Returning to home screen",{simClassId:a.id}),sn(),p=!1,f.hideMedia(),Fe("entry"))}function _i(){o=!1,j.hide(),f.resetPlayback(),f.play().catch(()=>{f.setMuted(!0),f.play()})}function Yn(){f.isPaused()?f.play().catch(()=>{f.setMuted(!0),f.play()}):f.pause()}function Si(h){f.setPlaybackRate(h),pe(h),ne.setSpeed(h)}async function ki(){const h=_e();ie("Run requested",{simClassId:a.id,values:h,manifestSource:i.getSource()});const w=await i.findNearestVideo(a.id,a.parameters,h);sn(),l=w;const M=Ge(a,w);vo({simulationId:a.id,parameters:h,manifestSource:i.getSource(),matchedRunId:w.runId});const R=Pi(w,M)??w.url,Se=Object.entries(w.views??{}).filter(([oe])=>oe!==M).map(([,oe])=>oe);Ci(w.liveDataUrl),Mi(w.summaryUrl),f.setMuted(!1),nn(M),Fe("initializing");const he=Ei(R);f.resumePrewarming(),f.prewarmSources(Se);const me=(async()=>{const oe=await he;ie(`Prepared active video source: ${oe.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:R,waitsForBuffer:oe.shouldWaitForBuffer}),f.setSource(oe.src,{ownedObjectUrl:oe.ownedObjectUrl}),f.pause(),await f.waitForLoadedData(Eo),oe.shouldWaitForBuffer&&await f.waitForBufferedAhead(So,ko)})();await new Promise(oe=>{Qt.show(eo(a),oe,me,{minTerminalTimeMs:$i()})}),p=!0,f.showMedia(),f.play().catch(()=>{f.setMuted(!0),f.play().catch(()=>{})}),Fe("display")}async function Ei(h){const w=await Ii(h);if(w!==null&&w>0&&w<=ws){ie("Downloading active video behind loading overlay",{videoUrl:h,contentLength:w});try{const M=await fetch(h);if(!M.ok)throw new Error(`Failed to download active video: ${h}`);const R=await M.blob();return ie(`Active video full fetch complete: ${R.size} bytes`,{videoUrl:h,blobType:R.type}),{src:URL.createObjectURL(R),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(M){Ae(`Full-fetch FAILED; falling back to progressive: ${M instanceof Error?M.message:String(M)}`,{videoUrl:h})}}return w!==null?ie("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:h,contentLength:w,fullFetchMaxBytes:ws}):ie("Could not determine active video size; using progressive load",{videoUrl:h}),ie("Using progressive active video load",{videoUrl:h}),{src:h,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function Ii(h){try{const w=await fetch(h,{headers:{Range:"bytes=0-0"}});ie("Probed active video size with range request",{videoUrl:h,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const M=Ni(w.headers.get("Content-Length"));if(M!==null)return M;const R=Li(w.headers.get("Content-Range"));return R!==null?R:null}catch(w){return Ae("Could not probe active video size",{videoUrl:h,error:w instanceof Error?w.message:String(w)}),null}}function Li(h){if(!h)return null;const w=h.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const M=Number(w[1]);return Number.isFinite(M)&&M>0?M:null}function Ni(h){if(!h)return null;const w=Number(h);return Number.isFinite(w)?w:null}function Fe(h){if(n.dataset.mode=h,h==="entry"?document.documentElement.setAttribute("data-theme","glass"):h==="display"&&fn(r),dt(g,h==="display"||h==="config"),dt(k,h==="display"||h==="entry"),dt(L,!t.lockedScaleId&&(h==="entry"||h==="config"||h==="display")),h==="entry"&&!t.lockedScaleId?Ke.show():Ke.hide(),h==="config"?(Qt.hide(),fe.setSimulation(a,_e()),fe.show()):fe.hide(),h!=="display")j.hide();else if(o){const M=f.captureFrame();j.update(a,_e(),f.getDurationSeconds(),c,M),j.show()}!p||h==="initializing"?(f.hideMedia(),h==="initializing"&&f.pause()):f.showMedia(),h!=="initializing"&&Qt.hide(),tn()}function tn(){if(n.dataset.mode==="entry"){dt(I,!0);return}const h=n.dataset.mode==="display",w=a.id==="galaxy",R=Ge(a,l)==="hst";dt(I,h&&w&&R)}function xe(h=0){const w=mo(d,h,f.getDurationSeconds()),M=Oi(a,c,h,f.getDurationSeconds());X.update(a,_e(),{...w,...M})}function nn(h){const w=a.views.filter(Se=>{var he;return((he=l==null?void 0:l.views)==null?void 0:he[Se.id])!==void 0});if(w.length<=1){N.hide(),P.classList.add("is-hidden");return}const M=h??Ge(a,l),R=w.find(Se=>Se.id===M);N.update(w,M),R?(P.classList.remove("is-hidden"),P.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):P.classList.add("is-hidden")}function sn(){d=Rt,o=!1,c=null,l=null,u=0,q=!1,ae=null,H(),x!==null&&(cancelAnimationFrame(x),x=null),j.hide(),N.hide(),f.pause(),f.clearPrewarmedSources(),f.resetPlayback(),ne.setPosition(0)}function Jn(h){if(!(l!=null&&l.views)||h===Ge(a,l))return;const w=l.views[h];if(!w)return;l.viewId=h;const M=!f.isPaused()&&!o,R=o?0:f.getPlaybackFraction();o=!1,j.hide(),f.setSource(w,{seekFraction:R,autoplay:M}),f.prewarmSources(de()),M&&!q?ye():Ne(),nn(h),v.classList.remove("is-visible"),tn()}function _e(){return{...m[a.id]}}function Ti(h){return Object.fromEntries(h.parameters.map(w=>[w.id,Ai(w)]))}function Ai(h){if(h.logScale){const he=Math.log10(h.min),me=Math.log10(h.max);return 10**(he+Math.random()*(me-he))}const w=Math.max(0,Math.round((h.max-h.min)/h.step)),M=Math.floor(Math.random()*(w+1)),R=h.min+M*h.step,Se=ai(h.step);return Number(R.toFixed(Se))}async function Ci(h){try{d=await ho(h)}catch(w){d=Rt,Ae("Failed to load live stats",{url:h,error:w instanceof Error?w.message:String(w)})}xe()}async function Mi(h){c=await no(h),xe(u)}function Oi(h,w,M,R){if(!w||!Number.isFinite(R)||R<=0)return{};const Se=Math.max(0,Math.min(1,M/R)),he={};for(const me of h.metadata.liveStats){if(!me.live||!me.fromVideo||!me.scaleWithTime)continue;const an=me.videoKey??me.id,oe=w[an];if(typeof oe!="number"||!Number.isFinite(oe))continue;const Xn=oe*Se;he[me.id]=me.integer?String(Math.floor(Xn)):String(Xn)}return he}function dt(h,w){h.hidden=!w,h.classList.toggle("is-hidden",!w)}function Ge(h,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function Pi(h,w){return!w||!h.views?null:h.views[w]??null}function zn(h){const w=new Set(Wr(h,e));return ze.filter(M=>w.has(M.id))}function Qn(h){return h?ze.find(w=>w.id===h)??null:null}function $i(){return i.getSource()!=="local"?Ln.MIN_TERMINAL_TIME_MS:Ri(Ln.MIN_TERMINAL_TIME_MS,Io)}function Ri(h,w){const M=Math.ceil(Math.min(h,w)),R=Math.floor(Math.max(h,w));return Math.floor(Math.random()*(R-M+1))+M}function Fi(h){const w=a.id,M=t.manifestSource;t=qr(h,e),s=zn(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),_.setHomeVisible(!t.lockedScaleId),j.setHomeVisible(!t.lockedScaleId),Ke.setSimulationClasses(s),fe.setAdvancedSettings(t),ie("Advanced settings updated",t),M!==t.manifestSource&&(l=null);const R=Qn(t.lockedScaleId);R&&(Gn(R),R.id!==w&&(p=!1,f.hideMedia(),fe.setView("parameters")),p||(Zt(bn[R.id]),fe.setSimulation(a,_e())))}}function Ao(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");To(n)}Ao();
//# sourceMappingURL=index-XjDXTA9c.js.map
