import { Request, Response, Router } from "express";
import { datePdfReciclare } from "../Servicii/Interfete.js";
import { getDateNecesarePdfContractReciclare } from "../Models/ContractReciclareModel.js";
import { completeazaPDFReciclare } from "../Servicii/serviciu-pdf.js";
import { ExpressError } from "../Utils/ExpressError.js";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getContractReciclare(
  request: Request,
  response: Response
) {
  const id: number = parseInt(request.params.id);
  const date: datePdfReciclare = await getDateNecesarePdfContractReciclare(id);

  const pdf = await completeazaPDFReciclare(date);

  const fisierTemporar = path.join(__dirname, "contract.pdf");
  fs.writeFileSync(fisierTemporar, pdf);

  response.download(fisierTemporar, "contract.pdf", (eroare) => {
    if (eroare) {
      throw new ExpressError("Contractul nu a putut fi descărcat", 500);
    }

    fs.unlinkSync(fisierTemporar);
  });
}
