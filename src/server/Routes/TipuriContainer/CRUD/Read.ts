import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { TipContainer } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Prisma, Tip_container } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function getTipuriContainer(): Promise<TipContainer[]> {
  try {
    const tipuri = await prisma.tip_deseu.findMany({
      where: { id_tip: { not: 8 } },
    });
    return tipuri;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tipurile de container nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

//luat
export async function getIdTipContainer(denumire_tip: string): Promise<number> {
  try {
    const tip = await prisma.tip_deseu.findUnique({ where: { denumire_tip } });
    if (!tip) {
      throw new ExpressError("Tipul căutat nu există", 404);
    }
    return tip.id_tip;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Tipurile de container nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}
