import { ContainerInchiriere } from "../../../../../client/views/Container/ArataContainer/Depozitare/Interfete.js";
import { MetriceContainere } from "../../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/client.js";

export async function getContainereInchiriere(): Promise<
  ContainerInchiriere[]
> {
  try {
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

    const containereInchiriere: ContainerInchiriere[] = containere.map(
      (container) => ({
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
        denumire_firma: container.Firma.denumire_firma,
        status_aprobare: container.Firma.status_aprobare,
        descriere: container.descriere,
        data_inceput: container.Container_inchiriere[0]
          ? container.Container_inchiriere[0].data_inceput
          : null,
        data_sfarsit: container.Container_inchiriere[0]
          ? container.Container_inchiriere[0].data_sfarsit
          : null,
      })
    );

    return containereInchiriere;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientInitializationError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la interogarea containerelor de închiriere",
        500
      );
    }
  }
}

export async function getContainerInchiriere(
  id_container: number
): Promise<ContainerInchiriere> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Containerul de depozitare nu a putut fi obținut din baza de date",
        500
      );
    }
  }
}

// export async function getContainereInchiriereSapt(): Promise<
//   MetriceContainere[]
// > {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(
//       ` SELECT
//             ISNULL(COUNT(c.id_container), 0) AS numarContainere, d.data_adaugare
//         FROM
//             (
//                 VALUES
//                     (CONVERT(DATE, DATEADD(DAY, -7, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -6, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -5, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -4, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -3, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -2, GETDATE()))),
//                     (CONVERT(DATE, DATEADD(DAY, -1, GETDATE())))
//             ) AS d (data_adaugare)
//         LEFT JOIN
//             Container c ON d.data_adaugare = CAST(c.data_adaugare AS DATE) AND c.id_container NOT IN (SELECT container from Tip_container)
//         GROUP BY
//             d.data_adaugare`
//     );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea numărului de containere de închiriere săptămâna trecută Routes/administrator/CRUD/Read/SQL",
//         500
//       );
//     }
//   }
// }

export async function getContainereInchiriereSapt(): Promise<
  MetriceContainere[]
> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la interogarea numărului de containere de depozitare de săptămâna trecută",
        500
      );
    }
  }
}
