import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack"; 
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SettingScreen from "@/screens/SetttingScreen";


const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="Setting"
                component={SettingScreen}
            />
        </Stack.Navigator>
    )
}