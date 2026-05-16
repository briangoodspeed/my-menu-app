const CACHE_NAME = 'menulink-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['/']))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin)) return; e.respondWith(fetch(e.request).then(r=>{ if(r.ok) caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone())); return r; }).catch(()=>caches.match(e.request).then(c=>c||caches.match('/')))); });
