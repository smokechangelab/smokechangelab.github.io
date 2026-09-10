'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function injectStyles(){
  qa('#repairV12,#viewportDarkV11,#cleanResetV10,#referenceLockedV9,#designStandardV8,#masterResetV7').forEach(el=>el.remove());
  if(q('#lightRepairV13')) return;
  const s=document.createElement('style');
  s.id='lightRepairV13';
  s.textContent=`
  :root{--bg:#F2F5F4;--card:#FFFFFF;--petrol:#1B4F4C;--orange:#E8873A;--text:#1A1A1A;--muted:#66736F;--line:#E2E8F0;--mint:#EAF1EF;--success:#4C9A6A}
  *{box-sizing:border-box;-webkit-tap-highlight-color:rgba(27,79,76,.08)}
  html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:var(--bg)!important;color:var(--text)!important;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,Helvetica,Arial,sans-serif!important;-webkit-font-smoothing:antialiased}
  body{position:fixed!important;inset:0!important}
  .app{position:relative!important;width:100%!important;max-width:448px!important;height:100dvh!important;min-height:100dvh!important;margin:0 auto!important;padding:0 16px calc(72px + env(safe-area-inset-bottom))!important;overflow:hidden!important;background:var(--bg)!important}
  .header{height:58px!important;min-height:58px!important;margin:0 -16px!important;padding:env(safe-area-inset-top) 16px 0!important;background:var(--bg)!important;border:0!important;border-bottom:1px solid rgba(226,232,240,.9)!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;position:relative!important;z-index:40!important}
  .header-actions{display:none!important}.brand{width:172px!important;height:30px!important;max-width:52vw!important;flex:0 0 auto!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:left center!important;filter:none!important}
  .screen,.main-screen{display:none!important;width:100%!important;height:calc(100dvh - 58px - 72px - env(safe-area-inset-bottom))!important;min-height:0!important;margin:0!important;padding:12px 0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important}
  .screen.active{display:block!important}.main-screen.active{display:grid!important;align-content:start!important;gap:12px!important}#welcome.active,#onboarding.active{display:grid!important;align-content:center!important}
  .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:14px!important;width:100%!important}.home-actions-v13{order:2!important;display:grid!important;grid-template-columns:1fr!important;gap:10px!important}#statusCardV3{order:1!important}#dayRadarV3{order:3!important}#labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
  .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card,.tool-card,.insight,.empty,.locked{background:var(--card)!important;border:1px solid var(--line)!important;border-radius:18px!important;box-shadow:0 4px 14px rgba(15,23,42,.045)!important;color:var(--text)!important}.card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card{padding:18px!important}
  .home-status-row{background:var(--petrol)!important;color:#fff!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:12px!important;align-items:center!important}.home-status-row .status-eyebrow{font-size:10px!important;font-weight:800!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:rgba(255,255,255,.72)!important}.home-status-row .status-title{font-size:19px!important;font-weight:800!important;line-height:1.08!important;color:#fff!important;margin-top:3px!important}.home-status-badge{background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.17)!important;color:#fff!important;border-radius:999px!important;padding:7px 10px!important;font-size:10px!important;font-weight:800!important;white-space:nowrap!important}
  .h2,.qs-title,.modal h2,.ux-modal .h2,.tool-card b,.status-title{color:var(--petrol)!important;font-weight:800!important;line-height:1.15!important;letter-spacing:-.015em!important}.muted,p,small,.sub,.card-copy,.lab-copy,.radar-last,.summary-small,.day-counts{color:var(--muted)!important;line-height:1.45!important}
  #heroSmoke,.primary-action-v13{width:100%!important;min-height:52px!important;border-radius:15px!important;padding:13px 16px!important;font-size:14px!important;font-weight:800!important;line-height:1.15!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important}.primary-action-v13{background:#fff!important;color:var(--petrol)!important;border:2px solid var(--petrol)!important;box-shadow:none!important}#heroSmoke{background:var(--orange)!important;color:#fff!important;border:1px solid var(--orange)!important;box-shadow:0 4px 12px rgba(232,135,58,.18)!important}
  .radar-card{padding:18px!important}.radar-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important}.radar-head .h2{font-size:16px!important}.radar-legend,.legend{display:flex!important;gap:8px!important;flex-wrap:wrap!important;justify-content:flex-end!important;font-size:9px!important;color:var(--muted)!important}.radar-line,.timeline-line{background:#D9E4E0!important}.tick{background:#B8C8C2!important}.tick-label{color:#7A8A85!important}.radar-info,.empty,.locked{background:#F8FAF9!important;border-color:#DCE6E2!important}.event-dot.stop,.dot.stop,.radar-event.resist{background:var(--success)!important}.event-dot.smoke,.dot.smoke,.radar-event.smoke{background:#3A3F3F!important}
  .choice-grid,.risk-grid,.icon-grid,.resist-trigger-grid,.qs-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.choice,.risk-chip,.icon-choice,.resist-trigger,.qs-chip,.time-chip,.btn,.manual-win{background:#fff!important;border:1px solid var(--line)!important;color:var(--text)!important;border-radius:12px!important;min-height:44px!important;padding:10px 11px!important}.choice.selected,.risk-chip.selected,.icon-choice.selected,.resist-trigger.selected,.qs-chip.selected,.time-chip.selected{background:#ECF3F1!important;border-color:var(--petrol)!important;color:var(--petrol)!important}
  .bottom-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;z-index:80!important;width:min(100%,448px)!important;height:calc(66px + env(safe-area-inset-bottom))!important;display:none!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;padding:6px 6px env(safe-area-inset-bottom)!important;background:rgba(255,255,255,.985)!important;border-top:1px solid var(--line)!important;box-shadow:0 -4px 14px rgba(15,23,42,.04)!important}.bottom-nav.show{display:grid!important}.bottom-nav .tab{min-width:0!important;border:0!important;background:transparent!important;color:#71807C!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;font-size:10.5px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important;padding:4px 2px!important;border-radius:11px!important}.bottom-nav .tab .tab-icon{font-size:19px!important;line-height:1!important}.bottom-nav .tab.active{background:var(--mint)!important;color:var(--petrol)!important}
  #tools{display:none!important}
  #settingsToolsV13{display:grid;gap:10px;margin-top:12px}.settings-tools-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.settings-tool-btn{min-height:76px;border:1px solid var(--line);border-radius:14px;background:#fff;padding:12px;text-align:left;display:flex;flex-direction:column;gap:6px;justify-content:center}.settings-tool-btn b{font-size:12px;color:var(--petrol)}.settings-tool-btn span{font-size:10px;color:var(--muted)}
  .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{position:fixed!important;inset:0!important;z-index:100!important;align-items:center!important;justify-content:center!important;padding:16px!important;background:rgba(20,35,33,.30)!important;backdrop-filter:blur(8px)!important}.modal,.ux-modal,.quick-sheet{width:min(100%,408px)!important;max-width:408px!important;max-height:88dvh!important;margin:auto!important;border-radius:18px!important;background:#fff!important;border:1px solid var(--line)!important;box-shadow:0 24px 60px rgba(20,35,33,.18)!important;color:var(--text)!important}.modal,.ux-modal{padding:18px!important;overflow-y:auto!important}.quick-sheet{display:grid!important;grid-template-rows:minmax(0,1fr) auto!important;overflow:hidden!important}.qs-scroll{padding:18px!important;overflow-y:auto!important;min-height:0!important}.qs-actions{padding:12px 18px calc(12px + env(safe-area-inset-bottom))!important;background:#fff!important;border-top:1px solid var(--line)!important}
  .premium-intervention{border-radius:18px!important;padding:20px!important;margin:0!important;min-height:340px!important;background:linear-gradient(145deg,#1B4F4C,#2D4A3E)!important;border:0!important;box-shadow:0 18px 44px rgba(27,79,76,.22)!important}
  #onboarding{padding:10px 0!important}#onboarding .onboard{width:100%!important;max-width:408px!important;margin:0 auto!important;display:grid!important;gap:12px!important}#onboarding .onboard-top{display:flex!important;align-items:center!important;gap:10px!important;margin:0!important;padding:0!important}#onboarding .step-box{display:block!important;flex:1!important;min-width:0!important}#onboarding .step-row{display:flex!important;justify-content:space-between!important;gap:10px!important;font-size:10px!important;color:var(--muted)!important;font-weight:800!important}#onboarding .track{display:block!important;width:100%!important;height:7px!important;margin-top:7px!important;background:#E5ECE9!important;border-radius:999px!important;overflow:hidden!important}#onboarding .fill{display:block!important;height:100%!important;background:var(--success)!important;border-radius:999px!important}#onboarding .setup-card{width:100%!important;margin:0!important;padding:18px!important}
  @media(max-width:360px){.home-status-row{grid-template-columns:1fr!important}.home-status-badge{justify-self:start!important}.bottom-nav .tab{font-size:9.5px!important}.bottom-nav .tab .tab-icon{font-size:18px!important}}
  `;
  document.head.appendChild(s);
}

function ensureFourNav(){
  const nav=q('#bottomNav');if(!nav)return;
  q('[data-tab="tools"]',nav)?.remove();
  const order=['home','patterns','experiment','settings'];
  order.forEach(id=>{const el=q(`[data-tab="${id}"]`,nav);if(el)nav.appendChild(el)});
  qa('.tab',nav).forEach(t=>{if(!order.includes(t.dataset.tab))t.remove()});
}

function buildHomeActions(){
  const shell=q('.dash-v3');if(!shell)return;
  qa('[id^="homePrimaryActionsV"],#homeActionsV10,#homeActionsV11,#homeActionsV12').forEach(el=>el.remove());
  let wrap=q('#homeActionsV13');
  if(!wrap){wrap=document.createElement('div');wrap.id='homeActionsV13';wrap.className='home-actions-v13';shell.appendChild(wrap)}
  let smoke=q('#heroSmoke');if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';smoke.textContent='+ Zigarette erfassen';wrap.appendChild(smoke)}
  let acute=q('#heroAcuteV13');if(!acute){acute=document.createElement('button');acute.id='heroAcuteV13';acute.type='button';acute.className='primary-action-v13';acute.textContent='⚡ Akut-Hilfe / Drang stoppen';wrap.appendChild(acute)}
}

function moveToolsIntoSettings(){
  const settings=q('#settings');if(!settings||q('#settingsToolsV13'))return;
  const holder=document.createElement('section');holder.id='settingsToolsV13';holder.className='settings-card';
  holder.innerHTML='<div class="eyebrow">WERKZEUGE</div><div class="h2">Akuthilfe & Wissen</div><div class="settings-tools-grid"><button class="settings-tool-btn" data-tool="breathing" type="button"><b>🫁 Craving Stopper</b><span>4–7–8-Atmung starten</span></button><button class="settings-tool-btn" data-tool="knowledge" type="button"><b>🧠 KVT-Wissens-Lab</b><span>Trigger und Gewohnheiten verstehen</span></button><button class="settings-tool-btn" data-tool="distraction" type="button"><b>⚡ Blitz-Ablenkung</b><span>Autopilot kurz unterbrechen</span></button></div>';
  settings.prepend(holder);
}

function triggerAcute(){
  const proxy=q('#homeSosHero');if(proxy){proxy.click();return}
  const urge=q('[data-home-tool="urge"]');if(urge){urge.click();return}
  q('#sosBtn')?.click();
}

function wire(){
  document.addEventListener('click',e=>{
    const acute=e.target.closest('#heroAcuteV13');
    if(!acute)return;
    e.preventDefault();
    triggerAcute();
  },false);
}

function apply(){injectStyles();ensureFourNav();buildHomeActions();moveToolsIntoSettings()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,150);setTimeout(apply,700);
wire();
})();