import { Request, Response, NextFunction } from "express";
import { criptareParola } from "../BD/Bcrypt/criptare.js";
import { Utilizator } from "../interfaces.js";

const criptareDate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const utilizator: Utilizator = request.body.utilizator;
  try {
    const parolaCriptata = await criptareParola(utilizator.parola);
    utilizator.parola = parolaCriptata;
    next();
  } catch (eroare) {
    console.error("An error occurred while encrypting the password:", eroare);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export default criptareDate;
