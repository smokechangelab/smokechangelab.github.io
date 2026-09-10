'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const LANG_KEY='smokeLabLang';
let lang=localStorage.getItem(LANG_KEY)||'de';
const I18N={de:{smoke:'+ Zigarette erfassen',acute:'⚡ Akut-Hilfe / Drang stoppen',home:'Home',patterns:'Muster',tools:'Tools',experiment:'Experiment',settings:'Einstellungen',language:'Sprache'},en:{smoke:'+ Log cigarette',acute:'⚡ Acute help / stop urge',home:'Home',patterns:'Patterns',tools:'Tools',experiment:'Experiment',settings:'Settings',language:'Language'}};

function injectStyles(){
 qa('#viewportDarkV11,#cleanResetV10,#referenceLockedV9,#designStandardV8,#masterResetV7').forEach(el=>el.remove());
 if(q('#repairV12'))return;
 const s=document.createElement('style');s.id='repairV12';s.textContent=`
 :root{--bg:#020617;--surface:#0F172A;--surface2:#111827;--text:#F8FAFC;--muted:#94A3B8;--line:#1E293B;--line2:#334155;--teal:#5EEAD4;--orange:#E8873A;--green:#4ADE80}
 *{box-sizing:border-box;-webkit-tap-highlight-color:rgba(232,135,58,.12)}
 html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:var(--bg)!important;color:var(--text)!important;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif!important;-webkit-font-smoothing:antialiased}
 body{position:fixed!important;inset:0!important}
 .app{position:relative!important;width:100%!important;max-width:480px!important;height:100dvh!important;min-height:100dvh!important;margin:0 auto!important;padding:0 12px calc(70px + env(safe-area-inset-bottom))!important;overflow:hidden!important;background:var(--bg)!important;display:block!important}
 .header{height:58px!important;min-height:58px!important;margin:0!important;padding:env(safe-area-inset-top) 2px 0!important;background:var(--bg)!important;border:0!important;border-bottom:1px solid var(--line)!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;position:relative!important;top:auto!important;z-index:40!important}
 .header-actions{display:none!important}.brand{width:164px!important;height:30px!important;max-width:45vw!important;flex:0 0 auto!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:left center!important;filter:brightness(0) invert(1)!important}
 .screen,.main-screen{display:none!important;width:100%!important;max-width:none!important;height:calc(100dvh - 58px - 70px - env(safe-area-inset-bottom))!important;min-height:0!important;margin:0!important;padding:10px 0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:thin!important;scrollbar-color:#334155 transparent!important}
 .screen.active{display:block!important}.main-screen.active{display:grid!important;align-content:start!important;gap:8px!important}#welcome.active,#onboarding.active{display:grid!important;align-content:center!important}
 .screen::-webkit-scrollbar,.main-screen::-webkit-scrollbar,.qs-scroll::-webkit-scrollbar,.modal::-webkit-scrollbar,.ux-modal::-webkit-scrollbar{width:4px}.screen::-webkit-scrollbar-thumb,.main-screen::-webkit-scrollbar-thumb,.qs-scroll::-webkit-scrollbar-thumb,.modal::-webkit-scrollbar-thumb,.ux-modal::-webkit-scrollbar-thumb{background:#334155;border-radius:999px}
 .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:8px!important;width:100%!important}.home-actions-v12{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}#statusCardV3{order:1!important}#dayRadarV3{order:3!important}#labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card,.tool-card,.insight,.empty,.locked{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:14px!important;box-shadow:none!important;color:var(--text)!important}.card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card{padding:12px!important}
 .home-status-row{background:linear-gradient(135deg,#0F3B3A,#102A2A)!important;border-color:#1F4B48!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important}.home-status-row .status-eyebrow,.eyebrow,.kicker,.label{font-size:10px!important;font-weight:800!important;letter-spacing:.09em!important;text-transform:uppercase!important;color:var(--muted)!important}.home-status-row .status-title,.status-title,.h2,.qs-title,.modal h2,.ux-modal .h2,.tool-card b{color:var(--text)!important;font-weight:800!important;line-height:1.12!important;letter-spacing:-.015em!important}.home-status-row .status-title{font-size:18px!important;margin-top:2px!important}.home-status-badge,.badge{background:#132522!important;border:1px solid #28504B!important;color:#99F6E4!important;border-radius:999px!important;padding:6px 8px!important;font-size:10px!important;font-weight:800!important;white-space:nowrap!important}
 p,small,.muted,.sub,.card-copy,.lab-copy,.radar-last,.summary-small,.day-counts{color:var(--muted)!important;line-height:1.38!important}.card p,.panel p,.settings-card p,.experiment-card p{font-size:12px!important}
 #heroSmoke,.primary-action-v12{min-width:0!important;min-height:48px!important;border-radius:12px!important;padding:10px!important;font-size:12px!important;font-weight:800!important;line-height:1.15!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important}.primary-action-v12{background:var(--surface)!important;color:#CCFBF1!important;border:1px solid #2A5A55!important}#heroSmoke{background:var(--orange)!important;color:#fff!important;border:1px solid #F29A57!important;box-shadow:0 6px 16px rgba(232,135,58,.18)!important}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.tool-card{min-height:112px!important;height:auto!important;padding:12px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.tool-card b{font-size:13px!important}.tool-card small{font-size:10.5px!important;color:var(--muted)!important;line-height:1.32!important}
 .bottom-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;z-index:80!important;width:min(100%,480px)!important;height:calc(66px + env(safe-area-inset-bottom))!important;display:none!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;padding:6px 4px env(safe-area-inset-bottom)!important;background:#020617!important;border-top:1px solid var(--line)!important}.bottom-nav.show{display:grid!important}.bottom-nav .tab{min-width:0!important;border:0!important;background:transparent!important;color:#64748B!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;font-size:10px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important;padding:4px 1px!important;border-radius:10px!important}.bottom-nav .tab .tab-icon{font-size:18px!important;line-height:1!important}.bottom-nav .tab.active{background:#111827!important;color:#F8FAFC!important}
 .choice-grid,.risk-grid,.icon-grid,.resist-trigger-grid,.qs-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.choice,.risk-chip,.icon-choice,.resist-trigger,.qs-chip,.time-chip,.btn,.manual-win{background:var(--surface2)!important;border:1px solid var(--line2)!important;color:var(--text)!important;border-radius:11px!important;min-height:42px!important;padding:9px 10px!important}.choice.selected,.risk-chip.selected,.icon-choice.selected,.resist-trigger.selected,.qs-chip.selected,.time-chip.selected{background:#12302D!important;border-color:#2DD4BF!important;color:#CCFBF1!important}
 .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{position:fixed!important;inset:0!important;z-index:100!important;align-items:flex-end!important;justify-content:center!important;padding:10px!important;background:rgba(2,6,23,.74)!important;backdrop-filter:blur(8px)!important}.modal,.ux-modal,.quick-sheet{width:min(100%,460px)!important;max-width:460px!important;max-height:min(84dvh,740px)!important;margin:0!important;border-radius:18px 18px 12px 12px!important;background:#0B1220!important;border:1px solid var(--line2)!important;box-shadow:0 24px 60px rgba(0,0,0,.45)!important;color:var(--text)!important}.modal,.ux-modal{padding:12px!important;overflow-y:auto!important}.quick-sheet{display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;overflow:hidden!important}.qs-scroll{padding:12px!important;overflow-y:auto!important;min-height:0!important}.qs-actions{padding:10px 12px calc(10px + env(safe-area-inset-bottom))!important;background:#0B1220!important;border-top:1px solid var(--line)!important}
 .premium-intervention{border-radius:16px!important;padding:16px!important;margin:0!important;min-height:320px!important;background:linear-gradient(145deg,#073B3A,#102A2A)!important;border:1px solid #245954!important;box-shadow:none!important}.premium-intervention.intervention-task{display:grid!important;align-content:center!important;gap:14px!important}.intervention-task-icon{width:72px;height:72px;border-radius:20px;display:grid;place-items:center;margin:0 auto;background:rgba(255,255,255,.08);font-size:34px}.intervention-task-title{text-align:center;font-size:20px;font-weight:850;color:#fff}.intervention-task-copy{text-align:center;font-size:12px;line-height:1.5;color:rgba(255,255,255,.78)}.intervention-task-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.intervention-task-step{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);border-radius:11px;padding:9px 6px;text-align:center;font-size:9.5px;line-height:1.3;color:#E2E8F0}.intervention-task-timer{display:flex;align-items:center;justify-content:center;gap:8px;color:#99F6E4;font-size:10px;font-weight:800}.intervention-task-timer #uxInterventionSeconds{font-size:16px;font-weight:900}.intervention-task .premium-progress{height:5px!important}.intervention-task #uxInterventionPhase{display:none!important}.intervention-task #uxMotivation{min-height:34px!important;font-size:11px!important}
 #onboarding{padding:8px 0!important}#onboarding .onboard{width:100%!important;max-width:none!important;margin:0!important;display:grid!important;gap:8px!important}#onboarding .setup-card{width:100%!important;margin:0!important;padding:12px!important}#onboarding .step-box.wizard-step-inline{width:100%!important;margin:0 0 10px!important;padding:0 0 10px!important;border-bottom:1px solid var(--line)!important}
 #languageSwitchV12{display:grid;grid-template-columns:auto 1fr auto auto;gap:8px;align-items:center;padding:10px 12px;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:8px}#languageSwitchV12 span{font-size:11px;color:var(--muted);font-weight:700}#languageSwitchV12 button{min-height:32px;min-width:42px;padding:0 9px;border:1px solid var(--line2);border-radius:9px;background:var(--surface2);color:var(--muted);font-size:11px;font-weight:800}#languageSwitchV12 button.active{background:#12302D;border-color:#2DD4BF;color:#CCFBF1}
 @media(max-width:360px){.home-actions-v12{grid-template-columns:1fr!important}.bottom-nav .tab{font-size:9px!important}.bottom-nav .tab .tab-icon{font-size:17px!important}}
 `;document.head.appendChild(s);
}

function ensureNavigation(){
 const nav=q('#bottomNav');if(!nav)return;
 const defs=[['home','⌂'],['patterns','⌁'],['tools','▦'],['experiment','◇'],['settings','⚙︎']];
 defs.forEach(([id,icon])=>{
  let b=q(`[data-tab="${id}"]`,nav);
  if(!b){b=document.createElement('button');b.type='button';b.className='tab';b.dataset.tab=id;nav.appendChild(b)}
  b.innerHTML=`<span class="tab-icon">${icon}</span><span>${I18N[lang][id]||id}</span>`;
 });
 defs.forEach(([id])=>{const b=q(`[data-tab="${id}"]`,nav);if(b)nav.appendChild(b)});
 qa('.tab',nav).forEach(b=>{if(!defs.some(([id])=>id===b.dataset.tab))b.remove()});
}

function buildHomeActions(){
 const shell=q('.dash-v3');if(!shell)return;
 qa('[id^="homePrimaryActionsV"],#homeActionsV10,#homeActionsV11').forEach(el=>el.remove());
 let wrap=q('#homeActionsV12');if(!wrap){wrap=document.createElement('div');wrap.id='homeActionsV12';wrap.className='home-actions-v12';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';wrap.appendChild(smoke)}smoke.textContent=I18N[lang].smoke;
 let acute=q('#heroAcuteV12');if(!acute){acute=document.createElement('button');acute.id='heroAcuteV12';acute.type='button';acute.className='primary-action-v12';wrap.appendChild(acute)}acute.textContent=I18N[lang].acute;
}

function removeSavingsTool(){qa('.tool-card').forEach(el=>{const t=(el.textContent||'').replace(/\s+/g,' ').trim();if(/Ersparnis[- ]?Rechner|Sparrechner|Savings calculator/i.test(t))el.remove()})}
function triggerAcute(){const proxy=q('#homeSosHero');if(proxy){proxy.click();return}const urge=q('[data-home-tool="urge"]');if(urge){urge.click();return}q('#sosBtn')?.click()}

let movingWizard=false;
function integrateOnboardingProgress(){if(movingWizard)return;const step=q('#onboarding .step-box'),card=q('#onboarding .setup-card');if(!step||!card||card.contains(step))return;movingWizard=true;card.prepend(step);step.classList.add('wizard-step-inline');movingWizard=false}

const TASKS={
 'Kaffee / Ritual':{icon:'💧',title:'Ritual bewusst unterbrechen',copy:'Nicht nur warten: ändere jetzt gezielt die Reihenfolge deines Kaffee-Rituals.',steps:['Wasser trinken','Tasse anders platzieren','Erst danach neu entscheiden']},
 'Pause':{icon:'🚪',title:'Ort wechseln',copy:'Unterbrich den räumlichen Autopiloten. Die Aufgabe ist Bewegung, nicht bloß Abwarten.',steps:['Aufstehen','Anderen Ort wählen','Dort 60 Sek. bleiben']},
 'Nach dem Essen':{icon:'🍽️',title:'Neuen Abschluss setzen',copy:'Gib dem Essen ein anderes Ende, bevor die alte Rauch-Kette startet.',steps:['Tisch verlassen','Wasser / Zähne','Platz wechseln']},
 'Gesellschaft':{icon:'👥',title:'Ersten Griff verzögern',copy:'Bleib bewusst im Gespräch oder beim Getränk und verschiebe den automatischen Griff.',steps:['Hände am Glas','Gespräch halten','Danach neu prüfen']},
 'Langeweile':{icon:'✋',title:'Hände beschäftigen',copy:'Besetze Hände und Aufmerksamkeit sofort mit einer konkreten Mini-Handlung.',steps:['Etwas greifen','30 Sek. tun','Drang neu bewerten']}
};
let decorating=false;
function decorateIntervention(){
 if(decorating)return;
 const sub=q('#cravingSub'),box=q('#cravingContent .premium-intervention');if(!sub||!box)return;
 const m=(sub.textContent||'').match(/Auslöser:\s*(.+)/i);if(!m)return;
 const trigger=m[1].trim(),cfg=TASKS[trigger];
 if(!cfg){box.classList.remove('intervention-task');return}
 if(box.dataset.decoratedTrigger===trigger)return;
 decorating=true;box.dataset.decoratedTrigger=trigger;box.classList.add('intervention-task');
 box.innerHTML=`<div class="premium-kicker">60 SEKUNDEN · AKTIVE UNTERBRECHUNG</div><div class="intervention-task-icon">${cfg.icon}</div><div class="intervention-task-title">${cfg.title}</div><div class="intervention-task-copy">${cfg.copy}</div><div class="intervention-task-steps">${cfg.steps.map(x=>`<div class="intervention-task-step">${x}</div>`).join('')}</div><div class="intervention-task-timer"><span id="uxInterventionSeconds">60</span><span>Sekunden Lernfenster</span><span id="uxInterventionPhase"></span></div><div class="premium-progress"><span id="uxInterventionProgress"></span></div><div id="uxMotivation" class="premium-message">Du unterbrichst gerade den Autopiloten.</div>`;
 decorating=false;
}

function addLanguageSwitch(){const settings=q('#settings');if(!settings||q('#languageSwitchV12'))return;const box=document.createElement('div');box.id='languageSwitchV12';box.innerHTML=`<b>${I18N[lang].language}</b><span>Deutsch / English</span><button data-lang="de" class="${lang==='de'?'active':''}">DE</button><button data-lang="en" class="${lang==='en'?'active':''}">EN</button>`;settings.prepend(box)}
function setLanguage(next){if(!I18N[next])return;lang=next;localStorage.setItem(LANG_KEY,lang);ensureNavigation();buildHomeActions();q('#languageSwitchV12')?.remove();addLanguageSwitch()}

function watch(){new MutationObserver(()=>requestAnimationFrame(()=>{ensureNavigation();buildHomeActions();removeSavingsTool();integrateOnboardingProgress();decorateIntervention();addLanguageSwitch()})).observe(document.body,{childList:true,subtree:true})}
function wire(){document.addEventListener('click',e=>{const acute=e.target.closest('#heroAcuteV12');if(acute){e.preventDefault();e.stopImmediatePropagation();triggerAcute();return}const lb=e.target.closest('[data-lang]');if(lb){e.preventDefault();setLanguage(lb.dataset.lang)}},true)}
function apply(){injectStyles();ensureNavigation();buildHomeActions();removeSavingsTool();integrateOnboardingProgress();decorateIntervention();addLanguageSwitch()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{apply();watch()},{once:true});else{apply();watch()}
setTimeout(apply,150);setTimeout(apply,700);wire();window.SmokeLabUI={setLanguage,getLanguage:()=>lang};
})();