// src/config/api.js
console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);

const API_CONFIG = {
  // Base URL from environment or fallback to localhost
  BASE_URL: import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8080",

  ENDPOINTS: {
    AUTH_LOGIN: "/api/auth/login",
    AUTH_REGISTER: "/api/auth/register",
    CHAT_MESSAGE: "/api/chatbot/message",
  },

  // Builds full URL correctly
  url: (endpoint) => {
    if (!endpoint) return API_CONFIG.BASE_URL;
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
      return endpoint;
    }
    const base = API_CONFIG.BASE_URL.replace(/\/+$/, "");
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
  },

  // Build headers with token
  getHeaders: () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  },

  // Quick health check
  testConnection: async () => {
    try {
      const res = await fetch(API_CONFIG.url("/api/health"), {
        method: "GET",
        headers: API_CONFIG.getHeaders(),
      });
      return res.ok;
    } catch (err) {
      console.error("Connection test failed:", err);
      return false;
    }
  },
};

export default API_CONFIG;
