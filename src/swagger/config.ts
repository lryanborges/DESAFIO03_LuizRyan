import { createUser } from "./user/create-user.js"
import { findManyUser } from "./user/find-many-user.js"
import { deleteUser } from "./user/delete-user.js"
import { updateUser } from "./user/update-user.js"
import { findOneUser } from "./user/find-one-user.js"
import deepmerge from "deepmerge"
import { createCar } from "./car/create-car.js"
import { updateCar } from "./car/update-car.js"
import { deleteCar } from "./car/delete-car.js"
import { findOneCar } from "./car/find-one-car.js"
import { createClient } from "./client/create-client.js"
import { deleteClient } from "./client/delete-client.js"
import { findManyClient } from "./client/find-many-client.js"
import { findOneClient } from "./client/find-one-client.js"
import { updateClient } from "./client/update-client.js"
import { findManyCar } from "./car/find-many-car.js"
import { findOneOrder } from "./order/find-one-order.js"
import { findManyOrder } from "./order/find-many-order.js"
import { deleteOrder } from "./order/delete-order.js"
import { updateOrder } from "./order/update-order.js"
import { createOrder } from "./order/create-order.js"
import { auth } from "./auth.js"

interface UseCase {
    paths: object,
    components: object
}

const base = {
    "openapi": "3.0.0",
    "info": {
        "title": "CompassCar API",
        "version": "1.0.0",
        "description": "Documentation for CompassCar API"
    },
    "servers": [
        {
            "url": "http://localhost:3000/api/v1"
        }
    ],
    "paths": {},
    "components": {},
    "securitySchemes": {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
}

const useCases: (UseCase | object)[] = [
    auth,
    createCar,
    updateCar,
    deleteCar,
    findOneCar,
    findManyCar,
    createUser,
    updateUser,
    deleteUser,
    findManyUser,
    findOneUser,
    createClient,
    deleteClient,
    updateClient,
    findOneClient,
    findManyClient,
    createOrder,
    updateOrder,
    findOneOrder,
    findManyOrder,
    deleteOrder
]

export const swaggerConfig = useCases.reduce((a, v) => deepmerge(a, v), base)
