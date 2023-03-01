/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

const { hash } = require("bcryptjs") // criptografia da senha

const AppError = require("../utils/AppError")

const sqliteConection = require("../database/sqlite")

class UsersControllers {
    async create(req, res) {
        const { name, email, password } = req.body

        const database = await sqliteConection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8) //! 8 é o valor de complexidade da criptografia

        await database.run("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [ name, email, hashedPassword ])

        return res.status(201).json()

        /*if (!name) {
            throw new AppError("Nome é obrigatório!") 
        }

        res.status(201).json({ name, email, password })*/
        
    }
}

module.exports = UsersControllers