import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { getDenumireLocalitati, getLocalitate } from "./CRUD/Read.js";
import prisma from "../../prisma/client.js";
import { Localitate } from "@prisma/client";
import { ExpressError } from "../../Utils/ExpressError.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const localitati: Localitate[] = await getDenumireLocalitati();
    if (!localitati) {
      throw new ExpressError("Localitățile nu există în baza de date", 404);
    }
    return response.json(localitati);
  })
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const localitate = await getLocalitate(id);
    if (!localitate) {
      throw new ExpressError("Localitatea nu există în baza de date", 404);
    }
    return response.status(200).json(localitate);
  })
);

export default router;
