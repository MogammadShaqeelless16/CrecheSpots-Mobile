// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Auth0 from 'react-native-auth0'; // Ensure you have the correct package installed

// Initialize Auth0 instance with domain and client ID
const auth = new Auth0({
  domain: process.env.AUTH0_DOMAIN, // Make sure these values are correctly set
  clientId: process.env.AUTH0_CLIENT_ID,
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const credentials = await auth.auth.credentials();
        if (credentials.accessToken) {
          setIsAuthenticated(true);
          const userInfo = await auth.auth.userInfo({ token: credentials.accessToken });
          setUser(userInfo);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        console.error('Session Check Error:', error);
      }
    };

    checkSession();
  }, []);

  const login = async () => {
    try {
      await auth.auth.authorize({ scope: 'openid profile email' });
      // Handle successful login here, e.g., update state or redirect
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.auth.clearSession();
      setIsAuthenticated(false);
      setUser(null);
      // Handle successful logout here, e.g., redirect to login
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
