import express, { Router, Request, Response } from "express";
import {
  adaugaPreturi,
  creareContainer,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { Container, Coordonate } from "../Interfete.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import {
  esteFirma,
  esteFirmaAprobata,
} from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import { adaugaContainer } from "../CRUD/Create.js";
import { getIdContainer } from "../CRUD/Read.js";
import {
  getContainerReciclare,
  getContainereReciclare,
  getContainereReciclareFiltrate,
} from "./CRUD/Read.js";
import { getIdTipContainer } from "../../TipuriContainer/CRUD/Read.js";
import { adaugaTipContainer } from "../../TipuriContainer/CRUD/Create.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";

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
  "/new",
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) => {
    const firma = request.session.user;
    const coordonate: Coordonate = await getCoordonate(
      `${request.body.data.numar} ${request.body.data.strada}, ${request.body.data.localitate}, România`
    );

    const container: Container = creareContainer(request.body.data);
    if (firma) {
      container.firma = firma.id_utilizator;
      container.localitate = await getIdLocalitate(
        request.body.data.localitate
      );
      container.latitudine = coordonate.latitudine;
      container.longitudine = coordonate.longitudine;

      await adaugaContainer(container);
      const id_container: number = await getIdContainer(container.denumire);
      const tip_deseu: number = await getIdTipContainer(request.body.data.tip);

      await adaugaTipContainer(id_container, tip_deseu);
      await adaugaPreturi(id_container, request.body.data);

      return response.status(200).json({
        id_container: id_container,
        mesaj: "Container închiriere adaugat cu success!",
      });
    } else {
      return response.status(400).json({
        mesaj: "Containerul de închiriere nu a putut fi adăugat!",
      });
    }
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
    const { id } = request.params;
    const container = await getContainerReciclare(parseInt(id));
    if (container) {
      return response.send(container);
    }
    return response
      .status(404)
      .json({ mesaj: "Container-ul de depozitare nu a fost găsit!" });
  })
);

export default router;
