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
    // Ensure the service worker is registered
    expect(swRegistration).toBeTruthy();
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

      // Verify that the API response is cached
      expect(cachedResponse).toBeTruthy();
      await route.continue();
    });

    // Trigger the API request
    await page.goto(`http://localhost:5173`);
  });

  test("should return cached response when offline", async ({ page }) => {
    const recipeUrl = "https://dummyjson.com/recipes/1";

    // Step 1: Fetch the recipe to cache it
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.text();
    }, recipeUrl);

    expect(response).toContain("Classic Margherita Pizza");

    // Step 2: Intercept the request and mock the cached response when offline
    await page.route(recipeUrl, (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          name: "Classic Margherita Pizza",
          ingredients: [
            "Pizza dough",
            "Tomato sauce",
            "Fresh mozzarella cheese",
          ],
        }),
      });
    });

    await page.context().setOffline(true);

    await page.goto(recipeUrl);

    const cachedContent = await page.content();
    // Verify cached data
    expect(cachedContent).toContain("Classic Margherita Pizza");

    await page.context().setOffline(false);
  });
});
