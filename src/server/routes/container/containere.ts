import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import rutaContainerReciclare from "./Reciclare/containerReciclare.js";
import rutaContainerInchiriere from "./Inchiriere/containerInchiriere.js";
import rutaContainerMaterialeConstructii from "./MaterialeConstructii/containerMaterialeConstructii.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import {
  validareSDContainer,
  verificareEligibilitateStergere,
  verificareIntegritatiSDContainer,
  verificareProprietarSauAdmin,
} from "./Middlewares/Middlewares.js";
import { esteProprietar } from "../Utilizator/Firma/Middlewares/Middlewares.js";
import { ContainerController } from "../../Controllers/ContainerController.js";
import { getPreturiCon } from "../../Controllers/IstoricPretController.js";
import { generareRutaOptima } from "../../Utils/GA/GA.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.use("/containerReciclare", rutaContainerReciclare);
router.use("/containerInchiriere", rutaContainerInchiriere);
router.use("/containerMaterialeConstructii", rutaContainerMaterialeConstructii);

const containerController = new ContainerController();

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    containerController.getContainere(request, response)
  )
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) =>
    containerController.getContainer(request, response)
  )
);

router.get(
  "/:id/status",
  catchAsync(async (request: Request, response: Response) =>
    containerController.getStatusContainer(request, response)
  )
);

router.get(
  "/:id/preturi",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getPreturiCon(request, response)
  )
);

router.put(
  "/actualizeazaStatus",

  esteAutentificat,
  verificareProprietarSauAdmin,

  catchAsync(async (request: Request, response: Response) =>
    containerController.updateStatusCon(request, response)
  )
);

router.put(
  "/",
  verificareProprietarSauAdmin,
  validareSDContainer,
  verificareIntegritatiSDContainer,
  catchAsync(async (request: Request, response: Response) =>
    containerController.updateContainer(request, response)
  )
);

router.delete(
  "/",
  esteAutentificat,
  verificareProprietarSauAdmin,
  verificareEligibilitateStergere,
  catchAsync(async (request: Request, response: Response) =>
    containerController.deleteContainer(request, response)
  )
);

router.post(
  "/filtrare",
  catchAsync(async (request: Request, response: Response) =>
    containerController.filtrareContainere(request, response)
  )
);

export default router;
