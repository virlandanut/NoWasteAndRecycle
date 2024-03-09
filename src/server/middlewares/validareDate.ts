import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  validareCNP,
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../BD/SQL_Utilizatori/utilizatori.js";
import { ExpressError } from "../utils/ExpressError.js";

export const verificareIntegritati = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareUsername = await validareUsername(
      request.body.data.username
    );
    if (verificareUsername > 0) {
      throw new ExpressError("Acest username există deja", 400);
    }
    const verificareEmail = await validareEmail(request.body.data.email);
    if (verificareEmail > 0) {
      throw new ExpressError("Acest email există deja", 400);
    }
    const verificareCNP = await validareCNP(request.body.data.CNP);
    if (verificareCNP > 0) {
      throw new ExpressError("Acest CNP există deja", 400);
    }
    const verificareTelefon = await validareTelefon(request.body.data.telefon);
    if (verificareTelefon > 0) {
      throw new ExpressError("Acest număr de telefon există deja", 400);
    }
    next();
  } catch (eroare) {
    next(eroare);
  }
};

export const validarePersoana = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiUtilizator = Joi.object({
    data: Joi.object({
      email: Joi.string().required().email(),
      username: Joi.string().min(8),
      parola: Joi.string().required(),
      dataInscriere: Joi.string().required(),
      telefon: Joi.string()
        .required()
        .regex(/^\d+$/)
        .regex(/^(07)(?=[2-9])[0-9]{8}$/),
      adresa: Joi.string().required(),
      nume: Joi.string()
        .required()
        .regex(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      prenume: Joi.string()
        .required()
        .regex(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      CNP: Joi.string()
        .required()
        .regex(/^[1|2|5|6][0-9]{12}$/)
        .min(13),
      rol: Joi.string().required(),
    }).required(),
  });

  const { error } = schemaJoiUtilizator.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
