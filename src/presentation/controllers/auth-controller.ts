import { auth } from "../../domain/use-cases/auth.js"
import { catchError } from "../../framework/express/lib/catch-error.js"

export const authController = catchError(async (req, res) => {
    const data = await auth.exec(req.body)
    res.json(data)
})
