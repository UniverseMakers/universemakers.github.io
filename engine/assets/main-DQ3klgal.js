import{f as Te,w as ke,a as at,b as At,c as le,p as rt,d as Tt,A as kt,I as Ye,l as K,e as Se,T as Pt,S as we,g as Nt,h as Mt,i as xt,j as $e,k as Rt,m as Ot,n as Ft,o as Vt,s as Ht,q as Ut}from"./placeholder-assets-D4JeNLV8.js";function Bt(s,a){const i=document.createElement("div");i.className="viewport";const t=document.createElement("video");t.className="viewport__media is-empty",t.src=a,t.loop=!1,t.muted=!0,t.playsInline=!0,t.preload="auto",t.setAttribute("aria-label","Simulation output"),i.appendChild(t),s.appendChild(i);let l,n,d,m=new Set,w=!1;const u=new Map,r=new Map,h=new Map;let v=null,y=null;const S=document.createElement("canvas"),c=S.getContext("2d");t.addEventListener("play",()=>d==null?void 0:d(!1)),t.addEventListener("pause",()=>d==null?void 0:d(!0)),t.addEventListener("ended",()=>d==null?void 0:d(!0)),t.addEventListener("timeupdate",()=>{!l||!Number.isFinite(t.duration)||t.duration<=0||l(t.currentTime/t.duration)}),t.addEventListener("ended",()=>{n==null||n()});let f=t.playbackRate;function E(){v&&(URL.revokeObjectURL(v),v=null)}function L(p,b={}){const I=r.get(p);I&&(r.delete(p),b={...b,ownedObjectUrl:!0},p=I),t.classList.add("fade-out"),window.setTimeout(()=>{if(t.src.endsWith(p)){t.classList.remove("fade-out");return}const F=t.muted,R=b.seekFraction;E(),y=null,v=b.ownedObjectUrl?p:null,t.src=p,t.load(),t.onloadeddata=()=>{if(t.muted=F,R!==void 0&&Number.isFinite(t.duration)&&t.duration>0){const me=Math.max(0,Math.min(.999,R));t.currentTime=me*t.duration}else t.currentTime=0;t.playbackRate=f,t.classList.remove("fade-out"),b.autoplay&&t.play().catch(()=>{})}},120)}function N(p){t.muted=p}async function P(){await t.play()}function A(){t.pause()}function U(){t.classList.add("is-empty")}function O(){t.classList.remove("is-empty")}function T(p){if(!Number.isFinite(t.duration)||t.duration<=0)return;const b=Math.max(0,Math.min(1,p));t.currentTime=b*t.duration}function M(){t.currentTime=0,l==null||l(0)}function J(p=8e3){return t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?Promise.resolve():new Promise(b=>{const I=()=>{R(),b()},F=window.setTimeout(()=>{R(),b()},Math.max(0,p));function R(){window.clearTimeout(F),t.removeEventListener("loadeddata",I)}t.addEventListener("loadeddata",I,{once:!0})})}function ae(p,b=8e3){const I=Math.max(0,p);return I===0||ie(I)?Promise.resolve():new Promise(F=>{const R=()=>{ie(I)&&(de(),F())},me=window.setTimeout(()=>{de(),F()},Math.max(0,b));function de(){window.clearTimeout(me),t.removeEventListener("progress",R),t.removeEventListener("canplay",R),t.removeEventListener("loadeddata",R)}t.addEventListener("progress",R),t.addEventListener("canplay",R),t.addEventListener("loadeddata",R),R()})}function ie(p){const b=t.currentTime;for(let I=0;I<t.buffered.length;I+=1){const F=t.buffered.start(I),R=t.buffered.end(I);if(!(b<F||b>R))return R-b>=p}return!1}function Z(p){m=new Set(p.filter(Boolean).filter(b=>b!==t.currentSrc)),w||D()}function X(){w=!0,se(),Q()}function ce(){if(!w){D();return}w=!1,D()}function D(){for(const[p,b]of u.entries())m.has(p)||(b.removeAttribute("src"),b.load(),u.delete(p));for(const[p,b]of h.entries())m.has(p)||(b.abort(),h.delete(p));for(const p of m){if(!u.has(p)){const b=document.createElement("video");b.preload="auto",b.muted=!0,b.playsInline=!0,b.src=p,b.load(),u.set(p,b)}r.has(p)||h.has(p)||_e(p)}}function se(){for(const p of u.values())p.removeAttribute("src"),p.load();u.clear()}function Q(){for(const p of h.values())p.abort();h.clear()}function _e(p){const b=new AbortController;h.set(p,b);const I=`${p}?_=${Date.now()}`;fetch(I,{signal:b.signal}).then(async F=>{if(!F.ok)return;const R=await F.blob();m.has(p)&&r.set(p,URL.createObjectURL(R))}).catch(F=>{F instanceof DOMException&&F.name}).finally(()=>{h.get(p)===b&&h.delete(p)})}function oe(){m.clear(),w=!1,se(),Q();for(const p of r.values())URL.revokeObjectURL(p);r.clear()}function q(p){return r.get(p)??null}function B(){!c||t.readyState<2||t.videoWidth===0||t.videoHeight===0||(S.width=t.videoWidth,S.height=t.videoHeight,c.drawImage(t,0,0,S.width,S.height),y=S.toDataURL("image/jpeg",.85))}function j(){return y||B(),y}function $(p){l=p}function z(p){n=p}return{setSource:L,setMuted:N,play:P,pause:A,hideMedia:U,showMedia:O,seekToFraction:T,resetPlayback:M,waitForLoadedData:J,waitForBufferedAhead:ae,onTimeUpdate:$,onEnded:z,getDurationSeconds:()=>Number.isFinite(t.duration)?t.duration:0,getPlaybackFraction:()=>!Number.isFinite(t.duration)||t.duration<=0?0:t.currentTime/t.duration,isPaused:()=>t.paused,setPlaybackRate:p=>{f=p,t.playbackRate=p},getPlaybackRate:()=>f,onPlayStateChange:p=>{d=p},getElement:()=>i,prewarmSources:Z,suspendPrewarming:X,resumePrewarming:ce,clearPrewarmedSources:oe,getPrewarmedBlobUrl:q,captureFrame:j}}const Dt=[.25,.5,1,2];function jt(s,a={}){const{onChange:i,onTogglePlay:t,onSpeedChange:l,onScrubStart:n,onScrubEnd:d,initialSpeed:m=1}=a,w=document.createElement("div");w.className="timeline";const u=document.createElement("div");u.className="timeline__bar-row";const r=document.createElement("button");r.className="timeline__play-btn",r.type="button",r.setAttribute("aria-label","Toggle playback"),r.addEventListener("click",()=>t==null?void 0:t());const h=document.createElement("input");h.className="timeline__slider",h.type="range",h.min="0",h.max="1000",h.step="1",h.value="0",h.style.setProperty("--fill","0%"),h.setAttribute("aria-label","Simulation time");const v=document.createElement("div");v.className="timeline__speed";const y=document.createElement("button");y.className="timeline__speed-btn",y.type="button",y.setAttribute("aria-label","Playback speed"),y.addEventListener("click",()=>{v.classList.toggle("open")});const S=document.createElement("div");S.className="timeline__speed-menu";for(const f of Dt){const E=document.createElement("button");E.className="timeline__speed-option",E.type="button",E.textContent=We(f),E.addEventListener("click",()=>{v.classList.remove("open"),l==null||l(f)}),S.appendChild(E)}return v.appendChild(y),v.appendChild(S),u.appendChild(r),u.appendChild(h),u.appendChild(v),h.addEventListener("input",()=>{const f=parseInt(h.value,10)/1e3;h.style.setProperty("--fill",`${f*100}%`),i==null||i(f)}),h.addEventListener("pointerdown",()=>n==null?void 0:n()),h.addEventListener("pointerup",()=>d==null?void 0:d()),h.addEventListener("change",()=>d==null?void 0:d()),document.addEventListener("click",f=>{v.contains(f.target)||v.classList.remove("open")}),w.appendChild(u),s.appendChild(w),c(m),{setPosition(f){const E=Math.max(0,Math.min(1,f));h.value=String(Math.round(E*1e3)),h.style.setProperty("--fill",`${E*100}%`)},setPlaying(f){r.textContent=f?"⏸":"▶",r.classList.toggle("is-paused",!f),r.setAttribute("aria-label",f?"Pause":"Play")},setSpeed(f){c(f)}};function c(f){y.textContent=We(f);for(const E of S.children)E.classList.toggle("is-active",E.textContent===We(f))}}function We(s){return`x${s}`}function $t(s){const a=document.createElement("aside");a.className="data-panel";const i=document.createElement("div");return i.className="data-panel__metrics",a.appendChild(i),s.appendChild(a),{update(t,l,n={}){i.innerHTML="";const d=Wt(t,l,n);for(const m of t.metadata.liveStats){const w=zt(m,d),u=document.createElement("div");u.className="data-panel__metric",u.innerHTML=`
          <span class="data-panel__metric-label">${w.label}</span>
          <span class="data-panel__metric-value">${w.value}</span>
        `,i.appendChild(u)}}}}function Wt(s,a,i){const t=Object.fromEntries(s.parameters.map(n=>[n.id,{label:n.label,value:Te(a[n.id]??n.fallbackValue,n.step,{scale:n.valueScale,format:n.displayFormat,significantFigures:n.displaySignificantFigures})}])),l={scale:{label:"Scale",value:s.label},parameters:{label:"Parameters",value:String(s.parameters.length)}};return{...t,...l,...Object.fromEntries(Object.entries(i).map(([n,d])=>[n,{label:qt(n),value:d}]))}}function qt(s){return s.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2")}function zt(s,a){const i=a[s.id]??{label:s.id,value:"--"},t=s.liveKey??s.id,l=a[t],n=Gt((l==null?void 0:l.value)??i.value??"--",s,!!l);return{label:s.label??(l==null?void 0:l.label)??i.label,value:ke(n,s.unit)}}function Gt(s,a,i){if(s==="--")return s;const t=Number(s);if(!Number.isFinite(t))return s;const l=a.valueScale??1,n=t*l;return i?a.integer?at(Math.round(n)):at(n):a.integer?Math.max(0,Math.round(n)).toLocaleString(void 0):At(s,{integer:a.integer})}function Yt(){const s=le("assets/2-McAlpine.webp"),a=document.createElement("div"),i=document.createElement("button");i.className="view-switcher__info entry-overlay__info-button",i.type="button",i.setAttribute("aria-label","About this experience"),i.appendChild(Jt()),a.className="sci-modal is-hidden",a.innerHTML=`
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
  `;const t=a.querySelector(".entry-info-modal__close");function l(){a.classList.remove("is-hidden")}function n(){a.classList.add("is-hidden")}return i.addEventListener("click",l),t.addEventListener("click",n),a.addEventListener("click",d=>{d.target===a&&n()}),{infoButton:i,infoModal:a,open:l,close:n}}function Kt(s){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=s,a}function Jt(){return Kt(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const Zt={planetary:"Smash a planet into the early Earth.  Can you make the Moon?",cosmos:"Take control of the fundamental laws of the Universe",galaxy:"Explore the boundless diversity of galaxies in the Universe"};function Xt(s,a,i){const t=le("assets/banner-1600.webp"),l=[`${le("assets/banner-960.webp")} 960w`,`${le("assets/banner-1600.webp")} 1600w`].join(", "),n=document.createElement("section");n.className="overlay overlay--entry",n.hidden=!0,n.classList.add("is-hidden");const d=document.createElement("div");d.className="entry-overlay",d.innerHTML=`
    <div class="entry-overlay__banner-frame" aria-hidden="true">
      <img class="entry-overlay__banner" src="${t}" srcset="${l}" sizes="(max-width: 640px) 100vw, 38rem" width="1600" height="381" alt="" loading="eager" fetchpriority="high" decoding="async" />
    </div>
    <p class="entry-overlay__eyebrow">Universe Engine</p>
    <h1 class="entry-overlay__title">Choose a cosmic scale</h1>
  `;const m=document.createElement("div");m.className="entry-overlay__actions";function w(v){m.innerHTML="";for(const y of v){const S=document.createElement("button");S.className="entry-overlay__button",S.type="button";const c=Zt[y.id]??"Explore this simulation scale.";S.innerHTML=`
        <span class="entry-overlay__button-label">${y.label}</span>
        <span class="entry-overlay__button-description">${c}</span>
      `,S.addEventListener("click",()=>i(y)),m.appendChild(S)}}w(a);const{infoButton:u,infoModal:r,close:h}=Yt();return d.appendChild(m),n.appendChild(d),n.appendChild(u),n.appendChild(r),s.appendChild(n),{show(){n.hidden=!1,n.classList.remove("is-hidden")},hide(){h(),n.hidden=!0,n.classList.add("is-hidden")},setSimulationClasses(v){w(v)}}}function Qt(s,a){const i=document.createElement("div");return i.className="view-switcher is-hidden",s.appendChild(i),{update(t,l){if(i.innerHTML="",t.length<=1){i.classList.add("is-hidden");return}i.classList.remove("is-hidden");for(const n of t){const d=document.createElement("div");d.className="view-switcher__row";const m=document.createElement("button");m.className="view-switcher__button",m.type="button",m.dataset.viewId=n.id,m.classList.toggle("is-active",n.id===l),m.setAttribute("aria-pressed",String(n.id===l)),m.setAttribute("aria-label",n.label??n.id);const w=en(n.icon);if(w){const r=document.createElement("span");r.className="view-switcher__icon",r.setAttribute("aria-hidden","true"),r.appendChild(w),m.appendChild(r)}const u=document.createElement("span");if(u.className="view-switcher__label",u.textContent=n.label??n.id,m.appendChild(u),m.addEventListener("click",()=>a.onSelect(n.id)),d.appendChild(m),n.description){const r=document.createElement("button");r.className="view-switcher__info",r.type="button",r.setAttribute("aria-label",`Info about ${n.label??n.id}`),r.appendChild(tn()),r.addEventListener("click",h=>{h.stopPropagation(),a.onInfo(n.id,n.label??n.id,n.description??"")}),d.appendChild(r)}i.appendChild(d)}},hide(){i.innerHTML="",i.classList.add("is-hidden")}}}function en(s){switch(s){case"dark-matter":return ye(`
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
      `);default:return null}}function ye(s){const a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.innerHTML=s,a}function tn(){return ye(`
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16.5v-6"></path>
    <circle cx="12" cy="8.5" r="1.1" fill="currentColor" stroke="none"></circle>
  `)}const nn=`# Credits source-of-truth.
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
`;function an(){const s=rt(nn);if(!Array.isArray(s))return[];const a=[];for(const i of s){if(!i||typeof i!="object")continue;const t=i.text;if(typeof t!="string"||t.trim().length===0)continue;const l={text:t},n=i.url;typeof n=="string"&&n.trim().length>0&&(l.url=n);const d=i.logo;typeof d=="string"&&d.trim().length>0&&(l.logo=d),i.header===!0&&(l.header=!0),a.push(l)}return a}function sn(s,a,i,t){const l=document.createElement("div");l.className="parameter-editor",s.appendChild(l);let n=a,d={...i};function m(r,h){n=r,d=h?{...h}:on(r),l.innerHTML="";const v=document.createElement("div");v.className="parameter-editor__heading",v.innerHTML=`
      <p class="parameter-editor__eyebrow">Parameter matrix</p>
      <h2 class="parameter-editor__title">${r.label} Controls</h2>
    `,l.appendChild(v);const y=document.createElement("div");y.className="param-info-modal is-hidden",y.innerHTML=`
      <div class="sci-modal__card">
        <button class="sci-modal__close" type="button" aria-label="Close">✕</button>
        <div class="sci-modal__title"></div>
        <div class="sci-modal__body"></div>
      </div>
    `,l.appendChild(y);const S=y.querySelector(".sci-modal__title"),c=y.querySelector(".sci-modal__body"),f=y.querySelector(".sci-modal__close");function E(P,A){S.textContent=P,c.textContent=A,y.classList.remove("is-hidden")}function L(){y.classList.add("is-hidden")}f.addEventListener("click",L),y.addEventListener("click",P=>{P.target===y&&L()});const N=document.createElement("div");N.className="parameter-editor__list";for(const P of r.parameters)N.appendChild(w(P,E));l.appendChild(N),u()}function w(r,h){const v=document.createElement("div");v.className="res-card param-card";const y=document.createElement("div");y.className="param-card__header";const S=document.createElement("span");S.className="res-card__label",S.textContent=r.label;const c=r.displayUnit??r.unit,f=document.createElement("span");f.className="param-card__range",f.textContent=`${ke(Te(r.min,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)} – ${ke(Te(r.max,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c)}`,y.appendChild(S),y.appendChild(f);const E=document.createElement("input");E.className="param-card__slider",E.type="range";const L=r.logScale?Math.log10(r.min):r.min,N=r.logScale?Math.log10(r.max):r.max,P=d[r.id]??r.fallbackValue;E.min=String(L),E.max=String(N),E.step=r.logScale?"0.001":String(r.step),E.value=String(r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P),E.setAttribute("aria-label",r.label);const A=document.createElement("span");A.className="res-card__value";function U(T){const M=r.logScale?10**T:T;d[r.id]=M,E.value=String(T),E.style.setProperty("--fill",`${it(T,L,N)}%`),A.textContent=ke(Te(M,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),u()}E.addEventListener("input",()=>{U(parseFloat(E.value))}),E.addEventListener("pointerdown",T=>T.stopPropagation()),E.addEventListener("click",T=>T.stopPropagation());const O=r.logScale?Math.log10(Math.max(P,Number.MIN_VALUE)):P;if(E.style.setProperty("--fill",`${it(O,L,N)}%`),A.textContent=ke(Te(P,r.step,{scale:r.valueScale,format:r.displayFormat,significantFigures:r.displaySignificantFigures}),c),r.description){v.classList.add("res-card--has-info"),v.setAttribute("title",r.description);const T=document.createElement("span");T.className="param-card__info-btn",T.setAttribute("aria-label","Parameter description"),T.textContent="ⓘ",y.appendChild(T),v.addEventListener("click",()=>{h(r.label,r.description)})}return v.appendChild(y),v.appendChild(E),v.appendChild(A),v}function u(){t({...d})}return m(a,i),{setSimClass(r,h){m(r,h)},setValues(r){m(n,r)},getValues(){return{...d}}}}function on(s){return Object.fromEntries(s.parameters.map(a=>[a.id,a.fallbackValue]))}function it(s,a,i){return i===a?0:(s-a)/(i-a)*100}function rn(s,a){const i=document.createElement("section");i.className="overlay overlay--config",i.hidden=!0,i.classList.add("is-hidden");const t=document.createElement("div");t.className="config-overlay";const l=document.createElement("div");l.className="config-overlay__shell";const n=document.createElement("div");n.className="config-overlay__media",n.dataset.simClass=a.simClass.id;const d=document.createElement("img");d.className="config-overlay__media-image",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`,n.innerHTML=`
    <div class="config-overlay__media-copy">
      <h1 class="config-overlay__headline">Universe 
 Engine</h1>
    </div>
  `,n.prepend(d);const m=document.createElement("div");m.className="config-overlay__controls",m.dataset.view=a.initialView??"parameters";const w=document.createElement("div");w.className="config-overlay__header";const u=document.createElement("div");u.className="config-overlay__title-block",u.innerHTML=`
    <p class="config-overlay__eyebrow"></p>
    <h2 class="config-overlay__title"></h2>
    <p class="config-overlay__subtitle"></p>
  `;const r=u.querySelector(".config-overlay__eyebrow"),h=u.querySelector(".config-overlay__title"),v=u.querySelector(".config-overlay__subtitle"),y=document.createElement("button");y.className="config-overlay__close",y.type="button",y.setAttribute("aria-label","Back"),y.textContent="←",w.appendChild(u),w.appendChild(y);const S=document.createElement("section");S.className="config-overlay__section config-overlay__section--grow",S.dataset.section="parameters";const c=document.createElement("div");S.appendChild(c);const f=document.createElement("section");f.className="config-overlay__section config-overlay__section--grow",f.dataset.section="settings",f.innerHTML=`
    <p class="config-overlay__eyebrow">Theme settings</p>
    <p class="config-overlay__settings-copy">Theme only for this pass. Choose the interface era here instead of keeping extra buttons inside the overlay.</p>
  `;const E=document.createElement("div");f.appendChild(E);const L=document.createElement("section");L.className="advanced-settings",L.dataset.state="closed",L.innerHTML=`
    <div class="advanced-settings__header">
      <p class="config-overlay__eyebrow">Advanced settings</p>
      <p class="config-overlay__settings-copy">Password-gated controls for scale locking, asset source selection, logging, and scale visibility.</p>
    </div>
  `;const N=document.createElement("button");N.className="advanced-settings__access",N.type="button",N.textContent="Advanced Settings",L.appendChild(N);const P=document.createElement("div");P.className="advanced-settings__auth";const A=document.createElement("input");A.className="advanced-settings__password",A.type="password",A.placeholder="Enter password",A.autocomplete="off";const U=document.createElement("button");U.className="advanced-settings__unlock",U.type="button",U.textContent="Unlock";const O=document.createElement("p");O.className="advanced-settings__message",P.appendChild(A),P.appendChild(U),P.appendChild(O),L.appendChild(P);const T=document.createElement("div");T.className="advanced-settings__form";const M=document.createElement("label");M.className="advanced-settings__field",M.innerHTML=`
    <span class="advanced-settings__label">Scale lock</span>
    <span class="advanced-settings__help">Lock the app to one scale and hide the Home action.</span>
  `;const J=document.createElement("select");J.className="advanced-settings__select",J.appendChild(new Option("None",""));for(const g of a.availableScales)J.appendChild(new Option(g.label,g.id));M.appendChild(J),T.appendChild(M);const ae=document.createElement("div");ae.className="advanced-settings__field",ae.innerHTML=`
    <span class="advanced-settings__label">Video source</span>
    <span class="advanced-settings__help">Local uses public/assets. Online uses the future Cloudflare-backed manifest.</span>
  `;const ie=document.createElement("div");ie.className="advanced-settings__options";const Z=document.createElement("label"),X=document.createElement("input");Z.className="advanced-settings__choice",X.type="radio",X.name="manifest-source",X.value="local",Z.appendChild(X),Z.append("Local manifest");const ce=document.createElement("label"),D=document.createElement("input");ce.className="advanced-settings__choice",D.type="radio",D.name="manifest-source",D.value="online",ce.appendChild(D),ce.append("Online manifest"),ie.appendChild(Z),ie.appendChild(ce),ae.appendChild(ie),T.appendChild(ae);const se=document.createElement("label");se.className="advanced-settings__field advanced-settings__field--inline";const Q=document.createElement("input"),_e=document.createElement("span");Q.type="checkbox",Q.className="advanced-settings__checkbox",_e.innerHTML=`
    <span class="advanced-settings__label">Verbose logging</span>
    <span class="advanced-settings__help">Adds parameter, manifest, and run-selection logs to the console.</span>
  `,se.appendChild(Q),se.appendChild(_e),T.appendChild(se);const oe=document.createElement("div");oe.className="advanced-settings__field",oe.innerHTML=`
    <span class="advanced-settings__label">Visible scales</span>
    <span class="advanced-settings__help">Hide scales from the landing screen without changing their data.</span>
  `;const q=document.createElement("div");q.className="advanced-settings__options";const B=new Map;for(const g of a.availableScales){const k=document.createElement("label"),x=document.createElement("input");k.className="advanced-settings__choice",x.type="checkbox",x.value=g.id,B.set(g.id,x),k.appendChild(x),k.append(`Show ${g.label}`),q.appendChild(k)}oe.appendChild(q),T.appendChild(oe),L.appendChild(T),f.appendChild(L);const j=document.createElement("section");j.className="config-overlay__section config-overlay__section--grow",j.dataset.section="credits",j.innerHTML=`
    <div class="credits-list" data-credits></div>
  `;const $=j.querySelector("[data-credits]"),z=an();if($.innerHTML="",z.length===0){const g=document.createElement("div");g.className="credits-list__entry",g.textContent="To be credited...",$.appendChild(g)}else for(const g of z)if(g.header){const k=document.createElement("div");k.className="credits-list__heading",k.textContent=g.text,$.appendChild(k)}else{const k=document.createElement("div");k.className="credits-list__entry";const x=document.createElement("span");if(x.className="credits-list__text",g.url){const V=document.createElement("a");V.className="credits-list__link",V.href=g.url,V.target="_blank",V.rel="noopener noreferrer",V.textContent=g.text,x.appendChild(V)}else x.textContent=g.text;k.appendChild(x),$.appendChild(k)}const p=document.createElement("div");p.className="config-overlay__footer";const b=document.createElement("button");b.className="run-button",b.type="button",b.textContent="Run",p.appendChild(b),m.appendChild(w),m.appendChild(S),m.appendChild(f),m.appendChild(j),m.appendChild(p),l.appendChild(n),l.appendChild(m),t.appendChild(l),i.appendChild(t),s.appendChild(i);let I=Ae(a.advancedSettings),F="closed";const R=sn(c,a.simClass,a.values,a.onValuesChange),me=Tt(E,a.theme,a.onThemeChange);y.addEventListener("click",a.onClose),N.addEventListener("click",()=>{if(F==="open"){ue("closed");return}ue("auth"),A.focus()}),U.addEventListener("click",Ie),A.addEventListener("keydown",g=>{g.key==="Enter"&&Ie()}),J.addEventListener("change",()=>{I.lockedScaleId=J.value||null,re()}),X.addEventListener("change",()=>{X.checked&&(I.manifestSource="local")}),D.addEventListener("change",()=>{D.checked&&(I.manifestSource="online")}),Q.addEventListener("change",()=>{I.verboseLogging=Q.checked});for(const[g,k]of B.entries())k.addEventListener("change",()=>{if(Array.from(B.entries()).filter(([,V])=>V.checked).map(([V])=>V).length===0&&!I.lockedScaleId){k.checked=!0;return}I.hiddenScaleIds=Array.from(B.keys()).filter(V=>{var H;return!((H=B.get(V))!=null&&H.checked)&&V!==I.lockedScaleId}),re()}),g===I.lockedScaleId&&(k.disabled=!0);de(a.initialView??"parameters"),re();function de(g){m.dataset.view=g,g==="parameters"?(r.textContent=a.simClass.label,h.textContent="Shape Your Simulation",v.textContent=a.simClass.parameterSubtitle??"Adjust the parameters, inspect the setup, and press 'Run' when you're ready.",d.src=a.simClass.placeholderImage,d.alt=`${a.simClass.label} preview`):g==="settings"?(r.textContent="Interface",h.textContent="Adjust The Control Room",v.textContent="Change the interface theme and manage exhibit-level options for this installation.",d.src=le("assets/Cluster_Stuart.webp"),d.alt="Galaxy cluster simulation preview"):(r.textContent="References",h.textContent="Project Sources And Attribution",v.textContent="Review the datasets, imagery, and supporting materials behind this experience.",d.src=le("assets/synthetic_hst_pretty_galaxy.webp"),d.alt="Synthetic galaxy image preview"),g==="settings"?b.textContent="Apply":g==="credits"?b.textContent="Close":b.textContent="Run Simulation"}function re(){J.value=I.lockedScaleId??"",X.checked=I.manifestSource==="local",D.checked=I.manifestSource==="online",Q.checked=I.verboseLogging;for(const[g,k]of B.entries()){const x=I.lockedScaleId===g;k.checked=x||!I.hiddenScaleIds.includes(g),k.disabled=x}}function Ie(){if(A.value!==kt){O.textContent="Incorrect password";return}A.value="",O.textContent="",ue("open")}function ue(g){F=g,L.dataset.state=g,N.textContent=g==="open"?"Hide Advanced Settings":"Advanced Settings",g!=="auth"&&(O.textContent="")}function pe(){A.value="",O.textContent="",ue("closed")}function xe(){I=Ae(a.advancedSettings),re()}return b.addEventListener("click",()=>{const g=m.dataset.view;if(g==="settings"){a.onApplySettings(Ae(I));return}if(g==="credits"){a.onClose();return}a.onRun()}),{show(){i.hidden=!1,i.classList.remove("is-hidden")},hide(){i.hidden=!0,i.classList.add("is-hidden"),xe(),pe()},setSimulation(g,k){a.simClass=g,n.dataset.simClass=g.id,R.setSimClass(g,k),m.dataset.view==="parameters"&&(d.src=g.placeholderImage,d.alt=`${g.label} preview`,de("parameters"))},setTheme(g){me.setActive(g)},setView(g){de(g),g!=="settings"&&pe()},setAdvancedSettings(g){a.advancedSettings=Ae(g),I=Ae(g),re(),pe()}}}function Ae(s){return{lockedScaleId:s.lockedScaleId,manifestSource:s.manifestSource,verboseLogging:s.verboseLogging,hiddenScaleIds:[...s.hiddenScaleIds]}}function ln(s){const{TYPING_MS_PER_CHAR:a,MIN_TERMINAL_TIME_MS:i,FINAL_PAUSE_MS:t}=Ye,l=document.createElement("section");l.className="overlay overlay--initializing",l.hidden=!0,l.classList.add("is-hidden");const n=document.createElement("div");n.className="terminal";const d=document.createElement("div");d.className="terminal__header",d.innerHTML=`
    <div class="terminal__header-left">
      <span class="terminal__dot"></span>
      <span class="terminal__header-label">UNIVERSE_ENGINE_v9.5.1</span>
    </div>
  `;const m=document.createElement("div");m.className="terminal__log",n.appendChild(d),n.appendChild(m),l.appendChild(n),s.appendChild(l);let w=[],u=0;function r(){for(const S of w)window.clearTimeout(S);w=[]}function h(S,c){return new Promise(f=>{const E=window.setTimeout(()=>{c===u&&f()},Math.max(0,S));w.push(E)})}async function v(S,c){const f=document.createElement("div");f.className="terminal__line";const E=y();f.appendChild(E),m.appendChild(f);for(let L=0;L<S.length;L+=1){if(c!==u)return;const N=S[L];f.insertBefore(document.createTextNode(N),E),m.scrollTop=m.scrollHeight,await h(a,c)}E.remove()}function y(){const S=document.createElement("span");return S.className="terminal__cursor",S.textContent="█",S}return{async show(S,c,f,E){r(),u+=1;const L=u;l.hidden=!1,l.classList.remove("is-hidden");const N=performance.now(),P=(E==null?void 0:E.minTerminalTimeMs)??i;let A=!f,U=[...S];f&&f.then(()=>{A=!0});let O=0;for(;L===u;){U.length===0&&(U=[...S]);const M=Math.floor(Math.random()*U.length),[J]=U.splice(M,1),ae=`${st(O)} ${J.text}`;if(O+=1,await v(ae,L),L!==u)return;if(performance.now()-N>=P&&A)break}if(L!==u)return;const T=document.createElement("div");T.className="terminal__line terminal__line--syncing",T.textContent=`${st(O)} STARTING SIMULATION...`,m.appendChild(T),m.scrollTop=m.scrollHeight,await h(t,L),L===u&&c()},hide(){r(),u+=1,l.hidden=!0,l.classList.add("is-hidden"),m.innerHTML=""}}}function st(s){const a=Math.max(0,Math.floor(s)),i=Math.floor(a/3600),t=Math.floor(a%3600/60),l=a%60;return`[${qe(i)}:${qe(t)}:${qe(l)}]`}function qe(s){return String(s).padStart(2,"0")}function cn(s,a){const i=document.createElement("button");i.className="display-button",i.type="button",i.innerHTML="<span></span><span></span><span></span>",i.setAttribute("aria-label","Open configuration overlay"),s.appendChild(i);const t=document.createElement("div");t.className="display-menu";const l=document.createElement("div");l.className="display-menu__header",l.textContent="Menu",t.appendChild(l);const n=w("Home",()=>{u(),a.onHome()});t.appendChild(n),t.appendChild(w("Settings",()=>{u(),a.onViewSelected("settings")})),t.appendChild(w("Credits",()=>{u(),a.onViewSelected("credits")}));const d=w("Fullscreen",()=>{var h;u(),document.fullscreenElement?document.exitFullscreen():(h=document.getElementById("app"))==null||h.requestFullscreen()});t.appendChild(d),s.appendChild(t);function m(){const h=d.querySelector(".display-menu__item-label");h&&(h.textContent=document.fullscreenElement?"Exit Fullscreen":"Fullscreen");const v=document.getElementById("app");v&&v.classList.toggle("is-fullscreen",!!document.fullscreenElement)}return document.addEventListener("fullscreenchange",m),i.addEventListener("click",()=>{s.classList.toggle("open")}),document.addEventListener("click",h=>{s.contains(h.target)||u()}),r(a.showHome??!0),{close:u,setHomeVisible:r};function w(h,v){const y=document.createElement("button");return y.className="display-menu__item",y.type="button",y.innerHTML=`
      <span class="display-menu__item-mark"></span>
      <span class="display-menu__item-label">${h}</span>
    `,y.addEventListener("click",v),y}function u(){s.classList.remove("open")}function r(h){n.hidden=!h,n.classList.toggle("is-hidden",!h)}}const dn=`# Initialization terminal script for the Planetary simulation family.
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
`,un=`# Initialization terminal script for the Galaxy simulation family.
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
`,mn=`# Initialization terminal script for the Cosmos simulation family.
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
`,pn={planetary:dn,galaxy:un,cosmos:mn};function hn(s){return rt(pn[s.id]).map(i=>({text:i}))}const Me={mode:"time",frames:[]};async function fn(s){const a=await fetch(s);if(!a.ok)throw new Error(`Failed to load live stats CSV: ${s}`);const i=await a.text();return yn(i)}function gn(s,a,i=0){if(s.mode==="row")return _n(s.frames,a,i);const t=s.frames;if(t.length===0)return{};if(a<=t[0].t)return{...t[0].values};const l=t[t.length-1];if(a>=l.t)return{...l.values};const n=vn(t,a),d=t[Math.max(0,n-1)],m=t[Math.min(t.length-1,n)],w=(a-d.t)/Math.max(m.t-d.t,1e-9);return bn(d.values,m.values,w)}function vn(s,a){let i=1,t=s.length-1;for(;i<t;){const l=Math.floor((i+t)/2);s[l].t<=a?i=l+1:t=l}return i}function yn(s){const a=s.split(/\r?\n/).map(t=>t.trim()).filter(Boolean);if(a.length<2)return Me;const i=ze(a[0]);return i[0]==="t"?{mode:"time",frames:a.slice(1).map(t=>{const l=ze(t),n={};for(let d=1;d<i.length;d+=1)n[i[d]]=l[d]??"";return{t:parseFloat(l[0]??"0")||0,values:n}})}:{mode:"row",frames:a.slice(1).map((t,l)=>{const n=ze(t),d={};for(let m=0;m<i.length;m+=1)d[i[m]]=n[m]??"";return{t:l,values:d}})}}function _n(s,a,i){if(s.length===0)return{};if(!Number.isFinite(i)||i<=0)return{...s[0].values};const t=Math.max(0,Math.min(1,a/i)),l=Math.round(t*(s.length-1));return{...s[l].values}}function ze(s){const a=[];let i="",t=!1;for(let l=0;l<s.length;l+=1){const n=s[l];if(n==='"'){t=!t;continue}if(n===","&&!t){a.push(i),i="";continue}i+=n}return a.push(i),a}function bn(s,a,i){const t=new Set([...Object.keys(s),...Object.keys(a)]),l={};for(const n of t){const d=s[n]??"",m=a[n]??d,w=parseFloat(d),u=parseFloat(m);if(Number.isFinite(w)&&Number.isFinite(u)){const r=w+(u-w)*i;l[n]=En(r);continue}l[n]=i<.5?d:m}return l}function En(s){return s.toFixed(2).replace(new RegExp("\\.0+$|(?<=\\..*?)0+$","g"),"").replace(/\.$/,"")}function wn(s){Sn(Pt,s)}function Sn(s,a){if(navigator.sendBeacon){const i=new Blob([JSON.stringify(a)],{type:"application/json"});if(navigator.sendBeacon(s,i)){K("Run selection tracking dispatched",{simulationId:a.simulationId});return}}fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a),keepalive:!0}).then(i=>{i.ok?K("Run selection tracked",{simulationId:a.simulationId}):Se("Run selection tracking rejected",{simulationId:a.simulationId,status:i.status})}).catch(i=>{Se("Run selection tracking failed",{simulationId:a.simulationId,error:i instanceof Error?i.message:String(i)})})}const ot=50*1024*1024,In=8,Cn=6e3,Ln=8e3,An=5e3,Tn=1200,kn=100,Ge={galaxy:"tron",planetary:"matrix",cosmos:"hal"};function Pn(s){const a=we.map(e=>e.id);let i=Nt(a),t=et(i);const l=Mt(i.manifestSource);i.manifestSource==="online"&&l.preloadActiveManifest();let n=tt(i.lockedScaleId)??t[0]??we[0],d=i.lockedScaleId?Ge[n.id]:xt(),m=!1,w=null,u=null,r=0,h=Me,v=!1;const y=Object.fromEntries(we.map(e=>[e.id,yt(e)]));$e(d);const S=Rt(n.id),c=Bt(s,S),f=document.createElement("div");f.className="display-chrome",f.classList.add("is-hidden"),s.appendChild(f);const E=document.createElement("div");E.className="orientation-overlay",E.innerHTML=`
    <div class="orientation-overlay__card" role="status" aria-live="polite">
      <div class="orientation-overlay__icon" aria-hidden="true"></div>
      <p class="orientation-overlay__title">Please rotate to landscape</p>
      <p class="orientation-overlay__copy">Portrait mode is not supported.</p>
    </div>
  `,s.appendChild(E);const L=document.createElement("div");L.className="swift-logo",L.innerHTML=`
    <img
      class="swift-logo__image"
      src="${le("assets/credits/swift-logo.webp")}"
      alt="SWIFT"
      width="478"
      height="169"
      decoding="async"
    />
  `,s.appendChild(L);const N=document.createElement("div");N.className="synth-logo is-hidden",N.innerHTML=`
    <img
      class="synth-logo__image"
      src="${le("assets/credits/synthesizer_banner.webp")}"
      alt="Synthesizer"
      decoding="async"
    />
  `,s.appendChild(N);const P=document.createElement("img");P.className="app-partner-logo",P.src=le("assets/dirac-hpc-white.webp"),P.alt="DIRAC HPC",P.decoding="async",s.appendChild(P);const A=document.createElement("div");A.className="display-chrome__top-left is-hidden",s.appendChild(A);const U=cn(A,{onHome(){He()},onViewSelected(e){if(e==="credits"){Ne("credits");return}Ne(e)},showHome:!i.lockedScaleId}),O=document.createElement("div");O.className="display-chrome__left-center",f.appendChild(O);const T=Qt(O,{onSelect(e){Qe(e)},onInfo(e,o,_){J.textContent=o,ae.textContent=_,M.classList.add("is-visible")}}),M=document.createElement("div");M.className="view-info-overlay",M.innerHTML=`
    <div class="view-info-overlay__card">
      <button class="view-info-overlay__close" type="button" aria-label="Close">&times;</button>
      <h3 class="view-info-overlay__title"></h3>
      <p class="view-info-overlay__text"></p>
    </div>
  `,s.appendChild(M);const J=M.querySelector(".view-info-overlay__title"),ae=M.querySelector(".view-info-overlay__text"),ie=M.querySelector(".view-info-overlay__close");M.addEventListener("click",e=>{e.target===M&&M.classList.remove("is-visible")}),ie.addEventListener("click",()=>{M.classList.remove("is-visible")});const Z=document.createElement("div");Z.className="display-chrome__top-center is-hidden",f.appendChild(Z);const X=document.createElement("div");X.className="display-chrome__top-right",f.appendChild(X);const ce=$t(X),D=document.createElement("div");D.className="display-chrome__center-status",D.innerHTML=`
    <div class="display-chrome__center-status-inner">
      <p class="display-chrome__center-kicker">Simulation Active</p>
      <h2 class="display-chrome__center-title">DISPLAY_STATE</h2>
      <div class="display-chrome__center-dots"><span></span><span></span><span></span></div>
    </div>
  `,f.appendChild(D);const se="universe-engine-playback-speed",Q=()=>{const e=localStorage.getItem(se),o=e?Number(e):NaN;return[.25,.5,1,2].includes(o)?o:1},_e=e=>{localStorage.setItem(se,String(e))},oe=Q();c.setPlaybackRate(oe);const q=document.createElement("div");q.className="display-chrome__bottom",f.appendChild(q);const B=jt(q,{onChange(e){me(e)},onTogglePlay:Xe,onSpeedChange:mt,onScrubStart(){xe(),R()},onScrubEnd(){g(),c.isPaused()||F()},initialSpeed:oe});B.setPlaying(!c.isPaused());let j=null,$=null,z=null,p=!1,b=null,I=0;function F(){if(j!==null)return;function e(){const o=c.getPlaybackFraction();B.setPosition(o),c.isPaused()?j=null:j=requestAnimationFrame(e)}j=requestAnimationFrame(e)}function R(){j!==null&&(cancelAnimationFrame(j),j=null)}function me(e){$=e,z===null&&(z=requestAnimationFrame(()=>{if(z=null,$===null)return;const o=$;$=null,c.seekToFraction(o)}))}function de(){if($===null)return;z!==null&&(cancelAnimationFrame(z),z=null);const e=$;$=null,c.seekToFraction(e)}function re(){b!==null&&(window.clearTimeout(b),b=null)}function Ie(){if(!(u!=null&&u.views))return[];const e=Ee(n,u);return Object.entries(u.views).filter(([o])=>o!==e).map(([,o])=>o).filter(Boolean)}function ue(){re(),c.suspendPrewarming()}function pe(e=Tn){re(),!(p||c.isPaused())&&(b=window.setTimeout(()=>{b=null,!(p||c.isPaused())&&(c.resumePrewarming(),c.prewarmSources(Ie()))},Math.max(0,e)))}function xe(){p=!0,I=0,ue()}function g(){p=!1,I=0,de(),r=c.getPlaybackFraction()*c.getDurationSeconds(),ve(r),pe()}c.onPlayStateChange(e=>{B.setPlaying(!e),e?(R(),ue()):(F(),pe(0))}),c.onTimeUpdate(e=>{if(r=e*c.getDurationSeconds(),p){const o=performance.now();if(o-I<kn)return;I=o}ve(r)});const k=document.createElement("div");k.className="overlay-layer",s.appendChild(k);const x=Ot(k,{onReplay:ut,onParameters:()=>Ne("parameters"),onHome:He,showHome:!i.lockedScaleId});c.onEnded(()=>{m=!0;const e=c.captureFrame();x.update(n,te(),c.getDurationSeconds(),w,e),x.show()});const V=Xt(k,t,e=>{Ze(e),Ne("parameters")}),H=rn(k,{simClass:n,values:te(),theme:d,advancedSettings:i,availableScales:we,onValuesChange:lt,onThemeChange:Ve,onRun:()=>{K("Parameters submitted — starting run",{simClassId:n.id}),pt().catch(e=>{Se("Run failed to start",{simClassId:n.id,error:e instanceof Error?e.message:String(e)})})},onApplySettings:ct,onClose:dt,initialView:"parameters"}),Re=ln(k);B.setPosition(0),ve(),x.hide();const he=new WeakMap,ee=e=>{const o=he.get(e);o&&(clearTimeout(o),he.delete(e)),e.classList.remove("side-collapsed")},fe=e=>{const o=he.get(e);o&&clearTimeout(o),he.set(e,setTimeout(()=>{e.classList.add("side-collapsed"),he.delete(e)},2500))},Oe=e=>{const o=he.get(e);o&&(clearTimeout(o),he.delete(e)),e.classList.add("side-collapsed")},Fe=(e,o)=>{const _=o.isCollapsible??(()=>!0);e.addEventListener("mouseenter",()=>ee(e)),e.addEventListener("mouseleave",()=>{if(!_()){ee(e);return}fe(e)}),e.addEventListener("focusin",()=>ee(e)),e.addEventListener("focusout",C=>{if(!e.contains(C.relatedTarget)){if(!_()){ee(e);return}fe(e)}}),e.addEventListener("click",()=>{if(!_()){ee(e);return}if(e.classList.contains("side-collapsed")){ee(e),fe(e);return}o.toggleOnClick?Oe(e):fe(e)}),_()?Oe(e):ee(e)};Fe(A,{toggleOnClick:!0,isCollapsible:()=>s.dataset.mode!=="entry"}),Fe(O,{toggleOnClick:!0}),Fe(q,{toggleOnClick:!1});let Ce=0,be=null,Pe=0;const Ke=()=>{be!==null&&(cancelAnimationFrame(be),be=null)},Je=()=>{if(be!==null)return;Pe=c.getPlaybackFraction();const e=()=>{if(Ce===0){Ke();return}const _=12*(1/60)/Math.max(c.getDurationSeconds(),1);Pe=Math.max(0,Math.min(1,Pe+Ce*_)),c.seekToFraction(Pe),be=requestAnimationFrame(e)};be=requestAnimationFrame(e)};document.addEventListener("keydown",e=>{if(s.dataset.mode==="display"&&!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement))switch(e.key){case"Escape":e.preventDefault(),M.classList.contains("is-visible")?M.classList.remove("is-visible"):He();break;case" ":e.preventDefault(),Xe();break;case"ArrowLeft":e.preventDefault(),ee(q),fe(q),Ce=-1,Je();break;case"ArrowRight":e.preventDefault(),ee(q),fe(q),Ce=1,Je();break;case"ArrowUp":case"ArrowDown":{if(e.preventDefault(),ee(O),fe(O),!(u!=null&&u.views)||Object.keys(u.views).length<=1)break;const o=n.views.filter(G=>{var Y;return((Y=u==null?void 0:u.views)==null?void 0:Y[G.id])!==void 0});if(o.length<=1)break;const _=u.viewId??Ee(n,u),C=o.findIndex(G=>G.id===_),ne=e.key==="ArrowUp"?(C-1+o.length)%o.length:(C+1)%o.length;Qe(o[ne].id);break}}}),document.addEventListener("keyup",e=>{(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(Ce=0,Ke())}),c.hideMedia(),c.pause(),ge(i.lockedScaleId?"config":"entry");function Ze(e){e.id===n.id&&v||(n=e,De(),Ve(Ge[e.id]),H.setSimulation(n,te()),B.setPosition(0),ve(),Be(),Ue())}function lt(e){y[n.id]={...e},K("Parameter values updated",{simClassId:n.id,values:y[n.id]}),ve()}function Ve(e){d=e,$e(e),H.setTheme(e)}function Ne(e){e==="parameters"&&H.setSimulation(n,te()),H.setView(e),ge("config")}function ct(e){if(Lt(e),v){x.hide(),ge("display");return}H.setSimulation(n,te()),H.setView("parameters")}function dt(){if(x.hide(),!v&&i.lockedScaleId){H.setSimulation(n,te()),H.setView("parameters");return}ge(v?"display":"entry")}function He(){i.lockedScaleId||(K("Returning to home screen",{simClassId:n.id}),De(),v=!1,c.hideMedia(),ge("entry"))}function ut(){m=!1,x.hide(),c.resetPlayback(),c.play().catch(()=>{c.setMuted(!0),c.play()})}function Xe(){c.isPaused()?c.play().catch(()=>{c.setMuted(!0),c.play()}):c.pause()}function mt(e){c.setPlaybackRate(e),_e(e),B.setSpeed(e)}async function pt(){const e=te();K("Run requested",{simClassId:n.id,values:e,manifestSource:l.getSource()});const o=await l.findNearestVideo(n.id,n.parameters,e);De(),u=o;const _=Ee(n,o);wn({simulationId:n.id,parameters:e,manifestSource:l.getSource(),matchedRunId:o.runId});const C=St(o,_)??o.url,ne=Object.entries(o.views??{}).filter(([W])=>W!==_).map(([,W])=>W);bt(o.liveDataUrl),Et(o.summaryUrl),c.setMuted(!1),Be(_),ge("initializing");const G=ht(C);c.resumePrewarming(),c.prewarmSources(ne);const Y=(async()=>{const W=await G;K(`Prepared active video source: ${W.ownedObjectUrl?"FULL-FETCH":"PROGRESSIVE"}`,{selectedViewUrl:C,waitsForBuffer:W.shouldWaitForBuffer}),c.setSource(W.src,{ownedObjectUrl:W.ownedObjectUrl}),c.pause(),await c.waitForLoadedData(Ln),W.shouldWaitForBuffer&&await c.waitForBufferedAhead(In,Cn)})();await new Promise(W=>{Re.show(hn(n),W,Y,{minTerminalTimeMs:It()})}),v=!0,c.showMedia(),c.play().catch(()=>{c.setMuted(!0),c.play().catch(()=>{})}),ge("display")}async function ht(e){const o=await ft(e);if(o!==null&&o>0&&o<=ot){K("Downloading active video behind loading overlay",{videoUrl:e,contentLength:o});try{const _=await fetch(e);if(!_.ok)throw new Error(`Failed to download active video: ${e}`);const C=await _.blob();return K(`Active video full fetch complete: ${C.size} bytes`,{videoUrl:e,blobType:C.type}),{src:URL.createObjectURL(C),ownedObjectUrl:!0,shouldWaitForBuffer:!1}}catch(_){Se(`Full-fetch FAILED; falling back to progressive: ${_ instanceof Error?_.message:String(_)}`,{videoUrl:e})}}return o!==null?K("Active video exceeds full-fetch threshold; using progressive load",{videoUrl:e,contentLength:o,fullFetchMaxBytes:ot}):K("Could not determine active video size; using progressive load",{videoUrl:e}),K("Using progressive active video load",{videoUrl:e}),{src:e,ownedObjectUrl:!1,shouldWaitForBuffer:!0}}async function ft(e){try{const o=await fetch(e,{headers:{Range:"bytes=0-0"}});K("Probed active video size with range request",{videoUrl:e,ok:o.ok,status:o.status,contentLength:o.headers.get("Content-Length"),contentRange:o.headers.get("Content-Range")});const _=vt(o.headers.get("Content-Length"));if(_!==null)return _;const C=gt(o.headers.get("Content-Range"));return C!==null?C:null}catch(o){return Se("Could not probe active video size",{videoUrl:e,error:o instanceof Error?o.message:String(o)}),null}}function gt(e){if(!e)return null;const o=e.match(/bytes\s+\d+-\d+\/(\d+)/i);if(!o)return null;const _=Number(o[1]);return Number.isFinite(_)&&_>0?_:null}function vt(e){if(!e)return null;const o=Number(e);return Number.isFinite(o)?o:null}function ge(e){if(s.dataset.mode=e,e==="entry"?document.documentElement.setAttribute("data-theme","glass"):e==="display"&&$e(d),Le(f,e==="display"||e==="config"),Le(L,e==="display"||e==="entry"),Le(A,!i.lockedScaleId&&(e==="entry"||e==="config"||e==="display")),e==="entry"?ee(A):Oe(A),e==="entry"&&!i.lockedScaleId?V.show():V.hide(),e==="config"?(Re.hide(),H.setSimulation(n,te()),H.show()):H.hide(),e!=="display")x.hide();else if(m){const _=c.captureFrame();x.update(n,te(),c.getDurationSeconds(),w,_),x.show()}!v||e==="initializing"?(c.hideMedia(),e==="initializing"&&c.pause()):c.showMedia(),e!=="initializing"&&Re.hide(),Ue()}function Ue(){if(s.dataset.mode==="entry"){Le(N,!0);return}const e=s.dataset.mode==="display",o=n.id==="galaxy",C=Ee(n,u)==="hst";Le(N,e&&o&&C)}function ve(e=0){const o=gn(h,e,c.getDurationSeconds()),_=wt(n,w,e,c.getDurationSeconds());ce.update(n,te(),{...o,..._})}function Be(e){const o=n.views.filter(ne=>{var G;return((G=u==null?void 0:u.views)==null?void 0:G[ne.id])!==void 0});if(o.length<=1){T.hide(),Z.classList.add("is-hidden");return}const _=e??Ee(n,u),C=o.find(ne=>ne.id===_);T.update(o,_),C?(Z.classList.remove("is-hidden"),Z.innerHTML=`<span class="viewport-title">${C.label??C.id}</span>`):Z.classList.add("is-hidden")}function De(){h=Me,m=!1,w=null,u=null,r=0,p=!1,$=null,re(),z!==null&&(cancelAnimationFrame(z),z=null),x.hide(),T.hide(),c.pause(),c.clearPrewarmedSources(),c.resetPlayback(),B.setPosition(0)}function Qe(e){if(!(u!=null&&u.views)||e===Ee(n,u))return;const o=u.views[e];if(!o)return;u.viewId=e;const _=!c.isPaused()&&!m,C=m?0:c.getPlaybackFraction();m=!1,x.hide(),c.setSource(o,{seekFraction:C,autoplay:_}),c.prewarmSources(Ie()),_&&!p?pe():ue(),Be(e),M.classList.remove("is-visible"),Ue()}function te(){return{...y[n.id]}}function yt(e){return Object.fromEntries(e.parameters.map(o=>[o.id,_t(o)]))}function _t(e){if(e.logScale){const G=Math.log10(e.min),Y=Math.log10(e.max);return 10**(G+Math.random()*(Y-G))}const o=Math.max(0,Math.round((e.max-e.min)/e.step)),_=Math.floor(Math.random()*(o+1)),C=e.min+_*e.step,ne=Ft(e.step);return Number(C.toFixed(ne))}async function bt(e){try{h=await fn(e)}catch(o){h=Me,Se("Failed to load live stats",{url:e,error:o instanceof Error?o.message:String(o)})}ve()}async function Et(e){w=await Ut(e),ve(r)}function wt(e,o,_,C){if(!o||!Number.isFinite(C)||C<=0)return{};const ne=Math.max(0,Math.min(1,_/C)),G={};for(const Y of e.metadata.liveStats){if(!Y.live||!Y.fromVideo||!Y.scaleWithTime)continue;const je=Y.videoKey??Y.id,W=o[je];if(typeof W!="number"||!Number.isFinite(W))continue;const nt=W*ne;G[Y.id]=Y.integer?String(Math.floor(nt)):String(nt)}return G}function Le(e,o){e.hidden=!o,e.classList.toggle("is-hidden",!o)}function Ee(e,o){return o!=null&&o.views?o.viewId??Object.keys(o.views)[0]:o==null?void 0:o.viewId}function St(e,o){return!o||!e.views?null:e.views[o]??null}function et(e){const o=new Set(Vt(e,a));return we.filter(_=>o.has(_.id))}function tt(e){return e?we.find(o=>o.id===e)??null:null}function It(){return l.getSource()!=="local"?Ye.MIN_TERMINAL_TIME_MS:Ct(Ye.MIN_TERMINAL_TIME_MS,An)}function Ct(e,o){const _=Math.ceil(Math.min(e,o)),C=Math.floor(Math.max(e,o));return Math.floor(Math.random()*(C-_+1))+_}function Lt(e){const o=n.id,_=i.manifestSource;i=Ht(e,a),t=et(i),l.setSource(i.manifestSource),i.manifestSource==="online"&&l.preloadActiveManifest(),U.setHomeVisible(!i.lockedScaleId),x.setHomeVisible(!i.lockedScaleId),V.setSimulationClasses(t),H.setAdvancedSettings(i),K("Advanced settings updated",i),_!==i.manifestSource&&(u=null);const C=tt(i.lockedScaleId);C&&(Ze(C),C.id!==o&&(v=!1,c.hideMedia(),H.setView("parameters")),v||(Ve(Ge[C.id]),H.setSimulation(n,te())))}}function Nn(){const s=document.getElementById("app");if(!s)throw new Error("App mount element not found.");Pn(s)}Nn();
//# sourceMappingURL=main-DQ3klgal.js.map
