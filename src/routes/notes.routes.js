const { Router } = require("express")

const notesRoutes = Router()

const NotesControllers = require("../controllers/NotesController")

const NotesController = new NotesControllers()

notesRoutes.post("/:user_id", NotesController.create)
notesRoutes.get("/:id", NotesController.show)
notesRoutes.delete("/:id", NotesController.delete)
notesRoutes.get("/", NotesController.index)

module.exports = notesRoutes