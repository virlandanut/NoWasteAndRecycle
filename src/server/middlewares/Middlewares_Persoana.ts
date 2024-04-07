import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validareCNP } from "../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import { ExpressError } from "../utils/ExpressError.js";

export const verificareIntegritatiPersoana = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareCNP = await validareCNP(request.body.data.cnp);
    if (verificareCNP > 0) {
      throw new ExpressError("Acest CNP există deja", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validarePersoana = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiPersoana = Joi.object({
    data: Joi.object({
      email: Joi.string().required().email(),
      nume_utilizator: Joi.string().min(8).required(),
      parola: Joi.string().required(),
      data_inscriere: Joi.string().allow(""),
      telefon: Joi.string()
        .required()
        .regex(/^\d+$/)
        .regex(/^(07)(?=[2-9])[0-9]{8}$/),
      strada: Joi.string().required(),
      numar: Joi.string().required(),
      localitate: Joi.string().required(),
      nume: Joi.string()
        .required()
        .regex(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      prenume: Joi.string()
        .required()
        .regex(/^[A-Za-zȘșȚțĂăÎîÂâÉéÔôÎîȘșȚț]+$/),
      cnp: Joi.string()
        .required()
        .regex(/^[1|2|5|6][0-9]{12}$/)
        .min(13),
      rol: Joi.string().required(),
    }).required(),
  });

  const { error } = schemaJoiPersoana.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
