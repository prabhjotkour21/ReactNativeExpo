import { View, Text ,Button,StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {router} from "expo-router"
export default function Home() {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button
          title="View User"
          onPress={()=> {
            router.push({
              pathname: "/user-detail",
              params: {
                id: "101",
                name: "jot",
                age: "25",
                husbandName:"Vijay Singh"
              }
            })
          }}
        />
      </View>
    </SafeAreaView>
    
  )
}