import { UpdateUserDTO } from "../../../domain/interfaces/dtos/user/update-user-dto.js";
import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js";
import { updateUser } from "../../../domain/use-cases/user/update-user.js";
import * as argon from "argon2";
import { v4 as uuidv4 } from "uuid";

describe("Update user", () => {

    const datetimeNow = Date.now();

    test("Should update a user successfully", async () => {

        const userId = (await findManyUser.exec( { name: "Ryan" })).data.at(0).id;

        const updateUserData: UpdateUserDTO = {
            email: datetimeNow + "@hotmail.com",
            password: "ryan12345"
        };

        const user = await updateUser.exec(userId, updateUserData);

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Ryan");
        expect(user.email).toBe(datetimeNow + "@hotmail.com");
        expect(await argon.verify(user.password, updateUserData.password)).toBe(true);

    });

    test("Should not allow update a user with wrong id", async () => {
        const randomUUID = uuidv4();

        const updateUserData: UpdateUserDTO = {
            email: datetimeNow + "@hotmail.com",
            password: "ryan12345"
        };

        await expect(updateUser.exec(randomUUID, updateUserData)).rejects.toThrow(
            "User not found."
        );
    });

    test("Should not allow update a user with an using email", async () => {

        const existingUser = (await findManyUser.exec( { name: "Ryan" })).data.at(0);

        const updateUserData: UpdateUserDTO = {
            email: datetimeNow + "@hotmail.com",
            password: "ryan12345"
        };

        await expect(updateUser.exec(existingUser.id, updateUserData)).rejects.toThrow(
            "Conflict already exists a user with this email"
        );
    });

});