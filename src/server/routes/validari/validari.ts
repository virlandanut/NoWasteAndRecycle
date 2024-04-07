import express, { Request, Response, Router } from "express";
import {
  validareCIF,
  validareCNP,
  validareEmail,
  validareTelefon,
  validareUsername,
} from "../../BD/SQL_Utilizatori/SQL_Utilizatori.js";
import { catchAsync } from "../../middlewares/Middlewares_CatchAsync.js";
import { ExpressError } from "../../utils/ExpressError.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/nume_utilizator",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator } = request.query;
    if (typeof nume_utilizator !== "string") {
      throw new ExpressError("Numele de utilizator este invalid!", 400);
    }
    const countUsername = await validareUsername(nume_utilizator);
    response.json(countUsername);
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
    response.json(countCNP);
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
    response.json(countTelefon);
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
    response.json(countEmail);
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
    response.json(countCIF);
  })
);

export default router;
