import { Prisma } from "@prisma/client";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";

export async function stergeRecenzie(id_recenzie: number) {
  try {
    const recenzie = await prisma.recenzie.delete({ where: { id_recenzie } });
    return recenzie;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Recenzie nu a putut fi ștearsă", 500);
    }
  }
}
