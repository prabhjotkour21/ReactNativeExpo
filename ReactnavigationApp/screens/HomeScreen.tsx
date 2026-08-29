import { View, Text, StyleSheet , Pressable } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    title: {
        fontSize: 28,
        fontWeight:"bold"
    },
    btn: {
        backgroundColor: "black",
        padding: 12,
        marginTop: 10,
        borderRadius:8
    },
    btnText: {
        color: "white",
        fontSize:16
    }

})
export default  function HomeScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text style={ styles.title}>Home Screen</Text>
            <Text>Welcome to Home </Text>
            <Pressable
                style={styles.btn}
                onPress={()=>navigation.navigate("Profile")}
            ><Text style={ styles.btnText}>Go to Profile</Text></Pressable>
            <Pressable
                style={styles.btn}
                onPress={()=>navigation.navigate("Setting")}
            
            ><Text
            style={ styles.btnText}
            >Go to Setting</Text></Pressable>
        </View>
    )
}