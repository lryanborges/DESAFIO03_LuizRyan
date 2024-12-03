import { findManyClient } from "../../../domain/use-cases/client/find-many-client.js";
import { findOneClient } from "../../../domain/use-cases/client/find-one-client.js";
import { v4 as uuidv4 } from "uuid";

describe("Find one client", () => {

    test("Should find one specific clin by id", async () => {
        const clientToFind = await findManyClient.exec({ name: "Carlos Pereira" });

        const clientId = clientToFind.data.at(0).id;

        const client = await findOneClient.exec(clientId);

        expect(client).toHaveProperty("id");
        expect(client.name).toBe("Carlos Pereira");
        expect(client).toHaveProperty("birthDate");
        expect(client).toHaveProperty("cpf");
        expect(client).toHaveProperty("email");
        expect(client).toHaveProperty("phone");
        expect(client).toHaveProperty("createdAt");
    });

    test("Should not allow to find a client with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(findOneClient.exec(randomUUID)).rejects.toThrow(
            "client not found."
        );
    });

});