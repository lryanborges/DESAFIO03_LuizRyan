import { deleteUser } from "../../../domain/use-cases/user/delete.user.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const deleteUserController = catchError(async (req, res) => {
    const { id } = req.params
    await deleteUser.exec(id)
    res.status(204).send()
})
