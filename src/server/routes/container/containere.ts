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
import { ContainerCuPret, DateSelectieContainer } from "./Interfete.js";
import {
  Container,
  Container_inchiriere_depozitare,
  Container_inchiriere_reciclare,
} from "@prisma/client";
import {
  validareSDContainer,
  verificareEligibilitateStergere,
  verificareIntegritatiSDContainer,
} from "./Middlewares/Middlewares.js";
import { esteProprietar } from "../Utilizator/Firma/Middlewares/Middlewares.js";
import cloudinary from "../../Servicii/serviciu-cloudinary.js";
import {
  adaugaPreturi,
  modificareImagine,
} from "../../Utils/Functii/Functii_containere.js";

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
  "/:id",
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const container: ContainerCuPret | null = await prisma.container.findUnique(
      {
        where: { id_container: id },
        include: {
          Istoric_pret: {
            include: {
              Tip_pret: true,
            },
          },
        },
      }
    );
    if (!container) {
      return response
        .status(404)
        .json({ mesaj: "Containerul nu există în baza de date" });
    }

    return response.status(200).json(container);
  })
);

router.get(
  "/:id/status",
  catchAsync(async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const container: Container | null = await prisma.container.findUnique({
      where: { id_container: id },
    });
    if (!container) {
      return response
        .status(500)
        .json({ mesaj: "Statusul containerului nu a putut fi interogat" });
    }
    return response.status(200).json(container.status);
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

router.put(
  "/actualizeazaStatus",
  esteAutentificat,
  catchAsync(async (request: Request, response: Response) => {
    const { id, status } = request.body;
    const container: Container | null = await prisma.container.update({
      where: { id_container: id },
      data: { status: !status },
    });
    if (!container) {
      return response
        .status(500)
        .json({ mesaj: "Containerul nu a putut fi marcat ca neînchiriabil" });
    }
    return response.status(200).json({
      mesaj: `Containerul a fost marcat ca ${status ? "închiriabil" : "neînchiriabil"}`,
      status: container.status,
    });
  })
);

router.put(
  "/",
  esteProprietar,
  validareSDContainer,
  verificareIntegritatiSDContainer,
  catchAsync(async (request: Request, response: Response) => {
    const { id, denumire, descriere, poza, tip } = request.body.data;
    await prisma.$transaction([
      prisma.container.update({
        where: { id_container: id },
        data: { denumire, descriere },
      }),
    ]);

    await modificareImagine(id, poza, tip);
    await adaugaPreturi(id, request.body.data, true);

    return response
      .status(200)
      .json({ mesaj: "Containerul a fost modificat cu succes" });
  })
);

router.delete(
  "/",
  verificareEligibilitateStergere,
  catchAsync(async (request: Request, response: Response) => {
    const { id, tip } = request.body;
    if (["MATERIALE", "DEPOZITARE"].includes(tip)) {
      const inchirieri: Container_inchiriere_depozitare[] =
        await prisma.container_inchiriere_depozitare.findMany({
          where: { container: id },
        });

      for (const inchiriere of inchirieri) {
        await prisma.$transaction([
          prisma.contract_inchiriere.delete({
            where: { container: inchiriere.id_container_depozitare },
          }),
          prisma.recenzie.delete({
            where: { container: inchiriere.id_container_depozitare },
          }),
          prisma.container_inchiriere_depozitare.delete({
            where: {
              id_container_depozitare: inchiriere.id_container_depozitare,
            },
          }),
          prisma.istoric_pret.deleteMany({ where: { container: id } }),
        ]);
      }
    } else {
      const inchirieri: Container_inchiriere_reciclare[] =
        await prisma.container_inchiriere_reciclare.findMany({
          where: { container: id },
        });

      for (const inchiriere of inchirieri) {
        await prisma.$transaction([
          prisma.contract_reciclare.delete({
            where: { container: inchiriere.id_container_reciclare },
          }),
          prisma.container_inchiriere_depozitare.delete({
            where: {
              id_container_depozitare: inchiriere.id_container_reciclare,
            },
          }),
        ]);
      }
      await prisma.tip_container.deleteMany({ where: { container: id } });
      await prisma.istoric_pret.deleteMany({ where: { container: id } });
    }

    const container = await prisma.container.delete({
      where: { id_container: id },
    });
    if (container) {
      return response
        .status(200)
        .json({ mesaj: "Containerul a fost șters cu succes" });
    }
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

export default router;
