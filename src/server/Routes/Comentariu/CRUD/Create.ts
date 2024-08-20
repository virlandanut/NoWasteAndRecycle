import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Comentariu, Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";
import { ComentariuNou } from "../Interfete.js";

//luat
export async function adaugaComentariu(
  comentariu: ComentariuNou
): Promise<void> {
  try {
    await prisma.comentariu.create({
      data: {
        raport_problema: comentariu.raport_problema,
        utilizator: comentariu.utilizator,
        mesaj: comentariu.mesaj,
      },
    });
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
