'use strict';
(()=>{
const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];
function inject(){
 if(q('#homeHotfixV4'))return;
 const s=document.createElement('style');s.id='homeHotfixV4';s.textContent=`
 .app{max-width:448px!important;width:100%!important;margin:0 auto!important;padding-left:16px!important;padding-right:16px!important}
 .header{margin-left:-16px!important;margin-right:-16px!important;padding-left:16px!important;padding-right:16px!important}
 .dash-v3{display:grid!important;grid-template-columns:1fr!important;gap:12px!important}
 #statusCardV3{order:1!important}
 #homePrimaryActionsV4{order:2!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
 #dayRadarV3{order:3!important}
 #homeSosHero{order:4!important}
 .home-tools-label{order:5!important}
 #homeToolGrid{order:6!important}
 #labInsightV3{order:7!important}
 .home-sos-card{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:16px!important;padding:20px!important;min-width:0!important}
 .home-sos-card>span:first-child{min-width:0!important;flex:1 1 auto!important;overflow:visible!important}
 .home-sos-title{display:block!important;white-space:nowrap!important;word-break:keep-all!important;overflow-wrap:normal!important;hyphens:none!important;font-size:clamp(17px,5vw,21px)!important}
 .home-sos-sub{display:block!important;word-break:normal!important;overflow-wrap:break-word!important}
 .home-sos-icon{flex:0 0 58px!important;flex-shrink:0!important}
 .home-tool-grid,.tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important}
 .home-tool,.tool-card{height:148px!important;min-height:148px!important;max-height:148px!important;min-width:0!important;padding:16px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:hidden!important}
 .home-tool b,.tool-card b{display:block!important;line-height:1.2!important;overflow-wrap:normal!important;word-break:normal!important;hyphens:none!important}
 .home-tool small,.tool-card small{display:block!important;line-height:1.35!important;overflow-wrap:normal!important;word-break:normal!important;hyphens:none!important}
 .primary-action-v4{min-height:54px;border-radius:15px;border:1px solid #E2E8F0;padding:0 12px;font-size:11px;font-weight:850;line-height:1.2;display:flex;align-items:center;justify-content:center;text-align:center;box-shadow:0 10px 24px rgba(27,79,76,.06)}
 .primary-action-v4.smoke{background:#E8873A;border-color:#E8873A;color:#fff}
 .primary-action-v4.resist{background:#EEF7F1;border-color:#9FC9AD;color:#286B43}
 .bottom-nav .tab{font-size:11px!important}.bottom-nav .tab .tab-icon{font-size:20px!important}
 @media(max-width:390px){.home-sos-card{padding:20px!important;gap:12px!important}.home-sos-icon{flex-basis:52px!important;width:52px!important;height:52px!important}.home-tool,.tool-card{height:142px!important;min-height:142px!important;max-height:142px!important;padding:14px!important}.primary-action-v4{font-size:10.3px!important}.bottom-nav .tab{font-size:9.5px!important}.bottom-nav .tab .tab-icon{font-size:18px!important}}
 `;document.head.appendChild(s);
}
function buildPrimaryActions(){
 const shell=q('.dash-v3');if(!shell||q('#homePrimaryActionsV4'))return;
 const old=q('#heroSmoke',shell);if(old)old.remove();
 const wrap=document.createElement('div');wrap.id='homePrimaryActionsV4';
 wrap.innerHTML='<button id="heroSmokeV4" class="primary-action-v4 smoke" type="button">+ Zigarette erfassen</button><button id="heroResistV4" class="primary-action-v4 resist" type="button">Rauchdrang widerstanden</button>';
 shell.appendChild(wrap);
}
function orderHome(){const shell=q('.dash-v3');if(!shell)return;['statusCardV3','homePrimaryActionsV4','dayRadarV3','homeSosHero'].forEach(()=>{});}
function wire(){
 document.addEventListener('click',e=>{
  const s=e.target.closest('#heroSmokeV4');if(s){e.preventDefault();e.stopImmediatePropagation();if(typeof openQuickSmoke==='function')openQuickSmoke();return}
  const r=e.target.closest('#heroResistV4');if(r){e.preventDefault();e.stopImmediatePropagation();if(typeof openResistance==='function')openResistance();return}
 },true);
}
function apply(){inject();buildPrimaryActions();orderHome()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
setTimeout(apply,150);setTimeout(apply,700);wire();
})();