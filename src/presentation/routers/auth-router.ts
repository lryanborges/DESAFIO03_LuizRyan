import { Router } from "express"
import { authController } from "../controllers/auth-controller.js"
import { RouterDescriptor } from "../../framework/express/types.js"

const auth = Router()

auth.post("/", authController)

export const authRouter: RouterDescriptor = {
    path: "auth",
    router: auth
}
