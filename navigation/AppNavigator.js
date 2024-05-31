import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';

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
    return null; // Add a loading screen here if desired
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
