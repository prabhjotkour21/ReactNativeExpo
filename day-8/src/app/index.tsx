import { View, Text ,Button, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  successText: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
    fontWeight: "600",
    marginBottom: 10,
  },

  loginText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },

  buttonContainer: {
    gap: 10,
  },
});
export default function App() {
  const [isLogedIn, setIsLggedIn] = useState(false)
  const [loading, setloading] = useState(true)
  
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("username", "jot")
      console.log("data saved successfully");
      
    } catch (error) {
      console.log("Error saving data :",error);
      
    }
  }

  const savaUserObj = async () => {
    try {
      const user = { name: "Jot", age: 25, email: "pkour@gmail.com" }
      await AsyncStorage.setItem("user", JSON.stringify(user))
      console.log("user object saved");
      
    } catch (error) {
      console.log("error",error);
      
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        console.log("Retrived value :", value);
        
      } else {
        console.log("No data found for this key");
        
      }
    } catch (error) {
      console.log("error",error);
      
    }
  }
  const getObjDate = async () => {
    try {
      const bag = await AsyncStorage.getItem("user")
      if (bag !== null) {
        const user = JSON.parse(bag)
        console.log("user Obje :", user);
        console.log("name :", user.name);
        console.log("age :", user.age);

      } else {
       
        console.log("No data found for this key");
        
      
      }
      
    } catch (error) {
      console.log("error",error);
      
    }
  }
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("username")
      console.log("data removed successfully ");
      
      
    } catch (err) {
      console.log("error",err);
      
    }
  }
  const removeMultiple = async () => {
    try {
      await AsyncStorage.multiRemove(["username", "user"])
      console.log("Multiple item removed");
      
    } catch (err) {
      console.log("erro",err);
      
    }
  }
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      console.log("All item removed");
      
    } catch (err) {
      console.log("erro",err);
      
    }
  }

const loginUser = async () => {
    try {
      const api = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({email:"eve.holt@reqres.in",password:"cityslicka"})
      })
      const data = await api.json()
      if (data.token) {
        await AsyncStorage.setItem("token", data.token)
        console.log("Token saved successfully");
        
      }
    } catch (err) {
      console.log("err",err);
      
    }
  }

const fetcProtectdData = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        return "No token found"
      }
      const res = await fetch("https://httpbin.org/bearer", {
        method: "GET",
        headers: {
          Authorization :`Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log("Protected API response", data);
      
    } catch (err) {
      console.log("err",err);
      
    }
}
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        setIsLggedIn(true)
      } else {
        setIsLggedIn(false)
      }
      
    } catch (err) {
      console.log("err",err);
      
    } finally {
      setloading(false)
    }
  }
   useEffect(() => {
    checkLoginStatus()
  },[])
  if (loading) {
    return <Text>Loading.........</Text>
  }
  
 
  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.card}>

      <Text style={styles.title}>AsyncStorage Learning</Text>

      {isLogedIn ? (
        <Text style={styles.successText}>
          Welcome! You are logged in 🎉
        </Text>
      ) : (
        <Text style={styles.loginText}>
          Please Login
        </Text>
      )}

      <Text style={styles.subtitle}>
        Learn Storage & Authentication
      </Text>

      <View style={styles.buttonContainer}>

        <Button
          title="Save Data"
          onPress={saveData}
        />

        <Button
          title="Save User Obj Data"
          onPress={savaUserObj}
        />

        <Button
          title="Get Data"
          onPress={getData}
        />

        <Button
          title="Get Obj Data"
          onPress={getObjDate}
        />

        <Button
          title="Remove Data"
          onPress={removeData}
        />

        <Button
          title="Remove Multiple"
          onPress={removeMultiple}
        />

        <Button
          title="Clear All"
          onPress={clearAll}
        />

        <Button
          title="Login User"
          onPress={loginUser}
        />

        <Button
          title="Fetch Protected Data"
          onPress={fetcProtectdData}
        />

      </View>

    </View>
  </SafeAreaView>
);
}