import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { generate as generateCPF } from "cpf";

describe("Create client", () => {
    const datetimeNow = Date.now();
    const randomCpf = generateCPF().replace(/\D/g, "");

    test("Should create a client successfully", async () => {

        const createClientData: CreateClientDTO = {
            name: "Ryan",
            birthDate: "2002-07-24",
            cpf: randomCpf,
            email: datetimeNow+ "@gmail.com",
            phone: "+5511976543210"
        }

        const client = await createClient.exec(createClientData);

        expect(client).toHaveProperty("id");
        expect(client.name).toBe("Ryan");
        expect(client.birthDate).toBe("2002-07-24");
        expect(client.cpf).toBe(randomCpf);
        expect(client.email).toBe(datetimeNow + "@gmail.com");
        expect(client.phone).toBe("+5511976543210");
    });

    test("Should not allow to create a client with the same email or cpf", async () => {
        const createClientData: CreateClientDTO = {
            name: "Luiz",
            birthDate: "2005-01-26",
            cpf: randomCpf,
            email: datetimeNow + "@gmail.com",
            phone: "+5511976543210"
        }

        await expect(createClient.exec(createClientData)).rejects.toThrow(
            "there is already a client with this data"
        );

    });
});