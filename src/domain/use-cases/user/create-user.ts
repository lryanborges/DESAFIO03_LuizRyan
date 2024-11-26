import { ResourceAlredyExistsError } from "../../../framework/express/exceptions/resource-alredy-exists-error.js"
import { CreateUserDTO } from "../../interfaces/dtos/user/create-user-dto.js"
import { CreateUser } from "../../interfaces/use-cases/user/create-user.js"
import { createUserParser } from "../../parsers/user/create-user-parser.js"
import { userRepository } from "../../repositories/user-repository.js"
import * as argon from "argon2"
export const createUser = new (class implements CreateUser {
    public async exec(data: CreateUserDTO): Promise<void> {
        const user = createUserParser.parse(data)
        const userExist = await userRepository.findOne({
            where: { email: user.email }
        })

        if (userExist) {
            throw new ResourceAlredyExistsError("user")
        }

        const hashedPassword = await argon.hash(user.password)
        const newUser = userRepository.create({ ...user, password: hashedPassword })
        await userRepository.save(newUser)
    }
})
