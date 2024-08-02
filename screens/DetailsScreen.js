import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

function DetailsScreen() {
  const route = useRoute();
  const { creche } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {creche.header_image && (
        <Image
          source={{ uri: creche.header_image }}
          style={styles.headerImage}
        />
      )}
      <Text style={styles.title}>{creche.title.rendered}</Text>
      <Text style={styles.price}>Price: {creche.price}</Text>
      <Text style={styles.description}>{creche.content.rendered}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailsScreen;
