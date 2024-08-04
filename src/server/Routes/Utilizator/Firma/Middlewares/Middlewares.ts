import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { catchAsync } from "../../../../Middlewares/Middlewares.js";
import { validationResult } from "express-validator";
import prisma from "../../../../Prisma/client.js";
import { getProprietarContainer } from "../../../Container/CRUD/Read.js";

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
  verificareIntegritatiFirma = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      const { cif } = request.body;
      try {
        const firma = await prisma.firma.findFirst({ where: { cif } });
        if (firma) {
          throw new ExpressError("Acest CIF există deja", 400);
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  );
}

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

export const verificareFirma = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const utilizator = request.session.utilizator;
  if (!utilizator) {
    return response
      .status(500)
      .json({ success: false, message: "Utilizatorul nu există!" });
  }
  if (utilizator.rol !== "FIRMA") {
    return response
      .status(403)
      .json({ success: false, message: "Utilizatorul nu este firmă!" });
  }

  const firma = await prisma.firma.findUnique({
    where: { id_utilizator: utilizator.id_utilizator },
  });

  if (!firma) {
    return response
      .status(500)
      .json({ success: false, message: "Firma nu există!" });
  }

  if (!firma.status_aprobare) {
    return response
      .status(409)
      .json({ success: false, message: "Firma nu este aprobată!" });
  }
  next();
};

export const esteProprietar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.body.data;
  const utilizatorCurent = request.session.utilizator;
  if (!utilizatorCurent) {
    return response
      .status(500)
      .json({ mesaj: "Utilizatorul curent nu există" });
  }

  const proprietar: number = await getProprietarContainer(id);
  if (proprietar !== utilizatorCurent.id_utilizator) {
    return response.status(403).json({ eroare: "Neautorizat" });
  }
  next();
};

export default new Middleware();
