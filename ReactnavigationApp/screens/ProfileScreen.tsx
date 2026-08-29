import { View, Text, StyleSheet ,Pressable } from "react-native"

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
export default  function ProfileScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text style={ styles.title}>Profile Screen</Text>
            <Text>This is Profile Screen </Text>
            <Pressable
                style={styles.btn}
                onPress={()=>navigation.navigate("Setting")}
            ><Text style={styles.btnText}>Go to Setting</Text></Pressable>
            <Pressable
                style={styles.btn}
                onPress={()=>navigation.push("Profile")}
            ><Text style={styles.btnText}>Push Profile Again</Text></Pressable>
            <Pressable
                style={styles.btn}
                onPress={()=>navigation.goBack()}
            ><Text style={styles.btnText}>Go Back to Home</Text></Pressable>

        </View>
    )
}