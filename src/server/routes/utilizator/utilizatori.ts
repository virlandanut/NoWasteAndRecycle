import express, { Router } from "express";
import rutaPersoana from "../../routes/utilizator/persoana/persoana.js";
import {
  getUtilizator,
  getUtilizatori,
} from "../../BD/SQL_Utilizatori/utilizatori.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

router.use("/persoana", rutaPersoana);

export default router;
