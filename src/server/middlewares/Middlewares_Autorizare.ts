import { NextFunction, Request, Response } from "express";
import {
  verificareStatusAprobareFirma,
  verificareTipUtilizator,
} from "../DB/SQL_Utilizatori/SQL_Utilizatori.js";

export const esteAutentificat = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session && request.session.user && request.session.user.id_utilizator) {
    next();
  } else {
    response.status(403).json({ eroare: "Neautorizat" });
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
