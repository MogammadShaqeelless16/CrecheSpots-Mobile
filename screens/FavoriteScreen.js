// FavoriteScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorite Screen</Text>
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

export default FavoriteScreen;
