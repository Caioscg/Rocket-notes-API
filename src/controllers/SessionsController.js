const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        const user = await knex("users").where({ email }).first()

        if(!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {  // objeto vazio são configurações adicionais
            subject: String(user.id),   // id do usuário usado pra criar o token
            expiresIn
        })

        return res.json({ user, token })
    }
}

module.exports = SessionsController;