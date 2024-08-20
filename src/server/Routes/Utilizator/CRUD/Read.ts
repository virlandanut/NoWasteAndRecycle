import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Utilizator } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function getNumarUtilizatori(): Promise<number> {
  try {
    const rezultat = await prisma.utilizator.count({
      where: {
        data_inscriere: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    return rezultat;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Prisma Error: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Numărul de utilizatori nu a putut fi interogat",
        500
      );
    }
  }
}

//luat
export async function getMedieUtilizatori(): Promise<number> {
  try {
    const utilizatoriPeZile = await prisma.$queryRaw<
      { numarUtilizatori: number; data_inscriere: Date }[]
    >`
    SELECT 
        COUNT(u.id_utilizator) AS numarUtilizatori,
        d.data_inscriere
    FROM  
      (
        SELECT DATE_SUB(CURDATE(), INTERVAL 7 DAY) AS data_inscriere UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) UNION ALL
        SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) 
      ) AS d
    LEFT JOIN Utilizator u
      ON DATE(u.data_inscriere) = d.data_inscriere
    GROUP BY
      d.data_inscriere;
    `;

    const totalUtilizatori = utilizatoriPeZile.reduce(
      (sum, row) => sum + Number(row.numarUtilizatori),
      0
    );
    const medieUtilizatoriSaptamana =
      totalUtilizatori / utilizatoriPeZile.length;

    return medieUtilizatoriSaptamana;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Prisma Error: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Media utilizatorilor nu a putut fi interogată",
        500
      );
    }
  }
}
