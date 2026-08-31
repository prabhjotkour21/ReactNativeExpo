import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"


export default function UserDetail() {
    const { id ,name, age ,husbandName} = useLocalSearchParams()
    return (
        <SafeAreaView>
        <View>
            <Text>User Detail</Text>
                <Text>User ID: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age:{age}</Text>
                <Text>HusbandName : { husbandName}</Text>
                
            </View>
        </SafeAreaView>
    )
}