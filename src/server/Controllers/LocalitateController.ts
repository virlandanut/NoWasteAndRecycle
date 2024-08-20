import { Localitate } from "@prisma/client";
import { Request, Response } from "express";
import {
  getDenumireLocalitati,
  getLocalitate,
} from "../Models/LocaliltateModel.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function getLocalitati(request: Request, response: Response) {
  const localitati: Localitate[] = await getDenumireLocalitati();
  if (!localitati) {
    throw new ExpressError("Localitățile nu există în baza de date", 404);
  }
  return response.json(localitati);
}

export async function getLoc(request: Request, response: Response) {
  const id = parseInt(request.params.id);
  const localitate = await getLocalitate(id);
  if (!localitate) {
    throw new ExpressError("Localitatea nu există în baza de date", 404);
  }
  return response.status(200).json(localitate);
}
