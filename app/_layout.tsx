import { AuthProvider } from "@/context/authContex";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <AuthProvider>
  <Stack>
    <Stack.Screen name="index" options={{headerShown:false, }}/>
    <Stack.Screen name="(auth)/Login" options={{title:"login", headerShown:false}}/>
    <Stack.Screen name="(auth)/register" options={{title:"register", headerShown:false}}/>
    <Stack.Screen name="(tabs)/[home]" options={{title:"register", headerShown:false}}/>
  </Stack>
</AuthProvider>)
}
