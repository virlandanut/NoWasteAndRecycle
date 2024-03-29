import express, { Request, Response, Router } from "express";
import criptareDate from "../../../middlewares/criptareDate.js";
import { Persoana, Utilizator } from "../../../../../interfaces.js";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,
} from "../../../BD/SQL_Utilizatori/utilizatori.js";
import {
  validarePersoana,
  verificareIntegritatiPersoana,
  verificareIntegritatiUtilizator,
} from "../../../middlewares/validareDate.js";
import {
  crearePersoana,
  creareUtilizator,
} from "../../../../client/utils/Utilizatori.js";
import { catchAsync } from "../../../utils/CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareDate,
  validarePersoana,
  verificareIntegritatiUtilizator,
  verificareIntegritatiPersoana,
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body.data)
      throw new ExpressError("Date utilizator invalide!", 400);

    console.log(request.body);

    const utilizator: Utilizator = creareUtilizator(request.body.data);
    const persoana: Persoana = crearePersoana(request.body.data);

    await adaugaUtilizator(utilizator);

    const id: number = await getIdUtilizator(utilizator.nume_utilizator);
    persoana.id_utilizator = id;

    await adaugaPersoana(persoana);

    response
      .status(200)
      .json({ success: true, message: "Cont creat cu success!" });
  })
);

export default router;
