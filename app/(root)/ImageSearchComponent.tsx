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

      <Button title="Search" onPress={handleSearch} disabled={loading2} />

      {loading2 && <Text style={styles.loadingText}>Loading...</Text>}

      <Modal
        visible={isImageSearchModalVisible}
        onRequestClose={closeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <FlatList
              data={pexelsImages}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImageSelect(item.src.medium)}>
                  <View style={styles.imageContainer}>
                    <Text style={styles.imageDescription}>{item.alt}</Text>
                    <Image source={{ uri: item.src.medium }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:300,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  imageDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default ImageSearchComponent;