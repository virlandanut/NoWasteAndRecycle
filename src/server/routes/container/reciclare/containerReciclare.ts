import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import {
  adaugaContainerReciclare,
  getConReciclare,
  getContainerRec,
  getContract,
  getInchirieri,
  getRutaOptima,
} from "../../../Controllers/ContainerReciclareController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    getConReciclare(request, response)
  )
);

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) =>
    adaugaContainerReciclare(request, response)
  )
);

router.post(
  "/rutaSofer",
  catchAsync(async (request: Request, response: Response) =>
    getRutaOptima(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getContainerRec(request, response)
  )
);

router.get(
  "/:id/inchirieri",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getInchirieri(request, response)
  )
);

router.get(
  "/:id/contract",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getContract(request, response)
  )
);

export default router;
