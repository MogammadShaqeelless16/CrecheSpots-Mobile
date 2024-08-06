import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ServicesSection = ({ services }) => (
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
);

const styles = StyleSheet.create({
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
});

export default ServicesSection;
