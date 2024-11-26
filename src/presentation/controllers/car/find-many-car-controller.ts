import { queryCarParser } from "../../../domain/parsers/car/query-car-parser.js";
import { findManyCar } from "../../../domain/use-cases/car/find-many-car.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const findManyCarController = catchError(async (req, res) => {

    const queryParams = queryCarParser.parse(req.query)

    const cars = await findManyCar.exec(queryParams)

    if(cars.data.length === 0) {
        res.status(204).send()
    }

    res.status(200).send(cars)
})
