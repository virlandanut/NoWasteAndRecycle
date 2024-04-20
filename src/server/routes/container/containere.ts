import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../middlewares/Middlewares_CatchAsync.js";
import {
  getContainerInchiriere,
  getContainereInchiriere,
  getContainereMaterialeConstructii,
  getContainereReciclare,
  getPreturiContainerInchiriere,
} from "../../BD/SQL_Containere/SQL_Containere.js";
import rutaContainerReciclare from "../container/reciclare/containerReciclare.js";
import rutaContainerInchiriere from "../container/inchiriere/containerInchiriere.js";
import rutaContainerMaterialeConstructii from "../container/constructii/containerMaterialeConstructii.js";
import { esteAutentificat } from "../../middlewares/Middlewares_Autorizare.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.use("/containerReciclare", rutaContainerReciclare);
router.use("/containerInchiriere", rutaContainerInchiriere);
router.use("/containerMaterialeConstructii", rutaContainerMaterialeConstructii);

router.get(
  "/",
  catchAsync(async (request: Request, response: Response) => {
    const containereInchiriere = await getContainereInchiriere();
    const containereReciclare = await getContainereReciclare();
    const containereMaterialeConstructii =
      await getContainereMaterialeConstructii();
    response.send({
      containereInchiriere,
      containereReciclare,
      containereMaterialeConstructii,
    });
  })
);

router.get(
  "/:id/preturi",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const { id } = request.params;
    const preturi = await getPreturiContainerInchiriere(parseInt(id));
    response.json(preturi);
  })
);

export default router;
