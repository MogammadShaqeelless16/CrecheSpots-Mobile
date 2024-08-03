// ParentDetails.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ParentDetails = ({ parentType, values, onChange }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>PARENTS DETAILS: {parentType}</Text>
      <TextInput style={styles.input} placeholder="Surname" value={values.surname} onChangeText={(text) => onChange('surname', text)} />
      <TextInput style={styles.input} placeholder="Forenames" value={values.forenames} onChangeText={(text) => onChange('forenames', text)} />
      <TextInput style={styles.input} placeholder="Known as Name" value={values.knownAs} onChangeText={(text) => onChange('knownAs', text)} />
      <Text>Date of Birth:</Text>
      <DateTimePicker value={values.dob} mode="date" onChange={(event, selectedDate) => onChange('dob', selectedDate || values.dob)} />
      <TextInput style={styles.input} placeholder="Identity / Passport Number" value={values.identityNumber} onChangeText={(text) => onChange('identityNumber', text)} />
      <Picker selectedValue={values.maritalStatus} style={styles.picker} onValueChange={(itemValue) => onChange('maritalStatus', itemValue)}>
        <Picker.Item label="Single" value="Single" />
        <Picker.Item label="Married" value="Married" />
        <Picker.Item label="Separated" value="Separated" />
        <Picker.Item label="Divorced" value="Divorced" />
        <Picker.Item label="Widowed" value="Widowed" />
      </Picker>
      <TextInput style={styles.input} placeholder="Employer’s Name" value={values.employer} onChangeText={(text) => onChange('employer', text)} />
      <TextInput style={styles.input} placeholder="Occupation" value={values.occupation} onChangeText={(text) => onChange('occupation', text)} />
      <TextInput style={styles.input} placeholder="Physical Address (Home)" value={values.addressHome} onChangeText={(text) => onChange('addressHome', text)} />
      <TextInput style={styles.input} placeholder="Physical Address (Work)" value={values.addressWork} onChangeText={(text) => onChange('addressWork', text)} />
      <TextInput style={styles.input} placeholder="Telephone (Home)" value={values.telephoneHome} onChangeText={(text) => onChange('telephoneHome', text)} />
      <TextInput style={styles.input} placeholder="Telephone (Work)" value={values.telephoneWork} onChangeText={(text) => onChange('telephoneWork', text)} />
      <TextInput style={styles.input} placeholder="Cellphone" value={values.cellphone} onChangeText={(text) => onChange('cellphone', text)} />
      <TextInput style={styles.input} placeholder="Email (Personal)" value={values.emailPersonal} onChangeText={(text) => onChange('emailPersonal', text)} />
      <TextInput style={styles.input} placeholder="Email (Work)" value={values.emailWork} onChangeText={(text) => onChange('emailWork', text)} />
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

export default ParentDetails;
