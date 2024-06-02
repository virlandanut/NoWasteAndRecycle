import { NextFunction, Request, Response } from "express";
import {
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../DB/SQL_Utilizatori/SQL_Utilizatori.js";
import { ExpressError } from "../Utils/ExpressError.js";

export const verificareIntegritatiUtilizator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareUsername = await validareUsername(
      request.body.data.nume_utilizator
    );
    if (verificareUsername > 0) {
      throw new ExpressError("Acest username există deja", 400);
    }

    const verificareEmail = await validareEmail(request.body.data.email);
    if (verificareEmail > 0) {
      throw new ExpressError("Acest email există deja", 400);
    }

    const verificareTelefon = await validareTelefon(request.body.data.telefon);
    if (verificareTelefon > 0) {
      throw new ExpressError("Acest număr de telefon există deja", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
