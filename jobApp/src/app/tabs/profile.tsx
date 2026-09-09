import { View, Text, StyleSheet, Pressable } from 'react-native'; 
import AsyncStorage from "@react-native-async-storage/async-storage"
import {router} from "expo-router"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },

  containerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function Profile() {
  const logout = async () => {
    await AsyncStorage.removeItem("islogin")
    router.replace('/login')
  }
  return (
    <View style={styles.container}>

      <View style={styles.profileCard}>

        <Text style={styles.containerText}>
          Profile Screen
        </Text>

        <Text style={styles.userInfo}>
          Name: Prabhjot Kour
        </Text>

        <Text style={styles.userInfo}>
          Email: jot@gmail.com
        </Text>

        <Text style={styles.userInfo}>
          Role: Software Engineer
        </Text>

        <Pressable style={styles.logoutButton}
        onPress={()=>{logout()}}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>

      </View>

    </View>
  );
}