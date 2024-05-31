import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    proxy: {
      '/ques': {
        target: 'http://localhost:8080', // 你的后端服务地址
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ques/, '/ques')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
