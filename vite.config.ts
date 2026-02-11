
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      sourcemap: false,
    },
    server: {
      port: 3000,
      open: true,
      headers: {
        'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
      },
    },
  });