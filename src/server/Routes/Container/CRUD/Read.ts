import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { PretContainer } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/client.js";

// export async function getIdContainer(
//   denumire_container: string
// ): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("denumire_container", mssql.NVarChar, denumire_container)
//       .query(
//         `SELECT id_container FROM Container WHERE denumire=@denumire_container`
//       );
//     return rezultat.recordset[0].id_container;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea id_container din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getIdContainer(
  denumire_container: string
): Promise<number> {
  try {
    const container = await prisma.container.findUnique({
      where: { denumire: denumire_container },
      select: { id_container: true },
    });
    if (container) {
      return container.id_container;
    } else {
      throw new ExpressError("Containerul nu există în baza de date", 404);
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea id-ului containerului!",
        500
      );
    }
  }
}

// export async function getPreturiContainer(
//   id_container: number
// ): Promise<PretContainer[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.input("id_container", mssql.Int, id_container)
//       .query(`SELECT tp.denumire_tip_pret, pret
//               FROM (Container c JOIN Istoric_pret ip ON c.id_container = ip.container) JOIN Tip_pret tp ON ip.tip_pret = tp.id_tip_pret
//               WHERE ip.container = @id_container AND ip.data_sfarsit IS NULL`);
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea prețurilor din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getPreturiContainer(
  id_container: number
): Promise<PretContainer[]> {
  try {
    const rezultat = await prisma.istoric_pret.findMany({
      where: {
        container: id_container,
        data_sfarsit: null,
      },
      select: {
        pret: true,
        Tip_pret: {
          select: {
            denumire_tip_pret: true,
          },
        },
      },
    });
    const preturiContainer = rezultat.map((item) => ({
      denumire_tip_pret: item.Tip_pret.denumire_tip_pret,
      pret: item.pret,
    }));

    return preturiContainer;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea prețurilor containerului!",
        500
      );
    }
  }
}

// export async function getNumarContainere(): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(
//       "SELECT COUNT(id_container) as containereNoi FROM Container WHERE data_adaugare=CAST(GETDATE() AS DATE)"
//     );
//     return rezultat.recordset[0].containereNoi;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea numărului de containere adăugate astăzi",
//         500
//       );
//     }
//   }
// }

export async function getNumarContainere(): Promise<number> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea numărului de containere!",
        500
      );
    }
  }
}

// export async function getMedieContainere(): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(`
//     SELECT
//         AVG(CAST(containereNoi AS DECIMAL(10,2))) AS medieContainereSaptamana
//     FROM (
//         SELECT
//             ISNULL(COUNT(c.id_container), 0) AS containereNoi
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
//             Container c ON d.data_adaugare = CAST(c.data_adaugare AS DATE)
//         GROUP BY
//             d.data_adaugare
//         ) AS T;`);
//     return rezultat.recordset[0].medieContainereSaptamana;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea mediei de utilizatori înregistrați astăzi",
//         500
//       );
//     }
//   }
// }

export async function getMedieContainere(): Promise<number> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea mediei containerelor!",
        500
      );
    }
  }
}
