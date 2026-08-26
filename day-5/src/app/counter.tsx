import { View, Text,StyleSheet,Pressable} from "react-native"
import {  useState,useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {router} from "expo-router"

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 300,
    margin: 15,
    flexDirection: "column",
    alignItems: "center",
    gap:5
  },
  text: {
    fontWeight: "bold",
    fontSize:30
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:8
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight:"bold"
  }

})

export default function Counter() {
    const [count, setCount] = useState(0)
    useEffect(() => {
    console.log("Count changed:",count);
    
},[count])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Count:{count}</Text>
        <Pressable
          style={styles.btn}
          
          onPress={() => setCount(count + 1)
          
          }
        ><Text style={ styles.btnText} >Increase</Text></Pressable>

        <Pressable  style={styles.btn} onPress={()=>count>0?setCount(count-1):count}><Text style={ styles.btnText}>Decrease</Text></Pressable>
              <Pressable style={styles.btn} onPress={() => setCount(0)}><Text style={styles.btnText}>Reset</Text></Pressable>
              
              <Pressable
                  style={styles.btn}
               onPress={()=>router.back()}
              ><Text style={styles.btnText}>Back</Text></Pressable>
        </View>
      </SafeAreaView>
  )
}