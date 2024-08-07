// SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch, searchText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search by title, address, or price"
      value={searchText}
      onChangeText={onSearch}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
