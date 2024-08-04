import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  adaugaPreturi,
  getAllDatesInRange,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { ContainerNou, Coordonate, Tip } from "../Interfete.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { adaugaContainer } from "../CRUD/Create.js";
import { getIdContainer } from "../CRUD/Read.js";
import {
  getContainereInchiriereInchirieri,
  getContainerInchiriere,
  getContractInchiriereDepozitare,
  getNumarRecenzii,
  getRatingContainer,
  getRecenzii,
} from "./CRUD/Read.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import { ContainerDepozitareFrontEnd, RecenzieContainer } from "./Interfete.js";
import {
  Container_inchiriere_depozitare,
  Contract_inchiriere,
  Firma,
  Persoana_fizica,
  Recenzie,
  Utilizator,
} from "@prisma/client";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import { verificareExistentaRecenzie } from "../../Recenzie/CRUD/Read.js";
import { getFirma } from "../../Utilizator/Firma/CRUD/Read.js";
import { getPersoanaFizica } from "../../Utilizator/Persoana/CRUD/Read.js";
import cloudinary from "../../../Servicii/serviciu-cloudinary.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) => {
    const {
      denumire,
      capacitate,
      strada,
      numar,
      descriere,
      localitate,
      poza,
      codPostal,
    }: ContainerDepozitareFrontEnd = request.body.data;
    const utilizator = request.session.utilizator;
    if (!utilizator) {
      return response.status(409).json({
        mesaj: "Neautorizat!",
      });
    }
    const coordonate: Coordonate = await getCoordonate(
      `${numar} ${strada} ${localitate} ${codPostal} România`
    );

    const raspunsCloudinary = await cloudinary.uploader.upload(poza, {
      upload_preset: "containerDepozitare",
    });

    const idLocalitate = await getIdLocalitate(localitate);

    const container: ContainerNou = {
      denumire: denumire,
      capacitate: parseInt(capacitate),
      strada: strada,
      numar: numar,
      descriere: descriere,
      firma: utilizator.id_utilizator,
      poza: raspunsCloudinary.url,
      localitate: idLocalitate,
      lat: coordonate.latitudine,
      long: coordonate.longitudine,
    };

    await adaugaContainer(container, Tip.FIX);
    const id_container: number = await getIdContainer(container.denumire);

    await adaugaPreturi(id_container, request.body.data);

    return response.status(200).json({
      id_container: id_container,
      mesaj: "Container reciclare adaugat cu success!",
    });
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const container = await getContainerInchiriere(id);
    if (container) {
      return response.send(container);
    }
    return response
      .status(404)
      .json({ mesaj: "Container-ul de depozitare nu a fost găsit!" });
  })
);

router.get(
  "/:id/inchirieri",
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const containereDepozitare: Container_inchiriere_depozitare[] =
      await getContainereInchiriereInchirieri(id);

    const toateDateleInchiriere: Set<string> = new Set();

    containereDepozitare.forEach((container) => {
      const containerDataInceput =
        container.data_inceput.toLocaleDateString("ro-RO");
      const containerDataSfarsit =
        container.data_sfarsit.toLocaleDateString("ro-RO");

      const dataInceput = dayjs.utc(containerDataInceput, "DD.MM.YYYY");
      const dataSfarsit = dayjs.utc(containerDataSfarsit, "DD.MM.YYYY");

      const rangeData = getAllDatesInRange(dataInceput, dataSfarsit);
      rangeData.forEach((data) => toateDateleInchiriere.add(data));
    });

    return response.json(Array.from(toateDateleInchiriere));
  })
);

router.get(
  "/:id/contract",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const contract: Contract_inchiriere =
      await getContractInchiriereDepozitare(id);

    return response.status(200).json(contract);
  })
);

router.get(
  "/:id/recenzie",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const recenzie: Recenzie | null = await verificareExistentaRecenzie(id);
    if (recenzie) {
      return response
        .status(500)
        .json({ mesaj: "Acest container are deja o recenzie!" });
    }
    return response
      .status(200)
      .json({ mesaj: "Acest container nu are o recenzie!" });
  })
);

router.get(
  "/:id/rating",
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const rating: number | null = await getRatingContainer(id);
    if (!rating) {
      return response.status(200).json({ rating: 0, numarRecenzii: 0 });
    } else {
      const numarRecenzii: number | null = await getNumarRecenzii(id);
      return response.status(200).json({ rating, numarRecenzii });
    }
  })
);

router.get(
  "/:id/recenzii",
  // esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);

    const recenzii: RecenzieContainer[] = await getRecenzii(id);
    if (!recenzii || recenzii.length === 0) {
      return response.status(200).json({ recenzii: false });
    }
    const recenziiContainer = await Promise.all(
      recenzii.map(async (recenzie: RecenzieContainer) => {
        const proprietarRecenzie: Utilizator =
          recenzie.Container_inchiriere.Utilizator;
        let denumire: string;
        let cnp: string = "";

        if (proprietarRecenzie.rol === "FIRMA") {
          const firma: Firma = await getFirma(proprietarRecenzie.id_utilizator);
          denumire = firma.denumire_firma;
        } else {
          const persoana: Persoana_fizica = await getPersoanaFizica(
            proprietarRecenzie.id_utilizator
          );
          denumire = `${persoana.nume} ${persoana.prenume}`;
          cnp = persoana.cnp;
        }

        return {
          id: recenzie.id_recenzie,
          idUtilizator: proprietarRecenzie.id_utilizator,
          rating: recenzie.scor,
          denumire,
          poza: proprietarRecenzie.poza,
          cnp,
          rol: proprietarRecenzie.rol,
          mesaj: recenzie.mesaj,
          dataAchizitie: new Date(
            recenzie.Container_inchiriere.data_inceput
          ).toLocaleDateString("ro-RO"),
          dataPostare: new Date(recenzie.data_adaugare).toLocaleDateString(
            "ro-RO"
          ),
        };
      })
    );
    return response.status(200).json(recenziiContainer);
  })
);

export default router;
