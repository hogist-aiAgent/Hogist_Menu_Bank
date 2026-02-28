import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'/prepare-your-own-menu1/',
  plugins: [react()],
  server:{host:true}
})
