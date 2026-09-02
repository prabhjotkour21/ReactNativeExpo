
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and password are required");
      return;
    }

    try {
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (response.ok) {
        const token = data.accessToken;

        await AsyncStorage.setItem("token", token);

        console.log("Token saved:", token);

        Alert.alert("Success", "Login Successful");

        setUsername("");
        setPassword("");
      } else {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid username or password"
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Login Failed",
        "Something went wrong"
      );
    }
  };

  // ================= REGISTER =================
  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await fetch(
        "https://dummyjson.com/users/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Register Response:", data);

      if (response.ok) {
        Alert.alert(
          "Success",
          "Register successful"
        );

        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        Alert.alert(
          "Register Failed",
          data.message || "Registration failed"
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Something went wrong. Please try again."
      );
    }
  };

  // ================= GET TOKEN =================
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("Stored Token:", token);

      if (token) {
        Alert.alert(
          "Token",
          "Token found in AsyncStorage"
        );
      } else {
        Alert.alert(
          "Token",
          "No token found"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= GET PROFILE =================
  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Error",
          "Please login first"
        );
        return;
      }

      const response = await fetch(
        "https://dummyjson.com/auth/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Profile:", data);

      if (response.ok) {
        Alert.alert(
          "Profile",
          `Username: ${data.username}\nEmail: ${data.email}`
        );
      } else {
        Alert.alert(
          "Error",
          data.message || "Unable to get profile"
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Something went wrong"
      );
    }
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");

      Alert.alert(
        "Success",
        "Logout successful"
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to logout"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Authentication App
          </Text>

          <Text style={styles.subtitle}>
            Login & Register
          </Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Account Details
          </Text>

          {/* USERNAME */}
          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          {/* EMAIL */}
          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* PASSWORD */}
          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* LOGIN */}
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={handleLogin}
            />
          </View>

          {/* REGISTER */}
          <View style={styles.button}>
            <Button
              title="Register"
              onPress={handleRegister}
            />
          </View>
        </View>

        {/* TOKEN CARD */}
        <View style={styles.actionCard}>

          <Text style={styles.sectionTitle}>
            Authentication Actions
          </Text>

          <View style={styles.button}>
            <Button
              title="Get Token"
              onPress={getToken}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Get Profile"
              onPress={getProfile}
            />
          </View>

          <View style={styles.logoutButton}>
            <Button
              title="Logout"
              onPress={handleLogout}
            />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  container: {
    flexGrow: 1,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 4,
  },

  actionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: "#fafafa",
  },

  button: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    overflow: "hidden",
  },

  logoutButton: {
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
});

