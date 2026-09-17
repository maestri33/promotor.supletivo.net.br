import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://127.0.0.1:3015',
  },
  projects: [{ name: 'chromium', use: { ...devices['Pixel 7'] } }],
  webServer: {
    command: 'npx astro preview --host 127.0.0.1 --port 3015',
    url: 'http://127.0.0.1:3015',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
