import { datasource } from "../../data/data-source.js";
import User from "../models/user.js";

export const userRepository = datasource.getRepository(User)
