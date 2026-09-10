// Smoke Lab v47.4 safe polish layer
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab polish:',e)}};

  // Independent tab fallback: never depends on a full re-render succeeding.
  if(!window.__smokeLabDirectNav){
    window.__smokeLabDirectNav=true;
    document.addEventListener('click',e=>{
      const tab=e.target.closest?.('.tab[data-tab]');
      if(!tab)return;
      const next=tab.dataset.tab;
      if(!['today','lab','patterns','progress','me'].includes(next))return;
      e.preventDefault();
      safe(()=>{S.activeTab=next;save()});
      safe(()=>{
        if(next==='today')renderToday();
        if(next==='lab')renderLab();
        if(next==='patterns')renderPatterns();
        if(next==='progress')renderProgress();
        if(next==='me')renderMe();
      });
      document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===next));
      document.querySelectorAll('.tab[data-tab]').forEach(t=>t.classList.toggle('active',t.dataset.tab===next));
    },true);
  }

  safe(()=>{
    greeting=function(){const h=new Date().getHours();return h>=5&&h<11?'Guten Morgen':h>=11&&h<18?'Guten Tag':h>=18&&h<23?'Guten Abend':'Hallo'};

    const baseToday=renderToday;
    renderToday=function(){
      baseToday();
      const root=document.getElementById('today');
      const first=root?.firstElementChild;
      if(!first)return;
      first.innerHTML=`<div class="today-intro"><div class="today-greeting">${greeting()}</div><div class="today-day">Tag ${day()}</div><div class="today-lead">Mach den nächsten automatischen Moment sichtbar.</div></div>`;
    };

    const baseLab=renderLab;
    renderLab=function(){
      baseLab();
      const pi=phaseIndex();
      document.querySelectorAll('#lab .phase').forEach((el,i)=>{if(i>pi)el.classList.add('future')});
    };

    const basePatterns=renderPatterns;
    renderPatterns=function(){
      basePatterns();
      if(S.events.length>=8)return;
      const card=document.querySelector('#patterns .card');
      if(!card||card.querySelector('.preview-grid'))return;
      const preview=document.createElement('div');
      preview.className='preview-grid';
      preview.innerHTML='<div class="preview-card"><b>Häufigste Auslöser</b><small>Welche Situationen besonders oft auftreten.</small></div><div class="preview-card"><b>Risikozeiten</b><small>Wann der Drang häufiger kommt.</small></div><div class="preview-card"><b>Drangstärke</b><small>Wie intensiv typische Situationen sind.</small></div><div class="preview-card"><b>Wirksame Strategien</b><small>Was den Autopiloten am besten unterbricht.</small></div>';
      card.appendChild(preview);
    };

    const baseMe=renderMe;
    renderMe=function(){
      baseMe();
      const title=document.querySelector('#me .title');
      const sub=document.querySelector('#me .subtitle');
      if(title)title.textContent='Dein Smoke Lab.';
      if(sub)sub.textContent='Profil, Datenschutz und deine Daten.';
      document.querySelectorAll('#me .setting').forEach(row=>{
        const b=row.querySelector('b'),sm=row.querySelector('small');
        if(b?.textContent==='Rauchjahre')b.textContent='Raucherfahrung';
        if(sm?.textContent?.includes('lokal gespeichert'))sm.textContent=sm.textContent.replace('lokal gespeichert','Lokal gespeichert').replace('kein Login','kein Konto');
      });
    };

    const baseCraving=renderCraving;
    renderCraving=function(){baseCraving();if(c.step===0)cravingTitle.textContent='Was löst den Drang gerade aus?'};

    // Refresh only the visible page; do not call the full render pipeline here.
    if(document.getElementById('today')?.classList.contains('active'))renderToday();
  });
})();