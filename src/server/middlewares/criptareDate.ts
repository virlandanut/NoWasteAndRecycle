import { Request, Response, NextFunction } from "express";
import { criptareParola } from "../BD/Bcrypt/criptare.js";
import { Utilizator } from "../../../interfaces.js";
import { FormValues } from "../../client/types.js";

const criptareDate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const formData = request.body.data;
  try {
    const parolaCriptata = await criptareParola(formData.parola);
    formData.parola = parolaCriptata;
    next();
  } catch (eroare) {
    console.error("An error occurred while encrypting the password:", eroare);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export default criptareDate;
