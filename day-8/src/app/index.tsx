import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

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

  logTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  logBox: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    maxHeight: 300,
  },

  logText: {
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default function App() {
  const [isLogedIn, setIsLggedIn] = useState(false);
  const [loading, setloading] = useState(true);

  // UI ke andar logs store karne ke liye
  const [logs, setLogs] = useState<string[]>([]);

  // Console + UI dono par log show hoga
  const addLog = (message: string) => {
    console.log(message);

    setLogs((previousLogs) => [
      ...previousLogs,
      message,
    ]);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("username", "jot");

      addLog("Data saved successfully");
    } catch (error) {
      addLog(`Error saving data: ${error}`);
    }
  };

  const savaUserObj = async () => {
    try {
      const user = {
        name: "Jot",
        age: 25,
        email: "pkour@gmail.com",
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      addLog("User object saved");
    } catch (error) {
      addLog(`Error: ${error}`);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      if (value !== null) {
        addLog(`Retrieved value: ${value}`);
      } else {
        addLog("No data found for this key");
      }
    } catch (error) {
      addLog(`Error: ${error}`);
    }
  };

  const getObjDate = async () => {
    try {
      const bag = await AsyncStorage.getItem("user");

      if (bag !== null) {
        const user = JSON.parse(bag);

        addLog(`User Object: ${JSON.stringify(user)}`);
        addLog(`Name: ${user.name}`);
        addLog(`Age: ${user.age}`);
        addLog(`Email: ${user.email}`);
      } else {
        addLog("No data found for this key");
      }
    } catch (error) {
      addLog(`Error: ${error}`);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("username");

      addLog("Data removed successfully");
    } catch (err) {
      addLog(`Error: ${err}`);
    }
  };

  const removeMultiple = async () => {
    try {
      await AsyncStorage.multiRemove([
        "username",
        "user",
      ]);

      addLog("Multiple items removed");
    } catch (err) {
      addLog(`Error: ${err}`);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();

      addLog("All AsyncStorage items removed");

      // UI ke logs bhi clear
      setLogs([]);
    } catch (err) {
      addLog(`Error: ${err}`);
    }
  };

  const loginUser = async () => {
    try {
      addLog("Login API calling...");

      const api = await fetch(
        "https://reqres.in/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "eve.holt@reqres.in",
            password: "cityslicka",
          }),
        }
      );

      const data = await api.json();

      addLog(`Login API Response: ${JSON.stringify(data)}`);

      if (data.token) {
        await AsyncStorage.setItem(
          "token",
          data.token
        );

        setIsLggedIn(true);

        addLog("Token saved successfully");
      } else {
        addLog("Token not received");
      }
    } catch (err) {
      addLog(`Login Error: ${err}`);
    }
  };

  const fetcProtectdData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        addLog("No token found");
        return;
      }

      addLog("Token found");
      addLog(`Token: ${token}`);

      const res = await fetch(
        "https://httpbin.org/bearer",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      addLog(
        `Protected API Response: ${JSON.stringify(data)}`
      );
    } catch (err) {
      addLog(`Protected API Error: ${err}`);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setIsLggedIn(true);
        addLog("User is already logged in");
        addLog(`Stored Token: ${token}`);
      } else {
        setIsLggedIn(false);
        addLog("No token found - Please Login");
      }
    } catch (err) {
      addLog(`Error checking login status: ${err}`);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading.........</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          <Text style={styles.title}>
            AsyncStorage Learning
          </Text>

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

          {/* LOGS UI */}
          <Text style={styles.logTitle}>
            Output / Logs
          </Text>

          <ScrollView style={styles.logBox}>
            {logs.length === 0 ? (
              <Text style={styles.logText}>
                No logs yet...
              </Text>
            ) : (
              logs.map((log, index) => (
                <Text
                  key={index}
                  style={styles.logText}
                >
                  {index + 1}. {log}
                </Text>
              ))
            )}
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
