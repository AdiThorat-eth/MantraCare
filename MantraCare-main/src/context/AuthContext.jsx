import React, { createContext, useContext, useState, useEffect } from 'react';
import API_CONFIG from '../config/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 LOGIN
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_CONFIG.url(API_CONFIG.ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Login failed: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      const extractedToken = data.data?.token || data.token;
      const extractedUser = data.data?.user || data.user;

      if (!extractedToken) throw new Error('No token received from server');

      localStorage.setItem('token', extractedToken);
      localStorage.setItem('user', JSON.stringify(extractedUser));

      setToken(extractedToken);
      setUser(extractedUser);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 REGISTER
  const register = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_CONFIG.url(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Register failed: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      const extractedToken = data.data?.token || data.token;
      const extractedUser = data.data?.user || data.user;

      if (!extractedToken) throw new Error('No token received from server');

      localStorage.setItem('token', extractedToken);
      localStorage.setItem('user', JSON.stringify(extractedUser));

      setToken(extractedToken);
      setUser(extractedUser);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, register, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
