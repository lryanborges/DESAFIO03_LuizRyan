import { findOneUser } from "../../../domain/use-cases/user/find-one-user.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"


export const findOneUserController = catchError(async (req, res) => {
    const { id } = req.params

    const user = await findOneUser.exec(id)

    res.status(200).json(user)
})
