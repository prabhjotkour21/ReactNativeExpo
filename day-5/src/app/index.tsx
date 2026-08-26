import { View, Text,StyleSheet,Pressable} from "react-native"
import {  useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import UserCard from "../components/userCard"
import SkillCard from "../components/SkillCard"
import { Link } from "expo-router"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  link: {
    fontSize: 20,
    color: "blue",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle:"italic"
  }, btn: {
    width: 200,
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:8
  },
});

export default function App() {
  const [isLoggedIn,setIsLoggedIn] =useState(false)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>
          My Learning App
          
        </Text>
        
        <UserCard name="Prabhjot" age={25} skill="React Native" />
        <UserCard name="Aman" age={23} skill="JavaScript " />
        <UserCard name="Vijay" age={23} skill="NodeJs " />
        <SkillCard skill="React Native" experience="1 Year" level="Beginner" />
        <SkillCard skill="Node" experience="3 Year" level="Beginner" />
        <SkillCard skill="JavaScript" experience="2 Year" level="Beginner"/>
        <Pressable style={styles.btn} onPress={()=>setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? (<Text style={styles.text}>Welcome Prabhjot</Text>) :(<Text style={styles.text}>Please Login</Text>)}</Pressable>
        <Link href="/counter" style={styles.link}> Go to Counter</Link>
        {/* <Link href="../components/userCard" style={styles.link}>Go to UserCard</Link> */}
      </View>
    </SafeAreaView>
  )
}