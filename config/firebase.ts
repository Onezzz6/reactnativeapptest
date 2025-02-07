import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmZ2KAFhYz0DCy210YwkVGDaRf_TFBKYQ",
  authDomain: "love-b6fe6.firebaseapp.com",
  projectId: "love-b6fe6",
  storageBucket: "love-b6fe6.firebasestorage.app",
  messagingSenderId: "764862532296",
  appId: "1:764862532296:web:4c72411c65ced74840f3fd",
  measurementId: "G-Q1JK3QPMDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore with offline persistence
export const db = getFirestore(app);

// Enable offline persistence
if (process.env.NODE_ENV !== 'test') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
  });
} 