(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Xn=Symbol.for("yaml.alias"),jn=Symbol.for("yaml.document"),Ge=Symbol.for("yaml.map"),Ws=Symbol.for("yaml.pair"),De=Symbol.for("yaml.scalar"),wt=Symbol.for("yaml.seq"),Me=Symbol.for("yaml.node.type"),st=n=>!!n&&typeof n=="object"&&n[Me]===Xn,ln=n=>!!n&&typeof n=="object"&&n[Me]===jn,Bt=n=>!!n&&typeof n=="object"&&n[Me]===Ge,ee=n=>!!n&&typeof n=="object"&&n[Me]===Ws,G=n=>!!n&&typeof n=="object"&&n[Me]===De,Vt=n=>!!n&&typeof n=="object"&&n[Me]===wt;function X(n){if(n&&typeof n=="object")switch(n[Me]){case Ge:case wt:return!0}return!1}function Z(n){if(n&&typeof n=="object")switch(n[Me]){case Xn:case Ge:case De:case wt:return!0}return!1}const Ys=n=>(G(n)||X(n))&&!!n.anchor,Ze=Symbol("break visit"),wa=Symbol("skip children"),Ot=Symbol("remove node");function vt(n,e){const t=va(e);ln(n)?dt(null,n.contents,t,Object.freeze([n]))===Ot&&(n.contents=null):dt(null,n,t,Object.freeze([]))}vt.BREAK=Ze;vt.SKIP=wa;vt.REMOVE=Ot;function dt(n,e,t,s){const i=_a(n,e,t,s);if(Z(i)||ee(i))return Sa(n,s,i),dt(n,i,t,s);if(typeof i!="symbol"){if(X(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=dt(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Ze)return Ze;r===Ot&&(e.items.splice(a,1),a-=1)}}}else if(ee(e)){s=Object.freeze(s.concat(e));const a=dt("key",e.key,t,s);if(a===Ze)return Ze;a===Ot&&(e.key=null);const r=dt("value",e.value,t,s);if(r===Ze)return Ze;r===Ot&&(e.value=null)}}return i}function va(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function _a(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(Bt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(Vt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ee(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(G(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(st(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function Sa(n,e,t){const s=e[e.length-1];if(X(s))s.items[n]=t;else if(ee(s))n==="key"?s.key=t:s.value=t;else if(ln(s))s.contents=t;else{const i=st(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const ka={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ea=n=>n.replace(/[!,[\]{}]/g,e=>ka[e]);class pe{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},pe.defaultYaml,e),this.tags=Object.assign({},pe.defaultTags,t)}clone(){const e=new pe(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new pe(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:pe.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},pe.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:pe.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},pe.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ea(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&Z(e.contents)){const a={};vt(e.contents,(r,o)=>{Z(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}pe.defaultYaml={explicit:!1,version:"1.2"};pe.defaultTags={"!!":"tag:yaml.org,2002:"};function Gs(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function zs(n){const e=new Set;return vt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Js(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function La(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=zs(n));const r=Js(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(G(r.node)||X(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function ft(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=ft(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=ft(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=ft(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=ft(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Te(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Te(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Ys(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class Zn{constructor(e){Object.defineProperty(this,Me,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!ln(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Te(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?ft(a,{"":o},"",o):o}}class es extends Zn{constructor(e){super(Xn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],vt(e,{Node:(a,r)=>{(st(r)||Ys(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Te(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Xt(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Gs(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Xt(n,e,t){if(st(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(X(e)){let s=0;for(const i of e.items){const a=Xt(n,i,t);a>s&&(s=a)}return s}else if(ee(e)){const s=Xt(n,e.key,t),i=Xt(n,e.value,t);return Math.max(s,i)}return 1}const Qs=n=>!n||typeof n!="function"&&typeof n!="object";class P extends Zn{constructor(e){super(De),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Te(this.value,e,t)}toString(){return String(this.value)}}P.BLOCK_FOLDED="BLOCK_FOLDED";P.BLOCK_LITERAL="BLOCK_LITERAL";P.PLAIN="PLAIN";P.QUOTE_DOUBLE="QUOTE_DOUBLE";P.QUOTE_SINGLE="QUOTE_SINGLE";const Na="tag:yaml.org,2002:";function Ia(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function xt(n,e,t){var d,m,h;if(ln(n)&&(n=n.contents),Z(n))return n;if(ee(n)){const b=(m=(d=t.schema[Ge]).createNode)==null?void 0:m.call(d,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new es(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Na+e.slice(2));let c=Ia(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new P(n);return l&&(l.node=b),b}c=n instanceof Map?r[Ge]:Symbol.iterator in Object(n)?r[wt]:r[Ge]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((h=c==null?void 0:c.nodeClass)==null?void 0:h.from)=="function"?c.nodeClass.from(t.schema,n,t):new P(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function nn(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return xt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Tt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Xs extends Zn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>Z(s)||ee(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Tt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(X(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,nn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(X(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&G(a)?a.value:a:X(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ee(t))return!1;const s=t.value;return s==null||e&&G(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return X(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(X(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,nn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Ca=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function He(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const et=(n,e,t)=>n.endsWith(`
`)?He(t,e):t.includes(`
`)?`
`+He(t,e):(n.endsWith(" ")?"":" ")+t,Zs="flow",qn="block",Zt="quoted";function cn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):d=i-s);let m,h,b=!1,p=-1,g=-1,_=-1;t===qn&&(p=ks(n,p,e.length),p!==-1&&(d=p+l));for(let N;N=n[p+=1];){if(t===Zt&&N==="\\"){switch(g=p,n[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}_=p}if(N===`
`)t===qn&&(p=ks(n,p,e.length)),d=p+e.length+l,m=void 0;else{if(N===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){const E=n[p+1];E&&E!==" "&&E!==`
`&&E!=="	"&&(m=p)}if(p>=d)if(m)c.push(m),d=m+l,m=void 0;else if(t===Zt){for(;h===" "||h==="	";)h=N,N=n[p+=1],b=!0;const E=p>_+1?p-2:g-1;if(u[E])return n;c.push(E),u[E]=!0,d=E+l,m=void 0}else b=!0}h=N}if(b&&o&&o(),c.length===0)return n;r&&r();let v=n.slice(0,c[0]);for(let N=0;N<c.length;++N){const E=c[N],L=c[N+1]||n.length;E===0?v=`
${e}${n.slice(0,L)}`:(t===Zt&&u[E]&&(v+=`${n[E]}\\`),v+=`
${e}${n.slice(E+1,L)}`)}return v}function ks(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const un=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),dn=n=>/^(%|---|\.\.\.)/m.test(n);function Aa(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Pt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(dn(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:cn(r,a,Zt,un(e,!1))}function Kn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Pt(n,e);const t=e.indent||(dn(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:cn(s,t,Zs,un(e,!1))}function ht(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Pt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Kn:a&&!i?s=Pt:s=t?Kn:Pt}return s(n,e)}let Wn;try{Wn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Wn=/\n+(?!\n|$)/g}function en({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return ht(t,s);const c=s.indent||(s.forceBlockIndent||dn(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===P.BLOCK_FOLDED?!1:e===P.BLOCK_LITERAL?!0:!Aa(t,l,c.length);if(!t)return u?`|
`:`>
`;let d,m;for(m=t.length;m>0;--m){const L=t[m-1];if(L!==`
`&&L!=="	"&&L!==" ")break}let h=t.substring(m);const b=h.indexOf(`
`);b===-1?d="-":t===h||b!==h.length-1?(d="+",a&&a()):d="",h&&(t=t.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(Wn,`$&${c}`));let p=!1,g,_=-1;for(g=0;g<t.length;++g){const L=t[g];if(L===" ")p=!0;else if(L===`
`)_=g;else break}let v=t.substring(0,_<g?_+1:g);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${c}`));let E=(p?c?"2":"1":"")+d;if(n&&(E+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const L=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let y=!1;const k=un(s,!0);r!=="folded"&&e!==P.BLOCK_FOLDED&&(k.onOverflow=()=>{y=!0});const S=cn(`${v}${L}${h}`,c,qn,k);if(!y)return`>${E}
${c}${S}`}return t=t.replace(/\n+/g,`$&${c}`),`|${E}
${c}${v}${t}${h}`}function Ta(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return ht(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?ht(a,e):en(n,e,t,s);if(!o&&!u&&i!==P.PLAIN&&a.includes(`
`))return en(n,e,t,s);if(dn(a)){if(l==="")return e.forceBlockIndent=!0,en(n,e,t,s);if(o&&l===c)return ht(a,e)}const d=a.replace(/\n+/g,`$&
${l}`);if(r){const m=p=>{var g;return p.default&&p.tag!=="tag:yaml.org,2002:str"&&((g=p.test)==null?void 0:g.test(d))},{compat:h,tags:b}=e.doc.schema;if(b.some(m)||h!=null&&h.some(m))return ht(a,e)}return o?d:cn(d,l,Zs,un(e,!1))}function ts(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==P.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=P.QUOTE_DOUBLE);const l=u=>{switch(u){case P.BLOCK_FOLDED:case P.BLOCK_LITERAL:return i||a?ht(r.value,e):en(r,e,t,s);case P.QUOTE_DOUBLE:return Pt(r.value,e);case P.QUOTE_SINGLE:return Kn(r.value,e);case P.PLAIN:return Ta(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:d}=e.options,m=i&&u||d;if(c=l(m),c===null)throw new Error(`Unsupported default string type ${m}`)}return c}function ei(n,e){const t=Object.assign({blockQuote:!0,commentString:Ca,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Ma(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(G(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Oa(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(G(n)||X(n))&&n.anchor;a&&Gs(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function yt(n,e,t,s){var l;if(ee(n))return n.toString(e,t,s);if(st(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=Z(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Ma(e.doc.schema.tags,a));const r=Oa(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):G(a)?ts(a,e,t,s):a.toString(e,t,s);return r?G(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Pa({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:d}}=t;let m=Z(n)&&n.comment||null;if(d){if(m)throw new Error("With simple keys, key nodes cannot have comments");if(X(n)||!Z(n)&&typeof n=="object"){const k="With simple keys, collection cannot be used as a key value";throw new Error(k)}}let h=!d&&(!n||m&&e==null&&!t.inFlow||X(n)||(G(n)?n.type===P.BLOCK_FOLDED||n.type===P.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!h&&(d||!a),indent:o+l});let b=!1,p=!1,g=yt(n,t,()=>b=!0,()=>p=!0);if(!h&&!t.inFlow&&g.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":h?`? ${g}`:g}else if(a&&!d||e==null&&h)return g=`? ${g}`,m&&!b?g+=et(g,t.indent,c(m)):p&&i&&i(),g;b&&(m=null),h?(m&&(g+=et(g,t.indent,c(m))),g=`? ${g}
${o}:`):(g=`${g}:`,m&&(g+=et(g,t.indent,c(m))));let _,v,N;Z(e)?(_=!!e.spaceBefore,v=e.commentBefore,N=e.comment):(_=!1,v=null,N=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!h&&!m&&G(e)&&(t.indentAtStart=g.length+1),p=!1,!u&&l.length>=2&&!t.inFlow&&!h&&Vt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let E=!1;const L=yt(e,t,()=>E=!0,()=>p=!0);let y=" ";if(m||_||v){if(y=_?`
`:"",v){const k=c(v);y+=`
${He(k,t.indent)}`}L===""&&!t.inFlow?y===`
`&&N&&(y=`

`):y+=`
${t.indent}`}else if(!h&&X(e)){const k=L[0],S=L.indexOf(`
`),M=S!==-1,R=t.inFlow??e.flow??e.items.length===0;if(M||!R){let x=!1;if(M&&(k==="&"||k==="!")){let F=L.indexOf(" ");k==="&"&&F!==-1&&F<S&&L[F+1]==="!"&&(F=L.indexOf(" ",F+1)),(F===-1||S<F)&&(x=!0)}x||(y=`
${t.indent}`)}}else(L===""||L[0]===`
`)&&(y="");return g+=y+L,t.inFlow?E&&s&&s():N&&!E?g+=et(g,t.indent,c(N)):p&&i&&i(),g}function ti(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Kt="<<",qe={identify:n=>n===Kt||typeof n=="symbol"&&n.description===Kt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new P(Symbol(Kt)),{addToJSMap:ni}),stringify:()=>Kt},xa=(n,e)=>(qe.identify(e)||G(e)&&(!e.type||e.type===P.PLAIN)&&qe.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===qe.tag&&t.default));function ni(n,e,t){if(t=n&&st(t)?t.resolve(n.doc):t,Vt(t))for(const s of t.items)Nn(n,e,s);else if(Array.isArray(t))for(const s of t)Nn(n,e,s);else Nn(n,e,t)}function Nn(n,e,t){const s=n&&st(t)?t.resolve(n.doc):t;if(!Bt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function si(n,e,{key:t,value:s}){if(Z(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(xa(n,t))ni(n,e,s);else{const i=Te(t,"",n);if(e instanceof Map)e.set(i,Te(s,i,n));else if(e instanceof Set)e.add(i);else{const a=$a(t,i,n),r=Te(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function $a(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Z(n)&&(t!=null&&t.doc)){const s=ei(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),ti(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function ns(n,e,t){const s=xt(n,void 0,t),i=xt(e,void 0,t);return new ge(s,i)}class ge{constructor(e,t=null){Object.defineProperty(this,Me,{value:Ws}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return Z(t)&&(t=t.clone(e)),Z(s)&&(s=s.clone(e)),new ge(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return si(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Pa(this,e,t,s):JSON.stringify(this)}}function ii(n,e,t){return(e.inFlow??n.flow?Fa:Ra)(n,e,t)}function Ra({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const m=[];for(let b=0;b<e.length;++b){const p=e[b];let g=null;if(Z(p))!d&&p.spaceBefore&&m.push(""),sn(t,m,p.commentBefore,d),p.comment&&(g=p.comment);else if(ee(p)){const v=Z(p.key)?p.key:null;v&&(!d&&v.spaceBefore&&m.push(""),sn(t,m,v.commentBefore,d))}d=!1;let _=yt(p,u,()=>g=null,()=>d=!0);g&&(_+=et(_,a,c(g))),d&&g&&(d=!1),m.push(s+_)}let h;if(m.length===0)h=i.start+i.end;else{h=m[0];for(let b=1;b<m.length;++b){const p=m[b];h+=p?`
${l}${p}`:`
`}}return n?(h+=`
`+He(c(n),l),o&&o()):d&&r&&r(),h}function Fa({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const d=[];for(let b=0;b<n.length;++b){const p=n[b];let g=null;if(Z(p))p.spaceBefore&&d.push(""),sn(e,d,p.commentBefore,!1),p.comment&&(g=p.comment);else if(ee(p)){const v=Z(p.key)?p.key:null;v&&(v.spaceBefore&&d.push(""),sn(e,d,v.commentBefore,!1),v.comment&&(c=!0));const N=Z(p.value)?p.value:null;N?(N.comment&&(g=N.comment),N.commentBefore&&(c=!0)):p.value==null&&(v!=null&&v.comment)&&(g=v.comment)}g&&(c=!0);let _=yt(p,l,()=>g=null);c||(c=d.length>u||_.includes(`
`)),b<n.length-1?_+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=d.reduce((v,N)=>v+N.length+2,2)+(_.length+2)>e.options.lineWidth)),c&&(_+=",")),g&&(_+=et(_,s,o(g))),d.push(_),u=d.length}const{start:m,end:h}=t;if(d.length===0)return m+h;if(!c){const b=d.reduce((p,g)=>p+g.length+2,2);c=e.options.lineWidth>0&&b>e.options.lineWidth}if(c){let b=m;for(const p of d)b+=p?`
${a}${i}${p}`:`
`;return`${b}
${i}${h}`}else return`${m}${r}${d.join(" ")}${r}${h}`}function sn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=He(e(s),n);t.push(a.trimStart())}}function tt(n,e){const t=G(e)?e.value:e;for(const s of n)if(ee(s)&&(s.key===e||s.key===t||G(s.key)&&s.key.value===t))return s}class Ae extends Xs{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Ge,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(ns(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ee(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ge(e,e==null?void 0:e.value):s=new ge(e.key,e.value);const i=tt(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);G(i.value)&&Qs(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=tt(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=tt(this.items,e),i=s==null?void 0:s.value;return(!t&&G(i)?i.value:i)??void 0}has(e){return!!tt(this.items,e)}set(e,t){this.add(new ge(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)si(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ee(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ii(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const _t={collection:"map",default:!0,nodeClass:Ae,tag:"tag:yaml.org,2002:map",resolve(n,e){return Bt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Ae.from(n,e,t)};class nt extends Xs{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(wt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Wt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Wt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&G(i)?i.value:i}has(e){const t=Wt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Wt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];G(i)&&Qs(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Te(a,String(i++),t));return s}toString(e,t,s){return e?ii(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(xt(o,void 0,s))}}return a}}function Wt(n){let e=G(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const St={collection:"seq",default:!0,nodeClass:nt,tag:"tag:yaml.org,2002:seq",resolve(n,e){return Vt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>nt.from(n,e,t)},fn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),ts(n,e,t,s)}},hn={identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new P(null),stringify:({source:n},e)=>typeof n=="string"&&hn.test.test(n)?n:e.options.nullStr},ss={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new P(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ss.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Be({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const ai={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Be},ri={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Be(n)}},oi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new P(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Be},mn=n=>typeof n=="bigint"||Number.isInteger(n),is=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function li(n,e,t){const{value:s}=n;return mn(s)&&s>=0?t+s.toString(e):Be(n)}const ci={identify:n=>mn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>is(n,2,8,t),stringify:n=>li(n,8,"0o")},ui={identify:mn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>is(n,0,10,t),stringify:Be},di={identify:n=>mn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>is(n,2,16,t),stringify:n=>li(n,16,"0x")},Ba=[_t,St,fn,hn,ss,ci,ui,di,ai,ri,oi];function Es(n){return typeof n=="bigint"||Number.isInteger(n)}const Yt=({value:n})=>JSON.stringify(n),Va=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Yt},{identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Yt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Yt},{identify:Es,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Es(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Yt}],Ua={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Da=[_t,St].concat(Va,Ua),as={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=P.BLOCK_LITERAL),e!==P.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let d=0,m=0;d<c;++d,m+=l)u[d]=o.substr(m,l);o=u.join(e===P.BLOCK_LITERAL?`
`:" ")}return ts({comment:n,type:e,value:o},s,i,a)}};function fi(n,e){if(Vt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ee(s)){if(Bt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ge(new P(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ee(s)?s:new ge(s)}}else e("Expected a sequence for this tag");return n}function hi(n,e,t){const{replacer:s}=t,i=new nt(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(ns(o,l,t))}return i}const rs={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:fi,createNode:hi};class pt extends nt{constructor(){super(),this.add=Ae.prototype.add.bind(this),this.delete=Ae.prototype.delete.bind(this),this.get=Ae.prototype.get.bind(this),this.has=Ae.prototype.has.bind(this),this.set=Ae.prototype.set.bind(this),this.tag=pt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ee(i)?(a=Te(i.key,"",t),r=Te(i.value,a,t)):a=Te(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=hi(e,t,s),a=new this;return a.items=i.items,a}}pt.tag="tag:yaml.org,2002:omap";const os={collection:"seq",identify:n=>n instanceof Map,nodeClass:pt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=fi(n,e),s=[];for(const{key:i}of t.items)G(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new pt,t)},createNode:(n,e,t)=>pt.from(n,e,t)};function mi({value:n,source:e},t){return e&&(n?pi:gi).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const pi={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new P(!0),stringify:mi},gi={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new P(!1),stringify:mi},Ha={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Be},ja={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Be(n)}},qa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new P(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Be},Ut=n=>typeof n=="bigint"||Number.isInteger(n);function pn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function ls(n,e,t){const{value:s}=n;if(Ut(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Be(n)}const Ka={identify:Ut,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>pn(n,2,2,t),stringify:n=>ls(n,2,"0b")},Wa={identify:Ut,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>pn(n,1,8,t),stringify:n=>ls(n,8,"0")},Ya={identify:Ut,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>pn(n,0,10,t),stringify:Be},Ga={identify:Ut,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>pn(n,2,16,t),stringify:n=>ls(n,16,"0x")};class gt extends Ae{constructor(e){super(e),this.tag=gt.tag}add(e){let t;ee(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ge(e.key,null):t=new ge(e,null),tt(this.items,t.key)||this.items.push(t)}get(e,t){const s=tt(this.items,e);return!t&&ee(s)?G(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=tt(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ge(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(ns(r,null,s));return a}}gt.tag="tag:yaml.org,2002:set";const cs={collection:"map",identify:n=>n instanceof Set,nodeClass:gt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>gt.from(n,e,t),resolve(n,e){if(Bt(n)){if(n.hasAllNullValues(!0))return Object.assign(new gt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function us(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function yi(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Be(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const bi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>us(n,t),stringify:yi},wi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>us(n,!1),stringify:yi},gn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(gn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let d=us(u,!1);Math.abs(d)<30&&(d*=60),c-=6e4*d}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Ls=[_t,St,fn,hn,pi,gi,Ka,Wa,Ya,Ga,Ha,ja,qa,as,qe,os,rs,cs,bi,wi,gn],Ns=new Map([["core",Ba],["failsafe",[_t,St,fn]],["json",Da],["yaml11",Ls],["yaml-1.1",Ls]]),Is={binary:as,bool:ss,float:oi,floatExp:ri,floatNaN:ai,floatTime:wi,int:ui,intHex:di,intOct:ci,intTime:bi,map:_t,merge:qe,null:hn,omap:os,pairs:rs,seq:St,set:cs,timestamp:gn},za={"tag:yaml.org,2002:binary":as,"tag:yaml.org,2002:merge":qe,"tag:yaml.org,2002:omap":os,"tag:yaml.org,2002:pairs":rs,"tag:yaml.org,2002:set":cs,"tag:yaml.org,2002:timestamp":gn};function In(n,e,t){const s=Ns.get(e);if(s&&!n)return t&&!s.includes(qe)?s.concat(qe):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Ns.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(qe)),i.reduce((a,r)=>{const o=typeof r=="string"?Is[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(Is).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const Ja=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class ds{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?In(e,"compat"):e?In(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?za:{},this.tags=In(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,Ge,{value:_t}),Object.defineProperty(this,De,{value:fn}),Object.defineProperty(this,wt,{value:St}),this.sortMapEntries=typeof r=="function"?r:r===!0?Ja:null}clone(){const e=Object.create(ds.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Qa(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=ei(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(He(c,""))}let r=!1,o=null;if(n.contents){if(Z(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(He(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=yt(n.contents,i,()=>o=null,c);o&&(u+=et(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(yt(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(He(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(He(a(c),"")))}return t.join(`
`)+`
`}class yn{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Me,{value:jn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new pe({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(yn.prototype,{[Me]:{value:jn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=Z(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){ot(this.contents)&&this.contents.add(e)}addIn(e,t){ot(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=zs(this);e.anchor=!t||s.has(t)?Js(t||"a",s):t}return new es(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=v=>typeof v=="number"||v instanceof String||v instanceof Number,_=t.filter(g).map(String);_.length>0&&(t=t.concat(_)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:d,setAnchors:m,sourceObjects:h}=La(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:d,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:h},p=xt(e,u,b);return o&&X(p)&&(p.flow=!0),m(),p}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ge(i,a)}delete(e){return ot(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Tt(e)?this.contents==null?!1:(this.contents=null,!0):ot(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return X(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Tt(e)?!t&&G(this.contents)?this.contents.value:this.contents:X(this.contents)?this.contents.getIn(e,t):void 0}has(e){return X(this.contents)?this.contents.has(e):!1}hasIn(e){return Tt(e)?this.contents!==void 0:X(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=nn(this.schema,[e],t):ot(this.contents)&&this.contents.set(e,t)}setIn(e,t){Tt(e)?this.contents=t:this.contents==null?this.contents=nn(this.schema,Array.from(e),t):ot(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new pe({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new pe({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new ds(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Te(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?ft(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Qa(this,e)}}function ot(n){if(X(n))return!0;throw new Error("Expected a YAML collection as document contents")}class vi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Mt extends vi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Xa extends vi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Cs=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function bt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,d="",m="",h=!1,b=!1,p=null,g=null,_=null,v=null,N=null,E=null,L=null;for(const S of n)switch(b&&(S.type!=="space"&&S.type!=="newline"&&S.type!=="comma"&&a(S.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),p&&(c&&S.type!=="comment"&&S.type!=="newline"&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),p=null),S.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&S.source.includes("	")&&(p=S),u=!0;break;case"comment":{u||a(S,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const M=S.source.substring(1)||" ";d?d+=m+M:d=M,m="",c=!1;break}case"newline":c?d?d+=S.source:(!E||t!=="seq-item-ind")&&(l=!0):m+=S.source,c=!0,h=!0,(g||_)&&(v=S),u=!0;break;case"anchor":g&&a(S,"MULTIPLE_ANCHORS","A node can have at most one anchor"),S.source.endsWith(":")&&a(S.offset+S.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=S,L??(L=S.offset),c=!1,u=!1,b=!0;break;case"tag":{_&&a(S,"MULTIPLE_TAGS","A node can have at most one tag"),_=S,L??(L=S.offset),c=!1,u=!1,b=!0;break}case t:(g||_)&&a(S,"BAD_PROP_ORDER",`Anchors and tags must be after the ${S.source} indicator`),E&&a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.source} in ${e??"collection"}`),E=S,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){N&&a(S,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),N=S,c=!1,u=!1;break}default:a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.type} token`),c=!1,u=!1}const y=n[n.length-1],k=y?y.offset+y.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),p&&(c&&p.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:N,found:E,spaceBefore:l,comment:d,hasNewline:h,anchor:g,tag:_,newlineAfterProp:v,end:k,start:L??k}}function $t(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if($t(e.key)||$t(e.value))return!0}return!1;default:return!0}}function Yn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&$t(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function _i(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||G(a)&&G(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const As="All mapping items must start at the same column";function Za({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Ae,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const d of s.items){const{start:m,key:h,sep:b,value:p}=d,g=bt(m,{indicator:"explicit-key-ind",next:h??(b==null?void 0:b[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),_=!g.found;if(_){if(h&&(h.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in h&&h.indent!==s.indent&&i(l,"BAD_INDENT",As)),!g.anchor&&!g.tag&&!b){c=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||$t(h))&&i(h??m[m.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",As);t.atKey=!0;const v=g.end,N=h?n(t,h,g,i):e(t,v,m,null,g,i);t.schema.compat&&Yn(s.indent,h,i),t.atKey=!1,_i(t,o.items,N)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const E=bt(b??[],{indicator:"map-value-ind",next:p,offset:N.range[2],onError:i,parentIndent:s.indent,startOnNewline:!h||h.type==="block-scalar"});if(l=E.end,E.found){_&&((p==null?void 0:p.type)==="block-map"&&!E.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<E.found.offset-1024&&i(N.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const L=p?n(t,p,E,i):e(t,l,b,null,E,i);t.schema.compat&&Yn(s.indent,p,i),l=L.range[2];const y=new ge(N,L);t.options.keepSourceTokens&&(y.srcToken=d),o.items.push(y)}else{_&&i(N.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),E.comment&&(N.comment?N.comment+=`
`+E.comment:N.comment=E.comment);const L=new ge(N);t.options.keepSourceTokens&&(L.srcToken=d),o.items.push(L)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function er({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??nt,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:d}of s.items){const m=bt(u,{indicator:"seq-item-ind",next:d,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!m.found)if(m.anchor||m.tag||d)(d==null?void 0:d.type)==="block-seq"?i(m.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=m.end,m.comment&&(o.comment=m.comment);continue}const h=d?n(t,d,m,i):e(t,m.end,u,null,m,i);t.schema.compat&&Yn(s.indent,d,i),l=h.range[2],o.items.push(h)}return o.range=[s.offset,l,c??l],o}function Dt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Cn="Block collections are not allowed within flow collections",An=n=>n&&(n.type==="block-map"||n.type==="block-seq");function tr({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?Ae:nt),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let _=0;_<s.items.length;++_){const v=s.items[_],{start:N,key:E,sep:L,value:y}=v,k=bt(N,{flow:o,indicator:"explicit-key-ind",next:E??(L==null?void 0:L[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!k.found){if(!k.anchor&&!k.tag&&!L&&!y){_===0&&k.comma?i(k.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):_<s.items.length-1&&i(k.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),k.comment&&(c.comment?c.comment+=`
`+k.comment:c.comment=k.comment),d=k.end;continue}!r&&t.options.strict&&$t(E)&&i(E,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(_===0)k.comma&&i(k.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(k.comma||i(k.start,"MISSING_CHAR",`Missing , between ${o} items`),k.comment){let S="";e:for(const M of N)switch(M.type){case"comma":case"space":break;case"comment":S=M.source.substring(1);break e;default:break e}if(S){let M=c.items[c.items.length-1];ee(M)&&(M=M.value??M.key),M.comment?M.comment+=`
`+S:M.comment=S,k.comment=k.comment.substring(S.length+1)}}if(!r&&!L&&!k.found){const S=y?n(t,y,k,i):e(t,k.end,L,null,k,i);c.items.push(S),d=S.range[2],An(y)&&i(S.range,"BLOCK_IN_FLOW",Cn)}else{t.atKey=!0;const S=k.end,M=E?n(t,E,k,i):e(t,S,N,null,k,i);An(E)&&i(M.range,"BLOCK_IN_FLOW",Cn),t.atKey=!1;const R=bt(L??[],{flow:o,indicator:"map-value-ind",next:y,offset:M.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(R.found){if(!r&&!k.found&&t.options.strict){if(L)for(const U of L){if(U===R.found)break;if(U.type==="newline"){i(U,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}k.start<R.found.offset-1024&&i(R.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else y&&("source"in y&&((g=y.source)==null?void 0:g[0])===":"?i(y,"MISSING_CHAR",`Missing space after : in ${o}`):i(R.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const x=y?n(t,y,R,i):R.found?e(t,R.end,L,null,R,i):null;x?An(y)&&i(x.range,"BLOCK_IN_FLOW",Cn):R.comment&&(M.comment?M.comment+=`
`+R.comment:M.comment=R.comment);const F=new ge(M,x);if(t.options.keepSourceTokens&&(F.srcToken=v),r){const U=c;_i(t,U.items,M)&&i(S,"DUPLICATE_KEY","Map keys must be unique"),U.items.push(F)}else{const U=new Ae(t.schema);U.flow=!0,U.items.push(F);const te=(x??M).range;U.range=[M.range[0],te[1],te[2]],c.items.push(U)}d=x?x.range[2]:R.end}}const m=r?"}":"]",[h,...b]=s.end;let p=d;if((h==null?void 0:h.source)===m)p=h.offset+h.source.length;else{const _=o[0].toUpperCase()+o.substring(1),v=u?`${_} must end with a ${m}`:`${_} in block collection must be sufficiently indented and end with a ${m}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",v),h&&h.source.length!==1&&b.unshift(h)}if(b.length>0){const _=Dt(b,p,t.options.strict,i);_.comment&&(c.comment?c.comment+=`
`+_.comment:c.comment=_.comment),c.range=[s.offset,p,_.offset]}else c.range=[s.offset,p,p];return c}function Tn(n,e,t,s,i,a){const r=t.type==="block-map"?Za(n,e,t,s,a):t.type==="block-seq"?er(n,e,t,s,a):tr(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function nr(n,e,t,s,i){var m;const a=s.tag,r=a?e.directives.tagName(a.source,h=>i(a,"TAG_RESOLVE_FAILED",h)):null;if(t.type==="block-seq"){const{anchor:h,newlineAfterProp:b}=s,p=h&&a?h.offset>a.offset?h:a:h??a;p&&(!b||b.offset<p.offset)&&i(p,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Ae.tagName&&o==="map"||r===nt.tagName&&o==="seq")return Tn(n,e,t,i,r);let l=e.schema.tags.find(h=>h.tag===r&&h.collection===o);if(!l){const h=e.schema.knownTags[r];if((h==null?void 0:h.collection)===o)e.schema.tags.push(Object.assign({},h,{default:!1})),l=h;else return h?i(a,"BAD_COLLECTION_TYPE",`${h.tag} used for ${o} collection, but expects ${h.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Tn(n,e,t,i,r)}const c=Tn(n,e,t,i,r,l),u=((m=l.resolve)==null?void 0:m.call(l,c,h=>i(a,"TAG_RESOLVE_FAILED",h),e.options))??c,d=Z(u)?u:new P(u);return d.range=c.range,d.tag=r,l!=null&&l.format&&(d.format=l.format),d}function sr(n,e,t){const s=e.offset,i=ir(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?P.BLOCK_FOLDED:P.BLOCK_LITERAL,r=e.source?ar(e.source):[];let o=r.length;for(let p=r.length-1;p>=0;--p){const g=r[p][1];if(g===""||g==="\r")o=p;else break}if(o===0){const p=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:p,type:a,comment:i.comment,range:[s,g,g]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let p=0;p<o;++p){const[g,_]=r[p];if(_===""||_==="\r")i.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=g.length),u=p,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+_.length+1}for(let p=r.length-1;p>=o;--p)r[p][0].length>l&&(o=p+1);let d="",m="",h=!1;for(let p=0;p<u;++p)d+=r[p][0].slice(l)+`
`;for(let p=u;p<o;++p){let[g,_]=r[p];c+=g.length+_.length+1;const v=_[_.length-1]==="\r";if(v&&(_=_.slice(0,-1)),_&&g.length<l){const E=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-_.length-(v?2:1),"BAD_INDENT",E),g=""}a===P.BLOCK_LITERAL?(d+=m+g.slice(l)+_,m=`
`):g.length>l||_[0]==="	"?(m===" "?m=`
`:!h&&m===`
`&&(m=`

`),d+=m+g.slice(l)+_,m=`
`,h=!0):_===""?m===`
`?d+=`
`:m=`
`:(d+=m+_,m=" ",h=!1)}switch(i.chomp){case"-":break;case"+":for(let p=o;p<r.length;++p)d+=`
`+r[p][0].slice(l);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const b=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,b,b]}}function ir({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let m=1;m<i.length;++m){const h=i[m];if(!o&&(h==="-"||h==="+"))o=h;else{const b=Number(h);!r&&b?r=b:l===-1&&(l=n+m)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",d=i.length;for(let m=1;m<e.length;++m){const h=e[m];switch(h.type){case"space":c=!0;case"newline":d+=h.source.length;break;case"comment":t&&!c&&s(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=h.source.length,u=h.source.substring(1);break;case"error":s(h,"UNEXPECTED_TOKEN",h.message),d+=h.source.length;break;default:{const b=`Unexpected token in block scalar header: ${h.type}`;s(h,"UNEXPECTED_TOKEN",b);const p=h.source;p&&typeof p=="string"&&(d+=p.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function ar(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function rr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(m,h,b)=>t(s+m,h,b);switch(i){case"scalar":o=P.PLAIN,l=or(a,c);break;case"single-quoted-scalar":o=P.QUOTE_SINGLE,l=lr(a,c);break;case"double-quoted-scalar":o=P.QUOTE_DOUBLE,l=cr(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=Dt(r,u,e,t);return{value:l,type:o,comment:d.comment,range:[s,u,d.offset]}}function or(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Si(n)}function lr(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Si(n.slice(1,-1)).replace(/''/g,"'")}function Si(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function cr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=ur(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=dr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=fr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function ur(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const dr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function fr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function ki(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?sr(n,e,s):rr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[De]:l?c=hr(n.schema,i,l,t,s):e.type==="scalar"?c=mr(n,i,e,s):c=n.schema[De];let u;try{const d=c.resolve(i,m=>s(t??e,"TAG_RESOLVE_FAILED",m),n.options);u=G(d)?d:new P(d)}catch(d){const m=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",m),u=new P(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function hr(n,e,t,s,i){var o;if(t==="!")return n[De];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[De])}function mr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[De];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[De];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function pr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const gr={composeNode:Ei,composeEmptyNode:fs};function Ei(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=yr(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=ki(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=nr(gr,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(d){const m=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",m)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return c??(c=fs(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!G(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function fs(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:pr(e,t,s),indent:-1,source:""},d=ki(n,u,o,c);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=l),d}function yr({options:n},{offset:e,source:t,end:s},i){const a=new es(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Dt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function br(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new yn(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=bt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Ei(c,i,u,r):fs(c,u.end,s,null,u,r);const d=l.contents.range[2],m=Dt(a,d,!1,r);return m.comment&&(l.comment=m.comment),l.range=[t,d,m.offset],l}function It(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ts(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class wr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=It(t);a?this.warnings.push(new Xa(r,s,i)):this.errors.push(new Mt(r,s,i))},this.directives=new pe({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ts(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(X(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ee(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ts(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=It(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=br(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Mt(It(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Mt(It(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Dt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Mt(It(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new yn(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Li="\uFEFF",Ni="",Ii="",Gn="";function vr(n){switch(n){case Li:return"byte-order-mark";case Ni:return"doc-mode";case Ii:return"flow-error-end";case Gn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function $e(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Ms=new Set("0123456789ABCDEFabcdef"),_r=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Gt=new Set(",[]{}"),Sr=new Set(` ,[]{}
\r	`),Mn=n=>!n||Sr.has(n);class kr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&$e(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Li&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Ni,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&$e(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!$e(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&$e(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Mn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&$e(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Ii,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Mn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||$e(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>$e(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield Gn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if($e(a)||e&&Gt.has(a))break;t=s}else if($e(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Gt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Gt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Gn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Mn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if($e(t)||e&&Gt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!$e(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(_r.has(t))t=this.buffer[++e];else if(t==="%"&&Ms.has(this.buffer[e+1])&&Ms.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Er{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function We(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Os(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ci(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function zt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function lt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Ps(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!We(e.start,"explicit-key-ind")&&!We(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ci(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Lr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new kr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=vr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Ps(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Os(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Os(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=zt(this.peek(2)),s=lt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(We(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ci(t.key)&&!We(t.sep,"newline")){const o=lt(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(We(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=lt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):We(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!We(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||We(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=zt(s),a=lt(i);Ps(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=zt(e),s=lt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=zt(e),s=lt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Nr(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Er||null,prettyErrors:e}}function Ir(n,e={}){const{lineCounter:t,prettyErrors:s}=Nr(e),i=new Lr(t==null?void 0:t.addNewLine),a=new wr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Mt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Cs(n,t)),r.warnings.forEach(Cs(n,t))),r}function Ke(n,e,t){let s;const i=Ir(n,t);if(!i)return null;if(i.warnings.forEach(a=>ti(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Cr=`# Simulation family catalog source-of-truth.
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
      description: |-
        See how materials mix at this planetary scale, with a cut-away view of your impact simulation.  The material is coloured to show the target-planet's metal core in purple, its rocky mantle in orange, the impactor's core in blue, and its mantle in yellow.

        The main panel shows a top-down view, with a zoomed-out panel in the upper left.  The lower left panel shows a side-on view.
    - id: temperature
      label: Temperature
      icon: icon_temperature
      audio: false
      description: |-
        See how hot a planet gets when shocked and rocked by a giant impact, with a cut-away view of your impact simulation, and the material coloured to show the temperature.

        The main panel shows a top-down view, with a zoomed-out panel in the upper left.  The lower left panel shows a side-on view.
    - id: pressure
      label: Pressure
      icon: icon_pressure
      audio: false
      description: |-
        Inspect the colossal pressures reached inside a planet and how the shock wave  from a giant impact travels through the planet, with a cut-away view of your impact simulation, and the material coloured to show the pressure.

        The main panel shows a top-down view, with a zoomed-out panel in the upper left.  The lower left panel shows a side-on view.

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
    min: 0.01
    max: 0.35
    step: 0.01
    primary: false
  impactor_velocity:
    label: Impact Speed
    description: How fast was the impactor travelling when it hit?  Faster collisions are more violent, ejecting more and hotter debris.
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
    description: How much of the Universe is made of ordinary stuff — the atoms that form stars, planets, and you?  Turn this up and there's more gas to make galaxies; turn it down and dark matter dominates.
    unit: ''
    min: 0.10
    max: 4
    step: 0.01
    value_scale: 0.159
    primary: true
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
`,Tr=`# Summary overlay display configuration for each simulation family.
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
      description: The estimated carbon footprint of this run.  Carbon dioxide is a major driver of climate change, and supercomputer-driven research at this scale has real environmental costs that must be considered when planning our research.
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
      description: The estimated carbon footprint of this run.  Carbon dioxide is a major driver of climate change, and supercomputer-driven research at this scale has real environmental costs that must be considered when planning our research.
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
      description: The estimated carbon footprint of this run.  Carbon dioxide is a major driver of climate change, and supercomputer-driven research at this scale has real environmental costs that must be considered when planning our research.
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
`,Mr=`# Live telemetry HUD display configuration for each simulation family.
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
      label: SFR
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
`;function Q(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}function Ai(n,e,t){const s=n.indexOf("#"),i=s>=0?n.slice(0,s):n,a=s>=0?n.slice(s):"",r=new RegExp(`([?&])${Or(e)}=[^&#]*`);if(r.test(i))return`${i.replace(r,`$1${e}=${encodeURIComponent(t)}`)}${a}`;const o=i.includes("?")?"&":"?";return`${i}${o}${e}=${encodeURIComponent(t)}${a}`}function Or(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const Pr=Ke(Cr),xr=Ke(Ar),On=Ke(Tr),$r=Ke(Mr),ct=Object.entries(Pr).map(([n,e])=>{var r,o,l;const t=Rr(On[n]),s=(((r=On[n])==null?void 0:r.results)??[]).map(Fr),i=((o=$r[n])==null?void 0:o.liveStats)??[],a=xr[n]??{};return{id:n,label:e.label,placeholderImage:Q(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(zn),liveStats:i.map(zn),morphologyChecklist:(l=On[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const d=u.quali_labels,m=d!==void 0&&d.length>0,h=m?0:u.min,b=m?d.length-1:u.max,p=m?1:u.step??Br(u.min,u.max),g=m?Math.floor(d.length/2):u.log_scale?Math.sqrt(u.min*u.max):Vr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:h,max:b,step:p,fallbackValue:g,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:d,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Rr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function zn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Fr(n){return{...zn(n),target:n.target}}function Br(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Vr(n,e){return n+(e-n)/2}const Ti="universe-engine-theme",Mi=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Ur(){const n=localStorage.getItem(Ti);return Hr(n)?n:"glass"}function Pn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Ti,n)}function Dr(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Mi){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function Hr(n){return Mi.some(e=>e.id===n)}let de=null,Re="primary";function jr(n,e=null){de={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function qr(){de=null,Re="primary"}function Kr(n){Re=n}function Wr(n){return n==="local"?{mode:"local",base:null}:de?{mode:Re,base:Oi()}:{mode:"primary",base:null}}function Ue(n){if(!de)return n;const e=Oi();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!$s(t,de.primaryBase)&&(!de.backupBase||!$s(t,de.backupBase))?n:Rs(e,`${t.pathname}${t.search}${t.hash}`)}return Rs(e,n)}async function Ye(n,e){const t=Ue(n),s=!!(de!=null&&de.backupBase)&&Re==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await xs(n,e);return a.ok&&(Re="backup"),a}catch(i){if(!s)throw i;const a=await xs(n,e);return a.ok&&(Re="backup"),a}}function Oi(){return de?Re==="backup"&&de.backupBase?de.backupBase:de.primaryBase:null}async function xs(n,e){if(!(de!=null&&de.backupBase))throw new Error("Backup asset host is not configured.");const t=Re;Re="backup";try{const s=await fetch(Ue(n),e);return s.ok||(Re=t),s}catch(s){throw Re=t,s}}function $s(n,e){const t=new URL(e);return n.origin===t.origin}function Rs(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function Yr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.crossOrigin="anonymous",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,d=new Map;let m=null,h=null;const b=document.createElement("canvas"),p=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function _(){m&&(URL.revokeObjectURL(m),m=null)}function v(I,T={}){const W=u.get(I);W&&(u.delete(I),T={...T,ownedObjectUrl:!0},I=W),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(I)){s.classList.remove("fade-out");return}const H=s.muted,B=T.seekFraction;_(),h=null,m=T.ownedObjectUrl?I:null,s.src=I,s.load(),s.onloadeddata=()=>{if(s.muted=H,B!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const ne=Math.max(0,Math.min(.999,B));s.currentTime=ne*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),T.autoplay&&s.play().catch(()=>{})}},120)}function N(I){s.muted=I}async function E(){await s.play()}function L(){s.pause()}function y(){s.classList.add("is-empty")}function k(){s.classList.remove("is-empty")}function S(I){if(!Number.isFinite(s.duration)||s.duration<=0)return;const T=Math.max(0,Math.min(1,I));s.currentTime=T*s.duration}function M(){s.currentTime=0,i==null||i(0)}function R(I=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(T=>{const W=()=>{B(),T()},H=window.setTimeout(()=>{B(),T()},Math.max(0,I));function B(){window.clearTimeout(H),s.removeEventListener("loadeddata",W)}s.addEventListener("loadeddata",W,{once:!0})})}function x(I,T=8e3){const W=Math.max(0,I);return W===0||F(W)?Promise.resolve():new Promise(H=>{const B=()=>{F(W)&&(j(),H())},ne=window.setTimeout(()=>{j(),H()},Math.max(0,T));function j(){window.clearTimeout(ne),s.removeEventListener("progress",B),s.removeEventListener("canplay",B),s.removeEventListener("loadeddata",B)}s.addEventListener("progress",B),s.addEventListener("canplay",B),s.addEventListener("loadeddata",B),B()})}function F(I){const T=s.currentTime;for(let W=0;W<s.buffered.length;W+=1){const H=s.buffered.start(W),B=s.buffered.end(W);if(!(T<H||T>B))return B-T>=I}return!1}function U(I){o=new Set(I.filter(Boolean).filter(T=>T!==s.currentSrc)),l||re()}function te(){l=!0,D(),ye()}function Y(){if(!l){re();return}l=!1,re()}function re(){for(const[I,T]of c.entries())o.has(I)||(T.removeAttribute("src"),T.load(),c.delete(I));for(const[I,T]of d.entries())o.has(I)||(T.abort(),d.delete(I));for(const I of o){if(!c.has(I)){const T=document.createElement("video");T.preload="auto",T.crossOrigin="anonymous",T.muted=!0,T.playsInline=!0,T.src=Ue(I),T.load(),c.set(I,T)}u.has(I)||d.has(I)||ke(I)}}function D(){for(const I of c.values())I.removeAttribute("src"),I.load();c.clear()}function ye(){for(const I of d.values())I.abort();d.clear()}function ke(I){const T=new AbortController;d.set(I,T);const W=Ai(I,"_",`${Date.now()}`);Ye(W,{signal:T.signal}).then(async H=>{if(!H.ok)return;const B=await H.blob();o.has(I)&&u.set(I,URL.createObjectURL(B))}).catch(H=>{H instanceof DOMException&&H.name}).finally(()=>{d.get(I)===T&&d.delete(I)})}function Ie(){o.clear(),l=!1,D(),ye();for(const I of u.values())URL.revokeObjectURL(I);u.clear()}function J(I){return u.get(I)??null}function fe(){if(!(!p||s.readyState<2||s.videoWidth===0||s.videoHeight===0)){b.width=s.videoWidth,b.height=s.videoHeight;try{p.drawImage(s,0,0,b.width,b.height),h=b.toDataURL("image/jpeg",.85)}catch{h=null}}}function be(){return fe(),h}function we(I){i=I}function ae(I){a=I}return{setSource:v,setMuted:N,play:E,pause:L,hideMedia:y,showMedia:k,seekToFraction:S,resetPlayback:M,waitForLoadedData:R,waitForBufferedAhead:x,onTimeUpdate:we,onEnded:ae,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:I=>{g=I,s.playbackRate=I},getPlaybackRate:()=>g,onPlayStateChange:I=>{r=I},getElement:()=>t,prewarmSources:U,suspendPrewarming:te,resumePrewarming:Y,clearPrewarmedSources:Ie,getPrewarmedBlobUrl:J,captureFrame:be}}const Gr=[.25,.5,1,2];function zr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");u.className="timeline";const d=document.createElement("div");d.className="timeline__bar-row";const m=document.createElement("div");m.className="timeline__audio is-hidden";const h=document.createElement("button");h.className="timeline__audio-btn",h.type="button",h.setAttribute("aria-label","Toggle audio mute"),h.innerHTML=Jr(),h.addEventListener("click",()=>r==null?void 0:r()),m.appendChild(h);const b=document.createElement("button");b.className="timeline__play-btn",b.type="button",b.setAttribute("aria-label","Toggle playback"),b.addEventListener("click",()=>s==null?void 0:s());const p=document.createElement("input");p.className="timeline__slider",p.type="range",p.min="0",p.max="1000",p.step="1",p.value="0",p.style.setProperty("--fill","0%"),p.setAttribute("aria-label","Simulation time");const g=document.createElement("div");g.className="timeline__speed";const _=document.createElement("button");_.className="timeline__speed-btn",_.type="button",_.setAttribute("aria-label","Playback speed"),_.addEventListener("click",()=>{g.classList.toggle("open")});const v=document.createElement("div");v.className="timeline__speed-menu";for(const L of Gr){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=xn(L),y.addEventListener("click",()=>{g.classList.remove("open"),i==null||i(L)}),v.appendChild(y)}g.appendChild(_),g.appendChild(v);const N=document.createElement("button");return N.className="timeline__summary-btn",N.type="button",N.setAttribute("aria-label","View run summary"),N.textContent="ⓘ",N.addEventListener("click",()=>a==null?void 0:a()),d.appendChild(m),d.appendChild(b),d.appendChild(p),d.appendChild(g),d.appendChild(N),p.addEventListener("input",()=>{const L=parseInt(p.value,10)/1e3;p.style.setProperty("--fill",`${L*100}%`),t==null||t(L)}),p.addEventListener("pointerdown",()=>o==null?void 0:o()),p.addEventListener("pointerup",()=>l==null?void 0:l()),p.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",L=>{g.contains(L.target)||g.classList.remove("open")}),u.appendChild(d),n.appendChild(u),E(c),{setPosition(L){const y=Math.max(0,Math.min(1,L));p.value=String(Math.round(y*1e3)),p.style.setProperty("--fill",`${y*100}%`)},setPlaying(L){b.textContent=L?"⏸":"▶",b.classList.toggle("is-paused",!L),b.setAttribute("aria-label",L?"Pause":"Play")},setSpeed(L){E(L)},setAudioVisible(L){m.hidden=!L,m.classList.toggle("is-hidden",!L)},setMuted(L){h.classList.toggle("is-muted",L),h.setAttribute("aria-label",L?"Unmute audio":"Mute audio")}};function E(L){_.textContent=xn(L);for(const y of v.children)y.classList.toggle("is-active",y.textContent===xn(L))}}function xn(n){return`x${n}`}function Jr(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function Qr(n,e){const t=Math.min(Pi(e),2);return n.toFixed(t)}function Fe(n,e){return e?`${n} ${e}`:n}function Rt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?Ct(n):e<1e6?`${t}${Ct(n/1e3)}k`:e<1e9?`${t}${Ct(n/1e6)}M`:e<1e12?`${t}${Ct(n/1e9)}B`:`${t}${Ct(n/1e12)}T`:String(n)}function Ct(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Xr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function an(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return Rt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function mt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?Rt(i):Qr(i,a)}function Pi(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function Zr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=eo(s,i,a);for(const o of s.metadata.liveStats){const l=no(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function eo(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":mt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:to(a),value:r}]))}}function to(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function no(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=so((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Fe(a,n.unit)}}function so(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Rt(Math.round(a)):Rt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Xr(n,{integer:e.integer})}function io(){const n=Q("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(ro()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function ao(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function ro(){return ao(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const oo={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function lo(n,e,t){const s=Q("assets/banner-1600.webp"),i=[`${Q("assets/banner-960.webp")} 960w`,`${Q("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(m){o.innerHTML="";for(const h of m){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const p=oo[h.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${h.label}</span>
        <span class="entry-overlay__button-description">${p}</span>
      `,b.addEventListener("click",()=>t(h)),o.appendChild(b)}}l(e);const{infoButton:c,infoModal:u,close:d}=io();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){d(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(m){l(m)}}}function co(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(E=>[E.id,E.target])),a=n.metadata.results.map(E=>{const L=Rn(n,e,s,E.id);return L===null?null:{id:E.id,value:L,target:E.target}}).filter(E=>E!==null),r=n.parameters.filter(E=>i[E.id]!==void 0).map(E=>{const L=e[E.id]??E.fallbackValue,y=i[E.id]??E.fallbackValue;return Math.abs(L-y)/Math.max(E.max-E.min,1e-9)}),o=r.reduce((E,L)=>E+L,0)/Math.max(r.length,1),l=ho(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,m=`${$n(u,1)} CPU-hrs
${$n(d,1)} GB`,h=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,p=String(n.parameters.length+6),g="Present",_=fo((s==null?void 0:s.wallclockSeconds)??t),v=Fs(Bs(Rn(n,e,s,"moon_iron"))),N=Fs(Bs(Rn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:h},runtime:{label:"Total Runtime",value:_},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:m},memoryUsed:{label:"Memory Used",value:$n(d,1)},particlesUpdated:{label:"Particle updates",value:s?uo(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:N},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:p},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([E,L])=>[E,{label:L.label,value:L.value}]))}}function uo(n){return String(Math.max(0,n))}function fo(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function $n(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Rn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Fs(n){return n===null?"--":n.toFixed(1)}function Bs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function ho(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const Jn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},mo={HIDE_AFTER_MS:980},xi="https://media.universemakers.org/engine/run-manifest.json",Fn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",po="https://universe-engine.universe-engine.workers.dev/api/track-run",go=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Vs=(()=>{const n=Ke(go),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),rn="#4CD98A",Qn="#E8951C",$i="#D7372A",Ri=.2,Fi=.5,Us=2;function Bi(n){const e=Math.abs(n-1);return e<=Ri?{word:"On target",colour:rn}:e<=Fi?{word:n>1?"Too high":"Too low",colour:Qn}:{word:n>1?"Way too high":"Way too low",colour:$i}}function yo(n){const e=Math.abs(n-1),t=n>=1;return e<=Ri?t?"greenHigh":"greenLow":e<=Fi?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function bo(n){return Math.min(Math.max(n,0),Us)/Us*100}function wo(n){return n>=85?{word:"Almost perfect",colour:rn}:n>=65?{word:"Really close",colour:rn}:n>=45?{word:"Getting there",colour:Qn}:n>=25?{word:"Not quite",colour:Qn}:{word:"Way off - try again",colour:$i}}function vo(n,e,t){var r,o;const s=yo(t),i=((r=Vs[n])==null?void 0:r[s])??((o=Vs[e])==null?void 0:o[s]);return i||(Bi(t).colour===rn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function _o(n,e,t){return n.metadata.results.map(s=>{const i=So(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=ko(s,n,t),o=vo(s.id,r,a),l=Fe(Vi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function So(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=Eo((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function ko(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Eo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Lo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function No(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const d=document.createElement("button"),m=document.createElement("button");d.className="summary-overlay__button summary-overlay__button--primary",d.type="button",d.textContent="New Parameters",m.className="summary-overlay__button",m.type="button",m.textContent="Home",m.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),m.addEventListener("click",e.onHome),c.appendChild(d),c.appendChild(u),c.appendChild(m),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const h=document.createElement("div");h.className="sci-modal is-hidden",h.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(h),n.appendChild(t);const b=h.querySelector(".sci-modal__title"),p=h.querySelector(".sci-modal__verdict"),g=h.querySelector(".sci-modal__body"),_=h.querySelector(".sci-modal__close"),v=new Set;let N=!1;function E(S){const M=Bi(S.value);b.textContent=S.label,p.textContent=M.word,p.style.color=M.colour,p.hidden=!1,g.textContent=S.detail,h.classList.remove("is-hidden")}function L(S,M){b.textContent=S,p.hidden=!0,g.textContent=M,h.classList.remove("is-hidden")}function y(){h.classList.add("is-hidden")}_.addEventListener("click",y),h.addEventListener("click",S=>{S.target===h&&y()}),t.addEventListener("click",S=>{S.target===t&&e.onReplay()});function k(S,M){const R=document.createElement("div");R.className=`${S.className} panel`,R.innerHTML=`<p class="sci-section__title">${S.title}</p>`;const x=document.createElement("div"),F=S.singleRow?Math.max(1,S.stats.length):Math.max(1,Math.min(S.stats.length,S.maxColumns));x.className="metric-grid",S.singleRow&&x.classList.add("metric-grid--single-row"),x.style.setProperty("--summary-grid-columns",String(F)),x.style.setProperty("--summary-grid-max-width",`${S.maxWidthRem}rem`);for(const U of S.stats){const te=Io(U,M),Y=document.createElement("div"),re=document.createElement("span"),D=document.createElement("span");Y.className="res-card",re.className="res-card__label",re.textContent=te.label,D.className="res-card__value",D.textContent=te.value,Y.appendChild(re),Y.appendChild(D),U.description&&(Y.classList.add("res-card--has-info"),Y.addEventListener("click",()=>{L(te.label,U.description)})),x.appendChild(Y)}return R.appendChild(x),R}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,N&&(v.clear(),N=!1)},mo.HIDE_AFTER_MS)},setHomeVisible(S){m.hidden=!S},update(S,M,R,x,F){var I,T,W,H,B,ne;r.innerHTML="",y();const U=co(S,M,R,x),te=S.metadata.summaryStats,Y=_o(S,M,x),re=new Set(Y.map(j=>j.id));let D;if(Y.length>0)D=Lo(Y);else{const j=((I=U.similarityScore)==null?void 0:I.value)??"0/100";D=parseInt(j,10)||0}const ye=wo(D),ke=document.createElement("div"),Ie=document.createElement("div"),J=document.createElement("div");ke.className="sci-top",Ie.className="summary-main-column",J.className="summary-side-column";const fe=document.createElement("div");fe.className="sci-hero panel",F?(fe.classList.add("sci-hero--thumbnail"),fe.innerHTML=`<img class="sci-hero__thumbnail" src="${F}" alt="Final frame of simulation" />`):fe.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${D}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${ye.colour}">${ye.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${D}%; background:${ye.colour}; box-shadow:0 0 12px ${ye.colour}"></div>
          </div>
        `,Ie.appendChild(fe);const be=te.filter(j=>(j.section??"resources")==="resources"&&!Y.some(se=>se.id===String(j.id))&&j.id!=="similarityScore"),we=te.filter(j=>j.section==="simulationStats"&&!re.has(String(j.id)));be.length>0&&J.appendChild(k({title:"Resources Used",className:"res-section",stats:be,maxColumns:3,maxWidthRem:48},U)),we.length>0&&J.appendChild(k({title:"Simulation Stats",className:"res-section",stats:we,maxColumns:we.length,maxWidthRem:48,singleRow:!0},U)),ke.appendChild(Ie),J.childElementCount>0&&ke.appendChild(J),r.appendChild(ke);const ae=S.metadata.morphologyChecklist;if(ae&&ae.length>0){const j=((W=(T=x==null?void 0:x.summaryMetrics)==null?void 0:T.morphology)==null?void 0:W.value)??null,se=(j==null?void 0:j.toLowerCase())??null,oe=new Set(ae.map(V=>V.id));se&&oe.has(se)&&v.add(se);const q=document.createElement("div");q.className="sci-bottom-row";const Ee=document.createElement("div");Ee.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",Ee.appendChild(Ds(S,M,L));const Oe=((H=ae.find(V=>V.id===se))==null?void 0:H.label)??j;if(Oe){const V=document.createElement("div");V.className="sci-section panel param-section";const K=document.createElement("p");K.className="sci-section__title",K.textContent="Galaxy Morphology";const C=document.createElement("div");C.className="res-card res-card--has-info";const $=document.createElement("span");$.className="res-card__value",$.textContent=Oe,C.appendChild($),C.addEventListener("click",()=>{var ie;return L("Galaxy Morphology",((ie=ae.find(z=>z.id===(j??"").toLowerCase()))==null?void 0:ie.description)??`This galaxy is classified as "${Oe}".`)}),V.appendChild(K),V.appendChild(C),Ee.appendChild(V)}q.appendChild(Ee);const me=document.createElement("div");me.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const ve=((ne=(B=x==null?void 0:x.summaryMetrics)==null?void 0:B.description)==null?void 0:ne.value)??null;if(ve){const V=document.createElement("div");V.className="sci-section panel",V.style.cssText="flex:0 1 auto; min-width:0;";const K=document.createElement("p");K.className="sci-section__title",K.textContent="About This Galaxy";const C=document.createElement("p");C.className="galaxy-summary__desc-text",C.textContent=ve,V.appendChild(K),V.appendChild(C),me.appendChild(V)}const he=document.createElement("div");he.className="sci-section panel",he.style.cssText="flex:1; min-height:0;";const Ve=document.createElement("p");Ve.className="sci-section__title",Ve.textContent="Morphology Scavenger Hunt";const Pe=document.createElement("div");Pe.className="galaxy-summary__checklist",Pe.style.cssText="flex:1; align-items:center;";const ze=ae.every(V=>v.has(V.id));for(const V of ae){const K=document.createElement("div");K.className="galaxy-summary__check",v.has(V.id)&&K.classList.add("is-found"),K.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${v.has(V.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${V.label}</span>
          `,V.hint&&(K.classList.add("res-card--has-info"),K.addEventListener("click",()=>L(V.label,V.hint))),Pe.appendChild(K)}if(he.appendChild(Ve),he.appendChild(Pe),ze){N=!0;const V=document.createElement("div");V.className="galaxy-summary__done",V.textContent="★ You've discovered all of the galaxy types. Well done! ★",he.appendChild(V)}me.appendChild(he),q.appendChild(me),r.appendChild(q)}else if(Y.length>0){const j=document.createElement("div");j.className="sci-bottom-row",j.appendChild(Ds(S,M,L));const se=document.createElement("div"),oe=document.createElement("div"),q=document.createElement("p"),Ee=document.createElement("p");se.className="sci-section panel",oe.className="sci-section__header",q.className="sci-section__title",q.textContent="Similarity Results",Ee.className="sci-section__hint",Ee.textContent="Select any bar for details",oe.appendChild(q),oe.appendChild(Ee);const Oe=document.createElement("div");Oe.className="sci-bars";for(const me of Y){const ve=document.createElement("div");ve.className="sci-bar",ve.innerHTML=`
            <div class="sci-bar__name">${me.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${bo(me.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${me.formattedValue}</div>
          `,ve.addEventListener("click",()=>E(me)),Oe.appendChild(ve)}se.appendChild(oe),se.appendChild(Oe),j.appendChild(se),r.appendChild(j)}}}}function Io(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Co(s,n);if(i)return{label:n.label??t.label,value:i};const a=Vi(s,n);return{label:n.label??t.label,value:Fe(a,n.unit)}}function Ds(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const d=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":mt(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=Fe(d,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Co(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Fe(an(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Fe(an(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Fe(n,e.unit)}function Vi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return an(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return an(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Rt(i)}function Ao(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=To(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Mo()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function To(n){switch(n){case"icon_houdini":return Ne(`
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
      `);default:return null}}function Ne(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Mo(){return Ne(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Oo=`# Credits source-of-truth.
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
`;function Po(){const n=Ke(Oo);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function xo(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:$o(u),i.innerHTML="";const m=document.createElement("div");m.className="parameter-editor__heading",m.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(m);const h=document.createElement("div");h.className="param-info-modal is-hidden",h.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(h);const b=h.querySelector(".sci-modal__title"),p=h.querySelector(".sci-modal__body"),g=h.querySelector(".sci-modal__close");function _(E,L){b.textContent=E,p.textContent=L,h.classList.remove("is-hidden")}function v(){h.classList.add("is-hidden")}g.addEventListener("click",v),h.addEventListener("click",E=>{E.target===h&&v()});const N=document.createElement("div");N.className="parameter-editor__list";for(const E of u.parameters)N.appendChild(l(E,_));i.appendChild(N),c()}function l(u,d){const m=document.createElement("div");m.className="res-card param-card";const h=document.createElement("div");h.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const p=u.displayUnit??u.unit,g=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,_=document.createElement("span");if(_.className="param-card__range",g){const y=u.qualiLabels;_.textContent=`${y[0]} – ${y[y.length-1]}`}else _.textContent=`${Fe(mt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)} – ${Fe(mt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}`;h.appendChild(b),h.appendChild(_);const v=document.createElement("input");v.className="param-card__slider",v.type="range";const N=r[u.id]??u.fallbackValue;if(g){const y=u.qualiLabels.length;v.min="0",v.max=String(y-1),v.step="any",v.value=String(Math.round(N))}else{const y=u.logScale?Math.log10(u.min):u.min,k=u.logScale?Math.log10(u.max):u.max;v.min=String(y),v.max=String(k),v.step=u.logScale?"0.001":String(u.step),v.value=String(u.logScale?Math.log10(Math.max(N,Number.MIN_VALUE)):N)}v.setAttribute("aria-label",u.label);const E=document.createElement("span");E.className="res-card__value";function L(y){if(g){const k=Math.round(y),S=u.qualiLabels;r[u.id]=k,v.style.setProperty("--fill",`${Jt(y,0,S.length-1)}%`),E.textContent=S[k]??String(k)}else{const k=u.logScale?10**y:y;r[u.id]=k,v.value=String(y),v.style.setProperty("--fill",`${Jt(y,parseFloat(v.min),parseFloat(v.max))}%`),E.textContent=Fe(mt(k,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}c()}if(v.addEventListener("input",()=>{L(parseFloat(v.value))}),v.addEventListener("pointerdown",y=>y.stopPropagation()),v.addEventListener("click",y=>y.stopPropagation()),g){const y=Math.round(N),k=u.qualiLabels;v.style.setProperty("--fill",`${Jt(y,0,k.length-1)}%`),E.textContent=k[y]??String(y)}else{const y=u.logScale?Math.log10(Math.max(N,Number.MIN_VALUE)):N;v.style.setProperty("--fill",`${Jt(y,parseFloat(v.min),parseFloat(v.max))}%`),E.textContent=Fe(mt(N,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}if(u.description){m.classList.add("res-card--has-info"),m.setAttribute("title",u.description);const y=document.createElement("span");y.className="param-card__info-btn",y.setAttribute("aria-label","Parameter description"),y.textContent="ⓘ",h.appendChild(y),m.addEventListener("click",()=>{d(u.label,u.description)})}return m.appendChild(h),m.appendChild(v),m.appendChild(E),m}function c(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function $o(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function Jt(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Ui="universe-engine-advanced-settings",Ro="RSSSE26UM_Engine";function on(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Fo(n){const e=localStorage.getItem(Ui);if(!e)return on();try{const t=JSON.parse(e);return Di(t,n)}catch{return on()}}function Bo(n,e){const t=Di(n,e);return localStorage.setItem(Ui,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Di(n,e){const t=on(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Vo(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Vo(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):on().defaultAudioVolume}function Uo(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Do(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const l=document.createElement("div");l.className="config-overlay__header";const c=document.createElement("div");c.className="config-overlay__title-block",c.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=c.querySelector(".config-overlay__eyebrow"),d=c.querySelector(".config-overlay__title"),m=c.querySelector(".config-overlay__subtitle"),h=document.createElement("button");h.className="config-overlay__close",h.type="button",h.setAttribute("aria-label","Back"),h.textContent="←",l.appendChild(c),l.appendChild(h);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="parameters";const p=document.createElement("div");b.appendChild(p);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="settings",g.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const _=document.createElement("div");g.appendChild(_);const v=document.createElement("section");v.className="audio-settings",v.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const N=document.createElement("label");N.className="advanced-settings__field advanced-settings__field--inline";const E=document.createElement("input"),L=document.createElement("span");E.type="checkbox",E.className="advanced-settings__checkbox",L.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,N.appendChild(E),N.appendChild(L),v.appendChild(N);const y=document.createElement("label");y.className="advanced-settings__field",y.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const k=document.createElement("input"),S=document.createElement("span");k.type="range",k.min="0",k.max="100",k.step="1",k.className="audio-settings__slider",S.className="audio-settings__value",y.appendChild(k),y.appendChild(S),v.appendChild(y),g.appendChild(v);const M=document.createElement("section");M.className="advanced-settings",M.dataset.state="closed",M.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const R=document.createElement("button");R.className="advanced-settings__access",R.type="button",R.textContent="Advanced Settings",M.appendChild(R);const x=document.createElement("div");x.className="advanced-settings__auth";const F=document.createElement("input");F.className="advanced-settings__password",F.type="password",F.placeholder="Enter password",F.autocomplete="off";const U=document.createElement("button");U.className="advanced-settings__unlock",U.type="button",U.textContent="Unlock";const te=document.createElement("p");te.className="advanced-settings__message",x.appendChild(F),x.appendChild(U),x.appendChild(te),M.appendChild(x);const Y=document.createElement("div");Y.className="advanced-settings__form";const re=document.createElement("label");re.className="advanced-settings__field",re.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const D=document.createElement("select");D.className="advanced-settings__select",D.appendChild(new Option("None",""));for(const C of e.availableScales)D.appendChild(new Option(C.label,C.id));re.appendChild(D),Y.appendChild(re);const ye=document.createElement("div");ye.className="advanced-settings__field",ye.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const ke=document.createElement("div");ke.className="advanced-settings__options";const Ie=document.createElement("label"),J=document.createElement("input");Ie.className="advanced-settings__choice",J.type="radio",J.name="manifest-source",J.value="local",Ie.appendChild(J),Ie.append("Local manifest");const fe=document.createElement("label"),be=document.createElement("input");fe.className="advanced-settings__choice",be.type="radio",be.name="manifest-source",be.value="online",fe.appendChild(be),fe.append("Online manifest"),ke.appendChild(Ie),ke.appendChild(fe),ye.appendChild(ke),Y.appendChild(ye);const we=document.createElement("label");we.className="advanced-settings__field advanced-settings__field--inline";const ae=document.createElement("input"),I=document.createElement("span");ae.type="checkbox",ae.className="advanced-settings__checkbox",I.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,we.appendChild(ae),we.appendChild(I),Y.appendChild(we);const T=document.createElement("div");T.className="advanced-settings__field",T.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const W=document.createElement("div");W.className="advanced-settings__options";const H=new Map;for(const C of e.availableScales){const $=document.createElement("label"),ie=document.createElement("input");$.className="advanced-settings__choice",ie.type="checkbox",ie.value=C.id,H.set(C.id,ie),$.appendChild(ie),$.append(`Show ${C.label}`),W.appendChild($)}T.appendChild(W),Y.appendChild(T),M.appendChild(Y),g.appendChild(M);const B=document.createElement("section");B.className="config-overlay__section config-overlay__section--grow",B.dataset.section="credits",B.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const ne=B.querySelector("[data-credits]"),j=Po();if(ne.innerHTML="",j.length===0){const C=document.createElement("div");C.className="credits-list__entry",C.textContent="To be credited...",ne.appendChild(C)}else for(const C of j)if(C.header){const $=document.createElement("div");$.className="credits-list__heading",$.textContent=C.text,ne.appendChild($)}else{const $=document.createElement("div");$.className="credits-list__entry";const ie=document.createElement("span");if(ie.className="credits-list__text",C.url){const z=document.createElement("a");z.className="credits-list__link",z.href=C.url,z.target="_blank",z.rel="noopener noreferrer",z.textContent=C.text,ie.appendChild(z)}else ie.textContent=C.text;$.appendChild(ie),ne.appendChild($)}const se=document.createElement("div");se.className="config-overlay__footer";const oe=document.createElement("button");oe.className="run-button",oe.type="button",oe.textContent="Run",se.appendChild(oe),o.appendChild(l),o.appendChild(b),o.appendChild(g),o.appendChild(B),o.appendChild(se),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let q=At(e.advancedSettings),Ee="closed";const Oe=xo(p,e.simClass,e.values,e.onValuesChange),me=Dr(_,e.theme,e.onThemeChange);h.addEventListener("click",e.onClose),R.addEventListener("click",()=>{if(Ee==="open"){Pe("closed");return}Pe("auth"),F.focus()}),U.addEventListener("click",Ve),F.addEventListener("keydown",C=>{C.key==="Enter"&&Ve()}),D.addEventListener("change",()=>{q.lockedScaleId=D.value||null,he()}),J.addEventListener("change",()=>{J.checked&&(q.manifestSource="local")}),be.addEventListener("change",()=>{be.checked&&(q.manifestSource="online")}),ae.addEventListener("change",()=>{q.verboseLogging=ae.checked}),E.addEventListener("change",()=>{q.audioMutedByDefault=E.checked}),k.addEventListener("input",()=>{q.defaultAudioVolume=Number(k.value)/100,K()});for(const[C,$]of H.entries())$.addEventListener("change",()=>{if(Array.from(H.entries()).filter(([,z])=>z.checked).map(([z])=>z).length===0&&!q.lockedScaleId){$.checked=!0;return}q.hiddenScaleIds=Array.from(H.keys()).filter(z=>{var _e;return!((_e=H.get(z))!=null&&_e.checked)&&z!==q.lockedScaleId}),he()}),C===q.lockedScaleId&&($.disabled=!0);ve(e.initialView??"parameters"),he();function ve(C){o.dataset.view=C,C==="parameters"?(u.textContent=e.simClass.label,d.textContent="Shape Your Simulation",m.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):C==="settings"?(u.textContent="Interface",d.textContent="Adjust The Control Room",m.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=Q("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",d.textContent="Project Sources And Attribution",m.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=Q("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),C==="settings"?oe.textContent="Apply":C==="credits"?oe.textContent="Close":oe.textContent="Run Simulation"}function he(){D.value=q.lockedScaleId??"",J.checked=q.manifestSource==="local",be.checked=q.manifestSource==="online",ae.checked=q.verboseLogging,E.checked=q.audioMutedByDefault,k.value=String(Math.round(q.defaultAudioVolume*100)),K();for(const[C,$]of H.entries()){const ie=q.lockedScaleId===C;$.checked=ie||!q.hiddenScaleIds.includes(C),$.disabled=ie}}function Ve(){if(F.value!==Ro){te.textContent="Incorrect password";return}F.value="",te.textContent="",Pe("open")}function Pe(C){Ee=C,M.dataset.state=C,R.textContent=C==="open"?"Hide Advanced Settings":"Advanced Settings",C!=="auth"&&(te.textContent="")}function ze(){F.value="",te.textContent="",Pe("closed")}function V(){q=At(e.advancedSettings),he()}function K(){S.textContent=`${Math.round(Number(k.value))}%`}return oe.addEventListener("click",()=>{const C=o.dataset.view;if(C==="settings"){e.onApplySettings(At(q));return}if(C==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),V(),ze()},setSimulation(C,$){e.simClass=C,a.dataset.simClass=C.id,Oe.setSimClass(C,$),o.dataset.view==="parameters"&&(r.src=C.placeholderImage,r.alt=`${C.label} preview`,ve("parameters"))},setTheme(C){me.setActive(C)},setView(C){ve(C),C!=="settings"&&ze()},setAdvancedSettings(C){e.advancedSettings=At(C),q=At(C),he(),ze()}}}function At(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function Ho(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=Jn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const b of l)window.clearTimeout(b);l=[]}function d(b,p){return new Promise(g=>{const _=window.setTimeout(()=>{p===c&&g()},Math.max(0,b));l.push(_)})}async function m(b,p){const g=document.createElement("div");g.className="terminal__line";const _=h();g.appendChild(_),o.appendChild(g);for(let v=0;v<b.length;v+=1){if(p!==c)return;const N=b[v];g.insertBefore(document.createTextNode(N),_),o.scrollTop=o.scrollHeight,await d(e,p)}_.remove()}function h(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,p,g,_){u(),c+=1;const v=c;i.hidden=!1,i.classList.remove("is-hidden");const N=performance.now(),E=(_==null?void 0:_.minTerminalTimeMs)??t;let L=!g,y=[...b];g&&g.then(()=>{L=!0});let k=0;for(;v===c;){y.length===0&&(y=[...b]);const M=Math.floor(Math.random()*y.length),[R]=y.splice(M,1),x=`${Hs(k)} ${R.text}`;if(k+=1,await m(x,v),v!==c)return;if(performance.now()-N>=E&&L)break}if(v!==c)return;const S=document.createElement("div");S.className="terminal__line terminal__line--syncing",S.textContent=`${Hs(k)} STARTING SIMULATION...`,o.appendChild(S),o.scrollTop=o.scrollHeight,await d(s,v),v===c&&p()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Hs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Bn(t)}:${Bn(s)}:${Bn(i)}]`}function Bn(n){return String(n).padStart(2,"0")}function jo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=l("Home",()=>{c(),e.onHome()});s.appendChild(a),s.appendChild(l("Settings",()=>{c(),e.onViewSelected("settings")})),s.appendChild(l("Credits",()=>{c(),e.onViewSelected("credits")}));const r=l("Fullscreen",()=>{var d;c(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||c()}),u(e.showHome??!0),{close:c,setHomeVisible:u};function l(d,m){const h=document.createElement("button");return h.className="display-menu__item",h.type="button",h.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,h.addEventListener("click",m),h}function c(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const Hi="universe-engine-playback-speed",qo=new Set([.25,.5,1,2]);function Ko(){const n=localStorage.getItem(Hi),e=n?Number(n):NaN;return qo.has(e)?e:1}function Wo(n){localStorage.setItem(Hi,String(n))}async function Vn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function Yo(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const Go=`# Initialization terminal script for the Planetary simulation family.
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
`,zo=`# Initialization terminal script for the Galaxy simulation family.
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
`,Jo=`# Initialization terminal script for the Cosmos simulation family.
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
`,Qo={planetary:Go,galaxy:zo,cosmos:Jo};function Xo(n){return Ke(Qo[n.id]).map(t=>({text:t}))}function Ft(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var d;const l=t[o.id]??o.fallbackValue,c=((d=n.parameters)==null?void 0:d[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function Zo(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(u=>u.primary!==!1).map(u=>u.id)),i=new Set(e.filter(u=>u.primary===!1).map(u=>u.id));if(!e.some(u=>u.primary===!1))return Un(n,e,t);const r=Un(n,e,t,s);if(!r)return null;const o=Ft(r,e,t,s),l=1e-6,c=n.filter(u=>{const d=Ft(u,e,t,s);return Math.abs(d-o)<=l});return Un(c,e,t,i)}function Un(n,e,t,s){if(n.length===0)return null;let i=n[0],a=Ft(i,e,t,s);for(const r of n.slice(1)){const o=Ft(r,e,t,s);o<a&&(i=r,a=o)}return i}function el(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function tl(n){try{const e=await Ye(n);if(!e.ok)return null;const t=await e.text(),s=Ke(t),i=ut(s.wallclockSeconds),a=ut(s.computeUsed),r=ut(s.memoryUsed),o=ut(s.carbonBurnt),l=ut(s.particlesUpdated),c=await nl(n),u=il(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function nl(n){try{const e=await Ye(sl(n));if(!e.ok)return{};const t=await e.text(),s=Ke(t);return al(s)}catch{return{}}}function sl(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function ut(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function il(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function al(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=ut(s);i!==null&&(e[t]=i)}return e}const ji="[UniverseEngine]";let qi=!1;function js(n){qi=n}function Ki(){return qi}function ce(n,e){Ki()&&console.info(ji,n,e??"")}function je(n,e){Ki()&&console.warn(ji,n,e??"")}const rl={local:"assets/local-manifest.json",online:xi};function ol(n="local"){let e=n;const t=new Map,s=new Map;return{getSource(){return e},setSource(i){t.delete(i),s.delete(i),qr(),e=i,ce("Manifest source updated",{source:i})},async preloadActiveManifest(){await Yi(e,t,s)},async findNearestVideo(i,a,r){const o=await ul(e,t,s,i,a,r);if(o)return o;const l=Wi(i);return je("Falling back to placeholder assets",{simClassId:i,source:e,fallbackUrl:l}),{url:l,liveDataUrl:ll(i),summaryUrl:el(l)}}}}function Wi(n){switch(n){case"planetary":return Q("assets/planet_test.mp4");case"galaxy":return Q("assets/galaxy_test.mp4");case"cosmos":return Q("assets/cosmo_test.mp4");default:return Q("assets/galaxy_test.mp4")}}function ll(n){switch(n){case"planetary":return Q("assets/planet_test_planetary_stats.csv");case"galaxy":return Q("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return Q("assets/cosmo_test_cosmos_stats.csv");default:return Q("assets/galaxy_test_galaxy_stats.csv")}}async function Yi(n,e,t){const s=e.get(n);if(s)return s;const i=rl[n],a=(n==="online"?cl(i):fetch(Q(i),{cache:"no-store"}).then(async r=>{if(!r.ok)throw new Error(`Failed to load manifest: ${i}`);return ce("Loaded manifest",{source:n,manifestPath:i}),await r.json()})).then(r=>(t.set(n,dl()),r)).catch(r=>(t.delete(n),je("Manifest unavailable",{source:n,manifestPath:i,error:r instanceof Error?r.message:String(r)}),{version:1,runs:[]}));return e.set(n,a),a}async function cl(n){const e=[n,Fn];for(const t of e)try{const s=await fetch(t,{cache:"no-store"});if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??qs(xi),r=i.backupBase??qs(Fn);return jr(a,r),t===Fn&&Kr("backup"),ce("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function ul(n,e,t,s,i,a){const o=(await Yi(n,e,t)).runs.filter(m=>m.simulationId===s);if(o.length===0)return je("No manifest runs found for simulation",{simClassId:s,source:n}),null;const l=Zo(o,i,a);if(!l)return null;const c=Ft(l,i,a),u=l.defaultView??Object.keys(l.views)[0],d=l.views[u];return d?(ce("Selected manifest-backed run",{simClassId:s,source:n,runId:l.runId,selectedValues:a,distance:c,viewId:u}),{url:Qt(n,d,t),liveDataUrl:Qt(n,l.liveDataPath,t),summaryUrl:Qt(n,l.summaryPath,t),viewId:u,runId:l.runId,views:Object.fromEntries(Object.entries(l.views).map(([m,h])=>[m,Qt(n,h,t)]))}):null}function Qt(n,e,t){const s=n==="local"?Q(e):Ue(e),i=t.get(n);return i?Ai(s,"_manifest",i):s}function dl(){return`${Date.now()}`}function qs(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const tn={mode:"time",frames:[]};async function fl(n){const e=await Ye(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return pl(t)}function hl(n,e,t=0){if(n.mode==="row")return gl(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=ml(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return yl(r.values,o.values,l)}function ml(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function pl(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return tn;const t=Dn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Dn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Dn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function gl(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Dn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function yl(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=bl(u);continue}i[a]=t<.5?r:o}return i}function bl(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function wl(n){vl(po,n)}function vl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ce("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ce("Run selection tracked",{simulationId:e.simulationId}):je("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{je("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const Ks=50*1024*1024,_l=8,Sl=6e3,kl=8e3,El=5e3,Ll=1200,Nl=100,Hn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Il(n){const e=ct.map(f=>f.id);let t=Fo(e),s=_s(t);const i=ol(t.manifestSource),a=Yo();js(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=Ss(t.lockedScaleId)??s[0]??ct[0],o=t.lockedScaleId?Hn[r.id]:Ur(),l=!1,c=null,u=null,d=!1,m=t.audioMutedByDefault,h=t.defaultAudioVolume,b=0;const p=new Set;let g=null,_=0,v=tn,N=!1;const E=Object.fromEntries(ct.map(f=>[f.id,ra(f)]));Pn(o);const L=Wi(r.id),y=Yr(n,L),k=document.createElement("audio");k.preload="auto",k.hidden=!0,k.setAttribute("playsinline","true"),k.muted=m,k.volume=h,n.appendChild(k);const S=document.createElement("div");S.className="display-chrome",S.classList.add("is-hidden"),n.appendChild(S);const M=document.createElement("div");M.className="orientation-overlay",M.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(M);const R=document.createElement("div");R.className="swift-logo",R.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Q("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
    <img
      class="swift-logo__image-compact"
      src="${Q("assets/credits/swift-logo-compact.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(R);const x=document.createElement("div");x.className="synth-logo is-hidden",x.innerHTML=`
    <img
      class="synth-logo__image"
      src="${Q("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
    <img
      class="synth-logo__image-compact"
      src="${Q("assets/credits/synthesizer_banner_compact.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(x);const F=document.createElement("img");F.className="app-partner-logo",F.src=Q("assets/dirac-hpc-white.webp"),F.alt="DIRAC HPC",F.decoding="async",n.appendChild(F);const U=document.createElement("div");U.className="display-chrome__top-left is-hidden",n.appendChild(U);const te=jo(U,{onHome(){_n()},onViewSelected(f){if(f==="credits"){jt("credits");return}jt(f)},showHome:!t.lockedScaleId}),Y=document.createElement("div");Y.className="display-chrome__left-center",S.appendChild(Y);const re=Ao(Y,{onSelect(f){ys(f)},onInfo(f,w,A){ye.textContent=w,ke.textContent=A,D.classList.add("is-visible")}}),D=document.createElement("div");D.className="view-info-overlay",D.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(D);const ye=D.querySelector(".view-info-overlay__title"),ke=D.querySelector(".view-info-overlay__text"),Ie=D.querySelector(".view-info-overlay__close");D.addEventListener("click",f=>{f.target===D&&D.classList.remove("is-visible")}),Ie.addEventListener("click",()=>{D.classList.remove("is-visible")});const J=document.createElement("div");J.className="display-chrome__top-center is-hidden",S.appendChild(J);const fe=document.createElement("div");fe.className="display-chrome__top-right",S.appendChild(fe);const be=Zr(fe),we=document.createElement("div");we.className="display-chrome__center-status",we.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,S.appendChild(we);const ae=Ko();y.setPlaybackRate(ae);const I=document.createElement("div");I.className="display-chrome__bottom",S.appendChild(I);const T=zr(I,{onChange(f){Ee(f)},onTogglePlay:gs,onAudioToggle:Zi,onSpeedChange:ea,onSummaryClick:Xi,onScrubStart(){Pe(),q()},onScrubEnd(){ze(),y.isPaused()||oe()},initialSpeed:ae});T.setPlaying(!y.isPaused()),T.setAudioVisible(!1),T.setMuted(m),k.addEventListener("loadedmetadata",()=>{rt(!0),Le()});let W=null,H=null,B=null,ne=!1,j=null,se=0;function oe(){if(W!==null)return;function f(){const w=y.getPlaybackFraction();T.setPosition(w),y.isPaused()?W=null:W=requestAnimationFrame(f)}W=requestAnimationFrame(f)}function q(){W!==null&&(cancelAnimationFrame(W),W=null)}function Ee(f){H=f,B===null&&(B=requestAnimationFrame(()=>{if(B=null,H===null)return;const w=H;H=null,y.seekToFraction(w),rt(!0)}))}function Oe(){if(H===null)return;B!==null&&(cancelAnimationFrame(B),B=null);const f=H;H=null,y.seekToFraction(f),rt(!0)}function me(){j!==null&&(window.clearTimeout(j),j=null)}function ve(){if(!(g!=null&&g.views))return[];const f=at(r,g);return Object.entries(g.views).filter(([w])=>w!==f).map(([,w])=>Ue(w)).filter(Boolean)}function he(){me(),y.suspendPrewarming()}function Ve(f=Ll){me(),!(ne||y.isPaused())&&(j=window.setTimeout(()=>{j=null,!(ne||y.isPaused())&&(y.resumePrewarming(),y.prewarmSources(ve()))},Math.max(0,f)))}function Pe(){ne=!0,se=0,he(),Le()}function ze(){ne=!1,se=0,Oe(),_=y.getPlaybackFraction()*y.getDurationSeconds(),Xe(_),Ve(),Le()}y.onPlayStateChange(f=>{T.setPlaying(!f),f?(q(),he()):(oe(),Ve(0)),Le()}),y.onTimeUpdate(f=>{if(_=f*y.getDurationSeconds(),ne){const w=performance.now();if(w-se<Nl)return;se=w}Xe(_),rt()});const V=document.createElement("div");V.className="overlay-layer",n.appendChild(V);const K=No(V,{onReplay:Qi,onParameters:()=>jt("parameters"),onHome:_n,showHome:!t.lockedScaleId});y.onEnded(()=>{l=!0;const f=y.captureFrame();K.update(r,Ce(),y.getDurationSeconds(),c,f),K.show(),Le()});const C=lo(V,s,f=>{ps(f),jt("parameters")}),$=Do(V,{simClass:r,values:Ce(),theme:o,advancedSettings:t,availableScales:ct,onValuesChange:Gi,onThemeChange:vn,onRun:()=>{ce("Parameters submitted — starting run",{simClassId:r.id}),ta().catch(f=>{je("Run failed to start",{simClassId:r.id,error:f instanceof Error?f.message:String(f)})})},onApplySettings:zi,onClose:Ji,initialView:"parameters"}),ie=Ho(V);T.setPosition(0),Xe(),K.hide();const z=new WeakMap,_e=f=>{const w=z.get(f);w&&(clearTimeout(w),z.delete(f)),f.classList.remove("side-collapsed")},Je=f=>{const w=z.get(f);w&&clearTimeout(w),z.set(f,setTimeout(()=>{f.classList.add("side-collapsed"),z.delete(f)},2500))},bn=f=>{const w=z.get(f);w&&(clearTimeout(w),z.delete(f)),f.classList.add("side-collapsed")},wn=(f,w)=>{const A=w.isCollapsible??(()=>!0);f.addEventListener("mouseenter",()=>_e(f)),f.addEventListener("mouseleave",()=>{if(!A()){_e(f);return}Je(f)}),f.addEventListener("focusin",()=>_e(f)),f.addEventListener("focusout",O=>{if(!f.contains(O.relatedTarget)){if(!A()){_e(f);return}Je(f)}}),f.addEventListener("click",()=>{if(!A()){_e(f);return}if(f.classList.contains("side-collapsed")){_e(f),Je(f);return}w.toggleOnClick?bn(f):Je(f)}),A()?bn(f):_e(f)};wn(U,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),wn(Y,{toggleOnClick:!0}),wn(I,{toggleOnClick:!1});let kt=0,it=null,Ht=0;const hs=()=>{it!==null&&(cancelAnimationFrame(it),it=null)},ms=()=>{if(it!==null)return;Ht=y.getPlaybackFraction();const f=()=>{if(kt===0){hs();return}const A=12*(1/60)/Math.max(y.getDurationSeconds(),1);Ht=Math.max(0,Math.min(1,Ht+kt*A)),y.seekToFraction(Ht),it=requestAnimationFrame(f)};it=requestAnimationFrame(f)};document.addEventListener("keydown",f=>{if(n.dataset.mode==="display"&&!(f.target instanceof HTMLInputElement||f.target instanceof HTMLTextAreaElement))switch(f.key){case"Escape":f.preventDefault(),D.classList.contains("is-visible")?D.classList.remove("is-visible"):_n();break;case" ":f.preventDefault(),gs();break;case"ArrowLeft":f.preventDefault(),_e(I),Je(I),kt=-1,ms();break;case"ArrowRight":f.preventDefault(),_e(I),Je(I),kt=1,ms();break;case"ArrowUp":case"ArrowDown":{if(f.preventDefault(),_e(Y),Je(Y),!(g!=null&&g.views)||Object.keys(g.views).length<=1)break;const w=r.views.filter(ue=>{var Se;return((Se=g==null?void 0:g.views)==null?void 0:Se[ue.id])!==void 0});if(w.length<=1)break;const A=g.viewId??at(r,g),O=w.findIndex(ue=>ue.id===A),le=f.key==="ArrowUp"?(O-1+w.length)%w.length:(O+1)%w.length;ys(w[le].id);break}}}),document.addEventListener("keyup",f=>{(f.key==="ArrowLeft"||f.key==="ArrowRight")&&(kt=0,hs())}),y.hideMedia(),y.pause(),Qe(t.lockedScaleId?"config":"entry");function ps(f){f.id===r.id&&N||(r=f,En(),vn(Hn[f.id]),$.setSimulation(r,Ce()),T.setPosition(0),Xe(),kn(),Sn())}function Gi(f){E[r.id]={...f},ce("Parameter values updated",{simClassId:r.id,values:E[r.id]}),Xe()}function vn(f){o=f,Pn(f),$.setTheme(f)}function jt(f){f==="parameters"&&$.setSimulation(r,Ce()),$.setView(f),Qe("config")}function zi(f){if(ba(f),N){K.hide(),Qe("display");return}$.setSimulation(r,Ce()),$.setView("parameters")}function Ji(){if(K.hide(),!N&&t.lockedScaleId){$.setSimulation(r,Ce()),$.setView("parameters");return}Qe(N?"display":"entry")}function _n(){t.lockedScaleId||(ce("Returning to home screen",{simClassId:r.id}),En(),N=!1,y.hideMedia(),Qe("entry"))}function Qi(){l=!1,K.hide(),y.getPlaybackFraction()>=.999&&(y.resetPlayback(),rt(!0)),Vn(y),Le()}function Xi(){l=!0,y.pause();const f=c?y.captureFrame():null;K.update(r,Ce(),y.getDurationSeconds(),c,f),K.show(),Le()}function gs(){y.isPaused()?Vn(y):y.pause()}function Zi(){m=!m,Le()}function ea(f){y.setPlaybackRate(f),Wo(f),T.setSpeed(f)}async function ta(){const f=Ce(),w=a.start();ce("Run requested",{simClassId:r.id,values:f,manifestSource:i.getSource()});const A=await i.findNearestVideo(r.id,r.parameters,f);if(!a.isCurrent(w))return;En({preserveRunRequest:!0}),g=A;const O=at(r,A),le=Wr(i.getSource());wl({simulationId:r.id,parameters:f,manifestSource:i.getSource(),matchedRunId:A.runId,assetHostMode:le.mode,assetHostBase:le.base});const ue=da(A,O)??A.url,Se=Object.entries(A.views??{}).filter(([xe])=>xe!==O).map(([,xe])=>xe);la(A.liveDataUrl,w),ca(A.summaryUrl,w),ha(A.summaryUrl,w),y.setMuted(!0),kn(O),Lt(),Qe("initializing");const qt=na(ue);y.resumePrewarming(),y.prewarmSources(Se);const Nt=(async()=>{const xe=await qt;a.isCurrent(w)&&(ce(`Prepared active video source: ${xe.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:ue,waitsForBuffer:xe.shouldWaitForBuffer}),y.setSource(xe.src,{ownedObjectUrl:xe.ownedObjectUrl}),y.pause(),await y.waitForLoadedData(kl),a.isCurrent(w)&&xe.shouldWaitForBuffer&&await y.waitForBufferedAhead(_l,Sl))})();await new Promise(xe=>{ie.show(Xo(r),xe,Nt,{minTerminalTimeMs:ga()})}),a.isCurrent(w)&&(N=!0,y.showMedia(),Vn(y),Qe("display"),Le())}async function na(f){const w=Ue(f),A=await sa(f);if(A!==null&&A>0&&A<=Ks){ce("Downloading active video behind loading overlay",{videoUrl:w,contentLength:A});try{const O=await Ye(f);if(!O.ok)throw new Error(`Failed to download active video: ${w}`);const le=await O.blob();return ce(`Active video full fetch complete: ${le.size} bytes`,{videoUrl:Ue(f),blobType:le.type}),{src:URL.createObjectURL(le),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(O){je(`Full-fetch FAILED; falling back to progressive: ${O instanceof Error?O.message:String(O)}`,{videoUrl:f})}}return A!==null?ce("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:f,contentLength:A,fullFetchMaxBytes:Ks}):ce("Could not determine active video size; using progressive load",{videoUrl:f}),ce("Using progressive active video load",{videoUrl:f}),{src:Ue(f),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function sa(f){try{const w=await Ye(f,{headers:{Range:"bytes=0-0"}});ce("Probed active video size with range request",{videoUrl:f,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const A=aa(w.headers.get("Content-Length"));if(A!==null)return A;const O=ia(w.headers.get("Content-Range"));return O!==null?O:null}catch(w){return je("Could not probe active video size",{videoUrl:f,error:w instanceof Error?w.message:String(w)}),null}}function ia(f){if(!f)return null;const w=f.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const A=Number(w[1]);return Number.isFinite(A)&&A>0?A:null}function aa(f){if(!f)return null;const w=Number(f);return Number.isFinite(w)?w:null}function Qe(f){if(n.dataset.mode=f,f==="entry"?document.documentElement.setAttribute("data-theme","glass"):f==="display"&&Pn(o),Et(S,f==="display"||f==="config"),Et(R,f==="display"||f==="entry"),Et(U,!t.lockedScaleId&&(f==="entry"||f==="config"||f==="display")),f==="entry"?_e(U):bn(U),f==="entry"&&!t.lockedScaleId?C.show():C.hide(),f==="config"?(ie.hide(),$.setSimulation(r,Ce()),$.show()):$.hide(),f!=="display")K.hide();else if(l){const A=y.captureFrame();K.update(r,Ce(),y.getDurationSeconds(),c,A),K.show()}!N||f==="initializing"?(y.hideMedia(),f==="initializing"&&y.pause()):y.showMedia(),f!=="initializing"&&ie.hide(),Sn(),Le()}function Sn(){if(n.dataset.mode==="entry"){Et(x,!0);return}const f=n.dataset.mode==="display",w=r.id==="galaxy";Et(x,f&&w)}function Xe(f=0){const w=hl(v,f,y.getDurationSeconds()),A=ua(r,c,f,y.getDurationSeconds());be.update(r,Ce(),{...w,...A})}function kn(f){const w=r.views.filter(le=>{var ue;return((ue=g==null?void 0:g.views)==null?void 0:ue[le.id])!==void 0});if(w.length<=1){re.hide(),J.classList.add("is-hidden");return}const A=f??at(r,g),O=w.find(le=>le.id===A);re.update(w,A),O?(J.classList.remove("is-hidden"),J.innerHTML=`<span class="viewport-title">${O.label??O.id}</span>`):J.classList.add("is-hidden")}function En(f={}){f.preserveRunRequest||a.invalidate(),v=tn,l=!1,c=null,g=null,_=0,ne=!1,H=null,me(),B!==null&&(cancelAnimationFrame(B),B=null),K.hide(),re.hide(),y.pause(),k.pause(),y.clearPrewarmedSources(),y.resetPlayback(),T.setPosition(0),vs()}function ys(f){if(!(g!=null&&g.views)||f===at(r,g))return;const w=Ue(g.views[f]);if(!w)return;g.viewId=f;const A=!y.isPaused()&&!l,O=l?0:y.getPlaybackFraction();l=!1,K.hide(),y.setSource(w,{seekFraction:O,autoplay:A}),y.prewarmSources(ve()),A&&!ne?Ve():he(),kn(f),Lt(),Le(),D.classList.remove("is-visible"),Sn()}function Ce(){return{...E[r.id]}}function ra(f){return Object.fromEntries(f.parameters.map(w=>[w.id,oa(w)]))}function oa(f){if(f.logScale){const ue=Math.log10(f.min),Se=Math.log10(f.max);return 10**(ue+Math.random()*(Se-ue))}const w=Math.max(0,Math.round((f.max-f.min)/f.step)),A=Math.floor(Math.random()*(w+1)),O=f.min+A*f.step,le=Pi(f.step);return Number(O.toFixed(le))}async function la(f,w){let A=tn;try{A=await fl(f)}catch(O){je("Failed to load live stats",{url:f,error:O instanceof Error?O.message:String(O)})}a.isCurrent(w)&&(v=A,Xe())}async function ca(f,w){const A=await tl(f);a.isCurrent(w)&&(c=A,Xe(_))}function ua(f,w,A,O){if(!w||!Number.isFinite(O)||O<=0)return{};const le=Math.max(0,Math.min(1,A/O)),ue={};for(const Se of f.metadata.liveStats){if(!Se.live||!Se.fromVideo||!Se.scaleWithTime)continue;const qt=Se.videoKey??Se.id,Nt=w[qt];if(typeof Nt!="number"||!Number.isFinite(Nt))continue;const Ln=Nt*le;ue[Se.id]=Se.integer?String(Math.floor(Ln)):String(Ln)}return ue}function Et(f,w){f.hidden=!w,f.classList.toggle("is-hidden",!w)}function at(f,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function da(f,w){return!w||!f.views?null:f.views[w]??null}function bs(){const f=at(r,g);return f?r.views.some(w=>w.id===f&&w.audio):!1}function fa(f){return f.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function ha(f,w){const A=fa(f),O=Ue(A);if(p.has(O)){ws(O);return}const le=++b,ue=await ma(A);if(!(!a.isCurrent(w)||le!==b)){if(!ue){vs();return}p.add(O),ws(O)}}function ws(f){u=f,d=!0,k.src!==u&&(k.pause(),k.src=u,k.load()),Lt(),Le()}async function ma(f){try{if((await Ye(f,{method:"HEAD"})).ok)return!0}catch{}try{return(await Ye(f,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function vs(){b+=1,u=null,d=!1,k.pause(),k.removeAttribute("src"),k.load(),Lt()}function pa(){m=t.audioMutedByDefault,h=t.defaultAudioVolume,k.muted=m,k.volume=h,T.setMuted(m)}function Lt(){T.setAudioVisible(bs()&&d&&!!u),T.setMuted(m)}function rt(f=!1){if(!d||!Number.isFinite(k.duration)||k.duration<=0)return;const w=Math.max(0,Math.min(k.duration,y.getPlaybackFraction()*k.duration));(f||Math.abs(k.currentTime-w)>.35)&&(k.currentTime=w)}function Le(){const f=bs()&&d&&!!u;if(Lt(),k.muted=m,k.volume=h,!f){k.pause();return}if(rt(),n.dataset.mode!=="display"||y.isPaused()||l||ne){k.pause();return}k.play().catch(()=>{m=!0,k.muted=!0,T.setMuted(!0)})}function _s(f){const w=new Set(Uo(f,e));return ct.filter(A=>w.has(A.id))}function Ss(f){return f?ct.find(w=>w.id===f)??null:null}function ga(){return i.getSource()!=="local"?Jn.MIN_TERMINAL_TIME_MS:ya(Jn.MIN_TERMINAL_TIME_MS,El)}function ya(f,w){const A=Math.ceil(Math.min(f,w)),O=Math.floor(Math.max(f,w));return Math.floor(Math.random()*(O-A+1))+A}function ba(f){const w=r.id,A=t.manifestSource;t=Bo(f,e),js(t.verboseLogging),s=_s(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),te.setHomeVisible(!t.lockedScaleId),K.setHomeVisible(!t.lockedScaleId),C.setSimulationClasses(s),$.setAdvancedSettings(t),ce("Advanced settings updated",t),pa(),Le(),A!==t.manifestSource&&(g=null);const O=Ss(t.lockedScaleId);O&&(ps(O),O.id!==w&&(N=!1,y.hideMedia(),$.setView("parameters")),N||(vn(Hn[O.id]),$.setSimulation(r,Ce())))}}function Cl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Il(n)}Cl();
//# sourceMappingURL=main-Ck9y0nQr.js.map
