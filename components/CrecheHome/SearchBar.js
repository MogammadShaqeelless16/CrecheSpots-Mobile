// SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function SearchBar({ onSearch, onAddressSearch, searchText, searchAddress }) {
  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        value={searchText}
        onChangeText={onSearch}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by address"
        value={searchAddress}
        onChangeText={onAddressSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default SearchBar;
