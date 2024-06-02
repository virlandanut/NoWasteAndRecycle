import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ExpressError } from "../Utils/ExpressError.js";

const validareParolaNouaJoi = (
  valoare: string,
  helpers: Joi.CustomHelpers<string>
) => {
  if (valoare.toLowerCase() === valoare) {
    throw new Error("Minim o literă mare");
  }
  if (!/[0-9]/.test(valoare)) {
    throw new Error("Minim o cifră");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(valoare)) {
    throw new Error("Minim un caracter special");
  }

  return valoare;
};

export const validareSchimbareParola = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiSchimbareParola = Joi.object({
    idUtilizator: Joi.number().required(),
    parolaVeche: Joi.string().required(),
    parolaNoua: Joi.string().required().custom(validareParolaNouaJoi).min(10),
  });
  const { error } = schemaJoiSchimbareParola.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
