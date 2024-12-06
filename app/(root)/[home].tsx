import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>('Hello');
  const [upcomingTripImage, setUpcomingTripImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string>('');
  const navigation = useNavigation();
  const db = getFirestore();
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
        Alert.alert('Permission needed', 'Sorry, we need gallery permissions to make this work!');
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

    if (!result.canceled && user) {
      const uri = result.assets[0].uri;
      setUpcomingTripImage(uri);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { upcomingTripImage: uri }, { merge: true });
        Alert.alert('Success', 'Image updated successfully!');
      } catch (error) {
        console.error('Error saving image to Firestore:', error);
        Alert.alert('Error', 'Failed to update image.');
      }
    } else if (!user) {
      Alert.alert('Error', 'No user logged in.');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveTrip = () => {
    Alert.alert('Trip Added', `Trip Name: ${tripName}`);
    setTripName('');
    toggleModal();
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={40} color="lightblue" style={styles.profbutton} />
        </TouchableOpacity>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.upcomingcontainer}>
          {upcomingTripImage ? (
            <Image source={{ uri: upcomingTripImage }} style={styles.tripImage} />
          ) : (
            <View>
              <Text style={styles.Howtouse}>How to use?</Text>
              <Text style={styles.instuction}>1) Add a trip by pressing the "+"</Text>
              <Text style={styles.instuction}>2) Choose a photo of your destination!</Text>
              <Text style={styles.instuction}>3) Start planning!</Text>
            </View>
          )}
          <TouchableOpacity onPress={pickImage} style={styles.imagepick}>
            <Ionicons name="images-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Past Trips Section */}
        <View style={styles.pasttripscontainer}>
          <Text style={styles.subtitle}>Past Trips</Text>
        </View>
      </ScrollView>

      {/* Add Trips Button */}
      <View style={styles.addtripscontainer}>
        <TouchableOpacity style={styles.addtripbutton} onPress={toggleModal}>
          <Image
            source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/addbutton.png')}
            style={styles.addbuttonimg}
          />
        </TouchableOpacity>
      </View>


      <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add a New Trip</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter trip name"
            value={tripName}
            onChangeText={setTripName}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTrip}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    left:"5%",
    borderRadius:15,
    top:"30%",
    width:"90%",
    backgroundColor: 'rgba(0, 0, 255, 0.3)', // Semi-transparent blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adds a shadow on Android
    shadowColor: 'red', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
          },
          upcomingtext:{
            bottom:"35%",
            right:"30%",
        
        
          },
          profbutton:{
            position:"absolute",
            right:"10%",
            bottom:0,
        
          },
          header: {
            left:"2%",
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 40,  
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            position: 'absolute',
            top:"8%",
            width: '25%',
            zIndex: 1,  // Keep the header on top
            height:40,
            borderRadius:40,
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
            height: 410, 
            marginVertical: 0,
            backgroundColor: 'red',
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
            position:"absolute",
            fontSize: 10,
            fontWeight: 'bold',
            color: '#333',
            left:"80%",
            top:15,
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
