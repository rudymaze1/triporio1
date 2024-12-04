import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Your Firebase web configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa4cduE15kqd-P5iNABKGqsW84YCXKokc",
  authDomain: "triporio-7ed45.firebaseapp.com",
  projectId: "triporio-7ed45",
  storageBucket: "triporio-7ed45.firebasestorage.app",
  messagingSenderId: "713503670134",
  appId: "1:713503670134:web:062b6bc81cab0d2e474457",
  measurementId: "G-J80SDCSE2V"
};

// Initialize Firebase app
const FIREBASE_APP = initializeApp(firebaseConfig);

// // Configure Google Sign-In with the webClientId from Firebase
// GoogleSignin.configure({
//   webClientId: '713503670134-5njr18o1mb3hch82ortn2s3c12jt7c9o.apps.googleusercontent.com', // Ensure this is correct
//   offlineAccess: true,  // Optional: Allow offline access to user's Google account
// });

// Initialize Firestore
const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Initialize Firebase Auth with AsyncStorage for persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };
