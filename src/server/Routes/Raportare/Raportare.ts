import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { validareRaportare } from "./Validari.js";
import { esteAdministrator } from "../Administrator/Middlewares/Middlewares.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import {
  adaugaRaport,
  getRapoarte,
  getRaport,
  getToateRapoarte,
  modificaRaport,
  stergereTichet,
} from "../../Controllers/TichetRaportController.js";
import { getComentariiTichet } from "../../Controllers/ComentariiController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getRapoarte(request, response)
  )
);

router.post(
  "/",
  esteAutentificat,
  validareRaportare,
  catchAsync(async (request: Request, response: Response) =>
    adaugaRaport(request, response)
  )
);

router.post(
  "/update",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    modificaRaport(request, response)
  )
);

router.delete(
  "/delete",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    stergereTichet(request, response)
  )
);

router.get(
  "/rapoarte",
  esteAutentificat,
  esteAdministrator,
  catchAsync(async (request: Request, response: Response) =>
    getToateRapoarte(request, response)
  )
);

router.get(
  "/:id",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getRaport(request, response)
  )
);

router.get(
  "/:id/comentarii",
  esteAutentificat,
  async (request: Request, response: Response) =>
    getComentariiTichet(request, response)
);

export default router;
