// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/CrecheHome/SearchBar';
import PostItem from '../components/CrecheHome/PostItem';
import LoadingIndicator from '../components/CrecheHome/LoadingIndicator';
import ErrorMessage from '../components/CrecheHome/ErrorMessage';

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = (pageNumber) => {
    setLoading(true);
    axios.get(`https://shaqeel.wordifysites.com/wp-json/wp/v2/creche?_page=${pageNumber}&_per_page=10`)
      .then(response => {
        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setFilteredPosts(prevPosts => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    filterPosts(text, searchAddress);
  };

  const handleAddressSearch = (text) => {
    setSearchAddress(text);
    filterPosts(searchText, text);
  };

  const filterPosts = (title, address) => {
    let updatedPosts = [...posts];

    if (title) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.rendered.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (address) {
      updatedPosts = updatedPosts.filter(post =>
        post.address && post.address.toLowerCase().includes(address.toLowerCase())
      );
    }

    setFilteredPosts(updatedPosts);
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
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
      <SearchBar
        onSearch={handleSearch}
        onAddressSearch={handleAddressSearch}
        searchText={searchText}
        searchAddress={searchAddress}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
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
