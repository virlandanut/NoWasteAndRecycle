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
} from "./Middlewares/Middlewares.js";
import { esteProprietar } from "../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  deleteContainer,
  filtrareContainere,
  getContainer,
  getContainere,
  getStatusContainer,
  updateContainer,
  updateStatusCon,
} from "../../Controllers/ContainerController.js";
import { getPreturiCon } from "../../Controllers/IstoricPretController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.use("/containerReciclare", rutaContainerReciclare);
router.use("/containerInchiriere", rutaContainerInchiriere);
router.use("/containerMaterialeConstructii", rutaContainerMaterialeConstructii);

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    getContainere(request, response)
  )
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) =>
    getContainer(request, response)
  )
);

router.get(
  "/:id/status",
  catchAsync(async (request: Request, response: Response) =>
    getStatusContainer(request, response)
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
  catchAsync(async (request: Request, response: Response) =>
    updateStatusCon(request, response)
  )
);

router.put(
  "/",
  esteProprietar,
  validareSDContainer,
  verificareIntegritatiSDContainer,
  catchAsync(async (request: Request, response: Response) =>
    updateContainer(request, response)
  )
);

router.delete(
  "/",
  verificareEligibilitateStergere,
  catchAsync(async (request: Request, response: Response) =>
    deleteContainer(request, response)
  )
);

router.post(
  "/filtrare",
  catchAsync(async (request: Request, response: Response) =>
    filtrareContainere(request, response)
  )
);

export default router;
