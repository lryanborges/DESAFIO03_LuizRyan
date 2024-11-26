import { datasource } from "../../data/data-source.js";
import Car from "../models/car.js";

export const carRepository = datasource.getRepository(Car)
