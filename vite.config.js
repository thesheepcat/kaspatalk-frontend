import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BACKEND_NODE } from "./userSettings";

// https://vite.dev/config/
// #TODO
export default defineConfig({
  plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: BACKEND_NODE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
})
