import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { esteAutentificat } from "../../Utilizator/Middlewares/Middlewares.js";
import { verificareFirma } from "../../Utilizator/Firma/Middlewares/Middlewares.js";
import {
  validareContainer,
  verificareIntegritatiContainer,
} from "../Middlewares/Middlewares.js";
import { ContainerDepozitareController } from "../../../Controllers/ContainerDepozitareController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  verificareFirma,
  validareContainer,
  verificareIntegritatiContainer,
  catchAsync(async (request: Request, response: Response) =>
    adaugaContainerDepozitare(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getContainerDepozitare(request, response)
  )
);

router.get(
  "/:id/inchirieri",
  catchAsync(async (request: Request, response: Response) =>
    getInchirieriContainerDepozitare(request, response)
  )
);

router.get(
  "/:id/contract",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getContractDepozitare(request, response)
  )
);

router.get(
  "/:id/recenzie",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getRecenzieContainerDepozitare(request, response)
  )
);

router.get(
  "/:id/rating",
  catchAsync(async (request: Request, response: Response) =>
    getRatingContainerDepozitare(request, response)
  )
);

router.get(
  "/:id/recenzii",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getRecenziiContainerDepozitare(request, response)
  )
);

export default router;
