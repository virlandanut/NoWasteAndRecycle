import { NextFunction, Request, Response } from "express";
import { getProprietarTichet } from "../CRUD/Read.js";

export const esteAutorizatSaPosteze = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.session.user && request.session.user.id_utilizator) {
    const idProprietar: number = await getProprietarTichet(
      request.body.id_raport_problema
    );
    if (
      request.session.user.id_utilizator === idProprietar ||
      request.session.user.rol === "administrator"
    ) {
      next();
    } else {
      response.status(403).json({ eroare: "Neautorizat" });
    }
  }
};
