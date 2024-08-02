// ApplicationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ApplicationScreen() {
  return (
    <View style={styles.container}>
      <Text>Application Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApplicationScreen;
