import { Router } from "express"
import { findOneOrderController } from "../controllers/order/fine-one-order-controller.js"
import { findManyOrderController } from "../controllers/order/find-many-order-controller.js"
import { createOrderController } from "../controllers/order/create-order-controller.js"
import { deleteOrderController } from "../controllers/order/delete-order-controller.js"
import { updateOrderController } from "../controllers/order/update-order-controller.js"
import { RouterDescriptor } from "../../framework/express/types.js"

const order = Router()

order.get("/:id", findOneOrderController)
order.get("/", findManyOrderController)
order.post("/", createOrderController)
order.delete("/:id", deleteOrderController)
order.patch("/:id", updateOrderController)


export const orderRouter: RouterDescriptor = {
    path: "order",
    router: order
}
