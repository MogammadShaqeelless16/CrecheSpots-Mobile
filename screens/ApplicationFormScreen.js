import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function ApplicationFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { creche } = route.params; // Retrieve creche details

  const [applicationValues, setApplicationValues] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    whatsappNumber: '',
    numberOfChildren: '',
    serviceType: 'Day Care', // Default to 'Day Care'
  });

  const handleChange = (field, value) => {
    setApplicationValues({ ...applicationValues, [field]: value });
  };

  const handleSubmit = async () => {
    const { fullName, contactNumber, email, whatsappNumber, numberOfChildren, serviceType } = applicationValues;

    if (!fullName || !contactNumber || !email || !whatsappNumber || !numberOfChildren) {
      Alert.alert('Error', 'Please fill out all required fields');
      return;
    }

    // Add your form submission logic here
    Alert.alert('Success', 'Application submitted successfully');
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Apply to {creche?.title?.rendered || 'Creche'}</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={applicationValues.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={applicationValues.contactNumber}
          onChangeText={(text) => handleChange('contactNumber', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={applicationValues.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>WhatsApp Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={applicationValues.whatsappNumber}
          onChangeText={(text) => handleChange('whatsappNumber', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Children</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={applicationValues.numberOfChildren}
          onChangeText={(text) => handleChange('numberOfChildren', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Type</Text>
        <TextInput
          style={styles.input}
          value={applicationValues.serviceType}
          onChangeText={(text) => handleChange('serviceType', text)}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ApplicationFormScreen;
