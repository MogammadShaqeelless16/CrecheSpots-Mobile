import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import HeaderSection from '../components/CrecheDetails/HeaderSection'; // Import the HeaderSection component
import SocialSection from '../components/CrecheDetails/SocialSection'; // Import the SocialSection component
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon if used in this file
import ButtonSection from '../components/CrecheDetails/ButtonsSection'; // Adjust the import path as needed

function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { creche } = route.params;

  // Extract fields from creche object
  const whatsapp = creche.whatsapp || null;
  const email = creche.email || null;
  const teacher = creche.teacher || 'Not available';
  const price = creche.price || 'Not available';
  const headerImage = creche.header_image || '';
  const logo = creche.logo || ''; // Add logo field
  const description = creche.description || '';
  const registered = creche.registered === 'Yes'; // Check if registered is "Yes"
  const services = creche.services || {}; // Fetch services data

  const handleReservePress = async () => {
    try {
      const response = await axios.post('https://your-wordpress-site.com/wp-json/myplugin/v1/reserve', {
        creche_id: creche.id,
        amount: calculateAmount(price), // Calculate total amount including your commission
        payment_method: 'stripe', // Or other payment method
        user_id: 'user-id', // Replace with actual user ID
      });
      if (response.status === 200) {
        // Handle successful reservation
        alert('Reservation successful!');
      } else {
        // Handle failure
        alert('Reservation failed.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  const calculateAmount = (price) => {
    const baseAmount = parseFloat(price.replace(/[^\d.-]/g, ''));
    const commissionPercentage = 10; // Example commission percentage
    return baseAmount + (baseAmount * commissionPercentage / 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <HeaderSection headerImage={headerImage} logo={logo} />
        
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

        {/* Social Section */}
        <SocialSection whatsapp={whatsapp} email={email} teacher={teacher} />
        
        {/* Services Section */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Services:</Text>
          {Object.entries(services).map(([service, available]) => (
            <View key={service} style={styles.serviceItem}>
              <Icon
                name={available === 'Yes' ? 'check' : 'times'} // Checkmark for available, cross for not available
                size={20}
                color={available === 'Yes' ? 'green' : 'red'}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        <ButtonSection 
          icon="arrow-left"
          iconOnly
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <ButtonSection 
          text="Apply"
          onPress={() => alert('Apply button pressed')}
          style={styles.applyButton}
        />
        <ButtonSection 
          icon="credit-card"
          iconOnly
          onPress={handleReservePress}
          style={styles.reserveButton}
        />
      </View>
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
    paddingHorizontal: 16, // Add horizontal padding to the scroll view
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
  servicesContainer: {
    marginVertical: 20,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between', // Add space between buttons
  },
  backButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
  reserveButton: {
    flex: 1,
  },
});

export default DetailsScreen;