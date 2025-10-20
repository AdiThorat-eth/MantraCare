/**
 * ✅ API Configuration - Safe for both local & production
 * Reads backend URL dynamically from /public/env.js (window._env_)
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined" && window._env_?.API_BASE_URL) {
    return window._env_.API_BASE_URL;
  }

  // 🧪 Local fallback (only when running vite dev server)
  if (window.location.hostname === "localhost") {
    console.warn("⚠️ Using localhost backend for development");
    return "http://localhost:8080";
  }

  throw new Error(
    "❌ No API_BASE_URL found! Make sure /public/env.js is loaded in index.html."
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

console.log("🔍 Using API Base URL:", API_CONFIG.BASE_URL);

export default API_CONFIG;
