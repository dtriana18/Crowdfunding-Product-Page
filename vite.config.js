import { defineConfig } from 'vite';
import html from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    html({
      minify: true
    })
  ]
});