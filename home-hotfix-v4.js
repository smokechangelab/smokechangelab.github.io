'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s);
function inject(){
 if(q('#masterResetV7'))return;
 const s=document.createElement('style');s.id='masterResetV7';s.textContent=`
 *{box-sizing:border-box}
 .app{width:100%!important;max-width:448px!important;margin:0 auto!important;padding-left:16px!important;padding-right:16px!important;padding-bottom:calc(88px + env(safe-area-inset-bottom))!important}
 .screen,.main-screen{width:100%!important;max-width:448px!important;margin-left:auto!important;margin-right:auto!important;min-width:0!important}
 .header{margin-left:-16px!important;margin-right:-16px!important;padding-left:16px!important;padding-right:16px!important}
 .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:16px!important;width:100%!important;min-width:0!important}
 #statusCardV3{order:1!important;min-width:0!important}
 #homePrimaryActionsV7{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;min-width:0!important}
 #dayRadarV3{order:3!important;min-width:0!important}
 #labInsightV3{order:4!important;min-width:0!important}
 #homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 #statusCardV3>* ,#dayRadarV3>* ,#labInsightV3>*{min-width:0!important}
 #heroSmoke,.primary-action-v7{min-width:0!important;min-height:54px!important;border-radius:15px!important;border:1px solid #E2E8F0!important;padding:0 12px!important;font-size:11px!important;font-weight:800!important;line-height:1.2!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;box-shadow:0 8px 22px rgba(27,79,76,.06)!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
 #heroSmoke{background:#E8873A!important;border-color:#E8873A!important;color:#fff!important}
 .primary-action-v7.resist{background:#fff!important;border-color:#1B4F4C!important;color:#1B4F4C!important}
 .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel{padding:16px!important}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important;width:100%!important}
 .tool-card{min-width:0!important;height:148px!important;min-height:148px!important;max-height:148px!important;padding:16px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}
 .tool-card b,.tool-card small,.h2,.status-title,.lab-head b{word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important;min-width:0!important}
 .tool-card b{line-height:1.2!important}.tool-card small{line-height:1.35!important}
 .bottom-nav{grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;padding-left:8px!important;padding-right:8px!important}
 .bottom-nav .tab{min-width:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;font-size:10.5px!important;font-weight:760!important;line-height:1.05!important;white-space:nowrap!important;text-align:center!important;padding:4px 2px!important}
 .bottom-nav .tab .tab-icon{font-size:19px!important;line-height:1!important;display:block!important}
 #floatingSosV7{position:fixed;z-index:80;right:max(18px,calc((100vw - 448px)/2 + 18px));bottom:calc(82px + env(safe-area-inset-bottom));width:52px;height:52px;border:1px solid rgba(232,135,58,.25);border-radius:18px;background:linear-gradient(145deg,#FFF8F1,#FFF);color:#E8873A;display:none;place-items:center;padding:0;box-shadow:0 14px 34px rgba(27,79,76,.18),0 5px 14px rgba(232,135,58,.13);font-size:22px;transition:transform .18s ease,box-shadow .18s ease}
 #floatingSosV7.show{display:grid!important}#floatingSosV7:active{transform:scale(.94)}
 #floatingSosV7:after{content:'SOS';position:absolute;right:43px;top:50%;transform:translateY(-50%);background:#fff;color:#1B4F4C;border:1px solid #E2E8F0;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:900;letter-spacing:.08em;box-shadow:0 6px 16px rgba(27,79,76,.08);white-space:nowrap}
 #onboarding{padding-left:0!important;padding-right:0!important}
 #onboarding .onboard{width:100%!important;max-width:448px!important;margin:0 auto!important;min-width:0!important;gap:12px!important}
 #onboarding .setup-card{padding:20px!important;width:100%!important;min-width:0!important}
 #onboarding .onboard-top{width:100%!important;margin:0!important;min-width:0!important}
 #onboarding .step-box.wizard-step-inline{width:100%!important;margin:0 0 16px!important;padding:0 0 14px!important;border-bottom:1px solid #E2E8F0!important;min-width:0!important}
 #onboarding .step-row{width:100%!important;min-width:0!important}
 #onboarding .track{width:100%!important;max-width:100%!important;margin-top:6px!important}
 @media(max-width:390px){.card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel{padding:16px!important}.tool-card{height:142px!important;min-height:142px!important;max-height:142px!important;padding:14px!important}#heroSmoke,.primary-action-v7{font-size:10.3px!important}.bottom-nav .tab{font-size:9.3px!important}.bottom-nav .tab .tab-icon{font-size:18px!important}#floatingSosV7{right:16px;width:50px;height:50px;border-radius:17px}}
 `;document.head.appendChild(s);
}
function buildPrimaryActions(){
 const shell=q('.dash-v3');if(!shell)return;
 q('#homePrimaryActionsV6')?.remove();
 let wrap=q('#homePrimaryActionsV7');
 if(!wrap){wrap=document.createElement('div');wrap.id='homePrimaryActionsV7';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');
 if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);
 if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';smoke.textContent='+ Zigarette erfassen';wrap.appendChild(smoke)}
 let resist=q('#heroResistV7');
 if(!resist){resist=document.createElement('button');resist.id='heroResistV7';resist.type='button';resist.className='primary-action-v7 resist';resist.textContent='Rauchdrang widerstanden';wrap.appendChild(resist)}
}
function buildFab(){
 q('#floatingSosV6')?.remove();
 if(q('#floatingSosV7'))return;
 const b=document.createElement('button');b.id='floatingSosV7';b.type='button';b.setAttribute('aria-label','SOS Akuthilfe');b.textContent='⚡';document.body.appendChild(b);
 const nav=q('#bottomNav');
 const sync=()=>b.classList.toggle('show',!!nav?.classList.contains('show'));
 sync();if(nav)new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});
}
function triggerResistance(){
 const proxy=q('#homeSosHero');
 if(proxy){proxy.click();return}
 const fallback=q('[data-home-tool="urge"]');
 if(fallback)fallback.click();
}
let movingWizard=false;
function integrateOnboardingProgress(){
 if(movingWizard)return;
 const step=q('#onboarding .step-box'),card=q('#onboarding .setup-card');
 if(!step||!card||card.contains(step))return;
 movingWizard=true;
 const first=card.firstElementChild;
 if(first)first.after(step);else card.prepend(step);
 step.classList.add('wizard-step-inline');
 movingWizard=false;
}
function watchOnboarding(){
 const ob=q('#onboarding');if(!ob)return;
 integrateOnboardingProgress();
 const mo=new MutationObserver(()=>requestAnimationFrame(integrateOnboardingProgress));
 mo.observe(ob,{childList:true,subtree:true});
}
function wire(){
 document.addEventListener('click',e=>{
  const r=e.target.closest('#heroResistV7,#floatingSosV7');
  if(!r)return;
  e.preventDefault();e.stopImmediatePropagation();triggerResistance();
 },true);
}
function apply(){inject();buildPrimaryActions();buildFab();integrateOnboardingProgress()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{apply();watchOnboarding()},{once:true});else{apply();watchOnboarding()}
setTimeout(apply,150);setTimeout(apply,700);wire();
})();