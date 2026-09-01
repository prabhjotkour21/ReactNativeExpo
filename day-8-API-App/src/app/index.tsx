import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator ,Button, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios"

type Post = {
  id: number;
  title: string;
  body: string;
  userId:number
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16
  },
  hading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom:15
  },
  postCard: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#ddd"
  },
  postId: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom:5
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom:8
  },
  postBody: {
    fontSize: 14,
    color:"#666"
  },
  button: {
    marginBottom:15
  }

})
export default function HomeScreen() {
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] =useState('')
  const getData = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      // if (!response.ok) {
      //   throw new Error('Something went wrong')
      // }
      //  const data = await response.json()
      // setData(data)
      setData(response.data)
      
    } catch (error) {
      setError('Faild to fetch posts')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Loading....</Text>
      </SafeAreaView>
    )
  }
  if (error) {
    return (
      <SafeAreaView>
        <Text>{error }</Text>
      </SafeAreaView>
    )
  }
  const addPost = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            title: "My first Post",
            body: "Hello React Native",
            userId:1
          })
         }
      )
      const data = await response.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.hading}>View Posts</Text>
        <View style={ styles.button}>
          <Button
          title='Add Post'
          onPress={addPost}
          />
         </View>
         
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
               <View style={styles.postCard}>
                <Text style={ styles.postId}>{item.id}</Text>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody}>{ item.body}</Text>
            </View>
            )
          }}
        />

       
           {/* <Text onPress={getData} >Get Data</Text> */}
        </View>
    </SafeAreaView>
  )
}