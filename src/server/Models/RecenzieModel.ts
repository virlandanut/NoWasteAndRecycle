import { Recenzie, Utilizator } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";

export async function getRecenzie(
  id_recenzie: number
): Promise<Recenzie | null> {
  return await prisma.recenzie.findUnique({
    where: { id_recenzie },
  });
}

export async function adaugaRecenzie(
  idContainer: number,
  scor: number,
  mesaj: string
): Promise<Recenzie | null> {
  const recenzieNoua: Recenzie = await prisma.recenzie.create({
    data: { container: idContainer, scor, mesaj },
  });

  return recenzieNoua;
}

export async function editRecenzie(
  id_recenzie: number,
  scor: number,
  mesaj: string
): Promise<Recenzie | null> {
  return prisma.recenzie.update({
    where: { id_recenzie },
    data: { scor, mesaj },
  });
}

export async function stergeRecenzie(id_recenzie: number) {
  const recenzie = await prisma.recenzie.delete({ where: { id_recenzie } });
  return recenzie;
}

export async function verificareExistentaRecenzie(
  idContainer: number
): Promise<Recenzie | null> {
  const recenzie: Recenzie | null = await prisma.recenzie.findUnique({
    where: { container: idContainer },
  });

  return recenzie;
}

export async function getProprietarRecenzie(id: number): Promise<Utilizator> {
  const recenzie = await prisma.recenzie.findUnique({
    where: {
      id_recenzie: id,
    },
    select: {
      Container_inchiriere: {
        select: {
          Utilizator: true,
        },
      },
    },
  });

  if (!recenzie || !recenzie.Container_inchiriere) {
    throw new ExpressError("Proprietarul recenziei nu a fost găsit", 500);
  }

  return recenzie.Container_inchiriere.Utilizator;
}
