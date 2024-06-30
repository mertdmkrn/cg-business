import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/cg-business/' : '/',

  assetsInclude: ['**/*.png'],
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|gif|svg|scss)$/i, use: 'file-loader' },
    ]
  },
})
