import Order from "../../../models/order.ts";

export interface DeleteOrder {
    exec(data:string):Promise<Order>
}
