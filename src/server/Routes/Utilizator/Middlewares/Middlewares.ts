import { NextFunction, Request, Response } from "express";
import {
  validareEmail,
  validareEmailSchimbareDate,
  validareTelefon,
  validareTelefonSchimbareDate,
  validareUsername,
  validareUsernameSchimbareDate,
} from "../../Validari/Utilizator/CRUD/Read.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import { catchAsync } from "../../../Middlewares/Middlewares.js";

export const verificareIntegritatiUtilizator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const verificareUsername = await validareUsername(
      request.body.data.nume_utilizator
    );
    if (verificareUsername > 0) {
      throw new ExpressError("Acest username există deja", 400);
    }

    const verificareEmail = await validareEmail(request.body.data.email);
    if (verificareEmail > 0) {
      throw new ExpressError("Acest email există deja", 400);
    }

    const verificareTelefon = await validareTelefon(request.body.data.telefon);
    if (verificareTelefon > 0) {
      throw new ExpressError("Acest număr de telefon există deja", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const verificareIntegritatiSDUtilizator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session.user && request.session.user.id_utilizator) {
    try {
      const verificareUsername = await validareUsernameSchimbareDate(
        request.session.user.id_utilizator,
        request.body.data.nume_utilizator
      );
      if (verificareUsername > 0) {
        throw new ExpressError("Acest username există deja", 400);
      }

      const verificareEmail = await validareEmailSchimbareDate(
        request.session.user.id_utilizator,
        request.body.data.email
      );
      if (verificareEmail > 0) {
        throw new ExpressError("Acest email există deja", 400);
      }

      const verificareTelefon = await validareTelefonSchimbareDate(
        request.session.user.id_utilizator,
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
  if (
    request.session &&
    request.session.user &&
    request.session.user.id_utilizator
  ) {
    next();
  } else {
    response.status(403).json({ eroare: "Neautorizat" });
  }
};

export const criptareParola = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    if (!request.body.data)
      next(
        new ExpressError("Parola nu a putut fi criptată de către server", 400)
      );
    const formData = request.body.data;

    const parolaCriptata = await bcrypt.hash(formData.parola, 10);
    formData.parola = parolaCriptata;
    next();
  }
);
