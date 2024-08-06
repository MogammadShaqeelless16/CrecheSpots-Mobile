// ButtonSection.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon set you prefer

const ButtonSection = ({ onPress, text, icon, iconOnly, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {icon && <Icon name={icon} size={20} color="#fff" style={styles.icon} />}
        {text && <Text style={styles.buttonText}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the icon and text horizontally
  },
  icon: {
    marginHorizontal: 5, // Adjust spacing between icon and text
  },
});

export default ButtonSection;
