import { NextFunction, Request, Response } from "express";

export const esteAdministrator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    request.session.utilizator &&
    request.session.utilizator.rol === "ADMINISTRATOR"
  ) {
    next();
  } else {
    response.status(403).json({ eroare: "Neautorizat" });
  }
};
