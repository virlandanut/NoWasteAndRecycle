import { Request, Response } from "express";
import {
  getContainerCuId,
  getContainerCuIstoricPret,
  getContainereInchiriere,
  getContainereInchiriereSapt,
  getContainereMaterialeConstructii,
  getContainereMaterialeSapt,
  getContainereReciclare,
  getMedieContainere,
  getNumarContainere,
  updateStatus,
} from "../Models/ContainerModel.js";
import {
  ContainerCuPret,
  DateSelectieContainer,
  MetriceContainere,
} from "../Routes/Container/Interfete.js";
import {
  Container,
  Container_inchiriere_depozitare,
  Container_inchiriere_reciclare,
} from "@prisma/client";
import prisma from "../Prisma/client.js";
import {
  adaugaPreturi,
  modificareImagine,
} from "../Utils/Functii/Functii_containere.js";
import {
  selecteazaCelMaiApropiatContainer,
  selecteazaCelMaiIeftinContainer,
  selectieContainereBuget,
  selectieContainereDisponibile,
} from "../Routes/Container/Functii.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { getContainereReciclareSapt } from "../Models/ContainerReciclareModel.js";

export class ContainerController {
  async getContainere(request: Request, response: Response) {
    const containereInchiriere = await getContainereInchiriere();
    const containereReciclare = await getContainereReciclare();
    const containereMaterialeConstructii =
      await getContainereMaterialeConstructii();

    response.send({
      containereInchiriere,
      containereReciclare,
      containereMaterialeConstructii,
    });
  }

  async getContainer(request: Request, response: Response) {
    const id: number = parseInt(request.params.id);
    const container: ContainerCuPret | null =
      await getContainerCuIstoricPret(id);
    if (!container) {
      return response
        .status(404)
        .json({ mesaj: "Containerul nu există în baza de date" });
    }

    return response.status(200).json(container);
  }

  async getStatusContainer(request: Request, response: Response) {
    const id: number = parseInt(request.params.id);
    const container: Container | null = await getContainerCuId(id);
    if (!container) {
      return response
        .status(500)
        .json({ mesaj: "Statusul containerului nu a putut fi interogat" });
    }
    return response.status(200).json(container.status);
  }

  async updateStatusCon(request: Request, response: Response) {
    const { id, status } = request.body;
    const container: Container | null = await updateStatus(id, status);
    if (!container) {
      return response
        .status(500)
        .json({ mesaj: "Containerul nu a putut fi marcat ca neînchiriabil" });
    }
    return response.status(200).json({
      mesaj: `Containerul a fost marcat ca ${status ? "închiriabil" : "neînchiriabil"}`,
      status: container.status,
    });
  }

  async updateContainer(request: Request, response: Response) {
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
  }

  async deleteContainer(request: Request, response: Response) {
    const { id, tip } = request.body;
    console.log(id, tip);
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
        ]);
      }
      await prisma.container_inchiriere_depozitare.deleteMany({
        where: {
          container: id,
        },
      });
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
          prisma.container_inchiriere_reciclare.delete({
            where: {
              id_container_reciclare: inchiriere.id_container_reciclare,
            },
          }),
        ]);
      }
    }
    if (["MATERIALE", "RECICLARE"].includes(tip)) {
      await prisma.tip_container.deleteMany({ where: { container: id } });
    }
    await prisma.istoric_pret.deleteMany({ where: { container: id } });
    const container = await prisma.container.delete({
      where: { id_container: id },
    });
    if (container) {
      return response
        .status(200)
        .json({ mesaj: "Containerul a fost șters cu succes" });
    }
  }

  async filtrareContainere(request: Request, response: Response) {
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
  }

  async getContainerePortal(request: Request, response: Response) {
    const containereNoi = await getNumarContainere();
    const medieContainere = await getMedieContainere();

    return response.status(200).json({ containereNoi, medieContainere });
  }

  async getContainereSaptamana(request: Request, response: Response) {
    const containereInchiriere: MetriceContainere[] =
      await getContainereInchiriereSapt();
    const numarContainereDepozitareFix = containereInchiriere.map(
      (container) => container.numarContainere
    );
    const containereReciclare: MetriceContainere[] =
      await getContainereReciclareSapt();
    const numarContainereReciclare = containereReciclare.map(
      (container) => container.numarContainere
    );
    const containereMateriale: MetriceContainere[] =
      await getContainereMaterialeSapt();
    const numarContainereDepozitareMobil = containereMateriale.map(
      (container) => container.numarContainere
    );
    const saptamana = containereMateriale.map((container) =>
      container.data_adaugare.toLocaleDateString()
    );
    return response.status(200).json({
      numarContainereDepozitareFix,
      numarContainereReciclare,
      numarContainereDepozitareMobil,
      saptamana,
    });
  }
}
