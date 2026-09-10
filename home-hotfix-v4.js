'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s);
function inject(){
 if(q('#designStandardV8'))return;
 const old=q('#masterResetV7');if(old)old.remove();
 const s=document.createElement('style');s.id='designStandardV8';s.textContent=`
 *{box-sizing:border-box}
 html,body{background:#F2F5F4!important}
 body{margin:0!important;color:#1A1A1A!important;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
 .app{width:100%!important;max-width:448px!important;margin:0 auto!important;padding:0 20px calc(100px + env(safe-area-inset-bottom))!important;min-width:0!important}
 .screen,.main-screen{width:100%!important;max-width:448px!important;margin:0 auto!important;padding-top:24px!important;padding-bottom:24px!important;min-width:0!important}
 .header{height:58px!important;min-height:58px!important;margin:0 -20px!important;padding:0 20px!important;background:#F2F5F4!important;border:0!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;position:sticky!important;top:0!important;z-index:50!important}
 .header-actions{display:none!important}.brand{width:172px!important;flex:0 0 172px!important;height:30px!important;background-position:left center!important}
 .dash-v3{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:20px!important;width:100%!important;min-width:0!important}
 #statusCardV3{order:1!important;min-width:0!important}
 #homePrimaryActionsV8{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;min-width:0!important}
 #dayRadarV3{order:3!important;min-width:0!important}
 #labInsightV3,#homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 #statusCardV3>* ,#dayRadarV3>*{min-width:0!important}
 #heroSmoke,.primary-action-v8{min-width:0!important;min-height:56px!important;border-radius:16px!important;border:1px solid #E2E8F0!important;padding:0 14px!important;font-size:13px!important;font-weight:700!important;line-height:1.2!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;box-shadow:0 1px 3px rgba(15,23,42,.07)!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
 #heroSmoke{background:#E8873A!important;border-color:#E8873A!important;color:#fff!important}
 .primary-action-v8.resist{background:#fff!important;border-color:#1B4F4C!important;color:#1B4F4C!important}
 .card,.radar-card,.lab-card,.settings-card,.experiment-card,.panel,.status-card,.home-status-row{background:#fff!important;border:1px solid #E2E8F0!important;border-radius:16px!important;padding:20px!important;box-shadow:0 1px 3px rgba(15,23,42,.07)!important;min-width:0!important}
 .home-status-row{color:#1A1A1A!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:12px!important;align-items:center!important}
 .home-status-row .status-eyebrow{color:#64706D!important;opacity:1!important;font-size:10px!important}.home-status-row .status-title{color:#1B4F4C!important;font-size:19px!important;font-weight:800!important;line-height:1.15!important}.home-status-badge{background:#EAF1EF!important;border:1px solid #D9E5E1!important;color:#1B4F4C!important;font-size:10px!important;font-weight:700!important;padding:7px 10px!important;border-radius:999px!important;white-space:nowrap!important}
 .h2,.qs-title,.ux-modal .h2,.modal h2,.tool-card b,.status-title,.radar-head .h2,.lab-head b{color:#1B4F4C!important;font-weight:700!important;line-height:1.18!important;letter-spacing:-.012em!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important;min-width:0!important}
 p,small,.muted,.sub,.card-copy,.lab-copy,.radar-last{color:#66736F!important;line-height:1.5!important}.card p,.panel p,.settings-card p,.experiment-card p{font-size:13px!important}.eyebrow,.kicker,.label{font-size:11px!important}
 .radar-card{padding:20px!important}.radar-head{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:12px!important;min-width:0!important}.radar-head .h2{font-size:17px!important}.radar-legend{display:flex!important;gap:8px!important;flex-wrap:wrap!important;justify-content:flex-end!important;font-size:10px!important}.radar-axis{margin-top:16px!important}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important;width:100%!important}.tool-card{min-width:0!important;height:148px!important;padding:20px!important;background:#fff!important;border:1px solid #E2E8F0!important;border-radius:16px!important;box-shadow:0 1px 3px rgba(15,23,42,.07)!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}.tool-card b{font-size:14px!important}.tool-card small{font-size:11px!important;line-height:1.4!important}
 .bottom-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;width:min(100%,448px)!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;padding:8px 8px calc(8px + env(safe-area-inset-bottom))!important;background:rgba(255,255,255,.98)!important;border-top:1px solid #E2E8F0!important;box-shadow:0 -4px 18px rgba(15,23,42,.05)!important;z-index:70!important}
 .bottom-nav .tab{min-width:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;font-size:11px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important;text-align:center!important;padding:5px 2px!important}.bottom-nav .tab .tab-icon{font-size:20px!important;line-height:1!important;display:block!important}.bottom-nav .tab.active{background:#EAF1EF!important;border-radius:12px!important;color:#1B4F4C!important}
 #floatingSosV8{position:fixed;z-index:80;right:max(20px,calc((100vw - 448px)/2 + 20px));bottom:calc(86px + env(safe-area-inset-bottom));width:50px;height:50px;border:1px solid rgba(232,135,58,.22);border-radius:16px;background:#fff;color:#E8873A;display:none;place-items:center;padding:0;box-shadow:0 8px 24px rgba(27,79,76,.14);font-size:21px;transition:transform .18s ease,box-shadow .18s ease}#floatingSosV8.show{display:grid!important}#floatingSosV8:active{transform:scale(.95)}#floatingSosV8:after{content:'SOS';position:absolute;right:42px;top:50%;transform:translateY(-50%);background:#fff;color:#1B4F4C;border:1px solid #E2E8F0;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:800;letter-spacing:.06em;box-shadow:0 2px 8px rgba(15,23,42,.08);white-space:nowrap}
 #onboarding{padding:24px 0!important}.onboard,#onboarding .onboard{width:100%!important;max-width:408px!important;margin:0 auto!important;padding:0!important;min-width:0!important;display:grid!important;gap:20px!important}#onboarding .setup-card{width:100%!important;min-width:0!important;padding:20px!important;background:#fff!important;border:1px solid #E2E8F0!important;border-radius:16px!important;box-shadow:0 1px 3px rgba(15,23,42,.07)!important}#onboarding .step-box.wizard-step-inline{width:100%!important;margin:0 0 18px!important;padding:0 0 16px!important;border-bottom:1px solid #E2E8F0!important;min-width:0!important}#onboarding .step-row{width:100%!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important}#onboarding .track{width:100%!important;max-width:100%!important;margin-top:8px!important}
 .overlay,.modal-overlay,.quick-sheet-overlay,.ux-overlay{padding:20px!important;align-items:center!important;justify-content:center!important}.modal,.ux-modal,.quick-sheet{width:min(100%,408px)!important;max-width:408px!important;max-height:88dvh!important;margin:auto!important;border-radius:16px!important;background:#fff!important;border:1px solid #E2E8F0!important;box-shadow:0 20px 60px rgba(15,23,42,.18)!important}.modal,.ux-modal{padding:20px!important}.quick-sheet-overlay.open{align-items:center!important}.quick-sheet{grid-template-rows:minmax(0,1fr) auto!important}.qs-scroll{padding:20px!important}.qs-actions{padding:14px 20px calc(14px + env(safe-area-inset-bottom))!important}
 .premium-intervention{border-radius:16px!important;padding:20px!important;margin:0!important;min-height:380px!important}
 @media(max-width:390px){.app{padding-left:20px!important;padding-right:20px!important}.screen,.main-screen{padding-top:20px!important;padding-bottom:20px!important}.bottom-nav .tab{font-size:10.5px!important}.bottom-nav .tab .tab-icon{font-size:20px!important}#heroSmoke,.primary-action-v8{font-size:12px!important}.tool-card{height:144px!important;padding:18px!important}#floatingSosV8{right:20px}}
 `;document.head.appendChild(s);
}
function buildPrimaryActions(){
 const shell=q('.dash-v3');if(!shell)return;
 q('#homePrimaryActionsV6')?.remove();q('#homePrimaryActionsV7')?.remove();
 let wrap=q('#homePrimaryActionsV8');if(!wrap){wrap=document.createElement('div');wrap.id='homePrimaryActionsV8';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);if(!smoke){smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';smoke.textContent='+ Zigarette erfassen';wrap.appendChild(smoke)}
 let resist=q('#heroResistV8');if(!resist){resist=document.createElement('button');resist.id='heroResistV8';resist.type='button';resist.className='primary-action-v8 resist';resist.textContent='Rauchdrang widerstanden';wrap.appendChild(resist)}
}
function buildFab(){
 q('#floatingSosV6')?.remove();q('#floatingSosV7')?.remove();if(q('#floatingSosV8'))return;
 const b=document.createElement('button');b.id='floatingSosV8';b.type='button';b.setAttribute('aria-label','SOS Akuthilfe');b.textContent='⚡';document.body.appendChild(b);
 const nav=q('#bottomNav');const sync=()=>b.classList.toggle('show',!!nav?.classList.contains('show'));sync();if(nav)new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});
}
function triggerResistance(){const proxy=q('#homeSosHero');if(proxy){proxy.click();return}const fallback=q('[data-home-tool="urge"]');if(fallback)fallback.click()}
let movingWizard=false;
function integrateOnboardingProgress(){
 if(movingWizard)return;const step=q('#onboarding .step-box'),card=q('#onboarding .setup-card');if(!step||!card||card.contains(step))return;
 movingWizard=true;card.prepend(step);step.classList.add('wizard-step-inline');movingWizard=false;
}
function watchOnboarding(){const ob=q('#onboarding');if(!ob)return;integrateOnboardingProgress();new MutationObserver(()=>requestAnimationFrame(integrateOnboardingProgress)).observe(ob,{childList:true,subtree:true})}
function wire(){document.addEventListener('click',e=>{const r=e.target.closest('#heroResistV8,#floatingSosV8');if(!r)return;e.preventDefault();e.stopImmediatePropagation();triggerResistance()},true)}
function apply(){inject();buildPrimaryActions();buildFab();integrateOnboardingProgress()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{apply();watchOnboarding()},{once:true});else{apply();watchOnboarding()}
setTimeout(apply,150);setTimeout(apply,700);wire();
})();