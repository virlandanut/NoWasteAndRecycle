import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import MiddleWare from "./Middlewares.js";
import prisma from "../../Prisma/client.js";
import { ExpressError } from "../../Utils/ExpressError.js";
import {
  adaugaRecenzieNoua,
  getRecenzieContainer,
  modificaRecenzie,
  stergereRecenzie,
} from "../../Controllers/RecenzieController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    adaugaRecenzieNoua(request, response)
  )
);

router.put(
  "/",
  catchAsync(async (request: Request, response: Response) =>
    modificaRecenzie(request, response)
  )
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) =>
    getRecenzieContainer(request, response)
  )
);

router.delete(
  "/:id",
  MiddleWare.esteProprietarRecenzie,
  catchAsync(async (request: Request, response: Response) =>
    stergereRecenzie(request, response)
  )
);

export default router;
