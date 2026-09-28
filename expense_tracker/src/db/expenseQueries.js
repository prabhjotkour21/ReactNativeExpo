import { db } from "./database"
// console.log("DB:", db)
const date=new Date().toISOString()
export function addExpense(title, amount, category) {
    const result=db.runSync(
        "INSERT INTO expenses (title ,amount ,category,created_at) VALUES(? ,? , ? , ?)",
        title,
        amount,
        category,
        date
    )
    console.log(result);
    
}

export function getExpense() {
    const result = db.getAllSync(
        "SELECT * FROM expenses ORDER BY created_at DESC"
        )
    // console.log("result",result);
    
    return result
}

export function updateExpense(id, title, amount, category) {
    const result = db.runSync(
        "UPDATE expenses SET title=? ,amount =?, category=? WHERE id=?",
        title,
        amount,
        category,
        id
    )
    return result
    // console.log("changes result",result.changes);
    
}

export function deleteExpense(id) {
    const result = db.runSync(
        "DELETE FROM expenses WHERE id=?",
        id
    )
    return result
    // console.log("deleted",result.changes);
    
}

export function checkExpense() {
    const data = db.getAllSync("SELECT * FROM expenses")
    // console.log("db data  ",data);
    
}

export function getExpenseByTitleAndAmount() {
    const data = db.getAllSync("SELECT title FROM expenses WHERE title='Second '")
    // console.log("uddiedjinnnn",data);
    
}

export function searchExpenseBy(searchText) {
    const data = db.getAllSync("SELECT * FROM expenses WHERE title LIKE ?",
        "%" + searchText + "%"
    )
  
    
    return data
}

export function getCategories() {
    const data = db.getAllSync(
        "SELECT DISTINCT category FROM expenses"
    )
    // console.log("Categories",data)
    return data 
}

export function getExpenseByCategory(category) {
    const data = db.getAllSync(
        "SELECT * FROM expenses WHERE category =?",
        category
    )
    return data
}

export function getTotalExpense() {
    console.log("getTotalExpense called");
    
    const data = db.getAllSync(

        "SELECT SUM(amount) AS total FROM expenses"
    )
    console.log("Total Expenses : ", data);
    return data
    
}
// getExpenseByTitleAndAmount()
// checkExpense()
// getCategories()

getTotalExpense()