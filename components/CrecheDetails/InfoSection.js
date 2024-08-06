import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoSection = ({ whatsapp, email, teacher }) => (
  <>
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
  </>
);

const styles = StyleSheet.create({
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

export default InfoSection;
