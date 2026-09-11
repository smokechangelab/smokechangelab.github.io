// Smoke Lab v47.12 — clearer in-the-moment help copy
(()=>{
  const lang=()=>typeof S!=='undefined'&&S.language==='en'?'en':'de';
  const labels={
    de:{early:'Schon besser?',down:'Deutlich schwächer',same:'Etwa gleich',up:'Stärker'},
    en:{early:'Feeling better?',down:'Clearly weaker',same:'About the same',up:'Stronger'}
  };
  function polish(){
    const root=document.getElementById('intervention');
    if(!root)return;
    const t=labels[lang()];
    const early=root.querySelector('[data-reassess]');
    if(early&&early.textContent.trim()!==t.early)early.textContent=t.early;
    root.querySelectorAll('[data-outcome]').forEach(btn=>{
      const key=btn.dataset.outcome;
      const text=key==='down'?t.down:key==='same'?t.same:key==='up'?t.up:null;
      if(text&&btn.textContent.trim()!==text)btn.textContent=text;
    });
  }
  const root=document.getElementById('intervention');
  if(root)new MutationObserver(polish).observe(root,{childList:true,subtree:true});
  polish();
})();