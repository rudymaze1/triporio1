// import { FIREBASE_AUTH } from "@/config/firebaseconfig";
// import { Link, useRouter } from "expo-router";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react"
// import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";

// const LoginScreen = () => {
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState(""); 
//     const router = useRouter();

//     const handleLogin = async () => {
//         try{
//             await signInWithEmailAndPassword (FIREBASE_AUTH, email,password)
//             router.replace("/(auth)/register")
//             console.log("login succesful")
//         }catch (error){
//             console.error("error logging in", error);
//             alert("login failed check credentials.")
            
//         }



//         console.log("login attempted w/", email, password)
//     };

    


//     return (
        
//         <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container1}
//         keyboardVerticalOffset={100}
//         >
//             <View style={styles.carosel}>
//                 // add the carosel here
//             </View>



//             <View style={styles.container2}>
//                 <TextInput 
//                 style={styles.input}
//                 placeholder="email"
//                 value={email}
//                 onChangeText={setemail}
//                 keyboardType="email-address"
//                 />

//                 <TextInput 
//                 style={styles.input}
//                 placeholder="password"
//                 value={password}
//                 onChangeText={setpassword}
//                 secureTextEntry
//                 /> 

//                 <Button 
//                 title="login"
//                 onPress={handleLogin}
//                 />


//                 <Link href={"/register"} > 
//                 <Text> already have an acocunt?</Text>
//                 </Link>


//             </View>
//         </KeyboardAvoidingView>
//     )



// }
// const styles = StyleSheet.create ({
//     container1:{
//         flex: 1, 
//         justifyContent:'center',
//         padding:16,
//         top:"0%"
//     },
//     container2:{
//         flex: 1, 
//         justifyContent:'center',
//         padding:16,
//         bottom:"10%"
//     },
//     input:{
//         height:40, 
//         borderColor:'grey',
//         borderWidth: 1,
//         margin:10,
//         paddingLeft: 8,
//     },
//     carosel:{
//         flex:1,
//         position:'fixed'

//     }
// })




// export default LoginScreen;




import { FIREBASE_AUTH } from "@/config/firebaseconfig";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, Dimensions, Image, FlatList, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");  // Get screen width and height

// Define the type for the carousel items
interface CarouselItem {
  id: string;
  image: any; // Image type
}

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      router.replace("/[home]");
      console.log("Login successful");
    } catch (error) {
      console.error("Error logging in", error);
      alert("Login failed. Check your credentials.");
    }
  };

  const carouselItems: CarouselItem[] = [
    { id: "1", image: require("../../assets/images/new1.png") },
    { id: "2", image: require("../../assets/images/2.png") },
    { id: "3", image: require("../../assets/images/3.png") },
  ];

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <View style={styles.carouselContainer}>
        <FlatList
          data={carouselItems}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          snapToAlignment="center"
          decelerationRate="fast"
          style={styles.carouselList}
        />
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={"grey"}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={"grey"}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.googlebutton}>
      <Image 
        source={require("../../assets/images/newgoogle.png")} 
        style={styles.googleLogo} 
      />
    </TouchableOpacity>


  
          
         <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Link href={"/register"} style={styles.link}>
          <Text style={styles.linkText}>Create an account</Text>
        </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  carouselContainer: {
    flex: 3,  // Takes up the top half of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    paddingTop:60,
  },
  carouselList: {
    width: width,  // Ensure carousel is full width
  },
  carouselItem: {
    width: width * 1,  // Adjust width for the carousel item
    height: 450,  // Set height for the carousel image
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensure the image is contained within the carousel item
  },
  loginContainer: {
        flex: 1,  // Takes up the bottom half of the screen
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "transparent", // Ensure the container is transparent
        alignItems: 'center',  // Center the content horizontally
        marginTop: -30, // To make the floating effect appear from the top
        
  },
  inputCard: {
        backgroundColor: 'white', // Transparent blue background
        borderRadius: 30,  // Rounded corners for the card
        padding: 16,
        shadowColor: "#000",  // Shadow properties for the floating effect
        shadowOffset: { width: 0, height: 4 },  // Shadow direction and depth
        shadowOpacity: 0.25,  // Shadow opacity
        shadowRadius: 9,  // Radius of the shadow
        elevation: 6,  // Elevation for Android
        width: '90%',  // Card width, adjust as needed
        bottom:"40%",

  },
  input: {
    borderRadius:30,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
    backgroundColor: "transparent",
  },
  linkText: {
    top:90,
    color: 'blue',
    textAlign: 'center',
  },
  link:{
    position:'absolute',
    top:"130%",
    width:"115%",
  },

  loginButton: {
    backgroundColor: '#007AFF', // A nice blue background
    paddingVertical: 12,         // Vertical padding to make the button taller
    paddingHorizontal: 30,       // Horizontal padding to make it wider
    borderRadius: 30,            // Rounded corners for the button
    alignItems: 'center',        // Center the text horizontally
    justifyContent: 'center',    // Center the text vertically
    width: '40%',                // Make the button take up 90% of the width
    marginTop: 0,               // Space from the top element (like input fields)
    left:"60%",
  },
  loginButtonText: {
    color: 'white',              // White text color
    fontWeight: 'bold',          // Bold text
    fontSize: 18,                // Text size
    textAlign: 'center',         // Ensure text is centered
  },
  googlebutton: {
    left:"10%",
    top:"75%",
    position:'absolute',
    alignItems: 'center',  // Centers the image inside the button
    justifyContent: 'center',  // Centers the content vertically
    borderRadius: 0,  // Rounded corners for the button
    overflow: 'hidden',  // Ensures the rounded corners are applied to the image as well
    padding: 0,
    backgroundColor: 'transparent', // Light background color for the button
  },
  googleLogo: {
    height: 60,  // Image height
    width: 30,  // Image width
    resizeMode: 'contain',  // Ensures the image fits inside without distortion
    borderRadius: 15,  // Optional: rounds the corners of the image itself
  },


});

export default LoginScreen;
