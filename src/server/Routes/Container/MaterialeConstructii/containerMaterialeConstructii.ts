import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  adaugaPreturi,
  creareContainer,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { Container, Coordonate } from "../Interfete.js";
import { getIdLocalitate } from "../../Localitati/CRUD/Read.js";
import { adaugaContainer } from "../CRUD/Create.js";
import { getIdContainer } from "../CRUD/Read.js";
import { getContainerMaterialeConstructii } from "./CRUD/Read.js";
import { adaugaTipContainer } from "../../TipuriContainer/CRUD/Create.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import {
  esteFirma,
  esteFirmaAprobata,
} from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

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

      await adaugaTipContainer(id_container, 1011);
      await adaugaPreturi(id_container, request.body.data);

      return response.status(200).json({
        id_container: id_container,
        mesaj: "Container materiale de construcții adăugat cu succes!",
      });
    } else {
      return response
        .status(400)
        .json({ mesaj: "Container-ul de construcții nu a putut fi adăugat!" });
    }
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const container = await getContainerMaterialeConstructii(parseInt(id));
    if (container) {
      return response.send(container);
    }
    return response.status(404).json({
      mesaj: "Container-ul de reciclare materiale construcții nu a fost găsit!",
    });
  })
);

export default router;
