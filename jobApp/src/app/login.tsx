import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import  AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },

  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },

  loginMessage: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  homeButton: {
    marginTop: 20,
  },
});

export default function Login() {
  const [islogin, setIslogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBtn = () => {
    if (!email || !password) {
      setError("Please fill Email and Password first");
      return;
    }

    setError("");
    console.log("Email:", email);
    console.log("Password:", password);
    setIslogin(true);
    AsyncStorage.setItem("islogin", "true");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.subtitle}>
          Please login to continue
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleBtn}
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        {islogin ? (
          <View style={styles.homeButton}>
            <Button
              title="Go to Home Page"
              onPress={() => {
                router.push("/tabs/home");
              }}
            />
          </View>
        ) : (
          <Text style={styles.loginMessage}>
            Please Login First
          </Text>
        )}
      </View>
    </View>
  );
}