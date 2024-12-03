import { AuthProvider } from "@/context/authContex";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <AuthProvider>
  <Stack>
    <Stack.Screen name="index" options={{headerShown:true, }}/>
    <Stack.Screen name="(auth)/Login" options={{title:"login"}}/>
    <Stack.Screen name="(auth)/register" options={{title:"register"}}/>
  </Stack>
</AuthProvider>)
}
