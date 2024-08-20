import { Localitate } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function getLocalitate(
  id_localitate: number
): Promise<Localitate> {
  const localitate = await prisma.localitate.findUnique({
    where: { id_localitate },
  });
  if (!localitate) {
    throw new ExpressError("Localitatea cerută nu există", 404);
  }
  return localitate;
}

export async function getIdLocalitate(
  denumire_localitate: string
): Promise<number> {
  const localitate = await prisma.localitate.findUnique({
    where: { denumire_localitate: denumire_localitate },
  });
  if (localitate) {
    return localitate.id_localitate;
  } else {
    throw new ExpressError("Localitatea nu există în baza de date", 404);
  }
}

export async function getLocalitateCuDenumire(
  denumire: string
): Promise<Localitate | null> {
  return await prisma.localitate.findUnique({
    where: { denumire_localitate: denumire },
  });
}

export async function getDenumireLocalitati(): Promise<Localitate[]> {
  const localitati = await prisma.localitate.findMany();
  if (!localitati) {
    throw new ExpressError(
      "Localitatile nu au putut fi interogate din baza de date",
      500
    );
  }
  return localitati;
}
