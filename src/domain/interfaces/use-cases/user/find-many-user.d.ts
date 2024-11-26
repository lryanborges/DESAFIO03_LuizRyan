import { ListResponse } from "./../../dtos/list-response-dto";
import { QueryUserDTO } from "../../dtos/user/query-user-dto.js";
import { UserDTO } from "../../dtos/user/user-dto.js";

export interface FindManyUser {
    exec(data: QueryUserDTO): Promise<ListResponse<UserDTO>>
}
