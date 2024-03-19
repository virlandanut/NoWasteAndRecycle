import express, { Router } from "express";
import rutaPersoana from "../../routes/utilizator/persoana/persoana.js";
import rutaFirma from "../../routes/utilizator/firma/firma.js";
import {
  getUtilizator,
  getUtilizatori,
} from "../../BD/SQL_Utilizatori/utilizatori.js";
import { catchAsync } from "../../utils/CatchAsync.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (_, response) => {
    const rezultat = await getUtilizatori();
    response.json(rezultat?.recordset);
  })
);

router.get(
  "/:id",
  catchAsync(async (request, response) => {
    const { id } = request.params;
    const rezultat = await getUtilizator(id);
    response.json(rezultat?.recordset);
  })
);

router.use("/persoana", rutaPersoana);
router.use("/firma", rutaFirma);

export default router;
