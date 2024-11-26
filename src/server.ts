import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import express from "express"
import { RouterDescriptor } from "./framework/express/types.js"
import { carRouter } from "./presentation/routers/car-router.js"
import { clientRouter } from "./presentation/routers/client-router.js"
import { orderRouter } from "./presentation/routers/order-router.js"
import { userRouter } from "./presentation/routers/user-router.js"
import { env } from "./framework/express/lib/env.js"
import { pathParser } from "./framework/express/lib/path-parser.js"
import { logErrorsMiddleware } from "./framework/express/middlewares/log-errors-middleware.js"
import { validationErrorMiddleware } from "./framework/express/middlewares/validation-error-middleware.js"
import { resourceNotFoundMiddleware } from "./framework/express/middlewares/resource-not-found-middleware.js"
import { resourceAlredyExistsErrorMiddleware } from "./framework/express/middlewares/resource-alredy-exists-error-middleware.js"
import { allErrorMiddleware } from "./framework/express/middlewares/all-error-middleware.js"
import { httpErrorMiddleware } from "./framework/express/middlewares/http-error-middleware.js"
import { notFoundMiddleware } from "./framework/express/middlewares/not-found-middleware.js"
import swaggerUi from "swagger-ui-express"
import { swaggerConfig } from "./swagger/config.js"
import { authRouter } from "./presentation/routers/auth-router.js"
import { authMiddleware } from "./framework/express/middlewares/auth-middleware.js"

export function server() {
    const app = express()

    if (env().NODE_ENV === "development") app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig))

    const routers: RouterDescriptor[] = [
        carRouter,
        clientRouter,
        orderRouter,
        userRouter
    ]

    app.use(helmet())
    app.use(cors({
        origin: env().CORS_ORIGIN,
        optionsSuccessStatus: 200
    }))

    if (env().NODE_ENV === "development") app.use(morgan("dev"))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    const finalPath = pathParser({ base: "/api/v1/", path:authRouter.path })
    app.use(finalPath, authRouter.router)
    app.use(authMiddleware)
    routers.forEach(({ path, router }) => {
        const finalPath = pathParser({ base: "/api/v1/", path })
        app.use(finalPath, router)
    })

    app.use(notFoundMiddleware)
    if (env().NODE_ENV === "development") app.use(logErrorsMiddleware)
    app.use(validationErrorMiddleware)
    app.use(resourceNotFoundMiddleware)
    app.use(resourceAlredyExistsErrorMiddleware)
    app.use(httpErrorMiddleware)
    app.use(allErrorMiddleware)

    return app
}
