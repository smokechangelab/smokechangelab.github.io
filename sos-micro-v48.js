(()=>{
  if(typeof S==='undefined')return;
  const en=()=>S.language==='en';
  const t=(de,eng)=>en()?eng:de;
  const SAFE=fn=>{try{fn()}catch(e){console.error(e)}};
  const DATA={
    stress:{icon:'⚡',label:['Stress','Stress'],title:['Druck kurz unterbrechen','Interrupt the pressure'],a:['Lass Schultern und Kiefer locker. Atme drei Mal ruhig aus — die Ausatmung darf etwas länger sein. Ändere danach kurz deine Position oder geh ein paar Schritte.','Relax your shoulders and jaw. Take three calm breaths out — let the exhale be a little longer. Then change your position or take a few steps.'],b:['Verlass die Situation für einen kurzen Moment. Hol dir Wasser oder geh ein paar Schritte, bevor du neu entscheidest.','Step out of the situation for a moment. Get some water or take a few steps before deciding again.'],strategy:'Stress reset'},
    coffee:{icon:'☕',label:['Kaffee','Coffee'],title:['Ritual kurz aufbrechen','Break the ritual link'],a:['Stell den Kaffee für einen Moment weg, wechsel den Platz und trink einen Schluck Wasser. Unterbrich nur kurz die bekannte Reihenfolge.','Put the coffee down for a moment, change your seat and take a sip of water. Just interrupt the familiar sequence.'],b:['Nimm den Kaffee wieder, aber an einem anderen Platz. Beschäftige deine Hände kurz anders und entscheide erst danach neu.','Take the coffee again, but in a different place. Give your hands something else to do and only then decide again.'],strategy:'Ritual breaker'},
    routine:{icon:'↻',label:['Routine','Routine'],title:['Autopilot stoppen','Stop the autopilot'],a:['Ändere nur einen Teil der gewohnten Reihenfolge: Ort, Hand oder nächste Handlung. Diese kleine Abweichung unterbricht den Automatismus.','Change just one part of the usual sequence: place, hand, or next action. That small deviation interrupts the autopilot.'],b:['Mach zuerst etwas, das sonst nach der Zigarette käme. Frag dich danach neu, ob du gerade wirklich rauchen willst oder nur der Ablauf gestartet ist.','First do something that would normally come after the cigarette. Then ask whether you really want to smoke or whether the routine simply started.'],strategy:'Routine breaker'},
    social:{icon:'👥',label:['Gesellschaft','Social'],title:['Sozialen Sog kurz lösen','Step out of the social pull'],a:['Geh für einen kurzen Moment beiseite oder hol dir etwas zu trinken. Du musst dich nicht rechtfertigen und jetzt nichts endgültig entscheiden.','Step aside for a moment or get a drink. You do not need to explain yourself or make a final decision right now.'],b:['Wenn andere rauchen, bleib noch einen Moment ohne mitzugehen. Wechsel kurz Gespräch oder Platz und entscheide dann neu.','If others are smoking, stay a little longer without joining them. Briefly change the conversation or your position, then decide again.'],strategy:'Social reset'}
  };
  let state={key:null,round:1};
  const close=()=>{craving?.classList.remove('open');intervention?.classList.remove('open')};
  const current=()=>state.key?DATA[state.key]:null;

  function picker(){
    close();state={key:null,round:1};craving.classList.add('open');
    cravingStep.textContent=t('DRANG-MOMENT','CRAVING MOMENT');
    cravingTitle.textContent=t('Was triggert dich gerade?','What is triggering you right now?');
    cravingSub.textContent=t('Ein Tap genügt — danach bekommst du sofort einen passenden Impuls.','One tap is enough — you will get a matching micro-intervention right away.');
    cravingBody.innerHTML=`<button class="sos-x" data-micro-close>×</button><div class="micro-trigger-grid">${Object.entries(DATA).map(([k,x])=>`<button class="micro-trigger" data-micro-trigger="${k}"><span>${x.icon}</span><b>${t(x.label[0],x.label[1])}</b></button>`).join('')}</div>`;
    cravingBack.style.display='none';cravingNext.style.display='none';
  }
  function impulse(key,round=1){
    state={key,round};const x=current();if(!x)return;
    craving.classList.remove('open');intervention.classList.add('open');
    const msg=round===1?x.a:x.b;
    interventionBody.innerHTML=`<button class="sos-x" data-micro-close>×</button><div class="micro-impulse"><div class="micro-head"><span>${x.icon}</span><div><div class="eyebrow">${t('MICRO-IMPULS','MICRO-INTERVENTION')}</div><h2>${t(x.title[0],x.title[1])}</h2></div></div><div class="micro-card"><p>${t(msg[0],msg[1])}</p></div><div class="micro-question">${t('Wie ist der Drang jetzt?','How is the craving now?')}</div><div class="micro-actions"><button class="btn primary full" data-micro-down>${t('Gesunken','Lower')}</button><button class="btn ghost full" data-micro-still>${t('Noch da','Still there')}</button></div></div>`;
  }
  function success(){
    const x=current();SAFE(()=>{S.events.push({ts:Date.now(),type:'resist',trigger:x?.label?.[0]||null,intensity:null,context:null,outcome:'down',strategy:x?.strategy||'SOS',source:'sos'});save()});
    interventionBody.innerHTML=`<button class="sos-x" data-micro-close>×</button><div class="sos-success"><div class="sos-success-dot">✓</div><div class="eyebrow">${t('ERFOLGSPUNKT','SUCCESS POINT')}</div><h2>${t('Drang gesunken.','Craving reduced.')}</h2><p>${t('Du hast den automatischen Ablauf unterbrochen. Dieser Moment wird als Erfolg gespeichert.','You interrupted the automatic loop. This moment is saved as a success.')}</p><button class="btn primary full" data-micro-close>${t('Zurück zu HEUTE','Back to TODAY')}</button></div>`;
  }
  function still(){
    if(state.round===1){impulse(state.key,2);return}
    interventionBody.innerHTML=`<button class="sos-x" data-micro-close>×</button><div class="micro-impulse"><div class="eyebrow">${t('DRANG NOCH DA','CRAVING STILL HERE')}</div><h2>${t('Okay. Du entscheidest.','Okay. You decide.')}</h2><div class="micro-card"><p>${t('Du hast bereits zweimal bewusst unterbrochen. Mehr musst du gerade nicht tun.','You have already interrupted the loop twice. You do not need to do more right now.')}</p></div><button class="btn ghost full" data-micro-close>${t('Schließen','Close')}</button></div>`;
  }

  openCraving=picker;
  document.addEventListener('click',e=>{
    const trg=e.target.closest?.('[data-micro-trigger]');if(trg){e.preventDefault();e.stopImmediatePropagation();impulse(trg.dataset.microTrigger,1);return}
    if(e.target.closest?.('[data-micro-down]')){e.preventDefault();e.stopImmediatePropagation();success();return}
    if(e.target.closest?.('[data-micro-still]')){e.preventDefault();e.stopImmediatePropagation();still();return}
    if(e.target.closest?.('[data-micro-close]')){e.preventDefault();e.stopImmediatePropagation();close();SAFE(()=>render());return}
  },true);
})();