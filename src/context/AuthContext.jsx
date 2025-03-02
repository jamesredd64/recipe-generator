import React, { createContext, useState, useEffect, useContext } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { setupTokenRefresh, clearTokenRefresh } from '../utils/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    netlifyIdentity.init();

    const handleLogin = async (user) => {
      setUser(user);
      await setupTokenRefresh(user);
    };

    const handleLogout = () => {
      setUser(null);
      clearTokenRefresh();
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);
    netlifyIdentity.on('init', user => {
      if (user) {
        handleLogin(user);
      }
      setLoading(false);
    });

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      handleLogin(currentUser);
    }

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
      netlifyIdentity.off('init');
      clearTokenRefresh();
    };
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    logout: () => {
      netlifyIdentity.logout();
    },
    login: () => {
      netlifyIdentity.open('login');
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
