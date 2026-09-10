// Smoke Lab v47.8 — German / English UI language layer
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab i18n:',e)}};
  if(typeof S==='undefined')return;
  if(!['de','en'].includes(S.language))S.language='de';

  const exact={
    'HEUTE':'TODAY','LABOR':'LAB','MUSTER':'PATTERNS','FORTSCHRITT':'PROGRESS','ICH':'ME',
    'Guten Morgen':'Good morning','Guten Tag':'Good afternoon','Guten Abend':'Good evening','Willkommen zurück':'Welcome back',
    'Mach den nächsten automatischen Moment sichtbar.':'Make the next automatic moment visible.',
    'Kontrolle statt Erfolgsserien.':'Control, not streaks.',
    'Zigaretten heute':'Cigarettes today','Unterbrechungen':'Interruptions','vs. Ausgangswert':'vs. baseline',
    'ICH WILL RAUCHEN':'I WANT TO SMOKE','ICH HABE GERAUCHT':'I SMOKED',
    'HEUTIGES EXPERIMENT':"TODAY'S EXPERIMENT",'AKTUELLE ERKENNTNIS':'CURRENT INSIGHT','NÄCHSTER SCHRITT':'NEXT STEP','DEIN FOKUS':'YOUR FOCUS',
    'Beobachten, ohne zu verändern':'Observe without changing','Erfasse heute nur den Moment und den Auslöser. Keine Bewertung.':'Today, only capture the moment and the trigger. No judgement.',
    'LABOR · 30-TAGE-PROGRAMM':'LAB · 30-DAY PROGRAM','Trainiere Kontrolle.':'Train control.','Fünf Phasen. Kleine Experimente. Keine Strafe für Rückschritte.':'Five phases. Small experiments. No punishment for setbacks.',
    'AKTUELLE MISSION':'CURRENT MISSION','Aktiv':'Active','Später':'Later',
    'BEOBACHTEN':'OBSERVE','UNTERBRECHEN':'INTERRUPT','ENTKOPPELN':'DECOUPLE','ERSETZEN':'REPLACE','STABILISIEREN':'STABILIZE',
    'Dein Rauchmuster.':'Your smoking pattern.','Auslöser, Zeit, Stärke, Kontext und passende Gegenstrategien.':'Triggers, time, intensity, context and matching counter-strategies.',
    'KALIBRIERUNG':'CALIBRATION','Häufigste Auslöser':'Most common triggers','Risikozeiten':'Risk times','Drangstärke':'Craving intensity','Wirksame Strategien':'Effective strategies',
    'Welche Situationen besonders oft auftreten.':'Which situations occur most often.','Wann der Drang häufiger kommt.':'When cravings occur more often.','Wie intensiv typische Situationen sind.':'How intense typical situations are.','Was den Autopiloten am besten unterbricht.':'What interrupts your autopilot best.',
    'HÄUFIGSTER AUSLÖSER':'TOP TRIGGER','AUTOMATIK':'AUTOMATICITY','BESTE REAKTION':'BEST RESPONSE','RISIKOZEIT':'RISK TIME','AUSLÖSERVERTEILUNG':'TRIGGER DISTRIBUTION',
    'Kontrolle statt Erfolgsserien.':'Control, not streaks.','Fortschritt heißt mehr Wahlmöglichkeit, nicht perfekte Tage.':'Progress means more choice, not perfect days.',
    'KONTROLLWERT':'CONTROL SCORE','Wird mit weiteren Situationen aussagekräftiger.':'Becomes more meaningful as you log more situations.','vorläufig':'provisional',
    'erfolgreich':'successful','ERFASST':'LOGGED','Zigaretten':'Cigarettes','INTENSITÄT':'INTENSITY','Ø heute':'avg. today','AUSGANGSWERT':'BASELINE','Zigaretten / Tag':'cigarettes / day','7-TAGE-TREND':'7-DAY TREND','Heute':'Today',
    'Deine Referenz':'Your baseline','Noch kein Ausgangswert':'No baseline yet','Raucherfahrung':'Smoking experience',
    'Dein Smoke Lab.':'Your Smoke Lab.','Profil, Datenschutz und deine Daten.':'Profile, privacy and your data.','Name':'Name','Nicht angegeben':'Not provided','Ändern':'Change',
    'Ziel':'Goal','Aufhören':'Quit','Reduzieren':'Reduce','Ausgangswert':'Baseline','Sprache':'Language','Deutsch':'German','Englisch':'English',
    'Labor-Bericht':'Lab report','Anonymisierte Zusammenfassung kopieren':'Copy anonymized summary','Kopieren':'Copy','Datenschutz & Info':'Privacy & info','Lokal gespeichert · kein Konto':'Stored locally · no account','Info':'Info','Hinweis':'Notice','Kein Ersatz für medizinische Behandlung':'Not a substitute for medical treatment','Alle Daten zurücksetzen':'Reset all data','Unwiderruflich auf diesem Gerät':'Irreversible on this device','Zurücksetzen':'Reset',
    'Was löst den Drang gerade aus?':'What is triggering the craving right now?','DRANG':'CRAVING','Abbrechen':'Cancel','Weiter':'Continue','Zurück':'Back',
    'Stress / Überlastung':'Stress / overload','Kaffee / Ritual':'Coffee / ritual','Pause / Leerlauf':'Break / idle time','Nach dem Essen':'After eating','Sozial / Gesellschaft':'Social / with others','Emotion / Frust':'Emotion / frustration',
    'Allein':'Alone','Mit anderen':'With others','Arbeit':'Work','Unterwegs / Auto':'On the go / driving',
    'Zigarette erfassen':'Log a cigarette','Nur die Daten, die für deine Muster wirklich helfen.':'Only the data that actually helps reveal your patterns.','KURZPROTOKOLL':'QUICK LOG','Speichern':'Save',
    'Drang jetzt prüfen':'Check craving now','Ich habe geraucht':'I smoked','AKUTHILFE · KONTEXTABHÄNGIG':'IN-THE-MOMENT HELP · CONTEXTUAL',
    'VERSTEHEN · UNTERBRECHEN · VERÄNDERN':'UNDERSTAND · INTERRUPT · CHANGE','Verstehe deinen Auslöser.':'Understand your trigger.','Unterbrich das Muster.':'Break the pattern.',
    'Smoke Lab hilft dir, automatische Rauchmomente sichtbar zu machen und neue Reaktionen zu trainieren — ohne Erfolgsserien, ohne Schuldgefühl.':'Smoke Lab helps you make automatic smoking moments visible and train new responses — without streaks or guilt.',
    'Loslegen':'Get started','Deine Angaben bleiben lokal auf diesem Gerät.':'Your information stays locally on this device.',
    'Wie dürfen wir dich ansprechen?':'What should we call you?','Optional — nur für eine persönlichere Ansprache in Smoke Lab.':'Optional — only for a more personal experience in Smoke Lab.','Vorname':'First name','Überspringen':'Skip',
    'Was ist dein Ziel?':'What is your goal?','Du kannst das später jederzeit ändern.':'You can change this anytime later.','Schritt für Schritt Richtung rauchfrei.':'Step by step toward smoke-free.','Mehr Kontrolle und weniger automatische Zigaretten.':'More control and fewer automatic cigarettes.',
    'Wie viele Zigaretten rauchst du aktuell pro Tag?':'How many cigarettes do you currently smoke per day?','Das ist nur dein Ausgangswert — keine Bewertung.':'This is only your baseline — no judgement.',
    'Wie lange rauchst du schon?':'How long have you been smoking?','Optional. Die Angabe hilft dabei, deine Raucherfahrung besser einzuordnen.':'Optional. This helps personalize how Smoke Lab approaches established routines.','Jahre':'Years','Smoke Lab starten':'Start Smoke Lab',
    '1 von 4':'1 of 4','2 von 4':'2 of 4','3 von 4':'3 of 4','4 von 4':'4 of 4'
  };

  const regex=[
    [/^Heute · Tag (\d+)$/i,'Today · Day $1'],[/^Tag (\d+)$/,'Day $1'],
    [/^(\d+) Zigaretten\/Tag als Ausgangswert$/,'$1 cigarettes/day baseline'],[/^ca\. (\d+) Jahre Raucherfahrung$/,'approx. $1 years smoking experience'],[/^ca\. (\d+) Jahre$/,'approx. $1 years'],
    [/^(\d+) Zigaretten \/ Tag$/,'$1 cigarettes / day'],[/^(\d+)\/8 Situationen erfasst\. Smoke Lab zeigt Muster erst, wenn genügend Daten vorhanden sind\.$/,'$1/8 situations logged. Smoke Lab shows patterns once there is enough data.'],
    [/^Tage (\d+)–(\d+) · Muster sichtbar machen$/,'Days $1–$2 · reveal patterns'],[/^Tage (\d+)–(\d+) · Autopilot unterbrechen$/,'Days $1–$2 · interrupt autopilot'],[/^Tage (\d+)–(\d+) · Auslöser entkoppeln$/,'Days $1–$2 · decouple triggers'],[/^Tage (\d+)–(\d+) · neue Antworten testen$/,'Days $1–$2 · test new responses'],[/^Tage (\d+)–(\d+) · Kontrolle stabilisieren$/,'Days $1–$2 · stabilize control']
  ];

  const englishLong=[
    ['Nach vielen Jahren sind Rauchmomente oft stark mit Alltagssituationen verknüpft. Dein Fokus: zuerst den Autopiloten unterbrechen, nicht alles auf einmal verbieten.','After many years, smoking moments can be strongly linked to everyday routines. Your focus: interrupt the autopilot first, rather than trying to ban everything at once.'],
    ['Dein Fokus: feste Verknüpfungen im Alltag erkennen und Schritt für Schritt auseinanderziehen.','Your focus: identify established everyday links and separate them step by step.'],
    ['Dein Fokus: früh erkennen, welche Situationen sich gerade als automatische Rauchmomente festigen.','Your focus: notice early which situations are becoming automatic smoking moments.'],
    ['Bei deinem Ausgangswert zählt zuerst, welche Zigaretten automatisch passieren. Genau dort suchen wir die ersten Unterbrechungen.','At your baseline, the first question is which cigarettes happen automatically. That is where we look for the first interruptions.'],
    ['Dein Ausgangswert dient als Referenz. Entscheidend ist, in welchen Situationen du wieder mehr Wahl bekommst.','Your baseline is a reference. What matters is where you regain more choice.'],
    ['Dein Ausgangswert ist nur die Referenz. Smoke Lab bewertet nicht die Zahl, sondern sucht veränderbare Muster.','Your baseline is only a reference. Smoke Lab does not judge the number; it looks for patterns you can change.']
  ];

  function translateString(s){
    if(S.language!=='en')return s;
    const t=s.trim();
    if(exact[t])return s.replace(t,exact[t]);
    for(const [a,b] of englishLong)if(t===a)return s.replace(t,b);
    for(const [r,repl] of regex)if(r.test(t))return s.replace(t,t.replace(r,repl));
    return s;
  }

  function translateRoot(root=document){
    if(S.language!=='en')return;
    document.documentElement.lang='en';
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{if(n.parentElement?.closest('script,style'))return;const v=translateString(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v});
    root.querySelectorAll?.('[placeholder]').forEach(el=>{el.placeholder=translateString(el.placeholder)});
    const nav=document.querySelector('.nav');if(nav)nav.setAttribute('aria-label','Main navigation');
  }

  function refresh(){
    document.documentElement.lang=S.language;
    safe(()=>{renderToday();renderLab();renderPatterns();renderProgress();renderMe()});
    safe(()=>{if(typeof window.smokeLabApplyPersonalization==='function')window.smokeLabApplyPersonalization()});
    translateRoot(document);
    decorateLanguageRow();
  }

  function decorateLanguageRow(){
    const rows=[...document.querySelectorAll('#me .setting')];
    const row=rows.find(r=>['Sprache','Language'].includes(r.querySelector('b')?.textContent?.trim()));
    if(!row)return;
    const b=row.querySelector('b'),sm=row.querySelector('small');
    if(b)b.textContent=S.language==='en'?'Language':'Sprache';
    if(sm)sm.textContent=S.language==='en'?'English':'Deutsch';
    let control=row.querySelector('[data-language-toggle]');
    if(!control){row.querySelector('.pill')?.remove();control=document.createElement('button');control.className='linkbtn language-toggle';control.dataset.languageToggle='1';row.appendChild(control)}
    control.textContent=S.language==='en'?'DE':'EN';
    control.setAttribute('aria-label',S.language==='en'?'Switch to German':'Auf Englisch umstellen');
  }

  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-language-toggle]');if(!btn)return;
    e.preventDefault();e.stopPropagation();
    S.language=S.language==='en'?'de':'en';save();
    location.reload();
  },true);

  const observer=new MutationObserver(muts=>{if(S.language!=='en')return;for(const m of muts){m.addedNodes.forEach(n=>{if(n.nodeType===1)translateRoot(n);else if(n.nodeType===3&&n.parentElement)n.nodeValue=translateString(n.nodeValue)})}decorateLanguageRow()});
  observer.observe(document.body,{childList:true,subtree:true});
  safe(()=>{translateRoot(document);decorateLanguageRow()});
})();