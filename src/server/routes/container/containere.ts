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
import { ExpressError } from "../../Utils/ExpressError.js";
import prisma from "../../Prisma/client.js";
import {
  selecteazaCelMaiApropiatContainer,
  selecteazaCelMaiIeftinContainer,
  selectieContainereBuget,
  selectieContainereDisponibile,
} from "./Functii.js";
import { DateSelectieContainer } from "./Interfete.js";

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

router.post(
  "/filtrare",
  catchAsync(async (request: Request, response: Response) => {
    const {
      capacitate,
      tip,
      coordonate,
      data_inceput,
      data_sfarsit,
      buget,
      bugetPrioritar,
      tipContainer,
    }: DateSelectieContainer = request.body;
    console.log(request.body);

    const { latitudine, longitudine } = coordonate;

    const where: { [key: string]: any } = {};

    if (tipContainer === "RECICLARE") {
      const tipDeseu: { id_tip: number } | null =
        await prisma.tip_deseu.findUnique({
          where: { denumire_tip: tip },
          select: { id_tip: true },
        });

      if (!tipDeseu) {
        throw new ExpressError(`Tipul de deșeu ${tip} nu a fost găsit`, 404);
      }

      where["Tip_container"] = {
        some: {
          tip_deseu: tipDeseu.id_tip,
        },
      };
    } else if (tipContainer === "MATERIALE") {
      where["Tip_container"] = {
        some: {
          tip_deseu: 8,
        },
      };
    } else {
      where["Tip_container"] = {
        none: {},
      };
    }

    const containereExistente = await prisma.container.findMany({
      where: where,
    });

    if (containereExistente.length === 0) {
      return response.status(500).json({
        mesaj: `Nu există niciun container de ${tipContainer.toLowerCase()} ${tip ? `pentru ${tip}` : ""} înregistrat`,
      });
    }

    if (capacitate) {
      where["capacitate"] = { gte: parseInt(capacitate) };
    }

    const containere = await prisma.container.findMany({
      where: where,
      include: {
        Firma: true,
        Localitate: true,
        Istoric_pret: {
          where: {
            data_sfarsit: null,
          },
          include: {
            Tip_pret: true,
          },
        },
      },
    });

    if (containere.length === 0) {
      return response.status(500).json({
        mesaj: `Nu există container de ${tipContainer.toLowerCase()} cu capacitate minimă de ${capacitate} kg`,
      });
    }

    const containereDisponibile = await selectieContainereDisponibile(
      containere,
      data_inceput,
      data_sfarsit,
      tipContainer
    );

    if (containereDisponibile.length === 0) {
      return response.status(500).json({
        mesaj: "Nu există niciun container disponibil în perioada menționată",
      });
    }

    const containereSelectateBuget = await selectieContainereBuget(
      containereDisponibile,
      buget,
      data_inceput,
      data_sfarsit
    );
    if (containereSelectateBuget.length === 0) {
      return response.status(500).json({
        mesaj: "Nu există niciun container disponibil în bugetul alocat",
      });
    }
    const containerSelectat = bugetPrioritar
      ? selecteazaCelMaiIeftinContainer(containereSelectateBuget)
      : selecteazaCelMaiApropiatContainer(
          containereSelectateBuget,
          latitudine,
          longitudine
        );

    console.log({
      container: containerSelectat.container,
      distanta: containerSelectat.distanta,
      tip: tipContainer,
      pret: containerSelectat.pretFinal,
      dataInceput: data_inceput,
      data_sfarsit: data_sfarsit,
    });
    return response.status(200).json({
      container: containerSelectat.container,
      distanta: containerSelectat.distanta,
      tip: tipContainer,
      pret: containerSelectat.pretFinal,
      dataInceput: data_inceput,
      data_sfarsit: data_sfarsit,
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
