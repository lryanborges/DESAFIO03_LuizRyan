import { HttpError } from "../../../framework/express/exceptions/http-error.js";
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js";
import { UpdateUserDTO } from "../../interfaces/dtos/user/update-user-dto.js";
import { UpdateUser } from "../../interfaces/use-cases/user/update-user.js";
import User from "../../models/user.js";
import { updateUserParser } from "../../parsers/user/update-user-parser.js";
import { uuidParser } from "../../parsers/uuid-parser.js";
import { userRepository } from "../../repositories/user-repository.js";
import * as argon from "argon2";

export const updateUser = new class implements UpdateUser {
    async exec(id: string, data: UpdateUserDTO): Promise<User> {
        uuidParser.parse(id)
        const { email, password, name } = updateUserParser.parse(data)
        const userExisting = await userRepository.findOne({ where: { id } });

        if (!userExisting) {
            throw new ResourceNotFoundError("User");
        }

        const emailExists = await userRepository.findOne({ where: { email } });

        if (emailExists && emailExists.id !== id) {
            throw new HttpError("Conflict already exists a user with this email", 409);
        }

        if (password) {
            const passwordHash = await argon.hash(password);
            userExisting.password = passwordHash;

        }

        if (name) userExisting.name = name;
        if(email) userExisting.email = email;

        await userRepository.save(userExisting);

        return userExisting;
    }
}
