import { Raport_problema } from "@prisma/client";
import prisma from "../Prisma/client.js";
import { ExpressError } from "../Utils/ExpressError.js";
import { TichetCuNume } from "../Routes/Raportare/Interfete.js";

export async function getTichet(
  id_raport_problema: number
): Promise<Raport_problema> {
  const tichet = await prisma.raport_problema.findUnique({
    where: { id_raport_problema },
  });
  if (!tichet) {
    throw new ExpressError("Tichetul nu există în baza de date", 404);
  }
  return tichet;
}
export async function getTicheteRaport(
  id_utilizator: number
): Promise<Raport_problema[]> {
  const tichete = await prisma.raport_problema.findMany({
    where: { utilizator: id_utilizator },
  });

  const ticheteRaportare = tichete.map((tichet) => ({
    id_raport_problema: tichet.id_raport_problema,
    utilizator: tichet.utilizator,
    titlu: tichet.titlu,
    mesaj: tichet.mesaj,
    data_postare: tichet.data_postare,
    data_actualizare: tichet.data_actualizare,
    status: tichet.status,
  }));

  return ticheteRaportare;
}

export async function getToateTichetelePersoane(): Promise<TichetCuNume[]> {
  const tichete = await prisma.raport_problema.findMany({
    where: {
      status: false,
      Utilizator: {
        Persoana_fizica: {
          isNot: null,
        },
      },
    },
    select: {
      id_raport_problema: true,
      titlu: true,
      status: true,
      data_postare: true,
      Utilizator: {
        select: {
          Persoana_fizica: {
            select: {
              nume: true,
              prenume: true,
            },
          },
        },
      },
    },
  });

  return tichete.map((tichet) => ({
    id_raport_problema: tichet.id_raport_problema,
    titlu: tichet.titlu,
    status: tichet.status,
    data: tichet.data_postare,
    utilizator: tichet.Utilizator.Persoana_fizica
      ? `${tichet.Utilizator.Persoana_fizica?.nume} ${tichet.Utilizator.Persoana_fizica?.prenume}`
      : "Cont șters",
  }));
}

export async function getToateTicheteleFirme(): Promise<TichetCuNume[]> {
  const tichete = await prisma.raport_problema.findMany({
    where: {
      status: false,
      Utilizator: {
        Firma: {
          isNot: null,
        },
      },
    },
    select: {
      id_raport_problema: true,
      titlu: true,
      status: true,
      data_postare: true,
      Utilizator: {
        select: {
          Firma: {
            select: {
              denumire_firma: true,
            },
          },
        },
      },
    },
  });

  return tichete.map((tichet) => ({
    id_raport_problema: tichet.id_raport_problema,
    titlu: tichet.titlu,
    status: tichet.status,
    data: tichet.data_postare,
    utilizator: tichet.Utilizator.Firma
      ? tichet.Utilizator.Firma.denumire_firma
      : "Cont șters",
  }));
}

export async function getProprietarTichet(
  id_raport_problema: number
): Promise<number> {
  const rezultat = await prisma.raport_problema.findUnique({
    where: { id_raport_problema: id_raport_problema },
  });
  if (rezultat) {
    return rezultat.utilizator;
  } else {
    throw new ExpressError("Proprietarul raportului nu a putut fi găsit!", 404);
  }
}

export async function adaugaRaportProblema(
  idUtilizator: number,
  titlu: string,
  mesaj: string
): Promise<Raport_problema> {
  const raport = await prisma.raport_problema.create({
    data: {
      utilizator: idUtilizator,
      titlu,
      mesaj,
    },
  });
  return raport;
}

export async function stergeTichet(id_raport_problema: number): Promise<void> {
  await prisma.raport_problema.delete({
    where: {
      id_raport_problema: id_raport_problema,
    },
  });
}

export async function solutioneazaTichet(
  id_raport_problema: number
): Promise<void> {
  await prisma.raport_problema.update({
    where: { id_raport_problema },
    data: {
      status: true,
    },
  });
}
