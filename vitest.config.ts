import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['e2e', 'node_modules', 'src/types', 'src/styles'],
    coverage: {
      provider: 'v8',
      exclude: ['node_modules/', '.next/', 'e2e/', '**/*.test.*', '**/*.spec.*'],
    },
  },
});
