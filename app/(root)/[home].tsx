import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Image, Button, Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>('Hello');
  const [upcomingTripImage, setUpcomingTripImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const db = getFirestore(); // Initialize Firestore
    const [modalVisible, setModalVisible] = useState(false);
  const [tripName, setTripName] = useState('');
  const [setAsUpcoming, setSetAsUpcoming] = useState(false);

  const helloTranslations = ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Hallo', 'こんにちは', '안녕하세요', 'Olá'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchTripData(currentUser.uid); 
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting((prev) => {
        const currentIndex = helloTranslations.indexOf(prev);
        return helloTranslations[(currentIndex + 1) % helloTranslations.length];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need gallery permissions to make this work!');
      }
    })();
  }, []);

  const fetchTripData = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUpcomingTripImage(docSnap.data().upcomingTripImage);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUpcomingTripImage(uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={40} color="lightblue" style={styles.profbutton} />
        </TouchableOpacity>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.upcomingcontainer}>
          {upcomingTripImage ? (
            <Image source={{ uri: upcomingTripImage }} style={styles.tripImage} />
          ) : (
          <View>
            <Text style={styles.Howtouse}>How to use?</Text>
            <Text style={styles.instuction}>1) Add a trip by pressing the "+"</Text>
            <Text style={styles.instuction}>2) Choose your a photo of your destination!</Text>
            <Text style={styles.instuction}>3) Start planning!</Text>
          </View>
          )}
          <TouchableOpacity onPress={pickImage} style={styles.imagepick}>
            <Ionicons name='images-outline' size={24} color={"white"}/>
          </TouchableOpacity>
        </View>

        <View style={styles.pasttripscontainer}>
          <Text style={styles.subtitle}>Past Trips</Text>
        </View>
      </ScrollView>
      <View style={styles.addtripscontainer}>
          <TouchableOpacity style={styles.addtripbutton}>
          <Image source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/addbutton.png')} style={styles.addbuttonimg} />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  imagePickButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  Howtouse:{
    fontWeight: "bold",
    color: "grey",
    textAlign: 'center',  // Center the text horizontally
  },
  addbuttonimg:{
    width: 80,   // Adjust size as needed
    height: 80,
    resizeMode: 'contain',
  },
  addtripscontainer:{
    position:'absolute',
    left:"75%",
    width:"23%",
    backgroundColor:"blue",
    bottom:"2%",
  },
  addtripbutton:{
    bottom:"10%",
  },
  instuction:{
    fontWeight: "bold",
    color: "lightgrey",
  },
  tripImage: {
    width: "100%",
    height: "110%",
    marginBottom: 10,
    borderRadius: 0,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  }, container: {
        flex: 1,
        backgroundColor: 'white',
      },
      upcomingtext:{
        bottom:"35%",
        right:"30%",
    
    
      },
      profbutton:{
        right:"40%",
        bottom:"30%",
    
      },
      header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,  // Adjust based on status bar
        backgroundColor: 'transparent',
        position: 'absolute',
        top:"4%",
        width: '50%',
        zIndex: 1,  // Keep the header on top
        paddingBottom: 10,
      },
      scrollContainer: {
        marginTop: 1,  // Ensure scroll starts below the fixed header
        flex: 1,
      },
      pasttripscontainer: {
        height: "160%", // Adjust based on content
        marginVertical: 0,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:50,
        bottom:"10%",
        
      },
      upcomingcontainer: {
        height: 400, 
        marginVertical: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
      },
      greeting: {
        bottom:"75%",
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
        right:"12%",
      },
      subtitle: {
        right:"30%",
        bottom:"45%",
        fontSize: 18,
        color: '#fff',
      },
      imagepick:{
        left:"40%",
        bottom:"25%",
      },

});

export default Home;
