import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon set you prefer
import HTML from 'react-native-render-html'; // Import the HTML rendering component

function DetailsScreen() {
  const route = useRoute();
  const { creche } = route.params;

  // Extract fields from creche object
  const whatsapp = creche.whatsapp || 'Not available';
  const email = creche.email || 'Not available';
  const teacher = creche.teacher || 'Not available';
  const price = creche.price || 'Not available';
  const headerImage = creche.header_image || '';
  const description = creche.description || '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {headerImage ? (
        <Image
          source={{ uri: headerImage }}
          style={styles.headerImage}
        />
      ) : null}
      <Text style={styles.title}>{creche.title?.rendered || 'No title'}</Text>
      <Text style={styles.price}>Price: {price}</Text>
      
      {/* Render HTML description */}
      <HTML
        source={{ html: description }}
        contentWidth={300} // Adjust width based on your design
        tagsStyles={{
          p: { fontSize: 16, color: '#333' },
          a: { color: '#007bff' },
        }}
      />
      
      <View style={styles.infoContainer}>
        <Icon name="whatsapp" size={20} color="#25D366" />
        <Text style={styles.infoText}>{whatsapp}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="envelope" size={20} color="#000" />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Icon name="user" size={20} color="#000" />
        <Text style={styles.infoText}>{teacher}</Text>
      </View>
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default DetailsScreen;
