import { Prisma, Recenzie } from "@prisma/client";
import prisma from "../../../Prisma/client.js";
import { ExpressError } from "../../../Utils/ExpressError.js";

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
