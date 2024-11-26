import { datasource } from "../../data/data-source.js";
import Order from "../models/order.js";

export const orderRepository = datasource.getRepository(Order)
