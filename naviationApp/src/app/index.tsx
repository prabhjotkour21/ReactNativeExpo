import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "@/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator/>
   </NavigationContainer> 
  )
}