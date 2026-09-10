const VERSION='20260910-safari-cachefix-v15';
const CACHE=`smoke-lab-static-${VERSION}`;
const STATIC_ASSETS=['./brand-lockup.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    for(const url of STATIC_ASSETS){
      try{
        const response=await fetch(`${url}?v=${VERSION}`,{cache:'reload'});
        if(response.ok) await cache.put(url,response.clone());
      }catch{}
    }
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
  if(event.data?.type==='PURGE_CACHES'){
    event.waitUntil((async()=>{
      const keys=await caches.keys();
      await Promise.all(keys.map(key=>caches.delete(key)));
      event.source?.postMessage?.({type:'PURGE_COMPLETE',version:VERSION});
    })());
  }
});

async function networkOnly(request){
  return fetch(request,{cache:'no-store'});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  // Never cache app shell/code. This avoids stale Safari/PWA builds.
  if(event.request.mode==='navigate' || /\.(?:html|js|css|json)$/.test(url.pathname)){
    if(url.pathname.endsWith('/dashboard-v2.js')){
      event.respondWith((async()=>{
        try{
          const response=await fetch(event.request,{cache:'no-store'});
          const text=await response.text();
          const patched=text+`\nimport('./home-hotfix-v4.js?v=${VERSION}').catch(console.error);`;
          return new Response(patched,{
            status:response.status,
            statusText:response.statusText,
            headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'no-store, no-cache, must-revalidate, max-age=0'}
          });
        }catch{
          return new Response('Offline',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
        }
      })());
      return;
    }
    event.respondWith(networkOnly(event.request).catch(()=>new Response('Offline',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})));
    return;
  }

  // Only immutable image assets are cached.
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
