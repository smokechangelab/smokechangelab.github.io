// Smoke Lab v47.11 — keep the Me screen focused on settings users actually need.
(()=>{
  const tidy=()=>{
    const root=document.getElementById('me');
    if(!root)return;
    const rows=[...root.querySelectorAll('.setting')];
    const byLabel=label=>rows.find(row=>row.querySelector('b')?.textContent?.trim()===label);

    // Smoking experience still remains stored and is used for personalization,
    // but it does not need to occupy a permanent settings row.
    const smoking=byLabel('Raucherfahrung')||byLabel('Rauchjahre');
    if(smoking)smoking.remove();

    // Merge the two informational rows into one concise place.
    const privacy=byLabel('Datenschutz & Info');
    const notice=byLabel('Hinweis');
    if(privacy){
      const label=privacy.querySelector('b');
      const small=privacy.querySelector('small');
      if(label)label.textContent='Datenschutz & Hinweis';
      if(small)small.textContent='Lokal gespeichert · kein Konto · kein Ersatz für medizinische Behandlung';
    }
    if(notice)notice.remove();
  };

  const root=document.getElementById('me');
  if(root){
    let scheduled=false;
    new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      queueMicrotask(()=>{scheduled=false;tidy()});
    }).observe(root,{childList:true,subtree:true});
  }
  tidy();
})();
