import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  validareCIF,
  validareCNP,
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../BD/SQL_Utilizatori/utilizatori.js";
import { ExpressError } from "../utils/ExpressError.js";
import { catchAsync } from "../utils/CatchAsync.js";
import { validareJoiCAEN, validareJoiCIF } from "../utils/Validari.js";

export const verificareIntegritatiUtilizator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareUsername = await validareUsername(
      request.body.data.username
    );
    console.log("Verificare username:", verificareUsername);
    if (verificareUsername > 0) {
      throw new ExpressError("Acest username există deja", 400);
    }

    const verificareEmail = await validareEmail(request.body.data.email);
    console.log("Verificare email:", verificareEmail);
    if (verificareEmail > 0) {
      throw new ExpressError("Acest email există deja", 400);
    }

    const verificareTelefon = await validareTelefon(request.body.data.telefon);
    console.log("Verificare telefon:", verificareTelefon);
    if (verificareTelefon > 0) {
      throw new ExpressError("Acest număr de telefon există deja", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const verificareIntegritatiPersoana = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareCNP = await validareCNP(request.body.data.CNP);
    if (verificareCNP > 0) {
      throw new ExpressError("Acest CNP există deja", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

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

export const validarePersoana = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiPersoana = Joi.object({
    data: Joi.object({
      email: Joi.string().required().email(),
      username: Joi.string().min(8).required(),
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

  const { error } = schemaJoiPersoana.validate(request.body);
  if (error) {
    const mesaj = error.details.map((el) => el.message).join(",");
    next(new ExpressError(mesaj, 400));
  } else {
    next();
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
      username: Joi.string().min(8).required(),
      parola: Joi.string().required(),
      dataInscriere: Joi.string().required(),
      telefon: Joi.string()
        .required()
        .regex(/^\d+$/)
        .regex(/^(07)(?=[2-9])[0-9]{8}$/),
      adresa: Joi.string().required(),
      denumire: Joi.string()
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

export const esteLogat = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session && (request.session as any).user) {
    next();
  } else {
    response.status(401).json({ eroare: "Neautorizat" });
  }
};
