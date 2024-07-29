import { NextFunction, Request, Response } from "express";
import prisma from "../../../Prisma/client.js";
import Joi from "joi";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { validationResult } from "express-validator";

class Middleware {
  handleValidationError(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const error = validationResult(request);
    if (!error.isEmpty()) {
      return response.json(error);
    }
    next();
  }

  async verificareIntegritatiPersoana(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { cnp } = request.body;
      const persoana = await prisma.persoana_fizica.findUnique({
        where: { cnp },
      });
      if (persoana) {
        throw new ExpressError("Acest CNP există deja", 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const validareSDPersoana = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiPersoana = Joi.object({
    data: Joi.object({
      email: Joi.string().required().email(),
      nume_utilizator: Joi.string().min(8).required(),
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

export default new Middleware();
