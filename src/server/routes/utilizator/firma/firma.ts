import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares_CatchAsync.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import moment from "moment";
import { Utilizator } from "../../../Interfete/Interfete_Utilizator.js";
import { Firma } from "../../../Interfete/Interfete_Firma.js";
import {
  creareFirma,
  creareUtilizator,
} from "../../../Utils/Functii/Functii_utilizatori.js";
import criptareDate from "../../../Middlewares/Middlewares_CriptareParola.js";
import {
  validareFirma,
  verificareIntegritatiFirma,
} from "../../../Middlewares/Middlewares_Firma.js";
import { verificareIntegritatiUtilizator } from "../../../Middlewares/Middlewares_Utilizator.js";
import {
  adaugaFirma,
  adaugaUtilizator,
  getIdUtilizator,
} from "../../../DB/SQL_Utilizatori/SQL_Utilizatori.js";
import { getIdCaen } from "../../../DB/SQL_CAEN/SQL_CAEN.js";
import { getIdLocalitate } from "../../../DB/SQL_Localitati/SQL_Localitati.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareDate,
  validareFirma,
  verificareIntegritatiUtilizator,
  verificareIntegritatiFirma,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body.data)
      throw new ExpressError("Date utilizator invalide!", 400);

    console.log(request.body);

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    utilizator.data_inscriere = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const firma: Firma = creareFirma(request.body.data);

    const id_localitate: number = await getIdLocalitate(
      request.body.data.localitate
    );
    utilizator.localitate = id_localitate;

    console.log(utilizator);
    console.log(firma);

    await adaugaUtilizator(utilizator);

    const id: number = await getIdUtilizator(utilizator.nume_utilizator);
    firma.id_utilizator = id;
    const id_caen: number = await getIdCaen(firma.caen);
    firma.caen = id_caen;

    await adaugaFirma(firma);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

export default router;
