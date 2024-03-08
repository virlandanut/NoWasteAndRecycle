import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  validareCNP,
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../BD/SQL_Utilizatori/utilizatori.js";

export const verificareIntegritati = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const verificareUsername = await validareUsername(request.body.data.username);
  if (verificareUsername > 0) {
    return response.status(400).json({ eroare: "Acest username există deja" });
  }
  const verificareEmail = await validareEmail(request.body.data.email);
  if (verificareEmail > 0) {
    return response.status(400).json({ eroare: "Acest email există deja" });
  }
  const verificareCNP = await validareCNP(request.body.data.CNP);
  if (verificareCNP > 0) {
    return response.status(400).json({ eroare: "Acest CNP există deja" });
  }
  const verificareTelefon = await validareTelefon(request.body.data.telefon);
  if (verificareTelefon > 0) {
    return response
      .status(400)
      .json({ eroare: "Acest număr de telefon există deja" });
  }
  next();
};

export const validareUtilizator = (
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
        .regex(/^[A-Z][a-z]*$/),
      prenume: Joi.string()
        .required()
        .regex(/^[A-Z][a-z]*$/),
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
    response.status(400).json({ eroare: mesaj });
  } else {
    next();
  }
};
