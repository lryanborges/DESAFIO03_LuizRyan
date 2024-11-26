import { Router } from "express"
import { findOneClientController } from "../controllers/client/fine-one-client-controller.js"
import { findManyClientController } from "../controllers/client/find-many-client-controller.js"
import { createClientController } from "../controllers/client/create-client-controller.js"
import { deleteClientController } from "../controllers/client/delete-client-controller.js"
import { updateClientController } from "../controllers/client/update-client-controller.js"
import { RouterDescriptor } from "../../framework/express/types.js"

const client = Router()

client.get("/:id", findOneClientController)
client.get("/", findManyClientController)
client.post("/", createClientController)
client.delete("/:id", deleteClientController)
client.patch("/:id", updateClientController)


export const clientRouter: RouterDescriptor = {
    path: "client",
    router: client
}
