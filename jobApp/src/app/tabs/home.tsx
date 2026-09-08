import { View, Text, StyleSheet, Button } from "react-native";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",

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
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
  },

  buttonContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Welcome to Job Application 👋
        </Text>

        <Text style={styles.subtitle}>
          Find your next opportunity
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Browse Jobs"
            onPress={() => {
              router.push("/tabs/jobs");
            }}
          />
        </View>
      </View>
    </View>
  );
}