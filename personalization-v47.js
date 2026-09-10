// Smoke Lab v47.7 — use baseline + smoking experience as real product inputs
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab personalization:',e)}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function profile(){
    const baseline=Math.max(0,Number(S?.baseline)||0);
    const years=S?.smokingYears==null?null:Math.max(0,Number(S.smokingYears)||0);
    return {baseline,years};
  }

  function focusText(){
    const {baseline,years}=profile();
    if(years!==null&&years>=15) return 'Nach vielen Jahren sind Rauchmomente oft stark mit Alltagssituationen verknüpft. Dein Fokus: zuerst den Autopiloten unterbrechen, nicht alles auf einmal verbieten.';
    if(years!==null&&years>=5) return 'Dein Fokus: feste Verknüpfungen im Alltag erkennen und Schritt für Schritt auseinanderziehen.';
    if(years!==null&&years>0) return 'Dein Fokus: früh erkennen, welche Situationen sich gerade als automatische Rauchmomente festigen.';
    if(baseline>=20) return 'Bei deinem Ausgangswert zählt zuerst, welche Zigaretten automatisch passieren. Genau dort suchen wir die ersten Unterbrechungen.';
    if(baseline>=10) return 'Dein Ausgangswert dient als Referenz. Entscheidend ist, in welchen Situationen du wieder mehr Wahl bekommst.';
    return 'Dein Ausgangswert ist nur die Referenz. Smoke Lab bewertet nicht die Zahl, sondern sucht veränderbare Muster.';
  }

  function profileLine(){
    const {baseline,years}=profile();
    const bits=[];
    if(baseline>0) bits.push(`${baseline} Zigaretten/Tag als Ausgangswert`);
    if(years!==null&&years>0) bits.push(`ca. ${years} Jahre Raucherfahrung`);
    return bits.join(' · ');
  }

  safe(()=>{
    const baseToday=renderToday;
    renderToday=function(){
      baseToday();
      const cards=[...document.querySelectorAll('#today .card')];
      const experimentCard=cards.find(card=>card.querySelector('.eyebrow')?.textContent?.toUpperCase().includes('HEUTIGES EXPERIMENT'));
      if(experimentCard&&!experimentCard.querySelector('.personal-context')){
        const box=document.createElement('div');
        box.className='personal-context';
        box.innerHTML=`<div class="personal-context-label">DEIN FOKUS</div><div>${esc(focusText())}</div>`;
        experimentCard.appendChild(box);
      }
    };
  });

  safe(()=>{
    const baseLab=renderLab;
    renderLab=function(){
      baseLab();
      const mission=[...document.querySelectorAll('#lab .card')].find(card=>card.querySelector('.eyebrow')?.textContent?.toUpperCase().includes('AKTUELLE MISSION'));
      if(mission&&!mission.querySelector('.profile-strip')){
        const line=profileLine();
        const box=document.createElement('div');
        box.className='profile-strip';
        box.innerHTML=`${line?`<div class="profile-strip-meta">${esc(line)}</div>`:''}<div class="profile-strip-text">${esc(focusText())}</div>`;
        mission.appendChild(box);
      }
    };
  });

  safe(()=>{
    const baseProgress=renderProgress;
    renderProgress=function(){
      baseProgress();
      const {baseline,years}=profile();
      const hero=document.querySelector('#progress .card.hero');
      if(hero&&!hero.querySelector('.baseline-reference')){
        const box=document.createElement('div');
        box.className='baseline-reference';
        box.innerHTML=`<b>Deine Referenz</b><span>${baseline>0?`${baseline} Zigaretten/Tag`: 'Noch kein Ausgangswert'}${years!==null&&years>0?` · ca. ${years} Jahre Raucherfahrung`:''}</span>`;
        hero.appendChild(box);
      }
    };
  });

  safe(()=>{
    const baseMe=renderMe;
    renderMe=function(){
      baseMe();
      document.querySelectorAll('#me .setting').forEach(row=>{
        const b=row.querySelector('b'),sm=row.querySelector('small');
        if(b?.textContent==='Raucherfahrung'&&S.smokingYears!=null&&sm) sm.textContent=`ca. ${S.smokingYears} Jahre`;
      });
    };
  });

  safe(()=>{
    const active=document.querySelector('.page.active')?.id||'today';
    if(active==='today')renderToday();
    if(active==='lab')renderLab();
    if(active==='progress')renderProgress();
    if(active==='me')renderMe();
  });
})();