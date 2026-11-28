import { defineConfig } from "@playwright/test";

// Run `npm run e2e`: it builds with an empty BASE_PATH, serves ./out and runs the specs.
export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:4173",
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] } : { args: ["--no-sandbox"] },
  },
  webServer: { command: "node scripts/serve-out.mjs 4173", url: "http://localhost:4173/en/", reuseExistingServer: true },
});
