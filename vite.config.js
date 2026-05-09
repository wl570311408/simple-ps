import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const buildTime = new Date().toLocaleString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).replace(/\//g, '-')

export default defineConfig({
  base: '/simple-ps/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    '__BUILD_TIME__': JSON.stringify(buildTime)
  }
})
