import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: process.env.VITE_BASE_PATH || "/MantraCare",
  server: {
    proxy: {
      "/api": {
        target: "https://mantra-comprehensive-mental-health.onrender.com", // Change this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
