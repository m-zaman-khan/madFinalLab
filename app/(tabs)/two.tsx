import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { db } from '@/backend/firebaseconfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function App() {
  const [testResult, setTestResult] = useState<string | null>(null);

  const testFirebaseConnectivity = async () => {
    try {
      // Reference Firestore collection
      const testCollection = collection(db, 'test-collection');

      // Add a test document
      const docRef = await addDoc(testCollection, {
        timestamp: new Date(),
        message: 'Firebase is connected!',
      });

      console.log('Document written with ID: ', docRef.id);

      // Fetch the test document
      const querySnapshot = await getDocs(testCollection);
      const messages: string[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data().message);
      });

      // Update the state with results
      setTestResult(messages.join('\n'));
    } catch (error) {
      console.error('Error connecting to Firebase:', error);
      setTestResult('Failed to connect to Firebase.');
    }
  };

  useEffect(() => {
    testFirebaseConnectivity();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Connectivity Test</Text>
      {testResult ? <Text style={styles.result}>{testResult}</Text> : <Text>Testing...</Text>}
      <Button title="Retest Connectivity" onPress={testFirebaseConnectivity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
});
