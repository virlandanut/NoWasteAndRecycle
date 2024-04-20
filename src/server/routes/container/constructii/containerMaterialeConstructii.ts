import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../middlewares/Middlewares_CatchAsync.js";
import {
  Container,
  Coordonate,
} from "../../../../interfaces/Interfete_Container.js";
import {
  adaugaPreturi,
  creareContainer,
  getCoordonate,
} from "../../../utils/Functii/Functii_containere.js";
import { getIdLocalitate } from "../../../BD/SQL_Localitati/SQL_Localitati.js";
import {
  adaugaContainer,
  getIdContainer,
} from "../../../BD/SQL_Containere/SQL_Containere.js";
import { adaugaTipContainer } from "../../../BD/SQL_TipuriContainer/SQL_TipuriContainer.js";
import {
  esteAutentificat,
  esteFirma,
  esteFirmaAprobata,
} from "../../../middlewares/Middlewares_Autorizare.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../../../middlewares/Middlewares_Container.js";

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
    const firma = (request.session as any).user;
    const coordonate: Coordonate = await getCoordonate(
      `${request.body.data.numar} ${request.body.data.strada}, ${request.body.data.localitate}, România`
    );


    const container: Container = creareContainer(request.body.data);
    container.firma = firma.id_utilizator;
    container.localitate = await getIdLocalitate(request.body.data.localitate);
    container.latitudine = coordonate.latitudine;
    container.longitudine = coordonate.longitudine;

    await adaugaContainer(container);
    const id_container: number = await getIdContainer(container.denumire);

    await adaugaTipContainer(id_container, 1011);
    await adaugaPreturi(id_container, request.body.data);

    response.status(200).json({
      id_container: id_container,
      mesaj: "Container materiale de construcții adăugat cu succes!",
    });
  })
);

export default router;
