import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import { ContainerNou, Tip } from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Istoric_pret, Prisma } from "@prisma/client";
import prisma from "../../../Prisma/client.js";

//luat
export async function adaugaContainer(
  container: ContainerNou,
  tip: Tip,
  deseu?: string
): Promise<void> {
  try {
    if (tip === Tip.FIX)
      await prisma.container.create({
        data: {
          ...container,
        },
      });
    else if (tip === Tip.MOBIL) {
      const containerMobil = await prisma.container.create({
        data: {
          ...container,
        },
      });
      await prisma.tip_container.create({
        data: {
          container: containerMobil.id_container,
          tip_deseu: 8,
        },
      });
    } else if (tip === Tip.RECICLARE) {
      const id_tip = await prisma.tip_deseu.findUnique({
        where: { denumire_tip: deseu },
      });
      if (!id_tip) {
        throw new ExpressError(
          "Tipul de deșeu nu a putut fi adăugat în baza de date",
          500
        );
      }
      const containerReciclare = await prisma.container.create({
        data: {
          ...container,
        },
      });
      await prisma.tip_container.create({
        data: {
          container: containerReciclare.id_container,
          tip_deseu: id_tip.id_tip,
        },
      });
    } else {
      throw new ExpressError(
        "Acest tip de container nu poate fi adăugat în baza de date",
        500
      );
    }
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma ${eroare.message}`, 500);
    } else {
      console.log(eroare);
      throw new ExpressError(
        "Containerul nu a putut fi adăugat în baza de date",
        500
      );
    }
  }
}

//luat
export async function adaugaPret(
  id_container: number,
  id_tip_pret: number,
  pret: string
): Promise<void> {
  try {
    await prisma.istoric_pret.create({
      data: {
        tip_pret: id_tip_pret,
        container: id_container,
        pret: parseInt(pret),
      },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul nu a putut fi adăugat în baza de date",
        500
      );
    }
  }
}

//luat
export async function getPretExistent(
  id_container: number,
  id_tip_pret: number
): Promise<Istoric_pret | null> {
  try {
    const pret: Istoric_pret | null = await prisma.istoric_pret.findFirst({
      where: {
        container: id_container,
        tip_pret: id_tip_pret,
        data_sfarsit: null,
      },
    });

    return pret;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul existent nu a putut fi obținut din baza de date",
        500
      );
    }
  }
}

//luat
export async function anuleazaPret(id_istoric_pret: number): Promise<void> {
  try {
    await prisma.istoric_pret.update({
      where: { id_istoric_pret },
      data: { data_sfarsit: new Date() },
    });
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError(
        "Prețul nu a putut fi anulat în baza de date",
        500
      );
    }
  }
}
