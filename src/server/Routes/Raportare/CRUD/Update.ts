import mssql, { ConnectionPool } from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function solutioneazaTichet(
  id_raport_problema: number
): Promise<void> {
  try {
    await prisma.raport_problema.update({
      where: { id_raport_problema },
      data: {
        status: true,
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Tichetul nu a putut fi marcat ca soluționat",
        500
      );
    }
  }
}
