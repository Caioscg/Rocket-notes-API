const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const AuthConfig = require("../configs/auth")

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization // local do token do user

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401)
    }

    const [, token] = authHeader.split(" ")  // token em no formato ' BARE xxxxxx ' -> estou esparando a string em um vetor no " ", e desconsiderando o BARE (n importa) 

    try {
        const { sub: user_id } = verify(token, AuthConfig.jwt.secret)

        req.user = {
            id: Number(user_id)
        }

        return next()
    } catch {
        throw new AppError("JWT Token inválido", 401)
    }
}