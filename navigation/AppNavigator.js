import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import CrecheDetailsScreen from '../screens/DetailsScreen';
import SplashScreen from '../screens/SplashScreen'; // Import SplashScreen
import ApplicationFormScreen from '../screens/ApplicationFormScreen'; // Import ApplicationFormScreen
import { AuthProvider } from '../contexts/AuthContext'; // Import AuthProvider

const Stack = createStackNavigator();

function AppNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return <SplashScreen />; // Display a splash screen or loading indicator
  }

  return (
    <AuthProvider> {/* Wrap in AuthProvider to provide authentication context */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunch ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Home" component={BottomTabNavigator} />
              <Stack.Screen name="CrecheDetails" component={CrecheDetailsScreen} />
              <Stack.Screen name="ApplicationFormScreen" component={ApplicationFormScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={BottomTabNavigator} />
              <Stack.Screen name="CrecheDetails" component={CrecheDetailsScreen} />
              <Stack.Screen name="ApplicationFormScreen" component={ApplicationFormScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default AppNavigator;
