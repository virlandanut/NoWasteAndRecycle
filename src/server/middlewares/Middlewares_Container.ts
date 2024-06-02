import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ExpressError } from "../Utils/ExpressError.js";
import { validareDenumireContainer } from "../DB/SQL_Containere/SQL_Containere.js";

export const verificareIntegritatiContainer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareDenumireContainer = await validareDenumireContainer(
      request.body.data.denumire
    );
    if (verificareDenumireContainer > 0) {
      throw new ExpressError("Acest container există deja", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validareContainer = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiContainer = Joi.object({
    data: Joi.object({
      denumire: Joi.string().required().min(8).max(20),
      capacitate: Joi.number().min(50).required(),
      tip: Joi.string().valid(
        "Electronică",
        "Hârtie și carton",
        "Materiale organice",
        "Materiale textile",
        "Metal",
        "Plastic",
        "Sticlă"
      ),
      strada: Joi.string().required(),
      numar: Joi.string().required(),
      localitate: Joi.string().required(),
      descriere: Joi.string().min(40).required(),
      pretZi: Joi.number().min(100),
      pretSaptamana: Joi.number().min(100),
      pretLuna: Joi.number().min(100),
      pretAn: Joi.number().min(100),
    })
      .or("pretZi", "pretSaptamana", "pretLuna", "pretAn")
      .required(),
  });

  const { error } = schemaJoiContainer.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
  }
};
