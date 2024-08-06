import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderSection = ({ headerImage, logo }) => {
  return (
    <View style={styles.headerContainer}>
      {headerImage ? (
        <Image
          source={{ uri: headerImage }}
          style={styles.headerImage}
        />
      ) : null}
      {logo ? (
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: logo }}
            style={styles.logo}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 5, // Adjust this value to position the logo higher or lower from the bottom
    left: '50%',
    transform: [{ translateX: -50 }], // Center the logo horizontally
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make sure this is half of the width/height to keep it circular
  },
});

export default HeaderSection;
