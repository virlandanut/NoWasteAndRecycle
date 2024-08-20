import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import prisma from "../../../Prisma/client.js";
import { Prisma } from "@prisma/client";

//luat
export async function getProprietarTichet(
  id_raport_problema: number
): Promise<number> {
  try {
    const rezultat = await prisma.raport_problema.findUnique({
      where: { id_raport_problema: id_raport_problema },
    });
    if (rezultat) {
      return rezultat.utilizator;
    } else {
      throw new ExpressError(
        "Proprietarul raportului nu a putut fi găsit!",
        404
      );
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Proprietarul raportului nu a putut fi obținut!",
        500
      );
    }
  }
}
