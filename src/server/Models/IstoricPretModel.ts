import { Istoric_pret } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { PretContainer } from "../Routes/Container/Interfete.js";

export async function getPretExistent(
  id_container: number,
  id_tip_pret: number
): Promise<Istoric_pret | null> {
  const pret: Istoric_pret | null = await prisma.istoric_pret.findFirst({
    where: {
      container: id_container,
      tip_pret: id_tip_pret,
      data_sfarsit: null,
    },
  });

  return pret;
}

export async function getPreturiContainer(
  id_container: number
): Promise<PretContainer[]> {
  const rezultat = await prisma.istoric_pret.findMany({
    where: {
      container: id_container,
      data_sfarsit: null,
    },
    select: {
      pret: true,
      Tip_pret: {
        select: {
          denumire_tip_pret: true,
        },
      },
    },
  });
  const preturiContainer = rezultat.map((item) => ({
    denumire_tip_pret: item.Tip_pret.denumire_tip_pret,
    pret: item.pret,
  }));

  return preturiContainer;
}

export async function adaugaPret(
  id_container: number,
  id_tip_pret: number,
  pret: string
): Promise<void> {
  await prisma.istoric_pret.create({
    data: {
      tip_pret: id_tip_pret,
      container: id_container,
      pret: parseInt(pret),
    },
  });
}

export async function anuleazaPret(id_istoric_pret: number): Promise<void> {
  await prisma.istoric_pret.update({
    where: { id_istoric_pret },
    data: { data_sfarsit: new Date() },
  });
}
