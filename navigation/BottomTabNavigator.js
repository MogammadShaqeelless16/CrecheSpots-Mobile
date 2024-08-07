// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsScreen from '../screens/NewsScreen'; // Import the NewsScreen
import { useAuth0 } from '@auth0/auth0-react';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isAuthenticated } = useAuth0(); // Use AuthContext

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Map':
              iconName = 'map-outline';
              break;
            case 'Applications':
              iconName = 'apps-outline';
              break;
            case 'News':
              iconName = 'newspaper-outline'; // News icon
              break;
            case 'Profile':
              iconName = 'person-circle-outline';
              break;
            case 'Login':
              iconName = 'log-in-outline';
              break;
            default:
              iconName = 'ellipse-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide the header for bottom tab screens
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Applications" component={ApplicationScreen} />
      <Tab.Screen 
        name="News" 
        component={NewsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      {isAuthenticated ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="log-in-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
