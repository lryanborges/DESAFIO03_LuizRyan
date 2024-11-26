import { updateClient } from "../../../domain/use-cases/client/update-client.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const updateClientController = catchError(async(req,res) => {
    const id = req.params.id
    const data = req.body

    await updateClient.exec(id, data)

    res.status(204).send()
})
