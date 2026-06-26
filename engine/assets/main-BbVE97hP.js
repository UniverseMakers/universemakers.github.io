(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Qn=Symbol.for("yaml.alias"),Hn=Symbol.for("yaml.document"),ze=Symbol.for("yaml.map"),qs=Symbol.for("yaml.pair"),Ue=Symbol.for("yaml.scalar"),bt=Symbol.for("yaml.seq"),Me=Symbol.for("yaml.node.type"),nt=n=>!!n&&typeof n=="object"&&n[Me]===Qn,on=n=>!!n&&typeof n=="object"&&n[Me]===Hn,Ft=n=>!!n&&typeof n=="object"&&n[Me]===ze,ne=n=>!!n&&typeof n=="object"&&n[Me]===qs,G=n=>!!n&&typeof n=="object"&&n[Me]===Ue,Bt=n=>!!n&&typeof n=="object"&&n[Me]===bt;function ee(n){if(n&&typeof n=="object")switch(n[Me]){case ze:case bt:return!0}return!1}function te(n){if(n&&typeof n=="object")switch(n[Me]){case Qn:case ze:case Ue:case bt:return!0}return!1}const Ws=n=>(G(n)||ee(n))&&!!n.anchor,Xe=Symbol("break visit"),ya=Symbol("skip children"),Mt=Symbol("remove node");function vt(n,e){const t=ba(e);on(n)?ut(null,n.contents,t,Object.freeze([n]))===Mt&&(n.contents=null):ut(null,n,t,Object.freeze([]))}vt.BREAK=Xe;vt.SKIP=ya;vt.REMOVE=Mt;function ut(n,e,t,s){const i=va(n,e,t,s);if(te(i)||ne(i))return wa(n,s,i),ut(n,i,t,s);if(typeof i!="symbol"){if(ee(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=ut(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Xe)return Xe;r===Mt&&(e.items.splice(a,1),a-=1)}}}else if(ne(e)){s=Object.freeze(s.concat(e));const a=ut("key",e.key,t,s);if(a===Xe)return Xe;a===Mt&&(e.key=null);const r=ut("value",e.value,t,s);if(r===Xe)return Xe;r===Mt&&(e.value=null)}}return i}function ba(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function va(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(Ft(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(Bt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ne(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(G(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(nt(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function wa(n,e,t){const s=e[e.length-1];if(ee(s))s.items[n]=t;else if(ne(s))n==="key"?s.key=t:s.value=t;else if(on(s))s.contents=t;else{const i=nt(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const _a={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Sa=n=>n.replace(/[!,[\]{}]/g,e=>_a[e]);class ge{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},ge.defaultYaml,e),this.tags=Object.assign({},ge.defaultTags,t)}clone(){const e=new ge(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new ge(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:ge.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},ge.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:ge.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},ge.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Sa(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&te(e.contents)){const a={};vt(e.contents,(r,o)=>{te(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}ge.defaultYaml={explicit:!1,version:"1.2"};ge.defaultTags={"!!":"tag:yaml.org,2002:"};function Ys(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Gs(n){const e=new Set;return vt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function zs(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function ka(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Gs(n));const r=zs(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(G(r.node)||ee(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function dt(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=dt(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=dt(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=dt(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=dt(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Te(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Te(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Ws(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class Xn{constructor(e){Object.defineProperty(this,Me,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!on(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Te(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?dt(a,{"":o},"",o):o}}class Zn extends Xn{constructor(e){super(Qn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],vt(e,{Node:(a,r)=>{(nt(r)||Ws(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Te(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=Qt(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Ys(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Qt(n,e,t){if(nt(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(ee(e)){let s=0;for(const i of e.items){const a=Qt(n,i,t);a>s&&(s=a)}return s}else if(ne(e)){const s=Qt(n,e.key,t),i=Qt(n,e.value,t);return Math.max(s,i)}return 1}const Js=n=>!n||typeof n!="function"&&typeof n!="object";class x extends Xn{constructor(e){super(Ue),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Te(this.value,e,t)}toString(){return String(this.value)}}x.BLOCK_FOLDED="BLOCK_FOLDED";x.BLOCK_LITERAL="BLOCK_LITERAL";x.PLAIN="PLAIN";x.QUOTE_DOUBLE="QUOTE_DOUBLE";x.QUOTE_SINGLE="QUOTE_SINGLE";const Ea="tag:yaml.org,2002:";function La(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Pt(n,e,t){var d,p,m;if(on(n)&&(n=n.contents),te(n))return n;if(ne(n)){const b=(p=(d=t.schema[ze]).createNode)==null?void 0:p.call(d,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new Zn(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Ea+e.slice(2));let c=La(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new x(n);return l&&(l.node=b),b}c=n instanceof Map?r[ze]:Symbol.iterator in Object(n)?r[bt]:r[ze]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((m=c==null?void 0:c.nodeClass)==null?void 0:m.from)=="function"?c.nodeClass.from(t.schema,n,t):new x(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function tn(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Pt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const At=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Qs extends Xn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>te(s)||ne(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(At(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(ee(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,tn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(ee(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&G(a)?a.value:a:ee(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ne(t))return!1;const s=t.value;return s==null||e&&G(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return ee(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(ee(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,tn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Na=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function He(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const Ze=(n,e,t)=>n.endsWith(`
`)?He(t,e):t.includes(`
`)?`
`+He(t,e):(n.endsWith(" ")?"":" ")+t,Xs="flow",jn="block",Xt="quoted";function ln(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):d=i-s);let p,m,b=!1,h=-1,y=-1,S=-1;t===jn&&(h=_s(n,h,e.length),h!==-1&&(d=h+l));for(let L;L=n[h+=1];){if(t===Xt&&L==="\\"){switch(y=h,n[h+1]){case"x":h+=3;break;case"u":h+=5;break;case"U":h+=9;break;default:h+=1}S=h}if(L===`
`)t===jn&&(h=_s(n,h,e.length)),d=h+e.length+l,p=void 0;else{if(L===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const k=n[h+1];k&&k!==" "&&k!==`
`&&k!=="	"&&(p=h)}if(h>=d)if(p)c.push(p),d=p+l,p=void 0;else if(t===Xt){for(;m===" "||m==="	";)m=L,L=n[h+=1],b=!0;const k=h>S+1?h-2:y-1;if(u[k])return n;c.push(k),u[k]=!0,d=k+l,p=void 0}else b=!0}m=L}if(b&&o&&o(),c.length===0)return n;r&&r();let v=n.slice(0,c[0]);for(let L=0;L<c.length;++L){const k=c[L],g=c[L+1]||n.length;k===0?v=`
${e}${n.slice(0,g)}`:(t===Xt&&u[k]&&(v+=`${n[k]}\\`),v+=`
${e}${n.slice(k+1,g)}`)}return v}function _s(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const cn=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),un=n=>/^(%|---|\.\.\.)/m.test(n);function Ca(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Ot(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(un(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:ln(r,a,Xt,cn(e,!1))}function Kn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Ot(n,e);const t=e.indent||(un(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:ln(s,t,Xs,cn(e,!1))}function ft(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Ot;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Kn:a&&!i?s=Ot:s=t?Kn:Ot}return s(n,e)}let qn;try{qn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{qn=/\n+(?!\n|$)/g}function Zt({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return ft(t,s);const c=s.indent||(s.forceBlockIndent||un(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===x.BLOCK_FOLDED?!1:e===x.BLOCK_LITERAL?!0:!Ca(t,l,c.length);if(!t)return u?`|
`:`>
`;let d,p;for(p=t.length;p>0;--p){const g=t[p-1];if(g!==`
`&&g!=="	"&&g!==" ")break}let m=t.substring(p);const b=m.indexOf(`
`);b===-1?d="-":t===m||b!==m.length-1?(d="+",a&&a()):d="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(qn,`$&${c}`));let h=!1,y,S=-1;for(y=0;y<t.length;++y){const g=t[y];if(g===" ")h=!0;else if(g===`
`)S=y;else break}let v=t.substring(0,S<y?S+1:y);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${c}`));let k=(h?c?"2":"1":"")+d;if(n&&(k+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const g=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let w=!1;const N=cn(s,!0);r!=="folded"&&e!==x.BLOCK_FOLDED&&(N.onOverflow=()=>{w=!0});const E=ln(`${v}${g}${m}`,c,jn,N);if(!w)return`>${k}
${c}${E}`}return t=t.replace(/\n+/g,`$&${c}`),`|${k}
${c}${v}${t}${m}`}function Ia(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return ft(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?ft(a,e):Zt(n,e,t,s);if(!o&&!u&&i!==x.PLAIN&&a.includes(`
`))return Zt(n,e,t,s);if(un(a)){if(l==="")return e.forceBlockIndent=!0,Zt(n,e,t,s);if(o&&l===c)return ft(a,e)}const d=a.replace(/\n+/g,`$&
${l}`);if(r){const p=h=>{var y;return h.default&&h.tag!=="tag:yaml.org,2002:str"&&((y=h.test)==null?void 0:y.test(d))},{compat:m,tags:b}=e.doc.schema;if(b.some(p)||m!=null&&m.some(p))return ft(a,e)}return o?d:ln(d,l,Xs,cn(e,!1))}function es(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==x.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=x.QUOTE_DOUBLE);const l=u=>{switch(u){case x.BLOCK_FOLDED:case x.BLOCK_LITERAL:return i||a?ft(r.value,e):Zt(r,e,t,s);case x.QUOTE_DOUBLE:return Ot(r.value,e);case x.QUOTE_SINGLE:return Kn(r.value,e);case x.PLAIN:return Ia(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:d}=e.options,p=i&&u||d;if(c=l(p),c===null)throw new Error(`Unsupported default string type ${p}`)}return c}function Zs(n,e){const t=Object.assign({blockQuote:!0,commentString:Na,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Aa(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(G(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Ta(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(G(n)||ee(n))&&n.anchor;a&&Ys(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function gt(n,e,t,s){var l;if(ne(n))return n.toString(e,t,s);if(nt(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=te(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Aa(e.doc.schema.tags,a));const r=Ta(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):G(a)?es(a,e,t,s):a.toString(e,t,s);return r?G(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ma({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:d}}=t;let p=te(n)&&n.comment||null;if(d){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(ee(n)||!te(n)&&typeof n=="object"){const N="With simple keys, collection cannot be used as a key value";throw new Error(N)}}let m=!d&&(!n||p&&e==null&&!t.inFlow||ee(n)||(G(n)?n.type===x.BLOCK_FOLDED||n.type===x.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(d||!a),indent:o+l});let b=!1,h=!1,y=gt(n,t,()=>b=!0,()=>h=!0);if(!m&&!t.inFlow&&y.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),y===""?"?":m?`? ${y}`:y}else if(a&&!d||e==null&&m)return y=`? ${y}`,p&&!b?y+=Ze(y,t.indent,c(p)):h&&i&&i(),y;b&&(p=null),m?(p&&(y+=Ze(y,t.indent,c(p))),y=`? ${y}
${o}:`):(y=`${y}:`,p&&(y+=Ze(y,t.indent,c(p))));let S,v,L;te(e)?(S=!!e.spaceBefore,v=e.commentBefore,L=e.comment):(S=!1,v=null,L=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&G(e)&&(t.indentAtStart=y.length+1),h=!1,!u&&l.length>=2&&!t.inFlow&&!m&&Bt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let k=!1;const g=gt(e,t,()=>k=!0,()=>h=!0);let w=" ";if(p||S||v){if(w=S?`
`:"",v){const N=c(v);w+=`
${He(N,t.indent)}`}g===""&&!t.inFlow?w===`
`&&L&&(w=`

`):w+=`
${t.indent}`}else if(!m&&ee(e)){const N=g[0],E=g.indexOf(`
`),T=E!==-1,R=t.inFlow??e.flow??e.items.length===0;if(T||!R){let $=!1;if(T&&(N==="&"||N==="!")){let F=g.indexOf(" ");N==="&"&&F!==-1&&F<E&&g[F+1]==="!"&&(F=g.indexOf(" ",F+1)),(F===-1||E<F)&&($=!0)}$||(w=`
${t.indent}`)}}else(g===""||g[0]===`
`)&&(w="");return y+=w+g,t.inFlow?k&&s&&s():L&&!k?y+=Ze(y,t.indent,c(L)):h&&i&&i(),y}function ei(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Kt="<<",Ke={identify:n=>n===Kt||typeof n=="symbol"&&n.description===Kt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new x(Symbol(Kt)),{addToJSMap:ti}),stringify:()=>Kt},Oa=(n,e)=>(Ke.identify(e)||G(e)&&(!e.type||e.type===x.PLAIN)&&Ke.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Ke.tag&&t.default));function ti(n,e,t){if(t=n&&nt(t)?t.resolve(n.doc):t,Bt(t))for(const s of t.items)Ln(n,e,s);else if(Array.isArray(t))for(const s of t)Ln(n,e,s);else Ln(n,e,t)}function Ln(n,e,t){const s=n&&nt(t)?t.resolve(n.doc):t;if(!Ft(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function ni(n,e,{key:t,value:s}){if(te(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Oa(n,t))ti(n,e,s);else{const i=Te(t,"",n);if(e instanceof Map)e.set(i,Te(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Pa(t,i,n),r=Te(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function Pa(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(te(n)&&(t!=null&&t.doc)){const s=Zs(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),ei(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function ts(n,e,t){const s=Pt(n,void 0,t),i=Pt(e,void 0,t);return new ye(s,i)}class ye{constructor(e,t=null){Object.defineProperty(this,Me,{value:qs}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return te(t)&&(t=t.clone(e)),te(s)&&(s=s.clone(e)),new ye(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return ni(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ma(this,e,t,s):JSON.stringify(this)}}function si(n,e,t){return(e.inFlow??n.flow?$a:xa)(n,e,t)}function xa({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const p=[];for(let b=0;b<e.length;++b){const h=e[b];let y=null;if(te(h))!d&&h.spaceBefore&&p.push(""),nn(t,p,h.commentBefore,d),h.comment&&(y=h.comment);else if(ne(h)){const v=te(h.key)?h.key:null;v&&(!d&&v.spaceBefore&&p.push(""),nn(t,p,v.commentBefore,d))}d=!1;let S=gt(h,u,()=>y=null,()=>d=!0);y&&(S+=Ze(S,a,c(y))),d&&y&&(d=!1),p.push(s+S)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let b=1;b<p.length;++b){const h=p[b];m+=h?`
${l}${h}`:`
`}}return n?(m+=`
`+He(c(n),l),o&&o()):d&&r&&r(),m}function $a({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const d=[];for(let b=0;b<n.length;++b){const h=n[b];let y=null;if(te(h))h.spaceBefore&&d.push(""),nn(e,d,h.commentBefore,!1),h.comment&&(y=h.comment);else if(ne(h)){const v=te(h.key)?h.key:null;v&&(v.spaceBefore&&d.push(""),nn(e,d,v.commentBefore,!1),v.comment&&(c=!0));const L=te(h.value)?h.value:null;L?(L.comment&&(y=L.comment),L.commentBefore&&(c=!0)):h.value==null&&(v!=null&&v.comment)&&(y=v.comment)}y&&(c=!0);let S=gt(h,l,()=>y=null);c||(c=d.length>u||S.includes(`
`)),b<n.length-1?S+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=d.reduce((v,L)=>v+L.length+2,2)+(S.length+2)>e.options.lineWidth)),c&&(S+=",")),y&&(S+=Ze(S,s,o(y))),d.push(S),u=d.length}const{start:p,end:m}=t;if(d.length===0)return p+m;if(!c){const b=d.reduce((h,y)=>h+y.length+2,2);c=e.options.lineWidth>0&&b>e.options.lineWidth}if(c){let b=p;for(const h of d)b+=h?`
${a}${i}${h}`:`
`;return`${b}
${i}${m}`}else return`${p}${r}${d.join(" ")}${r}${m}`}function nn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=He(e(s),n);t.push(a.trimStart())}}function et(n,e){const t=G(e)?e.value:e;for(const s of n)if(ne(s)&&(s.key===e||s.key===t||G(s.key)&&s.key.value===t))return s}class Ae extends Qs{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(ze,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(ts(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ne(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ye(e,e==null?void 0:e.value):s=new ye(e.key,e.value);const i=et(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);G(i.value)&&Js(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=et(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=et(this.items,e),i=s==null?void 0:s.value;return(!t&&G(i)?i.value:i)??void 0}has(e){return!!et(this.items,e)}set(e,t){this.add(new ye(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)ni(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ne(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),si(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const wt={collection:"map",default:!0,nodeClass:Ae,tag:"tag:yaml.org,2002:map",resolve(n,e){return Ft(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Ae.from(n,e,t)};class tt extends Qs{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(bt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=qt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=qt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&G(i)?i.value:i}has(e){const t=qt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=qt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];G(i)&&Js(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Te(a,String(i++),t));return s}toString(e,t,s){return e?si(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(Pt(o,void 0,s))}}return a}}function qt(n){let e=G(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const _t={collection:"seq",default:!0,nodeClass:tt,tag:"tag:yaml.org,2002:seq",resolve(n,e){return Bt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>tt.from(n,e,t)},dn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),es(n,e,t,s)}},fn={identify:n=>n==null,createNode:()=>new x(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new x(null),stringify:({source:n},e)=>typeof n=="string"&&fn.test.test(n)?n:e.options.nullStr},ns={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new x(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ns.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Fe({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const ii={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Fe},ai={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Fe(n)}},ri={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new x(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Fe},hn=n=>typeof n=="bigint"||Number.isInteger(n),ss=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function oi(n,e,t){const{value:s}=n;return hn(s)&&s>=0?t+s.toString(e):Fe(n)}const li={identify:n=>hn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ss(n,2,8,t),stringify:n=>oi(n,8,"0o")},ci={identify:hn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ss(n,0,10,t),stringify:Fe},ui={identify:n=>hn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ss(n,2,16,t),stringify:n=>oi(n,16,"0x")},Ra=[wt,_t,dn,fn,ns,li,ci,ui,ii,ai,ri];function Ss(n){return typeof n=="bigint"||Number.isInteger(n)}const Wt=({value:n})=>JSON.stringify(n),Fa=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Wt},{identify:n=>n==null,createNode:()=>new x(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Wt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Wt},{identify:Ss,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Ss(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Wt}],Ba={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Va=[wt,_t].concat(Fa,Ba),is={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=x.BLOCK_LITERAL),e!==x.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let d=0,p=0;d<c;++d,p+=l)u[d]=o.substr(p,l);o=u.join(e===x.BLOCK_LITERAL?`
`:" ")}return es({comment:n,type:e,value:o},s,i,a)}};function di(n,e){if(Bt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ne(s)){if(Ft(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ye(new x(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ne(s)?s:new ye(s)}}else e("Expected a sequence for this tag");return n}function fi(n,e,t){const{replacer:s}=t,i=new tt(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(ts(o,l,t))}return i}const as={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:di,createNode:fi};class mt extends tt{constructor(){super(),this.add=Ae.prototype.add.bind(this),this.delete=Ae.prototype.delete.bind(this),this.get=Ae.prototype.get.bind(this),this.has=Ae.prototype.has.bind(this),this.set=Ae.prototype.set.bind(this),this.tag=mt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ne(i)?(a=Te(i.key,"",t),r=Te(i.value,a,t)):a=Te(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=fi(e,t,s),a=new this;return a.items=i.items,a}}mt.tag="tag:yaml.org,2002:omap";const rs={collection:"seq",identify:n=>n instanceof Map,nodeClass:mt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=di(n,e),s=[];for(const{key:i}of t.items)G(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new mt,t)},createNode:(n,e,t)=>mt.from(n,e,t)};function hi({value:n,source:e},t){return e&&(n?mi:pi).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const mi={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new x(!0),stringify:hi},pi={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new x(!1),stringify:hi},Ua={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Fe},Da={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Fe(n)}},Ha={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new x(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Fe},Vt=n=>typeof n=="bigint"||Number.isInteger(n);function mn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function os(n,e,t){const{value:s}=n;if(Vt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Fe(n)}const ja={identify:Vt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>mn(n,2,2,t),stringify:n=>os(n,2,"0b")},Ka={identify:Vt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>mn(n,1,8,t),stringify:n=>os(n,8,"0")},qa={identify:Vt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>mn(n,0,10,t),stringify:Fe},Wa={identify:Vt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>mn(n,2,16,t),stringify:n=>os(n,16,"0x")};class pt extends Ae{constructor(e){super(e),this.tag=pt.tag}add(e){let t;ne(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ye(e.key,null):t=new ye(e,null),et(this.items,t.key)||this.items.push(t)}get(e,t){const s=et(this.items,e);return!t&&ne(s)?G(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=et(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ye(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(ts(r,null,s));return a}}pt.tag="tag:yaml.org,2002:set";const ls={collection:"map",identify:n=>n instanceof Set,nodeClass:pt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>pt.from(n,e,t),resolve(n,e){if(Ft(n)){if(n.hasAllNullValues(!0))return Object.assign(new pt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function cs(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function gi(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Fe(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const yi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>cs(n,t),stringify:gi},bi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>cs(n,!1),stringify:gi},pn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(pn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let d=cs(u,!1);Math.abs(d)<30&&(d*=60),c-=6e4*d}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},ks=[wt,_t,dn,fn,mi,pi,ja,Ka,qa,Wa,Ua,Da,Ha,is,Ke,rs,as,ls,yi,bi,pn],Es=new Map([["core",Ra],["failsafe",[wt,_t,dn]],["json",Va],["yaml11",ks],["yaml-1.1",ks]]),Ls={binary:is,bool:ns,float:ri,floatExp:ai,floatNaN:ii,floatTime:bi,int:ci,intHex:ui,intOct:li,intTime:yi,map:wt,merge:Ke,null:fn,omap:rs,pairs:as,seq:_t,set:ls,timestamp:pn},Ya={"tag:yaml.org,2002:binary":is,"tag:yaml.org,2002:merge":Ke,"tag:yaml.org,2002:omap":rs,"tag:yaml.org,2002:pairs":as,"tag:yaml.org,2002:set":ls,"tag:yaml.org,2002:timestamp":pn};function Nn(n,e,t){const s=Es.get(e);if(s&&!n)return t&&!s.includes(Ke)?s.concat(Ke):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Es.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Ke)),i.reduce((a,r)=>{const o=typeof r=="string"?Ls[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(Ls).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const Ga=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class us{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Nn(e,"compat"):e?Nn(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?Ya:{},this.tags=Nn(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,ze,{value:wt}),Object.defineProperty(this,Ue,{value:dn}),Object.defineProperty(this,bt,{value:_t}),this.sortMapEntries=typeof r=="function"?r:r===!0?Ga:null}clone(){const e=Object.create(us.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function za(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Zs(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(He(c,""))}let r=!1,o=null;if(n.contents){if(te(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(He(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=gt(n.contents,i,()=>o=null,c);o&&(u+=Ze(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(gt(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(He(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(He(a(c),"")))}return t.join(`
`)+`
`}class gn{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Me,{value:Hn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new ge({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(gn.prototype,{[Me]:{value:Hn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=te(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){rt(this.contents)&&this.contents.add(e)}addIn(e,t){rt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Gs(this);e.anchor=!t||s.has(t)?zs(t||"a",s):t}return new Zn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const y=v=>typeof v=="number"||v instanceof String||v instanceof Number,S=t.filter(y).map(String);S.length>0&&(t=t.concat(S)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:d,setAnchors:p,sourceObjects:m}=ka(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:d,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},h=Pt(e,u,b);return o&&ee(h)&&(h.flow=!0),p(),h}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ye(i,a)}delete(e){return rt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return At(e)?this.contents==null?!1:(this.contents=null,!0):rt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return ee(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return At(e)?!t&&G(this.contents)?this.contents.value:this.contents:ee(this.contents)?this.contents.getIn(e,t):void 0}has(e){return ee(this.contents)?this.contents.has(e):!1}hasIn(e){return At(e)?this.contents!==void 0:ee(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=tn(this.schema,[e],t):rt(this.contents)&&this.contents.set(e,t)}setIn(e,t){At(e)?this.contents=t:this.contents==null?this.contents=tn(this.schema,Array.from(e),t):rt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ge({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ge({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new us(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Te(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?dt(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return za(this,e)}}function rt(n){if(ee(n))return!0;throw new Error("Expected a YAML collection as document contents")}class vi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Tt extends vi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Ja extends vi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Ns=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function yt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,d="",p="",m=!1,b=!1,h=null,y=null,S=null,v=null,L=null,k=null,g=null;for(const E of n)switch(b&&(E.type!=="space"&&E.type!=="newline"&&E.type!=="comma"&&a(E.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),h&&(c&&E.type!=="comment"&&E.type!=="newline"&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),h=null),E.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&E.source.includes("	")&&(h=E),u=!0;break;case"comment":{u||a(E,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const T=E.source.substring(1)||" ";d?d+=p+T:d=T,p="",c=!1;break}case"newline":c?d?d+=E.source:(!k||t!=="seq-item-ind")&&(l=!0):p+=E.source,c=!0,m=!0,(y||S)&&(v=E),u=!0;break;case"anchor":y&&a(E,"MULTIPLE_ANCHORS","A node can have at most one anchor"),E.source.endsWith(":")&&a(E.offset+E.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),y=E,g??(g=E.offset),c=!1,u=!1,b=!0;break;case"tag":{S&&a(E,"MULTIPLE_TAGS","A node can have at most one tag"),S=E,g??(g=E.offset),c=!1,u=!1,b=!0;break}case t:(y||S)&&a(E,"BAD_PROP_ORDER",`Anchors and tags must be after the ${E.source} indicator`),k&&a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.source} in ${e??"collection"}`),k=E,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){L&&a(E,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),L=E,c=!1,u=!1;break}default:a(E,"UNEXPECTED_TOKEN",`Unexpected ${E.type} token`),c=!1,u=!1}const w=n[n.length-1],N=w?w.offset+w.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),h&&(c&&h.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:L,found:k,spaceBefore:l,comment:d,hasNewline:m,anchor:y,tag:S,newlineAfterProp:v,end:N,start:g??N}}function xt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(xt(e.key)||xt(e.value))return!0}return!1;default:return!0}}function Wn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&xt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function wi(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||G(a)&&G(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Cs="All mapping items must start at the same column";function Qa({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Ae,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const d of s.items){const{start:p,key:m,sep:b,value:h}=d,y=yt(p,{indicator:"explicit-key-ind",next:m??(b==null?void 0:b[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),S=!y.found;if(S){if(m&&(m.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(l,"BAD_INDENT",Cs)),!y.anchor&&!y.tag&&!b){c=y.end,y.comment&&(o.comment?o.comment+=`
`+y.comment:o.comment=y.comment);continue}(y.newlineAfterProp||xt(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=y.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Cs);t.atKey=!0;const v=y.end,L=m?n(t,m,y,i):e(t,v,p,null,y,i);t.schema.compat&&Wn(s.indent,m,i),t.atKey=!1,wi(t,o.items,L)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const k=yt(b??[],{indicator:"map-value-ind",next:h,offset:L.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(l=k.end,k.found){S&&((h==null?void 0:h.type)==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&y.start<k.found.offset-1024&&i(L.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const g=h?n(t,h,k,i):e(t,l,b,null,k,i);t.schema.compat&&Wn(s.indent,h,i),l=g.range[2];const w=new ye(L,g);t.options.keepSourceTokens&&(w.srcToken=d),o.items.push(w)}else{S&&i(L.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(L.comment?L.comment+=`
`+k.comment:L.comment=k.comment);const g=new ye(L);t.options.keepSourceTokens&&(g.srcToken=d),o.items.push(g)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function Xa({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??tt,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:d}of s.items){const p=yt(u,{indicator:"seq-item-ind",next:d,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||d)(d==null?void 0:d.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=p.end,p.comment&&(o.comment=p.comment);continue}const m=d?n(t,d,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&Wn(s.indent,d,i),l=m.range[2],o.items.push(m)}return o.range=[s.offset,l,c??l],o}function Ut(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Cn="Block collections are not allowed within flow collections",In=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Za({composeNode:n,composeEmptyNode:e},t,s,i,a){var y;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?Ae:tt),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let S=0;S<s.items.length;++S){const v=s.items[S],{start:L,key:k,sep:g,value:w}=v,N=yt(L,{flow:o,indicator:"explicit-key-ind",next:k??(g==null?void 0:g[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!g&&!w){S===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):S<s.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),N.comment&&(c.comment?c.comment+=`
`+N.comment:c.comment=N.comment),d=N.end;continue}!r&&t.options.strict&&xt(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(S===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${o} items`),N.comment){let E="";e:for(const T of L)switch(T.type){case"comma":case"space":break;case"comment":E=T.source.substring(1);break e;default:break e}if(E){let T=c.items[c.items.length-1];ne(T)&&(T=T.value??T.key),T.comment?T.comment+=`
`+E:T.comment=E,N.comment=N.comment.substring(E.length+1)}}if(!r&&!g&&!N.found){const E=w?n(t,w,N,i):e(t,N.end,g,null,N,i);c.items.push(E),d=E.range[2],In(w)&&i(E.range,"BLOCK_IN_FLOW",Cn)}else{t.atKey=!0;const E=N.end,T=k?n(t,k,N,i):e(t,E,L,null,N,i);In(k)&&i(T.range,"BLOCK_IN_FLOW",Cn),t.atKey=!1;const R=yt(g??[],{flow:o,indicator:"map-value-ind",next:w,offset:T.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(R.found){if(!r&&!N.found&&t.options.strict){if(g)for(const j of g){if(j===R.found)break;if(j.type==="newline"){i(j,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<R.found.offset-1024&&i(R.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else w&&("source"in w&&((y=w.source)==null?void 0:y[0])===":"?i(w,"MISSING_CHAR",`Missing space after : in ${o}`):i(R.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const $=w?n(t,w,R,i):R.found?e(t,R.end,g,null,R,i):null;$?In(w)&&i($.range,"BLOCK_IN_FLOW",Cn):R.comment&&(T.comment?T.comment+=`
`+R.comment:T.comment=R.comment);const F=new ye(T,$);if(t.options.keepSourceTokens&&(F.srcToken=v),r){const j=c;wi(t,j.items,T)&&i(E,"DUPLICATE_KEY","Map keys must be unique"),j.items.push(F)}else{const j=new Ae(t.schema);j.flow=!0,j.items.push(F);const z=($??T).range;j.range=[T.range[0],z[1],z[2]],c.items.push(j)}d=$?$.range[2]:R.end}}const p=r?"}":"]",[m,...b]=s.end;let h=d;if((m==null?void 0:m.source)===p)h=m.offset+m.source.length;else{const S=o[0].toUpperCase()+o.substring(1),v=u?`${S} must end with a ${p}`:`${S} in block collection must be sufficiently indented and end with a ${p}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",v),m&&m.source.length!==1&&b.unshift(m)}if(b.length>0){const S=Ut(b,h,t.options.strict,i);S.comment&&(c.comment?c.comment+=`
`+S.comment:c.comment=S.comment),c.range=[s.offset,h,S.offset]}else c.range=[s.offset,h,h];return c}function An(n,e,t,s,i,a){const r=t.type==="block-map"?Qa(n,e,t,s,a):t.type==="block-seq"?Xa(n,e,t,s,a):Za(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function er(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:b}=s,h=m&&a?m.offset>a.offset?m:a:m??a;h&&(!b||b.offset<h.offset)&&i(h,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Ae.tagName&&o==="map"||r===tt.tagName&&o==="seq")return An(n,e,t,i,r);let l=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!l){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),l=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),An(n,e,t,i,r)}const c=An(n,e,t,i,r,l),u=((p=l.resolve)==null?void 0:p.call(l,c,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??c,d=te(u)?u:new x(u);return d.range=c.range,d.tag=r,l!=null&&l.format&&(d.format=l.format),d}function tr(n,e,t){const s=e.offset,i=nr(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?x.BLOCK_FOLDED:x.BLOCK_LITERAL,r=e.source?sr(e.source):[];let o=r.length;for(let h=r.length-1;h>=0;--h){const y=r[h][1];if(y===""||y==="\r")o=h;else break}if(o===0){const h=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let y=s+i.length;return e.source&&(y+=e.source.length),{value:h,type:a,comment:i.comment,range:[s,y,y]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let h=0;h<o;++h){const[y,S]=r[h];if(S===""||S==="\r")i.indent===0&&y.length>l&&(l=y.length);else{y.length<l&&t(c+y.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=y.length),u=h,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=y.length+S.length+1}for(let h=r.length-1;h>=o;--h)r[h][0].length>l&&(o=h+1);let d="",p="",m=!1;for(let h=0;h<u;++h)d+=r[h][0].slice(l)+`
`;for(let h=u;h<o;++h){let[y,S]=r[h];c+=y.length+S.length+1;const v=S[S.length-1]==="\r";if(v&&(S=S.slice(0,-1)),S&&y.length<l){const k=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-S.length-(v?2:1),"BAD_INDENT",k),y=""}a===x.BLOCK_LITERAL?(d+=p+y.slice(l)+S,p=`
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
`}const b=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,b,b]}}function nr({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const b=Number(m);!r&&b?r=b:l===-1&&(l=n+p)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",d=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":c=!0;case"newline":d+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),d+=m.source.length;break;default:{const b=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",b);const h=m.source;h&&typeof h=="string"&&(d+=h.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function sr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function ir(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(p,m,b)=>t(s+p,m,b);switch(i){case"scalar":o=x.PLAIN,l=ar(a,c);break;case"single-quoted-scalar":o=x.QUOTE_SINGLE,l=rr(a,c);break;case"double-quoted-scalar":o=x.QUOTE_DOUBLE,l=or(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=Ut(r,u,e,t);return{value:l,type:o,comment:d.comment,range:[s,u,d.offset]}}function ar(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),_i(n)}function rr(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),_i(n.slice(1,-1)).replace(/''/g,"'")}function _i(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function or(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=lr(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=cr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=ur(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function lr(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const cr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function ur(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Si(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?tr(n,e,s):ir(e,n.options.strict,s),l=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[Ue]:l?c=dr(n.schema,i,l,t,s):e.type==="scalar"?c=fr(n,i,e,s):c=n.schema[Ue];let u;try{const d=c.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=G(d)?d:new x(d)}catch(d){const p=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",p),u=new x(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function dr(n,e,t,s,i){var o;if(t==="!")return n[Ue];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Ue])}function fr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[Ue];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[Ue];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function hr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const mr={composeNode:ki,composeEmptyNode:ds};function ki(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=pr(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Si(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=er(mr,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(d){const p=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return c??(c=ds(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!G(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function ds(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:hr(e,t,s),indent:-1,source:""},d=Si(n,u,o,c);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=l),d}function pr({options:n},{offset:e,source:t,end:s},i){const a=new Zn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Ut(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function gr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new gn(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=yt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?ki(c,i,u,r):ds(c,u.end,s,null,u,r);const d=l.contents.range[2],p=Ut(a,d,!1,r);return p.comment&&(l.comment=p.comment),l.range=[t,d,p.offset],l}function Nt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Is(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class yr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Nt(t);a?this.warnings.push(new Ja(r,s,i)):this.errors.push(new Tt(r,s,i))},this.directives=new ge({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Is(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(ee(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ne(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Is(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Nt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=gr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Tt(Nt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Tt(Nt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Ut(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Tt(Nt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new gn(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Ei="\uFEFF",Li="",Ni="",Yn="";function br(n){switch(n){case Ei:return"byte-order-mark";case Li:return"doc-mode";case Ni:return"flow-error-end";case Yn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function xe(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const As=new Set("0123456789ABCDEFabcdef"),vr=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Yt=new Set(",[]{}"),wr=new Set(` ,[]{}
\r	`),Tn=n=>!n||wr.has(n);class _r{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&xe(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Ei&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Li,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&xe(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!xe(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&xe(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Tn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&xe(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Ni,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Tn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||xe(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>xe(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield Yn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(xe(a)||e&&Yt.has(a))break;t=s}else if(xe(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Yt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Yt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Yn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Tn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(xe(t)||e&&Yt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!xe(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(vr.has(t))t=this.buffer[++e];else if(t==="%"&&As.has(this.buffer[e+1])&&As.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Sr{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Ye(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Ts(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Ci(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Gt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function ot(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Ms(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Ye(e.start,"explicit-key-ind")&&!Ye(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Ci(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class kr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new _r,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=br(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Ms(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Ts(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Ts(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Gt(this.peek(2)),s=ot(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ye(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Ci(t.key)&&!Ye(t.sep,"newline")){const o=ot(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ye(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=ot(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ye(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Ye(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Ye(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Gt(s),a=ot(i);Ms(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Gt(e),s=ot(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Gt(e),s=ot(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Er(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Sr||null,prettyErrors:e}}function Lr(n,e={}){const{lineCounter:t,prettyErrors:s}=Er(e),i=new kr(t==null?void 0:t.addNewLine),a=new yr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Tt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Ns(n,t)),r.warnings.forEach(Ns(n,t))),r}function qe(n,e,t){let s;const i=Lr(n,t);if(!i)return null;if(i.warnings.forEach(a=>ei(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Nr=`# Simulation family catalog source-of-truth.
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
`,Cr=`# Parameter definitions for each simulation family.
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
    primary: false
  impactor_velocity:
    label: Impact Speed
    description: How fast was the impactor travelling when it hit?  Faster collisions are more violent, ejecting more and hotter debris.
    unit: km/s
    min: 6.7
    max: 30
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
      unit: kpc
      display_format: float
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
`,Ar=`# Live telemetry HUD display configuration for each simulation family.
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
`;function se(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Tr=qe(Nr),Mr=qe(Cr),Mn=qe(Ir),Or=qe(Ar),lt=Object.entries(Tr).map(([n,e])=>{var r,o,l;const t=Pr(Mn[n]),s=(((r=Mn[n])==null?void 0:r.results)??[]).map(xr),i=((o=Or[n])==null?void 0:o.liveStats)??[],a=Mr[n]??{};return{id:n,label:e.label,placeholderImage:se(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(Gn),liveStats:i.map(Gn),morphologyChecklist:(l=Mn[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const d=u.quali_labels,p=d!==void 0&&d.length>0,m=p?0:u.min,b=p?d.length-1:u.max,h=p?1:u.step??$r(u.min,u.max),y=p?Math.floor(d.length/2):u.log_scale?Math.sqrt(u.min*u.max):Rr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:m,max:b,step:h,fallbackValue:y,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:d,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Pr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function Gn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function xr(n){return{...Gn(n),target:n.target}}function $r(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Rr(n,e){return n+(e-n)/2}const Ii="universe-engine-theme",Ai=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Fr(){const n=localStorage.getItem(Ii);return Vr(n)?n:"glass"}function On(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Ii,n)}function Br(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Ai){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function Vr(n){return Ai.some(e=>e.id===n)}let de=null,$e="primary";function Ur(n,e=null){de={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function Os(){de=null,$e="primary"}function Dr(n){$e=n}function Hr(n){return n==="local"?{mode:"local",base:null}:de?{mode:$e,base:Ti()}:{mode:"primary",base:null}}function Ve(n){if(!de)return n;const e=Ti();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!xs(t,de.primaryBase)&&(!de.backupBase||!xs(t,de.backupBase))?n:$s(e,`${t.pathname}${t.search}${t.hash}`)}return $s(e,n)}async function Ge(n,e){const t=Ve(n),s=!!(de!=null&&de.backupBase)&&$e==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Ps(n,e);return a.ok&&($e="backup"),a}catch(i){if(!s)throw i;const a=await Ps(n,e);return a.ok&&($e="backup"),a}}function Ti(){return de?$e==="backup"&&de.backupBase?de.backupBase:de.primaryBase:null}async function Ps(n,e){if(!(de!=null&&de.backupBase))throw new Error("Backup asset host is not configured.");const t=$e;$e="backup";try{const s=await fetch(Ve(n),e);return s.ok||($e=t),s}catch(s){throw $e=t,s}}function xs(n,e){const t=new URL(e);return n.origin===t.origin}function $s(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function jr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,d=new Map;let p=null,m=null;const b=document.createElement("canvas"),h=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let y=s.playbackRate;function S(){p&&(URL.revokeObjectURL(p),p=null)}function v(C,M={}){const U=u.get(C);U&&(u.delete(C),M={...M,ownedObjectUrl:!0},C=U),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(C)){s.classList.remove("fade-out");return}const V=s.muted,B=M.seekFraction;S(),m=null,p=M.ownedObjectUrl?C:null,s.src=C,s.load(),s.onloadeddata=()=>{if(s.muted=V,B!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const ue=Math.max(0,Math.min(.999,B));s.currentTime=ue*s.duration}else s.currentTime=0;s.playbackRate=y,s.classList.remove("fade-out"),M.autoplay&&s.play().catch(()=>{})}},120)}function L(C){s.muted=C}async function k(){await s.play()}function g(){s.pause()}function w(){s.classList.add("is-empty")}function N(){s.classList.remove("is-empty")}function E(C){if(!Number.isFinite(s.duration)||s.duration<=0)return;const M=Math.max(0,Math.min(1,C));s.currentTime=M*s.duration}function T(){s.currentTime=0,i==null||i(0)}function R(C=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(M=>{const U=()=>{B(),M()},V=window.setTimeout(()=>{B(),M()},Math.max(0,C));function B(){window.clearTimeout(V),s.removeEventListener("loadeddata",U)}s.addEventListener("loadeddata",U,{once:!0})})}function $(C,M=8e3){const U=Math.max(0,C);return U===0||F(U)?Promise.resolve():new Promise(V=>{const B=()=>{F(U)&&(D(),V())},ue=window.setTimeout(()=>{D(),V()},Math.max(0,M));function D(){window.clearTimeout(ue),s.removeEventListener("progress",B),s.removeEventListener("canplay",B),s.removeEventListener("loadeddata",B)}s.addEventListener("progress",B),s.addEventListener("canplay",B),s.addEventListener("loadeddata",B),B()})}function F(C){const M=s.currentTime;for(let U=0;U<s.buffered.length;U+=1){const V=s.buffered.start(U),B=s.buffered.end(U);if(!(M<V||M>B))return B-M>=C}return!1}function j(C){o=new Set(C.filter(Boolean).filter(M=>M!==s.currentSrc)),l||K()}function z(){l=!0,X(),be()}function Y(){if(!l){K();return}l=!1,K()}function K(){for(const[C,M]of c.entries())o.has(C)||(M.removeAttribute("src"),M.load(),c.delete(C));for(const[C,M]of d.entries())o.has(C)||(M.abort(),d.delete(C));for(const C of o){if(!c.has(C)){const M=document.createElement("video");M.preload="auto",M.muted=!0,M.playsInline=!0,M.src=Ve(C),M.load(),c.set(C,M)}u.has(C)||d.has(C)||Se(C)}}function X(){for(const C of c.values())C.removeAttribute("src"),C.load();c.clear()}function be(){for(const C of d.values())C.abort();d.clear()}function Se(C){const M=new AbortController;d.set(C,M);const U=`${C}?_=${Date.now()}`;Ge(U,{signal:M.signal}).then(async V=>{if(!V.ok)return;const B=await V.blob();o.has(C)&&u.set(C,URL.createObjectURL(B))}).catch(V=>{V instanceof DOMException&&V.name}).finally(()=>{d.get(C)===M&&d.delete(C)})}function ce(){o.clear(),l=!1,X(),be();for(const C of u.values())URL.revokeObjectURL(C);u.clear()}function ie(C){return u.get(C)??null}function ve(){!h||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(b.width=s.videoWidth,b.height=s.videoHeight,h.drawImage(s,0,0,b.width,b.height),m=b.toDataURL("image/jpeg",.85))}function fe(){return ve(),m}function ke(C){i=C}function J(C){a=C}return{setSource:v,setMuted:L,play:k,pause:g,hideMedia:w,showMedia:N,seekToFraction:E,resetPlayback:T,waitForLoadedData:R,waitForBufferedAhead:$,onTimeUpdate:ke,onEnded:J,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:C=>{y=C,s.playbackRate=C},getPlaybackRate:()=>y,onPlayStateChange:C=>{r=C},getElement:()=>t,prewarmSources:j,suspendPrewarming:z,resumePrewarming:Y,clearPrewarmedSources:ce,getPrewarmedBlobUrl:ie,captureFrame:fe}}const Kr=[.25,.5,1,2];function qr(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");u.className="timeline";const d=document.createElement("div");d.className="timeline__bar-row";const p=document.createElement("div");p.className="timeline__audio is-hidden";const m=document.createElement("button");m.className="timeline__audio-btn",m.type="button",m.setAttribute("aria-label","Toggle audio mute"),m.innerHTML=Wr(),m.addEventListener("click",()=>r==null?void 0:r()),p.appendChild(m);const b=document.createElement("button");b.className="timeline__play-btn",b.type="button",b.setAttribute("aria-label","Toggle playback"),b.addEventListener("click",()=>s==null?void 0:s());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const y=document.createElement("div");y.className="timeline__speed";const S=document.createElement("button");S.className="timeline__speed-btn",S.type="button",S.setAttribute("aria-label","Playback speed"),S.addEventListener("click",()=>{y.classList.toggle("open")});const v=document.createElement("div");v.className="timeline__speed-menu";for(const g of Kr){const w=document.createElement("button");w.className="timeline__speed-option",w.type="button",w.textContent=Pn(g),w.addEventListener("click",()=>{y.classList.remove("open"),i==null||i(g)}),v.appendChild(w)}y.appendChild(S),y.appendChild(v);const L=document.createElement("button");return L.className="timeline__summary-btn",L.type="button",L.setAttribute("aria-label","View run summary"),L.textContent="ⓘ",L.addEventListener("click",()=>a==null?void 0:a()),d.appendChild(p),d.appendChild(b),d.appendChild(h),d.appendChild(y),d.appendChild(L),h.addEventListener("input",()=>{const g=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${g*100}%`),t==null||t(g)}),h.addEventListener("pointerdown",()=>o==null?void 0:o()),h.addEventListener("pointerup",()=>l==null?void 0:l()),h.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",g=>{y.contains(g.target)||y.classList.remove("open")}),u.appendChild(d),n.appendChild(u),k(c),{setPosition(g){const w=Math.max(0,Math.min(1,g));h.value=String(Math.round(w*1e3)),h.style.setProperty("--fill",`${w*100}%`)},setPlaying(g){b.textContent=g?"⏸":"▶",b.classList.toggle("is-paused",!g),b.setAttribute("aria-label",g?"Pause":"Play")},setSpeed(g){k(g)},setAudioVisible(g){p.hidden=!g,p.classList.toggle("is-hidden",!g)},setMuted(g){m.classList.toggle("is-muted",g),m.setAttribute("aria-label",g?"Unmute audio":"Mute audio")}};function k(g){S.textContent=Pn(g);for(const w of v.children)w.classList.toggle("is-active",w.textContent===Pn(g))}}function Pn(n){return`x${n}`}function Wr(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function Yr(n,e){const t=Math.min(Mi(e),2);return n.toFixed(t)}function Re(n,e){return e?`${n} ${e}`:n}function $t(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?Ct(n):e<1e6?`${t}${Ct(n/1e3)}K`:e<1e9?`${t}${Ct(n/1e6)}M`:e<1e12?`${t}${Ct(n/1e9)}B`:`${t}${Ct(n/1e12)}T`:String(n)}function Ct(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Gr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function sn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return $t(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ht(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?$t(i):Yr(i,a)}function Mi(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function zr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=Jr(s,i,a);for(const o of s.metadata.liveStats){const l=Xr(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function Jr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":ht(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:Qr(a),value:r}]))}}function Qr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Xr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=Zr((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Re(a,n.unit)}}function Zr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?$t(Math.round(a)):$t(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):Gr(n,{integer:e.integer})}function eo(){const n=se("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(no()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function to(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function no(){return to(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const so={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function io(n,e,t){const s=se("assets/banner-1600.webp"),i=[`${se("assets/banner-960.webp")} 960w`,`${se("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(p){o.innerHTML="";for(const m of p){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const h=so[m.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${h}</span>
      `,b.addEventListener("click",()=>t(m)),o.appendChild(b)}}l(e);const{infoButton:c,infoModal:u,close:d}=eo();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){d(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(p){l(p)}}}function ao(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(k=>[k.id,k.target])),a=n.metadata.results.map(k=>{const g=$n(n,e,s,k.id);return g===null?null:{id:k.id,value:g,target:k.target}}).filter(k=>k!==null),r=n.parameters.filter(k=>i[k.id]!==void 0).map(k=>{const g=e[k.id]??k.fallbackValue,w=i[k.id]??k.fallbackValue;return Math.abs(g-w)/Math.max(k.max-k.min,1e-9)}),o=r.reduce((k,g)=>k+g,0)/Math.max(r.length,1),l=lo(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${xn(u,1)} CPU-hrs
${xn(d,1)} GB`,m=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,h=String(n.parameters.length+6),y="Present",S=oo((s==null?void 0:s.wallclockSeconds)??t),v=Rs(Fs($n(n,e,s,"moon_iron"))),L=Rs(Fs($n(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:S},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:xn(d,1)},particlesUpdated:{label:"Particle updates",value:s?ro(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:L},audioTrack:{label:"Audio Track",value:y},terminalLines:{label:"Terminal Lines",value:h},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([k,g])=>[k,{label:g.label,value:g.value}]))}}function ro(n){return String(Math.max(0,n))}function oo(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function xn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function $n(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Rs(n){return n===null?"--":n.toFixed(1)}function Fs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function lo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const zn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},co={HIDE_AFTER_MS:980},Oi="https://media.universemakers.org/engine/run-manifest.json",Rn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",uo="https://universe-engine.universe-engine.workers.dev/api/track-run",fo=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Bs=(()=>{const n=qe(fo),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),an="#4CD98A",Jn="#E8951C",Pi="#D7372A",xi=.2,$i=.5,Vs=2;function Ri(n){const e=Math.abs(n-1);return e<=xi?{word:"On target",colour:an}:e<=$i?{word:n>1?"Too high":"Too low",colour:Jn}:{word:n>1?"Way too high":"Way too low",colour:Pi}}function ho(n){const e=Math.abs(n-1),t=n>=1;return e<=xi?t?"greenHigh":"greenLow":e<=$i?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function mo(n){return Math.min(Math.max(n,0),Vs)/Vs*100}function po(n){return n>=85?{word:"Almost perfect",colour:an}:n>=65?{word:"Really close",colour:an}:n>=45?{word:"Getting there",colour:Jn}:n>=25?{word:"Not quite",colour:Jn}:{word:"Way off - try again",colour:Pi}}function go(n,e,t){var r,o;const s=ho(t),i=((r=Bs[n])==null?void 0:r[s])??((o=Bs[e])==null?void 0:o[s]);return i||(Ri(t).colour===an?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function yo(n,e,t){return n.metadata.results.map(s=>{const i=bo(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=vo(s,n,t),o=go(s.id,r,a),l=Re(Fi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function bo(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=wo((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function vo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function wo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function _o(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function So(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const d=document.createElement("button"),p=document.createElement("button");d.className="summary-overlay__button summary-overlay__button--primary",d.type="button",d.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),c.appendChild(d),c.appendChild(u),c.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const b=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__verdict"),y=m.querySelector(".sci-modal__body"),S=m.querySelector(".sci-modal__close"),v=new Set;let L=!1;function k(E){const T=Ri(E.value);b.textContent=E.label,h.textContent=T.word,h.style.color=T.colour,h.hidden=!1,y.textContent=E.detail,m.classList.remove("is-hidden")}function g(E,T){b.textContent=E,h.hidden=!0,y.textContent=T,m.classList.remove("is-hidden")}function w(){m.classList.add("is-hidden")}S.addEventListener("click",w),m.addEventListener("click",E=>{E.target===m&&w()}),t.addEventListener("click",E=>{E.target===t&&e.onReplay()});function N(E,T){const R=document.createElement("div");R.className=`${E.className} panel`,R.innerHTML=`<p class="sci-section__title">${E.title}</p>`;const $=document.createElement("div"),F=E.singleRow?Math.max(1,E.stats.length):Math.max(1,Math.min(E.stats.length,E.maxColumns));$.className="metric-grid",E.singleRow&&$.classList.add("metric-grid--single-row"),$.style.setProperty("--summary-grid-columns",String(F)),$.style.setProperty("--summary-grid-max-width",`${E.maxWidthRem}rem`);for(const j of E.stats){const z=ko(j,T),Y=document.createElement("div"),K=document.createElement("span"),X=document.createElement("span");Y.className="res-card",K.className="res-card__label",K.textContent=z.label,X.className="res-card__value",X.textContent=z.value,Y.appendChild(K),Y.appendChild(X),j.description&&(Y.classList.add("res-card--has-info"),Y.addEventListener("click",()=>{g(z.label,j.description)})),$.appendChild(Y)}return R.appendChild($),R}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,L&&(v.clear(),L=!1)},co.HIDE_AFTER_MS)},setHomeVisible(E){p.hidden=!E},update(E,T,R,$,F){var C,M,U,V,B,ue;r.innerHTML="",w();const j=ao(E,T,R,$),z=E.metadata.summaryStats,Y=yo(E,T,$),K=new Set(Y.map(D=>D.id));let X;if(Y.length>0)X=_o(Y);else{const D=((C=j.similarityScore)==null?void 0:C.value)??"0/100";X=parseInt(D,10)||0}const be=po(X),Se=document.createElement("div"),ce=document.createElement("div"),ie=document.createElement("div");Se.className="sci-top",ce.className="summary-main-column",ie.className="summary-side-column";const ve=document.createElement("div");ve.className="sci-hero panel",F?(ve.classList.add("sci-hero--thumbnail"),ve.innerHTML=`<img class="sci-hero__thumbnail" src="${F}" alt="Final frame of simulation" />`):ve.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${X}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${be.colour}">${be.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${X}%; background:${be.colour}; box-shadow:0 0 12px ${be.colour}"></div>
          </div>
        `,ce.appendChild(ve);const fe=z.filter(D=>(D.section??"resources")==="resources"&&!Y.some(ae=>ae.id===String(D.id))&&D.id!=="similarityScore"),ke=z.filter(D=>D.section==="simulationStats"&&!K.has(String(D.id)));fe.length>0&&ie.appendChild(N({title:"Resources Used",className:"res-section",stats:fe,maxColumns:3,maxWidthRem:48},j)),ke.length>0&&ie.appendChild(N({title:"Simulation Stats",className:"res-section",stats:ke,maxColumns:ke.length,maxWidthRem:48,singleRow:!0},j)),Se.appendChild(ce),ie.childElementCount>0&&Se.appendChild(ie),r.appendChild(Se);const J=E.metadata.morphologyChecklist;if(J&&J.length>0){const D=((U=(M=$==null?void 0:$.summaryMetrics)==null?void 0:M.morphology)==null?void 0:U.value)??null,ae=(D==null?void 0:D.toLowerCase())??null,re=new Set(J.map(O=>O.id));ae&&re.has(ae)&&v.add(ae);const H=document.createElement("div");H.className="sci-bottom-row";const Ee=document.createElement("div");Ee.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",Ee.appendChild(Us(E,T,g));const Le=((V=J.find(O=>O.id===ae))==null?void 0:V.label)??D;if(Le){const O=document.createElement("div");O.className="sci-section panel param-section";const Z=document.createElement("p");Z.className="sci-section__title",Z.textContent="Galaxy Morphology";const I=document.createElement("div");I.className="res-card res-card--has-info";const q=document.createElement("span");q.className="res-card__value",q.textContent=Le,I.appendChild(q),I.addEventListener("click",()=>{var Q;return g("Galaxy Morphology",((Q=J.find(W=>W.id===(D??"").toLowerCase()))==null?void 0:Q.description)??`This galaxy is classified as "${Le}".`)}),O.appendChild(Z),O.appendChild(I),Ee.appendChild(O)}H.appendChild(Ee);const we=document.createElement("div");we.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const me=((ue=(B=$==null?void 0:$.summaryMetrics)==null?void 0:B.description)==null?void 0:ue.value)??null;if(me){const O=document.createElement("div");O.className="sci-section panel",O.style.cssText="flex:0 1 auto; min-height:0; overflow-y:auto;";const Z=document.createElement("p");Z.className="sci-section__title",Z.textContent="About This Galaxy";const I=document.createElement("p");I.className="galaxy-summary__desc-text",I.textContent=me,O.appendChild(Z),O.appendChild(I),we.appendChild(O)}const he=document.createElement("div");he.className="sci-section panel",he.style.cssText="flex:1; min-height:0;";const We=document.createElement("p");We.className="sci-section__title",We.textContent="Morphology Scavenger Hunt";const Oe=document.createElement("div");Oe.className="galaxy-summary__checklist",Oe.style.cssText="flex:1; align-items:center;";const Ce=J.every(O=>v.has(O.id));for(const O of J){const Z=document.createElement("div");Z.className="galaxy-summary__check",v.has(O.id)&&Z.classList.add("is-found"),Z.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${v.has(O.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${O.label}</span>
          `,O.hint&&(Z.classList.add("res-card--has-info"),Z.addEventListener("click",()=>g(O.label,O.hint))),Oe.appendChild(Z)}if(he.appendChild(We),he.appendChild(Oe),Ce){L=!0;const O=document.createElement("div");O.className="galaxy-summary__done",O.textContent="★ Well done! You've discovered all the galaxy types! ★",he.appendChild(O)}we.appendChild(he),H.appendChild(we),r.appendChild(H)}else if(Y.length>0){const D=document.createElement("div");D.className="sci-bottom-row",D.appendChild(Us(E,T,g));const ae=document.createElement("div"),re=document.createElement("div"),H=document.createElement("p"),Ee=document.createElement("p");ae.className="sci-section panel",re.className="sci-section__header",H.className="sci-section__title",H.textContent="Similarity Results",Ee.className="sci-section__hint",Ee.textContent="Select any bar for details",re.appendChild(H),re.appendChild(Ee);const Le=document.createElement("div");Le.className="sci-bars";for(const we of Y){const me=document.createElement("div");me.className="sci-bar",me.innerHTML=`
            <div class="sci-bar__name">${we.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${mo(we.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${we.formattedValue}</div>
          `,me.addEventListener("click",()=>k(we)),Le.appendChild(me)}ae.appendChild(re),ae.appendChild(Le),D.appendChild(ae),r.appendChild(D)}}}}function ko(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Eo(s,n);if(i)return{label:n.label??t.label,value:i};const a=Fi(s,n);return{label:n.label??t.label,value:Re(a,n.unit)}}function Us(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const d=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":ht(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=Re(d,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Eo(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Re(sn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Re(sn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Re(n,e.unit)}function Fi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return sn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return sn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return $t(i)}function Lo(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=No(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Co()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function No(n){switch(n){case"dark-matter":return De(`
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
      `);case"turntable":return De(`
        <ellipse cx="12" cy="17.2" rx="7.6" ry="1.8"></ellipse>
        <path d="M12 6.2v6.4"></path>
        <path d="m12 6.2-2.6 2"></path>
        <path d="m12 6.2 2.6 2"></path>
        <path d="M12 12.6l-2.6-2"></path>
        <path d="M12 12.6l2.6-2"></path>
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
      `);case"line-trace":return De(`
        <path d="M3.5 14.5h3l2.2-5 2.8 9 2.4-6 1.8 2.5H20.5"></path>
        <path d="M3.5 19.5h17"></path>
        <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none"></circle>
        <circle cx="11.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"></circle>
      `);default:return null}}function De(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Co(){return De(`
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
`;function Ao(){const n=qe(Io);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function To(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:Mo(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const b=m.querySelector(".sci-modal__title"),h=m.querySelector(".sci-modal__body"),y=m.querySelector(".sci-modal__close");function S(k,g){b.textContent=k,h.textContent=g,m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}y.addEventListener("click",v),m.addEventListener("click",k=>{k.target===m&&v()});const L=document.createElement("div");L.className="parameter-editor__list";for(const k of u.parameters)L.appendChild(l(k,S));i.appendChild(L),c()}function l(u,d){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const h=u.displayUnit??u.unit,y=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,S=document.createElement("span");if(S.className="param-card__range",y){const w=u.qualiLabels;S.textContent=`${w[0]} – ${w[w.length-1]}`}else S.textContent=`${Re(ht(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)} – ${Re(ht(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}`;m.appendChild(b),m.appendChild(S);const v=document.createElement("input");v.className="param-card__slider",v.type="range";const L=r[u.id]??u.fallbackValue;if(y){const w=u.qualiLabels.length;v.min="0",v.max=String(w-1),v.step="any",v.value=String(Math.round(L))}else{const w=u.logScale?Math.log10(u.min):u.min,N=u.logScale?Math.log10(u.max):u.max;v.min=String(w),v.max=String(N),v.step=u.logScale?"0.001":String(u.step),v.value=String(u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L)}v.setAttribute("aria-label",u.label);const k=document.createElement("span");k.className="res-card__value";function g(w){if(y){const N=Math.round(w),E=u.qualiLabels;r[u.id]=N,v.style.setProperty("--fill",`${zt(w,0,E.length-1)}%`),k.textContent=E[N]??String(N)}else{const N=u.logScale?10**w:w;r[u.id]=N,v.value=String(w),v.style.setProperty("--fill",`${zt(w,parseFloat(v.min),parseFloat(v.max))}%`),k.textContent=Re(ht(N,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}c()}if(v.addEventListener("input",()=>{g(parseFloat(v.value))}),v.addEventListener("pointerdown",w=>w.stopPropagation()),v.addEventListener("click",w=>w.stopPropagation()),y){const w=Math.round(L),N=u.qualiLabels;v.style.setProperty("--fill",`${zt(w,0,N.length-1)}%`),k.textContent=N[w]??String(w)}else{const w=u.logScale?Math.log10(Math.max(L,Number.MIN_VALUE)):L;v.style.setProperty("--fill",`${zt(w,parseFloat(v.min),parseFloat(v.max))}%`),k.textContent=Re(ht(L,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),h)}if(u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const w=document.createElement("span");w.className="param-card__info-btn",w.setAttribute("aria-label","Parameter description"),w.textContent="ⓘ",m.appendChild(w),p.addEventListener("click",()=>{d(u.label,u.description)})}return p.appendChild(m),p.appendChild(v),p.appendChild(k),p}function c(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Mo(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function zt(n,e,t){return t===e?0:(n-e)/(t-e)*100}const Bi="universe-engine-advanced-settings",Oo="RSSSE26UM_Engine";function rn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function Po(n){const e=localStorage.getItem(Bi);if(!e)return rn();try{const t=JSON.parse(e);return Vi(t,n)}catch{return rn()}}function xo(n,e){const t=Vi(n,e);return localStorage.setItem(Bi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Vi(n,e){const t=rn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=$o(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function $o(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):rn().defaultAudioVolume}function Ro(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Fo(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const l=document.createElement("div");l.className="config-overlay__header";const c=document.createElement("div");c.className="config-overlay__title-block",c.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=c.querySelector(".config-overlay__eyebrow"),d=c.querySelector(".config-overlay__title"),p=c.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Back"),m.textContent="←",l.appendChild(c),l.appendChild(m);const b=document.createElement("section");b.className="config-overlay__section config-overlay__section--grow",b.dataset.section="parameters";const h=document.createElement("div");b.appendChild(h);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="settings",y.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const S=document.createElement("div");y.appendChild(S);const v=document.createElement("section");v.className="audio-settings",v.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const L=document.createElement("label");L.className="advanced-settings__field advanced-settings__field--inline";const k=document.createElement("input"),g=document.createElement("span");k.type="checkbox",k.className="advanced-settings__checkbox",g.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,L.appendChild(k),L.appendChild(g),v.appendChild(L);const w=document.createElement("label");w.className="advanced-settings__field",w.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const N=document.createElement("input"),E=document.createElement("span");N.type="range",N.min="0",N.max="100",N.step="1",N.className="audio-settings__slider",E.className="audio-settings__value",w.appendChild(N),w.appendChild(E),v.appendChild(w),y.appendChild(v);const T=document.createElement("section");T.className="advanced-settings",T.dataset.state="closed",T.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const R=document.createElement("button");R.className="advanced-settings__access",R.type="button",R.textContent="Advanced Settings",T.appendChild(R);const $=document.createElement("div");$.className="advanced-settings__auth";const F=document.createElement("input");F.className="advanced-settings__password",F.type="password",F.placeholder="Enter password",F.autocomplete="off";const j=document.createElement("button");j.className="advanced-settings__unlock",j.type="button",j.textContent="Unlock";const z=document.createElement("p");z.className="advanced-settings__message",$.appendChild(F),$.appendChild(j),$.appendChild(z),T.appendChild($);const Y=document.createElement("div");Y.className="advanced-settings__form";const K=document.createElement("label");K.className="advanced-settings__field",K.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const X=document.createElement("select");X.className="advanced-settings__select",X.appendChild(new Option("None",""));for(const I of e.availableScales)X.appendChild(new Option(I.label,I.id));K.appendChild(X),Y.appendChild(K);const be=document.createElement("div");be.className="advanced-settings__field",be.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const Se=document.createElement("div");Se.className="advanced-settings__options";const ce=document.createElement("label"),ie=document.createElement("input");ce.className="advanced-settings__choice",ie.type="radio",ie.name="manifest-source",ie.value="local",ce.appendChild(ie),ce.append("Local manifest");const ve=document.createElement("label"),fe=document.createElement("input");ve.className="advanced-settings__choice",fe.type="radio",fe.name="manifest-source",fe.value="online",ve.appendChild(fe),ve.append("Online manifest"),Se.appendChild(ce),Se.appendChild(ve),be.appendChild(Se),Y.appendChild(be);const ke=document.createElement("label");ke.className="advanced-settings__field advanced-settings__field--inline";const J=document.createElement("input"),C=document.createElement("span");J.type="checkbox",J.className="advanced-settings__checkbox",C.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,ke.appendChild(J),ke.appendChild(C),Y.appendChild(ke);const M=document.createElement("div");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const U=document.createElement("div");U.className="advanced-settings__options";const V=new Map;for(const I of e.availableScales){const q=document.createElement("label"),Q=document.createElement("input");q.className="advanced-settings__choice",Q.type="checkbox",Q.value=I.id,V.set(I.id,Q),q.appendChild(Q),q.append(`Show ${I.label}`),U.appendChild(q)}M.appendChild(U),Y.appendChild(M),T.appendChild(Y),y.appendChild(T);const B=document.createElement("section");B.className="config-overlay__section config-overlay__section--grow",B.dataset.section="credits",B.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const ue=B.querySelector("[data-credits]"),D=Ao();if(ue.innerHTML="",D.length===0){const I=document.createElement("div");I.className="credits-list__entry",I.textContent="To be credited...",ue.appendChild(I)}else for(const I of D)if(I.header){const q=document.createElement("div");q.className="credits-list__heading",q.textContent=I.text,ue.appendChild(q)}else{const q=document.createElement("div");q.className="credits-list__entry";const Q=document.createElement("span");if(Q.className="credits-list__text",I.url){const W=document.createElement("a");W.className="credits-list__link",W.href=I.url,W.target="_blank",W.rel="noopener noreferrer",W.textContent=I.text,Q.appendChild(W)}else Q.textContent=I.text;q.appendChild(Q),ue.appendChild(q)}const ae=document.createElement("div");ae.className="config-overlay__footer";const re=document.createElement("button");re.className="run-button",re.type="button",re.textContent="Run",ae.appendChild(re),o.appendChild(l),o.appendChild(b),o.appendChild(y),o.appendChild(B),o.appendChild(ae),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let H=It(e.advancedSettings),Ee="closed";const Le=To(h,e.simClass,e.values,e.onValuesChange),we=Br(S,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),R.addEventListener("click",()=>{if(Ee==="open"){Oe("closed");return}Oe("auth"),F.focus()}),j.addEventListener("click",We),F.addEventListener("keydown",I=>{I.key==="Enter"&&We()}),X.addEventListener("change",()=>{H.lockedScaleId=X.value||null,he()}),ie.addEventListener("change",()=>{ie.checked&&(H.manifestSource="local")}),fe.addEventListener("change",()=>{fe.checked&&(H.manifestSource="online")}),J.addEventListener("change",()=>{H.verboseLogging=J.checked}),k.addEventListener("change",()=>{H.audioMutedByDefault=k.checked}),N.addEventListener("input",()=>{H.defaultAudioVolume=Number(N.value)/100,Z()});for(const[I,q]of V.entries())q.addEventListener("change",()=>{if(Array.from(V.entries()).filter(([,W])=>W.checked).map(([W])=>W).length===0&&!H.lockedScaleId){q.checked=!0;return}H.hiddenScaleIds=Array.from(V.keys()).filter(W=>{var Be;return!((Be=V.get(W))!=null&&Be.checked)&&W!==H.lockedScaleId}),he()}),I===H.lockedScaleId&&(q.disabled=!0);me(e.initialView??"parameters"),he();function me(I){o.dataset.view=I,I==="parameters"?(u.textContent=e.simClass.label,d.textContent="Shape Your Simulation",p.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):I==="settings"?(u.textContent="Interface",d.textContent="Adjust The Control Room",p.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=se("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",d.textContent="Project Sources And Attribution",p.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=se("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),I==="settings"?re.textContent="Apply":I==="credits"?re.textContent="Close":re.textContent="Run Simulation"}function he(){X.value=H.lockedScaleId??"",ie.checked=H.manifestSource==="local",fe.checked=H.manifestSource==="online",J.checked=H.verboseLogging,k.checked=H.audioMutedByDefault,N.value=String(Math.round(H.defaultAudioVolume*100)),Z();for(const[I,q]of V.entries()){const Q=H.lockedScaleId===I;q.checked=Q||!H.hiddenScaleIds.includes(I),q.disabled=Q}}function We(){if(F.value!==Oo){z.textContent="Incorrect password";return}F.value="",z.textContent="",Oe("open")}function Oe(I){Ee=I,T.dataset.state=I,R.textContent=I==="open"?"Hide Advanced Settings":"Advanced Settings",I!=="auth"&&(z.textContent="")}function Ce(){F.value="",z.textContent="",Oe("closed")}function O(){H=It(e.advancedSettings),he()}function Z(){E.textContent=`${Math.round(Number(N.value))}%`}return re.addEventListener("click",()=>{const I=o.dataset.view;if(I==="settings"){e.onApplySettings(It(H));return}if(I==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),O(),Ce()},setSimulation(I,q){e.simClass=I,a.dataset.simClass=I.id,Le.setSimClass(I,q),o.dataset.view==="parameters"&&(r.src=I.placeholderImage,r.alt=`${I.label} preview`,me("parameters"))},setTheme(I){we.setActive(I)},setView(I){me(I),I!=="settings"&&Ce()},setAdvancedSettings(I){e.advancedSettings=It(I),H=It(I),he(),Ce()}}}function It(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function Bo(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=zn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const b of l)window.clearTimeout(b);l=[]}function d(b,h){return new Promise(y=>{const S=window.setTimeout(()=>{h===c&&y()},Math.max(0,b));l.push(S)})}async function p(b,h){const y=document.createElement("div");y.className="terminal__line";const S=m();y.appendChild(S),o.appendChild(y);for(let v=0;v<b.length;v+=1){if(h!==c)return;const L=b[v];y.insertBefore(document.createTextNode(L),S),o.scrollTop=o.scrollHeight,await d(e,h)}S.remove()}function m(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,h,y,S){u(),c+=1;const v=c;i.hidden=!1,i.classList.remove("is-hidden");const L=performance.now(),k=(S==null?void 0:S.minTerminalTimeMs)??t;let g=!y,w=[...b];y&&y.then(()=>{g=!0});let N=0;for(;v===c;){w.length===0&&(w=[...b]);const T=Math.floor(Math.random()*w.length),[R]=w.splice(T,1),$=`${Ds(N)} ${R.text}`;if(N+=1,await p($,v),v!==c)return;if(performance.now()-L>=k&&g)break}if(v!==c)return;const E=document.createElement("div");E.className="terminal__line terminal__line--syncing",E.textContent=`${Ds(N)} STARTING SIMULATION...`,o.appendChild(E),o.scrollTop=o.scrollHeight,await d(s,v),v===c&&h()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Ds(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Fn(t)}:${Fn(s)}:${Fn(i)}]`}function Fn(n){return String(n).padStart(2,"0")}function Vo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=l("Home",()=>{c(),e.onHome()});s.appendChild(a),s.appendChild(l("Settings",()=>{c(),e.onViewSelected("settings")})),s.appendChild(l("Credits",()=>{c(),e.onViewSelected("credits")}));const r=l("Fullscreen",()=>{var d;c(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||c()}),u(e.showHome??!0),{close:c,setHomeVisible:u};function l(d,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,m.addEventListener("click",p),m}function c(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const Ui="universe-engine-playback-speed",Uo=new Set([.25,.5,1,2]);function Do(){const n=localStorage.getItem(Ui),e=n?Number(n):NaN;return Uo.has(e)?e:1}function Ho(n){localStorage.setItem(Ui,String(n))}async function Bn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function jo(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const Ko=`# Initialization terminal script for the Planetary simulation family.
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
`,qo=`# Initialization terminal script for the Galaxy simulation family.
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
`,Wo=`# Initialization terminal script for the Cosmos simulation family.
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
`,Yo={planetary:Ko,galaxy:qo,cosmos:Wo};function Go(n){return qe(Yo[n.id]).map(t=>({text:t}))}function Rt(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var d;const l=t[o.id]??o.fallbackValue,c=((d=n.parameters)==null?void 0:d[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function zo(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(c=>c.primary!==!1).map(c=>c.id));if(!e.some(c=>c.primary===!1))return Vn(n,e,t);const a=Vn(n,e,t,s);if(!a)return null;const r=Rt(a,e,t,s),o=1e-6,l=n.filter(c=>{const u=Rt(c,e,t,s);return Math.abs(u-r)<=o});return Vn(l,e,t)}function Vn(n,e,t,s){if(n.length===0)return null;let i=n[0],a=Rt(i,e,t,s);for(const r of n.slice(1)){const o=Rt(r,e,t,s);o<a&&(i=r,a=o)}return i}function Jo(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function Qo(n){try{const e=await Ge(n);if(!e.ok)return null;const t=await e.text(),s=qe(t),i=ct(s.wallclockSeconds),a=ct(s.computeUsed),r=ct(s.memoryUsed),o=ct(s.carbonBurnt),l=ct(s.particlesUpdated),c=await Xo(n),u=el(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function Xo(n){try{const e=await Ge(Zo(n));if(!e.ok)return{};const t=await e.text(),s=qe(t);return tl(s)}catch{return{}}}function Zo(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function ct(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function el(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function tl(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=ct(s);i!==null&&(e[t]=i)}return e}const Di="[UniverseEngine]";let Hi=!1;function Hs(n){Hi=n}function ji(){return Hi}function le(n,e){ji()&&console.info(Di,n,e??"")}function je(n,e){ji()&&console.warn(Di,n,e??"")}const nl={local:"assets/local-manifest.json",online:Oi};function sl(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),Os(),e=s,le("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await qi(e,t)},async findNearestVideo(s,i,a){const r=await rl(e,t,s,i,a);if(r)return r;const o=Ki(s);return je("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:il(s),summaryUrl:Jo(o)}}}}function Ki(n){switch(n){case"planetary":return se("assets/planet_test.mp4");case"galaxy":return se("assets/galaxy_test.mp4");case"cosmos":return se("assets/cosmo_test.mp4");default:return se("assets/galaxy_test.mp4")}}function il(n){switch(n){case"planetary":return se("assets/planet_test_planetary_stats.csv");case"galaxy":return se("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return se("assets/cosmo_test_cosmos_stats.csv");default:return se("assets/galaxy_test_galaxy_stats.csv")}}async function qi(n,e){const t=e.get(n);if(t)return t;const s=nl[n],i=(n==="online"?al(s):fetch(se(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return le("Loaded manifest",{source:n,manifestPath:s}),await a.json()})).catch(a=>(je("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function al(n){const e=[n,Rn];for(const t of e)try{const s=await fetch(t);if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??js(Oi),r=i.backupBase??js(Rn);return Ur(a,r),t===Rn&&Dr("backup"),le("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function rl(n,e,t,s,i){const r=(await qi(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return je("No manifest runs found for simulation",{simClassId:t,source:n}),null;const o=zo(r,s,i);if(!o)return null;const l=Rt(o,s,i),c=o.defaultView??Object.keys(o.views)[0],u=o.views[c];return u?(le("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:l,viewId:c}),{url:Jt(n,u),liveDataUrl:Jt(n,o.liveDataPath),summaryUrl:Jt(n,o.summaryPath),viewId:c,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,p])=>[d,Jt(n,p)]))}):null}function Jt(n,e){return n==="local"?se(e):Ve(e)}function js(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const en={mode:"time",frames:[]};async function ol(n){const e=await Ge(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return ul(t)}function ll(n,e,t=0){if(n.mode==="row")return dl(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=cl(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return fl(r.values,o.values,l)}function cl(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function ul(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return en;const t=Un(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Un(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Un(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function dl(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Un(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function fl(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=hl(u);continue}i[a]=t<.5?r:o}return i}function hl(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ml(n){pl(uo,n)}function pl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){le("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?le("Run selection tracked",{simulationId:e.simulationId}):je("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{je("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const Ks=50*1024*1024,gl=8,yl=6e3,bl=8e3,vl=5e3,wl=1200,_l=100,Dn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Sl(n){const e=lt.map(f=>f.id);let t=Po(e),s=vs(t);const i=sl(t.manifestSource),a=jo();Hs(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=ws(t.lockedScaleId)??s[0]??lt[0],o=t.lockedScaleId?Dn[r.id]:Fr(),l=!1,c=null,u=null,d=!1,p=t.audioMutedByDefault,m=t.defaultAudioVolume,b=0,h=null,y=0,S=en,v=!1;const L=Object.fromEntries(lt.map(f=>[f.id,ia(f)]));On(o);const k=Ki(r.id),g=jr(n,k),w=document.createElement("audio");w.preload="auto",w.hidden=!0,w.setAttribute("playsinline","true"),w.muted=p,w.volume=m,n.appendChild(w);const N=document.createElement("div");N.className="display-chrome",N.classList.add("is-hidden"),n.appendChild(N);const E=document.createElement("div");E.className="orientation-overlay",E.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(E);const T=document.createElement("div");T.className="swift-logo",T.innerHTML=`
    <img
      class="swift-logo__image"
      src="${se("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(T);const R=document.createElement("div");R.className="synth-logo is-hidden",R.innerHTML=`
    <img
      class="synth-logo__image"
      src="${se("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(R);const $=document.createElement("img");$.className="app-partner-logo",$.src=se("assets/dirac-hpc-white.webp"),$.alt="DIRAC HPC",$.decoding="async",n.appendChild($);const F=document.createElement("div");F.className="display-chrome__top-left is-hidden",n.appendChild(F);const j=Vo(F,{onHome(){wn()},onViewSelected(f){if(f==="credits"){Ht("credits");return}Ht(f)},showHome:!t.lockedScaleId}),z=document.createElement("div");z.className="display-chrome__left-center",N.appendChild(z);const Y=Lo(z,{onSelect(f){gs(f)},onInfo(f,_,A){X.textContent=_,be.textContent=A,K.classList.add("is-visible")}}),K=document.createElement("div");K.className="view-info-overlay",K.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(K);const X=K.querySelector(".view-info-overlay__title"),be=K.querySelector(".view-info-overlay__text"),Se=K.querySelector(".view-info-overlay__close");K.addEventListener("click",f=>{f.target===K&&K.classList.remove("is-visible")}),Se.addEventListener("click",()=>{K.classList.remove("is-visible")});const ce=document.createElement("div");ce.className="display-chrome__top-center is-hidden",N.appendChild(ce);const ie=document.createElement("div");ie.className="display-chrome__top-right",N.appendChild(ie);const ve=zr(ie),fe=document.createElement("div");fe.className="display-chrome__center-status",fe.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,N.appendChild(fe);const ke=Do();g.setPlaybackRate(ke);const J=document.createElement("div");J.className="display-chrome__bottom",N.appendChild(J);const C=qr(J,{onChange(f){H(f)},onTogglePlay:ps,onAudioToggle:Qi,onSpeedChange:Xi,onSummaryClick:Ji,onScrubStart(){We(),re()},onScrubEnd(){Oe(),g.isPaused()||ae()},initialSpeed:ke});C.setPlaying(!g.isPaused()),C.setAudioVisible(!1),C.setMuted(p),w.addEventListener("loadedmetadata",()=>{at(!0),Ne()});let M=null,U=null,V=null,B=!1,ue=null,D=0;function ae(){if(M!==null)return;function f(){const _=g.getPlaybackFraction();C.setPosition(_),g.isPaused()?M=null:M=requestAnimationFrame(f)}M=requestAnimationFrame(f)}function re(){M!==null&&(cancelAnimationFrame(M),M=null)}function H(f){U=f,V===null&&(V=requestAnimationFrame(()=>{if(V=null,U===null)return;const _=U;U=null,g.seekToFraction(_),at(!0)}))}function Ee(){if(U===null)return;V!==null&&(cancelAnimationFrame(V),V=null);const f=U;U=null,g.seekToFraction(f),at(!0)}function Le(){ue!==null&&(window.clearTimeout(ue),ue=null)}function we(){if(!(h!=null&&h.views))return[];const f=it(r,h);return Object.entries(h.views).filter(([_])=>_!==f).map(([,_])=>Ve(_)).filter(Boolean)}function me(){Le(),g.suspendPrewarming()}function he(f=wl){Le(),!(B||g.isPaused())&&(ue=window.setTimeout(()=>{ue=null,!(B||g.isPaused())&&(g.resumePrewarming(),g.prewarmSources(we()))},Math.max(0,f)))}function We(){B=!0,D=0,me(),Ne()}function Oe(){B=!1,D=0,Ee(),y=g.getPlaybackFraction()*g.getDurationSeconds(),Qe(y),he(),Ne()}g.onPlayStateChange(f=>{C.setPlaying(!f),f?(re(),me()):(ae(),he(0)),Ne()}),g.onTimeUpdate(f=>{if(y=f*g.getDurationSeconds(),B){const _=performance.now();if(_-D<_l)return;D=_}Qe(y),at()});const Ce=document.createElement("div");Ce.className="overlay-layer",n.appendChild(Ce);const O=So(Ce,{onReplay:zi,onParameters:()=>Ht("parameters"),onHome:wn,showHome:!t.lockedScaleId});g.onEnded(()=>{l=!0;const f=g.captureFrame();O.update(r,Ie(),g.getDurationSeconds(),c,f),O.show(),Ne()});const Z=io(Ce,s,f=>{ms(f),Ht("parameters")}),I=Fo(Ce,{simClass:r,values:Ie(),theme:o,advancedSettings:t,availableScales:lt,onValuesChange:Wi,onThemeChange:vn,onRun:()=>{le("Parameters submitted — starting run",{simClassId:r.id}),Zi().catch(f=>{je("Run failed to start",{simClassId:r.id,error:f instanceof Error?f.message:String(f)})})},onApplySettings:Yi,onClose:Gi,initialView:"parameters"}),q=Bo(Ce);C.setPosition(0),Qe(),O.hide();const Q=new WeakMap,W=f=>{const _=Q.get(f);_&&(clearTimeout(_),Q.delete(f)),f.classList.remove("side-collapsed")},Be=f=>{const _=Q.get(f);_&&clearTimeout(_),Q.set(f,setTimeout(()=>{f.classList.add("side-collapsed"),Q.delete(f)},2500))},yn=f=>{const _=Q.get(f);_&&(clearTimeout(_),Q.delete(f)),f.classList.add("side-collapsed")},bn=(f,_)=>{const A=_.isCollapsible??(()=>!0);f.addEventListener("mouseenter",()=>W(f)),f.addEventListener("mouseleave",()=>{if(!A()){W(f);return}Be(f)}),f.addEventListener("focusin",()=>W(f)),f.addEventListener("focusout",P=>{if(!f.contains(P.relatedTarget)){if(!A()){W(f);return}Be(f)}}),f.addEventListener("click",()=>{if(!A()){W(f);return}if(f.classList.contains("side-collapsed")){W(f),Be(f);return}_.toggleOnClick?yn(f):Be(f)}),A()?yn(f):W(f)};bn(F,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),bn(z,{toggleOnClick:!0}),bn(J,{toggleOnClick:!1});let St=0,st=null,Dt=0;const fs=()=>{st!==null&&(cancelAnimationFrame(st),st=null)},hs=()=>{if(st!==null)return;Dt=g.getPlaybackFraction();const f=()=>{if(St===0){fs();return}const A=12*(1/60)/Math.max(g.getDurationSeconds(),1);Dt=Math.max(0,Math.min(1,Dt+St*A)),g.seekToFraction(Dt),st=requestAnimationFrame(f)};st=requestAnimationFrame(f)};document.addEventListener("keydown",f=>{if(n.dataset.mode==="display"&&!(f.target instanceof HTMLInputElement||f.target instanceof HTMLTextAreaElement))switch(f.key){case"Escape":f.preventDefault(),K.classList.contains("is-visible")?K.classList.remove("is-visible"):wn();break;case" ":f.preventDefault(),ps();break;case"ArrowLeft":f.preventDefault(),W(J),Be(J),St=-1,hs();break;case"ArrowRight":f.preventDefault(),W(J),Be(J),St=1,hs();break;case"ArrowUp":case"ArrowDown":{if(f.preventDefault(),W(z),Be(z),!(h!=null&&h.views)||Object.keys(h.views).length<=1)break;const _=r.views.filter(pe=>{var _e;return((_e=h==null?void 0:h.views)==null?void 0:_e[pe.id])!==void 0});if(_.length<=1)break;const A=h.viewId??it(r,h),P=_.findIndex(pe=>pe.id===A),oe=f.key==="ArrowUp"?(P-1+_.length)%_.length:(P+1)%_.length;gs(_[oe].id);break}}}),document.addEventListener("keyup",f=>{(f.key==="ArrowLeft"||f.key==="ArrowRight")&&(St=0,fs())}),g.hideMedia(),g.pause(),Je(t.lockedScaleId?"config":"entry");function ms(f){f.id===r.id&&v||(r=f,kn(),vn(Dn[f.id]),I.setSimulation(r,Ie()),C.setPosition(0),Qe(),Sn(),_n())}function Wi(f){L[r.id]={...f},le("Parameter values updated",{simClassId:r.id,values:L[r.id]}),Qe()}function vn(f){o=f,On(f),I.setTheme(f)}function Ht(f){f==="parameters"&&I.setSimulation(r,Ie()),I.setView(f),Je("config")}function Yi(f){if(ga(f),v){O.hide(),Je("display");return}I.setSimulation(r,Ie()),I.setView("parameters")}function Gi(){if(O.hide(),!v&&t.lockedScaleId){I.setSimulation(r,Ie()),I.setView("parameters");return}Je(v?"display":"entry")}function wn(){t.lockedScaleId||(le("Returning to home screen",{simClassId:r.id}),kn(),v=!1,g.hideMedia(),Je("entry"))}function zi(){l=!1,O.hide(),g.getPlaybackFraction()>=.999&&(g.resetPlayback(),at(!0)),Bn(g),Ne()}function Ji(){l=!0,g.pause();const f=c?g.captureFrame():null;O.update(r,Ie(),g.getDurationSeconds(),c,f),O.show(),Ne()}function ps(){g.isPaused()?Bn(g):g.pause()}function Qi(){p=!p,Ne()}function Xi(f){g.setPlaybackRate(f),Ho(f),C.setSpeed(f)}async function Zi(){const f=Ie(),_=a.start();le("Run requested",{simClassId:r.id,values:f,manifestSource:i.getSource()});const A=await i.findNearestVideo(r.id,r.parameters,f);if(!a.isCurrent(_))return;kn({preserveRunRequest:!0}),h=A;const P=it(r,A),oe=Hr(i.getSource());ml({simulationId:r.id,parameters:f,manifestSource:i.getSource(),matchedRunId:A.runId,assetHostMode:oe.mode,assetHostBase:oe.base});const pe=ca(A,P)??A.url,_e=Object.entries(A.views??{}).filter(([Pe])=>Pe!==P).map(([,Pe])=>Pe);ra(A.liveDataUrl,_),oa(A.summaryUrl,_),da(A.summaryUrl,_),g.setMuted(!0),Sn(P),Et(),Je("initializing");const jt=ea(pe);g.resumePrewarming(),g.prewarmSources(_e);const Lt=(async()=>{const Pe=await jt;a.isCurrent(_)&&(le(`Prepared active video source: ${Pe.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:pe,waitsForBuffer:Pe.shouldWaitForBuffer}),g.setSource(Pe.src,{ownedObjectUrl:Pe.ownedObjectUrl}),g.pause(),await g.waitForLoadedData(bl),a.isCurrent(_)&&Pe.shouldWaitForBuffer&&await g.waitForBufferedAhead(gl,yl))})();await new Promise(Pe=>{q.show(Go(r),Pe,Lt,{minTerminalTimeMs:ma()})}),a.isCurrent(_)&&(v=!0,g.showMedia(),Bn(g),Je("display"),Ne())}async function ea(f){const _=Ve(f),A=await ta(f);if(A!==null&&A>0&&A<=Ks){le("Downloading active video behind loading overlay",{videoUrl:_,contentLength:A});try{const P=await Ge(f);if(!P.ok)throw new Error(`Failed to download active video: ${_}`);const oe=await P.blob();return le(`Active video full fetch complete: ${oe.size} bytes`,{videoUrl:Ve(f),blobType:oe.type}),{src:URL.createObjectURL(oe),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(P){je(`Full-fetch FAILED; falling back to progressive: ${P instanceof Error?P.message:String(P)}`,{videoUrl:f})}}return A!==null?le("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:f,contentLength:A,fullFetchMaxBytes:Ks}):le("Could not determine active video size; using progressive load",{videoUrl:f}),le("Using progressive active video load",{videoUrl:f}),{src:Ve(f),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ta(f){try{const _=await Ge(f,{headers:{Range:"bytes=0-0"}});le("Probed active video size with range request",{videoUrl:f,ok:_.ok,status:_.status,contentLength:_.headers.get("Content-Length"),contentRange:_.headers.get("Content-Range")});const A=sa(_.headers.get("Content-Length"));if(A!==null)return A;const P=na(_.headers.get("Content-Range"));return P!==null?P:null}catch(_){return je("Could not probe active video size",{videoUrl:f,error:_ instanceof Error?_.message:String(_)}),null}}function na(f){if(!f)return null;const _=f.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!_)return null;const A=Number(_[1]);return Number.isFinite(A)&&A>0?A:null}function sa(f){if(!f)return null;const _=Number(f);return Number.isFinite(_)?_:null}function Je(f){if(n.dataset.mode=f,f==="entry"?document.documentElement.setAttribute("data-theme","glass"):f==="display"&&On(o),kt(N,f==="display"||f==="config"),kt(T,f==="display"||f==="entry"),kt(F,!t.lockedScaleId&&(f==="entry"||f==="config"||f==="display")),f==="entry"?W(F):yn(F),f==="entry"&&!t.lockedScaleId?Z.show():Z.hide(),f==="config"?(q.hide(),I.setSimulation(r,Ie()),I.show()):I.hide(),f!=="display")O.hide();else if(l){const A=g.captureFrame();O.update(r,Ie(),g.getDurationSeconds(),c,A),O.show()}!v||f==="initializing"?(g.hideMedia(),f==="initializing"&&g.pause()):g.showMedia(),f!=="initializing"&&q.hide(),_n(),Ne()}function _n(){if(n.dataset.mode==="entry"){kt(R,!0);return}const f=n.dataset.mode==="display",_=r.id==="galaxy";kt(R,f&&_)}function Qe(f=0){const _=ll(S,f,g.getDurationSeconds()),A=la(r,c,f,g.getDurationSeconds());ve.update(r,Ie(),{..._,...A})}function Sn(f){const _=r.views.filter(oe=>{var pe;return((pe=h==null?void 0:h.views)==null?void 0:pe[oe.id])!==void 0});if(_.length<=1){Y.hide(),ce.classList.add("is-hidden");return}const A=f??it(r,h),P=_.find(oe=>oe.id===A);Y.update(_,A),P?(ce.classList.remove("is-hidden"),ce.innerHTML=`<span class="viewport-title">${P.label??P.id}</span>`):ce.classList.add("is-hidden")}function kn(f={}){f.preserveRunRequest||a.invalidate(),S=en,l=!1,c=null,h=null,y=0,B=!1,U=null,Le(),V!==null&&(cancelAnimationFrame(V),V=null),O.hide(),Y.hide(),g.pause(),w.pause(),g.clearPrewarmedSources(),g.resetPlayback(),C.setPosition(0),bs()}function gs(f){if(!(h!=null&&h.views)||f===it(r,h))return;const _=Ve(h.views[f]);if(!_)return;h.viewId=f;const A=!g.isPaused()&&!l,P=l?0:g.getPlaybackFraction();l=!1,O.hide(),g.setSource(_,{seekFraction:P,autoplay:A}),g.prewarmSources(we()),A&&!B?he():me(),Sn(f),Et(),Ne(),K.classList.remove("is-visible"),_n()}function Ie(){return{...L[r.id]}}function ia(f){return Object.fromEntries(f.parameters.map(_=>[_.id,aa(_)]))}function aa(f){if(f.logScale){const pe=Math.log10(f.min),_e=Math.log10(f.max);return 10**(pe+Math.random()*(_e-pe))}const _=Math.max(0,Math.round((f.max-f.min)/f.step)),A=Math.floor(Math.random()*(_+1)),P=f.min+A*f.step,oe=Mi(f.step);return Number(P.toFixed(oe))}async function ra(f,_){let A=en;try{A=await ol(f)}catch(P){je("Failed to load live stats",{url:f,error:P instanceof Error?P.message:String(P)})}a.isCurrent(_)&&(S=A,Qe())}async function oa(f,_){const A=await Qo(f);a.isCurrent(_)&&(c=A,Qe(y))}function la(f,_,A,P){if(!_||!Number.isFinite(P)||P<=0)return{};const oe=Math.max(0,Math.min(1,A/P)),pe={};for(const _e of f.metadata.liveStats){if(!_e.live||!_e.fromVideo||!_e.scaleWithTime)continue;const jt=_e.videoKey??_e.id,Lt=_[jt];if(typeof Lt!="number"||!Number.isFinite(Lt))continue;const En=Lt*oe;pe[_e.id]=_e.integer?String(Math.floor(En)):String(En)}return pe}function kt(f,_){f.hidden=!_,f.classList.toggle("is-hidden",!_)}function it(f,_){return _!=null&&_.views?_.viewId??Object.keys(_.views)[0]:_==null?void 0:_.viewId}function ca(f,_){return!_||!f.views?null:f.views[_]??null}function ys(){const f=it(r,h);return f?r.views.some(_=>_.id===f&&_.audio):!1}function ua(f){return f.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function da(f,_){const A=ua(f),P=++b,oe=await fa(A);if(!(!a.isCurrent(_)||P!==b)){if(!oe){bs();return}u=Ve(A),d=!0,w.src!==u&&(w.pause(),w.src=u,w.load()),Et(),Ne()}}async function fa(f){try{if((await Ge(f,{method:"HEAD"})).ok)return!0}catch{}try{return(await Ge(f,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function bs(){b+=1,u=null,d=!1,w.pause(),w.removeAttribute("src"),w.load(),Et()}function ha(){p=t.audioMutedByDefault,m=t.defaultAudioVolume,w.muted=p,w.volume=m,C.setMuted(p)}function Et(){C.setAudioVisible(ys()&&d&&!!u),C.setMuted(p)}function at(f=!1){if(!d||!Number.isFinite(w.duration)||w.duration<=0)return;const _=Math.max(0,Math.min(w.duration,g.getPlaybackFraction()*w.duration));(f||Math.abs(w.currentTime-_)>.35)&&(w.currentTime=_)}function Ne(){const f=ys()&&d&&!!u;if(Et(),w.muted=p,w.volume=m,!f){w.pause();return}if(at(),n.dataset.mode!=="display"||g.isPaused()||l||B){w.pause();return}w.play().catch(()=>{p=!0,w.muted=!0,C.setMuted(!0)})}function vs(f){const _=new Set(Ro(f,e));return lt.filter(A=>_.has(A.id))}function ws(f){return f?lt.find(_=>_.id===f)??null:null}function ma(){return i.getSource()!=="local"?zn.MIN_TERMINAL_TIME_MS:pa(zn.MIN_TERMINAL_TIME_MS,vl)}function pa(f,_){const A=Math.ceil(Math.min(f,_)),P=Math.floor(Math.max(f,_));return Math.floor(Math.random()*(P-A+1))+A}function ga(f){const _=r.id,A=t.manifestSource;t=xo(f,e),Hs(t.verboseLogging),s=vs(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),j.setHomeVisible(!t.lockedScaleId),O.setHomeVisible(!t.lockedScaleId),Z.setSimulationClasses(s),I.setAdvancedSettings(t),le("Advanced settings updated",t),ha(),Ne(),A!==t.manifestSource&&(h=null);const P=ws(t.lockedScaleId);P&&(ms(P),P.id!==_&&(v=!1,g.hideMedia(),I.setView("parameters")),v||(vn(Dn[P.id]),I.setSimulation(r,Ie())))}}function kl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Sl(n)}kl();
//# sourceMappingURL=main-BbVE97hP.js.map
