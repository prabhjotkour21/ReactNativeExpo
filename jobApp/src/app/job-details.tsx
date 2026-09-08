import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: "#333",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },

  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default function JobDetail() {
  const [jobDetail, setJobDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobData = useLocalSearchParams();

  useEffect(() => {
    const handleDetail = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${jobData.jobId}`
        );

        const data = await response.json();

        setJobDetails(data);
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleDetail();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loading}>Loading...</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <>
          <Text style={styles.heading}>Job Details</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Job ID</Text>
            <Text style={styles.value}>{jobData.jobId}</Text>

            <Text style={styles.label}>Title</Text>
            <Text style={styles.title}>{jobDetail.title}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>
              {jobDetail.body}
            </Text>

            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{jobDetail.userId}</Text>
          </View>
        </>
      )}
    </View>
  );
}