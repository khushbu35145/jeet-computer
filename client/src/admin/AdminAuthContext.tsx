import React, { createContext, useContext, useState, useEffect } from 'react';
import { IAdminUser } from '../types';
import { api, getStoredToken, setStoredToken, removeStoredToken } from '../services/api';

interface AdminAuthContextType {
  user: IAdminUser | null;
  loading: boolean;
  login: (credentials: { usernameOrEmail: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api.admin
      .getMe()
      .then((res) => {
        if (res.user) {
          setUser(res.user);
        } else {
          removeStoredToken();
        }
      })
      .catch(() => {
        // Fallback demo user if token is present or mock
        removeStoredToken();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials: { usernameOrEmail: string; password: string }) => {
    const res = await api.admin.login(credentials);
    if (res.token) {
      setStoredToken(res.token);
      setUser(res.user);
    }
  };

  const logout = async () => {
    try {
      await api.admin.logout();
    } catch {
      // Ignore
    } finally {
      removeStoredToken();
      setUser(null);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
