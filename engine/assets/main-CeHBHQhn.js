(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Gn=Symbol.for("yaml.alias"),Vn=Symbol.for("yaml.document"),je=Symbol.for("yaml.map"),Ks=Symbol.for("yaml.pair"),Pe=Symbol.for("yaml.scalar"),yt=Symbol.for("yaml.seq"),Ee=Symbol.for("yaml.node.type"),Ze=n=>!!n&&typeof n=="object"&&n[Ee]===Gn,rn=n=>!!n&&typeof n=="object"&&n[Ee]===Vn,xt=n=>!!n&&typeof n=="object"&&n[Ee]===je,ee=n=>!!n&&typeof n=="object"&&n[Ee]===Ks,K=n=>!!n&&typeof n=="object"&&n[Ee]===Pe,$t=n=>!!n&&typeof n=="object"&&n[Ee]===yt;function X(n){if(n&&typeof n=="object")switch(n[Ee]){case je:case yt:return!0}return!1}function Z(n){if(n&&typeof n=="object")switch(n[Ee]){case Gn:case je:case Pe:case yt:return!0}return!1}const qs=n=>(K(n)||X(n))&&!!n.anchor,Ge=Symbol("break visit"),pa=Symbol("skip children"),Tt=Symbol("remove node");function bt(n,e){const t=ga(e);rn(n)?ct(null,n.contents,t,Object.freeze([n]))===Tt&&(n.contents=null):ct(null,n,t,Object.freeze([]))}bt.BREAK=Ge;bt.SKIP=pa;bt.REMOVE=Tt;function ct(n,e,t,s){const i=ya(n,e,t,s);if(Z(i)||ee(i))return ba(n,s,i),ct(n,i,t,s);if(typeof i!="symbol"){if(X(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=ct(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Ge)return Ge;r===Tt&&(e.items.splice(a,1),a-=1)}}}else if(ee(e)){s=Object.freeze(s.concat(e));const a=ct("key",e.key,t,s);if(a===Ge)return Ge;a===Tt&&(e.key=null);const r=ct("value",e.value,t,s);if(r===Ge)return Ge;r===Tt&&(e.value=null)}}return i}function ga(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function ya(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(xt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if($t(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ee(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(K(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(Ze(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function ba(n,e,t){const s=e[e.length-1];if(X(s))s.items[n]=t;else if(ee(s))n==="key"?s.key=t:s.value=t;else if(rn(s))s.contents=t;else{const i=Ze(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const va={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},wa=n=>n.replace(/[!,[\]{}]/g,e=>va[e]);class fe{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},fe.defaultYaml,e),this.tags=Object.assign({},fe.defaultTags,t)}clone(){const e=new fe(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new fe(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:fe.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},fe.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:fe.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},fe.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+wa(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&Z(e.contents)){const a={};bt(e.contents,(r,o)=>{Z(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}fe.defaultYaml={explicit:!1,version:"1.2"};fe.defaultTags={"!!":"tag:yaml.org,2002:"};function Ws(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Ys(n){const e=new Set;return bt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Gs(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function _a(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Ys(n));const r=Gs(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(K(r.node)||X(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function ut(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=ut(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=ut(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=ut(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=ut(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function ke(n,e,t){if(Array.isArray(n))return n.map((s,i)=>ke(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!qs(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class zn{constructor(e){Object.defineProperty(this,Ee,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!rn(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=ke(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?ut(a,{"":o},"",o):o}}class Jn extends zn{constructor(e){super(Gn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],bt(e,{Node:(a,r)=>{(Ze(r)||qs(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(ke(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Jt(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Ws(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Jt(n,e,t){if(Ze(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(X(e)){let s=0;for(const i of e.items){const a=Jt(n,i,t);a>s&&(s=a)}return s}else if(ee(e)){const s=Jt(n,e.key,t),i=Jt(n,e.value,t);return Math.max(s,i)}return 1}const zs=n=>!n||typeof n!="function"&&typeof n!="object";class P extends zn{constructor(e){super(Pe),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:ke(this.value,e,t)}toString(){return String(this.value)}}P.BLOCK_FOLDED="BLOCK_FOLDED";P.BLOCK_LITERAL="BLOCK_LITERAL";P.PLAIN="PLAIN";P.QUOTE_DOUBLE="QUOTE_DOUBLE";P.QUOTE_SINGLE="QUOTE_SINGLE";const Sa="tag:yaml.org,2002:";function ka(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Ot(n,e,t){var d,p,m;if(rn(n)&&(n=n.contents),Z(n))return n;if(ee(n)){const v=(p=(d=t.schema[je]).createNode)==null?void 0:p.call(d,t.schema,null,t);return v.items.push(n),v}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new Jn(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Sa+e.slice(2));let c=ka(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const v=new P(n);return l&&(l.node=v),v}c=n instanceof Map?r[je]:Symbol.iterator in Object(n)?r[yt]:r[je]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((m=c==null?void 0:c.nodeClass)==null?void 0:m.from)=="function"?c.nodeClass.from(t.schema,n,t):new P(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function en(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Ot(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const At=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Js extends zn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>Z(s)||ee(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(At(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(X(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,en(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(X(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&K(a)?a.value:a:X(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ee(t))return!1;const s=t.value;return s==null||e&&K(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return X(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(X(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,en(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Ea=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function $e(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const Je=(n,e,t)=>n.endsWith(`
`)?$e(t,e):t.includes(`
`)?`
`+$e(t,e):(n.endsWith(" ")?"":" ")+t,Qs="flow",Un="block",Qt="quoted";function on(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):d=i-s);let p,m,v=!1,h=-1,y=-1,S=-1;t===Un&&(h=vs(n,h,e.length),h!==-1&&(d=h+l));for(let L;L=n[h+=1];){if(t===Qt&&L==="\\"){switch(y=h,n[h+1]){case"x":h+=3;break;case"u":h+=5;break;case"U":h+=9;break;default:h+=1}S=h}if(L===`
`)t===Un&&(h=vs(n,h,e.length)),d=h+e.length+l,p=void 0;else{if(L===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const k=n[h+1];k&&k!==" "&&k!==`
`&&k!=="	"&&(p=h)}if(h>=d)if(p)c.push(p),d=p+l,p=void 0;else if(t===Qt){for(;m===" "||m==="	";)m=L,L=n[h+=1],v=!0;const k=h>S+1?h-2:y-1;if(u[k])return n;c.push(k),u[k]=!0,d=k+l,p=void 0}else v=!0}m=L}if(v&&o&&o(),c.length===0)return n;r&&r();let w=n.slice(0,c[0]);for(let L=0;L<c.length;++L){const k=c[L],g=c[L+1]||n.length;k===0?w=`
${e}${n.slice(0,g)}`:(t===Qt&&u[k]&&(w+=`${n[k]}\\`),w+=`
${e}${n.slice(k+1,g)}`)}return w}function vs(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const ln=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),cn=n=>/^(%|---|\.\.\.)/m.test(n);function La(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Mt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(cn(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:on(r,a,Qt,ln(e,!1))}function Dn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Mt(n,e);const t=e.indent||(cn(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:on(s,t,Qs,ln(e,!1))}function dt(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Mt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Dn:a&&!i?s=Mt:s=t?Dn:Mt}return s(n,e)}let Hn;try{Hn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Hn=/\n+(?!\n|$)/g}function Xt({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return dt(t,s);const c=s.indent||(s.forceBlockIndent||cn(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===P.BLOCK_FOLDED?!1:e===P.BLOCK_LITERAL?!0:!La(t,l,c.length);if(!t)return u?`|
`:`>
`;let d,p;for(p=t.length;p>0;--p){const g=t[p-1];if(g!==`
`&&g!=="	"&&g!==" ")break}let m=t.substring(p);const v=m.indexOf(`
`);v===-1?d="-":t===m||v!==m.length-1?(d="+",a&&a()):d="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(Hn,`$&${c}`));let h=!1,y,S=-1;for(y=0;y<t.length;++y){const g=t[y];if(g===" ")h=!0;else if(g===`
`)S=y;else break}let w=t.substring(0,S<y?S+1:y);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let k=(h?c?"2":"1":"")+d;if(n&&(k+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const g=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let b=!1;const E=ln(s,!0);r!=="folded"&&e!==P.BLOCK_FOLDED&&(E.onOverflow=()=>{b=!0});const N=on(`${w}${g}${m}`,c,Un,E);if(!b)return`>${k}
${c}${N}`}return t=t.replace(/\n+/g,`$&${c}`),`|${k}
${c}${w}${t}${m}`}function Ia(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return dt(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?dt(a,e):Xt(n,e,t,s);if(!o&&!u&&i!==P.PLAIN&&a.includes(`
`))return Xt(n,e,t,s);if(cn(a)){if(l==="")return e.forceBlockIndent=!0,Xt(n,e,t,s);if(o&&l===c)return dt(a,e)}const d=a.replace(/\n+/g,`$&
${l}`);if(r){const p=h=>{var y;return h.default&&h.tag!=="tag:yaml.org,2002:str"&&((y=h.test)==null?void 0:y.test(d))},{compat:m,tags:v}=e.doc.schema;if(v.some(p)||m!=null&&m.some(p))return dt(a,e)}return o?d:on(d,l,Qs,ln(e,!1))}function Qn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==P.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=P.QUOTE_DOUBLE);const l=u=>{switch(u){case P.BLOCK_FOLDED:case P.BLOCK_LITERAL:return i||a?dt(r.value,e):Xt(r,e,t,s);case P.QUOTE_DOUBLE:return Mt(r.value,e);case P.QUOTE_SINGLE:return Dn(r.value,e);case P.PLAIN:return Ia(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:d}=e.options,p=i&&u||d;if(c=l(p),c===null)throw new Error(`Unsupported default string type ${p}`)}return c}function Xs(n,e){const t=Object.assign({blockQuote:!0,commentString:Ea,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Na(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(K(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Aa(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(K(n)||X(n))&&n.anchor;a&&Ws(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function pt(n,e,t,s){var l;if(ee(n))return n.toString(e,t,s);if(Ze(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=Z(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Na(e.doc.schema.tags,a));const r=Aa(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):K(a)?Qn(a,e,t,s):a.toString(e,t,s);return r?K(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ca({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:d}}=t;let p=Z(n)&&n.comment||null;if(d){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(X(n)||!Z(n)&&typeof n=="object"){const E="With simple keys, collection cannot be used as a key value";throw new Error(E)}}let m=!d&&(!n||p&&e==null&&!t.inFlow||X(n)||(K(n)?n.type===P.BLOCK_FOLDED||n.type===P.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(d||!a),indent:o+l});let v=!1,h=!1,y=pt(n,t,()=>v=!0,()=>h=!0);if(!m&&!t.inFlow&&y.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return v&&s&&s(),y===""?"?":m?`? ${y}`:y}else if(a&&!d||e==null&&m)return y=`? ${y}`,p&&!v?y+=Je(y,t.indent,c(p)):h&&i&&i(),y;v&&(p=null),m?(p&&(y+=Je(y,t.indent,c(p))),y=`? ${y}
${o}:`):(y=`${y}:`,p&&(y+=Je(y,t.indent,c(p))));let S,w,L;Z(e)?(S=!!e.spaceBefore,w=e.commentBefore,L=e.comment):(S=!1,w=null,L=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&K(e)&&(t.indentAtStart=y.length+1),h=!1,!u&&l.length>=2&&!t.inFlow&&!m&&$t(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let k=!1;const g=pt(e,t,()=>k=!0,()=>h=!0);let b=" ";if(p||S||w){if(b=S?`
`:"",w){const E=c(w);b+=`
${$e(E,t.indent)}`}g===""&&!t.inFlow?b===`
`&&L&&(b=`

`):b+=`
${t.indent}`}else if(!m&&X(e)){const E=g[0],N=g.indexOf(`
`),T=N!==-1,x=t.inFlow??e.flow??e.items.length===0;if(T||!x){let U=!1;if(T&&(E==="&"||E==="!")){let R=g.indexOf(" ");E==="&"&&R!==-1&&R<N&&g[R+1]==="!"&&(R=g.indexOf(" ",R+1)),(R===-1||N<R)&&(U=!0)}U||(b=`
${t.indent}`)}}else(g===""||g[0]===`
`)&&(b="");return y+=b+g,t.inFlow?k&&s&&s():L&&!k?y+=Je(y,t.indent,c(L)):h&&i&&i(),y}function Zs(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const jt="<<",Be={identify:n=>n===jt||typeof n=="symbol"&&n.description===jt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new P(Symbol(jt)),{addToJSMap:ei}),stringify:()=>jt},Ta=(n,e)=>(Be.identify(e)||K(e)&&(!e.type||e.type===P.PLAIN)&&Be.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Be.tag&&t.default));function ei(n,e,t){if(t=n&&Ze(t)?t.resolve(n.doc):t,$t(t))for(const s of t.items)En(n,e,s);else if(Array.isArray(t))for(const s of t)En(n,e,s);else En(n,e,t)}function En(n,e,t){const s=n&&Ze(t)?t.resolve(n.doc):t;if(!xt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function ti(n,e,{key:t,value:s}){if(Z(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ta(n,t))ei(n,e,s);else{const i=ke(t,"",n);if(e instanceof Map)e.set(i,ke(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Ma(t,i,n),r=ke(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Ma(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Z(n)&&(t!=null&&t.doc)){const s=Xs(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),Zs(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Xn(n,e,t){const s=Ot(n,void 0,t),i=Ot(e,void 0,t);return new he(s,i)}class he{constructor(e,t=null){Object.defineProperty(this,Ee,{value:Ks}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return Z(t)&&(t=t.clone(e)),Z(s)&&(s=s.clone(e)),new he(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return ti(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ca(this,e,t,s):JSON.stringify(this)}}function ni(n,e,t){return(e.inFlow??n.flow?Pa:Oa)(n,e,t)}function Oa({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const p=[];for(let v=0;v<e.length;++v){const h=e[v];let y=null;if(Z(h))!d&&h.spaceBefore&&p.push(""),tn(t,p,h.commentBefore,d),h.comment&&(y=h.comment);else if(ee(h)){const w=Z(h.key)?h.key:null;w&&(!d&&w.spaceBefore&&p.push(""),tn(t,p,w.commentBefore,d))}d=!1;let S=pt(h,u,()=>y=null,()=>d=!0);y&&(S+=Je(S,a,c(y))),d&&y&&(d=!1),p.push(s+S)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let v=1;v<p.length;++v){const h=p[v];m+=h?`
${l}${h}`:`
`}}return n?(m+=`
`+$e(c(n),l),o&&o()):d&&r&&r(),m}function Pa({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const d=[];for(let v=0;v<n.length;++v){const h=n[v];let y=null;if(Z(h))h.spaceBefore&&d.push(""),tn(e,d,h.commentBefore,!1),h.comment&&(y=h.comment);else if(ee(h)){const w=Z(h.key)?h.key:null;w&&(w.spaceBefore&&d.push(""),tn(e,d,w.commentBefore,!1),w.comment&&(c=!0));const L=Z(h.value)?h.value:null;L?(L.comment&&(y=L.comment),L.commentBefore&&(c=!0)):h.value==null&&(w!=null&&w.comment)&&(y=w.comment)}y&&(c=!0);let S=pt(h,l,()=>y=null);c||(c=d.length>u||S.includes(`
`)),v<n.length-1?S+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=d.reduce((w,L)=>w+L.length+2,2)+(S.length+2)>e.options.lineWidth)),c&&(S+=",")),y&&(S+=Je(S,s,o(y))),d.push(S),u=d.length}const{start:p,end:m}=t;if(d.length===0)return p+m;if(!c){const v=d.reduce((h,y)=>h+y.length+2,2);c=e.options.lineWidth>0&&v>e.options.lineWidth}if(c){let v=p;for(const h of d)v+=h?`
${a}${i}${h}`:`
`;return`${v}
${i}${m}`}else return`${p}${r}${d.join(" ")}${r}${m}`}function tn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=$e(e(s),n);t.push(a.trimStart())}}function Qe(n,e){const t=K(e)?e.value:e;for(const s of n)if(ee(s)&&(s.key===e||s.key===t||K(s.key)&&s.key.value===t))return s}class Se extends Js{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(je,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(Xn(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ee(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new he(e,e==null?void 0:e.value):s=new he(e.key,e.value);const i=Qe(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);K(i.value)&&zs(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=Qe(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=Qe(this.items,e),i=s==null?void 0:s.value;return(!t&&K(i)?i.value:i)??void 0}has(e){return!!Qe(this.items,e)}set(e,t){this.add(new he(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)ti(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ee(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ni(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const vt={collection:"map",default:!0,nodeClass:Se,tag:"tag:yaml.org,2002:map",resolve(n,e){return xt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Se.from(n,e,t)};class Xe extends Js{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(yt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Kt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Kt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&K(i)?i.value:i}has(e){const t=Kt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Kt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];K(i)&&zs(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(ke(a,String(i++),t));return s}toString(e,t,s){return e?ni(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(Ot(o,void 0,s))}}return a}}function Kt(n){let e=K(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const wt={collection:"seq",default:!0,nodeClass:Xe,tag:"tag:yaml.org,2002:seq",resolve(n,e){return $t(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Xe.from(n,e,t)},un={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),Qn(n,e,t,s)}},dn={identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new P(null),stringify:({source:n},e)=>typeof n=="string"&&dn.test.test(n)?n:e.options.nullStr},Zn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new P(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&Zn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Ce({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const si={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ce},ii={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ce(n)}},ai={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new P(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ce},fn=n=>typeof n=="bigint"||Number.isInteger(n),es=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function ri(n,e,t){const{value:s}=n;return fn(s)&&s>=0?t+s.toString(e):Ce(n)}const oi={identify:n=>fn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>es(n,2,8,t),stringify:n=>ri(n,8,"0o")},li={identify:fn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>es(n,0,10,t),stringify:Ce},ci={identify:n=>fn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>es(n,2,16,t),stringify:n=>ri(n,16,"0x")},Ra=[vt,wt,un,dn,Zn,oi,li,ci,si,ii,ai];function ws(n){return typeof n=="bigint"||Number.isInteger(n)}const qt=({value:n})=>JSON.stringify(n),xa=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:qt},{identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:qt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:qt},{identify:ws,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>ws(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:qt}],$a={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Fa=[vt,wt].concat(xa,$a),ts={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=P.BLOCK_LITERAL),e!==P.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let d=0,p=0;d<c;++d,p+=l)u[d]=o.substr(p,l);o=u.join(e===P.BLOCK_LITERAL?`
`:" ")}return Qn({comment:n,type:e,value:o},s,i,a)}};function ui(n,e){if($t(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ee(s)){if(xt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new he(new P(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ee(s)?s:new he(s)}}else e("Expected a sequence for this tag");return n}function di(n,e,t){const{replacer:s}=t,i=new Xe(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(Xn(o,l,t))}return i}const ns={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ui,createNode:di};class ht extends Xe{constructor(){super(),this.add=Se.prototype.add.bind(this),this.delete=Se.prototype.delete.bind(this),this.get=Se.prototype.get.bind(this),this.has=Se.prototype.has.bind(this),this.set=Se.prototype.set.bind(this),this.tag=ht.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ee(i)?(a=ke(i.key,"",t),r=ke(i.value,a,t)):a=ke(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=di(e,t,s),a=new this;return a.items=i.items,a}}ht.tag="tag:yaml.org,2002:omap";const ss={collection:"seq",identify:n=>n instanceof Map,nodeClass:ht,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=ui(n,e),s=[];for(const{key:i}of t.items)K(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new ht,t)},createNode:(n,e,t)=>ht.from(n,e,t)};function fi({value:n,source:e},t){return e&&(n?hi:mi).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const hi={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new P(!0),stringify:fi},mi={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new P(!1),stringify:fi},Ba={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ce},Va={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ce(n)}},Ua={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new P(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Ce},Ft=n=>typeof n=="bigint"||Number.isInteger(n);function hn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function is(n,e,t){const{value:s}=n;if(Ft(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Ce(n)}const Da={identify:Ft,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>hn(n,2,2,t),stringify:n=>is(n,2,"0b")},Ha={identify:Ft,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>hn(n,1,8,t),stringify:n=>is(n,8,"0")},ja={identify:Ft,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>hn(n,0,10,t),stringify:Ce},Ka={identify:Ft,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>hn(n,2,16,t),stringify:n=>is(n,16,"0x")};class mt extends Se{constructor(e){super(e),this.tag=mt.tag}add(e){let t;ee(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new he(e.key,null):t=new he(e,null),Qe(this.items,t.key)||this.items.push(t)}get(e,t){const s=Qe(this.items,e);return!t&&ee(s)?K(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=Qe(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new he(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(Xn(r,null,s));return a}}mt.tag="tag:yaml.org,2002:set";const as={collection:"map",identify:n=>n instanceof Set,nodeClass:mt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>mt.from(n,e,t),resolve(n,e){if(xt(n)){if(n.hasAllNullValues(!0))return Object.assign(new mt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function rs(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function pi(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Ce(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const gi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>rs(n,t),stringify:pi},yi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>rs(n,!1),stringify:pi},mn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(mn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let d=rs(u,!1);Math.abs(d)<30&&(d*=60),c-=6e4*d}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},_s=[vt,wt,un,dn,hi,mi,Da,Ha,ja,Ka,Ba,Va,Ua,ts,Be,ss,ns,as,gi,yi,mn],Ss=new Map([["core",Ra],["failsafe",[vt,wt,un]],["json",Fa],["yaml11",_s],["yaml-1.1",_s]]),ks={binary:ts,bool:Zn,float:ai,floatExp:ii,floatNaN:si,floatTime:yi,int:li,intHex:ci,intOct:oi,intTime:gi,map:vt,merge:Be,null:dn,omap:ss,pairs:ns,seq:wt,set:as,timestamp:mn},qa={"tag:yaml.org,2002:binary":ts,"tag:yaml.org,2002:merge":Be,"tag:yaml.org,2002:omap":ss,"tag:yaml.org,2002:pairs":ns,"tag:yaml.org,2002:set":as,"tag:yaml.org,2002:timestamp":mn};function Ln(n,e,t){const s=Ss.get(e);if(s&&!n)return t&&!s.includes(Be)?s.concat(Be):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Ss.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Be)),i.reduce((a,r)=>{const o=typeof r=="string"?ks[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(ks).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const Wa=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class os{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Ln(e,"compat"):e?Ln(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?qa:{},this.tags=Ln(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,je,{value:vt}),Object.defineProperty(this,Pe,{value:un}),Object.defineProperty(this,yt,{value:wt}),this.sortMapEntries=typeof r=="function"?r:r===!0?Wa:null}clone(){const e=Object.create(os.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Ya(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Xs(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift($e(c,""))}let r=!1,o=null;if(n.contents){if(Z(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push($e(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=pt(n.contents,i,()=>o=null,c);o&&(u+=Je(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(pt(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push($e(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push($e(a(c),"")))}return t.join(`
`)+`
`}class pn{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Ee,{value:Vn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new fe({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(pn.prototype,{[Ee]:{value:Vn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=Z(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){at(this.contents)&&this.contents.add(e)}addIn(e,t){at(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Ys(this);e.anchor=!t||s.has(t)?Gs(t||"a",s):t}return new Jn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const y=w=>typeof w=="number"||w instanceof String||w instanceof Number,S=t.filter(y).map(String);S.length>0&&(t=t.concat(S)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:d,setAnchors:p,sourceObjects:m}=_a(this,r||"a"),v={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:d,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},h=Ot(e,u,v);return o&&X(h)&&(h.flow=!0),p(),h}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new he(i,a)}delete(e){return at(this.contents)?this.contents.delete(e):!1}deleteIn(e){return At(e)?this.contents==null?!1:(this.contents=null,!0):at(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return X(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return At(e)?!t&&K(this.contents)?this.contents.value:this.contents:X(this.contents)?this.contents.getIn(e,t):void 0}has(e){return X(this.contents)?this.contents.has(e):!1}hasIn(e){return At(e)?this.contents!==void 0:X(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=en(this.schema,[e],t):at(this.contents)&&this.contents.set(e,t)}setIn(e,t){At(e)?this.contents=t:this.contents==null?this.contents=en(this.schema,Array.from(e),t):at(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new fe({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new fe({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new os(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=ke(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?ut(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Ya(this,e)}}function at(n){if(X(n))return!0;throw new Error("Expected a YAML collection as document contents")}class bi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Ct extends bi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Ga extends bi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Es=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function gt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,d="",p="",m=!1,v=!1,h=null,y=null,S=null,w=null,L=null,k=null,g=null;for(const N of n)switch(v&&(N.type!=="space"&&N.type!=="newline"&&N.type!=="comma"&&a(N.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),v=!1),h&&(c&&N.type!=="comment"&&N.type!=="newline"&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),h=null),N.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&N.source.includes("	")&&(h=N),u=!0;break;case"comment":{u||a(N,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const T=N.source.substring(1)||" ";d?d+=p+T:d=T,p="",c=!1;break}case"newline":c?d?d+=N.source:(!k||t!=="seq-item-ind")&&(l=!0):p+=N.source,c=!0,m=!0,(y||S)&&(w=N),u=!0;break;case"anchor":y&&a(N,"MULTIPLE_ANCHORS","A node can have at most one anchor"),N.source.endsWith(":")&&a(N.offset+N.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),y=N,g??(g=N.offset),c=!1,u=!1,v=!0;break;case"tag":{S&&a(N,"MULTIPLE_TAGS","A node can have at most one tag"),S=N,g??(g=N.offset),c=!1,u=!1,v=!0;break}case t:(y||S)&&a(N,"BAD_PROP_ORDER",`Anchors and tags must be after the ${N.source} indicator`),k&&a(N,"UNEXPECTED_TOKEN",`Unexpected ${N.source} in ${e??"collection"}`),k=N,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){L&&a(N,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),L=N,c=!1,u=!1;break}default:a(N,"UNEXPECTED_TOKEN",`Unexpected ${N.type} token`),c=!1,u=!1}const b=n[n.length-1],E=b?b.offset+b.source.length:i;return v&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),h&&(c&&h.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:L,found:k,spaceBefore:l,comment:d,hasNewline:m,anchor:y,tag:S,newlineAfterProp:w,end:E,start:g??E}}function Pt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Pt(e.key)||Pt(e.value))return!0}return!1;default:return!0}}function jn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Pt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function vi(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||K(a)&&K(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Ls="All mapping items must start at the same column";function za({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Se,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const d of s.items){const{start:p,key:m,sep:v,value:h}=d,y=gt(p,{indicator:"explicit-key-ind",next:m??(v==null?void 0:v[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),S=!y.found;if(S){if(m&&(m.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(l,"BAD_INDENT",Ls)),!y.anchor&&!y.tag&&!v){c=y.end,y.comment&&(o.comment?o.comment+=`
`+y.comment:o.comment=y.comment);continue}(y.newlineAfterProp||Pt(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=y.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Ls);t.atKey=!0;const w=y.end,L=m?n(t,m,y,i):e(t,w,p,null,y,i);t.schema.compat&&jn(s.indent,m,i),t.atKey=!1,vi(t,o.items,L)&&i(w,"DUPLICATE_KEY","Map keys must be unique");const k=gt(v??[],{indicator:"map-value-ind",next:h,offset:L.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(l=k.end,k.found){S&&((h==null?void 0:h.type)==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&y.start<k.found.offset-1024&&i(L.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const g=h?n(t,h,k,i):e(t,l,v,null,k,i);t.schema.compat&&jn(s.indent,h,i),l=g.range[2];const b=new he(L,g);t.options.keepSourceTokens&&(b.srcToken=d),o.items.push(b)}else{S&&i(L.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(L.comment?L.comment+=`
`+k.comment:L.comment=k.comment);const g=new he(L);t.options.keepSourceTokens&&(g.srcToken=d),o.items.push(g)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function Ja({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Xe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:d}of s.items){const p=gt(u,{indicator:"seq-item-ind",next:d,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||d)(d==null?void 0:d.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=p.end,p.comment&&(o.comment=p.comment);continue}const m=d?n(t,d,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&jn(s.indent,d,i),l=m.range[2],o.items.push(m)}return o.range=[s.offset,l,c??l],o}function Bt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const In="Block collections are not allowed within flow collections",Nn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Qa({composeNode:n,composeEmptyNode:e},t,s,i,a){var y;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?Se:Xe),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let S=0;S<s.items.length;++S){const w=s.items[S],{start:L,key:k,sep:g,value:b}=w,E=gt(L,{flow:o,indicator:"explicit-key-ind",next:k??(g==null?void 0:g[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!E.found){if(!E.anchor&&!E.tag&&!g&&!b){S===0&&E.comma?i(E.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):S<s.items.length-1&&i(E.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),E.comment&&(c.comment?c.comment+=`
`+E.comment:c.comment=E.comment),d=E.end;continue}!r&&t.options.strict&&Pt(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(S===0)E.comma&&i(E.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(E.comma||i(E.start,"MISSING_CHAR",`Missing , between ${o} items`),E.comment){let N="";e:for(const T of L)switch(T.type){case"comma":case"space":break;case"comment":N=T.source.substring(1);break e;default:break e}if(N){let T=c.items[c.items.length-1];ee(T)&&(T=T.value??T.key),T.comment?T.comment+=`
`+N:T.comment=N,E.comment=E.comment.substring(N.length+1)}}if(!r&&!g&&!E.found){const N=b?n(t,b,E,i):e(t,E.end,g,null,E,i);c.items.push(N),d=N.range[2],Nn(b)&&i(N.range,"BLOCK_IN_FLOW",In)}else{t.atKey=!0;const N=E.end,T=k?n(t,k,E,i):e(t,N,L,null,E,i);Nn(k)&&i(T.range,"BLOCK_IN_FLOW",In),t.atKey=!1;const x=gt(g??[],{flow:o,indicator:"map-value-ind",next:b,offset:T.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(x.found){if(!r&&!E.found&&t.options.strict){if(g)for(const F of g){if(F===x.found)break;if(F.type==="newline"){i(F,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}E.start<x.found.offset-1024&&i(x.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else b&&("source"in b&&((y=b.source)==null?void 0:y[0])===":"?i(b,"MISSING_CHAR",`Missing space after : in ${o}`):i(x.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const U=b?n(t,b,x,i):x.found?e(t,x.end,g,null,x,i):null;U?Nn(b)&&i(U.range,"BLOCK_IN_FLOW",In):x.comment&&(T.comment?T.comment+=`
`+x.comment:T.comment=x.comment);const R=new he(T,U);if(t.options.keepSourceTokens&&(R.srcToken=w),r){const F=c;vi(t,F.items,T)&&i(N,"DUPLICATE_KEY","Map keys must be unique"),F.items.push(R)}else{const F=new Se(t.schema);F.flow=!0,F.items.push(R);const G=(U??T).range;F.range=[T.range[0],G[1],G[2]],c.items.push(F)}d=U?U.range[2]:x.end}}const p=r?"}":"]",[m,...v]=s.end;let h=d;if((m==null?void 0:m.source)===p)h=m.offset+m.source.length;else{const S=o[0].toUpperCase()+o.substring(1),w=u?`${S} must end with a ${p}`:`${S} in block collection must be sufficiently indented and end with a ${p}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",w),m&&m.source.length!==1&&v.unshift(m)}if(v.length>0){const S=Bt(v,h,t.options.strict,i);S.comment&&(c.comment?c.comment+=`
`+S.comment:c.comment=S.comment),c.range=[s.offset,h,S.offset]}else c.range=[s.offset,h,h];return c}function An(n,e,t,s,i,a){const r=t.type==="block-map"?za(n,e,t,s,a):t.type==="block-seq"?Ja(n,e,t,s,a):Qa(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function Xa(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:v}=s,h=m&&a?m.offset>a.offset?m:a:m??a;h&&(!v||v.offset<h.offset)&&i(h,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Se.tagName&&o==="map"||r===Xe.tagName&&o==="seq")return An(n,e,t,i,r);let l=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!l){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),l=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),An(n,e,t,i,r)}const c=An(n,e,t,i,r,l),u=((p=l.resolve)==null?void 0:p.call(l,c,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??c,d=Z(u)?u:new P(u);return d.range=c.range,d.tag=r,l!=null&&l.format&&(d.format=l.format),d}function Za(n,e,t){const s=e.offset,i=er(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?P.BLOCK_FOLDED:P.BLOCK_LITERAL,r=e.source?tr(e.source):[];let o=r.length;for(let h=r.length-1;h>=0;--h){const y=r[h][1];if(y===""||y==="\r")o=h;else break}if(o===0){const h=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let y=s+i.length;return e.source&&(y+=e.source.length),{value:h,type:a,comment:i.comment,range:[s,y,y]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let h=0;h<o;++h){const[y,S]=r[h];if(S===""||S==="\r")i.indent===0&&y.length>l&&(l=y.length);else{y.length<l&&t(c+y.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=y.length),u=h,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=y.length+S.length+1}for(let h=r.length-1;h>=o;--h)r[h][0].length>l&&(o=h+1);let d="",p="",m=!1;for(let h=0;h<u;++h)d+=r[h][0].slice(l)+`
`;for(let h=u;h<o;++h){let[y,S]=r[h];c+=y.length+S.length+1;const w=S[S.length-1]==="\r";if(w&&(S=S.slice(0,-1)),S&&y.length<l){const k=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-S.length-(w?2:1),"BAD_INDENT",k),y=""}a===P.BLOCK_LITERAL?(d+=p+y.slice(l)+S,p=`
`):y.length>l||S[0]==="	"?(p===" "?p=`
`:!m&&p===`
`&&(p=`

`),d+=p+y.slice(l)+S,p=`
`,m=!0):S===""?p===`
`?d+=`
`:p=`
`:(d+=p+S,p=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let h=o;h<r.length;++h)d+=`
`+r[h][0].slice(l);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const v=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,v,v]}}function er({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const v=Number(m);!r&&v?r=v:l===-1&&(l=n+p)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",d=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":c=!0;case"newline":d+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),d+=m.source.length;break;default:{const v=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",v);const h=m.source;h&&typeof h=="string"&&(d+=h.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function tr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function nr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(p,m,v)=>t(s+p,m,v);switch(i){case"scalar":o=P.PLAIN,l=sr(a,c);break;case"single-quoted-scalar":o=P.QUOTE_SINGLE,l=ir(a,c);break;case"double-quoted-scalar":o=P.QUOTE_DOUBLE,l=ar(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=Bt(r,u,e,t);return{value:l,type:o,comment:d.comment,range:[s,u,d.offset]}}function sr(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),wi(n)}function ir(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),wi(n.slice(1,-1)).replace(/''/g,"'")}function wi(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function ar(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=rr(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=or[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=lr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function rr(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const or={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function lr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function _i(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?Za(n,e,s):nr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[Pe]:l?c=cr(n.schema,i,l,t,s):e.type==="scalar"?c=ur(n,i,e,s):c=n.schema[Pe];let u;try{const d=c.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=K(d)?d:new P(d)}catch(d){const p=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",p),u=new P(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function cr(n,e,t,s,i){var o;if(t==="!")return n[Pe];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Pe])}function ur({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[Pe];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[Pe];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function dr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const fr={composeNode:Si,composeEmptyNode:ls};function Si(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=hr(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=_i(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=Xa(fr,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(d){const p=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return c??(c=ls(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!K(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function ls(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:dr(e,t,s),indent:-1,source:""},d=_i(n,u,o,c);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=l),d}function hr({options:n},{offset:e,source:t,end:s},i){const a=new Jn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Bt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function mr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new pn(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=gt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Si(c,i,u,r):ls(c,u.end,s,null,u,r);const d=l.contents.range[2],p=Bt(a,d,!1,r);return p.comment&&(l.comment=p.comment),l.range=[t,d,p.offset],l}function Lt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Is(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class pr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Lt(t);a?this.warnings.push(new Ga(r,s,i)):this.errors.push(new Ct(r,s,i))},this.directives=new fe({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Is(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(X(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ee(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Is(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Lt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=mr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Ct(Lt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Ct(Lt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Bt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Ct(Lt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new pn(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const ki="\uFEFF",Ei="",Li="",Kn="";function gr(n){switch(n){case ki:return"byte-order-mark";case Ei:return"doc-mode";case Li:return"flow-error-end";case Kn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ie(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Ns=new Set("0123456789ABCDEFabcdef"),yr=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Wt=new Set(",[]{}"),br=new Set(` ,[]{}
\r	`),Cn=n=>!n||br.has(n);class vr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ie(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===ki&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Ei,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ie(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ie(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ie(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Cn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ie(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Li,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Cn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ie(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ie(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield Kn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ie(a)||e&&Wt.has(a))break;t=s}else if(Ie(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Wt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Wt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Kn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Cn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ie(t)||e&&Wt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ie(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(yr.has(t))t=this.buffer[++e];else if(t==="%"&&Ns.has(this.buffer[e+1])&&Ns.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class wr{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function De(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function As(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ii(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Yt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function rt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Cs(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!De(e.start,"explicit-key-ind")&&!De(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ii(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class _r{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new vr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=gr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Cs(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&As(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{As(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Yt(this.peek(2)),s=rt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(De(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ii(t.key)&&!De(t.sep,"newline")){const o=rt(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(De(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=rt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):De(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!De(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||De(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Yt(s),a=rt(i);Cs(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Yt(e),s=rt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Yt(e),s=rt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Sr(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new wr||null,prettyErrors:e}}function kr(n,e={}){const{lineCounter:t,prettyErrors:s}=Sr(e),i=new _r(t==null?void 0:t.addNewLine),a=new pr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Ct(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Es(n,t)),r.warnings.forEach(Es(n,t))),r}function Ve(n,e,t){let s;const i=kr(n,t);if(!i)return null;if(i.warnings.forEach(a=>Zs(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Er=`# Simulation family catalog source-of-truth.
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
  parameterSubtitle: Discover how brighter and fainter galaxies are shaped by their local neighbourhood. Can you make a spiral galaxy, an elliptical galaxy and an irregular galaxy?
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
`,Lr=`# Parameter definitions for each simulation family.
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
`;function te(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Ar=Ve(Er),Cr=Ve(Lr),Ts=Ve(Ir),Tr=Ve(Nr),ot=Object.entries(Ar).map(([n,e])=>{var r,o;const t=Mr(Ts[n]),s=(((r=Ts[n])==null?void 0:r.results)??[]).map(Or),i=((o=Tr[n])==null?void 0:o.liveStats)??[],a=Cr[n]??{};return{id:n,label:e.label,placeholderImage:te(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(qn),liveStats:i.map(qn)},parameters:Object.entries(a).map(([l,c])=>{const u=c.quali_labels,d=u!==void 0&&u.length>0,p=d?0:c.min,m=d?u.length-1:c.max,v=d?1:c.step??Pr(c.min,c.max),h=d?Math.floor(u.length/2):c.log_scale?Math.sqrt(c.min*c.max):Rr(c.min,c.max);return{id:l,label:c.label,unit:c.unit??"",min:p,max:m,step:v,fallbackValue:h,description:c.description,valueScale:c.value_scale,displayUnit:c.display_unit,displayFormat:c.display_format,displaySignificantFigures:c.display_significant_figures,logScale:c.log_scale,qualiLabels:u}}),views:(e.views??[]).map(l=>({id:l.id,label:l.label,icon:l.icon,audio:l.audio??!1,description:l.description}))}});function Mr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function qn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Or(n){return{...qn(n),target:n.target}}function Pr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Rr(n,e){return n+(e-n)/2}const Ni="universe-engine-theme",Ai=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function xr(){const n=localStorage.getItem(Ni);return Fr(n)?n:"glass"}function Tn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Ni,n)}function $r(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Ai){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function Fr(n){return Ai.some(e=>e.id===n)}let oe=null,Ne="primary";function Br(n,e=null){oe={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function Ms(){oe=null,Ne="primary"}function Vr(n){Ne=n}function Ur(n){return n==="local"?{mode:"local",base:null}:oe?{mode:Ne,base:Ci()}:{mode:"primary",base:null}}function Oe(n){if(!oe)return n;const e=Ci();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!Ps(t,oe.primaryBase)&&(!oe.backupBase||!Ps(t,oe.backupBase))?n:Rs(e,`${t.pathname}${t.search}${t.hash}`)}return Rs(e,n)}async function He(n,e){const t=Oe(n),s=!!(oe!=null&&oe.backupBase)&&Ne==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Os(n,e);return a.ok&&(Ne="backup"),a}catch(i){if(!s)throw i;const a=await Os(n,e);return a.ok&&(Ne="backup"),a}}function Ci(){return oe?Ne==="backup"&&oe.backupBase?oe.backupBase:oe.primaryBase:null}async function Os(n,e){if(!(oe!=null&&oe.backupBase))throw new Error("Backup asset host is not configured.");const t=Ne;Ne="backup";try{const s=await fetch(Oe(n),e);return s.ok||(Ne=t),s}catch(s){throw Ne=t,s}}function Ps(n,e){const t=new URL(e);return n.origin===t.origin}function Rs(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function Dr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,d=new Map;let p=null,m=null;const v=document.createElement("canvas"),h=v.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let y=s.playbackRate;function S(){p&&(URL.revokeObjectURL(p),p=null)}function w(I,M={}){const V=u.get(I);V&&(u.delete(I),M={...M,ownedObjectUrl:!0},I=V),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(I)){s.classList.remove("fade-out");return}const B=s.muted,$=M.seekFraction;S(),m=null,p=M.ownedObjectUrl?I:null,s.src=I,s.load(),s.onloadeddata=()=>{if(s.muted=B,$!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const se=Math.max(0,Math.min(.999,$));s.currentTime=se*s.duration}else s.currentTime=0;s.playbackRate=y,s.classList.remove("fade-out"),M.autoplay&&s.play().catch(()=>{})}},120)}function L(I){s.muted=I}async function k(){await s.play()}function g(){s.pause()}function b(){s.classList.add("is-empty")}function E(){s.classList.remove("is-empty")}function N(I){if(!Number.isFinite(s.duration)||s.duration<=0)return;const M=Math.max(0,Math.min(1,I));s.currentTime=M*s.duration}function T(){s.currentTime=0,i==null||i(0)}function x(I=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(M=>{const V=()=>{$(),M()},B=window.setTimeout(()=>{$(),M()},Math.max(0,I));function $(){window.clearTimeout(B),s.removeEventListener("loadeddata",V)}s.addEventListener("loadeddata",V,{once:!0})})}function U(I,M=8e3){const V=Math.max(0,I);return V===0||R(V)?Promise.resolve():new Promise(B=>{const $=()=>{R(V)&&(D(),B())},se=window.setTimeout(()=>{D(),B()},Math.max(0,M));function D(){window.clearTimeout(se),s.removeEventListener("progress",$),s.removeEventListener("canplay",$),s.removeEventListener("loadeddata",$)}s.addEventListener("progress",$),s.addEventListener("canplay",$),s.addEventListener("loadeddata",$),$()})}function R(I){const M=s.currentTime;for(let V=0;V<s.buffered.length;V+=1){const B=s.buffered.start(V),$=s.buffered.end(V);if(!(M<B||M>$))return $-M>=I}return!1}function F(I){o=new Set(I.filter(Boolean).filter(M=>M!==s.currentSrc)),l||j()}function G(){l=!0,re(),ye()}function J(){if(!l){j();return}l=!1,j()}function j(){for(const[I,M]of c.entries())o.has(I)||(M.removeAttribute("src"),M.load(),c.delete(I));for(const[I,M]of d.entries())o.has(I)||(M.abort(),d.delete(I));for(const I of o){if(!c.has(I)){const M=document.createElement("video");M.preload="auto",M.muted=!0,M.playsInline=!0,M.src=Oe(I),M.load(),c.set(I,M)}u.has(I)||d.has(I)||me(I)}}function re(){for(const I of c.values())I.removeAttribute("src"),I.load();c.clear()}function ye(){for(const I of d.values())I.abort();d.clear()}function me(I){const M=new AbortController;d.set(I,M);const V=`${I}?_=${Date.now()}`;He(V,{signal:M.signal}).then(async B=>{if(!B.ok)return;const $=await B.blob();o.has(I)&&u.set(I,URL.createObjectURL($))}).catch(B=>{B instanceof DOMException&&B.name}).finally(()=>{d.get(I)===M&&d.delete(I)})}function ne(){o.clear(),l=!1,re(),ye();for(const I of u.values())URL.revokeObjectURL(I);u.clear()}function le(I){return u.get(I)??null}function we(){!h||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(v.width=s.videoWidth,v.height=s.videoHeight,h.drawImage(s,0,0,v.width,v.height),m=v.toDataURL("image/jpeg",.85))}function ce(){return m||we(),m}function q(I){i=I}function z(I){a=I}return{setSource:w,setMuted:L,play:k,pause:g,hideMedia:b,showMedia:E,seekToFraction:N,resetPlayback:T,waitForLoadedData:x,waitForBufferedAhead:U,onTimeUpdate:q,onEnded:z,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:I=>{y=I,s.playbackRate=I},getPlaybackRate:()=>y,onPlayStateChange:I=>{r=I},getElement:()=>t,prewarmSources:F,suspendPrewarming:G,resumePrewarming:J,clearPrewarmedSources:ne,getPrewarmedBlobUrl:le,captureFrame:ce}}const Hr=[.25,.5,1,2];function jr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");u.className="timeline";const d=document.createElement("div");d.className="timeline__bar-row";const p=document.createElement("div");p.className="timeline__audio is-hidden";const m=document.createElement("button");m.className="timeline__audio-btn",m.type="button",m.setAttribute("aria-label","Toggle audio mute"),m.innerHTML=Kr(),m.addEventListener("click",()=>r==null?void 0:r()),p.appendChild(m);const v=document.createElement("button");v.className="timeline__play-btn",v.type="button",v.setAttribute("aria-label","Toggle playback"),v.addEventListener("click",()=>s==null?void 0:s());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const y=document.createElement("div");y.className="timeline__speed";const S=document.createElement("button");S.className="timeline__speed-btn",S.type="button",S.setAttribute("aria-label","Playback speed"),S.addEventListener("click",()=>{y.classList.toggle("open")});const w=document.createElement("div");w.className="timeline__speed-menu";for(const g of Hr){const b=document.createElement("button");b.className="timeline__speed-option",b.type="button",b.textContent=Mn(g),b.addEventListener("click",()=>{y.classList.remove("open"),i==null||i(g)}),w.appendChild(b)}y.appendChild(S),y.appendChild(w);const L=document.createElement("button");return L.className="timeline__summary-btn",L.type="button",L.setAttribute("aria-label","View run summary"),L.textContent="ⓘ",L.addEventListener("click",()=>a==null?void 0:a()),d.appendChild(p),d.appendChild(v),d.appendChild(h),d.appendChild(y),d.appendChild(L),h.addEventListener("input",()=>{const g=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${g*100}%`),t==null||t(g)}),h.addEventListener("pointerdown",()=>o==null?void 0:o()),h.addEventListener("pointerup",()=>l==null?void 0:l()),h.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",g=>{y.contains(g.target)||y.classList.remove("open")}),u.appendChild(d),n.appendChild(u),k(c),{setPosition(g){const b=Math.max(0,Math.min(1,g));h.value=String(Math.round(b*1e3)),h.style.setProperty("--fill",`${b*100}%`)},setPlaying(g){v.textContent=g?"⏸":"▶",v.classList.toggle("is-paused",!g),v.setAttribute("aria-label",g?"Pause":"Play")},setSpeed(g){k(g)},setAudioVisible(g){p.hidden=!g,p.classList.toggle("is-hidden",!g)},setMuted(g){m.classList.toggle("is-muted",g),m.setAttribute("aria-label",g?"Unmute audio":"Mute audio")}};function k(g){S.textContent=Mn(g);for(const b of w.children)b.classList.toggle("is-active",b.textContent===Mn(g))}}function Mn(n){return`x${n}`}function Kr(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function qr(n,e){const t=Math.min(Ti(e),2);return n.toFixed(t)}function Ae(n,e){return e?`${n} ${e}`:n}function Rt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?It(n):e<1e6?`${t}${It(n/1e3)}K`:e<1e9?`${t}${It(n/1e6)}M`:e<1e12?`${t}${It(n/1e9)}B`:`${t}${It(n/1e12)}T`:String(n)}function It(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Wr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function nn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return Rt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ft(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?Rt(i):qr(i,a)}function Ti(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function Yr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=Gr(s,i,a);for(const o of s.metadata.liveStats){const l=Jr(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function Gr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":ft(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:zr(a),value:r}]))}}function zr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Jr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=Qr((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Ae(a,n.unit)}}function Qr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Rt(Math.round(a)):Rt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Wr(n,{integer:e.integer})}function Xr(){const n=te("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(eo()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(p){o.innerHTML="";for(const m of p){const v=document.createElement("button");v.className="entry-overlay__button",v.type="button";const h=to[m.id]??"Explore this simulation scale.";v.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${h}</span>
      `,v.addEventListener("click",()=>t(m)),o.appendChild(v)}}l(e);const{infoButton:c,infoModal:u,close:d}=Xr();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){d(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(p){l(p)}}}function so(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(k=>[k.id,k.target])),a=n.metadata.results.map(k=>{const g=Pn(n,e,s,k.id);return g===null?null:{id:k.id,value:g,target:k.target}}).filter(k=>k!==null),r=n.parameters.filter(k=>i[k.id]!==void 0).map(k=>{const g=e[k.id]??k.fallbackValue,b=i[k.id]??k.fallbackValue;return Math.abs(g-b)/Math.max(k.max-k.min,1e-9)}),o=r.reduce((k,g)=>k+g,0)/Math.max(r.length,1),l=ro(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${On(u,1)} CPU-hrs
${On(d,1)} GB`,m=String(n.parameters.length),v=`${(o*100).toFixed(1)}%`,h=String(n.parameters.length+6),y="Present",S=ao((s==null?void 0:s.wallclockSeconds)??t),w=xs($s(Pn(n,e,s,"moon_iron"))),L=xs($s(Pn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:S},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:v},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:On(d,1)},particlesUpdated:{label:"Particle updates",value:s?io(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:w},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:L},audioTrack:{label:"Audio Track",value:y},terminalLines:{label:"Terminal Lines",value:h},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([k,g])=>[k,{label:g.label,value:g.value}]))}}function io(n){return String(Math.max(0,n))}function ao(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function On(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Pn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function xs(n){return n===null?"--":n.toFixed(1)}function $s(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function ro(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const Wn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},oo={HIDE_AFTER_MS:980},Mi="https://media.universemakers.org/engine/run-manifest.json",Rn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",lo="https://universe-engine.universe-engine.workers.dev/api/track-run",co=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Fs=(()=>{const n=Ve(co),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),sn="#4CD98A",Yn="#E8951C",Oi="#D7372A",Pi=.2,Ri=.5,Bs=2;function xi(n){const e=Math.abs(n-1);return e<=Pi?{word:"On target",colour:sn}:e<=Ri?{word:n>1?"Too high":"Too low",colour:Yn}:{word:n>1?"Way too high":"Way too low",colour:Oi}}function uo(n){const e=Math.abs(n-1),t=n>=1;return e<=Pi?t?"greenHigh":"greenLow":e<=Ri?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function fo(n){return Math.min(Math.max(n,0),Bs)/Bs*100}function ho(n){return n>=85?{word:"Almost perfect",colour:sn}:n>=65?{word:"Really close",colour:sn}:n>=45?{word:"Getting there",colour:Yn}:n>=25?{word:"Not quite",colour:Yn}:{word:"Way off - try again",colour:Oi}}function mo(n,e,t){var r,o;const s=uo(t),i=((r=Fs[n])==null?void 0:r[s])??((o=Fs[e])==null?void 0:o[s]);return i||(xi(t).colour===sn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function po(n,e,t){return n.metadata.results.map(s=>{const i=go(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=yo(s,n,t),o=mo(s.id,r,a),l=Ae($i(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function go(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=bo((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function yo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function bo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function vo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function wo(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const d=document.createElement("button"),p=document.createElement("button");d.className="summary-overlay__button summary-overlay__button--primary",d.type="button",d.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),c.appendChild(d),c.appendChild(u),c.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const v=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__verdict"),y=m.querySelector(".sci-modal__body"),S=m.querySelector(".sci-modal__close");function w(b){const E=xi(b.value);v.textContent=b.label,h.textContent=E.word,h.style.color=E.colour,h.hidden=!1,y.textContent=b.detail,m.classList.remove("is-hidden")}function L(b,E){v.textContent=b,h.hidden=!0,y.textContent=E,m.classList.remove("is-hidden")}function k(){m.classList.add("is-hidden")}S.addEventListener("click",k),m.addEventListener("click",b=>{b.target===m&&k()}),t.addEventListener("click",b=>{b.target===t&&e.onReplay()});function g(b,E){const N=document.createElement("div");N.className=`${b.className} panel`,N.innerHTML=`<p class="sci-section__title">${b.title}</p>`;const T=document.createElement("div"),x=b.singleRow?Math.max(1,b.stats.length):Math.max(1,Math.min(b.stats.length,b.maxColumns));T.className="metric-grid",b.singleRow&&T.classList.add("metric-grid--single-row"),T.style.setProperty("--summary-grid-columns",String(x)),T.style.setProperty("--summary-grid-max-width",`${b.maxWidthRem}rem`);for(const U of b.stats){const R=_o(U,E),F=document.createElement("div"),G=document.createElement("span"),J=document.createElement("span");F.className="res-card",G.className="res-card__label",G.textContent=R.label,J.className="res-card__value",J.textContent=R.value,F.appendChild(G),F.appendChild(J),U.description&&(F.classList.add("res-card--has-info"),F.addEventListener("click",()=>{L(R.label,U.description)})),T.appendChild(F)}return N.appendChild(T),N}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},oo.HIDE_AFTER_MS)},setHomeVisible(b){p.hidden=!b},update(b,E,N,T,x){var ce;r.innerHTML="",k();const U=so(b,E,N,T),R=b.metadata.summaryStats,F=po(b,E,T),G=new Set(F.map(q=>q.id));let J;if(F.length>0)J=vo(F);else{const q=((ce=U.similarityScore)==null?void 0:ce.value)??"0/100";J=parseInt(q,10)||0}const j=ho(J),re=document.createElement("div"),ye=document.createElement("div"),me=document.createElement("div");re.className="sci-top",ye.className="summary-main-column",me.className="summary-side-column";const ne=document.createElement("div");ne.className="sci-hero panel",x?(ne.classList.add("sci-hero--thumbnail"),ne.innerHTML=`<img class="sci-hero__thumbnail" src="${x}" alt="Final frame of simulation" />`):ne.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${J}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${j.colour}">${j.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${J}%; background:${j.colour}; box-shadow:0 0 12px ${j.colour}"></div>
          </div>
        `,ye.appendChild(ne);const le=R.filter(q=>(q.section??"resources")==="resources"&&!F.some(z=>z.id===String(q.id))&&q.id!=="similarityScore"),we=R.filter(q=>q.section==="simulationStats"&&!G.has(String(q.id)));if(le.length>0&&me.appendChild(g({title:"Resources Used",className:"res-section",stats:le,maxColumns:3,maxWidthRem:48},U)),we.length>0&&me.appendChild(g({title:"Simulation Stats",className:"res-section",stats:we,maxColumns:we.length,maxWidthRem:48,singleRow:!0},U)),re.appendChild(ye),me.childElementCount>0&&re.appendChild(me),r.appendChild(re),F.length>0){const q=document.createElement("div");q.className="sci-bottom-row";const z=document.createElement("div");z.className="sci-section panel param-section",z.innerHTML='<p class="sci-section__title">Input Parameters</p>';const I=document.createElement("div");I.className="param-cards";for(const D of b.parameters){const pe=E[D.id]??D.fallbackValue,be=D.displayUnit??D.unit,H=document.createElement("div"),Ue=document.createElement("span"),Re=document.createElement("span");H.className="res-card",D.description&&(H.classList.add("res-card--has-info"),H.addEventListener("click",()=>L(D.label,D.description))),Ue.className="res-card__label",Ue.textContent=D.label,Re.className="res-card__value";const et=D.displayFormat==="qualitative"&&D.qualiLabels?D.qualiLabels[Math.round(pe)]??"--":ft(pe,D.step,{scale:D.valueScale,format:D.displayFormat,significantFigures:D.displaySignificantFigures});Re.textContent=Ae(et,be),H.appendChild(Ue),H.appendChild(Re),I.appendChild(H)}z.appendChild(I);const M=document.createElement("div"),V=document.createElement("div"),B=document.createElement("p"),$=document.createElement("p");M.className="sci-section panel",V.className="sci-section__header",B.className="sci-section__title",B.textContent="Similarity Results",$.className="sci-section__hint",$.textContent="Select any bar for details",V.appendChild(B),V.appendChild($);const se=document.createElement("div");se.className="sci-bars";for(const D of F){const pe=document.createElement("div");pe.className="sci-bar",pe.innerHTML=`
            <div class="sci-bar__name">${D.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${fo(D.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${D.formattedValue}</div>
          `,pe.addEventListener("click",()=>w(D)),se.appendChild(pe)}M.appendChild(V),M.appendChild(se),q.appendChild(z),q.appendChild(M),r.appendChild(q)}}}}function _o(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=So(s,n);if(i)return{label:n.label??t.label,value:i};const a=$i(s,n);return{label:n.label??t.label,value:Ae(a,n.unit)}}function So(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Ae(nn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Ae(nn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Ae(n,e.unit)}function $i(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return nn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return nn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Rt(i)}function ko(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=Eo(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Lo()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Eo(n){switch(n){case"dark-matter":return ze(`
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
  `)}const Io=`# Credits source-of-truth.
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
`;function No(){const n=Ve(Io);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Ao(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:Co(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const v=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__body"),y=m.querySelector(".sci-modal__close");function S(k,g){v.textContent=k,h.textContent=g,m.classList.remove("is-hidden")}function w(){m.classList.add("is-hidden")}y.addEventListener("click",w),m.addEventListener("click",k=>{k.target===m&&w()});const L=document.createElement("div");L.className="parameter-editor__list";for(const k of u.parameters)L.appendChild(l(k,S));i.appendChild(L),c()}function l(u,d){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const v=document.createElement("span");v.className="res-card__label",v.textContent=u.label;const h=u.displayUnit??u.unit,y=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,S=document.createElement("span");if(S.className="param-card__range",y){const b=u.qualiLabels;S.textContent=`${b[0]} – ${b[b.length-1]}`}else S.textContent=`${Ae(ft(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)} – ${Ae(ft(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}`;m.appendChild(v),m.appendChild(S);const w=document.createElement("input");w.className="param-card__slider",w.type="range";const L=r[u.id]??u.fallbackValue;if(y){const b=u.qualiLabels.length;w.min="0",w.max=String(b-1),w.step="1",w.value=String(Math.round(L))}else{const b=u.logScale?Math.log10(u.min):u.min,E=u.logScale?Math.log10(u.max):u.max;w.min=String(b),w.max=String(E),w.step=u.logScale?"0.001":String(u.step),w.value=String(u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L)}w.setAttribute("aria-label",u.label);const k=document.createElement("span");k.className="res-card__value";function g(b){if(y){const E=Math.round(b),N=u.qualiLabels;r[u.id]=E,w.value=String(E),w.style.setProperty("--fill",`${Gt(E,0,N.length-1)}%`),k.textContent=N[E]??String(E)}else{const E=u.logScale?10**b:b;r[u.id]=E,w.value=String(b),w.style.setProperty("--fill",`${Gt(b,parseFloat(w.min),parseFloat(w.max))}%`),k.textContent=Ae(ft(E,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}c()}if(w.addEventListener("input",()=>{g(parseFloat(w.value))}),w.addEventListener("pointerdown",b=>b.stopPropagation()),w.addEventListener("click",b=>b.stopPropagation()),y){const b=Math.round(L),E=u.qualiLabels;w.style.setProperty("--fill",`${Gt(b,0,E.length-1)}%`),k.textContent=E[b]??String(b)}else{const b=u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L;w.style.setProperty("--fill",`${Gt(b,parseFloat(w.min),parseFloat(w.max))}%`),k.textContent=Ae(ft(L,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}if(u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const b=document.createElement("span");b.className="param-card__info-btn",b.setAttribute("aria-label","Parameter description"),b.textContent="ⓘ",m.appendChild(b),p.addEventListener("click",()=>{d(u.label,u.description)})}return p.appendChild(m),p.appendChild(w),p.appendChild(k),p}function c(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Co(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function Gt(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Fi="universe-engine-advanced-settings",To="RSSSE26UM_Engine";function an(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Mo(n){const e=localStorage.getItem(Fi);if(!e)return an();try{const t=JSON.parse(e);return Bi(t,n)}catch{return an()}}function Oo(n,e){const t=Bi(n,e);return localStorage.setItem(Fi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Bi(n,e){const t=an(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Po(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Po(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):an().defaultAudioVolume}function Ro(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function xo(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const l=document.createElement("div");l.className="config-overlay__header";const c=document.createElement("div");c.className="config-overlay__title-block",c.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=c.querySelector(".config-overlay__eyebrow"),d=c.querySelector(".config-overlay__title"),p=c.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Back"),m.textContent="←",l.appendChild(c),l.appendChild(m);const v=document.createElement("section");v.className="config-overlay__section config-overlay__section--grow",v.dataset.section="parameters";const h=document.createElement("div");v.appendChild(h);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="settings",y.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const S=document.createElement("div");y.appendChild(S);const w=document.createElement("section");w.className="audio-settings",w.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const L=document.createElement("label");L.className="advanced-settings__field advanced-settings__field--inline";const k=document.createElement("input"),g=document.createElement("span");k.type="checkbox",k.className="advanced-settings__checkbox",g.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,L.appendChild(k),L.appendChild(g),w.appendChild(L);const b=document.createElement("label");b.className="advanced-settings__field",b.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const E=document.createElement("input"),N=document.createElement("span");E.type="range",E.min="0",E.max="100",E.step="1",E.className="audio-settings__slider",N.className="audio-settings__value",b.appendChild(E),b.appendChild(N),w.appendChild(b),y.appendChild(w);const T=document.createElement("section");T.className="advanced-settings",T.dataset.state="closed",T.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const x=document.createElement("button");x.className="advanced-settings__access",x.type="button",x.textContent="Advanced Settings",T.appendChild(x);const U=document.createElement("div");U.className="advanced-settings__auth";const R=document.createElement("input");R.className="advanced-settings__password",R.type="password",R.placeholder="Enter password",R.autocomplete="off";const F=document.createElement("button");F.className="advanced-settings__unlock",F.type="button",F.textContent="Unlock";const G=document.createElement("p");G.className="advanced-settings__message",U.appendChild(R),U.appendChild(F),U.appendChild(G),T.appendChild(U);const J=document.createElement("div");J.className="advanced-settings__form";const j=document.createElement("label");j.className="advanced-settings__field",j.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const re=document.createElement("select");re.className="advanced-settings__select",re.appendChild(new Option("None",""));for(const A of e.availableScales)re.appendChild(new Option(A.label,A.id));j.appendChild(re),J.appendChild(j);const ye=document.createElement("div");ye.className="advanced-settings__field",ye.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const me=document.createElement("div");me.className="advanced-settings__options";const ne=document.createElement("label"),le=document.createElement("input");ne.className="advanced-settings__choice",le.type="radio",le.name="manifest-source",le.value="local",ne.appendChild(le),ne.append("Local manifest");const we=document.createElement("label"),ce=document.createElement("input");we.className="advanced-settings__choice",ce.type="radio",ce.name="manifest-source",ce.value="online",we.appendChild(ce),we.append("Online manifest"),me.appendChild(ne),me.appendChild(we),ye.appendChild(me),J.appendChild(ye);const q=document.createElement("label");q.className="advanced-settings__field advanced-settings__field--inline";const z=document.createElement("input"),I=document.createElement("span");z.type="checkbox",z.className="advanced-settings__checkbox",I.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,q.appendChild(z),q.appendChild(I),J.appendChild(q);const M=document.createElement("div");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const V=document.createElement("div");V.className="advanced-settings__options";const B=new Map;for(const A of e.availableScales){const W=document.createElement("label"),Q=document.createElement("input");W.className="advanced-settings__choice",Q.type="checkbox",Q.value=A.id,B.set(A.id,Q),W.appendChild(Q),W.append(`Show ${A.label}`),V.appendChild(W)}M.appendChild(V),J.appendChild(M),T.appendChild(J),y.appendChild(T);const $=document.createElement("section");$.className="config-overlay__section config-overlay__section--grow",$.dataset.section="credits",$.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const se=$.querySelector("[data-credits]"),D=No();if(se.innerHTML="",D.length===0){const A=document.createElement("div");A.className="credits-list__entry",A.textContent="To be credited...",se.appendChild(A)}else for(const A of D)if(A.header){const W=document.createElement("div");W.className="credits-list__heading",W.textContent=A.text,se.appendChild(W)}else{const W=document.createElement("div");W.className="credits-list__entry";const Q=document.createElement("span");if(Q.className="credits-list__text",A.url){const Y=document.createElement("a");Y.className="credits-list__link",Y.href=A.url,Y.target="_blank",Y.rel="noopener noreferrer",Y.textContent=A.text,Q.appendChild(Y)}else Q.textContent=A.text;W.appendChild(Q),se.appendChild(W)}const pe=document.createElement("div");pe.className="config-overlay__footer";const be=document.createElement("button");be.className="run-button",be.type="button",be.textContent="Run",pe.appendChild(be),o.appendChild(l),o.appendChild(v),o.appendChild(y),o.appendChild($),o.appendChild(pe),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let H=Nt(e.advancedSettings),Ue="closed";const Re=Ao(h,e.simClass,e.values,e.onValuesChange),et=$r(S,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),x.addEventListener("click",()=>{if(Ue==="open"){tt("closed");return}tt("auth"),R.focus()}),F.addEventListener("click",Vt),R.addEventListener("keydown",A=>{A.key==="Enter"&&Vt()}),re.addEventListener("change",()=>{H.lockedScaleId=re.value||null,xe()}),le.addEventListener("change",()=>{le.checked&&(H.manifestSource="local")}),ce.addEventListener("change",()=>{ce.checked&&(H.manifestSource="online")}),z.addEventListener("change",()=>{H.verboseLogging=z.checked}),k.addEventListener("change",()=>{H.audioMutedByDefault=k.checked}),E.addEventListener("input",()=>{H.defaultAudioVolume=Number(E.value)/100,nt()});for(const[A,W]of B.entries())W.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,Y])=>Y.checked).map(([Y])=>Y).length===0&&!H.lockedScaleId){W.checked=!0;return}H.hiddenScaleIds=Array.from(B.keys()).filter(Y=>{var Me;return!((Me=B.get(Y))!=null&&Me.checked)&&Y!==H.lockedScaleId}),xe()}),A===H.lockedScaleId&&(W.disabled=!0);Ke(e.initialView??"parameters"),xe();function Ke(A){o.dataset.view=A,A==="parameters"?(u.textContent=e.simClass.label,d.textContent="Shape Your Simulation",p.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):A==="settings"?(u.textContent="Interface",d.textContent="Adjust The Control Room",p.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=te("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",d.textContent="Project Sources And Attribution",p.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=te("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),A==="settings"?be.textContent="Apply":A==="credits"?be.textContent="Close":be.textContent="Run Simulation"}function xe(){re.value=H.lockedScaleId??"",le.checked=H.manifestSource==="local",ce.checked=H.manifestSource==="online",z.checked=H.verboseLogging,k.checked=H.audioMutedByDefault,E.value=String(Math.round(H.defaultAudioVolume*100)),nt();for(const[A,W]of B.entries()){const Q=H.lockedScaleId===A;W.checked=Q||!H.hiddenScaleIds.includes(A),W.disabled=Q}}function Vt(){if(R.value!==To){G.textContent="Incorrect password";return}R.value="",G.textContent="",tt("open")}function tt(A){Ue=A,T.dataset.state=A,x.textContent=A==="open"?"Hide Advanced Settings":"Advanced Settings",A!=="auth"&&(G.textContent="")}function Te(){R.value="",G.textContent="",tt("closed")}function ue(){H=Nt(e.advancedSettings),xe()}function nt(){N.textContent=`${Math.round(Number(E.value))}%`}return be.addEventListener("click",()=>{const A=o.dataset.view;if(A==="settings"){e.onApplySettings(Nt(H));return}if(A==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),ue(),Te()},setSimulation(A,W){e.simClass=A,a.dataset.simClass=A.id,Re.setSimClass(A,W),o.dataset.view==="parameters"&&(r.src=A.placeholderImage,r.alt=`${A.label} preview`,Ke("parameters"))},setTheme(A){et.setActive(A)},setView(A){Ke(A),A!=="settings"&&Te()},setAdvancedSettings(A){e.advancedSettings=Nt(A),H=Nt(A),xe(),Te()}}}function Nt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function $o(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=Wn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const v of l)window.clearTimeout(v);l=[]}function d(v,h){return new Promise(y=>{const S=window.setTimeout(()=>{h===c&&y()},Math.max(0,v));l.push(S)})}async function p(v,h){const y=document.createElement("div");y.className="terminal__line";const S=m();y.appendChild(S),o.appendChild(y);for(let w=0;w<v.length;w+=1){if(h!==c)return;const L=v[w];y.insertBefore(document.createTextNode(L),S),o.scrollTop=o.scrollHeight,await d(e,h)}S.remove()}function m(){const v=document.createElement("span");return v.className="terminal__cursor",v.textContent="█",v}return{async show(v,h,y,S){u(),c+=1;const w=c;i.hidden=!1,i.classList.remove("is-hidden");const L=performance.now(),k=(S==null?void 0:S.minTerminalTimeMs)??t;let g=!y,b=[...v];y&&y.then(()=>{g=!0});let E=0;for(;w===c;){b.length===0&&(b=[...v]);const T=Math.floor(Math.random()*b.length),[x]=b.splice(T,1),U=`${Vs(E)} ${x.text}`;if(E+=1,await p(U,w),w!==c)return;if(performance.now()-L>=k&&g)break}if(w!==c)return;const N=document.createElement("div");N.className="terminal__line terminal__line--syncing",N.textContent=`${Vs(E)} STARTING SIMULATION...`,o.appendChild(N),o.scrollTop=o.scrollHeight,await d(s,w),w===c&&h()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Vs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${xn(t)}:${xn(s)}:${xn(i)}]`}function xn(n){return String(n).padStart(2,"0")}function Fo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=l("Home",()=>{c(),e.onHome()});s.appendChild(a),s.appendChild(l("Settings",()=>{c(),e.onViewSelected("settings")})),s.appendChild(l("Credits",()=>{c(),e.onViewSelected("credits")}));const r=l("Fullscreen",()=>{var d;c(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||c()}),u(e.showHome??!0),{close:c,setHomeVisible:u};function l(d,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,m.addEventListener("click",p),m}function c(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const Vi="universe-engine-playback-speed",Bo=new Set([.25,.5,1,2]);function Vo(){const n=localStorage.getItem(Vi),e=n?Number(n):NaN;return Bo.has(e)?e:1}function Uo(n){localStorage.setItem(Vi,String(n))}async function $n(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function Do(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const Ho=`# Initialization terminal script for the Planetary simulation family.
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
`,qo={planetary:Ho,galaxy:jo,cosmos:Ko};function Wo(n){return Ve(qo[n.id]).map(t=>({text:t}))}function Yo(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function Go(n){try{const e=await He(n);if(!e.ok)return null;const t=await e.text(),s=Ve(t),i=lt(s.wallclockSeconds),a=lt(s.computeUsed),r=lt(s.memoryUsed),o=lt(s.carbonBurnt),l=lt(s.particlesUpdated),c=await zo(n),u=Qo(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function zo(n){try{const e=await He(Jo(n));if(!e.ok)return{};const t=await e.text(),s=Ve(t);return Xo(s)}catch{return{}}}function Jo(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function lt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function Qo(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function Xo(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=lt(s);i!==null&&(e[t]=i)}return e}const Ui="[UniverseEngine]";let Di=!1;function Us(n){Di=n}function Hi(){return Di}function ae(n,e){Hi()&&console.info(Ui,n,e??"")}function Fe(n,e){Hi()&&console.warn(Ui,n,e??"")}const Zo={local:"assets/local-manifest.json",online:Mi};function el(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),Ms(),e=s,ae("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await Ki(e,t)},async findNearestVideo(s,i,a){const r=await sl(e,t,s,i,a);if(r)return r;const o=ji(s);return Fe("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:tl(s),summaryUrl:Yo(o)}}}}function ji(n){switch(n){case"planetary":return te("assets/planet_test.mp4");case"galaxy":return te("assets/galaxy_test.mp4");case"cosmos":return te("assets/cosmo_test.mp4");default:return te("assets/galaxy_test.mp4")}}function tl(n){switch(n){case"planetary":return te("assets/planet_test_planetary_stats.csv");case"galaxy":return te("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return te("assets/cosmo_test_cosmos_stats.csv");default:return te("assets/galaxy_test_galaxy_stats.csv")}}async function Ki(n,e){const t=e.get(n);if(t)return t;const s=Zo[n],i=(n==="online"?nl(s):fetch(te(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ae("Loaded manifest",{source:n,manifestPath:s}),await a.json()})).catch(a=>(Fe("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function nl(n){const e=[n,Rn];for(const t of e)try{const s=await fetch(t);if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??Ds(Mi),r=i.backupBase??Ds(Rn);return Br(a,r),t===Rn&&Vr("backup"),ae("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function sl(n,e,t,s,i){const r=(await Ki(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return Fe("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],l=Hs(o,s,i);for(const d of r.slice(1)){const p=Hs(d,s,i);p<l&&(o=d,l=p)}const c=o.defaultView??Object.keys(o.views)[0],u=o.views[c];return u?(ae("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:l,viewId:c}),{url:zt(n,u),liveDataUrl:zt(n,o.liveDataPath),summaryUrl:zt(n,o.summaryPath),viewId:c,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,p])=>[d,zt(n,p)]))}):null}function zt(n,e){return n==="local"?te(e):Oe(e)}function Ds(n){const e=new URL(n);return`${e.protocol}//${e.host}`}function Hs(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var c;const r=t[a.id]??a.fallbackValue,o=((c=n.parameters)==null?void 0:c[a.id])??a.fallbackValue,l=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/l},0)/e.length}const Zt={mode:"time",frames:[]};async function il(n){const e=await He(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return ol(t)}function al(n,e,t=0){if(n.mode==="row")return ll(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=rl(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return cl(r.values,o.values,l)}function rl(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function ol(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Zt;const t=Fn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Fn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Fn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function ll(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Fn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function cl(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=ul(u);continue}i[a]=t<.5?r:o}return i}function ul(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function dl(n){fl(lo,n)}function fl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ae("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ae("Run selection tracked",{simulationId:e.simulationId}):Fe("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Fe("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const js=50*1024*1024,hl=8,ml=6e3,pl=8e3,gl=5e3,yl=1200,bl=100,Bn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function vl(n){const e=ot.map(f=>f.id);let t=Mo(e),s=ys(t);const i=el(t.manifestSource),a=Do();Us(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=bs(t.lockedScaleId)??s[0]??ot[0],o=t.lockedScaleId?Bn[r.id]:xr(),l=!1,c=null,u=null,d=!1,p=t.audioMutedByDefault,m=t.defaultAudioVolume,v=0,h=null,y=0,S=Zt,w=!1;const L=Object.fromEntries(ot.map(f=>[f.id,sa(f)]));Tn(o);const k=ji(r.id),g=Dr(n,k),b=document.createElement("audio");b.preload="auto",b.hidden=!0,b.setAttribute("playsinline","true"),b.muted=p,b.volume=m,n.appendChild(b);const E=document.createElement("div");E.className="display-chrome",E.classList.add("is-hidden"),n.appendChild(E);const N=document.createElement("div");N.className="orientation-overlay",N.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(N);const T=document.createElement("div");T.className="swift-logo",T.innerHTML=`
    <img
      class="swift-logo__image"
      src="${te("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(T);const x=document.createElement("div");x.className="synth-logo is-hidden",x.innerHTML=`
    <img
      class="synth-logo__image"
      src="${te("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(x);const U=document.createElement("img");U.className="app-partner-logo",U.src=te("assets/dirac-hpc-white.webp"),U.alt="DIRAC HPC",U.decoding="async",n.appendChild(U);const R=document.createElement("div");R.className="display-chrome__top-left is-hidden",n.appendChild(R);const F=Fo(R,{onHome(){vn()},onViewSelected(f){if(f==="credits"){Dt("credits");return}Dt(f)},showHome:!t.lockedScaleId}),G=document.createElement("div");G.className="display-chrome__left-center",E.appendChild(G);const J=ko(G,{onSelect(f){hs(f)},onInfo(f,_,C){re.textContent=_,ye.textContent=C,j.classList.add("is-visible")}}),j=document.createElement("div");j.className="view-info-overlay",j.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(j);const re=j.querySelector(".view-info-overlay__title"),ye=j.querySelector(".view-info-overlay__text"),me=j.querySelector(".view-info-overlay__close");j.addEventListener("click",f=>{f.target===j&&j.classList.remove("is-visible")}),me.addEventListener("click",()=>{j.classList.remove("is-visible")});const ne=document.createElement("div");ne.className="display-chrome__top-center is-hidden",E.appendChild(ne);const le=document.createElement("div");le.className="display-chrome__top-right",E.appendChild(le);const we=Yr(le),ce=document.createElement("div");ce.className="display-chrome__center-status",ce.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,E.appendChild(ce);const q=Vo();g.setPlaybackRate(q);const z=document.createElement("div");z.className="display-chrome__bottom",E.appendChild(z);const I=jr(z,{onChange(f){H(f)},onTogglePlay:fs,onAudioToggle:Ji,onSpeedChange:Qi,onSummaryClick:zi,onScrubStart(){Vt(),be()},onScrubEnd(){tt(),g.isPaused()||pe()},initialSpeed:q});I.setPlaying(!g.isPaused()),I.setAudioVisible(!1),I.setMuted(p),b.addEventListener("loadedmetadata",()=>{it(!0),ve()});let M=null,V=null,B=null,$=!1,se=null,D=0;function pe(){if(M!==null)return;function f(){const _=g.getPlaybackFraction();I.setPosition(_),g.isPaused()?M=null:M=requestAnimationFrame(f)}M=requestAnimationFrame(f)}function be(){M!==null&&(cancelAnimationFrame(M),M=null)}function H(f){V=f,B===null&&(B=requestAnimationFrame(()=>{if(B=null,V===null)return;const _=V;V=null,g.seekToFraction(_),it(!0)}))}function Ue(){if(V===null)return;B!==null&&(cancelAnimationFrame(B),B=null);const f=V;V=null,g.seekToFraction(f),it(!0)}function Re(){se!==null&&(window.clearTimeout(se),se=null)}function et(){if(!(h!=null&&h.views))return[];const f=Ye(r,h);return Object.entries(h.views).filter(([_])=>_!==f).map(([,_])=>Oe(_)).filter(Boolean)}function Ke(){Re(),g.suspendPrewarming()}function xe(f=yl){Re(),!($||g.isPaused())&&(se=window.setTimeout(()=>{se=null,!($||g.isPaused())&&(g.resumePrewarming(),g.prewarmSources(et()))},Math.max(0,f)))}function Vt(){$=!0,D=0,Ke(),ve()}function tt(){$=!1,D=0,Ue(),y=g.getPlaybackFraction()*g.getDurationSeconds(),We(y),xe(),ve()}g.onPlayStateChange(f=>{I.setPlaying(!f),f?(be(),Ke()):(pe(),xe(0)),ve()}),g.onTimeUpdate(f=>{if(y=f*g.getDurationSeconds(),$){const _=performance.now();if(_-D<bl)return;D=_}We(y),it()});const Te=document.createElement("div");Te.className="overlay-layer",n.appendChild(Te);const ue=wo(Te,{onReplay:Gi,onParameters:()=>Dt("parameters"),onHome:vn,showHome:!t.lockedScaleId});g.onEnded(()=>{l=!0;const f=g.captureFrame();ue.update(r,_e(),g.getDurationSeconds(),c,f),ue.show(),ve()});const nt=no(Te,s,f=>{ds(f),Dt("parameters")}),A=xo(Te,{simClass:r,values:_e(),theme:o,advancedSettings:t,availableScales:ot,onValuesChange:qi,onThemeChange:bn,onRun:()=>{ae("Parameters submitted — starting run",{simClassId:r.id}),Xi().catch(f=>{Fe("Run failed to start",{simClassId:r.id,error:f instanceof Error?f.message:String(f)})})},onApplySettings:Wi,onClose:Yi,initialView:"parameters"}),W=$o(Te);I.setPosition(0),We(),ue.hide();const Q=new WeakMap,Y=f=>{const _=Q.get(f);_&&(clearTimeout(_),Q.delete(f)),f.classList.remove("side-collapsed")},Me=f=>{const _=Q.get(f);_&&clearTimeout(_),Q.set(f,setTimeout(()=>{f.classList.add("side-collapsed"),Q.delete(f)},2500))},gn=f=>{const _=Q.get(f);_&&(clearTimeout(_),Q.delete(f)),f.classList.add("side-collapsed")},yn=(f,_)=>{const C=_.isCollapsible??(()=>!0);f.addEventListener("mouseenter",()=>Y(f)),f.addEventListener("mouseleave",()=>{if(!C()){Y(f);return}Me(f)}),f.addEventListener("focusin",()=>Y(f)),f.addEventListener("focusout",O=>{if(!f.contains(O.relatedTarget)){if(!C()){Y(f);return}Me(f)}}),f.addEventListener("click",()=>{if(!C()){Y(f);return}if(f.classList.contains("side-collapsed")){Y(f),Me(f);return}_.toggleOnClick?gn(f):Me(f)}),C()?gn(f):Y(f)};yn(R,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),yn(G,{toggleOnClick:!0}),yn(z,{toggleOnClick:!1});let _t=0,st=null,Ut=0;const cs=()=>{st!==null&&(cancelAnimationFrame(st),st=null)},us=()=>{if(st!==null)return;Ut=g.getPlaybackFraction();const f=()=>{if(_t===0){cs();return}const C=12*(1/60)/Math.max(g.getDurationSeconds(),1);Ut=Math.max(0,Math.min(1,Ut+_t*C)),g.seekToFraction(Ut),st=requestAnimationFrame(f)};st=requestAnimationFrame(f)};document.addEventListener("keydown",f=>{if(n.dataset.mode==="display"&&!(f.target instanceof HTMLInputElement||f.target instanceof HTMLTextAreaElement))switch(f.key){case"Escape":f.preventDefault(),j.classList.contains("is-visible")?j.classList.remove("is-visible"):vn();break;case" ":f.preventDefault(),fs();break;case"ArrowLeft":f.preventDefault(),Y(z),Me(z),_t=-1,us();break;case"ArrowRight":f.preventDefault(),Y(z),Me(z),_t=1,us();break;case"ArrowUp":case"ArrowDown":{if(f.preventDefault(),Y(G),Me(G),!(h!=null&&h.views)||Object.keys(h.views).length<=1)break;const _=r.views.filter(de=>{var ge;return((ge=h==null?void 0:h.views)==null?void 0:ge[de.id])!==void 0});if(_.length<=1)break;const C=h.viewId??Ye(r,h),O=_.findIndex(de=>de.id===C),ie=f.key==="ArrowUp"?(O-1+_.length)%_.length:(O+1)%_.length;hs(_[ie].id);break}}}),document.addEventListener("keyup",f=>{(f.key==="ArrowLeft"||f.key==="ArrowRight")&&(_t=0,cs())}),g.hideMedia(),g.pause(),qe(t.lockedScaleId?"config":"entry");function ds(f){f.id===r.id&&w||(r=f,Sn(),bn(Bn[f.id]),A.setSimulation(r,_e()),I.setPosition(0),We(),_n(),wn())}function qi(f){L[r.id]={...f},ae("Parameter values updated",{simClassId:r.id,values:L[r.id]}),We()}function bn(f){o=f,Tn(f),A.setTheme(f)}function Dt(f){f==="parameters"&&A.setSimulation(r,_e()),A.setView(f),qe("config")}function Wi(f){if(ma(f),w){ue.hide(),qe("display");return}A.setSimulation(r,_e()),A.setView("parameters")}function Yi(){if(ue.hide(),!w&&t.lockedScaleId){A.setSimulation(r,_e()),A.setView("parameters");return}qe(w?"display":"entry")}function vn(){t.lockedScaleId||(ae("Returning to home screen",{simClassId:r.id}),Sn(),w=!1,g.hideMedia(),qe("entry"))}function Gi(){l=!1,ue.hide(),g.getPlaybackFraction()>=.999&&(g.resetPlayback(),it(!0)),$n(g),ve()}function zi(){l=!0,g.pause();const f=c?g.captureFrame():null;ue.update(r,_e(),g.getDurationSeconds(),c,f),ue.show(),ve()}function fs(){g.isPaused()?$n(g):g.pause()}function Ji(){p=!p,ve()}function Qi(f){g.setPlaybackRate(f),Uo(f),I.setSpeed(f)}async function Xi(){const f=_e(),_=a.start();ae("Run requested",{simClassId:r.id,values:f,manifestSource:i.getSource()});const C=await i.findNearestVideo(r.id,r.parameters,f);if(!a.isCurrent(_))return;Sn({preserveRunRequest:!0}),h=C;const O=Ye(r,C),ie=Ur(i.getSource());dl({simulationId:r.id,parameters:f,manifestSource:i.getSource(),matchedRunId:C.runId,assetHostMode:ie.mode,assetHostBase:ie.base});const de=la(C,O)??C.url,ge=Object.entries(C.views??{}).filter(([Le])=>Le!==O).map(([,Le])=>Le);aa(C.liveDataUrl,_),ra(C.summaryUrl,_),ua(C.summaryUrl,_),g.setMuted(!0),_n(O),kt(),qe("initializing");const Ht=Zi(de);g.resumePrewarming(),g.prewarmSources(ge);const Et=(async()=>{const Le=await Ht;a.isCurrent(_)&&(ae(`Prepared active video source: ${Le.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:de,waitsForBuffer:Le.shouldWaitForBuffer}),g.setSource(Le.src,{ownedObjectUrl:Le.ownedObjectUrl}),g.pause(),await g.waitForLoadedData(pl),a.isCurrent(_)&&Le.shouldWaitForBuffer&&await g.waitForBufferedAhead(hl,ml))})();await new Promise(Le=>{W.show(Wo(r),Le,Et,{minTerminalTimeMs:fa()})}),a.isCurrent(_)&&(w=!0,g.showMedia(),$n(g),qe("display"),ve())}async function Zi(f){const _=Oe(f),C=await ea(f);if(C!==null&&C>0&&C<=js){ae("Downloading active video behind loading overlay",{videoUrl:_,contentLength:C});try{const O=await He(f);if(!O.ok)throw new Error(`Failed to download active video: ${_}`);const ie=await O.blob();return ae(`Active video full fetch complete: ${ie.size} bytes`,{videoUrl:Oe(f),blobType:ie.type}),{src:URL.createObjectURL(ie),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(O){Fe(`Full-fetch FAILED; falling back to progressive: ${O instanceof Error?O.message:String(O)}`,{videoUrl:f})}}return C!==null?ae("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:f,contentLength:C,fullFetchMaxBytes:js}):ae("Could not determine active video size; using progressive load",{videoUrl:f}),ae("Using progressive active video load",{videoUrl:f}),{src:Oe(f),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ea(f){try{const _=await He(f,{headers:{Range:"bytes=0-0"}});ae("Probed active video size with range request",{videoUrl:f,ok:_.ok,status:_.status,contentLength:_.headers.get("Content-Length"),contentRange:_.headers.get("Content-Range")});const C=na(_.headers.get("Content-Length"));if(C!==null)return C;const O=ta(_.headers.get("Content-Range"));return O!==null?O:null}catch(_){return Fe("Could not probe active video size",{videoUrl:f,error:_ instanceof Error?_.message:String(_)}),null}}function ta(f){if(!f)return null;const _=f.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!_)return null;const C=Number(_[1]);return Number.isFinite(C)&&C>0?C:null}function na(f){if(!f)return null;const _=Number(f);return Number.isFinite(_)?_:null}function qe(f){if(n.dataset.mode=f,f==="entry"?document.documentElement.setAttribute("data-theme","glass"):f==="display"&&Tn(o),St(E,f==="display"||f==="config"),St(T,f==="display"||f==="entry"),St(R,!t.lockedScaleId&&(f==="entry"||f==="config"||f==="display")),f==="entry"?Y(R):gn(R),f==="entry"&&!t.lockedScaleId?nt.show():nt.hide(),f==="config"?(W.hide(),A.setSimulation(r,_e()),A.show()):A.hide(),f!=="display")ue.hide();else if(l){const C=g.captureFrame();ue.update(r,_e(),g.getDurationSeconds(),c,C),ue.show()}!w||f==="initializing"?(g.hideMedia(),f==="initializing"&&g.pause()):g.showMedia(),f!=="initializing"&&W.hide(),wn(),ve()}function wn(){if(n.dataset.mode==="entry"){St(x,!0);return}const f=n.dataset.mode==="display",_=r.id==="galaxy",O=Ye(r,h)==="hst";St(x,f&&_&&O)}function We(f=0){const _=al(S,f,g.getDurationSeconds()),C=oa(r,c,f,g.getDurationSeconds());we.update(r,_e(),{..._,...C})}function _n(f){const _=r.views.filter(ie=>{var de;return((de=h==null?void 0:h.views)==null?void 0:de[ie.id])!==void 0});if(_.length<=1){J.hide(),ne.classList.add("is-hidden");return}const C=f??Ye(r,h),O=_.find(ie=>ie.id===C);J.update(_,C),O?(ne.classList.remove("is-hidden"),ne.innerHTML=`<span class="viewport-title">${O.label??O.id}</span>`):ne.classList.add("is-hidden")}function Sn(f={}){f.preserveRunRequest||a.invalidate(),S=Zt,l=!1,c=null,h=null,y=0,$=!1,V=null,Re(),B!==null&&(cancelAnimationFrame(B),B=null),ue.hide(),J.hide(),g.pause(),b.pause(),g.clearPrewarmedSources(),g.resetPlayback(),I.setPosition(0),ps(),gs()}function hs(f){if(!(h!=null&&h.views)||f===Ye(r,h))return;const _=Oe(h.views[f]);if(!_)return;h.viewId=f;const C=!g.isPaused()&&!l,O=l?0:g.getPlaybackFraction();l=!1,ue.hide(),g.setSource(_,{seekFraction:O,autoplay:C}),g.prewarmSources(et()),C&&!$?xe():Ke(),_n(f),kt(),ve(),j.classList.remove("is-visible"),wn()}function _e(){return{...L[r.id]}}function sa(f){return Object.fromEntries(f.parameters.map(_=>[_.id,ia(_)]))}function ia(f){if(f.logScale){const de=Math.log10(f.min),ge=Math.log10(f.max);return 10**(de+Math.random()*(ge-de))}const _=Math.max(0,Math.round((f.max-f.min)/f.step)),C=Math.floor(Math.random()*(_+1)),O=f.min+C*f.step,ie=Ti(f.step);return Number(O.toFixed(ie))}async function aa(f,_){let C=Zt;try{C=await il(f)}catch(O){Fe("Failed to load live stats",{url:f,error:O instanceof Error?O.message:String(O)})}a.isCurrent(_)&&(S=C,We())}async function ra(f,_){const C=await Go(f);a.isCurrent(_)&&(c=C,We(y))}function oa(f,_,C,O){if(!_||!Number.isFinite(O)||O<=0)return{};const ie=Math.max(0,Math.min(1,C/O)),de={};for(const ge of f.metadata.liveStats){if(!ge.live||!ge.fromVideo||!ge.scaleWithTime)continue;const Ht=ge.videoKey??ge.id,Et=_[Ht];if(typeof Et!="number"||!Number.isFinite(Et))continue;const kn=Et*ie;de[ge.id]=ge.integer?String(Math.floor(kn)):String(kn)}return de}function St(f,_){f.hidden=!_,f.classList.toggle("is-hidden",!_)}function Ye(f,_){return _!=null&&_.views?_.viewId??Object.keys(_.views)[0]:_==null?void 0:_.viewId}function la(f,_){return!_||!f.views?null:f.views[_]??null}function ms(){const f=Ye(r,h);return f?r.views.some(_=>_.id===f&&_.audio):!1}function ca(f){return f.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function ua(f,_){const C=ca(f),O=++v,ie=await da(C);if(!(!a.isCurrent(_)||O!==v)){if(!ie){ps();return}u=Oe(C),d=!0,b.src!==u&&(b.pause(),b.src=u,b.load()),kt(),ve()}}async function da(f){try{if((await He(f,{method:"HEAD"})).ok)return!0}catch{}try{return(await He(f,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function ps(){v+=1,u=null,d=!1,b.pause(),b.removeAttribute("src"),b.load(),kt()}function gs(){p=t.audioMutedByDefault,m=t.defaultAudioVolume,b.muted=p,b.volume=m,I.setMuted(p)}function kt(){I.setAudioVisible(ms()&&d&&!!u),I.setMuted(p)}function it(f=!1){if(!d||!Number.isFinite(b.duration)||b.duration<=0)return;const _=Math.max(0,Math.min(b.duration,g.getPlaybackFraction()*b.duration));(f||Math.abs(b.currentTime-_)>.35)&&(b.currentTime=_)}function ve(){const f=ms()&&d&&!!u;if(kt(),b.muted=p,b.volume=m,!f){b.pause();return}if(it(),n.dataset.mode!=="display"||g.isPaused()||l||$){b.pause();return}b.play().catch(()=>{p=!0,b.muted=!0,I.setMuted(!0)})}function ys(f){const _=new Set(Ro(f,e));return ot.filter(C=>_.has(C.id))}function bs(f){return f?ot.find(_=>_.id===f)??null:null}function fa(){return i.getSource()!=="local"?Wn.MIN_TERMINAL_TIME_MS:ha(Wn.MIN_TERMINAL_TIME_MS,gl)}function ha(f,_){const C=Math.ceil(Math.min(f,_)),O=Math.floor(Math.max(f,_));return Math.floor(Math.random()*(O-C+1))+C}function ma(f){const _=r.id,C=t.manifestSource;t=Oo(f,e),Us(t.verboseLogging),s=ys(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),F.setHomeVisible(!t.lockedScaleId),ue.setHomeVisible(!t.lockedScaleId),nt.setSimulationClasses(s),A.setAdvancedSettings(t),ae("Advanced settings updated",t),gs(),ve(),C!==t.manifestSource&&(h=null);const O=bs(t.lockedScaleId);O&&(ds(O),O.id!==_&&(w=!1,g.hideMedia(),A.setView("parameters")),w||(bn(Bn[O.id]),A.setSimulation(r,_e())))}}function wl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");vl(n)}wl();
//# sourceMappingURL=main-CeHBHQhn.js.map
