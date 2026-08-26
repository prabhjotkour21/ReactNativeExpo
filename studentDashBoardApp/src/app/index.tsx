import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import UserCard from "../components/UserCard"
import { useEffect, useState } from "react"
import SkillCard from "@/components/SkillCard"
export default function App() {
  const [logIn,setLogIn]=useState(false)
  useEffect(() => {

    console.log(logIn?"User logged in":"User logged out");
    
  },[logIn])
  return (
    <SafeAreaView>

       <View>
      <Text>Student Dashboard App</Text>
        <UserCard name="Prabhjot" age={24} skill="React Native" />
         <SkillCard skill="React Native" experience="1 Year" level="Beginner" />
        <SkillCard skill="Node" experience="3 Year" level="Beginner" />
        <SkillCard skill="JavaScript" experience="2 Year" level="Beginner"/>
        <Pressable onPress={()=>setLogIn(!logIn)}>{logIn==true?(<Text>WelCome Jot</Text>):(<Text>Please Login</Text>) }</Pressable>
    </View>
    </SafeAreaView>
   
    
  )
}