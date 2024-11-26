import { ListResponse } from "../../dtos/list-response-dto.ts";
import { FindManyOrderDTO } from "../../dtos/order/find-many-order-dto.js";
import { QueryOrderDTO } from "../../dtos/order/query-order-dto.js";

export interface FindManyOrder {
    exec(data:QueryOrderDTO):Promise<ListResponse<FindManyOrderDTO>>
}
