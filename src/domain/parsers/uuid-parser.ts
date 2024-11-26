import { z } from "zod"

const parser = z.object({ id: z.string().uuid() })
export const uuidParser = {
    parse(id: string) {
        parser.parse({ id })
    }
} 
