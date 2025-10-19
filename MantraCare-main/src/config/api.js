// src/config/api.js
console.log("Using Base URL:", import.meta.env.VITE_API_BASE_URL);


// API Configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  if (window.location.hostname !== "localhost") {
    throw new Error(
      "❌ VITE_API_BASE_URL is missing! Production cannot call localhost."
    );
  } else {
    console.warn("⚠️ Using localhost for dev");
  }
}

const API_CONFIG = {
  BASE_URL: BASE_URL || "http://localhost:8080",
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
