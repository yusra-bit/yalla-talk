/*
 * Yalla Talk service worker.
 *
 * This is a TEMPLATE: the Vite plugin in vite.config.ts fills in the version string and the list of files
 * to precache at build time and writes the result to dist/sw.js. The version is a hash of the built files,
 * so sw.js only changes (and browsers only update it) when the app actually changes.
 *
 * Strategy
 *  - Precache the whole app shell on install, so the game works offline from the first visit.
 *  - Navigations: network first (friends always get the newest version when online), cached index.html
 *    as the offline fallback.
 *  - Same-origin files (hashed JS/CSS, icons): cache first. Their names change whenever their content does.
 *  - Google Fonts: cached the first time they load, so the real fonts also work offline afterwards.
 *  - Everything else, and every non-GET request, passes straight through to the network.
 */
const VERSION = '__VERSION__'
const PRECACHE = 'yalla-talk-precache-' + VERSION
const FONT_CACHE = 'yalla-talk-fonts-v1'
const SCOPE = self.registration.scope
const PRECACHE_URLS = __PRECACHE__.map((path) => new URL(path, SCOPE).href)
const INDEX_URL = new URL('index.html', SCOPE).href
const NAVIGATION_TIMEOUT_MS = 4000
// Files are keyed by URL, so the cache must ignore Vary headers. Some servers send "Vary: Origin", and module scripts
// are fetched in CORS mode (with an Origin header) while precaching is not, which would otherwise cause cache misses.
const MATCH = { ignoreVary: true }

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      // cache: 'reload' bypasses the HTTP cache so a new version never precaches stale files.
      .then((cache) => cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { cache: 'reload' }))))
      // Take over immediately. Already-open pages keep running the code they loaded; the next launch uses the new version.
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(names.filter((n) => n.startsWith('yalla-talk-precache-') && n !== PRECACHE).map((n) => caches.delete(n)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  if (request.mode === 'navigate') return event.respondWith(handleNavigation(request))
  if (url.origin === self.location.origin) return event.respondWith(cacheFirst(request))
  if (url.hostname === 'fonts.googleapis.com') return event.respondWith(staleWhileRevalidate(event, request))
  if (url.hostname === 'fonts.gstatic.com') return event.respondWith(cacheFirstRuntime(request))
  // anything else: default browser behavior
})

async function handleNavigation(request) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), NAVIGATION_TIMEOUT_MS)
  try {
    return await fetch(request, { signal: controller.signal })
  } catch {
    // Offline or very slow connection: the app shell is enough, because all game content is bundled.
    return (await caches.match(INDEX_URL, MATCH)) || Response.error()
  } finally {
    clearTimeout(timer)
  }
}

async function cacheFirst(request) {
  return (await caches.match(request, MATCH)) || fetch(request)
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(FONT_CACHE)
  const cached = await cache.match(request, MATCH)
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => undefined)
  event.waitUntil(refresh)
  return cached || (await refresh) || Response.error()
}

async function cacheFirstRuntime(request) {
  const cache = await caches.open(FONT_CACHE)
  const cached = await cache.match(request, MATCH)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) cache.put(request, response.clone())
  return response
}
