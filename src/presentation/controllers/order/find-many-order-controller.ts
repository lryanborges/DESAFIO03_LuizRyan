import { queryOrderParser } from "../../../domain/parsers/order/query-order-parser.js"; 
import { findManyOrder } from "../../../domain/use-cases/order/find-many-order.js";
import { catchError } from "../../../framework/express/lib/catch-error.js";

export const findManyOrderController = catchError(async (req, res) => {
    const queryParams = queryOrderParser.parse(req.query)

    const orders = await findManyOrder.exec(queryParams)

    if (orders.data.length === 0) {
        res.status(204).send()
    }

    res.status(200).send(orders); 
})
