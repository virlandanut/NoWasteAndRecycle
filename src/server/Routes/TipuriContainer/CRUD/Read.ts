import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { TipContainer } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma, Tip_container } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

// export async function getTipuriContainer(): Promise<
//   mssql.IRecordSet<TipContainer[]>
// > {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere.query(
//       "SELECT denumire_tip FROM Tip_deseu WHERE id_tip <> 1011"
//     );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea tipurilor de containere",
//         500
//       );
//     }
//   }
// }

export async function getTipuriContainer(): Promise<TipContainer[]> {
  try {
    const tipuri = await prisma.tip_deseu.findMany({
      where: { id_tip: { not: 8 } },
    });
    return tipuri;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tipurile de container nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

// export async function getIdTipContainer(denumire_tip: string): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("denumire_tip", mssql.NVarChar, denumire_tip)
//       .query(`SELECT id_tip FROM Tip_deseu WHERE denumire_tip=@denumire_tip`);
//     return rezultat.recordset[0].id_tip;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea id-ului tipului de container",
//         500
//       );
//     }
//   }
// }

export async function getIdTipContainer(denumire_tip: string): Promise<number> {
  try {
    const tip = await prisma.tip_deseu.findUnique({ where: { denumire_tip } });
    if (!tip) {
      throw new ExpressError("Tipul căutat nu există", 404);
    }
    return tip.id_tip;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tipurile de container nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}
