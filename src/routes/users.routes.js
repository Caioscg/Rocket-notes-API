const { Router } = require("express")

const userRoutes = Router()

userRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body

    res.send(`Usuário: ${name}. E-mail: ${email}. Senha: ${password}`)
})

module.exports = userRoutes //* exportando para os outros arquivos