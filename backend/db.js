// initialize SQLite
const sqlite3 = require('sqlite3').verbose()

//create and connect with a SQLite named database.db
//if it doesnt exist, create one
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL
        )
    `);
});

//export
module.exports = db