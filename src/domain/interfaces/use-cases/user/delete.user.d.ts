import User from "../../../models/user.ts";

export interface DeleteUser {
    exec(data:string):Promise<User>
}
