import prisma from "../Prisma/client.js";
import { ComentariuNou } from "../Routes/Comentariu/Interfete.js";
import { ComentariuTichet } from "../Routes/Raportare/Interfete.js";

export async function getComentariiProprietarPersoana(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  const comentarii = await prisma.comentariu.findMany({
    where: {
      raport_problema: id_raport_problema,
      utilizator: id_proprietar,
    },
    select: {
      id_comentariu: true,
      mesaj: true,
      data: true,
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

  const comentariiTichet: ComentariuTichet[] = comentarii.map((comentariu) => ({
    id_comentariu: comentariu.id_comentariu,
    mesaj: comentariu.mesaj,
    data: comentariu.data,
    nume: comentariu.Utilizator.Persoana_fizica
      ? `${comentariu.Utilizator.Persoana_fizica.nume} ${comentariu.Utilizator.Persoana_fizica.prenume}`
      : "Cont șters",
    rol: "proprietar",
  }));

  return comentariiTichet;
}

export async function getComentariiProprietarFirma(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  const comentarii = await prisma.comentariu.findMany({
    where: {
      raport_problema: id_raport_problema,
      utilizator: id_proprietar,
    },
    select: {
      id_comentariu: true,
      mesaj: true,
      data: true,
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
  const comentariiTichet: ComentariuTichet[] = comentarii.map((comentariu) => ({
    id_comentariu: comentariu.id_comentariu,
    mesaj: comentariu.mesaj,
    data: comentariu.data,
    nume: comentariu.Utilizator.Firma
      ? `${comentariu.Utilizator.Firma.denumire_firma}`
      : "Cont șters",
    rol: "proprietar",
  }));

  return comentariiTichet;
}

export async function getComentariiAdministrator(
  id_raport_problema: number
): Promise<ComentariuTichet[]> {
  const comentarii = await prisma.comentariu.findMany({
    where: {
      raport_problema: id_raport_problema,
      Utilizator: {
        rol: "ADMINISTRATOR",
      },
    },
    select: {
      id_comentariu: true,
      mesaj: true,
      data: true,
      Utilizator: {
        select: {
          rol: true,
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
  const comentariiTichet: ComentariuTichet[] = comentarii.map((comentariu) => ({
    id_comentariu: comentariu.id_comentariu,
    nume: comentariu.Utilizator.Persoana_fizica
      ? `${comentariu.Utilizator.Persoana_fizica.nume} ${comentariu.Utilizator.Persoana_fizica.prenume}`
      : "Cont șters",
    mesaj: comentariu.mesaj,
    data: comentariu.data,
    rol: comentariu.Utilizator.rol,
  }));

  return comentariiTichet;
}

export async function adaugaComentariu(
  comentariu: ComentariuNou
): Promise<void> {
  await prisma.comentariu.create({
    data: {
      raport_problema: comentariu.raport_problema,
      utilizator: comentariu.utilizator,
      mesaj: comentariu.mesaj,
    },
  });
}

export async function stergereComentariiTichet(
  id_raport_problema: number
): Promise<void> {
  await prisma.comentariu.deleteMany({
    where: {
      raport_problema: id_raport_problema,
    },
  });
}
