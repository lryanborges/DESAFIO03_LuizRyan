import { ClientDTO } from "../../dtos/client/client-dto.js";
import { QueryClientDTO } from "../../dtos/client/query-client-dto.js";

interface ListClientResponse {
    total: number;
    currentPage: number;
    pages: number;
    data: ClientDTO[];
}

export interface FindManyClient {
    exec(data:QueryClientDTO):Promise<ListClientResponse>
}
