import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";
import { Localitate, Prisma } from "@prisma/client";

export async function getDenumireLocalitati(): Promise<Localitate[]> {
  try {
    const localitati = await prisma.localitate.findMany();
    if (!localitati) {
      throw new ExpressError(
        "Localitatile nu au putut fi interogate din baza de date",
        500
      );
    }
    return localitati;
  } catch (eroare: any) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea localitatilor din baza de date",
        500
      );
    }
  }
}

export async function getIdLocalitate(
  denumire_localitate: string
): Promise<number> {
  try {
    const localitate = await prisma.localitate.findUnique({
      where: { denumire_localitate: denumire_localitate },
    });
    if (localitate) {
      return localitate.id_localitate;
    } else {
      throw new ExpressError("Localitatea nu există în baza de date", 404);
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea id-ului localității din baza de date",
        500
      );
    }
  }
}

export async function getLocalitate(
  id_localitate: number
): Promise<Localitate> {
  try {
    const localitate = await prisma.localitate.findUnique({
      where: { id_localitate },
    });
    if (!localitate) {
      throw new ExpressError("Localitatea cerută nu există", 404);
    }
    return localitate;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea denumirii localității din baza de date",
        500
      );
    }
  }
}
