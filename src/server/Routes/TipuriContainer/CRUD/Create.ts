import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function adaugaTipContainer(
  id_container: number,
  id_tip_deseu: number
): Promise<void> {
  try {
    await prisma.tip_container.create({
      data: {
        container: id_container,
        tip_deseu: id_tip_deseu,
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tipul de container nu a putut fi înregistrat",
        500
      );
    }
  }
}
