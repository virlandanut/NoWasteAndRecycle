import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares_CatchAsync.js";
import {
  getContainereInchiriere,
  getContainereMaterialeConstructii,
  getContainereReciclare,
  getPreturiContainer,
} from "../../DB/SQL_Containere/SQL_Containere.js";
import rutaContainerReciclare from "./Reciclare/containerReciclare.js";
import rutaContainerInchiriere from "./Inchiriere/containerInchiriere.js";
import rutaContainerMaterialeConstructii from "./Constructii/containerMaterialeConstructii.js";
import { esteAutentificat } from "../../Middlewares/Middlewares_Autorizare.js";

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
    const preturi = await getPreturiContainer(parseInt(id));
    return response.json(preturi);
  })
);

export default router;
