import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { devConfig } from './src/config';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
      '/artists': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
      '/likes': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
      '/follows': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
      '/recommendations': {
        target: devConfig.baseApiUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
