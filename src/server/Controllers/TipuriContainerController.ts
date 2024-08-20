import { Request, Response } from "express";
import { getTipuriContainer } from "../Models/TipContainerModel.js";

export async function getTipuriContainere(
  request: Request,
  response: Response
) {
  const tipuriContainer = await getTipuriContainer();
  response.json(tipuriContainer);
}
