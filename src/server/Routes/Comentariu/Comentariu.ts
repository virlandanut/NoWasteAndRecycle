import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import { esteAutorizatSaPosteze } from "./Middlewares/Autorizare.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";
import { adaugaComentariuNou } from "../../Controllers/ComentariiController.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/",
  esteAutentificat,
  esteAutorizatSaPosteze,
  catchAsync(async (request: Request, response: Response) =>
    adaugaComentariuNou(request, response)
  )
);

export default router;
