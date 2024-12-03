import Client from "../../../models/client.ts";
import { UpdateClientDTO } from "../../dtos/client/update-client-dto.js";

export interface UpdateClient {
    exec(string:id,data:UpdateClientDTO):Promise<Client>
}
