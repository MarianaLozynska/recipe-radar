self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("image-cache").then((cache) => {
      return cache.addAll(["src/assets/images/fallback_image.jpg"]);
    })
  );
  self.skipWaiting(); // Ensure service worker takes control immediately
});

self.addEventListener("activate", (event) => {
  // Clean up old caches if necessary
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName !== "api-cache" && cacheName !== "image-cache"
          )
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch event for caching API responses and images
self.addEventListener("fetch", (event) => {
  const apiUrl = "https://dummyjson.com/recipes";
  const imageCache = "image-cache";

  // Handle API data requests
  if (event.request.url.startsWith(apiUrl)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("Returning cached API response:", cachedResponse.url);
          return cachedResponse;
        }

        // If no cached response is found, fetch the data from the network
        return (
          fetch(event.request)
            // Cache the new response from the network for future requests
            .then((networkResponse) => {
              return caches.open("api-cache").then((cache) => {
                cache.put(event.request, networkResponse.clone());
                console.log("Caching new API response:", networkResponse.url);
                return networkResponse;
              });
            })
            .catch(() => {
              // Handle the case when the network request fails
              console.error("Fetch failed; network error or offline.");
              return new Response(
                JSON.stringify({
                  error:
                    "You are offline, and the requested data is not cached.",
                }),
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
            })
        );
      })
    );
  }

  // Handle image requests
  else if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cachedImage) => {
        if (cachedImage) {
          console.log("Returning cached image");
          return cachedImage;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            return caches.open(imageCache).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              console.log("Returning new image");
              return networkResponse;
            });
          })
          .catch(() => {
            // Return fallback image if the image fetch fails
            console.warn("Fetch failed for image; returning fallback.");
            return caches.match("src/assets/images/fallback_image.jpg");
          });
      })
    );
  }
});
