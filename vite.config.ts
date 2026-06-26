import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Замени 'krilicrm' на имя твоего репозитория на GitHub!
export default defineConfig({
  plugins: [react()],
  base: '/krilicrm/',
})
