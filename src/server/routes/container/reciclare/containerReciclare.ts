import express, { Router, Request, Response } from "express";
import {
  adaugaPreturi,
  getAllDatesInRange,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  ContainerNou,
  ContainerReciclareFrontEnd,
  Coordonate,
  DateContainerFrontEnd,
  Tip,
} from "../Interfete.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import { adaugaContainer } from "../CRUD/Create.js";
import { getIdContainer } from "../CRUD/Read.js";
import {
  getContainerReciclare,
  getContainereReciclare,
  getContainereReciclareFiltrate,
  getInchirieriContainerReciclare,
} from "./CRUD/Read.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import { Container_inchiriere_reciclare } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const containereReciclare = await getContainereReciclare();
    response.send({
      containereReciclare,
    });
  })
);

router.get(
  "/filtrare",
  catchAsync(async (request: Request, response: Response) => {
    const { tip, latitudine, longitudine } = request.params;
    const containereReciclare = await getContainereReciclareFiltrate(tip);
  })
);

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
    const {
      denumire,
      capacitate,
      tip,
      strada,
      numar,
      localitate,
      descriere,
    }: ContainerReciclareFrontEnd = request.body.data;
    const utilizator = request.session.utilizator;
    if (!utilizator) {
      return response.status(409).json({ mesaj: "Neautorizat!" });
    }
    const coordonate: Coordonate = await getCoordonate(
      `${numar} ${strada}, ${localitate}, România`
    );

    const idLocalitate = await getIdLocalitate(localitate);

    const container: ContainerNou = {
      denumire: denumire,
      capacitate: parseInt(capacitate),
      strada: strada,
      numar: numar,
      descriere: descriere,
      firma: utilizator.id_utilizator,
      localitate: idLocalitate,
      lat: coordonate.latitudine,
      long: coordonate.longitudine,
    };

    await adaugaContainer(container, Tip.RECICLARE, tip);
    const id_container: number = await getIdContainer(container.denumire);

    await adaugaPreturi(id_container, request.body.data);

    return response.status(200).json({
      id_container: id_container,
      mesaj: "Container închiriere adaugat cu success!",
    });
  })
);

router.post(
  "/inchiriere",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    console.log(request.body);
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const container = await getContainerReciclare(id);
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
    const containereReciclare: Container_inchiriere_reciclare[] =
      await getInchirieriContainerReciclare(id);

    const toateDateleInchiriere: Set<string> = new Set();

    containereReciclare.forEach((container) => {
      const containerDataInceput =
        container.data_inceput.toLocaleDateString("ro-RO");
      const containerDataSfarsit =
        container.data_sfarsit.toLocaleDateString("ro-RO");

      const dataInceput = dayjs.utc(containerDataInceput, "DD.MM.YYYY");
      const dataSfarsit = dayjs.utc(containerDataSfarsit, "DD.MM.YYYY");

      console.log(dataInceput);
      console.log(dataSfarsit);

      const rangeData = getAllDatesInRange(dataInceput, dataSfarsit);
      rangeData.forEach((data) => toateDateleInchiriere.add(data));
    });

    return response.json(Array.from(toateDateleInchiriere));
  })
);

export default router;
