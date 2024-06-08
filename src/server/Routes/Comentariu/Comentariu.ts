import express, { Router, Request, Response } from "express";
import { esteAutentificat } from "../../Middlewares/Middlewares_Autorizare.js";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import { Comentariu, DateComentariuFrontEnd } from "./Interfete.js";
import { esteAutorizatSaPosteze } from "./Middlewares/Autorizare.js";
import { adaugaComentariu } from "./CRUD/Create/SQL.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());


router.post(
  "/new",
  esteAutentificat,
  esteAutorizatSaPosteze,
  catchAsync(async (request: Request, response: Response) => {
    const { id_raport_problema, mesaj }: DateComentariuFrontEnd = request.body;
    if (request.session.user && request.session.user.id_utilizator) {
      const comentariu: Comentariu = {
        id_raport_problema: id_raport_problema,
        id_utilizator: request.session.user.id_utilizator,
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
