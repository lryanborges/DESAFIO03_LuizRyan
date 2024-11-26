import { ExpressErrorHandler } from "../types.js"

export const allErrorMiddleware: ExpressErrorHandler<Error> = (_err, _req, res) => {
    res.status(500).json({ errors: ["Internal server error"] })
}
