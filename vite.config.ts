import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

const port = parseInt(process.env.PORT || '3000', 10);

export default defineConfig({
  plugins: [react(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/static': path.resolve(__dirname, './src/static'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/types': path.resolve(__dirname, './src/types')
    }
  },
  server: {
    port: port,
    host: true, // 모든 네트워크 인터페이스에서 수신
    strictPort: true, // 지정된 포트를 엄격하게 사용
  },
  build: {
    target: ['es2015', 'ie11'],
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          style: ['styled-components']
        }
      }
    }
  },
  base: '/'
}); 