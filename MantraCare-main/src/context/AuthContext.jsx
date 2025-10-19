import React, { createContext, useContext, useState, useEffect } from 'react';
import API_CONFIG from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Use API_CONFIG.url so the env base URL is respected
      const res = await fetch(API_CONFIG.url('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Login failed: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      
      // Extract token & user with safe fallbacks
      const extractedToken = data.data?.token || data.token || data.accessToken || data.jwt || data.access_token;
      const extractedUser = data.data?.user || data.user || data.data || data;

      if (!extractedToken) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', extractedToken);
      localStorage.setItem('user', JSON.stringify(extractedUser));
      
      setToken(extractedToken);
      setUser(extractedUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
