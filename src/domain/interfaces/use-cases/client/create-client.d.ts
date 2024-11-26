import { CreateClientDTO } from "../../dtos/client/create-client-dto.js";


export interface CreateClient {
    exec(data: CreateClientDTO): Promise<void>
}
