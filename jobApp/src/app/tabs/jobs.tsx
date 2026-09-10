import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList ,Pressable} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
  },

  containerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  jobItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleApi = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (!response.ok) {
          
          throw new Error("Something went wrong");
        }
        const data = await response.json();

        

        setJobs(data);
        
        
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Jobs Page</Text>

      {loading && <Text>Loading...</Text>}

      {error && <Text>{error}</Text>}

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Pressable  style={styles.jobItem}
             onPress={
               ()=>{
                  router.push(
                    {
                      pathname: "/job-details",
                      params: {
                        jobId:item.id.toString()
                      }
                    }
                  );
               }
             }
            >
              <Text>{item.id}</Text>
               <Text style={styles.title}>{item.title}</Text>

              <Text>{item.body}</Text>
            </Pressable>
            
          );
        }}
      />
    </View>
  );
}
