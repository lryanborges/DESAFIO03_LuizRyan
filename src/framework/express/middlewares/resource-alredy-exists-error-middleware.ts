import { ResourceAlredyExistsError } from "../exceptions/resource-alredy-exists-error.js"
import { ExpressErrorHandler } from "../types.js"


export const resourceAlredyExistsErrorMiddleware: ExpressErrorHandler<ResourceAlredyExistsError> = (err, _, res, next) => {
    if (!(err instanceof ResourceAlredyExistsError)) return next(err)
    res.status(409).json({ errors: [err.message]})
}
