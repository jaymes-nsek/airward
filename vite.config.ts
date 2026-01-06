import path from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@mui/icons-material': path.resolve(__dirname, 'src/mui-icons-material'),
      '@mui/material': path.resolve(__dirname, 'src/mui-material'),
    },
  },
})
