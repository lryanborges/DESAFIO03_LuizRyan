import { catchError } from "../lib/catch-error.js"


export const notFoundMiddleware = catchError((_, res) => {
    res.status(404).json({ errors: ["route not found"] })
})
