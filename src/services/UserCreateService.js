const { hash } = require("bcryptjs") // criptografia da senha
const AppError = require("../utils/AppError")

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository  // pega o userRepository pra poder usar na classe toda
    }

    async execute ({ name, email, password }) {   

        const checkUserExists = await this.userRepository.findByEmail(email)

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8) //! 8 é o valor de complexidade da criptografia

        const createdUser = await this.userRepository.create({ name, email, password: hashedPassword })

        return createdUser
    }
}

module.exports = UserCreateService