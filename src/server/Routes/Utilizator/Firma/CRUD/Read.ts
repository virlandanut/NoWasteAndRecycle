import {
  DateExistenteFirma,
  DateInregistrariFirme,
  Firma,
  MetriciFirma,
} from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../prisma/client.js";
import { Prisma } from "@prisma/client";

// export async function getDateExistenteFirma(
//   id_utilizator: number
// ): Promise<DateExistenteFirma> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         `SELECT denumire_firma, email, nume_utilizator, telefon, strada, numar, denumire_localitate as localitate
//         FROM (Utilizator AS u JOIN Firma AS f ON u.id_utilizator = f.id_utilizator) JOIN Localitate AS l ON u.localitate = l.id_localitate
//         WHERE u.id_utilizator=@id_utilizator
//         `
//       );
//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au eixstat probleme la interogarea datelor existente ale firmei autentificate",
//         500
//       );
//     }
//   }
// }

// export async function verificareStatusAprobareFirma(
//   id_utilizator: number
// ): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT status_aprobare FROM Firma WHERE id_utilizator=@id_utilizator"
//       );

//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la verificare aprobarii firmei",
//         500
//       );
//     }
//   }
// }

// export async function getFirma(id_utilizator: number): Promise<Firma> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query("SELECT * FROM Firma WHERE id_utilizator=@id_utilizator");

//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la obținerea firmei din baza de date",
//         500
//       );
//     }
//   }
// }

// export async function getDenumireFirma(id_utilizator: number): Promise<string> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT denumire_firma FROM Firma WHERE id_utilizator=@id_utilizator"
//       );
//     return rezultat.recordset[0].denumire_firma;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la obținerea denumirii firmei pentru raport problemă",
//         500
//       );
//     }
//   }
// }

// export async function getToateFirmele(): Promise<MetriciFirma[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(
//       `SELECT f.id_utilizator, cif, denumire_firma, data_inscriere, email, status_aprobare FROM Firma AS f JOIN Utilizator AS u ON f.id_utilizator = u.id_utilizator`
//     );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea firmelor",
//         500
//       );
//     }
//   }
// }

export async function getToateFirmele(): Promise<MetriciFirma[]> {
  try {
    const firme = await prisma.firma.findMany({
      select: {
        id_utilizator: true,
        cif: true,
        denumire_firma: true,
        status_aprobare: true,
        utilizator: {
          select: {
            data_inscriere: true,
            email: true,
          },
        },
      },
    });
    return firme.map((firma) => ({
      id_utilizator: firma.id_utilizator,
      cif: firma.cif,
      denumire_firma: firma.denumire_firma,
      data_inscriere: firma.utilizator.data_inscriere,
      email: firma.utilizator.email,
      status_aprobare: firma.status_aprobare,
    }));
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la modificarea datelor firmei",
        500
      );
    }
  }
}
// export async function getNumarFirmeInregistrate(): Promise<
//   DateInregistrariFirme[]
// > {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(`
//         SELECT
//             ISNULL(COUNT(f.id_utilizator), 0) AS numarFirme, d.data_inscriere as data_inscriere
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
//             ) AS d (data_inscriere)
//         LEFT JOIN
//             Utilizator u ON d.data_inscriere = CAST(u.data_inscriere AS DATE)
//         LEFT JOIN
//             Firma f ON u.id_utilizator = f.id_utilizator
//         GROUP BY
//             d.data_inscriere`);

//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea numarului de firme înregistrate săptămâna trecută",
//         500
//       );
//     }
//   }
// }

export async function getNumarFirmeInregistrate(): Promise<
  DateInregistrariFirme[]
> {
  try {
    const rezultat = await prisma.$queryRaw<
      { numarFirme: number; data_inscriere: Date }[]
    >`
   SELECT 
        COALESCE(COUNT(f.id_utilizator), 0) AS numarFirme,
        d.data_inscriere AS data_inscriere
   FROM 
      (
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) AS data_inscriere UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) UNION ALL
        SELECT CURDATE()
      ) AS d
   LEFT JOIN 
        Utilizator u ON DATE(u.data_inscriere) = d.data_inscriere
   LEFT JOIN 
        Firma f ON u.id_utilizator = f.id_utilizator
   GROUP BY
        d.data_inscriere
   `;
    const dateInregistrariFirme: DateInregistrariFirme[] = rezultat.map(
      (item) => ({
        numarFirme: Number(item.numarFirme),
        data_inscriere: item.data_inscriere,
      })
    );
    return dateInregistrariFirme;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la modificarea datelor firmei",
        500
      );
    }
  }
}
