import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import {
  getMedieUtilizatori,
  getNumarUtilizatori,
} from "../Utilizator/CRUD/Read.js";
import {
  getMedieContainere,
  getNumarContainere,
} from "../Container/CRUD/Read.js";
import {
  getNumarFirmeInregistrate,
  getToateFirmele,
} from "../Utilizator/Firma/CRUD/Read.js";
import { getNumarPersoaneInregistrate } from "../Utilizator/Persoana/CRUD/Read.js";
import { getContainereInchiriereSapt } from "../Container/Inchiriere/CRUD/Read.js";
import { getContainereReciclareSapt } from "../Container/Reciclare/CRUD/Read.js";
import { getContainereMaterialeSapt } from "../Container/MaterialeConstructii/CRUD/Read.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import { esteAdministrator } from "./Middlewares/Middlewares.js";
import { MetriceContainere } from "../Container/Interfete.js";
import { MetriciFirma } from "../Utilizator/Firma/Interfete.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/portal/utilizatori",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const utilizatoriNoi: number = await getNumarUtilizatori();
    let medieUtilizatori: number = await getMedieUtilizatori();

    return response.status(200).json({ utilizatoriNoi, medieUtilizatori });
  })
);

router.get(
  "/portal/containere",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const containereNoi = await getNumarContainere();
    const medieContainere = await getMedieContainere();

    return response.status(200).json({ containereNoi, medieContainere });
  })
);

router.get(
  "/portal/utilizatoriSaptamana",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const firme = await getNumarFirmeInregistrate();
    const persoane = await getNumarPersoaneInregistrate();
    const numarFirme = firme.map((firma) => firma.numarFirme);
    const numarPersoane = persoane.map((persoana) => persoana.numarPersoane);
    const saptamana = firme.map((firma) =>
      firma.data_inscriere.toLocaleDateString()
    );

    return response.status(200).json({
      numarFirme,
      numarPersoane,
      saptamana,
    });
  })
);

router.get(
  "/portal/containereSaptamana",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const containereInchiriere: MetriceContainere[] =
      await getContainereInchiriereSapt();
    const numarContainereDepozitareFix = containereInchiriere.map(
      (container) => container.numarContainere
    );
    const containereReciclare: MetriceContainere[] =
      await getContainereReciclareSapt();
    const numarContainereReciclare = containereReciclare.map(
      (container) => container.numarContainere
    );
    const containereMateriale: MetriceContainere[] =
      await getContainereMaterialeSapt();
    const numarContainereDepozitareMobil = containereMateriale.map(
      (container) => container.numarContainere
    );
    const saptamana = containereMateriale.map((container) =>
      container.data_adaugare.toLocaleDateString()
    );
    return response.status(200).json({
      numarContainereDepozitareFix,
      numarContainereReciclare,
      numarContainereDepozitareMobil,
      saptamana,
    });
  })
);

router.get(
  "/portal/firme",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) => {
    const firme: MetriciFirma[] = await getToateFirmele();

    return response.status(200).json(firme);
  })
);

export default router;
