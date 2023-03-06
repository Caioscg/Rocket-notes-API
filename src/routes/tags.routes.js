const { Router } = require("express")

const tagsRoutes = Router()

const TagsControllers = require("../controllers/TagsController")

const TagsController = new TagsControllers()

tagsRoutes.get("/:user_id", TagsController.index)

module.exports = tagsRoutes