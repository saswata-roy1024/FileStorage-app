// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
 
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5000
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,  // Ensures source maps are generated
  },
  // Optional: Additional development-specific settings
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'production')
  },
});
