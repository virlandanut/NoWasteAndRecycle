import express, { Router } from "express";
import {
  getUtilizator,
  getUtilizatori,
} from "../BD/SQL_Utilizatori/utilizatori.js";

const router: Router = express.Router({ mergeParams: true });

router.get("/", async (_, response) => {
  const rezultat = await getUtilizatori();
  response.json(rezultat?.recordset);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const rezultat = await getUtilizator(id);
  response.json(rezultat?.recordset);
});

export default router;
