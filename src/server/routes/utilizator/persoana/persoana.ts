import express, { Request, Response, Router } from "express";
import prisma from "../../../Prisma/client.js";
import ValidatorPersoana from "./Validator.js";
import {
  crearePersoana,
  creareUtilizator,
} from "../../../Utils/Functii/Functii_utilizatori.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { validareSDPersoana } from "./Middlewares.js";
import { DateExistentePersoana } from "./Interfete.js";
import {
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
} from "../Middlewares/Middlewares.js";
import MiddlewarPersoana from "./Middlewares.js";
import MiddlewareUtilizator from "../Middlewares/Middlewares.js";
import { Localitate, Persoana_fizica, Utilizator } from "@prisma/client";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  MiddlewareUtilizator.criptareParola,
  ValidatorPersoana.verificareCrearePersoana(),
  MiddlewarPersoana.handleValidationError,
  MiddlewareUtilizator.verificareIntegritatiUtilizator,
  MiddlewarPersoana.verificareIntegritatiPersoana,
  catchAsync(async (request: Request, response: Response) => {
    const utilizator = creareUtilizator(request.body);
    const persoana = crearePersoana(request.body);
    const localitate = await prisma.localitate.findUnique({
      where: { denumire_localitate: utilizator.localitate },
    });

    if (!localitate) {
      return response
        .status(404)
        .json({ eroare: "Localitatea nu a putut fi găsită!" });
    }

    const utilizatorNou = await prisma.utilizator.create({
      data: {
        ...utilizator,
        localitate: localitate.id_localitate,
        Persoana_fizica: {
          create: persoana,
        },
      },
    });

    if (utilizatorNou) {
      response
        .status(200)
        .json({ success: true, message: "Cont creat cu success!" });
    } else {
      response
        .status(500)
        .json({ success: false, message: "Contul nu a putut fi creat!" });
    }
  })
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDPersoana,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) => {
    const date: DateExistentePersoana = request.body.data;
    if (!request.session.utilizator) {
      return response
        .status(500)
        .json({ mesaj: "Datele contului nu au putut fi actualizate" });
    }

    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: { id_utilizator: request.session.utilizator.id_utilizator },
    });

    if (!utilizator) {
      return response
        .status(404)
        .json({ mesaj: "Utilizatorul nu există în baza de date" });
    }

    const localitate: Localitate | null = await prisma.localitate.findUnique({
      where: { denumire_localitate: date.localitate },
    });

    if (!localitate) {
      return response
        .status(404)
        .json({ mesaj: "Localitatea nu există în baza de date" });
    }
    await prisma.$transaction(async (prisma) => {
      const utilizatorActualizat = await prisma.utilizator.update({
        where: { id_utilizator: utilizator.id_utilizator },
        data: {
          email: date.email,
          nume_utilizator: date.nume_utilizator,
          telefon: date.telefon,
          strada: date.strada,
          numar: date.numar,
          localitate: localitate.id_localitate,
        },
      });

      request.session.utilizator = utilizatorActualizat;

      await prisma.persoana_fizica.update({
        where: { id_utilizator: utilizator.id_utilizator },
        data: {
          nume: date.nume,
          prenume: date.prenume,
        },
      });
    });

    return response
      .status(200)
      .json({ mesaj: "Datele contului au fost actualizate cu succes!" });
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const persoana: Persoana_fizica | null =
      await prisma.persoana_fizica.findUnique({ where: { id_utilizator: id } });
    if (persoana) {
      return response.status(200).json(persoana);
    } else {
      return response
        .status(404)
        .json({ mesaj: "Această persoană nu există!" });
    }
  })
);

router.get(
  "/:id/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    if (!id) {
      return response.status(500).json({
        mesaj: "Datele curente ale persoanei nu au putut fi obținute",
      });
    }

    const utilizator = await prisma.utilizator.findUnique({
      where: { id_utilizator: id },
      select: {
        email: true,
        nume_utilizator: true,
        telefon: true,
        strada: true,
        numar: true,
        Persoana_fizica: {
          select: {
            nume: true,
            prenume: true,
          },
        },
        Localitate: {
          select: {
            denumire_localitate: true,
          },
        },
      },
    });
    if (!utilizator || !utilizator.Persoana_fizica || !utilizator.Localitate) {
      return response.status(500).json({
        mesaj: "Datele curente ale persoanei nu au putut fi obținute",
      });
    }

    const persoana = {
      nume: utilizator.Persoana_fizica.nume,
      prenume: utilizator.Persoana_fizica.prenume,
      email: utilizator.email,
      nume_utilizator: utilizator.nume_utilizator,
      telefon: utilizator.telefon,
      strada: utilizator.strada,
      numar: utilizator.numar,
      localitate: utilizator.Localitate.denumire_localitate,
    };
    response.status(200).json(persoana);
  })
);

export default router;
