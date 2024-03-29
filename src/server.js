require("dotenv/config")  // npm install dotenv --save
require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes") // carrega o index
const uploadConfig = require("./configs/upload")

const cors = require("cors") // npm install cors

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
    if (error instanceof AppError) {  //! client error
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server error!"
    })
})

const PORT = process.env.PORT || 3333   // || para caso quem estiver testando a aplicação nao tiver setado as variaveis no .env
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))