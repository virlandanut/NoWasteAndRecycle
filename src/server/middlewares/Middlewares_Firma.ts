import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validareCIF } from "../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import { ExpressError } from "../utils/ExpressError.js";
import { validareJoiCAEN, validareJoiCIF } from "../utils/Validari.js";

export const verificareIntegritatiFirma = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareCIF = await validareCIF(request.body.data.cif);
    if (verificareCIF > 0) {
      throw new ExpressError("Acest CIF există deja", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validareFirma = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiFirma = Joi.object({
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
      denumire_firma: Joi.string()
        .required()
        .regex(/^[A-Z][A-Za-z\s]*\s?(SRL|PFA)$/),
      cif: Joi.required().custom(validareJoiCIF),
      caen: Joi.required().custom(validareJoiCAEN),
    }).required(),
  });

  const { error } = schemaJoiFirma.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
