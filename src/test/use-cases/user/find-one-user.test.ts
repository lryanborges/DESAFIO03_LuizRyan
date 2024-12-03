import { findOneUser } from "../../../domain/use-cases/user/find-one-user.js";
import { v4 as uuidv4 } from "uuid";

describe("Find one user", () => {

    test("Should find one specific user by id", async () => {
        const userId = "5421c183-4dd2-4d28-9cfa-c181cdf66e91";
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