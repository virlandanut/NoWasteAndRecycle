import express, { Router, Request, Response } from "express";
import rutaPersoana from "./persoana/persoana.js";
import rutaFirma from "../../routes/utilizator/firma/firma.js";
import session from "express-session";
import {
  getAuthUtilizator,
  getUtilizator,
  getUtilizatori,
  verificareTipUtilizator,
} from "../../BD/SQL_Utilizatori/utilizatori.js";
import { catchAsync } from "../../utils/CatchAsync.js";
import { esteLogat } from "../../middlewares/validareDate.js";
import { comparaParole } from "../../BD/Bcrypt/criptare.js";
import { Utilizator } from "../../../../interfaces.js";

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

router.get("/logout", esteLogat, (request: Request, response: Response) => {
  request.session.destroy((eroare) => {
    if (eroare) {
      response.status(500).json({ eroare: "Eroare de server" });
    } else {
      response.status(200).json({ success: true, message: "Logged out" });
    }
  });
});

router.get("/esteLogat", esteLogat, (request: Request, response: Response) => {
  response
    .status(200)
    .json({ success: true, message: "Utilizatorul este logat" });
});

router.get(
  "/rol",
  catchAsync(async (request: Request, response: Response) => {
    const utilizator = (request.session as any).user;
    if (!utilizator) {
      return response
        .status(404)
        .json({ eroare: "Utilizatorul nu a fost găsit!" });
    }
    const esteFirma = await verificareTipUtilizator(utilizator.id_utilizator);
    if (esteFirma === 0) {
      return response
        .status(401)
        .json({ success: false, message: "Utilizatorul nu este firmă" });
    }
    return response
      .status(200)
      .json({ success: true, message: "Utilizatorul este firma" });
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
