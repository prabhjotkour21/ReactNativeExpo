import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const students = [
  { id: "1", name: "Aman", course: "React Native" },
  { id: "2", name: "Priya", course: "Node.js" },
  { id: "3", name: "Rahul", course: "React" },
  { id: "4", name: "Neha", course: "MongoDB" },
];

function StudentItem({ item }: { item: any }) {
  return (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentCourse}>{item.course}</Text>
    </View>
  );
}

const courses = [
  {
    title: "React Native",
    data: ["Aman", "Neha"],
  },
  {
    title: "React",
    data: ["Rahul", "Priya"],
  },
  {
    title: "Node.js",
    data: ["Vikas", "Pooja"],
  },
];

const jobs = [
  {
    id: "1",
    title: "React Native Developer",
    company: "ABC Technologies",
    location: "Delhi",
    salary: "₹5 - ₹8 LPA",
  },
  {
    id: "2",
    title: "Node.js Developer",
    company: "XYZ Solutions",
    location: "Bangalore",
    salary: "₹6 - ₹10 LPA",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Tech Corp",
    location: "Mumbai",
    salary: "₹4 - ₹7 LPA",
  },
];

function JobsItem({ item }: { item: any }) {
  return (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>

      <Text style={styles.jobCompany}>
        {item.company}
      </Text>

      <Text style={styles.jobInfo}>
        📍 {item.location}
      </Text>

      <Text style={styles.jobSalary}>
        💰 {item.salary}
      </Text>
    </View>
  );
}

export default function App() {
  const [modelVisible, setMobelVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>

        {/* Heading */}
        <Text style={styles.heading}>
          Courses & Students
        </Text>

        {/* ================= JOB LIST ================= */}

        <Text style={styles.listHeading}>
          Jobs
        </Text>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobsItem item={item} />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        {/* ================= STUDENT LIST ================= */}

        <Text style={styles.listHeading}>
          Students
        </Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentItem item={item} />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        {/* ================= SECTION LIST ================= */}

        <Text style={styles.listHeading}>
          Courses
        </Text>

        <SectionList
          sections={courses}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <Text style={styles.studentText}>
                {item}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {section.title}
              </Text>
            </View>
          )}
        />

        {/* ================= MODAL BUTTON ================= */}

        <Pressable
          style={styles.openButton}
          onPress={() => setMobelVisible(true)}
        >
          <Text style={styles.buttonText}>
            Open Modal
          </Text>
        </Pressable>

        {/* ================= MODAL ================= */}

        <Modal
          visible={modelVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalBackground}>

            <View style={styles.modalBox}>

              <Text style={styles.modalTitle}>
                Hello, I am Modal 👋
              </Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setMobelVisible(false)}
              >
                <Text style={styles.buttonText}>
                  Close
                </Text>
              </Pressable>

            </View>

          </View>
        </Modal>

        {/* ================= LOADING BUTTON ================= */}

        <Pressable
          style={styles.loadingButton}
          onPress={() => {
            setLoading(true);

            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }}
        >
          <Text style={styles.buttonText}>
            Start Loading
          </Text>
        </Pressable>

        {/* ================= ACTIVITY INDICATOR ================= */}

        {loading && (
          <ActivityIndicator
            size="large"
            style={styles.loader}
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* ================= MAIN CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  mainContainer: {
    flex: 1,
    padding: 20,
  },

  /* ================= HEADING ================= */

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#111827",
  },

  listHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
    marginBottom: 10,
  },

  /* ================= JOB CARD ================= */

  jobCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  jobCompany: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4f46e5",
    marginBottom: 6,
  },

  jobInfo: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },

  jobSalary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },

  /* ================= STUDENT CARD ================= */

  studentCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#ddd",

    elevation: 2,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  studentCourse: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  /* ================= SECTION LIST ================= */

  sectionHeader: {
    backgroundColor: "#4f46e5",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  studentItem: {
    backgroundColor: "white",
    padding: 14,
    marginTop: 5,
    borderRadius: 8,

    borderWidth: 1,
    borderColor: "#ddd",
  },

  studentText: {
    fontSize: 16,
    color: "#333",
  },

  /* ================= OPEN MODAL BUTTON ================= */

  openButton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,

    elevation: 3,
  },

  /* ================= CLOSE BUTTON ================= */

  closeButton: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },

  /* ================= BUTTON TEXT ================= */

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* ================= MODAL ================= */

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",

    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "white",
    padding: 25,

    borderRadius: 15,

    alignItems: "center",

    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },

  /* ================= LOADING ================= */

  loadingButton: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,

    elevation: 3,
  },

  loader: {
    marginTop: 15,
  },
});