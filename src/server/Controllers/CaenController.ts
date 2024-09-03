import { Request, Response } from "express";
import { getCoduriCaen } from "../Models/CaenModel.js";

export async function getCoduri(request: Request, response: Response) {
  const coduriCaen = await getCoduriCaen();
  response.json(coduriCaen);
}
