import express, { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { Utilizator } from "@prisma/client";
import {
  datePdfInchirierePF,
  datePdfInchirierePJ,
} from "../../../Servicii/Interfete.js";
import {
  getDateNecesarePdfContractDepozitarePF,
  getDateNecesarePdfContractDepozitarePJ,
} from "./CRUD/Read.js";
import {
  completeazaPDFInchirierePF,
  completeazaPDFInchirierePJ,
} from "../../../Servicii/serviciu-pdf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
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
  })
);

export default router;
