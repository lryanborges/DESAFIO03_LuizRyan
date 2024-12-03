import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js";
import { findOneUser } from "../../../domain/use-cases/user/find-one-user.js";
import { v4 as uuidv4 } from "uuid";

describe("Find one user", () => {

    test("Should find one specific user by id", async () => {
        const userToFind = await findManyUser.exec({ name: "Administrador" });

        const userId = userToFind.data.at(0).id;

        const user = await findOneUser.exec(userId);

        expect(user.id).toBe(userId);
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("createdAt");
    });

    test("Should not allow to find a user with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(findOneUser.exec(randomUUID)).rejects.toThrow(
            "user not found."
        );
    });

});