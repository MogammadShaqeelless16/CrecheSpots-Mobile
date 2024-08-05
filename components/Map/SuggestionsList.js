// components/Map/SuggestionsList.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

function SuggestionsList({ suggestions, handleSuggestionPress }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleSuggestionPress(item)}
          >
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60, // Adjust based on your search bar height
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  suggestion: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default SuggestionsList;
