import { ClientDTO } from "../../dtos/client/client-dto.js";

export interface FindOneClient {
    exec(data:string):Promise<ClientDTO>
}
