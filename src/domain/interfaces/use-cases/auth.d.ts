import { AuthDTO } from "../dtos/auth-dto.js"
import { AuthTokenDTO } from "../dtos/auth/auth-token-dto.js"

export interface Auth {
    exec(data: AuthDTO): Promise<AuthTokenDTO>
}
