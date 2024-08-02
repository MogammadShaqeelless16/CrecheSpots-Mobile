// OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

function OnboardingScreen({ navigation }) {
  const doneOnboarding = () => {
    navigation.replace('Home'); // Ensure 'Home' matches the screen name in the navigator
  };

  return (
    <Onboarding
      onDone={doneOnboarding}
      pages={[
        {
          backgroundColor: '#fff',
          image: <View style={styles.image} />,
          title: 'Welcome',
          subtitle: 'This is the first screen',
        },
        {
          backgroundColor: '#fe6e58',
          image: <View style={styles.image} />,
          title: 'Second Screen',
          subtitle: 'This is the second screen',
        },
        {
          backgroundColor: '#999',
          image: <View style={styles.image} />,
          title: 'Third Screen',
          subtitle: 'This is the third screen',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default OnboardingScreen;