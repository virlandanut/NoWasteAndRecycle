import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../utils/CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
import moment from "moment";
import { Firma, Utilizator } from "../../../../../interfaces.js";
import {
  creareFirma,
  creareUtilizator,
} from "../../../../client/utils/Utilizatori.js";
import criptareDate from "../../../middlewares/criptareDate.js";
import {
  validareFirma,
  verificareIntegritatiFirma,
  verificareIntegritatiUtilizator,
} from "../../../middlewares/validareDate.js";
import {
  adaugaFirma,
  adaugaUtilizator,
  getIdUtilizator,
} from "../../../BD/SQL_Utilizatori/utilizatori.js";
import { getIdCaen } from "../../../BD/SQL_Utilizatori/coduriCaen.js";

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
    const firma: Firma = creareFirma(request.body.data);
    utilizator.data_inscriere = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

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
