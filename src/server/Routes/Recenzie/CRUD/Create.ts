import { Prisma, Recenzie } from "@prisma/client";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";

//luat
export async function adaugaRecenzie(
  idContainer: number,
  scor: number,
  mesaj: string
): Promise<Recenzie | null> {
  try {
    const recenzieNoua: Recenzie = await prisma.recenzie.create({
      data: { container: idContainer, scor, mesaj },
    });

    return recenzieNoua;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Prisma Error: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Recenzia nu a putut fi adăugată", 500);
    }
  }
}
