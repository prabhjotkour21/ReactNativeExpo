import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import TabNavigator from "./TabNavigator";

const Stack=createNativeStackNavigator()


export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>





        // <Stack.Navigator 
        //     screenOptions={{
        //        headerTitleAlign:"center"
        //    }}
        // >
        //     <Stack.Screen
        //         name="Home"
        //         component={HomeScreen}
        //         options={{title:"My Home"}}
        //     />
        //     <Stack.Screen
        //         name="Profile"
        //         component={ProfileScreen}
        //         options={{title:"My Profile"}}
        //     />
        //     <Stack.Screen
        //         name="Setting"
        //         component={SettingScreen}
        //         options={{title:"App Settings"}}
        //         // options={{
        //         //     headerShown:false
        //         // }}
        //     />
        // </Stack.Navigator>
    )
}