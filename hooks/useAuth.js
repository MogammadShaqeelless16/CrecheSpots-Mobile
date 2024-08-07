// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from Auth0 or any other service
    const checkAuthStatus = async () => {
      try {
        // Example: Replace with your actual auth logic
        const auth = await Auth0Provider.getAuthStatus();
        setIsAuthenticated(auth.isAuthenticated);
      } catch (error) {
        console.error('Failed to check authentication status', error);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated };
}
