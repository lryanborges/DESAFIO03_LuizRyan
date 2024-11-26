import { Router } from "express"
import { findOneCarController } from "../controllers/car/fine-one-car-controller.js"
import { findManyCarController } from "../controllers/car/find-many-car-controller.js"
import { createCarController } from "../controllers/car/create-car-controller.js"
import { deleteCarController } from "../controllers/car/delete-car-controller.js"
import { updateCarController } from "../controllers/car/update-car-controller.js"
import { RouterDescriptor } from "../../framework/express/types.js"

const car = Router()

car.get("/:id", findOneCarController)
car.get("/", findManyCarController)
car.post("/", createCarController)
car.delete("/:id", deleteCarController)
car.patch("/:id", updateCarController)


export const carRouter: RouterDescriptor = {
    path: "car",
    router: car
}
