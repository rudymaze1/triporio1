// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Alert,
//   TextInput,
//   Modal,
// } from 'react-native';
// import { FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebaseconfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { doc, getDoc, setDoc, getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Timestamp } from 'firebase/firestore';
// import Checkbox from 'expo-checkbox';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { Link, router, useRouter } from 'expo-router';
// import { Swipeable } from 'react-native-gesture-handler';;
// import { deleteDoc } from 'firebase/firestore';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import axios from 'axios';



// const Home = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [greeting, setGreeting] = useState<string>('Hello');
//   const [upcomingTripImage, setUpcomingTripImage] = useState<string | null>(null);
//   const [isModalVisible, setModalVisible] = useState<boolean>(false);
//   const [tripName, setTripName] = useState<string>('');
//   const [trips, setTrips] = useState<any[]>([]);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   const [endDate, setEndDate] = useState<Date>(new Date());
//   const [showDatePicker, setShowDatePicker] = useState({ start: false, end: false });
//   const navigation = useNavigation();
//   const db = getFirestore();
//   const helloTranslations = ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Hallo', 'こんにちは', '안녕하세요', 'Olá'];
//   const [isChecked, setIsChecked] = useState(false);
//   const [upcomingTripTitle, setUpcomingTripTitle] = useState<string | null>(null);
//   const [loaded, error] = useFonts({
//     'poiret': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/PoiretOne-Regular.ttf' ),
//     'sulph-bold': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Bold.ttf' ),
//     'sulph-reg': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Regular.ttf' ),
//     'sulph-light': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Light.ttf' )
// });
// const router = useRouter();
// const PEXELS_API_KEY = '3satdTolRWX49eBnFnbE5Y1PKAGNK1Aym9J4tpN5mBPJnkzzM6yNtED9';
// const [searchQuery, setSearchQuery] = useState('');
// const [pexelsImages, setPexelsImages] = useState([]);
// const [isImageSearchModalVisible, setImageSearchModalVisible] = useState(false);

// const handleSearch = async () => {
//   const results = await searchImages(searchQuery);
//   setPexelsImages(results);
// };

// const handleSelectImage = (imageUrl: string) => {
//   setUpcomingTripImage(imageUrl);
//   setImageSearchModalVisible(false);
// };

// const toggleImageSearchModal = () => {
//   setImageSearchModalVisible(!isImageSearchModalVisible);
// };

// const searchImages = async (query: string) => {
//   try {
//     const response = await axios.get(`https://api.pexels.com/v1/search`, {
//       headers: {
//         Authorization: PEXELS_API_KEY,
//       },
//       params: {
//         query,
//         per_page: 15, // Number of results per request
//       },
//     });
//     return response.data.photos;
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     Alert.alert('Error', 'Failed to fetch images from Pexels.');
//     return [
// ];
//   }
// };




// const Gototrip = () => {
//   router.replace('/trips')
// }

// const handelprofile = () => {
//   router.replace('/profile')
// }


// const handleDeleteTrip = async (id: string) => {
//   try {
//     // Delete the trip from Firestore
//     const tripDocRef = doc(db, 'users', user.uid, 'trips', id);
//     await deleteDoc(tripDocRef);
    
//     // Remove the trip from state after successful deletion
//     setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
//     Alert.alert('Success', 'Trip deleted successfully!');
//   } catch (error) {
//     console.error('Error deleting trip:', error);
//     Alert.alert('Error', 'Failed to delete trip.');
//   }
// };

// // Swipeable action to show the delete button
// const renderRightActions = (id: string) => {
//   return (
//     <TouchableOpacity
//       style={styles.deleteButton}
//       onPress={() => handleDeleteTrip(id)}
//     >
//       <Ionicons name='remove-circle' size={40} color={"red"}/>
//     </TouchableOpacity>
//   );
// };


//   const handleCheckBoxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleSubmit = () => {
//     if (isChecked) {
//       alert('Checkbox is checked');
//     } else {
//       alert('Checkbox is unchecked');
//     }
//   };

//   const toggleDatePicker = (type: 'start' | 'end') => {
//     setShowDatePicker(prev => ({
//       ...prev,
//       [type]: !prev[type],
//     }));
//   };

//   // Handle date change for start and end dates
//   const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
//     if (type === 'start') {
//       setStartDate(date || startDate);
//     } else {
//       setEndDate(date || endDate);
//     }
//     setShowDatePicker(prev => ({
//       ...prev,
//       [type]: false,
//     }));
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         await fetchTripData(currentUser.uid);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setGreeting((prev) => {
//         const currentIndex = helloTranslations.indexOf(prev);
//         return helloTranslations[(currentIndex + 1) % helloTranslations.length];
//       });
//     }, 1200);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission needed', 'Sorry, we need gallery permissions to make this work!');
//       }
//     })();
//   }, []);



//   const fetchTripData = async (userId: string) => {
//     try {
//       // Fetch trips collection
//       const tripsRef = collection(db, 'users', userId, 'trips');
//       const querySnapshot = await getDocs(tripsRef);
  
//       const tripsList = querySnapshot.docs
//         .map(doc => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             ...data,
//             createdAt: data.createdAt || new Date(0),
//           };
//         })
//         .sort((a, b) => {
//           const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
//           const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
//           return dateB.getTime() - dateA.getTime();
//         });
  
//       setTrips(tripsList);
  
//       // Fetch upcomingTripImage and upcomingTripTitle
//       const userDocRef = doc(db, 'users', userId);
//       const userDocSnap = await getDoc(userDocRef);
  
//       if (userDocSnap.exists()) {
//         setUpcomingTripImage(userDocSnap.data().upcomingTripImage);
//         setUpcomingTripTitle(userDocSnap.data().upcomingTripTitle || null);
//       }
//     } catch (error) {
//       console.error('Error fetching trips:', error);
//       Alert.alert('Error', 'Failed to fetch trips.');
//     }
//   };
  
  
  


//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && user) {
//       const uri = result.assets[0].uri;
//       setUpcomingTripImage(uri);

//       try {
//         const userDocRef = doc(db, 'users', user.uid);
//         await setDoc(userDocRef, { upcomingTripImage: uri }, { merge: true });
//         Alert.alert('Success', 'Image updated successfully!');
//       } catch (error) {
//         console.error('Error saving image to Firestore:', error);
//         Alert.alert('Error', 'Failed to update image.');
//       }
//     } else if (!user) {
//       Alert.alert('Error', 'No user logged in.');
//     }
//   };

//   const toggleModal = () => {
//     if (!isModalVisible) {
//       setShowDatePicker({ start: true, end: true }); // Show both start and end date pickers when the modal opens
//     } else {
//       setShowDatePicker({ start: false, end: false });
//     }
//     setModalVisible(!isModalVisible);
//   };

//   const handleSaveTrip = async () => {
//     if (!tripName || !startDate || !endDate) {
//       Alert.alert('Error', 'Please fill all the fields!');
//       return;
//     }
  
//     try {
//       if (user) {
//         const newTripRef = collection(db, 'users', user.uid, 'trips');
//         await addDoc(newTripRef, {
//           name: tripName,
//           image: upcomingTripImage || '',
//           startDate: startDate.toISOString().split('T')[0],
//           endDate: endDate.toISOString().split('T')[0],
//           createdAt: new Date(),
//         });
  
//         // If the checkbox is checked, set this trip as the upcoming trip
//         if (isChecked) {
//           const userDocRef = doc(db, 'users', user.uid);
//           await setDoc(userDocRef, { upcomingTripTitle: tripName }, { merge: true });
//         }
  
//         console.log('Trip saved successfully');
//         fetchTripData(user.uid); // Refresh trip data after saving
//         setTripName('');
//         setStartDate(new Date());
//         setEndDate(new Date());
//         setUpcomingTripImage(null);
//         setIsChecked(false); // Reset the checkbox state
//         toggleModal();
//         Alert.alert('Success', 'Trip added successfully!');
//       } else {
//         Alert.alert('Error', 'User not authenticated.');
//       }
//     } catch (error) {
//       console.error('Error adding trip:', error);
//       Alert.alert('Error', 'Failed to add trip.');
//     }
  
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handelprofile}>
            
//           <Ionicons name="person-circle" size={40} color="lightblue" style={styles.profbutton} />
//         </TouchableOpacity>
//         <Text style={styles.greeting}>{greeting}</Text>
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.upcomingcontainer}>
//           {upcomingTripImage ? (
//             <Image source={{ uri: upcomingTripImage }} style={styles.tripImage} />
            
//           ) : (
//             <View>
//               <Text style={styles.Howtouse}>How to use?</Text>
//               <Text style={styles.instuction}>1) Add a trip by pressing the "+"</Text>
//               <Text style={styles.instuction}>2) Choose a photo of your destination!</Text>
//               <Text style={styles.instuction}>3) Start planning!</Text>
//             </View>
//           )}
//           {upcomingTripTitle && (
//     <Text style={styles.upcomingtitle}>{upcomingTripTitle}</Text>
//   )}
//           <View> 
//           <TouchableOpacity onPress={pickImage} style={styles.imagepick}>
//             <Ionicons name="images-outline" size={24} color="lightblue" />
//           </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.pasttripscontainer}>
//   <Text style={styles.subtitle}>Past Trips</Text>
  
//   <ScrollView contentContainerStyle={styles.tripList}>
//   {trips.length > 0 ? (
//     trips.map((trip) => (
//       <Swipeable key={trip.id} renderRightActions={() => renderRightActions(trip.id)}>
//         <TouchableOpacity onPress={() => router.push(`/Trips/${trip.name}`)} >
//           <View style={styles.tripCard}>
//             <Text style={styles.tripCardText}>{trip.name}</Text>
//             <Text style={styles.tripDateText}>
//               {trip.startDate} - {trip.endDate}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </Swipeable>
//     ))
//   ) : (
//     <Text>Add a trip to start the fun!</Text>
//   )}
// </ScrollView>
// </View>
//       </ScrollView>

//       <View style={styles.addtripscontainer}>
//         <TouchableOpacity style={styles.addtripbutton} onPress={toggleModal}>
//           <Image
//             source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/addbutton.png')}
//             style={styles.addbuttonimg}
//           />
//         </TouchableOpacity>
//       </View>

//       <Modal visible={isModalVisible} animationType="slide" transparent>
//         <View style={styles.modalWrapper}>
//           <View style={styles.closebutton}>
//             <TouchableOpacity onPress={toggleModal}>
//               <Ionicons name="close-circle" size={45} color="white" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.modalContainer}>
            
//             <Text style={styles.modalTitle}>Add a New Trip</Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Enter Trip Name"
//               value={tripName}
//               onChangeText={setTripName}
//             />
//             <View style={styles.checkbox}>
//                 <Checkbox value={isChecked} onValueChange={handleCheckBoxChange}/>
//                 <Text style={styles.checkboxtext}>set as upcoming trip?</Text>
//                 <TouchableOpacity onPress={pickImage} style={styles.imagepick2}>
//                 <Ionicons name="images-outline" size={24} color="lightblue" />
//                 </TouchableOpacity>
//             </View>
            

//             <TouchableOpacity
//               onPress={() => toggleDatePicker('start')}
//             >
//               <Text style={styles.startdatetext} >Start Date: {startDate.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDatePicker.start && (
//               <DateTimePicker
//               style={styles.datepickertext}
//                 value={startDate}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) => handleDateChange('start', date)}
//               />
//             )}
//             <TouchableOpacity
//               style={styles.enddatebuttontext}
//               onPress={() => toggleDatePicker('end')}
//             >
//               <Text style={styles.enddatetext}>End Date: {endDate.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDatePicker.end && (
//               <DateTimePicker
//               style={styles.datepickertext}
//                 value={endDate}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) => handleDateChange('end', date)}
//               />
//             )}
//             <TouchableOpacity onPress={handleSaveTrip} style={styles.saveButton}>
//               <Text style={styles.saveButtonText}>Save Trip</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   deleteButton: {
//     right:0,
//     top:30,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height:50,
//     width: 50,
//     borderRadius: 50,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//     upcomingtitle:{
//         position:"absolute",
//         backgroundColor:"transparent",
//         fontSize:55,
//          bottom:200,
//          color:"white",
//          fontWeight:'bold',
//          fontFamily:"poiret",

//         },
//     checkboxtext:{
//         position:'fixed',
//         bottom:20,
//         left:30,
//         marginBottom:-10,
//     },
//     checkbox:{
//         position:"fixed", 
//         right: 90,
//         bottom:10
//     },
//    enddatetext:{
//         fontWeight:"bold",
//     },
//     enddatebuttontext:{
//         padding: 12,
//         backgroundColor: '#f1f8e9',
//         borderRadius: 8,
//         alignItems: 'center',
//         right:"30%",

//     },
//     datepickertext:{
//         right:"35%",
//     },
//     dateIcon: {
//         padding: 10,
//         marginTop: 10,
//         alignItems: 'center',
//         justifyContent: 'center'

    

//     },
//     startdatetext:{
//         right:"30%",
//         fontWeight:"bold",
//     },
//     closebutton:{
//         position:"fixed",
//         backgroundColor:"transparent",
//         bottom:"15%",
//         left:"40%",
//     },
//       tripDateText: {
//         fontFamily:"sulph-light",
//         top:"55%",
//         fontSize: 14,
//         color: 'grey',
//       },
//     datePicker: {
//         width: 200,
//         marginBottom: 20,
//       },
//     tripList:{
//         backgroundColor:"transparent",
//         top:"2%",
//     },
//     tripCard: {
//         width:350,
//         borderRadius: 25,
//         height: 100,
//         marginBottom: 10,
//         marginTop:5,
//         backgroundColor: '#333D79',
//         padding: 10,
//         borderWidth: 4,
//         borderColor:"white",
//       },
//     tripCardText:{
//         fontFamily:"sulph-bold",
//         fontSize:20,
//         color:"white",
//         fontWeight:'900',
//         top:"50%",
//     },
//     modalWrapper: {
//       left:"5%",
//       borderRadius:15,
//       top:"30%",
//       width:"90%",
//       backgroundColor: 'transparent', 
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalContainer: {
//         bottom:50,
//       width: "100%",
//       borderRadius: 15,
//       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//       padding: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//       elevation: 5, // Adds a shadow on Android
//       shadowColor: 'red', // Shadow on iOS
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//     },
//     modalTitle: {
//       fontFamily:"sulph-bold",
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     textInput: {
//     fontFamily:"sulph-bold",
//       width: '100%',
//       height: 40,
//       borderColor: 'gray',
//       borderWidth: 1,
//       borderRadius: 5,
//       marginBottom: 20,
//       paddingLeft: 10,
//     },
//     saveButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//     },
//     saveButtonText: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
//         Howtouse:{
//           fontWeight: "bold",
//           color: "grey",
//           textAlign: 'center',  // Center the text horizontally
//         },
//         addbuttonimg:{
//           width: 80,   // Adjust size as needed
//           height: 80,
//           resizeMode: 'contain',
//         },
//         addtripscontainer:{
//           position:'absolute',
//           left:"75%",
//           width:"23%",
//           backgroundColor:"transparent",
//           bottom:"2%",
//         },
//         addtripbutton:{
//           bottom:"10%",
//         },
//         instuction:{
//           fontWeight: "bold",
//           color: "lightgrey",
//         },
//         tripImage: {
//           width: "100%",
//           height: "110%",
//           marginBottom: 10,
//           borderRadius: 0,
//         },
//         placeholderText: {
//           color: '#fff',
//           fontSize: 16,
//         }, container: {
//               flex: 1,
//             },
//         upcomingtext:{
//               bottom:"35%",
//               right:"30%",
          
          
//             },
//         profbutton:{
//               position:"absolute",
//               right:"10%",
//               bottom:0,
          
//             },
//         header: {
//               left:"2%",
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               paddingHorizontal: 20,
//               paddingTop: 40,  
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//               position: 'absolute',
//               top:"8%",
//               width: '25%',
//               zIndex: 1,  // Keep the header on top
//               height:40,
//               borderRadius:40,
//             },
//         scrollContainer: {
//               position:'fixed',
//               flex: 1,
//             },
//         pasttripscontainer: {
//               height: "100%", 
//               marginVertical: 10,
//               backgroundColor: '#CBE4DE',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderTopRightRadius:65,
//               paddingBottom:"25%",
//               bottom:50,
//               borderTopLeftRadius:0,
              
//             },
//         upcomingcontainer: {
//              position:"fixed",
//               height: 450, 
//               marginVertical: 0,
//               backgroundColor: 'white',
//               justifyContent: 'center',
//               alignItems: 'center',
//             },
//         loadingContainer: {
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#f2f2f2',
//             },
//         greeting: {
//               position:"absolute",
//               fontSize: 10,
//               fontWeight: 'bold',
//               color: '#333',
//               left:"80%",
//               top:15,
//             },
//         subtitle: {
//             fontFamily:"sulph-reg",
//             top:5,
//             right:130,
//               position:"fixed",
//               fontSize: 24,
//               color: '##03045E',
    
//             },
//         imagepick:{
//             position:"absolute",
//             left:130,
//             bottom:100,
//             },
//         imagepick2:{
//             position:'fixed',
//             left:290,
//             bottom:30,
//             marginBottom:-30,
//             },
  
  
//   });
  
//   export default Home;









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
import { doc, getDoc, setDoc, getFirestore, collection, addDoc, getDocs, serverTimestamp, onSnapshot } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from 'firebase/firestore';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Link, router, useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';;
import { deleteDoc } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import ImageSearchComponent from './ImageSearchComponent';
import { query, orderBy, limit } from 'firebase/firestore';
import { RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>('Hello');
  const [upcomingTripImage, setUpcomingTripImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string>('');
  const [trips, setTrips] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState({ start: false, end: false });
  const navigation = useNavigation();
  const db = getFirestore();
  const helloTranslations = ['Hello', 'Hola', 'Bonjour', 'Ciao', 'Hallo', 'こんにちは', '안녕하세요', 'Olá'];
  const [isChecked, setIsChecked] = useState(false);
  const [upcomingTripTitle, setUpcomingTripTitle] = useState<string | null>(null);
  const [loaded, error] = useFonts({
    'poiret': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/PoiretOne-Regular.ttf' ),
    'sulph-bold': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Bold.ttf' ),
    'sulph-reg': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Regular.ttf' ),
    'sulph-light': require('/Users/rudy/Desktop/react-proj/triporio1/assets/fonts/SulphurPoint-Light.ttf' )
});
const router = useRouter();
const PEXELS_API_KEY = '3satdTolRWX49eBnFnbE5Y1PKAGNK1Aym9J4tpN5mBPJnkzzM6yNtED9';
const [searchQuery, setSearchQuery] = useState('');
const [pexelsImages, setPexelsImages] = useState([]);
const [isImageSearchModalVisible, setImageSearchModalVisible] = useState(false);
const [modalVisible, setModalVisible2] = useState(false);
const [localUpcomingImage, setLocalUpcomingImage] = useState(upcomingTripImage || '');  
const [tripSaved, setTripSaved] = useState(false);
const [refreshing, setRefreshing] = useState(false);




const onRefresh = async () => {
  setRefreshing(true); // Show the refreshing spinner

  try {
    // Simulate a data refresh operation (e.g., fetching trips or images)
    await fetchTripData(user.uid); // Your function to fetch trips
    await fetchUpcomingTripImage(user.uid); // Your function to fetch the upcoming trip image
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error', 'Failed to refresh data');
  } finally {
    setRefreshing(false); // Hide the refreshing spinner once the operation is complete
  }
};






useEffect(() => {
  if (tripSaved) {
    // Perform any action when the trip is saved, such as clearing fields, fetching new data, etc.
    console.log('Trip saved! Refreshing the screen...');
    
    // You can reset the image or do any other action you need
    // Example: setLocalUpcomingImage('defaultImage.jpg');
    
    // Optionally reset `tripSaved` if you want to allow a "save" toggle again
    // setTripSaved(false);
  }
}, [tripSaved]); // Runs every time `tripSaved` changes

const renderModalContent = () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with your image options

  return images.map((image, index) => (
    <TouchableOpacity key={index} onPress={() => handleSelectImage(image)}>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
  ));
};


const saveUpcomingImageLocally = async (image: string) => {
  try {
    await AsyncStorage.setItem('@upcomingTripImage', image); // Save the image
  } catch (error) {
    console.error('Failed to save image to storage:', error);
  }
};

// Load the image from AsyncStorage
const loadUpcomingImage = async () => {
  try {
    const savedImage = await AsyncStorage.getItem('@upcomingTripImage');
    if (savedImage) {
      setLocalUpcomingImage(savedImage);  // Load it into the state
    }
  } catch (error) {
    console.error('Failed to load image from storage:', error);
  }
};

// Call this when the component mounts to load the image from storage
useEffect(() => {
  loadUpcomingImage();
}, []);










interface UpcomingTripImage {
  imageUrl: string; // The URL of the image
  createdAt: any; // Firestore timestamp
}

const fetchUpcomingTripImage = async (userId: string) => {
  try {
    const imagesRef = collection(db, 'users', userId, 'upcomingTripImages');
    const q = query(imagesRef, orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const latestImageDoc = querySnapshot.docs[0].data() as UpcomingTripImage;
      const { imageUrl } = latestImageDoc;

      if (imageUrl) {
        setUpcomingTripImage(imageUrl);
      }
    } else {
      // Only set null if no image exists, otherwise leave the existing state intact
      if (!upcomingTripImage) {
        setUpcomingTripImage(null); 
      }
    }
  } catch (error) {
    console.error('Error fetching upcoming trip image:', error);
    Alert.alert('Error', 'Failed to fetch upcoming trip image.');
  }
};




const listenForImageUpdates = (userId: string) => {
  const imagesRef = collection(db, 'users', userId, 'upcomingTripImages');
  
  // Query to get the latest image
  const q = query(imagesRef, orderBy('createdAt', 'desc'), limit(1));

  // Real-time listener to update the image whenever the collection is updated
  const unsubscribe =onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      // Get the first document (most recent)
      const latestImageDoc = querySnapshot.docs[0].data() as UpcomingTripImage;
      
      // Check if the imageUrl exists and update the state
      const { imageUrl } = latestImageDoc;
      if (imageUrl) {
        setUpcomingTripImage(imageUrl); // Set the updated image URL
      }
    } else {
      setUpcomingTripImage(null); // No images found
    }
  });

  return unsubscribe; // Return the unsubscribe function to stop listening when needed
};

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
    setLoading(true); // Optionally, you can show a loading state here
    if (currentUser) {
      setUser(currentUser);
      await fetchTripData(currentUser.uid); // Fetch other trip data
      await fetchUpcomingTripImage(currentUser.uid); // Fetch the upcoming trip image
      const unsubscribeImageUpdates = listenForImageUpdates(currentUser.uid); // Listen for image updates

      // Clean up on component unmount
      return () => unsubscribeImageUpdates();
    } else {
      setUser(null);
      setUpcomingTripImage(null); // Clear the image if no user
    }
    setLoading(false); // Hide loading state after fetching
  });

  return () => unsubscribeAuth(); // Unsubscribe from the auth listener when the component unmounts
}, []);


const openModal = () => {
  setModalVisible2(true);
};

// Function to close the modal
const closeModal = () => {
  setModalVisible2(false);
};



const handleSelectImage = async (imageUrl: string) => {
  if (user) {
    try {
      const imagesRef = collection(db, 'users', user.uid, 'upcomingTripImages');
      await addDoc(imagesRef, {
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setUpcomingTripImage(imageUrl);
      setImageSearchModalVisible(false);
      await fetchUpcomingTripImage(user.uid); // Fetch the updated image
    } catch (error) {
      console.error('Error saving image to Firestore:', error);
      Alert.alert('Error', 'Failed to update image.');
    }
  }
};




const Gototrip = () => {
  router.replace('/trips')
}

const handelprofile = () => {
  router.replace('/profile')
}


const handleDeleteTrip = async (id: string) => {
  try {
    // Delete the trip from Firestore
    const tripDocRef = doc(db, 'users', user.uid, 'trips', id);
    await deleteDoc(tripDocRef);
    
    // Remove the trip from state after successful deletion
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    Alert.alert('Success', 'Trip deleted successfully!');
  } catch (error) {
    console.error('Error deleting trip:', error);
    Alert.alert('Error', 'Failed to delete trip.');
  }
};

// Swipeable action to show the delete button
const renderRightActions = (id: string) => {
  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteTrip(id)}
    >
      <Ionicons name='remove-circle' size={40} color={"white"}/>
    </TouchableOpacity>
  );
};



  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      alert('Checkbox is checked');
    } else {
      alert('Checkbox is unchecked');
    }
  };

  const toggleDatePicker = (type: 'start' | 'end') => {
    setShowDatePicker(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle date change for start and end dates
  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    if (type === 'start') {
      setStartDate(date || startDate);
    } else {
      setEndDate(date || endDate);
    }
    setShowDatePicker(prev => ({
      ...prev,
      [type]: false,
    }));
  };

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
    try {
      // Fetch trips collection
      const tripsRef = collection(db, 'users', userId, 'trips');
      const querySnapshot = await getDocs(tripsRef);
  
      const tripsList = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt || new Date(0),
          };
        })
        .sort((a, b) => {
          const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
  
      setTrips(tripsList);
  
      // Fetch upcomingTripImage and upcomingTripTitle
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        setUpcomingTripImage(userDocSnap.data().upcomingTripImage);
        setUpcomingTripTitle(userDocSnap.data().upcomingTripTitle || null);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      Alert.alert('Error', 'Failed to fetch trips.');
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
    if (!isModalVisible) {
      setShowDatePicker({ start: true, end: true }); // Show both start and end date pickers when the modal opens
    } else {
      setShowDatePicker({ start: false, end: false });
    }
    setModalVisible(!isModalVisible);
  };







  const handleSaveTrip = async () => {
    if (!tripName || !startDate || !endDate) {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    try {
      if (user) {
        const newTripRef = collection(db, 'users', user.uid, 'trips');
        await addDoc(newTripRef, {
          name: tripName,
          image: localUpcomingImage || '', // Save the current image, no reset unless changed
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          createdAt: new Date(),
        });

        // If the checkbox is checked, update the upcoming trip
        if (isChecked) {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, 
            { 
              upcomingTripTitle: tripName, 
              upcomingTripImage: localUpcomingImage || '' // Only update if image was selected
            }, 
            { merge: true }
          );
        }

        console.log('Trip saved successfully');
        setTripSaved(true); // Mark the trip as saved

        // Automatically refresh the screen 5 seconds after saving the trip
        setTimeout(() => {
          onRefresh(); // Trigger the refresh after 5 seconds
        }, 1000); // 5000 milliseconds = 5 seconds

        setTripName('');
        setStartDate(new Date());
        setEndDate(new Date());
        setIsChecked(false); // Reset the checkbox state
        toggleModal();
        Alert.alert('Success', 'Trip added successfully!');
      } else {
        Alert.alert('Error', 'User not authenticated.');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      Alert.alert('Error', 'Failed to add trip.');
    }
  };




  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handelprofile}>
            
          <Ionicons name="person-circle" size={40} color="lightblue" style={styles.profbutton} />
        </TouchableOpacity>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}    
      contentContainerStyle={{ flexGrow: 1 }} // This ensures the content stretches to fill the space
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.upcomingcontainer}>
          {upcomingTripImage ? (
            // <Image source={{ uri: upcomingTripImage }} style={styles.tripImage} />
            <Image
            source={{ uri: upcomingTripImage }}  // Make sure this is a valid URL
            style={styles.tripImage}
            resizeMode="contain"  // Ensure the image fits properly within the container
          />

          ) : (
            <View>
              <Text style={styles.Howtouse}>How to use?</Text>
              <Text style={styles.instuction}>1) Add a trip by pressing the "+"</Text>
              <Text style={styles.instuction}>2) Choose a photo of your destination!</Text>
              <Text style={styles.instuction}>3) Start planning!</Text>
            </View>
          )}
          {upcomingTripTitle && (
    <Text style={styles.upcomingtitle}>{upcomingTripTitle}</Text>
  )}
          <View> 
          <TouchableOpacity onPress={pickImage} style={styles.imagepick}>
            <Ionicons name="images-outline" size={24} color="lightblue" />
          </TouchableOpacity>




                <TouchableOpacity style={{left:0,bottom:100}} onPress={openModal}>
                <Ionicons name="search-circle" size={24} color="lightblue" />
                </TouchableOpacity>
                <Modal
                  visible={modalVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={closeModal}
                >
                  <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.modalContainer}>
                      {/* Close Text */}
                      <TouchableOpacity onPress={closeModal} style={styles.closebutton}>
                        <Text style={styles.textInput}>Close</Text>
                      </TouchableOpacity>
                      <ImageSearchComponent />
                    </View>
                  </View>
                </Modal>

          </View>
        </View>

        <View style={styles.pasttripscontainer}>
  <Text style={styles.subtitle}>Past Trips</Text>
  
  <ScrollView contentContainerStyle={styles.tripList}>
  {trips.length > 0 ? (
    trips.map((trip) => (
      <Swipeable key={trip.id} renderRightActions={() => renderRightActions(trip.id)}>
        <TouchableOpacity onPress={() => router.push(`/Trips/${trip.name}`)} >
          <View style={styles.tripCard}>
            <Text style={styles.tripCardText}>{trip.name}</Text>
            <Text style={styles.tripDateText}>
              {trip.startDate} - {trip.endDate}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    ))
  ) : (
    <Text>Add a trip to start the fun!</Text>
  )}
</ScrollView>
</View>
      </ScrollView>

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
          <View style={styles.closebutton}>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons name="close-circle" size={45} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContainer}>
            
            <Text style={styles.modalTitle}>Add a New Trip</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Trip Name"
              value={tripName}
              onChangeText={setTripName}
            />
            <View style={styles.checkbox}>
                <Checkbox value={isChecked} onValueChange={handleCheckBoxChange}/>
                <Text style={styles.checkboxtext}>set as upcoming trip?</Text>
                <TouchableOpacity onPress={openModal} style={styles.imagepick2}>
                <Ionicons name="images-outline" size={24} color="lightblue" />
                </TouchableOpacity>

            </View>
            

            <TouchableOpacity
              onPress={() => toggleDatePicker('start')}
            >
              <Text style={styles.startdatetext} >Start Date: {startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker.start && (
              <DateTimePicker
              style={styles.datepickertext}
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange('start', date)}
              />
            )}
            <TouchableOpacity
              style={styles.enddatebuttontext}
              onPress={() => toggleDatePicker('end')}
            >
              <Text style={styles.enddatetext}>End Date: {endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker.end && (
              <DateTimePicker
              style={styles.datepickertext}
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange('end', date)}
              />
            )}
            <TouchableOpacity onPress={handleSaveTrip} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  deleteButton: {
    right:0,
    top:30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    width: 50,
    borderRadius: 50,
    borderColor:'white'
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
    upcomingtitle:{
        position:"absolute",
        backgroundColor:"transparent",
        fontSize:55,
         bottom:200,
         color:"white",
         fontWeight:'bold',
         fontFamily:"poiret",

        },
    checkboxtext:{
        position:'fixed',
        bottom:20,
        left:30,
        marginBottom:-10,
    },
    checkbox:{
        position:"fixed", 
        right: 90,
        bottom:10
    },
   enddatetext:{
        fontWeight:"bold",
    },
    enddatebuttontext:{
        padding: 12,
        backgroundColor: '#f1f8e9',
        borderRadius: 8,
        alignItems: 'center',
        right:"30%",

    },
    datepickertext:{
        right:"35%",
    },
    dateIcon: {
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'

    

    },
    startdatetext:{
        right:"30%",
        fontWeight:"bold",
    },
    closebutton:{
        position:"fixed",
        backgroundColor:"transparent",
        bottom:"15%",
        left:"40%",
    },
      tripDateText: {
        fontFamily:"sulph-light",
        top:"55%",
        fontSize: 14,
        color: 'grey',
      },
    datePicker: {
        width: 200,
        marginBottom: 20,
      },
    tripList:{
        backgroundColor:"transparent",
        top:"2%",
    },
    tripCard: {
        width:350,
        borderRadius: 25,
        height: 100,
        marginBottom: 10,
        marginTop:5,
        backgroundColor: '#333D79',
        padding: 10,
        borderWidth: 4,
        borderColor:"white",
      },
    tripCardText:{
        fontFamily:"sulph-bold",
        fontSize:20,
        color:"white",
        fontWeight:'900',
        top:"50%",
    },
    modalWrapper: {
      left:"5%",
      borderRadius:15,
      top:"30%",
      width:"90%",
      backgroundColor: 'transparent', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
        bottom:50,
      width: "100%",
      borderRadius: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
      fontFamily:"sulph-bold",
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    textInput: {
      fontFamily:"sulph-bold",
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
          backgroundColor:"transparent",
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
          resizeMode:'contain',
          width: "100%",
          height: "100%",
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
              position:'fixed',
              flex: 1,
            },
        pasttripscontainer: {
              height: "100%", 
              marginVertical: 10,
              backgroundColor: '#CBE4DE',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius:65,
              paddingBottom:"25%",
              bottom:50,
              borderTopLeftRadius:0,
              
            },
        upcomingcontainer: {
            
             position:"fixed",
              height: 450, 
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
              position:"absolute",
              fontSize: 10,
              fontWeight: 'bold',
              color: '#333',
              left:"80%",
              top:15,
            },
        subtitle: {
            fontFamily:"sulph-reg",
            top:5,
            right:130,
              position:"fixed",
              fontSize: 24,
              color: '##03045E',
    
            },
        imagepick:{
            position:"absolute",
            left:130,
            bottom:100,
            },
        imagepick2:{
            position:'fixed',
            left:290,
            bottom:30,
            marginBottom:-30,
            },
  
  
  });
  
  export default Home;