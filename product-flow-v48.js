// Smoke Lab v48.1 — strict separation: SOS intervention vs. cigarette journal
(()=>{
  if(typeof S==='undefined') return;
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab product flow:',e)}};
  const isEn=()=>S.language==='en';
  const t=(de,en)=>isEn()?en:de;

  function guessedTrigger(){
    try{
      const top=typeof topTrigger==='function'?topTrigger():null;
      if(Array.isArray(top)&&top[0]) return top[0];
    }catch{}
    return 'Pause / Leerlauf';
  }

  function removeSmokeBranches(root=document){
    root.querySelectorAll?.('[data-v48-smoked]').forEach(btn=>btn.remove());
  }

  function labelHomeActions(){
    const sos=document.querySelector('#today [data-action="craving"]');
    const log=document.querySelector('#today [data-action="smoke"]');
    if(sos) sos.textContent=t('DRANG STOPPEN (SOS)','STOP CRAVING (SOS)');
    if(log) log.textContent=t('+ ZIGARETTE ERFASSEN','+ LOG CIGARETTE');
  }

  // SOS starts support immediately. No cigarette-log questionnaire is part of this route.
  openCraving=function(){
    clearInterval(typeof timer!=='undefined'?timer:null);
    c={step:0,trigger:guessedTrigger(),intensity:3,context:null};
    if(typeof flow!=='undefined') flow={round:1,strategy:null,post:null};
    craving?.classList.remove('open');
    intervention?.classList.add('open');
    if(typeof startIntervention==='function') startIntervention(1);
    removeSmokeBranches(intervention);
  };

  // After every SOS exercise, only reassess the craving. Never route to openSmoke().
  showOutcome=function(){
    clearInterval(typeof timer!=='undefined'?timer:null);
    if(!interventionBody)return;
    interventionBody.innerHTML=`<div class="v48-outcome sos-outcome"><div class="eyebrow">${t('KURZ CHECKEN','QUICK CHECK')}</div><h2>${t('Wie ist der Drang jetzt?','How is the craving now?')}</h2><p>${t('Nur kurz einschätzen — ohne Bewertung.','Just check in briefly — no judgement.')}</p><div class="v48-outcome-grid"><button class="select" data-sos-outcome="down">${t('Schwächer','Weaker')}</button><button class="select" data-sos-outcome="same">${t('Ähnlich','About the same')}</button><button class="select" data-sos-outcome="up">${t('Stärker','Stronger')}</button></div><button class="btn ghost full sos-close" data-sos-close>${t('SOS beenden','End SOS')}</button></div>`;
  };

  function logInterrupted(outcome){
    safe(()=>{
      S.events.push({
        ts:Date.now(),
        type:'resist',
        trigger:c?.trigger||null,
        intensity:c?.intensity||3,
        context:c?.context||null,
        outcome,
        strategy:(typeof flow!=='undefined'&&flow?.strategy)||'SOS',
        round:(typeof flow!=='undefined'&&flow?.round)||1,
        source:'sos'
      });
      save();
    });
  }

  function showDefeated(){
    logInterrupted('down');
    interventionBody.innerHTML=`<div class="sos-success"><div class="sos-success-dot">✓</div><div><div class="eyebrow">${t('DRANG BESIEGT','CRAVING BEATEN')}</div><h2>${t('Drang besiegt.','Craving beaten.')}</h2><p>${t('Der Impuls wurde unterbrochen. Genau diese Momente stärken deine Kontrolle.','You interrupted the impulse. These are the moments that build control.')}</p></div><button class="btn primary full" data-sos-complete>${t('Zurück zu HEUTE','Back to TODAY')}</button></div>`;
  }

  function showStillThere(outcome){
    interventionBody.innerHTML=`<div class="v48-result sos-still"><div class="eyebrow">${t('DRANG NOCH DA','CRAVING STILL HERE')}</div><h2>${outcome==='up'?t('Dann wechseln wir die Strategie.','Let’s switch strategies.'):t('Wir probieren noch eine andere Unterbrechung.','Let’s try one more interruption.')}</h2><p>${t('Kein Protokoll, keine Bewertung — nur eine zweite kurze Hilfe.','No logging, no judgement — just one more short support step.')}</p><button class="btn primary full" data-sos-round2>${t('Nächste Hilfe starten','Start next support')}</button><button class="btn ghost full sos-close" data-sos-close>${t('SOS beenden','End SOS')}</button></div>`;
  }

  // Capture before the older v48 handler can route anything to the smoking journal.
  document.addEventListener('click',e=>{
    const legacySmoke=e.target.closest?.('[data-v48-smoked]');
    if(legacySmoke){
      e.preventDefault();e.stopImmediatePropagation();
      legacySmoke.remove();
      return;
    }
    const outcome=e.target.closest?.('[data-sos-outcome]');
    if(outcome){
      e.preventDefault();e.stopImmediatePropagation();
      const val=outcome.dataset.sosOutcome;
      if(val==='down') showDefeated(); else showStillThere(val);
      return;
    }
    const round2=e.target.closest?.('[data-sos-round2]');
    if(round2){
      e.preventDefault();e.stopImmediatePropagation();
      if(typeof startIntervention==='function') startIntervention(2);
      setTimeout(()=>removeSmokeBranches(intervention),0);
      return;
    }
    const close=e.target.closest?.('[data-sos-close],[data-sos-complete]');
    if(close){
      e.preventDefault();e.stopImmediatePropagation();
      clearInterval(typeof timer!=='undefined'?timer:null);
      intervention?.classList.remove('open');
      safe(()=>render());
      return;
    }
  },true);

  const observer=new MutationObserver(()=>removeSmokeBranches(intervention||document));
  if(intervention) observer.observe(intervention,{childList:true,subtree:true});

  // Keep the two Home actions visibly and semantically separate after every render.
  if(typeof renderToday==='function'){
    const baseToday=renderToday;
    renderToday=function(){baseToday();labelHomeActions()};
  }
  safe(()=>labelHomeActions());
})();
