import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ContainerNou, Tip } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Istoric_pret, Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

export async function adaugaContainer(
  container: ContainerNou,
  tip: Tip,
  deseu?: string
): Promise<void> {
  try {
    if (tip === Tip.FIX)
      await prisma.container.create({
        data: {
          ...container,
        },
      });
    else if (tip === Tip.MOBIL) {
      const containerMobil = await prisma.container.create({
        data: {
          ...container,
        },
      });
      await prisma.tip_container.create({
        data: {
          container: containerMobil.id_container,
          tip_deseu: 8,
        },
      });
    } else if (tip === Tip.RECICLARE) {
      const id_tip = await prisma.tip_deseu.findUnique({
        where: { denumire_tip: deseu },
      });
      if (!id_tip) {
        throw new ExpressError(
          "Tipul de deșeu nu a putut fi adăugat în baza de date",
          500
        );
      }
      const containerReciclare = await prisma.container.create({
        data: {
          ...container,
        },
      });
      await prisma.tip_container.create({
        data: {
          container: containerReciclare.id_container,
          tip_deseu: id_tip.id_tip,
        },
      });
    } else {
      throw new ExpressError(
        "Acest tip de container nu poate fi adăugat în baza de date",
        500
      );
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Containerul nu a putut fi adăugat în baza de date",
        500
      );
    }
  }
}

// export async function adaugaContainer(container: Container): Promise<void> {
//   try {
//     const {
//       denumire,
//       capacitate,
//       strada,
//       numar,
//       firma,
//       descriere,
//       localitate,
//       latitudine,
//       longitudine,
//     } = container;
//     await pool
//       .request()
//       .input("firma", mssql.Int, firma)
//       .input("denumire", mssql.NVarChar, denumire)
//       .input("capacitate", mssql.Int, capacitate)
//       .input("descriere", mssql.NVarChar, descriere)
//       .input("strada", mssql.NVarChar, strada)
//       .input("numar", mssql.NVarChar, numar)
//       .input("localitate", mssql.Int, localitate)
//       .input("latitudine", mssql.Float, latitudine)
//       .input("longitudine", mssql.Float, longitudine)
//       .query(
//         `INSERT INTO Container(firma, denumire, capacitate, lat, long, descriere, strada, numar, localitate) VALUES(@firma, @denumire, @capacitate, @latitudine, @longitudine, @descriere, @strada, @numar, @localitate)`
//       );
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la adăugarea container-ului în baza de date",
//         500
//       );
//     }
//   }
// }

// export async function adaugaPret(
//   id_container: number,
//   id_tip_pret: number,
//   pret: string,
//   data_inceput: Date
// ): Promise<void> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     await cerere
//       .input("id_container", mssql.Int, id_container)
//       .input("id_tip_pret", mssql.Int, id_tip_pret)
//       .input("pret", mssql.Int, parseInt(pret))
//       .input("data_inceput", mssql.Date, data_inceput)
//       .query(
//         `INSERT INTO Istoric_pret(tip_pret, container, pret, data_inceput) VALUES (@id_tip_pret, @id_container, @pret, @data_inceput)`
//       );
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la adăugarea prețului container-ului",
//         500
//       );
//     }
//   }
// }

export async function adaugaPret(
  id_container: number,
  id_tip_pret: number,
  pret: string
): Promise<void> {
  try {
    await prisma.istoric_pret.create({
      data: {
        tip_pret: id_tip_pret,
        container: id_container,
        pret: parseInt(pret),
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul nu a putut fi adăugat în baza de date",
        500
      );
    }
  }
}

export async function getPretExistent(
  id_container: number,
  id_tip_pret: number
): Promise<Istoric_pret | null> {
  try {
    const pret: Istoric_pret | null = await prisma.istoric_pret.findFirst({
      where: {
        container: id_container,
        tip_pret: id_tip_pret,
        data_sfarsit: null,
      },
    });

    return pret;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul existent nu a putut fi obținut din baza de date",
        500
      );
    }
  }
}

export async function anuleazaPret(id_istoric_pret: number): Promise<void> {
  try {
    await prisma.istoric_pret.update({
      where: { id_istoric_pret },
      data: { data_sfarsit: new Date() },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul nu a putut fi anulat în baza de date",
        500
      );
    }
  }
}
