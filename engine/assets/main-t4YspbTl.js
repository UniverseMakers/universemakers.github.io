import{f as Te,w as ke,a as at,b as At,c as Se,p as rt,d as Tt,A as kt,I as Ge,l as K,e as we,T as Pt,S as Ee,g as Nt,h as Mt,i as xt,j as $e,k as Rt,m as Ot,n as Ft,o as Vt,s as Ht,q as Ut}from"./placeholder-assets-bGQugwGR.js";function Bt(o,i){const a=document.createElement("div");a.className="viewport";const t=document.createElement("video");t.className="viewport__media is-empty",t.src=i,t.loop=!1,t.muted=!0,t.playsInline=!0,t.preload="auto",t.setAttribute("aria-label","Simulation output"),a.appendChild(t),o.appendChild(a);let l,n,u,m=new Set,w=!1;const d=new Map,r=new Map,h=new Map;let b=null,v=null;const S=document.createElement("canvas"),c=S.getContext("2d");t.addEventListener("play",()=>u==null?void 0:u(!1)),t.addEventListener("pause",()=>u==null?void 0:u(!0)),t.addEventListener("ended",()=>u==null?void 0:u(!0)),t.addEventListener("timeupdate",()=>{!l||!Number.isFinite(t.duration)||t.duration<=0||l(t.currentTime/t.duration)}),t.addEventListener("ended",()=>{n==null||n()});let f=t.playbackRate;function y(){b&&(URL.revokeObjectURL(b),b=null)}function L(p,E={}){const I=r.get(p);I&&(r.delete(p),E={...E,ownedObjectUrl:!0},p=I),t.classList.add("fade-out"),window.setTimeout(()=>{if(t.src.endsWith(p)){t.classList.remove("fade-out");return}const F=t.muted,R=E.seekFraction;y(),v=null,b=E.ownedObjectUrl?p:null,t.src=p,t.load(),t.onloadeddata=()=>{if(t.muted=F,R!==void 0&&Number.isFinite(t.duration)&&t.duration>0){const ue=Math.max(0,Math.min(.999,R));t.currentTime=ue*t.duration}else t.currentTime=0;t.playbackRate=f,t.classList.remove("fade-out"),E.autoplay&&t.play().catch(()=>{})}},120)}function N(p){t.muted=p}async function P(){await t.play()}function A(){t.pause()}function U(){t.classList.add("is-empty")}function O(){t.classList.remove("is-empty")}function T(p){if(!Number.isFinite(t.duration)||t.duration<=0)return;const E=Math.max(0,Math.min(1,p));t.currentTime=E*t.duration}function M(){t.currentTime=0,l==null||l(0)}function J(p=8e3){return t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(E=>{const I=()=>{R(),E()},F=window.setTimeout(()=>{R(),E()},Math.max(0,p));function R(){window.clearTimeout(F),t.removeEventListener("loadeddata",I)}t.addEventListener("loadeddata",I,{once:!0})})}function ae(p,E=8e3){const I=Math.max(0,p);return I===0||ie(I)?Promise.resolve():new Promise(F=>{const R=()=>{ie(I)&&(ce(),F())},ue=window.setTimeout(()=>{ce(),F()},Math.max(0,E));function ce(){window.clearTimeout(ue),t.removeEventListener("progress",R),t.removeEventListener("canplay",R),t.removeEventListener("loadeddata",R)}t.addEventListener("progress",R),t.addEventListener("canplay",R),t.addEventListener("loadeddata",R),R()})}function ie(p){const E=t.currentTime;for(let I=0;I<t.buffered.length;I+=1){const F=t.buffered.start(I),R=t.buffered.end(I);if(!(E<F||E>R))return R-E>=p}return!1}function Z(p){m=new Set(p.filter(Boolean).filter(E=>E!==t.currentSrc)),w||D()}function X(){w=!0,se(),Q()}function le(){if(!w){D();return}w=!1,D()}function D(){for(const[p,E]of d.entries())m.has(p)||(E.removeAttribute("src"),E.load(),d.delete(p));for(const[p,E]of h.entries())m.has(p)||(E.abort(),h.delete(p));for(const p of m){if(!d.has(p)){const E=document.createElement("video");E.preload="auto",E.muted=!0,E.playsInline=!0,E.src=p,E.load(),d.set(p,E)}r.has(p)||h.has(p)||ye(p)}}function se(){for(const p of d.values())p.removeAttribute("src"),p.load();d.clear()}function Q(){for(const p of h.values())p.abort();h.clear()}function ye(p){const E=new AbortController;h.set(p,E);const I=`${p}?_=${Date.now()}`;fetch(I,{signal:E.signal}).then(async F=>{if(!F.ok)return;const R=await F.blob();m.has(p)&&r.set(p,URL.createObjectURL(R))}).catch(F=>{F instanceof DOMException&&F.name}).finally(()=>{h.get(p)===E&&h.delete(p)})}function oe(){m.clear(),w=!1,se(),Q();for(const p of r.values())URL.revokeObjectURL(p);r.clear()}function q(p){return r.get(p)??null}function B(){!c||t.readyState<2||t.videoWidth===0||t.videoHeight===0||(S.width=t.videoWidth,S.height=t.videoHeight,c.drawImage(t,0,0,S.width,S.height),v=S.toDataURL("image/jpeg",.85))}function j(){return v||B(),v}function $(p){l=p}function z(p){n=p}return{setSource:L,setMuted:N,play:P,pause:A,hideMedia:U,showMedia:O,seekToFraction:T,resetPlayback:M,waitForLoadedData:J,waitForBufferedAhead:ae,onTimeUpdate:$,onEnded:z,getDurationSeconds:()=>Number.isFinite(t.duration)?t.duration:0,getPlaybackFraction:()=>!Number.isFinite(t.duration)||t.duration<=0?0:t.currentTime/t.duration,isPaused:()=>t.paused,setPlaybackRate:p=>{f=p,t.playbackRate=p},getPlaybackRate:()=>f,onPlayStateChange:p=>{u=p},getElement:()=>a,prewarmSources:Z,suspendPrewarming:X,resumePrewarming:le,clearPrewarmedSources:oe,getPrewarmedBlobUrl:q,captureFrame:j}}const Dt=[.25,.5,1,2];function jt(o,i={}){const{onChange:a,onTogglePlay:t,onSpeedChange:l,onScrubStart:n,onScrubEnd:u,initialSpeed:m=1}=i,w=document.createElement("div");w.className="timeline";const d=document.createElement("div");d.className="timeline__bar-row";const r=document.createElement("button");r.className="timeline__play-btn",r.type="button",r.setAttribute("aria-label","Toggle playback"),r.addEventListener("click",()=>t==null?void 0:t());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const b=document.createElement("div");b.className="timeline__speed";const v=document.createElement("button");v.className="timeline__speed-btn",v.type="button",v.setAttribute("aria-label","Playback speed"),v.addEventListener("click",()=>{b.classList.toggle("open")});const S=document.createElement("div");S.className="timeline__speed-menu";for(const f of Dt){const y=document.createElement("button");y.className="timeline__speed-option",y.type="button",y.textContent=We(f),y.addEventListener("click",()=>{b.classList.remove("open"),l==null||l(f)}),S.appendChild(y)}return b.appendChild(v),b.appendChild(S),d.appendChild(r),d.appendChild(h),d.appendChild(b),h.addEventListener("input",()=>{const f=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${f*100}%`),a==null||a(f)}),h.addEventListener("pointerdown",()=>n==null?void 0:n()),h.addEventListener("pointerup",()=>u==null?void 0:u()),h.addEventListener("change",()=>u==null?void 0:u()),document.addEventListener("click",f=>{b.contains(f.target)||b.classList.remove("open")}),w.appendChild(d),o.appendChild(w),c(m),{setPosition(f){const y=Math.max(0,Math.min(1,f));h.value=String(Math.round(y*1e3)),h.style.setProperty("--fill",`${y*100}%`)},setPlaying(f){r.textContent=f?"⏸":"▶",r.classList.toggle("is-paused",!f),r.setAttribute("aria-label",f?"Pause":"Play")},setSpeed(f){c(f)}};function c(f){v.textContent=We(f);for(const y of S.children)y.classList.toggle("is-active",y.textContent===We(f))}}function We(o){return`x${o}`}function $t(o){const i=document.createElement("aside");i.className="data-panel";const a=document.createElement("div");return a.className="data-panel__metrics",i.appendChild(a),o.appendChild(i),{update(t,l,n={}){a.innerHTML="";const u=Wt(t,l,n);for(const m of t.metadata.liveStats){const w=zt(m,u),d=document.createElement("div");d.className="data-panel__metric",d.innerHTML=`
          <span class="data-panel__metric-label">${w.label}</span>
          <span class="data-panel__metric-value">${w.value}</span>
        `,a.appendChild(d)}}}}function Wt(o,i,a){const t=Object.fromEntries(o.parameters.map(n=>[n.id,{label:n.label,value:Te(i[n.id]??n.fallbackValue,n.step,{scale:n.valueScale,format:n.displayFormat,significantFigures:n.displaySignificantFigures})}])),l={scale:{label:"Scale",value:o.label},parameters:{label:"Parameters",value:String(o.parameters.length)}};return{...t,...l,...Object.fromEntries(Object.entries(a).map(([n,u])=>[n,{label:qt(n),value:u}]))}}function qt(o){return o.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function zt(o,i){const a=i[o.id]??{label:o.id,value:"--"},t=o.liveKey??o.id,l=i[t],n=Yt((l==null?void 0:l.value)??a.value??"--",o,!!l);return{label:o.label??(l==null?void 0:l.label)??a.label,value:ke(n,o.unit)}}function Yt(o,i,a){if(o==="--")return o;const t=Number(o);if(!Number.isFinite(t))return o;const l=i.valueScale??1,n=t*l;return a?i.integer?at(Math.round(n)):at(n):i.integer?Math.max(0,Math.round(n)).toLocaleString(void 0):At(o,{integer:i.integer})}const Gt={planetary:"Smash a planet into the early Earth. Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function Kt(o,i,a){const t=Se("assets/banner-1600.webp"),l=[`${Se("assets/banner-960.webp")} 960w`,`${Se("assets/banner-1600.webp")} 1600w`].join(", "),n=document.createElement("section");n.className="overlay overlay--entry",n.hidden=!0,n.classList.add("is-hidden");const u=document.createElement("div");u.className="entry-overlay",u.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${t}" srcset="${l}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const m=document.createElement("div");m.className="entry-overlay__actions";function w(S){m.innerHTML="";for(const c of S){const f=document.createElement("button");f.className="entry-overlay__button",f.type="button";const y=Gt[c.id]??"Explore this simulation scale.";f.innerHTML=`
        <span class="entry-overlay__button-label">${c.label}</span>
        <span class="entry-overlay__button-description">${y}</span>
      `,f.addEventListener("click",()=>a(c)),m.appendChild(f)}}w(i);const d=document.createElement("div"),r=document.createElement("button");r.className="view-switcher__info entry-overlay__info-button",r.type="button",r.setAttribute("aria-label","About this experience"),r.appendChild(Zt()),d.className="sci-modal is-hidden",d.innerHTML=`
    <div class="entry-info-modal">
      <div class="entry-info-modal__shell">
        <div class="entry-info-modal__media">
          <img
            class="entry-info-modal__image"
            src="${t}"
            alt="Universe Engine preview"
            width="1600"
            height="381"
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
  `,u.appendChild(m),n.appendChild(u),n.appendChild(r),n.appendChild(d),o.appendChild(n);const h=d.querySelector(".entry-info-modal__close");function b(){d.classList.remove("is-hidden")}function v(){d.classList.add("is-hidden")}return r.addEventListener("click",b),h.addEventListener("click",v),d.addEventListener("click",S=>{S.target===d&&v()}),{show(){n.hidden=!1,n.classList.remove("is-hidden")},hide(){v(),n.hidden=!0,n.classList.add("is-hidden")},setSimulationClasses(S){w(S)}}}function Jt(o){const i=document.createElementNS("http://www.w3.org/2000/svg","svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.innerHTML=o,i}function Zt(){return Jt(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}function Xt(o,i){const a=document.createElement("div");return a.className="view-switcher is-hidden",o.appendChild(a),{update(t,l){if(a.innerHTML="",t.length<=1){a.classList.add("is-hidden");return}a.classList.remove("is-hidden");for(const n of t){const u=document.createElement("div");u.className="view-switcher__row";const m=document.createElement("button");m.className="view-switcher__button",m.type="button",m.dataset.viewId=n.id,m.classList.toggle("is-active",n.id===l),m.setAttribute("aria-pressed",String(n.id===l)),m.setAttribute("aria-label",n.label??n.id);const w=Qt(n.icon);if(w){const r=document.createElement("span");r.className="view-switcher__icon",r.setAttribute("aria-hidden","true"),r.appendChild(w),m.appendChild(r)}const d=document.createElement("span");if(d.className="view-switcher__label",d.textContent=n.label??n.id,m.appendChild(d),m.addEventListener("click",()=>i.onSelect(n.id)),u.appendChild(m),n.description){const r=document.createElement("button");r.className="view-switcher__info",r.type="button",r.setAttribute("aria-label",`Info about ${n.label??n.id}`),r.appendChild(en()),r.addEventListener("click",h=>{h.stopPropagation(),i.onInfo(n.id,n.label??n.id,n.description??"")}),u.appendChild(r)}a.appendChild(u)}},hide(){a.innerHTML="",a.classList.add("is-hidden")}}}function Qt(o){switch(o){case"dark-matter":return ve(`
        <circle cx="12" cy="12" r="6.5"></circle>
        <ellipse cx="12" cy="12" rx="10" ry="4.2"></ellipse>
        <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none"></circle>
      `);case"gas-density":return ve(`
        <path d="M6 14c0-3.6 2.7-6.2 6-6.2 2.1 0 4 .9 5.1 2.5 2.5.2 4.4 2.1 4.4 4.6 0 2.7-2.1 4.7-4.9 4.7H10.2C7.7 19.6 6 17.4 6 14Z"></path>
        <path d="M9.2 13.6h5.6"></path>
        <path d="M8.5 16.2h7.8"></path>
      `);case"gas-temperature":return ve(`
        <path d="M12 5.2a2.2 2.2 0 0 1 2.2 2.2v7.2a4 4 0 1 1-4.4 0V7.4A2.2 2.2 0 0 1 12 5.2Z"></path>
        <path d="M12 10v6.6"></path>
        <circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"></circle>
      `);case"metals-stars":return ve(`
        <rect x="4.8" y="4.8" width="14.4" height="14.4"></rect>
        <path d="m12 8.2 1.25 2.55 2.82.41-2.04 1.98.48 2.8L12 14.63 9.49 15.94l.48-2.8-2.04-1.98 2.82-.41L12 8.2Z"></path>
        <path d="M7.2 7.2h2.5"></path>
        <path d="M14.3 16.8h2.5"></path>
      `);case"hubble-space-telescope":return ve(`
        <path d="M12 4.5v5.2"></path>
        <path d="M8.2 7.1 15.8 7.1"></path>
        <path d="M10.1 9.7h3.8v6.3h-3.8z"></path>
        <path d="M7.2 16 16.8 16"></path>
        <path d="M9.1 16 7 19.5"></path>
        <path d="M14.9 16 17 19.5"></path>
        <path d="M6.3 19.5h11.4"></path>
      `);case"large-scale-structure":return ve(`
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
      `);default:return null}}function ve(o){const i=document.createElementNS("http://www.w3.org/2000/svg","svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.innerHTML=o,i}function en(){return ve(`
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

- text: Funding
  header: true

- text: We would like to thank the Ogden Trust, the Royal Society, and Durham University for their generous funding that made this project possible.

- text: Licensing
  header: true

- text: UniverseEngine is released under the GNU General Public License v3.0
  url: https://www.gnu.org/licenses/gpl-3.0.en.html

- text: COLIBRE and FLAMINGO content is licensed under CC BY 4.0
  url: https://creativecommons.org/licenses/by/4.0/
`;function nn(){const o=rt(tn);if(!Array.isArray(o))return[];const i=[];for(const a of o){if(!a||typeof a!="object")continue;const t=a.text;if(typeof t!="string"||t.trim().length===0)continue;const l={text:t},n=a.url;typeof n=="string"&&n.trim().length>0&&(l.url=n);const u=a.logo;typeof u=="string"&&u.trim().length>0&&(l.logo=u),a.header===!0&&(l.header=!0),i.push(l)}return i}function an(o,i,a,t){const l=document.createElement("div");l.className="parameter-editor",o.appendChild(l);let n=i,u={...a};function m(r,h){n=r,u=h?{...h}:sn(r),l.innerHTML="";const b=document.createElement("div");b.className="parameter-editor__heading",b.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${r.label} Controls</h2>
    `,l.appendChild(b);const v=document.createElement("div");v.className="param-info-modal is-hidden",v.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,l.appendChild(v);const S=v.querySelector(".sci-modal__title"),c=v.querySelector(".sci-modal__body"),f=v.querySelector(".sci-modal__close");function y(P,A){S.textContent=P,c.textContent=A,v.classList.remove("is-hidden")}function L(){v.classList.add("is-hidden")}f.addEventListener("click",L),v.addEventListener("click",P=>{P.target===v&&L()});const N=document.createElement("div");N.className="parameter-editor__list";for(const P of r.parameters)N.appendChild(w(P,y));l.appendChild(N),d()}function w(r,h){const b=document.createElement("div");b.className="res-card param-card";const v=document.createElement("div");v.className="param-card__header";const S=document.createElement("span");S.className="res-card__label",S.textContent=r.label;const c=r.displayUnit??r.unit,f=document.createElement("span");f.className="param-card__range",f.textContent=`${ke(Te(r.min,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)} – ${ke(Te(r.max,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)}`,v.appendChild(S),v.appendChild(f);const y=document.createElement("input");y.className="param-card__slider",y.type="range";const L=r.logScale?Math.log10(r.min):r.min,N=r.logScale?Math.log10(r.max):r.max,P=u[r.id]??r.fallbackValue;y.min=String(L),y.max=String(N),y.step=r.logScale?"0.001":String(r.step),y.value=String(r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P),y.setAttribute("aria-label",r.label);const A=document.createElement("span");A.className="res-card__value";function U(T){const M=r.logScale?10**T:T;u[r.id]=M,y.value=String(T),y.style.setProperty("--fill",`${it(T,L,N)}%`),A.textContent=ke(Te(M,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),d()}y.addEventListener("input",()=>{U(parseFloat(y.value))}),y.addEventListener("pointerdown",T=>T.stopPropagation()),y.addEventListener("click",T=>T.stopPropagation());const O=r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P;if(y.style.setProperty("--fill",`${it(O,L,N)}%`),A.textContent=ke(Te(P,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),r.description){b.classList.add("res-card--has-info"),b.setAttribute("title",r.description);const T=document.createElement("span");T.className="param-card__info-btn",T.setAttribute("aria-label","Parameter description"),T.textContent="ⓘ",v.appendChild(T),b.addEventListener("click",()=>{h(r.label,r.description)})}return b.appendChild(v),b.appendChild(y),b.appendChild(A),b}function d(){t({...u})}return m(i,a),{setSimClass(r,h){m(r,h)},setValues(r){m(n,r)},getValues(){return{...u}}}}function sn(o){return Object.fromEntries(o.parameters.map(i=>[i.id,i.fallbackValue]))}function it(o,i,a){return a===i?0:(o-i)/(a-i)*100}function on(o,i){const a=document.createElement("section");a.className="overlay overlay--config",a.hidden=!0,a.classList.add("is-hidden");const t=document.createElement("div");t.className="config-overlay";const l=document.createElement("div");l.className="config-overlay__shell";const n=document.createElement("div");n.className="config-overlay__media",n.dataset.simClass=i.simClass.id;const u=document.createElement("img");u.className="config-overlay__media-image",u.src=i.simClass.placeholderImage,u.alt=`${i.simClass.label} preview`,n.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,n.prepend(u);const m=document.createElement("div");m.className="config-overlay__controls",m.dataset.view=i.initialView??"parameters";const w=document.createElement("div");w.className="config-overlay__header";const d=document.createElement("div");d.className="config-overlay__title-block",d.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const r=d.querySelector(".config-overlay__eyebrow"),h=d.querySelector(".config-overlay__title"),b=d.querySelector(".config-overlay__subtitle"),v=document.createElement("button");v.className="config-overlay__close",v.type="button",v.setAttribute("aria-label","Back"),v.textContent="←",w.appendChild(d),w.appendChild(v);const S=document.createElement("section");S.className="config-overlay__section config-overlay__section--grow",S.dataset.section="parameters";const c=document.createElement("div");S.appendChild(c);const f=document.createElement("section");f.className="config-overlay__section config-overlay__section--grow",f.dataset.section="settings",f.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const y=document.createElement("div");f.appendChild(y);const L=document.createElement("section");L.className="advanced-settings",L.dataset.state="closed",L.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const N=document.createElement("button");N.className="advanced-settings__access",N.type="button",N.textContent="Advanced Settings",L.appendChild(N);const P=document.createElement("div");P.className="advanced-settings__auth";const A=document.createElement("input");A.className="advanced-settings__password",A.type="password",A.placeholder="Enter password",A.autocomplete="off";const U=document.createElement("button");U.className="advanced-settings__unlock",U.type="button",U.textContent="Unlock";const O=document.createElement("p");O.className="advanced-settings__message",P.appendChild(A),P.appendChild(U),P.appendChild(O),L.appendChild(P);const T=document.createElement("div");T.className="advanced-settings__form";const M=document.createElement("label");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const J=document.createElement("select");J.className="advanced-settings__select",J.appendChild(new Option("None",""));for(const g of i.availableScales)J.appendChild(new Option(g.label,g.id));M.appendChild(J),T.appendChild(M);const ae=document.createElement("div");ae.className="advanced-settings__field",ae.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const ie=document.createElement("div");ie.className="advanced-settings__options";const Z=document.createElement("label"),X=document.createElement("input");Z.className="advanced-settings__choice",X.type="radio",X.name="manifest-source",X.value="local",Z.appendChild(X),Z.append("Local manifest");const le=document.createElement("label"),D=document.createElement("input");le.className="advanced-settings__choice",D.type="radio",D.name="manifest-source",D.value="online",le.appendChild(D),le.append("Online manifest"),ie.appendChild(Z),ie.appendChild(le),ae.appendChild(ie),T.appendChild(ae);const se=document.createElement("label");se.className="advanced-settings__field advanced-settings__field--inline";const Q=document.createElement("input"),ye=document.createElement("span");Q.type="checkbox",Q.className="advanced-settings__checkbox",ye.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,se.appendChild(Q),se.appendChild(ye),T.appendChild(se);const oe=document.createElement("div");oe.className="advanced-settings__field",oe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const q=document.createElement("div");q.className="advanced-settings__options";const B=new Map;for(const g of i.availableScales){const k=document.createElement("label"),x=document.createElement("input");k.className="advanced-settings__choice",x.type="checkbox",x.value=g.id,B.set(g.id,x),k.appendChild(x),k.append(`Show ${g.label}`),q.appendChild(k)}oe.appendChild(q),T.appendChild(oe),L.appendChild(T),f.appendChild(L);const j=document.createElement("section");j.className="config-overlay__section config-overlay__section--grow",j.dataset.section="credits",j.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const $=j.querySelector("[data-credits]"),z=nn();if($.innerHTML="",z.length===0){const g=document.createElement("div");g.className="credits-list__entry",g.textContent="To be credited...",$.appendChild(g)}else for(const g of z)if(g.header){const k=document.createElement("div");k.className="credits-list__heading",k.textContent=g.text,$.appendChild(k)}else{const k=document.createElement("div");k.className="credits-list__entry";const x=document.createElement("span");if(x.className="credits-list__text",g.url){const V=document.createElement("a");V.className="credits-list__link",V.href=g.url,V.target="_blank",V.rel="noopener noreferrer",V.textContent=g.text,x.appendChild(V)}else x.textContent=g.text;k.appendChild(x),$.appendChild(k)}const p=document.createElement("div");p.className="config-overlay__footer";const E=document.createElement("button");E.className="run-button",E.type="button",E.textContent="Run",p.appendChild(E),m.appendChild(w),m.appendChild(S),m.appendChild(f),m.appendChild(j),m.appendChild(p),l.appendChild(n),l.appendChild(m),t.appendChild(l),a.appendChild(t),o.appendChild(a);let I=Ae(i.advancedSettings),F="closed";const R=an(c,i.simClass,i.values,i.onValuesChange),ue=Tt(y,i.theme,i.onThemeChange);v.addEventListener("click",i.onClose),N.addEventListener("click",()=>{if(F==="open"){de("closed");return}de("auth"),A.focus()}),U.addEventListener("click",Ie),A.addEventListener("keydown",g=>{g.key==="Enter"&&Ie()}),J.addEventListener("change",()=>{I.lockedScaleId=J.value||null,re()}),X.addEventListener("change",()=>{X.checked&&(I.manifestSource="local")}),D.addEventListener("change",()=>{D.checked&&(I.manifestSource="online")}),Q.addEventListener("change",()=>{I.verboseLogging=Q.checked});for(const[g,k]of B.entries())k.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,V])=>V.checked).map(([V])=>V).length===0&&!I.lockedScaleId){k.checked=!0;return}I.hiddenScaleIds=Array.from(B.keys()).filter(V=>{var H;return!((H=B.get(V))!=null&&H.checked)&&V!==I.lockedScaleId}),re()}),g===I.lockedScaleId&&(k.disabled=!0);ce(i.initialView??"parameters"),re();function ce(g){m.dataset.view=g,g==="parameters"?(r.textContent=i.simClass.label,h.textContent="Shape Your Simulation",b.textContent=i.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready."):g==="settings"?(r.textContent="Interface",h.textContent="Adjust The Control Room",b.textContent="Change the interface theme and manage exhibit-level options for this installation."):(r.textContent="References",h.textContent="Project Sources And Attribution",b.textContent="Review the datasets, imagery, and supporting materials behind this experience."),g==="settings"?E.textContent="Apply":g==="credits"?E.textContent="Close":E.textContent="Run Simulation"}function re(){J.value=I.lockedScaleId??"",X.checked=I.manifestSource==="local",D.checked=I.manifestSource==="online",Q.checked=I.verboseLogging;for(const[g,k]of B.entries()){const x=I.lockedScaleId===g;k.checked=x||!I.hiddenScaleIds.includes(g),k.disabled=x}}function Ie(){if(A.value!==kt){O.textContent="Incorrect password";return}A.value="",O.textContent="",de("open")}function de(g){F=g,L.dataset.state=g,N.textContent=g==="open"?"Hide Advanced Settings":"Advanced Settings",g!=="auth"&&(O.textContent="")}function me(){A.value="",O.textContent="",de("closed")}function xe(){I=Ae(i.advancedSettings),re()}return E.addEventListener("click",()=>{const g=m.dataset.view;if(g==="settings"){i.onApplySettings(Ae(I));return}if(g==="credits"){i.onClose();return}i.onRun()}),{show(){a.hidden=!1,a.classList.remove("is-hidden")},hide(){a.hidden=!0,a.classList.add("is-hidden"),xe(),me()},setSimulation(g,k){i.simClass=g,n.dataset.simClass=g.id,R.setSimClass(g,k),u.src=g.placeholderImage,u.alt=`${g.label} preview`,m.dataset.view==="parameters"&&ce("parameters")},setTheme(g){ue.setActive(g)},setView(g){ce(g),g!=="settings"&&me()},setAdvancedSettings(g){i.advancedSettings=Ae(g),I=Ae(g),re(),me()}}}function Ae(o){return{lockedScaleId:o.lockedScaleId,manifestSource:o.manifestSource,verboseLogging:o.verboseLogging,hiddenScaleIds:[...o.hiddenScaleIds]}}function rn(o){const{TYPING_MS_PER_CHAR:i,MIN_TERMINAL_TIME_MS:a,FINAL_PAUSE_MS:t}=Ge,l=document.createElement("section");l.className="overlay overlay--initializing",l.hidden=!0,l.classList.add("is-hidden");const n=document.createElement("div");n.className="terminal";const u=document.createElement("div");u.className="terminal__header",u.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const m=document.createElement("div");m.className="terminal__log",n.appendChild(u),n.appendChild(m),l.appendChild(n),o.appendChild(l);let w=[],d=0;function r(){for(const S of w)window.clearTimeout(S);w=[]}function h(S,c){return new Promise(f=>{const y=window.setTimeout(()=>{c===d&&f()},Math.max(0,S));w.push(y)})}async function b(S,c){const f=document.createElement("div");f.className="terminal__line";const y=v();f.appendChild(y),m.appendChild(f);for(let L=0;L<S.length;L+=1){if(c!==d)return;const N=S[L];f.insertBefore(document.createTextNode(N),y),m.scrollTop=m.scrollHeight,await h(i,c)}y.remove()}function v(){const S=document.createElement("span");return S.className="terminal__cursor",S.textContent="█",S}return{async show(S,c,f,y){r(),d+=1;const L=d;l.hidden=!1,l.classList.remove("is-hidden");const N=performance.now(),P=(y==null?void 0:y.minTerminalTimeMs)??a;let A=!f,U=[...S];f&&f.then(()=>{A=!0});let O=0;for(;L===d;){U.length===0&&(U=[...S]);const M=Math.floor(Math.random()*U.length),[J]=U.splice(M,1),ae=`${st(O)} ${J.text}`;if(O+=1,await b(ae,L),L!==d)return;if(performance.now()-N>=P&&A)break}if(L!==d)return;const T=document.createElement("div");T.className="terminal__line terminal__line--syncing",T.textContent=`${st(O)} STARTING SIMULATION...`,m.appendChild(T),m.scrollTop=m.scrollHeight,await h(t,L),L===d&&c()},hide(){r(),d+=1,l.hidden=!0,l.classList.add("is-hidden"),m.innerHTML=""}}}function st(o){const i=Math.max(0,Math.floor(o)),a=Math.floor(i/3600),t=Math.floor(i%3600/60),l=i%60;return`[${qe(a)}:${qe(t)}:${qe(l)}]`}function qe(o){return String(o).padStart(2,"0")}function ln(o,i){const a=document.createElement("button");a.className="display-button",a.type="button",a.innerHTML="<span></span><span></span><span></span>",a.setAttribute("aria-label","Open configuration overlay"),o.appendChild(a);const t=document.createElement("div");t.className="display-menu";const l=document.createElement("div");l.className="display-menu__header",l.textContent="Menu",t.appendChild(l);const n=w("Home",()=>{d(),i.onHome()});t.appendChild(n),t.appendChild(w("Settings",()=>{d(),i.onViewSelected("settings")})),t.appendChild(w("Credits",()=>{d(),i.onViewSelected("credits")}));const u=w("Fullscreen",()=>{var h;d(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});t.appendChild(u),o.appendChild(t);function m(){const h=u.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const b=document.getElementById("app");b&&b.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",m),a.addEventListener("click",()=>{o.classList.toggle("open")}),document.addEventListener("click",h=>{o.contains(h.target)||d()}),r(i.showHome??!0),{close:d,setHomeVisible:r};function w(h,b){const v=document.createElement("button");return v.className="display-menu__item",v.type="button",v.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,v.addEventListener("click",b),v}function d(){o.classList.remove("open")}function r(h){n.hidden=!h,n.classList.toggle("is-hidden",!h)}}const cn=`# Initialization terminal script for the Planetary simulation family.
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
`,mn={planetary:cn,galaxy:dn,cosmos:un};function pn(o){return rt(mn[o.id]).map(a=>({text:a}))}const Me={mode:"time",frames:[]};async function hn(o){const i=await fetch(o);if(!i.ok)throw new Error(`Failed to load live stats CSV: ${o}`);const a=await i.text();return vn(a)}function fn(o,i,a=0){if(o.mode==="row")return yn(o.frames,i,a);const t=o.frames;if(t.length===0)return{};if(i<=t[0].t)return{...t[0].values};const l=t[t.length-1];if(i>=l.t)return{...l.values};const n=gn(t,i),u=t[Math.max(0,n-1)],m=t[Math.min(t.length-1,n)],w=(i-u.t)/Math.max(m.t-u.t,1e-9);return _n(u.values,m.values,w)}function gn(o,i){let a=1,t=o.length-1;for(;a<t;){const l=Math.floor((a+t)/2);o[l].t<=i?a=l+1:t=l}return a}function vn(o){const i=o.split(/\r?\n/).map(t=>t.trim()).filter(Boolean);if(i.length<2)return Me;const a=ze(i[0]);return a[0]==="t"?{mode:"time",frames:i.slice(1).map(t=>{const l=ze(t),n={};for(let u=1;u<a.length;u+=1)n[a[u]]=l[u]??"";return{t:parseFloat(l[0]??"0")||0,values:n}})}:{mode:"row",frames:i.slice(1).map((t,l)=>{const n=ze(t),u={};for(let m=0;m<a.length;m+=1)u[a[m]]=n[m]??"";return{t:l,values:u}})}}function yn(o,i,a){if(o.length===0)return{};if(!Number.isFinite(a)||a<=0)return{...o[0].values};const t=Math.max(0,Math.min(1,i/a)),l=Math.round(t*(o.length-1));return{...o[l].values}}function ze(o){const i=[];let a="",t=!1;for(let l=0;l<o.length;l+=1){const n=o[l];if(n==='"'){t=!t;continue}if(n===","&&!t){i.push(a),a="";continue}a+=n}return i.push(a),i}function _n(o,i,a){const t=new Set([...Object.keys(o),...Object.keys(i)]),l={};for(const n of t){const u=o[n]??"",m=i[n]??u,w=parseFloat(u),d=parseFloat(m);if(Number.isFinite(w)&&Number.isFinite(d)){const r=w+(d-w)*a;l[n]=bn(r);continue}l[n]=a<.5?u:m}return l}function bn(o){return o.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function En(o){wn(Pt,o)}function wn(o,i){if(navigator.sendBeacon){const a=new Blob([JSON.stringify(i)],{type:"application/json"});if(navigator.sendBeacon(o,a)){K("Run selection tracking dispatched",{simulationId:i.simulationId});return}}fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),keepalive:!0}).then(a=>{a.ok?K("Run selection tracked",{simulationId:i.simulationId}):we("Run selection tracking rejected",{simulationId:i.simulationId,status:a.status})}).catch(a=>{we("Run selection tracking failed",{simulationId:i.simulationId,error:a instanceof Error?a.message:String(a)})})}const ot=50*1024*1024,Sn=8,In=6e3,Cn=8e3,Ln=5e3,An=1200,Tn=100,Ye={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function kn(o){const i=Ee.map(e=>e.id);let a=Nt(i),t=et(a);const l=Mt(a.manifestSource);a.manifestSource==="online"&&l.preloadActiveManifest();let n=tt(a.lockedScaleId)??t[0]??Ee[0],u=a.lockedScaleId?Ye[n.id]:xt(),m=!1,w=null,d=null,r=0,h=Me,b=!1;const v=Object.fromEntries(Ee.map(e=>[e.id,yt(e)]));$e(u);const S=Rt(n.id),c=Bt(o,S),f=document.createElement("div");f.className="display-chrome",f.classList.add("is-hidden"),o.appendChild(f);const y=document.createElement("div");y.className="orientation-overlay",y.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,o.appendChild(y);const L=document.createElement("div");L.className="swift-logo",L.innerHTML=`
    <img
      class="swift-logo__image"
      src="${Se("assets/credits/swift-logo.png")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,o.appendChild(L);const N=document.createElement("div");N.className="synth-logo is-hidden",N.innerHTML=`
    <img
      class="synth-logo__image"
      src="${Se("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,o.appendChild(N);const P=document.createElement("img");P.className="app-partner-logo",P.src=Se("assets/dirac-hpc-white.webp"),P.alt="DIRAC HPC",P.decoding="async",o.appendChild(P);const A=document.createElement("div");A.className="display-chrome__top-left is-hidden",o.appendChild(A);const U=ln(A,{onHome(){He()},onViewSelected(e){if(e==="credits"){Ne("credits");return}Ne(e)},showHome:!a.lockedScaleId}),O=document.createElement("div");O.className="display-chrome__left-center",f.appendChild(O);const T=Xt(O,{onSelect(e){Qe(e)},onInfo(e,s,_){J.textContent=s,ae.textContent=_,M.classList.add("is-visible")}}),M=document.createElement("div");M.className="view-info-overlay",M.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,o.appendChild(M);const J=M.querySelector(".view-info-overlay__title"),ae=M.querySelector(".view-info-overlay__text"),ie=M.querySelector(".view-info-overlay__close");M.addEventListener("click",e=>{e.target===M&&M.classList.remove("is-visible")}),ie.addEventListener("click",()=>{M.classList.remove("is-visible")});const Z=document.createElement("div");Z.className="display-chrome__top-center is-hidden",f.appendChild(Z);const X=document.createElement("div");X.className="display-chrome__top-right",f.appendChild(X);const le=$t(X),D=document.createElement("div");D.className="display-chrome__center-status",D.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,f.appendChild(D);const se="universe-engine-playback-speed",Q=()=>{const e=localStorage.getItem(se),s=e?Number(e):NaN;return[.25,.5,1,2].includes(s)?s:1},ye=e=>{localStorage.setItem(se,String(e))},oe=Q();c.setPlaybackRate(oe);const q=document.createElement("div");q.className="display-chrome__bottom",f.appendChild(q);const B=jt(q,{onChange(e){ue(e)},onTogglePlay:Xe,onSpeedChange:mt,onScrubStart(){xe(),R()},onScrubEnd(){g(),c.isPaused()||F()},initialSpeed:oe});B.setPlaying(!c.isPaused());let j=null,$=null,z=null,p=!1,E=null,I=0;function F(){if(j!==null)return;function e(){const s=c.getPlaybackFraction();B.setPosition(s),c.isPaused()?j=null:j=requestAnimationFrame(e)}j=requestAnimationFrame(e)}function R(){j!==null&&(cancelAnimationFrame(j),j=null)}function ue(e){$=e,z===null&&(z=requestAnimationFrame(()=>{if(z=null,$===null)return;const s=$;$=null,c.seekToFraction(s)}))}function ce(){if($===null)return;z!==null&&(cancelAnimationFrame(z),z=null);const e=$;$=null,c.seekToFraction(e)}function re(){E!==null&&(window.clearTimeout(E),E=null)}function Ie(){if(!(d!=null&&d.views))return[];const e=be(n,d);return Object.entries(d.views).filter(([s])=>s!==e).map(([,s])=>s).filter(Boolean)}function de(){re(),c.suspendPrewarming()}function me(e=An){re(),!(p||c.isPaused())&&(E=window.setTimeout(()=>{E=null,!(p||c.isPaused())&&(c.resumePrewarming(),c.prewarmSources(Ie()))},Math.max(0,e)))}function xe(){p=!0,I=0,de()}function g(){p=!1,I=0,ce(),r=c.getPlaybackFraction()*c.getDurationSeconds(),ge(r),me()}c.onPlayStateChange(e=>{B.setPlaying(!e),e?(R(),de()):(F(),me(0))}),c.onTimeUpdate(e=>{if(r=e*c.getDurationSeconds(),p){const s=performance.now();if(s-I<Tn)return;I=s}ge(r)});const k=document.createElement("div");k.className="overlay-layer",o.appendChild(k);const x=Ot(k,{onReplay:ut,onParameters:()=>Ne("parameters"),onHome:He,showHome:!a.lockedScaleId});c.onEnded(()=>{m=!0;const e=c.captureFrame();x.update(n,te(),c.getDurationSeconds(),w,e),x.show()});const V=Kt(k,t,e=>{Ze(e),Ne("parameters")}),H=on(k,{simClass:n,values:te(),theme:u,advancedSettings:a,availableScales:Ee,onValuesChange:lt,onThemeChange:Ve,onRun:()=>{K("Parameters submitted — starting run",{simClassId:n.id}),pt().catch(e=>{we("Run failed to start",{simClassId:n.id,error:e instanceof Error?e.message:String(e)})})},onApplySettings:ct,onClose:dt,initialView:"parameters"}),Re=rn(k);B.setPosition(0),ge(),x.hide();const pe=new WeakMap,ee=e=>{const s=pe.get(e);s&&(clearTimeout(s),pe.delete(e)),e.classList.remove("side-collapsed")},he=e=>{const s=pe.get(e);s&&clearTimeout(s),pe.set(e,setTimeout(()=>{e.classList.add("side-collapsed"),pe.delete(e)},2500))},Oe=e=>{const s=pe.get(e);s&&(clearTimeout(s),pe.delete(e)),e.classList.add("side-collapsed")},Fe=(e,s)=>{const _=s.isCollapsible??(()=>!0);e.addEventListener("mouseenter",()=>ee(e)),e.addEventListener("mouseleave",()=>{if(!_()){ee(e);return}he(e)}),e.addEventListener("focusin",()=>ee(e)),e.addEventListener("focusout",C=>{if(!e.contains(C.relatedTarget)){if(!_()){ee(e);return}he(e)}}),e.addEventListener("click",()=>{if(!_()){ee(e);return}if(e.classList.contains("side-collapsed")){ee(e),he(e);return}s.toggleOnClick?Oe(e):he(e)}),_()?Oe(e):ee(e)};Fe(A,{toggleOnClick:!0,isCollapsible:()=>o.dataset.mode!=="entry"}),Fe(O,{toggleOnClick:!0}),Fe(q,{toggleOnClick:!1});let Ce=0,_e=null,Pe=0;const Ke=()=>{_e!==null&&(cancelAnimationFrame(_e),_e=null)},Je=()=>{if(_e!==null)return;Pe=c.getPlaybackFraction();const e=()=>{if(Ce===0){Ke();return}const _=12*(1/60)/Math.max(c.getDurationSeconds(),1);Pe=Math.max(0,Math.min(1,Pe+Ce*_)),c.seekToFraction(Pe),_e=requestAnimationFrame(e)};_e=requestAnimationFrame(e)};document.addEventListener("keydown",e=>{if(o.dataset.mode==="display"&&!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement))switch(e.key){case"Escape":e.preventDefault(),M.classList.contains("is-visible")?M.classList.remove("is-visible"):He();break;case" ":e.preventDefault(),Xe();break;case"ArrowLeft":e.preventDefault(),ee(q),he(q),Ce=-1,Je();break;case"ArrowRight":e.preventDefault(),ee(q),he(q),Ce=1,Je();break;case"ArrowUp":case"ArrowDown":{if(e.preventDefault(),ee(O),he(O),!(d!=null&&d.views)||Object.keys(d.views).length<=1)break;const s=n.views.filter(Y=>{var G;return((G=d==null?void 0:d.views)==null?void 0:G[Y.id])!==void 0});if(s.length<=1)break;const _=d.viewId??be(n,d),C=s.findIndex(Y=>Y.id===_),ne=e.key==="ArrowUp"?(C-1+s.length)%s.length:(C+1)%s.length;Qe(s[ne].id);break}}}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(Ce=0,Ke())}),c.hideMedia(),c.pause(),fe(a.lockedScaleId?"config":"entry");function Ze(e){e.id===n.id&&b||(n=e,De(),Ve(Ye[e.id]),H.setSimulation(n,te()),B.setPosition(0),ge(),Be(),Ue())}function lt(e){v[n.id]={...e},K("Parameter values updated",{simClassId:n.id,values:v[n.id]}),ge()}function Ve(e){u=e,$e(e),H.setTheme(e)}function Ne(e){e==="parameters"&&H.setSimulation(n,te()),H.setView(e),fe("config")}function ct(e){if(Lt(e),b){x.hide(),fe("display");return}H.setSimulation(n,te()),H.setView("parameters")}function dt(){if(x.hide(),!b&&a.lockedScaleId){H.setSimulation(n,te()),H.setView("parameters");return}fe(b?"display":"entry")}function He(){a.lockedScaleId||(K("Returning to home screen",{simClassId:n.id}),De(),b=!1,c.hideMedia(),fe("entry"))}function ut(){m=!1,x.hide(),c.resetPlayback(),c.play().catch(()=>{c.setMuted(!0),c.play()})}function Xe(){c.isPaused()?c.play().catch(()=>{c.setMuted(!0),c.play()}):c.pause()}function mt(e){c.setPlaybackRate(e),ye(e),B.setSpeed(e)}async function pt(){const e=te();K("Run requested",{simClassId:n.id,values:e,manifestSource:l.getSource()});const s=await l.findNearestVideo(n.id,n.parameters,e);De(),d=s;const _=be(n,s);En({simulationId:n.id,parameters:e,manifestSource:l.getSource(),matchedRunId:s.runId});const C=St(s,_)??s.url,ne=Object.entries(s.views??{}).filter(([W])=>W!==_).map(([,W])=>W);bt(s.liveDataUrl),Et(s.summaryUrl),c.setMuted(!1),Be(_),fe("initializing");const Y=ht(C);c.resumePrewarming(),c.prewarmSources(ne);const G=(async()=>{const W=await Y;K(`Prepared active video source: ${W.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:C,waitsForBuffer:W.shouldWaitForBuffer}),c.setSource(W.src,{ownedObjectUrl:W.ownedObjectUrl}),c.pause(),await c.waitForLoadedData(Cn),W.shouldWaitForBuffer&&await c.waitForBufferedAhead(Sn,In)})();await new Promise(W=>{Re.show(pn(n),W,G,{minTerminalTimeMs:It()})}),b=!0,c.showMedia(),c.play().catch(()=>{c.setMuted(!0),c.play().catch(()=>{})}),fe("display")}async function ht(e){const s=await ft(e);if(s!==null&&s>0&&s<=ot){K("Downloading active video behind loading overlay",{videoUrl:e,contentLength:s});try{const _=await fetch(e);if(!_.ok)throw new Error(`Failed to download active video: ${e}`);const C=await _.blob();return K(`Active video full fetch complete: ${C.size} bytes`,{videoUrl:e,blobType:C.type}),{src:URL.createObjectURL(C),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(_){we(`Full-fetch FAILED; falling back to progressive: ${_ instanceof Error?_.message:String(_)}`,{videoUrl:e})}}return s!==null?K("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:e,contentLength:s,fullFetchMaxBytes:ot}):K("Could not determine active video size; using progressive load",{videoUrl:e}),K("Using progressive active video load",{videoUrl:e}),{src:e,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ft(e){try{const s=await fetch(e,{headers:{Range:"bytes=0-0"}});K("Probed active video size with range request",{videoUrl:e,ok:s.ok,status:s.status,contentLength:s.headers.get("Content-Length"),contentRange:s.headers.get("Content-Range")});const _=vt(s.headers.get("Content-Length"));if(_!==null)return _;const C=gt(s.headers.get("Content-Range"));return C!==null?C:null}catch(s){return we("Could not probe active video size",{videoUrl:e,error:s instanceof Error?s.message:String(s)}),null}}function gt(e){if(!e)return null;const s=e.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!s)return null;const _=Number(s[1]);return Number.isFinite(_)&&_>0?_:null}function vt(e){if(!e)return null;const s=Number(e);return Number.isFinite(s)?s:null}function fe(e){if(o.dataset.mode=e,e==="entry"?document.documentElement.setAttribute("data-theme","glass"):e==="display"&&$e(u),Le(f,e==="display"||e==="config"),Le(L,e==="display"||e==="entry"),Le(A,!a.lockedScaleId&&(e==="entry"||e==="config"||e==="display")),e==="entry"?ee(A):Oe(A),e==="entry"&&!a.lockedScaleId?V.show():V.hide(),e==="config"?(Re.hide(),H.setSimulation(n,te()),H.show()):H.hide(),e!=="display")x.hide();else if(m){const _=c.captureFrame();x.update(n,te(),c.getDurationSeconds(),w,_),x.show()}!b||e==="initializing"?(c.hideMedia(),e==="initializing"&&c.pause()):c.showMedia(),e!=="initializing"&&Re.hide(),Ue()}function Ue(){if(o.dataset.mode==="entry"){Le(N,!0);return}const e=o.dataset.mode==="display",s=n.id==="galaxy",C=be(n,d)==="hst";Le(N,e&&s&&C)}function ge(e=0){const s=fn(h,e,c.getDurationSeconds()),_=wt(n,w,e,c.getDurationSeconds());le.update(n,te(),{...s,..._})}function Be(e){const s=n.views.filter(ne=>{var Y;return((Y=d==null?void 0:d.views)==null?void 0:Y[ne.id])!==void 0});if(s.length<=1){T.hide(),Z.classList.add("is-hidden");return}const _=e??be(n,d),C=s.find(ne=>ne.id===_);T.update(s,_),C?(Z.classList.remove("is-hidden"),Z.innerHTML=`<span class="viewport-title">${C.label??C.id}</span>`):Z.classList.add("is-hidden")}function De(){h=Me,m=!1,w=null,d=null,r=0,p=!1,$=null,re(),z!==null&&(cancelAnimationFrame(z),z=null),x.hide(),T.hide(),c.pause(),c.clearPrewarmedSources(),c.resetPlayback(),B.setPosition(0)}function Qe(e){if(!(d!=null&&d.views)||e===be(n,d))return;const s=d.views[e];if(!s)return;d.viewId=e;const _=!c.isPaused()&&!m,C=m?0:c.getPlaybackFraction();m=!1,x.hide(),c.setSource(s,{seekFraction:C,autoplay:_}),c.prewarmSources(Ie()),_&&!p?me():de(),Be(e),M.classList.remove("is-visible"),Ue()}function te(){return{...v[n.id]}}function yt(e){return Object.fromEntries(e.parameters.map(s=>[s.id,_t(s)]))}function _t(e){if(e.logScale){const Y=Math.log10(e.min),G=Math.log10(e.max);return 10**(Y+Math.random()*(G-Y))}const s=Math.max(0,Math.round((e.max-e.min)/e.step)),_=Math.floor(Math.random()*(s+1)),C=e.min+_*e.step,ne=Ft(e.step);return Number(C.toFixed(ne))}async function bt(e){try{h=await hn(e)}catch(s){h=Me,we("Failed to load live stats",{url:e,error:s instanceof Error?s.message:String(s)})}ge()}async function Et(e){w=await Ut(e),ge(r)}function wt(e,s,_,C){if(!s||!Number.isFinite(C)||C<=0)return{};const ne=Math.max(0,Math.min(1,_/C)),Y={};for(const G of e.metadata.liveStats){if(!G.live||!G.fromVideo||!G.scaleWithTime)continue;const je=G.videoKey??G.id,W=s[je];if(typeof W!="number"||!Number.isFinite(W))continue;const nt=W*ne;Y[G.id]=G.integer?String(Math.floor(nt)):String(nt)}return Y}function Le(e,s){e.hidden=!s,e.classList.toggle("is-hidden",!s)}function be(e,s){return s!=null&&s.views?s.viewId??Object.keys(s.views)[0]:s==null?void 0:s.viewId}function St(e,s){return!s||!e.views?null:e.views[s]??null}function et(e){const s=new Set(Vt(e,i));return Ee.filter(_=>s.has(_.id))}function tt(e){return e?Ee.find(s=>s.id===e)??null:null}function It(){return l.getSource()!=="local"?Ge.MIN_TERMINAL_TIME_MS:Ct(Ge.MIN_TERMINAL_TIME_MS,Ln)}function Ct(e,s){const _=Math.ceil(Math.min(e,s)),C=Math.floor(Math.max(e,s));return Math.floor(Math.random()*(C-_+1))+_}function Lt(e){const s=n.id,_=a.manifestSource;a=Ht(e,i),t=et(a),l.setSource(a.manifestSource),a.manifestSource==="online"&&l.preloadActiveManifest(),U.setHomeVisible(!a.lockedScaleId),x.setHomeVisible(!a.lockedScaleId),V.setSimulationClasses(t),H.setAdvancedSettings(a),K("Advanced settings updated",a),_!==a.manifestSource&&(d=null);const C=tt(a.lockedScaleId);C&&(Ze(C),C.id!==s&&(b=!1,c.hideMedia(),H.setView("parameters")),b||(Ve(Ye[C.id]),H.setSimulation(n,te())))}}function Pn(){const o=document.getElementById("app");if(!o)throw new Error("App mount element not found.");kn(o)}Pn();
//# sourceMappingURL=main-t4YspbTl.js.map
