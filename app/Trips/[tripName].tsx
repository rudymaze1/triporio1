// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const TripName = () => {
//   const { tripName } = useLocalSearchParams();
//   const tripNameStr = Array.isArray(tripName) ? tripName[0] : tripName || 'Default Trip';




//   const handelback = () => {
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.title}>
//       <TouchableOpacity style={styles.backbuttoncont}  onPress={handelback}>
//           <Image 
//           source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/return.png')} // Local image
//           style={styles.backbutton} />
//           </TouchableOpacity>
//           <Text style={styles.titletext}>{tripNameStr} Itinerary</Text>
//       </View>



//       <ScrollView style={styles.itinar}>
        
//       </ScrollView>





//     </SafeAreaView>
//   );
// };

// export default TripName;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Full height of the screen
//     width: "100%",
//   },
//   title: {
//     height: 60, // Fixed height for the header
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center", // Center the title text
//     backgroundColor: "transparent",
//     position: "relative",
//   },
//   titletext: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   backbutton: {
//     height: 20,
//     width: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   backbuttoncont: {
//     position: "absolute",
//     left: 0, // Align the back button to the left edge
//     height: "100%",
//     justifyContent: "center",
//     paddingHorizontal: 15, // Adjust horizontal padding for spacing
//   },
//   itinar: {
//     flex: 1, // Take up all remaining space
//     width: "100%",
//     backgroundColor: "red",
//     borderRadius: 40,
//     padding: 16, // Internal padding for content
//   },

// });




// import React, { useEffect, useMemo, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Swipeable } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons'; // Ensure Ionicons is imported

// // Mock trip data for demonstration purposes
// const trip = {
//   dayGroup: [
//     { day: 'Day 1', activities: ['Visit museum', 'Lunch at cafe'] },
//     { day: 'Day 2', activities: [] },
//   ],
// };

// const TripName = () => {
//   const { tripName } = useLocalSearchParams();
//   const tripNameStr = Array.isArray(tripName) ? tripName[0] : tripName || 'Default Trip';

//   // State for managing day groups, new activities, modal visibility, and selected day
//   const [dayGroups, setDayGroups] = useState(trip.dayGroup);
//   const [newActivity, setNewActivity] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDay, setSelectedDay] = useState('');

//   // Add activity to a selected day
//   const handleAddActivity = useCallback(() => {
//     if (newActivity.trim() && selectedDay) {
//       const updatedGroups = dayGroups.map((group) => {
//         if (group.day === selectedDay) {
//           return { ...group, activities: [...group.activities, newActivity] };
//         }
//         return group;
//       });
//       setDayGroups(updatedGroups);
//       setNewActivity('');
//       setModalVisible(false);
//     }
//   }, [newActivity, selectedDay, dayGroups]);


//   const handleDeleteDay = useCallback((dayToDelete: string) => {
//     const updatedGroups = dayGroups.filter((group) => group.day !== dayToDelete);
//     setDayGroups(updatedGroups);
//   }, [dayGroups]);


//   // Render delete button for swipe action
//   const renderRightActions = useCallback((day: string) => (
//     <TouchableOpacity onPress={() => handleDeleteDay(day)} style={styles.deleteButton}>
//       <Text style={styles.deleteButtonText}>Delete</Text>
//     </TouchableOpacity>
//   ), [handleDeleteDay]);

//   // Go back to the previous screen
//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header with back button and title */}
//       <View style={styles.title}>
//         <TouchableOpacity style={styles.backButtonContainer} onPress={handleBack}>
//           <Image
//             source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/return.png')}
//             style={styles.backButton}
//           />
//         </TouchableOpacity>
//         <Text style={styles.titleText}>{tripNameStr} Itinerary</Text>
//       </View>

//       {/* List of days and activities */}
//       <FlatList
//         style={styles.itinar}
//         data={dayGroups}
//         keyExtractor={(item) => item.day}
//         renderItem={({ item, index }) => (
//           <Swipeable renderRightActions={() => renderRightActions(item.day)}>
//             <View style={styles.dayGroup}>
//               <Text style={styles.dayTitle}>Day {index + 1}</Text>
//               {item.activities.length > 0 ? (
//                 item.activities.map((activity, activityIndex) => (
//                   <View key={activityIndex} style={styles.activityContainer}>
//                     {/* <Image source={require('../assets/images/biglist.png')} style={styles.listImg} /> */}
//                     <Text style={styles.activity}>{activity}</Text>
//                   </View>
//                 ))
//               ) : (
//                 <Text style={styles.noActivities}>No activities yet</Text>
//               )}
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => {
//                   setSelectedDay(item.day);
//                   setModalVisible(true);
//                 }}
//               >
//                 <Ionicons name="add-circle-outline" size={30} color="blue" />
//               </TouchableOpacity>
//             </View>
//           </Swipeable>
//         )}
//       />

//       {/* Modal for adding a new activity */}
//       <Modal visible={modalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//               placeholder="Enter new activity"
//               value={newActivity}
//               onChangeText={setNewActivity}
//               style={styles.input}
//             />
//             <TouchableOpacity onPress={handleAddActivity} style={styles.addActivityButton}>
//               <Text style={styles.addActivityButtonText}>Add Activity</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default TripName;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   backButton: {
//     height: 20,
//     width: 20,
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     left: 0,
//     height: '100%',
//     justifyContent: 'center',
//     paddingHorizontal: 15,
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   itinar: {
//     flex: 1,
//     width: '100%',
//   },
//   dayGroup: {
//     padding: 16,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 8,
//     elevation: 2,
//   },
//   dayTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   activityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   activity: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   listImg: {
//     width: 20,
//     height: 20,
//   },
//   noActivities: {
//     color: 'grey',
//     marginTop: 8,
//   },
//   addButton: {
//     marginTop: 10,
//     alignSelf: 'flex-end',
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80,
//     marginVertical: 8,
//     borderRadius: 10,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   input: {
//     borderBottomWidth: 1,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   addActivityButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   addActivityButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// });











import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripName = () => {
  const { tripName } = useLocalSearchParams();
  const tripNameStr = Array.isArray(tripName) ? tripName[0] : tripName || 'Default Trip';
  const [dayGroups, setDayGroups] = useState<{ day: string; activities: string[] }[]>([]);
  const [newActivity, setNewActivity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');


  

  useEffect(() => {
    const loadTripData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(`trip_${tripNameStr}`);
        if (storedData) {
          // If trip data exists, load it
          setDayGroups(JSON.parse(storedData));
        } else {
          // If no trip data exists, set a default "Day 1"
          setDayGroups([{ day: 'Day 1', activities: [] }]);
        }
      } catch (error) {
        console.error('Failed to load trip data:', error);
      }
    };
  
    loadTripData();
  }, [tripNameStr]);

  // Handle adding activity to a specific day
  const handleAddActivity = useCallback(() => {
    if (newActivity.trim() && selectedDay) {
      const updatedGroups = dayGroups.map((group) => {
        if (group.day === selectedDay) {
          return { ...group, activities: [...group.activities, newActivity] };
        }
        return group;
      });
      setDayGroups(updatedGroups);
      setNewActivity('');
      setModalVisible(false);
    }
  }, [newActivity, selectedDay, dayGroups]);

  // Handle deleting a day
  const handleDeleteDay = useCallback((dayToDelete: string) => {
    const updatedGroups = dayGroups.filter((group) => group.day !== dayToDelete);
    setDayGroups(updatedGroups);
  }, [dayGroups]);

  // Handle adding a new day
  const handleAddDay = useCallback(() => {
    const newDayIndex = dayGroups.length + 1;
    const newDay = { day: `Day ${newDayIndex}`, activities: [] };
    setDayGroups((prevDayGroups) => [...prevDayGroups, newDay]);
  }, [dayGroups]);

  // Render delete button for swipe actions
  const renderRightActions = useCallback((day: string) => (
    <TouchableOpacity onPress={() => handleDeleteDay(day)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  ), [handleDeleteDay]);

  // Go back to the previous screen
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={handleBack}>
          <Image
            source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/return.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>{tripNameStr} Itinerary</Text>
      </View>

      {/* List of days and activities */}
      <FlatList
        style={styles.itinar}
        data={dayGroups}
        keyExtractor={(item, index) => `${item.day}_${index}`}
        renderItem={({ item, index }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.day)}>
            <View style={styles.dayGroup}>
              <Text style={styles.dayTitle}>Day {index + 1}</Text>
              {item.activities.length > 0 ? (
                item.activities.map((activity, activityIndex) => (
                  <View key={activityIndex} style={styles.activityContainer}>
                       <Image
            source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/biglist.png')}
            style={styles.backButton}
          />
                    <Text style={styles.activity}>{activity}</Text>
                    <TouchableOpacity>
                    <Ionicons name='ellipsis-vertical-sharp' size={20} color={"red"}  style={styles.elipsebutton}/>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noActivities}>No activities yet</Text>
              )}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setSelectedDay(item.day);
                  setModalVisible(true);
                }}
              >
                <Ionicons name="add-circle-outline" size={30} color="blue" />
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
      />

      {/* Modal for adding a new activity */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter new activity"
              value={newActivity}
              onChangeText={setNewActivity}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddActivity} style={styles.addActivityButton}>
              <Text style={styles.addActivityButtonText}>Add Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Button to add a new day */}
      <View style={{ bottom: 170, position:'absolute', right:30  }}>
        <TouchableOpacity onPress={handleAddDay}>
          <Ionicons name='add-circle' size={45} color={"blue"}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default TripName;

const styles = StyleSheet.create({
  elipsebutton:{
    position:"fixed",
    right:0,
    bottom:3,

  },
  container: {
    height:"110%",
    padding: 0,
    backgroundColor: 'red',
    bottom:0,
    
  },
  title: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    height: 20,
    width: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itinar: {
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    padding:12,
    flex: 1,
    width: "100%",
    backgroundColor:"white",
    height:"100%"
  },
  dayGroup: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 25,
    marginVertical: 8,
    elevation: 1,
    borderLeftWidth:0.5,
    borderBottomWidth:0.5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,

  },
  activity: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1, // Takes up all available space
    borderBottomWidth:0.2,
    borderColor:'lightgrey',

  },
  listImg: {
    width: 20,
    height: 20,
  },
  noActivities: {
    color: 'grey',
    marginTop: 8,
  },
  addButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginVertical: 8,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  addActivityButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addActivityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});







