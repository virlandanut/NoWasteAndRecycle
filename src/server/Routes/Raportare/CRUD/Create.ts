import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { Raportare } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma, Raport_problema } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function adaugaRaportProblema(
  idUtilizator: number,
  titlu: string,
  mesaj: string
): Promise<Raport_problema> {
  try {
    const raport = await prisma.raport_problema.create({
      data: {
        utilizator: idUtilizator,
        titlu,
        mesaj,
      },
    });
    return raport;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "A existat o eroare la adăugarea raportului în baza de date",
        500
      );
    }
  }
}
