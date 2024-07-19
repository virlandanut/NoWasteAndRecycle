import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Raportare } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma, Raport_problema } from "@prisma/client";
import prisma from "../../../prisma/client.js";

// export async function adaugaRaportProblema(
//   raport: Raportare,
//   numar_tichet: string
// ): Promise<void> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     await pool
//       .request()
//       .input("idUtilizator", mssql.Int, raport.idUtilizator)
//       .input("titlu", mssql.NVarChar, raport.titlu)
//       .input("mesaj", mssql.NVarChar, raport.mesaj)
//       .input("numar_tichet", mssql.NVarChar, numar_tichet)
//       .query(
//         `INSERT INTO Raport_problema(numar_tichet, utilizator, titlu, mesaj) VALUES(@numar_tichet, @idUtilizator, @titlu, @mesaj)`
//       );
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la adăugarea raportului în baza de date",
//         500
//       );
//     }
//   }
// }

export async function adaugaRaportProblema(
  idUtilizator: number,
  titlu: string,
  mesaj: string
): Promise<Raport_problema> {
  try {
    const raport = await prisma.raport_problema.create({
      data: {
        utilizator: idUtilizator,
        titlu,
        mesaj,
      },
    });
    return raport;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la adăugarea raportului în baza de date",
        500
      );
    }
  }
}
