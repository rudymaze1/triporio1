import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router"; // Correct import

const StackLayout = () => {
  const navigation = useNavigation(); // Hook must be used outside the JSX

  return (
    <Stack>
      <Stack.Screen 
        name="[home]" 
        options={{
          headerShown: false, // Hide the default header
          headerTitle: "CHAT", // Custom title for the header
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
