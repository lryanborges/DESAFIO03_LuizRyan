import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { DeleteUser } from "../../interfaces/use-cases/user/delete.user.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { userRepository } from "../../repositories/user-repository.js"

export const deleteUser = new class implements DeleteUser {
    async exec(id: string): Promise<void> {
        uuidParser.parse(id)
        const user = await userRepository.findOne({ where: { id } })
        if (!user) throw new ResourceNotFoundError("User not found")
        user.excludedAt = new Date()
        userRepository.save(user)
    }
}
