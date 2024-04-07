import express, { Request, Response, Router } from "express";
import criptareDate from "../../../middlewares/Middlewares_CriptareParola.js";
import moment from "moment";
import { Utilizator } from "../../../../interfaces/Interfete_Utilizator.js";
import { Persoana } from "../../../../interfaces/Interfete_Persoana.js";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,
} from "../../../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import {
  validarePersoana,
  verificareIntegritatiPersoana,
} from "../../../middlewares/Middlewares_Persoana.js";
import { verificareIntegritatiUtilizator } from "../../../middlewares/Middlewares_Utilizator.js";
import {
  crearePersoana,
  creareUtilizator,
} from "../../../utils/Functii/Functii.js";
import { catchAsync } from "../../../middlewares/Middlewares_CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
import { getIdLocalitate } from "../../../BD/SQL_Localitati/SQL_Localitati.js";

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
    utilizator.data_inscriere = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const id_localitate: number = await getIdLocalitate(
      request.body.data.localitate
    );
    utilizator.localitate = id_localitate;

    const persoana: Persoana = crearePersoana(request.body.data);

    console.log(utilizator);
    console.log(persoana);
    console.log(id_localitate);

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
