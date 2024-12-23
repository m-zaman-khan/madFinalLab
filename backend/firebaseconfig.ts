import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
      apiKey: "AIzaSyDrFLhKY73YzURHx5g46nFSLUsDBC5aheo",
      authDomain: "madlabfinal-2348a.firebaseapp.com",
      projectId: "madlabfinal-2348a",
      storageBucket: "madlabfinal-2348a.firebasestorage.app",
      messagingSenderId: "600581902936",
      appId: "1:600581902936:web:7c7e464830969f8172302d"
  };

const app = initializeApp(firebaseConfig);

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage),
  });

export const db = getFirestore(app);


export { app };
