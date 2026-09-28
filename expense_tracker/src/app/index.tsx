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
  searchExpenseBy,
  getCategories,
  getExpenseByCategory,
  getTotalExpense,
} from "../db/expenseQueries"

import { useEffect, useState } from "react"
import { Picker } from "@react-native-picker/picker"

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
  const [filterExpenses, setFilterExpenses] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState<{ category: string }[]>([])
  const [totalExpense, setTotalExpense] = useState(0)

  const [selectedExpenses, setSelectedExpenses] =
    useState<Expense | null>(null)

  useEffect(() => {
    const data = getExpense()
    setExpenses(data)

    const categoryData = getCategories()
    setCategories(categoryData)

    const totalData = getTotalExpense()
    setTotalExpense(totalData[0].total)
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <Text style={styles.heading}>Expense Tracker</Text>
        <Text style={styles.subHeading}>
          Manage your daily expenses
        </Text>

        {/* Total Expense */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>
            Total Expense
          </Text>

          <Text style={styles.totalAmount}>
            ₹{totalExpense}
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            {selectedExpenses ? "Edit Expense" : "Add Expense"}
          </Text>

          {/* Title */}
          <Text style={styles.inputLabel}>
            Title
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter title"
            placeholderTextColor="#6B7280"
            value={title}
            onChangeText={setTitle}
          />

          {/* Amount */}
          <Text style={styles.inputLabel}>
            Amount
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#6B7280"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          {/* Category */}
          <Text style={styles.inputLabel}>
            Category
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter category"
            placeholderTextColor="#6B7280"
            value={category}
            onChangeText={setCategory}
          />

          {/* Add Button */}
          {!selectedExpenses && (
            <View style={styles.primaryButton}>
              <Button
                title="Add Expense"
                color="#6366F1"
                onPress={() => {
                  addExpense(
                    title,
                    Number(amount),
                    category
                  )

                  const data = getExpense()
                  setExpenses(data)

                  const totalData = getTotalExpense()
                  setTotalExpense(totalData[0].total)

                  setTitle("")
                  setAmount("")
                  setCategory("")
                }}
              />
            </View>
          )}

          {/* Update Button */}
          {selectedExpenses && (
            <View style={styles.primaryButton}>
              <Button
                title="Update Expense"
                color="#6366F1"
                onPress={() => {
                  updateExpense(
                    selectedExpenses.id,
                    title,
                    Number(amount),
                    category
                  )

                  const data = getExpense()
                  setExpenses(data)

                  const totalData = getTotalExpense()
                  setTotalExpense(totalData[0].total)

                  setSelectedExpenses(null)
                  setTitle("")
                  setAmount("")
                  setCategory("")
                }}
              />
            </View>
          )}

        </View>

        {/* Search */}
        <Text style={styles.sectionTitle}>
          Search & Filter
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          placeholderTextColor="#6B7280"
          value={filterExpenses}
          onChangeText={(text) => {
            setFilterExpenses(text)

            if (text === "") {
              const data = getExpense()
              setExpenses(data)

              const totalData = getTotalExpense()
              setTotalExpense(totalData[0].total)
            } else {
              const data = searchExpenseBy(text)
              setExpenses(data)

              const total = data.reduce(
                (sum, item) => sum + item.amount,
                0
              )

              setTotalExpense(total)
            }
          }}
        />

        {/* Category Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            dropdownIconColor="#9CA3AF"
            style={styles.picker}
            onValueChange={(value) => {
              setSelectedCategory(value)

              if (value === "") {
                const data = getExpense()
                setExpenses(data)

                const totalData = getTotalExpense()
                setTotalExpense(totalData[0].total)
              } else {
                const data = getExpenseByCategory(value)
                setExpenses(data)

                const total = data.reduce(
                  (sum, item) => sum + item.amount,
                  0
                )

                setTotalExpense(total)
              }
            }}
          >
            <Picker.Item
              label="All Categories"
              value=""
              color="#9CA3AF"
            />

            {categories.map((item) => (
              <Picker.Item
                key={item.category}
                label={item.category}
                value={item.category}
                color="#E5E7EB"
              />
            ))}
          </Picker>
        </View>

        {/* Expense List */}
        <Text style={styles.listHeading}>
          Expenses
        </Text>

        {expenses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              No expenses found
            </Text>
          </View>
        ) : (
          expenses.map((i) => (
            <View
              key={i.id}
              style={styles.expenseCard}
            >

              {/* Title + Amount */}
              <View style={styles.cardTopRow}>
                <Text style={styles.title}>
                  {i.title}
                </Text>

                <Text style={styles.amount}>
                  ₹{i.amount}
                </Text>
              </View>

              {/* Category */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {i.category}
                </Text>
              </View>

              {/* Date */}
              <Text style={styles.date}>
                {i.created_at}
              </Text>

              {/* Buttons */}
              <View style={styles.actionButtons}>

                <View style={styles.editButton}>
                  <Button
                    title="Edit"
                    color="#3B82F6"
                    onPress={() => {
                      setSelectedExpenses(i)
                      setTitle(i.title)
                      setAmount(String(i.amount))
                      setCategory(i.category)
                    }}
                  />
                </View>

                <View style={styles.deleteButton}>
                  <Button
                    title="Delete"
                    color="#EF4444"
                    onPress={() => {
                      deleteExpense(i.id)

                      const data = getExpense()
                      setExpenses(data)

                      const totalData = getTotalExpense()
                      setTotalExpense(
                        totalData[0].total
                      )
                    }}
                  />
                </View>

              </View>

            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  /* Main Screen */

  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  container: {
    padding: 20,
    paddingBottom: 50,
  },

  /* Header */

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F8FAFC",
    marginTop: 10,
  },

  subHeading: {
    fontSize: 15,
    color: "#94A3B8",
    marginTop: 5,
    marginBottom: 22,
  },

  /* Total Card */

  totalCard: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 22,
    marginBottom: 22,

    borderWidth: 1,
    borderColor: "#334155",
  },

  totalLabel: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 8,
  },

  totalAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#A78BFA",
  },

  /* Form */

  formCard: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,

    borderWidth: 1,
    borderColor: "#334155",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#CBD5E1",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,

    paddingHorizontal: 15,

    marginBottom: 15,

    backgroundColor: "#0F172A",

    fontSize: 16,
    color: "#F8FAFC",
  },

  primaryButton: {
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },

  /* Search */

  searchInput: {
    height: 52,

    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,

    paddingHorizontal: 15,

    backgroundColor: "#1E293B",

    fontSize: 16,
    color: "#F8FAFC",

    marginBottom: 12,
  },

  /* Picker */

  pickerContainer: {
    backgroundColor: "#1E293B",

    borderWidth: 1,
    borderColor: "#334155",

    borderRadius: 12,

    overflow: "hidden",
    marginBottom: 25,
  },

  picker: {
    color: "#F8FAFC",
    height: 52,
  },

  /* Expense List */

  listHeading: {
    fontSize: 23,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 15,
  },

  /* Expense Card */

  expenseCard: {
    backgroundColor: "#1E293B",

    padding: 18,

    borderRadius: 18,

    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#334155",
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  title: {
    flex: 1,

    fontSize: 18,
    fontWeight: "700",

    color: "#F8FAFC",

    marginRight: 10,
  },

  amount: {
    fontSize: 20,
    fontWeight: "800",

    color: "#4ADE80",
  },

  /* Category */

  categoryBadge: {
    alignSelf: "flex-start",

    backgroundColor: "#312E81",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 20,

    marginBottom: 10,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "600",

    color: "#C4B5FD",
  },

  /* Date */

  date: {
    fontSize: 13,
    color: "#64748B",

    marginBottom: 15,
  },

  /* Buttons */

  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },

  editButton: {
    flex: 1,

    borderRadius: 9,
    overflow: "hidden",
  },

  deleteButton: {
    flex: 1,

    borderRadius: 9,
    overflow: "hidden",
  },

  /* Empty */

  emptyCard: {
    backgroundColor: "#1E293B",

    borderRadius: 16,

    padding: 30,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#334155",
  },

  emptyText: {
    color: "#64748B",
    fontSize: 15,
  },
})