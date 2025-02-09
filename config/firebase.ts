import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

// Initialize Firestore
export const db = getFirestore(app);

// Note: We're removing the IndexedDB persistence since it's not fully supported
// in all React Native environments. Instead, we'll rely on the default
// memory cache for Firestore. 