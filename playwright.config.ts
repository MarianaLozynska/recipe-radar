import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory where your Playwright tests will live
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  use: {
    browserName: "chromium", // Default browser for tests
    baseURL: "http://localhost:3000", // Base URL for the Vite app (adjust port if needed)
    trace: "on", // Capture trace when retrying failed tests
    headless: true, // Headless mode by default
  },
  // Configure projects for multiple browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
