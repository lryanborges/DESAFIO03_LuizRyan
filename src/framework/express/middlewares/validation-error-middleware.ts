import { ZodError } from "zod"
import { ExpressErrorHandler } from "../types.js"
import { Log } from "../lib/log.js"

export const validationErrorMiddleware: ExpressErrorHandler<ZodError> = (err, _, res, next) => {
    if (!(err instanceof ZodError)) return next(err)
    Log.warn(err)
    const messages = err.issues.map(({ message, path, ...issue }) => ({
        field: path[0] ?? issue["keys"][0],
        message
    }))
    res.status(422).json({ errors: messages })
}
