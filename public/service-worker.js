const CACHE = 'foodbook-veg-v2';
const BASE = '/Vegetarian/';
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const page = await fetch(BASE);
    await cache.put(BASE, page.clone());
    const html = await page.text();
    const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map(match => new URL(match[1], self.location.origin).href);
    await Promise.allSettled([`${BASE}manifest.webmanifest`, `${BASE}foodbook-icon.svg`, ...assets].map(path => cache.add(path)));
  })());
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/rest/v1/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(BASE, copy)); return response;
    }).catch(() => caches.match(BASE)));
  } else if (/\.(?:js|css|svg|webmanifest)$/.test(url.pathname)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); return response;
    })));
  }
});
