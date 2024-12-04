import { AuthProvider } from "@/context/authContex";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";



export default function RootLayout() {
  const navigation = useNavigation();





  return (
  <AuthProvider>
  <Stack>
    <Stack.Screen name="index" options={{headerShown:false, }}/>
    <Stack.Screen name="(auth)/Login" options={{title:"login", headerShown:false}}/>
    <Stack.Screen name="(auth)/register" options={{title:"register", headerShown:false}}/>
    <Stack.Screen 
        name="(root)/[home]"
        options={{
          title: 'register',
          headerShown: true,
          headerTitle: () => ( // Custom header title with image
            <Image 
              source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/longlogo.png')} 
              style={{ width: 200, height: 65, resizeMode: 'contain', bottom: '40%' }} 
            />
          ),
          headerLeft: () => ( // Add the hamburger button
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Open the drawer
              style={{ marginLeft: 10 }} // Adjust spacing as needed
            >
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
</AuthProvider>)
}
