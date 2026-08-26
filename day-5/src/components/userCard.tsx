import { View, Text ,Button} from "react-native"
import {router} from "expo-router"
export default function UserCard({ name, age, skill }: { name: string; age: number; skill:string}) {
    return (
        <View>
            <Text>Name:{name}</Text>
            <Text>Age : {age}</Text>
            <Text>Skill :{skill}</Text>
            <Button title="Back to Home Page" onPress={()=>router.back()}/>
        </View>
    )
}