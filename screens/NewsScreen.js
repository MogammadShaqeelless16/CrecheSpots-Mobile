import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import PostItem from '../components/News/PostItem'; // Ensure this component accepts the post and onPress props
import { useNavigation } from '@react-navigation/native';

const NewsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://www.plainsman.co.za/wp-json/wp/v2/posts');
        const rawData = response.data;

        // Clean HTML/JS and parse JSON
        const jsonString = rawData.replace(/<script.*?<\/script>/g, '');
        const cleanedData = JSON.parse(jsonString);

        if (Array.isArray(cleanedData)) {
          const uniquePosts = removeDuplicates(cleanedData);
          setPosts(uniquePosts);
        } else {
          console.error('Unexpected data structure:', cleanedData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const removeDuplicates = (data) => {
    if (!Array.isArray(data)) {
      console.error('Expected an array for removeDuplicates:', data);
      return [];
    }
    const uniqueIds = new Set();
    return data.filter((item) => {
      if (item && item.id && !uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
  };

  const keyExtractor = (item) => {
    if (item && item.id) {
      return item.id.toString();
    }
    return Math.random().toString(); // Fallback to a random string if id is not available
  };

  const handlePress = (post) => {
    navigation.navigate('NewsDetails', { post });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <PostItem post={item} onPress={() => handlePress(item)} />
          )}
          ListEmptyComponent={<Text>No posts available</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NewsScreen;
