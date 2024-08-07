// WelcomeMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';

const WelcomeMessage = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {isAuthenticated
          ? `Welcome ${user.name}, Explore our creches!`
          : 'Welcome to CrecheSpots!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeMessage;
