import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { datePdfReciclare } from "../../../Servicii/Interfete.js";
import { completeazaPDFReciclare } from "../../../Servicii/serviciu-pdf.js";
import path from "path";
import fs from "fs";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getDateNecesarePdfContractReciclare } from "./CRUD/Read.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const date: datePdfReciclare =
      await getDateNecesarePdfContractReciclare(id);

    const pdf = await completeazaPDFReciclare(date);

    const fisierTemporar = path.join(__dirname, "contract.pdf");
    fs.writeFileSync(fisierTemporar, pdf);

    response.download(fisierTemporar, "contract.pdf", (eroare) => {
      if (eroare) {
        throw new ExpressError("Contractul nu a putut fi descărcat", 500);
      }

      fs.unlinkSync(fisierTemporar);
    });
  }),
);

export default router;
