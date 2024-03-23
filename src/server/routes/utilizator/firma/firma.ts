import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../utils/CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
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

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    const firma: Firma = creareFirma(request.body.data);

    await adaugaUtilizator(utilizator);

    const id: number = await getIdUtilizator(utilizator.username);
    firma.idUtilizator = id;
    const idCaen: number = await getIdCaen(parseInt(firma.caen));
    firma.caen = String(idCaen);

    await adaugaFirma(firma);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

export default router;
