/**
 * API Configuration using runtime config
 * Safe for production — never calls localhost accidentally
 */

const BASE_URL = window._env_?.API_BASE_URL;

if (!BASE_URL) {
  if (window.location.hostname !== "localhost") {
    throw new Error(
      "❌ API_BASE_URL is missing! Production cannot call localhost. Set window._env_.API_BASE_URL in /public/config.js"
    );
  } else {
    console.warn("⚠️ Using localhost for development");
  }
}

const API_CONFIG = {
  BASE_URL: BASE_URL || "http://localhost:8080", // fallback for dev only
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  url: (endpoint) =>
    `${API_CONFIG.BASE_URL.replace(/\/+$/, "")}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`,
  getHeaders: () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  },
};

console.log("🔍 Using API Base URL:", API_CONFIG.BASE_URL);

export default API_CONFIG;
