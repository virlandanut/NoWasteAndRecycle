import express, { Router } from "express";
import criptareDate from "../../../middlewares/criptareDate.js";
import { Persoana, Utilizator } from "../../../interfaces.js";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,

} from "../../../BD/SQL_Utilizatori/utilizatori.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post("/new", criptareDate, async (request, _) => {
  const utilizator: Utilizator = request.body.utilizator;
  const persoana: Persoana = request.body.persoana;

  try {
    await adaugaUtilizator(utilizator);
  } catch (eroare) {
    console.log("A existat o problemă la adăugarea utilizatorului", eroare);
  }

  const id = await getIdUtilizator(utilizator.username);
  persoana.idUtilizator = id;

  try {
    await adaugaPersoana(persoana);
  } catch (eroare) {
    console.log(
      "A existat probleme la adăugarea persoanei în baza de date ",
      eroare
    );
  }
});

export default router;
