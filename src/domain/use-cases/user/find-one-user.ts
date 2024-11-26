import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { UserDTO } from "../../interfaces/dtos/user/user-dto.js"
import { FindOneUser } from "../../interfaces/use-cases/user/find-one-user.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { userRepository } from "../../repositories/user-repository.js"

export const findOneUser = new class implements FindOneUser {
    async exec(id: string): Promise<UserDTO> {
        uuidParser.parse(id)
        const user = await userRepository.findOne({ where: { id } })
        if (!user || user.excludedAt) throw new ResourceNotFoundError("user")
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            excludedAt: user.excludedAt
        }
    }
}
