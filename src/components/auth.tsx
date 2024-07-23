import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  auth: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(() => !!localStorage.getItem('token'));

  const login = (token: string) => {
    setAuth(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
