'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
let sosTimer=null,sosRemaining=0,sosTrigger=null,sosOutcome=null;

function injectStyles(){
  qa('#lightRepairV13,#repairV12,#viewportDarkV11,#cleanResetV10,#referenceLockedV9,#designStandardV8,#masterResetV7').forEach(el=>el.remove());
  if(q('#coreArchitectureV16'))return;
  const s=document.createElement('style');
  s.id='coreArchitectureV16';
  s.textContent=`
  :root{--bg:#F2F5F4;--card:#FFFFFF;--petrol:#1B4F4C;--orange:#E8873A;--text:#1A1A1A;--muted:#66736F;--line:#E2E8F0;--mint:#EAF1EF;--success:#4C9A6A;--shadow:0 4px 16px rgba(15,23,42,.045)}
  *{box-sizing:border-box;-webkit-tap-highlight-color:rgba(27,79,76,.08)}
  html,body{margin:0!important;width:100%!important;min-height:100%!important;background:var(--bg)!important;color:var(--text)!important;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif!important;-webkit-font-smoothing:antialiased}
  body{overflow:hidden!important}
  .app{width:100%!important;max-width:448px!important;height:100dvh!important;margin:0 auto!important;padding:0 16px calc(72px + env(safe-area-inset-bottom))!important;overflow:hidden!important;background:var(--bg)!important}
  .header{height:58px!important;min-height:58px!important;margin:0 -16px!important;padding:env(safe-area-inset-top) 16px 0!important;background:var(--bg)!important;border:0!important;border-bottom:1px solid rgba(226,232,240,.9)!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;position:relative!important;z-index:40!important}
  .header-actions{display:none!important}.brand{width:172px!important;height:30px!important;max-width:55vw!important;flex:0 0 auto!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:left center!important;filter:none!important}
  .screen,.main-screen{display:none!important;width:100%!important;height:calc(100dvh - 58px - 72px - env(safe-area-inset-bottom))!important;min-height:0!important;margin:0!important;padding:20px 0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important}
  .screen.active{display:block!important}.main-screen.active{display:grid!important;align-content:start!important;gap:16px!important}#welcome.active,#onboarding.active{display:grid!important;align-content:center!important}
  .screen>*:not(.dash-v3),.main-screen>*{max-width:408px!important;margin-left:auto!important;margin-right:auto!important}
  .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:16px!important;width:100%!important;max-width:408px!important;margin:0 auto!important}
  #statusCardV3{order:1!important}.home-actions-v16{order:2!important;display:grid!important;grid-template-columns:1fr!important;gap:10px!important}#dayRadarV3{order:3!important}
  #labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
  .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card,.tool-card,.insight,.empty,.locked{background:var(--card)!important;border:1px solid var(--line)!important;border-radius:16px!important;box-shadow:var(--shadow)!important;color:var(--text)!important}.card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card{padding:18px!important}
  .home-status-row{background:var(--petrol)!important;color:#fff!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:12px!important;align-items:center!important}.home-status-row .status-eyebrow{font-size:10px!important;font-weight:800!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:rgba(255,255,255,.72)!important}.home-status-row .status-title{font-size:19px!important;font-weight:800!important;line-height:1.08!important;color:#fff!important;margin-top:3px!important}.home-status-badge{background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.17)!important;color:#fff!important;border-radius:999px!important;padding:7px 10px!important;font-size:10px!important;font-weight:800!important;white-space:nowrap!important}
  .h2,.qs-title,.modal h2,.ux-modal .h2,.tool-card b,.status-title{color:var(--petrol)!important;font-weight:800!important;line-height:1.15!important;letter-spacing:-.015em!important}.muted,p,small,.sub,.card-copy,.lab-copy,.radar-last,.summary-small,.day-counts{color:var(--muted)!important;line-height:1.45!important}
  #heroSmoke,.primary-action-v16{width:100%!important;min-height:54px!important;border-radius:15px!important;padding:14px 16px!important;font-size:14px!important;font-weight:800!important;line-height:1.15!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important}.primary-action-v16{background:#fff!important;color:var(--petrol)!important;border:2px solid var(--petrol)!important;box-shadow:none!important}#heroSmoke{background:var(--orange)!important;color:#fff!important;border:1px solid var(--orange)!important;box-shadow:0 4px 12px rgba(232,135,58,.18)!important}
  .radar-card{padding:18px!important}.radar-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important}.radar-head .h2{font-size:16px!important}.radar-legend,.legend{display:flex!important;gap:8px!important;flex-wrap:wrap!important;justify-content:flex-end!important;font-size:9px!important;color:var(--muted)!important}.radar-line,.timeline-line{background:#D9E4E0!important}.tick{background:#B8C8C2!important}.tick-label{color:#7A8A85!important}.radar-info,.empty,.locked{background:#F8FAF9!important;border-color:#DCE6E2!important}.event-dot.stop,.dot.stop,.radar-event.resist{background:var(--success)!important}.event-dot.smoke,.dot.smoke,.radar-event.smoke{background:#3A3F3F!important}
  .bottom-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;z-index:80!important;width:min(100%,448px)!important;height:calc(68px + env(safe-area-inset-bottom))!important;display:none!important;justify-content:space-around!important;align-items:center!important;padding:6px 4px env(safe-area-inset-bottom)!important;background:rgba(255,255,255,.99)!important;border-top:1px solid var(--line)!important;box-shadow:0 -4px 14px rgba(15,23,42,.04)!important}.bottom-nav.show{display:flex!important}.bottom-nav .tab{flex:1 1 20%!important;width:20%!important;min-width:0!important;height:56px!important;border:0!important;background:transparent!important;color:#71807C!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;font-size:11px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important;text-align:center!important;padding:4px 2px!important;border-radius:11px!important}.bottom-nav .tab .tab-icon{font-size:19px!important;line-height:1!important;display:block!important}.bottom-nav .tab span:last-child{display:block!important;width:100%!important;overflow:hidden!important;text-overflow:clip!important;white-space:nowrap!important;text-align:center!important}.bottom-nav .tab.active{background:var(--mint)!important;color:var(--petrol)!important}
  .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.tool-card{min-height:118px!important;padding:14px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.tool-card b{font-size:13px!important}.tool-card small{font-size:10.5px!important;color:var(--muted)!important;line-height:1.35!important}
  #settings>*{display:none!important}#settingsCoreV16{display:block!important;max-width:408px!important;margin:0 auto!important}.settings-list-v16{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:var(--shadow)}.settings-row-v16{width:100%;min-height:48px;padding:0 14px;border:0;border-bottom:1px solid #EDF1EF;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:14px;text-align:left;font-size:14px;color:var(--text)}.settings-row-v16:last-child{border-bottom:0}.settings-row-v16 b{font-size:14px;color:var(--text)}.settings-row-v16 span{font-size:12px;color:var(--muted);white-space:nowrap}.settings-row-v16.danger b{color:#A64834}
  .choice-grid,.risk-grid,.icon-grid,.resist-trigger-grid,.qs-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.choice,.risk-chip,.icon-choice,.resist-trigger,.qs-chip,.time-chip,.btn,.manual-win{background:#fff!important;border:1px solid var(--line)!important;color:var(--text)!important;border-radius:12px!important;min-height:44px!important;padding:10px 11px!important}.choice.selected,.risk-chip.selected,.icon-choice.selected,.resist-trigger.selected,.qs-chip.selected,.time-chip.selected{background:#ECF3F1!important;border-color:var(--petrol)!important;color:var(--petrol)!important}
  #onboarding{padding:10px 0!important}#onboarding .onboard{width:100%!important;max-width:408px!important;margin:0 auto!important;display:grid!important;gap:12px!important}#onboarding .onboard-top{display:flex!important;align-items:center!important;gap:10px!important}#onboarding .step-box{display:block!important;flex:1!important;min-width:0!important}#onboarding .step-row{display:flex!important;justify-content:space-between!important;gap:10px!important;font-size:10px!important;color:var(--muted)!important;font-weight:800!important}#onboarding .track{display:block!important;width:100%!important;height:7px!important;margin-top:7px!important;background:#E5ECE9!important;border-radius:999px!important;overflow:hidden!important}#onboarding .fill{display:block!important;height:100%!important;background:var(--success)!important;border-radius:999px!important}#onboarding .setup-card{width:100%!important;margin:0!important;padding:18px!important}
  .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{position:fixed!important;inset:0!important;z-index:100!important;align-items:center!important;justify-content:center!important;padding:16px!important;background:rgba(20,35,33,.30)!important;backdrop-filter:blur(8px)!important}.modal,.ux-modal,.quick-sheet{width:min(100%,408px)!important;max-width:408px!important;max-height:88dvh!important;margin:auto!important;border-radius:18px!important;background:#fff!important;border:1px solid var(--line)!important;box-shadow:0 24px 60px rgba(20,35,33,.18)!important;color:var(--text)!important}.modal,.ux-modal{padding:18px!important;overflow-y:auto!important}.quick-sheet{display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;overflow:hidden!important}.qs-scroll{padding:18px!important;overflow-y:auto!important;min-height:0!important}.qs-actions{padding:12px 18px calc(12px + env(safe-area-inset-bottom))!important;background:#fff!important;border-top:1px solid var(--line)!important}
  #contextSosV16{position:fixed;inset:0;z-index:220;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(20,35,33,.34);backdrop-filter:blur(9px)}#contextSosV16.open{display:flex}.context-sos-card{width:min(100%,408px);max-height:88dvh;overflow:auto;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:0 28px 70px rgba(20,35,33,.2);padding:20px}.context-sos-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.context-sos-kicker{font-size:10px;font-weight:900;letter-spacing:.12em;color:var(--muted);text-transform:uppercase}.context-sos-title{font-size:20px;line-height:1.15;font-weight:850;color:var(--petrol);margin-top:4px}.context-sos-close{width:36px;height:36px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--petrol);font-size:18px}.context-trigger-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:18px}.context-trigger{min-height:72px;border:1px solid var(--line);border-radius:14px;background:#fff;padding:11px;text-align:left;display:flex;flex-direction:column;justify-content:center;gap:5px}.context-trigger span{font-size:20px}.context-trigger b{font-size:12px;color:var(--petrol)}.context-sos-stage{margin-top:16px}.sos-exercise{border-radius:18px;padding:20px;background:linear-gradient(145deg,#1B4F4C,#2D4A3E);color:#fff;display:grid;gap:14px;text-align:center}.sos-exercise h3{margin:0;color:#fff;font-size:18px}.sos-exercise p{margin:0;color:rgba(255,255,255,.78)!important;font-size:12px}.sos-orb{width:150px;height:150px;border-radius:50%;margin:6px auto;display:grid;place-items:center;align-content:center;background:rgba(241,250,247,.96);color:var(--petrol);border:2px solid rgba(255,255,255,.46);box-shadow:0 0 0 14px rgba(255,255,255,.06),0 0 44px rgba(215,243,235,.3);animation:sosBreath 19s ease-in-out infinite}.sos-orb strong{font-size:42px;line-height:1}.sos-orb span{font-size:10px;font-weight:900;margin-top:8px}.sos-countdown{font-size:36px;font-weight:900;color:#fff}.sos-steps{display:grid;gap:8px}.sos-step{border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px;color:#fff;background:rgba(255,255,255,.06);font-size:11px;line-height:1.4}.sos-progress{height:6px;border-radius:999px;background:rgba(255,255,255,.15);overflow:hidden}.sos-progress span{display:block;height:100%;width:0;background:#fff;border-radius:inherit}.sos-result{display:grid;gap:9px}.sos-result button{min-height:48px;border:1px solid var(--line);border-radius:13px;background:#fff;color:var(--text);font-weight:800}.sos-result button.good{background:#EAF4EE;border-color:#BFD7C7;color:#2E6B47}.sos-note{font-size:11px;color:var(--muted);line-height:1.45;margin-top:10px}@keyframes sosBreath{0%,100%{transform:scale(.88)}21%{transform:scale(1.04)}58%{transform:scale(1.04)}100%{transform:scale(.88)}}
  #cravingOverlay.v16-background-write{display:none!important}
  @media(max-width:360px){.home-status-row{grid-template-columns:1fr!important}.home-status-badge{justify-self:start!important}.bottom-nav .tab{font-size:10px!important}.bottom-nav .tab .tab-icon{font-size:18px!important}}
  `;
  document.head.appendChild(s);
}

function ensureFiveNav(){
 const nav=q('#bottomNav');if(!nav)return;
 const defs=[['home','⌂','Home'],['patterns','⌁','Muster'],['tools','▦','Tools'],['experiment','◇','Experiment'],['settings','⚙︎','Einstellungen']];
 defs.forEach(([id,icon,label])=>{
  let b=q(`[data-tab="${id}"]`,nav);
  if(!b){b=document.createElement('button');b.className='tab';b.type='button';b.dataset.tab=id;nav.appendChild(b)}
  b.innerHTML=`<span class="tab-icon">${icon}</span><span>${label}</span>`;
 });
 defs.forEach(([id])=>{const b=q(`[data-tab="${id}"]`,nav);if(b)nav.appendChild(b)});
 qa('.tab',nav).forEach(b=>{if(!defs.some(([id])=>id===b.dataset.tab))b.remove()});
}

function ensureToolsScreen(){
 if(!q('#tools')){
  const tools=document.createElement('section');tools.id='tools';tools.className='main-screen';tools.innerHTML='<div class="card"><div class="eyebrow">WERKZEUGE</div><div class="h2">Tools & Wissen</div><div class="muted" style="margin-top:6px">Akuthilfe, Wissen und gezielte Übungen.</div></div><div id="toolsGrid" class="tools-grid"></div>';
  q('#experiment')?.after(tools);
 }
}

function buildHomeActions(){
 const shell=q('.dash-v3');if(!shell)return;
 qa('[id^="homePrimaryActionsV"],[id^="homeActionsV"]').forEach(el=>el.remove());
 let wrap=q('#homeActionsV16');if(!wrap){wrap=document.createElement('div');wrap.id='homeActionsV16';wrap.className='home-actions-v16';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';wrap.appendChild(smoke)}smoke.textContent='+ Zigarette erfassen';
 let acute=q('#heroAcuteV16');if(!acute){acute=document.createElement('button');acute.id='heroAcuteV16';acute.type='button';acute.className='primary-action-v16';wrap.appendChild(acute)}acute.textContent='Drang stoppen (Akut-Hilfe)';
}

function buildSlimSettings(){
 const settings=q('#settings');if(!settings)return;
 let core=q('#settingsCoreV16');if(!core){core=document.createElement('div');core.id='settingsCoreV16';settings.prepend(core)}
 core.innerHTML=`<div class="settings-list-v16">
   <button class="settings-row-v16" type="button" id="settingsLanguageV16"><b>Sprache</b><span>DE / EN</span></button>
   <div class="settings-row-v16"><b>Datenspeicherung</b><span>Lokal auf diesem Gerät</span></div>
   <div class="settings-row-v16"><b>App-Version</b><span>v16</span></div>
   <button class="settings-row-v16 danger" type="button" id="settingsResetV16"><b>Daten zurücksetzen</b><span>›</span></button>
 </div>`;
}

function ensureContextSos(){
 if(q('#contextSosV16'))return;
 const ov=document.createElement('div');ov.id='contextSosV16';ov.innerHTML='<div class="context-sos-card" role="dialog" aria-modal="true"><div id="contextSosContent"></div></div>';document.body.appendChild(ov);
}
function closeContextSos(){clearInterval(sosTimer);sosTimer=null;q('#contextSosV16')?.classList.remove('open');sosTrigger=null;sosOutcome=null}
function openContextSos(){ensureContextSos();clearInterval(sosTimer);sosTimer=null;sosTrigger=null;renderTriggerMenu();q('#contextSosV16')?.classList.add('open')}
function renderTriggerMenu(){const box=q('#contextSosContent');if(!box)return;box.innerHTML=`<div class="context-sos-head"><div><div class="context-sos-kicker">AKUT-HILFE</div><div class="context-sos-title">Welcher Auslöser drückt gerade?</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-trigger-grid"><button class="context-trigger" data-sos-trigger="Stress" type="button"><span>⚡</span><b>Stress / Druck</b></button><button class="context-trigger" data-sos-trigger="Kaffee / Ritual" type="button"><span>☕</span><b>Kaffee / Ritual</b></button><button class="context-trigger" data-sos-trigger="Pause" type="button"><span>⏸️</span><b>Pause / Leerlauf</b></button><button class="context-trigger" data-sos-trigger="Gewohnheit" type="button"><span>↻</span><b>Gewohnheit</b></button></div>`}
function startExercise(trigger){sosTrigger=trigger;clearInterval(sosTimer);const box=q('#contextSosContent');if(!box)return;
 let total=60,html='';
 if(trigger==='Stress'){
  html=`<div class="context-sos-head"><div><div class="context-sos-kicker">STRESS / DRUCK</div><div class="context-sos-title">60 Sekunden 4–7–8</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-sos-stage"><div class="sos-exercise"><h3>Geführte Atmung</h3><div class="sos-orb"><strong id="sosSecondsV16">60</strong><span id="sosPhaseV16">Einatmen</span></div><div class="sos-progress"><span id="sosProgressV16"></span></div><p>4 Sekunden einatmen · 7 Sekunden halten · 8 Sekunden ausatmen</p></div></div>`;
 }else if(trigger==='Kaffee / Ritual'){
  html=`<div class="context-sos-head"><div><div class="context-sos-kicker">KAFFEE / RITUAL</div><div class="context-sos-title">Ritual-Breaker</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-sos-stage"><div class="sos-exercise"><h3>Unterbrich die Reihenfolge</h3><div id="sosSecondsV16" class="sos-countdown">60</div><div class="sos-steps"><div class="sos-step">1 · Nimm Tasse oder Glas bewusst in die andere Hand.</div><div class="sos-step">2 · Trink einen Schluck möglichst kaltes Wasser.</div><div class="sos-step">3 · Richte 30 Sekunden Aufmerksamkeit auf eine Sache im Raum.</div></div><div class="sos-progress"><span id="sosProgressV16"></span></div></div></div>`;
 }else if(trigger==='Gewohnheit'){
  total=300;html=`<div class="context-sos-head"><div><div class="context-sos-kicker">GEWOHNHEIT</div><div class="context-sos-title">5-Minuten-Aufschub-Regel</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-sos-stage"><div class="sos-exercise"><h3>Entscheidung verschieben</h3><div id="sosSecondsV16" class="sos-countdown">5:00</div><div class="sos-steps"><div class="sos-step">Sag dir: „Ich entscheide in 5 Minuten neu.“</div><div class="sos-step">Wechsle kurz Tätigkeit oder Position.</div><div class="sos-step">Beobachte, ob der Impuls gleich bleibt oder sich verändert.</div></div><div class="sos-progress"><span id="sosProgressV16"></span></div></div></div>`;
 }else{
  html=`<div class="context-sos-head"><div><div class="context-sos-kicker">PAUSE / LEERLAUF</div><div class="context-sos-title">Kontext wechseln</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-sos-stage"><div class="sos-exercise"><h3>Autopilot unterbrechen</h3><div id="sosSecondsV16" class="sos-countdown">60</div><div class="sos-steps"><div class="sos-step">Steh auf.</div><div class="sos-step">Wechsle den Ort.</div><div class="sos-step">Bleib dort 60 Sekunden und entscheide danach neu.</div></div><div class="sos-progress"><span id="sosProgressV16"></span></div></div></div>`;
 }
 box.innerHTML=html;runTimer(total,trigger==='Stress');
}
function runTimer(total,isBreathing){const start=performance.now();sosRemaining=total;sosTimer=setInterval(()=>{const elapsed=(performance.now()-start)/1000,remain=Math.max(0,total-elapsed);sosRemaining=remain;const sec=q('#sosSecondsV16'),bar=q('#sosProgressV16'),phase=q('#sosPhaseV16');if(sec){if(total>=300){const m=Math.floor(remain/60),s=Math.ceil(remain%60);sec.textContent=`${m}:${String(s===60?59:s).padStart(2,'0')}`}else sec.textContent=Math.ceil(remain)}if(bar)bar.style.width=`${Math.min(100,elapsed/total*100)}%`;if(isBreathing&&phase){const cy=elapsed%19;phase.textContent=cy<4?'Einatmen':cy<11?'Halten':'Ausatmen'}if(remain<=0){clearInterval(sosTimer);sosTimer=null;renderResult()}},120)}
function renderResult(){const box=q('#contextSosContent');if(!box)return;box.innerHTML=`<div class="context-sos-head"><div><div class="context-sos-kicker">AUSWERTUNG</div><div class="context-sos-title">Wie ist der Drang jetzt?</div></div><button class="context-sos-close" data-sos-close type="button">×</button></div><div class="context-sos-stage"><div class="sos-result"><button class="good" data-sos-outcome="down" type="button">✓ Gesunken</button><button data-sos-outcome="same" type="button">→ Ungefähr gleich</button><button data-sos-outcome="up" type="button">↑ Stärker</button></div><div class="sos-note">Die Rückmeldung bewertet die Strategie. Die unterbrochene Situation wird im Tages-Radar dokumentiert.</div></div>`}
function writeOutcomeToCore(outcome){
 const overlay=q('#cravingOverlay');if(!overlay)return false;overlay.classList.add('v16-background-write');
 const proxy=q('#homeSosHero');if(proxy)proxy.click();else q('#sosBtn')?.click();
 const triggerBtn=document.createElement('button');triggerBtn.type='button';triggerBtn.dataset.resistTrigger=sosTrigger||'Gewohnheit';triggerBtn.style.display='none';document.body.appendChild(triggerBtn);triggerBtn.click();triggerBtn.remove();
 q('#cravingNext')?.click();
 const outcomeBtn=document.createElement('button');outcomeBtn.type='button';outcomeBtn.dataset.resistOutcome=outcome;outcomeBtn.style.display='none';document.body.appendChild(outcomeBtn);outcomeBtn.click();outcomeBtn.remove();
 setTimeout(()=>overlay.classList.remove('v16-background-write'),0);return true;
}
function resetData(){if(!confirm('Alle lokal gespeicherten Smoke-Lab-Daten wirklich zurücksetzen?'))return;const original=qa('#settings button').find(b=>b.id!=='settingsResetV16'&&/zurücksetzen|reset/i.test((b.textContent||'').trim()));if(original){original.click();return}localStorage.clear();location.reload()}

function wire(){
 document.addEventListener('click',e=>{
  if(e.target.closest('#heroAcuteV16')){e.preventDefault();openContextSos();return}
  if(e.target.closest('[data-sos-close]')||e.target.id==='contextSosV16'){e.preventDefault();closeContextSos();return}
  const tr=e.target.closest('[data-sos-trigger]');if(tr){e.preventDefault();startExercise(tr.dataset.sosTrigger);return}
  const out=e.target.closest('[data-sos-outcome]');if(out){e.preventDefault();sosOutcome=out.dataset.sosOutcome;writeOutcomeToCore(sosOutcome);closeContextSos();return}
  if(e.target.closest('#settingsResetV16')){e.preventDefault();resetData();return}
  if(e.target.closest('#settingsLanguageV16')){e.preventDefault();const btn=qa('#settings button').find(b=>b.id!=='settingsLanguageV16'&&/sprache|language|de\s*\/\s*en/i.test((b.textContent||'').trim()));if(btn)btn.click();return}
 },false);
}

function apply(){injectStyles();ensureToolsScreen();ensureFiveNav();buildHomeActions();buildSlimSettings();ensureContextSos()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,150);setTimeout(apply,700);wire();
})();