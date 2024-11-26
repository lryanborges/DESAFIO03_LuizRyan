import { findOneCar } from "../../../domain/use-cases/car/find-one-car.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const findOneCarController = catchError(async (req, res) => {
    const { id } = req.params
    const car = await findOneCar.exec(id)
    res.status(200).json(car)
})
