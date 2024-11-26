import { findOneOrder } from "../../../domain/use-cases/order/find-one-order.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"


export const findOneOrderController = catchError(async (req, res) => {
    const { id } = req.params
    const order = await findOneOrder.exec(id)
    res.json(order)
})
