import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator ,Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios"

type Post = {
  id: number;
  title: string;
  body: string;
  userId:number

}
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
    <SafeAreaView>
      <View>
        <Text>View Posts</Text>

         <Button
          title='Add Post'
          onPress={addPost}
          />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
               <View>
              <Text>{item.id}</Text>
              <Text>{ item.title}</Text>
            </View>
            )
          }}
        />

       
           {/* <Text onPress={getData} >Get Data</Text> */}
        </View>
    </SafeAreaView>
  )
}