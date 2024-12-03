import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js";

describe("Find many user", () => {
    test("Should list all users with default pagination", async () => {
        const listUsers = await findManyUser.exec({});

        const totalPages = Math.ceil(listUsers.total / 10);

        expect(listUsers.data.length).toBeGreaterThan(0);
        expect(listUsers.currentPage).toBe(1)
        expect(listUsers.pages).toBe(totalPages)
        expect(listUsers.data.at(0)).toHaveProperty("email");
    });

    test("Should list all users with 'ya' in they name and 'gmail' in they email", async () => {
        const listUsers = await findManyUser.exec( { name: "ya", email: "gmail"} );

        for(let i = 0; i < listUsers.data.length; i++){
            const user = listUsers.data.at(i);
            expect(user.name.toLowerCase()).toContain("ya");
            expect(user.email.toLowerCase()).toContain("gmail");
        }
    });

});