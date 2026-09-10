'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s);
function inject(){
 if(q('#homeHotfixV4'))return;
 const s=document.createElement('style');s.id='homeHotfixV4';s.textContent=`
 .app{max-width:448px!important;width:100%!important;margin:0 auto!important;padding-left:16px!important;padding-right:16px!important}
 .header{margin-left:-16px!important;margin-right:-16px!important;padding-left:16px!important;padding-right:16px!important}
 .dash-v3{display:grid!important;grid-template-columns:1fr!important;gap:12px!important}
 #statusCardV3{order:1!important}
 #homePrimaryActionsV4{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
 #dayRadarV3{order:3!important}
 #labInsightV3{order:4!important}
 #homeSosHero,.home-tools-label,#homeToolGrid{display:none!important}
 .primary-action-v4{min-width:0!important;min-height:54px;border-radius:15px;border:1px solid #E2E8F0;padding:0 12px;font-size:11px;font-weight:850;line-height:1.2;display:flex;align-items:center;justify-content:center;text-align:center;box-shadow:0 10px 24px rgba(27,79,76,.06);white-space:normal;word-break:normal;hyphens:none}
 .primary-action-v4.smoke{background:#E8873A;border-color:#E8873A;color:#fff}
 .primary-action-v4.resist{background:#EEF7F1;border-color:#9FC9AD;color:#286B43}
 .tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important}
 .tool-card{height:148px!important;min-height:148px!important;max-height:148px!important;min-width:0!important;padding:16px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}
 .tool-card b,.tool-card small{display:block!important;word-break:normal!important;overflow-wrap:normal!important;hyphens:none!important}
 .tool-card b{line-height:1.2!important}.tool-card small{line-height:1.35!important}
 #floatingSosV4{position:fixed;z-index:80;right:max(18px,calc((100vw - 448px)/2 + 18px));bottom:calc(82px + env(safe-area-inset-bottom));width:52px;height:52px;border:1px solid rgba(232,135,58,.25);border-radius:18px;background:linear-gradient(145deg,#FFF8F1,#FFF);color:#E8873A;display:none;place-items:center;padding:0;box-shadow:0 14px 34px rgba(27,79,76,.18),0 5px 14px rgba(232,135,58,.13);font-size:22px;transition:transform .18s ease,box-shadow .18s ease}
 #floatingSosV4.show{display:grid}#floatingSosV4:active{transform:scale(.94);box-shadow:0 8px 22px rgba(27,79,76,.14)}
 #floatingSosV4:after{content:'SOS';position:absolute;right:43px;top:50%;transform:translateY(-50%);background:#fff;color:#1B4F4C;border:1px solid #E2E8F0;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:900;letter-spacing:.08em;box-shadow:0 6px 16px rgba(27,79,76,.08)}
 .bottom-nav .tab{font-size:11px!important}.bottom-nav .tab .tab-icon{font-size:20px!important}
 @media(max-width:390px){.tool-card{height:142px!important;min-height:142px!important;max-height:142px!important;padding:14px!important}.primary-action-v4{font-size:10.3px!important}.bottom-nav .tab{font-size:9.5px!important}.bottom-nav .tab .tab-icon{font-size:18px!important}#floatingSosV4{right:16px;width:50px;height:50px;border-radius:17px}}
 `;document.head.appendChild(s);
}
function buildPrimaryActions(){
 const shell=q('.dash-v3');if(!shell)return;
 const old=q('#heroSmoke',shell);if(old)old.remove();
 if(q('#homePrimaryActionsV4'))return;
 const wrap=document.createElement('div');wrap.id='homePrimaryActionsV4';
 wrap.innerHTML='<button id="heroSmokeV4" class="primary-action-v4 smoke" type="button">+ Zigarette erfassen</button><button id="heroResistV4" class="primary-action-v4 resist" type="button">Rauchdrang widerstanden</button>';
 shell.appendChild(wrap);
}
function buildFab(){
 if(q('#floatingSosV4'))return;
 const b=document.createElement('button');b.id='floatingSosV4';b.type='button';b.setAttribute('aria-label','SOS Craving Help');b.innerHTML='⚡';document.body.appendChild(b);
 const nav=q('#bottomNav');
 const sync=()=>b.classList.toggle('show',!!nav?.classList.contains('show'));
 sync();if(nav)new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});
}
function wire(){
 document.addEventListener('click',e=>{
  const s=e.target.closest('#heroSmokeV4');if(s){e.preventDefault();e.stopImmediatePropagation();if(typeof openQuickSmoke==='function')openQuickSmoke();return}
  const r=e.target.closest('#heroResistV4,#floatingSosV4');if(r){e.preventDefault();e.stopImmediatePropagation();if(typeof openResistance==='function')openResistance();return}
 },true);
}
function apply(){inject();buildPrimaryActions();buildFab()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,150);setTimeout(apply,700);wire();
})();