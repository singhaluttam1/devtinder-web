import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],    
    server: {
    allowedHosts: [
      '5a0e0096725c.ngrok-free.app', // Your exact ngrok URL
      '.ngrok-free.app'              // Allow all ngrok subdomains
    ]}
})
