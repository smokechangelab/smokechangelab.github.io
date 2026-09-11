// Smoke Lab v48.3 — self-paced SOS flow, strictly separate from cigarette logging
(()=>{
  if(typeof S==='undefined') return;
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab SOS:',e)}};
  const isEn=()=>S.language==='en';
  const t=(de,en)=>isEn()?en:de;

  const sosTriggers={
    stress:{
      label:['Stress','Stress'],
      title:['Druck kurz rausnehmen','Reduce the pressure'],
      lead:['Kein Countdown. Nimm dir nur so viel Zeit, wie gerade hilfreich ist.','No countdown. Take only as much time as feels useful.'],
      steps:[
        ['Lass Schultern und Kiefer bewusst locker.','Relax your shoulders and jaw.'],
        ['Atme drei Mal ruhig aus — die Ausatmung darf etwas länger sein als die Einatmung.','Take three calm breaths out — let the exhale be a little longer than the inhale.'],
        ['Verändere kurz deine Position oder geh ein paar Schritte.','Change your position or take a few steps.']
      ],
      strategy:'Stress reset'
    },
    coffee:{
      label:['Kaffee / Ritual','Coffee / ritual'],
      title:['Ritual-Breaker','Ritual breaker'],
      lead:['Wir trennen für einen Moment Kaffee und Zigarette — ohne Verbot.','For a moment, separate coffee and cigarette — without banning anything.'],
      steps:[
        ['Stell den Kaffee kurz ab oder außer Reichweite.','Put the coffee down or out of reach for a moment.'],
        ['Wechsle Platz oder Raum.','Change your seat or room.'],
        ['Nimm einen Schluck Wasser oder beschäftige deine Hände kurz anders.','Take a sip of water or give your hands something else to do.']
      ],
      strategy:'Ritual breaker'
    },
    pause:{
      label:['Pause / Leerlauf','Break / idle time'],
      title:['Autopilot unterbrechen','Interrupt the autopilot'],
      lead:['Gib der Pause kurz eine andere Form.','Give the break a different shape for a moment.'],
      steps:[
        ['Verlass, wenn möglich, kurz den typischen Rauchplatz.','If possible, briefly leave your usual smoking spot.'],
        ['Mach eine kleine Tätigkeit: Wasser holen, kurz gehen oder etwas ordnen.','Do one small task: get water, walk briefly, or tidy something.'],
        ['Komm danach bewusst zur Entscheidung zurück.','Then return to the decision consciously.']
      ],
      strategy:'Pause reset'
    },
    habit:{
      label:['Gewohnheit','Habit'],
      title:['Gewohnheitskette brechen','Break the habit chain'],
      lead:['Ändere nur einen Teil der bekannten Reihenfolge. Das reicht.','Change just one part of the familiar sequence. That is enough.'],
      steps:[
        ['Mach zuerst etwas, das sonst nach der Zigarette käme.','First do something that would normally come after the cigarette.'],
        ['Wechsle Ort, Hand oder Reihenfolge des Rituals.','Change the place, hand, or order of the ritual.'],
        ['Frag dich danach neu: Will ich gerade noch rauchen oder war es vor allem Gewohnheit?','Then ask again: do I still want to smoke, or was it mainly habit?']
      ],
      strategy:'Habit breaker'
    }
  };

  let sos={key:null,startedAt:null};

  const currentCfg=()=>sos.key?sosTriggers[sos.key]:null;
  const closeAll=()=>{
    clearInterval(typeof timer!=='undefined'?timer:null);
    craving?.classList.remove('open');
    intervention?.classList.remove('open');
  };

  function labelHomeActions(){
    const sosBtn=document.querySelector('#today [data-action="craving"]');
    const logBtn=document.querySelector('#today [data-action="smoke"]');
    if(sosBtn)sosBtn.textContent=t('DRANG STOPPEN (SOS)','STOP CRAVING (SOS)');
    if(logBtn)logBtn.textContent=t('+ ZIGARETTE ERFASSEN','+ LOG CIGARETTE');
  }

  function renderTriggerPicker(){
    closeAll();
    sos={key:null,startedAt:Date.now()};
    craving.classList.add('open');
    const sheet=craving.querySelector('.sheet');
    sheet?.classList.add('sos-sheet');
    cravingStep.textContent=t('SOS · AKUTHILFE','SOS · IN-THE-MOMENT HELP');
    cravingTitle.textContent=t('Warum hast du gerade Verlangen?','Why are you craving a cigarette right now?');
    cravingSub.textContent=t('Wähle nur den Auslöser, der gerade am ehesten passt.','Choose the trigger that fits best right now.');
    cravingBody.innerHTML=`
      <button class="sos-x" data-sos-close aria-label="${t('Schließen','Close')}">×</button>
      <div class="sos-trigger-grid">
        ${Object.entries(sosTriggers).map(([key,cfg])=>`<button class="sos-trigger" data-sos-trigger="${key}"><span>${t(cfg.label[0],cfg.label[1])}</span><i>›</i></button>`).join('')}
      </div>`;
    cravingBack.style.display='none';
    cravingNext.style.display='none';
  }

  function renderExercise(key){
    sos.key=key;
    const cfg=currentCfg();
    if(!cfg)return;
    craving.classList.remove('open');
    intervention.classList.add('open');
    const sheet=intervention.querySelector('.sheet');
    sheet?.classList.add('sos-sheet');
    interventionBody.innerHTML=`
      <button class="sos-x" data-sos-close aria-label="${t('Schließen','Close')}">×</button>
      <div class="sos-exercise">
        <div class="eyebrow">${t('AKUTHILFE','IN-THE-MOMENT HELP')} · ${t(cfg.label[0],cfg.label[1])}</div>
        <h2>${t(cfg.title[0],cfg.title[1])}</h2>
        <p class="sos-lead">${t(cfg.lead[0],cfg.lead[1])}</p>
        <div class="sos-steps">
          ${cfg.steps.map((step,i)=>`<div class="sos-step"><span>${i+1}</span><p>${t(step[0],step[1])}</p></div>`).join('')}
        </div>
        <button class="btn primary full sos-done" data-sos-done>${t('Fertig – kurz prüfen','Done — quick check')}</button>
        <button class="btn ghost full sos-cancel" data-sos-close>${t('Abbrechen','Cancel')}</button>
      </div>`;
  }

  function renderOutcome(){
    const cfg=currentCfg();
    interventionBody.innerHTML=`
      <button class="sos-x" data-sos-close aria-label="${t('Schließen','Close')}">×</button>
      <div class="sos-outcome">
        <div class="eyebrow">${t('KURZ CHECKEN','QUICK CHECK')}</div>
        <h2>${t('Wie ist der Verlangens-Drang jetzt?','How is the craving now?')}</h2>
        <p>${t('Es geht nur darum, ob die Unterbrechung gerade etwas verändert hat.','We only want to know whether the interruption changed anything right now.')}</p>
        <div class="sos-outcome-actions">
          <button class="btn primary full" data-sos-down>${t('Gesunken','Lower')}</button>
          <button class="btn ghost full" data-sos-close>${t('Schließen','Close')}</button>
        </div>
        ${cfg?`<div class="sos-used">${t('Übung','Exercise')}: ${t(cfg.title[0],cfg.title[1])}</div>`:''}
      </div>`;
  }

  function recordSuccess(){
    const cfg=currentCfg();
    safe(()=>{
      S.events.push({
        ts:Date.now(),
        type:'resist',
        trigger:cfg?t(cfg.label[0],cfg.label[0]):null,
        intensity:null,
        context:null,
        outcome:'down',
        strategy:cfg?.strategy||'SOS',
        source:'sos'
      });
      save();
    });
    interventionBody.innerHTML=`
      <button class="sos-x" data-sos-complete aria-label="${t('Schließen','Close')}">×</button>
      <div class="sos-success">
        <div class="sos-success-dot">✓</div>
        <div class="eyebrow">${t('ERFOLGSPUNKT','SUCCESS POINT')}</div>
        <h2>${t('Drang gesunken.','Craving reduced.')}</h2>
        <p>${t('Du hast den automatischen Ablauf unterbrochen. Genau dieser Moment wird als Erfolg gespeichert.','You interrupted the automatic loop. This moment is saved as a success.')}</p>
        <button class="btn primary full" data-sos-complete>${t('Zurück zu HEUTE','Back to TODAY')}</button>
      </div>`;
  }

  // Hard override: SOS always begins with trigger selection; never with the smoking journal.
  openCraving=renderTriggerPicker;

  // Disable legacy countdown/intervention entry points when this layer is active.
  startIntervention=function(){const key=sos.key||'habit';renderExercise(key)};
  showOutcome=renderOutcome;

  // Capture before any older v48/base handlers.
  document.addEventListener('click',e=>{
    const legacySmoke=e.target.closest?.('[data-v48-smoked]');
    if(legacySmoke){e.preventDefault();e.stopImmediatePropagation();return;}

    const trigger=e.target.closest?.('[data-sos-trigger]');
    if(trigger){
      e.preventDefault();e.stopImmediatePropagation();
      renderExercise(trigger.dataset.sosTrigger);
      return;
    }

    const done=e.target.closest?.('[data-sos-done]');
    if(done){
      e.preventDefault();e.stopImmediatePropagation();
      renderOutcome();
      return;
    }

    const down=e.target.closest?.('[data-sos-down]');
    if(down){
      e.preventDefault();e.stopImmediatePropagation();
      recordSuccess();
      return;
    }

    const close=e.target.closest?.('[data-sos-close],[data-sos-complete]');
    if(close){
      e.preventDefault();e.stopImmediatePropagation();
      closeAll();
      safe(()=>render());
      return;
    }
  },true);

  // If an old countdown UI is injected by an older handler, remove it immediately.
  const observer=new MutationObserver(()=>{
    document.querySelectorAll('[data-v48-smoked]').forEach(el=>el.remove());
    document.querySelectorAll('.v48-intervention .timer,.v48-intervention .v48-progress').forEach(el=>el.remove());
  });
  observer.observe(document.body,{childList:true,subtree:true});

  if(typeof renderToday==='function'){
    const baseToday=renderToday;
    renderToday=function(){baseToday();labelHomeActions()};
  }
  safe(()=>labelHomeActions());
})();
