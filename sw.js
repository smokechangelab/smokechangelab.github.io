const CACHE_NAME = "smokelab-rc1-20260918";
const APP_SHELL = ["./app.html","./manifest.webmanifest","./icon.svg"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL.map(x => new Request(x,{cache:"reload"}))))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if(event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req=event.request;
  if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  const isNav=req.mode==="navigate" || url.pathname.endsWith("/app.html");
  if(isNav){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(res => {
          if(res && res.ok){
            const copy=res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put("./app.html",copy)).catch(()=>{});
          }
          return res;
        })
        .catch(() => caches.match("./app.html"))
    );
    return;
  }

  if(url.pathname.endsWith("/manifest.webmanifest") || url.pathname.endsWith("/icon.svg")){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(res => {
          if(res && res.ok){
            const copy=res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req,copy)).catch(()=>{});
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});