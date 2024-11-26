import { findOneClient } from "../../../domain/use-cases/client/find-one-client.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const findOneClientController = catchError(async(req, res) => {
    const { id } = req.params

    const client = await findOneClient.exec(id)

    res.status(200).json(client)
})
