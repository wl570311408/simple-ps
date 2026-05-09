import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/simple-ps/', // ← 就加这一行！仓库名就是你的子路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
