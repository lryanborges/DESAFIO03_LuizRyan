import { createUser } from "../../../domain/use-cases/user/create-user.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const createUserController = catchError(async (req, res) => {
    await createUser.exec(req.body)
    res.status(201).send()
})
