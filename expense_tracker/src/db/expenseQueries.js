import { db } from "./database"
console.log("DB:", db)
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
    console.log("result",result);
    
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
    console.log("changes result",result.changes);
    
}

export function deleteExpense(id) {
    const result = db.runSync(
        "DELETE FROM expenses WHERE id=?",
        id
    )
    console.log("deleted",result.changes);
    
}