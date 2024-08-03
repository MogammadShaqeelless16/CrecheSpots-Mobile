// PostItem.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function PostItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postContainer}>
        <View style={styles.postTitleContainer}>
          <Text style={styles.postTitle}>{item.title.rendered}</Text>
          {item.registered === 'Yes' && (
            <Image
              source={require('../../assets/Registered.png')} // Replace with the path to your registered.png
              style={styles.registeredIcon}
            />
          )}
        </View>
        <Text style={styles.postAddress}>Address: {item.address}</Text>
        {item.price && (
          <Text style={styles.postPrice}>Price: {item.price}</Text>
        )}
        {item.header_image && (
          <Image
            source={{ uri: item.header_image }}
            style={styles.postImage}
          />
        )}
        <Text style={styles.postContent}>{item.content.rendered}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  postTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  registeredIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  postAddress: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  postPrice: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  postContent: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default PostItem;
