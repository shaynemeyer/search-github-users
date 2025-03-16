import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,tsx}'],
      exclude: [
        'src/config/**',
        'src/vendor/**',
        'src/hooks/**',
        'src/apolloClient.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
