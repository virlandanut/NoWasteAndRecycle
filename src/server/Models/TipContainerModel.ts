import { Tip_container } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { TipContainer } from "../Routes/TipuriContainer/Interfete.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function addTipContainer(
  container: number,
  tip_deseu: number
): Promise<void> {
  await prisma.tip_container.create({
    data: {
      container,
      tip_deseu,
    },
  });
}

export async function getTipuriContainer(): Promise<TipContainer[]> {
  const tipuri = await prisma.tip_deseu.findMany({
    where: { id_tip: { not: 8 } },
  });
  return tipuri;
}

export async function getIdTipContainer(denumire_tip: string): Promise<number> {
  const tip = await prisma.tip_deseu.findUnique({
    where: { denumire_tip },
  });
  if (!tip) {
    throw new ExpressError("Tipul căutat nu există", 404);
  }
  return tip.id_tip;
}

export async function deleteTipContainer(id: number): Promise<void> {
  await prisma.tip_container.deleteMany({
    where: { container: id },
  });
}

export async function countTipContainere(id: number): Promise<number> {
  return await prisma.tip_container.count({
    where: { container: id },
  });
}
