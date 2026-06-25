(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const In=Symbol.for("yaml.alias"),pn=Symbol.for("yaml.document"),Me=Symbol.for("yaml.map"),ms=Symbol.for("yaml.pair"),ke=Symbol.for("yaml.scalar"),nt=Symbol.for("yaml.seq"),ge=Symbol.for("yaml.node.type"),De=n=>!!n&&typeof n=="object"&&n[ge]===In,Bt=n=>!!n&&typeof n=="object"&&n[ge]===pn,vt=n=>!!n&&typeof n=="object"&&n[ge]===Me,X=n=>!!n&&typeof n=="object"&&n[ge]===ms,W=n=>!!n&&typeof n=="object"&&n[ge]===ke,wt=n=>!!n&&typeof n=="object"&&n[ge]===nt;function z(n){if(n&&typeof n=="object")switch(n[ge]){case Me:case nt:return!0}return!1}function Q(n){if(n&&typeof n=="object")switch(n[ge]){case In:case Me:case ke:case nt:return!0}return!1}const ps=n=>(W(n)||z(n))&&!!n.anchor,Re=Symbol("break visit"),Ti=Symbol("skip children"),mt=Symbol("remove node");function st(n,e){const t=Ai(e);Bt(n)?Ge(null,n.contents,t,Object.freeze([n]))===mt&&(n.contents=null):Ge(null,n,t,Object.freeze([]))}st.BREAK=Re;st.SKIP=Ti;st.REMOVE=mt;function Ge(n,e,t,s){const i=Mi(n,e,t,s);if(Q(i)||X(i))return Oi(n,s,i),Ge(n,i,t,s);if(typeof i!="symbol"){if(z(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const r=Ge(a,e.items[a],t,s);if(typeof r=="number")a=r-1;else{if(r===Re)return Re;r===mt&&(e.items.splice(a,1),a-=1)}}}else if(X(e)){s=Object.freeze(s.concat(e));const a=Ge("key",e.key,t,s);if(a===Re)return Re;a===mt&&(e.key=null);const r=Ge("value",e.value,t,s);if(r===Re)return Re;r===mt&&(e.value=null)}}return i}function Ai(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Mi(n,e,t,s){var i,a,r,o,c;if(typeof t=="function")return t(n,e,s);if(vt(e))return(i=t.Map)==null?void 0:i.call(t,n,e,s);if(wt(e))return(a=t.Seq)==null?void 0:a.call(t,n,e,s);if(X(e))return(r=t.Pair)==null?void 0:r.call(t,n,e,s);if(W(e))return(o=t.Scalar)==null?void 0:o.call(t,n,e,s);if(De(e))return(c=t.Alias)==null?void 0:c.call(t,n,e,s)}function Oi(n,e,t){const s=e[e.length-1];if(z(s))s.items[n]=t;else if(X(s))n==="key"?s.key=t:s.value=t;else if(Bt(s))s.contents=t;else{const i=De(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Pi={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},$i=n=>n.replace(/[!,[\]{}]/g,e=>Pi[e]);class le{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},le.defaultYaml,e),this.tags=Object.assign({},le.defaultTags,t)}clone(){const e=new le(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new le(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:le.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},le.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:le.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},le.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,r]=s;return this.tags[a]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const r=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+$i(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&Q(e.contents)){const a={};st(e.contents,(r,o)=>{Q(o)&&o.tag&&(a[o.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,r]of s)a==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(o=>o.startsWith(r)))&&t.push(`%TAG ${a} ${r}`);return t.join(`
`)}}le.defaultYaml={explicit:!1,version:"1.2"};le.defaultTags={"!!":"tag:yaml.org,2002:"};function gs(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function ys(n){const e=new Set;return st(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function bs(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function xi(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=ys(n));const r=bs(e,i);return i.add(r),r},setAnchors:()=>{for(const a of t){const r=s.get(a);if(typeof r=="object"&&r.anchor&&(W(r.node)||z(r.node)))r.node.anchor=r.anchor;else{const o=new Error("Failed to resolve repeated object (this should not happen)");throw o.source=a,o}}},sourceObjects:s}}function Je(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const r=s[i],o=Je(n,s,String(i),r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),r=Je(n,s,i,a);r===void 0?s.delete(i):r!==a&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const a=Je(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const r=Je(n,s,i,a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}return n.call(e,t,s)}function pe(n,e,t){if(Array.isArray(n))return n.map((s,i)=>pe(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!ps(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!(t!=null&&t.keep)?Number(n):n}class Nn{constructor(e){Object.defineProperty(this,ge,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Bt(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},o=pe(this,"",r);if(typeof i=="function")for(const{count:c,res:l}of r.anchors.values())i(l,c);return typeof a=="function"?Je(a,{"":o},"",o):o}}class Ln extends Nn{constructor(e){super(In),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let s;t!=null&&t.aliasResolveCache?s=t.aliasResolveCache:(s=[],st(e,{Node:(a,r)=>{(De(r)||ps(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,r=this.resolve(i,t);if(!r){const c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let o=s.get(r);if(o||(pe(r,null,t),o=s.get(r)),(o==null?void 0:o.res)===void 0){const c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(a>=0&&(o.count+=1,o.aliasCount===0&&(o.aliasCount=At(i,r,s)),o.count*o.aliasCount>a)){const c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return o.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(gs(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function At(n,e,t){if(De(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(z(e)){let s=0;for(const i of e.items){const a=At(n,i,t);a>s&&(s=a)}return s}else if(X(e)){const s=At(n,e.key,t),i=At(n,e.value,t);return Math.max(s,i)}return 1}const vs=n=>!n||typeof n!="function"&&typeof n!="object";class O extends Nn{constructor(e){super(ke),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:pe(this.value,e,t)}toString(){return String(this.value)}}O.BLOCK_FOLDED="BLOCK_FOLDED";O.BLOCK_LITERAL="BLOCK_LITERAL";O.PLAIN="PLAIN";O.QUOTE_DOUBLE="QUOTE_DOUBLE";O.QUOTE_SINGLE="QUOTE_SINGLE";const Ri="tag:yaml.org,2002:";function Fi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>{var i;return((i=s.identify)==null?void 0:i.call(s,n))&&!s.format})}function gt(n,e,t){var d,m,f;if(Bt(n)&&(n=n.contents),Q(n))return n;if(X(n)){const y=(m=(d=t.schema[Me]).createNode)==null?void 0:m.call(d,t.schema,null,t);return y.items.push(n),y}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:r,sourceObjects:o}=t;let c;if(s&&n&&typeof n=="object"){if(c=o.get(n),c)return c.anchor??(c.anchor=i(n)),new Ln(c.anchor);c={anchor:null,node:null},o.set(n,c)}e!=null&&e.startsWith("!!")&&(e=Ri+e.slice(2));let l=Fi(n,e,r.tags);if(!l){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const y=new O(n);return c&&(c.node=y),y}l=n instanceof Map?r[Me]:Symbol.iterator in Object(n)?r[nt]:r[Me]}a&&(a(l),delete t.onTagObj);const u=l!=null&&l.createNode?l.createNode(t.schema,n,t):typeof((f=l==null?void 0:l.nodeClass)==null?void 0:f.from)=="function"?l.nodeClass.from(t.schema,n,t):new O(n);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}function $t(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const r=[];r[a]=s,s=r}else s=new Map([[a,s]])}return gt(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const ft=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class ws extends Nn{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>Q(s)||X(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(ft(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(z(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,$t(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(z(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&W(a)?a.value:a:z(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!X(t))return!1;const s=t.value;return s==null||e&&W(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return z(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(z(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,$t(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Bi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Ee(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const Be=(n,e,t)=>n.endsWith(`
`)?Ee(t,e):t.includes(`
`)?`
`+Ee(t,e):(n.endsWith(" ")?"":" ")+t,_s="flow",gn="block",Mt="quoted";function Ut(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:r,onOverflow:o}={}){if(!i||i<0)return n;i<a&&(a=0);const c=Math.max(1+a,1+i-e.length);if(n.length<=c)return n;const l=[],u={};let d=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?l.push(0):d=i-s);let m,f,y=!1,g=-1,h=-1,b=-1;t===gn&&(g=Gn(n,g,e.length),g!==-1&&(d=g+c));for(let S;S=n[g+=1];){if(t===Mt&&S==="\\"){switch(h=g,n[g+1]){case"x":g+=3;break;case"u":g+=5;break;case"U":g+=9;break;default:g+=1}b=g}if(S===`
`)t===gn&&(g=Gn(n,g,e.length)),d=g+e.length+c,m=void 0;else{if(S===" "&&f&&f!==" "&&f!==`
`&&f!=="	"){const w=n[g+1];w&&w!==" "&&w!==`
`&&w!=="	"&&(m=g)}if(g>=d)if(m)l.push(m),d=m+c,m=void 0;else if(t===Mt){for(;f===" "||f==="	";)f=S,S=n[g+=1],y=!0;const w=g>b+1?g-2:h-1;if(u[w])return n;l.push(w),u[w]=!0,d=w+c,m=void 0}else y=!0}f=S}if(y&&o&&o(),l.length===0)return n;r&&r();let v=n.slice(0,l[0]);for(let S=0;S<l.length;++S){const w=l[S],k=l[S+1]||n.length;w===0?v=`
${e}${n.slice(0,k)}`:(t===Mt&&u[w]&&(v+=`${n[w]}\\`),v+=`
${e}${n.slice(w+1,k)}`)}return v}function Gn(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const Vt=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Ht=n=>/^(%|---|\.\.\.)/m.test(n);function Ui(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,r=0;a<i;++a)if(n[a]===`
`){if(a-r>s)return!0;if(r=a+1,i-r<=s)return!1}return!0}function pt(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(Ht(n)?"  ":"");let r="",o=0;for(let c=0,l=t[c];l;l=t[++c])if(l===" "&&t[c+1]==="\\"&&t[c+2]==="n"&&(r+=t.slice(o,c)+"\\ ",c+=1,o=c,l="\\"),l==="\\")switch(t[c+1]){case"u":{r+=t.slice(o,c);const u=t.substr(c+2,4);switch(u){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:u.substr(0,2)==="00"?r+="\\x"+u.substr(2):r+=t.substr(c,6)}c+=5,o=c+1}break;case"n":if(s||t[c+2]==='"'||t.length<i)c+=1;else{for(r+=t.slice(o,c)+`

`;t[c+2]==="\\"&&t[c+3]==="n"&&t[c+4]!=='"';)r+=`
`,c+=2;r+=a,t[c+2]===" "&&(r+="\\"),c+=1,o=c+1}break;default:c+=1}return r=o?r+t.slice(o):t,s?r:Ut(r,a,Mt,Vt(e,!1))}function yn(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return pt(n,e);const t=e.indent||(Ht(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Ut(s,t,_s,Vt(e,!1))}function ze(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=pt;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=yn:a&&!i?s=pt:s=t?yn:pt}return s(n,e)}let bn;try{bn=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{bn=/\n+(?!\n|$)/g}function Ot({comment:n,type:e,value:t},s,i,a){const{blockQuote:r,commentString:o,lineWidth:c}=s.options;if(!r||/\n[\t ]+$/.test(t))return ze(t,s);const l=s.indent||(s.forceBlockIndent||Ht(t)?"  ":""),u=r==="literal"?!0:r==="folded"||e===O.BLOCK_FOLDED?!1:e===O.BLOCK_LITERAL?!0:!Ui(t,c,l.length);if(!t)return u?`|
`:`>
`;let d,m;for(m=t.length;m>0;--m){const k=t[m-1];if(k!==`
`&&k!=="	"&&k!==" ")break}let f=t.substring(m);const y=f.indexOf(`
`);y===-1?d="-":t===f||y!==f.length-1?(d="+",a&&a()):d="",f&&(t=t.slice(0,-f.length),f[f.length-1]===`
`&&(f=f.slice(0,-1)),f=f.replace(bn,`$&${l}`));let g=!1,h,b=-1;for(h=0;h<t.length;++h){const k=t[h];if(k===" ")g=!0;else if(k===`
`)b=h;else break}let v=t.substring(0,b<h?b+1:h);v&&(t=t.substring(v.length),v=v.replace(/\n+/g,`$&${l}`));let w=(g?l?"2":"1":"")+d;if(n&&(w+=" "+o(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!u){const k=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`);let E=!1;const N=Vt(s,!0);r!=="folded"&&e!==O.BLOCK_FOLDED&&(N.onOverflow=()=>{E=!0});const _=Ut(`${v}${k}${f}`,l,gn,N);if(!E)return`>${w}
${l}${_}`}return t=t.replace(/\n+/g,`$&${l}`),`|${w}
${l}${v}${t}${f}`}function Vi(n,e,t,s){const{type:i,value:a}=n,{actualString:r,implicitKey:o,indent:c,indentStep:l,inFlow:u}=e;if(o&&a.includes(`
`)||u&&/[[\]{},]/.test(a))return ze(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return o||u||!a.includes(`
`)?ze(a,e):Ot(n,e,t,s);if(!o&&!u&&i!==O.PLAIN&&a.includes(`
`))return Ot(n,e,t,s);if(Ht(a)){if(c==="")return e.forceBlockIndent=!0,Ot(n,e,t,s);if(o&&c===l)return ze(a,e)}const d=a.replace(/\n+/g,`$&
${c}`);if(r){const m=g=>{var h;return g.default&&g.tag!=="tag:yaml.org,2002:str"&&((h=g.test)==null?void 0:h.test(d))},{compat:f,tags:y}=e.doc.schema;if(y.some(m)||f!=null&&f.some(m))return ze(a,e)}return o?d:Ut(d,c,_s,Vt(e,!1))}function Cn(n,e,t,s){const{implicitKey:i,inFlow:a}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:o}=n;o!==O.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(o=O.QUOTE_DOUBLE);const c=u=>{switch(u){case O.BLOCK_FOLDED:case O.BLOCK_LITERAL:return i||a?ze(r.value,e):Ot(r,e,t,s);case O.QUOTE_DOUBLE:return pt(r.value,e);case O.QUOTE_SINGLE:return yn(r.value,e);case O.PLAIN:return Vi(r,e,t,s);default:return null}};let l=c(o);if(l===null){const{defaultKeyType:u,defaultStringType:d}=e.options,m=i&&u||d;if(l=c(m),l===null)throw new Error(`Unsupported default string type ${m}`)}return l}function Ss(n,e){const t=Object.assign({blockQuote:!0,commentString:Bi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Hi(n,e){var i;if(e.tag){const a=n.filter(r=>r.tag===e.tag);if(a.length>0)return a.find(r=>r.format===e.format)??a[0]}let t,s;if(W(e)){s=e.value;let a=n.filter(r=>{var o;return(o=r.identify)==null?void 0:o.call(r,s)});if(a.length>1){const r=a.filter(o=>o.test);r.length>0&&(a=r)}t=a.find(r=>r.format===e.format)??a.find(r=>!r.format)}else s=e,t=n.find(a=>a.nodeClass&&s instanceof a.nodeClass);if(!t){const a=((i=s==null?void 0:s.constructor)==null?void 0:i.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${a} value`)}return t}function Di(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(W(n)||z(n))&&n.anchor;a&&gs(a)&&(t.add(a),i.push(`&${a}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function et(n,e,t,s){var c;if(X(n))return n.toString(e,t,s);if(De(n)){if(e.doc.directives)return n.toString(e);if((c=e.resolvedAliases)!=null&&c.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=Q(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=Hi(e.doc.schema.tags,a));const r=Di(a,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const o=typeof i.stringify=="function"?i.stringify(a,e,t,s):W(a)?Cn(a,e,t,s):a.toString(e,t,s);return r?W(a)||o[0]==="{"||o[0]==="["?`${r} ${o}`:`${r}
${e.indent}${o}`:o}function ji({key:n,value:e},t,s,i){const{allNullValues:a,doc:r,indent:o,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:d}}=t;let m=Q(n)&&n.comment||null;if(d){if(m)throw new Error("With simple keys, key nodes cannot have comments");if(z(n)||!Q(n)&&typeof n=="object"){const N="With simple keys, collection cannot be used as a key value";throw new Error(N)}}let f=!d&&(!n||m&&e==null&&!t.inFlow||z(n)||(W(n)?n.type===O.BLOCK_FOLDED||n.type===O.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!f&&(d||!a),indent:o+c});let y=!1,g=!1,h=et(n,t,()=>y=!0,()=>g=!0);if(!f&&!t.inFlow&&h.length>1024){if(d)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");f=!0}if(t.inFlow){if(a||e==null)return y&&s&&s(),h===""?"?":f?`? ${h}`:h}else if(a&&!d||e==null&&f)return h=`? ${h}`,m&&!y?h+=Be(h,t.indent,l(m)):g&&i&&i(),h;y&&(m=null),f?(m&&(h+=Be(h,t.indent,l(m))),h=`? ${h}
${o}:`):(h=`${h}:`,m&&(h+=Be(h,t.indent,l(m))));let b,v,S;Q(e)?(b=!!e.spaceBefore,v=e.commentBefore,S=e.comment):(b=!1,v=null,S=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!f&&!m&&W(e)&&(t.indentAtStart=h.length+1),g=!1,!u&&c.length>=2&&!t.inFlow&&!f&&wt(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let w=!1;const k=et(e,t,()=>w=!0,()=>g=!0);let E=" ";if(m||b||v){if(E=b?`
`:"",v){const N=l(v);E+=`
${Ee(N,t.indent)}`}k===""&&!t.inFlow?E===`
`&&S&&(E=`

`):E+=`
${t.indent}`}else if(!f&&z(e)){const N=k[0],_=k.indexOf(`
`),T=_!==-1,A=t.inFlow??e.flow??e.items.length===0;if(T||!A){let H=!1;if(T&&(N==="&"||N==="!")){let D=k.indexOf(" ");N==="&"&&D!==-1&&D<_&&k[D+1]==="!"&&(D=k.indexOf(" ",D+1)),(D===-1||_<D)&&(H=!0)}H||(E=`
${t.indent}`)}}else(k===""||k[0]===`
`)&&(E="");return h+=E+k,t.inFlow?w&&s&&s():S&&!w?h+=Be(h,t.indent,l(S)):g&&i&&i(),h}function ks(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const It="<<",Ie={identify:n=>n===It||typeof n=="symbol"&&n.description===It,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new O(Symbol(It)),{addToJSMap:Es}),stringify:()=>It},Ki=(n,e)=>(Ie.identify(e)||W(e)&&(!e.type||e.type===O.PLAIN)&&Ie.identify(e.value))&&(n==null?void 0:n.doc.schema.tags.some(t=>t.tag===Ie.tag&&t.default));function Es(n,e,t){if(t=n&&De(t)?t.resolve(n.doc):t,wt(t))for(const s of t.items)en(n,e,s);else if(Array.isArray(t))for(const s of t)en(n,e,s);else en(n,e,t)}function en(n,e,t){const s=n&&De(t)?t.resolve(n.doc):t;if(!vt(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,r]of i)e instanceof Map?e.has(a)||e.set(a,r):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function Is(n,e,{key:t,value:s}){if(Q(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Ki(n,t))Es(n,e,s);else{const i=pe(t,"",n);if(e instanceof Map)e.set(i,pe(s,i,n));else if(e instanceof Set)e.add(i);else{const a=qi(t,i,n),r=pe(s,a,n);a in e?Object.defineProperty(e,a,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[a]=r}}return e}function qi(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Q(n)&&(t!=null&&t.doc)){const s=Ss(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),ks(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function Tn(n,e,t){const s=gt(n,void 0,t),i=gt(e,void 0,t);return new ce(s,i)}class ce{constructor(e,t=null){Object.defineProperty(this,ge,{value:ms}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return Q(t)&&(t=t.clone(e)),Q(s)&&(s=s.clone(e)),new ce(t,s)}toJSON(e,t){const s=t!=null&&t.mapAsMap?new Map:{};return Is(t,s,this)}toString(e,t,s){return e!=null&&e.doc?ji(this,e,t,s):JSON.stringify(this)}}function Ns(n,e,t){return(e.inFlow??n.flow?Yi:Wi)(n,e,t)}function Wi({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:r,onComment:o}){const{indent:c,options:{commentString:l}}=t,u=Object.assign({},t,{indent:a,type:null});let d=!1;const m=[];for(let y=0;y<e.length;++y){const g=e[y];let h=null;if(Q(g))!d&&g.spaceBefore&&m.push(""),xt(t,m,g.commentBefore,d),g.comment&&(h=g.comment);else if(X(g)){const v=Q(g.key)?g.key:null;v&&(!d&&v.spaceBefore&&m.push(""),xt(t,m,v.commentBefore,d))}d=!1;let b=et(g,u,()=>h=null,()=>d=!0);h&&(b+=Be(b,a,l(h))),d&&h&&(d=!1),m.push(s+b)}let f;if(m.length===0)f=i.start+i.end;else{f=m[0];for(let y=1;y<m.length;++y){const g=m[y];f+=g?`
${c}${g}`:`
`}}return n?(f+=`
`+Ee(l(n),c),o&&o()):d&&r&&r(),f}function Yi({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:r,options:{commentString:o}}=e;s+=a;const c=Object.assign({},e,{indent:s,inFlow:!0,type:null});let l=!1,u=0;const d=[];for(let y=0;y<n.length;++y){const g=n[y];let h=null;if(Q(g))g.spaceBefore&&d.push(""),xt(e,d,g.commentBefore,!1),g.comment&&(h=g.comment);else if(X(g)){const v=Q(g.key)?g.key:null;v&&(v.spaceBefore&&d.push(""),xt(e,d,v.commentBefore,!1),v.comment&&(l=!0));const S=Q(g.value)?g.value:null;S?(S.comment&&(h=S.comment),S.commentBefore&&(l=!0)):g.value==null&&(v!=null&&v.comment)&&(h=v.comment)}h&&(l=!0);let b=et(g,c,()=>h=null);l||(l=d.length>u||b.includes(`
`)),y<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(l||(l=d.reduce((v,S)=>v+S.length+2,2)+(b.length+2)>e.options.lineWidth)),l&&(b+=",")),h&&(b+=Be(b,s,o(h))),d.push(b),u=d.length}const{start:m,end:f}=t;if(d.length===0)return m+f;if(!l){const y=d.reduce((g,h)=>g+h.length+2,2);l=e.options.lineWidth>0&&y>e.options.lineWidth}if(l){let y=m;for(const g of d)y+=g?`
${a}${i}${g}`:`
`;return`${y}
${i}${f}`}else return`${m}${r}${d.join(" ")}${r}${f}`}function xt({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=Ee(e(s),n);t.push(a.trimStart())}}function Ue(n,e){const t=W(e)?e.value:e;for(const s of n)if(X(s)&&(s.key===e||s.key===t||W(s.key)&&s.key.value===t))return s}class me extends ws{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Me,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,r=new this(e),o=(c,l)=>{if(typeof a=="function")l=a.call(t,c,l);else if(Array.isArray(a)&&!a.includes(c))return;(l!==void 0||i)&&r.items.push(Tn(c,l,s))};if(t instanceof Map)for(const[c,l]of t)o(c,l);else if(t&&typeof t=="object")for(const c of Object.keys(t))o(c,t[c]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){var r;let s;X(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new ce(e,e==null?void 0:e.value):s=new ce(e.key,e.value);const i=Ue(this.items,s.key),a=(r=this.schema)==null?void 0:r.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);W(i.value)&&vs(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(c=>a(s,c)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=Ue(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const s=Ue(this.items,e),i=s==null?void 0:s.value;return(!t&&W(i)?i.value:i)??void 0}has(e){return!!Ue(this.items,e)}set(e,t){this.add(new ce(e,t),!0)}toJSON(e,t,s){const i=s?new s:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(i);for(const a of this.items)Is(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!X(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Ns(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const it={collection:"map",default:!0,nodeClass:me,tag:"tag:yaml.org,2002:map",resolve(n,e){return vt(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>me.from(n,e,t)};class Ve extends ws{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(nt,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Nt(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Nt(e);if(typeof s!="number")return;const i=this.items[s];return!t&&W(i)?i.value:i}has(e){const t=Nt(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Nt(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];W(i)&&vs(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t!=null&&t.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(pe(a,String(i++),t));return s}toString(e,t,s){return e?Ns(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let o of t){if(typeof i=="function"){const c=t instanceof Set?o:String(r++);o=i.call(t,c,o)}a.items.push(gt(o,void 0,s))}}return a}}function Nt(n){let e=W(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const at={collection:"seq",default:!0,nodeClass:Ve,tag:"tag:yaml.org,2002:seq",resolve(n,e){return wt(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Ve.from(n,e,t)},Dt={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),Cn(n,e,t,s)}},jt={identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new O(null),stringify:({source:n},e)=>typeof n=="string"&&jt.test.test(n)?n:e.options.nullStr},An={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new O(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&An.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function _e({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(a)){let r=a.indexOf(".");r<0&&(r=a.length,a+=".");let o=e-(a.length-r-1);for(;o-- >0;)a+="0"}return a}const Ls={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:_e},Cs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():_e(n)}},Ts={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new O(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:_e},Kt=n=>typeof n=="bigint"||Number.isInteger(n),Mn=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function As(n,e,t){const{value:s}=n;return Kt(s)&&s>=0?t+s.toString(e):_e(n)}const Ms={identify:n=>Kt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Mn(n,2,8,t),stringify:n=>As(n,8,"0o")},Os={identify:Kt,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Mn(n,0,10,t),stringify:_e},Ps={identify:n=>Kt(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Mn(n,2,16,t),stringify:n=>As(n,16,"0x")},Gi=[it,at,Dt,jt,An,Ms,Os,Ps,Ls,Cs,Ts];function Jn(n){return typeof n=="bigint"||Number.isInteger(n)}const Lt=({value:n})=>JSON.stringify(n),Ji=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Lt},{identify:n=>n==null,createNode:()=>new O(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Lt},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Lt},{identify:Jn,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>Jn(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Lt}],zi={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Qi=[it,at].concat(Ji,zi),On={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const r=t;let o;if(typeof btoa=="function"){let c="";for(let l=0;l<r.length;++l)c+=String.fromCharCode(r[l]);o=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=O.BLOCK_LITERAL),e!==O.QUOTE_DOUBLE){const c=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),l=Math.ceil(o.length/c),u=new Array(l);for(let d=0,m=0;d<l;++d,m+=c)u[d]=o.substr(m,c);o=u.join(e===O.BLOCK_LITERAL?`
`:" ")}return Cn({comment:n,type:e,value:o},s,i,a)}};function $s(n,e){if(wt(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!X(s)){if(vt(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new ce(new O(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=X(s)?s:new ce(s)}}else e("Expected a sequence for this tag");return n}function xs(n,e,t){const{replacer:s}=t,i=new Ve(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(a++),r));let o,c;if(Array.isArray(r))if(r.length===2)o=r[0],c=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const l=Object.keys(r);if(l.length===1)o=l[0],c=r[o];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else o=r;i.items.push(Tn(o,c,t))}return i}const Pn={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:$s,createNode:xs};class Xe extends Ve{constructor(){super(),this.add=me.prototype.add.bind(this),this.delete=me.prototype.delete.bind(this),this.get=me.prototype.get.bind(this),this.has=me.prototype.has.bind(this),this.set=me.prototype.set.bind(this),this.tag=Xe.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t!=null&&t.onCreate&&t.onCreate(s);for(const i of this.items){let a,r;if(X(i)?(a=pe(i.key,"",t),r=pe(i.value,a,t)):a=pe(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,r)}return s}static from(e,t,s){const i=xs(e,t,s),a=new this;return a.items=i.items,a}}Xe.tag="tag:yaml.org,2002:omap";const $n={collection:"seq",identify:n=>n instanceof Map,nodeClass:Xe,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=$s(n,e),s=[];for(const{key:i}of t.items)W(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new Xe,t)},createNode:(n,e,t)=>Xe.from(n,e,t)};function Rs({value:n,source:e},t){return e&&(n?Fs:Bs).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const Fs={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new O(!0),stringify:Rs},Bs={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new O(!1),stringify:Rs},Xi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:_e},Zi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():_e(n)}},ea={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new O(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:_e},_t=n=>typeof n=="bigint"||Number.isInteger(n);function qt(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const a=parseInt(n,t);return i==="-"?-1*a:a}function xn(n,e,t){const{value:s}=n;if(_t(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return _e(n)}const ta={identify:_t,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>qt(n,2,2,t),stringify:n=>xn(n,2,"0b")},na={identify:_t,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>qt(n,1,8,t),stringify:n=>xn(n,8,"0")},sa={identify:_t,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>qt(n,0,10,t),stringify:_e},ia={identify:_t,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>qt(n,2,16,t),stringify:n=>xn(n,16,"0x")};class Ze extends me{constructor(e){super(e),this.tag=Ze.tag}add(e){let t;X(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new ce(e.key,null):t=new ce(e,null),Ue(this.items,t.key)||this.items.push(t)}get(e,t){const s=Ue(this.items,e);return!t&&X(s)?W(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=Ue(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new ce(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),a.items.push(Tn(r,null,s));return a}}Ze.tag="tag:yaml.org,2002:set";const Rn={collection:"map",identify:n=>n instanceof Set,nodeClass:Ze,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>Ze.from(n,e,t),resolve(n,e){if(vt(n)){if(n.hasAllNullValues(!0))return Object.assign(new Ze,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function Fn(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),a=s.replace(/_/g,"").split(":").reduce((r,o)=>r*i(60)+i(o),i(0));return t==="-"?i(-1)*a:a}function Us(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return _e(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Vs={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Fn(n,t),stringify:Us},Hs={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Fn(n,!1),stringify:Us},Wt={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Wt.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,r,o]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0;let l=Date.UTC(t,s-1,i,a||0,r||0,o||0,c);const u=e[8];if(u&&u!=="Z"){let d=Fn(u,!1);Math.abs(d)<30&&(d*=60),l-=6e4*d}return new Date(l)},stringify:({value:n})=>(n==null?void 0:n.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},zn=[it,at,Dt,jt,Fs,Bs,ta,na,sa,ia,Xi,Zi,ea,On,Ie,$n,Pn,Rn,Vs,Hs,Wt],Qn=new Map([["core",Gi],["failsafe",[it,at,Dt]],["json",Qi],["yaml11",zn],["yaml-1.1",zn]]),Xn={binary:On,bool:An,float:Ts,floatExp:Cs,floatNaN:Ls,floatTime:Hs,int:Os,intHex:Ps,intOct:Ms,intTime:Vs,map:it,merge:Ie,null:jt,omap:$n,pairs:Pn,seq:at,set:Rn,timestamp:Wt},aa={"tag:yaml.org,2002:binary":On,"tag:yaml.org,2002:merge":Ie,"tag:yaml.org,2002:omap":$n,"tag:yaml.org,2002:pairs":Pn,"tag:yaml.org,2002:set":Rn,"tag:yaml.org,2002:timestamp":Wt};function tn(n,e,t){const s=Qn.get(e);if(s&&!n)return t&&!s.includes(Ie)?s.concat(Ie):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Qn.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(Ie)),i.reduce((a,r)=>{const o=typeof r=="string"?Xn[r]:r;if(!o){const c=JSON.stringify(r),l=Object.keys(Xn).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return a.includes(o)||a.push(o),a},[])}const ra=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class Bn{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:r,toStringDefaults:o}){this.compat=Array.isArray(e)?tn(e,"compat"):e?tn(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?aa:{},this.tags=tn(t,this.name,s),this.toStringOptions=o??null,Object.defineProperty(this,Me,{value:it}),Object.defineProperty(this,ke,{value:Dt}),Object.defineProperty(this,nt,{value:at}),this.sortMapEntries=typeof r=="function"?r:r===!0?ra:null}clone(){const e=Object.create(Bn.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function oa(n,e){var c;const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ss(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(Ee(l,""))}let r=!1,o=null;if(n.contents){if(Q(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=a(n.contents.commentBefore);t.push(Ee(d,""))}i.forceBlockIndent=!!n.comment,o=n.contents.comment}const l=o?void 0:()=>r=!0;let u=et(n.contents,i,()=>o=null,l);o&&(u+=Be(u,"",a(o))),(u[0]==="|"||u[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${u}`:t.push(u)}else t.push(et(n.contents,i));if((c=n.directives)!=null&&c.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(Ee(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||o)&&t[t.length-1]!==""&&t.push(""),t.push(Ee(a(l),"")))}return t.join(`
`)+`
`}class Yt{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,ge,{value:pn});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:r}=a;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new le({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Yt.prototype,{[ge]:{value:pn}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=Q(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Ke(this.contents)&&this.contents.add(e)}addIn(e,t){Ke(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=ys(this);e.anchor=!t||s.has(t)?bs(t||"a",s):t}return new Ln(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const h=v=>typeof v=="number"||v instanceof String||v instanceof Number,b=t.filter(h).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:r,flow:o,keepUndefined:c,onTagObj:l,tag:u}=s??{},{onAnchor:d,setAnchors:m,sourceObjects:f}=xi(this,r||"a"),y={aliasDuplicateObjects:a??!0,keepUndefined:c??!1,onAnchor:d,onTagObj:l,replacer:i,schema:this.schema,sourceObjects:f},g=gt(e,u,y);return o&&z(g)&&(g.flow=!0),m(),g}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new ce(i,a)}delete(e){return Ke(this.contents)?this.contents.delete(e):!1}deleteIn(e){return ft(e)?this.contents==null?!1:(this.contents=null,!0):Ke(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return z(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return ft(e)?!t&&W(this.contents)?this.contents.value:this.contents:z(this.contents)?this.contents.getIn(e,t):void 0}has(e){return z(this.contents)?this.contents.has(e):!1}hasIn(e){return ft(e)?this.contents!==void 0:z(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=$t(this.schema,[e],t):Ke(this.contents)&&this.contents.set(e,t)}setIn(e,t){ft(e)?this.contents=t:this.contents==null?this.contents=$t(this.schema,Array.from(e),t):Ke(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new le({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new le({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new Bn(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:r}={}){const o={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},c=pe(this.contents,t??"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof r=="function"?Je(r,{"":c},"",c):c}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return oa(this,e)}}function Ke(n){if(z(n))return!0;throw new Error("Expected a YAML collection as document contents")}class Ds extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class ht extends Ds{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class la extends Ds{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Zn=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(o=>e.linePos(o));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&r.length>80){const o=Math.min(a-39,r.length-79);r="…"+r.substring(o),a-=o-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,a))){let o=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);o.length>80&&(o=o.substring(0,79)+`…
`),r=o+r}if(/[^ ]/.test(r)){let o=1;const c=t.linePos[1];(c==null?void 0:c.line)===s&&c.col>i&&(o=Math.max(1,Math.min(c.col-i,80-a)));const l=" ".repeat(a)+"^".repeat(o);t.message+=`:

${r}
${l}
`}};function tt(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:r,startOnNewline:o}){let c=!1,l=o,u=o,d="",m="",f=!1,y=!1,g=null,h=null,b=null,v=null,S=null,w=null,k=null;for(const _ of n)switch(y&&(_.type!=="space"&&_.type!=="newline"&&_.type!=="comma"&&a(_.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),g&&(l&&_.type!=="comment"&&_.type!=="newline"&&a(g,"TAB_AS_INDENT","Tabs are not allowed as indentation"),g=null),_.type){case"space":!e&&(t!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&_.source.includes("	")&&(g=_),u=!0;break;case"comment":{u||a(_,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const T=_.source.substring(1)||" ";d?d+=m+T:d=T,m="",l=!1;break}case"newline":l?d?d+=_.source:(!w||t!=="seq-item-ind")&&(c=!0):m+=_.source,l=!0,f=!0,(h||b)&&(v=_),u=!0;break;case"anchor":h&&a(_,"MULTIPLE_ANCHORS","A node can have at most one anchor"),_.source.endsWith(":")&&a(_.offset+_.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),h=_,k??(k=_.offset),l=!1,u=!1,y=!0;break;case"tag":{b&&a(_,"MULTIPLE_TAGS","A node can have at most one tag"),b=_,k??(k=_.offset),l=!1,u=!1,y=!0;break}case t:(h||b)&&a(_,"BAD_PROP_ORDER",`Anchors and tags must be after the ${_.source} indicator`),w&&a(_,"UNEXPECTED_TOKEN",`Unexpected ${_.source} in ${e??"collection"}`),w=_,l=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){S&&a(_,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),S=_,l=!1,u=!1;break}default:a(_,"UNEXPECTED_TOKEN",`Unexpected ${_.type} token`),l=!1,u=!1}const E=n[n.length-1],N=E?E.offset+E.source.length:i;return y&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g&&(l&&g.indent<=r||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&a(g,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:S,found:w,spaceBefore:c,comment:d,hasNewline:f,anchor:h,tag:b,newlineAfterProp:v,end:N,start:k??N}}function yt(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(yt(e.key)||yt(e.value))return!0}return!1;default:return!0}}function vn(n,e,t){if((e==null?void 0:e.type)==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&yt(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function js(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,r)=>a===r||W(a)&&W(r)&&a.value===r.value;return e.some(a=>i(a.key,t))}const es="All mapping items must start at the same column";function ca({composeNode:n,composeEmptyNode:e},t,s,i,a){var u;const r=(a==null?void 0:a.nodeClass)??me,o=new r(t.schema);t.atRoot&&(t.atRoot=!1);let c=s.offset,l=null;for(const d of s.items){const{start:m,key:f,sep:y,value:g}=d,h=tt(m,{indicator:"explicit-key-ind",next:f??(y==null?void 0:y[0]),offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0}),b=!h.found;if(b){if(f&&(f.type==="block-seq"?i(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in f&&f.indent!==s.indent&&i(c,"BAD_INDENT",es)),!h.anchor&&!h.tag&&!y){l=h.end,h.comment&&(o.comment?o.comment+=`
`+h.comment:o.comment=h.comment);continue}(h.newlineAfterProp||yt(f))&&i(f??m[m.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((u=h.found)==null?void 0:u.indent)!==s.indent&&i(c,"BAD_INDENT",es);t.atKey=!0;const v=h.end,S=f?n(t,f,h,i):e(t,v,m,null,h,i);t.schema.compat&&vn(s.indent,f,i),t.atKey=!1,js(t,o.items,S)&&i(v,"DUPLICATE_KEY","Map keys must be unique");const w=tt(y??[],{indicator:"map-value-ind",next:g,offset:S.range[2],onError:i,parentIndent:s.indent,startOnNewline:!f||f.type==="block-scalar"});if(c=w.end,w.found){b&&((g==null?void 0:g.type)==="block-map"&&!w.hasNewline&&i(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&h.start<w.found.offset-1024&&i(S.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const k=g?n(t,g,w,i):e(t,c,y,null,w,i);t.schema.compat&&vn(s.indent,g,i),c=k.range[2];const E=new ce(S,k);t.options.keepSourceTokens&&(E.srcToken=d),o.items.push(E)}else{b&&i(S.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),w.comment&&(S.comment?S.comment+=`
`+w.comment:S.comment=w.comment);const k=new ce(S);t.options.keepSourceTokens&&(k.srcToken=d),o.items.push(k)}}return l&&l<c&&i(l,"IMPOSSIBLE","Map comment with trailing content"),o.range=[s.offset,c,l??c],o}function ua({composeNode:n,composeEmptyNode:e},t,s,i,a){const r=(a==null?void 0:a.nodeClass)??Ve,o=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let c=s.offset,l=null;for(const{start:u,value:d}of s.items){const m=tt(u,{indicator:"seq-item-ind",next:d,offset:c,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!m.found)if(m.anchor||m.tag||d)(d==null?void 0:d.type)==="block-seq"?i(m.end,"BAD_INDENT","All sequence items must start at the same column"):i(c,"MISSING_CHAR","Sequence item without - indicator");else{l=m.end,m.comment&&(o.comment=m.comment);continue}const f=d?n(t,d,m,i):e(t,m.end,u,null,m,i);t.schema.compat&&vn(s.indent,d,i),c=f.range[2],o.items.push(f)}return o.range=[s.offset,c,l??c],o}function St(n,e,t,s){let i="";if(n){let a=!1,r="";for(const o of n){const{source:c,type:l}=o;switch(l){case"space":a=!0;break;case"comment":{t&&!a&&s(o,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const u=c.substring(1)||" ";i?i+=r+u:i=u,r="";break}case"newline":i&&(r+=c),a=!0;break;default:s(o,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:i,offset:e}}const nn="Block collections are not allowed within flow collections",sn=n=>n&&(n.type==="block-map"||n.type==="block-seq");function da({composeNode:n,composeEmptyNode:e},t,s,i,a){var h;const r=s.start.source==="{",o=r?"flow map":"flow sequence",c=(a==null?void 0:a.nodeClass)??(r?me:Ve),l=new c(t.schema);l.flow=!0;const u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let d=s.offset+s.start.source.length;for(let b=0;b<s.items.length;++b){const v=s.items[b],{start:S,key:w,sep:k,value:E}=v,N=tt(S,{flow:o,indicator:"explicit-key-ind",next:w??(k==null?void 0:k[0]),offset:d,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!N.found){if(!N.anchor&&!N.tag&&!k&&!E){b===0&&N.comma?i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`):b<s.items.length-1&&i(N.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${o}`),N.comment&&(l.comment?l.comment+=`
`+N.comment:l.comment=N.comment),d=N.end;continue}!r&&t.options.strict&&yt(w)&&i(w,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(b===0)N.comma&&i(N.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${o}`);else if(N.comma||i(N.start,"MISSING_CHAR",`Missing , between ${o} items`),N.comment){let _="";e:for(const T of S)switch(T.type){case"comma":case"space":break;case"comment":_=T.source.substring(1);break e;default:break e}if(_){let T=l.items[l.items.length-1];X(T)&&(T=T.value??T.key),T.comment?T.comment+=`
`+_:T.comment=_,N.comment=N.comment.substring(_.length+1)}}if(!r&&!k&&!N.found){const _=E?n(t,E,N,i):e(t,N.end,k,null,N,i);l.items.push(_),d=_.range[2],sn(E)&&i(_.range,"BLOCK_IN_FLOW",nn)}else{t.atKey=!0;const _=N.end,T=w?n(t,w,N,i):e(t,_,S,null,N,i);sn(w)&&i(T.range,"BLOCK_IN_FLOW",nn),t.atKey=!1;const A=tt(k??[],{flow:o,indicator:"map-value-ind",next:E,offset:T.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(A.found){if(!r&&!N.found&&t.options.strict){if(k)for(const R of k){if(R===A.found)break;if(R.type==="newline"){i(R,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}N.start<A.found.offset-1024&&i(A.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else E&&("source"in E&&((h=E.source)==null?void 0:h[0])===":"?i(E,"MISSING_CHAR",`Missing space after : in ${o}`):i(A.start,"MISSING_CHAR",`Missing , or : between ${o} items`));const H=E?n(t,E,A,i):A.found?e(t,A.end,k,null,A,i):null;H?sn(E)&&i(H.range,"BLOCK_IN_FLOW",nn):A.comment&&(T.comment?T.comment+=`
`+A.comment:T.comment=A.comment);const D=new ce(T,H);if(t.options.keepSourceTokens&&(D.srcToken=v),r){const R=l;js(t,R.items,T)&&i(_,"DUPLICATE_KEY","Map keys must be unique"),R.items.push(D)}else{const R=new me(t.schema);R.flow=!0,R.items.push(D);const Y=(H??T).range;R.range=[T.range[0],Y[1],Y[2]],l.items.push(R)}d=H?H.range[2]:A.end}}const m=r?"}":"]",[f,...y]=s.end;let g=d;if((f==null?void 0:f.source)===m)g=f.offset+f.source.length;else{const b=o[0].toUpperCase()+o.substring(1),v=u?`${b} must end with a ${m}`:`${b} in block collection must be sufficiently indented and end with a ${m}`;i(d,u?"MISSING_CHAR":"BAD_INDENT",v),f&&f.source.length!==1&&y.unshift(f)}if(y.length>0){const b=St(y,g,t.options.strict,i);b.comment&&(l.comment?l.comment+=`
`+b.comment:l.comment=b.comment),l.range=[s.offset,g,b.offset]}else l.range=[s.offset,g,g];return l}function an(n,e,t,s,i,a){const r=t.type==="block-map"?ca(n,e,t,s,a):t.type==="block-seq"?ua(n,e,t,s,a):da(n,e,t,s,a),o=r.constructor;return i==="!"||i===o.tagName?(r.tag=o.tagName,r):(i&&(r.tag=i),r)}function fa(n,e,t,s,i){var m;const a=s.tag,r=a?e.directives.tagName(a.source,f=>i(a,"TAG_RESOLVE_FAILED",f)):null;if(t.type==="block-seq"){const{anchor:f,newlineAfterProp:y}=s,g=f&&a?f.offset>a.offset?f:a:f??a;g&&(!y||y.offset<g.offset)&&i(g,"MISSING_CHAR","Missing newline after block sequence props")}const o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!r||r==="!"||r===me.tagName&&o==="map"||r===Ve.tagName&&o==="seq")return an(n,e,t,i,r);let c=e.schema.tags.find(f=>f.tag===r&&f.collection===o);if(!c){const f=e.schema.knownTags[r];if((f==null?void 0:f.collection)===o)e.schema.tags.push(Object.assign({},f,{default:!1})),c=f;else return f?i(a,"BAD_COLLECTION_TYPE",`${f.tag} used for ${o} collection, but expects ${f.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),an(n,e,t,i,r)}const l=an(n,e,t,i,r,c),u=((m=c.resolve)==null?void 0:m.call(c,l,f=>i(a,"TAG_RESOLVE_FAILED",f),e.options))??l,d=Q(u)?u:new O(u);return d.range=l.range,d.tag=r,c!=null&&c.format&&(d.format=c.format),d}function ha(n,e,t){const s=e.offset,i=ma(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?O.BLOCK_FOLDED:O.BLOCK_LITERAL,r=e.source?pa(e.source):[];let o=r.length;for(let g=r.length-1;g>=0;--g){const h=r[g][1];if(h===""||h==="\r")o=g;else break}if(o===0){const g=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let h=s+i.length;return e.source&&(h+=e.source.length),{value:g,type:a,comment:i.comment,range:[s,h,h]}}let c=e.indent+i.indent,l=e.offset+i.length,u=0;for(let g=0;g<o;++g){const[h,b]=r[g];if(b===""||b==="\r")i.indent===0&&h.length>c&&(c=h.length);else{h.length<c&&t(l+h.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(c=h.length),u=g,c===0&&!n.atRoot&&t(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=h.length+b.length+1}for(let g=r.length-1;g>=o;--g)r[g][0].length>c&&(o=g+1);let d="",m="",f=!1;for(let g=0;g<u;++g)d+=r[g][0].slice(c)+`
`;for(let g=u;g<o;++g){let[h,b]=r[g];l+=h.length+b.length+1;const v=b[b.length-1]==="\r";if(v&&(b=b.slice(0,-1)),b&&h.length<c){const w=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(l-b.length-(v?2:1),"BAD_INDENT",w),h=""}a===O.BLOCK_LITERAL?(d+=m+h.slice(c)+b,m=`
`):h.length>c||b[0]==="	"?(m===" "?m=`
`:!f&&m===`
`&&(m=`

`),d+=m+h.slice(c)+b,m=`
`,f=!0):b===""?m===`
`?d+=`
`:m=`
`:(d+=m+b,m=" ",f=!1)}switch(i.chomp){case"-":break;case"+":for(let g=o;g<r.length;++g)d+=`
`+r[g][0].slice(c);d[d.length-1]!==`
`&&(d+=`
`);break;default:d+=`
`}const y=s+i.length+e.source.length;return{value:d,type:a,comment:i.comment,range:[s,y,y]}}function ma({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let r=0,o="",c=-1;for(let m=1;m<i.length;++m){const f=i[m];if(!o&&(f==="-"||f==="+"))o=f;else{const y=Number(f);!r&&y?r=y:c===-1&&(c=n+m)}}c!==-1&&s(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let l=!1,u="",d=i.length;for(let m=1;m<e.length;++m){const f=e[m];switch(f.type){case"space":l=!0;case"newline":d+=f.source.length;break;case"comment":t&&!l&&s(f,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),d+=f.source.length,u=f.source.substring(1);break;case"error":s(f,"UNEXPECTED_TOKEN",f.message),d+=f.source.length;break;default:{const y=`Unexpected token in block scalar header: ${f.type}`;s(f,"UNEXPECTED_TOKEN",y);const g=f.source;g&&typeof g=="string"&&(d+=g.length)}}}return{mode:a,indent:r,chomp:o,comment:u,length:d}}function pa(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s!=null&&s[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)a.push([e[r],e[r+1]]);return a}function ga(n,e,t){const{offset:s,type:i,source:a,end:r}=n;let o,c;const l=(m,f,y)=>t(s+m,f,y);switch(i){case"scalar":o=O.PLAIN,c=ya(a,l);break;case"single-quoted-scalar":o=O.QUOTE_SINGLE,c=ba(a,l);break;case"double-quoted-scalar":o=O.QUOTE_DOUBLE,c=va(a,l);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const u=s+a.length,d=St(r,u,e,t);return{value:c,type:o,comment:d.comment,range:[s,u,d.offset]}}function ya(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Ks(n)}function ba(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Ks(n.slice(1,-1)).replace(/''/g,"'")}function Ks(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),r=t.lastIndex;const o=/[ \t]*(.*)/sy;return o.lastIndex=r,s=o.exec(n),i+a+((s==null?void 0:s[1])??"")}function va(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:r}=wa(n,s);t+=a,s=r}else if(i==="\\"){let a=n[++s];const r=_a[a];if(r)t+=r;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const o={x:2,u:4,U:8}[a];t+=Sa(n,s+1,o,e),s+=o}else{const o=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),t+=o}}else if(i===" "||i==="	"){const a=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function wa(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const _a={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Sa(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(r)){const o=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${o}`),o}return String.fromCodePoint(r)}function qs(n,e,t,s){const{value:i,type:a,comment:r,range:o}=e.type==="block-scalar"?ha(n,e,s):ga(e,n.options.strict,s),c=t?n.directives.tagName(t.source,d=>s(t,"TAG_RESOLVE_FAILED",d)):null;let l;n.options.stringKeys&&n.atKey?l=n.schema[ke]:c?l=ka(n.schema,i,c,t,s):e.type==="scalar"?l=Ea(n,i,e,s):l=n.schema[ke];let u;try{const d=l.resolve(i,m=>s(t??e,"TAG_RESOLVE_FAILED",m),n.options);u=W(d)?d:new O(d)}catch(d){const m=d instanceof Error?d.message:String(d);s(t??e,"TAG_RESOLVE_FAILED",m),u=new O(i)}return u.range=o,u.source=i,a&&(u.type=a),c&&(u.tag=c),l.format&&(u.format=l.format),r&&(u.comment=r),u}function ka(n,e,t,s,i){var o;if(t==="!")return n[ke];const a=[];for(const c of n.tags)if(!c.collection&&c.tag===t)if(c.default&&c.test)a.push(c);else return c;for(const c of a)if((o=c.test)!=null&&o.test(e))return c;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[ke])}function Ea({atKey:n,directives:e,schema:t},s,i,a){const r=t.tags.find(o=>{var c;return(o.default===!0||n&&o.default==="key")&&((c=o.test)==null?void 0:c.test(s))})||t[ke];if(t.compat){const o=t.compat.find(c=>{var l;return c.default&&((l=c.test)==null?void 0:l.test(s))})??t[ke];if(r.tag!==o.tag){const c=e.tagString(r.tag),l=e.tagString(o.tag),u=`Value may be parsed as either ${c} or ${l}`;a(i,"TAG_RESOLVE_FAILED",u,!0)}}return r}function Ia(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];(i==null?void 0:i.type)==="space";)n+=i.source.length,i=e[++s];break}}return n}const Na={composeNode:Ws,composeEmptyNode:Un};function Ws(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:r,anchor:o,tag:c}=t;let l,u=!0;switch(e.type){case"alias":l=La(n,e,s),(o||c)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=qs(n,e,c,s),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{l=fa(Na,n,e,t,s),o&&(l.anchor=o.source.substring(1))}catch(d){const m=d instanceof Error?d.message:String(d);s(e,"RESOURCE_EXHAUSTION",m)}break;default:{const d=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",d),u=!1}}return l??(l=Un(n,e.offset,void 0,null,t,s)),o&&l.anchor===""&&s(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!W(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&s(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(l.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?l.comment=r:l.commentBefore=r),n.options.keepSourceTokens&&u&&(l.srcToken=e),l}function Un(n,e,t,s,{spaceBefore:i,comment:a,anchor:r,tag:o,end:c},l){const u={type:"scalar",offset:Ia(e,t,s),indent:-1,source:""},d=qs(n,u,o,l);return r&&(d.anchor=r.source.substring(1),d.anchor===""&&l(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(d.spaceBefore=!0),a&&(d.comment=a,d.range[2]=c),d}function La({options:n},{offset:e,source:t,end:s},i){const a=new Ln(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,o=St(s,r,n.strict,i);return a.range=[e,r,o.offset],o.comment&&(a.comment=o.comment),a}function Ca(n,e,{offset:t,start:s,value:i,end:a},r){const o=Object.assign({_directives:e},n),c=new Yt(void 0,o),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=tt(s,{indicator:"doc-start",next:i??(a==null?void 0:a[0]),offset:t,onError:r,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&r(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=i?Ws(l,i,u,r):Un(l,u.end,s,null,u,r);const d=c.contents.range[2],m=St(a,d,!1,r);return m.comment&&(c.comment=m.comment),c.range=[t,d,m.offset],c}function ct(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function ts(n){var i;let e="",t=!1,s=!1;for(let a=0;a<n.length;++a){const r=n[a];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":((i=n[a+1])==null?void 0:i[0])!=="#"&&(a+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class Ta{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const r=ct(t);a?this.warnings.push(new la(r,s,i)):this.errors.push(new ht(r,s,i))},this.directives=new le({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=ts(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(z(a)&&!a.flow&&a.items.length>0){let r=a.items[0];X(r)&&(r=r.key);const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}else{const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:ts(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=ct(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Ca(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new ht(ct(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new ht(ct(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=St(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new ht(ct(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Yt(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const Ys="\uFEFF",Gs="",Js="",wn="";function Aa(n){switch(n){case Ys:return"byte-order-mark";case Gs:return"doc-mode";case Js:return"flow-error-end";case wn:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function be(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const ns=new Set("0123456789ABCDEFabcdef"),Ma=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ct=new Set(",[]{}"),Oa=new Set(` ,[]{}
\r	`),rn=n=>!n||Oa.has(n);class Pa{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&be(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Ys&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Gs,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&be(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!be(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&be(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(rn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&be(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Js,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(rn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||be(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>be(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const r=this.buffer[a+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,r=this.buffer[a];r==="\r"&&(r=this.buffer[--a]);const o=a;for(;r===" ";)r=this.buffer[--a];if(r===`
`&&a>=this.pos&&a+1+t>o)e=a;else break}while(!0);return yield wn,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(be(a)||e&&Ct.has(a))break;t=s}else if(be(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Ct.has(a))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Ct.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield wn,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(rn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(be(t)||e&&Ct.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!be(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Ma.has(t))t=this.buffer[++e];else if(t==="%"&&ns.has(this.buffer[e+1])&&ns.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class $a{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function Ae(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function ss(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function zs(n){switch(n==null?void 0:n.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Tt(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function qe(n){var t;if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=n[++e])==null?void 0:t.type)==="space";);return n.splice(e,n.length)}function is(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!Ae(e.start,"explicit-key-ind")&&!Ae(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,zs(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}class xa{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Pa,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=Aa(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&is(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&ss(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{ss(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Tt(this.peek(2)),s=qe(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,a=i&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(a&&t.sep&&!t.value){const o=[];for(let c=0;c<t.sep.length;++c){const l=t.sep[c];switch(l.type){case"newline":o.push(c);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ae(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(zs(t.key)&&!Ae(t.sep,"newline")){const o=qe(t.start),c=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:c,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ae(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=qe(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ae(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);a||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Ae(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else i&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var s;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,a=Array.isArray(i)?i[i.length-1]:void 0;(a==null?void 0:a.type)==="comment"?i==null||i.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],a=(s=i==null?void 0:i.value)==null?void 0:s.end;if(Array.isArray(a)){Array.prototype.push.apply(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Ae(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const i=this.startBlockValue(e);if(i){this.stack.push(i);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Tt(s),a=qe(i);is(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Tt(e),s=qe(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Tt(e),s=qe(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Ra(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new $a||null,prettyErrors:e}}function Fa(n,e={}){const{lineCounter:t,prettyErrors:s}=Ra(e),i=new xa(t==null?void 0:t.addNewLine),a=new Ta(e);let r=null;for(const o of a.compose(i.parse(n),!0,n.length))if(!r)r=o;else if(r.options.logLevel!=="silent"){r.errors.push(new ht(o.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Zn(n,t)),r.warnings.forEach(Zn(n,t))),r}function Ne(n,e,t){let s;const i=Fa(n,t);if(!i)return null;if(i.warnings.forEach(a=>ks(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}const Ba=`# Simulation family catalog source-of-truth.
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
`,Ua=`# Parameter definitions for each simulation family.
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
`,Va=`# Summary overlay display configuration for each simulation family.
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
`,Ha=`# Live telemetry HUD display configuration for each simulation family.
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
`;function J(n){if(/^[a-z]+:\/\//i.test(n)||n.startsWith("data:")||n.startsWith("blob:"))return n;const e="/engine/",t=e.endsWith("/")?e:`${e}/`,s=n.startsWith("/")?n.slice(1):n;return`${t}${s}`}const Da=Ne(Ba),ja=Ne(Ua),as=Ne(Va),Ka=Ne(Ha),We=Object.entries(Da).map(([n,e])=>{var r,o;const t=qa(as[n]),s=(((r=as[n])==null?void 0:r.results)??[]).map(Wa),i=((o=Ka[n])==null?void 0:o.liveStats)??[],a=ja[n]??{};return{id:n,label:e.label,placeholderImage:J(e.placeholderImage),parameterSubtitle:e.parameterSubtitle,metadata:{results:s,summaryStats:t.map(_n),liveStats:i.map(_n)},parameters:Object.entries(a).map(([c,l])=>{const u=l.step??Ya(l.min,l.max),d=l.log_scale?Math.sqrt(l.min*l.max):Ga(l.min,l.max);return{id:c,label:l.label,unit:l.unit??"",min:l.min,max:l.max,step:u,fallbackValue:d,description:l.description,valueScale:l.value_scale,displayUnit:l.display_unit,displayFormat:l.display_format,displaySignificantFigures:l.display_significant_figures,logScale:l.log_scale}}),views:(e.views??[]).map(c=>({id:c.id,label:c.label,icon:c.icon,description:c.description}))}});function qa(n){if(!n)return[];const e=[];for(const t of n.resources??[])e.push({...t,section:"resources"});for(const t of n.simulationStats??[])e.push({...t,section:"simulationStats"});return n.similarityScore&&e.push({id:"similarityScore",value:n.similarityScore.value}),e}function _n(n){return{id:n.id,label:n.label,section:n.section,value:n.value,unit:n.unit,description:n.description,live:n.live??!1,liveKey:n.live_key,fromVideo:n.from_video??!1,videoKey:n.video_key,scaleWithTime:n.scale_with_time??!1,integer:n.integer??!1,valueScale:n.value_scale,displayFormat:n.display_format,precision:n.precision}}function Wa(n){return{..._n(n),target:n.target}}function Ya(n,e){const s=Math.max(e-n,1e-9)/100,i=10**Math.floor(Math.log10(s)),a=s/i;let r=1;return a<=1?r=1:a<=2?r=2:a<=5?r=5:r=10,r*i}function Ga(n,e){return n+(e-n)/2}const Qs="universe-engine-theme",Xs=[{id:"glass",label:"Glass",icon:"[ ]"},{id:"matrix",label:"Matrix",icon:"[#]"},{id:"hal",label:"HAL 9000",icon:"( )"},{id:"nostromo",label:"Nostromo",icon:"[=]"},{id:"tron",label:"Tron",icon:"<>"}];function Ja(){const n=localStorage.getItem(Qs);return Qa(n)?n:"glass"}function on(n){document.documentElement.setAttribute("data-theme",n),localStorage.setItem(Qs,n)}function za(n,e,t){const s=document.createElement("div");s.className="theme-picker";const i=new Map;for(const r of Xs){const o=document.createElement("button");o.className="theme-picker__option",o.type="button",o.innerHTML=`
      <span class="theme-picker__icon">${r.icon}</span>
      <span class="theme-picker__label">${r.label}</span>
    `,o.addEventListener("click",()=>{a(r.id),t(r.id)}),s.appendChild(o),i.set(r.id,o)}n.appendChild(s),a(e);function a(r){for(const[o,c]of i.entries()){const l=o===r;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}}return{setActive:a}}function Qa(n){return Xs.some(e=>e.id===n)}function Xa(n,e){const t=document.createElement("div");t.className="viewport";const s=document.createElement("video");s.className="viewport__media is-empty",s.src=e,s.loop=!1,s.muted=!0,s.playsInline=!0,s.preload="auto",s.setAttribute("aria-label","Simulation output"),t.appendChild(s),n.appendChild(t);let i,a,r;const o=new Map,c=new Map,l=new Map;let u=null,d=null;const m=document.createElement("canvas"),f=m.getContext("2d");s.addEventListener("play",()=>r==null?void 0:r(!1)),s.addEventListener("pause",()=>r==null?void 0:r(!0)),s.addEventListener("ended",()=>r==null?void 0:r(!0)),s.addEventListener("timeupdate",()=>{!i||!Number.isFinite(s.duration)||s.duration<=0||i(s.currentTime/s.duration)}),s.addEventListener("ended",()=>{a==null||a()});let y=s.playbackRate;function g(){u&&(URL.revokeObjectURL(u),u=null)}function h(C,P={}){const x=o.get(C);x&&(P={...P,ownedObjectUrl:!1},C=x),s.classList.add("fade-out"),window.setTimeout(()=>{if(s.src.endsWith(C)){s.classList.remove("fade-out");return}const B=s.muted,$=P.seekFraction;g(),d=null,u=P.ownedObjectUrl?C:null,s.src=C,s.load(),s.onloadeddata=()=>{if(s.muted=B,$!==void 0&&Number.isFinite(s.duration)&&s.duration>0){const U=Math.max(0,Math.min(.999,$));s.currentTime=U*s.duration}else s.currentTime=0;s.playbackRate=y,s.classList.remove("fade-out"),P.autoplay&&s.play().catch(()=>{})}},120)}function b(C){s.muted=C}async function v(){await s.play()}function S(){s.pause()}function w(){s.classList.add("is-empty")}function k(){s.classList.remove("is-empty")}function E(C){if(!Number.isFinite(s.duration)||s.duration<=0)return;const P=Math.max(0,Math.min(1,C));s.currentTime=P*s.duration}function N(){s.currentTime=0,i==null||i(0)}function _(C=8e3){return s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(P=>{const x=()=>{$(),P()},B=window.setTimeout(()=>{$(),P()},Math.max(0,C));function $(){window.clearTimeout(B),s.removeEventListener("loadeddata",x)}s.addEventListener("loadeddata",x,{once:!0})})}function T(C,P=8e3){const x=Math.max(0,C);return x===0||A(x)?Promise.resolve():new Promise(B=>{const $=()=>{A(x)&&(ee(),B())},U=window.setTimeout(()=>{ee(),B()},Math.max(0,P));function ee(){window.clearTimeout(U),s.removeEventListener("progress",$),s.removeEventListener("canplay",$),s.removeEventListener("loadeddata",$)}s.addEventListener("progress",$),s.addEventListener("canplay",$),s.addEventListener("loadeddata",$),$()})}function A(C){const P=s.currentTime;for(let x=0;x<s.buffered.length;x+=1){const B=s.buffered.start(x),$=s.buffered.end(x);if(!(P<B||P>$))return $-P>=C}return!1}async function H(C){const P=[...new Set(C.filter(Boolean))];await Promise.all(P.map(x=>R(x)))}function D(){for(const C of c.values())C.abort();c.clear()}async function R(C){if(o.has(C))return;const P=l.get(C);if(P){await P;return}const x=new AbortController,B=(async()=>{c.set(C,x);try{const $=await fetch(C,{signal:x.signal});if(!$.ok)throw new Error(`Failed to cache video source: ${C}`);const U=await $.blob();o.has(C)||o.set(C,URL.createObjectURL(U))}finally{c.get(C)===x&&c.delete(C),l.delete(C)}})();l.set(C,B),await B}function Y(){D();for(const C of o.values())URL.revokeObjectURL(C);o.clear()}function Z(){!f||s.readyState<2||s.videoWidth===0||s.videoHeight===0||(m.width=s.videoWidth,m.height=s.videoHeight,f.drawImage(s,0,0,m.width,m.height),d=m.toDataURL("image/jpeg",.85))}function se(){return d||Z(),d}function ae(C){i=C}function re(C){a=C}return{setSource:h,setMuted:b,play:v,pause:S,hideMedia:w,showMedia:k,seekToFraction:E,resetPlayback:N,waitForLoadedData:_,waitForBufferedAhead:T,onTimeUpdate:ae,onEnded:re,getDurationSeconds:()=>Number.isFinite(s.duration)?s.duration:0,getPlaybackFraction:()=>!Number.isFinite(s.duration)||s.duration<=0?0:s.currentTime/s.duration,isPaused:()=>s.paused,setPlaybackRate:C=>{y=C,s.playbackRate=C},getPlaybackRate:()=>y,onPlayStateChange:C=>{r=C},getElement:()=>t,cacheSources:H,clearCachedSources:Y,captureFrame:se}}const Za=[.25,.5,1,2];function er(n,e={}){const{onChange:t,onTogglePlay:s,onSpeedChange:i,onSummaryClick:a,onScrubStart:r,onScrubEnd:o,initialSpeed:c=1}=e,l=document.createElement("div");l.className="timeline";const u=document.createElement("div");u.className="timeline__bar-row";const d=document.createElement("button");d.className="timeline__play-btn",d.type="button",d.setAttribute("aria-label","Toggle playback"),d.addEventListener("click",()=>s==null?void 0:s());const m=document.createElement("input");m.className="timeline__slider",m.type="range",m.min="0",m.max="1000",m.step="1",m.value="0",m.style.setProperty("--fill","0%"),m.setAttribute("aria-label","Simulation time");const f=document.createElement("div");f.className="timeline__speed";const y=document.createElement("button");y.className="timeline__speed-btn",y.type="button",y.setAttribute("aria-label","Playback speed"),y.addEventListener("click",()=>{f.classList.toggle("open")});const g=document.createElement("div");g.className="timeline__speed-menu";for(const v of Za){const S=document.createElement("button");S.className="timeline__speed-option",S.type="button",S.textContent=ln(v),S.addEventListener("click",()=>{f.classList.remove("open"),i==null||i(v)}),g.appendChild(S)}f.appendChild(y),f.appendChild(g);const h=document.createElement("button");return h.className="timeline__summary-btn",h.type="button",h.setAttribute("aria-label","View run summary"),h.textContent="ⓘ",h.addEventListener("click",()=>a==null?void 0:a()),u.appendChild(d),u.appendChild(m),u.appendChild(f),u.appendChild(h),m.addEventListener("input",()=>{const v=parseInt(m.value,10)/1e3;m.style.setProperty("--fill",`${v*100}%`),t==null||t(v)}),m.addEventListener("pointerdown",()=>r==null?void 0:r()),m.addEventListener("pointerup",()=>o==null?void 0:o()),m.addEventListener("change",()=>o==null?void 0:o()),document.addEventListener("click",v=>{f.contains(v.target)||f.classList.remove("open")}),l.appendChild(u),n.appendChild(l),b(c),{setPosition(v){const S=Math.max(0,Math.min(1,v));m.value=String(Math.round(S*1e3)),m.style.setProperty("--fill",`${S*100}%`)},setPlaying(v){d.textContent=v?"⏸":"▶",d.classList.toggle("is-paused",!v),d.setAttribute("aria-label",v?"Pause":"Play")},setSpeed(v){b(v)}};function b(v){y.textContent=ln(v);for(const S of g.children)S.classList.toggle("is-active",S.textContent===ln(v))}}function ln(n){return`x${n}`}function tr(n,e){const t=Math.min(Zs(e),2);return n.toFixed(t)}function we(n,e){return e?`${n} ${e}`:n}function bt(n){const e=Math.abs(n),t=n<0?"−":"";return Number.isFinite(n)?e<1e3?ut(n):e<1e6?`${t}${ut(n/1e3)}K`:e<1e9?`${t}${ut(n/1e6)}M`:e<1e12?`${t}${ut(n/1e9)}B`:`${t}${ut(n/1e12)}T`:String(n)}function ut(n){return n.toFixed(1).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function nr(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=s*(e.scale??1);return e.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):i.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Rt(n,e={}){const t=n.trim();if(t.length===0)return n;const s=Number(t);if(!Number.isFinite(s))return n;const i=e.mode??"float",a=s*(e.scale??1);if(i==="integer")return Math.round(a).toLocaleString(void 0);if(i==="scientific"||i==="compact")return bt(a);const r=Math.max(0,e.precision??2);return a.toFixed(r).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Qe(n,e,t={}){const s=t.scale??1,i=n*s,a=e*s;return t.format==="compact"||t.format==="scientific"?bt(i):tr(i,a)}function Zs(n){const e=String(n),t=e.indexOf(".");return t===-1?0:e.length-t-1}function sr(n){const e=document.createElement("aside");e.className="data-panel";const t=document.createElement("div");return t.className="data-panel__metrics",e.appendChild(t),n.appendChild(e),{update(s,i,a={}){t.innerHTML="";const r=ir(s,i,a);for(const o of s.metadata.liveStats){const c=rr(o,r),l=document.createElement("div");l.className="data-panel__metric",l.innerHTML=`
          <span class="data-panel__metric-label">${c.label}</span>
          <span class="data-panel__metric-value">${c.value}</span>
        `,t.appendChild(l)}}}}function ir(n,e,t){const s=Object.fromEntries(n.parameters.map(a=>[a.id,{label:a.label,value:Qe(e[a.id]??a.fallbackValue,a.step,{scale:a.valueScale,format:a.displayFormat,significantFigures:a.displaySignificantFigures})}])),i={scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:String(n.parameters.length)}};return{...s,...i,...Object.fromEntries(Object.entries(t).map(([a,r])=>[a,{label:ar(a),value:r}]))}}function ar(n){return n.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function rr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=n.liveKey??n.id,i=e[s],a=or((i==null?void 0:i.value)??t.value??"--",n,!!i);return{label:n.label??(i==null?void 0:i.label)??t.label,value:we(a,n.unit)}}function or(n,e,t){if(n==="--")return n;const s=Number(n);if(!Number.isFinite(s))return n;const i=e.valueScale??1,a=s*i;return t?e.integer?bt(Math.round(a)):bt(a):e.integer?Math.max(0,Math.round(a)).toLocaleString(void 0):nr(n,{integer:e.integer})}function lr(){const n=J("assets/2-McAlpine.webp"),e=document.createElement("div"),t=document.createElement("button");t.className="view-switcher__info entry-overlay__info-button",t.type="button",t.setAttribute("aria-label","About this experience"),t.appendChild(ur()),e.className="sci-modal is-hidden",e.innerHTML=`
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
  `;const s=e.querySelector(".entry-info-modal__close");function i(){e.classList.remove("is-hidden")}function a(){e.classList.add("is-hidden")}return t.addEventListener("click",i),s.addEventListener("click",a),e.addEventListener("click",r=>{r.target===e&&a()}),{infoButton:t,infoModal:e,open:i,close:a}}function cr(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function ur(){return cr(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const dr={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function fr(n,e,t){const s=J("assets/banner-1600.webp"),i=[`${J("assets/banner-960.webp")} 960w`,`${J("assets/banner-1600.webp")} 1600w`].join(", "),a=document.createElement("section");a.className="overlay overlay--entry",a.hidden=!0,a.classList.add("is-hidden");const r=document.createElement("div");r.className="entry-overlay",r.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${s}" srcset="${i}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const o=document.createElement("div");o.className="entry-overlay__actions";function c(m){o.innerHTML="";for(const f of m){const y=document.createElement("button");y.className="entry-overlay__button",y.type="button";const g=dr[f.id]??"Explore this simulation scale.";y.innerHTML=`
        <span class="entry-overlay__button-label">${f.label}</span>
        <span class="entry-overlay__button-description">${g}</span>
      `,y.addEventListener("click",()=>t(f)),o.appendChild(y)}}c(e);const{infoButton:l,infoModal:u,close:d}=lr();return r.appendChild(o),a.appendChild(r),a.appendChild(l),a.appendChild(u),n.appendChild(a),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){d(),a.hidden=!0,a.classList.add("is-hidden")},setSimulationClasses(m){c(m)}}}function hr(n,e,t,s){const i=Object.fromEntries(n.metadata.results.map(w=>[w.id,w.target])),a=n.metadata.results.map(w=>{const k=un(n,e,s,w.id);return k===null?null:{id:w.id,value:k,target:w.target}}).filter(w=>w!==null),r=n.parameters.filter(w=>i[w.id]!==void 0).map(w=>{const k=e[w.id]??w.fallbackValue,E=i[w.id]??w.fallbackValue;return Math.abs(k-E)/Math.max(w.max-w.min,1e-9)}),o=r.reduce((w,k)=>w+k,0)/Math.max(r.length,1),c=gr(a),l=((s==null?void 0:s.carbonBurnt)??.8+o*4.2).toFixed(2),u=(s==null?void 0:s.computeUsed)??18+o*46,d=(s==null?void 0:s.memoryUsed)??12+o*84,m=`${cn(u,1)} CPU-hrs
${cn(d,1)} GB`,f=String(n.parameters.length),y=`${(o*100).toFixed(1)}%`,g=String(n.parameters.length+6),h="Present",b=pr((s==null?void 0:s.wallclockSeconds)??t),v=rs(os(un(n,e,s,"moon_iron"))),S=rs(os(un(n,e,s,"proto_earth_in_moon")));return{scale:{label:"Scale",value:n.label},parameters:{label:"Parameters",value:f},runtime:{label:"Total Runtime",value:b},similarityScore:{label:"Similarity Score",value:`${c}/100`},bestFitDelta:{label:"Best-Fit Delta",value:y},carbonBurnt:{label:"Carbon Burnt",value:l},computeUsed:{label:"Compute Used",value:m},memoryUsed:{label:"Memory Used",value:cn(d,1)},particlesUpdated:{label:"Particle updates",value:s?mr(s.particlesUpdated):"--"},moon_iron_percent:{label:"Iron in Moon",value:v},proto_earth_in_moon_percent:{label:"Proto-Earth in Moon",value:S},audioTrack:{label:"Audio Track",value:h},terminalLines:{label:"Terminal Lines",value:g},...Object.fromEntries(Object.entries((s==null?void 0:s.summaryMetrics)??{}).map(([w,k])=>[w,{label:k.label,value:k.value}]))}}function mr(n){return String(Math.max(0,n))}function pr(n){return(Math.max(0,n)/3600).toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function cn(n,e){return n.toFixed(e).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function un(n,e,t,s){var o;const i=n.parameters.find(c=>c.id===s);if(i)return e[s]??i.fallbackValue;const a=(o=t==null?void 0:t.summaryMetrics[s])==null?void 0:o.value;if(a!==void 0){const c=Number(a);if(Number.isFinite(c))return c}const r=t==null?void 0:t.parameterValues[s];return typeof r=="number"&&Number.isFinite(r)?r:null}function rs(n){return n===null?"--":n.toFixed(1)}function os(n){return n===null?null:Math.max(0,(1-Math.abs(n-1))*100)}function gr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value/Math.max(s.target,1e-9)-1)),0);return Math.round(e/n.length*100)}const Sn={TYPING_MS_PER_CHAR:3.5,MIN_TERMINAL_TIME_MS:3e3,FINAL_PAUSE_MS:500},yr={HIDE_AFTER_MS:980},br="https://media.universemakers.org/engine/run-manifest.json",vr="https://universe-engine.universe-engine.workers.dev/api/track-run",wr=`# Target messages for scientific bar detail popups, shown when a bar is tapped.
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
`,ls=(()=>{const n=Ne(wr),e={};for(const t of Object.values(n))for(const[s,i]of Object.entries(t))e[s]=i;return e})(),Ft="#4CD98A",kn="#E8951C",ei="#D7372A",ti=.2,ni=.5,cs=2;function si(n){const e=Math.abs(n-1);return e<=ti?{word:"On target",colour:Ft}:e<=ni?{word:n>1?"Too high":"Too low",colour:kn}:{word:n>1?"Way too high":"Way too low",colour:ei}}function _r(n){const e=Math.abs(n-1),t=n>=1;return e<=ti?t?"greenHigh":"greenLow":e<=ni?t?"amberHigh":"amberLow":t?"redHigh":"redLow"}function Sr(n){return Math.min(Math.max(n,0),cs)/cs*100}function kr(n){return n>=85?{word:"Almost perfect",colour:Ft}:n>=65?{word:"Really close",colour:Ft}:n>=45?{word:"Getting there",colour:kn}:n>=25?{word:"Not quite",colour:kn}:{word:"Way off - try again",colour:ei}}function Er(n,e,t){var r,o;const s=_r(t),i=((r=ls[n])==null?void 0:r[s])??((o=ls[e])==null?void 0:o[s]);return i||(si(t).colour===Ft?`${e} is very close to the target value for this simulation.`:t<1?`${e} is below the target value for this simulation.`:`${e} is above the target value for this simulation.`)}function Ir(n,e,t){return n.metadata.results.map(s=>{const i=Nr(s,n,e,t);if(i===null)return null;const a=i/Math.max(s.target,1e-9),r=Lr(s,n,t),o=Er(s.id,r,a),c=we(ii(String(i),s),s.unit);return{id:s.id,label:r,value:a,rawValue:i,formattedValue:c,detail:o}}).filter(s=>s!==null)}function Nr(n,e,t,s){var c;const i=n.id,a=e.parameters.find(l=>l.id===i);if(a)return t[i]??a.fallbackValue;const r=Cr((c=s==null?void 0:s.summaryMetrics[i])==null?void 0:c.value);if(r!==null)return r;const o=s==null?void 0:s.parameterValues[i];return typeof o=="number"&&Number.isFinite(o)?o:null}function Lr(n,e,t){var i,a;const s=n.id;return n.label??((i=e.parameters.find(r=>r.id===s))==null?void 0:i.label)??((a=t==null?void 0:t.summaryMetrics[s])==null?void 0:a.label)??s}function Cr(n){if(n===void 0)return null;const e=Number(n);return Number.isFinite(e)?e:null}function Tr(n){if(n.length===0)return 0;const e=n.reduce((t,s)=>t+Math.max(0,1-Math.abs(s.value-1)),0);return Math.round(e/n.length*100)}function Ar(n,e){const t=document.createElement("section");t.className="overlay overlay--summary",t.hidden=!0,t.classList.add("is-hidden");let s;const i=document.createElement("div");i.className="summary-overlay";const a=document.createElement("div"),r=document.createElement("div");a.className="summary-overlay__header",r.className="summary-overlay__content";const o=document.createElement("p");o.className="summary-overlay__title",o.textContent="Run Summary";const c=document.createElement("p");c.className="summary-overlay__hint",c.textContent="Select any card for more details",a.appendChild(o),a.appendChild(c);const l=document.createElement("div");l.className="summary-overlay__actions";const u=document.createElement("button");u.className="summary-overlay__button",u.type="button",u.textContent="Continue Visualising";const d=document.createElement("button"),m=document.createElement("button");d.className="summary-overlay__button summary-overlay__button--primary",d.type="button",d.textContent="New Parameters",m.className="summary-overlay__button",m.type="button",m.textContent="Home",m.hidden=!e.showHome,u.addEventListener("click",e.onReplay),d.addEventListener("click",e.onParameters),m.addEventListener("click",e.onHome),l.appendChild(d),l.appendChild(u),l.appendChild(m),i.appendChild(a),i.appendChild(r),i.appendChild(l),t.appendChild(i);const f=document.createElement("div");f.className="sci-modal is-hidden",f.innerHTML=`
    <div class="sci-modal__card">
      <button class="sci-modal__close" type="button" aria-label="Close">&#10005;</button>
      <div class="sci-modal__title"></div>
      <div class="sci-modal__verdict"></div>
      <div class="sci-modal__body"></div>
    </div>
  `,t.appendChild(f),n.appendChild(t);const y=f.querySelector(".sci-modal__title"),g=f.querySelector(".sci-modal__verdict"),h=f.querySelector(".sci-modal__body"),b=f.querySelector(".sci-modal__close");function v(E){const N=si(E.value);y.textContent=E.label,g.textContent=N.word,g.style.color=N.colour,g.hidden=!1,h.textContent=E.detail,f.classList.remove("is-hidden")}function S(E,N){y.textContent=E,g.hidden=!0,h.textContent=N,f.classList.remove("is-hidden")}function w(){f.classList.add("is-hidden")}b.addEventListener("click",w),f.addEventListener("click",E=>{E.target===f&&w()}),t.addEventListener("click",E=>{E.target===t&&e.onReplay()});function k(E,N){const _=document.createElement("div");_.className=`${E.className} panel`,_.innerHTML=`<p class="sci-section__title">${E.title}</p>`;const T=document.createElement("div"),A=E.singleRow?Math.max(1,E.stats.length):Math.max(1,Math.min(E.stats.length,E.maxColumns));T.className="metric-grid",E.singleRow&&T.classList.add("metric-grid--single-row"),T.style.setProperty("--summary-grid-columns",String(A)),T.style.setProperty("--summary-grid-max-width",`${E.maxWidthRem}rem`);for(const H of E.stats){const D=Mr(H,N),R=document.createElement("div"),Y=document.createElement("span"),Z=document.createElement("span");R.className="res-card",Y.className="res-card__label",Y.textContent=D.label,Z.className="res-card__value",Z.textContent=D.value,R.appendChild(Y),R.appendChild(Z),H.description&&(R.classList.add("res-card--has-info"),R.addEventListener("click",()=>{S(D.label,H.description)})),T.appendChild(R)}return _.appendChild(T),_}return{show(){s&&(window.clearTimeout(s),s=void 0),t.hidden=!1,t.classList.remove("is-hidden"),t.classList.remove("is-visible"),t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("is-visible")})},hide(){t.classList.remove("is-visible"),s=window.setTimeout(()=>{t.hidden=!0,t.classList.add("is-hidden"),s=void 0},yr.HIDE_AFTER_MS)},setHomeVisible(E){m.hidden=!E},update(E,N,_,T,A){var $;r.innerHTML="",w();const H=hr(E,N,_,T),D=E.metadata.summaryStats,R=Ir(E,N,T),Y=new Set(R.map(U=>U.id));let Z;if(R.length>0)Z=Tr(R);else{const U=(($=H.similarityScore)==null?void 0:$.value)??"0/100";Z=parseInt(U,10)||0}const se=kr(Z),ae=document.createElement("div"),re=document.createElement("div"),C=document.createElement("div");ae.className="sci-top",re.className="summary-main-column",C.className="summary-side-column";const P=document.createElement("div");P.className="sci-hero panel",A?(P.classList.add("sci-hero--thumbnail"),P.innerHTML=`<img class="sci-hero__thumbnail" src="${A}" alt="Final frame of simulation" />`):P.innerHTML=`
          <div class="sci-hero__score">
            <span class="sci-hero__num">${Z}</span><span class="sci-hero__outof">/100</span>
          </div>
          <div class="sci-hero__reaction" style="color:${se.colour}">${se.word}</div>
          <div class="sci-hero__gauge">
            <div class="sci-hero__gauge-fill" style="width:${Z}%; background:${se.colour}; box-shadow:0 0 12px ${se.colour}"></div>
          </div>
        `,re.appendChild(P);const x=D.filter(U=>(U.section??"resources")==="resources"&&!R.some(ee=>ee.id===String(U.id))&&U.id!=="similarityScore"),B=D.filter(U=>U.section==="simulationStats"&&!Y.has(String(U.id)));if(x.length>0&&C.appendChild(k({title:"Resources Used",className:"res-section",stats:x,maxColumns:3,maxWidthRem:48},H)),B.length>0&&C.appendChild(k({title:"Simulation Stats",className:"res-section",stats:B,maxColumns:B.length,maxWidthRem:48,singleRow:!0},H)),ae.appendChild(re),C.childElementCount>0&&ae.appendChild(C),r.appendChild(ae),R.length>0){const U=document.createElement("div");U.className="sci-bottom-row";const ee=document.createElement("div");ee.className="sci-section panel param-section",ee.innerHTML='<p class="sci-section__title">Input Parameters</p>';const Se=document.createElement("div");Se.className="param-cards";for(const j of E.parameters){const K=N[j.id]??j.fallbackValue,Ce=j.displayUnit??j.unit,q=document.createElement("div"),ye=document.createElement("span"),de=document.createElement("span");q.className="res-card",j.description&&(q.classList.add("res-card--has-info"),q.addEventListener("click",()=>S(j.label,j.description))),ye.className="res-card__label",ye.textContent=j.label,de.className="res-card__value";const L=Qe(K,j.step,{scale:j.valueScale,format:j.displayFormat,significantFigures:j.displaySignificantFigures});de.textContent=we(L,Ce),q.appendChild(ye),q.appendChild(de),Se.appendChild(q)}ee.appendChild(Se);const ie=document.createElement("div"),G=document.createElement("div"),Le=document.createElement("p"),Oe=document.createElement("p");ie.className="sci-section panel",G.className="sci-section__header",Le.className="sci-section__title",Le.textContent="Similarity Results",Oe.className="sci-section__hint",Oe.textContent="Select any bar for details",G.appendChild(Le),G.appendChild(Oe);const Pe=document.createElement("div");Pe.className="sci-bars";for(const j of R){const K=document.createElement("div");K.className="sci-bar",K.innerHTML=`
            <div class="sci-bar__name">${j.label}</div>
            <div class="sci-track">
              <div class="sci-pointer" style="left:${Sr(j.value)}%">
                <div class="sci-pointer__needle"></div>
                <div class="sci-pointer__node"></div>
              </div>
            </div>
            <div class="sci-bar__value">${j.formattedValue}</div>
          `,K.addEventListener("click",()=>v(j)),Pe.appendChild(K)}ie.appendChild(G),ie.appendChild(Pe),U.appendChild(ee),U.appendChild(ie),r.appendChild(U)}}}}function Mr(n,e){const t=e[n.id]??{label:n.id,value:"--"},s=t.value!=="--"?t.value:"--",i=Or(s,n);if(i)return{label:n.label??t.label,value:i};const a=ii(s,n);return{label:n.label??t.label,value:we(a,n.unit)}}function Or(n,e){if(e.id!=="carbonBurnt"||n==="--")return null;const t=Number(n);return Number.isFinite(t)?Math.abs(t)<1?we(Rt(n,{scale:(e.valueScale??1)*1e3,mode:"float",precision:1}),"g CO2"):we(Rt(n,{scale:e.valueScale,mode:"float",precision:e.precision??2}),e.unit):we(n,e.unit)}function ii(n,e){if(n==="--")return n;if(e.displayFormat==="scientific"||e.displayFormat==="compact"||e.displayFormat==="float")return Rt(n,{scale:e.valueScale,mode:e.displayFormat,precision:e.precision});if(e.displayFormat==="integer")return Rt(n,{scale:e.valueScale,mode:"integer"});const t=Number(n);if(!Number.isFinite(t))return n;const s=e.valueScale??1,i=t*s;return bt(i)}function Pr(n,e){const t=document.createElement("div");return t.className="view-switcher is-hidden",n.appendChild(t),{update(s,i){if(t.innerHTML="",s.length<=1){t.classList.add("is-hidden");return}t.classList.remove("is-hidden");for(const a of s){const r=document.createElement("div");r.className="view-switcher__row";const o=document.createElement("button");o.className="view-switcher__button",o.type="button",o.dataset.viewId=a.id,o.classList.toggle("is-active",a.id===i),o.setAttribute("aria-pressed",String(a.id===i)),o.setAttribute("aria-label",a.label??a.id);const c=$r(a.icon);if(c){const u=document.createElement("span");u.className="view-switcher__icon",u.setAttribute("aria-hidden","true"),u.appendChild(c),o.appendChild(u)}const l=document.createElement("span");if(l.className="view-switcher__label",l.textContent=a.label??a.id,o.appendChild(l),o.addEventListener("click",()=>e.onSelect(a.id)),r.appendChild(o),a.description){const u=document.createElement("button");u.className="view-switcher__info",u.type="button",u.setAttribute("aria-label",`Info about ${a.label??a.id}`),u.appendChild(xr()),u.addEventListener("click",d=>{d.stopPropagation(),e.onInfo(a.id,a.label??a.id,a.description??"")}),r.appendChild(u)}t.appendChild(r)}},hide(){t.innerHTML="",t.classList.add("is-hidden")}}}function $r(n){switch(n){case"dark-matter":return Fe(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return Fe(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return Fe(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return Fe(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return Fe(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return Fe(`
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
      `);default:return null}}function Fe(n){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.innerHTML=n,e}function xr(){return Fe(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Rr=`# Credits source-of-truth.
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
`;function Fr(){const n=Ne(Rr);if(!Array.isArray(n))return[];const e=[];for(const t of n){if(!t||typeof t!="object")continue;const s=t.text;if(typeof s!="string"||s.trim().length===0)continue;const i={text:s},a=t.url;typeof a=="string"&&a.trim().length>0&&(i.url=a);const r=t.logo;typeof r=="string"&&r.trim().length>0&&(i.logo=r),t.header===!0&&(i.header=!0),e.push(i)}return e}function Br(n,e,t,s){const i=document.createElement("div");i.className="parameter-editor",n.appendChild(i);let a=e,r={...t};function o(u,d){a=u,r=d?{...d}:Ur(u),i.innerHTML="";const m=document.createElement("div");m.className="parameter-editor__heading",m.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${u.label} Controls</h2>
    `,i.appendChild(m);const f=document.createElement("div");f.className="param-info-modal is-hidden",f.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,i.appendChild(f);const y=f.querySelector(".sci-modal__title"),g=f.querySelector(".sci-modal__body"),h=f.querySelector(".sci-modal__close");function b(w,k){y.textContent=w,g.textContent=k,f.classList.remove("is-hidden")}function v(){f.classList.add("is-hidden")}h.addEventListener("click",v),f.addEventListener("click",w=>{w.target===f&&v()});const S=document.createElement("div");S.className="parameter-editor__list";for(const w of u.parameters)S.appendChild(c(w,b));i.appendChild(S),l()}function c(u,d){const m=document.createElement("div");m.className="res-card param-card";const f=document.createElement("div");f.className="param-card__header";const y=document.createElement("span");y.className="res-card__label",y.textContent=u.label;const g=u.displayUnit??u.unit,h=document.createElement("span");h.className="param-card__range",h.textContent=`${we(Qe(u.min,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)} – ${we(Qe(u.max,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g)}`,f.appendChild(y),f.appendChild(h);const b=document.createElement("input");b.className="param-card__slider",b.type="range";const v=u.logScale?Math.log10(u.min):u.min,S=u.logScale?Math.log10(u.max):u.max,w=r[u.id]??u.fallbackValue;b.min=String(v),b.max=String(S),b.step=u.logScale?"0.001":String(u.step),b.value=String(u.logScale?Math.log10(Math.max(w,Number.MIN_VALUE)):w),b.setAttribute("aria-label",u.label);const k=document.createElement("span");k.className="res-card__value";function E(_){const T=u.logScale?10**_:_;r[u.id]=T,b.value=String(_),b.style.setProperty("--fill",`${us(_,v,S)}%`),k.textContent=we(Qe(T,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),l()}b.addEventListener("input",()=>{E(parseFloat(b.value))}),b.addEventListener("pointerdown",_=>_.stopPropagation()),b.addEventListener("click",_=>_.stopPropagation());const N=u.logScale?Math.log10(Math.max(w,Number.MIN_VALUE)):w;if(b.style.setProperty("--fill",`${us(N,v,S)}%`),k.textContent=we(Qe(w,u.step,{scale:u.valueScale,format:u.displayFormat,significantFigures:u.displaySignificantFigures}),g),u.description){m.classList.add("res-card--has-info"),m.setAttribute("title",u.description);const _=document.createElement("span");_.className="param-card__info-btn",_.setAttribute("aria-label","Parameter description"),_.textContent="ⓘ",f.appendChild(_),m.addEventListener("click",()=>{d(u.label,u.description)})}return m.appendChild(f),m.appendChild(b),m.appendChild(k),m}function l(){s({...r})}return o(e,t),{setSimClass(u,d){o(u,d)},setValues(u){o(a,u)},getValues(){return{...r}}}}function Ur(n){return Object.fromEntries(n.parameters.map(e=>[e.id,e.fallbackValue]))}function us(n,e,t){return t===e?0:(n-e)/(t-e)*100}const ai="universe-engine-advanced-settings",Vr="RSSSE26UM_Engine";function En(){return{lockedScaleId:null,manifestSource:"online",verboseLogging:!1,hiddenScaleIds:[]}}function Hr(n){const e=localStorage.getItem(ai);if(!e)return En();try{const t=JSON.parse(e);return ri(t,n)}catch{return En()}}function Dr(n,e){const t=ri(n,e);return localStorage.setItem(ai,JSON.stringify({lockedScaleId:t.lockedScaleId,manifestSource:t.manifestSource,verboseLogging:t.verboseLogging,hiddenScaleIds:t.hiddenScaleIds})),t}function ri(n,e){const t=En(),s=new Set(e),i=n.manifestSource==="online"||n.manifestSource==="local"?n.manifestSource:t.manifestSource,a=typeof n.lockedScaleId=="string"&&s.has(n.lockedScaleId)?n.lockedScaleId:null,r=Array.isArray(n.hiddenScaleIds)?n.hiddenScaleIds.filter((o,c,l)=>typeof o=="string"&&s.has(o)&&l.indexOf(o)===c&&o!==a):t.hiddenScaleIds;return!a&&r.length>=e.length&&e.length>0&&r.pop(),{lockedScaleId:a,manifestSource:i,verboseLogging:!!n.verboseLogging,hiddenScaleIds:r}}function jr(n,e){if(n.lockedScaleId)return[n.lockedScaleId];const t=new Set(n.hiddenScaleIds),s=e.filter(i=>!t.has(i));return s.length>0?s:e.slice(0,1)}function Kr(n,e){const t=document.createElement("section");t.className="overlay overlay--config",t.hidden=!0,t.classList.add("is-hidden");const s=document.createElement("div");s.className="config-overlay";const i=document.createElement("div");i.className="config-overlay__shell";const a=document.createElement("div");a.className="config-overlay__media",a.dataset.simClass=e.simClass.id;const r=document.createElement("img");r.className="config-overlay__media-image",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`,a.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,a.prepend(r);const o=document.createElement("div");o.className="config-overlay__controls",o.dataset.view=e.initialView??"parameters";const c=document.createElement("div");c.className="config-overlay__header";const l=document.createElement("div");l.className="config-overlay__title-block",l.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const u=l.querySelector(".config-overlay__eyebrow"),d=l.querySelector(".config-overlay__title"),m=l.querySelector(".config-overlay__subtitle"),f=document.createElement("button");f.className="config-overlay__close",f.type="button",f.setAttribute("aria-label","Back"),f.textContent="←",c.appendChild(l),c.appendChild(f);const y=document.createElement("section");y.className="config-overlay__section config-overlay__section--grow",y.dataset.section="parameters";const g=document.createElement("div");y.appendChild(g);const h=document.createElement("section");h.className="config-overlay__section config-overlay__section--grow",h.dataset.section="settings",h.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const b=document.createElement("div");h.appendChild(b);const v=document.createElement("section");v.className="advanced-settings",v.dataset.state="closed",v.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const S=document.createElement("button");S.className="advanced-settings__access",S.type="button",S.textContent="Advanced Settings",v.appendChild(S);const w=document.createElement("div");w.className="advanced-settings__auth";const k=document.createElement("input");k.className="advanced-settings__password",k.type="password",k.placeholder="Enter password",k.autocomplete="off";const E=document.createElement("button");E.className="advanced-settings__unlock",E.type="button",E.textContent="Unlock";const N=document.createElement("p");N.className="advanced-settings__message",w.appendChild(k),w.appendChild(E),w.appendChild(N),v.appendChild(w);const _=document.createElement("div");_.className="advanced-settings__form";const T=document.createElement("label");T.className="advanced-settings__field",T.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const A=document.createElement("select");A.className="advanced-settings__select",A.appendChild(new Option("None",""));for(const L of e.availableScales)A.appendChild(new Option(L.label,L.id));T.appendChild(A),_.appendChild(T);const H=document.createElement("div");H.className="advanced-settings__field",H.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const D=document.createElement("div");D.className="advanced-settings__options";const R=document.createElement("label"),Y=document.createElement("input");R.className="advanced-settings__choice",Y.type="radio",Y.name="manifest-source",Y.value="local",R.appendChild(Y),R.append("Local manifest");const Z=document.createElement("label"),se=document.createElement("input");Z.className="advanced-settings__choice",se.type="radio",se.name="manifest-source",se.value="online",Z.appendChild(se),Z.append("Online manifest"),D.appendChild(R),D.appendChild(Z),H.appendChild(D),_.appendChild(H);const ae=document.createElement("label");ae.className="advanced-settings__field advanced-settings__field--inline";const re=document.createElement("input"),C=document.createElement("span");re.type="checkbox",re.className="advanced-settings__checkbox",C.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,ae.appendChild(re),ae.appendChild(C),_.appendChild(ae);const P=document.createElement("div");P.className="advanced-settings__field",P.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const x=document.createElement("div");x.className="advanced-settings__options";const B=new Map;for(const L of e.availableScales){const V=document.createElement("label"),te=document.createElement("input");V.className="advanced-settings__choice",te.type="checkbox",te.value=L.id,B.set(L.id,te),V.appendChild(te),V.append(`Show ${L.label}`),x.appendChild(V)}P.appendChild(x),_.appendChild(P),v.appendChild(_),h.appendChild(v);const $=document.createElement("section");$.className="config-overlay__section config-overlay__section--grow",$.dataset.section="credits",$.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const U=$.querySelector("[data-credits]"),ee=Fr();if(U.innerHTML="",ee.length===0){const L=document.createElement("div");L.className="credits-list__entry",L.textContent="To be credited...",U.appendChild(L)}else for(const L of ee)if(L.header){const V=document.createElement("div");V.className="credits-list__heading",V.textContent=L.text,U.appendChild(V)}else{const V=document.createElement("div");V.className="credits-list__entry";const te=document.createElement("span");if(te.className="credits-list__text",L.url){const ne=document.createElement("a");ne.className="credits-list__link",ne.href=L.url,ne.target="_blank",ne.rel="noopener noreferrer",ne.textContent=L.text,te.appendChild(ne)}else te.textContent=L.text;V.appendChild(te),U.appendChild(V)}const Se=document.createElement("div");Se.className="config-overlay__footer";const ie=document.createElement("button");ie.className="run-button",ie.type="button",ie.textContent="Run",Se.appendChild(ie),o.appendChild(c),o.appendChild(y),o.appendChild(h),o.appendChild($),o.appendChild(Se),i.appendChild(a),i.appendChild(o),s.appendChild(i),t.appendChild(s),n.appendChild(t);let G=dt(e.advancedSettings),Le="closed";const Oe=Br(g,e.simClass,e.values,e.onValuesChange),Pe=za(b,e.theme,e.onThemeChange);f.addEventListener("click",e.onClose),S.addEventListener("click",()=>{if(Le==="open"){q("closed");return}q("auth"),k.focus()}),E.addEventListener("click",Ce),k.addEventListener("keydown",L=>{L.key==="Enter"&&Ce()}),A.addEventListener("change",()=>{G.lockedScaleId=A.value||null,K()}),Y.addEventListener("change",()=>{Y.checked&&(G.manifestSource="local")}),se.addEventListener("change",()=>{se.checked&&(G.manifestSource="online")}),re.addEventListener("change",()=>{G.verboseLogging=re.checked});for(const[L,V]of B.entries())V.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,ne])=>ne.checked).map(([ne])=>ne).length===0&&!G.lockedScaleId){V.checked=!0;return}G.hiddenScaleIds=Array.from(B.keys()).filter(ne=>{var Te;return!((Te=B.get(ne))!=null&&Te.checked)&&ne!==G.lockedScaleId}),K()}),L===G.lockedScaleId&&(V.disabled=!0);j(e.initialView??"parameters"),K();function j(L){o.dataset.view=L,L==="parameters"?(u.textContent=e.simClass.label,d.textContent="Shape Your Simulation",m.textContent=e.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",r.src=e.simClass.placeholderImage,r.alt=`${e.simClass.label} preview`):L==="settings"?(u.textContent="Interface",d.textContent="Adjust The Control Room",m.textContent="Change the interface theme and manage exhibit-level options for this installation.",r.src=J("assets/Cluster_Stuart.webp"),r.alt="Galaxy cluster simulation preview"):(u.textContent="References",d.textContent="Project Sources And Attribution",m.textContent="Review the datasets, imagery, and supporting materials behind this experience.",r.src=J("assets/synthetic_hst_pretty_galaxy.webp"),r.alt="Synthetic galaxy image preview"),L==="settings"?ie.textContent="Apply":L==="credits"?ie.textContent="Close":ie.textContent="Run Simulation"}function K(){A.value=G.lockedScaleId??"",Y.checked=G.manifestSource==="local",se.checked=G.manifestSource==="online",re.checked=G.verboseLogging;for(const[L,V]of B.entries()){const te=G.lockedScaleId===L;V.checked=te||!G.hiddenScaleIds.includes(L),V.disabled=te}}function Ce(){if(k.value!==Vr){N.textContent="Incorrect password";return}k.value="",N.textContent="",q("open")}function q(L){Le=L,v.dataset.state=L,S.textContent=L==="open"?"Hide Advanced Settings":"Advanced Settings",L!=="auth"&&(N.textContent="")}function ye(){k.value="",N.textContent="",q("closed")}function de(){G=dt(e.advancedSettings),K()}return ie.addEventListener("click",()=>{const L=o.dataset.view;if(L==="settings"){e.onApplySettings(dt(G));return}if(L==="credits"){e.onClose();return}e.onRun()}),{show(){t.hidden=!1,t.classList.remove("is-hidden")},hide(){t.hidden=!0,t.classList.add("is-hidden"),de(),ye()},setSimulation(L,V){e.simClass=L,a.dataset.simClass=L.id,Oe.setSimClass(L,V),o.dataset.view==="parameters"&&(r.src=L.placeholderImage,r.alt=`${L.label} preview`,j("parameters"))},setTheme(L){Pe.setActive(L)},setView(L){j(L),L!=="settings"&&ye()},setAdvancedSettings(L){e.advancedSettings=dt(L),G=dt(L),K(),ye()}}}function dt(n){return{lockedScaleId:n.lockedScaleId,manifestSource:n.manifestSource,verboseLogging:n.verboseLogging,hiddenScaleIds:[...n.hiddenScaleIds]}}function qr(n){const{TYPING_MS_PER_CHAR:e,MIN_TERMINAL_TIME_MS:t,FINAL_PAUSE_MS:s}=Sn,i=document.createElement("section");i.className="overlay overlay--initializing",i.hidden=!0,i.classList.add("is-hidden");const a=document.createElement("div");a.className="terminal";const r=document.createElement("div");r.className="terminal__header",r.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const o=document.createElement("div");o.className="terminal__log",a.appendChild(r),a.appendChild(o),i.appendChild(a),n.appendChild(i);let c=[],l=0;function u(){for(const y of c)window.clearTimeout(y);c=[]}function d(y,g){return new Promise(h=>{const b=window.setTimeout(()=>{g===l&&h()},Math.max(0,y));c.push(b)})}async function m(y,g){const h=document.createElement("div");h.className="terminal__line";const b=f();h.appendChild(b),o.appendChild(h);for(let v=0;v<y.length;v+=1){if(g!==l)return;const S=y[v];h.insertBefore(document.createTextNode(S),b),o.scrollTop=o.scrollHeight,await d(e,g)}b.remove()}function f(){const y=document.createElement("span");return y.className="terminal__cursor",y.textContent="█",y}return{async show(y,g,h,b){u(),l+=1;const v=l;i.hidden=!1,i.classList.remove("is-hidden");const S=performance.now(),w=(b==null?void 0:b.minTerminalTimeMs)??t;let k=!h,E=[...y];h&&h.then(()=>{k=!0});let N=0;for(;v===l;){E.length===0&&(E=[...y]);const T=Math.floor(Math.random()*E.length),[A]=E.splice(T,1),H=`${ds(N)} ${A.text}`;if(N+=1,await m(H,v),v!==l)return;if(performance.now()-S>=w&&k)break}if(v!==l)return;const _=document.createElement("div");_.className="terminal__line terminal__line--syncing",_.textContent=`${ds(N)} STARTING SIMULATION...`,o.appendChild(_),o.scrollTop=o.scrollHeight,await d(s,v),v===l&&g()},hide(){u(),l+=1,i.hidden=!0,i.classList.add("is-hidden"),o.innerHTML=""}}}function ds(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/3600),s=Math.floor(e%3600/60),i=e%60;return`[${dn(t)}:${dn(s)}:${dn(i)}]`}function dn(n){return String(n).padStart(2,"0")}function Wr(n,e){const t=document.createElement("button");t.className="display-button",t.type="button",t.innerHTML="<span></span><span></span><span></span>",t.setAttribute("aria-label","Open configuration overlay"),n.appendChild(t);const s=document.createElement("div");s.className="display-menu";const i=document.createElement("div");i.className="display-menu__header",i.textContent="Menu",s.appendChild(i);const a=c("Home",()=>{l(),e.onHome()});s.appendChild(a),s.appendChild(c("Settings",()=>{l(),e.onViewSelected("settings")})),s.appendChild(c("Credits",()=>{l(),e.onViewSelected("credits")}));const r=c("Fullscreen",()=>{var d;l(),document.fullscreenElement?document.exitFullscreen():(d=document.getElementById("app"))==null||d.requestFullscreen()});s.appendChild(r),n.appendChild(s);function o(){const d=r.querySelector(".display-menu__item-label");d&&(d.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const m=document.getElementById("app");m&&m.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",o),t.addEventListener("click",()=>{n.classList.toggle("open")}),document.addEventListener("click",d=>{n.contains(d.target)||l()}),u(e.showHome??!0),{close:l,setHomeVisible:u};function c(d,m){const f=document.createElement("button");return f.className="display-menu__item",f.type="button",f.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${d}</span>
    `,f.addEventListener("click",m),f}function l(){n.classList.remove("open")}function u(d){a.hidden=!d,a.classList.toggle("is-hidden",!d)}}const oi="universe-engine-playback-speed",Yr=new Set([.25,.5,1,2]);function Gr(){const n=localStorage.getItem(oi),e=n?Number(n):NaN;return Yr.has(e)?e:1}function Jr(n){localStorage.setItem(oi,String(n))}async function fn(n){try{await n.play()}catch{n.setMuted(!0);try{await n.play()}catch{}}}function zr(){let n=0;return{start(){return n+=1,n},invalidate(){n+=1},isCurrent(e){return e===n}}}const Qr=`# Initialization terminal script for the Planetary simulation family.
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
`,Xr=`# Initialization terminal script for the Galaxy simulation family.
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
`,Zr=`# Initialization terminal script for the Cosmos simulation family.
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
`,eo={planetary:Qr,galaxy:Xr,cosmos:Zr};function to(n){return Ne(eo[n.id]).map(t=>({text:t}))}function no(n){return n.replace(/\.mp4($|\?)/,".yaml$1")}async function so(n){try{const e=await fetch(n);if(!e.ok)return null;const t=await e.text(),s=Ne(t),i=Ye(s.wallclockSeconds),a=Ye(s.computeUsed),r=Ye(s.memoryUsed),o=Ye(s.carbonBurnt),c=Ye(s.particlesUpdated),l=await io(n),u=ro(s.summaryMetrics);return i===null||a===null||r===null||o===null||c===null?null:{wallclockSeconds:i,computeUsed:a,memoryUsed:r,carbonBurnt:o,particlesUpdated:c,parameterValues:l,summaryMetrics:u}}catch{return null}}async function io(n){try{const e=await fetch(ao(n));if(!e.ok)return{};const t=await e.text(),s=Ne(t);return oo(s)}catch{return{}}}function ao(n){return n.replace(/run_summary\.yaml($|\?)/,"parameters.yaml$1")}function Ye(n){const e=typeof n=="number"?n:Number(n);return Number.isFinite(e)?e:null}function ro(n){if(!n||typeof n!="object")return{};const e=n,t={};for(const[s,i]of Object.entries(e)){if(!i||typeof i!="object")continue;const a=i,r=typeof a.label=="string"?a.label:s,o=a.value;o!=null&&(t[s]={label:r,value:String(o)})}return t}function oo(n){if(!n||typeof n!="object")return{};const e={};for(const[t,s]of Object.entries(n)){const i=Ye(s);i!==null&&(e[t]=i)}return e}const li="[UniverseEngine]";let ci=!1;function fs(n){ci=n}function ui(){return ci}function ve(n,e){ui()&&console.info(li,n,e??"")}function He(n,e){ui()&&console.warn(li,n,e??"")}const lo={local:"assets/local-manifest.json",online:br};function co(n="local"){let e=n;const t=new Map;return{getSource(){return e},setSource(s){s==="online"&&t.delete("online"),e=s,ve("Manifest source updated",{source:s})},resetCache(){t.clear()},async preloadActiveManifest(){await fi(e,t)},async findNearestVideo(s,i,a){const r=await fo(e,t,s,i,a);if(r)return r;const o=di(s);return He("Falling back to placeholder assets",{simClassId:s,source:e,fallbackUrl:o}),{url:o,liveDataUrl:uo(s),summaryUrl:no(o)}}}}function di(n){switch(n){case"planetary":return J("assets/planet_test.mp4");case"galaxy":return J("assets/galaxy_test.mp4");case"cosmos":return J("assets/cosmo_test.mp4");default:return J("assets/galaxy_test.mp4")}}function uo(n){switch(n){case"planetary":return J("assets/planet_test_planetary_stats.csv");case"galaxy":return J("assets/galaxy_test_galaxy_stats.csv");case"cosmos":return J("assets/cosmo_test_cosmos_stats.csv");default:return J("assets/galaxy_test_galaxy_stats.csv")}}async function fi(n,e){const t=e.get(n);if(t)return t;const s=lo[n],i=fetch(J(s)).then(async a=>{if(!a.ok)throw new Error(`Failed to load manifest: ${s}`);return ve("Loaded manifest",{source:n,manifestPath:s}),await a.json()}).catch(a=>(He("Manifest unavailable",{source:n,manifestPath:s,error:a instanceof Error?a.message:String(a)}),{version:1,runs:[]}));return e.set(n,i),i}async function fo(n,e,t,s,i){const r=(await fi(n,e)).runs.filter(d=>d.simulationId===t);if(r.length===0)return He("No manifest runs found for simulation",{simClassId:t,source:n}),null;let o=r[0],c=hs(o,s,i);for(const d of r.slice(1)){const m=hs(d,s,i);m<c&&(o=d,c=m)}const l=o.defaultView??Object.keys(o.views)[0],u=o.views[l];return u?(ve("Selected manifest-backed run",{simClassId:t,source:n,runId:o.runId,selectedValues:i,distance:c,viewId:l}),{url:J(u),liveDataUrl:J(o.liveDataPath),summaryUrl:J(o.summaryPath),viewId:l,runId:o.runId,views:Object.fromEntries(Object.entries(o.views).map(([d,m])=>[d,J(m)]))}):null}function hs(n,e,t){return e.length===0?0:e.reduce((i,a)=>{var l;const r=t[a.id]??a.fallbackValue,o=((l=n.parameters)==null?void 0:l[a.id])??a.fallbackValue,c=Math.max(a.max-a.min,1e-9);return i+Math.abs(r-o)/c},0)/e.length}const Pt={mode:"time",frames:[]};async function ho(n){const e=await fetch(n);if(!e.ok)throw new Error(`Failed to load live stats CSV: ${n}`);const t=await e.text();return go(t)}function mo(n,e,t=0){if(n.mode==="row")return yo(n.frames,e,t);const s=n.frames;if(s.length===0)return{};if(e<=s[0].t)return{...s[0].values};const i=s[s.length-1];if(e>=i.t)return{...i.values};const a=po(s,e),r=s[Math.max(0,a-1)],o=s[Math.min(s.length-1,a)],c=(e-r.t)/Math.max(o.t-r.t,1e-9);return bo(r.values,o.values,c)}function po(n,e){let t=1,s=n.length-1;for(;t<s;){const i=Math.floor((t+s)/2);n[i].t<=e?t=i+1:s=i}return t}function go(n){const e=n.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(e.length<2)return Pt;const t=hn(e[0]);return t[0]==="t"?{mode:"time",frames:e.slice(1).map(s=>{const i=hn(s),a={};for(let r=1;r<t.length;r+=1)a[t[r]]=i[r]??"";return{t:parseFloat(i[0]??"0")||0,values:a}})}:{mode:"row",frames:e.slice(1).map((s,i)=>{const a=hn(s),r={};for(let o=0;o<t.length;o+=1)r[t[o]]=a[o]??"";return{t:i,values:r}})}}function yo(n,e,t){if(n.length===0)return{};if(!Number.isFinite(t)||t<=0)return{...n[0].values};const s=Math.max(0,Math.min(1,e/t)),i=Math.round(s*(n.length-1));return{...n[i].values}}function hn(n){const e=[];let t="",s=!1;for(let i=0;i<n.length;i+=1){const a=n[i];if(a==='"'){s=!s;continue}if(a===","&&!s){e.push(t),t="";continue}t+=a}return e.push(t),e}function bo(n,e,t){const s=new Set([...Object.keys(n),...Object.keys(e)]),i={};for(const a of s){const r=n[a]??"",o=e[a]??r,c=parseFloat(r),l=parseFloat(o);if(Number.isFinite(c)&&Number.isFinite(l)){const u=c+(l-c)*t;i[a]=vo(u);continue}i[a]=t<.5?r:o}return i}function vo(n){return n.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function wo(n){_o(vr,n)}function _o(n,e){if(navigator.sendBeacon){const t=new Blob([JSON.stringify(e)],{type:"application/json"});if(navigator.sendBeacon(n,t)){ve("Run selection tracking dispatched",{simulationId:e.simulationId});return}}fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).then(t=>{t.ok?ve("Run selection tracked",{simulationId:e.simulationId}):He("Run selection tracking rejected",{simulationId:e.simulationId,status:t.status})}).catch(t=>{He("Run selection tracking failed",{simulationId:e.simulationId,error:t instanceof Error?t.message:String(t)})})}const So=8e3,ko=5e3,Eo=100,mn={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Io(n){const e=We.map(p=>p.id);let t=Hr(e),s=qn(t);const i=co(t.manifestSource),a=zr();fs(t.verboseLogging),t.manifestSource==="online"&&i.preloadActiveManifest();let r=Wn(t.lockedScaleId)??s[0]??We[0],o=t.lockedScaleId?mn[r.id]:Ja(),c=!1,l=null,u=null,d=0,m=Pt,f=!1;const y=Object.fromEntries(We.map(p=>[p.id,wi(p)]));on(o);const g=di(r.id),h=Xa(n,g),b=document.createElement("div");b.className="display-chrome",b.classList.add("is-hidden"),n.appendChild(b);const v=document.createElement("div");v.className="orientation-overlay",v.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,n.appendChild(v);const S=document.createElement("div");S.className="swift-logo",S.innerHTML=`
    <img
      class="swift-logo__image"
      src="${J("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,n.appendChild(S);const w=document.createElement("div");w.className="synth-logo is-hidden",w.innerHTML=`
    <img
      class="synth-logo__image"
      src="${J("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,n.appendChild(w);const k=document.createElement("img");k.className="app-partner-logo",k.src=J("assets/dirac-hpc-white.webp"),k.alt="DIRAC HPC",k.decoding="async",n.appendChild(k);const E=document.createElement("div");E.className="display-chrome__top-left is-hidden",n.appendChild(E);const N=Wr(E,{onHome(){Jt()},onViewSelected(p){if(p==="credits"){Et("credits");return}Et(p)},showHome:!t.lockedScaleId}),_=document.createElement("div");_.className="display-chrome__left-center",b.appendChild(_);const T=Pr(_,{onSelect(p){Kn(p)},onInfo(p,I,M){H.textContent=I,D.textContent=M,A.classList.add("is-visible")}}),A=document.createElement("div");A.className="view-info-overlay",A.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,n.appendChild(A);const H=A.querySelector(".view-info-overlay__title"),D=A.querySelector(".view-info-overlay__text"),R=A.querySelector(".view-info-overlay__close");A.addEventListener("click",p=>{p.target===A&&A.classList.remove("is-visible")}),R.addEventListener("click",()=>{A.classList.remove("is-visible")});const Y=document.createElement("div");Y.className="display-chrome__top-center is-hidden",b.appendChild(Y);const Z=document.createElement("div");Z.className="display-chrome__top-right",b.appendChild(Z);const se=sr(Z),ae=document.createElement("div");ae.className="display-chrome__center-status",ae.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,b.appendChild(ae);const re=Gr();h.setPlaybackRate(re);const C=document.createElement("div");C.className="display-chrome__bottom",b.appendChild(C);const P=er(C,{onChange(p){G(p)},onTogglePlay:jn,onSpeedChange:bi,onSummaryClick:yi,onScrubStart(){Oe(),ie()},onScrubEnd(){Pe(),h.isPaused()||Se()},initialSpeed:re});P.setPlaying(!h.isPaused());let x=null,B=null,$=null,U=!1,ee=0;function Se(){if(x!==null)return;function p(){const I=h.getPlaybackFraction();P.setPosition(I),h.isPaused()?x=null:x=requestAnimationFrame(p)}x=requestAnimationFrame(p)}function ie(){x!==null&&(cancelAnimationFrame(x),x=null)}function G(p){B=p,$===null&&($=requestAnimationFrame(()=>{if($=null,B===null)return;const I=B;B=null,h.seekToFraction(I)}))}function Le(){if(B===null)return;$!==null&&(cancelAnimationFrame($),$=null);const p=B;B=null,h.seekToFraction(p)}function Oe(){U=!0,ee=0}function Pe(){U=!1,ee=0,Le(),d=h.getPlaybackFraction()*h.getDurationSeconds(),xe(d)}h.onPlayStateChange(p=>{P.setPlaying(!p),p?ie():Se()}),h.onTimeUpdate(p=>{if(d=p*h.getDurationSeconds(),U){const I=performance.now();if(I-ee<Eo)return;ee=I}xe(d)});const j=document.createElement("div");j.className="overlay-layer",n.appendChild(j);const K=Ar(j,{onReplay:gi,onParameters:()=>Et("parameters"),onHome:Jt,showHome:!t.lockedScaleId});h.onEnded(()=>{c=!0;const p=h.captureFrame();K.update(r,fe(),h.getDurationSeconds(),l,p),K.show()});const Ce=fr(j,s,p=>{Dn(p),Et("parameters")}),q=Kr(j,{simClass:r,values:fe(),theme:o,advancedSettings:t,availableScales:We,onValuesChange:hi,onThemeChange:Gt,onRun:()=>{ve("Parameters submitted — starting run",{simClassId:r.id}),vi().catch(p=>{He("Run failed to start",{simClassId:r.id,error:p instanceof Error?p.message:String(p)})})},onApplySettings:mi,onClose:pi,initialView:"parameters"}),ye=qr(j);P.setPosition(0),xe(),K.hide();const de=new WeakMap,L=p=>{const I=de.get(p);I&&(clearTimeout(I),de.delete(p)),p.classList.remove("side-collapsed")},V=p=>{const I=de.get(p);I&&clearTimeout(I),de.set(p,setTimeout(()=>{p.classList.add("side-collapsed"),de.delete(p)},2500))},te=p=>{const I=de.get(p);I&&(clearTimeout(I),de.delete(p)),p.classList.add("side-collapsed")},ne=(p,I)=>{const M=I.isCollapsible??(()=>!0);p.addEventListener("mouseenter",()=>L(p)),p.addEventListener("mouseleave",()=>{if(!M()){L(p);return}V(p)}),p.addEventListener("focusin",()=>L(p)),p.addEventListener("focusout",F=>{if(!p.contains(F.relatedTarget)){if(!M()){L(p);return}V(p)}}),p.addEventListener("click",()=>{if(!M()){L(p);return}if(p.classList.contains("side-collapsed")){L(p),V(p);return}I.toggleOnClick?te(p):V(p)}),M()?te(p):L(p)};ne(E,{toggleOnClick:!0,isCollapsible:()=>n.dataset.mode!=="entry"}),ne(_,{toggleOnClick:!0}),ne(C,{toggleOnClick:!1});let Te=0,je=null,kt=0;const Vn=()=>{je!==null&&(cancelAnimationFrame(je),je=null)},Hn=()=>{if(je!==null)return;kt=h.getPlaybackFraction();const p=()=>{if(Te===0){Vn();return}const M=12*(1/60)/Math.max(h.getDurationSeconds(),1);kt=Math.max(0,Math.min(1,kt+Te*M)),h.seekToFraction(kt),je=requestAnimationFrame(p)};je=requestAnimationFrame(p)};document.addEventListener("keydown",p=>{if(n.dataset.mode==="display"&&!(p.target instanceof HTMLInputElement||p.target instanceof HTMLTextAreaElement))switch(p.key){case"Escape":p.preventDefault(),A.classList.contains("is-visible")?A.classList.remove("is-visible"):Jt();break;case" ":p.preventDefault(),jn();break;case"ArrowLeft":p.preventDefault(),L(C),V(C),Te=-1,Hn();break;case"ArrowRight":p.preventDefault(),L(C),V(C),Te=1,Hn();break;case"ArrowUp":case"ArrowDown":{if(p.preventDefault(),L(_),V(_),!(u!=null&&u.views)||Object.keys(u.views).length<=1)break;const I=r.views.filter(oe=>{var ue;return((ue=u==null?void 0:u.views)==null?void 0:ue[oe.id])!==void 0});if(I.length<=1)break;const M=u.viewId??ot(r,u),F=I.findIndex(oe=>oe.id===M),he=p.key==="ArrowUp"?(F-1+I.length)%I.length:(F+1)%I.length;Kn(I[he].id);break}}}),document.addEventListener("keyup",p=>{(p.key==="ArrowLeft"||p.key==="ArrowRight")&&(Te=0,Vn())}),h.hideMedia(),h.pause(),$e(t.lockedScaleId?"config":"entry");function Dn(p){p.id===r.id&&f||(r=p,Xt(),Gt(mn[p.id]),q.setSimulation(r,fe()),P.setPosition(0),xe(),Qt(),zt())}function hi(p){y[r.id]={...p},ve("Parameter values updated",{simClassId:r.id,values:y[r.id]}),xe()}function Gt(p){o=p,on(p),q.setTheme(p)}function Et(p){p==="parameters"&&q.setSimulation(r,fe()),q.setView(p),$e("config")}function mi(p){if(Ci(p),f){K.hide(),$e("display");return}q.setSimulation(r,fe()),q.setView("parameters")}function pi(){if(K.hide(),!f&&t.lockedScaleId){q.setSimulation(r,fe()),q.setView("parameters");return}$e(f?"display":"entry")}function Jt(){t.lockedScaleId||(ve("Returning to home screen",{simClassId:r.id}),Xt(),f=!1,h.hideMedia(),$e("entry"))}function gi(){c=!1,K.hide(),h.getPlaybackFraction()>=.999&&h.resetPlayback(),fn(h)}function yi(){c=!0,h.pause();const p=l?h.captureFrame():null;K.update(r,fe(),h.getDurationSeconds(),l,p),K.show()}function jn(){h.isPaused()?fn(h):h.pause()}function bi(p){h.setPlaybackRate(p),Jr(p),P.setSpeed(p)}async function vi(){const p=fe(),I=a.start();ve("Run requested",{simClassId:r.id,values:p,manifestSource:i.getSource()});const M=await i.findNearestVideo(r.id,r.parameters,p);if(!a.isCurrent(I))return;Xt({preserveRunRequest:!0}),u=M;const F=ot(r,M);wo({simulationId:r.id,parameters:p,manifestSource:i.getSource(),matchedRunId:M.runId});const he=Ii(M,F)??M.url,oe=[M.url,...Object.values(M.views??{})].filter(Boolean);Si(M.liveDataUrl,I),ki(M.summaryUrl,I),h.setMuted(!1),Qt(F),$e("initializing");const ue=(async()=>{await h.cacheSources(oe),a.isCurrent(I)&&(ve("Cached run video sources",{simClassId:r.id,selectedViewUrl:he,sourceCount:oe.length}),h.setSource(he),h.pause(),await h.waitForLoadedData(So),a.isCurrent(I))})();await new Promise(lt=>{ye.show(to(r),lt,ue,{minTerminalTimeMs:Ni()})}),a.isCurrent(I)&&(f=!0,h.showMedia(),fn(h),$e("display"))}function $e(p){if(n.dataset.mode=p,p==="entry"?document.documentElement.setAttribute("data-theme","glass"):p==="display"&&on(o),rt(b,p==="display"||p==="config"),rt(S,p==="display"||p==="entry"),rt(E,!t.lockedScaleId&&(p==="entry"||p==="config"||p==="display")),p==="entry"?L(E):te(E),p==="entry"&&!t.lockedScaleId?Ce.show():Ce.hide(),p==="config"?(ye.hide(),q.setSimulation(r,fe()),q.show()):q.hide(),p!=="display")K.hide();else if(c){const M=h.captureFrame();K.update(r,fe(),h.getDurationSeconds(),l,M),K.show()}!f||p==="initializing"?(h.hideMedia(),p==="initializing"&&h.pause()):h.showMedia(),p!=="initializing"&&ye.hide(),zt()}function zt(){if(n.dataset.mode==="entry"){rt(w,!0);return}const p=n.dataset.mode==="display",I=r.id==="galaxy",F=ot(r,u)==="hst";rt(w,p&&I&&F)}function xe(p=0){const I=mo(m,p,h.getDurationSeconds()),M=Ei(r,l,p,h.getDurationSeconds());se.update(r,fe(),{...I,...M})}function Qt(p){const I=r.views.filter(he=>{var oe;return((oe=u==null?void 0:u.views)==null?void 0:oe[he.id])!==void 0});if(I.length<=1){T.hide(),Y.classList.add("is-hidden");return}const M=p??ot(r,u),F=I.find(he=>he.id===M);T.update(I,M),F?(Y.classList.remove("is-hidden"),Y.innerHTML=`<span class="viewport-title">${F.label??F.id}</span>`):Y.classList.add("is-hidden")}function Xt(p={}){p.preserveRunRequest||a.invalidate(),m=Pt,c=!1,l=null,u=null,d=0,U=!1,B=null,$!==null&&(cancelAnimationFrame($),$=null),K.hide(),T.hide(),h.pause(),h.clearCachedSources(),h.resetPlayback(),P.setPosition(0)}function Kn(p){if(!(u!=null&&u.views)||p===ot(r,u))return;const I=u.views[p];if(!I)return;u.viewId=p;const M=!h.isPaused()&&!c,F=c?0:h.getPlaybackFraction();c=!1,K.hide(),h.setSource(I,{seekFraction:F,autoplay:M}),Qt(p),A.classList.remove("is-visible"),zt()}function fe(){return{...y[r.id]}}function wi(p){return Object.fromEntries(p.parameters.map(I=>[I.id,_i(I)]))}function _i(p){if(p.logScale){const oe=Math.log10(p.min),ue=Math.log10(p.max);return 10**(oe+Math.random()*(ue-oe))}const I=Math.max(0,Math.round((p.max-p.min)/p.step)),M=Math.floor(Math.random()*(I+1)),F=p.min+M*p.step,he=Zs(p.step);return Number(F.toFixed(he))}async function Si(p,I){let M=Pt;try{M=await ho(p)}catch(F){He("Failed to load live stats",{url:p,error:F instanceof Error?F.message:String(F)})}a.isCurrent(I)&&(m=M,xe())}async function ki(p,I){const M=await so(p);a.isCurrent(I)&&(l=M,xe(d))}function Ei(p,I,M,F){if(!I||!Number.isFinite(F)||F<=0)return{};const he=Math.max(0,Math.min(1,M/F)),oe={};for(const ue of p.metadata.liveStats){if(!ue.live||!ue.fromVideo||!ue.scaleWithTime)continue;const Zt=ue.videoKey??ue.id,lt=I[Zt];if(typeof lt!="number"||!Number.isFinite(lt))continue;const Yn=lt*he;oe[ue.id]=ue.integer?String(Math.floor(Yn)):String(Yn)}return oe}function rt(p,I){p.hidden=!I,p.classList.toggle("is-hidden",!I)}function ot(p,I){return I!=null&&I.views?I.viewId??Object.keys(I.views)[0]:I==null?void 0:I.viewId}function Ii(p,I){return!I||!p.views?null:p.views[I]??null}function qn(p){const I=new Set(jr(p,e));return We.filter(M=>I.has(M.id))}function Wn(p){return p?We.find(I=>I.id===p)??null:null}function Ni(){return i.getSource()!=="local"?Sn.MIN_TERMINAL_TIME_MS:Li(Sn.MIN_TERMINAL_TIME_MS,ko)}function Li(p,I){const M=Math.ceil(Math.min(p,I)),F=Math.floor(Math.max(p,I));return Math.floor(Math.random()*(F-M+1))+M}function Ci(p){const I=r.id,M=t.manifestSource;t=Dr(p,e),fs(t.verboseLogging),s=qn(t),i.setSource(t.manifestSource),t.manifestSource==="online"&&i.preloadActiveManifest(),N.setHomeVisible(!t.lockedScaleId),K.setHomeVisible(!t.lockedScaleId),Ce.setSimulationClasses(s),q.setAdvancedSettings(t),ve("Advanced settings updated",t),M!==t.manifestSource&&(u=null);const F=Wn(t.lockedScaleId);F&&(Dn(F),F.id!==I&&(f=!1,h.hideMedia(),q.setView("parameters")),f||(Gt(mn[F.id]),q.setSimulation(r,fe())))}}function No(){const n=document.getElementById("app");if(!n)throw new Error("App mount element not found.");Io(n)}No();
//# sourceMappingURL=main-DBlEl3fF.js.map
