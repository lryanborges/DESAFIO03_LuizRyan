import { CreateUserDTO } from "../../dtos/user/create-user-dto.js";

export interface CreateUser {
    exec(data:CreateUserDTO):Promise<void>
}
