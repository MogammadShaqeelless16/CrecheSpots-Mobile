import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ChildDetails from '../components/Application/ChildDetails';
import ParentDetails from '../components/Application/ParentDetails';

function ApplicationFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { creche, fromScreen } = route.params; // Retrieve 'fromScreen' parameter

  const [childValues, setChildValues] = useState({
    surname: '',
    forenames: '',
    knownAs: '',
    dob: new Date(),
    identityNumber: '',
    ageYears: '',
    ageMonths: '',
    gender: 'Male',
    languageHome: '',
    languageSecond: '',
  });

  const [motherValues, setMotherValues] = useState({
    surname: '',
    forenames: '',
    knownAs: '',
    dob: new Date(),
    identityNumber: '',
    maritalStatus: 'Single',
    employer: '',
    occupation: '',
    addressHome: '',
    addressWork: '',
    telephoneHome: '',
    telephoneWork: '',
    cellphone: '',
    emailPersonal: '',
    emailWork: '',
  });

  const [fatherValues, setFatherValues] = useState({
    surname: '',
    forenames: '',
    knownAs: '',
    dob: new Date(),
    identityNumber: '',
    maritalStatus: 'Single',
    employer: '',
    occupation: '',
    addressHome: '',
    addressWork: '',
    telephoneHome: '',
    telephoneWork: '',
    cellphone: '',
    emailPersonal: '',
    emailWork: '',
  });

  const handleChildChange = (field, value) => {
    setChildValues({ ...childValues, [field]: value });
  };

  const handleParentChange = (field, value, parentType) => {
    if (parentType === 'mother') {
      setMotherValues({ ...motherValues, [field]: value });
    } else {
      setFatherValues({ ...fatherValues, [field]: value });
    }
  };

  const handleSubmit = async () => {
    if (!childValues.surname || !childValues.forenames || !childValues.knownAs || !childValues.identityNumber || !childValues.ageYears || !childValues.ageMonths) {
      Alert.alert('Error', 'Please fill out all required fields');
      return;
    }

    // Add your form submission logic here
    Alert.alert('Success', 'Application submitted successfully');
    if (fromScreen === 'map') {
      navigation.navigate('MapScreen'); // Go back to MapScreen if from map
    } else {
      navigation.navigate('HomeScreen'); // Go back to HomeScreen if from home
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={() => {
        if (fromScreen === 'map') {
          navigation.navigate('MapScreen');
        } else {
          navigation.navigate('HomeScreen');
        }
      }}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Apply to {creche?.title?.rendered || 'Creche'}</Text>
      <ChildDetails values={childValues} onChange={handleChildChange} />
      <ParentDetails parentType="Mother" values={motherValues} onChange={(field, value) => handleParentChange(field, value, 'mother')} />
      <ParentDetails parentType="Father" values={fatherValues} onChange={(field, value) => handleParentChange(field, value, 'father')} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1, // Ensures that the ScrollView can grow and use available space
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default ApplicationFormScreen;
