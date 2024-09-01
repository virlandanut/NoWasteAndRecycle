import { Request, Response } from "express";
import { getCoduriCaen } from "../Models/CaenModel.js";

export class CaenController {
  async getCoduri(request: Request, response: Response) {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen);
  }
}
