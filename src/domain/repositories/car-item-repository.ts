import { datasource } from "../../data/data-source.js";
import CarItem from "../models/car-item.js";
export const carItemRepository = datasource.getRepository(CarItem)
