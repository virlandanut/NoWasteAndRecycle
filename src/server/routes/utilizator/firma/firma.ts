import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import {
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
} from "../Middlewares/Middlewares.js";
import { validareSDFirma } from "./Middlewares/Middlewares.js";
import { esteAdministrator } from "../../Administrator/Middlewares/Middlewares.js";
import MiddlewareUtilizator from "../Middlewares/Middlewares.js";
import MiddlewareFirma from "../Firma/Middlewares/Middlewares.js";
import ValidatorFirma from "../Firma/Validator.js";
import { Utilizator } from "@prisma/client";
import {
  adaugaFirma,
  getDateCompleteFirma,
  getFirma,
  getInchirieriFirma,
  modificaFirma,
  schimbaDrepturiFirma,
} from "../../../Controllers/FirmaController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  MiddlewareUtilizator.criptareParola,
  ValidatorFirma.verificareCreareFirma(),
  MiddlewareFirma.handleValidationError,
  MiddlewareUtilizator.verificareIntegritatiUtilizator,
  MiddlewareFirma.verificareIntegritatiFirma,
  catchAsync(async (request: Request, response: Response) =>
    adaugaFirma(request, response)
  )
);

router.post(
  "/schimbaDrepturi",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    schimbaDrepturiFirma(request, response)
  )
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDFirma,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) =>
    modificaFirma(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getFirma(request, response)
  )
);

router.get(
  "/:id/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getDateCompleteFirma(request, response)
  )
);

router.get(
  "/:id/containere",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const utilizatorCurent: Utilizator | null = request.session.utilizator;
    if (!utilizatorCurent) {
      return response
        .status(404)
        .json({ mesaj: "Utilizatorul curent nu există" });
    }
    if (utilizatorCurent.id_utilizator !== id) {
      return response
        .status(409)
        .json({ mesaj: "Nu aveți dreptul să vizionați această pagină" });
    }
  })
);

router.get(
  "/:id/inchirieri",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getInchirieriFirma(request, response)
  )
);
export default router;
