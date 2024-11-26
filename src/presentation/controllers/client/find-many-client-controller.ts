import { queryClientParser } from "../../../domain/parsers/client/query-client-parser.js"
import { findManyClient } from "../../../domain/use-cases/client/find-many-client.js"
import { catchError } from "../../../framework/express/lib/catch-error.js"

export const findManyClientController = catchError(async(req,res) => {
    const queryParams = queryClientParser.parse(req.query)

    const clients = await findManyClient.exec(queryParams)

    if(clients.data.length === 0) {
        res.status(204).send()
    }

    res.status(200).send(clients)

})
