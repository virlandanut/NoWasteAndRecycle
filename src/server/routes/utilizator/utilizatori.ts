import express, { Router, Request, Response } from "express";
import rutaPersoana from "./Persoana/Persoana.js";
import rutaFirma from "./Firma/Firma.js";
import bcrypt from "bcrypt";
import session from "express-session";
import {
  getAuthUtilizator,
  getFirma,
  getParolaUtilizator,
  getPersoanaFizica,
  getRolPersoana,
  getUtilizator,
  getUtilizatorCuLocalitate,
  getUtilizatori,
  schimbaParolaUtilizator,
  verificareTipUtilizator,
} from "../../DB/SQL_Utilizatori/SQL_Utilizatori.js";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import {
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
} from "../../Middlewares/Middlewares_Autorizare.js";
import { comparaParole } from "../../Utils/Validari.js";
import { Utilizator } from "../../Interfete/Interfete_Utilizator.js";
import { validareSchimbareParola } from "../../Middlewares/Middlewares_SchimbareParola.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

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
    if (!utilizator || !utilizator.id_utilizator) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    const comparareParole = await comparaParole(parola, utilizator.parola);

    if (!comparareParole) {
      return response.status(401).json({ eroare: "Datele sunt incorecte!" });
    }
    const { parola: _, ...utilizatorFaraParola } = utilizator;
    const tip = await verificareTipUtilizator(utilizator.id_utilizator);
    if (tip !== 0) {
      const utilizatorSesiune = { ...utilizatorFaraParola, rol: "firma" };
      request.session.user = utilizatorSesiune;
    } else {
      const rolPersoana = await getRolPersoana(utilizator.id_utilizator);
      const utilizatorSesiune = { ...utilizatorFaraParola, rol: rolPersoana };
      request.session.user = utilizatorSesiune;
    }
    console.log(request.session.user);
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

router.post(
  "/update/parola",
  esteAutentificat,
  validareSchimbareParola,
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
    const { idUtilizator, parolaVeche, parolaNoua } = request.body;
    const parolaExistenta = await getParolaUtilizator(idUtilizator);
    const esteAceeasiParola = await comparaParole(parolaVeche, parolaExistenta);
    if (esteAceeasiParola) {
      const parolaCriptata = await bcrypt.hash(parolaNoua, 10);
      await schimbaParolaUtilizator(idUtilizator, parolaCriptata);
      return response.status(200).json({ parolaActualizata: "true" });
    } else {
      return response
        .status(401)
        .json({ mesaj: "Parola curentă nu este eronată!" });
    }
  })
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
  "/getUtilizator",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const utilizatorSesiune = (request.session as any).user;
    const utilizator = await getUtilizatorCuLocalitate(
      utilizatorSesiune.id_utilizator
    );
    const tipUtilizator: number = await verificareTipUtilizator(
      utilizatorSesiune.id_utilizator
    );

    if (tipUtilizator !== 0) {
      const firma = await getFirma(utilizatorSesiune.id_utilizator);
      return response.status(200).json({ utilizator, firma, mesaj: "Firma" });
    } else {
      const persoana = await getPersoanaFizica(utilizatorSesiune.id_utilizator);
      return response
        .status(200)
        .json({ utilizator, persoana, mesaj: "Persoana" });
    }
  })
);

router.get(
  "/getIdUtilizatorCurent",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const utilizatorSesiune = (request.session as any).user;
    if (utilizatorSesiune) {
      return response.status(200).json({ id: utilizatorSesiune.id_utilizator });
    }
    return response.status(404).json({ mesaj: "Acest utilizator nu există!" });
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
