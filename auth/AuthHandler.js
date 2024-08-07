import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigation } from '@react-navigation/native';

const AuthHandler = () => {
  const { isAuthenticated, user, handleRedirectCallback } = useAuth0();
  const navigation = useNavigation();

  useEffect(() => {
    if (window.location.search) {
      handleRedirectCallback().then(() => {
        // Handle successful login
        navigation.navigate('Home');
      }).catch(error => {
        console.error('Auth error:', error);
      });
    }
  }, [window.location.search]);

  return null; // This component does not render anything
};

export default AuthHandler;
