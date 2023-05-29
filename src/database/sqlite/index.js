const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")

//* npm install sqlite3 sqlite --save

async function sqliteConection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),  // para salvar o banco de dados em todos os sistemas operacionais que rodar o código
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConection