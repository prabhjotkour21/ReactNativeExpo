import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    title: {
        fontSize: 28,
        fontWeight:"bold"
    }

})
export default  function SettingScreen() {
    return (
        <View style={styles.container}>
            <Text style={ styles.title}>Setting Screen</Text>
            <Text>This is Setting Screen </Text>
        </View>
    )
}