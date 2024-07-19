import express, { Request, Response, Router } from "express";
import prisma from "../../../prisma/client.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  creareFirma,
  creareUtilizator,
} from "../../../Utils/Functii/Functii_utilizatori.js";
import {
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
} from "../Middlewares/Middlewares.js";

import { DateExistenteFirma } from "./Interfete.js";
import { validareSDFirma } from "./Middlewares/Middlewares.js";
import { modificaFirma, setDrepturiFirma } from "./CRUD/Update.js";
import { getCoduriCaen } from "../../Caen/CRUD/Read.js";
import { esteAdministrator } from "../../Administrator/Middlewares/Middlewares.js";
import MiddlewareUtilizator from "../Middlewares/Middlewares.js";
import MiddlewareFirma from "../Firma/Middlewares/Middlewares.js";
import ValidatorFirma from "../Firma/Validator.js";
import { Firma, Localitate, Utilizator } from "@prisma/client";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  MiddlewareUtilizator.criptareParola,
  ValidatorFirma.verificareCreareFirma(),
  MiddlewareFirma.handleValidationError,
  MiddlewareUtilizator.verificareIntegritatiUtilizator,
  MiddlewareFirma.verificareIntegritatiFirma,
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
    const utilizator = creareUtilizator(request.body);
    const firma = creareFirma(request.body);

    const localitate = await prisma.localitate.findUnique({
      where: { denumire_localitate: utilizator.localitate },
      select: { id_localitate: true },
    });

    if (!localitate) {
      return response
        .status(404)
        .json({ eroare: "Localitatea nu a putut fi găsită!" });
    }

    const caen = await prisma.caen.findUnique({
      where: { cod_caen: firma.caen },
      select: { id_caen: true },
    });

    if (!caen) {
      return response
        .status(404)
        .json({ eroare: "Codul CAEN mu a putut fi găsit!" });
    }

    console.log(localitate.id_localitate);
    console.log(caen.id_caen);

    const utilizatorNou = await prisma.utilizator.create({
      data: {
        ...utilizator,
        localitate: localitate.id_localitate,
        rol: "FIRMA",
        Firma: {
          create: {
            ...firma,
            caen: caen.id_caen,
          },
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
        .json({ success: false, message: "Contul nu a fost creat!" });
    }
  })
);

interface SchimbaDrepturiObj {
  id_utilizator: number;
  bifat: boolean;
}

router.post(
  "/schimbaDrepturi",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const { id_utilizator, bifat }: SchimbaDrepturiObj = request.body;
    await setDrepturiFirma(id_utilizator, bifat);
    response
      .status(200)
      .json({ mesaj: "Drepturile firmei au fost actualizate!" });
  })
);

router.get(
  "/getCoduriCaen",
  catchAsync(async (request: Request, response: Response) => {
    const coduriCaen = await getCoduriCaen();
    response.json(coduriCaen);
  })
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDFirma,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) => {
    const date: DateExistenteFirma = request.body.data;
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

      await prisma.firma.update({
        where: { id_utilizator: utilizator.id_utilizator },
        data: {
          denumire_firma: date.denumire_firma,
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
    const firma: Firma | null = await prisma.firma.findUnique({
      where: { id_utilizator: id },
    });
    if (firma) {
      return response.status(200).json(firma);
    } else {
      return response.status(404).json({ mesaj: "Această firmă nu există!" });
    }
  })
);

router.get(
  "/:id/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    if (
      !id ||
      !request.session.utilizator ||
      request.session.utilizator.id_utilizator !== id
    ) {
      return response.status(500).json({
        mesaj: "Datele curente ale firmei nu au putut fi obținute",
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
        Firma: {
          select: {
            denumire_firma: true,
          },
        },
        Localitate: {
          select: {
            denumire_localitate: true,
          },
        },
      },
    });
    if (!utilizator || !utilizator.Firma || !utilizator.Localitate) {
      return response.status(500).json({
        mesaj: "Datele curente ale firmei nu au putut fi obținute",
      });
    }

    const firma = {
      denumire_firma: utilizator.Firma.denumire_firma,
      email: utilizator.email,
      nume_utilizator: utilizator.nume_utilizator,
      telefon: utilizator.telefon,
      strada: utilizator.strada,
      numar: utilizator.numar,
      localitate: utilizator.Localitate.denumire_localitate,
    };
    return response.status(200).json(firma);
  })
);
export default router;
