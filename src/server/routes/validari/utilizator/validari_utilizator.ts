import express, { Request, Response, Router } from "express";
import {
  validareCIF,
  validareCNP,
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../../../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import { catchAsync } from "../../../middlewares/Middlewares_CatchAsync.js";
import { ExpressError } from "../../../utils/ExpressError.js";
import { comparaParole } from "../../../utils/Validari.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/nume_utilizator",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator } = request.query;
    if (typeof nume_utilizator !== "string") {
      throw new ExpressError("Numele de utilizator este invalid!", 400);
    }
    const countUsername: number = await validareUsername(nume_utilizator);
    if (countUsername > 0) {
      response
        .status(409)
        .json({ mesaj: "Acest nume de utilizator există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

router.get(
  "/cnp",
  catchAsync(async (request: Request, response: Response) => {
    const { cnp } = request.query;
    if (typeof cnp !== "string") {
      throw new ExpressError("CNP-ul este invalid", 400);
    }
    const countCNP = await validareCNP(cnp);
    if (countCNP > 0) {
      response.status(409).json({ mesaj: "Acest CNP există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

router.get(
  "/telefon",
  catchAsync(async (request: Request, response: Response) => {
    const { telefon } = request.query;
    if (typeof telefon !== "string") {
      throw new ExpressError("Număr de telefon invalid!", 400);
    }

    const countTelefon = await validareTelefon(telefon);
    if (countTelefon > 0) {
      response.status(409).json({ mesaj: "Acest telefon există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

router.get(
  "/email",
  catchAsync(async (request: Request, response: Response) => {
    const { email } = request.query;
    if (typeof email !== "string") {
      throw new ExpressError("Adresa de email este invalidă!", 400);
    }

    const countEmail = await validareEmail(email);
    if (countEmail > 0) {
      response.status(409).json({ mesaj: "Acest email există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

router.get(
  "/cif",
  catchAsync(async (request: Request, response: Response) => {
    const { cif } = request.query;
    if (typeof cif !== "string") {
      throw new ExpressError("CIF-ul este invalid!", 400);
    }

    const countCIF = await validareCIF(cif);
    if (countCIF > 0) {
      response.status(409).json({ mesaj: "Acest CIF există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

export default router;
