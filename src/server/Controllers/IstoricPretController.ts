import { Request, Response } from "express";
import { getPreturiContainer } from "../Models/IstoricPretModel.js";

export async function getPreturiCon(request: Request, response: Response) {
  const { id } = request.params;
  const preturi = await getPreturiContainer(parseInt(id));
  return response.json(preturi);
}
