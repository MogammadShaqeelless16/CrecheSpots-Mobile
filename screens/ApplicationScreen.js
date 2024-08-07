import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function ApplicationScreen() {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth0();
  const navigation = useNavigation(); // Initialize useNavigation
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user's applications from an API or local storage
      // This is a placeholder URL; replace it with your actual endpoint
      fetch('https://example.com/api/applications', {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`, // Use the user's access token if needed
        },
      })
        .then(response => response.json())
        .then(data => setApplications(data))
        .catch(error => console.error('Error fetching applications:', error));
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Oh no, you are not signed in. Please sign in to access this page.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // This will log out the user
    navigation.navigate('Home'); // Navigate back to the Home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hi {user.name}!</Text>
      <Text style={styles.message}>Here is a list of your applications:</Text>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id.toString()} // Assuming `id` is a unique identifier
        renderItem={({ item }) => (
          <View style={styles.applicationItem}>
            <Text>{item.name}</Text> {/* Adjust as necessary based on your application data */}
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcome: {
    fontSize: 24,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  applicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ApplicationScreen;
