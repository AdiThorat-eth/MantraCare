// API Configuration
const API_CONFIG = {
  // Use Vite env var in production, fallback to localhost for dev
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  
  // API endpoints (relative)
  ENDPOINTS: {
    CHAT_MESSAGE: '/api/chatbot/message',
  },

  // Build full URL helper
  url: (endpoint) => {
    // Accept either relative endpoints from ENDPOINTS or full URLs
    if (!endpoint) return API_CONFIG.BASE_URL;
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;
    return `${API_CONFIG.BASE_URL.replace(/\/+$/,'')}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  },
  
  // Headers
  getHeaders: () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },
  
  // Debug function to test connection
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

export default API_CONFIG;
