import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ContainerReciclare } from "../../../../../client/views/Container/ArataContainer/Reciclare/Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import {
  ContainerInchiriereReciclareCuRelatii,
  MetriceContainere,
} from "../../Interfete.js";
import {
  Container,
  Container_inchiriere_reciclare,
  Contract_reciclare,
  Firma,
  Prisma,
} from "@prisma/client";
import prisma from "../../../../prisma/client.js";

export async function getContainereReciclare(): Promise<ContainerReciclare[]> {
  try {
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

    const containereReciclare: ContainerReciclare[] = containere.map(
      (container) => ({
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
        data_inceput: container.Container_reciclare[0]
          ? container.Container_reciclare[0].data_inceput
          : null,
        data_sfarsit: container.Container_reciclare[0]
          ? container.Container_reciclare[0].data_sfarsit
          : null,
      })
    );

    return containereReciclare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "A existat o eroare la interogarea containerelor de reciclare din baza de date",
        500
      );
    }
  }
}

export async function getContainereReciclareFiltrate(
  tip: string
): Promise<mssql.IRecordSet<ContainerReciclare[]>> {
  let conexiune;
  try {
    conexiune = await pool.connect();
    const cerere = pool.request();
    const rezultat = await cerere
      .input("tip", mssql.NVarChar, tip)
      .query(
        `SELECT id_container, denumire, capacitate, status, strada, numar, lat as latitudine, long as longitudine, denumire_localitate as localitate, firma, denumire_firma, status_aprobare, descriere, denumire_tip as tip FROM (((CONTAINER as c JOIN Firma as f ON c.firma = f.id_utilizator) JOIN Localitate as l ON c.localitate = l.id_localitate) JOIN Tip_container as tp ON c.id_container = tp.container) JOIN Tip_deseu as td ON tp.tip_deseu = td.id_tip WHERE tip=@tip`
      );
    return rezultat.recordset;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea containerelor filtrate de reciclare din baza de date",
        500
      );
    }
  }
}

export async function getContainerReciclare(
  id_container: number
): Promise<ContainerReciclare> {
  try {
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
      data_inceput: container.Container_reciclare[0]
        ? container.Container_reciclare[0].data_inceput
        : null,
      data_sfarsit: container.Container_reciclare[0]
        ? container.Container_reciclare[0].data_sfarsit
        : null,
    };

    return containerReciclare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea containerului de reciclare din baza de date",
        500
      );
    }
  }
}

export async function getInchirieriContainerReciclare(
  id: number
): Promise<Container_inchiriere_reciclare[]> {
  try {
    const containereReciclare: Container_inchiriere_reciclare[] =
      await prisma.container_inchiriere_reciclare.findMany({
        where: { container: id },
      });

    return containereReciclare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Închirierile containerului de reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

export async function getInchirieriContainerReciclareDateComplete(
  denumire_firma: string
): Promise<ContainerInchiriereReciclareCuRelatii[]> {
  try {
    const containereReciclare: ContainerInchiriereReciclareCuRelatii[] =
      await prisma.container_inchiriere_reciclare.findMany({
        where: { Firma: { denumire_firma } },
        include: {
          Firma: true,
          Container: true,
        },
      });

    return containereReciclare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Închirierile containerului de reciclare nu au putut fi interogate",
        500
      );
    }
  }
}

export async function getContainereReciclareSapt(): Promise<
  MetriceContainere[]
> {
  try {
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
          Container c
          ON d.data_adaugare = DATE(c.data_adaugare) AND c.id_container IN (SELECT container FROM Tip_container WHERE tip_deseu <> 8)
    GROUP BY
          d.data_adaugare;
    `;
    const rezultatFormatat = rezultat.map((record) => ({
      numarContainere: Number(record.numarContainere),
      data_adaugare: record.data_adaugare,
    }));

    return rezultatFormatat;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Metricele containerelor de reciclare nu au putut fi obținute de la baza de date",
        500
      );
    }
  }
}

export async function getContractInchiriereReciclare(
  id: number
): Promise<Contract_reciclare> {
  try {
    const contract: Contract_reciclare | null =
      await prisma.contract_reciclare.findUnique({ where: { container: id } });
    if (!contract) {
      throw new ExpressError("Contractul de reciclare nu există", 500);
    }
    return contract;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Contractul de reciclare nu a putut fi interogat",
        500
      );
    }
  }
}
