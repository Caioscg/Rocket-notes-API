const { Router } = require("express")

const notesRoutes = Router()

const NotesControllers = require("../controllers/NotesController")

const NotesController = new NotesControllers()


notesRoutes.post("/:user_id", NotesController.create)

module.exports = notesRoutes