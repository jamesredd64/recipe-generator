import React, { createContext, useContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Initialize Netlify Identity without specifying APIUrl
    netlifyIdentity.init();

    // Set up event listeners
    netlifyIdentity.on('login', (user) => {
      console.log('Login event triggered', user);
      setUser(user);
      netlifyIdentity.close();
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });

    netlifyIdentity.on('logout', () => {
      console.log('Logout event triggered');
      setUser(null);
      toast({
        title: "Logged out",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    });

    netlifyIdentity.on('error', (err) => {
      console.error('Netlify Identity error:', err);
      toast({
        title: "Authentication Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    console.log('Current user:', currentUser);
    setUser(currentUser);
    setLoading(false);

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
      netlifyIdentity.off('error');
    };
  }, [toast]);

  const login = () => {
    console.log('Login attempt');
    netlifyIdentity.open('login');
  };

  const logout = () => {
    console.log('Logout attempt');
    netlifyIdentity.logout();
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
