// Smoke Lab v48 — evidence-aligned craving support flow
(()=>{
  if(typeof S==='undefined') return;
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab craving flow:',e)}};
  const isEn=()=>S.language==='en';
  const t=(de,en)=>isEn()?en:de;
  let flow={round:1,strategy:null,post:null};

  const triggerConfig={
    'Stress / Überlastung':{
      first:{title:['Druck rausnehmen','Reduce the pressure'],seconds:120,steps:[
        ['Lass Schultern und Kiefer bewusst locker.','Relax your shoulders and jaw.'],
        ['Steh auf oder verändere deine Körperposition.','Stand up or change your body position.'],
        ['Trink ein paar Schlucke Wasser und bleib für diese Runde weg von der Zigarette.','Take a few sips of water and stay away from the cigarette for this round.']
      ],tag:['Körper + Unterbrechung','Body + interruption']},
      second:{title:['Kurz raus aus der Situation','Step out of the situation'],seconds:120,steps:[
        ['Geh für zwei Minuten an einen anderen Ort.','Move to a different place for two minutes.'],
        ['Mach dabei eine kleine, konkrete Tätigkeit: Wasser holen, kurz gehen oder etwas wegräumen.','Do one small concrete task: get water, walk briefly, or put something away.'],
        ['Danach entscheidest du neu — nicht jetzt.','Then decide again — not now.']
      ],tag:['Distanz schaffen','Create distance']}
    },
    'Kaffee / Ritual':{
      first:{title:['Ritual auseinanderziehen','Break the ritual link'],seconds:120,steps:[
        ['Stell den Kaffee kurz außer Reichweite.','Put the coffee out of reach for a moment.'],
        ['Wechsle Platz oder Raum.','Change your seat or room.'],
        ['Trink Wasser oder beschäftige deine Hände mit etwas anderem.','Drink water or give your hands something else to do.']
      ],tag:['Ritual unterbrechen','Interrupt the ritual']},
      second:{title:['Kaffee ohne Zigarette testen','Test coffee without a cigarette'],seconds:180,steps:[
        ['Nimm den Kaffee wieder — aber an einem anderen Platz.','Take your coffee again — but in a different place.'],
        ['Bleib drei Minuten dort, ohne die Zigarette vorzubereiten.','Stay there for three minutes without preparing a cigarette.'],
        ['Es geht nicht darum, dass der Drang verschwindet. Du trainierst nur eine neue Reihenfolge.','The goal is not to make the craving disappear. You are training a new sequence.']
      ],tag:['Neue Verknüpfung','Build a new link']}
    },
    'Pause / Leerlauf':{
      first:{title:['Autopilot beschäftigen','Occupy the autopilot'],seconds:120,steps:[
        ['Mach eine Mini-Aufgabe, die maximal zwei Minuten dauert.','Do one mini-task that takes no more than two minutes.'],
        ['Zum Beispiel: Wasser holen, Nachricht beantworten, etwas ordnen oder kurz gehen.','For example: get water, answer a message, tidy something, or walk briefly.'],
        ['Hände und Aufmerksamkeit bekommen damit eine Alternative.','This gives your hands and attention an alternative.']
      ],tag:['Ersatzhandlung','Replacement action']},
      second:{title:['Pause neu definieren','Redefine the break'],seconds:180,steps:[
        ['Verlass den typischen Rauchplatz.','Leave your usual smoking spot.'],
        ['Mach drei Minuten Pause ohne Zigarette — Musik, kurzer Gang oder Getränk.','Take a three-minute break without a cigarette — music, a short walk, or a drink.'],
        ['Danach entscheidest du erneut.','Then decide again.']
      ],tag:['Neue Pausenroutine','New break routine']}
    },
    'Nach dem Essen':{
      first:{title:['Essensschluss verändern','Change the end-of-meal cue'],seconds:120,steps:[
        ['Steh direkt vom Essplatz auf.','Stand up from where you ate.'],
        ['Trink Wasser und geh in einen anderen Raum oder kurz vor die Tür.','Drink water and move to another room or briefly outside.'],
        ['Unterbrich nur die bekannte Reihenfolge Essen → Zigarette.','You are only interrupting the familiar meal → cigarette sequence.']
      ],tag:['Kette unterbrechen','Break the chain']},
      second:{title:['Neues Abschlussritual','Create a new finish ritual'],seconds:180,steps:[
        ['Zähne putzen, Kaugummi oder ein kurzer Spaziergang — wähle eins.','Brush your teeth, chew gum, or take a short walk — choose one.'],
        ['Bleib drei Minuten bei diesem neuen Abschluss.','Stay with that new ending for three minutes.'],
        ['Danach prüfst du erneut, was du wirklich willst.','Then check again what you actually want.']
      ],tag:['Ritual ersetzen','Replace the ritual']}
    },
    'Sozial / Gesellschaft':{
      first:{title:['Den ersten Impuls verschieben','Delay the first impulse'],seconds:120,steps:[
        ['Bleib bei der Situation, aber geh nicht sofort mit zum Rauchen.','Stay in the situation, but do not immediately go smoke.'],
        ['Nimm ein Getränk oder etwas in die Hand.','Hold a drink or another object.'],
        ['Sag dir nur: „Ich entscheide in zwei Minuten.“','Tell yourself only: “I will decide in two minutes.”']
      ],tag:['Entscheidung verschieben','Delay the decision']},
      second:{title:['Soziale Gewohnheit entkoppeln','Decouple the social habit'],seconds:180,steps:[
        ['Bleib drei Minuten in der Gruppe oder wechsle kurz das Gespräch.','Stay with the group for three minutes or briefly change the conversation.'],
        ['Wenn andere rauchen, musst du nicht mitmachen, um dazuzugehören.','If others smoke, you do not need to join in to stay part of the group.'],
        ['Danach entscheidest du neu.','Then decide again.']
      ],tag:['Sozialen Auslöser testen','Test the social trigger']}
    },
    'Emotion / Frust':{
      first:{title:['Drang beobachten, nicht bekämpfen','Observe the urge, do not fight it'],seconds:120,steps:[
        ['Benenne für dich kurz, was gerade da ist: Ärger, Frust, Anspannung oder etwas anderes.','Briefly name what is here: anger, frustration, tension, or something else.'],
        ['Beobachte, wo du den Drang im Körper bemerkst.','Notice where you feel the craving in your body.'],
        ['Du musst ihn nicht lösen. Bleib nur zwei Minuten, ohne automatisch zu reagieren.','You do not have to fix it. Stay with it for two minutes without reacting automatically.']
      ],tag:['Urge Surfing','Urge surfing']},
      second:{title:['Gefühl und Zigarette trennen','Separate the feeling from the cigarette'],seconds:180,steps:[
        ['Schreib einen Satz: „Gerade fühle ich …, weil …“','Write one sentence: “Right now I feel … because …”'],
        ['Dann geh kurz oder wechsle den Raum.','Then take a short walk or change rooms.'],
        ['Die Zigarette darf später eine Entscheidung sein — aber nicht die automatische erste Reaktion.','The cigarette can be a later decision — just not the automatic first reaction.']
      ],tag:['Gefühl benennen + Abstand','Name it + create distance']}
    }
  };

  function cfg(){
    return triggerConfig[c.trigger]||triggerConfig['Pause / Leerlauf'];
  }
  function intensityDuration(base){
    const n=Number(c.intensity)||3;
    if(n<=2) return Math.max(90,base-30);
    if(n>=4) return Math.min(240,base+60);
    return base;
  }

  openCraving=function(){
    c={step:0,trigger:null,intensity:null,context:null};
    flow={round:1,strategy:null,post:null};
    craving.classList.add('open');
    renderCraving();
  };

  renderCraving=function(){
    cravingStep.textContent=t(`DRANG · ${c.step+1}/3`,`CRAVING · ${c.step+1}/3`);
    if(c.step===0){
      cravingTitle.textContent=t('Was zieht dich gerade zur Zigarette?','What is pulling you toward a cigarette right now?');
      cravingSub.textContent=t('Wähle den Auslöser, der gerade am ehesten passt.','Choose the trigger that fits best right now.');
      cravingBody.innerHTML=`<div class="grid2">${triggers.map(x=>`<button class="select ${c.trigger===x?'selected':''}" data-ct="${x}">${x}</button>`).join('')}</div>`;
    }
    if(c.step===1){
      cravingTitle.textContent=t('Wie stark ist der Drang gerade?','How strong is the craving right now?');
      cravingSub.textContent=t('1 = leicht · 5 = sehr stark','1 = mild · 5 = very strong');
      cravingBody.innerHTML=`<div class="scale">${[1,2,3,4,5].map(n=>`<button class="select ${c.intensity===n?'selected':''}" data-ci="${n}">${n}</button>`).join('')}</div>`;
    }
    if(c.step===2){
      cravingTitle.textContent=t('Wo bist du gerade?','Where are you right now?');
      cravingSub.textContent=t('Damit Smoke Lab eine Hilfe wählt, die zur Situation passt.','This helps Smoke Lab choose support that fits the situation.');
      cravingBody.innerHTML=`<div class="grid2">${contexts.map(x=>`<button class="select ${c.context===x?'selected':''}" data-cc="${x}">${x}</button>`).join('')}</div>`;
    }
    cravingBack.textContent=c.step?t('Zurück','Back'):t('Abbrechen','Cancel');
    cravingNext.textContent=c.step===2?t('Hilfe starten','Start support'):t('Weiter','Continue');
  };

  pickIntervention=function(){
    if(c.context==='Unterwegs / Auto'){
      interventionBody.innerHTML=`<div class="safe"><b>${t('Sicherheit zuerst.','Safety first.')}</b><br>${t('Bediene Smoke Lab nicht während der Fahrt. Starte die Hilfe erst, wenn du sicher stehst oder geparkt hast.','Do not use Smoke Lab while driving. Start the support only when you are safely stopped or parked.')}</div><button class="btn primary full" data-v48-safe>${t('Ich stehe sicher / bin geparkt','I am safely stopped / parked')}</button><button class="btn ghost full" style="margin-top:7px" data-v48-close>${t('Schließen','Close')}</button>`;
      return;
    }
    startIntervention(1);
  };

  startIntervention=function(round=1){
    clearInterval(timer);
    flow.round=round;
    const set=cfg();
    const x=round===1?set.first:set.second;
    flow.strategy=(x.tag?.[0]||x.title[0]);
    const total=intensityDuration(x.seconds);
    const start=Date.now();
    const draw=()=>{
      const rem=Math.max(0,total-Math.floor((Date.now()-start)/1000));
      const pct=Math.min(100,Math.max(0,((total-rem)/total)*100));
      interventionBody.innerHTML=`<div class="intervention v48-intervention"><div class="v48-round">${t(`RUNDE ${round} · ${x.tag[0]}`,`ROUND ${round} · ${x.tag[1]}`)}</div><h2>${t(x.title[0],x.title[1])}</h2><div class="timer">${rem}</div><div class="v48-progress"><span style="width:${pct}%"></span></div><div class="v48-steps">${x.steps.map((s,i)=>`<div class="v48-step"><span>${i+1}</span><p>${t(s[0],s[1])}</p></div>`).join('')}</div><div class="v48-note">${t('Ziel: nicht den Drang wegmachen. Nur Zeit zwischen Impuls und Handlung schaffen.','Goal: not to erase the craving. Just create time between impulse and action.')}</div></div><button class="btn v48-smoked" data-v48-smoked>${t('Ich rauche jetzt','I am smoking now')}</button>`;
      if(rem<=0){clearInterval(timer);showOutcome();}
    };
    draw();
    timer=setInterval(draw,1000);
  };

  showOutcome=function(){
    clearInterval(timer);
    interventionBody.innerHTML=`<div class="v48-outcome"><div class="eyebrow">${t('KURZ CHECKEN','QUICK CHECK')}</div><h2>${t('Wie ist der Drang jetzt?','How is the craving now?')}</h2><p>${t('Er muss nicht weg sein. Uns interessiert nur, ob sich etwas verändert hat.','It does not need to be gone. We only want to know whether anything changed.')}</p><div class="v48-outcome-grid"><button class="select" data-v48-outcome="down">${t('Schwächer','Weaker')}</button><button class="select" data-v48-outcome="same">${t('Ähnlich','About the same')}</button><button class="select" data-v48-outcome="up">${t('Stärker','Stronger')}</button></div><button class="btn v48-smoked full" data-v48-smoked>${t('Ich rauche jetzt','I am smoking now')}</button></div>`;
  };

  function showSuccess(){
    interventionBody.innerHTML=`<div class="v48-result"><div class="v48-result-icon">✓</div><div class="eyebrow">${t('AUTOPILOT UNTERBROCHEN','AUTOPILOT INTERRUPTED')}</div><h2>${t('Du hast dir Entscheidungsspielraum geschaffen.','You created room to choose.')}</h2><p>${t('Der Drang darf noch da sein. Entscheidend ist: Du hast nicht sofort automatisch reagiert.','The craving can still be there. What matters is that you did not react automatically right away.')}</p><button class="btn primary full" data-v48-complete>${t('Zurück zum Alltag','Back to my day')}</button></div>`;
  }

  function showSecondRound(reason){
    interventionBody.innerHTML=`<div class="v48-result"><div class="eyebrow">${t('DRANG NOCH DA','CRAVING STILL HERE')}</div><h2>${reason==='up'?t('Dann wechseln wir die Strategie.','Let’s switch strategies.'):t('Das ist okay — wir testen etwas anderes.','That is okay — let’s try something different.')}</h2><p>${t('Ein starker Drang muss nach einer Runde nicht verschwinden. Die nächste Übung setzt an einer anderen Stelle an.','A strong craving does not need to disappear after one round. The next exercise uses a different approach.')}</p><button class="btn primary full" data-v48-round2>${t('Nächste Strategie starten','Start next strategy')}</button><button class="btn v48-smoked full" style="margin-top:8px" data-v48-smoked>${t('Ich rauche jetzt','I am smoking now')}</button></div>`;
  }

  function complete(outcome){
    S.events.push({ts:Date.now(),type:'resist',trigger:c.trigger,intensity:c.intensity,context:c.context,outcome,strategy:flow.strategy,round:flow.round});
    save();
    intervention.classList.remove('open');
    safe(()=>render());
  }

  document.addEventListener('click',e=>{
    const safeBtn=e.target.closest?.('[data-v48-safe]');
    if(safeBtn){e.preventDefault();e.stopPropagation();startIntervention(1);return;}
    const close=e.target.closest?.('[data-v48-close]');
    if(close){e.preventDefault();e.stopPropagation();intervention.classList.remove('open');return;}
    const smoked=e.target.closest?.('[data-v48-smoked]');
    if(smoked){e.preventDefault();e.stopPropagation();clearInterval(timer);intervention.classList.remove('open');openSmoke(c.trigger,c.intensity);return;}
    const out=e.target.closest?.('[data-v48-outcome]');
    if(out){
      e.preventDefault();e.stopPropagation();
      const value=out.dataset.v48Outcome;flow.post=value;
      if(value==='down'){showSuccess();return;}
      if(flow.round===1){showSecondRound(value);return;}
      interventionBody.innerHTML=`<div class="v48-result"><div class="eyebrow">${t('ZWEI RUNDEN GESCHAFFT','TWO ROUNDS DONE')}</div><h2>${t('Du hast den Autopiloten zweimal unterbrochen.','You interrupted the autopilot twice.')}</h2><p>${t('Auch wenn der Drang noch da ist, war das Training erfolgreich: Du hast Zeit zwischen Impuls und Handlung geschaffen.','Even if the craving is still there, the training worked: you created time between impulse and action.')}</p><button class="btn primary full" data-v48-complete>${t('Zurück zum Alltag','Back to my day')}</button><button class="btn v48-smoked full" style="margin-top:8px" data-v48-smoked>${t('Ich rauche jetzt','I am smoking now')}</button></div>`;
      return;
    }
    const r2=e.target.closest?.('[data-v48-round2]');
    if(r2){e.preventDefault();e.stopPropagation();startIntervention(2);return;}
    const done=e.target.closest?.('[data-v48-complete]');
    if(done){e.preventDefault();e.stopPropagation();complete(flow.post||'down');return;}
  },true);
})();