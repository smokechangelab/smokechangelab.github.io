'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s);
function inject(){
 if(q('#homeHotfixV6'))return;
 const s=document.createElement('style');s.id='homeHotfixV6';s.textContent=`
 .app{max-width:448px!important;width:100%!important;margin:0 auto!important;padding-left:16px!important;padding-right:16px!important}
 .header{margin-left:-16px!important;margin-right:-16px!important;padding-left:16px!important;padding-right:16px!important}
 .dash-v3{display:grid!important;grid-template-columns:1fr!important;gap:12px!important}
 #statusCardV3{order:1!important}
 #homePrimaryActionsV6{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
 #dayRadarV3{order:3!important}
 #labInsightV3{order:4!important}
 #homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 #heroSmoke,.primary-action-v6{min-width:0!important;min-height:54px!important;border-radius:15px!important;border:1px solid #E2E8F0!important;padding:0 12px!important;font-size:11px!important;font-weight:850!important;line-height:1.2!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;box-shadow:0 10px 24px rgba(27,79,76,.06)!important;white-space:normal!important;word-break:normal!important;hyphens:none!important}
 #heroSmoke{background:#E8873A!important;border-color:#E8873A!important;color:#fff!important}
 .primary-action-v6.resist{background:#fff!important;border-color:#1B4F4C!important;color:#1B4F4C!important}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important}
 .tool-card{height:148px!important;min-height:148px!important;max-height:148px!important;min-width:0!important;padding:16px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}
 .tool-card b,.tool-card small{display:block!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
 .tool-card b{line-height:1.2!important}.tool-card small{line-height:1.35!important}
 #floatingSosV6{position:fixed;z-index:80;right:max(18px,calc((100vw - 448px)/2 + 18px));bottom:calc(82px + env(safe-area-inset-bottom));width:52px;height:52px;border:1px solid rgba(232,135,58,.25);border-radius:18px;background:linear-gradient(145deg,#FFF8F1,#FFF);color:#E8873A;display:none;place-items:center;padding:0;box-shadow:0 14px 34px rgba(27,79,76,.18),0 5px 14px rgba(232,135,58,.13);font-size:22px;transition:transform .18s ease,box-shadow .18s ease}
 #floatingSosV6.show{display:grid}#floatingSosV6:active{transform:scale(.94)}
 #floatingSosV6:after{content:'SOS';position:absolute;right:43px;top:50%;transform:translateY(-50%);background:#fff;color:#1B4F4C;border:1px solid #E2E8F0;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:900;letter-spacing:.08em;box-shadow:0 6px 16px rgba(27,79,76,.08)}
 #onboarding .onboard{max-width:448px!important;width:100%!important;margin:0 auto!important}
 #onboarding .setup-card{padding:20px!important}
 #onboarding .onboard-top{margin:0 0 10px!important}
 @media(max-width:390px){.tool-card{height:142px!important;min-height:142px!important;max-height:142px!important;padding:14px!important}#heroSmoke,.primary-action-v6{font-size:10.3px!important}#floatingSosV6{right:16px;width:50px;height:50px;border-radius:17px}}
 `;document.head.appendChild(s);
}
function buildPrimaryActions(){
 const shell=q('.dash-v3');if(!shell)return;
 let wrap=q('#homePrimaryActionsV6');
 if(!wrap){wrap=document.createElement('div');wrap.id='homePrimaryActionsV6';shell.appendChild(wrap)}
 let smoke=q('#heroSmoke');
 if(smoke&&smoke.parentElement!==wrap)wrap.appendChild(smoke);
 if(!smoke){
  smoke=document.createElement('button');smoke.id='heroSmoke';smoke.type='button';smoke.textContent='+ Zigarette erfassen';wrap.appendChild(smoke);
 }
 let resist=q('#heroResistV6');
 if(!resist){resist=document.createElement('button');resist.id='heroResistV6';resist.type='button';resist.className='primary-action-v6 resist';resist.textContent='Rauchdrang widerstanden';wrap.appendChild(resist)}
}
function buildFab(){
 if(q('#floatingSosV6'))return;
 const b=document.createElement('button');b.id='floatingSosV6';b.type='button';b.setAttribute('aria-label','SOS Craving Help');b.textContent='⚡';document.body.appendChild(b);
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
function wire(){
 document.addEventListener('click',e=>{
  const r=e.target.closest('#heroResistV6,#floatingSosV6');
  if(!r)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  triggerResistance();
 },true);
}
function apply(){inject();buildPrimaryActions();buildFab()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,150);setTimeout(apply,700);wire();
})();