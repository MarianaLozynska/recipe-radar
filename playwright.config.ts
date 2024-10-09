import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright-tests",
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  use: {
    browserName: "chromium",
    baseURL: "http://localhost:5173",
    trace: "off",
    headless: true,
  },
  // Configure projects for multiple browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  testMatch: ["**/*.e2e.ts"],
});
