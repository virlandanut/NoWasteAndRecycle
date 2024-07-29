import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

// export async function stergeContainer(id_container: number): Promise<void> {
//   let conexiune;
//   let tranzactie;
//   try {
//     conexiune = await pool.connect();
//     tranzactie = new mssql.Transaction(conexiune);
//     await tranzactie.begin();

//     const countTip = await new mssql.Request(tranzactie)
//       .input("id_container", mssql.Int, id_container)
//       .query(
//         `SELECT COUNT(id_tip_container) AS tipuri FROM Tip_container WHERE container=@id_container`
//       );
//     if (countTip.recordset[0].tipuri !== 0) {
//       await new mssql.Request(tranzactie)
//         .input("id_container", mssql.Int, id_container)
//         .query(`DELETE FROM Tip_container WHERE container=@id_tip_container`);
//     }
//   } catch (eroare) {
//     if (tranzactie) {
//       await tranzactie.rollback();
//     }
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la ștergerea containerului",
//         500
//       );
//     }
//   }
// }

export async function stergeContainer(id_container: number): Promise<void> {
  try {
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
      if (container.status === true) {
        throw new ExpressError(
          "Containerul nu poate fi șters deoarece este închiriat",
          500
        );
      }
      const tipuri = await prisma.tip_container.count({
        where: { container: container.id_container },
      });

      if (tipuri !== 0) {
        await prisma.container_inchiriere_reciclare.deleteMany({
          where: { container: container.id_container },
        });
        await prisma.tip_container.deleteMany({
          where: { container: id_container },
        });
      } else {
        await prisma.container_inchiriere_depozitare.deleteMany({
          where: { container: container.id_container },
        });
      }

      await prisma.container.delete({ where: { id_container: id_container } });
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la ștergerea containerului",
        500
      );
    }
  }
}
