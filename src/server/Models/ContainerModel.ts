import { Container } from "@prisma/client";
import prisma from "../Prisma/client.js";
import {
  ContainerNou,
  MetriceContainere,
  PretContainer,
  Tip,
} from "../Routes/Container/Interfete.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { ContainerReciclare } from "../../client/views/Container/ArataContainer/Reciclare/Interfete.js";
import { ContainerInchiriere } from "../../client/views/Container/ArataContainer/Depozitare/Interfete.js";
import { ContainerMaterialeConstructii } from "../../client/views/Container/ArataContainer/Constructii/Interfete.js";
import { getPreturiContainer } from "./IstoricPretModel.js";
import { deleteContainerDepozitareModel } from "./ContainerDepozitareModel.js";
import {
  addTipContainer,
  countTipContainere,
  deleteTipContainer,
} from "./TipContainerModel.js";
import { deleteContainerReciclare } from "./ContainerReciclareModel.js";
import { getTipContainerCuDenumire } from "./TipDeseuModel.js";

export async function getContainerCuId(
  id_container: number
): Promise<Container | null> {
  return await prisma.container.findUnique({
    where: { id_container },
  });
}

export async function updateStatus(
  id_container: number,
  status: boolean
): Promise<Container | null> {
  return await prisma.container.update({
    where: { id_container },
    data: { status: !status },
  });
}

export async function getIdContainer(
  denumire_container: string
): Promise<number> {
  const container = await prisma.container.findUnique({
    where: { denumire: denumire_container },
    select: { id_container: true },
  });
  if (container) {
    return container.id_container;
  } else {
    throw new ExpressError("Containerul nu există în baza de date", 404);
  }
}

export async function getContainerCuFirmaLocalitate(idContainer: number) {
  const container = await prisma.container.findUnique({
    where: { id_container: idContainer },
    include: { Firma: true, Localitate: true },
  });

  if (!container) {
    throw new ExpressError("Containerul nu există în baza de date", 500);
  }

  return container;
}

export async function getNumarContainere(): Promise<number> {
  const astazi = new Date();
  astazi.setHours(0, 0, 0, 0);

  const count = await prisma.container.count({
    where: {
      data_adaugare: {
        gte: astazi,
        lt: new Date(astazi.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  return count;
}

export async function getMedieContainere(): Promise<number> {
  const astazi = new Date();
  astazi.setHours(0, 0, 0, 0);

  const startDate = new Date(astazi.getTime() - 6 * 24 * 60 * 60 * 1000);

  const numarContainere = await prisma.container.groupBy({
    by: ["data_adaugare"],
    _count: {
      id_container: true,
    },
    where: {
      data_adaugare: {
        gte: startDate,
        lte: astazi,
      },
    },
  });
  const totalContainere = numarContainere.reduce(
    (sum, count) => sum + count._count.id_container,
    0
  );
  const avg = totalContainere / 7;

  return parseFloat(avg.toFixed(2));
}

export async function getProprietarContainer(id: number): Promise<number> {
  const container: Container | null = await prisma.container.findUnique({
    where: { id_container: id },
  });
  if (!container) {
    throw new ExpressError("Containerul nu există în baza de date", 404);
  }
  return container.firma;
}

export async function adaugaContainer(
  container: ContainerNou,
  tip: Tip,
  deseu?: string
): Promise<void> {
  if (tip === Tip.FIX)
    await prisma.container.create({
      data: {
        ...container,
      },
    });
  else if (tip === Tip.MOBIL) {
    const containerMobil = await prisma.container.create({
      data: {
        ...container,
      },
    });
    await addTipContainer(containerMobil.id_container, 8);
  } else if (tip === Tip.RECICLARE && deseu) {
    const tipDeseu = await getTipContainerCuDenumire(deseu);
    if (!tipDeseu) {
      throw new ExpressError(
        "Tipul de deșeu nu a putut fi adăugat în baza de date",
        500
      );
    }
    const containerReciclare = await prisma.container.create({
      data: {
        ...container,
      },
    });
    await addTipContainer(containerReciclare.id_container, tipDeseu.id_tip);
  } else {
    throw new ExpressError(
      "Acest tip de container nu poate fi adăugat în baza de date",
      500
    );
  }
}

export async function stergeContainer(id_container: number): Promise<void> {
  await prisma.$transaction(async (prisma) => {
    const container = await prisma.container.findUnique({
      where: { id_container: id_container },
    });
    if (!container) {
      throw new ExpressError(
        "Containerul pe care încercați să-l ștergeți nu există",
        404
      );
    }

    const tipuri = await countTipContainere(container.id_container);

    if (tipuri > 0) {
      await deleteContainerReciclare(container.id_container);
      await deleteTipContainer(container.id_container);
    } else {
      await deleteContainerDepozitareModel(container.id_container);
    }

    await prisma.container.delete({
      where: { id_container: id_container },
    });
  });
}

export async function getContainereReciclare(): Promise<ContainerReciclare[]> {
  const containere = await prisma.container.findMany({
    where: {
      Tip_container: { some: { tip_deseu: { not: 8 } } },
      Firma: { status_aprobare: true },
    },
    include: {
      Firma: true,
      Localitate: true,
      Tip_container: {
        include: {
          Tip_deseu: true,
        },
      },
      Container_reciclare: true,
    },
  });

  const containereReciclare: ContainerReciclare[] = await Promise.all(
    containere.map(async (container) => {
      const preturi: PretContainer[] = await getPreturiContainer(
        container.id_container
      );

      const pretZi =
        preturi.find((p) => p.denumire_tip_pret === "Zi")?.pret || 0;
      const pretSaptamana =
        preturi.find((p) => p.denumire_tip_pret === "Săptămână")?.pret || 0;
      const pretLuna =
        preturi.find((p) => p.denumire_tip_pret === "Lună")?.pret || 0;
      const pretAn =
        preturi.find((p) => p.denumire_tip_pret === "An")?.pret || 0;

      return {
        id_container: container.id_container,
        denumire: container.denumire,
        capacitate: container.capacitate,
        status: container.status,
        strada: container.strada,
        numar: container.numar,
        localitate: container.Localitate.denumire_localitate,
        latitudine: container.lat,
        longitudine: container.long,
        firma: container.firma,
        denumire_firma: container.Firma.denumire_firma,
        status_aprobare: container.Firma.status_aprobare,
        poza: container.poza,
        descriere: container.descriere,
        tip: container.Tip_container[0].Tip_deseu.denumire_tip,
        data_inceput: container.Container_reciclare[0]
          ? container.Container_reciclare[0].data_inceput
          : null,
        data_sfarsit: container.Container_reciclare[0]
          ? container.Container_reciclare[0].data_sfarsit
          : null,
        pretZi,
        pretSaptamana,
        pretLuna,
        pretAn,
      };
    })
  );

  return containereReciclare;
}

export async function getContainerReciclare(
  id_container: number
): Promise<ContainerReciclare> {
  const container = await prisma.container.findUnique({
    where: { id_container },
    include: {
      Firma: true,
      Localitate: true,
      Tip_container: {
        include: {
          Tip_deseu: true,
        },
      },
      Container_reciclare: true,
    },
  });
  if (!container) {
    throw new ExpressError("Containerul nu a fost găsit", 404);
  }

  const preturi: PretContainer[] = await getPreturiContainer(id_container);
  const pretZi = preturi.find((p) => p.denumire_tip_pret === "Zi")?.pret || 0;
  const pretSaptamana =
    preturi.find((p) => p.denumire_tip_pret === "Săptămână")?.pret || 0;
  const pretLuna =
    preturi.find((p) => p.denumire_tip_pret === "Lună")?.pret || 0;
  const pretAn = preturi.find((p) => p.denumire_tip_pret === "An")?.pret || 0;

  const containerReciclare: ContainerReciclare = {
    id_container: container.id_container,
    denumire: container.denumire,
    capacitate: container.capacitate,
    status: container.status,
    strada: container.strada,
    numar: container.numar,
    localitate: container.Localitate.denumire_localitate,
    latitudine: container.lat,
    longitudine: container.long,
    firma: container.firma,
    denumire_firma: container.Firma.denumire_firma,
    status_aprobare: container.Firma.status_aprobare,
    descriere: container.descriere,
    tip: container.Tip_container[0].Tip_deseu.denumire_tip,
    poza: container.poza,
    data_inceput: container.Container_reciclare[0]
      ? container.Container_reciclare[0].data_inceput
      : null,
    data_sfarsit: container.Container_reciclare[0]
      ? container.Container_reciclare[0].data_sfarsit
      : null,
    pretZi,
    pretSaptamana,
    pretLuna,
    pretAn,
  };

  return containerReciclare;
}

export async function getContainereInchiriere(): Promise<
  ContainerInchiriere[]
> {
  const containere = await prisma.container.findMany({
    where: {
      Tip_container: {
        none: {},
      },
      Firma: {
        status_aprobare: true,
      },
    },
    include: {
      Firma: true,
      Localitate: true,
      Container_inchiriere: true,
    },
  });

  if (!containere) {
    throw new ExpressError(
      "Nu există niciun container de depozitare în baza de date",
      500
    );
  }

  const containereInchiriere: ContainerInchiriere[] = await Promise.all(
    containere.map(async (container) => {
      const preturi: PretContainer[] = await getPreturiContainer(
        container.id_container
      );

      const pretZi =
        preturi.find((p) => p.denumire_tip_pret === "Zi")?.pret || 0;
      const pretSaptamana =
        preturi.find((p) => p.denumire_tip_pret === "Săptămână")?.pret || 0;
      const pretLuna =
        preturi.find((p) => p.denumire_tip_pret === "Lună")?.pret || 0;
      const pretAn =
        preturi.find((p) => p.denumire_tip_pret === "An")?.pret || 0;

      return {
        id_container: container.id_container,
        denumire: container.denumire,
        capacitate: container.capacitate,
        status: container.status,
        strada: container.strada,
        numar: container.numar,
        latitudine: container.lat,
        longitudine: container.long,
        poza: container.poza,
        localitate: container.Localitate.denumire_localitate,
        firma: container.firma,
        denumire_firma: container.Firma.denumire_firma,
        status_aprobare: container.Firma.status_aprobare,
        descriere: container.descriere,
        data_inceput: container.Container_inchiriere[0]
          ? container.Container_inchiriere[0].data_inceput
          : null,
        data_sfarsit: container.Container_inchiriere[0]
          ? container.Container_inchiriere[0].data_sfarsit
          : null,
        pretZi,
        pretSaptamana,
        pretLuna,
        pretAn,
      };
    })
  );

  return containereInchiriere;
}

export async function getContainerInchiriere(
  id_container: number
): Promise<ContainerInchiriere> {
  const container = await prisma.container.findUnique({
    where: { id_container, Tip_container: { none: {} } },
    include: { Firma: true, Localitate: true, Container_inchiriere: true },
  });
  if (!container) {
    throw new ExpressError("Containerul de depozitare nu a fost găsit", 500);
  }

  const containerInchiriere: ContainerInchiriere = {
    id_container: container.id_container,
    denumire: container.denumire,
    capacitate: container.capacitate,
    status: container.status,
    strada: container.strada,
    numar: container.numar,
    latitudine: container.lat,
    longitudine: container.long,
    localitate: container.Localitate.denumire_localitate,
    firma: container.firma,
    poza: container.poza,
    denumire_firma: container.Firma.denumire_firma,
    status_aprobare: container.Firma.status_aprobare,
    descriere: container.descriere,
    data_inceput: container.Container_inchiriere[0]
      ? container.Container_inchiriere[0].data_inceput
      : null,
    data_sfarsit: container.Container_inchiriere[0]
      ? container.Container_inchiriere[0].data_sfarsit
      : null,
  };

  return containerInchiriere;
}

export async function getContainereInchiriereSapt(): Promise<
  MetriceContainere[]
> {
  const rezultat = await prisma.$queryRaw<MetriceContainere[]>`
    SELECT 
          IFNULL(COUNT(c.id_container), 0) AS numarContainere, d.data_adaugare
      FROM 
          (
              SELECT 
                  CURDATE() - INTERVAL 7 DAY AS data_adaugare UNION ALL
                  SELECT CURDATE() - INTERVAL 5 DAY UNION ALL
                  SELECT CURDATE() - INTERVAL 4 DAY UNION ALL
                  SELECT CURDATE() - INTERVAL 3 DAY UNION ALL
                  SELECT CURDATE() - INTERVAL 2 DAY UNION ALL
                  SELECT CURDATE() - INTERVAL 1 DAY UNION ALL
                  SELECT CURDATE()
          ) AS d
      LEFT JOIN 
          Container c ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container NOT IN (SELECT container FROM Tip_container)
      GROUP BY 
          d.data_adaugare`;

  const rezultatFormatat = rezultat.map((record) => ({
    numarContainere: Number(record.numarContainere),
    data_adaugare: record.data_adaugare,
  }));
  return rezultatFormatat;
}

export async function getContainereMaterialeConstructii(): Promise<
  ContainerMaterialeConstructii[]
> {
  const containere = await prisma.container.findMany({
    where: {
      Tip_container: {
        some: {
          tip_deseu: 8,
        },
      },
      Firma: {
        status_aprobare: true,
      },
    },
    include: {
      Firma: true,
      Localitate: true,
      Container_inchiriere: true,
    },
  });

  if (!containere) {
    throw new ExpressError(
      "Nu există niciun container de depozitare în baza de date",
      500
    );
  }

  const containereMateriale: ContainerMaterialeConstructii[] =
    await Promise.all(
      containere.map(async (container) => {
        const preturi: PretContainer[] = await getPreturiContainer(
          container.id_container
        );
        const pretZi =
          preturi.find((p) => p.denumire_tip_pret === "Zi")?.pret || 0;
        const pretSaptamana =
          preturi.find((p) => p.denumire_tip_pret === "Săptămână")?.pret || 0;
        const pretLuna =
          preturi.find((p) => p.denumire_tip_pret === "Lună")?.pret || 0;
        const pretAn =
          preturi.find((p) => p.denumire_tip_pret === "An")?.pret || 0;

        return {
          id_container: container.id_container,
          denumire: container.denumire,
          capacitate: container.capacitate,
          status: container.status,
          strada: container.strada,
          numar: container.numar,
          latitudine: container.lat,
          longitudine: container.long,
          localitate: container.Localitate.denumire_localitate,
          firma: container.firma,
          poza: container.poza,
          denumire_firma: container.Firma.denumire_firma,
          status_aprobare: container.Firma.status_aprobare,
          descriere: container.descriere,
          data_inceput: container.Container_inchiriere[0]
            ? container.Container_inchiriere[0].data_inceput
            : null,
          data_sfarsit: container.Container_inchiriere[0]
            ? container.Container_inchiriere[0].data_sfarsit
            : null,
          pretZi,
          pretSaptamana,
          pretLuna,
          pretAn,
        };
      })
    );

  return containereMateriale;
}

export async function getContainerMaterialeConstructii(
  id_container: number
): Promise<ContainerMaterialeConstructii> {
  const container = await prisma.container.findUnique({
    where: { id_container, Tip_container: { some: { tip_deseu: 8 } } },
    include: {
      Firma: true,
      Localitate: true,
      Tip_container: { include: { Tip_deseu: true } },
      Container_inchiriere: true,
    },
  });
  if (!container) {
    throw new ExpressError(
      "Containerul de reciclare a materialelor nu a fost găsit!",
      500
    );
  }
  const containerMaterialeConstructii: ContainerMaterialeConstructii = {
    id_container: container.id_container,
    denumire: container.denumire,
    capacitate: container.capacitate,
    status: container.status,
    strada: container.strada,
    numar: container.numar,
    latitudine: container.lat,
    longitudine: container.long,
    localitate: container.Localitate.denumire_localitate,
    firma: container.firma,
    poza: container.poza,
    denumire_firma: container.Firma.denumire_firma,
    status_aprobare: container.Firma.status_aprobare,
    descriere: container.descriere,
    data_inceput: container.Container_inchiriere[0]
      ? container.Container_inchiriere[0].data_inceput
      : null,
    data_sfarsit: container.Container_inchiriere[0]
      ? container.Container_inchiriere[0].data_sfarsit
      : null,
  };
  return containerMaterialeConstructii;
}

export async function getContainereMaterialeSapt(): Promise<
  MetriceContainere[]
> {
  const rezultat = await prisma.$queryRaw<MetriceContainere[]>`
    SELECT
          COUNT(c.id_container) AS numarContainere, d.data_adaugare
    FROM 
          (
            SELECT
                CURDATE() - INTERVAL 7 DAY AS data_adaugare UNION ALL
                SELECT CURDATE() - INTERVAL 5 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 4 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 3 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 2 DAY UNION ALL
                SELECT CURDATE() - INTERVAL 1 DAY UNION ALL
                SELECT CURDATE()
          ) AS d
    LEFT JOIN
          Container c ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container IN (SELECT container FROM Tip_container WHERE tip_deseu = 8)
    GROUP BY
          d.data_adaugare;
    `;

  const rezultatFormatat = rezultat.map((record) => ({
    numarContainere: Number(record.numarContainere),
    data_adaugare: record.data_adaugare,
  }));
  return rezultatFormatat;
}

export async function getContainerCuIstoricPret(id_container: number) {
  return await prisma.container.findUnique({
    where: { id_container },
    include: {
      Istoric_pret: {
        include: {
          Tip_pret: true,
        },
      },
    },
  });
}
