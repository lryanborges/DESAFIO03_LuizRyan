import { createClient } from "../../../domain/use-cases/client/create-client.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const createClientController = catchError(async(req,res) => {
    await createClient.exec(req.body)
    res.status(201).send()
})
