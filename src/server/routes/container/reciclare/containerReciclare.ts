import express, { Router, Request, Response } from "express";
import { ExpressError } from "../../../utils/ExpressError.js";
import { Container } from "../../../../interfaces/Interfete_Container.js";
import { creareContainer } from "../../../utils/Functii/Functii_containere.js";
import { getIdLocalitate } from "../../../BD/SQL_Localitati/SQL_Localitati.js";
import { catchAsync } from "../../../middlewares/Middlewares_CatchAsync.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/new",
  catchAsync(async (request: Request, response: Response) => {
    if (!request.body) {
      throw new ExpressError("Date container reciclare invalide!", 400);
    }

    const firma = (request.session as any).user;
    const container: Container = creareContainer(request.body.formData);
    container.firma = firma.id_utilizator;
    const id_localitate: number = await getIdLocalitate(
      request.body.formData.localitate
    );
    container.localitate = id_localitate;

    console.log(request.body);
    console.log(container);
  })
);

export default router;
