const { Router } = require("express")

const UsersControllers = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userRoutes = Router()

const usersController = new UsersControllers()


userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = userRoutes //* exportando para os outros arquivos