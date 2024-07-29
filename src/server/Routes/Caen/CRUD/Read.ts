import { codCAEN, codCaenNume } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";
import { Prisma } from "@prisma/client";

export async function getCoduriCaen(): Promise<codCAEN[]> {
  try {
    const rezultat = await prisma.caen.findMany({
      select: {
        cod_caen: true,
      },
    });
    return rezultat;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        `Codurile CAEN nu au putut fi obținute din baza de date`,
        500
      );
    }
  }
}

export async function getCoduriCaenNume(): Promise<codCaenNume[]> {
  try {
    const rezultat = await prisma.caen.findMany({
      select: {
        cod_caen: true,
        descriere: true,
      },
    });
    return rezultat;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea codurilor CAEN din baza de date",
        500
      );
    }
  }
}

export async function getIdCaen(cod_caen: number): Promise<number> {
  try {
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
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la interogarea codurilor CAEN din baza de date",
        500
      );
    }
  }
}
