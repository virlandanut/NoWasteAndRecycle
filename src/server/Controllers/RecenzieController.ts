import { Request, Response } from "express";
import {
  adaugaRecenzie,
  editRecenzie,
  getRecenzie,
  stergeRecenzie,
  verificareExistentaRecenzie,
} from "../Models/RecenzieModel.js";
import { Recenzie } from "@prisma/client";
import { ExpressError } from "../Utils/ExpressError.js";

export async function adaugaRecenzieNoua(request: Request, response: Response) {
  const { idContainer, scor, mesaj } = request.body;
  console.log(request.body);
  const recenzie: Recenzie | null =
    await verificareExistentaRecenzie(idContainer);
  if (recenzie) {
    return response.status(500).json({
      mesaj: "Ați adăugat deja o recenzie pentru acest container",
    });
  }

  const recenzieNoua: Recenzie | null = await adaugaRecenzie(
    idContainer,
    scor,
    mesaj
  );

  if (!recenzieNoua) {
    return response.status(500).json({
      mesaj: "Recenzia nu a putut fi adăugată",
    });
  }

  response.status(200).json({ mesaj: "Recenzia a fost adăugată cu succes" });
}

export async function modificaRecenzie(request: Request, response: Response) {
  const { idRecenzie, mesaj, scor } = request.body;
  const recenzie: Recenzie | null = await editRecenzie(idRecenzie, mesaj, scor);

  if (!recenzie) {
    return response
      .status(500)
      .json({ mesaj: "Recenzia nu a putut fi modificată" });
  }

  return response
    .status(200)
    .json({ mesaj: "Recenzia a fost modificată cu succes" });
}

export async function getRecenzieContainer(
  request: Request,
  response: Response
) {
  const id = parseInt(request.params.id);
  const recenzie: Recenzie | null = await getRecenzie(id);
  if (!recenzie) {
    throw new ExpressError("Recenzia nu există în baza de date", 500);
  }
  return response.status(200).json(recenzie);
}

export async function stergereRecenzie(request: Request, response: Response) {
  const id: number = parseInt(request.params.id);
  const recenzieStearsa = await stergeRecenzie(id);
  if (recenzieStearsa) {
    return response
      .status(200)
      .json({ mesaj: "Recenzia a fost ștearsă cu succes" });
  } else {
    return response
      .status(500)
      .json({ mesaj: "Recenzia nu a putut fi ștearsă" });
  }
}
