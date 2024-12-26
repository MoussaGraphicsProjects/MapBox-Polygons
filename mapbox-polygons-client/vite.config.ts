import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  server: {
    host: '0.0.0.0',  // Allow access from any IP address
    port: 5173,       // Default port for Vite
  },
})
