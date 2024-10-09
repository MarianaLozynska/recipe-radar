import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright-tests", // Directory where your Playwright tests live
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  use: {
    browserName: "chromium", // Default browser for tests
    baseURL: "http://localhost:5173", // Base URL for your app
    trace: "off",
    headless: true, // Run tests in headless mode
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
  // Add testMatch option to recognize .e2e.ts files
  testMatch: ["**/*.e2e.ts"], // Recognize files with the .e2e.ts extension
});
