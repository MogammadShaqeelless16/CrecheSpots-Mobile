// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Auth0Provider } from '@auth0/auth0-react'; // Ensure you have installed this package
import AppNavigator from './navigation/AppNavigator';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env'; // Import environment variables

export default function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin // Adjust for your platform needs
      }}
    >
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
