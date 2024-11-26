import { createOrder } from "../../../domain/use-cases/order/create-order.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const createOrderController = catchError(async (req, res) => {
    const { carId, clientId } = req.body
    await createOrder.exec({ carId, clientId })
    res.status(201).send()
})
