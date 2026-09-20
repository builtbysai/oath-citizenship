/* Offline support for the Oath study app.
   Strategy (no manual version bumps needed):
   - Navigations / HTML documents: NETWORK FIRST, fall back to cache.
     The app shell is always fresh when the user is online; the cached copy
     keeps the app working fully offline.
   - Static assets (icons, manifest): STALE-WHILE-REVALIDATE.
     Serve the cached copy instantly, refresh it in the background.
   - On activate: delete any caches from older versions. */
const CACHE = 'oath-v1';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (isDoc) {
      try {
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      } catch (err) {
        const hit = await cache.match(e.request, { ignoreSearch: true });
        return hit || cache.match('index.html');
      }
    }
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const refresh = fetch(e.request)
      .then((res) => { cache.put(e.request, res.clone()); return res; })
      .catch(() => null);
    if (hit) { e.waitUntil(refresh); return hit; }
    const net = await refresh;
    return net || cache.match('index.html');
  })());
});
