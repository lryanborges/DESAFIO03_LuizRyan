import { z } from "zod";
import { updateUserParser } from "../../../parsers/user/update-user-parser.ts";

export type UpdateUserDTO = z.infer<typeof updateUserParser>;
