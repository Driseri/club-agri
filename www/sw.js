const CACHE_NAME = 'clubogid-v1';
const FILES = [
  'index.html',
  'welcome.html',
  'form.html',
  'loading.html',
  'results.html',
  'club.html',
  'style.css',
  'tg-init.js',
  'manifest.json',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
