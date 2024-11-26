import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { ClientDTO } from "../../interfaces/dtos/client/client-dto.js"
import { FindOneClient } from "../../interfaces/use-cases/client/find-one-client.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { clientRepository } from "../../repositories/client-repository.js"

export const findOneClient = new class implements FindOneClient {
    async exec(id: string): Promise<ClientDTO> {
        uuidParser.parse(id)
        const client = await clientRepository.findOne({ where: { id } })
        if(!client || client.excludedAt) {
            throw new ResourceNotFoundError("client")
        }
        return {
            id: client.id,
            name: client.name,
            birthDate: client.birthDate,
            cpf: client.cpf,
            email: client.email,
            phone: client.phone,
            createdAt: client.createdAt,
            excludedAt: client.excludedAt ? client.excludedAt : null
        }
    }
}
