import express, { Router, Request, Response } from "express";
import { catchAsync } from "../../Middlewares/Middlewares.js";
import rutaContainerReciclare from "./Reciclare/containerReciclare.js";
import rutaContainerInchiriere from "./Inchiriere/containerInchiriere.js";
import rutaContainerMaterialeConstructii from "./MaterialeConstructii/containerMaterialeConstructii.js";
import { getContainereInchiriere } from "./Inchiriere/CRUD/Read.js";
import { getContainereReciclare } from "./Reciclare/CRUD/Read.js";
import { getContainereMaterialeConstructii } from "./MaterialeConstructii/CRUD/Read.js";
import { getPreturiContainer } from "./CRUD/Read.js";
import { esteAutentificat } from "../Utilizator/Middlewares/Middlewares.js";

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
