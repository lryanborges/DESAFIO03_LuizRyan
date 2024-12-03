import Client from "../../../models/client.ts";
import { CreateClientDTO } from "../../dtos/client/create-client-dto.js";


export interface CreateClient {
    exec(data: CreateClientDTO): Promise<Client>
}
