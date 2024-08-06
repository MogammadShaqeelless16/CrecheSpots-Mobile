// SocialSection.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure this is correctly imported

const SocialSection = ({ whatsapp, email, facebook, twitter, instagram }) => {
  const handlePress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {whatsapp && (
        <TouchableOpacity onPress={() => handlePress(`whatsapp://send?phone=${whatsapp}`)} style={styles.iconContainer}>
          <Icon name="whatsapp" size={30} color="#25D366" />
        </TouchableOpacity>
      )}
      {email && (
        <TouchableOpacity onPress={() => handlePress(`mailto:${email}`)} style={styles.iconContainer}>
          <Icon name="envelope" size={30} color="#000" />
        </TouchableOpacity>
      )}
      {facebook && (
        <TouchableOpacity onPress={() => handlePress(facebook)} style={styles.iconContainer}>
          <Icon name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
      )}
      {twitter && (
        <TouchableOpacity onPress={() => handlePress(twitter)} style={styles.iconContainer}>
          <Icon name="twitter" size={30} color="#00acee" />
        </TouchableOpacity>
      )}
      {instagram && (
        <TouchableOpacity onPress={() => handlePress(instagram)} style={styles.iconContainer}>
          <Icon name="instagram" size={30} color="#C13584" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
});

export default SocialSection;
