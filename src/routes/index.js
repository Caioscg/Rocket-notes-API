const { Router } = require("express")

const userRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes //* exportando para os outros arquivos