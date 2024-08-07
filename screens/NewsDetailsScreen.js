// NewsDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

const NewsDetailsScreen = () => {
  const route = useRoute();
  const { post } = route.params;

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>No post details available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: post.featured_media || 'https://via.placeholder.com/600x400' }} // Replace with actual image URL if available
        style={styles.image}
      />
      <Text style={styles.title}>{post.title.rendered}</Text>
      <RenderHtml
        contentWidth={width}
        source={{ html: post.content.rendered }}
        enableExperimentalBRCollapsing={true} // Optional: for better rendering of block-level elements
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default NewsDetailsScreen;
