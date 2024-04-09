import express, { Router, Request, Response } from "express";
import rutaPersoana from "./persoana/persoana.js";
import rutaFirma from "../../routes/utilizator/firma/firma.js";
import session from "express-session";
import {
  getAuthUtilizator,
  getUtilizator,
  getUtilizatori,
  verificareStatusAprobareFirma,
  verificareTipUtilizator,
} from "../../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import { catchAsync } from "../../middlewares/Middlewares_CatchAsync.js";
import {
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
} from "../../middlewares/Middlewares_Autorizare.js";
import { comparaParole } from "../../utils/Validari.js";
import { Utilizator } from "../../../interfaces/Interfete_Utilizator.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

router.get(
  "/",
  catchAsync(async (_, response) => {
    const rezultat = await getUtilizatori();
    response.json(rezultat.recordset);
  })
);

router.post(
  "/login",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator, parola } = request.body;
    const utilizator: Utilizator = await getAuthUtilizator(nume_utilizator);
    if (!utilizator) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    const comparareParole = await comparaParole(parola, utilizator.parola);

    if (!comparareParole) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    (request.session as any).user = utilizator;
    response.status(200).json({ success: true, message: "Login successful" });
  })
);

router.get(
  "/logout",
  esteAutentificat,
  (request: Request, response: Response) => {
    request.session.destroy((eroare) => {
      if (eroare) {
        response.status(500).json({ eroare: "Eroare de server" });
      } else {
        response.status(200).json({ success: true, message: "Logged out" });
      }
    });
  }
);

router.get(
  "/esteLogat",
  esteAutentificat,
  (request: Request, response: Response) => {
    response
      .status(200)
      .json({ success: true, message: "Utilizatorul este logat" });
  }
);

router.get(
  "/esteFirma",
  esteAutentificat,
  esteFirma,
  catchAsync(async (request: Request, response: Response) => {
    return response
      .status(200)
      .json({ success: true, message: "Utilizatorul este firma" });
  })
);

router.get(
  "/esteFirmaAprobata",
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
  catchAsync(async (request: Request, response: Response) => {
    return response
      .status(200)
      .json({ success: true, message: "Utilizatorul este aprobat" });
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
