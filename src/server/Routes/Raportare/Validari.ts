import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ExpressError } from "../../Utils/ExpressError.js";

export const validareRaportare = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiRaportare = Joi.object({
    idUtilizator: Joi.number().required(),
    titlu: Joi.string().required().min(8).max(50),
    mesaj: Joi.string().required().min(40),
  });
  const { error } = schemaJoiRaportare.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
