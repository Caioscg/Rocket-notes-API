const { Router } = require("express")

const notesRoutes = Router()

const NotesControllers = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const NotesController = new NotesControllers()

notesRoutes.use(ensureAuthenticated)

notesRoutes.post("/", NotesController.create)
notesRoutes.get("/:id", NotesController.show)
notesRoutes.delete("/:id", NotesController.delete)
notesRoutes.get("/", NotesController.index)

module.exports = notesRoutes