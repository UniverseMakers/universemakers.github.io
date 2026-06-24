import{f as Te,w as ke,a as at,b as At,c as le,p as rt,d as Tt,A as kt,I as Ye,l as K,e as Se,T as Pt,S as we,g as Nt,h as Mt,i as xt,j as $e,k as Rt,m as Ot,n as Ft,o as Vt,s as Ht,q as Ut}from"./placeholder-assets-CuVhZPw8.js";function Bt(o,a){const n=document.createElement("div");n.className="viewport";const t=document.createElement("video");t.className="viewport__media is-empty",t.src=a,t.loop=!1,t.muted=!0,t.playsInline=!0,t.preload="auto",t.setAttribute("aria-label","Simulation output"),n.appendChild(t),o.appendChild(n);let l,i,d,m=new Set,w=!1;const u=new Map,r=new Map,h=new Map;let _=null,b=null;const S=document.createElement("canvas"),c=S.getContext("2d");t.addEventListener("play",()=>d==null?void 0:d(!1)),t.addEventListener("pause",()=>d==null?void 0:d(!0)),t.addEventListener("ended",()=>d==null?void 0:d(!0)),t.addEventListener("timeupdate",()=>{!l||!Number.isFinite(t.duration)||t.duration<=0||l(t.currentTime/t.duration)}),t.addEventListener("ended",()=>{i==null||i()});let f=t.playbackRate;function g(){_&&(URL.revokeObjectURL(_),_=null)}function C(p,E={}){const I=r.get(p);I&&(r.delete(p),E={...E,ownedObjectUrl:!0},p=I),t.classList.add("fade-out"),window.setTimeout(()=>{if(t.src.endsWith(p)){t.classList.remove("fade-out");return}const F=t.muted,R=E.seekFraction;g(),b=null,_=E.ownedObjectUrl?p:null,t.src=p,t.load(),t.onloadeddata=()=>{if(t.muted=F,R!==void 0&&Number.isFinite(t.duration)&&t.duration>0){const me=Math.max(0,Math.min(.999,R));t.currentTime=me*t.duration}else t.currentTime=0;t.playbackRate=f,t.classList.remove("fade-out"),E.autoplay&&t.play().catch(()=>{})}},120)}function N(p){t.muted=p}async function P(){await t.play()}function A(){t.pause()}function U(){t.classList.add("is-empty")}function O(){t.classList.remove("is-empty")}function T(p){if(!Number.isFinite(t.duration)||t.duration<=0)return;const E=Math.max(0,Math.min(1,p));t.currentTime=E*t.duration}function M(){t.currentTime=0,l==null||l(0)}function J(p=8e3){return t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(E=>{const I=()=>{R(),E()},F=window.setTimeout(()=>{R(),E()},Math.max(0,p));function R(){window.clearTimeout(F),t.removeEventListener("loadeddata",I)}t.addEventListener("loadeddata",I,{once:!0})})}function ae(p,E=8e3){const I=Math.max(0,p);return I===0||ie(I)?Promise.resolve():new Promise(F=>{const R=()=>{ie(I)&&(de(),F())},me=window.setTimeout(()=>{de(),F()},Math.max(0,E));function de(){window.clearTimeout(me),t.removeEventListener("progress",R),t.removeEventListener("canplay",R),t.removeEventListener("loadeddata",R)}t.addEventListener("progress",R),t.addEventListener("canplay",R),t.addEventListener("loadeddata",R),R()})}function ie(p){const E=t.currentTime;for(let I=0;I<t.buffered.length;I+=1){const F=t.buffered.start(I),R=t.buffered.end(I);if(!(E<F||E>R))return R-E>=p}return!1}function Z(p){m=new Set(p.filter(Boolean).filter(E=>E!==t.currentSrc)),w||D()}function X(){w=!0,se(),Q()}function ce(){if(!w){D();return}w=!1,D()}function D(){for(const[p,E]of u.entries())m.has(p)||(E.removeAttribute("src"),E.load(),u.delete(p));for(const[p,E]of h.entries())m.has(p)||(E.abort(),h.delete(p));for(const p of m){if(!u.has(p)){const E=document.createElement("video");E.preload="auto",E.muted=!0,E.playsInline=!0,E.src=p,E.load(),u.set(p,E)}r.has(p)||h.has(p)||_e(p)}}function se(){for(const p of u.values())p.removeAttribute("src"),p.load();u.clear()}function Q(){for(const p of h.values())p.abort();h.clear()}function _e(p){const E=new AbortController;h.set(p,E);const I=`${p}?_=${Date.now()}`;fetch(I,{signal:E.signal}).then(async F=>{if(!F.ok)return;const R=await F.blob();m.has(p)&&r.set(p,URL.createObjectURL(R))}).catch(F=>{F instanceof DOMException&&F.name}).finally(()=>{h.get(p)===E&&h.delete(p)})}function oe(){m.clear(),w=!1,se(),Q();for(const p of r.values())URL.revokeObjectURL(p);r.clear()}function q(p){return r.get(p)??null}function B(){!c||t.readyState<2||t.videoWidth===0||t.videoHeight===0||(S.width=t.videoWidth,S.height=t.videoHeight,c.drawImage(t,0,0,S.width,S.height),b=S.toDataURL("image/jpeg",.85))}function j(){return b||B(),b}function $(p){l=p}function z(p){i=p}return{setSource:C,setMuted:N,play:P,pause:A,hideMedia:U,showMedia:O,seekToFraction:T,resetPlayback:M,waitForLoadedData:J,waitForBufferedAhead:ae,onTimeUpdate:$,onEnded:z,getDurationSeconds:()=>Number.isFinite(t.duration)?t.duration:0,getPlaybackFraction:()=>!Number.isFinite(t.duration)||t.duration<=0?0:t.currentTime/t.duration,isPaused:()=>t.paused,setPlaybackRate:p=>{f=p,t.playbackRate=p},getPlaybackRate:()=>f,onPlayStateChange:p=>{d=p},getElement:()=>n,prewarmSources:Z,suspendPrewarming:X,resumePrewarming:ce,clearPrewarmedSources:oe,getPrewarmedBlobUrl:q,captureFrame:j}}const Dt=[.25,.5,1,2];function jt(o,a={}){const{onChange:n,onTogglePlay:t,onSpeedChange:l,onScrubStart:i,onScrubEnd:d,initialSpeed:m=1}=a,w=document.createElement("div");w.className="timeline";const u=document.createElement("div");u.className="timeline__bar-row";const r=document.createElement("button");r.className="timeline__play-btn",r.type="button",r.setAttribute("aria-label","Toggle playback"),r.addEventListener("click",()=>t==null?void 0:t());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const _=document.createElement("div");_.className="timeline__speed";const b=document.createElement("button");b.className="timeline__speed-btn",b.type="button",b.setAttribute("aria-label","Playback speed"),b.addEventListener("click",()=>{_.classList.toggle("open")});const S=document.createElement("div");S.className="timeline__speed-menu";for(const f of Dt){const g=document.createElement("button");g.className="timeline__speed-option",g.type="button",g.textContent=We(f),g.addEventListener("click",()=>{_.classList.remove("open"),l==null||l(f)}),S.appendChild(g)}return _.appendChild(b),_.appendChild(S),u.appendChild(r),u.appendChild(h),u.appendChild(_),h.addEventListener("input",()=>{const f=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${f*100}%`),n==null||n(f)}),h.addEventListener("pointerdown",()=>i==null?void 0:i()),h.addEventListener("pointerup",()=>d==null?void 0:d()),h.addEventListener("change",()=>d==null?void 0:d()),document.addEventListener("click",f=>{_.contains(f.target)||_.classList.remove("open")}),w.appendChild(u),o.appendChild(w),c(m),{setPosition(f){const g=Math.max(0,Math.min(1,f));h.value=String(Math.round(g*1e3)),h.style.setProperty("--fill",`${g*100}%`)},setPlaying(f){r.textContent=f?"⏸":"▶",r.classList.toggle("is-paused",!f),r.setAttribute("aria-label",f?"Pause":"Play")},setSpeed(f){c(f)}};function c(f){b.textContent=We(f);for(const g of S.children)g.classList.toggle("is-active",g.textContent===We(f))}}function We(o){return`x${o}`}function $t(o){const a=document.createElement("aside");a.className="data-panel";const n=document.createElement("div");return n.className="data-panel__metrics",a.appendChild(n),o.appendChild(a),{update(t,l,i={}){n.innerHTML="";const d=Wt(t,l,i);for(const m of t.metadata.liveStats){const w=zt(m,d),u=document.createElement("div");u.className="data-panel__metric",u.innerHTML=`
          <span class="data-panel__metric-label">${w.label}</span>
          <span class="data-panel__metric-value">${w.value}</span>
        `,n.appendChild(u)}}}}function Wt(o,a,n){const t=Object.fromEntries(o.parameters.map(i=>[i.id,{label:i.label,value:Te(a[i.id]??i.fallbackValue,i.step,{scale:i.valueScale,format:i.displayFormat,significantFigures:i.displaySignificantFigures})}])),l={scale:{label:"Scale",value:o.label},parameters:{label:"Parameters",value:String(o.parameters.length)}};return{...t,...l,...Object.fromEntries(Object.entries(n).map(([i,d])=>[i,{label:qt(i),value:d}]))}}function qt(o){return o.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function zt(o,a){const n=a[o.id]??{label:o.id,value:"--"},t=o.liveKey??o.id,l=a[t],i=Gt((l==null?void 0:l.value)??n.value??"--",o,!!l);return{label:o.label??(l==null?void 0:l.label)??n.label,value:ke(i,o.unit)}}function Gt(o,a,n){if(o==="--")return o;const t=Number(o);if(!Number.isFinite(t))return o;const l=a.valueScale??1,i=t*l;return n?a.integer?at(Math.round(i)):at(i):a.integer?Math.max(0,Math.round(i)).toLocaleString(void 0):At(o,{integer:a.integer})}const Yt={planetary:"Smash a planet into the early Earth. Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function Kt(o,a,n){const t=le("assets/banner-1600.webp"),l=[`${le("assets/banner-960.webp")} 960w`,`${le("assets/banner-1600.webp")} 1600w`].join(", "),i=le("assets/2-McAlpine.webp"),d=document.createElement("section");d.className="overlay overlay--entry",d.hidden=!0,d.classList.add("is-hidden");const m=document.createElement("div");m.className="entry-overlay",m.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${t}" srcset="${l}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const w=document.createElement("div");w.className="entry-overlay__actions";function u(c){w.innerHTML="";for(const f of c){const g=document.createElement("button");g.className="entry-overlay__button",g.type="button";const C=Yt[f.id]??"Explore this simulation scale.";g.innerHTML=`
        <span class="entry-overlay__button-label">${f.label}</span>
        <span class="entry-overlay__button-description">${C}</span>
      `,g.addEventListener("click",()=>n(f)),w.appendChild(g)}}u(a);const r=document.createElement("div"),h=document.createElement("button");h.className="view-switcher__info entry-overlay__info-button",h.type="button",h.setAttribute("aria-label","About this experience"),h.appendChild(Zt()),r.className="sci-modal is-hidden",r.innerHTML=`
    <div class="entry-info-modal">
      <div class="entry-info-modal__shell">
        <div class="entry-info-modal__media">
          <img
            class="entry-info-modal__image"
            src="${i}"
            alt="Universe Engine preview"
            width="1920"
            height="1080"
            decoding="async"
          />
          <div class="entry-info-modal__media-copy">
            <p class="entry-info-modal__eyebrow">Universe Engine</p>
            <h2 class="entry-info-modal__headline">Explore Simulation At Human Scale</h2>
          </div>
        </div>
        <div class="entry-info-modal__content">
          <button class="entry-info-modal__close" type="button" aria-label="Close">×</button>
          <div class="entry-info-modal__header">
            <p class="entry-info-modal__eyebrow">About</p>
            <h2 class="entry-info-modal__title">What Is This Experience?</h2>
            <p class="entry-info-modal__subtitle">
              Universe Engine turns large scientific simulations into an interactive public-facing
              experience: choose a scale, change the inputs, and see how those decisions reshape
              the final outcome.
            </p>
          </div>
          <div class="entry-info-modal__body">
            <section class="entry-info-modal__section">
              <h3 class="entry-info-modal__section-title">What can you do?</h3>
              <p class="entry-info-modal__copy">
                Pick a theme, tune a small set of meaningful parameters, run the simulation, and
                compare your choices with the scientific targets, outputs, and computational cost.
              </p>
            </section>
            <section class="entry-info-modal__section">
              <h3 class="entry-info-modal__section-title">What should you take away?</h3>
              <div class="entry-info-modal__theme-list">
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Planetary</p>
                  <p class="entry-info-modal__copy">
                    Small shifts in angle, speed, and mass can completely change how a Moon-forming
                    impact unfolds.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Galaxy</p>
                  <p class="entry-info-modal__copy">
                    Galaxies emerge from long feedback loops between stars, gas, and black holes,
                    not from any single parameter in isolation.
                  </p>
                </div>
                <div class="entry-info-modal__theme">
                  <p class="entry-info-modal__theme-title">Cosmos</p>
                  <p class="entry-info-modal__copy">
                    Even the largest structures in the Universe depend sensitively on the basic
                    physical laws underpinning everything from the Big Bang to the present day.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,m.appendChild(w),d.appendChild(m),d.appendChild(h),d.appendChild(r),o.appendChild(d);const _=r.querySelector(".entry-info-modal__close");function b(){r.classList.remove("is-hidden")}function S(){r.classList.add("is-hidden")}return h.addEventListener("click",b),_.addEventListener("click",S),r.addEventListener("click",c=>{c.target===r&&S()}),{show(){d.hidden=!1,d.classList.remove("is-hidden")},hide(){S(),d.hidden=!0,d.classList.add("is-hidden")},setSimulationClasses(c){u(c)}}}function Jt(o){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=o,a}function Zt(){return Jt(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}function Xt(o,a){const n=document.createElement("div");return n.className="view-switcher is-hidden",o.appendChild(n),{update(t,l){if(n.innerHTML="",t.length<=1){n.classList.add("is-hidden");return}n.classList.remove("is-hidden");for(const i of t){const d=document.createElement("div");d.className="view-switcher__row";const m=document.createElement("button");m.className="view-switcher__button",m.type="button",m.dataset.viewId=i.id,m.classList.toggle("is-active",i.id===l),m.setAttribute("aria-pressed",String(i.id===l)),m.setAttribute("aria-label",i.label??i.id);const w=Qt(i.icon);if(w){const r=document.createElement("span");r.className="view-switcher__icon",r.setAttribute("aria-hidden","true"),r.appendChild(w),m.appendChild(r)}const u=document.createElement("span");if(u.className="view-switcher__label",u.textContent=i.label??i.id,m.appendChild(u),m.addEventListener("click",()=>a.onSelect(i.id)),d.appendChild(m),i.description){const r=document.createElement("button");r.className="view-switcher__info",r.type="button",r.setAttribute("aria-label",`Info about ${i.label??i.id}`),r.appendChild(en()),r.addEventListener("click",h=>{h.stopPropagation(),a.onInfo(i.id,i.label??i.id,i.description??"")}),d.appendChild(r)}n.appendChild(d)}},hide(){n.innerHTML="",n.classList.add("is-hidden")}}}function Qt(o){switch(o){case"dark-matter":return ye(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return ye(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return ye(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return ye(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return ye(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return ye(`
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
      `);default:return null}}function ye(o){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=o,a}function en(){return ye(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const tn=`# Credits source-of-truth.
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

- text: 'Moon formation simulations by Jacob Kegerreis, Callum Mosley, Ella Buxton, Vince Eke'

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

- text: 'Moon Formation: Jacob Kegerreis & NASA'
  url: https://www.nasa.gov/solar-system/collision-may-have-formed-the-moon-in-mere-hours-simulations-reveal/#:~:text=%E2%80%9CThis%20opens%20up%20a%20whole,in%20The%20Astrophysical%20Journal%20Letters.

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
`;function nn(){const o=rt(tn);if(!Array.isArray(o))return[];const a=[];for(const n of o){if(!n||typeof n!="object")continue;const t=n.text;if(typeof t!="string"||t.trim().length===0)continue;const l={text:t},i=n.url;typeof i=="string"&&i.trim().length>0&&(l.url=i);const d=n.logo;typeof d=="string"&&d.trim().length>0&&(l.logo=d),n.header===!0&&(l.header=!0),a.push(l)}return a}function an(o,a,n,t){const l=document.createElement("div");l.className="parameter-editor",o.appendChild(l);let i=a,d={...n};function m(r,h){i=r,d=h?{...h}:sn(r),l.innerHTML="";const _=document.createElement("div");_.className="parameter-editor__heading",_.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${r.label} Controls</h2>
    `,l.appendChild(_);const b=document.createElement("div");b.className="param-info-modal is-hidden",b.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,l.appendChild(b);const S=b.querySelector(".sci-modal__title"),c=b.querySelector(".sci-modal__body"),f=b.querySelector(".sci-modal__close");function g(P,A){S.textContent=P,c.textContent=A,b.classList.remove("is-hidden")}function C(){b.classList.add("is-hidden")}f.addEventListener("click",C),b.addEventListener("click",P=>{P.target===b&&C()});const N=document.createElement("div");N.className="parameter-editor__list";for(const P of r.parameters)N.appendChild(w(P,g));l.appendChild(N),u()}function w(r,h){const _=document.createElement("div");_.className="res-card param-card";const b=document.createElement("div");b.className="param-card__header";const S=document.createElement("span");S.className="res-card__label",S.textContent=r.label;const c=r.displayUnit??r.unit,f=document.createElement("span");f.className="param-card__range",f.textContent=`${ke(Te(r.min,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)} – ${ke(Te(r.max,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)}`,b.appendChild(S),b.appendChild(f);const g=document.createElement("input");g.className="param-card__slider",g.type="range";const C=r.logScale?Math.log10(r.min):r.min,N=r.logScale?Math.log10(r.max):r.max,P=d[r.id]??r.fallbackValue;g.min=String(C),g.max=String(N),g.step=r.logScale?"0.001":String(r.step),g.value=String(r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P),g.setAttribute("aria-label",r.label);const A=document.createElement("span");A.className="res-card__value";function U(T){const M=r.logScale?10**T:T;d[r.id]=M,g.value=String(T),g.style.setProperty("--fill",`${it(T,C,N)}%`),A.textContent=ke(Te(M,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),u()}g.addEventListener("input",()=>{U(parseFloat(g.value))}),g.addEventListener("pointerdown",T=>T.stopPropagation()),g.addEventListener("click",T=>T.stopPropagation());const O=r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P;if(g.style.setProperty("--fill",`${it(O,C,N)}%`),A.textContent=ke(Te(P,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),r.description){_.classList.add("res-card--has-info"),_.setAttribute("title",r.description);const T=document.createElement("span");T.className="param-card__info-btn",T.setAttribute("aria-label","Parameter description"),T.textContent="ⓘ",b.appendChild(T),_.addEventListener("click",()=>{h(r.label,r.description)})}return _.appendChild(b),_.appendChild(g),_.appendChild(A),_}function u(){t({...d})}return m(a,n),{setSimClass(r,h){m(r,h)},setValues(r){m(i,r)},getValues(){return{...d}}}}function sn(o){return Object.fromEntries(o.parameters.map(a=>[a.id,a.fallbackValue]))}function it(o,a,n){return n===a?0:(o-a)/(n-a)*100}function on(o,a){const n=document.createElement("section");n.className="overlay overlay--config",n.hidden=!0,n.classList.add("is-hidden");const t=document.createElement("div");t.className="config-overlay";const l=document.createElement("div");l.className="config-overlay__shell";const i=document.createElement("div");i.className="config-overlay__media",i.dataset.simClass=a.simClass.id;const d=document.createElement("img");d.className="config-overlay__media-image",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`,i.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,i.prepend(d);const m=document.createElement("div");m.className="config-overlay__controls",m.dataset.view=a.initialView??"parameters";const w=document.createElement("div");w.className="config-overlay__header";const u=document.createElement("div");u.className="config-overlay__title-block",u.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const r=u.querySelector(".config-overlay__eyebrow"),h=u.querySelector(".config-overlay__title"),_=u.querySelector(".config-overlay__subtitle"),b=document.createElement("button");b.className="config-overlay__close",b.type="button",b.setAttribute("aria-label","Back"),b.textContent="←",w.appendChild(u),w.appendChild(b);const S=document.createElement("section");S.className="config-overlay__section config-overlay__section--grow",S.dataset.section="parameters";const c=document.createElement("div");S.appendChild(c);const f=document.createElement("section");f.className="config-overlay__section config-overlay__section--grow",f.dataset.section="settings",f.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const g=document.createElement("div");f.appendChild(g);const C=document.createElement("section");C.className="advanced-settings",C.dataset.state="closed",C.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const N=document.createElement("button");N.className="advanced-settings__access",N.type="button",N.textContent="Advanced Settings",C.appendChild(N);const P=document.createElement("div");P.className="advanced-settings__auth";const A=document.createElement("input");A.className="advanced-settings__password",A.type="password",A.placeholder="Enter password",A.autocomplete="off";const U=document.createElement("button");U.className="advanced-settings__unlock",U.type="button",U.textContent="Unlock";const O=document.createElement("p");O.className="advanced-settings__message",P.appendChild(A),P.appendChild(U),P.appendChild(O),C.appendChild(P);const T=document.createElement("div");T.className="advanced-settings__form";const M=document.createElement("label");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const J=document.createElement("select");J.className="advanced-settings__select",J.appendChild(new Option("None",""));for(const v of a.availableScales)J.appendChild(new Option(v.label,v.id));M.appendChild(J),T.appendChild(M);const ae=document.createElement("div");ae.className="advanced-settings__field",ae.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const ie=document.createElement("div");ie.className="advanced-settings__options";const Z=document.createElement("label"),X=document.createElement("input");Z.className="advanced-settings__choice",X.type="radio",X.name="manifest-source",X.value="local",Z.appendChild(X),Z.append("Local manifest");const ce=document.createElement("label"),D=document.createElement("input");ce.className="advanced-settings__choice",D.type="radio",D.name="manifest-source",D.value="online",ce.appendChild(D),ce.append("Online manifest"),ie.appendChild(Z),ie.appendChild(ce),ae.appendChild(ie),T.appendChild(ae);const se=document.createElement("label");se.className="advanced-settings__field advanced-settings__field--inline";const Q=document.createElement("input"),_e=document.createElement("span");Q.type="checkbox",Q.className="advanced-settings__checkbox",_e.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,se.appendChild(Q),se.appendChild(_e),T.appendChild(se);const oe=document.createElement("div");oe.className="advanced-settings__field",oe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const q=document.createElement("div");q.className="advanced-settings__options";const B=new Map;for(const v of a.availableScales){const k=document.createElement("label"),x=document.createElement("input");k.className="advanced-settings__choice",x.type="checkbox",x.value=v.id,B.set(v.id,x),k.appendChild(x),k.append(`Show ${v.label}`),q.appendChild(k)}oe.appendChild(q),T.appendChild(oe),C.appendChild(T),f.appendChild(C);const j=document.createElement("section");j.className="config-overlay__section config-overlay__section--grow",j.dataset.section="credits",j.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const $=j.querySelector("[data-credits]"),z=nn();if($.innerHTML="",z.length===0){const v=document.createElement("div");v.className="credits-list__entry",v.textContent="To be credited...",$.appendChild(v)}else for(const v of z)if(v.header){const k=document.createElement("div");k.className="credits-list__heading",k.textContent=v.text,$.appendChild(k)}else{const k=document.createElement("div");k.className="credits-list__entry";const x=document.createElement("span");if(x.className="credits-list__text",v.url){const V=document.createElement("a");V.className="credits-list__link",V.href=v.url,V.target="_blank",V.rel="noopener noreferrer",V.textContent=v.text,x.appendChild(V)}else x.textContent=v.text;k.appendChild(x),$.appendChild(k)}const p=document.createElement("div");p.className="config-overlay__footer";const E=document.createElement("button");E.className="run-button",E.type="button",E.textContent="Run",p.appendChild(E),m.appendChild(w),m.appendChild(S),m.appendChild(f),m.appendChild(j),m.appendChild(p),l.appendChild(i),l.appendChild(m),t.appendChild(l),n.appendChild(t),o.appendChild(n);let I=Ae(a.advancedSettings),F="closed";const R=an(c,a.simClass,a.values,a.onValuesChange),me=Tt(g,a.theme,a.onThemeChange);b.addEventListener("click",a.onClose),N.addEventListener("click",()=>{if(F==="open"){ue("closed");return}ue("auth"),A.focus()}),U.addEventListener("click",Ie),A.addEventListener("keydown",v=>{v.key==="Enter"&&Ie()}),J.addEventListener("change",()=>{I.lockedScaleId=J.value||null,re()}),X.addEventListener("change",()=>{X.checked&&(I.manifestSource="local")}),D.addEventListener("change",()=>{D.checked&&(I.manifestSource="online")}),Q.addEventListener("change",()=>{I.verboseLogging=Q.checked});for(const[v,k]of B.entries())k.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,V])=>V.checked).map(([V])=>V).length===0&&!I.lockedScaleId){k.checked=!0;return}I.hiddenScaleIds=Array.from(B.keys()).filter(V=>{var H;return!((H=B.get(V))!=null&&H.checked)&&V!==I.lockedScaleId}),re()}),v===I.lockedScaleId&&(k.disabled=!0);de(a.initialView??"parameters"),re();function de(v){m.dataset.view=v,v==="parameters"?(r.textContent=a.simClass.label,h.textContent="Shape Your Simulation",_.textContent=a.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`):v==="settings"?(r.textContent="Interface",h.textContent="Adjust The Control Room",_.textContent="Change the interface theme and manage exhibit-level options for this installation.",d.src=le("assets/Cluster_Stuart.webp"),d.alt="Galaxy cluster simulation preview"):(r.textContent="References",h.textContent="Project Sources And Attribution",_.textContent="Review the datasets, imagery, and supporting materials behind this experience.",d.src=le("assets/synthetic_hst_pretty_galaxy.webp"),d.alt="Synthetic galaxy image preview"),v==="settings"?E.textContent="Apply":v==="credits"?E.textContent="Close":E.textContent="Run Simulation"}function re(){J.value=I.lockedScaleId??"",X.checked=I.manifestSource==="local",D.checked=I.manifestSource==="online",Q.checked=I.verboseLogging;for(const[v,k]of B.entries()){const x=I.lockedScaleId===v;k.checked=x||!I.hiddenScaleIds.includes(v),k.disabled=x}}function Ie(){if(A.value!==kt){O.textContent="Incorrect password";return}A.value="",O.textContent="",ue("open")}function ue(v){F=v,C.dataset.state=v,N.textContent=v==="open"?"Hide Advanced Settings":"Advanced Settings",v!=="auth"&&(O.textContent="")}function pe(){A.value="",O.textContent="",ue("closed")}function xe(){I=Ae(a.advancedSettings),re()}return E.addEventListener("click",()=>{const v=m.dataset.view;if(v==="settings"){a.onApplySettings(Ae(I));return}if(v==="credits"){a.onClose();return}a.onRun()}),{show(){n.hidden=!1,n.classList.remove("is-hidden")},hide(){n.hidden=!0,n.classList.add("is-hidden"),xe(),pe()},setSimulation(v,k){a.simClass=v,i.dataset.simClass=v.id,R.setSimClass(v,k),m.dataset.view==="parameters"&&(d.src=v.placeholderImage,d.alt=`${v.label} preview`,de("parameters"))},setTheme(v){me.setActive(v)},setView(v){de(v),v!=="settings"&&pe()},setAdvancedSettings(v){a.advancedSettings=Ae(v),I=Ae(v),re(),pe()}}}function Ae(o){return{lockedScaleId:o.lockedScaleId,manifestSource:o.manifestSource,verboseLogging:o.verboseLogging,hiddenScaleIds:[...o.hiddenScaleIds]}}function rn(o){const{TYPING_MS_PER_CHAR:a,MIN_TERMINAL_TIME_MS:n,FINAL_PAUSE_MS:t}=Ye,l=document.createElement("section");l.className="overlay overlay--initializing",l.hidden=!0,l.classList.add("is-hidden");const i=document.createElement("div");i.className="terminal";const d=document.createElement("div");d.className="terminal__header",d.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const m=document.createElement("div");m.className="terminal__log",i.appendChild(d),i.appendChild(m),l.appendChild(i),o.appendChild(l);let w=[],u=0;function r(){for(const S of w)window.clearTimeout(S);w=[]}function h(S,c){return new Promise(f=>{const g=window.setTimeout(()=>{c===u&&f()},Math.max(0,S));w.push(g)})}async function _(S,c){const f=document.createElement("div");f.className="terminal__line";const g=b();f.appendChild(g),m.appendChild(f);for(let C=0;C<S.length;C+=1){if(c!==u)return;const N=S[C];f.insertBefore(document.createTextNode(N),g),m.scrollTop=m.scrollHeight,await h(a,c)}g.remove()}function b(){const S=document.createElement("span");return S.className="terminal__cursor",S.textContent="█",S}return{async show(S,c,f,g){r(),u+=1;const C=u;l.hidden=!1,l.classList.remove("is-hidden");const N=performance.now(),P=(g==null?void 0:g.minTerminalTimeMs)??n;let A=!f,U=[...S];f&&f.then(()=>{A=!0});let O=0;for(;C===u;){U.length===0&&(U=[...S]);const M=Math.floor(Math.random()*U.length),[J]=U.splice(M,1),ae=`${st(O)} ${J.text}`;if(O+=1,await _(ae,C),C!==u)return;if(performance.now()-N>=P&&A)break}if(C!==u)return;const T=document.createElement("div");T.className="terminal__line terminal__line--syncing",T.textContent=`${st(O)} STARTING SIMULATION...`,m.appendChild(T),m.scrollTop=m.scrollHeight,await h(t,C),C===u&&c()},hide(){r(),u+=1,l.hidden=!0,l.classList.add("is-hidden"),m.innerHTML=""}}}function st(o){const a=Math.max(0,Math.floor(o)),n=Math.floor(a/3600),t=Math.floor(a%3600/60),l=a%60;return`[${qe(n)}:${qe(t)}:${qe(l)}]`}function qe(o){return String(o).padStart(2,"0")}function ln(o,a){const n=document.createElement("button");n.className="display-button",n.type="button",n.innerHTML="<span></span><span></span><span></span>",n.setAttribute("aria-label","Open configuration overlay"),o.appendChild(n);const t=document.createElement("div");t.className="display-menu";const l=document.createElement("div");l.className="display-menu__header",l.textContent="Menu",t.appendChild(l);const i=w("Home",()=>{u(),a.onHome()});t.appendChild(i),t.appendChild(w("Settings",()=>{u(),a.onViewSelected("settings")})),t.appendChild(w("Credits",()=>{u(),a.onViewSelected("credits")}));const d=w("Fullscreen",()=>{var h;u(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});t.appendChild(d),o.appendChild(t);function m(){const h=d.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const _=document.getElementById("app");_&&_.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",m),n.addEventListener("click",()=>{o.classList.toggle("open")}),document.addEventListener("click",h=>{o.contains(h.target)||u()}),r(a.showHome??!0),{close:u,setHomeVisible:r};function w(h,_){const b=document.createElement("button");return b.className="display-menu__item",b.type="button",b.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,b.addEventListener("click",_),b}function u(){o.classList.remove("open")}function r(h){i.hidden=!h,i.classList.toggle("is-hidden",!h)}}const cn=`# Initialization terminal script for the Planetary simulation family.
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
`,dn=`# Initialization terminal script for the Galaxy simulation family.
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
`,un=`# Initialization terminal script for the Cosmos simulation family.
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
`,mn={planetary:cn,galaxy:dn,cosmos:un};function pn(o){return rt(mn[o.id]).map(n=>({text:n}))}const Me={mode:"time",frames:[]};async function hn(o){const a=await fetch(o);if(!a.ok)throw new Error(`Failed to load live stats CSV: ${o}`);const n=await a.text();return vn(n)}function fn(o,a,n=0){if(o.mode==="row")return yn(o.frames,a,n);const t=o.frames;if(t.length===0)return{};if(a<=t[0].t)return{...t[0].values};const l=t[t.length-1];if(a>=l.t)return{...l.values};const i=gn(t,a),d=t[Math.max(0,i-1)],m=t[Math.min(t.length-1,i)],w=(a-d.t)/Math.max(m.t-d.t,1e-9);return _n(d.values,m.values,w)}function gn(o,a){let n=1,t=o.length-1;for(;n<t;){const l=Math.floor((n+t)/2);o[l].t<=a?n=l+1:t=l}return n}function vn(o){const a=o.split(/\r?\n/).map(t=>t.trim()).filter(Boolean);if(a.length<2)return Me;const n=ze(a[0]);return n[0]==="t"?{mode:"time",frames:a.slice(1).map(t=>{const l=ze(t),i={};for(let d=1;d<n.length;d+=1)i[n[d]]=l[d]??"";return{t:parseFloat(l[0]??"0")||0,values:i}})}:{mode:"row",frames:a.slice(1).map((t,l)=>{const i=ze(t),d={};for(let m=0;m<n.length;m+=1)d[n[m]]=i[m]??"";return{t:l,values:d}})}}function yn(o,a,n){if(o.length===0)return{};if(!Number.isFinite(n)||n<=0)return{...o[0].values};const t=Math.max(0,Math.min(1,a/n)),l=Math.round(t*(o.length-1));return{...o[l].values}}function ze(o){const a=[];let n="",t=!1;for(let l=0;l<o.length;l+=1){const i=o[l];if(i==='"'){t=!t;continue}if(i===","&&!t){a.push(n),n="";continue}n+=i}return a.push(n),a}function _n(o,a,n){const t=new Set([...Object.keys(o),...Object.keys(a)]),l={};for(const i of t){const d=o[i]??"",m=a[i]??d,w=parseFloat(d),u=parseFloat(m);if(Number.isFinite(w)&&Number.isFinite(u)){const r=w+(u-w)*n;l[i]=bn(r);continue}l[i]=n<.5?d:m}return l}function bn(o){return o.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function En(o){wn(Pt,o)}function wn(o,a){if(navigator.sendBeacon){const n=new Blob([JSON.stringify(a)],{type:"application/json"});if(navigator.sendBeacon(o,n)){K("Run selection tracking dispatched",{simulationId:a.simulationId});return}}fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),keepalive:!0}).then(n=>{n.ok?K("Run selection tracked",{simulationId:a.simulationId}):Se("Run selection tracking rejected",{simulationId:a.simulationId,status:n.status})}).catch(n=>{Se("Run selection tracking failed",{simulationId:a.simulationId,error:n instanceof Error?n.message:String(n)})})}const ot=50*1024*1024,Sn=8,In=6e3,Cn=8e3,Ln=5e3,An=1200,Tn=100,Ge={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function kn(o){const a=we.map(e=>e.id);let n=Nt(a),t=et(n);const l=Mt(n.manifestSource);n.manifestSource==="online"&&l.preloadActiveManifest();let i=tt(n.lockedScaleId)??t[0]??we[0],d=n.lockedScaleId?Ge[i.id]:xt(),m=!1,w=null,u=null,r=0,h=Me,_=!1;const b=Object.fromEntries(we.map(e=>[e.id,yt(e)]));$e(d);const S=Rt(i.id),c=Bt(o,S),f=document.createElement("div");f.className="display-chrome",f.classList.add("is-hidden"),o.appendChild(f);const g=document.createElement("div");g.className="orientation-overlay",g.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,o.appendChild(g);const C=document.createElement("div");C.className="swift-logo",C.innerHTML=`
    <img
      class="swift-logo__image"
      src="${le("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,o.appendChild(C);const N=document.createElement("div");N.className="synth-logo is-hidden",N.innerHTML=`
    <img
      class="synth-logo__image"
      src="${le("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,o.appendChild(N);const P=document.createElement("img");P.className="app-partner-logo",P.src=le("assets/dirac-hpc-white.webp"),P.alt="DIRAC HPC",P.decoding="async",o.appendChild(P);const A=document.createElement("div");A.className="display-chrome__top-left is-hidden",o.appendChild(A);const U=ln(A,{onHome(){He()},onViewSelected(e){if(e==="credits"){Ne("credits");return}Ne(e)},showHome:!n.lockedScaleId}),O=document.createElement("div");O.className="display-chrome__left-center",f.appendChild(O);const T=Xt(O,{onSelect(e){Qe(e)},onInfo(e,s,y){J.textContent=s,ae.textContent=y,M.classList.add("is-visible")}}),M=document.createElement("div");M.className="view-info-overlay",M.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,o.appendChild(M);const J=M.querySelector(".view-info-overlay__title"),ae=M.querySelector(".view-info-overlay__text"),ie=M.querySelector(".view-info-overlay__close");M.addEventListener("click",e=>{e.target===M&&M.classList.remove("is-visible")}),ie.addEventListener("click",()=>{M.classList.remove("is-visible")});const Z=document.createElement("div");Z.className="display-chrome__top-center is-hidden",f.appendChild(Z);const X=document.createElement("div");X.className="display-chrome__top-right",f.appendChild(X);const ce=$t(X),D=document.createElement("div");D.className="display-chrome__center-status",D.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,f.appendChild(D);const se="universe-engine-playback-speed",Q=()=>{const e=localStorage.getItem(se),s=e?Number(e):NaN;return[.25,.5,1,2].includes(s)?s:1},_e=e=>{localStorage.setItem(se,String(e))},oe=Q();c.setPlaybackRate(oe);const q=document.createElement("div");q.className="display-chrome__bottom",f.appendChild(q);const B=jt(q,{onChange(e){me(e)},onTogglePlay:Xe,onSpeedChange:mt,onScrubStart(){xe(),R()},onScrubEnd(){v(),c.isPaused()||F()},initialSpeed:oe});B.setPlaying(!c.isPaused());let j=null,$=null,z=null,p=!1,E=null,I=0;function F(){if(j!==null)return;function e(){const s=c.getPlaybackFraction();B.setPosition(s),c.isPaused()?j=null:j=requestAnimationFrame(e)}j=requestAnimationFrame(e)}function R(){j!==null&&(cancelAnimationFrame(j),j=null)}function me(e){$=e,z===null&&(z=requestAnimationFrame(()=>{if(z=null,$===null)return;const s=$;$=null,c.seekToFraction(s)}))}function de(){if($===null)return;z!==null&&(cancelAnimationFrame(z),z=null);const e=$;$=null,c.seekToFraction(e)}function re(){E!==null&&(window.clearTimeout(E),E=null)}function Ie(){if(!(u!=null&&u.views))return[];const e=Ee(i,u);return Object.entries(u.views).filter(([s])=>s!==e).map(([,s])=>s).filter(Boolean)}function ue(){re(),c.suspendPrewarming()}function pe(e=An){re(),!(p||c.isPaused())&&(E=window.setTimeout(()=>{E=null,!(p||c.isPaused())&&(c.resumePrewarming(),c.prewarmSources(Ie()))},Math.max(0,e)))}function xe(){p=!0,I=0,ue()}function v(){p=!1,I=0,de(),r=c.getPlaybackFraction()*c.getDurationSeconds(),ve(r),pe()}c.onPlayStateChange(e=>{B.setPlaying(!e),e?(R(),ue()):(F(),pe(0))}),c.onTimeUpdate(e=>{if(r=e*c.getDurationSeconds(),p){const s=performance.now();if(s-I<Tn)return;I=s}ve(r)});const k=document.createElement("div");k.className="overlay-layer",o.appendChild(k);const x=Ot(k,{onReplay:ut,onParameters:()=>Ne("parameters"),onHome:He,showHome:!n.lockedScaleId});c.onEnded(()=>{m=!0;const e=c.captureFrame();x.update(i,te(),c.getDurationSeconds(),w,e),x.show()});const V=Kt(k,t,e=>{Ze(e),Ne("parameters")}),H=on(k,{simClass:i,values:te(),theme:d,advancedSettings:n,availableScales:we,onValuesChange:lt,onThemeChange:Ve,onRun:()=>{K("Parameters submitted — starting run",{simClassId:i.id}),pt().catch(e=>{Se("Run failed to start",{simClassId:i.id,error:e instanceof Error?e.message:String(e)})})},onApplySettings:ct,onClose:dt,initialView:"parameters"}),Re=rn(k);B.setPosition(0),ve(),x.hide();const he=new WeakMap,ee=e=>{const s=he.get(e);s&&(clearTimeout(s),he.delete(e)),e.classList.remove("side-collapsed")},fe=e=>{const s=he.get(e);s&&clearTimeout(s),he.set(e,setTimeout(()=>{e.classList.add("side-collapsed"),he.delete(e)},2500))},Oe=e=>{const s=he.get(e);s&&(clearTimeout(s),he.delete(e)),e.classList.add("side-collapsed")},Fe=(e,s)=>{const y=s.isCollapsible??(()=>!0);e.addEventListener("mouseenter",()=>ee(e)),e.addEventListener("mouseleave",()=>{if(!y()){ee(e);return}fe(e)}),e.addEventListener("focusin",()=>ee(e)),e.addEventListener("focusout",L=>{if(!e.contains(L.relatedTarget)){if(!y()){ee(e);return}fe(e)}}),e.addEventListener("click",()=>{if(!y()){ee(e);return}if(e.classList.contains("side-collapsed")){ee(e),fe(e);return}s.toggleOnClick?Oe(e):fe(e)}),y()?Oe(e):ee(e)};Fe(A,{toggleOnClick:!0,isCollapsible:()=>o.dataset.mode!=="entry"}),Fe(O,{toggleOnClick:!0}),Fe(q,{toggleOnClick:!1});let Ce=0,be=null,Pe=0;const Ke=()=>{be!==null&&(cancelAnimationFrame(be),be=null)},Je=()=>{if(be!==null)return;Pe=c.getPlaybackFraction();const e=()=>{if(Ce===0){Ke();return}const y=12*(1/60)/Math.max(c.getDurationSeconds(),1);Pe=Math.max(0,Math.min(1,Pe+Ce*y)),c.seekToFraction(Pe),be=requestAnimationFrame(e)};be=requestAnimationFrame(e)};document.addEventListener("keydown",e=>{if(o.dataset.mode==="display"&&!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement))switch(e.key){case"Escape":e.preventDefault(),M.classList.contains("is-visible")?M.classList.remove("is-visible"):He();break;case" ":e.preventDefault(),Xe();break;case"ArrowLeft":e.preventDefault(),ee(q),fe(q),Ce=-1,Je();break;case"ArrowRight":e.preventDefault(),ee(q),fe(q),Ce=1,Je();break;case"ArrowUp":case"ArrowDown":{if(e.preventDefault(),ee(O),fe(O),!(u!=null&&u.views)||Object.keys(u.views).length<=1)break;const s=i.views.filter(G=>{var Y;return((Y=u==null?void 0:u.views)==null?void 0:Y[G.id])!==void 0});if(s.length<=1)break;const y=u.viewId??Ee(i,u),L=s.findIndex(G=>G.id===y),ne=e.key==="ArrowUp"?(L-1+s.length)%s.length:(L+1)%s.length;Qe(s[ne].id);break}}}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(Ce=0,Ke())}),c.hideMedia(),c.pause(),ge(n.lockedScaleId?"config":"entry");function Ze(e){e.id===i.id&&_||(i=e,De(),Ve(Ge[e.id]),H.setSimulation(i,te()),B.setPosition(0),ve(),Be(),Ue())}function lt(e){b[i.id]={...e},K("Parameter values updated",{simClassId:i.id,values:b[i.id]}),ve()}function Ve(e){d=e,$e(e),H.setTheme(e)}function Ne(e){e==="parameters"&&H.setSimulation(i,te()),H.setView(e),ge("config")}function ct(e){if(Lt(e),_){x.hide(),ge("display");return}H.setSimulation(i,te()),H.setView("parameters")}function dt(){if(x.hide(),!_&&n.lockedScaleId){H.setSimulation(i,te()),H.setView("parameters");return}ge(_?"display":"entry")}function He(){n.lockedScaleId||(K("Returning to home screen",{simClassId:i.id}),De(),_=!1,c.hideMedia(),ge("entry"))}function ut(){m=!1,x.hide(),c.resetPlayback(),c.play().catch(()=>{c.setMuted(!0),c.play()})}function Xe(){c.isPaused()?c.play().catch(()=>{c.setMuted(!0),c.play()}):c.pause()}function mt(e){c.setPlaybackRate(e),_e(e),B.setSpeed(e)}async function pt(){const e=te();K("Run requested",{simClassId:i.id,values:e,manifestSource:l.getSource()});const s=await l.findNearestVideo(i.id,i.parameters,e);De(),u=s;const y=Ee(i,s);En({simulationId:i.id,parameters:e,manifestSource:l.getSource(),matchedRunId:s.runId});const L=St(s,y)??s.url,ne=Object.entries(s.views??{}).filter(([W])=>W!==y).map(([,W])=>W);bt(s.liveDataUrl),Et(s.summaryUrl),c.setMuted(!1),Be(y),ge("initializing");const G=ht(L);c.resumePrewarming(),c.prewarmSources(ne);const Y=(async()=>{const W=await G;K(`Prepared active video source: ${W.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:L,waitsForBuffer:W.shouldWaitForBuffer}),c.setSource(W.src,{ownedObjectUrl:W.ownedObjectUrl}),c.pause(),await c.waitForLoadedData(Cn),W.shouldWaitForBuffer&&await c.waitForBufferedAhead(Sn,In)})();await new Promise(W=>{Re.show(pn(i),W,Y,{minTerminalTimeMs:It()})}),_=!0,c.showMedia(),c.play().catch(()=>{c.setMuted(!0),c.play().catch(()=>{})}),ge("display")}async function ht(e){const s=await ft(e);if(s!==null&&s>0&&s<=ot){K("Downloading active video behind loading overlay",{videoUrl:e,contentLength:s});try{const y=await fetch(e);if(!y.ok)throw new Error(`Failed to download active video: ${e}`);const L=await y.blob();return K(`Active video full fetch complete: ${L.size} bytes`,{videoUrl:e,blobType:L.type}),{src:URL.createObjectURL(L),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(y){Se(`Full-fetch FAILED; falling back to progressive: ${y instanceof Error?y.message:String(y)}`,{videoUrl:e})}}return s!==null?K("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:e,contentLength:s,fullFetchMaxBytes:ot}):K("Could not determine active video size; using progressive load",{videoUrl:e}),K("Using progressive active video load",{videoUrl:e}),{src:e,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ft(e){try{const s=await fetch(e,{headers:{Range:"bytes=0-0"}});K("Probed active video size with range request",{videoUrl:e,ok:s.ok,status:s.status,contentLength:s.headers.get("Content-Length"),contentRange:s.headers.get("Content-Range")});const y=vt(s.headers.get("Content-Length"));if(y!==null)return y;const L=gt(s.headers.get("Content-Range"));return L!==null?L:null}catch(s){return Se("Could not probe active video size",{videoUrl:e,error:s instanceof Error?s.message:String(s)}),null}}function gt(e){if(!e)return null;const s=e.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!s)return null;const y=Number(s[1]);return Number.isFinite(y)&&y>0?y:null}function vt(e){if(!e)return null;const s=Number(e);return Number.isFinite(s)?s:null}function ge(e){if(o.dataset.mode=e,e==="entry"?document.documentElement.setAttribute("data-theme","glass"):e==="display"&&$e(d),Le(f,e==="display"||e==="config"),Le(C,e==="display"||e==="entry"),Le(A,!n.lockedScaleId&&(e==="entry"||e==="config"||e==="display")),e==="entry"?ee(A):Oe(A),e==="entry"&&!n.lockedScaleId?V.show():V.hide(),e==="config"?(Re.hide(),H.setSimulation(i,te()),H.show()):H.hide(),e!=="display")x.hide();else if(m){const y=c.captureFrame();x.update(i,te(),c.getDurationSeconds(),w,y),x.show()}!_||e==="initializing"?(c.hideMedia(),e==="initializing"&&c.pause()):c.showMedia(),e!=="initializing"&&Re.hide(),Ue()}function Ue(){if(o.dataset.mode==="entry"){Le(N,!0);return}const e=o.dataset.mode==="display",s=i.id==="galaxy",L=Ee(i,u)==="hst";Le(N,e&&s&&L)}function ve(e=0){const s=fn(h,e,c.getDurationSeconds()),y=wt(i,w,e,c.getDurationSeconds());ce.update(i,te(),{...s,...y})}function Be(e){const s=i.views.filter(ne=>{var G;return((G=u==null?void 0:u.views)==null?void 0:G[ne.id])!==void 0});if(s.length<=1){T.hide(),Z.classList.add("is-hidden");return}const y=e??Ee(i,u),L=s.find(ne=>ne.id===y);T.update(s,y),L?(Z.classList.remove("is-hidden"),Z.innerHTML=`<span class="viewport-title">${L.label??L.id}</span>`):Z.classList.add("is-hidden")}function De(){h=Me,m=!1,w=null,u=null,r=0,p=!1,$=null,re(),z!==null&&(cancelAnimationFrame(z),z=null),x.hide(),T.hide(),c.pause(),c.clearPrewarmedSources(),c.resetPlayback(),B.setPosition(0)}function Qe(e){if(!(u!=null&&u.views)||e===Ee(i,u))return;const s=u.views[e];if(!s)return;u.viewId=e;const y=!c.isPaused()&&!m,L=m?0:c.getPlaybackFraction();m=!1,x.hide(),c.setSource(s,{seekFraction:L,autoplay:y}),c.prewarmSources(Ie()),y&&!p?pe():ue(),Be(e),M.classList.remove("is-visible"),Ue()}function te(){return{...b[i.id]}}function yt(e){return Object.fromEntries(e.parameters.map(s=>[s.id,_t(s)]))}function _t(e){if(e.logScale){const G=Math.log10(e.min),Y=Math.log10(e.max);return 10**(G+Math.random()*(Y-G))}const s=Math.max(0,Math.round((e.max-e.min)/e.step)),y=Math.floor(Math.random()*(s+1)),L=e.min+y*e.step,ne=Ft(e.step);return Number(L.toFixed(ne))}async function bt(e){try{h=await hn(e)}catch(s){h=Me,Se("Failed to load live stats",{url:e,error:s instanceof Error?s.message:String(s)})}ve()}async function Et(e){w=await Ut(e),ve(r)}function wt(e,s,y,L){if(!s||!Number.isFinite(L)||L<=0)return{};const ne=Math.max(0,Math.min(1,y/L)),G={};for(const Y of e.metadata.liveStats){if(!Y.live||!Y.fromVideo||!Y.scaleWithTime)continue;const je=Y.videoKey??Y.id,W=s[je];if(typeof W!="number"||!Number.isFinite(W))continue;const nt=W*ne;G[Y.id]=Y.integer?String(Math.floor(nt)):String(nt)}return G}function Le(e,s){e.hidden=!s,e.classList.toggle("is-hidden",!s)}function Ee(e,s){return s!=null&&s.views?s.viewId??Object.keys(s.views)[0]:s==null?void 0:s.viewId}function St(e,s){return!s||!e.views?null:e.views[s]??null}function et(e){const s=new Set(Vt(e,a));return we.filter(y=>s.has(y.id))}function tt(e){return e?we.find(s=>s.id===e)??null:null}function It(){return l.getSource()!=="local"?Ye.MIN_TERMINAL_TIME_MS:Ct(Ye.MIN_TERMINAL_TIME_MS,Ln)}function Ct(e,s){const y=Math.ceil(Math.min(e,s)),L=Math.floor(Math.max(e,s));return Math.floor(Math.random()*(L-y+1))+y}function Lt(e){const s=i.id,y=n.manifestSource;n=Ht(e,a),t=et(n),l.setSource(n.manifestSource),n.manifestSource==="online"&&l.preloadActiveManifest(),U.setHomeVisible(!n.lockedScaleId),x.setHomeVisible(!n.lockedScaleId),V.setSimulationClasses(t),H.setAdvancedSettings(n),K("Advanced settings updated",n),y!==n.manifestSource&&(u=null);const L=tt(n.lockedScaleId);L&&(Ze(L),L.id!==s&&(_=!1,c.hideMedia(),H.setView("parameters")),_||(Ve(Ge[L.id]),H.setSimulation(i,te())))}}function Pn(){const o=document.getElementById("app");if(!o)throw new Error("App mount element not found.");kn(o)}Pn();
//# sourceMappingURL=main-JERz46or.js.map
