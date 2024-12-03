import Client from "../../../models/client.ts";

export interface DeleteClient {
    exec(data:string):Promise<Client>
}
