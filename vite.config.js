import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const PROD_FALLBACK = "https://viktor-pozivnica-server.onrender.com";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://mina-pozivnica-server.onrender.com",
        changeOrigin: true,
      },
    },
  },
})
