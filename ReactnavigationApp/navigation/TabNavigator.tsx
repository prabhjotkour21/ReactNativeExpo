import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createBottomTabNavigator()
export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
            />
        </Tab.Navigator>
    )
}