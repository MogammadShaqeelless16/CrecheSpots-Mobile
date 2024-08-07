import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import HeaderSection from '../components/CrecheDetails/HeaderSection';
import SocialSection from '../components/CrecheDetails/SocialSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonSection from '../components/CrecheDetails/ButtonsSection';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import WarningMessage from '../components/WarningMessage';

function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { creche } = route.params;

  const { isAuthenticated } = useContext(AuthContext);

  const [showWarning, setShowWarning] = useState(false);

  const whatsapp = creche.whatsapp || null;
  const email = creche.email || null;
  const teacher = creche.teacher || 'Not available';
  const price = creche.price || 'Not available';
  const headerImage = creche.header_image || '';
  const logo = creche.logo || '';
  const description = creche.description || '';
  const registered = creche.registered === 'Yes';
  const services = creche.services || {};

  const handleReservePress = async () => {
    try {
      const response = await axios.post('https://your-wordpress-site.com/wp-json/myplugin/v1/reserve', {
        creche_id: creche.id,
        amount: calculateAmount(price),
        payment_method: 'stripe',
        user_id: 'user-id',
      });
      if (response.status === 200) {
        // Handle successful reservation
      } else {
        // Handle failure
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAmount = (price) => {
    const baseAmount = parseFloat(price.replace(/[^\d.-]/g, ''));
    const commissionPercentage = 10;
    return baseAmount + (baseAmount * commissionPercentage / 100);
  };

  const handleApplyPress = () => {
    if (!isAuthenticated) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      navigation.navigate('ApplicationFormScreen', { creche });
    }
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
              source={require('../assets/Registered.png')}
              style={styles.registeredIcon}
            />
          )}
        </View>
        <HTML
          source={{ html: description }}
          contentWidth={300}
          tagsStyles={{
            p: { fontSize: 16, color: '#333' },
            a: { color: '#007bff' },
          }}
        />
        <SocialSection whatsapp={whatsapp} email={email} teacher={teacher} />
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Services:</Text>
          {Object.entries(services).map(([service, available]) => (
            <View key={service} style={styles.serviceItem}>
              <Icon
                name={available === 'Yes' ? 'check' : 'times'}
                size={20}
                color={available === 'Yes' ? 'green' : 'red'}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        {showWarning && (
          <WarningMessage
            message="Please sign in to apply."
            visible={showWarning}
            onHide={() => setShowWarning(false)}
          />
        )}
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
          onPress={handleApplyPress}
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
    paddingHorizontal: 16,
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
    justifyContent: 'space-between',
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
