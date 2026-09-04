import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from '@/context/AuthContext';

export default function App() {
  const { user, login, logout, loading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.heading}>
          Context API
        </Text>

        {user ? (
          <View style={styles.content}>
            <Text style={styles.welcome}>
              Welcome, {user.name}
            </Text>

            <View style={styles.button}>
              <Button
                title="Logout"
                onPress={logout}
                color="#e74c3c"
              />
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.loginText}>
              Please login to continue
            </Text>

            <View style={styles.button}>
              <Button
                title={loading ? "Logging in..." : "Login"}
                onPress={() => login('test@test.com', '123456')}
                disabled={loading}
                color="#007AFF"
              />
            </View>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    // Shadow for Android
    elevation: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  content: {
    alignItems: "center",
    width: "100%",
  },

  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  loginText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  button: {
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
});