import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PriceSection = ({ price, registered }) => {
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.price}>Price: {price} Per Month</Text>
      {registered && (
        <Image
          source={require('../../assets/Registered.png')} // Update the path as needed
          style={styles.registeredIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PriceSection;
