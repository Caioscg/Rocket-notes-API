const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
    let userRepository
    let userCreateService

    beforeEach(() => {   // linha em comum nos 2 casos
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
    })


    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        }
    
        const userCreated = await userCreateService.execute(user)
    
        console.log(userCreated)
    
        expect(userCreated).toHaveProperty("id")
    })

    it("user shouldn't be create if that email is being used", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "456"
        }
        
        await userCreateService.execute(user1)

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso!"))
    })
})