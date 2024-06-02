import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares_CatchAsync.js";
import {
  Container,
  Coordonate,
} from "../../../Interfete/Interfete_Container.js";
import {
  adaugaPreturi,
  creareContainer,
  getCoordonate,
} from "../../../Utils/Functii/Functii_containere.js";
import { getIdLocalitate } from "../../../DB/SQL_Localitati/SQL_Localitati.js";
import {
  adaugaContainer,
  getContainerInchiriere,
  getIdContainer,
} from "../../../DB/SQL_Containere/SQL_Containere.js";
import {
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
} from "../../../Middlewares/Middlewares_Autorizare.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../../../Middlewares/Middlewares_Container.js";

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

      await adaugaPreturi(id_container, request.body.data);

      return response.status(200).json({
        id_container: id_container,
        mesaj: "Container reciclare adaugat cu success!",
      });
    } else {
      return response.status(400).json({
        mesaj: "Containerul de reciclare nu a putut fi adăugat!",
      });
    }
  })
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const container = await getContainerInchiriere(parseInt(id));
    if (container) {
      return response.send(container);
    }
    return response
      .status(404)
      .json({ mesaj: "Container-ul de depozitare nu a fost găsit!" });
  })
);

export default router;
