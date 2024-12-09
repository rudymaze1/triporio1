import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc  } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


// Your Firebase web configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa4cduE15kqd-P5iNABKGqsW84YCXKokc",
  authDomain: "triporio-7ed45.firebaseapp.com",
  projectId: "triporio-7ed45",
  storageBucket: 'triporio-7ed45.appspot.com',
  messagingSenderId: "713503670134",
  appId: "1:713503670134:web:062b6bc81cab0d2e474457",
  measurementId: "G-J80SDCSE2V"
};
const app = initializeApp(firebaseConfig);
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Initialize Firebase Auth with AsyncStorage for persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };
