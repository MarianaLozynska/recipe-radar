import { test, expect } from "@playwright/test";

test.describe("Service Worker tests", () => {
  test("should register the service worker", async ({ page }) => {
    // Set a higher timeout in case it takes longer
    test.setTimeout(60 * 1000);

    // Navigate to the app's root URL
    await page.goto("http://localhost:5173");

    // Evaluate the service worker registration in the page context
    const swRegistration = await page.evaluate(async () => {
      // Get the service worker registration
      const registration = await navigator.serviceWorker.getRegistration();
      return registration ? registration.scope : null;
    });

    // Log and test whether the service worker is registered
    console.log("Service worker registration scope:", swRegistration);
    expect(swRegistration).toBeTruthy(); // Ensure the service worker is registered
  });

  test("should cache API responses", async ({ page }) => {
    const apiUrl = "https://dummyjson.com/recipes";

    // Listen for the service worker's `fetch` event
    await page.route(apiUrl, async (route) => {
      const response = await route.fetch();
      expect(response.status()).toBe(200);

      const cachedResponse = await page.evaluate(async () => {
        // Access the cache in the service worker
        const cache = await caches.open("api-cache");
        return cache.match(apiUrl);
      });

      expect(cachedResponse).toBeTruthy(); // Verify that the API response is cached
      await route.continue();
    });

    // Trigger the API request
    await page.goto(`http://localhost:5173`);
  });

  //   test.skip("should use cached response if available when offline", async ({
  //     page,
  //     context,
  //   }) => {
  //     const apiUrl = "https://dummyjson.com/recipes?select=name"; // Exact URL being cached

  //     // Ensure the page is online and cache the API response first
  //     await context.setOffline(false);
  //     console.log("Going online and making request...");
  //     await page.goto(apiUrl); // Make the request to cache the API response
  //     await page.waitForLoadState("networkidle"); // Ensure the API request is made and cached
  //     console.log("Response cached.");

  //     // Simulate being offline
  //     await context.setOffline(true);
  //     console.log("Going offline...");

  //     // Try fetching the same API while offline
  //     const response = await page.goto(apiUrl, { waitUntil: "load" });

  //     // Log the response for debugging
  //     console.log(
  //       "Response while offline:",
  //       response ? response.status() : "No response"
  //     );

  //     // Expect the response to come from the cache and have a status of 200
  //     // expect(response?.status()).toBe(200);

  //     // Set context back online
  //     await context.setOffline(false);
  //   });

  //   test("should clean up old caches on activation", async ({ page }) => {
  //     const cacheNameToKeep = "api-cache";

  //     const cachesCleared = await page.evaluate(async () => {
  //       // Get all cache names
  //       const cacheNames = await caches.keys();

  //       // Check if any cache other than "api-cache" has been cleared
  //       return cacheNames.filter((name) => name !== cacheNameToKeep).length === 0;
  //     });

  //     expect(cachesCleared).toBeTruthy(); // Expect only "api-cache" to be left
  //   });
});
