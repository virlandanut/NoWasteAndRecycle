import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import { esteAdministrator } from "./Middlewares/Middlewares.js";
import {
  getUtilizatoriPortal,
  getUtilizatoriSaptamana,
} from "../../Controllers/UtilizatorController.js";
import { getFirme } from "../../Controllers/FirmaController.js";
import {
  getContainerePortal,
  getContainereSaptamana,
} from "../../Controllers/ContainerController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/portal/utilizatori",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getUtilizatoriPortal(request, response)
  )
);

router.get(
  "/portal/containere",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getContainerePortal(request, response)
  )
);

router.get(
  "/portal/utilizatoriSaptamana",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getUtilizatoriSaptamana(request, response)
  )
);

router.get(
  "/portal/containereSaptamana",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getContainereSaptamana(request, response)
  )
);

router.get(
  "/portal/firme",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getFirme(request, response)
  )
);

export default router;
