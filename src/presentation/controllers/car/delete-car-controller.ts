import { deleteCar } from "../../../domain/use-cases/car/delete-car.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const deleteCarController = catchError(async (req,res) => {
    const { id } = req.params
    await deleteCar.exec(id)
    res.status(204).send()
})
