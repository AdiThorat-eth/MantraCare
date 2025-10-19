// src/config/api.js
console.log("Using Base URL:", import.meta.env.VITE_API_BASE_URL);


// API Configuration
const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // fallback for dev

  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },

  url: (endpoint) => {
    if (!endpoint) return API_CONFIG.BASE_URL;
    return `${API_CONFIG.BASE_URL.replace(/\/+$/, '')}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  },

  getHeaders: () => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },
};

console.log('🔍 Using API Base URL:', API_CONFIG.BASE_URL);

export default API_CONFIG;
