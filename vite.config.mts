import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TCSS-491-Game/',
  server: {
    port: 3000, // Change to your preferred port
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Useful for debugging
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
