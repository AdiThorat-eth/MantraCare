// src/config/api.js
console.log("Using Base URL:", import.meta.env.VITE_API_BASE_URL);


const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'https://mantra-comprehensive-mental-health.onrender.com'),

  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    CHAT_MESSAGE: '/api/chatbot/message',
  },

  url: (endpoint) => {
    if (!endpoint) return API_CONFIG.BASE_URL;
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://'))
      return endpoint;
    return `${API_CONFIG.BASE_URL.replace(/\/+$/, '')}${
      endpoint.startsWith('/') ? '' : '/'
    }${endpoint}`;
  },

  getHeaders: () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  testConnection: async () => {
    try {
      const response = await fetch(API_CONFIG.url('/api/health'), {
        method: 'GET',
        headers: API_CONFIG.getHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  },
};

// Debug log to verify deployed base URL
console.log('🔍 Using API Base URL:', API_CONFIG.BASE_URL);

export default API_CONFIG;