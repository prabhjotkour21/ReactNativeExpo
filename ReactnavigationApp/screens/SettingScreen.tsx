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
export default  function SettingScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text style={ styles.title}>Setting Screen</Text>
            <Text>This is Setting Screen </Text>
            <Pressable
                            style={styles.btn}
                            onPress={()=>navigation.goBack()}
                        ><Text style={styles.btnText}>Go Back to Profile</Text></Pressable>
        </View>
    )
}