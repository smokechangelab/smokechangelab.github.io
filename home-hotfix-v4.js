'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function injectStyles(){
  q('#referenceLockedV9')?.remove();
  if(q('#cleanResetV10')) return;
  const s=document.createElement('style');
  s.id='cleanResetV10';
  s.textContent=`
  :root{--bg-color:#F2F5F4;--card-bg:#FFFFFF;--text-main:#1B4F4C;--accent-orange:#E8873A;--border-subtle:#E2E8F0;--muted:#64748B}
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%;background:var(--bg-color)!important}
  body{color:var(--text-main)!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;-webkit-font-smoothing:antialiased}
  .app{width:100%!important;max-width:440px!important;margin:0 auto!important;min-height:100dvh!important;padding:0 16px calc(94px + env(safe-area-inset-bottom))!important}
  .screen,.main-screen{width:100%!important;max-width:408px!important;margin:0 auto!important;padding:20px 0!important;min-width:0!important}
  .header{height:58px!important;min-height:58px!important;margin:0 -16px 8px!important;padding:0 16px!important;background:var(--bg-color)!important;border:0!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;position:sticky!important;top:0!important;z-index:50!important}
  .header-actions{display:none!important}.brand{width:174px!important;flex:0 0 174px!important;height:30px!important;background-position:left center!important}
  .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:16px!important;width:100%!important}
  #statusCardV3{order:1!important}.home-actions-v10{order:2!important;display:flex!important;flex-direction:column!important;gap:10px!important}.home-actions-v10+#dayRadarV3{order:3!important}#dayRadarV3{order:3!important}
  #labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
  .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row,.setup-card,.tool-card{background:var(--card-bg)!important;border:1px solid var(--border-subtle)!important;border-radius:20px!important;padding:20px!important;box-shadow:0 2px 10px rgba(0,0,0,.03)!important;min-width:0!important}
  .home-status-row{background:#1B4F4C!important;color:#fff!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:12px!important;align-items:center!important}
  .home-status-row .status-eyebrow{color:rgba(255,255,255,.78)!important;font-size:11px!important;letter-spacing:.09em!important;text-transform:uppercase!important;font-weight:700!important}.home-status-row .status-title{color:#fff!important;font-size:20px!important;line-height:1.1!important;font-weight:800!important;margin-top:3px!important}.home-status-badge{background:rgba(255,255,255,.15)!important;border:0!important;color:#fff!important;padding:7px 12px!important;border-radius:20px!important;font-size:12px!important;font-weight:600!important;white-space:nowrap!important}
  #heroSmoke,.primary-action-v10{width:100%!important;min-height:54px!important;border-radius:16px!important;padding:14px 16px!important;font-size:15px!important;font-weight:800!important;line-height:1.2!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
  #heroSmoke{background:#E8873A!important;color:#fff!important;border:0!important;box-shadow:0 4px 12px rgba(232,135,58,.2)!important}.primary-action-v10{background:#fff!important;color:#1B4F4C!important;border:2px solid #1B4F4C!important;box-shadow:none!important}
  .radar-card{padding:20px!important}.radar-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important}.radar-head .h2{font-size:16px!important;font-weight:800!important;color:#1B4F4C!important;line-height:1.2!important}.radar-head .eyebrow{font-size:12px!important;color:#64748B!important;font-weight:700!important}.radar-last,.muted,p,small{color:#64748B!important;line-height:1.45!important}
  .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}.tool-card{height:auto!important;min-height:132px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.tool-card b{font-size:14px!important;color:#1B4F4C!important;line-height:1.2!important}.tool-card small{font-size:11px!important;line-height:1.4!important;color:#64748B!important}
  .bottom-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;width:min(100%,440px)!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;padding:8px 8px calc(8px + env(safe-area-inset-bottom))!important;background:rgba(255,255,255,.98)!important;border-top:1px solid #E2E8F0!important;z-index:70!important}.bottom-nav .tab{min-width:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;font-size:11px!important;line-height:1!important;font-weight:700!important;white-space:nowrap!important;padding:6px 2px!important}.bottom-nav .tab .tab-icon{font-size:20px!important;line-height:1!important}.bottom-nav .tab.active{background:#EAF1EF!important;border-radius:12px!important;color:#1B4F4C!important}
  #floatingSosV10{position:fixed;z-index:80;right:max(16px,calc((100vw - 440px)/2 + 16px));bottom:calc(86px + env(safe-area-inset-bottom));width:48px;height:48px;border-radius:16px;border:1px solid rgba(232,135,58,.25);background:#fff;color:#E8873A;display:none;place-items:center;box-shadow:0 8px 20px rgba(27,79,76,.14);font-size:21px;padding:0}#floatingSosV10.show{display:grid!important}
  #onboarding{padding:20px 0!important}#onboarding .onboard{width:100%!important;max-width:408px!important;margin:0 auto!important;display:grid!important;gap:16px!important}#onboarding .setup-card{width:100%!important;margin:0!important;padding:20px!important}#onboarding .step-box.wizard-step-inline{width:100%!important;margin:0 0 14px!important;padding:0 0 14px!important;border-bottom:1px solid #E2E8F0!important}#onboarding .track{width:100%!important;margin-top:8px!important}
  .choice-grid,.risk-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.choice,.risk-chip{min-height:50px!important;border-radius:12px!important;border:1px solid #E2E8F0!important;background:#fff!important;padding:12px!important;text-align:left!important}.choice.selected,.risk-chip.selected{border-color:#1B4F4C!important;background:#F2F5F4!important}
  .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{padding:16px!important;align-items:center!important;justify-content:center!important;background:rgba(20,35,33,.32)!important;backdrop-filter:blur(8px)!important}.modal,.ux-modal,.quick-sheet{width:min(100%,408px)!important;max-width:408px!important;max-height:88dvh!important;margin:auto!important;border-radius:20px!important;background:#fff!important;border:1px solid #E2E8F0!important;box-shadow:0 20px 60px rgba(20,35,33,.20)!important}.modal,.ux-modal{padding:20px!important}.qs-scroll{padding:20px!important}.qs-actions{padding:14px 20px calc(14px + env(safe-area-inset-bottom))!important}
  .premium-intervention{border-radius:20px!important;padding:22px!important;background:linear-gradient(145deg,#1B4F4C,#2D4A3E)!important;box-shadow:0 20px 50px rgba(27,79,76,.24)!important}
  `;
  document.head.appendChild(s);
}

function buildHomeActions(){
  const shell=q('.dash-v3'); if(!shell) return;
  qa('[id^="homePrimaryActionsV"]').forEach(el=>el.remove());
  let wrap=q('#homeActionsV10');
  if(!wrap){wrap=document.createElement('div');wrap.id='homeActionsV10';wrap.className='home-actions-v10';shell.appendChild(wrap)}
  let smoke=q('#heroSmoke');
  if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);
  if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';smoke.textContent='+ Zigarette erfassen';wrap.appendChild(smoke)}
  let acute=q('#heroAcuteV10');
  if(!acute){acute=document.createElement('button');acute.id='heroAcuteV10';acute.type='button';acute.className='primary-action-v10';acute.textContent='⚡ Akut-Hilfe / Drang stoppen';wrap.appendChild(acute)}
}

function removeSavingsTool(){
  qa('.tool-card,button,[role="button"],.card').forEach(el=>{
    if(!el.isConnected) return;
    const text=(el.textContent||'').replace(/\s+/g,' ').trim();
    if(/Ersparnis[- ]?Rechner|Sparrechner|Geld gespart|Schachtelpreis|Preis pro Schachtel/i.test(text)){
      const card=el.closest('.tool-card')||el;
      if(card && card.id!=='statusCardV3' && card.id!=='dayRadarV3') card.remove();
    }
  });
}

function buildFab(){
  qa('[id^="floatingSosV"]').forEach(el=>el.remove());
  if(q('#floatingSosV10'))return;
  const b=document.createElement('button');b.id='floatingSosV10';b.type='button';b.setAttribute('aria-label','Akut-Hilfe');b.textContent='⚡';document.body.appendChild(b);
  const nav=q('#bottomNav');const sync=()=>b.classList.toggle('show',!!nav?.classList.contains('show'));sync();if(nav)new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});
}

function triggerAcute(){
  const proxy=q('#homeSosHero'); if(proxy){proxy.click();return}
  const urge=q('[data-home-tool="urge"]'); if(urge){urge.click();return}
  const sos=q('#sosBtn'); if(sos){sos.click();}
}

let movingWizard=false;
function integrateOnboardingProgress(){
  if(movingWizard)return;
  const step=q('#onboarding .step-box'),card=q('#onboarding .setup-card');
  if(!step||!card||card.contains(step))return;
  movingWizard=true;card.prepend(step);step.classList.add('wizard-step-inline');movingWizard=false;
}

function smoothGoalAdvance(target){
  const onboarding=q('#onboarding'); if(!onboarding||!onboarding.classList.contains('active')) return;
  const stepText=(q('#onboarding .step-row')?.textContent||'').replace(/\s+/g,' ');
  if(!/(1\s*\/\s*2|ZIEL|VERÄNDERN)/i.test(stepText+ ' '+(onboarding.textContent||''))) return;
  if(!target.closest('.choice')) return;
  setTimeout(()=>{
    const next=qa('#onboarding button').find(b=>/weiter|nächste|fortfahren/i.test((b.textContent||'').trim()) && !b.disabled);
    if(next) next.click();
  },200);
}

function watch(){
  const root=document.body;
  const observer=new MutationObserver(()=>requestAnimationFrame(()=>{integrateOnboardingProgress();removeSavingsTool();buildHomeActions();}));
  observer.observe(root,{childList:true,subtree:true});
}

function wire(){
  document.addEventListener('click',e=>{
    const acute=e.target.closest('#heroAcuteV10,#floatingSosV10');
    if(acute){e.preventDefault();e.stopImmediatePropagation();triggerAcute();return}
    smoothGoalAdvance(e.target);
  },true);
}

function apply(){injectStyles();buildHomeActions();buildFab();integrateOnboardingProgress();removeSavingsTool()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{apply();watch()},{once:true});else{apply();watch()}
setTimeout(apply,150);setTimeout(apply,700);wire();
})();