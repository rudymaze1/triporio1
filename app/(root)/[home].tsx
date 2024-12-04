import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '@/config/firebaseconfig'; // import your firebase config
import { onAuthStateChanged } from 'firebase/auth'; // for checking the auth state
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const [user, setUser] = useState<any>(null);  // state to hold user data
  const [loading, setLoading] = useState<boolean>(true); // state to handle loading state
  const [greeting, setGreeting] = useState<string>('Hello'); // state to hold the greeting
  const navigation = useNavigation();

  const helloTranslations = [
    'Hello',     // English
    'Hola',      // Spanish
    'Bonjour',   // French
    'Ciao',      // Italian
    'Hallo',     // German
    'こんにちは',   // Japanese
    '안녕하세요',  // Korean
    'Olá',       // Portuguese
  ];

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // set user data if logged in
      } else {
        setUser(null);  // if not logged in, set user to null
      }
      setLoading(false);  // stop loading after checking the user state
    });

    return unsubscribe; // Clean up the listener
  }, []);

  useEffect(() => {
    // Cycle through the greetings every 2 seconds
    const interval = setInterval(() => {
      setGreeting(prev => {
        const currentIndex = helloTranslations.indexOf(prev);
        const nextIndex = (currentIndex + 1) % helloTranslations.length; // cycle to next greeting
        return helloTranslations[nextIndex];
      });
    }, 1200);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilebutton}>
        <Text style={styles.greeting}>{greeting}</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={40} color="lightblue" />
        </TouchableOpacity>




        
      </View>
      <View>
        <Text>upcoming trip</Text>
      </View>
      <View>
      <Text style={styles.subtitle}>past trips</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  greeting: {
    top: 13,
    left: 40,
    width: 200,
    position: "absolute",
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  profilebutton: {
    position: "absolute",
    top: "2%",
    left: "8%",
  }
});

export default Home;

