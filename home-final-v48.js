// Smoke Lab v48.4 — final structured TODAY dashboard
(()=>{
  if(typeof S==='undefined'||typeof renderToday!=='function')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const en=()=>S.language==='en';
  const t=(de,eng)=>en()?eng:de;
  const greeting=()=>{const h=new Date().getHours();if(h<11)return t('Guten Morgen','Good morning');if(h<18)return t('Guten Tag','Good afternoon');return t('Guten Abend','Good evening')};
  const base=renderToday;
  renderToday=function(){
    base();
    const root=document.getElementById('today');if(!root)return;
    const name=(S.name||'').trim();
    const events=typeof todayEvents==='function'?todayEvents():[];
    const smoked=events.filter(e=>e.type==='smoke').length;
    const stopped=events.filter(e=>e.type==='resist').length;
    const exp=typeof experiment==='function'?experiment():null;
    const top=typeof topTrigger==='function'?topTrigger():null;
    const goal=S.goal==='reduce'?t('Reduzieren','Reduce'):t('Aufhören','Quit');
    const topText=Array.isArray(top)&&top[0]?top[0]:t('Noch nicht genug Daten','Not enough data yet');
    const next=smoked>0?t('Den nächsten automatischen Moment bewusst unterbrechen.','Interrupt the next automatic moment on purpose.'):t('Beim nächsten Drang zuerst SOS statt Autopilot.','At the next craving, try SOS before autopilot.');
    root.innerHTML=`
      <header class="home-greeting">
        <span>${greeting()}${name?',':''}</span>
        <h1>${name?esc(name):t('Willkommen','Welcome')}</h1>
      </header>
      <section class="home-status-card">
        <div class="home-status-copy"><span>${t('STATUS','STATUS')}</span><strong>${t('Tag','Day')} ${day()} · ${goal}</strong></div>
        <div class="home-status-badge lab-button-safe">${stopped} ${stopped===1?t('Drang besiegt','craving beaten'):t('Dränge besiegt','cravings beaten')}</div>
      </section>
      <section class="home-actions">
        <button class="home-action home-log lab-button-safe" data-action="smoke">${t('+ ZIGARETTE ERFASSEN','+ LOG CIGARETTE')}</button>
        <button class="home-action home-sos lab-button-safe" data-action="craving">⚡ ${t('DRANG STOPPEN (AKUT-HILFE)','STOP CRAVING (SOS)')}</button>
      </section>
      <section class="home-radar-card">
        <div class="home-radar-kicker">${t('TAGES-RADAR','DAILY RADAR')}</div>
        <h2>${t('Heute auf einen Blick','Today at a glance')}</h2>
        <div class="home-radar-metrics">
          <div><strong>${smoked}</strong><span>${t('Zigaretten','Cigarettes')}</span></div>
          <div><strong>${stopped}</strong><span>${t('Unterbrechungen','Interruptions')}</span></div>
        </div>
        <div class="home-radar-row"><span>${t('Heutiges Experiment','Today’s experiment')}</span><b>${esc(exp?.title||t('Beobachten','Observe'))}</b></div>
        <div class="home-radar-row"><span>${t('Aktueller Hinweis','Current insight')}</span><b>${esc(topText)}</b></div>
        <div class="home-radar-row home-next"><span>${t('Nächster Schritt','Next step')}</span><b>${esc(next)}</b></div>
      </section>`;
  };
  try{if(document.getElementById('today')?.classList.contains('active'))renderToday()}catch{}
})();