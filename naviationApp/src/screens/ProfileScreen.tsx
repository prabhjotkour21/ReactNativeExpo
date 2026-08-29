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
export default  function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={ styles.title}>Profile Screen</Text>
            <Text>This is Profile Screen </Text>
        </View>
    )
}