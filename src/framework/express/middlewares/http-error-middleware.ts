import { HttpError } from "../exceptions/http-error.js"
import { ExpressErrorHandler } from "../types.js"

export const httpErrorMiddleware: ExpressErrorHandler<Error> = (err, _, res, next) => {
    if (!(err instanceof HttpError)) return next(err)
    const [message,status] = err.message.split("¨")
    res.status(parseInt(status)).json({
        errors: [message]
    })
}
