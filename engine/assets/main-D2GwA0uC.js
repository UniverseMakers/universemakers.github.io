(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const as=Symbol.for("yaml.alias"),Jn=Symbol.for("yaml.document"),st=Symbol.for("yaml.map"),ei=Symbol.for("yaml.pair"),Ge=Symbol.for("yaml.scalar"),Nt=Symbol.for("yaml.seq"),Fe=Symbol.for("yaml.node.type"),dt=n=>!!n&&typeof n=="object"&&n[Fe]===as,gn=n=>!!n&&typeof n=="object"&&n[Fe]===Jn,Gt=n=>!!n&&typeof n=="object"&&n[Fe]===st,ie=n=>!!n&&typeof n=="object"&&n[Fe]===ei,G=n=>!!n&&typeof n=="object"&&n[Fe]===Ge,zt=n=>!!n&&typeof n=="object"&&n[Fe]===Nt;function ne(n){if(n&&typeof n=="object")switch(n[Fe]){case st:case Nt:return!0}return!1}function se(n){if(n&&typeof n=="object")switch(n[Fe]){case as:case st:case Ge:case Nt:return!0}return!1}const ti=n=>(G(n)||ne(n))&&!!n.anchor,ot=Symbol("break visit"),Na=Symbol("skip children"),Ht=Symbol("remove node");function Ct(n,e){const t=Ca(e);gn(n)?wt(null,n.contents,t,Object.freeze([n]))===Ht&&(n.contents=null):wt(null,n,t,Object.freeze([]))}Ct.BREAK=ot;Ct.SKIP=Na;Ct.REMOVE=Ht;function wt(n,e,t,s){const i=Aa(n,e,t,s);if(se(i)||ie(i))return Ta(n,s,i),wt(n,i,t,s);if(typeof i!="symbol"){if(ne(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=wt(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===ot)return ot;r===Ht&&(e.items.splice(a,1),a-=1)}}}else if(ie(e)){s=Object.freeze(s.concat(e));const a=wt("key",e.key,t,s);if(a===ot)return ot;a===Ht&&(e.key=null);const r=wt("value",e.value,t,s);if(r===ot)return ot;r===Ht&&(e.value=null)}}return i}function Ca(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Aa(n,e,t,s){var i,a,r,o,l;if(typeof t=="function")return t(n,e,s);if(Gt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(zt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(ie(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(G(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(dt(e))return(l=t.Alias)==null?void 0:l.call(t,n,e,s)}function Ta(n,e,t){const s=e[e.length-1];if(ne(s))s.items[n]=t;else if(ie(s))n==="key"?s.key=t:s.value=t;else if(gn(s))s.contents=t;else{const i=dt(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Ma={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Oa=n=>n.replace(/[!,[\]{}]/g,e=>Ma[e]);class Se{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},Se.defaultYaml,e),this.tags=Object.assign({},Se.defaultTags,t)}clone(){const e=new Se(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new Se(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:Se.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},Se.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:Se.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},Se.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Oa(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&se(e.contents)){const a={};Ct(e.contents,(r,o)=>{se(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}Se.defaultYaml={explicit:!1,version:"1.2"};Se.defaultTags={"!!":"tag:yaml.org,2002:"};function ni(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function si(n){const e=new Set;return Ct(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function ii(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Pa(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=si(n));const r=ii(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(G(r.node)||ne(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function vt(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=vt(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=vt(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=vt(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=vt(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function Be(n,e,t){if(Array.isArray(n))return n.map((s,i)=>Be(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!ti(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class rs{constructor(e){Object.defineProperty(this,Fe,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!gn(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=Be(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof a=="function"?vt(a,{"":o},"",o):o}}class os extends rs{constructor(e){super(as),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],Ct(e,{Node:(a,r)=>{(dt(r)||ti(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let o=s.get(r);if(o||(Be(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=ln(i,r,s)),o.count*o.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(ni(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function ln(n,e,t){if(dt(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(ne(e)){let s=0;for(const i of e.items){const a=ln(n,i,t);a>s&&(s=a)}return s}else if(ie(e)){const s=ln(n,e.key,t),i=ln(n,e.value,t);return Math.max(s,i)}return 1}const ai=n=>!n||typeof n!="function"&&typeof n!="object";class $ extends rs{constructor(e){super(Ge),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Be(this.value,e,t)}toString(){return String(this.value)}}$.BLOCK_FOLDED="BLOCK_FOLDED";$.BLOCK_LITERAL="BLOCK_LITERAL";$.PLAIN="PLAIN";$.QUOTE_DOUBLE="QUOTE_DOUBLE";$.QUOTE_SINGLE="QUOTE_SINGLE";const xa="tag:yaml.org,2002:";function Ra(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function qt(n,e,t){var f,p,h;if(gn(n)&&(n=n.contents),se(n))return n;if(ie(n)){const b=(p=(f=t.schema[st]).createNode)==null?void 0:p.call(f,t.schema,null,t);return b.items.push(n),b}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let l;if(s&&n&&typeof n=="object"){if(l=o.get(n),l)return l.anchor??(l.anchor=i(n)),new os(l.anchor);l={anchor:null,node:null},o.set(n,l)}e!=null&&e.startsWith("!!")&&(e=xa+e.slice(2));let c=Ra(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const b=new $(n);return l&&(l.node=b),b}c=n instanceof Map?r[st]:Symbol.iterator in Object(n)?r[Nt]:r[st]}a&&(a(c),delete t.onTagObj);const u=c!=null&&c.createNode?c.createNode(t.schema,n,t):typeof((h=c==null?void 0:c.nodeClass)==null?void 0:h.from)=="function"?c.nodeClass.from(t.schema,n,t):new $(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}function dn(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return qt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const Vt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class ri extends rs{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>se(s)||ie(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Vt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(ne(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,dn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(ne(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&G(a)?a.value:a:ne(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ie(t))return!1;const s=t.value;return s==null||e&&G(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return ne(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(ne(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,dn(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const $a=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function ze(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const lt=(n,e,t)=>n.endsWith(`
`)?ze(t,e):t.includes(`
`)?`
`+ze(t,e):(n.endsWith(" ")?"":" ")+t,oi="flow",Qn="block",cn="quoted";function yn(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],u={};let f=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):f=i-s);let p,h,b=!1,m=-1,g=-1,v=-1;t===Qn&&(m=Ms(n,m,e.length),m!==-1&&(f=m+l));for(let I;I=n[m+=1];){if(t===cn&&I==="\\"){switch(g=m,n[m+1]){case"x":m+=3;break;case"u":m+=5;break;case"U":m+=9;break;default:m+=1}v=m}if(I===`
`)t===Qn&&(m=Ms(n,m,e.length)),f=m+e.length+l,p=void 0;else{if(I===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){const _=n[m+1];_&&_!==" "&&_!==`
`&&_!=="	"&&(p=m)}if(m>=f)if(p)c.push(p),f=p+l,p=void 0;else if(t===cn){for(;h===" "||h==="	";)h=I,I=n[m+=1],b=!0;const _=m>v+1?m-2:g-1;if(u[_])return n;c.push(_),u[_]=!0,f=_+l,p=void 0}else b=!0}h=I}if(b&&o&&o(),c.length===0)return n;r&&r();let y=n.slice(0,c[0]);for(let I=0;I<c.length;++I){const _=c[I],S=c[I+1]||n.length;_===0?y=`
${e}${n.slice(0,S)}`:(t===cn&&u[_]&&(y+=`${n[_]}\\`),y+=`
${e}${n.slice(_+1,S)}`)}return y}function Ms(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const bn=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),wn=n=>/^(%|---|\.\.\.)/m.test(n);function Ba(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function jt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(wn(n)?"  ":"");let r="",o=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(o,l)+"\\ ",l+=1,o=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(o,l);const u=t.substr(l+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(l,6)}l+=5,o=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(o,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=a,t[l+2]===" "&&(r+="\\"),l+=1,o=l+1}break;default:l+=1}return r=o?r+t.slice(o):t,s?r:yn(r,a,cn,bn(e,!1))}function Xn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return jt(n,e);const t=e.indent||(wn(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:yn(s,t,oi,bn(e,!1))}function _t(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=jt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=Xn:a&&!i?s=jt:s=t?Xn:jt}return s(n,e)}let Zn;try{Zn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Zn=/\n+(?!\n|$)/g}function un({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return _t(t,s);const c=s.indent||(s.forceBlockIndent||wn(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===$.BLOCK_FOLDED?!1:e===$.BLOCK_LITERAL?!0:!Ba(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,p;for(p=t.length;p>0;--p){const S=t[p-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let h=t.substring(p);const b=h.indexOf(`
`);b===-1?f="-":t===h||b!==h.length-1?(f="+",a&&a()):f="",h&&(t=t.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(Zn,`$&${c}`));let m=!1,g,v=-1;for(g=0;g<t.length;++g){const S=t[g];if(S===" ")m=!0;else if(S===`
`)v=g;else break}let y=t.substring(0,v<g?v+1:g);y&&(t=t.substring(y.length),y=y.replace(/\n+/g,`$&${c}`));let _=(m?c?"2":"1":"")+f;if(n&&(_+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let E=!1;const N=bn(s,!0);r!=="folded"&&e!==$.BLOCK_FOLDED&&(N.onOverflow=()=>{E=!0});const L=yn(`${y}${S}${h}`,c,Qn,N);if(!E)return`>${_}
${c}${L}`}return t=t.replace(/\n+/g,`$&${c}`),`|${_}
${c}${y}${t}${h}`}function Fa(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:l,indentStep:c,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return _t(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?_t(a,e):un(n,e,t,s);if(!o&&!u&&i!==$.PLAIN&&a.includes(`
`))return un(n,e,t,s);if(wn(a)){if(l==="")return e.forceBlockIndent=!0,un(n,e,t,s);if(o&&l===c)return _t(a,e)}const f=a.replace(/\n+/g,`$&
${l}`);if(r){const p=m=>{var g;return m.default&&m.tag!=="tag:yaml.org,2002:str"&&((g=m.test)==null?void 0:g.test(f))},{compat:h,tags:b}=e.doc.schema;if(b.some(p)||h!=null&&h.some(p))return _t(a,e)}return o?f:yn(f,l,oi,bn(e,!1))}function ls(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==$.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=$.QUOTE_DOUBLE);const l=u=>{switch(u){case $.BLOCK_FOLDED:case $.BLOCK_LITERAL:return i||a?_t(r.value,e):un(r,e,t,s);case $.QUOTE_DOUBLE:return jt(r.value,e);case $.QUOTE_SINGLE:return Xn(r.value,e);case $.PLAIN:return Fa(r,e,t,s);default:return null}};let c=l(o);if(c===null){const{defaultKeyType:u,defaultStringType:f}=e.options,p=i&&u||f;if(c=l(p),c===null)throw new Error(`Unsupported default string type ${p}`)}return c}function li(n,e){const t=Object.assign({blockQuote:!0,commentString:$a,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Va(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(G(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Ua(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(G(n)||ne(n))&&n.anchor;a&&ni(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function It(n,e,t,s){var l;if(ie(n))return n.toString(e,t,s);if(dt(n)){if(e.doc.directives)return n.toString(e);if((l=e.resolvedAliases)!=null&&l.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=se(n)?n:e.doc.createNode(n,{onTagObj:c=>i=c});i??(i=Va(e.doc.schema.tags,a));const r=Ua(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):G(a)?ls(a,e,t,s):a.toString(e,t,s);return r?G(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Da({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t;let p=se(n)&&n.comment||null;if(f){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(ne(n)||!se(n)&&typeof n=="object"){const N="With simple keys, collection cannot be used as a key value";throw new Error(N)}}let h=!f&&(!n||p&&e==null&&!t.inFlow||ne(n)||(G(n)?n.type===$.BLOCK_FOLDED||n.type===$.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!h&&(f||!a),indent:o+l});let b=!1,m=!1,g=It(n,t,()=>b=!0,()=>m=!0);if(!h&&!t.inFlow&&g.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(t.inFlow){if(a||e==null)return b&&s&&s(),g===""?"?":h?`? ${g}`:g}else if(a&&!f||e==null&&h)return g=`? ${g}`,p&&!b?g+=lt(g,t.indent,c(p)):m&&i&&i(),g;b&&(p=null),h?(p&&(g+=lt(g,t.indent,c(p))),g=`? ${g}
${o}:`):(g=`${g}:`,p&&(g+=lt(g,t.indent,c(p))));let v,y,I;se(e)?(v=!!e.spaceBefore,y=e.commentBefore,I=e.comment):(v=!1,y=null,I=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!h&&!p&&G(e)&&(t.indentAtStart=g.length+1),m=!1,!u&&l.length>=2&&!t.inFlow&&!h&&zt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let _=!1;const S=It(e,t,()=>_=!0,()=>m=!0);let E=" ";if(p||v||y){if(E=v?`
`:"",y){const N=c(y);E+=`
${ze(N,t.indent)}`}S===""&&!t.inFlow?E===`
`&&I&&(E=`

`):E+=`
${t.indent}`}else if(!h&&ne(e)){const N=S[0],L=S.indexOf(`
`),F=L!==-1,M=t.inFlow??e.flow??e.items.length===0;if(F||!M){let k=!1;if(F&&(N==="&"||N==="!")){let O=S.indexOf(" ");N==="&"&&O!==-1&&O<L&&S[O+1]==="!"&&(O=S.indexOf(" ",O+1)),(O===-1||L<O)&&(k=!0)}k||(E=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(E="");return g+=E+S,t.inFlow?_&&s&&s():I&&!_?g+=lt(g,t.indent,c(I)):m&&i&&i(),g}function ci(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const tn="<<",Qe={identify:n=>n===tn||typeof n=="symbol"&&n.description===tn,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new $(Symbol(tn)),{addToJSMap:ui}),stringify:()=>tn},Ha=(n,e)=>(Qe.identify(e)||G(e)&&(!e.type||e.type===$.PLAIN)&&Qe.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Qe.tag&&t.default));function ui(n,e,t){if(t=n&&dt(t)?t.resolve(n.doc):t,zt(t))for(const s of t.items)Pn(n,e,s);else if(Array.isArray(t))for(const s of t)Pn(n,e,s);else Pn(n,e,t)}function Pn(n,e,t){const s=n&&dt(t)?t.resolve(n.doc):t;if(!Gt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function di(n,e,{key:t,value:s}){if(se(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ha(n,t))ui(n,e,s);else{const i=Be(t,"",n);if(e instanceof Map)e.set(i,Be(s,i,n));else if(e instanceof Set)e.add(i);else{const a=ja(t,i,n),r=Be(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function ja(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(se(n)&&(t!=null&&t.doc)){const s=li(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),ci(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function cs(n,e,t){const s=qt(n,void 0,t),i=qt(e,void 0,t);return new ke(s,i)}class ke{constructor(e,t=null){Object.defineProperty(this,Fe,{value:ei}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return se(t)&&(t=t.clone(e)),se(s)&&(s=s.clone(e)),new ke(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return di(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Da(this,e,t,s):JSON.stringify(this)}}function fi(n,e,t){return(e.inFlow??n.flow?Ka:qa)(n,e,t)}function qa({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:a,type:null});let f=!1;const p=[];for(let b=0;b<e.length;++b){const m=e[b];let g=null;if(se(m))!f&&m.spaceBefore&&p.push(""),fn(t,p,m.commentBefore,f),m.comment&&(g=m.comment);else if(ie(m)){const y=se(m.key)?m.key:null;y&&(!f&&y.spaceBefore&&p.push(""),fn(t,p,y.commentBefore,f))}f=!1;let v=It(m,u,()=>g=null,()=>f=!0);g&&(v+=lt(v,a,c(g))),f&&g&&(f=!1),p.push(s+v)}let h;if(p.length===0)h=i.start+i.end;else{h=p[0];for(let b=1;b<p.length;++b){const m=p[b];h+=m?`
${l}${m}`:`
`}}return n?(h+=`
`+ze(c(n),l),o&&o()):f&&r&&r(),h}function Ka({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,u=0;const f=[];for(let b=0;b<n.length;++b){const m=n[b];let g=null;if(se(m))m.spaceBefore&&f.push(""),fn(e,f,m.commentBefore,!1),m.comment&&(g=m.comment);else if(ie(m)){const y=se(m.key)?m.key:null;y&&(y.spaceBefore&&f.push(""),fn(e,f,y.commentBefore,!1),y.comment&&(c=!0));const I=se(m.value)?m.value:null;I?(I.comment&&(g=I.comment),I.commentBefore&&(c=!0)):m.value==null&&(y!=null&&y.comment)&&(g=y.comment)}g&&(c=!0);let v=It(m,l,()=>g=null);c||(c=f.length>u||v.includes(`
`)),b<n.length-1?v+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=f.reduce((y,I)=>y+I.length+2,2)+(v.length+2)>e.options.lineWidth)),c&&(v+=",")),g&&(v+=lt(v,s,o(g))),f.push(v),u=f.length}const{start:p,end:h}=t;if(f.length===0)return p+h;if(!c){const b=f.reduce((m,g)=>m+g.length+2,2);c=e.options.lineWidth>0&&b>e.options.lineWidth}if(c){let b=p;for(const m of f)b+=m?`
${a}${i}${m}`:`
`;return`${b}
${i}${h}`}else return`${p}${r}${f.join(" ")}${r}${h}`}function fn({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=ze(e(s),n);t.push(a.trimStart())}}function ct(n,e){const t=G(e)?e.value:e;for(const s of n)if(ie(s)&&(s.key===e||s.key===t||G(s.key)&&s.key.value===t))return s}class $e extends ri{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(st,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&r.items.push(cs(l,c,s))};if(t instanceof Map)for(const[l,c]of t)o(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))o(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;ie(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ke(e,e==null?void 0:e.value):s=new ke(e.key,e.value);const i=ct(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);G(i.value)&&ai(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(l=>a(s,l)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=ct(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=ct(this.items,e),i=s==null?void 0:s.value;return(!t&&G(i)?i.value:i)??void 0}has(e){return!!ct(this.items,e)}set(e,t){this.add(new ke(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)di(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!ie(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),fi(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const At={collection:"map",default:!0,nodeClass:$e,tag:"tag:yaml.org,2002:map",resolve(n,e){return Gt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>$e.from(n,e,t)};class ut extends ri{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Nt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=nn(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=nn(e);if(typeof s!="number")return;const i=this.items[s];return!t&&G(i)?i.value:i}has(e){const t=nn(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=nn(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];G(i)&&ai(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(Be(a,String(i++),t));return s}toString(e,t,s){return e?fi(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const l=t instanceof Set?o:String(r++);o=i.call(t,l,o)}a.items.push(qt(o,void 0,s))}}return a}}function nn(n){let e=G(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Tt={collection:"seq",default:!0,nodeClass:ut,tag:"tag:yaml.org,2002:seq",resolve(n,e){return zt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>ut.from(n,e,t)},vn={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),ls(n,e,t,s)}},_n={identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new $(null),stringify:({source:n},e)=>typeof n=="string"&&_n.test.test(n)?n:e.options.nullStr},us={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new $(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&us.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Ke({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const hi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ke},mi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ke(n)}},pi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new $(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ke},Sn=n=>typeof n=="bigint"||Number.isInteger(n),ds=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function gi(n,e,t){const{value:s}=n;return Sn(s)&&s>=0?t+s.toString(e):Ke(n)}const yi={identify:n=>Sn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ds(n,2,8,t),stringify:n=>gi(n,8,"0o")},bi={identify:Sn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ds(n,0,10,t),stringify:Ke},wi={identify:n=>Sn(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ds(n,2,16,t),stringify:n=>gi(n,16,"0x")},Wa=[At,Tt,vn,_n,us,yi,bi,wi,hi,mi,pi];function Os(n){return typeof n=="bigint"||Number.isInteger(n)}const sn=({value:n})=>JSON.stringify(n),Ya=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:sn},{identify:n=>n==null,createNode:()=>new $(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:sn},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:sn},{identify:Os,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Os(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:sn}],Ga={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},za=[At,Tt].concat(Ya,Ga),fs={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);o=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=$.BLOCK_LITERAL),e!==$.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(o.length/l),u=new Array(c);for(let f=0,p=0;f<c;++f,p+=l)u[f]=o.substr(p,l);o=u.join(e===$.BLOCK_LITERAL?`
`:" ")}return ls({comment:n,type:e,value:o},s,i,a)}};function vi(n,e){if(zt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!ie(s)){if(Gt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ke(new $(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=ie(s)?s:new ke(s)}}else e("Expected a sequence for this tag");return n}function _i(n,e,t){const{replacer:s}=t,i=new ut(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,l;if(Array.isArray(r))if(r.length===2)o=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)o=c[0],l=r[o];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else o=r;i.items.push(cs(o,l,t))}return i}const hs={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:vi,createNode:_i};class kt extends ut{constructor(){super(),this.add=$e.prototype.add.bind(this),this.delete=$e.prototype.delete.bind(this),this.get=$e.prototype.get.bind(this),this.has=$e.prototype.has.bind(this),this.set=$e.prototype.set.bind(this),this.tag=kt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(ie(i)?(a=Be(i.key,"",t),r=Be(i.value,a,t)):a=Be(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=_i(e,t,s),a=new this;return a.items=i.items,a}}kt.tag="tag:yaml.org,2002:omap";const ms={collection:"seq",identify:n=>n instanceof Map,nodeClass:kt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=vi(n,e),s=[];for(const{key:i}of t.items)G(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new kt,t)},createNode:(n,e,t)=>kt.from(n,e,t)};function Si({value:n,source:e},t){return e&&(n?ki:Ei).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const ki={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new $(!0),stringify:Si},Ei={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new $(!1),stringify:Si},Ja={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ke},Qa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Ke(n)}},Xa={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new $(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Ke},Jt=n=>typeof n=="bigint"||Number.isInteger(n);function kn(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function ps(n,e,t){const{value:s}=n;if(Jt(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Ke(n)}const Za={identify:Jt,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>kn(n,2,2,t),stringify:n=>ps(n,2,"0b")},er={identify:Jt,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>kn(n,1,8,t),stringify:n=>ps(n,8,"0")},tr={identify:Jt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>kn(n,0,10,t),stringify:Ke},nr={identify:Jt,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>kn(n,2,16,t),stringify:n=>ps(n,16,"0x")};class Et extends $e{constructor(e){super(e),this.tag=Et.tag}add(e){let t;ie(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ke(e.key,null):t=new ke(e,null),ct(this.items,t.key)||this.items.push(t)}get(e,t){const s=ct(this.items,e);return!t&&ie(s)?G(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=ct(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ke(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(cs(r,null,s));return a}}Et.tag="tag:yaml.org,2002:set";const gs={collection:"map",identify:n=>n instanceof Set,nodeClass:Et,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>Et.from(n,e,t),resolve(n,e){if(Gt(n)){if(n.hasAllNullValues(!0))return Object.assign(new Et,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function ys(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function Ii(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Ke(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Li={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>ys(n,t),stringify:Ii},Ni={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>ys(n,!1),stringify:Ii},En={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(En.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,r||0,o||0,l);const u=e[8];if(u&&u!=="Z"){let f=ys(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Ps=[At,Tt,vn,_n,ki,Ei,Za,er,tr,nr,Ja,Qa,Xa,fs,Qe,ms,hs,gs,Li,Ni,En],xs=new Map([["core",Wa],["failsafe",[At,Tt,vn]],["json",za],["yaml11",Ps],["yaml-1.1",Ps]]),Rs={binary:fs,bool:us,float:pi,floatExp:mi,floatNaN:hi,floatTime:Ni,int:bi,intHex:wi,intOct:yi,intTime:Li,map:At,merge:Qe,null:_n,omap:ms,pairs:hs,seq:Tt,set:gs,timestamp:En},sr={"tag:yaml.org,2002:binary":fs,"tag:yaml.org,2002:merge":Qe,"tag:yaml.org,2002:omap":ms,"tag:yaml.org,2002:pairs":hs,"tag:yaml.org,2002:set":gs,"tag:yaml.org,2002:timestamp":En};function xn(n,e,t){const s=xs.get(e);if(s&&!n)return t&&!s.includes(Qe)?s.concat(Qe):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(xs.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Qe)),i.reduce((a,r)=>{const o=typeof r=="string"?Rs[r]:r;if(!o){const l=JSON.stringify(r),c=Object.keys(Rs).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(o)||a.push(o),a},[])}const ir=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class bs{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?xn(e,"compat"):e?xn(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?sr:{},this.tags=xn(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,st,{value:At}),Object.defineProperty(this,Ge,{value:vn}),Object.defineProperty(this,Nt,{value:Tt}),this.sortMapEntries=typeof r=="function"?r:r===!0?ir:null}clone(){const e=Object.create(bs.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function ar(n,e){var l;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const c=n.directives.toString(n);c?(t.push(c),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=li(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const c=a(n.commentBefore);t.unshift(ze(c,""))}let r=!1,o=null;if(n.contents){if(se(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(ze(f,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const c=o?void 0:()=>r=!0;let u=It(n.contents,i,()=>o=null,c);o&&(u+=lt(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(It(n.contents,i));if((l=n.directives)!=null&&l.docEnd)if(n.comment){const c=a(n.comment);c.includes(`
`)?(t.push("..."),t.push(ze(c,""))):t.push(`... ${c}`)}else t.push("...");else{let c=n.comment;c&&r&&(c=c.replace(/^\n+/,"")),c&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(ze(a(c),"")))}return t.join(`
`)+`
`}class In{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Fe,{value:Jn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new Se({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(In.prototype,{[Fe]:{value:Jn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=se(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){pt(this.contents)&&this.contents.add(e)}addIn(e,t){pt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=si(this);e.anchor=!t||s.has(t)?ii(t||"a",s):t}return new os(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const g=y=>typeof y=="number"||y instanceof String||y instanceof Number,v=t.filter(g).map(String);v.length>0&&(t=t.concat(v)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:l,onTagObj:c,tag:u}=s??{},{onAnchor:f,setAnchors:p,sourceObjects:h}=Pa(this,r||"a"),b={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:h},m=qt(e,u,b);return o&&ne(m)&&(m.flow=!0),p(),m}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ke(i,a)}delete(e){return pt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Vt(e)?this.contents==null?!1:(this.contents=null,!0):pt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return ne(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Vt(e)?!t&&G(this.contents)?this.contents.value:this.contents:ne(this.contents)?this.contents.getIn(e,t):void 0}has(e){return ne(this.contents)?this.contents.has(e):!1}hasIn(e){return Vt(e)?this.contents!==void 0:ne(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=dn(this.schema,[e],t):pt(this.contents)&&this.contents.set(e,t)}setIn(e,t){Vt(e)?this.contents=t:this.contents==null?this.contents=dn(this.schema,Array.from(e),t):pt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Se({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new Se({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new bs(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=Be(this.contents,t??"",o);if(typeof a=="function")for(const{count:c,res:u}of o.anchors.values())a(u,c);return typeof r=="function"?vt(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return ar(this,e)}}function pt(n){if(ne(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Ci extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class Ut extends Ci{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class rr extends Ci{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const $s=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const l=t.linePos[1];(l==null?void 0:l.line)===s&&l.col>i&&(o=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${c}
`}};function Lt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let l=!1,c=o,u=o,f="",p="",h=!1,b=!1,m=null,g=null,v=null,y=null,I=null,_=null,S=null;for(const L of n)switch(b&&(L.type!=="space"&&L.type!=="newline"&&L.type!=="comma"&&a(L.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),b=!1),m&&(c&&L.type!=="comment"&&L.type!=="newline"&&a(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),m=null),L.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&L.source.includes("	")&&(m=L),u=!0;break;case"comment":{u||a(L,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const F=L.source.substring(1)||" ";f?f+=p+F:f=F,p="",c=!1;break}case"newline":c?f?f+=L.source:(!_||t!=="seq-item-ind")&&(l=!0):p+=L.source,c=!0,h=!0,(g||v)&&(y=L),u=!0;break;case"anchor":g&&a(L,"MULTIPLE_ANCHORS","A node can have at most one anchor"),L.source.endsWith(":")&&a(L.offset+L.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=L,S??(S=L.offset),c=!1,u=!1,b=!0;break;case"tag":{v&&a(L,"MULTIPLE_TAGS","A node can have at most one tag"),v=L,S??(S=L.offset),c=!1,u=!1,b=!0;break}case t:(g||v)&&a(L,"BAD_PROP_ORDER",`Anchors and tags must be after the ${L.source} indicator`),_&&a(L,"UNEXPECTED_TOKEN",`Unexpected ${L.source} in ${e??"collection"}`),_=L,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&a(L,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=L,c=!1,u=!1;break}default:a(L,"UNEXPECTED_TOKEN",`Unexpected ${L.type} token`),c=!1,u=!1}const E=n[n.length-1],N=E?E.offset+E.source.length:i;return b&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m&&(c&&m.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:_,spaceBefore:l,comment:f,hasNewline:h,anchor:g,tag:v,newlineAfterProp:y,end:N,start:S??N}}function Kt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(Kt(e.key)||Kt(e.value))return!0}return!1;default:return!0}}function es(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&Kt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Ai(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||G(a)&&G(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const Bs="All mapping items must start at the same column";function or({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??$e,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:p,key:h,sep:b,value:m}=f,g=Lt(p,{indicator:"explicit-key-ind",next:h??(b==null?void 0:b[0]),offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),v=!g.found;if(v){if(h&&(h.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in h&&h.indent!==s.indent&&i(l,"BAD_INDENT",Bs)),!g.anchor&&!g.tag&&!b){c=g.end,g.comment&&(o.comment?o.comment+=`
`+g.comment:o.comment=g.comment);continue}(g.newlineAfterProp||Kt(h))&&i(h??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=g.found)==null?void 0:u.indent)!==s.indent&&i(l,"BAD_INDENT",Bs);t.atKey=!0;const y=g.end,I=h?n(t,h,g,i):e(t,y,p,null,g,i);t.schema.compat&&es(s.indent,h,i),t.atKey=!1,Ai(t,o.items,I)&&i(y,"DUPLICATE_KEY","Map keys must be unique");const _=Lt(b??[],{indicator:"map-value-ind",next:m,offset:I.range[2],onError:i,parentIndent:s.indent,startOnNewline:!h||h.type==="block-scalar"});if(l=_.end,_.found){v&&((m==null?void 0:m.type)==="block-map"&&!_.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<_.found.offset-1024&&i(I.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const S=m?n(t,m,_,i):e(t,l,b,null,_,i);t.schema.compat&&es(s.indent,m,i),l=S.range[2];const E=new ke(I,S);t.options.keepSourceTokens&&(E.srcToken=f),o.items.push(E)}else{v&&i(I.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),_.comment&&(I.comment?I.comment+=`
`+_.comment:I.comment=_.comment);const S=new ke(I);t.options.keepSourceTokens&&(S.srcToken=f),o.items.push(S)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,l,c??l],o}function lr({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??ut,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:u,value:f}of s.items){const p=Lt(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||f)(f==null?void 0:f.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=p.end,p.comment&&(o.comment=p.comment);continue}const h=f?n(t,f,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&es(s.indent,f,i),l=h.range[2],o.items.push(h)}return o.range=[s.offset,l,c??l],o}function Qt(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:l,type:c}=o;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=l.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=l),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Rn="Block collections are not allowed within flow collections",$n=n=>n&&(n.type==="block-map"||n.type==="block-seq");function cr({composeNode:n,composeEmptyNode:e},t,s,i,a){var g;const r=s.start.source==="{",o=r?"flow map":"flow sequence",l=(a==null?void 0:a.nodeClass)??(r?$e:ut),c=new l(t.schema);c.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=s.offset+s.start.source.length;for(let v=0;v<s.items.length;++v){const y=s.items[v],{start:I,key:_,sep:S,value:E}=y,N=Lt(I,{flow:o,indicator:"explicit-key-ind",next:_??(S==null?void 0:S[0]),offset:f,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!S&&!E){v===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):v<s.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),N.comment&&(c.comment?c.comment+=`
`+N.comment:c.comment=N.comment),f=N.end;continue}!r&&t.options.strict&&Kt(_)&&i(_,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(v===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${o} items`),N.comment){let L="";e:for(const F of I)switch(F.type){case"comma":case"space":break;case"comment":L=F.source.substring(1);break e;default:break e}if(L){let F=c.items[c.items.length-1];ie(F)&&(F=F.value??F.key),F.comment?F.comment+=`
`+L:F.comment=L,N.comment=N.comment.substring(L.length+1)}}if(!r&&!S&&!N.found){const L=E?n(t,E,N,i):e(t,N.end,S,null,N,i);c.items.push(L),f=L.range[2],$n(E)&&i(L.range,"BLOCK_IN_FLOW",Rn)}else{t.atKey=!0;const L=N.end,F=_?n(t,_,N,i):e(t,L,I,null,N,i);$n(_)&&i(F.range,"BLOCK_IN_FLOW",Rn),t.atKey=!1;const M=Lt(S??[],{flow:o,indicator:"map-value-ind",next:E,offset:F.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(M.found){if(!r&&!N.found&&t.options.strict){if(S)for(const x of S){if(x===M.found)break;if(x.type==="newline"){i(x,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<M.found.offset-1024&&i(M.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else E&&("source"in E&&((g=E.source)==null?void 0:g[0])===":"?i(E,"MISSING_CHAR",`Missing space after : in ${o}`):i(M.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const k=E?n(t,E,M,i):M.found?e(t,M.end,S,null,M,i):null;k?$n(E)&&i(k.range,"BLOCK_IN_FLOW",Rn):M.comment&&(F.comment?F.comment+=`
`+M.comment:F.comment=M.comment);const O=new ke(F,k);if(t.options.keepSourceTokens&&(O.srcToken=y),r){const x=c;Ai(t,x.items,F)&&i(L,"DUPLICATE_KEY","Map keys must be unique"),x.items.push(O)}else{const x=new $e(t.schema);x.flow=!0,x.items.push(O);const ae=(k??F).range;x.range=[F.range[0],ae[1],ae[2]],c.items.push(x)}f=k?k.range[2]:M.end}}const p=r?"}":"]",[h,...b]=s.end;let m=f;if((h==null?void 0:h.source)===p)m=h.offset+h.source.length;else{const v=o[0].toUpperCase()+o.substring(1),y=u?`${v} must end with a ${p}`:`${v} in block collection must be sufficiently indented and end with a ${p}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",y),h&&h.source.length!==1&&b.unshift(h)}if(b.length>0){const v=Qt(b,m,t.options.strict,i);v.comment&&(c.comment?c.comment+=`
`+v.comment:c.comment=v.comment),c.range=[s.offset,m,v.offset]}else c.range=[s.offset,m,m];return c}function Bn(n,e,t,s,i,a){const r=t.type==="block-map"?or(n,e,t,s,a):t.type==="block-seq"?lr(n,e,t,s,a):cr(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function ur(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,h=>i(a,"TAG_RESOLVE_FAILED",h)):null;if(t.type==="block-seq"){const{anchor:h,newlineAfterProp:b}=s,m=h&&a?h.offset>a.offset?h:a:h??a;m&&(!b||b.offset<m.offset)&&i(m,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===$e.tagName&&o==="map"||r===ut.tagName&&o==="seq")return Bn(n,e,t,i,r);let l=e.schema.tags.find(h=>h.tag===r&&h.collection===o);if(!l){const h=e.schema.knownTags[r];if((h==null?void 0:h.collection)===o)e.schema.tags.push(Object.assign({},h,{default:!1})),l=h;else return h?i(a,"BAD_COLLECTION_TYPE",`${h.tag} used for ${o} collection, but expects ${h.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Bn(n,e,t,i,r)}const c=Bn(n,e,t,i,r,l),u=((p=l.resolve)==null?void 0:p.call(l,c,h=>i(a,"TAG_RESOLVE_FAILED",h),e.options))??c,f=se(u)?u:new $(u);return f.range=c.range,f.tag=r,l!=null&&l.format&&(f.format=l.format),f}function dr(n,e,t){const s=e.offset,i=fr(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?$.BLOCK_FOLDED:$.BLOCK_LITERAL,r=e.source?hr(e.source):[];let o=r.length;for(let m=r.length-1;m>=0;--m){const g=r[m][1];if(g===""||g==="\r")o=m;else break}if(o===0){const m=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+i.length;return e.source&&(g+=e.source.length),{value:m,type:a,comment:i.comment,range:[s,g,g]}}let l=e.indent+i.indent,c=e.offset+i.length,u=0;for(let m=0;m<o;++m){const[g,v]=r[m];if(v===""||v==="\r")i.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=g.length),u=m,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+v.length+1}for(let m=r.length-1;m>=o;--m)r[m][0].length>l&&(o=m+1);let f="",p="",h=!1;for(let m=0;m<u;++m)f+=r[m][0].slice(l)+`
`;for(let m=u;m<o;++m){let[g,v]=r[m];c+=g.length+v.length+1;const y=v[v.length-1]==="\r";if(y&&(v=v.slice(0,-1)),v&&g.length<l){const _=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-v.length-(y?2:1),"BAD_INDENT",_),g=""}a===$.BLOCK_LITERAL?(f+=p+g.slice(l)+v,p=`
`):g.length>l||v[0]==="	"?(p===" "?p=`
`:!h&&p===`
`&&(p=`

`),f+=p+g.slice(l)+v,p=`
`,h=!0):v===""?p===`
`?f+=`
`:p=`
`:(f+=p+v,p=" ",h=!1)}switch(i.chomp){case"-":break;case"+":for(let m=o;m<r.length;++m)f+=`
`+r[m][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}const b=s+i.length+e.source.length;return{value:f,type:a,comment:i.comment,range:[s,b,b]}}function fr({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",l=-1;for(let p=1;p<i.length;++p){const h=i[p];if(!o&&(h==="-"||h==="+"))o=h;else{const b=Number(h);!r&&b?r=b:l===-1&&(l=n+p)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let p=1;p<e.length;++p){const h=e[p];switch(h.type){case"space":c=!0;case"newline":f+=h.source.length;break;case"comment":t&&!c&&s(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=h.source.length,u=h.source.substring(1);break;case"error":s(h,"UNEXPECTED_TOKEN",h.message),f+=h.source.length;break;default:{const b=`Unexpected token in block scalar header: ${h.type}`;s(h,"UNEXPECTED_TOKEN",b);const m=h.source;m&&typeof m=="string"&&(f+=m.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:f}}function hr(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function mr(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,l;const c=(p,h,b)=>t(s+p,h,b);switch(i){case"scalar":o=$.PLAIN,l=pr(a,c);break;case"single-quoted-scalar":o=$.QUOTE_SINGLE,l=gr(a,c);break;case"double-quoted-scalar":o=$.QUOTE_DOUBLE,l=yr(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,f=Qt(r,u,e,t);return{value:l,type:o,comment:f.comment,range:[s,u,f.offset]}}function pr(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Ti(n)}function gr(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Ti(n.slice(1,-1)).replace(/''/g,"'")}function Ti(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function yr(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=br(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=wr[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=vr(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function br(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const wr={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function vr(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Mi(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?dr(n,e,s):mr(e,n.options.strict,s),l=t?n.directives.tagName(t.source,f=>s(t,"TAG_RESOLVE_FAILED",f)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[Ge]:l?c=_r(n.schema,i,l,t,s):e.type==="scalar"?c=Sr(n,i,e,s):c=n.schema[Ge];let u;try{const f=c.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=G(f)?f:new $(f)}catch(f){const p=f instanceof Error?f.message:String(f);s(t??e,"TAG_RESOLVE_FAILED",p),u=new $(i)}return u.range=o,u.source=i,a&&(u.type=a),l&&(u.tag=l),c.format&&(u.format=c.format),r&&(u.comment=r),u}function _r(n,e,t,s,i){var o;if(t==="!")return n[Ge];const a=[];for(const l of n.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)a.push(l);else return l;for(const l of a)if((o=l.test)!=null&&o.test(e))return l;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Ge])}function Sr({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var l;return(o.default===!0||n&&o.default==="key")&&((l=o.test)==null?void 0:l.test(s))})||t[Ge];if(t.compat){const o=t.compat.find(l=>{var c;return l.default&&((c=l.test)==null?void 0:c.test(s))})??t[Ge];if(r.tag!==o.tag){const l=e.tagString(r.tag),c=e.tagString(o.tag),u=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function kr(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const Er={composeNode:Oi,composeEmptyNode:ws};function Oi(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:l}=t;let c,u=!0;switch(e.type){case"alias":c=Ir(n,e,s),(o||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Mi(n,e,l,s),o&&(c.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=ur(Er,n,e,t,s),o&&(c.anchor=o.source.substring(1))}catch(f){const p=f instanceof Error?f.message:String(f);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",f),u=!1}}return c??(c=ws(n,e.offset,void 0,null,t,s)),o&&c.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!G(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function ws(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:l},c){const u={type:"scalar",offset:kr(e,t,s),indent:-1,source:""},f=Mi(n,u,o,c);return r&&(f.anchor=r.source.substring(1),f.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),a&&(f.comment=a,f.range[2]=l),f}function Ir({options:n},{offset:e,source:t,end:s},i){const a=new os(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=Qt(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Lr(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),l=new In(void 0,o),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=Lt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?Oi(c,i,u,r):ws(c,u.end,s,null,u,r);const f=l.contents.range[2],p=Qt(a,f,!1,r);return p.comment&&(l.comment=p.comment),l.range=[t,f,p.offset],l}function Rt(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Fs(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Nr{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=Rt(t);a?this.warnings.push(new rr(r,s,i)):this.errors.push(new Ut(r,s,i))},this.directives=new Se({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Fs(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(ne(a)&&!a.flow&&a.items.length>0){let r=a.items[0];ie(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Fs(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=Rt(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Lr(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new Ut(Rt(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new Ut(Rt(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=Qt(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Ut(Rt(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new In(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Pi="\uFEFF",xi="",Ri="",ts="";function Cr(n){switch(n){case Pi:return"byte-order-mark";case xi:return"doc-mode";case Ri:return"flow-error-end";case ts:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function He(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Vs=new Set("0123456789ABCDEFabcdef"),Ar=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),an=new Set(",[]{}"),Tr=new Set(` ,[]{}
\r	`),Fn=n=>!n||Tr.has(n);class Mr{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&He(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Pi&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield xi,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&He(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!He(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&He(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Fn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&He(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Ri,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Fn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||He(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>He(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield ts,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(He(a)||e&&an.has(a))break;t=s}else if(He(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&an.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&an.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield ts,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Fn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(He(t)||e&&an.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!He(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Ar.has(t))t=this.buffer[++e];else if(t==="%"&&Vs.has(this.buffer[e+1])&&Vs.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Or{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function tt(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Us(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function $i(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function rn(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function gt(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function Ds(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!tt(e.start,"explicit-key-ind")&&!tt(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,$i(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class Pr{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Mr,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Cr(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Ds(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Us(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Us(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=rn(this.peek(2)),s=gt(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let l=0;l<t.sep.length;++l){const c=t.sep[l];switch(c.type){case"newline":o.push(l);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(tt(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if($i(t.key)&&!tt(t.sep,"newline")){const o=gt(t.start),l=t.key,c=t.sep;c.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:c}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(tt(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=gt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):tt(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!tt(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||tt(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=rn(s),a=gt(i);Ds(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=rn(e),s=gt(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=rn(e),s=gt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function xr(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Or||null,prettyErrors:e}}function Rr(n,e={}){const{lineCounter:t,prettyErrors:s}=xr(e),i=new Pr(t==null?void 0:t.addNewLine),a=new Nr(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new Ut(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach($s(n,t)),r.warnings.forEach($s(n,t))),r}function Xe(n,e,t){let s;const i=Rr(n,t);if(!i)return null;if(i.warnings.forEach(a=>ci(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const $r=`# Simulation family catalog source-of-truth.
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
`,Br=`# Parameter definitions for each simulation family.
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
`,Fr=`# Summary overlay display configuration for each simulation family.
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
`,Vr=`# Live telemetry HUD display configuration for each simulation family.
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
`;function X(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}function Bi(n,e,t){const s=n.indexOf("#"),i=s>=0?n.slice(0,s):n,a=s>=0?n.slice(s):"",r=new RegExp(`([?&])${Ur(e)}=[^&#]*`);if(r.test(i))return`${i.replace(r,`$1${e}=${encodeURIComponent(t)}`)}${a}`;const o=i.includes("?")?"&":"?";return`${i}${o}${e}=${encodeURIComponent(t)}${a}`}function Ur(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const Dr=Xe($r),Hr=Xe(Br),Vn=Xe(Fr),jr=Xe(Vr),yt=Object.entries(Dr).map(([n,e])=>{var r,o,l;const t=qr(Vn[n]),s=(((r=Vn[n])==null?void 0:r.results)??[]).map(Kr),i=((o=jr[n])==null?void 0:o.liveStats)??[],a=Hr[n]??{};return{id:n,label:e.label,placeholderImage:X(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(ns),liveStats:i.map(ns),morphologyChecklist:(l=Vn[n])==null?void 0:l.morphologyChecklist},parameters:Object.entries(a).map(([c,u])=>{const f=u.quali_labels,p=f!==void 0&&f.length>0,h=p?0:u.min,b=p?f.length-1:u.max,m=p?1:u.step??Wr(u.min,u.max),g=p?Math.floor(f.length/2):u.log_scale?Math.sqrt(u.min*u.max):Yr(u.min,u.max);return{id:c,label:u.label,unit:u.unit??"",min:h,max:b,step:m,fallbackValue:g,description:u.description,valueScale:u.value_scale,displayUnit:u.display_unit,displayFormat:u.display_format,displaySignificantFigures:u.display_significant_figures,logScale:u.log_scale,qualiLabels:f,primary:u.primary??!0}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,audio:c.audio??!1,description:c.description}))}});function qr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function ns(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Kr(n){return{...ns(n),target:n.target}}function Wr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Yr(n,e){return n+(e-n)/2}const Fi="universe-engine-theme",Vi=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Gr(){const n=localStorage.getItem(Fi);return Jr(n)?n:"glass"}function Un(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Fi,n)}function zr(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Vi){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,l]of i.entries()){const c=o===r;l.classList.toggle("active",c),l.setAttribute("aria-pressed",String(c))}}return{setActive:a}}function Jr(n){return Vi.some(e=>e.id===n)}let ye=null,je="primary";function Qr(n,e=null){ye={primaryBase:n.replace(/\/+$/,""),backupBase:e?e.replace(/\/+$/,""):null}}function Xr(){ye=null,je="primary"}function Zr(n){je=n}function eo(n){return n==="local"?{mode:"local",base:null}:ye?{mode:je,base:Ui()}:{mode:"primary",base:null}}function Ye(n){if(!ye)return n;const e=Ui();if(!e)return n;if(/^https?:\/\//i.test(n)){const t=new URL(n);return!js(t,ye.primaryBase)&&(!ye.backupBase||!js(t,ye.backupBase))?n:qs(e,`${t.pathname}${t.search}${t.hash}`)}return qs(e,n)}async function nt(n,e){const t=Ye(n),s=!!(ye!=null&&ye.backupBase)&&je==="primary";try{const i=await fetch(t,e);if(i.ok||!s)return i;const a=await Hs(n,e);return a.ok&&(je="backup"),a}catch(i){if(!s)throw i;const a=await Hs(n,e);return a.ok&&(je="backup"),a}}function Ui(){return ye?je==="backup"&&ye.backupBase?ye.backupBase:ye.primaryBase:null}async function Hs(n,e){if(!(ye!=null&&ye.backupBase))throw new Error("Backup asset host is not configured.");const t=je;je="backup";try{const s=await fetch(Ye(n),e);return s.ok||(je=t),s}catch(s){throw je=t,s}}function js(n,e){const t=new URL(e);return n.origin===t.origin}function qs(n,e){return`${n}${e.startsWith("/")?"":"/"}${e}`}function to(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.crossOrigin="anonymous",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,l=!1;const c=new Map,u=new Map,f=new Map;let p=null,h=null;const b=document.createElement("canvas"),m=b.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let g=s.playbackRate;function v(){p&&(URL.revokeObjectURL(p),p=null)}function y(C,P={}){const H=u.get(C);H&&(u.delete(C),P={...P,ownedObjectUrl:!0},C=H),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(C)){s.classList.remove("fade-out");return}const W=s.muted,K=P.seekFraction;v(),h=null,p=P.ownedObjectUrl?C:null,s.src=C,s.load(),s.onloadeddata=()=>{if(s.muted=W,K!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const Ie=Math.max(0,Math.min(.999,K));s.currentTime=Ie*s.duration}else s.currentTime=0;s.playbackRate=g,s.classList.remove("fade-out"),P.autoplay&&s.play().catch(()=>{})}},120)}function I(C){s.muted=C}async function _(){await s.play()}function S(){s.pause()}function E(){s.classList.add("is-empty")}function N(){s.classList.remove("is-empty")}function L(C){if(!Number.isFinite(s.duration)||s.duration<=0)return;const P=Math.max(0,Math.min(1,C));s.currentTime=P*s.duration}function F(){s.currentTime=0,i==null||i(0)}function M(C=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const H=()=>{K(),P()},W=window.setTimeout(()=>{K(),P()},Math.max(0,C));function K(){window.clearTimeout(W),s.removeEventListener("loadeddata",H)}s.addEventListener("loadeddata",H,{once:!0})})}function k(C,P=8e3){const H=Math.max(0,C);return H===0||O(H)?Promise.resolve():new Promise(W=>{const K=()=>{O(H)&&(fe(),W())},Ie=window.setTimeout(()=>{fe(),W()},Math.max(0,P));function fe(){window.clearTimeout(Ie),s.removeEventListener("progress",K),s.removeEventListener("canplay",K),s.removeEventListener("loadeddata",K)}s.addEventListener("progress",K),s.addEventListener("canplay",K),s.addEventListener("loadeddata",K),K()})}function O(C){const P=s.currentTime;for(let H=0;H<s.buffered.length;H+=1){const W=s.buffered.start(H),K=s.buffered.end(H);if(!(P<W||P>K))return K-P>=C}return!1}function x(C){o=new Set(C.filter(Boolean).filter(P=>P!==s.currentSrc)),l||j()}function ae(){l=!0,z(),q()}function de(){if(!l){j();return}l=!1,j()}function j(){for(const[C,P]of c.entries())o.has(C)||(P.removeAttribute("src"),P.load(),c.delete(C));for(const[C,P]of f.entries())o.has(C)||(P.abort(),f.delete(C));for(const C of o){if(!c.has(C)){const P=document.createElement("video");P.preload="auto",P.crossOrigin="anonymous",P.muted=!0,P.playsInline=!0,P.src=Ye(C),P.load(),c.set(C,P)}u.has(C)||f.has(C)||be(C)}}function z(){for(const C of c.values())C.removeAttribute("src"),C.load();c.clear()}function q(){for(const C of f.values())C.abort();f.clear()}function be(C){const P=new AbortController;f.set(C,P);const H=Bi(C,"_",`${Date.now()}`);nt(H,{signal:P.signal}).then(async W=>{if(!W.ok)return;const K=await W.blob();o.has(C)&&u.set(C,URL.createObjectURL(K))}).catch(W=>{W instanceof DOMException&&W.name}).finally(()=>{f.get(C)===P&&f.delete(C)})}function ce(){o.clear(),l=!1,z(),q();for(const C of u.values())URL.revokeObjectURL(C);u.clear()}function ue(C){return u.get(C)??null}function Y(){if(!(!m||s.readyState<2||s.videoWidth===0||s.videoHeight===0)){b.width=s.videoWidth,b.height=s.videoHeight;try{m.drawImage(s,0,0,b.width,b.height),h=b.toDataURL("image/jpeg",.85)}catch{h=null}}}function Oe(){return Y(),h}function Ee(C){i=C}function me(C){a=C}return{setSource:y,setMuted:I,play:_,pause:S,hideMedia:E,showMedia:N,seekToFraction:L,resetPlayback:F,waitForLoadedData:M,waitForBufferedAhead:k,onTimeUpdate:Ee,onEnded:me,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:C=>{g=C,s.playbackRate=C},getPlaybackRate:()=>g,onPlayStateChange:C=>{r=C},getElement:()=>t,prewarmSources:x,suspendPrewarming:ae,resumePrewarming:de,clearPrewarmedSources:ce,getPrewarmedBlobUrl:ue,captureFrame:Oe}}const no=[.25,.5,1,2];function so(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onAudioToggle:r,onScrubStart:o,onScrubEnd:l,initialSpeed:c=1}=e,u=document.createElement("div");u.className="timeline";const f=document.createElement("div");f.className="timeline__bar-row";const p=document.createElement("div");p.className="timeline__audio is-hidden";const h=document.createElement("button");h.className="timeline__audio-btn",h.type="button",h.setAttribute("aria-label","Toggle audio mute"),h.innerHTML=io(),h.addEventListener("click",()=>r==null?void 0:r()),p.appendChild(h);const b=document.createElement("button");b.className="timeline__play-btn",b.type="button",b.setAttribute("aria-label","Toggle playback"),b.addEventListener("click",()=>s==null?void 0:s());const m=document.createElement("input");m.className="timeline__slider",m.type="range",m.min="0",m.max="1000",m.step="1",m.value="0",m.style.setProperty("--fill","0%"),m.setAttribute("aria-label","Simulation time");const g=document.createElement("div");g.className="timeline__speed";const v=document.createElement("button");v.className="timeline__speed-btn",v.type="button",v.setAttribute("aria-label","Playback speed"),v.addEventListener("click",()=>{g.classList.toggle("open")});const y=document.createElement("div");y.className="timeline__speed-menu";for(const S of no){const E=document.createElement("button");E.className="timeline__speed-option",E.type="button",E.textContent=Dn(S),E.addEventListener("click",()=>{g.classList.remove("open"),i==null||i(S)}),y.appendChild(E)}g.appendChild(v),g.appendChild(y);const I=document.createElement("button");return I.className="timeline__summary-btn",I.type="button",I.setAttribute("aria-label","View run summary"),I.textContent="ⓘ",I.addEventListener("click",()=>a==null?void 0:a()),f.appendChild(p),f.appendChild(b),f.appendChild(m),f.appendChild(g),f.appendChild(I),m.addEventListener("input",()=>{const S=parseInt(m.value,10)/1e3;m.style.setProperty("--fill",`${S*100}%`),t==null||t(S)}),m.addEventListener("pointerdown",()=>o==null?void 0:o()),m.addEventListener("pointerup",()=>l==null?void 0:l()),m.addEventListener("change",()=>l==null?void 0:l()),document.addEventListener("click",S=>{g.contains(S.target)||g.classList.remove("open")}),u.appendChild(f),n.appendChild(u),_(c),{setPosition(S){const E=Math.max(0,Math.min(1,S));m.value=String(Math.round(E*1e3)),m.style.setProperty("--fill",`${E*100}%`)},setPlaying(S){b.textContent=S?"❚❚︎":"▶︎",b.classList.toggle("is-paused",!S),b.setAttribute("aria-label",S?"Pause":"Play")},setSpeed(S){_(S)},setAudioVisible(S){p.hidden=!S,p.classList.toggle("is-hidden",!S)},setMuted(S){h.classList.toggle("is-muted",S),h.setAttribute("aria-label",S?"Unmute audio":"Mute audio")}};function _(S){v.textContent=Dn(S);for(const E of y.children)E.classList.toggle("is-active",E.textContent===Dn(S))}}function Dn(n){return`x${n}`}function io(){return`
    <svg class="timeline__audio-icon" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path class="timeline__audio-waves" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path class="timeline__audio-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <line class="timeline__audio-mute-x" x1="3" y1="3" x2="21" y2="21"
            stroke="currentColor" stroke-width="2" />
    </svg>`}function ao(n,e){const t=Math.min(Di(e),2);return n.toFixed(t)}function qe(n,e){return e?`${n} ${e}`:n}function Wt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?$t(n):e<1e6?`${t}${$t(n/1e3)}k`:e<1e9?`${t}${$t(n/1e6)}M`:e<1e12?`${t}${$t(n/1e9)}B`:`${t}${$t(n/1e12)}T`:String(n)}function $t(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function ro(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function hn(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return Wt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function St(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="qualitative"?String(Math.round(n)):t.format==="compact"||t.format==="scientific"?Wt(i):ao(i,a)}function Di(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function oo(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=lo(s,i,a);for(const o of s.metadata.liveStats){const l=uo(o,r),c=document.createElement("div");c.className="data-panel__metric",c.innerHTML=`
          <span class="data-panel__metric-label">${l.label}</span>
          <span class="data-panel__metric-value">${l.value}</span>
        `,t.appendChild(c)}}}}function lo(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(e[a.id]??a.fallbackValue)]??"--":St(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:co(a),value:r}]))}}function co(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function uo(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=fo((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:qe(a,n.unit)}}function fo(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?Wt(Math.round(a)):Wt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):ro(n,{integer:e.integer})}function Hi(){const n=X("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(mo()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function ho(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function mo(){return ho(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const po={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function go(n,e,t){const s=X("assets/banner-1600.webp"),i=[`${X("assets/banner-960.webp")} 960w`,`${X("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function l(p){o.innerHTML="";for(const h of p){const b=document.createElement("button");b.className="entry-overlay__button",b.type="button";const m=po[h.id]??"Explore this simulation scale.";b.innerHTML=`
        <span class="entry-overlay__button-label">${h.label}</span>
        <span class="entry-overlay__button-description">${m}</span>
      `,b.addEventListener("click",()=>t(h)),o.appendChild(b)}}l(e);const{infoButton:c,infoModal:u,close:f}=Hi();return r.appendChild(o),a.appendChild(r),a.appendChild(c),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){f(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(p){l(p)}}}function yo(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(_=>[_.id,_.target])),a=n.metadata.results.map(_=>{const S=jn(n,e,s,_.id);return S===null?null:{id:_.id,value:S,target:_.target}}).filter(_=>_!==null),r=n.parameters.filter(_=>i[_.id]!==void 0).map(_=>{const S=e[_.id]??_.fallbackValue,E=i[_.id]??_.fallbackValue;return Math.abs(S-E)/Math.max(_.max-_.min,1e-9)}),o=r.reduce((_,S)=>_+S,0)/Math.max(r.length,1),l=vo(a),c=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,f=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${Hn(u,1)} CPU-hrs
${Hn(f,1)} GB`,h=String(n.parameters.length),b=`${(o*100).toFixed(1)}%`,m=String(n.parameters.length+6),g="Present",v=wo((s==null?void 0:s.wallclockSeconds)??t),y=Ks(Ws(jn(n,e,s,"moon_iron"))),I=Ks(Ws(jn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:h},runtime:{label:"Total Runtime",value:v},similarityScore:{label:"Similarity Score",value:`${l}/100`},bestFitDelta:{label:"Best-Fit Delta",value:b},carbonBurnt:{label:"Carbon Burnt",value:c},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:Hn(f,1)},particlesUpdated:{label:"Particle updates",value:s?bo(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:y},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:I},audioTrack:{label:"Audio Track",value:g},terminalLines:{label:"Terminal Lines",value:m},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([_,S])=>[_,{label:S.label,value:S.value}]))}}function bo(n){return String(Math.max(0,n))}function wo(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Hn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function jn(n,e,t,s){var o;const i=n.parameters.find(l=>l.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const l=Number(a);if(Number.isFinite(l))return l}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function Ks(n){return n===null?"--":n.toFixed(1)}function Ws(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function vo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const ss={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},_o={HIDE_AFTER_MS:980},ji="https://media.universemakers.org/engine/run-manifest.json",qn="https://pub-e00201311979473b8a30e279dcc56838.r2.dev/engine/run-manifest.json",So="https://universe-engine.universe-engine.workers.dev/api/track-run",ko=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,Ys=(()=>{const n=Xe(ko),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),mn="#4CD98A",is="#E8951C",qi="#D7372A",Ki=.2,Wi=.5,Gs=2;function Yi(n){const e=Math.abs(n-1);return e<=Ki?{word:"On target",colour:mn}:e<=Wi?{word:n>1?"Too high":"Too low",colour:is}:{word:n>1?"Way too high":"Way too low",colour:qi}}function Eo(n){const e=Math.abs(n-1),t=n>=1;return e<=Ki?t?"greenHigh":"greenLow":e<=Wi?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Io(n){return Math.min(Math.max(n,0),Gs)/Gs*100}function Lo(n){return n>=85?{word:"Almost perfect",colour:mn}:n>=65?{word:"Really close",colour:mn}:n>=45?{word:"Getting there",colour:is}:n>=25?{word:"Not quite",colour:is}:{word:"Way off - try again",colour:qi}}function No(n,e,t){var r,o;const s=Eo(t),i=((r=Ys[n])==null?void 0:r[s])??((o=Ys[e])==null?void 0:o[s]);return i||(Yi(t).colour===mn?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Co(n,e,t){return n.metadata.results.map(s=>{const i=Ao(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=To(s,n,t),o=No(s.id,r,a),l=qe(Gi(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:l,detail:o}}).filter(s=>s!==null)}function Ao(n,e,t,s){var l;const i=n.id,a=e.parameters.find(c=>c.id===i);if(a)return t[i]??a.fallbackValue;const r=Mo((l=s==null?void 0:s.summaryMetrics[i])==null?void 0:l.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function To(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Mo(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Oo(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Po(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const l=document.createElement("p");l.className="summary-overlay__hint",l.textContent="Select any card for more details",a.appendChild(o),a.appendChild(l);const c=document.createElement("div");c.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const f=document.createElement("button"),p=document.createElement("button");f.className="summary-overlay__button summary-overlay__button--primary",f.type="button",f.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),f.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),c.appendChild(f),c.appendChild(u),c.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(c),t.appendChild(i);const h=document.createElement("div");h.className="sci-modal is-hidden",h.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(h),n.appendChild(t);const b=h.querySelector(".sci-modal__title"),m=h.querySelector(".sci-modal__verdict"),g=h.querySelector(".sci-modal__body"),v=h.querySelector(".sci-modal__close"),y=new Set;let I=!1,_=null,S=null;function E(M){const k=Yi(M.value);b.textContent=M.label,m.textContent=k.word,m.style.color=k.colour,m.hidden=!1,g.textContent=M.detail,h.classList.remove("is-hidden")}function N(M,k){b.textContent=M,m.hidden=!0,g.textContent=k,h.classList.remove("is-hidden")}function L(){h.classList.add("is-hidden")}v.addEventListener("click",L),h.addEventListener("click",M=>{M.target===h&&L()}),t.addEventListener("click",M=>{M.target===t&&e.onReplay()});function F(M,k){const O=document.createElement("div");O.className=`${M.className} panel`,O.innerHTML=`<p class="sci-section__title">${M.title}</p>`;const x=document.createElement("div"),ae=M.singleRow?Math.max(1,M.stats.length):Math.max(1,Math.min(M.stats.length,M.maxColumns));x.className="metric-grid",M.singleRow&&x.classList.add("metric-grid--single-row"),x.style.setProperty("--summary-grid-columns",String(ae)),x.style.setProperty("--summary-grid-max-width",`${M.maxWidthRem}rem`);for(const de of M.stats){const j=xo(de,k),z=document.createElement("div"),q=document.createElement("span"),be=document.createElement("span");z.className="res-card",q.className="res-card__label",q.textContent=j.label,be.className="res-card__value",be.textContent=j.value,z.appendChild(q),z.appendChild(be),de.description&&(z.classList.add("res-card--has-info"),z.addEventListener("click",()=>{N(j.label,de.description)})),x.appendChild(z)}return O.appendChild(x),O}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0,I&&(y.clear(),I=!1)},_o.HIDE_AFTER_MS)},resetGalaxyChecklist(){var M;y.clear(),I=!1,S=_;for(const k of r.querySelectorAll(".galaxy-summary__check")){k.classList.remove("is-found");const O=k.querySelector(".galaxy-summary__check-box");O&&(O.textContent="")}(M=r.querySelector(".galaxy-summary__done"))==null||M.remove()},setHomeVisible(M){p.hidden=!M},update(M,k,O,x,ae,de){var W,K,Ie,fe,Q,we;r.innerHTML="",L();const j=yo(M,k,O,x),z=M.metadata.summaryStats,q=Co(M,k,x),be=new Set(q.map(U=>U.id));let ce;if(q.length>0)ce=Oo(q);else{const U=((W=j.similarityScore)==null?void 0:W.value)??"0/100";ce=parseInt(U,10)||0}const ue=Lo(ce),Y=document.createElement("div"),Oe=document.createElement("div"),Ee=document.createElement("div");Y.className="sci-top",Oe.className="summary-main-column",Ee.className="summary-side-column";const me=document.createElement("div");me.className="sci-hero panel",ae?(me.classList.add("sci-hero--thumbnail"),me.innerHTML=`<img class="sci-hero__thumbnail" src="${ae}" alt="Final frame of simulation" />`):me.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${ce}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${ue.colour}">${ue.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${ce}%; background:${ue.colour}; box-shadow:0 0 12px ${ue.colour}"></div>
          </div>
        `,Oe.appendChild(me);const C=z.filter(U=>(U.section??"resources")==="resources"&&!q.some(J=>J.id===String(U.id))&&U.id!=="similarityScore"),P=z.filter(U=>U.section==="simulationStats"&&!be.has(String(U.id)));C.length>0&&Ee.appendChild(F({title:"Resources Used",className:"res-section",stats:C,maxColumns:3,maxWidthRem:48},j)),P.length>0&&Ee.appendChild(F({title:"Simulation Stats",className:"res-section",stats:P,maxColumns:P.length,maxWidthRem:48,singleRow:!0},j)),Y.appendChild(Oe),Ee.childElementCount>0&&Y.appendChild(Ee),r.appendChild(Y);const H=M.metadata.morphologyChecklist;if(H&&H.length>0){const U=((Ie=(K=x==null?void 0:x.summaryMetrics)==null?void 0:K.morphology)==null?void 0:Ie.value)??null,J=(U==null?void 0:U.toLowerCase())??null,re=new Set(H.map(V=>V.id));_=de??null,J&&re.has(J)&&_!==S&&y.add(J),_!==S&&(S=null);const Z=document.createElement("div");Z.className="sci-bottom-row";const D=document.createElement("div");D.style.cssText="display:flex; flex-direction:column; gap:1.25rem;",D.appendChild(zs(M,k,N));const Ne=((fe=H.find(V=>V.id===J))==null?void 0:fe.label)??U;if(Ne){const V=document.createElement("div");V.className="sci-section panel param-section";const oe=document.createElement("p");oe.className="sci-section__title",oe.textContent="Galaxy Morphology";const Pe=document.createElement("div");Pe.className="res-card res-card--has-info";const Ae=document.createElement("span");Ae.className="res-card__value",Ae.textContent=Ne,Pe.appendChild(Ae),Pe.addEventListener("click",()=>{var xe;return N("Galaxy Morphology",((xe=H.find(le=>le.id===(U??"").toLowerCase()))==null?void 0:xe.description)??`This galaxy is classified as "${Ne}".`)}),V.appendChild(oe),V.appendChild(Pe),D.appendChild(V)}Z.appendChild(D);const ve=document.createElement("div");ve.style.cssText="flex:1; display:flex; flex-direction:column; gap:1.25rem; min-width:0; min-height:0;";const Ve=((we=(Q=x==null?void 0:x.summaryMetrics)==null?void 0:Q.description)==null?void 0:we.value)??null;if(Ve){const V=document.createElement("div");V.className="sci-section panel",V.style.cssText="flex:0 1 auto; min-width:0;";const oe=document.createElement("p");oe.className="sci-section__title",oe.textContent="About This Galaxy";const Pe=document.createElement("p");Pe.className="galaxy-summary__desc-text",Pe.textContent=Ve,V.appendChild(oe),V.appendChild(Pe),ve.appendChild(V)}const We=document.createElement("div");We.className="sci-section panel",We.style.cssText="flex:1; min-height:0;";const Ue=document.createElement("p");Ue.className="sci-section__title",Ue.textContent="Morphology Scavenger Hunt";const Ce=document.createElement("div");Ce.className="galaxy-summary__checklist",Ce.style.cssText="flex:1; align-items:center;";const Ze=H.every(V=>y.has(V.id));for(const V of H){const oe=document.createElement("div");oe.className="galaxy-summary__check",y.has(V.id)&&oe.classList.add("is-found"),oe.innerHTML=`
            <span class="galaxy-summary__check-box">
              ${y.has(V.id)?"✓":""}
            </span>
            <span class="galaxy-summary__check-label">${V.label}</span>
          `,V.hint&&(oe.classList.add("res-card--has-info"),oe.addEventListener("click",()=>N(V.label,V.hint))),Ce.appendChild(oe)}if(We.appendChild(Ue),We.appendChild(Ce),Ze){I=!0;const V=document.createElement("div");V.className="galaxy-summary__done",V.textContent="★ You've discovered all of the galaxy types. Well done! ★",We.appendChild(V)}ve.appendChild(We),Z.appendChild(ve),r.appendChild(Z)}else if(q.length>0){const U=document.createElement("div");U.className="sci-bottom-row",U.appendChild(zs(M,k,N));const J=document.createElement("div"),re=document.createElement("div"),Z=document.createElement("p"),D=document.createElement("p");J.className="sci-section panel",re.className="sci-section__header",Z.className="sci-section__title",Z.textContent="Similarity Results",D.className="sci-section__hint",D.textContent="Select any bar for details",re.appendChild(Z),re.appendChild(D);const Ne=document.createElement("div");Ne.className="sci-bars";for(const ve of q){const Ve=document.createElement("div");Ve.className="sci-bar",Ve.innerHTML=`
            <div class="sci-bar__name">${ve.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Io(ve.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${ve.formattedValue}</div>
          `,Ve.addEventListener("click",()=>E(ve)),Ne.appendChild(Ve)}J.appendChild(re),J.appendChild(Ne),U.appendChild(J),r.appendChild(U)}}}}function xo(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Ro(s,n);if(i)return{label:n.label??t.label,value:i};const a=Gi(s,n);return{label:n.label??t.label,value:qe(a,n.unit)}}function zs(n,e,t){const s=document.createElement("div");s.className="sci-section panel param-section",s.innerHTML='<p class="sci-section__title">Input Parameters</p>';const i=document.createElement("div");i.className="param-cards";for(const a of n.parameters){const r=e[a.id]??a.fallbackValue,o=a.displayUnit??a.unit,l=document.createElement("div"),c=document.createElement("span"),u=document.createElement("span");l.className="res-card",a.description&&t&&(l.classList.add("res-card--has-info"),l.addEventListener("click",()=>t(a.label,a.description))),c.className="res-card__label",c.textContent=a.label,u.className="res-card__value";const f=a.displayFormat==="qualitative"&&a.qualiLabels?a.qualiLabels[Math.round(r)]??"--":St(r,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures});u.textContent=qe(f,o),l.appendChild(c),l.appendChild(u),i.appendChild(l)}return s.appendChild(i),s}function Ro(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?qe(hn(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):qe(hn(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):qe(n,e.unit)}function Gi(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return hn(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return hn(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return Wt(i)}function $o(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const l=Bo(a.icon);if(l){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(l),o.appendChild(u)}const c=document.createElement("span");if(c.className="view-switcher__label",c.textContent=a.label??a.id,o.appendChild(c),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(Fo()),u.addEventListener("click",f=>{f.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Bo(n){switch(n){case"icon_houdini":return Me(`
        <rect x="4.5" y="8" width="9.8" height="8" rx="1.2"></rect>
        <path d="M14.3 10.1 19.5 7.3v9.4l-5.2-2.8Z"></path>
        <circle cx="8" cy="7" r="1.4"></circle>
        <circle cx="11.3" cy="7" r="1.4"></circle>
      `);case"icon_material":return Me(`
        <path d="M12 4.6a7.4 7.4 0 1 0 7.4 7.4"></path>
        <path d="M12 12V4.6"></path>
        <path d="M12 12h7.4"></path>
        <path d="M12 8.8a3.2 3.2 0 0 1 3.2 3.2"></path>
        <path d="M12 12V8.8"></path>
        <path d="M12 12h3.2"></path>
      `);case"icon_temperature":return Me(`
        <path d="M10.8 6.2a2.2 2.2 0 0 1 4.4 0v7.1a4.2 4.2 0 1 1-4.4 0Z"></path>
        <path d="M13 8.3v7.1"></path>
        <circle cx="13" cy="17.5" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"icon_pressure":return Me(`
        <path d="M5.2 16a6.8 6.8 0 1 1 13.6 0"></path>
        <path d="M12 9.2v2"></path>
        <path d="M8.2 10.8 9.4 12"></path>
        <path d="M15.8 10.8 14.6 12"></path>
        <path d="M12 16 16.4 11.8"></path>
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none"></circle>
      `);case"dark-matter":return Me(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Me(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Me(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Me(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Me(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"turntable":return Me(`
        <ellipse cx="12" cy="17.2" rx="7.6" ry="1.8"></ellipse>
        <path d="M12 6.2v6.4"></path>
        <path d="m12 6.2-2.6 2"></path>
        <path d="m12 6.2 2.6 2"></path>
        <path d="M12 12.6l-2.6-2"></path>
        <path d="M12 12.6l2.6-2"></path>
      `);case"large-scale-structure":return Me(`
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
      `);case"line-trace":return Me(`
        <path d="M3.5 14.5h3l2.2-5 2.8 9 2.4-6 1.8 2.5H20.5"></path>
        <path d="M3.5 19.5h17"></path>
        <circle cx="8.7" cy="9.5" r="0.9" fill="currentColor" stroke="none"></circle>
        <circle cx="11.5" cy="18.5" r="0.9" fill="currentColor" stroke="none"></circle>
      `);default:return null}}function Me(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function Fo(){return Me(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Vo=`# Credits source-of-truth.
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
`;function Uo(){const n=Xe(Vo);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Do(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,f){a=u,r=f?{...f}:Ho(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const h=document.createElement("div");h.className="param-info-modal is-hidden",h.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(h);const b=h.querySelector(".sci-modal__title"),m=h.querySelector(".sci-modal__body"),g=h.querySelector(".sci-modal__close");function v(_,S){b.textContent=_,m.textContent=S,h.classList.remove("is-hidden")}function y(){h.classList.add("is-hidden")}g.addEventListener("click",y),h.addEventListener("click",_=>{_.target===h&&y()});const I=document.createElement("div");I.className="parameter-editor__list";for(const _ of u.parameters)I.appendChild(l(_,v));i.appendChild(I),c()}function l(u,f){const p=document.createElement("div");p.className="res-card param-card";const h=document.createElement("div");h.className="param-card__header";const b=document.createElement("span");b.className="res-card__label",b.textContent=u.label;const m=u.displayUnit??u.unit,g=u.displayFormat==="qualitative"&&u.qualiLabels&&u.qualiLabels.length>0,v=document.createElement("span");if(v.className="param-card__range",g){const E=u.qualiLabels;v.textContent=`${E[0]} – ${E[E.length-1]}`}else v.textContent=`${qe(St(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),m)} – ${qe(St(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),m)}`;h.appendChild(b),h.appendChild(v);const y=document.createElement("input");y.className="param-card__slider",y.type="range";const I=r[u.id]??u.fallbackValue;if(g){const E=u.qualiLabels.length;y.min="0",y.max=String(E-1),y.step="any",y.value=String(Math.round(I))}else{const E=u.logScale?Math.log10(u.min):u.min,N=u.logScale?Math.log10(u.max):u.max;y.min=String(E),y.max=String(N),y.step=u.logScale?"0.001":String(u.step),y.value=String(u.logScale?Math.log10(Math.max(I,Number.MIN_VALUE)):I)}y.setAttribute("aria-label",u.label);const _=document.createElement("span");_.className="res-card__value";function S(E){if(g){const N=Math.round(E),L=u.qualiLabels;r[u.id]=N,y.style.setProperty("--fill",`${on(E,0,L.length-1)}%`),_.textContent=L[N]??String(N)}else{const N=u.logScale?10**E:E;r[u.id]=N,y.value=String(E),y.style.setProperty("--fill",`${on(E,parseFloat(y.min),parseFloat(y.max))}%`),_.textContent=qe(St(N,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),m)}c()}if(y.addEventListener("input",()=>{S(parseFloat(y.value))}),y.addEventListener("pointerdown",E=>E.stopPropagation()),y.addEventListener("click",E=>E.stopPropagation()),g){const E=Math.round(I),N=u.qualiLabels;y.style.setProperty("--fill",`${on(E,0,N.length-1)}%`),_.textContent=N[E]??String(E)}else{const E=u.logScale?Math.log10(Math.max(I,Number.MIN_VALUE)):I;y.style.setProperty("--fill",`${on(E,parseFloat(y.min),parseFloat(y.max))}%`),_.textContent=qe(St(I,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),m)}if(u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const E=document.createElement("span");E.className="param-card__info-btn",E.setAttribute("aria-label","Parameter description"),E.textContent="ⓘ",h.appendChild(E),p.addEventListener("click",()=>{f(u.label,u.description)})}return p.appendChild(h),p.appendChild(y),p.appendChild(_),p}function c(){s({...r})}return o(e,t),{setSimClass(u,f){o(u,f)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Ho(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function on(n,e,t){return t===e?0:(n-e)/(t-e)*100}const zi="universe-engine-advanced-settings",jo="RSSSE26UM_Engine";function pn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[],audioMutedByDefault:!0,defaultAudioVolume:.75}}function qo(n){const e=localStorage.getItem(zi);if(!e)return pn();try{const t=JSON.parse(e);return Ji(t,n)}catch{return pn()}}function Ko(n,e){const t=Ji(n,e);return localStorage.setItem(zi,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds,audioMutedByDefault:t.audioMutedByDefault,defaultAudioVolume:t.defaultAudioVolume})),t}function Ji(n,e){const t=pn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((l,c,u)=>typeof l=="string"&&s.has(l)&&u.indexOf(l)===c&&l!==a):t.hiddenScaleIds,o=Wo(typeof n.defaultAudioVolume=="number"?n.defaultAudioVolume:t.defaultAudioVolume);return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r,audioMutedByDefault:!!n.audioMutedByDefault,defaultAudioVolume:o}}function Wo(n){return Number.isFinite(n)?Math.max(0,Math.min(1,n)):pn().defaultAudioVolume}function Yo(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Go(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
      <p class="config-overlay__media-subtitle"></p>
    </div>
  `,a.prepend(r);const o=a.querySelector(".config-overlay__media-subtitle"),l=document.createElement("img");l.className="config-overlay__chartermark",l.src=X("assets/credits/des9400-chartermark.webp"),l.alt="DES9400 SSE 2026 Chartermark",l.decoding="async",a.appendChild(l);const c=document.createElement("div");c.className="config-overlay__controls",c.dataset.view=e.initialView??"parameters";const u=document.createElement("div");u.className="config-overlay__header";const f=document.createElement("div");f.className="config-overlay__title-block",f.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const p=f.querySelector(".config-overlay__eyebrow"),h=f.querySelector(".config-overlay__title"),b=f.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Back"),m.textContent="←",u.appendChild(f),u.appendChild(m);const g=document.createElement("section");g.className="config-overlay__section config-overlay__section--grow",g.dataset.section="parameters";const v=document.createElement("div");g.appendChild(v);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="settings";const I=document.createElement("div");I.className="config-overlay__settings-block",I.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here, and set the default audio behavior for views that support sonification.</p>
  `;const _=document.createElement("section");_.className="config-overlay__settings-group config-overlay__settings-block",_.innerHTML=`
    <p class="config-overlay__eyebrow">Galaxy checklist</p>
    <p class="config-overlay__settings-copy">Clear the galaxy scavenger-hunt progress and uncheck every morphology box for this session.</p>
  `;const S=document.createElement("button");S.className="advanced-settings__access",S.type="button",S.textContent="Reset Galaxy Checkboxes",S.addEventListener("click",()=>{e.onResetGalaxyChecklist()}),_.appendChild(S),y.appendChild(I),y.prepend(_);const E=document.createElement("section");E.className="audio-settings config-overlay__settings-block",E.innerHTML=`
    <p class="config-overlay__eyebrow">Audio defaults</p>
    <p class="config-overlay__settings-copy">These defaults apply when a run opens an audio-enabled view. You can still change them from the playback controls.</p>
  `;const N=document.createElement("label");N.className="advanced-settings__field advanced-settings__field--inline";const L=document.createElement("input"),F=document.createElement("span");L.type="checkbox",L.className="advanced-settings__checkbox",F.innerHTML=`
    <span class="advanced-settings__label">Mute audio by default</span>
    <span class="advanced-settings__help">Start audio-enabled views muted until the visitor chooses to listen.</span>
  `,N.appendChild(L),N.appendChild(F),E.appendChild(N);const M=document.createElement("label");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Default audio volume</span>
    <span class="advanced-settings__help">Set the starting playback level for sonified runs.</span>
  `;const k=document.createElement("input"),O=document.createElement("span");k.type="range",k.min="0",k.max="100",k.step="1",k.className="audio-settings__slider",O.className="audio-settings__value",M.appendChild(k),M.appendChild(O),E.appendChild(M),y.appendChild(E);const x=document.createElement("section");x.className="advanced-settings config-overlay__settings-block",x.dataset.state="closed",x.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const ae=document.createElement("button");ae.className="advanced-settings__access",ae.type="button",ae.textContent="Advanced Settings",x.appendChild(ae);const de=document.createElement("div");de.className="advanced-settings__auth";const j=document.createElement("input");j.className="advanced-settings__password",j.type="password",j.placeholder="Enter password",j.autocomplete="off";const z=document.createElement("button");z.className="advanced-settings__unlock",z.type="button",z.textContent="Unlock";const q=document.createElement("p");q.className="advanced-settings__message",de.appendChild(j),de.appendChild(z),de.appendChild(q),x.appendChild(de);const be=document.createElement("div");be.className="advanced-settings__form";const ce=document.createElement("label");ce.className="advanced-settings__field",ce.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const ue=document.createElement("select");ue.className="advanced-settings__select",ue.appendChild(new Option("None",""));for(const T of e.availableScales)ue.appendChild(new Option(T.label,T.id));ce.appendChild(ue),be.appendChild(ce);const Y=document.createElement("div");Y.className="advanced-settings__field",Y.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const Oe=document.createElement("div");Oe.className="advanced-settings__options";const Ee=document.createElement("label"),me=document.createElement("input");Ee.className="advanced-settings__choice",me.type="radio",me.name="manifest-source",me.value="local",Ee.appendChild(me),Ee.append("Local manifest");const C=document.createElement("label"),P=document.createElement("input");C.className="advanced-settings__choice",P.type="radio",P.name="manifest-source",P.value="online",C.appendChild(P),C.append("Online manifest"),Oe.appendChild(Ee),Oe.appendChild(C),Y.appendChild(Oe),be.appendChild(Y);const H=document.createElement("label");H.className="advanced-settings__field advanced-settings__field--inline";const W=document.createElement("input"),K=document.createElement("span");W.type="checkbox",W.className="advanced-settings__checkbox",K.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,H.appendChild(W),H.appendChild(K),be.appendChild(H);const Ie=document.createElement("div");Ie.className="advanced-settings__field",Ie.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const fe=document.createElement("div");fe.className="advanced-settings__options";const Q=new Map;for(const T of e.availableScales){const B=document.createElement("label"),pe=document.createElement("input");B.className="advanced-settings__choice",pe.type="checkbox",pe.value=T.id,Q.set(T.id,pe),B.appendChild(pe),B.append(`Show ${T.label}`),fe.appendChild(B)}Ie.appendChild(fe),be.appendChild(Ie),x.appendChild(be),y.appendChild(x);const we=document.createElement("section");we.className="config-overlay__section config-overlay__section--grow",we.dataset.section="credits",we.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const U=we.querySelector("[data-credits]"),J=Uo();if(U.innerHTML="",J.length===0){const T=document.createElement("div");T.className="credits-list__entry",T.textContent="To be credited...",U.appendChild(T)}else for(const T of J)if(T.header){const B=document.createElement("div");B.className="credits-list__heading",B.textContent=T.text,U.appendChild(B)}else{const B=document.createElement("div");B.className="credits-list__entry";const pe=document.createElement("span");if(pe.className="credits-list__text",T.url){const ee=document.createElement("a");ee.className="credits-list__link",ee.href=T.url,ee.target="_blank",ee.rel="noopener noreferrer",ee.textContent=T.text,pe.appendChild(ee)}else pe.textContent=T.text;B.appendChild(pe),U.appendChild(B)}const re=document.createElement("div");re.className="config-overlay__footer";const Z=document.createElement("button");Z.className="run-button",Z.type="button",Z.textContent="Run",re.appendChild(Z),c.appendChild(u),c.appendChild(g),c.appendChild(y),c.appendChild(we),c.appendChild(re),i.appendChild(a),i.appendChild(c),s.appendChild(i),t.appendChild(s),n.appendChild(t);let D=Bt(e.advancedSettings),Ne="closed",ve=!e.advancedSettings.lockedScaleId;const Ve=Do(v,e.simClass,e.values,e.onValuesChange),We=zr(I,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),ae.addEventListener("click",()=>{if(Ne==="open"){V("closed");return}V("auth"),j.focus()}),z.addEventListener("click",Ze),j.addEventListener("keydown",T=>{T.key==="Enter"&&Ze()}),ue.addEventListener("change",()=>{D.lockedScaleId=ue.value||null,Ce()}),me.addEventListener("change",()=>{me.checked&&(D.manifestSource="local")}),P.addEventListener("change",()=>{P.checked&&(D.manifestSource="online")}),W.addEventListener("change",()=>{D.verboseLogging=W.checked}),L.addEventListener("change",()=>{D.audioMutedByDefault=L.checked}),k.addEventListener("input",()=>{D.defaultAudioVolume=Number(k.value)/100,Ae()});for(const[T,B]of Q.entries())B.addEventListener("change",()=>{if(Array.from(Q.entries()).filter(([,ee])=>ee.checked).map(([ee])=>ee).length===0&&!D.lockedScaleId){B.checked=!0;return}D.hiddenScaleIds=Array.from(Q.keys()).filter(ee=>{var Le;return!((Le=Q.get(ee))!=null&&Le.checked)&&ee!==D.lockedScaleId}),Ce()}),T===D.lockedScaleId&&(B.disabled=!0);Ue(e.initialView??"parameters"),Ce(),le(ve);function Ue(T){c.dataset.view=T,T==="parameters"?(p.textContent=e.simClass.label,h.textContent="Shape Your Simulation",b.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",o.textContent=e.simClass.label,o.hidden=!1,r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):T==="settings"?(p.textContent="Interface",h.textContent="Adjust The Control Room",b.textContent="Change the interface theme and manage exhibit-level options for this installation.",o.textContent="",o.hidden=!0,r.src=X("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(p.textContent="References",h.textContent="Project Sources And Attribution",b.textContent="Review the datasets, imagery, and supporting materials behind this experience.",o.textContent="",o.hidden=!0,r.src=X("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),T==="settings"?Z.textContent="Apply":Z.textContent="Run Simulation",re.hidden=T==="credits",xe()}function Ce(){ue.value=D.lockedScaleId??"",me.checked=D.manifestSource==="local",P.checked=D.manifestSource==="online",W.checked=D.verboseLogging,L.checked=D.audioMutedByDefault,k.value=String(Math.round(D.defaultAudioVolume*100)),Ae();for(const[T,B]of Q.entries()){const pe=D.lockedScaleId===T;B.checked=pe||!D.hiddenScaleIds.includes(T),B.disabled=pe}}function Ze(){if(j.value!==jo){q.textContent="Incorrect password";return}j.value="",q.textContent="",V("open")}function V(T){Ne=T,x.dataset.state=T,ae.textContent=T==="open"?"Hide Advanced Settings":"Advanced Settings",T!=="auth"&&(q.textContent="")}function oe(){j.value="",q.textContent="",V("closed")}function Pe(){D=Bt(e.advancedSettings),Ce()}function Ae(){O.textContent=`${Math.round(Number(k.value))}%`}function xe(){const T=c.dataset.view,B=T==="settings"||T==="credits"||ve;m.hidden=!B,m.classList.toggle("is-hidden",!B),m.setAttribute("aria-label",T==="parameters"?"Back":"Close"),m.textContent=T==="parameters"?"←":"×"}function le(T){ve=T,xe()}return Z.addEventListener("click",()=>{if(c.dataset.view==="settings"){e.onApplySettings(Bt(D));return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),Pe(),oe()},setSimulation(T,B){e.simClass=T,a.dataset.simClass=T.id,Ve.setSimClass(T,B),c.dataset.view==="parameters"&&(r.src=T.placeholderImage,r.alt=`${T.label} preview`,Ue("parameters"))},setTheme(T){We.setActive(T)},setView(T){Ue(T),T!=="settings"&&oe()},setAdvancedSettings(T){e.advancedSettings=Bt(T),D=Bt(T),Ce(),oe()},setBackVisible:le}}function Bt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds],audioMutedByDefault:n.audioMutedByDefault,defaultAudioVolume:n.defaultAudioVolume}}function zo(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=ss,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let l=[],c=0;function u(){for(const b of l)window.clearTimeout(b);l=[]}function f(b,m){return new Promise(g=>{const v=window.setTimeout(()=>{m===c&&g()},Math.max(0,b));l.push(v)})}async function p(b,m){const g=document.createElement("div");g.className="terminal__line";const v=h();g.appendChild(v),o.appendChild(g);for(let y=0;y<b.length;y+=1){if(m!==c)return;const I=b[y];g.insertBefore(document.createTextNode(I),v),o.scrollTop=o.scrollHeight,await f(e,m)}v.remove()}function h(){const b=document.createElement("span");return b.className="terminal__cursor",b.textContent="█",b}return{async show(b,m,g,v){u(),c+=1;const y=c;i.hidden=!1,i.classList.remove("is-hidden");const I=performance.now(),_=(v==null?void 0:v.minTerminalTimeMs)??t;let S=!g,E=[...b];g&&g.then(()=>{S=!0});let N=0;for(;y===c;){E.length===0&&(E=[...b]);const F=Math.floor(Math.random()*E.length),[M]=E.splice(F,1),k=`${Js(N)} ${M.text}`;if(N+=1,await p(k,y),y!==c)return;if(performance.now()-I>=_&&S)break}if(y!==c)return;const L=document.createElement("div");L.className="terminal__line terminal__line--syncing",L.textContent=`${Js(N)} STARTING SIMULATION...`,o.appendChild(L),o.scrollTop=o.scrollHeight,await f(s,y),y===c&&m()},hide(){u(),c+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function Js(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${Kn(t)}:${Kn(s)}:${Kn(i)}]`}function Kn(n){return String(n).padStart(2,"0")}function Jo(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{u(),e.onHome()}),r=c("Select Parameters",()=>{u(),e.onParameters()});s.appendChild(a),s.appendChild(r),s.appendChild(c("Settings",()=>{u(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{u(),e.onViewSelected("credits")}));const o=c("Fullscreen",()=>{var p;u(),document.fullscreenElement?document.exitFullscreen():(p=document.getElementById("app"))==null||p.requestFullscreen()});s.appendChild(o),n.appendChild(s);function l(){const p=o.querySelector(".display-menu__item-label");p&&(p.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const h=document.getElementById("app");h&&h.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",l),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",p=>{n.contains(p.target)||u()}),f(e.showHome??!0),{close:u,setHomeVisible:f};function c(p,h){const b=document.createElement("button");return b.className="display-menu__item",b.type="button",b.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${p}</span>
    `,b.addEventListener("click",h),b}function u(){n.classList.remove("open")}function f(p){a.hidden=!p,a.classList.toggle("is-hidden",!p),r.hidden=p,r.classList.toggle("is-hidden",p)}}const Qi="universe-engine-playback-speed",Qo=new Set([.25,.5,1,2]);function Xo(){const n=localStorage.getItem(Qi),e=n?Number(n):NaN;return Qo.has(e)?e:1}function Zo(n){localStorage.setItem(Qi,String(n))}async function Wn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function el(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const tl=`# Initialization terminal script for the Planetary simulation family.
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
`,nl=`# Initialization terminal script for the Galaxy simulation family.
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
`,sl=`# Initialization terminal script for the Cosmos simulation family.
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
`,il={planetary:tl,galaxy:nl,cosmos:sl};function al(n){return Xe(il[n.id]).map(t=>({text:t}))}function Yt(n,e,t,s){if(e.length===0)return 0;const i=s?e.filter(r=>s.has(r.id)):e;return i.length===0?0:i.reduce((r,o)=>{var f;const l=t[o.id]??o.fallbackValue,c=((f=n.parameters)==null?void 0:f[o.id])??o.fallbackValue,u=Math.max(o.max-o.min,1e-9);return r+Math.abs(l-c)/u},0)/i.length}function rl(n,e,t){if(n.length===0)return null;const s=new Set(e.filter(u=>u.primary!==!1).map(u=>u.id)),i=new Set(e.filter(u=>u.primary===!1).map(u=>u.id));if(!e.some(u=>u.primary===!1))return Yn(n,e,t);const r=Yn(n,e,t,s);if(!r)return null;const o=Yt(r,e,t,s),l=1e-6,c=n.filter(u=>{const f=Yt(u,e,t,s);return Math.abs(f-o)<=l});return Yn(c,e,t,i)}function Yn(n,e,t,s){if(n.length===0)return null;let i=n[0],a=Yt(i,e,t,s);for(const r of n.slice(1)){const o=Yt(r,e,t,s);o<a&&(i=r,a=o)}return i}function ol(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function ll(n){try{const e=await nt(n);if(!e.ok)return null;const t=await e.text(),s=Xe(t),i=bt(s.wallclockSeconds),a=bt(s.computeUsed),r=bt(s.memoryUsed),o=bt(s.carbonBurnt),l=bt(s.particlesUpdated),c=await cl(n),u=dl(s.summaryMetrics);return i===null||a===null||r===null||o===null||l===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:l,parameterValues:c,summaryMetrics:u}}catch{return null}}async function cl(n){try{const e=await nt(ul(n));if(!e.ok)return{};const t=await e.text(),s=Xe(t);return fl(s)}catch{return{}}}function ul(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function bt(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function dl(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function fl(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=bt(s);i!==null&&(e[t]=i)}return e}const Xi="[UniverseEngine]";let Zi=!1;function Qs(n){Zi=n}function ea(){return Zi}function he(n,e){ea()&&console.info(Xi,n,e??"")}function Je(n,e){ea()&&console.warn(Xi,n,e??"")}const hl={local:"assets/local-manifest.json",online:ji};function ml(n="local"){let e=n;const t=new Map,s=new Map;return{getSource(){return e},setSource(i){t.delete(i),s.delete(i),Xr(),e=i,he("Manifest source updated",{source:i})},async preloadActiveManifest(){await na(e,t,s)},async findNearestVideo(i,a,r){const o=await yl(e,t,s,i,a,r);if(o)return o;const l=ta(i);return Je("Falling back to placeholder assets",{simClassId:i,source:e,fallbackUrl:l}),{url:l,liveDataUrl:pl(i),summaryUrl:ol(l)}}}}function ta(n){switch(n){case"planetary":return X("assets/planet_test.mp4");case"galaxy":return X("assets/galaxy_test.mp4");case"cosmos":return X("assets/cosmo_test.mp4");default:return X("assets/galaxy_test.mp4")}}function pl(n){switch(n){case"planetary":return X("assets/planet_test_planetary_stats.csv");case"galaxy":return X("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return X("assets/cosmo_test_cosmos_stats.csv");default:return X("assets/galaxy_test_galaxy_stats.csv")}}async function na(n,e,t){const s=e.get(n);if(s)return s;const i=hl[n],a=(n==="online"?gl(i):fetch(X(i),{cache:"no-store"}).then(async r=>{if(!r.ok)throw new Error(`Failed to load manifest: ${i}`);return he("Loaded manifest",{source:n,manifestPath:i}),await r.json()})).then(r=>(t.set(n,bl()),r)).catch(r=>(t.delete(n),Je("Manifest unavailable",{source:n,manifestPath:i,error:r instanceof Error?r.message:String(r)}),{version:1,runs:[]}));return e.set(n,a),a}async function gl(n){const e=[n,qn];for(const t of e)try{const s=await fetch(t,{cache:"no-store"});if(!s.ok)continue;const i=await s.json(),a=i.primaryBase??Xs(ji),r=i.backupBase??Xs(qn);return Qr(a,r),t===qn&&Zr("backup"),he("Loaded manifest",{source:"online",manifestPath:t,primaryBase:a,backupBase:r}),i}catch{continue}throw new Error(`Failed to load manifest: ${n}`)}async function yl(n,e,t,s,i,a){const o=(await na(n,e,t)).runs.filter(p=>p.simulationId===s);if(o.length===0)return Je("No manifest runs found for simulation",{simClassId:s,source:n}),null;const l=rl(o,i,a);if(!l)return null;const c=Yt(l,i,a),u=l.defaultView??Object.keys(l.views)[0],f=l.views[u];return f?(he("Selected manifest-backed run",{simClassId:s,source:n,runId:l.runId,selectedValues:a,distance:c,viewId:u}),{url:Ft(n,f,t),liveDataUrl:Ft(n,l.liveDataPath,t),summaryUrl:Ft(n,l.summaryPath,t),audioUrl:l.audioPath?Ft(n,l.audioPath,t):void 0,viewId:u,runId:l.runId,views:Object.fromEntries(Object.entries(l.views).map(([p,h])=>[p,Ft(n,h,t)]))}):null}function Ft(n,e,t){const s=n==="local"?X(e):Ye(e),i=t.get(n);return i?Bi(s,"_manifest",i):s}function bl(){return`${Date.now()}`}function Xs(n){const e=new URL(n);return`${e.protocol}//${e.host}`}const Dt={mode:"time",frames:[]};async function wl(n){const e=await nt(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Sl(t)}function vl(n,e,t=0){if(n.mode==="row")return kl(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=_l(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],l=(e-r.t)/Math.max(o.t-r.t,1e-9);return El(r.values,o.values,l)}function _l(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function Sl(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Dt;const t=Gn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=Gn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=Gn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function kl(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function Gn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function El(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,l=parseFloat(r),c=parseFloat(o);if(Number.isFinite(l)&&Number.isFinite(c)){const u=l+(c-l)*t;i[a]=Il(u);continue}i[a]=t<.5?r:o}return i}function Il(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Ll(n){Nl(So,n)}function Nl(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){he("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?he("Run selection tracked",{simulationId:e.simulationId}):Je("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Je("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const Zs=50*1024*1024,Cl=8,Al=6e3,Tl=8e3,Ml=7e3,Ol=1200,Pl=100,xl="(max-width: 768px), (max-height: 450px)",zn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Rl(n){const e=yt.map(d=>d.id);let t=qo(e),s=As(t);const i=ml(t.manifestSource),a=el(),r=window.matchMedia(xl);Qs(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let o=Ts(t.lockedScaleId)??s[0]??yt[0],l=t.lockedScaleId?zn[o.id]:Gr(),c=!1,u=0,f=null,p=null,h=!1,b=t.audioMutedByDefault,m=t.defaultAudioVolume,g=0;const v=new Set;let y=null,I=0,_=Dt,S=null,E=0,N=!r.matches,L=!1;const F=Object.fromEntries(yt.map(d=>[d.id,pa(d)]));Un(l);const M=ta(o.id),k=to(n,M),O=document.createElement("audio");O.preload="auto",O.hidden=!0,O.setAttribute("playsinline","true"),O.muted=b,O.volume=m,n.appendChild(O);const x=document.createElement("div");x.className="display-chrome",x.classList.add("is-hidden"),n.appendChild(x);const ae=document.createElement("div");ae.className="orientation-overlay",ae.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(ae);const de=document.createElement("div");de.className="swift-logo",de.innerHTML=`
    <img
      class="swift-logo__image"
      src="${X("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      decoding="async"
    />
    <img
      class="swift-logo__image-compact"
      src="${X("assets/credits/swift-logo-compact.webp")}"
      alt="SWIFT"
      decoding="async"
    />
  `,n.appendChild(de);const j=document.createElement("div");j.className="synth-logo is-hidden",j.innerHTML=`
    <img
      class="synth-logo__image"
      src="${X("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
    <img
      class="synth-logo__image-compact"
      src="${X("assets/credits/synthesizer_banner_compact.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(j);const z=document.createElement("img");z.className="app-partner-logo",z.src=X("assets/dirac-hpc-white.webp"),z.alt="DIRAC HPC",z.decoding="async",n.appendChild(z);const q=document.createElement("div");q.className="display-chrome__top-left is-hidden",n.appendChild(q);const be=Jo(q,{onHome(){An()},onParameters(){Ot("parameters")},onViewSelected(d){if(d==="credits"){Ot("credits");return}Ot(d)},showHome:!t.lockedScaleId}),ce=document.createElement("div");ce.className="display-chrome__left-center",x.appendChild(ce);const ue=$o(ce,{onSelect(d){Es(d)},onInfo(d,w,A){Oe.textContent=w,Ee.textContent=A,Y.classList.add("is-visible")}}),Y=document.createElement("div");Y.className="view-info-overlay",Y.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(Y);const Oe=Y.querySelector(".view-info-overlay__title"),Ee=Y.querySelector(".view-info-overlay__text"),me=Y.querySelector(".view-info-overlay__close");Y.addEventListener("click",d=>{d.target===Y&&Y.classList.remove("is-visible")}),me.addEventListener("click",()=>{Y.classList.remove("is-visible")});const C=document.createElement("div");C.className="display-chrome__top-center is-hidden",x.appendChild(C);const P=document.createElement("div");P.className="display-chrome__top-right",x.appendChild(P);const H=oo(P);function W(){N=!r.matches,rt(P,N),N&&(et(I),S&&_.frames.length===0&&E>0&&Is(S,E))}W(),r.addEventListener("change",W);const K=document.createElement("div");K.className="display-chrome__center-status",K.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,x.appendChild(K);const Ie=Xo();k.setPlaybackRate(Ie);const fe=document.createElement("div");fe.className="display-chrome__bottom",x.appendChild(fe);const Q=so(fe,{onChange(d){Ve(d)},onTogglePlay:ks,onAudioToggle:la,onSpeedChange:ca,onSummaryClick:oa,onScrubStart(){oe(),ve()},onScrubEnd(){Pe(),k.isPaused()||Ne()},initialSpeed:Ie});Q.setPlaying(!k.isPaused()),Q.setAudioVisible(!1),Q.setMuted(b),O.addEventListener("loadedmetadata",()=>{mt(!0),Te()});let we=null,U=null,J=null,re=!1,Z=null,D=0;function Ne(){if(we!==null)return;function d(){const w=k.getPlaybackFraction();Q.setPosition(w),k.isPaused()?we=null:we=requestAnimationFrame(d)}we=requestAnimationFrame(d)}function ve(){we!==null&&(cancelAnimationFrame(we),we=null)}function Ve(d){U=d,J===null&&(J=requestAnimationFrame(()=>{if(J=null,U===null)return;const w=U;U=null,k.seekToFraction(w),mt(!0)}))}function We(){if(U===null)return;J!==null&&(cancelAnimationFrame(J),J=null);const d=U;U=null,k.seekToFraction(d),mt(!0)}function Ue(){Z!==null&&(window.clearTimeout(Z),Z=null)}function Ce(){if(!(y!=null&&y.views))return[];const d=ht(o,y);return Object.entries(y.views).filter(([w])=>w!==d).map(([,w])=>Ye(w)).filter(Boolean)}function Ze(){Ue(),k.suspendPrewarming()}function V(d=Ol){Ue(),!(re||k.isPaused())&&(Z=window.setTimeout(()=>{Z=null,!(re||k.isPaused())&&(k.resumePrewarming(),k.prewarmSources(Ce()))},Math.max(0,d)))}function oe(){re=!0,D=0,Ze(),Te()}function Pe(){re=!1,D=0,We(),I=k.getPlaybackFraction()*k.getDurationSeconds(),et(I),V(),Te()}k.onPlayStateChange(d=>{Q.setPlaying(!d),d?(ve(),Ze()):(Ne(),V(0)),Te()}),k.onTimeUpdate(d=>{if(I=d*k.getDurationSeconds(),re){const w=performance.now();if(w-D<Pl)return;D=w}et(I),mt()});const Ae=document.createElement("div");Ae.className="overlay-layer",n.appendChild(Ae);const xe=Hi();xe.infoButton.classList.add("is-hidden"),xe.infoButton.hidden=!0,n.appendChild(xe.infoButton),n.appendChild(xe.infoModal);const le=Po(Ae,{onReplay:ra,onParameters:()=>Ot("parameters"),onHome:An,showHome:!t.lockedScaleId});k.onEnded(()=>{c=!0,u+=1;const d=k.captureFrame();le.update(o,Re(),k.getDurationSeconds(),f,d,u),le.show(),Te()});const T=go(Ae,s,d=>{Ss(d),Ot("parameters")}),B=Go(Ae,{simClass:o,values:Re(),theme:l,advancedSettings:t,availableScales:yt,onValuesChange:sa,onThemeChange:Cn,onRun:()=>{he("Parameters submitted — starting run",{simClassId:o.id}),ua().catch(d=>{Je("Run failed to start",{simClassId:o.id,error:d instanceof Error?d.message:String(d)})})},onResetGalaxyChecklist:()=>{le.resetGalaxyChecklist()},onApplySettings:ia,onClose:aa,initialView:"parameters"});B.setBackVisible(!t.lockedScaleId);const pe=zo(Ae);Q.setPosition(0),et(),le.hide();const ee=new WeakMap,Le=d=>{const w=ee.get(d);w&&(clearTimeout(w),ee.delete(d)),d.classList.remove("side-collapsed")},it=d=>{const w=ee.get(d);w&&clearTimeout(w),ee.set(d,setTimeout(()=>{d.classList.add("side-collapsed"),ee.delete(d)},2500))},Ln=d=>{const w=ee.get(d);w&&(clearTimeout(w),ee.delete(d)),d.classList.add("side-collapsed")},Nn=(d,w)=>{const A=w.isCollapsible??(()=>!0);d.addEventListener("mouseenter",()=>Le(d)),d.addEventListener("mouseleave",()=>{if(!A()){Le(d);return}it(d)}),d.addEventListener("focusin",()=>Le(d)),d.addEventListener("focusout",R=>{if(!d.contains(R.relatedTarget)){if(!A()){Le(d);return}it(d)}}),d.addEventListener("click",()=>{if(!A()){Le(d);return}if(d.classList.contains("side-collapsed")){Le(d),it(d);return}w.toggleOnClick?Ln(d):it(d)}),A()?Ln(d):Le(d)};Nn(q,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode==="display"}),Nn(ce,{toggleOnClick:!0}),Nn(fe,{toggleOnClick:!1});let Mt=0,ft=null,Xt=0;const vs=()=>{ft!==null&&(cancelAnimationFrame(ft),ft=null)},_s=()=>{if(ft!==null)return;Xt=k.getPlaybackFraction();const d=()=>{if(Mt===0){vs();return}const A=12*(1/60)/Math.max(k.getDurationSeconds(),1);Xt=Math.max(0,Math.min(1,Xt+Mt*A)),k.seekToFraction(Xt),ft=requestAnimationFrame(d)};ft=requestAnimationFrame(d)};document.addEventListener("keydown",d=>{if(n.dataset.mode==="display"&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement))switch(d.key){case"Escape":d.preventDefault(),Y.classList.contains("is-visible")?Y.classList.remove("is-visible"):An();break;case" ":d.preventDefault(),ks();break;case"ArrowLeft":d.preventDefault(),Le(fe),it(fe),Mt=-1,_s();break;case"ArrowRight":d.preventDefault(),Le(fe),it(fe),Mt=1,_s();break;case"ArrowUp":case"ArrowDown":{if(d.preventDefault(),Le(ce),it(ce),!(y!=null&&y.views)||Object.keys(y.views).length<=1)break;const w=o.views.filter(ge=>{var _e;return((_e=y==null?void 0:y.views)==null?void 0:_e[ge.id])!==void 0});if(w.length<=1)break;const A=y.viewId??ht(o,y),R=w.findIndex(ge=>ge.id===A),te=d.key==="ArrowUp"?(R-1+w.length)%w.length:(R+1)%w.length;Es(w[te].id);break}}}),document.addEventListener("keyup",d=>{(d.key==="ArrowLeft"||d.key==="ArrowRight")&&(Mt=0,vs())}),k.hideMedia(),k.pause(),at(t.lockedScaleId?"config":"entry");function Ss(d){d.id===o.id&&L||(o=d,Mn(),Cn(zn[d.id]),B.setSimulation(o,Re()),Q.setPosition(0),et(),Zt(),Tn())}function sa(d){F[o.id]={...d},he("Parameter values updated",{simClassId:o.id,values:F[o.id]}),et()}function Cn(d){l=d,Un(d),B.setTheme(d)}function Ot(d){d==="parameters"&&B.setSimulation(o,Re()),B.setView(d),at("config")}function ia(d){if(La(d),L){le.hide(),at("display");return}B.setSimulation(o,Re()),B.setView("parameters")}function aa(){if(le.hide(),!L&&t.lockedScaleId){B.setSimulation(o,Re()),B.setView("parameters");return}at(L?"display":"entry")}function An(){t.lockedScaleId||(he("Returning to home screen",{simClassId:o.id}),Mn(),L=!1,k.hideMedia(),at("entry"))}function ra(){c=!1,le.hide(),k.getPlaybackFraction()>=.999&&(k.resetPlayback(),mt(!0)),Wn(k),Te()}function oa(){c=!0,u+=1,k.pause();const d=f?k.captureFrame():null;le.update(o,Re(),k.getDurationSeconds(),f,d,u),le.show(),Te()}function ks(){k.isPaused()?Wn(k):k.pause()}function la(){b=!b,Te()}function ca(d){k.setPlaybackRate(d),Zo(d),Q.setSpeed(d)}async function ua(){const d=Re(),w=a.start();E=w,he("Run requested",{simClassId:o.id,values:d,manifestSource:i.getSource()});const A=await i.findNearestVideo(o.id,o.parameters,d);if(!a.isCurrent(w))return;Mn({preserveRunRequest:!0}),y=A;const R=ht(o,A),te=eo(i.getSource());Ll({simulationId:o.id,parameters:d,manifestSource:i.getSource(),matchedRunId:A.runId,assetHostMode:te.mode,assetHostBase:te.base});const ge=wa(A,R)??A.url,_e=Object.entries(A.views??{}).filter(([De])=>De!==R).map(([,De])=>De);S=A.liveDataUrl,Is(A.liveDataUrl,w),ya(A.summaryUrl,w),_a(A.summaryUrl,w,A.audioUrl),k.setMuted(!0),Zt(R),Pt(),at("initializing");const en=da(ge);k.resumePrewarming(),k.prewarmSources(_e);const xt=(async()=>{const De=await en;a.isCurrent(w)&&(he(`Prepared active video source: ${De.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:ge,waitsForBuffer:De.shouldWaitForBuffer}),k.setSource(De.src,{ownedObjectUrl:De.ownedObjectUrl}),k.pause(),await k.waitForLoadedData(Tl),a.isCurrent(w)&&De.shouldWaitForBuffer&&await k.waitForBufferedAhead(Cl,Al))})();await new Promise(De=>{pe.show(al(o),De,xt,{minTerminalTimeMs:Ea()})}),a.isCurrent(w)&&(L=!0,k.showMedia(),Wn(k),at("display"),Te())}async function da(d){const w=Ye(d),A=await fa(d);if(A!==null&&A>0&&A<=Zs){he("Downloading active video behind loading overlay",{videoUrl:w,contentLength:A});try{const R=await nt(d);if(!R.ok)throw new Error(`Failed to download active video: ${w}`);const te=await R.blob();return he(`Active video full fetch complete: ${te.size} bytes`,{videoUrl:Ye(d),blobType:te.type}),{src:URL.createObjectURL(te),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(R){Je(`Full-fetch FAILED; falling back to progressive: ${R instanceof Error?R.message:String(R)}`,{videoUrl:d})}}return A!==null?he("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:d,contentLength:A,fullFetchMaxBytes:Zs}):he("Could not determine active video size; using progressive load",{videoUrl:d}),he("Using progressive active video load",{videoUrl:d}),{src:Ye(d),ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function fa(d){try{const w=await nt(d,{headers:{Range:"bytes=0-0"}});he("Probed active video size with range request",{videoUrl:d,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const A=ma(w.headers.get("Content-Length"));if(A!==null)return A;const R=ha(w.headers.get("Content-Range"));return R!==null?R:null}catch(w){return Je("Could not probe active video size",{videoUrl:d,error:w instanceof Error?w.message:String(w)}),null}}function ha(d){if(!d)return null;const w=d.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const A=Number(w[1]);return Number.isFinite(A)&&A>0?A:null}function ma(d){if(!d)return null;const w=Number(d);return Number.isFinite(w)?w:null}function at(d){if(n.dataset.mode=d,d==="entry"?document.documentElement.setAttribute("data-theme","glass"):d==="display"&&Un(l),rt(x,d==="display"||d==="config"),rt(de,d==="display"||d==="entry"),rt(q,d==="entry"||d==="config"||d==="display"),rt(xe.infoButton,d==="config"&&!!t.lockedScaleId),(d!=="config"||!t.lockedScaleId)&&xe.close(),d!=="display"?Le(q):Ln(q),d==="entry"&&!t.lockedScaleId?T.show():T.hide(),d==="config"?(pe.hide(),B.setSimulation(o,Re()),B.show()):B.hide(),d!=="display")le.hide(),ue.hide(),C.classList.add("is-hidden"),C.innerHTML="";else if(c){const A=k.captureFrame();le.update(o,Re(),k.getDurationSeconds(),f,A,u),le.show()}else Zt();!L||d==="initializing"?(k.hideMedia(),d==="initializing"&&k.pause()):k.showMedia(),d!=="initializing"&&pe.hide(),Tn(),Te()}function Tn(){if(n.dataset.mode==="entry"){rt(j,!0);return}const d=n.dataset.mode==="display",w=o.id==="galaxy";rt(j,d&&w)}function et(d=0){if(!N)return;const w=vl(_,d,k.getDurationSeconds()),A=ba(o,f,d,k.getDurationSeconds());H.update(o,Re(),{...w,...A})}function Zt(d){const w=o.views.filter(te=>{var ge;return((ge=y==null?void 0:y.views)==null?void 0:ge[te.id])!==void 0});if(w.length<=1){ue.hide(),C.classList.add("is-hidden");return}const A=d??ht(o,y),R=w.find(te=>te.id===A);ue.update(w,A),R?(C.classList.remove("is-hidden"),C.innerHTML=`<span class="viewport-title">${R.label??R.id}</span>`):C.classList.add("is-hidden")}function Mn(d={}){d.preserveRunRequest||(a.invalidate(),E=0),_=Dt,S=null,c=!1,f=null,y=null,I=0,re=!1,U=null,Ue(),J!==null&&(cancelAnimationFrame(J),J=null),le.hide(),ue.hide(),C.classList.add("is-hidden"),C.innerHTML="",k.pause(),O.pause(),k.clearPrewarmedSources(),k.resetPlayback(),Q.setPosition(0),Cs()}function Es(d){if(!(y!=null&&y.views)||d===ht(o,y))return;const w=Ye(y.views[d]);if(!w)return;y.viewId=d;const A=!k.isPaused()&&!c,R=c?0:k.getPlaybackFraction();c=!1,le.hide(),k.setSource(w,{seekFraction:R,autoplay:A}),k.prewarmSources(Ce()),A&&!re?V():Ze(),Zt(d),Pt(),Te(),Y.classList.remove("is-visible"),Tn()}function Re(){return{...F[o.id]}}function pa(d){return Object.fromEntries(d.parameters.map(w=>[w.id,ga(w)]))}function ga(d){if(d.logScale){const ge=Math.log10(d.min),_e=Math.log10(d.max);return 10**(ge+Math.random()*(_e-ge))}const w=Math.max(0,Math.round((d.max-d.min)/d.step)),A=Math.floor(Math.random()*(w+1)),R=d.min+A*d.step,te=Di(d.step);return Number(R.toFixed(te))}async function Is(d,w){if(!N){_=Dt;return}let A=Dt;try{A=await wl(d)}catch(R){Je("Failed to load live stats",{url:d,error:R instanceof Error?R.message:String(R)})}a.isCurrent(w)&&(_=A,et())}async function ya(d,w){const A=await ll(d);a.isCurrent(w)&&(f=A,et(I))}function ba(d,w,A,R){if(!w||!Number.isFinite(R)||R<=0)return{};const te=Math.max(0,Math.min(1,A/R)),ge={};for(const _e of d.metadata.liveStats){if(!_e.live||!_e.fromVideo||!_e.scaleWithTime)continue;const en=_e.videoKey??_e.id,xt=w[en];if(typeof xt!="number"||!Number.isFinite(xt))continue;const On=xt*te;ge[_e.id]=_e.integer?String(Math.floor(On)):String(On)}return ge}function rt(d,w){d.hidden=!w,d.classList.toggle("is-hidden",!w)}function ht(d,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function wa(d,w){return!w||!d.views?null:d.views[w]??null}function Ls(){const d=ht(o,y);return d?o.views.some(w=>w.id===d&&w.audio):!1}function va(d,w){return w||d.replace(/run_summary\.yaml($|\?)/,"audio_track.wav$1")}async function _a(d,w,A){const R=va(d,A),te=Ye(R);if(v.has(te)){Ns(te);return}const ge=++g,_e=await Sa(R);if(!(!a.isCurrent(w)||ge!==g)){if(!_e){Cs();return}v.add(te),Ns(te)}}function Ns(d){p=d,h=!0,O.src!==p&&(O.pause(),O.src=p,O.load()),Pt(),Te()}async function Sa(d){try{if((await nt(d,{method:"HEAD"})).ok)return!0}catch{}try{return(await nt(d,{headers:{Range:"bytes=0-0"}})).ok}catch{return!1}}function Cs(){g+=1,p=null,h=!1,O.pause(),O.removeAttribute("src"),O.load(),Pt()}function ka(){b=t.audioMutedByDefault,m=t.defaultAudioVolume,O.muted=b,O.volume=m,Q.setMuted(b)}function Pt(){Q.setAudioVisible(Ls()&&h&&!!p),Q.setMuted(b)}function mt(d=!1){if(!h||!Number.isFinite(O.duration)||O.duration<=0)return;const w=Math.max(0,Math.min(O.duration,k.getPlaybackFraction()*O.duration));(d||Math.abs(O.currentTime-w)>.35)&&(O.currentTime=w)}function Te(){const d=Ls()&&h&&!!p;if(Pt(),O.muted=b,O.volume=m,!d){O.pause();return}if(mt(),n.dataset.mode!=="display"||k.isPaused()||c||re){O.pause();return}O.play().catch(()=>{b=!0,O.muted=!0,Q.setMuted(!0)})}function As(d){const w=new Set(Yo(d,e));return yt.filter(A=>w.has(A.id))}function Ts(d){return d?yt.find(w=>w.id===d)??null:null}function Ea(){return i.getSource()!=="local"?ss.MIN_TERMINAL_TIME_MS:Ia(ss.MIN_TERMINAL_TIME_MS,Ml)}function Ia(d,w){const A=Math.ceil(Math.min(d,w)),R=Math.floor(Math.max(d,w));return Math.floor(Math.random()*(R-A+1))+A}function La(d){const w=o.id,A=t.manifestSource;t=Ko(d,e),Qs(t.verboseLogging),s=As(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),be.setHomeVisible(!t.lockedScaleId),le.setHomeVisible(!t.lockedScaleId),T.setSimulationClasses(s),B.setAdvancedSettings(t),B.setBackVisible(!t.lockedScaleId),he("Advanced settings updated",t),ka(),Te(),A!==t.manifestSource&&(y=null);const R=Ts(t.lockedScaleId);R&&(Ss(R),R.id!==w&&(L=!1,k.hideMedia(),B.setView("parameters")),L||(Cn(zn[R.id]),B.setSimulation(o,Re())))}}function $l(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Rl(n)}$l();
//# sourceMappingURL=main-D2GwA0uC.js.map
