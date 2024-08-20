import prisma from "../Prisma/client.js";
import { codCAEN, codCaenNume } from "../Routes/Caen/Interfete.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function getIdCaen(cod_caen: number): Promise<number> {
  const rezultat = await prisma.caen.findUnique({
    where: {
      cod_caen: cod_caen,
    },
    select: {
      id_caen: true,
    },
  });
  if (rezultat) {
    return rezultat.id_caen;
  } else {
    throw new ExpressError("Codul Caen nu există", 500);
  }
}

export async function getCoduriCaen(): Promise<codCAEN[]> {
  const rezultat = await prisma.caen.findMany({
    select: {
      cod_caen: true,
    },
  });
  return rezultat;
}

export async function getCoduriCaenNume(): Promise<codCaenNume[]> {
  const rezultat = await prisma.caen.findMany({
    select: {
      cod_caen: true,
      descriere: true,
    },
  });
  return rezultat;
}
