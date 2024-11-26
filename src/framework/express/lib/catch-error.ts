import { ExpressHandler } from "../types.js"

export function catchError(handler: ExpressHandler): ExpressHandler {
    const isAsync = handler.constructor.name === "AsyncFunction"

    if (isAsync) {
        return async function(req, res, next) {
            try {
                return await handler(req, res, next)
            } catch (err) {
                return next(err)
            }
        }
    }

    return function(req, res, next) {
        try {
            return handler(req, res, next)
        } catch (err) {
            return next(err)
        }
    }

}
