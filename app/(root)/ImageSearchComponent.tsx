// import usePexelsSearch from '@/hooks/usePexelsSearch';
// import React from 'react';
// import { View, TextInput, Button, Modal, Text, FlatList, Image, StyleSheet } from 'react-native';

// const ImageSearchComponent = () => {
//   const {
//     searchQuery,
//     setSearchQuery,
//     pexelsImages,
//     handleSearch,
//     loading2,
//     isImageSearchModalVisible,
//     setImageSearchModalVisible,
//   } = usePexelsSearch(); // Destructure the hook's return values

//   return (
    // <View style={styles.container}>
    //   {/* Input Field for Search */}
    //   <TextInput
    //     style={styles.input}
    //     value={searchQuery}
    //     onChangeText={setSearchQuery}
    //     placeholder="Search for images"
    //   />

    //   <Button title="Search" onPress={handleSearch} disabled={loading2} />

    //   {/* Loading Indicator */}
    //   {loading2 && <Text>Loading...</Text>}

    //   {/* Modal to display images */}
    //   <Modal
    //     visible={isImageSearchModalVisible}
    //     onRequestClose={() => setImageSearchModalVisible(false)} // Close modal when requested
    //   >
    //     <View style={styles.modalContainer}>
    //       {/* Close Button */}
    //       <Button title="Close" onPress={() => setImageSearchModalVisible(false)} />

    //       {/* Display fetched images */}
    //       <FlatList
    //         data={pexelsImages}
    //         renderItem={({ item }) => (
    //           <View style={styles.imageContainer}>
    //             <Text>{item.alt}</Text>
    //             <Image source={{ uri: item.src.medium }} style={styles.image} />
    //           </View>
    //         )}
    //         keyExtractor={(item) => item.id.toString()}
    //       />
    //     </View>
    //   </Modal>
    // </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingLeft: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   imageContainer: {

//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,  // Adjusted to make images display better
//     height: 200, // Adjusted for better display
//     resizeMode: 'cover',
//   },
// });

// export default ImageSearchComponent;





import usePexelsSearch from '@/hooks/usePexelsSearch';
import React from 'react';
import { View, TextInput, Button, Modal, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebaseconfig';
import { addDoc, collection, Firestore, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const ImageSearchComponent = () => {
  const {
    searchQuery,
    setSearchQuery,
    pexelsImages,
    handleSearch,
    loading2,
    isImageSearchModalVisible,
    setImageSearchModalVisible,
  } = usePexelsSearch();

  const closeModal = () => {
    setImageSearchModalVisible(false);
  };

  // Function to handle selecting an image and saving it to Firestore
  const handleImageSelect = async (imageUrl: string) => {
    const user = FIREBASE_AUTH.currentUser;
  
    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }
  
    try {
      // Reference to the user's 'upcomingTripImages' subcollection
      const userImagesRef = collection(FIREBASE_DB, 'users', user.uid, 'upcomingTripImages');
  
      // Add a new document to the subcollection with image URL and timestamp
      await addDoc(userImagesRef, {
        imageUrl: imageUrl,
        createdAt: serverTimestamp(), // Firestore server timestamp
      });
  
      Alert.alert('Success', 'Image saved to your upcoming trips!');
      closeModal();
    } catch (error) {
      Alert.alert('Error', `Failed to save image: ${error}`);
      console.error('Error saving image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for images"
      />
      <TouchableOpacity style={styles.searchinput} >
        <Ionicons name='search' size={30} color={"white"} onPress={handleSearch} disabled={loading2}/>
      </TouchableOpacity>

      {loading2 && <Text style={styles.loadingText}>...</Text>}

      <Modal
        visible={isImageSearchModalVisible}
        onRequestClose={closeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name='close-circle' size={45} color={"white"}/>
            </TouchableOpacity>

            <FlatList
              data={pexelsImages}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImageSelect(item.src.medium)}>
                 

                    
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.src.medium }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    searchinput:{
        left:150,
    },
    container: {
        top:20,
        height:60,
        width:350,
        justifyContent: 'center',
        alignItems: 'center', // Ensures the content is centered
        paddingBottom: 2, // Minimal padding at the bottom
        backgroundColor: 'lightgrey', // Light background color for contrast
        borderRadius: 40, // Slightly rounded corners
        elevation: 2, // Small shadow effect for Android
        shadowColor: '#ccc', // Light shadow for iOS
        shadowOffset: { width: 0, height: 1 }, // Subtle shadow offset
        shadowOpacity: 0.2, // Light opacity for shadow
        shadowRadius: 3, // Small radius for a soft shadow
      },
      
      input: {
        bottom:10,
        left:10,
        height:40,
        width:280,
        position:'absolute',
        borderColor: 'lightgrey', // Lighter border color for a cleaner look
        borderWidth: 1,
        borderRadius: 30, // Rounded corners for a soft look
        paddingHorizontal: 10, // Adds padding inside the input field
        backgroundColor: 'white', // Light background for the input field
        fontSize: 16, // Slightly larger text for better readability
      },
      
      loadingText: {
        textAlign: 'center',
        marginVertical: 5, // Reduced vertical margin for a compact layout
        fontSize: 14, // Smaller font size for the loading text
        color: '#555', // Softer color for better legibility
        bottom:10
      },
      
      modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better modal focus
      },
      
      modalContainer: {
        top:100,
        width: '100%', // Narrower modal container for a thinner appearance
        maxHeight: '80%', // Limits the height of the modal for a compact view
        backgroundColor: '#fff', // White background for the modal
        borderRadius: 12, // Rounded corners for a smoother look
        elevation: 8, // Elevated shadow for better visibility
        shadowColor: '#000', // Dark shadow for better contrast
        shadowOffset: { width: 0, height: 3 }, // Increased shadow offset for better depth
        shadowOpacity: 0.3, // Slightly darker shadow opacity
        shadowRadius: 5, // Slightly larger radius for a softer shadow
      },
      
      closeButton: {
        position: 'absolute',
        right: 45, // Positioned on the right side of the modal
        bottom:580,
        backgroundColor: 'transparent', // Transparent background for the close button
        padding: 1, // Padding around the button for easier interaction
        borderRadius:40,


      },
      
      closeText: {
        fontSize: 16, // Slightly smaller font size for the close button
        fontWeight: 'bold',
        color: '#ff4d4d', // Softer red for the close button
      },
      
      imageContainer: {
        margin:2,
        height:150,
        width: '100%',
        alignItems: 'center', // Ensures the image is centered
      },
      image: {
        width: 190, // Slightly smaller image width
        height:"100%", // Slightly smaller height for a more compact image
        resizeMode: 'contain',
        borderRadius: 15, // Rounded corners for the image

      },
});

export default ImageSearchComponent;