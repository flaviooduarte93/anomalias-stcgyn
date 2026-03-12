// Service Worker — Anomalias STCGYN
// Estrategia: HTML sempre da rede, assets podem usar cache

const CACHE = 'stcgyn-v4';

// Instala e ativa imediatamente
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  // Remove caches antigos
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Arquivos HTML: SEMPRE busca da rede, nunca usa cache
  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match(e.request)) // fallback offline
    );
    return;
  }

  // Firebase, Firestore, APIs externas: sempre rede
  if (url.hostname.includes('firebaseapp') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic') ||
      url.hostname.includes('cloudinary')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Demais assets (fontes, imagens): cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});
