import { AuthProvider } from "@/context/authContex";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";



export default function RootLayout() {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState<string>('Hello');

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
          headerShown: false,
          headerTitle: () => ( // Custom header title with image
            <Image 
              source={require('/Users/rudy/Desktop/react-proj/triporio1/assets/images/longlogo.png')} 
              style={{ width: 200, height: 65, resizeMode: 'contain', bottom: '40%', backgroundColor:"transparent",}} 
            />
          ),
        }}
      />
    </Stack>
</AuthProvider>)
}

