import { findManyClient } from "../../../domain/use-cases/client/find-many-client.js";

describe("Find many client", () => {

    test("Should list all clients with default pagination", async () => {
        const listClients = await findManyClient.exec({});

        const totalPages = Math.ceil(listClients.total / 10);

        expect(listClients.data.length).toBeGreaterThan(0);
        expect(listClients.currentPage).toBe(1)
        expect(listClients.pages).toBe(totalPages)
        expect(listClients.data.at(0)).toHaveProperty("cpf");
    });

    test("Should list all clients with 'ya' in their name and 'gmail' in their email", async () => {
        const listClients = await findManyClient.exec( { name : "ya", email: "gmail" } );

        for(let i = 0; i < listClients.data.length; i++){
            const client = listClients.data.at(i);
            expect(client.name.toLowerCase()).toContain("ya");
            expect(client.email.toLowerCase()).toContain("gmail");
        }
    });

});