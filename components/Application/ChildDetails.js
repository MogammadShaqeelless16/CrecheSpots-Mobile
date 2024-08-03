// ChildDetails.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ChildDetails = ({ values, onChange }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>CHILD’S DETAILS:</Text>
      <TextInput style={styles.input} placeholder="Surname" value={values.surname} onChangeText={(text) => onChange('surname', text)} />
      <TextInput style={styles.input} placeholder="Forenames" value={values.forenames} onChangeText={(text) => onChange('forenames', text)} />
      <TextInput style={styles.input} placeholder="Known as Name" value={values.knownAs} onChangeText={(text) => onChange('knownAs', text)} />
      <Text>Date of Birth:</Text>
      <DateTimePicker value={values.dob} mode="date" onChange={(event, selectedDate) => onChange('dob', selectedDate || values.dob)} />
      <TextInput style={styles.input} placeholder="Identity / Passport Number" value={values.identityNumber} onChangeText={(text) => onChange('identityNumber', text)} />
      <TextInput style={styles.input} placeholder="Age (Years)" value={values.ageYears} onChangeText={(text) => onChange('ageYears', text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Age (Months)" value={values.ageMonths} onChangeText={(text) => onChange('ageMonths', text)} keyboardType="numeric" />
      <Picker selectedValue={values.gender} style={styles.picker} onValueChange={(itemValue) => onChange('gender', itemValue)}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <TextInput style={styles.input} placeholder="Home Language" value={values.languageHome} onChangeText={(text) => onChange('languageHome', text)} />
      <TextInput style={styles.input} placeholder="Second Language" value={values.languageSecond} onChangeText={(text) => onChange('languageSecond', text)} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default ChildDetails;
