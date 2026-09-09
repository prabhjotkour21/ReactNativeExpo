import { View, Text, StyleSheet } from "react-native"
import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
 import {router} from "expo-router"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    justifyContent: "center",
    alignItems:"center"
  },
  containerText: {
    fontSize: 20,
    fontWeight:"bold"
  }
})

export default function App() {
  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLogin")
      if (isLoggedIn === "true") {
        router.replace("/tabs/home")
      } else {
        router.replace("/login")
      }
    }
    checkLogin()
  },[])
  return null
}