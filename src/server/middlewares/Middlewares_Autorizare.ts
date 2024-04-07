import { NextFunction, Request, Response } from "express";

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

