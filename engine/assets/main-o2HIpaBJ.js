import{f as Te,w as ke,a as at,b as Tt,c as le,p as rt,d as kt,A as Pt,I as Ye,l as K,e as Se,T as Nt,S as we,g as Mt,h as xt,i as Rt,j as $e,k as Ot,m as Ft,n as Vt,o as Ht,s as Ut,q as Bt}from"./placeholder-assets-BJU8rAbI.js";function Dt(s,a){const i=document.createElement("div");i.className="viewport";const t=document.createElement("video");t.className="viewport__media is-empty",t.src=a,t.loop=!1,t.muted=!0,t.playsInline=!0,t.preload="auto",t.setAttribute("aria-label","Simulation output"),i.appendChild(t),s.appendChild(i);let l,n,d,u=new Set,E=!1;const m=new Map,r=new Map,g=new Map;let h=null,v=null;const w=document.createElement("canvas"),c=w.getContext("2d");t.addEventListener("play",()=>d==null?void 0:d(!1)),t.addEventListener("pause",()=>d==null?void 0:d(!0)),t.addEventListener("ended",()=>d==null?void 0:d(!0)),t.addEventListener("timeupdate",()=>{!l||!Number.isFinite(t.duration)||t.duration<=0||l(t.currentTime/t.duration)}),t.addEventListener("ended",()=>{n==null||n()});let S=t.playbackRate;function I(){h&&(URL.revokeObjectURL(h),h=null)}function y(p,b={}){const C=r.get(p);C&&(r.delete(p),b={...b,ownedObjectUrl:!0},p=C),t.classList.add("fade-out"),window.setTimeout(()=>{if(t.src.endsWith(p)){t.classList.remove("fade-out");return}const F=t.muted,R=b.seekFraction;I(),v=null,h=b.ownedObjectUrl?p:null,t.src=p,t.load(),t.onloadeddata=()=>{if(t.muted=F,R!==void 0&&Number.isFinite(t.duration)&&t.duration>0){const me=Math.max(0,Math.min(.999,R));t.currentTime=me*t.duration}else t.currentTime=0;t.playbackRate=S,t.classList.remove("fade-out"),b.autoplay&&t.play().catch(()=>{})}},120)}function L(p){t.muted=p}async function M(){await t.play()}function T(){t.pause()}function U(){t.classList.add("is-empty")}function O(){t.classList.remove("is-empty")}function k(p){if(!Number.isFinite(t.duration)||t.duration<=0)return;const b=Math.max(0,Math.min(1,p));t.currentTime=b*t.duration}function x(){t.currentTime=0,l==null||l(0)}function J(p=8e3){return t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(b=>{const C=()=>{R(),b()},F=window.setTimeout(()=>{R(),b()},Math.max(0,p));function R(){window.clearTimeout(F),t.removeEventListener("loadeddata",C)}t.addEventListener("loadeddata",C,{once:!0})})}function ae(p,b=8e3){const C=Math.max(0,p);return C===0||ie(C)?Promise.resolve():new Promise(F=>{const R=()=>{ie(C)&&(de(),F())},me=window.setTimeout(()=>{de(),F()},Math.max(0,b));function de(){window.clearTimeout(me),t.removeEventListener("progress",R),t.removeEventListener("canplay",R),t.removeEventListener("loadeddata",R)}t.addEventListener("progress",R),t.addEventListener("canplay",R),t.addEventListener("loadeddata",R),R()})}function ie(p){const b=t.currentTime;for(let C=0;C<t.buffered.length;C+=1){const F=t.buffered.start(C),R=t.buffered.end(C);if(!(b<F||b>R))return R-b>=p}return!1}function Z(p){u=new Set(p.filter(Boolean).filter(b=>b!==t.currentSrc)),E||D()}function X(){E=!0,se(),ee()}function ce(){if(!E){D();return}E=!1,D()}function D(){for(const[p,b]of m.entries())u.has(p)||(b.removeAttribute("src"),b.load(),m.delete(p));for(const[p,b]of g.entries())u.has(p)||(b.abort(),g.delete(p));for(const p of u){if(!m.has(p)){const b=document.createElement("video");b.preload="auto",b.muted=!0,b.playsInline=!0,b.src=p,b.load(),m.set(p,b)}r.has(p)||g.has(p)||_e(p)}}function se(){for(const p of m.values())p.removeAttribute("src"),p.load();m.clear()}function ee(){for(const p of g.values())p.abort();g.clear()}function _e(p){const b=new AbortController;g.set(p,b);const C=`${p}?_=${Date.now()}`;fetch(C,{signal:b.signal}).then(async F=>{if(!F.ok)return;const R=await F.blob();u.has(p)&&r.set(p,URL.createObjectURL(R))}).catch(F=>{F instanceof DOMException&&F.name}).finally(()=>{g.get(p)===b&&g.delete(p)})}function oe(){u.clear(),E=!1,se(),ee();for(const p of r.values())URL.revokeObjectURL(p);r.clear()}function q(p){return r.get(p)??null}function B(){!c||t.readyState<2||t.videoWidth===0||t.videoHeight===0||(w.width=t.videoWidth,w.height=t.videoHeight,c.drawImage(t,0,0,w.width,w.height),v=w.toDataURL("image/jpeg",.85))}function j(){return v||B(),v}function $(p){l=p}function z(p){n=p}return{setSource:y,setMuted:L,play:M,pause:T,hideMedia:U,showMedia:O,seekToFraction:k,resetPlayback:x,waitForLoadedData:J,waitForBufferedAhead:ae,onTimeUpdate:$,onEnded:z,getDurationSeconds:()=>Number.isFinite(t.duration)?t.duration:0,getPlaybackFraction:()=>!Number.isFinite(t.duration)||t.duration<=0?0:t.currentTime/t.duration,isPaused:()=>t.paused,setPlaybackRate:p=>{S=p,t.playbackRate=p},getPlaybackRate:()=>S,onPlayStateChange:p=>{d=p},getElement:()=>i,prewarmSources:Z,suspendPrewarming:X,resumePrewarming:ce,clearPrewarmedSources:oe,getPrewarmedBlobUrl:q,captureFrame:j}}const jt=[.25,.5,1,2];function $t(s,a={}){const{onChange:i,onTogglePlay:t,onSpeedChange:l,onSummaryClick:n,onScrubStart:d,onScrubEnd:u,initialSpeed:E=1}=a,m=document.createElement("div");m.className="timeline";const r=document.createElement("div");r.className="timeline__bar-row";const g=document.createElement("button");g.className="timeline__play-btn",g.type="button",g.setAttribute("aria-label","Toggle playback"),g.addEventListener("click",()=>t==null?void 0:t());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const v=document.createElement("div");v.className="timeline__speed";const w=document.createElement("button");w.className="timeline__speed-btn",w.type="button",w.setAttribute("aria-label","Playback speed"),w.addEventListener("click",()=>{v.classList.toggle("open")});const c=document.createElement("div");c.className="timeline__speed-menu";for(const y of jt){const L=document.createElement("button");L.className="timeline__speed-option",L.type="button",L.textContent=We(y),L.addEventListener("click",()=>{v.classList.remove("open"),l==null||l(y)}),c.appendChild(L)}v.appendChild(w),v.appendChild(c);const S=document.createElement("button");return S.className="timeline__summary-btn",S.type="button",S.setAttribute("aria-label","View run summary"),S.textContent="ⓘ",S.addEventListener("click",()=>n==null?void 0:n()),r.appendChild(g),r.appendChild(h),r.appendChild(v),r.appendChild(S),h.addEventListener("input",()=>{const y=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${y*100}%`),i==null||i(y)}),h.addEventListener("pointerdown",()=>d==null?void 0:d()),h.addEventListener("pointerup",()=>u==null?void 0:u()),h.addEventListener("change",()=>u==null?void 0:u()),document.addEventListener("click",y=>{v.contains(y.target)||v.classList.remove("open")}),m.appendChild(r),s.appendChild(m),I(E),{setPosition(y){const L=Math.max(0,Math.min(1,y));h.value=String(Math.round(L*1e3)),h.style.setProperty("--fill",`${L*100}%`)},setPlaying(y){g.textContent=y?"⏸":"▶",g.classList.toggle("is-paused",!y),g.setAttribute("aria-label",y?"Pause":"Play")},setSpeed(y){I(y)}};function I(y){w.textContent=We(y);for(const L of c.children)L.classList.toggle("is-active",L.textContent===We(y))}}function We(s){return`x${s}`}function Wt(s){const a=document.createElement("aside");a.className="data-panel";const i=document.createElement("div");return i.className="data-panel__metrics",a.appendChild(i),s.appendChild(a),{update(t,l,n={}){i.innerHTML="";const d=qt(t,l,n);for(const u of t.metadata.liveStats){const E=Gt(u,d),m=document.createElement("div");m.className="data-panel__metric",m.innerHTML=`
          <span class="data-panel__metric-label">${E.label}</span>
          <span class="data-panel__metric-value">${E.value}</span>
        `,i.appendChild(m)}}}}function qt(s,a,i){const t=Object.fromEntries(s.parameters.map(n=>[n.id,{label:n.label,value:Te(a[n.id]??n.fallbackValue,n.step,{scale:n.valueScale,format:n.displayFormat,significantFigures:n.displaySignificantFigures})}])),l={scale:{label:"Scale",value:s.label},parameters:{label:"Parameters",value:String(s.parameters.length)}};return{...t,...l,...Object.fromEntries(Object.entries(i).map(([n,d])=>[n,{label:zt(n),value:d}]))}}function zt(s){return s.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function Gt(s,a){const i=a[s.id]??{label:s.id,value:"--"},t=s.liveKey??s.id,l=a[t],n=Yt((l==null?void 0:l.value)??i.value??"--",s,!!l);return{label:s.label??(l==null?void 0:l.label)??i.label,value:ke(n,s.unit)}}function Yt(s,a,i){if(s==="--")return s;const t=Number(s);if(!Number.isFinite(t))return s;const l=a.valueScale??1,n=t*l;return i?a.integer?at(Math.round(n)):at(n):a.integer?Math.max(0,Math.round(n)).toLocaleString(void 0):Tt(s,{integer:a.integer})}function Kt(){const s=le("assets/2-McAlpine.webp"),a=document.createElement("div"),i=document.createElement("button");i.className="view-switcher__info entry-overlay__info-button",i.type="button",i.setAttribute("aria-label","About this experience"),i.appendChild(Zt()),a.className="sci-modal is-hidden",a.innerHTML=`
    <div class="entry-info-modal">
      <div class="entry-info-modal__shell">
        <div class="entry-info-modal__media">
          <img
            class="entry-info-modal__image"
            src="${s}"
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
  `;const t=a.querySelector(".entry-info-modal__close");function l(){a.classList.remove("is-hidden")}function n(){a.classList.add("is-hidden")}return i.addEventListener("click",l),t.addEventListener("click",n),a.addEventListener("click",d=>{d.target===a&&n()}),{infoButton:i,infoModal:a,open:l,close:n}}function Jt(s){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=s,a}function Zt(){return Jt(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Xt={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function Qt(s,a,i){const t=le("assets/banner-1600.webp"),l=[`${le("assets/banner-960.webp")} 960w`,`${le("assets/banner-1600.webp")} 1600w`].join(", "),n=document.createElement("section");n.className="overlay overlay--entry",n.hidden=!0,n.classList.add("is-hidden");const d=document.createElement("div");d.className="entry-overlay",d.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${t}" srcset="${l}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const u=document.createElement("div");u.className="entry-overlay__actions";function E(h){u.innerHTML="";for(const v of h){const w=document.createElement("button");w.className="entry-overlay__button",w.type="button";const c=Xt[v.id]??"Explore this simulation scale.";w.innerHTML=`
        <span class="entry-overlay__button-label">${v.label}</span>
        <span class="entry-overlay__button-description">${c}</span>
      `,w.addEventListener("click",()=>i(v)),u.appendChild(w)}}E(a);const{infoButton:m,infoModal:r,close:g}=Kt();return d.appendChild(u),n.appendChild(d),n.appendChild(m),n.appendChild(r),s.appendChild(n),{show(){n.hidden=!1,n.classList.remove("is-hidden")},hide(){g(),n.hidden=!0,n.classList.add("is-hidden")},setSimulationClasses(h){E(h)}}}function en(s,a){const i=document.createElement("div");return i.className="view-switcher is-hidden",s.appendChild(i),{update(t,l){if(i.innerHTML="",t.length<=1){i.classList.add("is-hidden");return}i.classList.remove("is-hidden");for(const n of t){const d=document.createElement("div");d.className="view-switcher__row";const u=document.createElement("button");u.className="view-switcher__button",u.type="button",u.dataset.viewId=n.id,u.classList.toggle("is-active",n.id===l),u.setAttribute("aria-pressed",String(n.id===l)),u.setAttribute("aria-label",n.label??n.id);const E=tn(n.icon);if(E){const r=document.createElement("span");r.className="view-switcher__icon",r.setAttribute("aria-hidden","true"),r.appendChild(E),u.appendChild(r)}const m=document.createElement("span");if(m.className="view-switcher__label",m.textContent=n.label??n.id,u.appendChild(m),u.addEventListener("click",()=>a.onSelect(n.id)),d.appendChild(u),n.description){const r=document.createElement("button");r.className="view-switcher__info",r.type="button",r.setAttribute("aria-label",`Info about ${n.label??n.id}`),r.appendChild(nn()),r.addEventListener("click",g=>{g.stopPropagation(),a.onInfo(n.id,n.label??n.id,n.description??"")}),d.appendChild(r)}i.appendChild(d)}},hide(){i.innerHTML="",i.classList.add("is-hidden")}}}function tn(s){switch(s){case"dark-matter":return ye(`
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
      `);default:return null}}function ye(s){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=s,a}function nn(){return ye(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const an=`# Credits source-of-truth.
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
`;function sn(){const s=rt(an);if(!Array.isArray(s))return[];const a=[];for(const i of s){if(!i||typeof i!="object")continue;const t=i.text;if(typeof t!="string"||t.trim().length===0)continue;const l={text:t},n=i.url;typeof n=="string"&&n.trim().length>0&&(l.url=n);const d=i.logo;typeof d=="string"&&d.trim().length>0&&(l.logo=d),i.header===!0&&(l.header=!0),a.push(l)}return a}function on(s,a,i,t){const l=document.createElement("div");l.className="parameter-editor",s.appendChild(l);let n=a,d={...i};function u(r,g){n=r,d=g?{...g}:rn(r),l.innerHTML="";const h=document.createElement("div");h.className="parameter-editor__heading",h.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${r.label} Controls</h2>
    `,l.appendChild(h);const v=document.createElement("div");v.className="param-info-modal is-hidden",v.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,l.appendChild(v);const w=v.querySelector(".sci-modal__title"),c=v.querySelector(".sci-modal__body"),S=v.querySelector(".sci-modal__close");function I(M,T){w.textContent=M,c.textContent=T,v.classList.remove("is-hidden")}function y(){v.classList.add("is-hidden")}S.addEventListener("click",y),v.addEventListener("click",M=>{M.target===v&&y()});const L=document.createElement("div");L.className="parameter-editor__list";for(const M of r.parameters)L.appendChild(E(M,I));l.appendChild(L),m()}function E(r,g){const h=document.createElement("div");h.className="res-card param-card";const v=document.createElement("div");v.className="param-card__header";const w=document.createElement("span");w.className="res-card__label",w.textContent=r.label;const c=r.displayUnit??r.unit,S=document.createElement("span");S.className="param-card__range",S.textContent=`${ke(Te(r.min,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)} – ${ke(Te(r.max,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)}`,v.appendChild(w),v.appendChild(S);const I=document.createElement("input");I.className="param-card__slider",I.type="range";const y=r.logScale?Math.log10(r.min):r.min,L=r.logScale?Math.log10(r.max):r.max,M=d[r.id]??r.fallbackValue;I.min=String(y),I.max=String(L),I.step=r.logScale?"0.001":String(r.step),I.value=String(r.logScale?Math.log10(Math.max(M,Number.MIN_VALUE)):M),I.setAttribute("aria-label",r.label);const T=document.createElement("span");T.className="res-card__value";function U(k){const x=r.logScale?10**k:k;d[r.id]=x,I.value=String(k),I.style.setProperty("--fill",`${it(k,y,L)}%`),T.textContent=ke(Te(x,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),m()}I.addEventListener("input",()=>{U(parseFloat(I.value))}),I.addEventListener("pointerdown",k=>k.stopPropagation()),I.addEventListener("click",k=>k.stopPropagation());const O=r.logScale?Math.log10(Math.max(M,Number.MIN_VALUE)):M;if(I.style.setProperty("--fill",`${it(O,y,L)}%`),T.textContent=ke(Te(M,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),r.description){h.classList.add("res-card--has-info"),h.setAttribute("title",r.description);const k=document.createElement("span");k.className="param-card__info-btn",k.setAttribute("aria-label","Parameter description"),k.textContent="ⓘ",v.appendChild(k),h.addEventListener("click",()=>{g(r.label,r.description)})}return h.appendChild(v),h.appendChild(I),h.appendChild(T),h}function m(){t({...d})}return u(a,i),{setSimClass(r,g){u(r,g)},setValues(r){u(n,r)},getValues(){return{...d}}}}function rn(s){return Object.fromEntries(s.parameters.map(a=>[a.id,a.fallbackValue]))}function it(s,a,i){return i===a?0:(s-a)/(i-a)*100}function ln(s,a){const i=document.createElement("section");i.className="overlay overlay--config",i.hidden=!0,i.classList.add("is-hidden");const t=document.createElement("div");t.className="config-overlay";const l=document.createElement("div");l.className="config-overlay__shell";const n=document.createElement("div");n.className="config-overlay__media",n.dataset.simClass=a.simClass.id;const d=document.createElement("img");d.className="config-overlay__media-image",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`,n.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,n.prepend(d);const u=document.createElement("div");u.className="config-overlay__controls",u.dataset.view=a.initialView??"parameters";const E=document.createElement("div");E.className="config-overlay__header";const m=document.createElement("div");m.className="config-overlay__title-block",m.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const r=m.querySelector(".config-overlay__eyebrow"),g=m.querySelector(".config-overlay__title"),h=m.querySelector(".config-overlay__subtitle"),v=document.createElement("button");v.className="config-overlay__close",v.type="button",v.setAttribute("aria-label","Back"),v.textContent="←",E.appendChild(m),E.appendChild(v);const w=document.createElement("section");w.className="config-overlay__section config-overlay__section--grow",w.dataset.section="parameters";const c=document.createElement("div");w.appendChild(c);const S=document.createElement("section");S.className="config-overlay__section config-overlay__section--grow",S.dataset.section="settings",S.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const I=document.createElement("div");S.appendChild(I);const y=document.createElement("section");y.className="advanced-settings",y.dataset.state="closed",y.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const L=document.createElement("button");L.className="advanced-settings__access",L.type="button",L.textContent="Advanced Settings",y.appendChild(L);const M=document.createElement("div");M.className="advanced-settings__auth";const T=document.createElement("input");T.className="advanced-settings__password",T.type="password",T.placeholder="Enter password",T.autocomplete="off";const U=document.createElement("button");U.className="advanced-settings__unlock",U.type="button",U.textContent="Unlock";const O=document.createElement("p");O.className="advanced-settings__message",M.appendChild(T),M.appendChild(U),M.appendChild(O),y.appendChild(M);const k=document.createElement("div");k.className="advanced-settings__form";const x=document.createElement("label");x.className="advanced-settings__field",x.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const J=document.createElement("select");J.className="advanced-settings__select",J.appendChild(new Option("None",""));for(const f of a.availableScales)J.appendChild(new Option(f.label,f.id));x.appendChild(J),k.appendChild(x);const ae=document.createElement("div");ae.className="advanced-settings__field",ae.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const ie=document.createElement("div");ie.className="advanced-settings__options";const Z=document.createElement("label"),X=document.createElement("input");Z.className="advanced-settings__choice",X.type="radio",X.name="manifest-source",X.value="local",Z.appendChild(X),Z.append("Local manifest");const ce=document.createElement("label"),D=document.createElement("input");ce.className="advanced-settings__choice",D.type="radio",D.name="manifest-source",D.value="online",ce.appendChild(D),ce.append("Online manifest"),ie.appendChild(Z),ie.appendChild(ce),ae.appendChild(ie),k.appendChild(ae);const se=document.createElement("label");se.className="advanced-settings__field advanced-settings__field--inline";const ee=document.createElement("input"),_e=document.createElement("span");ee.type="checkbox",ee.className="advanced-settings__checkbox",_e.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,se.appendChild(ee),se.appendChild(_e),k.appendChild(se);const oe=document.createElement("div");oe.className="advanced-settings__field",oe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const q=document.createElement("div");q.className="advanced-settings__options";const B=new Map;for(const f of a.availableScales){const P=document.createElement("label"),N=document.createElement("input");P.className="advanced-settings__choice",N.type="checkbox",N.value=f.id,B.set(f.id,N),P.appendChild(N),P.append(`Show ${f.label}`),q.appendChild(P)}oe.appendChild(q),k.appendChild(oe),y.appendChild(k),S.appendChild(y);const j=document.createElement("section");j.className="config-overlay__section config-overlay__section--grow",j.dataset.section="credits",j.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const $=j.querySelector("[data-credits]"),z=sn();if($.innerHTML="",z.length===0){const f=document.createElement("div");f.className="credits-list__entry",f.textContent="To be credited...",$.appendChild(f)}else for(const f of z)if(f.header){const P=document.createElement("div");P.className="credits-list__heading",P.textContent=f.text,$.appendChild(P)}else{const P=document.createElement("div");P.className="credits-list__entry";const N=document.createElement("span");if(N.className="credits-list__text",f.url){const V=document.createElement("a");V.className="credits-list__link",V.href=f.url,V.target="_blank",V.rel="noopener noreferrer",V.textContent=f.text,N.appendChild(V)}else N.textContent=f.text;P.appendChild(N),$.appendChild(P)}const p=document.createElement("div");p.className="config-overlay__footer";const b=document.createElement("button");b.className="run-button",b.type="button",b.textContent="Run",p.appendChild(b),u.appendChild(E),u.appendChild(w),u.appendChild(S),u.appendChild(j),u.appendChild(p),l.appendChild(n),l.appendChild(u),t.appendChild(l),i.appendChild(t),s.appendChild(i);let C=Ae(a.advancedSettings),F="closed";const R=on(c,a.simClass,a.values,a.onValuesChange),me=kt(I,a.theme,a.onThemeChange);v.addEventListener("click",a.onClose),L.addEventListener("click",()=>{if(F==="open"){ue("closed");return}ue("auth"),T.focus()}),U.addEventListener("click",Ie),T.addEventListener("keydown",f=>{f.key==="Enter"&&Ie()}),J.addEventListener("change",()=>{C.lockedScaleId=J.value||null,re()}),X.addEventListener("change",()=>{X.checked&&(C.manifestSource="local")}),D.addEventListener("change",()=>{D.checked&&(C.manifestSource="online")}),ee.addEventListener("change",()=>{C.verboseLogging=ee.checked});for(const[f,P]of B.entries())P.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,V])=>V.checked).map(([V])=>V).length===0&&!C.lockedScaleId){P.checked=!0;return}C.hiddenScaleIds=Array.from(B.keys()).filter(V=>{var H;return!((H=B.get(V))!=null&&H.checked)&&V!==C.lockedScaleId}),re()}),f===C.lockedScaleId&&(P.disabled=!0);de(a.initialView??"parameters"),re();function de(f){u.dataset.view=f,f==="parameters"?(r.textContent=a.simClass.label,g.textContent="Shape Your Simulation",h.textContent=a.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`):f==="settings"?(r.textContent="Interface",g.textContent="Adjust The Control Room",h.textContent="Change the interface theme and manage exhibit-level options for this installation.",d.src=le("assets/Cluster_Stuart.webp"),d.alt="Galaxy cluster simulation preview"):(r.textContent="References",g.textContent="Project Sources And Attribution",h.textContent="Review the datasets, imagery, and supporting materials behind this experience.",d.src=le("assets/synthetic_hst_pretty_galaxy.webp"),d.alt="Synthetic galaxy image preview"),f==="settings"?b.textContent="Apply":f==="credits"?b.textContent="Close":b.textContent="Run Simulation"}function re(){J.value=C.lockedScaleId??"",X.checked=C.manifestSource==="local",D.checked=C.manifestSource==="online",ee.checked=C.verboseLogging;for(const[f,P]of B.entries()){const N=C.lockedScaleId===f;P.checked=N||!C.hiddenScaleIds.includes(f),P.disabled=N}}function Ie(){if(T.value!==Pt){O.textContent="Incorrect password";return}T.value="",O.textContent="",ue("open")}function ue(f){F=f,y.dataset.state=f,L.textContent=f==="open"?"Hide Advanced Settings":"Advanced Settings",f!=="auth"&&(O.textContent="")}function pe(){T.value="",O.textContent="",ue("closed")}function xe(){C=Ae(a.advancedSettings),re()}return b.addEventListener("click",()=>{const f=u.dataset.view;if(f==="settings"){a.onApplySettings(Ae(C));return}if(f==="credits"){a.onClose();return}a.onRun()}),{show(){i.hidden=!1,i.classList.remove("is-hidden")},hide(){i.hidden=!0,i.classList.add("is-hidden"),xe(),pe()},setSimulation(f,P){a.simClass=f,n.dataset.simClass=f.id,R.setSimClass(f,P),u.dataset.view==="parameters"&&(d.src=f.placeholderImage,d.alt=`${f.label} preview`,de("parameters"))},setTheme(f){me.setActive(f)},setView(f){de(f),f!=="settings"&&pe()},setAdvancedSettings(f){a.advancedSettings=Ae(f),C=Ae(f),re(),pe()}}}function Ae(s){return{lockedScaleId:s.lockedScaleId,manifestSource:s.manifestSource,verboseLogging:s.verboseLogging,hiddenScaleIds:[...s.hiddenScaleIds]}}function cn(s){const{TYPING_MS_PER_CHAR:a,MIN_TERMINAL_TIME_MS:i,FINAL_PAUSE_MS:t}=Ye,l=document.createElement("section");l.className="overlay overlay--initializing",l.hidden=!0,l.classList.add("is-hidden");const n=document.createElement("div");n.className="terminal";const d=document.createElement("div");d.className="terminal__header",d.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const u=document.createElement("div");u.className="terminal__log",n.appendChild(d),n.appendChild(u),l.appendChild(n),s.appendChild(l);let E=[],m=0;function r(){for(const w of E)window.clearTimeout(w);E=[]}function g(w,c){return new Promise(S=>{const I=window.setTimeout(()=>{c===m&&S()},Math.max(0,w));E.push(I)})}async function h(w,c){const S=document.createElement("div");S.className="terminal__line";const I=v();S.appendChild(I),u.appendChild(S);for(let y=0;y<w.length;y+=1){if(c!==m)return;const L=w[y];S.insertBefore(document.createTextNode(L),I),u.scrollTop=u.scrollHeight,await g(a,c)}I.remove()}function v(){const w=document.createElement("span");return w.className="terminal__cursor",w.textContent="█",w}return{async show(w,c,S,I){r(),m+=1;const y=m;l.hidden=!1,l.classList.remove("is-hidden");const L=performance.now(),M=(I==null?void 0:I.minTerminalTimeMs)??i;let T=!S,U=[...w];S&&S.then(()=>{T=!0});let O=0;for(;y===m;){U.length===0&&(U=[...w]);const x=Math.floor(Math.random()*U.length),[J]=U.splice(x,1),ae=`${st(O)} ${J.text}`;if(O+=1,await h(ae,y),y!==m)return;if(performance.now()-L>=M&&T)break}if(y!==m)return;const k=document.createElement("div");k.className="terminal__line terminal__line--syncing",k.textContent=`${st(O)} STARTING SIMULATION...`,u.appendChild(k),u.scrollTop=u.scrollHeight,await g(t,y),y===m&&c()},hide(){r(),m+=1,l.hidden=!0,l.classList.add("is-hidden"),u.innerHTML=""}}}function st(s){const a=Math.max(0,Math.floor(s)),i=Math.floor(a/3600),t=Math.floor(a%3600/60),l=a%60;return`[${qe(i)}:${qe(t)}:${qe(l)}]`}function qe(s){return String(s).padStart(2,"0")}function dn(s,a){const i=document.createElement("button");i.className="display-button",i.type="button",i.innerHTML="<span></span><span></span><span></span>",i.setAttribute("aria-label","Open configuration overlay"),s.appendChild(i);const t=document.createElement("div");t.className="display-menu";const l=document.createElement("div");l.className="display-menu__header",l.textContent="Menu",t.appendChild(l);const n=E("Home",()=>{m(),a.onHome()});t.appendChild(n),t.appendChild(E("Settings",()=>{m(),a.onViewSelected("settings")})),t.appendChild(E("Credits",()=>{m(),a.onViewSelected("credits")}));const d=E("Fullscreen",()=>{var g;m(),document.fullscreenElement?document.exitFullscreen():(g=document.getElementById("app"))==null||g.requestFullscreen()});t.appendChild(d),s.appendChild(t);function u(){const g=d.querySelector(".display-menu__item-label");g&&(g.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const h=document.getElementById("app");h&&h.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",u),i.addEventListener("click",()=>{s.classList.toggle("open")}),document.addEventListener("click",g=>{s.contains(g.target)||m()}),r(a.showHome??!0),{close:m,setHomeVisible:r};function E(g,h){const v=document.createElement("button");return v.className="display-menu__item",v.type="button",v.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${g}</span>
    `,v.addEventListener("click",h),v}function m(){s.classList.remove("open")}function r(g){n.hidden=!g,n.classList.toggle("is-hidden",!g)}}const un=`# Initialization terminal script for the Planetary simulation family.
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
`,mn=`# Initialization terminal script for the Galaxy simulation family.
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
`,pn=`# Initialization terminal script for the Cosmos simulation family.
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
`,hn={planetary:un,galaxy:mn,cosmos:pn};function fn(s){return rt(hn[s.id]).map(i=>({text:i}))}const Me={mode:"time",frames:[]};async function gn(s){const a=await fetch(s);if(!a.ok)throw new Error(`Failed to load live stats CSV: ${s}`);const i=await a.text();return _n(i)}function vn(s,a,i=0){if(s.mode==="row")return bn(s.frames,a,i);const t=s.frames;if(t.length===0)return{};if(a<=t[0].t)return{...t[0].values};const l=t[t.length-1];if(a>=l.t)return{...l.values};const n=yn(t,a),d=t[Math.max(0,n-1)],u=t[Math.min(t.length-1,n)],E=(a-d.t)/Math.max(u.t-d.t,1e-9);return En(d.values,u.values,E)}function yn(s,a){let i=1,t=s.length-1;for(;i<t;){const l=Math.floor((i+t)/2);s[l].t<=a?i=l+1:t=l}return i}function _n(s){const a=s.split(/\r?\n/).map(t=>t.trim()).filter(Boolean);if(a.length<2)return Me;const i=ze(a[0]);return i[0]==="t"?{mode:"time",frames:a.slice(1).map(t=>{const l=ze(t),n={};for(let d=1;d<i.length;d+=1)n[i[d]]=l[d]??"";return{t:parseFloat(l[0]??"0")||0,values:n}})}:{mode:"row",frames:a.slice(1).map((t,l)=>{const n=ze(t),d={};for(let u=0;u<i.length;u+=1)d[i[u]]=n[u]??"";return{t:l,values:d}})}}function bn(s,a,i){if(s.length===0)return{};if(!Number.isFinite(i)||i<=0)return{...s[0].values};const t=Math.max(0,Math.min(1,a/i)),l=Math.round(t*(s.length-1));return{...s[l].values}}function ze(s){const a=[];let i="",t=!1;for(let l=0;l<s.length;l+=1){const n=s[l];if(n==='"'){t=!t;continue}if(n===","&&!t){a.push(i),i="";continue}i+=n}return a.push(i),a}function En(s,a,i){const t=new Set([...Object.keys(s),...Object.keys(a)]),l={};for(const n of t){const d=s[n]??"",u=a[n]??d,E=parseFloat(d),m=parseFloat(u);if(Number.isFinite(E)&&Number.isFinite(m)){const r=E+(m-E)*i;l[n]=wn(r);continue}l[n]=i<.5?d:u}return l}function wn(s){return s.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function Sn(s){In(Nt,s)}function In(s,a){if(navigator.sendBeacon){const i=new Blob([JSON.stringify(a)],{type:"application/json"});if(navigator.sendBeacon(s,i)){K("Run selection tracking dispatched",{simulationId:a.simulationId});return}}fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),keepalive:!0}).then(i=>{i.ok?K("Run selection tracked",{simulationId:a.simulationId}):Se("Run selection tracking rejected",{simulationId:a.simulationId,status:i.status})}).catch(i=>{Se("Run selection tracking failed",{simulationId:a.simulationId,error:i instanceof Error?i.message:String(i)})})}const ot=50*1024*1024,Cn=8,Ln=6e3,An=8e3,Tn=5e3,kn=1200,Pn=100,Ge={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Nn(s){const a=we.map(e=>e.id);let i=Mt(a),t=et(i);const l=xt(i.manifestSource);i.manifestSource==="online"&&l.preloadActiveManifest();let n=tt(i.lockedScaleId)??t[0]??we[0],d=i.lockedScaleId?Ge[n.id]:Rt(),u=!1,E=null,m=null,r=0,g=Me,h=!1;const v=Object.fromEntries(we.map(e=>[e.id,_t(e)]));$e(d);const w=Ot(n.id),c=Dt(s,w),S=document.createElement("div");S.className="display-chrome",S.classList.add("is-hidden"),s.appendChild(S);const I=document.createElement("div");I.className="orientation-overlay",I.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,s.appendChild(I);const y=document.createElement("div");y.className="swift-logo",y.innerHTML=`
    <img
      class="swift-logo__image"
      src="${le("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,s.appendChild(y);const L=document.createElement("div");L.className="synth-logo is-hidden",L.innerHTML=`
    <img
      class="synth-logo__image"
      src="${le("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,s.appendChild(L);const M=document.createElement("img");M.className="app-partner-logo",M.src=le("assets/dirac-hpc-white.webp"),M.alt="DIRAC HPC",M.decoding="async",s.appendChild(M);const T=document.createElement("div");T.className="display-chrome__top-left is-hidden",s.appendChild(T);const U=dn(T,{onHome(){He()},onViewSelected(e){if(e==="credits"){Ne("credits");return}Ne(e)},showHome:!i.lockedScaleId}),O=document.createElement("div");O.className="display-chrome__left-center",S.appendChild(O);const k=en(O,{onSelect(e){Qe(e)},onInfo(e,o,_){J.textContent=o,ae.textContent=_,x.classList.add("is-visible")}}),x=document.createElement("div");x.className="view-info-overlay",x.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,s.appendChild(x);const J=x.querySelector(".view-info-overlay__title"),ae=x.querySelector(".view-info-overlay__text"),ie=x.querySelector(".view-info-overlay__close");x.addEventListener("click",e=>{e.target===x&&x.classList.remove("is-visible")}),ie.addEventListener("click",()=>{x.classList.remove("is-visible")});const Z=document.createElement("div");Z.className="display-chrome__top-center is-hidden",S.appendChild(Z);const X=document.createElement("div");X.className="display-chrome__top-right",S.appendChild(X);const ce=Wt(X),D=document.createElement("div");D.className="display-chrome__center-status",D.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,S.appendChild(D);const se="universe-engine-playback-speed",ee=()=>{const e=localStorage.getItem(se),o=e?Number(e):NaN;return[.25,.5,1,2].includes(o)?o:1},_e=e=>{localStorage.setItem(se,String(e))},oe=ee();c.setPlaybackRate(oe);const q=document.createElement("div");q.className="display-chrome__bottom",S.appendChild(q);const B=$t(q,{onChange(e){me(e)},onTogglePlay:Xe,onSpeedChange:pt,onSummaryClick:mt,onScrubStart(){xe(),R()},onScrubEnd(){f(),c.isPaused()||F()},initialSpeed:oe});B.setPlaying(!c.isPaused());let j=null,$=null,z=null,p=!1,b=null,C=0;function F(){if(j!==null)return;function e(){const o=c.getPlaybackFraction();B.setPosition(o),c.isPaused()?j=null:j=requestAnimationFrame(e)}j=requestAnimationFrame(e)}function R(){j!==null&&(cancelAnimationFrame(j),j=null)}function me(e){$=e,z===null&&(z=requestAnimationFrame(()=>{if(z=null,$===null)return;const o=$;$=null,c.seekToFraction(o)}))}function de(){if($===null)return;z!==null&&(cancelAnimationFrame(z),z=null);const e=$;$=null,c.seekToFraction(e)}function re(){b!==null&&(window.clearTimeout(b),b=null)}function Ie(){if(!(m!=null&&m.views))return[];const e=Ee(n,m);return Object.entries(m.views).filter(([o])=>o!==e).map(([,o])=>o).filter(Boolean)}function ue(){re(),c.suspendPrewarming()}function pe(e=kn){re(),!(p||c.isPaused())&&(b=window.setTimeout(()=>{b=null,!(p||c.isPaused())&&(c.resumePrewarming(),c.prewarmSources(Ie()))},Math.max(0,e)))}function xe(){p=!0,C=0,ue()}function f(){p=!1,C=0,de(),r=c.getPlaybackFraction()*c.getDurationSeconds(),ve(r),pe()}c.onPlayStateChange(e=>{B.setPlaying(!e),e?(R(),ue()):(F(),pe(0))}),c.onTimeUpdate(e=>{if(r=e*c.getDurationSeconds(),p){const o=performance.now();if(o-C<Pn)return;C=o}ve(r)});const P=document.createElement("div");P.className="overlay-layer",s.appendChild(P);const N=Ft(P,{onReplay:ut,onParameters:()=>Ne("parameters"),onHome:He,showHome:!i.lockedScaleId});c.onEnded(()=>{u=!0;const e=c.captureFrame();N.update(n,Q(),c.getDurationSeconds(),E,e),N.show()});const V=Qt(P,t,e=>{Ze(e),Ne("parameters")}),H=ln(P,{simClass:n,values:Q(),theme:d,advancedSettings:i,availableScales:we,onValuesChange:lt,onThemeChange:Ve,onRun:()=>{K("Parameters submitted — starting run",{simClassId:n.id}),ht().catch(e=>{Se("Run failed to start",{simClassId:n.id,error:e instanceof Error?e.message:String(e)})})},onApplySettings:ct,onClose:dt,initialView:"parameters"}),Re=cn(P);B.setPosition(0),ve(),N.hide();const he=new WeakMap,te=e=>{const o=he.get(e);o&&(clearTimeout(o),he.delete(e)),e.classList.remove("side-collapsed")},fe=e=>{const o=he.get(e);o&&clearTimeout(o),he.set(e,setTimeout(()=>{e.classList.add("side-collapsed"),he.delete(e)},2500))},Oe=e=>{const o=he.get(e);o&&(clearTimeout(o),he.delete(e)),e.classList.add("side-collapsed")},Fe=(e,o)=>{const _=o.isCollapsible??(()=>!0);e.addEventListener("mouseenter",()=>te(e)),e.addEventListener("mouseleave",()=>{if(!_()){te(e);return}fe(e)}),e.addEventListener("focusin",()=>te(e)),e.addEventListener("focusout",A=>{if(!e.contains(A.relatedTarget)){if(!_()){te(e);return}fe(e)}}),e.addEventListener("click",()=>{if(!_()){te(e);return}if(e.classList.contains("side-collapsed")){te(e),fe(e);return}o.toggleOnClick?Oe(e):fe(e)}),_()?Oe(e):te(e)};Fe(T,{toggleOnClick:!0,isCollapsible:()=>s.dataset.mode!=="entry"}),Fe(O,{toggleOnClick:!0}),Fe(q,{toggleOnClick:!1});let Ce=0,be=null,Pe=0;const Ke=()=>{be!==null&&(cancelAnimationFrame(be),be=null)},Je=()=>{if(be!==null)return;Pe=c.getPlaybackFraction();const e=()=>{if(Ce===0){Ke();return}const _=12*(1/60)/Math.max(c.getDurationSeconds(),1);Pe=Math.max(0,Math.min(1,Pe+Ce*_)),c.seekToFraction(Pe),be=requestAnimationFrame(e)};be=requestAnimationFrame(e)};document.addEventListener("keydown",e=>{if(s.dataset.mode==="display"&&!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement))switch(e.key){case"Escape":e.preventDefault(),x.classList.contains("is-visible")?x.classList.remove("is-visible"):He();break;case" ":e.preventDefault(),Xe();break;case"ArrowLeft":e.preventDefault(),te(q),fe(q),Ce=-1,Je();break;case"ArrowRight":e.preventDefault(),te(q),fe(q),Ce=1,Je();break;case"ArrowUp":case"ArrowDown":{if(e.preventDefault(),te(O),fe(O),!(m!=null&&m.views)||Object.keys(m.views).length<=1)break;const o=n.views.filter(G=>{var Y;return((Y=m==null?void 0:m.views)==null?void 0:Y[G.id])!==void 0});if(o.length<=1)break;const _=m.viewId??Ee(n,m),A=o.findIndex(G=>G.id===_),ne=e.key==="ArrowUp"?(A-1+o.length)%o.length:(A+1)%o.length;Qe(o[ne].id);break}}}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(Ce=0,Ke())}),c.hideMedia(),c.pause(),ge(i.lockedScaleId?"config":"entry");function Ze(e){e.id===n.id&&h||(n=e,De(),Ve(Ge[e.id]),H.setSimulation(n,Q()),B.setPosition(0),ve(),Be(),Ue())}function lt(e){v[n.id]={...e},K("Parameter values updated",{simClassId:n.id,values:v[n.id]}),ve()}function Ve(e){d=e,$e(e),H.setTheme(e)}function Ne(e){e==="parameters"&&H.setSimulation(n,Q()),H.setView(e),ge("config")}function ct(e){if(At(e),h){N.hide(),ge("display");return}H.setSimulation(n,Q()),H.setView("parameters")}function dt(){if(N.hide(),!h&&i.lockedScaleId){H.setSimulation(n,Q()),H.setView("parameters");return}ge(h?"display":"entry")}function He(){i.lockedScaleId||(K("Returning to home screen",{simClassId:n.id}),De(),h=!1,c.hideMedia(),ge("entry"))}function ut(){u=!1,N.hide(),c.getPlaybackFraction()>=.999&&c.resetPlayback(),c.play().catch(()=>{c.setMuted(!0),c.play()})}function mt(){u=!0,c.pause();const e=E?c.captureFrame():null;N.update(n,Q(),c.getDurationSeconds(),E,e),N.show()}function Xe(){c.isPaused()?c.play().catch(()=>{c.setMuted(!0),c.play()}):c.pause()}function pt(e){c.setPlaybackRate(e),_e(e),B.setSpeed(e)}async function ht(){const e=Q();K("Run requested",{simClassId:n.id,values:e,manifestSource:l.getSource()});const o=await l.findNearestVideo(n.id,n.parameters,e);De(),m=o;const _=Ee(n,o);Sn({simulationId:n.id,parameters:e,manifestSource:l.getSource(),matchedRunId:o.runId});const A=It(o,_)??o.url,ne=Object.entries(o.views??{}).filter(([W])=>W!==_).map(([,W])=>W);Et(o.liveDataUrl),wt(o.summaryUrl),c.setMuted(!1),Be(_),ge("initializing");const G=ft(A);c.resumePrewarming(),c.prewarmSources(ne);const Y=(async()=>{const W=await G;K(`Prepared active video source: ${W.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:A,waitsForBuffer:W.shouldWaitForBuffer}),c.setSource(W.src,{ownedObjectUrl:W.ownedObjectUrl}),c.pause(),await c.waitForLoadedData(An),W.shouldWaitForBuffer&&await c.waitForBufferedAhead(Cn,Ln)})();await new Promise(W=>{Re.show(fn(n),W,Y,{minTerminalTimeMs:Ct()})}),h=!0,c.showMedia(),c.play().catch(()=>{c.setMuted(!0),c.play().catch(()=>{})}),ge("display")}async function ft(e){const o=await gt(e);if(o!==null&&o>0&&o<=ot){K("Downloading active video behind loading overlay",{videoUrl:e,contentLength:o});try{const _=await fetch(e);if(!_.ok)throw new Error(`Failed to download active video: ${e}`);const A=await _.blob();return K(`Active video full fetch complete: ${A.size} bytes`,{videoUrl:e,blobType:A.type}),{src:URL.createObjectURL(A),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(_){Se(`Full-fetch FAILED; falling back to progressive: ${_ instanceof Error?_.message:String(_)}`,{videoUrl:e})}}return o!==null?K("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:e,contentLength:o,fullFetchMaxBytes:ot}):K("Could not determine active video size; using progressive load",{videoUrl:e}),K("Using progressive active video load",{videoUrl:e}),{src:e,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function gt(e){try{const o=await fetch(e,{headers:{Range:"bytes=0-0"}});K("Probed active video size with range request",{videoUrl:e,ok:o.ok,status:o.status,contentLength:o.headers.get("Content-Length"),contentRange:o.headers.get("Content-Range")});const _=yt(o.headers.get("Content-Length"));if(_!==null)return _;const A=vt(o.headers.get("Content-Range"));return A!==null?A:null}catch(o){return Se("Could not probe active video size",{videoUrl:e,error:o instanceof Error?o.message:String(o)}),null}}function vt(e){if(!e)return null;const o=e.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!o)return null;const _=Number(o[1]);return Number.isFinite(_)&&_>0?_:null}function yt(e){if(!e)return null;const o=Number(e);return Number.isFinite(o)?o:null}function ge(e){if(s.dataset.mode=e,e==="entry"?document.documentElement.setAttribute("data-theme","glass"):e==="display"&&$e(d),Le(S,e==="display"||e==="config"),Le(y,e==="display"||e==="entry"),Le(T,!i.lockedScaleId&&(e==="entry"||e==="config"||e==="display")),e==="entry"?te(T):Oe(T),e==="entry"&&!i.lockedScaleId?V.show():V.hide(),e==="config"?(Re.hide(),H.setSimulation(n,Q()),H.show()):H.hide(),e!=="display")N.hide();else if(u){const _=c.captureFrame();N.update(n,Q(),c.getDurationSeconds(),E,_),N.show()}!h||e==="initializing"?(c.hideMedia(),e==="initializing"&&c.pause()):c.showMedia(),e!=="initializing"&&Re.hide(),Ue()}function Ue(){if(s.dataset.mode==="entry"){Le(L,!0);return}const e=s.dataset.mode==="display",o=n.id==="galaxy",A=Ee(n,m)==="hst";Le(L,e&&o&&A)}function ve(e=0){const o=vn(g,e,c.getDurationSeconds()),_=St(n,E,e,c.getDurationSeconds());ce.update(n,Q(),{...o,..._})}function Be(e){const o=n.views.filter(ne=>{var G;return((G=m==null?void 0:m.views)==null?void 0:G[ne.id])!==void 0});if(o.length<=1){k.hide(),Z.classList.add("is-hidden");return}const _=e??Ee(n,m),A=o.find(ne=>ne.id===_);k.update(o,_),A?(Z.classList.remove("is-hidden"),Z.innerHTML=`<span class="viewport-title">${A.label??A.id}</span>`):Z.classList.add("is-hidden")}function De(){g=Me,u=!1,E=null,m=null,r=0,p=!1,$=null,re(),z!==null&&(cancelAnimationFrame(z),z=null),N.hide(),k.hide(),c.pause(),c.clearPrewarmedSources(),c.resetPlayback(),B.setPosition(0)}function Qe(e){if(!(m!=null&&m.views)||e===Ee(n,m))return;const o=m.views[e];if(!o)return;m.viewId=e;const _=!c.isPaused()&&!u,A=u?0:c.getPlaybackFraction();u=!1,N.hide(),c.setSource(o,{seekFraction:A,autoplay:_}),c.prewarmSources(Ie()),_&&!p?pe():ue(),Be(e),x.classList.remove("is-visible"),Ue()}function Q(){return{...v[n.id]}}function _t(e){return Object.fromEntries(e.parameters.map(o=>[o.id,bt(o)]))}function bt(e){if(e.logScale){const G=Math.log10(e.min),Y=Math.log10(e.max);return 10**(G+Math.random()*(Y-G))}const o=Math.max(0,Math.round((e.max-e.min)/e.step)),_=Math.floor(Math.random()*(o+1)),A=e.min+_*e.step,ne=Vt(e.step);return Number(A.toFixed(ne))}async function Et(e){try{g=await gn(e)}catch(o){g=Me,Se("Failed to load live stats",{url:e,error:o instanceof Error?o.message:String(o)})}ve()}async function wt(e){E=await Bt(e),ve(r)}function St(e,o,_,A){if(!o||!Number.isFinite(A)||A<=0)return{};const ne=Math.max(0,Math.min(1,_/A)),G={};for(const Y of e.metadata.liveStats){if(!Y.live||!Y.fromVideo||!Y.scaleWithTime)continue;const je=Y.videoKey??Y.id,W=o[je];if(typeof W!="number"||!Number.isFinite(W))continue;const nt=W*ne;G[Y.id]=Y.integer?String(Math.floor(nt)):String(nt)}return G}function Le(e,o){e.hidden=!o,e.classList.toggle("is-hidden",!o)}function Ee(e,o){return o!=null&&o.views?o.viewId??Object.keys(o.views)[0]:o==null?void 0:o.viewId}function It(e,o){return!o||!e.views?null:e.views[o]??null}function et(e){const o=new Set(Ht(e,a));return we.filter(_=>o.has(_.id))}function tt(e){return e?we.find(o=>o.id===e)??null:null}function Ct(){return l.getSource()!=="local"?Ye.MIN_TERMINAL_TIME_MS:Lt(Ye.MIN_TERMINAL_TIME_MS,Tn)}function Lt(e,o){const _=Math.ceil(Math.min(e,o)),A=Math.floor(Math.max(e,o));return Math.floor(Math.random()*(A-_+1))+_}function At(e){const o=n.id,_=i.manifestSource;i=Ut(e,a),t=et(i),l.setSource(i.manifestSource),i.manifestSource==="online"&&l.preloadActiveManifest(),U.setHomeVisible(!i.lockedScaleId),N.setHomeVisible(!i.lockedScaleId),V.setSimulationClasses(t),H.setAdvancedSettings(i),K("Advanced settings updated",i),_!==i.manifestSource&&(m=null);const A=tt(i.lockedScaleId);A&&(Ze(A),A.id!==o&&(h=!1,c.hideMedia(),H.setView("parameters")),h||(Ve(Ge[A.id]),H.setSimulation(n,Q())))}}function Mn(){const s=document.getElementById("app");if(!s)throw new Error("App mount element not found.");Nn(s)}Mn();
//# sourceMappingURL=main-o2HIpaBJ.js.map
