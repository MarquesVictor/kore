// Testes de navegador (`npm run test:e2e`, Playwright + Chromium).
// Rodam contra o build de produção (pré-renderizado), servido pelo `vite preview`:
// é o que vai ao ar. O build é refeito a cada execução para nunca testar um dist/ velho.
import { defineConfig, devices } from '@playwright/test';

const PORT = 4183; // fora da 4173 padrão do `npm run preview`, para não colidir com um preview aberto

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
