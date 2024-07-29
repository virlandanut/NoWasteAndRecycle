import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";
import { Prisma } from "@prisma/client";

// export async function getProprietarTichet(
//   id_raport_problema: number
// ): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("id_raport_problema", mssql.Int, id_raport_problema)
//       .query(
//         "SELECT utilizator FROM Raport_problema WHERE id_raport_problema=@id_raport_problema"
//       );
//     return rezultat.recordset[0].utilizator;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea proprietarului tichetului din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getProprietarTichet(
  id_raport_problema: number
): Promise<number> {
  try {
    const rezultat = await prisma.raport_problema.findUnique({
      where: { id_raport_problema: id_raport_problema },
    });
    if (rezultat) {
      return rezultat.utilizator;
    } else {
      throw new ExpressError(
        "Proprietarul raportului nu a putut fi găsit!",
        404
      );
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Proprietarul raportului nu a putut fi obținut!",
        500
      );
    }
  }
}
