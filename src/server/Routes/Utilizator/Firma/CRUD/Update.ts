import { ExpressError } from "../../../../Utils/ExpressError.js";
import { DateExistenteFirma } from "../Interfete.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../../Prisma/client.js";

export async function setDrepturiFirma(
  id_utilizator: number,
  drepturi: boolean
): Promise<void> {
  try {
    await prisma.firma.update({
      where: {
        id_utilizator,
      },
      data: {
        status_aprobare: drepturi,
        data_aprobare: new Date(),
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la schimbarea drepturilor firmei",
        500
      );
    }
  }
}

// export async function modificaFirma(
//   firma: DateExistenteFirma,
//   id_utilizator: number
// ): Promise<void> {
//   let conexiune;
//   let tranzactie;
//   try {
//     const {
//       nume_utilizator,
//       denumire_firma,
//       telefon,
//       email,
//       strada,
//       numar,
//       localitate,
//     } = firma;
//     conexiune = await pool.connect();
//     tranzactie = new mssql.Transaction(conexiune);
//     await tranzactie.begin();

//     const id_localitate_rezultat = await new mssql.Request(tranzactie)
//       .input("localitate", mssql.NVarChar, localitate)
//       .query(
//         `
//         SELECT id_localitate
//         FROM Localitate
//         WHERE denumire_localitate = @localitate
//         `
//       );

//     if (id_localitate_rezultat.recordset.length === 0) {
//       throw new ExpressError("Localitatea specificată nu a fost găsită", 500);
//     }

//     const id_localitate = id_localitate_rezultat.recordset[0].id_localitate;

//     await new mssql.Request(tranzactie)
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
//       .input("telefon", mssql.NVarChar, telefon)
//       .input("email", mssql.NVarChar, email)
//       .input("strada", mssql.NVarChar, strada)
//       .input("numar", mssql.NVarChar, numar)
//       .input("id_localitate", mssql.Int, id_localitate).query(`

//         Update Utilizator
//         SET nume_utilizator = @nume_utilizator, telefon = @telefon, email = @email, strada = @strada, numar = @numar, localitate = @id_localitate
//         WHERE id_utilizator = @id_utilizator

//         `);

//     await new mssql.Request(tranzactie)
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .input("denumire_firma", mssql.NVarChar, denumire_firma).query(`

//         UPDATE Firma
//         SET denumire_firma = @denumire_firma
//         WHERE id_utilizator = @id_utilizator

//         `);
//     await tranzactie.commit();
//   } catch (eroare) {
//     if (tranzactie) {
//       await tranzactie.rollback();
//     }
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError("Au existat probleme la modificarea firmei", 500);
//     }
//   }
// }

export async function modificaFirma(
  firma: DateExistenteFirma,
  id_utilizator: number
): Promise<void> {
  let tranzactie;
  try {
    const {
      nume_utilizator,
      denumire_firma,
      telefon,
      email,
      strada,
      numar,
      localitate,
    } = firma;
    tranzactie = await prisma.$transaction([
      prisma.utilizator.update({
        where: {
          id_utilizator,
        },
        data: {
          nume_utilizator,
          telefon,
          email,
          strada,
          numar,
          Localitate: {
            connect: {
              denumire_localitate: localitate,
            },
          },
        },
      }),
      prisma.firma.update({
        where: {
          id_utilizator,
        },
        data: {
          denumire_firma,
        },
      }),
    ]);
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
