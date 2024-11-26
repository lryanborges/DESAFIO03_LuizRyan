import { queryUserParser } from "../../../domain/parsers/user/query-user-parser.js"
import { findManyUser } from "../../../domain/use-cases/user/find-many-user.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const findManyUserController = catchError(async (req, res) => {

    const queryParams = queryUserParser.parse(req.query)

    const users = await findManyUser.exec(queryParams)

    if(users.data.length === 0) {
        res.status(204).send()
    }

    res.status(200).send(users)
})
