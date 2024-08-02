// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetailsScreen({ route }) {
  const { post } = route.params; // Destructure the post from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title.rendered}</Text>
      <Text style={styles.content}>{post.content.rendered}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailsScreen;
