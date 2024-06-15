import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import {
  validareCIF,
  validareCNP,
  validareEmail,
  validareEmailSchimbareDate,
  validareTelefon,
  validareTelefonSchimbareDate,
  validareUsername,
  validareUsernameSchimbareDate,
} from "./CRUD/Read.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/nume_utilizator",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator } = request.query;
    if (typeof nume_utilizator !== "string") {
      throw new ExpressError("Numele de utilizator este invalid!", 400);
    }
    if (request.session.user && request.session.user.id_utilizator) {
      const countUsername: number = await validareUsernameSchimbareDate(
        request.session.user.id_utilizator,
        nume_utilizator
      );
      if (countUsername > 0) {
        return response
          .status(409)
          .json({ mesaj: "Acest nume de utilizator există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const countUsername: number = await validareUsername(nume_utilizator);
      if (countUsername > 0) {
        return response
          .status(409)
          .json({ mesaj: "Acest nume de utilizator există deja" });
      } else {
        return response.sendStatus(200);
      }
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

    if (request.session.user && request.session.user.id_utilizator) {
      const countTelefon = await validareTelefonSchimbareDate(
        request.session.user.id_utilizator,
        telefon
      );
      if (countTelefon > 0) {
        return response
          .status(409)
          .json({ mesaj: "Acest telefon există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const countTelefon = await validareTelefon(telefon);
      if (countTelefon > 0) {
        return response
          .status(409)
          .json({ mesaj: "Acest telefon există deja" });
      } else {
        return response.sendStatus(200);
      }
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
    if (request.session.user && request.session.user.id_utilizator) {
      const countEmail = await validareEmailSchimbareDate(
        request.session.user.id_utilizator,
        email
      );
      if (countEmail > 0) {
        return response.status(409).json({ mesaj: "Acest email există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const countEmail = await validareEmail(email);
      if (countEmail > 0) {
        return response.status(409).json({ mesaj: "Acest email există deja" });
      } else {
        return response.sendStatus(200);
      }
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
