import { QueryCarDTO } from "../../dtos/car/query-car-dto.js";

export interface FindManyCar {
    exec(data: QueryCarDTO): Promise<ListResponse>
}
