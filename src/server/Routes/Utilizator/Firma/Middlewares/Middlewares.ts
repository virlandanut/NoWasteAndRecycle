import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validareCIF } from "../../../Validari/Utilizator/CRUD/Read.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { getCoduriCaen } from "../../../Caen/CRUD/Read.js";
import { codCAEN } from "../../../Caen/Interfete.js";
import { catchAsync } from "../../../../Middlewares/Middlewares.js";
import { verificareTipUtilizator } from "../../CRUD/Read.js";
import { verificareStatusAprobareFirma } from "../CRUD/Read.js";

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

export const validareSDFirma = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemaJoiFirma = Joi.object({
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
      denumire_firma: Joi.string()
        .required()
        .regex(/^[A-Z][A-Za-z\s]*\s?(SRL|PFA)$/),
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

export const validareJoiCIF = (
  valoare: string,
  helpers: Joi.CustomHelpers<string>
) => {
  const cheie = "753217532";
  if (typeof valoare !== "string") {
    throw new Error("CIF-ul trebuie să fie un string");
  }
  let cif = valoare.toUpperCase();
  cif = cif.indexOf("RO") > -1 ? cif.substring(2) : cif;
  cif = cif.replace(/\s/g, "");
  if (cif.length < 2 || cif.length > 10) {
    throw new Error("Lungimea CIF-ului este invalida");
  }
  if (Number.isNaN(parseInt(cif))) {
    throw new Error("CIF-ul nu este valid!");
  }

  const numarControl = parseInt(cif.substring(cif.length - 1));
  cif = cif.substring(0, cif.length - 1);

  while (cif.length !== cheie.length) {
    cif = "0" + cif;
  }

  let suma = 0;
  let i = cif.length;
  while (i--) {
    suma += parseInt(cif.charAt(i)) * parseInt(cheie.charAt(i));
  }

  let calculareNumarControl = (suma * 10) % 11;

  if (calculareNumarControl === 10) {
    calculareNumarControl = 0;
  }

  if (numarControl !== calculareNumarControl) {
    throw new Error("CIF Invalid");
  }

  return valoare;
};

export const validareJoiCAEN = async (
  valoare: string,
  helpers: Joi.CustomHelpers<string>
) => {
  try {
    const coduriCaen = await getCoduriCaen();
    if (coduriCaen) {
      const coduriCaenString = coduriCaen.recordset.map(
        (cod: codCAEN) => cod.cod_caen
      );
      if (coduriCaenString.includes(parseInt(valoare))) {
        return valoare;
      } else {
        throw new Error("CAEN Invalid!");
      }
    } else {
      throw new Error(
        "Probleme la interogarea bazei de date a codurilor CAEN!"
      );
    }
  } catch (eroare) {
    console.log(eroare);
  }
};

export const esteFirma = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const utilizator = (request.session as any).user;
  const verificareFirma = await verificareTipUtilizator(
    utilizator.id_utilizator
  );
  if (verificareFirma === 0) {
    return response
      .status(403)
      .json({ success: false, message: "Utilizatorul nu este firmă!" });
  }
  next();
};

export const esteFirmaAprobata = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const utilizator = (request.session as any).user;
  const esteAprobat = await verificareStatusAprobareFirma(
    utilizator.id_utilizator
  );
  if (esteAprobat === 0) {
    return response
      .status(403)
      .json({ success: false, message: "Firma nu este aprobată!" });
  }
  next();
};
