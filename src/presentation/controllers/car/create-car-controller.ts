import { createCar } from "../../../domain/use-cases/car/create-car.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const createCarController = catchError(async (req, res) => {
    await createCar.exec(req.body)
    res.status(201).send()
})
