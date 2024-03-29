const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersControllers = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersControllers()
const userAvatarController = new UserAvatarController()


userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)  // patch p/ atualizar 1 campo em específico

module.exports = userRoutes //* exportando para os outros arquivos