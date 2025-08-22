// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   // ---- ADD THIS ENTIRE 'server' BLOCK ----
//   server: {
//     headers: {
//       'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
//     },
//   },
//   // ------------------------------------
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})