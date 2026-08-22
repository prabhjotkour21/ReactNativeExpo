import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {

  return (

    <SafeAreaView>
    <ScrollView>
    <View style={{
      margin:30,
      padding: 20, borderColor: "black", borderWidth: 2
    }}>
      <Text>Local Image</Text>
      <Image
        source={require("../../assets/images/profile.png")}
        style={{
          width: 150,
          height:150
        }}
      
      />
      <Text>Remote Image</Text>
      <Image
        source={{ uri: "https://plus.unsplash.com/premium_photo-1787303328188-87352d89bfa8?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", }}
        style={{
          width: 150,
          height:150

        }}
      />
      <Text style={{fontSize:24, fontWeight:"bold"}}>Name :Jot kour</Text>
      <Text style={{color:"red"}}>React Native Developer</Text>
      <Text>Learning React Native</Text>
      <Text>Text 1</Text>
      <Text>Text 2</Text>
      <Text>Text 3</Text>
      <Text>Text 4</Text>
      <Text>Text 5</Text>
      <Text>Text 6</Text>
      <Text>Text 7</Text>
      <Text>Text 8</Text>
      <Text>Text 9</Text>
      <Text>Text 15</Text>
      <Text>Text 16</Text>
      <Text>Text 17</Text>
      <Text>Text 18</Text>
      <Text>Text 19</Text>
      </View>
      <ScrollView horizontal>
      
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
          }}><Text>Text 20</Text></View>
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
          }}><Text>Text 21</Text></View>
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
          }}><Text>Text 22</Text></View>
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
          }}><Text>Text 23</Text></View>
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
          }}><Text>Text 24</Text></View>
      <View  style={{
            width: 150,
            height: 150,
            margin: 10,
            borderWidth: 2,
            borderColor: 'black',
        }}><Text>Text 25</Text></View>
        </ScrollView>
      </ScrollView>
      </SafeAreaView>
  )
}