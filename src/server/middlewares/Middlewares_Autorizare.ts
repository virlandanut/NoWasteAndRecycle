import { NextFunction, Request, Response } from "express";
import {
  verificareStatusAprobareFirma,
  verificareTipUtilizator,
} from "../BD/SQL_Utilizatori/SQL_Utilizatori.js";

export const esteAutentificat = (
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
      .status(200)
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
      .status(200)
      .json({ success: false, message: "Firma nu este aprobată!" });
  }
  next();
};
