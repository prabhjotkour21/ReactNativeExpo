import { View, Text, StyleSheet } from "react-native"

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
  return (
    <View style={styles.container}> 
      <Text style={styles.containerText}>Job Application</Text>
    </View>
  )
}