import { generate as generateCPF } from "cpf";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { deleteClient } from "../../../domain/use-cases/client/delete-client.js";
import { v4 as uuidv4 } from "uuid";

describe("Delete client", () => {

    let idToDelete;

    const datetimeNow = Date.now();
    const randomCpf = generateCPF().replace(/\D/g, "");
    beforeAll(async () => {
        const createClientData: CreateClientDTO = {
            name: "Ryan",
            birthDate: "2002-07-24",
            cpf: randomCpf,
            email: datetimeNow+ "@gmail.com",
            phone: "+5511976543210"
        }

        const user = await createClient.exec(createClientData);
        idToDelete = user.id;
    });

    test("Should delete a client successfully", async () => {
        const client = await deleteClient.exec(idToDelete);

        expect(client).toHaveProperty("id");
        expect(client.excludedAt).not.toBeNull();
    });

    test("Should not a client with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteClient.exec(randomUUID)).rejects.toThrow(
            "client not found."
        );

    });
});