import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import { Raportare } from "./Interfete.js";
import { adaugaRaportProblema } from "./CRUD/Create/SQL.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  catchAsync(async (request: Request, response: Response) => {
    const raport: Raportare = request.body;
    await adaugaRaportProblema(raport);
    return response
      .status(200)
      .json({ mesaj: "Raportul a fost adăugat cu succes!" });
  })
);

export default router;
