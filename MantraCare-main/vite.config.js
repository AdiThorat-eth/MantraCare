import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Clean, simple, production-ready Vite config
export default defineConfig({
  plugins: [react()],

  // Optional: custom base path if you deploy to a subdirectory (uncomment if needed)
  // base: process.env.VITE_BASE_PATH || "/MantraCare",

  server: {
    // You can still run the backend locally during development if needed
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
