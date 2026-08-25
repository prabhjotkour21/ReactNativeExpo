import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    height: 700,
    borderColor: "red",
    borderWidth: 4,
    margin: 20,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  skills: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 5,
  },
  skillsChild1: {
    color: "green",
  },
  skillsChild2: {
    color: "red",
  },
  skillsChild3: {
    color: "blue",
  },
  pressableBtn: {
    backgroundColor: "blue",
    padding: 3,
    width: 90,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
  },
  pressableBtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "gray",
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
  },
  btnText: {
    color: "yellow",
  },
  nameText: {
    fontWeight: "bold",
  },
  nameInpur: {
    fontWeight: "bold",
    borderWidth: 2,
    padding: 4,
  },
  inputContainer: {},
});
const handleClick = () => {
  console.log("button cliecked");
};
let count = 0;
const handlePressable = () => {
  count += 1;

  console.log("Pressable Button Clicked :", count);
};
const handlePress = () => {
  console.log("Profile Liked");
};
let str=""
export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1787303328188-87352d89bfa8?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{ width: "50%", height: "25%" }}
          />
          <Text>Prabhjot Kour</Text>
          <Text>Full Stack Dev</Text>
          <View style={styles.skills}>
            <Text style={styles.skillsChild1}>React</Text>
            <Text style={styles.skillsChild2}>Node</Text>
            <Text style={styles.skillsChild3}>Mongo</Text>
          </View>
          <Text>I am learing React Native 🚀 </Text>
          <Button title="Follow Me" onPress={handleClick} />
          <Pressable onPress={handlePressable} style={styles.pressableBtn}>
            <Text style={styles.pressableBtnText}>Click me</Text>
          </Pressable>

          <TouchableOpacity onPress={handlePress} style={styles.btn}>
            <Text style={styles.btnText}>Like ❤️</Text>
          </TouchableOpacity>
          <KeyboardAvoidingView behavior={ Platform.OS==="ios" ?"padding":"height"}>
          <View>
            <Text>Contact Me</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.nameText}>Name</Text>
              <TextInput
                style={styles.nameInpur}
                placeholder="Enter your name"
                onChangeText={(text) => {
                  str=text
                  console.log(text);
                  console.log("str",str);
                }}
              />

            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.nameText}>Email</Text>
              <TextInput
                style={styles.nameInpur}
                placeholder="Enter your email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.nameText}>Message</Text>
              <TextInput
                style={styles.nameInpur}
                placeholder="Enter your message"
              />
            </View>
            <TouchableOpacity>
              <Text>Send Message</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
