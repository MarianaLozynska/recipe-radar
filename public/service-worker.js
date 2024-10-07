self.addEventListener("install", (event) => {
  // Skip waiting to ensure the service worker takes control immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up old caches if necessary
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== "api-cache";
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch event for caching API responses
self.addEventListener("fetch", (event) => {
  // API endpoints to cache
  const apiUrl = "https://dummyjson.com/recipes";

  // Check if the request is for the API endpoint
  if (event.request.url.startsWith(apiUrl)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("Cached response:", cachedResponse);
          return cachedResponse; // Return cached data if available
        }
        return fetch(event.request).then((networkResponse) => {
          // Cache the new response from the network
          return caches.open("api-cache").then((cache) => {
            cache.put(event.request, networkResponse.clone());
            console.log("Network response:", networkResponse);
            return networkResponse;
          });
        });
      })
    );
  }
});
