import { CreateUserDTO } from "../../../domain/interfaces/dtos/user/create-user-dto.js";
import { createUser } from "../../../domain/use-cases/user/create-user.js";
import { deleteUser } from "../../../domain/use-cases/user/delete.user.js";
import { v4 as uuidv4 } from "uuid";

describe("Delete user", () => {

    let idToDelete;

    beforeAll(async () => {
        const createUserData: CreateUserDTO = {
            name: "Ryan",
            email: Date.now() + "@gmail.com",
            password: Date.now() + "123"
        }

        const user = await createUser.exec(createUserData);
        idToDelete = user.id;
      });

    test("Should delete a user successfully", async () => {
        const deletedUser = await deleteUser.exec(idToDelete);

        expect(deletedUser.excludedAt).not.toBeNull();
    });

    test("Should not delete a user with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteUser.exec(randomUUID)).rejects.toThrow(
            "user not found."
        );
    });

});