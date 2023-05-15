const { Router } = require("express")

const tagsRoutes = Router()

const TagsControllers = require("../controllers/TagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const TagsController = new TagsControllers()

tagsRoutes.get("/", ensureAuthenticated, TagsController.index)

module.exports = tagsRoutes