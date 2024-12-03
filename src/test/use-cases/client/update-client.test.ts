import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { generate as generateCPF } from "cpf";
import { updateClient } from "../../../domain/use-cases/client/update-client.js";
import { v4 as uuidv4 } from "uuid";

describe("Update client", () => {

    let idToUpdate;

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
        idToUpdate = user.id;
    });

    test("Should update a client successfully", async () => {
        const updateClientData = {
            birthDate: "2004-02-17",
            email: datetimeNow+ "@hotmail.com"
        }

        const client = await updateClient.exec(idToUpdate, updateClientData);

        expect(client).toHaveProperty("id");
        expect(client.birthDate).toBe("2004-02-17");
        expect(client.email).toBe(datetimeNow + "@hotmail.com");
    });

    test("Should not update a client with wrong id", async () => {
        const randomUUID = uuidv4();

        const updateClientData = {
            birthDate: "2009-09-19"
        }

        await expect(updateClient.exec(randomUUID,updateClientData)).rejects.toThrow(
            "client not found."
        );
    });
});