import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./navigation/TabNavigator"
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <TabNavigator/> */}
    </NavigationContainer>
  )
 
}