import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Auth0 from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';

// Replace these with your actual Auth0 domain and client ID
const auth = new Auth0({
  domain: 'dev-5ajz6wwswmkvdwtb.us.auth0.com',
  clientId: 'kL6qnQ2Rb0VnTFUXs8J2uWXSLxvMYtta',
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await auth.auth.passwordRealm({
        username: email,
        password: password,
        realm: 'Username-Password-Authentication', // Typically 'Username-Password-Authentication'
      });

      if (response) {
        // Handle successful login
        Alert.alert('Login successful');
        // Navigate to the next screen
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      // Handle errors
      console.error('Login Error:', error); // Log error details
      Alert.alert('Error', `Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const response = await auth.auth.createUser({
        email: signUpEmail,
        password: signUpPassword,
        connection: 'Username-Password-Authentication',
      });

      if (response) {
        // Handle successful sign-up
        Alert.alert('Sign-up successful');
        // Navigate to the login screen
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      // Handle errors
      console.error('Sign-Up Error:', error); // Log error details
      Alert.alert('Error', `Sign-Up Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);

    try {
      const response = await auth.webAuth.authorize({
        scope: 'openid profile email',
        connection: 'google-oauth2',
      });

      if (response) {
        // Handle successful Google sign-up
        Alert.alert('Google sign-up successful');
        // Navigate to the next screen
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      // Handle errors
      console.error('Google Sign-Up Error:', error); // Log error details
      Alert.alert('Error', `Google Sign-Up Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
      />
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 16 }}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          value={signUpEmail}
          onChangeText={setSignUpEmail}
          style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={signUpPassword}
          onChangeText={setSignUpPassword}
          style={{ marginBottom: 16, borderBottomWidth: 1, padding: 8 }}
        />
        <Button
          title={loading ? 'Signing up...' : 'Sign Up'}
          onPress={handleSignUp}
          disabled={loading}
        />
      </View>
      
      <Button
        title={loading ? 'Signing in with Google...' : 'Sign Up with Google'}
        onPress={handleGoogleSignUp}
        disabled={loading}
      />
    </View>
  );
};

export default LoginScreen;
