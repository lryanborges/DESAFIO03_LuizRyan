import { CreateUserDTO } from "../../../domain/interfaces/dtos/user/create-user-dto.js";
import { createUser } from "../../../domain/use-cases/user/create-user.js";
import * as argon from "argon2"

describe("Create user", () => {
    const datetimeNow = Date.now();

    test("Should create a user successfully", async () => {

        const createUserData: CreateUserDTO = {
            name: "Ryan",
            email: datetimeNow + "@gmail.com",
            password: datetimeNow + "123"
        }

        const user = await createUser.exec(createUserData);

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Ryan");
        expect(user.email).toBe(datetimeNow + "@gmail.com");
        expect(await argon.verify(user.password, createUserData.password)).toBe(true);
    });

    test("Should not allow to create a user with an existing email", async () => {
        const createUserData: CreateUserDTO = {
            name: "Luiz",
            email: datetimeNow + "@gmail.com",
            password: datetimeNow + "0000"
        }

        await expect(createUser.exec(createUserData)).rejects.toThrow(
            "there is already a user with this data"
        );
    });
});