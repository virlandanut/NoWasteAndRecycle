import { Prisma, Recenzie, Utilizator } from "@prisma/client";
import prisma from "../../../Prisma/client.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

//luat
export async function verificareExistentaRecenzie(
  idContainer: number
): Promise<Recenzie | null> {
  try {
    const recenzie: Recenzie | null = await prisma.recenzie.findUnique({
      where: { container: idContainer },
    });

    return recenzie;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Prisma Error: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Recenzia nu a putut fi adăugată", 500);
    }
  }
}

//luat
export async function getProprietarRecenzie(id: number): Promise<Utilizator> {
  try {
    const recenzie = await prisma.recenzie.findUnique({
      where: {
        id_recenzie: id,
      },
      select: {
        Container_inchiriere: {
          select: {
            Utilizator: true,
          },
        },
      },
    });

    if (!recenzie || !recenzie.Container_inchiriere) {
      throw new ExpressError("Proprietarul recenziei nu a fost găsit", 500);
    }

    return recenzie.Container_inchiriere.Utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Prisma Error: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Recenzia nu a putut fi adăugată", 500);
    }
  }
}
