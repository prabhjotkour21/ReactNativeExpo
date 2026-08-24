import { View, Text ,Image,ScrollView,StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
 const styles = StyleSheet.create({
    container: {
      width: "80%",
      // height: 600,
    //   margin: 35,
    //  padding: 30,
     backgroundColor: "lightgray",

      
    },
    image: {
       width: "50%",
      height: 150,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "yellow",
    },
    text: {
      fontSize: 20,
      color: "blue",
      fontWeight:"bold"

    },
   skillHeading: {
     fontSize: 20,
fontWeight: 'bold',
color: 'green',
   },
   skillsContainer :{
     flexDirection:"column",
     justifyContent: "space-evenly",
     alignItems: "stretch",
     borderWidth: 3,
     width: 150,
     height:100,
    //  gap:20
     
   },
   name: {
     fontSize: 24,
     fontWeight: "bold",
     color:"blue"
   },
   role: {
     fontSize: 18,
     color:"gray"
   },
   bio: {
     fontSize: 16,
     fontStyle: 'italic'
   },


  })
export default function HomeScreen() {

 
  return (
    <SafeAreaView >
    
        <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://plus.unsplash.com/premium_photo-1787303328188-87352d89bfa8?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
          style={styles.image}
          />
          
      <Text style={styles.name}>Name : Prabhjot Kour</Text>
          <Text style={ styles.role}>Role : Full Stack Developer</Text>
      <Text style={styles.bio}>Bio : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat velit quasi aut your thank you
          </Text>
          <View style={styles.skillsContainer}>
        
          
          <Text style={styles.skillHeading}> Skills :</Text>
          <Text>React.js</Text>
          <Text>Node.js</Text>
          <Text>JavaScript</Text>
          
              
            </View>
        <Text>About me : Hey my name is Prabhjot kour . I am from Delhi </Text>
        <Text>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, deserunt! Vero, numquam! Officiis ex earum placeat voluptatibus explicabo velit sint quia eius est, numquam porro saepe ipsa veniam quo cum.</Text>
        
          </View>
          </ScrollView>
     
    </SafeAreaView>
  )
}