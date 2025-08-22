import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hms_user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('hms_token'));

  useEffect(() => {
    if (user) localStorage.setItem('hms_user', JSON.stringify(user)); else localStorage.removeItem('hms_user');
    if (token) localStorage.setItem('hms_token', token); else localStorage.removeItem('hms_token');
  }, [user, token]);

  async function login(email, password) {
    const res = await api.auth.login({ email, password });
    setUser(res.user);
    setToken(res.token);
    return res;
  }
  async function register(payload) {
    const res = await api.auth.register(payload);
    return res;
  }
  async function logout() {
    try { await api.auth.logout(); } catch(e) {}
    setUser(null); setToken(null);
  }

  return <AuthCtx.Provider value={{ user, token, login, logout, register }}>{children}</AuthCtx.Provider>;
}
