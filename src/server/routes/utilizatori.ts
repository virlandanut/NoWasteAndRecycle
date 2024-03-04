import express, { Router } from "express";
import {
  adaugaUtilizator,
  getUtilizator,
  getUtilizatori,
} from "../BD/SQL_Utilizatori/utilizatori.js";
import { Utilizator } from "../interfaces.js";
import { criptareParola } from "../BD/Bcrypt/criptare.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

router.post("/new", async (request, response) => {
  const utilizator: Utilizator = request.body;
  try {
    const parolaNoua = await criptareParola(utilizator.parola);
    utilizator.parola = parolaNoua;
    console.log(utilizator);
    await adaugaUtilizator(utilizator);
  } catch (eroare) {
    console.log("A existat o problemă la adăugarea utilizatorului", eroare);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

export default router;
