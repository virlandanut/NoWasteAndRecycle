import express, { Request, Response, Router } from "express";
import ValidatorPersoana from "./Validator.js";
import { catchAsync } from "../../../Middlewares/Middlewares.js";
import { validareSDPersoana } from "./Middlewares.js";
import {
  esteAutentificat,
  verificareIntegritatiSDUtilizator,
} from "../Middlewares/Middlewares.js";
import MiddlewarPersoana from "./Middlewares.js";
import MiddlewareUtilizator from "../Middlewares/Middlewares.js";
import {
  crearePersoanaNoua,
  getDateCompletePersoana,
  getPersoana,
  modificarePersoana,
} from "../../../Controllers/PersoanaController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  MiddlewareUtilizator.criptareParola,
  ValidatorPersoana.verificareCrearePersoana(),
  MiddlewarPersoana.handleValidationError,
  MiddlewareUtilizator.verificareIntegritatiUtilizator,
  MiddlewarPersoana.verificareIntegritatiPersoana,
  catchAsync(async (request: Request, response: Response) =>
    crearePersoanaNoua(request, response)
  )
);

router.put(
  "/edit",
  esteAutentificat,
  validareSDPersoana,
  verificareIntegritatiSDUtilizator,
  catchAsync(async (request: Request, response: Response) =>
    modificarePersoana(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getPersoana(request, response)
  )
);

router.get(
  "/:id/date",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getDateCompletePersoana(request, response)
  )
);

export default router;
