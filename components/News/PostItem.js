import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostItem = ({ post, onPress }) => {
  if (!post || !post.title || !post.title.rendered || !post.content || !post.content.rendered) {
    return null; // Handle cases where post data might be incomplete
  }

  // Extract a brief snippet from content
  const snippet = post.content.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...';

  // Extract the image URL from yoast_head_json
  const imageUrl = post.yoast_head_json?.og_image?.[0]?.url || 'https://via.placeholder.com/150'; // Fallback image URL if og_image is not available

  // Extract the author's name from content
  const authorMatch = post.content.rendered.match(/content="([^"]*)"/);
  const authorName = authorMatch ? authorMatch[1] : 'Unknown Author'; // Default to 'Unknown Author' if not found

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(post)}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.title.rendered}</Text>
        <Text style={styles.snippet}>{snippet}</Text>
        <Text style={styles.author}>By: {authorName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  snippet: {
    fontSize: 14,
    color: '#666',
  },
  author: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default PostItem;
