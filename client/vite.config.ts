import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const baseApiUrl = env.VITE_API_URL

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/auth': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/media': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/artists': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/likes': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/follows': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/recommendations': {
          target: baseApiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
