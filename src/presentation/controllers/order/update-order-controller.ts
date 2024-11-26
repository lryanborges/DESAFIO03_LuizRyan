import { updateOrder } from "../../../domain/use-cases/order/update-order.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const updateOrderController = catchError(async (req, res) => {
    const { id } = req.params
    await updateOrder.exec(id, req.body)
    res.status(201).send()
})
