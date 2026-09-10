// Smoke Lab v47.5 master design polish — defensive, no core render replacement
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab polish:',e)}};
  const validTabs=['today','lab','patterns','progress','me'];

  // Independent navigation fallback. Does not depend on the main render pipeline.
  if(!window.__smokeLabDirectNav){
    window.__smokeLabDirectNav=true;
    document.addEventListener('click',e=>{
      const tab=e.target.closest?.('.tab[data-tab]');
      if(!tab)return;
      const next=tab.dataset.tab;
      if(!validTabs.includes(next))return;
      e.preventDefault();
      e.stopPropagation();
      safe(()=>{S.activeTab=next;save()});
      safe(()=>{
        if(next==='today'&&typeof renderToday==='function')renderToday();
        if(next==='lab'&&typeof renderLab==='function')renderLab();
        if(next==='patterns'&&typeof renderPatterns==='function')renderPatterns();
        if(next==='progress'&&typeof renderProgress==='function')renderProgress();
        if(next==='me'&&typeof renderMe==='function')renderMe();
      });
      document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===next));
      document.querySelectorAll('.tab[data-tab]').forEach(t=>t.classList.toggle('active',t.dataset.tab===next));
    },true);
  }

  const timeGreeting=()=>{
    const h=new Date().getHours();
    if(h>=5&&h<11)return 'Guten Morgen';
    if(h>=11&&h<18)return 'Guten Tag';
    return 'Guten Abend';
  };

  // Personal welcome area, visually separated from the status card.
  safe(()=>{
    const baseToday=renderToday;
    renderToday=function(){
      baseToday();
      const root=document.getElementById('today');
      const first=root?.firstElementChild;
      if(!first)return;
      const name=(typeof S!=='undefined'&&typeof S.name==='string'&&S.name.trim())?S.name.trim():'Willkommen zurück';
      first.className='today-welcome';
      first.innerHTML=`<div class="today-welcome-time">${timeGreeting()}</div><div class="today-welcome-name">${name}</div><div class="today-welcome-meta">Heute · Tag ${typeof day==='function'?day():1}</div><div class="today-welcome-lead">Mach den nächsten automatischen Moment sichtbar.</div>`;
    };
  });

  // Small non-destructive polish for existing screens.
  safe(()=>{
    const baseLab=renderLab;
    renderLab=function(){
      baseLab();
      const pi=typeof phaseIndex==='function'?phaseIndex():0;
      document.querySelectorAll('#lab .phase').forEach((el,i)=>{if(i>pi)el.classList.add('future')});
    };
  });

  safe(()=>{
    const basePatterns=renderPatterns;
    renderPatterns=function(){
      basePatterns();
      if(!S||S.events.length>=8)return;
      const card=document.querySelector('#patterns .card');
      if(!card||card.querySelector('.preview-grid'))return;
      const preview=document.createElement('div');
      preview.className='preview-grid';
      preview.innerHTML='<div class="preview-card"><b>Häufigste Auslöser</b><small>Welche Situationen besonders oft auftreten.</small></div><div class="preview-card"><b>Risikozeiten</b><small>Wann der Drang häufiger kommt.</small></div><div class="preview-card"><b>Drangstärke</b><small>Wie intensiv typische Situationen sind.</small></div><div class="preview-card"><b>Wirksame Strategien</b><small>Was den Autopiloten am besten unterbricht.</small></div>';
      card.appendChild(preview);
    };
  });

  safe(()=>{
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
  });

  safe(()=>{
    const baseCraving=renderCraving;
    renderCraving=function(){baseCraving();if(c.step===0)cravingTitle.textContent='Was löst den Drang gerade aus?'};
  });

  // Refresh only the currently visible screen.
  safe(()=>{
    const active=document.querySelector('.page.active')?.id||'today';
    if(active==='today'&&typeof renderToday==='function')renderToday();
    if(active==='lab'&&typeof renderLab==='function')renderLab();
    if(active==='patterns'&&typeof renderPatterns==='function')renderPatterns();
    if(active==='progress'&&typeof renderProgress==='function')renderProgress();
    if(active==='me'&&typeof renderMe==='function')renderMe();
  });
})();