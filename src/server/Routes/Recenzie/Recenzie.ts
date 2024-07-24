import express, { Request, Response, Router } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { Recenzie } from "@prisma/client";
import { adaugaRecenzie } from "./CRUD/Create.js";
import { verificareExistentaRecenzie } from "./CRUD/Read.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const { idContainer, scor, mesaj } = request.body;
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

export default router;
