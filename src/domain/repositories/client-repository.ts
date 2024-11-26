import { datasource } from "../../data/data-source.js";
import Client from "../models/client.js";

export const clientRepository = datasource.getRepository(Client)
