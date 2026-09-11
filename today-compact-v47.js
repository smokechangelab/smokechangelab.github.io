// Smoke Lab v47.10 — compact TODAY header and one-screen composition
(()=>{
  const safe=fn=>{try{fn()}catch(e){console.error('Smoke Lab TODAY compact:',e)}};
  if(typeof S==='undefined'||typeof renderToday!=='function')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const greeting=()=>{
    const h=new Date().getHours(),en=S.language==='en';
    if(h>=5&&h<11)return en?'Good morning':'Guten Morgen';
    if(h>=11&&h<18)return en?'Good afternoon':'Guten Tag';
    return en?'Good evening':'Guten Abend';
  };
  const baseToday=renderToday;
  renderToday=function(){
    baseToday();
    const root=document.getElementById('today');
    const first=root?.firstElementChild;
    if(!first)return;
    const name=typeof S.name==='string'?S.name.trim():'';
    const hello=name?`${greeting()}, ${esc(name)}`:greeting();
    const meta=S.language==='en'?`TODAY · DAY ${day()}`:`HEUTE · TAG ${day()}`;
    first.className='today-welcome today-welcome-compact';
    first.innerHTML=`<div class="today-greeting-line">${hello}</div><div class="today-welcome-meta">${meta}</div>`;
  };
  safe(()=>{if(document.getElementById('today')?.classList.contains('active'))renderToday()});
})();