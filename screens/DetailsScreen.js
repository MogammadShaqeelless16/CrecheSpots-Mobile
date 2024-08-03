// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon set you prefer
import HTML from 'react-native-render-html'; // Import the HTML rendering component

function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { creche } = route.params;

  // Extract fields from creche object
  const whatsapp = creche.whatsapp || 'Not available';
  const email = creche.email || 'Not available';
  const teacher = creche.teacher || 'Not available';
  const price = creche.price || 'Not available';
  const headerImage = creche.header_image || '';
  const description = creche.description || '';
  const registered = creche.registered === 'Yes'; // Check if registered is "Yes"

  const handleApplyPress = () => {
    // Navigate to ApplicationFormScreen with creche details
    navigation.navigate('ApplicationFormScreen', { creche });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {headerImage ? (
          <Image
            source={{ uri: headerImage }}
            style={styles.headerImage}
          />
        ) : null}
        <Text style={styles.title}>{creche.title?.rendered || 'No title'}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price: {price} Per Month</Text>
          {registered && (
            <Image
              source={require('../assets/Registered.png')} // Replace with the path to your registered.png
              style={styles.registeredIcon}
            />
          )}
        </View>
        
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
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#333',
  },
  registeredIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
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
  applyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 10,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default DetailsScreen;
