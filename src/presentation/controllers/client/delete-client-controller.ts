import { deleteClient } from "../../../domain/use-cases/client/delete-client.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const deleteClientController = catchError(async(req,res) => {
    const { id } = req.params
    await deleteClient.exec(id)
    res.status(204).send()
})
