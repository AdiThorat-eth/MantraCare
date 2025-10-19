import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: process.env.VITE_BASE_PATH || "/MantraCare",
  server: {
    proxy: {
      "/api": {
        // Use env var for dev proxy target if provided, otherwise fallback to localhost
        target: process.env.VITE_API_BASE_URL || "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
