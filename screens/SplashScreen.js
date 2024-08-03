import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

function SplashScreen({ navigation }) {
  useEffect(() => {
    // Simulate an async operation (e.g., fetching data, authentication check)
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to the Home screen after the splash screen
    }, 2000); // Adjust the duration as needed (2000ms = 2 seconds)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/CrecheSpot_Splash.gif')} // Replace with your splash screen image
        style={styles.logo}
        resizeMode="center" // Ensure the GIF covers the entire screen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background color
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
