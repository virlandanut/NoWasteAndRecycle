import express, { Request, Response, Router } from "express";
import criptareDate from "../../../middlewares/criptareDate.js";
import { Persoana, Utilizator } from "../../../../../interfaces.js";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,
} from "../../../BD/SQL_Utilizatori/utilizatori.js";
import {
  validareUtilizator,
  verificareIntegritati,
} from "../../../middlewares/validareDate.js";
import {
  crearePersoana,
  creareUtilizator,
} from "../../../../client/utils/Utilizatori.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  criptareDate,
  validareUtilizator,
  verificareIntegritati,
  async (request: Request, response: Response) => {
    const utilizator: Utilizator = creareUtilizator(request.body.data);
    const persoana: Persoana = crearePersoana(request.body.data);

    try {
      await adaugaUtilizator(utilizator);
    } catch (eroare) {
      console.log("A existat o problemă la adăugarea utilizatorului", eroare);
    }

    const id: number = await getIdUtilizator(utilizator.username);
    persoana.idUtilizator = id;

    try {
      await adaugaPersoana(persoana);
    } catch (eroare) {
      console.log(
        "A existat probleme la adăugarea persoanei în baza de date ",
        eroare
      );
    }
  }
);

export default router;
