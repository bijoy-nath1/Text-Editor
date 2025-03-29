import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    allowedHosts: ['localhost', '127.0.0.1', '::1', '0b274d8b-ce64-4408-9561-abbd81dede33-00-1iqo4llmoghcs.sisko.replit.dev'],
  }
})
