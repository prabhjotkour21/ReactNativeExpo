import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} from "../db/expenseQueries"

import { useEffect, useState } from "react"

type Expense = {
  id: number
  title: string
  category: string
  amount: number
  created_at: string
}

export default function App() {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const [expenses, setExpenses] = useState<Expense[]>([])

  const [selectedExpenses, setSelectedExpenses] =
    useState<Expense | null>(null)

  useEffect(() => {
    const data = getExpense()
    setExpenses(data)
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Heading */}
        <Text style={styles.heading}>Add Expense</Text>

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />

        {/* Amount */}
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#9CA3AF"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Category */}
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          placeholderTextColor="#9CA3AF"
          value={category}
          onChangeText={setCategory}
        />

        {/* Add Button */}
        <View style={styles.addButton}>
          <Button
            title="Add Expenses"
            onPress={() => {
              addExpense(title, Number(amount), category)
              const data = getExpense()
              setExpenses(data)

              setTitle("")
              setAmount("")
              setCategory("")
            }
            }
          />
        </View>

        {/* Update Button */}
        {selectedExpenses && (
          <View style={styles.updateButton}>
            <Button
              title="Update Expense"
              onPress={() => {
                updateExpense(
                  selectedExpenses.id,
                  title,
                  category,
                  Number(amount)
                )

                const data = getExpense()
                setExpenses(data)

                setSelectedExpenses(null)
                setTitle("")
                setAmount("")
                setCategory("")
              }}
            />
          </View>
        )}

        {/* Expense List */}
        <Text style={styles.listHeading}>Expenses</Text>

        {expenses.map((i) => (
          <View key={i.id} style={styles.expenseCard}>

            <Text style={styles.title}>
              {i.title}
            </Text>

            <Text style={styles.amount}>
              ₹{i.amount}
            </Text>

            <Text style={styles.category}>
              Category: {i.category}
            </Text>

            <Text style={styles.date}>
              {i.created_at}
            </Text>

            {/* Buttons */}
            <View style={styles.actionButtons}>

              <View style={styles.button}>
                <Button
                  title="Edit"
                  onPress={() => {
                    setSelectedExpenses(i)
                    setTitle(i.title)
                    setAmount(String(i.amount))
                    setCategory(i.category)
                  }}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="Delete"
                  onPress={() => {
                    deleteExpense(i.id)

                    const data = getExpense()
                    setExpenses(data)
                  }}
                />
              </View>

            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#1F2937",
  },

  addButton: {
    marginTop: 4,
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
  },

  updateButton: {
    marginBottom: 28,
    borderRadius: 12,
    overflow: "hidden",
  },

  listHeading: {
    fontSize: 23,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },

  expenseCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  amount: {
    fontSize: 23,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 8,
  },

  category: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 6,
  },

  date: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 15,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },

  button: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
})

