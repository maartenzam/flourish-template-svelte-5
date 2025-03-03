import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '',
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/template.svelte.js'),
      formats: ['iife'],
      fileName: 'template.js',
      name: 'template',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'template.js',
      },
    },
  },
});
