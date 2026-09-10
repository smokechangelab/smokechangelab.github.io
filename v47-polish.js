// Smoke Lab v47.6 onboarding + safe polish layer
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab polish:',e)}};
  const validTabs=['today','lab','patterns','progress','me'];

  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const timeGreeting=()=>{const h=new Date().getHours();if(h>=5&&h<11)return 'Guten Morgen';if(h>=11&&h<18)return 'Guten Tag';return 'Guten Abend'};

  // Independent five-tab fallback.
  if(!window.__smokeLabDirectNav){
    window.__smokeLabDirectNav=true;
    document.addEventListener('click',e=>{
      const tab=e.target.closest?.('.tab[data-tab]');
      if(!tab)return;
      const next=tab.dataset.tab;
      if(!validTabs.includes(next))return;
      e.preventDefault();e.stopPropagation();
      safe(()=>{S.activeTab=next;save()});
      safe(()=>{if(next==='today')renderToday();if(next==='lab')renderLab();if(next==='patterns')renderPatterns();if(next==='progress')renderProgress();if(next==='me')renderMe()});
      document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===next));
      document.querySelectorAll('.tab[data-tab]').forEach(t=>t.classList.toggle('active',t.dataset.tab===next));
    },true);
  }

  safe(()=>{
    if(typeof S.name!=='string')S.name='';
    if(typeof S.onboardingCompleted!=='boolean')S.onboardingCompleted=false;

    const baseToday=renderToday;
    renderToday=function(){
      baseToday();
      const root=document.getElementById('today');
      const first=root?.firstElementChild;if(!first)return;
      const name=S.name.trim();
      first.className='today-welcome';
      first.innerHTML=`<div class="today-welcome-time">${timeGreeting()}</div><div class="today-welcome-name">${name?esc(name):'Willkommen zurück'}</div><div class="today-welcome-meta">Heute · Tag ${day()}</div><div class="today-welcome-lead">Mach den nächsten automatischen Moment sichtbar.</div>`;
    };

    const baseLab=renderLab;
    renderLab=function(){baseLab();const pi=phaseIndex();document.querySelectorAll('#lab .phase').forEach((el,i)=>{if(i>pi)el.classList.add('future')})};

    const basePatterns=renderPatterns;
    renderPatterns=function(){
      basePatterns();if(S.events.length>=8)return;
      const card=document.querySelector('#patterns .card');if(!card||card.querySelector('.preview-grid'))return;
      const preview=document.createElement('div');preview.className='preview-grid';
      preview.innerHTML='<div class="preview-card"><b>Häufigste Auslöser</b><small>Welche Situationen besonders oft auftreten.</small></div><div class="preview-card"><b>Risikozeiten</b><small>Wann der Drang häufiger kommt.</small></div><div class="preview-card"><b>Drangstärke</b><small>Wie intensiv typische Situationen sind.</small></div><div class="preview-card"><b>Wirksame Strategien</b><small>Was den Autopiloten am besten unterbricht.</small></div>';
      card.appendChild(preview);
    };

    const baseMe=renderMe;
    renderMe=function(){
      baseMe();
      const title=document.querySelector('#me .title'),sub=document.querySelector('#me .subtitle');
      if(title)title.textContent='Dein Smoke Lab.';if(sub)sub.textContent='Profil, Datenschutz und deine Daten.';
      const settings=document.querySelector('#me .settings');
      if(settings&&!settings.querySelector('[data-profile-name]')){
        const row=document.createElement('div');row.className='setting';
        row.innerHTML=`<div><b>Name</b><small>${S.name.trim()?esc(S.name.trim()):'Nicht angegeben'}</small></div><button class="linkbtn" data-profile-name>Ändern</button>`;
        settings.prepend(row);
      }
      document.querySelectorAll('#me .setting').forEach(row=>{const b=row.querySelector('b'),sm=row.querySelector('small');if(b?.textContent==='Rauchjahre')b.textContent='Raucherfahrung';if(sm?.textContent?.includes('lokal gespeichert'))sm.textContent=sm.textContent.replace('lokal gespeichert','Lokal gespeichert').replace('kein Login','kein Konto')});
    };

    const baseCraving=renderCraving;
    renderCraving=function(){baseCraving();if(c.step===0)cravingTitle.textContent='Was löst den Drang gerade aus?'};

    save();
  });

  // Name editor under ICH.
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-profile-name]');if(!btn)return;
    e.preventDefault();e.stopPropagation();
    const current=(typeof S!=='undefined'&&S.name)||'';
    const next=prompt('Wie dürfen wir dich ansprechen?',current);
    if(next===null)return;
    safe(()=>{S.name=next.trim().slice(0,40);save();renderMe();if(document.getElementById('today')?.classList.contains('active'))renderToday()});
  },true);

  function buildOnboarding(){
    if(document.getElementById('smokeLabOnboarding'))return;
    const el=document.createElement('div');el.id='smokeLabOnboarding';el.className='onboarding-shell';
    el.innerHTML='<div class="onboarding-card"><div id="onboardingContent"></div></div>';
    document.body.appendChild(el);
    let step=0,draft={name:S.name||'',goal:S.goal||'quit',baseline:S.baseline||10,years:S.smokingYears||''};
    const content=()=>document.getElementById('onboardingContent');
    const renderStep=()=>{
      const box=content();if(!box)return;
      const progress=`<div class="onboarding-progress"><span style="width:${Math.max(8,step/5*100)}%"></span></div>`;
      if(step===0){box.innerHTML=`<div class="onboarding-brand"><span class="flask"></span><span>SMOKE LAB</span></div><div class="onboarding-hero"><div class="onboarding-kicker">VERSTEHEN · UNTERBRECHEN · VERÄNDERN</div><h1>Verstehe deinen Auslöser.<br>Unterbrich das Muster.</h1><p>Smoke Lab hilft dir, automatische Rauchmomente sichtbar zu machen und neue Reaktionen zu trainieren — ohne Erfolgsserien, ohne Schuldgefühl.</p></div><button class="onboarding-primary" data-ob-next>Loslegen</button><div class="onboarding-privacy">Deine Angaben bleiben lokal auf diesem Gerät.</div>`;return}
      if(step===1){box.innerHTML=`${progress}<div class="onboarding-step">1 von 4</div><h2>Wie dürfen wir dich ansprechen?</h2><p>Optional — nur für eine persönlichere Ansprache in Smoke Lab.</p><input id="obName" class="onboarding-input" type="text" maxlength="40" autocomplete="given-name" placeholder="Vorname" value="${esc(draft.name)}"><div class="onboarding-actions"><button class="onboarding-secondary" data-ob-skip-name>Überspringen</button><button class="onboarding-primary" data-ob-next>Weiter</button></div>`;return}
      if(step===2){box.innerHTML=`${progress}<div class="onboarding-step">2 von 4</div><h2>Was ist dein Ziel?</h2><p>Du kannst das später jederzeit ändern.</p><div class="onboarding-choice-grid"><button class="onboarding-choice ${draft.goal==='quit'?'selected':''}" data-ob-goal="quit"><b>Aufhören</b><span>Schritt für Schritt Richtung rauchfrei.</span></button><button class="onboarding-choice ${draft.goal==='reduce'?'selected':''}" data-ob-goal="reduce"><b>Reduzieren</b><span>Mehr Kontrolle und weniger automatische Zigaretten.</span></button></div><div class="onboarding-actions single"><button class="onboarding-primary" data-ob-next>Weiter</button></div>`;return}
      if(step===3){box.innerHTML=`${progress}<div class="onboarding-step">3 von 4</div><h2>Wie viele Zigaretten rauchst du aktuell pro Tag?</h2><p>Das ist nur dein Ausgangswert — keine Bewertung.</p><input id="obBaseline" class="onboarding-input onboarding-number" type="number" min="0" max="100" inputmode="numeric" value="${Number(draft.baseline)||10}"><div class="onboarding-actions single"><button class="onboarding-primary" data-ob-next>Weiter</button></div>`;return}
      if(step===4){box.innerHTML=`${progress}<div class="onboarding-step">4 von 4</div><h2>Wie lange rauchst du schon?</h2><p>Optional. Die Angabe hilft dabei, deine Raucherfahrung besser einzuordnen.</p><input id="obYears" class="onboarding-input onboarding-number" type="number" min="0" max="80" inputmode="numeric" placeholder="Jahre" value="${draft.years!==''?esc(draft.years):''}"><div class="onboarding-actions"><button class="onboarding-secondary" data-ob-skip-years>Überspringen</button><button class="onboarding-primary" data-ob-finish>Smoke Lab starten</button></div>`;return}
    };
    el.addEventListener('click',e=>{
      const goal=e.target.closest?.('[data-ob-goal]');if(goal){draft.goal=goal.dataset.obGoal;renderStep();return}
      if(e.target.closest?.('[data-ob-skip-name]')){draft.name='';step=2;renderStep();return}
      if(e.target.closest?.('[data-ob-skip-years]')){draft.years='';finish();return}
      if(e.target.closest?.('[data-ob-next]')){
        if(step===0){step=1;renderStep();return}
        if(step===1){draft.name=(document.getElementById('obName')?.value||'').trim().slice(0,40);step=2;renderStep();return}
        if(step===2){step=3;renderStep();return}
        if(step===3){const v=Number(document.getElementById('obBaseline')?.value);draft.baseline=Number.isFinite(v)?Math.max(0,Math.min(100,Math.round(v))):10;step=4;renderStep();return}
      }
      if(e.target.closest?.('[data-ob-finish]')){const raw=document.getElementById('obYears')?.value;draft.years=raw===''?'':Math.max(0,Math.min(80,Math.round(Number(raw)||0)));finish()}
    });
    const finish=()=>safe(()=>{S.name=draft.name;S.goal=draft.goal;S.baseline=draft.baseline;S.smokingYears=draft.years===''?null:draft.years;S.onboardingCompleted=true;S.activeTab='today';save();el.remove();renderToday();document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='today'));document.querySelectorAll('.tab[data-tab]').forEach(t=>t.classList.toggle('active',t.dataset.tab==='today'))});
    renderStep();
  }

  safe(()=>{
    const active=document.querySelector('.page.active')?.id||'today';
    if(active==='today')renderToday();if(active==='lab')renderLab();if(active==='patterns')renderPatterns();if(active==='progress')renderProgress();if(active==='me')renderMe();
    if(!S.onboardingCompleted)buildOnboarding();
  });
})();