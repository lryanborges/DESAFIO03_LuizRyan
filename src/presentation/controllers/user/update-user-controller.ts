import { updateUser } from "../../../domain/use-cases/user/update-user.js";
import { catchError } from "../../../framework/express/lib/catch-error.js";
import { Request, Response } from "express";

export const updateUserController = catchError(
  async (request: Request, response: Response) => {
    const id = request.params.id;
    const { name, email, password } = request.body;
    await updateUser.exec(id,{ name, email, password });
    response.status(204).send();
  }
);
