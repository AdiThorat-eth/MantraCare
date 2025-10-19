// src/config/api.js
console.log("Using Base URL:", import.meta.env.VITE_API_BASE_URL);


// API Configuration
const API_CONFIG = {
  // Automatically choose backend based on environment
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'https://mantra-comprehensive-mental-health.onrender.com'),

  // API endpoints (relative)
  ENDPOINTS: {
    CHAT_MESSAGE: '/api/chatbot/message',
  },

  // Build full URL helper
  url: (endpoint) => {
    if (!endpoint) return API_CONFIG.BASE_URL;
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://'))
      return endpoint;
    return `${API_CONFIG.BASE_URL.replace(/\/+$/, '')}${
      endpoint.startsWith('/') ? '' : '/'
    }${endpoint}`;
  },

  // Headers
  getHeaders: () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  // Debug helper
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

// Log to confirm which base URL is used
console.log('🔍 Using Base URL:', API_CONFIG.BASE_URL);

export default API_CONFIG;
