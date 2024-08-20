import { Utilizator } from "@prisma/client";
import { Request, Response } from "express";
import { ExpressError } from "../Utils/ExpressError.js";
import {
  datePdfInchirierePF,
  datePdfInchirierePJ,
} from "../Servicii/Interfete.js";
import {
  getDateNecesarePdfContractDepozitarePF,
  getDateNecesarePdfContractDepozitarePJ,
} from "../Models/ContractInchiriereModel.js";
import {
  completeazaPDFInchirierePF,
  completeazaPDFInchirierePJ,
} from "../Servicii/serviciu-pdf.js";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getContractDepozitare(
  request: Request,
  response: Response
) {
  const id: number = parseInt(request.params.id);
  const utilizatorCurent: Utilizator | null = request.session.utilizator;
  if (!utilizatorCurent) {
    throw new ExpressError("Utilizatorul curent nu există", 500);
  }
  if (utilizatorCurent.rol === "FIRMA") {
    const date: datePdfInchirierePJ =
      await getDateNecesarePdfContractDepozitarePJ(id);
    const pdf = await completeazaPDFInchirierePJ(date);
    const fisierTemporar = path.join(__dirname, "contract.pdf");
    fs.writeFileSync(fisierTemporar, pdf);

    response.download(fisierTemporar, "contract.pdf", (eroare) => {
      if (eroare) {
        throw new ExpressError("Contractul nu a putut fi descărcat", 500);
      }

      fs.unlinkSync(fisierTemporar);
    });
  } else {
    const date: datePdfInchirierePF =
      await getDateNecesarePdfContractDepozitarePF(id);
    const pdf = await completeazaPDFInchirierePF(date);
    const fisierTemporar = path.join(__dirname, "contract.pdf");
    fs.writeFileSync(fisierTemporar, pdf);

    response.download(fisierTemporar, "contract.pdf", (eroare) => {
      if (eroare) {
        throw new ExpressError("Contractul nu a putut fi descărcat", 500);
      }

      fs.unlinkSync(fisierTemporar);
    });
  }
}
