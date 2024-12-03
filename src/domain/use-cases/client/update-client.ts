import { UpdateClientDTO } from "../../interfaces/dtos/client/update-client-dto.js"
import { UpdateClient } from "../../interfaces/use-cases/client/update-client.js"
import { clientRepository } from "../../repositories/client-repository.js"
import { updateClientParser } from "../../parsers/client/update-client-parser.js"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import Client from "../../models/client.js"

export const updateClient = new class implements UpdateClient {
    async exec(id: string, data: UpdateClientDTO): Promise<Client> {
        uuidParser.parse(id)
        const client = await clientRepository.findOne({ where: { id } })
        if (!client || client.excludedAt) {
            throw new ResourceNotFoundError("client")
        }
        const update = updateClientParser.parse(data)
        const updatedClient = {...client, ...update}
        return await clientRepository.save(updatedClient);
    }
}
