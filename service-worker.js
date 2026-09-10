const VERSION='20260910-cachefix-v14';
const CACHE=`smoke-lab-${VERSION}`;
const STATIC_ASSETS=['./brand-lockup.svg','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(STATIC_ASSETS.map(async url=>{
      try{
        const response=await fetch(`${url}?v=${VERSION}`,{cache:'reload'});
        if(response.ok) await cache.put(url,response.clone());
      }catch{}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    clients.forEach(client=>client.postMessage({type:'SMOKE_LAB_SW_VERSION',version:VERSION}));
  })());
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});

async function networkFirst(request){
  try{
    return await fetch(request,{cache:'no-store'});
  }catch{
    const cached=await caches.match(request,{ignoreSearch:true});
    if(cached) return cached;
    if(request.mode==='navigate'){
      const fallback=await caches.match('./index.html',{ignoreSearch:true});
      if(fallback) return fallback;
    }
    throw new Error('offline');
  }
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  // HTML, JS and CSS are always network-first and never served stale while online.
  if(event.request.mode==='navigate' || /\.(?:html|js|css)$/.test(url.pathname)){
    if(url.pathname.endsWith('/dashboard-v2.js')){
      event.respondWith((async()=>{
        try{
          const response=await fetch(event.request,{cache:'no-store'});
          const text=await response.text();
          const patched=text+`\nimport('./home-hotfix-v4.js?v=${VERSION}').catch(console.error);`;
          return new Response(patched,{
            status:response.status,
            statusText:response.statusText,
            headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'no-store, max-age=0'}
          });
        }catch{
          return networkFirst(event.request);
        }
      })());
      return;
    }
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Only stable static assets may use cache-first.
  event.respondWith((async()=>{
    const cached=await caches.match(event.request,{ignoreSearch:true});
    if(cached) return cached;
    const response=await fetch(event.request,{cache:'no-store'});
    if(response.ok){
      const cache=await caches.open(CACHE);
      cache.put(event.request,response.clone()).catch(()=>{});
    }
    return response;
  })());
});
