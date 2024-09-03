import express, { Router, Request, Response } from "express";
import {
  esteAutentificat,
  validareSchimbareParola,
} from "./Middlewares/Middlewares.js";
import rutaPersoana from "./Persoana/persoana.js";
import rutaFirma from "./Firma/firma.js";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import {
  adaugarePozaProfil,
  getTipUtilizator,
  getUtilizatorCurent,
  login,
  logout,
  resetPassword,
  updatePassword,
} from "../../Controllers/UtilizatorController.js";
import { getInchirieri } from "../../Controllers/InchiriereController.js";

const router: Router = express.Router({ mergeParams: true });

router.use(express.json({ limit: "500b" }));

router.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

router.get(
  "/:id/tip",
  catchAsync(async (request: Request, response: Response) =>
    getTipUtilizator(request, response)
  )
);

router.post(
  "/login",
  catchAsync(async (request: Request, response: Response) =>
    login(request, response)
  )
);

router.get(
  "/logout",
  esteAutentificat,
  (request: Request, response: Response) => logout(request, response)
);

router.post(
  "/update/parola",
  esteAutentificat,
  validareSchimbareParola,
  catchAsync(async (request: Request, response: Response) =>
    updatePassword(request, response)
  )
);

router.get(
  "/curent",
  catchAsync(async (request: Request, response: Response) =>
    getUtilizatorCurent(request, response)
  )
);

router.post(
  "/upload",
  catchAsync(async (request: Request, response: Response) =>
    adaugarePozaProfil(request, response)
  )
);

router.post(
  "/resetare",
  catchAsync(async (request: Request, response: Response) =>
    resetPassword(request, response)
  )
);

router.get(
  "/:nume_utilizator/inchirieri",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) =>
    getInchirieri(request, response)
  )
);

router.use("/persoana", rutaPersoana);
router.use("/firma", rutaFirma);

export default router;
