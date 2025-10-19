import React, { createContext, useContext, useState } from "react";
import API_CONFIG from "../config/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_CONFIG.url(API_CONFIG.ENDPOINTS.LOGIN), {
        method: "POST",
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed: ${res.status} - ${text}`);
      }

      const data = await res.json();
      const token = data.data?.token || data.token;
      const user = data.data?.user || data.user;

      if (!token) throw new Error("No token received from backend");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_CONFIG.url(API_CONFIG.ENDPOINTS.REGISTER), {
        method: "POST",
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Register failed: ${res.status} - ${text}`);
      }

      const data = await res.json();
      const token = data.data?.token || data.token;
      const user = data.data?.user || data.user;

      if (!token) throw new Error("No token received from backend");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
