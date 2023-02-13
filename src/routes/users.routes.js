const { Router } = require("express")

const userRoutes = Router()

const UsersControllers = require("../controllers/UsersController")

const usersController = new UsersControllers()


userRoutes.post("/", usersController.create)

module.exports = userRoutes //* exportando para os outros arquivos