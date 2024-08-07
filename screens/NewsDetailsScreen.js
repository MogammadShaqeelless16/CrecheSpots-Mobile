import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const NewsDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  const handleReadMore = () => {
    if (post && post.link) {
      Linking.openURL(post.link);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{post.title.rendered}</Text>
          {post.featured_media && (
            <Image
              source={{ uri: post.featured_media.source_url }}
              style={styles.image}
            />
          )}
          <RenderHtml
            contentWidth={screenWidth}
            source={{ html: post.content.rendered }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.readMoreButton} onPress={handleReadMore}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingTop: 80, // Space for buttons at the top
    paddingBottom: 80, // Space for buttons at the bottom if needed
    flexGrow: 1, // Ensure ScrollView grows to fill space
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: screenHeight * 0.20, // 20% of screen height
    marginBottom: 10,
    resizeMode: 'cover', // Ensure image fits properly
  },
  buttonsContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5, // Optional: Adds a shadow effect to the button container
  },
  readMoreButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default NewsDetailsScreen;
