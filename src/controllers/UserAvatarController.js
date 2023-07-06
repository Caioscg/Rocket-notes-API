const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {  // usa as funções do DiskStorage para salvar a nova foto e deletar a antiga
    async update(req, res) {
        const user_id = req.user.id
        const avatarFilename = req.file.filename
        
        const diskStorage = new DiskStorage()

        const user = await knex("users").where({ id: user_id }).first()

        if(!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = filename

        await knex("users").update(user).where({ id: user_id })

        return res.json(user)
    }
}

module.exports = UserAvatarController