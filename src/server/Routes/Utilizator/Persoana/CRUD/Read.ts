import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import {
  DateExistentePersoana,
  DateInregistrariPersoane,
  Persoana,
} from "../Interfete.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/client.js";

// export async function getDateExistentePersoana(
//   id_utilizator: number
// ): Promise<DateExistentePersoana> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         `SELECT nume, prenume, email, nume_utilizator, telefon, strada, numar, denumire_localitate as localitate
//         FROM (Utilizator AS u JOIN Persoana_fizica AS pf ON u.id_utilizator = pf.id_utilizator) JOIN Localitate AS l ON u.localitate=l.id_localitate
//         WHERE u.id_utilizator=@id_utilizator`
//       );
//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea datelor existente ale persoanei autentificate",
//         500
//       );
//     }
//   }
// }

// export async function getPersoanaFizica(
//   id_utilizator: number
// ): Promise<Persoana> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT * FROM Persoana_fizica WHERE id_utilizator=@id_utilizator"
//       );

//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la obținerea persoanei fizice din baza de date",
//         500
//       );
//     }
//   }
// }

// export async function getNumeRolPersoana(id_utilizator: number): Promise<any> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT CONCAT(nume, ' ', prenume) as nume, rol FROM Persoana_fizica WHERE id_utilizator=@id_utilizator"
//       );
//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la obținerea numelui persoanei pentru raport problemă",
//         500
//       );
//     }
//   }
// }

// export async function getParolaUtilizator(
//   id_utilizator: number
// ): Promise<string> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT parola FROM Utilizator WHERE id_utilizator=@id_utilizator"
//       );
//     return Object.values(rezultat.recordset[0])[0] as string;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la obținerea parolei utilizatorului",
//         500
//       );
//     }
//   }
// }

// export async function getNumarFirmaInregistrate(): Promise<
//   DateInregistrariFirme[]
// > {
//   try {
//     const dataSaptamanaTrecuta = new Date();
//     dataSaptamanaTrecuta.setDate(dataSaptamanaTrecuta.getDate() - 7);

//     const rezultat = await prisma.utilizator.groupBy({
//       by: ["data_inscriere"],
//       _count: true,
//       where: {
//         data_inscriere: {
//           gte: dataSaptamanaTrecuta,
//           lte: new Date(),
//         },
//       },
//     });
//     const DateInregistrariFirme: DateInregistrariFirme[] = rezultat.map(
//       (item) => ({
//         numarFirme: item._count,
//         data_inscriere: item.data_inscriere,
//       })
//     );
//     return DateInregistrariFirme;
//   } catch (eroare) {
//     if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
//       throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la modificarea datelor firmei",
//         500
//       );
//     }
//   }
// }

export async function getNumarPersoaneInregistrate(): Promise<
  DateInregistrariPersoane[]
> {
  try {
    const rezultat = await prisma.$queryRaw<
      { numarPersoane: number; data_inscriere: Date }[]
    >`
   SELECT 
        COALESCE(COUNT(p.id_utilizator), 0) AS numarPersoane,
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
        Persoana_fizica p ON u.id_utilizator = p.id_utilizator
   GROUP BY
        d.data_inscriere
   `;
    const dateInregistrariFirme: DateInregistrariPersoane[] = rezultat.map(
      (item) => ({
        numarPersoane: Number(item.numarPersoane),
        data_inscriere: item.data_inscriere,
      })
    );
    return dateInregistrariFirme;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea datelor metrice ale persoanelor",
        500
      );
    }
  }
}

// export async function getNumarPersoaneInregistrate(): Promise<
//   DateInregistrariPersoane[]
// > {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(`

//         SELECT
//             ISNULL(COUNT(pf.id_utilizator), 0) AS numarPersoane, d.data_inscriere
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
//             Persoana_fizica pf ON u.id_utilizator = pf.id_utilizator
//         GROUP BY
//             d.data_inscriere
// `);

//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea numarului de firme înregistrate săptămâna trecută Routes/administrator/CRUD/Read/SQL",
//         500
//       );
//     }
//   }
// }

// export async function getRolPersoana(id_utilizator: number): Promise<string> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const rezultat = await pool
//       .request()
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(
//         "SELECT rol FROM Persoana_fizica WHERE id_utilizator=@id_utilizator"
//       );

//     return rezultat.recordset[0].rol;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la obținerea rolului persoanei",
//         500
//       );
//     }
//   }
// }
