(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const pn=Symbol.for("yaml.alias"),rn=Symbol.for("yaml.document"),Ce=Symbol.for("yaml.map"),Qn=Symbol.for("yaml.pair"),Se=Symbol.for("yaml.scalar"),Xe=Symbol.for("yaml.seq"),fe=Symbol.for("yaml.node.type"),Fe=n=>!!n&&typeof n=="object"&&n[fe]===pn,Ot=n=>!!n&&typeof n=="object"&&n[fe]===rn,ht=n=>!!n&&typeof n=="object"&&n[fe]===Ce,z=n=>!!n&&typeof n=="object"&&n[fe]===Qn,W=n=>!!n&&typeof n=="object"&&n[fe]===Se,mt=n=>!!n&&typeof n=="object"&&n[fe]===Xe;function Y(n){if(n&&typeof n=="object")switch(n[fe]){case Ce:case Xe:return!0}return!1}function J(n){if(n&&typeof n=="object")switch(n[fe]){case pn:case Ce:case Se:case Xe:return!0}return!1}const Xn=n=>(W(n)||Y(n))&&!!n.anchor,Pe=Symbol("break visit"),ui=Symbol("skip children"),lt=Symbol("remove node");function Ze(n,e){const t=di(e);Ot(n)?qe(null,n.contents,t,Object.freeze([n]))===lt&&(n.contents=null):qe(null,n,t,Object.freeze([]))}Ze.BREAK=Pe;Ze.SKIP=ui;Ze.REMOVE=lt;function qe(n,e,t,s){const i=fi(n,e,t,s);if(J(i)||z(i))return hi(n,s,i),qe(n,i,t,s);if(typeof i!="symbol"){if(Y(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=qe(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Pe)return Pe;r===lt&&(e.items.splice(a,1),a-=1)}}}else if(z(e)){s=Object.freeze(s.concat(e));const a=qe("key",e.key,t,s);if(a===Pe)return Pe;a===lt&&(e.key=null);const r=qe("value",e.value,t,s);if(r===Pe)return Pe;r===lt&&(e.value=null)}}return i}function di(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function fi(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(ht(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(mt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(z(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(W(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(Fe(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function hi(n,e,t){const s=e[e.length-1];if(Y(s))s.items[n]=t;else if(z(s))n==="key"?s.key=t:s.value=t;else if(Ot(s))s.contents=t;else{const i=Fe(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const mi={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},pi=n=>n.replace(/[!,[\]{}]/g,e=>mi[e]);class ae{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},ae.defaultYaml,e),this.tags=Object.assign({},ae.defaultTags,t)}clone(){const e=new ae(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new ae(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:ae.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},ae.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:ae.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},ae.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+pi(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&J(e.contents)){const a={};Ze(e.contents,(r,o)=>{J(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}ae.defaultYaml={explicit:!1,version:"1.2"};ae.defaultTags={"!!":"tag:yaml.org,2002:"};function Zn(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function es(n){const e=new Set;return Ze(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function ts(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function gi(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=es(n));const r=ts(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(W(r.node)||Y(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function We(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=We(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=We(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=We(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=We(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function de(n,e,t){if(Array.isArray(n))return n.map((s,i)=>de(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Xn(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class gn{constructor(e){Object.defineProperty(this,fe,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Ot(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=de(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?We(a,{"":o},"",o):o}}class yn extends gn{constructor(e){super(pn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],Ze(e,{Node:(a,r)=>{(Fe(r)||Xn(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(de(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Et(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Zn(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Et(n,e,t){if(Fe(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(Y(e)){let s=0;for(const i of e.items){const a=Et(n,i,t);a>s&&(s=a)}return s}else if(z(e)){const s=Et(n,e.key,t),i=Et(n,e.value,t);return Math.max(s,i)}return 1}const ns=n=>!n||typeof n!="function"&&typeof n!="object";class M extends gn{constructor(e){super(Se),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:de(this.value,e,t)}toString(){return String(this.value)}}M.BLOCK_FOLDED="BLOCK_FOLDED";M.BLOCK_LITERAL="BLOCK_LITERAL";M.PLAIN="PLAIN";M.QUOTE_DOUBLE="QUOTE_DOUBLE";M.QUOTE_SINGLE="QUOTE_SINGLE";const yi="tag:yaml.org,2002:";function bi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function dt(n,e,t){var d,p,g;if(Ot(n)&&(n=n.contents),J(n))return n;if(z(n)){const w=(p=(d=t.schema[Ce]).createNode)==null?void 0:p.call(d,t.schema,null,t);return w.items.push(n),w}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new yn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=yi+e.slice(2));let l=bi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const w=new M(n);return c&&(c.node=w),w}l=n instanceof Map?r[Ce]:Symbol.iterator in Object(n)?r[Xe]:r[Ce]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((g=l==null?void 0:l.nodeClass)==null?void 0:g.from)=="function"?l.nodeClass.from(t.schema,n,t):new M(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function At(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return dt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const at=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class ss extends gn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>J(s)||z(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(at(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(Y(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,At(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(Y(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&W(a)?a.value:a:Y(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!z(t))return!1;const s=t.value;return s==null||e&&W(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return Y(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(Y(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,At(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const wi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function ke(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const xe=(n,e,t)=>n.endsWith(`
`)?ke(t,e):t.includes(`
`)?`
`+ke(t,e):(n.endsWith(" ")?"":" ")+t,is="flow",on="block",Nt="quoted";function Pt(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):d=i-s);let p,g,w=!1,f=-1,m=-1,y=-1;t===on&&(f=$n(n,f,e.length),f!==-1&&(d=f+c));for(let k;k=n[f+=1];){if(t===Nt&&k==="\\"){switch(m=f,n[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}y=f}if(k===`
`)t===on&&(f=$n(n,f,e.length)),d=f+e.length+c,p=void 0;else{if(k===" "&&g&&g!==" "&&g!==`
`&&g!=="	"){const b=n[f+1];b&&b!==" "&&b!==`
`&&b!=="	"&&(p=f)}if(f>=d)if(p)l.push(p),d=p+c,p=void 0;else if(t===Nt){for(;g===" "||g==="	";)g=k,k=n[f+=1],w=!0;const b=f>y+1?f-2:m-1;if(u[b])return n;l.push(b),u[b]=!0,d=b+c,p=void 0}else w=!0}g=k}if(w&&o&&o(),l.length===0)return n;r&&r();let _=n.slice(0,l[0]);for(let k=0;k<l.length;++k){const b=l[k],S=l[k+1]||n.length;b===0?_=`
${e}${n.slice(0,S)}`:(t===Nt&&u[b]&&(_+=`${n[b]}\\`),_+=`
${e}${n.slice(b+1,S)}`)}return _}function $n(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const xt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),$t=n=>/^(%|---|\.\.\.)/m.test(n);function vi(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function ct(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||($t(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:Pt(r,a,Nt,xt(e,!1))}function ln(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ct(n,e);const t=e.indent||($t(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Pt(s,t,is,xt(e,!1))}function Ge(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ct;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=ln:a&&!i?s=ct:s=t?ln:ct}return s(n,e)}let cn;try{cn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{cn=/\n+(?!\n|$)/g}function It({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return Ge(t,s);const l=s.indent||(s.forceBlockIndent||$t(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===M.BLOCK_FOLDED?!1:e===M.BLOCK_LITERAL?!0:!vi(t,c,l.length);if(!t)return u?`|
`:`>
`;let d,p;for(p=t.length;p>0;--p){const S=t[p-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let g=t.substring(p);const w=g.indexOf(`
`);w===-1?d="-":t===g||w!==g.length-1?(d="+",a&&a()):d="",g&&(t=t.slice(0,-g.length),g[g.length-1]===`
`&&(g=g.slice(0,-1)),g=g.replace(cn,`$&${l}`));let f=!1,m,y=-1;for(m=0;m<t.length;++m){const S=t[m];if(S===" ")f=!0;else if(S===`
`)y=m;else break}let _=t.substring(0,y<m?y+1:m);_&&(t=t.substring(_.length),_=_.replace(/\n+/g,`$&${l}`));let b=(f?l?"2":"1":"")+d;if(n&&(b+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let I=!1;const E=xt(s,!0);r!=="folded"&&e!==M.BLOCK_FOLDED&&(E.onOverflow=()=>{I=!0});const N=Pt(`${_}${S}${g}`,l,on,E);if(!I)return`>${b}
${l}${N}`}return t=t.replace(/\n+/g,`$&${l}`),`|${b}
${l}${_}${t}${g}`}function Si(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return Ge(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?Ge(a,e):It(n,e,t,s);if(!o&&!u&&i!==M.PLAIN&&a.includes(`
`))return It(n,e,t,s);if($t(a)){if(c==="")return e.forceBlockIndent=!0,It(n,e,t,s);if(o&&c===l)return Ge(a,e)}const d=a.replace(/\n+/g,`$&
${c}`);if(r){const p=f=>{var m;return f.default&&f.tag!=="tag:yaml.org,2002:str"&&((m=f.test)==null?void 0:m.test(d))},{compat:g,tags:w}=e.doc.schema;if(w.some(p)||g!=null&&g.some(p))return Ge(a,e)}return o?d:Pt(d,c,is,xt(e,!1))}function bn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==M.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=M.QUOTE_DOUBLE);const c=u=>{switch(u){case M.BLOCK_FOLDED:case M.BLOCK_LITERAL:return i||a?Ge(r.value,e):It(r,e,t,s);case M.QUOTE_DOUBLE:return ct(r.value,e);case M.QUOTE_SINGLE:return ln(r.value,e);case M.PLAIN:return Si(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:d}=e.options,p=i&&u||d;if(l=c(p),l===null)throw new Error(`Unsupported default string type ${p}`)}return l}function as(n,e){const t=Object.assign({blockQuote:!0,commentString:wi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function _i(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(W(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function ki(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(W(n)||Y(n))&&n.anchor;a&&Zn(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function ze(n,e,t,s){var c;if(z(n))return n.toString(e,t,s);if(Fe(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=J(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=_i(e.doc.schema.tags,a));const r=ki(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):W(a)?bn(a,e,t,s):a.toString(e,t,s);return r?W(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ei({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:d}}=t;let p=J(n)&&n.comment||null;if(d){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(Y(n)||!J(n)&&typeof n=="object"){const E="With simple keys, collection cannot be used as a key value";throw new Error(E)}}let g=!d&&(!n||p&&e==null&&!t.inFlow||Y(n)||(W(n)?n.type===M.BLOCK_FOLDED||n.type===M.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!g&&(d||!a),indent:o+c});let w=!1,f=!1,m=ze(n,t,()=>w=!0,()=>f=!0);if(!g&&!t.inFlow&&m.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");g=!0}if(t.inFlow){if(a||e==null)return w&&s&&s(),m===""?"?":g?`? ${m}`:m}else if(a&&!d||e==null&&g)return m=`? ${m}`,p&&!w?m+=xe(m,t.indent,l(p)):f&&i&&i(),m;w&&(p=null),g?(p&&(m+=xe(m,t.indent,l(p))),m=`? ${m}
${o}:`):(m=`${m}:`,p&&(m+=xe(m,t.indent,l(p))));let y,_,k;J(e)?(y=!!e.spaceBefore,_=e.commentBefore,k=e.comment):(y=!1,_=null,k=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!g&&!p&&W(e)&&(t.indentAtStart=m.length+1),f=!1,!u&&c.length>=2&&!t.inFlow&&!g&&mt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let b=!1;const S=ze(e,t,()=>b=!0,()=>f=!0);let I=" ";if(p||y||_){if(I=y?`
`:"",_){const E=l(_);I+=`
${ke(E,t.indent)}`}S===""&&!t.inFlow?I===`
`&&k&&(I=`

`):I+=`
${t.indent}`}else if(!g&&Y(e)){const E=S[0],N=S.indexOf(`
`),T=N!==-1,$=t.inFlow??e.flow??e.items.length===0;if(T||!$){let R=!1;if(T&&(E==="&"||E==="!")){let B=S.indexOf(" ");E==="&"&&B!==-1&&B<N&&S[B+1]==="!"&&(B=S.indexOf(" ",B+1)),(B===-1||N<B)&&(R=!0)}R||(I=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(I="");return m+=I+S,t.inFlow?b&&s&&s():k&&!b?m+=xe(m,t.indent,l(k)):f&&i&&i(),m}function rs(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const bt="<<",Ne={identify:n=>n===bt||typeof n=="symbol"&&n.description===bt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new M(Symbol(bt)),{addToJSMap:os}),stringify:()=>bt},Ni=(n,e)=>(Ne.identify(e)||W(e)&&(!e.type||e.type===M.PLAIN)&&Ne.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Ne.tag&&t.default));function os(n,e,t){if(t=n&&Fe(t)?t.resolve(n.doc):t,mt(t))for(const s of t.items)Gt(n,e,s);else if(Array.isArray(t))for(const s of t)Gt(n,e,s);else Gt(n,e,t)}function Gt(n,e,t){const s=n&&Fe(t)?t.resolve(n.doc):t;if(!ht(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function ls(n,e,{key:t,value:s}){if(J(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ni(n,t))os(n,e,s);else{const i=de(t,"",n);if(e instanceof Map)e.set(i,de(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Ii(t,i,n),r=de(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Ii(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(J(n)&&(t!=null&&t.doc)){const s=as(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),rs(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function wn(n,e,t){const s=dt(n,void 0,t),i=dt(e,void 0,t);return new re(s,i)}class re{constructor(e,t=null){Object.defineProperty(this,fe,{value:Qn}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return J(t)&&(t=t.clone(e)),J(s)&&(s=s.clone(e)),new re(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return ls(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ei(this,e,t,s):JSON.stringify(this)}}function cs(n,e,t){return(e.inFlow??n.flow?Ai:Li)(n,e,t)}function Li({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const p=[];for(let w=0;w<e.length;++w){const f=e[w];let m=null;if(J(f))!d&&f.spaceBefore&&p.push(""),Tt(t,p,f.commentBefore,d),f.comment&&(m=f.comment);else if(z(f)){const _=J(f.key)?f.key:null;_&&(!d&&_.spaceBefore&&p.push(""),Tt(t,p,_.commentBefore,d))}d=!1;let y=ze(f,u,()=>m=null,()=>d=!0);m&&(y+=xe(y,a,l(m))),d&&m&&(d=!1),p.push(s+y)}let g;if(p.length===0)g=i.start+i.end;else{g=p[0];for(let w=1;w<p.length;++w){const f=p[w];g+=f?`
${c}${f}`:`
`}}return n?(g+=`
`+ke(l(n),c),o&&o()):d&&r&&r(),g}function Ai({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const d=[];for(let w=0;w<n.length;++w){const f=n[w];let m=null;if(J(f))f.spaceBefore&&d.push(""),Tt(e,d,f.commentBefore,!1),f.comment&&(m=f.comment);else if(z(f)){const _=J(f.key)?f.key:null;_&&(_.spaceBefore&&d.push(""),Tt(e,d,_.commentBefore,!1),_.comment&&(l=!0));const k=J(f.value)?f.value:null;k?(k.comment&&(m=k.comment),k.commentBefore&&(l=!0)):f.value==null&&(_!=null&&_.comment)&&(m=_.comment)}m&&(l=!0);let y=ze(f,c,()=>m=null);l||(l=d.length>u||y.includes(`
`)),w<n.length-1?y+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=d.reduce((_,k)=>_+k.length+2,2)+(y.length+2)>e.options.lineWidth)),l&&(y+=",")),m&&(y+=xe(y,s,o(m))),d.push(y),u=d.length}const{start:p,end:g}=t;if(d.length===0)return p+g;if(!l){const w=d.reduce((f,m)=>f+m.length+2,2);l=e.options.lineWidth>0&&w>e.options.lineWidth}if(l){let w=p;for(const f of d)w+=f?`
${a}${i}${f}`:`
`;return`${w}
${i}${g}`}else return`${p}${r}${d.join(" ")}${r}${g}`}function Tt({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=ke(e(s),n);t.push(a.trimStart())}}function $e(n,e){const t=W(e)?e.value:e;for(const s of n)if(z(s)&&(s.key===e||s.key===t||W(s.key)&&s.key.value===t))return s}class ue extends ss{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Ce,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(wn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;z(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new re(e,e==null?void 0:e.value):s=new re(e.key,e.value);const i=$e(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);W(i.value)&&ns(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=$e(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=$e(this.items,e),i=s==null?void 0:s.value;return(!t&&W(i)?i.value:i)??void 0}has(e){return!!$e(this.items,e)}set(e,t){this.add(new re(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)ls(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!z(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),cs(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const et={collection:"map",default:!0,nodeClass:ue,tag:"tag:yaml.org,2002:map",resolve(n,e){return ht(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>ue.from(n,e,t)};class Re extends ss{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Xe,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=wt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=wt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&W(i)?i.value:i}has(e){const t=wt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=wt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];W(i)&&ns(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(de(a,String(i++),t));return s}toString(e,t,s){return e?cs(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(dt(o,void 0,s))}}return a}}function wt(n){let e=W(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const tt={collection:"seq",default:!0,nodeClass:Re,tag:"tag:yaml.org,2002:seq",resolve(n,e){return mt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Re.from(n,e,t)},Rt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),bn(n,e,t,s)}},Ft={identify:n=>n==null,createNode:()=>new M(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new M(null),stringify:({source:n},e)=>typeof n=="string"&&Ft.test.test(n)?n:e.options.nullStr},vn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new M(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&vn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function be({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const us={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:be},ds={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():be(n)}},fs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new M(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:be},Bt=n=>typeof n=="bigint"||Number.isInteger(n),Sn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function hs(n,e,t){const{value:s}=n;return Bt(s)&&s>=0?t+s.toString(e):be(n)}const ms={identify:n=>Bt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Sn(n,2,8,t),stringify:n=>hs(n,8,"0o")},ps={identify:Bt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Sn(n,0,10,t),stringify:be},gs={identify:n=>Bt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Sn(n,2,16,t),stringify:n=>hs(n,16,"0x")},Ti=[et,tt,Rt,Ft,vn,ms,ps,gs,us,ds,fs];function Rn(n){return typeof n=="bigint"||Number.isInteger(n)}const vt=({value:n})=>JSON.stringify(n),Ci=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:vt},{identify:n=>n==null,createNode:()=>new M(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:vt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:vt},{identify:Rn,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Rn(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:vt}],Mi={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Oi=[et,tt].concat(Ci,Mi),_n={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=M.BLOCK_LITERAL),e!==M.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let d=0,p=0;d<l;++d,p+=c)u[d]=o.substr(p,c);o=u.join(e===M.BLOCK_LITERAL?`
`:" ")}return bn({comment:n,type:e,value:o},s,i,a)}};function ys(n,e){if(mt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!z(s)){if(ht(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new re(new M(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=z(s)?s:new re(s)}}else e("Expected a sequence for this tag");return n}function bs(n,e,t){const{replacer:s}=t,i=new Re(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(wn(o,c,t))}return i}const kn={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ys,createNode:bs};class Ye extends Re{constructor(){super(),this.add=ue.prototype.add.bind(this),this.delete=ue.prototype.delete.bind(this),this.get=ue.prototype.get.bind(this),this.has=ue.prototype.has.bind(this),this.set=ue.prototype.set.bind(this),this.tag=Ye.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(z(i)?(a=de(i.key,"",t),r=de(i.value,a,t)):a=de(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=bs(e,t,s),a=new this;return a.items=i.items,a}}Ye.tag="tag:yaml.org,2002:omap";const En={collection:"seq",identify:n=>n instanceof Map,nodeClass:Ye,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=ys(n,e),s=[];for(const{key:i}of t.items)W(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new Ye,t)},createNode:(n,e,t)=>Ye.from(n,e,t)};function ws({value:n,source:e},t){return e&&(n?vs:Ss).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const vs={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new M(!0),stringify:ws},Ss={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new M(!1),stringify:ws},Pi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:be},xi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():be(n)}},$i={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new M(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:be},pt=n=>typeof n=="bigint"||Number.isInteger(n);function Vt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function Nn(n,e,t){const{value:s}=n;if(pt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return be(n)}const Ri={identify:pt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Vt(n,2,2,t),stringify:n=>Nn(n,2,"0b")},Fi={identify:pt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Vt(n,1,8,t),stringify:n=>Nn(n,8,"0")},Bi={identify:pt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Vt(n,0,10,t),stringify:be},Vi={identify:pt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Vt(n,2,16,t),stringify:n=>Nn(n,16,"0x")};class Je extends ue{constructor(e){super(e),this.tag=Je.tag}add(e){let t;z(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new re(e.key,null):t=new re(e,null),$e(this.items,t.key)||this.items.push(t)}get(e,t){const s=$e(this.items,e);return!t&&z(s)?W(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=$e(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new re(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(wn(r,null,s));return a}}Je.tag="tag:yaml.org,2002:set";const In={collection:"map",identify:n=>n instanceof Set,nodeClass:Je,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>Je.from(n,e,t),resolve(n,e){if(ht(n)){if(n.hasAllNullValues(!0))return Object.assign(new Je,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function Ln(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function _s(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return be(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const ks={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Ln(n,t),stringify:_s},Es={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Ln(n,!1),stringify:_s},Dt={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Dt.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let d=Ln(u,!1);Math.abs(d)<30&&(d*=60),l-=6e4*d}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Fn=[et,tt,Rt,Ft,vs,Ss,Ri,Fi,Bi,Vi,Pi,xi,$i,_n,Ne,En,kn,In,ks,Es,Dt],Bn=new Map([["core",Ti],["failsafe",[et,tt,Rt]],["json",Oi],["yaml11",Fn],["yaml-1.1",Fn]]),Vn={binary:_n,bool:vn,float:fs,floatExp:ds,floatNaN:us,floatTime:Es,int:ps,intHex:gs,intOct:ms,intTime:ks,map:et,merge:Ne,null:Ft,omap:En,pairs:kn,seq:tt,set:In,timestamp:Dt},Di={"tag:yaml.org,2002:binary":_n,"tag:yaml.org,2002:merge":Ne,"tag:yaml.org,2002:omap":En,"tag:yaml.org,2002:pairs":kn,"tag:yaml.org,2002:set":In,"tag:yaml.org,2002:timestamp":Dt};function Yt(n,e,t){const s=Bn.get(e);if(s&&!n)return t&&!s.includes(Ne)?s.concat(Ne):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Bn.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Ne)),i.reduce((a,r)=>{const o=typeof r=="string"?Vn[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(Vn).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const Ui=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class An{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Yt(e,"compat"):e?Yt(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?Di:{},this.tags=Yt(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,Ce,{value:et}),Object.defineProperty(this,Se,{value:Rt}),Object.defineProperty(this,Xe,{value:tt}),this.sortMapEntries=typeof r=="function"?r:r===!0?Ui:null}clone(){const e=Object.create(An.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Hi(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=as(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(ke(l,""))}let r=!1,o=null;if(n.contents){if(J(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(ke(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=ze(n.contents,i,()=>o=null,l);o&&(u+=xe(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(ze(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(ke(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(ke(a(l),"")))}return t.join(`
`)+`
`}class Ut{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,fe,{value:rn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new ae({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Ut.prototype,{[fe]:{value:rn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=J(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){De(this.contents)&&this.contents.add(e)}addIn(e,t){De(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=es(this);e.anchor=!t||s.has(t)?ts(t||"a",s):t}return new yn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const m=_=>typeof _=="number"||_ instanceof String||_ instanceof Number,y=t.filter(m).map(String);y.length>0&&(t=t.concat(y)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:d,setAnchors:p,sourceObjects:g}=gi(this,r||"a"),w={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:d,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:g},f=dt(e,u,w);return o&&Y(f)&&(f.flow=!0),p(),f}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new re(i,a)}delete(e){return De(this.contents)?this.contents.delete(e):!1}deleteIn(e){return at(e)?this.contents==null?!1:(this.contents=null,!0):De(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return Y(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return at(e)?!t&&W(this.contents)?this.contents.value:this.contents:Y(this.contents)?this.contents.getIn(e,t):void 0}has(e){return Y(this.contents)?this.contents.has(e):!1}hasIn(e){return at(e)?this.contents!==void 0:Y(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=At(this.schema,[e],t):De(this.contents)&&this.contents.set(e,t)}setIn(e,t){at(e)?this.contents=t:this.contents==null?this.contents=At(this.schema,Array.from(e),t):De(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ae({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ae({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new An(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=de(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?We(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Hi(this,e)}}function De(n){if(Y(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Ns extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class rt extends Ns{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class ji extends Ns{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Dn=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function Qe(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,d="",p="",g=!1,w=!1,f=null,m=null,y=null,_=null,k=null,b=null,S=null;for(const N of n)switch(w&&(N.type!=="space"&&N.type!=="newline"&&N.type!=="comma"&&a(N.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),w=!1),f&&(l&&N.type!=="comment"&&N.type!=="newline"&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),f=null),N.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&N.source.includes("	")&&(f=N),u=!0;break;case"comment":{u||a(N,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const T=N.source.substring(1)||" ";d?d+=p+T:d=T,p="",l=!1;break}case"newline":l?d?d+=N.source:(!b||t!=="seq-item-ind")&&(c=!0):p+=N.source,l=!0,g=!0,(m||y)&&(_=N),u=!0;break;case"anchor":m&&a(N,"MULTIPLE_ANCHORS","A node can have at most one anchor"),N.source.endsWith(":")&&a(N.offset+N.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),m=N,S??(S=N.offset),l=!1,u=!1,w=!0;break;case"tag":{y&&a(N,"MULTIPLE_TAGS","A node can have at most one tag"),y=N,S??(S=N.offset),l=!1,u=!1,w=!0;break}case t:(m||y)&&a(N,"BAD_PROP_ORDER",`Anchors and tags must be after the ${N.source} indicator`),b&&a(N,"UNEXPECTED_TOKEN",`Unexpected ${N.source} in ${e??"collection"}`),b=N,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){k&&a(N,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=N,l=!1,u=!1;break}default:a(N,"UNEXPECTED_TOKEN",`Unexpected ${N.type} token`),l=!1,u=!1}const I=n[n.length-1],E=I?I.offset+I.source.length:i;return w&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f&&(l&&f.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:b,spaceBefore:c,comment:d,hasNewline:g,anchor:m,tag:y,newlineAfterProp:_,end:E,start:S??E}}function ft(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ft(e.key)||ft(e.value))return!0}return!1;default:return!0}}function un(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ft(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Is(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||W(a)&&W(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Un="All mapping items must start at the same column";function Ki({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??ue,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const d of s.items){const{start:p,key:g,sep:w,value:f}=d,m=Qe(p,{indicator:"explicit-key-ind",next:g??(w==null?void 0:w[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),y=!m.found;if(y){if(g&&(g.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in g&&g.indent!==s.indent&&i(c,"BAD_INDENT",Un)),!m.anchor&&!m.tag&&!w){l=m.end,m.comment&&(o.comment?o.comment+=`
`+m.comment:o.comment=m.comment);continue}(m.newlineAfterProp||ft(g))&&i(g??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=m.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",Un);t.atKey=!0;const _=m.end,k=g?n(t,g,m,i):e(t,_,p,null,m,i);t.schema.compat&&un(s.indent,g,i),t.atKey=!1,Is(t,o.items,k)&&i(_,"DUPLICATE_KEY","Map keys must be unique");const b=Qe(w??[],{indicator:"map-value-ind",next:f,offset:k.range[2],onError:i,parentIndent:s.indent,startOnNewline:!g||g.type==="block-scalar"});if(c=b.end,b.found){y&&((f==null?void 0:f.type)==="block-map"&&!b.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&m.start<b.found.offset-1024&&i(k.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const S=f?n(t,f,b,i):e(t,c,w,null,b,i);t.schema.compat&&un(s.indent,f,i),c=S.range[2];const I=new re(k,S);t.options.keepSourceTokens&&(I.srcToken=d),o.items.push(I)}else{y&&i(k.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),b.comment&&(k.comment?k.comment+=`
`+b.comment:k.comment=b.comment);const S=new re(k);t.options.keepSourceTokens&&(S.srcToken=d),o.items.push(S)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function qi({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Re,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:d}of s.items){const p=Qe(u,{indicator:"seq-item-ind",next:d,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||d)(d==null?void 0:d.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=p.end,p.comment&&(o.comment=p.comment);continue}const g=d?n(t,d,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&un(s.indent,d,i),c=g.range[2],o.items.push(g)}return o.range=[s.offset,c,l??c],o}function gt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const Jt="Block collections are not allowed within flow collections",zt=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Wi({composeNode:n,composeEmptyNode:e},t,s,i,a){var m;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?ue:Re),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let y=0;y<s.items.length;++y){const _=s.items[y],{start:k,key:b,sep:S,value:I}=_,E=Qe(k,{flow:o,indicator:"explicit-key-ind",next:b??(S==null?void 0:S[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!E.found){if(!E.anchor&&!E.tag&&!S&&!I){y===0&&E.comma?i(E.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):y<s.items.length-1&&i(E.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),E.comment&&(l.comment?l.comment+=`
`+E.comment:l.comment=E.comment),d=E.end;continue}!r&&t.options.strict&&ft(b)&&i(b,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(y===0)E.comma&&i(E.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(E.comma||i(E.start,"MISSING_CHAR",`Missing , between ${o} items`),E.comment){let N="";e:for(const T of k)switch(T.type){case"comma":case"space":break;case"comment":N=T.source.substring(1);break e;default:break e}if(N){let T=l.items[l.items.length-1];z(T)&&(T=T.value??T.key),T.comment?T.comment+=`
`+N:T.comment=N,E.comment=E.comment.substring(N.length+1)}}if(!r&&!S&&!E.found){const N=I?n(t,I,E,i):e(t,E.end,S,null,E,i);l.items.push(N),d=N.range[2],zt(I)&&i(N.range,"BLOCK_IN_FLOW",Jt)}else{t.atKey=!0;const N=E.end,T=b?n(t,b,E,i):e(t,N,k,null,E,i);zt(b)&&i(T.range,"BLOCK_IN_FLOW",Jt),t.atKey=!1;const $=Qe(S??[],{flow:o,indicator:"map-value-ind",next:I,offset:T.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if($.found){if(!r&&!E.found&&t.options.strict){if(S)for(const D of S){if(D===$.found)break;if(D.type==="newline"){i(D,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}E.start<$.found.offset-1024&&i($.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else I&&("source"in I&&((m=I.source)==null?void 0:m[0])===":"?i(I,"MISSING_CHAR",`Missing space after : in ${o}`):i($.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const R=I?n(t,I,$,i):$.found?e(t,$.end,S,null,$,i):null;R?zt(I)&&i(R.range,"BLOCK_IN_FLOW",Jt):$.comment&&(T.comment?T.comment+=`
`+$.comment:T.comment=$.comment);const B=new re(T,R);if(t.options.keepSourceTokens&&(B.srcToken=_),r){const D=l;Is(t,D.items,T)&&i(N,"DUPLICATE_KEY","Map keys must be unique"),D.items.push(B)}else{const D=new ue(t.schema);D.flow=!0,D.items.push(B);const G=(R??T).range;D.range=[T.range[0],G[1],G[2]],l.items.push(D)}d=R?R.range[2]:$.end}}const p=r?"}":"]",[g,...w]=s.end;let f=d;if((g==null?void 0:g.source)===p)f=g.offset+g.source.length;else{const y=o[0].toUpperCase()+o.substring(1),_=u?`${y} must end with a ${p}`:`${y} in block collection must be sufficiently indented and end with a ${p}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",_),g&&g.source.length!==1&&w.unshift(g)}if(w.length>0){const y=gt(w,f,t.options.strict,i);y.comment&&(l.comment?l.comment+=`
`+y.comment:l.comment=y.comment),l.range=[s.offset,f,y.offset]}else l.range=[s.offset,f,f];return l}function Qt(n,e,t,s,i,a){const r=t.type==="block-map"?Ki(n,e,t,s,a):t.type==="block-seq"?qi(n,e,t,s,a):Wi(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function Gi(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,g=>i(a,"TAG_RESOLVE_FAILED",g)):null;if(t.type==="block-seq"){const{anchor:g,newlineAfterProp:w}=s,f=g&&a?g.offset>a.offset?g:a:g??a;f&&(!w||w.offset<f.offset)&&i(f,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===ue.tagName&&o==="map"||r===Re.tagName&&o==="seq")return Qt(n,e,t,i,r);let c=e.schema.tags.find(g=>g.tag===r&&g.collection===o);if(!c){const g=e.schema.knownTags[r];if((g==null?void 0:g.collection)===o)e.schema.tags.push(Object.assign({},g,{default:!1})),c=g;else return g?i(a,"BAD_COLLECTION_TYPE",`${g.tag} used for ${o} collection, but expects ${g.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Qt(n,e,t,i,r)}const l=Qt(n,e,t,i,r,c),u=((p=c.resolve)==null?void 0:p.call(c,l,g=>i(a,"TAG_RESOLVE_FAILED",g),e.options))??l,d=J(u)?u:new M(u);return d.range=l.range,d.tag=r,c!=null&&c.format&&(d.format=c.format),d}function Yi(n,e,t){const s=e.offset,i=Ji(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?M.BLOCK_FOLDED:M.BLOCK_LITERAL,r=e.source?zi(e.source):[];let o=r.length;for(let f=r.length-1;f>=0;--f){const m=r[f][1];if(m===""||m==="\r")o=f;else break}if(o===0){const f=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let m=s+i.length;return e.source&&(m+=e.source.length),{value:f,type:a,comment:i.comment,range:[s,m,m]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let f=0;f<o;++f){const[m,y]=r[f];if(y===""||y==="\r")i.indent===0&&m.length>c&&(c=m.length);else{m.length<c&&t(l+m.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=m.length),u=f,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=m.length+y.length+1}for(let f=r.length-1;f>=o;--f)r[f][0].length>c&&(o=f+1);let d="",p="",g=!1;for(let f=0;f<u;++f)d+=r[f][0].slice(c)+`
`;for(let f=u;f<o;++f){let[m,y]=r[f];l+=m.length+y.length+1;const _=y[y.length-1]==="\r";if(_&&(y=y.slice(0,-1)),y&&m.length<c){const b=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-y.length-(_?2:1),"BAD_INDENT",b),m=""}a===M.BLOCK_LITERAL?(d+=p+m.slice(c)+y,p=`
`):m.length>c||y[0]==="	"?(p===" "?p=`
`:!g&&p===`
`&&(p=`

`),d+=p+m.slice(c)+y,p=`
`,g=!0):y===""?p===`
`?d+=`
`:p=`
`:(d+=p+y,p=" ",g=!1)}switch(i.chomp){case"-":break;case"+":for(let f=o;f<r.length;++f)d+=`
`+r[f][0].slice(c);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const w=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,w,w]}}function Ji({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let p=1;p<i.length;++p){const g=i[p];if(!o&&(g==="-"||g==="+"))o=g;else{const w=Number(g);!r&&w?r=w:c===-1&&(c=n+p)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",d=i.length;for(let p=1;p<e.length;++p){const g=e[p];switch(g.type){case"space":l=!0;case"newline":d+=g.source.length;break;case"comment":t&&!l&&s(g,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=g.source.length,u=g.source.substring(1);break;case"error":s(g,"UNEXPECTED_TOKEN",g.message),d+=g.source.length;break;default:{const w=`Unexpected token in block scalar header: ${g.type}`;s(g,"UNEXPECTED_TOKEN",w);const f=g.source;f&&typeof f=="string"&&(d+=f.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function zi(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function Qi(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(p,g,w)=>t(s+p,g,w);switch(i){case"scalar":o=M.PLAIN,c=Xi(a,l);break;case"single-quoted-scalar":o=M.QUOTE_SINGLE,c=Zi(a,l);break;case"double-quoted-scalar":o=M.QUOTE_DOUBLE,c=ea(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=gt(r,u,e,t);return{value:c,type:o,comment:d.comment,range:[s,u,d.offset]}}function Xi(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Ls(n)}function Zi(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Ls(n.slice(1,-1)).replace(/''/g,"'")}function Ls(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function ea(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=ta(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=na[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=sa(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function ta(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const na={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function sa(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function As(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?Yi(n,e,s):Qi(e,n.options.strict,s),c=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[Se]:c?l=ia(n.schema,i,c,t,s):e.type==="scalar"?l=aa(n,i,e,s):l=n.schema[Se];let u;try{const d=l.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=W(d)?d:new M(d)}catch(d){const p=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",p),u=new M(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function ia(n,e,t,s,i){var o;if(t==="!")return n[Se];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Se])}function aa({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[Se];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[Se];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function ra(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const oa={composeNode:Ts,composeEmptyNode:Tn};function Ts(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=la(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=As(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=Gi(oa,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(d){const p=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return l??(l=Tn(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!W(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function Tn(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:ra(e,t,s),indent:-1,source:""},d=As(n,u,o,l);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=c),d}function la({options:n},{offset:e,source:t,end:s},i){const a=new yn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=gt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function ca(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new Ut(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=Qe(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Ts(l,i,u,r):Tn(l,u.end,s,null,u,r);const d=c.contents.range[2],p=gt(a,d,!1,r);return p.comment&&(c.comment=p.comment),c.range=[t,d,p.offset],c}function nt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Hn(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class ua{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=nt(t);a?this.warnings.push(new ji(r,s,i)):this.errors.push(new rt(r,s,i))},this.directives=new ae({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Hn(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(Y(a)&&!a.flow&&a.items.length>0){let r=a.items[0];z(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Hn(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=nt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=ca(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new rt(nt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new rt(nt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=gt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new rt(nt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Ut(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Cs="\uFEFF",Ms="",Os="",dn="";function da(n){switch(n){case Cs:return"byte-order-mark";case Ms:return"doc-mode";case Os:return"flow-error-end";case dn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function ye(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const jn=new Set("0123456789ABCDEFabcdef"),fa=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),St=new Set(",[]{}"),ha=new Set(` ,[]{}
\r	`),Xt=n=>!n||ha.has(n);class ma{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&ye(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Cs&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Ms,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&ye(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!ye(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&ye(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Xt),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&ye(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Os,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Xt),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||ye(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>ye(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield dn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(ye(a)||e&&St.has(a))break;t=s}else if(ye(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&St.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&St.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield dn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Xt))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(ye(t)||e&&St.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!ye(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(fa.has(t))t=this.buffer[++e];else if(t==="%"&&jn.has(this.buffer[e+1])&&jn.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class pa{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Ae(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Kn(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ps(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function _t(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Ue(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function qn(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Ae(e.start,"explicit-key-ind")&&!Ae(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ps(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class ga{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ma,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=da(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&qn(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Kn(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Kn(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=_t(this.peek(2)),s=Ue(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ae(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ps(t.key)&&!Ae(t.sep,"newline")){const o=Ue(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ae(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=Ue(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ae(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Ae(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Ae(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=_t(s),a=Ue(i);qn(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=_t(e),s=Ue(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=_t(e),s=Ue(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function ya(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new pa||null,prettyErrors:e}}function ba(n,e={}){const{lineCounter:t,prettyErrors:s}=ya(e),i=new ga(t==null?void 0:t.addNewLine),a=new ua(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new rt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Dn(n,t)),r.warnings.forEach(Dn(n,t))),r}function Ie(n,e,t){let s;const i=ba(n,t);if(!i)return null;if(i.warnings.forEach(a=>rs(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const wa=`# Simulation family catalog source-of-truth.
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
`,va=`# Parameter definitions for each simulation family.
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
    log_scale: true
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
    log_scale: true
`,Sa=`# Summary overlay display configuration for each simulation family.
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
`,_a=`# Live telemetry HUD display configuration for each simulation family.
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
`;function Q(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const ka=Ie(wa),Ea=Ie(va),Na=Ie(Sa),Ia=Ie(_a),He=Object.entries(ka).map(([n,e])=>{var a;const t=La(Na[n]),s=((a=Ia[n])==null?void 0:a.liveStats)??[],i=Ea[n]??{};return{id:n,label:e.label,placeholderImage:Q(e.placeholderImage),metadata:{distinctSimulations:e.metadata.distinctSimulations,correctValues:e.metadata.correctValues,summaryStats:t.map(ut),liveStats:s.map(ut)},parameters:Object.entries(i).map(([r,o])=>{const c=o.step??Aa(o.min,o.max),l=o.log_scale?Math.sqrt(o.min*o.max):Ta(o.min,o.max);return{id:r,label:o.label,unit:o.unit??"",min:o.min,max:o.max,step:c,fallbackValue:l,description:o.description,valueScale:o.value_scale,displayUnit:o.display_unit,displayFormat:o.display_format,displaySignificantFigures:o.display_significant_figures,logScale:o.log_scale}}),views:(e.views??[]).map(r=>({id:r.id,label:r.label,icon:r.icon}))}});function La(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push(ut({...t,section:"resources"}));for(const t of n.simulationStats??[])e.push(ut({...t,section:"simulationStats"}));return n.similarityScore&&e.push(ut({id:"similarityScore",value:n.similarityScore.value})),e}function ut(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Aa(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Ta(n,e){return n+(e-n)/2}const xs="universe-engine-theme",$s=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Ca(){const n=localStorage.getItem(xs);return Oa(n)?n:"glass"}function Zt(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(xs,n)}function Ma(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of $s){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function Oa(n){return $s.some(e=>e.id===n)}function Pa(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r;const o=new Map,c=new Map;let l=null,u=null;s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{R(),!(!i||!Number.isFinite(s.duration)||s.duration<=0)&&i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let d=s.playbackRate;function p(){l&&(URL.revokeObjectURL(l),l=null)}function g(L,C={}){const P=c.get(L);P&&(c.delete(L),C={...C,ownedObjectUrl:!0},L=P),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(L)){s.classList.remove("fade-out");return}const V=s.muted,F=C.seekFraction;p(),l=C.ownedObjectUrl?L:null,s.src=L,s.load(),s.onloadeddata=()=>{if(s.muted=V,F!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const U=Math.max(0,Math.min(.999,F));s.currentTime=U*s.duration}else s.currentTime=0;s.playbackRate=d,s.classList.remove("fade-out"),C.autoplay&&s.play().catch(()=>{})}},120)}function w(L){s.muted=L}async function f(){await s.play()}function m(){s.pause()}function y(){s.classList.add("is-empty")}function _(){s.classList.remove("is-empty")}function k(L){if(!Number.isFinite(s.duration)||s.duration<=0)return;const C=Math.max(0,Math.min(1,L));s.currentTime=C*s.duration}function b(){s.currentTime=0,i==null||i(0)}function S(L=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(C=>{const P=()=>{F(),C()},V=window.setTimeout(()=>{F(),C()},Math.max(0,L));function F(){window.clearTimeout(V),s.removeEventListener("loadeddata",P)}s.addEventListener("loadeddata",P,{once:!0})})}function I(L,C=8e3){const P=Math.max(0,L);return P===0||E(P)?Promise.resolve():new Promise(V=>{const F=()=>{E(P)&&(j(),V())},U=window.setTimeout(()=>{j(),V()},Math.max(0,C));function j(){window.clearTimeout(U),s.removeEventListener("progress",F),s.removeEventListener("canplay",F),s.removeEventListener("loadeddata",F)}s.addEventListener("progress",F),s.addEventListener("canplay",F),s.addEventListener("loadeddata",F),F()})}function E(L){const C=s.currentTime;for(let P=0;P<s.buffered.length;P+=1){const V=s.buffered.start(P),F=s.buffered.end(P);if(!(C<V||C>F))return F-C>=L}return!1}function N(L){const C=new Set(L.filter(Boolean).filter(P=>P!==s.currentSrc));for(const[P,V]of o.entries())C.has(P)||(V.removeAttribute("src"),V.load(),o.delete(P));for(const P of C){if(o.has(P))continue;const V=document.createElement("video");V.preload="auto",V.muted=!0,V.playsInline=!0,V.src=P,V.load(),o.set(P,V)}for(const P of C){if(c.has(P))continue;const V=`${P}?_=${Date.now()}`;fetch(V).then(async F=>{if(!F.ok)return;const U=await F.blob();c.set(P,URL.createObjectURL(U))}).catch(()=>{})}}function T(){for(const L of o.values())L.removeAttribute("src"),L.load();o.clear();for(const L of c.values())URL.revokeObjectURL(L);c.clear()}function $(L){return c.get(L)??null}function R(){if(s.readyState<2||s.videoWidth===0||s.videoHeight===0)return;const L=document.createElement("canvas");L.width=s.videoWidth,L.height=s.videoHeight;const C=L.getContext("2d");C&&(C.drawImage(s,0,0,L.width,L.height),u=L.toDataURL("image/jpeg",.85))}function B(){return u||R(),u}function D(L){i=L}function G(L){a=L}return{setSource:g,setMuted:w,play:f,pause:m,hideMedia:y,showMedia:_,seekToFraction:k,resetPlayback:b,waitForLoadedData:S,waitForBufferedAhead:I,onTimeUpdate:D,onEnded:G,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:L=>{d=L,s.playbackRate=L},getPlaybackRate:()=>d,onPlayStateChange:L=>{r=L},getElement:()=>t,prewarmSources:N,clearPrewarmedSources:T,getPrewarmedBlobUrl:$,captureFrame:B}}const xa=[.25,.5,1,2];function $a(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onScrubStart:a,onScrubEnd:r,initialSpeed:o=1}=e,c=document.createElement("div");c.className="timeline";const l=document.createElement("div");l.className="timeline__bar-row";const u=document.createElement("button");u.className="timeline__play-btn",u.type="button",u.setAttribute("aria-label","Toggle playback"),u.addEventListener("click",()=>s==null?void 0:s());const d=document.createElement("input");d.className="timeline__slider",d.type="range",d.min="0",d.max="1000",d.step="1",d.value="0",d.style.setProperty("--fill","0%"),d.setAttribute("aria-label","Simulation time");const p=document.createElement("div");p.className="timeline__speed";const g=document.createElement("button");g.className="timeline__speed-btn",g.type="button",g.setAttribute("aria-label","Playback speed"),g.addEventListener("click",()=>{p.classList.toggle("open")});const w=document.createElement("div");w.className="timeline__speed-menu";for(const m of xa){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=en(m),y.addEventListener("click",()=>{p.classList.remove("open"),i==null||i(m)}),w.appendChild(y)}return p.appendChild(g),p.appendChild(w),l.appendChild(u),l.appendChild(d),l.appendChild(p),d.addEventListener("input",()=>{const m=parseInt(d.value,10)/1e3;d.style.setProperty("--fill",`${m*100}%`),t==null||t(m)}),d.addEventListener("pointerdown",()=>a==null?void 0:a()),d.addEventListener("pointerup",()=>r==null?void 0:r()),d.addEventListener("change",()=>r==null?void 0:r()),document.addEventListener("click",m=>{p.contains(m.target)||p.classList.remove("open")}),c.appendChild(l),n.appendChild(c),f(o),{setPosition(m){const y=Math.max(0,Math.min(1,m));d.value=String(Math.round(y*1e3)),d.style.setProperty("--fill",`${y*100}%`)},setPlaying(m){u.textContent=m?"⏸":"▶",u.classList.toggle("is-paused",!m),u.setAttribute("aria-label",m?"Pause":"Play")},setSpeed(m){f(m)}};function f(m){g.textContent=en(m);for(const y of w.children)y.classList.toggle("is-active",y.textContent===en(m))}}function en(n){return`x${n}`}function Ra(n,e){const t=Math.min(Fs(e),2);return n.toFixed(t)}function Te(n,e){return e?`${n} ${e}`:n}function Ct(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?st(n):e<1e6?`${t}${st(n/1e3)}K`:e<1e9?`${t}${st(n/1e6)}M`:e<1e12?`${t}${st(n/1e9)}B`:`${t}${st(n/1e12)}T`:String(n)}function st(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Fa(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Rs(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"){const o=Math.max(1,e.precision??3);return a.toExponential(o-1).replace("e+","e").replace(/\.0+e/,"e")}const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ot(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;if(t.format==="scientific"){const r=Math.max(1,t.significantFigures??3);return i.toExponential(r-1).replace("e+","e").replace(/\.0+e/,"e")}return Ra(i,a)}function Fs(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function Ba(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=Va(s,i,a);for(const o of s.metadata.liveStats){const c=Ua(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function Va(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:ot(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:Da(a),value:r}]))}}function Da(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Ua(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=Ha((i==null?void 0:i.value)??t.value??n.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Te(a,n.unit)}}function Ha(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Ct(Math.round(a)):Ct(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Fa(n,{integer:e.integer})}function ja(n,e,t){const s=Q("assets/banner-1600.webp"),i=[`${Q("assets/banner-960.webp")} 960w`,`${Q("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(l){o.innerHTML="";for(const u of l){const d=document.createElement("button");d.className="entry-overlay__button",d.type="button",d.innerHTML=`
        <span class="entry-overlay__button-label">${u.label}</span>
      `,d.addEventListener("click",()=>t(u)),o.appendChild(d)}}return c(e),r.appendChild(o),a.appendChild(r),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(l){c(l)}}}function Ka(n,e,t,s){const i=n.parameters.filter(m=>n.metadata.correctValues[m.id]!==void 0).map(m=>{const y=e[m.id]??m.fallbackValue,_=n.metadata.correctValues[m.id]??m.fallbackValue;return Math.abs(y-_)/Math.max(m.max-m.min,1e-9)}),a=i.reduce((m,y)=>m+y,0)/Math.max(i.length,1),r=Math.max(0,Math.round((1-a)*100)),o=((s==null?void 0:s.carbonBurnt)??.8+a*4.2).toFixed(2),c=(s==null?void 0:s.computeUsed)??18+a*46,l=(s==null?void 0:s.memoryUsed)??12+a*84,u=`${tn(c,1)} CPU-hrs
${tn(l,1)} GB`,d=String(n.parameters.length),p=`${(a*100).toFixed(1)}%`,g=String(n.parameters.length+6),w="Present",f=Wa((s==null?void 0:s.wallclockSeconds)??t);return{scale:{label:"Scale",value:n.label},distinctSimulations:{label:"Distinct Sims",value:String(n.metadata.distinctSimulations)},parameters:{label:"Parameters",value:d},runtime:{label:"Total Runtime",value:f},similarityScore:{label:"Similarity Score",value:`${r}/100`},bestFitDelta:{label:"Best-Fit Delta",value:p},carbonBurnt:{label:"Carbon Burnt",value:o},computeUsed:{label:"Compute Used",value:u},memoryUsed:{label:"Memory Used",value:tn(l,1)},particlesUpdated:{label:"Particle updates",value:s?qa(s.particlesUpdated):"--"},audioTrack:{label:"Audio Track",value:w},terminalLines:{label:"Terminal Lines",value:g},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([m,y])=>[m,{label:y.label,value:y.value}]))}}function qa(n){return String(Math.max(0,n))}function Wa(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function tn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}const Ga={TYPING_MS_PER_CHAR:8.5,FINAL_PAUSE_MS:1e3},Ya={HIDE_AFTER_MS:980},Ja="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",za="https://universe-engine.universe-engine.workers.dev/api/track-run",Qa=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Bs=(()=>{const n=Ie(Qa),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Mt="#4CD98A",fn="#E8951C",Vs="#D7372A",Ds=.2,Us=.5,Wn=2;function hn(n){const e=Math.abs(n-1);return e<=Ds?{word:"On target",colour:Mt}:e<=Us?{word:n>1?"Too high":"Too low",colour:fn}:{word:n>1?"Way too high":"Way too low",colour:Vs}}function Hs(n){const e=Math.abs(n-1),t=n>=1;return e<=Ds?t?"greenHigh":"greenLow":e<=Us?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Xa(n){return Math.min(Math.max(n,0),Wn)/Wn*100}function Za(n){return n>=85?{word:"Almost perfect",colour:Mt}:n>=65?{word:"Really close",colour:Mt}:n>=45?{word:"Getting there",colour:fn}:n>=25?{word:"Not quite",colour:fn}:{word:"Way off - try again",colour:Vs}}function er(n,e){var s;const t=Hs(e);return((s=Bs[n])==null?void 0:s[t])??""}function tr(n,e,t){var r;const s=Hs(t),i=(r=Bs[n])==null?void 0:r[s];return i||(hn(t).colour===Mt?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function nr(n,e,t){return Object.entries(n.metadata.correctValues).map(([s,i])=>{const a=sr(s,n,e,t);if(a===null)return null;const r=a/Math.max(i,1e-9),o=ir(s,n,t),c=ar(s,n),l=er(o,r)||tr(s,o,r);return{id:s,label:o,value:r,rawValue:a,unit:c,detail:l}}).filter(s=>s!==null)}function sr(n,e,t,s){var c,l;const i=e.parameters.find(u=>u.id===n);if(i)return t[n]??i.fallbackValue;const a=s==null?void 0:s.parameterValues[n];if(typeof a=="number"&&Number.isFinite(a))return a;const r=Gn((c=s==null?void 0:s.summaryMetrics[n])==null?void 0:c.value);return r!==null?r:Gn((l=e.metadata.summaryStats.find(u=>u.id===n))==null?void 0:l.value)}function ir(n,e,t){var s,i,a;return((s=e.parameters.find(r=>r.id===n))==null?void 0:s.label)??((i=e.metadata.summaryStats.find(r=>r.id===n))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[n])==null?void 0:a.label)??n}function ar(n,e){var t,s;return((t=e.parameters.find(i=>i.id===n))==null?void 0:t.unit)??((s=e.metadata.summaryStats.find(i=>i.id===n))==null?void 0:s.unit)}function Gn(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function rr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function or(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div");a.className="summary-overlay__content";const r=document.createElement("div");r.className="summary-overlay__actions";const o=document.createElement("button");o.className="summary-overlay__button summary-overlay__button--primary",o.type="button",o.textContent="Continue Exploring";const c=document.createElement("button"),l=document.createElement("button");c.className="summary-overlay__button",c.type="button",c.textContent="New Parameters",l.className="summary-overlay__button",l.type="button",l.textContent="Home",l.hidden=!e.showHome,o.addEventListener("click",e.onReplay),c.addEventListener("click",e.onParameters),l.addEventListener("click",e.onHome),r.appendChild(o),r.appendChild(c),r.appendChild(l),i.appendChild(a),i.appendChild(r),t.appendChild(i);const u=document.createElement("div");u.className="sci-modal is-hidden",u.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(u),n.appendChild(t);const d=u.querySelector(".sci-modal__title"),p=u.querySelector(".sci-modal__verdict"),g=u.querySelector(".sci-modal__body"),w=u.querySelector(".sci-modal__close");function f(b){const S=hn(b.value);d.textContent=b.label,p.textContent=S.word,p.style.color=S.colour,p.hidden=!1,g.textContent=b.detail,u.classList.remove("is-hidden")}function m(b,S){d.textContent=b,p.hidden=!0,g.textContent=S,u.classList.remove("is-hidden")}function y(){u.classList.add("is-hidden")}w.addEventListener("click",y),u.addEventListener("click",b=>{b.target===u&&y()});function _(b,S){const I=document.createElement("div");I.className=`${b.className} panel`,I.innerHTML=`<p class="sci-section__title">${b.title}</p>`;const E=document.createElement("div"),N=b.singleRow?Math.max(1,b.stats.length):Math.max(1,Math.min(b.stats.length,b.maxColumns));E.className="metric-grid",b.singleRow&&E.classList.add("metric-grid--single-row"),E.style.setProperty("--summary-grid-columns",String(N)),E.style.setProperty("--summary-grid-max-width",`${b.maxWidthRem}rem`);for(const T of b.stats){const $=lr(T,S),R=document.createElement("div"),B=document.createElement("span"),D=document.createElement("span");R.className="res-card",B.className="res-card__label",B.textContent=$.label,D.className="res-card__value",D.textContent=$.value,R.appendChild(B),R.appendChild(D),T.description&&(R.classList.add("res-card--has-info"),R.addEventListener("click",()=>{m($.label,T.description)})),E.appendChild(R)}return I.appendChild(E),I}function k(b){const S=document.createElement("div");S.className="res-section panel",S.innerHTML='<p class="sci-section__title">Simulation Stats</p>';const I=document.createElement("div");I.className="metric-grid",I.style.setProperty("--summary-grid-columns",String(Math.max(1,b.length))),I.style.setProperty("--summary-grid-max-width","48rem");for(const E of b){const N=document.createElement("div"),T=document.createElement("span"),$=document.createElement("span");N.className="res-card res-card--has-info",T.className="res-card__label",T.textContent=E.label,$.className="res-card__value",$.textContent=Number.isFinite(E.rawValue)?Te(Number(E.rawValue.toPrecision(4)).toString(),E.unit):"--",N.appendChild(T),N.appendChild($),N.addEventListener("click",()=>m(E.label,E.detail)),I.appendChild(N)}return S.appendChild(I),S}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},Ya.HIDE_AFTER_MS)},setHomeVisible(b){l.hidden=!b},update(b,S,I,E,N){var U;a.innerHTML="",y();const T=Ka(b,S,I,E),$=b.metadata.summaryStats,R=nr(b,S,E);let B;if(R.length>0)B=rr(R);else{const j=((U=T.similarityScore)==null?void 0:U.value)??"0/100";B=parseInt(j,10)||0}const D=Za(B),G=document.createElement("div"),L=document.createElement("div"),C=document.createElement("div");G.className="sci-top",L.className="summary-main-column",C.className="summary-side-column";const P=document.createElement("div");P.className="sci-hero panel",N?(P.classList.add("sci-hero--thumbnail"),P.innerHTML=`<img class="sci-hero__thumbnail" src="${N}" alt="Final frame of simulation" />`):P.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${B}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${D.colour}">${D.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${B}%; background:${D.colour}; box-shadow:0 0 12px ${D.colour}"></div>
          </div>
        `,L.appendChild(P);const V=$.filter(j=>(j.section??"resources")==="resources"&&!R.some(K=>K.id===String(j.id))&&j.id!=="similarityScore"),F=$.filter(j=>j.section==="simulationStats"&&j.id!=="similarityScore");if(V.length>0&&C.appendChild(_({title:"Resources Used",className:"res-section",stats:V,maxColumns:3,maxWidthRem:48},T)),F.length>0?C.appendChild(_({title:"Simulation Stats",className:"res-section",stats:F,maxColumns:F.length,maxWidthRem:48,singleRow:!0},T)):R.length>0&&C.appendChild(k(R)),G.appendChild(L),C.childElementCount>0&&G.appendChild(C),a.appendChild(G),R.length>0){const j=document.createElement("div");j.className="sci-bottom-row";const K=document.createElement("div");K.className="sci-section panel param-section",K.innerHTML='<p class="sci-section__title">Input Parameters</p>';const we=document.createElement("div");we.className="param-cards";for(const O of b.parameters){const ve=S[O.id]??O.fallbackValue,le=O.valueScale??1;let he=ve*le,ce=O.displayUnit??O.unit;O.unit==="Gyr"&&(he*=1e9,ce="yr");const X=document.createElement("div"),_e=document.createElement("span"),me=document.createElement("span");X.className="res-card",O.description&&(X.classList.add("res-card--has-info"),X.addEventListener("click",()=>m(O.label,O.description))),_e.className="res-card__label",_e.textContent=O.label,me.className="res-card__value";const Le=O.displayFormat==="scientific"?Rs(String(he),{mode:"scientific",precision:O.displaySignificantFigures??3}):Ct(he);me.textContent=Te(Le,ce),X.appendChild(_e),X.appendChild(me),we.appendChild(X)}K.appendChild(we);const ee=document.createElement("div");ee.className="sci-section panel",ee.innerHTML='<p class="sci-section__title">Similarity Results</p>';const te=document.createElement("div");te.className="sci-bars";for(const O of R){const ve=hn(O.value),le=document.createElement("div");le.className="sci-bar",le.innerHTML=`
            <div class="sci-bar__name">${O.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Xa(O.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__verdict" style="color:${ve.colour}">${ve.word}</div>
          `,le.addEventListener("click",()=>f(O)),te.appendChild(le)}ee.appendChild(te),j.appendChild(K),j.appendChild(ee),a.appendChild(j)}}}}function lr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:n.value??"--",i=cr(s,n);return{label:n.label??t.label,value:Te(i,n.unit)}}function cr(n,e){if(n==="--")return n;const t=Number(n);if(!Number.isFinite(t))return n;if(e.displayFormat==="scientific")return Rs(n,{scale:e.valueScale,mode:"scientific",precision:e.precision});const s=e.valueScale??1,i=t*s;return Ct(i)}function ur(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("button");r.className="view-switcher__button",r.type="button",r.dataset.viewId=a.id,r.classList.toggle("is-active",a.id===i),r.setAttribute("aria-pressed",String(a.id===i)),r.setAttribute("aria-label",a.label??a.id);const o=dr(a.icon);if(o){const l=document.createElement("span");l.className="view-switcher__icon",l.setAttribute("aria-hidden","true"),l.appendChild(o),r.appendChild(l)}const c=document.createElement("span");c.className="view-switcher__label",c.textContent=a.label??a.id,r.appendChild(c),r.addEventListener("click",()=>e.onSelect(a.id)),t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function dr(n){switch(n){case"dark-matter":return je(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return je(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return je(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return je(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return je(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return je(`
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
      `);default:return null}}function je(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}const fr=`# Credits source-of-truth.
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
`;function hr(){const n=Ie(fr);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function mr(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:pr(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const g=document.createElement("div");g.className="parameter-editor__list";for(const w of u.parameters)g.appendChild(c(w));i.appendChild(g),l()}function c(u){const d=document.createElement("section");d.className="param";const p=document.createElement("div");p.className="param__label";const g=u.displayUnit??u.unit,w=document.createElement("div");w.innerHTML=`
      <span class="param__name">${u.label}</span>
      <span class="param__range">${Te(ot(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)} - ${Te(ot(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)}</span>
    `;const f=document.createElement("div");f.className="param__readout";const m=document.createElement("div");m.className="param__controls";const y=document.createElement("input");y.className="param__slider",y.type="range";const _=u.logScale?Math.log10(u.min):u.min,k=u.logScale?Math.log10(u.max):u.max,b=r[u.id]??u.fallbackValue;y.min=String(_),y.max=String(k),y.step=u.logScale?"0.001":String(u.step),y.value=String(u.logScale?Math.log10(Math.max(b,Number.MIN_VALUE)):b),y.setAttribute("aria-label",u.label);function S(E){const N=u.logScale?10**E:E;r[u.id]=N,y.value=String(E),y.style.setProperty("--fill",`${Yn(E,_,k)}%`),f.textContent=Te(ot(N,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),l()}y.addEventListener("input",()=>{S(parseFloat(y.value))});const I=u.logScale?Math.log10(Math.max(b,Number.MIN_VALUE)):b;if(y.style.setProperty("--fill",`${Yn(I,_,k)}%`),f.textContent=Te(ot(b,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),p.appendChild(w),p.appendChild(f),u.description){w.classList.add("param__name--has-info"),w.setAttribute("title",u.description);const E=document.createElement("div");E.className="param__popover",E.textContent=u.description,d.appendChild(E),w.addEventListener("click",()=>{d.classList.toggle("param--info-open")}),document.addEventListener("click",N=>{d.contains(N.target)||d.classList.remove("param--info-open")})}return m.appendChild(y),d.appendChild(p),d.appendChild(m),d}function l(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function pr(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function Yn(n,e,t){return t===e?0:(n-e)/(t-e)*100}const js="universe-engine-advanced-settings",gr="RSSSE26UM_Engine";function mn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function Ks(n){const e=localStorage.getItem(js);if(!e)return mn();try{const t=JSON.parse(e);return qs(t,n)}catch{return mn()}}function yr(n,e){const t=qs(n,e);return localStorage.setItem(js,JSON.stringify({lockedScaleId:t.lockedScaleId,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function qs(n,e){const t=mn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function br(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function wr(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media";const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow">Celestial observer</p>
    <h2 class="config-overlay__title">Simulation matrix</h2>
  `;const u=document.createElement("button");u.className="config-overlay__close",u.type="button",u.setAttribute("aria-label","Close overlay"),u.textContent="×";const d=document.createElement("div");d.className="config-overlay__section-indicator",d.textContent="Parameters",c.appendChild(d),c.appendChild(l),c.appendChild(u);const p=document.createElement("section");p.className="config-overlay__section config-overlay__section--grow",p.dataset.section="parameters";const g=document.createElement("div");p.appendChild(g);const w=document.createElement("section");w.className="config-overlay__section config-overlay__section--grow",w.dataset.section="settings",w.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const f=document.createElement("div");w.appendChild(f);const m=document.createElement("section");m.className="advanced-settings",m.dataset.state="closed",m.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const y=document.createElement("button");y.className="advanced-settings__access",y.type="button",y.textContent="Advanced Settings",m.appendChild(y);const _=document.createElement("div");_.className="advanced-settings__auth";const k=document.createElement("input");k.className="advanced-settings__password",k.type="password",k.placeholder="Enter password",k.autocomplete="off";const b=document.createElement("button");b.className="advanced-settings__unlock",b.type="button",b.textContent="Unlock";const S=document.createElement("p");S.className="advanced-settings__message",_.appendChild(k),_.appendChild(b),_.appendChild(S),m.appendChild(_);const I=document.createElement("div");I.className="advanced-settings__form";const E=document.createElement("label");E.className="advanced-settings__field",E.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const N=document.createElement("select");N.className="advanced-settings__select",N.appendChild(new Option("None",""));for(const A of e.availableScales)N.appendChild(new Option(A.label,A.id));E.appendChild(N),I.appendChild(E);const T=document.createElement("div");T.className="advanced-settings__field",T.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const $=document.createElement("div");$.className="advanced-settings__options";const R=document.createElement("label"),B=document.createElement("input");R.className="advanced-settings__choice",B.type="radio",B.name="manifest-source",B.value="local",R.appendChild(B),R.append("Local manifest");const D=document.createElement("label"),G=document.createElement("input");D.className="advanced-settings__choice",G.type="radio",G.name="manifest-source",G.value="online",D.appendChild(G),D.append("Online manifest"),$.appendChild(R),$.appendChild(D),T.appendChild($),I.appendChild(T);const L=document.createElement("label");L.className="advanced-settings__field advanced-settings__field--inline";const C=document.createElement("input"),P=document.createElement("span");C.type="checkbox",C.className="advanced-settings__checkbox",P.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,L.appendChild(C),L.appendChild(P),I.appendChild(L);const V=document.createElement("div");V.className="advanced-settings__field",V.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const F=document.createElement("div");F.className="advanced-settings__options";const U=new Map;for(const A of e.availableScales){const q=document.createElement("label"),ne=document.createElement("input");q.className="advanced-settings__choice",ne.type="checkbox",ne.value=A.id,U.set(A.id,ne),q.appendChild(ne),q.append(`Show ${A.label}`),F.appendChild(q)}V.appendChild(F),I.appendChild(V),m.appendChild(I),w.appendChild(m);const j=document.createElement("section");j.className="config-overlay__section config-overlay__section--grow",j.dataset.section="credits",j.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const K=j.querySelector("[data-credits]"),we=hr();if(K.innerHTML="",we.length===0){const A=document.createElement("div");A.className="credits-list__entry",A.textContent="To be credited...",K.appendChild(A)}else for(const A of we)if(A.header){const q=document.createElement("div");q.className="credits-list__heading",q.textContent=A.text,K.appendChild(q)}else{const q=document.createElement("div");q.className="credits-list__entry";const ne=document.createElement("span");if(ne.className="credits-list__text",A.url){const se=document.createElement("a");se.className="credits-list__link",se.href=A.url,se.target="_blank",se.rel="noopener noreferrer",se.textContent=A.text,ne.appendChild(se)}else ne.textContent=A.text;q.appendChild(ne),K.appendChild(q)}const ee=document.createElement("div");ee.className="config-overlay__footer";const te=document.createElement("button");te.className="run-button",te.type="button",te.textContent="Run",ee.appendChild(te),o.appendChild(c),o.appendChild(p),o.appendChild(w),o.appendChild(j),o.appendChild(ee),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let O=it(e.advancedSettings),ve="closed";const le=mr(g,e.simClass,e.values,e.onValuesChange),he=Ma(f,e.theme,e.onThemeChange);u.addEventListener("click",e.onClose),y.addEventListener("click",()=>{if(ve==="open"){me("closed");return}me("auth"),k.focus()}),b.addEventListener("click",_e),k.addEventListener("keydown",A=>{A.key==="Enter"&&_e()}),N.addEventListener("change",()=>{O.lockedScaleId=N.value||null,X()}),B.addEventListener("change",()=>{B.checked&&(O.manifestSource="local")}),G.addEventListener("change",()=>{G.checked&&(O.manifestSource="online")}),C.addEventListener("change",()=>{O.verboseLogging=C.checked});for(const[A,q]of U.entries())q.addEventListener("change",()=>{if(Array.from(U.entries()).filter(([,se])=>se.checked).map(([se])=>se).length===0&&!O.lockedScaleId){q.checked=!0;return}O.hiddenScaleIds=Array.from(U.keys()).filter(se=>{var Be;return!((Be=U.get(se))!=null&&Be.checked)&&se!==O.lockedScaleId}),X()}),A===O.lockedScaleId&&(q.disabled=!0);ce(e.initialView??"parameters"),X();function ce(A){o.dataset.view=A,d.textContent=A==="parameters"?"Parameters":A==="settings"?"Settings":"Credits",A==="settings"?te.textContent="Apply":A==="credits"?te.textContent="Close":te.textContent="Run"}function X(){N.value=O.lockedScaleId??"",B.checked=O.manifestSource==="local",G.checked=O.manifestSource==="online",C.checked=O.verboseLogging;for(const[A,q]of U.entries()){const ne=O.lockedScaleId===A;q.checked=ne||!O.hiddenScaleIds.includes(A),q.disabled=ne}}function _e(){if(k.value!==gr){S.textContent="Incorrect password";return}k.value="",S.textContent="",me("open")}function me(A){ve=A,m.dataset.state=A,y.textContent=A==="open"?"Hide Advanced Settings":"Advanced Settings",A!=="auth"&&(S.textContent="")}function Le(){k.value="",S.textContent="",me("closed")}function Ht(){O=it(e.advancedSettings),X()}return te.addEventListener("click",()=>{const A=o.dataset.view;if(A==="settings"){e.onApplySettings(it(O));return}if(A==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),Ht(),Le()},setSimulation(A,q){le.setSimClass(A,q),r.src=A.placeholderImage,r.alt=`${A.label} preview`},setTheme(A){he.setActive(A)},setView(A){ce(A),A!=="settings"&&Le()},setAdvancedSettings(A){e.advancedSettings=it(A),O=it(A),X(),Le()}}}function it(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function vr(n){const{TYPING_MS_PER_CHAR:e,FINAL_PAUSE_MS:t}=Ga,s=document.createElement("section");s.className="overlay overlay--initializing",s.hidden=!0,s.classList.add("is-hidden");const i=document.createElement("div");i.className="terminal";const a=document.createElement("div");a.className="terminal__header",a.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const r=document.createElement("div");r.className="terminal__log";const o=document.createElement("button");o.className="terminal__fast-forward",o.type="button",o.textContent=">>",o.setAttribute("aria-label","Fast forward terminal output"),o.setAttribute("aria-pressed","false"),o.hidden=!0,i.appendChild(a),i.appendChild(r),i.appendChild(o),s.appendChild(i),n.appendChild(s);let c=[],l=0,u=!1;function d(m){u=m,o.classList.toggle("is-active",u),o.setAttribute("aria-pressed",String(u))}o.addEventListener("click",()=>{d(!u)});function p(){for(const m of c)window.clearTimeout(m);c=[]}function g(m,y){return new Promise(_=>{const k=window.setTimeout(()=>{y===l&&_()},u?0:Math.max(0,m));c.push(k)})}async function w(m,y){const _=document.createElement("div");_.className="terminal__line";const k=f();_.appendChild(k),r.appendChild(_);const b=u?2:1;for(let S=0;S<m.length;S+=b){if(y!==l)return;const I=m.slice(S,S+b);_.insertBefore(document.createTextNode(I),k),r.scrollTop=r.scrollHeight,await g(e,y)}k.remove()}function f(){const m=document.createElement("span");return m.className="terminal__cursor",m.textContent="█",m}return{async show(m,y,_){p(),l+=1;const k=l;d(!1),s.hidden=!1,s.classList.remove("is-hidden"),o.hidden=!0,_&&_.then(()=>{o.hidden=!1});for(const[b,S]of m.entries()){if(k!==l)return;const I=`${kt(b)} ${S.text}`;await w(I,k)}if(_){const b=document.createElement("div");b.className="terminal__line terminal__line--syncing",b.textContent=`${kt(m.length)} STARTING SIMULATION`,r.appendChild(b);let S=0;const I=window.setInterval(()=>{S=(S+1)%4;const E=".".repeat(S);b.textContent=`${kt(m.length)} STARTING SIMULATION${E}`,r.scrollTop=r.scrollHeight},400);c.push(I);try{await _}catch{}window.clearInterval(I),b.textContent=`${kt(m.length)} STARTING SIMULATION...`,r.scrollTop=r.scrollHeight}k===l&&(await g(t,k),y())},hide(){p(),l+=1,d(!1),o.hidden=!0,s.hidden=!0,s.classList.add("is-hidden"),r.innerHTML=""}}}function kt(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${nn(t)}:${nn(s)}:${nn(i)}]`}function nn(n){return String(n).padStart(2,"0")}function Sr(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var d;l(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(d,p){const g=document.createElement("button");return g.className="display-menu__item",g.type="button",g.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,g.addEventListener("click",p),g}function l(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const _r=`# Initialization terminal script for the Planetary simulation family.
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
`,kr=`# Initialization terminal script for the Galaxy simulation family.
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
`,Er=`# Initialization terminal script for the Cosmos simulation family.
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
`,Nr={planetary:_r,galaxy:kr,cosmos:Er};function Ir(n){return Ie(Nr[n.id]).flatMap((t,s)=>{var a;if(!((a=t.options)!=null&&a.length))throw new Error(`Initialization YAML entry ${s} for ${n.id} has no options.`);const i=Lr(2,Math.min(4,t.options.length));return Ar(t.options,i).map(r=>({text:r.text}))})}function Lr(n,e){return Math.floor(Math.random()*(e-n+1))+n}function Ar(n,e){const t=[...n];for(let s=t.length-1;s>0;s-=1){const i=Math.floor(Math.random()*(s+1));[t[s],t[i]]=[t[i],t[s]]}return t.slice(0,e)}function Tr(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function Cr(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=Ie(t),i=Ke(s.wallclockSeconds),a=Ke(s.computeUsed),r=Ke(s.memoryUsed),o=Ke(s.carbonBurnt),c=Ke(s.particlesUpdated),l=await Mr(n),u=Pr(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function Mr(n){try{const e=await fetch(Or(n));if(!e.ok)return{};const t=await e.text(),s=Ie(t);return xr(s)}catch{return{}}}function Or(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function Ke(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function Pr(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function xr(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=Ke(s);i!==null&&(e[t]=i)}return e}const Ws="[UniverseEngine]",$r=["planetary","galaxy","cosmos"];function Gs(){return Ks($r).verboseLogging}function Z(n,e){Gs()&&console.info(Ws,n,e??"")}function Ee(n,e){Gs()&&console.warn(Ws,n,e??"")}const Rr={local:"assets/local-manifest.json",online:Ja};function Fr(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,Z("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await Js(e,t)},async findNearestVideo(s,i,a){const r=await Vr(e,t,s,i,a);if(r)return r;const o=Ys(s);return Ee("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:Br(s),summaryUrl:Tr(o)}}}}function Ys(n){switch(n){case"planetary":return Q("assets/planet_test.mp4");case"galaxy":return Q("assets/galaxy_test.mp4");case"cosmos":return Q("assets/cosmo_test.mp4");default:return Q("assets/galaxy_test.mp4")}}function Br(n){switch(n){case"planetary":return Q("assets/planet_test_planetary_stats.csv");case"galaxy":return Q("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return Q("assets/cosmo_test_cosmos_stats.csv");default:return Q("assets/galaxy_test_galaxy_stats.csv")}}async function Js(n,e){const t=e.get(n);if(t)return t;const s=Rr[n],i=fetch(Q(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return Z("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(Ee("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function Vr(n,e,t,s,i){const r=(await Js(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return Ee("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=Jn(o,s,i);for(const d of r.slice(1)){const p=Jn(d,s,i);p<c&&(o=d,c=p)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(Z("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:Q(u),liveDataUrl:Q(o.liveDataPath),summaryUrl:Q(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,p])=>[d,Q(p)]))}):null}function Jn(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Lt={mode:"time",frames:[]};async function Dr(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Hr(t)}function Ur(n,e,t=0){if(n.mode==="row")return jr(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};for(let a=0;a<s.length-1;a+=1){const r=s[a],o=s[a+1];if(e<r.t||e>o.t)continue;const c=(e-r.t)/Math.max(o.t-r.t,1e-9);return Kr(r.values,o.values,c)}return{...i.values}}function Hr(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Lt;const t=sn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=sn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=sn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function jr(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function sn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function Kr(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=qr(u);continue}i[a]=t<.5?r:o}return i}function qr(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Wr(n){Gr(za,n)}function Gr(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){Z("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?Z("Run selection tracked",{simulationId:e.simulationId}):Ee("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Ee("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const zn=50*1024*1024,Yr=8,Jr=6e3,zr=8e3,an={galaxy:"tron",planetary:"matrix",cosmos:"nostromo"};function Qr(n){const e=He.map(h=>h.id);let t=Ks(e),s=On(t);const i=Fr(t.manifestSource);t.manifestSource==="online"&&i.preloadActiveManifest();let a=Pn(t.lockedScaleId)??s[0]??He[0],r=t.lockedScaleId?an[a.id]:Ca(),o=!1,c=null,l=null,u=0,d=Lt,p=!1;const g=Object.fromEntries(He.map(h=>[h.id,si(h)]));Zt(r);const w=Ys(a.id),f=Pa(n,w),m=document.createElement("div");m.className="display-chrome",m.classList.add("is-hidden"),n.appendChild(m);const y=document.createElement("div");y.className="orientation-overlay",y.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(y);const _=document.createElement("div");_.className="swift-logo",_.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Q("assets/credits/swift-logo.png")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(_);const k=document.createElement("div");k.className="display-chrome__top-left is-hidden",n.appendChild(k);const b=Sr(k,{onHome(){Be()},onViewSelected(h){if(h==="credits"){q("credits");return}q(h)},showHome:!t.lockedScaleId}),S=document.createElement("div");S.className="display-chrome__left-center",m.appendChild(S);const I=ur(S,{onSelect(h){Mn(h)}}),E=document.createElement("div");E.className="display-chrome__top-right",m.appendChild(E);const N=Ba(E),T=document.createElement("div");T.className="display-chrome__center-status",T.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,m.appendChild(T);const $="universe-engine-playback-speed",R=()=>{const h=localStorage.getItem($),v=h?Number(h):NaN;return[.25,.5,1,2].includes(v)?v:1},B=h=>{localStorage.setItem($,String(h))},D=R();f.setPlaybackRate(D);const G=document.createElement("div");G.className="display-chrome__bottom",m.appendChild(G);const L=$a(G,{onChange(h){f.seekToFraction(h)},onTogglePlay:Cn,onSpeedChange:Qs,onScrubStart(){V()},onScrubEnd(){f.isPaused()||P()},initialSpeed:D});L.setPlaying(!f.isPaused());let C=null;function P(){if(C!==null)return;function h(){const v=f.getPlaybackFraction();L.setPosition(v),f.isPaused()?C=null:C=requestAnimationFrame(h)}C=requestAnimationFrame(h)}function V(){C!==null&&(cancelAnimationFrame(C),C=null)}f.onPlayStateChange(h=>{L.setPlaying(!h),h?V():P()}),f.onTimeUpdate(h=>{u=h*f.getDurationSeconds(),Ve(u)});const F=document.createElement("div");F.className="overlay-layer",n.appendChild(F);const U=or(F,{onReplay:zs,onParameters:()=>q("parameters"),onHome:Be,showHome:!t.lockedScaleId});f.onEnded(()=>{o=!0;const h=f.captureFrame();U.update(a,pe(),f.getDurationSeconds(),c,h),U.show()});const j=ja(F,s,h=>{Le(h),q("parameters")}),K=wr(F,{simClass:a,values:pe(),theme:r,advancedSettings:t,availableScales:He,onValuesChange:Ht,onThemeChange:A,onRun:()=>{Z("Parameters submitted — starting run",{simClassId:a.id}),Xs().catch(h=>{Ee("Run failed to start",{simClassId:a.id,error:h instanceof Error?h.message:String(h)})})},onApplySettings:ne,onClose:se,initialView:"parameters"}),we=vr(F);L.setPosition(0),Ve(),U.hide();const ee=new WeakMap,te=h=>{const v=ee.get(h);v&&(clearTimeout(v),ee.delete(h)),h.classList.remove("side-collapsed")},O=h=>{const v=ee.get(h);v&&clearTimeout(v),ee.set(h,setTimeout(()=>{h.classList.add("side-collapsed"),ee.delete(h)},2500))},ve=h=>{const v=ee.get(h);v&&(clearTimeout(v),ee.delete(h)),h.classList.add("side-collapsed")},le=(h,v)=>{h.addEventListener("mouseenter",()=>te(h)),h.addEventListener("mouseleave",()=>O(h)),h.addEventListener("focusin",()=>te(h)),h.addEventListener("focusout",x=>{h.contains(x.relatedTarget)||O(h)}),h.addEventListener("click",()=>{if(h.classList.contains("side-collapsed")){te(h),O(h);return}v.toggleOnClick?ve(h):O(h)}),ve(h)};le(k,{toggleOnClick:!0}),le(S,{toggleOnClick:!0}),le(G,{toggleOnClick:!1});let he=0,ce=null,X=0;const _e=()=>{ce!==null&&(cancelAnimationFrame(ce),ce=null)},me=()=>{if(ce!==null)return;X=f.getPlaybackFraction();const h=()=>{if(he===0){_e();return}const x=12*(1/60)/Math.max(f.getDurationSeconds(),1);X=Math.max(0,Math.min(1,X+he*x)),f.seekToFraction(X),ce=requestAnimationFrame(h)};ce=requestAnimationFrame(h)};document.addEventListener("keydown",h=>{if(n.dataset.mode==="display"&&!(h.target instanceof HTMLInputElement||h.target instanceof HTMLTextAreaElement))switch(h.key){case"Escape":h.preventDefault(),Be();break;case" ":h.preventDefault(),Cn();break;case"ArrowLeft":h.preventDefault(),he=-1,me();break;case"ArrowRight":h.preventDefault(),he=1,me();break;case"ArrowUp":case"ArrowDown":{if(h.preventDefault(),!(l!=null&&l.views)||Object.keys(l.views).length<=1)break;const v=a.views.filter(ge=>{var oe;return((oe=l==null?void 0:l.views)==null?void 0:oe[ge.id])!==void 0});if(v.length<=1)break;const x=l.viewId??yt(a,l),H=v.findIndex(ge=>ge.id===x),Oe=h.key==="ArrowUp"?(H-1+v.length)%v.length:(H+1)%v.length;Mn(v[Oe].id);break}}}),document.addEventListener("keyup",h=>{(h.key==="ArrowLeft"||h.key==="ArrowRight")&&(he=0,_e())}),f.hideMedia(),f.pause(),Me(t.lockedScaleId?"config":"entry");function Le(h){h.id===a.id&&p||(a=h,Kt(),A(an[h.id]),K.setSimulation(a,pe()),L.setPosition(0),Ve(),jt())}function Ht(h){g[a.id]={...h},Z("Parameter values updated",{simClassId:a.id,values:g[a.id]}),Ve()}function A(h){r=h,Zt(h),K.setTheme(h)}function q(h){h==="parameters"&&K.setSimulation(a,pe()),K.setView(h),Me("config")}function ne(h){if(ci(h),p){U.hide(),Me("display");return}K.setSimulation(a,pe()),K.setView("parameters")}function se(){if(U.hide(),!p&&t.lockedScaleId){K.setSimulation(a,pe()),K.setView("parameters");return}Me(p?"display":"entry")}function Be(){t.lockedScaleId||(Z("Returning to home screen",{simClassId:a.id}),Kt(),p=!1,f.hideMedia(),Me("entry"))}function zs(){o=!1,U.hide(),f.resetPlayback(),f.play().catch(()=>{f.setMuted(!0),f.play()})}function Cn(){f.isPaused()?f.play().catch(()=>{f.setMuted(!0),f.play()}):f.pause()}function Qs(h){f.setPlaybackRate(h),B(h),L.setSpeed(h)}async function Xs(){const h=pe();Z("Run requested",{simClassId:a.id,values:h,manifestSource:i.getSource()});const v=await i.findNearestVideo(a.id,a.parameters,h);Kt(),l=v;const x=yt(a,v);Wr({simulationId:a.id,parameters:h,manifestSource:i.getSource(),matchedRunId:v.runId});const H=li(v,x)??v.url,Oe=Object.entries(v.views??{}).filter(([ie])=>ie!==x).map(([,ie])=>ie);ai(v.liveDataUrl),ri(v.summaryUrl),f.setMuted(!1),jt(x),Me("initializing");const ge=Zs(H);f.prewarmSources(Oe);const oe=(async()=>{const ie=await ge;Z(`Prepared active video source: ${ie.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:H,waitsForBuffer:ie.shouldWaitForBuffer}),f.setSource(ie.src,{ownedObjectUrl:ie.ownedObjectUrl}),f.pause(),await f.waitForLoadedData(zr),ie.shouldWaitForBuffer&&await f.waitForBufferedAhead(Yr,Jr)})();await new Promise(ie=>{we.show(Ir(a),ie,oe)}),p=!0,f.showMedia(),f.play().catch(()=>{f.setMuted(!0),f.play().catch(()=>{})}),Me("display")}async function Zs(h){const v=await ei(h);if(v!==null&&v>0&&v<=zn){Z("Downloading active video behind loading overlay",{videoUrl:h,contentLength:v});try{const x=await fetch(h);if(!x.ok)throw new Error(`Failed to download active video: ${h}`);const H=await x.blob();return Z(`Active video full fetch complete: ${H.size} bytes`,{videoUrl:h,blobType:H.type}),{src:URL.createObjectURL(H),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(x){Ee(`Full-fetch FAILED; falling back to progressive: ${x instanceof Error?x.message:String(x)}`,{videoUrl:h})}}return v!==null?Z("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:h,contentLength:v,fullFetchMaxBytes:zn}):Z("Could not determine active video size; using progressive load",{videoUrl:h}),Z("Using progressive active video load",{videoUrl:h}),{src:h,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ei(h){try{const v=await fetch(h,{headers:{Range:"bytes=0-0"}});Z("Probed active video size with range request",{videoUrl:h,ok:v.ok,status:v.status,contentLength:v.headers.get("Content-Length"),contentRange:v.headers.get("Content-Range")});const x=ni(v.headers.get("Content-Length"));if(x!==null)return x;const H=ti(v.headers.get("Content-Range"));return H!==null?H:null}catch(v){return Ee("Could not probe active video size",{videoUrl:h,error:v instanceof Error?v.message:String(v)}),null}}function ti(h){if(!h)return null;const v=h.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!v)return null;const x=Number(v[1]);return Number.isFinite(x)&&x>0?x:null}function ni(h){if(!h)return null;const v=Number(h);return Number.isFinite(v)?v:null}function Me(h){if(n.dataset.mode=h,h==="entry"?document.documentElement.setAttribute("data-theme","glass"):h==="display"&&Zt(r),qt(m,h==="display"||h==="config"),qt(_,h==="display"),qt(k,!t.lockedScaleId&&(h==="entry"||h==="config"||h==="display")),h==="entry"&&!t.lockedScaleId?j.show():j.hide(),h==="config"?(we.hide(),K.setSimulation(a,pe()),K.show()):K.hide(),h!=="display")U.hide();else if(o){const x=f.captureFrame();U.update(a,pe(),f.getDurationSeconds(),c,x),U.show()}!p||h==="initializing"?(f.hideMedia(),h==="initializing"&&f.pause()):f.showMedia(),h!=="initializing"&&we.hide()}function Ve(h=0){const v=Ur(d,h,f.getDurationSeconds()),x=oi(a,c,h,f.getDurationSeconds());N.update(a,pe(),{...v,...x})}function jt(h){const v=a.views.filter(x=>{var H;return((H=l==null?void 0:l.views)==null?void 0:H[x.id])!==void 0});if(v.length<=1){I.hide();return}I.update(v,h??yt(a,l))}function Kt(){d=Lt,o=!1,c=null,l=null,u=0,U.hide(),I.hide(),f.pause(),f.clearPrewarmedSources(),f.resetPlayback(),L.setPosition(0)}function Mn(h){if(!(l!=null&&l.views)||h===yt(a,l))return;const v=l.views[h];if(!v)return;l.viewId=h;const x=!f.isPaused()&&!o,H=o?0:f.getPlaybackFraction();o=!1,U.hide(),f.setSource(v,{seekFraction:H,autoplay:x}),jt(h)}function pe(){return{...g[a.id]}}function si(h){return Object.fromEntries(h.parameters.map(v=>[v.id,ii(v)]))}function ii(h){if(h.logScale){const ge=Math.log10(h.min),oe=Math.log10(h.max);return 10**(ge+Math.random()*(oe-ge))}const v=Math.max(0,Math.round((h.max-h.min)/h.step)),x=Math.floor(Math.random()*(v+1)),H=h.min+x*h.step,Oe=Fs(h.step);return Number(H.toFixed(Oe))}async function ai(h){try{d=await Dr(h)}catch(v){d=Lt,Ee("Failed to load live stats",{url:h,error:v instanceof Error?v.message:String(v)})}Ve()}async function ri(h){c=await Cr(h),Ve(u)}function oi(h,v,x,H){if(!v||!Number.isFinite(H)||H<=0)return{};const Oe=Math.max(0,Math.min(1,x/H)),ge={};for(const oe of h.metadata.liveStats){if(!oe.live||!oe.fromVideo||!oe.scaleWithTime)continue;const Wt=oe.videoKey??oe.id,ie=v[Wt];if(typeof ie!="number"||!Number.isFinite(ie))continue;const xn=ie*Oe;ge[oe.id]=oe.integer?String(Math.floor(xn)):String(xn)}return ge}function qt(h,v){h.hidden=!v,h.classList.toggle("is-hidden",!v)}function yt(h,v){return v!=null&&v.views?v.viewId??Object.keys(v.views)[0]:v==null?void 0:v.viewId}function li(h,v){return!v||!h.views?null:h.views[v]??null}function On(h){const v=new Set(br(h,e));return He.filter(x=>v.has(x.id))}function Pn(h){return h?He.find(v=>v.id===h)??null:null}function ci(h){const v=a.id,x=t.manifestSource;t=yr(h,e),s=On(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),b.setHomeVisible(!t.lockedScaleId),U.setHomeVisible(!t.lockedScaleId),j.setSimulationClasses(s),K.setAdvancedSettings(t),Z("Advanced settings updated",t),x!==t.manifestSource&&(l=null);const H=Pn(t.lockedScaleId);H&&(Le(H),H.id!==v&&(p=!1,f.hideMedia(),K.setView("parameters")),p||(A(an[H.id]),K.setSimulation(a,pe())))}}function Xr(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Qr(n)}Xr();
//# sourceMappingURL=index-CpDjXYXB.js.map
