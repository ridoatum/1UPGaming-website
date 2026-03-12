/**
 * 1UPGaming — Service Worker
 * Enables offline support and Chrome PWA installability
 */

const CACHE_NAME = '1upgaming-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/games.html',
  '/booking.html',
  '/terms.html',
  '/pricelist.html',
  '/css/style.css',
  '/css/print.css',
  '/js/main.js',
  '/manifest.json',
  '/icons/icon.svg'
];

// Install: pre-cache shell assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for pages, cache-first for static assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const isNavigation = request.mode === 'navigate';
  const isStatic = /\.(css|js|svg|png|jpg|webp|woff2?)$/.test(url.pathname);

  if (isNavigation) {
    // Network-first for HTML pages
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/index.html')))
    );
  } else if (isStatic) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        });
      })
    );
  }
});
