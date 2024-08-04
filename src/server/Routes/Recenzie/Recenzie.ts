import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { Recenzie } from "@prisma/client";
import { adaugaRecenzie } from "./CRUD/Create.js";
import { verificareExistentaRecenzie } from "./CRUD/Read.js";
import { stergeRecenzie } from "./CRUD/Delete.js";
import MiddleWare from "./Middlewares.js";
import prisma from "../../Prisma/client.js";
import { ExpressError } from "../../Utils/ExpressError.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const { idContainer, scor, mesaj } = request.body;
    console.log(request.body);
    const recenzie: Recenzie | null =
      await verificareExistentaRecenzie(idContainer);
    if (recenzie) {
      return response.status(500).json({
        mesaj: "Ați adăugat deja o recenzie pentru acest container",
      });
    }

    const recenzieNoua: Recenzie | null = await adaugaRecenzie(
      idContainer,
      scor,
      mesaj
    );

    if (!recenzieNoua) {
      return response.status(500).json({
        mesaj: "Recenzia nu a putut fi adăugată",
      });
    }

    response.status(200).json({ mesaj: "Recenzia a fost adăugată cu succes" });
  })
);

router.put(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const { idRecenzie, mesaj, scor } = request.body;
    const recenzie: Recenzie | null = await prisma.recenzie.update({
      where: { id_recenzie: idRecenzie },
      data: { scor, mesaj },
    });

    if (!recenzie) {
      return response
        .status(500)
        .json({ mesaj: "Recenzia nu a putut fi modificată" });
    }

    return response
      .status(200)
      .json({ mesaj: "Recenzia a fost modificată cu succes" });
  })
);

router.get(
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const recenzie: Recenzie | null = await prisma.recenzie.findUnique({
      where: { id_recenzie: id },
    });
    if (!recenzie) {
      throw new ExpressError("Recenzia nu există în baza de date", 500);
    }
    return response.status(200).json(recenzie);
  })
);

router.delete(
  "/:id",
  MiddleWare.esteProprietarRecenzie,
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const recenzieStearsa = await stergeRecenzie(id);
    if (recenzieStearsa) {
      return response
        .status(200)
        .json({ mesaj: "Recenzia a fost ștearsă cu succes" });
    } else {
      return response
        .status(500)
        .json({ mesaj: "Recenzia nu a putut fi ștearsă" });
    }
  })
);

export default router;
