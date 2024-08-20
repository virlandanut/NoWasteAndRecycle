import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { PretContainer } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Container, Firma, Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function getIdContainer(
  denumire_container: string
): Promise<number> {
  try {
    const container = await prisma.container.findUnique({
      where: { denumire: denumire_container },
      select: { id_container: true },
    });
    if (container) {
      return container.id_container;
    } else {
      throw new ExpressError("Containerul nu există în baza de date", 404);
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea id-ului containerului!",
        500
      );
    }
  }
}

//luat
export async function getPreturiContainer(
  id_container: number
): Promise<PretContainer[]> {
  try {
    const rezultat = await prisma.istoric_pret.findMany({
      where: {
        container: id_container,
        data_sfarsit: null,
      },
      select: {
        pret: true,
        Tip_pret: {
          select: {
            denumire_tip_pret: true,
          },
        },
      },
    });
    const preturiContainer = rezultat.map((item) => ({
      denumire_tip_pret: item.Tip_pret.denumire_tip_pret,
      pret: item.pret,
    }));

    return preturiContainer;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea prețurilor containerului!",
        500
      );
    }
  }
}

//luat

export async function getNumarContainere(): Promise<number> {
  try {
    const astazi = new Date();
    astazi.setHours(0, 0, 0, 0);

    const count = await prisma.container.count({
      where: {
        data_adaugare: {
          gte: astazi,
          lt: new Date(astazi.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    return count;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea numărului de containere!",
        500
      );
    }
  }
}

//luat

export async function getMedieContainere(): Promise<number> {
  try {
    const astazi = new Date();
    astazi.setHours(0, 0, 0, 0);

    const startDate = new Date(astazi.getTime() - 6 * 24 * 60 * 60 * 1000);

    const numarContainere = await prisma.container.groupBy({
      by: ["data_adaugare"],
      _count: {
        id_container: true,
      },
      where: {
        data_adaugare: {
          gte: startDate,
          lte: astazi,
        },
      },
    });
    const totalContainere = numarContainere.reduce(
      (sum, count) => sum + count._count.id_container,
      0
    );
    const avg = totalContainere / 7;

    return parseFloat(avg.toFixed(2));
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la obținerea mediei containerelor!",
        500
      );
    }
  }
}

//luat

export async function getProprietarContainer(id: number): Promise<number> {
  try {
    const container: Container | null = await prisma.container.findUnique({
      where: { id_container: id },
    });
    if (!container) {
      throw new ExpressError("Containerul nu există în baza de date", 404);
    }
    return container.firma;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Au existat probleme la obținerea proprietarului containerului!",
        500
      );
    }
  }
}
