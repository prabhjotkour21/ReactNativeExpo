import { View, Text } from "react-native"
export default function UserCard({ name, age, skill }: { name: string; age:number,skill:string}){
    
    return (
        <View>
            <Text>Name:{name}</Text>
            <Text>Age:{age}</Text>
            <Text>Skill:{skill}</Text>
        </View>
        
    )
}