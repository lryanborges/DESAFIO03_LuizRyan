import User from "../../../models/user.ts";
import { UpdateUserDTO } from "../../dtos/user/update-user-dto.js";

export interface UpdateUser {
    exec(id: string, data: UpdateUserDTO): Promise<User>
}
