const { Router } = require("express")

const userRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)

module.exports = routes //* exportando para os outros arquivos