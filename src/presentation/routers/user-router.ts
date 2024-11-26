import { Router } from "express"
import { findOneUserController } from "../controllers/user/find-one-user-controller.js"
import { findManyUserController } from "../controllers/user/find-many-user-controller.js"
import { createUserController } from "../controllers/user/create-user-controller.js"
import { deleteUserController } from "../controllers/user/delete-user-controller.js"
import { RouterDescriptor } from "../../framework/express/types.js"
import { updateUserController } from "../controllers/user/update-user-controller.js"

const user = Router()

user.get("/:id", findOneUserController)
user.get("/", findManyUserController)
user.post("/", createUserController)
user.delete("/:id", deleteUserController)
user.patch("/:id", updateUserController)


export const userRouter: RouterDescriptor = {
    path: "user",
    router: user
}
