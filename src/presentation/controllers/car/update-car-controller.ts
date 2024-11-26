import { updateCar } from "../../../domain/use-cases/car/update-car.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const updateCarController = catchError(async (req, res) => {

    const id = req.params.id

    const car = await updateCar.exec(id, req.body)

    res.status(200).send(car)
})
