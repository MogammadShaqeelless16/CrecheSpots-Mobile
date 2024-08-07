import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', `Login Error: ${error.message}`);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>Login</Text>
      <Button
        title="Login with Auth0"
        onPress={handleLogin}
      />
    </View>
  );
};

export default LoginScreen;
