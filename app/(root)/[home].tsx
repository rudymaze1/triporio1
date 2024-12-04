import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '@/config/firebaseconfig'; // import your firebase config
import { onAuthStateChanged } from 'firebase/auth'; // for checking the auth state
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [user, setUser] = useState<any>(null);  // state to hold user data
  const [loading, setLoading] = useState<boolean>(true); // state to handle loading state
  const navigation = useNavigation();

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
      <Text style={styles.greeting}>Welcome, {user.displayName || user.email}!</Text>
      <Text style={styles.subtitle}>This is your personalized home screen.</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default Home;
