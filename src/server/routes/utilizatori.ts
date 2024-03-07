import express, { Router } from "express";
import {
  adaugaPersoana,
  adaugaUtilizator,
  getIdUtilizator,
  getUtilizator,
  getUtilizatori,
  validareCNP,
  validareTelefon,
  validareUsername,
} from "../BD/SQL_Utilizatori/utilizatori.js";
import { Persoana, Utilizator } from "../interfaces.js";
import criptareDate from "../middlewares/criptareDate.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

router.post("/persoana/new", criptareDate, async (request, _) => {
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

router.get("/persoana/validare", async (request, response) => {
  const { username, CNP, telefon, email } = request.query;
  if (typeof username !== "string") {
    return response.status(400).json({ error: "Username Invalid" });
  }

  if (typeof CNP !== "string") {
    return response.status(400).json({ error: "CNP Invalid" });
  }

  if (typeof telefon !== "string") {
    return response.status(400).json({ error: "Telefon Invalid" });
  }

  if (typeof email !== "string") {
    return response.status(400).json({ error: "Email Invalid" });
  }

  try {
    const validareUN= await validareUsername(username);
    const validareCodNum = await validareCNP(CNP);
    const validareTlf = await validareTelefon(telefon);
    //response.json(validare);
  } catch (eroare) {
    response
      .status(500)
      .json({ eroare: "Au existat probleme la validarea username-ului" });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

export default router;
