// NewsDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import HTML from 'react-native-render-html';

const NewsDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post details from WordPress API
    axios.get(`https://www.plainsman.co.za/wp-json/wp/v2/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => console.error(error));
  }, [postId]);

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post.featured_image_url && (
        <Image 
          source={{ uri: post.featured_image_url }} 
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{post.title.rendered}</Text>
      <HTML 
        source={{ html: post.content.rendered }}
        contentWidth={styles.content.width}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    width: '100%',
  },
});

export default NewsDetailScreen;
