import { Log } from "../lib/log.js"
import { ExpressErrorHandler } from "../types.js"

export const logErrorsMiddleware: ExpressErrorHandler<Error> = (err, _req, _res, next) => {
    const method = err.name === "Error" ? "info" : "warn"
    Log[method](err)
    next(err)
}
