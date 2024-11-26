import { ResourceAlredyExistsError } from "../../../framework/express/exceptions/resource-alredy-exists-error.js"
import { CreateClientDTO } from "../../interfaces/dtos/client/create-client-dto.js"
import { CreateClient } from "../../interfaces/use-cases/client/create-client.js"
import { createClientParser } from "../../parsers/client/create-client-parser.js"
import { clientRepository } from "../../repositories/client-repository.js"


export const createClient = new class implements CreateClient {
    async exec(data: CreateClientDTO): Promise<void> {
        const client = createClientParser.parse(data)

        const clientExists = await clientRepository.findOne({
            where: [
                { email: client.email, excludedAt: null },
                { cpf: client.cpf, excludedAt: null }
            ]
        });

        if(clientExists) {
            throw new ResourceAlredyExistsError("client")
        }

        const newClient = clientRepository.create(client)
        await clientRepository.save(newClient)
    }
}
