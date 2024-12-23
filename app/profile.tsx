import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/backend/firebaseconfig'; // Replace with your Firebase config file path
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const auth = getAuth();
  const user = auth.currentUser;

  // Local states for profile data
  const [name, setName] = useState(user?.displayName || '');
  const [address, setAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleUpdate = async () => {
    if (!user) {
      Alert.alert('Error', 'User is not authenticated!');
      return;
    }


    try {
      // Reference to the Firestore document
      const userRef = doc(db, 'users', user.uid);

      // Data to store in Firestore
      const profileData = {
        name,
        address,
        paymentDetails,
        preferences,
        email: user.email, // Optional: Include user email for reference
      };

      // Store data in Firestore
      await setDoc(userRef, profileData, { merge: true });

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate("dashboard");
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="large"
          rounded
          source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }}
          containerStyle={styles.avatar}
        />
        <Text style={styles.welcomeText}>Hello, {name || 'User'}!</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Payment Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter payment details"
          value={paymentDetails}
          onChangeText={setPaymentDetails}
        />

        <Text style={styles.label}>Preferences</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter preferences (e.g., categories)"
          value={preferences}
          onChangeText={setPreferences}
        />

        <Button
          title="Update Profile"
          buttonStyle={styles.button}
          onPress={handleUpdate}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
});

export default Profile;
