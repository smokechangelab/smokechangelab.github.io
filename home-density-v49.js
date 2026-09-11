// Smoke Lab v49 — zero-scroll TODAY renderer
(()=>{
  if(typeof S==='undefined'||typeof renderToday!=='function')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const en=()=>S.language==='en';
  const t=(de,eng)=>en()?eng:de;
  const base=renderToday;
  renderToday=function(){
    base();
    const root=document.getElementById('today');if(!root)return;
    const events=typeof todayEvents==='function'?todayEvents():[];
    const smoked=events.filter(e=>e.type==='smoke').length;
    const stopped=events.filter(e=>e.type==='resist').length;
    const exp=typeof experiment==='function'?experiment():null;
    const top=typeof topTrigger==='function'?topTrigger():null;
    const score=typeof controlScore==='function'?controlScore():50;
    const goal=S.goal==='reduce'?t('Reduzieren','Reduce'):t('Aufhören','Quit');
    const topText=Array.isArray(top)&&top[0]?top[0]:t('Noch keine klare Tendenz','No clear pattern yet');
    const next=smoked>0?t('Nächsten Automatismus bewusst unterbrechen.','Interrupt the next automatic moment.'):t('Beim nächsten Drang zuerst SOS testen.','Try SOS first at the next craving.');
    root.innerHTML=`
      <div class="home-compact-head">
        <div class="home-brandline"><b>SMOKE LAB</b></div>
        <div class="home-statusline"><span class="day-pill">${t('Tag','Day')} ${day()} · ${goal}</span><span class="score-pill">${score}</span></div>
      </div>
      <div class="home-actions-split">
        <button class="home-action home-log" data-action="smoke">${t('+ Zigarette','+ Log')}</button>
        <button class="home-action home-sos" data-action="craving">⚡ ${t('Drang stoppen','Stop craving')}</button>
      </div>
      <section class="home-radar-card">
        <div class="home-radar-top"><div><div class="home-radar-kicker">${t('TAGES-RADAR','DAILY RADAR')}</div><h2>${t('Heute auf einen Blick','Today at a glance')}</h2></div></div>
        <div class="home-radar-metrics">
          <div><strong>${smoked}</strong><span>${t('Zigaretten','Cigarettes')}</span></div>
          <div><strong>${stopped}</strong><span>${t('Unterbrechungen','Interruptions')}</span></div>
        </div>
        <div class="home-radar-row"><span>${t('Experiment','Experiment')}</span><b>${esc(exp?.title||t('Beobachten','Observe'))}</b></div>
        <div class="home-radar-row"><span>${t('Muster','Pattern')}</span><b>${esc(topText)}</b></div>
        <div class="home-radar-row home-next"><span>${t('Nächster Schritt','Next step')}</span><b>${esc(next)}</b></div>
      </section>`;
  };
  try{if(document.getElementById('today')?.classList.contains('active'))renderToday()}catch{}
})();
