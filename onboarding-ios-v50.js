// Smoke Lab v50 — single-screen iOS onboarding
(()=>{
  if(typeof S==='undefined') return;
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab onboarding v50:',e)}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function mount(){
    if(S.onboardingCompleted) return;
    let shell=document.getElementById('smokeLabOnboarding');
    if(!shell){
      shell=document.createElement('div');
      shell.id='smokeLabOnboarding';
      document.body.appendChild(shell);
    }
    shell.className='onboarding-shell ios-onboarding';
    const name=typeof S.name==='string'?S.name:'';
    const baseline=Math.max(0,Number(S.baseline)||10);
    const packPrice=S.packPrice==null?'':String(S.packPrice).replace('.',',');
    const goal=S.goal==='reduce'?'reduce':'quit';

    shell.innerHTML=`
      <div class="ios-ob-frame">
        <div class="ios-ob-scroll">
          <div class="ios-ob-brand"><span class="flask"></span><span>SMOKE LAB</span></div>
          <header class="ios-ob-header">
            <div class="ios-ob-kicker">DEIN STARTPUNKT</div>
            <h1>Smoke Lab einrichten.</h1>
            <p>Vier kurze Angaben. Du kannst alles später unter ICH ändern.</p>
          </header>

          <section class="ios-ob-group" aria-label="Persönliche Angaben">
            <label class="ios-ob-row">
              <span><b>Name</b><small>Optional</small></span>
              <input id="iosObName" type="text" maxlength="40" autocomplete="given-name" placeholder="Vorname" value="${esc(name)}">
            </label>
            <label class="ios-ob-row">
              <span><b>Zigaretten pro Tag</b><small>Ausgangswert</small></span>
              <input id="iosObBaseline" class="ios-ob-number" type="number" min="0" max="100" inputmode="numeric" value="${baseline}">
            </label>
            <label class="ios-ob-row">
              <span><b>Preis pro Packung</b><small>Optional · €</small></span>
              <input id="iosObPrice" class="ios-ob-number" type="text" inputmode="decimal" placeholder="z. B. 6,50" value="${esc(packPrice)}">
            </label>
          </section>

          <div class="ios-ob-section-label">HAUPTZIEL</div>
          <section class="ios-ob-goals" role="radiogroup" aria-label="Hauptziel">
            <button type="button" class="ios-ob-goal ${goal==='quit'?'selected':''}" data-ios-goal="quit" role="radio" aria-checked="${goal==='quit'}">
              <span class="ios-ob-radio"></span><span><b>Aufhören</b><small>Schritt für Schritt Richtung rauchfrei.</small></span>
            </button>
            <button type="button" class="ios-ob-goal ${goal==='reduce'?'selected':''}" data-ios-goal="reduce" role="radio" aria-checked="${goal==='reduce'}">
              <span class="ios-ob-radio"></span><span><b>Reduzieren</b><small>Weniger automatische Zigaretten, mehr Kontrolle.</small></span>
            </button>
          </section>

          <div class="ios-ob-note">Deine Angaben bleiben lokal auf diesem Gerät.</div>
        </div>
        <div class="ios-ob-footer">
          <button type="button" class="ios-ob-start" data-ios-start>Smoke Lab starten</button>
        </div>
      </div>`;

    let selectedGoal=goal;
    shell.onclick=e=>{
      const g=e.target.closest?.('[data-ios-goal]');
      if(g){
        selectedGoal=g.dataset.iosGoal;
        shell.querySelectorAll('[data-ios-goal]').forEach(btn=>{
          const active=btn.dataset.iosGoal===selectedGoal;
          btn.classList.toggle('selected',active);
          btn.setAttribute('aria-checked',String(active));
        });
        return;
      }
      if(e.target.closest?.('[data-ios-start]')){
        const rawName=(document.getElementById('iosObName')?.value||'').trim().slice(0,40);
        const rawBaseline=Number(document.getElementById('iosObBaseline')?.value);
        const rawPrice=(document.getElementById('iosObPrice')?.value||'').trim().replace(',','.');
        const price=rawPrice===''?null:Number(rawPrice);
        safe(()=>{
          S.name=rawName;
          S.baseline=Number.isFinite(rawBaseline)?Math.max(0,Math.min(100,Math.round(rawBaseline))):10;
          S.packPrice=Number.isFinite(price)&&price>=0?Math.round(price*100)/100:null;
          S.goal=selectedGoal;
          S.onboardingCompleted=true;
          S.activeTab='today';
          save();
          shell.remove();
          render();
        });
      }
    };
  }

  safe(()=>mount());
})();
