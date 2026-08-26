import { View, Text } from "react-native"
export default function SkillCard({ skill, experience, level }: { skill: any; experience: any; level:any} ){
    return (
         <View>
                <Text>Skill:{skill}</Text>
                <Text>Experience : {experience}</Text>
                <Text>Level :{level}</Text>
                
            </View>
    )
}