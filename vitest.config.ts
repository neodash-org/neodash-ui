import { defineConfig } from 'vitest/config';
import path from 'path';

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
