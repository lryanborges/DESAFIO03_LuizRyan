import { ResourceNotFoundError } from "../exceptions/resource-not-found-error.js"
import { Log } from "../lib/log.js"
import { ExpressErrorHandler } from "../types.js"

export const resourceNotFoundMiddleware: ExpressErrorHandler<ResourceNotFoundError> = (err, _, res, next) => {
    if (!(err instanceof ResourceNotFoundError)) return next(err)
    Log.warn(err)
    res.status(404).json({ errors: [err.message] })
}
