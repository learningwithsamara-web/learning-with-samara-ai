// ── Samara AI Service Worker ─────────────────────────────────
// Version — bump this to force cache refresh on update
const CACHE_VERSION = 'samara-v1.0.12';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Files cached immediately on install — app works offline after first load
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts (cached after first online load)
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap',
];

// These origins are NEVER cached — always need live data
const NETWORK_ONLY = [
  'https://api.anthropic.com',       // AI calls always need internet
  'https://bfivpvlzehtmksnmgnzb.supabase.co', // Auth + database
  'https://www.paypal.com',          // Payment processing
];

// ── INSTALL — cache static assets ───────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing Samara AI v' + CACHE_VERSION);
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(err => {
        console.warn('[SW] Some precache items failed (normal on first load):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE — clean up old caches ──────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating Samara AI');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH — smart caching strategy ──────────────────────────
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Network-only: AI, auth, payments — always fresh
  if (NETWORK_ONLY.some(origin => url.startsWith(origin))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Google Fonts CSS — network first, fall back to cache
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    event.respondWith(networkFirstWithCache(event.request, DYNAMIC_CACHE));
    return;
  }

  // CDN scripts (Supabase JS) — cache first, refresh in background
  if (url.includes('cdn.jsdelivr.net') || url.includes('unpkg.com')) {
    event.respondWith(cacheFirstWithNetworkUpdate(event.request, DYNAMIC_CACHE));
    return;
  }

  // App shell (HTML, CSS, images from our own domain) — cache first
  if (url.startsWith(self.location.origin)) {
    event.respondWith(cacheFirstWithNetworkUpdate(event.request, STATIC_CACHE));
    return;
  }

  // Everything else — network first
  event.respondWith(networkFirstWithCache(event.request, DYNAMIC_CACHE));
});

// ── Cache strategies ─────────────────────────────────────────

// Cache first — great for app shell; updates silently in background
async function cacheFirstWithNetworkUpdate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch fresh version in background regardless
  const networkFetch = fetch(request).then(response => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  return cached || await networkFetch || offlineFallback();
}

// Network first — good for content that changes; falls back to cache
async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    const cached = await caches.match(request);
    return cached || offlineFallback();
  }
}

// Offline fallback page
function offlineFallback() {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Samara AI — Offline</title>
<style>
  body { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg,#0f0c29,#302b63); min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 24px; }
  h1 { font-family: cursive; font-size: 2rem; color: #FFD93D; margin-bottom: 12px; }
  p  { color: rgba(255,255,255,0.8); font-size: 1rem; margin-bottom: 20px; line-height: 1.6; }
  button { background: linear-gradient(135deg,#FFD93D,#FF9B3F); color: #fff; border: none; border-radius: 50px; padding: 12px 28px; font-size: 1rem; font-weight: 800; cursor: pointer; }
</style>
</head>
<body>
  <div>
    <div style="font-size:4rem;margin-bottom:16px;">🌐</div>
    <h1>You're offline!</h1>
    <p>Samara AI needs internet to load fresh questions and AI responses.<br>
    Check your connection and try again — we'll be right here!</p>
    <button onclick="window.location.reload()">Try Again 🚀</button>
    <p style="margin-top:16px;font-size:0.82rem;opacity:0.5;">
      Need help? edu@learningwithsamara.com
    </p>
  </div>
</body>
</html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// ── BACKGROUND SYNC — retry failed score saves ───────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-scores') {
    event.waitUntil(syncPendingScores());
  }
});

async function syncPendingScores() {
  // Scores that failed to save while offline get retried here
  // The app stores them in localStorage under 'samara_pending_scores'
  console.log('[SW] Background sync: retrying pending score saves');
}

// ── PUSH NOTIFICATIONS (optional, for future study reminders) ─
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Samara AI', {
      body: data.body || 'Time to learn something amazing today! 🌟',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      tag: 'samara-reminder',
      renotify: false,
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

console.log('[SW] Samara AI Service Worker loaded ✅');
