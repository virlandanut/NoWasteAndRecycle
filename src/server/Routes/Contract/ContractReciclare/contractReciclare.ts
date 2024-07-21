import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { datePdfReciclare } from "../../../Servicii/Interfete.js";
import { completeazaPDFReciclare } from "../../../Servicii/serviciu-pdf.js";
import path from "path";
import fs from "fs";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const data: datePdfReciclare = {
      proprietarDenumire: "AVD COD SRL",
      cifProprietar: "12346789",
      judetProprietar: "Constanța",
      localitateProprietar: "Limanu",
      stradaProprietar: "Pictor Tonitza",
      numarProprietar: "19",
      cumparatorDenumire: "MIMA COS SRL",
      cifCumparator: "123456789",
      judetCumparator: "Constanța",
      localitateCumparator: "Alba",
      stradaCumparator: "Lalelelor",
      numarCumparator: "13",
      judetContainer: "Constanța",
      localitateContainer: "Constanța",
      stradaContainer: "Tudor Vladimirescu",
      numarContainer: "13A",
      pretTotal: "339.42",
      dataInceput: "23.05.2025",
      dataSfarsit: "27.05.2029",
    };

    const pdf = await completeazaPDFReciclare(data);

    const fisierTemporar = path.join(__dirname, "contract.pdf");
    fs.writeFileSync(fisierTemporar, pdf);

    response.download(fisierTemporar, "contract.pdf", (eroare) => {
      if (eroare) {
        throw new ExpressError("Contractul nu a putut fi descărcat", 500);
      }

      fs.unlinkSync(fisierTemporar);
    });
  })
);

export default router;
