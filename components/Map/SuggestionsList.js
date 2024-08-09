// SuggestionsList.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SuggestionsList = ({ suggestions, onSelect }) => {
  return (
    <View style={styles.container}>
      {suggestions.map((suggestion) => (
        <TouchableOpacity
          key={suggestion.id}
          style={styles.item}
          onPress={() => onSelect(suggestion)}
        >
          <Text style={styles.title}>{suggestion.title?.rendered || 'No title'}</Text>
          <Text>{suggestion.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuggestionsList;
