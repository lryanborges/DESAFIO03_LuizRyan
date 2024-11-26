import { deleteOrder } from "../../../domain/use-cases/order/delete-order.js";
import { catchError } from "../../../framework/express/lib/catch-error.js";
import { Request, Response } from "express";

export const deleteOrderController = catchError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteOrder.exec(id);
    res.status(204).send();
  }
);
