'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const LANG_KEY='smokeLabLang';
let lang=localStorage.getItem(LANG_KEY)||'de';

const I18N={
 de:{
  smoke:'+ Zigarette erfassen',acute:'⚡ Akut-Hilfe / Drang stoppen',today:'Heute',radar:'Heute auf einen Blick',
  home:'Home',patterns:'Muster',tools:'Tools',experiment:'Experiment',settings:'Einstellungen',
  noentry:'Noch kein Eintrag heute.',language:'Sprache',german:'DE',english:'EN'
 },
 en:{
  smoke:'+ Log cigarette',acute:'⚡ Acute help / stop urge',today:'Today',radar:'Today at a glance',
  home:'Home',patterns:'Patterns',tools:'Tools',experiment:'Experiment',settings:'Settings',
  noentry:'No entry yet today.',language:'Language',german:'DE',english:'EN'
 }
};

function injectStyles(){
 qa('#cleanResetV10,#referenceLockedV9,#designStandardV8,#masterResetV7').forEach(el=>el.remove());
 if(q('#viewportDarkV11'))return;
 const s=document.createElement('style');s.id='viewportDarkV11';s.textContent=`
 :root{--bg:#020617;--surface:#0F172A;--surface-2:#111827;--surface-3:#172033;--text:#F8FAFC;--muted:#94A3B8;--line:#1E293B;--line-2:#334155;--petrol:#5EEAD4;--orange:#E8873A;--success:#4ADE80;--danger:#FB7185;--shadow:0 12px 28px rgba(0,0,0,.28)}
 *{box-sizing:border-box;-webkit-tap-highlight-color:rgba(232,135,58,.12)}
 html,body{margin:0!important;width:100%!important;height:100%!important;min-height:100%!important;overflow:hidden!important;background:var(--bg)!important;color:var(--text)!important;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif!important;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
 body{position:fixed!important;inset:0!important}
 button,input,select,textarea{font:inherit;color:inherit}
 button{touch-action:manipulation}
 .app{width:100%!important;max-width:480px!important;height:100dvh!important;min-height:100dvh!important;margin:0 auto!important;padding:0 12px!important;display:grid!important;grid-template-rows:auto minmax(0,1fr) auto!important;overflow:hidden!important;background:var(--bg)!important}
 .header{position:relative!important;top:auto!important;z-index:50!important;height:58px!important;min-height:58px!important;margin:0!important;padding:env(safe-area-inset-top) 2px 0!important;background:var(--bg)!important;border:0!important;border-bottom:1px solid var(--line)!important;display:flex!important;align-items:center!important;justify-content:space-between!important}
 .header-actions{display:none!important}.brand{width:164px!important;max-width:45vw!important;height:30px!important;flex:0 0 auto!important;background-position:left center!important;background-size:contain!important;background-repeat:no-repeat!important;filter:brightness(0) invert(1)!important}
 .screen,.main-screen{width:100%!important;max-width:none!important;height:100%!important;min-height:0!important;margin:0!important;padding:10px 0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:thin!important;scrollbar-color:#334155 transparent!important}
 .screen::-webkit-scrollbar,.main-screen::-webkit-scrollbar,.qs-scroll::-webkit-scrollbar,.modal::-webkit-scrollbar,.ux-modal::-webkit-scrollbar{width:4px}.screen::-webkit-scrollbar-thumb,.main-screen::-webkit-scrollbar-thumb,.qs-scroll::-webkit-scrollbar-thumb,.modal::-webkit-scrollbar-thumb,.ux-modal::-webkit-scrollbar-thumb{background:#334155;border-radius:999px}
 .screen.active{display:block!important}.main-screen.active{display:grid!important;align-content:start!important;gap:8px!important}
 #welcome.active,#onboarding.active{display:grid!important;align-content:center!important;min-height:100%!important}
 .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:8px!important;width:100%!important;min-width:0!important}
 #statusCardV3{order:1!important}.home-actions-v11{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}#dayRadarV3{order:3!important}
 #labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card,.tool-card,.insight,.empty,.locked{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:14px!important;box-shadow:none!important;color:var(--text)!important}
 .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card{padding:12px!important}
 .home-status-row{background:linear-gradient(135deg,#0F3B3A,#102A2A)!important;border-color:#1F4B48!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important}
 .home-status-row .status-eyebrow,.eyebrow,.kicker,.label{font-size:10px!important;font-weight:800!important;letter-spacing:.09em!important;text-transform:uppercase!important;color:var(--muted)!important}.home-status-row .status-title,.status-title,.h2,.qs-title,.modal h2,.ux-modal .h2,.tool-card b{color:var(--text)!important;font-weight:800!important;line-height:1.12!important;letter-spacing:-.015em!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}.home-status-row .status-title{font-size:18px!important;margin-top:2px!important}.home-status-badge,.badge{background:#132522!important;border:1px solid #28504B!important;color:#99F6E4!important;border-radius:999px!important;padding:6px 8px!important;font-size:10px!important;font-weight:800!important;white-space:nowrap!important}
 p,small,.muted,.sub,.card-copy,.lab-copy,.radar-last,.summary-small,.day-counts{color:var(--muted)!important;line-height:1.38!important}.card p,.panel p,.settings-card p,.experiment-card p{font-size:12px!important}
 #heroSmoke,.primary-action-v11{min-width:0!important;min-height:48px!important;border-radius:12px!important;padding:10px 10px!important;font-size:12px!important;font-weight:800!important;line-height:1.15!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important;transition:transform .14s ease,background .14s ease,border-color .14s ease!important}
 #heroSmoke{background:var(--orange)!important;color:#fff!important;border:1px solid #F29A57!important;box-shadow:0 6px 16px rgba(232,135,58,.18)!important}.primary-action-v11{background:var(--surface)!important;color:#CCFBF1!important;border:1px solid #2A5A55!important}.primary-action-v11:active,#heroSmoke:active{transform:scale(.98)!important}
 .radar-card{padding:12px!important}.radar-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:8px!important}.radar-head .h2{font-size:15px!important}.radar-legend,.legend{display:flex!important;gap:8px!important;flex-wrap:wrap!important;justify-content:flex-end!important;font-size:9px!important;color:var(--muted)!important}.radar-axis{margin-top:10px!important}.radar-line,.timeline-line{background:#334155!important}.tick{background:#475569!important}.tick-label{color:#64748B!important}.radar-info,.empty,.locked{background:#0B1220!important;border-color:#263449!important}.event-dot.stop,.dot.stop,.radar-event.resist{background:var(--success)!important}.event-dot.smoke,.dot.smoke,.radar-event.smoke{background:#64748B!important}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;align-items:stretch!important}.tool-card{min-height:112px!important;height:auto!important;padding:12px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}.tool-card b{font-size:13px!important}.tool-card small{font-size:10.5px!important;color:var(--muted)!important;line-height:1.32!important}
 .choice-grid,.risk-grid,.icon-grid,.resist-trigger-grid,.qs-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}.choice,.risk-chip,.icon-choice,.resist-trigger,.qs-chip,.time-chip,.btn,.manual-win{background:var(--surface-2)!important;border:1px solid var(--line-2)!important;color:var(--text)!important;border-radius:11px!important;min-height:42px!important;padding:9px 10px!important}.choice.selected,.risk-chip.selected,.icon-choice.selected,.resist-trigger.selected,.qs-chip.selected,.time-chip.selected{background:#12302D!important;border-color:#2DD4BF!important;color:#CCFBF1!important}
 .range-tabs{gap:5px!important}.range-tab{height:30px!important;background:var(--surface-2)!important;border:1px solid var(--line)!important;color:var(--muted)!important}.range-tab.active{background:#153B38!important;border-color:#2A5A55!important;color:#CCFBF1!important}
 .trigger-track,.day-bar,.track{background:#1E293B!important}.trigger-fill,.fill{background:#2DD4BF!important}
 .bottom-nav{position:relative!important;left:auto!important;transform:none!important;bottom:auto!important;z-index:70!important;width:100%!important;height:calc(62px + env(safe-area-inset-bottom))!important;display:none!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;padding:6px 2px env(safe-area-inset-bottom)!important;background:#020617!important;border-top:1px solid var(--line)!important;box-shadow:none!important}.bottom-nav.show{display:grid!important}.bottom-nav .tab{min-width:0!important;border:0!important;background:transparent!important;color:#64748B!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;font-size:10px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important;padding:4px 1px!important;border-radius:10px!important}.bottom-nav .tab .tab-icon{font-size:18px!important;line-height:1!important}.bottom-nav .tab.active{background:#111827!important;color:#F8FAFC!important}.bottom-nav .tab:active{background:#172033!important}
 .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{position:fixed!important;inset:0!important;z-index:100!important;display:none;align-items:flex-end!important;justify-content:center!important;padding:10px!important;background:rgba(2,6,23,.74)!important;backdrop-filter:blur(8px)!important}.overlay.open,.modal-overlay.open,.quick-sheet-overlay.open,.ux-overlay.open{display:flex!important}.modal,.ux-modal,.quick-sheet{width:min(100%,460px)!important;max-width:460px!important;max-height:min(82dvh,720px)!important;margin:0!important;border-radius:18px 18px 12px 12px!important;background:#0B1220!important;border:1px solid var(--line-2)!important;box-shadow:0 24px 60px rgba(0,0,0,.45)!important;color:var(--text)!important;overflow:hidden!important;animation:sheetIn .18s ease-out!important}.modal,.ux-modal{padding:12px!important;overflow-y:auto!important}.quick-sheet{display:grid!important;grid-template-rows:minmax(0,1fr) auto!important}.qs-scroll{padding:12px!important;overflow-y:auto!important;min-height:0!important}.qs-actions{padding:10px 12px calc(10px + env(safe-area-inset-bottom))!important;background:#0B1220!important;border-top:1px solid var(--line)!important}@keyframes sheetIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
 .premium-intervention{border-radius:16px!important;padding:16px!important;margin:0!important;min-height:320px!important;background:linear-gradient(145deg,#073B3A,#102A2A)!important;border:1px solid #245954!important;box-shadow:none!important}
 #onboarding{padding:8px 0!important}#onboarding .onboard{width:100%!important;max-width:none!important;margin:0!important;display:grid!important;gap:8px!important}#onboarding .setup-card{width:100%!important;margin:0!important;padding:12px!important}#onboarding .step-box.wizard-step-inline{width:100%!important;margin:0 0 10px!important;padding:0 0 10px!important;border-bottom:1px solid var(--line)!important}#onboarding .step-row{font-size:10px!important;color:var(--muted)!important}
 #languageSwitchV11{display:grid;grid-template-columns:auto 1fr auto auto;gap:8px;align-items:center;padding:10px 12px;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:8px}#languageSwitchV11 span{font-size:11px;color:var(--muted);font-weight:700}#languageSwitchV11 button{min-height:32px;min-width:42px;padding:0 9px;border:1px solid var(--line-2);border-radius:9px;background:var(--surface-2);color:var(--muted);font-size:11px;font-weight:800}#languageSwitchV11 button.active{background:#12302D;border-color:#2DD4BF;color:#CCFBF1}
 @media(max-width:360px){.app{padding-left:8px!important;padding-right:8px!important}.home-actions-v11{grid-template-columns:1fr!important}.bottom-nav .tab{font-size:9px!important}.bottom-nav .tab .tab-icon{font-size:17px!important}}
 `;document.head.appendChild(s);
}

function buildHomeActions(){
 const shell=q('.dash-v3');if(!shell)return;
 qa('[id^="homePrimaryActionsV"],#homeActionsV10').forEach(el=>el.remove());
 let wrap=q('#homeActionsV11');if(!wrap){wrap=document.createElement('div');wrap.id='homeActionsV11';wrap.className='home-actions-v11';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';wrap.appendChild(smoke)}
 smoke.dataset.i18n='smoke';smoke.textContent=I18N[lang].smoke;
 let acute=q('#heroAcuteV11');if(!acute){acute=document.createElement('button');acute.id='heroAcuteV11';acute.type='button';acute.className='primary-action-v11';acute.dataset.i18n='acute';wrap.appendChild(acute)}acute.textContent=I18N[lang].acute;
}

function removeSavingsTool(){
 qa('.tool-card,button,[role="button"],.card').forEach(el=>{
  if(!el.isConnected)return;const t=(el.textContent||'').replace(/\s+/g,' ').trim();
  if(/Ersparnis[- ]?Rechner|Sparrechner|Geld gespart|Schachtelpreis|Preis pro Schachtel|Savings calculator|money saved/i.test(t)){
   const card=el.closest('.tool-card')||el;if(card&&card.id!=='statusCardV3'&&card.id!=='dayRadarV3')card.remove();
  }
 });
}

function triggerAcute(){const proxy=q('#homeSosHero');if(proxy){proxy.click();return}const urge=q('[data-home-tool="urge"]');if(urge){urge.click();return}q('#sosBtn')?.click()}

let movingWizard=false;
function integrateOnboardingProgress(){if(movingWizard)return;const step=q('#onboarding .step-box'),card=q('#onboarding .setup-card');if(!step||!card||card.contains(step))return;movingWizard=true;card.prepend(step);step.classList.add('wizard-step-inline');movingWizard=false}
function smoothGoalAdvance(target){const ob=q('#onboarding');if(!ob||!ob.classList.contains('active')||!target.closest('.choice'))return;const tx=(ob.textContent||'').replace(/\s+/g,' ');if(!/(1\s*\/\s*2|ZIEL|VERÄNDERN|GOAL|CHANGE)/i.test(tx))return;setTimeout(()=>{const next=qa('#onboarding button').find(b=>/weiter|nächste|fortfahren|continue|next/i.test((b.textContent||'').trim())&&!b.disabled);next?.click()},200)}

function buildLanguageSwitch(){
 const settings=q('#settings');if(!settings)return;let box=q('#languageSwitchV11');if(!box){box=document.createElement('div');box.id='languageSwitchV11';box.innerHTML='<span data-i18n="language"></span><div></div><button type="button" data-lang="de">DE</button><button type="button" data-lang="en">EN</button>';settings.prepend(box)}
 box.querySelector('[data-i18n="language"]').textContent=I18N[lang].language;qa('button[data-lang]',box).forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
}

function translateVisible(){
 qa('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(I18N[lang][k])el.textContent=I18N[lang][k]});
 const exact={
  'Home':'home','Muster':'patterns','Patterns':'patterns','Tools':'tools','Experiment':'experiment','Einstellungen':'settings','Settings':'settings',
  'Heute':'today','Today':'today','Heute auf einen Blick':'radar','Today at a glance':'radar','Noch kein Eintrag heute.':'noentry','No entry yet today.':'noentry'
 };
 qa('button,.tab,.eyebrow,.h2,.radar-last,.empty').forEach(el=>{if(el.children.length>1)return;const t=(el.textContent||'').trim();const k=exact[t];if(k)el.textContent=I18N[lang][k]});
 document.documentElement.lang=lang;
 buildHomeActions();buildLanguageSwitch();
}
function setLanguage(next){if(!I18N[next])return;lang=next;localStorage.setItem(LANG_KEY,lang);translateVisible()}

function watch(){new MutationObserver(()=>requestAnimationFrame(()=>{integrateOnboardingProgress();removeSavingsTool();buildHomeActions();buildLanguageSwitch();})).observe(document.body,{childList:true,subtree:true})}
function wire(){document.addEventListener('click',e=>{const acute=e.target.closest('#heroAcuteV11');if(acute){e.preventDefault();e.stopImmediatePropagation();triggerAcute();return}const lb=e.target.closest('#languageSwitchV11 button[data-lang]');if(lb){setLanguage(lb.dataset.lang);return}smoothGoalAdvance(e.target)},true)}
function apply(){injectStyles();buildHomeActions();integrateOnboardingProgress();removeSavingsTool();buildLanguageSwitch();translateVisible()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{apply();watch()},{once:true});else{apply();watch()}
setTimeout(apply,150);setTimeout(apply,700);wire();
window.SmokeLabUI={setLanguage,getLanguage:()=>lang};
})();