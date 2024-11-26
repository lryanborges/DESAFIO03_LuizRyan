import { HttpError } from "../../framework/express/exceptions/http-error.js";
import { env } from "../../framework/express/lib/env.js";
import { AuthDTO } from "../interfaces/dtos/auth/auth-dto.js";
import { AuthTokenDTO } from "../interfaces/dtos/auth/auth-token-dto.js";
import { Auth } from "../interfaces/use-cases/auth.js";
import { authParser } from "../parsers/auth-parser.js";
import { userRepository } from "../repositories/user-repository.js";
import * as argon from "argon2";
import jwt from "jsonwebtoken"

export const auth = new class implements Auth {
    async exec(data: AuthDTO): Promise<AuthTokenDTO> {
        const auth = authParser.parse(data)
        const user = await userRepository.findOne({
            where: { email: auth.email }
        })
        if (!user) throw new HttpError("The email or password are incorrect", 404)
        const isValid = await argon.verify(user.password, auth.password)
        if (!isValid) throw new HttpError("The email or password are incorrect", 404)
        const token = jwt.sign({ id: user.id }, env().JWT_SECRET, { expiresIn: "15m" });
        return { token }
    }
}
