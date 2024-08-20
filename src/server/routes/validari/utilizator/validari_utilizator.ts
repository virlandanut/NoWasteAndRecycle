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
import { Firma, Persoana_fizica, Utilizator } from "@prisma/client";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/nume_utilizator",
  catchAsync(async (request: Request, response: Response) => {
    const { nume_utilizator } = request.query;
    if (typeof nume_utilizator !== "string") {
      throw new ExpressError("Numele de utilizator este invalid!", 400);
    }
    if (request.session.utilizator) {
      const utilizator: Utilizator | null = await validareUsernameSchimbareDate(
        request.session.utilizator.id_utilizator,
        nume_utilizator
      );
      if (utilizator) {
        return response
          .status(409)
          .json({ mesaj: "Acest nume de utilizator există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const utilizator: Utilizator | null =
        await validareUsername(nume_utilizator);
      if (utilizator) {
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
      throw new ExpressError("CNP-ul este invalid", 500);
    }
    const persoana: Persoana_fizica | null = await validareCNP(cnp);
    if (persoana) {
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

    if (request.session.utilizator) {
      const utilizator: Utilizator | null = await validareTelefonSchimbareDate(
        request.session.utilizator.id_utilizator,
        telefon
      );
      if (utilizator) {
        return response
          .status(409)
          .json({ mesaj: "Acest telefon există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const utilizator: Utilizator | null = await validareTelefon(telefon);
      if (utilizator) {
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
    if (request.session.utilizator) {
      const utilizator: Utilizator | null = await validareEmailSchimbareDate(
        request.session.utilizator.id_utilizator,
        email
      );
      if (utilizator) {
        return response.status(409).json({ mesaj: "Acest email există deja" });
      } else {
        return response.sendStatus(200);
      }
    } else {
      const utilizator: Utilizator | null = await validareEmail(email);
      if (utilizator) {
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

    const firma: Firma | null = await validareCIF(cif);
    if (firma) {
      response.status(409).json({ mesaj: "Acest CIF există deja" });
    } else {
      response.sendStatus(200);
    }
  })
);

export default router;
