/**
 * ✅ API Configuration - Safe for both Local & Production
 * Uses runtime config from /public/env.js (window._env_)
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined" && window._env_?.API_BASE_URL) {
    // 🟢 Production or custom runtime config
    return window._env_.API_BASE_URL;
  }

  // 🧪 Local development fallback
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    console.warn("⚠️ Using localhost backend for development");
    return "http://localhost:8080";
  }

  throw new Error(
    "❌ No API_BASE_URL found! Make sure /public/env.js is loaded in index.html or set VITE_API_BASE_URL in environment."
  );
};

const BASE_URL = getBaseUrl();

const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  url: (endpoint) =>
    `${BASE_URL.replace(/\/+$/, "")}${
      endpoint.startsWith("/") ? "" : "/"
    }${endpoint}`,
  getHeaders: () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  },
};

console.log("🌍 Active API Base URL:", API_CONFIG.BASE_URL);

export default API_CONFIG;
