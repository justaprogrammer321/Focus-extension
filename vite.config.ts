import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        options: 'options.html',
        background: 'chrome/background.ts',  // Specify the path to your background.ts
        content:'chrome/content.ts'
      },
      output: {
        entryFileNames: '[name].js',  
      },
    },
  },
});
