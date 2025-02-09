import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmZ2KAFhYz0DCy210YwkVGDaRf_TFBKYQ",
  authDomain: "love-b6fe6.firebaseapp.com",
  projectId: "love-b6fe6",
  storageBucket: "love-b6fe6.appspot.com",
  messagingSenderId: "764862532296",
  appId: "1:764862532296:web:4c72411c65ced74840f3fd",
  measurementId: "G-Q1JK3QPMDV"
};

// Initialize Firebase only once
let app;
let auth;
let storage;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  storage = getStorage(app);
  db = getFirestore(app);
} catch (error) {
  // If Firebase is already initialized, get existing instances
  app = getApp();
  auth = getAuth(app);
  storage = getStorage(app);
  db = getFirestore(app);
}

export { auth, db, storage };

// Note: We're removing the IndexedDB persistence since it's not fully supported
// in all React Native environments. Instead, we'll rely on the default
// memory cache for Firestore. 