import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const WarningMessage = ({ message, visible, onHide }) => {
  const translateX = useRef(new Animated.Value(300)).current; // Start off-screen
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Hide after 5 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 300,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible, onHide, translateX, opacity]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }], opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    padding: 10,
    zIndex: 1000,
  },
  text: {
    color: '#721c24',
    fontSize: 16,
  },
});

export default WarningMessage;
