import { deleteUser } from "../../../domain/use-cases/user/delete.user.js";
import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js";
import { v4 as uuidv4 } from "uuid";

describe("Delete user", () => {
    test("Should delete a user successfully", async () => {
        const userToDelete = await findManyUser.exec({ excluded: false });

        expect(userToDelete).not.toBeNull();

        const deletedUser = await deleteUser.exec(userToDelete.data.at(0).id);

        expect(deletedUser.excludedAt).not.toBeNull();
    });

    test("Should not delete a user with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteUser.exec(randomUUID)).rejects.toThrow(
            "user not found."
        );
    });

});