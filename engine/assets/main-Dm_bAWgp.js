(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const us=Symbol.for("yaml.alias"),ts=Symbol.for("yaml.document"),nt=Symbol.for("yaml.map"),ai=Symbol.for("yaml.pair"),We=Symbol.for("yaml.scalar"),At=Symbol.for("yaml.seq"),xe=Symbol.for("yaml.node.type"),ft=n=>!!n&&typeof n=="object"&&n[xe]===us,Sn=n=>!!n&&typeof n=="object"&&n[xe]===ts,Jt=n=>!!n&&typeof n=="object"&&n[xe]===nt,ue=n=>!!n&&typeof n=="object"&&n[xe]===ai,G=n=>!!n&&typeof n=="object"&&n[xe]===We,Qt=n=>!!n&&typeof n=="object"&&n[xe]===At;function le(n){if(n&&typeof n=="object")switch(n[xe]){case nt:case At:return!0}return!1}function ce(n){if(n&&typeof n=="object")switch(n[xe]){case us:case nt:case We:case At:return!0}return!1}const ri=n=>(G(n)||le(n))&&!!n.anchor,lt=Symbol("break visit"),Pa=Symbol("skip children"),Kt=Symbol("remove node");function Tt(n,e){const t=xa(e);Sn(n)?_t(null,n.contents,t,Object.freeze([n]))===Kt&&(n.contents=null):_t(null,n,t,Object.freeze([]))}Tt.BREAK=lt;Tt.SKIP=Pa;Tt.REMOVE=Kt;function _t(n,e,t,s){const i=Ra(n,e,t,s);if(ce(i)||ue(i))return $a(n,s,i),_t(n,i,t,s);if(typeof i!="symbol"){if(le(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=_t(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===lt)return lt;r===Kt&&(e.items.splice(a,1),a-=1)}}}else if(ue(e)){s=Object.freeze(s.concat(e));const a=_t("key",e.key,t,s);if(a===lt)return lt;a===Kt&&(e.key=null);const r=_t("value",e.value,t,s);if(r===lt)return lt;r===Kt&&(e.value=null)}}return i}function xa(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Ra(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(Jt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(Qt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ue(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(G(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(ft(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function $a(n,e,t){const s=e[e.length-1];if(le(s))s.items[n]=t;else if(ue(s))n==="key"?s.key=t:s.value=t;else if(Sn(s))s.contents=t;else{const i=ft(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Fa={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ba=n=>n.replace(/[!,[\]{}]/g,e=>Fa[e]);class Ie{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},Ie.defaultYaml,e),this.tags=Object.assign({},Ie.defaultTags,t)}clone(){const e=new Ie(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new Ie(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:Ie.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},Ie.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:Ie.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},Ie.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ba(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&ce(e.contents)){const a={};Tt(e.contents,(r,o)=>{ce(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}Ie.defaultYaml={explicit:!1,version:"1.2"};Ie.defaultTags={"!!":"tag:yaml.org,2002:"};function oi(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function li(n){const e=new Set;return Tt(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function ci(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Va(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=li(n));const r=ci(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(G(r.node)||le(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function St(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=St(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=St(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=St(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=St(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Pe(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Pe(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!ri(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class ds{constructor(e){Object.defineProperty(this,xe,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Sn(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Pe(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?St(a,{"":o},"",o):o}}class fs extends ds{constructor(e){super(us),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],Tt(e,{Node:(a,r)=>{(ft(r)||ri(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Pe(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=mn(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(oi(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function mn(n,e,t){if(ft(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(le(e)){let s=0;for(const i of e.items){const a=mn(n,i,t);a>s&&(s=a)}return s}else if(ue(e)){const s=mn(n,e.key,t),i=mn(n,e.value,t);return Math.max(s,i)}return 1}const ui=n=>!n||typeof n!="function"&&typeof n!="object";class $ extends ds{constructor(e){super(We),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Pe(this.value,e,t)}toString(){return String(this.value)}}$.BLOCK_FOLDED="BLOCK_FOLDED";$.BLOCK_LITERAL="BLOCK_LITERAL";$.PLAIN="PLAIN";$.QUOTE_DOUBLE="QUOTE_DOUBLE";$.QUOTE_SINGLE="QUOTE_SINGLE";const Ua="tag:yaml.org,2002:";function Da(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function Yt(n,e,t){var f,h,m;if(Sn(n)&&(n=n.contents),ce(n))return n;if(ue(n)){const y=(h=(f=t.schema[nt]).createNode)==null?void 0:h.call(f,t.schema,null,t);return y.items.push(n),y}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new fs(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=Ua+e.slice(2));let c=Da(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const y=new $(n);return l&&(l.node=y),y}c=n instanceof Map?r[nt]:Symbol.iterator in Object(n)?r[At]:r[nt]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((m=c==null?void 0:c.nodeClass)==null?void 0:m.from)=="function"?c.nodeClass.from(t.schema,n,t):new $(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function yn(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return Yt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Ht=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class di extends ds{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>ce(s)||ue(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Ht(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(le(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,yn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(le(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&G(a)?a.value:a:le(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ue(t))return!1;const s=t.value;return s==null||e&&G(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return le(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(le(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,yn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Ha=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function ze(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const ct=(n,e,t)=>n.endsWith(`
`)?ze(t,e):t.includes(`
`)?`
`+ze(t,e):(n.endsWith(" ")?"":" ")+t,fi="flow",ns="block",pn="quoted";function kn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):f=i-s);let h,m,y=!1,p=-1,g=-1,k=-1;t===ns&&(p=$s(n,p,e.length),p!==-1&&(f=p+l));for(let _;_=n[p+=1];){if(t===pn&&_==="\\"){switch(g=p,n[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}k=p}if(_===`
`)t===ns&&(p=$s(n,p,e.length)),f=p+e.length+l,h=void 0;else{if(_===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const w=n[p+1];w&&w!==" "&&w!==`
`&&w!=="	"&&(h=p)}if(p>=f)if(h)c.push(h),f=h+l,h=void 0;else if(t===pn){for(;m===" "||m==="	";)m=_,_=n[p+=1],y=!0;const w=p>k+1?p-2:g-1;if(u[w])return n;c.push(w),u[w]=!0,f=w+l,h=void 0}else y=!0}m=_}if(y&&o&&o(),c.length===0)return n;r&&r();let v=n.slice(0,c[0]);for(let _=0;_<c.length;++_){const w=c[_],L=c[_+1]||n.length;w===0?v=`
${e}${n.slice(0,L)}`:(t===pn&&u[w]&&(v+=`${n[w]}\\`),v+=`
${e}${n.slice(w+1,L)}`)}return v}function $s(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const En=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),In=n=>/^(%|---|\.\.\.)/m.test(n);function ja(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function Wt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(In(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:kn(r,a,pn,En(e,!1))}function ss(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Wt(n,e);const t=e.indent||(In(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:kn(s,t,fi,En(e,!1))}function kt(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=Wt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=ss:a&&!i?s=Wt:s=t?ss:Wt}return s(n,e)}let is;try{is=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{is=/\n+(?!\n|$)/g}function gn({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return kt(t,s);const c=s.indent||(s.forceBlockIndent||In(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===$.BLOCK_FOLDED?!1:e===$.BLOCK_LITERAL?!0:!ja(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,h;for(h=t.length;h>0;--h){const L=t[h-1];if(L!==`
`&&L!=="	"&&L!==" ")break}let m=t.substring(h);const y=m.indexOf(`
`);y===-1?f="-":t===m||y!==m.length-1?(f="+",a&&a()):f="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(is,`$&${c}`));let p=!1,g,k=-1;for(g=0;g<t.length;++g){const L=t[g];if(L===" ")p=!0;else if(L===`
`)k=g;else break}let v=t.substring(0,k<g?k+1:g);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${c}`));let w=(p?c?"2":"1":"")+f;if(n&&(w+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const L=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let S=!1;const I=En(s,!0);r!=="folded"&&e!==$.BLOCK_FOLDED&&(I.onOverflow=()=>{S=!0});const C=kn(`${v}${L}${m}`,c,ns,I);if(!S)return`>${w}
${c}${C}`}return t=t.replace(/\n+/g,`$&${c}`),`|${w}
${c}${v}${t}${m}`}function qa(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return kt(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?kt(a,e):gn(n,e,t,s);if(!o&&!u&&i!==$.PLAIN&&a.includes(`
`))return gn(n,e,t,s);if(In(a)){if(l==="")return e.forceBlockIndent=!0,gn(n,e,t,s);if(o&&l===c)return kt(a,e)}const f=a.replace(/\n+/g,`$&
${l}`);if(r){const h=p=>{var g;return p.default&&p.tag!=="tag:yaml.org,2002:str"&&((g=p.test)==null?void 0:g.test(f))},{compat:m,tags:y}=e.doc.schema;if(y.some(h)||m!=null&&m.some(h))return kt(a,e)}return o?f:kn(f,l,fi,En(e,!1))}function hs(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==$.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=$.QUOTE_DOUBLE);const l=u=>{switch(u){case $.BLOCK_FOLDED:case $.BLOCK_LITERAL:return i||a?kt(r.value,e):gn(r,e,t,s);case $.QUOTE_DOUBLE:return Wt(r.value,e);case $.QUOTE_SINGLE:return ss(r.value,e);case $.PLAIN:return qa(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:f}=e.options,h=i&&u||f;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}function hi(n,e){const t=Object.assign({blockQuote:!0,commentString:Ha,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Ka(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(G(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Wa(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(G(n)||le(n))&&n.anchor;a&&oi(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function Nt(n,e,t,s){var l;if(ue(n))return n.toString(e,t,s);if(ft(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=ce(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Ka(e.doc.schema.tags,a));const r=Wa(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):G(a)?hs(a,e,t,s):a.toString(e,t,s);return r?G(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Ya({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t;let h=ce(n)&&n.comment||null;if(f){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(le(n)||!ce(n)&&typeof n=="object"){const I="With simple keys, collection cannot be used as a key value";throw new Error(I)}}let m=!f&&(!n||h&&e==null&&!t.inFlow||le(n)||(G(n)?n.type===$.BLOCK_FOLDED||n.type===$.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(f||!a),indent:o+l});let y=!1,p=!1,g=Nt(n,t,()=>y=!0,()=>p=!0);if(!m&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return y&&s&&s(),g===""?"?":m?`? ${g}`:g}else if(a&&!f||e==null&&m)return g=`? ${g}`,h&&!y?g+=ct(g,t.indent,c(h)):p&&i&&i(),g;y&&(h=null),m?(h&&(g+=ct(g,t.indent,c(h))),g=`? ${g}
${o}:`):(g=`${g}:`,h&&(g+=ct(g,t.indent,c(h))));let k,v,_;ce(e)?(k=!!e.spaceBefore,v=e.commentBefore,_=e.comment):(k=!1,v=null,_=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!h&&G(e)&&(t.indentAtStart=g.length+1),p=!1,!u&&l.length>=2&&!t.inFlow&&!m&&Qt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let w=!1;const L=Nt(e,t,()=>w=!0,()=>p=!0);let S=" ";if(h||k||v){if(S=k?`
`:"",v){const I=c(v);S+=`
${ze(I,t.indent)}`}L===""&&!t.inFlow?S===`
`&&_&&(S=`

`):S+=`
${t.indent}`}else if(!m&&le(e)){const I=L[0],C=L.indexOf(`
`),x=C!==-1,O=t.inFlow??e.flow??e.items.length===0;if(x||!O){let F=!1;if(x&&(I==="&"||I==="!")){let E=L.indexOf(" ");I==="&"&&E!==-1&&E<C&&L[E+1]==="!"&&(E=L.indexOf(" ",E+1)),(E===-1||C<E)&&(F=!0)}F||(S=`
${t.indent}`)}}else(L===""||L[0]===`
`)&&(S="");return g+=S+L,t.inFlow?w&&s&&s():_&&!w?g+=ct(g,t.indent,c(_)):p&&i&&i(),g}function mi(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const on="<<",Qe={identify:n=>n===on||typeof n=="symbol"&&n.description===on,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new $(Symbol(on)),{addToJSMap:pi}),stringify:()=>on},Ga=(n,e)=>(Qe.identify(e)||G(e)&&(!e.type||e.type===$.PLAIN)&&Qe.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Qe.tag&&t.default));function pi(n,e,t){if(t=n&&ft(t)?t.resolve(n.doc):t,Qt(t))for(const s of t.items)Vn(n,e,s);else if(Array.isArray(t))for(const s of t)Vn(n,e,s);else Vn(n,e,t)}function Vn(n,e,t){const s=n&&ft(t)?t.resolve(n.doc):t;if(!Jt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function gi(n,e,{key:t,value:s}){if(ce(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ga(n,t))pi(n,e,s);else{const i=Pe(t,"",n);if(e instanceof Map)e.set(i,Pe(s,i,n));else if(e instanceof Set)e.add(i);else{const a=za(t,i,n),r=Pe(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function za(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(ce(n)&&(t!=null&&t.doc)){const s=hi(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),mi(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function ms(n,e,t){const s=Yt(n,void 0,t),i=Yt(e,void 0,t);return new Le(s,i)}class Le{constructor(e,t=null){Object.defineProperty(this,xe,{value:ai}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return ce(t)&&(t=t.clone(e)),ce(s)&&(s=s.clone(e)),new Le(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return gi(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Ya(this,e,t,s):JSON.stringify(this)}}function yi(n,e,t){return(e.inFlow??n.flow?Qa:Ja)(n,e,t)}function Ja({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const h=[];for(let y=0;y<e.length;++y){const p=e[y];let g=null;if(ce(p))!f&&p.spaceBefore&&h.push(""),bn(t,h,p.commentBefore,f),p.comment&&(g=p.comment);else if(ue(p)){const v=ce(p.key)?p.key:null;v&&(!f&&v.spaceBefore&&h.push(""),bn(t,h,v.commentBefore,f))}f=!1;let k=Nt(p,u,()=>g=null,()=>f=!0);g&&(k+=ct(k,a,c(g))),f&&g&&(f=!1),h.push(s+k)}let m;if(h.length===0)m=i.start+i.end;else{m=h[0];for(let y=1;y<h.length;++y){const p=h[y];m+=p?`
${l}${p}`:`
`}}return n?(m+=`
`+ze(c(n),l),o&&o()):f&&r&&r(),m}function Qa({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const f=[];for(let y=0;y<n.length;++y){const p=n[y];let g=null;if(ce(p))p.spaceBefore&&f.push(""),bn(e,f,p.commentBefore,!1),p.comment&&(g=p.comment);else if(ue(p)){const v=ce(p.key)?p.key:null;v&&(v.spaceBefore&&f.push(""),bn(e,f,v.commentBefore,!1),v.comment&&(c=!0));const _=ce(p.value)?p.value:null;_?(_.comment&&(g=_.comment),_.commentBefore&&(c=!0)):p.value==null&&(v!=null&&v.comment)&&(g=v.comment)}g&&(c=!0);let k=Nt(p,l,()=>g=null);c||(c=f.length>u||k.includes(`
`)),y<n.length-1?k+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=f.reduce((v,_)=>v+_.length+2,2)+(k.length+2)>e.options.lineWidth)),c&&(k+=",")),g&&(k+=ct(k,s,o(g))),f.push(k),u=f.length}const{start:h,end:m}=t;if(f.length===0)return h+m;if(!c){const y=f.reduce((p,g)=>p+g.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=h;for(const p of f)y+=p?`
${a}${i}${p}`:`
`;return`${y}
${i}${m}`}else return`${h}${r}${f.join(" ")}${r}${m}`}function bn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=ze(e(s),n);t.push(a.trimStart())}}function ut(n,e){const t=G(e)?e.value:e;for(const s of n)if(ue(s)&&(s.key===e||s.key===t||G(s.key)&&s.key.value===t))return s}class Oe extends di{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(nt,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(ms(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ue(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new Le(e,e==null?void 0:e.value):s=new Le(e.key,e.value);const i=ut(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);G(i.value)&&ui(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=ut(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=ut(this.items,e),i=s==null?void 0:s.value;return(!t&&G(i)?i.value:i)??void 0}has(e){return!!ut(this.items,e)}set(e,t){this.add(new Le(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)gi(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ue(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),yi(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const Mt={collection:"map",default:!0,nodeClass:Oe,tag:"tag:yaml.org,2002:map",resolve(n,e){return Jt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Oe.from(n,e,t)};class dt extends di{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(At,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=ln(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=ln(e);if(typeof s!="number")return;const i=this.items[s];return!t&&G(i)?i.value:i}has(e){const t=ln(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=ln(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];G(i)&&ui(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Pe(a,String(i++),t));return s}toString(e,t,s){return e?yi(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(Yt(o,void 0,s))}}return a}}function ln(n){let e=G(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Ot={collection:"seq",default:!0,nodeClass:dt,tag:"tag:yaml.org,2002:seq",resolve(n,e){return Qt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>dt.from(n,e,t)},Ln={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),hs(n,e,t,s)}},Nn={identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new $(null),stringify:({source:n},e)=>typeof n=="string"&&Nn.test.test(n)?n:e.options.nullStr},ps={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new $(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ps.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function He({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const bi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:He},vi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():He(n)}},wi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new $(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:He},Cn=n=>typeof n=="bigint"||Number.isInteger(n),gs=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function _i(n,e,t){const{value:s}=n;return Cn(s)&&s>=0?t+s.toString(e):He(n)}const Si={identify:n=>Cn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>gs(n,2,8,t),stringify:n=>_i(n,8,"0o")},ki={identify:Cn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>gs(n,0,10,t),stringify:He},Ei={identify:n=>Cn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>gs(n,2,16,t),stringify:n=>_i(n,16,"0x")},Xa=[Mt,Ot,Ln,Nn,ps,Si,ki,Ei,bi,vi,wi];function Fs(n){return typeof n=="bigint"||Number.isInteger(n)}const cn=({value:n})=>JSON.stringify(n),Za=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:cn},{identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:cn},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:cn},{identify:Fs,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Fs(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:cn}],er={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},tr=[Mt,Ot].concat(Za,er),ys={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=$.BLOCK_LITERAL),e!==$.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let f=0,h=0;f<c;++f,h+=l)u[f]=o.substr(h,l);o=u.join(e===$.BLOCK_LITERAL?`
`:" ")}return hs({comment:n,type:e,value:o},s,i,a)}};function Ii(n,e){if(Qt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ue(s)){if(Jt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new Le(new $(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ue(s)?s:new Le(s)}}else e("Expected a sequence for this tag");return n}function Li(n,e,t){const{replacer:s}=t,i=new dt(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(ms(o,l,t))}return i}const bs={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Ii,createNode:Li};class It extends dt{constructor(){super(),this.add=Oe.prototype.add.bind(this),this.delete=Oe.prototype.delete.bind(this),this.get=Oe.prototype.get.bind(this),this.has=Oe.prototype.has.bind(this),this.set=Oe.prototype.set.bind(this),this.tag=It.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ue(i)?(a=Pe(i.key,"",t),r=Pe(i.value,a,t)):a=Pe(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=Li(e,t,s),a=new this;return a.items=i.items,a}}It.tag="tag:yaml.org,2002:omap";const vs={collection:"seq",identify:n=>n instanceof Map,nodeClass:It,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Ii(n,e),s=[];for(const{key:i}of t.items)G(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new It,t)},createNode:(n,e,t)=>It.from(n,e,t)};function Ni({value:n,source:e},t){return e&&(n?Ci:Ai).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const Ci={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new $(!0),stringify:Ni},Ai={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new $(!1),stringify:Ni},nr={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:He},sr={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():He(n)}},ir={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new $(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:He},Xt=n=>typeof n=="bigint"||Number.isInteger(n);function An(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function ws(n,e,t){const{value:s}=n;if(Xt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return He(n)}const ar={identify:Xt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>An(n,2,2,t),stringify:n=>ws(n,2,"0b")},rr={identify:Xt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>An(n,1,8,t),stringify:n=>ws(n,8,"0")},or={identify:Xt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>An(n,0,10,t),stringify:He},lr={identify:Xt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>An(n,2,16,t),stringify:n=>ws(n,16,"0x")};class Lt extends Oe{constructor(e){super(e),this.tag=Lt.tag}add(e){let t;ue(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Le(e.key,null):t=new Le(e,null),ut(this.items,t.key)||this.items.push(t)}get(e,t){const s=ut(this.items,e);return!t&&ue(s)?G(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=ut(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new Le(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(ms(r,null,s));return a}}Lt.tag="tag:yaml.org,2002:set";const _s={collection:"map",identify:n=>n instanceof Set,nodeClass:Lt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>Lt.from(n,e,t),resolve(n,e){if(Jt(n)){if(n.hasAllNullValues(!0))return Object.assign(new Lt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function Ss(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function Ti(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return He(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Mi={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Ss(n,t),stringify:Ti},Oi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Ss(n,!1),stringify:Ti},Tn={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Tn.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let f=Ss(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Bs=[Mt,Ot,Ln,Nn,Ci,Ai,ar,rr,or,lr,nr,sr,ir,ys,Qe,vs,bs,_s,Mi,Oi,Tn],Vs=new Map([["core",Xa],["failsafe",[Mt,Ot,Ln]],["json",tr],["yaml11",Bs],["yaml-1.1",Bs]]),Us={binary:ys,bool:ps,float:wi,floatExp:vi,floatNaN:bi,floatTime:Oi,int:ki,intHex:Ei,intOct:Si,intTime:Mi,map:Mt,merge:Qe,null:Nn,omap:vs,pairs:bs,seq:Ot,set:_s,timestamp:Tn},cr={"tag:yaml.org,2002:binary":ys,"tag:yaml.org,2002:merge":Qe,"tag:yaml.org,2002:omap":vs,"tag:yaml.org,2002:pairs":bs,"tag:yaml.org,2002:set":_s,"tag:yaml.org,2002:timestamp":Tn};function Un(n,e,t){const s=Vs.get(e);if(s&&!n)return t&&!s.includes(Qe)?s.concat(Qe):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Vs.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Qe)),i.reduce((a,r)=>{const o=typeof r=="string"?Us[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(Us).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const ur=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class ks{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?Un(e,"compat"):e?Un(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?cr:{},this.tags=Un(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,nt,{value:Mt}),Object.defineProperty(this,We,{value:Ln}),Object.defineProperty(this,At,{value:Ot}),this.sortMapEntries=typeof r=="function"?r:r===!0?ur:null}clone(){const e=Object.create(ks.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function dr(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=hi(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(ze(c,""))}let r=!1,o=null;if(n.contents){if(ce(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(ze(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=Nt(n.contents,i,()=>o=null,c);o&&(u+=ct(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(Nt(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(ze(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(ze(a(c),"")))}return t.join(`
`)+`
`}class Mn{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,xe,{value:ts});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new Ie({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Mn.prototype,{[xe]:{value:ts}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=ce(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){yt(this.contents)&&this.contents.add(e)}addIn(e,t){yt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=li(this);e.anchor=!t||s.has(t)?ci(t||"a",s):t}return new fs(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=v=>typeof v=="number"||v instanceof String||v instanceof Number,k=t.filter(g).map(String);k.length>0&&(t=t.concat(k)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:f,setAnchors:h,sourceObjects:m}=Va(this,r||"a"),y={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},p=Yt(e,u,y);return o&&le(p)&&(p.flow=!0),h(),p}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new Le(i,a)}delete(e){return yt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Ht(e)?this.contents==null?!1:(this.contents=null,!0):yt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return le(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Ht(e)?!t&&G(this.contents)?this.contents.value:this.contents:le(this.contents)?this.contents.getIn(e,t):void 0}has(e){return le(this.contents)?this.contents.has(e):!1}hasIn(e){return Ht(e)?this.contents!==void 0:le(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=yn(this.schema,[e],t):yt(this.contents)&&this.contents.set(e,t)}setIn(e,t){Ht(e)?this.contents=t:this.contents==null?this.contents=yn(this.schema,Array.from(e),t):yt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Ie({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new Ie({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new ks(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Pe(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?St(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return dr(this,e)}}function yt(n){if(le(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Pi extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class jt extends Pi{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class fr extends Pi{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Ds=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function Ct(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,f="",h="",m=!1,y=!1,p=null,g=null,k=null,v=null,_=null,w=null,L=null;for(const C of n)switch(y&&(C.type!=="space"&&C.type!=="newline"&&C.type!=="comma"&&a(C.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),p&&(c&&C.type!=="comment"&&C.type!=="newline"&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),p=null),C.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&C.source.includes("	")&&(p=C),u=!0;break;case"comment":{u||a(C,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const x=C.source.substring(1)||" ";f?f+=h+x:f=x,h="",c=!1;break}case"newline":c?f?f+=C.source:(!w||t!=="seq-item-ind")&&(l=!0):h+=C.source,c=!0,m=!0,(g||k)&&(v=C),u=!0;break;case"anchor":g&&a(C,"MULTIPLE_ANCHORS","A node can have at most one anchor"),C.source.endsWith(":")&&a(C.offset+C.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=C,L??(L=C.offset),c=!1,u=!1,y=!0;break;case"tag":{k&&a(C,"MULTIPLE_TAGS","A node can have at most one tag"),k=C,L??(L=C.offset),c=!1,u=!1,y=!0;break}case t:(g||k)&&a(C,"BAD_PROP_ORDER",`Anchors and tags must be after the ${C.source} indicator`),w&&a(C,"UNEXPECTED_TOKEN",`Unexpected ${C.source} in ${e??"collection"}`),w=C,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){_&&a(C,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),_=C,c=!1,u=!1;break}default:a(C,"UNEXPECTED_TOKEN",`Unexpected ${C.type} token`),c=!1,u=!1}const S=n[n.length-1],I=S?S.offset+S.source.length:i;return y&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),p&&(c&&p.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:_,found:w,spaceBefore:l,comment:f,hasNewline:m,anchor:g,tag:k,newlineAfterProp:v,end:I,start:L??I}}function Gt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Gt(e.key)||Gt(e.value))return!0}return!1;default:return!0}}function as(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Gt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function xi(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||G(a)&&G(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Hs="All mapping items must start at the same column";function hr({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??Oe,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:h,key:m,sep:y,value:p}=f,g=Ct(h,{indicator:"explicit-key-ind",next:m??(y==null?void 0:y[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),k=!g.found;if(k){if(m&&(m.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(l,"BAD_INDENT",Hs)),!g.anchor&&!g.tag&&!y){c=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||Gt(m))&&i(m??h[h.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Hs);t.atKey=!0;const v=g.end,_=m?n(t,m,g,i):e(t,v,h,null,g,i);t.schema.compat&&as(s.indent,m,i),t.atKey=!1,xi(t,o.items,_)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const w=Ct(y??[],{indicator:"map-value-ind",next:p,offset:_.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(l=w.end,w.found){k&&((p==null?void 0:p.type)==="block-map"&&!w.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<w.found.offset-1024&&i(_.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const L=p?n(t,p,w,i):e(t,l,y,null,w,i);t.schema.compat&&as(s.indent,p,i),l=L.range[2];const S=new Le(_,L);t.options.keepSourceTokens&&(S.srcToken=f),o.items.push(S)}else{k&&i(_.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),w.comment&&(_.comment?_.comment+=`
`+w.comment:_.comment=w.comment);const L=new Le(_);t.options.keepSourceTokens&&(L.srcToken=f),o.items.push(L)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function mr({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??dt,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:f}of s.items){const h=Ct(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||f)(f==null?void 0:f.type)==="block-seq"?i(h.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(o.comment=h.comment);continue}const m=f?n(t,f,h,i):e(t,h.end,u,null,h,i);t.schema.compat&&as(s.indent,f,i),l=m.range[2],o.items.push(m)}return o.range=[s.offset,l,c??l],o}function Zt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Dn="Block collections are not allowed within flow collections",Hn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function pr({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?Oe:dt),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let k=0;k<s.items.length;++k){const v=s.items[k],{start:_,key:w,sep:L,value:S}=v,I=Ct(_,{flow:o,indicator:"explicit-key-ind",next:w??(L==null?void 0:L[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!I.found){if(!I.anchor&&!I.tag&&!L&&!S){k===0&&I.comma?i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):k<s.items.length-1&&i(I.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),I.comment&&(c.comment?c.comment+=`
`+I.comment:c.comment=I.comment),f=I.end;continue}!r&&t.options.strict&&Gt(w)&&i(w,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(k===0)I.comma&&i(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(I.comma||i(I.start,"MISSING_CHAR",`Missing , between ${o} items`),I.comment){let C="";e:for(const x of _)switch(x.type){case"comma":case"space":break;case"comment":C=x.source.substring(1);break e;default:break e}if(C){let x=c.items[c.items.length-1];ue(x)&&(x=x.value??x.key),x.comment?x.comment+=`
`+C:x.comment=C,I.comment=I.comment.substring(C.length+1)}}if(!r&&!L&&!I.found){const C=S?n(t,S,I,i):e(t,I.end,L,null,I,i);c.items.push(C),f=C.range[2],Hn(S)&&i(C.range,"BLOCK_IN_FLOW",Dn)}else{t.atKey=!0;const C=I.end,x=w?n(t,w,I,i):e(t,C,_,null,I,i);Hn(w)&&i(x.range,"BLOCK_IN_FLOW",Dn),t.atKey=!1;const O=Ct(L??[],{flow:o,indicator:"map-value-ind",next:S,offset:x.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(O.found){if(!r&&!I.found&&t.options.strict){if(L)for(const A of L){if(A===O.found)break;if(A.type==="newline"){i(A,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}I.start<O.found.offset-1024&&i(O.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&((g=S.source)==null?void 0:g[0])===":"?i(S,"MISSING_CHAR",`Missing space after : in ${o}`):i(O.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const F=S?n(t,S,O,i):O.found?e(t,O.end,L,null,O,i):null;F?Hn(S)&&i(F.range,"BLOCK_IN_FLOW",Dn):O.comment&&(x.comment?x.comment+=`
`+O.comment:x.comment=O.comment);const E=new Le(x,F);if(t.options.keepSourceTokens&&(E.srcToken=v),r){const A=c;xi(t,A.items,x)&&i(C,"DUPLICATE_KEY","Map keys must be unique"),A.items.push(E)}else{const A=new Oe(t.schema);A.flow=!0,A.items.push(E);const W=(F??x).range;A.range=[x.range[0],W[1],W[2]],c.items.push(A)}f=F?F.range[2]:O.end}}const h=r?"}":"]",[m,...y]=s.end;let p=f;if((m==null?void 0:m.source)===h)p=m.offset+m.source.length;else{const k=o[0].toUpperCase()+o.substring(1),v=u?`${k} must end with a ${h}`:`${k} in block collection must be sufficiently indented and end with a ${h}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",v),m&&m.source.length!==1&&y.unshift(m)}if(y.length>0){const k=Zt(y,p,t.options.strict,i);k.comment&&(c.comment?c.comment+=`
`+k.comment:c.comment=k.comment),c.range=[s.offset,p,k.offset]}else c.range=[s.offset,p,p];return c}function jn(n,e,t,s,i,a){const r=t.type==="block-map"?hr(n,e,t,s,a):t.type==="block-seq"?mr(n,e,t,s,a):pr(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function gr(n,e,t,s,i){var h;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:y}=s,p=m&&a?m.offset>a.offset?m:a:m??a;p&&(!y||y.offset<p.offset)&&i(p,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===Oe.tagName&&o==="map"||r===dt.tagName&&o==="seq")return jn(n,e,t,i,r);let l=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!l){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),l=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),jn(n,e,t,i,r)}const c=jn(n,e,t,i,r,l),u=((h=l.resolve)==null?void 0:h.call(l,c,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??c,f=ce(u)?u:new $(u);return f.range=c.range,f.tag=r,l!=null&&l.format&&(f.format=l.format),f}function yr(n,e,t){const s=e.offset,i=br(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?$.BLOCK_FOLDED:$.BLOCK_LITERAL,r=e.source?vr(e.source):[];let o=r.length;for(let p=r.length-1;p>=0;--p){const g=r[p][1];if(g===""||g==="\r")o=p;else break}if(o===0){const p=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:p,type:a,comment:i.comment,range:[s,g,g]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let p=0;p<o;++p){const[g,k]=r[p];if(k===""||k==="\r")i.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=g.length),u=p,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+k.length+1}for(let p=r.length-1;p>=o;--p)r[p][0].length>l&&(o=p+1);let f="",h="",m=!1;for(let p=0;p<u;++p)f+=r[p][0].slice(l)+`
`;for(let p=u;p<o;++p){let[g,k]=r[p];c+=g.length+k.length+1;const v=k[k.length-1]==="\r";if(v&&(k=k.slice(0,-1)),k&&g.length<l){const w=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-k.length-(v?2:1),"BAD_INDENT",w),g=""}a===$.BLOCK_LITERAL?(f+=h+g.slice(l)+k,h=`
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
`}const y=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,y,y]}}function br({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let h=1;h<i.length;++h){const m=i[h];if(!o&&(m==="-"||m==="+"))o=m;else{const y=Number(m);!r&&y?r=y:l===-1&&(l=n+h)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let h=1;h<e.length;++h){const m=e[h];switch(m.type){case"space":c=!0;case"newline":f+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),f+=m.source.length;break;default:{const y=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",y);const p=m.source;p&&typeof p=="string"&&(f+=p.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function vr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function wr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(h,m,y)=>t(s+h,m,y);switch(i){case"scalar":o=$.PLAIN,l=_r(a,c);break;case"single-quoted-scalar":o=$.QUOTE_SINGLE,l=Sr(a,c);break;case"double-quoted-scalar":o=$.QUOTE_DOUBLE,l=kr(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Zt(r,u,e,t);return{value:l,type:o,comment:f.comment,range:[s,u,f.offset]}}function _r(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Ri(n)}function Sr(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Ri(n.slice(1,-1)).replace(/''/g,"'")}function Ri(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function kr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=Er(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Ir[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Lr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Er(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Ir={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Lr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function $i(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?yr(n,e,s):wr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[We]:l?c=Nr(n.schema,i,l,t,s):e.type==="scalar"?c=Cr(n,i,e,s):c=n.schema[We];let u;try{const f=c.resolve(i,h=>s(t??e,"TAG_RESOLVE_FAILED",h),n.options);u=G(f)?f:new $(f)}catch(f){const h=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",h),u=new $(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function Nr(n,e,t,s,i){var o;if(t==="!")return n[We];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[We])}function Cr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[We];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[We];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function Ar(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const Tr={composeNode:Fi,composeEmptyNode:Es};function Fi(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=Mr(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=$i(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=gr(Tr,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(f){const h=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",h)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return c??(c=Es(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!G(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function Es(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:Ar(e,t,s),indent:-1,source:""},f=$i(n,u,o,c);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=l),f}function Mr({options:n},{offset:e,source:t,end:s},i){const a=new fs(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Zt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Or(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new Mn(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=Ct(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Fi(c,i,u,r):Es(c,u.end,s,null,u,r);const f=l.contents.range[2],h=Zt(a,f,!1,r);return h.comment&&(l.comment=h.comment),l.range=[t,f,h.offset],l}function Bt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function js(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Pr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Bt(t);a?this.warnings.push(new fr(r,s,i)):this.errors.push(new jt(r,s,i))},this.directives=new Ie({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=js(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(le(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ue(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:js(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Bt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Or(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new jt(Bt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new jt(Bt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Zt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new jt(Bt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Mn(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Bi="\uFEFF",Vi="",Ui="",rs="";function xr(n){switch(n){case Bi:return"byte-order-mark";case Vi:return"doc-mode";case Ui:return"flow-error-end";case rs:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ve(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const qs=new Set("0123456789ABCDEFabcdef"),Rr=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),un=new Set(",[]{}"),$r=new Set(` ,[]{}
\r	`),qn=n=>!n||$r.has(n);class Fr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ve(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Bi&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Vi,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ve(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ve(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ve(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(qn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ve(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Ui,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(qn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ve(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ve(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield rs,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ve(a)||e&&un.has(a))break;t=s}else if(Ve(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&un.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&un.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield rs,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(qn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ve(t)||e&&un.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ve(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Rr.has(t))t=this.buffer[++e];else if(t==="%"&&qs.has(this.buffer[e+1])&&qs.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Br{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function et(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Ks(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Di(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function dn(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function bt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Ws(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!et(e.start,"explicit-key-ind")&&!et(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Di(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Vr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Fr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=xr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Ws(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Ks(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Ks(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=dn(this.peek(2)),s=bt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(et(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(Di(t.key)&&!et(t.sep,"newline")){const o=bt(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(et(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=bt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):et(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!et(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||et(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=dn(s),a=bt(i);Ws(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=dn(e),s=bt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=dn(e),s=bt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Ur(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Br||null,prettyErrors:e}}function Dr(n,e={}){const{lineCounter:t,prettyErrors:s}=Ur(e),i=new Vr(t==null?void 0:t.addNewLine),a=new Pr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new jt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Ds(n,t)),r.warnings.forEach(Ds(n,t))),r}function Xe(n,e,t){let s;const i=Dr(n,t);if(!i)return null;if(i.warnings.forEach(a=>mi(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Hr=`# Simulation family catalog source-of-truth.
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
`,jr=`# Parameter definitions for each simulation family.
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
`,qr=`# Summary overlay display configuration for each simulation family.
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
`,Kr=`# Live telemetry HUD display configuration for each simulation family.
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
`;function se(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}function Hi(n,e,t){const s=n.indexOf("#"),i=s>=0?n.slice(0,s):n,a=s>=0?n.slice(s):"",r=new RegExp(`([?&])${Wr(e)}=[^&#]*`);if(r.test(i))return`${i.replace(r,`$1${e}=${encodeURIComponent(t)}`)}${a}`;const o=i.includes("?")?"&":"?";return`${i}${o}${e}=${encodeURIComponent(t)}${a}`}function Wr(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const Yr=Xe(Hr),Gr=Xe(jr),Kn=Xe(qr),zr=Xe(Kr),vt=Object.entries(Yr).map(([n,e])=>{var r,o,l;const t=Jr(Kn[n]),s=(((r=Kn[n])==null?void 0:r.results)??[]).map(Qr),i=((o=zr[n])==null?void 0:o.liveStats)??[],a=Gr[n]??{};return{id:n,label:e.label,placeholderImage:se(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(os),liveStats:i.map(os),morphologyChecklist:(l=Kn[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const f=u.quali_labels,h=f!==void 0&&f.length>0,m=h?0:u.min,y=h?f.length-1:u.max,p=h?1:u.step??Xr(u.min,u.max),g=h?Math.floor(f.length/2):u.log_scale?Math.sqrt(u.min*u.max):Zr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:m,max:y,step:p,fallbackValue:g,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:f,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function Jr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function os(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Qr(n){return{...os(n),target:n.target}}function Xr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Zr(n,e){return n+(e-n)/2}const ji="universe-engine-theme",qi=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function eo(){const n=localStorage.getItem(ji);return no(n)?n:"glass"}function Wn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(ji,n)}function to(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of qi){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function no(n){return qi.some(e=>e.id===n)}let be=null,Ue="primary";function so(n,e=null){be={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function io(){be=null,Ue="primary"}function ao(n){Ue=n}function ro(n){return n==="local"?{mode:"local",base:null}:be?{mode:Ue,base:Ki()}:{mode:"primary",base:null}}function Ke(n){if(!be)return n;const e=Ki();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!Gs(t,be.primaryBase)&&(!be.backupBase||!Gs(t,be.backupBase))?n:zs(e,`${t.pathname}${t.search}${t.hash}`)}return zs(e,n)}async function tt(n,e){const t=Ke(n),s=!!(be!=null&&be.backupBase)&&Ue==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Ys(n,e);return a.ok&&(Ue="backup"),a}catch(i){if(!s)throw i;const a=await Ys(n,e);return a.ok&&(Ue="backup"),a}}function Ki(){return be?Ue==="backup"&&be.backupBase?be.backupBase:be.primaryBase:null}async function Ys(n,e){if(!(be!=null&&be.backupBase))throw new Error("Backup asset host is not configured.");const t=Ue;Ue="backup";try{const s=await fetch(Ke(n),e);return s.ok||(Ue=t),s}catch(s){throw Ue=t,s}}function Gs(n,e){const t=new URL(e);return n.origin===t.origin}function zs(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function oo(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.crossOrigin="anonymous",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,f=new Map;let h=null,m=null;const y=document.createElement("canvas"),p=y.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function k(){h&&(URL.revokeObjectURL(h),h=null)}function v(N,P={}){const U=u.get(N);U&&(u.delete(N),P={...P,ownedObjectUrl:!0},N=U),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(N)){s.classList.remove("fade-out");return}const X=s.muted,D=P.seekFraction;k(),m=null,h=P.ownedObjectUrl?N:null,s.src=N,s.load(),s.onloadeddata=()=>{if(s.muted=X,D!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const _e=Math.max(0,Math.min(.999,D));s.currentTime=_e*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),P.autoplay&&s.play().catch(()=>{})}},120)}function _(N){s.muted=N}async function w(){await s.play()}function L(){s.pause()}function S(){s.classList.add("is-empty")}function I(){s.classList.remove("is-empty")}function C(N){if(!Number.isFinite(s.duration)||s.duration<=0)return;const P=Math.max(0,Math.min(1,N));s.currentTime=P*s.duration}function x(){s.currentTime=0,i==null||i(0)}function O(N=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const U=()=>{D(),P()},X=window.setTimeout(()=>{D(),P()},Math.max(0,N));function D(){window.clearTimeout(X),s.removeEventListener("loadeddata",U)}s.addEventListener("loadeddata",U,{once:!0})})}function F(N,P=8e3){const U=Math.max(0,N);return U===0||A(U)?Promise.resolve():new Promise(X=>{const D=()=>{A(U)&&(me(),X())},_e=window.setTimeout(()=>{me(),X()},Math.max(0,P));function me(){window.clearTimeout(_e),s.removeEventListener("progress",D),s.removeEventListener("canplay",D),s.removeEventListener("loadeddata",D)}s.addEventListener("progress",D),s.addEventListener("canplay",D),s.addEventListener("loadeddata",D),D()})}function E(N=250){return!s.seeking&&s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const U=()=>{s.seeking||s.readyState<HTMLMediaElement.HAVE_CURRENT_DATA||(D(),P())},X=window.setTimeout(()=>{D(),P()},Math.max(0,N));function D(){window.clearTimeout(X),s.removeEventListener("seeked",U),s.removeEventListener("canplay",U),s.removeEventListener("loadeddata",U)}s.addEventListener("seeked",U),s.addEventListener("canplay",U),s.addEventListener("loadeddata",U),U()})}function A(N){const P=s.currentTime;for(let U=0;U<s.buffered.length;U+=1){const X=s.buffered.start(U),D=s.buffered.end(U);if(!(P<X||P>D))return D-P>=N}return!1}function W(N){o=new Set(N.filter(Boolean).filter(P=>P!==s.currentSrc)),l||J()}function fe(){l=!0,Y(),ee()}function z(){if(!l){J();return}l=!1,J()}function J(){for(const[N,P]of c.entries())o.has(N)||(P.removeAttribute("src"),P.load(),c.delete(N));for(const[N,P]of f.entries())o.has(N)||(P.abort(),f.delete(N));for(const N of o){if(!c.has(N)){const P=document.createElement("video");P.preload="auto",P.crossOrigin="anonymous",P.muted=!0,P.playsInline=!0,P.src=Ke(N),P.load(),c.set(N,P)}u.has(N)||f.has(N)||ve(N)}}function Y(){for(const N of c.values())N.removeAttribute("src"),N.load();c.clear()}function ee(){for(const N of f.values())N.abort();f.clear()}function ve(N){const P=new AbortController;f.set(N,P);const U=Hi(N,"_",`${Date.now()}`);tt(U,{signal:P.signal}).then(async X=>{if(!X.ok)return;const D=await X.blob();o.has(N)&&u.set(N,URL.createObjectURL(D))}).catch(X=>{X instanceof DOMException&&X.name}).finally(()=>{f.get(N)===P&&f.delete(N)})}function ie(){o.clear(),l=!1,Y(),ee();for(const N of u.values())URL.revokeObjectURL(N);u.clear()}function we(N){return u.get(N)??null}function Q(){if(!(!p||s.readyState<2||s.videoWidth===0||s.videoHeight===0)){y.width=s.videoWidth,y.height=s.videoHeight;try{p.drawImage(s,0,0,y.width,y.height),m=y.toDataURL("image/jpeg",.85)}catch{m=null}}}function Ne(){return Q(),m}function he(N){i=N}function Re(N){a=N}return{setSource:v,setMuted:_,play:w,pause:L,hideMedia:S,showMedia:I,seekToFraction:C,resetPlayback:x,waitForLoadedData:O,waitForBufferedAhead:F,waitForSeekSettled:E,onTimeUpdate:he,onEnded:Re,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getCurrentTimeSeconds:()=>Number.isFinite(s.currentTime)?s.currentTime:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:N=>{g=N,s.playbackRate=N},getPlaybackRate:()=>g,onPlayStateChange:N=>{r=N},getElement:()=>t,prewarmSources:W,suspendPrewarming:fe,resumePrewarming:z,clearPrewarmedSources:ie,getPrewarmedBlobUrl:we,captureFrame:Ne}}const lo=[.25,.5,1,2];function co(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");let f=!1;u.className="timeline";const h=document.createElement("div");h.className="timeline__bar-row";const m=document.createElement("div");m.className="timeline__audio is-hidden";const y=document.createElement("button");y.className="timeline__audio-btn",y.type="button",y.setAttribute("aria-label","Toggle audio mute"),y.innerHTML=uo(),y.addEventListener("click",()=>r==null?void 0:r()),m.appendChild(y);const p=document.createElement("button");p.className="timeline__play-btn",p.type="button",p.setAttribute("aria-label","Toggle playback"),p.addEventListener("click",()=>s==null?void 0:s());const g=document.createElement("input");g.className="timeline__slider",g.type="range",g.min="0",g.max="1000",g.step="1",g.value="0",g.style.setProperty("--fill","0%"),g.setAttribute("aria-label","Simulation time");const k=document.createElement("div");k.className="timeline__speed";const v=document.createElement("button");v.className="timeline__speed-btn",v.type="button",v.setAttribute("aria-label","Playback speed"),v.addEventListener("click",()=>{k.classList.toggle("open")});const _=document.createElement("div");_.className="timeline__speed-menu";for(const S of lo){const I=document.createElement("button");I.className="timeline__speed-option",I.type="button",I.textContent=Yn(S),I.addEventListener("click",()=>{k.classList.remove("open"),i==null||i(S)}),_.appendChild(I)}k.appendChild(v),k.appendChild(_);const w=document.createElement("button");return w.className="timeline__summary-btn",w.type="button",w.setAttribute("aria-label","View run summary"),w.textContent="ⓘ",w.addEventListener("click",()=>a==null?void 0:a()),h.appendChild(m),h.appendChild(p),h.appendChild(g),h.appendChild(k),h.appendChild(w),g.addEventListener("input",()=>{const S=parseInt(g.value,10)/1e3;g.style.setProperty("--fill",`${S*100}%`),t==null||t(S)}),g.addEventListener("pointerdown",()=>{f||(f=!0,o==null||o())}),g.addEventListener("pointerup",()=>{f&&(f=!1,l==null||l())}),g.addEventListener("change",()=>{f&&(f=!1,l==null||l())}),document.addEventListener("click",S=>{k.contains(S.target)||k.classList.remove("open")}),u.appendChild(h),n.appendChild(u),L(c),{setPosition(S){const I=Math.max(0,Math.min(1,S));g.value=String(Math.round(I*1e3)),g.style.setProperty("--fill",`${I*100}%`)},setPlaying(S){p.textContent=S?"❚❚︎":"▶︎",p.classList.toggle("is-paused",!S),p.setAttribute("aria-label",S?"Pause":"Play")},setSpeed(S){L(S)},setAudioVisible(S){m.hidden=!S,m.classList.toggle("is-hidden",!S)},setMuted(S){y.classList.toggle("is-muted",S),y.setAttribute("aria-label",S?"Unmute audio":"Mute audio")}};function L(S){v.textContent=Yn(S);for(const I of _.children)I.classList.toggle("is-active",I.textContent===Yn(S))}}function Yn(n){return`x${n}`}function uo(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function fo(n,e){const t=Math.min(Wi(e),2);return n.toFixed(t)}function De(n,e){return e?`${n} ${e}`:n}function On(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?Vt(n):e<1e6?`${t}${Vt(n/1e3)}k`:e<1e9?`${t}${Vt(n/1e6)}M`:e<1e12?`${t}${Vt(n/1e9)}B`:`${t}${Vt(n/1e12)}T`:String(n)}function Vt(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ho(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function vn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return On(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Et(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?On(i):fo(i,a)}function Wi(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function mo(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=po(s,i,a);for(const o of s.metadata.liveStats){const l=yo(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function po(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":Et(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:go(a),value:r}]))}}function go(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function yo(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=bo((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:De(a,n.unit)}}function bo(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return typeof e.precision=="number"&&!e.integer?a.toFixed(Math.max(0,e.precision)):t?e.integer?On(Math.round(a)):vo(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):ho(n,{integer:e.integer})}function vo(n){const e=Math.abs(n),t=n<0?"−":"";return e<1e3?n.toFixed(2):e<1e6?`${t}${(e/1e3).toFixed(2)}k`:e<1e9?`${t}${(e/1e6).toFixed(2)}M`:e<1e12?`${t}${(e/1e9).toFixed(2)}B`:`${t}${(e/1e12).toFixed(2)}T`}function Yi(){const n=se("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(_o()),e.className="sci-modal is-hidden",e.innerHTML=`
    <div class="entry-info-modal">
      <button class="entry-info-modal__close" type="button" aria-label="Close">×</button>
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function wo(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function _o(){return wo(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const So={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function ko(n,e,t){const s=se("assets/banner-1600.webp"),i=[`${se("assets/banner-960.webp")} 960w`,`${se("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(h){o.innerHTML="";for(const m of h){const y=document.createElement("button");y.className="entry-overlay__button",y.type="button";const p=So[m.id]??"Explore this simulation scale.";y.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${p}</span>
      `,y.addEventListener("click",()=>t(m)),o.appendChild(y)}}l(e);const{infoButton:c,infoModal:u,close:f}=Yi();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){f(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(h){l(h)}}}function Eo(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(w=>[w.id,w.target])),a=n.metadata.results.map(w=>{const L=zn(n,e,s,w.id);return L===null?null:{id:w.id,value:L,target:w.target}}).filter(w=>w!==null),r=n.parameters.filter(w=>i[w.id]!==void 0).map(w=>{const L=e[w.id]??w.fallbackValue,S=i[w.id]??w.fallbackValue;return Math.abs(L-S)/Math.max(w.max-w.min,1e-9)}),o=r.reduce((w,L)=>w+L,0)/Math.max(r.length,1),l=No(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,h=`${Gn(u,1)} CPU-hrs
${Gn(f,1)} GB`,m=String(n.parameters.length),y=`${(o*100).toFixed(1)}%`,p=String(n.parameters.length+6),g="Present",k=Lo((s==null?void 0:s.wallclockSeconds)??t),v=Js(Qs(zn(n,e,s,"moon_iron"))),_=Js(Qs(zn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:k},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:y},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:h},memoryUsed:{label:"Memory Used",value:Gn(f,1)},particlesUpdated:{label:"Particle updates",value:s?Io(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:_},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:p},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([w,L])=>[w,{label:L.label,value:L.value}]))}}function Io(n){return String(Math.max(0,n))}function Lo(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Gn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function zn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Js(n){return n===null?"--":n.toFixed(1)}function Qs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function No(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const ls={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},Co={HIDE_AFTER_MS:980},Gi="https://media.universemakers.org/engine/run-manifest.json",Jn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",Ao="https://universe-engine.universe-engine.workers.dev/api/track-run",To=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Xs=(()=>{const n=Xe(To),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),wn="#4CD98A",cs="#E8951C",zi="#D7372A",Ji=.2,Qi=.5,Zs=2;function Xi(n){const e=Math.abs(n-1);return e<=Ji?{word:"On target",colour:wn}:e<=Qi?{word:n>1?"Too high":"Too low",colour:cs}:{word:n>1?"Way too high":"Way too low",colour:zi}}function Mo(n){const e=Math.abs(n-1),t=n>=1;return e<=Ji?t?"greenHigh":"greenLow":e<=Qi?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Oo(n){return Math.min(Math.max(n,0),Zs)/Zs*100}function Po(n){return n>=85?{word:"Almost perfect",colour:wn}:n>=65?{word:"Really close",colour:wn}:n>=45?{word:"Getting there",colour:cs}:n>=25?{word:"Not quite",colour:cs}:{word:"Way off - try again",colour:zi}}function xo(n,e,t){var r,o;const s=Mo(t),i=((r=Xs[n])==null?void 0:r[s])??((o=Xs[e])==null?void 0:o[s]);return i||(Xi(t).colour===wn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Ro(n,e,t){return n.metadata.results.map(s=>{const i=$o(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=Fo(s,n,t),o=xo(s.id,r,a),l=De(Zi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function $o(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=Bo((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function Fo(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Bo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Vo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Uo(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const f=document.createElement("button"),h=document.createElement("button");f.className="summary-overlay__button summary-overlay__button--primary",f.type="button",f.textContent="New Parameters",h.className="summary-overlay__button",h.type="button",h.textContent="Home",h.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),h.addEventListener("click",e.onHome),c.appendChild(f),c.appendChild(u),c.appendChild(h),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const y=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__verdict"),g=m.querySelector(".sci-modal__body"),k=m.querySelector(".sci-modal__close"),v=new Set;let _=!1,w=null,L=null;function S(O){const F=Xi(O.value);y.textContent=O.label,p.textContent=F.word,p.style.color=F.colour,p.hidden=!1,g.textContent=O.detail,m.classList.remove("is-hidden")}function I(O,F){y.textContent=O,p.hidden=!0,g.textContent=F,m.classList.remove("is-hidden")}function C(){m.classList.add("is-hidden")}k.addEventListener("click",C),m.addEventListener("click",O=>{O.target===m&&C()}),t.addEventListener("click",O=>{O.target===t&&e.onReplay()});function x(O,F){const E=document.createElement("div");E.className=`${O.className} panel`,E.innerHTML=`<p class="sci-section__title">${O.title}</p>`;const A=document.createElement("div"),W=O.singleRow?Math.max(1,O.stats.length):Math.max(1,Math.min(O.stats.length,O.maxColumns));A.className="metric-grid",O.singleRow&&A.classList.add("metric-grid--single-row"),A.style.setProperty("--summary-grid-columns",String(W)),A.style.setProperty("--summary-grid-max-width",`${O.maxWidthRem}rem`);for(const fe of O.stats){const z=Do(fe,F),J=document.createElement("div"),Y=document.createElement("span"),ee=document.createElement("span");J.className="res-card",Y.className="res-card__label",Y.textContent=z.label,ee.className="res-card__value",ee.textContent=z.value,J.appendChild(Y),J.appendChild(ee),fe.description&&(J.classList.add("res-card--has-info"),J.addEventListener("click",()=>{I(z.label,fe.description)})),A.appendChild(J)}return E.appendChild(A),E}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,_&&(v.clear(),_=!1)},Co.HIDE_AFTER_MS)},resetGalaxyChecklist(){var O;v.clear(),_=!1,L=w;for(const F of r.querySelectorAll(".galaxy-summary__check")){F.classList.remove("is-found");const E=F.querySelector(".galaxy-summary__check-box");E&&(E.textContent="")}(O=r.querySelector(".galaxy-summary__done"))==null||O.remove()},setHomeVisible(O){h.hidden=!O},update(O,F,E,A,W,fe){var U,X,D,_e,me,oe;r.innerHTML="",C();const z=Eo(O,F,E,A),J=O.metadata.summaryStats,Y=Ro(O,F,A),ee=new Set(Y.map(H=>H.id));let ve;if(Y.length>0)ve=Vo(Y);else{const H=((U=z.similarityScore)==null?void 0:U.value)??"0/100";ve=parseInt(H,10)||0}const ie=Po(ve),we=document.createElement("div"),Q=document.createElement("div"),Ne=document.createElement("div");we.className="sci-top",Q.className="summary-main-column",Ne.className="summary-side-column";const he=document.createElement("div");he.className="sci-hero panel",W?(he.classList.add("sci-hero--thumbnail"),he.innerHTML=`<img class="sci-hero__thumbnail" src="${W}" alt="Final frame of simulation" />`):he.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${ve}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${ie.colour}">${ie.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${ve}%; background:${ie.colour}; box-shadow:0 0 12px ${ie.colour}"></div>
          </div>
        `,Q.appendChild(he);const Re=J.filter(H=>(H.section??"resources")==="resources"&&!Y.some(K=>K.id===String(H.id))&&H.id!=="similarityScore"),N=J.filter(H=>H.section==="simulationStats"&&!ee.has(String(H.id)));Re.length>0&&Ne.appendChild(x({title:"Resources Used",className:"res-section",stats:Re,maxColumns:3,maxWidthRem:48},z)),N.length>0&&Ne.appendChild(x({title:"Simulation Stats",className:"res-section",stats:N,maxColumns:N.length,maxWidthRem:48,singleRow:!0},z)),we.appendChild(Q),Ne.childElementCount>0&&we.appendChild(Ne),r.appendChild(we);const P=O.metadata.morphologyChecklist;if(P&&P.length>0){const H=((D=(X=A==null?void 0:A.summaryMetrics)==null?void 0:X.morphology)==null?void 0:D.value)??null,K=(H==null?void 0:H.toLowerCase())??null,ae=new Set(P.map(j=>j.id));w=fe??null,K&&ae.has(K)&&w!==L&&v.add(K),w!==L&&(L=null);const Z=document.createElement("div");Z.className="sci-bottom-row";const ke=document.createElement("div");ke.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",ke.appendChild(ei(O,F,I));const pe=((_e=P.find(j=>j.id===K))==null?void 0:_e.label)??H;if(pe){const j=document.createElement("div");j.className="sci-section panel param-section";const re=document.createElement("p");re.className="sci-section__title",re.textContent="Galaxy Morphology";const Ee=document.createElement("div");Ee.className="res-card res-card--has-info";const $e=document.createElement("span");$e.className="res-card__value",$e.textContent=pe,Ee.appendChild($e),Ee.addEventListener("click",()=>{var qe;return I("Galaxy Morphology",((qe=P.find(st=>st.id===(H??"").toLowerCase()))==null?void 0:qe.description)??`This galaxy is classified as "${pe}".`)}),j.appendChild(re),j.appendChild(Ee),ke.appendChild(j)}Z.appendChild(ke);const ne=document.createElement("div");ne.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const V=((oe=(me=A==null?void 0:A.summaryMetrics)==null?void 0:me.description)==null?void 0:oe.value)??null;if(V){const j=document.createElement("div");j.className="sci-section panel",j.style.cssText="flex:0 1 auto; min-width:0;";const re=document.createElement("p");re.className="sci-section__title",re.textContent="About This Galaxy";const Ee=document.createElement("p");Ee.className="galaxy-summary__desc-text",Ee.textContent=V,j.appendChild(re),j.appendChild(Ee),ne.appendChild(j)}const Ce=document.createElement("div");Ce.className="sci-section panel",Ce.style.cssText="flex:1; min-height:0;";const je=document.createElement("p");je.className="sci-section__title",je.textContent="Morphology Scavenger Hunt";const Ye=document.createElement("div");Ye.className="galaxy-summary__checklist",Ye.style.cssText="flex:1; align-items:center;";const ht=P.every(j=>v.has(j.id));for(const j of P){const re=document.createElement("div");re.className="galaxy-summary__check",v.has(j.id)&&re.classList.add("is-found"),re.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${v.has(j.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${j.label}</span>
          `,j.hint&&(re.classList.add("res-card--has-info"),re.addEventListener("click",()=>I(j.label,j.hint))),Ye.appendChild(re)}if(Ce.appendChild(je),Ce.appendChild(Ye),ht){_=!0;const j=document.createElement("div");j.className="galaxy-summary__done",j.textContent="★ You've discovered all of the galaxy types. Well done! ★",Ce.appendChild(j)}ne.appendChild(Ce),Z.appendChild(ne),r.appendChild(Z)}else if(Y.length>0){const H=document.createElement("div");H.className="sci-bottom-row",H.appendChild(ei(O,F,I));const K=document.createElement("div"),ae=document.createElement("div"),Z=document.createElement("p"),ke=document.createElement("p");K.className="sci-section panel",ae.className="sci-section__header",Z.className="sci-section__title",Z.textContent="Similarity Results",ke.className="sci-section__hint",ke.textContent="Select any bar for details",ae.appendChild(Z),ae.appendChild(ke);const pe=document.createElement("div");pe.className="sci-bars";for(const ne of Y){const V=document.createElement("div");V.className="sci-bar",V.innerHTML=`
            <div class="sci-bar__name">${ne.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Oo(ne.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${ne.formattedValue}</div>
          `,V.addEventListener("click",()=>S(ne)),pe.appendChild(V)}K.appendChild(ae),K.appendChild(pe),H.appendChild(K),r.appendChild(H)}}}}function Do(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Ho(s,n);if(i)return{label:n.label??t.label,value:i};const a=Zi(s,n);return{label:n.label??t.label,value:De(a,n.unit)}}function ei(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const f=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":Et(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=De(f,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Ho(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?De(vn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):De(vn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):De(n,e.unit)}function Zi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return vn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return vn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return On(i)}function jo(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=qo(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",u=>{u.stopPropagation(),e.onSelect(a.id)}),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Ko()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function qo(n){switch(n){case"icon_houdini":return Te(`
        <rect x="4.5" y="8" width="9.8" height="8" rx="1.2"></rect>
        <path d="M14.3 10.1 19.5 7.3v9.4l-5.2-2.8Z"></path>
        <circle cx="8" cy="7" r="1.4"></circle>
        <circle cx="11.3" cy="7" r="1.4"></circle>
      `);case"icon_material":return Te(`
        <path d="M12 4.6a7.4 7.4 0 1 0 7.4 7.4"></path>
        <path d="M12 12V4.6"></path>
        <path d="M12 12h7.4"></path>
        <path d="M12 8.8a3.2 3.2 0 0 1 3.2 3.2"></path>
        <path d="M12 12V8.8"></path>
        <path d="M12 12h3.2"></path>
      `);case"icon_temperature":return Te(`
        <path d="M10.8 6.2a2.2 2.2 0 0 1 4.4 0v7.1a4.2 4.2 0 1 1-4.4 0Z"></path>
        <path d="M13 8.3v7.1"></path>
        <circle cx="13" cy="17.5" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"icon_pressure":return Te(`
        <path d="M5.2 16a6.8 6.8 0 1 1 13.6 0"></path>
        <path d="M12 9.2v2"></path>
        <path d="M8.2 10.8 9.4 12"></path>
        <path d="M15.8 10.8 14.6 12"></path>
        <path d="M12 16 16.4 11.8"></path>
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"></circle>
      `);case"dark-matter":return Te(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Te(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Te(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Te(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Te(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"turntable":return Te(`
        <ellipse cx="12" cy="17.2" rx="7.6" ry="1.8"></ellipse>
        <path d="M12 6.2v6.4"></path>
        <path d="m12 6.2-2.6 2"></path>
        <path d="m12 6.2 2.6 2"></path>
        <path d="M12 12.6l-2.6-2"></path>
        <path d="M12 12.6l2.6-2"></path>
      `);case"large-scale-structure":return Te(`
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
      `);case"line-trace":return Te(`
        <path d="M3.5 14.5h3l2.2-5 2.8 9 2.4-6 1.8 2.5H20.5"></path>
        <path d="M3.5 19.5h17"></path>
        <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none"></circle>
        <circle cx="11.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"></circle>
      `);default:return null}}function Te(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Ko(){return Te(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Wo=`# Credits source-of-truth.
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
`;function Yo(){const n=Xe(Wo);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Go(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:zo(u),i.innerHTML="";const h=document.createElement("div");h.className="parameter-editor__heading",h.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(h);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const y=m.querySelector(".sci-modal__title"),p=m.querySelector(".sci-modal__body"),g=m.querySelector(".sci-modal__close");function k(w,L){y.textContent=w,p.textContent=L,m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}g.addEventListener("click",v),m.addEventListener("click",w=>{w.target===m&&v()});const _=document.createElement("div");_.className="parameter-editor__list";for(const w of u.parameters)_.appendChild(l(w,k));i.appendChild(_),c()}function l(u,f){const h=document.createElement("div");h.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const y=document.createElement("span");y.className="res-card__label",y.textContent=u.label;const p=u.displayUnit??u.unit,g=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,k=document.createElement("span");if(k.className="param-card__range",g){const S=u.qualiLabels;k.textContent=`${S[0]} – ${S[S.length-1]}`}else k.textContent=`${De(Et(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)} – ${De(Et(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}`;m.appendChild(y),m.appendChild(k);const v=document.createElement("input");v.className="param-card__slider",v.type="range";const _=r[u.id]??u.fallbackValue;if(g){const S=u.qualiLabels.length;v.min="0",v.max=String(S-1),v.step="any",v.value=String(Math.round(_))}else{const S=u.logScale?Math.log10(u.min):u.min,I=u.logScale?Math.log10(u.max):u.max;v.min=String(S),v.max=String(I),v.step=u.logScale?"0.001":String(u.step),v.value=String(u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_)}v.setAttribute("aria-label",u.label);const w=document.createElement("span");w.className="res-card__value";function L(S){if(g){const I=Math.round(S),C=u.qualiLabels;r[u.id]=I,v.style.setProperty("--fill",`${fn(S,0,C.length-1)}%`),w.textContent=C[I]??String(I)}else{const I=u.logScale?10**S:S;r[u.id]=I,v.value=String(S),v.style.setProperty("--fill",`${fn(S,parseFloat(v.min),parseFloat(v.max))}%`),w.textContent=De(Et(I,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}c()}if(v.addEventListener("input",()=>{L(parseFloat(v.value))}),v.addEventListener("pointerdown",S=>S.stopPropagation()),v.addEventListener("click",S=>S.stopPropagation()),g){const S=Math.round(_),I=u.qualiLabels;v.style.setProperty("--fill",`${fn(S,0,I.length-1)}%`),w.textContent=I[S]??String(S)}else{const S=u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_;v.style.setProperty("--fill",`${fn(S,parseFloat(v.min),parseFloat(v.max))}%`),w.textContent=De(Et(_,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),p)}if(u.description){h.classList.add("res-card--has-info"),h.setAttribute("title",u.description);const S=document.createElement("span");S.className="param-card__info-btn",S.setAttribute("aria-label","Parameter description"),S.textContent="ⓘ",m.appendChild(S),h.addEventListener("click",()=>{f(u.label,u.description)})}return h.appendChild(m),h.appendChild(v),h.appendChild(w),h}function c(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function zo(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function fn(n,e,t){return t===e?0:(n-e)/(t-e)*100}const ea="universe-engine-advanced-settings",Jo="RSSSE26UM_Engine";function _n(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75,lockFullscreen:!1}}function Qo(n){const e=localStorage.getItem(ea);if(!e)return _n();try{const t=JSON.parse(e);return ta(t,n)}catch{return _n()}}function Xo(n,e){const t=ta(n,e);return localStorage.setItem(ea,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume,lockFullscreen:t.lockFullscreen})),t}function ta(n,e){const t=_n(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Zo(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o,lockFullscreen:!!n.lockFullscreen}}function Zo(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):_n().defaultAudioVolume}function el(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function tl(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
      <p class="config-overlay__media-subtitle"></p>
    </div>
  `,a.prepend(r);const o=a.querySelector(".config-overlay__media-subtitle"),l=document.createElement("img");l.className="config-overlay__chartermark",l.src=se("assets/credits/des9400-chartermark.webp"),l.alt="DES9400 SSE 2026 Chartermark",l.decoding="async",a.appendChild(l);const c=document.createElement("div");c.className="config-overlay__controls",c.dataset.view=e.initialView??"parameters";const u=document.createElement("div");u.className="config-overlay__header";const f=document.createElement("div");f.className="config-overlay__title-block",f.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const h=f.querySelector(".config-overlay__eyebrow"),m=f.querySelector(".config-overlay__title"),y=f.querySelector(".config-overlay__subtitle"),p=document.createElement("button");p.className="config-overlay__close",p.type="button",p.setAttribute("aria-label","Back"),p.textContent="←",u.appendChild(f),u.appendChild(p);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="parameters";const k=document.createElement("div");g.appendChild(k);const v=document.createElement("section");v.className="config-overlay__section config-overlay__section--grow",v.dataset.section="settings";const _=document.createElement("div");_.className="config-overlay__settings-block",_.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const w=document.createElement("section");w.className="config-overlay__settings-group config-overlay__settings-block",w.innerHTML=`
    <p class="config-overlay__eyebrow">Galaxy checklist</p>
    <p class="config-overlay__settings-copy">Clear the galaxy scavenger-hunt progress and uncheck every morphology box for this session.</p>
  `;const L=document.createElement("button");L.className="advanced-settings__access",L.type="button",L.textContent="Reset Galaxy Checkboxes",L.addEventListener("click",()=>{e.onResetGalaxyChecklist()}),w.appendChild(L),v.appendChild(_),v.prepend(w);const S=document.createElement("section");S.className="audio-settings config-overlay__settings-block",S.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const I=document.createElement("label");I.className="advanced-settings__field advanced-settings__field--inline";const C=document.createElement("input"),x=document.createElement("span");C.type="checkbox",C.className="advanced-settings__checkbox",x.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,I.appendChild(C),I.appendChild(x),S.appendChild(I);const O=document.createElement("label");O.className="advanced-settings__field",O.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const F=document.createElement("input"),E=document.createElement("span");F.type="range",F.min="0",F.max="100",F.step="1",F.className="audio-settings__slider",E.className="audio-settings__value",O.appendChild(F),O.appendChild(E),S.appendChild(O),v.appendChild(S);const A=document.createElement("section");A.className="advanced-settings config-overlay__settings-block",A.dataset.state="closed",A.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const W=document.createElement("button");W.className="advanced-settings__access",W.type="button",W.textContent="Advanced Settings",A.appendChild(W);const fe=document.createElement("div");fe.className="advanced-settings__auth";const z=document.createElement("input");z.className="advanced-settings__password",z.type="password",z.placeholder="Enter password",z.autocomplete="off";const J=document.createElement("button");J.className="advanced-settings__unlock",J.type="button",J.textContent="Unlock";const Y=document.createElement("p");Y.className="advanced-settings__message",fe.appendChild(z),fe.appendChild(J),fe.appendChild(Y),A.appendChild(fe);const ee=document.createElement("div");ee.className="advanced-settings__form";const ve=document.createElement("label");ve.className="advanced-settings__field",ve.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const ie=document.createElement("select");ie.className="advanced-settings__select",ie.appendChild(new Option("None",""));for(const M of e.availableScales)ie.appendChild(new Option(M.label,M.id));ve.appendChild(ie),ee.appendChild(ve);const we=document.createElement("div");we.className="advanced-settings__field",we.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const Q=document.createElement("div");Q.className="advanced-settings__options";const Ne=document.createElement("label"),he=document.createElement("input");Ne.className="advanced-settings__choice",he.type="radio",he.name="manifest-source",he.value="local",Ne.appendChild(he),Ne.append("Local manifest");const Re=document.createElement("label"),N=document.createElement("input");Re.className="advanced-settings__choice",N.type="radio",N.name="manifest-source",N.value="online",Re.appendChild(N),Re.append("Online manifest"),Q.appendChild(Ne),Q.appendChild(Re),we.appendChild(Q),ee.appendChild(we);const P=document.createElement("label");P.className="advanced-settings__field advanced-settings__field--inline";const U=document.createElement("input"),X=document.createElement("span");U.type="checkbox",U.className="advanced-settings__checkbox",X.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,P.appendChild(U),P.appendChild(X),ee.appendChild(P);const D=document.createElement("label");D.className="advanced-settings__field advanced-settings__field--inline";const _e=document.createElement("input"),me=document.createElement("span");_e.type="checkbox",_e.className="advanced-settings__checkbox",me.innerHTML=`
    <span class="advanced-settings__label">Lock fullscreen</span>
    <span class="advanced-settings__help">Remove the Fullscreen option from the burger menu to keep the app locked to fullscreen.</span>
  `,D.appendChild(_e),D.appendChild(me),ee.appendChild(D);const oe=document.createElement("div");oe.className="advanced-settings__field",oe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const H=document.createElement("div");H.className="advanced-settings__options";const K=new Map;for(const M of e.availableScales){const B=document.createElement("label"),ge=document.createElement("input");B.className="advanced-settings__choice",ge.type="checkbox",ge.value=M.id,K.set(M.id,ge),B.appendChild(ge),B.append(`Show ${M.label}`),H.appendChild(B)}oe.appendChild(H),ee.appendChild(oe),A.appendChild(ee),v.appendChild(A);const ae=document.createElement("section");ae.className="config-overlay__section config-overlay__section--grow",ae.dataset.section="credits",ae.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const Z=ae.querySelector("[data-credits]"),ke=Yo();if(Z.innerHTML="",ke.length===0){const M=document.createElement("div");M.className="credits-list__entry",M.textContent="To be credited...",Z.appendChild(M)}else for(const M of ke)if(M.header){const B=document.createElement("div");B.className="credits-list__heading",B.textContent=M.text,Z.appendChild(B)}else{const B=document.createElement("div");B.className="credits-list__entry";const ge=document.createElement("span");if(ge.className="credits-list__text",M.url){const q=document.createElement("a");q.className="credits-list__link",q.href=M.url,q.target="_blank",q.rel="noopener noreferrer",q.textContent=M.text,ge.appendChild(q)}else ge.textContent=M.text;B.appendChild(ge),Z.appendChild(B)}const pe=document.createElement("div");pe.className="config-overlay__footer";const ne=document.createElement("button");ne.className="run-button",ne.type="button",ne.textContent="Run",pe.appendChild(ne),c.appendChild(u),c.appendChild(g),c.appendChild(v),c.appendChild(ae),c.appendChild(pe),i.appendChild(a),i.appendChild(c),s.appendChild(i),t.appendChild(s),n.appendChild(t);let V=Ut(e.advancedSettings),Ce="closed",je=!e.advancedSettings.lockedScaleId;const Ye=Go(k,e.simClass,e.values,e.onValuesChange),ht=to(_,e.theme,e.onThemeChange);p.addEventListener("click",e.onClose),W.addEventListener("click",()=>{if(Ce==="open"){$e("closed");return}$e("auth"),z.focus()}),J.addEventListener("click",Ee),z.addEventListener("keydown",M=>{M.key==="Enter"&&Ee()}),ie.addEventListener("change",()=>{V.lockedScaleId=ie.value||null,re()}),he.addEventListener("change",()=>{he.checked&&(V.manifestSource="local")}),N.addEventListener("change",()=>{N.checked&&(V.manifestSource="online")}),U.addEventListener("change",()=>{V.verboseLogging=U.checked}),C.addEventListener("change",()=>{V.audioMutedByDefault=C.checked}),F.addEventListener("input",()=>{V.defaultAudioVolume=Number(F.value)/100,en()}),_e.addEventListener("change",()=>{V.lockFullscreen=_e.checked});for(const[M,B]of K.entries())B.addEventListener("change",()=>{if(Array.from(K.entries()).filter(([,q])=>q.checked).map(([q])=>q).length===0&&!V.lockedScaleId){B.checked=!0;return}V.hiddenScaleIds=Array.from(K.keys()).filter(q=>{var mt;return!((mt=K.get(q))!=null&&mt.checked)&&q!==V.lockedScaleId}),re()}),M===V.lockedScaleId&&(B.disabled=!0);j(e.initialView??"parameters"),re(),Ge(je);function j(M){c.dataset.view=M,M==="parameters"?(h.textContent=e.simClass.label,m.textContent="Shape Your Simulation",y.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",o.textContent=e.simClass.label,o.hidden=!1,r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):M==="settings"?(h.textContent="Interface",m.textContent="Adjust The Control Room",y.textContent="Change the interface theme and manage exhibit-level options for this installation.",o.textContent="",o.hidden=!0,r.src=se("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(h.textContent="References",m.textContent="Project Sources And Attribution",y.textContent="Review the datasets, imagery, and supporting materials behind this experience.",o.textContent="",o.hidden=!0,r.src=se("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),M==="settings"?ne.textContent="Apply":ne.textContent="Run Simulation",pe.hidden=M==="credits",tn()}function re(){ie.value=V.lockedScaleId??"",he.checked=V.manifestSource==="local",N.checked=V.manifestSource==="online",U.checked=V.verboseLogging,C.checked=V.audioMutedByDefault,_e.checked=V.lockFullscreen,F.value=String(Math.round(V.defaultAudioVolume*100)),en();for(const[M,B]of K.entries()){const ge=V.lockedScaleId===M;B.checked=ge||!V.hiddenScaleIds.includes(M),B.disabled=ge}}function Ee(){if(z.value!==Jo){Y.textContent="Incorrect password";return}z.value="",Y.textContent="",$e("open")}function $e(M){Ce=M,A.dataset.state=M,W.textContent=M==="open"?"Hide Advanced Settings":"Advanced Settings",M!=="auth"&&(Y.textContent="")}function qe(){z.value="",Y.textContent="",$e("closed")}function st(){V=Ut(e.advancedSettings),re()}function en(){E.textContent=`${Math.round(Number(F.value))}%`}function tn(){const M=c.dataset.view,B=M==="settings"||M==="credits"||je;p.hidden=!B,p.classList.toggle("is-hidden",!B),p.setAttribute("aria-label",M==="parameters"?"Back":"Close"),p.textContent=M==="parameters"?"←":"×"}function Ge(M){je=M,tn()}return ne.addEventListener("click",()=>{if(c.dataset.view==="settings"){e.onApplySettings(Ut(V));return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),st(),qe()},setSimulation(M,B){e.simClass=M,a.dataset.simClass=M.id,Ye.setSimClass(M,B),c.dataset.view==="parameters"&&(r.src=M.placeholderImage,r.alt=`${M.label} preview`,j("parameters"))},setTheme(M){ht.setActive(M)},setView(M){j(M),M!=="settings"&&qe()},setAdvancedSettings(M){e.advancedSettings=Ut(M),V=Ut(M),re(),qe()},setBackVisible:Ge}}function Ut(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume,lockFullscreen:n.lockFullscreen}}function nl(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=ls,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const y of l)window.clearTimeout(y);l=[]}function f(y,p){return new Promise(g=>{const k=window.setTimeout(()=>{p===c&&g()},Math.max(0,y));l.push(k)})}async function h(y,p){const g=document.createElement("div");g.className="terminal__line";const k=m();g.appendChild(k),o.appendChild(g);for(let v=0;v<y.length;v+=1){if(p!==c)return;const _=y[v];g.insertBefore(document.createTextNode(_),k),o.scrollTop=o.scrollHeight,await f(e,p)}k.remove()}function m(){const y=document.createElement("span");return y.className="terminal__cursor",y.textContent="█",y}return{async show(y,p,g,k){u(),c+=1;const v=c;i.hidden=!1,i.classList.remove("is-hidden");const _=performance.now(),w=(k==null?void 0:k.minTerminalTimeMs)??t;let L=!g,S=[...y];g&&g.then(()=>{L=!0});let I=0;for(;v===c;){S.length===0&&(S=[...y]);const x=Math.floor(Math.random()*S.length),[O]=S.splice(x,1),F=`${ti(I)} ${O.text}`;if(I+=1,await h(F,v),v!==c)return;if(performance.now()-_>=w&&L)break}if(v!==c)return;const C=document.createElement("div");C.className="terminal__line terminal__line--syncing",C.textContent=`${ti(I)} STARTING SIMULATION...`,o.appendChild(C),o.scrollTop=o.scrollHeight,await f(s,v),v===c&&p()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function ti(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Qn(t)}:${Qn(s)}:${Qn(i)}]`}function Qn(n){return String(n).padStart(2,"0")}function sl(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{u(),e.onHome()}),r=c("Select Parameters",()=>{u(),e.onParameters()});s.appendChild(a),s.appendChild(r),s.appendChild(c("Settings",()=>{u(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{u(),e.onViewSelected("credits")}));const o=c("Fullscreen",()=>{var h;u(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});o.classList.add("display-menu__fullscreen"),s.appendChild(o),n.appendChild(s);function l(){const h=o.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",l),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",h=>{n.contains(h.target)||u()}),f(e.showHome??!0),{close:u,setHomeVisible:f,setFullscreenVisible(h){o.hidden=!h,o.classList.toggle("is-hidden",!h)}};function c(h,m){const y=document.createElement("button");return y.className="display-menu__item",y.type="button",y.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,y.addEventListener("click",m),y}function u(){n.classList.remove("open")}function f(h){a.hidden=!h,a.classList.toggle("is-hidden",!h),r.hidden=h,r.classList.toggle("is-hidden",h)}}const na="universe-engine-playback-speed",il=new Set([.25,.5,1,2]);function al(){const n=localStorage.getItem(na),e=n?Number(n):NaN;return il.has(e)?e:1}function rl(n){localStorage.setItem(na,String(n))}async function hn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function ol(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const ll=`# Initialization terminal script for the Planetary simulation family.
#
# Each entry is a single line that may be selected randomly at runtime.

- 'INIT_EARTH :: loading continental crusts and oceanic crusts into memory'
- 'INIT_EARTH :: making the Earth soft centred like a very hot chocolate truffle'
- 'INIT_EARTH :: checking that the mantle is molten enough to be dramatic'
- 'INIT_EARTH :: minding its own business'
- 'INIT_EARTH :: winning the goldilocks zone lottery'
- 'INIT_EARTH :: expressing equations of state in a way that makes sense to the computer'
- 'INIT_IMPACTOR :: selecting one large rock with terrible intentions'
- 'INIT_IMPACTOR :: solving for a collision nobody involved will enjoy'
- 'INIT_IMPACTOR :: setting up proto-planet pinball'
- 'INIT_IMPACTOR :: checking if catastrophic failure counts as satellite formation'
- 'INIT_IMPACTOR :: sending Bruce Willis and a really big bomb to the rescue'
- 'INIT_MATERIAL :: solving problems in multi-material simulations just to slam things together'
- 'INIT_MATERIAL :: preparing to mix iron, rock, and magma in a planetary cocktail'
- 'INIT_ORBIT :: aligning the crosshairs with Earth'
- "INIT_ORBIT :: emulating Moonfall, Hollywood's finest achievement"
- 'INIT_ORBIT :: turning orbital mechanics into a countdown to regret'
- 'INIT_ORBIT :: checking that all trajectories intersect in the least peaceful way possible'
- 'INIT_ORBIT :: playing the best crossover album ever, Collision Course'
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
- 'INIT_FUNDING :: trying to secure future funding for the sciences while funding gets cut'
`,cl=`# Initialization terminal script for the Galaxy simulation family.
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
`,ul=`# Initialization terminal script for the Cosmos simulation family.
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
`,dl={planetary:ll,galaxy:cl,cosmos:ul};function fl(n){return Xe(dl[n.id]).map(t=>({text:t}))}function zt(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var f;const l=t[o.id]??o.fallbackValue,c=((f=n.parameters)==null?void 0:f[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function hl(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(u=>u.primary!==!1).map(u=>u.id)),i=new Set(e.filter(u=>u.primary===!1).map(u=>u.id));if(!e.some(u=>u.primary===!1))return Xn(n,e,t);const r=Xn(n,e,t,s);if(!r)return null;const o=zt(r,e,t,s),l=1e-6,c=n.filter(u=>{const f=zt(u,e,t,s);return Math.abs(f-o)<=l});return Xn(c,e,t,i)}function Xn(n,e,t,s){if(n.length===0)return null;let i=n[0],a=zt(i,e,t,s);for(const r of n.slice(1)){const o=zt(r,e,t,s);o<a&&(i=r,a=o)}return i}function ml(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function pl(n){try{const e=await tt(n);if(!e.ok)return null;const t=await e.text(),s=Xe(t),i=wt(s.wallclockSeconds),a=wt(s.computeUsed),r=wt(s.memoryUsed),o=wt(s.carbonBurnt),l=wt(s.particlesUpdated),c=await gl(n),u=bl(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function gl(n){try{const e=await tt(yl(n));if(!e.ok)return{};const t=await e.text(),s=Xe(t);return vl(s)}catch{return{}}}function yl(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function wt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function bl(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function vl(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=wt(s);i!==null&&(e[t]=i)}return e}const sa="[UniverseEngine]";let ia=!1;function ni(n){ia=n}function aa(){return ia}function de(n,e){aa()&&console.info(sa,n,e??"")}function Je(n,e){aa()&&console.warn(sa,n,e??"")}const wl={local:"assets/local-manifest.json",online:Gi};function _l(n="local"){let e=n;const t=new Map,s=new Map;return{getSource(){return e},setSource(i){t.delete(i),s.delete(i),io(),e=i,de("Manifest source updated",{source:i})},async preloadActiveManifest(){await oa(e,t,s)},async findNearestVideo(i,a,r){const o=await El(e,t,s,i,a,r);if(o)return o;const l=ra(i);return Je("Falling back to placeholder assets",{simClassId:i,source:e,fallbackUrl:l}),{url:l,liveDataUrl:Sl(i),summaryUrl:ml(l)}}}}function ra(n){switch(n){case"planetary":return se("assets/planet_test.mp4");case"galaxy":return se("assets/galaxy_test.mp4");case"cosmos":return se("assets/cosmo_test.mp4");default:return se("assets/galaxy_test.mp4")}}function Sl(n){switch(n){case"planetary":return se("assets/planet_test_planetary_stats.csv");case"galaxy":return se("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return se("assets/cosmo_test_cosmos_stats.csv");default:return se("assets/galaxy_test_galaxy_stats.csv")}}async function oa(n,e,t){const s=e.get(n);if(s)return s;const i=wl[n],a=(n==="online"?kl(i):fetch(se(i),{cache:"no-store"}).then(async r=>{if(!r.ok)throw new Error(`Failed to load manifest: ${i}`);return de("Loaded manifest",{source:n,manifestPath:i}),await r.json()})).then(r=>(t.set(n,Il()),r)).catch(r=>(t.delete(n),Je("Manifest unavailable",{source:n,manifestPath:i,error:r instanceof Error?r.message:String(r)}),{version:1,runs:[]}));return e.set(n,a),a}async function kl(n){const e=[n,Jn];for(const t of e)try{const s=await fetch(t,{cache:"no-store"});if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??si(Gi),r=i.backupBase??si(Jn);return so(a,r),t===Jn&&ao("backup"),de("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function El(n,e,t,s,i,a){const o=(await oa(n,e,t)).runs.filter(h=>h.simulationId===s);if(o.length===0)return Je("No manifest runs found for simulation",{simClassId:s,source:n}),null;const l=hl(o,i,a);if(!l)return null;const c=zt(l,i,a),u=l.defaultView??Object.keys(l.views)[0],f=l.views[u];return f?(de("Selected manifest-backed run",{simClassId:s,source:n,runId:l.runId,selectedValues:a,distance:c,viewId:u}),{url:Dt(n,f,t),liveDataUrl:Dt(n,l.liveDataPath,t),summaryUrl:Dt(n,l.summaryPath,t),audioUrl:l.audioPath?Dt(n,l.audioPath,t):void 0,viewId:u,runId:l.runId,views:Object.fromEntries(Object.entries(l.views).map(([h,m])=>[h,Dt(n,m,t)]))}):null}function Dt(n,e,t){const s=n==="local"?se(e):Ke(e),i=t.get(n);return i?Hi(s,"_manifest",i):s}function Il(){return`${Date.now()}`}function si(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const qt={mode:"time",frames:[]};async function Ll(n){const e=await tt(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Al(t)}function Nl(n,e,t=0){if(n.mode==="row")return Tl(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=Cl(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return Ml(r.values,o.values,l)}function Cl(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function Al(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return qt;const t=Zn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Zn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Zn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function Tl(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Zn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function Ml(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=Ol(u);continue}i[a]=t<.5?r:o}return i}function Ol(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Pl(n){xl(Ao,n)}function xl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){de("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?de("Run selection tracked",{simulationId:e.simulationId}):Je("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Je("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const ii=50*1024*1024,Rl=8,$l=6e3,Fl=8e3,Bl=7e3,Vl=1200,Ul=100,Dl="(max-width: 768px), (max-height: 450px)",Hl="(hover: none), (pointer: coarse)",jl=2e3,ql=250,Kl=1,Wl=1500,es={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Yl(n){const e=vt.map(d=>d.id);let t=Qo(e),s=xs(t);const i=_l(t.manifestSource),a=ol(),r=window.matchMedia(Dl),o=window.matchMedia(Hl);ni(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let l=Rs(t.lockedScaleId)??s[0]??vt[0],c=t.lockedScaleId?es[l.id]:eo(),u=!1,f=0,h=null,m=null,y=!1,p=t.audioMutedByDefault,g=t.defaultAudioVolume,k=0;const v=new Set;let _=null,w=0,L=qt,S=null,I=0,C=!r.matches,x=!1;const O=Object.fromEntries(vt.map(d=>[d.id,_a(d)]));Wn(c);const F=ra(l.id),E=oo(n,F),A=document.createElement("audio");A.preload="auto",A.hidden=!0,A.setAttribute("playsinline","true"),A.muted=p,A.volume=g,n.appendChild(A);const W=document.createElement("div");W.className="display-chrome",W.classList.add("is-hidden"),n.appendChild(W);const fe=document.createElement("div");fe.className="orientation-overlay",fe.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(fe);const z=document.createElement("div");z.className="swift-logo",z.innerHTML=`
    <img
      class="swift-logo__image"
      src="${se("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      decoding="async"
    />
    <img
      class="swift-logo__image-compact"
      src="${se("assets/credits/swift-logo-compact.webp")}"
      alt="SWIFT"
      decoding="async"
    />
  `,n.appendChild(z);const J=document.createElement("div");J.className="synth-logo is-hidden",J.innerHTML=`
    <img
      class="synth-logo__image"
      src="${se("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
    <img
      class="synth-logo__image-compact"
      src="${se("assets/credits/synthesizer_banner_compact.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(J);const Y=document.createElement("img");Y.className="app-partner-logo",Y.src=se("assets/dirac-hpc-white.webp"),Y.alt="DIRAC HPC",Y.decoding="async",n.appendChild(Y);const ee=document.createElement("div");ee.className="display-chrome__top-left is-hidden",n.appendChild(ee);const ve=sl(ee,{onHome(){Rn()},onParameters(){xt("parameters")},onViewSelected(d){if(d==="credits"){xt("credits");return}xt(d)},showHome:!t.lockedScaleId});ve.setFullscreenVisible(!t.lockFullscreen);const ie=document.createElement("div");ie.className="display-chrome__left-center",W.appendChild(ie);const we=jo(ie,{onSelect(d){As(d)},onInfo(d,b,T){Ne.textContent=b,he.textContent=T,Q.classList.add("is-visible")}}),Q=document.createElement("div");Q.className="view-info-overlay",Q.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(Q);const Ne=Q.querySelector(".view-info-overlay__title"),he=Q.querySelector(".view-info-overlay__text"),Re=Q.querySelector(".view-info-overlay__close");Q.addEventListener("click",d=>{d.target===Q&&Q.classList.remove("is-visible")}),Re.addEventListener("click",()=>{Q.classList.remove("is-visible")});const N=document.createElement("div");N.className="display-chrome__top-center is-hidden",W.appendChild(N);const P=document.createElement("div");P.className="display-chrome__top-right",W.appendChild(P);const U=mo(P);function X(){C=!r.matches,ot(P,C),C&&(Ze(w),S&&L.frames.length===0&&I>0&&Ts(S,I))}X(),r.addEventListener("change",X);const D=document.createElement("div");D.className="display-chrome__center-status",D.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,W.appendChild(D);const _e=al();E.setPlaybackRate(_e);const me=document.createElement("div");me.className="display-chrome__bottom",W.appendChild(me);const oe=co(me,{onChange(d){j(d)},onTogglePlay:Cs,onAudioToggle:ma,onSpeedChange:pa,onSummaryClick:ha,onScrubStart(){en(),ht()},onScrubEnd(){tn(),E.isPaused()||Ye()},initialSpeed:_e});oe.setPlaying(!E.isPaused()),oe.setAudioVisible(!1),oe.setMuted(p),A.addEventListener("loadedmetadata",()=>{A.playbackRate=E.getPlaybackRate(),$t({force:!0}),Ae()});let H=null,K=null,ae=null,Z=!1,ke=!1,pe=0,ne=!1,V=null,Ce=0,je=Number.NEGATIVE_INFINITY;function Ye(){if(H!==null)return;function d(){const b=E.getPlaybackFraction();oe.setPosition(b),E.isPaused()?H=null:H=requestAnimationFrame(d)}H=requestAnimationFrame(d)}function ht(){H!==null&&(cancelAnimationFrame(H),H=null)}function j(d){K=d,ae===null&&(ae=requestAnimationFrame(()=>{if(ae=null,K===null)return;const b=K;K=null,E.seekToFraction(b)}))}function re(){if(K===null)return;ae!==null&&(cancelAnimationFrame(ae),ae=null);const d=K;K=null,E.seekToFraction(d)}function Ee(){V!==null&&(window.clearTimeout(V),V=null)}function $e(){if(!(_!=null&&_.views))return[];const d=gt(l,_);return Object.entries(_.views).filter(([b])=>b!==d).map(([,b])=>Ke(b)).filter(Boolean)}function qe(){Ee(),E.suspendPrewarming()}function st(d=Vl){Ee(),!(Z||E.isPaused())&&(V=window.setTimeout(()=>{V=null,!(Z||E.isPaused())&&(E.resumePrewarming(),E.prewarmSources($e()))},Math.max(0,d)))}function en(){Z||(pe+=1,ne=!1,ke=!E.isPaused(),Z=!0,Ce=0,qe(),E.pause(),Ae())}async function tn(){if(!Z)return;const d=++pe;Z=!1,Ce=0,re(),await E.waitForSeekSettled(ql),d===pe&&($t({force:!0}),w=E.getCurrentTimeSeconds(),Ze(w),ke&&(ne=!0,hn(E)),st(),Ae({forceAudioSync:!1}))}E.onPlayStateChange(d=>{if(oe.setPlaying(!d),d?(ht(),qe()):(Ye(),st(0)),!d&&ne){ne=!1;return}Ae()}),E.onTimeUpdate(d=>{if(w=d*E.getDurationSeconds(),Z){const b=performance.now();if(b-Ce<Ul)return;Ce=b}Ze(w),!Z&&$t()});const Ge=document.createElement("div");Ge.className="overlay-layer",n.appendChild(Ge);const M=Yi();M.infoButton.classList.add("is-hidden"),M.infoButton.hidden=!0,n.appendChild(M.infoButton),n.appendChild(M.infoModal);const B=Uo(Ge,{onReplay:fa,onParameters:()=>xt("parameters"),onHome:Rn,showHome:!t.lockedScaleId});E.onEnded(()=>{u=!0,f+=1;const d=E.captureFrame();B.update(l,Me(),E.getDurationSeconds(),h,d,f),B.show(),Ae()});const ge=ko(Ge,s,d=>{Ns(d),xt("parameters")}),q=tl(Ge,{simClass:l,values:Me(),theme:c,advancedSettings:t,availableScales:vt,onValuesChange:ca,onThemeChange:xn,onRun:()=>{de("Parameters submitted — starting run",{simClassId:l.id}),ga().catch(d=>{Je("Run failed to start",{simClassId:l.id,error:d instanceof Error?d.message:String(d)})})},onResetGalaxyChecklist:()=>{B.resetGalaxyChecklist()},onApplySettings:ua,onClose:da,initialView:"parameters"});q.setBackVisible(!t.lockedScaleId);const mt=nl(Ge);oe.setPosition(0),Ze(),B.hide();const it=new WeakMap,Fe=d=>{const b=it.get(d);b&&(clearTimeout(b),it.delete(d)),d.classList.remove("side-collapsed")},at=d=>{const b=it.get(d);b&&clearTimeout(b),it.set(d,setTimeout(()=>{d.classList.add("side-collapsed"),it.delete(d)},jl))},nn=d=>{const b=it.get(d);b&&(clearTimeout(b),it.delete(d)),d.classList.add("side-collapsed")},Pn=(d,b)=>{const T=b.isCollapsible??(()=>!0);d.addEventListener("mouseenter",()=>Fe(d)),d.addEventListener("mouseleave",()=>{if(!T()){Fe(d);return}at(d)}),d.addEventListener("focusin",()=>Fe(d)),d.addEventListener("focusout",R=>{if(!d.contains(R.relatedTarget)){if(!T()){Fe(d);return}at(d)}}),d.addEventListener("click",()=>{if(!T()){Fe(d);return}if(d.classList.contains("side-collapsed")){Fe(d),at(d);return}b.toggleOnClick?nn(d):at(d)}),T()?nn(d):Fe(d)};function la(){return o.matches}Pn(ee,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode==="display"}),Pn(ie,{toggleOnClick:!0}),Pn(me,{toggleOnClick:!1});let Pt=0,pt=null,sn=0;const Is=()=>{pt!==null&&(cancelAnimationFrame(pt),pt=null)},Ls=()=>{if(pt!==null)return;sn=E.getPlaybackFraction();const d=()=>{if(Pt===0){Is();return}const T=12*(1/60)/Math.max(E.getDurationSeconds(),1);sn=Math.max(0,Math.min(1,sn+Pt*T)),E.seekToFraction(sn),pt=requestAnimationFrame(d)};pt=requestAnimationFrame(d)};document.addEventListener("keydown",d=>{if(n.dataset.mode==="display"&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement))switch(d.key){case"Escape":d.preventDefault(),Q.classList.contains("is-visible")?Q.classList.remove("is-visible"):Rn();break;case" ":d.preventDefault(),Cs();break;case"ArrowLeft":d.preventDefault(),Fe(me),at(me),Pt=-1,Ls();break;case"ArrowRight":d.preventDefault(),Fe(me),at(me),Pt=1,Ls();break;case"ArrowUp":case"ArrowDown":{if(d.preventDefault(),Fe(ie),at(ie),!(_!=null&&_.views)||Object.keys(_.views).length<=1)break;const b=l.views.filter(ye=>{var Se;return((Se=_==null?void 0:_.views)==null?void 0:Se[ye.id])!==void 0});if(b.length<=1)break;const T=_.viewId??gt(l,_),R=b.findIndex(ye=>ye.id===T),te=d.key==="ArrowUp"?(R-1+b.length)%b.length:(R+1)%b.length;As(b[te].id);break}}}),document.addEventListener("keyup",d=>{(d.key==="ArrowLeft"||d.key==="ArrowRight")&&(Pt=0,Is())}),E.hideMedia(),E.pause(),rt(t.lockedScaleId?"config":"entry");function Ns(d){d.id===l.id&&x||(l=d,Fn(),xn(es[d.id]),q.setSimulation(l,Me()),oe.setPosition(0),Ze(),an(),$n())}function ca(d){O[l.id]={...d},de("Parameter values updated",{simClassId:l.id,values:O[l.id]}),Ze()}function xn(d){c=d,Wn(d),q.setTheme(d)}function xt(d){d==="parameters"&&q.setSimulation(l,Me()),q.setView(d),rt("config")}function ua(d){if(Oa(d),x){B.hide(),rt("display");return}q.setSimulation(l,Me()),q.setView("parameters")}function da(){if(B.hide(),!x&&t.lockedScaleId){q.setSimulation(l,Me()),q.setView("parameters");return}rt(x?"display":"entry")}function Rn(){t.lockedScaleId||(de("Returning to home screen",{simClassId:l.id}),Fn(),x=!1,E.hideMedia(),rt("entry"))}function fa(){u=!1,B.hide(),E.getPlaybackFraction()>=.999&&(E.resetPlayback(),$t({force:!0})),hn(E),Ae()}function ha(){u=!0,f+=1,E.pause();const d=h?E.captureFrame():null;B.update(l,Me(),E.getDurationSeconds(),h,d,f),B.show(),Ae()}function Cs(){E.isPaused()?hn(E):E.pause()}function ma(){p=!p,Ae()}function pa(d){E.setPlaybackRate(d),A.playbackRate=d,rl(d),oe.setSpeed(d)}async function ga(){const d=Me(),b=a.start();I=b,de("Run requested",{simClassId:l.id,values:d,manifestSource:i.getSource()});const T=await i.findNearestVideo(l.id,l.parameters,d);if(!a.isCurrent(b))return;Fn({preserveRunRequest:!0}),_=T;const R=gt(l,T),te=ro(i.getSource());Pl({simulationId:l.id,parameters:d,manifestSource:i.getSource(),matchedRunId:T.runId,assetHostMode:te.mode,assetHostBase:te.base});const ye=Ia(T,R)??T.url,Se=Object.entries(T.views??{}).filter(([Be])=>Be!==R).map(([,Be])=>Be);S=T.liveDataUrl,Ts(T.liveDataUrl,b),ka(T.summaryUrl,b),Na(T.summaryUrl,b,T.audioUrl),E.setMuted(!0),an(R),Rt(),rt("initializing");const rn=ya(ye);E.resumePrewarming(),E.prewarmSources(Se);const Ft=(async()=>{const Be=await rn;a.isCurrent(b)&&(de(`Prepared active video source: ${Be.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:ye,waitsForBuffer:Be.shouldWaitForBuffer}),E.setSource(Be.src,{ownedObjectUrl:Be.ownedObjectUrl}),E.pause(),await E.waitForLoadedData(Fl),a.isCurrent(b)&&Be.shouldWaitForBuffer&&await E.waitForBufferedAhead(Rl,$l))})();await new Promise(Be=>{mt.show(fl(l),Be,Ft,{minTerminalTimeMs:Ta()})}),a.isCurrent(b)&&(x=!0,E.showMedia(),hn(E),rt("display"),Ae())}async function ya(d){const b=Ke(d),T=await ba(d);if(T!==null&&T>0&&T<=ii){de("Downloading active video behind loading overlay",{videoUrl:b,contentLength:T});try{const R=await tt(d);if(!R.ok)throw new Error(`Failed to download active video: ${b}`);const te=await R.blob();return de(`Active video full fetch complete: ${te.size} bytes`,{videoUrl:Ke(d),blobType:te.type}),{src:URL.createObjectURL(te),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(R){Je(`Full-fetch FAILED; falling back to progressive: ${R instanceof Error?R.message:String(R)}`,{videoUrl:d})}}return T!==null?de("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:d,contentLength:T,fullFetchMaxBytes:ii}):de("Could not determine active video size; using progressive load",{videoUrl:d}),de("Using progressive active video load",{videoUrl:d}),{src:Ke(d),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ba(d){try{const b=await tt(d,{headers:{Range:"bytes=0-0"}});de("Probed active video size with range request",{videoUrl:d,ok:b.ok,status:b.status,contentLength:b.headers.get("Content-Length"),contentRange:b.headers.get("Content-Range")});const T=wa(b.headers.get("Content-Length"));if(T!==null)return T;const R=va(b.headers.get("Content-Range"));return R!==null?R:null}catch(b){return Je("Could not probe active video size",{videoUrl:d,error:b instanceof Error?b.message:String(b)}),null}}function va(d){if(!d)return null;const b=d.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!b)return null;const T=Number(b[1]);return Number.isFinite(T)&&T>0?T:null}function wa(d){if(!d)return null;const b=Number(d);return Number.isFinite(b)?b:null}function rt(d){if(n.dataset.mode=d,d==="entry"?document.documentElement.setAttribute("data-theme","glass"):d==="display"&&Wn(c),ot(W,d==="display"||d==="config"),ot(z,d==="display"||d==="entry"),ot(ee,d==="entry"||d==="config"||d==="display"),ot(M.infoButton,d==="config"&&!!t.lockedScaleId),(d!=="config"||!t.lockedScaleId)&&M.close(),d!=="display"?Fe(ee):nn(ee),d==="entry"&&!t.lockedScaleId?ge.show():ge.hide(),d==="config"?(mt.hide(),q.setSimulation(l,Me()),q.show()):q.hide(),d!=="display")B.hide(),we.hide(),N.classList.add("is-hidden"),N.innerHTML="";else if(u){const T=E.captureFrame();B.update(l,Me(),E.getDurationSeconds(),h,T,f),B.show()}else an();!x||d==="initializing"?(E.hideMedia(),d==="initializing"&&E.pause()):E.showMedia(),d!=="initializing"&&mt.hide(),$n(),Ae()}function $n(){if(n.dataset.mode==="entry"){ot(J,!0);return}const d=n.dataset.mode==="display",b=l.id==="galaxy";ot(J,d&&b)}function Ze(d=0){if(!C)return;const b=Nl(L,d,E.getDurationSeconds()),T=Ea(l,h,d,E.getDurationSeconds());U.update(l,Me(),{...b,...T})}function an(d){const b=l.views.filter(te=>{var ye;return((ye=_==null?void 0:_.views)==null?void 0:ye[te.id])!==void 0});if(b.length<=1){we.hide(),N.classList.add("is-hidden");return}const T=d??gt(l,_),R=b.find(te=>te.id===T);we.update(b,T),R?(N.classList.remove("is-hidden"),N.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):N.classList.add("is-hidden")}function Fn(d={}){d.preserveRunRequest||(a.invalidate(),I=0),L=qt,S=null,u=!1,h=null,_=null,w=0,Z=!1,ke=!1,pe+=1,ne=!1,K=null,Ee(),ae!==null&&(cancelAnimationFrame(ae),ae=null),B.hide(),we.hide(),N.classList.add("is-hidden"),N.innerHTML="",E.pause(),A.pause(),E.clearPrewarmedSources(),E.resetPlayback(),oe.setPosition(0),Ps()}function As(d){if(la()&&nn(ie),!(_!=null&&_.views)||d===gt(l,_))return;const b=Ke(_.views[d]);if(!b)return;_.viewId=d;const T=!E.isPaused()&&!u,R=u?0:E.getPlaybackFraction();u=!1,B.hide(),E.setSource(b,{seekFraction:R,autoplay:T}),E.prewarmSources($e()),T&&!Z?st():qe(),an(d),Rt(),Ae(),Q.classList.remove("is-visible"),$n()}function Me(){return{...O[l.id]}}function _a(d){return Object.fromEntries(d.parameters.map(b=>[b.id,Sa(b)]))}function Sa(d){if(d.logScale){const ye=Math.log10(d.min),Se=Math.log10(d.max);return 10**(ye+Math.random()*(Se-ye))}const b=Math.max(0,Math.round((d.max-d.min)/d.step)),T=Math.floor(Math.random()*(b+1)),R=d.min+T*d.step,te=Wi(d.step);return Number(R.toFixed(te))}async function Ts(d,b){if(!C){L=qt;return}let T=qt;try{T=await Ll(d)}catch(R){Je("Failed to load live stats",{url:d,error:R instanceof Error?R.message:String(R)})}a.isCurrent(b)&&(L=T,Ze())}async function ka(d,b){const T=await pl(d);a.isCurrent(b)&&(h=T,Ze(w))}function Ea(d,b,T,R){if(!b||!Number.isFinite(R)||R<=0)return{};const te=Math.max(0,Math.min(1,T/R)),ye={};for(const Se of d.metadata.liveStats){if(!Se.live||!Se.fromVideo||!Se.scaleWithTime)continue;const rn=Se.videoKey??Se.id,Ft=b[rn];if(typeof Ft!="number"||!Number.isFinite(Ft))continue;const Bn=Ft*te;ye[Se.id]=Se.integer?String(Math.floor(Bn)):String(Bn)}return ye}function ot(d,b){d.hidden=!b,d.classList.toggle("is-hidden",!b)}function gt(d,b){return b!=null&&b.views?b.viewId??Object.keys(b.views)[0]:b==null?void 0:b.viewId}function Ia(d,b){return!b||!d.views?null:d.views[b]??null}function Ms(){const d=gt(l,_);return d?l.views.some(b=>b.id===d&&b.audio):!1}function La(d,b){return b||d.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function Na(d,b,T){const R=La(d,T),te=Ke(R);if(v.has(te)){Os(te);return}const ye=++k,Se=await Ca(R);if(!(!a.isCurrent(b)||ye!==k)){if(!Se){Ps();return}v.add(te),Os(te)}}function Os(d){m=d,y=!0,A.playbackRate=E.getPlaybackRate(),A.src!==m&&(A.pause(),A.src=m,A.load()),Rt(),Ae()}async function Ca(d){try{if((await tt(d,{method:"HEAD"})).ok)return!0}catch{}try{return(await tt(d,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function Ps(){k+=1,m=null,y=!1,A.pause(),A.removeAttribute("src"),A.load(),Rt()}function Aa(){p=t.audioMutedByDefault,g=t.defaultAudioVolume,A.muted=p,A.volume=g,oe.setMuted(p)}function Rt(){oe.setAudioVisible(Ms()&&y&&!!m),oe.setMuted(p)}function $t(d={}){if(!y||!Number.isFinite(A.duration)||A.duration<=0)return;const b=d.force??!1,T=Math.max(0,Math.min(A.duration,E.getCurrentTimeSeconds())),R=Math.abs(A.currentTime-T);if(!b&&R<=(d.driftThresholdSeconds??Kl))return;const te=performance.now();!b&&te-je<Wl||(A.currentTime=T,je=te)}function Ae(d={}){const b=Ms()&&y&&!!m;if(Rt(),A.muted=p,A.volume=g,A.playbackRate=E.getPlaybackRate(),!b){A.pause();return}if($t({force:d.forceAudioSync??A.paused}),n.dataset.mode!=="display"||E.isPaused()||u||Z){A.pause();return}A.play().catch(()=>{p=!0,A.muted=!0,oe.setMuted(!0)})}function xs(d){const b=new Set(el(d,e));return vt.filter(T=>b.has(T.id))}function Rs(d){return d?vt.find(b=>b.id===d)??null:null}function Ta(){return i.getSource()!=="local"?ls.MIN_TERMINAL_TIME_MS:Ma(ls.MIN_TERMINAL_TIME_MS,Bl)}function Ma(d,b){const T=Math.ceil(Math.min(d,b)),R=Math.floor(Math.max(d,b));return Math.floor(Math.random()*(R-T+1))+T}function Oa(d){const b=l.id,T=t.manifestSource;t=Xo(d,e),ni(t.verboseLogging),s=xs(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),ve.setHomeVisible(!t.lockedScaleId),ve.setFullscreenVisible(!t.lockFullscreen),B.setHomeVisible(!t.lockedScaleId),ge.setSimulationClasses(s),q.setAdvancedSettings(t),q.setBackVisible(!t.lockedScaleId),de("Advanced settings updated",t),Aa(),Ae(),T!==t.manifestSource&&(_=null);const R=Rs(t.lockedScaleId);R&&(Ns(R),R.id!==b&&(x=!1,E.hideMedia(),q.setView("parameters")),x||(xn(es[R.id]),q.setSimulation(l,Me())))}}function Gl(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Yl(n)}Gl();
//# sourceMappingURL=main-Dm_bAWgp.js.map
