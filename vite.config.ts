import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://alejandrotoledoweb.github.io/danec-ventas-app/",
  build: {
    outDir: 'docs',
  },
})
