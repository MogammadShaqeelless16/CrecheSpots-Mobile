// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/CrecheHome/SearchBar';
import PostItem from '../components/CrecheHome/PostItem';
import LoadingIndicator from '../components/CrecheHome/LoadingIndicator';
import ErrorMessage from '../components/CrecheHome/ErrorMessage';
import WelcomeMessage from '../components/CrecheHome/WelcomeMessage';

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = (pageNumber) => {
    setLoading(true);
    axios
      .get(
        `https://shaqeel.wordifysites.com/wp-json/wp/v2/creche?_page=${pageNumber}&_per_page=10`
      )
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setFilteredPosts((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterPosts(text);
  };

  const filterPosts = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const updatedPosts = posts.filter((post) => {
      const title = post.title.rendered.toLowerCase();
      const address = post.address ? post.address.toLowerCase() : '';
      const price = post.price ? post.price.toString() : '';

      return (
        title.includes(lowerCaseQuery) ||
        address.includes(lowerCaseQuery) ||
        price.includes(lowerCaseQuery)
      );
    });

    setFilteredPosts(updatedPosts);
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('CrecheDetails', { creche: item });
  };

  if (loading && page === 1) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={`Error: ${error}`} />;
  }

  return (
    <View style={styles.container}>
      <WelcomeMessage />
      <SearchBar onSearch={handleSearch} searchText={searchQuery} />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem item={item} onPress={() => handlePress(item)} />
        )}
        ListFooterComponent={
          hasMore ? (
            <Button title="Load More" onPress={loadMorePosts} />
          ) : (
            <Text style={styles.endOfList}>No more posts</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  endOfList: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
