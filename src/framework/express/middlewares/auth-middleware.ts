import { catchError } from "../lib/catch-error.js"
import jwt from "jsonwebtoken"
import { env } from "../lib/env.js"
import { HttpError } from "../exceptions/http-error.js"

export const authMiddleware = catchError(async (req, _, next) => {
    try {
        const authHeader = req.headers["authorization"]?.split(" ").at(1)
        jwt.verify(authHeader, env().JWT_SECRET)
        next()
    } catch {
        return next(new HttpError(
            "Authentication token is missing or invalid. Please provide a valid token in the Authorization header.",
            401
        ))
    }
})
