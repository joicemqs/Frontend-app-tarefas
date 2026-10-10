import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearTokens, setOnSessionExpired } from '../services/api';

type AuthContextType = {
  isAuthenticated: boolean;
  isRestoring: boolean; // true enquanto verifica se já existe uma sessão salva
  login: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    // Mantém a pessoa logada ao recarregar a página ou reabrir o app
    AsyncStorage.getItem('refresh')
      .then((refresh) => setIsAuthenticated(!!refresh))
      .finally(() => setIsRestoring(false));

    setOnSessionExpired(() => setIsAuthenticated(false));
    return () => setOnSessionExpired(null);
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    await clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isRestoring, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
