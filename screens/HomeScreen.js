import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TextInput, Picker, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
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
    filterPosts(text, selectedPrice);
  };

  const handleFilter = (price) => {
    setSelectedPrice(price);
    filterPosts(searchText, price);
  };

  const filterPosts = (text, price) => {
    let updatedPosts = [...posts];

    if (text) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.rendered.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (price) {
      updatedPosts = updatedPosts.filter(post =>
        post.price && post.price <= price
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Price:</Text>
        <Picker
          selectedValue={selectedPrice}
          style={styles.picker}
          onValueChange={handleFilter}
        >
          <Picker.Item label="All Prices" value="" />
          <Picker.Item label="Up to $50" value="50" />
          <Picker.Item label="Up to $100" value="100" />
          <Picker.Item label="Up to $150" value="150" />
          <Picker.Item label="Up to $200" value="200" />
        </Picker>
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.title.rendered}</Text>
              <Text style={styles.postPrice}>Price: {item.price}</Text>
              {item.header_image && (
                <Image
                  source={{ uri: item.header_image }}
                  style={styles.postImage}
                />
              )}
              <Text style={styles.postContent}>{item.content.rendered}</Text>
            </View>
          </TouchableOpacity>
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
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 16,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  postContent: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  endOfList: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
