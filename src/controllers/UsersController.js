/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

const { hash, compare } = require("bcryptjs") // criptografia da senha
const AppError = require("../utils/AppError")
const sqliteConection = require("../database/sqlite")

const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersControllers {
    async create(req, res) {
        const { name, email, password } = req.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)  // passa pro construtor

        await userCreateService.execute({ name, email, password })

        return res.status(201).json()
    }

    async update(req, res) {
        const { name, email, password, old_password } = req.body
        const user_id = req.user.id

        const database = await sqliteConection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if (!user) {
            throw new AppError("Usuário não encontrado!")
        }
    
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {  // passou um email de outro id
            throw new AppError("Este e-mail já está em uso!")
        }

        user.name = name ?? user.name   //! se passar um nome muda o nome, senao fica com o antigo
        user.email = email ?? user.email

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha!")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere!")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        )

        return res.status(200).json()

    }
}

module.exports = UsersControllers