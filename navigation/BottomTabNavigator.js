// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Use the Ionicons font
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Settings':
              iconName = 'settings-outline';
              break;
            case 'Map':
              iconName = 'map-outline';
              break;
            case 'Applications':
              iconName = 'apps-outline';
              break;
            default:
              iconName = 'ellipse-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Disable the top title for all screens
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Applications" component={ApplicationScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
