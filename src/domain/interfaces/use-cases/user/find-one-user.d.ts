import { UserDTO } from "../../dtos/user/user-dto.js";

export interface FindOneUser {
    exec(data:string):Promise<UserDTO>
}
