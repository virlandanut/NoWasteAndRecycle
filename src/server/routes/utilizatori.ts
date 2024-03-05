import express, { Router } from "express";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,
  getUtilizator,
  getUtilizatori,
} from "../BD/SQL_Utilizatori/utilizatori.js";
import { Persoana, Utilizator } from "../interfaces.js";
import { criptareParola } from "../BD/Bcrypt/criptare.js";
import criptareDate from "../middlewares/criptareDate.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

router.post("/persoana/new", criptareDate, async (request, response) => {
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

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

export default router;
