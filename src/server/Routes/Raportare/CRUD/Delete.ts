import mssql, { ConnectionPool } from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";
import { Prisma } from "@prisma/client";

//luat
export async function stergereComentariiTichet(
  id_raport_problema: number
): Promise<void> {
  try {
    await prisma.comentariu.deleteMany({
      where: {
        raport_problema: id_raport_problema,
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la ștergerea comentariilor din baza de date",
        500
      );
    }
  }
}

//luat
export async function stergeTichet(id_raport_problema: number): Promise<void> {
  try {
    await prisma.raport_problema.delete({
      where: {
        id_raport_problema: id_raport_problema,
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la ștergerea tichetului din baza de date",
        500
      );
    }
  }
}
