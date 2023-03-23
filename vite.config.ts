import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    fs: {
      allow: [
        'src',
        'src/zKeyFiles'
      ]
    }
  },
  build: {
    target: 'esnext',
  },
})
