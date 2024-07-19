import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { ComentariuNou, DateComentariuFrontEnd } from "./Interfete.js";
import { esteAutorizatSaPosteze } from "./Middlewares/Autorizare.js";
import { adaugaComentariu } from "./CRUD/Create.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  esteAutentificat,
  esteAutorizatSaPosteze,
  catchAsync(async (request: Request, response: Response) => {
    const { id_raport_problema, mesaj }: DateComentariuFrontEnd = request.body;
    if (request.session.utilizator) {
      const comentariu: ComentariuNou = {
        raport_problema: id_raport_problema,
        utilizator: request.session.utilizator.id_utilizator,
        mesaj: mesaj,
      };
      await adaugaComentariu(comentariu);
      response
        .status(200)
        .json({ mesaj: "Comentariul a fost adăugat cu succes!" });
    } else {
      response
        .status(400)
        .json({ mesaj: "Comentariul nu a putut fi adăugat!" });
    }
  })
);

export default router;
