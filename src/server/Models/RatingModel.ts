import prisma from "../Prisma/client.js";
import { RecenzieContainer } from "../Routes/Container/Inchiriere/Interfete.js";

export async function getRecenzii(id: number): Promise<RecenzieContainer[]> {
  const recenzii: RecenzieContainer[] = await prisma.recenzie.findMany({
    where: { Container_inchiriere: { container: id } },
    include: {
      Container_inchiriere: {
        include: {
          Utilizator: true,
        },
      },
    },
  });
  return recenzii;
}

export async function getRatingContainer(id: number): Promise<number | null> {
  const rating = await prisma.recenzie.aggregate({
    where: {
      Container_inchiriere: {
        container: id,
      },
    },
    _avg: {
      scor: true,
    },
  });
  return rating._avg.scor;
}

export async function getNumarRecenzii(id: number): Promise<number | null> {
  const rating = await prisma.recenzie.aggregate({
    where: {
      Container_inchiriere: {
        container: id,
      },
    },
    _count: {
      id_recenzie: true,
    },
  });
  return rating._count.id_recenzie;
}
