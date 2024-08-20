import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function stergeContainer(id_container: number): Promise<void> {
  try {
    await prisma.$transaction(async (prisma) => {
      const container = await prisma.container.findUnique({
        where: { id_container: id_container },
      });
      if (!container) {
        throw new ExpressError(
          "Containerul pe care încercați să-l ștergeți nu există",
          404
        );
      }
      if (container.status === true) {
        throw new ExpressError(
          "Containerul nu poate fi șters deoarece este închiriat",
          500
        );
      }
      const tipuri = await prisma.tip_container.count({
        where: { container: container.id_container },
      });

      if (tipuri !== 0) {
        await prisma.container_inchiriere_reciclare.deleteMany({
          where: { container: container.id_container },
        });
        await prisma.tip_container.deleteMany({
          where: { container: id_container },
        });
      } else {
        await prisma.container_inchiriere_depozitare.deleteMany({
          where: { container: container.id_container },
        });
      }

      await prisma.container.delete({ where: { id_container: id_container } });
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Au existat probleme la ștergerea containerului",
        500
      );
    }
  }
}
