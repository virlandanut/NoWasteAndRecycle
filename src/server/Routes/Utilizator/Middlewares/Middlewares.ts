import { NextFunction, Request, Response } from "express";
import {
  validareEmailSchimbareDate,
  validareTelefonSchimbareDate,
  validareUsernameSchimbareDate,
} from "../../Validari/Utilizator/CRUD/Read.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import prisma from "../../../prisma/client.js";

class Middleware {
  verificareIntegritatiUtilizator = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      const { nume_utilizator, email, telefon } = request.body;
      try {
        const validareUsername = await prisma.utilizator.findUnique({
          where: { nume_utilizator },
        });

        if (validareUsername) {
          throw new ExpressError("Acest nume de utilizator există deja", 500);
        }

        const validareEmail = await prisma.utilizator.findUnique({
          where: { email },
        });
        if (validareEmail) {
          throw new ExpressError("Acest email există deja", 500);
        }

        const validareTelefon = await prisma.utilizator.findUnique({
          where: { telefon },
        });
        if (validareTelefon) {
          throw new ExpressError("Acest număr de telefon există deja", 500);
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  );

  criptareParola = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      if (!request.body)
        next(
          new ExpressError("Parola nu a putut fi criptată de către server", 500)
        );
      const formData = request.body;

      const parolaCriptata = await bcrypt.hash(formData.parola, 10);
      formData.parola = parolaCriptata;
      next();
    }
  );
}

export const verificareIntegritatiSDUtilizator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session.utilizator) {
    try {
      const verificareUsername = await validareUsernameSchimbareDate(
        request.session.utilizator.id_utilizator,
        request.body.data.nume_utilizator
      );

      if (verificareUsername > 0) {
        throw new ExpressError("Acest username există deja", 400);
      }

      const verificareEmail = await validareEmailSchimbareDate(
        request.session.utilizator.id_utilizator,
        request.body.data.email
      );
      if (verificareEmail > 0) {
        throw new ExpressError("Acest email există deja", 400);
      }

      const verificareTelefon = await validareTelefonSchimbareDate(
        request.session.utilizator.id_utilizator,
        request.body.data.telefon
      );
      if (verificareTelefon > 0) {
        throw new ExpressError("Acest număr de telefon există deja", 400);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
};

const validareParolaNouaJoi = (valoare: string) => {
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

export const esteAutentificat = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session.utilizator) {
    next();
  } else {
    response.status(403).json({ eroare: "Neautorizat" });
  }
};

export default new Middleware();
