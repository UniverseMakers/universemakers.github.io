(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Mn=Symbol.for("yaml.alias"),_n=Symbol.for("yaml.document"),xe=Symbol.for("yaml.map"),vs=Symbol.for("yaml.pair"),Ae=Symbol.for("yaml.scalar"),rt=Symbol.for("yaml.seq"),Se=Symbol.for("yaml.node.type"),qe=n=>!!n&&typeof n=="object"&&n[Se]===Mn,jt=n=>!!n&&typeof n=="object"&&n[Se]===_n,St=n=>!!n&&typeof n=="object"&&n[Se]===xe,Q=n=>!!n&&typeof n=="object"&&n[Se]===vs,j=n=>!!n&&typeof n=="object"&&n[Se]===Ae,kt=n=>!!n&&typeof n=="object"&&n[Se]===rt;function z(n){if(n&&typeof n=="object")switch(n[Se]){case xe:case rt:return!0}return!1}function J(n){if(n&&typeof n=="object")switch(n[Se]){case Mn:case xe:case Ae:case rt:return!0}return!1}const _s=n=>(j(n)||z(n))&&!!n.anchor,Ue=Symbol("break visit"),Vi=Symbol("skip children"),yt=Symbol("remove node");function ot(n,e){const t=Ui(e);jt(n)?Xe(null,n.contents,t,Object.freeze([n]))===yt&&(n.contents=null):Xe(null,n,t,Object.freeze([]))}ot.BREAK=Ue;ot.SKIP=Vi;ot.REMOVE=yt;function Xe(n,e,t,s){const i=Di(n,e,t,s);if(J(i)||Q(i))return Hi(n,s,i),Xe(n,i,t,s);if(typeof i!="symbol"){if(z(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=Xe(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Ue)return Ue;r===yt&&(e.items.splice(a,1),a-=1)}}}else if(Q(e)){s=Object.freeze(s.concat(e));const a=Xe("key",e.key,t,s);if(a===Ue)return Ue;a===yt&&(e.key=null);const r=Xe("value",e.value,t,s);if(r===Ue)return Ue;r===yt&&(e.value=null)}}return i}function Ui(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Di(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(St(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(kt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(Q(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(j(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(qe(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function Hi(n,e,t){const s=e[e.length-1];if(z(s))s.items[n]=t;else if(Q(s))n==="key"?s.key=t:s.value=t;else if(jt(s))s.contents=t;else{const i=qe(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const ji={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ki=n=>n.replace(/[!,[\]{}]/g,e=>ji[e]);class ue{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},ue.defaultYaml,e),this.tags=Object.assign({},ue.defaultTags,t)}clone(){const e=new ue(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new ue(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:ue.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},ue.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:ue.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},ue.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ki(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&J(e.contents)){const a={};ot(e.contents,(r,o)=>{J(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}ue.defaultYaml={explicit:!1,version:"1.2"};ue.defaultTags={"!!":"tag:yaml.org,2002:"};function Ss(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function ks(n){const e=new Set;return ot(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Es(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function qi(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=ks(n));const r=Es(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(j(r.node)||z(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function Ze(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=Ze(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=Ze(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=Ze(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=Ze(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function _e(n,e,t){if(Array.isArray(n))return n.map((s,i)=>_e(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!_s(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class On{constructor(e){Object.defineProperty(this,Se,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!jt(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=_e(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?Ze(a,{"":o},"",o):o}}class Pn extends On{constructor(e){super(Mn),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],ot(e,{Node:(a,r)=>{(qe(r)||_s(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(_e(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=$t(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Ss(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function $t(n,e,t){if(qe(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(z(e)){let s=0;for(const i of e.items){const a=$t(n,i,t);a>s&&(s=a)}return s}else if(Q(e)){const s=$t(n,e.key,t),i=$t(n,e.value,t);return Math.max(s,i)}return 1}const Is=n=>!n||typeof n!="function"&&typeof n!="object";class P extends On{constructor(e){super(Ae),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:_e(this.value,e,t)}toString(){return String(this.value)}}P.BLOCK_FOLDED="BLOCK_FOLDED";P.BLOCK_LITERAL="BLOCK_LITERAL";P.PLAIN="PLAIN";P.QUOTE_DOUBLE="QUOTE_DOUBLE";P.QUOTE_SINGLE="QUOTE_SINGLE";const Wi="tag:yaml.org,2002:";function Yi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function wt(n,e,t){var d,p,m;if(jt(n)&&(n=n.contents),J(n))return n;if(Q(n)){const y=(p=(d=t.schema[xe]).createNode)==null?void 0:p.call(d,t.schema,null,t);return y.items.push(n),y}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new Pn(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=Wi+e.slice(2));let l=Yi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const y=new P(n);return c&&(c.node=y),y}l=n instanceof Map?r[xe]:Symbol.iterator in Object(n)?r[rt]:r[xe]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((m=l==null?void 0:l.nodeClass)==null?void 0:m.from)=="function"?l.nodeClass.from(t.schema,n,t):new P(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function Vt(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return wt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const pt=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Ls extends On{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>J(s)||Q(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(pt(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(z(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Vt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(z(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&j(a)?a.value:a:z(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!Q(t))return!1;const s=t.value;return s==null||e&&j(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return z(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(z(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Vt(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Gi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Ce(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const He=(n,e,t)=>n.endsWith(`
`)?Ce(t,e):t.includes(`
`)?`
`+Ce(t,e):(n.endsWith(" ")?"":" ")+t,Ns="flow",Sn="block",xt="quoted";function Kt(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):d=i-s);let p,m,y=!1,g=-1,h=-1,b=-1;t===Sn&&(g=Zn(n,g,e.length),g!==-1&&(d=g+c));for(let k;k=n[g+=1];){if(t===xt&&k==="\\"){switch(h=g,n[g+1]){case"x":g+=3;break;case"u":g+=5;break;case"U":g+=9;break;default:g+=1}b=g}if(k===`
`)t===Sn&&(g=Zn(n,g,e.length)),d=g+e.length+c,p=void 0;else{if(k===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const _=n[g+1];_&&_!==" "&&_!==`
`&&_!=="	"&&(p=g)}if(g>=d)if(p)l.push(p),d=p+c,p=void 0;else if(t===xt){for(;m===" "||m==="	";)m=k,k=n[g+=1],y=!0;const _=g>b+1?g-2:h-1;if(u[_])return n;l.push(_),u[_]=!0,d=_+c,p=void 0}else y=!0}m=k}if(y&&o&&o(),l.length===0)return n;r&&r();let v=n.slice(0,l[0]);for(let k=0;k<l.length;++k){const _=l[k],E=l[k+1]||n.length;_===0?v=`
${e}${n.slice(0,E)}`:(t===xt&&u[_]&&(v+=`${n[_]}\\`),v+=`
${e}${n.slice(_+1,E)}`)}return v}function Zn(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const qt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Wt=n=>/^(%|---|\.\.\.)/m.test(n);function zi(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function bt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(Wt(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:Kt(r,a,xt,qt(e,!1))}function kn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return bt(n,e);const t=e.indent||(Wt(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Kt(s,t,Ns,qt(e,!1))}function et(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=bt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=kn:a&&!i?s=bt:s=t?kn:bt}return s(n,e)}let En;try{En=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{En=/\n+(?!\n|$)/g}function Ft({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return et(t,s);const l=s.indent||(s.forceBlockIndent||Wt(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===P.BLOCK_FOLDED?!1:e===P.BLOCK_LITERAL?!0:!zi(t,c,l.length);if(!t)return u?`|
`:`>
`;let d,p;for(p=t.length;p>0;--p){const E=t[p-1];if(E!==`
`&&E!=="	"&&E!==" ")break}let m=t.substring(p);const y=m.indexOf(`
`);y===-1?d="-":t===m||y!==m.length-1?(d="+",a&&a()):d="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(En,`$&${l}`));let g=!1,h,b=-1;for(h=0;h<t.length;++h){const E=t[h];if(E===" ")g=!0;else if(E===`
`)b=h;else break}let v=t.substring(0,b<h?b+1:h);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${l}`));let _=(g?l?"2":"1":"")+d;if(n&&(_+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const E=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let I=!1;const A=qt(s,!0);r!=="folded"&&e!==P.BLOCK_FOLDED&&(A.onOverflow=()=>{I=!0});const S=Kt(`${v}${E}${m}`,l,Sn,A);if(!I)return`>${_}
${l}${S}`}return t=t.replace(/\n+/g,`$&${l}`),`|${_}
${l}${v}${t}${m}`}function Ji(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return et(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?et(a,e):Ft(n,e,t,s);if(!o&&!u&&i!==P.PLAIN&&a.includes(`
`))return Ft(n,e,t,s);if(Wt(a)){if(c==="")return e.forceBlockIndent=!0,Ft(n,e,t,s);if(o&&c===l)return et(a,e)}const d=a.replace(/\n+/g,`$&
${c}`);if(r){const p=g=>{var h;return g.default&&g.tag!=="tag:yaml.org,2002:str"&&((h=g.test)==null?void 0:h.test(d))},{compat:m,tags:y}=e.doc.schema;if(y.some(p)||m!=null&&m.some(p))return et(a,e)}return o?d:Kt(d,c,Ns,qt(e,!1))}function Rn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==P.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=P.QUOTE_DOUBLE);const c=u=>{switch(u){case P.BLOCK_FOLDED:case P.BLOCK_LITERAL:return i||a?et(r.value,e):Ft(r,e,t,s);case P.QUOTE_DOUBLE:return bt(r.value,e);case P.QUOTE_SINGLE:return kn(r.value,e);case P.PLAIN:return Ji(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:d}=e.options,p=i&&u||d;if(l=c(p),l===null)throw new Error(`Unsupported default string type ${p}`)}return l}function As(n,e){const t=Object.assign({blockQuote:!0,commentString:Gi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Qi(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(j(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Xi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(j(n)||z(n))&&n.anchor;a&&Ss(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function it(n,e,t,s){var c;if(Q(n))return n.toString(e,t,s);if(qe(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=J(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=Qi(e.doc.schema.tags,a));const r=Xi(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):j(a)?Rn(a,e,t,s):a.toString(e,t,s);return r?j(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function Zi({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:d}}=t;let p=J(n)&&n.comment||null;if(d){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(z(n)||!J(n)&&typeof n=="object"){const A="With simple keys, collection cannot be used as a key value";throw new Error(A)}}let m=!d&&(!n||p&&e==null&&!t.inFlow||z(n)||(j(n)?n.type===P.BLOCK_FOLDED||n.type===P.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(d||!a),indent:o+c});let y=!1,g=!1,h=it(n,t,()=>y=!0,()=>g=!0);if(!m&&!t.inFlow&&h.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(a||e==null)return y&&s&&s(),h===""?"?":m?`? ${h}`:h}else if(a&&!d||e==null&&m)return h=`? ${h}`,p&&!y?h+=He(h,t.indent,l(p)):g&&i&&i(),h;y&&(p=null),m?(p&&(h+=He(h,t.indent,l(p))),h=`? ${h}
${o}:`):(h=`${h}:`,p&&(h+=He(h,t.indent,l(p))));let b,v,k;J(e)?(b=!!e.spaceBefore,v=e.commentBefore,k=e.comment):(b=!1,v=null,k=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!m&&!p&&j(e)&&(t.indentAtStart=h.length+1),g=!1,!u&&c.length>=2&&!t.inFlow&&!m&&kt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let _=!1;const E=it(e,t,()=>_=!0,()=>g=!0);let I=" ";if(p||b||v){if(I=b?`
`:"",v){const A=l(v);I+=`
${Ce(A,t.indent)}`}E===""&&!t.inFlow?I===`
`&&k&&(I=`

`):I+=`
${t.indent}`}else if(!m&&z(e)){const A=E[0],S=E.indexOf(`
`),C=S!==-1,O=t.inFlow??e.flow??e.items.length===0;if(C||!O){let V=!1;if(C&&(A==="&"||A==="!")){let B=E.indexOf(" ");A==="&"&&B!==-1&&B<S&&E[B+1]==="!"&&(B=E.indexOf(" ",B+1)),(B===-1||S<B)&&(V=!0)}V||(I=`
${t.indent}`)}}else(E===""||E[0]===`
`)&&(I="");return h+=I+E,t.inFlow?_&&s&&s():k&&!_?h+=He(h,t.indent,l(k)):g&&i&&i(),h}function Ts(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Ct="<<",Oe={identify:n=>n===Ct||typeof n=="symbol"&&n.description===Ct,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new P(Symbol(Ct)),{addToJSMap:Cs}),stringify:()=>Ct},ea=(n,e)=>(Oe.identify(e)||j(e)&&(!e.type||e.type===P.PLAIN)&&Oe.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Oe.tag&&t.default));function Cs(n,e,t){if(t=n&&qe(t)?t.resolve(n.doc):t,kt(t))for(const s of t.items)on(n,e,s);else if(Array.isArray(t))for(const s of t)on(n,e,s);else on(n,e,t)}function on(n,e,t){const s=n&&qe(t)?t.resolve(n.doc):t;if(!St(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function Ms(n,e,{key:t,value:s}){if(J(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(ea(n,t))Cs(n,e,s);else{const i=_e(t,"",n);if(e instanceof Map)e.set(i,_e(s,i,n));else if(e instanceof Set)e.add(i);else{const a=ta(t,i,n),r=_e(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function ta(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(J(n)&&(t!=null&&t.doc)){const s=As(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),Ts(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function $n(n,e,t){const s=wt(n,void 0,t),i=wt(e,void 0,t);return new de(s,i)}class de{constructor(e,t=null){Object.defineProperty(this,Se,{value:vs}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return J(t)&&(t=t.clone(e)),J(s)&&(s=s.clone(e)),new de(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return Ms(t,s,this)}toString(e,t,s){return e!=null&&e.doc?Zi(this,e,t,s):JSON.stringify(this)}}function Os(n,e,t){return(e.inFlow??n.flow?sa:na)(n,e,t)}function na({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const p=[];for(let y=0;y<e.length;++y){const g=e[y];let h=null;if(J(g))!d&&g.spaceBefore&&p.push(""),Ut(t,p,g.commentBefore,d),g.comment&&(h=g.comment);else if(Q(g)){const v=J(g.key)?g.key:null;v&&(!d&&v.spaceBefore&&p.push(""),Ut(t,p,v.commentBefore,d))}d=!1;let b=it(g,u,()=>h=null,()=>d=!0);h&&(b+=He(b,a,l(h))),d&&h&&(d=!1),p.push(s+b)}let m;if(p.length===0)m=i.start+i.end;else{m=p[0];for(let y=1;y<p.length;++y){const g=p[y];m+=g?`
${c}${g}`:`
`}}return n?(m+=`
`+Ce(l(n),c),o&&o()):d&&r&&r(),m}function sa({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const d=[];for(let y=0;y<n.length;++y){const g=n[y];let h=null;if(J(g))g.spaceBefore&&d.push(""),Ut(e,d,g.commentBefore,!1),g.comment&&(h=g.comment);else if(Q(g)){const v=J(g.key)?g.key:null;v&&(v.spaceBefore&&d.push(""),Ut(e,d,v.commentBefore,!1),v.comment&&(l=!0));const k=J(g.value)?g.value:null;k?(k.comment&&(h=k.comment),k.commentBefore&&(l=!0)):g.value==null&&(v!=null&&v.comment)&&(h=v.comment)}h&&(l=!0);let b=it(g,c,()=>h=null);l||(l=d.length>u||b.includes(`
`)),y<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=d.reduce((v,k)=>v+k.length+2,2)+(b.length+2)>e.options.lineWidth)),l&&(b+=",")),h&&(b+=He(b,s,o(h))),d.push(b),u=d.length}const{start:p,end:m}=t;if(d.length===0)return p+m;if(!l){const y=d.reduce((g,h)=>g+h.length+2,2);l=e.options.lineWidth>0&&y>e.options.lineWidth}if(l){let y=p;for(const g of d)y+=g?`
${a}${i}${g}`:`
`;return`${y}
${i}${m}`}else return`${p}${r}${d.join(" ")}${r}${m}`}function Ut({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=Ce(e(s),n);t.push(a.trimStart())}}function je(n,e){const t=j(e)?e.value:e;for(const s of n)if(Q(s)&&(s.key===e||s.key===t||j(s.key)&&s.key.value===t))return s}class ve extends Ls{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(xe,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push($n(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;Q(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new de(e,e==null?void 0:e.value):s=new de(e.key,e.value);const i=je(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);j(i.value)&&Is(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=je(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=je(this.items,e),i=s==null?void 0:s.value;return(!t&&j(i)?i.value:i)??void 0}has(e){return!!je(this.items,e)}set(e,t){this.add(new de(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)Ms(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!Q(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Os(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const lt={collection:"map",default:!0,nodeClass:ve,tag:"tag:yaml.org,2002:map",resolve(n,e){return St(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>ve.from(n,e,t)};class Ke extends Ls{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(rt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Mt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Mt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&j(i)?i.value:i}has(e){const t=Mt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Mt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];j(i)&&Is(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(_e(a,String(i++),t));return s}toString(e,t,s){return e?Os(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(wt(o,void 0,s))}}return a}}function Mt(n){let e=j(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ct={collection:"seq",default:!0,nodeClass:Ke,tag:"tag:yaml.org,2002:seq",resolve(n,e){return kt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Ke.from(n,e,t)},Yt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),Rn(n,e,t,s)}},Gt={identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new P(null),stringify:({source:n},e)=>typeof n=="string"&&Gt.test.test(n)?n:e.options.nullStr},xn={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new P(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&xn.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function Le({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const Ps={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Le},Rs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Le(n)}},$s={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new P(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Le},zt=n=>typeof n=="bigint"||Number.isInteger(n),Fn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function xs(n,e,t){const{value:s}=n;return zt(s)&&s>=0?t+s.toString(e):Le(n)}const Fs={identify:n=>zt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Fn(n,2,8,t),stringify:n=>xs(n,8,"0o")},Bs={identify:zt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Fn(n,0,10,t),stringify:Le},Vs={identify:n=>zt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Fn(n,2,16,t),stringify:n=>xs(n,16,"0x")},ia=[lt,ct,Yt,Gt,xn,Fs,Bs,Vs,Ps,Rs,$s];function es(n){return typeof n=="bigint"||Number.isInteger(n)}const Ot=({value:n})=>JSON.stringify(n),aa=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Ot},{identify:n=>n==null,createNode:()=>new P(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Ot},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Ot},{identify:es,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>es(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Ot}],ra={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},oa=[lt,ct].concat(aa,ra),Bn={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=P.BLOCK_LITERAL),e!==P.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let d=0,p=0;d<l;++d,p+=c)u[d]=o.substr(p,c);o=u.join(e===P.BLOCK_LITERAL?`
`:" ")}return Rn({comment:n,type:e,value:o},s,i,a)}};function Us(n,e){if(kt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!Q(s)){if(St(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new de(new P(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=Q(s)?s:new de(s)}}else e("Expected a sequence for this tag");return n}function Ds(n,e,t){const{replacer:s}=t,i=new Ke(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push($n(o,c,t))}return i}const Vn={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Us,createNode:Ds};class nt extends Ke{constructor(){super(),this.add=ve.prototype.add.bind(this),this.delete=ve.prototype.delete.bind(this),this.get=ve.prototype.get.bind(this),this.has=ve.prototype.has.bind(this),this.set=ve.prototype.set.bind(this),this.tag=nt.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(Q(i)?(a=_e(i.key,"",t),r=_e(i.value,a,t)):a=_e(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=Ds(e,t,s),a=new this;return a.items=i.items,a}}nt.tag="tag:yaml.org,2002:omap";const Un={collection:"seq",identify:n=>n instanceof Map,nodeClass:nt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Us(n,e),s=[];for(const{key:i}of t.items)j(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new nt,t)},createNode:(n,e,t)=>nt.from(n,e,t)};function Hs({value:n,source:e},t){return e&&(n?js:Ks).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const js={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new P(!0),stringify:Hs},Ks={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new P(!1),stringify:Hs},la={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Le},ca={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():Le(n)}},ua={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new P(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:Le},Et=n=>typeof n=="bigint"||Number.isInteger(n);function Jt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function Dn(n,e,t){const{value:s}=n;if(Et(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return Le(n)}const da={identify:Et,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Jt(n,2,2,t),stringify:n=>Dn(n,2,"0b")},fa={identify:Et,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Jt(n,1,8,t),stringify:n=>Dn(n,8,"0")},ha={identify:Et,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Jt(n,0,10,t),stringify:Le},ma={identify:Et,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Jt(n,2,16,t),stringify:n=>Dn(n,16,"0x")};class st extends ve{constructor(e){super(e),this.tag=st.tag}add(e){let t;Q(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new de(e.key,null):t=new de(e,null),je(this.items,t.key)||this.items.push(t)}get(e,t){const s=je(this.items,e);return!t&&Q(s)?j(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=je(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new de(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push($n(r,null,s));return a}}st.tag="tag:yaml.org,2002:set";const Hn={collection:"map",identify:n=>n instanceof Set,nodeClass:st,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>st.from(n,e,t),resolve(n,e){if(St(n)){if(n.hasAllNullValues(!0))return Object.assign(new st,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function jn(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function qs(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return Le(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Ws={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>jn(n,t),stringify:qs},Ys={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>jn(n,!1),stringify:qs},Qt={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Qt.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let d=jn(u,!1);Math.abs(d)<30&&(d*=60),l-=6e4*d}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},ts=[lt,ct,Yt,Gt,js,Ks,da,fa,ha,ma,la,ca,ua,Bn,Oe,Un,Vn,Hn,Ws,Ys,Qt],ns=new Map([["core",ia],["failsafe",[lt,ct,Yt]],["json",oa],["yaml11",ts],["yaml-1.1",ts]]),ss={binary:Bn,bool:xn,float:$s,floatExp:Rs,floatNaN:Ps,floatTime:Ys,int:Bs,intHex:Vs,intOct:Fs,intTime:Ws,map:lt,merge:Oe,null:Gt,omap:Un,pairs:Vn,seq:ct,set:Hn,timestamp:Qt},pa={"tag:yaml.org,2002:binary":Bn,"tag:yaml.org,2002:merge":Oe,"tag:yaml.org,2002:omap":Un,"tag:yaml.org,2002:pairs":Vn,"tag:yaml.org,2002:set":Hn,"tag:yaml.org,2002:timestamp":Qt};function ln(n,e,t){const s=ns.get(e);if(s&&!n)return t&&!s.includes(Oe)?s.concat(Oe):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(ns.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Oe)),i.reduce((a,r)=>{const o=typeof r=="string"?ss[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(ss).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const ga=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class Kn{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?ln(e,"compat"):e?ln(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?pa:{},this.tags=ln(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,xe,{value:lt}),Object.defineProperty(this,Ae,{value:Yt}),Object.defineProperty(this,rt,{value:ct}),this.sortMapEntries=typeof r=="function"?r:r===!0?ga:null}clone(){const e=Object.create(Kn.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function ya(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=As(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(Ce(l,""))}let r=!1,o=null;if(n.contents){if(J(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(Ce(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=it(n.contents,i,()=>o=null,l);o&&(u+=He(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(it(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(Ce(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(Ce(a(l),"")))}return t.join(`
`)+`
`}class Xt{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Se,{value:_n});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new ue({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Xt.prototype,{[Se]:{value:_n}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=J(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Ge(this.contents)&&this.contents.add(e)}addIn(e,t){Ge(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=ks(this);e.anchor=!t||s.has(t)?Es(t||"a",s):t}return new Pn(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const h=v=>typeof v=="number"||v instanceof String||v instanceof Number,b=t.filter(h).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:d,setAnchors:p,sourceObjects:m}=qi(this,r||"a"),y={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:d,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:m},g=wt(e,u,y);return o&&z(g)&&(g.flow=!0),p(),g}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new de(i,a)}delete(e){return Ge(this.contents)?this.contents.delete(e):!1}deleteIn(e){return pt(e)?this.contents==null?!1:(this.contents=null,!0):Ge(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return z(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return pt(e)?!t&&j(this.contents)?this.contents.value:this.contents:z(this.contents)?this.contents.getIn(e,t):void 0}has(e){return z(this.contents)?this.contents.has(e):!1}hasIn(e){return pt(e)?this.contents!==void 0:z(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Vt(this.schema,[e],t):Ge(this.contents)&&this.contents.set(e,t)}setIn(e,t){pt(e)?this.contents=t:this.contents==null?this.contents=Vt(this.schema,Array.from(e),t):Ge(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ue({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ue({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new Kn(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=_e(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?Ze(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return ya(this,e)}}function Ge(n){if(z(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Gs extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class gt extends Gs{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class ba extends Gs{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const is=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function at(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,d="",p="",m=!1,y=!1,g=null,h=null,b=null,v=null,k=null,_=null,E=null;for(const S of n)switch(y&&(S.type!=="space"&&S.type!=="newline"&&S.type!=="comma"&&a(S.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),g&&(l&&S.type!=="comment"&&S.type!=="newline"&&a(g,"TAB_AS_INDENT","Tabs are not allowed as indentation"),g=null),S.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&S.source.includes("	")&&(g=S),u=!0;break;case"comment":{u||a(S,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const C=S.source.substring(1)||" ";d?d+=p+C:d=C,p="",l=!1;break}case"newline":l?d?d+=S.source:(!_||t!=="seq-item-ind")&&(c=!0):p+=S.source,l=!0,m=!0,(h||b)&&(v=S),u=!0;break;case"anchor":h&&a(S,"MULTIPLE_ANCHORS","A node can have at most one anchor"),S.source.endsWith(":")&&a(S.offset+S.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),h=S,E??(E=S.offset),l=!1,u=!1,y=!0;break;case"tag":{b&&a(S,"MULTIPLE_TAGS","A node can have at most one tag"),b=S,E??(E=S.offset),l=!1,u=!1,y=!0;break}case t:(h||b)&&a(S,"BAD_PROP_ORDER",`Anchors and tags must be after the ${S.source} indicator`),_&&a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.source} in ${e??"collection"}`),_=S,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){k&&a(S,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=S,l=!1,u=!1;break}default:a(S,"UNEXPECTED_TOKEN",`Unexpected ${S.type} token`),l=!1,u=!1}const I=n[n.length-1],A=I?I.offset+I.source.length:i;return y&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g&&(l&&g.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(g,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:_,spaceBefore:c,comment:d,hasNewline:m,anchor:h,tag:b,newlineAfterProp:v,end:A,start:E??A}}function vt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(vt(e.key)||vt(e.value))return!0}return!1;default:return!0}}function In(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&vt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function zs(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||j(a)&&j(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const as="All mapping items must start at the same column";function wa({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??ve,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const d of s.items){const{start:p,key:m,sep:y,value:g}=d,h=at(p,{indicator:"explicit-key-ind",next:m??(y==null?void 0:y[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),b=!h.found;if(b){if(m&&(m.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in m&&m.indent!==s.indent&&i(c,"BAD_INDENT",as)),!h.anchor&&!h.tag&&!y){l=h.end,h.comment&&(o.comment?o.comment+=`
`+h.comment:o.comment=h.comment);continue}(h.newlineAfterProp||vt(m))&&i(m??p[p.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=h.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",as);t.atKey=!0;const v=h.end,k=m?n(t,m,h,i):e(t,v,p,null,h,i);t.schema.compat&&In(s.indent,m,i),t.atKey=!1,zs(t,o.items,k)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const _=at(y??[],{indicator:"map-value-ind",next:g,offset:k.range[2],onError:i,parentIndent:s.indent,startOnNewline:!m||m.type==="block-scalar"});if(c=_.end,_.found){b&&((g==null?void 0:g.type)==="block-map"&&!_.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&h.start<_.found.offset-1024&&i(k.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const E=g?n(t,g,_,i):e(t,c,y,null,_,i);t.schema.compat&&In(s.indent,g,i),c=E.range[2];const I=new de(k,E);t.options.keepSourceTokens&&(I.srcToken=d),o.items.push(I)}else{b&&i(k.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),_.comment&&(k.comment?k.comment+=`
`+_.comment:k.comment=_.comment);const E=new de(k);t.options.keepSourceTokens&&(E.srcToken=d),o.items.push(E)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function va({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Ke,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:d}of s.items){const p=at(u,{indicator:"seq-item-ind",next:d,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||d)(d==null?void 0:d.type)==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=p.end,p.comment&&(o.comment=p.comment);continue}const m=d?n(t,d,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&In(s.indent,d,i),c=m.range[2],o.items.push(m)}return o.range=[s.offset,c,l??c],o}function It(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const cn="Block collections are not allowed within flow collections",un=n=>n&&(n.type==="block-map"||n.type==="block-seq");function _a({composeNode:n,composeEmptyNode:e},t,s,i,a){var h;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?ve:Ke),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let b=0;b<s.items.length;++b){const v=s.items[b],{start:k,key:_,sep:E,value:I}=v,A=at(k,{flow:o,indicator:"explicit-key-ind",next:_??(E==null?void 0:E[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!A.found){if(!A.anchor&&!A.tag&&!E&&!I){b===0&&A.comma?i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):b<s.items.length-1&&i(A.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),A.comment&&(l.comment?l.comment+=`
`+A.comment:l.comment=A.comment),d=A.end;continue}!r&&t.options.strict&&vt(_)&&i(_,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(b===0)A.comma&&i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(A.comma||i(A.start,"MISSING_CHAR",`Missing , between ${o} items`),A.comment){let S="";e:for(const C of k)switch(C.type){case"comma":case"space":break;case"comment":S=C.source.substring(1);break e;default:break e}if(S){let C=l.items[l.items.length-1];Q(C)&&(C=C.value??C.key),C.comment?C.comment+=`
`+S:C.comment=S,A.comment=A.comment.substring(S.length+1)}}if(!r&&!E&&!A.found){const S=I?n(t,I,A,i):e(t,A.end,E,null,A,i);l.items.push(S),d=S.range[2],un(I)&&i(S.range,"BLOCK_IN_FLOW",cn)}else{t.atKey=!0;const S=A.end,C=_?n(t,_,A,i):e(t,S,k,null,A,i);un(_)&&i(C.range,"BLOCK_IN_FLOW",cn),t.atKey=!1;const O=at(E??[],{flow:o,indicator:"map-value-ind",next:I,offset:C.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(O.found){if(!r&&!A.found&&t.options.strict){if(E)for(const x of E){if(x===O.found)break;if(x.type==="newline"){i(x,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}A.start<O.found.offset-1024&&i(O.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else I&&("source"in I&&((h=I.source)==null?void 0:h[0])===":"?i(I,"MISSING_CHAR",`Missing space after : in ${o}`):i(O.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const V=I?n(t,I,O,i):O.found?e(t,O.end,E,null,O,i):null;V?un(I)&&i(V.range,"BLOCK_IN_FLOW",cn):O.comment&&(C.comment?C.comment+=`
`+O.comment:C.comment=O.comment);const B=new de(C,V);if(t.options.keepSourceTokens&&(B.srcToken=v),r){const x=l;zs(t,x.items,C)&&i(S,"DUPLICATE_KEY","Map keys must be unique"),x.items.push(B)}else{const x=new ve(t.schema);x.flow=!0,x.items.push(B);const K=(V??C).range;x.range=[C.range[0],K[1],K[2]],l.items.push(x)}d=V?V.range[2]:O.end}}const p=r?"}":"]",[m,...y]=s.end;let g=d;if((m==null?void 0:m.source)===p)g=m.offset+m.source.length;else{const b=o[0].toUpperCase()+o.substring(1),v=u?`${b} must end with a ${p}`:`${b} in block collection must be sufficiently indented and end with a ${p}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",v),m&&m.source.length!==1&&y.unshift(m)}if(y.length>0){const b=It(y,g,t.options.strict,i);b.comment&&(l.comment?l.comment+=`
`+b.comment:l.comment=b.comment),l.range=[s.offset,g,b.offset]}else l.range=[s.offset,g,g];return l}function dn(n,e,t,s,i,a){const r=t.type==="block-map"?wa(n,e,t,s,a):t.type==="block-seq"?va(n,e,t,s,a):_a(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function Sa(n,e,t,s,i){var p;const a=s.tag,r=a?e.directives.tagName(a.source,m=>i(a,"TAG_RESOLVE_FAILED",m)):null;if(t.type==="block-seq"){const{anchor:m,newlineAfterProp:y}=s,g=m&&a?m.offset>a.offset?m:a:m??a;g&&(!y||y.offset<g.offset)&&i(g,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===ve.tagName&&o==="map"||r===Ke.tagName&&o==="seq")return dn(n,e,t,i,r);let c=e.schema.tags.find(m=>m.tag===r&&m.collection===o);if(!c){const m=e.schema.knownTags[r];if((m==null?void 0:m.collection)===o)e.schema.tags.push(Object.assign({},m,{default:!1})),c=m;else return m?i(a,"BAD_COLLECTION_TYPE",`${m.tag} used for ${o} collection, but expects ${m.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),dn(n,e,t,i,r)}const l=dn(n,e,t,i,r,c),u=((p=c.resolve)==null?void 0:p.call(c,l,m=>i(a,"TAG_RESOLVE_FAILED",m),e.options))??l,d=J(u)?u:new P(u);return d.range=l.range,d.tag=r,c!=null&&c.format&&(d.format=c.format),d}function ka(n,e,t){const s=e.offset,i=Ea(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?P.BLOCK_FOLDED:P.BLOCK_LITERAL,r=e.source?Ia(e.source):[];let o=r.length;for(let g=r.length-1;g>=0;--g){const h=r[g][1];if(h===""||h==="\r")o=g;else break}if(o===0){const g=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let h=s+i.length;return e.source&&(h+=e.source.length),{value:g,type:a,comment:i.comment,range:[s,h,h]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let g=0;g<o;++g){const[h,b]=r[g];if(b===""||b==="\r")i.indent===0&&h.length>c&&(c=h.length);else{h.length<c&&t(l+h.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=h.length),u=g,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=h.length+b.length+1}for(let g=r.length-1;g>=o;--g)r[g][0].length>c&&(o=g+1);let d="",p="",m=!1;for(let g=0;g<u;++g)d+=r[g][0].slice(c)+`
`;for(let g=u;g<o;++g){let[h,b]=r[g];l+=h.length+b.length+1;const v=b[b.length-1]==="\r";if(v&&(b=b.slice(0,-1)),b&&h.length<c){const _=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-b.length-(v?2:1),"BAD_INDENT",_),h=""}a===P.BLOCK_LITERAL?(d+=p+h.slice(c)+b,p=`
`):h.length>c||b[0]==="	"?(p===" "?p=`
`:!m&&p===`
`&&(p=`

`),d+=p+h.slice(c)+b,p=`
`,m=!0):b===""?p===`
`?d+=`
`:p=`
`:(d+=p+b,p=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let g=o;g<r.length;++g)d+=`
`+r[g][0].slice(c);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const y=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,y,y]}}function Ea({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let p=1;p<i.length;++p){const m=i[p];if(!o&&(m==="-"||m==="+"))o=m;else{const y=Number(m);!r&&y?r=y:c===-1&&(c=n+p)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",d=i.length;for(let p=1;p<e.length;++p){const m=e[p];switch(m.type){case"space":l=!0;case"newline":d+=m.source.length;break;case"comment":t&&!l&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=m.source.length,u=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),d+=m.source.length;break;default:{const y=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",y);const g=m.source;g&&typeof g=="string"&&(d+=g.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function Ia(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function La(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(p,m,y)=>t(s+p,m,y);switch(i){case"scalar":o=P.PLAIN,c=Na(a,l);break;case"single-quoted-scalar":o=P.QUOTE_SINGLE,c=Aa(a,l);break;case"double-quoted-scalar":o=P.QUOTE_DOUBLE,c=Ta(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=It(r,u,e,t);return{value:c,type:o,comment:d.comment,range:[s,u,d.offset]}}function Na(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Js(n)}function Aa(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Js(n.slice(1,-1)).replace(/''/g,"'")}function Js(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function Ta(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=Ca(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=Ma[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Oa(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Ca(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Ma={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Oa(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function Qs(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?ka(n,e,s):La(e,n.options.strict,s),c=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[Ae]:c?l=Pa(n.schema,i,c,t,s):e.type==="scalar"?l=Ra(n,i,e,s):l=n.schema[Ae];let u;try{const d=l.resolve(i,p=>s(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=j(d)?d:new P(d)}catch(d){const p=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",p),u=new P(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function Pa(n,e,t,s,i){var o;if(t==="!")return n[Ae];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Ae])}function Ra({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[Ae];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[Ae];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function $a(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const xa={composeNode:Xs,composeEmptyNode:qn};function Xs(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=Fa(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=Qs(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=Sa(xa,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(d){const p=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",p)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return l??(l=qn(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!j(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function qn(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:$a(e,t,s),indent:-1,source:""},d=Qs(n,u,o,l);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=c),d}function Fa({options:n},{offset:e,source:t,end:s},i){const a=new Pn(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=It(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Ba(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new Xt(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=at(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Xs(l,i,u,r):qn(l,u.end,s,null,u,r);const d=c.contents.range[2],p=It(a,d,!1,r);return p.comment&&(c.comment=p.comment),c.range=[t,d,p.offset],c}function ft(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function rs(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Va{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=ft(t);a?this.warnings.push(new ba(r,s,i)):this.errors.push(new gt(r,s,i))},this.directives=new ue({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=rs(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(z(a)&&!a.flow&&a.items.length>0){let r=a.items[0];Q(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:rs(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=ft(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Ba(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new gt(ft(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new gt(ft(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=It(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new gt(ft(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Xt(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Zs="\uFEFF",ei="",ti="",Ln="";function Ua(n){switch(n){case Zs:return"byte-order-mark";case ei:return"doc-mode";case ti:return"flow-error-end";case Ln:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ee(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const os=new Set("0123456789ABCDEFabcdef"),Da=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Pt=new Set(",[]{}"),Ha=new Set(` ,[]{}
\r	`),fn=n=>!n||Ha.has(n);class ja{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&Ee(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Zs&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield ei,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ee(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ee(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ee(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(fn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&Ee(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield ti,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(fn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||Ee(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ee(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield Ln,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(Ee(a)||e&&Pt.has(a))break;t=s}else if(Ee(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Pt.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Pt.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Ln,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(fn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Ee(t)||e&&Pt.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ee(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Da.has(t))t=this.buffer[++e];else if(t==="%"&&os.has(this.buffer[e+1])&&os.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Ka{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function $e(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function ls(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function ni(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Rt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function ze(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function cs(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!$e(e.start,"explicit-key-ind")&&!$e(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,ni(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class qa{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ja,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Ua(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&cs(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&ls(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{ls(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Rt(this.peek(2)),s=ze(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if($e(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(ni(t.key)&&!$e(t.sep,"newline")){const o=ze(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if($e(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=ze(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):$e(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!$e(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||$e(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Rt(s),a=ze(i);cs(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Rt(e),s=ze(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Rt(e),s=ze(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Wa(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Ka||null,prettyErrors:e}}function Ya(n,e={}){const{lineCounter:t,prettyErrors:s}=Wa(e),i=new qa(t==null?void 0:t.addNewLine),a=new Va(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new gt(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(is(n,t)),r.warnings.forEach(is(n,t))),r}function Pe(n,e,t){let s;const i=Ya(n,t);if(!i)return null;if(i.warnings.forEach(a=>Ts(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Ga=`# Simulation family catalog source-of-truth.
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
      description: See your galaxy as the Hubble Space Telescope would — a luminous swirl of billions of stars.  Brighter regions trace where the most stars were born while dark lanes mark the dust (complex molecules and tiny grains) that blocks starlight.
    - id: sph_plus_hst
      label: Large Scale Structure
      icon: large-scale-structure
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
`,za=`# Parameter definitions for each simulation family.
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
`,Qa=`# Live telemetry HUD display configuration for each simulation family.
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
`;function Y(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Xa=Pe(Ga),Za=Pe(za),us=Pe(Ja),er=Pe(Qa),Je=Object.entries(Xa).map(([n,e])=>{var r,o;const t=tr(us[n]),s=(((r=us[n])==null?void 0:r.results)??[]).map(nr),i=((o=er[n])==null?void 0:o.liveStats)??[],a=Za[n]??{};return{id:n,label:e.label,placeholderImage:Y(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(Nn),liveStats:i.map(Nn)},parameters:Object.entries(a).map(([c,l])=>{const u=l.step??sr(l.min,l.max),d=l.log_scale?Math.sqrt(l.min*l.max):ir(l.min,l.max);return{id:c,label:l.label,unit:l.unit??"",min:l.min,max:l.max,step:u,fallbackValue:d,description:l.description,valueScale:l.value_scale,displayUnit:l.display_unit,displayFormat:l.display_format,displaySignificantFigures:l.display_significant_figures,logScale:l.log_scale}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,description:c.description}))}});function tr(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function Nn(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function nr(n){return{...Nn(n),target:n.target}}function sr(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function ir(n,e){return n+(e-n)/2}const si="universe-engine-theme",ii=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function ar(){const n=localStorage.getItem(si);return or(n)?n:"glass"}function hn(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(si,n)}function rr(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of ii){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function or(n){return ii.some(e=>e.id===n)}function lr(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r,o=new Set,c=!1;const l=new Map,u=new Map,d=new Map;let p=null,m=null;const y=document.createElement("canvas"),g=y.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let h=s.playbackRate;function b(){p&&(URL.revokeObjectURL(p),p=null)}function v(L,M={}){const R=u.get(L);R&&(u.delete(L),M={...M,ownedObjectUrl:!0},L=R),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(L)){s.classList.remove("fade-out");return}const W=s.muted,H=M.seekFraction;b(),m=null,p=M.ownedObjectUrl?L:null,s.src=L,s.load(),s.onloadeddata=()=>{if(s.muted=W,H!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const pe=Math.max(0,Math.min(.999,H));s.currentTime=pe*s.duration}else s.currentTime=0;s.playbackRate=h,s.classList.remove("fade-out"),M.autoplay&&s.play().catch(()=>{})}},120)}function k(L){s.muted=L}async function _(){await s.play()}function E(){s.pause()}function I(){s.classList.add("is-empty")}function A(){s.classList.remove("is-empty")}function S(L){if(!Number.isFinite(s.duration)||s.duration<=0)return;const M=Math.max(0,Math.min(1,L));s.currentTime=M*s.duration}function C(){s.currentTime=0,i==null||i(0)}function O(L=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(M=>{const R=()=>{H(),M()},W=window.setTimeout(()=>{H(),M()},Math.max(0,L));function H(){window.clearTimeout(W),s.removeEventListener("loadeddata",R)}s.addEventListener("loadeddata",R,{once:!0})})}function V(L,M=8e3){const R=Math.max(0,L);return R===0||B(R)?Promise.resolve():new Promise(W=>{const H=()=>{B(R)&&(D(),W())},pe=window.setTimeout(()=>{D(),W()},Math.max(0,M));function D(){window.clearTimeout(pe),s.removeEventListener("progress",H),s.removeEventListener("canplay",H),s.removeEventListener("loadeddata",H)}s.addEventListener("progress",H),s.addEventListener("canplay",H),s.addEventListener("loadeddata",H),H()})}function B(L){const M=s.currentTime;for(let R=0;R<s.buffered.length;R+=1){const W=s.buffered.start(R),H=s.buffered.end(R);if(!(M<W||M>H))return H-M>=L}return!1}function x(L){o=new Set(L.filter(Boolean).filter(M=>M!==s.currentSrc)),c||ne()}function K(){c=!0,re(),oe()}function X(){if(!c){ne();return}c=!1,ne()}function ne(){for(const[L,M]of l.entries())o.has(L)||(M.removeAttribute("src"),M.load(),l.delete(L));for(const[L,M]of d.entries())o.has(L)||(M.abort(),d.delete(L));for(const L of o){if(!l.has(L)){const M=document.createElement("video");M.preload="auto",M.muted=!0,M.playsInline=!0,M.src=L,M.load(),l.set(L,M)}u.has(L)||d.has(L)||te(L)}}function re(){for(const L of l.values())L.removeAttribute("src"),L.load();l.clear()}function oe(){for(const L of d.values())L.abort();d.clear()}function te(L){const M=new AbortController;d.set(L,M);const R=`${L}?_=${Date.now()}`;fetch(R,{signal:M.signal}).then(async W=>{if(!W.ok)return;const H=await W.blob();o.has(L)&&u.set(L,URL.createObjectURL(H))}).catch(W=>{W instanceof DOMException&&W.name}).finally(()=>{d.get(L)===M&&d.delete(L)})}function Z(){o.clear(),c=!1,re(),oe();for(const L of u.values())URL.revokeObjectURL(L);u.clear()}function le(L){return u.get(L)??null}function G(){!g||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(y.width=s.videoWidth,y.height=s.videoHeight,g.drawImage(s,0,0,y.width,y.height),m=y.toDataURL("image/jpeg",.85))}function ee(){return m||G(),m}function F(L){i=L}function se(L){a=L}return{setSource:v,setMuted:k,play:_,pause:E,hideMedia:I,showMedia:A,seekToFraction:S,resetPlayback:C,waitForLoadedData:O,waitForBufferedAhead:V,onTimeUpdate:F,onEnded:se,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:L=>{h=L,s.playbackRate=L},getPlaybackRate:()=>h,onPlayStateChange:L=>{r=L},getElement:()=>t,prewarmSources:x,suspendPrewarming:K,resumePrewarming:X,clearPrewarmedSources:Z,getPrewarmedBlobUrl:le,captureFrame:ee}}const cr=[.25,.5,1,2];function ur(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onScrubStart:r,onScrubEnd:o,initialSpeed:c=1}=e,l=document.createElement("div");l.className="timeline";const u=document.createElement("div");u.className="timeline__bar-row";const d=document.createElement("button");d.className="timeline__play-btn",d.type="button",d.setAttribute("aria-label","Toggle playback"),d.addEventListener("click",()=>s==null?void 0:s());const p=document.createElement("input");p.className="timeline__slider",p.type="range",p.min="0",p.max="1000",p.step="1",p.value="0",p.style.setProperty("--fill","0%"),p.setAttribute("aria-label","Simulation time");const m=document.createElement("div");m.className="timeline__speed";const y=document.createElement("button");y.className="timeline__speed-btn",y.type="button",y.setAttribute("aria-label","Playback speed"),y.addEventListener("click",()=>{m.classList.toggle("open")});const g=document.createElement("div");g.className="timeline__speed-menu";for(const v of cr){const k=document.createElement("button");k.className="timeline__speed-option",k.type="button",k.textContent=mn(v),k.addEventListener("click",()=>{m.classList.remove("open"),i==null||i(v)}),g.appendChild(k)}m.appendChild(y),m.appendChild(g);const h=document.createElement("button");return h.className="timeline__summary-btn",h.type="button",h.setAttribute("aria-label","View run summary"),h.textContent="ⓘ",h.addEventListener("click",()=>a==null?void 0:a()),u.appendChild(d),u.appendChild(p),u.appendChild(m),u.appendChild(h),p.addEventListener("input",()=>{const v=parseInt(p.value,10)/1e3;p.style.setProperty("--fill",`${v*100}%`),t==null||t(v)}),p.addEventListener("pointerdown",()=>r==null?void 0:r()),p.addEventListener("pointerup",()=>o==null?void 0:o()),p.addEventListener("change",()=>o==null?void 0:o()),document.addEventListener("click",v=>{m.contains(v.target)||m.classList.remove("open")}),l.appendChild(u),n.appendChild(l),b(c),{setPosition(v){const k=Math.max(0,Math.min(1,v));p.value=String(Math.round(k*1e3)),p.style.setProperty("--fill",`${k*100}%`)},setPlaying(v){d.textContent=v?"⏸":"▶",d.classList.toggle("is-paused",!v),d.setAttribute("aria-label",v?"Pause":"Play")},setSpeed(v){b(v)}};function b(v){y.textContent=mn(v);for(const k of g.children)k.classList.toggle("is-active",k.textContent===mn(v))}}function mn(n){return`x${n}`}function dr(n,e){const t=Math.min(ai(e),2);return n.toFixed(t)}function Ie(n,e){return e?`${n} ${e}`:n}function _t(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?ht(n):e<1e6?`${t}${ht(n/1e3)}K`:e<1e9?`${t}${ht(n/1e6)}M`:e<1e12?`${t}${ht(n/1e9)}B`:`${t}${ht(n/1e12)}T`:String(n)}function ht(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function fr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Dt(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return _t(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function tt(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="compact"||t.format==="scientific"?_t(i):dr(i,a)}function ai(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function hr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=mr(s,i,a);for(const o of s.metadata.liveStats){const c=gr(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function mr(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:tt(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:pr(a),value:r}]))}}function pr(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function gr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=yr((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:Ie(a,n.unit)}}function yr(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?_t(Math.round(a)):_t(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):fr(n,{integer:e.integer})}function br(){const n=Y("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(vr()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function wr(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function vr(){return wr(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const _r={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function Sr(n,e,t){const s=Y("assets/banner-1600.webp"),i=[`${Y("assets/banner-960.webp")} 960w`,`${Y("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(p){o.innerHTML="";for(const m of p){const y=document.createElement("button");y.className="entry-overlay__button",y.type="button";const g=_r[m.id]??"Explore this simulation scale.";y.innerHTML=`
        <span class="entry-overlay__button-label">${m.label}</span>
        <span class="entry-overlay__button-description">${g}</span>
      `,y.addEventListener("click",()=>t(m)),o.appendChild(y)}}c(e);const{infoButton:l,infoModal:u,close:d}=br();return r.appendChild(o),a.appendChild(r),a.appendChild(l),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){d(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(p){c(p)}}}function kr(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(_=>[_.id,_.target])),a=n.metadata.results.map(_=>{const E=gn(n,e,s,_.id);return E===null?null:{id:_.id,value:E,target:_.target}}).filter(_=>_!==null),r=n.parameters.filter(_=>i[_.id]!==void 0).map(_=>{const E=e[_.id]??_.fallbackValue,I=i[_.id]??_.fallbackValue;return Math.abs(E-I)/Math.max(_.max-_.min,1e-9)}),o=r.reduce((_,E)=>_+E,0)/Math.max(r.length,1),c=Lr(a),l=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,p=`${pn(u,1)} CPU-hrs
${pn(d,1)} GB`,m=String(n.parameters.length),y=`${(o*100).toFixed(1)}%`,g=String(n.parameters.length+6),h="Present",b=Ir((s==null?void 0:s.wallclockSeconds)??t),v=ds(fs(gn(n,e,s,"moon_iron"))),k=ds(fs(gn(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:m},runtime:{label:"Total Runtime",value:b},similarityScore:{label:"Similarity Score",value:`${c}/100`},bestFitDelta:{label:"Best-Fit Delta",value:y},carbonBurnt:{label:"Carbon Burnt",value:l},computeUsed:{label:"Compute Used",value:p},memoryUsed:{label:"Memory Used",value:pn(d,1)},particlesUpdated:{label:"Particle updates",value:s?Er(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:k},audioTrack:{label:"Audio Track",value:h},terminalLines:{label:"Terminal Lines",value:g},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([_,E])=>[_,{label:E.label,value:E.value}]))}}function Er(n){return String(Math.max(0,n))}function Ir(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function pn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function gn(n,e,t,s){var o;const i=n.parameters.find(c=>c.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const c=Number(a);if(Number.isFinite(c))return c}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function ds(n){return n===null?"--":n.toFixed(1)}function fs(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function Lr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const An={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},Nr={HIDE_AFTER_MS:980},Ar="https://media.universemakers.org/engine/run-manifest.json",Tr="https://universe-engine.universe-engine.workers.dev/api/track-run",Cr=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,hs=(()=>{const n=Pe(Cr),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Ht="#4CD98A",Tn="#E8951C",ri="#D7372A",oi=.2,li=.5,ms=2;function ci(n){const e=Math.abs(n-1);return e<=oi?{word:"On target",colour:Ht}:e<=li?{word:n>1?"Too high":"Too low",colour:Tn}:{word:n>1?"Way too high":"Way too low",colour:ri}}function Mr(n){const e=Math.abs(n-1),t=n>=1;return e<=oi?t?"greenHigh":"greenLow":e<=li?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Or(n){return Math.min(Math.max(n,0),ms)/ms*100}function Pr(n){return n>=85?{word:"Almost perfect",colour:Ht}:n>=65?{word:"Really close",colour:Ht}:n>=45?{word:"Getting there",colour:Tn}:n>=25?{word:"Not quite",colour:Tn}:{word:"Way off - try again",colour:ri}}function Rr(n,e,t){var r,o;const s=Mr(t),i=((r=hs[n])==null?void 0:r[s])??((o=hs[e])==null?void 0:o[s]);return i||(ci(t).colour===Ht?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function $r(n,e,t){return n.metadata.results.map(s=>{const i=xr(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=Fr(s,n,t),o=Rr(s.id,r,a),c=Ie(ui(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:c,detail:o}}).filter(s=>s!==null)}function xr(n,e,t,s){var c;const i=n.id,a=e.parameters.find(l=>l.id===i);if(a)return t[i]??a.fallbackValue;const r=Br((c=s==null?void 0:s.summaryMetrics[i])==null?void 0:c.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function Fr(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Br(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Vr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Ur(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const c=document.createElement("p");c.className="summary-overlay__hint",c.textContent="Select any card for more details",a.appendChild(o),a.appendChild(c);const l=document.createElement("div");l.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const d=document.createElement("button"),p=document.createElement("button");d.className="summary-overlay__button summary-overlay__button--primary",d.type="button",d.textContent="New Parameters",p.className="summary-overlay__button",p.type="button",p.textContent="Home",p.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),p.addEventListener("click",e.onHome),l.appendChild(d),l.appendChild(u),l.appendChild(p),i.appendChild(a),i.appendChild(r),i.appendChild(l),t.appendChild(i);const m=document.createElement("div");m.className="sci-modal is-hidden",m.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(m),n.appendChild(t);const y=m.querySelector(".sci-modal__title"),g=m.querySelector(".sci-modal__verdict"),h=m.querySelector(".sci-modal__body"),b=m.querySelector(".sci-modal__close");function v(I){const A=ci(I.value);y.textContent=I.label,g.textContent=A.word,g.style.color=A.colour,g.hidden=!1,h.textContent=I.detail,m.classList.remove("is-hidden")}function k(I,A){y.textContent=I,g.hidden=!0,h.textContent=A,m.classList.remove("is-hidden")}function _(){m.classList.add("is-hidden")}b.addEventListener("click",_),m.addEventListener("click",I=>{I.target===m&&_()}),t.addEventListener("click",I=>{I.target===t&&e.onReplay()});function E(I,A){const S=document.createElement("div");S.className=`${I.className} panel`,S.innerHTML=`<p class="sci-section__title">${I.title}</p>`;const C=document.createElement("div"),O=I.singleRow?Math.max(1,I.stats.length):Math.max(1,Math.min(I.stats.length,I.maxColumns));C.className="metric-grid",I.singleRow&&C.classList.add("metric-grid--single-row"),C.style.setProperty("--summary-grid-columns",String(O)),C.style.setProperty("--summary-grid-max-width",`${I.maxWidthRem}rem`);for(const V of I.stats){const B=Dr(V,A),x=document.createElement("div"),K=document.createElement("span"),X=document.createElement("span");x.className="res-card",K.className="res-card__label",K.textContent=B.label,X.className="res-card__value",X.textContent=B.value,x.appendChild(K),x.appendChild(X),V.description&&(x.classList.add("res-card--has-info"),x.addEventListener("click",()=>{k(B.label,V.description)})),C.appendChild(x)}return S.appendChild(C),S}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},Nr.HIDE_AFTER_MS)},setHomeVisible(I){p.hidden=!I},update(I,A,S,C,O){var ee;r.innerHTML="",_();const V=kr(I,A,S,C),B=I.metadata.summaryStats,x=$r(I,A,C),K=new Set(x.map(F=>F.id));let X;if(x.length>0)X=Vr(x);else{const F=((ee=V.similarityScore)==null?void 0:ee.value)??"0/100";X=parseInt(F,10)||0}const ne=Pr(X),re=document.createElement("div"),oe=document.createElement("div"),te=document.createElement("div");re.className="sci-top",oe.className="summary-main-column",te.className="summary-side-column";const Z=document.createElement("div");Z.className="sci-hero panel",O?(Z.classList.add("sci-hero--thumbnail"),Z.innerHTML=`<img class="sci-hero__thumbnail" src="${O}" alt="Final frame of simulation" />`):Z.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${X}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${ne.colour}">${ne.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${X}%; background:${ne.colour}; box-shadow:0 0 12px ${ne.colour}"></div>
          </div>
        `,oe.appendChild(Z);const le=B.filter(F=>(F.section??"resources")==="resources"&&!x.some(se=>se.id===String(F.id))&&F.id!=="similarityScore"),G=B.filter(F=>F.section==="simulationStats"&&!K.has(String(F.id)));if(le.length>0&&te.appendChild(E({title:"Resources Used",className:"res-section",stats:le,maxColumns:3,maxWidthRem:48},V)),G.length>0&&te.appendChild(E({title:"Simulation Stats",className:"res-section",stats:G,maxColumns:G.length,maxWidthRem:48,singleRow:!0},V)),re.appendChild(oe),te.childElementCount>0&&re.appendChild(te),r.appendChild(re),x.length>0){const F=document.createElement("div");F.className="sci-bottom-row";const se=document.createElement("div");se.className="sci-section panel param-section",se.innerHTML='<p class="sci-section__title">Input Parameters</p>';const L=document.createElement("div");L.className="param-cards";for(const D of I.parameters){const ce=A[D.id]??D.fallbackValue,Re=D.displayUnit??D.unit,ge=document.createElement("div"),Te=document.createElement("span"),ye=document.createElement("span");ge.className="res-card",D.description&&(ge.classList.add("res-card--has-info"),ge.addEventListener("click",()=>k(D.label,D.description))),Te.className="res-card__label",Te.textContent=D.label,ye.className="res-card__value";const N=tt(ce,D.step,{scale:D.valueScale,format:D.displayFormat,significantFigures:D.displaySignificantFigures});ye.textContent=Ie(N,Re),ge.appendChild(Te),ge.appendChild(ye),L.appendChild(ge)}se.appendChild(L);const M=document.createElement("div"),R=document.createElement("div"),W=document.createElement("p"),H=document.createElement("p");M.className="sci-section panel",R.className="sci-section__header",W.className="sci-section__title",W.textContent="Similarity Results",H.className="sci-section__hint",H.textContent="Select any bar for details",R.appendChild(W),R.appendChild(H);const pe=document.createElement("div");pe.className="sci-bars";for(const D of x){const ce=document.createElement("div");ce.className="sci-bar",ce.innerHTML=`
            <div class="sci-bar__name">${D.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Or(D.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${D.formattedValue}</div>
          `,ce.addEventListener("click",()=>v(D)),pe.appendChild(ce)}M.appendChild(R),M.appendChild(pe),F.appendChild(se),F.appendChild(M),r.appendChild(F)}}}}function Dr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Hr(s,n);if(i)return{label:n.label??t.label,value:i};const a=ui(s,n);return{label:n.label??t.label,value:Ie(a,n.unit)}}function Hr(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?Ie(Dt(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):Ie(Dt(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):Ie(n,e.unit)}function ui(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return Dt(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return Dt(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return _t(i)}function jr(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const c=Kr(a.icon);if(c){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(c),o.appendChild(u)}const l=document.createElement("span");if(l.className="view-switcher__label",l.textContent=a.label??a.id,o.appendChild(l),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(qr()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function Kr(n){switch(n){case"dark-matter":return De(`
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
      `);default:return null}}function De(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function qr(){return De(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Wr=`# Credits source-of-truth.
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
`;function Yr(){const n=Pe(Wr);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Gr(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:zr(u),i.innerHTML="";const p=document.createElement("div");p.className="parameter-editor__heading",p.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(p);const m=document.createElement("div");m.className="param-info-modal is-hidden",m.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(m);const y=m.querySelector(".sci-modal__title"),g=m.querySelector(".sci-modal__body"),h=m.querySelector(".sci-modal__close");function b(_,E){y.textContent=_,g.textContent=E,m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}h.addEventListener("click",v),m.addEventListener("click",_=>{_.target===m&&v()});const k=document.createElement("div");k.className="parameter-editor__list";for(const _ of u.parameters)k.appendChild(c(_,b));i.appendChild(k),l()}function c(u,d){const p=document.createElement("div");p.className="res-card param-card";const m=document.createElement("div");m.className="param-card__header";const y=document.createElement("span");y.className="res-card__label",y.textContent=u.label;const g=u.displayUnit??u.unit,h=document.createElement("span");h.className="param-card__range",h.textContent=`${Ie(tt(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)} – ${Ie(tt(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)}`,m.appendChild(y),m.appendChild(h);const b=document.createElement("input");b.className="param-card__slider",b.type="range";const v=u.logScale?Math.log10(u.min):u.min,k=u.logScale?Math.log10(u.max):u.max,_=r[u.id]??u.fallbackValue;b.min=String(v),b.max=String(k),b.step=u.logScale?"0.001":String(u.step),b.value=String(u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_),b.setAttribute("aria-label",u.label);const E=document.createElement("span");E.className="res-card__value";function I(S){const C=u.logScale?10**S:S;r[u.id]=C,b.value=String(S),b.style.setProperty("--fill",`${ps(S,v,k)}%`),E.textContent=Ie(tt(C,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),l()}b.addEventListener("input",()=>{I(parseFloat(b.value))}),b.addEventListener("pointerdown",S=>S.stopPropagation()),b.addEventListener("click",S=>S.stopPropagation());const A=u.logScale?Math.log10(Math.max(_,Number.MIN_VALUE)):_;if(b.style.setProperty("--fill",`${ps(A,v,k)}%`),E.textContent=Ie(tt(_,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),u.description){p.classList.add("res-card--has-info"),p.setAttribute("title",u.description);const S=document.createElement("span");S.className="param-card__info-btn",S.setAttribute("aria-label","Parameter description"),S.textContent="ⓘ",m.appendChild(S),p.addEventListener("click",()=>{d(u.label,u.description)})}return p.appendChild(m),p.appendChild(b),p.appendChild(E),p}function l(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function zr(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function ps(n,e,t){return t===e?0:(n-e)/(t-e)*100}const di="universe-engine-advanced-settings",Jr="RSSSE26UM_Engine";function Cn(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function Qr(n){const e=localStorage.getItem(di);if(!e)return Cn();try{const t=JSON.parse(e);return fi(t,n)}catch{return Cn()}}function Xr(n,e){const t=fi(n,e);return localStorage.setItem(di,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function fi(n,e){const t=Cn(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function Zr(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function eo(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=l.querySelector(".config-overlay__eyebrow"),d=l.querySelector(".config-overlay__title"),p=l.querySelector(".config-overlay__subtitle"),m=document.createElement("button");m.className="config-overlay__close",m.type="button",m.setAttribute("aria-label","Back"),m.textContent="←",c.appendChild(l),c.appendChild(m);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="parameters";const g=document.createElement("div");y.appendChild(g);const h=document.createElement("section");h.className="config-overlay__section config-overlay__section--grow",h.dataset.section="settings",h.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const b=document.createElement("div");h.appendChild(b);const v=document.createElement("section");v.className="advanced-settings",v.dataset.state="closed",v.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const k=document.createElement("button");k.className="advanced-settings__access",k.type="button",k.textContent="Advanced Settings",v.appendChild(k);const _=document.createElement("div");_.className="advanced-settings__auth";const E=document.createElement("input");E.className="advanced-settings__password",E.type="password",E.placeholder="Enter password",E.autocomplete="off";const I=document.createElement("button");I.className="advanced-settings__unlock",I.type="button",I.textContent="Unlock";const A=document.createElement("p");A.className="advanced-settings__message",_.appendChild(E),_.appendChild(I),_.appendChild(A),v.appendChild(_);const S=document.createElement("div");S.className="advanced-settings__form";const C=document.createElement("label");C.className="advanced-settings__field",C.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const O=document.createElement("select");O.className="advanced-settings__select",O.appendChild(new Option("None",""));for(const N of e.availableScales)O.appendChild(new Option(N.label,N.id));C.appendChild(O),S.appendChild(C);const V=document.createElement("div");V.className="advanced-settings__field",V.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const B=document.createElement("div");B.className="advanced-settings__options";const x=document.createElement("label"),K=document.createElement("input");x.className="advanced-settings__choice",K.type="radio",K.name="manifest-source",K.value="local",x.appendChild(K),x.append("Local manifest");const X=document.createElement("label"),ne=document.createElement("input");X.className="advanced-settings__choice",ne.type="radio",ne.name="manifest-source",ne.value="online",X.appendChild(ne),X.append("Online manifest"),B.appendChild(x),B.appendChild(X),V.appendChild(B),S.appendChild(V);const re=document.createElement("label");re.className="advanced-settings__field advanced-settings__field--inline";const oe=document.createElement("input"),te=document.createElement("span");oe.type="checkbox",oe.className="advanced-settings__checkbox",te.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,re.appendChild(oe),re.appendChild(te),S.appendChild(re);const Z=document.createElement("div");Z.className="advanced-settings__field",Z.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const le=document.createElement("div");le.className="advanced-settings__options";const G=new Map;for(const N of e.availableScales){const q=document.createElement("label"),U=document.createElement("input");q.className="advanced-settings__choice",U.type="checkbox",U.value=N.id,G.set(N.id,U),q.appendChild(U),q.append(`Show ${N.label}`),le.appendChild(q)}Z.appendChild(le),S.appendChild(Z),v.appendChild(S),h.appendChild(v);const ee=document.createElement("section");ee.className="config-overlay__section config-overlay__section--grow",ee.dataset.section="credits",ee.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const F=ee.querySelector("[data-credits]"),se=Yr();if(F.innerHTML="",se.length===0){const N=document.createElement("div");N.className="credits-list__entry",N.textContent="To be credited...",F.appendChild(N)}else for(const N of se)if(N.header){const q=document.createElement("div");q.className="credits-list__heading",q.textContent=N.text,F.appendChild(q)}else{const q=document.createElement("div");q.className="credits-list__entry";const U=document.createElement("span");if(U.className="credits-list__text",N.url){const ie=document.createElement("a");ie.className="credits-list__link",ie.href=N.url,ie.target="_blank",ie.rel="noopener noreferrer",ie.textContent=N.text,U.appendChild(ie)}else U.textContent=N.text;q.appendChild(U),F.appendChild(q)}const L=document.createElement("div");L.className="config-overlay__footer";const M=document.createElement("button");M.className="run-button",M.type="button",M.textContent="Run",L.appendChild(M),o.appendChild(c),o.appendChild(y),o.appendChild(h),o.appendChild(ee),o.appendChild(L),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let R=mt(e.advancedSettings),W="closed";const H=Gr(g,e.simClass,e.values,e.onValuesChange),pe=rr(b,e.theme,e.onThemeChange);m.addEventListener("click",e.onClose),k.addEventListener("click",()=>{if(W==="open"){ge("closed");return}ge("auth"),E.focus()}),I.addEventListener("click",Re),E.addEventListener("keydown",N=>{N.key==="Enter"&&Re()}),O.addEventListener("change",()=>{R.lockedScaleId=O.value||null,ce()}),K.addEventListener("change",()=>{K.checked&&(R.manifestSource="local")}),ne.addEventListener("change",()=>{ne.checked&&(R.manifestSource="online")}),oe.addEventListener("change",()=>{R.verboseLogging=oe.checked});for(const[N,q]of G.entries())q.addEventListener("change",()=>{if(Array.from(G.entries()).filter(([,ie])=>ie.checked).map(([ie])=>ie).length===0&&!R.lockedScaleId){q.checked=!0;return}R.hiddenScaleIds=Array.from(G.keys()).filter(ie=>{var Ne;return!((Ne=G.get(ie))!=null&&Ne.checked)&&ie!==R.lockedScaleId}),ce()}),N===R.lockedScaleId&&(q.disabled=!0);D(e.initialView??"parameters"),ce();function D(N){o.dataset.view=N,N==="parameters"?(u.textContent=e.simClass.label,d.textContent="Shape Your Simulation",p.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):N==="settings"?(u.textContent="Interface",d.textContent="Adjust The Control Room",p.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=Y("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",d.textContent="Project Sources And Attribution",p.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=Y("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),N==="settings"?M.textContent="Apply":N==="credits"?M.textContent="Close":M.textContent="Run Simulation"}function ce(){O.value=R.lockedScaleId??"",K.checked=R.manifestSource==="local",ne.checked=R.manifestSource==="online",oe.checked=R.verboseLogging;for(const[N,q]of G.entries()){const U=R.lockedScaleId===N;q.checked=U||!R.hiddenScaleIds.includes(N),q.disabled=U}}function Re(){if(E.value!==Jr){A.textContent="Incorrect password";return}E.value="",A.textContent="",ge("open")}function ge(N){W=N,v.dataset.state=N,k.textContent=N==="open"?"Hide Advanced Settings":"Advanced Settings",N!=="auth"&&(A.textContent="")}function Te(){E.value="",A.textContent="",ge("closed")}function ye(){R=mt(e.advancedSettings),ce()}return M.addEventListener("click",()=>{const N=o.dataset.view;if(N==="settings"){e.onApplySettings(mt(R));return}if(N==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),ye(),Te()},setSimulation(N,q){e.simClass=N,a.dataset.simClass=N.id,H.setSimClass(N,q),o.dataset.view==="parameters"&&(r.src=N.placeholderImage,r.alt=`${N.label} preview`,D("parameters"))},setTheme(N){pe.setActive(N)},setView(N){D(N),N!=="settings"&&Te()},setAdvancedSettings(N){e.advancedSettings=mt(N),R=mt(N),ce(),Te()}}}function mt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function to(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=An,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let c=[],l=0;function u(){for(const y of c)window.clearTimeout(y);c=[]}function d(y,g){return new Promise(h=>{const b=window.setTimeout(()=>{g===l&&h()},Math.max(0,y));c.push(b)})}async function p(y,g){const h=document.createElement("div");h.className="terminal__line";const b=m();h.appendChild(b),o.appendChild(h);for(let v=0;v<y.length;v+=1){if(g!==l)return;const k=y[v];h.insertBefore(document.createTextNode(k),b),o.scrollTop=o.scrollHeight,await d(e,g)}b.remove()}function m(){const y=document.createElement("span");return y.className="terminal__cursor",y.textContent="█",y}return{async show(y,g,h,b){u(),l+=1;const v=l;i.hidden=!1,i.classList.remove("is-hidden");const k=performance.now(),_=(b==null?void 0:b.minTerminalTimeMs)??t;let E=!h,I=[...y];h&&h.then(()=>{E=!0});let A=0;for(;v===l;){I.length===0&&(I=[...y]);const C=Math.floor(Math.random()*I.length),[O]=I.splice(C,1),V=`${gs(A)} ${O.text}`;if(A+=1,await p(V,v),v!==l)return;if(performance.now()-k>=_&&E)break}if(v!==l)return;const S=document.createElement("div");S.className="terminal__line terminal__line--syncing",S.textContent=`${gs(A)} STARTING SIMULATION...`,o.appendChild(S),o.scrollTop=o.scrollHeight,await d(s,v),v===l&&g()},hide(){u(),l+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function gs(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${yn(t)}:${yn(s)}:${yn(i)}]`}function yn(n){return String(n).padStart(2,"0")}function no(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var d;l(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const p=document.getElementById("app");p&&p.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(d,p){const m=document.createElement("button");return m.className="display-menu__item",m.type="button",m.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,m.addEventListener("click",p),m}function l(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const hi="universe-engine-playback-speed",so=new Set([.25,.5,1,2]);function io(){const n=localStorage.getItem(hi),e=n?Number(n):NaN;return so.has(e)?e:1}function ao(n){localStorage.setItem(hi,String(n))}async function bn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function ro(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const oo=`# Initialization terminal script for the Planetary simulation family.
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
`,lo=`# Initialization terminal script for the Galaxy simulation family.
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
`,co=`# Initialization terminal script for the Cosmos simulation family.
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
`,uo={planetary:oo,galaxy:lo,cosmos:co};function fo(n){return Pe(uo[n.id]).map(t=>({text:t}))}function ho(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function mo(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=Pe(t),i=Qe(s.wallclockSeconds),a=Qe(s.computeUsed),r=Qe(s.memoryUsed),o=Qe(s.carbonBurnt),c=Qe(s.particlesUpdated),l=await po(n),u=yo(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function po(n){try{const e=await fetch(go(n));if(!e.ok)return{};const t=await e.text(),s=Pe(t);return bo(s)}catch{return{}}}function go(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function Qe(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function yo(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function bo(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=Qe(s);i!==null&&(e[t]=i)}return e}const mi="[UniverseEngine]";let pi=!1;function ys(n){pi=n}function gi(){return pi}function ae(n,e){gi()&&console.info(mi,n,e??"")}function Me(n,e){gi()&&console.warn(mi,n,e??"")}const wo={local:"assets/local-manifest.json",online:Ar};function vo(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,ae("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await bi(e,t)},async findNearestVideo(s,i,a){const r=await So(e,t,s,i,a);if(r)return r;const o=yi(s);return Me("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:_o(s),summaryUrl:ho(o)}}}}function yi(n){switch(n){case"planetary":return Y("assets/planet_test.mp4");case"galaxy":return Y("assets/galaxy_test.mp4");case"cosmos":return Y("assets/cosmo_test.mp4");default:return Y("assets/galaxy_test.mp4")}}function _o(n){switch(n){case"planetary":return Y("assets/planet_test_planetary_stats.csv");case"galaxy":return Y("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return Y("assets/cosmo_test_cosmos_stats.csv");default:return Y("assets/galaxy_test_galaxy_stats.csv")}}async function bi(n,e){const t=e.get(n);if(t)return t;const s=wo[n],i=fetch(Y(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ae("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(Me("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function So(n,e,t,s,i){const r=(await bi(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return Me("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=bs(o,s,i);for(const d of r.slice(1)){const p=bs(d,s,i);p<c&&(o=d,c=p)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(ae("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:Y(u),liveDataUrl:Y(o.liveDataPath),summaryUrl:Y(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,p])=>[d,Y(p)]))}):null}function bs(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Bt={mode:"time",frames:[]};async function ko(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return Lo(t)}function Eo(n,e,t=0){if(n.mode==="row")return No(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=Io(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],c=(e-r.t)/Math.max(o.t-r.t,1e-9);return Ao(r.values,o.values,c)}function Io(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function Lo(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Bt;const t=wn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=wn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=wn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function No(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function wn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function Ao(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=To(u);continue}i[a]=t<.5?r:o}return i}function To(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Co(n){Mo(Tr,n)}function Mo(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ae("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ae("Run selection tracked",{simulationId:e.simulationId}):Me("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{Me("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const ws=50*1024*1024,Oo=8,Po=6e3,Ro=8e3,$o=5e3,xo=1200,Fo=100,vn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Bo(n){const e=Je.map(f=>f.id);let t=Qr(e),s=Qn(t);const i=vo(t.manifestSource),a=ro();ys(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=Xn(t.lockedScaleId)??s[0]??Je[0],o=t.lockedScaleId?vn[r.id]:ar(),c=!1,l=null,u=null,d=0,p=Bt,m=!1;const y=Object.fromEntries(Je.map(f=>[f.id,Ci(f)]));hn(o);const g=yi(r.id),h=lr(n,g),b=document.createElement("div");b.className="display-chrome",b.classList.add("is-hidden"),n.appendChild(b);const v=document.createElement("div");v.className="orientation-overlay",v.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(v);const k=document.createElement("div");k.className="swift-logo",k.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Y("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(k);const _=document.createElement("div");_.className="synth-logo is-hidden",_.innerHTML=`
    <img
      class="synth-logo__image"
      src="${Y("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(_);const E=document.createElement("img");E.className="app-partner-logo",E.src=Y("assets/dirac-hpc-white.webp"),E.alt="DIRAC HPC",E.decoding="async",n.appendChild(E);const I=document.createElement("div");I.className="display-chrome__top-left is-hidden",n.appendChild(I);const A=no(I,{onHome(){nn()},onViewSelected(f){if(f==="credits"){Nt("credits");return}Nt(f)},showHome:!t.lockedScaleId}),S=document.createElement("div");S.className="display-chrome__left-center",b.appendChild(S);const C=jr(S,{onSelect(f){Jn(f)},onInfo(f,w,T){V.textContent=w,B.textContent=T,O.classList.add("is-visible")}}),O=document.createElement("div");O.className="view-info-overlay",O.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(O);const V=O.querySelector(".view-info-overlay__title"),B=O.querySelector(".view-info-overlay__text"),x=O.querySelector(".view-info-overlay__close");O.addEventListener("click",f=>{f.target===O&&O.classList.remove("is-visible")}),x.addEventListener("click",()=>{O.classList.remove("is-visible")});const K=document.createElement("div");K.className="display-chrome__top-center is-hidden",b.appendChild(K);const X=document.createElement("div");X.className="display-chrome__top-right",b.appendChild(X);const ne=hr(X),re=document.createElement("div");re.className="display-chrome__center-status",re.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,b.appendChild(re);const oe=io();h.setPlaybackRate(oe);const te=document.createElement("div");te.className="display-chrome__bottom",b.appendChild(te);const Z=ur(te,{onChange(f){W(f)},onTogglePlay:zn,onSpeedChange:Ei,onSummaryClick:ki,onScrubStart(){ge(),R()},onScrubEnd(){Te(),h.isPaused()||M()},initialSpeed:oe});Z.setPlaying(!h.isPaused());let le=null,G=null,ee=null,F=!1,se=null,L=0;function M(){if(le!==null)return;function f(){const w=h.getPlaybackFraction();Z.setPosition(w),h.isPaused()?le=null:le=requestAnimationFrame(f)}le=requestAnimationFrame(f)}function R(){le!==null&&(cancelAnimationFrame(le),le=null)}function W(f){G=f,ee===null&&(ee=requestAnimationFrame(()=>{if(ee=null,G===null)return;const w=G;G=null,h.seekToFraction(w)}))}function H(){if(G===null)return;ee!==null&&(cancelAnimationFrame(ee),ee=null);const f=G;G=null,h.seekToFraction(f)}function pe(){se!==null&&(window.clearTimeout(se),se=null)}function D(){if(!(u!=null&&u.views))return[];const f=Ye(r,u);return Object.entries(u.views).filter(([w])=>w!==f).map(([,w])=>w).filter(Boolean)}function ce(){pe(),h.suspendPrewarming()}function Re(f=xo){pe(),!(F||h.isPaused())&&(se=window.setTimeout(()=>{se=null,!(F||h.isPaused())&&(h.resumePrewarming(),h.prewarmSources(D()))},Math.max(0,f)))}function ge(){F=!0,L=0,ce()}function Te(){F=!1,L=0,H(),d=h.getPlaybackFraction()*h.getDurationSeconds(),Ve(d),Re()}h.onPlayStateChange(f=>{Z.setPlaying(!f),f?(R(),ce()):(M(),Re(0))}),h.onTimeUpdate(f=>{if(d=f*h.getDurationSeconds(),F){const w=performance.now();if(w-L<Fo)return;L=w}Ve(d)});const ye=document.createElement("div");ye.className="overlay-layer",n.appendChild(ye);const N=Ur(ye,{onReplay:Si,onParameters:()=>Nt("parameters"),onHome:nn,showHome:!t.lockedScaleId});h.onEnded(()=>{c=!0;const f=h.captureFrame();N.update(r,be(),h.getDurationSeconds(),l,f),N.show()});const q=Sr(ye,s,f=>{Gn(f),Nt("parameters")}),U=eo(ye,{simClass:r,values:be(),theme:o,advancedSettings:t,availableScales:Je,onValuesChange:wi,onThemeChange:tn,onRun:()=>{ae("Parameters submitted — starting run",{simClassId:r.id}),Ii().catch(f=>{Me("Run failed to start",{simClassId:r.id,error:f instanceof Error?f.message:String(f)})})},onApplySettings:vi,onClose:_i,initialView:"parameters"}),ie=to(ye);Z.setPosition(0),Ve(),N.hide();const Ne=new WeakMap,ke=f=>{const w=Ne.get(f);w&&(clearTimeout(w),Ne.delete(f)),f.classList.remove("side-collapsed")},Fe=f=>{const w=Ne.get(f);w&&clearTimeout(w),Ne.set(f,setTimeout(()=>{f.classList.add("side-collapsed"),Ne.delete(f)},2500))},Zt=f=>{const w=Ne.get(f);w&&(clearTimeout(w),Ne.delete(f)),f.classList.add("side-collapsed")},en=(f,w)=>{const T=w.isCollapsible??(()=>!0);f.addEventListener("mouseenter",()=>ke(f)),f.addEventListener("mouseleave",()=>{if(!T()){ke(f);return}Fe(f)}),f.addEventListener("focusin",()=>ke(f)),f.addEventListener("focusout",$=>{if(!f.contains($.relatedTarget)){if(!T()){ke(f);return}Fe(f)}}),f.addEventListener("click",()=>{if(!T()){ke(f);return}if(f.classList.contains("side-collapsed")){ke(f),Fe(f);return}w.toggleOnClick?Zt(f):Fe(f)}),T()?Zt(f):ke(f)};en(I,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),en(S,{toggleOnClick:!0}),en(te,{toggleOnClick:!1});let ut=0,We=null,Lt=0;const Wn=()=>{We!==null&&(cancelAnimationFrame(We),We=null)},Yn=()=>{if(We!==null)return;Lt=h.getPlaybackFraction();const f=()=>{if(ut===0){Wn();return}const T=12*(1/60)/Math.max(h.getDurationSeconds(),1);Lt=Math.max(0,Math.min(1,Lt+ut*T)),h.seekToFraction(Lt),We=requestAnimationFrame(f)};We=requestAnimationFrame(f)};document.addEventListener("keydown",f=>{if(n.dataset.mode==="display"&&!(f.target instanceof HTMLInputElement||f.target instanceof HTMLTextAreaElement))switch(f.key){case"Escape":f.preventDefault(),O.classList.contains("is-visible")?O.classList.remove("is-visible"):nn();break;case" ":f.preventDefault(),zn();break;case"ArrowLeft":f.preventDefault(),ke(te),Fe(te),ut=-1,Yn();break;case"ArrowRight":f.preventDefault(),ke(te),Fe(te),ut=1,Yn();break;case"ArrowUp":case"ArrowDown":{if(f.preventDefault(),ke(S),Fe(S),!(u!=null&&u.views)||Object.keys(u.views).length<=1)break;const w=r.views.filter(fe=>{var he;return((he=u==null?void 0:u.views)==null?void 0:he[fe.id])!==void 0});if(w.length<=1)break;const T=u.viewId??Ye(r,u),$=w.findIndex(fe=>fe.id===T),we=f.key==="ArrowUp"?($-1+w.length)%w.length:($+1)%w.length;Jn(w[we].id);break}}}),document.addEventListener("keyup",f=>{(f.key==="ArrowLeft"||f.key==="ArrowRight")&&(ut=0,Wn())}),h.hideMedia(),h.pause(),Be(t.lockedScaleId?"config":"entry");function Gn(f){f.id===r.id&&m||(r=f,rn(),tn(vn[f.id]),U.setSimulation(r,be()),Z.setPosition(0),Ve(),an(),sn())}function wi(f){y[r.id]={...f},ae("Parameter values updated",{simClassId:r.id,values:y[r.id]}),Ve()}function tn(f){o=f,hn(f),U.setTheme(f)}function Nt(f){f==="parameters"&&U.setSimulation(r,be()),U.setView(f),Be("config")}function vi(f){if(Bi(f),m){N.hide(),Be("display");return}U.setSimulation(r,be()),U.setView("parameters")}function _i(){if(N.hide(),!m&&t.lockedScaleId){U.setSimulation(r,be()),U.setView("parameters");return}Be(m?"display":"entry")}function nn(){t.lockedScaleId||(ae("Returning to home screen",{simClassId:r.id}),rn(),m=!1,h.hideMedia(),Be("entry"))}function Si(){c=!1,N.hide(),h.getPlaybackFraction()>=.999&&h.resetPlayback(),bn(h)}function ki(){c=!0,h.pause();const f=l?h.captureFrame():null;N.update(r,be(),h.getDurationSeconds(),l,f),N.show()}function zn(){h.isPaused()?bn(h):h.pause()}function Ei(f){h.setPlaybackRate(f),ao(f),Z.setSpeed(f)}async function Ii(){const f=be(),w=a.start();ae("Run requested",{simClassId:r.id,values:f,manifestSource:i.getSource()});const T=await i.findNearestVideo(r.id,r.parameters,f);if(!a.isCurrent(w))return;rn({preserveRunRequest:!0}),u=T;const $=Ye(r,T);Co({simulationId:r.id,parameters:f,manifestSource:i.getSource(),matchedRunId:T.runId});const we=$i(T,$)??T.url,fe=Object.entries(T.views??{}).filter(([me])=>me!==$).map(([,me])=>me);Oi(T.liveDataUrl,w),Pi(T.summaryUrl,w),h.setMuted(!1),an($),Be("initializing");const he=Li(we);h.resumePrewarming(),h.prewarmSources(fe);const At=(async()=>{const me=await he;a.isCurrent(w)&&(ae(`Prepared active video source: ${me.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:we,waitsForBuffer:me.shouldWaitForBuffer}),h.setSource(me.src,{ownedObjectUrl:me.ownedObjectUrl}),h.pause(),await h.waitForLoadedData(Ro),a.isCurrent(w)&&me.shouldWaitForBuffer&&await h.waitForBufferedAhead(Oo,Po))})();await new Promise(me=>{ie.show(fo(r),me,At,{minTerminalTimeMs:xi()})}),a.isCurrent(w)&&(m=!0,h.showMedia(),bn(h),Be("display"))}async function Li(f){const w=await Ni(f);if(w!==null&&w>0&&w<=ws){ae("Downloading active video behind loading overlay",{videoUrl:f,contentLength:w});try{const T=await fetch(f);if(!T.ok)throw new Error(`Failed to download active video: ${f}`);const $=await T.blob();return ae(`Active video full fetch complete: ${$.size} bytes`,{videoUrl:f,blobType:$.type}),{src:URL.createObjectURL($),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(T){Me(`Full-fetch FAILED; falling back to progressive: ${T instanceof Error?T.message:String(T)}`,{videoUrl:f})}}return w!==null?ae("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:f,contentLength:w,fullFetchMaxBytes:ws}):ae("Could not determine active video size; using progressive load",{videoUrl:f}),ae("Using progressive active video load",{videoUrl:f}),{src:f,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function Ni(f){try{const w=await fetch(f,{headers:{Range:"bytes=0-0"}});ae("Probed active video size with range request",{videoUrl:f,ok:w.ok,status:w.status,contentLength:w.headers.get("Content-Length"),contentRange:w.headers.get("Content-Range")});const T=Ti(w.headers.get("Content-Length"));if(T!==null)return T;const $=Ai(w.headers.get("Content-Range"));return $!==null?$:null}catch(w){return Me("Could not probe active video size",{videoUrl:f,error:w instanceof Error?w.message:String(w)}),null}}function Ai(f){if(!f)return null;const w=f.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!w)return null;const T=Number(w[1]);return Number.isFinite(T)&&T>0?T:null}function Ti(f){if(!f)return null;const w=Number(f);return Number.isFinite(w)?w:null}function Be(f){if(n.dataset.mode=f,f==="entry"?document.documentElement.setAttribute("data-theme","glass"):f==="display"&&hn(o),dt(b,f==="display"||f==="config"),dt(k,f==="display"||f==="entry"),dt(I,!t.lockedScaleId&&(f==="entry"||f==="config"||f==="display")),f==="entry"?ke(I):Zt(I),f==="entry"&&!t.lockedScaleId?q.show():q.hide(),f==="config"?(ie.hide(),U.setSimulation(r,be()),U.show()):U.hide(),f!=="display")N.hide();else if(c){const T=h.captureFrame();N.update(r,be(),h.getDurationSeconds(),l,T),N.show()}!m||f==="initializing"?(h.hideMedia(),f==="initializing"&&h.pause()):h.showMedia(),f!=="initializing"&&ie.hide(),sn()}function sn(){if(n.dataset.mode==="entry"){dt(_,!0);return}const f=n.dataset.mode==="display",w=r.id==="galaxy",$=Ye(r,u)==="hst";dt(_,f&&w&&$)}function Ve(f=0){const w=Eo(p,f,h.getDurationSeconds()),T=Ri(r,l,f,h.getDurationSeconds());ne.update(r,be(),{...w,...T})}function an(f){const w=r.views.filter(we=>{var fe;return((fe=u==null?void 0:u.views)==null?void 0:fe[we.id])!==void 0});if(w.length<=1){C.hide(),K.classList.add("is-hidden");return}const T=f??Ye(r,u),$=w.find(we=>we.id===T);C.update(w,T),$?(K.classList.remove("is-hidden"),K.innerHTML=`<span class="viewport-title">${$.label??$.id}</span>`):K.classList.add("is-hidden")}function rn(f={}){f.preserveRunRequest||a.invalidate(),p=Bt,c=!1,l=null,u=null,d=0,F=!1,G=null,pe(),ee!==null&&(cancelAnimationFrame(ee),ee=null),N.hide(),C.hide(),h.pause(),h.clearPrewarmedSources(),h.resetPlayback(),Z.setPosition(0)}function Jn(f){if(!(u!=null&&u.views)||f===Ye(r,u))return;const w=u.views[f];if(!w)return;u.viewId=f;const T=!h.isPaused()&&!c,$=c?0:h.getPlaybackFraction();c=!1,N.hide(),h.setSource(w,{seekFraction:$,autoplay:T}),h.prewarmSources(D()),T&&!F?Re():ce(),an(f),O.classList.remove("is-visible"),sn()}function be(){return{...y[r.id]}}function Ci(f){return Object.fromEntries(f.parameters.map(w=>[w.id,Mi(w)]))}function Mi(f){if(f.logScale){const fe=Math.log10(f.min),he=Math.log10(f.max);return 10**(fe+Math.random()*(he-fe))}const w=Math.max(0,Math.round((f.max-f.min)/f.step)),T=Math.floor(Math.random()*(w+1)),$=f.min+T*f.step,we=ai(f.step);return Number($.toFixed(we))}async function Oi(f,w){let T=Bt;try{T=await ko(f)}catch($){Me("Failed to load live stats",{url:f,error:$ instanceof Error?$.message:String($)})}a.isCurrent(w)&&(p=T,Ve())}async function Pi(f,w){const T=await mo(f);a.isCurrent(w)&&(l=T,Ve(d))}function Ri(f,w,T,$){if(!w||!Number.isFinite($)||$<=0)return{};const we=Math.max(0,Math.min(1,T/$)),fe={};for(const he of f.metadata.liveStats){if(!he.live||!he.fromVideo||!he.scaleWithTime)continue;const At=he.videoKey??he.id,Tt=w[At];if(typeof Tt!="number"||!Number.isFinite(Tt))continue;const me=Tt*we;fe[he.id]=he.integer?String(Math.floor(me)):String(me)}return fe}function dt(f,w){f.hidden=!w,f.classList.toggle("is-hidden",!w)}function Ye(f,w){return w!=null&&w.views?w.viewId??Object.keys(w.views)[0]:w==null?void 0:w.viewId}function $i(f,w){return!w||!f.views?null:f.views[w]??null}function Qn(f){const w=new Set(Zr(f,e));return Je.filter(T=>w.has(T.id))}function Xn(f){return f?Je.find(w=>w.id===f)??null:null}function xi(){return i.getSource()!=="local"?An.MIN_TERMINAL_TIME_MS:Fi(An.MIN_TERMINAL_TIME_MS,$o)}function Fi(f,w){const T=Math.ceil(Math.min(f,w)),$=Math.floor(Math.max(f,w));return Math.floor(Math.random()*($-T+1))+T}function Bi(f){const w=r.id,T=t.manifestSource;t=Xr(f,e),ys(t.verboseLogging),s=Qn(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),A.setHomeVisible(!t.lockedScaleId),N.setHomeVisible(!t.lockedScaleId),q.setSimulationClasses(s),U.setAdvancedSettings(t),ae("Advanced settings updated",t),T!==t.manifestSource&&(u=null);const $=Xn(t.lockedScaleId);$&&(Gn($),$.id!==w&&(m=!1,h.hideMedia(),U.setView("parameters")),m||(tn(vn[$.id]),U.setSimulation(r,be())))}}function Vo(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Bo(n)}Vo();
//# sourceMappingURL=main-BgU3lkOf.js.map
