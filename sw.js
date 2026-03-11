// Service Worker — Anomalias STCGYN
// Versão: incrementar aqui força atualização em todos os clientes
const VERSION = 'v3';

// Instala e ativa imediatamente sem esperar abas fecharem
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: sempre tenta buscar do servidor primeiro
// Se offline, cai no cache como fallback
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
