import { CreateUserDTO } from "../../../domain/interfaces/dtos/user/create-user-dto.js";
import { UpdateUserDTO } from "../../../domain/interfaces/dtos/user/update-user-dto.js";
import { createUser } from "../../../domain/use-cases/user/create-user.js";
import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js";
import { updateUser } from "../../../domain/use-cases/user/update-user.js";
import * as argon from "argon2";
import { v4 as uuidv4 } from "uuid";

describe("Update user", () => {

    let idToUpdate;

    const repeatedNow = Date.now();
    beforeAll(async () => {
        const createUserData: CreateUserDTO = {
            name: "Ryan",
            email: repeatedNow + "@gmail.com",
            password: repeatedNow + "123"
        }

        const user = await createUser.exec(createUserData);
        idToUpdate = user.id;
    });

    const datetimeNow = Date.now();

    test("Should update a user successfully", async () => {

        const updateUserData: UpdateUserDTO = {
            email: datetimeNow + "@hotmail.com",
            password: "ryan12345"
        };

        const user = await updateUser.exec(idToUpdate, updateUserData);

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
            email: existingUser.email,
            password: "ryan12345"
        };

        await expect(updateUser.exec(idToUpdate, updateUserData)).rejects.toThrow(
            "Conflict already exists a user with this email"
        );
    });

});