import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  adaugaContainerMateriale,
  getContainerMateriale,
  getInchirieriContainerMateriale,
} from "../../../Controllers/ContainerMaterialeController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) =>
    adaugaContainerMateriale(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getContainerMateriale(request, response)
  )
);

router.get(
  "/:id/inchirieri",
  catchAsync(async (request: Request, response: Response) =>
    getInchirieriContainerMateriale(request, response)
  )
);

export default router;
