import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/cg-business/" : "/",
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['src/main.js', './index.html']
    }
  },
  assetsInclude: ['**/*.PNG', '**/*.html', '**/*.scss'],
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|gif|svg|scss)$/i, use: 'file-loader' },
    ]
  },
})
