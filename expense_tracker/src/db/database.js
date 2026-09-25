import { openDatabaseSync } from "expo-sqlite"

export const db = openDatabaseSync("expenses.db")

function initDB() {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS expenses(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                amount REAL NOT NULL, 
                category TEXT,
                created_at TEXT
            )
        `)
}

initDB()