import { Request, Response } from "express";
import { Utilizator } from "@prisma/client";
import { getFirmaCuId } from "../Models/FirmaModel.js";
import {
  getInchirieriFirma,
  getInchirieriUtilizator,
} from "../Models/InchiriereModel.js";
import { Inchirieri } from "../Routes/Utilizator/Interfete.js";

export async function getInchirieri(request: Request, response: Response) {
  const nume_utilizator: string = request.params.nume_utilizator;
  const utilizatorCurent: Utilizator | null = request.session.utilizator;
  if (!utilizatorCurent) {
    return response
      .status(500)
      .json({ mesaj: "Utilizatorul nu este autentificat" });
  }
  if (utilizatorCurent.nume_utilizator !== nume_utilizator) {
    return response
      .status(403)
      .json({ mesaj: "Nu aveți dreptul să vizionați această pagină!" });
  }

  let raspunsInchirieri: Inchirieri = {
    containereDepozitare: [],
    containereReciclare: [],
  };

  if (utilizatorCurent.rol === "FIRMA") {
    const firma = await getFirmaCuId(utilizatorCurent.id_utilizator);
    if (!firma) {
      return response
        .status(500)
        .json({ mesaj: "Firma nu există în baza de date!" });
    }
    raspunsInchirieri = await getInchirieriFirma(firma);
  } else {
    raspunsInchirieri = await getInchirieriUtilizator(
      utilizatorCurent.id_utilizator
    );
  }

  return response.status(200).json(raspunsInchirieri);
}
