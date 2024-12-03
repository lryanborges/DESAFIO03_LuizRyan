import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { DeleteClient } from "../../interfaces/use-cases/client/delete-client.js"
import Client from "../../models/client.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { clientRepository } from "../../repositories/client-repository.js"


export const deleteClient = new class implements DeleteClient {
    async exec(id: string): Promise<Client> {
        uuidParser.parse(id)
        const client = await clientRepository.findOne({ where: { id } })
        if(!client) {
            throw new ResourceNotFoundError("client")
        }

        client.excludedAt = new Date();

        return await clientRepository.save(client);

    }
}
